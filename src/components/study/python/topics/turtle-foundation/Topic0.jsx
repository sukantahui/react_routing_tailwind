import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

// Import Python files from topic0_files folder
import squareDrawingCode from "./topic0_files/square_demo.py?raw";
import colorfulPatternCode from "./topic0_files/colorful_star.py?raw";

// Inline keyframes for animations (motion-safe, no external libs)
const keyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes softGlow {
  0%, 100% { box-shadow: 0 2px 5px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05); }
  50% { box-shadow: 0 8px 25px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1); }
}

@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.01); }
}
`;

const Topic0 = () => {
  // Command prototypes (Python Turtle)
  const prototypes = [
    { name: "forward(distance)", returnType: "None", purpose: "Moves turtle forward by given units.", usage: "t.forward(100)" },
    { name: "backward(distance)", returnType: "None", purpose: "Moves turtle backward by given units.", usage: "t.backward(50)" },
    { name: "right(angle)", returnType: "None", purpose: "Rotates turtle clockwise by angle degrees.", usage: "t.right(90)" },
    { name: "left(angle)", returnType: "None", purpose: "Rotates turtle counter-clockwise by angle degrees.", usage: "t.left(45)" },
    { name: "penup()", returnType: "None", purpose: "Lifts pen to stop drawing.", usage: "t.penup()" },
    { name: "pendown()", returnType: "None", purpose: "Lowers pen to start drawing.", usage: "t.pendown()" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out] motion-safe:animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Turtle Graphics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where programming meets art, geometry, and computational thinking
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🐢 LOGO Language</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📐 Educational Tool</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🤖 Robotics Foundation</span>
          </div>
        </div>

        {/* SVG Illustration: Turtle at origin with compass */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="280" height="240" viewBox="0 0 280 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px] h-auto">
              <rect x="20" y="20" width="240" height="200" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="8" />
              <line x1="140" y1="30" x2="140" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
              <line x1="30" y1="120" x2="250" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
              <circle cx="140" cy="120" r="4" fill="#f97316" />
              <text x="145" y="115" fill="#facc15" fontSize="10">(0,0)</text>
              <g transform="translate(140,120)">
                <circle r="16" fill="#2dd4bf" fillOpacity="0.7" stroke="#14b8a6" strokeWidth="2" />
                <polygon points="20,0 10,-5 10,5" fill="#14b8a6" />
                <circle r="4" fill="#0f172a" />
              </g>
              <text x="225" y="35" fill="#cbd5e1" fontSize="12">N (90°)</text>
              <text x="40" y="35" fill="#cbd5e1" fontSize="12">W (180°)</text>
              <text x="235" y="130" fill="#cbd5e1" fontSize="12">E (0°/360°)</text>
              <text x="135" y="225" fill="#cbd5e1" fontSize="12">S (270°)</text>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Turtle at origin (0,0) with compass directions</p>
          </div>
        </div>

        {/* History Section */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📜 History & Origins</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 rounded-xl p-5 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <h3 className="text-xl font-medium text-emerald-300">Seymour Papert & LOGO (1967)</h3>
              <p className="mt-2 leading-relaxed">Developed at MIT, Turtle Graphics was born from <strong>constructionist learning theory</strong> – children learn best by creating tangible projects. The physical "turtle" robot moved on floors, later replaced by screen cursors.</p>
              <p className="mt-2 text-gray-400 text-sm">🏫 Inspired by Piaget's work, Papert envisioned programming as a <em>thinking tool</em> for all ages.</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-5 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <h3 className="text-xl font-medium text-emerald-300">Evolution to Modern Languages</h3>
              <p className="mt-2 leading-relaxed">From physical robots → Apple II LOGO → Python's <code className="bg-gray-700 px-1 rounded">turtle</code> module (standard library) → Block-based coding (Scratch). Today, turtle graphics teach millions of students programming fundamentals.</p>
              <p className="mt-2 text-gray-400 text-sm">🐍 Python's turtle module is widely used in schools of <strong>Barrackpore, Shyamnagar, Ichapur</strong> and beyond!</p>
            </div>
          </div>
        </section>

        {/* Educational Purpose */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🎓 Educational Purpose</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">Turtle Graphics bridges <strong>abstract concepts</strong> (angles, coordinates, loops) with <strong>visual feedback</strong>. Students like <strong>Swadeep, Tuhina, Abhronila, Debangshu</strong> can see the immediate result of their code – turning mathematics into art.</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-300">
              <li><span className="font-semibold text-emerald-300">Geometry:</span> Visualize angles, polygons, circles, symmetry.</li>
              <li><span className="font-semibold text-emerald-300">Programming logic:</span> Loops, functions, conditionals, state.</li>
              <li><span className="font-semibold text-emerald-300">Problem decomposition:</span> Break complex drawings into steps.</li>
              <li><span className="font-semibold text-emerald-300">Debugging mindset:</span> Predict → test → observe → correct.</li>
            </ul>
          </div>
        </section>

        {/* Real-world Relevance */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🌍 Real-world Relevance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Robotics & Autonomous Vehicles", desc: "Sensors, movement commands, path planning – similar to turtle's forward/rotate logic used in Roomba and robotic arms." },
              { title: "Computational Thinking", desc: "Industry problem-solving: breaking tasks into steps, iterative refinement, simulation." },
              { title: "Game Development & Graphics", desc: "Sprite movement, collision detection, 2D coordinate systems." },
              { title: "Logo-inspired Languages", desc: "Uber's 'LV' visualization, CAD software, educational apps." },
              { title: "STEM Pedagogy", desc: "Used globally from primary schools to university CS0 courses." },
              { title: "Pen Plotter Art", desc: "Artists use Python turtle to generate generative art and control plotters." },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-800/40 rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 hover:shadow-md">
                <h3 className="text-xl font-medium text-cyan-300">{item.title}</h3>
                <p className="mt-1 text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Python Code Demos */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Python Turtle in Action</h2>
          <div className="space-y-6">
            <PythonFileLoader fileModule={squareDrawingCode} title="square_demo.py" highlightLines={[4,5,6]} />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold">🔍 Think About...</h3>
                <p className="mt-1 text-gray-300">What happens if you change <code>right(90)</code> to <code>right(120)</code>? How would you draw a pentagon?</p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold">✨ Professional Tip</h3>
                <p className="mt-1 text-gray-300">Use <code className="bg-gray-700 px-1 rounded">t.speed(0)</code> for instant drawing and <code className="bg-gray-700 px-1 rounded">turtle.tracer(0)</code> + <code className="bg-gray-700 px-1 rounded">turtle.update()</code> for complex animations.</p>
              </div>
            </div>
            <PythonFileLoader fileModule={colorfulPatternCode} title="colorful_star.py" highlightLines={[6,7,8]} />
          </div>
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Essential Turtle Commands (Prototypes)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Command</th><th>Return</th><th>Purpose</th><th>Example</th></tr>
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
          <p className="text-gray-400 text-sm italic">Note: All methods return <code>None</code> and modify turtle state (position, heading, pen).</p>
        </section>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-300">
              <li><strong>Forgetting <code>turtle.done()</code></strong> – Window closes immediately.</li>
              <li><strong>Mixed units</strong>: degrees vs radians (default degrees).</li>
              <li><strong>Overwriting turtle reference</strong> causing unexpected state.</li>
              <li><strong>Misconception:</strong> "setheading(0)" points East, not North.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-300">
              <li>Always import <code>from turtle import Turtle</code> for clarity.</li>
              <li>Use <code>turtle.Screen()</code> to configure canvas.</li>
              <li>Name turtle objects descriptively: <code>painter</code>, <code>artist</code>.</li>
              <li>Wrap code in <code>if __name__ == "__main__":</code>.</li>
              <li>Use <code>speed()</code> and <code>pensize()</code> for control.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I know Turtle Graphics originated from LOGO & Papert",
              "I can explain educational benefits (geometry, loops, planning)",
              "I have seen Python turtle code and understand forward/right",
              "I understand the Cartesian origin (0,0) at center",
              "I know real-world applications: robotics, game dev, plotters",
              "I can differentiate between `penup()` and `pendown()`"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p className="mt-1">👉 <strong>Think about:</strong> How would you use a loop to draw an 8-point star?</p>
            <p className="mt-1">👉 <strong>Observe:</strong> What happens to the drawing when you modify the angle inside the loop?</p>
            <p className="mt-1">👉 <strong>Try changing:</strong> The starting heading before drawing a square.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p className="mt-1">Professionals often use turtle for prototyping graphics algorithms or teaching code flow. Think of <strong>state (position, heading)</strong> as key concept – similar to game characters.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s] motion-safe:animate-[fadeInUp_0.6s_ease-out_1s]">
          <FAQTemplate title="Turtle Graphics Introduction FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1.1s] motion-safe:animate-[fadeInUp_0.6s_ease-out_1.1s]">
          <Teacher note="🐢 Seymour Papert envisioned children as 'builders of their own knowledge'. Turtle Graphics isn't just about drawing – it's about debugging, algorithmic thinking, and building intuition for geometry. Encourage students to predict movement before running code, and always experiment with small changes. Show that even complex designs are made from simple steps." />
        </div>
      </div>
    </div>
  );
};

export default Topic0;