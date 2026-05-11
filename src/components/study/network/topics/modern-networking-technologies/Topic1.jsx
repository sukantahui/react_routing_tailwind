// Topic1.jsx
// Prototype: function Topic1(): JSX.Element
// Return type: JSX.Element
// Purpose: Provides a comprehensive, interactive lesson on IoT protocols MQTT and CoAP,
//          including publish/subscribe patterns, lightweight design, Quality of Service, and real-world use cases.
// When & why used: Essential for students learning IoT communication, edge computing, and constrained networks.
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic1_files/topic1_questions';

// Inline keyframes (zero config, motion-safe)
const keyframes = `
  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(24px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes pulseGlow {
    0%, 100% { filter: drop-shadow(0 0 2px rgba(6,182,212,0)); }
    50% { filter: drop-shadow(0 0 8px rgba(6,182,212,0.6)); }
  }
  @keyframes messageFlow {
    0% { stroke-dashoffset: 24; }
    100% { stroke-dashoffset: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeSlideUp, .animate-pulseGlow, .animate-messageFlow {
      animation: none !important;
      opacity: 1;
      transform: none;
    }
  }
`;

const Topic1 = () => {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <section className="space-y-4 text-center animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            IoT Protocols: MQTT & CoAP
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Lightweight, efficient communication for constrained devices and unreliable networks.
          </p>
          <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
        </section>

        {/* Introduction: Why special protocols? */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-100" style={{animationDelay: '100ms'}}>
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-cyan-300">
              <span>📡</span> Why IoT Needs Its Own Protocols
            </h2>
            <p className="mt-3 leading-relaxed text-gray-200">
              Traditional HTTP is too heavy for IoT: large headers, high power consumption, persistent connections, and request-response overhead.  
              IoT devices often have <strong>limited CPU, memory, battery, and unreliable network links</strong>.  
              <strong className="text-cyan-300">MQTT (Message Queuing Telemetry Transport)</strong> and <strong className="text-emerald-300">CoAP (Constrained Application Protocol)</strong> are designed specifically for these constraints.
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-800/40 p-3 rounded-lg">
                <p className="font-semibold text-cyan-300">📨 MQTT</p>
                <p className="text-sm">Publish/Subscribe, runs over TCP, QoS levels, ideal for many-to-many communication.</p>
              </div>
              <div className="bg-gray-800/40 p-3 rounded-lg">
                <p className="font-semibold text-emerald-300">🌐 CoAP</p>
                <p className="text-sm">Request/Response + Observe, runs over UDP, RESTful, built for 6LoWPAN.</p>
              </div>
            </div>
            <p className="mt-2 text-gray-300 italic">
              🏭 <strong>Real scenario:</strong> Barrackpore’s smart water meter project uses MQTT to send readings from 2000 sensors to a central broker; each meter wakes up once per hour, publishes data, and sleeps.
            </p>
          </div>
        </section>

        {/* MQTT Detailed Section with SVG Animation */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-200" style={{animationDelay: '200ms'}}>
          <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700 transition-all duration-300 hover:border-cyan-500/40">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">📦 MQTT – Publish/Subscribe Model</h2>
            <div className="flex justify-center">
              <svg viewBox="0 0 800 380" className="w-full max-w-3xl h-auto bg-gray-900 rounded-xl p-2 shadow-inner">
                {/* Broker */}
                <rect x="300" y="130" width="200" height="70" rx="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="400" y="162" textAnchor="middle" fill="#a5f3fc" fontSize="16" fontWeight="bold">MQTT Broker</text>
                <text x="400" y="182" textAnchor="middle" fill="#94a3b8" fontSize="11">(e.g., Mosquitto, EMQX)</text>

                {/* Publisher (Sensor) */}
                <circle cx="100" cy="220" r="28" fill="#111827" stroke="#facc15" strokeWidth="2" />
                <text x="100" y="215" textAnchor="middle" fill="#fde047" fontSize="10">🌡️</text>
                <text x="100" y="235" textAnchor="middle" fill="#fde047" fontSize="10">Publisher</text>
                <text x="100" y="250" textAnchor="middle" fill="#9ca3af" fontSize="8">(temp sensor)</text>

                {/* Subscribers */}
                <circle cx="700" cy="160" r="28" fill="#111827" stroke="#10b981" strokeWidth="2" />
                <text x="700" y="155" textAnchor="middle" fill="#6ee7b7" fontSize="10">📱</text>
                <text x="700" y="175" textAnchor="middle" fill="#6ee7b7" fontSize="10">Subscriber</text>
                <text x="700" y="190" textAnchor="middle" fill="#9ca3af" fontSize="8">(dashboard)</text>

                <circle cx="700" cy="260" r="28" fill="#111827" stroke="#10b981" strokeWidth="2" />
                <text x="700" y="255" textAnchor="middle" fill="#6ee7b7" fontSize="10">💾</text>
                <text x="700" y="275" textAnchor="middle" fill="#6ee7b7" fontSize="10">Subscriber</text>
                <text x="700" y="290" textAnchor="middle" fill="#9ca3af" fontSize="8">(database)</text>

                {/* Publish arrow: Publisher → Broker */}
                <path d="M128 220 L290 165" fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                <text x="190" y="185" fill="#facc15" fontSize="10">PUBLISH "temp/room1"</text>

                {/* Subscribe arrows: Broker → Subscribers */}
                <path d="M500 150 L672 150" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite" />
                </path>
                <path d="M500 175 L672 250" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.4s" repeatCount="indefinite" />
                </path>
                <text x="580" y="135" fill="#6ee7b7" fontSize="10">SUBSCRIBE "temp/#"</text>
                <text x="580" y="225" fill="#6ee7b7" fontSize="10">SUBSCRIBE "temp/room1"</text>

                {/* Topic bubble */}
                <rect x="310" y="230" width="180" height="30" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="400" y="250" textAnchor="middle" fill="#cbd5e1" fontSize="11">Topic: "temp/room1"</text>
              </svg>
            </div>
            <p className="text-center text-gray-400 text-sm mt-3">🔁 <strong>MQTT flow:</strong> Publisher sends to topic → Broker matches subscriptions → Forwards to all subscribers.</p>
            
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold text-cyan-200">Key MQTT Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-200 list-disc pl-5">
                <li><strong>QoS 0,1,2</strong> – at most once, at least once, exactly once.</li>
                <li><strong>Last Will & Testament</strong> – broker notifies others if client disconnects unexpectedly.</li>
                <li><strong>Retained Messages</strong> – new subscribers instantly receive last published value.</li>
                <li><strong>Clean/Persistent Sessions</strong> – store subscriptions for offline clients.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CoAP Detailed Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-300" style={{animationDelay: '300ms'}}>
          <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700 transition-all duration-300 hover:border-emerald-500/40">
            <h2 className="text-2xl font-semibold mb-3 text-emerald-300">🌿 CoAP – RESTful for Constrained Networks</h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex-1">
                <p className="text-gray-200 leading-relaxed">
                  CoAP is like <strong>HTTP for UDP</strong>. It uses request/response methods (GET, POST, PUT, DELETE) and lightweight header (4 bytes).  
                  It supports <strong>Observe</strong> (similar to MQTT subscription) and <strong>Blockwise transfer</strong> for large payloads.  
                  Built for <strong>6LoWPAN</strong> (IPv6 over low-power wireless), CoAP translates easily to HTTP via cross-proxy.
                </p>
                <div className="mt-3 bg-gray-900/60 p-3 rounded-lg border-l-4 border-emerald-500">
                  <p className="font-mono text-sm text-emerald-200">coap://[2001:db8::1]:5683/sensors/temperature</p>
                  <p className="text-xs text-gray-400 mt-1">GET returns current temperature; Observe keeps the connection open for updates.</p>
                </div>
              </div>
              <svg width="280" height="200" viewBox="0 0 300 200" className="bg-gray-800/40 rounded-lg p-2">
                <rect x="20" y="70" width="100" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="70" y="100" textAnchor="middle" fill="#a7f3d0" fontSize="12">CoAP Client</text>
                <rect x="180" y="70" width="100" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="230" y="100" textAnchor="middle" fill="#a7f3d0" fontSize="12">CoAP Server</text>
                <line x1="120" y1="95" x2="180" y2="95" stroke="#facc15" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
                <text x="150" y="80" textAnchor="middle" fill="#facc15" fontSize="9">GET /temp</text>
                <line x1="180" y1="120" x2="120" y2="120" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
                <text x="150" y="138" textAnchor="middle" fill="#34d399" fontSize="9">2.05 Content</text>
                <path d="M70 120 L70 160 L230 160 L230 120" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1.5s" repeatCount="indefinite" />
                </path>
                <text x="150" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">Observe (async updates)</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Comparison Table: MQTT vs CoAP */}
        <section className="animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-400" style={{animationDelay: '400ms'}}>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-indigo-600/30 overflow-x-auto">
            <h3 className="text-xl font-semibold text-indigo-300 mb-3">⚖️ MQTT vs CoAP – When to use what?</h3>
            <table className="w-full text-left text-gray-200">
              <thead className="border-b border-gray-600">
                <tr><th className="py-2">Feature</th><th className="py-2">MQTT</th><th className="py-2">CoAP</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr><td className="py-2">Transport</td><td>TCP</td><td>UDP</td></tr>
                <tr><td className="py-2">Pattern</td><td>Pub/Sub (broker)</td><td>Request/Response + Observe</td></tr>
                <tr><td className="py-2">Header size</td><td>2 bytes fixed + variable</td><td>4 bytes fixed</td></tr>
                <tr><td className="py-2">Reliability</td><td>QoS levels</td><td>Confirmable messages (ACK)</td></tr>
                <tr><td className="py-2">Caching</td><td>Not native (retain only)</td><td>HTTP‑like caching</td></tr>
                <tr><td className="py-2">Best for</td><td>Many-to-many, cloud backends</td><td>Direct device-to-device, REST compatibility</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pro Tips & Common Mistakes */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-500" style={{animationDelay: '500ms'}}>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-yellow-600/40 hover:border-yellow-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-300">💡 Pro Tips & Tricks</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Use MQTT over WebSockets</strong> for browser‑based dashboards.</li>
              <li><strong>Set KeepAlive interval</strong> to detect broken connections (e.g., 60s).</li>
              <li><strong>Design topic hierarchy:</strong> `site/floor/room/sensor_type` for easy wildcard subscriptions.</li>
              <li><strong>Enable TLS for MQTT and CoAP</strong> (DTLS for CoAP) in production.</li>
              <li><strong>Use CoAP Observe</strong> instead of polling for real‑time sensor data – saves battery.</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-5 border border-red-600/40 hover:border-red-400 transition-all duration-300">
            <h3 className="text-xl font-semibold text-red-300">⚠️ Common Mistakes (Beginners)</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-gray-200">
              <li><strong>Using QoS 2 in lossy networks</strong> – huge overhead; QoS 1 often enough.</li>
              <li><strong>Not handling reconnection</strong> – clients need to resubscribe after disconnect.</li>
              <li><strong>Too large payloads</strong> → fragmentation or broker memory issues.</li>
              <li><strong>CoAP over UDP with no confirmable flag</strong> – messages silently lost.</li>
              <li><strong>No token matching</strong> in CoAP responses – leads to mismatched requests.</li>
            </ul>
          </div>
        </section>

        {/* Best Practices + Mini Checklist */}
        <section className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-600" style={{animationDelay: '600ms'}}>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-blue-600/30">
            <h3 className="text-xl font-semibold text-blue-200">✅ Best Practices</h3>
            <ul className="mt-2 space-y-1.5 text-gray-200 list-decimal pl-5">
              <li>Keep payload sizes under 1KB for constrained networks.</li>
              <li>Use MQTT's Last Will to detect offline devices.</li>
              <li>Separate control topics (`/cmd`) from data topics (`/data`).</li>
              <li>Implement back‑off reconnection (exponential backoff).</li>
              <li>Test with simulators (MQTT.fx, Copper for CoAP).</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-green-600/30">
            <h3 className="text-xl font-semibold text-green-200">📋 Mini Checklist</h3>
            <ul className="mt-2 space-y-1.5 text-gray-200 list-check">
              <li>✔️ Understand publish/subscribe decoupling</li>
              <li>✔️ Know MQTT QoS levels and trade‑offs</li>
              <li>✔️ Able to explain CoAP Observe and Blockwise</li>
              <li>✔️ Choose protocol based on network constraints</li>
              <li>✔️ Secure both protocols with TLS/DTLS</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <div className="bg-gray-800/60 border-l-4 border-cyan-400 p-5 rounded-r-xl animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out] animation-delay-700" style={{animationDelay: '700ms'}}>
          <p className="text-cyan-200 italic">💭 <strong>Think about:</strong> “If you have 10,000 temperature sensors in Jadavpur and a central server in Kolkata, and the network is GPRS with high packet loss, which MQTT QoS would you choose? Why not CoAP?”</p>
          <p className="text-gray-300 text-sm mt-2">Observe carefully: With lossy networks, MQTT QoS 1 (at least once) ensures delivery without the overhead of QoS 2. CoAP over UDP might be unreliable without Confirmable messages, but that adds extra RTT.</p>
        </div>

        {/* FAQs - 30 questions */}
        <FAQTemplate
          title="IoT Protocols – MQTT & CoAP FAQ"
          questions={questions}
        />

        {/* Teacher's Note */}
        <Teacher note={
          "Students often confuse MQTT and CoAP because both are lightweight. Stress the architectural difference: MQTT needs a broker (centralized) while CoAP can be peer‑to‑peer. Demonstrate using a live Mosquitto broker and `mosquitto_sub`/`mosquitto_pub`. For CoAP, use `libcoap` or `coap-client`. Ask them: 'What happens if the broker goes down?' – introduce MQTT bridge and clustering. Challenge them to design a smart lighting system using both protocols."
        } />

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          © IoT Protocols – MQTT & CoAP | Production‑ready learning for connected devices
        </div>
      </div>
    </main>
  );
};

export default Topic1;