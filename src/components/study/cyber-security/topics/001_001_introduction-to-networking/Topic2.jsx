import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic2_files/topic2_questions';

const Topic2 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes slideLine {
      0% { stroke-dashoffset: 300; }
      100% { stroke-dashoffset: 0; }
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
    .animate-slide-line {
      animation: slideLine 2s ease-out forwards;
      stroke-dasharray: 300;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-slide-line {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  const milestones = [
    {
      year: '1960s',
      title: 'ARPANET Begins',
      desc: 'The first packet-switching network, funded by DARPA. The first message was sent between UCLA and Stanford in 1969.',
      icon: '📡',
    },
    {
      year: '1970s',
      title: 'TCP/IP Developed',
      desc: 'Vint Cerf and Bob Kahn designed TCP/IP, the protocol suite that became the foundation of the internet.',
      icon: '🌐',
    },
    {
      year: '1980s',
      title: 'Ethernet & LANs',
      desc: 'Ethernet (1980) and the rise of local area networks. The first commercial routers appeared.',
      icon: '🔗',
    },
    {
      year: '1990s',
      title: 'World Wide Web',
      desc: 'Tim Berners-Lee invented the Web in 1991. Browsers (Mosaic, Netscape) brought the internet to the public.',
      icon: '🕸️',
    },
    {
      year: '2000s',
      title: 'Broadband & Wi-Fi',
      desc: 'High-speed internet, wireless networking (802.11), and the dot-com boom transformed global connectivity.',
      icon: '📶',
    },
    {
      year: '2010s–Present',
      title: 'Mobile & Cloud',
      desc: 'Smartphones, 4G/5G, cloud computing, IoT, and AI-driven networks. The network is now everywhere.',
      icon: '☁️',
    },
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            History of Computer Networks
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            From ARPANET to the global Internet – a journey of innovation
          </p>
        </section>

        {/* --- Introduction: Why History Matters --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Why Study Network History?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Understanding the history of computer networks helps us appreciate why networks are
              designed the way they are today. From the military-driven <strong>ARPANET</strong> to
              the user-friendly <strong>World Wide Web</strong>, each decade brought breakthroughs
              that solved critical problems.
            </p>
            <p>
              Students like <strong>Debangshu</strong> and <strong>Mamata</strong> might wonder why
              we have IP addresses, why packets are used, or why the internet is so resilient.
              The answers lie in history – in the minds of pioneers like <strong>Vint Cerf</strong>,
              <strong>Bob Kahn</strong>, and <strong>Tim Berners-Lee</strong>.
            </p>
          </div>
        </section>

        {/* --- SVG Timeline (interactive visual) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Timeline of Networking Milestones
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm overflow-x-auto">
            <svg
              width="100%"
              height="180"
              viewBox="0 0 800 180"
              className="w-full max-w-4xl mx-auto h-auto"
              aria-label="Timeline of computer networking history"
            >
              {/* Background */}
              <rect width="800" height="180" fill="transparent" />

              {/* Horizontal timeline line */}
              <line
                x1="50"
                y1="90"
                x2="750"
                y2="90"
                stroke="#3b82f6"
                strokeWidth="4"
                className="dark:stroke-blue-400"
              >
                <animate attributeName="stroke-dashoffset" from="700" to="0" dur="2s" />
                <animate attributeName="stroke-dasharray" values="700" dur="2s" />
              </line>

              {/* Timeline nodes with labels */}
              {[
                { x: 80, year: '1969', label: 'ARPANET' },
                { x: 200, year: '1974', label: 'TCP/IP' },
                { x: 320, year: '1980', label: 'Ethernet' },
                { x: 440, year: '1991', label: 'Web' },
                { x: 560, year: '2000', label: 'Wi-Fi/Broadband' },
                { x: 680, year: '2010+', label: 'Cloud/5G' },
              ].map((item, idx) => (
                <g key={idx}>
                  {/* Circle */}
                  <circle
                    cx={item.x}
                    cy="90"
                    r="12"
                    fill="#3b82f6"
                    className="dark:fill-blue-400"
                    style={{ animationDelay: `${idx * 200}ms` }}
                  >
                    <animate attributeName="r" from="4" to="12" dur="0.5s" fill="freeze" />
                  </circle>
                  {/* Year label */}
                  <text
                    x={item.x}
                    y="70"
                    textAnchor="middle"
                    fill="#1e293b"
                    className="dark:fill-gray-300"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {item.year}
                  </text>
                  {/* Event label */}
                  <text
                    x={item.x}
                    y="115"
                    textAnchor="middle"
                    fill="#64748b"
                    className="dark:fill-gray-400"
                    fontSize="11"
                  >
                    {item.label}
                  </text>
                </g>
              ))}

              {/* Animated "packet" travelling along the timeline */}
              <circle r="6" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="50;750" dur="4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="90;90" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Key milestones that shaped today's networks.
          </p>
        </section>

        {/* --- Detailed Milestones (Cards) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Milestones in Detail
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {milestone.icon}
                  </span>
                  <span className="text-sm font-mono bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                    {milestone.year}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {milestone.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mt-1">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- In-depth Story: ARPANET and the First Message --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The First Network Message
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              On <strong>October 29, 1969</strong>, the first message was sent over ARPANET from
              UCLA to Stanford. The message was supposed to be <strong>"LOGIN"</strong>, but the
              system crashed after sending just the letters <strong>"LO"</strong> – the first
              network crash! Despite that, it marked the birth of practical packet-switching.
            </p>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This humble beginning, with a failed login attempt, evolved into the robust,
              fault-tolerant internet we use today. <strong>Susmita</strong> and{' '}
              <strong>Mahima</strong> might relate – even the pioneers faced technical glitches!
            </p>
          </div>
        </section>

        {/* --- Key Inventions and Their Impact --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Key Inventions That Changed Everything
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📦</span>
              <div>
                <strong>Packet Switching (1960s):</strong> Instead of circuit-switched (like phone calls),
                data is broken into packets and sent independently. This made networks efficient and
                resilient – a core idea still used today.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📜</span>
              <div>
                <strong>TCP/IP (1974):</strong> Standardised protocols that allow different networks to
                interconnect – the "internetworking" concept. Without TCP/IP, we'd have incompatible
                networks, like different languages.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🖥️</span>
              <div>
                <strong>Ethernet (1980):</strong> A standard for wired LANs, making it possible to
                connect many computers in offices and homes cheaply and reliably.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🌍</span>
              <div>
                <strong>World Wide Web (1991):</strong> Hypertext and browsers made the internet
                accessible to non-technical users. The web is what most people think of as "the internet".
              </div>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Remember that <strong>networks are built on layers</strong> – history shows each layer was added to solve a specific problem.</li>
                <li>Study the <strong>RFCs (Request for Comments)</strong> – they are the living documents of internet standards.</li>
                <li>Understand why <strong>decentralisation</strong> was chosen – it gives robustness against attacks and failures.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Confusing <strong>the Internet with the Web</strong> – the Web is an application that runs on the internet.</li>
                <li>Thinking that <strong>networks are static</strong> – they've always evolved and will continue to do so.</li>
                <li>Overlooking the <strong>role of governments and universities</strong> in early funding and research.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Historical Lessons for Today's Engineers
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Recognise that <strong>standards</strong> (like TCP/IP) are essential for interoperability.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Understand that <strong>security</strong> was an afterthought; now it's baked in from the start.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Appreciate the <strong>open nature</strong> of the internet – built by collaboration, not a single company.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Remember that <strong>failure is part of progress</strong> – the first network crash didn't stop innovation.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Think about <strong>future networks</strong> – what problems will we solve next?
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '800ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            How would the internet look if ARPANET had failed? What if TCP/IP hadn't been adopted?
            Observe how your devices use TCP/IP today – every request you make carries decades of
            history. Try changing your DNS settings to use a public resolver like 8.8.8.8 and see
            how that connects to the evolution of naming systems.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "History teaches us that great networks are built on collaboration and open standards. Emphasise to students that understanding the 'why' behind protocols (like why IP addresses are hierarchical) comes from historical challenges. Also, point out that the internet's success is partly due to its resilience – it was designed to survive nuclear war. That's a powerful lesson in engineering for failure."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="History of Computer Networks FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic2;