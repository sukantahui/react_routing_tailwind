import React from 'react';
import clsx from 'clsx';
import fullAdder from './topic4_files/fulladder.png';

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

const Topic4 = () => {
  // Truth table for full adder
  const truthTable = [
    { A: 0, B: 0, Cin: 0, Sum: 0, Cout: 0 },
    { A: 0, B: 0, Cin: 1, Sum: 1, Cout: 0 },
    { A: 0, B: 1, Cin: 0, Sum: 1, Cout: 0 },
    { A: 0, B: 1, Cin: 1, Sum: 0, Cout: 1 },
    { A: 1, B: 0, Cin: 0, Sum: 1, Cout: 0 },
    { A: 1, B: 0, Cin: 1, Sum: 0, Cout: 1 },
    { A: 1, B: 1, Cin: 0, Sum: 0, Cout: 1 },
    { A: 1, B: 1, Cin: 1, Sum: 1, Cout: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Full Adder</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Adds three single-bit binary numbers (A, B, and Carry-in), producing Sum and Carry-out.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> full_adder(A, B, Cin) → (Sum, Cout)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> A, B, Cin (each 1 bit)</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Sum (1 bit), Cout (1 bit)</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Adds three binary digits, essential for multi-bit addition.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In ripple-carry adders, ALUs, and any arithmetic circuit requiring carry propagation.</p>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 Full Adder Circuit</h2>
        <div className="flex flex-col items-center gap-6">
          {/* SVG Circuit */}
          <div className="w-full max-w-2xl group">
            <img src={fullAdder} alt='Full Adder' className="max-w-full"/>
          </div>

          {/* Boolean expressions */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Boolean Expressions</h3>
            <p className="font-mono text-green-400 text-xl">Sum = A ⊕ B ⊕ Cin</p>
            <p className="font-mono text-green-400 text-xl">Cout = (A·B) + (Cin·(A⊕B))</p>
            <p className="text-gray-400 text-sm mt-2">Alternative: Cout = A·B + A·Cin + B·Cin</p>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A full adder can be built from two half adders and an OR gate.
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
                <th className="py-2 px-4 text-purple-300">Cin</th>
                <th className="py-2 px-4 text-purple-300">Sum</th>
                <th className="py-2 px-4 text-purple-300">Cout</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.A}</td>
                  <td className="py-2 px-4">{row.B}</td>
                  <td className="py-2 px-4">{row.Cin}</td>
                  <td className="py-2 px-4 font-bold text-green-400">{row.Sum}</td>
                  <td className="py-2 px-4 font-bold text-yellow-400">{row.Cout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Sum is 1 when an odd number of inputs are 1. Cout is 1 when at least two inputs are 1.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Full adders are the building blocks of multi-bit adders. Imagine adding two 4-bit numbers:
          Tuhina's number (A3A2A1A0) and Swadeep's number (B3B2B1B0). Each bit position uses a full adder,
          with the carry-out from one stage feeding the carry-in of the next.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 mt-2">
          <p className="text-gray-200 font-mono text-center">
            A3 A2 A1 A0  (Tuhina's number)<br />
            B3 B2 B1 B0  (Swadeep's number)<br />
            +<br />
            -----------------<br />
            S4 S3 S2 S1 S0  (Result)
          </p>
        </div>
        <p className="text-gray-300 mt-3">
          This forms a <strong>ripple-carry adder</strong>, the foundation of arithmetic in CPUs.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How does the full adder differ from the half adder? (It adds three bits, not two.)</li>
          <li>Observe carefully: The Sum expression is XOR of all three inputs – why does that make sense?</li>
          <li>Try constructing a full adder from two half adders: where does the OR gate come in?</li>
          <li>What happens to the carry when adding 1+1+1? (Sum=1, Cout=1 → binary 11.)</li>
          <li>Why can't we just use half adders for multi-bit addition? (They lack a carry input.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Forgetting the carry-in:</strong> Treating full adder like a half adder.</li>
          <li><strong>Incorrect Boolean expression:</strong> Using AND for Sum, or missing terms in Cout.</li>
          <li><strong>Misunderstanding carry propagation:</strong> The carry-out of one stage must connect to the next stage's carry-in.</li>
          <li><strong>Assuming Sum = A⊕B (ignoring Cin):</strong> That only works when Cin=0.</li>
          <li><strong>Confusing Cout expression:</strong> Remember it's majority function: at least two inputs high.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always start with the truth table – it's the definitive specification.</li>
          <li>Use hierarchical design: build from half adders to understand structure.</li>
          <li>Label all carries clearly when cascading multiple full adders.</li>
          <li>Test with all 8 input combinations in simulation before hardware.</li>
          <li>Document both Sum and Cout expressions in your design.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Ripple-carry adder:</strong> Simple but slow – the carry has to propagate through all stages.</li>
          <li><strong>Look-ahead carry:</strong> For faster addition, generate carries in parallel using additional logic.</li>
          <li><strong>In VHDL/Verilog:</strong> Use "+" operator for behavioral description, but understand the gate-level implementation.</li>
          <li><strong>Debugging:</strong> If Sum is wrong, check XOR gates; if Cout is wrong, check AND and OR gates.</li>
          <li><strong>K-map simplification:</strong> Use K-maps to derive minimal expressions for Sum and Cout.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I can draw the truth table for a full adder.</li>
          <li>I can write the Boolean expressions (Sum = A⊕B⊕Cin, Cout = A·B + Cin·(A⊕B)).</li>
          <li>I can draw the circuit using two half adders and an OR gate.</li>
          <li>I understand how to cascade full adders for multi-bit addition.</li>
          <li>I can identify the critical path (carry propagation) in a ripple-carry adder.</li>
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
          “The full adder is where students truly start to see how complex systems are built from simple gates. I use the analogy of three friends – Abhronila, Debangshu, and Tuhina – pooling money. If at least two have a rupee, they can buy a candy (Cout=1). The sum is just whether the total is odd. Building it from two half adders reinforces the modular design concept. Students in Barrackpore love this because they can visualize the carry 'rippling' from one stage to the next. Once they master this, we move on to subtractors and ALUs with confidence.”
        </p>
      </section>
    </div>
  );
};

export default Topic4;