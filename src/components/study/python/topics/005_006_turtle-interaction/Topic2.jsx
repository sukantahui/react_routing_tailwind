import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";

// Import Python Source Files
import bindingCompareCode from "./topic2_files/onkey_vs_onkeypress_comparison.py?raw";
import multiKeyFlightCode from "./topic2_files/continuous_multikey_arcade_movement.py?raw";
import keysymInspectorCode from "./topic2_files/interactive_keysym_inspector.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseKey {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.6)); }
}
`;

const Topic2 = () => {
  const [activeKeys, setActiveKeys] = useState({ Up: false, Down: false, Left: false, Right: false, space: false });
  const [ship, setShip] = useState({ x: 160, y: 90 });
  const [bullets, setBullets] = useState([]);

  // Smooth continuous movement loop based on active key state dictionary
  useEffect(() => {
    const interval = setInterval(() => {
      setShip((s) => {
        let dx = 0;
        let dy = 0;
        const speed = 4.5;

        if (activeKeys.Up) dy -= speed;
        if (activeKeys.Down) dy += speed;
        if (activeKeys.Left) dx -= speed;
        if (activeKeys.Right) dx += speed;

        // Diagonal normalization
        if (dx !== 0 && dy !== 0) {
          dx *= 0.7071;
          dy *= 0.7071;
        }

        return {
          x: Math.max(25, Math.min(295, s.x + dx)),
          y: Math.max(25, Math.min(155, s.y + dy))
        };
      });

      // Update bullets
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 8 }))
          .filter((b) => b.y > 15)
      );
    }, 25);

    return () => clearInterval(interval);
  }, [activeKeys]);

  const toggleKey = (keyName) => {
    setActiveKeys((prev) => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  const handleFire = () => {
    setBullets((prev) => [...prev, { x: ship.x, y: ship.y - 12 }]);
  };

  const prototypes = [
    {
      name: "screen.onkeypress(fun, key)",
      returnType: "Key Down Listener",
      purpose: "Binds callback `fun` to physical key depression event (e.g. `keys['Up'] = True`).",
      usage: "screen.onkeypress(lambda: set_k('Up', True), 'Up')"
    },
    {
      name: "screen.onkeyrelease(fun, key)",
      returnType: "Key Up Listener",
      purpose: "Binds callback `fun` to physical key release event (e.g. `keys['Up'] = False`).",
      usage: "screen.onkeyrelease(lambda: set_k('Up', False), 'Up')"
    },
    {
      name: "Key State Dictionary Pattern",
      returnType: "Continuous Input Architecture",
      purpose: "Tracks boolean state of all active keys, enabling fluid 8-directional diagonal movement.",
      usage: "if keys['Up'] and keys['Right']:\n    move_diagonal()"
    },
    {
      name: "Keysym String Standard",
      returnType: "Input Identifiers",
      purpose: "Exact case-sensitive Tkinter keysym names: 'space', 'Return', 'Escape', 'Up', 'Down'.",
      usage: "screen.onkeypress(fire, 'space')"
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
            Module 005_006 · Event Handling & Interaction · Topic 2
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Keyboard Input Binding: onkey() & onkeypress()
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate OS typing delay stutter. Master <span className="text-cyan-300 font-semibold">Continuous Multi-Key State Dictionaries</span>, <span className="text-emerald-300 font-semibold">8-Directional Diagonal Flight</span>, <span className="text-amber-300 font-semibold">onkeypress / onkeyrelease pairs</span>, and <span className="text-purple-400 font-semibold">Exact Keysym Mapping</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎮 Continuous 60 FPS Key State Dict
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🕹️ 8-Directional Diagonal Flight
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⌨️ Exact Keysym Syntax ('space', 'Return', 'Escape')
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE MULTI-KEY FLIGHT SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🕹️</span> Interactive Multi-Key State & Flight Lab
              </h3>
              <p className="text-xs text-slate-400">
                Toggle multiple direction keys simultaneously to observe fluid diagonal flight, or press Space to fire lasers.
              </p>
            </div>

            <button
              onClick={handleFire}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition cursor-pointer flex items-center gap-2"
            >
              <span>🔥</span> Fire Weapon (space)
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Flight Canvas SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Flight Arena Viewport (Multi-Key Kinematics)
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg border border-slate-800">
                {/* Arena Grid */}
                <line x1="20" y1="90" x2="300" y2="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="160" y1="20" x2="160" y2="160" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                {/* Bullets */}
                {bullets.map((b, i) => (
                  <line key={i} x1={b.x} y1={b.y} x2={b.x} y2={b.y - 8} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                ))}

                {/* Player Starfighter */}
                <g transform={`translate(${ship.x}, ${ship.y})`}>
                  <polygon points="0,-14 -12,10 12,10" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3" fill="#020617" />
                  {/* Thruster Flames */}
                  {(activeKeys.Up || activeKeys.Down || activeKeys.Left || activeKeys.Right) && (
                    <polygon points="-4,10 0,16 4,10" fill="#fbbf24" opacity="0.8" />
                  )}
                </g>

                {/* Coordinates HUD */}
                <text x="25" y="25" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
                  POS: ({ship.x.toFixed(0)}, {ship.y.toFixed(0)}) | BULLETS: {bullets.length}
                </text>
              </svg>

              {/* Directional Pad Key Toggles */}
              <div className="flex flex-col items-center gap-1.5 mt-4">
                <button
                  onClick={() => toggleKey("Up")}
                  className={`w-12 h-9 rounded-lg text-xs font-bold font-mono transition cursor-pointer border ${
                    activeKeys.Up ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md" : "bg-gray-800 text-slate-300 border-slate-700"
                  }`}
                >
                  ▲ Up
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleKey("Left")}
                    className={`w-14 h-9 rounded-lg text-xs font-bold font-mono transition cursor-pointer border ${
                      activeKeys.Left ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md" : "bg-gray-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    ◀ Left
                  </button>
                  <button
                    onClick={() => toggleKey("Down")}
                    className={`w-12 h-9 rounded-lg text-xs font-bold font-mono transition cursor-pointer border ${
                      activeKeys.Down ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md" : "bg-gray-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    ▼ Down
                  </button>
                  <button
                    onClick={() => toggleKey("Right")}
                    className={`w-14 h-9 rounded-lg text-xs font-bold font-mono transition cursor-pointer border ${
                      activeKeys.Right ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md" : "bg-gray-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    Right ▶
                  </button>
                </div>
              </div>
            </div>

            {/* View 2: Key State Dictionary Inspector & Code */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Key State Dictionary Inspector</span>
                <span className="font-mono text-xs text-emerald-300">Continuous 60 FPS</span>
              </div>

              {/* State Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {Object.entries(activeKeys).map(([k, val]) => (
                  <div key={k} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-mono text-slate-400 font-bold">keys["{k}"]</span>
                    <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded ${
                      val ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-slate-800 text-slate-500"
                    }`}>
                      {String(val).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Press / Release Binding Architecture
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`# 1. Bind Press / Release Pairs
screen.onkeypress(lambda: set_k("Up", True), "Up")
screen.onkeyrelease(lambda: set_k("Up", False), "Up")

# 2. In 60 FPS ontimer loop:
if keys["Up"]:    ship_y += speed
if keys["Right"]: ship_x += speed`}
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
            <span>⚙️</span> Keyboard Event Binding Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method / Concept</th>
                  <th className="py-3 px-4">Event Trigger</th>
                  <th className="py-3 px-4">Input Handling Role</th>
                  <th className="py-3 px-4">Standard Syntax</th>
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
            {/* File 1: onkey_vs_onkeypress_comparison.py */}
            <PythonFileLoader
              fileModule={bindingCompareCode}
              title="onkey_vs_onkeypress_comparison.py"
              highlightLines={[23, 26, 27, 36, 37, 56, 57, 58, 59, 74]}
            />

            {/* File 2: continuous_multikey_arcade_movement.py */}
            <PythonFileLoader
              fileModule={multiKeyFlightCode}
              title="continuous_multikey_arcade_movement.py"
              highlightLines={[21, 25, 26, 35, 36, 43, 56]}
            />

            {/* File 3: interactive_keysym_inspector.py */}
            <PythonFileLoader
              fileModule={keysymInspectorCode}
              title="interactive_keysym_inspector.py"
              highlightLines={[18, 20, 39, 40, 44]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🚀</span> Barrackpore Space Shooter: Diagonal Flight
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu built a space combat game in Barrackpore. When he used basic <code className="text-rose-300 font-mono">onkeypress(move)</code>, holding Up and Right only moved the ship in one direction with severe stutter. Teacher Sukanta Hui guided him to build a <strong>Key State Dictionary</strong> with press/release pairs. His ship flew diagonally with butter-smooth 60 FPS agility!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>⌨️</span> Kolkata Keysym Debugging
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata in Kolkata spent an afternoon wondering why <code className="text-rose-300 font-mono">onkeypress(fire, 'Space')</code> was ignored. By checking the exact Keysym specification, she changed it to lowercase <code className="text-emerald-300 font-mono">'space'</code> and <code className="text-cyan-300 font-mono">'Return'</code> for Enter. Her game controls reacted instantly!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Keyboard Binding Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Capitalizing 'Space' or 'escape'</strong>
              <p className="text-slate-400">
                Tkinter keysyms are strictly case-sensitive: Space must be <code className="text-cyan-300 font-mono">'space'</code> (lowercase), while Escape must be <code className="text-cyan-300 font-mono">'Escape'</code> and Enter is <code className="text-cyan-300 font-mono">'Return'</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Moving Directly Inside onkeypress</strong>
              <p className="text-slate-400">
                Direct movement commands inside keypress callbacks suffer from the operating system's 500ms keyboard repeat delay, creating stuttering jerky controls.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Binding Only Lowercase WASD</strong>
              <p className="text-slate-400">
                Binding only <code className="text-rose-300 font-mono">'w'</code> stops working whenever Caps Lock is turned on. Always bind both <code className="text-cyan-300 font-mono">'w'</code> and <code className="text-cyan-300 font-mono">'W'</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Un-normalized Diagonal Speed</strong>
              <p className="text-slate-400">
                Moving both <code className="text-amber-300 font-mono">dx</code> and <code className="text-amber-300 font-mono">dy</code> at full speed makes diagonal movement 41% faster than orthogonal flight. Multiply diagonals by <code className="text-cyan-300 font-mono">0.7071</code>.
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
              "I know the difference between discrete key taps and continuous key state tracking",
              "I use `onkeypress` to set key state to `True` and `onkeyrelease` to set it to `False`",
              "I know the exact keysym names: `'space'`, `'Return'`, `'Escape'`, `'Up'`, `'Down'`",
              "I bind both uppercase and lowercase keys (`'w'` and `'W'`) for Caps Lock safety",
              "I normalize diagonal movement speeds by multiplying by `0.7071` (`1 / sqrt(2)`)",
              "I update entity positions inside a 16 ms 60 FPS `ontimer` physics loop"
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
              👉 <strong>Think about:</strong> How commercial games like Fortnite, Valorant, and Rocket League poll continuous key states for simultaneous movement, jumping, and shooting!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How clicking multiple direction keys simultaneously in our simulator produces smooth diagonal vectors without stutter!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add rotational steering where Left/Right rotates the ship heading, and Up applies forward engine thrust!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mastering the Key State Dictionary pattern is the defining threshold between writing basic beginner scripts and architecting real-time commercial games. By separating input detection from kinematic physics updates, you build an engine capable of handling any multi-button combo, diagonal leap, or rapid-fire weapon imaginable.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Keyboard Input Binding FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Keyboard Input Binding Study Note"
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
            note="When we teach game controls at Coder & AccoTax in Barrackpore and Kolkata, I show students the Key State Dictionary pattern. When they feel the dramatic difference between stuttery onkeypress movement and fluid 60 FPS multi-key flight, they realize how professional game physics are engineered. Keep your input state clean, your bindings paired, and your loops fast!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic2;
