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

const Topic34 = () => {
  // Truth table for 3-bit even parity generator
  const evenParityGen = [
    { A:0, B:0, C:0, P:0 },
    { A:0, B:0, C:1, P:1 },
    { A:0, B:1, C:0, P:1 },
    { A:0, B:1, C:1, P:0 },
    { A:1, B:0, C:0, P:1 },
    { A:1, B:0, C:1, P:0 },
    { A:1, B:1, C:0, P:0 },
    { A:1, B:1, C:1, P:1 },
  ];

  // Truth table for 4-bit even parity checker (data bits + parity)
  const evenParityCheck = [
    { A:0, B:0, C:0, P:0, error:0 },
    { A:0, B:0, C:0, P:1, error:1 },
    { A:0, B:0, C:1, P:0, error:1 },
    { A:0, B:0, C:1, P:1, error:0 },
    // ... (rest omitted for brevity, but principle: error when total ones odd)
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Parity Generators and Checkers</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Simple and widely used error‑detection circuits that add a parity bit to data and verify it at the receiver.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is Parity?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Parity bit:</span> An extra bit appended to a string of data bits to make the total number of 1s either even (even parity) or odd (odd parity).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Detect single‑bit errors during transmission or storage.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Generator:</span> Circuit that computes the parity bit from the data.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Checker:</span> Circuit that checks whether the received data + parity bit have the correct parity.</p>
          </div>
        </div>
      </section>

      {/* Even Parity Generator */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Even Parity Generator (3‑bit data)</h2>
        <p className="text-gray-300 mb-4">
          For three data bits (A, B, C), the even parity bit P is chosen so that the total number of 1s (A+B+C+P) is even.
          The Boolean expression is: <span className="font-mono text-green-400">P = A ⊕ B ⊕ C</span>.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Truth Table</h3>
            <table className="w-full text-center border-collapse text-sm">
              <thead><tr className="border-b border-gray-600"><th>A</th><th>B</th><th>C</th><th>P</th></tr></thead>
              <tbody>
                {evenParityGen.map((row, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td>{row.A}</td><td>{row.B}</td><td>{row.C}</td><td className="font-bold text-green-400">{row.P}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-48 h-32 group">
              <svg viewBox="0 0 150 100" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
                <line x1="10" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="2" /><text x="5" y="35" fill="currentColor" fontSize="8">A</text>
                <line x1="10" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="2" /><text x="5" y="55" fill="currentColor" fontSize="8">B</text>
                <line x1="10" y1="70" x2="40" y2="70" stroke="currentColor" strokeWidth="2" /><text x="5" y="75" fill="currentColor" fontSize="8">C</text>
                <path d="M50 20 L70 20 L80 40 L70 60 L50 60 L50 20" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M40 20 L50 40 L40 60" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="60" y="45" fill="currentColor" fontSize="8" textAnchor="middle">=1</text>
                <line x1="80" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" /><text x="120" y="45" fill="currentColor" fontSize="8">P</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Odd Parity Generator */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Odd Parity Generator</h2>
        <p className="text-gray-300">
          For odd parity, the total number of 1s must be odd. This is simply the complement of even parity: 
          <span className="font-mono text-green-400 ml-2">P = (A ⊕ B ⊕ C)'</span>
        </p>
        <p className="text-gray-300 mt-2">
          Alternatively, you can implement it with an XOR followed by an inverter, or by using XNOR.
        </p>
      </section>

      {/* Even Parity Checker */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔎 Even Parity Checker (4‑bit input: data + parity)</h2>
        <p className="text-gray-300 mb-4">
          The checker receives the three data bits and the parity bit. It outputs an error signal (1) if the total number of 1s is odd (indicating a single‑bit error).
          The Boolean expression is: <span className="font-mono text-green-400">Error = A ⊕ B ⊕ C ⊕ P</span>.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Sample Truth Table</h3>
            <table className="w-full text-center border-collapse text-sm">
              <thead><tr className="border-b border-gray-600"><th>A</th><th>B</th><th>C</th><th>P</th><th>Error</th></tr></thead>
              <tbody>
                <tr><td>0</td><td>0</td><td>0</td><td>0</td><td className="text-green-400">0</td></tr>
                <tr><td>0</td><td>0</td><td>0</td><td>1</td><td className="text-red-400">1</td></tr>
                <tr><td>0</td><td>0</td><td>1</td><td>0</td><td className="text-red-400">1</td></tr>
                <tr><td>0</td><td>0</td><td>1</td><td>1</td><td className="text-green-400">0</td></tr>
                <tr><td>0</td><td>1</td><td>0</td><td>0</td><td className="text-red-400">1</td></tr>
                <tr><td>0</td><td>1</td><td>0</td><td>1</td><td className="text-green-400">0</td></tr>
                <tr><td>0</td><td>1</td><td>1</td><td>0</td><td className="text-green-400">0</td></tr>
                <tr><td>0</td><td>1</td><td>1</td><td>1</td><td className="text-red-400">1</td></tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-48 h-32 group">
              <svg viewBox="0 0 150 100" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
                <line x1="10" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" /><text x="5" y="25" fill="currentColor" fontSize="8">A</text>
                <line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="2" /><text x="5" y="45" fill="currentColor" fontSize="8">B</text>
                <line x1="10" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="2" /><text x="5" y="65" fill="currentColor" fontSize="8">C</text>
                <line x1="10" y1="80" x2="40" y2="80" stroke="currentColor" strokeWidth="2" /><text x="5" y="85" fill="currentColor" fontSize="8">P</text>
                <path d="M50 20 L70 20 L80 40 L70 60 L50 60 L50 20" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M40 20 L50 40 L40 60" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="60" y="45" fill="currentColor" fontSize="8" textAnchor="middle">=1</text>
                <line x1="80" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" /><text x="120" y="45" fill="currentColor" fontSize="8">Error</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real‑World Context</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Serial communication (UART):</strong> Many UARTs can generate and check parity bits for each transmitted character.</li>
          <li><strong>Memory systems:</strong> Some memory modules use parity for error detection (though ECC is more common now).</li>
          <li><strong>PCI bus:</strong> Parity is used on address and data lines to detect errors.</li>
          <li><strong>RAID arrays:</strong> Parity is used for data reconstruction in RAID 3, 4, 5.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build a 4‑bit even‑parity checker using XOR gates and test it with a sequence of bits from switches, watching an LED indicate an error.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many XOR gates are needed for an 8‑bit even parity generator? (A tree of XOR gates – 7 gates.)</li>
          <li>Observe carefully: The parity generator and checker both use XOR gates – the checker simply adds the parity bit to the XOR chain.</li>
          <li>Try designing an odd parity checker using an even parity checker and an inverter.</li>
          <li>What happens if two bits flip? (Parity won't detect it – that's the limitation.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing even and odd parity:</strong> Make sure you know which one your system expects.</li>
          <li><strong>Using OR/XOR incorrectly:</strong> Parity is XOR, not OR.</li>
          <li><strong>Forgetting that parity only detects odd numbers of errors:</strong> Two errors cancel out.</li>
          <li><strong>Not resetting the parity generator/checker at the start of a transmission:</strong> Ensure initial state is known.</li>
          <li><strong>Misplacing the parity bit:</strong> The checker must know which bit is the parity bit.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Use XOR gates for both generation and checking – it's efficient and compact.</li>
          <li>For wider data, build a tree of XOR gates to minimize delay.</li>
          <li>In communication protocols, agree on the parity type (even/odd) beforehand.</li>
          <li>Consider using an IC like 74180 for 9‑bit applications (data + parity).</li>
          <li>Simulate your design with all possible single‑bit errors to verify detection.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using a single XOR for multiple bits:</strong> For n bits, use a balanced XOR tree; the delay is O(log₂n).</li>
          <li><strong>IC 74180:</strong> A 9‑bit parity generator/checker that can be used for 8‑bit data + parity. It provides both even and odd outputs.</li>
          <li><strong>In software:</strong> Parity can be computed quickly using XOR and bit‑counting instructions (e.g., POPCNT on x86).</li>
          <li><strong>Error detection vs. correction:</strong> Parity only detects errors; it cannot correct them. For correction, you need ECC (Hamming codes).</li>
          <li><strong>Power consumption:</strong> XOR gates have low power, so parity circuits are cheap to implement.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the concept of even and odd parity.</li>
          <li>I can design an even parity generator for 3 bits using XOR gates.</li>
          <li>I can design an even parity checker for 3 bits + parity.</li>
          <li>I know that parity detects only odd numbers of errors.</li>
          <li>I am aware of real‑world applications like UART and RAID.</li>
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
          “Parity is the simplest form of error detection, and it's a great way to introduce students to the concept of redundancy. In my Barrackpore lab, we first build a 3‑bit even parity generator with XOR gates, then extend it to a checker. Students enjoy seeing how a single flipped bit lights an error LED. We discuss why two errors can go undetected, which naturally leads to more advanced codes. I also point out that parity is still used in many modern interfaces – it's not just a textbook example. Next, we'll look at the 74180 IC, which implements 9‑bit parity in one package.”
        </p>
      </section>
    </div>
  );
};

export default Topic34;