import { apiUrl } from "@/config";
import { makeApi, Zodios } from "@zodios/core";
import { z } from "zod";

// Types
export type HTTPValidationError = Partial<{
  detail: Array<ValidationError>;
}>;
export type ValidationError = {
  loc: Array<(string | number) | Array<string | number>>;
  msg: string;
  type: string;
};

// Schemas
const ValidationError: z.ZodType<ValidationError> = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError: z.ZodType<HTTPValidationError> = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();

export const schemas = {
  ValidationError,
  HTTPValidationError,
};

// Apis
const healthEndpoints = makeApi([
  {
    method: "get",
    path: "/api/health",
    alias: "healthCheck",
    description: `Health check endpoint.

Returns:
    dict[str, str]: A dictionary indicating the health status.`,
    requestFormat: "json",
    response: z.record(z.string()),
  },
]);
export const healthApi = new Zodios(apiUrl, healthEndpoints);

const notebookEndpoints = makeApi([
  {
    method: "get",
    path: "/api/notebook/:file_path",
    alias: "getNotebookFile",
    description: `Retrieve a notebook file.

Args:
    file_path (str): The path to the notebook file.

Returns:
    FileResponse: The notebook file response.`,
    requestFormat: "json",
    parameters: [
      {
        name: "file_path",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);
export const notebookApi = new Zodios(apiUrl, notebookEndpoints);
