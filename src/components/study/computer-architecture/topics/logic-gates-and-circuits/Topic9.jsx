import React from 'react';
import clsx from 'clsx';
import fourToOneMultiplexer from './topic9_files/four_to_one_multiplexer.png';

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

const Topic9 = () => {
  // Truth table for 4:1 multiplexer
  const truthTable = [
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
        <h1 className="text-4xl font-bold text-blue-400 mb-2">4:1 Multiplexer</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Selects one of four input signals using two select lines.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> mux_4to1(S1, S0, I0, I1, I2, I3) → Y</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> I0, I1, I2, I3 (data), S1, S0 (select)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Output:</span> Y (selected data)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Route one of four data sources to a single output.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In data path selection, implementing logic functions, and as a building block for larger multiplexers.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 4:1 Multiplexer Circuit</h2>
        <div className="flex flex-col items-center gap-6">
          {/* Circuit Image */}
                        <div className="max-w-4xl w-full flex justify-center">
                          <img
                            src={fourToOneMultiplexer}
                            alt="4:1 Multiplexer Circuit"
                            className="dark:invert w-full h-auto object-contain"
                          />
                        </div>
          <p className="text-gray-300 text-center">
            Due to the complexity of drawing a full gate-level 4:1 MUX in SVG, the circuit consists of:<br />
            Four AND gates (one for each input), with the select lines appropriately inverted, feeding into a 4-input OR gate.<br />
            <span className="font-mono text-green-400">Y = (S1'·S0'·d0) + (S1'·S0·d1) + (S1·S0'·d2) + (S1·S0·d3)</span>
          </p>
        </div>
      </section>

      {/* Logic Symbol */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔣 Logic Symbol</h2>
        <div className="flex justify-center">
          <div className="w-72 h-48 group">
            <svg viewBox="0 0 250 150" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Trapezoid MUX symbol */}
              <polygon points="60,20 170,20 170,130 60,130 40,75" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="115" y="80" fill="currentColor" fontSize="18" textAnchor="middle">MUX</text>
              <text x="115" y="100" fill="currentColor" fontSize="14" textAnchor="middle">4:1</text>
              
              {/* Data inputs */}
              <line x1="20" y1="35" x2="40" y2="35" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="40" fill="currentColor" fontSize="12">d0</text>
              <line x1="20" y1="65" x2="40" y2="65" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="70" fill="currentColor" fontSize="12">d1</text>
              <line x1="20" y1="95" x2="40" y2="95" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="100" fill="currentColor" fontSize="12">d2</text>
              <line x1="20" y1="125" x2="40" y2="125" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="130" fill="currentColor" fontSize="12">d3</text>
              
              {/* Select lines */}
              <line x1="115" y1="130" x2="115" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="135" y="145" fill="currentColor" fontSize="12">S0</text>
              <line x1="85" y1="130" x2="85" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="55" y="145" fill="currentColor" fontSize="12">S1</text>
              
              {/* Output */}
              <line x1="170" y1="75" x2="200" y2="75" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="80" fill="currentColor" fontSize="14" fontWeight="bold">Y</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-center">Standard trapezoid symbol for a 4:1 multiplexer.</p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
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
              {truthTable.map((row, idx) => (
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
          The binary number formed by (S1 S0) selects the corresponding data input.
        </p>
      </section>

      {/* Boolean Expression */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expression</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            Y = S1'·S0'·d0 + S1'·S0·d1 + S1·S0'·d2 + S1·S0·d3
          </p>
          <p className="text-gray-300 mt-2 text-center">
            This is a sum of four product terms, each corresponding to one select combination.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          A 4:1 multiplexer is commonly used in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>In a CPU:</strong> Select one of four register outputs to send to the ALU.</li>
          <li><strong>In a display system:</strong> Choose which of four character generators drives the screen.</li>
          <li><strong>In communication:</strong> Combine four low-speed data streams into one high-speed line (time-division multiplexing).</li>
          <li><strong>In function generators:</strong> Implement any 3-variable Boolean function by connecting d0–d3 to constants or variables.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          For example, in the Shyamnagar electronics lab, students use a 4:1 MUX to select which of four sensor readings is displayed on a single meter.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many select lines are needed for a 4:1 MUX? (2, because 2² = 4).</li>
          <li>Observe carefully: The Boolean expression is exactly the sum of minterms form.</li>
          <li>Try building a 4:1 MUX from three 2:1 MUXes (cascading).</li>
          <li>What happens if we tie d0 and d3 to 0 and d1 and d2 to 1? What function does it implement? (S1⊕S0).</li>
          <li>How would you add an enable input to this multiplexer?</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Incorrect select order:</strong> Assuming S0 is the MSB when it's actually the LSB can cause wrong selection.</li>
          <li><strong>Missing inverters:</strong> The product terms require both true and complemented forms of select lines.</li>
          <li><strong>Using a 4-input OR without AND gates:</strong> Direct OR of inputs won't work; need AND gates to enable only one path.</li>
          <li><strong>Floating inputs:</strong> Unused data inputs should be tied to GND or VCC to avoid noise.</li>
          <li><strong>Ignoring propagation delay:</strong> The select-to-output delay increases with more inputs.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Clearly label select lines with their weights (S0 LSB, S1 MSB) to avoid confusion.</li>
          <li>In schematics, use the standard trapezoid symbol for multiplexers.</li>
          <li>When cascading, ensure select lines are buffered to drive multiple loads.</li>
          <li>For FPGA designs, use the built-in multiplexer primitives for better performance.</li>
          <li>In VHDL/Verilog, use a 'case' statement or 'with/select' for clarity.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Implementing logic:</strong> Use a 4:1 MUX to implement any 3-variable function by connecting d0–d3 to 0, 1, or the remaining variable.</li>
          <li><strong>IC packages:</strong> The 74153 is a dual 4:1 multiplexer with common select lines but separate enables.</li>
          <li><strong>Enable pin:</strong> Adding an active-low enable forces output to 0 when enable is high, useful for bus isolation.</li>
          <li><strong>Glitch prevention:</strong> Ensure select lines change synchronously with data to avoid output glitches.</li>
          <li><strong>Power saving:</strong> Disable unused sections via enable pins to reduce dynamic power.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for a 4:1 multiplexer.</li>
          <li>I can write the Boolean expression: Y = Σ(m_i · I_i) for i=0..3.</li>
          <li>I understand the gate-level implementation with four AND gates and an OR gate.</li>
          <li>I know how to cascade 4:1 MUXes to build larger multiplexers.</li>
          <li>I can use a 4:1 MUX to implement a 3-variable Boolean function.</li>
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
          “The 4:1 multiplexer is a wonderful bridge to larger designs. I challenge my students in Barrackpore to implement a 4:1 MUX using the 2:1 MUXes we just learned – it's a perfect exercise in hierarchy. Then we explore how to use it as a universal logic module by tying inputs to VCC or GND. For instance, setting I0=0, I1=1, I2=1, I3=0 gives the XOR function. This 'aha' moment is powerful. Next, we'll look at even larger multiplexers and their IC implementations.”
        </p>
      </section>
    </div>
  );
};

export default Topic9;