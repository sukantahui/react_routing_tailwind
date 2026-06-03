// Topic_HDLC.jsx
import React from 'react';
// import FAQTemplate from '../../../../../common/FAQTemplate';
import FAQTemplate from "../../../../../../common/FAQTemplate";
// import ShellFileLoader from '../../../../../common/ShellFileLoader';
import ShellFileLoader from '../../../../../../common/ShellFileLoader'
import questions from './topic_hdlc_questions';
import hdlcFrameSh from './hdlc_frame.sh?raw';
import hdlcBitStuffingC from './hdlc_bitstuffing.c?raw';

const Topic_HDLC = () => {
  const keyframesStyle = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(1.5rem); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Header Section */}
          <section className="text-center space-y-4 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              High‑Level Data Link Control (HDLC)
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A bit‑oriented, reliable protocol for point‑to‑point and multipoint links
            </p>
          </section>

          {/* Core Concepts */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              📡 What is HDLC?
            </h2>
            <p>
              HDLC is a <strong>bit‑oriented data link layer protocol</strong> defined by ISO (ISO/IEC 13239:2002). It provides reliable, error‑controlled communication over synchronous serial links. HDLC is the basis for many other protocols, including SDLC (IBM), LAPB (X.25), and PPP's LCP.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Bit‑oriented</strong> – uses bit stuffing for transparency</li>
              <li><strong>Full‑duplex</strong> – supports simultaneous transmission</li>
              <li><strong>Error control</strong> – Go‑Back‑N or Selective Repeat</li>
              <li><strong>Three station types</strong> – Primary, Secondary, Combined</li>
            </ul>
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`HDLC Frame Format:
+-------+--------+--------+----------+--------+-------+
| Flag  | Address| Control|  Info    |  FCS   | Flag  |
| 01111110|  8 bits | 8/16   | variable | 16/32  |01111110|
+-------+--------+--------+----------+--------+-------+`}
              </pre>
            </div>
          </section>

          {/* Analogy */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🏭 Real‑world Analogy
            </h2>
            <p>
              Imagine a railway system in <strong>Barrackpore</strong>. The <strong>primary station</strong> is the main control room; <strong>secondary stations</strong> are local substations. The flag sequence is like a red/green signal (01111110) that marks train boundaries. The address field tells which substation the message is for. The control field gives orders (start, stop, data). Data is the cargo. FCS (Frame Check Sequence) is the inspector checking that nothing is damaged. HDLC ensures every train arrives correctly, with retransmission if something goes wrong.
            </p>
            <div className="mt-4 border-l-4 border-purple-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
              "HDLC is the language that serial links use to speak reliably."
            </div>
          </section>

          {/* HDLC Frame Structure SVG */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              📦 HDLC Frame Format – Detailed View
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="750" height="200" viewBox="0 0 750 200" className="max-w-full h-auto">
                <defs><filter id="shadow-hdlc"><feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/></filter></defs>
                {/* Flag */}
                <g transform="translate(20, 50)" filter="url(#shadow-hdlc)"><rect x="0" y="-20" width="70" height="40" rx="6" fill="#3b82f6" /><text x="35" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Flag</text><text x="35" y="22" textAnchor="middle" fill="white" fontSize="10">0x7E</text><title>8‑bit flag (01111110) – frame delimiter</title></g>
                <g transform="translate(100, 50)" filter="url(#shadow-hdlc)"><rect x="0" y="-20" width="70" height="40" rx="6" fill="#10b981" /><text x="35" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Addr</text><text x="35" y="22" textAnchor="middle" fill="white" fontSize="10">8 bits</text><title>Primary/secondary station identifier</title></g>
                <g transform="translate(180, 50)" filter="url(#shadow-hdlc)"><rect x="0" y="-20" width="80" height="40" rx="6" fill="#f59e0b" /><text x="40" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Control</text><text x="40" y="22" textAnchor="middle" fill="white" fontSize="10">8/16 bits</text><title>Frame type (I, S, U) and sequence numbers</title></g>
                <g transform="translate(270, 50)" filter="url(#shadow-hdlc)"><rect x="0" y="-20" width="100" height="40" rx="6" fill="#ef4444" /><text x="50" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Info</text><text x="50" y="22" textAnchor="middle" fill="white" fontSize="10">variable</text><title>User data (optional, only in I‑frames)</title></g>
                <g transform="translate(380, 50)" filter="url(#shadow-hdlc)"><rect x="0" y="-20" width="70" height="40" rx="6" fill="#8b5cf6" /><text x="35" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">FCS</text><text x="35" y="22" textAnchor="middle" fill="white" fontSize="10">16/32</text><title>Frame Check Sequence (CRC) – error detection</title></g>
                <g transform="translate(460, 50)" filter="url(#shadow-hdlc)"><rect x="0" y="-20" width="70" height="40" rx="6" fill="#3b82f6" /><text x="35" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Flag</text><text x="35" y="22" textAnchor="middle" fill="white" fontSize="10">0x7E</text><title>Ending delimiter</title></g>
                <text x="375" y="130" textAnchor="middle" fill="#6b7280" fontSize="12">Bit stuffing adds a 0 after every five consecutive 1s to avoid false flags</text>
              </svg>
            </div>
          </section>

          {/* Control Field Explanation */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🎮 HDLC Control Field (8‑bit format)
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="border-l-4 border-green-500 pl-3"><span className="font-bold">I‑frame (Information)</span><br />Bit0 = 0. Carries user data. Sequence numbers for flow control.</div>
              <div className="border-l-4 border-yellow-500 pl-3"><span className="font-bold">S‑frame (Supervisory)</span><br />Bits: 10 xx – ACK, NAK, REJ, RNR (receiver ready / not ready).</div>
              <div className="border-l-4 border-red-500 pl-3"><span className="font-bold">U‑frame (Unnumbered)</span><br />Bits: 11 xx – commands for link setup/disconnect (SABM, UA, DISC, FRMR).</div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">I‑frames also include N(R) (next expected) and N(S) (send sequence number) for sliding window.</p>
          </section>

          {/* Bit Stuffing Example */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-rose-500 pl-4 mb-4">
              🔄 Bit Stuffing – Transparency
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center font-mono">
              <p>Original data: 01111110 01111111 ...</p>
              <p className="text-green-600 dark:text-green-400">After stuffing: 01111110<strong>0</strong> 0111111<strong>0</strong>1 ...</p>
              <p className="text-sm mt-2">Every five consecutive 1s are followed by a stuffed 0. Receiver removes it.</p>
            </div>
            <ShellFileLoader
              fileModule={hdlcBitStuffingC}
              title="C implementation of HDLC bit stuffing"
              highlightLines={[8, 15, 22]}
            />
          </section>

          {/* Shell Demo */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              📜 HDLC Frame Analysis
            </h2>
            <ShellFileLoader
              fileModule={hdlcFrameSh}
              title="Simulate HDLC framing and bit stuffing (bash)"
              highlightLines={[5, 12]}
            />
          </section>

          {/* FAQ */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <FAQTemplate title="Data Link Layer: HDLC" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👨‍🏫</div>
              <div>
                <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">Teacher's Note</h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
                <p className="mt-3 leading-relaxed">
                  “HDLC is beautiful because it shows how a simple framing concept scales to reliable communication. I always use the analogy of envelopes inside envelopes. In my Barrackpore classes, students are often surprised that bit stuffing is still used today – think of USB (NRZI with bit stuffing). The HDLC state machine is the ancestor of many link protocols. Spend time on the control field bits – after that, everything else flows.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic_HDLC;