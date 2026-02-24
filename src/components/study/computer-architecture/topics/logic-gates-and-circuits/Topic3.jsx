import React from 'react';
import clsx from 'clsx';
import halfAdder from './topic3_files/halfadder.png';

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

const Topic3 = () => {
    // Truth table for half adder
    const truthTable = [
        { A: 0, B: 0, Sum: 0, Carry: 0 },
        { A: 0, B: 1, Sum: 1, Carry: 0 },
        { A: 1, B: 0, Sum: 1, Carry: 0 },
        { A: 1, B: 1, Sum: 0, Carry: 1 },
    ];

    return (
        <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
            <style>{animationStyles}</style>

            {/* Header */}
            <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h1 className="text-4xl font-bold text-blue-400 mb-2">Half Adder</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    The simplest arithmetic circuit – adds two single-bit binary numbers, producing Sum and Carry.
                </p>
            </header>

            {/* Prototype / signature overview */}
            <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> half_adder(A, B) → (Sum, Carry)</p>
                        <p className="text-lg"><span className="font-mono text-purple-300">Inputs:</span> A, B (each 1 bit)</p>
                        <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Sum (1 bit), Carry (1 bit)</p>
                    </div>
                    <div>
                        <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Adds two binary digits</p>
                        <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> As a building block for multi-bit adders (e.g., full adder, ripple-carry adder)</p>
                    </div>
                </div>
            </section>

            {/* Circuit Diagram */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    🔌 Half Adder Circuit
                </h2>

                <div className="flex flex-col items-center gap-6">

                    {/* Half Adder PNG */}
                    <img src={halfAdder} alt="Half Adder Circuit" className="max-w-full" />

                    {/* Boolean expressions */}
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 text-center">
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">
                            Boolean Expressions
                        </h3>
                        <p className="font-mono text-green-400 text-xl">Sum = A ⊕ B</p>
                        <p className="font-mono text-green-400 text-xl">Carry = A · B</p>
                    </div>

                </div>
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
                                <th className="py-2 px-4 text-purple-300">Sum</th>
                                <th className="py-2 px-4 text-purple-300">Carry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {truthTable.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-700">
                                    <td className="py-2 px-4">{row.A}</td>
                                    <td className="py-2 px-4">{row.B}</td>
                                    <td className="py-2 px-4 font-bold text-green-400">{row.Sum}</td>
                                    <td className="py-2 px-4 font-bold text-yellow-400">{row.Carry}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-gray-300 mt-4 text-center">
                    Sum is 1 when inputs differ (XOR). Carry is 1 only when both inputs are 1 (AND).
                </p>
            </section>

            {/* Real-World Example */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
                <p className="text-gray-300 mb-3">
                    Half adders are the foundation of all arithmetic in computers.
                    Imagine Swadeep and Tuhina each have one binary digit (0 or 1).
                    When they add their digits, the half adder computes the result:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                    <li>If both have 0, Sum=0, Carry=0.</li>
                    <li>If one has 1, Sum=1, Carry=0 (like 1+0=1).</li>
                    <li>If both have 1, Sum=0, Carry=1 (binary 1+1=10).</li>
                </ul>
                <p className="text-gray-300 mt-3">
                    In a calculator, multiple half adders combine to add multi-bit numbers (though full adders are more common for multi-bit).
                </p>
            </section>

            {/* Hints Section */}
            <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                    💡 Think About...
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>What happens if you connect two half adders together? (You get a full adder – next topic!)</li>
                    <li>Observe carefully: The Sum output is exactly the XOR of A and B. Why is that?</li>
                    <li>Try changing the inputs: 1+1 produces a carry – where does that carry go in a multi-bit addition?</li>
                    <li>Why can't a half adder handle a carry input from a previous stage?</li>
                </ul>
            </section>

            {/* Common Pitfalls */}
            <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li><strong>Confusing Sum and Carry:</strong> Sum is XOR, Carry is AND – not interchangeable.</li>
                    <li><strong>Forgetting that half adder has no carry input:</strong> It only adds two bits, not three.</li>
                    <li><strong>Using OR for Sum:</strong> OR gives 1 for 1+1, but binary sum should be 0 with carry 1.</li>
                    <li><strong>Misinterpreting binary addition:</strong> 1+1 = 10 (carry 1, sum 0), not 2 in decimal.</li>
                    <li><strong>Drawing incorrect circuit:</strong> Ensure XOR and AND gates are correctly connected.</li>
                </ul>
            </section>

            {/* Best Practices */}
            <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>Always start with the truth table – it defines the circuit behavior.</li>
                    <li>Label inputs and outputs clearly on schematics.</li>
                    <li>Test the half adder with all four input combinations in simulation.</li>
                    <li>Use XOR and AND ICs (7486 and 7408) for discrete implementations.</li>
                    <li>Document the Boolean expressions alongside the circuit.</li>
                </ul>
            </section>

            {/* Tips & Tricks */}
            <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li><strong>Half adder as a building block:</strong> Use it to understand full adders and ALUs.</li>
                    <li><strong>Optimization:</strong> Sometimes you can share gates if combining with other circuits.</li>
                    <li><strong>In VHDL/Verilog:</strong> Half adder can be described with concurrent statements: <span className="font-mono">Sum &lt;= A xor B; Carry &lt;= A and B;</span></li>
                    <li><strong>Debugging:</strong> If sum is wrong, check XOR gate; if carry is wrong, check AND gate.</li>
                    <li><strong>Remember:</strong> Half adder is the simplest arithmetic circuit – master it before moving on.</li>
                </ul>
            </section>

            {/* Mini Checklist */}
            <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    <li>I can draw the truth table for a half adder.</li>
                    <li>I can write the Boolean expressions (Sum = A⊕B, Carry = A·B).</li>
                    <li>I can draw the circuit using XOR and AND gates.</li>
                    <li>I understand why half adder cannot accept a carry input.</li>
                    <li>I can use a half adder as a component in larger adders.</li>
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
                    “The half adder is where arithmetic meets logic. I always ask my students in Barrackpore: 'If Abhronila and Debangshu each have a coin (1) or not (0), how do we calculate the total?' This simple story makes the truth table intuitive. Emphasize that Sum is XOR because it's 1 when they differ, and Carry is AND because it's 1 only when both have a coin. Once they grasp this, full adders become a natural extension. Practice with paper circuits and let them build with gates – it's a small step into the world of computing.”
                </p>
            </section>
        </div>
    );
};

export default Topic3;