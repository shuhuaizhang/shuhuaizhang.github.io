import { createReadStream, existsSync, statSync, watch } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { spawn } from "node:child_process";
import http from "node:http";

const root = resolve("dist");
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

let rebuilding = false;
let rebuildQueued = false;

function rebuild() {
  if (rebuilding) {
    rebuildQueued = true;
    return;
  }
  rebuilding = true;
  const child = spawn(process.execPath, ["scripts/build.mjs"], { stdio: "inherit" });
  child.on("exit", () => {
    rebuilding = false;
    if (rebuildQueued) {
      rebuildQueued = false;
      rebuild();
    }
  });
}

for (const directory of ["content", "src"]) {
  watch(directory, { recursive: true }, rebuild);
}

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const safePath = normalize(requestPath).replace(/^(\.\.(\/|\\|$))+/, "");
  let filePath = join(root, safePath);

  if (requestPath.endsWith("/")) filePath = join(filePath, "index.html");
  else if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, "index.html");

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    createReadStream(join(root, "404.html")).pipe(response);
    return;
  }

  response.writeHead(200, {
    "cache-control": "no-store",
    "content-type": mimeTypes[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local URL: http://127.0.0.1:${port}/`);
});
