import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";

// Import Python files
import gotoDemo from "./topic8_files/goto_demo.py?raw";
import setxSetyDemo from "./topic8_files/setx_sety_demo.py?raw";
import absoluteGrid from "./topic8_files/absolute_grid.py?raw";

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

const Topic8 = () => {
  const prototypes = [
    { name: "goto(x, y) / setpos(x, y) / setposition(x, y)", returnType: "None", purpose: "Moves turtle to absolute coordinates (x, y).", usage: "t.goto(100, -50)" },
    { name: "setx(x)", returnType: "None", purpose: "Sets x-coordinate, keeps y unchanged.", usage: "t.setx(200)" },
    { name: "sety(y)", returnType: "None", purpose: "Sets y-coordinate, keeps x unchanged.", usage: "t.sety(150)" },
    { name: "xcor()", returnType: "float", purpose: "Returns current x-coordinate.", usage: "print(t.xcor())" },
    { name: "ycor()", returnType: "float", purpose: "Returns current y-coordinate.", usage: "print(t.ycor())" },
    { name: "pos()", returnType: "(x, y) tuple", purpose: "Returns current position.", usage: "x, y = t.pos()" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Absolute Positioning
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            goto(x, y), setx(), sety() – precise control over turtle coordinates
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🎯 goto(x, y)</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📏 setx() / sety()</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📍 Absolute vs Relative</span>
          </div>
        </div>

        {/* SVG Illustration: goto(x,y) grid */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="360" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Grid lines */}
              {[-200, -100, 0, 100, 200].map(x => (
                <line key={`v${x}`} x1={x + 250} y1="40" x2={x + 250} y2="360" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
              ))}
              {[-150, -50, 50, 150].map(y => (
                <line key={`h${y}`} x1="50" y1={200 - y} x2="450" y2={200 - y} stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
              ))}
              
              {/* Axes */}
              <line x1="50" y1="200" x2="450" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="250" y1="40" x2="250" y2="360" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="440" y="195" fill="#cbd5e1" fontSize="12">X</text>
              <text x="255" y="50" fill="#cbd5e1" fontSize="12">Y</text>
              <circle cx="250" cy="200" r="5" fill="#f97316" />
              <text x="255" y="195" fill="#facc15" fontSize="10">(0,0)</text>
              
              {/* Example points */}
              <circle cx="250" cy="110" r="4" fill="#2dd4bf" />
              <text x="255" y="105" fill="#2dd4bf" fontSize="10">(0, 90)</text>
              
              <circle cx="350" cy="260" r="4" fill="#2dd4bf" />
              <text x="355" y="255" fill="#2dd4bf" fontSize="10">(100, -60)</text>
              
              <circle cx="150" cy="140" r="4" fill="#2dd4bf" />
              <text x="110" y="135" fill="#2dd4bf" fontSize="10">(-100, 60)</text>
              
              {/* Turtle at origin with arrow to (100, -60) */}
              <g transform="translate(250,200)">
                <circle r="12" fill="#14b8a6" fillOpacity="0.5" stroke="#14b8a6" strokeWidth="1.5" />
                <polygon points="15,0 6,-4 6,4" fill="#14b8a6" />
              </g>
              <line x1="250" y1="200" x2="350" y2="260" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowGoto)" strokeDasharray="5,3" />
              <text x="290" y="220" fill="#f97316" fontSize="10">goto(100, -60)</text>
              
              <defs>
                <marker id="arrowGoto" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#f97316" />
                </marker>
              </defs>
              
              <text x="50" y="390" fill="#94a3b8" fontSize="11">goto(x, y) moves directly to absolute coordinates, drawing if pen down</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">goto(x, y) teleports the turtle to absolute coordinates, drawing a line if pen is down</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🎯 Absolute Positioning</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">Unlike relative movement (<code>forward()/backward()</code>), absolute positioning moves the turtle to a specific <strong>(x, y)</strong> coordinate regardless of its current heading. <code>goto(x, y)</code> moves in a straight line to that point, drawing if the pen is down. <code>setx()</code> and <code>sety()</code> change only one coordinate, leaving the other unchanged.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Key Methods</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code>goto(x, y)</code> – move to (x, y).</li>
                  <li><code>setx(x)</code> – change x only (horizontal move).</li>
                  <li><code>sety(y)</code> – change y only (vertical move).</li>
                  <li><code>pos()</code> – get current position.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Why Use Absolute?</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Precise placement (e.g., draw dots at specific grid points).</li>
                  <li>Snap to locations without worrying about heading.</li>
                  <li>Useful for creating patterns, graphs, and pixel art.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world analogy */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🗺️ Real‑world Connection</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">Absolute positioning is like using GPS coordinates: you tell the navigator “go to latitude 22.57, longitude 88.36” (Barrackpore). It doesn’t matter which way you’re facing; you’ll go directly to that spot. In robotics, absolute positioning is used with encoders or GPS; in graphics, it's essential for laying out UI elements or charts.</p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Teacher Tip:</strong> Draw a grid on the floor. Have students stand at (0,0) and call out coordinates like (3,2) – they walk directly to that tile. This kinesthetic activity clarifies absolute vs relative movement.</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={gotoDemo} title="goto_demo.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={setxSetyDemo} title="setx_sety_demo.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={absoluteGrid} title="absolute_grid.py" highlightLines={[8,9,10,11,12]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Absolute Positioning Methods</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Method</th><th>Return</th><th>Purpose</th><th>Example</th></tr>
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
        </section>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Forgetting to lift pen:</strong> <code>goto()</code> draws if pen is down – often draws unwanted lines.</li>
              <li><strong>Confusing order of arguments:</strong> <code>goto(y, x)</code> is a common mistake; remember (x, y).</li>
              <li><strong>Using <code>setx()</code> or <code>sety()</code> when both need to change:</strong> They move only one axis; use <code>goto()</code> for diagonal moves.</li>
              <li><strong>Assuming <code>setx()</code> preserves heading:</strong> It does, but movement is horizontal regardless of heading – the turtle slides sideways.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Always <code>penup()</code> before <code>goto()</code> if you don't want a line.</li>
              <li>Use <code>goto()</code> for teleporting; <code>setx()/sety()</code> for fine‑tuning one axis.</li>
              <li>Store points in a list and iterate for complex shapes.</li>
              <li>Combine with <code>dot()</code> or <code>stamp()</code> to mark positions.</li>
              <li>For drawing graphs, use <code>goto()</code> with calculated (x,y) pairs.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can move the turtle to any (x, y) using goto()",
              "I can change only x with setx() or only y with sety()",
              "I understand that goto() draws if pen is down",
              "I know how to lift the pen before moving without drawing",
              "I can retrieve current coordinates with xcor(), ycor(), pos()",
              "I can use absolute positioning to draw grid patterns"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> What happens if you call <code>goto(100, 100)</code> while the pen is down?</p>
            <p>👉 <strong>Observe:</strong> Use <code>setx(0)</code> from any position – the turtle moves horizontally to the y‑axis.</p>
            <p>👉 <strong>Try changing:</strong> Draw a rectangle using only <code>goto()</code> with four corners.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>Absolute positioning is the foundation of vector graphics and CAD software. When you program a plotter or CNC machine, you often send absolute coordinates (G‑code). Mastering <code>goto()</code> allows you to switch between relative and absolute thinking – a powerful skill for game development, data visualization, and robotics path planning.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Absolute Positioning FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="This topic is a natural bridge to coordinate geometry. Have students plot points of a house (e.g., roof at (0,100), base at (-50,0) and (50,0)) using goto. Emphasize that setx/sety are like moving only horizontally or vertically – great for aligning objects. Warning: goto draws, so always penup first unless you want connecting lines." />
        </div>
      </div>
    </div>
  );
};

export default Topic8;