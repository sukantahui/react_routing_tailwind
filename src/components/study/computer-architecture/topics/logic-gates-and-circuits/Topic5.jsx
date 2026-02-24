import React from 'react';
import clsx from 'clsx';
import halfSubtractor from './topic5_files/halfsubtractor.png';

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

const Topic5 = () => {
  // Truth table for half subtractor (A - B)
  const truthTable = [
    { A: 0, B: 0, Difference: 0, Borrow: 0 },
    { A: 0, B: 1, Difference: 1, Borrow: 1 },
    { A: 1, B: 0, Difference: 1, Borrow: 0 },
    { A: 1, B: 1, Difference: 0, Borrow: 0 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Half Subtractor</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Subtracts one single-bit binary number from another, producing Difference and Borrow.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> half_subtractor(A, B) → (Difference, Borrow)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> A (minuend), B (subtrahend) – each 1 bit</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Difference (1 bit), Borrow (1 bit)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Performs binary subtraction of two bits.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> As a building block for multi-bit subtractors and ALUs.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 Half Subtractor Circuit</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* SVG Circuit */}
          <div className="w-72 h-56 group">
    <img 
        src={halfSubtractor} 
        className="dark:invert"
        alt="image"
    />
</div>

          {/* Boolean expressions */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Boolean Expressions</h3>
            <p className="font-mono text-green-400 text-xl">Difference = A ⊕ B</p>
            <p className="font-mono text-green-400 text-xl">Borrow = A' · B</p>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The half subtractor uses an XOR gate for Difference and an AND gate with an inverter on A for Borrow.
        </p>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-purple-300">A</th>
                <th className="py-2 px-4 text-purple-300">B</th>
                <th className="py-2 px-4 text-purple-300">Difference</th>
                <th className="py-2 px-4 text-purple-300">Borrow</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.A}</td>
                  <td className="py-2 px-4">{row.B}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Difference}</td>
                  <td className="py-2 px-4 font-bold text-yellow-400">{row.Borrow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Difference is 1 when inputs differ (XOR). Borrow is 1 only when A=0 and B=1.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Imagine Abhronila has some apples (A) and wants to give Debangshu some apples (B). 
          If she has fewer than Debangshu wants, she needs to borrow an apple from Tuhina (Borrow output). 
          The half subtractor computes how many apples are left (Difference) and whether a borrow is needed.
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-200">
          <li>If A=1, B=0: She has 1, gives 0 → Difference=1, no borrow.</li>
          <li>If A=1, B=1: She has 1, gives 1 → Difference=0, no borrow.</li>
          <li>If A=0, B=1: She has 0, wants to give 1 → must borrow (Borrow=1), Difference=1 (after borrowing).</li>
          <li>If A=0, B=0: No apples, no giving → Difference=0, no borrow.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In digital systems, half subtractors are used in arithmetic logic units (ALUs) for subtraction operations.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How does the half subtractor differ from the half adder? (Borrow vs Carry logic.)</li>
          <li>Observe carefully: The Borrow output is 1 only when A=0 and B=1. Why is that?</li>
          <li>Try constructing a full subtractor from two half subtractors (next topic).</li>
          <li>What happens if you swap A and B? (Then you'd be subtracting A from B.)</li>
          <li>Why is the Borrow expression A'·B and not something else?</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing Borrow with Carry:</strong> Borrow uses A'·B, not A·B.</li>
          <li><strong>Forgetting the inverter:</strong> Assuming Borrow = A·B (like Carry) is wrong.</li>
          <li><strong>Misordering inputs:</strong> Half subtractor is defined as A - B; swapping changes Borrow logic.</li>
          <li><strong>Using OR for Difference:</strong> OR gives 1 for 1-1, but Difference should be 0.</li>
          <li><strong>Assuming half subtractor handles borrow-in:</strong> It doesn't; that's for full subtractor.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always label inputs as minuend (A) and subtrahend (B) to avoid confusion.</li>
          <li>Derive the truth table from binary subtraction rules.</li>
          <li>Test with all four input combinations in simulation.</li>
          <li>Use XOR and AND with inverter ICs (7486, 7408, 7404) for discrete implementations.</li>
          <li>Document both Difference and Borrow expressions.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Half subtractor as a building block:</strong> Combine two to make a full subtractor.</li>
          <li><strong>In VHDL/Verilog:</strong> Difference &lt;= A xor B; Borrow &lt;= (not A) and B;</li>
          <li><strong>Alternative representation:</strong> Borrow can also be expressed as (A' & B).</li>
          <li><strong>Debugging:</strong> If Difference is wrong, check XOR; if Borrow is wrong, check inverter and AND.</li>
          <li><strong>Remember:</strong> Subtraction in computers is often done using two's complement addition, but understanding the half subtractor is fundamental.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for a half subtractor.</li>
          <li>I can write the Boolean expressions (Diff = A⊕B, Borrow = A'·B).</li>
          <li>I can draw the circuit using XOR, AND, and NOT gates.</li>
          <li>I understand why Borrow is only 1 when A=0 and B=1.</li>
          <li>I can use a half subtractor as a component in larger subtractors.</li>
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
          “The half subtractor often trips students because they expect symmetry with the half adder. I tell my class in Barrackpore: 'Think of borrowing from a friend – you only need to borrow if you have none and want to give one.' That's exactly A'·B. The XOR for difference is the same as addition, which surprises them. Use the apple analogy with Abhronila and Debangshu to make it stick. Once they see the pattern, full subtractors become easy. And remember, in modern CPUs, subtraction is done via two's complement addition, but understanding the basic subtractor builds intuition for ALU design.”
        </p>

        
      </section>
    </div>
  );
};

export default Topic5;