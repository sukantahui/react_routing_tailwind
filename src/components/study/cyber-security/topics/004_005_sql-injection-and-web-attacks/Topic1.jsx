import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgTaintFlowId = useId();

  // Studio 1: Active Injection Vector Selection
  const [selectedVectorKey, setSelectedVectorKey] = useState("sql_injection");

  // Studio 2: Live Taint Analysis & Source-to-Sink Simulator State
  const [selectedSource, setSelectedSource] = useState("json_post_body"); // url_query_param, json_post_body, user_agent_header
  const [selectedSanitizer, setSelectedSanitizer] = useState("prepared_statement"); // no_sanitization, flawed_regex, positive_schema, prepared_statement
  const [selectedSink, setSelectedSink] = useState("database_query"); // database_query, system_exec, eval_dynamic, ldap_search

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_command_injection");

  // Studio 4: Injection Hardening Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("nodejs_execfile_command_defense");

  // 8 Injection Vector Profiles for Studio 1
  const vectorDatabase = {
    sql_injection: {
      key: "sql_injection",
      name: "1. SQL Injection (SQLi)",
      category: "RELATIONAL DATABASE MANIPULATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetInterpreter: "RDBMS SQL Query Parser (PostgreSQL, MySQL, Oracle)",
      vulnerabilityMechanism:
        "Untrusted input containing single quotes and SQL operators (`' OR '1'='1`) is concatenated into query strings, altering the Abstract Syntax Tree (AST) to bypass authentication or dump databases.",
      mitigationPattern: "100% Parameterized Queries (Prepared Statements) where user input is passed as separate protocol data.",
      typicalPayload: "admin' OR '1'='1' --",
      codeSnippet: `// Vulnerable: db.query("SELECT * FROM users WHERE user = '" + input + "'");
// Secure:     db.execute("SELECT * FROM users WHERE user = ?", [input]);`
    },
    os_command_injection: {
      key: "os_command_injection",
      name: "2. OS Command Injection",
      category: "OPERATING SYSTEM SHELL HIJACKING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetInterpreter: "Host OS Shell (/bin/sh, bash, cmd.exe, powershell.exe)",
      vulnerabilityMechanism:
        "Untrusted input containing shell metacharacters (`;`, `&&`, `|`, `` ` ``) is passed to `system()` or `exec()`, allowing attackers to execute arbitrary terminal commands with web server privileges.",
      mitigationPattern: "Using `child_process.execFile()` passing arguments as structured arrays without invoking a shell.",
      typicalPayload: "127.0.0.1; cat /etc/passwd",
      codeSnippet: `// Vulnerable: exec("convert " + req.body.file + " output.png");
// Secure:     execFile("convert", [req.body.file, "output.png"]);`
    },
    nosql_injection: {
      key: "nosql_injection",
      name: "3. NoSQL Injection (MongoDB BSON)",
      category: "DOCUMENT DATABASE OPERATOR INJECTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetInterpreter: "MongoDB BSON Query Engine",
      vulnerabilityMechanism:
        "Submitting JSON objects containing query operators (`{\"$ne\": null}`) instead of primitive strings, forcing the database to evaluate the query as true without knowing passwords.",
      mitigationPattern: "Enforcing strict schema validation (Joi/Zod) to ensure inputs are strictly primitive strings, not objects.",
      typicalPayload: '{ "password": { "$ne": null } }',
      codeSnippet: `// Exploit Payload: { "username": "admin", "password": { "$ne": null } }
// MongoDB executes: db.users.find({ username: "admin", password: { $ne: null } }) ➔ TRUE!`
    },
    ldap_injection: {
      key: "ldap_injection",
      name: "4. LDAP Injection",
      category: "DIRECTORY SERVICE AUTHENTICATION BYPASS",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetInterpreter: "Active Directory & OpenLDAP Filter Parsers",
      vulnerabilityMechanism:
        "Injecting LDAP filter control characters (`*`, `(`, `)`, `&`, `|`) into directory queries, bypassing password verification or harvesting user trees.",
      mitigationPattern: "Using parameterized LDAP search filters and escaping RFC 4515 special characters (`\\2a`, `\\28`).",
      typicalPayload: "admin)(|(uid=*))",
      codeSnippet: `// Vulnerable Filter: (&(uid=admin)(userPassword=PASS))
// Injected Payload  : admin)(|(uid=*)) ➔ Matches first Active Directory user automatically!`
    },
    xpath_xml_injection: {
      key: "xpath_xml_injection",
      name: "5. XPath / XML Injection",
      category: "XML DOCUMENT TREE TRAVERSAL",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetInterpreter: "XML XPath & XQuery Query Parsers",
      vulnerabilityMechanism:
        "Altering the syntax of an XPath query used to search XML documents (`' or '1'='1`), allowing attackers to extract confidential nodes or bypass authentication.",
      mitigationPattern: "Using parameterized XPath queries or pre-compiled XPath variable resolvers.",
      typicalPayload: "' or 1=1 or ''='",
      codeSnippet: `// Vulnerable XPath: //User[Username/text()='USER' and Password/text()='PASS']
// Injected Payload: ' or 1=1 or ''=' ➔ Evaluates true for all XML user nodes!`
    },
    server_side_template_injection: {
      key: "server_side_template_injection",
      name: "6. Server-Side Template Injection (SSTI)",
      category: "BACKEND TEMPLATE ENGINE CODE EXECUTION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetInterpreter: "Template Engines (Jinja2, Twig, Freemarker)",
      vulnerabilityMechanism:
        "Directly concatenating user input into template rendering strings, allowing attackers to evaluate expressions (`{{7*7}}`) and traverse class models for Remote Code Execution.",
      mitigationPattern: "Never concatenate user input into template strings; pass user input strictly as template context variables.",
      typicalPayload: "{{ cycler.__init__.__globals__.os.popen('id').read() }}",
      codeSnippet: `// Vulnerable: render_template_string("Hello " + user_input)
// Secure:     render_template("hello.html", name=user_input)`
    },
    code_eval_injection: {
      key: "code_eval_injection",
      name: "7. Dynamic Code Injection (`eval()`)",
      category: "RUNTIME SCRIPT EXECUTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetInterpreter: "Language Runtime Evaluators (`eval()`, `Function()`)",
      vulnerabilityMechanism:
        "Passing untrusted input into dynamic evaluation functions like `eval()`, executing user strings as native JavaScript/Python/PHP code with full runtime privileges.",
      mitigationPattern: "Completely avoid `eval()`; use safe mathematical parsers (mathjs) or JSON serialization.",
      typicalPayload: "0; require('child_process').execSync('id')",
      codeSnippet: `// Vulnerable: eval("calculate(" + req.query.formula + ")")
// Secure:     Use safe math expression AST parsers without code execution capabilities!`
    },
    crlf_header_injection: {
      key: "crlf_header_injection",
      name: "8. CRLF / HTTP Header Injection",
      category: "HTTP RESPONSE SPLITTING & COOKIE INJECTION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetInterpreter: "HTTP Protocol Parsers & Web Browsers",
      vulnerabilityMechanism:
        "Injecting carriage return and line feed characters (`\\r\\n` / `%0d%0a`) into response headers to set arbitrary cookies or split HTTP responses.",
      mitigationPattern: "Stripping `\\r` and `\\n` characters from all data before setting HTTP response headers.",
      typicalPayload: "/login%0d%0aSet-Cookie: session=forged_token",
      codeSnippet: `// Injected Header: Location: /login\r\nSet-Cookie: session=attacker_token
// Result: Browser accepts injected session cookie, enabling session fixation!`
    }
  };

  const activeVector = vectorDatabase[selectedVectorKey];

  // Studio 2: Live Taint Analysis & Source-to-Sink Calculations
  const taintAnalysisResults = useMemo(() => {
    // 1. Calculate Sanitizer Efficiency:
    let sanitizerEfficiency = 0.0;
    if (selectedSanitizer === "no_sanitization") sanitizerEfficiency = 0.0;
    else if (selectedSanitizer === "flawed_regex") sanitizerEfficiency = 0.60;
    else if (selectedSanitizer === "positive_schema") sanitizerEfficiency = 0.95;
    else if (selectedSanitizer === "prepared_statement") sanitizerEfficiency = 1.00;

    // 2. Sink Sensitivity:
    let sinkSensitivity = 1.0;
    if (selectedSink === "database_query" || selectedSink === "system_exec" || selectedSink === "eval_dynamic") {
      sinkSensitivity = 1.0;
    } else {
      sinkSensitivity = 0.85;
    }

    // 3. Exploitability Probability: P_exploit = (1 - SanitizerEff) * SinkSensitivity
    const pExploit = (1.0 - sanitizerEfficiency) * sinkSensitivity * 100.0;

    // 4. Source Taint Level:
    const sourceLabel = selectedSource === "url_query_param" ? "URL Query (req.query)"
      : selectedSource === "json_post_body" ? "JSON Body (req.body)"
      : "HTTP Header (User-Agent)";

    const sinkLabel = selectedSink === "database_query" ? "db.query() [SQL Sink]"
      : selectedSink === "system_exec" ? "child_process.exec() [Shell Sink]"
      : selectedSink === "eval_dynamic" ? "eval() [Code Sink]"
      : "ldap.search() [LDAP Sink]";

    return {
      pExploit: pExploit.toFixed(1),
      sanitizerEfficiency: (sanitizerEfficiency * 100).toFixed(0),
      sourceLabel,
      sinkLabel,
      badgeClass: pExploit > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : pExploit > 0
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: selectedSanitizer === "prepared_statement"
        ? `PARAMETERIZED PREPARED STATEMENT ACTIVE: Protocol-level parameter binding enforces 100% AST integrity (Sanitizer = 100%); Taint Exploitability Probability is 0.00%, guaranteeing complete injection immunity!`
        : selectedSanitizer === "positive_schema"
        ? `POSITIVE SCHEMA VALIDATION ACTIVE: Joi/OpenAPI regex whitelist neutralizes 95% of injection payloads; Exploitability reduced to ${pExploit.toFixed(1)}%.`
        : selectedSanitizer === "flawed_regex"
        ? `FLAWED REGEX ESCAPING WARNING: Blacklist character stripping is vulnerable to encoding bypasses (Exploitability = ${pExploit.toFixed(1)}%); Attackers can mutate the AST!`
        : `CRITICAL DIRECT TAINT FLOW: Untrusted data flows directly from ${sourceLabel} into ${sinkLabel} without sanitization; Exploitability is 100.0% (Immediate Code Execution / SQLi)!`
    };
  }, [selectedSource, selectedSanitizer, selectedSink]);

  // Studio 4: Injection Hardening Production Code Database
  const codeDatabase = {
    nodejs_execfile_command_defense: {
      name: "Node.js Non-Shell execFile() Command Injection Defense",
      code: `// Node.js Secure OS Command Execution Defense (Defeating Command Injection):
const { execFile } = require('child_process');
const path = require('path');

// Secure Controller: Convert Uploaded PDF to PNG Images
exports.convertPdfToImage = (req, res) => {
    const rawFilename = req.body.filename;

    // 1. Positive Whitelist Validation (Only alphanumeric filenames with .pdf extension)
    if (!/^[a-zA-Z0-9_-]+\.pdf$/.test(rawFilename)) {
        return res.status(400).json({ error: "Invalid filename format. Security alert logged!" });
    }

    const safePath = path.join('/var/uploads', path.basename(rawFilename));
    const outputPath = path.join('/var/images', path.basename(rawFilename, '.pdf') + '.png');

    // 2. SECURE EXECUTION: Use execFile passing arguments as a structured ARRAY!
    // This executes the binary directly WITHOUT invoking /bin/sh or cmd.exe shell parsers!
    // Even if filename contained "; rm -rf /", it is treated strictly as a single literal argument!
    execFile('/usr/bin/convert', [safePath, outputPath], (error, stdout, stderr) => {
        if (error) {
            logger.error({ event: 'CONVERSION_FAILURE', error: error.message });
            return res.status(500).json({ error: "Image conversion failed." });
        }
        res.json({ status: "success", image: outputPath });
    });
};`,
      explanation: "Production Node.js controller utilizing `child_process.execFile()` with structured argument arrays instead of `exec()`, completely eliminating OS command injection by executing binaries directly without a shell interpreter."
    },
    mongodb_strict_schema_defense: {
      name: "MongoDB Strict Joi Schema Validation Defeating NoSQL Injection",
      code: `// MongoDB NoSQL Injection Defense using Strict Joi Schema Validation:
const Joi = require('joi');
const bcrypt = require('bcrypt');

// 1. Define Strict Positive Validation Schema (Enforcing Primitive String Types!)
const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    // Enforcing string() rejects BSON operator objects like { "$ne": null }!
    password: Joi.string().min(8).max(128).required()
}).required();

exports.secureLogin = async (req, res) => {
    // 2. Validate Untrusted Request Body against Schema
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        // If client submitted an object {"$ne": null}, Joi rejects it immediately with HTTP 400!
        return res.status(400).json({ error: "Validation Error: Password must be a valid string!" });
    }

    const { username, password } = value;

    // 3. Safe Database Query: Fetch user by exact primitive username string
    const user = await db.collection('users').findOne({ username: username });
    if (!user) {
        return res.status(401).json({ error: "Invalid username or password." });
    }

    // 4. Constant-Time Cryptographic Password Comparison
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password." });
    }

    res.json({ status: "authenticated", token: generateSecureToken(user) });
};`,
      explanation: "MongoDB controller enforcing strict Joi schema validation to ensure inputs are strictly primitive strings, completely rejecting NoSQL BSON operator injection objects (`{\"$ne\": null}`)."
    },
    java_ldap_parameterized_search: {
      name: "Java Safe LDAP SearchControls with Filter Escaping",
      code: `// Java Secure Active Directory LDAP Filter Escaping Defense:
import javax.naming.directory.*;
import javax.naming.ldap.LdapContext;

public class SecureLdapAuthenticator {
    // RFC 4515 LDAP Special Character Escaping Function
    public static String escapeLdapFilter(String input) {
        if (input == null) return "";
        StringBuilder sb = new StringBuilder();
        for (char c : input.toCharArray()) {
            switch (c) {
                case '*': sb.append("\\\\2a"); break;
                case '(': sb.append("\\\\28"); break;
                case ')': sb.append("\\\\29"); break;
                case '\\\\': sb.append("\\\\5c"); break;
                case '\\0': sb.append("\\\\00"); break;
                default: sb.append(c);
            }
        }
        return sb.toString();
    }

    public boolean authenticateUser(LdapContext ctx, String username, String password) throws Exception {
        // 1. Escape RFC 4515 LDAP Filter Metacharacters
        String safeUsername = escapeLdapFilter(username);
        
        // 2. Safe Filter Construction:
        String searchFilter = "(&(uid=" + safeUsername + ")(objectClass=person))";
        
        SearchControls controls = new SearchControls();
        controls.setSearchScope(SearchControls.SUBTREE_SCOPE);
        controls.setReturningAttributes(new String[]{"userPassword", "memberOf"});

        NamingEnumeration<SearchResult> results = ctx.search("ou=users,dc=kolkata-grid,dc=in", searchFilter, controls);
        return results.hasMore();
    }
}`,
      explanation: "Java LDAP authentication service implementing RFC 4515 character escaping, converting metacharacters (`*`, `(`, `)`) to hex encodings (`\\2a`, `\\28`) to prevent LDAP injection filter manipulation."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_command_injection",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Eliminating OS Command Injection in PDF Image Conversion Pipelines",
      threatType: "OS COMMAND INJECTION & HOST SHELL ESCAPE (RCE Threat)",
      budget: "₹87,00,000",
      incident:
        "An adversary submitted filenames containing shell metacharacters (`report.pdf; nc -e /bin/bash ...`) targeting the backend PDF converter utility.",
      defenseStrategy:
        "Mamata refactored the image conversion pipeline to use `child_process.execFile()` passing arguments as structured arrays without invoking a shell.",
      outcome: "100% of command injection payloads treated as literal filenames; zero shell access; ₹3,600 Crores in financial transactions safeguarded.",
      metrics: {
        commandInjectionDropped: "100.0%",
        settlementVolumeProtected: "₹3,600 Crores",
        endpointsHardened: "45 Conversion Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_ldap_injection",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "LDAP INJECTION ACTIVE DIRECTORY BYPASS PROBE",
      title: "Neutralizing LDAP Injection on Substation Authentication Servers",
      budget: "₹56,00,000",
      incident:
        "Threat actors attempted to log into substation management consoles using LDAP wildcard injection filters (`admin)(|(uid=*))`) to bypass Active Directory passwords.",
      defenseStrategy:
        "Debangshu implemented RFC 4515 LDAP filter escaping and enforced mandatory FIDO2 hardware token Multi-Factor Authentication.",
      outcome: "100% of LDAP injection probes neutralized; zero unauthorized logins; 100% regional power grid stability across North 24 Parganas.",
      metrics: {
        ldapProbesBlocked: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_nosql_injection",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "NoSQL BSON OPERATOR INJECTION (MongoDB Diagnostic Query Attack)",
      title: "Neutralizing NoSQL Operator Injections across Oncology Patient Diagnostic Records",
      budget: "₹41,00,000",
      incident:
        "Automated scanners probed the hospital's patient diagnostic portal with MongoDB operator objects (`{\"$ne\": null}`) to dump oncology treatment histories.",
      defenseStrategy:
        "Mahima deployed strict Joi schema validation enforcing primitive string types and rejecting all BSON object inputs at the API gateway.",
      outcome: "100% of NoSQL injection payloads rejected with HTTP 400; zero patient records leaked; 120,000 cancer patient records secured.",
      metrics: {
        nosqlPayloadsRejected: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_taint_propagation_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF TAINT PROPAGATION & AST INVARIANTS",
      title: "Formulating the Source-to-Sink Taint Propagation Model in IEEE Transactions",
      budget: "₹34,00,000",
      incident:
        "Researchers modeled the mathematical behavior of taint propagation across 8 interpreter types under varying sanitization efficiencies.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that Parameterized Prepared Statements mathematically reduce exploitability to 0.00%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 180,000 simulated taint flow paths.",
      metrics: {
        simulationTrials: "180,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Taint Propagation Exploitability Equation",
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
                Topic 01
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Anatomy of Injection Vulnerabilities
            </h1>
            <p className="text-xs text-gray-400">
              Source-to-sink taint analysis, SQLi, OS Command Injection, NoSQL `$ne` injection, LDAP, SSTI, and IT Act Section 66F.
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
              The Fundamental Mechanics of Injection
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Anatomy of Injection: How Blurring Data and Control Enables Code Execution
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              The fundamental root cause of all injection vulnerabilities is the architectural failure to separate 
              <strong>untrusted user data</strong> from <strong>interpreter instructions/code</strong>. 
              When user input is directly concatenated into an interpreter string (such as an SQL query parser, OS terminal shell, 
              NoSQL BSON engine, LDAP filter, or server-side template engine), the interpreter cannot distinguish between 
              developer commands and attacker-supplied control characters (quotes, semicolons, dollar signs, asterisks). 
              Understanding injection requires mastering <strong>Taint Analysis</strong>: tracking untrusted data from its 
              <strong>Source</strong> (HTTP headers, query parameters, POST body) through <strong>Sanitizers/Validators</strong> 
              to the sensitive <strong>Execution Sink</strong> (`db.query()`, `exec()`, `eval()`). 
              Enforcing <strong>Protocol-Level Parameter Binding (Prepared Statements)</strong> compiles the query Abstract Syntax Tree (AST) 
              before receiving user data, making AST tree mutation mathematically impossible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Taint Flow Mechanics Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The Taint Pipeline: Source ➔ Sanitizer ➔ Sink
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                req.query.file ➔ Direct Concatenation ➔ exec("convert " + file) ➔ Remote Code Execution!
              </div>
              <p className="text-gray-300 leading-relaxed">
                When tainted data reaches a dangerous execution sink without parameter binding, attackers append shell metacharacters (`;`, `&&`) to seize total host control.
              </p>
            </div>

            {/* AST Invariant Defense Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                AST Invariant Parameter Binding Defense
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Prepared Statements:</strong> Pre-compiles the AST; user data is strictly bound to literal leaf nodes.</li>
                <li>• <strong className="text-purple-300">Non-Shell Exec (`execFile`):</strong> Passes argument arrays without invoking a terminal shell.</li>
                <li>• <strong className="text-amber-300">Strict Schema Typing:</strong> Rejects MongoDB BSON operator objects (`$ne`, `$gt`).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Taint Analysis Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Source-to-Sink Taint Flow Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Taint Analysis: From Untrusted Input to Parameterized Execution Sinks
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how untrusted input flows from the client HTTP source, passes through schema validation and parameter binding, 
              and executes safely in database sinks without altering query AST syntax:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: TAINTED SOURCE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. TAINTED SOURCE
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Untrusted Client Input
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  INJECTION ENTRY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  req.query / req.body
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  admin' OR '1'='1 --
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: POSITIVE SCHEMA VALIDATION */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. SCHEMA FILTER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Positive Type Whitelist
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TYPE ENFORCEMENT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Primitive String Only
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Rejects NoSQL Objects!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: PROTOCOL PARAMETER BINDING */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. PREPARED STMT
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  AST Pre-Compilation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AST COMPILATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  AST Tree Fixed First
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Data Bound to Slot!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: SINK EXECUTION */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. EXECUTION SINK
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  db.execute(sql, [data])
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ZERO MUTATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Data != Code
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  P_exploit = 0.00%!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: SECURE DATABASE STORAGE */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. SECURE OUTPUT
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% Safe Execution
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DATABASE INTEGRITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Zero SQL Injection
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Data Protection!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Injection Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Injection Vector &amp; Target Interpreter Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an injection vector below to examine its target interpreter, vulnerability mechanics, 
              mitigation patterns, typical exploit payloads, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(vectorDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedVectorKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedVectorKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  VECTOR
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeVector.categoryBadge)}>
                    {activeVector.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Target: {activeVector.targetInterpreter}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeVector.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeVector.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Mechanics &amp; AST Manipulation
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeVector.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Vulnerable vs Secure Implementation Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeVector.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Taint Analysis & Exploitability Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Taint Analysis &amp; Source-to-Sink Exploitability Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an untrusted data Source, a Sanitization / Binding control, and an Execution Sink to calculate the 
              Taint Exploitability Probability P_exploit = (1 - S) × F_sink and observe AST mutation risk:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Taint Pipeline Controls</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Untrusted Data Entry Source:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "url_query_param", label: "URL Query (req.query.user)" },
                    { id: "json_post_body", label: "JSON POST Body (req.body)" },
                    { id: "user_agent_header", label: "HTTP Header (User-Agent)" }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSource(s.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        selectedSource === s.id
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Sanitizer / Binding Mechanism:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "no_sanitization", label: "No Sanitization (0% Efficiency)" },
                    { id: "flawed_regex", label: "Flawed Regex Escaping (60% Eff)" },
                    { id: "positive_schema", label: "Positive Schema Whitelist (95% Eff)" },
                    { id: "prepared_statement", label: "Parameterized Prepared Stmt (100% Eff)" }
                  ].map((san) => (
                    <button
                      key={san.id}
                      onClick={() => setSelectedSanitizer(san.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        selectedSanitizer === san.id
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {san.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Dangerous Execution Sink:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "database_query", label: "db.query() [SQL]" },
                    { id: "system_exec", label: "child.exec() [OS]" },
                    { id: "eval_dynamic", label: "eval() [Code]" },
                    { id: "ldap_search", label: "ldap.search() [LDAP]" }
                  ].map((sk) => (
                    <button
                      key={sk.id}
                      onClick={() => setSelectedSink(sk.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        selectedSink === sk.id
                          ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {sk.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Taint Exploitability &amp; AST Analysis</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Taint Exploitability Probability</span>
                  <span className="text-lg font-extrabold text-rose-400">{taintAnalysisResults.pExploit}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Sanitizer Efficiency: {taintAnalysisResults.sanitizerEfficiency}%</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Taint Pipeline Flow</span>
                  <span className="text-xs font-bold text-cyan-300 mt-1 block">{taintAnalysisResults.sourceLabel}</span>
                  <span className="text-[10px] text-amber-300 block">➔ {taintAnalysisResults.sinkLabel}</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", taintAnalysisResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Taint Flow Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{taintAnalysisResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Injection Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Safe Sinks &amp; Parameterized Defense Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Node.js execFile(), MongoDB Joi &amp; Java LDAP Escaping Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of non-shell command execution (`execFile`), 
              strict MongoDB primitive schema validation, and RFC 4515 Java LDAP filter escaping:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita eliminate OS command injection in Kolkata, 
              neutralize LDAP injection in Barrackpore power grids, and secure oncology databases in Ichapur:
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
                  The Incident &amp; Taint Flow Vector
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
              7. Legal Penalties for Injection Attacks &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and criminal mischief statutes 
              strictly penalize executing injection attacks to compromise protected systems or steal confidential data with severe civil compensation and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Injection attacks damaging critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data extraction.
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
                  <strong className="text-white">IPC Section 420:</strong> Injection balance alteration fraud (Up to 7 years prison).
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
                  <strong>Relying on Blacklist String Stripping:</strong> Attackers easily bypass regexes using encoding or mixed case.
                </li>
                <li>
                  <strong>Using `exec()` with Concatenated Strings:</strong> Allows shell metacharacter appending (`; rm -rf /`).
                </li>
                <li>
                  <strong>Passing Raw Objects to MongoDB Queries:</strong> Vulnerable to NoSQL operator injection (`$ne`).
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
                  <strong>Deploy 100% Parameterized Queries:</strong> Compiles the query AST first, making injection mathematically impossible.
                </li>
                <li>
                  <strong>Use `execFile()` with Argument Arrays:</strong> Executes binaries directly without shell interpreters.
                </li>
                <li>
                  <strong>Integrate Automated Static Taint Tracking:</strong> Semgrep and CodeQL block un-parameterized sinks in CI/CD.
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
                  Why does Parameterized Prepared Statement parameter binding make AST query mutation mathematically impossible?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does submitting a JSON object <code className="text-cyan-400 bg-gray-950 px-1 py-0.5 rounded font-mono">&#123;"$ne": null&#125;</code> in MongoDB bypass password authentication without guessing the password?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch Sanitizer to Parameterized Prepared Statement and observe Exploitability collapse to 0.00%!
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
                <span>Injection occurs when untrusted data is concatenated into an interpreter without parameter binding.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Prepared Statements compile the query AST first, making AST tree mutation mathematically impossible.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>OS Command Injection escapes application code to execute shell commands with host privileges.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NoSQL Injection abuses MongoDB BSON operator objects (`$ne: null`) to bypass authentication.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Server-Side Template Injection (SSTI) allows direct Remote Code Execution (RCE) via template engines.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes injection cyber terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Anatomy of Injection Vulnerabilities FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Taint Flow Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Anatomy of Injection Vulnerabilities (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Injection vulnerabilities represent one of the most fundamental and dangerous classes of cyber attacks, spanning SQL interpreters, operating system shells, NoSQL BSON engines, LDAP filters, and template engines! Master the core principle: injection happens whenever untrusted user data is directly concatenated into an interpreter string instead of being passed as separate protocol data. Master Taint Analysis: trace data from its Source (HTTP headers, query parameters, POST body) through Sanitizers to sensitive Execution Sinks (`db.query()`, `exec()`, `eval()`). Understand why blacklisting and regex escaping fail: attackers bypass filters using character encoding, case variations, or multi-byte sequences. The only true mathematical defense is Parameterized Prepared Statements: by sending the SQL template to the database engine to be compiled into an Abstract Syntax Tree (AST) first, user data is strictly bound to literal leaf values, making syntax mutation mathematically impossible (P_exploit = 0.00%). For operating system commands, use `child_process.execFile()` with structured argument arrays to avoid shell invocation entirely. Remember that Section 66F of the Indian IT Act treats injection cyber terrorism against critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
