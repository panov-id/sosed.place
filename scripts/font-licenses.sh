#!/usr/bin/env bash
# Fetch the SIL Open Font License of every family the landing ships, as
# landing/fonts/OFL-<family>.txt next to the woff2. OFL 1.1 asks for the licence
# to travel with the fonts, so the texts ship with the site too (the rule
# fonts/OFL-*.txt in deploy/landing-shipped.manifest). The woff2 are left
# alone. Runs curl inside Docker. The script itself lives out here, because
# landing/ ships whole and a .sh in it would stop the deploy.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../landing/fonts" && pwd)"
FAMILIES="${FAMILIES:-golostext jetbrainsmono unbounded notosansgeorgian notosansarmenian}"

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
