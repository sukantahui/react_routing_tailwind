/**
 * JS015: Strict Mode: Accidental Global Variable Leak Prevention
 * Module: 001_001_getting-started-with-javascript (Topic 6)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function runSafeModule() {
  "use strict"; // Prevents silent bugs and global variable pollution

  console.log("🔒 Enforcing 'use strict' inside function scope...");

  try {
    // Attempt to assign to undeclared identifier without let/const/var:
    unintentionalGlobal = "This will fail immediately in strict mode!";
  } catch (err) {
    console.log(`🛡️ Caught Expected Error: [${err.name}] -> ${err.message}`);
    console.log("✅ Verified: Global scope remained completely clean and unpolluted.");
  }
}

runSafeModule();
