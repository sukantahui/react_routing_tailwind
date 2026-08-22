import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Simulator State: Availability Threat & Outage Defense Studio
  const [selectedThreat, setSelectedThreat] = useState("syn_flood");
  const [activeDefenses, setActiveDefenses] = useState({
    anycastScrubbing: false,
    synCookies: true,
    reverseProxyTimeouts: false,
    immutableBackups: true,
    dualHomedFiber: false,
    circuitBreakers: false
  });

  const [simulatedTrafficLoad, setSimulatedTrafficLoad] = useState(75); // percentage

  // Toggle defense mechanism
  const toggleDefense = (key) => {
    setActiveDefenses((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Threat Definitions
  const threats = {
    syn_flood: {
      name: "TCP SYN Flood (Layer 4)",
      layer: "Transport Layer (OSI L4)",
      description: "Overwhelms TCP connection backlog queues with spoofed SYN packets, leaving connections half-open.",
      rawImpact: { bandwidth: "15 Gbps", connectionLoad: "98%", status: "Crashing", lossRatePerHour: 280000 },
      primaryDefense: "synCookies",
      defenseDesc: "SYN Cookies bypass connection table allocation until the final ACK packet is verified."
    },
    volumetric_udp: {
      name: "UDP / NTP Amplification Flood (Layer 3/4)",
      layer: "Network & Transport Layers",
      description: "Generates massive 450+ Gbps volumetric reflection surges to clog upstream ISP broadband transit pipes.",
      rawImpact: { bandwidth: "480 Gbps", connectionLoad: "100%", status: "Saturated Pipe", lossRatePerHour: 650000 },
      primaryDefense: "anycastScrubbing",
      defenseDesc: "Anycast Cloud Scrubbing Centers absorb and filter volumetric bandwidth at global edge PoPs."
    },
    slowloris: {
      name: "Slowloris / RUDY Slow HTTP (Layer 7)",
      layer: "Application Layer (OSI L7)",
      description: "Sends incomplete HTTP headers at slow intervals (every 10s), holding web server worker threads hostage.",
      rawImpact: { bandwidth: "1.2 Mbps", connectionLoad: "100%", status: "Thread Starvation", lossRatePerHour: 320000 },
      primaryDefense: "reverseProxyTimeouts",
      defenseDesc: "Asynchronous reverse proxies (Nginx/Envoy) with strict request header timeouts disconnect stalled clients."
    },
    ransomware_wiper: {
      name: "LockBit Ransomware / Wiper Malware",
      layer: "System & Storage Infrastructure",
      description: "Encrypts production database LUNs and virtual machine disks or destroys MBR partition tables.",
      rawImpact: { bandwidth: "N/A", connectionLoad: "N/A", status: "Total System Lockout", lossRatePerHour: 1250000 },
      primaryDefense: "immutableBackups",
      defenseDesc: "Immutable WORM storage & air-gapped 3-2-1-1-0 backups enable rapid restoration without paying ransoms."
    },
    fiber_cut: {
      name: "Physical Fiber Optic Severance ('Backhoe Fade')",
      layer: "Physical Infrastructure (OSI L1)",
      description: "Civic road construction machinery physically cuts the primary underground fiber optic telecom feed.",
      rawImpact: { bandwidth: "0 Gbps", connectionLoad: "0%", status: "Isolated Blackout", lossRatePerHour: 450000 },
      primaryDefense: "dualHomedFiber",
      defenseDesc: "BGP multihomed dual-carrier transit over geographically diverse underground conduits."
    },
    cascading_crash: {
      name: "Microservice Cascading Dependency Collapse",
      layer: "Application Architecture",
      description: "A slow payment database causes upstream API gateways to hold open threads, collapsing all services.",
      rawImpact: { bandwidth: "45 Gbps", connectionLoad: "95%", status: "Domino Failure", lossRatePerHour: 390000 },
      primaryDefense: "circuitBreakers",
      defenseDesc: "Circuit Breakers (e.g. Resilience4j) trip open immediately to fail fast and prevent thread starvation."
    }
  };

  const currentThreat = threats[selectedThreat];

  // Dynamic simulation calculations
  const simResults = useMemo(() => {
    const isPrimaryMitigated = activeDefenses[currentThreat.primaryDefense];
    let mitigatedScore = isPrimaryMitigated ? 85 : 15;

    // Bonus for defense in depth
    let activeCount = Object.values(activeDefenses).filter(Boolean).length;
    let effectiveHealth = Math.min(100, Math.max(10, mitigatedScore + (activeCount * 2.5) - (simulatedTrafficLoad * 0.15)));
    
    let currentDowntimeCost = isPrimaryMitigated 
      ? Math.round(currentThreat.rawImpact.lossRatePerHour * 0.05)
      : Math.round(currentThreat.rawImpact.lossRatePerHour * (simulatedTrafficLoad / 100));

    let systemStatus = effectiveHealth >= 80 ? "Operational & Protected" : effectiveHealth >= 50 ? "Degraded Performance" : "Critical Outage";
    let statusColor = effectiveHealth >= 80 ? "text-emerald-400" : effectiveHealth >= 50 ? "text-amber-400" : "text-rose-400";
    let bgStatusColor = effectiveHealth >= 80 ? "bg-emerald-500/10 border-emerald-500/30" : effectiveHealth >= 50 ? "bg-amber-500/10 border-amber-500/30" : "bg-rose-500/10 border-rose-500/30";

    return {
      isPrimaryMitigated,
      effectiveHealth: effectiveHealth.toFixed(1),
      currentDowntimeCost,
      systemStatus,
      statusColor,
      bgStatusColor
    };
  }, [selectedThreat, activeDefenses, simulatedTrafficLoad, currentThreat]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Scoped CSS animations with zero config */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes dataFlow {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .animate-data-flow {
          stroke-dasharray: 6 6;
          animation: dataFlow 2s linear infinite;
        }
      `}</style>

      {/* Main Container - Vertical Stacked Structure */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col space-y-12">

        {/* Section 1: Header & Module Context */}
        <header className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Module 3: Security Triad (CIA) & Case Studies
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Topic 6 of 11
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                Advanced Threat Defense
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Threats to Availability & Major Outages
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
              Comprehensive analysis of volumetric DDoS floods, Layer 7 Slowloris attacks, LockBit ransomware extortion, BGP route hijacking, physical telecom fiber severance, and enterprise defense architectures.
            </p>
          </div>
        </header>

        {/* Section 2: Teacher's Introductory Note */}
        <Teacher
          note="Welcome to Topic 6. When an attacker breaches Confidentiality or Integrity, it may take weeks to discover the intrusion. But when Availability is destroyed—whether through a 500 Gbps UDP flood, a Slowloris thread exhaustion attack, or an excavator severing a primary optical fiber line in Barrackpore—the entire organization grinds to a catastrophic halt within seconds. As security architects, we must master both software mitigation (SYN cookies, Anycast scrubbing, rate limiting) and physical resilience (N+1 UPS, dual-homed diverse fiber routing, immutable air-gapped backups) to guarantee continuous business survival."
        />

        {/* Section 3: Interactive Simulation Studio: Availability Threat & Outage Defense Studio */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Availability Threat & Outage Defense Simulator
              </h2>
            </div>
            <p className="text-slate-400 text-sm">
              Select an active availability attack vector, configure multi-layered defense controls, and monitor system survival metrics and financial downtime loss in real time.
            </p>
          </div>

          {/* Threat Selection Tabs */}
          <div className="flex flex-col space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Step 1: Select Active Attack Vector / Outage Event
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(threats).map(([key, t]) => {
                const isSelected = selectedThreat === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedThreat(key)}
                    className={clsx(
                      "p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2",
                      isSelected
                        ? "bg-rose-500/15 border-rose-500 text-white shadow-lg shadow-rose-500/10"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-200">{t.name}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs text-rose-300 font-mono">{t.layer}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Defense Controls Grid */}
          <div className="flex flex-col space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Step 2: Deploy Defensive Architecture Controls
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  key: "anycastScrubbing",
                  label: "Anycast Cloud DDoS Scrubbing",
                  target: "Volumetric UDP/ICMP Floods (L3/L4)"
                },
                {
                  key: "synCookies",
                  label: "Kernel SYN Cookies & State Hardening",
                  target: "TCP SYN Backlog Exhaustion (L4)"
                },
                {
                  key: "reverseProxyTimeouts",
                  label: "Nginx/Envoy Slowloris Timeouts",
                  target: "Slowloris & Slow POST RUDY (L7)"
                },
                {
                  key: "immutableBackups",
                  label: "3-2-1-1-0 Air-Gapped Immutable Backups",
                  target: "LockBit Ransomware & Wipers"
                },
                {
                  key: "dualHomedFiber",
                  label: "BGP Dual-Homed Diverse Conduits",
                  target: "Physical Fiber Severance ('Backhoe Fade')"
                },
                {
                  key: "circuitBreakers",
                  label: "Resilience4j Circuit Breakers",
                  target: "Cascading Microservice Collapses"
                }
              ].map((def) => {
                const isActive = activeDefenses[def.key];
                const isCrucial = currentThreat.primaryDefense === def.key;
                return (
                  <button
                    key={def.key}
                    onClick={() => toggleDefense(def.key)}
                    className={clsx(
                      "p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2",
                      isActive
                        ? "bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{def.label}</span>
                      <span
                        className={clsx(
                          "text-xs px-2 py-0.5 rounded font-mono font-bold",
                          isActive
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-800 text-slate-500"
                        )}
                      >
                        {isActive ? "ACTIVE" : "OFF"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{def.target}</span>
                      {isCrucial && (
                        <span className="text-amber-400 font-bold">★ CRUCIAL</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Traffic Intensity Slider */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-semibold">Simulated Ingress Attack Intensity:</span>
              <span className="font-mono font-bold text-rose-400">{simulatedTrafficLoad}% Capacity Load</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={simulatedTrafficLoad}
              onChange={(e) => setSimulatedTrafficLoad(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>10% (Low Probe)</span>
              <span>50% (Standard Surge)</span>
              <span>100% (Maximum Distributed Barrage)</span>
            </div>
          </div>

          {/* Live Telemetry & Results Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={clsx("p-5 rounded-xl border flex flex-col space-y-2", simResults.bgStatusColor)}>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                System Availability Status
              </span>
              <span className={clsx("text-2xl font-black", simResults.statusColor)}>
                {simResults.systemStatus}
              </span>
              <span className="text-xs text-slate-300">
                {simResults.isPrimaryMitigated
                  ? `Successfully mitigated via ${threats[selectedThreat].defenseDesc}`
                  : `VULNERABLE: Lacks essential countermeasure (${threats[selectedThreat].defenseDesc})`}
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Service Uptime & Health Score
              </span>
              <span className="text-2xl font-mono font-black text-cyan-400">
                {simResults.effectiveHealth}% Uptime
              </span>
              <span className="text-xs text-slate-400">
                Target SLA: 99.99% ("Four Nines" Uptime)
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Estimated Outage Loss (Hourly)
              </span>
              <span className="text-2xl font-mono font-black text-amber-400">
                ₹{simResults.currentDowntimeCost.toLocaleString("en-IN")} / hr
              </span>
              <span className="text-xs text-slate-400">
                Unmitigated Peak: ₹{currentThreat.rawImpact.lossRatePerHour.toLocaleString("en-IN")} / hr
              </span>
            </div>
          </div>

          {/* Threat Intelligence Summary Card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">⚡ Attack Anatomy:</span> {currentThreat.name}
              </h3>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                {currentThreat.layer}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentThreat.description}
            </p>
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="text-slate-400">
                <strong className="text-slate-200">Raw Attack Footprint:</strong> {currentThreat.rawImpact.bandwidth} | {currentThreat.rawImpact.connectionLoad} load
              </div>
              <div className="text-slate-400">
                <strong className="text-emerald-300">Recommended Defense:</strong> {currentThreat.defenseDesc}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comprehensive Theoretical Foundations */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              1. The Spectrum of Threats to Availability
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Availability threats span a massive spectrum ranging from high-bandwidth external cyber warfare attacks to microscopic TCP stack vulnerabilities, storage ransom locks, and mundane physical utility accidents.
            </p>
          </div>

          {/* Deep-Dive Grid into Threat Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
                L3/4
              </div>
              <h3 className="text-lg font-bold text-white">Volumetric Network Floods</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Overwhelms ingress transit lines with terabits of bogus packets using UDP amplification (DNS, NTP, Memcached) and ICMP floods. Bypasses on-premise firewalls by choking the ISP gateway pipe entirely.
              </p>
              <div className="text-xs font-mono text-rose-300 pt-2 border-t border-slate-800">
                Key Vectors: UDP Flood, DNS 50x Amplification, Memcached 51,200x.
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                L7
              </div>
              <h3 className="text-lg font-bold text-white">Application Layer Exhaustion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Appears as legitimate HTTP traffic but targets computationally expensive endpoints. Slowloris and Slow POST hold web server worker threads indefinitely using trickle data transmissions.
              </p>
              <div className="text-xs font-mono text-amber-300 pt-2 border-t border-slate-800">
                Key Vectors: Slowloris, RUDY (Slow POST), HTTP GET search query storms.
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
                PHYS
              </div>
              <h3 className="text-lg font-bold text-white">Ransomware & Physical Faults</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directly denies access to data and hardware. LockBit encrypts production LUNs; wipers eradicate MBRs; BGP route leaks blackhole traffic; and physical backhoes sever optical cables.
              </p>
              <div className="text-xs font-mono text-purple-300 pt-2 border-t border-slate-800">
                Key Vectors: Ransomware, BGP leaks, HVAC failure, SPOF fiber cuts.
              </div>
            </div>
          </div>

          {/* Deep Dive Breakdown: Technical Comparison Table */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white">
              2. Technical Comparison of Denial of Service (DoS) Vectors
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Attack Vector</th>
                    <th className="p-4">OSI Layer</th>
                    <th className="p-4">Resource Targeted</th>
                    <th className="p-4">Attack Signature</th>
                    <th className="p-4">Effective Countermeasure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/50 text-xs font-sans">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-rose-300">TCP SYN Flood</td>
                    <td className="p-4 font-mono">Layer 4 (Transport)</td>
                    <td className="p-4">TCP Backlog Queue Memory</td>
                    <td className="p-4">High volume of SYN packets without concluding ACK</td>
                    <td className="p-4 text-emerald-300">SYN Cookies, TCP State Table Hardening</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-rose-300">DNS / NTP Amplification</td>
                    <td className="p-4 font-mono">Layer 3/4 (Network/UDP)</td>
                    <td className="p-4">ISP Ingress Bandwidth Pipe</td>
                    <td className="p-4">Massive UDP responses from open resolvers to spoofed IP</td>
                    <td className="p-4 text-emerald-300">Anycast Cloud Scrubbing (AWS Shield, Cloudflare)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-amber-300">Slowloris</td>
                    <td className="p-4 font-mono">Layer 7 (Application)</td>
                    <td className="p-4">Web Server Thread/Worker Pools</td>
                    <td className="p-4">Slow, periodic partial HTTP headers with tiny bandwidth</td>
                    <td className="p-4 text-emerald-300">Nginx reverse proxy, client_header_timeout</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-amber-300">RUDY (Slow POST)</td>
                    <td className="p-4 font-mono">Layer 7 (Application)</td>
                    <td className="p-4">Application Form Execution Threads</td>
                    <td className="p-4">Huge Content-Length header with 1-byte/10s transmission</td>
                    <td className="p-4 text-emerald-300">WAF body timeout limits, max body size caps</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-purple-300">LockBit Ransomware</td>
                    <td className="p-4 font-mono">OS / File System</td>
                    <td className="p-4">Database LUNs, VM Disks, Backups</td>
                    <td className="p-4">High I/O cryptographic file encryption across SMB shares</td>
                    <td className="p-4 text-emerald-300">3-2-1-1-0 Immutable Air-Gapped Object Storage</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-cyan-300">BGP Route Leak</td>
                    <td className="p-4 font-mono">Routing (BGP L3)</td>
                    <td className="p-4">Global Internet Transit Paths</td>
                    <td className="p-4">Unauthorized Autonomous System announcing victim prefixes</td>
                    <td className="p-4 text-emerald-300">RPKI Route Origin Validation (ROV), ROAs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: High-Fidelity Custom SVG Architecture Diagram */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              3. Defense-in-Depth Architecture for High Availability
            </h2>
            <p className="text-slate-300 text-sm">
              Visualizing the multi-stage defensive barrier: Anycast edge scrubbing, SYN filtering, reverse proxy thread shielding, circuit-broken microservice clusters, and physical power/fiber redundancy.
            </p>
          </div>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg
              viewBox="0 0 960 460"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "720px" }}
            >
              {/* Definitions */}
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Zones */}
              <rect x="20" y="30" width="220" height="400" rx="12" fill="#1e1b4b" fillOpacity="0.4" stroke="#4338ca" strokeDasharray="4 4" />
              <text x="130" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">ZONE 1: UNTRUSTED INTERNET</text>

              <rect x="260" y="30" width="220" height="400" rx="12" fill="#064e3b" fillOpacity="0.3" stroke="#059669" strokeDasharray="4 4" />
              <text x="370" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">ZONE 2: CLOUD SCRUBBING EDGE</text>

              <rect x="500" y="30" width="440" height="400" rx="12" fill="#0f172a" fillOpacity="0.8" stroke="#334155" />
              <text x="720" y="55" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">ZONE 3: PROTECTED ENTERPRISE ON-PREMISE / VPC</text>

              {/* Attack Traffic Sources */}
              <g transform="translate(40, 80)">
                <rect width="180" height="60" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">Botnet &amp; UDP Flood</text>
                <text x="90" y="45" textAnchor="middle" fill="#94a3b8" fontSize="9">500 Gbps Reflection Surge</text>
              </g>

              <g transform="translate(40, 160)">
                <rect width="180" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">SYN Flood / Slowloris</text>
                <text x="90" y="45" textAnchor="middle" fill="#94a3b8" fontSize="9">L4 / L7 Connection Drain</text>
              </g>

              <g transform="translate(40, 240)">
                <rect width="180" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Legitimate Users</text>
                <text x="90" y="45" textAnchor="middle" fill="#94a3b8" fontSize="9">Kolkata / Barrackpore Clients</text>
              </g>

              {/* Edge Scrubbing Center Nodes */}
              <g transform="translate(280, 100)">
                <rect width="180" height="120" rx="10" fill="#047857" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
                <text x="90" y="30" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="bold">Anycast Scrubbing Center</text>
                <text x="90" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="10">• BGP Anycast Global Ingestion</text>
                <text x="90" y="75" textAnchor="middle" fill="#e2e8f0" fontSize="10">• Terabit UDP/ICMP Drop</text>
                <text x="90" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="10">• Managed Bot JS Challenge</text>
              </g>

              <g transform="translate(280, 245)">
                <rect width="180" height="150" rx="10" fill="#0f766e" fillOpacity="0.4" stroke="#14b8a6" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fill="#99f6e4" fontSize="12" fontWeight="bold">Network Edge Filters</text>
                <text x="90" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="10">• RPKI Route Origin Validation</text>
                <text x="90" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="10">• Dual-Homed BGP Failover</text>
                <text x="90" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="10">• SYN Cookies on Gateways</text>
                <text x="90" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="10">• Rate Limiting (Token Bucket)</text>
              </g>

              {/* Enterprise Core Systems */}
              <g transform="translate(520, 80)">
                <rect width="180" height="140" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">Reverse Proxy / WAF</text>
                <text x="90" y="50" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Nginx / Envoy Fleet</text>
                <text x="90" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">• client_header_timeout: 10s</text>
                <text x="90" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="10">• SSL Offloading &amp; HSTS</text>
                <text x="90" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Request Body Rate Limits</text>
              </g>

              <g transform="translate(730, 80)">
                <rect width="190" height="140" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="95" y="25" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">Microservice Application Fleet</text>
                <text x="95" y="50" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Circuit Breakers (Resilience4j)</text>
                <text x="95" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Thread Pool Bulkheads</text>
                <text x="95" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Auto-scaling Pods (K8s)</text>
                <text x="95" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Fallback Graceful Degradation</text>
              </g>

              {/* Storage & Power Disaster Recovery */}
              <g transform="translate(520, 245)">
                <rect width="400" height="150" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="200" y="25" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">Storage &amp; Physical Infrastructure Resilience</text>
                
                <rect x="20" y="45" width="165" height="85" rx="6" fill="#0f172a" stroke="#334155" />
                <text x="102" y="65" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">3-2-1-1-0 Backup Vault</text>
                <text x="102" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">• Immutable S3 Object Lock</text>
                <text x="102" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">• Air-Gapped LTO Tapes</text>

                <rect x="215" y="45" width="165" height="85" rx="6" fill="#0f172a" stroke="#334155" />
                <text x="297" y="65" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold">Physical Facility Controls</text>
                <text x="297" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">• N+1 UPS Battery Banks</text>
                <text x="297" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">• Dual Auto Diesel Gensets</text>
              </g>

              {/* Connecting Data Flow Lines */}
              <line x1="220" y1="110" x2="280" y2="130" stroke="#ef4444" strokeWidth="2" className="animate-data-flow" />
              <line x1="220" y1="190" x2="280" y2="190" stroke="#f59e0b" strokeWidth="2" className="animate-data-flow" />
              <line x1="220" y1="270" x2="280" y2="300" stroke="#38bdf8" strokeWidth="2" className="animate-data-flow" />

              {/* Scrubbed clean traffic to origin */}
              <line x1="460" y1="150" x2="520" y2="150" stroke="#10b981" strokeWidth="3" className="animate-data-flow" />
              <line x1="700" y1="150" x2="730" y2="150" stroke="#0ea5e9" strokeWidth="2" className="animate-data-flow" />
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center font-mono">
            Figure 6.1: End-to-End Resilient Architecture: Volumetric Attack Scrubbing, SYN Hardening, Layer 7 Shielding, and Air-Gapped Backups.
          </p>
        </section>

        {/* Section 6: Real-World Bengal Case Studies */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              4. Real-World Engineering Case Studies
            </h2>
            <p className="text-slate-300 text-sm">
              Real-world availability incident response scenarios from Kolkata, Barrackpore, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 uppercase">
                  FinTech Payment Gateway
                </span>
                <span className="text-xs text-slate-400 font-mono">Salt Lake Sector V, Kolkata</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Mamata Mitigates a 600 Gbps Memcached UDP Amplification Flood
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                During Diwali peak payment hours, Mamata’s UPI payment gateway experienced an unprecedented 600 Gbps flood originating from thousands of exposed Memcached UDP servers globally. The on-premise 10 Gbps ISP link was immediately saturated.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col space-y-2 text-xs">
                <span className="text-emerald-300 font-bold">✓ Incident Response &amp; Solution:</span>
                <p className="text-slate-300 leading-relaxed">
                  Mamata enabled Anycast Cloud DDoS scrubbing via BGP route advertisement. Malicious UDP port 11211 traffic was dropped at 30 global edge scrubbing centers. Origin bandwidth plummeted from 600 Gbps to 1.8 Gbps of valid HTTPS traffic within 4 minutes, preventing ₹2,40,00,000 in lost payment transactions.
                </p>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 uppercase">
                  Manufacturing Plant
                </span>
                <span className="text-xs text-slate-400 font-mono">Barrackpore Industrial Estate</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Debangshu Defeats LockBit Ransomware with 3-2-1-1-0 Immutable Backups
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                An employee clicked a spear-phishing attachment that deployed LockBit 3.0 across the local active directory, encrypting CNC production database servers and attempting to delete shadow copies and network backup shares.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col space-y-2 text-xs">
                <span className="text-emerald-300 font-bold">✓ Incident Response &amp; Solution:</span>
                <p className="text-slate-300 leading-relaxed">
                  Debangshu had instituted the 3-2-1-1-0 backup rule with AWS S3 Object Lock (WORM compliance mode) and offline LTO-8 tape storage. The encrypted servers were wiped, and entire virtual machines were restored from the immutable repository in 1 hour 45 minutes without paying a ₹85,00,000 extortion demand.
                </p>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 uppercase">
                  E-Governance Portal
                </span>
                <span className="text-xs text-slate-400 font-mono">Ichapur Municipality</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Susmita Neutralizes Slowloris Application Worker Starvation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                During civic property tax filing deadline week, the Ichapur municipal portal became completely unresponsive despite server bandwidth usage remaining under 5 Mbps. CPU and RAM sat idle while Apache refused all incoming connections.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col space-y-2 text-xs">
                <span className="text-emerald-300 font-bold">✓ Incident Response &amp; Solution:</span>
                <p className="text-slate-300 leading-relaxed">
                  Susmita identified a Slowloris attack opening 15,000 concurrent sockets and sending 1 header byte every 12 seconds. She deployed an Nginx reverse proxy in front of Apache configured with <code className="text-amber-300">client_header_timeout 5s;</code> and <code className="text-amber-300">limit_conn_zone</code>. Zombie connections were terminated instantly, restoring municipal citizen services.
                </p>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 uppercase">
                  Cloud Data Center
                </span>
                <span className="text-xs text-slate-400 font-mono">Jadavpur Tech Park</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Abhronila Prevents "Backhoe Fade" Outage with Dual-Homed Diverse Routing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                During metro railway construction near Jadavpur, an excavator accidentally severed a primary 96-core underground optical fiber trunk line carrying all regional cloud traffic.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col space-y-2 text-xs">
                <span className="text-emerald-300 font-bold">✓ Incident Response &amp; Solution:</span>
                <p className="text-slate-300 leading-relaxed">
                  Abhronila’s architecture utilized BGP multihoming with two distinct tier-1 telecom carriers routed along geographically isolated North and South underground rights-of-way. BGP fast sub-second failover (BFD) rerouted 100% of enterprise traffic within 280 milliseconds, resulting in zero customer-facing packet loss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Statutory Compliance, SLA Calculations & CERT-In Directives */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              5. Statutory &amp; Regulatory Directives (India)
            </h2>
            <p className="text-slate-300 text-sm">
              Critical legal compliance mandates governing major cybersecurity outages and availability breaches in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-rose-400 font-bold text-base">CERT-In 6-Hour Rule</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Under the April 2022 CERT-In Cybersecurity Directions, all Indian organizations, intermediaries, and data centers must report critical outages, major DDoS incidents, and ransomware infections to CERT-In within <strong>6 hours</strong> of notice.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-amber-400 font-bold text-base">IT Act 2000 Section 66F</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Anyone who intentionally denies access to or damages Critical Information Infrastructure (CII) to threaten national defense, public health, or financial stability is guilty of <strong>Cyber Terrorism</strong>, punishable by <strong>life imprisonment</strong>.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-cyan-400 font-bold text-base">RBI Core Banking RTO Mandate</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Reserve Bank of India mandates that Scheduled Commercial Banks maintain a Recovery Time Objective (RTO) of <strong>≤ 2 hours</strong> and a Recovery Point Objective (RPO) near <strong>zero</strong> for payment settlement engines.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Downloadable Printable Study Notes */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              6. Printable Study Note &amp; Reference Sheet
            </h2>
            <p className="text-slate-300 text-sm">
              Review and download the comprehensive offline study note covering DoS/DDoS taxonomy, ransomware resilience, 3-2-1-1-0 backup rules, and outage mitigation architecture.
            </p>
          </div>
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Threats to Availability and Outages"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 6 Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* Section 9: 30 Interactive Practice Questions & FAQs */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              7. Comprehensive Practice Questions &amp; Viva Assessment
            </h2>
            <p className="text-slate-300 text-sm">
              Test your mastery with 30 moderate-to-expert level questions covering Layer 3/4/7 DDoS, Slowloris, SYN floods, ransomware mitigation, BGP hijacking, and CERT-In regulatory compliance.
            </p>
          </div>
          <FAQTemplate
            title="Threats to Availability & Outages FAQs"
            questions={questions}
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
