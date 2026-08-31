import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";

// Import Python Files
import colorSystemsCode from "./topic2_files/color_systems_rgb_hex_named.py?raw";
import rainbowWheelCode from "./topic2_files/hsv_rainbow_wheel.py?raw";
import dualColorCode from "./topic2_files/dual_pencolor_fillcolor.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes colorRotate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
`;

const Topic2 = () => {
  const [selectedColorMode, setSelectedColorMode] = useState("hex");
  const [activeColor, setActiveColor] = useState("#38bdf8");

  const prototypes = [
    {
      name: "screen.colormode(cmode) / turtle.colormode()",
      returnType: "1.0 / 255 / None",
      purpose: "Configures RGB scale mode: 1.0 (float range 0.0-1.0) or 255 (integer range 0-255).",
      usage: "screen.colormode(255)"
    },
    {
      name: "turtle.pencolor(color)",
      returnType: "str / tuple / None",
      purpose: "Sets or queries the line drawing stroke color and cursor outline.",
      usage: "t.pencolor('#38bdf8')"
    },
    {
      name: "turtle.fillcolor(color)",
      returnType: "str / tuple / None",
      purpose: "Sets or queries the interior shape fill color and cursor body.",
      usage: "t.fillcolor('#0369a1')"
    },
    {
      name: "turtle.color(pen, fill=None)",
      returnType: "tuple / None",
      purpose: "Convenience method that sets both pencolor and fillcolor simultaneously.",
      usage: "t.color('coral', 'gold')"
    }
  ];

  const paletteSwatches = [
    { name: "Sky Blue", hex: "#38bdf8", rgbInt: "(56, 189, 248)", rgbFloat: "(0.22, 0.74, 0.97)" },
    { name: "Emerald", hex: "#34d399", rgbInt: "(52, 211, 153)", rgbFloat: "(0.20, 0.83, 0.60)" },
    { name: "Amber Gold", hex: "#fbbf24", rgbInt: "(251, 191, 36)", rgbFloat: "(0.98, 0.75, 0.14)" },
    { name: "Rose Pink", hex: "#f43f5e", rgbInt: "(244, 63, 94)", rgbFloat: "(0.96, 0.25, 0.37)" },
    { name: "Purple", hex: "#a78bfa", rgbInt: "(167, 139, 250)", rgbFloat: "(0.65, 0.55, 0.98)" }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_002 · Turtle Design & Aesthetic Customization · Topic 2
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Color Systems: <span className="font-mono">RGB (0-255 vs 1.0)</span>, Hex & Named Colors
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the full spectrum of digital color. Learn how to toggle 8-bit RGB modes with <code className="text-emerald-300 font-mono">colormode(255)</code>, apply precision hex codes, decouple stroke and fill colors, and generate smooth HSV rainbow gradients.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌈 RGB 0-255 vs 0.0-1.0
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎨 Hex & Named Tokens
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🔄 HSV Rainbow Gradients
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE COLOR PALETTE & SWATCH STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Color System Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Click any swatch to inspect its representation across all four Python Turtle color modes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {["hex", "rgb255", "rgbFloat"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedColorMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedColorMode === mode
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  {mode === "hex" ? "Hex Codes" : mode === "rgb255" ? "colormode(255)" : "colormode(1.0)"}
                </button>
              ))}
            </div>
          </div>

          {/* Palette Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {paletteSwatches.map((swatch) => (
              <button
                key={swatch.hex}
                onClick={() => setActiveColor(swatch.hex)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activeColor === swatch.hex
                    ? "bg-slate-900 border-sky-400 ring-2 ring-sky-400/20"
                    : "bg-gray-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="w-full h-8 rounded-lg mb-2 shadow-inner" style={{ backgroundColor: swatch.hex }} />
                <div className="font-bold text-xs text-slate-200">{swatch.name}</div>
                <div className="font-mono text-[10px] text-slate-400 truncate">
                  {selectedColorMode === "hex"
                    ? swatch.hex
                    : selectedColorMode === "rgb255"
                    ? swatch.rgbInt
                    : swatch.rgbFloat}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              <rect x="10" y="10" width="680" height="140" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Sample Hex Star */}
              <g transform="translate(140, 80)">
                <polygon
                  points="0,-35 10,-10 35,-10 15,5 22,30 0,15 -22,30 -15,5 -35,-10 -10,-10"
                  fill={activeColor}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text x="0" y="50" fill={activeColor} fontSize="11" fontWeight="bold" textAnchor="middle">
                  Active Fill Color
                </text>
              </g>

              {/* Color Mode Code Snippet */}
              <rect x="280" y="30" width="370" height="100" rx="8" fill="#090d16" stroke="#334155" />
              <text x="300" y="60" fill="#38bdf8" fontSize="11" font-family="monospace"># Python Turtle Command:</text>
              <text x="300" y="85" fill="#34d399" fontSize="12" font-family="monospace" fontWeight="bold">
                {selectedColorMode === "hex"
                  ? `t.color("${activeColor}")`
                  : selectedColorMode === "rgb255"
                  ? `screen.colormode(255)\nt.color(${paletteSwatches.find((s) => s.hex === activeColor)?.rgbInt})`
                  : `screen.colormode(1.0)\nt.color(${paletteSwatches.find((s) => s.hex === activeColor)?.rgbFloat})`}
              </text>
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Color System Method Prototypes
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Name</th>
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Functionality</th>
                  <th className="py-3 px-4">Code Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-emerald-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-sky-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300 text-xs">{proto.usage}</td>
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
            <span>💻</span> Professional Python Color Management Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: color_systems_rgb_hex_named.py */}
            <PythonFileLoader
              fileModule={colorSystemsCode}
              title="color_systems_rgb_hex_named.py"
              highlightLines={[19, 27, 33, 40]}
            />

            {/* File 2: hsv_rainbow_wheel.py */}
            <PythonFileLoader
              fileModule={rainbowWheelCode}
              title="hsv_rainbow_wheel.py"
              highlightLines={[14, 21, 23, 27]}
            />

            {/* File 3: dual_pencolor_fillcolor.py */}
            <PythonFileLoader
              fileModule={dualColorCode}
              title="dual_pencolor_fillcolor.py"
              highlightLines={[16, 17, 26]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Jadavpur Tech Lab: Solar Flare Spectrum Wheel
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Student Mamata models astronomical solar flares. By looping through 360 degrees and calculating HSV hue transitions using <code className="text-emerald-300">colorsys.hsv_to_rgb()</code>, she renders an organic rainbow corona with seamless spectral transitions.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🎨</span> Kolkata Design Studio: Corporate Brand Palette
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu builds vector logo assets for a Kolkata startup. Using exact hex strings like <code className="text-sky-300 font-mono">"#38bdf8"</code> and <code className="text-emerald-300 font-mono">"#059669"</code>, he ensures that the Turtle drawing matches the brand's official corporate identity guidelines.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Color System Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Passing (255,0,0) in 1.0 Mode</strong>
              <p className="text-slate-400">
                Default colormode is 1.0. Passing integers without calling <code className="text-amber-300">screen.colormode(255)</code> raises a <code className="text-rose-300">TurtleGraphicsError</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Missing '#' in Hex Codes</strong>
              <p className="text-slate-400">
                Passing <code className="text-rose-300">"38bdf8"</code> instead of <code className="text-emerald-300">"#38bdf8"</code> causes Tkinter to treat it as an invalid color name.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Assuming Alpha Transparency Exists</strong>
              <p className="text-slate-400">
                Standard Tkinter canvas does not support 4-channel RGBA transparent colors; Turtle colors must be opaque.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Leaky Color State Across Functions</strong>
              <p className="text-slate-400">
                Changing pencolor inside a shape function without restoring it recolors all subsequent artwork unexpectedly.
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
              "I know how to enable 0-255 RGB mode using screen.colormode(255)",
              "I can use 6-digit hex color strings like '#38bdf8' for exact palette matching",
              "I know the difference between t.pencolor() (stroke) and t.fillcolor() (interior)",
              "I can set both stroke and fill colors in one line using t.color(pen, fill)",
              "I can convert HSV color angles into RGB rainbow gradients with colorsys",
              "I understand why passing (255, 0, 0) fails without calling colormode(255) first"
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
              👉 <strong>Think about:</strong> Why web design tokens (Hex/RGB) are superior to simple color names like 'blue' or 'green' when crafting modern interfaces.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting dark canvas background <code className="text-sky-300">screen.bgcolor("#020617")</code> makes neon hex strokes glow with high contrast.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Use <code className="text-amber-300">colorsys.hsv_to_rgb(hue, 0.4, 0.95)</code> to produce soft, aesthetic pastel color wheels.
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Color is the most emotionally powerful attribute in computer graphics. Moving beyond hardcoded primary colors into <strong>parametric color spaces (HSV/HSL)</strong> allows you to write algorithmic shaders, procedural landscapes, and generative art that evolve dynamically across thousands of iterations.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Turtle Color Systems FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Turtle Color Systems Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic2_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="During our classes in Barrackpore and Kolkata, the 'bad color sequence' error is the single most common stumbling block when students try using RGB values from Photoshop or Figma. I always teach students to write 'screen.colormode(255)' at line 2 of every creative script! Once colormode(255) is enabled, students can harness the infinite mathematical beauty of colorsys HSV loops."
          />
        </div>

      </div>
    </div>
  );
};

export default Topic2;
