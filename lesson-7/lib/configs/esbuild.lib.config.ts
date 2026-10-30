import * as esbuild from "esbuild";

const shared: esbuild.BuildOptions = {
  entryPoints: ["index.ts", "math.ts", "string.ts"],
  bundle: true,
  platform: "neutral",
  target: "es2020",
  external: ["react", "lodash"],
  sourcemap: true,
  minify: process.env.BUILD_MODE === "prod",
};

await esbuild.build({ ...shared, format: "esm", outdir: "dist/esm" });
await esbuild.build({
  ...shared,
  format: "cjs",
  outdir: "dist/esm",
  outExtension: { ".js": ".cjs" },
});

console.log("dist/esm dist/cjs, externals");
