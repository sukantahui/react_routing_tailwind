import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

/**
 * Topic20: Reliability and Noise Resistance in Transmission Media
 * 
 * Component Purpose:
 * - Explains how different transmission media handle noise and maintain reliable data transfer
 * - Compares reliability metrics: BER (Bit Error Rate), SNR, shielding effectiveness
 * - Real-world implications: corrupted files, voice call echoes, video artifacts
 * 
 * When & Why Used:
 * - When choosing cabling for hospitals, factories, data centers
 * - When troubleshooting intermittent network failures
 * - When designing fault-tolerant communication systems
 * 
 * @returns {JSX.Element} Full educational component with theory, examples, Q&A
 */
const Topic20 = () => {
  // State for interactive demo (optional, for showing SNR impact)
  const [noiseLevel, setNoiseLevel] = useState(0.1); // 0 = no noise, 1 = high noise
  const [signalStrength, setSignalStrength] = useState(0.8);
  
  // Calculate simulated BER (Bit Error Rate)
  const ber = Math.min(0.5, (noiseLevel / (signalStrength + 0.01)) * 0.3);
  const reliabilityPercent = Math.max(0, 100 - ber * 100);
  
  // Data for comparison table
  const mediaReliability = [
    { media: "Optical Fiber", ber: "10^-12 to 10^-15", noiseImmunity: "Excellent (immune to EMI/RFI)", useCase: "Backbone, long-haul" },
    { media: "Shielded Twisted Pair (STP)", ber: "10^-8 to 10^-10", noiseImmunity: "Good with proper grounding", useCase: "Industrial LAN" },
    { media: "Unshielded Twisted Pair (UTP)", ber: "10^-7 to 10^-9", noiseImmunity: "Moderate (affected by nearby cables)", useCase: "Office LAN" },
    { media: "Coaxial Cable", ber: "10^-8 to 10^-10", noiseImmunity: "Good (braided shield)", useCase: "Cable TV, broadband" },
    { media: "Wireless (Radio/Microwave)", ber: "10^-5 to 10^-7", noiseImmunity: "Variable (interference prone)", useCase: "Mobility, difficult terrain" }
  ];
  
  // Noise types with descriptions
  const noiseTypes = [
    { name: "Thermal Noise", cause: "Random electron motion in conductors", affected: "All wired media", mitigation: "Better cooling, low-noise amplifiers" },
    { name: "Crosstalk", cause: "Electromagnetic coupling between adjacent wires", affected: "UTP, poorly shielded cables", mitigation: "Twisting pairs, shielding, separation" },
    { name: "Impulse Noise", cause: "Sudden spikes from motors, lightning, switches", affected: "All media (especially wireless)", mitigation: "Error correction, shielding, surge protectors" },
    { name: "Intermodulation Noise", cause: "Nonlinear mixing of signals at different frequencies", affected: "Amplifiers, repeaters", mitigation: "Linear amplifiers, filtering" },
    { name: "Atmospheric Noise", cause: "Lightning, solar activity, cosmic sources", affected: "Wireless, satellite", mitigation: "Diversity reception, forward error correction" }
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      {/* Main container with responsive padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Section with fade-slide-up animation */}
        <div className="mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Reliability & Noise Resistance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            How transmission media maintain data integrity in noisy environments
          </p>
          <div className="h-1 w-20 bg-blue-500 mt-4 rounded-full"></div>
        </div>
        
        {/* ========== THEORY SECTION ========== */}
        <div className="space-y-10">
          
          {/* Card: What is Reliability in Data Transmission? */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🛡️</span> What Makes Transmission Reliable?
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-blue-600 dark:text-blue-400">Reliability</strong> in data transmission means the <strong>accuracy and integrity</strong> of received data compared to what was sent. 
                A reliable medium ensures that <strong>bit errors are extremely rare</strong> and that the signal can withstand environmental noise, interference, and attenuation.
              </p>
              <p>
                The <strong>Bit Error Rate (BER)</strong> is the primary metric: the ratio of erroneous bits to total transmitted bits. 
                For example, a BER of 10<sup>-9</sup> means 1 error per billion bits — that's one corrupted character in roughly 125 MB of data.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 my-4">
                <p className="italic">📌 <strong>Real-world analogy:</strong> Think of a teacher (sender) reading answers to students (receiver). Reliability means every student hears <strong>exactly</strong> what was said, even if there's traffic noise outside. Noise resistance is like acoustic panels in the classroom that absorb disturbances.</p>
              </div>
            </div>
          </div>
          
          {/* Card: Noise Types and Their Impact */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📡</span> Types of Noise & Their Effects
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Noise Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cause</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Affected Media</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {noiseTypes.map((noise, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-2 font-medium">{noise.name}</td>
                      <td className="px-4 py-2 text-sm">{noise.cause}</td>
                      <td className="px-4 py-2 text-sm">{noise.affected}</td>
                      <td className="px-4 py-2 text-sm">{noise.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">
              <p className="font-semibold">💡 Professional Insight:</p>
              <p>In a typical office environment, UTP cables experience impulse noise from elevator motors and fluorescent lights. Engineers use <strong>cable separation</strong> (keep data cables 12 inches away from power lines) and <strong>shielded cables</strong> in noisy areas.</p>
            </div>
          </div>
          
          {/* Interactive Demo: SNR & BER Simulator */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">⚡</span> Interactive: Signal-to-Noise Ratio (SNR) Impact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Adjust the noise level to see how it affects the <strong>Bit Error Rate (BER)</strong> and <strong>Reliability</strong>. 
              This simulates what happens in real cables when interference increases.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Signal Strength: {(signalStrength * 100).toFixed(0)}%</label>
                  <input 
                    type="range" min="0.3" max="1" step="0.01" value={signalStrength}
                    onChange={(e) => setSignalStrength(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Noise Level: {(noiseLevel * 100).toFixed(0)}%</label>
                  <input 
                    type="range" min="0" max="1" step="0.01" value={noiseLevel}
                    onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p><strong>SNR:</strong> {(signalStrength / (noiseLevel + 0.01)).toFixed(1)} dB</p>
                  <p><strong>Simulated BER:</strong> {ber.toExponential(2)}</p>
                  <p><strong>Reliability:</strong> <span className={reliabilityPercent > 99 ? "text-green-600" : reliabilityPercent > 90 ? "text-yellow-600" : "text-red-600"}>{reliabilityPercent.toFixed(4)}%</span></p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {ber < 0.0001 ? "✅" : ber < 0.01 ? "⚠️" : "❌"}
                  </div>
                  <p className="text-sm">
                    {ber < 0.0001 ? "Excellent reliability" : ber < 0.01 ? "Moderate errors possible" : "Poor reliability - data corruption likely"}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">*Simulation based on simplified model. Real BER depends on many factors including modulation, coding, and environment.</p>
          </div>
          
          {/* Comparison Table: Media Reliability */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> Transmission Media: Reliability Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Media</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Typical BER</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Noise Immunity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Best Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mediaReliability.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-2 font-medium">{item.media}</td>
                      <td className="px-4 py-2 text-sm font-mono">{item.ber}</td>
                      <td className="px-4 py-2 text-sm">{item.noiseImmunity}</td>
                      <td className="px-4 py-2 text-sm">{item.useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>🔍 <strong>Observation:</strong> Optical fiber has the best noise immunity because it uses light, not electricity. It's unaffected by electromagnetic interference (EMI) from motors, radios, or lightning.</p>
            </div>
          </div>
          
          {/* Real-World Example: Swadeep's Network Issue */}
          <div className="group bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-purple-200 dark:border-purple-800 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">🏫</span> Real-World Case: Swadeep's School Lab
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Swadeep, a student in <strong>Barrackpore</strong>, noticed frequent file corruption when transferring data between computers in the computer lab. 
              The lab is next to the school's elevator machine room. After investigation, the issue was <strong>impulse noise</strong> from the elevator motor inducing spikes in the UTP cables.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">❌ Before (UTP Cat5e):</p>
                <p className="text-sm">BER ~ 10<sup>-7</sup> → Frequent retransmissions, corrupted assignments.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">✅ After (Fiber Optic + STP):</p>
                <p className="text-sm">BER ~ 10<sup>-12</sup> → No more corruption. Reliability restored.</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">Lesson: Always consider the noise environment when choosing cabling for a school or office.</p>
          </div>
          
          {/* Tips & Tricks Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💎</span> Professional Tips & Tricks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">🔧 Industry Habits:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Always measure <strong>noise floor</strong> before installing sensitive cabling.</li>
                  <li>Use <strong>shielded cables</strong> near heavy machinery or radio transmitters.</li>
                  <li>Maintain <strong>cable separation</strong> rules (power vs data).</li>
                  <li>Implement <strong>Forward Error Correction (FEC)</strong> for wireless links.</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">🧪 Debugging Mindset:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Check <strong>CRC errors</strong> in switch interface counters.</li>
                  <li>Use a <strong>time-domain reflectometer (TDR)</strong> to find noise ingress points.</li>
                  <li>Temporarily replace with <strong>fiber optic</strong> to isolate EMI problems.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              <p className="font-semibold">✂️ Shortcut:</p>
              <p>When troubleshooting intermittent network issues, <strong>ping with large packets</strong> (<code>ping -l 1472 -t</code> on Windows) while running a motor nearby. If packet loss coincides with motor operation, it's impulse noise.</p>
            </div>
          </div>
          
          {/* Common Mistakes & Misconceptions */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-red-200 dark:border-red-800 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-3xl">⚠️</span> Common Pitfalls & Misconceptions
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Misconception: "Digital signals are immune to noise"</p>
                <p className="text-sm"><strong>Truth:</strong> Digital signals can still be corrupted if noise amplitude exceeds the decision threshold. Error correction helps, but noise still causes bit flips.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Beginner Mistake: "Any CAT6 cable works in industrial settings"</p>
                <p className="text-sm"><strong>Correction:</strong> Standard UTP CAT6 is not shielded. In factories, use <strong>FTP (Foiled Twisted Pair)</strong> or <strong>STP</strong> with proper grounding.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Conceptual Error: "Wireless is always less reliable than wired"</p>
                <p className="text-sm"><strong>Clarification:</strong> With proper site survey, directional antennas, and error correction, wireless can achieve <strong>99.999% reliability</strong> in many scenarios. It depends on the environment.</p>
              </div>
            </div>
          </div>
          
          {/* Best Practices Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-3xl">✅</span> Best Practices for Reliable Transmission
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">📋 Design Stage:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Conduct an <strong>EMI site survey</strong> before installation.</li>
                  <li>Plan <strong>cable pathways</strong> away from power lines, motors, and RF sources.</li>
                  <li>Specify <strong>appropriate shielding</strong> for the environment.</li>
                  <li>Include <strong>redundant paths</strong> for critical systems.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">🔧 Maintenance Stage:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Regularly monitor <strong>interface error counters</strong> on switches.</li>
                  <li>Test <strong>cable shielding continuity</strong> (grounding integrity).</li>
                  <li>Keep <strong>firmware updated</strong> (DSP-based noise cancellation improves).</li>
                  <li>Document <strong>noise events</strong> and correlate with network logs.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <p><strong>Beginner-safe habit:</strong> Always use <strong>shielded connectors</strong> with shielded cables. A common mistake is using shielded cable with unshielded RJ45 plugs — the shield won't work without a conductive path to ground.</p>
            </div>
          </div>
          
          {/* Hint Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">💭</span> Think About...
            </h2>
            <div className="space-y-3">
              <p className="italic text-gray-700 dark:text-gray-300">"Why do submarine communication cables use optical fiber instead of copper, even though copper can carry power for repeaters?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"If you're setting up Wi-Fi in a hospital, what noise sources (MRI machines, pagers, microwave ovens) might affect reliability?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"How does increasing signal power affect noise? Does it always improve reliability?"</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Try changing the interactive demo above to explore the relationship between signal, noise, and reliability.</p>
          </div>
          
          {/* Teacher's Note */}
          <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
            <Teacher note="Noise resistance isn't just about shielding — it's about understanding the physical environment. In Barrackpore's industrial areas, factories near schools cause unique EMI challenges. Remind students that reliability metrics like BER are statistical; a 'good' cable can still fail occasionally. Always demonstrate with real packet loss tests. The interactive SNR demo helps visualize that doubling signal power doesn't halve BER — it's logarithmic!" />
          </div>
          
          {/* ========== QUESTIONS & ANSWERS SECTION ========== */}
          <div className="mt-12 pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_1.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">❓</span> 15 Questions & Answers
            </h2>
            <div className="space-y-4">
              {qAndA.map((item, idx) => (
                <QAItem key={idx} question={item.q} answer={item.a} index={idx} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Inject keyframes for animations */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeSlideUp_.*\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// Helper component for QA items with hover effect
const QAItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex justify-between items-center"
      >
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {index+1}. {question}
        </span>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

// Q&A Data (15 questions with detailed answers)
const qAndA = [
  { q: "What is Bit Error Rate (BER) and why is it important?", a: "BER is the ratio of erroneous bits to total transmitted bits. It's crucial because it quantifies the reliability of a communication channel. For example, a BER of 10^-9 means 1 error per billion bits. In practical terms, for a 1 Gbps link, that's an error every second if sustained, but usually errors are bursty. Lower BER means fewer retransmissions and higher throughput." },
  { q: "How does Signal-to-Noise Ratio (SNR) affect reliability?", a: "SNR = Signal Power / Noise Power (in linear scale, often expressed in dB). Higher SNR means the signal is stronger relative to background noise, reducing the probability of bit errors. Doubling SNR (3 dB improvement) can reduce BER by orders of magnitude, depending on modulation. Engineers use SNR to predict link performance before installation." },
  { q: "What is the difference between crosstalk and impulse noise?", a: "Crosstalk is electromagnetic coupling between adjacent wires (e.g., between pairs in a UTP cable). It's continuous and predictable. Impulse noise consists of short, high-amplitude spikes from motors, lightning, or switching power supplies. Impulse noise is harder to mitigate because it can overwhelm error correction momentarily." },
  { q: "Why is optical fiber more noise-resistant than copper?", a: "Fiber uses light pulses in a glass core, not electrical signals. It is immune to electromagnetic interference (EMI) from motors, radio transmitters, lightning, and power lines. Fiber also has no crosstalk between fibers. The only noise sources are thermal noise in receivers and modal dispersion (mitigated by single-mode fiber)." },
  { q: "What is shielding and how does it reduce noise?", a: "Shielding is a conductive layer (foil or braid) surrounding the signal conductors. It works by intercepting electromagnetic fields and diverting them to ground (via drain wire). For example, STP (Shielded Twisted Pair) has a foil shield around each pair or overall. Effective shielding requires proper grounding at both ends (or one end, depending on frequency)." },
  { q: "Can wireless links ever be as reliable as wired?", a: "Yes, with careful engineering. Using directional antennas, frequency hopping, error correction codes (LDPC, Turbo codes), and diversity (multiple antennas), microwave links can achieve 99.999% availability (5 nines). However, wired fiber still has lower BER (10^-12 vs 10^-6 for typical Wi-Fi). The choice depends on mobility and installation cost." },
  { q: "What is Forward Error Correction (FEC)?", a: "FEC adds redundant bits to the data stream before transmission. The receiver can detect and correct errors without retransmission. For example, Reed-Solomon codes used in DVB (satellite TV) can correct up to 8 byte errors per block. FEC improves effective BER at the cost of bandwidth overhead (typically 3-20%)." },
  { q: "How does temperature affect noise in cables?", a: "Higher temperature increases thermal noise (Johnson-Nyquist noise) in conductors: noise power = kTB (Boltzmann constant × temperature × bandwidth). For every 10°C rise, thermal noise increases by ~0.4 dB. In hot attics or near machinery, cables experience higher noise floors, reducing SNR. Fiber optics are less affected by temperature." },
  { q: "What is the difference between common-mode and differential-mode noise?", a: "Common-mode noise appears equally on both conductors relative to ground. Differential-mode noise appears opposite between the pair. Twisted pair rejects common-mode noise because it induces equal voltages that cancel at the differential receiver. Shielding primarily diverts common-mode currents to ground." },
  { q: "Why do UTP cables have twist rates?", a: "Different twist rates (number of twists per meter) for each pair reduce crosstalk between pairs. Pairs with different twist lengths don't align, so capacitive and inductive coupling averages out. For example, Cat6 has tighter twists (more twists per meter) than Cat5e, reducing crosstalk at higher frequencies." },
  { q: "What is 'ground loop' and how does it cause noise?", a: "A ground loop occurs when equipment is grounded at multiple points with different ground potentials. Current flows through the shield or ground wire, inducing hum and noise (typically 50/60 Hz). Solutions include using ground isolators, single-point grounding, or fiber optic links (which are non-conductive)." },
  { q: "How does cable length affect noise susceptibility?", a: "Longer cables act as larger antennas, picking up more electromagnetic interference. Attenuation also reduces signal strength, lowering SNR at the receiver. For example, a 100m UTP cable might work, but a 200m cable will have excessive attenuation and noise. That's why Ethernet has a 100m limit for copper." },
  { q: "What is 'alien crosstalk' and when does it matter?", a: "Alien crosstalk (AXT) is interference between adjacent cables, not between pairs inside one cable. It becomes significant in high-density installations with many bundled cables, especially at 10GBASE-T frequencies (500 MHz). Cat6a and Cat7 cables have improved alien crosstalk cancellation via tighter tolerances and shielding." },
  { q: "How do repeaters and amplifiers affect noise?", a: "Amplifiers boost both signal and noise (they cannot distinguish them). Each amplifier adds its own noise figure, degrading SNR. Repeaters regenerate the digital signal (detect 0/1 and retransmit a clean signal), effectively resetting noise accumulation. That's why digital repeaters are used in long-haul fiber links, not analog amplifiers." },
  { q: "What is 'noise figure' and why is it important for receivers?", a: "Noise figure (NF) quantifies how much a receiver degrades the SNR. A receiver with NF = 3 dB adds as much noise as a 3 dB reduction in signal. Lower NF is better. High-quality satellite LNBs (Low Noise Block downconverters) have NF as low as 0.5 dB. For Wi-Fi, typical NF is 5-10 dB." }
];

export default Topic20;