// Topic0.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic0_files/topic0_questions';

/**
 * Component: Topic0
 * Purpose: Explain the working of DNS, HTTP, and HTTPS protocols.
 * Prototype: function Topic0()
 * Return: JSX.Element
 * When & why: Used in network fundamentals curriculum to teach how domain names resolve to IPs and how web communication works.
 */

const Topic0 = () => {
  return (
    <div className="dark min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 p-6 md:p-10">
      {/* Global animation keyframes */}
      <style>
        {`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-slide-up {
              animation: none !important;
              opacity: 1;
              transform: none;
            }
          }
          .card-hover {
            transition: all 0.3s ease-in-out;
          }
          .card-hover:hover {
            transform: scale(1.01);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        `}
      </style>

      {/* Title Section */}
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
            DNS, HTTP & HTTPS
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding how browsers find websites and communicate securely.
          </p>
        </div>

        {/* DNS Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
            🌐 Domain Name System (DNS)
          </h2>
          <p className="mt-4 leading-relaxed">
            DNS is like the internet's phonebook. It translates human-friendly domain names (like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">google.com</code>) into machine-readable IP addresses (like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">142.250.185.46</code>). Without DNS, we would have to memorize numbers for every website.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg">How DNS Resolution Works</h3>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
                <li>Browser checks cache → OS cache → Router cache</li>
                <li>Recursive resolver (ISP DNS server) receives query</li>
                <li>Root nameserver directs to TLD (.com, .org) server</li>
                <li>TLD server points to authoritative nameserver</li>
                <li>Authoritative server returns IP address</li>
                <li>Browser caches result and connects to IP</li>
              </ol>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-mono text-sm mb-2">Real‑world example</h4>
              <p className="text-sm leading-relaxed">
                When Susmita from Barrackpore types <strong>“www.ichapurcollege.edu”</strong>, her laptop asks the college's DNS resolver → root → .edu TLD → college's DNS → returns IP. Total time: ~20–50ms.
              </p>
            </div>
          </div>

          {/* DNS SVG Diagram with animation */}
          <div className="mt-8 flex justify-center">
            <svg width="100%" height="200" viewBox="0 0 700 180" className="max-w-full h-auto">
              <rect width="700" height="180" fill="transparent" />
              <circle cx="50" cy="90" r="20" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2">
                <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="50" y="95" textAnchor="middle" fill="white" fontSize="12">Client</text>
              <path d="M70,90 L120,90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" fill="freeze" />
              </path>
              <rect x="130" y="75" width="80" height="30" fill="#10b981" rx="6" />
              <text x="170" y="94" textAnchor="middle" fill="white" fontSize="10">Resolver</text>
              <path d="M210,90 L250,90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="260" y="75" width="70" height="30" fill="#ef4444" rx="6" />
              <text x="295" y="94" textAnchor="middle" fill="white" fontSize="10">Root</text>
              <path d="M330,90 L370,90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="380" y="75" width="70" height="30" fill="#8b5cf6" rx="6" />
              <text x="415" y="94" textAnchor="middle" fill="white" fontSize="10">TLD</text>
              <path d="M450,90 L490,90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="500" y="75" width="100" height="30" fill="#06b6d4" rx="6" />
              <text x="550" y="94" textAnchor="middle" fill="white" fontSize="10">Authoritative</text>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
          <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span> Client &nbsp;
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1 ml-2"></span> Resolver &nbsp;
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1 ml-2"></span> Root &nbsp;
            <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-1 ml-2"></span> TLD &nbsp;
            <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-1 ml-2"></span> Authoritative
          </div>
        </div>

        {/* HTTP Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-700 dark:text-green-300">
            📡 HTTP – HyperText Transfer Protocol
          </h2>
          <p className="mt-4 leading-relaxed">
            HTTP defines how messages are formatted and transmitted between a web browser (client) and a web server. It's stateless (each request is independent) and uses methods like GET, POST, PUT, DELETE.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center flex-1 min-w-[120px]">
              <span className="font-bold text-blue-600 dark:text-blue-300">GET</span>
              <p className="text-xs mt-1">Retrieve data</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center flex-1 min-w-[120px]">
              <span className="font-bold text-green-600 dark:text-green-300">POST</span>
              <p className="text-xs mt-1">Send data (login)</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center flex-1 min-w-[120px]">
              <span className="font-bold text-yellow-600 dark:text-yellow-300">PUT</span>
              <p className="text-xs mt-1">Update resource</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center flex-1 min-w-[120px]">
              <span className="font-bold text-red-600 dark:text-red-300">DELETE</span>
              <p className="text-xs mt-1">Remove resource</p>
            </div>
          </div>
          <div className="mt-6 relative bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 font-mono text-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-green-600 dark:text-green-400">→ Request</span>
                <pre className="mt-1">GET /index.html HTTP/1.1<br/>Host: www.example.com<br/>User-Agent: Chrome</pre>
              </div>
              <div className="text-right">
                <span className="text-blue-600 dark:text-blue-400">← Response</span>
                <pre className="mt-1">HTTP/1.1 200 OK<br/>Content-Type: text/html<br/>&lt;html&gt;...&lt;/html&gt;</pre>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            💡 <strong>Real world:</strong> When Debangshu submits a form on Kolkata’s municipal website, HTTP POST sends his data. Response codes like <span className="font-mono">200 (OK)</span>, <span className="font-mono">404 (Not Found)</span>, or <span className="font-mono">500 (Server Error)</span> inform the result.
          </div>
        </div>

        {/* HTTPS Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-700 dark:text-red-300">
            🔒 HTTPS = HTTP + SSL/TLS
          </h2>
          <p className="mt-4 leading-relaxed">
            HTTPS encrypts HTTP traffic using TLS (Transport Layer Security). It prevents eavesdropping, tampering, and impersonation. Padlock icon in browser = HTTPS active.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="font-medium">TLS Handshake (simplified)</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
                <li>ClientHello (supported ciphers)</li>
                <li>ServerHello + certificate</li>
                <li>Client verifies certificate (CA chain)</li>
                <li>Key exchange (RSA / DH)</li>
                <li>Encrypted communication starts</li>
              </ol>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl text-center">
              <svg width="160" height="100" viewBox="0 0 160 100" className="mx-auto">
                <rect x="10" y="30" width="40" height="40" fill="#3b82f6" rx="8">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="30" y="55" textAnchor="middle" fill="white" fontSize="10">Client</text>
                <path d="M55,50 L95,50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                </path>
                <rect x="100" y="30" width="50" height="40" fill="#10b981" rx="8" />
                <text x="125" y="55" textAnchor="middle" fill="white" fontSize="10">Server</text>
                <text x="30" y="85" fontSize="10" fill="#facc15">🔐 Encrypted</text>
              </svg>
              <p className="text-xs mt-2">Encrypted tunnel (TLS)</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
            <p className="text-sm font-medium">⚠️ Common mistake: Mixed content</p>
            <p className="text-xs">HTTPS page loading HTTP resources (images, scripts) → browser may block or warn. Always use relative or HTTPS URLs.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms] grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 p-5">
            <h3 className="font-bold text-red-700 dark:text-red-300 flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Forgetting that DNS changes can take 24-48 hours (TTL cache).</li>
              <li>Using HTTP for login forms → credentials sent in plaintext.</li>
              <li>Assuming HTTPS guarantees site is safe (certificates can be misissued).</li>
              <li>Not handling DNS timeouts in code → slow user experience.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 p-5">
            <h3 className="font-bold text-green-700 dark:text-green-300 flex items-center gap-2">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Use DNS prefetching <code className="text-xs">&lt;link rel="dns-prefetch"&gt;</code> for performance.</li>
              <li>Always redirect HTTP → HTTPS (301 redirect).</li>
              <li>Implement HSTS (HTTP Strict Transport Security) header.</li>
              <li>Validate TLS certificates (don't ignore warnings).</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/40 rounded-xl p-5 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
          <h3 className="font-bold text-lg mb-3">📋 Mini Checklist – Students should remember:</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div>☐ DNS maps domain → IP (like phonebook).</div>
            <div>☐ HTTP is stateless, uses methods GET/POST/PUT/DELETE.</div>
            <div>☐ HTTPS = HTTP + TLS encryption.</div>
            <div>☐ Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error.</div>
            <div>☐ Always prefer HTTPS, never send passwords over HTTP.</div>
          </div>
        </div>

        {/* Hints Section */}
        <div className="border-l-4 border-blue-400 bg-blue-50/40 dark:bg-blue-900/20 p-5 rounded-r-xl animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
          <h4 className="font-semibold flex items-center gap-1">💡 Think about…</h4>
          <p className="text-sm mt-1">What would happen if a recursive DNS resolver gets compromised? How would that affect Mamata in Jadavpur trying to visit her bank's website?</p>
          <p className="text-sm mt-2">Try changing the <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Hosts</code> file on your computer – observe how DNS is bypassed.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
          <FAQTemplate title="DNS & HTTP/HTTPS FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1500ms]">
          <Teacher note="Remember: DNS uses UDP port 53 for queries, HTTP uses TCP port 80, HTTPS uses TCP port 443. Use `nslookup` or `dig` to inspect DNS live. For HTTP, always check the `Referer` header – many beginners forget its privacy implications. Encourage students to open browser Developer Tools → Network tab to see every request/response." />
        </div>
      </div>
    </div>
  );
};

export default Topic0;