import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";

// Import Python Source Files
import polygonRotatorCode from "./topic1_files/parameterized_polygon_rotator.py?raw";
import flowerPinwheelCode from "./topic1_files/multi_scale_flower_pinwheel.py?raw";
import transformStudioCode from "./topic1_files/interactive_transform_studio.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

const Topic1 = () => {
  // Interactive Transform State
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [radius, setRadius] = useState(60);
  const [sides, setSides] = useState(6);
  const [rotation, setRotation] = useState(30);
  const [fillColor, setFillColor] = useState("#06b6d4");

  // Calculate polygon vertices for SVG
  const calculatePolygonPoints = (cx, cy, r, n, rotDeg) => {
    const pts = [];
    const rotRad = (rotDeg * Math.PI) / 180;
    const angleStep = (2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
      const angle = rotRad + i * angleStep;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const svgCenterX = 160 + posX * 0.6;
  const svgCenterY = 110 - posY * 0.6;
  const polygonPoints = calculatePolygonPoints(svgCenterX, svgCenterY, radius * 0.8, sides, rotation);

  const prototypes = [
    {
      name: "draw_parameterized_polygon(t, x, y, sides, radius, rotation, fill_color)",
      returnType: "2D Affine Primitive",
      purpose: "Draws regular polygon with customizable vertex count, radius, orientation angle, and fill.",
      usage: "draw_parameterized_polygon(t, 0, 0, sides=6, radius=70, rotation=30)"
    },
    {
      name: "draw_flower(t, x, y, num_petals, petal_radius, rotation, petal_color)",
      returnType: "Radial Array Primitive",
      purpose: "Renders multi-petal floral arrays with concentric center pistil and rotational offset.",
      usage: "draw_flower(t, 100, -50, num_petals=8, petal_radius=50, rotation=45)"
    },
    {
      name: "draw_arrow_compass(t, x, y, scale, rotation, color)",
      returnType: "Vector Needle Primitive",
      purpose: "Generates transformable directional indicators for dashboards, gauges, and compasses.",
      usage: "draw_arrow_compass(t, -150, 20, scale=1.2, rotation=90)"
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
            Module 005_004 · Modular Graphics with Functions · Topic 1
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Parameterized Graphics: Position, Scale, Color & Rotation
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock complete 2D Affine Transformation control. Master <span className="text-cyan-300 font-semibold">Translation (x, y)</span>, <span className="text-emerald-300 font-semibold">Scaling (radius)</span>, <span className="text-amber-300 font-semibold">Rotation (&theta;)</span>, and <span className="text-purple-300 font-semibold">Color Palettes</span> in clean Python functions.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📐 2D Affine Transformations
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🔄 Centroid-Centric Rotation
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎨 Dynamic Palette Binding
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE AFFINE TRANSFORMATION LAB
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎛️</span> Interactive Affine Transformation Laboratory
              </h3>
              <p className="text-xs text-slate-400">
                Experiment with translation, scaling, side count, rotation angle, and color to inspect the underlying Python API call.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Active Side Count:</span>
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs">
                {sides}-Gon ({sides === 3 ? "Triangle" : sides === 4 ? "Square/Diamond" : sides === 5 ? "Pentagon" : sides === 6 ? "Hexagon" : sides === 8 ? "Octagon" : `${sides}-Gon`})
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Vector Canvas with Coordinate Grid */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                2D Cartesian Viewport (Origin [0, 0] Centered)
              </span>
              <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Grid Axes */}
                <line x1="160" y1="10" x2="160" y2="210" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="10" y1="110" x2="310" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                {/* Coordinate Markers */}
                <text x="165" y="25" fill="#64748b" fontSize="9" fontFamily="monospace">+Y</text>
                <text x="295" y="105" fill="#64748b" fontSize="9" fontFamily="monospace">+X</text>
                <text x="165" y="122" fill="#64748b" fontSize="9" fontFamily="monospace">(0,0)</text>

                {/* Circumscribed Guideline Circle */}
                <circle
                  cx={svgCenterX}
                  cy={svgCenterY}
                  r={radius * 0.8}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Center Pivot Anchor Dot */}
                <circle cx={svgCenterX} cy={svgCenterY} r="3" fill="#ffffff" />

                {/* Heading Orientation Vector Pointer */}
                <line
                  x1={svgCenterX}
                  y1={svgCenterY}
                  x2={svgCenterX + (radius * 0.8) * Math.cos((rotation * Math.PI) / 180)}
                  y2={svgCenterY + (radius * 0.8) * Math.sin((rotation * Math.PI) / 180)}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Parameterized Polygon Mesh */}
                <polygon
                  points={polygonPoints}
                  fill={fillColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  fillOpacity="0.85"
                  className="transition-all duration-150"
                />
              </svg>
            </div>

            {/* View 2: Multi-Parameter Sliders & Live Code Output */}
            <div className="space-y-3 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Transformation Parameters</span>
                <span className="font-mono text-xs text-amber-300">θ = {rotation}°</span>
              </div>

              {/* Slider 1: Translation X and Y */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>X Translation:</span>
                    <span className="font-mono text-cyan-300">{posX}</span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={posX}
                    onChange={(e) => setPosX(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Y Translation:</span>
                    <span className="font-mono text-cyan-300">{posY}</span>
                  </div>
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    value={posY}
                    onChange={(e) => setPosY(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Slider 2: Scale (Radius) & Sides */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Scale (radius):</span>
                    <span className="font-mono text-emerald-300">{radius} px</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Sides (n):</span>
                    <span className="font-mono text-emerald-300">{sides}</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={sides}
                    onChange={(e) => setSides(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Slider 3: Rotation */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Rotation (degrees):</span>
                  <span className="font-mono text-amber-300">{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Color Buttons */}
              <div>
                <label className="block text-slate-400 mb-1 text-[11px]">Fill Color (fill_color):</label>
                <div className="flex gap-2">
                  {["#06b6d4", "#10b981", "#f43f5e", "#fbbf24", "#a855f7"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setFillColor(c)}
                      className={`w-6 h-6 rounded-full border transition cursor-pointer ${
                        fillColor === c ? "border-white scale-110 shadow-md" : "border-transparent opacity-70"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Live Code Call */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Generated Python Function Call
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`draw_parameterized_polygon(
    t,
    x=${posX}, y=${posY},
    sides=${sides},
    radius=${radius},
    rotation=${rotation},
    fill_color="${fillColor}"
)`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Parameterized Transform API Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Function Signature</th>
                  <th className="py-3 px-4">Transform Category</th>
                  <th className="py-3 px-4">Mathematical Behavior</th>
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
            {/* File 1: parameterized_polygon_rotator.py */}
            <PythonFileLoader
              fileModule={polygonRotatorCode}
              title="parameterized_polygon_rotator.py"
              highlightLines={[12, 13, 19, 20, 24, 28]}
            />

            {/* File 2: multi_scale_flower_pinwheel.py */}
            <PythonFileLoader
              fileModule={flowerPinwheelCode}
              title="multi_scale_flower_pinwheel.py"
              highlightLines={[12, 20, 25, 29, 36, 40]}
            />

            {/* File 3: interactive_transform_studio.py */}
            <PythonFileLoader
              fileModule={transformStudioCode}
              title="interactive_transform_studio.py"
              highlightLines={[14, 15, 17, 22, 23, 24, 25]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🧭</span> Barrackpore Robotics: The Compass Gauge Challenge
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima was building a telemetry dashboard for a simulated drone. By parameterizing her <code className="text-cyan-300 font-mono">draw_arrow_compass(t, x, y, rotation=heading)</code> function, she mapped live sensor azimuth angles (0° to 360°) directly to the onscreen needle, rendering smooth 60 FPS real-time directional updates.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🌸</span> Ichapur Botanical Art: Generative Parametric Gardens
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita in Ichapur generated a field of 50 unique blooming flowers by wrapping <code className="text-emerald-300 font-mono">draw_flower()</code> in a loop. By feeding randomized scales (0.5 to 1.3), petal counts (6 to 12), and rotation offsets, she created a rich botanical tapestry without duplicating a single line of geometry code.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Parameterization Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting math.radians() in Polar Math</strong>
              <p className="text-slate-400">
                Passing raw degrees (e.g. 45) to <code className="text-rose-300 font-mono">math.cos(45)</code> fails because Python trig functions expect radians. Always write <code className="text-emerald-300 font-mono">math.radians(45)</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Non-Centroid Centric Rotation</strong>
              <p className="text-slate-400">
                Rotating a shape starting from its bottom-left corner causes the shape to orbit around an eccentric pivot rather than spinning symmetrically on its own axis.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Hardcoding Stroke Weights</strong>
              <p className="text-slate-400">
                Setting <code className="text-rose-300 font-mono">t.pensize(2)</code> inside a function without making it a parameter prevents callers from rendering delicate hairline accents or bold outlines.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Global Variable State Leaks</strong>
              <p className="text-slate-400">
                Referencing a global variable <code className="text-rose-300 font-mono">MY_COLOR</code> inside a function rather than accepting it as an argument breaks function portability across other modules.
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
              "I understand how (x, y) translation positions the shape anchor in 2D Cartesian space",
              "I can scale multi-segment geometry proportionally using a single size or scale factor",
              "I know how to set rotational orientation with `t.setheading(rotation)`",
              "I always convert degrees to radians using `math.radians()` for polar calculations",
              "I provide separate parameters for fill color and border stroke color",
              "I assign sensible default values to optional styling parameters"
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
              👉 <strong>Think about:</strong> How 3D rendering engines like Blender and Maya represent 3D models using Translation, Rotation, and Scale (TRS) matrices!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How changing <code className="text-cyan-300 font-mono">sides</code> from 3 to 8 smoothly transitions the geometry from an equilateral triangle to a stop-sign octagon!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Animate a rotating solar system by parameterizing both orbit radius and spin rotation over time!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In professional computer graphics, hardcoded shapes are obsolete. Everything is a parameterized entity. Mastering parameterization is what allows graphics engineers to proceduralize millions of trees in an open-world game, generate custom charts on the fly, and build dynamic UI component libraries.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Parameterized Graphics FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Parameterized Graphics Study Note"
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
            note="When teaching parameterized graphics in Kolkata and Barrackpore, I emphasize that parameters are the steering wheel and throttle of your drawing engine. A function without parameters is a train trapped on a single track. Add (x, y), scale, rotation, and color, and suddenly your function can roam the entire infinite plane of creative graphics!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic1;
