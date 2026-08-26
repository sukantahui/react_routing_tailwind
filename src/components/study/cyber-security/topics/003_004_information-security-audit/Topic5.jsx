import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: Active Technical Pillar State
  const [selectedPillarKey, setSelectedPillarKey] = useState("pillar_log_review");

  // Studio 2: Active Technical Probe State
  const [selectedProbeKey, setSelectedProbeKey] = useState("probe_cis_ssh");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_k8s_cis_audit");

  // Studio 1: Tri-Pillar Technical Audit Data
  const technicalPillars = {
    pillar_log_review: {
      key: "pillar_log_review",
      name: "1. Audit Log Review & SIEM Telemetry",
      control: "ISO 27001 Control A.8.15 (Logging) & A.8.16 (Monitoring)",
      technicalFocus: "Verifying that 100% of authentications, privilege escalations, firewall blocks, and administrative actions are logged immutably.",
      auditProcedure: "Sample CloudWatch / SIEM logs across 30 days; verify NTP clock sync, check for log tampering, and test alert trigger latency.",
      highRiskFinding: "Unlogged administrative root password resets or missing NTP time synchronization resulting in misaligned incident timelines.",
      verificationTools: "Splunk, Elastic SIEM, Wazuh, AWS CloudWatch, Grafana Loki",
      statutoryMandate: "CERT-In 180-Day Mandatory Log Retention Rule & 6-Hour Incident Notification SLA",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    pillar_config_audit: {
      key: "pillar_config_audit",
      name: "2. System Configuration & CIS Hardening",
      control: "ISO 27001 Control A.8.9 (Configuration Management)",
      technicalFocus: "Evaluating operating system kernels, cloud VPC security groups, and database configurations against hardened CIS Benchmarks.",
      auditProcedure: "Execute automated configuration linters (tfsec, Checkov, OpenSCAP); test for disabled root SSH, core dump blocks, and TLS 1.3 enforcement.",
      highRiskFinding: "SSH daemon configured with `PermitRootLogin yes` or AWS S3 buckets created without default KMS server-side encryption.",
      verificationTools: "CIS-CAT Pro, tfsec, Checkov, Ansible Hardening Playbooks, AWS Config",
      statutoryMandate: "NCIIPC Protected System Baselines & RBI Master Directions on IT Infrastructure",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    pillar_access_review: {
      key: "pillar_access_review",
      name: "3. User Access Reviews & Privilege Auditing",
      control: "ISO 27001 Control A.5.15 (Access Control) & A.5.18 (Access Rights)",
      technicalFocus: "Enforcing Principle of Least Privilege (PoLP), Separation of Duties (SoD), quarterly access re-certification, and PAM JIT elevation.",
      auditProcedure: "Reconcile HR termination rosters against Active Directory & AWS IAM; identify dormant accounts (>90 days) and orphan API keys.",
      highRiskFinding: "Terminated contractor accounts active 60 days post-departure or developers possessing direct production database write permissions.",
      verificationTools: "SailPoint IdentityIQ, CyberArk PAM, Teleport JIT, AWS IAM Access Analyzer",
      statutoryMandate: "DPDP Act 2023 Section 8 (Role-Based Citizen PII Safeguards) & RBI Maker-Checker Rule",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activePillar = technicalPillars[selectedPillarKey];

  // Studio 2: Technical Probes Data
  const technicalProbes = {
    probe_cis_ssh: {
      key: "probe_cis_ssh",
      name: "Probe 1: CIS Linux SSH Configuration Audit",
      target: "Ubuntu 22.04 LTS Production Payment Switch Nodes (50 Hosts)",
      benchmarkRule: "CIS Linux 5.2.10: Ensure SSH root login is disabled",
      cliCommand: "grep '^PermitRootLogin' /etc/ssh/sshd_config",
      rawOutput: "PermitRootLogin yes\n# Host: payshield-prod-node-04 (SSH Root Login Permitted!)",
      classification: "MAJOR NON-CONFORMITY (Direct Root Attack Surface)",
      rootCause: "Legacy deployment script omitted automated sshd_config CIS hardening template.",
      remediationScript: "sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config && systemctl reload sshd",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    probe_dormant_iam: {
      key: "probe_dormant_iam",
      name: "Probe 2: AWS IAM Dormant Account Audit",
      target: "AWS IAM Account (Production PayShield Environment)",
      benchmarkRule: "ISO 27001 Control A.5.18: Deactivate dormant accounts unused for > 90 days",
      cliCommand: "aws iam get-credential-report | awk -F',' '$5 > 90 {print $1, $5}'",
      rawOutput: "intern_rahul_dev  112_DAYS_INACTIVE\ncontractor_qa08   95_DAYS_INACTIVE\n# 2 Dormant Accounts Detected!",
      classification: "MINOR NON-CONFORMITY (Unmonitored Backdoors)",
      rootCause: "HR offboarding webhook failed to trigger automated AWS IAM credential revocation.",
      remediationScript: "aws iam update-access-key --status Inactive --user-name intern_rahul_dev && aws iam delete-login-profile --user-name intern_rahul_dev",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    probe_siem_telemetry: {
      key: "probe_siem_telemetry",
      name: "Probe 3: SIEM Telemetry & NTP Time-Sync Audit",
      target: "Centralized Elastic SIEM & Syslog Ingestion Pipeline",
      benchmarkRule: "ISO 27001 Control A.8.15 & CERT-In Clock Synchronization Rule",
      cliCommand: "chronyc tracking && grep 'PAM_PASSWORD_RESET' /var/log/auth.log | tail -n 1",
      rawOutput: "Stratum: 1 (NPL India Sync OK)\n2026-08-23T02:45:10Z payshield-auth pam_unix: password reset for mamata SUCCESS",
      classification: "CONFORMITY (100% Monitored & Synchronized)",
      rootCause: "Control operating effectively with sub-millisecond clock accuracy.",
      remediationScript: "# No remediation needed. Telemetry verified in SIEM compliance dashboard.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeProbe = technicalProbes[selectedProbeKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_k8s_cis_audit",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "500 Kubernetes Pods CIS Hardening & IAM Audit",
      budget: "₹18,50,000",
      challenge: "UPI Payment Switch Faced RBI Inspection Requiring CIS Hardening and Zero Dormant Accounts",
      dilemma:
        "500 Kubernetes microservices processing ₹120 Crores daily had configuration drifts where 14 contractor accounts remained active 90+ days post-contract and SSH root access was enabled on 4 worker nodes.",
      resolution:
        "Mamata automated quarterly IAM reconciliation, deployed tfsec IaC linters in CI/CD, eliminated 14 dormant accounts, and hardened 500 pods against CIS benchmarks, achieving 100% clean audit certification.",
      metrics: {
        podsHardened: "500 Kubernetes Pods",
        dormantAccountsRemoved: "14 Inactive Accounts",
        cisComplianceScore: "100% CIS Level 1 Pass",
        compliance: "ISO 27001 Control A.8.9 & RBI"
      }
    },
    {
      id: "ichapur_pacs_access_review",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Oncology PACS Access Audit & Dormant Intern Removal",
      budget: "₹8,20,000",
      challenge: "80,000 Biopsy Records Required Strict Access Auditing Under DPDP Act Section 8 Rules",
      dilemma:
        "Hospital Active Directory revealed 3 resigned oncology research interns still possessed active read access to 80,000 patient biopsy scans, violating DPDP Act Section 8 technical safeguard mandates.",
      resolution:
        "Mahima audited Active Directory accounts, revoked access for 3 resigned interns, and configured Wazuh File Integrity Monitoring (FIM) on DICOM image repositories, ensuring full statutory Safe Harbor.",
      metrics: {
        biopsyRecordsGoverned: "80,000 Scans",
        dormantInternsRevoked: "3 Accounts Deactivated",
        fimMonitoringCoverage: "100% DICOM Repositories",
        compliance: "DPDP Act 2023 Sec 8 & NABH"
      }
    },
    {
      id: "barrackpore_scada_rtu_audit",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA RTU Configuration Audit",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced NCIIPC Inspection Requiring Hardened RTU Configs & Modbus Logs",
      dilemma:
        "18 electrical transmission substations utilized legacy RTU controllers with default passwords and unencrypted Telnet management ports exposed on local maintenance VLANs.",
      resolution:
        "Debangshu audited firmware configurations against industrial OT baselines, disabled insecure Telnet ports, and centralized RTU syslog telemetry, maintaining 100% Section 70 Protected System certification.",
      metrics: {
        substationsAudited: "18 High-Voltage Sites",
        insecurePortsDisabled: "100% Telnet Closed",
        rtuSyslogCentralized: "100% Modbus Logging",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_tech_audit_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Technical Audit & UAR Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Detect SSH Root Configuration Drift and Execute Access Reviews",
      dilemma:
        "Cybersecurity students struggled to parse raw Linux audit logs, evaluate CIS benchmarks, and reconcile active directory matrices against HR termination rosters.",
      resolution:
        "The team developed an interactive Technical Security Audit Engine in React, training 215+ BCA cyber security students on CIS benchmark validation, PAM workflows, and SIEM log analysis.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        auditProbesSimulated: "110+ Technical Probes",
        examMastery: "100% Technical Audit Mastery",
        compliance: "NCIIPC Educational Security Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Course Module 3: Information Security Management • Module 003_004 • Topic 5 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Log Review, System Configuration Audits, and Access Review
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the technical core of information security auditing: inspect SIEM log telemetry under ISO 27001 Control A.8.15, 
            evaluate OS and cloud hardening against CIS Benchmarks under Control A.8.9, and execute quarterly User Access Reviews (UAR) to eliminate dormant accounts under Control A.5.15.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Tri-Pillar Technical Audit Analyzer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔍</span> Studio 1: Tri-Pillar Technical Audit Analyzer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a technical audit pillar to inspect its core technical focus, audit testing procedures, high-risk non-conformities, automated verification tools, and statutory compliance drivers.
            </p>
          </div>

          {/* Pillar Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(technicalPillars).map((tp) => {
              const isSelected = selectedPillarKey === tp.key;
              return (
                <button
                  key={tp.key}
                  onClick={() => setSelectedPillarKey(tp.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tp.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{tp.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePillar.badgeClass)}>
                  {activePillar.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Standard: {activePillar.control.split(" (")[0]}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400 text-left sm:text-right">
                Statutory Rule: <span className="text-emerald-400 font-bold">{activePillar.statutoryMandate.split(" & ")[0]}</span>
              </div>
            </div>

            {/* Technical Focus & Audit Procedure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Technical Audit Focus:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activePillar.technicalFocus}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Audit Testing Procedure:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activePillar.auditProcedure}</p>
              </div>
            </div>

            {/* High-Risk Finding & Verification Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Common High-Risk Finding:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activePillar.highRiskFinding}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Automated Verification Tools:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed font-sans">{activePillar.verificationTools}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Real-World Technical Audit Sampling & Finding Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚙️</span> Studio 2: Technical Audit Probe &amp; Remediation Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an automated audit probe to inspect real terminal diagnostic outputs, evaluate finding severity classifications, and examine automated remediation shell commands.
            </p>
          </div>

          {/* Probe Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(technicalProbes).map((pr) => {
              const isSelected = selectedProbeKey === pr.key;
              return (
                <button
                  key={pr.key}
                  onClick={() => setSelectedProbeKey(pr.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{pr.name.split(": ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{pr.name.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Probe Details */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeProbe.badgeClass)}>
                  {activeProbe.classification}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-sans">
                  Target: {activeProbe.target}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Rule: <span className="text-white font-bold">{activeProbe.benchmarkRule.split(": ")[0]}</span>
              </div>
            </div>

            {/* CLI Command & Raw Diagnostic Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Executed Audit CLI Command:</span>
                <pre className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 text-emerald-400 overflow-x-auto text-[11px]">
                  $ {activeProbe.cliCommand}
                </pre>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Raw Terminal Diagnostic Output:</span>
                <pre className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 text-gray-200 overflow-x-auto text-[11px]">
                  {activeProbe.rawOutput}
                </pre>
              </div>
            </div>

            {/* Root Cause & Remediation Script */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Root Cause Analysis (RCA):</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeProbe.rootCause}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Automated Remediation Shell Script:</span>
                <pre className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 text-cyan-300 overflow-x-auto text-[11px]">
                  {activeProbe.remediationScript}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 3 Pillars of Technical Security Auditing and the User Access Review (UAR) Pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 3 Pillars */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 3 Pillars of Technical Auditing
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Pillar 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="130" height="90" rx="6" fill="#083344" stroke="#06b6d4" />
                    <text x="90" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">LOG REVIEW</text>
                    <text x="90" y="60" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Control A.8.15</text>
                    <text x="90" y="75" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="6">SIEM Telemetry</text>
                    <text x="90" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">180-Day WORM Logs</text>
                  </g>

                  {/* Pillar 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="90" rx="6" fill="#78350f" stroke="#f59e0b" />
                    <text x="250" y="47" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">CONFIG AUDIT</text>
                    <text x="250" y="60" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">Control A.8.9</text>
                    <text x="250" y="75" fill="#fef08a" font-family="monospace" textAnchor="middle" fontSize="6">CIS Benchmarks</text>
                    <text x="250" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">IaC tfsec Linters</text>
                  </g>

                  {/* Pillar 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="130" height="90" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="410" y="47" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">ACCESS REVIEW</text>
                    <text x="410" y="60" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Control A.5.15</text>
                    <text x="410" y="75" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="6">Quarterly UAR</text>
                    <text x="410" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="6">Zero Dormant Users</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="145" width="450" height="60" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="170" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      UNSHAKEABLE TECHNICAL POSTURE
                    </text>
                    <text x="250" y="187" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Log Telemetry + CIS Hardening + Quarterly Access Re-certification.
                    </text>
                  </g>

                  <text x="250" y="255" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Together, these 3 pillars eliminate 99% of unauthorized access and drift vulnerabilities.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The 3 pillars of technical information security auditing under ISO 27001.
              </p>
            </div>

            {/* Diagram 2: UAR Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Quarterly User Access Review (UAR) Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="95" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="67" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">1. EXPORT</text>
                    <text x="67" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">IAM &amp; AD Matrix</text>
                  </g>

                  <line x1="115" y1="47" x2="135" y2="47" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="135" y="25" width="100" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="185" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="7.5">2. RECONCILE</text>
                    <text x="185" y="58" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6">HR Terminations</text>
                  </g>

                  <line x1="235" y1="47" x2="255" y2="47" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="25" width="105" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="307" y="45" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="7.5">3. REVOKE</text>
                    <text x="307" y="58" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6">Dormant Accounts</text>
                  </g>

                  <line x1="360" y1="47" x2="380" y2="47" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="380" y="25" width="100" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="430" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">4. SIGN-OFF</text>
                    <text x="430" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">CISO Approval</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="60" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      QUARTERLY UAR RE-CERTIFICATION
                    </text>
                    <text x="250" y="167" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Guarantees Least Privilege (PoLP) and eliminates orphan access keys every 90 days.
                    </text>
                  </g>

                  <text x="250" y="235" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    IAM Export ➔ HR Cross-Check ➔ Immediate Revocation ➔ CISO Board Sign-off.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: The quarterly User Access Review (UAR) and access revocation pipeline.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Technical Auditing Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads harden Kubernetes pods in Kolkata, govern clinical PACS access in Ichapur, manage SCADA in Barrackpore, and simulate probes in Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Technical Challenge ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Engineering Solution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for Technical Auditors and Cloud Security Engineers conducting technical audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Technical Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate UARs:</strong> Never track user privileges with manual Excel spreadsheets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Embed IaC Linters:</strong> Run tfsec and Checkov in CI/CD before Terraform apply.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Stratum-1 NTP:</strong> Sync all system clocks to ensure coherent log timelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Adopt Just-In-Time PAM:</strong> Grant temporary 2-hour admin access instead of permanent root.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Technical Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Dormant Account Trap:</strong> Leaving contractor accounts active after contract end.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Permitting Root SSH:</strong> Leaving `PermitRootLogin yes` active on production nodes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Writable Audit Logs:</strong> Storing SIEM logs on writable disks where hackers can edit them.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>No Separation of Duties:</strong> Allowing developers to deploy code without approval gates.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce CERT-In 180 Days:</strong> Retain all ICT logs within India for 180 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy File Integrity Monitoring:</strong> Use Wazuh FIM to alert on `/etc/passwd` edits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Implement Maker-Checker:</strong> Require dual-manager approval for banking admin tasks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit Personal Data Queries:</strong> Log all access to citizen records for DPDP compliance.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize log telemetry, CIS configuration audits, and access review workflows before reviewing the practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Technical Auditors
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why dormant accounts are one of the most dangerous audit findings: Attackers specifically search for inactive contractor or ex-employee credentials because their logins rarely raise alarms. Auditing HR termination rosters against active directory matrices every quarter guarantees that orphaned accounts are severed within 24 hours of employee departure.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The relationship between CIS Benchmarks and automated CI/CD security linters: Rather than manually checking 500 servers for `PermitRootLogin no`, modern compliance engineers embed static IaC security analyzers (like Checkov and tfsec) directly into GitHub Actions, rejecting any pull request that introduces configuration drift.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud environments, replace static root IAM keys with Just-In-Time (JIT) Privileged Access Management (PAM), ensuring that elevated admin permissions expire automatically after 2 hours with full session recording.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3 Pillars: Log Review (A.8.15), Config Audit (A.8.9), Access Review (A.5.15).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CIS Benchmarks define standardized technical hardening baselines.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>User Access Reviews (UAR) must be conducted at least Quarterly (90 days).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Principle of Least Privilege (PoLP) and Separation of Duties (SoD) enforced.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Directions mandate 180-day log retention within India.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RBI Master Directions require maker-checker dual controls on admin tasks.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Log Review, System Configuration &amp; Access Review FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Technical Audit Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Log Review, System Configuration Audits, and Access Review (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The 3 Pillars of Technical Auditing—Log Review (Control A.8.15), System Configuration Hardening (Control A.8.9), and User Access Review (Control A.5.15)—form the frontline validation of every cybersecurity program. Always remember: written policies mean nothing if the production servers permit root SSH logins or harbor dormant contractor accounts! Enforce CIS Benchmarks, automate quarterly access reviews, maintain 180-day WORM logs under CERT-In Directions, and uphold the highest standards of Indian cyber law compliance!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
