import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";

// Import Python files
import relativeVsAbsolute from "./topic9_files/relative_vs_absolute.py?raw";
import houseComparison from "./topic9_files/house_comparison.py?raw";
import gridVsPath from "./topic9_files/grid_vs_path.py?raw";

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

const Topic9 = () => {
  const prototypes = [
    { name: "forward(distance) / fd()", returnType: "None", purpose: "Relative: moves forward in current heading.", usage: "t.forward(100)" },
    { name: "backward(distance) / bk()", returnType: "None", purpose: "Relative: moves backward opposite heading.", usage: "t.backward(50)" },
    { name: "left(angle) / lt()", returnType: "None", purpose: "Relative: rotates CCW by angle.", usage: "t.left(90)" },
    { name: "right(angle) / rt()", returnType: "None", purpose: "Relative: rotates CW by angle.", usage: "t.right(45)" },
    { name: "goto(x, y) / setpos()", returnType: "None", purpose: "Absolute: moves to specific coordinates.", usage: "t.goto(100, -50)" },
    { name: "setx(x)", returnType: "None", purpose: "Absolute: sets x-coordinate, keeps y.", usage: "t.setx(200)" },
    { name: "sety(y)", returnType: "None", purpose: "Absolute: sets y-coordinate, keeps x.", usage: "t.sety(150)" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Relative vs Absolute Movement
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the difference, when to use each, and how they work together
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔄 Relative (forward/back/left/right)</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📍 Absolute (goto/setx/sety)</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⚖️ Combined Power</span>
          </div>
        </div>

        {/* SVG Illustration: Compare relative vs absolute path */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="420" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="380" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Left side: Relative movement example */}
              <text x="145" y="45" fill="#2dd4bf" fontSize="14" fontWeight="bold">Relative Movement</text>
              <g transform="translate(50, 70)">
                {/* Turtle at start */}
                <circle cx="50" cy="100" r="8" fill="#14b8a6" />
                <polygon points="65,100 58,94 58,106" fill="#14b8a6" />
                <text x="40" y="85" fill="#94a3b8" fontSize="9">Start</text>
                
                {/* Path: forward 80, right 90, forward 60, left 90, forward 40 */}
                <line x1="50" y1="100" x2="130" y2="100" stroke="#f97316" strokeWidth="2" />
                <line x1="130" y1="100" x2="130" y2="40" stroke="#f97316" strokeWidth="2" />
                <line x1="130" y1="40" x2="170" y2="40" stroke="#f97316" strokeWidth="2" />
                <line x1="170" y1="40" x2="170" y2="80" stroke="#f97316" strokeWidth="2" />
                
                <text x="80" y="95" fill="#f97316" fontSize="8">fd(80)</text>
                <text x="135" y="70" fill="#f97316" fontSize="8">rt(90)</text>
                <text x="140" y="35" fill="#f97316" fontSize="8">fd(60)</text>
                <text x="145" y="60" fill="#f97316" fontSize="8">lt(90)</text>
                <circle cx="170" cy="80" r="6" fill="#facc15" />
                <text x="175" y="85" fill="#facc15" fontSize="9">End</text>
              </g>
              
              {/* Right side: Absolute movement example */}
              <text x="360" y="45" fill="#2dd4bf" fontSize="14" fontWeight="bold">Absolute Movement</text>
              <g transform="translate(250, 70)">
                {/* Grid dots */}
                {[-40, 0, 40, 80, 120].map(x => (
                  [60, 100, 140, 180].map(y => (
                    <circle key={`${x}${y}`} cx={110 + x} cy={y} r="2" fill="#475569" />
                  ))
                ))}
                <line x1="70" y1="60" x2="230" y2="60" stroke="#334155" strokeWidth="0.5" />
                <line x1="70" y1="100" x2="230" y2="100" stroke="#334155" strokeWidth="0.5" />
                <line x1="70" y1="140" x2="230" y2="140" stroke="#334155" strokeWidth="0.5" />
                <line x1="70" y1="180" x2="230" y2="180" stroke="#334155" strokeWidth="0.5" />
                
                {/* Start and jump points */}
                <circle cx="110" cy="140" r="8" fill="#14b8a6" />
                <text x="100" y="130" fill="#94a3b8" fontSize="8">Start</text>
                
                <line x1="110" y1="140" x2="190" y2="100" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="190" cy="100" r="6" fill="#f97316" />
                <text x="195" y="95" fill="#f97316" fontSize="8">1</text>
                
                <line x1="190" y1="100" x2="150" y2="60" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="150" cy="60" r="6" fill="#f97316" />
                <text x="140" y="55" fill="#f97316" fontSize="8">2</text>
                
                <line x1="150" y1="60" x2="210" y2="180" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="210" cy="180" r="6" fill="#facc15" />
                <text x="215" y="185" fill="#facc15" fontSize="9">End</text>
                
                <text x="120" y="210" fill="#f43f5e" fontSize="8">goto(80,-40)</text>
                <text x="90" y="225" fill="#f43f5e" fontSize="8">goto(40,-80)</text>
                <text x="100" y="240" fill="#f43f5e" fontSize="8">goto(100,40)</text>
              </g>
              
              <text x="50" y="380" fill="#94a3b8" fontSize="11">Relative: depends on heading & previous position | Absolute: independent of heading, fixed coordinates</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Relative movement (left) chains commands; absolute (right) jumps to coordinates</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔄 Two Ways to Move</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed"><strong>Relative movement</strong> changes position based on the turtle's current heading and location (<code>forward/backward/left/right</code>). <strong>Absolute movement</strong> moves to exact coordinates regardless of heading (<code>goto/setx/sety</code>). Both are essential; choosing the right one depends on the problem.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Relative (Body‑centric)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Commands: <code>forward()</code>, <code>backward()</code>, <code>left()</code>, <code>right()</code>.</li>
                  <li>Depends on current heading.</li>
                  <li>Great for polygons, spirals, and recurring patterns.</li>
                  <li>Analogous: "walk forward 3 steps, turn left"</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Absolute (World‑centric)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Commands: <code>goto()</code>, <code>setx()</code>, <code>sety()</code>.</li>
                  <li>Independent of heading.</li>
                  <li>Ideal for grids, plotting points, and teleporting.</li>
                  <li>Analogous: "go to coordinates (10,5) on a map"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Analogy: Directions vs GPS */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🗺️ Real‑world Analogies</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="font-semibold text-emerald-300">Relative: Walking Directions</p>
                <p>"Walk 100 meters forward, turn right, walk 50 meters" – depends on where you're facing.</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="font-semibold text-cyan-300">Absolute: GPS Coordinates</p>
                <p>"Go to latitude 22.57, longitude 88.36" – works regardless of your current direction.</p>
              </div>
            </div>
            <p className="mt-3 text-gray-400 text-sm">In Barrackpore, telling a friend "go to the clock tower" is absolute; "walk towards the station and turn left" is relative.</p>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={relativeVsAbsolute} title="relative_vs_absolute.py" highlightLines={[8,9,10,11,12,13]} />
          <PythonFileLoader fileModule={houseComparison} title="house_comparison.py" highlightLines={[8,9,10,11,12,13]} />
          <PythonFileLoader fileModule={gridVsPath} title="grid_vs_path.py" highlightLines={[8,9,10,11,12,13]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Movement Methods Compared</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Method</th><th>Type</th><th>Depends On</th><th>Example</th></tr>
              </thead>
              <tbody>
                {prototypes.map((p, idx) => (
                  <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/30 transition">
                    <td className="px-4 py-2 font-mono text-emerald-300">{p.name}</td>
                    <td className="px-4 py-2 text-center">{p.returnType === "None" ? (p.name.includes("goto") ? "Absolute" : "Relative") : "N/A"}</td>
                    <td className="px-4 py-2">{p.purpose.split(":")[0]}</td>
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
              <li><strong>Confusing current heading with world axes:</strong> Relative movement always respects heading; absolute ignores it.</li>
              <li><strong>Using relative when absolute is simpler:</strong> Drawing a grid with forward/back is messy; use goto.</li>
              <li><strong>Assuming <code>goto()</code> changes heading:</strong> It doesn't–the turtle still faces original direction.</li>
              <li><strong>Mixing relative and absolute without resetting position:</strong> Can lead to unexpected offsets.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>For regular polygons/spirals → relative.</li>
              <li>For dot grids, charts, or predefined points → absolute.</li>
              <li>Store the turtle's starting position if you need to return after relative moves.</li>
              <li>Combine both: use relative for shape outlines, absolute to reposition.</li>
              <li>When debugging, print current position and heading to understand which mode you're in.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can explain the difference between relative and absolute movement",
              "I know that forward/back/left/right are relative to current heading",
              "I know that goto/setx/sety are absolute (world coordinates)",
              "I can choose the right approach for a given drawing task",
              "I can mix relative and absolute commands in a single program",
              "I understand that heading does not affect absolute positioning"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> If you need to draw a star at five different screen locations, would you use relative or absolute?</p>
            <p>👉 <strong>Observe:</strong> Run a program that draws a square with relative moves, then another that draws the same square with absolute coordinates.</p>
            <p>👉 <strong>Try changing:</strong> Insert a <code>setheading(45)</code> before relative commands – see how the shape rotates; absolute remains same.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>Professional graphics libraries (e.g., Cairo, SVG) support both relative and absolute path commands. Being fluent in both allows you to write more modular code. Relative is great for reusable “drawing procedures” (functions) that can be called from any location. Absolute is essential for layout and positioning UI elements.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Relative vs Absolute Movement FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="This is a pivotal concept. Use two whiteboard diagrams: one showing a turtle at (0,0) facing east; relative commands: forward 100 → (100,0); left 90 → heading north. Compare with absolute: goto(100,100). Have students predict outcomes. Then let them write a program that draws the same shape using both methods – they will internalize the difference." />
        </div>
      </div>
    </div>
  );
};

export default Topic9;