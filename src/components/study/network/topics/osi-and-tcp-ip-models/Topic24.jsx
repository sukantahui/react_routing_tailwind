import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic24: Advantages of Layered Models
 * 
 * Purpose: Explain the key benefits of using layered architectures in networking,
 *          including interoperability, scalability, modularity, and easier troubleshooting.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: After understanding the models, students need to appreciate why layering
 *              is so valuable – this topic reinforces the "why" behind the models.
 */

const Topic24 = () => {
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
              Advantages of Layered Models
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Interoperability, scalability, troubleshooting ease – why layers make networking possible
            </p>
          </section>

          {/* Real-World Analogy: Car Manufacturing */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🚗 Real-World Analogy: Car Manufacturing
            </h2>
            <p>
              Imagine building a car from scratch. Without layers, one team would have to design everything: engine, tires, electronics, paint. If you change the engine, the whole car might break.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Modularity:</span> Different teams build engine, chassis, interior independently.</li>
              <li><span className="font-bold">Interoperability:</span> Standardized parts (e.g., tires) fit any car.</li>
              <li><span className="font-bold">Scalability:</span> You can upgrade the engine without redesigning the seats.</li>
              <li><span className="font-bold">Troubleshooting:</span> If the car won't start, you check battery first, then starter, then fuel – layer by layer.</li>
            </ul>
            <p>
              Networking layers provide the same benefits: they divide complex tasks into manageable, independent pieces.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> How would the internet work if every application had to understand physical cables and routing? Layering abstracts those details.
            </div>
          </section>

          {/* Core Advantages */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              ✅ Key Advantages of Layered Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <h3 className="font-bold text-lg">🌐 Interoperability</h3>
                <p>Different vendors can build products that work together because they follow standard protocols at each layer. An HP switch works with a Cisco router; a Linux web server talks to a Windows client.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <h3 className="font-bold text-lg">📈 Scalability</h3>
                <p>Networks can grow from small LANs to global internet because layers allow independent scaling. You can add more routers (network layer) without changing applications.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <h3 className="font-bold text-lg">🔧 Easier Troubleshooting</h3>
                <p>Problems can be isolated to a specific layer (e.g., no link light → physical layer; can't ping → network layer). This saves hours of guesswork.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <h3 className="font-bold text-lg">🧩 Modularity & Abstraction</h3>
                <p>Each layer can be developed and updated independently. You can upgrade Wi-Fi (physical/data link) without changing TCP/IP.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <h3 className="font-bold text-lg">🔄 Reusability</h3>
                <p>Higher layers reuse lower-layer services. HTTP can run over Ethernet, Wi-Fi, fiber – the same application works on any network.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <h3 className="font-bold text-lg">🚀 Faster Innovation</h3>
                <p>New protocols can be introduced at one layer without disrupting others. Example: IPv6 (network layer) coexists with IPv4; HTTP/3 (application) works over existing transport.</p>
              </div>
            </div>
          </section>

          {/* Comparison: Monolithic vs. Layered */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📊 Monolithic vs. Layered Design
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Without Layers (Monolithic)</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Any change breaks everything</li>
                  <li>No standardization – vendor lock-in</li>
                  <li>Difficult to troubleshoot</li>
                  <li>Cannot scale</li>
                  <li>Example: Early proprietary networks (IBM SNA, DECnet)</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-lg">With Layers (OSI/TCP/IP)</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Independent evolution</li>
                  <li>Standards enable competition</li>
                  <li>Isolate issues quickly</li>
                  <li>Grow from LAN to global internet</li>
                  <li>Example: Modern internet, everything interoperates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SVG Illustration: Layered Benefits */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: How Layers Deliver Benefits
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="350" viewBox="0 0 550 350" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradLayer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <rect x="100" y="30" width="350" height="40" fill="url(#gradLayer)" rx="5" />
                <text x="275" y="55" textAnchor="middle" fill="white" fontSize="12">Application (HTTP, FTP, DNS)</text>
                <rect x="100" y="80" width="350" height="40" fill="url(#gradLayer)" rx="5" />
                <text x="275" y="105" textAnchor="middle" fill="white" fontSize="12">Transport (TCP, UDP)</text>
                <rect x="100" y="130" width="350" height="40" fill="url(#gradLayer)" rx="5" />
                <text x="275" y="155" textAnchor="middle" fill="white" fontSize="12">Internet (IP, ICMP)</text>
                <rect x="100" y="180" width="350" height="40" fill="url(#gradLayer)" rx="5" />
                <text x="275" y="205" textAnchor="middle" fill="white" fontSize="12">Network Access (Ethernet, Wi-Fi)</text>

                {/* Benefit callouts */}
                <path d="M450 50 L500 50 L500 20 L480 20" stroke="#ffaa44" fill="none" strokeWidth="1.5" />
                <text x="505" y="35" fill="#ffaa44" fontSize="9">Interoperability: Any app over any medium</text>
                <path d="M450 100 L500 100 L500 70 L480 70" stroke="#ffaa44" fill="none" strokeWidth="1.5" />
                <text x="505" y="85" fill="#ffaa44" fontSize="9">Reliability: TCP retransmits</text>
                <path d="M450 150 L500 150 L500 120 L480 120" stroke="#ffaa44" fill="none" strokeWidth="1.5" />
                <text x="505" y="135" fill="#ffaa44" fontSize="9">Routing: IP connects networks</text>
                <path d="M450 200 L500 200 L500 170 L480 170" stroke="#ffaa44" fill="none" strokeWidth="1.5" />
                <text x="505" y="185" fill="#ffaa44" fontSize="9">Local delivery: MAC addresses</text>

                {/* Independent upgrade icons */}
                <text x="30" y="55" fill="#ffaa44" fontSize="10">🔄 Evolve independently</text>
                <text x="30" y="105" fill="#ffaa44" fontSize="10">🔄 New protocols (QUIC)</text>
                <text x="30" y="155" fill="#ffaa44" fontSize="10">🔄 IPv4 → IPv6</text>
                <text x="30" y="205" fill="#ffaa44" fontSize="10">🔄 Wi-Fi 6 → 7</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Each layer can evolve independently, yet they work together seamlessly.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When designing a system, <span className="font-bold">always think in layers</span> – it forces modularity and makes future changes easier.</li>
              <li><span className="font-bold">Use layering to explain complex systems</span> to non-technical people (e.g., the postal analogy).</li>
              <li><span className="font-bold">For troubleshooting, start at physical layer and work up</span> – it's systematic and avoids jumping to conclusions.</li>
              <li><span className="font-bold">Layered models also apply beyond networking</span> – software architecture (OSI-inspired), OS kernel layers, etc.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking more layers always improve performance.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Each layer adds overhead; balance is needed. TCP/IP's 4 layers were chosen for practicality.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming layering means complete isolation.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Layers communicate via interfaces; they are independent but not ignorant of each other's existence.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Layers are physical components."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> They are logical abstractions that help design and troubleshoot.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">When troubleshooting, use the OSI model as a mental checklist</span> – start at Physical and work up.</li>
              <li><span className="font-bold">Design applications to work with standard protocols</span> – they'll run over any network stack.</li>
              <li><span className="font-bold">Keep layers loosely coupled</span> – avoid "layer violations" where a higher layer assumes details of lower layers.</li>
              <li><span className="font-bold">Document your architecture in layers</span> – it helps new team members understand dependencies.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Interoperability: different vendors work together</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Scalability: from LAN to global internet</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Troubleshooting: isolate to a layer</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Modularity: independent development</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Abstraction: hide complexity from upper layers</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Reusability: same service, different media</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <Teacher 
              note={"Emphasize that these advantages are why layering is used in many fields (software, hardware). Use the car analogy to make it concrete. Challenge students to think of a real-world problem they solved by 'layering' their approach. This topic ties together the 'why' behind everything we've studied."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Think about a recent network problem you had. Was it a cable issue (Physical), a router misconfiguration (Network), or a server down (Application)? Layered thinking helped you diagnose quickly.</p>
            <p className="mt-2 text-sm">Try this: Next time you use a new Wi-Fi standard (Wi-Fi 6), note that your old applications still work. That's because the change was only at Network Access layer – higher layers were unaffected.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What does interoperability mean in networking?</p><p>Different vendors' devices and software can communicate because they follow standard protocols at each layer.</p></div>
              <div><p className="font-bold">2. How does layering improve scalability?</p><p>You can add devices or upgrade technology at one layer without redesigning the whole network. Example: adding routers (network layer) doesn't affect applications.</p></div>
              <div><p className="font-bold">3. Why is troubleshooting easier with layered models?</p><p>You can isolate problems to a specific layer (physical, data link, network, etc.) based on symptoms, reducing guesswork.</p></div>
              <div><p className="font-bold">4. What is modularity?</p><p>The ability to develop, update, and replace components independently. Each network layer can evolve separately.</p></div>
              <div><p className="font-bold">5. How does abstraction benefit higher layers?</p><p>Upper layers don't need to know details of physical transmission; they just use services provided by lower layers.</p></div>
              <div><p className="font-bold">6. Give an example of reusability in layered models.</p><p>HTTP (application) can run over Ethernet, Wi-Fi, or fiber – the same application works on any network because the lower layers are abstracted.</p></div>
              <div><p className="font-bold">7. How did layering enable the transition from IPv4 to IPv6?</p><p>IPv6 was introduced at the Internet layer while applications (HTTP, etc.) remained unchanged – they still use sockets.</p></div>
              <div><p className="font-bold">8. What would be the downside of a monolithic (non-layered) network architecture?</p><p>No interoperability, difficult to upgrade, vendor lock-in, hard to troubleshoot, cannot scale.</p></div>
              <div><p className="font-bold">9. Does layering add overhead? If so, why is it still beneficial?</p><p>Yes, each layer adds headers, but the benefits (interoperability, modularity, etc.) far outweigh the small overhead.</p></div>
              <div><p className="font-bold">10. How does a layered approach help with security?</p><p>Security can be implemented at multiple layers (firewall at network, TLS at transport/application), providing defense in depth.</p></div>
              <div><p className="font-bold">11. What is a "layer violation"? Give an example.</p><p>When a higher layer assumes details of a lower layer (e.g., an application assuming a particular MTU). This breaks modularity.</p></div>
              <div><p className="font-bold">12. Can layering be applied outside networking? Give an example.</p><p>Yes, software architecture (e.g., presentation, business, data layers), operating systems (kernel, system calls, user space).</p></div>
              <div><p className="font-bold">13. Why is the OSI model still taught despite TCP/IP being dominant?</p><p>Because its 7 layers provide a finer-grained framework for understanding concepts and troubleshooting.</p></div>
              <div><p className="font-bold">14. How does layering enable innovation?</p><p>New protocols can be introduced at one layer without waiting for others to update. Example: QUIC (UDP-based) works with existing TCP/IP stack.</p></div>
              <div><p className="font-bold">15. What is the primary benefit of layering for network engineers?</p><p>It provides a structured way to design, implement, and troubleshoot networks – a common language and mental model.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic24;