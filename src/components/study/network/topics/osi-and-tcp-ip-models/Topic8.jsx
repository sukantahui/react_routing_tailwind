import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic8: Session Layer – session management, synchronization
 * 
 * Purpose: Explain the session layer's role in establishing, maintaining,
 *          and terminating sessions, as well as synchronization and dialog control.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Builds on transport layer to show how communication sessions are managed,
 *              including checkpoints for resilience and coordination between applications.
 */

const Topic8 = () => {
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
              Session Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Layer 5: Session management, synchronization, and dialog control — the organizer of conversations
            </p>
          </section>

          {/* Real-World Analogy: Meeting Coordinator */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🗓️ Real-World Analogy: Meeting Coordinator
            </h2>
            <p>
              Imagine <strong>Abhronila</strong> and <strong>Susmita</strong> are having a video call from <strong>Barrackpore</strong> to <strong>Shyamnagar</strong>.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Session establishment:</span> The call is set up (dialing, answering).</li>
              <li><span className="font-bold">Dialog control:</span> Who speaks when (push-to-talk or full duplex).</li>
              <li><span className="font-bold">Synchronization:</span> If the call drops, they resume from the last checkpoint (e.g., "we were talking about the project").</li>
              <li><span className="font-bold">Session termination:</span> They hang up.</li>
            </ul>
            <p>
              The session layer handles all these aspects, providing a structured conversation between applications.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why do file downloads resume from where they stopped? The session layer (or equivalent) keeps track of checkpoints.
            </div>
          </section>

          {/* Core Concepts: Session Management, Synchronization, Dialog Control */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔑 Key Functions of Session Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔌</div>
                <h3 className="font-bold text-lg">Session Management</h3>
                <p className="text-sm">Establishes, maintains, and terminates sessions between applications. Includes authentication, authorization, and session recovery.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">📌</div>
                <h3 className="font-bold text-lg">Synchronization</h3>
                <p className="text-sm">Inserts checkpoints into data streams. If a session fails, communication can resume from the last checkpoint instead of restarting.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-bold text-lg">Dialog Control</h3>
                <p className="text-sm">Manages who can transmit at what time: simplex (one-way), half-duplex (alternating), or full-duplex (simultaneous).</p>
              </div>
            </div>
          </section>

          {/* Protocols & Devices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📡 Protocols & Devices at Session Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Common Protocols</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>NetBIOS (Network Basic Input/Output System)</li>
                  <li>RPC (Remote Procedure Call)</li>
                  <li>PPTP (Point-to-Point Tunneling Protocol)</li>
                  <li>SMB (Server Message Block)</li>
                  <li>NFS (Network File System) – session aspects</li>
                  <li>AppleTalk (session component)</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Devices / Systems</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Gateways (session-aware)</li>
                  <li>Firewalls (with session inspection)</li>
                  <li>Load balancers (session persistence)</li>
                  <li>Session Border Controllers (SBC) for VoIP</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed Example: File Transfer with Checkpoints */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🔄 Real-World Example: Resumable File Transfer
            </h2>
            <p>
              <strong>Debangshu</strong> is downloading a 10 GB file from a server. The session layer inserts <strong>checkpoints</strong> every 500 MB.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>If the connection drops after 2.3 GB, the session can <strong>resume from the last checkpoint</strong> (2.0 GB) instead of restarting.</li>
              <li>This is implemented in protocols like FTP with REST command, HTTP with Range headers, or BitTorrent.</li>
            </ul>
            <p className="mt-2">
              Without session layer functionality, the user would have to start the download over — frustrating and wasteful.
            </p>
          </section>

          {/* SVG Illustration: Session with Checkpoints */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: Session with Checkpoints & Resume
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="280" viewBox="0 0 550 280" className="max-w-full h-auto">
                {/* Data stream bar */}
                <rect x="50" y="40" width="450" height="30" fill="#3b82f6" rx="5" />
                <text x="275" y="25" textAnchor="middle" fill="currentColor" fontSize="12">Data Stream</text>
                {/* Checkpoints */}
                <circle cx="120" cy="55" r="6" fill="#ffaa44" />
                <text x="120" y="80" textAnchor="middle" fill="#ffaa44" fontSize="10">CP1</text>
                <circle cx="210" cy="55" r="6" fill="#ffaa44" />
                <text x="210" y="80" textAnchor="middle" fill="#ffaa44" fontSize="10">CP2</text>
                <circle cx="300" cy="55" r="6" fill="#ffaa44" />
                <text x="300" y="80" textAnchor="middle" fill="#ffaa44" fontSize="10">CP3</text>
                <circle cx="390" cy="55" r="6" fill="#ffaa44" />
                <text x="390" y="80" textAnchor="middle" fill="#ffaa44" fontSize="10">CP4</text>
                <circle cx="480" cy="55" r="6" fill="#ffaa44" />
                <text x="480" y="80" textAnchor="middle" fill="#ffaa44" fontSize="10">CP5</text>

                {/* Failure and resume */}
                <path d="M 300 120 L 300 160 L 400 160 L 400 120" fill="none" stroke="red" strokeWidth="2" strokeDasharray="5 3" />
                <text x="350" y="150" textAnchor="middle" fill="red" fontSize="10">Connection fails</text>
                <path d="M 390 100 L 430 100 L 430 180" stroke="green" strokeWidth="2" />
                <text x="420" y="130" fill="green" fontSize="10">Resume from CP4</text>

                <text x="275" y="220" textAnchor="middle" fill="currentColor" fontSize="12">Checkpoints allow resumption without restarting</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              The session layer inserts checkpoints; if a failure occurs, the session can resume from the last successful checkpoint.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Session persistence</span> in load balancers ensures a client's requests go to the same server (sticky sessions).</li>
              <li><span className="font-bold">Checkpointing</span> is crucial for large data transfers; implement resumable uploads/downloads in applications.</li>
              <li><span className="font-bold">Use session timeouts</span> to free resources on servers and avoid stale sessions.</li>
              <li><span className="font-bold">Session layer is often combined with presentation/application in TCP/IP</span>, but its concepts remain important.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing session layer with transport layer.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Transport layer provides reliable/ordered delivery; session layer manages the conversation structure (checkpoints, dialog control).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking session layer is always explicitly implemented.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> In TCP/IP, session functions are often part of applications or application-layer protocols.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Synchronization means real-time clocks."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> It means checkpoints to recover from failures, not time synchronization.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Design <span className="font-bold">idempotent operations</span> so that retrying after session failure is safe.</li>
              <li>Use <span className="font-bold">session tokens</span> (e.g., cookies, JWTs) to maintain state across requests in web apps.</li>
              <li>Implement <span className="font-bold">graceful session termination</span> to release resources and notify peers.</li>
              <li>For large transfers, <span className="font-bold">periodically persist progress</span> (checkpoints) to enable resumption.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Session establishment, maintenance, termination</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Synchronization = checkpoints for recovery</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Dialog control: simplex, half-duplex, full-duplex</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Protocols: NetBIOS, RPC, PPTP, SMB</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Devices: gateways, firewalls (session-aware)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Enables resumable transfers and conversation management</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Emphasize that the session layer is often overlooked in TCP/IP, but its concepts appear everywhere: HTTP sessions (cookies), remote procedure calls, and file transfer checkpoints. Use the 'meeting coordinator' analogy to make it relatable. Show how HTTP cookies maintain session state across stateless HTTP requests."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you log into a website and close the browser, you often remain logged in if you reopen it. That's session persistence using cookies — a session layer concept implemented at the application layer.</p>
            <p className="mt-2 text-sm">Try this: Download a large file and interrupt the download. Does it resume? Check the protocol: HTTP with Range header, FTP with REST, or torrent with piece selection. Each uses session layer checkpointing.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the main function of the session layer?</p><p>To establish, maintain, and terminate sessions between applications, including synchronization and dialog control.</p></div>
              <div><p className="font-bold">2. What are checkpoints in the context of the session layer?</p><p>Points inserted into a data stream so that if a failure occurs, the session can resume from that point instead of starting over.</p></div>
              <div><p className="font-bold">3. What is dialog control?</p><p>Managing who can transmit at a given time: simplex (one-way), half-duplex (alternating), or full-duplex (simultaneous).</p></div>
              <div><p className="font-bold">4. Name two protocols that operate at the session layer.</p><p>NetBIOS, RPC, PPTP, SMB.</p></div>
              <div><p className="font-bold">5. How does the session layer help in file transfers?</p><p>By inserting checkpoints, it allows resuming interrupted transfers from the last checkpoint.</p></div>
              <div><p className="font-bold">6. What is the difference between session layer and transport layer?</p><p>Transport layer provides end-to-end reliability; session layer manages the conversation structure and checkpoints.</p></div>
              <div><p className="font-bold">7. What is a session in networking?</p><p>A persistent connection or dialog between two applications, including setup, data exchange, and teardown.</p></div>
              <div><p className="font-bold">8. What device can perform session layer functions?</p><p>Session-aware gateways, firewalls with session inspection, load balancers with sticky sessions.</p></div>
              <div><p className="font-bold">9. What is the purpose of session tokens in web applications?</p><p>To maintain state across multiple HTTP requests, essentially implementing session layer concepts over stateless HTTP.</p></div>
              <div><p className="font-bold">10. What does "full-duplex" mean in dialog control?</p><p>Both parties can transmit simultaneously.</p></div>
              <div><p className="font-bold">11. Give an example of an application that uses checkpoints.</p><p>FTP with REST command, HTTP with Range header for resumable downloads, BitTorrent piece selection.</p></div>
              <div><p className="font-bold">12. What is session persistence in load balancers?</p><p>A technique to ensure a client's requests always go to the same server to maintain session state.</p></div>
              <div><p className="font-bold">13. How does the session layer handle authentication?</p><p>It can include authentication and authorization as part of session establishment (though often done at application layer).</p></div>
              <div><p className="font-bold">14. Why is the session layer less prominent in TCP/IP?</p><p>TCP/IP combines session, presentation, and application into the application layer, but session concepts are still implemented in protocols or applications.</p></div>
              <div><p className="font-bold">15. What happens if a session is not properly terminated?</p><p>Resources may be wasted, and the remote endpoint might keep the session open, leading to denial of service or stale sessions.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic8;