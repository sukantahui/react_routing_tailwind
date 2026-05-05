import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";

// Import Python files
import basicRotation from "./topic6_files/basic_rotation.py?raw";
import setheadingDemo from "./topic6_files/setheading_demo.py?raw";
import degreesRadians from "./topic6_files/degrees_radians.py?raw";

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

const Topic6 = () => {
  const prototypes = [
    { name: "left(angle) / lt(angle)", returnType: "None", purpose: "Turns turtle counter-clockwise by angle degrees.", usage: "t.left(90)" },
    { name: "right(angle) / rt(angle)", returnType: "None", purpose: "Turns turtle clockwise by angle degrees.", usage: "t.right(45)" },
    { name: "setheading(angle) / seth(angle)", returnType: "None", purpose: "Sets absolute heading (0° east, 90° north).", usage: "t.setheading(180)" },
    { name: "heading()", returnType: "float", purpose: "Returns current heading in degrees.", usage: "print(t.heading())" },
    { name: "degrees()", returnType: "None", purpose: "Set angle measurement unit to degrees (default).", usage: "turtle.degrees()" },
    { name: "radians()", returnType: "None", purpose: "Set angle measurement unit to radians.", usage: "turtle.radians()" },
    { name: "mode(mode)", returnType: "str", purpose: "Set heading mode: 'standard' (0° east) or 'logo' (0° north).", usage: "turtle.mode('logo')" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Rotation Control
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            left(), right(), setheading(), and understanding degrees vs angles
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔄 left() / lt()</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔁 right() / rt()</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🎯 setheading() / seth()</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📐 Degrees vs Radians</span>
          </div>
        </div>

        {/* SVG Illustration: Rotation directions */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="360" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Compass circle */}
              <circle cx="250" cy="200" r="120" fill="none" stroke="#334155" strokeWidth="1" />
              <circle cx="250" cy="200" r="5" fill="#f97316" />
              
              {/* Direction labels */}
              <text x="245" y="70" fill="#2dd4bf" fontSize="14" fontWeight="bold">N (90°)</text>
              <text x="380" y="205" fill="#2dd4bf" fontSize="14">E (0°)</text>
              <text x="110" y="205" fill="#2dd4bf" fontSize="14">W (180°)</text>
              <text x="245" y="340" fill="#2dd4bf" fontSize="14">S (270°)</text>
              
              {/* Turtle at center */}
              <g transform="translate(250,200)">
                <circle r="18" fill="#14b8a6" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2" />
                <polygon points="25,0 12,-6 12,6" fill="#14b8a6" />
                <text x="30" y="-5" fill="#facc15" fontSize="10">heading 0°</text>
              </g>
              
              {/* Left rotation arc (counter-clockwise) */}
              <path d="M 250 80 A 120 120 0 0 1 370 200" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
              <text x="330" y="120" fill="#f97316" fontSize="11">left(90) = +90°</text>
              <polygon points="360,130 365,120 355,120" fill="#f97316" />
              
              {/* Right rotation arc (clockwise) */}
              <path d="M 250 320 A 120 120 0 0 1 130 200" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,5" />
              <text x="140" y="280" fill="#f43f5e" fontSize="11">right(90) = -90°</text>
              <polygon points="145,280 140,290 150,290" fill="#f43f5e" />
              
              {/* Animated rotating arrow */}
              <g transform="translate(250,200)">
                <line x1="0" y1="0" x2="80" y2="0" stroke="#facc15" strokeWidth="1.5">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
                </line>
              </g>
              
              <text x="50" y="380" fill="#94a3b8" fontSize="11">left() = counter-clockwise (CCW)   |   right() = clockwise (CW)</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">left() increases heading (CCW), right() decreases heading (CW)</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔄 Rotation Methods</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">Turtle rotation controls the direction the turtle faces. <code>left(angle)</code> rotates counter-clockwise, <code>right(angle)</code> rotates clockwise. Both are <strong>relative</strong> to current heading. <code>setheading(angle)</code> sets an <strong>absolute</strong> heading (0° east by default). Understanding degrees (0-360) vs radians (0-2π) is crucial for precise control.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-300">left(angle)</h3>
                <p className="text-sm">Adds angle to heading (CCW). Alias: <code>lt()</code>.</p>
                <code className="text-xs">t.left(90)  # north from east</code>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-300">right(angle)</h3>
                <p className="text-sm">Subtracts angle from heading (CW). Alias: <code>rt()</code>.</p>
                <code className="text-xs">t.right(45)  # south-east from east</code>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400">setheading(angle)</h3>
                <p className="text-sm">Absolute heading. Alias: <code>seth()</code>.</p>
                <code className="text-xs">t.setheading(180)  # west</code>
              </div>
            </div>
          </div>
        </section>

        {/* Angle Units */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📐 Degrees vs Radians</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">By default, turtle uses <strong>degrees</strong> (0–360). You can switch to radians using <code>turtle.radians()</code>. Radians are natural for trigonometric functions. Use <code>turtle.degrees()</code> to switch back.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <h3 className="text-md font-semibold">Degrees</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>0° = East, 90° = North, 180° = West, 270° = South</li>
                  <li><code>t.left(90)</code> = quarter turn CCW</li>
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold">Radians</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>0 = East, π/2 = North, π = West, 3π/2 = South</li>
                  <li><code>t.left(math.pi/2)</code> = same as 90°</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={basicRotation} title="basic_rotation.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={setheadingDemo} title="setheading_demo.py" highlightLines={[6,7,8,9]} />
          <PythonFileLoader fileModule={degreesRadians} title="degrees_radians.py" highlightLines={[6,7,8,9,10,11,12]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Rotation Method Prototypes</h2>
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
              <li><strong>Confusing left/right with turning direction:</strong> left is counter-clockwise, right is clockwise.</li>
              <li><strong>Using degrees when in radians mode:</strong> Results in huge turns (e.g., left(90) in radians = 90 radians ≈ 5156°).</li>
              <li><strong>Assuming setheading(0) points up:</strong> Default is east; use <code>turtle.mode('logo')</code> for north-up.</li>
              <li><strong>Expecting setheading to accept radians:</strong> It always uses current angle unit (degrees or radians).</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Use <code>left()/right()</code> for relative turns (e.g., polygons).</li>
              <li>Use <code>setheading()</code> for absolute orientation.</li>
              <li>Store current heading before complex moves: <code>old_h = t.heading()</code>.</li>
              <li>Explicitly set angle unit at start: <code>turtle.degrees()</code>.</li>
              <li>For trigonometry, switch to radians temporarily.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can turn left using `left(angle)` or `lt(angle)`",
              "I can turn right using `right(angle)` or `rt(angle)`",
              "I can set absolute heading using `setheading(angle)` or `seth(angle)`",
              "I understand left = counter-clockwise, right = clockwise",
              "I know the difference between degrees and radians",
              "I can switch modes with `degrees()` and `radians()`"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> What happens if you call <code>left(361)</code>? Heading becomes 1° after wrapping.</p>
            <p>👉 <strong>Observe:</strong> Run <code>t.setheading(400)</code> – heading becomes 40° (mod 360).</p>
            <p>👉 <strong>Try changing:</strong> Switch to radians and draw a circle using <code>left(math.pi/180)</code> repeatedly.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In robotics, rotation commands are fundamental: `left()` and `right()` are like differential steering. `setheading()` is like a compass reset. Mastering relative vs absolute rotation is key to autonomous navigation. Also, radians are standard in math libraries – knowing both units is a professional skill.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Rotation Control FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="Use physical movement: have a student stand and turn left/right. Then introduce setheading with compass directions. Demonstrate the difference by drawing a polygon: left(90) vs setheading(90) inside a loop. Emphasize that left/right are cumulative, setheading is absolute. Also warn about degrees/radians confusion – a classic bug." />
        </div>
      </div>
    </div>
  );
};

export default Topic6;