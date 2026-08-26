import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";

// Import Python Source Files
import gravityCannonCode from "./topic4_files/euler_kinematics_gravity_cannon.py?raw";
import bouncingBallCode from "./topic4_files/damped_bouncing_ball_physics.py?raw";
import physicsSandboxCode from "./topic4_files/interactive_physics_sandbox.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes bouncePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.7)); }
}
`;

const Topic4 = () => {
  const [planet, setPlanet] = useState("earth"); // "moon", "earth", "jupiter"
  const [elasticity, setElasticity] = useState(0.75); // 0.2 to 0.95
  const [ballPos, setBallPos] = useState({ x: 30, y: 30 });
  const [trail, setTrail] = useState([]);

  const planetConfigs = {
    moon: { name: "Moon (g = 1.6 m/s²)", gravity: 0.25, color: "#fef08a", speed: 5.5 },
    earth: { name: "Earth (g = 9.8 m/s²)", gravity: 0.8, color: "#38bdf8", speed: 7.0 },
    jupiter: { name: "Jupiter (g = 24.8 m/s²)", gravity: 2.2, color: "#f43f5e", speed: 8.5 }
  };

  const currentPlanet = planetConfigs[planet] || planetConfigs["earth"];

  // Physics Simulation Loop
  useEffect(() => {
    let px = 30;
    let py = 40;
    let pvx = currentPlanet.speed * 0.7;
    let pvy = currentPlanet.speed * 0.9;
    const g = currentPlanet.gravity;
    const e = elasticity;
    const floor = 145;

    const points = [];

    const interval = setInterval(() => {
      // Euler Step
      pvy += g;
      px += pvx;
      py += pvy;

      // Floor Collision
      if (py >= floor) {
        py = floor;
        pvy = -pvy * e;
        pvx *= 0.98; // Ground friction

        if (Math.abs(pvy) < 0.8) {
          pvy = 0;
        }
      }

      // Reset when off canvas
      if (px >= 295 || (pvx < 0.1 && py >= floor - 1)) {
        px = 30;
        py = 40;
        pvx = currentPlanet.speed * 0.7;
        pvy = currentPlanet.speed * 0.9;
        points.length = 0;
      }

      points.push({ x: px, y: py });
      if (points.length > 40) points.shift();

      setBallPos({ x: px, y: py });
      setTrail([...points]);
    }, 30);

    return () => clearInterval(interval);
  }, [planet, elasticity, currentPlanet.gravity, currentPlanet.speed]);

  const prototypes = [
    {
      name: "vy -= gravity * dt",
      returnType: "Gravitational Integration",
      purpose: "Applies downward vertical gravitational acceleration to velocity on each tick.",
      usage: "vy -= 9.8 * dt"
    },
    {
      name: "x += vx * dt; y += vy * dt",
      returnType: "Forward Euler Step",
      purpose: "Translates object position across discrete delta time intervals based on current velocity.",
      usage: "x += vx * dt\ny += vy * dt"
    },
    {
      name: "vy = -vy * elasticity",
      returnType: "Collision Restitution",
      purpose: "Reverses vertical velocity with coefficient of restitution, simulating kinetic energy loss.",
      usage: "vy = -vy * 0.75"
    },
    {
      name: "vx *= ground_friction",
      returnType: "Rolling Resistance",
      purpose: "Progressively dampens horizontal velocity when in contact with the ground surface.",
      usage: "vx *= 0.98"
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
            Module 005_005 · Animation & Motion Logic · Topic 4
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Simulating 2D Physics: Velocity, Acceleration & Gravity
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bridge pure mathematics and interactive visual motion. Master <span className="text-amber-300 font-semibold">Forward Euler Integration</span>, <span className="text-cyan-300 font-semibold">Parabolic Projectile Trajectories</span>, and <span className="text-emerald-300 font-semibold">Damped Collision Restitution</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌍 Planetary Gravity Engine (Moon / Earth / Jupiter)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚽ Damped Bouncing & Energy Dissipation
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📐 Parabolic Trajectory Projectiles
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE 2D GRAVITY & BOUNCING PHYSICS SANDBOX
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🪐</span> Interactive 2D Gravitational Kinematics Sandbox
              </h3>
              <p className="text-xs text-slate-400">
                Adjust planetary gravity wells and surface elasticity to observe real-time parabolic projectile motion and bounce damping.
              </p>
            </div>

            {/* Planetary Preset Selector */}
            <div className="flex items-center gap-2">
              {["moon", "earth", "jupiter"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlanet(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize cursor-pointer ${
                    planet === p
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Physics Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-amber-400 mb-2">
                Live Physics Viewport ({currentPlanet.name})
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Floor */}
                <line x1="15" y1="155" x2="305" y2="155" stroke="#475569" strokeWidth="2" />
                <rect x="15" y="156" width="290" height="15" fill="#0f172a" />

                {/* Trajectory Trail */}
                {trail.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={Math.max(1, (idx / trail.length) * 3)}
                    fill={currentPlanet.color}
                    opacity={idx / trail.length}
                  />
                ))}

                {/* Cannon / Launcher */}
                <g transform="translate(25, 45)">
                  <line x1="0" y1="0" x2="16" y2="12" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="8" fill="#334155" />
                </g>

                {/* Physics Ball */}
                <circle
                  cx={ballPos.x}
                  cy={ballPos.y}
                  r="10"
                  fill={currentPlanet.color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* HUD Overlay */}
                <text x="25" y="22" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                  G: {currentPlanet.gravity} | Elasticity: {(elasticity * 100).toFixed(0)}%
                </text>
              </svg>

              {/* Elasticity Slider */}
              <div className="w-full max-w-xs mt-3 flex items-center justify-between gap-3 text-xs text-slate-300">
                <span>Elasticity:</span>
                <input
                  type="range"
                  min="0.2"
                  max="0.95"
                  step="0.05"
                  value={elasticity}
                  onChange={(e) => setElasticity(parseFloat(e.target.value))}
                  className="w-36 accent-amber-400 cursor-pointer"
                />
                <span className="font-mono text-amber-300 font-bold">{(elasticity * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* View 2: Kinematic Equations & Telemetry */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-amber-400 flex justify-between items-center">
                <span>Forward Euler Integration Equations</span>
                <span className="font-mono text-xs text-cyan-300">Newtonian Kinematics</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Gravitational Apex</div>
                  <div className="text-base font-mono font-bold text-sky-400">
                    {planet === "moon" ? "High / Floaty Arc" : planet === "earth" ? "Natural Parabola" : "Heavy / Flat Arc"}
                  </div>
                  <div className="text-[10px] text-slate-500">vy = 0 peak point</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Kinetic Restitution</div>
                  <div className="text-base font-mono font-bold text-emerald-400">
                    {(elasticity * 100).toFixed(0)}% Energy Retained
                  </div>
                  <div className="text-[10px] text-slate-500">Damped floor rebound</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # 2D Kinematic Update Step
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`# 1. Accelerate
vy -= gravity * dt
# 2. Integrate Position
x += vx * dt; y += vy * dt
# 3. Collision & Restitution
if y <= floor_y:
    y = floor_y
    vy = -vy * ${elasticity}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> 2D Physics Engine Core Formulations
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Kinematic Formula</th>
                  <th className="py-3 px-4">Physics Law</th>
                  <th className="py-3 px-4">Simulation Mechanics</th>
                  <th className="py-3 px-4">Standard Call</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-amber-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-indigo-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300 text-xs">{proto.usage}</td>
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
            {/* File 1: euler_kinematics_gravity_cannon.py */}
            <PythonFileLoader
              fileModule={gravityCannonCode}
              title="euler_kinematics_gravity_cannon.py"
              highlightLines={[32, 33, 44, 45, 46, 47, 56]}
            />

            {/* File 2: damped_bouncing_ball_physics.py */}
            <PythonFileLoader
              fileModule={bouncingBallCode}
              title="damped_bouncing_ball_physics.py"
              highlightLines={[29, 30, 31, 35, 36, 37, 40, 41]}
            />

            {/* File 3: interactive_physics_sandbox.py */}
            <PythonFileLoader
              fileModule={physicsSandboxCode}
              title="interactive_physics_sandbox.py"
              highlightLines={[22, 23, 24, 34, 35, 36]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-amber-400 text-lg flex items-center gap-2">
              <span>🎯</span> Barrackpore Artillery Duel: Angle & Range
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu built a 2-player artillery cannon duel in Barrackpore. By calculating vector components <code className="text-cyan-300 font-mono">vx = speed * cos(rad)</code> and <code className="text-amber-300 font-mono">vy = speed * sin(rad)</code> with gravity integration, he simulated realistic parabolic ballistic arcs that hit targets over mountains!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🏀</span> Kolkata Basketball Free-Throw Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita in Kolkata programmed a basketball physics engine. By tuning restitution elasticity to 0.78 and adding floor friction, she created a realistic ball that bounces progressively lower after hitting the hoop backboard and swishes into the net!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 2D Physics Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Omitting Position Correction on Floor</strong>
              <p className="text-slate-400">
                Failing to snap <code className="text-rose-300 font-mono">y = floor_y</code> upon collision causes the ball to sink into the floor, trapping it in an infinite bounce loop below the surface.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Infinite Micro-Jitter at Rest</strong>
              <p className="text-slate-400">
                Without an energy threshold cutoff (<code className="text-cyan-300 font-mono">if abs(vy) &lt; 0.8: vy = 0</code>), floating-point rounding causes the ball to vibrate endlessly on the floor.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Inverting Gravity Direction</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">vy += gravity</code> causes the projectile to accelerate upward into the sky instead of falling downward. In Cartesian 2D, gravity must be subtracted.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Elasticity &gt; 1.0 Energy Leak</strong>
              <p className="text-slate-400">
                Setting elasticity to 1.1 creates an impossible super-elastic bounce that gains kinetic energy with every impact, launching the ball into infinity. Keep <code className="text-cyan-300 font-mono">0.0 &lt;= elasticity &lt;= 1.0</code>.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-amber-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-amber-400 mb-3">📝 Student Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I understand Forward Euler Integration (Acceleration -> Velocity -> Position)",
              "I know how to decompose launch speed and angle into `(vx, vy)` vectors",
              "I subtract downward gravitational acceleration (`vy -= g * dt`) on each frame tick",
              "I know how to reverse velocity with restitution elasticity (`vy = -vy * e`) on collision",
              "I always snap coordinates to floor height (`y = floor_y`) to prevent tunneling",
              "I clamp micro-jitter velocities when kinetic energy drops below threshold"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-amber-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HINTS & EXPERT MINDSET
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-amber-900/20 rounded-2xl p-5 border border-amber-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-amber-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How video games like Angry Birds, Worms, and Super Mario use the exact same gravitational Euler equations to simulate jumps and projectile arcs!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How switching between Moon, Earth, and Jupiter presets changes the parabolic flight apex from floaty and lofty to tight and heavy!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add aerodynamic wind resistance by applying <code className="text-cyan-300 font-mono">vx += wind_acc * dt</code> to blow the projectile back!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When Isaac Newton formulated the laws of motion in 1687, he laid the foundation for modern science. By writing these three simple lines of code—updating velocity with acceleration and position with velocity—you bring Newtonian mechanics to life inside your computer, unlocking the physics engine that powers everything from retro platformers to NASA spacecraft trajectories.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="2D Physics & Gravity Simulation FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: 2D Physics & Gravity Study Note"
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
            note="Physics in coding is pure magic! At Coder & AccoTax in Barrackpore and Kolkata, when students first witness their ball launch along a mathematical parabola and bounce realistically across the floor, they realize that physics isn't just dry textbook formulas—it is the living, beating heart of game development and creative software engineering!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic4;
