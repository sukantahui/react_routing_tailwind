import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";

// Import Python files
import positionHeading from "./topic4_files/position_heading.py?raw";
import visibilityDemo from "./topic4_files/visibility_demo.py?raw";
import stampMarkers from "./topic4_files/stamp_markers.py?raw";

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

const Topic4 = () => {
  const prototypes = [
    { name: "position() / pos()", returnType: "(x, y) tuple", purpose: "Returns current coordinates.", usage: "x, y = t.pos()" },
    { name: "xcor()", returnType: "float", purpose: "Returns x-coordinate.", usage: "print(t.xcor())" },
    { name: "ycor()", returnType: "float", purpose: "Returns y-coordinate.", usage: "print(t.ycor())" },
    { name: "heading()", returnType: "float", purpose: "Returns current heading in degrees.", usage: "angle = t.heading()" },
    { name: "showturtle() / st()", returnType: "None", purpose: "Makes turtle visible.", usage: "t.showturtle()" },
    { name: "hideturtle() / ht()", returnType: "None", purpose: "Makes turtle invisible.", usage: "t.hideturtle()" },
    { name: "isvisible()", returnType: "bool", purpose: "Returns True if turtle is visible.", usage: "if t.isvisible(): t.ht()" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Turtle Cursor Behavior
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Position, heading, and visibility – the essential state of the turtle cursor
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📍 Position & Heading</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">👁️ Visibility Control</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🐢 Cursor State</span>
          </div>
        </div>

        {/* SVG Illustration: Turtle with position, heading, visibility */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="280" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Cartesian axes */}
              <line x1="50" y1="160" x2="450" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
              <line x1="250" y1="30" x2="250" y2="280" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
              <text x="430" y="155" fill="#cbd5e1" fontSize="10">X</text>
              <text x="255" y="40" fill="#cbd5e1" fontSize="10">Y</text>
              
              {/* Turtle at (0,0) heading east */}
              <g transform="translate(250, 160)">
                <circle r="20" fill="#2dd4bf" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2" />
                <polygon points="25,0 12,-6 12,6" fill="#14b8a6" />
                <circle r="5" fill="#0f172a" />
                <text x="-15" y="-25" fill="#facc15" fontSize="10">pos = (0,0)</text>
                <text x="30" y="-10" fill="#facc15" fontSize="10">heading = 0° (E)</text>
              </g>

              {/* Visibility toggle example */}
              <g transform="translate(80, 220)">
                <text x="0" y="0" fill="#94a3b8" fontSize="12">showturtle()</text>
                <circle cx="50" cy="-5" r="8" fill="#2dd4bf" />
                <text x="140" y="0" fill="#94a3b8" fontSize="12">hideturtle()</text>
                <circle cx="190" cy="-5" r="0" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" />
                <text x="190" y="15" fill="#f97316" fontSize="9">invisible</text>
              </g>

              {/* Animated arrow showing heading change */}
              <g transform="translate(250, 160)">
                <circle r="30" fill="none" stroke="#2dd4bf" strokeWidth="0.5" strokeDasharray="2,4">
                  <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite" />
                </circle>
                <line x1="0" y1="0" x2="30" y2="0" stroke="#facc15" strokeWidth="1.5">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                </line>
              </g>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Turtle state: position (x,y), heading (angle), visibility (show/hide)</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🐢 Turtle Cursor State</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">Every turtle maintains three fundamental pieces of state: its <strong>position</strong> on the Cartesian plane, its <strong>heading</strong> (direction it faces), and its <strong>visibility</strong> (whether the cursor icon is shown). These attributes determine how the turtle moves and draws.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-300">📍 Position</h3>
                <p className="text-sm">Current (x, y) coordinates. Use <code>pos()</code>, <code>xcor()</code>, <code>ycor()</code>.</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-300">🧭 Heading</h3>
                <p className="text-sm">Direction in degrees (0° east, 90° north). Use <code>heading()</code>.</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400">👁️ Visibility</h3>
                <p className="text-sm">Show or hide cursor with <code>showturtle()</code> / <code>hideturtle()</code>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={positionHeading} title="position_heading.py" highlightLines={[6,7,8,9,10,11]} />
          <PythonFileLoader fileModule={visibilityDemo} title="visibility_demo.py" highlightLines={[6,12,16,18,20]} />
          <PythonFileLoader fileModule={stampMarkers} title="stamp_markers.py" highlightLines={[8,9,10,13]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Essential Methods & Functions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Method</th><th>Return Type</th><th>Purpose</th><th>Example</th></tr>
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
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Assuming heading 0 is up:</strong> Default is east (right). Use <code>setheading(90)</code> for up.</li>
              <li><strong>Forgetting that visibility does not affect drawing:</strong> Hidden turtles still draw if pen is down.</li>
              <li><strong>Using <code>pos()</code> as a setter:</strong> It's a getter; use <code>goto()</code> or <code>setpos()</code> to change position.</li>
              <li><strong>Misreading heading after turns:</strong> <code>left()</code> and <code>right()</code> are relative; <code>heading()</code> returns absolute angle.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Store position before complex moves: <code>old_pos = t.pos()</code>.</li>
              <li>Use <code>t.hideturtle()</code> for final art presentation.</li>
              <li>Print heading after each turn when debugging.</li>
              <li>Combine <code>isvisible()</code> with toggle: <code>if t.isvisible(): t.ht() else: t.st()</code>.</li>
              <li>Use <code>t.setheading()</code> for absolute direction changes.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can get the turtle's current position using `pos()`, `xcor()`, `ycor()`",
              "I can get the heading using `heading()`",
              "I can hide the turtle cursor using `hideturtle()` or `ht()`",
              "I can show the turtle cursor using `showturtle()` or `st()`",
              "I know that hiding does not stop drawing",
              "I understand the difference between relative and absolute heading"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> Why would you hide the turtle while drawing a complex pattern?</p>
            <p>👉 <strong>Observe:</strong> Run a loop that moves and prints <code>pos()</code> each step – see the x,y change.</p>
            <p>👉 <strong>Try changing:</strong> Hide the turtle, draw a square, then show it again – what happens?</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>Professional animations often hide the turtle for performance and aesthetics. They also use visibility toggles as a visual cue: turtle appears only when waiting for user input. Mastering state queries lets you write adaptive code (e.g., "if at edge, turn around").</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Turtle Cursor Behavior FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <Teacher note="At this point, students often confuse visibility with pen state. Emphasize: hideturtle() makes the icon invisible, but drawing continues. Use a physical analogy: you can hide the pencil's cursor, but it still draws if it touches paper. Have students create a 'disappearing artist' program where the turtle draws a picture and then hides itself at the end." />
        </div>
      </div>
    </div>
  );
};

export default Topic4;