import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, PhoneCall, Radio
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/voip_streaming_sim.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Multimedia Communications
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Voice over Internet Protocol (VoIP): Internet Telephony &amp; Packetized Voice
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the engineering behind modern digital telephony. Understand voice digitization, audio codecs, SIP signaling (Port 5060), RTP packetization over UDP, jitter buffers, and why VoIP replaces circuit-switched PSTN.
            </p>
          </div>
        </div>

        {/* 2. Real-World Analogy */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
            <Zap size={18} />
            <span>Real-World Pedagogical Analogy</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Traditional telephone calls (PSTN) are like renting an entire private railway track between two distant cities for a two-hour journey: even if nobody speaks for ten minutes, that entire physical track is reserved and paid for. In contrast, <strong>VoIP</strong> is like mailing brief postcards on regular scheduled trains: whenever you speak, your voice is converted into thousands of tiny numbered digital postcards (packets) that share the tracks with web and email traffic. During pauses in conversation, zero postcards are sent, freeing up the tracks for everyone else and slashing long-distance costs to nearly zero!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Technical Principles */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <PhoneCall size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">How VoIP Operates: The Protocol Stack</h2>
              <p className="text-xs text-slate-400">Signaling, transport, codecs, and synchronization</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">1. Signaling &amp; Call Setup: SIP</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>SIP (Session Initiation Protocol):</strong> Listens on <strong>Port 5060</strong> (UDP/TCP).</li>
                <li>Locates target users, initiates ringers, negotiates media codecs, and terminates sessions.</li>
                <li>Operates like HTTP: uses text-based requests (<code>INVITE</code>, <code>ACK</code>, <code>BYE</code>).</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">2. Media Transport: RTP over UDP</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>RTP (Real-time Transport Protocol):</strong> Carries digitized audio chunks.</li>
                <li>Operates on top of <strong>UDP</strong> to minimize latency (avoids retransmission pauses).</li>
                <li>Attaches sequence numbers and timestamps so jitter buffers can reconstruct audio in order.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Radio size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">VoIP Packetization &amp; Jitter Simulator</h2>
              <p className="text-xs text-slate-400">Observe packet creation, simulated packet loss, and jitter buffer smoothing</p>
            </div>
          </div>
          <PythonFileLoader
            filename="voip_streaming_sim.py"
            code={pythonCode}
            description="Python simulation demonstrating G.711 voice chunking, transit latency jitter, buffer re-sequencing, and DAC audio output."
          />
        </div>

        {/* 5. Comprehensive Comparison Matrix */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparison Matrix: VoIP vs Traditional PSTN Telephony</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Comparison Parameter</th>
                  <th className="p-3">VoIP (Voice over IP)</th>
                  <th className="p-3">Traditional PSTN Telephony</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Underlying Technology</td>
                  <td className="p-3 font-bold text-emerald-400">Packet Switching (IP Data Network)</td>
                  <td className="p-3 font-bold text-amber-400">Circuit Switching (Dedicated lines)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Call Cost</td>
                  <td className="p-3 text-emerald-400">Extremely low / Free over broadband</td>
                  <td className="p-3 text-rose-400">High (Toll tariffs per minute)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Bandwidth Efficiency</td>
                  <td className="p-3 text-emerald-400">High (Dynamic sharing + Silence suppression)</td>
                  <td className="p-3 text-rose-400">Low (Dedicated 64 kbps continuous reservation)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Power Outage Resilience</td>
                  <td className="p-3 text-amber-400">Requires local UPS for router/switch</td>
                  <td className="p-3 text-emerald-400">Powered by exchange battery over copper</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Common Examples</td>
                  <td className="p-3">WhatsApp Audio, Skype, Zoom, Teams, IP PBX</td>
                  <td className="p-3">BSNL Landline, MTNL, classic PBX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step VoIP Call Lifecycle */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: The Lifecycle of a VoIP Call</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Call Setup (SIP Signaling):</strong> Caller transmits a SIP <code>INVITE</code> message to the callee's SIP URI (e.g., <code>sip:student@cbse.nic.in</code>). The callee's device rings and responds with <code>200 OK</code>.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Voice Digitization &amp; Encoding:</strong> Microphone converts acoustic waves into electrical signals. Hardware/software Codec samples voice 8,000 times/second and compresses it.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">RTP Packetization &amp; UDP Transit:</strong> 20ms chunks of audio are tagged with RTP headers and sent via UDP packets through the internet.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <strong className="text-white">De-jittering &amp; Audio Playback:</strong> Receiver buffers incoming packets, sorts them by sequence number, and feeds the stream to the speaker DAC.
              </div>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Misconceptions */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Common Board Examination Pitfalls &amp; Misconceptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Misconception:</strong> Thinking VoIP uses TCP for voice. VoIP uses <strong>UDP</strong> because real-time voice requires minimal latency; waiting for TCP retransmission would cause unacceptable conversation pauses.</li>
            <li><strong>Pitfall:</strong> Confusing SIP with RTP. SIP sets up, modifies, and terminates the call; RTP actually transports the audio packets.</li>
            <li><strong>Pitfall:</strong> Overlooking that VoIP requires electrical power for routers and modems during power outages.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Whenever a CBSE case study question asks: 'Suggest a technology to conduct low-cost or free voice conferencing between company branches in different cities or countries over the internet', your answer must be: 'VoIP (Voice over Internet Protocol)'. Emphasize that it routes digitized voice packets over the existing data network, completely bypassing traditional telephone tolls."
        />

        {/* 9. CBSE Board Examination Practice & FAQs */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Practice &amp; FAQs</h2>
              <p className="text-xs text-slate-400">25 Authentic Questions with Complete Explanations &amp; Hints</p>
            </div>
          </div>
          <FAQTemplate questions={questions} />
        </div>

        {/* 10. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_voip_notes.txt"
          title="Download Topic 5 Revision Notes"
        />

      </div>
    </div>
  );
}
