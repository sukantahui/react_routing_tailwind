import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgAstCompilerId = useId();

  // Studio 1: Active SQLi Context / Technique Selection
  const [selectedContextKey, setSelectedContextKey] = useState("string_literal_context");

  // Studio 2: Live SQL Compiler & AST Mutation Simulator State
  const [queryContext, setQueryContext] = useState("string_literal"); // string_literal, numeric_context, order_by_context
  const [selectedPayload, setSelectedPayload] = useState("tautology_bypass"); // benign_user, tautology_bypass, union_exfil, stacked_drop
  const [executionMode, setExecutionMode] = useState("prepared_statement"); // vulnerable_concatenation, prepared_statement

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_sqli_defense");

  // Studio 4: SQLi Hardening Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("nodejs_pg_prepared_statement");

  // 8 SQL Injection Contexts & Techniques for Studio 1
  const sqliDatabase = {
    string_literal_context: {
      key: "string_literal_context",
      name: "1. String Literal Context SQLi",
      category: "QUOTE BREAKOUT & SYNTAX INJECTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      queryTemplate: "SELECT * FROM users WHERE username = 'USER_INPUT' AND pass = 'PASS'",
      vulnerabilityMechanism:
        "The user input is placed inside single quotation marks; the attacker inputs `'` to close the string literal early, then appends arbitrary boolean logic (`OR '1'='1`) and comments (`--`) to neutralize the rest of the query.",
      mitigationPattern: "Protocol-level Parameterized Prepared Statements where user input is passed as literal data.",
      typicalPayload: "admin' OR '1'='1' --",
      codeSnippet: `// Vulnerable String Concatenation:
const sql = "SELECT * FROM users WHERE username = '" + req.body.user + "' AND password = '" + req.body.pass + "'";
// Attacker enters: user = admin'--
// Executed: SELECT * FROM users WHERE username = 'admin'--' AND password = '...' ➔ Password bypassed!`
    },
    numeric_context: {
      key: "numeric_context",
      name: "2. Numeric Context SQLi",
      category: "DIRECT OPERATOR EXECUTION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      queryTemplate: "SELECT * FROM products WHERE id = USER_INPUT",
      vulnerabilityMechanism:
        "Because numeric values do not require quotation marks, an attacker does not even need a single quote to break out; they inject SQL operators (`OR`, `UNION`) directly into the integer slot.",
      mitigationPattern: "Prepared statements or strict integer parsing (`parseInt(id, 10)`), rejecting any non-numeric characters.",
      typicalPayload: "105 OR 1=1",
      codeSnippet: `// Vulnerable Numeric Query:
const sql = "SELECT * FROM products WHERE id = " + req.query.id;
// Attacker enters: id = 105 UNION SELECT username, password FROM users
// Executed: SELECT * FROM products WHERE id = 105 UNION SELECT username, password FROM users;`
    },
    identifier_order_by_context: {
      key: "identifier_order_by_context",
      name: "3. Identifier / ORDER BY Context SQLi",
      category: "DYNAMIC COLUMN & SORT INJECTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      queryTemplate: "SELECT * FROM products ORDER BY USER_INPUT",
      vulnerabilityMechanism:
        "Standard prepared statement parameter placeholders (`?`) cannot be used for column identifiers or sort directions; dynamic concatenation allows attackers to inject conditional subqueries.",
      mitigationPattern: "Strict programmatic identifier whitelisting, mapping client sort keys to pre-approved SQL fragments.",
      typicalPayload: "(CASE WHEN (1=1) THEN id ELSE price END)",
      codeSnippet: `// Vulnerable Dynamic Sort:
const sql = "SELECT * FROM items ORDER BY " + req.query.sort;
// Secure Whitelist:
const ALLOWED = { "price_asc": "price ASC", "date_desc": "created_at DESC" };
const safeSort = ALLOWED[req.query.sort] || "created_at DESC";`
    },
    insert_update_context: {
      key: "insert_update_context",
      name: "4. INSERT / UPDATE Statement SQLi",
      category: "RECORD OVERWRITE & PRIVILEGE ELEVATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      queryTemplate: "UPDATE users SET bio = 'USER_INPUT' WHERE id = 102",
      vulnerabilityMechanism:
        "Injecting commas and additional column assignments during profile or registration updates, allowing attackers to overwrite administrative flags (`role = 'ADMIN'`) or other users' passwords.",
      mitigationPattern: "Parameterized prepared statements for all DML (`INSERT`, `UPDATE`, `DELETE`) operations.",
      typicalPayload: "Developer', role = 'SUPER_ADMIN'--",
      codeSnippet: `// Injected UPDATE Query:
// Input: Developer', role = 'ADMIN'--
// Executed: UPDATE users SET bio = 'Developer', role = 'ADMIN'--' WHERE id = 102; ➔ User becomes Admin!`
    },
    tautology_boolean_bypass: {
      key: "tautology_boolean_bypass",
      name: "5. Tautology Boolean Logic Bypass",
      category: "TRUTH-TABLE MANIPULATION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      queryTemplate: "SELECT * FROM accounts WHERE user = 'USER_INPUT'",
      vulnerabilityMechanism:
        "Injecting mathematical identities (`1=1`, `'a'='a'`) combined with `OR`, forcing the boolean filter to evaluate as TRUE for every tuple in the relation, dumping the entire table.",
      mitigationPattern: "Parameter binding guarantees the injected tautology is treated as a literal search string.",
      typicalPayload: "' OR 1=1--",
      codeSnippet: `// Boolean Truth-Table Evaluation:
// False (invalid user) OR True (1==1) ➔ TRUE for all rows!
// Database returns the first user record (User ID 1 = Administrator).`
    },
    stacked_queries_semicolon: {
      key: "stacked_queries_semicolon",
      name: "6. Stacked Queries (Piggybacked SQL)",
      category: "MULTI-STATEMENT COMMAND EXECUTION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      queryTemplate: "SELECT * FROM items WHERE id = USER_INPUT",
      vulnerabilityMechanism:
        "Using a semicolon (`;`) to terminate the original query and append an entirely new, independent SQL command (`DROP TABLE`, `INSERT`, `UPDATE`), supported in PostgreSQL and MSSQL.",
      mitigationPattern: "Disabling multi-statement query execution in database client drivers and using prepared statements.",
      typicalPayload: "105; DROP TABLE users;--",
      codeSnippet: `// Stacked Query Execution:
// Input: 105; UPDATE accounts SET balance = 1000000 WHERE user = 'attacker';--
// Executed: Two independent queries execute sequentially in one round-trip!`
    },
    dialect_fingerprinting_functions: {
      key: "dialect_fingerprinting_functions",
      name: "7. Database Dialect Fingerprinting",
      category: "BACKEND RDBMS RECONNAISSANCE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      queryTemplate: "SELECT * FROM users WHERE id = USER_INPUT",
      vulnerabilityMechanism:
        "Evaluating dialect-specific string concatenation operators (`||`, `+`, `CONCAT`) and version functions (`VERSION()`, `@@VERSION`) to identify the underlying database engine.",
      mitigationPattern: "Suppressing verbose error messages and parameterizing all queries to prevent fingerprint probes.",
      typicalPayload: "' OR 'a'||'b'='ab'--",
      codeSnippet: `// Dialect Tests:
// PostgreSQL : 'a'||'b' ➔ 'ab'  |  SELECT version();
// MySQL      : CONCAT('a','b')  |  SELECT VERSION();
// MSSQL      : 'a'+'b' ➔ 'ab'   |  SELECT @@VERSION;`
    },
    waf_evasion_inline_comments: {
      key: "waf_evasion_inline_comments",
      name: "8. WAF Signature Evasion (Inline Comments & Hex)",
      category: "REGEX FILTER EVASION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      queryTemplate: "SELECT * FROM items WHERE name = 'USER_INPUT'",
      vulnerabilityMechanism:
        "Evading naive Web Application Firewall (WAF) regex signatures by using inline SQL comments (`UN/**/ION`), hex constants (`0x61646d696e`), alternate case, or multi-byte URL encoding.",
      mitigationPattern: "Backend Parameterized Prepared Statements; never relying solely on edge WAF string filtering.",
      typicalPayload: "'/**/uNiOn/**/sElEcT/**/password/**/fRoM/**/users--",
      codeSnippet: `// WAF Bypass Payload:
// WAF regex checks for exact "UNION SELECT"
// Attacker sends: '/**/uNiOn/**/sElEcT/**/password/**/fRoM/**/users-- ➔ WAF bypassed, DB executes!`
    }
  };

  const activeContext = sqliDatabase[selectedContextKey];

  // Studio 2: Live SQL Compiler & AST Mutation Simulator Calculations
  const simulationResults = useMemo(() => {
    let rawInputText = "sukanta_user";
    if (selectedPayload === "tautology_bypass") rawInputText = "admin' OR 1=1--";
    else if (selectedPayload === "union_exfil") rawInputText = "105 UNION SELECT id, username, password FROM users--";
    else if (selectedPayload === "stacked_drop") rawInputText = "105; DROP TABLE audit_logs;--";

    let constructedQuery = "";
    let astMutationOccurred = false;
    let authBypassAchieved = false;
    let dataExfiltrationPossible = false;

    if (executionMode === "vulnerable_concatenation") {
      if (queryContext === "string_literal") {
        constructedQuery = `SELECT * FROM users WHERE username = '${rawInputText}' AND password = 'user_pass'`;
        if (selectedPayload === "tautology_bypass") {
          astMutationOccurred = true;
          authBypassAchieved = true;
        } else if (selectedPayload === "union_exfil") {
          astMutationOccurred = true;
          dataExfiltrationPossible = true;
        }
      } else if (queryContext === "numeric_context") {
        constructedQuery = `SELECT * FROM products WHERE id = ${rawInputText}`;
        if (selectedPayload === "tautology_bypass" || selectedPayload === "union_exfil" || selectedPayload === "stacked_drop") {
          astMutationOccurred = true;
          dataExfiltrationPossible = true;
        }
      } else {
        constructedQuery = `SELECT * FROM products ORDER BY ${rawInputText}`;
        astMutationOccurred = true;
      }
    } else {
      // Prepared Statement Mode:
      if (queryContext === "string_literal") {
        constructedQuery = `[PRE-COMPILED AST] SELECT * FROM users WHERE username = ? AND password = ?  |  PARAM: "${rawInputText}"`;
      } else if (queryContext === "numeric_context") {
        constructedQuery = `[PRE-COMPILED AST] SELECT * FROM products WHERE id = ?  |  PARAM: "${rawInputText}"`;
      } else {
        constructedQuery = `[WHITELISTED AST] SELECT * FROM products ORDER BY price_asc  |  USER INPUT MAPPED SECURELY`;
      }
      astMutationOccurred = false;
      authBypassAchieved = false;
      dataExfiltrationPossible = false;
    }

    const exploitabilityPct = executionMode === "prepared_statement" ? 0.0
      : (selectedPayload === "benign_user" ? 0.0 : 100.0);

    return {
      constructedQuery,
      astMutationOccurred,
      authBypassAchieved,
      dataExfiltrationPossible,
      exploitabilityPct: exploitabilityPct.toFixed(1),
      badgeClass: exploitabilityPct > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: executionMode === "prepared_statement"
        ? `PARAMETERIZED PREPARED STATEMENT ACTIVE: The database engine compiled the AST template first; the payload "${rawInputText}" is strictly bound as a literal data parameter. AST mutation probability is 0.00%, guaranteeing 100% injection immunity!`
        : astMutationOccurred
        ? `CRITICAL AST MUTATION DETECTED: String concatenation allowed payload "${rawInputText}" to inject new logical operators into the SQL parser AST; query executed with altered grammar (Exploitability = 100.0%)!`
        : `BENIGN QUERY EXECUTION: Query executed normally without AST mutation; however, the underlying concatenation remains vulnerable to malicious inputs.`
    };
  }, [queryContext, selectedPayload, executionMode]);

  // Studio 4: SQLi Hardening Production Code Database
  const codeDatabase = {
    nodejs_pg_prepared_statement: {
      name: "Node.js PostgreSQL Parameterized Prepared Statement Implementation",
      code: `// Node.js PostgreSQL Parameterized Prepared Statement (Defeating SQL Injection):
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.getUserProfile = async (req, res) => {
    const rawUsername = req.query.username; // Untrusted user input: "admin' OR 1=1--"

    try {
        // 1. SECURE QUERY DEFINITION:
        // Use parameterized placeholders ($1, $2) instead of string concatenation!
        const queryText = 'SELECT id, username, email, role FROM users WHERE username = $1';
        const queryValues = [rawUsername];

        // 2. PROTOCOL-LEVEL PARAMETER BINDING:
        // PostgreSQL compiles the SQL command AST first, then binds queryValues strictly as literal data!
        // Even if rawUsername contains quotes or comments, it is searched strictly as a literal string!
        const { rows } = await pool.query(queryText, queryValues);

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json({ status: "success", user: rows[0] });
    } catch (err) {
        logger.error({ event: 'DATABASE_ERROR', message: err.message });
        res.status(500).json({ error: "Internal server error occurred." });
    }
};`,
      explanation: "Production Node.js PostgreSQL controller utilizing `$1` parameterized placeholders with `pool.query()`, completely separating SQL command structure from untrusted user data."
    },
    java_jdbc_prepared_statement: {
      name: "Java JDBC PreparedStatement Implementation with Connection Pooling",
      code: `// Java JDBC Secure PreparedStatement Implementation (Defeating SQLi):
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.sql.DataSource;

public class UserAuthenticationService {
    private final DataSource dataSource;

    public UserAuthenticationService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public boolean verifyUser(String username, String passwordHash) throws Exception {
        // 1. Define SQL Query Template with Positional Placeholders (?)
        String sql = "SELECT id FROM accounts WHERE username = ? AND password_hash = ?";

        try (Connection conn = dataSource.getConnection();
             // 2. Pre-Compile the SQL Query on the Database Server (Fixes the AST Structure!)
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // 3. Bind Untrusted Parameters to Pre-Compiled Slots
            pstmt.setString(1, username);
            pstmt.setString(2, passwordHash);

            // 4. Execute Query: Database engine executes pre-compiled plan with bound values!
            try (ResultSet rs = pstmt.executeQuery()) {
                return rs.next(); // True if matching credentials exist, False otherwise!
            }
        }
    }
}`,
      explanation: "Java JDBC service implementing `PreparedStatement`, pre-compiling the SQL statement on the database server to fix the AST structure before binding user parameters."
    },
    order_by_whitelist_hardening: {
      name: "Node.js Strict ORDER BY Identifier Whitelisting Middleware",
      code: `// Node.js Secure ORDER BY & Dynamic Sort Whitelisting Middleware:

// 1. Define Immutable Whitelist Map of Allowed Sort Criteria
const ALLOWED_SORT_COLUMNS = Object.freeze({
    "price_asc"  : "price ASC",
    "price_desc" : "price DESC",
    "name_asc"   : "product_name ASC",
    "date_desc"  : "created_at DESC"
});

exports.getSortedProducts = async (req, res) => {
    const userSortKey = req.query.sort; // e.g. "price_asc" or malicious SQL payload

    // 2. STRICT WHITELIST VALIDATION:
    // If userSortKey is not in the whitelist, fall back to safe default ("date_desc")!
    // Never concatenate user input directly into ORDER BY / GROUP BY clauses!
    const safeSortFragment = ALLOWED_SORT_COLUMNS[userSortKey] || "created_at DESC";

    try {
        const queryText = \`SELECT id, product_name, price, stock FROM products ORDER BY \${safeSortFragment}\`;
        const { rows } = await db.query(queryText);
        res.json({ status: "success", products: rows });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch sorted products." });
    }
};`,
      explanation: "Production Node.js controller implementing strict dictionary whitelisting for dynamic `ORDER BY` clauses, completely neutralizing identifier SQL injection where prepared statement placeholders cannot be used."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_sqli_defense",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Neutralizing Tautology & UNION SQL Injection on Payment Authentication Endpoints",
      threatType: "TAUTOLOGY AUTHENTICATION BYPASS & UNION DATA DUMP PROBES",
      budget: "₹88,00,000",
      incident:
        "Adversaries probed the merchant login gateway with `' OR 1=1--` and UNION search payloads attempting to bypass merchant authentication and extract settlement keys.",
      defenseStrategy:
        "Mamata migrated 100% of merchant database queries to Parameterized Prepared Statements and deployed Database Activity Monitoring (DAM).",
      outcome: "100% of SQL injection payloads neutralized; zero unauthorized logins; ₹3,700 Crores in merchant transaction settlements protected.",
      metrics: {
        sqliPayloadsNeutralized: "100.0%",
        settlementVolumeProtected: "₹3,700 Crores",
        endpointsHardened: "65 Payment APIs",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_numeric_sqli",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "NUMERIC CONTEXT SQLi & SUBSTATION TELEMETRY PROBES",
      title: "Hardening Substation Outage Reporting Databases Against Numeric Context Injection",
      budget: "₹57,00,000",
      incident:
        "A vulnerability scanner identified an un-parameterized numeric query in the substation outage report generator (`WHERE feeder_id = ` + id), allowing data exfiltration.",
      defenseStrategy:
        "Debangshu enforced strict integer parameter binding (`$1::integer`) and revoked all database DDL privileges from web application accounts.",
      outcome: "100% of numeric injection probes blocked in database silicon; substation telemetry records remained 100% integral across North 24 Parganas.",
      metrics: {
        numericQueriesHardened: "100.0%",
        substationsProtected: "18 High-Voltage Nodes",
        unauthorizedQueries: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_stacked_sqli",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "STACKED QUERIES SQLi (Semicolon Table Drop Attempt)",
      title: "Neutralizing Stacked SQL Injection Probes Across Oncology Diagnostic Databases",
      budget: "₹42,00,000",
      incident:
        "Threat actors attempted stacked query injection (`105; DROP TABLE patient_records;--`) targeting the oncology patient appointment portal.",
      defenseStrategy:
        "Mahima disabled multi-statement execution in PostgreSQL client drivers and parameterized all diagnostic search filters.",
      outcome: "100% of stacked query payloads rejected; zero data loss; 120,000 cancer patient records completely insulated.",
      metrics: {
        stackedQueriesDropped: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_ast_grammar_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "FORMAL LANGUAGE GRAMMAR & AST QUERY MUTATION MODELING",
      title: "Formulating the Formal SQL AST Invariant Model in IEEE Transactions",
      budget: "₹35,00,000",
      incident:
        "Researchers modeled the formal language grammar transformations of SQL query parsers under string concatenation versus prepared statement parameter binding.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that prepared statements maintain AST root node invariance.",
      outcome: "Published peer-reviewed mathematical proof; verified across 220,000 simulated SQL injection compilation paths.",
      metrics: {
        simulationTrials: "220,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "AST Invariant Query Model",
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
                Topic 02
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              SQL Injection (SQLi) Fundamentals and Working Principles
            </h1>
            <p className="text-xs text-gray-400">
              RDBMS query compilation, AST parser mutation, string vs numeric contexts, tautology bypass (`' OR 1=1--`), and IT Act Section 66F.
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
              RDBMS Query Compilation &amp; AST Mutation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of SQL Injection: How String Concatenation Mutates Query Abstract Syntax Trees
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Relational Database Management Systems (RDBMS) process SQL statements through a strict compilation pipeline: 
              <strong>Lexical Analysis</strong> $\to$ <strong>Parsing into an Abstract Syntax Tree (AST)</strong> $\to$ 
              <strong>Query Optimization</strong> $\to$ <strong>Execution Plan</strong>. 
              SQL Injection occurs when developers build query strings dynamically using string concatenation. 
              When an attacker injects single quotation marks (`'`), comment symbols (`--`, `#`), or boolean operators, 
              the database lexer generates new operator tokens, fundamentally altering the grammar of the Abstract Syntax Tree (AST). 
              Understanding SQLi requires mastering its operational contexts: <strong>String Literal Context</strong> (requires quote breakout), 
              <strong>Numeric Context</strong> (no quotes needed; executes SQL commands directly), <strong>Identifier Context</strong> (`ORDER BY` clauses where `?` placeholders cannot be used), 
              and <strong>Stacked Queries</strong> (using semicolons to execute independent `DROP` or `UPDATE` commands).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AST Mutation Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                How String Concatenation Mutates the AST
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                WHERE user = 'admin' OR 1=1-- ➔ Root Comparison Node Replaced by Tautology OR True!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Relational logic states: $\text{False} \lor \text{True} \equiv \text{True}$. The tautology forces the row filter to evaluate as TRUE for every tuple in the relation, bypassing authentication.
              </p>
            </div>

            {/* Prepared Statements Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Parameterized Prepared Statements Defense
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Pre-Compiled AST:</strong> The database compiles the grammar template before receiving user data.</li>
                <li>• <strong className="text-purple-300">Data != Code:</strong> Injected quotes and operators are treated strictly as literal data strings.</li>
                <li>• <strong className="text-amber-300">Identifier Whitelisting:</strong> Dynamic `ORDER BY` clauses are mapped to pre-approved arrays.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - AST Query Compiler Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Query AST Compilation Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Query Compilation: Parameterized Binding vs Injected AST Mutation
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an SQL query template is compiled into a fixed Abstract Syntax Tree (AST), binding user data strictly to leaf slots without syntax mutation:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: RAW QUERY TEMPLATE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. SQL TEMPLATE
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Prepared Statement
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TEMPLATE DEFINITION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SELECT * FROM users
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  WHERE username = $1
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: AST COMPILATION ON DATABASE */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. AST COMPILATION
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Fixed Syntax Tree
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AST STRUCTURE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Root: [SELECT]
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Branch: [EQUAL ($1)]
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: UNTRUSTED DATA ARRIVAL */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. DATA BINDING
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Protocol Parameter Slot
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RAW INPUT DATA:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  admin' OR '1'='1
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Bound as Literal String!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: EXECUTION ENGINE */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. EXECUTION PLAN
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Literal String Match
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SECURITY INVARIANT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Quotes Cannot Break AST
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  P_bypass = 0.00%!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: SECURE DATABASE INTEGRITY */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. DATABASE INTEGRITY
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% Protected Data
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RESULT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Zero SQL Injection
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Data Confidentiality!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Context SQLi Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. SQL Injection Context &amp; Technique Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an SQL injection context or technique below to examine its query template, vulnerability mechanics, 
              mitigation patterns, typical exploit payloads, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(sqliDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedContextKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedContextKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  CONTEXT
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeContext.categoryBadge)}>
                    {activeContext.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Template: {activeContext.queryTemplate}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeContext.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeContext.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Mechanics &amp; AST Manipulation
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeContext.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeContext.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Vulnerable vs Secure Query Construction Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeContext.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live SQL Compiler & AST Mutation Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. SQL Query Compiler &amp; Abstract Syntax Tree (AST) Simulator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a Query Context, an Injected User Payload, and an Execution Mode to observe how the database parser 
              constructs the Abstract Syntax Tree (AST) and evaluates boolean row filters:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">SQL Compiler Controls</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Query Syntax Context:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "string_literal", label: "String Literal (WHERE user = '...')" },
                    { id: "numeric_context", label: "Numeric Context (WHERE id = ...)" },
                    { id: "order_by_context", label: "Identifier Context (ORDER BY ...)" }
                  ].map((ctx) => (
                    <button
                      key={ctx.id}
                      onClick={() => setQueryContext(ctx.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        queryContext === ctx.id
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
                <span className="text-gray-400 block">2. Injected User Input Payload:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "benign_user", label: "Benign User ('sukanta_user')" },
                    { id: "tautology_bypass", label: "Tautology Payload ('admin' OR 1=1--')" },
                    { id: "union_exfil", label: "UNION Query ('105 UNION SELECT ...')" },
                    { id: "stacked_drop", label: "Stacked Query ('105; DROP TABLE ...')" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPayload(p.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        selectedPayload === p.id
                          ? "bg-amber-950 border-amber-500 text-amber-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Execution Architecture:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setExecutionMode("vulnerable_concatenation")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      executionMode === "vulnerable_concatenation"
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Vulnerable Concatenation
                  </button>
                  <button
                    onClick={() => setExecutionMode("prepared_statement")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      executionMode === "prepared_statement"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Prepared Statement
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Compiled SQL &amp; AST Analysis</h3>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Constructed / Compiled Query on Database Server:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap border border-cyan-950/60">
                  {simulationResults.constructedQuery}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">AST Grammar Mutation Status</span>
                  <span className={clsx("text-base font-extrabold mt-1 block", simulationResults.astMutationOccurred ? "text-rose-400" : "text-emerald-400")}>
                    {simulationResults.astMutationOccurred ? "MUTATED (Grammar Broken!)" : "FIXED (AST Invariant Preserved)"}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Exploitability: {simulationResults.exploitabilityPct}%</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Authentication / Data Bypass Outcome</span>
                  <span className={clsx("text-base font-extrabold mt-1 block", simulationResults.authBypassAchieved || simulationResults.dataExfiltrationPossible ? "text-rose-400" : "text-emerald-400")}>
                    {simulationResults.authBypassAchieved ? "AUTH BYPASS (100% Dump)" : simulationResults.dataExfiltrationPossible ? "DATA EXFILTRATION POSSIBLE" : "SECURE (Zero Bypass)"}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Mode: {executionMode.toUpperCase()}</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">AST Compiler Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - SQLi Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Prepared Statements &amp; Whitelisting Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Node.js PostgreSQL, Java JDBC &amp; ORDER BY Whitelisting Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of PostgreSQL parameterized queries, Java JDBC PreparedStatement, 
              and strict Node.js ORDER BY identifier whitelisting middleware:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita neutralize tautology SQLi in Salt Lake, 
              harden numeric queries in Barrackpore power grids, and secure oncology records in Ichapur:
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
                  The Incident &amp; SQL Injection Threat
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
              7. Legal Penalties for SQL Injection Attacks in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and criminal mischief statutes 
              strictly penalize executing SQL injection to compromise databases or steal confidential data with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> SQLi attacks damaging critical power/banking systems carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to prevent database leaks.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> SQLi balance alteration fraud (Up to 7 years prison).
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
                  <strong>Assuming Numeric IDs Do Not Need Parameterization:</strong> Numeric context SQLi requires no quotes!
                </li>
                <li>
                  <strong>Attempting to Parameterize `ORDER BY` with `?`:</strong> Fails; requires strict dictionary whitelisting.
                </li>
                <li>
                  <strong>Relying on Blacklist String Escaping:</strong> Vulnerable to encoding and multi-byte bypasses.
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
                  <strong>Enforce 100% Parameterized Prepared Statements:</strong> Pre-compiles the AST, making SQLi mathematically impossible.
                </li>
                <li>
                  <strong>Apply the Principle of Least Privilege on DB Accounts:</strong> Web application user should never possess DDL rights.
                </li>
                <li>
                  <strong>Deploy Database Activity Monitoring (DAM):</strong> Detects and alerts on query anomalies in real time.
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
                  Why does the tautology `' OR 1=1--` log an attacker into the first user account in the database table?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why can prepared statement placeholders (`?`) NOT be used for table or column names in `ORDER BY` clauses?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch Execution Mode to Prepared Statement and observe Exploitability collapse to 0.00%!
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
                <span>String concatenation mutates the query AST, while Prepared Statements keep the AST fixed.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Numeric context SQLi requires no quotes, executing operators (`UNION`, `OR`) directly.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Tautology `' OR 1=1--` bypasses login because `False OR True === True` for all database rows.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>`ORDER BY` injection cannot use `?` placeholders and must be protected via strict whitelists.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MySQL comments require a trailing space (`-- `) or hash (`#`), while Postgres uses `--`.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes SQL injection cyber terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="SQL Injection (SQLi) Fundamentals FAQs"
            subtitle="30 Moderate to Expert Practice Questions & SQLi Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="SQL Injection (SQLi) Fundamentals and Working Principles (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: SQL Injection (SQLi) is one of the most critical vulnerability classes in software engineering, rooted in how database parsers build Abstract Syntax Trees (ASTs)! Understand the compilation mechanics: when developers use string concatenation, untrusted user data alters the grammar of the SQL statement before it reaches the query optimizer. Master the 4 SQLi contexts: 1. String Literal Context (requires single quote `'` breakout); 2. Numeric Context (`WHERE id = ...`, no quotes needed, allowing direct injection of `UNION` or `OR` operators); 3. Identifier Context (`ORDER BY` clauses where prepared statement `?` placeholders cannot be used, requiring strict dictionary whitelisting); 4. DML UPDATE/INSERT Statements (overwriting administrative role flags or other users' passwords). Understand why Prepared Statements provide 100% mathematical immunity: the database compiles the query AST template first, and binds user data strictly to leaf value slots in a separate protocol packet, making AST grammar mutation mathematically impossible ($P_{\text{bypass}} = 0.00\%$). Remember that Section 66F of the Indian IT Act treats SQL injection cyber terrorism against critical infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
