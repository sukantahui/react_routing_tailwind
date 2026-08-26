import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Studio 1: Exploit Pipeline State
  const [selectedVulnKey, setSelectedVulnKey] = useState("sqli");

  // Studio 2: Attack Surface & Risk Calculator State
  const [attackVector, setAttackVector] = useState("network"); // network (0.85), adjacent (0.62), local (0.55), physical (0.2)
  const [attackComplexity, setAttackComplexity] = useState("low"); // low (0.77), high (0.44)
  const [privilegesRequired, setPrivilegesRequired] = useState("none"); // none (0.85), low (0.62), high (0.27)
  const [userInteraction, setUserInteraction] = useState("none"); // none (0.85), required (0.62)
  const [impactLevel, setImpactLevel] = useState("high"); // high (0.56 each), low (0.22 each), none (0)
  const [assetValueLakhsINR, setAssetValueLakhsINR] = useState(50); // ₹50 Lakhs

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_coupon");

  // Vulnerability Pipeline Data for Studio 1
  const vulnProfiles = {
    sqli: {
      key: "sqli",
      title: "Unsanitized SQL Input (SQL Injection)",
      cveExample: "CWE-89 / OWASP A03:2021",
      category: "Input Validation Flaw",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      vulnerabilityCode: `// Vulnerable Node.js / Express Endpoint:
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Flaw: Direct string concatenation into SQL query!
  const query = "SELECT * FROM users WHERE user = '" + username + "' AND pass = '" + password + "'";
  const user = await db.rawQuery(query);
});`,
      exploitInput: `username: admin' OR '1'='1' -- \npassword: [ANY_DUMMY_PASSWORD]`,
      payloadEffect:
        "Bypasses database authentication logic completely by altering SQL query structure to always evaluate TRUE, logging in as the first record (Administrator).",
      remediationCode: `// Secure Parameterized Query (Prepared Statement):
const query = "SELECT * FROM users WHERE user = ? AND pass_hash = ?";
const user = await db.query(query, [username, hashedPassword]);`
    },
    buffer_overflow: {
      key: "buffer_overflow",
      title: "Stack Buffer Overflow (Memory Corruption)",
      cveExample: "CWE-121 / Classic Smashing the Stack",
      category: "Memory Management Flaw",
      color: "from-amber-500 to-orange-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      vulnerabilityCode: `// Vulnerable Legacy C Function:
void process_packet(char *network_stream) {
  char stack_buffer[64];
  // Flaw: strcpy does not check input boundary!
  strcpy(stack_buffer, network_stream);
}`,
      exploitInput: `[64 Bytes Junk A's] + [8 Bytes Saved RBP] + [0x7fffffffe420 (Return Address pointing to Shellcode)]`,
      payloadEffect:
        "Overwrites the Instruction Pointer (EIP/RIP) on the CPU stack, hijacking execution control to execute an injected /bin/sh reverse shell.",
      remediationCode: `// Safe Modern Bounds-Checked C:
strncpy(stack_buffer, network_stream, sizeof(stack_buffer) - 1);
stack_buffer[sizeof(stack_buffer) - 1] = '\\0'; // Ensure null-termination`
    },
    idor: {
      key: "idor",
      title: "Insecure Direct Object Reference (IDOR)",
      cveExample: "CWE-639 / Broken Access Control",
      category: "Authorization Flaw",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      vulnerabilityCode: `// Vulnerable Account Invoice API:
app.get('/api/invoice/:invoiceId', async (req, res) => {
  // Flaw: Queries database using URL parameter without verifying ownership!
  const invoice = await Invoice.findById(req.params.invoiceId);
  return res.json(invoice);
});`,
      exploitInput: `GET /api/invoice/100452  - &rarr; Change parameter to:  GET /api/invoice/100453`,
      payloadEffect:
        "Allows unauthorized users to download proprietary invoices, tax records, and personal customer data belonging to any other user across the platform.",
      remediationCode: `// Secure Object Ownership Verification:
const invoice = await Invoice.findOne({ _id: req.params.invoiceId, tenantId: req.user.tenantId });
if (!invoice) return res.status(403).json({ error: "Access Denied" });`
    },
    logic_flaw: {
      key: "logic_flaw",
      title: "Business Logic Discount Inversion",
      cveExample: "CWE-840 / Business Workflow Flaw",
      category: "Application Logic Flaw",
      color: "from-blue-500 to-cyan-600",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      vulnerabilityCode: `// Vulnerable Checkout Cart Calculation:
function calculateFinalTotal(cartItems, couponCode) {
  let subtotal = getSubtotal(cartItems); // e.g. ₹300
  let discount = couponCode.discountVal; // e.g. ₹500
  return subtotal - discount;           // Flaw: Returns -₹200!
}`,
      exploitInput: `Apply promo code 'MEGA500' on a cart subtotal of ₹300`,
      payloadEffect:
        "Causes payment gateway to interpret negative balance as a customer refund, automatically dispatching physical goods while crediting ₹200 to customer wallet.",
      remediationCode: `// Secure Business Constraint Check:
let finalTotal = Math.max(0, subtotal - discount);
if (finalTotal === 0 && subtotal > 0) enforceMinimumSpend(cartItems);`
    }
  };

  const activeVuln = vulnProfiles[selectedVulnKey];

  // CVSS v3.1 Calculation Formula
  const cvssScore = useMemo(() => {
    const avWeights = { network: 0.85, adjacent: 0.62, local: 0.55, physical: 0.2 };
    const acWeights = { low: 0.77, high: 0.44 };
    const prWeights = { none: 0.85, low: 0.62, high: 0.27 };
    const uiWeights = { none: 0.85, required: 0.62 };

    const exploitability = 8.22 * avWeights[attackVector] * acWeights[attackComplexity] * prWeights[privilegesRequired] * uiWeights[userInteraction];

    let iss = 0;
    if (impactLevel === "high") {
      iss = 1 - (1 - 0.56) * (1 - 0.56) * (1 - 0.56); // ~0.91
    } else if (impactLevel === "low") {
      iss = 1 - (1 - 0.22) * (1 - 0.22) * (1 - 0.22); // ~0.52
    } else {
      iss = 0;
    }

    const impactSubscore = 7.52 * iss;
    let score = 0;
    if (impactSubscore &le; 0) {
      score = 0;
    } else {
      score = Math.min(10.0, exploitability + impactSubscore);
    }
    const finalScore = parseFloat(score.toFixed(1));

    let severity = "None";
    let severityColor = "text-gray-400";
    if (finalScore >= 9.0) {
      severity = "CRITICAL";
      severityColor = "text-rose-400";
    } else if (finalScore &ge; 7.0) {
      severity = "HIGH";
      severityColor = "text-amber-400";
    } else if (finalScore >= 4.0) {
      severity = "MEDIUM";
      severityColor = "text-yellow-400";
    } else if (finalScore > 0) {
      severity = "LOW";
      severityColor = "text-blue-400";
    }

    // Calculate Estimated Annual Loss Expectancy in INR
    const exposureFactor = finalScore / 10.0;
    const singleLossExpectancy = assetValueLakhsINR * 100000 * exposureFactor;
    const annualizedRate = finalScore >= 9.0 ? 1.5 : finalScore >= 7.0 ? 0.8 : finalScore >= 4.0 ? 0.3 : 0.05;
    const aleINR = Math.round(singleLossExpectancy * annualizedRate);

    const formatINR = (val) => {
      if (val >= 10000000) {
        return `₹${(val / 10000000).toFixed(2)} Crores / yr`;
      } else if (val >= 100000) {
        return `₹${(val / 100000).toFixed(2)} Lakhs / yr`;
      } else {
        return `₹${val.toLocaleString("en-IN")} / yr`;
      }
    };

    return {
      score: finalScore,
      severity,
      severityColor,
      aleFormatted: formatINR(aleINR),
      exploitability: exploitability.toFixed(2),
      impactSubscore: impactSubscore.toFixed(2)
    };
  }, [attackVector, attackComplexity, privilegesRequired, userInteraction, impactLevel, assetValueLakhsINR]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_coupon",
      lead: "Mamata",
      role: "Senior Application Security Auditor",
      location: "Kolkata FinTech Valley",
      title: "E-Commerce Checkout Logic Flaw",
      budget: "₹5,50,000",
      dilemma:
        "While conducting a white-hat security assessment on a Kolkata retail startup, Mamata discovered that passing a ₹500 festival promo coupon on a ₹300 cart produced a negative total of -₹200. The payment gateway erroneously treated the negative balance as a merchant refund, transferring ₹200 to the attacker's UPI wallet.",
      hackerMindset:
        "A standard QA tester inputs valid positive coupons; an ethical hacker deliberately inputs coupons exceeding the subtotal to probe integer underflow and workflow inversion.",
      responsibleRemedy:
        "Mamata privately drafted a coordinated vulnerability disclosure report with a working proof-of-concept, allowing developers to patch the constraint before the Durga Puja flash sale launch.",
      metrics: {
        financialLossPrevented: "₹25,00,000+",
        remediationTime: "4 Hours",
        vulnerabilityClass: "CWE-840 Business Logic",
        compliance: "RBI Digital Payment Directive"
      }
    },
    {
      id: "ichapur_api",
      lead: "Mahima",
      role: "Lead Hospital Cyber Defence Officer",
      location: "Ichapur General Hospital",
      title: "Unauthenticated Patient Queue API",
      budget: "₹4,20,000",
      dilemma:
        "During an internal vulnerability assessment, Mahima ran a passive port scan and discovered an unauthenticated REST API endpoint `GET /api/v1/queue/live` exposed to the hospital guest Wi-Fi subnet. The endpoint broadcasted patient names, Aadhaar numbers, and live ECG telemetry in unencrypted JSON.",
      hackerMindset:
        "Recognizing that developers often deploy internal diagnostic endpoints without adding authentication middleware because they assume internal LANs are safe.",
      responsibleRemedy:
        "Mahima quarantined the endpoint, enforced JWT bearer token verification bound to staff Active Directory roles, and enabled TLS 1.3 across all internal microservices.",
      metrics: {
        recordsSecured: "12,000+ Inpatients",
        attackSurfaceReduction: "100% Internal API Lockdown",
        vulnerabilityClass: "CWE-306 Missing Authentication",
        compliance: "India DPDP Act 2023 & NABH"
      }
    },
    {
      id: "barrackpore_scada",
      lead: "Debangshu",
      role: "OT Infrastructure Security Researcher",
      location: "Barrackpore Steel & Grid Plant",
      title: "Modbus TCP Unauthenticated Register Writes",
      budget: "₹6,00,000",
      dilemma:
        "Debangshu needed to verify whether unauthenticated industrial Modbus TCP commands on port 502 could alter blast furnace cooling valve registers, without risking physical explosions or plant shutdowns on live machinery.",
      hackerMindset:
        "Building an isolated digital twin testbed to safely test offensive exploit scripts against industrial PLCs without causing kinetic destruction.",
      responsibleRemedy:
        "Debangshu deployed an isolated hardware-in-the-loop (HIL) lab replica, demonstrated unauthenticated coil injection, and implemented IEC 62351-3 cryptographic nonces and optical data diodes.",
      metrics: {
        testbedSafety: "100% Isolated Sandbox",
        protocolSecured: "Modbus TCP + HMAC",
        vulnerabilityClass: "CWE-287 Weak Authentication",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_lab",
      lead: "Abhronila & Susmita",
      role: "Cyber Threat Research Leads",
      location: "Jadavpur University Cyber Club",
      title: "Isolated Ethical Exploitation Sandbox",
      budget: "₹3,80,000",
      dilemma:
        "Undergraduate students wanted to practice hands-on buffer overflows, Metasploit payloads, and SQL injection, but testing against public university domains or external websites violates Section 66 of the IT Act 2000.",
      hackerMindset:
        "Understanding that real hacking skills require deep hands-on practice in legally authorized, isolated virtual environments.",
      responsibleRemedy:
        "The team built a dedicated host-only virtualized lab cluster running Kali Linux, Metasploitable3, and Damn Vulnerable Web Application (DVWA), establishing strict Rules of Engagement (RoE).",
      metrics: {
        legalCompliance: "100% IT Act 2000 Compliant",
        activeStudentsTrained: "85 Students",
        vulnerabilityClass: "Comprehensive Lab Suite",
        compliance: "Academic Ethical Research"
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
            Cyber Security Module 002_002 • Topic 0 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Introduction to Hacking Concepts &amp; Terminology
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Hacking is fundamentally the art of curious exploration and unconventional problem-solving. Master the foundational 
            lexicon of cybersecurity—Vulnerabilities, Exploits, Payloads, Zero-Days, and Attack Surfaces—while exploring how 
            adversarial thinking transforms defensive architecture under Indian Cyber Law (IT Act 2000 &amp; DPDP Act 2023).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Exploitation Pipeline Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Studio 1: The Anatomy of an Exploitation Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a vulnerability archetype to dissect how a security weakness is converted into an Exploit and Payload, and see its defensive remediation.
            </p>
          </div>

          {/* Vulnerability Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(vulnProfiles).map((v) => {
              const isSelected = selectedVulnKey === v.key;
              return (
                <button
                  key={v.key}
                  onClick={() => setSelectedVulnKey(v.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold truncate">{v.title.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{v.category}</div>
                  <div className={clsx("mt-1.5 text-[10px] px-1.5 py-0.5 rounded border inline-block", v.badgeClass)}>
                    {v.cveExample.split(" / ")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Exploit Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeVuln.badgeClass)}>
                  {activeVuln.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeVuln.title}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Standard Classification</span>
                <span className="text-sm font-mono text-indigo-300 font-bold">{activeVuln.cveExample}</span>
              </div>
            </div>

            {/* 3-Step Pipeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Step 1: Vulnerability */}
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1">
                  <span>1.</span> The Vulnerability (The Flaw)
                </span>
                <pre className="p-3 bg-gray-950 rounded-lg text-rose-300 font-mono text-[10.5px] overflow-x-auto border border-gray-800">
                  {activeVuln.vulnerabilityCode}
                </pre>
              </div>

              {/* Step 2: Exploit Input */}
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/40 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                  <span>2.</span> The Exploit (The Trigger)
                </span>
                <pre className="p-3 bg-gray-950 rounded-lg text-amber-300 font-mono text-[10.5px] overflow-x-auto border border-gray-800 whitespace-pre-wrap">
                  {activeVuln.exploitInput}
                </pre>
                <div className="text-[11px] text-gray-300 pt-1">
                  <strong className="text-amber-400">Payload Consequence:</strong> {activeVuln.payloadEffect}
                </div>
              </div>

              {/* Step 3: Defensive Remediation */}
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                  <span>3.</span> The Fix (Remediation)
                </span>
                <pre className="p-3 bg-gray-950 rounded-lg text-emerald-300 font-mono text-[10.5px] overflow-x-auto border border-gray-800">
                  {activeVuln.remediationCode}
                </pre>
                <p className="text-[11px] text-gray-400 pt-1">
                  Remediating vulnerabilities at the root eliminates the possibility of exploit execution regardless of attacker input.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Attack Surface & Quantitative Risk Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 2: CVSS v3.1 Severity &amp; Financial Risk Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Configure vulnerability parameters to calculate the CVSS v3.1 Base Score and estimate Annualized Loss Expectancy (ALE) in Indian Rupees (₹).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* CVSS Metric Selectors (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                CVSS v3.1 Base Metrics
              </h3>

              {/* Attack Vector */}
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Attack Vector (AV):</label>
                <select
                  value={attackVector}
                  onChange={(e) => setAttackVector(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
                &gt;
                  <option value="network">Network (Remote Internet - AV:N)</option>
                  <option value="adjacent">Adjacent (Local Subnet / Wi-Fi - AV:A)</option>
                  <option value="local">Local (Local User Account - AV:L)</option>
                  <option value="physical">Physical (Physical Console - AV:P)</option>
                </select>
              </div>

              {/* Attack Complexity */}
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Attack Complexity (AC):</label>
                <select
                  value={attackComplexity}
                  onChange={(e) => setAttackComplexity(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
                &gt;
                  <option value="low">Low (Repeatable with minimal skill - AC:L)</option>
                  <option value="high">High (Requires race conditions / bypassing ASLR - AC:H)</option>
                </select>
              </div>

              {/* Privileges Required */}
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">Privileges Required (PR):</label>
                <select
                  value={privilegesRequired}
                  onChange={(e) => setPrivilegesRequired(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
                &gt;
                  <option value="none">None (Unauthenticated - PR:N)</option>
                  <option value="low">Low (Standard User - PR:L)</option>
                  <option value="high">High (Administrator / Root - PR:H)</option>
                </select>
              </div>

              {/* Impact Level */}
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block">CIA Impact Level:</label>
                <select
                  value={impactLevel}
                  onChange={(e) => setImpactLevel(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
                &gt;
                  <option value="high">High (Complete Takeover / Major Data Leak)</option>
                  <option value="low">Low (Minor Non-Sensitive Info Disclosure)</option>
                  <option value="none">None (Zero Measurable Impact)</option>
                </select>
              </div>

              {/* Asset Value Slider */}
              <div className="space-y-1.5 pt-2 border-t border-gray-800">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">Protected Asset Value:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{assetValueLakhsINR} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={assetValueLakhsINR}
                  onChange={(e) => setAssetValueLakhsINR(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                /&gt;
              </div>
            </div>

            {/* Calculated Results (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Calculated Vulnerability Severity</h3>
                  <span className="text-xs text-gray-400">CVSS v3.1 Specification Standard</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={clsx("text-3xl sm:text-4xl font-black tracking-tight", cvssScore.severityColor)}>
                    {cvssScore.score}
                  </span>
                  <span className={clsx("text-xs font-extrabold px-2.5 py-1 rounded-full border border-gray-700 uppercase", cvssScore.severityColor)}>
                    {cvssScore.severity}
                  </span>
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Exploitability Subscore</span>
                  <span className="text-base font-bold text-indigo-300">{cvssScore.exploitability} / 10.0</span>
                  <span className="text-[10px] text-gray-500 block">Ease of execution</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Impact Subscore</span>
                  <span className="text-base font-bold text-amber-300">{cvssScore.impactSubscore} / 10.0</span>
                  <span className="text-[10px] text-gray-500 block">Damage potential</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Annual Loss Expectancy</span>
                  <span className="text-base font-bold text-rose-300">{cvssScore.aleFormatted}</span>
                  <span className="text-[10px] text-gray-500 block">Expected financial loss</span>
                </div>
              </div>

              {/* Legal & Regulatory Note */}
              <div className="bg-gray-900/90 p-5 rounded-xl border border-indigo-900/30 space-y-2 text-xs">
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚖</span> Indian Cyber Law Compliance Note: IT Act 2000 Section 66
                </h4>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  Testing these exploit parameters on unauthorized external systems is a cognizable criminal offense under 
                  <strong> Section 66 of the Information Technology Act, 2000</strong>, punishable by up to 3 years imprisonment and fines up to ₹5,00,000. 
                  Always ensure you hold a signed <strong>Rules of Engagement (RoE)</strong> letter before conducting penetration testing.
                </p>
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
              Visualizing the 5 Stages of the Exploitation Lifecycle and the Cognitive Mindset comparison.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The 5 Stages of Exploitation Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>⚡</span> Diagram A: The 5 Stages of the Exploitation Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Recon */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10.5">1. Reconnaissance</text>
                    <text x="85" y="60" fill="#94a3b8" textAnchor="middle" fontSize="8.5">OSINT, Whois, crt.sh</text>
                  </g>

                  {/* Arrow 1 to 2 */}
                  <path d="M 150 50 L 180 50" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowIndigo)" />

                  {/* Step 2: Scanning */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="60" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="45" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10.5">2. Scanning / Enum</text>
                    <text x="250" y="60" fill="#a5b4fc" textAnchor="middle" fontSize="8.5">Nmap SYN, Banner Grab</text>
                  </g>

                  {/* Arrow 2 to 3 */}
                  <path d="M 315 50 L 345 50" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowIndigo)" />

                  {/* Step 3: Vulnerability */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="60" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10.5">3. Vulnerability Match</text>
                    <text x="415" y="60" fill="#fde68a" textAnchor="middle" fontSize="8.5">CVE &amp; CWE Research</text>
                  </g>

                  {/* Downward Connector */}
                  <path d="M 415 80 L 415 140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4: Weaponize */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="60" y="140" width="380" height="65" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="165" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="11">4. WEAPONIZATION &amp; EXPLOITATION</text>
                    <text x="250" y="182" fill="#fca5a5" textAnchor="middle" fontSize="9">Crafting buffer overflow payload / SQL injection query to bypass controls</text>
                  </g>

                  {/* Downward Arrow */}
                  <path d="M 250 205 L 250 240" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowIndigo)" />

                  {/* Step 5: Payload */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="40" y="240" width="420" height="65" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="265" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="11">5. PAYLOAD EXECUTION &amp; POST-EXPLOITATION</text>
                    <text x="250" y="282" fill="#a7f3d0" textAnchor="middle" fontSize="9">Reverse Shell Established • Privilege Escalation • Immutable Audit Logging</text>
                  </g>

                  <defs>
                    <marker id="arrowIndigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.1: The structured progression from passive discovery to weaponized payload execution.
              </p>
            </div>

            {/* Diagram 2: The Hacker Mindset vs Developer Mindset */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🧠</span> Diagram B: Developer Mindset vs. Hacker Mindset
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Column: Developer Mindset */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="220" height="280" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="130" y="48" fill="#bae6fd" fontWeight="bold" textAnchor="middle" fontSize="12">DEVELOPER MINDSET</text>
                    <text x="130" y="65" fill="#7dd3fc" textAnchor="middle" fontSize="9">"How can I build features fast?"</text>
                    <line x1="40" y1="80" x2="220" y2="80" stroke="#334155" />
                    
                    <text x="40" y="105" fill="#cbd5e1" fontSize="9.5">✓ Focus on the Happy Path</text>
                    <text x="40" y="135" fill="#cbd5e1" fontSize="9.5">✓ Assumes valid user inputs</text>
                    <text x="40" y="165" fill="#cbd5e1" fontSize="9.5">✓ Prioritizes UI &amp; Performance</text>
                    <text x="40" y="195" fill="#cbd5e1" fontSize="9.5">✓ Relies on frontend validation</text>
                    <text x="40" y="225" fill="#cbd5e1" fontSize="9.5">✓ Assumes internal network safe</text>
                    <rect x="35" y="250" width="190" height="35" rx="6" fill="#1e293b" />
                    <text x="130" y="272" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">Constructive Builder</text>
                  </g>

                  {/* Right Column: Hacker Mindset */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="20" width="220" height="280" rx="10" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="370" y="48" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="12">HACKER MINDSET</text>
                    <text x="370" y="65" fill="#d8b4fe" textAnchor="middle" fontSize="9">"How can I make this fail?"</text>
                    <line x1="280" y1="80" x2="460" y2="80" stroke="#4c1d95" />
                    
                    <text x="280" y="105" fill="#e9d5ff" fontSize="9.5">✓ Focus on Bizarre Edge Cases</text>
                    <text x="280" y="135" fill="#e9d5ff" fontSize="9.5">✓ Deliberately inputs nulls/overflows</text>
                    <text x="280" y="165" fill="#e9d5ff" fontSize="9.5">✓ Probes boundaries &amp; race conditions</text>
                    <text x="280" y="195" fill="#e9d5ff" fontSize="9.5">✓ Bypasses JS to hit raw API ports</text>
                    <text x="280" y="225" fill="#e9d5ff" fontSize="9.5">✓ Assumes zero trust everywhere</text>
                    <rect x="275" y="250" width="190" height="35" rx="6" fill="#3b0764" />
                    <text x="370" y="272" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="9.5">Deconstructive Explorer</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.2: Bridging the gap between software construction and adversarial deconstruction is the essence of cybersecurity.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Ethical Engineering Case Studies (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security students and professionals apply the hacker mindset responsibly across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                &gt;
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Assessed Security Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Hacker Mindset vs Responsible Remedy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>⚡</span> The Real-World Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-2">
                <h4 className="font-bold text-purple-400 flex items-center gap-1.5">
                  <span>🧠</span> The Adversarial Hacker Mindset
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.hackerMindset}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>🛡</span> Responsible Ethical Remediation
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.responsibleRemedy}</p>
              </div>
            </div>

            {/* Metrics Achieved */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Auditing Results &amp; Compliance Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
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
              Guidelines to navigate the boundary between legal security research and unauthorized cybercrime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Professional Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Get Signed RoE:</strong> Never execute active network probes without written consent from the asset owner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Understand the Stack:</strong> Master RFC standards and memory architectures before running automated exploits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Practice 90-Day Disclosure:</strong> Give software vendors time to patch before releasing vulnerability research.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Test on Digital Twins:</strong> Replicate industrial and hospital systems in isolated sandboxes before testing.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Beginner Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Scanning Without Permission:</strong> Probing random internet IPs from home breaches IT Act 2000 Section 66.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing Terms:</strong> Mixing up Vulnerability (the flaw) with Exploit (the trigger) and Payload (the code).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Running Untrusted Exploits:</strong> Downloading compiled hacker binaries from GitHub that contain hidden backdoors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Automated Scanner Dependency:</strong> Relying on scanners that miss deep business logic and authorization bugs.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Best Practices
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt STRIDE Threat Modeling:</strong> Model threats during architectural design before writing a single line of code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Integrate SAST and DAST:</strong> Combine static source review in CI/CD with dynamic runtime application testing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Report Within 6 Hours:</strong> Comply with CERT-In directives by reporting critical cybersecurity incidents promptly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Crowdsource via Bug Bounties:</strong> Supplement annual penetration tests with continuous community bounty programs.</span>
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
              Synthesize core hacking concepts before moving to the history and taxonomy of threat actors.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Aspiring Security Researchers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why the 2600 Hz whistle worked in the 1970s telephone network: the system shared control signals and voice data on the same in-band wire.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How a business logic flaw (like negative coupon pricing) bypasses all web application firewalls because the input contains zero malicious SQL or JS characters.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future API designs, replace direct database primary keys (`/user/105`) with random UUIDv4 identifiers and enforce server-side session tenant checks.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Points to Remember for Exams)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Hacking originated at MIT in 1960s.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Vulnerability != Exploit != Payload.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Zero-Day = 0 days of vendor knowledge.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Sec 66: Criminal hacking law.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>STRIDE: S, T, R, I, D, E threat model.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In requires 6-hour incident reports.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Introduction to Hacking Concepts FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Hacking Concepts (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 2: Hacking, Ethical Hacking & Hacker Types! As you embark on this journey, always remember that true hackers are not criminals who destroy systems, but master craftsmen who understand technology so deeply that they see possibilities others miss. Use your skills responsibly to defend critical healthcare, financial, and civic infrastructure in West Bengal and across India. Ethical hacking is a profound responsibility."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
