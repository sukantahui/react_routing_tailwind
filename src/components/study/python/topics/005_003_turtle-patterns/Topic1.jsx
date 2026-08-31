import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";

// Import Python Files
import polygonTheoremCode from "./topic1_files/polygon_mathematics_theorem.py?raw";
import circumscribedCode from "./topic1_files/circumscribed_radius_polygons.py?raw";
import angleVisualizerCode from "./topic1_files/interior_vs_exterior_visualizer.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes anglePulse {
  0%, 100% { stroke-width: 2px; }
  50% { stroke-width: 4px; }
}
`;

const Topic1 = () => {
  const [activeSides, setActiveSides] = useState(5);

  const polygonData = {
    3: { name: "Equilateral Triangle", ext: 120, int: 60, sum: 180, color: "#38bdf8" },
    4: { name: "Square", ext: 90, int: 90, sum: 360, color: "#34d399" },
    5: { name: "Regular Pentagon", ext: 72, int: 108, sum: 540, color: "#fbbf24" },
    6: { name: "Regular Hexagon", ext: 60, int: 120, sum: 720, color: "#f43f5e" },
    8: { name: "Regular Octagon", ext: 45, int: 135, sum: 1080, color: "#a78bfa" },
    12: { name: "Regular Dodecagon", ext: 30, int: 150, sum: 1800, color: "#2dd4bf" }
  };

  const prototypes = [
    {
      name: "Exterior Turn: 360.0 / N",
      returnType: "float / deg",
      purpose: "The steering turn angle required at each vertex to close a regular N-sided polygon.",
      usage: "exterior_angle = 360.0 / sides"
    },
    {
      name: "Interior Angle: 180 - (360/N)",
      returnType: "float / deg",
      purpose: "The internal corner angle inside the polygon ((N - 2) * 180 / N).",
      usage: "interior_angle = ((n - 2) * 180) / n"
    },
    {
      name: "Total Interior Sum: (N - 2) * 180",
      returnType: "float / deg",
      purpose: "The sum of all interior angles across all N vertices.",
      usage: "sum_angles = (n - 2) * 180"
    },
    {
      name: "Polar Vertices: R * (cos θ, sin θ)",
      returnType: "Tuple List [(x, y)]",
      purpose: "Calculates centered vertex coordinates along a circumscribed circle of radius R.",
      usage: "x = cx + R * math.cos(angle)"
    }
  ];

  const current = polygonData[activeSides] || polygonData[5];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_003 · Turtle Patterns & Geometric Mathematics · Topic 1
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-emerald-300 to-sky-400 bg-clip-text text-transparent">
            Polygon Mathematics: The <span className="font-mono">360 / N</span> Exterior Angle Rule
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master the mathematical core of vector geometry. Discover why exterior turns sum to 360°, demystify interior vs exterior steering angles, and generate centered polygons with polar trigonometric coordinates.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📐 θ = 360° / N
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🔍 Interior vs Exterior Theorem
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⭕ Circumscribed Polar Vertices
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE ANGLE THEOREM & POLYGON EXPLORER
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>📐</span> Polygon Mathematics Theorem Visualizer
              </h3>
              <p className="text-xs text-slate-400">
                Select a polygon to inspect its mathematical properties, steering angles, and polar layout.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {[3, 4, 5, 6, 8, 12].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSides(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeSides === s
                      ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  N = {s} ({polygonData[s].name.split(" ")[1] || polygonData[s].name})
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* SVG Polygon Representation */}
            <div className="flex justify-center">
              <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                <circle cx="150" cy="120" r="85" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

                {(() => {
                  const pts = [];
                  const r = 85;
                  for (let i = 0; i < activeSides; i++) {
                    const angle = (i * 2 * Math.PI) / activeSides - Math.PI / 2;
                    pts.push(`${150 + r * Math.cos(angle)},${120 + r * Math.sin(angle)}`);
                  }
                  return (
                    <polygon
                      points={pts.join(" ")}
                      fill={`${current.color}22`}
                      stroke={current.color}
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  );
                })()}

                {/* Center dot */}
                <circle cx="150" cy="120" r="4" fill="#ffffff" />
                <text x="150" y="140" fill="#94a3b8" fontSize="10" textAnchor="middle">Center (0,0)</text>
              </svg>
            </div>

            {/* Mathematics Breakdown Card */}
            <div className="space-y-3 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-amber-400 flex items-center justify-between">
                <span>{current.name}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">N = {activeSides}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Exterior Turn (360/N)</div>
                  <div className="text-lg font-mono font-bold text-sky-400">{current.ext}°</div>
                  <div className="text-[10px] text-slate-500">Turtle steering angle</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Interior Angle (180-Ext)</div>
                  <div className="text-lg font-mono font-bold text-emerald-400">{current.int}°</div>
                  <div className="text-[10px] text-slate-500">Internal vertex angle</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Sum of All Interior Angles:</span>
                <span className="font-mono font-bold text-purple-300">({activeSides} - 2) × 180° = {current.sum}°</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Polygon Mathematical Formula Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Mathematical Property</th>
                  <th className="py-3 px-4">Formula</th>
                  <th className="py-3 px-4">Geometric Meaning</th>
                  <th className="py-3 px-4">Python Expression</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-amber-300 font-bold text-xs">{proto.name}</td>
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
            <span>💻</span> Professional Python Polygon Geometry Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: polygon_mathematics_theorem.py */}
            <PythonFileLoader
              fileModule={polygonTheoremCode}
              title="polygon_mathematics_theorem.py"
              highlightLines={[12, 13, 26, 27]}
            />

            {/* File 2: circumscribed_radius_polygons.py */}
            <PythonFileLoader
              fileModule={circumscribedCode}
              title="circumscribed_radius_polygons.py"
              highlightLines={[17, 18, 19, 23, 26]}
            />

            {/* File 3: interior_vs_exterior_visualizer.py */}
            <PythonFileLoader
              fileModule={angleVisualizerCode}
              title="interior_vs_exterior_visualizer.py"
              highlightLines={[16, 27, 28, 32]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-amber-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Jadavpur Geometry Olympiad: The 60° Triangle Trap
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When student Mahima was asked to draw an equilateral triangle, she initially programmed <code className="text-rose-300 font-mono">t.left(60)</code>, producing a hexagon! Teacher Sukanta Hui guided her through the Exterior Turning Theorem: the turtle must turn <code className="text-emerald-300 font-mono">180° - 60° = 120°</code> to close the 3-sided triangle.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🔬</span> Barrackpore Science Center: Polar Hexagonal Honeycomb
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu uses polar trigonometric equations (<code className="text-sky-300 font-mono">x = R * cos(θ)</code>, <code className="text-sky-300 font-mono">y = R * sin(θ)</code>) to calculate hexagon vertex coordinates. This enables him to generate perfectly centered honeycomb solar panels with zero coordinate distortion.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Polygon Mathematics Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Confusing Interior vs Exterior Turns</strong>
              <p className="text-slate-400">
                Turtle turns the *exterior* supplementary angle (<code className="text-emerald-300 font-mono">360/N</code>), NOT the interior angle. Turning the interior angle draws the wrong polygon entirely.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Integer Division Truncation</strong>
              <p className="text-slate-400">
                Using <code className="text-rose-300 font-mono">360 // 7 = 51°</code> drops remainders, leaving a 3° open gap in heptagons. Always use true float division <code className="text-emerald-300 font-mono">360 / 7</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Forgetting Degrees vs Radians in Math</strong>
              <p className="text-slate-400">
                Python's <code className="text-amber-300 font-mono">math.sin()</code> expects radians. Passing raw degrees produces completely scrambled vertex coordinates. Always convert with <code className="text-emerald-300 font-mono">math.radians()</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Assuming (0,0) is Polygon Center</strong>
              <p className="text-slate-400">
                Standard <code className="text-amber-300">forward()/left()</code> polygons anchor at their bottom-left vertex. Use polar coordinates to place the center at (0,0).
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
              "I know the exterior turn angle formula: theta = 360 / N",
              "I understand why interior and exterior angles sum to 180° on a straight line",
              "I can calculate the total interior angle sum: (N - 2) * 180°",
              "I know why true float division (360 / N) is required to close odd polygons",
              "I can calculate centered vertex coordinates using polar math (R * cos θ, R * sin θ)",
              "I understand why math.sin and math.cos require radian angle arguments"
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
              👉 <strong>Think about:</strong> Why hexagonal tiling is the only regular polygon geometry (along with squares and triangles) that can tile a flat plane without gaps.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting <code className="text-sky-300 font-mono">N = 50</code> turns the polygon into a virtually indistinguishable smooth circle!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Pass <code className="text-amber-300 font-mono">angle = (2 * math.pi * i) / N - (math.pi / 2)</code> to orient the apex of any polygon pointing straight upwards!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In 3D computer graphics (OpenGL, Direct3D, WebGL), all complex 3D meshes (characters, sports cars, terrain) are composed entirely of <strong>low-poly triangles and regular polygons</strong>. Understanding the exact trigonometry and angle mathematics governing 2D regular polygons forms the direct foundation for 3D vertex shaders and matrix transformations.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Polygon Mathematics & 360/N Rule FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Polygon Mathematics Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic1_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we teach geometry at Coder & AccoTax in Barrackpore and Kolkata, the 360/N exterior angle rule is the single most important mathematical concept in procedural graphics. Always encourage students to write out the equation 'theta = 360 / N' before typing a single line of code. Once students realize that a single formula controls triangles, octagons, and circles, geometry transforms from abstract textbook math into a vibrant, creative instrument!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic1;
