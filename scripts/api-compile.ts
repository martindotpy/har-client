import SwaggerParser from "@apidevtools/swagger-parser";
import { configDotenv } from "dotenv";
import {
  generateZodClientFromOpenAPI,
  getHandlebars,
} from "openapi-zod-client";
import type { OpenAPIObject } from "openapi3-ts";
import { resolveConfig } from "prettier";

// Env
configDotenv();

const { API_URL: apiUrl } = import.meta.env;

// Configs
const prettierConfig = await resolveConfig("./");

const handlebars = getHandlebars();

handlebars.registerHelper("camelCase", function (str: string) {
  return str
    .replace(/([-_]\w)/g, (match) => match[1]!.toUpperCase())
    .replace(/^\w/, (match) => match.toLowerCase());
});

// Open API
const openApiDoc = (await SwaggerParser.parse(
  `${apiUrl}/api/openapi.json`,
)) as OpenAPIObject;

// Create Zodios Client
await generateZodClientFromOpenAPI({
  openApiDoc,
  distPath: "src/api.ts",
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

console.log("Api generated successfully! ✅");
