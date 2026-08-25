import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgOgnlId = useId();
  const svgBlindSpotId = useId();

  // Studio 1: Apache Struts OGNL Injection Simulator State
  const [selectedOgnlCommand, setSelectedOgnlCommand] = useState("whoami");
  const [wafVirtualPatchActive, setWafVirtualPatchActive] = useState(false);
  const [executedLogs, setExecutedLogs] = useState([]);

  // Studio 2: Asset Inventory & Expired SSL Certificate State
  const [sslInspectionCertStatus, setSslInspectionCertStatus] = useState("expired"); // expired, valid_renewed
  const [sbomTrackingActive, setSbomTrackingActive] = useState(false);
  const [databaseNetworkSegmentation, setDatabaseNetworkSegmentation] = useState("flat"); // flat, microsegmented

  // Studio 3: Database Tokenization & Least Privilege State
  const [dataTokenizationActive, setDataTokenizationActive] = useState(false);
  const [webDbPrivilegeLevel, setWebDbPrivilegeLevel] = useState("dba_admin"); // dba_admin, least_privilege

  // Studio 4: Regional Credit Bureau Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("credit_vulnerabilities");

  // Sample OGNL Commands for Studio 1
  const ognlCommandPool = {
    whoami: {
      cmd: "whoami",
      description: "Reconnaissance: Identify web server operating system context",
      rawOutput: "tomcat-user / uid=1001(tomcat) gid=1001(tomcat) groups=1001(tomcat)",
      severity: "LOW (Recon)"
    },
    uname_a: {
      cmd: "uname -a",
      description: "System Fingerprinting: Linux kernel version & architecture",
      rawOutput: "Linux dispute-app-01 3.10.0-514.el7.x86_64 #1 SMP Fri Nov 22 2016 x86_64 GNU/Linux",
      severity: "LOW (Fingerprint)"
    },
    dump_db_config: {
      cmd: "cat /opt/acis/config/database.properties",
      description: "Credential Theft: Read unencrypted database connection strings",
      rawOutput: "db.master.url=jdbc:oracle:thin:@10.20.1.100:1521:CRDB\ndb.master.user=admin_master\ndb.master.pass=MasterSecretPass#2017!\ndb.tables=CONSUMER_PII,CREDIT_ACCOUNTS,SSN_VAULT",
      severity: "CRITICAL (Credential Exposure)"
    },
    drop_jsp_shell: {
      cmd: "echo 'HEALTH_CHECK_ACTIVE_OK' > /opt/acis/webapps/ROOT/health_probe.txt",
      description: "Persistence: Deploy persistent test probe endpoint",
      rawOutput: "File written successfully: /opt/acis/webapps/ROOT/health_probe.txt -> Probe file ACTIVE at https://dispute.equifax.com/health_probe.txt",
      severity: "HIGH (Unauthorized File Creation)"
    }
  };

  // Studio 1: Trigger Simulated OGNL HTTP Request
  const handleExecuteOgnl = () => {
    const selected = ognlCommandPool[selectedOgnlCommand];
    const timestamp = new Date().toLocaleTimeString();

    if (wafVirtualPatchActive) {
      setExecutedLogs((prev) => [
        {
          id: Date.now(),
          time: timestamp,
          command: selected.cmd,
          result: "BLOCKED BY WAF: HTTP 403 Forbidden. Malformed Content-Type header with OGNL syntax dropped at edge!",
          statusColor: "text-emerald-400 font-bold",
          blocked: true
        },
        ...prev.slice(0, 4)
      ]);
    } else {
      setExecutedLogs((prev) => [
        {
          id: Date.now(),
          time: timestamp,
          command: selected.cmd,
          result: selected.rawOutput,
          statusColor: "text-rose-400 font-mono text-xs",
          blocked: false
        },
        ...prev.slice(0, 4)
      ]);
    }
  };

  // Studio 2 Calculation: Dwell Time & Detection Analysis
  const detectionMetrics = useMemo(() => {
    let dwellTimeDays = 0;
    let exfiltrationStatus = "";
    let idsVisibility = "";
    let visibilityColor = "";

    if (sslInspectionCertStatus === "expired") {
      dwellTimeDays = 76; // Exactly Equifax 2017!
      idsVisibility = "BLINDED (Certificate Expired 10 Months Ago)";
      visibilityColor = "text-rose-400 font-extrabold";
      exfiltrationStatus = "UNCHECKED: Attackers executed 9,000 SQL queries across 48 databases and exfiltrated 147M SSNs over encrypted HTTPS without IDS inspection!";
    } else {
      dwellTimeDays = 0.5;
      idsVisibility = "DECRYPTING & INSPECTING (Valid Certificate)";
      visibilityColor = "text-emerald-400 font-bold";
      exfiltrationStatus = "DETECTED: Network IDS decrypted HTTPS payload, recognized anomalous SQL data flow, and dispatched critical alert to SOC in 30 minutes!";
    }

    return {
      dwellTimeDays,
      idsVisibility,
      visibilityColor,
      exfiltrationStatus
    };
  }, [sslInspectionCertStatus]);

  // Studio 3 Calculation: Data Exposure Risk
  const exposureRisk = useMemo(() => {
    let compromisedRecords = 0;
    let breachVerdict = "";

    if (webDbPrivilegeLevel === "dba_admin" && databaseNetworkSegmentation === "flat") {
      compromisedRecords = 147000000;
      breachVerdict = "TOTAL CATASTROPHE: Web server held master credentials and flat network routing into all 48 core credit databases (147M SSNs stolen).";
    } else if (webDbPrivilegeLevel === "dba_admin" && databaseNetworkSegmentation === "microsegmented") {
      compromisedRecords = 250000;
      breachVerdict = "PARTIAL CONTAINMENT: Database firewall blocked web server from reaching core SSN tables, but dispute database was breached.";
    } else if (webDbPrivilegeLevel === "least_privilege" && dataTokenizationActive) {
      compromisedRecords = 0;
      breachVerdict = "ZERO CLEAR-TEXT EXPOSURE: Least privilege prevented cross-table access, and tokenization rendered stolen records useless (surrogate tokens only).";
    } else {
      compromisedRecords = 50000;
      breachVerdict = "CONTAINED: Least privilege restricted breach strictly to dispute records.";
    }

    return {
      compromisedRecords: compromisedRecords.toLocaleString(),
      breachVerdict
    };
  }, [webDbPrivilegeLevel, databaseNetworkSegmentation, dataTokenizationActive]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-400/30 text-red-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 6</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Case Study 6: Equifax Data Breach (2017) — Unpatched Apache Struts Flaw
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Forensic analysis into the monumental identity theft breach: How an uninventoried Apache Struts flaw (CVE-2017-5638), an expired SSL inspection certificate, and flat database access exposed 147 million citizens' Social Security numbers, resulting in over ₹5,800 Crores in fines.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">CVE-2017-5638 OGNL Injection</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Expired SSL Inspection Blind Spot</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Software Bill of Materials (SBOM)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">147M PII Dossiers Compromised</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL OGNL INJECTION & SSL BLIND SPOT INFOGRAPHIC */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">01.</span> Anatomy of the Equifax Compromise & Monitoring Failure
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing how an unpatched web vulnerability bypassed an expired SSL inspection sensor into 48 relational databases.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
              CVE-2017-5638 Ingress
            </span>
          </div>

          {/* SVG INFOGRAPHIC: Equifax Attack & Blind Spot Flow */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              End-to-End Kill Chain: From Malformed Content-Type Header to 147M SSN Exfiltration
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgOgnlId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Step 1: PLA Attack Ingress */}
                <rect x="20" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="100" y="50" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">1. OGNL EXPLOIT</text>
                <text x="100" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Chinese PLA Unit 54</text>
                <text x="100" y="100" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">CVE-2017-5638</text>
                <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Crafted `Content-Type`</text>
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">header with OGNL</text>
                <rect x="35" y="150" width="130" height="26" rx="6" fill="#881337" />
                <text x="100" y="167" textAnchor="middle" fill="#ffe4e6" fontSize="9" fontWeight="bold">Remote Code Execution</text>

                {/* Arrow 1 */}
                <line x1="180" y1="110" x2="210" y2="110" stroke="#f43f5e" strokeWidth="3" />

                {/* Step 2: Expired SSL Sensor */}
                <rect x="210" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="290" y="50" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">2. SSL BLIND SPOT</text>
                <text x="290" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Network IDS Sensor</text>
                <text x="290" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">EXPIRED 10 MONTHS!</text>
                <text x="290" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Could not decrypt HTTPS</text>
                <text x="290" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">traffic for 76 days</text>
                <rect x="225" y="150" width="130" height="26" rx="6" fill="#78350f" />
                <text x="290" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Silent Packet Bypass</text>

                {/* Arrow 2 */}
                <line x1="370" y1="110" x2="400" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Step 3: Unpatched Dispute Portal */}
                <rect x="400" y="25" width="160" height="175" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="480" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontWeight="bold">3. DISPUTE SERVER</text>
                <text x="480" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Online Portal (ACIS)</text>
                <text x="480" y="100" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">No Asset Inventory!</text>
                <text x="480" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">IT unaware Struts ran here</text>
                <text x="480" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">JSP web shells uploaded</text>
                <rect x="415" y="150" width="130" height="26" rx="6" fill="#581c87" />
                <text x="480" y="167" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">Persistent Web Shells</text>

                {/* Arrow 3 */}
                <line x1="560" y1="110" x2="590" y2="110" stroke="#8b5cf6" strokeWidth="3" />

                {/* Step 4: 48 Relational Databases */}
                <rect x="590" y="25" width="150" height="175" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="665" y="50" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">4. 48 DATABASES</text>
                <text x="665" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Flat Internal Network</text>
                <text x="665" y="100" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Plaintext Master Pass</text>
                <text x="665" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">9,000 slow SQL queries</text>
                <text x="665" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">harvested 147M SSNs</text>
                <rect x="600" y="150" width="130" height="26" rx="6" fill="#7f1d1d" />
                <text x="665" y="167" textAnchor="middle" fill="#fee2e2" fontSize="9" fontWeight="bold">Global DB Access</text>

                {/* Arrow 4 */}
                <line x1="740" y1="110" x2="765" y2="110" stroke="#ef4444" strokeWidth="3" />

                {/* Step 5: Exfiltration & Settlement */}
                <rect x="765" y="25" width="120" height="175" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="825" y="50" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">5. FALLOUT</text>
                <text x="825" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Over 76 Days</text>
                <text x="825" y="100" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">147M Dossiers</text>
                <text x="825" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Exfiltrated overseas</text>
                <text x="825" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">CEO/CIO/CISO resigned</text>
                <rect x="772" y="150" width="105" height="26" rx="6" fill="#1e3a8a" />
                <text x="825" y="167" textAnchor="middle" fill="#dbeafe" fontSize="9" fontWeight="bold">₹5,800 Cr Fine</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE APACHE STRUTS OGNL INJECTION & WEB SHELL SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">02.</span> Studio 1: Apache Struts OGNL Injection & Web Shell Execution Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate sending malformed Content-Type headers containing OGNL commands against an unpatched Apache Struts web server, and test WAF virtual patch blocking.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono self-start sm:self-auto">
              OGNL Exploit Lab
            </span>
          </div>

          {/* Action Configuration Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-300 block">Select Injected OGNL Payload Command:</label>
              <select
                value={selectedOgnlCommand}
                onChange={(e) => setSelectedOgnlCommand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                {Object.entries(ognlCommandPool).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.cmd} — {v.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Edge WAF Virtual Patch</div>
                <div className="text-[10px] text-gray-400">Drops OGNL syntax in Content-Type</div>
              </div>
              <button
                onClick={() => setWafVirtualPatchActive(!wafVirtualPatchActive)}
                className={clsx(
                  "px-3 py-1.5 rounded text-xs font-bold transition-all",
                  wafVirtualPatchActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                )}
              >
                {wafVirtualPatchActive ? "WAF ACTIVE" : "WAF OFF"}
              </button>
            </div>
          </div>

          {/* Trigger Request Button */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-gray-400">
              Target Endpoint: <span className="font-mono text-white">https://dispute.equifax.com/acis/upload.action</span>
            </span>
            <button
              onClick={handleExecuteOgnl}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-red-950/50 flex items-center gap-2"
            >
              🚀 Send Malicious HTTP Multipart POST
            </button>
          </div>

          {/* Live Execution Output Console */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Web Server Response Console (`/var/log/httpd/access_log`):
            </h4>
            <div className="bg-black/70 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs max-h-60 overflow-y-auto">
              {executedLogs.length === 0 ? (
                <div className="text-gray-500 text-center py-6">
                  [Awaiting HTTP Request...] Click "Send Malicious HTTP Multipart POST" above to trigger OGNL evaluation.
                </div>
              ) : (
                executedLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">[{log.time}] Injected OGNL Command: <span className="text-amber-300 font-bold">{log.command}</span></span>
                      <span className={log.blocked ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                        {log.blocked ? "BLOCKED BY WAF" : "RCE SUCCESSFUL"}
                      </span>
                    </div>
                    <pre className={clsx("p-2 rounded bg-slate-900 overflow-x-auto whitespace-pre-wrap", log.statusColor)}>
                      {log.result}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* STUDIO 2: ASSET INVENTORY & EXPIRED SSL CERTIFICATE BLIND SPOT ANALYZER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">03.</span> Studio 2: Asset Inventory Blind Spot & Expired SSL Inspection Analyzer
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Analyze why an expired SSL inspection certificate blinded Equifax's intrusion detection sensors for 76 days, and test how automated SBOM tracking eliminates asset blind spots.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              Visibility Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Monitoring & Asset Governance Configuration
              </h3>

              {/* SSL Certificate Status */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Network IDS SSL Decryption Certificate Status:</label>
                <select
                  value={sslInspectionCertStatus}
                  onChange={(e) => setSslInspectionCertStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="expired">1. Expired Certificate (Equifax 2017 — Expired 10 Months Ago)</option>
                  <option value="valid_renewed">2. Active & Valid Certificate (Continuous HTTPS Decryption)</option>
                </select>
              </div>

              {/* SBOM Tracking Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Software Bill of Materials (SBOM) Indexing</div>
                  <div className="text-[11px] text-gray-400">Automatically tracks `struts2-core.jar` across all public web apps</div>
                </div>
                <button
                  onClick={() => setSbomTrackingActive(!sbomTrackingActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    sbomTrackingActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {sbomTrackingActive ? "SBOM ACTIVE" : "NO INVENTORY"}
                </button>
              </div>
            </div>

            {/* Calculated Dwell Time & Visibility Analysis */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Intrusion Visibility & Dwell Time Assessment
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Adversary Dwell Time Inside Network:</span>
                    <span className={clsx("font-mono font-bold text-base", detectionMetrics.dwellTimeDays > 1 ? "text-rose-400" : "text-emerald-400")}>
                      {detectionMetrics.dwellTimeDays >= 1 ? `${detectionMetrics.dwellTimeDays} Days` : "< 1 Hour"}
                    </span>
                  </div>

                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Network IDS HTTPS Decryption:</span>
                    <span className={detectionMetrics.visibilityColor}>{detectionMetrics.idsVisibility}</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Forensic Surveillance Finding:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{detectionMetrics.exfiltrationStatus}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-amber-300">
                  Key Takeaway on Certificate Management:
                </span>
                <p>
                  "Encryption protects user privacy on the public Internet, but inside enterprise perimeters, network inspection sensors require active SSL inspection certificates to detect encrypted C2 tunnels and data exfiltration."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 3: WEB-TO-DATABASE LEAST PRIVILEGE & TOKENIZATION LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">04.</span> Studio 3: Web-to-Database Least Privilege & Data Tokenization Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Configure database access permissions and test how Data Tokenization renders stolen database records completely useless to foreign intelligence adversaries.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Data Vault Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Defensive Toggles */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Database Architecture & Cryptographic Controls
              </h3>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Web Server Database Account Privileges:</label>
                <select
                  value={webDbPrivilegeLevel}
                  onChange={(e) => setWebDbPrivilegeLevel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="dba_admin">1. Insecure Global Admin (Equifax 2017 — Can Query All 48 Databases)</option>
                  <option value="least_privilege">2. Strict Least Privilege (Can ONLY Query Dispute Tables)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Database Network Segmentation:</label>
                <select
                  value={databaseNetworkSegmentation}
                  onChange={(e) => setDatabaseNetworkSegmentation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="flat">1. Insecure Flat Network (Direct Routing from Web to Core Databases)</option>
                  <option value="microsegmented">2. Zero Trust Micro-segmentation (Database Firewalls Active)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">National ID / SSN Data Tokenization</div>
                  <div className="text-[11px] text-gray-400">Replaces cleartext SSNs with surrogate tokens at rest</div>
                </div>
                <button
                  onClick={() => setDataTokenizationActive(!dataTokenizationActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    dataTokenizationActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {dataTokenizationActive ? "TOKENIZED" : "CLEARTEXT SSNs"}
                </button>
              </div>
            </div>

            {/* Live Data Exposure Assessment */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Consumer Data Exposure Assessment
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Consumer Dossiers Stolen:</span>
                    <span className={clsx("font-mono font-bold text-base", exposureRisk.compromisedRecords === "0" ? "text-emerald-400" : "text-rose-400")}>
                      {exposureRisk.compromisedRecords}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Adversary Data Exfiltration Verdict:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{exposureRisk.breachVerdict}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-xs text-purple-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-purple-300">
                  Golden Rule of Database Security:
                </span>
                <p>
                  "A public-facing web server should never hold credentials to global master databases. Enforcing Least Privilege and Data Tokenization ensures that a compromised web server only yields useless surrogate tokens."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL CREDIT BUREAU & FINANCIAL PORTAL TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-400">05.</span> Studio 4: Regional Credit Rating Agency & Dispute Portal Tabletop
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative financial security audit: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional credit information bureau across Barrackpore, Kolkata, Ichapur, and Jadavpur.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional Finance Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-red-950 text-red-300 border border-red-800 px-3 py-1 rounded-full font-medium">
                Lead Financial Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (AppSec & OGNL Specialist)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (Network Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Tokenization Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("credit_vulnerabilities")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "credit_vulnerabilities"
                    ? "bg-red-500/20 text-red-300 border border-red-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Credit Bureau Findings (Kolkata & Barrackpore)
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("dpdp_compliance")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "dpdp_compliance"
                    ? "bg-red-500/20 text-red-300 border border-red-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed Defense & DPDP Act 2023 Compliance
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "credit_vulnerabilities" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Kolkata Financial Systems:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Untracked Open-Source Java Dependencies:</span> The online consumer dispute portal in Jadavpur used legacy Java packages with unmonitored nested `.jar` libraries.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Expired SSL Decryption Certificate:</span> The perimeter intrusion detection sensor's SSL certificate had expired 5 months prior, blinding the SOC to encrypted HTTPS payloads.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Plaintext PAN/Aadhaar Storage:</span> Citizen national identification numbers were stored in plaintext inside the core dispute database without tokenization.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Executed by Susmita, Debangshu & Mahima (DPDP 2023 Standards):</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Automated CI/CD SBOM Scanning:</span> Deployed Snyk and Dependency-Check to automatically block builds containing Critical CVEs with a mandatory 24-hour patch SLA.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Certificate Lifecycle Management (CLM):</span> Integrated Venafi automated certificate renewal to guarantee 100% continuous SSL inspection visibility.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Hardware Tokenization Vault:</span> Replaced all cleartext citizen IDs with surrogate tokens, isolating master records in a FIPS 140-2 Level 3 hardware security module (HSM).
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <FAQTemplate
            title="Equifax Data Breach (2017) — Unpatched Apache Struts Flaw FAQs"
            subtitle="30 In-depth Practice Questions & Forensic Case Analysis Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Equifax Data Breach (2017) — Unpatched Apache Struts Flaw (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic6;
