import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgAstPipelineId = useId();

  // Studio 1: Active Defensive Parameterization Pattern Selection
  const [selectedPatternKey, setSelectedPatternKey] = useState("two_phase_prepare_execute");

  // Studio 2: Live AST Invariance & Prepared Statement Compilation Laboratory State
  const [rawParameterInput, setRawParameterInput] = useState("9841' OR '1'='1");
  const [codingParadigm, setCodingParadigm] = useState("parameterized_stmt"); // unsafe_concatenation, parameterized_stmt, identifier_whitelisting, typesafe_query_builder
  const [languageDriver, setLanguageDriver] = useState("nodejs_pg"); // nodejs_pg, java_jdbc, python_asyncpg, php_pdo

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_parameterization");

  // Studio 4: Defensive Coding Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("nodejs_pg_parameterized_repo");

  // 8 Defensive Coding Patterns for Studio 1
  const patternDatabase = {
    two_phase_prepare_execute: {
      key: "two_phase_prepare_execute",
      name: "1. Two-Phase PREPARE & EXECUTE Compilation",
      category: "CORE DATABASE ENGINE MECHANISM",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Separates query code compilation from runtime data binding.",
      mechanismDescription:
        "Phase 1 (`PREPARE`): The database compiles the SQL string into a fixed Abstract Syntax Tree (AST) template. Phase 2 (`EXECUTE`): User inputs are passed out-of-band over the wire protocol as literal values, guaranteeing AST invariance.",
      mitigationPattern: "100% Prepared Statements on all database queries.",
      typicalSyntax: "PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?'; EXECUTE stmt USING 105;",
      codeSnippet: `// Two-Phase Compilation:
// 1. PREPARE stmt FROM 'SELECT id, balance FROM accounts WHERE account_no = $1';
// 2. EXECUTE stmt USING '9841'; (AST grammar remains 100% fixed!)`
    },
    positional_vs_named_bindings: {
      key: "positional_vs_named_bindings",
      name: "2. Positional ($1, ?) vs Named (:name) Bindings",
      category: "CROSS-LANGUAGE PLACEHOLDER PATTERNS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      securityPrinciple: "Explicit parameter slot binding across modern frameworks.",
      mechanismDescription:
        "Node.js uses `$1, $2`; Java JDBC uses `?`; Python uses `%s` or `$1`; PHP PDO uses `:name`. All transmit parameters out-of-band as length-prefixed data buffers, preventing lexer interpretation.",
      mitigationPattern: "Use native driver placeholder syntax consistently.",
      typicalSyntax: "db.query('SELECT * FROM merchants WHERE tax_id = $1', [gstNumber])",
      codeSnippet: `// Positional Parameter Binding:
const { rows } = await pool.query('SELECT * FROM merchants WHERE tax_id = $1', [rawTaxId]);`
    },
    dynamic_order_by_whitelisting: {
      key: "dynamic_order_by_whitelisting",
      name: "3. Dynamic ORDER BY Static Whitelisting",
      category: "IDENTIFIER INJECTION DEFENSE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      securityPrinciple: "Parameters CANNOT replace column names; whitelist maps are mandatory.",
      mechanismDescription:
        "Database query planners require column names at compile time. Sorting parameters cannot be parameterized with `$1`. Developers must map user inputs against a static dictionary of allowed column names.",
      mitigationPattern: "Static whitelist map: `{'price': 'price', 'name': 'name'}[req.query.sort] || 'id'`.",
      typicalSyntax: "ORDER BY ${ALLOWED_COLUMNS[sort] || 'created_at'} ${dir === 'DESC' ? 'DESC' : 'ASC'}",
      codeSnippet: `// Secure ORDER BY Whitelist:
const sortMap = { 'date': 'created_at', 'amount': 'total_amount' };
const safeCol = sortMap[req.query.sort] || 'created_at';
const safeDir = req.query.dir === 'DESC' ? 'DESC' : 'ASC';
const query = \`SELECT * FROM invoices ORDER BY \${safeCol} \${safeDir}\`;`
    },
    dynamic_in_array_expansion: {
      key: "dynamic_in_array_expansion",
      name: "4. Dynamic IN (...) Array Parameter Expansion",
      category: "MULTI-VALUE PARAMETER BINDING",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      securityPrinciple: "Safe multi-value query construction without string concatenation.",
      mechanismDescription:
        "Dynamically generates an array of positional placeholders matching the input array length (`$1, $2, $3`) and passes values as parameter bindings, or uses PostgreSQL `= ANY($1)` array syntax.",
      mitigationPattern: "Generate placeholder arrays or use native array operators.",
      typicalSyntax: "WHERE id IN ($1, $2, $3) OR id = ANY($1::int[])",
      codeSnippet: `// Array Expansion:
const placeholders = ids.map((_, i) => '$' + (i + 1)).join(', ');
const sql = \`SELECT * FROM items WHERE id IN (\${placeholders})\`;
await pool.query(sql, ids);`
    },
    typesafe_query_builders: {
      key: "typesafe_query_builders",
      name: "5. Type-Safe Query Builders (Knex / Kysely)",
      category: "COMPILE-TIME PARAMETERIZATION BY DESIGN",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Automated parameterization via programmatic method chaining.",
      mechanismDescription:
        "Constructs SQL queries through method chaining (`db('users').where({ id })`), automatically converting all input variables into positional parameterized placeholders (`$1, $2`) without manual intervention.",
      mitigationPattern: "Adopt type-safe query builders across API microservices.",
      typicalSyntax: "knex('corporate_merchants').where({ tax_id: gstNo }).select('*')",
      codeSnippet: `// Knex.js Query Builder:
const merchant = await knex('merchants')
    .where({ tax_id: req.query.gst_no })
    .select('id', 'business_name', 'balance');`
    },
    parameterized_stored_procedures: {
      key: "parameterized_stored_procedures",
      name: "6. Parameterized Stored Procedures (sp_executesql)",
      category: "DATABASE ENGINE PROCEDURE HARDENING",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      securityPrinciple: "Internal procedure statements must be parameterized.",
      mechanismDescription:
        "Stored procedures are ONLY safe if internal queries use parameters. In MSSQL, dynamic SQL must be executed via `sp_executesql` with defined parameter types, never raw `EXEC()` string concatenation.",
      mitigationPattern: "Enforce `sp_executesql` with typed parameters inside stored procedures.",
      typicalSyntax: "EXEC sp_executesql N'SELECT * FROM users WHERE name = @n', N'@n varchar(50)', @n = @val;",
      codeSnippet: `// MSSQL sp_executesql:
DECLARE @sql nvarchar(500) = N'SELECT id, balance FROM accounts WHERE account_no = @acc';
EXEC sp_executesql @sql, N'@acc varchar(20)', @acc = '9841';`
    },
    second_order_sqli_elimination: {
      key: "second_order_sqli_elimination",
      name: "7. Second-Order SQLi Elimination in Cron/ETL",
      category: "DATA PIPELINE & BACKGROUND BATCH SECURITY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      securityPrinciple: "Data from own database must still be parameterized in secondary queries.",
      mechanismDescription:
        "Data stored safely via prepared statements can still explode if retrieved and concatenated into secondary reporting queries or cron jobs. 100% parameterization must apply to all background workers.",
      mitigationPattern: "Parameterize all reporting scripts, batch jobs, and analytical queries.",
      typicalSyntax: "pool.query('INSERT INTO audit_logs (user) VALUES ($1)', [dbUser.name])",
      codeSnippet: `// Secondary Query Parameterization:
const { rows } = await pool.query('SELECT username FROM pending_users');
for (const row of rows) {
    await pool.query('INSERT INTO audit_log (actor) VALUES ($1)', [row.username]); // 100% SAFE!
}`
    },
    disable_emulated_prepares: {
      key: "disable_emulated_prepares",
      name: "8. Disabling Client-Side Prepared Emulation",
      category: "DATABASE DRIVER CONFIGURATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Enforces true server-side AST compilation over regex string escaping.",
      mechanismDescription:
        "Emulated prepared statements (e.g. PHP PDO default) perform string escaping on the client, which can be bypassed by multibyte character set flaws (GBK). Disabling emulation forces true server-side preparation.",
      mitigationPattern: "Set `ATTR_EMULATE_PREPARES = false` in database connection pools.",
      typicalSyntax: "PDO::ATTR_EMULATE_PREPARES => false",
      codeSnippet: `// PHP PDO Server-Side Preparation:
$pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_EMULATE_PREPARES => false, // True server-side preparation!
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);`
    }
  };

  const activePattern = patternDatabase[selectedPatternKey];

  // Studio 2: Live AST Invariance & Compilation Calculations
  const simulationResults = useMemo(() => {
    let precompiledSqlTemplate = "";
    let wireProtocolBuffer = "";
    let astStatus = "";
    let isSqliVulnerable = false;
    let deltaAst = "EMPTY_SET (0 Mutated Nodes)";

    if (codingParadigm === "unsafe_concatenation") {
      precompiledSqlTemplate = `SELECT id, balance, status FROM accounts WHERE account_no = '${rawParameterInput}'`;
      wireProtocolBuffer = `RAW_TEXT_QUERY: "${precompiledSqlTemplate}"`;
      astStatus = "AST MUTATED: New Boolean 'OR' Grammar Branch Created!";
      deltaAst = "NON_EMPTY (3 Injected Grammar Nodes: WHERE ➔ OR ➔ TRUE)";
      isSqliVulnerable = true;
    } else if (codingParadigm === "parameterized_stmt") {
      if (languageDriver === "nodejs_pg" || languageDriver === "python_asyncpg") {
        precompiledSqlTemplate = "SELECT id, balance, status FROM accounts WHERE account_no = $1";
      } else if (languageDriver === "java_jdbc") {
        precompiledSqlTemplate = "SELECT id, balance, status FROM accounts WHERE account_no = ?";
      } else {
        precompiledSqlTemplate = "SELECT id, balance, status FROM accounts WHERE account_no = :accountNo";
      }
      wireProtocolBuffer = `PARAM_1 (TYPE_VARCHAR, LEN ${rawParameterInput.length}): "${rawParameterInput}"`;
      astStatus = "AST INVARIANT: Fixed Tree Structure (Zero Grammar Mutation)";
      deltaAst = "EMPTY_SET (0 Mutated Nodes)";
      isSqliVulnerable = false;
    } else if (codingParadigm === "identifier_whitelisting") {
      precompiledSqlTemplate = "SELECT id, balance, status FROM accounts WHERE branch = $1 ORDER BY created_at DESC";
      wireProtocolBuffer = `PARAM_1 (TYPE_VARCHAR): "${rawParameterInput}", ORDER_BY_IDENTIFIER: "created_at" (Whitelisted)`;
      astStatus = "AST INVARIANT: Dynamic Identifier Safely Resolved via Static Dictionary";
      deltaAst = "EMPTY_SET (0 Mutated Nodes)";
      isSqliVulnerable = false;
    } else {
      // Type-Safe Query Builder
      precompiledSqlTemplate = "SELECT id, balance, status FROM accounts WHERE account_no = $1";
      wireProtocolBuffer = `AUTOMATED_BINDING: $1 = "${rawParameterInput}" (Compiled by Knex/Kysely)`;
      astStatus = "AST INVARIANT: Automated Parameterization by Design";
      deltaAst = "EMPTY_SET (0 Mutated Nodes)";
      isSqliVulnerable = false;
    }

    const exploitabilityPct = isSqliVulnerable ? 100.0 : 0.0;

    return {
      precompiledSqlTemplate,
      wireProtocolBuffer,
      astStatus,
      deltaAst,
      exploitabilityPct: exploitabilityPct.toFixed(1),
      badgeClass: isSqliVulnerable
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: !isSqliVulnerable
        ? `100% MATHEMATICAL AST INVARIANCE: Query template compiled in Phase 1; Parameters transmitted out-of-band in Phase 2; Delta AST is empty set; Exploitability is exactly 0.000%, guaranteeing complete SQLi immunity!`
        : `CRITICAL SQL INJECTION DETECTED: Code and data compiled together via string concatenation; Abstract Syntax Tree mutated by input characters; Adversary altered query logic to bypass authentication/exfiltrate data!`
    };
  }, [rawParameterInput, codingParadigm, languageDriver]);

  // Studio 4: Defensive Coding Production Database
  const codeDatabase = {
    nodejs_pg_parameterized_repo: {
      name: "Node.js PostgreSQL Parameterized Repository Pattern with Dynamic Array Binding",
      code: `// Node.js Production PostgreSQL Parameterized Repository:
const { Pool } = require('pg');
const pool = new Pool();

class MerchantAccountRepository {
    // 1. Single-Record Positional Parameter Query ($1, $2)
    static async findByTaxIdentifier(taxId, branchCode) {
        const queryText = \`
            SELECT id, business_name, total_balance, compliance_status 
            FROM corporate_merchants 
            WHERE tax_id = $1 AND branch_code = $2
        \`;
        const queryParams = [String(taxId), String(branchCode)];
        const { rows } = await pool.query(queryText, queryParams);
        return rows[0] || null;
    }

    // 2. Dynamic Array Query with Native PostgreSQL Array Binding (= ANY($1))
    static async findByIds(merchantIds = []) {
        const queryText = \`
            SELECT id, business_name, total_balance 
            FROM corporate_merchants 
            WHERE id = ANY($1::int[])
        \`;
        const { rows } = await pool.query(queryText, [merchantIds]);
        return rows;
    }

    // 3. Dynamic ORDER BY with Strict Server-Side Static Whitelisting
    static async listMerchantsSorted(sortField = 'date', sortDirection = 'ASC') {
        const columnMap = {
            'date': 'created_at',
            'balance': 'total_balance',
            'name': 'business_name'
        };
        const safeColumn = columnMap[sortField] || 'created_at';
        const safeDir = String(sortDirection).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // Safe identifier interpolation after strict whitelist verification!
        const queryText = \`SELECT id, business_name, total_balance FROM corporate_merchants ORDER BY \${safeColumn} \${safeDir}\`;
        const { rows } = await pool.query(queryText);
        return rows;
    }
}

module.exports = MerchantAccountRepository;`,
      explanation: "Production Node.js PostgreSQL repository demonstrating positional `$1` parameter bindings, native PostgreSQL array binding (`= ANY($1)`), and strict server-side static column whitelisting for dynamic `ORDER BY` sorting."
    },
    java_jdbc_prepared_statement: {
      name: "Java JDBC PreparedStatement with Strongly Typed Setters & Static Whitelisting",
      code: `// Java JDBC Production PreparedStatement Pattern:
package in.kolkata.fintech.security;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

public class SecurePaymentService {
    private static final Map<String, String> ALLOWED_SORT_COLUMNS = Map.of(
        "date", "created_at",
        "amount", "total_amount",
        "merchant", "merchant_name"
    );

    public void processMerchantLookup(Connection conn, String taxId, int merchantId, String sortBy) throws SQLException {
        // 1. Whitelist dynamic sort column:
        String safeColumn = ALLOWED_SORT_COLUMNS.getOrDefault(sortBy, "created_at");

        // 2. Pre-compile SQL AST with positional parameter placeholders (?):
        String sql = "SELECT id, total_amount, compliance_status FROM settlement_records " +
                     "WHERE tax_id = ? AND merchant_id = ? ORDER BY " + safeColumn + " DESC";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            // 3. Bind typed parameters out-of-band:
            pstmt.setString(1, taxId);
            pstmt.setInt(2, merchantId);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    // Process safe result set...
                }
            }
        }
    }
}`,
      explanation: "Production Java JDBC implementation utilizing `PreparedStatement` with strongly typed setters (`setString`, `setInt`), ensuring all parameters are bound out-of-band across the database wire protocol with zero AST mutation."
    },
    python_asyncpg_repository: {
      name: "Python asyncpg Parameterized Repository for High-Concurrency Microservices",
      code: `# Python asyncpg Production Parameterized Service:
import asyncpg
from typing import List, Optional, Dict

class CitizenHealthService:
    ALLOWED_SORT_FIELDS = {
        "date": "diagnosis_date",
        "patient": "patient_name",
        "doctor": "assigned_oncologist"
    }

    def __init__(self, db_pool: asyncpg.Pool):
        self.pool = db_pool

    async def get_patient_diagnostic_records(
        self, 
        patient_id: int, 
        department: str, 
        sort_by: str = "date"
    ) -> List[Dict]:
        safe_sort = self.ALLOWED_SORT_FIELDS.get(sort_by, "diagnosis_date")

        # 1. SECURE: Pre-compiled SQL with positional $1, $2 parameter placeholders
        query = f"""
            SELECT id, patient_name, diagnosis, treatment_plan, diagnosis_date 
            FROM oncology_diagnostics 
            WHERE patient_id = $1 AND department = $2 
            ORDER BY {safe_sort} DESC
        """

        async with self.pool.acquire() as conn:
            # 2. Parameters passed directly to native asyncpg binary protocol:
            rows = await conn.fetch(query, int(patient_id), str(department))
            return [dict(r) for r in rows]`,
      explanation: "Production Python `asyncpg` repository enforcing positional `$1, $2` parameter binding and dictionary-based static column whitelisting for high-performance, asynchronous web services."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_parameterization",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Migrating 100% of Legacy SQL Queries to Parameterized Prepared Statements",
      threatType: "STRING CONCATENATION SQL INJECTION IN PAYMENT SETTLEMENTS",
      budget: "₹95,00,000",
      incident:
        "Adversaries targeted invoice lookup routes with `' OR 1=1--` to bypass authentication and dump payment records on legacy settlement microservices.",
      defenseStrategy:
        "Mamata refactored all backend SQL queries to Parameterized Prepared Statements with positional `$1` bindings and integrated Semgrep SAST rules in CI/CD.",
      outcome: "100% of SQL injection vectors eliminated; AST invariance mathematically verified; ₹4,400 Crores in daily UPI settlements completely secured.",
      metrics: {
        parameterizationCoverage: "100.0%",
        settlementVolumeProtected: "₹4,400 Crores",
        microservicesRefactored: "92 Endpoints",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_jdbc_hardening",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "DYNAMIC ORDER BY INJECTION IN SCADA TELEMETRY LOGS",
      title: "Hardening Substation SCADA Databases with Java JDBC PreparedStatement & Column Whitelisting",
      budget: "₹64,00,000",
      incident:
        "Adversaries injected subqueries into dynamic sorting parameters (`?sort=(SELECT CASE WHEN...)`) in high-voltage breaker monitoring consoles.",
      defenseStrategy:
        "Debangshu deployed Java JDBC `PreparedStatement` with strict `ALLOWED_SORT_COLUMNS` whitelist maps and disabled client-side statement emulation.",
      outcome: "100% of dynamic sorting injection vectors neutralized; zero telemetry corruption; 100% power grid reliability across North 24 Parganas.",
      metrics: {
        sortingInjectionsBlocked: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_asyncpg_records",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "SQL INJECTION IN MULTI-PATIENT BATCH LOOKUP ROUTES",
      title: "Securing Oncology Patient Diagnostic Queries in Python asyncpg Using Array Binding",
      budget: "₹49,00,000",
      incident:
        "Scanners injected payloads into dynamic `IN (...)` patient lookup routes (`/api/patients?ids=101,102') OR ('1'='1'`) attempting to dump chemotherapy records.",
      defenseStrategy:
        "Mahima refactored queries to native PostgreSQL array binding (`WHERE id = ANY($1::int[])`) and deployed strict Pydantic input validation models.",
      outcome: "100% of batch injection attempts blocked; zero oncology records leaked; 120,000 cancer patient records fully protected.",
      metrics: {
        batchInjectionsNeutralized: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_ast_lattice_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF ABSTRACT SYNTAX TREE INVARIANCE & TYPE BINDING",
      title: "Formulating the Formal AST Invariance Model in IEEE Transactions",
      budget: "₹42,00,000",
      incident:
        "Researchers modeled the formal mathematical grammar trees of SQL compilers under string concatenation versus two-phase prepared statements.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that parameterization guarantees $\\Delta \\text{AST} = \\emptyset$ and $P_{\\text{sqli}} = 0.000\\%$.",
      outcome: "Published peer-reviewed mathematical proof; verified across 400,000 simulated SQL compiler execution runs.",
      metrics: {
        simulationTrials: "400,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "AST Invariance Lattice Model",
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
                Topic 09
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Defensive Coding: Parameterized Queries and Prepared Statements
            </h1>
            <p className="text-xs text-gray-400">
              Two-phase compilation, AST invariance, positional placeholders, dynamic ORDER BY whitelisting, array binding, and IT Act Section 66F.
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
              The Gold Standard of SQL Injection Defense
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Parameterized Queries: Mathematical Separation of Code Instructions and Literal Data
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Parameterized Queries (Prepared Statements)</strong> represent the primary, mathematically proven Gold Standard 
              defense against SQL Injection. Rather than concatenating untrusted user input directly into executable SQL command strings, 
              prepared statements employ a <strong>Two-Phase Compilation Pipeline</strong>. In Phase 1 (<strong>`PREPARE`</strong>), 
              the database engine parses, optimizes, and compiles the SQL query string into an <strong>Abstract Syntax Tree (AST)</strong> template, 
              permanently freezing all grammar nodes, operators, table names, and logic clauses. In Phase 2 (<strong>`EXECUTE`</strong>), 
              user parameters are transmitted separately over the database binary wire protocol as pure literal data constants. 
              Because parameters completely bypass the SQL parser during execution, characters with syntactic significance 
              (quotes, semicolons, dashes) are treated strictly as harmless data values ($\Delta \text{AST} = \emptyset$), 
              mathematically driving SQL injection exploitability to <strong>exactly 0.000%</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Two-Phase Pipeline Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The Two-Phase Compilation Mechanism
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60 text-[11px]">
                PREPARE (Freeze AST Grammar) ➔ EXECUTE (Bind Literal Data Values) ➔ Zero Mutation!
              </div>
              <p className="text-gray-300 leading-relaxed">
                By enforcing AST invariance, user input can never alter query logic, inject new UNION clauses, create tautologies, or spawn stacked procedures.
              </p>
            </div>

            {/* Special SQL Contexts Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-cyan-950/60 space-y-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                Handling Special SQL Contexts &amp; Identifiers
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Dynamic ORDER BY Clauses:</strong> Must be sanitized via strict server-side static column whitelist dictionaries.</li>
                <li>• <strong className="text-purple-300">Dynamic IN (...) Lists:</strong> Construct arrays of placeholders (`$1, $2, $3`) or use `= ANY($1::int[])`.</li>
                <li>• <strong className="text-amber-300">Disable Emulated Prepares:</strong> Force true server-side preparation to avoid client encoding bypasses.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Two-Phase Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Two-Phase Query Compilation Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing AST Invariance: How Prepared Statements Freeze Query Grammar
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how the database engine separates SQL compilation from runtime parameter binding to guarantee zero syntax mutation:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: QUERY TEMPLATE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. SQL TEMPLATE
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Developer Code
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  QUERY STRING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SELECT * FROM users
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  WHERE id = $1
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: PREPARE PHASE (AST COMPILATION) */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. PREPARE PHASE
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  AST Template Frozen
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  GRAMMAR COMPILED:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Fixed AST Tree Root
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Cached in DB Memory!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: EXECUTE PHASE (PARAMETER BINDING) */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. EXECUTE PHASE
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Out-of-Band Wire Binding
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  UNTRUSTED INPUT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  "9841' OR '1'='1"
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Bound as Literal String!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 4: PARSER BYPASS */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. PARSER BYPASS
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Zero Re-Compilation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AST INVARIANCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Delta AST = Empty Set
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Quotes have No Power!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 5: 100% IMMUNITY RESULT */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. ZERO SQLi
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Mathematical Immunity
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXECUTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  P_sqli = 0.000%
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Secure Query!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Pattern Defensive Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Defensive Parameterization &amp; Dynamic Pattern Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a defensive coding pattern below to examine its category, security principle, 
              compilation mechanics, enterprise mitigation patterns, and code syntax:
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
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-emerald-950 text-emerald-300 border-emerald-800 self-start">
                  PREPARED
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
                    Compilation Mechanics &amp; AST Invariance
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
                    Execution &amp; Parameterization Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activePattern.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live AST Invariance & Compilation Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. AST Invariance &amp; Prepared Statement Compilation Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enter an untrusted SQL payload, select the Coding Paradigm, and choose the Language Driver to evaluate 
              Abstract Syntax Tree (AST) structure, wire protocol buffers, and mathematical exploitability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Query Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Untrusted User Parameter Input:</span>
                <input
                  type="text"
                  value={rawParameterInput}
                  onChange={(e) => setRawParameterInput(e.target.value)}
                  className="w-full p-2 bg-gray-950 rounded border border-gray-800 text-cyan-300 font-mono text-xs focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Coding Paradigm:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "unsafe_concatenation", label: "Unsafe String Concatenation (' + user + ')" },
                    { id: "parameterized_stmt", label: "Parameterized Prepared Statement ($1, ?)" },
                    { id: "identifier_whitelisting", label: "Static Identifier Whitelist Map (ORDER BY)" },
                    { id: "typesafe_query_builder", label: "Type-Safe Query Builder (Knex / Kysely)" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCodingParadigm(p.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        codingParadigm === p.id
                          ? p.id === "unsafe_concatenation" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-emerald-950 border-emerald-500 text-emerald-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Language &amp; Database Driver:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "nodejs_pg", label: "Node.js (pg $1)" },
                    { id: "java_jdbc", label: "Java (JDBC ?)" },
                    { id: "python_asyncpg", label: "Python (asyncpg $1)" },
                    { id: "php_pdo", label: "PHP (PDO :param)" }
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setLanguageDriver(lang.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        languageDriver === lang.id
                          ? "bg-purple-950 border-purple-500 text-purple-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics & AST Structure Preview */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Database Parser AST &amp; Wire Inspection</h3>
                <span className={clsx("text-xs px-2.5 py-0.5 rounded font-mono font-bold border", simulationResults.exploitabilityPct > 0 ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-emerald-950 text-emerald-300 border-emerald-800")}>
                  {simulationResults.exploitabilityPct > 0 ? "VULNERABLE (AST Mutated)" : "100% IMMUNE (AST Invariant)"}
                </span>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Pre-Compiled SQL Query Template (Phase 1 PREPARE):</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap border border-cyan-950/60">
                  {simulationResults.precompiledSqlTemplate}
                </pre>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Database Wire Protocol Binding Buffer (Phase 2 EXECUTE):</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-indigo-300 overflow-x-auto whitespace-pre-wrap border border-indigo-950/60">
                  {simulationResults.wireProtocolBuffer}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Delta AST (Mutated Nodes)</span>
                  <span className="text-xs font-bold text-amber-300 mt-1 block">{simulationResults.deltaAst}</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Exploitability Probability</span>
                  <span className={clsx("text-lg font-extrabold mt-0.5 block", simulationResults.exploitabilityPct > 0 ? "text-rose-400" : "text-emerald-400")}>
                    {simulationResults.exploitabilityPct}%
                  </span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Compiler Invariance Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Defensive Coding Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Multi-Language Production Repositories
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Node.js Repository, Java JDBC PreparedStatement &amp; Python asyncpg Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Node.js positional parameterization with native array binding, 
              Java JDBC `PreparedStatement` with typed setters, and Python `asyncpg` repositories:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita achieve 100% parameterization in Salt Lake, 
              harden SCADA Java JDBC PreparedStatement in Barrackpore, and secure oncology records in Ichapur:
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
                  The Incident &amp; Concatenation Threat
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
              7. Legal Penalties for Un-Parameterized SQL Injection Breaches in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection frameworks 
              strictly penalize failure to use parameterized queries resulting in data theft or system compromise with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Un-parameterized SQLi attacks compromising critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized database data extraction.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to deploy prepared statements.
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
                  <strong>Attempting to Parameterize Column/Table Names:</strong> Fails; requires static whitelisting maps.
                </li>
                <li>
                  <strong>Concatenating Arrays in `IN (...)` Clauses:</strong> Re-introduces SQLi; use placeholder arrays.
                </li>
                <li>
                  <strong>Assuming Stored Procedures are Automatically Safe:</strong> Procedures concatenating strings internally remain vulnerable!
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
                  <strong>100% Prepared Statements Everywhere:</strong> Primary, report, and cron queries must be parameterized.
                </li>
                <li>
                  <strong>Disable Emulated Prepared Statements:</strong> Forces true server-side AST compilation.
                </li>
                <li>
                  <strong>Integrate SAST AST Scanners in CI/CD:</strong> Semgrep and CodeQL block string concatenations.
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
                  Why do prepared statements make it mathematically impossible for user input to alter the database query structure?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why must dynamic `ORDER BY` column names be verified against a server-side static whitelist rather than parameterized?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch Coding Paradigm to Parameterized Prepared Statement and observe Delta AST drop to Empty Set!
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
                <span>Prepared statements pre-compile the query AST first, separating code from data completely.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Parameters replace data values only; table/column names require static server-side whitelisting.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dynamic `IN (...)` queries require generating `$1, $2, $3` arrays or using `= ANY($1)`.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Disabling client-side prepared statement emulation ensures true server-side AST protection.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Second-order SQLi requires parameterizing secondary report scripts and background batch jobs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes SQL injection attacks on critical infrastructure with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Defensive Coding &amp; Parameterization FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Prepared Statement Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Defensive Coding: Parameterized Queries and Prepared Statements (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Parameterized Queries and Prepared Statements represent the foundational cornerstone of all secure software engineering! Master the Two-Phase Compilation Pipeline: Phase 1 (`PREPARE`) compiles the SQL string into a fixed Abstract Syntax Tree (AST) template, freezing all grammar nodes and clauses; Phase 2 (`EXECUTE`) transmits user parameters out-of-band across the database wire protocol as pure literal data values. Because parameters never pass through the SQL lexer, syntactic characters like quotes and semicolons can NEVER mutate query logic ($\Delta \text{AST} = \emptyset$). Remember that SQL identifiers (table names, column names, `ORDER BY` directions) CANNOT be parameterized and must always be sanitized via strict server-side static whitelist dictionaries. For dynamic `IN (...)` clauses, construct placeholder arrays (`$1, $2, $3`) or use PostgreSQL `= ANY($1::int[])`. Ensure 100% parameterization across all queries—including background ETL scripts and internal reporting cron jobs—to eliminate second-order SQL injection. Remember that Section 66F of the Indian IT Act penalizes SQL injection attacks on critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
