import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";

// Import Python files
import singleTurtle from "./topic3_files/single_turtle.py?raw";
import multipleTurtles from "./topic3_files/multiple_turtles.py?raw";
import turtleState from "./topic3_files/turtle_state.py?raw";

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

const Topic3 = () => {
  const prototypes = [
    { name: "Turtle()", returnType: "Turtle object", purpose: "Creates a new turtle instance.", usage: "t = turtle.Turtle()" },
    { name: "Screen()", returnType: "Screen object", purpose: "Creates (or returns) the screen instance.", usage: "screen = turtle.Screen()" },
    { name: "clone()", returnType: "Turtle object", purpose: "Creates an identical copy of the turtle.", usage: "t2 = t.clone()" },
    { name: "isvisible()", returnType: "bool", purpose: "Returns True if turtle is visible.", usage: "if t.isvisible(): t.hideturtle()" },
    { name: "turtles()", returnType: "list", purpose: "Returns list of all turtle objects on screen.", usage: "print(turtle.turtles())" },
    { name: "bye()", returnType: "None", purpose: "Closes the turtle graphics window.", usage: "turtle.bye()" }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Turtle Object Creation & Lifecycle
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Creating turtles, understanding their state, cloning, and managing multiple objects
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🐢 Object Creation</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔄 Lifecycle & State</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">👥 Multiple Turtles</span>
          </div>
        </div>

        {/* SVG: Turtle object lifecycle */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="280" viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="240" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              {/* Lifecycle stages */}
              <circle cx="80" cy="80" r="30" fill="#1e293b" stroke="#2dd4bf" strokeWidth="2" />
              <text x="80" y="85" fill="#2dd4bf" fontSize="10" textAnchor="middle">CREATE</text>
              <text x="80" y="100" fill="#94a3b8" fontSize="8" textAnchor="middle">Turtle()</text>

              <circle cx="250" cy="80" r="30" fill="#1e293b" stroke="#facc15" strokeWidth="2" />
              <text x="250" y="85" fill="#facc15" fontSize="10" textAnchor="middle">ACTIVE</text>
              <text x="250" y="100" fill="#94a3b8" fontSize="8" textAnchor="middle">drawing, moving</text>

              <circle cx="420" cy="80" r="30" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
              <text x="420" y="85" fill="#f97316" fontSize="10" textAnchor="middle">CLONE /</text>
              <text x="420" y="100" fill="#f97316" fontSize="10" textAnchor="middle">DELETE</text>

              {/* Arrows */}
              <line x1="110" y1="80" x2="218" y2="80" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowLife)" />
              <line x1="280" y1="80" x2="388" y2="80" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowLife)" />
              <defs>
                <marker id="arrowLife" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#94a3b8" />
                </marker>
              </defs>

              {/* Additional info: multiple turtles */}
              <text x="80" y="160" fill="#cbd5e1" fontSize="12">One or many turtles?</text>
              <g transform="translate(80,180)">
                <circle cx="0" cy="0" r="10" fill="#14b8a6" />
                <circle cx="25" cy="-5" r="10" fill="#8b5cf6" />
                <circle cx="15" cy="25" r="10" fill="#f43f5e" />
                <text x="-10" y="-15" fill="#94a3b8" fontSize="8">t1, t2, t3...</text>
              </g>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Turtle object lifecycle: creation → active state → cloning / deletion</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🐢 Creating & Managing Turtle Objects</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">In Python's turtle module, each turtle is an <strong>object</strong> created from the <code>Turtle</code> class. You can create one or many turtles, each with its own position, heading, pen state, and color. Understanding the lifecycle means knowing how to create, use, duplicate, and destroy turtles.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Creation Methods</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code className="bg-gray-700 px-1">t = turtle.Turtle()</code> – most common.</li>
                  <li><code className="bg-gray-700 px-1">t = turtle.Turtle(shape="turtle")</code> – specify shape.</li>
                  <li><code className="bg-gray-700 px-1">t2 = t.clone()</code> – exact copy (position, heading, color).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Lifecycle Stages</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Creation:</strong> Memory allocated, defaults set.</li>
                  <li><strong>Active use:</strong> Drawing, moving, changing state.</li>
                  <li><strong>Cloning:</strong> Creating independent copies.</li>
                  <li><strong>Deletion:</strong> Let go out of scope or <code>del t</code>.</li>
                  <li><strong>Program end:</strong> Window closes, all turtles gone.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={singleTurtle} title="single_turtle.py" highlightLines={[3,5,6]} />
          <PythonFileLoader fileModule={multipleTurtles} title="multiple_turtles.py" highlightLines={[6,7,8,13,14,15]} />
          <PythonFileLoader fileModule={turtleState} title="turtle_state.py" highlightLines={[4,5,6,7]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Turtle Object Methods & Functions</h2>
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
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Forgetting to create a turtle:</strong> Calling <code>forward()</code> on module? Use <code>t.forward()</code> after creation.</li>
              <li><strong>Sharing turtle objects accidentally:</strong> If you assign <code>t2 = t</code>, both refer to same object; changes affect both. Use <code>clone()</code> for a true copy.</li>
              <li><strong>Not storing Screen reference:</strong> Losing access to screen methods after creation can be confusing.</li>
              <li><strong>Leaving turtles running:</strong> If you create many turtles, they continue to exist even if not used, potentially slowing performance.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Always give turtles descriptive names: <code>painter, drawer, tim, tess</code>.</li>
              <li>Create screen first: <code>screen = turtle.Screen()</code>, then turtles.</li>
              <li>Use <code>clone()</code> when you need independent copies with same state.</li>
              <li>To delete a turtle, let it go out of scope or use <code>del t</code> after closing window.</li>
              <li>Limit number of turtles to avoid performance issues (more than 100 may slow down).</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can create a turtle using `t = turtle.Turtle()`",
              "I understand that each turtle is a separate object with its own state",
              "I can create multiple turtles and control them independently",
              "I know the difference between assignment (`t2 = t`) and cloning (`t2 = t.clone()`)",
              "I understand the turtle lifecycle: creation → active → deletion",
              "I can list all turtles using `turtle.turtles()`"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> What happens if you create two turtles and call <code>t1.forward(100)</code> then <code>t2.left(90)</code>?</p>
            <p>👉 <strong>Observe:</strong> Use <code>id(t)</code> to see that two variables assigned the same turtle point to the same object.</p>
            <p>👉 <strong>Try changing:</strong> Create three turtles with different colors and make them draw a collaborative pattern.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In advanced turtle graphics, you might have dozens of turtles representing particles, players, or enemies. Managing object references and cloning allows for complex simulations. Think in terms of object-oriented design: each turtle is an entity with its own behavior.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Turtle Object Creation & Lifecycle FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <Teacher note="This is a great moment to introduce object-oriented concepts: each turtle is an instance of the Turtle class. Have students create two turtles, name them after themselves and a friend (e.g., swadeep_turtle and tuhina_turtle), and have them race. This makes the abstract idea of 'objects' tangible. Emphasize that `clone()` creates a separate turtle, not a reference." />
        </div>
      </div>
    </div>
  );
};

export default Topic3;