// src/common/wasmCExecutor.js

let tccModulePromise = null;

/**
 * Lazy-load the TinyCC/Clang WASM module only once.
 * Assumes you have /wasm/tcc.js in public/.
 *
 * Many Emscripten builds export a default function that returns a Promise<Module>.
 */
async function getTccModule() {
  if (!tccModulePromise) {
    // Vite will serve /wasm/tcc.js from public/wasm/tcc.js
    tccModulePromise = new Promise((resolve, reject) => {
      // Load the script dynamically
      const script = document.createElement("script");
      script.src = "/wasm/tcc.js";
      script.async = true;

      script.onload = () => {
        // Emscripten usually exposes a global "Module" or a factory function
        // Example 1: global Module
        if (typeof window.Module !== "undefined") {
          resolve(window.Module);
        }
        // Example 2: global createTccModule() that returns a Promise
        else if (typeof window.createTccModule === "function") {
          window
            .createTccModule()
            .then((m) => resolve(m))
            .catch(reject);
        } else {
          reject(
            new Error(
              "tcc.js loaded, but no Module or createTccModule() found. Check WASM build docs."
            )
          );
        }
      };

      script.onerror = () => {
        reject(new Error("Failed to load /wasm/tcc.js"));
      };

      document.head.appendChild(script);
    });
  }

  return tccModulePromise;
}

/**
 * Run C source code inside the WASM C engine.
 *
 * This assumes your WASM engine:
 *  - has a virtual FS (Module.FS)
 *  - has a function "run_main" or similar compiled with Emscripten
 *  - writes to stdout/stderr that we can capture
 *
 * You MUST adjust "run_main", file paths, or FS usage based on
 * the specific TinyCC/Clang WASM you choose.
 */
export async function runCInWasm(source) {
  const Module = await getTccModule();

  // --- 1. Prepare "program.c" inside WASM FS ---
  const filename = "/program.c";

  try {
    // If FS is not initialized, this will throw
    Module.FS.writeFile(filename, source);
  } catch (err) {
    throw new Error(
      "WASM FS is not available. Check your TinyCC/Clang WASM build and Emscripten FS settings."
    );
  }

  // --- 2. Capture stdout / stderr ---
  // Emscripten allows overriding print/printErr
  let stdoutBuffer = "";
  let stderrBuffer = "";

  const oldPrint = Module.print;
  const oldPrintErr = Module.printErr;

  Module.print = (text) => {
    stdoutBuffer += text + "\n";
  };

  Module.printErr = (text) => {
    stderrBuffer += text + "\n";
  };

  // --- 3. Call the C "runner" function ---
  try {
    /**
     * You need a C function something like:
     *
     *   int run_main(const char *filename);
     *
     * compiled with Emscripten and exported.
     *
     * Then you can call it via ccall:
     */
    if (typeof Module.ccall !== "function") {
      throw new Error("Module.ccall is not available – Emscripten runtime missing.");
    }

    const exitCode = Module.ccall(
      "run_main", // C function name exported from WASM
      "number",   // return type
      ["string"], // argument types
      [filename]  // arguments
    );

    if (exitCode !== 0 && !stderrBuffer) {
      stderrBuffer += `Program exited with code ${exitCode}\n`;
    }
  } catch (err) {
    stderrBuffer += `WASM runtime error: ${err.message || String(err)}\n`;
  } finally {
    // restore prints
    Module.print = oldPrint;
    Module.printErr = oldPrintErr;
  }

  return {
    stdout: stdoutBuffer.trim(),
    stderr: stderrBuffer.trim(),
  };
}
