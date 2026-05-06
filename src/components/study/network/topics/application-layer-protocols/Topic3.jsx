// Topic3.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic3_files/topic3_questions';

/**
 * Component: Topic3
 * Purpose: Explain SNMP (Simple Network Management Protocol) basics – architecture, versions, MIB, OID, operations.
 * Prototype: function Topic3()
 * Return: JSX.Element
 * When & why: Used in network management curriculum to teach monitoring and alerting of network devices.
 */

const Topic3 = () => {
  return (
    <div className="dark min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 p-6 md:p-10">
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

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-300 bg-clip-text text-transparent">
            SNMP Basics
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Simple Network Management Protocol – monitoring routers, switches, servers, and IoT devices.
          </p>
        </div>

        {/* SNMP Architecture Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-700 dark:text-teal-300">
            🏗️ SNMP Architecture
          </h2>
          <p className="mt-4 leading-relaxed">
            SNMP is an application-layer protocol for collecting and organizing information about managed devices on IP networks. It consists of three key components:
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 dark:bg-gray-700/40 rounded-xl p-3">
              <div className="text-3xl">🖥️</div>
              <h3 className="font-bold mt-1">Managed Device</h3>
              <p className="text-xs">Router, switch, server, printer – runs SNMP agent.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/40 rounded-xl p-3">
              <div className="text-3xl">🤖</div>
              <h3 className="font-bold mt-1">SNMP Agent</h3>
              <p className="text-xs">Software on device that responds to queries and sends traps.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/40 rounded-xl p-3">
              <div className="text-3xl">📊</div>
              <h3 className="font-bold mt-1">NMS (Manager)</h3>
              <p className="text-xs">Network Management System – polls agents, receives traps.</p>
            </div>
          </div>

          {/* SNMP SVG diagram */}
          <div className="mt-8 flex justify-center">
            <svg width="100%" height="180" viewBox="0 0 700 180" className="max-w-full h-auto">
              <rect x="20" y="40" width="140" height="60" fill="#0d9488" rx="8" />
              <text x="90" y="65" textAnchor="middle" fill="white" fontSize="12">NMS (Manager)</text>
              <text x="90" y="85" textAnchor="middle" fill="white" fontSize="10">e.g., Zabbix</text>
              <path d="M160,70 L240,70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#snmpArrow)">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="200" y="60" fontSize="10" fill="#f59e0b">Get/Set</text>
              <rect x="250" y="40" width="140" height="60" fill="#0891b2" rx="8" />
              <text x="320" y="65" textAnchor="middle" fill="white" fontSize="12">Agent (Router)</text>
              <text x="320" y="85" textAnchor="middle" fill="white" fontSize="10">UDP 161</text>
              <path d="M250,110 L160,130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#trapArrow)" />
              <text x="200" y="140" fontSize="10" fill="#ef4444">Trap (UDP 162)</text>
              <rect x="420" y="40" width="140" height="60" fill="#059669" rx="8" />
              <text x="490" y="65" textAnchor="middle" fill="white" fontSize="12">Agent (Switch)</text>
              <defs>
                <marker id="snmpArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" /></marker>
                <marker id="trapArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" /></marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* SNMP Versions */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            📜 SNMP Versions
          </h2>
          <div className="mt-4 space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-bold">SNMPv1 (1988)</h3>
              <p className="text-sm mt-1">Original protocol. Security based on <strong>community strings</strong> (public/private) sent in plaintext. Widely deprecated.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-bold">SNMPv2c (1996)</h3>
              <p className="text-sm mt-1">Improved performance (GETBULK) and error handling. Still uses plaintext community strings – same security flaw.</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-bold">SNMPv3 (1998)</h3>
              <p className="text-sm mt-1">Adds security: authentication (MD5/SHA), privacy (DES/AES), and access control (USM). <strong>Always use v3</strong> for production.</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded">
            <p className="text-sm font-medium">⚠️ Security Alert: SNMPv1/v2c community strings are like passwords sent in clear. Many IoT devices still default to "public".</p>
          </div>
        </div>

        {/* MIB & OID Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
            🌳 MIB & OID – The SNMP Tree
          </h2>
          <p className="mt-4 leading-relaxed">
            <strong>MIB (Management Information Base)</strong> is a hierarchical database describing device parameters. Each parameter has an <strong>OID (Object Identifier)</strong> – a numeric address in the global SNMP tree.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex-1 font-mono text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <div>iso (1)</div>
              <div className="ml-4">org (3)</div>
              <div className="ml-8">dod (6)</div>
              <div className="ml-12">internet (1)</div>
              <div className="ml-16">private (4)</div>
              <div className="ml-20">enterprises (1)</div>
              <div className="ml-24">company (e.g., 9 → Cisco)</div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Common OIDs</h3>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li><span className="font-mono">.1.3.6.1.2.1.1.1.0</span> – sysDescr (system description)</li>
                <li><span className="font-mono">.1.3.6.1.2.1.1.3.0</span> – sysUpTime (uptime)</li>
                <li><span className="font-mono">.1.3.6.1.2.1.2.2.1.10</span> – ifInOctets (interface bytes in)</li>
                <li><span className="font-mono">.1.3.6.1.4.1.9.9.48.1.1.1.2.1</span> – Cisco specific</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-sm">
            💡 Real‑world: Mahima from Kolkata monitors her office switch's CPU load using OID <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.1.3.6.1.4.1.2021.10.1.3.1</code> (UCD-SNMP-MIB).
          </div>
        </div>

        {/* SNMP Operations */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            🔄 SNMP Operations (PDU Types)
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg">
              <span className="font-bold text-blue-600">GET</span> – retrieve value of one OID.
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg">
              <span className="font-bold text-blue-600">GETNEXT</span> – retrieve next OID (walk the tree).
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg">
              <span className="font-bold text-green-600">GETBULK</span> (v2c/v3) – retrieve multiple OIDs in one request.
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg">
              <span className="font-bold text-red-600">SET</span> – modify a value (e.g., enable port, change config).
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg">
              <span className="font-bold text-purple-600">TRAP</span> – asynchronous alert from agent to manager (port 162).
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg">
              <span className="font-bold text-orange-600">INFORM</span> – acknowledged trap (requires response).
            </div>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms] grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 p-5">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Leaving default community strings "public" / "private" – easy attack vector.</li>
              <li>Using SNMPv1/v2c over the internet – plaintext community strings exposed.</li>
              <li>Blocking UDP 161/162 in firewalls breaks monitoring.</li>
              <li>Assuming all OIDs exist – different devices have different MIB support.</li>
              <li>Not loading proper MIB files → cryptic OID numbers instead of names.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 p-5">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Always use SNMPv3 with authentication and encryption.</li>
              <li>Change community strings to strong secrets (if v2c unavoidable).</li>
              <li>Restrict SNMP access via ACLs (allow only monitoring server IP).</li>
              <li>Use `snmpwalk` to explore MIB trees.</li>
              <li>Deploy network monitoring systems (Zabbix, PRTG, LibreNMS).</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/40 rounded-xl p-5 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
          <h3 className="font-bold text-lg mb-3">📋 Mini Checklist – Students should remember:</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div>☐ SNMP = protocol for monitoring network devices.</div>
            <div>☐ Components: Manager, Agent, MIB, OID.</div>
            <div>☐ Versions: v1 (obsolete), v2c (common but insecure), v3 (secure).</div>
            <div>☐ Community strings = passwords (plaintext in v1/v2c).</div>
            <div>☐ OIDs are hierarchical: .1.3.6.1... (iso.org.dod.internet).</div>
            <div>☐ Operations: GET, GETNEXT, GETBULK, SET, TRAP.</div>
            <div>☐ UDP ports 161 (queries), 162 (traps).</div>
          </div>
        </div>

        {/* Hints Section */}
        <div className="border-l-4 border-blue-400 bg-blue-50/40 dark:bg-blue-900/20 p-5 rounded-r-xl animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
          <h4 className="font-semibold flex items-center gap-1">💡 Think about…</h4>
          <p className="text-sm mt-1">Why would an attacker scan UDP 161? What information could they learn about your network from SNMPv2c?</p>
          <p className="text-sm mt-2">Try `snmpwalk -v2c -c public localhost .1.3.6.1.2.1.1` on a Linux machine with SNMP enabled. Observe the system information.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1500ms]">
          <FAQTemplate title="SNMP FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1700ms]">
          <Teacher note="Demonstrate live SNMP query using command-line tools: `snmpget`, `snmpwalk`. Show the difference between v2c (plaintext, capture with tcpdump) and v3 (encrypted). Highlight that many enterprise networks still run v2c internally – discuss risk. Also point out MIB files are often not installed by default – need net-snmp-mibs package. For practice, let students set up a simple monitoring script polling CPU load, then an alarm when threshold exceeded." />
        </div>
      </div>
    </div>
  );
};

export default Topic3;