import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic9Questions } from "./topic9_files/topic9_questions";

export default function Topic9() {
  // Interactive State for Cloud Deployment Models
  const [selectedDeployModel, setSelectedDeployModel] = useState("PUBLIC");

  // Cloud Bursting Simulator State
  const [trafficSurgeReq, setTrafficSurgeReq] = useState(8500); // req/sec
  const privateCapacity = 5000;
  const privateLoad = Math.min(trafficSurgeReq, privateCapacity);
  const publicBurstLoad = Math.max(0, trafficSurgeReq - privateCapacity);
  const isBursting = publicBurstLoad > 0;

  // Deployment Models Metadata
  const deploymentInfo = {
    PUBLIC: {
      name: "Public Cloud",
      badge: "Multi-Tenant • Low Cost • High Elasticity",
      color: "border-blue-500/40 bg-blue-950/20 text-blue-300",
      ownership: "Third-party commercial cloud provider (AWS, Microsoft Azure, Google Cloud).",
      tenancy: "Multi-tenant: Shared physical hardware with logical virtualization isolation.",
      security: "Standard logical security; ideal for web services, SaaS apps, startups, and public workloads.",
      cost: "Zero upfront CapEx; 100% pay-as-you-go operational expenditure (OpEx).",
      examples: ["Amazon AWS EC2 / S3", "Microsoft Azure", "Google Cloud Platform (GCP)"]
    },
    PRIVATE: {
      name: "Private Cloud (Dedicated / Internal)",
      badge: "Single-Tenant • Maximum Governance & Security",
      color: "border-red-500/40 bg-red-950/20 text-red-300",
      ownership: "Single enterprise organization or dedicated private datacenter provider.",
      tenancy: "Single-tenant: 100% dedicated bare-metal hardware and storage disks.",
      security: "Maximum governance, sovereign compliance, and zero multi-tenant noisy-neighbor risk.",
      cost: "High capital expenditure (CapEx) for physical server procurement, power, and HVAC cooling.",
      examples: ["Defense / Military Datacenters", "Central Bank Transaction Clusters", "Air-Gapped R&D Clouds"]
    },
    COMMUNITY: {
      name: "Community Cloud",
      badge: "Shared Multi-Organization Consortium",
      color: "border-amber-500/40 bg-amber-950/20 text-amber-300",
      ownership: "Shared jointly by several organizations with common regulatory missions or compliance rules.",
      tenancy: "Multi-organization within the verified consortium (e.g., all commercial banks in India).",
      security: "High; custom-tailored to common industry standards (HIPAA, RBI banking guidelines).",
      cost: "Capital and operational costs shared equitably among member institutions.",
      examples: ["National Banking Consortium Cloud", "University Genomic Research Cloud", "Government Inter-Agency Cloud"]
    },
    HYBRID: {
      name: "Hybrid Cloud",
      badge: "Best of Both Worlds • Cloud Bursting",
      color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300",
      ownership: "Composition of two or more distinct clouds (Private + Public) bound by encrypted VPN/DirectConnect.",
      tenancy: "Blended: Sensitive databases in private cloud; scalable web frontend in public cloud.",
      security: "Granular: Maximum security for core ledgers; elastic security for customer-facing web traffic.",
      cost: "Optimized: Avoids buying expensive permanent on-premise hardware for temporary traffic spikes.",
      examples: ["Banking Web Portals", "E-Commerce Festival Sales (Diwali/Black Friday Cloud Bursting)"]
    }
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic9Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 9: Cloud Deployment Models
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Understand where cloud infrastructure resides and who governs access. Master 
            <strong> Public Cloud</strong>, <strong>Private Cloud</strong>, <strong>Community Cloud</strong>, 
            and <strong>Hybrid Cloud</strong> architectures, and simulate live <strong>Hybrid Cloud Bursting</strong> during extreme traffic surges.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Overview of the 4 Deployment Models */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">01</span>
            What are Cloud Deployment Models?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            A <strong>Cloud Deployment Model</strong> defines the physical location of servers, who owns and manages the hardware, and the authorized scope of user access.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-blue-500/40 p-4 rounded-xl">
              <div className="text-blue-400 font-bold text-xs uppercase mb-1">Model 1</div>
              <h3 className="font-bold text-white text-sm mb-1">Public Cloud</h3>
              <p className="text-slate-400 text-xs">
                Owned by commercial vendors (AWS/Azure); open to all users over the internet.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-red-500/40 p-4 rounded-xl">
              <div className="text-red-400 font-bold text-xs uppercase mb-1">Model 2</div>
              <h3 className="font-bold text-white text-sm mb-1">Private Cloud</h3>
              <p className="text-slate-400 text-xs">
                Dedicated exclusively to a single enterprise organization with maximum security.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-amber-500/40 p-4 rounded-xl">
              <div className="text-amber-400 font-bold text-xs uppercase mb-1">Model 3</div>
              <h3 className="font-bold text-white text-sm mb-1">Community Cloud</h3>
              <p className="text-slate-400 text-xs">
                Shared jointly by several organizations with common compliance standards.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-xl">
              <div className="text-emerald-400 font-bold text-xs uppercase mb-1">Model 4</div>
              <h3 className="font-bold text-white text-sm mb-1">Hybrid Cloud</h3>
              <p className="text-slate-400 text-xs">
                Combines Private & Public clouds enabling seamless data portability and bursting.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Cloud Deployment Explorer */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">02</span>
                Interactive Deployment Model Deep-Dive
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                Select any cloud model to view its ownership, tenancy structure, security governance, and enterprise use cases.
              </p>
            </div>

            {/* Model Selector */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["PUBLIC", "PRIVATE", "COMMUNITY", "HYBRID"].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedDeployModel(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedDeployModel === m
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Model Display Card */}
          <div className={`p-6 rounded-xl border ${deploymentInfo[selectedDeployModel].color} mb-6`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <h3 className="text-xl font-bold text-white">{deploymentInfo[selectedDeployModel].name}</h3>
              <span className="px-3 py-1 bg-slate-950/80 rounded-full text-xs font-semibold text-white">
                {deploymentInfo[selectedDeployModel].badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 font-semibold mb-1">🏢 Ownership & Hosting:</div>
                <div className="text-slate-200">{deploymentInfo[selectedDeployModel].ownership}</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 font-semibold mb-1">👥 Tenancy Architecture:</div>
                <div className="text-slate-200">{deploymentInfo[selectedDeployModel].tenancy}</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 font-semibold mb-1">🔒 Security & Governance:</div>
                <div className="text-slate-200">{deploymentInfo[selectedDeployModel].security}</div>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 font-semibold mb-1">💰 Cost Profile (CapEx vs OpEx):</div>
                <div className="text-slate-200">{deploymentInfo[selectedDeployModel].cost}</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <strong>Prominent Industry Examples:</strong> {deploymentInfo[selectedDeployModel].examples.join(" • ")}
            </div>
          </div>
        </section>

        {/* Section 3: Live Hybrid Cloud Bursting Simulator */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">03</span>
            Interactive Hybrid Cloud Bursting Simulator
          </h2>
          <p className="text-slate-300 text-sm mb-6">
            Observe how a bank or e-commerce enterprise processes baseline traffic on its secure Private Cloud (5,000 req/sec limit) and dynamically "bursts" temporary excess load to the Public Cloud during flash sales.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            {/* Control Slider */}
            <div className="space-y-4 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block">
                1. Festival Traffic Surge Control
              </span>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-200">Current Incoming Traffic:</span>
                  <span className="font-mono font-bold text-emerald-300 text-base">{trafficSurgeReq.toLocaleString()} req/sec</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={trafficSurgeReq}
                  onChange={(e) => setTrafficSurgeReq(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1,000 (Low)</span>
                  <span>5,000 (Private Max Capacity)</span>
                  <span>20,000 (Huge Surge)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-400">
                On-premise Private Cloud Capacity: <strong>5,000 req/sec</strong>. Any traffic exceeding 5,000 is automatically routed to the Public Cloud via secure VPN/DirectConnect tunnel.
              </div>
            </div>

            {/* Split Telemetry */}
            <div className="space-y-4 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-blue-400 uppercase tracking-wider block mb-2">
                  2. Dynamic Workload Distribution
                </span>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="p-3 bg-slate-950 rounded border border-red-500/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-red-300">🏢 Private Cloud Load (On-Premise)</div>
                      <div className="text-[11px] text-slate-400">Core database & sensitive banking accounts</div>
                    </div>
                    <span className="font-mono font-bold text-red-400 text-sm">
                      {privateLoad.toLocaleString()} req/sec
                    </span>
                  </div>

                  <div className={`p-3 rounded border flex items-center justify-between transition ${
                    isBursting
                      ? "bg-blue-950/60 border-blue-500 text-blue-300"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  }`}>
                    <div>
                      <div className="font-bold text-blue-300">⚡ Public Cloud Burst Fleet (AWS/Azure)</div>
                      <div className="text-[11px] text-slate-400">Front-end web nodes & static media cache</div>
                    </div>
                    <span className="font-mono font-bold text-blue-400 text-sm">
                      {publicBurstLoad.toLocaleString()} req/sec
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-emerald-300">
                    {isBursting
                      ? `🚀 CLOUD BURSTING ACTIVE: ${publicBurstLoad.toLocaleString()} req/sec handled by Public Cloud elasticity!`
                      : "✅ NORMAL LOAD: 100% handled within Private Cloud capacity."}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-xs text-emerald-200">
                💡 <strong>Why Hybrid Cloud Wins:</strong> The company avoids buying ₹50 Lakhs in permanent physical servers that would sit idle 11 months of the year.
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comparison Table */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">04</span>
            Comparison Matrix (Public vs Private vs Community vs Hybrid)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 uppercase font-bold">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Parameter</th>
                  <th className="p-3.5 border-b border-slate-800 text-blue-400">Public Cloud</th>
                  <th className="p-3.5 border-b border-slate-800 text-red-400">Private Cloud</th>
                  <th className="p-3.5 border-b border-slate-800 text-amber-400">Community Cloud</th>
                  <th className="p-3.5 border-b border-slate-800 text-emerald-400">Hybrid Cloud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Ownership</td>
                  <td className="p-3.5">Commercial Cloud Vendor</td>
                  <td className="p-3.5">Single Organization</td>
                  <td className="p-3.5">Industry Consortium</td>
                  <td className="p-3.5">Dual (Organization + Vendor)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Tenancy</td>
                  <td className="p-3.5">Multi-tenant (Shared HW)</td>
                  <td className="p-3.5">Single-tenant (Dedicated)</td>
                  <td className="p-3.5">Consortium members only</td>
                  <td className="p-3.5">Blended (Private + Public)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Cost Structure</td>
                  <td className="p-3.5">Lowest (Pure OpEx)</td>
                  <td className="p-3.5">Highest (Heavy CapEx)</td>
                  <td className="p-3.5">Shared among peer members</td>
                  <td className="p-3.5">Optimized (Cloud Bursting)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Security & Control</td>
                  <td className="p-3.5">Standard logical isolation</td>
                  <td className="p-3.5">Maximum security & control</td>
                  <td className="p-3.5">High (Industry compliant)</td>
                  <td className="p-3.5">Tailored per workload tier</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Scalability</td>
                  <td className="p-3.5">Near infinite & instantaneous</td>
                  <td className="p-3.5">Capped by hardware capacity</td>
                  <td className="p-3.5">Moderate to High</td>
                  <td className="p-3.5">High (via Public Bursting)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">05</span>
            Python Companion Simulation: Cloud Deployment & Cloud Bursting
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python code implementing deployment comparisons and the Cloud Bursting overflow engine.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic9_files/cloud_deployment_simulator.py"
            title="cloud_deployment_simulator.py"
          />
        </section>

        {/* Section 6: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">06</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic9_files/topic9_note.txt"
            title="Topic 9 Revision Notes"
          />
        </section>

        {/* Section 7: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">07</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your mastery of Public, Private, Community, and Hybrid cloud models.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-blue-950/40 border border-blue-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-blue-400 my-1">
                {calculateScore()} / {topic9Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic9Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic9Questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{qIndex + 1}. {q.question}
                    </span>
                    {showResults && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition border ${
                            isSelected
                              ? "bg-blue-600/30 border-blue-500 text-white font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-blue-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-cyan-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">08</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is Cloud Bursting in a Hybrid Cloud?",
                a: "Cloud Bursting is an application deployment model where an organization runs routine baseline workloads on its secure on-premise private cloud, but during seasonal traffic spikes (e.g., festival sales), excess traffic automatically bursts into a public cloud to prevent crashes."
              },
              {
                q: "Why do banks use Community Clouds?",
                a: "Community clouds allow financial institutions to pool resources and share infrastructure while enforcing strict, shared compliance rules (such as RBI financial regulations and high-grade cryptographic encryption) without exposing data to the general public internet."
              },
              {
                q: "What is the primary trade-off between Public and Private Clouds?",
                a: "Public Cloud provides maximum elasticity and lowest upfront cost at the cost of shared multi-tenant infrastructure. Private Cloud provides total data sovereignty, custom security, and dedicated hardware at the cost of high CapEx and maintenance overhead."
              },
              {
                q: "What is the MeghRaj initiative in India?",
                a: "Project MeghRaj (GI Cloud) is the Government of India's national cloud framework designed to accelerate the delivery of e-governance services and standardise ICT resource sharing across government departments."
              }
            ]}
          />
        </section>

        {/* Section 9: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Choosing the right cloud deployment model is an essential architectural decision for modern software engineers. For CBSE Class 11 questions, ensure you can compare Public, Private, Community, and Hybrid clouds across ownership, cost, and security, and explain the mechanics of Hybrid Cloud Bursting."
        />
      </div>
    </div>
  );
}
