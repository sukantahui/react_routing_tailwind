import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic5_files/tap_vs_span.py?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgTripleArchId = useId();
  const svgNpbPipelineId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("packet_fidelity");

  // Studio 2: Live Sensor Deployment State
  const [selectedCaptureMode, setSelectedCaptureMode] = useState("optical_tap"); // "optical_tap", "switch_span", "inline_ips"
  const [linkUtilizationPercent, setLinkUtilizationPercent] = useState(85); // 20% to 100% full-duplex load
  const [switchCpuLoadPercent, setSwitchCpuLoadPercent] = useState(88); // 10% to 95% CPU

  // Studio 3: Sizing & Optical Power Budget Calculations
  const [opticalSplitRatio, setOpticalSplitRatio] = useState("70_30"); // "70_30", "50_50"
  const [monitoredLinksCount, setMonitoredLinksCount] = useState(16); // 4 to 64 fiber links
  const [laserTxPowerDbm, setLaserTxPowerDbm] = useState(-2.0); // -10.0 to +2.0 dBm

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_optical_core");

  // Comparison Database for Studio 1
  const deploymentDimensions = {
    packet_fidelity: {
      key: "packet_fidelity",
      title: "1. Packet Fidelity & Error Frame Capture",
      category: "Data Integrity & Forensics",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      tapDetail: "100% full-duplex line-rate fidelity. Captures raw Layer 1 signals including runt packets and bad CRC frames.",
      spanDetail: "Filtered capture. Switch MAC ASICs discard corrupt CRC frames and Layer 1 errors before software mirroring.",
      inlineDetail: "Inspects and normalizes live frames; may strip, fragment, or rewrite headers during inline traversal.",
      verdict: "Hardware TAPs provide the highest forensic fidelity for capturing stealthy malformed packet attacks."
    },
    oversubscription_risk: {
      key: "oversubscription_risk",
      title: "2. Oversubscription & Packet Drop Dynamics",
      category: "Throughput & Capacity",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      tapDetail: "0% packet drop. Dedicated independent optical channels for TX and RX transmit at full physical wire speed.",
      spanDetail: "Severe packet drops (up to 50%+). Mirroring 10G TX + 10G RX (20G) to a single 10G SPAN port overflows switch buffers.",
      inlineDetail: "Zero drop during normal load; packet queueing latency occurs if appliance CPU is saturated.",
      verdict: "Switch SPAN ports create massive unmonitored blind spots during peak enterprise traffic hours."
    },
    switch_overhead: {
      key: "switch_overhead",
      title: "3. Production Switch CPU & Memory Impact",
      category: "Network Infrastructure Health",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      tapDetail: "0% switch impact. Completely independent, unpowered passive optical device with zero electronic coupling.",
      spanDetail: "Consumes 10%–25% switch CPU and backplane replication bandwidth; can degrade production routing.",
      inlineDetail: "0% switch impact. Appliance processes traffic using its own dedicated multi-core CPUs/ASICs.",
      verdict: "Hardware TAPs guarantee zero performance degradation on mission-critical core routers and switches."
    },
    failure_behavior: {
      key: "failure_behavior",
      title: "4. Failure Mode & Network High Availability",
      category: "Resilience & Uptime",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      tapDetail: "100% Fail-Safe. Passive fused glass prism requires no electricity; production light passes through uninterrupted.",
      spanDetail: "100% Fail-Safe. If monitoring software dies, switch production traffic continues normal forwarding.",
      inlineDetail: "Requires Fail-Open Hardware Optical Bypass Switches to snap closed within 8ms during power loss.",
      verdict: "Passive optical TAPs eliminate all single points of physical network failure."
    }
  };

  // Studio 2: Live Deployment Mode Fidelity Evaluation
  const currentFidelityStatus = useMemo(() => {
    const aggregateOfferedGbps = ((10.0 * linkUtilizationPercent) / 100) * 2; // Full-duplex TX+RX

    if (selectedCaptureMode === "optical_tap") {
      return {
        modeName: "Hardware Passive Optical TAP (70/30 Split)",
        dropPercentage: 0.0,
        fidelityRating: "100% (Zero Packet Drop)",
        switchCpuOverhead: "0% (Zero Impact)",
        addedLatency: "0.0 µs",
        badCrcCaptured: "✔ 100% Captured at Layer 1",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        explanation: "Passive fused glass prisms split light directly. Ingested 100% of packets at full line rate with zero latency and zero switch CPU usage."
      };
    } else if (selectedCaptureMode === "switch_span") {
      // SPAN port drops packets when aggregate load > 10.0 Gbps or switch CPU > 80%
      let drop = 0.0;
      if (aggregateOfferedGbps > 10.0) {
        drop = ((aggregateOfferedGbps - 10.0) / aggregateOfferedGbps) * 100;
      }
      if (switchCpuLoadPercent > 80) {
        drop += (switchCpuLoadPercent - 80) * 0.4;
      }
      drop = Math.min(65.0, drop).toFixed(1);

      return {
        modeName: "Switch SPAN / Mirror Port (10 Gbps Destination)",
        dropPercentage: Number(drop),
        fidelityRating: Number(drop) > 5.0 ? `⚠️ DEGRADED (${drop}% Packet Loss!)` : "✔ Acceptable",
        switchCpuOverhead: `+${Math.round(switchCpuLoadPercent * 0.18)}% Switch CPU`,
        addedLatency: "0.0 µs",
        badCrcCaptured: "❌ Discarded by Switch MAC ASIC",
        badgeColor: Number(drop) > 5.0 ? "bg-rose-950 text-rose-300 border-rose-700" : "bg-amber-950 text-amber-300 border-amber-700",
        explanation: `Oversubscription bottleneck: 10G TX + 10G RX offered ${aggregateOfferedGbps.toFixed(1)} Gbps into a single 10G SPAN port, silently dropping ${drop}% of packets!`
      };
    } else {
      // In-Line IPS Mode
      return {
        modeName: "In-Line Active IPS (Bridge Mode with Optical Bypass)",
        dropPercentage: 0.0,
        fidelityRating: "✔ 100% Ingested (Active Dropping Capable)",
        switchCpuOverhead: "0% (Appliance Cores Used)",
        addedLatency: "+18.5 µs",
        badCrcCaptured: "✔ Inspected & Normalized",
        badgeColor: "bg-sky-950 text-sky-300 border-sky-700",
        explanation: "In-line appliance inspects packets before forwarding, enabling active packet drops; hardware optical bypass switch guarantees fail-open reliability."
      };
    }
  }, [selectedCaptureMode, linkUtilizationPercent, switchCpuLoadPercent]);

  // Studio 3: Sizing Calculations
  const calculatedBudgetMetrics = useMemo(() => {
    // Optical insertion loss
    const insertionLossDb = opticalSplitRatio === "70_30" ? 1.8 : 3.4;
    const receivedPowerDbm = (laserTxPowerDbm - insertionLossDb - 3.5).toFixed(2); // Minus fiber attenuation
    const isBudgetHealthy = Number(receivedPowerDbm) > -14.0; // Receiver sensitivity limit

    // 5-Year High-Density TAP & NPB Fabric TCO (INR ₹ Lakhs)
    const tapChassisHardwareLakhs = (monitoredLinksCount * 0.45).toFixed(2);
    const npbPacketBrokerLakhs = (12.0 + (monitoredLinksCount / 8) * 3.5).toFixed(2);
    const fiveYearTcoLakhs = (Number(tapChassisHardwareLakhs) + Number(npbPacketBrokerLakhs) + 5.0).toFixed(2);

    return {
      insertionLossDb,
      receivedPowerDbm,
      isBudgetHealthy,
      fiveYearTcoLakhs
    };
  }, [opticalSplitRatio, monitoredLinksCount, laserTxPowerDbm]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_optical_core: {
      id: "barrackpore_optical_core",
      title: "Barrackpore Municipal Optical Core Backbone TAP Upgrade",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      captureFabric: "70/30 High-Density Optical TAPs + Symmetrical NPB Load Balancer",
      threatScenario: "Legacy switch SPAN ports were dropping 38% of mirrored packets during morning peak hours, allowing a stealthy SQL injection exploit to slip past undetected.",
      solution: "Sukanta Hui and Mamata installed passive 70/30 optical TAPs across all 16 core links, feeding an active Network Packet Broker with 5-tuple symmetrical hashing across an 8-node IDS cluster.",
      outcome: "Mirrored packet drops dropped from 38% to exactly 0.00%; 100% forensic pcap evidence captured; passed CERT-In audit with zero non-conformities."
    },
    saltlake_datacenter_npb: {
      id: "saltlake_datacenter_npb",
      title: "Salt Lake Sector V State Data Center 40 Gbps Traffic Fabric",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      captureFabric: "Modular 40G LC Optical Patch Panels with BPF Video Filtering",
      threatScenario: "Heavy internal backup streams and streaming video saturated IDS sensor memory buffers, creating severe packet processing delays.",
      solution: "Abhronila, Susmita, and Debangshu configured hardware BPF filters on the NPB to strip streaming media and truncate packet payloads to 128 bytes (headers only).",
      outcome: "Sensor CPU utilization decreased by 62%; zero-day detection throughput quadrupled; full DPDP Act compliance verified."
    }
  };

  const currentDimension = deploymentDimensions[selectedDimensionKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 5</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Inline vs Tap / SPAN Port Deployment Modes
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the physical and logical architectures of network packet capture. Understand <strong className="text-sky-400">Hardware Optical TAPs (70/30 Split)</strong>, defeating <strong className="text-emerald-400">Switch SPAN Oversubscription Drops</strong>, <strong className="text-purple-400">Network Packet Brokers (NPB)</strong>, and <strong className="text-amber-400">Fail-Open Optical Bypass Relays</strong>.
          </p>
        </header>

        {/* SECTION 1: TRIPLE DEPLOYMENT ARCHITECTURES SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Physical Architectures: Optical TAP vs Switch SPAN vs In-Line IPS
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing Layer 1 optical splitting, Layer 2 switch port mirroring, and In-line active inspection with hardware bypass.
            </p>
          </div>

          {/* SVG 1: TRIPLE ARCHITECTURES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Passive Optical TAP ➔ Switch SPAN Port ➔ In-Line IPS with Optical Bypass
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Layer 1 vs Layer 2 vs In-Line</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgTripleArchId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Network Sensor Deployment Architectures Diagram"
              >
                {/* 1. HARDWARE OPTICAL TAP */}
                <rect x="20" y="20" width="260" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="150" y="45" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  1. HARDWARE OPTICAL TAP
                </text>

                <rect x="35" y="65" width="230" height="40" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="150" y="89" fill="#e0f2fe" fontSize="8" textAnchor="middle">Fiber Cable ──[Prism]──&gt; Target</text>

                <path d="M 150 105 L 150 140" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3,3" />
                <text x="155" y="125" fill="#38bdf8" fontSize="7" fontWeight="bold">30% Light</text>

                <rect x="35" y="140" width="230" height="105" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="150" y="165" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle">Passive NIDS Sensor</text>
                <text x="150" y="183" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">✔ 0% Packet Drop (Line-Rate)</text>
                <text x="150" y="201" fill="#bae6fd" fontSize="7.5" textAnchor="middle">✔ Captures Bad CRC Frames</text>
                <text x="150" y="219" fill="#34d399" fontSize="7.5" textAnchor="middle">✔ 0% Switch CPU Overhead</text>

                {/* 2. SWITCH SPAN PORT */}
                <rect x="295" y="20" width="260" height="240" rx="8" fill="#030712" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="425" y="45" fill="#f59e0b" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  2. SWITCH SPAN / MIRROR PORT
                </text>

                <rect x="310" y="65" width="230" height="40" rx="5" fill="#451a03" stroke="#b45309" />
                <text x="425" y="89" fill="#fef3c7" fontSize="8" textAnchor="middle">Switch ASIC ──[Copy]──&gt; Port</text>

                <path d="M 425 105 L 425 140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                <text x="430" y="125" fill="#f59e0b" fontSize="7" fontWeight="bold">Software</text>

                <rect x="310" y="140" width="230" height="105" rx="6" fill="#1c1917" stroke="#f59e0b" strokeWidth="1" />
                <text x="425" y="165" fill="#f59e0b" fontSize="8.5" fontWeight="bold" textAnchor="middle">SPAN Monitor Port</text>
                <text x="425" y="183" fill="#fca5a5" fontSize="7.5" fontWeight="bold" textAnchor="middle">⚠️ Drops on Oversubscription</text>
                <text x="425" y="201" fill="#fca5a5" fontSize="7.5" textAnchor="middle">❌ Discards Bad CRC Frames</text>
                <text x="425" y="219" fill="#fde68a" fontSize="7.5" textAnchor="middle">⚠️ +15% Switch CPU Load</text>

                {/* 3. IN-LINE ACTIVE IPS */}
                <rect x="570" y="20" width="260" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="700" y="45" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  3. IN-LINE ACTIVE IPS
                </text>

                <rect x="585" y="65" width="230" height="75" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="700" y="90" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">INLINE INSPECTION ENGINE</text>
                <text x="700" y="108" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">🛡️ Active Dropping &amp; TCP RST</text>
                <text x="700" y="126" fill="#fde68a" fontSize="7.5" textAnchor="middle">Added Latency: +18.5 µs</text>

                <rect x="585" y="150" width="230" height="95" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="700" y="175" fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">OPTICAL BYPASS SWITCH</text>
                <text x="700" y="195" fill="#a5b4fc" fontSize="7.5" textAnchor="middle">Fail-Open Mechanical Relay</text>
                <text x="700" y="213" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">✔ Zero Downtime on Power Loss</text>
                <text x="700" y="231" fill="#e0e7ff" fontSize="7" textAnchor="middle">Snaps closed within 8ms</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: TAP VS SPAN VS INLINE COMPARISON MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: TAP vs SPAN vs In-Line Architectural Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the engineering trade-offs in packet capture fidelity, oversubscription drops, switch CPU overhead, and failure modes.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentDimension.badgeColor)}>
              {currentDimension.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(deploymentDimensions).map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDimensionKey(d.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedDimensionKey === d.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Comparison Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDimension.title}</h3>
                <span className="text-gray-400">Category: {currentDimension.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentDimension.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
                  📡 1. Optical TAP (Pass):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.tapDetail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-950/80 space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] block">
                  🔄 2. Switch SPAN (Mirror):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.spanDetail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-950/80 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  🛡️ 3. In-Line IPS (Bridge):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.inlineDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentDimension.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE INGESTION SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Ingestion Fidelity &amp; SPAN Oversubscription Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate 10 Gbps peak full-duplex traffic loads and observe how Switch SPAN drops packets while Optical TAPs preserve 100% line rate.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Fidelity Core
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Deployment Capture Mode:</label>
              <select
                value={selectedCaptureMode}
                onChange={(e) => setSelectedCaptureMode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                <option value="optical_tap">Hardware Passive Optical TAP (70/30)</option>
                <option value="switch_span">Switch SPAN / Mirror Port (10G)</option>
                <option value="inline_ips">In-Line Active IPS (Bridge with Bypass)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Full-Duplex Link Load (TX + RX):</label>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={linkUtilizationPercent}
                onChange={(e) => setLinkUtilizationPercent(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
              <span className="text-[10px] text-gray-400 font-mono">{linkUtilizationPercent}% Load (Aggregate: {((10.0 * linkUtilizationPercent) / 100 * 2).toFixed(1)} Gbps)</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Production Switch CPU Utilization:</label>
              <input
                type="range"
                min="10"
                max="95"
                step="5"
                value={switchCpuLoadPercent}
                onChange={(e) => setSwitchCpuLoadPercent(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              /&gt;
              <span className="text-[10px] text-gray-400 font-mono">Switch CPU: {switchCpuLoadPercent}%</span>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Sensor Ingestion Mode:
                </span>
                <span className="text-white font-bold text-sm">{currentFidelityStatus.modeName}</span>
                <span className="text-gray-400 text-xs block">
                  CRC Frame Capture: {currentFidelityStatus.badCrcCaptured} • Latency: {currentFidelityStatus.addedLatency}
                </span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentFidelityStatus.badgeColor
              )}>
                {currentFidelityStatus.fidelityRating}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">Packet Drop Percentage:</span>
                <div className={clsx("text-2xl font-extrabold font-mono", currentFidelityStatus.dropPercentage > 0 ? "text-rose-400" : "text-emerald-400")}&gt;
                  {currentFidelityStatus.dropPercentage}% Packet Loss
                </div>
                <span className="text-[10px] text-gray-500 block">Switch Overhead: {currentFidelityStatus.switchCpuOverhead}</span>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  Ingestion Analysis:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentFidelityStatus.explanation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: DEPLOYMENT SIMULATOR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: TAP vs SPAN Fidelity Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation calculating SPAN oversubscription drops and optical insertion loss dB budgets.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              tap_vs_span.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="tap_vs_span.py"
            highlightLines={[22, 38, 52, 65]}
          />
        </section>

        {/* STUDIO 3: OPTICAL BUDGET & NPB SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Optical Power Budget, Insertion Loss &amp; NPB Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate fiber insertion loss (dB), received optical power, and 5-year Network Packet Broker (NPB) cluster TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Optical Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Optical Split Ratio:</span>
                <span className="text-sky-400 font-bold">{opticalSplitRatio.replace("_", "/")}</span>
              </div>
              <select
                value={opticalSplitRatio}
                onChange={(e) => setOpticalSplitRatio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gray-200 focus:outline-none"
              &gt;
                <option value="70_30">70/30 Split (1.8 dB Production Loss - Recommended)</option>
                <option value="50_50">50/50 Split (3.4 dB Production Loss)</option>
              </select>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Monitored Fiber Links:</span>
                <span className="text-purple-400 font-bold">{monitoredLinksCount} Links</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                step="4"
                value={monitoredLinksCount}
                onChange={(e) => setMonitoredLinksCount(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Laser Launch Power:</span>
                <span className="text-emerald-400 font-bold">{laserTxPowerDbm} dBm</span>
              </div>
              <input
                type="range"
                min="-10.0"
                max="2.0"
                step="0.5"
                value={laserTxPowerDbm}
                onChange={(e) => setLaserTxPowerDbm(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              /&gt;
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">TAP Insertion Loss</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">-{calculatedBudgetMetrics.insertionLossDb} dB</div>
              <span className="text-[10px] text-gray-500 block">Production Light Attenuation</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Received Optical Power</span>
              <div className={clsx("text-2xl font-extrabold font-mono", calculatedBudgetMetrics.isBudgetHealthy ? "text-emerald-400" : "text-rose-400")}>
                {calculatedBudgetMetrics.receivedPowerDbm} dBm
              </div>
              <span className="text-[10px] text-gray-500 block">{calculatedBudgetMetrics.isBudgetHealthy ? "✔ Power Budget Healthy" : "⚠️ Optical Signal Too Weak"}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year High-Density TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedBudgetMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Modular TAPs + NPB Fabric</span>
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
              &gt;
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Fabric: {currentDrill.captureFabric}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                CERT-In Compliant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Defensive Ingestion Strategy:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
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
                <span>Hardware TAPs provide 100% full-duplex line-rate packet capture with zero switch CPU overhead.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Switch SPAN ports drop packets when aggregate TX+RX exceeds port capacity (Oversubscription).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>SPAN ports discard malformed Layer-1 CRC error frames before the IDS can inspect them.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Passive optical TAPs split light (70/30 or 50/50) with predictable insertion loss (~1.8 dB).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>In-line IPS deployments require hardware optical bypass switches to fail-open during power loss.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Network Packet Brokers (NPBs) filter streaming noise and balance traffic across multiple IDS sensors.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Inline vs TAP/SPAN Port Deployment FAQs"
            subtitle="30 In-depth Practice Questions & Network Capture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Inline vs TAP/SPAN Port Deployment (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 5 brings to light the essential hardware physics behind network packet interception! Remember that an IDS is completely blind if packets are dropped before reaching the sensor. While Switch SPAN mirror ports are convenient for quick troubleshooting, they suffer from dangerous oversubscription packet drops during high traffic loads and strip malformed CRC error frames. For mission-critical enterprise backbones, always deploy 70/30 passive optical hardware TAPs connected to a Network Packet Broker (NPB) with symmetrical 5-tuple load balancing. When deploying in-line IPS, mandate hardware optical bypass switches to guarantee fail-open uptime during power failure. In Topic 6, we will master Handling False Positives and False Negatives in Security Monitoring!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic5;
