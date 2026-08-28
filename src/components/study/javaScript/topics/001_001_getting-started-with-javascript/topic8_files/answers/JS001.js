/**
 * JS001: Runtime Environment & Host Detection
 * Module: 001_001_getting-started-with-javascript (Topic 0)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function detectJavaScriptRuntime() {
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
  const isNode = typeof process !== "undefined" && process.versions && process.versions.node;
  const isDeno = typeof Deno !== "undefined";
  const isBun = typeof Bun !== "undefined";
  const isWebWorker = typeof importScripts === "function" && typeof WorkerGlobalScope !== "undefined";

  let environment = "Unknown Runtime";
  let engine = "Unknown Engine";
  let globalObjectName = "globalThis";

  if (isBun) {
    environment = "Bun Runtime";
    engine = "JavaScriptCore";
    globalObjectName = "globalThis / Bun";
  } else if (isDeno) {
    environment = "Deno Secure Runtime";
    engine = "V8";
    globalObjectName = "globalThis / Deno";
  } else if (isNode) {
    environment = `Node.js (v${process.versions.node})`;
    engine = "V8 (Google)";
    globalObjectName = "global / globalThis";
  } else if (isBrowser) {
    environment = "Web Browser Window Context";
    engine = navigator.userAgent.includes("Chrome") ? "V8 (Blink)" : 
             navigator.userAgent.includes("Firefox") ? "SpiderMonkey (Gecko)" : 
             navigator.userAgent.includes("Safari") ? "JavaScriptCore (WebKit)" : "Browser Engine";
    globalObjectName = "window / globalThis";
  } else if (isWebWorker) {
    environment = "Dedicated Web Worker Thread";
    globalObjectName = "self / globalThis";
  }

  return {
    environment,
    engine,
    globalObjectName,
    hasDOM: typeof document !== "undefined",
    hasFileSystem: isNode || isDeno || isBun
  };
}

const runtimeInfo = detectJavaScriptRuntime();
console.log("🚀 Host Runtime Analysis:");
console.table([runtimeInfo]);
