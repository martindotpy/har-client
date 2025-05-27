/**
 * Parses HTML attributes from a string.
 *
 * @param html HTML string to parse attributes from.
 * @returns Parsed attributes as a record.
 */
export function parseAttributes(html: string): Record<string, string> {
  const regex = /(\w+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  const attrs: Record<string, string> = {};
  let match;
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    const key = match[1]!;
    const value = match[2] ?? match[3] ?? match[4] ?? true;

    if (index === 0 && value === true) {
      index++;
      continue;
    }

    attrs[key] = String(value);
    index++;
  }

  return attrs;
}
