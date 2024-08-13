# seibert-stiftung-scripts

acutal script is in src/indes.js

## automated build

If there is a commit inside the src/ directory, the workflow triggers.

It compiles the index.js file and replaces the `{{version}}` template with a new, automated version.
