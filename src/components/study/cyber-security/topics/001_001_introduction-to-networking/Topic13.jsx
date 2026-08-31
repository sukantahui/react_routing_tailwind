import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic13_files/topic13_questions';

const Topic13 = () => {
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
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
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
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-pulse {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  const p2pCharacteristics = [
    'No central server – each node is both client and server',
    'Equal rights and responsibilities among peers',
    'Scalable – adding more peers increases capacity',
    'Self-organizing – nodes join/leave dynamically',
    'Resilient – no single point of failure',
    'Decentralized resource sharing (files, processing, bandwidth)',
  ];

  const p2pExamples = [
    {
      icon: '🎵',
      name: 'Napster (First Generation)',
      desc: 'Centralized indexing but decentralized file transfers. Pioneered P2P file sharing.',
    },
    {
      icon: '📡',
      name: 'BitTorrent (Second Generation)',
      desc: 'Fully decentralized using trackers and DHT. Efficient distribution of large files.',
    },
    {
      icon: '💸',
      name: 'Cryptocurrency (Bitcoin)',
      desc: 'Blockchain is a P2P network for distributed ledger and consensus.',
    },
    {
      icon: '💬',
      name: 'Bitcoin (Messaging)',
      desc: 'Alternative messaging protocols like Matrix use P2P for decentralized communication.',
    },
  ];

  const p2pAdvantages = [
    'No server costs – peers share resources',
    'Scalable – more peers add more resources',
    'Fault-tolerant – no central point of failure',
    'Privacy – no central authority logging all activity',
    'Resilient – works even if some peers go offline',
  ];

  const p2pDisadvantages = [
    'Security risks – peers may be malicious',
    'Inconsistent performance – depends on peer availability',
    'No central management – difficult to enforce policies',
    'Legal concerns – copyright infringement issues',
    'Network overhead – discovery and routing can be complex',
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
            Peer-to-Peer Network
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Decentralized networking – where every node is equal
          </p>
        </section>

        {/* --- Introduction: What is P2P? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            What is a Peer-to-Peer Network?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A <strong>Peer-to-Peer (P2P)</strong> network is a distributed architecture where
              each node (peer) acts as both a client and a server. Unlike the client-server model,
              there is no central authority. Peers share resources directly with each other, making
              P2P networks highly scalable, resilient, and cost-effective.
            </p>
            <p>
              P2P networks are used for <strong>file sharing</strong> (BitTorrent), <strong>cryptocurrency</strong>
              (Bitcoin), <strong>decentralized communication</strong> (Matrix), and <strong>content
                distribution</strong> (IPFS). They are the foundation of the Web3 movement.
            </p>
            <p>
              For students like <strong>Abhronila</strong> and <strong>Debangshu</strong> in
              <strong>Jadavpur</strong>, P2P means they can share study materials directly without
              uploading to a central server – reducing costs and improving privacy.
            </p>
          </div>

          {/* SVG: P2P Network Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="550"
              height="250"
              viewBox="0 0 550 250"
              className="w-full max-w-lg h-auto"
              aria-label="Illustration of a peer-to-peer network showing nodes interconnected without a central server"
            >
              <rect width="550" height="250" fill="transparent" />

              {/* Nodes data */}
              {(() => {
                const nodes = [
                  { x: 60, y: 40, label: "Peer A" },
                  { x: 200, y: 30, label: "Peer B" },
                  { x: 360, y: 40, label: "Peer C" },
                  { x: 480, y: 100, label: "Peer D" },
                  { x: 420, y: 190, label: "Peer E" },
                  { x: 260, y: 210, label: "Peer F" },
                  { x: 110, y: 180, label: "Peer G" },
                ];

                const connections = [
                  [0, 1],
                  [0, 2],
                  [0, 6],
                  [1, 2],
                  [1, 3],
                  [2, 3],
                  [2, 4],
                  [3, 4],
                  [3, 5],
                  [4, 5],
                  [5, 6],
                  [0, 5],
                ];

                const packets = [
                  [0, 2, 0.5],
                  [1, 5, 1],
                  [4, 2, 0],
                ];

                return (
                  <>
                    {/* Connections */}
                    {connections.map(([i, j], idx) => {
                      const p1 = nodes[i];
                      const p2 = nodes[j];

                      return (
                        <line
                          key={`connection-${idx}`}
                          x1={p1.x}
                          y1={p1.y}
                          x2={p2.x}
                          y2={p2.y}
                          stroke="#94a3b8"
                          strokeWidth="2"
                          className="dark:stroke-gray-500"
                        />
                      );
                    })}

                    {/* Animated data packets */}
                    {packets.map(([start, end, delay], idx) => {
                      const p1 = nodes[start];
                      const p2 = nodes[end];

                      return (
                        <circle
                          key={`packet-${idx}`}
                          r="5"
                          fill="#f59e0b"
                          className="dark:fill-yellow-400"
                        >
                          <animate
                            attributeName="cx"
                            values={`${p1.x};${p2.x};${p1.x}`}
                            dur="3s"
                            repeatCount="indefinite"
                            begin={`${delay}s`}
                          />

                          <animate
                            attributeName="cy"
                            values={`${p1.y};${p2.y};${p1.y}`}
                            dur="3s"
                            repeatCount="indefinite"
                            begin={`${delay}s`}
                          />
                        </circle>
                      );
                    })}

                    {/* Nodes */}
                    {nodes.map((node, idx) => (
                      <g key={`node-${idx}`}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="28"
                          fill="#ec4899"
                          className="dark:fill-pink-400"
                        />

                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          fill="white"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          {node.label}
                        </text>
                      </g>
                    ))}

                    {/* Description */}
                    <text
                      x="275"
                      y="240"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="12"
                    >
                      Fully connected mesh – no central server
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            In a P2P network, each peer connects directly to multiple other peers.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Key Characteristics of P2P Networks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {p2pCharacteristics.map((char, idx) => (
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

        {/* --- P2P Examples --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Well-Known P2P Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p2pExamples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {ex.icon}
                  </span>
                  <h3 className="font-semibold text-pink-600 dark:text-pink-400">
                    {ex.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {ex.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- P2P vs Client-Server Comparison --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            P2P vs Client-Server
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Aspect</th>
                  <th className="px-4 py-2 text-left">Client-Server</th>
                  <th className="px-4 py-2 text-left">Peer-to-Peer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-semibold">Central Authority</td>
                  <td className="px-4 py-2">Yes (server)</td>
                  <td className="px-4 py-2">No (decentralized)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Roles</td>
                  <td className="px-4 py-2">Server provides, clients consume</td>
                  <td className="px-4 py-2">Each peer is both client and server</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Scalability</td>
                  <td className="px-4 py-2">Server becomes bottleneck</td>
                  <td className="px-4 py-2">Scales with number of peers</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Fault Tolerance</td>
                  <td className="px-4 py-2">Server failure = system down</td>
                  <td className="px-4 py-2">Resilient – no single point</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Cost</td>
                  <td className="px-4 py-2">Server infrastructure expensive</td>
                  <td className="px-4 py-2">Lower cost – peers contribute resources</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Examples</td>
                  <td className="px-4 py-2">Websites, email, databases</td>
                  <td className="px-4 py-2">BitTorrent, Bitcoin, IPFS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Real-world Scenario: BitTorrent for Education --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Real-world Example: Sharing Course Materials
          </h2>
          <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg border border-pink-200 dark:border-pink-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At a university in <strong>Kolkata</strong>, students <strong>Mamata</strong> and
              <strong>Susmita</strong> need to distribute large lecture videos to the whole class.
              Instead of uploading to a central server (which may be slow or expensive), they use
              a P2P approach:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Initial seed:</strong> Mamata uploads the video to a torrent and shares the magnet link.</li>
              <li><strong>Peers download and upload:</strong> As each student downloads pieces, they also upload to others.</li>
              <li><strong>Scalable:</strong> The more students downloading, the faster the distribution (swarm effect).</li>
              <li><strong>Resilient:</strong> Even if the university server goes down, the files remain available among peers.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This is exactly how BitTorrent works – efficient, decentralized file distribution.
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of P2P
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {p2pAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {p2pDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Use <strong>DHT (Distributed Hash Table)</strong> for decentralized peer discovery.</li>
                <li>Implement <strong>reputation systems</strong> to mitigate malicious peers.</li>
                <li>Consider <strong>encryption</strong> for privacy (e.g., IPFS private networks).</li>
                <li>Monitor <strong>network churn</strong> – peers join/leave frequently.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Assuming <strong>all peers are trustworthy</strong> – they may be malicious.</li>
                <li>Overlooking <strong>NAT traversal</strong> – peers behind firewalls may not connect.</li>
                <li>Not handling <strong>peer churn</strong> – losing peers affects performance.</li>
                <li>Ignoring <strong>bandwidth consumption</strong> – uploading can be heavy.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ P2P Application Design Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Define peer roles:</strong> Are there super-peers or are all equal?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose discovery mechanism:</strong> Central tracker, DHT, or gossip.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Handle NAT traversal:</strong> Use STUN/TURN or UDP hole-punching.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement security:</strong> Authentication, encryption, and reputation.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test for churn:</strong> Simulate peers joining and leaving.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Optimize bandwidth:</strong> Use chunking and selective upload strategies.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '900ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Why is BitTorrent so resilient even when the tracker goes down? Observe how peers
            can still find each other using DHT. Try downloading a large file via torrent – notice
            how the speed increases as more peers join. This illustrates the power of decentralization.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "P2P is a paradigm shift from client-server. Emphasize the trade-offs: scalability and resilience vs. management and security. Use real-world examples like BitTorrent and Bitcoin to make it relatable. Also, discuss the legal and ethical aspects – P2P is a tool; its use can be for good (content distribution) or bad (piracy)."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Peer-to-Peer Networks FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic13;