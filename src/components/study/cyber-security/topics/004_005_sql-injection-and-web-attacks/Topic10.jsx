import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgPipelineId = useId();

  // Studio 1: Active Defense Triad Pattern Selection
  const [selectedPatternKey, setSelectedPatternKey] = useState("allowlist_vs_blocklist");

  // Studio 2: Live 4-Stage Transformation Pipeline Simulator State
  const [rawInputString, setRawInputString] = useState("\uFF1Cscript\uFF1Ealert(1)\uFF1C/script\uFF1E");
  const [targetSchemaType, setTargetSchemaType] = useState("indian_gstin"); // indian_gstin, citizen_pan, payment_amount, rich_html_bio
  const [destinationContext, setDestinationContext] = useState("html_body"); // html_body, javascript_block, sql_literal, json_response
  const [activePipelineStages, setActivePipelineStages] = useState({
    canonicalization: true,
    schemaValidation: true,
    sanitization: true,
    outputEncoding: true
  });

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_schema_validation");

  // Studio 4: Input/Output Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("zod_schema_middleware");

  // 8 Defense Triad Patterns for Studio 1
  const patternDatabase = {
    allowlist_vs_blocklist: {
      key: "allowlist_vs_blocklist",
      name: "1. Allowlist (Positive) vs Blocklist Fallacy",
      category: "INPUT VALIDATION GATING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Define what is permitted, rather than attempting to enumerate all evil.",
      mechanismDescription:
        "Blocklists fail due to infinite encoding variations (`<sCrIpt>`, Unicode homoglyphs, SQL dialect differences). Allowlists define the exact regex grammar, character set, and type required, rejecting all non-conforming inputs at the perimeter.",
      mitigationPattern: "Enforce strict allowlists using regular expressions or schema parsers.",
      typicalSyntax: "/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/",
      codeSnippet: `// Positive Allowlist Validation:
const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(rawPanNumber);`
    },
    unicode_nfkc_canonicalization: {
      key: "unicode_nfkc_canonicalization",
      name: "2. Unicode NFKC Canonicalization",
      category: "DATA NORMALIZATION & DECODING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      securityPrinciple: "Transform multi-byte homoglyphs before validation checks execute.",
      mechanismDescription:
        "Attackers submit full-width characters (`\uFF1C` for `<`) to bypass ASCII filters. Calling `str.normalize('NFKC')` converts homoglyphs into standard ASCII before regex evaluation, defeating normalization bypasses.",
      mitigationPattern: "Always normalize Unicode (`NFKC`) and URL-decode before running validation rules.",
      typicalSyntax: "const canonicalInput = rawInput.normalize('NFKC').trim();",
      codeSnippet: `// Unicode Canonicalization:
const cleanString = rawUserInput.normalize('NFKC').trim(); // Resolves full-width brackets!`
    },
    tlfr_validation_framework: {
      key: "tlfr_validation_framework",
      name: "3. TLFR Framework (Type, Length, Format, Range)",
      category: "SYNTACTIC BOUNDARY ENFORCEMENT",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      securityPrinciple: "Comprehensive 4-dimensional input constraint validation.",
      mechanismDescription:
        "Validates: 1. Type (integer/string/boolean); 2. Length (exact or bounded char counts); 3. Format (regular expression grammar); 4. Range (numerical min/max boundaries). Any failed dimension terminates the request with HTTP 400.",
      mitigationPattern: "Apply TLFR rules across all incoming API request parameters.",
      typicalSyntax: "Type: String | Length: 15 | Format: GSTIN Regex | Range: State 01..37",
      codeSnippet: `// TLFR Constraint Example:
z.string().length(15).regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);`
    },
    schema_driven_zod_validation: {
      key: "schema_driven_zod_validation",
      name: "4. Schema-Driven Validation (Zod / Pydantic)",
      category: "AUTOMATED CONTRACT PARSING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Declarative type-safe contracts with automatic property stripping.",
      mechanismDescription:
        "Defines strict declarative schemas that parse, coerce, and strip unexpected properties (`.strict()`), preventing Mass Assignment and ensuring backend controllers receive 100% verified, type-safe data.",
      mitigationPattern: "Deploy Zod / Pydantic validation middleware on all API intake endpoints.",
      typicalSyntax: "const validatedBody = MerchantTransferSchema.parse(req.body);",
      codeSnippet: `// Zod Schema Controller Gating:
const TransferSchema = z.object({
    recipientId: z.string().uuid(),
    amount: z.number().positive().max(500000)
}).strict();`
    },
    context_aware_output_encoding: {
      key: "context_aware_output_encoding",
      name: "5. Context-Aware Output Encoding",
      category: "DESTINATION PARSER SAFETY",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      securityPrinciple: "Translate characters tailored to the specific destination parser.",
      mechanismDescription:
        "HTML body requires entity encoding (`<` $\\to$ `&lt;`); JavaScript blocks require Unicode hex (`'` $\\to$ `\\u0027`); URL parameters require percent-encoding. Generic HTML encoding inside `<script>` fails to stop JavaScript execution.",
      mitigationPattern: "Use dedicated context encoders for HTML, JavaScript, URL, and CSS destinations.",
      typicalSyntax: "HTML: &lt;script&gt; | JS: \\u0027\\u003Balert(1)\\u002F\\u002F",
      codeSnippet: `// Context-Aware Encoding:
// HTML Body: encodeForHtmlBody(data) | JavaScript String: encodeForJavaScript(data)`
    },
    magic_byte_file_verification: {
      key: "magic_byte_file_verification",
      name: "6. Magic Byte Binary File Verification",
      category: "BINARY FILE UPLOAD HARDENING",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      securityPrinciple: "Never trust client-supplied extensions or Content-Type headers.",
      mechanismDescription:
        "Inspects binary file headers (magic numbers, e.g. `\xFF\xD8\xFF` for JPEG) to verify actual file format, completely neutralizing file extension spoofing (`document.pdf.jpg`) and MIME sniffing attacks.",
      mitigationPattern: "Read leading binary bytes to verify genuine file signatures before saving.",
      typicalSyntax: "Buffer.readUInt16BE(0) === 0xFFD8 // JPEG Magic Header",
      codeSnippet: `// Magic Byte Inspection:
const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;`
    },
    redos_catastrophic_backtracking: {
      key: "redos_catastrophic_backtracking",
      name: "7. ReDoS Catastrophic Backtracking Prevention",
      category: "REGEX PERFORMANCE & AVAILABILITY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      securityPrinciple: "Avoid nested quantifiers that cause exponential O(2^N) evaluation times.",
      mechanismDescription:
        "Regexes with nested quantifiers (e.g. `^([a-zA-Z0-9]+)+$`) suffer exponential backtracking on non-matching inputs, freezing CPU cores at 100%. Defensive coding mandates atomic grouping or linear-time regex engines.",
      mitigationPattern: "Lint regexes with safe-regex tools and enforce linear complexity bounds.",
      typicalSyntax: "Safe: /^[a-zA-Z0-9]{1,30}$/ | Unsafe: /^([a-zA-Z0-9]+)*$/",
      codeSnippet: `// Linear-Time Safe Regex:
const SafeUsernameRegex = /^[a-zA-Z0-9_-]{3,20}$/; // Linear O(N) evaluation time!`
    },
    dompurify_rich_text_whitelisting: {
      key: "dompurify_rich_text_whitelisting",
      name: "8. DOMPurify Rich HTML Tag Whitelisting",
      category: "MARKUP SANITIZATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Permit benign formatting while stripping active script execution nodes.",
      mechanismDescription:
        "Parses rich text markup into a DOM tree, strips all executable tags (`<script>`, `<iframe>`) and dangerous inline event handlers (`onerror`, `onload`), returning safe HTML formatting.",
      mitigationPattern: "Sanitize rich user content with DOMPurify before inserting into the DOM.",
      typicalSyntax: "DOMPurify.sanitize(dirtyHtml, { ALLOWED_TAGS: ['b', 'i', 'p'] })",
      codeSnippet: `// DOMPurify Sanitization:
const cleanHtml = DOMPurify.sanitize(userContent, { ALLOWED_TAGS: ['b', 'i', 'p', 'strong'] });`
    }
  };

  const activePattern = patternDatabase[selectedPatternKey];

  // Studio 2: Live 4-Stage Transformation Pipeline Simulator Calculations
  const simulationResults = useMemo(() => {
    let stage1Canonical = rawInputString;
    let stage2Validation = { passed: true, error: "" };
    let stage3Sanitized = rawInputString;
    let stage4Encoded = rawInputString;
    let finalHttpStatus = 200;

    // Stage 1: Canonicalization (NFKC normalization)
    if (activePipelineStages.canonicalization) {
      stage1Canonical = rawInputString.normalize('NFKC').trim();
    }

    // Stage 2: Schema Validation (TLFR Check based on targetSchemaType)
    if (activePipelineStages.schemaValidation) {
      if (targetSchemaType === "indian_gstin") {
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstinRegex.test(stage1Canonical)) {
          stage2Validation = { passed: false, error: "Validation Failed: Input does not conform to Indian GSTIN 15-character allowlist grammar!" };
          finalHttpStatus = 400;
        }
      } else if (targetSchemaType === "citizen_pan") {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(stage1Canonical)) {
          stage2Validation = { passed: false, error: "Validation Failed: Input does not conform to Citizen PAN 10-character allowlist grammar!" };
          finalHttpStatus = 400;
        }
      } else if (targetSchemaType === "payment_amount") {
        const num = parseFloat(stage1Canonical);
        if (isNaN(num) || num &le; 0 || num > 500000 || !/^[0-9]+(\.[0-9]{1,2})?$/.test(stage1Canonical)) {
          stage2Validation = { passed: false, error: "Validation Failed: Input is not a positive numerical amount between ₹1.00 and ₹5,00,000.00!" };
          finalHttpStatus = 400;
        }
      } else {
        // rich_html_bio: checks length bounds
        if (stage1Canonical.length > 500) {
          stage2Validation = { passed: false, error: "Validation Failed: Rich text exceeds maximum length bound of 500 characters!" };
          finalHttpStatus = 400;
        }
      }
    }

    // Stage 3: Sanitization (DOMPurify / Control Char Stripping)
    if (activePipelineStages.sanitization) {
      stage3Sanitized = stage1Canonical
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/onerror\s*=\s*['"][^'"]*['"]/gi, "")
        .replace(/onload\s*=\s*['"][^'"]*['"]/gi, "")
        .replace(/javascript:[^'"]*/gi, "about:blank");
    } else {
      stage3Sanitized = stage1Canonical;
    }

    // Stage 4: Context-Aware Output Encoding
    if (activePipelineStages.outputEncoding) {
      if (destinationContext === "html_body") {
        stage4Encoded = stage3Sanitized
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;");
      } else if (destinationContext === "javascript_block") {
        stage4Encoded = Array.from(stage3Sanitized).map(c => {
          return (/[a-zA-Z0-9]/.test(c)) ? c : '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
        }).join('');
      } else if (destinationContext === "sql_literal") {
        stage4Encoded = `[PARAMETERIZED_BINDING_SLOT: "${stage3Sanitized}"]`;
      } else {
        stage4Encoded = JSON.stringify(stage3Sanitized);
      }
    } else {
      stage4Encoded = stage3Sanitized;
    }

    const isInputSafe = stage2Validation.passed && (activePipelineStages.outputEncoding || (!rawInputString.includes("<") && !rawInputString.includes("'")));

    return {
      stage1Canonical,
      stage2Validation,
      stage3Sanitized,
      stage4Encoded,
      finalHttpStatus,
      isInputSafe,
      badgeClass: !stage2Validation.passed
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : isInputSafe
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : "bg-rose-950 text-rose-300 border-rose-800",
      statusMessage: !stage2Validation.passed
        ? `PERIMETER GATING BLOCKED: Schema validation rejected malformed input (HTTP 400 Bad Request); Malicious payload dropped before reaching internal controllers!`
        : isInputSafe
        ? `COMPLETE PIPELINE SAFETY INVARIANT ACHIEVED: Normalized via NFKC ➔ Verified by Allowlist Schema ➔ Sanitized ➔ Context-Encoded for ${destinationContext.toUpperCase()}; Exploitability is 0.00%!`
        : `CRITICAL INJECTION RISK: Schema validation passed or was disabled without Context Encoding; Untrusted payload rendered directly into ${destinationContext.toUpperCase()} context!`
    };
  }, [rawInputString, targetSchemaType, destinationContext, activePipelineStages]);

  // Studio 4: Input/Output Hardening Production Code Database
  const codeDatabase = {
    zod_schema_middleware: {
      name: "Express.js Production Zod Schema Validation & Strict Property Gating Middleware",
      code: `// Express.js Production Zod Schema Middleware:
const { z } = require('zod');

// 1. Define Strict Business Allowlist Schema
const CorporateMerchantIntakeSchema = z.object({
    businessName: z.string().trim().min(3).max(100).regex(/^[a-zA-Z0-9 .&'-]+$/, "Invalid business name"),
    // Strict Indian GSTIN Allowlist Grammar (15 Characters):
    gstNumber: z.string().trim().toUpperCase().regex(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid Indian GSTIN format"
    ),
    settlementAmount: z.number().positive().max(10000000.00),
    contactEmail: z.string().email().max(120),
    operatingStateCode: z.number().int().min(1).max(37)
}).strict(); // STRICT MODE: Automatically rejects any un-whitelisted properties!

// 2. Generic Validation Middleware Factory
const validateBody = (schema) => (req, res, next) => {
    try {
        // Normalize Unicode NFKC across all string fields before parsing:
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].normalize('NFKC');
            }
        }
        req.validatedBody = schema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: "Validation Failed", details: err.errors });
        }
        next(err);
    }
};

module.exports = { CorporateMerchantIntakeSchema, validateBody };`,
      explanation: "Production Express.js Zod validation middleware enforcing strict type, length, format, and range (TLFR) constraints, normalizing Unicode before parsing, and rejecting unexpected properties with `.strict()`."
    },
    context_aware_encoder_class: {
      name: "Enterprise Multi-Context Output Encoder Class (HTML, JS, URL, CSS)",
      code: `// Comprehensive Multi-Context Output Encoder:
class SecureContextEncoder {
    // 1. HTML Body Context Encoder
    static encodeForHtmlBody(input = '') {
        return String(input)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\\//g, '&#x2F;');
    }

    // 2. HTML Attribute Context Encoder (Strict Alphanumeric Whitelist)
    static encodeForAttribute(input = '') {
        return String(input).replace(/[^a-zA-Z0-9]/g, (c) => \`&#x\${c.charCodeAt(0).toString(16)};\`);
    }

    // 3. JavaScript Block Literal Encoder (Unicode Hex Escape Sequences)
    static encodeForJavaScript(input = '') {
        return String(input).replace(/[^a-zA-Z0-9]/g, (c) => {
            return '\\\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
        });
    }

    // 4. URL Scheme & Parameter Sanitizer
    static sanitizeUrl(rawUrl = '') {
        try {
            const parsed = new URL(String(rawUrl).trim());
            if (['https:', 'http:', 'mailto:'].includes(parsed.protocol)) {
                return parsed.href;
            }
        } catch (e) { /* Invalid URL */ }
        return 'about:blank'; // Rejects javascript: and data: pseudo-protocols!
    }
}

module.exports = SecureContextEncoder;`,
      explanation: "Enterprise-grade context-aware encoding class providing dedicated translation routines for HTML body text, HTML attribute values, JavaScript script blocks, and URL hyperlinks."
    },
    magic_byte_file_validator: {
      name: "Node.js Native Binary Magic Byte Verification for Secure File Uploads",
      code: `// Node.js Binary Magic Byte File Upload Validator:
const fs = require('fs');

class SecureFileUploadValidator {
    static MAGIC_SIGNATURES = {
        jpeg: [0xFF, 0xD8, 0xFF],
        png:  [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
        pdf:  [0x25, 0x50, 0x44, 0x46] // %PDF
    };

    static async verifyFileSignature(filePath, expectedType) {
        const expectedMagic = this.MAGIC_SIGNATURES[expectedType];
        if (!expectedMagic) throw new Error("Unsupported file type verification.");

        const buffer = Buffer.alloc(expectedMagic.length);
        const fileDescriptor = fs.openSync(filePath, 'r');
        fs.readSync(fileDescriptor, buffer, 0, expectedMagic.length, 0);
        fs.closeSync(fileDescriptor);

        // Compare leading binary bytes:
        for (let i = 0; i < expectedMagic.length; i++) {
            if (buffer[i] !== expectedMagic[i]) {
                return false; // Binary signature mismatch! (e.g. PHP script disguised as JPEG)
            }
        }
        return true;
    }
}

module.exports = SecureFileUploadValidator;`,
      explanation: "Production Node.js file upload validator inspecting leading binary magic numbers to confirm true file types, defeating extension spoofing (`avatar.php.jpg`) and MIME-sniffing bypasses."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_schema_validation",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Deploying Zod Schema Validation & Indian GST/PAN Allowlists on Payment Intake APIs",
      threatType: "MALFORMED INPUT PARAMETER INJECTION & MASS ASSIGNMENT",
      budget: "₹96,00,000",
      incident:
        "Adversaries injected Unicode homoglyphs and hidden role fields into invoice registration routes to bypass validation and elevate merchant roles.",
      defenseStrategy:
        "Mamata deployed strict Zod schema validation (`CorporateMerchantIntakeSchema.strict()`) with NFKC canonicalization and Indian GSTIN allowlists.",
      outcome: "100% of malformed payloads dropped at perimeter; zero Mass Assignment flaws; ₹4,500 Crores in daily merchant settlements protected.",
      metrics: {
        malformedPayloadsBlocked: "100.0%",
        settlementVolumeProtected: "₹4,500 Crores",
        apiIntakeRoutesHardened: "98 Endpoints",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_bounds_checking",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "NUMERICAL RANGE OVERFLOW IN SCADA BREAKER TELEMETRY",
      title: "Hardening Substation JSON Telemetry Payloads with Strict Bounds Checking and Canonicalization",
      budget: "₹65,00,000",
      incident:
        "Adversaries injected negative frequency values (`-9999.0 Hz`) and null bytes into breaker telemetry APIs attempting to crash monitoring daemons.",
      defenseStrategy:
        "Debangshu enforced TLFR numerical range bounds (49.5 Hz to 50.5 Hz) and deployed native JSON schema validators rejecting null bytes.",
      outcome: "100% of out-of-bounds telemetry packets rejected; breaker monitoring daemons maintained 100% uptime across North 24 Parganas.",
      metrics: {
        outOfBoundsPacketsBlocked: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedCommands: "0 Incidents",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_ehr_sanitization",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "MULTI-BYTE CHARACTER INJECTION IN ONCOLOGY PATIENT RECORDS",
      title: "Protecting Oncology Electronic Health Records (EHR) from Multi-Byte XSS Injection",
      budget: "₹50,00,000",
      incident:
        "Phishing attacks submitted full-width Unicode characters (`\uFF1Cscript\uFF1E`) in diagnostic notes to bypass naive ASCII filters and trigger XSS on oncologist consoles.",
      defenseStrategy:
        "Mahima deployed Unicode NFKC canonicalization, sanitized rich text with DOMPurify, and enforced context-aware output encoding across clinical views.",
      outcome: "100% of multi-byte XSS probes neutralized; zero doctor sessions compromised; 120,000 cancer patient records fully secured.",
      metrics: {
        multibyteProbesBlocked: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_pipeline_invariant_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF INPUT TRANSFORMATION PIPELINES & PARSER INVARIANTS",
      title: "Formulating the Formal Transformation Pipeline Safety Theorem in IEEE Transactions",
      budget: "₹43,00,000",
      incident:
        "Researchers modeled the mathematical state transitions across 4-stage transformation pipelines (Canonicalize ➔ Validate ➔ Sanitize ➔ Encode).",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that x_safe in L_safe guarantees P_bypass = 0.00%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 420,000 simulated transformation pipeline executions.",
      metrics: {
        simulationTrials: "420,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Transformation Pipeline Invariant Model",
        publication: "IEEE Transactions on Information Forensics"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_005
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 10
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Input Validation, Sanitization, and Output Encoding
            </h1>
            <p className="text-xs text-gray-400">
              The Defense Triad, Allowlists vs Blocklists, Unicode NFKC normalization, TLFR framework, Zod schemas, context encoding, and IT Act Section 66F.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              The Defense Triad: Validation, Sanitization &amp; Encoding
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Input &amp; Output Defense: Gating, Normalization, and Context-Aware Translation
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Comprehensive web application security requires a structured, multi-stage <strong>Defense Triad</strong> spanning 
              the entire lifecycle of data. <strong>Input Validation</strong> operates at the application perimeter as a strict 
              syntactic and semantic gatekeeper, evaluating incoming data against positive <strong>Allowlists</strong> (whitelists) 
              under the <strong>TLFR Framework (Type, Length, Format, Range)</strong> and immediately rejecting malformed inputs (HTTP 400). 
              <strong>Sanitization</strong> normalizes data, stripping illegal control characters and resolving multi-byte Unicode homoglyphs 
              via <strong>NFKC Canonicalization</strong> before security checks execute. Finally, <strong>Context-Aware Output Encoding</strong> 
              translates characters into safe entity representations tailored specifically to the destination parser 
              (HTML body entities, JavaScript Unicode hex `\u0027`, URL percent-encoding, or Parameterized SQL bindings), 
              guaranteeing that data can never be misinterpreted as executable code (P_bypass = 0.00%).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Defense Triad Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The 3 Core Defensive Pillars
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60 text-[11px]">
                Validate (Allowlist Gating) ➔ Sanitize (NFKC Normalization) ➔ Encode (Context Parser)
              </div>
              <p className="text-gray-300 leading-relaxed">
                Validation handles business logic correctness at entry; Sanitization cleans data in transit; Output Encoding guarantees parser safety at exit.
              </p>
            </div>

            {/* Unicode & Magic Bytes Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-cyan-950/60 space-y-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                Advanced Canonicalization &amp; Binary Verification
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Unicode NFKC Normalization:</strong> Resolves full-width homoglyphs before regex parsing.</li>
                <li>• <strong className="text-purple-300">Magic Byte Binary Verification:</strong> Confirms genuine file headers (JPEG `FF D8 FF`) over extensions.</li>
                <li>• <strong className="text-amber-300">Linear-Time Safe Regexes:</strong> Prevents ReDoS catastrophic backtracking freezes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - 4-Stage Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              4-Stage Transformation Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing the Input/Output Pipeline: From Raw String to Context-Safe Output
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an incoming untrusted payload passes through Canonicalization, Allowlist Gating, Sanitization, and Context Encoding:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: RAW INPUT */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. RAW INPUT (x0)
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Untrusted Client String
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PAYLOAD ARRIVAL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Homoglyphs / HTML
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  \uFF1Cscript\uFF1E
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: CANONICALIZATION (NFKC) */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. CANONICALIZE (x1)
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  NFKC Normalization
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RESOLVES HOMOGLYPHS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  x1 = normalize('NFKC')
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Standard ASCII Form!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: SCHEMA ALLOWLIST GATING */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. VALIDATE (x2)
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Zod Schema &amp; TLFR Gate
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ALLOWLIST CHECK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  x1 in L_allow?
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Rejects Malformed (400)!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: CONTEXT-AWARE ENCODING */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. ENCODE (x_safe)
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Context Parser Translation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TRANSLATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  &lt; ➔ &amp;lt; | ' ➔ \u0027
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Tailored to Destination!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: SAFE PARSER EXECUTION */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. SAFE OUTPUT
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Zero Parser Mutation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  THEOREM INVARIANT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  x_safe in L_safe
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  P_bypass = 0.00%!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Pattern Defense Triad Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Input Validation, Sanitization &amp; Output Encoding Pattern Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a defensive pattern below to examine its category, security principle, 
              transformation mechanics, enterprise mitigation patterns, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(patternDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedPatternKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedPatternKey === item.key
                    ? "bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-emerald-950 text-emerald-300 border-emerald-800 self-start">
                  DEFENSE
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activePattern.categoryBadge)}>
                    {activePattern.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Principle: {activePattern.securityPrinciple}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-[11px]">
                    Syntax: {activePattern.typicalSyntax}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activePattern.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Transformation Mechanics &amp; Parser Protection
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activePattern.mechanismDescription}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activePattern.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Execution &amp; Implementation Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activePattern.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live 4-Stage Transformation Pipeline Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. 4-Stage Input/Output Transformation Pipeline Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enter an untrusted raw payload, select the Target Schema Specification and Destination Context, 
              and toggle Pipeline Stages to evaluate step-by-step transformations and parser safety:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Pipeline Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Raw Client Payload Input (x0):</span>
                <input
                  type="text"
                  value={rawInputString}
                  onChange={(e) => setRawInputString(e.target.value)}
                  className="w-full p-2 bg-gray-950 rounded border border-gray-800 text-cyan-300 font-mono text-xs focus:border-cyan-500 outline-none"
                /&gt;
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Target Schema Specification:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "indian_gstin", label: "Indian GSTIN (15-Char Allowlist Regex)" },
                    { id: "citizen_pan", label: "Citizen PAN (10-Char Allowlist Regex)" },
                    { id: "payment_amount", label: "Payment Amount (₹1.00 to ₹5,00,000.00)" },
                    { id: "rich_html_bio", label: "Rich Text Bio (DOMPurify Sanitized HTML)" }
                  ].map((sch) => (
                    <button
                      key={sch.id}
                      onClick={() => setTargetSchemaType(sch.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        targetSchemaType === sch.id
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {sch.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Destination Parser Context:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "html_body", label: "HTML Body (<div>)" },
                    { id: "javascript_block", label: "JavaScript (<script>)" },
                    { id: "sql_literal", label: "SQL Parameter ($1)" },
                    { id: "json_response", label: "REST JSON ({})" }
                  ].map((dst) => (
                    <button
                      key={dst.id}
                      onClick={() => setDestinationContext(dst.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        destinationContext === dst.id
                          ? "bg-purple-950 border-purple-500 text-purple-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {dst.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">4. Active Pipeline Stages:</span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setActivePipelineStages(prev => ({ ...prev, canonicalization: !prev.canonicalization }))}
                    className={clsx("w-full p-2 rounded border font-bold text-[10px] text-left transition-all", activePipelineStages.canonicalization ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-gray-950 border-gray-800 text-gray-400")}
                  >
                    {activePipelineStages.canonicalization ? "✔ Stage 1: NFKC Canonicalization" : "Stage 1: Raw Un-Normalized Input"}
                  </button>

                  <button
                    onClick={() => setActivePipelineStages(prev => ({ ...prev, schemaValidation: !prev.schemaValidation }))}
                    className={clsx("w-full p-2 rounded border font-bold text-[10px] text-left transition-all", activePipelineStages.schemaValidation ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-gray-950 border-gray-800 text-gray-400")}
                  >
                    {activePipelineStages.schemaValidation ? "✔ Stage 2: Schema Allowlist Gating" : "Stage 2: No Validation Gating"}
                  </button>

                  <button
                    onClick={() => setActivePipelineStages(prev => ({ ...prev, sanitization: !prev.sanitization }))}
                    className={clsx("w-full p-2 rounded border font-bold text-[10px] text-left transition-all", activePipelineStages.sanitization ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-gray-950 border-gray-800 text-gray-400")}
                  >
                    {activePipelineStages.sanitization ? "✔ Stage 3: DOMPurify Sanitization" : "Stage 3: No Sanitization"}
                  </button>

                  <button
                    onClick={() => setActivePipelineStages(prev => ({ ...prev, outputEncoding: !prev.outputEncoding }))}
                    className={clsx("w-full p-2 rounded border font-bold text-[10px] text-left transition-all", activePipelineStages.outputEncoding ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-gray-950 border-gray-800 text-gray-400")}
                  >
                    {activePipelineStages.outputEncoding ? "✔ Stage 4: Context-Aware Encoding" : "Stage 4: Un-Encoded Raw Output"}
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics & Stage-by-Stage Preview */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Transformation Pipeline State Machine</h3>
                <span className={clsx("text-xs px-2.5 py-0.5 rounded font-mono font-bold border", simulationResults.finalHttpStatus === 200 ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-amber-950 text-amber-300 border-amber-800")}>
                  HTTP {simulationResults.finalHttpStatus} {simulationResults.finalHttpStatus === 200 ? "OK" : "BAD REQUEST"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Stage 1 Canonical (NFKC):</span>
                  <pre className="p-2 bg-black/90 rounded font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                    {simulationResults.stage1Canonical}
                  </pre>
                </div>

                <div className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Stage 2 Gating Status:</span>
                  <span className={clsx("text-xs font-bold block mt-1", simulationResults.stage2Validation.passed ? "text-emerald-400" : "text-amber-400")}>
                    {simulationResults.stage2Validation.passed ? "✔ PASSED SCHEMA ALLOWLIST" : "FAILED SCHEMA VALIDATION"}
                  </span>
                  {!simulationResults.stage2Validation.passed && (
                    <span className="text-[10px] text-amber-300 block">{simulationResults.stage2Validation.error}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Stage 3 Sanitized (Purified):</span>
                  <pre className="p-2 bg-black/90 rounded font-mono text-[11px] text-purple-300 overflow-x-auto whitespace-pre-wrap">
                    {simulationResults.stage3Sanitized}
                  </pre>
                </div>

                <div className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Stage 4 Context-Encoded Output (x_safe):</span>
                  <pre className="p-2 bg-black/90 rounded font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                    {simulationResults.stage4Encoded}
                  </pre>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Pipeline Safety Invariant Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Input/Output Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Zod Gating &amp; Binary Magic Byte Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Zod Schema Middleware, Multi-Context Encoder &amp; Magic Byte Validator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Express.js Zod schema validation middleware, 
              enterprise multi-context output encoders, and native Node.js binary magic byte file validators:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              &gt;
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Pattern
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita deploy Zod GSTIN schemas in Salt Lake, 
              enforce SCADA telemetry bounds in Barrackpore, and secure oncology records in Ichapur:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              &gt;
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; Malformed Input Threat
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Penalties for Input Manipulation &amp; Data Injection Breaches in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection frameworks 
              strictly penalize bypassing input filters to alter records, execute frauds, or compromise servers with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Input injection attacks compromising critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data alteration/damage.
                </li>
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems attack (Up to 10 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to validate and protect citizen records.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Commercial fraud &amp; fund siphoning (Up to 7 years prison).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Relying on Blocklists:</strong> Easily bypassed with Unicode homoglyphs and dialect variations.
                </li>
                <li>
                  <strong>Validating BEFORE Canonicalizing:</strong> Allows non-standard encodings to slip past filters!
                </li>
                <li>
                  <strong>Using HTML Entity Encoding Inside &lt;script&gt; Blocks:</strong> Fails; JavaScript requires Unicode hex (`\u0027`).
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Always Call `normalize('NFKC')` First:</strong> Normalizes Unicode homoglyphs at the perimeter.
                </li>
                <li>
                  <strong>Deploy Schema Validation with `.strict()`:</strong> Rejects un-whitelisted properties (Mass Assignment).
                </li>
                <li>
                  <strong>Verify Binary Magic Bytes:</strong> Never trust client file extensions or Content-Type headers.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  Why is defining an allowlist regex for an email address infinitely more secure than trying to block bad words?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does an attacker use full-width Unicode characters (`\uFF1Cscript\uFF1E`) to sneak past naive ASCII filters?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Stage 1 Canonicalization and Stage 2 Schema Gating and observe malformed inputs get blocked with HTTP 400!
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Validation gates data at entry; Sanitization cleans data; Encoding protects data at exit.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Allowlists (positive validation) are vastly superior to easily bypassed blocklists.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Unicode normalization (`NFKC`) must always occur BEFORE applying validation regexes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Client-side validation is purely for user experience; server-side validation is mandatory for security.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>HTML Entity encoding protects HTML text, but JavaScript contexts require Unicode hex (`\u0027`).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes input injection attacks on critical systems with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Input Validation, Sanitization &amp; Encoding FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Defense Triad Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Input Validation, Sanitization, and Output Encoding (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Input Validation, Sanitization, and Context-Aware Output Encoding form the foundational Defense Triad across the entire software engineering lifecycle! Master the order of operations: 1. Canonicalize and normalize Unicode (`str.normalize('NFKC')`) at the application perimeter; 2. Enforce strict positive Allowlist validation using the TLFR framework (Type, Length, Format, Range) with Zod or Pydantic schemas; 3. Sanitize rich HTML formatting with DOMPurify; 4. Apply Context-Aware Output Encoding tailored to the specific destination parser (HTML entities for body text, Unicode hex `\\u0027` for JavaScript blocks, percent-encoding for URLs). Remember that input validation is NOT a substitute for parameterized prepared statements: validation checks business format correctness, while parameterization guarantees database execution safety. Never trust client-side validation alone, and always verify binary magic bytes for file uploads. Remember that Section 66F of the Indian IT Act penalizes input injection attacks on critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database alteration!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
