import { parseArgs } from "util";

const versionRegex = /^\d+\.\d+\.\d+$/;
const template = "{{version}}";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    version: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const version = values.version as string | undefined;

if (version === undefined) {
  console.error("no version provided!");
  process.exit(10);
}

if (!versionRegex.test(version)) {
  console.error(
    `version does not confine to schema: ${versionRegex.toString()}`
  );
  process.exit(10);
}

// replace version template in dist file
// using streams is a bit overkill, but its cool :P
const inputFile = Bun.file("./dist/index.js");
if (!inputFile.exists()) {
  console.error("no build file found!");
  process.exit(10);
}

const inputStream = inputFile.stream();
const outputStream = Bun.file("./dist/versioned/index.js").writer();

const decoder = new TextDecoder();
const encoder = new TextEncoder();

/** buffers two values to account for templates that are split through streaming */
let buffer = [];

const reader = inputStream.getReader();
await reader.read().then(function pump({ done, value }) {
  if (done) {
    outputStream.write(encoder.encode(buffer.join("")));
    return;
  }

  const stringValue = decoder.decode(value).replaceAll(template, version);
  buffer.push(stringValue);

  if (buffer.length === 2) {
    const joined = buffer.join("");
    const lastTemplateIndex = joined.lastIndexOf(template);
    if (lastTemplateIndex === -1) {
      // no template in current buffer -> write oldest buffer to output and keep rest
      // assumes that buffer length is greater then template (buffer length if statement does)
      const content = buffer.shift();
      outputStream.write(encoder.encode(content));
    } else {
      // template found accross both buffered parts -> split `joined` at template and put version in between
      const split = joined.split(template);
      outputStream.write(encoder.encode(split.at(0) + version));
      buffer = [split.at(1)];
    }
  }

  return reader.read().then(pump);
});

console.log("replaced templates");
