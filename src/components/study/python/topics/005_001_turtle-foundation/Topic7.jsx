import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";

// Import Python files
import compassDemo from "./topic7_files/compass_demo.py?raw";
import headingSquare from "./topic7_files/heading_square.py?raw";
import setheadingTarget from "./topic7_files/setheading_target.py?raw";

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

const Topic7 = () => {
  const prototypes = [
    { name: "heading()", returnType: "float", purpose: "Returns current heading in degrees (0–360).", usage: "angle = t.heading()" },
    { name: "setheading(to_angle) / seth(to_angle)", returnType: "None", purpose: "Sets absolute heading to given angle.", usage: "t.setheading(90)" },
    { name: "left(angle) / lt(angle)", returnType: "None", purpose: "Adds angle to heading (counter-clockwise).", usage: "t.left(90)" },
    { name: "right(angle) / rt(angle)", returnType: "None", purpose: "Subtracts angle from heading (clockwise).", usage: "t.right(45)" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Heading Direction: The Compass Analogy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding 0°, 90°, 180°, 270° and the four cardinal directions
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🧭 0° = East</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⬆️ 90° = North</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⬅️ 180° = West</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⬇️ 270° = South</span>
          </div>
        </div>

        {/* SVG Illustration: Compass Rose with Turtle */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="450" viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="410" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Compass circle */}
              <circle cx="250" cy="220" r="140" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <circle cx="250" cy="220" r="135" fill="none" stroke="#475569" strokeWidth="1" />
              
              
              <line x1="250" y1="80" x2="250" y2="360" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="110" y1="220" x2="390" y2="220" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,4" />
              
             
              <text x="245" y="75" fill="#2dd4bf" fontSize="18" fontWeight="bold">N (90°)</text>
              <text x="395" y="225" fill="#2dd4bf" fontSize="18" fontWeight="bold">E (0°)</text>
              <text x="105" y="225" fill="#2dd4bf" fontSize="18" fontWeight="bold">W (180°)</text>
              <text x="245" y="375" fill="#2dd4bf" fontSize="18" fontWeight="bold">S (270°)</text>
              
             
              <text x="340" y="115" fill="#94a3b8" fontSize="12">NE (45°)</text>
              <text x="140" y="115" fill="#94a3b8" fontSize="12">NW (135°)</text>
              <text x="340" y="340" fill="#94a3b8" fontSize="12">SE (315°)</text>
              <text x="140" y="340" fill="#94a3b8" fontSize="12">SW (225°)</text>
              
              
              <g transform="translate(250,220)">
                <circle r="22" fill="#14b8a6" fillOpacity="0.4" stroke="#14b8a6" strokeWidth="2" />
                <polygon points="30,0 14,-7 14,7" fill="#14b8a6" />
                <circle r="6" fill="#0f172a" />
                <text x="-15" y="-30" fill="#facc15" fontSize="11">heading = 0°</text>
              </g>
              
              {/*Animated rotating arrow showing heading change*/}
              <g transform="translate(250,220)">
                <line x1="0" y1="0" x2="90" y2="0" stroke="#facc15" strokeWidth="2" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
                </line>
                <circle cx="90" cy="0" r="4" fill="#facc15">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
                </circle>
              </g>
              
              <text x="50" y="420" fill="#94a3b8" fontSize="11">Compass directions: North=90°, East=0°, South=270°, West=180°</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Compass rose: heading increases counter‑clockwise from east (0°)</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🧭 Heading as a Compass</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">In turtle graphics, heading is measured in <strong>degrees</strong> starting from <strong>0° east (right)</strong> and increasing <strong>counter‑clockwise</strong>. Think of it as a compass where 0° points east, 90° north, 180° west, 270° south. This matches standard mathematical conventions (polar coordinates).</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Cardinal Directions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>0° (or 360°)</strong> → East → right</li>
                  <li><strong>90°</strong> → North → up</li>
                  <li><strong>180°</strong> → West → left</li>
                  <li><strong>270°</strong> → South → down</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Intercardinal Directions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>45°</strong> → Northeast</li>
                  <li><strong>135°</strong> → Northwest</li>
                  <li><strong>225°</strong> → Southwest</li>
                  <li><strong>315°</strong> → Southeast</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real‑world analogy */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🗺️ Real‑world Connection</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">Imagine you are a hiker with a compass: if you face east (0°), turning left (counter‑clockwise) makes you face north (90°). Similarly, the turtle’s heading works exactly like a compass but with east as zero. This analogy helps students like <strong>Swadeep</strong> predict where the turtle will go.</p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Teacher Tip:</strong> Have students stand in a circle and call out headings – they rotate to face that direction. Kinesthetic learning reinforces the concept.</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={compassDemo} title="compass_demo.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={headingSquare} title="heading_square.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={setheadingTarget} title="setheading_target.py" highlightLines={[6,7,8,9,10]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Heading Methods</h2>
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
              <li><strong>Confusing 0° with north:</strong> Default 0° = east, not north. Use <code>turtle.mode('logo')</code> if you prefer north‑up.</li>
              <li><strong>Heading wraps unexpectedly:</strong> 360° equals 0°, and 361° becomes 1°. This can confuse beginners.</li>
              <li><strong>Using left/right without knowing current heading:</strong> Relative turns depend on current heading – always print heading if unsure.</li>
              <li><strong>Assuming negative headings are invalid:</strong> They are normalized, but better to avoid.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Before complex drawings, set initial heading explicitly with <code>setheading()</code>.</li>
              <li>Use <code>setheading()</code> for absolute directions (e.g., north, south).</li>
              <li>Store current heading if you need to return to it later.</li>
              <li>For debugging, print heading before and after each turn.</li>
              <li>Use meaningful variable names: <code>angle = 90</code> instead of magic numbers.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I know 0° = east, 90° = north, 180° = west, 270° = south",
              "I can set the turtle to any cardinal direction with setheading()",
              "I can get the current heading with heading()",
              "I understand that left() increases heading, right() decreases it",
              "I can predict where the turtle will move after a turn",
              "I can use the compass analogy to debug heading issues"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> If heading is 45°, what cardinal direction is that? (Northeast)</p>
            <p>👉 <strong>Observe:</strong> What happens to heading after <code>left(361)</code>? It becomes 1° – still pointing mostly east.</p>
            <p>👉 <strong>Try changing:</strong> Use <code>t.setheading(90)</code> and then <code>t.forward(100)</code> – the turtle moves up (north).</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In navigation and robotics, heading is fundamental. GPS devices report heading relative to north. Turtle's model (east‑based) is unusual, but many math libraries use the same (0 = positive x‑axis). Understanding this mapping helps when integrating trig functions like <code>sin</code> and <code>cos</code> with turtle motion.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Heading Direction FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="Use a large printed compass or draw one on the whiteboard. Have students call out headings and the rest of the class points. Relate to real life: 'If you face east and turn left, you face north.' Emphasize that the turtle does not have a 'back' sensor – it always moves relative to its heading. Practice by drawing a star pattern using only setheading with cardinal and intercardinal angles." />
        </div>
      </div>
    </div>
  );
};

export default Topic7;