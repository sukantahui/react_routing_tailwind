// Topic3.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic3_files/topic3_questions';

const Topic3 = () => {
  // Purpose: Introduce logical variables (p, q, r) as symbols representing propositions
  // Return: JSX component with symbolic representation concepts
  // When & why: After understanding propositions, students need to abstract them into symbols for manipulation

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Logical Variables and Representation (p, q, r)
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Using symbols to represent propositions — the language of symbolic logic
          </p>
        </div>

        {/* SVG: Variable mapping illustration */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
            <svg width="450" height="180" viewBox="0 0 450 180" className="w-full max-w-md">
              <defs>
                <linearGradient id="varGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#06B6D4", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
                </linearGradient>
              </defs>
              {/* Proposition boxes */}
              <rect x="20" y="30" width="110" height="50" rx="6" fill="url(#varGrad)" opacity="0.8">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="75" y="60" textAnchor="middle" fill="white" fontSize="12">"Swadeep studies"</text>
              
              <rect x="20" y="100" width="110" height="50" rx="6" fill="url(#varGrad)" opacity="0.8">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="75" y="130" textAnchor="middle" fill="white" fontSize="12">"Tuhina plays"</text>
              
              {/* Arrow and variable mapping */}
              <line x1="135" y1="55" x2="175" y2="55" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="135" y1="125" x2="175" y2="125" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" begin="0.5s" repeatCount="indefinite" />
              </line>
              
              {/* Variable symbols */}
              <circle cx="200" cy="55" r="28" fill="#1E293B" stroke="#06B6D4" strokeWidth="2">
                <animate attributeName="r" values="28;32;28" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="200" y="60" textAnchor="middle" fill="#06B6D4" fontSize="20" fontWeight="bold">p</text>
              
              <circle cx="200" cy="125" r="28" fill="#1E293B" stroke="#3B82F6" strokeWidth="2">
                <animate attributeName="r" values="28;32;28" dur="3s" begin="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="200" y="130" textAnchor="middle" fill="#3B82F6" fontSize="20" fontWeight="bold">q</text>
              
              <text x="300" y="90" textAnchor="middle" fill="#9CA3AF" fontSize="12">p = "Swadeep studies"</text>
              <text x="300" y="115" textAnchor="middle" fill="#9CA3AF" fontSize="12">q = "Tuhina plays"</text>
            </svg>
          </div>
        </div>

        {/* Core concept */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What are Logical Variables?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Logical variables (also called <span className="text-yellow-400">propositional variables</span>) are symbols — typically lowercase letters like 
            <span className="text-cyan-400 font-mono"> p, q, r, s </span> — that stand for specific propositions.
          </p>
          <p className="text-gray-300 leading-relaxed">
            They allow us to <span className="text-green-400">abstract away content</span> and focus on logical structure. Instead of writing
            "Swadeep studies" repeatedly, we assign it to variable <span className="text-cyan-400 font-mono">p</span> and manipulate it symbolically.
          </p>
          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border-l-4 border-cyan-500">
            <p className="text-gray-200 font-mono text-sm">📌 Definition: A logical variable is a symbol that represents a proposition and can take the value True or False.</p>
          </div>
        </div>

        {/* Why use variables */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Why Use Logical Variables?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-400 mb-2">🎯 Abstraction</h3>
              <p className="text-gray-300 text-sm">Focus on logical relationships, not specific content.</p>
              <p className="text-gray-400 text-xs mt-1">p ∧ q means "both propositions are true" regardless of what p and q are.</p>
            </div>
            <div className="bg-cyan-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-400 mb-2">🔄 Reusability</h3>
              <p className="text-gray-300 text-sm">Same variable can be used multiple times.</p>
              <p className="text-gray-400 text-xs mt-1">p ∨ p simplifies to p (idempotent law).</p>
            </div>
            <div className="bg-cyan-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-400 mb-2">⚡ Efficiency</h3>
              <p className="text-gray-300 text-sm">Write complex statements concisely.</p>
              <p className="text-gray-400 text-xs mt-1">Instead of a paragraph, write (p ∧ q) → r.</p>
            </div>
            <div className="bg-cyan-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-400 mb-2">🧠 Clarity</h3>
              <p className="text-gray-300 text-sm">Reveals logical structure without distraction.</p>
              <p className="text-gray-400 text-xs mt-1">Truth tables become manageable with p, q, r.</p>
            </div>
          </div>
        </div>

        {/* Convention and naming */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Naming Conventions</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">📌</span>
              <span className="text-gray-300"><span className="font-semibold">Standard letters:</span> p, q, r, s (most common), also a, b, c.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">📌</span>
              <span className="text-gray-300"><span className="font-semibold">Subscripts:</span> p₁, p₂, p₃ for many propositions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">📌</span>
              <span className="text-gray-300"><span className="font-semibold">Descriptive names (in programming):</span> isRaining, hasPermission, userLoggedIn.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">📌</span>
              <span className="text-gray-300"><span className="font-semibold">Order matters:</span> Use p, q, r in the order propositions appear.</span>
            </li>
          </ul>
        </div>

        {/* Real-life examples with mapping */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">📚 Real-Life Examples: Mapping to Variables</h2>
          <div className="space-y-5">
            <div className="border border-cyan-700/50 rounded-xl p-4 bg-cyan-900/10">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Example 1: Student Life in Barrackpore</h3>
              <div className="space-y-2 text-gray-300">
                <p>Let <span className="font-mono text-cyan-400">p</span> = "Swadeep attends morning class"</p>
                <p>Let <span className="font-mono text-cyan-400">q</span> = "Tuhina completes homework"</p>
                <p>Let <span className="font-mono text-cyan-400">r</span> = "The teacher is present"</p>
                <p className="text-gray-400 text-sm mt-2">Then "Swadeep attends AND Tuhina completes homework" becomes <span className="font-mono">p ∧ q</span>.</p>
              </div>
            </div>
            <div className="border border-blue-700/50 rounded-xl p-4 bg-blue-900/10">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Example 2: Weather in Shyamnagar</h3>
              <div className="space-y-2 text-gray-300">
                <p>Let <span className="font-mono text-blue-400">p</span> = "It is raining"</p>
                <p>Let <span className="font-mono text-blue-400">q</span> = "It is cold"</p>
                <p>Let <span className="font-mono text-blue-400">r</span> = "The ground is wet"</p>
                <p className="text-gray-400 text-sm mt-2">"If it is raining OR it is cold, then the ground might be wet" becomes <span className="font-mono">(p ∨ q) → r</span>.</p>
              </div>
            </div>
            <div className="border border-purple-700/50 rounded-xl p-4 bg-purple-900/10">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Example 3: Abhronila's Exam Preparation</h3>
              <div className="space-y-2 text-gray-300">
                <p>Let <span className="font-mono text-purple-400">p</span> = "Abhronila studies mathematics"</p>
                <p>Let <span className="font-mono text-purple-400">q</span> = "Susmita practices problems"</p>
                <p>Let <span className="font-mono text-purple-400">r</span> = "Debangshu reviews notes"</p>
                <p className="text-gray-400 text-sm mt-2">"Abhronila studies AND (Susmita practices OR Debangshu reviews)" becomes <span className="font-mono">p ∧ (q ∨ r)</span>.</p>
              </div>
            </div>
            <div className="border border-green-700/50 rounded-xl p-4 bg-green-900/10">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Example 4: Local Travel in Naihati</h3>
              <div className="space-y-2 text-gray-300">
                <p>Let <span className="font-mono text-green-400">p</span> = "Train is on time"</p>
                <p>Let <span className="font-mono text-green-400">q</span> = "Bus is available"</p>
                <p>Let <span className="font-mono text-green-400">r</span> = "I reach Ichapur by 9 AM"</p>
                <p className="text-gray-400 text-sm mt-2">"If train is on time OR bus is available, then I reach Ichapur by 9 AM" becomes <span className="font-mono">(p ∨ q) → r</span>.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Truth values of variables */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Truth Values of Variables</h2>
          <p className="text-gray-300 mb-4">
            Each logical variable can be assigned <span className="text-green-400">True (T)</span> or <span className="text-red-400">False (F)</span>.
            This assignment is called a <span className="text-yellow-400">truth assignment</span> or <span className="text-yellow-400">interpretation</span>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 p-3 rounded-lg">
              <p className="font-mono text-green-400">p = True</p>
              <p className="text-gray-400 text-sm">The proposition p is true in reality.</p>
            </div>
            <div className="bg-red-900/20 p-3 rounded-lg">
              <p className="font-mono text-red-400">p = False</p>
              <p className="text-gray-400 text-sm">The proposition p is false in reality.</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4 text-sm">
            In symbolic logic, we often consider all possible truth assignments (2ⁿ combinations for n variables) to analyze compound statements.
          </p>
        </div>

        {/* Programming analogy */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Programming Analogy: Boolean Variables</h2>
          <p className="text-gray-300 mb-3">
            In programming, logical variables correspond directly to <span className="text-yellow-400">boolean variables</span>.
          </p>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
            <p className="text-blue-400">// Declaring logical variables</p>
            <p className="text-gray-300">let <span className="text-cyan-400">p</span> = true;     // p represents "user is logged in"</p>
            <p className="text-gray-300">let <span className="text-cyan-400">q</span> = false;    // q represents "has admin permission"</p>
            <p className="text-gray-300">let <span className="text-cyan-400">r</span> = true;     // r represents "session is active"</p>
            <p className="text-blue-400 mt-2">// Using variables in condition</p>
            <p className="text-gray-300">if (p && (q || r)) {`{`}</p>
            <p className="text-gray-300 text-indent-4">console.log("Access granted");</p>
            <p className="text-gray-300">{`}`}</p>
          </div>
          <p className="text-gray-400 text-sm mt-3">💡 In production code, use descriptive names like <span className="font-mono">isLoggedIn</span>, <span className="font-mono">hasPermission</span>, not just p, q, r.</p>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Consistent Mapping:</span> Write down what each variable stands for before using it. Don't assume the reader knows.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Order of Variables:</span> Use p, q, r in the order they first appear in the statement.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Avoid Overloading:</span> Don't use the same variable for different propositions in the same context.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Descriptive Names in Code:</span> Use meaningful names (isRaining, hasLicense) instead of p, q for readability.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Subscripts for Many:</span> When you need more than 4 variables, use p₁, p₂, p₃ or a, b, c, d.</span>
            </li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls & Misconceptions</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Confusing the variable with its truth value — p is not true; p represents a proposition that may be true or false.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Using the same variable for two different propositions in one expression.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Forgetting to define variable mapping — then the expression is meaningless.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Assuming p always stands for the same thing across all problems (it's local to each problem).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Using numbers or special characters as variable names (only letters with optional subscripts).</span>
            </li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Always define your variables before using them in logical expressions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Use separate variables for distinct propositions, even if they seem similar.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">In truth tables, list variables in a consistent order (p, q, r left to right).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">When converting from English, underline the atomic propositions and assign variables systematically.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">In collaborative work, include a legend: "Let p = ... , q = ..."</span>
            </li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500" />
              <span className="text-gray-300">I can assign a logical variable (p, q, r) to a proposition.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500" />
              <span className="text-gray-300">I understand that variables are placeholders, not truth values themselves.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500" />
              <span className="text-gray-300">I can map multiple propositions to different variables correctly.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500" />
              <span className="text-gray-300">I can read a logical expression and explain what each variable represents.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-cyan-500" />
              <span className="text-gray-300">I know the convention of using p, q, r in order and when to use subscripts.</span>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">
            "In Barrackpore, if p = 'Train is on time', q = 'Bus is available', and r = 'I reach school by 8 AM', 
            what does (p ∨ q) → r mean in words? Try creating your own mapping for a situation in Shyamnagar or Naihati."
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s]">
          <Teacher note="Students often think p means 'true' or that p is the proposition itself. Clarify that p is a name for a proposition, like a variable in algebra. Use many translation exercises: give them English sentences and ask them to assign p, q, r. Emphasize that the same p cannot represent two different statements. Relate to programming variables for CS students." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s]">
          <FAQTemplate
            title="Logical Variables & Representation FAQs"
            questions={questions}
          />
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_.*\\] { animation: none !important; }
        }
        .dark { color-scheme: dark; }
      `}</style>
    </div>
  );
};

export default Topic3;