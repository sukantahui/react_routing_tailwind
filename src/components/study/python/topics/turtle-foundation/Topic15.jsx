import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";

// Import Python files
import sequentialFlow from "./topic15_files/sequential_flow.py?raw";
import commandOrder from "./topic15_files/command_order.py?raw";
import flowControl from "./topic15_files/flow_control.py?raw";

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

const Topic15 = () => {
  const prototypes = [
    { name: "turtle.done()", returnType: "None", purpose: "Starts event loop; keeps window open.", usage: "turtle.done()" },
    { name: "turtle.bye()", returnType: "None", purpose: "Closes the turtle graphics window.", usage: "turtle.bye()" },
    { name: "turtle.exitonclick()", returnType: "None", purpose: "Waits for mouse click before closing.", usage: "turtle.exitonclick()" },
    { name: "time.sleep(seconds)", returnType: "None", purpose: "Pauses execution (not turtle, but useful for flow).", usage: "time.sleep(1)" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Drawing Flow & Sequence of Commands
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            How turtle executes commands in order, one after another – the foundation of procedural drawing
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📜 Sequential Execution</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">⏱️ Timing & Delays</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔄 Loops & Functions</span>
          </div>
        </div>

        {/* SVG Illustration: flow diagram of command sequence */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="280" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Flow boxes */}
              <rect x="60" y="50" width="100" height="35" fill="#1e293b" stroke="#2dd4bf" strokeWidth="1.5" rx="5" />
              <text x="110" y="72" fill="#2dd4bf" fontSize="10" textAnchor="middle">forward(100)</text>
              
              <rect x="60" y="110" width="100" height="35" fill="#1e293b" stroke="#f97316" strokeWidth="1.5" rx="5" />
              <text x="110" y="132" fill="#f97316" fontSize="10" textAnchor="middle">left(90)</text>
              
              <rect x="60" y="170" width="100" height="35" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" rx="5" />
              <text x="110" y="192" fill="#f43f5e" fontSize="10" textAnchor="middle">forward(50)</text>
              
              <rect x="60" y="230" width="100" height="35" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" rx="5" />
              <text x="110" y="252" fill="#8b5cf6" fontSize="10" textAnchor="middle">pendown()</text>
              
              {/* Arrows */}
              <line x1="110" y1="85" x2="110" y2="108" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFlow)" />
              <line x1="110" y1="145" x2="110" y2="168" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFlow)" />
              <line x1="110" y1="205" x2="110" y2="228" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFlow)" />
              
              <defs>
                <marker id="arrowFlow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
                </marker>
              </defs>
              
              {/* Right side explanation */}
              <text x="220" y="70" fill="#facc15" fontSize="12" fontWeight="bold">Execution Order</text>
              <text x="220" y="95" fill="#cbd5e1" fontSize="10">Commands run top → bottom</text>
              <text x="220" y="120" fill="#cbd5e1" fontSize="10">Each completes before next starts</text>
              <text x="220" y="145" fill="#cbd5e1" fontSize="10">Turtle state changes each step</text>
              
              {/* Delayed execution hint */}
              <rect x="220" y="180" width="220" height="80" fill="#1e293b" rx="6" stroke="#facc15" strokeWidth="1" />
              <text x="330" y="200" fill="#facc15" fontSize="11" textAnchor="middle">time.sleep(1) pauses</text>
              <text x="330" y="220" fill="#cbd5e1" fontSize="10" textAnchor="middle">Can insert delays to</text>
              <text x="330" y="235" fill="#cbd5e1" fontSize="10" textAnchor="middle">watch step‑by‑step</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Commands are executed sequentially; each line finishes before the next begins</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📜 The Flow of Execution</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">Turtle graphics executes commands in the order they appear in your code – from top to bottom, one after another. This is called <strong>sequential execution</strong>. Each command completes its action (e.g., moving the turtle, changing color, waiting) before the next command begins. Understanding this flow is essential for predicting what your program will draw.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Key Concepts</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Code runs line by line.</li>
                  <li>Turtle state (position, heading, pen) changes gradually.</li>
                  <li>Loops repeat a block of commands.</li>
                  <li>Functions group commands for reuse.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Flow Control Tools</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code>if/else</code>: conditional execution.</li>
                  <li><code>for/while</code>: repetition.</li>
                  <li><code>time.sleep()</code>: pause between commands.</li>
                  <li><code>turtle.ontimer()</code>: scheduled execution.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real‑world analogy */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📖 Sequential Reading vs Drawing</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">Think of a recipe: you read the steps in order, and you complete each step before moving to the next. "Mix flour, then add eggs, then stir." Similarly, turtle reads your commands one by one: "Move 100 steps, then turn left, then change color." Changing the order of commands can produce completely different drawings – just like reversing steps in a recipe ruins the dish.</p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Example with students:</strong> Swadeep writes `forward(100); right(90); forward(100)`. Tuhina writes `right(90); forward(100); forward(100)`. Both produce different paths – one is an L‑shape, the other is a straight line downwards. Order matters!</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={sequentialFlow} title="sequential_flow.py" highlightLines={[6,7,8,9,10,11]} />
          <PythonFileLoader fileModule={commandOrder} title="command_order.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={flowControl} title="flow_control.py" highlightLines={[11,12,13,14,15,16,17]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Flow‑Related Functions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Function/Method</th><th>Return</th><th>Purpose</th><th>Example</th></tr>
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
              <li><strong>Assuming commands are executed in parallel:</strong> They are not; each finishes before next starts.</li>
              <li><strong>Forgetting that order changes output:</strong> `forward(100); left(90)` vs `left(90); forward(100)` are different.</li>
              <li><strong>Putting `turtle.done()` too early:</strong> If placed before drawing commands, nothing appears.</li>
              <li><strong>Using long `time.sleep()` delays:</strong> Makes the program unresponsive; use `ontimer` for animations.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Read your code aloud in order to simulate execution.</li>
              <li>Use functions to group related commands and improve readability.</li>
              <li>Insert `print()` statements to trace execution order.</li>
              <li>Use `turtle.tracer(0)` and `update()` for complex animations, but understand that commands still execute sequentially.</li>
              <li>Test small segments before combining.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I understand that commands run one after another, top to bottom",
              "I can predict the drawing outcome of a simple sequence of commands",
              "I know that changing command order changes the result",
              "I can use loops to repeat blocks of commands",
              "I can use functions to organize my drawing flow",
              "I understand that `turtle.done()` must be at the end to keep the window open"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> What would happen if you swapped the order of `right(90)` and `forward(100)` in a square loop?</p>
            <p>👉 <strong>Observe:</strong> Add `print(t.pos())` after each movement – see the turtle's coordinates change step by step.</p>
            <p>👉 <strong>Try changing:</strong> Insert `time.sleep(0.5)` between commands to slow down the animation and watch the flow.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In real‑time systems and game engines, understanding the order of execution is critical: update physics, then render graphics, then handle input. Turtle's sequential model is a simplified version. Mastering it helps you transition to event‑driven programming (e.g., `ontimer`, `onclick`), where commands are still executed sequentially but triggered by events.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Drawing Flow & Sequence FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="This is a meta‑topic that ties everything together. Use a whiteboard simulation: write a short program and have students act as the CPU, executing each command and updating the turtle on a grid. Emphasize that the computer doesn't skip or reorder commands without loops/conditionals. Activities: 'debug the sequence' – provide a broken program where commands are out of order, and have students fix it. This builds systematic thinking." />
        </div>
      </div>
    </div>
  );
};

export default Topic15;