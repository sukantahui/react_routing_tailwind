/**
 * Topic 3 Demo: Setting Up Environment: Browser, VS Code & Live Server
 * Module: 001_001_getting-started-with-javascript
 * Educator: Sukanta Hui | Coder & AccoTax
 */

console.log("==================================================");
console.log("TOPIC 3: ENVIRONMENT SETUP & DEV WORKFLOW");
console.log("==================================================");

// ─── 1. ENVIRONMENT CAPABILITY & RUNTIME CONFIG INSPECTOR ────────
console.log("");
console.log("1. Developer Environment Inspection:");

function inspectDevelopmentEnvironment() {
  const isBrowser = typeof window !== "undefined";
  const userAgent = isBrowser ? navigator.userAgent : "Node.js Environment";
  const protocol = isBrowser && window.location ? window.location.protocol : "CLI";
  
  return {
    executionHost: isBrowser ? "Client Browser" : "Headless / Server Runtime",
    protocolType: protocol,
    isLocalServer: protocol.startsWith("http"),
    isDangerousFileProtocol: protocol === "file:",
    languageVersion: "ECMAScript 2024 / ESNext Supported",
    userAgentSnippet: userAgent.slice(0, 45) + "..."
  };
}

console.log("Dev Environment Configuration Matrix:");
console.table([inspectDevelopmentEnvironment()]);

// ─── 2. PROTOCOL SECURITY & CORS RESTRICTIONS (file:// vs http://) ──
console.log("");
console.log("2. Protocol Limitations Analysis (file:// vs http://localhost):");

function analyzeProtocolSecurity(protocol) {
  const features = [
    { feature: "CORS Fetch Requests", fileProtocol: "❌ BLOCKED (CORS Error)", httpLocalServer: "✓ ALLOWED" },
    { feature: "ES Module (import/export)", fileProtocol: "❌ BLOCKED (Origin null)", httpLocalServer: "✓ ALLOWED" },
    { feature: "Service Workers / PWAs", fileProtocol: "❌ BLOCKED (Secure context required)", httpLocalServer: "✓ ALLOWED (localhost exception)" },
    { feature: "LocalStorage Persistence", fileProtocol: "⚠️ Unstable origin mapping", httpLocalServer: "✓ ISOLATED PER PORT" },
    { feature: "Live Reload (WebSockets)", fileProtocol: "❌ NOT SUPPORTED", httpLocalServer: "✓ SUPPORTED (Live Server)" }
  ];

  console.table(features);
}

analyzeProtocolSecurity();

// ─── 3. LIVE SERVER WEBSOCKET HOT RELOAD SIMULATION ─────────────
console.log("");
console.log("3. VS Code Live Server WebSocket Sync Simulation:");

class LiveServerSimulator {
  constructor(port = 5500) {
    this.port = port;
    this.clients = [];
    this.active = true;
    console.log(`[Live Server] Serving at http://127.0.0.1:${port}/`);
  }

  connectClient(clientName) {
    this.clients.push(clientName);
    console.log(`[Live Server] Client '${clientName}' connected via WebSocket`);
  }

  triggerFileChange(fileName) {
    console.log(`[Live Server] File mutation detected on '${fileName}'. Broadcasting reload signal...`);
    this.clients.forEach(client => {
      console.log(` → Hot Reload dispatched to browser client: ${client}`);
    });
  }
}

const devServer = new LiveServerSimulator(5500);
devServer.connectClient("Chrome DevTools (Swadeep)");
devServer.connectClient("Edge Browser (Tuhina)");
devServer.triggerFileChange("index.html");

// ─── 4. CODE QUALITY & FORMATTING LINTER RULE VALIDATOR ──────────
console.log("");
console.log("4. VS Code ESLint & Prettier Code Rule Validator:");

function validateCodeFormatting(codeSnippet) {
  const issues = [];
  
  if (codeSnippet.includes("var ")) {
    issues.push("ESLint rule: 'no-var' violated. Use 'let' or 'const' instead.");
  }
  if (!codeSnippet.endsWith(";")) {
    issues.push("Prettier rule: Missing terminating semicolon.");
  }
  if (codeSnippet.includes("==") && !codeSnippet.includes("===")) {
    issues.push("ESLint rule: 'eqeqeq' violated. Use strict equality '==='.");
  }

  return {
    code: codeSnippet,
    status: issues.length === 0 ? "PASSED (Clean Production Quality)" : "FAILED (Linter Warnings)",
    warnings: issues
  };
}

console.log("Testing Code Snippet 1:", validateCodeFormatting("var x = 10 == 10"));
console.log("Testing Code Snippet 2:", validateCodeFormatting("const student = 'Abhronila';"));

// ─── 5. MULTI-ENVIRONMENT CONFIGURATION LOADER ───────────────────
console.log("");
console.log("5. Enterprise Multi-Environment Config Dispatcher:");

function loadEnvironmentConfig(envName) {
  const configs = {
    development: {
      apiUrl: "http://localhost:5000/api",
      enableDebugLogs: true,
      center: "Barrackpore Lab (Dev Sandbox)"
    },
    staging: {
      apiUrl: "https://staging.codernaccotax.co.in/api",
      enableDebugLogs: true,
      center: "Naihati QA Testbed"
    },
    production: {
      apiUrl: "https://api.codernaccotax.co.in/api",
      enableDebugLogs: false,
      center: "Production High-Availability Cluster"
    }
  };

  const selected = configs[envName] || configs.development;
  console.log(`Loaded Environment Profile: [${envName.toUpperCase()}]`);
  console.table([selected]);
  return selected;
}

loadEnvironmentConfig("development");

console.log("");
console.log("✓ All 5 Topic 3 practical examples executed successfully.");
