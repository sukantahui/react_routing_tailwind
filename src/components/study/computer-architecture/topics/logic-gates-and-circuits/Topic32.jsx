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

const Topic32 = () => {
  // Example BCD addition: 9 + 8 = 17 (invalid BCD, needs correction)
  // Truth table for correction logic (when sum > 9 or carry out)
  // We'll show a conceptual table

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">BCD Adder</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Adds two Binary‑Coded Decimal digits and produces a valid BCD result with carry.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is a BCD Adder?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Definition:</span> A circuit that adds two 4‑bit BCD digits and produces a 4‑bit BCD result and a carry. Since BCD represents decimal digits 0–9, the sum must be adjusted when it exceeds 9.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Used in calculators, digital watches, and systems that display numbers in decimal.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Correction rule:</span> If the binary sum is &gt;9 or produces a carry, add 6 (0110) to the sum.</p>
          </div>
        </div>
      </section>

      {/* Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 BCD Adder Block Diagram</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl group">
            <svg viewBox="0 0 500 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* First 4-bit binary adder */}
              <rect x="50" y="40" width="120" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="110" y="80" fill="currentColor" fontSize="12" textAnchor="middle">4-bit Adder</text>
              <text x="110" y="100" fill="currentColor" fontSize="10" textAnchor="middle">(binary)</text>
              
              {/* Inputs A and B */}
              <line x1="20" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="65" fill="currentColor" fontSize="8">A3-A0</text>
              <line x1="20" y1="100" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="105" fill="currentColor" fontSize="8">B3-B0</text>

              {/* Outputs from first adder */}
              <line x1="170" y1="60" x2="200" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="65" fill="currentColor" fontSize="8">S3-S0</text>
              <line x1="170" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="105" fill="currentColor" fontSize="8">Cout</text>

              {/* Correction logic block */}
              <rect x="230" y="40" width="100" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="280" y="80" fill="currentColor" fontSize="10" textAnchor="middle">Correction</text>
              <text x="280" y="100" fill="currentColor" fontSize="8" textAnchor="middle">(detect >9 or carry)</text>

              {/* Connections to correction logic */}
              <line x1="200" y1="60" x2="230" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="200" y1="100" x2="230" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />

              {/* Correction output (add 6) */}
              <line x1="330" y1="60" x2="360" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="370" y="65" fill="currentColor" fontSize="8">add 6</text>

              {/* Second 4-bit adder (for +6) */}
              <rect x="380" y="40" width="100" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="430" y="80" fill="currentColor" fontSize="10" textAnchor="middle">4-bit Adder</text>
              <text x="430" y="100" fill="currentColor" fontSize="8" textAnchor="middle">(+6 correction)</text>

              {/* Final outputs */}
              <line x1="480" y1="60" x2="520" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="530" y="65" fill="currentColor" fontSize="8">BCD result</text>
              <line x1="480" y1="100" x2="520" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="530" y="105" fill="currentColor" fontSize="8">Final carry</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A BCD adder uses two binary adders and correction logic. The first adder computes the binary sum; the second adds 6 if correction is needed.
        </p>
      </section>

      {/* Correction Logic */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Correction Logic</h2>
        <p className="text-gray-300 mb-4">
          The binary sum (S3 S2 S1 S0) and carry (C) from the first adder are examined. Correction (add 6) is needed if:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>The carry C = 1, or</li>
          <li>The sum is greater than 9 (i.e., S3=1 and (S2=1 or S1=1)).</li>
        </ul>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 mt-2">
          <p className="font-mono text-green-400 text-center">
            Correction = C + S3·(S2 + S1)
          </p>
          <p className="text-gray-300 mt-2 text-center">
            When Correction = 1, we add 6 (0110) to the binary sum. Otherwise, we add 0.
          </p>
        </div>
      </section>

      {/* Truth Table Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Example: 9 + 8</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-200">A = 9 (1001), B = 8 (1000)</p>
            <p className="text-gray-200">Binary sum = 10001 (17 decimal) → C=1, S=0001</p>
            <p className="text-gray-200">Since C=1, correction needed → add 6 (0110)</p>
            <p className="text-gray-200">Result = 0001 + 0110 = 0111 (7) with carry 1 → BCD 17 (0001 0111)</p>
          </div>
          <div>
            <p className="text-gray-200">A = 5 (0101), B = 3 (0011)</p>
            <p className="text-gray-200">Binary sum = 01000 (8) → C=0, S=1000</p>
            <p className="text-gray-200">S=8 (≤9) → no correction</p>
            <p className="text-gray-200">Result = 1000 (8) → BCD 8</p>
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          BCD adders are used wherever decimal arithmetic is needed:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Pocket calculators:</strong> Perform decimal addition without binary‑to‑decimal conversion.</li>
          <li><strong>Digital clocks:</strong> Add seconds, minutes, hours in BCD to avoid complex conversion.</li>
          <li><strong>Cash registers:</strong> Handle monetary amounts directly in decimal.</li>
          <li><strong>Industrial counters:</strong> Display counts in decimal.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Ichapur lab, students build a BCD adder using two 4‑bit binary adders (7483) and some gates, then display the result on seven‑segment displays.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Why is 6 added for correction? (Because BCD skips 1010–1111, so adding 6 skips over the invalid codes.)</li>
          <li>Observe carefully: The correction condition can be implemented with a few gates – C + S3·(S2+S1).</li>
          <li>Try designing a BCD adder for two digits (two‑digit BCD adder) by cascading two BCD adder stages.</li>
          <li>What happens if the result after correction exceeds 9? (It shouldn’t, because we only correct when necessary; after adding 6, the result is always ≤ 9 with a carry.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Forgetting the correction step:</strong> Using a plain binary adder on BCD numbers yields invalid results for sums >9.</li>
          <li><strong>Incorrect correction condition:</strong> Missing the case where S3=1 and (S2=1 or S1=1) (i.e., sum 10–15).</li>
          <li><strong>Adding 6 when not needed:</strong> This would produce a result off by 6.</li>
          <li><strong>Not handling the carry properly:</strong> The carry from the first adder must be included in the correction decision.</li>
          <li><strong>Assuming BCD inputs are valid:</strong> The circuit should assume inputs are valid BCD (0–9).</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Use standard 4‑bit binary adder ICs (e.g., 7483) for both adders.</li>
          <li>Implement the correction logic with a few AND/OR gates; it’s simple and fast.</li>
          <li>When cascading for multi‑digit BCD adders, connect the carry output of one stage to the carry input of the next.</li>
          <li>Simulate with all combinations of valid BCD inputs to verify correction works for 0–9.</li>
          <li>Consider using a BCD adder IC like 74LS83 (which includes the correction internally) for compact designs.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using the 7483:</strong> The 7483 has carry‑in and carry‑out, making it easy to cascade. For correction, you can set the carry‑in of the second adder to 0 and add 6 via the B inputs.</li>
          <li><strong>Detecting sum >9:</strong> The condition S3·(S2+S1) can be implemented with one AND and one OR gate (or a 3‑input AND if you prefer).</li>
          <li><strong>Speed:</strong> The critical path goes through two adders; for high‑speed designs, consider look‑ahead correction.</li>
          <li><strong>BCD subtraction:</strong> Similar correction can be applied for BCD subtraction using 9’s or 10’s complement.</li>
          <li><strong>Power:</strong> BCD adders consume more power than binary adders due to extra gates; use only when decimal I/O is required.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand why BCD addition needs correction.</li>
          <li>I know the correction condition: C + (S3·(S2+S1)).</li>
          <li>I can draw the block diagram of a BCD adder using two 4‑bit adders.</li>
          <li>I can implement the correction logic with basic gates.</li>
          <li>I can cascade BCD adders for multi‑digit numbers.</li>
          <li>I know real‑world applications like calculators and digital clocks.</li>
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
          “The BCD adder is a perfect example of how we adapt binary hardware to human‑friendly decimal. In my Barrackpore lab, students first build a binary adder, then extend it with correction logic and see the ‘magic’ of adding 6. We use 7483 adders and a few gates to build a one‑digit BCD adder, then cascade two to add numbers like 39 + 48. They really appreciate why calculators don't use pure binary. I also point out that modern CPUs often have instructions for BCD arithmetic (like DAA on x86), which does exactly this correction in microcode.”
        </p>
      </section>
    </div>
  );
};

export default Topic32;