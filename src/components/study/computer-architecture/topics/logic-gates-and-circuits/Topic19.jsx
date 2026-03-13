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

const Topic19 = () => {
  // Example truth table: 2-to-4 decoder (active high outputs)
  const decoderTruthTable = [
    { A: 0, B: 0, Y0: 1, Y1: 0, Y2: 0, Y3: 0 },
    { A: 0, B: 1, Y0: 0, Y1: 1, Y2: 0, Y3: 0 },
    { A: 1, B: 0, Y0: 0, Y1: 0, Y2: 1, Y3: 0 },
    { A: 1, B: 1, Y0: 0, Y1: 0, Y2: 0, Y3: 1 },
  ];

  // Truth table for 1:4 DEMUX with D=1 (same as decoder)
  const demuxAsDecoder = [
    { S1: 0, S0: 0, D: 1, Y0: 1, Y1: 0, Y2: 0, Y3: 0 },
    { S1: 0, S0: 1, D: 1, Y0: 0, Y1: 1, Y2: 0, Y3: 0 },
    { S1: 1, S0: 0, D: 1, Y0: 0, Y1: 0, Y2: 1, Y3: 0 },
    { S1: 1, S0: 1, D: 1, Y0: 0, Y1: 0, Y2: 0, Y3: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Using Demultiplexers as Decoders</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A demultiplexer with its data input permanently enabled (tied to logic 1) functions as a binary decoder.
        </p>
      </header>

      {/* Concept Overview */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Concept Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Decoder:</span> A circuit that activates one of 2ⁿ outputs based on an n-bit input code.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Demultiplexer:</span> Routes a single data input to one of 2ⁿ outputs based on select lines.</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Key insight:</span> If we set the data input (D) of a demultiplexer to logic 1, the selected output becomes 1, and all others 0 – exactly the function of a decoder.</p>
          </div>
        </div>
      </section>

      {/* 1:4 DEMUX as 2-to-4 Decoder */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 1:4 DEMUX as 2-to-4 Decoder</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 450 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* DEMUX block */}
              <polygon points="150,50 250,50 250,200 150,200 130,125" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="190" y="125" fill="currentColor" fontSize="18" textAnchor="middle">DEMUX</text>
              <text x="190" y="150" fill="currentColor" fontSize="14" textAnchor="middle">1:4</text>
              
              {/* Data input tied to VCC */}
              <line x1="80" y1="100" x2="130" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="50" y="105" fill="currentColor" fontSize="14" fontWeight="bold">VCC (1)</text>
              <circle cx="120" cy="100" r="3" fill="currentColor" />
              
              {/* Select lines (address inputs) */}
              <line x1="200" y1="200" x2="200" y2="230" stroke="currentColor" strokeWidth="2" />
              <text x="210" y="245" fill="currentColor" fontSize="12">S0 (A0)</text>
              <line x1="170" y1="200" x2="170" y2="230" stroke="currentColor" strokeWidth="2" />
              <text x="140" y="245" fill="currentColor" fontSize="12">S1 (A1)</text>

              {/* Outputs (decoded lines) */}
              <line x1="250" y1="70" x2="300" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="75" fill="currentColor" fontSize="12">Y0</text>
              <line x1="250" y1="120" x2="300" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="125" fill="currentColor" fontSize="12">Y1</text>
              <line x1="250" y1="160" x2="300" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="165" fill="currentColor" fontSize="12">Y2</text>
              <line x1="250" y1="200" x2="300" y2="200" stroke="currentColor" strokeWidth="2" />
              <text x="310" y="205" fill="currentColor" fontSize="12">Y3</text>

              {/* Annotation */}
              <text x="190" y="30" fill="currentColor" fontSize="12">With D=1, DEMUX becomes a decoder</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4 text-center">
            A 1:4 demultiplexer with data input tied to VCC (logic 1) functions exactly as a 2-to-4 line decoder. The select lines become the address inputs.
          </p>
        </div>
      </section>

      {/* Truth Table Comparison */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table Comparison</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">2-to-4 Decoder</h3>
            <table className="w-full text-center border-collapse text-sm">
              <thead><tr className="border-b border-gray-600"><th>A1</th><th>A0</th><th>Y0</th><th>Y1</th><th>Y2</th><th>Y3</th></tr></thead>
              <tbody>
                {decoderTruthTable.map((row, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td>{row.A}</td><td>{row.B}</td><td>{row.Y0}</td><td>{row.Y1}</td><td>{row.Y2}</td><td>{row.Y3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">1:4 DEMUX with D=1</h3>
            <table className="w-full text-center border-collapse text-sm">
              <thead><tr className="border-b border-gray-600"><th>S1</th><th>S0</th><th>Y0</th><th>Y1</th><th>Y2</th><th>Y3</th></tr></thead>
              <tbody>
                {demuxAsDecoder.map((row, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td>{row.S1}</td><td>{row.S0}</td><td>{row.Y0}</td><td>{row.Y1}</td><td>{row.Y2}</td><td>{row.Y3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          The truth tables are identical when D=1. Thus, any demultiplexer can serve as a decoder by enabling its data input permanently.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-lg text-center">
            For a 1:4 DEMUX with D=1:<br />
            Y0 = S1'·S0'·1 = S1'·S0'<br />
            Y1 = S1'·S0·1  = S1'·S0<br />
            Y2 = S1·S0'·1  = S1·S0'<br />
            Y3 = S1·S0·1   = S1·S0
          </p>
          <p className="text-gray-300 mt-2 text-center">
            These are exactly the minterms of the select lines – the standard decoder outputs.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Using demultiplexers as decoders is common in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Memory address decoding:</strong> A 3-to-8 decoder can be implemented with a 1:8 DEMUX (like 74138) by tying the data input high, selecting one of eight memory chips based on address lines.</li>
          <li><strong>Instruction decoding:</strong> In CPUs, decoders are used to activate specific control lines; they can be built from DEMUXes.</li>
          <li><strong>Seven-segment display drivers:</strong> Decoders select which digit to enable in a multiplexed display.</li>
          <li><strong>Data routing:</strong> If the data input is a clock or enable signal, the DEMUX acts as a gated decoder.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Shyamnagar lab, students use a 74139 (dual 1:4 DEMUX) with its data inputs tied to VCC to create a 2-to-4 decoder for a simple address decoding experiment.
        </p>
      </section>

      {/* Active-Low Outputs */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔻 Active-Low Outputs</h2>
        <p className="text-gray-300 mb-4">
          Many decoder ICs (like 74138) have active-low outputs. To use a demultiplexer as an active-low decoder, we can:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Invert the outputs:</strong> Add inverters after each DEMUX output.</li>
          <li><strong>Use the complement output:</strong> Some DEMUX ICs (like 74151) provide both true and complemented outputs; tie D=0 instead of 1 to get active-low.</li>
          <li><strong>Use the enable as data:</strong> Many decoders have active-low enables that can be used as data inputs.</li>
        </ul>
        <div className="bg-gray-900 p-3 rounded-lg border border-gray-600 mt-2">
          <p className="font-mono text-green-400">For active-low outputs: Y0 = (S1'·S0')', Y1 = (S1'·S0)', etc.</p>
        </div>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>If you tie the data input to GND (0), what does the demultiplexer output become? (All outputs 0 – not useful as a decoder.)</li>
          <li>Observe carefully: A decoder is just a special case of a demultiplexer where the data input is permanently enabled.</li>
          <li>Try using a 1:8 DEMUX as a 3-to-8 decoder. How would you connect it? (S2,S1,S0 as address, D=1.)</li>
          <li>What is the advantage of using a demultiplexer IC over a dedicated decoder IC? (Flexibility: you can also use it as a DEMUX when needed.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Forgetting to tie D to VCC:</strong> If D is left floating, the outputs may be unpredictable.</li>
          <li><strong>Confusing active-high vs active-low:</strong> Make sure the outputs match your system's requirements; you may need inverters.</li>
          <li><strong>Using the wrong DEMUX size:</strong> For an n-to-2ⁿ decoder, you need a 1:2ⁿ DEMUX.</li>
          <li><strong>Ignoring enable pins:</strong> Some DEMUX ICs have active-low enables; they must be properly set to enable the chip.</li>
          <li><strong>Assuming all DEMUXes have complementary outputs:</strong> Most simple DEMUXes do not; check the datasheet.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always pull unused data inputs to a known logic level (VCC or GND) through a resistor.</li>
          <li>Label the DEMUX's data input as "ENABLE" or "VCC" when using it as a decoder.</li>
          <li>Check the datasheet: some DEMUXes (like 74139) have an active-low enable that can serve as the data input for active-low outputs.</li>
          <li>Simulate the circuit to verify that the outputs match the expected decoder truth table.</li>
          <li>When driving loads, consider the output drive capability of the DEMUX.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Using enables:</strong> Many DEMUX ICs have multiple enable inputs that can be used as additional address bits, creating larger decoders.</li>
          <li><strong>Cascading:</strong> Two 1:8 DEMUXes with enables can form a 4-to-16 decoder – the enables act as the MSB address line.</li>
          <li><strong>Active-low outputs:</strong> If your system uses active-low enables for memory chips, use a DEMUX with D=0 (or use the complement output of a DEMUX like 74151).</li>
          <li><strong>Glitch-free operation:</strong> Ensure the select lines (address) are stable while the DEMUX is enabled to avoid output glitches.</li>
          <li><strong>In VHDL/Verilog:</strong> A decoder can be described with a 'case' statement; the synthesis tool may implement it as a demultiplexer if appropriate.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand that a demultiplexer with D=1 acts as a decoder.</li>
          <li>I can convert a 1:4 DEMUX into a 2-to-4 decoder by tying D to VCC.</li>
          <li>I know the difference between active-high and active-low outputs and how to achieve them.</li>
          <li>I can use DEMUX ICs (e.g., 74138, 74139) as decoders in practical circuits.</li>
          <li>I am aware of common pitfalls like floating data inputs.</li>
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
          “This topic beautifully ties together two seemingly different circuits. I challenge my students in Ichapur: 'If you only have a 74139 dual 1:4 demultiplexer in your lab, how would you build a 2-to-4 decoder?' They quickly realize that tying the data inputs to VCC does the trick. We then explore memory address decoding, where a 3-to-8 decoder selects one of eight memory chips. Understanding this duality is essential for efficient use of ICs and for designing larger systems. It also reinforces the concept that hardware is flexible – the same chip can serve multiple purposes with just a different connection.”
        </p>
      </section>
    </div>
  );
};

export default Topic19;