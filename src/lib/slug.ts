export function generateSlug(text: string) {
  return text
    .match(/[a-záéíóúñüA-ZÁÉÍÓÚÑÜ0-9]+/g)
    ?.join(" ")
    .replace(/\s+/g, "-")
    .toLowerCase();
}
