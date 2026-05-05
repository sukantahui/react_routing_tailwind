import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";

// Import Python files
import dotDemo from "./topic12_files/dot_demo.py?raw";
import stampDemo from "./topic12_files/stamp_demo.py?raw";
import dotVsStamp from "./topic12_files/dot_vs_stamp.py?raw";

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

const Topic12 = () => {
  const prototypes = [
    { name: "dot(size, color)", returnType: "None", purpose: "Draws a filled circle of given size (diameter).", usage: "t.dot(20, 'red')" },
    { name: "stamp()", returnType: "int (stamp_id)", purpose: "Leaves an impression of the turtle shape.", usage: "id = t.stamp()" },
    { name: "clearstamp(stamp_id)", returnType: "None", purpose: "Removes a specific stamp by its ID.", usage: "t.clearstamp(id)" },
    { name: "clearstamps(n)", returnType: "None", purpose: "Removes first/last n stamps (n=None clears all).", usage: "t.clearstamps(5)" },
    { name: "shape(name)", returnType: "str", purpose: "Sets or returns turtle shape ('turtle','circle',...).", usage: "t.shape('turtle')" },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Marking Positions: dot() & stamp()
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leave permanent markers without moving the turtle – perfect for annotations, trails, and patterns
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🔴 dot() – filled circles</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🐢 stamp() – turtle shape copies</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🗑️ clearstamp()</span>
          </div>
        </div>

        {/* SVG Illustration: dot vs stamp */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
              <rect x="20" y="20" width="460" height="280" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="10" />
              
              {/* dot() example */}
              <text x="120" y="55" fill="#2dd4bf" fontSize="14" fontWeight="bold">dot() – simple filled circles</text>
              <circle cx="80" cy="100" r="15" fill="#f97316" />
              <circle cx="150" cy="100" r="10" fill="#14b8a6" />
              <circle cx="210" cy="100" r="20" fill="#f43f5e" />
              <text x="80" y="135" fill="#94a3b8" fontSize="9">size 30</text>
              <text x="145" y="135" fill="#94a3b8" fontSize="9">size 20</text>
              <text x="200" y="135" fill="#94a3b8" fontSize="9">size 40</text>
              
              {/* stamp() example */}
              <text x="350" y="55" fill="#2dd4bf" fontSize="14" fontWeight="bold">stamp() – turtle shapes</text>
              <g transform="translate(300, 100)">
                <use href="#turtleShape" x="0" y="0" fill="#8b5cf6" />
                <use href="#turtleShape" x="40" y="-20" fill="#f59e0b" transform="rotate(30, 40, -20)" />
                <use href="#turtleShape" x="80" y="10" fill="#ec4899" />
                <use href="#turtleShape" x="120" y="-10" fill="#06b6d4" transform="rotate(-20, 120, -10)" />
              </g>
              <text x="320" y="140" fill="#94a3b8" fontSize="9">stamps retain shape, color, rotation</text>
              
              <defs>
                <g id="turtleShape">
                  <circle cx="0" cy="0" r="12" fill="currentColor" opacity="0.7" />
                  <polygon points="12,0 5,-4 5,4" fill="currentColor" />
                </g>
              </defs>
              
              {/* Comparison table */}
              <g transform="translate(50, 180)">
                <rect width="400" height="90" fill="#1e293b" rx="8" />
                <text x="20" y="25" fill="#facc15" fontSize="11" fontWeight="bold">Feature</text>
                <text x="150" y="25" fill="#facc15" fontSize="11" fontWeight="bold">dot()</text>
                <text x="300" y="25" fill="#facc15" fontSize="11" fontWeight="bold">stamp()</text>
                <line x1="10" y1="35" x2="390" y2="35" stroke="#475569" strokeWidth="1" />
                <text x="20" y="55" fill="#cbd5e1" fontSize="10">Shape</text>
                <text x="150" y="55" fill="#2dd4bf" fontSize="10">Circle</text>
                <text x="300" y="55" fill="#2dd4bf" fontSize="10">Turtle shape</text>
                <text x="20" y="75" fill="#cbd5e1" fontSize="10">Affected by rotation</text>
                <text x="150" y="75" fill="#f97316" fontSize="10">No</text>
                <text x="300" y="75" fill="#f97316" fontSize="10">Yes (takes heading)</text>
              </g>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">dot() draws circles; stamp() leaves turtle shape copies (they keep heading/orientation)</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔴 dot() vs 🐢 stamp()</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed"><code>dot(size, color)</code> draws a solid circle centered at the turtle's current position. It does NOT move the turtle. <code>stamp()</code> leaves a copy of the turtle's current shape (including its heading, color, and size) on the screen. Both are excellent for marking points, creating patterns, and annotating drawings without affecting the turtle's state.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">dot()</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Draws a circle of given diameter.</li>
                  <li>Optional color argument.</li>
                  <li>Not affected by heading.</li>
                  <li>Cannot be individually removed (only cleared with <code>clear()</code>).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">stamp()</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Leaves an impression of the turtle.</li>
                  <li>Returns a stamp ID for selective removal.</li>
                  <li>Respects heading (rotates with turtle orientation).</li>
                  <li><code>clearstamp(id)</code> or <code>clearstamps()</code> can erase them.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Use cases & real-world */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🌍 Where to Use dot() and stamp()</h2>
          <div className="bg-gray-800/30 rounded-xl p-5">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>dot():</strong> Mark grid points, data points on a graph, bullet holes, stars in the sky, or simply a colored spot.</li>
              <li><strong>stamp():</strong> Create multiple copies of a character (e.g., footprints, leaves, road signs), design tiles, or animate a trail without moving the actual turtle.</li>
              <li>Stamps are independent objects – they stay even if the turtle moves away or hides.</li>
            </ul>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm"><strong>Classroom example:</strong> Students like Swadeep and Abhronila can stamp a flower shape repeatedly to create a garden, or use dot() to plot coordinates from a math worksheet.</p>
            </div>
          </div>
        </section>

        {/* Python Code Examples */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={dotDemo} title="dot_demo.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={stampDemo} title="stamp_demo.py" highlightLines={[6,7,8,9,10]} />
          <PythonFileLoader fileModule={dotVsStamp} title="dot_vs_stamp.py" highlightLines={[8,9,10,11,12,13]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 dot() & stamp() Methods</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Method</th><th>Return</th><th>Description</th><th>Example</th></tr>
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
              <li><strong>Forgetting that dot size is diameter, not radius:</strong> <code>dot(20)</code> is twice as big as expected if you think in radius.</li>
              <li><strong>Not storing stamp IDs:</strong> Without ID, you cannot remove individual stamps later.</li>
              <li><strong>Assuming dot() rotates:</strong> It doesn't – always a circle regardless of heading.</li>
              <li><strong>Stamping multiple times quickly:</strong> Can overlay many stamps, slowing down the screen refresh.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Use <code>dot(radius*2, color)</code> if you think in radius.</li>
              <li>Store stamp IDs in a list if you need selective removal: <code>ids.append(t.stamp())</code>.</li>
              <li>Change shape before stamping to get different markers: <code>t.shape('turtle'); t.stamp()</code>.</li>
              <li>Use <code>dot()</code> for color data points, <code>stamp()</code> for repeated icons.</li>
              <li>Clear stamps with <code>t.clearstamps()</code> to reset a pattern.</li>
            </ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can draw a colored dot at the current position using dot()",
              "I can stamp the turtle shape at the current position using stamp()",
              "I understand the difference between dot and stamp (shape vs circle)",
              "I can remove individual stamps using clearstamp(id)",
              "I can clear all stamps with clearstamps()",
              "I can change the turtle shape to customize stamps"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints & Expert Mindset */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> If you stamp a turtle that is hidden, what appears? (The stamp still shows!)</p>
            <p>👉 <strong>Observe:</strong> Call <code>dot()</code> then call <code>stamp()</code> at the same location – which appears on top?</p>
            <p>👉 <strong>Try changing:</strong> Rotate the turtle before stamping – the stamp rotates too!</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>Stamps are useful in game development for leaving bullet holes, footprints, or placing static objects without creating additional turtle objects. Because stamps can be removed individually, they can simulate dynamic environments. dot() is great for particle effects or heatmaps where you need simple circular markers.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <FAQTemplate title="dot() and stamp() FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher note="This is a fun creative topic. Let students design a 'stamp collection' – change shape, color, size, and stamp a pattern. Compare with drawing circles using dot(). Emphasize that stamp() is like an ink pad: it copies the whole turtle at that moment, including rotation. For math class, use dot() to plot points from a function table. It's a low‑pressure way to practice coordinates." />
        </div>
      </div>
    </div>
  );
};

export default Topic12;