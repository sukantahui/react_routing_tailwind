import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";

// Import Python Source Files
import billiardsCode from "./topic5_files/box_boundary_bouncing_billiards.py?raw";
import wrapVsBounceCode from "./topic5_files/screen_wrap_vs_bounce_comparison.py?raw";
import airHockeyCode from "./topic5_files/interactive_air_hockey_arena.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes sparkFlash {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}
`;

const Topic5 = () => {
  const [boundaryMode, setBoundaryMode] = useState("bounce"); // "bounce" vs "wrap"
  const [ball, setBall] = useState({ x: 150, y: 90, vx: 4.5, vy: 3.2 });
  const [bounces, setBounces] = useState(0);

  // Live Billiard / Wrap Simulation Loop
  useEffect(() => {
    let px = 150;
    let py = 90;
    let pvx = 4.5;
    let pvy = 3.2;
    const r = 12;
    const minX = 25;
    const maxX = 295;
    const minY = 25;
    const maxY = 155;

    const interval = setInterval(() => {
      px += pvx;
      py += pvy;

      if (boundaryMode === "bounce") {
        if (px + r >= maxX) {
          px = maxX - r;
          pvx = -pvx;
          setBounces((b) => b + 1);
        } else if (px - r <= minX) {
          px = minX + r;
          pvx = -pvx;
          setBounces((b) => b + 1);
        }

        if (py + r >= maxY) {
          py = maxY - r;
          pvy = -pvy;
          setBounces((b) => b + 1);
        } else if (py - r <= minY) {
          py = minY + r;
          pvy = -pvy;
          setBounces((b) => b + 1);
        }
      } else {
        // Toroidal Wrap Mode
        if (px > maxX + 10) px = minX - 10;
        if (px < minX - 10) px = maxX + 10;
        if (py > maxY + 10) py = minY - 10;
        if (py < minY - 10) py = maxY + 10;
      }

      setBall({ x: px, y: py, vx: pvx, vy: pvy });
    }, 25);

    return () => clearInterval(interval);
  }, [boundaryMode]);

  const prototypes = [
    {
      name: "if x + radius >= max_x:",
      returnType: "Boundary Overlap Check",
      purpose: "Detects collision with right wall taking radial geometry into account.",
      usage: "if x + r >= max_x:\n    x = max_x - r\n    vx = -vx"
    },
    {
      name: "x = max_x - radius",
      returnType: "Position Correction",
      purpose: "Snaps object position back inside boundary, preventing sticky-wall and tunneling bugs.",
      usage: "x = max_x - radius"
    },
    {
      name: "vx = -vx; vy = -vy",
      returnType: "Velocity Vector Reflection",
      purpose: "Reverses perpendicular velocity vector component upon elastic boundary collision.",
      usage: "vx = -vx"
    },
    {
      name: "if x > max_x: x = min_x",
      returnType: "Toroidal Screen Wrap",
      purpose: "Teleports entity seamlessly to opposing edge for Asteroids / Pac-Man wrap mechanics.",
      usage: "if x > max_x: x = min_x"
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
            Module 005_005 · Animation & Motion Logic · Topic 5
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Boundary Detection & Wall Bouncing Logic
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Contain and steer moving entities across virtual worlds. Master <span className="text-cyan-300 font-semibold">4-Wall Box Boundary Collisions</span>, <span className="text-amber-300 font-semibold">Anti-Tunneling Position Snapping</span>, <span className="text-emerald-300 font-semibold">Radius Compensation</span>, and <span className="text-indigo-400 font-semibold">Toroidal Screen Wrapping</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎱 4-Wall Billiards Reflection
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🛡️ Anti-Tunneling Position Snapping
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🚀 Asteroids-Style Toroidal Wrapping
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE BOUNDARY SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎱</span> Interactive Boundary Collision & Wrap Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Switch between Solid Wall Bouncing (Pong/Billiards) and Toroidal Screen Wrapping (Asteroids/Pac-Man).
              </p>
            </div>

            {/* Boundary Mode Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBoundaryMode("bounce")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  boundaryMode === "bounce"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                🎱 Solid Wall Bouncing (Pong)
              </button>

              <button
                onClick={() => setBoundaryMode("wrap")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  boundaryMode === "wrap"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                🚀 Toroidal Screen Wrap (Asteroids)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Canvas SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Boundary Viewport ({boundaryMode.toUpperCase()} MODE)
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Boundary Box */}
                <rect
                  x="20"
                  y="20"
                  width="280"
                  height="140"
                  rx="4"
                  fill="#0f172a"
                  stroke={boundaryMode === "bounce" ? "#38bdf8" : "#334155"}
                  strokeWidth="3"
                  strokeDasharray={boundaryMode === "wrap" ? "6 6" : "none"}
                />

                {/* Billiard Ball */}
                <circle
                  cx={ball.x}
                  cy={ball.y}
                  r="12"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Telemetry HUD */}
                <text x="30" y="38" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                  BOUNCES: {bounces} | POS: ({ball.x.toFixed(0)}, {ball.y.toFixed(0)})
                </text>
              </svg>
            </div>

            {/* View 2: Boundary Mathematics & Logic Breakdown */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Boundary Collision Equations</span>
                <span className="font-mono text-xs text-amber-300">Anti-Tunneling Safe</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Radius Offset Compensation</div>
                  <div className="text-base font-mono font-bold text-sky-400">r = 12 px</div>
                  <div className="text-[10px] text-slate-500">Center-to-surface offset</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Collision Total</div>
                  <div className="text-base font-mono font-bold text-emerald-400">{bounces} Hits</div>
                  <div className="text-[10px] text-slate-500">Zero tunneling confirmed</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # 3-Stage Boundary Collision Blueprint
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{boundaryMode === "bounce"
  ? `# 1. Detect | 2. Snap | 3. Invert
if x + r >= max_x:
    x = max_x - r
    vx = -vx`
  : `# Toroidal Screen Teleport
if x > max_x:
    x = min_x`}
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
            <span>⚙️</span> Boundary Detection & Reflection APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Boundary Rule</th>
                  <th className="py-3 px-4">Axis / Mode</th>
                  <th className="py-3 px-4">Collision Handling Function</th>
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
            {/* File 1: box_boundary_bouncing_billiards.py */}
            <PythonFileLoader
              fileModule={billiardsCode}
              title="box_boundary_bouncing_billiards.py"
              highlightLines={[25, 26, 42, 43, 44, 47, 48, 52, 53]}
            />

            {/* File 2: screen_wrap_vs_bounce_comparison.py */}
            <PythonFileLoader
              fileModule={wrapVsBounceCode}
              title="screen_wrap_vs_bounce_comparison.py"
              highlightLines={[22, 33, 34, 35, 42, 43]}
            />

            {/* File 3: interactive_air_hockey_arena.py */}
            <PythonFileLoader
              fileModule={airHockeyCode}
              title="interactive_air_hockey_arena.py"
              highlightLines={[20, 21, 38, 39, 43, 44, 49, 50]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🏓</span> Barrackpore Pong: Solving Sticky Paddle Walls
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima brought a Pong game to class where the ball frequently got stuck vibrating inside the top wall. Teacher Sukanta Hui guided her to implement <strong>Position Snapping</strong> (<code className="text-cyan-300 font-mono">y = max_y - radius</code>) right before inverting velocity. The sticky-wall bug disappeared completely, and the game ran flawlessly!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🚀</span> Jadavpur Space Rocks: Seamless Wrapping
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu in Jadavpur built an Asteroids space combat arena. Instead of solid walls, he implemented toroidal wrapping: when a spaceship or asteroid flew past the right edge, it immediately re-emerged on the left with identical velocity and angle, creating an infinite feeling cosmic arena!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Boundary Collision Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting Radius Compensation</strong>
              <p className="text-slate-400">
                Checking <code className="text-rose-300 font-mono">if x &gt;= max_x</code> without subtracting the circle's radius causes the ball to sink halfway into the wall before bouncing.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Omitting Position Correction</strong>
              <p className="text-slate-400">
                Only inverting velocity (<code className="text-rose-300 font-mono">vx = -vx</code>) without snapping position leaves the ball inside the boundary on the next frame, causing it to rapidly vibrate back and forth trapped inside the wall.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. High-Speed Tunneling Glitches</strong>
              <p className="text-slate-400">
                When velocity per frame is greater than wall thickness (e.g. <code className="text-amber-300 font-mono">vx = 40</code>), the ball jumps completely through the wall in a single frame without ever triggering collision.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Hardcoding Screen Coordinates</strong>
              <p className="text-slate-400">
                Hardcoding walls to 300px on a resized 1000px window causes balls to bounce off invisible boundaries in mid-air. Always use <code className="text-cyan-300 font-mono">screen.window_width() // 2</code>.
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
              "I check boundary collisions taking the object's radius (`x + radius >= max_x`) into account",
              "I always snap the object position back inside the boundary (`x = max_x - radius`)",
              "I invert normal velocity vectors (`vx = -vx` or `vy = -vy`) on impact",
              "I know how to implement toroidal screen wrapping for seamless wrap-around games",
              "I understand how Continuous Collision Detection (CCD) prevents high-speed tunneling",
              "I can calculate 2D Euclidean distance (`math.hypot(dx, dy)`) for circle-to-circle collisions"
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
              👉 <strong>Think about:</strong> How video games like Breakout, Pong, and Pinball use boundary mathematics to keep playfields active and exciting!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How toggling between Solid Bouncing and Toroidal Wrap instantly converts a contained billiards table into an infinite universe!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add corner bumpers that repel balls with double speed when hitting 45-degree angled corners!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spatial containment is the bedrock of simulation stability. By mastering boundary conditions, position corrections, and normal vector reflections, you gain the engineering precision required to build robust physics simulations, robotic navigation algorithms, and collision engines that never glitch.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Boundary Detection & Bouncing FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Boundary Detection Study Note"
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
            note="When we teach collision mechanics at Coder & AccoTax in Barrackpore and Kolkata, I emphasize: detecting the hit is only half the battle—correcting the position is what makes your physics rock-solid. Always remember the three-step dance: detect, snap, and reflect. Do this, and your game physics will feel crisp, responsive, and arcade-perfect!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic5;
