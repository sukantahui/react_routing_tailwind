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

const Topic26 = () => {
  // Truth table for 2:4 decoder (active-high outputs)
  const truthTable = [
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
        <h1 className="text-4xl font-bold text-blue-400 mb-2">2:4 Decoder</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          The simplest decoder – converts a 2-bit binary input into one of four mutually exclusive outputs.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> decoder_2to4(A1, A0) → (Y0, Y1, Y2, Y3)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> A1 (MSB), A0 (LSB) – 2-bit address</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Y0, Y1, Y2, Y3 (mutually exclusive, active-high by default)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Select one of four output lines based on a 2-bit code.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> As a building block for larger decoders, in memory chip selection, and as a minterm generator for logic implementation.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Block Diagram</h2>
        <div className="flex justify-center">
          <div className="w-80 h-64 group">
            <svg viewBox="0 0 300 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Decoder block */}
              <rect x="100" y="40" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="160" y="100" fill="currentColor" fontSize="18" textAnchor="middle">DECODER</text>
              <text x="160" y="125" fill="currentColor" fontSize="14" textAnchor="middle">2:4</text>

              {/* Inputs */}
              <line x1="40" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="85" fill="currentColor" fontSize="14" fontWeight="bold">A0</text>
              <line x1="40" y1="120" x2="100" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="125" fill="currentColor" fontSize="14" fontWeight="bold">A1</text>

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
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A 2:4 decoder accepts a 2-bit address and activates one of four outputs.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-lg mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">A1</th><th className="py-2 px-4 text-purple-300">A0</th>
                <th className="py-2 px-4 text-purple-300">Y3</th><th className="py-2 px-4 text-purple-300">Y2</th><th className="py-2 px-4 text-purple-300">Y1</th><th className="py-2 px-4 text-purple-300">Y0</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
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
            Each output is a minterm of the input variables – the fundamental building blocks of Boolean logic.
          </p>
        </div>
      </section>

      {/* Gate-Level Circuit */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Gate-Level Implementation</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 450 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Inputs */}
              <line x1="30" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="85" fill="currentColor" fontSize="12">A0</text>
              <line x1="30" y1="160" x2="80" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="15" y="165" fill="currentColor" fontSize="12">A1</text>

              {/* Inverters */}
              <circle cx="95" cy="80" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="80" x2="120" y2="80" stroke="currentColor" strokeWidth="2" />

              <circle cx="95" cy="160" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="80" y1="160" x2="90" y2="160" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="160" x2="120" y2="160" stroke="currentColor" strokeWidth="2" />

              {/* AND gates for each minterm */}
              {/* Y0: A1'·A0' */}
              <path d="M160 40 L190 40 Q200 40 200 55 Q200 70 190 70 L160 70 L160 40" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="60" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="120" y1="80" x2="180" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="120" y1="160" x2="180" y2="45" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="200" y1="55" x2="250" y2="55" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="60" fill="currentColor" fontSize="12">Y0</text>

              {/* Y1: A1'·A0 */}
              <path d="M160 100 L190 100 Q200 100 200 115 Q200 130 190 130 L160 130 L160 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="180" y="120" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="80" y1="80" x2="180" y2="115" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="120" y1="160" x2="180" y2="105" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="200" y1="115" x2="250" y2="115" stroke="currentColor" strokeWidth="2" />
              <text x="260" y="120" fill="currentColor" fontSize="12">Y1</text>

              {/* Y2: A1·A0' */}
              <path d="M280 40 L310 40 Q320 40 320 55 Q320 70 310 70 L280 70 L280 40" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="60" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="120" y1="80" x2="300" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="160" x2="300" y2="45" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="320" y1="55" x2="370" y2="55" stroke="currentColor" strokeWidth="2" />
              <text x="380" y="60" fill="currentColor" fontSize="12">Y2</text>

              {/* Y3: A1·A0 */}
              <path d="M280 100 L310 100 Q320 100 320 115 Q320 130 310 130 L280 130 L280 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="120" fill="currentColor" fontSize="10" textAnchor="middle">&</text>
              <line x1="80" y1="80" x2="300" y2="115" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="80" y1="160" x2="300" y2="125" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="320" y1="115" x2="370" y2="115" stroke="currentColor" strokeWidth="2" />
              <text x="380" y="120" fill="currentColor" fontSize="12">Y3</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A 2:4 decoder can be built with two inverters and four AND gates, each generating one minterm.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Example</h2>
        <p className="text-gray-300 mb-3">
          A 2:4 decoder is commonly used to select one of four memory chips in a small memory system. Imagine a microcontroller with 4 KB of memory divided into four 1 KB banks. The two highest address lines go to the decoder, and each output enables one memory chip.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Address 00 → chip 0 enabled</li>
          <li>Address 01 → chip 1 enabled</li>
          <li>Address 10 → chip 2 enabled</li>
          <li>Address 11 → chip 3 enabled</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build this circuit using a 7404 (inverter) and 7408 (AND gates) to control four LEDs, demonstrating address decoding in hardware.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>What happens if you add an enable input to the decoder? (It becomes a 2:4 decoder with enable, useful for cascading.)</li>
          <li>Observe carefully: The outputs are exactly the minterms. How could you use this to implement any Boolean function of two variables?</li>
          <li>Try building a 3:8 decoder using two 2:4 decoders and an inverter.</li>
          <li>Why are the outputs called "mutually exclusive"? (Only one can be 1 at a time.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing the order of address lines:</strong> A1 is usually the MSB, A0 the LSB. Swapping them changes the output mapping.</li>
          <li><strong>Forgetting inverters:</strong> The AND gates need both true and complemented forms of the inputs; omitting inverters will produce incorrect outputs.</li>
          <li><strong>Assuming outputs are active-low:</strong> Some decoder ICs have active-low outputs; check the datasheet.</li>
          <li><strong>Leaving unused outputs unconnected:</strong> While allowed, it's good practice to terminate them.</li>
          <li><strong>Overloading outputs:</strong> Each output can drive only a limited number of inputs; buffer if necessary.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Clearly label address lines with their weights (A0 LSB, A1 MSB).</li>
          <li>Use a truth table to verify correct mapping before building.</li>
          <li>In schematics, draw the decoder symbol clearly or show the AND gate implementation.</li>
          <li>When cascading, use enable inputs if available.</li>
          <li>Simulate the circuit with all input combinations to ensure correct outputs.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using as a minterm generator:</strong> Combine decoder outputs with an OR gate to implement any sum-of-products expression.</li>
          <li><strong>Active-low outputs:</strong> If you need active-low outputs, simply add inverters or use a decoder IC designed for active-low.</li>
          <li><strong>IC packages:</strong> The 74139 contains two independent 2:4 decoders with active-low outputs and common enables – ideal for compact designs.</li>
          <li><strong>Enable pin:</strong> Adding an enable input allows you to turn off all outputs, useful for power saving and cascading.</li>
          <li><strong>Glitch avoidance:</strong> Ensure address lines change synchronously to avoid momentary wrong outputs.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for a 2:4 decoder.</li>
          <li>I can write the Boolean expressions: Y0 = A1'·A0', Y1 = A1'·A0, Y2 = A1·A0', Y3 = A1·A0.</li>
          <li>I can implement the circuit using inverters and AND gates.</li>
          <li>I understand that the outputs are minterms of the inputs.</li>
          <li>I know how to use a 2:4 decoder in address decoding.</li>
          <li>I can cascade two 2:4 decoders to make a 3:8 decoder.</li>
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
          “The 2:4 decoder is the perfect introduction to minterm-based design. In my Barrackpore class, after covering truth tables and Boolean expressions, we build this circuit on a breadboard. Students see how the AND gates light up an LED based on the switch settings. It's a simple but profound demonstration – they're building hardware that computes logic! I then challenge them to implement a function like XOR using the decoder and an OR gate. This lays the foundation for understanding how any Boolean function can be realized, and it sets the stage for larger decoders and memory addressing.”
        </p>
      </section>
    </div>
  );
};

export default Topic26;