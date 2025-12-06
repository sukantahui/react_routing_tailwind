// =============================================================
//  Lightweight C Code Formatter (Safe for Browser, No WASM)
//  This avoids large clang-format WASM files and works instantly.
// =============================================================

export function formatCode(source, lang = "c") {
  // Basic indentation variables
  const lines = source.split("\n");
  let indent = 0;
  const INDENT = "    "; // 4 spaces

  const formatted = [];

  for (let raw of lines) {
    let line = raw.trim();

    // Reduce indent before printing a closing brace
    if (line.startsWith("}")) {
      indent = Math.max(0, indent - 1);
    }

    // Apply indent
    formatted.push(INDENT.repeat(indent) + line);

    // Increase indent after opening brace
    if (line.endsWith("{")) {
      indent++;
    }
  }

  return formatted.join("\n");
}
