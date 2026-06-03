// File: src/components/topics/Topic3.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic3_files/topic3_questions';

/**
 * Topic3: Error correction – Hamming Code
 * 
 * @component
 * @returns {JSX.Element} The component explaining Hamming Code for single‑error correction and double‑error detection.
 * 
 * @purpose To provide a deep understanding of how forward error correction works using Hamming codes,
 *          including the mathematics of parity bits, syndrome calculation, and error location.
 * 
 * @when_to_use After error detection (Topic2), because Hamming code builds on parity concepts but adds correction.
 * 
 * @why_important In scenarios where retransmission is expensive or impossible (e.g., satellite links, memory,
 *                deep‑space communication), forward error correction is essential. Hamming codes are the simplest
 *                practical example and appear in ECC memory and some communication protocols.
 */
export default function Topic3() {
  // Data for Hamming code configuration
  const configs = [
    { dataBits: 1, parityBits: 2, totalBits: 3, codeRate: "1/3", example: "Hamming(3,1) – repetition" },
    { dataBits: 4, parityBits: 3, totalBits: 7, codeRate: "4/7 ≈ 0.57", example: "Hamming(7,4) – classic" },
    { dataBits: 11, parityBits: 4, totalBits: 15, codeRate: "11/15 ≈ 0.73", example: "Hamming(15,11)" },
    { dataBits: 26, parityBits: 5, totalBits: 31, codeRate: "26/31 ≈ 0.84", example: "Hamming(31,26)" },
  ];

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Error Correction: Hamming Code
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            Not just detecting errors – fixing them on the fly.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            While error detection (CRC, checksum) tells you something is wrong, <strong className="font-semibold text-blue-600">Hamming Code</strong> goes further:
            it can <strong className="font-semibold">correct single‑bit errors</strong> and, in extended form, detect double‑bit errors.
            Developed by Richard Hamming in 1950, it is the foundation of ECC memory, some satellite links, and many error‑correcting systems.
          </p>
        </section>

        {/* Why correction over detection */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Why Correct Instead of Just Detect?</h2>
            <p>
              Imagine <strong className="font-medium">Swadeep</strong> and <strong className="font-medium">Tuhina</strong> are on a deep‑space mission to <strong className="font-medium">Ichapur</strong> (very far).
              The radio round‑trip time is 10 minutes. If a frame is corrupted, asking for a retransmission would take 10 minutes to ask plus 10 minutes to resend – 20 minutes of waiting.
              With forward error correction (FEC), the receiver can fix the error immediately, no retransmission needed.
            </p>
            <p className="mt-2">
              Hamming Code is a type of <strong className="font-semibold">block code</strong> that adds carefully placed parity bits to the data.
              The pattern of parity failures (the <strong className="font-semibold">syndrome</strong>) directly points to the bit position that is flipped.
            </p>
          </div>
        </section>

        {/* Core principle: parity bits at power-of-two positions */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">How Hamming Code Works (7,4) Example</h2>
            <p>
              The classic <strong>Hamming(7,4)</strong> code takes 4 data bits and adds 3 parity bits, producing a 7‑bit codeword.
              Parity bits are placed at positions that are powers of two: <strong>1, 2, 4</strong> (1‑based indexing). 
              Each parity bit checks a specific set of positions (including itself).
            </p>
            <div className="mt-4 bg-gray-100 dark:bg-gray-700/50 p-3 rounded">
              <p className="font-mono text-sm">Positions: 1(p1), 2(p2), 3(d1), 4(p3), 5(d2), 6(d3), 7(d4)</p>
              <p className="font-mono text-sm mt-1">p1 checks positions {1,3,5,7} → (binary xxx1)</p>
              <p className="font-mono text-sm">p2 checks positions {2,3,6,7} → (binary xx1x)</p>
              <p className="font-mono text-sm">p3 checks positions {4,5,6,7} → (binary x1xx)</p>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
              <p className="text-sm"><strong>🧠 Rule:</strong> Parity bit at position 2<sup>k</sup> checks all positions whose binary representation has the k‑th bit set (counting from LSB).</p>
            </div>
          </div>
        </section>

        {/* Encoding SVG illustration */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-center mb-3">Encoding a 4‑bit Message into Hamming(7,4)</h3>
            <svg width="100%" height="200" viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="80" height="40" rx="5" fill="#E5E7EB" stroke="#6B7280" className="dark:fill-gray-700 dark:stroke-gray-500" />
              <text x="60" y="55" textAnchor="middle" fill="#111827" className="dark:fill-white text-sm">Data bits</text>
              <text x="60" y="85" textAnchor="middle" fill="#4B5563" className="dark:fill-gray-400 text-xs">d₄d₃d₂d₁</text>
              
              <path d="M100,50 L140,50" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrow)"/>
              
              <rect x="150" y="20" width="60" height="35" rx="4" fill="#BFDBFE" stroke="#3B82F6" className="dark:fill-blue-900"/>
              <text x="180" y="42" textAnchor="middle" fill="#1E3A8A" className="dark:fill-blue-200 text-sm">p₁</text>
              <rect x="220" y="20" width="60" height="35" rx="4" fill="#BFDBFE" stroke="#3B82F6" className="dark:fill-blue-900"/>
              <text x="250" y="42" textAnchor="middle" fill="#1E3A8A" className="dark:fill-blue-200 text-sm">p₂</text>
              <rect x="290" y="20" width="60" height="35" rx="4" fill="#93C5FD" stroke="#2563EB" className="dark:fill-blue-800"/>
              <text x="320" y="42" textAnchor="middle" fill="white" className="text-sm">d₁</text>
              <rect x="360" y="20" width="60" height="35" rx="4" fill="#BFDBFE" stroke="#3B82F6" className="dark:fill-blue-900"/>
              <text x="390" y="42" textAnchor="middle" fill="#1E3A8A" className="dark:fill-blue-200 text-sm">p₃</text>
              <rect x="430" y="20" width="60" height="35" rx="4" fill="#93C5FD" stroke="#2563EB" className="dark:fill-blue-800"/>
              <text x="460" y="42" textAnchor="middle" fill="white" className="text-sm">d₂</text>
              <rect x="500" y="20" width="60" height="35" rx="4" fill="#93C5FD" stroke="#2563EB" className="dark:fill-blue-800"/>
              <text x="530" y="42" textAnchor="middle" fill="white" className="text-sm">d₃</text>
              <rect x="570" y="20" width="60" height="35" rx="4" fill="#93C5FD" stroke="#2563EB" className="dark:fill-blue-800"/>
              <text x="600" y="42" textAnchor="middle" fill="white" className="text-sm">d₄</text>
              
              <text x="390" y="85" textAnchor="middle" fill="#4B5563" className="dark:fill-gray-400 text-xs">Codeword (7 bits)</text>
              <text x="390" y="105" textAnchor="middle" fill="#3B82F6" className="text-xs">Bit positions: 1  2  3  4  5  6  7</text>
            </svg>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">Parity bits (p₁,p₂,p₃) are inserted at positions 1,2,4. Data bits fill the rest.</p>
          </div>
        </section>

        {/* Syndrome calculation & correction example */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Syndrome: The Error Locator</h2>
            <p>
              After receiving a 7‑bit codeword, the receiver recomputes the parity bits (using the same rules) and compares them with the received parity bits.
              The differences form a <strong className="font-semibold">syndrome</strong> – a binary number that directly gives the position of the flipped bit.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                <p className="font-semibold">Example: Data = 1011</p>
                <p className="text-sm">Compute parity:</p>
                <p className="text-sm font-mono">p₁ = d₁⊕d₂⊕d₄ = 1⊕0⊕1 = 0</p>
                <p className="text-sm font-mono">p₂ = d₁⊕d₃⊕d₄ = 1⊕1⊕1 = 1</p>
                <p className="text-sm font-mono">p₃ = d₂⊕d₃⊕d₄ = 0⊕1⊕1 = 0</p>
                <p className="text-sm">Codeword = 0 1 1 0 0 1 1 (positions 1–7)</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                <p className="font-semibold">Error in position 5 (d₂ flips from 0→1)</p>
                <p className="text-sm">Received = 0 1 1 0 <span className="text-red-600 font-bold">1</span> 1 1</p>
                <p className="text-sm">Recompute parity:</p>
                <p className="text-sm font-mono">p₁' = (1⊕1⊕1) = 1, mismatch → 1</p>
                <p className="text-sm font-mono">p₂' = (1⊕1⊕1)=1, matches → 0</p>
                <p className="text-sm font-mono">p₃' = (1⊕1⊕1)=1, mismatch → 1</p>
                <p className="text-sm">Syndrome = p₃'p₂'p₁' = 101₂ = <strong>5</strong> → error at bit 5</p>
              </div>
            </div>
            <p className="mt-2 text-sm italic">The syndrome is the binary position of the error – brilliant!</p>
          </div>
        </section>

        {/* Hamming Distance & Capabilities */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Hamming Distance and Error Correction Capability</h2>
            <p>
              The <strong>Hamming distance</strong> of a code is the minimum number of bit flips needed to turn one valid codeword into another.
              A code with Hamming distance <strong>d</strong> can:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Detect up to <strong>d−1</strong> errors.</li>
              <li>Correct up to <strong>⌊(d−1)/2⌋</strong> errors.</li>
            </ul>
            <p className="mt-2">
              Hamming(7,4) has Hamming distance <strong>3</strong> → can correct 1 error and detect up to 2 errors (when extended with an extra parity bit).
            </p>
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <p>Extended Hamming (8,4) adds an overall parity bit, achieving Hamming distance 4 → can detect double errors and correct single errors.</p>
            </div>
          </div>
        </section>

        {/* Configuration table */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Hamming Code Configurations</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-2">Data bits (k)</th><th className="p-2">Parity bits (r)</th><th className="p-2">Total (n = k+r)</th><th className="p-2">Code rate</th><th className="p-2">Example</th></tr>
              </thead>
              <tbody>
                {configs.map(c => (
                  <tr key={c.dataBits} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2 text-center">{c.dataBits}</td>
                    <td className="p-2 text-center">{c.parityBits}</td>
                    <td className="p-2 text-center">{c.totalBits}</td>
                    <td className="p-2 text-center">{c.codeRate}</td>
                    <td className="p-2 text-center">{c.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">In general, for r parity bits we can have up to 2<sup>r</sup> − 1 total bits, with k = 2<sup>r</sup> − r − 1 data bits.</p>
          </div>
        </section>

        {/* Real-world usage */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.4s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">Real‑World Applications</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>ECC Memory (DRAM):</strong> Most server and some desktop memory modules use Hamming codes (or more advanced like SECDED) to correct single‑bit errors and detect double‑bit errors (SECDED: Single Error Correction, Double Error Detection).</li>
              <li><strong>Satellite Communication:</strong> Use Hamming or Reed‑Solomon codes because retransmission is impossible.</li>
              <li><strong>Flash Storage (NAND):</strong> Use BCH codes (a generalization of Hamming) to correct multiple errors.</li>
              <li><strong>Hamming Code in RAID 2:</strong> An early RAID level used Hamming code for error correction across disks.</li>
              <li><strong>Bar codes (some variants) and QR codes:</strong> Use Reed‑Solomon, which is an evolution of Hamming.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">Common Pitfalls (Beginner Mistakes)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Mis‑indexing bits:</strong> Positions must start at 1, not 0, because 2<sup>k</sup> parity positions use 1‑based indices.</li>
              <li><strong>Confusing parity calculations:</strong> Forgetting to include the parity bit itself in its own check set (the parity bit ensures even parity across its group).</li>
              <li><strong>Assuming Hamming code corrects multiple errors:</strong> Hamming(7,4) corrects <em>only</em> single errors. Two errors may lead to a wrong correction (same syndrome as a different single error).</li>
              <li><strong>Using the wrong generator matrix:</strong> Many online examples use different parity bit placements; ensure consistency.</li>
              <li><strong>Overhead ignorance:</strong> Hamming(7,4) has 43% overhead. For high‑rate links, that's expensive.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">Best Practices (Professional)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Use SECDED (extended Hamming) for memory:</strong> Provides single error correction and double error detection – essential for reliable servers.</li>
              <li><strong>Combine with interleaving:</strong> To correct burst errors, interleave several Hamming codewords.</li>
              <li><strong>Hardware implementation:</strong> In FPGAs, Hamming encoder/decoder uses minimal logic (XOR trees) and runs at wire speed.</li>
              <li><strong>Check the code rate:</strong> For long frames, use higher‑rate codes like Hamming(15,11) to reduce overhead.</li>
              <li><strong>Test with fault injection:</strong> Use a bit‑flipping tool to verify that the decoder corrects single errors and reports uncorrectable ones.</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.45s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Pro Tips & Tricks</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Quick syndrome calculation:</strong> Compute all parity bits from received data, XOR with received parity bits → syndrome.</li>
              <li><strong>Classroom demo:</strong> Give <strong>Swadeep, Tuhina, Abhronila, Debangshu</strong> each a card with a 4‑bit message. Have them compute Hamming(7,4) manually. Then one student flips a bit and passes to another who must locate and fix it.</li>
              <li><strong>Tool: `ecc` utility on Linux</strong> simulates memory ECC. Use it to show corrected errors.</li>
              <li><strong>Optimization:</strong> In software, use lookup tables for syndromes instead of recalculating each time.</li>
              <li><strong>Debugging memory errors:</strong> `edac-util` on Linux reports ECC memory correction events – watch for corrected errors as early warning of failing RAM.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.5s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">✅ Hamming Code Checklist</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label><input type="checkbox" className="mr-2" /> I understand why forward error correction is needed (no retransmission).</label>
              <label><input type="checkbox" className="mr-2" /> I know how to place parity bits at positions 1,2,4 etc.</label>
              <label><input type="checkbox" className="mr-2" /> I can compute parity bits for Hamming(7,4).</label>
              <label><input type="checkbox" className="mr-2" /> I can calculate a syndrome and locate the error position.</label>
              <label><input type="checkbox" className="mr-2" /> I understand Hamming distance and its relation to correction capability.</label>
              <label><input type="checkbox" className="mr-2" /> I know where Hamming codes are used (ECC memory, satellites).</label>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.55s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              - Why can't Hamming(7,4) correct two errors? What would the syndrome look like if two bits flipped?<br />
              - If you increase the number of parity bits to 4, you get Hamming(15,11). How many errors can it correct? What is the trade‑off?<br />
              - Try designing a Hamming code for 8 data bits. How many parity bits do you need? Use the inequality 2<sup>r</sup> ≥ k + r + 1.<br />
              - In ECC memory, a single corrected error is logged but doesn't crash the system. Why would an uncorrectable double error cause a kernel panic?
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQTemplate title="Error Correction (Hamming Code) FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Hamming code is a student favourite because the syndrome gives the exact error position – it feels like magic. Emphasise the binary positioning property: parity bits check positions with that bit set in binary. For Hamming(7,4), make them memorise the three parity groups. A memorable activity: have the class encode a 4‑bit value on the board, then a student whispers a single bit error to another student, who then writes the syndrome and points to the flipped bit. This solidifies the concept. Also mention that real systems often use more powerful codes (BCH, Reed‑Solomon), but Hamming is the elegant starting point."} />

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