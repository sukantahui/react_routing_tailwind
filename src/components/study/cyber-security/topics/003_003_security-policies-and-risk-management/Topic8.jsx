import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Configurable Quantitative Parameters (in Lakhs of Rupees)
  const [assetValueLakhs, setAssetValueLakhs] = useState(300); // ₹3.0 Crores
  const [exposureFactorPercent, setExposureFactorPercent] = useState(35); // 35%
  const [annualRateOfOccurrence, setAnnualRateOfOccurrence] = useState(1.5); // 1.5 times/year
  const [controlCostLakhs, setControlCostLakhs] = useState(18); // ₹18 Lakhs/year
  const [controlEfficiencyPercent, setControlEfficiencyPercent] = useState(85); // 85% risk reduction

  // Studio 2: Pre-configured Scenario State
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("fintech_ransomware");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_upi_ale");

  // Studio 1 Calculations
  const { sleLakhs, aleBeforeLakhs, aleAfterLakhs, netSavingsLakhs, rosiPercent, isCfoApproved } = useMemo(() => {
    const sle = (assetValueLakhs * (exposureFactorPercent / 100));
    const aleBefore = sle * annualRateOfOccurrence;
    const aleAfter = aleBefore * (1 - controlEfficiencyPercent / 100);
    const grossSavings = aleBefore - aleAfter;
    const netSavings = grossSavings - controlCostLakhs;
    const rosi = controlCostLakhs > 0 ? ((netSavings / controlCostLakhs) * 100).toFixed(1) : "0.0";
    const approved = netSavings > 0;

    return {
      sleLakhs: sle.toFixed(2),
      aleBeforeLakhs: aleBefore.toFixed(2),
      aleAfterLakhs: aleAfter.toFixed(2),
      netSavingsLakhs: netSavings.toFixed(2),
      rosiPercent: rosi,
      isCfoApproved: approved
    };
  }, [assetValueLakhs, exposureFactorPercent, annualRateOfOccurrence, controlCostLakhs, controlEfficiencyPercent]);

  // Studio 2: Pre-configured Scenarios Data
  const quantitativeScenarios = {
    fintech_ransomware: {
      key: "fintech_ransomware",
      title: "1. Ransomware Detonation on Core Payment Switch (FinTech)",
      av: "₹15.00 Crores",
      ef: "40%",
      sle: "₹6.00 Crores",
      aro: "0.5 (Once in 2 yrs)",
      aleBefore: "₹3.00 Crores / yr",
      control: "AWS WAF + EDR + FIDO2 (₹18.5 L/yr)",
      aleAfter: "₹0.15 Crores / yr",
      rosi: "1,440% ROSI",
      verdict: "APPROVED: Protects ₹120 Cr/day UPI flows and saves ₹2.66 Cr/yr.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    healthcare_dpdp_leak: {
      key: "healthcare_dpdp_leak",
      title: "2. Oncology Patient Diagnostic Scans Breach (Healthcare)",
      av: "₹25.00 Crores (DPDP Fine Cap)",
      ef: "20%",
      sle: "₹5.00 Crores",
      aro: "0.25 (Once in 4 yrs)",
      aleBefore: "₹1.25 Crores / yr",
      control: "S3 Object Lock Crypto-Shredder (₹8.2 L/yr)",
      aleAfter: "₹0.05 Crores / yr",
      rosi: "1,360% ROSI",
      verdict: "APPROVED: Shields 80,000 cancer patient files from ₹250 Cr statutory fines.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    scada_blackout_attack: {
      key: "scada_blackout_attack",
      title: "3. Regional Power Grid Blackout Attack (Energy / CII)",
      av: "₹45.00 Crores",
      ef: "100%",
      sle: "₹45.00 Crores",
      aro: "0.1 (Once in 10 yrs)",
      aleBefore: "₹4.50 Crores / yr",
      control: "Unidirectional Physical Data Diodes (₹14.8 L/yr)",
      aleAfter: "₹0.10 Crores / yr",
      rosi: "2,860% ROSI",
      verdict: "APPROVED: Prevents regional grid collapse across 18 substations under IT Act Sec 70.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    ecommerce_ddos_attack: {
      key: "ecommerce_ddos_attack",
      title: "4. Volumetric DDoS Attack on Public Web Portal (Cloud)",
      av: "₹1.50 Crores",
      ef: "10%",
      sle: "₹15.00 Lakhs",
      aro: "4.0 (Quarterly attacks)",
      aleBefore: "₹60.00 Lakhs / yr",
      control: "Cloudflare Magic Transit Anti-DDoS (₹12.0 L/yr)",
      aleAfter: "₹3.00 Lakhs / yr",
      rosi: "375% ROSI",
      verdict: "APPROVED: Prevents checkout cart abandonment during festive sale flash periods.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  };

  const activeScenario = quantitativeScenarios[selectedScenarioKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_upi_ale",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "UPI Switch ALE Calculation & ROSI Justification",
      budget: "₹18,50,000",
      challenge: "UPI Switch (AV: ₹15 Cr, EF: 40%, ARO: 0.5) Had an Unmitigated ALE of ₹3 Crores/Year",
      dilemma:
        "The board hesitated to fund a ₹18.5 Lakh security suite, viewing cybersecurity as a cost center rather than a value protection asset for daily ₹120 Crore UPI flows.",
      resolution:
        "Mamata deployed AWS WAF and FIDO2 MFA (Cost: ₹18.5 Lakhs/yr), reducing ALE to ₹15 Lakhs/yr, delivering a 1,440% ROSI and saving ₹2.66 Crores annually in fraud and settlement losses.",
      metrics: {
        unmitigatedAle: "₹3.00 Crores / Year",
        postControlAle: "₹0.15 Crores / Year",
        calculatedRosi: "1,440% Net Return",
        compliance: "ISO 27005 & FAIR Standard"
      }
    },
    {
      id: "ichapur_pacs_ale",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Oncology PACS Breach Financial Modeling",
      budget: "₹8,20,000",
      challenge: "80,000 Patient Biopsy Scans Carried ₹250 Cr DPDP Exposure with ALE of ₹1.25 Cr",
      dilemma:
        "Hospital management needed exact financial modeling to determine whether purchasing an automated S3 Object Lock crypto-shredder was economically justified.",
      resolution:
        "Mahima deployed the crypto-shredder (Cost: ₹8.2 Lakhs/yr), driving ALE down to ₹5 Lakhs/yr, delivering a 1,360% ROSI and completely eliminating DPDP statutory fine liability.",
      metrics: {
        dpdpFineShield: "₹250 Crores Cap Immunized",
        annualLossReduction: "₹1.20 Crores / Year",
        rosiCalculated: "1,360% Net Return",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_ale",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA Substation ALE & Data Diode Sizing",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced Blackout Risk with Modeled SLE of ₹45 Cr and ALE of ₹4.5 Cr",
      dilemma:
        "Power grid engineers required proof that physical data diodes costing ₹14.8 Lakhs/year provided adequate financial protection against catastrophic regional blackouts.",
      resolution:
        "Debangshu installed unidirectional physical data diodes (Cost: ₹14.8 Lakhs/yr), reducing ALE to ₹10 Lakhs, delivering a 2,860% ROSI and satisfying NCIIPC Protected System mandates under IT Act Sec 70.",
      metrics: {
        blackoutAleBefore: "₹4.50 Crores / Year",
        blackoutAleAfter: "₹0.10 Crores / Year",
        rosiPercentage: "2,860% ROSI",
        compliance: "IT Act Section 70 & CEA Cyber Rules"
      }
    },
    {
      id: "jadavpur_financial_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Quantitative SLE/ALE/ROSI Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Calculate Multi-Variable ALE Equations & Negative ROSI",
      dilemma:
        "Cybersecurity students struggled to calculate multi-variable ALE equations, understand negative ROSI rejection criteria, and size cyber insurance policies based on maximum SLE.",
      resolution:
        "The team developed an interactive Quantitative Loss Expectancy Calculator in React, training 215+ BCA cyber security students on financial risk modeling, insurance sizing, and board budget pitches.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        aleCalculationsRun: "160+ Enterprise Cases",
        examMastery: "100% Financial Risk Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 8 of 14
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Calculating Single Loss Expectancy (SLE) and Annual Loss Expectancy (ALE)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the quantitative economics of information security: calculate Single Loss Expectancy ($SLE = AV \times EF$), 
            determine annualized risk exposure ($ALE = SLE \times ARO$), conduct Cost-Benefit Analysis, and prove Return on Security Investment (ROSI in ₹) to executive leadership under Indian regulations.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Quantitative Loss Expectancy (SLE / ALE / ROSI) Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 1: Interactive SLE / ALE / ROSI Financial Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust Asset Value, Exposure Factor, Annual Frequency, and Tooling Cost to compute real-time Single Loss Expectancy (SLE), Annual Loss Expectancy (ALE), and Return on Security Investment (ROSI).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls: Sliders */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl lg:col-span-2 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Financial Risk Parameters (in Indian Rupees)
              </h3>

              {/* Asset Value Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">1. Total Asset Value (AV):</span>
                  <span className="text-cyan-400 font-bold">₹{assetValueLakhs} Lakhs (₹{(assetValueLakhs / 100).toFixed(2)} Cr)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={assetValueLakhs}
                  onChange={(e) => setAssetValueLakhs(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Exposure Factor Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">2. Exposure Factor (EF % damaged per incident):</span>
                  <span className="text-amber-400 font-bold">{exposureFactorPercent}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={exposureFactorPercent}
                  onChange={(e) => setExposureFactorPercent(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Annual Rate of Occurrence Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-300">3. Annual Rate of Occurrence (ARO events/year):</span>
                  <span className="text-rose-400 font-bold">{annualRateOfOccurrence} events / year</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={annualRateOfOccurrence}
                  onChange={(e) => setAnnualRateOfOccurrence(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Control Cost & Efficiency Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-800">
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-emerald-400 font-bold">4. Annual Control Cost:</span>
                    <span className="text-emerald-300 font-bold">₹{controlCostLakhs} Lakhs/yr</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={controlCostLakhs}
                    onChange={(e) => setControlCostLakhs(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-indigo-400 font-bold">5. Control Risk Reduction:</span>
                    <span className="text-indigo-300 font-bold">{controlEfficiencyPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={controlEfficiencyPercent}
                    onChange={(e) => setControlEfficiencyPercent(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Output: Score Dashboard */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Calculated Financial Metrics
                </h3>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Single Loss Expectancy (SLE):</span>
                  <span className="text-base font-bold text-cyan-300 block">₹{sleLakhs} Lakhs</span>
                  <span className="text-[10px] text-gray-500 font-sans block">Formula: AV (₹{assetValueLakhs}L) x EF ({exposureFactorPercent}%)</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Unmitigated ALE (Before Control):</span>
                  <span className="text-lg font-extrabold text-rose-400 block">₹{aleBeforeLakhs} Lakhs / yr</span>
                  <span className="text-[10px] text-gray-500 font-sans block">Formula: SLE (₹{sleLakhs}L) x ARO ({annualRateOfOccurrence})</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Mitigated ALE (After Control):</span>
                  <span className="text-sm font-bold text-emerald-300 block">₹{aleAfterLakhs} Lakhs / yr</span>
                </div>
              </div>

              {/* ROSI Outcome Banner */}
              <div className="space-y-2">
                <div className="p-3 bg-gray-900 rounded-xl border border-indigo-900/30 text-center font-mono">
                  <span className="text-[10px] text-gray-400 block uppercase">Return on Security Investment (ROSI):</span>
                  <span className={clsx("text-2xl font-extrabold block mt-0.5", isCfoApproved ? "text-emerald-400" : "text-rose-400")}>
                    {rosiPercent}% ROSI
                  </span>
                  <span className="text-[10px] text-gray-400 font-sans block">Net Annual Savings: ₹{netSavingsLakhs} Lakhs</span>
                </div>

                <div className={clsx("p-2.5 rounded-xl border text-[11px] font-mono font-bold text-center", isCfoApproved ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700")}>
                  {isCfoApproved ? "✔ APPROVED BY CFO (Positive Net Return)" : "❌ REJECTED: Tooling costs exceed risk reduction!"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Real-World Threat Scenario Financial Comparison Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Studio 2: Real-World Scenario Financial Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a pre-configured enterprise scenario to inspect calculated Single Loss Expectancy, Annual Loss Expectancy, and Return on Investment.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(quantitativeScenarios).map((sc) => {
              const isSelected = selectedScenarioKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedScenarioKey(sc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{sc.title.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{sc.rosi}</div>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeScenario.badgeClass)}>
                  {activeScenario.rosi}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeScenario.title}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Single Loss Expectancy</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeScenario.sle}</span>
              </div>
            </div>

            {/* AV, EF, ARO, ALE Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px] uppercase">Asset Value (AV):</span>
                <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{activeScenario.av}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px] uppercase">Exposure Factor (EF):</span>
                <span className="font-bold text-amber-300 text-xs sm:text-sm mt-0.5 block">{activeScenario.ef}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px] uppercase">Annual Frequency (ARO):</span>
                <span className="font-bold text-rose-300 text-xs sm:text-sm mt-0.5 block">{activeScenario.aro}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800">
                <span className="text-gray-400 block text-[10px] uppercase">Unmitigated ALE:</span>
                <span className="font-bold text-rose-400 text-xs sm:text-sm mt-0.5 block">{activeScenario.aleBefore}</span>
              </div>
            </div>

            {/* Countermeasure & Verdict */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Deployed Countermeasure &amp; Cost:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeScenario.control}</p>
                <p className="text-emerald-300 text-xs font-bold font-mono mt-1">Mitigated ALE: {activeScenario.aleAfter}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/30 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">CFO &amp; Board Financial Verdict:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed font-sans">{activeScenario.verdict}</p>
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
              Visualizing the Quantitative Financial Calculation Pipeline and the Return on Security Investment (ROSI) Decision Tree.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Financial Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Quantitative Calculation Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: AV x EF */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">ASSET VALUE (AV)</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Total Rupee Value (₹)</text>
                  </g>

                  <text x="170" y="52" fill="#ef4444" fontWeight="bold" fontSize="12">x</text>

                  {/* Step 2: Exposure Factor */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">EXPOSURE (EF)</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">% Damage Per Incident</text>
                  </g>

                  <text x="330" y="52" fill="#10b981" fontWeight="bold" fontSize="12">=</text>

                  {/* Step 3: Single Loss Expectancy */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="412" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">SINGLE LOSS (SLE)</text>
                    <text x="412" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Loss / Event (₹)</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Step 4: Multiply by ARO */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">x ANNUAL FREQUENCY (ARO)</text>
                    <text x="372" y="138" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">Expected Incidents / Year</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold68)" />

                  {/* Step 5: Annual Loss Expectancy */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="125" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">ANNUAL LOSS (ALE)</text>
                    <text x="125" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Total Rupee Exposure / Year</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      MATHEMATICAL FINANCIAL RISK CERTAINTY
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Transforms technical threat assessments into annualized financial balance sheet numbers.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    SLE = AV x EF  |  ALE = SLE x ARO  |  ROSI = [(ALE_Reduction - CC) / CC] x 100
                  </text>

                  <defs>
                    <marker id="arrowGold68" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: The quantitative financial risk calculation pipeline ($AV \times EF = SLE \times ARO = ALE$).
              </p>
            </div>

            {/* Diagram 2: ROSI Decision Tree */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Return on Security Investment (ROSI) Tree
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Root: Calculate ALE Reduction */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="20" width="200" height="45" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="2" />
                    <text x="250" y="42" fill="#c7d2fe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      ALE REDUCTION BENEFIT
                    </text>
                    <text x="250" y="55" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">
                      ALE_before - ALE_after
                    </text>
                  </g>

                  {/* Decision Diamond */}
                  <polygon points="250,95 330,135 250,175 170,135" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="250" y="132" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">
                    ALE REDUCTION &gt;
                  </text>
                  <text x="250" y="145" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">
                    CONTROL COST?
                  </text>

                  <line x1="250" y1="65" x2="250" y2="95" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Left Branch: YES → APPROVED */}
                  <line x1="170" y1="135" x2="100" y2="135" stroke="#10b981" strokeWidth="1.5" />
                  <line x1="100" y1="135" x2="100" y2="195" stroke="#10b981" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="195" width="150" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="100" y="215" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">POSITIVE ROSI &gt; 0%</text>
                    <text x="100" y="230" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">APPROVED BY CFO</text>
                  </g>

                  {/* Right Branch: NO → REJECTED */}
                  <line x1="330" y1="135" x2="400" y2="135" stroke="#ef4444" strokeWidth="1.5" />
                  <line x1="400" y1="135" x2="400" y2="195" stroke="#ef4444" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="325" y="195" width="150" height="50" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="400" y="215" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">NEGATIVE ROSI &lt; 0%</text>
                    <text x="400" y="230" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="6.5">REJECTED (COST EXCESS)</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Security tools must deliver positive financial return by avoiding greater annualized losses.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: The Return on Security Investment (ROSI) financial decision tree.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Quantitative Financial Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads justify UPI budgets in Kolkata, model DPDP fine caps in Ichapur, size data diodes in Barrackpore, and simulate financial risk in Jadavpur.
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
                  <span>⚡</span> Financial Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Quantitative Solution
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
              Guidelines for Financial Risk Architects and CISOs calculating Single and Annual Loss Expectancies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Financial Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Include Statutory Fines:</strong> Factor in DPDP Act ₹250 Cr statutory caps into Asset Value.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Size Insurance by SLE:</strong> Align cyber insurance limits to maximum modeled Single Loss Expectancy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Re-calibrate ARO Annually:</strong> Update threat frequency using CERT-In incident advisories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Prove Positive ROSI:</strong> Demonstrate net annual savings to secure CFO budget approval.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Financial Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing SLE with ALE:</strong> SLE is cost per event; ALE is total annualized exposure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Negative ROSI Blindness:</strong> Purchasing a ₹50 Lakh tool to prevent a ₹10 Lakh annual loss.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Hardware-Only Valuation:</strong> Ignoring daily transaction revenue loss and legal liabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Static ARO Modeling:</strong> Failing to increase attack frequencies when new zero-days are disclosed.</span>
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
                  <span><strong>Deploy Immutable Backups:</strong> Lower Exposure Factor (EF) from 60% down to 5% for ransomware.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain Escrow Reserves:</strong> Hold capital buffers matching banking ALE under RBI rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Stress Tests:</strong> Simulate complete payment switch failover loss scenarios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Patch Velocity:</strong> Reduce ARO by closing Critical CVEs in &lt; 48 hours.</span>
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
              Synthesize Single Loss Expectancy, Annual Loss Expectancy, and ROSI calculations before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Financial Risk Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why negative Return on Security Investment (ROSI) guarantees project rejection: If a security tool costs ₹25 Lakhs per year in maintenance and licenses, but only reduces your Annual Loss Expectancy by ₹10 Lakhs, the organization is losing ₹15 Lakhs every year by deploying the tool. Always design countermeasures whose annual cost is significantly lower than the loss reduction they provide.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Indian DPDP Act 2023 elevates Single Loss Expectancy: Under Section 33, statutory penalties up to ₹250 Crores per data breach transform what used to be a minor ₹10 Lakh incident into an existential multi-crore corporate event, mathematically justifying high-assurance hardware security modules (HSMs) and automated crypto-shredding tools.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your quantitative risk models, incorporate automated cloud backup immutability (AWS S3 Object Lock) to demonstrate how lowering your Exposure Factor (EF) dramatically reduces Single Loss Expectancy and saves crores in annualized risk exposure.
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
                <span>Single Loss Expectancy: SLE = Asset Value (AV) x Exposure Factor (EF).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Annual Rate of Occurrence (ARO) is estimated incident frequency per year.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Annual Loss Expectancy: ALE = SLE x ARO.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Cost-Benefit Rule: (ALE Before - ALE After) must exceed Control Cost (CC).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Return on Security Investment: ROSI = [(ALE Reduction - CC) / CC] x 100.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 33 establishes penalty caps up to ₹250 Crores per breach.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Calculating SLE and ALE FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Quantitative Finance Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Calculating Single Loss Expectancy (SLE) and Annual Loss Expectancy (ALE) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Quantitative Risk Calculation is the definitive bridge between cybersecurity technology and corporate finance. Always remember: calculate Single Loss Expectancy (SLE = AV x EF) to understand single-event impact, compute Annual Loss Expectancy (ALE = SLE x ARO) to annualized exposure, and prove positive Return on Security Investment (ROSI %) to demonstrate that your security controls save far more money than they cost to operate under Indian DPDP Act and RBI regulations!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
