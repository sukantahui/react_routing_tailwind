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

const Topic33 = () => {
  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Carry Propagation and Generation</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Understanding how carry signals ripple through adders and how to accelerate addition using carry look‑ahead.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Carry propagation:</span> The process by which a carry generated at one stage ripples through subsequent stages in a multi‑bit adder.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Carry generation:</span> A stage produces a carry‑out regardless of the incoming carry (when both A and B are 1).</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Carry propagation:</span> A stage propagates the incoming carry to the output (when A or B is 1, but not both).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> To analyze and improve the speed of addition by reducing the delay caused by rippling carries.</p>
          </div>
        </div>
      </section>

      {/* Ripple‑Carry Adder Delay */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">⏱️ Ripple‑Carry Adder Delay</h2>
        <p className="text-gray-300 mb-4">
          In a ripple‑carry adder, the carry propagates through each full adder sequentially. If each full adder has a delay of t<sub>FA</sub>, an n‑bit adder has a worst‑case delay of n·t<sub>FA</sub>.
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 450 150" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* 4-bit ripple-carry chain */}
              <rect x="20" y="30" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="50" y="55" fill="currentColor" fontSize="10" textAnchor="middle">FA0</text>
              <rect x="100" y="30" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="130" y="55" fill="currentColor" fontSize="10" textAnchor="middle">FA1</text>
              <rect x="180" y="30" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="55" fill="currentColor" fontSize="10" textAnchor="middle">FA2</text>
              <rect x="260" y="30" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="55" fill="currentColor" fontSize="10" textAnchor="middle">FA3</text>

              {/* Carry chain */}
              <line x1="50" y1="70" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="80" x2="130" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="130" y1="80" x2="130" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="130" y1="80" x2="210" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="210" y1="80" x2="210" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="210" y1="80" x2="290" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="290" y1="80" x2="290" y2="70" stroke="currentColor" strokeWidth="2" />

              <text x="320" y="95" fill="currentColor" fontSize="12">Carry propagation path</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4">
          This delay becomes significant for large n (e.g., 32‑bit or 64‑bit adders). To speed up addition, we need to eliminate the ripple – this is where carry look‑ahead comes in.
        </p>
      </section>

      {/* Generate and Propagate Signals */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Generate (G) and Propagate (P) Signals</h2>
        <p className="text-gray-300 mb-4">
          For each bit position i, we define two signals based on the inputs Aᵢ and Bᵢ:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><span className="font-mono text-green-400">Gᵢ = Aᵢ · Bᵢ</span> (generate) – a carry is produced at this stage regardless of the incoming carry.</li>
          <li><span className="font-mono text-green-400">Pᵢ = Aᵢ ⊕ Bᵢ</span> (propagate) – the incoming carry is passed through this stage.</li>
        </ul>
        <p className="text-gray-300 mt-2">
          Then the carry‑out of stage i is: <span className="font-mono text-green-400">Cᵢ₊₁ = Gᵢ + Pᵢ·Cᵢ</span>.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 mt-4">
          <p className="text-gray-200">
            For a 4‑bit adder, we can expand:
          </p>
          <p className="font-mono text-green-400 text-sm">
            C₁ = G₀ + P₀·C₀<br />
            C₂ = G₁ + P₁·C₁ = G₁ + P₁·G₀ + P₁·P₀·C₀<br />
            C₃ = G₂ + P₂·C₂ = G₂ + P₂·G₁ + P₂·P₁·G₀ + P₂·P₁·P₀·C₀<br />
            C₄ = G₃ + P₃·C₃ = G₃ + P₃·G₂ + P₃·P₂·G₁ + P₃·P₂·P₁·G₀ + P₃·P₂·P₁·P₀·C₀
          </p>
        </div>
        <p className="text-gray-300 mt-4">
          These equations show that each carry can be computed directly from the inputs without waiting for the previous carry to ripple – this is the basis of carry look‑ahead.
        </p>
      </section>

      {/* Carry Look‑Ahead Concept */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">⚡ Carry Look‑Ahead (CLA) Concept</h2>
        <p className="text-gray-300 mb-4">
          A carry look‑ahead generator computes all carries in parallel using the G and P signals. This reduces the addition time to the delay of a few gate levels, independent of the word length.
        </p>
        <p className="text-gray-300">
          The sum bits are then computed as: <span className="font-mono text-green-400">Sᵢ = Pᵢ ⊕ Cᵢ</span>.
        </p>
        <div className="mt-4 bg-blue-900/30 p-3 rounded-lg border border-blue-700">
          <p className="text-blue-300 italic">
            💡 For a 4‑bit CLA, the carry signals are available after just 2 gate delays, compared to 4·t<sub>FA</sub> in a ripple‑carry adder.
          </p>
        </div>
      </section>

      {/* Real‑World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real‑World Context</h2>
        <p className="text-gray-300 mb-3">
          Carry look‑ahead is used in high‑performance arithmetic units:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Modern CPUs:</strong> ALUs use carry look‑ahead or related techniques (like Kogge‑Stone) for fast addition.</li>
          <li><strong>Digital signal processors:</strong> Require fast multiply‑accumulate operations, which rely on fast adders.</li>
          <li><strong>FPGA arithmetic:</strong> Many FPGAs have dedicated carry logic to implement fast addition.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Shyamnagar lab, students compare the speed of a 4‑bit ripple‑carry adder and a 4‑bit carry look‑ahead adder using LEDs to visualize the delay difference.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Why does the carry have to ripple in a simple adder? (Because each stage's carry‑in depends on the previous stage's carry‑out.)</li>
          <li>Observe the expanded carry equations: they become increasingly complex. How would you implement them for 64 bits? (Hierarchical look‑ahead, block carry look‑ahead.)</li>
          <li>Try writing the expression for C₃ in terms of G₂, G₁, G₀, P₂, P₁, P₀, and C₀.</li>
          <li>What happens to the delay if you use a 4‑bit CLA as a building block for larger adders? (The carries between blocks still ripple, but much faster.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Confusing generate and propagate:</strong> G = A·B, P = A⊕B. Using P = A+B is incorrect because it doesn't guarantee propagation.</li>
          <li><strong>Forgetting that P is used for both carry propagation and sum generation:</strong> Sum = P ⊕ Cᵢ.</li>
          <li><strong>Assuming carry look‑ahead eliminates all delay:</strong> It reduces delay but doesn't eliminate it; large adders still need hierarchical structures.</li>
          <li><strong>Incorrect expansion of carry equations:</strong> Missing a term or misplacing parentheses can cause logic errors.</li>
          <li><strong>Not considering fan‑in limitations:</strong> The AND‑OR gates for higher‑order carries have many inputs, which can be slow in practice.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Start by defining G and P for each bit – they are the foundation of any fast adder.</li>
          <li>For small adders (≤4 bits), a full look‑ahead implementation is practical. For larger adders, use a hierarchical (block) look‑ahead.</li>
          <li>Use standard CLA ICs like 74182 (carry look‑ahead generator) to build larger adders.</li>
          <li>Simulate your design to verify that carries are generated correctly and quickly.</li>
          <li>In HDL, synthesis tools often have built‑in fast adder implementations; use the '+' operator and let the tool optimize.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Hierarchical CLA:</strong> For a 16‑bit adder, use four 4‑bit CLAs and a second‑level look‑ahead to generate the carries between blocks.</li>
          <li><strong>Pipelining:</strong> If you need very high throughput, you can pipeline the addition, but this increases latency.</li>
          <li><strong>FPGA carry chains:</strong> Modern FPGAs have dedicated fast carry logic; use it by inferring adders correctly.</li>
          <li><strong>Power vs. speed:</strong> Full look‑ahead consumes more power due to complex gates; sometimes a slightly slower adder is acceptable for low‑power designs.</li>
          <li><strong>Test with worst‑case inputs:</strong> The worst‑case delay occurs when a carry propagates through all stages (e.g., adding 1 to 111...). Test your design with such vectors.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the difference between carry generation (G) and propagation (P).</li>
          <li>I can write the recursive carry equation Cᵢ₊₁ = Gᵢ + Pᵢ·Cᵢ.</li>
          <li>I can expand carry expressions to eliminate ripple delay.</li>
          <li>I know that carry look‑ahead reduces addition time from O(n) to O(log n) with proper hierarchy.</li>
          <li>I am aware of practical limitations (fan‑in, gate complexity) and how to address them.</li>
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
          “Carry propagation is where students first encounter the trade‑off between speed and complexity. In my Barrackpore lab, we build a 4‑bit ripple‑carry adder and measure its delay with a logic analyzer. Then we design a 4‑bit CLA and see the speed improvement – it's an eye‑opener. I challenge them to extend it to 16 bits using hierarchical look‑ahead. This topic is crucial for understanding high‑performance computing; every modern CPU uses these principles. I remind them that the same generate/propagate ideas appear in other contexts, like prefix sums and parallel algorithms.”
        </p>
      </section>
    </div>
  );
};

export default Topic33;