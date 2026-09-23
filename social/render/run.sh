#!/usr/bin/env bash
# Render slides into social/out/ inside Docker.
#
#   social/render/run.sh                     # every post, story and profile piece
#   social/render/run.sh posts/01-hoy        # one piece
#   social/render/run.sh --check             # verify sizes, counts, captions
#   social/render/run.sh --svg social/design/cat-sheet.svg   # a design sheet -> png
#
# The image is built once and reused.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(dirname "$(dirname "$HERE")")"
IMAGE="social-render:1.52"

docker image inspect "$IMAGE" >/dev/null 2>&1 || docker build -q -t "$IMAGE" "$HERE" >/dev/null

script=render.mjs
if [[ "${1:-}" == "--check" ]]; then script=check.mjs; shift; fi
if [[ "${1:-}" == "--svg" ]]; then script=svg.mjs; shift; fi

docker run --rm \
  --user "$(id -u):$(id -g)" -e HOME=/tmp \
  -v "$REPO":/repo -w /repo \
  "$IMAGE" \
  node "social/render/$script" "$@"
