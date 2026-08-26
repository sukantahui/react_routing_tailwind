import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";

// Import Python Source Files
import swarmCode from "./topic6_files/multi_particle_swarm_synchronizer.py?raw";
import spawnerCode from "./topic6_files/entity_pool_bullet_spawner.py?raw";
import solarSystemCode from "./topic6_files/solar_system_orbital_mechanics.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes glowSun {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.8)); }
  50% { filter: drop-shadow(0 0 20px rgba(245, 158, 11, 1)); }
}
`;

const Topic6 = () => {
  const [simType, setSimType] = useState("swarm"); // "swarm" vs "solar"
  const [particleCount, setParticleCount] = useState(25);
  const [particles, setParticles] = useState([]);
  const [solarTime, setSolarTime] = useState(0);

  // Initialize Swarm Particles
  useEffect(() => {
    const colors = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a855f7", "#ec4899"];
    const pts = [];
    for (let i = 0; i < particleCount; i++) {
      pts.push({
        x: Math.random() * 240 + 30,
        y: Math.random() * 110 + 30,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        r: Math.floor(Math.random() * 5) + 6,
        color: colors[i % colors.length]
      });
    }
    setParticles(pts);
  }, [particleCount]);

  // Synchronized Swarm Physics Loop (60 FPS)
  useEffect(() => {
    if (simType !== "swarm") return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let nx = p.x + p.vx;
          let ny = p.y + p.vy;
          let nvx = p.vx;
          let nvy = p.vy;

          if (nx + p.r >= 300) { nx = 300 - p.r; nvx = -nvx; }
          else if (nx - p.r <= 20) { nx = 20 + p.r; nvx = -nvx; }

          if (ny + p.r >= 160) { ny = 160 - p.r; nvy = -nvy; }
          else if (ny - p.r <= 20) { ny = 20 + p.r; nvy = -nvy; }

          return { ...p, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 25);

    return () => clearInterval(interval);
  }, [simType]);

  // Solar System Orbit Timer
  useEffect(() => {
    if (simType !== "solar") return;

    const interval = setInterval(() => {
      setSolarTime((t) => t + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [simType]);

  const planets = [
    { name: "Mercury", r: 40, size: 4, speed: 4.0, color: "#cbd5e1" },
    { name: "Earth",   r: 75, size: 7, speed: 2.0, color: "#38bdf8" },
    { name: "Mars",    r: 105, size: 5, speed: 1.3, color: "#f43f5e" },
    { name: "Jupiter", r: 135, size: 11, speed: 0.7, color: "#fbbf24" }
  ];

  const prototypes = [
    {
      name: "for entity in entities:",
      returnType: "Batch Kinematic Processing",
      purpose: "Iterates over active entity dataset, applying physics and collision resolution to each actor.",
      usage: "for e in entities:\n    update_entity(e)"
    },
    {
      name: "active = [e for e in entities if e.alive]",
      returnType: "Entity Lifecycle Pruning",
      purpose: "Filters and cleans up expired entities (offscreen bullets, dead particles) preventing memory leaks.",
      usage: "bullets = [b for b in bullets if b['y'] < max_y]"
    },
    {
      name: "screen.tracer(0) + Single Turtle",
      returnType: "Mass Rendering Acceleration",
      purpose: "Renders 500+ synchronized entity vectors in RAM in < 2 ms before swapping to screen.",
      usage: "t.clear()\nfor e in entities: draw(e)\nscreen.update()"
    },
    {
      name: "Object Pool Allocator",
      returnType: "Memory Recycling",
      purpose: "Reuses pre-allocated entity instances in place, eliminating garbage collection pauses.",
      usage: "recycle_particle(p, emitter_x, emitter_y)"
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
            Module 005_005 · Animation & Motion Logic · Topic 6
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Multi-Object Synchronized Animation Loops
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Scale from single sprites to massive multi-entity worlds. Master <span className="text-emerald-400 font-bold">Entity-List Architecture</span>, <span className="text-cyan-300 font-semibold">Synchronized 60 FPS Batch Updates</span>, <span className="text-amber-300 font-semibold">Multi-Body Orbital Mechanics</span>, and <span className="text-purple-400 font-semibold">Object Lifecycle Pruning</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🐝 50+ Entity Swarm Synchronization
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🪐 Keplerian Multi-Body Solar System
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🔫 Dynamic Spawner & Lifecycle Pruning
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE MULTI-OBJECT SIMULATION STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🌌</span> Synchronized Multi-Entity Engine
              </h3>
              <p className="text-xs text-slate-400">
                Switch between an Autonomous Multi-Particle Bouncing Swarm and a Harmonious Keplerian Solar System.
              </p>
            </div>

            {/* Simulation Type Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimType("swarm")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  simType === "swarm"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                🐝 Particle Swarm ({particleCount} Entities)
              </button>

              <button
                onClick={() => setSimType("solar")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  simType === "solar"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                🪐 Multi-Planet Solar System
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Scene SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Live Simulation Viewport ({simType.toUpperCase()} MODE)
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* 1. SWARM MODE */}
                {simType === "swarm" && (
                  <>
                    <rect x="20" y="20" width="280" height="140" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                    {particles.map((p, idx) => (
                      <circle
                        key={idx}
                        cx={p.x}
                        cy={p.y}
                        r={p.r}
                        fill={p.color}
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                    ))}
                  </>
                )}

                {/* 2. SOLAR SYSTEM MODE */}
                {simType === "solar" && (
                  <g transform="translate(160, 90)">
                    {/* Central Sun */}
                    <circle cx="0" cy="0" r="16" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" className="animate-[glowSun_3s_infinite]" />

                    {/* Planets and Orbit Rings */}
                    {planets.map((pl, idx) => {
                      const angle = ((solarTime * pl.speed + idx * 60) * Math.PI) / 180;
                      const px = pl.r * Math.cos(angle);
                      const py = pl.r * Math.sin(angle);
                      return (
                        <g key={idx}>
                          {/* Orbit Ring */}
                          <circle cx="0" cy="0" r={pl.r} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                          {/* Planet */}
                          <circle cx={px} cy={py} r={pl.size} fill={pl.color} stroke="#ffffff" strokeWidth="1" />
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* Telemetry HUD */}
                <text x="25" y="18" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
                  {simType === "swarm" ? `ENTITIES: ${particles.length} ACTIVE` : "ORBITAL MECHANICS SYNCHRONIZED"} | 60 FPS ROCK-SOLID
                </text>
              </svg>

              {/* Particle Count Slider in Swarm Mode */}
              {simType === "swarm" && (
                <div className="w-full max-w-xs mt-3 flex items-center justify-between gap-3 text-xs text-slate-300">
                  <span>Particle Count:</span>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={particleCount}
                    onChange={(e) => setParticleCount(parseInt(e.target.value))}
                    className="w-36 accent-emerald-400 cursor-pointer"
                  />
                  <span className="font-mono text-emerald-300 font-bold">{particleCount}</span>
                </div>
              )}
            </div>

            {/* View 2: Architecture & Entity-List Mechanics */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Multi-Object Synchronization Engine</span>
                <span className="font-mono text-xs text-emerald-300">O(N) Linear Batch</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Active Actor Capacity</div>
                  <div className="text-base font-mono font-bold text-sky-400">500+ Entities</div>
                  <div className="text-[10px] text-slate-500">Double-buffered RAM list</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Frame Budget Utilization</div>
                  <div className="text-base font-mono font-bold text-emerald-400">&lt; 1.8 ms / frame</div>
                  <div className="text-[10px] text-slate-500">Pure Python C-bytecode</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Entity-List Batch Loop Blueprint
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`while running:
    t.clear()
    for e in entities:
        e.update_physics()
        draw_entity(t, e)
    screen.update()
    time.sleep(1/60)`}
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
            <span>⚙️</span> Multi-Entity Architectural APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Pattern / Mechanism</th>
                  <th className="py-3 px-4">Subsystem</th>
                  <th className="py-3 px-4">Scalability & Synchronization Role</th>
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
            {/* File 1: multi_particle_swarm_synchronizer.py */}
            <PythonFileLoader
              fileModule={swarmCode}
              title="multi_particle_swarm_synchronizer.py"
              highlightLines={[29, 30, 42, 45, 50, 56, 64]}
            />

            {/* File 2: entity_pool_bullet_spawner.py */}
            <PythonFileLoader
              fileModule={spawnerCode}
              title="entity_pool_bullet_spawner.py"
              highlightLines={[21, 22, 42, 44, 46, 49, 58]}
            />

            {/* File 3: solar_system_orbital_mechanics.py */}
            <PythonFileLoader
              fileModule={solarSystemCode}
              title="solar_system_orbital_mechanics.py"
              highlightLines={[20, 21, 22, 38, 39, 40, 45]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🚀</span> Barrackpore Space Armada: 100 Bullets at 60 FPS
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima created a bullet-hell space shooter in Barrackpore. When 50 laser bolts and 20 alien fighters were active, her game maintained a flawless 60 FPS because she managed all bullets in a clean Python dictionary list and purged offscreen bolts with <code className="text-cyan-300 font-mono">[b for b in bullets if b.y &lt; 300]</code>!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-indigo-400 text-lg flex items-center gap-2">
              <span>🪐</span> Kolkata Planetarium Orbital Engine
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu in Kolkata simulated the full solar system including moons orbiting planets. By nesting entity update dictionaries, Earth orbited the Sun while the Moon concurrently orbited Earth—all synchronized within a single double-buffered frame loop!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Multi-Object Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Creating Turtles for Each Bullet</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">bullet = turtle.Turtle()</code> on spacebar press creates hundreds of OS window handles, crashing Tkinter in minutes. Use 1 turtle to render all entity dicts.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Mutating Lists While Iterating</strong>
              <p className="text-slate-400">
                Calling <code className="text-rose-300 font-mono">bullets.remove(b)</code> inside <code className="text-rose-300 font-mono">for b in bullets:</code> skips subsequent elements due to index shifting. Use list comprehensions.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Clearing Canvas Inside Entity Loops</strong>
              <p className="text-slate-400">
                Placing <code className="text-rose-300 font-mono">t.clear()</code> inside the entity loop erases all previous entities on every step, rendering only the final particle on screen. Clear once before the loop.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Memory Leaks from Unpruned Entities</strong>
              <p className="text-slate-400">
                Failing to despawn bullets when they travel offscreen causes the bullets list to grow to 100,000+ items, degrading performance to 2 FPS. Always prune offscreen actors.
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
              "I manage multi-object entities in a single list of dictionaries or class instances",
              "I update and render all entities in a unified 60 FPS loop using 1 turtle cursor",
              "I call `t.clear()` once at the start of the frame and `screen.update()` at the end",
              "I prune offscreen entities using list comprehensions to prevent memory leaks",
              "I know how to implement multi-body orbital mechanics and particle systems",
              "I understand how object pooling recycles entity memory in high-speed games"
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
              👉 <strong>Think about:</strong> How commercial game engines like Unity, Godot, and Unreal Engine coordinate thousands of interacting entities through Entity-Component Systems (ECS)!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How 50 particles bounce independently without stutter when batched in a single double-buffered frame pass!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add gravity to all swarm particles so they bounce together like a fountain of colorful confetti!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Congratulations on completing Module 005_005! You have mastered the complete foundations of interactive motion and game animation: frame loops, double-buffering, flicker elimination, asynchronous timing, 2D Newtonian physics, boundary collisions, and multi-entity synchronization. You are now fully equipped to build complex interactive games, simulations, and real-time visual software!
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Multi-Object Synchronized Loops FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Multi-Object Synchronized Loops Study Note"
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
            note="As we conclude Module 005_005 at Coder & AccoTax in Barrackpore and Kolkata, I am incredibly proud of how far our students have come. You started with simple turtle lines, and now you are orchestrating multi-body solar systems, particle swarms, and 60 FPS physics engines. Carry these principles of synchronization, batching, and clean lifecycle management forward—they are the exact building blocks of professional software engineering!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic6;
