import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";

// Import Python files
import basicConfig from "./topic2_files/basic_config.py?raw";
import titleDemo from "./topic2_files/title_demo.py?raw";
import screensizeDemo from "./topic2_files/screensize_demo.py?raw";

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

const Topic2 = () => {
  const prototypes = [
    { name: "setup(width, height, startx, starty)", returnType: "None", purpose: "Sets size & position of main window.", usage: "turtle.setup(800,600)" },
    { name: "title(title_str)", returnType: "None", purpose: "Sets window title bar text.", usage: "turtle.title('My Drawing')" },
    { name: "bgcolor(color)", returnType: "None", purpose: "Sets background color of canvas.", usage: "turtle.bgcolor('lightblue')" },
    { name: "screensize(canvwidth, canvheight, bg)", returnType: "None", purpose: "Sets scrollable canvas area (optional bg).", usage: "turtle.screensize(2000,1500,'gray')" },
    { name: "window_width()", returnType: "int", purpose: "Returns width of turtle window.", usage: "w = turtle.window_width()" },
    { name: "window_height()", returnType: "int", purpose: "Returns height of turtle window.", usage: "h = turtle.window_height()" }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Screen Configuration
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            setup(), title(), bgcolor(), screensize() – control the canvas environment
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🖥️ Window Setup</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">🎨 Background Color</span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">📏 Canvas Size</span>
          </div>
        </div>

        {/* SVG Illustration: Window vs Canvas metaphor */}
        <div className="flex justify-center animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="bg-gray-800/40 rounded-2xl p-4 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <svg width="500" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[500px] h-auto">
             
              <rect x="50" y="30" width="400" height="280" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="10" />
              <text x="65" y="55" fill="#cbd5e1" fontSize="12">Window (setup)</text>
             
              <rect x="50" y="30" width="400" height="25" fill="#334155" rx="10" />
              <rect x="50" y="45" width="400" height="10" fill="#334155" />
              <text x="200" y="48" fill="#facc15" fontSize="10" textAnchor="middle">Title: "My Turtle Art"</text>
             
              <rect x="70" y="70" width="360" height="220" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="5,5" />
              <text x="80" y="90" fill="#2dd4bf" fontSize="10">Canvas (screensize)</text>
              
              <polygon points="420,120 440,130 420,140" fill="#94a3b8" />
              <polygon points="420,200 440,190 420,180" fill="#94a3b8" />
              <polygon points="380,280 390,300 400,280" fill="#94a3b8" />
              <text x="430" y="170" fill="#94a3b8" fontSize="10">scroll</text>
              
              <circle cx="150" cy="150" r="8" fill="#14b8a6">
                <animate attributeName="cx" values="150;350;450;150" dur="6s" repeatCount="indefinite" />
              </circle>
              <text x="150" y="170" fill="#14b8a6" fontSize="9">Turtle</text>
            </svg>
            <p className="text-center text-sm text-gray-400 mt-2">Window (outer frame) vs Canvas (scrollable drawing area)</p>
          </div>
        </div>

        {/* Explanation */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🖥️ Configuring the Turtle Screen</h2>
          <div className="bg-gray-800/30 rounded-xl p-5 space-y-3">
            <p className="leading-relaxed">Before drawing, you can customize the turtle environment. The <strong>window</strong> is what the user sees; the <strong>canvas</strong> is the drawing area (which can be larger and scrollable). Functions like <code>setup()</code>, <code>title()</code>, <code>bgcolor()</code>, and <code>screensize()</code> give you full control.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-emerald-300">Key Functions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code className="bg-gray-700 px-1">setup(width, height, startx, starty)</code> – window size & position.</li>
                  <li><code className="bg-gray-700 px-1">title("text")</code> – changes window title bar.</li>
                  <li><code className="bg-gray-700 px-1">bgcolor("color")</code> – background color of canvas.</li>
                  <li><code className="bg-gray-700 px-1">screensize(width, height, bg)</code> – scrollable canvas area.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Why Configure?</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Professional presentation (custom titles, colors).</li>
                  <li>Fit drawings of different sizes.</li>
                  <li>Enable scrolling for large coordinate ranges.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Python Demos */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">💻 Code Examples</h2>
          <PythonFileLoader fileModule={basicConfig} title="basic_config.py" highlightLines={[3,4,5,6]} />
          <PythonFileLoader fileModule={titleDemo} title="title_demo.py" highlightLines={[4,5]} />
          <PythonFileLoader fileModule={screensizeDemo} title="screensize_demo.py" highlightLines={[6,7,8,9]} />
        </section>

        {/* Prototype Table */}
        <section className="space-y-4 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <h2 className="text-3xl font-semibold border-l-4 border-emerald-500 pl-4">🔧 Function Prototypes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800/30 rounded-xl text-sm">
              <thead className="bg-gray-700/60">
                <tr><th className="px-4 py-2 text-left">Function</th><th>Return</th><th>Purpose</th><th>Example</th></tr>
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

        {/* Tips & Tricks */}
        <div className="grid lg:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-amber-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Calling setup() after creating turtle:</strong> May cause clipping. Call it first.</li>
              <li><strong>Confusing window size with canvas size:</strong> Use <code>screensize()</code> for larger drawing area.</li>
              <li><strong>Forgot to import turtle:</strong> Obviously needed, but also <code>from turtle import *</code> can shadow variables.</li>
              <li><strong>bgcolor() before Screen() creation:</strong> Use <code>screen = turtle.Screen()</code> then <code>screen.bgcolor()</code> or <code>turtle.bgcolor()</code> works.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5">
            <h3 className="text-2xl font-semibold text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Always create a Screen object: <code>screen = turtle.Screen()</code>.</li>
              <li>Set window title and size before any drawing loops.</li>
              <li>Use descriptive window titles: e.g., <code>"Swadeep's Spiral"</code>.</li>
              <li>For large patterns, set <code>screensize(2000,2000)</code> to avoid clipping.</li>
              <li>If using <code>setworldcoordinates()</code>, call after setup.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold">📝 Student Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {[
              "I can change the window size using `setup()`",
              "I can set a custom title with `title()`",
              "I can change background color with `bgcolor()`",
              "I understand that `screensize()` defines a scrollable canvas",
              "I know the difference between window and canvas",
              "I can retrieve window dimensions with `window_width()`/`window_height()`"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-emerald-400">✓</span><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Hints */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-indigo-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">💡 Hints to Explore</h3>
            <p>👉 <strong>Think about:</strong> What happens if you make the window smaller than the canvas?</p>
            <p>👉 <strong>Observe:</strong> Run `screensize(1000,1000)` then `forward(800)` – do you see scrollbars?</p>
            <p>👉 <strong>Try changing:</strong> The startx, starty parameters to position window at a specific screen location.</p>
          </div>
          <div className="bg-purple-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold">🚀 Expert Mindset</h3>
            <p>Professional applications often hide the turtle and use `tracer(0)` with custom screensize to create smooth animations. Configuring the screen properly is the first step toward polished, shareable visual programs.</p>
          </div>
        </div>

        {/* FAQs and Teacher Note */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Screen Configuration FAQs" questions={questions} />
        </div>
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <Teacher note="Demonstrate the difference between window resizing (setup) and canvas expansion (screensize) by drawing a long line. Show students how scrolling appears. Let them experiment with different background colors – but warn against dark text on dark bg. Encourage them to name their windows after themselves, e.g., 'Debangshu's Art'." />
        </div>
      </div>
    </div>
  );
};

export default Topic2;