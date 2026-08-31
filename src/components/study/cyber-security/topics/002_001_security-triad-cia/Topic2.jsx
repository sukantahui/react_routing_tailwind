import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // State for Data Breach Interceptor Studio
  const [selectedThreat, setSelectedThreat] = useState("dns_tunneling");
  const [encryptionActive, setEncryptionActive] = useState(false);
  const [dnsFilterActive, setDnsFilterActive] = useState(false);
  const [s3BlockPublicActive, setS3BlockPublicActive] = useState(false);
  const [credentialGuardActive, setCredentialGuardActive] = useState(false);

  // Threat scenarios
  const threats = {
    packet_sniffing: {
      title: "1. Wi-Fi Packet Sniffing & Eavesdropping",
      location: "Barrackpore Industrial Area",
      engineer: "Debangshu",
      vector: "Adversary in promiscuous mode capturing unencrypted LAN/Wi-Fi packets.",
      targetData: "Cleartext SCADA Sensor Telemetry & Worker Passwords",
      counterControl: "TLS 1.3 & IPsec ESP Tunnel Encryption",
      isDefended: encryptionActive,
      unprotectedLoss: "₹18,00,000 in stolen alloy patents & operational disruption",
      dpdpExposure: "₹25,00,000",
      rawLeak: "GET /api/v1/sensors HTTP/1.1\nHost: plant.barrackpore.internal\nCookie: session_id=debangshu_admin_9841\nPayload: Alloy_Mix_Ratio=[Nickel:42%,Chromium:18%]"
    },
    dns_tunneling: {
      title: "2. Covert DNS Tunneling Exfiltration",
      location: "Jadavpur Research Laboratory",
      engineer: "Abhronila",
      vector: "Insider encoding stolen ML model weights in base64 DNS queries over UDP 53.",
      targetData: "Proprietary Zero-Day Vulnerability Research & AI Models",
      counterControl: "AI-Driven DNS Deep Packet Inspection & Entropy Filter",
      isDefended: dnsFilterActive,
      unprotectedLoss: "₹45,00,000 in proprietary neural model research theft",
      dpdpExposure: "₹50,00,000",
      rawLeak: "QUERY: 4x8B91aC0...payload.c2.attacker.com IN A\nRESPONSE: 104.244.42.1 (Exfiltrated 4.2 MB in 150 requests)"
    },
    s3_misconfig: {
      title: "3. Public Cloud S3 Bucket Misconfiguration",
      location: "Ichapur Telemedicine Clinic",
      engineer: "Mahima",
      vector: "Anonymous public-read bucket policy permitting unauthorized internet downloads.",
      targetData: "12,000 Patient EHR Vitals, Aadhaar KYC & Prescription Records",
      counterControl: "AWS S3 Block Public Access & GuardDuty Anomaly Engine",
      isDefended: s3BlockPublicActive,
      unprotectedLoss: "₹85,00,000 in hospital reputation loss & patient identity theft",
      dpdpExposure: "₹2,50,00,000 (DPDP Statutory Penalty Risk)",
      rawLeak: "s3://ichapur-patient-backups-2026/patient_records_dump.csv\n[Mahima_ICU_Patient_ID: 10482, Aadhaar: 9812-4412-8812, Diagnosis: Critical Cardiac]"
    },
    lsass_dump: {
      title: "4. Credential Dumping Attack (LSASS.exe)",
      location: "Kolkata Financial District",
      engineer: "Mamata",
      vector: "Malicious process attempting memory inspection against LSASS memory space.",
      targetData: "Domain Admin Kerberos Hashes & Plaintext Banking Credentials",
      counterControl: "Windows Defender Credential Guard & RunAsPPL Virtualization",
      isDefended: credentialGuardActive,
      unprotectedLoss: "₹1,20,00,000 in unauthorized financial fund diversion",
      dpdpExposure: "₹5,00,00,000",
      rawLeak: "[SECURITY AUDIT LOG] Unauthorized LSASS Memory Access Probe Detected\nTarget Domain: KOLKATA-BANK | Account: Mamata_Admin\nStatus: Intercepted by Credential Guard"
    }
  };

  const currentScenario = threats[selectedThreat];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col space-y-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-rose-950/80 border border-rose-600/60 rounded-full text-xs font-semibold text-rose-300 uppercase tracking-widest">
              Course Module 002_001 • Topic 2
            </span>
            <span className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 rounded-full text-xs font-semibold text-amber-300">
              Threat Intelligence &amp; Forensics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Threats to Confidentiality and Data Breaches
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Analyze the attack vectors compromising digital privacy and confidentiality: packet sniffing, ARP spoofing,
            SSL stripping, DNS tunneling, cloud bucket misconfigurations, and LSASS credential dumping. Master incident
            response protocols under <strong>CERT-In 6-hour mandatory reporting</strong> and statutory liabilities under the
            <strong> DPDP Act 2023</strong> in India.
          </p>
        </div>

        {/* Section 1: Major Confidentiality Threat Vectors */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-rose-400">
            1. Major Confidentiality Threat Vectors &amp; Attack Mechanisms
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Adversaries employ diverse techniques across network wires, endpoint memory, and cloud boundaries to bypass
            confidentiality protections:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Threat 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📡</span>
                <h3 className="text-sm font-bold text-white">Eavesdropping &amp; MitM</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Passive Wi-Fi sniffing in promiscuous mode, ARP cache poisoning, and SSL stripping forcing cleartext HTTP downgrades.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Tool: Wireshark / arpspoof</span>
            </div>

            {/* Threat 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🌪️</span>
                <h3 className="text-sm font-bold text-white">Covert Tunneling</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Encoding stolen files into base64 DNS queries (UDP 53) or ICMP ping payloads to evade egress perimeter firewalls.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Vector: DNS / ICMP Tunnels</span>
            </div>

            {/* Threat 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">☁️</span>
                <h3 className="text-sm font-bold text-white">Cloud Misconfigurations</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Leaving AWS S3 buckets or Azure blobs open with 'Public-Read' permissions, leaking millions of unencrypted customer records.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Risk: Anonymous Read Access</span>
            </div>

            {/* Threat 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-rose-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🧠</span>
                <h3 className="text-sm font-bold text-white">Memory Extraction</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dumping LSASS.exe process memory via Mimikatz to extract plaintext credentials, NTLM hashes, and Kerberos golden tickets.
              </p>
              <span className="text-[10px] text-rose-400 font-semibold uppercase">Vector: LSASS Memory Dump / Cold Boot</span>
            </div>
          </div>
        </div>

        {/* Section 2: Semantic SVG Data Breach Kill-Chain */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-rose-400">
            2. Data Breach Anatomy &amp; Attack Kill-Chain Pipeline
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Understanding how threat actors progress from initial reconnaissance to unauthorized data exfiltration:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex justify-center items-center overflow-x-auto">
            <svg viewBox="0 0 840 240" className="w-full max-w-4xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="breachGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#4c0519" />
                </linearGradient>
              </defs>

              {/* Stage 1 */}
              <rect x="20" y="40" width="140" height="150" rx="8" fill="url(#breachGrad)" stroke="#f43f5e" strokeWidth="2" />
              <text x="90" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1. RECON &amp; INFIL</text>
              <text x="90" y="100" fill="#fda4af" fontSize="9" textAnchor="middle">Spear Phishing</text>
              <text x="90" y="120" fill="#fda4af" fontSize="9" textAnchor="middle">Public S3 Scans</text>
              <text x="90" y="140" fill="#fda4af" fontSize="9" textAnchor="middle">Credential Stuffing</text>

              {/* Arrow 1 */}
              <path d="M 165 115 L 185 115" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />

              {/* Stage 2 */}
              <rect x="190" y="40" width="140" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="260" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2. PRIV ESCALATION</text>
              <text x="260" y="100" fill="#fcd34d" fontSize="9" textAnchor="middle">LSASS Memory Dump</text>
              <text x="260" y="120" fill="#fcd34d" fontSize="9" textAnchor="middle">Mimikatz Hashes</text>
              <text x="260" y="140" fill="#fcd34d" fontSize="9" textAnchor="middle">Kerberoasting</text>

              {/* Arrow 2 */}
              <path d="M 335 115 L 355 115" stroke="#f59e0b" strokeWidth="3" />

              {/* Stage 3 */}
              <rect x="360" y="40" width="140" height="150" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
              <text x="430" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3. LATERAL MOVE</text>
              <text x="430" y="100" fill="#7dd3fc" fontSize="9" textAnchor="middle">Internal Port Scans</text>
              <text x="430" y="120" fill="#7dd3fc" fontSize="9" textAnchor="middle">SMB / RDP Pivoting</text>
              <text x="430" y="140" fill="#7dd3fc" fontSize="9" textAnchor="middle">Database Discovery</text>

              {/* Arrow 3 */}
              <path d="M 505 115 L 525 115" stroke="#0ea5e9" strokeWidth="3" />

              {/* Stage 4 */}
              <rect x="530" y="40" width="140" height="150" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="600" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4. DATA STAGING</text>
              <text x="600" y="100" fill="#d8b4fe" fontSize="9" textAnchor="middle">Gzip / 7-Zip Archive</text>
              <text x="600" y="120" fill="#d8b4fe" fontSize="9" textAnchor="middle">AES Encryption</text>
              <text x="600" y="140" fill="#d8b4fe" fontSize="9" textAnchor="middle">Shadow Copy Dumps</text>

              {/* Arrow 4 */}
              <path d="M 675 115 L 695 115" stroke="#a855f7" strokeWidth="3" />

              {/* Stage 5 */}
              <rect x="700" y="40" width="125" height="150" rx="8" fill="#4c0519" stroke="#e11d48" strokeWidth="2.5" />
              <text x="762" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">5. EXFILTRATION</text>
              <text x="762" y="100" fill="#fda4af" fontSize="9" textAnchor="middle">DNS Tunneling</text>
              <text x="762" y="120" fill="#fda4af" fontSize="9" textAnchor="middle">C2 Cloud Upload</text>
              <text x="762" y="140" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">CERT-In 6h Alert</text>
            </svg>
          </div>
        </div>

        {/* Section 3: Interactive Studio */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-rose-400">
            3. Interactive Data Breach Anatomy &amp; Exfiltration Interceptor Studio
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Select a confidentiality attack vector, observe the live raw exfiltration payload and statutory DPDP penalty risk,
            and toggle enterprise defensive controls to intercept the breach in real-time:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-6">
            {/* Threat Selection Grid */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                1. Select Confidentiality Threat Scenario:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {Object.entries(threats).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedThreat(key)}
                    className={clsx(
                      "p-3 rounded-lg border text-left transition-all duration-300 flex flex-col space-y-1",
                      selectedThreat === key
                        ? "bg-slate-800 border-rose-500 shadow-md shadow-rose-500/20"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    )}
                  >
                    <span className="text-xs font-bold text-white line-clamp-1">{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.location}</span>
                    <span className="text-[10px] text-rose-400">Lead: {item.engineer}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Defense Controls Toggles */}
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                2. Enterprise Defensive Interceptor Controls (Deploy &amp; Activate):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Control 1 */}
                <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">TLS 1.3 / IPsec</span>
                    <span className="text-[10px] text-slate-500">Wi-Fi &amp; LAN Encryption</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={encryptionActive}
                    onChange={(e) => setEncryptionActive(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700"
                  />
                </label>

                {/* Control 2 */}
                <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">DNS DPI Filter</span>
                    <span className="text-[10px] text-slate-500">Block DNS Tunneling</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={dnsFilterActive}
                    onChange={(e) => setDnsFilterActive(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700"
                  />
                </label>

                {/* Control 3 */}
                <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">S3 Block Public</span>
                    <span className="text-[10px] text-slate-500">Prevent Cloud Leaks</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={s3BlockPublicActive}
                    onChange={(e) => setS3BlockPublicActive(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700"
                  />
                </label>

                {/* Control 4 */}
                <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200">Credential Guard</span>
                    <span className="text-[10px] text-slate-500">LSASS Memory Isolation</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={credentialGuardActive}
                    onChange={(e) => setCredentialGuardActive(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700"
                  />
                </label>
              </div>
            </div>

            {/* Live Interceptor Console */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Incident Status &amp; Defense Analysis:
                  </span>
                  <p className="text-xs text-slate-300 mt-0.5">
                    <strong>Target Asset:</strong> {currentScenario.targetData}
                  </p>
                </div>
                <span
                  className={clsx(
                    "px-3 py-1 text-xs font-bold rounded-full border",
                    currentScenario.isDefended
                      ? "bg-emerald-950 text-emerald-400 border-emerald-600"
                      : "bg-rose-950 text-rose-400 border-rose-600 animate-pulse"
                  )}
                >
                  {currentScenario.isDefended
                    ? "🛡️ BREACH INTERCEPTED & BLOCKED"
                    : "🚨 CRITICAL BREACH IN PROGRESS"}
                </span>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Unmitigated Financial Impact:</span>
                  <p className="text-xs font-bold text-rose-400 mt-1">{currentScenario.unprotectedLoss}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">DPDP Statutory Penalty Risk:</span>
                  <p className="text-xs font-bold text-amber-400 mt-1">{currentScenario.dpdpExposure}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">CERT-In Compliance Timer:</span>
                  <p className="text-xs font-bold text-sky-400 mt-1">6-Hour Mandatory Reporting Clock</p>
                </div>
              </div>

              {/* Raw Exfiltration Stream / Block Message */}
              <div className="flex flex-col space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  {currentScenario.isDefended ? "SOC Interceptor Log (Traffic Dropped):" : "Raw Captured Exfiltration Data Stream:"}
                </span>
                <pre className="p-3 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto">
                  {currentScenario.isDefended
                    ? `[INTERCEPTED] Security Control '${currentScenario.counterControl}' triggered.\n[ACTION] Connection terminated. 0 bytes leaked.\n[AUDIT] Forensics snapshot captured. Incident logged to SIEM.`
                    : currentScenario.rawLeak}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Four Bengal Case Studies */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-rose-400">
            4. Real-World Data Breach Investigations in West Bengal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  1. Sensor Telemetry Wi-Fi Sniffing Defense
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹2,80,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Forensic Lead:</strong> Debangshu &bull; <strong>Location:</strong> Barrackpore Testing Site
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu detected an unauthorized packet sniffer in promiscuous mode near a Barrackpore metallurgical
                facility capturing cleartext thermal sensor telemetry. Debangshu upgraded the wireless network to WPA3-Enterprise
                with mandatory IPsec tunnel encryption, deploying an RF spectrum analyzer for ₹2,80,000 to eliminate eavesdropping.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  2. Hospital ICU Patient S3 Bucket Audit
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹1,90,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Forensic Lead:</strong> Mahima &bull; <strong>Location:</strong> Ichapur Telemedicine Clinic
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mahima investigated a security audit alert in an Ichapur telemedicine cloud environment where a backup storage
                bucket containing 12,000 patient vitals was inadvertently marked public-read. Mahima remediated the issue within
                45 minutes, enabled AWS S3 Block Public Access, and conducted a ₹1,90,000 forensic audit verifying zero unauthorized downloads.
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  3. FinTech UPI Session Hijacking &amp; Dark Web Hunt
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹5,20,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Forensic Lead:</strong> Mamata &bull; <strong>Location:</strong> Kolkata Financial Hub
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mamata thwarted an advanced session hijacking campaign targeting a Kolkata online payment engine where info-stealers
                attempted to extract session tokens. Mamata implemented client-bound mTLS certificates, reduced token validity
                to 5 minutes, and invested ₹5,20,000 in dark-web threat monitoring to track compromised credentials in real time.
              </p>
            </div>

            {/* Case Study 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  4. Academic DNS Tunneling Exfiltration Interception
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹3,60,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Forensic Lead:</strong> Abhronila &bull; <strong>Location:</strong> Jadavpur Research Campus
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Abhronila uncovered an insider attempt to exfiltrate proprietary machine learning model weights in Jadavpur via
                DNS tunneling over UDP 53. Abhronila deployed an AI-driven DNS firewall that inspects domain entropy and query
                volumetric rates for ₹3,60,000, instantly neutralizing the exfiltration channel before data could escape.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Common Pitfalls & Regulatory Guidance */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-rose-400">
            5. Common Pitfalls &amp; Regulatory Guidance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center space-x-2">
                <span>⚠️ Overlooking Outbound DNS &amp; ICMP Channels</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Organizations often configure strict ingress firewalls while leaving outbound UDP 53 (DNS) and ICMP (ping)
                completely uninspected. Adversaries exploit these open outbound channels with DNS tunneling to quietly siphon
                gigabytes of confidential intellectual property.
              </p>
            </div>
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span>💡 Mandatory CERT-In 6-Hour Reporting Compliance</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always maintain an active DFIR response playbook. Under Indian regulations, confirmed data breaches must be
                reported to CERT-In within 6 hours. Budget all enterprise DFIR retainers, dark web monitoring feeds, and forensic
                investigation toolsets in Indian Rupees (₹).
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Revision Checklist */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Student Revision Checklist:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Define a Data Breach and contrast it with an unauthorized scan.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Explain packet sniffing, ARP spoofing, and SSL stripping.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Describe the mechanics of DNS tunneling and ICMP exfiltration.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Identify root causes of public S3 cloud storage leaks.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>State the CERT-In mandatory 6-hour reporting window in India.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-rose-400">✓</span>
              <span>Formulate DFIR retainer and forensic audit budgets in Indian Rupees (₹).</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Threats to Confidentiality and Data Breaches FAQs" questions={questions} />

        {/* Teacher's Note Section */}
        <Teacher
          note={
            "Always adopt an 'Assume Breach' mindset. Encrypt every network channel with TLS 1.3, inspect outbound DNS queries for high-entropy tunneling, lock down public cloud storage buckets, and remember that CERT-In requires incident reporting within a strict 6-hour window. Maintain professional DFIR retainers budgeted in Indian Rupees (₹)!"
          }
        />

        {/* Printable Note Component */}
        <PlainTextPrint
          content={noteText}
          title="Threats to Confidentiality and Data Breaches"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic3_note.txt"
        />
      </div>
    </div>
  );
};

export default Topic2;
