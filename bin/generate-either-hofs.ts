import { Project, SyntaxKind } from "ts-morph";
import * as path from "path";
import { writeFile } from "fs";
import prettier from "prettier";

// Get the current file's directory
const currentDir = path.dirname(import.meta.path);

// Append a new file to this path
const importPath = path.join(currentDir, "../helpers.ts");

console.log(importPath);

// Initialize a Project
const project = new Project();

// Add the source file you want to analyze
const sourceFile = project.addSourceFileAtPath(importPath);

// Get all exported declarations
const exportedDeclarations = sourceFile.getExportedDeclarations();

let exportDecs: string[] = [];

// Filter for functions and log their names
exportedDeclarations.forEach((declarations, name) => {
  declarations.forEach((declaration) => {
    if (
      declaration.isKind(SyntaxKind.FunctionDeclaration) ||
      (declaration.isKind(SyntaxKind.VariableDeclaration) &&
        declaration.getInitializerIfKind(SyntaxKind.ArrowFunction) !==
          undefined)
    ) {
      exportDecs.push(name);
    }
  });
});

let fileStr = `import * as H from "./helpers";
import { eitherify } from "@okeeffed/eitherify";

${exportDecs.map((dec) => `export const ${dec} = eitherify(H.${dec});`).join("\n")}`;

// Write bun file to ../helpers-either.ts
const filePath = path.join(currentDir, "../helpers-either.ts");
const formattedStr = await prettier.format(fileStr, { parser: "typescript" });

writeFile(filePath, formattedStr, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File written successfully");
  }
});
