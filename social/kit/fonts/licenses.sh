#!/usr/bin/env bash
# Fetch the SIL Open Font License of every family fetch.sh ships, as
# OFL-<family>.txt next to the woff2. OFL 1.1 asks for the licence to travel
# with the fonts; the woff2 are left alone. Runs curl inside Docker.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAMILIES="${FAMILIES:-golostext caveat ptserif oswald}"

docker run --rm --user "$(id -u):$(id -g)" -v "$HERE":/out -w /out curlimages/curl:8.10.1 sh -ec "
  for f in $FAMILIES; do
    curl -sfS https://raw.githubusercontent.com/google/fonts/main/ofl/\$f/OFL.txt -o OFL-\$f.txt
  done"

bad=0
for f in $FAMILIES; do
  file="$HERE/OFL-$f.txt"
  if head -1 "$file" | grep -q '^Copyright' && grep -q 'SIL OPEN FONT LICENSE' "$file"; then
    echo "OFL-$f.txt: $(head -1 "$file" | cut -c1-90)"
  else
    echo "OFL-$f.txt: not an OFL text" >&2; bad=1
  fi
done
exit $bad
