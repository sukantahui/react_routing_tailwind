import React from "react";
import clsx from "clsx";

// Calculate teacher's experience dynamically (from 1998)
const currentYear = new Date().getFullYear();
const experienceYears = currentYear - 1998;

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Inline keyframes for animations (respects reduced motion) */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4 motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            What is Programming?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Programming is the art and science of telling a computer what to do.
            It's like writing a recipe, but for a very literal-minded chef.
          </p>
        </header>

        {/* Overview Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            📖 Conceptual Explanation
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At its core, <strong>programming</strong> is the process of creating a set of
              instructions that a computer can follow to accomplish a specific task. These
              instructions are written in a language the computer understands — a programming
              language.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Think of it like guiding a friend to bake a cake. You wouldn't say "bake a cake"
              without steps; you'd list ingredients, measurements, mixing order, baking time,
              and temperature. Computers are even more literal — they need every tiny detail
              spelled out perfectly.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-6">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Analogy:</strong> Swadeep wants to teach his little brother Debangshu
                how to make a sandwich. He writes down step-by-step instructions. That's
                programming! Debangshu is the computer, the instructions are the program, and
                the sandwich is the output.
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🌍 Real-World Usage
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Everyday Life</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Smartphone apps (Instagram, WhatsApp) are programs.</li>
                <li>ATM machines run on programs to dispense cash.</li>
                <li>Traffic lights use programmed timers and sensors.</li>
                <li>Microwave ovens have preset cooking programs.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">In Our CNAT Centers</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Tuhina built a small game in Scratch at Barrackpore CNAT.</li>
                <li>Abhronila automated attendance tracking at Naihati CNAT.</li>
                <li>Ritaja created a website for her father's shop.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How Programming Works (Compact SVG) */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ⚙️ How Programming Works
          </h2>
          <div className="flex flex-col items-center">
            {/* Compact SVG Flow Diagram */}
            <svg
              viewBox="0 0 400 100"
              className="w-full max-w-2xl h-auto hover:scale-105 transition-transform duration-300"
              aria-label="Programming flow: Source code → Computer → Output"
            >
              {/* Background (optional) */}
              <rect width="400" height="100" fill="transparent" />

              {/* Arrowhead definition */}
              <defs>
                <marker id="arrowhead-sm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#64748B" />
                </marker>
              </defs>

              {/* Source Code block */}
              <rect x="30" y="25" width="90" height="50" rx="8" fill="#3B82F6" className="dark:fill-blue-600" stroke="#2563EB" strokeWidth="2" />
              <text x="50" y="50" fill="white" fontSize="12" fontWeight="bold">Source</text>
              <text x="55" y="65" fill="white" fontSize="10">Code</text>

              {/* Arrow 1 */}
              <line x1="130" y1="50" x2="170" y2="50" stroke="#64748B" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrowhead-sm)" />

              {/* Computer block */}
              <rect x="180" y="20" width="90" height="60" rx="8" fill="#10B981" className="dark:fill-green-600" stroke="#059669" strokeWidth="2" />
              <text x="205" y="50" fill="white" fontSize="12" fontWeight="bold">Computer</text>

              {/* Arrow 2 */}
              <line x1="280" y1="50" x2="320" y2="50" stroke="#64748B" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrowhead-sm)" />

              {/* Output block */}
              <rect x="330" y="25" width="90" height="50" rx="8" fill="#F59E0B" className="dark:fill-amber-600" stroke="#D97706" strokeWidth="2" />
              <text x="360" y="50" fill="white" fontSize="12" fontWeight="bold">Output</text>
              <text x="365" y="65" fill="white" fontSize="10">Result</text>

              {/* Animated dot moving along arrows */}
              <circle cx="130" cy="50" r="5" fill="#EF4444" className="dark:fill-red-400">
                <animate
                  attributeName="cx"
                  values="130;170;280;320;130"
                  dur="3.5s"
                  repeatCount="indefinite"
                  fill="freeze"
                  keyTimes="0;0.3;0.6;0.9;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.6;1;0.6;1"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Hint label */}
              <text x="150" y="85" fontSize="9" fill="#6B7280" className="dark:fill-gray-400">
                (instructions flow)
              </text>
            </svg>

            <p className="text-center text-gray-700 dark:text-gray-300 mt-6 max-w-2xl leading-relaxed">
              You write <strong>source code</strong> (instructions). The computer's processor <strong>executes</strong> them
              step by step. The result is your <strong>output</strong> — a game, a website, or even a simple "Hello, World!".
            </p>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            💡 Tips & Tricks (Professional Habits)
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-green-500">✓</span>
              <span><strong>Think before you code:</strong> Sketch the steps on paper first. Tuhina always draws a flowchart before typing.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">✓</span>
              <span><strong>Name things clearly:</strong> Use meaningful names like <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">studentAge</code> instead of <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">x</code>.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">✓</span>
              <span><strong>Break big problems into small pieces:</strong> If a task feels huge, split it into smaller, manageable steps.</span>
            </li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ❌ Common Beginner Mistakes
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-red-500">⚠️</span>
              <span><strong>Missing semicolons or brackets:</strong> Computers are strict. A missing ; can break everything.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500">⚠️</span>
              <span><strong>Assuming the computer knows what you mean:</strong> You must be explicit. "Make it faster" doesn't work; you need to write the logic.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500">⚠️</span>
              <span><strong>Skipping planning:</strong> Debangshu once started coding without a plan and ended up rewriting everything.</span>
            </li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ✅ Best Practices
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-blue-500">📌</span>
              <span><strong>Comment your code:</strong> Explain why you did something, not what. Future you will thank you.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">📌</span>
              <span><strong>Keep it simple:</strong> Avoid clever tricks if they make code hard to read. Readability matters.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">📌</span>
              <span><strong>Test frequently:</strong> Run your program after every small change to catch errors early.</span>
            </li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ✅ Mini Checklist
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2">
              <input type="checkbox" className="mt-1" readOnly checked={false} disabled />
              <span>I understand that programming is giving instructions.</span>
            </li>
            <li className="flex gap-2">
              <input type="checkbox" className="mt-1" readOnly checked={false} disabled />
              <span>I know that computers need precise steps.</span>
            </li>
            <li className="flex gap-2">
              <input type="checkbox" className="mt-1" readOnly checked={false} disabled />
              <span>I can think of at least three real-world programs.</span>
            </li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] hover:shadow-md transition-all duration-300">
          <h2 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
            🧠 Think About...
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
            If you had to explain to a friend how to tie their shoelaces over a phone call (they can't see you),
            what steps would you give? That's exactly what programming feels like!
          </p>
        </section>

        {/* Teacher's Note */}
        <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] hover:shadow-md transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="w-12 h-12 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                Teacher's Note
              </h2>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed mb-4">
                <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in, mobile: 7003756860) has been
                teaching programming since 1998 — that's <strong>{experienceYears} years</strong> of experience!
                His key advice for beginners: "Don't memorize syntax; understand the logic. Programming is
                problem-solving, not typing. And always, always debug with print statements!"
              </p>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                Skills: Programming Languages, RDBMS, Operating Systems, Web Development. His students from
                Barrackpore CNAT and Naihati CNAT remember his patient explanations and real-world examples.
              </p>
            </div>
          </div>
        </section>

        {/* Footer note about next topics */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm pt-8 border-t border-gray-200 dark:border-gray-700 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <p>This is Topic 0: "What is Programming?" — the foundation. Next, we'll explore Programming Languages.</p>
        </footer>
      </div>
    </div>
  );
};

export default Topic0;