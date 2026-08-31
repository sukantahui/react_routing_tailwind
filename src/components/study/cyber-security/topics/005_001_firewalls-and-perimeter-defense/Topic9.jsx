import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic9_files/rule_analyzer.py?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgAnomaliesId = useId();
  const svgOptimizationId = useId();

  // Studio 1: Active Anomaly Selection
  const [selectedAnomalyKey, setSelectedAnomalyKey] = useState("shadowing");

  // Studio 2: Live Rule Ordering Simulator State
  const [selectedTrafficFlow, setSelectedTrafficFlow] = useState("blocked_host_flow");
  const [ruleOrderMode, setRuleOrderMode] = useState("flawed_order"); // flawed_order vs optimized_order
  const [defaultDenyEnabled, setDefaultDenyEnabled] = useState(true);

  // Studio 3: Performance Calculations
  const [totalRuleCount, setTotalRuleCount] = useState(1200); // 100 to 5000 rules
  const [zeroHitRulePercentage, setZeroHitRulePercentage] = useState(30); // 0 to 60%
  const [trafficFrequencySorted, setTrafficFrequencySorted] = useState(true);

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_cooperative_audit");

  // The 4 Dangerous Anomalies Database for Studio 1
  const ruleAnomalies = {
    shadowing: {
      key: "shadowing",
      title: "1. Rule Shadowing (Dead Rule Anomaly)",
      severity: "CRITICAL SECURITY RISK",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      description: "A broader rule higher up matches all packets intended for a specific rule below it. The lower rule is completely shadowed and will NEVER execute, leaving intended blocks inoperative.",
      codeSnippet: "Rule 10: PERMIT Source: 10.10.1.0/24 → Dest: ANY\nRule 25: DROP   Source: 10.10.1.50   → Dest: ANY  <-- SHADOWED! 10.10.1.50 is NEVER blocked!",
      engineeringFix: "Move specific narrower rules (e.g. Host Drop) ABOVE general broader rules (e.g. Subnet Allow)."
    },
    redundancy: {
      key: "redundancy",
      title: "2. Rule Redundancy (Duplicate Bloat)",
      severity: "PERFORMANCE DEBT",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description: "Two rules perform identical actions on identical or overlapping traffic. Does not create security holes directly, but wastes CPU lookup cycles and confuses administrators.",
      codeSnippet: "Rule 30: PERMIT Source: ANY → Dest: 172.16.1.10:443 [TCP]\nRule 45: PERMIT Source: ANY → Dest: 172.16.1.10:443 [TCP]  <-- REDUNDANT DUPLICATE",
      engineeringFix: "Run automated static deduplication scripts to delete identical subordinate rules."
    },
    correlation: {
      key: "correlation",
      title: "3. Correlation / Generalization Conflict",
      severity: "AMBIGUOUS POLICY RISK",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "Two rules intersect on some packet criteria but have conflicting actions. The effective policy depends entirely on relative rule ordering, leading to unintended access grants.",
      codeSnippet: "Rule 1: PERMIT Subnet 10.10.1.0/24 → 172.16.1.10:80\nRule 2: DENY   Host   10.10.1.50   → ANY:ANY\nResult: 10.10.1.50 gets access to 172.16.1.10:80 only because Rule 1 is above Rule 2!",
      engineeringFix: "Disambiguate rules by creating explicit mutually exclusive source and destination definitions."
    },
    orphaned: {
      key: "orphaned",
      title: "4. Orphaned / Stale Rules (Decommissioned Assets)",
      severity: "UNMONITORED ATTACK SURFACE",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Legacy permit rules pointing to IP addresses or servers that were decommissioned months or years ago, leaving unmonitored open doors in the perimeter.",
      codeSnippet: "Rule 89: PERMIT ANY → 10.10.4.80:8080 (Old staging database retired in 2022!)",
      engineeringFix: "Conduct quarterly hit-count recertifications: auto-prune rules with zero hits over 90–180 days."
    }
  };

  // Studio 2: Live Traffic Flow Database
  const trafficFlows = {
    blocked_host_flow: {
      id: "blocked_host_flow",
      label: "Compromised Workstation (10.10.1.50) ➔ Outbound Exfiltration",
      src: "10.10.1.50:54200 (Compromised Host)",
      dst: "198.51.100.25:443",
      flawedResult: "🚨 PERMITTED (Shadowed by Rule #10 Allow-Subnet-All!)",
      optimizedResult: "🛡️ DROPPED (Rule #5 Specific-Host-Drop Executed First!)",
      flawedColor: "bg-rose-950 text-rose-300 border-rose-700",
      optimizedColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      analysis: "In the flawed ordering, the broad Subnet Allow rule on Line 10 matched first, permitting the compromised host's exfiltration traffic. In optimized ordering, the specific Host Drop on Line 5 blocked the packet immediately!"
    },
    normal_finance_user: {
      id: "normal_finance_user",
      label: "Legitimate Finance User (10.10.1.75) ➔ DMZ Web Portal (Port 443)",
      src: "10.10.1.75:51200",
      dst: "172.16.1.10:443",
      flawedResult: "✔ PERMITTED (Matched Rule #10)",
      optimizedResult: "✔ PERMITTED (Matched Rule #20 Allow-Finance-Web)",
      flawedColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      optimizedColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      analysis: "Legitimate business traffic is permitted in both configurations, but the optimized rule base provides granular per-service audit logging."
    },
    unknown_port_probe: {
      id: "unknown_port_probe",
      label: "External Attacker ➔ Port 4444 Reverse Shell Listener Probe",
      src: "198.51.100.99:58100",
      dst: "172.16.1.10:4444",
      flawedResult: defaultDenyEnabled ? "🛡️ DROPPED (Implicit Deny All)" : "🚨 PERMITTED (Default-Allow Anti-Pattern!)",
      optimizedResult: "🛡️ DROPPED (Explicit Catch-All Deny Line 999)",
      flawedColor: defaultDenyEnabled ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700",
      optimizedColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      analysis: "Default-Deny ensures that unapproved high ports are discarded by default, preventing reverse shells from connecting."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedRuleMetrics = useMemo(() => {
    const activeRules = totalRuleCount * (1 - zeroHitRulePercentage / 100);
    const prunedRules = totalRuleCount * (zeroHitRulePercentage / 100);

    // Average comparisons per packet:
    // If sorted by traffic frequency, ~90% of packets match in top 5 rules.
    const avgComparisonsPerPacket = trafficFrequencySorted ? 4.2 : (activeRules / 2).toFixed(0);

    // Latency overhead (microseconds)
    const packetLookupLatencyUs = (Number(avgComparisonsPerPacket) * 0.18).toFixed(2);

    // 5-Year Rule Audit & TCO Savings (INR ₹ Lakhs)
    const auditSavingsLakhs = (prunedRules * 0.015 + 4.5).toFixed(2);

    return {
      activeRules: Math.round(activeRules),
      prunedRules: Math.round(prunedRules),
      avgComparisonsPerPacket,
      packetLookupLatencyUs,
      auditSavingsLakhs
    };
  }, [totalRuleCount, zeroHitRulePercentage, trafficFrequencySorted]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_cooperative_audit: {
      id: "barrackpore_cooperative_audit",
      title: "Barrackpore Cooperative Bank Perimeter Rule-Base Audit",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      auditScope: "1,450 Legacy Perimeter Rules Across Dual HA Firewalls",
      threatScenario: "Penetration test revealed an orphaned rule from 2021 allowing unauthenticated RDP (Port 3389) to a decommissioned testing server.",
      solution: "Sukanta Hui and Mamata executed an automated static rule analysis script. The team identified 38 shadowed rules, 85 redundant rules, and 280 orphaned zero-hit rules, consolidating the rule base down to 180 clean, documented entries with traffic-frequency sorting.",
      outcome: "Firewall CPU utilization dropped from 88% to 12%; packet lookup latency reduced by 85%; full 180-day compliance achieved for CERT-In."
    },
    saltlake_datacenter_pruning: {
      id: "saltlake_datacenter_pruning",
      title: "Salt Lake Sector V High-Tech Data Center Policy Optimization",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      auditScope: "4,200 Multi-Tenant Cloud Firewall ACLs",
      threatScenario: "High-volume DDoS simulation caused CPU saturation due to unoptimized sequential rule evaluation across 4,200 unsorted rules.",
      solution: "Mahima, Abhronila, and Debangshu restructured the rule base into Zone-Based matrices and placed top 95% volume HTTPS/DNS rules at Lines 1–10.",
      outcome: "Firewall line-rate throughput surged from 14 Gbps to 42 Gbps with zero dropped legitimate transactions."
    }
  };

  const currentAnomaly = ruleAnomalies[selectedAnomalyKey];
  const currentFlow = trafficFlows[selectedTrafficFlow];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>📋 Module 005_001 • Topic 9</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Firewall Rule-Base Design: Default-Deny vs Default-Allow
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the mathematical logic and hygiene of firewall access control lists. Understand <strong className="text-emerald-400">Default-Deny Whitelisting</strong>, <strong className="text-sky-400">First-Match-Wins</strong> ordering, the 4 dangerous rule anomalies (<strong className="text-rose-400">Shadowing, Redundancy, Correlation, Orphaned</strong>), and traffic-frequency optimization.
          </p>
        </header>

        {/* SECTION 1: RULE BASE ANOMALIES & EVALUATION SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Rule-Base Evaluation Mechanics &amp; The 4 Dangerous Anomalies
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing sequential top-to-bottom rule evaluation, first-match termination, and how shadowing leaves vulnerabilities wide open.
            </p>
          </div>

          {/* SVG 1: RULE EVALUATION PIPELINE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Sequential Rule Evaluation &amp; Shadowing Anomaly Pipeline
              </span>
              <span className="text-[11px] text-gray-400 font-mono">First-Match-Wins Logic</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgAnomaliesId}
                viewBox="0 0 850 300"
                className="w-full max-w-4xl h-auto"
                aria-label="Firewall Rule Base Evaluation and Shadowing Diagram"
              >
                {/* PACKET INGRESS */}
                <rect x="20" y="40" width="130" height="220" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="85" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">INGRESS PACKET</text>
                <rect x="30" y="80" width="110" height="160" rx="5" fill="#082f49" />
                <text x="85" y="100" fill="#bae6fd" fontSize="7.5" fontWeight="bold" textAnchor="middle">Packet Headers:</text>
                <text x="40" y="125" fill="#ffffff" fontSize="7" fontFamily="monospace">Src: 10.10.1.50</text>
                <text x="40" y="145" fill="#ffffff" fontSize="7" fontFamily="monospace">Dst: 198.51.100.25</text>
                <text x="40" y="165" fill="#ffffff" fontSize="7" fontFamily="monospace">Port: 443</text>
                <text x="40" y="185" fill="#ffffff" fontSize="7" fontFamily="monospace">Proto: TCP</text>
                <text x="85" y="225" fill="#f87171" fontSize="7" fontWeight="bold" textAnchor="middle">(Compromised PC!)</text>

                {/* ARROW 1 */}
                <path d="M 150 150 L 190 150" stroke="#38bdf8" strokeWidth="2.5" />

                {/* RULE BASE TABLE */}
                <rect x="190" y="30" width="460" height="240" rx="8" fill="#030712" stroke="#6366f1" strokeWidth="2" />
                <text x="420" y="52" fill="#c7d2fe" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  FIREWALL RULE TABLE (Evaluated Top-to-Bottom)
                </text>

                {/* RULE 1 */}
                <rect x="205" y="65" width="430" height="35" rx="4" fill="#1e1b4b" stroke="#38bdf8" />
                <text x="220" y="86" fill="#38bdf8" fontSize="8" fontWeight="bold">Line 1:</text>
                <text x="260" y="86" fill="#ffffff" fontSize="7.5" fontFamily="monospace">DROP Bogon / Spoofed IPs (0.0.0.0/8, 127.0.0.0/8)</text>
                <text x="600" y="86" fill="#94a3b8" fontSize="7">No Match ➔</text>

                {/* RULE 2 (BROAD ALLOW - CAUSES SHADOWING!) */}
                <rect x="205" y="105" width="430" height="42" rx="4" fill="#881337" stroke="#ef4444" strokeWidth="2" />
                <text x="220" y="125" fill="#fca5a5" fontSize="8" fontWeight="bold">Line 10:</text>
                <text x="265" y="125" fill="#ffffff" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                  PERMIT Source: 10.10.1.0/24 ➔ Dest: ANY:443
                </text>
                <text x="265" y="138" fill="#fca5a5" fontSize="7">
                  ⚡ MATCHED! First-Match-Wins ➔ ACTION: PERMIT EXECUTED!
                </text>

                {/* RULE 3 (SHADOWED DROP - NEVER REACHED!) */}
                <rect x="205" y="152" width="430" height="42" rx="4" fill="#27272a" stroke="#71717a" strokeDasharray="3,3" />
                <text x="220" y="172" fill="#a1a1aa" fontSize="8" fontWeight="bold">Line 25:</text>
                <text x="265" y="172" fill="#a1a1aa" fontSize="7.5" fontFamily="monospace">
                  DROP Source: 10.10.1.50 ➔ Dest: ANY (Compromised Host)
                </text>
                <text x="265" y="185" fill="#f87171" fontSize="7" fontWeight="bold">
                  ❌ SHADOWED &amp; UNREACHABLE! Never executed because Line 10 matched first!
                </text>

                {/* RULE 4 (IMPLICIT DENY ALL) */}
                <rect x="205" y="200" width="430" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="220" y="222" fill="#34d399" fontSize="8" fontWeight="bold">Line 999:</text>
                <text x="270" y="222" fill="#ffffff" fontSize="7.5" fontFamily="monospace">
                  DROP ANY ➔ ANY (Implicit Catch-All Default-Deny)
                </text>

                {/* OUTCOME ARROW */}
                <path d="M 650 126 L 690 126" stroke="#ef4444" strokeWidth="2.5" />

                {/* FLAWED EGRESS RESULT */}
                <rect x="690" y="80" width="140" height="140" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="760" y="105" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">SECURITY BREACH!</text>
                <text x="760" y="130" fill="#ffffff" fontSize="7.5" textAnchor="middle">Attacker Exfiltrates</text>
                <text x="760" y="145" fill="#ffffff" fontSize="7.5" textAnchor="middle">Data via Port 443</text>
                <text x="760" y="185" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="middle">Fix: Move Line 25</text>
                <text x="760" y="198" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="middle">ABOVE Line 10!</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: ANOMALIES INSPECTOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: The 4 Dangerous Firewall Rule-Base Anomalies
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms, code signatures, security risks, and engineering solutions for each anomaly.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentAnomaly.badgeColor)}>
              {currentAnomaly.severity}
            </span>
          </div>

          {/* Anomaly Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(ruleAnomalies).map((a) => (
              <button
                key={a.key}
                onClick={() => setSelectedAnomalyKey(a.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedAnomalyKey === a.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {a.title}
              </button>
            ))}
          </div>

          {/* Active Anomaly Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentAnomaly.title}
                </h3>
                <span className="text-gray-400 font-sans">Risk Assessment: {currentAnomaly.severity}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentAnomaly.badgeColor)}>
                Active Anomaly
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Flaw Description &amp; Behavioral Impact:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentAnomaly.description}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                📄 Concrete Configuration Example:
              </span>
              <pre className="text-gray-200 font-mono text-xs whitespace-pre-wrap">{currentAnomaly.codeSnippet}</pre>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                🔧 Engineering Remediation:
              </span>
              <p className="text-emerald-200 leading-relaxed">{currentAnomaly.engineeringFix}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE RULE ORDERING SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Rule Ordering &amp; First-Match-Wins Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Toggle between Flawed Ordering (causing shadowing) and Optimized Ordering to observe the difference in packet action.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Rule Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Simulated Traffic Flow:</label>
              <select
                value={selectedTrafficFlow}
                onChange={(e) => setSelectedTrafficFlow(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(trafficFlows).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Rule-Base Ordering Structure:</label>
              <button
                onClick={() => setRuleOrderMode(ruleOrderMode === "flawed_order" ? "optimized_order" : "flawed_order")}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  ruleOrderMode === "optimized_order"
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              >
                {ruleOrderMode === "optimized_order" ? "✔ Optimized Order (Specific Above General)" : "⚠️ Flawed Order (Subnet Above Host Drop)"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Default Policy Model:</label>
              <button
                onClick={() => setDefaultDenyEnabled(!defaultDenyEnabled)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  defaultDenyEnabled
                    ? "bg-sky-950/80 text-sky-300 border-sky-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              >
                {defaultDenyEnabled ? "✔ Default-Deny (Catch-All Drop)" : "❌ Default-Allow (Blacklist Flaw)"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Ingress Flow:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentFlow.src} ➔ {currentFlow.dst}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                ruleOrderMode === "optimized_order" ? currentFlow.optimizedColor : currentFlow.flawedColor
              )}>
                {ruleOrderMode === "optimized_order" ? currentFlow.optimizedResult : currentFlow.flawedResult}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Rule Evaluation Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentFlow.analysis}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: RULE ANALYZER CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Static Rule-Base Analyzer &amp; Anomaly Detector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python implementation detecting Rule Shadowing, Redundancy, Overly Broad Any/Any rules, and zero-hit orphaned rules.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              rule_analyzer.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="rule_analyzer.py"
            highlightLines={[25, 41, 55, 68]}
          />
        </section>

        {/* STUDIO 3: PERFORMANCE & PRUNING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Rule-Base CPU Cycle Reduction &amp; Pruning Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate packet lookup latency savings, rule reduction from zero-hit pruning, and 5-year operational audit cost savings in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Optimization Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Total Legacy Rules:</span>
                <span className="text-sky-400 font-bold">{totalRuleCount} Rules</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={totalRuleCount}
                onChange={(e) => setTotalRuleCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Zero-Hit Orphaned Rules:</span>
                <span className="text-purple-400 font-bold">{zeroHitRulePercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={zeroHitRulePercentage}
                onChange={(e) => setZeroHitRulePercentage(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Traffic-Frequency Sorting:</span>
                <span className="text-emerald-400 font-bold">{trafficFrequencySorted ? "Active" : "Unsorted"}</span>
              </div>
              <button
                onClick={() => setTrafficFrequencySorted(!trafficFrequencySorted)}
                className={clsx(
                  "w-full p-1.5 rounded text-xs font-semibold border transition-all",
                  trafficFrequencySorted
                    ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {trafficFrequencySorted ? "✔ Traffic-Frequency Sorted (90% hits top 5)" : "Unsorted Linear List"}
              </button>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Avg Comparisons Per Packet</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedRuleMetrics.avgComparisonsPerPacket}</div>
              <span className="text-[10px] text-gray-500 block">Packet Lookup: {calculatedRuleMetrics.packetLookupLatencyUs} µs</span>
            </div>

            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Pruned Orphaned Rules</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedRuleMetrics.prunedRules} Rules</div>
              <span className="text-[10px] text-gray-500 block">Active Clean Rules: {calculatedRuleMetrics.activeRules}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Operational Savings</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedRuleMetrics.auditSavingsLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Reduced Audit &amp; CPU Costs</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL SOC TABLETOP DRILL */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative regional response scenarios authored by Sukanta Hui and the student cyber engineering team.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              WB Defense Lab
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(regionalDrills).map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrillId(d.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeDrillId === d.id
                    ? "bg-sky-600/20 text-sky-300 border-sky-500/60"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Scope: {currentDrill.auditScope}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                Rule Base Clean
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Detected Security Vulnerability:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Rule-Base Audit &amp; Optimization:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Default-Deny (whitelisting) is mandatory for enterprise security; Default-Allow is obsolete.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>The "Implicit Deny All" catch-all rule must ALWAYS reside at the absolute bottom of the rule table.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Firewalls evaluate rules sequentially top-to-bottom on a "First-Match-Wins" basis.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Rule Shadowing occurs when a broad rule above prevents a specific rule below from ever executing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Order high-frequency traffic rules at the top of the permit section to optimize CPU throughput.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Quarterly zero-hit-count audits prune orphaned rules for decommissioned servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Firewall Rule-Base Design: Default-Deny vs Default-Allow FAQs"
            subtitle="30 In-depth Practice Questions & Rule Hygiene Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Firewall Rule-Base Design: Default-Deny vs Default-Allow (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 9 of Module 005_001! In this lesson, we explored the mathematical precision required for enterprise Firewall Rule-Base Design. Never forget that a firewall is only as strong as its rule table! Always enforce Default-Deny with an explicit 'Implicit Deny All' rule at the bottom. Understand the First-Match-Wins evaluation mechanic: placing a broad permit rule above a specific drop rule causes dangerous Rule Shadowing, leaving attackers free to traverse the perimeter. Perform quarterly hit-count recertifications to prune orphaned rules from decommissioned servers, and sort high-volume permit rules near the top of the table to minimize CPU lookup latency. In Topic 10, we will compare Web Application Firewalls (WAF) vs Network Firewalls!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic9;
