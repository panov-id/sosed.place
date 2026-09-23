#!/usr/bin/env bash
# Fetch the faces the landing does not ship, into this folder, as extra.css + woff2.
#   Golos Text 800–900  poster headlines (the landing stops at 600; faked weight smears)
#   Caveat              handwriting: notices on the door, postcards
#   PT Serif            dictionary pages, field-guide plates
#   Oswald              film-poster credits
# All have Cyrillic. Run once; the files are committed.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
Q='family=Golos+Text:wght@800;900&family=Caveat:wght@500;700&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Oswald:wght@400;600;700'

curl -sfA "$UA" "https://fonts.googleapis.com/css2?${Q}&display=block" -o raw.css
rm -f golos-*.woff2 golos-heavy.css

cp raw.css extra.css
grep -o 'https://fonts.gstatic.com/[^)]*\.woff2' raw.css | sort -u | while read -r url; do
  fam="$(echo "$url" | cut -d/ -f5)"
  name="${fam}-$(basename "$url")"
  curl -sf "$url" -o "$name"
  sed -i "s#${url}#${name}#g" extra.css
done
rm raw.css

echo "faces: $(grep -c '@font-face' extra.css)"
grep -o "font-family: '[^']*'" extra.css | sort | uniq -c
