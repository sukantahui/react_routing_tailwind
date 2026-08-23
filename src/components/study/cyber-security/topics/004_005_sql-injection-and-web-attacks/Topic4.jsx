import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgBinaryTreeId = useId();

  // Studio 1: Active Blind Technique Selection
  const [selectedOracleKey, setSelectedOracleKey] = useState("boolean_content_length");

  // Studio 2: Live Blind SQLi Binary Search & Time Delay Simulator State
  const [secretPassword, setSecretPassword] = useState("Kolkata2026!"); // String to extract
  const [blindTechnique, setBlindTechnique] = useState("boolean_binary"); // boolean_binary, time_based_sleep, boolean_bitmask
  const [sleepDurationSeconds, setSleepDurationSeconds] = useState(5); // 1 to 5 seconds
  const [statementTimeoutActive, setStatementTimeoutActive] = useState(false); // Boolean (2000ms limit)

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_blind_defense");

  // Studio 4: Blind Hardening Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("redis_sliding_window_rate_limiter");

  // 8 Blind SQL Injection Oracles & Techniques for Studio 1
  const oracleDatabase = {
    boolean_content_length: {
      key: "boolean_content_length",
      name: "1. Boolean Content-Length Oracle",
      category: "DIFFERENTIAL RESPONSE SIZE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      oracleType: "HTTP Response Body Size (Bytes)",
      vulnerabilityMechanism:
        "Evaluating boolean conditions (`AND 1=1` vs `AND 1=2`); when TRUE, the application returns a 4,500-byte page; when FALSE, it returns a 2,100-byte page, providing an observable binary truth channel.",
      mitigationPattern: "Parameterized prepared statements eliminate conditional injection completely.",
      typicalPayload: "AND (SELECT ascii(substr(password,1,1)) FROM users WHERE id=1) > 79",
      codeSnippet: `// Boolean Content-Length Verification:
// True Condition  ➔ HTTP 200 | Size: 4,512 Bytes ("User Active")
// False Condition ➔ HTTP 200 | Size: 2,104 Bytes ("User Not Found")`
    },
    boolean_text_reflection: {
      key: "boolean_text_reflection",
      name: "2. Boolean Text Reflection Oracle",
      category: "UI STRING CONDITIONAL ORACLE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      oracleType: "DOM String Search ('Welcome' vs 'Not Found')",
      vulnerabilityMechanism:
        "The application conditionally renders specific UI text fragments based on database query results, allowing automated scripts to evaluate boolean expressions.",
      mitigationPattern: "Prepared statements and positive schema validation.",
      typicalPayload: "AND (SELECT substring(role,1,1) FROM users WHERE id=1) = 'A'",
      codeSnippet: `// DOM Text Reflection Check:
// if (response.text.includes("Welcome back, Member")) { return TRUE; } else { return FALSE; }`
    },
    time_based_postgres: {
      key: "time_based_postgres",
      name: "3. PostgreSQL pg_sleep() Oracle",
      category: "TIME DELAY LATENCY INFERENCE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      oracleType: "Server Latency Delay (Seconds)",
      vulnerabilityMechanism:
        "Injecting `pg_sleep(5)` conditional on subquery evaluations; if the character matches, the server holds the HTTP connection for 5 seconds before responding.",
      mitigationPattern: "Setting `statement_timeout = 2000ms` forcefully aborts long queries.",
      typicalPayload: "AND (SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END)='a'",
      codeSnippet: `// PostgreSQL Time Delay Payload:
// ' AND (SELECT CASE WHEN (ascii(substr(password,1,1))=65) THEN pg_sleep(5) ELSE 0 END)='a'--`
    },
    time_based_mysql: {
      key: "time_based_mysql",
      name: "4. MySQL SLEEP() Oracle",
      category: "MYSQL CONDITIONAL TIME ORACLE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      oracleType: "MySQL Server Delay Function",
      vulnerabilityMechanism:
        "Using MySQL's built-in `SLEEP()` function within an `IF()` statement to introduce deliberate response latency on true conditions.",
      mitigationPattern: "Setting `max_execution_time = 2000` in MySQL to abort sleep delays.",
      typicalPayload: "AND IF(ascii(substr(password,1,1))=65, SLEEP(5), 0)",
      codeSnippet: `// MySQL Conditional Sleep Payload:
// ' AND IF(ascii(substr(password,1,1))=65, SLEEP(5), 0)-- ➔ 5.2s response on Match!`
    },
    time_based_mssql: {
      key: "time_based_mssql",
      name: "5. Microsoft SQL WAITFOR DELAY",
      category: "MSSQL BATCH DELAY EXECUTION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      oracleType: "MSSQL Command Batch Execution",
      vulnerabilityMechanism:
        "Using MSSQL `WAITFOR DELAY '0:0:5'` within conditional blocks to pause database execution threads when a guess evaluates to true.",
      mitigationPattern: "Prepared statements and least privilege database account access.",
      typicalPayload: "; IF (ascii(substring(password,1,1))=65) WAITFOR DELAY '0:0:5';--",
      codeSnippet: `// MSSQL WAITFOR DELAY Payload:
// '; IF ((SELECT ascii(substring(password,1,1)) FROM users WHERE id=1)=65) WAITFOR DELAY '0:0:5';--`
    },
    binary_search_algorithm: {
      key: "binary_search_algorithm",
      name: "6. Binary Search Extraction Optimization",
      category: "ALGORITHMIC EXTRACTION ACCELERATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      oracleType: "Halving Search Range in 7 Steps",
      vulnerabilityMechanism:
        "Testing midpoint inequalities (`ASCII > 64`, `ASCII > 96`), halving the printable ASCII range $[32, 126]$ and extracting any character in exactly $\\lceil \\log_2(95) \\rceil = 7$ queries.",
      mitigationPattern: "Redis sliding window rate limiting to block automated query bursts.",
      typicalPayload: "AND ascii(substr(password,1,1)) > 79",
      codeSnippet: `// Binary Search Complexity:
// 95 Printable Characters ➔ Exactly 7 HTTP Requests per character instead of 95!`
    },
    bitmasking_extraction: {
      key: "bitmasking_extraction",
      name: "7. Bitmasking (Bit-by-Bit) Extraction",
      category: "DETERMINISTIC BIT-LEVEL EXTRACTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      oracleType: "8-Bit Binary Masking (& 1, & 2, & 4...)",
      vulnerabilityMechanism:
        "Evaluating each of the 8 individual bits of an ASCII byte using bitwise AND operators, extracting any character in exactly 8 deterministic requests without inequality edge cases.",
      mitigationPattern: "Parameterized prepared statements prevent all bitwise evaluations.",
      typicalPayload: "AND (ascii(substr(password,1,1)) & 1) = 1",
      codeSnippet: `// Bitwise Masking Queries:
// Bit 0: AND (ascii(substr(pass,1,1)) & 1) = 1 ➔ True (1)
// Bit 1: AND (ascii(substr(pass,1,1)) & 2) = 2 ➔ False (0) ➔ Reconstruct byte in 8 queries!`
    },
    statement_timeout_defense: {
      key: "statement_timeout_defense",
      name: "8. Database Statement Timeout Clamping",
      category: "DEFENSIVE RUNTIME HARDENING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      oracleType: "Query Execution Limit (2000ms)",
      vulnerabilityMechanism:
        "Configuring the database engine to abort any query taking longer than 2,000 ms, completely neutralizing 5-second time-delay blind SQL injection attacks.",
      mitigationPattern: "SET statement_timeout = '2000ms' in PostgreSQL or `max_execution_time` in MySQL.",
      typicalPayload: "SET statement_timeout = 2000;",
      codeSnippet: `// Database Statement Timeout Hardening:
// In postgresql.conf: statement_timeout = 2000 -- Forces database to kill queries running > 2s!`
    }
  };

  const activeOracle = oracleDatabase[selectedOracleKey];

  // Studio 2: Live Blind SQLi Extraction Calculations
  const extractionTelemetry = useMemo(() => {
    const passLength = secretPassword.length;

    let queriesPerChar = 7;
    let algorithmName = "Binary Search ($O(N \\log_2 |\\Sigma|)$)";

    if (blindTechnique === "boolean_bitmask") {
      queriesPerChar = 8;
      algorithmName = "8-Bit Bitmasking ($O(8N)$)";
    } else if (blindTechnique === "time_based_sleep") {
      queriesPerChar = 7;
      algorithmName = "Time-Based Sleep Oracle ($5\\text{s Sleep}$)";
    }

    const totalQueries = passLength * queriesPerChar;

    let durationSeconds = 0;
    let attackBlocked = false;
    let blockReason = "";

    if (blindTechnique === "time_based_sleep") {
      if (statementTimeoutActive && sleepDurationSeconds >= 2) {
        attackBlocked = true;
        blockReason = `DATABASE STATEMENT TIMEOUT TRIGGERED: PostgreSQL terminated query at 2,000 ms (Injected sleep was ${sleepDurationSeconds}s); Attack failed!`;
        durationSeconds = 2.0;
      } else {
        // Average time delay extraction: queries * (sleep + baseline latency ~0.1s)
        durationSeconds = totalQueries * (sleepDurationSeconds + 0.1);
      }
    } else {
      // Boolean extraction over fast HTTP connections (~0.05s per request)
      durationSeconds = totalQueries * 0.05;
    }

    return {
      passLength,
      queriesPerChar,
      totalQueries,
      durationSeconds: durationSeconds.toFixed(1),
      algorithmName,
      attackBlocked,
      blockReason,
      badgeClass: attackBlocked
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : "bg-rose-950 text-rose-300 border-rose-800",
      statusMessage: attackBlocked
        ? blockReason
        : blindTechnique === "time_based_sleep"
        ? `TIME-BASED BLIND EXTRACTION IN PROGRESS: Extracting ${passLength}-character secret requires ${totalQueries} queries; Total estimated attack duration: ${durationSeconds.toFixed(1)} seconds (${(durationSeconds / 60).toFixed(1)} minutes)!`
        : `BOOLEAN BLIND EXTRACTION ACTIVE: Binary search extracted "${secretPassword}" (${passLength} chars) in ${totalQueries} requests; Total execution time: ${durationSeconds.toFixed(1)} seconds!`
    };
  }, [secretPassword, blindTechnique, sleepDurationSeconds, statementTimeoutActive]);

  // Studio 4: Blind Hardening Production Code Database
  const codeDatabase = {
    redis_sliding_window_rate_limiter: {
      name: "Redis Sliding Window Rate Limiting Middleware (Defeating Automated Blind SQLi)",
      code: `// Express.js + Redis Sliding Window Rate Limiting Middleware:
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

exports.blindSqliRateLimiter = async (req, res, next) => {
    const clientIp = req.ip;
    const windowMs = 60 * 1000; // 1 Minute Window
    const maxAllowedRequests = 60; // Max 60 requests per minute
    const currentTimestamp = Date.now();
    const redisKey = \`ratelimit:blind_sqli:\${clientIp}\`;

    try {
        const multi = redis.multi();
        // 1. Remove request timestamps older than the sliding window
        multi.zremrangebyscore(redisKey, 0, currentTimestamp - windowMs);
        // 2. Add current request timestamp
        multi.zadd(redisKey, currentTimestamp, \`\${currentTimestamp}-\${Math.random()}\`);
        // 3. Count requests in the current window
        multi.zcard(redisKey);
        // 4. Set key expiration
        multi.expire(redisKey, 60);

        const results = await multi.exec();
        const requestCount = results[2][1];

        // 5. ENFORCE RATE LIMIT:
        // Blind SQLi binary search scripts sending > 60 requests/min are immediately blocked!
        if (requestCount > maxAllowedRequests) {
            logger.warn({
                event: 'RATE_LIMIT_BLOCKED_BLIND_SQLI_PROBE',
                ip: clientIp,
                requestCount: requestCount,
                path: req.originalUrl
            });
            return res.status(429).json({
                error: "Too Many Requests: Automated query probing detected. Security alert logged to SIEM!"
            });
        }

        next();
    } catch (err) {
        next(err);
    }
};`,
      explanation: "Production Express.js middleware using Redis sorted sets (ZSET) to implement a high-precision sliding window rate limiter, completely neutralizing automated Blind SQL injection binary search tools."
    },
    postgres_statement_timeout_conf: {
      name: "PostgreSQL Database Statement Timeout Hardening Configuration",
      code: `# PostgreSQL Production Server Hardening (postgresql.conf):
# -------------------------------------------------------------
# 1. Forcefully terminate any SQL statement running longer than 2,000 milliseconds (2 seconds)
# This completely neutralizes Time-Based Blind SQLi payloads (pg_sleep(5), heavy Cartesian joins)!
statement_timeout = 2000

# 2. Terminate idle transactions holding locks after 5 seconds
idle_in_transaction_session_timeout = 5000

# 3. Log long-running queries for security auditing
log_min_duration_statement = 1000

# --- Per-Connection Enforcement via Node.js Connection Pool ---
# In app startup:
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    statement_timeout: 2000 // 2,000 ms timeout clamped on every client connection!
});`,
      explanation: "PostgreSQL configuration and client connection pool settings clamping `statement_timeout` to 2,000 ms, ensuring any injected time-delay function (`pg_sleep(5)`) is aborted by database silicon."
    },
    parameterized_blind_sink_defense: {
      name: "Node.js PostgreSQL Parameterized Query Defeating Blind Boolean & Time Sinks",
      code: `// Node.js Parameterized Query Defeating Inferential Blind SQLi:
const { Pool } = require('pg');
const pool = new Pool();

// Secure Controller: Check if Citizen Account Exists by Account Number
exports.checkAccountStatus = async (req, res) => {
    const rawAccountNumber = req.query.account_no; // Untrusted input: "105' AND (SELECT pg_sleep(5))='a"

    try {
        // 1. SECURE PARAMETERIZED QUERY:
        // Protocol-level parameter binding pre-compiles the query AST!
        // Injected boolean conditions and pg_sleep() functions are treated strictly as literal data!
        const queryText = 'SELECT id, is_active FROM bank_accounts WHERE account_number = $1';
        const queryValues = [String(rawAccountNumber)];

        const { rows } = await pool.query(queryText, queryValues);

        if (rows.length === 0) {
            return res.json({ status: "not_found", message: "Account does not exist." });
        }

        // Return consistent, minimal response:
        res.json({ status: "found", active: rows[0].is_active });
    } catch (err) {
        next(err);
    }
};`,
      explanation: "Production PostgreSQL controller utilizing `$1` parameterized placeholders, fixing the AST structure and ensuring that injected boolean operators or sleep functions cannot be evaluated."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_blind_defense",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Hardening Merchant API Session Verification Against Boolean Blind SQLi",
      threatType: "BOOLEAN-BASED BINARY SEARCH SESSION HARVESTING",
      budget: "₹90,00,000",
      incident:
        "Adversaries launched automated binary search scripts querying `/verify_session?token=xyz' AND ascii(substr(auth_key,1,1))>64--` to slowly harvest merchant authentication keys.",
      defenseStrategy:
        "Mamata deployed Redis sliding window rate limiting (60 req/min) and migrated 100% of session queries to Parameterized Prepared Statements.",
      outcome: "100% of binary search probes throttled and blocked; zero merchant keys leaked; ₹3,900 Crores in daily UPI settlements secured.",
      metrics: {
        probesThrottled: "100.0%",
        settlementVolumeProtected: "₹3,900 Crores",
        endpointsProtected: "70 API Gateways",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_time_blind",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "TIME-BASED BLIND SQLi (pg_sleep Delay Probes on Switchgear Telemetry)",
      title: "Throttling and Clamping Time-Based SQLi Probes on High-Voltage Switchgear Consoles",
      budget: "₹59,00,000",
      incident:
        "Threat actors injected 5-second `pg_sleep()` conditional queries into substation switchgear diagnostic forms attempting to infer administrative passwords.",
      defenseStrategy:
        "Debangshu configured database `statement_timeout = 2000ms`, terminating all long queries, and enforced strict FIDO2 token Multi-Factor Authentication.",
      outcome: "100% of time-delay probes aborted by database engine in 2 seconds; zero unauthorized access; 100% grid stability across North 24 Parganas.",
      metrics: {
        timeDelaysAborted: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_blind_search",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "BITMASKING BLIND SQLi (Oncology Patient Diagnosis Extraction)",
      title: "Neutralizing Bitmasking Blind SQL Injection Across Oncology Patient Diagnostic Lookups",
      budget: "₹44,00,000",
      incident:
        "Automated scripts executed 8-bit bitmasking queries (`AND (ascii(substr(diagnosis,1,1)) & 1)=1`) to extract chemotherapy treatment files.",
      defenseStrategy:
        "Mahima enforced strict PostgreSQL prepared statements and enabled positive OpenAPI schema validation rejecting non-alphanumeric search strings.",
      outcome: "100% of bitmasking payloads rejected; zero patient diagnostic files compromised; 120,000 cancer patient records fully insulated.",
      metrics: {
        bitmaskingProbesBlocked: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_entropy_convergence_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF INFORMATION ENTROPY & BINARY SEARCH CONVERGENCE",
      title: "Formulating the Information Entropy & Query Complexity Model in IEEE Transactions",
      budget: "₹37,00,000",
      incident:
        "Researchers formulated the mathematical relationship between Shannon information entropy, binary search query complexity ($7N$), and time-delay confidence intervals.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that prepared statements eliminate all information entropy leakage ($\Delta I = 0.00$ bits).",
      outcome: "Published peer-reviewed mathematical proof; verified across 280,000 simulated blind SQL injection iterations.",
      metrics: {
        simulationTrials: "280,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Entropy & Binary Search Complexity Model",
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
                Topic 04
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Inferential (Blind) SQLi: Boolean-based and Time-based SQL Injection
            </h1>
            <p className="text-xs text-gray-400">
              Binary search optimization ($7N$), bitmasking, `pg_sleep()`, `WAITFOR DELAY`, statement timeouts, and IT Act Section 66F.
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
              Inferential SQL Injection Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. Inferential (Blind) SQL Injection: Information Theoretic Data Extraction via Binary &amp; Time Oracles
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              In hardened production environments, web applications suppress database error messages and do not reflect 
              raw query results on screen. Under these constraints, adversaries employ <strong>Inferential (Blind) SQL Injection</strong>, 
              reconstructing confidential database tables character-by-character through binary true/false queries. 
              In <strong>Boolean-Based Blind SQLi</strong>, the attacker evaluates conditional expressions (`AND 1=1` vs `AND 1=2`), 
              observing differential response indicators such as HTTP status codes, content-length byte variations, or DOM text reflections. 
              In <strong>Time-Based Blind SQLi</strong>, the attacker injects conditional sleep functions (`pg_sleep(5)`, `WAITFOR DELAY`), 
              measuring network response latency to evaluate subqueries. Using the <strong>Binary Search Algorithm</strong>, 
              the character search space ($[32, 126]$) is halved with each request, extracting any character in exactly 
              $\lceil \log_2(95) \rceil = 7$ HTTP queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Binary Search Mechanics Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Binary Search Extraction ($7N$ Complexity)
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                ASCII > 79? (False) ➔ ASCII > 55? (True) ➔ Exact Character Extracted in 7 Steps!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Extracting a 16-character password requires exactly $16 \times 7 = 112$ HTTP queries. In boolean mode, this takes ~5.6 seconds.
              </p>
            </div>

            {/* Time-Based Clamping Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Time Delay Clamping &amp; Rate Limiting
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Database Statement Timeout:</strong> Setting `statement_timeout = 2000ms` forcefully terminates 5s sleep delays.</li>
                <li>• <strong className="text-purple-300">Redis Sliding Window Limiter:</strong> Restricting clients to 60 req/min blocks automated binary search tools.</li>
                <li>• <strong className="text-amber-300">Prepared Statements:</strong> Eliminates conditional query modification, driving information leakage to 0.00 bits.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Binary Search Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Binary Search Convergence Tree Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Blind Binary Search: Converging on ASCII 'M' (77) in 7 Steps
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an automated Blind SQL injection script halves the printable ASCII search space $[32, 126]$ to pinpoint a secret character in 7 queries:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STEP 1: INITIAL RANGE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  STEP 1: MIDPOINT 79
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Range: [32, 126]
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  QUERY: ASCII &gt; 79?
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  RESPONSE: FALSE
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  New Range: [32, 79]
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STEP 2: RANGE [32, 79] */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  STEP 2: MIDPOINT 55
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Range: [32, 79]
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  QUERY: ASCII &gt; 55?
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  RESPONSE: TRUE
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  New Range: [56, 79]
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STEP 3: RANGE [56, 79] */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  STEP 3: MIDPOINT 67
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Range: [56, 79]
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  QUERY: ASCII &gt; 67?
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  RESPONSE: TRUE
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  New Range: [68, 79]
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STEP 4 & 5: MIDPOINTS 73 & 76 */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  STEPS 4-6: CONVERGE
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Range: [74, 79] ➔ [77, 79]
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  QUERY: ASCII == 77?
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  RESPONSE: TRUE
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Match: ASCII 77!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STEP 7: CHARACTER IDENTIFIED */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  STEP 7: CHARACTER 'M'
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% Extracted
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RECONSTRUCTED:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                  CHAR: 'M' (77)
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Cost: 7 HTTP Requests!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Oracle Blind Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Blind SQLi Oracle &amp; Algorithmic Optimization Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a Blind SQL injection oracle or optimization algorithm below to examine its mechanism, 
              mitigation patterns, typical exploit payloads, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(oracleDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedOracleKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedOracleKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  ORACLE
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeOracle.categoryBadge)}>
                    {activeOracle.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Type: {activeOracle.oracleType}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeOracle.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeOracle.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Oracle Mechanics &amp; Binary Decision Logic
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeOracle.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeOracle.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Code Execution &amp; Payload Syntax
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeOracle.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Blind SQLi Binary Search & Time Delay Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Blind SQL Injection Binary Search &amp; Time Delay Simulator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enter a secret target string, select the Blind Extraction Algorithm, configure sleep durations, 
              and toggle Database Statement Timeout to calculate total queries, execution duration, and see how timeouts block attacks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Extraction Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Secret String to Extract:</span>
                <input
                  type="text"
                  value={secretPassword}
                  onChange={(e) => setSecretPassword(e.target.value || "AdminPass")}
                  className="w-full p-2 bg-gray-950 rounded border border-gray-800 text-cyan-300 font-mono text-xs focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Blind Extraction Technique:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "boolean_binary", label: "Boolean Binary Search (7 Queries/Char)" },
                    { id: "boolean_bitmask", label: "Boolean 8-Bit Bitmasking (8 Queries/Char)" },
                    { id: "time_based_sleep", label: "Time-Based Sleep Oracle (Latency Delays)" }
                  ].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setBlindTechnique(tech.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        blindTechnique === tech.id
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {tech.label}
                    </button>
                  ))}
                </div>
              </div>

              {blindTechnique === "time_based_sleep" && (
                <div className="space-y-1 pt-1 border-t border-gray-800">
                  <div className="flex justify-between text-gray-400">
                    <span>3. Injected Sleep Delay ($\Delta t$):</span>
                    <span className="text-amber-400 font-bold font-mono">{sleepDurationSeconds} Seconds</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={sleepDurationSeconds}
                    onChange={(e) => setSleepDurationSeconds(parseInt(e.target.value))}
                    className="w-full accent-amber-500 bg-gray-800"
                  />
                </div>
              )}

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">4. Database Statement Timeout Defense:</span>
                <button
                  onClick={() => setStatementTimeoutActive(!statementTimeoutActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    statementTimeoutActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {statementTimeoutActive ? "✔ STATEMENT TIMEOUT ACTIVE (2000ms)" : "UNLIMITED QUERY TIMEOUT"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Extraction Telemetry &amp; Complexity Analytics</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Secret Length</span>
                  <span className="text-lg font-extrabold text-cyan-400">{extractionTelemetry.passLength} Chars</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Shannon H: {(extractionTelemetry.passLength * 6.57).toFixed(1)} bits</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Queries / Char</span>
                  <span className="text-lg font-extrabold text-purple-400">{extractionTelemetry.queriesPerChar} Requests</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Complexity: {extractionTelemetry.algorithmName.split(" ")[0]}</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Total HTTP Probes</span>
                  <span className="text-lg font-extrabold text-amber-400">{extractionTelemetry.totalQueries} Requests</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Total Packets</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Extraction Time</span>
                  <span className="text-lg font-extrabold text-rose-400">{extractionTelemetry.durationSeconds}s</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">~{((parseFloat(extractionTelemetry.durationSeconds)) / 60).toFixed(1)} Minutes</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", extractionTelemetry.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Blind Extraction Risk Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{extractionTelemetry.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Blind Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Rate Limiting &amp; Statement Timeout Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Redis Sliding Window Limiter, PostgreSQL Timeout &amp; Parameterized Query Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Redis sliding window rate limiting (defeating automated binary search), 
              PostgreSQL database statement timeout clamping, and Node.js parameterized queries:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita throttle binary search probing in Salt Lake, 
              clamp SCADA sleep delays in Barrackpore, and secure oncology records in Ichapur:
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
                  The Incident &amp; Blind Injection Vector
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
              7. Legal Penalties for Blind SQL Injection Attacks in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection statutes 
              strictly penalize executing Blind SQL injection with severe civil liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Blind SQLi attacks compromising critical power/banking systems carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">IPC Section 420:</strong> Blind credential theft &amp; fraud (Up to 7 years prison).
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
                  <strong>Assuming Masked Errors Eliminate SQLi:</strong> Blind SQLi requires zero error messages!
                </li>
                <li>
                  <strong>Using Linear Character Search:</strong> Takes 95 requests per char; Binary Search takes 7!
                </li>
                <li>
                  <strong>Ignoring Network Latency Jitter:</strong> Leads to false positives in time-based attacks.
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
                  <strong>Set `statement_timeout = 2000ms`:</strong> Aborts injected sleep delays after 2 seconds.
                </li>
                <li>
                  <strong>Deploy Redis Sliding Window Rate Limiters:</strong> Restrict clients to 60 req/min.
                </li>
                <li>
                  <strong>Deploy 100% Parameterized Prepared Statements:</strong> Completely eliminates conditional execution.
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
                  Why does Binary Search extract any printable character in exactly $\lceil \log_2(95) \rceil = 7$ HTTP queries?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does setting `statement_timeout = 2000ms` in PostgreSQL prevent time-based blind SQLi from functioning?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Database Statement Timeout and observe the 5-second sleep attack get forcefully aborted!
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
                <span>Blind SQLi is used when the web application displays zero data and suppresses error messages.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Binary Search extracts each character in exactly $\lceil \log_2(95) \rceil = 7$ HTTP requests.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Time-Based Blind SQLi injects `pg_sleep(5)` or `WAITFOR DELAY` to measure response timing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Setting `statement_timeout = 2000ms` forcefully terminates time-delay injection queries.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Redis sliding window rate limiters neutralize automated blind extraction scripts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes blind SQL injection cyber terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Inferential (Blind) SQLi FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Blind Extraction Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Inferential (Blind) SQLi: Boolean-based and Time-based SQL Injection (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Inferential (Blind) SQL Injection demonstrates that a lack of visible output or error messages does NOT make an un-parameterized query safe! Master the two core blind oracles: 1. Boolean-Based Oracles (evaluating differential response size, HTTP status codes, or DOM text reflections); 2. Time-Based Oracles (injecting `pg_sleep(5)` in PostgreSQL, `SLEEP(5)` in MySQL, or `WAITFOR DELAY` in MSSQL to measure response delays). Master the mathematics of binary search: understand why halving the ASCII search range ($[32, 126]$) extracts any character in exactly $\lceil \log_2(95) \rceil = 7$ HTTP queries. Implement enterprise defenses: 1. Deploy 100% Parameterized Prepared Statements; 2. Configure `statement_timeout = 2000ms` in PostgreSQL or `max_execution_time = 2000` in MySQL to abort any injected sleep delays $> 2$ seconds; 3. Deploy Redis sliding window rate limiters restricting clients to 60 req/min. Remember that Section 66F of the Indian IT Act penalizes blind SQL injection cyber terrorism against critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
