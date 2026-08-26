import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";

// Import Python Files
import landscapeCode from "./topic6_files/complex_landscape_composition.py?raw";
import avatarCode from "./topic6_files/layered_character_and_robot_avatar.py?raw";
import tirangaCode from "./topic6_files/ashoka_chakra_tiranga_flag.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes layerGlow {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
  50% { filter: drop-shadow(0 0 16px rgba(56, 189, 248, 0.7)); }
}
`;

const Topic6 = () => {
  const [activeLayers, setActiveLayers] = useState({
    mountains: true,
    hills: true,
    cottage: true,
    stars: true
  });

  const toggleLayer = (layerName) => {
    setActiveLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const prototypes = [
    {
      name: "draw_polygon_filled(t, vertices, stroke, fill)",
      returnType: "None (Custom Helper)",
      purpose: "Traverses an arbitrary vertex tuple list inside a begin_fill() / end_fill() block.",
      usage: "draw_polygon_filled(t, mountain_points, '#1e293b', '#0f172a')"
    },
    {
      name: "draw_stripe(t, x, y, w, h, stroke, fill)",
      returnType: "None (Custom Helper)",
      purpose: "Renders a parameterized rectangular color band with exact geometric coordinates.",
      usage: "draw_stripe(t, -180, 120, 360, 80, '#ff9933', '#ff9933')"
    },
    {
      name: "draw_ashoka_chakra(t, cx, cy, r)",
      returnType: "None (Custom Helper)",
      purpose: "Renders concentric navy circle rim and 24 evenly spaced 15-degree radial spokes.",
      usage: "draw_ashoka_chakra(t, 0, 0, radius=35)"
    },
    {
      name: "The Painter's Algorithm Layering",
      returnType: "Z-Index Hierarchy",
      purpose: "Background layers rendered first; foreground layers painted sequentially on top.",
      usage: "Sky -> Mountains -> Hills -> Cottage -> UI Header"
    }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_002 · Turtle Design & Aesthetic Customization · Topic 6
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            Combining Geometric Fills for Complex Vector Art
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The grand synthesis of Module 2. Learn the Painter's Algorithm for z-index layering, compose multi-tier landscapes and character avatars, and engineer precision geometric flags.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🏔️ Painter's Algorithm & Z-Index
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🤖 Modular Vector Avatars
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🇮🇳 Tiranga & 24-Spoke Chakra
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE MULTI-LAYER SCENE COMPOSER
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Z-Index Layer Isolation Studio
              </h3>
              <p className="text-xs text-slate-400">
                Toggle individual visual layers on and off to observe how the Painter's Algorithm assembles the complete illustration.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {[
                { key: "stars", label: "✨ Stars", color: "bg-amber-500 text-slate-950" },
                { key: "mountains", label: "🏔️ Mountains", color: "bg-indigo-500 text-white" },
                { key: "hills", label: "🌱 Hills", color: "bg-emerald-500 text-white" },
                { key: "cottage", label: "🏠 Cottage", color: "bg-sky-500 text-white" }
              ].map((layer) => (
                <button
                  key={layer.key}
                  onClick={() => toggleLayer(layer.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeLayers[layer.key]
                      ? layer.color
                      : "bg-gray-800 text-slate-500 border border-slate-700 hover:bg-gray-700"
                  }`}
                >
                  {layer.label} {activeLayers[layer.key] ? "(ON)" : "(OFF)"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              {/* Sky Backdrop */}
              <rect x="10" y="10" width="680" height="220" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Layer 1: Starfield */}
              {activeLayers.stars && (
                <g fill="#fef08a">
                  <circle cx="80" cy="40" r="2" />
                  <circle cx="160" cy="70" r="1.5" />
                  <circle cx="260" cy="35" r="2.5" />
                  <circle cx="380" cy="55" r="2" />
                  <circle cx="480" cy="40" r="1.5" />
                  <circle cx="590" cy="65" r="2" />
                  <circle cx="630" cy="30" r="3" fill="#fde047" />
                </g>
              )}

              {/* Layer 2: Distant Mountains */}
              {activeLayers.mountains && (
                <polygon
                  points="10,180 120,70 230,140 350,50 480,130 590,60 690,180 690,230 10,230"
                  fill="#0f172a"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
              )}

              {/* Layer 3: Rolling Green Hills */}
              {activeLayers.hills && (
                <path
                  d="M 10 170 Q 180 110, 360 160 T 690 140 L 690 230 L 10 230 Z"
                  fill="#065f46"
                  stroke="#047857"
                  strokeWidth="2"
                />
              )}

              {/* Layer 4: Foreground Cottage */}
              {activeLayers.cottage && (
                <g transform="translate(350, 160)">
                  {/* Cottage Base */}
                  <rect x="-45" y="0" width="90" height="55" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                  {/* Roof */}
                  <polygon points="-55,0 0,-40 55,0" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
                  {/* Window */}
                  <rect x="-15" y="15" width="30" height="25" fill="#fde047" stroke="#fbbf24" strokeWidth="1.5" />
                  <line x1="0" y1="15" x2="0" y2="40" stroke="#b45309" strokeWidth="1" />
                  <line x1="-15" y1="27" x2="15" y2="27" stroke="#b45309" strokeWidth="1" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Composite Vector Architecture Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Design Pattern / Helper</th>
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Architectural Purpose</th>
                  <th className="py-3 px-4">Code Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-purple-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-sky-300 text-xs">{proto.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            PYTHON CODE IMPLEMENTATION FILES
        ========================================================================= */}
        <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>💻</span> Masterpiece Composite Illustration Code Files
          </h2>

          <div className="space-y-6">
            {/* File 1: complex_landscape_composition.py */}
            <PythonFileLoader
              fileModule={landscapeCode}
              title="complex_landscape_composition.py"
              highlightLines={[12, 17, 21, 33, 40, 46, 50]}
            />

            {/* File 2: layered_character_and_robot_avatar.py */}
            <PythonFileLoader
              fileModule={avatarCode}
              title="layered_character_and_robot_avatar.py"
              highlightLines={[18, 23, 31, 37, 43]}
            />

            {/* File 3: ashoka_chakra_tiranga_flag.py */}
            <PythonFileLoader
              fileModule={tirangaCode}
              title="ashoka_chakra_tiranga_flag.py"
              highlightLines={[12, 17, 24, 27, 44, 47, 50, 53]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-purple-400 text-lg flex items-center gap-2">
              <span>🇮🇳</span> Barrackpore Independence Day Project: Tiranga
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Student Debangshu engineers the Indian Flag with exact 3:2 aspect ratio proportions. He decomposes the flag into 3 rectangular filled bands (Saffron, White, Green) and overlays the 24-spoke Ashoka Chakra in navy blue with exact 15-degree radial angles.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🤖</span> Jadavpur Robotics Club: Avatar Icon Generator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata and Susmita build a procedural robot avatar generator. By combining rounded head boxes, glowing cyan eye dots, and frequency antenna beacons, they create unique vector avatars for all members of the university robotics team.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Composite Art Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Inverted Z-Index Layering</strong>
              <p className="text-slate-400">
                Drawing foreground windows before the background wall causes the wall fill to completely overwrite and erase the window. Always draw back-to-front!
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Monolithic 500-Line Main Scripts</strong>
              <p className="text-slate-400">
                Writing an entire landscape in one giant script makes debugging impossible. Always decompose elements into modular helper functions.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Tangential Circle Offset Confusion</strong>
              <p className="text-slate-400">
                <code className="text-amber-300">t.circle(r)</code> draws tangentially to the left of the turtle, placing the center at <code className="text-sky-300">(x, y+r)</code>. Always offset by <code className="text-sky-300">(cx, cy - r)</code> to center circles.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Forgetting screen.tracer(0) in Complex Art</strong>
              <p className="text-slate-400">
                Complex composite scenes with 50+ shapes cause slow, flickering step-by-step rendering unless accelerated with <code className="text-purple-300">tracer(0)</code> and <code className="text-emerald-300">update()</code>.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-emerald-400 mb-3">📝 Module 005_002 Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I have mastered penup(), pendown(), and pensize() for clean path control",
              "I understand stroke hierarchies and how to configure shapesize() cursor scales",
              "I can configure 0-255 RGB modes with screen.colormode(255) and hex colors",
              "I know the 3-step begin_fill() and end_fill() protocol for solid polygon fills",
              "I can customize canvas window dimensions, title headers, and dark backdrops",
              "I know how to harness screen.tracer(0) for instant, flicker-free rendering",
              "I can compose multi-layered vector artwork using the Painter's Algorithm"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HINTS & EXPERT MINDSET
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How digital illustration software (Figma, Photoshop) organizes artwork into discrete layers and folders.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How breaking complex buildings into simple triangles, rectangles, and circular dots makes even the most intricate illustrations straightforward to code.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add smoke puffs rising from the cottage chimney using a loop of 4 semi-transparent overlapping circles!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every master digital artist and game developer builds upon the same fundamental truth: <strong>all complex beauty is composed of simple primitives orchestrated with mathematical precision</strong>. By mastering pen control, color systems, polygon fills, canvas window setup, and layer composition in Module 2, you now possess the complete toolkit to design vector graphics, procedural landscapes, and interactive game worlds.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Composite Vector Art & Geometric Fills FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Composite Vector Art Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic6_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="Congratulations to all students at Coder & AccoTax in Barrackpore and Kolkata for completing Module 005_002 (Turtle Design & Aesthetic Customization)! Seeing students combine math, color theory, and modular Python functions to draw the Tiranga flag, starry mountain landscapes, and robot avatars is the greatest joy of teaching computer science. You are now fully prepared to enter Module 005_003 to explore polygon mathematics, spirals, and recursive mandalas!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic6;
