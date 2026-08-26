import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";

// Import Python Source Files
import iconLibraryCode from "./topic3_files/custom_shapes_icon_library.py?raw";
import dashboardDemoCode from "./topic3_files/library_client_dashboard_demo.py?raw";
import badgeSystemCode from "./topic3_files/themeable_badge_system.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spinGear {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

const Topic3 = () => {
  const [activeTab, setActiveTab] = useState("gallery"); // "gallery" vs "dashboard"
  const [selectedIcon, setSelectedIcon] = useState("gear"); // gear, shield, heart, cloud, sun

  const prototypes = [
    {
      name: "draw_gear(t, x, y, radius, teeth, fill_color)",
      returnType: "Library Primitive",
      purpose: "Renders mechanical cog/gear icon with center bore hole using radial vertex alternation.",
      usage: "draw_gear(t, -100, 0, radius=40, teeth=8)"
    },
    {
      name: "draw_shield(t, x, y, width, height, fill_color)",
      returnType: "Library Primitive",
      purpose: "Renders cybersecurity verification shield badge anchored at top-center (x, y).",
      usage: "draw_shield(t, 0, 50, width=60, height=80)"
    },
    {
      name: "draw_heart(t, x, y, size, fill_color)",
      returnType: "Library Primitive",
      purpose: "Renders cardiovascular heart icon combining 50° tangent vectors and twin 200° arcs.",
      usage: "draw_heart(t, 100, -20, size=45)"
    },
    {
      name: "draw_pill_badge(t, x, y, text, status)",
      returnType: "Themeable Component",
      purpose: "Renders rounded pill status badge with status-aware color themes (success, danger, info).",
      usage: "draw_pill_badge(t, 0, 0, 'Verified', status='success')"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_004 · Modular Graphics with Functions · Topic 3
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Building an Extensible Shape & Icon Library
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Package vector primitives into a production-grade Python module. Build reusable <span className="text-cyan-300 font-semibold">Gears</span>, <span className="text-emerald-300 font-semibold">Shields</span>, <span className="text-rose-300 font-semibold">Hearts</span>, and themeable <span className="text-amber-300 font-semibold">UI Badges</span> for client dashboards.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📦 Standalone Module Architecture
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🛡️ Standardized Vector UI Icons
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📊 Live Telemetry Client App
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE VECTOR ICON STUDIO & CLIENT DASHBOARD
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Icon Library Studio & Dashboard Client
              </h3>
              <p className="text-xs text-slate-400">
                Switch between the Library Sprite Gallery and the assembled Live Telemetry Dashboard client.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === "gallery"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                📦 Shape Library Gallery
              </button>

              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                📊 Telemetry Dashboard Client
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: SVG Vector Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                {activeTab === "gallery" ? "Library Icon Showcase View" : "Client Dashboard Telemetry View"}
              </span>

              {activeTab === "gallery" ? (
                /* Gallery View: Display 5 Vector Icons */
                <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                  {/* Icon 1: Gear */}
                  <g transform="translate(35, 45)">
                    <circle cx="25" cy="25" r="22" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="25" cy="25" r="7" fill="#020617" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="25" y="60" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">draw_gear</text>
                  </g>

                  {/* Icon 2: Shield */}
                  <g transform="translate(135, 30)">
                    <polygon points="25,5 50,5 50,30 25,50 0,30 0,5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                    <path d="M 18,25 L 23,32 L 34,18" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <text x="25" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">draw_shield</text>
                  </g>

                  {/* Icon 3: Heart */}
                  <g transform="translate(235, 35)">
                    <path d="M 25,42 L 5,20 A 10,10 0 0,1 25,8 A 10,10 0 0,1 45,20 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                    <text x="25" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">draw_heart</text>
                  </g>

                  {/* Icon 4: Cloud */}
                  <g transform="translate(75, 125)">
                    <path d="M 10,35 L 50,35 A 12,12 0 0,0 50,15 A 16,16 0 0,0 22,12 A 12,12 0 0,0 10,35 Z" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                    <text x="30" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">draw_cloud</text>
                  </g>

                  {/* Icon 5: Sun */}
                  <g transform="translate(195, 125)">
                    <circle cx="30" cy="25" r="14" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
                      const rad = (ang * Math.PI) / 180;
                      return (
                        <line
                          key={ang}
                          x1={30 + 17 * Math.cos(rad)}
                          y1={25 + 17 * Math.sin(rad)}
                          x2={30 + 24 * Math.cos(rad)}
                          y2={25 + 24 * Math.sin(rad)}
                          stroke="#fbbf24"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      );
                    })}
                    <text x="30" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">draw_sun</text>
                  </g>
                </svg>
              ) : (
                /* Dashboard Client View: Telemetry Cards */
                <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg p-2">
                  {/* Card 1: Shield / Security */}
                  <g transform="translate(10, 15)">
                    <rect x="0" y="0" width="140" height="75" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <polygon points="20,15 35,15 35,30 20,40 5,30 5,15" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                    <text x="45" y="24" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">SYSTEM HEALTH</text>
                    <text x="45" y="45" fill="#34d399" fontSize="13" fontWeight="bold" fontFamily="monospace">99.98%</text>
                  </g>

                  {/* Card 2: Gear / CPU */}
                  <g transform="translate(165, 15)">
                    <rect x="0" y="0" width="140" height="75" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="20" cy="27" r="14" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="20" cy="27" r="5" fill="#0f172a" />
                    <text x="45" y="24" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">CPU LOAD</text>
                    <text x="45" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">42.5%</text>
                  </g>

                  {/* Card 3: Cloud / Storage */}
                  <g transform="translate(10, 105)">
                    <rect x="0" y="0" width="140" height="75" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <path d="M 10,35 L 32,35 A 7,7 0 0,0 32,23 A 10,10 0 0,0 16,20 A 7,7 0 0,0 10,35 Z" fill="#06b6d4" stroke="#ffffff" strokeWidth="1" />
                    <text x="45" y="24" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">STORAGE</text>
                    <text x="45" y="45" fill="#06b6d4" fontSize="13" fontWeight="bold" fontFamily="monospace">1.24 TB</text>
                  </g>

                  {/* Card 4: Heart / Health */}
                  <g transform="translate(165, 105)">
                    <rect x="0" y="0" width="140" height="75" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <path d="M 20,38 L 8,24 A 6,6 0 0,1 20,17 A 6,6 0 0,1 32,24 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                    <text x="45" y="24" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">UPTIME SCORE</text>
                    <text x="45" y="45" fill="#fb7185" fontSize="13" fontWeight="bold" fontFamily="monospace">4.9 / 5.0</text>
                  </g>
                </svg>
              )}
            </div>

            {/* View 2: Library Documentation & Python Import Code */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Library API Specification</span>
                <span className="font-mono text-xs text-emerald-300">from shapes import *</span>
              </div>

              {/* Selector for Icon Details */}
              <div className="space-y-2">
                <label className="block text-slate-400 text-[11px]">Inspect Library Primitive:</label>
                <div className="flex gap-2 flex-wrap">
                  {["gear", "shield", "heart", "cloud", "sun"].map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`px-3 py-1 rounded-md capitalize text-xs font-mono transition cursor-pointer ${
                        selectedIcon === icon
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Clean Import & Usage Pattern
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`from custom_shapes_icon_library import draw_${selectedIcon}

# Draw modular vector icon in client app:
draw_${selectedIcon}(t, x=0, y=0)`}
                </pre>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                💡 <strong>Architectural Tip:</strong> Library modules never invoke <code className="text-amber-300 font-mono">turtle.done()</code> or <code className="text-amber-300 font-mono">screen.setup()</code> at the top level. They define clean mathematical drawing functions and protect demo code under <code className="text-cyan-300 font-mono">{"if __name__ == '__main__':"}</code>.
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Shape Library API Standard
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Library Function</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Geometric Anchor & Math</th>
                  <th className="py-3 px-4">Standard Call</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-indigo-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300 text-xs">{proto.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            PYTHON CODE IMPLEMENTATION SCRIPTS
        ========================================================================= */}
        <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>💻</span> Professional Python Implementation Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: custom_shapes_icon_library.py */}
            <PythonFileLoader
              fileModule={iconLibraryCode}
              title="custom_shapes_icon_library.py"
              highlightLines={[18, 19, 39, 40, 52, 53, 65, 75, 95]}
            />

            {/* File 2: library_client_dashboard_demo.py */}
            <PythonFileLoader
              fileModule={dashboardDemoCode}
              title="library_client_dashboard_demo.py"
              highlightLines={[11, 14, 25, 27, 29, 31, 51, 52, 53, 54]}
            />

            {/* File 3: themeable_badge_system.py */}
            <PythonFileLoader
              fileModule={badgeSystemCode}
              title="themeable_badge_system.py"
              highlightLines={[12, 19, 20, 21, 22, 33, 35, 49, 50, 51]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>📊</span> Kolkata Fintech Dashboard
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima in Kolkata was tasked with building a real-time server health monitor. Instead of rewriting shapes inside each card widget, she built a standalone <code className="text-cyan-300 font-mono">custom_shapes_icon_library.py</code>. By importing <code className="text-emerald-300 font-mono">draw_shield</code> and <code className="text-sky-300 font-mono">draw_gear</code>, she assembled a 4-card enterprise dashboard in under 30 minutes!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-purple-400 text-lg flex items-center gap-2">
              <span>🎮</span> Barrackpore Game UI: HUD Badges
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita developed an RPG game heads-up display (HUD). Using the themeable badge system with <code className="text-purple-300 font-mono">draw_pill_badge()</code> and <code className="text-rose-300 font-mono">draw_heart()</code>, she dynamically updated player health, armor levels, and inventory alerts with seamless color-coded state transitions.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Library Design Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Omitting `__name__ == '__main__'`</strong>
              <p className="text-slate-400">
                Placing test drawings at the root level of a library module causes an empty turtle window to pop up every time a consumer imports the file.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Inconsistent Anchor Conventions</strong>
              <p className="text-slate-400">
                If <code className="text-cyan-300 font-mono">draw_gear</code> anchors at center while <code className="text-rose-300 font-mono">draw_shield</code> anchors at bottom-left without clear documentation, client layouts will misalign horribly.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Calling turtle.done() in Libraries</strong>
              <p className="text-slate-400">
                Calling <code className="text-rose-300 font-mono">turtle.done()</code> inside a helper blocks the caller from rendering subsequent elements. Keep <code className="text-emerald-300 font-mono">turtle.done()</code> exclusively in the client entry point.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Hardcoding Colors Inside Primitives</strong>
              <p className="text-slate-400">
                Failing to accept <code className="text-cyan-300 font-mono">fill_color</code> and <code className="text-cyan-300 font-mono">border_color</code> parameters prevents consumers from adapting icons to custom light or dark themes.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-cyan-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">📝 Student Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I know how to structure a reusable Python graphics library module (`shapes.py`)",
              "I protect interactive demonstration code using `if __name__ == '__main__':`",
              "I maintain consistent parameter signatures across all library icon functions",
              "I understand how theme dictionaries map UI statuses (success/warning/danger) to palettes",
              "I can construct gears, shields, hearts, and clouds using mathematical vector primitives",
              "I keep `turtle.done()` and `screen.setup()` strictly in client application files"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HINTS & EXPERT MINDSET
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-cyan-900/20 rounded-2xl p-5 border border-cyan-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-cyan-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How open-source icon libraries like FontAwesome, Lucide, and Material Icons distribute thousands of standardized vector icons across the web!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How the telemetry dashboard seamlessly incorporates gears, shields, clouds, and hearts into unified metric cards!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add a new <code className="text-amber-300 font-mono">draw_battery(t, x, y, percentage)</code> icon function to your library and render it on a dashboard card!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Great software engineers do not write one-off code; they create tools, packages, and libraries that empower other developers. Building an extensible vector icon library teaches you API design, interface stability, documentation standards, and the software engineering principles that power modern open-source ecosystems.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Custom Shape & Icon Library FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Shape Library Design Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic3_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="Packaging your drawing functions into an importable module like `custom_shapes_icon_library.py` is the transition from student scriptwriter to software library author. When our students in Kolkata and Barrackpore import their own custom libraries into their game and dashboard projects, they experience firsthand the joy of clean, professional modular architecture!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic3;
