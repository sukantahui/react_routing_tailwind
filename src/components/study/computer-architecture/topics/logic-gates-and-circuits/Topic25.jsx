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

const Topic25 = () => {
  // Example truth table for 2-to-4 decoder (active-high outputs)
  const decoder2to4TruthTable = [
    { A1: 0, A0: 0, Y0: 1, Y1: 0, Y2: 0, Y3: 0 },
    { A1: 0, A0: 1, Y0: 0, Y1: 1, Y2: 0, Y3: 0 },
    { A1: 1, A0: 0, Y0: 0, Y1: 0, Y2: 1, Y3: 0 },
    { A1: 1, A0: 1, Y0: 0, Y1: 0, Y2: 0, Y3: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Decoders</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A decoder converts an n-bit binary code into 2ⁿ unique output lines – the inverse operation of an encoder.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is a Decoder?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Definition:</span> A combinational circuit that activates exactly one of its 2ⁿ outputs based on the n-bit binary input.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> decoder_n_to_2ⁿ (inputs: A₀...Aₙ₋₁) → outputs: Y₀...Y₂ⁿ⁻¹</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Convert binary information into a unique output line; essential for memory addressing, instruction decoding, and data routing.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In microprocessors (selecting memory chips), in seven-segment displays, in demultiplexers (with data input), and in implementing Boolean functions.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram: 2-to-4 decoder */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Block Diagram (2-to-4 Decoder)</h2>
        <div className="flex flex-col items-center">
          <div className="w-80 h-64 group">
            <svg viewBox="0 0 300 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Decoder block */}
              <rect x="100" y="40" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="160" y="100" fill="currentColor" fontSize="18" textAnchor="middle">DECODER</text>
              <text x="160" y="120" fill="currentColor" fontSize="12" textAnchor="middle">2:4</text>

              {/* Inputs */}
              <line x1="40" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="85" fill="currentColor" fontSize="12">A0</text>
              <line x1="40" y1="120" x2="100" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="125" fill="currentColor" fontSize="12">A1</text>

              {/* Outputs */}
              <line x1="220" y1="60" x2="260" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="65" fill="currentColor" fontSize="12">Y0</text>
              <line x1="220" y1="90" x2="260" y2="90" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="95" fill="currentColor" fontSize="12">Y1</text>
              <line x1="220" y1="120" x2="260" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="125" fill="currentColor" fontSize="12">Y2</text>
              <line x1="220" y1="150" x2="260" y2="150" stroke="currentColor" strokeWidth="2" />
              <text x="270" y="155" fill="currentColor" fontSize="12">Y3</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-2">A 2-to-4 decoder has two address inputs and four mutually exclusive outputs.</p>
        </div>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (2-to-4 Decoder, active-high)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">A1</th><th className="py-2 px-4 text-purple-300">A0</th>
                <th className="py-2 px-4 text-purple-300">Y3</th><th className="py-2 px-4 text-purple-300">Y2</th><th className="py-2 px-4 text-purple-300">Y1</th><th className="py-2 px-4 text-purple-300">Y0</th>
              </tr>
            </thead>
            <tbody>
              {decoder2to4TruthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.A1}</td><td className="py-2 px-4">{row.A0}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Y3}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Y2}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Y1}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Y0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The binary input (A1 A0) selects exactly one output line to go high. All other outputs are 0.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            Y0 = A1'·A0'<br />
            Y1 = A1'·A0<br />
            Y2 = A1·A0'<br />
            Y3 = A1·A0
          </p>
          <p className="text-gray-300 mt-2 text-center">
            Each output is a minterm of the input variables. This pattern extends to larger decoders.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Decoders are everywhere in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Memory address decoding:</strong> In a computer, the address bus is fed into a decoder to select one of many memory chips.</li>
          <li><strong>Instruction decoding:</strong> A microprocessor uses a decoder to translate an opcode into control signals for various execution units.</li>
          <li><strong>Seven-segment display:</strong> A BCD-to-7-segment decoder converts a 4-bit BCD number into signals to light the correct segments.</li>
          <li><strong>Demultiplexers:</strong> A decoder with an enable input can be used as a demultiplexer (the enable becomes the data input).</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Barrackpore lab, students use a 74138 (3-to-8 decoder) to select one of eight LEDs based on a 3-bit switch input – a simple yet powerful demonstration.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How is a decoder related to a demultiplexer? (A decoder with an enable input can function as a demultiplexer.)</li>
          <li>Observe carefully: The Boolean expressions are exactly the minterms. This means a decoder plus an OR gate can implement any Boolean function.</li>
          <li>Try extending the pattern to a 3-to-8 decoder. How many minterms? (8 minterms, each a product of three variables or their complements.)</li>
          <li>What happens if you tie the enable input of a decoder to VCC? (The decoder functions normally; the enable just allows/disables all outputs.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing active-high vs active-low:</strong> Some decoders (like 74138) have active-low outputs. Verify the datasheet before connecting.</li>
          <li><strong>Forgetting that outputs are mutually exclusive:</strong> Only one output should be active at a time; multiple active outputs indicate a problem.</li>
          <li><strong>Misconnecting address lines:</strong> Swapping address pins changes the mapping of inputs to outputs.</li>
          <li><strong>Leaving enable pins floating:</strong> Many decoders have enable inputs that must be properly set; floating enables can disable the chip.</li>
          <li><strong>Assuming all decoders have the same pinout:</strong> Different ICs (e.g., 74138, 74139) have different enable configurations.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always label address inputs with their weights (e.g., A0 LSB, A1, A2 MSB) to avoid confusion.</li>
          <li>Use truth tables to define decoder behavior before implementation.</li>
          <li>In schematics, use the standard decoder symbol (a rectangle with address inputs and outputs labeled).</li>
          <li>When cascading decoders, ensure enable logic is correctly managed.</li>
          <li>Simulate the circuit to verify correct output selection for all input combinations.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Implementing logic:</strong> A decoder plus an OR gate can implement any sum-of-products expression. Connect the desired minterms to the OR gate.</li>
          <li><strong>Using enables:</strong> Enable pins can be used to build larger decoders (e.g., two 3-to-8 decoders to make a 4-to-16 decoder).</li>
          <li><strong>IC packages:</strong> Common TTL decoders: 74138 (3-to-8 active-low outputs), 74139 (dual 2-to-4), 74154 (4-to-16).</li>
          <li><strong>Active-low outputs:</strong> If your system uses active-low enables for memory chips, use a decoder with active-low outputs to avoid extra inverters.</li>
          <li><strong>Glitch-free operation:</strong> Ensure address lines change synchronously to avoid output glitches.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the basic principle: n inputs → 2ⁿ outputs, only one output active at a time.</li>
          <li>I can write the truth table for a 2-to-4 decoder.</li>
          <li>I can derive the Boolean expressions (minterms) for each output.</li>
          <li>I know the difference between active-high and active-low outputs.</li>
          <li>I can identify real-world applications like memory addressing and instruction decoding.</li>
          <li>I understand that a decoder with an enable can be used as a demultiplexer.</li>
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
          “Decoders are the unsung heroes of digital design. Every time a computer accesses memory, a decoder is at work. In our Shyamnagar lab, we start with a simple 2-to-4 decoder built from AND gates and inverters – it's a great exercise in minterm realization. Then we move to the 74138 and use it to select memory chips. I emphasize the duality with encoders: encoders compress, decoders expand. This conceptual pairing helps students see the bigger picture. The next few topics will dive into specific decoder sizes and their applications.”
        </p>
      </section>
    </div>
  );
};

export default Topic25;