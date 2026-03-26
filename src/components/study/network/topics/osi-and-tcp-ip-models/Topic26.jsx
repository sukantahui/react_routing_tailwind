import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic26: Real-Life Data Flow Example – Web Request Journey
 * 
 * Purpose: Demonstrate the complete end-to-end journey of a web request (HTTP)
 *          from a browser to a server and back, integrating all layers of the TCP/IP model.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: This topic ties together everything learned in the course, showing how
 *              layers, protocols, and devices work together in a real-world scenario.
 */

const Topic26 = () => {
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
              Real-Life Data Flow
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              How a web request travels from browser to server and back — a complete journey through the layers
            </p>
          </section>

          {/* Scenario Setup */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🌐 The Scenario: Swadeep Visits a Website
            </h2>
            <p>
              <strong>Swadeep</strong> in <strong>Barrackpore</strong> opens his browser and types <strong>https://www.example.com</strong>.
              The website is hosted on a server in <strong>Mumbai</strong>.
              Let's trace the data as it travels from his browser to the server and back.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> How many layers does the data cross? What transformations happen at each step?
            </div>
          </section>

          {/* Step-by-Step Journey – Sending Side */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📤 Outbound: Browser → Server
            </h2>
            <ol className="list-decimal list-inside space-y-3">
              <li><span className="font-bold">Application Layer (Browser):</span> User enters URL. Browser generates an HTTP GET request. If HTTPS, TLS encrypts the request.</li>
              <li><span className="font-bold">Transport Layer (TCP):</span> The HTTP request is passed to TCP. TCP adds a header with source port (ephemeral, e.g., 54321) and destination port 443 (HTTPS). It also adds sequence numbers for reliability.</li>
              <li><span className="font-bold">Internet Layer (IP):</span> The TCP segment is encapsulated in an IP packet. IP adds source IP (Swadeep's IP, e.g., 192.168.1.10) and destination IP (server IP, e.g., 93.184.216.34).</li>
              <li><span className="font-bold">Network Access Layer (Ethernet):</span> The IP packet is placed in an Ethernet frame. Adds source MAC (Swadeep's NIC) and destination MAC (default gateway's MAC). Also adds a CRC trailer for error detection.</li>
              <li><span className="font-bold">Physical Layer:</span> The frame is converted to electrical signals (or radio waves) and transmitted to the router via Ethernet cable or Wi-Fi.</li>
              <li><span className="font-bold">Routing (Routers):</span> The packet travels through multiple routers. Each router strips the frame, examines the destination IP, consults its routing table, and re-encapsulates in a new frame for the next hop. This repeats until reaching the server's network.</li>
              <li><span className="font-bold">Server Network Access Layer:</span> The final router delivers the frame to the server's switch, which forwards it to the server's NIC based on MAC address.</li>
              <li><span className="font-bold">Decapsulation on Server:</span> The server processes the frame, removes Ethernet header/trailer, passes IP packet to IP layer, then TCP segment to TCP, then HTTP request to the web server software.</li>
            </ol>
          </section>

          {/* Step-by-Step Journey – Return Side */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📥 Return: Server → Browser
            </h2>
            <ol className="list-decimal list-inside space-y-3">
              <li><span className="font-bold">Application Layer (Server):</span> Web server processes the request, generates HTTP response (e.g., HTML page). HTTPS encrypts the response.</li>
              <li><span className="font-bold">Transport Layer (TCP):</span> The response is passed to TCP, which adds header with source port 443 and destination port 54321 (Swadeep's ephemeral port).</li>
              <li><span className="font-bold">Internet Layer (IP):</span> IP adds header with source IP (server) and destination IP (Swadeep's public IP).</li>
              <li><span className="font-bold">Network Access Layer:</span> Ethernet frame is created with server's MAC as source and next-hop router's MAC as destination.</li>
              <li><span className="font-bold">Routing Back:</span> Packets travel back through the internet, possibly taking a different path, until they reach Swadeep's home router.</li>
              <li><span className="font-bold">Home Router & Network Access:</span> The router performs NAT translation, maps the public IP to Swadeep's private IP, and forwards the frame to his computer.</li>
              <li><span className="font-bold">Decapsulation on Browser:</span> Swadeep's computer processes the frame, IP packet, TCP segment, and finally the HTTP response. Browser renders the page.</li>
            </ol>
          </section>

          {/* Encapsulation Table */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              📦 Encapsulation at Each Layer (Sending)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr><th className="border p-2">Layer</th><th className="border p-2">Data Unit</th><th className="border p-2">Header/Trailer Added</th><th className="border p-2">Example Content</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Application</td><td className="border p-2">HTTP Request</td><td className="border p-2">None (data itself)</td><td className="border p-2">GET /index.html HTTP/1.1 Host: example.com</td></tr>
                  <tr><td className="border p-2">Transport</td><td className="border p-2">TCP Segment</td><td className="border p-2">TCP Header (ports, seq, ack)</td><td className="border p-2">Src: 54321, Dst: 443, Seq: 100</td></tr>
                  <tr><td className="border p-2">Internet</td><td className="border p-2">IP Packet</td><td className="border p-2">IP Header (src/dst IP, TTL)</td><td className="border p-2">Src: 192.168.1.10, Dst: 93.184.216.34</td></tr>
                  <tr><td className="border p-2">Network Access</td><td className="border p-2">Ethernet Frame</td><td className="border p-2">MAC Header + CRC Trailer</td><td className="border p-2">Src MAC: AA:BB, Dst MAC: router MAC</td></tr>
                  <tr><td className="border p-2">Physical</td><td className="border p-2">Bits</td><td className="border p-2">Encoded signals</td><td className="border p-2">Electrical pulses on copper</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SVG Illustration: Full Journey */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🎨 Visual: The Complete Journey
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="600" height="300" viewBox="0 0 600 300" className="max-w-full h-auto">
                <rect x="20" y="120" width="80" height="50" fill="#3b82f6" rx="5" />
                <text x="60" y="150" textAnchor="middle" fill="white" fontSize="10">Browser</text>
                <rect x="130" y="120" width="80" height="50" fill="#10b981" rx="5" />
                <text x="170" y="150" textAnchor="middle" fill="white" fontSize="10">Router</text>
                <rect x="240" y="120" width="80" height="50" fill="#f59e0b" rx="5" />
                <text x="280" y="150" textAnchor="middle" fill="white" fontSize="10">Internet</text>
                <rect x="350" y="120" width="80" height="50" fill="#ef4444" rx="5" />
                <text x="390" y="150" textAnchor="middle" fill="white" fontSize="10">Router</text>
                <rect x="460" y="120" width="80" height="50" fill="#8b5cf6" rx="5" />
                <text x="500" y="150" textAnchor="middle" fill="white" fontSize="10">Server</text>

                <path d="M100 145 L130 145" stroke="#ffaa44" strokeWidth="2" />
                <path d="M210 145 L240 145" stroke="#ffaa44" strokeWidth="2" />
                <path d="M320 145 L350 145" stroke="#ffaa44" strokeWidth="2" />
                <path d="M430 145 L460 145" stroke="#ffaa44" strokeWidth="2" />

                <circle cx="60" cy="105" r="3" fill="#ffaa44">
                  <animate attributeName="cx" values="60;170;280;390;500" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="105;145;105;145;105" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="300" y="70" textAnchor="middle" fill="currentColor" fontSize="12">Request travels: Browser → Router → Internet → Router → Server</text>
                <text x="300" y="250" textAnchor="middle" fill="currentColor" fontSize="12">Response follows similar path back</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Each hop involves encapsulation, routing, and decapsulation. The packet's journey is invisible to the user.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use browser DevTools (Network tab)</span> to see each request/response, including timing and headers.</li>
              <li><span className="font-bold">Wireshark captures the entire journey</span> – you can see the frames, packets, and segments leaving your computer.</li>
              <li><span className="font-bold">`traceroute` reveals the path</span> – it shows each router hop, giving insight into the network layer journey.</li>
              <li><span className="font-bold">When troubleshooting, think of the full round trip</span> – the problem could be on the outbound path, the server, or the return path.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking the path is symmetric (request and response take the same route).
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> IP routing is asymmetric; packets may take different paths in each direction.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing the browser directly sends packets to the server's IP without DNS.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> DNS resolution happens first – a separate request to a DNS server to get the IP address.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "The server's response always uses the same port."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> The server responds to the ephemeral source port specified by the client, not its own well-known port.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When designing web applications, <span className="font-bold">optimize for network latency</span> – each round trip adds delay.</li>
              <li>Use <span className="font-bold">content delivery networks (CDNs)</span> to bring content closer to users, reducing the path length.</li>
              <li><span className="font-bold">Implement HTTPS (TLS)</span> to encrypt the entire application-layer conversation.</li>
              <li><span className="font-bold">Monitor and log at each layer</span> – application logs, network flow data, and packet captures help diagnose issues.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> DNS resolves domain → IP before HTTP</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Browser generates HTTP request (Application)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP adds ports, sequence numbers (Transport)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> IP adds source/dest addresses (Internet)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Ethernet adds MAC addresses, CRC (Network Access)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Each router rewrites MAC addresses, forwards based on IP</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Server reverses the process (decapsulation)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Response follows a similar path back</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"This is the capstone topic. Have students act out the journey – assign roles (browser, router, server) and pass a physical 'packet' with headers written on sticky notes. Use Wireshark to capture a real HTTP request and show the frames, packets, and segments. Emphasize that understanding this complete flow is the ultimate goal of the course."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Open your browser's Developer Tools (Network tab) and visit a website. Click on the first request – you'll see the DNS lookup, the HTTP request, and the response. Then use Wireshark to capture the same traffic and expand the Ethernet, IP, TCP, and HTTP headers. You're seeing the encapsulation in action!</p>
            <p className="mt-2 text-sm">Try this: Run `traceroute example.com` to see the routers your packets traverse. Compare it to the network path visualized in the course.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What happens first when a user types a URL into a browser?</p><p>DNS resolution – the browser queries a DNS server to get the IP address of the domain.</p></div>
              <div><p className="font-bold">2. Which layer generates the HTTP request?</p><p>Application layer.</p></div>
              <div><p className="font-bold">3. What does TCP add to the data at the transport layer?</p><p>Source and destination port numbers, sequence numbers, and acknowledgment numbers for reliability.</p></div>
              <div><p className="font-bold">4. What information does the IP header contain?</p><p>Source and destination IP addresses, TTL, protocol type (TCP/UDP), and a checksum.</p></div>
              <div><p className="font-bold">5. What does the Ethernet frame add?</p><p>Source and destination MAC addresses, EtherType, and a CRC trailer for error detection.</p></div>
              <div><p className="font-bold">6. What device forwards packets based on IP addresses?</p><p>Router.</p></div>
              <div><p className="font-bold">7. What is the role of NAT in the journey?</p><p>Network Address Translation maps private IP addresses to a public IP, allowing multiple devices to share a single public IP.</p></div>
              <div><p className="font-bold">8. How does the server know which application to pass the data to?</p><p>By inspecting the destination port number in the TCP header (e.g., 443 for HTTPS, 80 for HTTP).</p></div>
              <div><p className="font-bold">9. What is the process called when headers are added at each layer?</p><p>Encapsulation.</p></div>
              <div><p className="font-bold">10. What is the process called when headers are removed at the receiver?</p><p>Decapsulation.</p></div>
              <div><p className="font-bold">11. Why might the request and response take different paths?</p><p>IP routing is asymmetric; each packet is independently routed based on current network conditions.</p></div>
              <div><p className="font-bold">12. What does a router do with the MAC addresses when forwarding a packet?</p><p>It strips the old Ethernet frame, consults its routing table, and creates a new frame with the next-hop MAC address as the destination.</p></div>
              <div><p className="font-bold">13. How does the browser know which TCP port to use?</p><p>Well-known ports: HTTP uses 80, HTTPS uses 443. The browser uses these by default.</p></div>
              <div><p className="font-bold">14. What happens if a packet is lost during the journey?</p><p>TCP detects the loss via missing acknowledgment and retransmits the packet.</p></div>
              <div><p className="font-bold">15. How can a user observe the entire journey?</p><p>Using tools like browser DevTools (for HTTP), Wireshark (for packets), and traceroute (for routing hops).</p></div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <p className="text-center text-lg font-semibold">
              From typing a URL to seeing the page — this journey through the layers happens in milliseconds, millions of times a day.
              Understanding it is the key to mastering networking.
            </p>
          </section>

        </div>
      </div>
    </>
  );
};

export default Topic26;