import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic6Questions } from "./topic6_files/topic6_questions";

export default function Topic6() {
  // Interactive State for Big Data 5Vs Dashboard
  const [activeVTab, setActiveVTab] = useState("volume");

  // Volume: Scale Calculator
  const [volumeInputTB, setVolumeInputTB] = useState(1024);

  // Velocity: Stream Rate
  const [eventsPerSec, setEventsPerSec] = useState(25000);
  const bytesPerSec = eventsPerSec * 512; // 512 bytes per event
  const mbPerHour = ((bytesPerSec * 3600) / (1024 * 1024)).toFixed(2);
  const gbPerDay = (mbPerHour * 24 / 1024).toFixed(2);
  const tbPerYear = (gbPerDay * 365 / 1024).toFixed(2);

  // Veracity: Raw Data Audit
  const [corruptedPct, setCorruptedPct] = useState(15);
  const [missingFieldPct, setMissingFieldPct] = useState(10);
  const validDataPct = Math.max(0, 100 - corruptedPct - missingFieldPct);
  const trustLevel =
    validDataPct >= 85 ? "High Trust (Clean)" : validDataPct >= 65 ? "Moderate (Cleaning Required)" : "Low Trust (High Anomaly)";

  // Value: Strategic Business Metric
  const [marketingBudget, setMarketingBudget] = useState(50); // in thousands
  const estimatedRevenueLakhs = (marketingBudget * 3.8).toFixed(1);

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic6Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 6: Big Data — The 5 Fundamental Vs
          </h1>
          <p className="text-amber-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Understand how massive distributed data engineering reshapes modern decision making. Master the 
            <strong> 5 Vs of Big Data</strong> (<strong>Volume</strong>, <strong>Velocity</strong>, <strong>Variety</strong>, 
            <strong>Veracity</strong>, and <strong>Value</strong>), storage unit hierarchies (TB to YB), and enterprise data pipelines.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Introduction to Big Data & The 5 Vs */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">01</span>
            What is Big Data & The 5 Vs Framework
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            <strong>Big Data</strong> refers to massive, complex, and rapidly accumulating datasets that exceed the storage, query processing, and management capabilities of traditional relational databases (RDBMS). It is universally characterized by <strong>5 Vs</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-950/80 border border-amber-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">📦</div>
              <h3 className="font-bold text-amber-400 text-sm">1. VOLUME</h3>
              <p className="text-slate-400 text-xs mt-1">Colossal quantity (Petabytes, Exabytes, Zettabytes).</p>
            </div>

            <div className="bg-slate-950/80 border border-orange-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">⚡</div>
              <h3 className="font-bold text-orange-400 text-sm">2. VELOCITY</h3>
              <p className="text-slate-400 text-xs mt-1">Lightning speed of real-time generation and ingestion.</p>
            </div>

            <div className="bg-slate-950/80 border border-yellow-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">📑</div>
              <h3 className="font-bold text-yellow-400 text-sm">3. VARIETY</h3>
              <p className="text-slate-400 text-xs mt-1">Diverse types: Structured, Semi-Structured, Unstructured.</p>
            </div>

            <div className="bg-slate-950/80 border border-red-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">🔍</div>
              <h3 className="font-bold text-red-400 text-sm">4. VERACITY</h3>
              <p className="text-slate-400 text-xs mt-1">Trustworthiness, quality, cleanliness, and accuracy.</p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-xl text-center">
              <div className="text-2xl mb-1">💎</div>
              <h3 className="font-bold text-emerald-400 text-sm">5. VALUE</h3>
              <p className="text-slate-400 text-xs mt-1">Actionable business intelligence and strategic outcomes.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive 5Vs Exploration Laboratory */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">02</span>
                Interactive Big Data 5Vs Simulator
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                Experiment live with storage scale units, streaming velocity calculations, data variety schemas, and veracity auditing.
              </p>
            </div>

            {/* V-Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["volume", "velocity", "variety", "veracity", "value"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveVTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                    activeVTab === tab
                      ? "bg-amber-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1: Volume */}
          {activeVTab === "volume" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <h4 className="text-white font-semibold text-sm">Storage Scale Hierarchy & Conversion</h4>
                <div className="text-xs text-amber-400">1 Petabyte (PB) = 1,024 Terabytes (TB)</div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Input Data Volume in Terabytes (TB):</label>
                <input
                  type="range"
                  min="1"
                  max="10240"
                  step="64"
                  value={volumeInputTB}
                  onChange={(e) => setVolumeInputTB(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Terabytes (TB)</div>
                  <div className="text-lg font-mono font-bold text-white mt-1">{volumeInputTB.toLocaleString()} TB</div>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Petabytes (PB)</div>
                  <div className="text-lg font-mono font-bold text-amber-400 mt-1">{(volumeInputTB / 1024).toFixed(2)} PB</div>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Exabytes (EB)</div>
                  <div className="text-lg font-mono font-bold text-orange-400 mt-1">{(volumeInputTB / (1024 * 1024)).toFixed(4)} EB</div>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400">Zettabytes (ZB)</div>
                  <div className="text-lg font-mono font-bold text-red-400 mt-1">{(volumeInputTB / (1024 ** 3)).toFixed(6)} ZB</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Velocity */}
          {activeVTab === "velocity" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-white font-semibold text-sm">Real-Time Ingestion Velocity Rate Calculator</h4>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Stream Ingestion Rate:</span>
                  <span className="font-mono font-bold text-orange-400">{eventsPerSec.toLocaleString()} events/sec</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={eventsPerSec}
                  onChange={(e) => setEventsPerSec(parseInt(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Storage Accumulation / Hour</div>
                  <div className="text-2xl font-mono font-bold text-orange-400 mt-1">{mbPerHour} MB</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Storage Accumulation / Day</div>
                  <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{gbPerDay} GB</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Storage Accumulation / Year</div>
                  <div className="text-2xl font-mono font-bold text-red-400 mt-1">{tbPerYear} TB</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Variety */}
          {activeVTab === "variety" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800">
              <h4 className="text-white font-semibold text-sm mb-4">The 3 Data Variety Formats</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="text-amber-400 font-bold text-xs uppercase mb-1">1. Structured Data (~10%)</div>
                  <p className="text-slate-300 text-xs mb-2">Relational tables with strict fixed schemas.</p>
                  <pre className="bg-slate-950 p-2 rounded text-[11px] text-slate-400 font-mono overflow-x-auto">
                    {`| ID  | Name    | Marks |
| 101 | Rajesh  | 94.5  |
| 102 | Priya   | 98.0  |`}
                  </pre>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="text-yellow-400 font-bold text-xs uppercase mb-1">2. Semi-Structured (~10%)</div>
                  <p className="text-slate-300 text-xs mb-2">Hierarchical tags without rigid table layouts.</p>
                  <pre className="bg-slate-950 p-2 rounded text-[11px] text-slate-400 font-mono overflow-x-auto">
                    {`{
  "user": "Sneha",
  "tags": ["AI", "Cloud"],
  "score": 95
}`}
                  </pre>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="text-orange-400 font-bold text-xs uppercase mb-1">3. Unstructured (~80%)</div>
                  <p className="text-slate-300 text-xs mb-2">Raw media files, audio logs, and video frames.</p>
                  <div className="bg-slate-950 p-2 rounded text-[11px] text-slate-400 font-mono">
                    <div>🎥 4K Video Streams</div>
                    <div>🎙️ WAV Audio Recordings</div>
                    <div>🛰️ Satellite Geo-Scans</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Veracity */}
          {activeVTab === "veracity" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-white font-semibold text-sm">Data Veracity & Quality Auditor</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Corrupted / Anomaly Records: {corruptedPct}%</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={corruptedPct}
                    onChange={(e) => setCorruptedPct(parseInt(e.target.value))}
                    className="w-full accent-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Missing Value Fields: {missingFieldPct}%</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={missingFieldPct}
                    onChange={(e) => setMissingFieldPct(parseInt(e.target.value))}
                    className="w-full accent-yellow-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 uppercase">Valid Clean Data Ratio</div>
                  <div className="text-3xl font-mono font-black text-emerald-400">{validDataPct}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 uppercase">Data Trustworthiness Status</div>
                  <div className="text-lg font-bold text-amber-300">{trustLevel}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Value */}
          {activeVTab === "value" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-white font-semibold text-sm">Value Extraction: Predictive ROI Analytics</h4>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Targeted Big Data Campaign Budget:</span>
                  <span className="font-bold text-emerald-400">₹{marketingBudget},000</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={marketingBudget}
                  onChange={(e) => setMarketingBudget(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-4 bg-slate-900 rounded-lg border border-emerald-500/30 text-center">
                <div className="text-xs text-slate-400 uppercase">Forecasted Business Revenue Value</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">₹{estimatedRevenueLakhs} Lakhs</div>
                <p className="text-xs text-slate-400 mt-2">
                  Actionable intelligence converts raw customer clickstream logs into hyper-targeted conversions.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Data Storage Measurement Scale */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 text-sm">03</span>
            Data Storage Hierarchy (Byte to Yottabyte)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 uppercase font-bold">
                <tr>
                  <th className="p-3 border-b border-slate-800">Unit Name</th>
                  <th className="p-3 border-b border-slate-800">Symbol</th>
                  <th className="p-3 border-b border-slate-800">Standard Conversion Value</th>
                  <th className="p-3 border-b border-slate-800">Real-World Scale Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                <tr>
                  <td className="p-3 text-white font-semibold">Kilobyte</td>
                  <td className="p-3 text-amber-400">KB</td>
                  <td className="p-3">1,024 Bytes</td>
                  <td className="p-3 font-sans">A short plaintext email</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-semibold">Megabyte</td>
                  <td className="p-3 text-amber-400">MB</td>
                  <td className="p-3">1,024 KB</td>
                  <td className="p-3 font-sans">A high-quality MP3 audio track</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-semibold">Gigabyte</td>
                  <td className="p-3 text-amber-400">GB</td>
                  <td className="p-3">1,024 MB</td>
                  <td className="p-3 font-sans">An HD movie download</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-semibold">Terabyte</td>
                  <td className="p-3 text-amber-400">TB</td>
                  <td className="p-3">1,024 GB</td>
                  <td className="p-3 font-sans">A modern laptop SSD drive</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-semibold">Petabyte</td>
                  <td className="p-3 text-orange-400">PB</td>
                  <td className="p-3">1,024 TB</td>
                  <td className="p-3 font-sans">Hospital archive of 10M X-Ray images</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-semibold">Exabyte</td>
                  <td className="p-3 text-orange-400">EB</td>
                  <td className="p-3">1,024 PB</td>
                  <td className="p-3 font-sans">Total monthly global internet video traffic</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-semibold">Zettabyte</td>
                  <td className="p-3 text-red-400">ZB</td>
                  <td className="p-3">1,024 EB</td>
                  <td className="p-3 font-sans">Entire global datasphere created annually</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-semibold">Yottabyte</td>
                  <td className="p-3 text-red-400">YB</td>
                  <td className="p-3">1,024 ZB</td>
                  <td className="p-3 font-sans">Hypothetical planetary sensor network data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">04</span>
            Python Companion Simulation: Big Data 5Vs Analytics Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python script implementing throughput calculations, data quality veracity audits, and business value analytics.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic6_files/big_data_5v_engine.py"
            title="big_data_5v_engine.py"
          />
        </section>

        {/* Section 5: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 text-sm">05</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic6_files/topic6_note.txt"
            title="Topic 6 Revision Notes"
          />
        </section>

        {/* Section 6: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">06</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your conceptual knowledge of Big Data characteristics and storage scaling.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-amber-400 my-1">
                {calculateScore()} / {topic6Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic6Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic6Questions.map((q, qIndex) => {
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
                              ? "bg-amber-600/30 border-amber-500 text-white font-medium"
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
                      <div className="text-amber-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-orange-300">
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
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">07</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "Why is traditional SQL/RDBMS insufficient for Big Data?",
                a: "Traditional RDBMS databases rely on vertical scaling (beefing up a single server) and require rigid tabular schemas. Big Data requires horizontal distribution across thousands of compute nodes to store petabytes of unstructured and streaming records."
              },
              {
                q: "What is the difference between Semi-Structured and Unstructured data?",
                a: "Semi-structured data contains organizational tags, markers, or hierarchical keys (JSON, XML) without a rigid table schema. Unstructured data has zero predefined structural schema (e.g., MP4 videos, raw audio waveforms, JPEG images)."
              },
              {
                q: "What makes 'Veracity' so challenging in Big Data?",
                a: "Big Data is aggregated from heterogeneous sources (sensors, social media, web scrapers) containing missing data, noisy readings, bot spam, and duplicates that must be cleaned before analytical modeling."
              },
              {
                q: "What is the order of data storage units from Petabyte onwards?",
                a: "Petabyte (PB, 1024 TB) &rarr; Exabyte (EB, 1024 PB) &rarr; Zettabyte (ZB, 1024 EB) &rarr; Yottabyte (YB, 1024 ZB)."
              }
            ]}
          />
        </section>

        {/* Section 8: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Big Data is the fuel that powers artificial intelligence and modern digital economies. For your Class 11 CBSE examinations, be ready to define each of the 5 Vs clearly with concrete real-world illustrations, write down the data size unit conversion table, and classify datasets into structured, semi-structured, and unstructured formats."
        />
      </div>
    </div>
  );
}
