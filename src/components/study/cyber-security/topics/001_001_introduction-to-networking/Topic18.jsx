import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic18_files/topic18_questions';

const Topic18 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(236, 72, 153, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.6s ease-out forwards;
    }
    .animate-pulse-glow {
      animation: pulseGlow 2s infinite;
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    .animate-rotate {
      animation: rotate 10s linear infinite;
    }
    .animate-dash {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      animation: dash 2s ease-in-out forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-rotate,
      .animate-dash {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  const ringCharacteristics = [
    'Devices are connected in a closed loop (ring)',
    'Each device connects to exactly two neighbors (left and right)',
    'Data travels in one direction (or both in dual-ring)',
    'A token is often used to control access (Token Ring)',
    'Well-suited for reliable, high-performance networks',
    'Single ring failure can bring down the network (dual-ring provides redundancy)',
  ];

  const ringComponents = [
    {
      icon: '🔄',
      name: 'Ring Topology',
      desc: 'The logical and physical layout forms a circular path for data.',
    },
    {
      icon: '🖥️',
      name: 'Nodes/Devices',
      desc: 'Devices connected in the ring, each acting as a repeater (regenerating signals).',
    },
    {
      icon: '🎫',
      name: 'Token (Token Ring)',
      desc: 'A special frame that circulates the ring, granting permission to transmit.',
    },
    {
      icon: '🔌',
      name: 'MAU (Multistation Access Unit)',
      desc: 'A device used in Token Ring networks to connect nodes in a star-like physical layout.',
    },
    {
      icon: '🔁',
      name: 'Dual Ring',
      desc: 'Two rings in opposite directions for fault tolerance (used in FDDI).',
    },
  ];

  const ringAdvantages = [
    'Deterministic performance – data travels in a predictable path',
    'No collisions – token-based access control',
    'High reliability with dual-ring configurations',
    'All devices have equal priority (fair access)',
    'Well-suited for time-sensitive applications',
    'Fault isolation is straightforward',
  ];

  const ringDisadvantages = [
    'A single break in the ring brings down the network (without dual-ring)',
    'Adding or removing devices requires network disruption',
    'Complexity – more challenging to implement and manage than star',
    'Expensive – requires specialized hardware (MAUs, token ring adapters)',
    'Less scalable than star topology',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* --- Title Section --- */}
        <section
          className="text-center animate-fade-slide-up"
          style={{ animationDelay: '0ms' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
            Ring Topology
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The circular network – where every device is connected to two others
          </p>
        </section>

        {/* --- Introduction: What is Ring Topology? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            What is Ring Topology?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Ring topology</strong> is a network architecture where devices are connected
              in a circular loop (ring). Each device has exactly two neighbors – one on each side.
              Data travels around the ring in a predictable path, often in one direction (unidirectional)
              or both directions (bidirectional with dual-ring).
            </p>
            <p>
              Ring topology uses a <strong>token-based</strong> access method (like Token Ring
              and FDDI). A token circulates the ring; a device can transmit only when it has the
              token. This eliminates collisions and provides deterministic performance.
            </p>
            <p>
              For students in <strong>Jadavpur</strong>, understanding ring topology is important
              because it introduces concepts like token passing, deterministic networking, and
              fault tolerance. Though less common today, ring topology is still used in some
              high-reliability networks.
            </p>
          </div>

          {/* SVG: Ring Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="550"
              height="300"
              viewBox="0 0 550 300"
              className="w-full max-w-xl h-auto"
              aria-label="Illustration of ring topology showing devices connected in a circular loop with token passing"
            >
              <rect width="550" height="300" fill="transparent" />

              {/* Ring path (circle) */}
              <circle cx="275" cy="150" r="110" fill="none" stroke="#ec4899" strokeWidth="4" className="dark:stroke-pink-400">
                <animate attributeName="stroke-dasharray" values="0, 690" dur="2s" fill="freeze" />
              </circle>

              {/* Devices on ring */}
              {[
                { x: 275, y: 40, label: 'PC 1' },
                { x: 385, y: 105, label: 'PC 2' },
                { x: 385, y: 195, label: 'Printer' },
                { x: 275, y: 260, label: 'Server' },
                { x: 165, y: 195, label: 'PC 3' },
                { x: 165, y: 105, label: 'PC 4' },
              ].map((dev, idx) => (
                <g key={idx}>
                  <rect
                    x={dev.x - 30}
                    y={dev.y - 20}
                    width="60"
                    height="40"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={dev.x}
                    y={dev.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {dev.label}
                  </text>
                </g>
              ))}

              {/* Token (animated) */}
              <circle r="10" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate
                  attributeName="cx"
                  values="275;385;385;275;165;165;275"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="40;105;195;260;195;105;40"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
              <text x="275" y="20" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Token</text>

              {/* Direction arrows (clockwise) */}
              <path
                d="M 275 40 L 385 105"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 385 105 L 385 195"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 385 195 L 275 260"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 275 260 L 165 195"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 165 195 L 165 105"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
              <path
                d="M 165 105 L 275 40"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />

              {/* Arrowhead marker */}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                </marker>
              </defs>

              {/* Labels */}
              <text x="275" y="295" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Token circulates clockwise; devices transmit when they hold the token
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            In ring topology, devices form a circle and a token circulates to control transmission.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Key Characteristics of Ring Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ringCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-pink-500 dark:text-pink-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Components of Ring Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Components of a Ring Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ringComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-xl">{comp.icon}</span>
                <div>
                  <h3 className="font-semibold text-pink-600 dark:text-pink-400">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- How Ring Topology Works --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            How Ring Topology Works
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🎫</span>
              <div>
                <strong>Token Passing:</strong> A special frame called a <strong>token</strong>
                circulates around the ring. Only the device holding the token can transmit data.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📤</span>
              <div>
                <strong>Transmission:</strong> When a device has data to send, it waits for the
                token, captures it, and transmits the data frame around the ring.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📥</span>
              <div>
                <strong>Reception:</strong> Each device examines the data frame as it passes. The
                intended recipient copies the data, and the frame continues back to the sender.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔄</span>
              <div>
                <strong>Fault Recovery:</strong> In a single ring, a break stops all communication.
                In a <strong>dual ring</strong>, traffic can reroute in the opposite direction.
              </div>
            </div>
          </div>
        </section>

        {/* --- Token Ring vs FDDI --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Token Ring vs FDDI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">🔵 Token Ring (IEEE 802.5)</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Speed:</strong> 4 Mbps or 16 Mbps</li>
                <li><strong>Topology:</strong> Logical ring, physical star (MAU)</li>
                <li><strong>Access:</strong> Token passing</li>
                <li><strong>Medium:</strong> Twisted pair</li>
                <li><strong>Popular:</strong> 1980s–1990s, now obsolete</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">🟢 FDDI (Fiber Distributed Data Interface)</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Speed:</strong> 100 Mbps</li>
                <li><strong>Topology:</strong> Dual ring (redundant)</li>
                <li><strong>Access:</strong> Token passing</li>
                <li><strong>Medium:</strong> Fiber optics</li>
                <li><strong>Popular:</strong> Used in high-speed backbone networks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Real-world Scenario: Banking Network --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Real-world Example: Banking ATM Network
          </h2>
          <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg border border-pink-200 dark:border-pink-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Many banks historically used ring topology for their ATM networks. Here's why:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Deterministic:</strong> Guaranteed response time for transactions.</li>
              <li><strong>Reliable:</strong> Dual-ring configurations provided fault tolerance.</li>
              <li><strong>Token-based:</strong> No collisions, predictable performance.</li>
              <li><strong>Fibre optic:</strong> FDDI over fiber connected ATM machines across branches.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              A bank in <strong>Kolkata</strong> with ATMs across the city might have used FDDI
              to ensure all machines had reliable, uninterrupted connectivity.
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Ring Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {ringAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {ringDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Single Ring vs Dual Ring --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Single Ring vs Dual Ring
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">⚡ Single Ring</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li>Simple and cost-effective</li>
                <li>Data travels in one direction</li>
                <li><strong>Single point of failure:</strong> One break = entire network down</li>
                <li>Example: Early Token Ring networks</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">🔄 Dual Ring</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li>Two rings in opposite directions</li>
                <li><strong>Fault-tolerant:</strong> If one ring breaks, the other reroutes</li>
                <li>Higher cost and complexity</li>
                <li>Example: FDDI networks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '900ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>For critical networks, use <strong>dual-ring</strong> for redundancy.</li>
                <li>Use <strong>fiber optics</strong> for longer distances and higher speeds.</li>
                <li>Implement <strong>network monitoring</strong> to detect ring breaks quickly.</li>
                <li>Consider <strong>STP/RSTP</strong> with star topology for modern needs.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Not having a <strong>dual-ring</strong> for critical applications.</li>
                <li>Using <strong>copper</strong> for long distances (signal attenuation).</li>
                <li>Ignoring <strong>cable quality</strong> – affects signal integrity.</li>
                <li>Not <strong>documenting</strong> the ring topology – troubleshooting is hard.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '1000ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Ring Topology Deployment Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Determine ring type:</strong> Single or dual ring based on reliability needs.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose medium:</strong> Fiber for distance/speed, copper for cost.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Configure token management:</strong> Token rotation, priority schemes.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement monitoring:</strong> Detect breaks and performance issues.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test fault tolerance:</strong> Simulate ring breaks to verify recovery.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document:</strong> Ring layout, node positions, and configurations.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '1100ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Why do you think ring topology is less common today than star topology?
            Consider the complexity, cost, and the fact that Ethernet over twisted pair
            (with switches) provides better performance and scalability. What applications
            might still benefit from ring topology?
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Ring topology introduces the concept of token passing – a deterministic access method. Compare this with CSMA/CD in Ethernet to show the trade-offs. While ring topology is largely obsolete, FDDI and Token Ring are historically significant and illustrate key networking principles: fault tolerance (dual-ring), deterministic access, and the importance of physical vs logical topology."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Ring Topology FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic18;