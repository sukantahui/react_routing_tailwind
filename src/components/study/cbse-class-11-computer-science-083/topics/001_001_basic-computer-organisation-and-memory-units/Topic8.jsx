import React, { useState } from 'react';
import {
  Monitor, Printer, Eye, Scan, CheckCircle2,
  AlertTriangle, HelpCircle, FileText, Terminal, BookOpen,
  Sparkles, Layers, Activity, ArrowRight, Zap, CreditCard
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/io_device_classifier.py?raw";

// Interactive I/O Peripheral Taxonomy & Scanner/Printer Inspector
const IoPeripheralInspector = () => {
  const [selectedDevice, setSelectedDevice] = useState('micr');

  const devices = {
    micr: {
      name: "Magnetic Ink Character Recognition (MICR)",
      category: "Specialized Security Input Device",
      color: "border-sky-500/40 text-sky-400 bg-sky-500/10",
      principle: "Reads characters printed with ink containing magnetized iron oxide particles (E-13B or CMC-7 font).",
      speed: "Reads 1,000+ bank cheques per minute automatically.",
      application: "Banking sector: High-speed cheque clearing (Transit routing & Account numbers).",
      cbseTip: "MICR characters can be read with 100% accuracy even if the cheque has been stamped or smudged with ordinary ink."
    },
    omr: {
      name: "Optical Mark Reader (OMR)",
      category: "Assessment & Survey Input Device",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      principle: "Measures the intensity of reflected light off pencil or black pen bubbles on pre-printed forms.",
      speed: "Processes up to 10,000 answer sheets per hour.",
      application: "CBSE Board Exams, JEE/NEET competitive exams, lottery ballots, demographic surveys.",
      cbseTip: "Dark pencil/ink bubbles absorb light, resulting in less reflected light reaching the photocell sensor."
    },
    ocr: {
      name: "Optical Character Recognition (OCR)",
      category: "Document Digitization Input Device",
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      principle: "Scans printed or handwritten physical text and uses pattern recognition AI to output editable text files.",
      speed: "Converts high-resolution books to text in seconds.",
      application: "Digitizing ancient libraries, airport passport scanning, automated license plate readers.",
      cbseTip: "OCR converts visual pixel bitmaps into editable ASCII / Unicode strings."
    },
    laser_printer: {
      name: "Laser Printer (Non-Impact Hard Copy)",
      category: "High-Volume Office Output Device",
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      principle: "Laser beam draws electrostatic image onto photosensitive drum; dry toner is attracted and fused with heat (200°C).",
      speed: "30 – 60 Pages Per Minute (PPM) at 1200+ DPI.",
      application: "School question paper printing, office reports, professional publications.",
      cbseTip: "Non-impact printers form text without physical mechanical impact, making them silent and unable to make carbon copies."
    },
    plotter: {
      name: "Vector Plotter (Drum & Flatbed)",
      category: "Architectural & Engineering Output Device",
      color: "border-rose-500/40 text-rose-400 bg-rose-500/10",
      principle: "Mechanically moves precision colored ink pens across large paper rolls to draw smooth, continuous vector lines.",
      speed: "Vector drawing speed (inches per second).",
      application: "Architectural blueprints, CAD schematics, civil engineering maps, large vinyl banners.",
      cbseTip: "Unlike raster printers that print dots, plotters draw continuous mathematical vector lines."
    }
  };

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Scan size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive I/O Device Inspector &amp; Technology Analyzer
            </h3>
            <p className="text-xs text-slate-400">
              Select specialized input/output devices (MICR, OMR, OCR, Laser Printers, Plotters) to inspect their operating principles.
            </p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[
          { key: 'micr', label: '1. MICR', sub: 'Bank Cheques' },
          { key: 'omr', label: '2. OMR', sub: 'CBSE Exam Sheets' },
          { key: 'ocr', label: '3. OCR', sub: 'Text Digitization' },
          { key: 'laser_printer', label: '4. Laser Printer', sub: 'Toner / Drum (1200 DPI)' },
          { key: 'plotter', label: '5. Vector Plotter', sub: 'CAD Blueprints' }
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setSelectedDevice(item.key)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              selectedDevice === item.key
                ? 'bg-sky-500/15 border-sky-500 text-sky-200 shadow-lg shadow-sky-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm text-white truncate">{item.label}</div>
            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{item.sub}</span>
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="text-sky-400 font-mono">▸</span> {devices[selectedDevice].name}
          </h4>
          <span className="px-3 py-1 bg-slate-800 text-sky-300 font-mono text-xs rounded-full border border-slate-700">
            {devices[selectedDevice].category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">Working Principle:</span>
            <span className="text-slate-300 leading-relaxed">{devices[selectedDevice].principle}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">Throughput &amp; Resolution:</span>
            <span className="text-white font-mono font-semibold">{devices[selectedDevice].speed}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 md:col-span-2">
            <span className="text-purple-400 font-bold block mb-1">Primary Real-World Applications:</span>
            <span className="text-white font-semibold">{devices[selectedDevice].application}</span>
          </div>
        </div>

        <div className="bg-sky-950/20 border border-sky-500/30 rounded-xl p-3 text-xs text-sky-200 flex items-start gap-2">
          <Sparkles size={16} className="text-sky-400 shrink-0 mt-0.5" />
          <span>{devices[selectedDevice].cbseTip}</span>
        </div>
      </div>
    </div>
  );
};

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 8
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Unit I: Computer Systems and Organisation (10 Marks)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Input and Output (I/O) Devices: Keyboards, Scanners, OCR, OMR, MICR, Monitors, Printers &amp; Plotters
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the sensory interfaces connecting human users to digital processors. Understand optical recognition systems (OMR, OCR, MICR), analyze Soft Copy vs Hard Copy output media, and contrast Impact vs Non-Impact printing mechanisms.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Scan className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">1. Conceptual Breakdown: Specialized Recognition Hardware</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <CreditCard size={22} />
              </div>
              <h3 className="text-base font-bold text-white">MICR (Banking Cheques)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uses magnetized iron oxide ink to read transit routing codes. Immune to coffee stains, pen smudges, and forged stamps.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="text-base font-bold text-white">OMR (Bubble Sheets)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Measures light reflection off dark pencil marks on pre-printed coordinate grids. Evaluates thousands of CBSE answer sheets per hour.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <FileText size={22} />
              </div>
              <h3 className="text-base font-bold text-white">OCR (Text Recognition)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Converts photographic images of scanned physical book pages into editable ASCII / Unicode strings using machine vision.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Visualizer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="text-sky-400" size={20} />
            <h2 className="text-lg font-bold text-white">2. Interactive I/O Device Inspector</h2>
          </div>
          <IoPeripheralInspector />
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Printer className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">3. Technical Comparison: Impact vs Non-Impact Printers</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/80 text-sky-300">
                  <th className="p-3 font-bold">Feature Parameter</th>
                  <th className="p-3 font-bold">Impact Printers (e.g. Dot Matrix)</th>
                  <th className="p-3 font-bold">Non-Impact Printers (Laser &amp; Inkjet)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Printing Mechanism</td>
                  <td className="p-3 text-amber-300">Physical pin strike onto inked ribbon</td>
                  <td className="p-3 text-emerald-300 font-semibold">Laser electrostatic drum / Ink spray</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Carbon Copy Capability</td>
                  <td className="p-3 text-emerald-400 font-bold">YES (Multipart duplicate/triplicate copies)</td>
                  <td className="p-3 text-rose-400 font-bold">NO (Cannot produce carbon copies)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Operating Noise</td>
                  <td className="p-3 text-rose-300">Noisy mechanical chatter</td>
                  <td className="p-3 text-emerald-300">Silent / Whisper-quiet</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Print Resolution (DPI)</td>
                  <td className="p-3 font-mono">Low (72 – 240 DPI, draft quality)</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">Ultra-High (600 – 2400+ DPI)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Primary Applications</td>
                  <td className="p-3">Railway reservation counters, GST bills</td>
                  <td className="p-3">Offices, school reports, color photos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">4. Python Code Demonstration: I/O Classifier</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="io_device_classifier.py"
            highlightLines={[12, 18, 26, 34, 42]}
          />
        </div>

        {/* 6. Real-World Case Studies */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <BookOpen className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">5. Real-World Case Studies &amp; Scenarios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1: Bank Cheque Clearing in Barrackpore</span>
              <h4 className="text-sm font-bold text-white">MICR Security Verification</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a cheque is deposited at SBI Barrackpore, an automated MICR high-speed reader senses the magnetic signature of the iron oxide ink, routing funds without human typing errors.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2: CBSE Board Term Examination</span>
              <h4 className="text-sm font-bold text-white">OMR Automated Optical Scoring</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                OMR scanners read 40-question objective response sheets in under 1 second per student, detecting optical pencil reflections at 99.99% accuracy across millions of candidates.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Case 3: Railway Booking Counters</span>
              <h4 className="text-sm font-bold text-white">Dot Matrix Impact Carbon Tickets</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Indian Railways utilizes 24-pin Dot Matrix printers to print passenger reservation tickets, generating an instant physical carbon duplicate for internal audit records.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 4: Civil Engineering Highway Maps</span>
              <h4 className="text-sm font-bold text-white">Vector Flatbed Plotter Precision</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                National Highway blueprints spanning 2 meters wide are printed on large drum plotters, using colored technical pens to draw mathematically exact vector curves without raster distortion.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">6. Common Exam Pitfalls &amp; Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Common Exam Confusions</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Confusing OCR and OMR:</strong> OCR reads <em>characters and text</em>; OMR reads <em>pencil marks/bubbles</em>.</li>
                <li><strong>Claiming Laser Printers are Impact:</strong> Laser printers are <em>Non-Impact</em> (they use laser light and toner).</li>
                <li><strong>Saying Plotters are Input Devices:</strong> Plotters produce physical drawings, making them <em>Hard Copy Output Devices</em>.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Full-Mark Strategies</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Define Full Forms accurately:</strong> OMR (Optical Mark Reader), OCR (Optical Character Recognition), MICR (Magnetic Ink Character Recognition).</li>
                <li><strong>State the Key Advantage of Dot Matrix:</strong> Explicitly mention that it can produce <em>carbon copies</em>.</li>
                <li><strong>Differentiate Soft Copy and Hard Copy:</strong> Soft copy is electronic (VDU/Monitor); Hard copy is physical (Printer/Plotter).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>Memory Quick Guide</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Remember: <strong>MICR = Money/Cheques</strong> (Magnetic ink), <strong>OMR = Marks/Exams</strong> (Optical bubbles), <strong>OCR = Optical Reading of Books</strong>, <strong>Impact = Physical Strike</strong> (Carbon copies), and <strong>Non-Impact = No Touch</strong> (Laser/Inkjet).
          </p>
        </div>

        {/* 9. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate
            title="Topic 8 · Input and Output (I/O) Devices FAQs"
            questions={questions}
          />
        </div>

        {/* 10. Plain Text Printable Document */}
        <div className="space-y-4">
          <PlainTextPrint
            content={noteText}
            filename="topic8_io_devices_note.txt"
            title="CBSE Class XI CS 083 – Topic 8 Revision Handbook"
            hidePreview={false}
            showDownload={true}
          />
        </div>

        {/* 11. Teacher's Note */}
        <Teacher
          note="Differences between OMR, OCR, and MICR, as well as Impact vs Non-Impact printers, are classic 2-mark and 3-mark questions in CBSE Class XI Computer Science (083) Unit 1. Always write the full acronym and give the specific industry application (banks, exams, offices)! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
