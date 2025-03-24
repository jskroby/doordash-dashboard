const fs = require("fs");
const path = require("path");

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, path.join(target, file));
      } else {
        fs.copyFileSync(curSource, path.join(target, file));
      }
    });
  }
}

const vscodePath = process.env.CODIUM_VSCODE_PATH;

if (!vscodePath) {
  console.error("VSCODE_PATH environment variable is not set.");
  process.exit(1);
}

const distSource = path.join(
  __dirname,
  "..",
  "node_modules",
  "@codium-ai",
  "qodo-gen-chat-webview",
  "webview-dist",
);
const distTarget = path.join(vscodePath, "webview", "dist");

// const typesSource = path.join(distSource, "types");
// const typesTarget = path.join(distTarget, "types");

copyFolderRecursiveSync(distSource, distTarget);
// copyFolderRecursiveSync(typesSource, typesTarget);
console.log("Remote webview files copied successfully to:", distTarget);
