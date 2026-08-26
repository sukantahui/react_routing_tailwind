import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic16_files/topic16_questions";

// Import Python Files
import lifecycleDoneCode from "./topic16_files/turtle_lifecycle_done.py?raw";
import exitonclickCode from "./topic16_files/exitonclick_event_loop.py?raw";
import completionPatternCode from "./topic16_files/program_completion_pattern.py?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.2); }
  50% { box-shadow: 0 0 25px rgba(56, 189, 248, 0.4); }
}
`;

const Topic16 = () => {
  const prototypes = [
    {
      name: "turtle.done()",
      returnType: "None",
      purpose: "Starts the Tkinter GUI main event loop and keeps the canvas window open.",
      usage: "turtle.done()"
    },
    {
      name: "turtle.mainloop()",
      returnType: "None",
      purpose: "Exact identical alias of turtle.done() that enters the event loop.",
      usage: "turtle.mainloop()"
    },
    {
      name: "screen.exitonclick()",
      returnType: "None",
      purpose: "Binds mouse-click on canvas to window exit and starts the event loop.",
      usage: "screen.exitonclick()"
    },
    {
      name: "turtle.bye()",
      returnType: "None",
      purpose: "Programmatically destroys the turtle canvas window and shuts down the event loop.",
      usage: "turtle.bye()"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_001 · Turtle Foundation · Topic 16
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Program Lifecycle & <span className="font-mono">turtle.done()</span> Completion
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the 4 stages of a Turtle application lifecycle, how the Tkinter event loop keeps the window open, and professional termination patterns.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🏁 Stage 4 Completion
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🔄 Tkinter Event Loop
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🖱️ exitonclick() vs. done()
            </span>
          </div>
        </div>

        {/* =========================================================================
            SVG ARCHITECTURAL LIFECYCLE DIAGRAM
        ========================================================================= */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 w-full max-w-4xl">
            <h3 className="text-center text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
              The 4 Discrete Phases of the Turtle Program Lifecycle
            </h3>

            <svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              {/* Phase 1 */}
              <rect x="20" y="40" width="160" height="150" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="100" cy="75" r="18" fill="#0284c7" />
              <text x="100" y="80" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1</text>
              <text x="100" y="115" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Setup & Window</text>
              <text x="100" y="138" fill="#94a3b8" fontSize="10" textAnchor="middle">Screen() setup</text>
              <text x="100" y="153" fill="#94a3b8" fontSize="10" textAnchor="middle">bgcolor(), title()</text>

              {/* Arrow 1 &rarr; 2 */}
              <path d="M 185 115 L 215 115" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Phase 2 */}
              <rect x="220" y="40" width="160" height="150" rx="12" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
              <circle cx="300" cy="75" r="18" fill="#4f46e5" />
              <text x="300" y="80" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
              <text x="300" y="115" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="middle">Entity Creation</text>
              <text x="300" y="138" fill="#94a3b8" fontSize="10" textAnchor="middle">t = Turtle()</text>
              <text x="300" y="153" fill="#94a3b8" fontSize="10" textAnchor="middle">color(), pensize()</text>

              {/* Arrow 2 &rarr; 3 */}
              <path d="M 385 115 L 415 115" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Phase 3 */}
              <rect x="420" y="40" width="160" height="150" rx="12" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
              <circle cx="500" cy="75" r="18" fill="#059669" />
              <text x="500" y="80" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>
              <text x="500" y="115" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Procedural Draw</text>
              <text x="500" y="138" fill="#94a3b8" fontSize="10" textAnchor="middle">forward(), circle()</text>
              <text x="500" y="153" fill="#94a3b8" fontSize="10" textAnchor="middle">loops & math art</text>

              {/* Arrow 3 &rarr; 4 */}
              <path d="M 585 115 L 615 115" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Phase 4 */}
              <rect x="620" y="40" width="160" height="150" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="700" cy="75" r="18" fill="#d97706" />
              <text x="700" y="80" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">4</text>
              <text x="700" y="115" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Event Loop</text>
              <text x="700" y="138" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">turtle.done()</text>
              <text x="700" y="155" fill="#94a3b8" fontSize="10" textAnchor="middle">Keeps Window Open</text>

              {/* Arrow marker definition */}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Lifecycle Management Method Signatures
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Prototype</th>
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Standard Code Example</th>
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
            <span>💻</span> Professional Program Lifecycle Code Files
          </h2>

          <div className="space-y-6">
            {/* File 1: turtle_lifecycle_done.py */}
            <PythonFileLoader
              fileModule={lifecycleDoneCode}
              title="turtle_lifecycle_done.py"
              highlightLines={[12, 19, 27, 36]}
            />

            {/* File 2: exitonclick_event_loop.py */}
            <PythonFileLoader
              fileModule={exitonclickCode}
              title="exitonclick_event_loop.py"
              highlightLines={[11, 20, 27]}
            />

            {/* File 3: program_completion_pattern.py */}
            <PythonFileLoader
              fileModule={completionPatternCode}
              title="program_completion_pattern.py"
              highlightLines={[12, 28, 30]}
            />
          </div>
        </div>

        {/* =========================================================================
            WHY DOES THE WINDOW DISAPPEAR WITHOUT TURTLE.DONE()?
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-rose-950/30 rounded-2xl p-6 border border-rose-500/30 space-y-3">
            <h3 className="font-bold text-rose-400 text-lg flex items-center gap-2">
              <span>❌</span> What Happens Without turtle.done()
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              When running scripts in VS Code, Terminal, or PyCharm, Python reaches the last line of code, finishes its process, and instructs the operating system to immediately destroy the Tkinter window.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-rose-300">
              # Script terminates immediately:<br />
              turtle.circle(100)<br />
              # 💥 Window flashes for 0.05s and vanishes!
            </div>
          </div>

          <div className="bg-emerald-950/30 rounded-2xl p-6 border border-emerald-500/30 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>✔</span> What turtle.done() Does Under the Hood
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              <code className="text-emerald-300">turtle.done()</code> delegates execution to the Tkinter GUI mainloop. It continuously listens for OS redraw events, mouse clicks, and keyboard strokes, keeping the window active until you close it.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-300">
              # Window stays open indefinitely:<br />
              turtle.circle(100)<br />
              turtle.done()  # 🛡️ Handover to event loop!
            </div>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Program Lifecycle Mistakes to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Writing Code After turtle.done()</strong>
              <p className="text-slate-400">
                <code className="text-amber-300">turtle.done()</code> is a blocking function. Any drawing commands placed below it will not execute until the window is closed!
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Calling done() Inside Loops</strong>
              <p className="text-slate-400">
                Placing <code className="text-amber-300">turtle.done()</code> inside a <code className="text-sky-300">for</code> or <code className="text-sky-300">while</code> loop halts the loop on iteration 1.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Confusing done() with time.sleep()</strong>
              <p className="text-slate-400">
                <code className="text-rose-300">time.sleep(5)</code> temporarily freezes the program, but still terminates after 5 seconds. Use <code className="text-emerald-300">turtle.done()</code> for permanent open canvas.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Unhandled turtle.Terminator</strong>
              <p className="text-slate-400">
                If the user closes the window during an active animation, catch <code className="text-sky-300">turtle.Terminator</code> to exit cleanly without terminal stack traces.
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
              "I understand why turtle.done() is required outside IDLE environments",
              "I know that turtle.done() and turtle.mainloop() are identical aliases",
              "I can use screen.exitonclick() to close graphics on a mouse click",
              "I understand the 4 discrete phases of a structured Turtle application",
              "I know that turtle.done() must be the very last statement in my script",
              "I know how to catch turtle.Terminator for graceful error-free window closure"
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
              👉 <strong>Think about:</strong> Why game loops in Pygame and Godot also rely on a mainloop pattern to process frame ticks.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How hiding the cursor with <code className="text-sky-300">t.hideturtle()</code> before calling <code className="text-sky-300">turtle.done()</code> elevates presentation aesthetics.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Replace <code className="text-amber-300">turtle.done()</code> with <code className="text-amber-300">screen.exitonclick()</code> in your favorite mandala script.
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every GUI framework—from desktop Tkinter and PyQt to web event loops in JavaScript and mobile Flutter engines—operates on the same fundamental loop pattern: initialize, render, and listen for events. Mastering <code className="text-purple-300 font-mono">turtle.done()</code> gives you the foundational mental model for all event-driven architectures.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Turtle Lifecycle & turtle.done() FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 16: Turtle Lifecycle Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic16_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="During our classes in Barrackpore and Kolkata, the number one question beginners ask on day one is: 'Why did my turtle drawing disappear instantly?' Teaching students that Python runs code top-to-bottom and exits unless instructed to wait with turtle.done() is a crucial conceptual milestone. Always encourage students to wrap their finished graphics with turtle.done() or screen.exitonclick() so they can proudly admire and present their creative coding!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic16;
