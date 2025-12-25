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
    // Bun build with IIFE format may leave externals as imports, so we need to replace them
    let builtContent = await readFile(outPath, "utf-8");

    // Handle @vendetta imports - replace with global variable references
    const vendettaImportRegex =
      /import\s+(\{[^}]*\}|\w+)\s+from\s+['"](@vendetta\/[^'"]+)['"];?/g;
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

    // Handle react import - replace with window.React
    const reactImportRegex =
      /import\s+(\{[^}]*\}|\w+)\s+from\s+['"]react['"];?/g;
    builtContent = builtContent.replace(reactImportRegex, (match, imports) => {
      const importNames = imports.trim();
      return `const ${importNames} = window.React;`;
    });

    // Also handle require statements for react
    builtContent = builtContent.replace(
      /require\(['"]react['"]\)/g,
      "window.React"
    );

    // Handle require statements for @vendetta modules
    const vendettaRequireRegex = /require\(['"](@vendetta\/[^'"]+)['"]\)/g;
    builtContent = builtContent.replace(
      vendettaRequireRegex,
      (match, moduleId) => {
        const globalName = getGlobalName(moduleId);
        return globalName || match;
      }
    );

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
