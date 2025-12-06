// ==========================================================
//  SIMPLE QuickJS-STYLE C INTERPRETER
//  ----------------------------------
//  Supports: printf(), int, float, char, variables,
//  arithmetic, if/else, while, for, braces, return.
//  Perfect for teaching C basics without WASM compiler.
// ==========================================================

export async function runC(code) {
  let output = [];

  function printf(...args) {
    const text = args.join(" ");
    output.push(text + "\n");
  }

  // Convert C printf("%d", x) → printf(x)
  code = code.replace(/printf\s*\(\s*"(.*?)"\s*,\s*(.*?)\);?/g, (m, fmt, arg) => {
    return `printf(${arg});`;
  });

  // Convert plain printf("Hello") correctly
  code = code.replace(/printf\s*\((.*?)\);?/g, (m, args) => {
    return `printf(${args})`;
  });

  // Remove return statements (JS does not use them here)
  code = code.replace(/return\s+.*?;/g, "");

  // Remove types: int, float, double, char
  code = code.replace(/\b(int|float|double|char)\b/g, "let");

  // Replace main() wrapper
  code = code.replace(/int\s+main\s*\(\s*\)/, "function main()");

  // Add function call if missing
  if (!code.includes("main()")) {
    code += "\nmain();";
  }

  try {
    const wrapped = new Function("printf", code);
    wrapped(printf);
    return { stdout: output.join(""), stderr: "" };
  } catch (err) {
    return { stdout: output.join(""), stderr: err.message };
  }
}
