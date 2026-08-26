import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgKillChainId = useId();

  // Studio 1: Active Kill Chain Phase / Impact Vector Selection
  const [selectedImpactKey, setSelectedImpactKey] = useState("auth_bypass_escalation");

  // Studio 2: Live Blast Radius Index (BRI) & Host Takeover Simulator State
  const [killChainPhase, setKillChainPhase] = useState("phase4_host_rce"); // phase1_auth, phase2_data_dump, phase3_tampering, phase4_host_rce, phase5_domain_pivot
  const [databaseEngine, setDatabaseEngine] = useState("mssql"); // mssql, mysql, postgresql, oracle
  const [userPrivilegeLevel, setUserPrivilegeLevel] = useState("sa_root"); // webapp_limited, db_owner, sa_root
  const [leastPrivilegeActive, setLeastPrivilegeActive] = useState(false); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_takeover_defense");

  // Studio 4: Anti-Takeover Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("apparmor_mysql_sandbox");

  // 8 SQLi Impact & Kill-Chain Vectors for Studio 1
  const impactDatabase = {
    auth_bypass_escalation: {
      key: "auth_bypass_escalation",
      name: "1. Authentication Bypass & Privilege Escalation",
      category: "PHASE 1: INITIAL ENTRY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetImpact: "Bypasses login gates, impersonating administrators or elevating roles.",
      vulnerabilityMechanism:
        "Using tautologies (`' OR 1=1--`) or modifying profile update queries (`', role='ADMIN'--`) to seize full administrative session privileges without knowing credentials.",
      mitigationPattern: "100% Parameterized Prepared Statements and server-side role verification.",
      typicalPayload: "admin' OR 1=1--",
      codeSnippet: `// Authentication Bypass:
// Injected User: admin'-- | Result: Logs in as Super Administrator (User ID 1)!`
    },
    massive_data_exfiltration: {
      key: "massive_data_exfiltration",
      name: "2. Massive Data Theft & Secret Exfiltration",
      category: "PHASE 2: CONFIDENTIALITY BREACH",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetImpact: "Dumping entire databases (credit cards, passwords, medical records).",
      vulnerabilityMechanism:
        "Executing multi-column `UNION SELECT` or automated Out-of-Band DNS queries to systematically exfiltrate millions of confidential citizen records.",
      mitigationPattern: "Prepared statements and database column-level encryption (AES-256).",
      typicalPayload: "' UNION SELECT 1, GROUP_CONCAT(username, ':', password), 3 FROM users--",
      codeSnippet: `// Mass Data Extraction:
// Entire customer table dumped in a single response via GROUP_CONCAT()!`
    },
    financial_balance_tampering: {
      key: "financial_balance_tampering",
      name: "3. Financial Balance Tampering & Fraud",
      category: "PHASE 3: INTEGRITY CORRUPTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetImpact: "Direct financial siphoning and ledger balance alteration.",
      vulnerabilityMechanism:
        "Injecting DML `UPDATE` statements into transaction endpoints (`UPDATE accounts SET balance = balance + 5000000`), executing fraudulent funds transfers.",
      mitigationPattern: "Parameterized queries, dual-authorization workflows, and immutable audit logs.",
      typicalPayload: "105; UPDATE accounts SET balance = balance + 5000000 WHERE id = 99;--",
      codeSnippet: `// Financial Balance Overwrite:
// Injected UPDATE alters bank ledger balances before RTGS transfer!`
    },
    table_deletion_dos: {
      key: "table_deletion_dos",
      name: "4. Permanent Table Deletion & Service DoS",
      category: "PHASE 3: AVAILABILITY DESTRUCTION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetImpact: "Total business disruption through data destruction or CPU lockup.",
      vulnerabilityMechanism:
        "Executing destructive DDL statements (`DROP TABLE`, `TRUNCATE`) or injecting `SHUTDOWN WITH NOWAIT` to permanently delete databases and crash production services.",
      mitigationPattern: "Revoking DDL privileges from application database users.",
      typicalPayload: "105; DROP TABLE accounts, transactions, audit_logs;--",
      codeSnippet: `// Permanent Data Destruction:
// Injected DROP TABLE drops core database tables, causing immediate service outage!`
    },
    mssql_xp_cmdshell_rce: {
      key: "mssql_xp_cmdshell_rce",
      name: "5. MSSQL xp_cmdshell Host OS Takeover",
      category: "PHASE 4: REMOTE CODE EXECUTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetImpact: "Full interactive terminal shell on the underlying Windows OS.",
      vulnerabilityMechanism:
        "Enabling and invoking `master..xp_cmdshell` to spawn `cmd.exe` directly on the server, creating administrative Windows accounts or downloading payloads.",
      mitigationPattern: "Disable `xp_cmdshell` in `sp_configure` and revoke execute rights from `PUBLIC`.",
      typicalPayload: "'; EXEC master..xp_cmdshell 'whoami && net localgroup Administrators';--",
      codeSnippet: `// Host Command Execution:
// Spawns Windows command shell with SQL Server service account privileges!`
    },
    mysql_into_outfile_webshell: {
      key: "mysql_into_outfile_webshell",
      name: "6. MySQL INTO OUTFILE Arbitrary File Write",
      category: "PHASE 4: UNAUTHORIZED FILE EXPORT",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetImpact: "Writing unauthorized files to web server document directories.",
      vulnerabilityMechanism:
        "Using `SELECT ... INTO OUTFILE '/var/www/html/demo_test.txt'` to perform unauthorized file creation on the host filesystem.",
      mitigationPattern: "Set `secure_file_priv` to a non-web directory and revoke `FILE` privilege.",
      typicalPayload: "' UNION SELECT [UNTRUSTED_CONTENT] INTO OUTFILE '/var/www/html/demo_test.txt'--",
      codeSnippet: `// Unauthorized File Export Mitigation:
// Setting secure_file_priv restricts INTO OUTFILE to safe staging directories!`
    },
    mimikatz_lateral_movement: {
      key: "mimikatz_lateral_movement",
      name: "7. Lateral Movement & Domain Controller Takeover",
      category: "PHASE 5: ENTERPRISE ACTIVE DIRECTORY COMPROMISE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetImpact: "Pivoting across internal subnets to seize Active Directory Domain Controllers.",
      vulnerabilityMechanism:
        "After gaining host RCE via `xp_cmdshell`, attackers dump LSASS memory using Mimikatz, extracting Domain Admin Kerberos tickets and pivoting to enterprise servers.",
      mitigationPattern: "Run database as unprivileged service account; isolate database subnets.",
      typicalPayload: "'; EXEC master..xp_cmdshell 'whoami';--",
      codeSnippet: `// Domain Takeover Pivot:
// Extracts Domain Admin credentials from LSASS memory, compromising Domain Controller!`
    },
    audit_log_wiping_antiforensics: {
      key: "audit_log_wiping_antiforensics",
      name: "8. Anti-Forensic Audit Log Wiping",
      category: "FORENSIC EVASION & TRACK COVERING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetImpact: "Erasing security audit logs to blind SOC investigators.",
      vulnerabilityMechanism:
        "Executing `DELETE FROM audit_logs WHERE created_at &ge; ...` via SQLi, destroying all forensic digital footprints before disconnecting.",
      mitigationPattern: "Stream security logs in real time to immutable, remote write-once SIEM clusters.",
      typicalPayload: "'; DELETE FROM audit_events WHERE ip_address = '103.25.10.1';--",
      codeSnippet: `// Forensic Log Deletion:
// Injected DELETE wipes local database audit tables, hindering forensic investigation!`
    }
  };

  const activeImpact = impactDatabase[selectedImpactKey];

  // Studio 2: Live Blast Radius Index (BRI) & Host Takeover Simulator Calculations
  const simulationResults = useMemo(() => {
    let briScore = 100.0;
    let baseCvss = 9.8;
    let rceAchieved = false;
    let domainCompromised = false;
    let simulatedShellOutput = "";

    if (leastPrivilegeActive) {
      briScore = 15.0;
      baseCvss = 3.5;
      rceAchieved = false;
      domainCompromised = false;
      simulatedShellOutput = `[SECURITY RESTRICTION] Execution Blocked: User 'webapp_user' does NOT possess EXECUTE privileges on xp_cmdshell / INTO OUTFILE. (Blast Radius Contained!)`;
    } else {
      if (killChainPhase === "phase1_auth") {
        briScore = 40.0;
        baseCvss = 7.5;
        simulatedShellOutput = `[AUTH BYPASS] Session Authenticated: Role 'SUPER_ADMIN' (User ID: 1, Username: 'admin'). Access to administrative dashboard granted.`;
      } else if (killChainPhase === "phase2_data_dump") {
        briScore = 70.0;
        baseCvss = 8.5;
        simulatedShellOutput = `[DATA EXFILTRATION] Table 'citizen_identities' Dumped: 1,450,000 Records Extracted. Hashes & PAN numbers captured.`;
      } else if (killChainPhase === "phase3_tampering") {
        briScore = 85.0;
        baseCvss = 9.1;
        simulatedShellOutput = `[DATA TAMPERING] Executed: UPDATE bank_accounts SET balance = 50000000 WHERE id = 99; Rows Affected: 1. Ledger manipulated.`;
      } else if (killChainPhase === "phase4_host_rce") {
        briScore = 95.0;
        baseCvss = 9.8;
        rceAchieved = true;
        simulatedShellOutput = databaseEngine === "mssql"
          ? `C:\\Windows\\system32> whoami\nnt service\\mssqlserver\nC:\\Windows\\system32> net localgroup Administrators\nMembers: Administrator, sql_service, hacker_admin (NEW ADMIN CREATED!)`
          : `[WEB SHELL EXECUTION] uid=33(www-data) gid=33(www-data) groups=33(www-data)\nLinux kolkata-core 5.15.0-x86_64 #1 SMP GNU/Linux (INTERACTIVE SHELL SPAWNED!)`;
      } else {
        briScore = 100.0;
        baseCvss = 10.0;
        rceAchieved = true;
        domainCompromised = true;
        simulatedShellOutput = `[ACTIVE DIRECTORY TAKEOVER] Mimikatz LSASS Dump: Domain Admin 'CORP\\DomainAdmin' NTLM: 31d6cfe0d16ae931b73c59d7e0c089c0 Captured!\nConnecting to Primary Domain Controller (10.0.0.1)... DOMAIN CONTROLLER COMPROMISED!`;
      }
    }

    return {
      briScore: briScore.toFixed(1),
      baseCvss: baseCvss.toFixed(1),
      rceAchieved,
      domainCompromised,
      simulatedShellOutput,
      badgeClass: briScore >= 80
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : briScore >= 40
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: leastPrivilegeActive
        ? `LEAST PRIVILEGE SANDBOXING ACTIVE: Web application user possesses zero DDL, zero FILE, and zero xp_cmdshell execution rights; Blast Radius Index collapsed from 100.0 down to ${briScore.toFixed(1)}; Host RCE completely prevented!`
        : rceAchieved
        ? `CRITICAL ENTERPRISE HOST TAKEOVER: SQL injection escalated to Remote Code Execution (Base CVSS: ${baseCvss.toFixed(1)}, BRI: ${briScore.toFixed(1)}); Attacker seized operating system shell and compromised internal infrastructure!`
        : `DATA & INTEGRITY COMPROMISE: Attacker progressed through ${killChainPhase.toUpperCase()} (Base CVSS: ${baseCvss.toFixed(1)}, BRI: ${briScore.toFixed(1)}); Data stolen/altered without full host takeover.`
    };
  }, [killChainPhase, databaseEngine, userPrivilegeLevel, leastPrivilegeActive]);

  // Studio 4: Anti-Takeover Hardening Production Code Database
  const codeDatabase = {
    apparmor_mysql_sandbox: {
      name: "Linux AppArmor Mandatory Access Control Profile for MySQL Daemon",
      code: `# Production Linux AppArmor Profile for MySQL Daemon (/etc/apparmor.d/usr.sbin.mysqld):
# ----------------------------------------------------------------------------------
#include <tunables/global>

/usr/sbin/mysqld {
  #include <abstractions/base>
  #include <abstractions/nameservice>

  # 1. Allow Read/Write ONLY to Authorized Database Storage Directories
  /var/lib/mysql/ r,
  /var/lib/mysql/** rwk,
  /var/log/mysql/** rw,
  /run/mysqld/mysqld.pid rw,
  /run/mysqld/mysqld.sock rw,

  # 2. STRICT ANTI-RCE RESTRICTIONS:
  # Deny MySQL process from executing ANY shell binaries or network tools!
  # Even if an attacker injects UDF functions or INTO OUTFILE, execution is DENIED by kernel!
  deny /bin/bash rx,
  deny /bin/sh rx,
  deny /bin/dash rx,
  deny /usr/bin/nc rx,
  deny /usr/bin/ncat rx,
  deny /usr/bin/curl rx,
  deny /usr/bin/wget rx,
  deny /usr/bin/python* rx,

  # 3. Deny Writing to Web Server Document Roots (Defeating Web Shells)
  deny /var/www/** w,
  deny /usr/share/nginx/** w,
}`,
      explanation: "Production Linux AppArmor Mandatory Access Control (MAC) profile enforcing kernel-level sandboxing on the MySQL daemon, strictly denying the execution of terminal shells (`/bin/sh`), network tools (`curl`, `nc`), and preventing web shell file writes."
    },
    nodejs_parameterized_dml_defense: {
      name: "Node.js PostgreSQL Parameterized Prepared Statement Defeating DML/DDL Injections",
      code: `// Node.js PostgreSQL Parameterized Prepared Statement Defeating DML/DDL Injections:
const { Pool } = require('pg');
const pool = new Pool();

// Secure Controller: Update Employee Salary & Department (Defeating Balance Tampering)
exports.updateEmployeeProfile = async (req, res) => {
    const { employeeId, newSalary, department } = req.body;

    try {
        // 1. SECURE PARAMETERIZED QUERY:
        // Protocol-level parameter binding pre-compiles the query AST!
        // Injected DDL commands ('; DROP TABLE...'), semicolons, and stacked updates are treated strictly as data literals!
        const queryText = \`
            UPDATE employee_records 
            SET salary = $1, department = $2, updated_at = NOW() 
            WHERE id = $3
        \`;

        // 2. Strict Input Type Sanitization:
        const queryValues = [
            parseFloat(newSalary),
            String(department),
            parseInt(employeeId, 10)
        ];

        const result = await pool.query(queryText, queryValues);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Employee record not found." });
        }

        res.json({ status: "success", message: "Employee profile updated successfully." });
    } catch (err) {
        next(err);
    }
};`,
      explanation: "Production Node.js PostgreSQL controller utilizing positional `$1, $2, $3` parameter binding, fixing the AST structure and ensuring stacked queries or balance tampering payloads cannot be evaluated as SQL instructions."
    },
    least_privilege_mysql_user_hardening: {
      name: "MySQL Strict Least Privilege User Configuration (Revoking DDL & FILE Grants)",
      code: `# Production MySQL Database Hardening Script:
# -------------------------------------------------------------
# 1. Create Dedicated Unprivileged Application User
CREATE USER 'fintech_app'@'10.0.1.50' IDENTIFIED BY 'StrongRandomSecurePassword2026!';

# 2. Grant ONLY Required DML Privileges on Specific Application Tables
GRANT SELECT, INSERT, UPDATE ON fintech_db.merchants TO 'fintech_app'@'10.0.1.50';
GRANT SELECT, INSERT, UPDATE ON fintech_db.transactions TO 'fintech_app'@'10.0.1.50';

# 3. Explicitly REVOKE Dangerous DDL, Administrative, and File System Privileges
# This prevents DROP TABLE, TRUNCATE, SHUTDOWN, and INTO OUTFILE web shell creation!
REVOKE ALL PRIVILEGES ON *.* FROM 'fintech_app'@'10.0.1.50';
REVOKE FILE, SUPER, PROCESS, RELOAD, SHUTDOWN, CREATE, DROP, ALTER ON *.* FROM 'fintech_app'@'10.0.1.50';

# 4. Enforce secure_file_priv in my.cnf (Restricts LOAD_FILE and INTO OUTFILE to a non-web directory)
# In /etc/mysql/my.cnf:
# secure_file_priv = /var/lib/mysql-files/

FLUSH PRIVILEGES;`,
      explanation: "Production MySQL hardening script enforcing the Principle of Least Privilege, revoking all DDL, file system, and administrative privileges from application database accounts, containing the blast radius of any potential SQL injection."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_takeover_defense",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending Payment Settlement Core Against MSSQL xp_cmdshell Host Takeover",
      threatType: "REMOTE CODE EXECUTION (RCE) & ACTIVE DIRECTORY DOMAIN TAKEOVER",
      budget: "₹92,00,000",
      incident:
        "Threat actors injected `'; EXEC master..xp_cmdshell 'whoami'--` into legacy payment search endpoints attempting to verify command execution privileges on the core settlement cluster.",
      defenseStrategy:
        "Mamata disabled `xp_cmdshell` globally, revoked all extended procedure grants, and migrated 100% of payment APIs to Parameterized Prepared Statements.",
      outcome: "100% of host takeover attempts neutralized; zero command execution; ₹4,100 Crores in daily UPI and corporate settlements safeguarded.",
      metrics: {
        rceAttemptsBlocked: "100.0%",
        settlementVolumeProtected: "₹4,100 Crores",
        nodesHardened: "90 Settlement Gateways",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_webshell_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "MySQL INTO OUTFILE UNAUTHORIZED FILE EXPORT ATTEMPT",
      title: "Hardening Substation SCADA Databases Against Arbitrary File Writes",
      budget: "₹61,00,000",
      incident:
        "Adversaries attempted unauthorized file write operations (`INTO OUTFILE '/var/www/html/demo_test.txt'`) via SQLi into substation telemetry portals.",
      defenseStrategy:
        "Debangshu configured `secure_file_priv = /var/lib/mysql-files`, deployed AppArmor Linux process sandboxing, and air-gapped substation database hosts.",
      outcome: "100% of unauthorized write attempts blocked by Linux kernel; zero unauthorized switching commands; 100% regional power stability across North 24 Parganas.",
      metrics: {
        webshellUploadsBlocked: "100.0%",
        substationsProtected: "18 High-Voltage Nodes",
        unauthorizedSwitches: "0 Incidents",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_mass_deletion",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "DESTRUCTIVE DDL TABLE DELETION (DROP TABLE Threat)",
      title: "Protecting 120,000 Oncology Patient Records from Malicious Table Deletion and Corruption",
      budget: "₹46,00,000",
      incident:
        "A malicious script executed `105; DROP TABLE oncology_records, patient_chemo;--` targeting diagnostic search filters to permanently destroy patient treatment histories.",
      defenseStrategy:
        "Mahima revoked all DDL (`DROP`, `TRUNCATE`) privileges from application database accounts and enforced 100% Parameterized Prepared Statements.",
      outcome: "100% of stacked destructive queries rejected; zero patient treatment data lost; 120,000 oncology patient records fully insulated.",
      metrics: {
        ddlDeletionDropped: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_blast_radius_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF POST-EXPLOITATION BLAST RADIUS & HOST TRANSITIONS",
      title: "Formulating the Post-Exploitation Blast Radius Transition Model in IEEE Transactions",
      budget: "₹39,00,000",
      incident:
        "Researchers modeled the formal mathematical transition states from SQL injection authentication bypass to full Active Directory domain compromise.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that prepared statements drive Blast Radius Index to exactly 0.00.",
      outcome: "Published peer-reviewed mathematical proof; verified across 320,000 simulated kill-chain transition paths.",
      metrics: {
        simulationTrials: "320,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Blast Radius Index (BRI) Model",
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
                Topic 06
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Impact of SQLi: Data Theft, Authentication Bypass, and Database Takeover
            </h1>
            <p className="text-xs text-gray-400">
              5-phase kill chain, MSSQL `xp_cmdshell`, MySQL `INTO OUTFILE`, lateral movement, AppArmor sandboxing, and IT Act Section 66F.
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
              The Full Kill-Chain Impact of SQL Injection
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Escalating Impact of SQL Injection: From Authentication Bypass to Full Operating System Host Takeover
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              SQL Injection is not merely an information disclosure bug; it represents a comprehensive kill-chain vector capable 
              of escalating across 5 distinct phases of impact. In <strong>Phase 1 (Authentication Bypass)</strong>, adversaries bypass login gates 
              via `' OR 1=1--` to impersonate administrators. In <strong>Phase 2 (Mass Data Theft)</strong>, multi-column `UNION` queries exfiltrate 
              millions of citizen identity records and password hashes. In <strong>Phase 3 (Data Tampering &amp; DoS)</strong>, attackers inject 
              `UPDATE` statements to alter financial balances or `DROP TABLE` to permanently destroy data. In <strong>Phase 4 (Host OS Takeover &amp; RCE)</strong>, 
              attackers execute operating system commands via Microsoft SQL Server <strong>`xp_cmdshell`</strong>, drop PHP web shells via MySQL 
              <strong>`INTO OUTFILE`</strong>, or invoke dynamic C functions in PostgreSQL. In <strong>Phase 5 (Lateral Domain Takeover)</strong>, 
              attackers dump LSASS memory using Mimikatz, extracting Domain Admin credentials and compromising the enterprise Active Directory Domain Controller.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The 5-Phase Kill Chain Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The 5-Phase SQLi Escalation Kill Chain
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Auth Bypass ➔ Data Dump ➔ Balance Overwrite ➔ Host RCE ➔ Domain Takeover!
              </div>
              <p className="text-gray-300 leading-relaxed">
                A single un-parameterized query with elevated database privileges allows an external web visitor to seize complete administrative control of the physical server and corporate domain.
              </p>
            </div>

            {/* Least Privilege Sandboxing Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Enterprise Anti-Takeover Hardening Controls
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Principle of Least Privilege:</strong> Revoking DDL, `xp_cmdshell`, and `FILE` rights limits the blast radius.</li>
                <li>• <strong className="text-purple-300">AppArmor Linux Sandboxing:</strong> Kernel profiles strictly deny database processes from spawning `/bin/sh`.</li>
                <li>• <strong className="text-amber-300">Prepared Statements:</strong> Eliminates query mutation at the root, driving Blast Radius Index to 0.00.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Full Kill Chain Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Full Kill-Chain Escalation Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing SQLi Escalation: From Web Input to Enterprise Domain Takeover
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an un-parameterized SQL injection escalates from web login bypass to database exfiltration, host command execution, and domain takeover:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: AUTH BYPASS */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 1: AUTH
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Login Gate Bypass
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TAUTOLOGY ATTACK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  ' OR 1=1--
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Logs in as Admin!
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: DATA DUMP */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 2: DATA THEFT
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Database Exfiltration
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  UNION / OOB DNS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Dumps Users &amp; Hashes
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  1.45M Citizen Records!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: DATA TAMPERING */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 3: TAMPERING
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Ledger Modification
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DML OVERWRITE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  UPDATE Balances
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  DROP TABLE Accounts!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: HOST RCE */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 4: HOST RCE
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Operating System Shell
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  COMMAND SHELL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  xp_cmdshell / webshell
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Spawns Terminal Shell!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: DOMAIN CONTROLLER TAKEOVER */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 5: DOMAIN
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Active Directory Pivot
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  LATERAL TAKEOVER:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Mimikatz LSASS Dump
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Total Domain Control!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Impact Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. SQL Injection Impact &amp; Kill-Chain Phase Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an SQL injection impact vector below to examine its kill-chain phase, target impact, 
              vulnerability mechanics, enterprise mitigation patterns, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(impactDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedImpactKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedImpactKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  IMPACT
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeImpact.categoryBadge)}>
                    {activeImpact.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Target: {activeImpact.targetImpact}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeImpact.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeImpact.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Kill-Chain Escalation Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeImpact.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeImpact.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Exploitation &amp; Execution Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeImpact.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Blast Radius Index & Host Takeover Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Blast Radius Index (BRI) &amp; Full Host Takeover Simulator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select the Kill Chain Phase, Compromised Database Engine, Database User Privilege Level, 
              and toggle Least Privilege Sandboxing to model the Blast Radius Index (BRI), Base CVSS Score, and simulated terminal outputs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Kill-Chain Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Escalation Kill Chain Phase:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "phase1_auth", label: "Phase 1: Auth Bypass (' OR 1=1--)" },
                    { id: "phase2_data_dump", label: "Phase 2: Mass Data Dump (UNION)" },
                    { id: "phase3_tampering", label: "Phase 3: Balance Tampering (UPDATE)" },
                    { id: "phase4_host_rce", label: "Phase 4: Host OS Shell (xp_cmdshell)" },
                    { id: "phase5_domain_pivot", label: "Phase 5: Domain Controller Takeover" }
                  ].map((ph) => (
                    <button
                      key={ph.id}
                      onClick={() => setKillChainPhase(ph.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        killChainPhase === ph.id
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {ph.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Compromised Database Engine:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {["mssql", "mysql", "postgresql", "oracle"].map((eng) => (
                    <button
                      key={eng}
                      onClick={() => setDatabaseEngine(eng)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] uppercase transition-all",
                        databaseEngine === eng
                          ? "bg-purple-950 border-purple-500 text-purple-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {eng}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. DB User Privilege Level:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "webapp_limited", label: "Limited" },
                    { id: "db_owner", label: "DB Owner" },
                    { id: "sa_root", label: "sa / root" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setUserPrivilegeLevel(p.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        userPrivilegeLevel === p.id
                          ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">4. Least Privilege Sandboxing Defense:</span>
                <button
                  onClick={() => setLeastPrivilegeActive(!leastPrivilegeActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    leastPrivilegeActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                &gt;
                  {leastPrivilegeActive ? "✔ LEAST PRIVILEGE SANDBOX ACTIVE" : "UNRESTRICTED DATABASE PRIVILEGES"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics & Simulated Terminal Output */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Compromised Host Terminal Console</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-rose-400 font-mono">
                  Base CVSS: {simulationResults.baseCvss} / 10.0
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Blast Radius Index (BRI)</span>
                  <span className="text-lg font-extrabold text-cyan-400">{simulationResults.briScore} / 100.0</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Scale: Zero (0) to Total (100)</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Host / Domain Status</span>
                  <span className={clsx("text-base font-extrabold mt-1 block", simulationResults.rceAchieved ? "text-rose-400" : "text-emerald-400")}>
                    {simulationResults.domainCompromised ? "DOMAIN CONTROLLER TAKEOVER" : simulationResults.rceAchieved ? "HOST RCE ACHIEVED" : "ISOLATED APPLICATION DATA"}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Privilege: {userPrivilegeLevel.toUpperCase()}</span>
                </div>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Simulated Shell / Exploitation Output:</span>
                <pre className="p-3 bg-black/90 rounded font-mono text-xs text-amber-300 overflow-x-auto whitespace-pre-wrap border border-amber-950/60 min-h-[90px]">
                  {simulationResults.simulatedShellOutput}
                </pre>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Kill-Chain Impact Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Anti-Takeover Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              AppArmor Sandboxing &amp; Least Privilege Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Linux AppArmor Sandboxing, PostgreSQL Prepared Statements &amp; MySQL Least Privilege
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Linux kernel AppArmor Mandatory Access Control profiles, 
              Node.js parameterized queries defeating DML tampering, and MySQL user privilege revocation:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita block MSSQL `xp_cmdshell` takeover in Salt Lake, 
              neutralize MySQL `INTO OUTFILE` web shells in Barrackpore, and secure oncology records in Ichapur:
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
                  The Incident &amp; Host Takeover Threat
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
              7. Legal Penalties for SQL Injection Host Takeovers &amp; System Destruction in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection statutes 
              strictly penalize executing SQL injection to compromise servers, destroy records, or commit financial fraud with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> SQLi host takeovers of critical power/banking systems carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data extraction/damage.
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
                  <strong>Running Database as `sa` or `root`:</strong> Allows immediate `xp_cmdshell` host takeover!
                </li>
                <li>
                  <strong>Leaving `xp_cmdshell` Enabled:</strong> Grants arbitrary terminal command execution to attackers.
                </li>
                <li>
                  <strong>Leaving `secure_file_priv` Empty:</strong> Enables MySQL `INTO OUTFILE` web shell uploads.
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
                  <strong>Enforce Least Privilege DB Grants:</strong> Grant only SELECT/INSERT/UPDATE on required tables.
                </li>
                <li>
                  <strong>Deploy Linux AppArmor Profiles:</strong> Deny MySQL daemon from executing `/bin/sh` or `/usr/bin/nc`.
                </li>
                <li>
                  <strong>Deploy 100% Parameterized Prepared Statements:</strong> Pre-compiles the AST, making injection impossible.
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
                  Why does running a database process as an unprivileged service account prevent an SQLi bug from escalating to full host takeover?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does an attacker use MySQL `INTO OUTFILE` to write a persistent PHP web shell directly into the website's document root?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Least Privilege Sandboxing and observe the Blast Radius Index collapse from 100.0 to 15.0!
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
                <span>SQLi impacts span 5 phases: Auth Bypass ➔ Data Theft ➔ Data Tampering ➔ Host RCE ➔ Domain Pivot.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MSSQL `xp_cmdshell` spawns `cmd.exe` directly on the host machine from SQL queries.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MySQL `INTO OUTFILE` writes executable PHP web shells into the web server's document root.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Least privilege database accounts prevent attackers from dropping tables or executing shell commands.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AppArmor/SELinux profiles deny database processes from spawning `/bin/sh` or `/usr/bin/nc`.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes SQL injection host takeover with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Impact of SQLi FAQs"
            subtitle="30 Moderate to Expert Practice Questions & SQLi Kill-Chain Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Impact of SQLi: Data Theft, Authentication Bypass, and Database Takeover (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: SQL Injection is far more dangerous than simple data leakage; it represents a lethal full kill-chain vector that can escalate from login bypass to complete physical host and Active Directory domain takeover! Master the 5 kill-chain phases: 1. Auth Bypass (logging in as admin via `' OR 1=1--`); 2. Mass Data Exfiltration (dumping millions of citizen records); 3. Financial Balance Tampering & DoS (`UPDATE accounts`, `DROP TABLE`); 4. Host OS Takeover & RCE (MSSQL `xp_cmdshell`, MySQL `INTO OUTFILE` web shells, PostgreSQL `COPY PROGRAM`); 5. Lateral Movement (Mimikatz NetNTLM memory dumping to seize the Domain Controller). Implement defense-in-depth: 1. Deploy 100% Parameterized Prepared Statements; 2. Enforce the Principle of Least Privilege on database accounts (revoking DDL, `xp_cmdshell`, and `FILE` permissions); 3. Deploy Linux kernel AppArmor Mandatory Access Control profiles denying database daemons from executing `/bin/sh` or `/usr/bin/nc`; 4. Stream audit logs to remote write-once SIEM clusters. Remember that Section 66F of the Indian IT Act penalizes SQL injection host takeovers against critical infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database damage!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
