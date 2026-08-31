import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic1_files/remote_access_sniffer_sim.py?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgSniffingVsVpnId = useId();
  const svgSiteToSiteRoiId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedThreatDimensionKey, setSelectedThreatDimensionKey] = useState("packet_sniffing");

  // Studio 2: Live Sniffer Simulator State
  const [vpnTunnelActive, setVpnTunnelActive] = useState(false);
  const [selectedTransmissionType, setSelectedTransmissionType] = useState("civic_auth");

  // Studio 3: Performance & Financial ROI Calculations
  const [branchOfficesCount, setBranchOfficesCount] = useState(6); // 1 to 20 branches
  const [mplsMonthlyPerBranchThousands, setMplsMonthlyPerBranchThousands] = useState(45); // ₹15k to ₹150k/mo
  const [broadbandMonthlyPerBranchThousands, setBroadbandMonthlyPerBranchThousands] = useState(4); // ₹1.5k to ₹15k/mo

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_kolkata_health");

  // Comparison Database for Studio 1
  const threatDimensions = {
    packet_sniffing: {
      key: "packet_sniffing",
      title: "1. Passive Packet Sniffing & Wiretapping",
      category: "Eavesdropping Hazard",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      threatDetail: "Adversaries on the same local Wi-Fi or rogue ISP capture cleartext HTTP, Telnet, and FTP packets using Wireshark.",
      vpnProtection: "Encapsulates data inside AES-256-GCM / WireGuard. The sniffer captures only indecipherable mathematical ciphertext.",
      verdict: "VPN renders public network eavesdropping completely ineffective, protecting passwords and citizen PII."
    },
    evil_twin_hotspots: {
      key: "evil_twin_hotspots",
      title: "2. Evil Twin & Rogue Wi-Fi Hotspots",
      category: "Wireless Impersonation",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      threatDetail: "Attackers broadcast fake SSIDs ('Airport_Free_WiFi') to lure victims into routing all unencrypted traffic through the attacker's laptop.",
      vpnProtection: "End-to-end cryptographic tunnel verifies gateway identity via X.509 PKI certificates. Rogue AP cannot read or forge packets.",
      verdict: "VPN provides a secure cryptographic pipe even across malicious or compromised physical Wi-Fi routers."
    },
    mitm_arp_poisoning: {
      key: "mitm_arp_poisoning",
      title: "3. Man-in-the-Middle (MitM) ARP Spoofing",
      category: "Packet Manipulation",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      threatDetail: "Adversaries poison ARP caches to intercept and modify in-flight data packets or inject malicious JavaScript payloads.",
      vpnProtection: "Cryptographic HMAC-SHA-256 authentication tags detect any altered bit in transit, instantly dropping tampered packets.",
      verdict: "Data integrity verification ensures packets cannot be altered or injected by intermediate attackers."
    },
    leased_line_economics: {
      key: "leased_line_economics",
      title: "4. Leased Line vs VPN Financial Economics",
      category: "Infrastructure ROI",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      threatDetail: "Traditional private MPLS leased lines cost ₹50,000–₹2,00,000 per month per link with slow multi-week provisioning times.",
      vpnProtection: "Site-to-Site IPsec VPN runs over commodity gigabit broadband (₹3,000–₹8,000/mo), cutting connectivity costs by 90%+.",
      verdict: "Modern enterprises achieve equivalent cryptographic privacy over cheap public internet with 90%+ cost savings."
    }
  };

  // Studio 2: Live Transmissions Database
  const transmissionTypes = {
    civic_auth: {
      id: "civic_auth",
      label: "Municipal Civic Admin Login Credentials",
      app: "CIVIC_PORTAL_AUTH",
      plaintext: "USER=debangshu_admin; PASS=BarrackporeSecret2026!; AADHAAR=9918-2831-4412"
    },
    patient_ehr: {
      id: "patient_ehr",
      label: "Hospital Electronic Health Record (EHR)",
      app: "HEALTHCARE_SYNC",
      plaintext: "PATIENT=Mamata_Das; DIAGNOSIS=CARDIAC_MONITOR_NORMAL; RX=MED_8812"
    },
    scada_switch: {
      id: "scada_switch",
      label: "SCADA Electrical Substation Breaker Command",
      app: "MODBUS_SCADA",
      plaintext: "CMD=TRIP_BREAKER_SUBSTATION_04_BARRACKPORE; AUTH_KEY=77192"
    }
  };

  // Studio 2: Live Evaluation Logic
  const snifferResult = useMemo(() => {
    const tx = transmissionTypes[selectedTransmissionType];

    if (!vpnTunnelActive) {
      return {
        status: "EXPOSED",
        verdict: "🚨 CRITICAL DATA LEAK: Cleartext Stolen by Wi-Fi Sniffer!",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        adversaryView: `[CLEARTEXT PACKET CAPTURED] ${tx.app} | Payload: ${tx.plaintext}`,
        stolenData: tx.plaintext,
        explanation: "Because traffic was sent over unencrypted public Wi-Fi, the attacker's Wireshark sniffer captured all login credentials and sensitive records in cleartext!"
      };
    } else {
      return {
        status: "SECURED",
        verdict: "🛡️ 100% SECURE: Encapsulated & Encrypted with AES-256-GCM!",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        adversaryView: `[ENCRYPTED ESP TUNNEL] Public Header: 203.0.113.88 → 198.51.100.1 | Encrypted Payload: 7F4A99B812C450E72B33880F1A29D4E6...`,
        stolenData: "[UNREADABLE ENCRYPTED CIPHERTEXT (0% Plaintext Stolen)]",
        explanation: "The VPN encapsulated the transmission inside an encrypted IPsec ESP tunnel. The eavesdropper captured only indecipherable mathematical ciphertext."
      };
    }
  }, [vpnTunnelActive, selectedTransmissionType]);

  // Studio 3: Performance Calculations
  const calculatedRoiMetrics = useMemo(() => {
    // Annual MPLS Cost (INR Lakhs)
    const annualMplsCostLakhs = ((branchOfficesCount * mplsMonthlyPerBranchThousands * 12) / 100).toFixed(2);
    // Annual Broadband + IPsec Cost (INR Lakhs)
    const annualBroadbandCostLakhs = ((branchOfficesCount * broadbandMonthlyPerBranchThousands * 12) / 100).toFixed(2);
    // 5-Year Cumulative Savings (INR Lakhs)
    const fiveYearSavingsLakhs = ((Number(annualMplsCostLakhs) - Number(annualBroadbandCostLakhs)) * 5).toFixed(2);
    const savingsPercent = (((Number(annualMplsCostLakhs) - Number(annualBroadbandCostLakhs)) / Number(annualMplsCostLakhs)) * 100).toFixed(0);

    return {
      annualMplsCostLakhs,
      annualBroadbandCostLakhs,
      fiveYearSavingsLakhs,
      savingsPercent
    };
  }, [branchOfficesCount, mplsMonthlyPerBranchThousands, broadbandMonthlyPerBranchThousands]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_kolkata_health: {
      id: "barrackpore_kolkata_health",
      title: "Barrackpore-to-Kolkata Rural Healthcare Secure Network Mesh",
      location: "5 Rural Clinics in Barrackpore, Ichapur & Shyamnagar to Salt Lake Medical Hub",
      architecture: "Site-to-Site IPsec VPN over Redundant Gigabit Fiber + Remote Access SSL-VPN for Mobile Doctors",
      threatScenario: "An organized cybercrime syndicate deployed Evil Twin Wi-Fi routers near rural clinic waiting rooms to intercept patient electronic health records (EHR).",
      solution: "Sukanta Hui, Mamata, and Mahima decommissioned expensive legacy leased lines and deployed hardware IPsec VPN routers with AES-256-GCM encryption and MFA host checking.",
      outcome: "Annual connectivity cost slashed by ₹42 Lakhs; 100% patient record confidentiality maintained; verified compliance with CERT-In and the DPDP Act 2023."
    },
    shyamnagar_municipal_sdwan: {
      id: "shyamnagar_municipal_sdwan",
      title: "Shyamnagar Municipal Civic Portal & SCADA Connectivity Upgrade",
      location: "Shyamnagar Municipal Sub-Office to Barrackpore Command Datacenter",
      architecture: "SD-WAN Dual-Broadband IPsec Mesh with Instant BGP Failover",
      threatScenario: "Frequent ISP fiber cuts caused 18 hours of civic portal downtime, forcing staff to transmit tax files over insecure mobile 4G tethering.",
      solution: "Abhronila, Susmita, and Debangshu deployed an SD-WAN IPsec solution bonding fiber and 5G cellular with automated sub-second tunnel failover.",
      outcome: "99.999% uptime achieved; all civic tax data encrypted in transit; zero plaintext exposures recorded."
    }
  };

  const currentThreat = threatDimensions[selectedThreatDimensionKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 1</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            The Need for Secure Remote Access &amp; Site-to-Site Connectivity
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Understand the forces driving secure interconnectivity. Contrast the risks of <strong className="text-rose-400">Public Wi-Fi Sniffing &amp; Evil Twin Attacks</strong> with the protection of <strong className="text-sky-400">Remote Access VPNs</strong>, and explore the 90%+ cost savings of <strong className="text-emerald-400">Site-to-Site IPsec over Broadband</strong> versus legacy leased lines.
          </p>
        </header>

        {/* SECTION 1: SNIFFING VS VPN & ROI SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Public Network Threat Exposure vs VPN Tunnel Shielding
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the vulnerability of cleartext transmissions on public Wi-Fi on the left and the economic ROI of Site-to-Site IPsec on the right.
            </p>
          </div>

          {/* SVG 1: SNIFFING VS VPN & LEASED LINE ROI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Public Wi-Fi Sniffing Threat ➔ Site-to-Site IPsec Leased-Line Replacement
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Threat Mitigation &amp; Financial ROI</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgSniffingVsVpnId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Public Network Threat Exposure vs VPN Diagram"
              >
                {/* LEFT: INSECURE PUBLIC WI-FI THREAT */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#ef4444" strokeWidth="1.5" />
                <text x="215" y="42" fill="#f87171" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  UNPROTECTED PUBLIC WI-FI (CRITICAL RISK)
                </text>

                <rect x="35" y="58" width="175" height="185" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="122" y="78" fill="#fee2e2" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Remote User (No VPN)
                </text>
                <text x="122" y="98" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Cleartext HTTP / Telnet</text>
                <text x="122" y="116" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Passive Packet Sniffing</text>
                <text x="122" y="134" fill="#fca5a5" fontSize="7.5" textAnchor="middle">• Password &amp; PII Theft</text>
                <text x="122" y="152" fill="#fca5a5" fontSize="7.5" textAnchor="middle">• Evil Twin Wi-Fi Hotspot</text>
                <text x="122" y="175" fill="#fee2e2" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Outcome: DATA BREACH!
                </text>
                <text x="122" y="225" fill="#fca5a5" fontSize="7" textAnchor="middle">
                  Passwords Exposed to Hackers
                </text>

                <rect x="220" y="58" width="175" height="185" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="307" y="78" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  With Remote Access VPN
                </text>
                <text x="307" y="98" fill="#ffffff" fontSize="7.5" textAnchor="middle">• AES-256-GCM Encryption</text>
                <text x="307" y="116" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Encapsulated ESP Tunnel</text>
                <text x="307" y="134" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">• HMAC Anti-Tampering</text>
                <text x="307" y="152" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">• SAML Multi-Factor Auth</text>
                <text x="307" y="175" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Outcome: 100% SHIELDED
                </text>
                <text x="307" y="225" fill="#a7f3d0" fontSize="7" textAnchor="middle">
                  Adversary Sees Ciphertext Only
                </text>

                {/* RIGHT: LEASED LINE VS IPSEC VPN ROI */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  SITE-TO-SITE LEASED LINE VS IPSEC VPN ROI
                </text>

                {/* LEGACY MPLS BOX */}
                <rect x="455" y="58" width="175" height="185" rx="6" fill="#18181b" stroke="#64748b" />
                <text x="542" y="78" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Legacy MPLS Leased Line
                </text>
                <text x="542" y="98" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Dedicated Fiber Circuit</text>
                <text x="542" y="116" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Cost: ₹1.5 Lakh / month</text>
                <text x="542" y="134" fill="#fca5a5" fontSize="7.5" textAnchor="middle">• Slow 6-Week Setup</text>
                <text x="542" y="152" fill="#fca5a5" fontSize="7.5" textAnchor="middle">• Single Point of Failure</text>
                <text x="542" y="175" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Annual: ₹18 Lakhs / branch
                </text>
                <text x="542" y="225" fill="#94a3b8" fontSize="7" textAnchor="middle">
                  Expensive &amp; Inflexible
                </text>

                {/* IPSEC OVER BROADBAND BOX */}
                <rect x="640" y="58" width="175" height="185" rx="6" fill="#082f49" stroke="#0284c7" />
                <text x="727" y="78" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  IPsec VPN over Broadband
                </text>
                <text x="727" y="98" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Commodity Gigabit Fiber</text>
                <text x="727" y="116" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">• Cost: ₹5,000 / month</text>
                <text x="727" y="134" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">• Instant Provisioning</text>
                <text x="727" y="152" fill="#fde68a" fontSize="7.5" textAnchor="middle">• Dual ISP SD-WAN Failover</text>
                <text x="727" y="175" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Annual: ₹60,000 / branch
                </text>
                <text x="727" y="225" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  96% Cost Savings!
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: THREAT LANDSCAPE MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Threat Landscape &amp; Secure Interconnectivity Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms behind Packet Sniffing, Evil Twin Hotspots, MitM ARP Poisoning, and Leased Line vs VPN Economics.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentThreat.badgeColor)}>
              {currentThreat.category}
            </span>
          </div>

          {/* Threat Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(threatDimensions).map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedThreatDimensionKey(t.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedThreatDimensionKey === t.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {t.title}
              </button>
            ))}
          </div>

          {/* Active Threat Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentThreat.title}</h3>
                <span className="text-gray-400">Category: {currentThreat.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentThreat.badgeColor)}>
                Active Dimension
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                🚨 Public Network Threat Exposure:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentThreat.threatDetail}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                🛡️ VPN Cryptographic Countermeasure:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentThreat.vpnProtection}</p>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentThreat.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE PUBLIC WI-FI SNIFFER SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Insecure Public Wi-Fi Sniffer vs VPN Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Toggle VPN Tunnel Protection to observe what an adversary running Wireshark on an open Wi-Fi hotspot captures.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Wireshark Sniffer Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Sensitive Transmission:</label>
              <select
                value={selectedTransmissionType}
                onChange={(e) => setSelectedTransmissionType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(transmissionTypes).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">VPN Tunnel Protection State:</label>
              <button
                onClick={() => setVpnTunnelActive(!vpnTunnelActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  vpnTunnelActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-md shadow-emerald-500/10"
                    : "bg-rose-950/80 text-rose-300 border-rose-800 shadow-md shadow-rose-500/10"
                )}
              >
                {vpnTunnelActive ? "✔ VPN Tunnel ACTIVE (AES-256-GCM Encrypted)" : "❌ NO VPN (Cleartext Transmission on Public Wi-Fi!)"}
              </button>
            </div>
          </div>

          {/* Sniffer Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Transmission:
                </span>
                <span className="text-white font-bold text-sm">{transmissionTypes[selectedTransmissionType].label}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                snifferResult.badgeColor
              )}>
                {snifferResult.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-mono">
              <span className="text-sky-400 font-bold text-[11px] block">Adversary Wireshark Packet Sniffer View:</span>
              <pre className="text-gray-200 text-xs whitespace-pre-wrap">{snifferResult.adversaryView}</pre>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Sensitive Data Harvested by Hacker:
              </span>
              <div className="font-mono text-xs text-rose-300 bg-slate-950 p-2 rounded border border-slate-800">
                {snifferResult.stolenData}
              </div>
              <p className="text-gray-400 text-[11px] pt-1">{snifferResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: SNIFFER SIMULATOR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Public Wi-Fi Sniffing vs VPN Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation comparing cleartext packet sniffing with encrypted VPN tunnel encapsulation.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              remote_access_sniffer_sim.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="remote_access_sniffer_sim.py"
            highlightLines={[20, 32, 45, 60]}
          />
        </section>

        {/* STUDIO 3: LEASED LINE VS VPN FINANCIAL ROI CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Leased Line vs Site-to-Site IPsec Financial ROI Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate annual telecommunications savings and 5-year ROI in INR (₹) when migrating from dedicated MPLS circuits to Site-to-Site IPsec VPNs.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Financial ROI Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Branch Offices Count:</span>
                <span className="text-sky-400 font-bold">{branchOfficesCount} Branches</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={branchOfficesCount}
                onChange={(e) => setBranchOfficesCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>MPLS Monthly Cost / Branch:</span>
                <span className="text-rose-400 font-bold">₹{mplsMonthlyPerBranchThousands}k /mo</span>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                step="5"
                value={mplsMonthlyPerBranchThousands}
                onChange={(e) => setMplsMonthlyPerBranchThousands(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Broadband + IPsec / Branch:</span>
                <span className="text-emerald-400 font-bold">₹{broadbandMonthlyPerBranchThousands}k /mo</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={broadbandMonthlyPerBranchThousands}
                onChange={(e) => setBroadbandMonthlyPerBranchThousands(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Annual MPLS Expense</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">₹{calculatedRoiMetrics.annualMplsCostLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Rigid dedicated fiber circuits</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Annual IPsec Expense</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹{calculatedRoiMetrics.annualBroadbandCostLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Commodity Gigabit Fiber + IPsec</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Cumulative Savings</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedRoiMetrics.fiveYearSavingsLakhs} Lakhs</div>
              <span className="text-[10px] text-emerald-400 font-bold block">{calculatedRoiMetrics.savingsPercent}% Total Cost Reduction!</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.architecture}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical VPN Architecture:</span>
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
                <span>Unencrypted public networks expose enterprise data to packet sniffing, ARP spoofing, and Evil Twin attacks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Remote Access VPN secures individual mobile workers connecting from untrusted locations.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Site-to-Site VPN connects entire branch networks over public broadband, slashing connectivity costs by 90%+.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Host posture checking verifies antivirus, OS patches, and BitLocker encryption before admitting endpoints.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Hardware crypto-acceleration (AES-NI) allows line-rate encryption on modern gigabit fiber links.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all remote access session logs synchronized with NPL India NTP servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Secure Remote Access &amp; Site-to-Site FAQs"
            subtitle="30 In-depth Practice Questions &amp; Connectivity Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="The Need for Secure Remote Access (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 1 highlights the real-world operational and financial imperatives of VPN engineering! The modern enterprise boundary is no longer confined within the physical walls of an office. Remote Access VPNs protect roaming staff from packet sniffing, ARP spoofing, and Evil Twin Wi-Fi attacks at public hotspots. Simultaneously, Site-to-Site IPsec VPNs deliver 90%+ cost savings over traditional MPLS leased lines by running authenticated encryption over commodity gigabit fiber. In Topic 2, we will examine VPN Architecture: Remote Access VPN vs Site-to-Site (Router-to-Router) VPN in deep structural detail!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic1;
