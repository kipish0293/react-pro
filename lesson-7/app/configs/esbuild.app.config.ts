import esbuild from "esbuild";
import path from "path";

const mode = process.env.BUILD_MODE === "prod" ? "prod" : "dev";

const options: esbuild.BuildOptions = {
  entryPoints: { app: path.resolve(process.cwd(), "index.ts") },
  outdir: path.resolve(process.cwd(), "dist"),
  bundle: true,
  splitting: true,
  format: "esm",
  target: "es2022",
  platform: "browser",
  minify: mode === "prod",
  sourcemap: true,
};

if (mode === "dev") {
  esbuild
    .context(options)
    .then((ctx) => ctx.watch())
    .then(() => console.log("[app] dev: watch-режим"))
    .catch(console.error);
} else {
  esbuild.build(options).then(console.log).catch(console.error);
}
