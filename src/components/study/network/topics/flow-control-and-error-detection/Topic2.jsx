// File: src/components/topics/Topic2.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic2_files/topic2_questions';

/**
 * Topic2: Error detection – Parity, CRC, Checksum
 * 
 * @component
 * @returns {JSX.Element} The component explaining error detection techniques at the Data Link Layer.
 * 
 * @purpose To provide a detailed understanding of how errors are detected in transmitted frames
 *          using parity bits, cyclic redundancy checks (CRC), and checksums.
 * 
 * @when_to_use After flow control, because error detection works alongside ACK/NAK and retransmission.
 * 
 * @why_important Physical media introduce bit errors (noise, interference). Error detection allows
 *                the receiver to identify corrupted frames and request retransmission, ensuring
 *                reliable data delivery.
 */
export default function Topic2() {
  // Helper data for error detection methods
  const methods = [
    {
      name: "Single Parity Bit",
      description: "Adds one extra bit to make the total number of 1's even (even parity) or odd (odd parity).",
      detects: "Detects single‑bit errors. Cannot detect even number of bit errors (e.g., two bits flipped).",
      overhead: "Very low (1 bit per character / frame).",
      usage: "Early serial links (RS‑232), memory (RAM ECC uses multi‑bit, but parity used in some contexts).",
      analogy: "Like a restaurant order: you count the total items ordered; if the number is odd but should be even, something is missing."
    },
    {
      name: "Two‑Dimensional Parity",
      description: "Arranges bits in a matrix; adds parity bits for each row and each column.",
      detects: "Can detect and correct single‑bit errors; can detect (but not correct) multiple errors if they align.",
      overhead: "Moderate (roughly 2×sqrt(n)).",
      usage: "Legacy storage systems, some early network protocols.",
      analogy: "A Sudoku grid: each row and column must sum correctly; a single wrong number is pinpointed by its row and column mismatch."
    },
    {
      name: "CRC (Cyclic Redundancy Check)",
      description: "Treats the frame as a binary polynomial and divides by a predetermined divisor; the remainder is the CRC code.",
      detects: "Detects all single‑bit errors, all double‑bit errors, any odd number of errors, and bursts of length ≤ r (where r is the CRC width).",
      overhead: "Low to moderate (typically 32 bits for Ethernet).",
      usage: "Ethernet, Wi‑Fi, disk drives (SATA), PNG, ZIP, and virtually all modern links.",
      analogy: "A very sophisticated checksum: like using a mathematical formula that is extremely sensitive to any alteration."
    },
    {
      name: "Checksum",
      description: "Sum of data words (often 16‑bit ones' complement sum), then complement is sent.",
      detects: "Detects many errors but less powerful than CRC; weak against certain patterns like swapping 16‑bit words.",
      overhead: "Low (16 bits per packet).",
      usage: "TCP, UDP, IP headers (Internet checksum).",
      analogy: "Adding all the numbers in a list and checking the total – a quick integrity check."
    }
  ];

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Error Detection: Parity, CRC, Checksum
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            Making sure the bits you sent are the bits that arrived.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Even on reliable media, electromagnetic interference, crosstalk, or hardware faults can flip bits. 
            The Data Link Layer must detect these errors so that corrupted frames can be discarded or retransmitted. 
            We explore three fundamental techniques: <strong className="font-semibold text-blue-600">Parity</strong> (simple, but weak), 
            <strong className="font-semibold text-blue-600"> CRC</strong> (powerful, used in Ethernet/Wi‑Fi), and 
            <strong className="font-semibold text-blue-600"> Checksum</strong> (used in IP/TCP/UDP).
          </p>
        </section>

        {/* Need for error detection */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Why Error Detection?</h2>
            <p className="mb-3">
              Suppose <strong className="font-medium">Swadeep</strong> in <strong className="font-medium">Barrackpore</strong> sends a file to <strong className="font-medium">Tuhina</strong> in <strong className="font-medium">Shyamnagar</strong>.
              A burst of electrical noise (e.g., from a motor starting) flips a single bit: a '0' becomes a '1' at exactly the wrong place.
              Without error detection, Tuhina's computer would accept the corrupted data as valid – potentially crashing an application or corrupting a database.
            </p>
            <p>
              Error detection adds <strong className="font-semibold">redundancy</strong>: a small amount of extra information (the error detection code) that allows the receiver to verify the integrity of the frame.
              If the check fails, the receiver discards the frame and may ask for retransmission (using ARQ, covered in flow control).
            </p>
            <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p className="text-sm font-mono">Frame = [Header | Payload | Error Detection Code (e.g., CRC)]</p>
            </div>
          </div>
        </section>

        {/* Parity (simple) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">1. Parity Bits (Single & 2D)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Even Parity Example (7 bits of data)</h3>
                <p className="text-sm mt-1">Data: <code className="bg-gray-100 dark:bg-gray-700 px-1">1011010</code> (four 1's)<br/>Parity bit: 0 (to keep even number of 1's)<br/>Transmitted: <code className="bg-gray-100 dark:bg-gray-700 px-1">1011010 0</code></p>
                <p className="text-sm mt-2">If a single bit flips → odd number of 1's → receiver detects error.</p>
                <p className="text-sm text-red-600 mt-1">Limitation: Two flips → even again → undetected.</p>
              </div>
              <div>
                <h3 className="font-semibold">Two‑Dimensional Parity</h3>
                <svg width="100%" height="120" viewBox="0 0 200 120" className="mx-auto">
                  <rect x="10" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="45" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="80" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="115" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="150" y="10" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <rect x="10" y="35" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="45" y="35" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="80" y="35" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="115" y="35" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="150" y="35" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <rect x="10" y="60" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="45" y="60" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="80" y="60" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="115" y="60" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                  <rect x="150" y="60" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <rect x="10" y="85" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <rect x="45" y="85" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <rect x="80" y="85" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <rect x="115" y="85" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <rect x="150" y="85" width="30" height="20" fill="#E5E7EB" stroke="#6B7280"/>
                  <text x="25" y="115" textAnchor="middle" fill="#111827" fontSize="8">Data bits</text>
                  <text x="170" y="115" textAnchor="middle" fill="#111827" fontSize="8">Parity</text>
                </svg>
                <p className="text-xs mt-1">Row+column parity can locate single error.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CRC detailed */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">2. CRC (Cyclic Redundancy Check)</h2>
            <p>
              CRC treats the frame as a huge binary number (or polynomial) and divides it by a predetermined divisor. 
              The remainder (CRC code) is appended. The receiver performs the same division; if the remainder is zero, the frame is assumed error‑free.
            </p>
            <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm overflow-x-auto">
              <p>Generator polynomial (Ethernet CRC‑32): 0x04C11DB7 (  x³² + x²⁶ + x²³ + x²² + x¹⁶ + x¹² + x¹¹ + x¹⁰ + x⁸ + x⁷ + x⁵ + x⁴ + x² + x + 1 )</p>
            </div>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong>Detects all single and double bit errors</strong> (for reasonable frame lengths).</li>
              <li><strong>Detects any odd number of errors</strong>.</li>
              <li><strong>Detects bursts of length ≤ r</strong> (r = CRC width, e.g., 32 bits).</li>
              <li>Probability of undetected error for CRC‑32 over random noise is extremely low (~2<sup>-32</sup>).</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
              <p className="text-sm"><strong>💡 Classroom demo:</strong> Use a small CRC‑3 polynomial (e.g., 0b1011) and have <strong>Abhronila</strong> compute the remainder for a short message. Then flip a bit and recompute – the remainder becomes non‑zero.</p>
            </div>
          </div>
        </section>

        {/* Checksum */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">3. Internet Checksum</h2>
            <p>
              The checksum used in IP, TCP, and UDP is a 16‑bit one's complement sum of all 16‑bit words in the header (and data for TCP/UDP). 
              The sender computes the sum, takes the one's complement, and places it in the checksum field. The receiver recomputes the sum (including the checksum field); 
              if the result is all 1's (<code>0xFFFF</code>), the header is considered valid.
            </p>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded text-sm">
                <span className="font-semibold">Advantages:</span> simple, fast in software, endian‑independent.
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded text-sm">
                <span className="font-semibold">Disadvantages:</span> weak against certain errors (e.g., swapping 16‑bit words goes undetected).
              </div>
            </div>
            <p className="mt-2 text-sm">Modern high‑speed routers often skip checksum validation for performance, relying on CRC at Layer 2.</p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Comparison of Error Detection Methods</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-2 text-left">Method</th><th className="p-2 text-left">Detects</th><th className="p-2 text-left">Overhead</th><th className="p-2 text-left">Used In</th></tr>
              </thead>
              <tbody>
                {methods.map(m => (
                  <tr key={m.name} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-medium">{m.name}</td>
                    <td className="p-2">{m.detects}</td>
                    <td className="p-2">{m.overhead}</td>
                    <td className="p-2">{m.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Real‑world, pitfalls, best practices */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">Real‑World Usage</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Ethernet (802.3):</strong> Uses CRC‑32 in the frame trailer. If the CRC fails, the frame is dropped (no NAK; upper layers handle recovery).</li>
              <li><strong>Wi‑Fi (802.11):</strong> Uses CRC‑32 for each frame; uses a 4‑byte FCS. On failure, the receiver sends no ACK, prompting retransmission.</li>
              <li><strong>TCP/UDP:</strong> Use 16‑bit checksum over pseudo‑header + segment. TSO (TCP Segmentation Offload) may offload checksum to hardware.</li>
              <li><strong>CRC in storage:</strong> SATA, NVMe use CRC to protect commands and data.</li>
              <li><strong>Parity in memory:</strong> ECC memory uses extended Hamming codes, but some DIMMs use simple parity for detection only.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">Common Pitfalls (Beginner Mistakes)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Assuming parity is enough:</strong> Single parity fails on even number of errors. A burst of noise can easily cause two flips.</li>
              <li><strong>Misunderstanding CRC polynomial selection:</strong> Not all polynomials are equal; standard ones (CRC‑32, CRC‑16‑CCITT) have known properties.</li>
              <li><strong>Forgetting to include the checksum in the checksum calculation:</strong> The IP checksum field is zeroed before computing the sum.</li>
              <li><strong>Endianness issues:</strong> Some implementers forget network byte order (big‑endian) when computing checksums, causing mismatches.</li>
              <li><strong>Treating CRC as error correction:</strong> CRC is detection only. Use Hamming codes or Reed‑Solomon for correction.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">Best Practices & Professional Habits</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Always use hardware‑accelerated CRC/checksum offloading</strong> (e.g., NETIF_F_HW_CSUM on Linux) for performance.</li>
              <li><strong>Validate error detection codes as early as possible</strong> – discard bad frames before expensive processing.</li>
              <li><strong>Use CRC‑32 for new protocols</strong> unless constraint is extreme (then consider CRC‑16 or CRC‑8). Avoid ad‑hoc checksums.</li>
              <li><strong>Test error detection with fault injection</strong> (e.g., using `tc` command on Linux to corrupt packets).</li>
              <li><strong>Remember that checksum is not cryptographically secure</strong> – it cannot protect against intentional corruption.</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.4s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Pro Tips & Tricks</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tool: `crc32` command</strong> – compute CRC‑32 of any file. Use it to verify data integrity after transfer.</li>
              <li><strong>Debugging network errors:</strong> If you see `ethernet CRC errors` in `ifconfig` output, check cables, switch ports, or electromagnetic interference.</li>
              <li><strong>Memory parity trick:</strong> On some old systems, disabling ECC can increase speed but risk silent data corruption – never do in production.</li>
              <li><strong>Classroom demonstration:</strong> Have <strong>Susmita</strong> and <strong>Debangshu</strong> simulate CRC‑3 using paper and long division. Compare to parity. They'll see CRC catches many errors that parity misses.</li>
              <li><strong>Checksum offload:</strong> On Linux, `ethtool -k eth0 | grep checksum` shows TX/RX checksum offload settings.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.45s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">✅ Error Detection Checklist</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label><input type="checkbox" className="mr-2" /> I can explain why error detection is necessary.</label>
              <label><input type="checkbox" className="mr-2" /> I understand single parity's limitation (even number of errors).</label>
              <label><input type="checkbox" className="mr-2" /> I can compute a simple CRC using polynomial division.</label>
              <label><input type="checkbox" className="mr-2" /> I know the difference between CRC, checksum, and parity.</label>
              <label><input type="checkbox" className="mr-2" /> I know which protocols use CRC (Ethernet, Wi‑Fi).</label>
              <label><input type="checkbox" className="mr-2" /> I know which protocols use Internet checksum (IP, TCP, UDP).</label>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.5s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              - Why can’t a single parity bit detect two bit flips? Can you design a 2‑bit error that escapes CRC‑32?<br />
              - The Internet checksum is weak but still used. Why hasn't it been replaced by CRC? (Hint: software speed, incremental updates)<br />
              - If you had a link with a very high bit error rate (e.g., deep space), would you choose CRC or a more powerful code?<br />
              - Try changing one byte in a TCP segment and recalculating the checksum manually. What do you observe?
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQTemplate title="Error Detection (Parity, CRC, Checksum) FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"The biggest misconception is that CRC guarantees error detection. Emphasise that it provides a very high probability, not certainty. Use the analogy of a hash collision. For hands‑on, give students a small CRC‑3 polynomial and a few 8‑bit messages. Have them compute the remainder on paper. One student flips a bit and recomputes – they'll see the remainder changes. This builds intuition. Also contrast the Internet checksum's incremental update property (important for routers) with CRC's burst detection power."} />

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