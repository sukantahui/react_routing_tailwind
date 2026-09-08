import React, { useState } from "react";
import {
  Save,
  Terminal,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  Code,
  DownloadCloud
} from "lucide-react";
import pyCode1 from "./topic10_files/01_savefig_parameters_and_formats.py?raw";
import pyCode2 from "./topic10_files/02_in_memory_buffers_and_web_export.py?raw";
import pyCode3 from "./topic10_files/03_batch_report_export_pipelines.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

export default function Topic10() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Savefig Studio Controls
  const [exportFormat, setExportFormat] = useState("png"); // "png", "svg", "pdf"
  const [dpi, setDpi] = useState(300);
  const [isTightBBox, setIsTightBBox] = useState(true);
  const [isTransparent, setIsTransparent] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_savefig_parameters_and_formats.py", code: pyCode1, desc: "Raster (PNG) vs Vector (SVG/PDF) exports, DPI resolutions, and tight bounding boxes" },
    2: { name: "02_in_memory_buffers_and_web_export.py", code: pyCode2, desc: "In-memory io.BytesIO() streams for REST APIs (FastAPI/Flask) and Base64 payloads" },
    3: { name: "03_batch_report_export_pipelines.py", code: pyCode3, desc: "Multi-page PDF compilation using matplotlib.backends.backend_pdf.PdfPages" }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionSelect = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-blue-900/40 border border-purple-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 10: Saving Figures with plt.savefig()
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Export and publish production ML visuals. Master raster (PNG/JPG) vs vector (SVG/PDF) choices, resolution tuning with <code className="text-purple-300 font-mono">dpi=300</code>, margin clipping prevention with <code className="text-purple-300 font-mono">bbox_inches='tight'</code>, zero-disk in-memory RAM streams with <code className="text-purple-300 font-mono">io.BytesIO()</code>, and multi-page <code className="text-purple-300 font-mono">PdfPages</code> report pipelines.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" /> plt.savefig()
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <DownloadCloud className="w-3.5 h-3.5" /> In-Memory BytesIO
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-purple-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "Mahima and Abhronila spent hours building a Flask dashboard that generated customer loss charts, but each request wrote temporary PNG files to the hard drive, causing server disk bottlenecks! Transitioning to <code className="text-purple-300 font-mono">io.BytesIO()</code> with <code className="text-purple-300 font-mono">bbox_inches='tight'</code> delivered high-res images in RAM with zero disk I/O lag!"
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Export Pipeline Studio", icon: Save },
            { id: "lab", label: "Python Code Lab (3 Scripts)", icon: Terminal },
            { id: "notes", label: "Revision Notes", icon: FileText },
            { id: "quiz", label: "MCQ Assessment", icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px rounded-t-lg ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-400 bg-purple-950/30"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: STUDIO */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="text-purple-400 w-5 h-5" />
                  savefig Parameter Engine
                </h2>

                {/* Format Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Target File Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "png", label: "PNG (Raster)", badge: "Lossless" },
                      { id: "svg", label: "SVG (Vector)", badge: "Scalable" },
                      { id: "pdf", label: "PDF (Vector)", badge: "Doc" }
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        onClick={() => setExportFormat(fmt.id)}
                        className={`p-2.5 rounded-lg text-xs font-semibold border text-left transition ${
                          exportFormat === fmt.id
                            ? "border-purple-500 bg-purple-950/60 text-purple-300 ring-1 ring-purple-500"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div>{fmt.label}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{fmt.badge}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* DPI Slider (Active for raster PNG) */}
                {exportFormat === "png" && (
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Resolution (dpi parameter)</span>
                      <span className="text-purple-400 font-mono">{dpi} DPI</span>
                    </div>
                    <input
                      type="range"
                      min="72"
                      max="600"
                      step="50"
                      value={dpi}
                      onChange={(e) => setDpi(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>72 (Web Draft)</span>
                      <span>300 (Publication)</span>
                      <span>600 (Ultra)</span>
                    </div>
                  </div>
                )}

                {/* Toggles */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <span className="text-xs font-semibold text-slate-300 block">bbox_inches='tight'</span>
                      <span className="text-[10px] text-slate-400">Prevents clipping outside titles/legends</span>
                    </div>
                    <button
                      onClick={() => setIsTightBBox(!isTightBBox)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        isTightBBox ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isTightBBox ? "ENABLED" : "OFF"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <span className="text-xs font-semibold text-slate-300 block">transparent=True</span>
                      <span className="text-[10px] text-slate-400">Alpha transparent canvas background</span>
                    </div>
                    <button
                      onClick={() => setIsTransparent(!isTransparent)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${
                        isTransparent ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isTransparent ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Canvas */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-purple-400" />
                      Live Export Canvas Bounding Preview
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-purple-300 border border-slate-800 uppercase">
                      format: {exportFormat} | {isTightBBox ? "tight crop" : "loose crop"}
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div
                    className={`rounded-xl p-6 border transition-all flex items-center justify-center ${
                      isTransparent ? "bg-transparent border-dashed border-purple-500/40" : "bg-slate-950 border-slate-800"
                    }`}
                  >
                    <svg viewBox="0 0 520 240" className="w-full max-w-lg h-56">
                      {/* Tight Bounding Box Frame Indicator */}
                      <rect
                        x={isTightBBox ? "20" : "5"}
                        y={isTightBBox ? "15" : "5"}
                        width={isTightBBox ? "480" : "510"}
                        height={isTightBBox ? "210" : "230"}
                        fill="none"
                        stroke="#a855f7"
                        strokeDasharray="4,4"
                        strokeWidth="1.5"
                        rx="6"
                      />
                      <text x={isTightBBox ? "28" : "12"} y={isTightBBox ? "28" : "16"} fill="#a855f7" fontSize="8">
                        {isTightBBox ? "bbox_inches='tight' (Clipped to content)" : "Nominal Canvas Window"}
                      </text>

                      {/* Internal Plot Axes */}
                      <rect x="60" y="45" width="410" height="150" fill="#0f172a" stroke="#334155" rx="3" />

                      {/* Signal Waveform */}
                      <path
                        d="M 60 120 Q 110 50 160 120 T 260 120 T 360 120 T 460 120"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {/* Title */}
                      <text x="265" y="38" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Model Output Validation Signal
                      </text>

                      {/* Axis Labels */}
                      <text x="265" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Time (seconds)
                      </text>
                      <text x="45" y="120" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 45 120)">
                        Amplitude (V)
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Generated Python */}
                <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-purple-400" />
                    Generated Matplotlib Python Code:
                  </div>
                  <pre className="text-purple-300">
{`# Exporting production graphic
fig.savefig(
    "model_signal.${exportFormat}",
    format="${exportFormat}",
    ${exportFormat === "png" ? `dpi=${dpi},\n    ` : ""}bbox_inches="${isTightBBox ? "tight" : "standard"}",
    transparent=${isTransparent ? "True" : "False"}
)
plt.close(fig) # Essential memory cleanup!`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "lab" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Terminal className="text-purple-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore raster/vector formats, in-memory BytesIO streams, and multi-page PDF compilation.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-purple-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Script 0{num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-purple-400">{scripts[activeScript].name}</span>
                <p className="text-xs text-slate-300 mt-0.5">{scripts[activeScript].desc}</p>
              </div>
              <button
                onClick={() => copyCode(scripts[activeScript].code)}
                className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[500px]">
                {scripts[activeScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION NOTES */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-purple-400 w-5 h-5" />
                Figure Export &amp; Savefig Technical Notes
              </h2>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {noteText}
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="text-purple-400 w-5 h-5" />
                  Knowledge Verification Quiz
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test your understanding of savefig parameters, vector formats, and BytesIO buffers.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 text-sm font-bold">
                  Score: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, qIndex) => (
                <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-semibold text-white mb-3">
                    {qIndex + 1}. {q.question}
                  </h3>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedAnswers[q.id] === optIndex;
                      const isCorrect = q.correctAnswer === optIndex;
                      let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700";

                      if (showResults) {
                        if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
                        else if (isSelected && !isCorrect) btnStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                      } else if (isSelected) {
                        btnStyle = "border-purple-500 bg-purple-950/50 text-purple-200 ring-1 ring-purple-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => !showResults && handleOptionSelect(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-lg text-xs border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-400">
                      <strong className="text-purple-300">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                Reset
              </button>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-purple-600/30"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
