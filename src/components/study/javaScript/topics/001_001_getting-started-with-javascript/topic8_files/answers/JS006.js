/**
 * JS006: Local Server vs File Protocol (http:// vs file://) Verifier
 * Module: 001_001_getting-started-with-javascript (Topic 3)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function verifyDevelopmentServer() {
  const isBrowser = typeof window !== "undefined" && typeof window.location !== "undefined";

  if (!isBrowser) {
    return {
      status: "NODE_CLI",
      protocol: "N/A",
      message: "Running in non-browser Node.js runtime. HTTP server check not applicable."
    };
  }

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;

  const isLocalServer = protocol.startsWith("http") && (hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168."));
  const isFileProtocol = protocol === "file:";

  return {
    protocol,
    hostname,
    port: port || "Default (80/443)",
    isLiveServer: isLocalServer,
    corsAndModulesSupported: !isFileProtocol,
    recommendation: isFileProtocol 
      ? "⚠️ WARNING: You opened this file directly via file://. ES Modules, Web Workers, and Fetch API will be blocked by browser CORS policy. Please use VS Code Live Server (http://127.0.0.1:5500)."
      : "✅ SUCCESS: Running through HTTP development server. Full ES2026 modules and APIs enabled."
  };
}

console.log("Development Environment Check:");
console.table([verifyDevelopmentServer()]);
