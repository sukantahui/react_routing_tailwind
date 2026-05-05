import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";

// Import Python files
import clearDemo from "./topic14_files/clear_demo.py?raw";
import resetDemo from "./topic14_files/reset_demo.py?raw";
import homeDemo from "./topic14_files/home_demo.py?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes softGlow {
  0%,100% { box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
  50% { box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
}
`;

const Topic14 = () => {
  const prototypes = [
    { name: "clear() / clr()", returnType: "None", purpose: "Erases all drawings; turtle stays in place, state unchanged.", usage: "t.clear()" },
    { name: "reset()", returnType: "None", purpose: "Erases drawings AND resets position, heading, pen state to defaults.", usage: "t.reset()" },
    { name: "home()", returnType: "None", purpose: "Moves turtle to (0,0) and sets heading to 0° (east).", usage: "t.home()" },
    { name: "clearscreen() / cls()", returnType: "None", purpose: "Screen‑level clear: erases all drawings from all turtles.", usage: "turtle.clearscreen()" },
    { name: "resetscreen()", returnType: "None", purpose: "Screen‑level reset: clears drawings and resets all turtles.", usage: "turtle.resetscreen()" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Resetting and Clearing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            clear(), reset(), home() – erasing drawings, restoring state, and returning to start
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🧹 clear() – erase drawings only</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔄 reset() – full factory reset</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🏠 home() – back to origin</span>
          </div>
        </div>

        {/* SVG Illustration: clear vs reset vs home */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="380" viewBox="0 0 500 380" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="340" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Before state */}
              <text x="150" y="45" fill="#facc15" fontSize="12" fontWeight="bold">Before</text>
              <rect x="50" y="55" width="120" height="80" fill="#2dd4bf" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="1.5" />
              <text x="110" y="95" fill="#2dd4bf" fontSize="9" textAnchor="middle">Drawing</text>
              <circle cx="110" cy="120" r="4" fill="#f97316" />
              <text x="115" y="125" fill="#f97316" fontSize="8">turtle</text>
              
              {/* clear() – erases drawing, turtle stays */}
              <text x="240" y="45" fill="#2dd4bf" fontSize="12" fontWeight="bold">clear()</text>
              <rect x="200" y="55" width="120" height="80" fill="none" stroke="#475569" strokeWidth="1" />
              <circle cx="260" cy="95" r="4" fill="#f97316" />
              <text x="265" y="100" fill="#f97316" fontSize="8">turtle</text>
              <text x="255" y="125" fill="#f43f5e" fontSize="8">drawing gone</text>
              
              {/* reset() – full reset */}
              <text x="390" y="45" fill="#8b5cf6" fontSize="12" fontWeight="bold">reset()</text>
              <rect x="350" y="55" width="110" height="80" fill="none" stroke="#475569" strokeWidth="1" />
              <circle cx="405" cy="55" r="4" fill="#f97316" />
              <text x="410" y="60" fill="#f97316" fontSize="8">turtle at origin</text>
              <text x="405" y="80" fill="#f43f5e" fontSize="8">heading reset</text>
              <text x="405" y="95" fill="#f43f5e" fontSize="8">state restored</text>
              
              {/* home() – just moves, keeps drawing */}
              <text x="150" y="190" fill="#2dd4bf" fontSize="12" fontWeight="bold">home()</text>
              <rect x="50" y="200" width="120" height="80" fill="#2dd4bf" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="1.5" />
              <circle cx="110" cy="240" r="4" fill="#f97316" />
              <text x="115" y="245" fill="#f97316" fontSize="8">moves here</text>
              <path d="M 200 240 L 110 240" stroke="#facc15" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrowHome)" />
              <text x="250" y="235" fill="#facc15" fontSize="8">returns to (0,0)</text>
              
              <defs>
                <marker id="arrowHome" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#facc15" />
                </marker>
              </defs>
              
              {/* Comparison table */}
              <g transform="translate(50, 310)">
                <rect width="400" height="40" fill="#1e293b" rx="6" />
                <text x="20" y="20" fill="#cbd5e1" fontSize="9">clear(): erases drawings only</text>
                <text x="150" y="20" fill="#cbd5e1" fontSize="9">reset(): erases + resets state</text>
                <text x="310" y="20" fill="#cbd5e1" fontSize="9">home(): moves to (0,0) + heading 0</text>
              </g>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">clear() = erase drawing; reset() = full factory reset; home() = go to origin + east</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🧹 Three Ways to Start Over (or Not)</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">Turtle graphics provides three essential methods to clear or reset the drawing environment. Understanding the differences is crucial: <code>clear()</code> removes drawings but keeps turtle state; <code>reset()</code> removes drawings AND restores default position, heading, and pen state; <code>home()</code> only moves the turtle to (0,0) and points east, leaving drawings intact.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-300">clear()</h3>
                <ul className="text-sm list-disc pl-4">
                  <li>Erases all lines/dots/stamps</li>
                  <li>Turtle stays where it is</li>
                  <li>Heading, color, pensize unchanged</li>
                  <li>Alias: <code>clr()</code></li>
                </ul>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-300">reset()</h3>
                <ul className="text-sm list-disc pl-4">
                  <li>Erases drawings</li>
                  <li>Moves turtle to (0,0)</li>
                  <li>Heading set to 0° (east)</li>
                  <li>Pen state = down, color = black, etc.</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400">home()</h3>
                <ul className="text-sm list-disc pl-4">
                  <li>Moves turtle to origin (0,0)</li>
                  <li>Sets heading to 0° (east)</li>
                  <li>Does NOT erase drawings</li>
                  <li>Pen state unchanged</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real‑world analogy */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">✏️ Real‑world Analogies</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>clear():</strong> Wiping the whiteboard but leaving the marker where it is (same color, same cap).</li>
              <li><strong>reset():</strong> Wiping the board AND putting the marker back in its holder, caps on, ready as new.</li>
              <li><strong>home():</strong> Picking up the marker and placing it at the board's center, facing forward – but the existing drawing remains.</li>
            </ul>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Example:</strong> Students like Tuhina draw a spiral, then call <code>clear()</code> to erase it and draw a square from the same position. <code>reset()</code> would start everything fresh. <code>home()</code> returns to center without losing the drawing – useful for annotations.</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={clearDemo} title="clear_demo.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={resetDemo} title="reset_demo.py" highlightLines={[8,9,10,11,12]} />
          <PythonFileLoader fileModule={homeDemo} title="home_demo.py" highlightLines={[6,7,8,9,10,11]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Reset & Clear Methods</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Method</th><th>Erases Drawings</th><th>Resets Position</th><th>Resets Heading</th><th>Resets Pen State</th></tr>
              </thead>
              <tbody>
                {prototypes.map((p, idx) => {
                  const effects = {
                    "clear() / clr()": ["Yes", "No", "No", "No"],
                    "reset()": ["Yes", "Yes", "Yes", "Yes"],
                    "home()": ["No", "Yes", "Yes", "No"],
                    "clearscreen() / cls()": ["Yes (all turtles)", "No (per turtle?)", "No", "No"],
                    "resetscreen()": ["Yes (all)", "Yes (all)", "Yes (all)", "Yes (all)"]
                  };
                  const eff = effects[p.name] || ["-", "-", "-", "-"];
                  return (
                    <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/30 transition">
                      <td className="px-4 py-2 font-mono text-emerald-300">{p.name}</td>
                      {eff.map((e, i) => <td key={i} className="px-4 py-2 text-center">{e}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm italic">Note: `clear()` only affects the calling turtle; `clearscreen()` affects all turtles.</p>
        </section>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Confusing clear() and reset():</strong> Using reset() when you only wanted to erase drawings – loses your position and heading.</li>
              <li><strong>Using home() expecting it to clear drawings:</strong> It doesn't; it only moves the turtle.</li>
              <li><strong>Calling clear() on a different turtle than intended:</strong> Each turtle has its own drawings; clear() only erases that turtle's trails.</li>
              <li><strong>Forgetting that clear() does not affect stamps:</strong> Stamps are separate; use `clearstamps()` to remove them.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Use `clear()` when you want a clean canvas but keep the turtle's current setup (color, pen size, position).</li>
              <li>Use `reset()` when you want a completely fresh start (e.g., after an error or to re‑run a demonstration).</li>
              <li>Use `home()` after drawing complex shapes to return to origin for a label or next shape without erasing.</li>
              <li>For multi‑turtle programs, use `clearscreen()` to reset everything.</li>
              <li>Save state before resetting if you need to restore later: `state = t.pen(); pos = t.pos(); heading = t.heading()`.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can erase only the drawings using clear()",
              "I can completely reset the turtle using reset()",
              "I can send the turtle to the origin and face east using home()",
              "I understand that clear() keeps position and heading",
              "I know that reset() restores all default settings",
              "I can use clearscreen() to reset the entire canvas for all turtles"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> Draw a line, then call clear(). Where is the turtle? (Still at the end of the line.)</p>
            <p>👉 <strong>Observe:</strong> After reset(), what is the turtle's pensize? (Back to 1.)</p>
            <p>👉 <strong>Try changing:</strong> Use home() after drawing to return to origin, then draw another shape from there without erasing – you'll have two shapes.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In professional graphics applications (Photoshop, GIMP), "Clear" removes pixels but leaves the tool settings; "Reset" reverts tool options. In animation, `reset()` is used to start a new scene; `clear()` might erase previous frame while keeping transform data. Understanding these operations lets you design interactive programs that respond to user input (e.g., a 'reset' button).</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Resetting and Clearing FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="This topic is a natural point for a hands‑on activity: have students draw a complex picture, then call clear(), reset(), and home() in separate runs to see the differences. Emphasize that reset() is a 'factory reset' – it even changes pen color back to black. Use clearscreen() when working with multiple turtles to avoid leftover stamps. These commands are lifesavers when experimenting." />
        </div>
      </div>
    </div>
  );
};

export default Topic14;