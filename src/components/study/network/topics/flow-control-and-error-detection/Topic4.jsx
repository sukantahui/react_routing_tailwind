// File: src/components/topics/Topic4.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic4_files/topic4_questions';

/**
 * Topic4: Framing techniques
 * 
 * @component
 * @returns {JSX.Element} The component explaining how the Data Link Layer demarcates frames from raw bit streams.
 * 
 * @purpose To provide a comprehensive understanding of framing methods: character count, byte stuffing,
 *          bit stuffing, and physical layer coding violations.
 * 
 * @when_to_use After understanding the role of the Data Link Layer (Topic0) and before flow/error control,
 *               because framing is the first step in processing incoming bits.
 * 
 * @why_important Without proper framing, a receiver cannot tell where one frame ends and the next begins.
 *                Framing errors lead to loss of synchronization and corrupted data interpretation.
 */
export default function Topic4() {
  // Framing techniques data
  const techniques = [
    {
      name: "Character Count",
      how: "First field of frame header contains the total number of characters (bytes) in the frame.",
      pros: "Simple and efficient; no need to scan the data.",
      cons: "If the count field is corrupted, synchronization is lost until the next delimiter.",
      example: "| 5 | H E L L O | → count=5 tells receiver to read exactly 5 characters.",
      usage: "Very early protocols (DDCMP), but rarely used alone today."
    },
    {
      name: "Byte Stuffing (Character Stuffing)",
      how: "Use special flag bytes (e.g., 0x7E in HDLC) to mark frame boundaries. Any occurrence of flag inside data is 'stuffed' with an escape byte (e.g., 0x7D).",
      pros: "Synchronization is robust; data can contain any byte value.",
      cons: "Overhead can be variable; requires scanning each byte.",
      example: "Data: 0x7E becomes 0x7D 0x5E (where 0x5E = 0x7E XOR 0x20).",
      usage: "PPP (Point‑to‑Point Protocol), HDLC, and many serial links."
    },
    {
      name: "Bit Stuffing",
      how: "Each frame begins and ends with a special bit pattern (e.g., 01111110). After five consecutive 1s in data, a 0 is inserted ('stuffed').",
      pros: "Works at bit level, independent of character size. Efficient for binary data.",
      cons: "Slightly more complex than byte stuffing; requires bit‑level operations.",
      example: "Data: 011111 becomes 0111110 (stuffed 0).",
      usage: "HDLC, USB, CAN bus, SDLC."
    },
    {
      name: "Physical Layer Coding Violations",
      how: "Use coding schemes (e.g., Manchester) where certain invalid signal patterns mark frame boundaries.",
      pros: "No extra overhead on data; uses existing physical layer encoding.",
      cons: "Depends on the physical layer; not universally available.",
      example: "Ethernet uses a 8b/10b or 4b/5b coding with reserved symbols for Start-of-Frame Delimiter (SFD).",
      usage: "Ethernet (SFD and IDLE symbols), Token Ring."
    }
  ];

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Framing Techniques
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            Drawing lines in the sand (or bit stream) to separate frames.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            The Data Link Layer receives a raw stream of bits from the Physical Layer. 
            But where does one frame end and the next begin? <strong className="font-semibold text-blue-600">Framing</strong> answers this question.
            We explore four classical techniques: <strong>character count, byte stuffing, bit stuffing, and physical layer coding violations.</strong>
          </p>
        </section>

        {/* Need for framing */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Why Framing?</h2>
            <p>
              Imagine <strong className="font-medium">Swadeep</strong> sends a long stream of bits to <strong className="font-medium">Tuhina</strong>:
              <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded my-2">010011010111001011010...</code>
              Without knowing where one frame starts and ends, Tuhina might group bits incorrectly: the first frame's end could be mistaken as part of the second frame's header.
              Framing provides <strong className="font-semibold">synchronization boundaries</strong> so that the receiver can reliably extract each frame.
            </p>
            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400">
              <p className="text-sm"><strong>⚠️ Consequence of framing loss:</strong> The entire subsequent stream may be misinterpreted (frame synchronization loss).</p>
            </div>
          </div>
        </section>

        {/* Detail each technique with SVG examples */}
        <section className="space-y-8 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards] opacity-0 transform translate-y-4">
          {techniques.map((tech, idx) => (
            <div key={tech.name} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">{idx+1}. {tech.name}</h3>
              <p className="mt-1"><span className="font-semibold">How it works:</span> {tech.how}</p>
              <div className="grid md:grid-cols-2 gap-3 mt-2 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded"><span className="font-semibold text-green-700">✓ Pros:</span> {tech.pros}</div>
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded"><span className="font-semibold text-red-700">✗ Cons:</span> {tech.cons}</div>
              </div>
              <p className="text-sm mt-2"><span className="font-semibold">Example:</span> {tech.example}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="font-semibold">Used in:</span> {tech.usage}</p>
              
              {/* SVG for bit stuffing visual */}
              {tech.name === "Bit Stuffing" && (
                <div className="mt-3">
                  <svg width="100%" height="60" viewBox="0 0 600 40" className="mx-auto">
                    <rect x="10" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                    <rect x="44" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                    <rect x="78" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                    <rect x="112" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                    <rect x="146" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                    <rect x="180" y="10" width="30" height="20" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2"/> {/* stuffed 0 */}
                    <text x="195" y="24" textAnchor="middle" fill="white" fontSize="10">0</text>
                    <rect x="214" y="10" width="30" height="20" fill="#BFDBFE" stroke="#1E3A8A"/>
                    <text x="25" y="42" textAnchor="middle" fill="#111827" fontSize="10">1</text>
                    <text x="59" y="42" textAnchor="middle" fill="#111827" fontSize="10">1</text>
                    <text x="93" y="42" textAnchor="middle" fill="#111827" fontSize="10">1</text>
                    <text x="127" y="42" textAnchor="middle" fill="#111827" fontSize="10">1</text>
                    <text x="161" y="42" textAnchor="middle" fill="#111827" fontSize="10">1</text>
                    <text x="229" y="42" textAnchor="middle" fill="#111827" fontSize="10">1</text>
                    <text x="300" y="25" textAnchor="middle" fill="#4B5563" fontSize="10">Five 1s → insert 0</text>
                  </svg>
                </div>
              )}
              {/* SVG for byte stuffing flag */}
              {tech.name === "Byte Stuffing (Character Stuffing)" && (
                <div className="mt-3 text-center text-sm font-mono">
                  <span className="bg-gray-200 dark:bg-gray-700 px-1">7E</span> FLAG → data <span className="bg-red-100 dark:bg-red-900 px-1">7E</span> → becomes <span className="bg-green-100 dark:bg-green-900 px-1">7D 5E</span> ESCAPED
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Comparison table */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Comparison of Framing Techniques</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-2">Method</th><th className="p-2">Overhead</th><th className="p-2">Resilience to corruption</th><th className="p-2">Byte/bit oriented</th></tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2 font-medium">Character Count</td><td className="p-2">Low (fixed count field)</td><td className="p-2">Poor (count error loses sync)</td><td className="p-2">Byte</td></tr>
                <tr className="border-b"><td className="p-2 font-medium">Byte Stuffing</td><td className="p-2">Variable (0–100% worst case)</td><td className="p-2">Good (flag resync)</td><td className="p-2">Byte</td></tr>
                <tr className="border-b"><td className="p-2 font-medium">Bit Stuffing</td><td className="p-2">~0.8% average</td><td className="p-2">Good (flag resync)</td><td className="p-2">Bit</td></tr>
                <tr><td className="p-2 font-medium">Physical coding violations</td><td className="p-2">None (uses reserved symbols)</td><td className="p-2">Excellent (no ambiguity)</td><td className="p-2">Symbol</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Real-world usage, pitfalls, best practices */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">Real‑World Examples</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>PPP (Point‑to‑Point Protocol):</strong> Uses byte stuffing with flag 0x7E and escape 0x7D. Common in DSL and serial links.</li>
              <li><strong>HDLC / SDLC:</strong> Uses bit stuffing with flag `01111110`. Widely used in legacy WANs and some modern systems (e.g., ISDN).</li>
              <li><strong>Ethernet:</strong> Uses a combination: physical coding (4b/5b for 100Mbps, 8b/10b for 1Gbps) with special Start of Frame Delimiter (SFD) symbol. No stuffing needed.</li>
              <li><strong>USB:</strong> Uses bit stuffing after 6 consecutive 1s (NRZI encoding) to ensure transitions for clock recovery.</li>
              <li><strong>CAN bus (automotive):</strong> Uses bit stuffing for synchronization; after five identical bits, a complementary stuffed bit is inserted.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-red-600">Common Pitfalls (Beginner Mistakes)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Confusing byte stuffing with bit stuffing:</strong> Byte stuffing works on byte boundaries, bit stuffing on bit streams.</li>
              <li><strong>Forgetting to escape the escape character:</strong> In byte stuffing, if the data contains the escape byte (0x7D), it must itself be escaped (0x7D 0x5D).</li>
              <li><strong>Assuming character count is reliable:</strong> Never use count alone on error‑prone links; combine with flag detection.</li>
              <li><strong>Implementing stuffing incorrectly in hardware:</strong> The stuffed bits must be removed (unstuffed) before processing; missing this leads to frame corruption.</li>
              <li><strong>Not handling stuffed bits that cross byte boundaries:</strong> In software, bit stuffing is often done with shifty state machines; bugs cause off‑by‑one errors.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">Best Practices (Professional)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Use bit stuffing for low‑level protocols</strong> (USB, CAN) because it's independent of character size and works with NRZI encoding.</li>
              <li><strong>For byte‑oriented links, prefer byte stuffing</strong> with a well‑chosen flag (rare in data, like 0x7E) to minimise overhead.</li>
              <li><strong>Never rely solely on character count</strong> – always include a trailing flag or CRC to resynchronise.</li>
              <li><strong>When designing a new protocol, consider using length fields + CRC</strong> and a sync word (e.g., `0xDEADBEEF`) to combine robustness.</li>
              <li><strong>Test framing by injecting random bit flips</strong> and verify that the receiver resynchronises at the next flag.</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Pro Tips & Tricks</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tool: `hexdump -C`</strong> on a captured PPP stream shows stuffed bytes (0x7D 0x5E) clearly.</li>
              <li><strong>Debugging bit stuffing:</strong> Use an oscilloscope on CAN bus – stuffed bits appear as extra transitions.</li>
              <li><strong>Classroom demo:</strong> Have <strong>Abhronila</strong> send a message containing the flag pattern <code>01111110</code> using bit stuffing. <strong>Debangshu</strong> must remove stuffed zeros correctly.</li>
              <li><strong>Memory optimisation:</strong> For software bit stuffing, use a precomputed table of patterns to avoid per‑bit loops.</li>
              <li><strong>When using byte stuffing, choose escape and flag bytes that are rare in typical data</strong> (e.g., 0x7E and 0x7D for text). For binary data, consider a different scheme.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">✅ Framing Techniques Checklist</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label><input type="checkbox" className="mr-2" /> I can explain why framing is necessary.</label>
              <label><input type="checkbox" className="mr-2" /> I understand the vulnerability of character count.</label>
              <label><input type="checkbox" className="mr-2" /> I can describe byte stuffing and its escape mechanism.</label>
              <label><input type="checkbox" className="mr-2" /> I can describe bit stuffing (five 1s → insert 0).</label>
              <label><input type="checkbox" className="mr-2" /> I know where each technique is used (PPP, HDLC, Ethernet, USB).</label>
              <label><input type="checkbox" className="mr-2" /> I understand that physical layer coding violations avoid overhead.</label>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.4s_forwards] opacity-0 transform translate-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              - If the data contains the flag pattern <code>01111110</code> exactly 100 times, how many extra bits does bit stuffing add?<br />
              - Why does USB use bit stuffing instead of byte stuffing? (Hint: it uses NRZI encoding).<br />
              - If you were designing a deep‑space link with very low error rate, which framing method would you choose and why?<br />
              - Try stuffing and unstuffing the bit pattern <code>011111101111110</code> by hand. Where are the stuffed zeros inserted and removed?
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQTemplate title="Framing Techniques FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Framing is the first thing the Data Link Layer does after receiving bits. Many students overlook it, but it's as critical as error detection. Use the 'envelope' analogy: the flag is like the envelope seal. For bit stuffing, physically write a long string of bits on the board and ask a student to insert zeros after every five consecutive 1s. Then have another student remove them. This hands‑on activity cements the concept. Also, mention that Ethernet cleverly avoids stuffing by using physical coding violations – a sign of thoughtful design."} />

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