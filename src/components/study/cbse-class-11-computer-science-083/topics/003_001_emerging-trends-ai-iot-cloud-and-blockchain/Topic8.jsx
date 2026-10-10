import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic8Questions } from "./topic8_files/topic8_questions";

export default function Topic8() {
  // Interactive State for Cloud Delivery Models
  const [selectedModel, setSelectedModel] = useState("IaaS");

  // Elastic Scaling Simulator
  const [trafficRequests, setTrafficRequests] = useState(8500); // req/sec
  const instanceCapacity = 2500;
  const scaledInstances = Math.max(1, Math.ceil(trafficRequests / instanceCapacity));
  const hourlyCost = (scaledInstances * 0.08).toFixed(2);
  const monthlyCost = (scaledInstances * 0.08 * 24 * 30).toFixed(2);
  const resourceUtilization = Math.round((trafficRequests / (scaledInstances * instanceCapacity)) * 100);

  // Delivery Models Breakdown
  const modelInfo = {
    IaaS: {
      name: "Infrastructure as a Service (IaaS)",
      badge: "You Manage: OS, Runtimes, Apps",
      color: "border-blue-500/40 bg-blue-950/20 text-blue-300",
      pizzaAnalogy: "🍕 Take-and-Bake Pizza: Vendor gives pizza base; you bake it in your oven and serve.",
      vendorLayers: ["Physical Datacenter", "Power & Cooling", "Networking & Firewalls", "Virtualization (Hypervisor)"],
      clientLayers: ["Operating System (OS)", "Middleware & Runtimes", "Databases & Storage", "Applications & Business Logic"],
      examples: ["Amazon AWS EC2", "Microsoft Azure VMs", "Google Compute Engine (GCE)", "DigitalOcean Droplets"]
    },
    PaaS: {
      name: "Platform as a Service (PaaS)",
      badge: "You Manage: Code & Data Only",
      color: "border-teal-500/40 bg-teal-950/20 text-teal-300",
      pizzaAnalogy: "🍕 Pizza Delivery: Vendor bakes and delivers the pizza; you set the dining table and eat.",
      vendorLayers: ["Physical Datacenter", "Hypervisor Virtualization", "Operating System & Patches", "Database Engines & Language Runtimes (Python/Node)"],
      clientLayers: ["Application Source Code", "Application Data & User Records"],
      examples: ["Google App Engine", "AWS Elastic Beanstalk", "Heroku", "Firebase Hosting"]
    },
    SaaS: {
      name: "Software as a Service (SaaS)",
      badge: "You Manage: User Credentials & Files",
      color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300",
      pizzaAnalogy: "🍕 Dining Out at a Restaurant: The restaurant chef prepares, cooks, serves, and cleans; you simply eat.",
      vendorLayers: ["Datacenter & Hardware", "Virtualization & OS", "Runtime & Databases", "Application Software & Patches", "High Availability & Backups"],
      clientLayers: ["User Account Credentials", "Personal Preferences & Workspace Data"],
      examples: ["Google Workspace (Gmail, Docs, Drive)", "Microsoft Office 365", "Zoom", "Dropbox", "Salesforce"]
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
    topic8Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 8: Cloud Computing Paradigm & Delivery Models
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Master the foundational infrastructure powering modern internet services. Understand the 
            <strong> 5 Essential NIST Cloud Characteristics</strong>, analyze the <strong>Shared Responsibility Model</strong> 
            across <strong>IaaS</strong>, <strong>PaaS</strong>, and <strong>SaaS</strong>, and experiment with live <strong>Rapid Elasticity Auto-Scaling</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: The 5 NIST Essential Characteristics */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">01</span>
            The 5 Essential Characteristics of Cloud Computing (NIST)
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            The National Institute of Standards and Technology (NIST) defines cloud computing through five indispensable foundational characteristics:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-950/80 border border-blue-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">⚡</div>
              <h3 className="font-bold text-blue-400 text-xs uppercase mb-1">1. On-Demand Self-Service</h3>
              <p className="text-slate-400 text-xs">Provision servers and storage instantly without human vendor approval.</p>
            </div>

            <div className="bg-slate-950/80 border border-cyan-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">🌐</div>
              <h3 className="font-bold text-cyan-400 text-xs uppercase mb-1">2. Broad Network Access</h3>
              <p className="text-slate-400 text-xs">Seamless global access across smartphones, tablets, and laptops.</p>
            </div>

            <div className="bg-slate-950/80 border border-teal-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">👥</div>
              <h3 className="font-bold text-teal-400 text-xs uppercase mb-1">3. Resource Pooling</h3>
              <p className="text-slate-400 text-xs">Multi-tenant sharing of physical compute dynamically across clients.</p>
            </div>

            <div className="bg-slate-950/80 border border-purple-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">📈</div>
              <h3 className="font-bold text-purple-400 text-xs uppercase mb-1">4. Rapid Elasticity</h3>
              <p className="text-slate-400 text-xs">Instantly scale server capacity up during traffic peaks and down during lulls.</p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">📊</div>
              <h3 className="font-bold text-emerald-400 text-xs uppercase mb-1">5. Measured Service</h3>
              <p className="text-slate-400 text-xs">Pay-as-you-go billing metered strictly on exact CPU hours and storage used.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Cloud Service Delivery Models (IaaS, PaaS, SaaS) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">02</span>
                Cloud Service Delivery Models & Shared Responsibility
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                Explore what the Cloud Vendor manages versus what the Client manages across IaaS, PaaS, and SaaS.
              </p>
            </div>

            {/* Model Selector */}
            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["IaaS", "PaaS", "SaaS"].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModel(m)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedModel === m
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {m} Model
                </button>
              ))}
            </div>
          </div>

          {/* Model Card */}
          <div className={`p-6 rounded-xl border ${modelInfo[selectedModel].color} mb-6`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <h3 className="text-xl font-bold text-white">{modelInfo[selectedModel].name}</h3>
              <span className="px-3 py-1 bg-slate-950/80 rounded-full text-xs font-semibold text-white">
                {modelInfo[selectedModel].badge}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg text-xs text-slate-200 mb-4 font-mono">
              {modelInfo[selectedModel].pizzaAnalogy}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vendor Managed */}
              <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 uppercase mb-2 flex items-center gap-1.5">
                  <span>🏢</span> Managed by Cloud Provider (Vendor)
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {modelInfo[selectedModel].vendorLayers.map((layer, idx) => (
                    <li key={idx}>{layer}</li>
                  ))}
                </ul>
              </div>

              {/* Client Managed */}
              <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-blue-400 uppercase mb-2 flex items-center gap-1.5">
                  <span>👤</span> Managed by Customer (Client)
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {modelInfo[selectedModel].clientLayers.map((layer, idx) => (
                    <li key={idx}>{layer}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <strong>Industry Examples:</strong> {modelInfo[selectedModel].examples.join(" • ")}
            </div>
          </div>
        </section>

        {/* Section 3: Live Rapid Elasticity & Auto-Scaling Simulator */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">03</span>
            Interactive Rapid Elasticity & Auto-Scaling Simulator
          </h2>
          <p className="text-slate-300 text-sm mb-6">
            Simulate incoming user traffic load during a major product sale to observe how cloud elasticity dynamically provisions virtual server instances and calculates metered utility costs.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            {/* Traffic Slider */}
            <div className="space-y-4 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block">
                1. Web Traffic Demand
              </span>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-200">Incoming Traffic Load:</span>
                  <span className="font-mono font-bold text-cyan-300 text-base">{trafficRequests.toLocaleString()} req/sec</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="500"
                  value={trafficRequests}
                  onChange={(e) => setTrafficRequests(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>500 (Idle Baseline)</span>
                  <span>10,000 (Rush Hour)</span>
                  <span>25,000 (Flash Sale Surge)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-400">
                Each Virtual Server VM handles up to <strong>2,500 requests/sec</strong>. Standard VM rate: <strong>$0.08 / hour</strong>.
              </div>
            </div>

            {/* Elastic Auto-Scale Telemetry */}
            <div className="space-y-4 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  2. Auto-Scaled Fleet Telemetry & Metered Billing
                </span>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Active VM Instances</div>
                      <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">{scaledInstances} VMs</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Fleet Utilization</div>
                      <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{resourceUtilization}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Hourly Metered Cost</div>
                      <div className="text-lg font-mono font-bold text-amber-400 mt-1">${hourlyCost} / hr</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Estimated Monthly Cost</div>
                      <div className="text-lg font-mono font-bold text-amber-400 mt-1">${monthlyCost} / mo</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded text-xs text-blue-200">
                💡 <strong>Elasticity Advantage:</strong> When traffic subsides at midnight, the auto-scaler automatically terminates redundant VMs, dropping costs immediately.
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">04</span>
            Python Companion Simulation: Cloud Models & Auto-Scaling Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python script implementing the shared responsibility matrix and rapid elasticity auto-scaling calculations.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic8_files/cloud_models_simulator.py"
            title="cloud_models_simulator.py"
          />
        </section>

        {/* Section 5: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">05</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic8_files/topic8_note.txt"
            title="Topic 8 Revision Notes"
          />
        </section>

        {/* Section 6: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">06</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your conceptual knowledge of Cloud Characteristics, IaaS, PaaS, SaaS, and Elasticity.
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
                {calculateScore()} / {topic8Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic8Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic8Questions.map((q, qIndex) => {
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

        {/* Section 7: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">07</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the core difference between IaaS and PaaS?",
                a: "In IaaS, the customer manages the Operating System, updates, patches, and programming language runtimes. In PaaS, the cloud provider manages the OS and runtime environments, allowing developers to focus purely on writing and deploying application code."
              },
              {
                q: "How does SaaS benefit end users compared to traditional desktop software?",
                a: "SaaS requires no local installation, automatic feature updates and security patches from the vendor, accessible from any device via a web browser, and eliminates server hosting overhead."
              },
              {
                q: "What is the economic difference between CapEx and OpEx in cloud adoption?",
                a: "Capital Expenditure (CapEx) involves buying expensive physical servers upfront with maintenance costs. Operational Expenditure (OpEx) replaces this with monthly pay-as-you-go utility bills based strictly on consumed computing resources."
              },
              {
                q: "What is a Hypervisor?",
                a: "A Hypervisor (or Virtual Machine Monitor) is software/firmware that abstracts physical server hardware into isolated virtual machines with dedicated virtual CPU, memory, and storage."
              }
            ]}
          />
        </section>

        {/* Section 8: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Cloud computing is the technological backbone of all contemporary internet applications. For the CBSE Class 11 examination, memorize the 5 NIST essential characteristics and master the shared responsibility boundaries between IaaS, PaaS, and SaaS with real-world examples."
        />
      </div>
    </div>
  );
}
