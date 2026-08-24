import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";

// Import Python files
import penControl from "./topic13_files/pen_control.py?raw";
import dashedLine from "./topic13_files/dashed_line.py?raw";
import teleport from "./topic13_files/teleport.py?raw";

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

const Topic13 = () => {
  const prototypes = [
    { name: "penup() / pu() / up()", returnType: "None", purpose: "Lifts the pen – movement does NOT draw.", usage: "t.penup()" },
    { name: "pendown() / pd() / down()", returnType: "None", purpose: "Lowers the pen – movement draws.", usage: "t.pendown()" },
    { name: "isdown()", returnType: "bool", purpose: "Returns True if pen is down (drawing).", usage: "if t.isdown(): t.penup()" },
    { name: "pensize(width) / width(width)", returnType: "None", purpose: "Sets the thickness of the pen line.", usage: "t.pensize(3)" },
    { name: "pen(pendict)", returnType: "dict", purpose: "Gets or sets pen attributes (color, size, speed).", usage: "t.pen(speed=0, pencolor='red')" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Pen Control Basics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            penup(), pendown() – moving without drawing, and drawing without moving
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🖊️ penup() – lift</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">✍️ pendown() – lower</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🎯 Teleport & Dashed Lines</span>
          </div>
        </div>

        {/* SVG Illustration: penup vs pendown */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="260" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* pendown segment – draws */}
              <text x="100" y="50" fill="#2dd4bf" fontSize="12" fontWeight="bold">pendown() → draws</text>
              <line x1="60" y1="80" x2="220" y2="80" stroke="#f97316" strokeWidth="3" />
              <circle cx="60" cy="80" r="5" fill="#14b8a6" />
              <circle cx="220" cy="80" r="5" fill="#facc15" />
              <text x="130" y="70" fill="#94a3b8" fontSize="10">forward(160)</text>
              
              {/* penup segment – no draw */}
              <text x="300" y="50" fill="#f43f5e" fontSize="12" fontWeight="bold">penup() → no draw</text>
              <line x1="260" y1="80" x2="440" y2="80" stroke="#475569" strokeWidth="3" strokeDasharray="4,4" />
              <circle cx="260" cy="80" r="5" fill="#14b8a6" />
              <circle cx="440" cy="80" r="5" fill="#facc15" />
              <text x="340" y="70" fill="#94a3b8" fontSize="10">forward(180) (invisible)</text>
              
              {/* Comparison table */}
              <g transform="translate(60, 130)">
                <rect width="380" height="110" fill="#1e293b" rx="8" />
                <text x="20" y="25" fill="#facc15" fontSize="11" fontWeight="bold">State</text>
                <text x="140" y="25" fill="#facc15" fontSize="11" fontWeight="bold">Drawing?</text>
                <text x="280" y="25" fill="#facc15" fontSize="11" fontWeight="bold">Use case</text>
                <line x1="10" y1="35" x2="370" y2="35" stroke="#475569" strokeWidth="1" />
                <text x="20" y="55" fill="#2dd4bf" fontSize="10">pendown()</text>
                <text x="140" y="55" fill="#2dd4bf" fontSize="10">Yes (line)</text>
                <text x="280" y="55" fill="#94a3b8" fontSize="10">Normal drawing</text>
                <text x="20" y="80" fill="#f43f5e" fontSize="10">penup()</text>
                <text x="140" y="80" fill="#f43f5e" fontSize="10">No (no mark)</text>
                <text x="280" y="80" fill="#94a3b8" fontSize="10">Repositioning</text>
                <text x="20" y="105" fill="#8b5cf6" fontSize="10">isdown()</text>
                <text x="140" y="105" fill="#8b5cf6" fontSize="10">Query state</text>
                <text x="280" y="105" fill="#94a3b8" fontSize="10">Conditional logic</text>
              </g>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">pendown() leaves a trail; penup() moves silently – essential for teleporting and dashed lines</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🖊️ The Pen: Your Drawing Tool</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">The turtle carries a pen that can be raised (<code>penup()</code>) or lowered (<code>pendown()</code>). When the pen is down, every movement draws a line. When it's up, the turtle moves without leaving a mark. This is fundamental for repositioning the turtle, creating dashed lines, or moving between separated shapes.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">penup() – lift pen</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Aliases: <code>pu()</code>, <code>up()</code>.</li>
                  <li>Movement becomes invisible.</li>
                  <li>Useful for teleporting to a new location.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">pendown() – lower pen</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Aliases: <code>pd()</code>, <code>down()</code>.</li>
                  <li>Default state when turtle is created.</li>
                  <li>All movement draws lines.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2"><strong>Note:</strong> <code>isdown()</code> returns <code>True</code> if pen is down, <code>False</code> if up – useful for debugging and conditional drawing.</p>
          </div>
        </section>

        {/* Real-world analogy */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">✍️ Everyday Analogy</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">Imagine you're drawing with a pen on paper. <strong>pendown()</strong> is pressing the pen tip to the paper; <strong>penup()</strong> is lifting it. You lift the pen to move to a different spot without making a mark. That's exactly how turtle graphics works. In robotics, a plotter or CNC machine uses the same concept: a tool that can be raised or lowered.</p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Classroom tip:</strong> Give students a physical pen and paper. Ask them to "draw a square, then lift the pen, move to another corner, lower it, and draw a triangle." They'll immediately understand penup/pendown.</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={penControl} title="pen_control.py" highlightLines={[6,7,8,9,10,11,12]} />
          <PythonFileLoader fileModule={dashedLine} title="dashed_line.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={teleport} title="teleport.py" highlightLines={[6,7,8,9,10]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Pen Control Methods</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Method</th><th>Return</th><th>Description</th><th>Example</th></tr>
              </thead>
              <tbody>
                {prototypes.map((p, idx) => (
                  <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/30 transition">
                    <td className="px-4 py-2 font-mono text-emerald-300">{p.name}</td>
                    <td className="px-4 py-2 text-center">{p.returnType}</td>
                    <td className="px-4 py-2">{p.purpose}</td>
                    <td className="px-4 py-2 font-mono text-xs">{p.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm italic">Tip: Use <code>t.pen(pensize=5, pencolor="blue")</code> to set multiple attributes at once.</p>
        </section>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Forgetting to call pendown() after penup():</strong> Later movements will not draw – common source of "missing lines".</li>
              <li><strong>Assuming penup() changes heading:</strong> It doesn't; only affects drawing.</li>
              <li><strong>Using isdown() incorrectly:</strong> Remember it's a method, not a property: <code>if t.isdown():</code> not <code>if t.isdown</code>.</li>
              <li><strong>Overusing penup/pendown in a loop:</strong> Can slow down drawing; batch moves when possible.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Always pair penup() with a later pendown() before drawing again.</li>
              <li>Check pen state with <code>print(t.isdown())</code> when debugging.</li>
              <li>Use <code>with ...</code> patterns? Not directly, but create helper functions that ensure pen returns to original state.</li>
              <li>For dashed lines, alternate penup and pendown in a loop.</li>
              <li>When teleporting: penup → goto → pendown.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can lift the pen with penup() to move without drawing",
              "I can lower the pen with pendown() to start drawing again",
              "I know the aliases: pu()/up() and pd()/down()",
              "I can check pen state using isdown()",
              "I can create dashed lines by alternating penup/pendown",
              "I can teleport the turtle without leaving a trail"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> What would happen if you call pendown() twice? (Nothing – state remains down.)</p>
            <p>👉 <strong>Observe:</strong> Run a script that draws a line, penup, moves, then pendown and draws again – see the gap.</p>
            <p>👉 <strong>Try changing:</strong> Create a function that draws a shape, then using penup, draw the same shape somewhere else.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In professional vector graphics (SVG, PostScript), paths have a "pen up" concept called "move to" (M) and "line to" (L). Mastering pen control allows you to create multi‑element drawings, diagrams with labels, and animations where objects appear to jump. It's also crucial for ensuring that your functions are "non‑drawing" when repositioning.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Pen Control FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="Pen control is often the first 'state' concept students encounter. Emphasize that the pen state persists across moves. Have them trace a path on paper with a real pen – lift, move, lower – to internalize. Use isdown() in conditional statements, e.g., 'if not t.isdown(): t.pendown()' to ensure drawing. Activities: drawing a dotted line, creating a 'connect the dots' puzzle, and drawing a house with separate components (walls, door, roof) using penup to reposition." />
        </div>
      </div>
    </div>
  );
};

export default Topic13;