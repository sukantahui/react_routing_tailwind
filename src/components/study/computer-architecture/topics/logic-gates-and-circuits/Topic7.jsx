import React from 'react';
import clsx from 'clsx';

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

const Topic7 = () => {
  // 4:1 Multiplexer example data
  const mux4to1TruthTable = [
    { S1: 0, S0: 0, Output: 'I0' },
    { S1: 0, S0: 1, Output: 'I1' },
    { S1: 1, S0: 0, Output: 'I2' },
    { S1: 1, S0: 1, Output: 'I3' },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Multiplexer (MUX)</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A data selector – chooses one of many input signals and forwards it to a single output line.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is a Multiplexer?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> MUX(select_lines, data_inputs) → single output</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> 2ⁿ data inputs, n select lines</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Output:</span> 1 bit (the selected data input)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Route one of many signals to a common output.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In data routing, ALU input selection, communication systems, function generators.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Block Diagram (4:1 MUX)</h2>
        <div className="flex flex-col items-center">
          <div className="w-80 h-64 group">
            <svg viewBox="0 0 300 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Main MUX block */}
              <rect x="100" y="40" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="160" y="100" fill="currentColor" fontSize="18" textAnchor="middle">MUX</text>
              <text x="160" y="120" fill="currentColor" fontSize="12" textAnchor="middle">4:1</text>
              
              {/* Data inputs */}
              <line x1="40" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="65" fill="currentColor" fontSize="12">I0</text>
              <line x1="40" y1="90" x2="100" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="95" fill="currentColor" fontSize="12">I1</text>
              <line x1="40" y1="120" x2="100" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="125" fill="currentColor" fontSize="12">I2</text>
              <line x1="40" y1="150" x2="100" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="155" fill="currentColor" fontSize="12">I3</text>
              
              {/* Select lines */}
              <line x1="160" y1="160" x2="160" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="195" fill="currentColor" fontSize="12">S0</text>
              <line x1="130" y1="160" x2="130" y2="190" stroke="currentColor" strokeWidth="2" />
              <text x="110" y="195" fill="currentColor" fontSize="12">S1</text>
              
              {/* Output */}
              <line x1="220" y1="100" x2="260" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="105" fill="currentColor" fontSize="14" fontWeight="bold">Y</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-2">A 4:1 multiplexer has 4 data inputs, 2 select lines, and 1 output.</p>
        </div>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (4:1 MUX)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">S1</th>
                <th className="py-2 px-4 text-purple-300">S0</th>
                <th className="py-2 px-4 text-purple-300">Output Y</th>
              </tr>
            </thead>
            <tbody>
              {mux4to1TruthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.S1}</td>
                  <td className="py-2 px-4">{row.S0}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The select lines determine which data input appears at the output.
        </p>
      </section>

      {/* Boolean Expression */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expression (4:1 MUX)</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            Y = S1'·S0'·I0 + S1'·S0·I1 + S1·S0'·I2 + S1·S0·I3
          </p>
          <p className="text-gray-300 mt-2 text-center">
            Each product term corresponds to one combination of select lines, enabling the corresponding data input.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Multiplexers are everywhere in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>In a CPU:</strong> Select which register's data to send to the ALU.</li>
          <li><strong>In communication:</strong> Time-division multiplexing combines multiple signals into one line.</li>
          <li><strong>In function generators:</strong> Implement any Boolean function by connecting inputs to constants or variables.</li>
          <li><strong>In data acquisition:</strong> Route multiple sensor signals to a single ADC.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          For example, in the computer lab at Barrackpore, a multiplexer could select which student's keyboard input is sent to the teacher's monitor.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many select lines are needed for an 8:1 multiplexer? (3 lines, because 2³ = 8).</li>
          <li>Observe carefully: The Boolean expression is a sum of minterms, each with a data input.</li>
          <li>Try writing the expression for a 2:1 MUX: Y = S'·I0 + S·I1.</li>
          <li>What happens if we tie some data inputs to 0 or 1? (We can implement logic functions.)</li>
          <li>How would you build a larger MUX from smaller ones? (Cascading – coming soon.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing select lines order:</strong> Which select is MSB matters; the truth table must be consistent.</li>
          <li><strong>Forgetting that multiplexers are combinational:</strong> No memory; output changes immediately with select or data.</li>
          <li><strong>Incorrect Boolean expression:</strong> Missing a term or misplacing complements.</li>
          <li><strong>Assuming all inputs are used:</strong> In larger multiplexers, unused inputs should be tied to GND or VCC.</li>
          <li><strong>Overlooking enable pins:</strong> Many multiplexer ICs have an active-low enable – if disabled, output is 0 or high-Z.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Label select lines with their weight (e.g., S0 for LSB, S1 for MSB) to avoid confusion.</li>
          <li>Use truth tables to define multiplexer behavior before implementation.</li>
          <li>In schematic, draw multiplexers with a trapezoid shape (standard symbol).</li>
          <li>When cascading, ensure enable logic is correctly managed.</li>
          <li>For FPGA designs, use built-in MUX primitives for better performance.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Implementing logic:</strong> Use a multiplexer to implement any Boolean function by connecting inputs to VCC/GND and using select lines as variables.</li>
          <li><strong>Glitch prevention:</strong> In large multiplexers, ensure select lines change synchronously to avoid output glitches.</li>
          <li><strong>In VHDL/Verilog:</strong> Use 'with/select' or 'case' statements for clarity.</li>
          <li><strong>IC packages:</strong> Common TTL multiplexers: 74157 (quad 2:1), 74153 (dual 4:1), 74151 (8:1).</li>
          <li><strong>Power reduction:</strong> Disable unused multiplexer sections via enable to save power.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the basic principle: select lines choose which input goes to output.</li>
          <li>I can write the truth table for a 2:1 and 4:1 multiplexer.</li>
          <li>I can derive the Boolean expression for a multiplexer.</li>
          <li>I know how to cascade multiplexers to increase size.</li>
          <li>I can identify the number of select lines needed for N inputs.</li>
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
          “The multiplexer is often a student's first encounter with data routing. I compare it to a railway switchyard: the select lines are the track switches that guide one train (data) onto the main line. In our Shyamnagar lab, we use a 4:1 MUX to let students select which of four input switches is displayed on an LED. It's a simple yet powerful demonstration. Emphasize that any Boolean function can be implemented with a multiplexer – this opens their minds to the versatility of digital design. Next, we'll explore specific sizes and cascading techniques.”
        </p>
      </section>
    </div>
  );
};

export default Topic7;