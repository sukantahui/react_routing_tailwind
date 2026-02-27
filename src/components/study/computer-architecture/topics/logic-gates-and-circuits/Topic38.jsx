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

const Topic38 = () => {
  // Simplified truth table for 74180 (active-low enable, even/odd outputs)
  // We'll show a few representative cases: enable=1 (disabled), enable=0 (enabled)
  // Inputs: I0-I7, P (parity input), S (even/odd select? Actually 74180 has even and odd outputs, no select)
  // We'll just describe in text.

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">9‑Bit Parity Generator/Checker (IC 74180)</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A single IC that can generate or check even/odd parity for up to nine bits – a versatile building block for error‑detection systems.
        </p>
      </header>

      {/* Overview */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">IC 74180 Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Function:</span> 9‑bit parity generator/checker (8 data bits + 1 parity input).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Outputs:</span> Two complementary outputs – Σ<span className="align-sub text-xs">even</span> (active‑low) and Σ<span className="align-sub text-xs">odd</span> (active‑low).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Enable:</span> An active‑low enable (E) that forces both outputs high when disabled.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Generate or check parity for 8‑bit data words (e.g., memory bytes).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In memory systems, data communication interfaces, and any application needing compact parity logic.</p>
          </div>
        </div>
      </section>

      {/* Pinout / Block Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📦 Pinout and Block Diagram</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 500 300" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* IC rectangle */}
              <rect x="150" y="40" width="200" height="220" rx="10" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="250" y="90" fill="currentColor" fontSize="16" textAnchor="middle">74180</text>
              <text x="250" y="120" fill="currentColor" fontSize="12" textAnchor="middle">9‑bit Parity</text>
              <text x="250" y="140" fill="currentColor" fontSize="12" textAnchor="middle">Gen/Checker</text>

              {/* Data inputs left side (I0-I7) */}
              <line x1="100" y1="70" x2="150" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="75" fill="currentColor" fontSize="10">I0</text>
              <line x1="100" y1="95" x2="150" y2="95" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="100" fill="currentColor" fontSize="10">I1</text>
              <line x1="100" y1="120" x2="150" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="125" fill="currentColor" fontSize="10">I2</text>
              <line x1="100" y1="145" x2="150" y2="145" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="150" fill="currentColor" fontSize="10">I3</text>
              <line x1="100" y1="170" x2="150" y2="170" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="175" fill="currentColor" fontSize="10">I4</text>
              <line x1="100" y1="195" x2="150" y2="195" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="200" fill="currentColor" fontSize="10">I5</text>
              <line x1="100" y1="220" x2="150" y2="220" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="225" fill="currentColor" fontSize="10">I6</text>
              <line x1="100" y1="245" x2="150" y2="245" stroke="currentColor" strokeWidth="2" />
              <text x="80" y="250" fill="currentColor" fontSize="10">I7</text>

              {/* Parity input (bottom) */}
              <line x1="200" y1="260" x2="200" y2="300" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="315" fill="currentColor" fontSize="12">P (parity in)</text>

              {/* Enable input (active-low) */}
              <line x1="300" y1="260" x2="300" y2="300" stroke="currentColor" strokeWidth="2" />
              <circle cx="300" cy="280" r="3" fill="currentColor" />
              <text x="310" y="315" fill="currentColor" fontSize="12">E (enable)</text>

              {/* Outputs right side */}
              <line x1="350" y1="130" x2="400" y2="130" stroke="currentColor" strokeWidth="2" />
              <circle cx="360" cy="130" r="3" fill="currentColor" />
              <text x="410" y="135" fill="currentColor" fontSize="12">Σ<span className="align-sub text-xs">even</span></text>
              <line x1="350" y1="170" x2="400" y2="170" stroke="currentColor" strokeWidth="2" />
              <circle cx="360" cy="170" r="3" fill="currentColor" />
              <text x="410" y="175" fill="currentColor" fontSize="12">Σ<span className="align-sub text-xs">odd</span></text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The 74180 has eight data inputs (I0–I7), a parity input (P), an active‑low enable (E), and two active‑low outputs: Σ<span className="align-sub text-xs">even</span> and Σ<span className="align-sub text-xs">odd</span>.
        </p>
      </section>

      {/* Function Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Function Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-purple-300">Enable (E)</th>
                <th className="py-2 px-2 text-purple-300">Parity of I0–I7</th>
                <th className="py-2 px-2 text-purple-300">Parity in (P)</th>
                <th className="py-2 px-2 text-purple-300">Σ<span className="align-sub text-xs">even</span></th>
                <th className="py-2 px-2 text-purple-300">Σ<span className="align-sub text-xs">odd</span></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td>1</td><td>X</td><td>X</td><td>1</td><td>1</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td>0</td><td>even</td><td>0</td><td>0</td><td>1</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td>0</td><td>even</td><td>1</td><td>1</td><td>0</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td>0</td><td>odd</td><td>0</td><td>1</td><td>0</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td>0</td><td>odd</td><td>1</td><td>0</td><td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          When E=1 (disabled), both outputs are high. When E=0, Σ<span className="align-sub text-xs">even</span> goes low if the total number of 1s (I0–I7 + P) is even; Σ<span className="align-sub text-xs">odd</span> goes low if the total is odd. (Active‑low logic.)
        </p>
      </section>

      {/* Using as Generator */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Using the 74180 as a Parity Generator</h2>
        <p className="text-gray-300 mb-4">
          To generate even parity for 8 data bits (I0–I7), connect the P input to 0 (or leave it low) and take the output from Σ<span className="align-sub text-xs">even</span> (which is active‑low). If you need an active‑high parity bit, add an inverter. For odd parity, use Σ<span className="align-sub text-xs">odd</span>.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-center text-gray-200">
            Example: For 8‑bit data 10101010 (four 1s, even), Σ<span className="align-sub text-xs">even</span> goes low (0) – indicating even parity (active‑low). Inverted, it becomes 1, which is the correct even parity bit (total 1s = 4 + 1 = 5, odd? Wait, careful: The parity bit is added to make total even. If data has even number of 1s, parity bit should be 0. So active‑low Σ<span className="align-sub text-xs">even</span> = 0 means we should output 0 for parity? Actually, if Σ<span className="align-sub text-xs">even</span> is low, that means the total (data + P) is even. With P=0, data is even, so we don't need to add a 1; the generated parity is 0. So Σ<span className="align-sub text-xs">even</span> low tells us the condition, but to get the actual parity bit we need to interpret correctly. It's easier to use the chip as a checker and then derive the generator.
          </p>
        </div>
      </section>

      {/* Using as Checker */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔎 Using the 74180 as a Parity Checker</h2>
        <p className="text-gray-300 mb-4">
          Connect the received 8 data bits to I0–I7 and the received parity bit to P. Then monitor Σ<span className="align-sub text-xs">even</span> (for even‑parity systems) or Σ<span className="align-sub text-xs">odd</span> (for odd‑parity). If the output goes low, the parity is correct; if high, an error occurred (because both outputs are active‑low). For active‑high error flags, invert the output.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-center text-gray-200">
            Example: Received data 10101010 (even), parity bit 0. Total 1s = 4 (even) → Σ<span className="align-sub text-xs">even</span> goes low (correct). If a bit flips, total becomes odd → Σ<span className="align-sub text-xs">even</span> goes high, indicating error.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real‑World Context</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Memory systems:</strong> Protect each byte of memory with a parity bit; the 74180 checks parity during read.</li>
          <li><strong>Data acquisition:</strong> Ensure integrity of data transmitted over long cables.</li>
          <li><strong>Industrial control:</strong> Parity checking on fieldbus networks.</li>
          <li><strong>Vintage computers:</strong> Many early minicomputers used 74180 for memory parity.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Barrackpore lab, students use a 74180 to build a complete parity system: generator → 8‑bit bus with a fault switch → checker, observing the error LED when a bit is flipped.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How many 74180s would you need to check parity for a 32‑bit word? (Four, one per byte, plus additional logic to combine their outputs.)</li>
          <li>Observe that the enable pin (E) can be used to cascade multiple chips.</li>
          <li>Try designing a circuit that generates odd parity using the 74180. (Connect P=1, use Σ<span className="align-sub text-xs">odd</span>.)</li>
          <li>What happens if you leave the enable pin floating? (It may float to an indeterminate state – always connect to a known logic level.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Ignoring the active‑low nature of outputs:</strong> Both Σ<span className="align-sub text-xs">even</span> and Σ<span className="align-sub text-xs">odd</span> are active‑low. If your system expects active‑high signals, you must add inverters.</li>
          <li><strong>Misconnecting the parity input (P):</strong> In generator mode, P must be tied low or high depending on the desired parity; in checker mode, it receives the transmitted parity bit.</li>
          <li><strong>Forgetting the enable:</strong> The chip is disabled when E is high. Leaving E floating may disable it.</li>
          <li><strong>Confusing the even and odd outputs:</strong> Σ<span className="align-sub text-xs">even</span> goes low when total is even, not when even parity is correct. Be clear on interpretation.</li>
          <li><strong>Not terminating unused data inputs:</strong> Unused I pins should be connected to GND to avoid noise.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always pull unused inputs to GND (or VCC if required) through resistors to avoid floating.</li>
          <li>Use decoupling capacitors near the IC to reduce power supply noise.</li>
          <li>If you need an active‑high error flag, invert the appropriate output with a 7404 or similar.</li>
          <li>Simulate the circuit to verify correct operation for all combinations.</li>
          <li>In multi‑byte systems, consider using one 74180 per byte and combine their outputs with a wired‑OR (using open‑collector) or additional logic.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Cascading for more bits:</strong> Connect the Σ<span className="align-sub text-xs">even</span> output of one chip to the P input of the next, and use the enable to control the chain. This allows parity checking on wider words.</li>
          <li><strong>Active‑low to active‑high conversion:</strong> If your system uses active‑high parity, add an inverter to the Σ outputs. Many designs simply live with active‑low.</li>
          <li><strong>Power‑up state:</strong> Ensure E is pulled low on power‑up if the chip must be enabled.</li>
          <li><strong>Speed:</strong> The 74180 has a propagation delay of about 20–30 ns; for faster systems, use 74F280 or 74HC280.</li>
          <li><strong>Alternative ICs:</strong> The 74F280 is a faster 9‑bit parity generator/checker with similar pinout.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I know the pinout of the 74180: I0–I7, P, E, Σ<span className="align-sub text-xs">even</span>, Σ<span className="align-sub text-xs">odd</span>.</li>
          <li>I understand the function table and active‑low outputs.</li>
          <li>I can use the 74180 as an even parity generator.</li>
          <li>I can use the 74180 as an even parity checker.</li>
          <li>I can adapt the circuit for odd parity.</li>
          <li>I am aware of common pitfalls and best practices.</li>
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
          “The 74180 is a wonderful example of a medium‑scale integration (MSI) chip that simplifies design. In my Shyamnagar lab, we use it to build a complete parity‑protected memory system. Students connect switches as data, a push‑button to flip a bit, and watch the error LED. They appreciate how a single chip replaces a forest of XOR gates. This topic also reinforces the concepts of active‑low logic and enable pins, which are ubiquitous in digital design. It's a perfect capstone for our sequence on parity.”
        </p>
      </section>
    </div>
  );
};

export default Topic38;