import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic10: Application Layer – user-level services (HTTP, FTP, SMTP, DNS)
 * 
 * Purpose: Explain the application layer's role in providing user-level services,
 *          introduce key protocols (HTTP, FTP, SMTP, DNS) and their real-world usage.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: The topmost layer where users interact with network services; essential
 *              for understanding how everyday applications communicate.
 */

const Topic10 = () => {
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
              Application Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Layer 7: User-level services — HTTP, FTP, SMTP, DNS — the interface between users and the network
            </p>
          </section>

          {/* Real-World Analogy: User-Facing Services */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🏢 Real-World Analogy: Office Reception
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to interact with a company in <strong>Shyamnagar</strong>:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Web browsing (HTTP):</span> He visits the company's website to see products.</li>
              <li><span className="font-bold">Email (SMTP):</span> He sends an email to inquire about a product.</li>
              <li><span className="font-bold">File transfer (FTP):</span> He downloads a brochure from the company.</li>
              <li><span className="font-bold">Address lookup (DNS):</span> He uses a phonebook to find the company's address.</li>
            </ul>
            <p>
              The application layer provides these services, acting as the interface between the user (or application) and the underlying network.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Every app you use (browser, email client, file downloader) relies on application layer protocols to communicate over the network.
            </div>
          </section>

          {/* Core Concepts: What is Application Layer */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🖥️ What is the Application Layer?
            </h2>
            <p>
              The application layer is the topmost layer of the OSI model. It provides services directly to user applications (web browsers, email clients, file transfer tools) and acts as the interface between the user and the network.
            </p>
            <p className="mt-2">
              Key responsibilities:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Provides protocols for specific user services (HTTP, FTP, SMTP, DNS).</li>
              <li>Handles data formatting and presentation for the user.</li>
              <li>Provides authentication and authorization mechanisms.</li>
              <li>Manages user sessions (often combined with presentation and session functions).</li>
            </ul>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <span className="font-bold">Important:</span> In the TCP/IP model, the application layer combines OSI layers 5, 6, and 7.
            </div>
          </section>

          {/* Key Protocols: HTTP, HTTPS */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🌐 HTTP / HTTPS – The Web's Foundation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">HTTP (Hypertext Transfer Protocol)</h3>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>Stateless, request-response protocol</li>
                  <li>Methods: GET, POST, PUT, DELETE, etc.</li>
                  <li>Status codes: 200 OK, 404 Not Found, 500 Server Error</li>
                  <li>Port 80 (default)</li>
                </ul>
                <p className="text-xs mt-2">Example: <span className="font-mono">GET /index.html HTTP/1.1 Host: example.com</span></p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">HTTPS (HTTP Secure)</h3>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>HTTP over TLS/SSL (encrypted)</li>
                  <li>Protects confidentiality and integrity</li>
                  <li>Port 443 (default)</li>
                  <li>Requires digital certificates</li>
                </ul>
                <p className="text-xs mt-2">Used by <strong>Susmita</strong> when she shops online — ensures her payment details are secure.</p>
              </div>
            </div>
          </section>

          {/* FTP */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              📁 FTP – File Transfer Protocol
            </h2>
            <p>
              <strong>File Transfer Protocol (FTP)</strong> is used to transfer files between client and server. It uses two channels:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li><span className="font-bold">Control connection</span> (port 21) – sends commands (USER, PASS, RETR, STOR).</li>
              <li><span className="font-bold">Data connection</span> (port 20 for active mode, or ephemeral for passive) – transfers file data.</li>
            </ul>
            <p className="mt-2">
              <strong>Debangshu</strong> uses FTP to upload his website files to a server. Modern secure alternatives include <strong>SFTP</strong> (SSH File Transfer Protocol) and <strong>FTPS</strong> (FTP over SSL).
            </p>
          </section>

          {/* SMTP, POP3, IMAP */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              ✉️ Email Protocols: SMTP, POP3, IMAP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">SMTP</h3>
                <p className="text-sm">Simple Mail Transfer Protocol. Used to send emails from client to server, and between servers. Port 25 (or 587 for submission).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">POP3</h3>
                <p className="text-sm">Post Office Protocol v3. Downloads emails from server to client, typically deleting from server. Port 110 (or 995 for POP3S).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">IMAP</h3>
                <p className="text-sm">Internet Message Access Protocol. Keeps emails on server, synchronizes across devices. Port 143 (or 993 for IMAPS).</p>
              </div>
            </div>
            <p className="mt-3">
              <strong>Tuhina</strong> uses IMAP to access her email from both her phone and laptop — messages stay on the server and appear the same everywhere.
            </p>
          </section>

          {/* DNS */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🔍 DNS – Domain Name System
            </h2>
            <p>
              DNS translates human-readable domain names (e.g., <span className="font-mono">www.example.com</span>) to IP addresses (e.g., <span className="font-mono">93.184.216.34</span>). It's the "phonebook of the internet".
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><span className="font-bold">Hierarchical structure:</span> Root servers, TLD servers, authoritative name servers.</li>
              <li><span className="font-bold">Uses UDP port 53</span> (and TCP for large responses or zone transfers).</li>
              <li><span className="font-bold">Caching</span> improves performance and reduces load.</li>
            </ul>
            <p className="mt-2">
              When <strong>Abhronila</strong> types "google.com" in her browser, DNS resolves it to an IP address before any HTTP request is sent.
            </p>
          </section>

          {/* SVG Illustration: Application Layer Protocols */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🎨 Visual: Application Layer Protocols in Action
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="260" viewBox="0 0 550 260" className="max-w-full h-auto">
                <rect x="50" y="20" width="120" height="40" fill="#3b82f6" rx="5" />
                <text x="110" y="45" textAnchor="middle" fill="white" fontSize="10">Browser</text>
                <rect x="380" y="20" width="120" height="40" fill="#10b981" rx="5" />
                <text x="440" y="45" textAnchor="middle" fill="white" fontSize="10">Web Server</text>

                <path d="M170 40 L380 40" stroke="#ffaa44" strokeWidth="2" />
                <text x="275" y="35" textAnchor="middle" fill="#ffaa44" fontSize="10">HTTP/HTTPS</text>

                <rect x="50" y="90" width="120" height="40" fill="#3b82f6" rx="5" />
                <text x="110" y="115" textAnchor="middle" fill="white" fontSize="10">Email Client</text>
                <rect x="380" y="90" width="120" height="40" fill="#10b981" rx="5" />
                <text x="440" y="115" textAnchor="middle" fill="white" fontSize="10">Mail Server</text>

                <path d="M170 110 L380 110" stroke="#ffaa44" strokeWidth="2" />
                <text x="275" y="105" textAnchor="middle" fill="#ffaa44" fontSize="10">SMTP/POP3/IMAP</text>

                <rect x="50" y="160" width="120" height="40" fill="#3b82f6" rx="5" />
                <text x="110" y="185" textAnchor="middle" fill="white" fontSize="10">DNS Client</text>
                <rect x="380" y="160" width="120" height="40" fill="#10b981" rx="5" />
                <text x="440" y="185" textAnchor="middle" fill="white" fontSize="10">DNS Server</text>

                <path d="M170 180 L380 180" stroke="#ffaa44" strokeWidth="2" />
                <text x="275" y="175" textAnchor="middle" fill="#ffaa44" fontSize="10">DNS (port 53)</text>

                <text x="275" y="230" textAnchor="middle" fill="currentColor" fontSize="12">Application layer protocols enable user services</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Different applications use different protocols, all operating at the application layer.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use browser DevTools (Network tab)</span> to inspect HTTP requests/responses — headers, status codes, timing.</li>
              <li><span className="font-bold">Use `curl`</span> to test APIs and HTTP endpoints from the command line.</li>
              <li><span className="font-bold">For email, prefer IMAP over POP3</span> if you need multi-device sync.</li>
              <li><span className="font-bold">Clear DNS cache</span> with `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac) when troubleshooting domain resolution.</li>
              <li><span className="font-bold">Always use HTTPS in production</span> to protect user data and improve SEO.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Using HTTP instead of HTTPS for sensitive data.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Best practice:</span> Always use TLS/SSL (HTTPS) for login, payment, or any personal data.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming DNS is always fast and reliable.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> DNS resolution adds latency; implement caching and use reliable DNS providers.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "FTP is secure for file transfers."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> FTP sends credentials in plaintext; use SFTP or FTPS for security.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Follow RESTful principles</span> when designing web APIs (HTTP methods, status codes).</li>
              <li><span className="font-bold">Implement proper error handling</span> with meaningful HTTP status codes (e.g., 404 for missing resource, 500 for server error).</li>
              <li><span className="font-bold">Use DNS caching and TTLs wisely</span> to balance freshness vs. performance.</li>
              <li><span className="font-bold">Consider using CDNs</span> for static assets to reduce latency and offload origin servers.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Application layer provides user services</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> HTTP/HTTPS: web browsing (80/443)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> FTP: file transfer (21, 20)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> SMTP: sending email (25/587)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> POP3/IMAP: receiving email (110/143)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> DNS: domain → IP (53, UDP/TCP)</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <Teacher 
              note={"Relate the application layer to daily student activities: web browsing (HTTP), email (SMTP/POP3), file uploads (FTP), and accessing websites by name (DNS). Show the browser dev tools Network tab to see HTTP requests. Use `nslookup` or `dig` to demonstrate DNS resolution. Emphasize that while these protocols seem high-level, they rely on all lower layers."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Open your browser's Developer Tools (F12) and go to the Network tab. Refresh a page. Click any request to see the HTTP method, headers, and response. That's the application layer at work.</p>
            <p className="mt-2 text-sm">Try this: In your terminal, run `curl -v https://example.com` to see the full HTTP exchange, including the TLS handshake and response headers.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the primary function of the application layer?</p><p>To provide network services directly to user applications (web browsing, email, file transfer, etc.).</p></div>
              <div><p className="font-bold">2. Name four common application layer protocols.</p><p>HTTP, FTP, SMTP, DNS.</p></div>
              <div><p className="font-bold">3. What port does HTTP use? What about HTTPS?</p><p>HTTP uses port 80; HTTPS uses port 443.</p></div>
              <div><p className="font-bold">4. What is the difference between HTTP and HTTPS?</p><p>HTTPS is HTTP over TLS/SSL, providing encryption and authentication.</p></div>
              <div><p className="font-bold">5. What is FTP used for?</p><p>File Transfer Protocol — used to transfer files between a client and server.</p></div>
              <div><p className="font-bold">6. What are the two channels used by FTP?</p><p>Control channel (port 21) for commands, and data channel (port 20 or ephemeral) for file data.</p></div>
              <div><p className="font-bold">7. What is the purpose of SMTP?</p><p>Simple Mail Transfer Protocol — used to send emails from clients to servers and between servers.</p></div>
              <div><p className="font-bold">8. What is the difference between POP3 and IMAP?</p><p>POP3 downloads emails and typically deletes them from the server; IMAP keeps emails on the server, allowing synchronization across multiple devices.</p></div>
              <div><p className="font-bold">9. What does DNS stand for and what does it do?</p><p>Domain Name System — translates domain names to IP addresses.</p></div>
              <div><p className="font-bold">10. What port does DNS use?</p><p>UDP port 53 (and TCP port 53 for large responses or zone transfers).</p></div>
              <div><p className="font-bold">11. What is a common HTTP status code for a successful request? For a not found?</p><p>200 OK, 404 Not Found.</p></div>
              <div><p className="font-bold">12. Why is FTP considered insecure for production use?</p><p>It sends credentials (username/password) in plaintext; use SFTP or FTPS instead.</p></div>
              <div><p className="font-bold">13. What is the role of a DNS cache?</p><p>To store resolved domain names locally, reducing lookup time and external query load.</p></div>
              <div><p className="font-bold">14. Which application layer protocol would you use to send a file from a client to a server securely?</p><p>SFTP (SSH File Transfer Protocol) or FTPS (FTP over SSL).</p></div>
              <div><p className="font-bold">15. How does the application layer interact with lower layers?</p><p>It passes data (e.g., HTTP request) down to the transport layer (TCP/UDP), which then encapsulates it for transmission.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic10;