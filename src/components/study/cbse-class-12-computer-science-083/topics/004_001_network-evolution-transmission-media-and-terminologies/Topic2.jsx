import React from 'react';
import {
  Gauge, Activity, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Clock, HardDrive
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/bandwidth_transfer_rate_calculator.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 2
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Channel Capacity Metrics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Communication Channel Capacity: Bandwidth (Hz vs bps) &amp; Data Transfer Rates
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the physics and digital mathematics of channel capacity. Learn analog frequency ranges in Hertz, digital throughput in bits per second (<code className="text-emerald-300 font-mono">bps</code>), and crack the fatal bits-versus-Bytes numerical trap.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Activity size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Analog Bandwidth (Hz)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Width of the allocated frequency band: <code className="text-emerald-300 font-mono">f_max - f_min</code>. E.g. Voice channel (3400 - 300 = 3100 Hz).
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Gauge size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Digital Bandwidth (bps)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Theoretical data transmission capacity in bits per second: <code className="text-sky-300 font-mono">Kbps, Mbps, Gbps, Tbps</code>.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Clock size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Latency &amp; Throughput</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Latency is transit delay. Throughput is the actual volume of payload data successfully received across protocol overhead.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory: The Fatal Factor-of-8 Formula */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-emerald-400" size={22} />
            CBSE Examination Board Numerical Master Formula
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="text-amber-400 font-semibold">// The Standard Formula for File Transmission Time:</p>
            <p className="text-emerald-300">Time (seconds) = (File Size in Megabytes × 8 × 10^6) ÷ (Bandwidth in Mbps × 10^6)</p>
            <p className="text-slate-400 pt-2">// Worked Example: Transfer 20 MB file over 16 Mbps link:</p>
            <p>1. Total Bits = 20 MB × 8 = <span className="text-sky-300">160 Megabits</span></p>
            <p>2. Channel Rate = <span className="text-sky-300">16 Megabits per second</span></p>
            <p>3. Time = 160 ÷ 16 = <span className="text-emerald-400 font-bold">10.0 Seconds!</span></p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">bandwidth_transfer_rate_calculator.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="bandwidth_transfer_rate_calculator.py"
            title="Bandwidth & Transmission Time Calculator"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            The Fatal Bits vs Bytes Trap
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Common Student Mistake:</p>
            <p className="text-slate-400 leading-relaxed font-mono">
              If asked: "Calculate time to transfer 10 MB on an 8 Mbps connection", thousands of students write: <code className="text-red-400">10 / 8 = 1.25 seconds</code>. THIS IS COMPLETELY WRONG!
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              File size is in BYTES (MB); speed is in BITS (Mbps)! You MUST multiply the file size by 8 first: <code className="text-emerald-300">(10 × 8) / 8 = 10 seconds</code>!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In numericals involving data transfer rates, always write down your conversion explicitly: '1 Byte = 8 bits'. Examiners look specifically for the multiplication by 8 in step 1 of your working. Showing this conversion clearly guarantees all 2 marks!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_bandwidth_data_transfer.txt"
          title="Download Topic 2 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
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