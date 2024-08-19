# seibert-stiftung-scripts

Tampermonkey-Scripts for Seibert Stiftung Chromebooks.

We use these to block certain pages, automatically set the language on certain websites and other things..

The newest script can be found under: <https://github.com/NilsGke/seibert-stiftung-scripts/releases/latest/download/seibert-stiftung-global.user.js> (can be used to import to Tampermonkey)

## Automated build

If there is a commit to the `src/` directory or the `vite.config.ts` file, the workflow triggers.

It compiles and bundles everything inside the src directory. It also replaces the `{{version}}` template with a new, automated version.

[![Build and Release](https://github.com/NilsGke/seibert-stiftung-scripts/actions/workflows/build-release.yaml/badge.svg)](https://github.com/NilsGke/seibert-stiftung-scripts/actions/workflows/build-release.yaml)
