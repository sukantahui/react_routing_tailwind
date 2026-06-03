import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";

// Import Python files
import square from "./topic11_files/square.py?raw";
import rectangle from "./topic11_files/rectangle.py?raw";
import triangle from "./topic11_files/triangle.py?raw";
import shapesFunction from "./topic11_files/shapes_function.py?raw";

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

const Topic11 = () => {
  const prototypes = [
    { name: "forward(distance)", returnType: "None", purpose: "Draw side of shape.", usage: "t.forward(100)" },
    { name: "right(angle)", returnType: "None", purpose: "External turn (clockwise).", usage: "t.right(90)  # square corner" },
    { name: "left(angle)", returnType: "None", purpose: "External turn (counter‑clockwise).", usage: "t.left(120) # triangle" },
    { name: "begin_fill() / end_fill()", returnType: "None", purpose: "Fill shape with color.", usage: "t.begin_fill() ... t.end_fill()" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Basic Geometric Shapes
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Square, Rectangle, Triangle – step‑by‑step logic and geometry
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⬛ Square</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📏 Rectangle</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔺 Triangle</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🎨 Filled Shapes</span>
          </div>
        </div>

        {/* SVG Illustration: Three shapes side by side */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="280" viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="240" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Square */}
              <rect x="50" y="50" width="100" height="100" fill="#2dd4bf" fillOpacity="0.4" stroke="#14b8a6" strokeWidth="2" />
              <text x="100" y="180" fill="#2dd4bf" fontSize="12" textAnchor="middle">Square</text>
              <text x="100" y="195" fill="#94a3b8" fontSize="9" textAnchor="middle">4 sides equal</text>
              <text x="100" y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">90° turns</text>
              
              {/* Rectangle */}
              <rect x="200" y="70" width="120" height="60" fill="#f97316" fillOpacity="0.4" stroke="#f97316" strokeWidth="2" />
              <text x="260" y="180" fill="#f97316" fontSize="12" textAnchor="middle">Rectangle</text>
              <text x="260" y="195" fill="#94a3b8" fontSize="9" textAnchor="middle">opposite sides equal</text>
              <text x="260" y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">90° turns</text>
              
              {/* Equilateral Triangle */}
              <polygon points="380,150 430,60 480,150" fill="#f43f5e" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="2" />
              <text x="430" y="180" fill="#f43f5e" fontSize="12" textAnchor="middle">Triangle</text>
              <text x="430" y="195" fill="#94a3b8" fontSize="9" textAnchor="middle">3 sides</text>
              <text x="430" y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">120° turns (ext.)</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Basic geometric shapes: square, rectangle, and equilateral triangle</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📐 Step‑by‑Step Logic</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">All regular polygons are drawn by repeating two steps: <strong>move forward</strong> (side length) and <strong>turn</strong> (external angle). The external angle = 360° / number of sides. For squares/rectangles, external angle = 90°. For equilateral triangle, external angle = 120°.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-300">Square</h3>
                <ul className="text-sm list-disc pl-4">
                  <li>4 sides, all equal.</li>
                  <li>External angle = 90°.</li>
                  <li>Loop 4 times: forward(side), right(90).</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-300">Rectangle</h3>
                <ul className="text-sm list-disc pl-4">
                  <li>4 sides, opposite sides equal.</li>
                  <li>External angle = 90°.</li>
                  <li>Repeat: forward(length), right(90), forward(width), right(90).</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400">Equilateral Triangle</h3>
                <ul className="text-sm list-disc pl-4">
                  <li>3 sides, all equal.</li>
                  <li>External angle = 120°.</li>
                  <li>Loop 3 times: forward(side), right(120).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Geometry box */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🧮 The Math Behind Turns</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">The sum of external angles of any polygon = 360°. So external angle = 360 / n, where n = number of sides. For a square: 360/4 = 90°. For an equilateral triangle: 360/3 = 120°. This works for any regular polygon (e.g., pentagon 72°, hexagon 60°).</p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Teacher Tip:</strong> Have students verify with a piece of paper: tear off a corner of a square – the external angle is 90°. Walk around a triangle – you turn 120° at each corner to face the next side.</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={square} title="square.py" highlightLines={[6,7,8,9]} />
          <PythonFileLoader fileModule={rectangle} title="rectangle.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={triangle} title="triangle.py" highlightLines={[6,7,8,9]} />
          <PythonFileLoader fileModule={shapesFunction} title="shapes_function.py" highlightLines={[6,7,8,9,10,11,12,13,14,15]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Key Commands for Shapes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Command</th><th>Use in Shape</th><th>Example</th></tr>
              </thead>
              <tbody>
                {prototypes.map((p, idx) => (
                  <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/30 transition">
                    <td className="px-4 py-2 font-mono text-emerald-300">{p.name}</td>
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
              <li><strong>Internal vs external angle confusion:</strong> Use external (turn angle) = 360/n.</li>
              <li><strong>Forgetting to lift pen before moving to a new shape:</strong> Creates unwanted connecting lines.</li>
              <li><strong>Incorrect loop count:</strong> n sides = n iterations.</li>
              <li><strong>Using degrees when in radians mode:</strong> Shapes become distorted.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Write a reusable function: <code>def square(size): ...</code>.</li>
              <li>Use variables for side lengths and colors.</li>
              <li>Fill shapes with <code>begin_fill()</code> and <code>end_fill()</code>.</li>
              <li>For rectangles, store length and width in clear variable names.</li>
              <li>Test with smaller side lengths first to ensure correct logic.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can draw a square of any size using a loop",
              "I can draw a rectangle with specified length and width",
              "I can draw an equilateral triangle (external angle 120°)",
              "I understand that external angle = 360 / number of sides",
              "I can fill shapes with color using begin_fill()/end_fill()",
              "I can combine shapes to make a simple drawing (e.g., house)"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> Why does changing the loop count from 4 to 3 draw a triangle, but angles must change too?</p>
            <p>👉 <strong>Observe:</strong> What happens if you use <code>left(90)</code> instead of <code>right(90)</code>? The shape draws in opposite orientation.</p>
            <p>👉 <strong>Try changing:</strong> Draw a square, then a bigger square around it – you've made a frame!</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>Understanding polygon drawing with external angles is the foundation for generating any regular polygon procedurally. In game development, these same loops are used to create collision boundaries, vision cones, and pathfinding waypoints. Mastering these basic shapes unlocks the ability to draw complex structures like stars, spirals, and even synthetic terrains.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Basic Geometric Shapes FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="Start with tangible examples: have students walk a square on the floor (4 steps forward, turn 90°, repeat). Then draw on paper. Then code. Emphasize that the computer doesn't guess – we must tell it exactly the turn angle. For rectangle, discuss why two `forward` lengths are different. Let students like Debangshu and Tuhina create a 'shape gallery' – multiple shapes in one script using functions. This fosters modular thinking." />
        </div>
      </div>
    </div>
  );
};

export default Topic11;