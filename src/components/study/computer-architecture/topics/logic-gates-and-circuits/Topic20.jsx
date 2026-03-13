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

const Topic20 = () => {
  // Truth table for a simple 4:2 encoder
  const encoderTruthTable = [
    { I3: 0, I2: 0, I1: 0, I0: 1, A1: 0, A0: 0 },
    { I3: 0, I2: 0, I1: 1, I0: 0, A1: 0, A0: 1 },
    { I3: 0, I2: 1, I1: 0, I0: 0, A1: 1, A0: 0 },
    { I3: 1, I2: 0, I1: 0, I0: 0, A1: 1, A0: 1 },
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen p-6 font-sans leading-relaxed">
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">Encoders</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          An encoder converts multiple input lines into a binary code – the inverse operation of a decoder.
        </p>
      </header>

      {/* Specifications */}
      <section className="mb-12 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">What is an Encoder?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Definition:</span> A combinational circuit that converts active input signals (usually one at a time) into a coded output (e.g., binary, BCD).</p>
            <p className="text-lg"><span className="font-mono text-purple-300">Prototype:</span> encoder(2ⁿ inputs) → n outputs</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-mono text-purple-300">Purpose:</span> Reduce the number of lines needed to represent information; data compression.</p>
            <p className="text-lg"><span className="font-mono text-purple-300">When used:</span> In keyboard encoding, priority interrupt systems, data transmission, and analog-to-digital conversion.</p>
          </div>
        </div>
      </section>

      {/* 4:2 Encoder */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔌 4:2 Encoder</h2>
        <p className="text-gray-300 mb-4">
          A 4:2 encoder has 4 input lines (I0–I3) and 2 output lines (A1, A0). At any time, exactly one input should be active (1); the outputs produce the binary code of the active input.
        </p>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl group">
            <svg viewBox="0 0 450 250" className="w-full h-auto text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Encoder block */}
              <rect x="150" y="50" width="120" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="210" y="110" fill="currentColor" fontSize="18" textAnchor="middle">ENCODER</text>
              <text x="210" y="135" fill="currentColor" fontSize="14" textAnchor="middle">4:2</text>

              {/* Inputs */}
              <line x1="50" y1="70" x2="150" y2="70" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="75" fill="currentColor" fontSize="12">I0</text>
              <line x1="50" y1="100" x2="150" y2="100" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="105" fill="currentColor" fontSize="12">I1</text>
              <line x1="50" y1="130" x2="150" y2="130" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="135" fill="currentColor" fontSize="12">I2</text>
              <line x1="50" y1="160" x2="150" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="30" y="165" fill="currentColor" fontSize="12">I3</text>

              {/* Outputs */}
              <line x1="270" y1="85" x2="320" y2="85" stroke="currentColor" strokeWidth="2" />
              <text x="330" y="90" fill="currentColor" fontSize="14" fontWeight="bold">A0</text>
              <line x1="270" y1="135" x2="320" y2="135" stroke="currentColor" strokeWidth="2" />
              <text x="330" y="140" fill="currentColor" fontSize="14" fontWeight="bold">A1</text>
            </svg>
          </div>
          <p className="text-gray-300 mt-4">Block diagram of a 4:2 encoder.</p>
        </div>
      </section>

      {/* Truth Table */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📊 Truth Table (4:2 Encoder)</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl mx-auto text-center border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-2 text-purple-300">I3</th><th className="py-2 px-2 text-purple-300">I2</th><th className="py-2 px-2 text-purple-300">I1</th><th className="py-2 px-2 text-purple-300">I0</th>
                <th className="py-2 px-2 text-purple-300">A1</th><th className="py-2 px-2 text-purple-300">A0</th>
              </tr>
            </thead>
            <tbody>
              {encoderTruthTable.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-1 px-2">{row.I3}</td><td className="py-1 px-2">{row.I2}</td><td className="py-1 px-2">{row.I1}</td><td className="py-1 px-2">{row.I0}</td>
                  <td className="py-1 px-2 font-bold text-green-400">{row.A1}</td><td className="py-1 px-2 font-bold text-green-400">{row.A0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          When an input is active (1), the outputs give its binary index. Only one input should be active at a time.
        </p>
      </section>

      {/* Boolean Expressions */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📐 Boolean Expressions</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="font-mono text-green-400 text-xl text-center">
            A1 = I2 + I3<br />
            A0 = I1 + I3
          </p>
          <p className="text-gray-300 mt-2 text-center">
            These are derived from the truth table: A1 is 1 when I2 or I3 is active; A0 is 1 when I1 or I3 is active.
          </p>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔧 Gate-Level Circuit</h2>
        <div className="flex justify-center">
          <div className="w-96 h-64 group">
            <svg viewBox="0 0 350 200" className="w-full h-full text-blue-400 transition-transform duration-300 group-hover:scale-105">
              {/* Inputs */}
              <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="45" fill="currentColor" fontSize="12">I0</text>
              <line x1="20" y1="80" x2="60" y2="80" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="85" fill="currentColor" fontSize="12">I1</text>
              <line x1="20" y1="120" x2="60" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="125" fill="currentColor" fontSize="12">I2</text>
              <line x1="20" y1="160" x2="60" y2="160" stroke="currentColor" strokeWidth="2" />
              <text x="5" y="165" fill="currentColor" fontSize="12">I3</text>

              {/* OR gates */}
              {/* OR for A1 (I2 + I3) */}
              <path d="M100 100 L130 100 L140 120 L130 140 L100 140 L100 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M90 100 L100 120 L90 140" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="115" y="125" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>
              <line x1="60" y1="120" x2="90" y2="120" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="160" x2="90" y2="160" stroke="currentColor" strokeWidth="2" />
              <line x1="90" y1="120" x2="90" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="90" y1="160" x2="90" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="2" />
              <line x1="140" y1="120" x2="180" y2="120" stroke="currentColor" strokeWidth="2" />
              <text x="190" y="125" fill="currentColor" fontSize="12">A1</text>

              {/* OR for A0 (I1 + I3) */}
              <path d="M200 40 L230 40 L240 60 L230 80 L200 80 L200 40" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M190 40 L200 60 L190 80" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="215" y="65" fill="currentColor" fontSize="10" textAnchor="middle">≥1</text>
              <line x1="60" y1="80" x2="190" y2="60" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="160" x2="190" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="240" y1="60" x2="280" y2="60" stroke="currentColor" strokeWidth="2" />
              <text x="290" y="65" fill="currentColor" fontSize="12">A0</text>
            </svg>
          </div>
        </div>
        <p className="text-gray-300 mt-4 text-center">
          A 4:2 encoder can be implemented with two OR gates. A1 = I2 + I3, A0 = I1 + I3.
        </p>
      </section>

      {/* Limitations: Priority Issue */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">⚠️ Limitation – Multiple Active Inputs</h2>
        <p className="text-gray-300 mb-4">
          A basic encoder assumes only one input is active at a time. If multiple inputs are active, the output is undefined (e.g., if I1 and I2 are both 1, then A1=1, A0=1, which is the code for I3, causing ambiguity).
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
          <p className="text-gray-200">
            <strong>Example:</strong> If I1=1 and I2=1 simultaneously, A1 = I2+I3 = 1, A0 = I1+I3 = 1 → output 11, which incorrectly indicates I3.
          </p>
          <p className="text-gray-300 mt-2">
            This is solved by <span className="text-yellow-400">priority encoders</span> (Topic 23), which assign priority to the highest-order input.
          </p>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Real-World Context</h2>
        <p className="text-gray-300 mb-3">
          Encoders are everywhere in digital systems:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Keyboard encoder:</strong> When Swadeep presses a key on a keyboard, an encoder converts that key press into an 8-bit scan code.</li>
          <li><strong>Interrupt controller:</strong> In a CPU, multiple devices can request service; a priority encoder selects the highest-priority request and encodes its ID.</li>
          <li><strong>Data compression:</strong> Encoders reduce the number of bits needed to represent data (e.g., 8-bit to 3-bit).</li>
          <li><strong>Analog-to-digital converters:</strong> Flash ADCs use encoders to convert thermometer code to binary.</li>
        </ul>
        <p className="text-gray-300 mt-3">
          In the Naihati lab, students use a 74HC148 priority encoder to demonstrate how a keypad press is converted to a binary code.
        </p>
      </section>

      {/* Hints Section */}
      <section className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          💡 Think About...
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>How is an encoder different from a decoder? (Decoder takes a code and activates one line; encoder takes an active line and produces a code.)</li>
          <li>Observe carefully: In a 4:2 encoder, why is I3 connected to both OR gates? (Because its binary code is 11.)</li>
          <li>Try deriving the Boolean expressions for an 8:3 encoder. (A0 = I1+I3+I5+I7, A1 = I2+I3+I6+I7, A2 = I4+I5+I6+I7.)</li>
          <li>What problem occurs if two keys are pressed simultaneously on a keyboard using a basic encoder? (Ambiguous output.)</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section className="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">🚨 Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Assuming multiple inputs can be active:</strong> Basic encoders require exactly one active input; otherwise output is invalid.</li>
          <li><strong>Confusing input order:</strong> I0 usually corresponds to binary 00, I3 to 11 – maintain consistent mapping.</li>
          <li><strong>Forgetting that I0 is active-high:</strong> If I0=1, outputs are 00; if I0=0 and all others 0, output is undefined (should be 00 or 00? Actually no input active case is often not covered).</li>
          <li><strong>Using OR gates for all outputs:</strong> Yes, but need to verify minterms.</li>
          <li><strong>Overlooking the need for a valid indicator:</strong> Many encoder ICs provide a "valid" output to indicate that at least one input is active.</li>
        </ul>
      </section>

      {/* Best Practices */}
      <section className="mt-8 p-6 bg-green-900/30 rounded-xl border border-green-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Always include a "valid" or "enable" output if multiple inputs may be inactive.</li>
          <li>Use priority encoders when multiple simultaneous inputs are possible.</li>
          <li>Label inputs clearly with their binary weights.</li>
          <li>Simulate the encoder with all possible input combinations, including all-zeros and multiple-ones.</li>
          <li>In VHDL/Verilog, use a 'case' or 'with/select' to describe encoder behavior; synthesis will optimize.</li>
        </ul>
      </section>

      {/* Tips & Tricks */}
      <section className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">🔧 Professional Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li><strong>Priority encoders:</strong> Use them in interrupt controllers – they output the highest-priority request along with a valid flag.</li>
          <li><strong>Expanding encoders:</strong> You can cascade encoder ICs (e.g., two 8:3 encoders to make a 16:4 encoder) using additional logic.</li>
          <li><strong>IC packages:</strong> Common TTL encoders: 74147 (10-line to 4-line priority encoder), 74148 (8-line to 3-line priority encoder).</li>
          <li><strong>Active-low inputs:</strong> Many encoder ICs have active-low inputs; adjust your design accordingly.</li>
          <li><strong>Glitch-free operation:</strong> Ensure inputs are debounced (especially from mechanical switches) to avoid erroneous codes.</li>
        </ul>
      </section>

      {/* Mini Checklist */}
      <section className="mt-8 p-6 bg-yellow-900/30 rounded-xl border border-yellow-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📋 Mini Checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>I understand the basic encoder function: active input → binary code.</li>
          <li>I can write the truth table for a 4:2 encoder.</li>
          <li>I can derive Boolean expressions: A1 = I2+I3, A0 = I1+I3.</li>
          <li>I know the limitation of basic encoders (multiple inputs cause ambiguity).</li>
          <li>I can identify real-world applications like keyboard encoding.</li>
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
          “Encoders often confuse students because they seem like the opposite of decoders. I remind them of a simple example: in a classroom, if Abhronila raises her hand (input I1) and Debangshu raises his (I2), who does the teacher call on? A basic encoder would be confused – that's why we need priority. In our Barrackpore lab, we first build a simple 4:2 encoder with OR gates, then demonstrate its failure with multiple switches. Then we introduce the 74148 priority encoder and see how it resolves conflicts. This hands-on progression solidifies the concept and leads naturally to the next topics.”
        </p>
      </section>
    </div>
  );
};

export default Topic20;