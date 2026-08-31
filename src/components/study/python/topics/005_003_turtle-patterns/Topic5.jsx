import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";

// Import Python Files
import rainbowSpiralCode from "./topic5_files/hsv_rainbow_cycle_loops.py?raw";
import spectrumMandalaCode from "./topic5_files/concentric_spectrum_mandala.py?raw";
import linearGradientCode from "./topic5_files/linear_gradient_polygon_mesh.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hueRotateAnim {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
`;

const Topic5 = () => {
  const [saturation, setSaturation] = useState(1.0);
  const [gradientType, setGradientType] = useState("rainbow"); // rainbow, sunset, cyber

  const prototypes = [
    {
      name: "colorsys.hsv_to_rgb(h, s, v)",
      returnType: "Tuple (r, g, b) floats [0, 1]",
      purpose: "Converts HSV color parameters into RGB values ready for Turtle colormode(1.0).",
      usage: "r, g, b = colorsys.hsv_to_rgb(hue, 1.0, 1.0)"
    },
    {
      name: "Normalized Hue: i / total_steps",
      returnType: "float [0.0, 1.0]",
      purpose: "Maps loop iteration progress directly to the full 360-degree color spectrum wheel.",
      usage: "hue = i / total_steps"
    },
    {
      name: "Linear Interpolation: Lerp(C1, C2, t)",
      returnType: "Tuple (r, g, b)",
      purpose: "Smoothly transitions between two specific RGB colors across a sequence of bars or tiles.",
      usage: "C = C1 + (C2 - C1) * factor"
    },
    {
      name: "Multi-Cycle Rainbow: (i * f) % 1.0",
      returnType: "Periodic float",
      purpose: "Generates repeating rapid rainbow color cycles along a long spiral or polygon chain.",
      usage: "hue = (i * 0.03) % 1.0"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_003 · Turtle Patterns & Geometric Mathematics · Topic 5
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">
            Color Gradients & Hue Shifts in Iterative Loops
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform monochrome vector lines into living spectrum artworks. Harness Python's <code className="text-fuchsia-300 font-mono">colorsys</code> library to create continuous HSV rainbows, linear Lerp transitions, and radial spectrum mandalas.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌈 colorsys.hsv_to_rgb()
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎨 0.0 - 1.0 Normalized Hue
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ✨ Linear Lerp Transitions
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE HSV SPECTRUM STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🌈</span> HSV Color Wheel & Gradient Laboratory
              </h3>
              <p className="text-xs text-slate-400">
                Inspect how loop progress maps directly to the visible color spectrum and tweak saturation levels.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Palette:</span>
                {["rainbow", "sunset", "cyber"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setGradientType(p)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer capitalize ${
                      gradientType === p ? "bg-fuchsia-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Saturation:</span>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.1"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-16 accent-fuchsia-400 cursor-pointer"
                />
                <span className="font-mono text-xs text-fuchsia-300 w-6">{(saturation * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Radial 360° Color Spectrum Wheel */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-fuchsia-400 mb-2">
                Radial Spoke Spectrum: hue = spoke / 36
              </span>
              <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                <g transform="translate(120, 100)">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const angle = (i * 10 * Math.PI) / 180;
                    const hueDeg = i * 10;
                    const x2 = 75 * Math.cos(angle);
                    const y2 = 75 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1="0"
                        y1="0"
                        x2={x2}
                        y2={y2}
                        stroke={`hsl(${hueDeg}, ${saturation * 100}%, 55%)`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    );
                  })}
                  <circle cx="0" cy="0" r="14" fill="#020617" stroke="#334155" strokeWidth="2" />
                </g>
              </svg>
            </div>

            {/* View 2: Linear Continuous Bar Gradient */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400">
                Linear Lerp Mesh: 50 Interleaved Bars
              </span>

              <div className="w-full h-24 rounded-lg overflow-hidden flex border border-slate-700">
                {Array.from({ length: 50 }).map((_, i) => {
                  const factor = i / 49;
                  const color =
                    gradientType === "rainbow"
                      ? `hsl(${factor * 360}, ${saturation * 100}%, 50%)`
                      : gradientType === "sunset"
                      ? `hsl(${30 + factor * 250}, ${saturation * 100}%, ${40 + factor * 20}%)`
                      : `hsl(${180 + factor * 140}, ${saturation * 100}%, 55%)`;
                  return <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />;
                })}
              </div>

              <div className="w-full flex justify-between text-[11px] font-mono text-slate-400">
                <span>Start: i=0 (0.0)</span>
                <span>Midpoint: i=25 (0.5)</span>
                <span>End: i=50 (1.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Procedural Color Gradient Formulas
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Gradient Model</th>
                  <th className="py-3 px-4">Mathematical Range</th>
                  <th className="py-3 px-4">Visual Behavior</th>
                  <th className="py-3 px-4">Python Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-fuchsia-300 font-bold text-xs">{proto.name}</td>
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
            <span>💻</span> Professional Python Color Spectrum Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: hsv_rainbow_cycle_loops.py */}
            <PythonFileLoader
              fileModule={rainbowSpiralCode}
              title="hsv_rainbow_cycle_loops.py"
              highlightLines={[12, 23, 24, 25]}
            />

            {/* File 2: concentric_spectrum_mandala.py */}
            <PythonFileLoader
              fileModule={spectrumMandalaCode}
              title="concentric_spectrum_mandala.py"
              highlightLines={[12, 20, 21, 22]}
            />

            {/* File 3: linear_gradient_polygon_mesh.py */}
            <PythonFileLoader
              fileModule={linearGradientCode}
              title="linear_gradient_polygon_mesh.py"
              highlightLines={[11, 12, 13, 27, 28]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-fuchsia-400 text-lg flex items-center gap-2">
              <span>🌈</span> Barrackpore Digital Art Expo: 300-Step Rainbow Vortex
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata and Mahima generate a 300-step spiral vortex using <code className="text-fuchsia-300 font-mono">colorsys.hsv_to_rgb(i / 300, 1.0, 1.0)</code>. By seamlessly transitioning from vibrant red through emerald, cyan, and violet across 300 micro-segments, they win first prize in the regional computational arts festival.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🌅</span> Jadavpur Game Lab: Procedural Sunset Horizon
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu uses linear RGB interpolation (Lerp) to construct a smooth 100-bar background gradient transitioning from fiery sunset orange (<code className="text-amber-300 font-mono">#fbbf24</code>) to deep night indigo (<code className="text-indigo-300 font-mono">#1e1b4b</code>) for his 2D retro arcade video game project.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Color Gradient Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Colormode Mismatch Crashes</strong>
              <p className="text-slate-400">
                Passing <code className="text-rose-300 font-mono">(255, 128, 0)</code> when default colormode is 1.0 raises <code className="text-rose-300">TurtleGraphicsError</code>! Either use 0.0-1.0 floats or invoke <code className="text-emerald-300 font-mono">screen.colormode(255)</code> first.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Integer Division Truncation</strong>
              <p className="text-slate-400">
                In Python 2 or integer operations, <code className="text-rose-300 font-mono">i // 300</code> evaluates to 0 for the entire loop, locking color permanently to pure Red. Always use true float division <code className="text-emerald-300 font-mono">i / 300</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Muddy RGB Midpoints</strong>
              <p className="text-slate-400">
                Interpolating directly between complementary colors in RGB passes through dull muddy gray. Use HSV hue rotation for vibrant saturated spectrum arcs.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Omission of tracer(0) on 100+ Color Changes</strong>
              <p className="text-slate-400">
                Rapid color changes force hundreds of intermediate repaint events. Always enable double-buffering with <code className="text-emerald-300 font-mono">screen.tracer(0)</code>.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-emerald-400 mb-3">📝 Student Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I understand the difference between RGB and HSV (Hue, Saturation, Value)",
              "I know how to use Python's built-in colorsys.hsv_to_rgb(h, s, v) function",
              "I can map loop index progress (i / total) to continuous hue spectrum transitions",
              "I know how to write a linear color interpolation (Lerp) helper function",
              "I understand why Turtle default colormode(1.0) matches colorsys float outputs",
              "I can create repeating rainbow cycles using modulo floating-point arithmetic (% 1.0)"
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
              👉 <strong>Think about:</strong> Why lowering saturation from 1.0 to 0.4 turns sharp electric neon into soft pastel Japanese watercolor tones!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting <code className="text-sky-300 font-mono">hue = (i * 0.05) % 1.0</code> compresses multiple full rainbow cycles along a single spiral arm!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Use a sine function <code className="text-fuchsia-300 font-mono">hue = 0.5 + 0.3 * math.sin(i * 0.1)</code> to bounce the colors back and forth between glowing cyan and purple!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In GPU shader programming (GLSL / HLSL), fragment shaders evaluate color equations across millions of pixels simultaneously using <strong>normalized UV coordinates <code className="text-purple-300 font-mono">[0.0, 1.0]</code> and trigonometric color ramps</strong>. Learning how normalized parameterization (<code className="text-purple-300 font-mono">i / total</code>) drives HSV color models in Python Turtle directly prepares you for modern 3D shader development and visual effects engineering.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Color Gradients & HSV Spectrum FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Color Gradients Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic5_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we teach color gradients at Coder & AccoTax in Barrackpore and Kolkata, introducing colorsys.hsv_to_rgb() is a pure moment of joy for our students. Instead of struggling with hardcoded RGB values, normalized hue math (i / total) instantly brings spirals and mandalas to life with mesmerizing rainbow spectrums. Encourage students to experiment with saturation and lightness to craft their own distinctive aesthetic styles!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic5;
