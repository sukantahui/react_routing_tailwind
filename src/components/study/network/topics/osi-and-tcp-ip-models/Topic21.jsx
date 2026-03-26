import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic21: Real-World Analogy – Postal System / Courier Service
 * 
 * Purpose: Use the familiar postal system to explain layered communication,
 *          mapping each layer of the OSI/TCP/IP models to a step in sending a letter.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Analogies make abstract networking concepts tangible.
 *              This topic reinforces layered architecture by comparing it to everyday mail delivery.
 */

const Topic21 = () => {
  // Keyframes for fade-slide-up animation
  const keyframesStyle = `
    @keyframes fadeSlideUp {
      0% {
        opacity: 0;
        transform: translateY(1.5rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Hero Section */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              The Postal System Analogy
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              How sending a letter explains layered communication – from mailbox to doorstep
            </p>
          </section>

          {/* The Story: Swadeep sends a letter to Tuhina */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              📬 The Story: Swadeep writes to Tuhina
            </h2>
            <p>
              <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to send a birthday invitation to his cousin <strong>Tuhina</strong> in <strong>Shyamnagar</strong>. 
              He doesn't need to know how the postal service works internally – he just drops the letter in a mailbox, and it arrives days later.
            </p>
            <p className="mt-2">
              Let's trace the journey and see how it mirrors network layers.
            </p>
          </section>

          {/* Mapping Table: Postal System → OSI Layers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🗺️ Postal System → OSI Layers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2 text-left">Postal Step</th>
                    <th className="border p-2 text-left">Network Layer</th>
                    <th className="border p-2 text-left">Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Write letter (message)</td><td className="border p-2">Application</td><td className="border p-2">User creates the data (HTTP request, email, etc.).</td></tr>
                  <tr><td className="border p-2">Put in envelope, add stamps</td><td className="border p-2">Presentation</td><td className="border p-2">Data formatting, encryption (stamps = postage, like security).</td></tr>
                  <tr><td className="border p-2">Address envelope: name & city</td><td className="border p-2">Session</td><td className="border p-2">Identifies the recipient application (like a port number).</td></tr>
                  <tr><td className="border p-2">Drop in mailbox</td><td className="border p-2">Transport</td><td className="border p-2">Hands off to the postal service (TCP/UDP).</td></tr>
                  <tr><td className="border p-2">Post office sorts by city/region</td><td className="border p-2">Network</td><td className="border p-2">Routing: decides which truck/plane to use (IP routing).</td></tr>
                  <tr><td className="border p-2">Local post office delivers to street address</td><td className="border p-2">Data Link</td><td className="border p-2">Local delivery using MAC address (street address).</td></tr>
                  <tr><td className="border p-2">Postal worker walks to the door</td><td className="border p-2">Physical</td><td className="border p-2">Physical transmission (walking, vehicle, etc.).</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step-by-Step with Detailed Explanations */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📮 Step-by-Step: From Mailbox to Doorstep
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">1. Application Layer (User Message)</h3>
                <p>Swadeep writes the invitation. This is the user data – just like an HTTP request.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">2. Presentation Layer (Envelope & Stamps)</h3>
                <p>He puts it in an envelope (formatting) and adds stamps (like encryption/authentication).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">3. Session Layer (Addressing: Name/City)</h3>
                <p>He writes "Tuhina, Shyamnagar". This identifies the recipient (like a destination port).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">4. Transport Layer (Drop in Mailbox)</h3>
                <p>He drops it in a mailbox – hands it off to the postal service (TCP/UDP).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">5. Network Layer (Sorting & Routing)</h3>
                <p>The postal hub sorts by city, decides which truck/plane to use (routing).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">6. Data Link Layer (Local Delivery)</h3>
                <p>The local post office uses the street address (MAC) to deliver to the right house.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">7. Physical Layer (Walking to Door)</h3>
                <p>The postal worker physically walks to the doorstep – the actual transmission.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Decapsulation (Receiver)</h3>
                <p>Tuhina receives the letter, opens the envelope, reads the message – reverse process.</p>
              </div>
            </div>
          </section>

          {/* SVG Illustration: Postal System Layered Communication */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: The Postal Journey
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="350" viewBox="0 0 550 350" className="max-w-full h-auto">
                <rect x="30" y="20" width="80" height="40" fill="#3b82f6" rx="4" />
                <text x="70" y="45" textAnchor="middle" fill="white" fontSize="9">Swadeep</text>
                <rect x="440" y="20" width="80" height="40" fill="#10b981" rx="4" />
                <text x="480" y="45" textAnchor="middle" fill="white" fontSize="9">Tuhina</text>

                <path d="M110 40 L150 40 L150 80 L200 80" stroke="gray" fill="none" strokeWidth="1" />
                <rect x="200" y="70" width="150" height="30" fill="#f59e0b" rx="4" />
                <text x="275" y="90" textAnchor="middle" fill="white" fontSize="9">Mailbox (Transport)</text>
                <path d="M350 85 L400 85 L400 120 L440 120" stroke="gray" fill="none" strokeWidth="1" />
                <rect x="200" y="120" width="150" height="30" fill="#ef4444" rx="4" />
                <text x="275" y="140" textAnchor="middle" fill="white" fontSize="9">Sorting Center (Network)</text>
                <path d="M350 135 L400 135 L400 170 L440 170" stroke="gray" fill="none" strokeWidth="1" />
                <rect x="200" y="170" width="150" height="30" fill="#8b5cf6" rx="4" />
                <text x="275" y="190" textAnchor="middle" fill="white" fontSize="9">Local Post Office (Data Link)</text>
                <path d="M350 185 L400 185 L400 220 L440 220" stroke="gray" fill="none" strokeWidth="1" />
                <rect x="200" y="220" width="150" height="30" fill="#06b6d4" rx="4" />
                <text x="275" y="240" textAnchor="middle" fill="white" fontSize="9">Delivery Worker (Physical)</text>
                <path d="M350 235 L400 235 L400 40 L440 40" stroke="gray" fill="none" strokeWidth="1" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="2s" repeatCount="indefinite" />
                </path>
                <text x="275" y="280" textAnchor="middle" fill="currentColor" fontSize="12">Encapsulation: letter → envelope → sorted → delivered</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Each step in the postal system corresponds to a network layer. The user only interacts with the top (writing) and bottom (receiving).
            </p>
          </section>

          {/* Encapsulation/Decapsulation in Postal Terms */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              📦 Encapsulation & Decapsulation (Postal Style)
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><span className="font-bold">Encapsulation:</span> Swadeep puts the letter in an envelope → adds stamps → writes address → drops in mailbox. Each step adds "headers" (envelope, stamps, address).</li>
              <li><span className="font-bold">Decapsulation:</span> Tuhina receives the letter, removes the envelope, reads the message – stripping away layers in reverse.</li>
              <li><span className="font-bold">Checkpoints:</span> If the letter gets lost, the postal service might have tracking (like TCP sequence numbers) to know where it was last seen.</li>
            </ul>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When explaining networking to non-technical people, <span className="font-bold">start with the postal analogy</span> – it's universally understood.</li>
              <li>Use this analogy to teach encapsulation: "Each layer wraps the data like an envelope."</li>
              <li>To explain TCP vs UDP: Registered mail (tracking) vs. standard mail (no tracking).</li>
              <li>The postal system also has "routing" – letters can take different paths; similar to IP routing.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking the postal worker is the only layer.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Many layers (mailbox, sorting, transport, local post) work together, just like network layers.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing the analogy is perfect.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> No analogy is perfect, but it's a great starting point.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "The postal service is connection-oriented like TCP."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Standard mail is connectionless (like UDP), registered mail is connection-oriented (like TCP).
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When learning a new protocol, ask: "What would this be in the postal system?"</li>
              <li>Use the analogy to explain complex topics like routing, encapsulation, and error control.</li>
              <li>Encourage students to come up with their own analogies – it deepens understanding.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Letter = user data (Application layer)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Envelope & stamps = Presentation</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Addressing = Session/Ports</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Mailbox = Transport (handoff)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Sorting center = Network (routing)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Local post office = Data Link (MAC)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Delivery worker = Physical</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"This analogy is a favorite among educators. Let students build the table themselves – have them map postal steps to network layers. Use it to explain why IP addresses (city) are separate from MAC addresses (street address). Also highlight that different postal services (express, registered) map to TCP vs UDP."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you send a letter, you don't think about the sorting machines or trucks. That's abstraction. In networking, applications don't need to know about routers or cables.</p>
            <p className="mt-2 text-sm">Try this: Write a short story about a package traveling from Barrackpore to Shyamnagar, describing each "layer" of handling. Then map those layers to OSI.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What does the "mailbox" represent in the postal analogy?</p><p>It represents the Transport layer – where the user hands off data to the network.</p></div>
              <div><p className="font-bold">2. What layer does the sorting center correspond to?</p><p>Network layer – it routes letters based on destination (city/region).</p></div>
              <div><p className="font-bold">3. In the postal analogy, what is the equivalent of a MAC address?</p><p>The street address – used for local delivery by the local post office (Data Link layer).</p></div>
              <div><p className="font-bold">4. What is the equivalent of an IP address?</p><p>The city and postal code – used for routing between cities (Network layer).</p></div>
              <div><p className="font-bold">5. What does the envelope represent?</p><p>Presentation layer – it formats the letter and may include stamps (encryption).</p></div>
              <div><p className="font-bold">6. Which postal service type is like TCP? Which is like UDP?</p><p>Registered mail (tracking, confirmation) = TCP; standard mail (no tracking) = UDP.</p></div>
              <div><p className="font-bold">7. How does the postal analogy explain encapsulation?</p><p>The letter is placed in an envelope (header), then placed in a postal bag (another header), etc.</p></div>
              <div><p className="font-bold">8. What would a "CRC" or checksum be in the postal system?</p><p>Could be a tracking barcode or weight check to detect damage.</p></div>
              <div><p className="font-bold">9. What happens if a letter gets lost? How does that relate to networking?</p><p>It's like packet loss; higher layers (TCP) may retransmit, like sending a duplicate letter.</p></div>
              <div><p className="font-bold">10. What does the "delivery worker" represent?</p><p>Physical layer – the actual transmission of the letter (walking, driving).</p></div>
              <div><p className="font-bold">11. How would you explain a "port number" using the postal analogy?</p><p>It's like the recipient's name or department – identifies which application gets the letter.</p></div>
              <div><p className="font-bold">12. What is the role of the "local post office" in the analogy?</p><p>Data Link layer – it handles delivery within the same neighborhood using street addresses (MAC).</p></div>
              <div><p className="font-bold">13. Can the postal analogy explain fragmentation?</p><p>Yes – a large package might be split into multiple smaller parcels (fragmentation) and reassembled at the destination.</p></div>
              <div><p className="font-bold">14. What is the equivalent of a "router" in the postal system?</p><p>The sorting hub that decides which truck/plane to send the letter to next.</p></div>
              <div><p className="font-bold">15. Why is the postal analogy so effective for teaching networking?</p><p>Because it's a familiar system with similar layers of abstraction, encapsulation, and addressing.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic21;