import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – MySQL 8.0 Roles: Creating Roles, Granting Privileges to Roles, Assigning Roles to Users, Activating Default Roles
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive RBAC role workbench: mastering the 4-step role lifecycle, configuring automatic default role activation, building multi-tier role inheritance trees, and querying the mysql.role_edges graph in MySQL 8.0.
 */
const Topic8 = () => {
  // Interactive Role State
  const [selectedRolePhase, setSelectedRolePhase] = useState("phase1_role_lifecycle");

  const rolePhases = {
    phase1_role_lifecycle: {
      phaseNumber: "Phase 1: 4-Step Role Lifecycle",
      title: "1. The Complete 4-Step RBAC Lifecycle",
      badge: "RBAC Provisioning",
      badgeColor: "emerald",
      sqlSnippet: `-- 👥 THE 4-STEP ROLE LIFECYCLE IN MYSQL 8.0:

-- Step 1: Create the named Role:
CREATE ROLE 'finance_reader', 'finance_writer';

-- Step 2: Grant permissions directly to the Role:
GRANT SELECT ON kolkata_finance.* TO 'finance_reader';
GRANT SELECT, INSERT, UPDATE, DELETE ON kolkata_finance.* TO 'finance_writer';

-- Step 3: Assign the Role to individual user accounts:
GRANT 'finance_reader' TO 'mamata'@'192.168.1.%', 'susmita'@'192.168.1.%';
GRANT 'finance_writer' TO 'debangshu'@'localhost';

-- Step 4: CRITICAL - Configure Default Role (Auto-activate on login):
SET DEFAULT ROLE ALL TO 'mamata'@'192.168.1.%', 'susmita'@'192.168.1.%';`,
      explanation:
        "Roles bundle privileges into reusable security objects. Newly assigned roles are dormant/inactive upon login unless Step 4 (SET DEFAULT ROLE ALL) is executed, which ensures automatic activation whenever users connect.",
      keyTakeaways: [
        "Step 1: CREATE ROLE creates the locked account container in mysql.user.",
        "Step 2 & 3: Decouples privilege management from individual user accounts.",
        "Step 4: SET DEFAULT ROLE ALL is mandatory to prevent inactive role authorization failures."
      ]
    },
    phase2_session_switching: {
      phaseNumber: "Phase 2: Runtime Session Control",
      title: "2. Dynamic Role Activation & Session Switching",
      badge: "Session Context",
      badgeColor: "cyan",
      sqlSnippet: `-- 🔄 DYNAMIC SESSION ROLE MANAGEMENT:

-- 1. Check currently active roles in session:
SELECT CURRENT_ROLE();

-- 2. Activate all assigned roles:
SET ROLE ALL;

-- 3. Switch to a specific restricted role (e.g. read-only auditing):
SET ROLE 'finance_reader';

-- 4. Temporarily drop all role privileges (revert to baseline USAGE):
SET ROLE NONE;

-- 5. Server-wide auto-activation configuration:
SET PERSIST activate_all_roles_on_login = ON;`,
      explanation:
        "Users can dynamically switch their active security contexts using SET ROLE statements. Setting activate_all_roles_on_login = ON eliminates the need for manual role activation server-wide.",
      keyTakeaways: [
        "CURRENT_ROLE() displays active roles in the current connection.",
        "SET ROLE NONE temporarily drops all role privileges for safe testing.",
        "activate_all_roles_on_login = ON ensures seamless developer experience."
      ]
    },
    phase3_inheritance_trees: {
      phaseNumber: "Phase 3: Role Inheritance Trees",
      title: "3. Multi-Tier Role Inheritance Graphs",
      badge: "Hierarchical RBAC",
      badgeColor: "purple",
      sqlSnippet: `-- 🌳 HIERARCHICAL ROLE INHERITANCE:

-- 1. Create modular role tiers:
CREATE ROLE 'intern_role', 'developer_role', 'lead_architect_role';

-- 2. Base tier: Read-only access:
GRANT SELECT ON app_db.* TO 'intern_role';

-- 3. Developer tier: Inherits intern privileges + write access:
GRANT 'intern_role' TO 'developer_role';
GRANT INSERT, UPDATE ON app_db.* TO 'developer_role';

-- 4. Lead Architect tier: Inherits developer privileges + DDL authority:
GRANT 'developer_role' TO 'lead_architect_role';
GRANT CREATE, DROP, ALTER ON app_db.* TO 'lead_architect_role';`,
      explanation:
        "Roles can be granted to other roles to create nested inheritance trees. Updating permissions on a base role automatically cascades up to all parent roles and assigned users throughout the organization.",
      keyTakeaways: [
        "Roles can inherit privileges from sub-roles via GRANT 'sub_role' TO 'parent_role'.",
        "Modifying base roles immediately updates all inheriting composite roles.",
        "Enforces strict separation of duties (SoD) across engineering teams."
      ]
    },
    phase4_role_graph_audit: {
      phaseNumber: "Phase 4: Auditing Role Graphs",
      title: "4. Auditing Role Edges & Graph Structures",
      badge: "Data Dictionary RBAC",
      badgeColor: "rose",
      sqlSnippet: `-- 📊 AUDITING RBAC DATA DICTIONARY TABLES:

-- 1. Inspect all role-to-user assignment edges:
SELECT FROM_USER AS Role_Name, TO_USER AS Assigned_User, WITH_ADMIN_OPTION 
FROM mysql.role_edges 
ORDER BY Role_Name;

-- 2. Inspect default auto-activated roles:
SELECT USER, HOST, DEFAULT_ROLE_USER, DEFAULT_ROLE_HOST 
FROM mysql.default_roles;

-- 3. Export XML GraphML visualization of the role graph:
SELECT ROLES_GRAPHML();`,
      explanation:
        "MySQL 8.0 models role assignments as a directed graph in mysql.role_edges. The ROLES_GRAPHML() function exports the entire enterprise privilege network in standard XML format for security auditing.",
      keyTakeaways: [
        "mysql.role_edges tracks directed role assignment graph edges.",
        "mysql.default_roles stores automatic login activation bindings.",
        "ROLES_GRAPHML() outputs role hierarchies for visualization in graph tools."
      ]
    }
  };

  const currentPhase = rolePhases[selectedRolePhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.3: User Security &amp; Privilege Management
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 8 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          MySQL 8.0 Roles: <span className="text-emerald-400">Creating</span>, <span className="text-cyan-400">Granting</span>, <span className="text-purple-400">Assigning</span> &amp; Default Activation
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Comprehensive guide to Role-Based Access Control (RBAC) in MySQL 8.0: mastering the 4-step role lifecycle, eliminating dormant role traps with <code>SET DEFAULT ROLE ALL</code>, constructing hierarchical role inheritance graphs, and querying <code>mysql.role_edges</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: The 4-Step Lifecycle Overview ───────────────── */}
        <section id="lifecycle-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 4-Step RBAC Role Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL 8.0 decouples privileges from accounts to eliminate permission duplication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Step 1</span>
              <h3 className="font-bold text-white text-base">CREATE ROLE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Creates the role object in <code>mysql.user</code> with <code>account_locked = 'Y'</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Step 2</span>
              <h3 className="font-bold text-white text-base">GRANT to Role</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assigns object or dynamic privileges directly to the named role container.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Step 3</span>
              <h3 className="font-bold text-purple-300 text-base">GRANT Role to User</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Binds the role to target user accounts, creating directed edges in <code>mysql.role_edges</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Step 4</span>
              <h3 className="font-bold text-rose-300 text-base">SET DEFAULT ROLE</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Ensures assigned roles activate automatically on login, avoiding dormant role errors.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive RBAC Role Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe SQL statements for role provisioning, session switching, inheritance, and auditing.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(rolePhases).map((phaseKey) => {
              const phase = rolePhases[phaseKey];
              const isSelected = selectedRolePhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedRolePhase(phaseKey)}
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
                SQL DDL Implementation:
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
              RBAC case studies in Barrackpore and Kolkata demonstrating fleet-wide cashier role management and multi-tier banking hierarchies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Managing 20 Store Cashiers in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Privilege Drift
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, managing permissions across 20 retail store cashiers previously required executing 60 individual GRANT statements whenever new tables were added. Mamata created a single <code>barrackpore_cashier</code> role, granted POS privileges to the role, and assigned it to all cashiers with <code>SET DEFAULT ROLE ALL</code>. When adding a new discounts table, a single GRANT to the role updated all 20 cashiers instantly.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 3-Tier Banking Role Hierarchy in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  ₹100 Crore Ledger Protection
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing 150 financial engineers across ₹100 Crore transaction ledgers required strict role tiers. Debangshu structured a 3-tier hierarchy: <code>junior_analyst</code> (read-only) granted to <code>senior_analyst</code> (inherits read + execute procedures), which was granted to <code>lead_fintech_dba</code> (inherits all + DDL). Modifying the base audit schema automatically propagated across all 150 engineers without a single manual account edit.
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
              Avoid dormant role traps and permission inheritance bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Forgetting SET DEFAULT ROLE ALL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Assigning a role without setting it as the default leaves the role inactive upon connection, causing confusing "command denied" errors for end users.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always run SET DEFAULT ROLE ALL TO user or enable activate_all_roles_on_login.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Assigning Roles Directly to Unauthenticated Entities
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Roles are locked accounts (<code>account_locked='Y'</code>) and cannot establish TCP connections. Attempting to connect as a role directly will always fail.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always connect using standard user credentials and inherit role capabilities.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Structure Roles by Job Function
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Define roles named after organizational responsibilities (e.g. <code>billing_reader</code>, <code>pos_cashier</code>, <code>report_generator</code>) rather than individual names.
              </p>
              <div className="text-xs text-slate-400">
                Aligns database access directly with enterprise organizational charts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Leverage ROLE_ADMIN for Delegation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Grant the <code>ROLE_ADMIN</code> dynamic privilege to security leads so they can manage RBAC assignments without needing root <code>SUPER</code> or database <code>SELECT</code> rights.
              </p>
              <div className="text-xs text-slate-400">
                Enforces clean separation of duties between security officers and DBAs.
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
            title="Topic 8: MySQL 8.0 Roles – Creating Roles, Granting Privileges to Roles, Assigning Roles to Users, Activating Default Roles"
            content={noteText}
          />

          <Teacher
            note="Roles in MySQL 8.0 represent a massive leap forward in database administration. Remember the golden 4-step workflow: CREATE ROLE -> GRANT privileges TO role &rarr; GRANT role TO user -&gt; SET DEFAULT ROLE ALL TO user! If your users report access denied despite being assigned a role, 99% of the time they forgot step 4 or activate_all_roles_on_login is OFF!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of MySQL 8.0 RBAC roles, default activation, and inheritance graphs.
            </p>
          </div>

          <FAQTemplate
            title="MySQL 8.0 RBAC Roles FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
