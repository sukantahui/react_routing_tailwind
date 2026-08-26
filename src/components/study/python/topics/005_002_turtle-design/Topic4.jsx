import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";

// Import Python Files
import canvasSetupCode from "./topic4_files/canvas_setup_and_window_customization.py?raw";
import spaceBackdropCode from "./topic4_files/dark_theme_space_backdrop.py?raw";
import geometryInspectorCode from "./topic4_files/screen_dimension_and_scroll_canvas.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes starTwinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
`;

const Topic4 = () => {
  const [selectedTheme, setSelectedTheme] = useState("cosmic");
  const windowWidth = 800;
  const windowHeight = 600;

  const prototypes = [
    {
      name: "screen.setup(width, height, startx, starty)",
      returnType: "None",
      purpose: "Configures physical OS window viewport dimensions and desktop monitor position.",
      usage: "screen.setup(800, 600, startx=100, starty=100)"
    },
    {
      name: "screen.title(titlestring)",
      returnType: "None",
      purpose: "Sets the text caption in the top OS window frame header.",
      usage: "screen.title('AccoTax Graphics Studio')"
    },
    {
      name: "screen.bgcolor(color)",
      returnType: "str / tuple / None",
      purpose: "Sets or queries the background canvas color.",
      usage: "screen.bgcolor('#020617')"
    },
    {
      name: "screen.screensize(canvwidth, canvheight, bg)",
      returnType: "tuple / None",
      purpose: "Sets the scrollable world coordinate canvas dimensions inside the window.",
      usage: "screen.screensize(1600, 1200)"
    }
  ];

  const themes = {
    cosmic: { bg: "#020617", border: "#38bdf8", star: "#fbbf24", label: "Cosmic Dark (Slate 950)" },
    cyberpunk: { bg: "#180828", border: "#f43f5e", star: "#34d399", label: "Cyberpunk Neon (#180828)" },
    blueprint: { bg: "#0c2340", border: "#60a5fa", star: "#93c5fd", label: "Architectural Blueprint" }
  };

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_002 · Turtle Design & Aesthetic Customization · Topic 4
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Canvas Design & <span className="font-mono">Screen()</span> Window Customization
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Frame your vector artwork with professional window styling. Learn how to configure dimensions with <code className="text-sky-300 font-mono">setup()</code>, brand title headers, set cosmic dark themes with <code className="text-sky-300 font-mono">bgcolor()</code>, and master Cartesian coordinate boundaries.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🖼️ setup(width, height)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌌 Procedural Backdrops
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📐 Viewport vs Canvas World
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE CANVAS STUDIO & BOUNDS SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🖥️</span> Interactive Window & Canvas Bounds Studio
              </h3>
              <p className="text-xs text-slate-400">
                Switch canvas themes and explore Cartesian coordinate limits based on active window dimensions.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setSelectedTheme(themeKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer capitalize ${
                    selectedTheme === themeKey
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                &gt;
                  {themeKey}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              {/* Outer Desktop Window Frame */}
              <rect x="20" y="20" width="660" height="200" rx="10" fill={themes[selectedTheme].bg} stroke="#334155" strokeWidth="2" />

              {/* OS Window Title Header */}
              <rect x="20" y="20" width="660" height="30" rx="10" fill="#0f172a" />
              <circle cx="40" cy="35" r="4.5" fill="#f43f5e" />
              <circle cx="55" cy="35" r="4.5" fill="#fbbf24" />
              <circle cx="70" cy="35" r="4.5" fill="#34d399" />
              <text x="350" y="39" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                screen.title("Deep Space Canvas Studio - Coder & AccoTax")
              </text>

              {/* Center Cartesian Coordinate Crosshairs */}
              <line x1="50" y1="135" x2="650" y2="135" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="350" y1="55" x2="350" y2="215" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />

              {/* Origin (0,0) */}
              <circle cx="350" cy="135" r="4" fill={themes[selectedTheme].border} />
              <text x="360" y="130" fill={themes[selectedTheme].border} fontSize="11" fontWeight="bold">Origin (0,0)</text>

              {/* Coordinate Boundary Labels */}
              <text x="50" y="150" fill="#94a3b8" fontSize="10">X: -{windowWidth / 2}</text>
              <text x="610" y="150" fill="#94a3b8" fontSize="10">X: +{windowWidth / 2}</text>
              <text x="355" y="70" fill="#94a3b8" fontSize="10">Y: +{windowHeight / 2}</text>
              <text x="355" y="210" fill="#94a3b8" fontSize="10">Y: -{windowHeight / 2}</text>

              {/* Sample Decorative Vector Art */}
              <circle cx="350" cy="135" r="40" fill="none" stroke={themes[selectedTheme].border} strokeWidth="2" />
              <polygon
                points="350,110 360,125 375,125 363,135 368,150 350,140 332,150 337,135 325,125 340,125"
                fill={themes[selectedTheme].star}
              />
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Canvas Window Method Signatures
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
                    <td className="py-3.5 px-4 font-mono text-sky-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs">{proto.returnType}</td>
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
            <span>💻</span> Professional Python Canvas Setup Code Files
          </h2>

          <div className="space-y-6">
            {/* File 1: canvas_setup_and_window_customization.py */}
            <PythonFileLoader
              fileModule={canvasSetupCode}
              title="canvas_setup_and_window_customization.py"
              highlightLines={[14, 18, 21, 24]}
            />

            {/* File 2: dark_theme_space_backdrop.py */}
            <PythonFileLoader
              fileModule={spaceBackdropCode}
              title="dark_theme_space_backdrop.py"
              highlightLines={[14, 16, 17, 24, 34]}
            />

            {/* File 3: screen_dimension_and_scroll_canvas.py */}
            <PythonFileLoader
              fileModule={geometryInspectorCode}
              title="screen_dimension_and_scroll_canvas.py"
              highlightLines={[15, 18, 19, 29, 30]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Jadavpur Astronomy Lab: Planetary Orbit Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Student Mamata models elliptical planetary orbits. By calling <code className="text-sky-300 font-mono">screen.bgcolor("#030712")</code> and scattering 150 randomized star dots across the background with <code className="text-emerald-300 font-mono">screen.tracer(0)</code>, she creates an immersive cosmic backdrop before launching real-time orbital animations.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-purple-400 text-lg flex items-center gap-2">
              <span>🎮</span> Barrackpore Arcade: Fullscreen Retro Pong Game
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu uses <code className="text-purple-300 font-mono">screen.setup(800, 600)</code> with dynamically computed boundary walls (<code className="text-slate-300 font-mono">hw = screen.window_width() // 2</code>) to ensure paddles and the bouncing ball collide accurately on all student monitor resolutions.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Canvas Setup Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Calling setup() Late in Script</strong>
              <p className="text-slate-400">
                Calling <code className="text-amber-300">setup()</code> after drawing has begun can resize the window and trigger unwanted viewport recalculations. Always call it on line 2!
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Hardcoding Coordinate Bounds</strong>
              <p className="text-slate-400">
                Assuming the screen is always 400px wide leads to clipped shapes. Always calculate bounds dynamically with <code className="text-emerald-300">screen.window_width() // 2</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Passing Non-GIF Images to bgpic()</strong>
              <p className="text-slate-400">
                Standard Turtle only supports <code className="text-rose-300">.gif</code> backdrops. Passing a PNG or JPEG without PIL conversion raises a <code className="text-rose-300">TclError</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Confusing setup() with screensize()</strong>
              <p className="text-slate-400">
                <code className="text-sky-300">setup()</code> controls the outer application window, while <code className="text-amber-300">screensize()</code> controls the inner scrollable canvas.
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
              "I know how to configure window dimensions using screen.setup(width, height)",
              "I can brand my application window title using screen.title('Caption')",
              "I can set custom dark theme canvas backgrounds using screen.bgcolor('#020617')",
              "I understand Cartesian bounds: X spans [-w/2, +w/2], Y spans [-h/2, +h/2]",
              "I can query active viewport dimensions dynamically using window_width() and window_height()",
              "I know that procedural backgrounds should be rendered with tracer(0) for speed"
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
              👉 <strong>Think about:</strong> Why professional video games always display custom window captions and themed backgrounds before rendering the main menu.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting fractional values like <code className="text-sky-300">screen.setup(0.8, 0.8)</code> creates a responsive window that adapts to 1080p, 2K, and 4K displays automatically.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Use <code className="text-amber-300">screen.setworldcoordinates(0, 0, 100, 100)</code> to map the screen into a percentage-based 0-100 coordinate grid!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every GUI framework—from desktop Tkinter and Qt to web HTML Canvas and mobile game engines—begins with <strong>Viewport Configuration & World Space Mapping</strong>. In Turtle, mastering <code className="text-purple-300 font-mono">setup()</code>, <code className="text-purple-300 font-mono">screensize()</code>, and <code className="text-purple-300 font-mono">bgcolor()</code> provides the architectural mental model for responsive 2D coordinate spaces and camera viewports.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Canvas Design & Window Customization FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Canvas Design & Window Setup Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic4_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we teach graphic design and game development at Coder & AccoTax in Barrackpore and Kolkata, the first habit I instill in students is: 'Never settle for default white canvas windows!' A customized window title, tailored resolution (800x600), and sleek dark background immediately transform a student assignment into a polished, professional software showcase."
          />
        </div>

      </div>
    </div>
  );
};

export default Topic4;
