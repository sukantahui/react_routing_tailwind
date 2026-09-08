import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic17_files/01_sensor_data_pipeline_creation.py?raw";
import pyCode2 from "./topic17_files/02_multidimensional_image_batch_reshape.py?raw";
import pyCode3 from "./topic17_files/03_c_vs_fortran_order_transformations.py?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_sensor_data_pipeline_creation.py",
    title: "1. Sensor Stream 3D Ingestion Pipeline",
    badge: "IoT 3D Pipeline",
    code: pyCode1,
    summary: "Ingests 504 raw sensor values into (7 Days, 24 Hours, 3 Sensors), extracts sub-slices, and flattens for ML feature matrices.",
  },
  {
    id: "part2",
    fileName: "02_multidimensional_image_batch_reshape.py",
    title: "2. Computer Vision Batch Reshaping",
    badge: "Vision Reshaping",
    code: pyCode2,
    summary: "Structures flat MNIST pixel streams into 4D CNN tensors (100, 28, 28, 1), flattens for Dense classifiers, and transposes to PyTorch NCHW.",
  },
  {
    id: "part3",
    fileName: "03_c_vs_fortran_order_transformations.py",
    title: "3. Memory Strides & C vs Fortran Ordering",
    badge: "Memory Strides",
    code: pyCode3,
    summary: "Examines row-major (C) vs column-major (Fortran) memory ordering, stride byte steps, and shared memory view mutations.",
  },
];

const Topic17 = () => {
  const [activeTab, setActiveTab] = useState("worked_example_walkthrough");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(12);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Calculate synthetic reading for (Day, Hour)
  // Base formula: 10 + (day * 24 + hour) * 0.168
  const baseVal = 10.0 + (selectedDay * 24 + selectedHour) * 0.168;
  const temp = parseFloat((baseVal + 12).toFixed(1));
  const humidity = parseFloat(Math.min(95, baseVal + 30).toFixed(1));
  const aqi = Math.round(50 + baseVal * 1.5);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-blue-900/60 via-slate-900 to-teal-900/60 border border-blue-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/40">
                Topic 17 • Practical Case Study
              </span>
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/40">
                Worked Example 1
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-200 via-teal-100 to-cyan-300 bg-clip-text text-transparent">
              Worked Example 1: Creating &amp; Reshaping Arrays
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              End-to-end industrial walkthrough: Converting flattened IoT sensor data streams into multi-dimensional 3D tensors, slicing temporal intervals, and reformatting tensor shapes for ML inference.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "worked_example_walkthrough", label: "Interactive Case Study Walkthrough", icon: "🛰️" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive Case Study Walkthrough */}
      {activeTab === "worked_example_walkthrough" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Problem Overview Card */}
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-blue-300 mb-2">📋 Problem Specification: Barrackpore Weather Station</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              A weather monitoring station captures 3 environmental metrics: <strong>Temperature (°C)</strong>, <strong>Relative Humidity (%)</strong>, and <strong>AQI (Air Quality Index)</strong> every hour for 7 full days. The raw hardware buffer yields a continuous 1D telemetry stream of <code className="text-teal-300 font-mono">7 × 24 × 3 = 504</code> float values.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">1. Raw Telemetry Stream:</span>
                <span className="text-blue-300 font-bold text-sm">Shape (504,)</span>
                <span className="text-slate-400 block text-[11px] mt-1">1D Continuous Buffer</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">2. Structured Tensor:</span>
                <span className="text-teal-300 font-bold text-sm">Shape (7, 24, 3)</span>
                <span className="text-slate-400 block text-[11px] mt-1">(Days, Hours, Sensors)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">3. ML Model Batch:</span>
                <span className="text-amber-300 font-bold text-sm">Shape (168, 3)</span>
                <span className="text-slate-400 block text-[11px] mt-1">reshape(-1, 3)</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Tensor Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h4 className="text-base font-bold text-slate-200">🔍 Interactive Tensor Query: `tensor[day, hour, :]`</h4>

              {/* Day Selector */}
              <div>
                <label className="text-xs font-bold text-blue-300 block mb-2">
                  Select Day: Day {selectedDay + 1} (Index {selectedDay})
                </label>
                <div className="grid grid-cols-7 gap-1.5">
                  {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`p-2 rounded-lg border text-xs font-mono font-bold transition ${
                        selectedDay === d
                          ? "bg-blue-500 border-blue-400 text-slate-950 shadow-md shadow-blue-500/20"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      D{d + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hour Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-teal-300">
                    Select Hour: {selectedHour}:00 ({selectedHour >= 12 ? "PM" : "AM"})
                  </label>
                  <span className="text-xs font-mono text-slate-400">Index {selectedHour}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(Number(e.target.value))}
                  className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>00:00 (Midnight)</span>
                  <span>12:00 (Noon)</span>
                  <span>23:00 (11 PM)</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <span className="text-slate-500">Python Query:</span>{" "}
                <span className="text-teal-300 font-bold">
                  sensor_tensor[{selectedDay}, {selectedHour}, :]
                </span>
              </div>
            </div>

            {/* Extracted Telemetry Sensor Readout */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-emerald-300 mb-4">
                  📊 Extracted Telemetry for Day {selectedDay + 1} @ {selectedHour}:00
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/40 text-center">
                    <span className="text-xs text-slate-400 block mb-1">Temperature</span>
                    <span className="text-2xl font-bold font-mono text-rose-400">{temp}°C</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Sensor Index 0</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-cyan-900/40 text-center">
                    <span className="text-xs text-slate-400 block mb-1">Humidity</span>
                    <span className="text-2xl font-bold font-mono text-cyan-400">{humidity}%</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Sensor Index 1</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40 text-center">
                    <span className="text-xs text-slate-400 block mb-1">Air Quality (AQI)</span>
                    <span className="text-2xl font-bold font-mono text-amber-400">{aqi}</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Sensor Index 2</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-950/30 border border-blue-900/60 rounded-xl text-xs text-slate-300">
                <span className="text-blue-300 font-bold block mb-1">💡 Reshaping Invariant:</span>
                Original stream <code className="text-blue-200">504</code> elements = <code className="text-blue-200">7 × 24 × 3</code>. No data is duplicated or lost in memory; only dimension pointers and stride offsets are transformed!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {s.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.py</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-blue-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Worked Example 1 Suite
              </span>
            </div>
            <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Notes */}
      {activeTab === "teacher_notes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Teacher
            name="Sukanta Hui"
            title="Senior ML Instructor, Barrackpore Lab"
            quote="Reshaping is one of the most frequent operations you will perform when bridging raw real-world data pipelines (streams, audio waveforms, image batches) with machine learning architectures. Always verify the total product of shapes and double check whether you need a view (reshape) or a true axis permutation (transpose)."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
              <span>📚 Comprehensive Topic Notes</span>
            </h3>
            <PlainTextPrint content={noteText} />
          </div>
        </div>
      )}

      {/* Tab 4: Quizzes & FAQs */}
      {activeTab === "faqs_questions" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <FAQTemplate questions={questions} />
        </div>
      )}
    </div>
  );
};

export default Topic17;
