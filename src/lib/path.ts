export function removeSlash(path: string | null) {
  if (!path) return path;

  return path.endsWith("/") ? path.slice(0, -1) : path;
}
