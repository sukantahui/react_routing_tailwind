import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";

// Import Python files from topic1_files
import coordDemo from "./topic1_files/coord_demo.py?raw";
import quadrantDraw from "./topic1_files/quadrant_draw.py?raw";
import gotoDemo from "./topic1_files/goto_demo.py?raw";

// Inline keyframes
const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes softGlow {
  0%, 100% { box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
  50% { box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
}
`;

const Topic1 = () => {
  // Prototype table data
  const prototypes = [
    { name: "turtle.Screen()", returnType: "Screen object", purpose: "Creates and returns the drawing canvas.", usage: "screen = turtle.Screen()" },
    { name: "setup(width, height)", returnType: "None", purpose: "Sets size and position of main window.", usage: "turtle.setup(800, 600)" },
    { name: "screensize(canvwidth, canvheight)", returnType: "None", purpose: "Sets scrollable canvas area.", usage: "turtle.screensize(1000, 800)" },
    { name: "setworldcoordinates(llx, lly, urx, ury)", returnType: "None", purpose: "User-defined coordinate system.", usage: "turtle.setworldcoordinates(-500, -500, 500, 500)" },
    { name: "xcor()", returnType: "float", purpose: "Returns current x-coordinate.", usage: "print(t.xcor())" },
    { name: "ycor()", returnType: "float", purpose: "Returns current y-coordinate.", usage: "print(t.ycor())" },
    { name: "position() / pos()", returnType: "(x, y) tuple", purpose: "Returns current position vector.", usage: "x, y = t.pos()" },
    { name: "goto(x, y)", returnType: "None", purpose: "Move turtle to absolute (x, y).", usage: "t.goto(100, -50)" }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            The Turtle Screen: Canvas & Coordinates
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cartesian plane, origin (0,0), quadrants – the foundation of all turtle drawings
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📐 Cartesian Coordinates</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🎯 Origin (0,0)</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🖥️ Screen & Canvas</span>
          </div>
        </div>

        {/* SVG: Cartesian plane with quadrants and origin */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="400" viewBox="-250 -200 500 400" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              {/* Background */}
              <rect x="-250" y="-200" width="500" height="400" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="8" />
              {/* Axes */}
              <line x1="-220" y1="0" x2="220" y2="0" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="0" y1="-170" x2="0" y2="170" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#94a3b8" />
                </marker>
              </defs>
              {/* Quadrant labels */}
              <text x="100" y="-80" fill="#cbd5e1" fontSize="14" fontWeight="bold">Quadrant I (+, +)</text>
              <text x="-180" y="-80" fill="#cbd5e1" fontSize="14">Quadrant II (-, +)</text>
              <text x="-180" y="100" fill="#cbd5e1" fontSize="14">Quadrant III (-, -)</text>
              <text x="100" y="100" fill="#cbd5e1" fontSize="14">Quadrant IV (+, -)</text>
              {/* Origin */}
              <circle cx="0" cy="0" r="5" fill="#f97316" />
              <text x="8" y="-8" fill="#facc15" fontSize="12">Origin (0,0)</text>
              {/* Sample points */}
              <circle cx="120" cy="-90" r="3" fill="#2dd4bf" />
              <text x="125" y="-95" fill="#2dd4bf" fontSize="10">(120, -90)</text>
              <circle cx="-100" cy="80" r="3" fill="#2dd4bf" />
              <text x="-95" y="75" fill="#2dd4bf" fontSize="10">(-100, 80)</text>
              {/* Animated point */}
              <circle cx="0" cy="0" r="5" fill="#f97316">
                <animate attributeName="cx" values="0;80;0;-80;0" dur="6s" repeatCount="indefinite" />
                <animate attributeName="cy" values="0;-60;0;60;0" dur="6s" repeatCount="indefinite" />
              </circle>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Cartesian plane with four quadrants, axes, and origin (0,0)</p>
          </div>
        </div>

        {/* Explanation Section */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📐 The Cartesian Coordinate System</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">The turtle screen is a <strong>2D Cartesian plane</strong> where every point has an <strong>(x, y)</strong> coordinate. The center of the screen is the <strong>origin (0,0)</strong>. Positive x moves right, negative x left; positive y moves up, negative y down. This is the same coordinate system used in algebra, geometry, game development, and computer graphics.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Key Properties</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Origin (0,0):</strong> Starting position of the turtle.</li>
                  <li><strong>X-axis:</strong> Horizontal line (y=0).</li>
                  <li><strong>Y-axis:</strong> Vertical line (x=0).</li>
                  <li><strong>Quadrants:</strong> Four regions divided by axes.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Why It Matters</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Precise positioning with <code>goto(x, y)</code>.</li>
                  <li>Symmetry, patterns, and geometric transformations.</li>
                  <li>Real-world mapping, robotics, and game levels.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Screen Configuration */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🖥️ Screen & Canvas Setup</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-gray-800/40 rounded-xl p-4 hover:shadow-lg transition">
              <h3 className="text-lg font-medium">turtle.setup(width, height, startx, starty)</h3>
              <p>Defines the main window size and position. Default width = 50% of screen. Example: <code className="bg-gray-700 px-1">turtle.setup(800, 600)</code></p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-4 hover:shadow-lg transition">
              <h3 className="text-lg font-medium">turtle.screensize(canvwidth, canvheight)</h3>
              <p>Sets the scrollable canvas area (larger than window). Example: <code className="bg-gray-700 px-1">turtle.screensize(2000, 2000)</code></p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-4 hover:shadow-lg transition">
              <h3 className="text-lg font-medium">turtle.setworldcoordinates(llx, lly, urx, ury)</h3>
              <p>Redefines coordinate system. Example: bottom-left (-500,-500), top-right (500,500).</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-4 hover:shadow-lg transition">
              <h3 className="text-lg font-medium">turtle.bgcolor(color)</h3>
              <p>Sets background color of the canvas. Example: <code className="bg-gray-700 px-1">turtle.bgcolor("lightblue")</code></p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={coordDemo} title="coord_demo.py" highlightLines={[6,7,8,9]} />
          <PythonFileLoader fileModule={quadrantDraw} title="quadrant_draw.py" highlightLines={[10,11,12,13,14,15]} />
          <PythonFileLoader fileModule={gotoDemo} title="goto_demo.py" highlightLines={[8,9,10,11]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Essential Commands (Prototypes)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Function/Method</th><th>Return Type</th><th>Purpose</th><th>Example</th></tr>
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
              <li><strong>Mixing screen size and canvas size:</strong> Use <code>setup()</code> for window, <code>screensize()</code> for scrollable area.</li>
              <li><strong>Assuming (0,0) is top-left:</strong> It’s center, like standard math coordinates.</li>
              <li><strong>Negative coordinates confusion:</strong> Negative x goes left, negative y goes down.</li>
              <li><strong>Forgetting to call <code>turtle.Screen()</code></strong> before using screen methods.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Store the screen object: <code>screen = turtle.Screen()</code></li>
              <li>Set coordinate system early (e.g., <code>setworldcoordinates</code>) for predictable ranges.</li>
              <li>Use <code>turtle.mode("logo")</code> if you prefer 0° up.</li>
              <li>Print <code>t.pos()</code> when debugging movement.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can identify the four quadrants and their signs (+,+) etc.",
              "I know the origin (0,0) is at the center of the screen",
              "I can use `goto(x, y)` to move to any point",
              "I understand the difference between `setup()` and `screensize()`",
              "I can change the background color with `bgcolor()`",
              "I can retrieve current coordinates with `xcor()`, `ycor()`"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> How would you draw a symmetric pattern across the y-axis?</p>
            <p>👉 <strong>Observe:</strong> What happens when you pass negative values to `goto()`?</p>
            <p>👉 <strong>Try changing:</strong> The background color and see how it affects contrast.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In robotics and game dev, coordinates are absolute positions in the world. The turtle’s screen is a mini world. Thinking in (x, y) from the start will accelerate your problem-solving for any 2D space.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Turtle Screen & Coordinates FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="Help students connect math class to coding. Draw physical axes on the floor or paper: let a student be the 'turtle' and walk to (3,2) etc. This kinesthetic activity builds strong intuition. Always start with small coordinates (e.g., ±200) so drawings fit on screen." />
        </div>
      </div>
    </div>
  );
};

export default Topic1;