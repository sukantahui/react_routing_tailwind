import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";

// Import Python Source Files
import fsmEngineCode from "./topic6_files/finite_state_machine_game_engine.py?raw";
import inputRouterCode from "./topic6_files/state_driven_input_router.py?raw";
import modalPauseCode from "./topic6_files/modal_pause_overlay_system.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseActiveState {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.6)); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 16px rgba(56, 189, 248, 0.9)); }
}
@keyframes blinkPrompt {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
`;

const Topic6 = () => {
  const [gameState, setGameState] = useState("MENU"); // "MENU" | "PLAYING" | "PAUSED" | "GAME_OVER"
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [ball, setBall] = useState({ x: 160, y: 90, vx: 4, vy: -3 });

  // 60 FPS Ball Physics Loop (Active ONLY during "PLAYING")
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const interval = setInterval(() => {
      setBall((b) => {
        let nx = b.x + b.vx;
        let ny = b.y + b.vy;
        let nvx = b.vx;
        let nvy = b.vy;

        if (nx >= 295 || nx <= 25) nvx = -nvx;
        if (ny <= 25) nvy = -nvy;
        else if (ny >= 155) {
          // Lost life
          setLives((l) => {
            if (l <= 1) {
              setGameState("GAME_OVER");
              return 0;
            }
            return l - 1;
          });
          nx = 160;
          ny = 90;
          nvy = -Math.abs(nvy);
        }

        setScore((s) => s + 1);
        return { x: nx, y: ny, vx: nvx, vy: nvy };
      });
    }, 25);

    return () => clearInterval(interval);
  }, [gameState]);

  const handleSpaceAction = () => {
    if (gameState === "MENU" || gameState === "GAME_OVER") {
      setScore(0);
      setLives(3);
      setBall({ x: 160, y: 90, vx: 4, vy: -3 });
      setGameState("PLAYING");
    } else if (gameState === "PLAYING") {
      setGameState("PAUSED");
    } else if (gameState === "PAUSED") {
      setGameState("PLAYING");
    }
  };

  const prototypes = [
    {
      name: "Finite State Machine (FSM)",
      returnType: "Architectural Pattern",
      purpose: "Ensures application exists in exactly one mutually exclusive state ('MENU', 'PLAYING', 'PAUSED', 'GAME_OVER').",
      usage: "game_state['current'] = 'PLAYING'"
    },
    {
      name: "State-Driven Input Router",
      returnType: "Event Dispatching",
      purpose: "Routes single physical key (Space) to different callbacks based on active state (Start/Pause/Resume/Restart).",
      usage: "if state == 'MENU': start()\nelif state == 'PLAYING': pause()"
    },
    {
      name: "Physics Freezing during Pause",
      returnType: "Kinematic Isolation",
      purpose: "Bypasses kinematic coordinate updates while keeping the Tkinter redraw loop and UI active.",
      usage: "if state == 'PLAYING': update_physics()"
    },
    {
      name: "Modal Overlay Rendering",
      returnType: "UI Compositing",
      purpose: "Draws semi-transparent dark backdrop box and pause menu text on top of frozen world graphics.",
      usage: "if is_paused: draw_modal_overlay()"
    }
  ];

  const states = [
    { id: "MENU", name: "1. MENU", desc: "Title Screen & Controls Guide" },
    { id: "PLAYING", name: "2. PLAYING", desc: "60 FPS Physics & Player Controls" },
    { id: "PAUSED", name: "3. PAUSED", desc: "Frozen Physics & Modal Overlay" },
    { id: "GAME_OVER", name: "4. GAME_OVER", desc: "Stats Summary & Restart Prompt" }
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
            Module 005_006 · Event Handling & Interaction · Topic 6
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Managing Game & Interactive States: FSM Architecture
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate spaghetti boolean flags. Master <span className="text-cyan-300 font-semibold">Finite State Machines (FSM)</span>, <span className="text-emerald-300 font-semibold">State-Driven Input Routing</span>, <span className="text-amber-300 font-semibold">Modal Pause Overlays</span>, and <span className="text-purple-400 font-semibold">Clean Game Lifecycles</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🕹️ 4-State Game Lifecycle (Menu, Play, Pause, Over)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚡ State-Driven Input Routing
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⏸️ Modal Backdrop Pause System
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE FSM STATE MACHINE SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>⚡</span> Interactive Finite State Machine Engine
              </h3>
              <p className="text-xs text-slate-400">
                Observe how the same Spacebar trigger dispatches completely different actions across each application state.
              </p>
            </div>

            <button
              onClick={handleSpaceAction}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center gap-2"
            >
              <span>⌨️</span> Press Spacebar (Action: {
                gameState === "MENU" ? "Start Game" :
                gameState === "PLAYING" ? "Pause Game" :
                gameState === "PAUSED" ? "Resume Game" : "Restart Game"
              })
            </button>
          </div>

          {/* State Transition Flow Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {states.map((st) => {
              const isActive = gameState === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setGameState(st.id)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 border-cyan-400/80 shadow-md shadow-cyan-500/20 animate-[pulseActiveState_3s_infinite]"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-bold text-xs ${isActive ? "text-cyan-300" : "text-slate-300"}`}>
                      {st.name}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{st.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Viewport SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Live State Viewport (CURRENT: {gameState})
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg border border-slate-800 select-none">
                {/* Arena Border */}
                <rect x="15" y="15" width="290" height="150" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                {/* 1. MENU STATE */}
                {gameState === "MENU" && (
                  <g>
                    <text x="160" y="70" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      CYBER BRICK ARENA
                    </text>
                    <text x="160" y="115" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace" className="animate-[blinkPrompt_1.2s_infinite]">
                      ► PRESS SPACEBAR TO START
                    </text>
                  </g>
                )}

                {/* 2. PLAYING STATE */}
                {gameState === "PLAYING" && (
                  <g>
                    {/* Active Ball */}
                    <circle cx={ball.x} cy={ball.y} r="8" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
                    {/* HUD */}
                    <text x="25" y="32" fill="#38bdf8" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                      SCORE: {score} | LIVES: {"❤️".repeat(lives)}
                    </text>
                  </g>
                )}

                {/* 3. PAUSED STATE */}
                {gameState === "PAUSED" && (
                  <g>
                    {/* Frozen Ball */}
                    <circle cx={ball.x} cy={ball.y} r="8" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                    {/* Modal Overlay Box */}
                    <rect x="60" y="45" width="200" height="90" rx="8" fill="#020617" stroke="#38bdf8" strokeWidth="2" opacity="0.95" />
                    <text x="160" y="80" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      ⏸ GAME PAUSED
                    </text>
                    <text x="160" y="105" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
                      Press Spacebar to Resume
                    </text>
                  </g>
                )}

                {/* 4. GAME OVER STATE */}
                {gameState === "GAME_OVER" && (
                  <g>
                    <text x="160" y="65" fill="#f43f5e" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      💀 GAME OVER
                    </text>
                    <text x="160" y="95" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      FINAL SCORE: {score} PTS
                    </text>
                    <text x="160" y="125" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace" className="animate-[blinkPrompt_1.2s_infinite]">
                      ► PRESS SPACEBAR TO RESTART
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* View 2: FSM Architecture & Code */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>FSM State Machine Architecture</span>
                <span className="font-mono text-xs text-emerald-300 font-bold">Mutual Exclusivity</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Active State</div>
                  <div className="text-base font-mono font-bold text-cyan-400">"{gameState}"</div>
                  <div className="text-[10px] text-slate-500">Mutually exclusive enum</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Physics Dispatch</div>
                  <div className="text-base font-mono font-bold text-emerald-400">
                    {gameState === "PLAYING" ? "60 FPS ACTIVE" : "KINEMATICS FROZEN"}
                  </div>
                  <div className="text-[10px] text-slate-500">Zero delta during pause</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # State-Driven Input Routing Blueprint
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`def handle_space():
    if state == "MENU": start_game()
    elif state == "PLAYING": state = "PAUSED"
    elif state == "PAUSED": state = "PLAYING"
    elif state == "GAME_OVER": reset_game()`}
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
            <span>⚙️</span> FSM State Machine Core APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Pattern / Function</th>
                  <th className="py-3 px-4">Subsystem</th>
                  <th className="py-3 px-4">State Lifecycle Role</th>
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
            {/* File 1: finite_state_machine_game_engine.py */}
            <PythonFileLoader
              fileModule={fsmEngineCode}
              title="finite_state_machine_game_engine.py"
              highlightLines={[19, 27, 34, 41, 57, 68, 93, 107]}
            />

            {/* File 2: state_driven_input_router.py */}
            <PythonFileLoader
              fileModule={inputRouterCode}
              title="state_driven_input_router.py"
              highlightLines={[20, 21, 22, 23, 24, 25, 41]}
            />

            {/* File 3: modal_pause_overlay_system.py */}
            <PythonFileLoader
              fileModule={modalPauseCode}
              title="modal_pause_overlay_system.py"
              highlightLines={[21, 33, 44, 45, 46, 50]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🕹️</span> Barrackpore Retro Brick Breaker
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata created a brick breaker game in Barrackpore. When she initially managed game modes with 4 independent booleans, players could pause the game while dying, causing balls to clone in memory. Teacher Sukanta Hui helped her refactor to an FSM with a single <code className="text-cyan-300 font-mono">current_state</code> variable. Her game became bulletproof!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>⏸️</span> Kolkata Space Defense Modal Pause
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu in Kolkata constructed an arcade space defender. By freezing particle physics and drawing a semi-transparent modal pause dialog on Escape keypress, players could answer phone calls or adjust volume sliders mid-battle without losing progress!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 FSM Game State Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Using Multiple Independent Booleans</strong>
              <p className="text-slate-400">
                Having <code className="text-rose-300 font-mono">is_paused = True</code> and <code className="text-rose-300 font-mono">is_game_over = True</code> simultaneously creates contradictory race conditions. Always use a single mutually exclusive state string or enum.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Physics Leaking During Pause</strong>
              <p className="text-slate-400">
                Failing to wrap kinematic updates in <code className="text-cyan-300 font-mono">if state == "PLAYING":</code> allows enemies and bullets to keep moving while the pause menu is displayed.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Partial Game Restarts</strong>
              <p className="text-slate-400">
                Resetting player position without clearing active enemy bullets leaves lingering hazards that kill the player immediately upon restarting. Always reset all entity arrays.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Input Bleed Across State Transitions</strong>
              <p className="text-slate-400">
                A jump key pressed in the menu triggers immediately in the first frame of gameplay. Always clear the <code className="text-cyan-300 font-mono">keys_pressed</code> dictionary upon state transitions.
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
              "I organize game lifecycles into a single mutually exclusive `current_state` variable",
              "I route inputs dynamically based on active state using state-driven input routing",
              "I freeze physics updates during `PAUSED` while keeping the render loop alive",
              "I implement modal pause backdrop overlays with resume and quit options",
              "I implement clean game resets that re-initialize score, health, and entity arrays",
              "I know how to transition between Menu, Playing, Paused, and Game Over states"
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
              👉 <strong>Think about:</strong> How commercial games like Mario, Tetris, and Halo organize menus, active gameplay, pause screens, and leaderboards using Finite State Machines!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How clicking the state pills or pressing Spacebar transitions the engine cleanly from Menu to Playing, Paused, and Game Over!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add a high-score persistence check that saves the player's personal best to disk when transitioning to GAME_OVER!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Finite State Machines are the bedrock of reliable, professional software architecture. By creating clear boundaries between application modes, you turn complex multi-screen software into a manageable, bug-free system that can scale effortlessly with dozens of new levels, bonus modes, and cutscenes.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Game State Management & FSM FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Game State Management Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic6_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="At Coder & AccoTax in Barrackpore and Kolkata, I always tell students: beginner programmers write code that works when everything goes right; professional software engineers design state machines that work when things pause, reset, or go wrong. Master the FSM, and your games will feel polished, rock-solid, and commercial grade!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic6;
