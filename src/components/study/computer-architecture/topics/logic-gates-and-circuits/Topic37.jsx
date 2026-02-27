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

const Topic37 = () => {
  // Truth table for 4-bit even parity checker (3 data bits + 1 parity bit)
  const evenParityCheckTruth = [
    { A:0, B:0, C:0, P:0, error:0 },
    { A:0, B:0, C:0, P:1, error:1 },
    { A:0, B:0, C:1, P:0, error:1 },
    { A:0, B:0, C:1, P:1, error:0 },
    { A:0, B:1, C:0, P:0, error:1 },
    { A:0, B:1, C:0, P:1, error:0 },
    { A:0, B:1, C:1, P:0, error:0 },
    { A:0, B:1, C:1, P:1, error:1 },
    { A:1, B:0, C:0, P:0, error:1 },
    { A:1, B:0, C:0, P:1, error:0 },
    { A:1, B:0, C:1, P:0, error:0 },
    { A:1, B:0, C:1, P:1, error:1 },
    { A:1, B:1, C:0, P:0, error:0 },
    { A:1, B:1, C:0, P:1, error:1 },
    { A:1, B:1, C:1, P:0, error:1 },
    { A:1, B:1, C:1, P:1, error:0 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Parity Checker</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A circuit that verifies whether the received data (including parity bit) has the correct parity, indicating if an error occurred.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> parity_checker(data_bits, parity_bit) → error_flag</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> n data bits (e.g., A, B, C) plus the received parity bit P</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Output:</span> error (1 if parity mismatch, 0 if correct)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Detect single‑bit errors in transmitted or stored data.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> At the receiving end of a communication link, or when reading data from memory.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">How it Works</h2>
        <p className="text-gray-300 mb-4">
          A parity checker computes the parity of all incoming bits (data + parity) and compares it to the expected parity. For an even‑parity system, the checker outputs 1 (error) if the total number of 1s is odd; for odd‑parity, it outputs 1 if the total number of 1s is even.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-center text-gray-200">
            <span className="font-mono text-green-400">Error (even parity) = A ⊕ B ⊕ C ⊕ P</span><br />
            <span className="font-mono text-green-400">Error (odd parity)  = (A ⊕ B ⊕ C ⊕ P)'</span>
          </p>
        </div>
      </section>

      {/* Truth Table for even parity checker (3 data bits + parity) */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (Even Parity, 3 data bits + P)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-purple-300">A</th>
                <th className="py-2 px-2 text-purple-300">B</th>
                <th className="py-2 px-2 text-purple-300">C</th>
                <th className="py-2 px-2 text-purple-300">P</th>
                <th className="py-2 px-2 text-purple-300">Error</th>
              </tr>
            </thead>
            <tbody>
              {evenParityCheckTruth.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-2">{row.A}</td>
                  <td className="py-1 px-2">{row.B}</td>
                  <td className="py-1 px-2">{row.C}</td>
                  <td className="py-1 px-2">{row.P}</td>
                  <td className={clsx("py-1 px-2 font-bold", row.error === 1 ? "text-red-400" : "text-green-400")}>
                    {row.error}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Error = 1 when the total number of 1s (A+B+C+P) is odd – indicating a parity mismatch.
        </p>
      </section>

      {/* Boolean Expression */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expression</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-2xl text-center">Error = A ⊕ B ⊕ C ⊕ P</p>
          <p className="text-gray-300 mt-2 text-center">
            For n data bits, the error flag is the XOR of all received bits (data + parity).
          </p>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Gate‑Level Circuit (Even Parity Checker, 4 bits total)</h2>
        <div className="flex justify-center">
          <div className="w-96 h-56 group">
            <svg viewBox="0 0 350 180" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Inputs */}
              <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="45" fill="currentColor" fontSize="12">A</text>
              <line x1="20" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="75" fill="currentColor" fontSize="12">B</text>
              <line x1="20" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="105" fill="currentColor" fontSize="12">C</text>
              <line x1="20" y1="130" x2="60" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="10" y="135" fill="currentColor" fontSize="12">P</text>

              {/* XOR tree */}
              {/* First XOR: A ⊕ B */}
              <path d="M90 40 L120 40 L130 55 L120 70 L90 70 L90 40" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M80 40 L90 55 L80 70" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="105" y="60" fill="currentColor" fontSize="10" textAnchor="middle">=1</text>
              <line x1="60" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" />

              {/* Second XOR: (A⊕B) ⊕ C */}
              <path d="M150 55 L180 55 L190 70 L180 85 L150 85 L150 55" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M140 55 L150 70 L140 85" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="165" y="75" fill="currentColor" fontSize="10" textAnchor="middle">=1</text>
              <line x1="130" y1="55" x2="140" y2="55" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="100" x2="140" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />

              {/* Third XOR: (A⊕B⊕C) ⊕ P */}
              <path d="M210 70 L240 70 L250 85 L240 100 L210 100 L210 70" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M200 70 L210 85 L200 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="225" y="90" fill="currentColor" fontSize="10" textAnchor="middle">=1</text>
              <line x1="190" y1="70" x2="200" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="130" x2="200" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />

              {/* Output Error */}
              <line x1="250" y1="85" x2="290" y2="85" stroke="currentColor" strokeWidth="2" />
              <text x="300" y="90" fill="currentColor" fontSize="14" fontWeight="bold">Error</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The checker is simply an XOR tree of all received bits. If the output is 1, a parity error has occurred.
        </p>
      </section>

      {/* Odd Parity Checker */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Odd Parity Checker</h2>
        <p className="text-gray-300 mb-4">
          For odd parity, the error flag is the complement of the even parity checker output. 
          <span className="font-mono text-green-400 ml-2">Error = (A ⊕ B ⊕ C ⊕ P)'</span>
        </p>
        <p className="text-gray-300">
          This can be implemented by adding an inverter at the output of the XOR tree, or by using an XNOR gate.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real‑World Context</h2>
        <p className="text-gray-300 mb-3">
          Parity checkers are everywhere:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>UART receivers:</strong> Check parity of each incoming character and flag errors.</li>
          <li><strong>Memory controllers:</strong> Verify that data read from memory has the correct parity.</li>
          <li><strong>PCI/PCIe buses:</strong> Use parity on address and data phases.</li>
          <li><strong>RAID controllers:</strong> Recompute parity to verify data integrity.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Shyamnagar lab, students connect a parity checker to the output of a parity generator and intentionally flip a bit to see the error LED light up.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many XOR gates are needed for an 8‑bit data + parity checker? (A tree of 8 inputs → 7 XOR gates.)</li>
          <li>What happens if two bits flip? (The error flag will be 0 – parity cannot detect double errors.)</li>
          <li>Can a parity checker be used as a generator? (Yes, if you leave the parity input at 0, the output is the even parity of the data bits.)</li>
          <li>Why might a system use odd parity instead of even? (To guarantee at least one transition when data is all zeros.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using the wrong polarity:</strong> Make sure the checker matches the parity used at the generator.</li>
          <li><strong>Forgetting that the parity bit is included in the check:</strong> The checker must examine data + parity.</li>
          <li><strong>Assuming the error flag indicates which bit is wrong:</strong> Parity only tells you an error occurred, not where.</li>
          <li><strong>Not resetting the checker between words:</strong> In serial systems, ensure the checker is cleared for each new word.</li>
          <li><strong>Ignoring the possibility of double errors:</strong> Parity is weak; consider more robust codes for critical systems.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Use a balanced XOR tree to minimize propagation delay.</li>
          <li>If using an IC like 74180, it provides both even and odd checker outputs.</li>
          <li>In HDL, use a simple XOR reduction operator (e.g., <span className="font-mono">^</span> in Verilog).</li>
          <li>Simulate with all single‑bit error patterns to verify detection.</li>
          <li>Document the parity scheme clearly in your interface specifications.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using a single 74180:</strong> This IC can generate or check parity for up to 9 bits. Connect data bits and parity to the inputs, and read the error flag from the even or odd output.</li>
          <li><strong>High‑speed designs:</strong> XOR trees can be pipelined if needed.</li>
          <li><strong>Software implementation:</strong> Parity check in software is often done by XORing all bits and comparing with the received parity.</li>
          <li><strong>Power saving:</strong> XOR gates have low power, so parity circuits are efficient.</li>
          <li><strong>Test with boundary conditions:</strong> All zeros, all ones, and single‑bit flips.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the role of a parity checker in error detection.</li>
          <li>I can write the Boolean expression for even parity error: A⊕B⊕C⊕P.</li>
          <li>I can draw the circuit for a 4‑bit even parity checker.</li>
          <li>I can adapt the design for odd parity.</li>
          <li>I know the limitations (only single‑bit error detection).</li>
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
          “Parity checkers are the receiving end of the story. After building generators, students often ask 'how do we know if the parity is right?' That's where the checker comes in. In my Ichapur lab, we build a complete loop: generator → transmission (with a switch to flip a bit) → checker. The 'error' LED lights up when the switch is flipped. It's a simple but satisfying demonstration of error detection. This also sets the stage for discussing more advanced codes like Hamming and CRC.”
        </p>
      </section>
    </div>
  );
};

export default Topic37;