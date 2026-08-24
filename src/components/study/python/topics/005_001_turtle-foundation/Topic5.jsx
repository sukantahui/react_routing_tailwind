import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";

// Import Python files
import forwardBackward from "./topic5_files/forward_backward.py?raw";
import precisionDrawing from "./topic5_files/precision_drawing.py?raw";
import distanceControl from "./topic5_files/distance_control.py?raw";

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

const Topic5 = () => {
  const prototypes = [
    { name: "forward(distance) / fd(distance)", returnType: "None", purpose: "Moves turtle forward by given units.", usage: "t.forward(100)" },
    { name: "backward(distance) / bk(distance) / back(distance)", returnType: "None", purpose: "Moves turtle backward (opposite of heading).", usage: "t.backward(50)" },
    { name: "distance(x, y)", returnType: "float", purpose: "Returns distance from turtle to point (x,y).", usage: "dist = t.distance(100,0)" },
    { name: "towards(x, y)", returnType: "float", purpose: "Returns angle to turn toward (x,y).", usage: "angle = t.towards(100,0)" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Movement Fundamentals
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            forward(), backward(), distance control, and precision
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⬆️ forward() / fd()</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⬇️ backward() / bk()</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📏 Distance & Precision</span>
          </div>
        </div>

        {/* SVG Illustration: Forward and backward movement */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="260" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Starting point */}
              <circle cx="150" cy="150" r="5" fill="#f97316" />
              <text x="140" y="140" fill="#f97316" fontSize="10">Start</text>
              
              {/* Forward arrow and label */}
              <line x1="150" y1="150" x2="300" y2="150" stroke="#2dd4bf" strokeWidth="3" markerEnd="url(#arrowFwd)" />
              <text x="210" y="140" fill="#2dd4bf" fontSize="12">forward(150)</text>
              <circle cx="300" cy="150" r="5" fill="#2dd4bf" />
              <text x="305" y="145" fill="#2dd4bf" fontSize="10">Point A</text>
              
              {/* Backward arrow */}
              <line x1="300" y1="150" x2="180" y2="150" stroke="#f97316" strokeWidth="3" strokeDasharray="6,4" markerEnd="url(#arrowBack)" />
              <text x="220" y="170" fill="#f97316" fontSize="12">backward(120)</text>
              <circle cx="180" cy="150" r="5" fill="#f97316" />
              
              {/* Turtle icons */}
              <g transform="translate(150,150)">
                <circle r="12" fill="#14b8a6" fillOpacity="0.5" stroke="#14b8a6" strokeWidth="1.5" />
                <polygon points="15,0 6,-4 6,4" fill="#14b8a6" />
              </g>
              <g transform="translate(300,150)">
                <circle r="12" fill="#2dd4bf" fillOpacity="0.5" stroke="#2dd4bf" strokeWidth="1.5" />
                <polygon points="15,0 6,-4 6,4" fill="#2dd4bf" />
              </g>
              
              <defs>
                <marker id="arrowFwd" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#2dd4bf" />
                </marker>
                <marker id="arrowBack" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="10 0, 0 5, 10 10" fill="#f97316" />
                </marker>
              </defs>
              
              {/* Note about precision */}
              <text x="50" y="240" fill="#94a3b8" fontSize="11">Distance units are pixels (screen-dependent)</text>
              <text x="50" y="260" fill="#94a3b8" fontSize="11">Precision: floating point (e.g., forward(37.5))</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">forward() moves in heading direction; backward() moves opposite</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📏 Movement Basics</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed"><code>forward(distance)</code> and <code>backward(distance)</code> are the primary commands to move the turtle. Movement is <strong>relative</strong> to the turtle's current heading. Distance units are typically pixels, but can be treated as abstract units. Precision matters: using integers vs floats, and understanding cumulative errors.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Key Concepts</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code>forward(n)</code> – moves n units in heading direction.</li>
                  <li><code>backward(n)</code> – moves n units opposite heading.</li>
                  <li>Movement does not change heading.</li>
                  <li>Distance is measured from current position.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Precision Matters</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Floats allowed: <code>forward(50.75)</code>.</li>
                  <li>Cumulative floating-point errors can affect complex drawings.</li>
                  <li>Use integer distances for exact symmetric patterns.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={forwardBackward} title="forward_backward.py" highlightLines={[6,7,8,9]} />
          <PythonFileLoader fileModule={precisionDrawing} title="precision_drawing.py" highlightLines={[6,7,12,13]} />
          <PythonFileLoader fileModule={distanceControl} title="distance_control.py" highlightLines={[6,7,8,9,10,11]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Movement Method Prototypes</h2>
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
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Assuming backward reverses heading:</strong> It doesn't; heading remains unchanged.</li>
              <li><strong>Using extremely large distances:</strong> Can cause turtle to go off-screen or cause performance issues.</li>
              <li><strong>Floating-point drift:</strong> Repeated fractional moves can accumulate error; use integers when possible.</li>
              <li><strong>Negative distances:</strong> <code>forward(-50)</code> works but is confusing; use <code>backward(50)</code> instead.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Use positive distances for clarity.</li>
              <li>Store repeated distances in variables: <code>step = 50</code>.</li>
              <li>For precise loops, calculate total distance to avoid drift.</li>
              <li>Use <code>t.distance()</code> to check if turtle reached a target.</li>
              <li>Combine <code>forward()</code> with <code>pendown()/penup()</code> for patterns.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can move the turtle forward using `forward()` or `fd()`",
              "I can move the turtle backward using `backward()` or `bk()`",
              "I understand that forward/backward are relative to current heading",
              "I can use integer and floating-point distances",
              "I know how to calculate distance to a point using `t.distance()`",
              "I avoid negative distances for readability"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> Why does <code>backward(100)</code> not change the heading?</p>
            <p>👉 <strong>Observe:</strong> What happens if you call <code>forward(50.5)</code> then <code>forward(49.5)</code> – does the turtle land exactly at 100?</p>
            <p>👉 <strong>Try changing:</strong> Use a loop to move forward increasing distances and notice the pattern.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>Professional graphics and robotics rely on precise distance control. Think of the turtle as a robot: you need to account for cumulative error. Use <code>distance()</code> for validation and implement feedback loops (move until within tolerance). This is the foundation of autonomous navigation.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Movement Fundamentals FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <Teacher note="Students often think backward turns the turtle. Have them draw a line forward, then backward, and observe that the turtle ends up at start but still facing the same direction. Use a race analogy: 'running backward doesn't change which way you face.' Emphasize that distance units are abstract – good time to introduce variables: `side = 100`." />
        </div>
      </div>
    </div>
  );
};

export default Topic5;