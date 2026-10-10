import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic4Questions } from "./topic4_files/topic4_questions";

export default function Topic4() {
  // Interactive State for Reality Simulator
  const [realityMode, setRealityMode] = useState("AR");
  const [dofMode, setDofMode] = useState("6-DoF");
  const [headYaw, setHeadYaw] = useState(30);
  const [headPitch, setHeadPitch] = useState(15);
  const [headRoll, setHeadRoll] = useState(0);
  const [posX, setPosX] = useState(1.5);
  const [posY, setPosY] = useState(1.7);
  const [posZ, setPosZ] = useState(-2.0);

  // Reality details mapping
  const realityDetails = {
    AR: {
      title: "Augmented Reality (AR)",
      badge: "Real World + Digital Overlays",
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300",
      description:
        "Augments the user's real physical environment by superimposing digital 3D models, data feeds, and holographic graphics on smartphone screens or transparent smart glasses.",
      examples: ["Pokémon GO", "IKEA Place 3D Furniture", "Google Lens Live Translator", "Automotive Windshield HUDs"],
      viewText: "Looking through camera: Real room visible with a 3D animated robot standing on the actual rug."
    },
    VR: {
      title: "Virtual Reality (VR)",
      badge: "100% Synthetic Digital Immersion",
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300",
      description:
        "Completely shuts out the physical world using an opaque Head-Mounted Display (HMD) with dual high-refresh-rate displays and spatial audio, immersing the user entirely inside a synthetic 3D realm.",
      examples: ["Meta Quest 3", "HTC Vive Pro", "PlayStation VR2", "Military Flight & Combat Simulators"],
      viewText: "Opaque HMD: Real world totally blocked. You are floating inside a Martian space station."
    },
    MR: {
      title: "Mixed Reality (MR / XR)",
      badge: "Interactive Hybrid Co-existence",
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300",
      description:
        "The highest stage of reality blending where physical and digital objects co-exist, anchor to real surfaces, and interact with realistic lighting, shadows, and physical collision physics.",
      examples: ["Microsoft HoloLens 2", "Apple Vision Pro", "Magic Leap 2", "Interactive Surgical Navigation"],
      viewText: "Passthrough Sensors: A virtual hologram bounces realistically off your physical wooden desk."
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
    topic4Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-purple-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 4: Immersive Experiences (AR, VR & MR)
          </h1>
          <p className="text-purple-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Explore the cutting-edge frontier of spatial computing. Master the <strong>Milgram Reality-Virtuality Continuum</strong>, 
            understand the critical differences between <strong>Augmented Reality (AR)</strong>, <strong>Virtual Reality (VR)</strong>, 
            and <strong>Mixed Reality (MR)</strong>, and discover how <strong>6-DoF tracking</strong> and <strong>spatial audio</strong> power modern simulation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Milgram Reality-Virtuality Continuum */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 text-sm">01</span>
            The Reality-Virtuality Continuum (Milgram's Model)
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            In 1994, Paul Milgram defined the <strong>Reality-Virtuality Continuum</strong>—a continuous spectrum spanning from the purely physical real world to a 100% synthetic virtual environment.
          </p>

          {/* Continuum Diagram */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
              <div className="w-full md:w-1/4 p-3 bg-slate-900 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-bold">Left Anchor</div>
                <div className="text-white font-bold text-sm mt-1">Real Environment</div>
                <div className="text-[11px] text-slate-400">100% Physical Reality</div>
              </div>

              <div className="text-purple-400 font-black text-xl">&rarr;</div>

              <div className="w-full md:w-1/4 p-3 bg-amber-950/30 rounded-lg border border-amber-500/40">
                <div className="text-xs text-amber-400 uppercase font-bold">Augmented Reality (AR)</div>
                <div className="text-white font-bold text-sm mt-1">Real + Overlays</div>
                <div className="text-[11px] text-slate-400">Pokémon GO, IKEA Place</div>
              </div>

              <div className="text-cyan-400 font-black text-xl">&rarr;</div>

              <div className="w-full md:w-1/4 p-3 bg-cyan-950/30 rounded-lg border border-cyan-500/40">
                <div className="text-xs text-cyan-400 uppercase font-bold">Mixed Reality (MR)</div>
                <div className="text-white font-bold text-sm mt-1">Interactive Hybrids</div>
                <div className="text-[11px] text-slate-400">HoloLens, Vision Pro</div>
              </div>

              <div className="text-purple-400 font-black text-xl">&rarr;</div>

              <div className="w-full md:w-1/4 p-3 bg-purple-950/30 rounded-lg border border-purple-500/40">
                <div className="text-xs text-purple-400 uppercase font-bold">Right Anchor</div>
                <div className="text-white font-bold text-sm mt-1">Virtual Reality (VR)</div>
                <div className="text-[11px] text-slate-400">100% Synthetic Realm</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Reality Mode & 6-DoF Spatial Pose Tracker */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 text-sm">02</span>
                Interactive Reality Explorer & 6-DoF Spatial Tracker
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                Switch between AR, VR, and MR modes and manipulate head rotation (3-DoF) and room coordinates (6-DoF).
              </p>
            </div>
            {/* Tech Selector */}
            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["AR", "VR", "MR"].map((m) => (
                <button
                  key={m}
                  onClick={() => setRealityMode(m)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    realityMode === m
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {m} Mode
                </button>
              ))}
            </div>
          </div>

          {/* Active Reality Info Card */}
          <div className={`p-5 rounded-xl border bg-gradient-to-br ${realityDetails[realityMode].color} mb-6`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">{realityDetails[realityMode].title}</h3>
              <span className="px-3 py-1 bg-slate-950/80 rounded-full text-xs font-semibold text-white">
                {realityDetails[realityMode].badge}
              </span>
            </div>
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed mb-3">
              {realityDetails[realityMode].description}
            </p>
            <div className="bg-slate-950/80 p-3 rounded-lg text-xs text-slate-300 font-mono">
              <strong>Simulated Viewport:</strong> {realityDetails[realityMode].viewText}
            </div>
          </div>

          {/* Spatial Tracker Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 uppercase tracking-wider">Spatial Tracking Controls</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDofMode("3-DoF")}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                      dofMode === "3-DoF" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    3-DoF
                  </button>
                  <button
                    onClick={() => setDofMode("6-DoF")}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                      dofMode === "6-DoF" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    6-DoF
                  </button>
                </div>
              </div>

              {/* Rotational (3-DoF) */}
              <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-300">Orientation (Rotational: 3-DoF)</div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Yaw (Left/Right): {headYaw}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={headYaw}
                    onChange={(e) => setHeadYaw(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Pitch (Up/Down): {headPitch}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={headPitch}
                    onChange={(e) => setHeadPitch(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>

              {/* Positional (6-DoF) */}
              <div className={`bg-slate-900 p-3 rounded border border-slate-800 space-y-2 ${dofMode === "3-DoF" ? "opacity-40 pointer-events-none" : ""}`}>
                <div className="font-semibold text-slate-300">Position in Room (Translational: 6-DoF)</div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>X-Axis (Left/Right): {posX} m</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={posX}
                    onChange={(e) => setPosX(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Z-Axis (Forward/Back): {posZ} m</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={posZ}
                    onChange={(e) => setPosZ(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Visualizer Card */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                  Spatial Pose Telemetry Output
                </div>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
                  <div><strong>Mode:</strong> {dofMode} {dofMode === "6-DoF" ? "(Room-Scale)" : "(Rotational Only)"}</div>
                  <div><strong>Euler Angles:</strong> Yaw: {headYaw}°, Pitch: {headPitch}°, Roll: {headRoll}°</div>
                  <div>
                    <strong>Position Vector:</strong> [X: {dofMode === "6-DoF" ? posX : 0.0}m, Y: {dofMode === "6-DoF" ? posY : 0.0}m, Z: {dofMode === "6-DoF" ? posZ : 0.0}m]
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-emerald-400 text-[11px]">
                    {dofMode === "6-DoF"
                      ? "✅ Full 6-DoF: User can walk around virtual objects and view them from any side."
                      : "⚠️ 3-DoF: Stationary view. Tilting/turning head works, but walking is not tracked."}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-950/40 border border-purple-500/30 rounded text-xs text-purple-200">
                💡 <strong>Exam Note:</strong> 3-DoF tracks Pitch, Yaw, Roll. 6-DoF adds physical translations (X, Y, Z coordinates).
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Detailed Comparison Matrix */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">03</span>
            Comprehensive Comparison Matrix (AR vs. VR vs. MR)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 uppercase font-bold">
                <tr>
                  <th className="p-3.5 border-b border-slate-800">Key Feature</th>
                  <th className="p-3.5 border-b border-slate-800 text-amber-400">Augmented Reality (AR)</th>
                  <th className="p-3.5 border-b border-slate-800 text-purple-400">Virtual Reality (VR)</th>
                  <th className="p-3.5 border-b border-slate-800 text-cyan-400">Mixed Reality (MR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Visual Environment</td>
                  <td className="p-3.5">Real physical world with digital 2D/3D overlays</td>
                  <td className="p-3.5">100% synthetic artificial computer simulation</td>
                  <td className="p-3.5">Hybrid world where real & digital co-exist & interact</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">User Isolation</td>
                  <td className="p-3.5">Zero isolation (Real surroundings fully visible)</td>
                  <td className="p-3.5">Complete sensory & visual isolation from reality</td>
                  <td className="p-3.5">Passthrough blending (Real environment visible)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Hardware Devices</td>
                  <td className="p-3.5">Smartphones, Tablets, Smart AR glasses (Google Glass)</td>
                  <td className="p-3.5">Opaque HMDs (Meta Quest 3, HTC Vive, PSVR2)</td>
                  <td className="p-3.5">Spatial Headsets (Apple Vision Pro, HoloLens 2)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Object Occlusion & Physics</td>
                  <td className="p-3.5">Digital elements float over screen without physical physics</td>
                  <td className="p-3.5">Virtual objects interact strictly inside the VR world</td>
                  <td className="p-3.5">Virtual objects bounce off real tables and hide behind walls</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-white">Primary Applications</td>
                  <td className="p-3.5">Gaming (Pokémon GO), retail preview, HUD navigation</td>
                  <td className="p-3.5">Flight simulation, combat training, immersive gaming</td>
                  <td className="p-3.5">Surgical rehearsals, industrial 3D CAD engineering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Real-World Applications */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 text-sm">04</span>
            High-Impact Industry Applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <div className="text-emerald-400 font-bold mb-2">🏥 Healthcare & Surgery</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Surgeons practice high-risk neurosurgery on 3D virtual anatomical replicas and use MR overlays (HoloLens) during live surgery to view real-time CT scans directly over the patient.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <div className="text-cyan-400 font-bold mb-2">✈️ Aviation & Defense Training</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Fighter pilots and astronauts train extensively in zero-risk 6-DoF cockpit simulators that reproduce severe weather, system failures, and dogfights without aircraft damage.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <div className="text-purple-400 font-bold mb-2">🏗️ Architecture & Real Estate</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Architects offer 1:1 scale VR walkthroughs of planned buildings to inspect daylight angles, room flow, and aesthetics before pouring physical concrete.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">05</span>
            Python Companion Simulation: Spatial Pose & Reality Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the Python script calculating 3-DoF / 6-DoF spatial matrices and simulating the Reality-Virtuality continuum.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic4_files/immersive_tech_simulator.py"
            title="immersive_tech_simulator.py"
          />
        </section>

        {/* Section 6: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 text-sm">06</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic4_files/topic4_note.txt"
            title="Topic 4 Revision Notes"
          />
        </section>

        {/* Section 7: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 text-sm">07</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your conceptual knowledge on Augmented Reality, Virtual Reality, Mixed Reality, and 6-DoF tracking.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-purple-400 my-1">
                {calculateScore()} / {topic4Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic4Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic4Questions.map((q, qIndex) => {
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
                              ? "bg-purple-600/30 border-purple-500 text-white font-medium"
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
                      <div className="text-purple-400">
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
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">08</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the single biggest difference between AR and VR?",
                a: "In Augmented Reality (AR), the real physical world remains directly visible and digital elements are superimposed onto it. In Virtual Reality (VR), the real world is completely blocked out, and the user is totally immersed in a 100% synthetic computer-generated environment."
              },
              {
                q: "What does Mixed Reality (MR) add beyond simple Augmented Reality?",
                a: "Mixed Reality introduces dynamic spatial interaction and occlusion: virtual objects are anchored to physical geometry (tables, walls) and can be occluded by real objects or interact with real-world physics."
              },
              {
                q: "What is the significance of 6-DoF tracking compared to 3-DoF?",
                a: "3-DoF tracks only rotational head movements (Pitch, Yaw, Roll), meaning you can look around from a fixed chair. 6-DoF adds 3 translational physical axes (X, Y, Z), allowing you to physically walk through the 3D room."
              },
              {
                q: "Why is low latency (under 20ms) critical in VR headsets?",
                a: "If there is a noticeable delay between head motion and visual refresh, the brain experiences a sensory mismatch with the inner ear vestibular balance system, causing nausea and simulator sickness."
              }
            ]}
          />
        </section>

        {/* Section 9: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Immersive computing represents the transition from flat 2D screens to spatial 3D interaction. For CBSE Class 11 exams, be prepared to draw Milgram's Reality-Virtuality continuum, contrast AR vs VR vs MR with concrete examples, and explain 3-DoF vs 6-DoF motion tracking."
        />
      </div>
    </div>
  );
}
