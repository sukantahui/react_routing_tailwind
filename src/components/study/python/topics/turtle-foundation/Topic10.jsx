import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";

// Import Python files
import singleLine from "./topic10_files/single_line.py?raw";
import connectedPath from "./topic10_files/connected_path.py?raw";
import polyline from "./topic10_files/polyline.py?raw";

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

const Topic10 = () => {
  const prototypes = [
    { name: "forward(distance)", returnType: "None", purpose: "Draws a straight line forward (relative).", usage: "t.forward(100)" },
    { name: "backward(distance)", returnType: "None", purpose: "Draws a straight line backward (relative).", usage: "t.backward(50)" },
    { name: "goto(x, y)", returnType: "None", purpose: "Draws a straight line to absolute (x,y).", usage: "t.goto(100, 50)" },
    { name: "setx(x)", returnType: "None", purpose: "Draws a horizontal line to x (absolute).", usage: "t.setx(200)" },
    { name: "sety(y)", returnType: "None", purpose: "Draws a vertical line to y (absolute).", usage: "t.sety(150)" },
    { name: "distance(x, y)", returnType: "float", purpose: "Returns length of straight line to point.", usage: "length = t.distance(100,0)" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Drawing Straight Lines & Connected Paths
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The foundation of all turtle graphics: line segments and continuous paths
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📏 Single Lines</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔗 Connected Paths</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🖌️ Polyline & Open Shapes</span>
          </div>
        </div>

        {/* SVG Illustration: Single line vs connected path */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="300" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="260" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* Single line example */}
              <text x="120" y="50" fill="#2dd4bf" fontSize="14" fontWeight="bold">Single Line</text>
              <line x1="60" y1="80" x2="200" y2="80" stroke="#f97316" strokeWidth="3" />
              <circle cx="60" cy="80" r="5" fill="#14b8a6" />
              <circle cx="200" cy="80" r="5" fill="#facc15" />
              <text x="60" y="70" fill="#94a3b8" fontSize="10">Start</text>
              <text x="200" y="70" fill="#facc15" fontSize="10">End</text>
              <text x="120" y="100" fill="#f97316" fontSize="10">forward(140) or goto(140,80)</text>
              
              {/* Connected path example */}
              <text x="350" y="50" fill="#2dd4bf" fontSize="14" fontWeight="bold">Connected Path</text>
              <polyline points="280,80 320,140 380,120 420,180" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="280" cy="80" r="5" fill="#14b8a6" />
              <circle cx="420" cy="180" r="5" fill="#facc15" />
              <text x="270" y="95" fill="#94a3b8" fontSize="9">Start</text>
              <text x="425" y="195" fill="#facc15" fontSize="9">End</text>
              
              {/* Dashed line showing continuous movement */}
              <path d="M 280 80 L 320 140 L 380 120 L 420 180" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="300" y="230" fill="#94a3b8" fontSize="11">Connected: each segment starts where previous ended</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">A single straight line (left) vs a connected path (right) made of multiple segments</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">📏 Drawing Lines</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed"><strong>Straight lines</strong> are the simplest drawing primitive. Use <code>forward()</code>, <code>backward()</code>, <code>goto()</code>, <code>setx()</code>, or <code>sety()</code>. <strong>Connected paths</strong> (or polylines) are sequences of lines where each starts at the end of the previous one. Most drawings – from squares to complex fractals – are built from connected paths.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Single Line</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>From point A to point B.</li>
                  <li>Can be drawn with one command.</li>
                  <li>Example: <code>t.forward(100)</code></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Connected Path (Polyline)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Multiple segments, end‑to‑end.</li>
                  <li>Pen stays down between segments.</li>
                  <li>Example: <code>forward(50); right(90); forward(30)</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real‑world connection */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🌍 Where Lines & Paths Appear</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <p className="leading-relaxed">Any vector graphic – from a child's drawing of a house to a car's CAD model – is a collection of connected paths. Even fonts (TrueType) outline characters as polylines and curves. In robotics, a path plan is a series of straight line segments. Mastering line drawing is the first step toward creating any shape.</p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Example:</strong> Students in Barrackpore use turtle graphics to draw the outline of their school building – walls, windows, doors – all connected straight lines.</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={singleLine} title="single_line.py" highlightLines={[6,7,8]} />
          <PythonFileLoader fileModule={connectedPath} title="connected_path.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={polyline} title="polyline.py" highlightLines={[8,9,10,11,12,13]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Line‑Drawing Methods</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Method</th><th>Return</th><th>Draws</th><th>Example</th></tr>
              </thead>
              <tbody>
                {prototypes.map((p, idx) => (
                  <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/30 transition">
                    <td className="px-4 py-2 font-mono text-emerald-300">{p.name}</td>
                    <td className="px-4 py-2 text-center">{p.returnType}</td>
                    <td className="px-4 py-2">{p.purpose.replace("Draws", "")}</td>
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
              <li><strong>Lifting pen accidentally:</strong> Breaks the connected path into separate segments.</li>
              <li><strong>Forgetting to turn:</strong> All segments in same direction → straight line only.</li>
              <li><strong>Using <code>goto()</code> without pen up:</strong> Creates unintended diagonal lines when you meant to jump.</li>
              <li><strong>Not closing a shape:</strong> Ending point not equal to start → open path.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Keep pen down for continuous paths; lift only to reposition.</li>
              <li>Use loops for repeated segments (e.g., polygons).</li>
              <li>Plan your path on paper before coding.</li>
              <li>For complex shapes, define a list of points and iterate.</li>
              <li>Use <code>t.pos()</code> to verify connection points during debugging.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can draw a single straight line using forward() or goto()",
              "I can create a connected path of multiple line segments",
              "I understand that the pen must stay down to keep lines connected",
              "I can draw a polyline (open shape) like a zig‑zag or letter 'L'",
              "I can measure the length of a line with distance()",
              "I know how to close a path by returning to the start"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> How many connected segments are needed to draw a square? A triangle?</p>
            <p>👉 <strong>Observe:</strong> What happens if you forget to lower the pen after a reposition? The path breaks.</p>
            <p>👉 <strong>Try changing:</strong> Draw a zig‑zag line using a loop and alternating left/right turns.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>In CAD software, every polyline is stored as a sequence of points. You can think of your turtle program as generating such a sequence. Advanced path planning (e.g., for a robot vacuum) involves breaking a curved path into many tiny straight line segments – the same principle used by turtle's `circle()` command internally.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="Straight Lines & Connected Paths FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="Emphasize that every drawing, no matter how complex, is built from connected straight lines (only a few curves like circles exist). Have students physically trace a path on paper, then translate it into forward/left/right commands. Show that 'connected' means the pen never lifts – you can create a beautiful outline of a bird using only connected line segments." />
        </div>
      </div>
    </div>
  );
};

export default Topic10;