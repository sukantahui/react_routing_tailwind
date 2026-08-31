import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgSupplyChainId = useId();
  const svgRamScraperId = useId();

  // Studio 1: RAM Scraping vs Hardware P2PE Simulation State
  const [paymentTerminalType, setPaymentTerminalType] = useState("legacy_magnetic_stripe"); // legacy_magnetic_stripe, emv_chip, hardware_p2pe
  const [isSwipingCard, setIsSwipingCard] = useState(false);
  const [scrapedCardsList, setScrapedCardsList] = useState([]);

  // Studio 2: Network Topology & Third-Party ZTNA Comparator
  const [networkArchitecture, setNetworkArchitecture] = useState("flat_unsegmented"); // flat_unsegmented, vlan_segmented, ztna_microsegmented
  const [hvacVendorMfaEnabled, setHvacVendorMfaEnabled] = useState(false);
  const [totalStoreRegisters, setTotalStoreRegisters] = useState(1800); // 100 to 5000 registers

  // Studio 3: SOC Alert Fatigue & SOAR Automated Escalation Lab
  const [fireEyeDetectionMode, setFireEyeDetectionMode] = useState("monitor_only"); // monitor_only, soar_automated_quarantine
  const [dailyAlertVolume, setDailyAlertVolume] = useState(12000); // 1000 to 25000 alerts
  const [analystCount, setAnalystCount] = useState(3); // 1 to 10 analysts

  // Studio 4: Regional Supermarket Retail Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("audit_overview");

  // Sample Simulated Card Database for Studio 1
  const sampleCardPool = [
    { cardholder: "Mamata Banerjee", pan: "4532 9812 3456 7890", exp: "12/28", cvv: "482", bank: "State Bank of India (Kolkata Branch)" },
    { cardholder: "Mahima Roy", pan: "5241 8765 4321 0987", exp: "09/27", cvv: "193", bank: "HDFC Bank (Barrackpore Branch)" },
    { cardholder: "Abhronila Sen", pan: "4111 2345 6789 0123", exp: "04/29", cvv: "731", bank: "ICICI Bank (Ichapur Branch)" },
    { cardholder: "Susmita Mukherjee", pan: "6011 3456 7890 1234", exp: "11/26", cvv: "852", bank: "Axis Bank (Jadavpur Branch)" }
  ];

  // Studio 1: Trigger Simulated Customer Transaction
  const handleSimulateSwipe = () => {
    setIsSwipingCard(true);
    const randomCard = sampleCardPool[Math.floor(Math.random() * sampleCardPool.length)];

    setTimeout(() => {
      let captureResult = {};
      if (paymentTerminalType === "legacy_magnetic_stripe") {
        // Plaintext Track 2 data in RAM - Captured by BlackPOS!
        captureResult = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          cardholder: randomCard.cardholder,
          track2Data: `;${randomCard.pan.replace(/\s/g, "")}=${randomCard.exp.replace("/", "")}201${randomCard.cvv}?`,
          status: "SUCCESSFULLY HARVESTED BY BLACKPOS RAM SCRAPER",
          statusColor: "text-rose-400 font-bold",
          isCiphertext: false
        };
      } else if (paymentTerminalType === "emv_chip") {
        // Dynamic cryptogram in RAM - One-time use token
        captureResult = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          cardholder: randomCard.cardholder,
          track2Data: `DYN_ARQC_TOKEN:${Math.random().toString(36).substring(2, 10).toUpperCase()} (Cannot be reused/cloned)`,
          status: "CLONING FAILED: Dynamic Cryptogram Protected",
          statusColor: "text-amber-400 font-semibold",
          isCiphertext: false
        };
      } else {
        // Hardware P2PE - Encrypted before hitting POS RAM!
        captureResult = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          cardholder: "ENCRYPTED_HARDWARE_PAYLOAD",
          track2Data: `AES_256_GCM:0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
          status: "ZERO DATA EXPOSURE: Hardware P2PE Ciphertext Captured (Useless to Hacker)",
          statusColor: "text-emerald-400 font-bold",
          isCiphertext: true
        };
      }

      setScrapedCardsList((prev) => [captureResult, ...prev.slice(0, 5)]);
      setIsSwipingCard(false);
    }, 600);
  };

  // Studio 2: Live Network Topology Blast Radius Calculation
  const topologyMetrics = useMemo(() => {
    let compromisedRegisters = 0;
    let attackPathStatus = "";
    let riskLevel = "Critical";

    if (!hvacVendorMfaEnabled) {
      if (networkArchitecture === "flat_unsegmented") {
        compromisedRegisters = totalStoreRegisters;
        attackPathStatus = "UNRESTRICTED: HVAC Vendor Credentials ➔ Active Directory Domain Controller ➔ SCCM ➔ All POS Registers Compromised";
        riskLevel = "CRITICAL (100% Enterprise Loss — Target 2013 Scenario)";
      } else if (networkArchitecture === "vlan_segmented") {
        compromisedRegisters = Math.round(totalStoreRegisters * 0.4);
        attackPathStatus = "PARTIAL CONTAINMENT: Inter-VLAN routing without deep inspection allowed lateral traversal to 40% of POS subnets";
        riskLevel = "HIGH RISK (Lateral Pivot Possible)";
      } else {
        compromisedRegisters = 0;
        attackPathStatus = "BLOCKED AT INGRESS: Zero Trust Network Access (ZTNA) isolated vendor to isolated billing proxy; zero route to POS CDE";
        riskLevel = "SAFE (Zero Lateral Movement)";
      }
    } else {
      // MFA Enabled
      if (networkArchitecture === "ztna_microsegmented") {
        compromisedRegisters = 0;
        attackPathStatus = "ABSOLUTE SECURITY: FIDO2 Hardware MFA blocked credential replay; ZTNA micro-segmentation blocked network traversal";
        riskLevel = "HARDENED RESILIENT";
      } else {
        compromisedRegisters = 0;
        attackPathStatus = "CONTAINED AT PORTAL: FIDO2 Hardware MFA stopped the phished Citadel password from authenticating";
        riskLevel = "CONTAINED";
      }
    }

    const containmentPct = (((totalStoreRegisters - compromisedRegisters) / totalStoreRegisters) * 100).toFixed(1);

    return {
      compromisedRegisters,
      containmentPct,
      attackPathStatus,
      riskLevel
    };
  }, [networkArchitecture, hvacVendorMfaEnabled, totalStoreRegisters]);

  // Studio 3: SOC Alert Fatigue & Escalation Metrics
  const socFatigueMetrics = useMemo(() => {
    const secondsAvailablePerAlert = Math.round((analystCount * 8 * 3600) / dailyAlertVolume);
    let breachDwellTimeDays = 0;
    let alertOutcome = "";

    if (fireEyeDetectionMode === "monitor_only") {
      if (secondsAvailablePerAlert < 30) {
        breachDwellTimeDays = 24; // Exactly like Target in 2013!
        alertOutcome = "ALERT OVERLOOKED: High alert volume caused Tier-2 analysts to dismiss BlackPOS detection alerts as routine noise. Breach went unstopped for 24 days!";
      } else {
        breachDwellTimeDays = 4;
        alertOutcome = "DELAYED MANUAL ESCALATION: Analysts manually reviewed ticket after 4 days of lateral spread.";
      }
    } else {
      breachDwellTimeDays = 0.001; // Seconds
      alertOutcome = "INSTANT AUTOMATED CONTAINMENT: SOAR Playbook quarantined the infected POS host in 12 seconds and severed network interfaces immediately upon FireEye signature match.";
    }

    return {
      secondsAvailablePerAlert,
      breachDwellTimeDays,
      alertOutcome
    };
  }, [fireEyeDetectionMode, dailyAlertVolume, analystCount]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 border border-rose-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 2</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              Case Study 2: Target Corporation Data Breach (2013) — HVAC Supply Chain Vector
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Forensic investigation into the landmark retail breach: How phished credentials of a small refrigeration contractor (Fazio Mechanical) brought down a ₹1,680+ Crore enterprise network due to a flat architecture, BlackPOS RAM scraping, and SOC alert fatigue.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Third-Party Risk (TPRM)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Flat Network vs Zero Trust</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">BlackPOS (Kaptoxa) Memory Scraper</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Hardware P2PE & EMV Defense</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL SUPPLY CHAIN KILL CHAIN INFOGRAPHIC */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">01.</span> Anatomy of the 2013 Target Supply Chain Kill Chain
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing how a peripheral vendor phishing email pivoted across enterprise networks into 10,000+ retail cash registers.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-mono">
              Target 2013 Attack Path
            </span>
          </div>

          {/* SVG INFOGRAPHIC: Target Supply Chain Infiltration */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Architectural Infiltration Flow: From Fazio Mechanical Services to Nationwide POS Exfiltration
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgSupplyChainId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#881337" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Step 1: HVAC Vendor Phishing */}
                <rect x="20" y="20" width="160" height="180" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="100" y="45" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">1. VENDOR PHISHING</text>
                <text x="100" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">Fazio Mechanical (HVAC)</text>
                <text x="100" y="95" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Citadel Banking Trojan</text>
                <text x="100" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Consumer AV without</text>
                <text x="100" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">real-time protection</text>
                <rect x="35" y="150" width="130" height="26" rx="6" fill="#881337" />
                <text x="100" y="167" textAnchor="middle" fill="#ffe4e6" fontSize="9" fontWeight="bold">Stolen Vendor Portal Creds</text>

                {/* Arrow 1 */}
                <line x1="180" y1="110" x2="205" y2="110" stroke="#f43f5e" strokeWidth="3" />

                {/* Step 2: Vendor Portal Ingress */}
                <rect x="205" y="20" width="160" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="285" y="45" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">2. PORTAL INGRESS</text>
                <text x="285" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">Target Supplier Web Portal</text>
                <text x="285" y="95" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">NO MFA Enforced!</text>
                <text x="285" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Static username & pass</text>
                <text x="285" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">granted full network access</text>
                <rect x="220" y="150" width="130" height="26" rx="6" fill="#78350f" />
                <text x="285" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Direct Network Ingress</text>

                {/* Arrow 2 */}
                <line x1="365" y1="110" x2="390" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Step 3: Flat Network Lateral Move */}
                <rect x="390" y="20" width="160" height="180" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="470" y="45" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontWeight="bold">3. LATERAL PIVOT</text>
                <text x="470" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">Flat Corporate Network</text>
                <text x="470" y="95" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Pass-the-Hash Active Dir.</text>
                <text x="470" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">No internal firewalls</text>
                <text x="470" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">between billing and POS</text>
                <rect x="405" y="150" width="130" height="26" rx="6" fill="#581c87" />
                <text x="470" y="167" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">SCCM Admin Takeover</text>

                {/* Arrow 3 */}
                <line x1="550" y1="110" x2="575" y2="110" stroke="#8b5cf6" strokeWidth="3" />

                {/* Step 4: BlackPOS Deployment */}
                <rect x="575" y="20" width="150" height="180" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="650" y="45" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">4. BLACKPOS (RAM)</text>
                <text x="650" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">10,000+ POS Registers</text>
                <text x="650" y="95" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">`POSDW.EXE` Service</text>
                <text x="650" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Scrapes Track 1/Track 2</text>
                <text x="650" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">from process memory</text>
                <rect x="585" y="150" width="130" height="26" rx="6" fill="#7f1d1d" />
                <text x="650" y="167" textAnchor="middle" fill="#fee2e2" fontSize="9" fontWeight="bold">40M Cards Harvested</text>

                {/* Arrow 4 */}
                <line x1="725" y1="110" x2="745" y2="110" stroke="#ef4444" strokeWidth="3" />

                {/* Step 5: Exfiltration & Carding */}
                <rect x="745" y="20" width="140" height="180" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="815" y="45" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">5. EXFILTRATION</text>
                <text x="815" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">FTP to Bulletproof VPS</text>
                <text x="815" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Rescator.cc Darknet</text>
                <text x="815" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Staged in C$\Temp,</text>
                <text x="815" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">sold as 'Tortuga' dumps</text>
                <rect x="752" y="150" width="125" height="26" rx="6" fill="#1e3a8a" />
                <text x="815" y="167" textAnchor="middle" fill="#dbeafe" fontSize="9" fontWeight="bold">₹1,680 Cr Fallout</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE BLACKPOS MEMORY SCRAPER & HARDWARE P2PE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">02.</span> Studio 1: BlackPOS RAM Scraping vs Hardware P2PE Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate a customer payment transaction. Contrast how legacy magnetic swipe exposes unencrypted card Track 2 data in process RAM versus hardware Point-to-Point Encryption (P2PE).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono self-start sm:self-auto">
              RAM Scraper Laboratory
            </span>
          </div>

          {/* Payment Terminal Technology Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setPaymentTerminalType("legacy_magnetic_stripe")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                paymentTerminalType === "legacy_magnetic_stripe"
                  ? "bg-rose-950/60 border-rose-600 text-rose-200 ring-2 ring-rose-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-rose-400 text-sm">1. Legacy Magnetic Stripe (Target 2013)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Plaintext magnetic Track 1/Track 2 data resides in POS application process RAM for milliseconds during authorization.
              </p>
            </button>

            <button
              onClick={() => setPaymentTerminalType("emv_chip")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                paymentTerminalType === "emv_chip"
                  ? "bg-amber-950/60 border-amber-600 text-amber-200 ring-2 ring-amber-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-amber-400 text-sm">2. EMV Chip & PIN (Dynamic Token)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Generates a single-use dynamic cryptogram (ARQC) per transaction. Scraped memory tokens cannot be cloned onto counterfeit cards.
              </p>
            </button>

            <button
              onClick={() => setPaymentTerminalType("hardware_p2pe")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                paymentTerminalType === "hardware_p2pe"
                  ? "bg-emerald-950/60 border-emerald-600 text-emerald-200 ring-2 ring-emerald-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-emerald-400 text-sm">3. Hardware Point-to-Point Encryption (P2PE)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Card data is encrypted inside the physical PIN pad hardware security chip (TRSM). POS computer RAM only ever sees useless AES ciphertext!
              </p>
            </button>
          </div>

          {/* Swipe Trigger Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Simulate Customer Card Payment Swipe</div>
              <div className="text-[11px] text-gray-400">
                Active Terminal Mode: <span className="font-mono text-amber-400 uppercase font-semibold">{paymentTerminalType.replace(/_/g, " ")}</span>
              </div>
            </div>
            <button
              onClick={handleSimulateSwipe}
              disabled={isSwipingCard}
              className={clsx(
                "px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2",
                isSwipingCard
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:from-rose-500 hover:to-amber-500 shadow-lg shadow-rose-950/50"
              )}
            >
              {isSwipingCard ? "Processing Payment & Scraping RAM..." : "💳 Swipe / Insert Customer Card"}
            </button>
          </div>

          {/* Scraped Memory Buffer Output Stream */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Live Process RAM Interception Feed (`POSDW.EXE` BlackPOS Memory Sniffer):
            </h4>
            <div className="bg-black/70 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs max-h-64 overflow-y-auto">
              {scrapedCardsList.length === 0 ? (
                <div className="text-gray-500 text-center py-6">
                  [Awaiting Customer Card Swipe on Cash Register...] Click the button above to simulate transaction processing.
                </div>
              ) : (
                scrapedCardsList.map((item) => (
                  <div key={item.id} className="p-3 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">[{item.time}] Process: `pos_checkout.exe` (PID: 3412)</span>
                      <span className={item.statusColor}>{item.status}</span>
                    </div>
                    <div className="text-amber-300 break-all text-[11px]">
                      Captured Buffer: <span className="text-white">{item.track2Data}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* STUDIO 2: FLAT ENTERPRISE NETWORK VS ZERO TRUST BLAST RADIUS COMPARATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">03.</span> Studio 2: Flat Network vs Zero Trust Architecture Comparator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Analyze why flat enterprise networks allow a single compromised HVAC supplier credential to conquer 100% of internal payment systems.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              Network Topology Lab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Network Architecture & Authentication Controls
              </h3>

              {/* Topology Selector */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Enterprise Network Segmentation Policy:</label>
                <select
                  value={networkArchitecture}
                  onChange={(e) => setNetworkArchitecture(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="flat_unsegmented">1. Insecure Flat Network (Target 2013 — No Internal Firewalls)</option>
                  <option value="vlan_segmented">2. Basic VLAN Segmentation (Inter-VLAN Routing Active)</option>
                  <option value="ztna_microsegmented">3. Zero Trust Network Access (ZTNA & Micro-segmentation)</option>
                </select>
              </div>

              {/* Vendor Portal MFA Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Vendor Portal FIDO2 Hardware MFA</div>
                  <div className="text-[11px] text-gray-400">Protects supplier billing gateway from phished passwords</div>
                </div>
                <button
                  onClick={() => setHvacVendorMfaEnabled(!hvacVendorMfaEnabled)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    hvacVendorMfaEnabled ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {hvacVendorMfaEnabled ? "ENFORCED (FIDO2)" : "DISABLED (Password Only)"}
                </button>
              </div>

              {/* Store Register Count Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total POS Cash Registers:</span>
                  <span className="font-mono text-rose-400 font-bold">{totalStoreRegisters} Endpoints</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={totalStoreRegisters}
                  onChange={(e) => setTotalStoreRegisters(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Blast Radius Outputs */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Attack Propagation & Blast Radius Assessment
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Compromised Retail Registers:</span>
                    <span className="font-mono font-bold text-rose-400 text-base">
                      {topologyMetrics.compromisedRegisters} <span className="text-xs text-gray-400 font-normal">/ {totalStoreRegisters}</span>
                    </span>
                  </div>

                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Containment Security Posture:</span>
                    <span className="font-mono font-bold text-emerald-400 text-base">{topologyMetrics.containmentPct}% Contained</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Adversary Lateral Attack Trajectory:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{topologyMetrics.attackPathStatus}</p>
                  </div>
                </div>
              </div>

              <div className={clsx("p-3 rounded-xl border text-xs text-center font-bold", topologyMetrics.compromisedRegisters > 0 ? "bg-rose-950/40 border-rose-800 text-rose-300" : "bg-emerald-950/40 border-emerald-800 text-emerald-300")}>
                OVERALL THREAT STATUS: {topologyMetrics.riskLevel}
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 3: SOC ALERT FATIGUE & AUTOMATED SOAR CONTAINMENT LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">04.</span> Studio 3: SOC Alert Fatigue & SOAR Automated Containment Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Understand why Target's Security Operations Center received valid FireEye malware alerts on Day 1 but ignored them for 24 days due to human ticket overload.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              SOC Escalation Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                SOC Incident Operations Configuration
              </h3>

              {/* FireEye Response Mode */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Threat Prevention & Quarantine Mode:</label>
                <select
                  value={fireEyeDetectionMode}
                  onChange={(e) => setFireEyeDetectionMode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="monitor_only">1. Alert-Only / Monitor Mode (Target 2013 — Disabled Auto-Drop)</option>
                  <option value="soar_automated_quarantine">2. Modern SOAR Automated Isolation (Instant Host Quarantine)</option>
                </select>
              </div>

              {/* Daily Alert Count Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Inbound SOC Alarms:</span>
                  <span className="font-mono text-amber-400 font-bold">{dailyAlertVolume.toLocaleString()} Alerts/Day</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={25000}
                  step={1000}
                  value={dailyAlertVolume}
                  onChange={(e) => setDailyAlertVolume(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Analyst Shift Headcount Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">On-Duty Tier-1/Tier-2 Analysts:</span>
                  <span className="font-mono text-purple-400 font-bold">{analystCount} Analysts</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={analystCount}
                  onChange={(e) => setAnalystCount(parseInt(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Fatigue & Dwell Time Analysis */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Operational Alert Fatigue Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Time Available per Alert per Analyst:</span>
                    <span className={clsx("font-mono font-bold text-base", socFatigueMetrics.secondsAvailablePerAlert < 30 ? "text-rose-400" : "text-emerald-400")}>
                      {socFatigueMetrics.secondsAvailablePerAlert} Seconds
                    </span>
                  </div>

                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Adversary Dwell Time Before Eviction:</span>
                    <span className={clsx("font-mono font-bold text-base", socFatigueMetrics.breachDwellTimeDays > 1 ? "text-rose-400" : "text-emerald-400")}>
                      {socFatigueMetrics.breachDwellTimeDays >= 1 ? `${socFatigueMetrics.breachDwellTimeDays} Days` : "< 1 Minute (SOAR)"}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Incident Escalation Finding:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{socFatigueMetrics.alertOutcome}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-xs text-purple-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-purple-300">
                  Defensive Takeaway on SOC Automation:
                </span>
                <p>
                  "Humans cannot review 15,000 alerts per day with 20 seconds per ticket. High-fidelity malware drops on crown-jewel assets (POS registers) must trigger automated SOAR containment playbooks without requiring manual ticket dispatch."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL KOLKATA / BARRACKPORE RETAIL STORE LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">05.</span> Studio 4: Regional Supermarket Retail Security Tabletop
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative retail assessment: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional supermarket chain across Barrackpore, Kolkata, Ichapur, and Jadavpur.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional Retail Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-rose-950 text-rose-300 border border-rose-800 px-3 py-1 rounded-full font-medium">
                Lead Retail Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (POS Engineer)
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
                Debangshu (ZTNA Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("audit_overview")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "audit_overview"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Regional Vulnerability Findings
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("remediated_architecture")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "remediated_architecture"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed Defensive Architecture
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "audit_overview" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Kolkata & Barrackpore Outlets:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Flat Store Wi-Fi:</span> Refrigeration technicians in Ichapur connected their laptops to the same internal Wi-Fi SSID used by retail POS checkout terminals.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Unencrypted Magnetic Swipe:</span> Older POS machines in Jadavpur used USB magnetic stripe readers sending cleartext PAN numbers directly into Windows process memory.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Vendor Portal Static Passwords:</span> External cleaning and maintenance contractors authenticated with single-factor passwords lacking MFA.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Executed by Susmita, Debangshu & Mahima:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">PCI-Validated Hardware P2PE:</span> Replaced all cash register swipe readers with Verifone hardware PIN pads with encrypted TRSM modules.
                    </li>
                    <li>
                      <span className="font-semibold text-white">802.1Q Micro-segmentation:</span> Isolated POS cash registers into dedicated VLAN 50 with strict firewall access-control lists dropping all inbound traffic from corporate or vendor zones.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Zero Trust Network Access (ZTNA):</span> Contractor billing and maintenance portals migrated behind a Cloudflare/Zscaler ZTNA proxy requiring FIDO2 hardware keys.
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
            title="Target Corporation Data Breach (2013) — HVAC Supply Chain Vector FAQs"
            subtitle="30 In-depth Practice Questions & Forensic Case Analysis Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Target Corporation Data Breach (2013) — HVAC Supply Chain Vector (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
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

export default Topic2;
