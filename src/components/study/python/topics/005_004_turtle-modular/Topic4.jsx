import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";

// Import Python Source Files
import mountainLandscapeCode from "./topic4_files/layered_mountain_sunset_landscape.py?raw";
import metropolisSkylineCode from "./topic4_files/procedural_metropolis_skyline.py?raw";
import sceneGraphCode from "./topic4_files/interactive_scene_graph_orchestrator.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floatSun {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
`;

const Topic4 = () => {
  const [timeOfDay, setTimeOfDay] = useState("sunset"); // "day", "sunset", "night", "cyberpunk"
  const [showMountains, setShowMountains] = useState(true);
  const [showBuildings, setShowBuildings] = useState(true);
  const [showTrees, setShowTrees] = useState(true);
  const [showRoad, setShowRoad] = useState(true);

  const themeConfig = {
    day: {
      sky: "#38bdf8",
      sun: "#fbbf24",
      mountainFar: "#64748b",
      mountainNear: "#15803d",
      building: "#0284c7",
      buildingWin: "#fef08a",
      road: "#334155",
      tree: "#166534"
    },
    sunset: {
      sky: "#f97316",
      sun: "#f43f5e",
      mountainFar: "#312e81",
      mountainNear: "#064e3b",
      building: "#4f46e5",
      buildingWin: "#fbbf24",
      road: "#1e293b",
      tree: "#14532d"
    },
    night: {
      sky: "#020617",
      sun: "#f8fafc",
      mountainFar: "#090d16",
      mountainNear: "#031a10",
      building: "#0f172a",
      buildingWin: "#fef08a",
      road: "#090d16",
      tree: "#052e16"
    },
    cyberpunk: {
      sky: "#18032b",
      sun: "#f43f5e",
      mountainFar: "#3b0764",
      mountainNear: "#09021e",
      building: "#06b6d4",
      buildingWin: "#ec4899",
      road: "#050505",
      tree: "#8b5cf6"
    }
  };

  const currentTheme = themeConfig[timeOfDay] || themeConfig["sunset"];

  const prototypes = [
    {
      name: "draw_mountain_range(t, points, fill_color)",
      returnType: "Topography Primitive",
      purpose: "Renders multi-vertex mountain ridges and rolling foothills with smooth baseline closure.",
      usage: "draw_mountain_range(t, points, fill_color='#1e1b4b')"
    },
    {
      name: "draw_skyscraper(t, x, y, width, height, body_color, has_spire)",
      returnType: "Urban Architecture",
      purpose: "Renders modern multi-story high-rise tower blocks with rooftop antenna spires and grid window matrices.",
      usage: "draw_skyscraper(t, -120, -150, 75, 240, has_spire=True)"
    },
    {
      name: "draw_road(t, y, height)",
      returnType: "Infrastructure Layer",
      purpose: "Draws asphalt roadway with dashed yellow center dividing lines.",
      usage: "draw_road(t, y=-150, height=90)"
    },
    {
      name: "render_scene_graph(t, time_of_day)",
      returnType: "Scene Orchestrator",
      purpose: "Orchestrates 5-layer Z-index rendering pipeline according to theme configuration.",
      usage: "render_scene_graph(t, time_of_day='sunset')"
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
            Module 005_004 · Modular Graphics with Functions · Topic 4
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Combining Modular Shapes: Townscapes & Nature Scenes
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Assemble multi-layered panoramic landscapes. Master <span className="text-cyan-300 font-semibold">Z-Index Layering (Painter's Algorithm)</span>, <span className="text-emerald-300 font-semibold">Procedural City Skylines</span>, and <span className="text-amber-300 font-semibold">Diurnal Lighting Cycles</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌄 5-Layer Z-Index Pipeline
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🏙️ Procedural Metropolis Skylines
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌅 Day / Sunset / Night Theme Engine
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE SCENE GRAPH COMPOSER & THEME ENGINE
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🏙️</span> Scene Graph Orchestrator & Lighting Engine
              </h3>
              <p className="text-xs text-slate-400">
                Toggle individual Z-index rendering layers and switch diurnal lighting themes to inspect the live composition pipeline.
              </p>
            </div>

            {/* Time of Day Theme Selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {["day", "sunset", "night", "cyberpunk"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setTimeOfDay(theme)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition capitalize cursor-pointer ${
                    timeOfDay === theme
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Scene SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Composite Scene Viewport (Theme: {timeOfDay.toUpperCase()})
              </span>
              <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* 1. Sky Backdrop */}
                <rect x="0" y="0" width="320" height="220" fill={currentTheme.sky} className="transition-colors duration-500" />

                {/* 2. Celestial Body (Sun/Moon) */}
                <circle
                  cx="250"
                  cy="45"
                  r="24"
                  fill={currentTheme.sun}
                  className="animate-[floatSun_4s_ease-in-out_infinite] transition-colors duration-500"
                />

                {/* 3. Mountain Layer */}
                {showMountains && (
                  <>
                    {/* Far Mountains */}
                    <polygon
                      points="0,150 40,75 110,130 180,60 250,120 320,80 320,170 0,170"
                      fill={currentTheme.mountainFar}
                      className="transition-colors duration-500"
                    />
                    {/* Near Foothills */}
                    <polygon
                      points="0,165 70,115 140,150 220,105 320,155 320,180 0,180"
                      fill={currentTheme.mountainNear}
                      className="transition-colors duration-500"
                    />
                  </>
                )}

                {/* 4. Architecture Layer (Buildings) */}
                {showBuildings && (
                  <g className="transition-all duration-300">
                    {/* Skyscraper 1 */}
                    <rect x="25" y="80" width="45" height="95" fill={currentTheme.building} stroke="#334155" strokeWidth="1" />
                    {/* Windows 1 */}
                    <rect x="32" y="90" width="8" height="6" fill={currentTheme.buildingWin} />
                    <rect x="45" y="90" width="8" height="6" fill={currentTheme.buildingWin} />
                    <rect x="32" y="105" width="8" height="6" fill={currentTheme.buildingWin} />
                    <rect x="58" y="105" width="8" height="6" fill={currentTheme.buildingWin} />
                    <rect x="45" y="120" width="8" height="6" fill={currentTheme.buildingWin} />

                    {/* Skyscraper 2 (Tower with Spire) */}
                    <rect x="80" y="55" width="55" height="120" fill={currentTheme.building} stroke="#334155" strokeWidth="1" />
                    <line x1="107" y1="55" x2="107" y2="35" stroke="#ef4444" strokeWidth="1.5" />
                    <circle cx="107" cy="35" r="2.5" fill="#ef4444" />
                    {/* Windows 2 */}
                    <rect x="88" y="65" width="10" height="7" fill={currentTheme.buildingWin} />
                    <rect x="104" y="65" width="10" height="7" fill={currentTheme.buildingWin} />
                    <rect x="120" y="65" width="10" height="7" fill={currentTheme.buildingWin} />
                    <rect x="88" y="80" width="10" height="7" fill={currentTheme.buildingWin} />
                    <rect x="120" y="80" width="10" height="7" fill={currentTheme.buildingWin} />

                    {/* House/Shop */}
                    <rect x="145" y="110" width="50" height="65" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                    <polygon points="170,85 140,110 200,110" fill="#f43f5e" />
                    <rect x="155" y="145" width="12" height="30" fill="#78350f" />
                    <rect x="175" y="125" width="12" height="12" fill="#fef08a" />
                  </g>
                )}

                {/* 5. Pine Trees Props */}
                {showTrees && (
                  <g className="transition-all duration-300">
                    <rect x="210" y="145" width="6" height="20" fill="#451a03" />
                    <polygon points="213,115 198,145 228,145" fill={currentTheme.tree} />
                    <polygon points="213,125 202,152 224,152" fill={currentTheme.tree} />

                    <rect x="235" y="140" width="7" height="25" fill="#451a03" />
                    <polygon points="238,105 220,140 256,140" fill={currentTheme.tree} />
                    <polygon points="238,118 225,148 251,148" fill={currentTheme.tree} />
                  </g>
                )}

                {/* 6. Roadway Infrastructure */}
                {showRoad && (
                  <g className="transition-all duration-300">
                    <rect x="0" y="175" width="320" height="45" fill={currentTheme.road} />
                    <line x1="10" y1="197" x2="50" y2="197" stroke="#fbbf24" strokeWidth="2" strokeDasharray="12 12" />
                    <line x1="80" y1="197" x2="310" y2="197" stroke="#fbbf24" strokeWidth="2" strokeDasharray="12 12" />
                  </g>
                )}
              </svg>
            </div>

            {/* View 2: Layer Toggles & Pipeline Code */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Z-Index Layer Pipeline Controls</span>
                <span className="font-mono text-xs text-amber-300">5-Stage Pipeline</span>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { label: "Layer 1: Mountains", checked: showMountains, setter: setShowMountains },
                  { label: "Layer 2: Architecture", checked: showBuildings, setter: setShowBuildings },
                  { label: "Layer 3: Nature/Trees", checked: showTrees, setter: setShowTrees },
                  { label: "Layer 4: Roadway", checked: showRoad, setter: setShowRoad }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800 cursor-pointer text-slate-300 hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="rounded text-cyan-500 focus:ring-0"
                    />
                    <span className="text-[11px]">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Code Snippet */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Layered Orchestrator Invocation
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`# Render Complete Townscape
render_scene_graph(
    t,
    time_of_day="${timeOfDay}"
)`}
                </pre>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                💡 <strong>Painter's Algorithm:</strong> Background elements (Sky, Mountains) must always be rendered before Midground (Buildings) and Foreground (Roads, Trees) to ensure proper optical occlusion without clipping artifacts.
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Scene Graph Pipeline API Standard
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Pipeline Function</th>
                  <th className="py-3 px-4">Z-Index Tier</th>
                  <th className="py-3 px-4">Occlusion Role</th>
                  <th className="py-3 px-4">Sample Call</th>
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
            {/* File 1: layered_mountain_sunset_landscape.py */}
            <PythonFileLoader
              fileModule={mountainLandscapeCode}
              title="layered_mountain_sunset_landscape.py"
              highlightLines={[12, 17, 26, 56, 59, 63, 67, 74]}
            />

            {/* File 2: procedural_metropolis_skyline.py */}
            <PythonFileLoader
              fileModule={metropolisSkylineCode}
              title="procedural_metropolis_skyline.py"
              highlightLines={[12, 20, 29, 39, 49, 78, 83, 87]}
            />

            {/* File 3: interactive_scene_graph_orchestrator.py */}
            <PythonFileLoader
              fileModule={sceneGraphCode}
              title="interactive_scene_graph_orchestrator.py"
              highlightLines={[14, 15, 16, 21, 26, 33, 40, 47]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🌆</span> Barrackpore Skyline Competition
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu entered a procedural city generation challenge. By structuring his code into an ordered scene graph—rendering the starry night sky first, then dark background high-rises, followed by illuminated foreground towers and a dashed roadway—he generated 100 completely unique city skylines at the touch of a key, winning 1st prize!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🏞️</span> Kolkata Landscape Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata built a dynamic weather landscape in Kolkata. By binding her scene graph to a time-of-day configuration dictionary, she smoothly transitioned her mountain lake scene from vibrant golden sunrise to misty dusk with atmospheric mountain color fading.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Scene Graph Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Inverting Z-Index Layer Order</strong>
              <p className="text-slate-400">
                Drawing houses before mountains causes the mountain base polygon to draw right over the rooftops, completely burying the houses.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Non-Seeded Randomness in Animations</strong>
              <p className="text-slate-400">
                Calling <code className="text-rose-300 font-mono">random.randint()</code> without <code className="text-cyan-300 font-mono">random.seed()</code> inside an animation loop causes buildings to flicker and change heights randomly on every frame.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Hardcoding Canvas Boundaries</strong>
              <p className="text-slate-400">
                Hardcoding mountain widths to 400px when the screen is resized to 1000px leaves jarring blank white gaps on the canvas edges. Always scale terrain to screen width.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Overlapping Coordinate Collisions</strong>
              <p className="text-slate-400">
                Randomizing building positions without spacing offsets causes skyscrapers to generate directly on top of each other, creating messy z-fighting visual artifacts.
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
              "I understand the Painter's Algorithm and the 5-layer Z-index pipeline",
              "I render background elements (sky, mountains) before midground and foreground",
              "I use deterministic seeds (`random.seed()`) for repeatable procedural cityscapes",
              "I know how to implement theme dictionaries for Day/Sunset/Night lighting transitions",
              "I can generate procedural window grids across skyscrapers using nested coordinate loops",
              "I always use `screen.tracer(0)` and `screen.update()` for sub-second scene rendering"
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
              👉 <strong>Think about:</strong> How 2D game classics like Super Mario and Hollow Knight build immersive game worlds through layered parallax scrolling!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How switching between Day, Sunset, Night, and Cyberpunk themes instantly transforms the entire emotional mood of the scene!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add a shimmering river reflection layer beneath the mountains by rendering inverted dark shapes!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In computer graphics, a masterpiece is not a single drawing—it is an orchestrated hierarchy of smaller components cooperating across space, depth, and time. Structuring your code into clean scene graphs gives you the power to generate infinite, living virtual worlds from pure mathematical logic.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Scene Graph Composition FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Scene Graph Composition Study Note"
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
            note="Combining modular shapes into panoramic townscapes and mountain sunset scenes is one of the most rewarding milestones in our curriculum at Coder & AccoTax in Barrackpore and Kolkata. When students watch their individual houses, mountains, trees, and roads assemble into a living, breathing landscape, they realize that any visual world can be built through clean, disciplined functional composition!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic4;
