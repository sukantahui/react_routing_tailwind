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

const Topic36 = () => {
  // Truth table for 3-bit odd parity generator
  const truthTable = [
    { A:0, B:0, C:0, P:1 },
    { A:0, B:0, C:1, P:0 },
    { A:0, B:1, C:0, P:0 },
    { A:0, B:1, C:1, P:1 },
    { A:1, B:0, C:0, P:0 },
    { A:1, B:0, C:1, P:1 },
    { A:1, B:1, C:0, P:1 },
    { A:1, B:1, C:1, P:0 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Odd Parity Generator</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A circuit that adds a parity bit to a data word to make the total number of 1s odd – an alternative to even parity for error detection.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> odd_parity_gen(data_bits) → parity_bit</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> n data bits (e.g., A, B, C)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Output:</span> 1 parity bit (P) such that total number of 1s (data + parity) is odd</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Enable single‑bit error detection with odd parity convention.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In serial communication (UART), some memory systems, and applications where even parity is not suitable.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">How it Works</h2>
        <p className="text-gray-300 mb-4">
          The odd parity bit is the complement of the even parity bit. If the data already has an odd number of 1s, the parity bit must be 0 (to keep it odd); if the data has an even number of 1s, the parity bit becomes 1. Thus, <span className="font-mono text-green-400">P = (A ⊕ B ⊕ C ⊕ ...)'</span>.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-center text-gray-200">
            For n bits: <span className="font-mono text-green-400 text-xl">P = NOT (A ⊕ B ⊕ C ⊕ ...)</span>
          </p>
        </div>
      </section>

      {/* Truth Table for 3-bit example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (3‑bit example)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">A</th>
                <th className="py-2 px-4 text-purple-300">B</th>
                <th className="py-2 px-4 text-purple-300">C</th>
                <th className="py-2 px-4 text-purple-300">P (odd)</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.A}</td>
                  <td className="py-2 px-4">{row.B}</td>
                  <td className="py-2 px-4">{row.C}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.P}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Notice that P is the complement of the even parity bit. When the number of 1s in A,B,C is odd, P=0; when even, P=1.
        </p>
      </section>

      {/* Boolean Expression */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expression</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-2xl text-center">P = (A ⊕ B ⊕ C)'</p>
          <p className="text-gray-300 mt-2 text-center">
            For n bits, P = NOT (A ⊕ B ⊕ C ⊕ D ⊕ ...)
          </p>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Gate‑Level Circuit (3‑bit)</h2>
        <div className="flex justify-center">
          <div className="w-96 h-56 group">
            <svg viewBox="0 0 300 180" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Inputs */}
              <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="45" fill="currentColor" fontSize="12">A</text>
              <line x1="20" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="75" fill="currentColor" fontSize="12">B</text>
              <line x1="20" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="105" fill="currentColor" fontSize="12">C</text>

              {/* XOR gates in a tree */}
              {/* First XOR (A ⊕ B) */}
              <path d="M90 40 L120 40 L130 55 L120 70 L90 70 L90 40" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M80 40 L90 55 L80 70" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="105" y="60" fill="currentColor" fontSize="10" textAnchor="middle">=1</text>
              <line x1="60" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" />

              {/* Second XOR ( (A⊕B) ⊕ C ) */}
              <path d="M150 55 L180 55 L190 70 L180 85 L150 85 L150 55" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M140 55 L150 70 L140 85" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="165" y="75" fill="currentColor" fontSize="10" textAnchor="middle">=1</text>
              <line x1="130" y1="55" x2="140" y2="55" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="100" x2="140" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />

              {/* Inverter for odd parity */}
              <circle cx="200" cy="70" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="190" y1="70" x2="195" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="205" y1="70" x2="230" y2="70" stroke="currentColor" strokeWidth="2" />

              {/* Output */}
              <text x="240" y="75" fill="currentColor" fontSize="14" fontWeight="bold">P</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          An odd parity generator is simply an even parity generator followed by an inverter. Alternatively, an XNOR gate can be used.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real‑World Context</h2>
        <p className="text-gray-300 mb-3">
          Odd parity generators are used in:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>UART communication:</strong> Some systems use odd parity by convention.</li>
          <li><strong>PCI bus:</strong> Parity on PCI is odd parity.</li>
          <li><strong>Industrial networks:</strong> Many fieldbuses use odd parity for better error detection characteristics.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build a 4‑bit odd parity generator by adding an inverter to the even parity circuit and verify its operation with LEDs.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>What is the output if all data bits are 0? (P=1, total odd.)</li>
          <li>How does odd parity differ from even parity in terms of the all‑zeros case?</li>
          <li>Can you build an odd parity generator without an explicit inverter? (Yes, using XNOR.)</li>
          <li>In a system where the idle state is all zeros, which parity gives a parity bit of 1? (Odd parity.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing odd with even:</strong> Double-check which parity your system requires.</li>
          <li><strong>Forgetting the inverter:</strong> Using an even parity generator directly will give the wrong parity.</li>
          <li><strong>Using XNOR but misconnecting inputs:</strong> XNOR of all bits is the odd parity? Actually, XNOR is the complement of XOR, so yes, XNOR of all bits gives odd parity.</li>
          <li><strong>Assuming the generator also checks:</strong> The generator only creates the parity bit; a separate checker is needed.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>For clarity, build an even parity generator and then add an inverter.</li>
          <li>If using an IC like 74180 (9‑bit parity generator/checker), it provides both even and odd outputs directly.</li>
          <li>In HDL, use XOR then NOT, or use the built‑in odd parity function if available.</li>
          <li>Simulate with known test vectors to ensure the parity is correct.</li>
          <li>Document which parity convention you are using in your design.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using a single XNOR for many bits:</strong> XNOR is just XOR followed by an inverter; you can use a tree of XORs and a final inverter.</li>
          <li><strong>For high‑speed designs,</strong> place the inverter at the output of the XOR tree to minimize gate count.</li>
          <li><strong>Software parity:</strong> For odd parity in software, compute even parity and then flip the LSB.</li>
          <li><strong>Power‑up state:</strong> Ensure the generator produces the correct parity even when data is changing; no memory involved.</li>
          <li><strong>Combine with checker:</strong> The same XOR tree (without the inverter) can be used as a checker by feeding it the received data plus parity bit; the output will be 0 for odd parity? Actually, for odd parity, the checker should output 1 when an error is detected. You need to design accordingly.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand that odd parity makes the total number of 1s odd.</li>
          <li>I can write the Boolean expression: P = (A ⊕ B ⊕ C ⊕ ...)'</li>
          <li>I can draw the circuit for a 3‑bit odd parity generator.</li>
          <li>I can extend the design to any number of bits.</li>
          <li>I know the difference between odd and even parity and when to use each.</li>
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
          “Odd parity is often just a complement away from even parity, but it's important because some systems choose odd for better line balance (to guarantee at least one transition). In my Barrackpore lab, after building the even parity generator, we simply add an inverter to get odd parity. Students then test both with a UART simulator. This leads to a discussion on why different standards exist. Next, we'll look at the 74180 IC, which combines both in one package, and then parity checkers.”
        </p>
      </section>
    </div>
  );
};

export default Topic36;