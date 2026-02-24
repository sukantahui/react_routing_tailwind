import React from 'react';
import clsx from 'clsx';
import fullSubtractor from './topic6_files/fullsubtractor.png';
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

const Topic6 = () => {
  // Truth table for full subtractor (A - B - Bin)
  const truthTable = [
    { A: 0, B: 0, Bin: 0, Difference: 0, Bout: 0 },
    { A: 0, B: 0, Bin: 1, Difference: 1, Bout: 1 },
    { A: 0, B: 1, Bin: 0, Difference: 1, Bout: 1 },
    { A: 0, B: 1, Bin: 1, Difference: 0, Bout: 1 },
    { A: 1, B: 0, Bin: 0, Difference: 1, Bout: 0 },
    { A: 1, B: 0, Bin: 1, Difference: 0, Bout: 0 },
    { A: 1, B: 1, Bin: 0, Difference: 0, Bout: 0 },
    { A: 1, B: 1, Bin: 1, Difference: 1, Bout: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Full Subtractor</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Subtracts one single-bit binary number from another, considering a borrow-in, producing Difference and Borrow-out.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> full_subtractor(A, B, Bin) → (Difference, Bout)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> A (minuend), B (subtrahend), Bin (borrow-in) – each 1 bit</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Difference (1 bit), Bout (borrow-out, 1 bit)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Performs binary subtraction of three bits (A - B - Bin).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In multi-bit subtractors, arithmetic logic units (ALUs), and digital signal processors.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-12 p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">

  {/* Heading */}
  <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
    🔌 Full Subtractor Circuit
  </h2>

  <div className="flex flex-col items-center gap-8">

    {/* Circuit Image */}
    <div className="max-w-4xl w-full flex justify-center">
      <img
        src={fullSubtractor}
        alt="Full Subtractor Circuit"
        className="dark:invert w-full h-auto object-contain"
      />
    </div>

    {/* Boolean Expressions Card */}
    <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-xl border border-gray-600 shadow-md">
      
      <h3 className="text-xl font-semibold text-blue-300 mb-4">
        Boolean Expressions
      </h3>

      <div className="space-y-3">
        <p className="font-mono text-green-400 text-lg">
          Difference = A ⊕ B ⊕ Bin
        </p>

        <p className="font-mono text-green-400 text-lg">
          Bout = (A'·B) + (A'·Bin) + (B·Bin)
        </p>

        <p className="text-gray-400 text-sm pt-2 border-t border-gray-700">
          Alternative: Bout = (A'·B) + (Bin·(A⊕B)')
        </p>
      </div>
    </div>
  </div>

  {/* Description */}
  <p className="text-gray-300 mt-8 text-center text-lg">
    A full subtractor can be built using two half subtractors and one OR gate.
  </p>

</section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">A</th>
                <th className="py-2 px-4 text-purple-300">B</th>
                <th className="py-2 px-4 text-purple-300">Bin</th>
                <th className="py-2 px-4 text-purple-300">Difference</th>
                <th className="py-2 px-4 text-purple-300">Bout</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.A}</td>
                  <td className="py-2 px-4">{row.B}</td>
                  <td className="py-2 px-4">{row.Bin}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Difference}</td>
                  <td className="py-2 px-4 font-bold text-yellow-400">{row.Bout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Difference is 1 when an odd number of inputs are 1. Borrow-out is 1 when the number of 1s in {`{A', B, Bin}`} is at least 2.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Imagine Tuhina has some apples (A), Swadeep wants some apples (B), and Tuhina already owes an apple to Abhronila (Bin). 
          The full subtractor computes how many apples Tuhina has left (Difference) and whether she needs to borrow more from Debangshu (Bout).
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 mt-2">
          <p className="text-gray-200 text-center">
            For multi-bit subtraction, we chain full subtractors: the borrow-out of one stage becomes the borrow-in of the next lower stage.
          </p>
        </div>
        <p className="text-gray-300 mt-3">
          This forms a <strong>ripple-borrow subtractor</strong>, used in ALUs for subtraction operations.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How does the full subtractor relate to the half subtractor? (It adds a borrow-in.)</li>
          <li>Observe carefully: The Difference expression is the same as full adder's Sum – three-input XOR.</li>
          <li>Why is the Borrow-out expression different from Carry-out? (Because borrow logic is A'·B etc.)</li>
          <li>Try constructing a full subtractor using two half subtractors – where does the OR gate fit?</li>
          <li>What happens when A=0, B=1, Bin=1? (Difference=0, Bout=1 – you borrowed twice.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using full adder equations:</strong> Borrow is not the same as carry; don't use A·B etc.</li>
          <li><strong>Forgetting the borrow-in:</strong> Treating full subtractor like a half subtractor.</li>
          <li><strong>Incorrect Borrow expression:</strong> Missing terms like A'·Bin or B·Bin.</li>
          <li><strong>Confusing A and A':</strong> Borrow involves complemented A in two terms.</li>
          <li><strong>Assuming difference = A⊕B (ignoring Bin):</strong> That's only valid when Bin=0.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always start with the truth table – it's the definitive specification.</li>
          <li>Use hierarchical design: build from half subtractors to understand structure.</li>
          <li>Label all borrow signals clearly when cascading multiple full subtractors.</li>
          <li>Test with all 8 input combinations in simulation before hardware.</li>
          <li>Document both Difference and Borrow expressions in your design.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Ripple-borrow subtractor:</strong> Similar to ripple-carry adder, but slower due to borrow propagation.</li>
          <li><strong>Two's complement:</strong> Most modern CPUs do subtraction by adding two's complement, so full adders are used instead of subtractors. However, understanding full subtractors is crucial for ALU design.</li>
          <li><strong>In VHDL/Verilog:</strong> Difference &lt;= A xor B xor Bin; Bout &lt;= (not A and B) or (not A and Bin) or (B and Bin);</li>
          <li><strong>Debugging:</strong> If Difference is wrong, check XOR gates; if Borrow is wrong, check the AND-OR combination.</li>
          <li><strong>K-map simplification:</strong> Use K-maps to derive minimal expressions for Bout.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for a full subtractor.</li>
          <li>I can write the Boolean expressions (Diff = A⊕B⊕Bin, Bout = A'·B + A'·Bin + B·Bin).</li>
          <li>I can draw the circuit using two half subtractors and an OR gate.</li>
          <li>I understand how to cascade full subtractors for multi-bit subtraction.</li>
          <li>I can identify the critical path (borrow propagation) in a ripple-borrow subtractor.</li>
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
          “The full subtractor often challenges students because borrow propagation feels less intuitive than carry. I use the story of Abhronila, Debangshu, and Tuhina borrowing apples: if Tuhina (A) has fewer apples than what Swadeep (B) wants and she already owes Abhronila (Bin), she may need to borrow from Debangshu (Bout). The three-input XOR for difference is elegant, but the borrow logic requires careful analysis. Encourage students to derive the truth table themselves and then map it to gates. Once they see the pattern, they'll appreciate how subtraction works at the hardware level.”
        </p>
      </section>
    </div>
  );
};

export default Topic6;