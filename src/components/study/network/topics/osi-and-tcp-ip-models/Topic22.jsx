import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic22: Common Protocols in Each Layer
 * 
 * Purpose: Identify and explain the most common protocols at each layer of the OSI/TCP/IP models,
 *          their functions, ports, and real-world usage.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Students need to know which protocols operate at which layers – essential for
 *              troubleshooting, certification, and everyday networking.
 */

const Topic22 = () => {
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

  // Protocol data organized by layer (TCP/IP model)
  const protocolsByLayer = [
    {
      layer: "Application",
      protocols: [
        { name: "HTTP", port: 80, desc: "Hypertext Transfer Protocol – web browsing" },
        { name: "HTTPS", port: 443, desc: "HTTP over TLS/SSL – secure web" },
        { name: "FTP", port: 20/21, desc: "File Transfer Protocol – file upload/download" },
        { name: "SMTP", port: 25/587, desc: "Simple Mail Transfer Protocol – sending email" },
        { name: "POP3", port: 110, desc: "Post Office Protocol v3 – receiving email (downloads)" },
        { name: "IMAP", port: 143, desc: "Internet Message Access Protocol – sync email" },
        { name: "DNS", port: 53, desc: "Domain Name System – resolves names to IPs" },
        { name: "SSH", port: 22, desc: "Secure Shell – encrypted remote access" },
        { name: "DHCP", port: 67/68, desc: "Dynamic Host Configuration Protocol – auto IP assignment" }
      ]
    },
    {
      layer: "Transport",
      protocols: [
        { name: "TCP", port: "varies", desc: "Transmission Control Protocol – reliable, connection-oriented" },
        { name: "UDP", port: "varies", desc: "User Datagram Protocol – fast, connectionless" }
      ]
    },
    {
      layer: "Internet",
      protocols: [
        { name: "IPv4", port: "N/A", desc: "Internet Protocol version 4 – 32-bit addressing" },
        { name: "IPv6", port: "N/A", desc: "Internet Protocol version 6 – 128-bit addressing" },
        { name: "ICMP", port: "N/A", desc: "Internet Control Message Protocol – diagnostics (ping, traceroute)" },
        { name: "ARP", port: "N/A", desc: "Address Resolution Protocol – IP → MAC mapping" },
        { name: "IGMP", port: "N/A", desc: "Internet Group Management Protocol – multicast management" }
      ]
    },
    {
      layer: "Network Access",
      protocols: [
        { name: "Ethernet", port: "N/A", desc: "IEEE 802.3 – wired LAN framing and MAC" },
        { name: "Wi-Fi (802.11)", port: "N/A", desc: "Wireless LAN framing and MAC" },
        { name: "PPP", port: "N/A", desc: "Point-to-Point Protocol – dial-up, DSL" }
      ]
    }
  ];

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Hero Section */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Common Protocols in Each Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              HTTP, HTTPS, FTP, TCP, UDP, IP, ARP, ICMP — the building blocks of internet communication
            </p>
          </section>

          {/* Real-World Analogy: Languages of Communication */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🌍 Real-World Analogy: Languages of Communication
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to order food from a restaurant in <strong>Shyamnagar</strong>. Different "languages" are used:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">HTTP (Application):</span> "I'd like a pizza" – the actual request.</li>
              <li><span className="font-bold">TCP (Transport):</span> The waiter confirms the order and ensures it's delivered (reliable).</li>
              <li><span className="font-bold">IP (Internet):</span> The restaurant's address (IP) so the driver knows where to go.</li>
              <li><span className="font-bold">Ethernet (Network Access):</span> The road and traffic signals that get the driver there physically.</li>
              <li><span className="font-bold">ARP:</span> Looking up the exact house number (MAC) from the street name (IP).</li>
            </ul>
            <p>
              Each protocol has a specific role, and together they enable communication.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> What would happen if the driver only knew the city (IP) but not the street address (MAC)? That's why ARP is needed.
            </div>
          </section>

          {/* Application Layer Protocols */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🌐 Application Layer Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {protocolsByLayer[0].protocols.map(p => (
                <div key={p.name} className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg hover:scale-105 transition-transform duration-300">
                  <h3 className="font-bold text-blue-600 dark:text-blue-400">{p.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Port: {p.port}</p>
                  <p className="text-sm mt-1">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              These protocols are what users interact with directly – web, email, file transfers, remote access.
            </p>
          </section>

          {/* Transport Layer Protocols */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🚚 Transport Layer Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg hover:scale-105 transition-transform">
                <h3 className="font-bold text-lg">TCP</h3>
                <p>Reliable, connection-oriented, ordered delivery. Used by HTTP, HTTPS, FTP, SMTP, SSH.</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Port range: 0–65535 (well-known 0–1023)</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg hover:scale-105 transition-transform">
                <h3 className="font-bold text-lg">UDP</h3>
                <p>Fast, connectionless, unreliable. Used by DNS, DHCP, VoIP, streaming, gaming.</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Port range: 0–65535</p>
              </div>
            </div>
          </section>

          {/* Internet Layer Protocols */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🌍 Internet Layer Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {protocolsByLayer[2].protocols.map(p => (
                <div key={p.name} className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg hover:scale-105 transition-transform">
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">ARP is special:</span> It operates between Internet and Network Access layers, mapping IP to MAC addresses.
            </div>
          </section>

          {/* Network Access Layer Protocols */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🔌 Network Access Layer Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {protocolsByLayer[3].protocols.map(p => (
                <div key={p.name} className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg hover:scale-105 transition-transform">
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SVG Illustration: Protocol Stack */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🎨 Visual: Protocol Stack (TCP/IP Model)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="300" viewBox="0 0 550 300" className="max-w-full h-auto">
                <rect x="100" y="20" width="350" height="55" fill="#3b82f6" rx="5" />
                <text x="275" y="50" textAnchor="middle" fill="white" fontSize="12">Application</text>
                <text x="275" y="67" textAnchor="middle" fill="white" fontSize="9">HTTP, HTTPS, FTP, SMTP, DNS, SSH</text>
                
                <rect x="100" y="85" width="350" height="45" fill="#10b981" rx="5" />
                <text x="275" y="112" textAnchor="middle" fill="white" fontSize="12">Transport</text>
                <text x="275" y="124" textAnchor="middle" fill="white" fontSize="9">TCP, UDP</text>
                
                <rect x="100" y="140" width="350" height="45" fill="#f59e0b" rx="5" />
                <text x="275" y="167" textAnchor="middle" fill="white" fontSize="12">Internet</text>
                <text x="275" y="179" textAnchor="middle" fill="white" fontSize="9">IPv4, IPv6, ICMP, ARP</text>
                
                <rect x="100" y="195" width="350" height="45" fill="#ef4444" rx="5" />
                <text x="275" y="222" textAnchor="middle" fill="white" fontSize="12">Network Access</text>
                <text x="275" y="234" textAnchor="middle" fill="white" fontSize="9">Ethernet, Wi-Fi, PPP</text>
                
                <path d="M275 75 L275 85" stroke="#ffaa44" strokeWidth="2" />
                <path d="M275 130 L275 140" stroke="#ffaa44" strokeWidth="2" />
                <path d="M275 185 L275 195" stroke="#ffaa44" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Each layer has its own set of protocols, working together to enable communication.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Know the port numbers:</span> 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS), 25 (SMTP), 110 (POP3), 143 (IMAP).</li>
              <li><span className="font-bold">Use `netstat -an`</span> to see which ports are listening – you'll see applications bound to specific ports.</li>
              <li><span className="font-bold">ARP is critical for local communication:</span> If ARP fails, devices can't talk even if IP is correct.</li>
              <li><span className="font-bold">ICMP is often blocked by firewalls, which can break `ping` and `traceroute`.</span></li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking FTP uses a single port (it uses 20 and 21).
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Control on 21, data on 20 (active mode) or ephemeral (passive).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming all protocols use TCP.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> DNS uses UDP (mostly), DHCP uses UDP, VoIP uses UDP.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "ARP works across the internet."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> ARP is only for local network communication; routers do not forward ARP broadcasts.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When troubleshooting, <span className="font-bold">identify which protocol is involved</span> – it tells you which layer to check.</li>
              <li>Use <span className="font-bold">Wireshark filters</span> like `tcp.port == 80` or `icmp` to isolate specific protocol traffic.</li>
              <li>Always <span className="font-bold">prefer secure versions</span> (HTTPS over HTTP, SFTP over FTP, SSH over Telnet).</li>
              <li>Understand <span className="font-bold">protocol dependencies</span>: e.g., HTTP depends on TCP depends on IP depends on Ethernet.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Application: HTTP, HTTPS, FTP, SMTP, DNS</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Transport: TCP (reliable), UDP (fast)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Internet: IP (v4/v6), ICMP (ping), ARP (MAC lookup)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Network Access: Ethernet, Wi-Fi</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> HTTP:80, HTTPS:443, SSH:22, DNS:53, SMTP:25</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Use `netstat`, `wireshark`, `ping` to explore protocols</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <Teacher 
              note={"Make flashcards for protocols and their layers/ports. Use `netstat` and Wireshark in class to show protocols in action. Emphasize that understanding which protocols operate at which layer is critical for certification exams (Network+, CCNA). Relate to real-world scenarios: 'Why is HTTPS on port 443?' – because it's the standard port for secure web traffic."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Run `netstat -an | find "80"` on Windows or `netstat -an | grep 80` on Linux. You'll see if any service is listening on port 80 (HTTP). If you have a web server running, you'll see it.</p>
            <p className="mt-2 text-sm">Try this: `ping google.com` – that uses ICMP. `traceroute google.com` uses ICMP (or UDP on some systems). Notice how ICMP is used for diagnostics.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What port does HTTP use? HTTPS?</p><p>HTTP: 80; HTTPS: 443.</p></div>
              <div><p className="font-bold">2. Which protocol is used for sending email?</p><p>SMTP (Simple Mail Transfer Protocol).</p></div>
              <div><p className="font-bold">3. What is the difference between TCP and UDP?</p><p>TCP is reliable, connection-oriented, ordered; UDP is fast, connectionless, unreliable.</p></div>
              <div><p className="font-bold">4. What does ARP do?</p><p>Address Resolution Protocol – maps IP addresses to MAC addresses on a local network.</p></div>
              <div><p className="font-bold">5. What is ICMP used for?</p><p>Internet Control Message Protocol – error reporting and diagnostics (ping, traceroute).</p></div>
              <div><p className="font-bold">6. Which protocol is used for remote terminal access with encryption?</p><p>SSH (Secure Shell) – port 22.</p></div>
              <div><p className="font-bold">7. What port does DNS use?</p><p>UDP port 53 (and TCP for large responses).</p></div>
              <div><p className="font-bold">8. Which layer does IP operate at?</p><p>Internet layer (TCP/IP) / Network layer (OSI).</p></div>
              <div><p className="font-bold">9. What is the primary function of FTP?</p><p>File Transfer Protocol – transfers files between client and server.</p></div>
              <div><p className="font-bold">10. Which protocol is used for dynamic IP address assignment?</p><p>DHCP (Dynamic Host Configuration Protocol).</p></div>
              <div><p className="font-bold">11. What is the difference between IMAP and POP3?</p><p>IMAP keeps emails on the server, syncs across devices; POP3 downloads and often deletes from server.</p></div>
              <div><p className="font-bold">12. Which protocol provides reliable delivery for HTTP?</p><p>TCP (HTTP uses TCP port 80/443).</p></div>
              <div><p className="font-bold">13. Why is FTP considered insecure?</p><p>It sends credentials and data in plaintext; use SFTP or FTPS instead.</p></div>
              <div><p className="font-bold">14. What does the "ping" command use?</p><p>ICMP Echo Request and Echo Reply.</p></div>
              <div><p className="font-bold">15. What is the port number for SSH?</p><p>22.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic22;