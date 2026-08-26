import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Active Analysis Mode (qualitative vs quantitative)
  const [activeAnalysisMode, setActiveAnalysisMode] = useState("qualitative_heatmap");

  // Mode A: Qualitative Matrix State
  const [qualLikelihood, setQualLikelihood] = useState(4); // 1 to 5
  const [qualImpact, setQualImpact] = useState(4); // 1 to 5

  // Mode B: Quantitative Parameters State (in Lakhs of Rupees)
  const [quantAssetValueLakhs, setQuantAssetValueLakhs] = useState(250); // ₹2.5 Crores
  const [quantExposureFactorPercent, setQuantExposureFactorPercent] = useState(40); // 40%
  const [quantAro, setQuantAro] = useState(2.0); // 2 events per year
  const [quantControlCostLakhs, setQuantControlCostLakhs] = useState(15); // ₹15 Lakhs/year

  // Studio 2: Dimension Explorer State
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("cfo_justification");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_qual_vs_quant");

  // Studio 1 - Qualitative Calculations
  const qualRiskScore = qualLikelihood * qualImpact; // 1 to 25
  const qualSeverity = useMemo(() => {
    if (qualRiskScore >= 20) return { label: "CRITICAL RISK", badgeClass: "bg-rose-950 text-rose-300 border-rose-800", action: "Immediate CISO Escalation (< 24h)" };
    if (qualRiskScore >= 10) return { label: "HIGH RISK", badgeClass: "bg-amber-950 text-amber-300 border-amber-800", action: "Priority Patch SLA (< 14 Days)" };
    if (qualRiskScore >= 5) return { label: "MEDIUM RISK", badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800", action: "Standard Patch SLA (< 30 Days)" };
    return { label: "LOW RISK", badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800", action: "Routine Monitoring (< 90 Days)" };
  }, [qualRiskScore]);

  // Studio 1 - Quantitative Calculations
  const quantResults = useMemo(() => {
    const sleLakhs = (quantAssetValueLakhs * (quantExposureFactorPercent / 100));
    const aleBeforeLakhs = sleLakhs * quantAro;
    const aleAfterLakhs = aleBeforeLakhs * 0.15; // 85% risk mitigation by control
    const annualSavingsLakhs = aleBeforeLakhs - aleAfterLakhs;
    const netBenefitLakhs = annualSavingsLakhs - quantControlCostLakhs;
    const rosiPercent = quantControlCostLakhs > 0 ? ((netBenefitLakhs / quantControlCostLakhs) * 100).toFixed(1) : "0.0";

    return {
      sle: sleLakhs.toFixed(2),
      aleBefore: aleBeforeLakhs.toFixed(2),
      aleAfter: aleAfterLakhs.toFixed(2),
      annualSavings: annualSavingsLakhs.toFixed(2),
      netBenefit: netBenefitLakhs.toFixed(2),
      rosi: rosiPercent
    };
  }, [quantAssetValueLakhs, quantExposureFactorPercent, quantAro, quantControlCostLakhs]);

  // Studio 2: Dimension Data
  const analysisDimensions = {
    cfo_justification: {
      key: "cfo_justification",
      title: "1. Executive Justification & CFO Alignment",
      qualitative: "Weak: Red boxes on a 5x5 heatmap do not provide monetary return on investment (ROSI) to justify multi-lakh capital expenditures.",
      quantitative: "Superior: Calculates exact Rupee Annual Loss Expectancy (ALE) and Return on Security Investment (ROSI), proving financial payback.",
      verdict: "Quantitative is mandatory for securing board security capital budgets (₹25L+).",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    speed_overhead: {
      key: "speed_overhead",
      title: "2. Speed, Simplicity & Resource Overhead",
      qualitative: "Fast & Agile: Can be conducted in a single afternoon workshop using Delphi expert consensus across 1,000 assets with minimal data.",
      quantitative: "Resource Intensive: Requires weeks of actuarial loss data collection, probability distributions, and Monte Carlo computational modeling.",
      verdict: "Qualitative is ideal for rapid initial screening and low-budget projects.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    mathematical_rigor: {
      key: "mathematical_rigor",
      title: "3. Mathematical Rigor & Uncertainty Modeling",
      qualitative: "Subjective: Prone to cognitive bias, inconsistent definitions of 'High', and dominant personality skewing in meetings.",
      quantitative: "Objective & Probabilistic: Uses FAIR standard and Monte Carlo simulations (50,000 trials) to model 95th-percentile Value at Risk (VaR).",
      verdict: "Quantitative eliminates subjective ambiguity through statistical modeling.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    statutory_compliance: {
      key: "statutory_compliance",
      title: "4. Statutory Indian Regulatory Compliance",
      qualitative: "DPDP Act Section 8 DPIAs evaluate subjective citizen privacy harm, discrimination, and constitutional dignity impacts.",
      quantitative: "RBI Master Directions mandate quantitative loss stress testing; DPDP Section 33 models ₹250 Crore penalty caps.",
      verdict: "A hybrid approach is required to satisfy both privacy and financial regulators.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeDimension = analysisDimensions[selectedDimensionKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_qual_vs_quant",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Qualitative Triage vs Quantitative FAIR Modeling",
      budget: "₹18,50,000",
      challenge: "CFO Rejected a ₹45 Lakh EDR Budget Based on a Qualitative Heatmap Slide",
      dilemma:
        "The Chief Financial Officer refused to approve a ₹45 Lakh Enterprise XDR investment based on a qualitative 'Red Box' PowerPoint slide, demanding quantifiable return on investment.",
      resolution:
        "Mamata quantified the risk using FAIR, proving that an unmitigated ALE of ₹3.2 Crores dropped to ₹18 Lakhs with EDR, delivering a 580% ROSI and securing immediate Board budget approval.",
      metrics: {
        unmitigatedAle: "₹3.20 Crores / Year",
        postControlAle: "₹0.18 Crores / Year",
        calculatedRosi: "580% Net Return",
        compliance: "ISO 27005 & FAIR Standard"
      }
    },
    {
      id: "ichapur_dual_mode_dpia",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Dual-Mode Healthcare DPIA & Statutory Modeling",
      budget: "₹8,20,000",
      challenge: "Hospital Required Both Clinical Privacy Evaluation and Financial Modeling",
      dilemma:
        "Hospital clinical care network required qualitative harm evaluation for cancer patients alongside quantitative exposure modeling for potential DPDP Act Section 33 fines.",
      resolution:
        "Mahima conducted a qualitative clinical impact assessment (identifying severe patient harm) alongside quantitative modeling (₹250 Cr fine exposure), justifying automated S3 crypto-shredding tools.",
      metrics: {
        qualitativeHarm: "Severe (Aadhaar & Biopsy Leak)",
        quantitativeFineExposure: "₹250 Crores Statutory Cap",
        toolingApproved: "₹8.2 Lakhs Crypto-Shredder",
        compliance: "DPDP Act 2023 & NABH Charter"
      }
    },
    {
      id: "barrackpore_semi_quant_scada",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Semi-Quantitative Analysis",
      budget: "₹14,80,000",
      challenge: "18 Substations Facing Power Blackout Risks Requiring Quantifiable Metrics",
      dilemma:
        "18 high-voltage 220kV transmission substations required semi-quantitative scoring combining technical CVSS ratings with regional power blackout economic disruption figures.",
      resolution:
        "Debangshu applied semi-quantitative scoring (CVSS 9.8 + ₹450 Cr regional economic impact score), satisfying NCIIPC Protected System mandates under Section 70 of the Indian IT Act.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        semiQuantScore: "118 / 150 (Critical)",
        blackoutImpactModel: "₹450 Crores / 24h",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_dual_mode_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Dual-Mode Risk Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Calculate ROSI & Understand Delphi Consensus",
      dilemma:
        "Cybersecurity students struggled to calculate ROSI percentages, distinguish between SLE and ALE, and understand when to choose qualitative heatmaps over quantitative FAIR modeling.",
      resolution:
        "The team developed an interactive Dual-Mode Risk Analyzer (Qualitative 5x5 Heatmap vs Quantitative FAIR Engine) in React, training 215+ BCA cyber security students on professional risk analysis.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        dualModelsAnalyzed: "80+ Enterprise Scenarios",
        examMastery: "100% Risk Analysis Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 7 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Qualitative vs Quantitative Risk Analysis
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Select the right analytical methodology for enterprise risk: compare subjective 5x5 Qualitative Heatmaps against mathematically rigorous Quantitative FAIR financial loss modeling, 
            calculate Return on Security Investment (ROSI in ₹), and satisfy both privacy and banking regulations under Indian cyber law.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Dual-Mode Risk Analyzer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>⚖️</span> Studio 1: Interactive Dual-Mode Risk Analyzer
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Toggle between Qualitative 5x5 Heatmap Matrix and Quantitative Financial (SLE / ALE / ROSI) Engine.
              </p>
            </div>
            {/* Mode Switcher Tabs */}
            <div className="inline-flex rounded-xl bg-gray-950 p-1 border border-gray-800 text-xs">
              <button
                onClick={() => setActiveAnalysisMode("qualitative_heatmap")}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg font-bold transition-all",
                  activeAnalysisMode === "qualitative_heatmap"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                )}
              >
                Mode A: Qualitative 5x5 Heatmap
              </button>
              <button
                onClick={() => setActiveAnalysisMode("quantitative_fair")}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg font-bold transition-all",
                  activeAnalysisMode === "quantitative_fair"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                )}
              >
                Mode B: Quantitative FAIR Financial
              </button>
            </div>
          </div>

          {/* MODE A: Qualitative 5x5 Heatmap */}
          {activeAnalysisMode === "qualitative_heatmap" && (
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    5x5 Qualitative Risk Heatmap Matrix (ISO/IEC 27005)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Click any cell or adjust Likelihood / Impact to calculate the qualitative risk score (1 to 25).
                  </p>
                </div>
                <div className="bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800 text-xs font-mono">
                  <span className="text-gray-400">Score: </span>
                  <span className="font-extrabold text-white">{qualRiskScore} / 25</span>
                </div>
              </div>

              {/* 5x5 Grid Visualization */}
              <div className="overflow-x-auto">
                <div className="min-w-[420px] space-y-2">
                  <div className="grid grid-cols-6 gap-1.5 text-center text-xs font-mono">
                    <div className="text-gray-500 font-bold p-1">Imp ➔<br />Lik ↓</div>
                    <div className="text-gray-400 font-bold p-1">1: Insignificant</div>
                    <div className="text-gray-400 font-bold p-1">2: Minor</div>
                    <div className="text-gray-400 font-bold p-1">3: Moderate</div>
                    <div className="text-gray-400 font-bold p-1">4: Major</div>
                    <div className="text-gray-400 font-bold p-1">5: Catastrophic</div>
                  </div>

                  {[5, 4, 3, 2, 1].map((lik) => (
                    <div key={lik} className="grid grid-cols-6 gap-1.5 text-xs font-mono">
                      <div className="text-gray-400 font-bold flex items-center justify-center bg-gray-900/60 rounded-lg p-1">
                        {lik}: {lik === 5 ? "Almost Certain" : lik === 4 ? "Likely" : lik === 3 ? "Possible" : lik === 2 ? "Unlikely" : "Rare"}
                      </div>
                      {[1, 2, 3, 4, 5].map((imp) => {
                        const cellScore = lik * imp;
                        const isSelected = qualLikelihood === lik && qualImpact === imp;

                        let cellColor = "bg-emerald-950/60 border-emerald-800 text-emerald-300";
                        if (cellScore >= 20) cellColor = "bg-rose-950/80 border-rose-700 text-rose-200";
                        else if (cellScore >= 10) cellColor = "bg-amber-950/80 border-amber-700 text-amber-200";
                        else if (cellScore >= 5) cellColor = "bg-indigo-950/80 border-indigo-700 text-indigo-200";

                        return (
                          <button
                            key={imp}
                            onClick={() => {
                              setQualLikelihood(lik);
                              setQualImpact(imp);
                            }}
                            className={clsx(
                              "p-3 rounded-lg border text-center font-bold transition-all cursor-pointer",
                              cellColor,
                              isSelected ? "ring-2 ring-white scale-105 shadow-lg shadow-indigo-950/80 font-extrabold" : "hover:opacity-80"
                            )}
                          >
                            {cellScore}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Selection Summary */}
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Calculated Severity Tier:</span>
                  <span className={clsx("text-sm font-bold px-2.5 py-1 rounded-full border inline-block mt-1", qualSeverity.badgeClass)}>
                    {qualSeverity.label} (Score: {qualRiskScore})
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-gray-400 block text-[10px] uppercase">Mandatory Governance Action:</span>
                  <span className="text-emerald-300 font-bold text-xs mt-1 block">{qualSeverity.action}</span>
                </div>
              </div>
            </div>
          )}

          {/* MODE B: Quantitative FAIR / ALE Engine */}
          {activeAnalysisMode === "quantitative_fair" && (
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6 shadow-2xl">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Quantitative Financial Loss &amp; ROSI Modeling (FAIR Framework)
                </h3>
                <p className="text-xs text-gray-400">
                  Calibrate financial asset parameters to calculate Single Loss Expectancy (SLE), Annual Loss Expectancy (ALE), and Return on Security Investment (ROSI).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Controls: Sliders */}
                <div className="space-y-4 lg:col-span-2 text-xs">
                  {/* Asset Value Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-mono">
                      <span className="text-gray-300">1. Total Asset Value (AV):</span>
                      <span className="text-cyan-400 font-bold">₹{quantAssetValueLakhs} Lakhs (₹{(quantAssetValueLakhs / 100).toFixed(2)} Cr)</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={quantAssetValueLakhs}
                      onChange={(e) => setQuantAssetValueLakhs(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>

                  {/* Exposure Factor Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-mono">
                      <span className="text-gray-300">2. Exposure Factor (EF % damaged per incident):</span>
                      <span className="text-amber-400 font-bold">{quantExposureFactorPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={quantExposureFactorPercent}
                      onChange={(e) => setQuantExposureFactorPercent(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* Annual Rate of Occurrence Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-mono">
                      <span className="text-gray-300">3. Annual Rate of Occurrence (ARO events/year):</span>
                      <span className="text-rose-400 font-bold">{quantAro} events / year</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="10.0"
                      step="0.1"
                      value={quantAro}
                      onChange={(e) => setQuantAro(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>

                  {/* Control Cost Slider */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-800">
                    <div className="flex justify-between font-mono">
                      <span className="text-emerald-400 font-bold">4. Annual Security Countermeasure Cost (CC):</span>
                      <span className="text-emerald-300 font-bold">₹{quantControlCostLakhs} Lakhs / year</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={quantControlCostLakhs}
                      onChange={(e) => setQuantControlCostLakhs(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                </div>

                {/* Right Output: Financial Metrics Dashboard */}
                <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 space-y-3 font-mono text-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Financial Loss Metrics:</span>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Single Loss Expectancy (SLE):</span>
                      <span className="text-sm font-bold text-cyan-300 block">₹{quantResults.sle} Lakhs</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Unmitigated Annual Loss (ALE Before):</span>
                      <span className="text-base font-extrabold text-rose-400 block">₹{quantResults.aleBefore} Lakhs / yr</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Mitigated Annual Loss (ALE After):</span>
                      <span className="text-xs font-bold text-emerald-300 block">₹{quantResults.aleAfter} Lakhs / yr</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-800 space-y-1">
                    <span className="text-gray-400 block text-[10px]">Return on Security Investment (ROSI):</span>
                    <span className={clsx("text-xl font-extrabold block", parseFloat(quantResults.rosi) > 0 ? "text-emerald-400" : "text-rose-400")}>
                      {quantResults.rosi}% ROSI
                    </span>
                    <span className="text-[10px] text-gray-500 font-sans block">Net Annual Savings: ₹{quantResults.netBenefit} Lakhs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: Qualitative vs Quantitative Decision Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 2: Methodology Decision Matrix &amp; Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an analytical dimension to compare Qualitative vs Quantitative strengths, weaknesses, and regulatory applications.
            </p>
          </div>

          {/* Dimension Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(analysisDimensions).map((dim) => {
              const isSelected = selectedDimensionKey === dim.key;
              return (
                <button
                  key={dim.key}
                  onClick={() => setSelectedDimensionKey(dim.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{dim.title.split(". ")[1]?.split(" & ")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{dim.title.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Dimension Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDimension.badgeClass)}>
                  {activeDimension.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Analytical Comparison
                </h3>
              </div>
            </div>

            {/* Qualitative vs Quantitative Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/30 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Qualitative Model Assessment:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeDimension.qualitative}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Quantitative FAIR Model Assessment:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeDimension.quantitative}</p>
              </div>
            </div>

            {/* Strategic Verdict */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/30 text-xs font-mono">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Strategic Architectural Recommendation:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeDimension.verdict}</p>
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
              Visualizing the 5x5 Qualitative Risk Heatmap Matrix and the Quantitative FAIR Financial Loss Modeling Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 5x5 Heatmap Matrix */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 5x5 Qualitative Heatmap Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Axis Labels */}
                  <text x="250" y="25" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="9">
                    QUALITATIVE 5x5 RISK MATRIX (ISO 27005)
                  </text>

                  {/* 4 Color Zone Boxes */}
                  <rect x="50" y="50" width="180" height="100" fill="#064e3b" fillOpacity="0.7" stroke="#10b981" />
                  <text x="140" y="105" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">LOW RISK (1 - 4)</text>

                  <rect x="235" y="50" width="215" height="100" fill="#1e1b4b" fillOpacity="0.7" stroke="#6366f1" />
                  <text x="342" y="105" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">MEDIUM RISK (5 - 9)</text>

                  <rect x="50" y="155" width="180" height="100" fill="#78350f" fillOpacity="0.7" stroke="#f59e0b" />
                  <text x="140" y="210" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8.5">HIGH RISK (10 - 16)</text>

                  <rect x="235" y="155" width="215" height="100" fill="#450a0a" fillOpacity="0.7" stroke="#ef4444" />
                  <text x="342" y="210" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8.5">CRITICAL RISK (20 - 25)</text>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Rapid qualitative triage standardizes threat evaluation across business units.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: The 5x5 Qualitative Risk Heatmap Matrix severity zones.
              </p>
            </div>

            {/* Diagram 2: FAIR Quantitative Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Quantitative FAIR Financial Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Node: Risk in Rupees */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="20" width="200" height="45" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="2" />
                    <text x="250" y="42" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      ANNUAL LOSS EXPECTANCY (₹)
                    </text>
                    <text x="250" y="55" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">
                      ALE = SLE (₹) x ARO (Frequency)
                    </text>
                  </g>

                  {/* Left Branch: Loss Event Frequency */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="105" width="190" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="120" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">LOSS FREQUENCY (LEF)</text>
                    <text x="120" y="140" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Threat Contact x Control Gap</text>
                  </g>
                  <line x1="200" y1="65" x2="120" y2="105" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Right Branch: Loss Magnitude */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="285" y="105" width="190" height="50" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="380" y="125" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">LOSS MAGNITUDE (LM)</text>
                    <text x="380" y="140" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Outage + DPDP Fines (₹250 Cr)</text>
                  </g>
                  <line x1="300" y1="65" x2="380" y2="105" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Bottom Box: ROSI Return */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="195" width="450" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="217" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      DIRECT RETURN ON SECURITY INVESTMENT (ROSI)
                    </text>
                    <text x="250" y="235" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Proves financial defensibility to the Chief Financial Officer and Board of Directors.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Quantitative modeling translates technical vulnerabilities into executive financial figures.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: The Factor Analysis of Information Risk (FAIR) quantitative loss architecture.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Risk Analysis Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads justify EDR budgets in Kolkata, model clinical DPDP liabilities in Ichapur, score SCADA risks in Barrackpore, and simulate dual-mode models in Jadavpur.
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
                  <span>⚡</span> Financial Analysis Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for Risk Architects and Security Economists balancing qualitative speed with quantitative rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Analysis Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Qualitative for Fast Triage:</strong> Screen 1,000 assets quickly using a 5x5 heatmap.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Quantitative for CFO Pitches:</strong> Present Rupee ALE and ROSI when requesting budgets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Apply Delphi for Consensus:</strong> Eliminate dominant personality bias in qualitative workshops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Model Tail Risk with Monte Carlo:</strong> Run probability distributions for rare catastrophic events.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Analysis Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Pitching Colors to the CFO:</strong> Expecting executives to fund projects based on a 'red box'.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Infinite Accuracy Trap:</strong> Spending 6 months collecting data for a ₹10,000 internal asset.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Subjective Inconsistency:</strong> Allowing two teams to define 'High Risk' in conflicting ways.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Control Costs in ROSI:</strong> Calculating savings without subtracting license fees.</span>
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
                  <span><strong>Adopt FAIR Standards:</strong> Standardize on the Open Group FAIR taxonomy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Factor in DPDP Liabilities:</strong> Include ₹250 Cr statutory caps in secondary loss models.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Calibrate ARO Actuarial Data:</strong> Ingest industry breach frequencies from CERT-In feeds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Convene BRMC Committees:</strong> Present quantitative loss models under RBI Master Directions.</span>
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
              Synthesize qualitative triage and quantitative financial calculations before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Risk Economists
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Chief Financial Officers reject qualitative heatmaps: Executives cannot allocate corporate capital based on subjective colors (Red vs Amber). Quantitative analysis translates cyber risk into financial currency (Rupees) and calculates Return on Security Investment (ROSI), proving exactly how much money a security control saves the enterprise each year.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Indian DPDP Act 2023 requires a hybrid approach: Qualitative analysis evaluates the subjective privacy impact and emotional harm on individual citizens during Data Protection Impact Assessments (DPIAs), while Quantitative analysis models the corporate financial exposure to Section 33 statutory fines (up to ₹250 Crores per breach).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise security budget proposals, always calculate both Annual Loss Expectancy (ALE) and Return on Security Investment (ROSI) to present a rigorous, bulletproof financial business case to leadership.
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
                <span>Qualitative uses descriptive scales (Low/Med/High); Quantitative uses money (₹) &amp; %.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>5x5 Heatmap: Risk Score = Likelihood (1-5) x Impact (1-5) [Range: 1 to 25].</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Delphi Technique uses anonymous expert voting to eliminate peer bias.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Single Loss Expectancy: SLE = Asset Value (AV) x Exposure Factor (EF).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Annual Loss Expectancy: ALE = SLE x Annual Rate of Occurrence (ARO).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8 combines qualitative harm with ₹250 Cr quantitative exposure.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Qualitative vs Quantitative Risk Analysis FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Risk Modeling Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Qualitative vs Quantitative Risk Analysis (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Qualitative and Quantitative Risk Analysis represent the twin engines of information risk governance. Always remember: use qualitative 5x5 heatmaps for rapid, broad asset screening across your organization, but master quantitative FAIR financial modeling (SLE, ALE, ROSI in Rupees) to speak the language of business and prove return on security investment to your CFO and Board of Directors under Indian DPDP Act and RBI regulations!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
