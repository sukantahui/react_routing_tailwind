import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 0: Introduction to Boolean Algebra and its applications in digital electronics
 * 
 * Component: Topic0
 * Purpose: Provides a foundational introduction to Boolean Algebra, its history,
 *          core concepts, and its critical role in modern digital electronics.
 *          This topic sets the stage for all subsequent learning.
 * 
 * When & Why: Used as the first lesson in the Boolean Algebra series. It establishes
 *             the "why" behind the subject, motivating students by connecting abstract
 *             logic to the physical devices they use daily.
 * 
 * Return Type: JSX.Element
 */

const Topic0 = () => {
  // State is not strictly necessary for this static component, but included to
  // demonstrate potential for future interactive elements.
  const [isHighlighted, setIsHighlighted] = useState(false);

  // No complex useEffect needed for this topic. A simple mount effect for
  // logging or analytics could be added if required.
  useEffect(() => {
    // Example: Log topic view for analytics (optional)
    // console.log('Topic 0: Introduction to Boolean Algebra viewed');
  }, []);

  // Data for the application examples section
  const applications = [
    {
      title: "Computer Processors (CPUs)",
      description: "The billions of transistors inside a CPU act as switches that perform Boolean operations (AND, OR, NOT) to execute instructions.",
      icon: (
        <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14M5 15h14M7 7h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
        </svg>
      )
    },
    {
      title: "Memory Chips (RAM/SSD)",
      description: "Boolean algebra is used to design the address decoders that select specific memory cells to read or write data.",
      icon: (
        <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    {
      title: "Digital Logic Circuits",
      description: "Logic gates (AND, OR, NOT) are the physical building blocks that implement Boolean functions in hardware.",
      icon: (
        <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Search Engines & Databases",
      description: "Behind the scenes, search queries use Boolean logic (AND, OR, NOT) to filter and return precise results.",
      icon: (
        <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    }
  ];

  // SVG Animation for the logic gate flow (using native SVG <animate>)
  const LogicGateSVG = () => (
    <div className="flex justify-center my-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl shadow-inner">
      <svg width="300" height="120" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="#3b82f6" />
          </marker>
        </defs>
        {/* Input A line and pulse */}
        <line x1="20" y1="30" x2="80" y2="30" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="20" cy="30" r="4" fill="#3b82f6" />
        <text x="10" y="25" fontSize="10" fill="#3b82f6">A</text>
        <circle cx="80" cy="30" r="3" fill="#3b82f6">
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Input B line and pulse */}
        <line x1="20" y1="70" x2="80" y2="70" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="20" cy="70" r="4" fill="#3b82f6" />
        <text x="10" y="65" fontSize="10" fill="#3b82f6">B</text>
        <circle cx="80" cy="70" r="3" fill="#3b82f6">
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* AND Gate shape */}
        <path d="M 100 20 L 100 80 L 140 80 Q 160 70 140 60 L 100 60 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
        <text x="115" y="52" fontSize="12" fontWeight="bold" fill="#1e293b">AND</text>

        {/* Output line with animated pulse */}
        <line x1="160" y1="50" x2="220" y2="50" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <circle cx="220" cy="50" r="3" fill="#3b82f6">
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="230" y="45" fontSize="10" fill="#3b82f6">Q = A·B</text>
      </svg>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section with animated fade-up */}
      <div className="mb-12 text-center animate-[fade-up_0.6s_ease-out] motion-safe:animate-[fade-up_0.6s_ease-out]">
        <div className="inline-block p-3 mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Introduction to</span>
          <span className="block text-blue-600 dark:text-blue-400">Boolean Algebra</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          The mathematical foundation of the digital world, from your smartphone to supercomputers.
        </p>
      </div>

      {/* Theory and Concept Section - Staggered cards */}
      <div className="space-y-8">
        {/* What is Boolean Algebra? */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700 animate-[fade-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-up_0.6s_ease-out_0.1s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🧠</span> What is Boolean Algebra?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Boolean Algebra is a branch of algebra that deals with <strong className="text-blue-600 dark:text-blue-400">binary variables</strong> and <strong className="text-blue-600 dark:text-blue-400">logical operations</strong>. Unlike regular algebra where variables can have infinite values, Boolean variables can only take one of two values: <strong>0 (False)</strong> or <strong>1 (True)</strong>. It was introduced by <strong>George Boole</strong> in his 1854 book "An Investigation of the Laws of Thought".
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This simple yet powerful system provides the rules for how digital circuits process information. Every electronic device you use—from a digital watch to a data center server—relies on Boolean Algebra to perform its operations.
          </p>
        </div>

        {/* Why is it Important? */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700 animate-[fade-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-up_0.6s_ease-out_0.2s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">💡</span> Why is it Important?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Boolean Algebra is the <strong className="text-blue-600 dark:text-blue-400">language of digital logic</strong>. It allows engineers to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Design</strong> complex digital circuits like CPUs, memory, and controllers.</li>
            <li><strong>Analyze</strong> and <strong>simplify</strong> logic expressions, leading to cheaper, faster, and more reliable hardware.</li>
            <li><strong>Understand</strong> how high-level programming code is eventually translated into machine-level operations.</li>
            <li><strong>Implement</strong> efficient search algorithms and database queries.</li>
          </ul>
        </div>

        {/* Key Concepts Preview */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700 animate-[fade-up_0.6s_ease-out_0.3s] motion-safe:animate-[fade-up_0.6s_ease-out_0.3s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔑</span> Key Concepts We'll Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <span className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">AND (·)</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Output is 1 only if ALL inputs are 1.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <span className="font-mono text-lg font-bold text-green-700 dark:text-green-300">OR (+)</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Output is 1 if AT LEAST ONE input is 1.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <span className="font-mono text-lg font-bold text-red-700 dark:text-red-300">NOT (')</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inverts the input (0→1, 1→0).</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <span className="font-mono text-lg font-bold text-purple-700 dark:text-purple-300">Laws & Theorems</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">De Morgan's, Distributive, etc., for simplification.</p>
            </div>
          </div>
        </div>

        {/* Visual: Logic Gate SVG with Animation */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 animate-[fade-up_0.6s_ease-out_0.4s] motion-safe:animate-[fade-up_0.6s_ease-out_0.4s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔌</span> From Algebra to Circuit
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Boolean expressions are directly implemented using <strong className="text-blue-600 dark:text-blue-400">logic gates</strong>. This animation shows an AND gate in action.
          </p>
          <LogicGateSVG />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The pulses represent electrical signals (0V for 0, +V for 1). The AND gate outputs 1 only if both inputs are 1.
          </p>
        </div>

        {/* Real-World Applications */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 animate-[fade-up_0.6s_ease-out_0.5s] motion-safe:animate-[fade-up_0.6s_ease-out_0.5s] [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🌍</span> Real-World Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{app.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              <span className="font-bold">Student Story:</span> Imagine Tuhina from Barrackpore searching for "best biryani near Shyamnagar". The search engine uses Boolean logic behind the scenes: <strong className="font-mono">("biryani" AND "Shyamnagar") OR ("best biryani")</strong> to give her the best results!
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 animate-[fade-up_0.6s_ease-out_0.6s] motion-safe:animate-[fade-up_0.6s_ease-out_0.6s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Think in Binary:</strong> Train your brain to see problems as a series of TRUE/FALSE conditions. This is the foundation of algorithmic thinking.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Use Truth Tables First:</strong> When stuck on a complex logic problem, always start by listing all possible input combinations. It's a debugger for your brain.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Simplify Before Implementing:</strong> In hardware, fewer gates = lower cost, less power, and higher speed. Always simplify your Boolean expressions using laws and K-Maps.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Document Your Logic:</strong> For complex circuits, use comments (in HDL like Verilog/VHDL) to explain the purpose of each block. This is a non-negotiable industry standard.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 animate-[fade-up_0.6s_ease-out_0.7s] motion-safe:animate-[fade-up_0.6s_ease-out_0.7s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing '+' with Arithmetic Addition:</strong> In Boolean Algebra, '+' means OR, not addition. 1 + 1 = 1, not 2.</li>
            <li><strong>Ignoring Operator Precedence:</strong> NOT (') has the highest precedence, then AND (·), then OR (+). <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A·B + C</code> means <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(A·B) + C</code>.</li>
            <li><strong>Forgetting the Duality Principle:</strong> If a theorem is true, its dual (swap 0↔1, +↔·) is also true. This is a powerful shortcut often missed.</li>
            <li><strong>Overcomplicating Simplification:</strong> Sometimes the simplest solution is to use a K-Map rather than algebraic manipulation, especially for 3-4 variables.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 animate-[fade-up_0.6s_ease-out_0.8s] motion-safe:animate-[fade-up_0.6s_ease-out_0.8s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Consistent Naming:</strong> Use descriptive variable names (e.g., <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">isReady</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">hasError</code>) instead of single letters for maintainability.</li>
            <li><strong>Verify with Truth Tables:</strong> After simplification, always compare the truth table of the original and simplified expression to ensure equivalence.</li>
            <li><strong>Start Simple:</strong> For complex problems, break them down into smaller, manageable sub-functions (e.g., using intermediate variables).</li>
            <li><strong>Embrace Abstraction:</strong> Treat complex logic blocks as "black boxes" with defined inputs and outputs to manage complexity.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-blue-500 animate-[fade-up_0.6s_ease-out_0.9s] motion-safe:animate-[fade-up_0.6s_ease-out_0.9s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Define Boolean Algebra in your own words.</li>
            <li>List the two possible values of a Boolean variable.</li>
            <li>Name at least three real-world applications of Boolean Algebra.</li>
            <li>Explain the difference between Boolean Algebra and regular algebra.</li>
            <li>Identify the basic AND, OR, and NOT operations.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700 animate-[fade-up_0.6s_ease-out_1s] motion-safe:animate-[fade-up_0.6s_ease-out_1s]  [animation-fill-mode:forwards]">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Imagine you're designing a simple security system for a house in Ichapur. It has a motion sensor (M), a door sensor (D), and a master switch (S). The alarm (A) should sound if the master switch is ON AND (either the motion sensor is triggered OR the door sensor is triggered). 
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Try writing this condition as a Boolean expression.</strong> Can you see how the AND and OR operations combine to form the logic? This is exactly how digital systems are designed!
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fade-up_0.6s_ease-out_1.1s] motion-safe:animate-[fade-up_0.6s_ease-out_1.1s]  [animation-fill-mode:forwards]">
          <Teacher note={
            "Welcome to the first topic! 🎓\n\n" +
            "This introduction is crucial. Students often underestimate Boolean Algebra, thinking it's 'just about 0s and 1s'. Emphasize the connection to real hardware.\n\n" +
            "💡 **Teaching Tip:** Use analogies. 'AND' is like needing both a key and a fingerprint to open a door. 'OR' is like having either a credit card or cash to pay.\n\n" +
            "🔍 **Point to Remember:** The transition from abstract algebra to physical circuits (gates) is where many students get excited. Use the SVG animation to reinforce that Boolean expressions have a physical form."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-[fade-up_0.6s_ease-out_1.2s] motion-safe:animate-[fade-up_0.6s_ease-out_1.2s]  [animation-fill-mode:forwards]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is the main difference between Boolean Algebra and ordinary algebra?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Boolean Algebra deals with binary values (0 and 1) and logical operations (AND, OR, NOT), while ordinary algebra deals with real numbers and arithmetic operations (+, -, ×, ÷).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: Who invented Boolean Algebra?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: George Boole, an English mathematician, introduced it in 1854 in his book "An Investigation of the Laws of Thought".</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: How is Boolean Algebra used in computer processors?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Processors use billions of transistors that act as logic gates. These gates perform Boolean operations to execute instructions, from simple arithmetic to complex calculations.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: What are the three basic operations in Boolean Algebra?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: AND (·), OR (+), and NOT (').</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: Why is Boolean Algebra important for digital electronics?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It provides the mathematical foundation for designing, analyzing, and simplifying digital circuits, making them efficient, reliable, and cost-effective.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Can Boolean Algebra be applied outside of electronics?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! It's used in search engines, databases, programming (conditional statements), network routing, and even in set theory and probability.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: What does a Boolean variable represent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It represents a logical statement that can be either TRUE (1) or FALSE (0). For example, "It is raining" could be a Boolean variable.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: How does the concept of duality help in Boolean Algebra?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The Duality Principle states that if a theorem is true, its dual (obtained by swapping 0↔1 and +↔·) is also true. This gives us two theorems for the price of one!</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: What is the first step in designing a digital circuit from a problem statement?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Translate the problem into a truth table, then derive a Boolean expression from that truth table.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: Name a real-world device that heavily relies on Boolean logic.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A calculator, a traffic light controller, a digital thermometer, or any device with a microprocessor.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: What is a logic gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A logic gate is an electronic circuit that performs a basic Boolean function. It has one or more inputs and produces a single output based on the function it implements.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: In a search query, what does the Boolean operator AND do?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It narrows the search results by requiring all search terms to be present. For example, "apple AND orange" returns results containing both words.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Why is simplification of Boolean expressions important in industry?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Simplified expressions lead to circuits with fewer logic gates, which are cheaper to manufacture, consume less power, and are faster.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: What does the NOT operation do?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It inverts the input value. If input is 1, output is 0. If input is 0, output is 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: How did Boolean Algebra contribute to the development of computers?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Claude Shannon, in his 1937 master's thesis, showed how Boolean Algebra could be used to design relay circuits, laying the foundation for digital computer design.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: What is a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A truth table lists all possible combinations of inputs and the corresponding output for a given Boolean function. It's a fundamental tool for defining and verifying logic.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: Give a simple example where AND logic is used in daily life.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A car's engine starts only if the key is turned AND the gear is in park (or neutral). Both conditions must be true.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: What is the significance of the year 1854 for Boolean Algebra?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It's the year George Boole published his book "An Investigation of the Laws of Thought", formally introducing the algebra.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: How does Boolean Algebra help in writing efficient code?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Understanding Boolean logic helps in writing precise and efficient conditional statements (if-else) and loop conditions, reducing logic errors and improving code readability.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: What is the goal of studying Boolean Algebra in this course?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: To master the ability to represent, analyze, and simplify digital logic, which is essential for careers in computer science, electronics, and information technology.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic0;