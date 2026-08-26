import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio Interactive State
  const [activeTab, setActiveTab] = useState("nines");

  // TAB 1: Nines Calculator State
  const [selectedNine, setSelectedNine] = useState("99.99");

  const ninesData = {
    "99.0": { label: "Two Nines (99%)", yearly: "3.65 days", monthly: "7.31 hours", weekly: "1.68 hours", daily: "14.4 mins", tier: "Basic Internal Tools", cost: "₹1,50,000" },
    "99.9": { label: "Three Nines (99.9%)", yearly: "8.76 hours", monthly: "43.8 mins", weekly: "10.1 mins", daily: "1.44 mins", tier: "Standard Enterprise SaaS (RBI Minimum)", cost: "₹4,50,000" },
    "99.99": { label: "Four Nines (99.99%)", yearly: "52.56 mins", monthly: "4.38 mins", weekly: "1.01 mins", daily: "8.64 secs", tier: "FinTech & e-Commerce High-Traffic", cost: "₹9,80,000" },
    "99.999": { label: "Five Nines (99.999%)", yearly: "5.26 mins", monthly: "26.3 secs", weekly: "6.05 secs", daily: "864 ms", tier: "Core Banking UPI Switch & Telecom Carriers", cost: "₹18,50,000" },
    "99.9999": { label: "Six Nines (99.9999%)", yearly: "31.5 secs", monthly: "2.63 secs", weekly: "605 ms", daily: "86.4 ms", tier: "Air Traffic Control & Defense Systems", cost: "₹35,00,000" },
  };

  // TAB 2: Failover State
  const [clusterMode, setClusterMode] = useState("active-active"); // "active-active" | "active-passive"
  const [nodeAAlive, setNodeAAlive] = useState(true);
  const [nodeBAlive, setNodeBAlive] = useState(true);

  // TAB 3: RTO/RPO Planner State
  const [targetRTO, setTargetRTO] = useState(1); // Hours
  const [targetRPO, setTargetRPO] = useState(5); // Minutes

  // TAB 4: Load Balancer & Circuit Breaker State
  const [lbAlgorithm, setLbAlgorithm] = useState("round-robin");
  const [circuitOpen, setCircuitOpen] = useState(false);
  const [trafficVolume, setTrafficVolume] = useState(1500); // Req/sec

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col space-y-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 rounded-full text-xs font-semibold text-amber-300 uppercase tracking-widest">
              Course Module 002_001 • Topic 5
            </span>
            <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-600/60 rounded-full text-xs font-semibold text-emerald-300">
              Availability &amp; Uptime Engineering
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Availability: System Accessibility and Uptime
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Master the third pillar of the CIA triad: ensuring uninterrupted access to vital systems, databases, and networks.
            Explore mathematical High Availability (MTBF, MTTR, High Availability 'Nines'), Active-Active vs Active-Passive failover,
            Disaster Recovery objectives (RTO &amp; RPO), BGP Anycast routing, Circuit Breakers, and Reserve Bank of India (RBI) 99.9% uptime compliance.
          </p>
        </div>

        {/* Section 1: Availability Pillars Grid */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-amber-400">
            1. Foundations of High Availability &amp; System Resilience
          </h2>
          <p className="text-slate-300 leading-relaxed">
            High Availability (HA) guarantees continuous operational uptime through redundancy, fault tolerance, and automated self-healing:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-amber-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">⏱️</span>
                <h3 className="text-sm font-bold text-white">The "Nines" of Uptime</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Metric defining allowed yearly downtime: from 99.9% (8.76 hrs) to 99.999% (5.26 mins) for mission-critical core switches.
              </p>
              <span className="text-[10px] text-amber-400 font-semibold uppercase">MTBF / (MTBF + MTTR)</span>
            </div>

            {/* Box 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-amber-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🔄</span>
                <h3 className="text-sm font-bold text-white">Redundancy Models</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Active-Active concurrent load distribution vs Active-Passive standby failover with automated heartbeat monitors.
              </p>
              <span className="text-[10px] text-amber-400 font-semibold uppercase">N+1 &amp; 2N Dual Power</span>
            </div>

            {/* Box 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-amber-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🎯</span>
                <h3 className="text-sm font-bold text-white">RTO &amp; RPO Metrics</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Recovery Time Objective (maximum tolerable downtime) and Recovery Point Objective (maximum tolerable data loss).
              </p>
              <span className="text-[10px] text-amber-400 font-semibold uppercase">Disaster Recovery Targets</span>
            </div>

            {/* Box 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-amber-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">⚡</span>
                <h3 className="text-sm font-bold text-white">Microservice Resilience</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Circuit Breakers, BGP Anycast routing, Rate Limiting, and Horizontal Pod Autoscaling (HPA) absorbing load surges.
              </p>
              <span className="text-[10px] text-amber-400 font-semibold uppercase">Self-Healing Infrastructure</span>
            </div>
          </div>
        </div>

        {/* Section 2: Semantic SVG Diagram */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-amber-400">
            2. High Availability Multi-Region Active-Active Architecture Grid
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Architectural schematic illustrating global Anycast routing, multi-AZ load balancing, and synchronous cross-region database replication:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex justify-center items-center overflow-x-auto">
            <svg viewBox="0 0 840 240" className="w-full max-w-4xl h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Global Anycast Layer */}
              <rect x="20" y="20" width="180" height="200" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <text x="110" y="45" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">ANYCAST ROUTING</text>
              <text x="35" y="80" fill="#c7d2fe" fontSize="9">• BGP Global Routing</text>
              <text x="35" y="115" fill="#c7d2fe" fontSize="9">• DDoS Edge Scrubbing</text>
              <text x="35" y="150" fill="#c7d2fe" fontSize="9">• Geo-DNS Traffic Director</text>
              <text x="35" y="185" fill="#c7d2fe" fontSize="9">• CDN Static Caching</text>

              {/* Arrow Indicator */}
              <path d="M 210 120 L 260 120" stroke="#6366f1" strokeWidth="3" />

              {/* Region 1: Kolkata Primary */}
              <rect x="270" y="20" width="240" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="390" y="40" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">REGION 1 (KOLKATA DC - ACTIVE)</text>
              <text x="285" y="65" fill="#a7f3d0" fontSize="8.5">• Load Balancer + 12 K8s Pods</text>
              <text x="285" y="85" fill="#a7f3d0" fontSize="8.5">• Master DB (Synchronous WAL Sync)</text>

              {/* Region 2: Hyderabad Secondary */}
              <rect x="270" y="130" width="240" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="390" y="150" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">REGION 2 (HYDERABAD DC - ACTIVE)</text>
              <text x="285" y="175" fill="#a7f3d0" fontSize="8.5">• Load Balancer + 12 K8s Pods</text>
              <text x="285" y="195" fill="#a7f3d0" fontSize="8.5">• Live Sync Replica (RPO = 0 sec)</text>

              {/* Sync Arrow between Regions */}
              <path d="M 390 110 L 390 130" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />

              {/* Arrow Indicator */}
              <path d="M 520 120 L 570 120" stroke="#10b981" strokeWidth="3" />

              {/* SLA & Compliance Column */}
              <rect x="580" y="20" width="240" height="200" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="700" y="45" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">AVAILABILITY METRICS</text>
              <text x="595" y="80" fill="#e2e8f0" fontSize="9">✅ 99.999% SLA Uptime</text>
              <text x="595" y="115" fill="#e2e8f0" fontSize="9">✅ RTO &lt; 10 Seconds</text>
              <text x="595" y="150" fill="#e2e8f0" fontSize="9">✅ RPO = 0 Seconds (Zero Loss)</text>
              <text x="595" y="185" fill="#e2e8f0" fontSize="9">✅ RBI 99.9% Mandate Compliant</text>
            </svg>
          </div>
        </div>

        {/* Section 3: Interactive High Availability Studio */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-amber-400">
            3. Interactive High Availability &amp; Resilience Simulator Studio
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Calculate High Availability "Nines" downtime limits, simulate Active-Active vs Active-Passive failover,
            configure Disaster Recovery RTO/RPO targets, and explore Load Balancer Circuit Breakers:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-6">
            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab("nines")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "nines"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                1. "Nines" SLA Calculator
              </button>
              <button
                onClick={() => setActiveTab("failover")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "failover"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                2. Cluster Failover Simulator
              </button>
              <button
                onClick={() => setActiveTab("dr")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "dr"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                3. RTO &amp; RPO Recovery Planner
              </button>
              <button
                onClick={() => setActiveTab("lb")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "lb"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              &gt;
                4. Load Balancer &amp; Circuit Breaker
              </button>
            </div>

            {/* TAB 1: Nines Calculator */}
            {activeTab === "nines" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Select Target High Availability Uptime SLA:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {Object.keys(ninesData).map((nineKey) => (
                      <button
                        key={nineKey}
                        onClick={() => setSelectedNine(nineKey)}
                        className={clsx(
                          "p-3 rounded-lg border text-xs font-bold transition-all flex flex-col items-center justify-center",
                          selectedNine === nineKey
                            ? "bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-600/30"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600"
                        )}
                      &gt;
                        <span className="text-sm">{nineKey}%</span>
                        <span className="text-[10px] text-slate-400 font-normal">{ninesData[nineKey].label.split(" ")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Max Yearly Downtime</span>
                    <span className="text-lg font-mono font-bold text-amber-400">{ninesData[selectedNine].yearly}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Max Monthly Downtime</span>
                    <span className="text-lg font-mono font-bold text-amber-400">{ninesData[selectedNine].monthly}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Target Application Tier</span>
                    <span className="text-xs font-semibold text-slate-200">{ninesData[selectedNine].tier}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Est. Architecture Budget</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">{ninesData[selectedNine].cost}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Cluster Failover Simulator */}
            {activeTab === "failover" && (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold text-slate-400 uppercase">Clustering Strategy:</span>
                  <button
                    onClick={() => setClusterMode("active-active")}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      clusterMode === "active-active" ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-400"
                    )}
                  &gt;
                    Active-Active (Simultaneous Load)
                  </button>
                  <button
                    onClick={() => setClusterMode("active-passive")}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      clusterMode === "active-passive" ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-400"
                    )}
                  &gt;
                    Active-Passive (Hot Standby)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Node A */}
                  <div
                    className={clsx(
                      "p-4 rounded-xl border flex flex-col space-y-2",
                      nodeAAlive ? "bg-slate-950 border-emerald-700" : "bg-rose-950/40 border-rose-700"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">Server Node A (Kolkata)</span>
                      <span
                        className={clsx(
                          "text-xs px-2 py-0.5 rounded font-bold",
                          nodeAAlive ? "bg-emerald-950 text-emerald-300" : "bg-rose-950 text-rose-300"
                        )}
                      >
                        {nodeAAlive ? "HEALTHY" : "CRASHED"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Traffic Share:{" "}
                      {clusterMode === "active-active"
                        ? nodeAAlive && nodeBAlive ? "50% (750 req/s)" : nodeAAlive ? "100% (1,500 req/s)" : "0%"
                        : nodeAAlive ? "100% (Primary Active)" : "0% (Failed Over)"}
                    </p>
                    <button
                      onClick={() => setNodeAAlive(!nodeAAlive)}
                      className="mt-2 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                    &gt;
                      {nodeAAlive ? "💥 Kill Node A" : "🔄 Revive Node A"}
                    </button>
                  </div>

                  {/* Node B */}
                  <div
                    className={clsx(
                      "p-4 rounded-xl border flex flex-col space-y-2",
                      nodeBAlive ? "bg-slate-950 border-emerald-700" : "bg-rose-950/40 border-rose-700"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">Server Node B (Barrackpore)</span>
                      <span
                        className={clsx(
                          "text-xs px-2 py-0.5 rounded font-bold",
                          nodeBAlive ? "bg-emerald-950 text-emerald-300" : "bg-rose-950 text-rose-300"
                        )}
                      >
                        {nodeBAlive ? "HEALTHY" : "CRASHED"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Traffic Share:{" "}
                      {clusterMode === "active-active"
                        ? nodeAAlive && nodeBAlive ? "50% (750 req/s)" : nodeBAlive ? "100% (1,500 req/s)" : "0%"
                        : nodeAAlive ? "0% (Hot Standby Syncing)" : nodeBAlive ? "100% (Promoted Primary)" : "0%"}
                    </p>
                    <button
                      onClick={() => setNodeBAlive(!nodeBAlive)}
                      className="mt-2 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                    &gt;
                      {nodeBAlive ? "💥 Kill Node B" : "🔄 Revive Node B"}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <span className="font-bold text-slate-300">Cluster Status: </span>
                  {!nodeAAlive && !nodeBAlive ? (
                    <span className="text-rose-400 font-bold">⛔ TOTAL OUTAGE: All server nodes are offline!</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">
                      ✅ OPERATIONAL: Load balancer successfully routing 1,500 requests/sec with zero customer downtime.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: RTO & RPO Recovery Planner */}
            {activeTab === "dr" && (
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">
                      Target RTO (Recovery Time Objective): {targetRTO} Hours
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="24"
                      step="1"
                      value={targetRTO}
                      onChange={(e) => setTargetRTO(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    /&gt;
                    <span className="text-[11px] text-slate-400">
                      {targetRTO === 0 ? "Instantaneous (< 10 sec)" : `Max allowed outage duration: ${targetRTO} hour(s)`}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">
                      Target RPO (Recovery Point Objective): {targetRPO} Minutes
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      step="5"
                      value={targetRPO}
                      onChange={(e) => setTargetRPO(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    /&gt;
                    <span className="text-[11px] text-slate-400">
                      {targetRPO === 0 ? "Zero Data Loss (Synchronous DB Mirroring)" : `Max allowed data loss: ${targetRPO} minute(s)`}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase">Recommended Disaster Recovery Strategy:</span>
                  <p className="text-sm font-semibold text-white">
                    {targetRTO === 0 && targetRPO === 0
                      ? "Multi-Region Active-Active Synchronous Mirrored Cluster"
                      : targetRTO &le; 2 && targetRPO <= 15
                      ? "Hot Standby Multi-AZ Automated Failover Grid"
                      : targetRTO <= 8
                      ? "Warm Standby with Hourly Transaction Log Shipping"
                      : "Cold Standby / Nightly Immutable Backup Restoration"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Estimated Implementation Budget in West Bengal:{" "}
                    <span className="text-emerald-400 font-bold">
                      {targetRTO === 0 && targetRPO === 0 ? "₹18,00,000" : targetRTO &le; 2 ? "₹9,50,000" : "₹4,20,000"}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Load Balancer & Circuit Breaker */}
            {activeTab === "lb" && (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCircuitOpen(!circuitOpen)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      circuitOpen ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
                    )}
                  &gt;
                    {circuitOpen ? "⚡ Circuit Breaker: OPEN (Tripped)" : "🛡️ Circuit Breaker: CLOSED (Healthy)"}
                  </button>
                  <span className="text-xs text-slate-400">
                    State: {circuitOpen ? "Downstream payment API down; serving cached fallback" : "Normal traffic pass-through"}
                  </span>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Load Balancing Algorithm:
                  </label>
                  <div className="flex space-x-2">
                    {["round-robin", "least-connections", "ip-hash"].map((alg) => (
                      <button
                        key={alg}
                        onClick={() => setLbAlgorithm(alg)}
                        className={clsx(
                          "px-3 py-1.5 rounded text-xs font-bold capitalize transition-all",
                          lbAlgorithm === alg ? "bg-amber-600 text-white" : "bg-slate-950 text-slate-400"
                        )}
                      &gt;
                        {alg.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
                  <p className="text-slate-300">
                    Load Balancer Algorithm: <span className="text-amber-400 uppercase font-bold">{lbAlgorithm}</span>
                  </p>
                  <p className="text-slate-300 mt-1">
                    Circuit Status:{" "}
                    <span className={circuitOpen ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                      {circuitOpen ? "TRIPPED (Preventing thread pool exhaustion)" : "NORMAL (Serving live requests)"}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Four Bengal Case Studies */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-amber-400">
            4. Real-World High Availability Case Studies in West Bengal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  1. SCADA Multi-AZ Active-Active Failover Grid
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-700 font-semibold">
                  ₹8,50,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Debangshu &bull; <strong>Location:</strong> Barrackpore Steel Plant
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu designed an Active-Active SCADA monitoring grid across two availability zones for an
                industrial manufacturing facility in Barrackpore. When a sudden power transformer spike took down
                Zone-A, the NGINX Layer-7 load balancer automatically shifted 100% of telemetry traffic to Zone-B
                within 350 milliseconds without losing a single sensor data frame, backed by an ₹8,50,000 HA infrastructure budget.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  2. E-Commerce Surge Autoscaling &amp; Circuit Breaker
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-700 font-semibold">
                  ₹5,80,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Mahima &bull; <strong>Location:</strong> Ichapur Web Operations
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mahima architected the backend for a high-traffic regional e-commerce portal in Ichapur during the
                Durga Puja festive sale. By deploying Kubernetes Horizontal Pod Autoscaling (scaling from 4 to 28 pods)
                and implementing Circuit Breakers on the payment recommendation engine, the platform achieved 99.99%
                uptime while processing ₹1,20,00,000 in transactions, supported by a ₹5,80,000 cloud resilience budget.
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  3. FinTech UPI 99.999% Five-Nines Core Switch
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-700 font-semibold">
                  ₹18,00,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Mamata &bull; <strong>Location:</strong> Kolkata Banking Center
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mamata spearheaded the high-availability core payment switch for a Kolkata financial institution
                processing 12,00,000 daily UPI transactions. Implementing synchronous multi-region database replication
                between Kolkata and Hyderabad achieved an RPO of 0 seconds and an RTO of under 10 seconds, meeting
                strict RBI 99.9% uptime mandates under a ₹18,00,000 enterprise banking deployment budget.
              </p>
            </div>

            {/* Case Study 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  4. University Hospital EHR Multi-ISP Redundancy
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-700 font-semibold">
                  ₹6,20,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Abhronila &bull; <strong>Location:</strong> Jadavpur Medical Campus
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Abhronila configured dual-ISP BGP multihoming with automated SD-WAN link failover and local N+1 battery
                UPS storage for an Electronic Health Records (EHR) server farm in Jadavpur. When an underground fiber line
                was severed by metro construction, traffic seamlessly rerouted to the secondary microwave link with zero
                packet loss, funded by a ₹6,20,000 emergency medical infrastructure grant.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Common Pitfalls */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-amber-400">
            5. Common Pitfalls &amp; Engineering Guidance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center space-x-2">
                <span>⚠️ Untested Disaster Recovery Procedures</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A disaster recovery plan that has not been tested in live simulations over the past 6 months is guaranteed
                to fail during a real-world outage due to configuration drift and outdated credentials.
              </p>
            </div>
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span>💡 Eliminate SPOFs &amp; Enforce RBI Mandates</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deploy Active-Active multi-AZ clusters, automate health checks, enforce near-zero RTO/RPO metrics, and
                adhere to RBI 99.9% uptime directives for payment switches.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Student Revision Checklist */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Student Revision Checklist:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="text-amber-400">✓</span>
              <span>Define Availability and calculate MTBF / (MTBF + MTTR).</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-amber-400">✓</span>
              <span>Calculate annual downtime for 99.9% (Three Nines) vs 99.999% (Five Nines).</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-amber-400">✓</span>
              <span>Differentiate between Recovery Time Objective (RTO) and Recovery Point Objective (RPO).</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-amber-400">✓</span>
              <span>Contrast Active-Active clustering with Active-Passive failover.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-amber-400">✓</span>
              <span>Explain how Circuit Breakers and BGP Anycast preserve system availability.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-amber-400">✓</span>
              <span>State RBI uptime directives (99.9% minimum) and budget in Indian Rupees (₹).</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Availability: System Accessibility and Uptime FAQs" questions={questions} />

        {/* Teacher's Note Section */}
        <Teacher
          note={
            "Availability is the heartbeat of operational trust. Eliminate every Single Point of Failure (SPOF), build Active-Active redundancy, automate health checks, enforce strict RTO/RPO targets, conduct regular DR drills, comply with RBI 99.9% uptime directives, and budget in Indian Rupees (₹)!"
          }
        />

        {/* Printable Note Component */}
        <PlainTextPrint
          content={noteText}
          title="Availability: System Accessibility and Uptime"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic6_note.txt"
        />
      </div>
    </div>
  );
};

export default Topic5;
