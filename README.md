# seibert-stiftung-scripts

[![Build and Release](https://github.com/NilsGke/seibert-stiftung-scripts/actions/workflows/build-release.yaml/badge.svg)](https://github.com/NilsGke/seibert-stiftung-scripts/actions/workflows/build-release.yaml)

Scripts for Seibert Stiftung Chromebooks to block certain pages, automatically set the language on certain websites and other things..

Script location is: <https://github.com/NilsGke/seibert-stiftung-scripts/releases/latest/download/index.js>

## automated build

If there is a commit to the src/ directory, the workflow triggers.

It compiles the index.js file and replaces the `{{version}}` template with a new, automated version.
