import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic9: Presentation Layer – data translation, encryption, compression
 * 
 * Purpose: Explain the presentation layer's role in data translation,
 *          encryption/decryption, and compression/decompression.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Builds on session layer to show how data is formatted, secured,
 *              and compressed for transmission.
 */

const Topic9 = () => {
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
              Presentation Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Layer 6: Data translation, encryption, compression — the universal translator of the network
            </p>
          </section>

          {/* Real-World Analogy: Interpreter & Security Guard */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🌍 Real-World Analogy: Interpreter & Security Guard
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> (English speaker) in <strong>Barrackpore</strong> wants to send a secret message to <strong>Abhronila</strong> (French speaker) in <strong>Naihati</strong>.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Translation:</span> A translator converts English → French (and vice versa).</li>
              <li><span className="font-bold">Encryption:</span> A security guard scrambles the message so only the intended recipient can read it.</li>
              <li><span className="font-bold">Compression:</span> The message is condensed to travel faster (like zipping a file).</li>
            </ul>
            <p>
              The presentation layer handles all these tasks, ensuring that the application layer receives data in a format it understands, secure, and efficiently transmitted.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why is it important to have a standard format for data before encryption? Because both ends must agree on how to interpret the bytes.
            </div>
          </section>

          {/* Core Concepts: Translation, Encryption, Compression */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔑 Key Functions of Presentation Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-bold text-lg">Data Translation</h3>
                <p className="text-sm">Converts data between different formats (e.g., ASCII/EBCDIC, XML/JSON, integer byte ordering). Ensures applications understand each other.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-bold text-lg">Encryption</h3>
                <p className="text-sm">Scrambles data to prevent unauthorized access. Includes symmetric (AES) and asymmetric (RSA) encryption. Often integrated with SSL/TLS.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🗜️</div>
                <h3 className="font-bold text-lg">Compression</h3>
                <p className="text-sm">Reduces data size for efficient transmission. Lossless (ZIP, GIF) vs. lossy (JPEG, MP3). Saves bandwidth and reduces latency.</p>
              </div>
            </div>
          </section>

          {/* Protocols & Standards */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📡 Protocols & Standards at Presentation Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Translation Formats</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>ASCII, EBCDIC (character encoding)</li>
                  <li>JSON, XML, YAML (data interchange)</li>
                  <li>ASN.1 (Abstract Syntax Notation One) for telecom</li>
                  <li>XDR (External Data Representation)</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Encryption Standards</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>SSL/TLS (Secure Sockets Layer / Transport Layer Security)</li>
                  <li>AES, DES, 3DES (symmetric)</li>
                  <li>RSA, ECC (asymmetric)</li>
                  <li>IPsec (encryption at network layer, but includes presentation functions)</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Compression Algorithms</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Lossless: ZIP, GZIP, LZ77, DEFLATE</li>
                  <li>Lossy: JPEG, MPEG, MP3, H.264</li>
                  <li>Protocols: HTTP compression (gzip), TLS compression</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Devices / Systems</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Gateways (protocol translation)</li>
                  <li>SSL/TLS offloaders (load balancers)</li>
                  <li>Encryption appliances</li>
                  <li>Media transcoders</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed Example: SSL/TLS & Web Browsing */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🔒 Real-World Example: HTTPS (SSL/TLS)
            </h2>
            <p>
              When <strong>Tuhina</strong> visits a secure website (https://), the presentation layer (via TLS) performs:
            </p>
            <ul className="list-decimal list-inside ml-4 mt-2">
              <li><span className="font-bold">Encryption:</span> All data between browser and server is encrypted using a session key (AES).</li>
              <li><span className="font-bold">Compression:</span> Optionally, data is compressed before encryption (though modern TLS may compress after).</li>
              <li><span className="font-bold">Translation:</span> The browser and server agree on cipher suites and compression methods.</li>
            </ul>
            <p className="mt-2">
              Without the presentation layer, applications would have to implement these functions themselves, leading to complexity and inconsistency.
            </p>
          </section>

          {/* SVG Illustration: Presentation Layer Functions */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: Presentation Layer in Action
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="280" viewBox="0 0 550 280" className="max-w-full h-auto">
                <rect x="50" y="30" width="120" height="40" fill="#3b82f6" rx="5" />
                <text x="110" y="55" textAnchor="middle" fill="white" fontSize="10">Application</text>

                <rect x="50" y="100" width="120" height="40" fill="#8b5cf6" rx="5" />
                <text x="110" y="125" textAnchor="middle" fill="white" fontSize="10">Presentation</text>

                <rect x="50" y="170" width="120" height="40" fill="#10b981" rx="5" />
                <text x="110" y="195" textAnchor="middle" fill="white" fontSize="10">Session (below)</text>

                {/* Function boxes */}
                <rect x="250" y="20" width="80" height="35" fill="#ffaa44" rx="4" />
                <text x="290" y="43" textAnchor="middle" fill="black" fontSize="9">Translation</text>
                <rect x="350" y="20" width="80" height="35" fill="#ffaa44" rx="4" />
                <text x="390" y="43" textAnchor="middle" fill="black" fontSize="9">Encryption</text>
                <rect x="450" y="20" width="80" height="35" fill="#ffaa44" rx="4" />
                <text x="490" y="43" textAnchor="middle" fill="black" fontSize="9">Compression</text>

                <path d="M 170 110 L 250 37 L 350 37 L 450 37 L 490 37" stroke="gray" strokeWidth="1" strokeDasharray="4 2" />
                <text x="320" y="85" fill="#ffaa44" fontSize="10">Data passes through presentation functions</text>

                {/* Example data flow */}
                <text x="200" y="150" fill="currentColor" fontSize="10">"Hello"</text>
                <path d="M 170 120 L 200 150 L 170 180" stroke="#ffaa44" fill="none" strokeWidth="2" />
                <text x="200" y="200" fill="currentColor" fontSize="10">Encrypted bytes</text>

                <text x="275" y="250" textAnchor="middle" fill="currentColor" fontSize="12">Presentation layer prepares data for the session layer</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              The presentation layer translates, encrypts, and compresses data before passing it down to the session layer.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Always use TLS (HTTPS) for web traffic</span> to protect against eavesdropping and tampering.</li>
              <li><span className="font-bold">Enable HTTP compression (gzip/brotli)</span> on web servers to reduce bandwidth and improve load times.</li>
              <li><span className="font-bold">Be mindful of endianness</span> when transmitting binary data across different architectures; use network byte order (big-endian).</li>
              <li><span className="font-bold">Choose the right compression</span> based on data type: lossless for text, lossy for media.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming encryption alone guarantees security.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Need proper key management, certificate validation, and secure protocols (TLS 1.2/1.3, avoid deprecated ciphers).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Using lossy compression for text data (e.g., compressing a JSON response with JPEG).
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Lossless compression (gzip) for text; lossy for media.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "The presentation layer is obsolete because applications handle these tasks."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Many applications still rely on standards (TLS, compression) that operate as separate layers conceptually.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use standard data formats</span> (JSON, XML) with clear schemas to avoid parsing errors.</li>
              <li><span className="font-bold">Encrypt sensitive data at rest and in transit</span> — not just in the presentation layer.</li>
              <li><span className="font-bold">Implement compression after encryption</span> to avoid certain attacks (CRIME/BREACH). Modern TLS may compress before encryption.</li>
              <li><span className="font-bold">Validate input data</span> after decryption to prevent injection attacks.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Data translation (ASCII, EBCDIC, JSON, XML)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Encryption (SSL/TLS, AES, RSA)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Compression (lossless/lossy, gzip, JPEG)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Protocols: SSL/TLS, ASN.1, XDR</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Devices: gateways, SSL offloaders</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Ensures data is understood, secure, efficient</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Emphasize that the presentation layer is often overlooked because many of its functions are now integrated into applications or lower layers (e.g., TLS is often considered transport layer). Yet, the concepts remain crucial: translation, encryption, compression. Show students the 'cipher suite' in browser devtools (Security tab) to see presentation layer negotiation."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you visit a website, look at the padlock icon. Click it to see the TLS version and cipher suite. That's the presentation layer negotiating encryption algorithms.</p>
            <p className="mt-2 text-sm">Try this: Use `curl -v https://example.com` to see the TLS handshake details. Notice how client and server agree on cipher suites and compression methods.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What are the three main functions of the presentation layer?</p><p>Data translation, encryption/decryption, and compression/decompression.</p></div>
              <div><p className="font-bold">2. What is data translation in the context of the presentation layer?</p><p>Converting data between different formats (e.g., ASCII to EBCDIC, JSON to XML) so that applications can understand each other.</p></div>
              <div><p className="font-bold">3. Why is encryption important at the presentation layer?</p><p>To protect data confidentiality and integrity during transmission, preventing eavesdropping and tampering.</p></div>
              <div><p className="font-bold">4. What is the difference between lossless and lossy compression?</p><p>Lossless retains all original data (e.g., ZIP), lossy discards some data to achieve higher compression (e.g., JPEG).</p></div>
              <div><p className="font-bold">5. Name a protocol commonly used for encryption at the presentation layer.</p><p>SSL/TLS (Secure Sockets Layer / Transport Layer Security).</p></div>
              <div><p className="font-bold">6. What is the role of ASN.1?</p><p>Abstract Syntax Notation One — a standard for describing data structures used in telecommunications and cryptography.</p></div>
              <div><p className="font-bold">7. How does compression improve network performance?</p><p>Reduces the amount of data transmitted, saving bandwidth and reducing transmission time.</p></div>
              <div><p className="font-bold">8. What is the difference between symmetric and asymmetric encryption?</p><p>Symmetric uses one key for both encryption and decryption; asymmetric uses a public/private key pair.</p></div>
              <div><p className="font-bold">9. Give an example of lossy compression.</p><p>JPEG (images), MP3 (audio), MPEG (video).</p></div>
              <div><p className="font-bold">10. What is character encoding and why is it part of the presentation layer?</p><p>Character encoding maps characters to binary values (e.g., ASCII, UTF-8). The presentation layer ensures that both ends use the same encoding.</p></div>
              <div><p className="font-bold">11. What is the purpose of the TLS handshake?</p><p>To negotiate cipher suites, exchange keys, and establish a secure session before data transfer.</p></div>
              <div><p className="font-bold">12. Can compression and encryption be applied together? Give an example.</p><p>Yes, HTTP over TLS (HTTPS) often compresses data (gzip) before or after encryption.</p></div>
              <div><p className="font-bold">13. What is endianness and why is it relevant?</p><p>Endianness is the byte order of multi-byte data. Different architectures use different orders; the presentation layer can convert to network byte order (big-endian).</p></div>
              <div><p className="font-bold">14. What devices operate at the presentation layer?</p><p>Gateways, SSL/TLS offloaders, media transcoders, and encryption appliances.</p></div>
              <div><p className="font-bold">15. Why is the presentation layer often merged with application layer in TCP/IP?</p><p>Because many of its functions are implemented within application protocols (e.g., HTTP uses TLS and compression).</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic9;