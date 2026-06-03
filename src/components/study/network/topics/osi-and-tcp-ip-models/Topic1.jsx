import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/questions';

/**
 * Topic1: Concept of Protocols, Services, and Interfaces
 * 
 * Purpose: Explain how layers communicate through protocols, services, and interfaces,
 *          introduce Service Access Points (SAP), and establish the rules of layer interaction.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Essential for understanding the "glue" that binds layers together.
 */

const Topic1 = () => {
  // Keyframes for fade-slide-up animation (inline style to respect no external CSS)
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
        {/* Main container - stacked sections */}
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Section 1: Hero / Title */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Protocols, Services, and Interfaces
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              How layers communicate: the rules, the tools, and the meeting points
            </p>
          </section>

          {/* Section 2: Real-World Analogy (Restaurant Kitchen) - Staggered delay */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🍽️ Real-World Analogy: Restaurant Kitchen
            </h2>
            <p className="mb-3">
              Imagine <strong>Susmita</strong> is the chef, <strong>Debangshu</strong> is the waiter, and <strong>Abhronila</strong> is the customer at a restaurant in <strong>Ichapur</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
              <li><span className="font-bold">Protocol:</span> The agreed rules — “Customer says order, waiter writes ticket, chef cooks, waiter serves.”</li>
              <li><span className="font-bold">Service:</span> The chef provides “cooking service” to the waiter (not directly to the customer).</li>
              <li><span className="font-bold">Interface:</span> The ticket window where the waiter places orders and receives food. This is the <strong className="text-blue-600">Service Access Point (SAP)</strong>.</li>
            </ul>
            <p>
              Just like this, in networking, each layer offers services to the layer above via a SAP, following a strict protocol.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> What if the waiter shouted orders randomly? Or the chef didn’t have a standard way to receive orders? Protocols keep communication organized.
            </div>
          </section>

          {/* Section 3: Core Concepts - Protocols, Services, Interfaces */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📚 The Three Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">📜</div>
                <h3 className="font-bold text-xl">Protocol</h3>
                <p className="mt-2 text-sm">A set of rules and conventions that govern how peer layers communicate. Defines syntax, semantics, and timing.</p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Example: HTTP defines how web browsers and servers talk.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔧</div>
                <h3 className="font-bold text-xl">Service</h3>
                <p className="mt-2 text-sm">What a layer provides to the layer above. It's an abstract capability, hiding implementation details.</p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Example: Transport layer offers reliable data delivery (TCP) or fast but unreliable (UDP).</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔌</div>
                <h3 className="font-bold text-xl">Interface</h3>
                <p className="mt-2 text-sm">How a layer accesses the services of the layer below. It defines operations, parameters, and the SAP.</p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Example: Socket API (bind, connect, send) is the interface between application and transport layer.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Service Access Points (SAP) */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🎯 Service Access Points (SAP) – The Meeting Points
            </h2>
            <p>
              A <strong className="text-purple-600">Service Access Point (SAP)</strong> is the specific location (address) where a layer can request services from the layer below. 
              Think of it like a <span className="italic">doorway</span> between layers.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><span className="font-bold">In TCP/IP:</span> Port numbers (e.g., 80 for HTTP) are SAPs for the transport layer to deliver data to the correct application.</li>
              <li><span className="font-bold">In data link layer:</span> MAC addresses act as SAPs for the network layer to identify a specific network interface.</li>
              <li><span className="font-bold">In physical layer:</span> Connectors like RJ45 jacks are physical SAPs.</li>
            </ul>
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              💡 <span className="font-medium">Key Insight:</span> Without SAPs, a layer wouldn't know which higher-layer entity to pass data to. SAPs enable multiplexing.
            </div>
          </section>

          {/* Section 5: SVG Illustration - Peer Communication & SAPs */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: Peer Communication & SAPs
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="600" height="350" viewBox="0 0 600 350" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradPeer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* Host A */}
                <text x="80" y="20" fill="currentColor" fontSize="12" fontWeight="bold">Host A (Sender)</text>
                <rect x="30" y="30" width="150" height="250" fill="none" stroke="gray" strokeWidth="1" strokeDasharray="4" />
                
                {/* Application Layer */}
                <rect x="40" y="40" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="105" y="62" textAnchor="middle" fill="white" fontSize="12">Application</text>
                {/* SAP from App to Transport */}
                <circle cx="105" cy="80" r="8" fill="#ffaa44" stroke="none" />
                <text x="105" y="84" textAnchor="middle" fill="black" fontSize="10">SAP</text>
                <line x1="105" y1="85" x2="105" y2="100" stroke="#ffaa44" strokeWidth="2" strokeDasharray="3 2" />
                
                {/* Transport Layer */}
                <rect x="40" y="100" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="105" y="122" textAnchor="middle" fill="white" fontSize="12">Transport</text>
                {/* SAP from Transport to Network */}
                <circle cx="105" cy="140" r="8" fill="#ffaa44" stroke="none" />
                <text x="105" y="144" textAnchor="middle" fill="black" fontSize="10">SAP</text>
                <line x1="105" y1="145" x2="105" y2="160" stroke="#ffaa44" strokeWidth="2" strokeDasharray="3 2" />
                
                {/* Network Layer */}
                <rect x="40" y="160" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="105" y="182" textAnchor="middle" fill="white" fontSize="12">Network</text>
                {/* SAP from Network to Data Link */}
                <circle cx="105" cy="200" r="8" fill="#ffaa44" stroke="none" />
                <text x="105" y="204" textAnchor="middle" fill="black" fontSize="10">SAP</text>
                <line x1="105" y1="205" x2="105" y2="220" stroke="#ffaa44" strokeWidth="2" strokeDasharray="3 2" />
                
                {/* Data Link */}
                <rect x="40" y="220" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="105" y="242" textAnchor="middle" fill="white" fontSize="12">Data Link</text>

                {/* Physical medium line */}
                <line x1="190" y1="255" x2="410" y2="255" stroke="#aaa" strokeWidth="2" strokeDasharray="5 5" />

                {/* Host B */}
                <text x="500" y="20" fill="currentColor" fontSize="12" fontWeight="bold">Host B (Receiver)</text>
                <rect x="420" y="30" width="150" height="250" fill="none" stroke="gray" strokeWidth="1" strokeDasharray="4" />
                
                {/* Application Layer */}
                <rect x="430" y="40" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="495" y="62" textAnchor="middle" fill="white" fontSize="12">Application</text>
                <circle cx="495" cy="80" r="8" fill="#ffaa44" stroke="none" />
                <text x="495" y="84" textAnchor="middle" fill="black" fontSize="10">SAP</text>
                <line x1="495" y1="85" x2="495" y2="100" stroke="#ffaa44" strokeWidth="2" strokeDasharray="3 2" />
                
                {/* Transport Layer */}
                <rect x="430" y="100" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="495" y="122" textAnchor="middle" fill="white" fontSize="12">Transport</text>
                <circle cx="495" cy="140" r="8" fill="#ffaa44" stroke="none" />
                <text x="495" y="144" textAnchor="middle" fill="black" fontSize="10">SAP</text>
                <line x1="495" y1="145" x2="495" y2="160" stroke="#ffaa44" strokeWidth="2" strokeDasharray="3 2" />
                
                {/* Network Layer */}
                <rect x="430" y="160" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="495" y="182" textAnchor="middle" fill="white" fontSize="12">Network</text>
                <circle cx="495" cy="200" r="8" fill="#ffaa44" stroke="none" />
                <text x="495" y="204" textAnchor="middle" fill="black" fontSize="10">SAP</text>
                <line x1="495" y1="205" x2="495" y2="220" stroke="#ffaa44" strokeWidth="2" strokeDasharray="3 2" />
                
                {/* Data Link */}
                <rect x="430" y="220" width="130" height="35" rx="6" fill="url(#gradPeer)" />
                <text x="495" y="242" textAnchor="middle" fill="white" fontSize="12">Data Link</text>

                {/* Arrows for peer communication */}
                <path d="M 190 257 L 250 257 L 250 190 L 410 190 L 410 257" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="0;14" dur="2s" repeatCount="indefinite" />
                </path>
                <text x="300" y="170" fill="#10b981" fontSize="10">Peer Protocol</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              <span className="font-bold">Vertical communication</span> uses SAPs (yellow circles). <span className="font-bold">Horizontal communication</span> follows protocol rules.
            </p>
          </section>

          {/* Section 6: Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use Wireshark</span> to inspect protocol headers — you'll see how SAPs like ports and MAC addresses are used.</li>
              <li><span className="font-bold">Think in terms of “service contracts”</span>: each layer promises certain behavior to the layer above, regardless of how it's implemented.</li>
              <li><span className="font-bold">Remember the difference:</span> Protocol = horizontal (peer to peer), Interface = vertical (adjacent layers).</li>
              <li><span className="font-bold">SAPs are often numerical identifiers</span> — port numbers, protocol numbers, ethertypes.</li>
            </ul>
          </section>

          {/* Section 7: Common Mistakes & Misconceptions */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing protocols with services. A protocol is the rule set; a service is the capability offered.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> TCP is a protocol that provides a reliable stream service.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing SAPs are physical connectors only.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> SAPs are logical addresses (ports, protocol numbers) that identify where to pass data.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "The interface is the same as the protocol."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> The interface is how a layer <em>uses</em> the layer below; the protocol defines how peer layers <em>talk</em>.
              </div>
            </div>
          </section>

          {/* Section 8: Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices for Learning
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When studying a new protocol, identify: <span className="italic">"Which service does it provide? What's the SAP? What are the rules?"</span></li>
              <li>Draw layer diagrams with SAP labels to visualize data flow.</li>
              <li>Use <span className="font-bold">netstat</span> or <span className="font-bold">ss</span> commands to see active SAPs (ports) on your system.</li>
              <li>Remember: SAPs enable <span className="font-bold">multiplexing/demultiplexing</span> — multiple higher-layer entities share the same lower-layer service.</li>
            </ul>
          </section>

          {/* Section 9: Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Protocols = rules for peer communication</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Services = capabilities provided by a layer</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Interface = how to access services (with SAP)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> SAP = specific access point (e.g., port number)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layers talk vertically via SAPs, horizontally via protocols</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Interfaces hide implementation details</div>
            </div>
          </section>

          {/* Section 10: Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <Teacher 
              note={"Use the restaurant analogy repeatedly — students immediately understand roles. Emphasize that SAPs are like order windows: they ensure the right order goes to the right chef. Also, highlight the concept of multiplexing: one transport layer (chef) can serve multiple applications (waiters) via different ports (order windows)."}
            />
          </div>

          {/* FAQ */}
          <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
            <FAQTemplate
              title="Mutable vs Immutable Strings – FAQs"
              questions={questions}
            />
          </div>

          {/* Section 11: Hint */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Think about…</span></p>
            <p className="mt-1">If two different applications (e.g., web browser and email client) both want to send data over TCP, how does the transport layer know which application gets which data? That's the job of SAPs — port numbers.</p>
            <p className="mt-2 text-sm">Observe carefully in the SVG: why are there SAP circles at every layer boundary? They allow multiple upper-layer entities to share the same lower-layer service.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic1;