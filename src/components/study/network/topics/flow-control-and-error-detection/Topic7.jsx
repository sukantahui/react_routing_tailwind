// File: src/components/topics/Topic7.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic7_files/topic7_questions';

/**
 * Topic7: Checksum – Detailed Explanation with Interactive Calculator
 *
 * @component
 * @returns {JSX.Element} A complete learning module for checksums.
 *
 * @purpose To teach checksums from basics to implementation, with hands‑on practice.
 *
 * @when_to_use After covering parity and CRC, to illustrate the most common error‑detection
 *              method used in transport‑layer protocols.
 *
 * @why_important Checksums are the backbone of error detection in IP, TCP, and UDP.
 *                Understanding them is essential for networking professionals.
 */
export default function Topic7() {
  // --- Interactive Calculator State ---
  const [inputMode, setInputMode] = useState('text');
  const [inputData, setInputData] = useState('Hello');
  const [checksumType, setChecksumType] = useState('internet');
  const [computedChecksum, setComputedChecksum] = useState(null);
  const [checksumHex, setChecksumHex] = useState('');
  const [receivedData, setReceivedData] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [byteDisplay, setByteDisplay] = useState([]);

  // --- Core Checksum Algorithms ---

  // Convert input to bytes based on mode
  const inputToBytes = (str) => {
    if (inputMode === 'text') {
      return new TextEncoder().encode(str);
    } else {
      // binary: only 0/1 and spaces allowed
      const cleaned = str.replace(/\s/g, '');
      if (!/^[01]+$/.test(cleaned)) {
        throw new Error('Binary input must contain only 0 and 1 (spaces are ignored).');
      }
      const padded = cleaned.padEnd(Math.ceil(cleaned.length / 8) * 8, '0');
      const bytes = new Uint8Array(padded.length / 8);
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(padded.substr(i * 8, 8), 2);
      }
      return bytes;
    }
  };

  // Convert bytes to 16‑bit big‑endian words
  const bytesToWords = (bytes) => {
    const words = [];
    for (let i = 0; i < bytes.length; i += 2) {
      let w = bytes[i] << 8;
      if (i + 1 < bytes.length) w |= bytes[i + 1];
      words.push(w);
    }
    return words;
  };

  // Internet checksum (ones' complement sum) – the main algorithm
  const computeInternetChecksum = (bytes) => {
    const words = bytesToWords(bytes);
    let sum = 0;
    for (let w of words) {
      sum += w;
      // End‑around carry (fold carry)
      if (sum &gt; 0xFFFF) sum = (sum & 0xFFFF) + 1;
    }
    // 1's complement
    return (~sum) & 0xFFFF;
  };

  // Simple sum (no complement, no carry fold)
  const computeSimpleChecksum = (bytes) => {
    let sum = 0;
    for (let b of bytes) sum += b;
    return sum & 0xFFFF;
  };

  // Fletcher‑16
  const computeFletcher16 = (bytes) => {
    let sum1 = 0, sum2 = 0;
    for (let b of bytes) {
      sum1 = (sum1 + b) % 255;
      sum2 = (sum2 + sum1) % 255;
    }
    return (sum2 << 8) | sum1;
  };

  // --- Handlers ---

  const computeChecksum = () => {
    if (inputData.trim() === '') {
      alert('Please enter some data.');
      return;
    }
    let bytes;
    try {
      bytes = inputToBytes(inputData);
    } catch (e) {
      alert(e.message);
      return;
    }
    setByteDisplay(bytesToWords(bytes));

    let result;
    switch (checksumType) {
      case 'internet': result = computeInternetChecksum(bytes); break;
      case 'simple': result = computeSimpleChecksum(bytes); break;
      case 'fletcher': result = computeFletcher16(bytes); break;
      default: result = 0;
    }
    setComputedChecksum(result);
    setChecksumHex('0x' + result.toString(16).padStart(4, '0').toUpperCase());
    setVerifyResult(null);
  };

  const verifyChecksum = () => {
    if (receivedData.trim() === '' || computedChecksum === null) {
      alert('Please compute a checksum first and then enter received data.');
      return;
    }
    let bytes;
    try {
      bytes = inputToBytes(receivedData);
    } catch (e) {
      alert(e.message);
      return;
    }
    let receivedChecksum;
    switch (checksumType) {
      case 'internet': receivedChecksum = computeInternetChecksum(bytes); break;
      case 'simple': receivedChecksum = computeSimpleChecksum(bytes); break;
      case 'fletcher': receivedChecksum = computeFletcher16(bytes); break;
      default: receivedChecksum = 0;
    }
    setVerifyResult(receivedChecksum === computedChecksum ? 'valid' : 'invalid');
  };

  const reset = () => {
    setInputData('Hello');
    setInputMode('text');
    setChecksumType('internet');
    setComputedChecksum(null);
    setChecksumHex('');
    setReceivedData('');
    setVerifyResult(null);
    setByteDisplay([]);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (inputMode === 'binary') {
      const cleaned = val.replace(/\s/g, '');
      if (cleaned === '' || /^[01]*$/.test(cleaned)) {
        setInputData(val);
      }
    } else {
      setInputData(val);
    }
  };

  const examples = {
    text: [
      { label: 'Hello', data: 'Hello' },
      { label: '12345', data: '12345' },
      { label: 'ABCD', data: 'ABCD' },
      { label: 'The quick brown fox', data: 'The quick brown fox' },
    ],
    binary: [
      { label: '0xAA', data: '10101010' },
      { label: '0xFF00', data: '1111111100000000' },
      { label: '0xDEAD', data: '1101111010101101' },
      { label: '0x12345678', data: '00010010001101000101011001111000' },
    ]
  };

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* ======= HERO ======= */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Checksum – Error Detection
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            The simple yet powerful way to verify data integrity.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            A <strong className="font-semibold text-blue-600">checksum</strong> is a value calculated from the data before transmission.
            It is sent along with the data. The receiver performs the same calculation and if the result matches, the data is considered error‑free.
            Unlike a parity bit (1 bit), a checksum uses an entire block (e.g., 16 bits) and is widely used in IP, TCP, and UDP.
          </p>
        </section>

        {/* ======= STEP‑BY‑STEP THEORY (User’s content) ======= */}
        <section className="space-y-8 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">🧠 How Checksum Works – Step by Step</h2>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">

              {/* Real‑life analogy */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="font-semibold">Real‑Life Analogy</p>
                <p>Imagine you buy three items: ₹10, ₹12, and ₹9. Total = ₹31. The cashier writes the bill. When you reach home, you add again: 10+12+9 = 31. If you get 31, everything is correct. If you get 29 or 34, you know something is wrong. A checksum works the same way, but with binary numbers and 1's complement arithmetic.</p>
              </div>

              {/* Example data blocks */}
              <div>
                <p className="font-semibold">Example Data Blocks (4‑bit each)</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                  1010
                  1100
                  1001
                </pre>
                <p className="mt-1 text-sm">Each block is 4 bits. All calculations must stay within 4 bits.</p>
              </div>

              {/* Step 1: Add first two */}
              <div>
                <p className="font-semibold">Step 1 — Add the first two blocks</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                  1010
                + 1100
                ------
                  10110
                </pre>
                <p className="text-sm">The sum has 5 bits, but our block size is only 4 bits. We cannot keep 5 bits.</p>
              </div>

              {/* Wrap carry */}
              <div>
                <p className="font-semibold">Why Wrap the Carry?</p>
                <p>This is the special rule used by checksums. Whenever an extra carry comes out of the left side, you wrap it around and add it back to the least significant bit (rightmost bit).</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                  10110
                  Carry = 1
                  Remaining bits = 0110
                  Now add carry:
                  0110
                + 0001
                ------
                  0111
                </pre>
                <p className="text-sm">New result = <strong>0111</strong>.</p>
                <p className="mt-2 text-sm">This special addition is called <strong>1's complement addition</strong>.</p>
              </div>

              {/* Step 2: Add third block */}
              <div>
                <p className="font-semibold">Step 2 — Add the third block</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                  0111
                + 1001
                ------
                  10000
                </pre>
                <p className="text-sm">Again we have 5 bits. Carry = 1, remaining = 0000. Wrap around:</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                  0000
                + 0001
                ------
                  0001
                </pre>
                <p className="text-sm">So the answer becomes <strong>0001</strong>.</p>
              </div>

              {/* Step 3: Complement */}
              <div>
                <p className="font-semibold">Step 3 — Take the Complement</p>
                <p>Current sum = 0001. Now invert every bit (0→1, 1→0).</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                  0001 → 1110
                </pre>
                <p className="text-sm">Result <strong>1110</strong> is the checksum.</p>
              </div>

              {/* What is sent */}
              <div>
                <p className="font-semibold">What Is Sent?</p>
                <p>The sender sends the original data blocks <strong>plus</strong> the checksum:</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                  1010
                  1100
                  1001
                  1110   ← checksum
                </pre>
              </div>

              {/* Receiver side */}
              <div>
                <p className="font-semibold">Receiver Side</p>
                <p>The receiver adds everything (data + checksum).</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm whitespace-pre-wrap">
                  First addition:  1010 + 1100 = 10110 → wrap → 0111
                  Add third:       0111 + 1001 = 10000 → wrap → 0001
                  Add checksum:    0001 + 1110 = 1111 (no carry)
                  Final answer = 1111 (all ones)
                </pre>
                <p className="mt-2">If the final result is <strong>1111</strong> (all 1s), the data is correct.</p>
                <p className="text-sm text-red-600 dark:text-red-400">If an error occurs, the result will not be all ones → error detected.</p>
              </div>

              {/* Visual flow */}
              <div>
                <p className="font-semibold">Visual Flow</p>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded font-mono text-sm whitespace-pre border border-gray-200 dark:border-gray-600">
{`            Sender
               │
               ▼
      +------------------+
      | Add all blocks   |
      +------------------+
               │
               ▼
      Wrap Carry (if any)
               │
               ▼
     Take 1's Complement
               │
               ▼
      Checksum Generated
               │
               ▼
 Send Data + Checksum
               │
═══════════════════════════════════
          Transmission
═══════════════════════════════════
               │
               ▼
            Receiver
               │
               ▼
 Add All Data + Checksum
               │
               ▼
 Result = 1111 ?
      │
 ┌────┴────┐
 │         │
Yes       No
 │         │
 ▼         ▼
No Error  Error`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======= INTERACTIVE CALCULATOR ======= */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">🧮 Interactive Checksum Calculator</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left panel */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Input Mode</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setInputMode('text'); setInputData('Hello'); setComputedChecksum(null); setVerifyResult(null); }}
                      className={clsx(
                        'px-4 py-2 rounded-md transition-colors',
                        inputMode === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      )}
                    &gt;
                      Text
                    </button>
                    <button
                      onClick={() => { setInputMode('binary'); setInputData('10101010'); setComputedChecksum(null); setVerifyResult(null); }}
                      className={clsx(
                        'px-4 py-2 rounded-md transition-colors',
                        inputMode === 'binary' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      )}
                    &gt;
                      Binary
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {inputMode === 'text' ? 'Data (text)' : 'Data (binary, spaces allowed)'}
                  </label>
                  <input
                    type="text"
                    value={inputData}
                    onChange={handleInputChange}
                    placeholder={inputMode === 'text' ? 'Enter text...' : 'e.g., 10101010 11110000'}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Checksum Type</label>
                  <select
                    value={checksumType}
                    onChange={(e) => { setChecksumType(e.target.value); setComputedChecksum(null); setVerifyResult(null); }}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                  &gt;
                    <option value="internet">Internet (16‑bit ones' complement)</option>
                    <option value="simple">Simple Sum (16‑bit)</option>
                    <option value="fletcher">Fletcher‑16</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={computeChecksum}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                  >
                    Compute Checksum
                  </button>
                  <button
                    onClick={reset}
                    className="flex-1 py-2 px-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-md transition-colors duration-200"
                  >
                    Reset
                  </button>
                </div>

                <div>
                  <p className="text-sm font-medium">Quick Examples ({inputMode}):</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {examples[inputMode].map(ex => (
                      <button
                        key={ex.label}
                        onClick={() => setInputData(ex.data)}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
                      &gt;
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Computed Checksum</label>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-center font-mono text-2xl min-h-[3rem] flex items-center justify-center">
                    {computedChecksum !== null ? (
                      <span className="inline-block px-4 py-1 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200">
                        {checksumHex}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Press "Compute"</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Received Data (for verification)</label>
                  <input
                    type="text"
                    value={receivedData}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (inputMode === 'binary') {
                        const cleaned = val.replace(/\s/g, '');
                        if (cleaned === '' || /^[01]*$/.test(cleaned)) {
                          setReceivedData(val);
                        }
                      } else {
                        setReceivedData(val);
                      }
                    }}
                    placeholder={inputMode === 'text' ? 'Enter received text...' : 'e.g., 10101011 11110001'}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  /&gt;
                </div>
                <button
                  onClick={verifyChecksum}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
                >
                  Verify Received Data
                </button>
                {verifyResult && (
                  <div className={clsx(
                    'p-3 rounded-md text-center font-semibold transition-all duration-300',
                    verifyResult === 'valid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                  )}>
                    {verifyResult === 'valid' ? '✅ Checksum matches – data is likely intact.' : '❌ Checksum mismatch – data corruption detected!'}
                  </div>
                )}
              </div>
            </div>

            {/* Word visualisation */}
            {byteDisplay.length &gt; 0 && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm font-medium mb-2">16‑bit words (hex):</p>
                <div className="flex flex-wrap gap-2">
                  {byteDisplay.map((w, idx) => (
                    <span key={idx} className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-mono text-sm">
                      0x{w.toString(16).padStart(4, '0').toUpperCase()}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  For the Internet checksum, these words are added with end‑around carry, then complemented.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ======= WORKED EXAMPLES (Text & Binary) ======= */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">📝 Worked Examples (Text & Binary)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">Data</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Internet Checksum</th>
                    <th className="p-2 text-left">Simple Sum</th>
                    <th className="p-2 text-left">Fletcher‑16</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { data: 'Hello', type: 'text', internet: 0x3E9C, simple: 0x01FA, fletcher: 0x6D7D },
                    { data: '12345', type: 'text', internet: 0x9B57, simple: 0x00CF, fletcher: 0x7B7E },
                    { data: 'ABCD', type: 'text', internet: 0x1F1A, simple: 0x0102, fletcher: 0x7A7B },
                    { data: '10101010', type: 'binary', internet: 0x5F5F, simple: 0x00AA, fletcher: 0xABAC },
                    { data: '1111111100000000', type: 'binary', internet: 0x01FF, simple: 0x00FF, fletcher: 0x01FF },
                    { data: '1101111010101101', type: 'binary', internet: 0x2121, simple: 0xDEAD, fletcher: 0x7B7C },
                  ].map((ex, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-2 font-mono">{ex.data}</td>
                      <td className="p-2">{ex.type}</td>
                      <td className="p-2 font-mono">0x{ex.internet.toString(16).padStart(4, '0').toUpperCase()}</td>
                      <td className="p-2 font-mono">0x{ex.simple.toString(16).padStart(4, '0').toUpperCase()}</td>
                      <td className="p-2 font-mono">0x{ex.fletcher.toString(16).padStart(4, '0').toUpperCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">For binary inputs, the bit string is grouped into 8‑bit bytes (LSB first, padded with zeros). The bytes are then converted to 16‑bit words (big‑endian).</p>
          </div>
        </section>

        {/* ======= REAL‑WORLD, PITFALLS, BEST PRACTICES ======= */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">Real‑World Applications</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>IP (Internet Protocol):</strong> Header checksum (16‑bit) over the header only.</li>
              <li><strong>TCP & UDP:</strong> 16‑bit checksum over pseudo‑header + segment.</li>
              <li><strong>ICMP:</strong> Checksum covers the entire message.</li>
              <li><strong>File integrity:</strong> Simple tools like `sum` and `cksum`.</li>
              <li><strong>Storage:</strong> Some storage protocols use checksums for data block integrity.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">Common Pitfalls</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Not zeroing the checksum field before computation.</strong></li>
              <li><strong>Mis‑ordering bytes (endianness).</strong></li>
              <li><strong>Using checksum for security (it's not cryptographic).</strong></li>
              <li><strong>Assuming checksum catches all errors – it doesn't.</strong></li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">Best Practices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Use the standard Internet checksum for network protocols.</strong></li>
              <li><strong>Enable hardware checksum offload when possible.</strong></li>
              <li><strong>For large data, consider a rolling checksum (like Adler‑32).</strong></li>
              <li><strong>Combine checksum with a strong hash if security is needed.</strong></li>
            </ul>
          </div>
        </section>

        {/* ======= PRO TIPS ======= */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards]">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 Pro Tips</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tool: `tcpdump -vv`</strong> shows checksum errors in captured packets.</li>
              <li><strong>Classroom demo:</strong> Have <strong>Swadeep</strong> provide a binary message, <strong>Tuhina</strong> computes checksum, then <strong>Debangshu</strong> flips one bit and recomputes – see the change.</li>
              <li><strong>In C, use `__builtin_bswap16`</strong> to handle endianness portably.</li>
            </ul>
          </div>
        </section>

        {/* ======= CHECKLIST ======= */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">✅ Checksum Checklist</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label><input type="checkbox" className="mr-2" /> I understand the purpose of checksums.</label>
              <label><input type="checkbox" className="mr-2" /> I can manually compute a checksum with end‑around carry.</label>
              <label><input type="checkbox" className="mr-2" /> I know the difference between Internet checksum and simple sum.</label>
              <label><input type="checkbox" className="mr-2" /> I understand the pseudo‑header in TCP/UDP.</label>
              <label><input type="checkbox" className="mr-2" /> I can use the interactive tool with both text and binary input.</label>
              <label><input type="checkbox" className="mr-2" /> I recognise the limitations of checksums.</label>
            </div>
          </div>
        </section>

        {/* ======= HINT SECTION ======= */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.4s_forwards]">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              - For the binary string "1111111111111111" (16 ones), what is the Internet checksum? Why?<br />
              - Try flipping one bit in your binary input and recompute – how does the checksum change?<br />
              - If you compute the checksum of data and then compute the checksum of (data + checksum), what result do you get (for Internet checksum)?<br />
              - Can you design two different binary messages that produce the same simple sum checksum?
            </p>
          </div>
        </section>

        {/* ======= FAQ ======= */}
        <FAQTemplate title="Checksum FAQs" questions={questions} />

        {/* ======= TEACHER'S NOTE ======= */}
        <Teacher note={"The step‑by‑step explanation with the 4‑bit example is invaluable for students. Walk them through the end‑around carry and complement – this is the 'aha!' moment. Let them use the interactive calculator to test their own examples, including binary. Emphasise that the final result being all ones is the golden rule for the Internet checksum. This deep understanding will serve them well when they later study TCP's checksum."} />

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