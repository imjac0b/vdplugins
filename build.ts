import { readFile, writeFile, readdir } from "fs/promises";
import { createHash } from "crypto";
import type { BunPlugin } from "bun";

// Build globals mapping function similar to rollup's globals
function getGlobalName(id: string): string | null {
  if (id.startsWith("@vendetta")) {
    return id.substring(1).replace(/\//g, ".");
  }
  const map: Record<string, string> = {
    react: "window.React",
  };
  return map[id] || null;
}

// Plugin to mark all @vendetta modules as external
const vendettaExternalPlugin: BunPlugin = {
  name: "vendetta-external",
  setup(build) {
    // Mark all @vendetta and @vendetta/* modules as external
    build.onResolve({ filter: /^@vendetta/ }, (args) => {
      return {
        path: args.path,
        external: true,
      };
    });
  },
};

for (const plug of await readdir("./plugins")) {
  const manifestPath = `./plugins/${plug}/manifest.json`;
  const manifest = JSON.parse(await readFile(manifestPath, "utf-8"));
  const outPath = `./dist/${plug}/index.js`;

  try {
    const result = await Bun.build({
      entrypoints: [`./plugins/${plug}/${manifest.main}`],
      outdir: `./dist/${plug}`,
      format: "iife",
      minify: {
        whitespace: true,
        syntax: true,
        identifiers: true,
      },
      target: "browser",
      external: ["react"],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
      naming: {
        entry: "index.js",
      },
      plugins: [vendettaExternalPlugin],
    });

    if (!result.success) {
      console.error(`Failed to build ${manifest.name}:`, result.logs);
      process.exit(1);
    }

    // Post-process the output to map externals to globals
    // Bun build with IIFE format leaves externals as require() calls, so we need to replace them
    let builtContent = await readFile(outPath, "utf-8");

    // Handle require() calls for @vendetta modules (Bun wraps them in a function like s("@vendetta/..."))
    // Match patterns like: s("@vendetta"), s("@vendetta/..."), or require("@vendetta/...")
    // The function name can be any identifier, so we match any identifier followed by ("@vendetta...")
    const vendettaRequireRegex = /\w+\(['"](@vendetta[^'"]*)['"]\)/g;
    builtContent = builtContent.replace(
      vendettaRequireRegex,
      (match, moduleId) => {
        const globalName = getGlobalName(moduleId);
        if (globalName) {
          // Replace the entire function call with just the global variable
          return globalName;
        }
        return match;
      }
    );

    // Handle require() calls for react (same pattern)
    builtContent = builtContent.replace(
      /\w+\(['"]react['"]\)/g,
      "window.React"
    );

    // Also handle import statements (in case they weren't transformed)
    const vendettaImportRegex =
      /import\s+(\{[^}]*\}|\w+)\s+from\s+['"](@vendetta[^'"]*)['"];?/g;
    builtContent = builtContent.replace(
      vendettaImportRegex,
      (match, imports, moduleId) => {
        const globalName = getGlobalName(moduleId);
        if (globalName) {
          const importNames = imports.trim();
          return `const ${importNames} = ${globalName};`;
        }
        return match;
      }
    );

    // Handle react import statements
    const reactImportRegex =
      /import\s+(\{[^}]*\}|\w+)\s+from\s+['"]react['"];?/g;
    builtContent = builtContent.replace(reactImportRegex, (match, imports) => {
      const importNames = imports.trim();
      return `const ${importNames} = window.React;`;
    });

    // Write the processed content
    await writeFile(outPath, builtContent);

    // Read the built file to generate hash
    const builtFile = await readFile(outPath);
    manifest.hash = createHash("sha256").update(builtFile).digest("hex");
    manifest.main = "index.js";

    // Write updated manifest
    await writeFile(
      `./dist/${plug}/manifest.json`,
      JSON.stringify(manifest, null, 2)
    );

    console.log(`Successfully built ${manifest.name}!`);
  } catch (e) {
    console.error(`Failed to build plugin ${plug}:`, e);
    process.exit(1);
  }
}
