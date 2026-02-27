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

const Topic29 = () => {
  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Cascading Decoders</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Combining multiple decoder ICs to create larger decoders – a fundamental technique in digital system design.
        </p>
      </header>

      {/* Overview */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Why Cascade Decoders?</h2>
        <p className="text-gray-300 mb-4">
          Single decoder ICs are limited in the number of outputs (e.g., 3:8, 4:16). To decode more address lines (e.g., 5:32, 6:64), we cascade smaller decoders using their enable inputs. This allows us to expand the address space while using off‑the‑shelf components.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <p className="text-lg font-semibold text-blue-300">Key Concept</p>
            <p className="text-gray-200">
              The higher-order address bits select one decoder in the first stage; the lower-order bits are fed to all decoders, but only the selected one produces an output.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <p className="text-lg font-semibold text-blue-300">Common Example</p>
            <p className="text-gray-200">
              Two 3:8 decoders (74138) can form a 4:16 decoder; five 3:8 decoders with a 2:4 decoder can form a 5:32 decoder, and so on.
            </p>
          </div>
        </div>
      </section>

      {/* 4:16 from two 3:8 decoders (review) */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔁 4:16 Decoder using two 3:8 Decoders</h2>
        <p className="text-gray-300 mb-4">
          This is the classic cascading example. The most significant address bit (A3) selects which 3:8 decoder is enabled. The lower three bits (A2,A1,A0) are connected to both decoders.
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 500 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Decoder 1 (for A3=0) */}
              <rect x="50" y="50" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="110" y="100" fill="currentColor" fontSize="12" textAnchor="middle">3:8</text>
              <text x="110" y="120" fill="currentColor" fontSize="10" textAnchor="middle">(A3=0)</text>
              <line x1="20" y1="80" x2="50" y2="80" stroke="currentColor" strokeWidth="2" /><text x="5" y="85" fill="currentColor" fontSize="8">A0</text>
              <line x1="20" y1="110" x2="50" y2="110" stroke="currentColor" strokeWidth="2" /><text x="5" y="115" fill="currentColor" fontSize="8">A1</text>
              <line x1="20" y1="140" x2="50" y2="140" stroke="currentColor" strokeWidth="2" /><text x="5" y="145" fill="currentColor" fontSize="8">A2</text>
              {/* Enable from A3' */}
              <line x1="20" y1="180" x2="50" y2="180" stroke="currentColor" strokeWidth="2" /><text x="5" y="185" fill="currentColor" fontSize="8">A3</text>
              <circle cx="65" cy="180" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="70" y1="180" x2="90" y2="180" stroke="currentColor" strokeWidth="2" />
              <line x1="90" y1="180" x2="90" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <text x="100" y="170" fill="currentColor" fontSize="8">to enable</text>

              {/* Decoder 2 (for A3=1) */}
              <rect x="250" y="50" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="100" fill="currentColor" fontSize="12" textAnchor="middle">3:8</text>
              <text x="310" y="120" fill="currentColor" fontSize="10" textAnchor="middle">(A3=1)</text>
              <line x1="220" y1="80" x2="250" y2="80" stroke="currentColor" strokeWidth="2" /><text x="205" y="85" fill="currentColor" fontSize="8">A0</text>
              <line x1="220" y1="110" x2="250" y2="110" stroke="currentColor" strokeWidth="2" /><text x="205" y="115" fill="currentColor" fontSize="8">A1</text>
              <line x1="220" y1="140" x2="250" y2="140" stroke="currentColor" strokeWidth="2" /><text x="205" y="145" fill="currentColor" fontSize="8">A2</text>
              {/* Enable from A3 direct */}
              <line x1="20" y1="180" x2="280" y2="180" stroke="currentColor" strokeWidth="2" />
              <line x1="280" y1="180" x2="280" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <text x="290" y="170" fill="currentColor" fontSize="8">to enable</text>

              {/* Outputs */}
              <line x1="170" y1="70" x2="220" y2="70" stroke="currentColor" strokeWidth="2" /><text x="230" y="75" fill="currentColor" fontSize="8">Y0-7</text>
              <line x1="370" y1="70" x2="420" y2="70" stroke="currentColor" strokeWidth="2" /><text x="430" y="75" fill="currentColor" fontSize="8">Y8-15</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          Two 3:8 decoders, with the MSB (A3) enabling one at a time. The outputs form a continuous 4:16 decode.
        </p>
      </section>

      {/* 5:32 decoder using two 4:16 or 4:8+2:4 */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔁 5:32 Decoder using two 4:16 Decoders</h2>
        <p className="text-gray-300 mb-4">
          A 5:32 decoder can be built by cascading two 4:16 decoders. The most significant address bit (A4) selects which 4:16 is enabled.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Decoder A (A4=0) handles addresses 00000 – 01111.</li>
          <li>Decoder B (A4=1) handles addresses 10000 – 11111.</li>
          <li>The lower four bits (A3–A0) are connected to both decoders.</li>
        </ul>
        <p className="text-gray-300 mt-2">
          If dedicated 4:16 ICs are unavailable, you can build them first from 3:8s, creating a hierarchical tree.
        </p>
      </section>

      {/* General Tree Structure */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌳 General Tree Structure</h2>
        <p className="text-gray-300 mb-4">
          To build an N:2ⁿ decoder from smaller decoders, you can use a tree where each level uses one address bit to select a subtree.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200 font-mono">
            For an n-bit decoder using (n-k)-bit decoders in the final stage:
          </p>
          <ul className="list-disc list-inside text-gray-200 mt-2">
            <li>First stage: 2ᵏ decoders of size (n‑k):2ⁿ⁻ᵏ.</li>
            <li>The k highest-order bits feed a k:2ᵏ decoder that enables one of the 2ᵏ final‑stage decoders.</li>
            <li>The remaining n‑k bits go to all final‑stage decoders.</li>
          </ul>
        </div>
        <p className="text-gray-300 mt-3">
          This recursive structure scales efficiently and uses standard ICs.
        </p>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Example: 64KB Memory System</h2>
        <p className="text-gray-300 mb-3">
          Imagine a 64KB memory system using 8KB RAM chips (8 chips × 8KB = 64KB). To select one of eight chips, we need a 3:8 decoder. But suppose we want to expand to 256KB (32 chips of 8KB). We can cascade a 2:4 decoder to select one of four groups of eight chips.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Address lines A17–A15 go to a 2:4 decoder (if we have 4 groups).</li>
          <li>Each output of the 2:4 enables one 3:8 decoder.</li>
          <li>Address lines A14–A12 go to all 3:8 decoders.</li>
          <li>The remaining address lines (A11–A0) select the byte within the chip.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Barrackpore lab, students simulate this with multiple 74138s and watch how the chip‑enable signals activate the correct memory bank.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How would you build a 6:64 decoder using 3:8 decoders? (Use a 3:8 decoder in the first stage to enable eight 3:8 decoders.)</li>
          <li>Observe carefully: The number of ICs grows exponentially with the number of stages. Is there a more efficient way?</li>
          <li>Try designing a 5:32 decoder using only 2:4 and 3:8 decoders. How many of each?</li>
          <li>What happens if two decoders in the final stage are enabled simultaneously? (Address conflict – never allow that.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Multiple decoders enabled:</strong> Incorrect enable connections can cause two decoders to be active simultaneously, leading to bus contention.</li>
          <li><strong>Forgetting inverters:</strong> When using active‑low enables, you may need inverters to create the proper enable signals from address bits.</li>
          <li><strong>Overlooking fan-out:</strong> The lower address bits may need buffering if they drive many decoder inputs.</li>
          <li><strong>Misplacing the MSB:</strong> The highest-order address bit should select the first stage; swapping bits maps addresses incorrectly.</li>
          <li><strong>Ignoring propagation delay:</strong> Cascaded decoders introduce additional delay; critical in high‑speed systems.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Draw a clear block diagram showing all interconnections and enable signals.</li>
          <li>Use buffers on shared address lines if the fan-out exceeds the IC's drive capability.</li>
          <li>Always ensure that only one final‑stage decoder is enabled at a time.</li>
          <li>Simulate the cascaded design to verify correct addressing and enable timing.</li>
          <li>Check datasheets for enable pin polarity (active‑high vs. active‑low) and use inverters accordingly.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Use the enables as part of the address:</strong> Many decoders have multiple enable pins that can be used as additional address bits without extra gates.</li>
          <li><strong>Minimize stages:</strong> Use the largest available decoder ICs to reduce the number of stages and overall delay.</li>
          <li><strong>Active‑low enables for wired‑OR:</strong> If you need to combine outputs from multiple decoders, active‑low enables can simplify the logic.</li>
          <li><strong>Power distribution:</strong> Decoders draw significant current when switching; place decoupling capacitors near each IC.</li>
          <li><strong>Test with boundary addresses:</strong> Verify that the decoder correctly handles the highest and lowest addresses in each range.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand that cascading expands the number of decoded outputs using multiple ICs.</li>
          <li>I can build a 4:16 decoder from two 3:8 decoders.</li>
          <li>I can design a 5:32 decoder using two 4:16 or a 2:4 plus four 3:8 decoders.</li>
          <li>I know how to use enable pins as additional address lines.</li>
          <li>I am aware of fan‑out and delay issues in cascaded designs.</li>
          <li>I can simulate and verify a cascaded decoder circuit.</li>
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
          “Cascading decoders is where students move from component‑level understanding to system‑level design. In my Shyamnagar lab, after building a 4:16 decoder from two 74138s, I challenge them to design a 5:32 for a hypothetical 32‑bank memory. They quickly realize that the same principle scales: a first‑stage decoder selects a bank, and second‑stage decoders select within the bank. I emphasize that this hierarchical thinking is exactly how modern memory systems work – from DDR controllers to cache tag RAMs. It's a powerful lesson in managing complexity through hierarchy.”
        </p>
      </section>
    </div>
  );
};

export default Topic29;
