import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – SQL Injection (SQLi) Vulnerabilities: Attack Vectors and Parameterized Queries / Prepared Statements Defense
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive SQL injection defense workbench: dissecting attack vectors (Tautologies, UNION exfiltration, Blind SQLi), demonstrating the 2-stage prepared statement compilation lifecycle, exploring multi-language implementations (Node.js, Java, Python), and securing dynamic identifiers via allowlists in MySQL 8.0.
 */
const Topic10 = () => {
  // Interactive SQLi Defense State
  const [selectedDefensePhase, setSelectedDefensePhase] = useState("phase1_attack_vectors");

  const defensePhases = {
    phase1_attack_vectors: {
      phaseNumber: "Phase 1: Attack Vectors & Payloads",
      title: "1. The Anatomy of SQL Injection Attacks",
      badge: "Vulnerability Mechanics",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ VULNERABLE DYNAMIC STRING CONCATENATION:
-- Query: "SELECT * FROM users WHERE user = '" + inputUser + "' AND pass = '" + inputPass + "'"

-- 1. Tautology Authentication Bypass Payload:
-- Input in username: admin' OR '1'='1' -- 
-- Evaluated SQL:
SELECT * FROM users WHERE user = 'admin' OR '1'='1' -- ' AND pass = '...';

-- 2. UNION-Based Data Exfiltration:
-- Input in search: ' UNION SELECT 1, user, authentication_string, 4 FROM mysql.user -- 
-- Evaluated SQL:
SELECT item_id, item_name, price FROM products 
WHERE item_name = '' UNION SELECT 1, user, authentication_string, 4 FROM mysql.user -- ';`,
      explanation:
        "When an application constructs SQL statements by concatenating raw user input strings, the database SQL parser interprets user data as executable SQL commands, enabling attackers to bypass logins, steal password hashes, or delete records.",
      keyTakeaways: [
        "Tautologies force WHERE clauses to evaluate to TRUE unconditionally.",
        "UNION injections merge confidential tables into public application responses.",
        "Root cause is the failure to mathematically separate code from data."
      ]
    },
    phase2_prepared_statements: {
      phaseNumber: "Phase 2: Prepared Statements Defense",
      title: "2. The 2-Stage Prepared Statement Compilation Lifecycle",
      badge: "Mathematical Defense",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛡️ NATIVE MYSQL PREPARED STATEMENTS (SQL LAYER):

-- STAGE 1: COMPILE & PREPARE EXECUTION PLAN:
-- The SQL parser compiles syntax tree BEFORE user values are seen!
PREPARE stmt_auth FROM 
  'SELECT user_id, email, role FROM users WHERE username = ? AND password_hash = ?';

-- STAGE 2: EXECUTE WITH LITERAL DATA PARAMETERS:
-- Malicious input is treated strictly as literal string characters:
SET @malicious_user = "admin' OR '1'='1' -- ";
SET @password_hash = "Hash#2026";

EXECUTE stmt_auth USING @malicious_user, @password_hash;
-- Result: Searches for an account literally named "admin' OR '1'='1' -- ". Zero injection!

DEALLOCATE PREPARE stmt_auth;`,
      explanation:
        "Prepared statements eliminate SQL injection by compiling the SQL parse tree before parameter values are received. User inputs are transmitted as pure literal data values over the binary protocol, making it mathematically impossible for input strings to alter query syntax.",
      keyTakeaways: [
        "Stage 1 (Prepare): Compiles SQL syntax and locks the execution plan.",
        "Stage 2 (Execute): Binds parameter values as literal data bytes.",
        "User quotes and comment symbols are treated strictly as harmless text."
      ]
    },
    phase3_language_drivers: {
      phaseNumber: "Phase 3: Multi-Language Implementation",
      title: "3. Parameterization Across Modern Application Stacks",
      badge: "Production Code",
      badgeColor: "cyan",
      sqlSnippet: `// 🌐 1. Node.js (mysql2 Binary Protocol Prepared Statements):
const [rows] = await connection.execute(
  'SELECT account_id, balance FROM accounts WHERE customer_id = ? AND city = ?',
  [customerId, 'Kolkata']
);

// ☕ 2. Java (JDBC PreparedStatement):
String sql = "SELECT balance FROM accounts WHERE account_num = ? AND status = ?";
PreparedStatement stmt = conn.prepareStatement(sql);
stmt.setString(1, accountNum);
stmt.setString(2, "ACTIVE");
ResultSet rs = stmt.executeQuery();

# 🐍 3. Python (mysql-connector-python):
query = "SELECT user_id, email FROM users WHERE phone = %s"
cursor.execute(query, (user_phone,))`,
      explanation:
        "Modern language drivers provide native support for binary protocol prepared statements. Using connection.execute() in Node.js, PreparedStatement in Java, and parameterized cursor.execute() in Python guarantees 100% protection across the entire engineering fleet.",
      keyTakeaways: [
        "Node.js mysql2: Always use connection.execute() instead of connection.query().",
        "Java JDBC: PreparedStatement handles data type escaping natively.",
        "Python: Pass parameters as tuples in cursor.execute()."
      ]
    },
    phase4_dynamic_identifiers: {
      phaseNumber: "Phase 4: Dynamic Identifiers & Allowlists",
      title: "4. Securing Dynamic ORDER BY & Table Names via Allowlists",
      badge: "Identifier Allowlists",
      badgeColor: "purple",
      sqlSnippet: `// 🔒 SECURE DYNAMIC SORTING VIA PROGRAMMATIC ALLOWLISTING:

// Dynamic column names CANNOT use '?' placeholders!
// Vulnerable Anti-Pattern: \`ORDER BY \${req.query.sortBy}\` &rarr; SQLi!

// Production Best Practice (Strict Dictionary Allowlist):
const ALLOWED_SORT_COLUMNS = {
  'price': 'unit_price',
  'date': 'created_at',
  'name': 'product_name'
};

// Safe lookup with deterministic fallback:
const targetColumn = ALLOWED_SORT_COLUMNS[req.query.sortBy] || 'created_at';
const sortOrder = req.query.order === 'DESC' ? 'DESC' : 'ASC';

// Safe to concatenate strictly validated internal tokens:
const sql = \`SELECT product_id, product_name, unit_price FROM products ORDER BY \${targetColumn} \${sortOrder}\`;
const [results] = await db.execute(sql);`,
      explanation:
        "Because SQL placeholders (?) only accept literal values and cannot parameterize table or column identifiers, dynamic sorting or schema selection must be validated against hardcoded programmatic allowlists before query execution.",
      keyTakeaways: [
        "SQL placeholders (?) cannot be used for table or column names.",
        "Validate sorting parameters against strict hardcoded dictionary maps.",
        "Always provide safe default fallbacks for unapproved input values."
      ]
    }
  };

  const currentPhase = defensePhases[selectedDefensePhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 10 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          SQL Injection (SQLi) Defense: <span className="text-emerald-400">Prepared Statements</span> &amp; Attack Vectors
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the definitive defense against SQL injection: analyzing attack vectors (Tautology authentication bypass, UNION exfiltration, Blind SQLi), implementing the 2-stage prepared statement compilation lifecycle, and securing dynamic identifiers with allowlists in MySQL 8.0.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Attack Vector vs Defense Matrix ─────────────── */}
        <section id="defense-matrix" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Attack Vectors vs Parameterized Defenses
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How prepared statements mathematically neutralize each major SQL injection vector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Attack 1</span>
              <h3 className="font-bold text-white text-base">Tautology Auth Bypass</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Injects <code>' OR '1'='1</code> to force boolean TRUE. Neutralized by binding password as a literal string.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Attack 2</span>
              <h3 className="font-bold text-white text-base">UNION Exfiltration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Appends <code>UNION SELECT</code> to steal data. Neutralized because the compiled query grammar cannot accept new clauses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Attack 3</span>
              <h3 className="font-bold text-purple-300 text-base">Time-Based Blind</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Injects <code>SLEEP(5)</code> to infer bits. Neutralized because function calls inside parameters are treated as literal text.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-700/60 bg-emerald-950/20 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Defense</span>
              <h3 className="font-bold text-emerald-300 text-base">Prepared Statements</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Compiles the SQL parse tree first, transmitting data parameters in separate binary protocol packets.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive SQLi Defense Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe SQL injection attack vectors, prepared statements compilation, and language implementations.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(defensePhases).map((phaseKey) => {
              const phase = defensePhases[phaseKey];
              const isSelected = selectedDefensePhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedDefensePhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {phase.phaseNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentPhase.phaseNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentPhase.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentPhase.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentPhase.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentPhase.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentPhase.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentPhase.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhase.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Code Demonstration &amp; Execution Telemetry:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentPhase.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentPhase.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Security case studies in Barrackpore and Kolkata demonstrating parameterized migration and dynamic allowlisting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating SQLi in Barrackpore Retail Store
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  100% Remediated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a legacy POS search endpoint concatenated product inputs: <code>SELECT * FROM inventory WHERE item_name LIKE '%$input%'</code>. Attackers injected tautology payloads to dump full inventory lists. Mamata refactored the backend using Node.js <code>mysql2.execute('SELECT * FROM inventory WHERE item_name LIKE ?', [`%${input}%`])</code>. All injected quotes were treated as literal characters, neutralizing the vulnerability completely.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Dynamic Allowlist Defense in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  ₹50 Crore Ledger Guard
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, an analytics dashboard processing ₹50 Crores in financial transactions allowed users to sort ledgers dynamically. To prevent SQL injection in the <code>ORDER BY</code> clause where <code>?</code> placeholders are not supported, Debangshu implemented a strict dictionary allowlist. Any unapproved column input defaulted safely to <code>created_at</code>, preventing injection into table sorting clauses.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous escaping anti-patterns and unsafe ORM raw query methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Relying on String Escaping (addslashes)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Multibyte character encodings (GBK/Big5) can consume backslash escape characters (%bf%5c), resurrecting injected quotes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use true binary-protocol prepared statements over escaping functions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Using Raw String Concatenation inside ORMs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using methods like <code>prisma.$queryRawUnsafe(`SELECT ... ${input}`)</code> re-introduces SQL injection into modern ORM codebases.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use standard ORM CRUD methods or parameterized tagged template literals.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Combine Prepared Statements with PoLP
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure application database service accounts possess 0 DDL permissions, providing defense-in-depth even if application code fails.
              </p>
              <div className="text-xs text-slate-400">
                Limits the blast radius of any theoretical application compromise.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Disable Detailed Error Messages in Production
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Return generic HTTP 500 error responses to clients while writing detailed SQL exception stack traces to secure private log aggregators.
              </p>
              <div className="text-xs text-slate-400">
                Prevents error-based SQL injection reconnaissance by attackers.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 10: SQL Injection (SQLi) Vulnerabilities: Attack Vectors and Parameterized Queries / Prepared Statements Defense"
            content={noteText}
          />

          <Teacher
            note="SQL injection is 100% preventable. The golden rule is simple: NEVER concatenate untrusted user strings into SQL queries. Always use Parameterized Queries (Prepared Statements) with connection.execute() or PreparedStatement, validate dynamic column names against strict allowlists, and pair your code with least-privilege database service accounts!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of SQL injection defense, binary protocol execution, and allowlist security.
            </p>
          </div>

          <FAQTemplate
            title="SQL Injection &amp; Prepared Statements Defense FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
