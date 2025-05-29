import SwaggerParser from "@apidevtools/swagger-parser";
import { configDotenv } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import {
  generateZodClientFromOpenAPI,
  getHandlebars,
} from "openapi-zod-client";
import type { OpenAPIObject } from "openapi3-ts";
import { resolveConfig } from "prettier";

// Env
configDotenv();

const { PUBLIC_API_URL: apiUrl } = import.meta.env;

// Configs
const distPath = "src/api.ts";
const prettierConfig = await resolveConfig("./");

const handlebars = getHandlebars();

handlebars.registerHelper("camelCase", function (str: string) {
  return str
    .replace(/([-_]\w)/g, (match) => match[1]!.toUpperCase())
    .replace(/^\w/, (match) => match.toLowerCase());
});
handlebars.registerHelper(
  "notEmitted",
  (schema: string, types: Record<string, boolean>) => {
    if (schema in types) {
      return false;
    }

    return true;
  },
);

// Open API
const openApiDoc = (await SwaggerParser.parse(
  `${apiUrl}/api/openapi.json`,
)) as OpenAPIObject;

// Create Zodios Client
await generateZodClientFromOpenAPI({
  openApiDoc,
  distPath,
  prettierConfig,
  handlebars: handlebars,
  options: {
    baseUrl: apiUrl,
    groupStrategy: "tag",
    withDocs: true,
    withAlias: true,
    withDescription: true,
    shouldExportAllTypes: true,
    shouldExportAllSchemas: true,
  },
  templatePath: "scripts/api.hbs",
});

// Read all the content as string
const apiContent = readFileSync(distPath, "utf-8");

// Remove all the passthroughs
const updatedApiContent = apiContent.replaceAll("passthrough()", "strict()");

// Write the updated content back to the file
writeFileSync(distPath, updatedApiContent, "utf-8");

console.log("Api generated successfully! ✅");
