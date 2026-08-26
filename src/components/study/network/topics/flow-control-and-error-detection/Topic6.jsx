// File: src/components/topics/Topic6.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic6_files/topic6_questions';

/**
 * Topic6: Parity Bit Checking – Interactive Visualization
 *
 * @component
 * @returns {JSX.Element} An interactive component to explore parity bit generation and checking.
 *
 * @purpose To provide hands‑on experience with parity: computing parity bits, verifying received
 *          data, and understanding single‑bit error detection.
 *
 * @when_to_use After covering error detection (Topic2) and before moving to more advanced codes.
 *
 * @why_important Parity is the simplest error detection method; mastering it builds intuition
 *                for more complex codes (CRC, Hamming). Interactive exploration cements the concept.
 */
export default function Topic6() {
  // State for interactive parity checker
  const [dataBits, setDataBits] = useState('1011');
  const [parityType, setParityType] = useState('even'); // 'even' or 'odd'
  const [receivedBits, setReceivedBits] = useState('10110'); // includes parity bit
  const [computedParity, setComputedParity] = useState(null);
  const [checkResult, setCheckResult] = useState(null); // 'correct', 'error', or null

  // Compute parity for a given data string
  const computeParity = (data, type) => {
    const ones = (data.match(/1/g) || []).length;
    if (type === 'even') {
      return (ones % 2 === 0) ? '0' : '1';
    } else { // odd
      return (ones % 2 === 0) ? '1' : '0';
    }
  };

  // Handle data input change
  const handleDataChange = (e) => {
    const val = e.target.value;
    // Allow only 0 and 1
    if (/^[01]*$/.test(val) || val === '') {
      setDataBits(val);
      setComputedParity(null);
      setCheckResult(null);
    }
  };

  // Handle received bits change
  const handleReceivedChange = (e) => {
    const val = e.target.value;
    if (/^[01]*$/.test(val) || val === '') {
      setReceivedBits(val);
      setCheckResult(null);
    }
  };

  // Generate parity bit and update visual
  const generateParity = () => {
    if (dataBits.length === 0) {
      alert('Please enter some data bits.');
      return;
    }
    const p = computeParity(dataBits, parityType);
    setComputedParity(p);
    // Also set received bits to data + parity for checking
    setReceivedBits(dataBits + p);
    setCheckResult(null);
  };

  // Check the received bits for parity correctness
  const checkParity = () => {
    if (receivedBits.length < 2) {
      alert('Received bits must contain at least one data bit and one parity bit.');
      return;
    }
    // Extract data bits (all except last) and parity (last bit)
    const data = receivedBits.slice(0, -1);
    const parity = receivedBits.slice(-1);
    const expected = computeParity(data, parityType);
    if (parity === expected) {
      setCheckResult('correct');
    } else {
      setCheckResult('error');
    }
  };

  // Reset the interactive section
  const reset = () => {
    setDataBits('1011');
    setParityType('even');
    setReceivedBits('10110');
    setComputedParity(null);
    setCheckResult(null);
  };

  // Visualisation: bits with parity highlighted
  const renderBits = (bits, highlightIndex) => {
    if (!bits) return null;
    return bits.split('').map((bit, idx) => (
      <span
        key={idx}
        className={clsx(
          'inline-block w-8 h-8 leading-8 text-center font-mono text-sm rounded mx-0.5 transition-all duration-300',
          idx === highlightIndex
            ? 'bg-blue-500 text-white ring-2 ring-blue-300 scale-110'
            : idx === bits.length - 1
            ? 'bg-green-200 dark:bg-green-800 text-gray-800 dark:text-gray-200'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        )}
      >
        {bit}
      </span>
    ));
  };

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* Hero Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Parity Bit Checking
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            Hands‑on exploration of the simplest error detection method.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            A <strong className="font-semibold text-blue-600">parity bit</strong> is a single extra bit added to a block of data to make the total number of 1s either even (even parity) or odd (odd parity).
            This interactive tool lets you generate parity bits, verify received data, and see how a single bit flip is detected.
          </p>
        </section>

        {/* Conceptual Explanation */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">How Parity Works</h2>
            <p>
              Suppose <strong className="font-medium">Swadeep</strong> wants to send the 4‑bit message <code>1011</code> to <strong className="font-medium">Tuhina</strong>.
              They agree on <strong>even parity</strong>. Swadeep counts the number of 1s in the message: there are three (positions 1, 3, 4). Since 3 is odd, he adds a parity bit of <strong>1</strong> to make the total even (4 ones). The transmitted 5‑bit word is <code>10111</code>.
            </p>
            <p className="mt-2">
              Tuhina receives <code>10111</code> and counts the 1s: four → even → the word is accepted. If a single bit flips during transmission (e.g., <code>10101</code> – the last bit flipped from 1 to 0), the count becomes three (odd) → error detected.
            </p>
            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400">
              <p className="text-sm"><strong>⚠️ Limitation:</strong> Two bit flips (e.g., two 1s become 0s) keep the parity even → the error goes undetected.</p>
            </div>
          </div>
        </section>

        {/* Interactive Parity Checker */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">🧪 Interactive Parity Checker</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left column: data input and parity generation */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Data Bits (0/1 only)</label>
                  <input
                    type="text"
                    value={dataBits}
                    onChange={handleDataChange}
                    placeholder="e.g., 1011"
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Parity Type</label>
                  <select
                    value={parityType}
                    onChange={(e) => { setParityType(e.target.value); setComputedParity(null); setCheckResult(null); }}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="even">Even Parity</option>
                    <option value="odd">Odd Parity</option>
                  </select>
                </div>
                <button
                  onClick={generateParity}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                >
                  Generate Parity Bit
                </button>
                <button
                  onClick={reset}
                  className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-md transition-colors duration-200"
                >
                  Reset
                </button>
              </div>

              {/* Right column: display and check */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Computed Parity Bit</label>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-center font-mono text-2xl min-h-[3rem] flex items-center justify-center">
                    {computedParity !== null ? (
                      <span className={clsx(
                        'inline-block px-4 py-1 rounded-full',
                        computedParity === '0' ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' : 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                      )}>
                        {computedParity}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Press "Generate"</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Received Bits (data + parity)</label>
                  <input
                    type="text"
                    value={receivedBits}
                    onChange={handleReceivedChange}
                    placeholder="e.g., 10111"
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  />
                </div>
                <button
                  onClick={checkParity}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
                >
                  Check Received Bits
                </button>
                {checkResult && (
                  <div className={clsx(
                    'p-3 rounded-md text-center font-semibold transition-all duration-300',
                    checkResult === 'correct' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                  )}>
                    {checkResult === 'correct' ? '✅ Parity correct – no error detected.' : '❌ Parity error – a bit flip likely occurred!'}
                  </div>
                )}
              </div>
            </div>

            {/* Visualisation of bits */}
            {(dataBits || receivedBits) && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Bit Visualisation</p>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Data bits:</span>
                  {dataBits && renderBits(dataBits, -1)}
                  {computedParity !== null && (
                    <>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mx-2">+</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Parity:</span>
                      <span className="inline-block w-8 h-8 leading-8 text-center font-mono text-sm rounded bg-blue-500 text-white ring-2 ring-blue-300 scale-110">
                        {computedParity}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">→ Full word:</span>
                      {renderBits(dataBits + computedParity, dataBits.length)}
                    </>
                  )}
                </div>
                {receivedBits && (
                  <div className="mt-2 flex flex-wrap items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Received:</span>
                    {renderBits(receivedBits, -1)}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Real-world usage and pitfalls */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">Real‑World Applications of Parity</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Memory (RAM):</strong> Some older systems use parity RAM to detect errors; modern ECC uses more advanced codes, but parity is still used in some embedded systems.</li>
              <li><strong>Serial communication (RS‑232):</strong> Many UARTs support parity bits for basic error detection in asynchronous serial links.</li>
              <li><strong>Storage (RAID):</strong> RAID 3 and 4 use a single dedicated parity disk to recover from a single drive failure.</li>
              <li><strong>Barcodes:</strong> Some barcode formats (e.g., Code 128) include a checksum that is essentially a weighted parity check.</li>
              <li><strong>Educational tool:</strong> Parity is widely used to introduce error detection concepts.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">Common Pitfalls & Misconceptions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Assuming parity guarantees error detection:</strong> It only detects single‑bit errors (and some odd‑number errors). Even numbers of flips escape detection.</li>
              <li><strong>Confusing even and odd parity:</strong> Always ensure sender and receiver agree on the same type; otherwise, every frame will be flagged as erroneous.</li>
              <li><strong>Including the parity bit in the data count:</strong> When checking, the parity bit itself must not be counted as a data bit.</li>
              <li><strong>Using parity on a byte without considering bit order:</strong> For some serial protocols, the parity may be computed on the LSB-first or MSB‑first order; check the specification.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">Best Practices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Always specify parity type explicitly in protocol documentation</strong> to avoid mismatches.</li>
              <li><strong>Use parity only when error rate is low</strong> and single‑bit errors are the dominant failure mode.</li>
              <li><strong>Combine parity with other checks</strong> (e.g., CRC at frame level) for stronger protection.</li>
              <li><strong>In software, use bitwise XOR to compute parity efficiently</strong> – e.g., <code>parity = data.reduce((a,b) =&gt; a ^ b)</code>.</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards]">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 Pro Tips & Tricks</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tool: `parity` command on Linux</strong> – some systems have a utility to compute parity of a file.</li>
              <li><strong>Classroom demonstration:</strong> Have <strong>Susmita</strong> write a binary message on a card, compute parity, and pass it to <strong>Abhronila</strong> who flips one bit. Then <strong>Debangshu</strong> verifies and detects the error.</li>
              <li><strong>Memory efficiency:</strong> In C, you can compute parity using `__builtin_parity()` (GCC) for speed.</li>
              <li><strong>Debugging serial communication:</strong> If you see occasional framing errors, check the parity configuration on both ends.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">✅ Parity Checklist</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label><input type="checkbox" className="mr-2" /> I can explain the purpose of a parity bit.</label>
              <label><input type="checkbox" className="mr-2" /> I can compute even/odd parity for any binary string.</label>
              <label><input type="checkbox" className="mr-2" /> I understand that parity detects only odd numbers of bit errors.</label>
              <label><input type="checkbox" className="mr-2" /> I can use the interactive checker to test parity.</label>
              <label><input type="checkbox" className="mr-2" /> I know real‑world applications of parity (serial, memory, RAID).</label>
              <label><input type="checkbox" className="mr-2" /> I can differentiate between parity, CRC, and checksum.</label>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards]">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              - Try entering data bits that cause the computed parity bit to be '0' vs '1'. What patterns lead to each?<br />
              - Change a single bit in the received word and check the parity – see the error detection in action.<br />
              - What happens if you flip two bits? The parity check passes – why is that a problem?<br />
              - In RAID 4, a single parity disk can reconstruct a failed disk. How does that relate to parity bits?
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQTemplate title="Parity Bit Checking FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"The interactive parity checker is a powerful tool for in‑class demonstrations. Encourage students to experiment with different data patterns and deliberately introduce errors. Emphasise that parity is a building block for more advanced codes like Hamming. Use the visualisation to show how the parity bit is appended and how a flip changes the count. Remind them that parity is not secure against multiple errors, which is why CRC and other methods are used in practice."} />

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.4s_ease-out_forwards\\] { animation: none !important; opacity: 1 !important; transform: translateY(0) !important; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}