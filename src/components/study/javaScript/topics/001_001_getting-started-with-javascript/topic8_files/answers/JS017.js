/**
 * JS017: Strict Mode: Read-Only Property Mutation Defense
 * Module: 001_001_getting-started-with-javascript (Topic 6)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function enforceImmutableConfig() {
  "use strict";

  // Enterprise immutable settings object
  const systemConfig = Object.freeze({
    appName: "CoderAccoTaxLMS",
    taxRate: 0.18,
    maxLoginAttempts: 5
  });

  console.log("Original Frozen Config:", systemConfig);

  try {
    // In non-strict mode, this silent write fails with NO error.
    // In strict mode, the V8 engine immediately raises a TypeError!
    systemConfig.taxRate = 0.25;
  } catch (err) {
    console.log(`🛡️ Caught Expected Error: [${err.name}] -> ${err.message}`);
    console.log("✅ Verified: Frozen property remained strictly 0.18:", systemConfig.taxRate);
  }
}

enforceImmutableConfig();
