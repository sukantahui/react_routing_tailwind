import React from 'react';
import {
  Wifi, Radio, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Signal, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/wireless_ap_roaming_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 8
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Wireless Connectivity Devices
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Access Point (AP) &amp; Wi-Fi Cards in Wireless Networks
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the critical wireless bridge of local networks. Master how a Wireless Access Point (WAP) connects mobile laptops and smartphones to wired Ethernet backbones, examine SSID broadcasting, 2.4 GHz vs 5 GHz spectrums, WPA3 encryption, and case-study placement in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The Wireless Bridge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Wifi size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">The Access Point (WAP)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Acts as a <strong className="text-white">bridge between wired Ethernet (802.3) and wireless Wi-Fi (802.11)</strong>. Plugs into a switch via RJ-45 and broadcasts radio waves for mobile clients.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Radio size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Wi-Fi Card (WNIC)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Internal PCIe/M.2 card or external USB dongle with an antenna that allows computers to communicate over 2.4 GHz or 5 GHz radio frequency bands.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Signal size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">SSID &amp; Channels</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The <strong className="text-white">SSID</strong> is the broadcast network name. In 2.4 GHz, channels 1, 6, and 11 are non-overlapping. 5 GHz offers higher speeds and less congestion.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: 2.4 GHz vs 5 GHz Wi-Fi Bands */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Technical Comparison: 2.4 GHz vs 5 GHz Wi-Fi</h2>
              <p className="text-xs text-slate-400">High-frequency comparison question across board examination papers</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">2.4 GHz Frequency Band</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">5 GHz Frequency Band</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Coverage Range</td>
                  <td className="py-3 px-4 font-bold text-blue-400">Longer range (up to 50-70 meters)</td>
                  <td className="py-3 px-4">Shorter range (up to 20-30 meters)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Wall &amp; Obstacle Penetration</td>
                  <td className="py-3 px-4 font-bold text-blue-400">Superior (passes through solid walls easily)</td>
                  <td className="py-3 px-4">Inferior (heavily attenuated by concrete walls)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Maximum Data Rate</td>
                  <td className="py-3 px-4">Lower (up to 450-600 Mbps on 802.11n)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Much Higher (1.3 Gbps to 9.6 Gbps on Wi-Fi 6)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Interference &amp; Congestion</td>
                  <td className="py-3 px-4 text-rose-400">High (crowded by microwaves, Bluetooth)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Low (clean spectrum with 24+ channels)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Case Study Device Recommendation</h2>
              <p className="text-xs text-amber-400/80">Frequently tested question in Section D 5-mark problems</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Suggesting wired cables for a mobile conference</p>
              <p className="text-slate-400">
                When a case study specifies: <strong className="text-white">"Suggest a device to provide internet access to guests carrying laptops and smartphones in the conference room without laying cables to every chair."</strong> The answer is: <strong className="text-white">Wireless Access Point (WAP)</strong>!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Is an AP the same as a Router?</p>
              <p className="text-slate-400">
                A standalone AP is a <strong className="text-white">Layer-2 bridge</strong> that converts wired Ethernet into wireless Wi-Fi on the same subnet. A <strong className="text-white">Router</strong> connects separate subnets and provides IP routing!
              </p>
            </div>
          </div>
        </div>

        {/* 5. Python Laboratory Experiment */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Access Point RSSI &amp; Path Loss</h2>
              <p className="text-xs text-slate-400">Trace signal drop (dBm) over distances and wall obstructions to evaluate Wi-Fi quality</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="wireless_ap_roaming_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Whenever a CBSE case study question mentions mobile users, roaming laptops, smartphones, or handheld tablets in an open area (auditorium, library, cafeteria), the required device is ALWAYS 'Wireless Access Point (WAP)'. Mentioning that it connects to the building switch via Ethernet earns full marks!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_access_point_notes.txt"
          title="Download Topic 8 Access Point Revision Notes"
        />

        {/* 8. CBSE Board Examination Practice & FAQs */}
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

      </div>
    </div>
  );
}