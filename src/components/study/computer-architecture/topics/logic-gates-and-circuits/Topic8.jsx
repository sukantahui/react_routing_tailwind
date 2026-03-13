import React from 'react';
import clsx from 'clsx';
import twoToOneMultiplexer from './topic8_files/two_to_one_multiplexer.png';
// Inline keyframes for fade + slide-up animation
const animationStyles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;

const Topic8 = () => {
  // Truth table for 2:1 multiplexer
  const truthTable = [
    { S: 0, Output: 'I0' },
    { S: 1, Output: 'I1' },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">2:1 Multiplexer</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          The simplest multiplexer – selects one of two input signals based on a single select line.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> mux_2to1(S, I0, I1) → Y</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> I0, I1 (data), S (select)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Output:</span> Y (selected data)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Route one of two data sources to a single output.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> As a building block for larger multiplexers, in data path selection, and in implementing logic functions.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 2:1 Multiplexer Circuit</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Circuit Image */}
              <div className="max-w-4xl w-full flex justify-center">
                <img
                  src={twoToOneMultiplexer}
                  alt="Full Subtractor Circuit"
                  className="dark:invert w-full h-auto object-contain"
                />
              </div>

          {/* Boolean expression */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Boolean Expression</h3>
            <p className="font-mono text-green-400 text-xl">Y = S'·I0 + S·I1</p>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The circuit uses an inverter, two AND gates, and an OR gate. When S=0, I0 is selected; when S=1, I1 is selected.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-sm mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">S</th>
                <th className="py-2 px-4 text-purple-300">Output Y</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.S}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          When S=0, Y = I0; when S=1, Y = I1.
        </p>
      </section>

      {/* Logic Symbol */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔣 Logic Symbol</h2>
        <div className="flex justify-center">
          <div className="w-64 h-40 group">
            <svg viewBox="0 0 200 120" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Trapezoid MUX symbol */}
              <polygon points="60,20 140,20 140,100 60,100 40,60" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="90" y="60" fill="currentColor" fontSize="16" textAnchor="middle">MUX</text>
              
              {/* Data inputs */}
              <line x1="20" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="45" fill="currentColor" fontSize="12">I0</text>
              <line x1="20" y1="80" x2="40" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="85" fill="currentColor" fontSize="12">I1</text>
              
              {/* Select line */}
              <line x1="100" y1="100" x2="100" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="120" y="115" fill="currentColor" fontSize="12">S</text>
              
              {/* Output */}
              <line x1="140" y1="60" x2="170" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="65" fill="currentColor" fontSize="14" fontWeight="bold">Y</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-center">Standard trapezoid symbol for a 2:1 multiplexer.</p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          A 2:1 multiplexer appears in many everyday digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>In a classroom:</strong> Select which of two students' answers (Swadeep or Tuhina) is displayed on the screen based on a teacher's switch (S).</li>
          <li><strong>In a CPU:</strong> Choose between two data sources for a register input (e.g., ALU result vs memory data).</li>
          <li><strong>In communication:</strong> Time-division multiplexing of two signals onto one line.</li>
          <li><strong>In function generators:</strong> Implement any 2-variable Boolean function by connecting I0 and I1 to constants or variables.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          For example, in the computer lab at Ichapur, a 2:1 MUX selects between the keyboard input and a pre-stored test pattern.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>What happens if you swap I0 and I1? (The selection polarity inverts.)</li>
          <li>Observe carefully: The Boolean expression is a sum of two product terms – can you see the minterm structure?</li>
          <li>Try building a 2:1 MUX using only NAND gates (universal gate).</li>
          <li>How would you create a 4:1 MUX from three 2:1 MUXes? (Think hierarchical.)</li>
          <li>What if the select line S is connected to VCC? (Then Y = I1 always.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Inverting select incorrectly:</strong> Forgetting that when S=0, I0 is selected, not I1.</li>
          <li><strong>Using OR instead of AND-OR:</strong> The correct implementation uses AND gates to enable only one path.</li>
          <li><strong>Leaving unused inputs floating:</strong> In actual ICs, unused inputs should be tied to GND or VCC.</li>
          <li><strong>Confusing the order:</strong> Some datasheets label inputs as A and B; always check the truth table.</li>
          <li><strong>Ignoring propagation delay:</strong> The select line to output has a delay that matters in high-speed designs.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always include the inverter symbol clearly when drawing the gate-level circuit.</li>
          <li>Label the select line with its function (e.g., "S" or "Select").</li>
          <li>In schematics, use the standard trapezoid symbol for clarity.</li>
          <li>When cascading, ensure that select lines are properly buffered to drive multiple loads.</li>
          <li>In VHDL/Verilog, use a simple conditional assignment: <span className="font-mono">Y &lt;= I0 when S='0' else I1;</span></li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Implementing logic:</strong> A 2:1 MUX can implement any 2-variable function by connecting I0 and I1 to 0, 1, or the remaining variable.</li>
          <li><strong>Transmission gate MUX:</strong> In CMOS, a 2:1 MUX is often built with transmission gates for compactness and speed.</li>
          <li><strong>IC packages:</strong> The 74157 contains four 2:1 multiplexers with common select and enable.</li>
          <li><strong>Glitch-free switching:</strong> Ensure select lines change only when data is stable to avoid output glitches.</li>
          <li><strong>Power saving:</strong> Disable unused MUX sections via enable pins to reduce dynamic power.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for a 2:1 multiplexer.</li>
          <li>I can write the Boolean expression: Y = S'·I0 + S·I1.</li>
          <li>I can draw the gate-level circuit using AND, OR, and NOT gates.</li>
          <li>I understand how to use a 2:1 MUX to implement simple logic functions.</li>
          <li>I can cascade 2:1 MUXes to build larger multiplexers.</li>
        </ul>
      </section>

      {/* Teacher's Note */}
      <section className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-2 flex items-center gap-2">
          👩‍🏫 Teacher's Note
        </h2>
        <p className="text-gray-200 mb-3">
          <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in | mobile: 7003756860) has 27 years of experience teaching programming, RDBMS, operating systems, and web development.
        </p>
        <p className="text-gray-300 italic">
          “The 2:1 multiplexer is the 'hello world' of data selection. I often use a simple classroom analogy: Imagine two students, Abhronila and Debangshu, each holding a colored card. A teacher (select line) points to one of them, and that student's color becomes the output. The gate-level implementation with AND-OR reinforces the sum-of-products concept from earlier topics. I encourage students in Naihati to build this circuit on a breadboard using a 7404 (inverter), 7408 (AND), and 7432 (OR). Seeing the LEDs light up based on a switch is deeply satisfying and builds confidence for larger designs.”
        </p>
      </section>
    </div>
  );
};

export default Topic8;