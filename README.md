# seibert-stiftung-scripts

[![Build and Release](https://github.com/NilsGke/seibert-stiftung-scripts/actions/workflows/build-release.yaml/badge.svg)](https://github.com/NilsGke/seibert-stiftung-scripts/actions/workflows/build-release.yaml)

acutal script is in src/indes.js

Script location is: <https://github.com/NilsGke/seibert-stiftung-scripts/releases/latest/download/index.js>

## automated build

If there is a commit inside the src/ directory, the workflow triggers.

It compiles the index.js file and replaces the `{{version}}` template with a new, automated version.
