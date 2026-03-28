import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 1: Boolean constants (0 and 1) and variables
 * 
 * Component: Topic1
 * Purpose: Explains the fundamental building blocks of Boolean Algebra:
 *          - Boolean constants (0 and 1) representing FALSE and TRUE
 *          - Boolean variables representing logical statements
 *          - Their properties, usage, and significance in digital systems
 * 
 * When & Why: Used as the second topic in the Boolean Algebra series. It establishes
 *             the core vocabulary and concepts that form the basis for all logic
 *             expressions, truth tables, and circuit designs that follow.
 * 
 * Return Type: JSX.Element
 */

const Topic1 = () => {
  // State for interactive examples
  const [selectedValue, setSelectedValue] = useState(null);
  const [variableExample, setVariableExample] = useState(true);

  // Sample variables for demonstration
  const studentExamples = [
    { name: "Swadeep", condition: "isPresent", value: true },
    { name: "Tuhina", condition: "hasCompletedHomework", value: false },
    { name: "Abhronila", condition: "scoredAbove80", value: true },
    { name: "Susmita", condition: "isTeamLeader", value: false },
    { name: "Debangshu", condition: "attendedWorkshop", value: true }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-green-100 dark:bg-green-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Boolean Constants</span>
          <span className="block text-green-600 dark:text-green-400">and Variables</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          The binary foundation: 0, 1, and the variables that represent logical states.
        </p>
      </div>

      <div className="space-y-8">
        {/* Boolean Constants Section */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔢</span> Boolean Constants: 0 and 1
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900/40">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">0</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">FALSE · OFF · LOW</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Represents the absence of a condition, a closed switch, or 0 volts in a digital circuit.
              </p>
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                <code className="text-sm font-mono text-red-700 dark:text-red-300">Example: "The light is OFF"</code>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900/40">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">TRUE · ON · HIGH</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Represents the presence of a condition, a closed switch, or a positive voltage (e.g., 5V, 3.3V) in a digital circuit.
              </p>
              <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <code className="text-sm font-mono text-green-700 dark:text-green-300">Example: "The light is ON"</code>
              </div>
            </div>
          </div>

          {/* Voltage Level Visualization */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Digital Signal Representation:</p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 dark:bg-red-600 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 hover:scale-110">
                  <span className="text-white font-bold text-2xl">0V</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Logic 0 (LOW)</span>
              </div>
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 hover:scale-110">
                  <span className="text-white font-bold text-2xl">5V</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Logic 1 (HIGH)</span>
              </div>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              In TTL logic, 0V = 0, 5V = 1. Different logic families may use different voltage levels.
            </p>
          </div>
        </div>

        {/* Boolean Variables Section */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔤</span> Boolean Variables
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-green-600 dark:text-green-400">Boolean variable</strong> is a symbol (usually a letter or descriptive name) that can represent either <strong>0 (FALSE)</strong> or <strong>1 (TRUE)</strong> at any given time. Variables allow us to create general expressions that work for all possible input combinations.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Variable Naming Conventions:</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Single letters:</strong> A, B, C, X, Y, Z (common in textbooks)</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Descriptive names:</strong> isReady, hasError, doorOpen, motionDetected (industry standard)</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Subscript notation:</strong> A₁, A₂, B₁ (for multiple related variables)</li>
            </ul>
          </div>

          {/* Interactive Variable Example */}
          <div className="mb-6 p-4 border-2 border-dashed border-green-300 dark:border-green-700 rounded-xl transition-all duration-300 hover:border-green-500 dark:hover:border-green-500">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🎮 Interactive Example: Student Status at Barrackpore High School</h3>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-700 dark:text-gray-300">Variable: </span>
                <code className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded font-mono font-bold">isPresent</code>
                <span className="text-gray-700 dark:text-gray-300">=</span>
                <button
                  onClick={() => setVariableExample(!variableExample)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-mono font-bold transition-all duration-300",
                    variableExample 
                      ? "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg" 
                      : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                  )}
                >
                  {variableExample ? "1 (TRUE)" : "0 (FALSE)"}
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {variableExample 
                  ? "✅ Student is present in class today" 
                  : "❌ Student is absent from class today"}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              💡 The variable <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">isPresent</code> can change value based on the situation. This is the power of variables!
            </p>
          </div>

          {/* Real-world Variable Examples */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🏫 Real-world Boolean Variables from Ichapur to Shyamnagar:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studentExamples.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{student.name}</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-gray-600 dark:text-gray-400">{student.condition}</code>
                    <span className={clsx(
                      "px-2 py-1 rounded text-xs font-mono font-bold",
                      student.value 
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" 
                        : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                    )}>
                      {student.value ? "= 1" : "= 0"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Constants vs Variables Comparison */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⚖️</span> Constants vs Variables
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Boolean Constants</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Boolean Variables</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Values</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Fixed: 0 or 1</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Variable: can be 0 or 1</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Change over time</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Never changes</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Can change based on conditions</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Example</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Power supply: Always 1 (VCC), Ground: Always 0 (GND)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Switch state: Open or Closed based on user input</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Usage</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Fixed references, power/ground connections</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Inputs to circuits, intermediate signals, outputs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Use Active-High vs Active-Low Naming:</strong> Append "_n" or "#" for active-low signals (e.g., <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">reset_n</code> means reset is active when 0).</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Descriptive Variables = Self-Documenting Code:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">isDoorOpen</code> is infinitely better than just <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">D</code> in complex designs.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Constant Propagation:</strong> In hardware description languages (Verilog/VHDL), constants like 0 and 1 can optimize away entire logic blocks during synthesis.</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> <strong>Think in Domains:</strong> Group related variables (e.g., all door sensors: doorA, doorB, doorC) to make expressions easier to understand and debug.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Confusing '+' with OR and numeric addition:</strong> Remember, in Boolean context, 1 + 1 = 1, not 2. The '+' is logical OR, not arithmetic addition.</li>
            <li><strong>Using 0/1 as numbers in algebra:</strong> Boolean 0 and 1 are not integers. They represent logical states. You cannot do arithmetic like 1 + 1 = 2 in Boolean Algebra.</li>
            <li><strong>Poor variable naming:</strong> Using single letters like 'a', 'b', 'c' without documentation leads to unreadable, unmaintainable code.</li>
            <li><strong>Active-Low Confusion:</strong> Forgetting that a signal named <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">enable_n</code> is TRUE when it's 0, leading to inverted logic bugs.</li>
            <li><strong>Assuming variables always represent physical wires:</strong> In programming, Boolean variables can represent computed conditions, not just physical inputs.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Name variables as questions:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">isValid</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">hasError</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">canProceed</code> make logic expressions read like English sentences.</li>
            <li><strong>Be consistent with active levels:</strong> Choose either active-high or active-low for your design and stick to it. Mixing leads to confusion.</li>
            <li><strong>Document variable meanings:</strong> In professional designs, maintain a variable dictionary or use meaningful names that self-document.</li>
            <li><strong>Use constants for fixed values:</strong> Instead of hardcoding 0 or 1, define constants like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">TRUE = 1</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">FALSE = 0</code> for readability.</li>
            <li><strong>Group related variables:</strong> Use structures or prefixes to group variables (e.g., <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">door_status_open</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">door_status_locked</code>).</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Define Boolean constants and identify their values (0 and 1).</li>
            <li>Explain what a Boolean variable represents in both digital circuits and programming.</li>
            <li>Differentiate between constants and variables with examples.</li>
            <li>Create meaningful Boolean variable names for given scenarios.</li>
            <li>Interpret simple Boolean expressions involving variables and constants.</li>
            <li>Understand that 0 and 1 represent voltage levels (LOW/HIGH) in hardware.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Imagine you're designing a smart home system for a house in Naihati. You have:
            <br /><br />
            - A temperature sensor (temp_high)
            - A motion sensor (motion_detected)
            - A door sensor (door_open)
            - A master switch (system_armed)
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Try creating Boolean variables for each sensor.</strong> Then, think about what conditions would make the alarm activate. For example, if <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">system_armed = 1</code> AND <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">motion_detected = 1</code>, what should happen? This is how real-world systems are designed!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Students often struggle to grasp that '0' and '1' are NOT numbers in the arithmetic sense. Use analogies:\n\n" +
            "💡 **Key Analogy:** '0' and '1' are like LIGHT SWITCH positions—ON or OFF. There's no '2' or '3' position.\n\n" +
            "🔍 **Common Misconception:** When I ask 'What is 1 + 1 in Boolean Algebra?', many answer '2'. Emphasize that + means OR, so 1 OR 1 = 1.\n\n" +
            "📌 **Point to Remember:** Variable naming in the real world uses descriptive names. Encourage students to move beyond 'A, B, C' and use meaningful names like 'doorOpen', 'engineOn'. This is a professional habit they should develop early."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What are the two Boolean constants?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The two Boolean constants are 0 (representing FALSE, OFF, LOW) and 1 (representing TRUE, ON, HIGH).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: Can a Boolean variable have a value other than 0 or 1?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. In Boolean Algebra and digital systems, variables can ONLY take the values 0 or 1. This binary nature is fundamental to the algebra.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: Why do we use variables instead of just constants in logic expressions?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Variables allow us to create general expressions that work for all possible input combinations. They represent inputs that can change, making our expressions reusable and flexible.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: What's the difference between a Boolean variable and a regular algebraic variable?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A Boolean variable can only be 0 or 1, while an algebraic variable can represent any real number. Boolean variables follow logical rules, not arithmetic rules.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: In digital circuits, what do 0 and 1 physically represent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They represent voltage levels. Typically, 0 represents a LOW voltage (close to 0V) and 1 represents a HIGH voltage (e.g., 5V for TTL, 3.3V for CMOS).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: Can we use names like "door_open" as Boolean variables in real hardware?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: In hardware description languages (Verilog/VHDL) and programming, yes. In physical circuits, the variable name is just a label—the actual signal is a wire carrying 0 or 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: What is an active-low signal?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: An active-low signal is TRUE (active) when its value is 0. It's often indicated by naming like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">reset_n</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">enable#</code>.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: Why is it important to use descriptive variable names?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Descriptive names make expressions self-documenting, reduce errors, and make code/circuits maintainable. <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">isDoorOpen</code> is immediately understandable, while <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">D</code> is ambiguous.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: Can a Boolean variable be both 0 and 1 at the same time?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. In Boolean Algebra, a variable has a single, well-defined value at any given time. This is known as the law of excluded middle.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: How do constants 0 and 1 help in circuit simplification?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Constants can eliminate gates. For example, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A AND 1 = A</code> (no gate needed), <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">A AND 0 = 0</code> (output always 0).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: What is the difference between a Boolean constant and a Boolean literal?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They are often used interchangeably. A constant is a fixed value (0 or 1). A literal is the representation of that constant in code or expression.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: In programming, how are Boolean constants typically represented?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Most languages have keywords: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">true</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">false</code> (JavaScript, Python, Java, C#), or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">TRUE</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">FALSE</code> (C, C++ with macros).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Can a Boolean variable represent more than just TRUE/FALSE?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: In digital circuits, it strictly represents a binary state. In programming, Boolean variables can be derived from comparisons (e.g., <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">age > 18</code>), which evaluate to true/false.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: What does it mean when we say Boolean Algebra is "binary"?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: It means the algebra operates on a set of only two values (0 and 1). This binary nature makes it perfect for digital electronics.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: Give an example of a Boolean variable in a smart home system.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">windowOpen</code> could be a Boolean variable representing whether a window is open (1) or closed (0). <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">temperatureHigh</code> could represent if the temperature exceeds a threshold.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: How do we represent the complement (NOT) of a Boolean variable?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The complement is denoted with a bar over the variable (Ā), a prime (A'), or a NOT operator (!A in programming). If A = 1, then Ā = 0, and vice versa.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: What is the difference between a Boolean variable and a Boolean expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A Boolean variable is a single symbol (like A). A Boolean expression is a combination of variables and constants connected by operators (like A·B + C).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: Why do we sometimes use 0 for TRUE and 1 for FALSE?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: This is called active-low or negative logic. It's used for various reasons: historical, noise immunity, or when certain circuits are more efficient with inverted logic.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: Can we assign numeric values like 2 or 3 to Boolean variables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. In pure Boolean Algebra, variables only take 0 or 1. In computer science, multi-bit variables can represent larger numbers, but each individual bit is a Boolean variable.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: What is the first step when modeling a real-world problem with Boolean variables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Identify all the binary conditions (things that can be true or false) in the problem. Name them descriptively. Then determine how these conditions relate to the desired outcome.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic1;