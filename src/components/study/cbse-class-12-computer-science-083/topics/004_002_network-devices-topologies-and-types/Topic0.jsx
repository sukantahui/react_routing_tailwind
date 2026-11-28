import React from 'react';
import {
  Radio, Cpu, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Activity
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/modem_fsk_simulation_lab.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Network Connecting Devices
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Modem: Modulation, Demodulation &amp; Types of Modems
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the essential hardware bridge between digital computer circuits and analog telecommunication lines. Master the dual mechanisms of Modulation and Demodulation, contrast Internal versus External modems, and examine DSL, Cable, and Wireless technologies tested in CBSE examinations.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The Dual Engine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Modulation (Digital to Analog)</h3>
                <p className="text-xs text-blue-400 font-mono">Sender PC → Transmission Medium</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Computers generate discrete <strong className="text-white">digital pulses (0s and 1s)</strong>. The modulator converts these electrical pulses into continuous <strong className="text-white">analog wave signals (carrier waves)</strong> by altering amplitude, frequency, or phase to travel across telephone or cable networks.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Demodulation (Analog to Digital)</h3>
                <p className="text-xs text-emerald-400 font-mono">Transmission Medium → Receiver PC</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              At the destination, the incoming continuous analog waves cannot be read directly by the receiver's CPU. The demodulator strips the carrier signal and <strong className="text-white">reconstructs the exact digital binary bitstream</strong> for computer processing.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: Types of Modems */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Classification of Modems in CBSE Examinations</h2>
              <p className="text-xs text-slate-400">Key comparison categories frequently tested in 2-mark board questions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-blue-500/20 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Internal vs External</span>
              <h4 className="text-base font-bold text-white">Physical Form Factor</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                <strong className="text-white">Internal:</strong> Expansion card in a PCIe motherboard slot. Powered by PC bus.<br /><br />
                <strong className="text-white">External:</strong> Standalone box with separate power supply, LEDs, and Ethernet connection.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">DSL / Broadband</span>
              <h4 className="text-base font-bold text-white">Digital Subscriber Line</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Operates on high-frequency spectrum over standard telephone lines. Allows simultaneous telephone voice conversations and high-speed broadband data transmission.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/20 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Cable &amp; Cellular</span>
              <h4 className="text-base font-bold text-white">Coaxial &amp; Wireless Modems</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                <strong className="text-white">Cable Modem:</strong> DOCSIS standard over 75-Ohm coaxial TV cables.<br /><br />
                <strong className="text-white">Wireless/Cellular:</strong> Communicates over 4G/5G radio frequencies via USB dongles or pocket Wi-Fi.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps &amp; Common Pitfalls</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark technical definitions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Confusing Modulation with Demodulation</p>
              <p className="text-slate-400">
                Remember the direction: <strong className="text-white">Modulation = Digital to Analog</strong> (at sending computer). <strong className="text-white">Demodulation = Analog to Digital</strong> (at receiving computer). Swapping them costs 1 full mark!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Is a Modem needed for Optical Fiber or Pure Ethernet?</p>
              <p className="text-slate-400">
                Traditional modems are specifically needed when connecting digital computers over <strong className="text-white">analog transmission lines</strong> (telephone/cable). Pure Ethernet LANs use Switches and NICs without modems!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: FSK Modulation &amp; Demodulation</h2>
              <p className="text-xs text-slate-400">Run this interactive simulator to trace digital-to-analog frequency conversion</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="modem_fsk_simulation_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 1-mark CBSE Section A questions, when asked 'Expand MODEM and explain its working', write: 'MODEM stands for MOdulator/DEModulator. It converts digital signals to analog (modulation) at the sender and analog signals to digital (demodulation) at the receiver so computers can communicate across telephone lines.' This two-line response secures the full mark!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_modem_device_notes.txt"
          title="Download Topic 0 Modem Concise Revision Notes"
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