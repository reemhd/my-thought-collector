#!/usr/bin/env bash
set -euo pipefail

ZOLA_VERSION="0.23.4"
ZOLA_URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"

curl -sL "$ZOLA_URL" -o /tmp/zola.tar.gz
tar -xzf /tmp/zola.tar.gz -C /tmp
/tmp/zola build
