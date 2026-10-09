import React, { useState } from 'react';
import {
  HardDrive, Disc, Zap, ShieldCheck, CheckCircle2,
  AlertTriangle, HelpCircle, FileText, Terminal, BookOpen,
  Calculator, Sparkles, Activity, Layers, ArrowRight, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/storage_benchmark_simulator.py?raw";

// Interactive Secondary Storage Technology & HDD Access Time Inspector
const StorageMediaInspector = () => {
  const [selectedMedia, setSelectedMedia] = useState('nvme');
  const [rpm, setRpm] = useState(7200);
  const [seekTime, setSeekTime] = useState(8.5);

  const mediaList = {
    nvme: {
      name: "NVMe M.2 SSD (PCIe Gen4)",
      tag: "Solid-State Flash (Ultra-Fast)",
      color: "border-sky-500/40 text-sky-400 bg-sky-500/10",
      speed: "5,000 – 7,500 MB/s",
      latency: "0.01 – 0.03 Milliseconds (~20 microseconds)",
      capacity: "500 GB – 8 TB",
      mechanism: "3D NAND Flash Memory chips with electrical charge trapping. Zero mechanical parts.",
      durability: "Immune to physical drops, zero vibration, completely silent.",
      cbseTip: "NVMe SSDs connect directly over PCIe lanes, delivering 10x higher speeds than SATA III SSDs."
    },
    sata_ssd: {
      name: "SATA III SSD (2.5-Inch)",
      tag: "Solid-State Flash (Mainstream)",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      speed: "500 – 550 MB/s",
      latency: "0.05 – 0.1 Milliseconds (~70 microseconds)",
      capacity: "250 GB – 4 TB",
      mechanism: "NAND Flash Memory communicating across standard SATA III bus interface.",
      durability: "Shock-resistant, low power consumption, quiet operation.",
      cbseTip: "Standard drop-in upgrade for older mechanical hard drive laptops."
    },
    hdd: {
      name: "Mechanical Hard Disk Drive (HDD)",
      tag: "Magnetic Storage Media",
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      speed: "120 – 200 MB/s",
      latency: "10 – 15 Milliseconds (Mechanical seek + rotation delay)",
      capacity: "1 TB – 22 TB (Lowest Cost per Gigabyte)",
      mechanism: "Spinning aluminum platters coated with magnetic iron oxide + moving electromagnetic actuator arm.",
      durability: "Vulnerable to shock drops and physical head crashes.",
      cbseTip: "HDDs divide platters into Concentric Tracks, Radial Sectors, and Cylinders."
    },
    optical: {
      name: "Blu-ray Disc (BD-ROM / M-DISC)",
      tag: "Optical Storage Media",
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      speed: "36 – 54 MB/s (12x drive speed)",
      latency: "100 – 150 Milliseconds",
      capacity: "25 GB (Single Layer) / 50 GB (Dual Layer)",
      mechanism: "Microscopic physical Pits and Lands etched in polycarbonate spiral tracks read by 405nm blue-violet laser.",
      durability: "Scratch-sensitive, immune to magnetic degaussing, excellent for 30+ year cold archives.",
      cbseTip: "Blu-ray uses shorter 405nm laser wavelength compared to DVD (650nm) and CD (780nm)."
    },
    flash: {
      name: "USB 3.2 Flash Drive (Pendrive)",
      tag: "Portable Solid-State Storage",
      color: "border-rose-500/40 text-rose-400 bg-rose-500/10",
      speed: "100 – 400 MB/s",
      latency: "0.2 – 0.8 Milliseconds",
      capacity: "32 GB – 1 TB",
      mechanism: "NAND Flash chip integrated with a USB controller for universal hot-plug connectivity.",
      durability: "Highly portable, solid-state, water resistant casing.",
      cbseTip: "Flash memory is a solid-state block-erasable variant of EEPROM."
    }
  };

  // HDD Access Time Formula: Total = Seek Time + Rotational Latency (30000 / RPM) + Transfer Time (~0.4ms)
  const rotationalDelay = (30000 / rpm).toFixed(2);
  const totalHddTime = (Number(seekTime) + Number(rotationalDelay) + 0.42).toFixed(2);

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <HardDrive size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Secondary Storage Media &amp; HDD Physics Engine
            </h3>
            <p className="text-xs text-slate-400">
              Compare NVMe SSDs, SATA SSDs, HDDs, and Optical media; adjust RPM and Seek time to calculate disk access latency.
            </p>
          </div>
        </div>
      </div>

      {/* Media Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[
          { key: 'nvme', label: '1. NVMe SSD', sub: 'PCIe M.2 (7500 MB/s)' },
          { key: 'sata_ssd', label: '2. SATA SSD', sub: '2.5-Inch (550 MB/s)' },
          { key: 'hdd', label: '3. Magnetic HDD', sub: 'Platters (7200 RPM)' },
          { key: 'optical', label: '4. Blu-ray Disc', sub: 'Laser Pits/Lands' },
          { key: 'flash', label: '5. USB Flash', sub: 'Portable Pendrive' }
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setSelectedMedia(item.key)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              selectedMedia === item.key
                ? 'bg-sky-500/15 border-sky-500 text-sky-200 shadow-lg shadow-sky-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm text-white truncate">{item.label}</div>
            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{item.sub}</span>
          </button>
        ))}
      </div>

      {/* Media Detail Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="text-sky-400 font-mono">▸</span> {mediaList[selectedMedia].name}
          </h4>
          <span className="px-3 py-1 bg-slate-800 text-sky-300 font-mono text-xs rounded-full border border-slate-700">
            {mediaList[selectedMedia].tag}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">Throughput:</span>
            <span className="text-white font-mono font-bold">{mediaList[selectedMedia].speed}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">Access Latency:</span>
            <span className="text-white font-mono font-bold">{mediaList[selectedMedia].latency}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-purple-400 font-bold block mb-1">Standard Capacities:</span>
            <span className="text-white font-semibold">{mediaList[selectedMedia].capacity}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-rose-400 font-bold block mb-1">Physical Mechanism:</span>
            <span className="text-slate-300 truncate block">{mediaList[selectedMedia].mechanism}</span>
          </div>
        </div>

        <div className="bg-sky-950/20 border border-sky-500/30 rounded-xl p-3 text-xs text-sky-200 flex items-start gap-2">
          <Sparkles size={16} className="text-sky-400 shrink-0 mt-0.5" />
          <span>{mediaList[selectedMedia].cbseTip}</span>
        </div>
      </div>

      {/* HDD Physical Access Time Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-white">Magnetic HDD Access Time Calculator</h4>
            <p className="text-xs text-slate-400">Total Access Time = Seek Time + Rotational Delay (30/RPM × 1000) + Transfer Time</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Total Mechanical Delay:</span>
            <div className="text-lg font-mono font-extrabold text-amber-400">{totalHddTime} ms</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Spindle Speed (RPM): <strong className="text-sky-400">{rpm} RPM</strong></span>
              <span className="text-slate-400">Rotational Latency: <strong className="text-amber-400">{rotationalDelay} ms</strong></span>
            </div>
            <div className="flex gap-2">
              {[5400, 7200, 10000, 15000].map(r => (
                <button
                  key={r}
                  onClick={() => setRpm(r)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition ${
                    rpm === r ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {r} RPM
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Actuator Arm Seek Time: <strong className="text-sky-400">{seekTime} ms</strong></span>
            </div>
            <input
              type="range"
              min="3.0"
              max="15.0"
              step="0.5"
              value={seekTime}
              onChange={(e) => setSeekTime(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Unit I: Computer Systems and Organisation (10 Marks)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Secondary Storage Devices: Hard Disk Drives (HDD), Solid-State Drives (SSD), Optical Disks &amp; Flash Drives
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the physics, architectures, and performance trade-offs of modern auxiliary storage media. Explore magnetic platter tracks and sectors, solid-state NAND flash tunneling in NVMe SSDs, and optical laser pit reflection in CDs, DVDs, and Blu-ray discs.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <HardDrive className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">1. Conceptual Breakdown: The 3 Core Storage Technologies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <HardDrive size={22} />
              </div>
              <h3 className="text-base font-bold text-white">1. Magnetic Storage (HDD)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stores binary data by orienting microscopic magnetic domains on spinning platters. Divided logically into concentric <strong>Tracks</strong>, radial <strong>Sectors</strong>, and vertical <strong>Cylinders</strong>.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <Zap size={22} />
              </div>
              <h3 className="text-base font-bold text-white">2. Solid-State Storage (SSD)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Utilizes non-volatile 3D NAND flash memory cells. With zero moving parts, it delivers instantaneous access times (microseconds) and immune durability against shock drops.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Disc size={22} />
              </div>
              <h3 className="text-base font-bold text-white">3. Optical Storage (BD/DVD)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Records data as physical microscopic <strong>Pits</strong> (depressions) and <strong>Lands</strong> (flat reflective areas) along a spiral track, decoded by precision semiconductor laser beams.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Visualizer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="text-sky-400" size={20} />
            <h2 className="text-lg font-bold text-white">2. Interactive Storage Technology Inspector &amp; Access Time Calculator</h2>
          </div>
          <StorageMediaInspector />
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Calculator className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">3. Optical Storage Comparison: CD vs DVD vs Blu-ray</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/80 text-sky-300">
                  <th className="p-3 font-bold">Optical Disc Standard</th>
                  <th className="p-3 font-bold">Laser Type &amp; Wavelength</th>
                  <th className="p-3 font-bold">Standard Capacity</th>
                  <th className="p-3 font-bold">Track Pitch / Density</th>
                  <th className="p-3 font-bold">Primary Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-amber-400">CD-ROM</td>
                  <td className="p-3 font-mono">Infrared (780 nm)</td>
                  <td className="p-3 font-bold text-white">~700 Megabytes (MB)</td>
                  <td className="p-3">1.60 µm (Microns)</td>
                  <td className="p-3">Audio Albums, Legacy Software</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-rose-400">DVD-ROM</td>
                  <td className="p-3 font-mono">Red Laser (650 nm)</td>
                  <td className="p-3 font-bold text-white">4.7 GB (SL) / 8.5 GB (DL)</td>
                  <td className="p-3">0.74 µm (Microns)</td>
                  <td className="p-3">Standard Movies, Software Installers</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-sky-400">Blu-ray (BD)</td>
                  <td className="p-3 font-mono text-purple-300">Blue-Violet (405 nm)</td>
                  <td className="p-3 font-bold text-emerald-300">25 GB (SL) / 50 GB (DL)</td>
                  <td className="p-3 font-semibold text-sky-300">0.32 µm (Microns)</td>
                  <td className="p-3">4K UHD Video, High-Density Backups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">4. Python Code Demonstration: Storage Media Benchmark</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="storage_benchmark_simulator.py"
            highlightLines={[12, 28, 48, 55, 62]}
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
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1: Laptop Boot Time Upgrade</span>
              <h4 className="text-sm font-bold text-white">Replacing 5400 RPM HDD with NVMe SSD</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upgrading a student's laptop in Barrackpore from an HDD to an NVMe SSD slashes Windows boot time from 75 seconds down to 6 seconds due to eliminating mechanical seek latencies.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2: 100-Year M-DISC Optical Archiving</span>
              <h4 className="text-sm font-bold text-white">Stone-Like Laser Engraving</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                M-DISC Blu-rays use a glass-carbon inorganic recording layer that cannot be degraded by light, heat, or humidity, guaranteeing legal archive preservation for up to 1,000 years.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Case 3: Cloud Datacenter Cold Storage</span>
              <h4 className="text-sm font-bold text-white">LTO-9 Magnetic Tape Libraries</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hyperscale cloud providers store exabytes of user backups on magnetic tapes in robotic silos, drawing zero electrical power until a tape cartridge is fetched for recovery.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 4: Smartphone Flash Wear-Out</span>
              <h4 className="text-sm font-bold text-white">UFS 4.0 Wear Leveling &amp; Over-Provisioning</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Smartphones record 4K 60FPS video directly to Universal Flash Storage (UFS 4.0), where hardware wear-leveling algorithms rotate writes across millions of NAND blocks to guarantee 10-year endurance.
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
                <span>Common Misconceptions</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Confusing Tracks and Sectors:</strong> Tracks are concentric rings; Sectors are pie-slice subdivisions of a track.</li>
                <li><strong>Saying SSDs use magnetic platters:</strong> SSDs contain zero magnetic parts; they are 100% solid-state semiconductor NAND flash.</li>
                <li><strong>Mixing up CD/DVD/Blu-ray capacities:</strong> CD (~700 MB), DVD (4.7 GB), Blu-ray (25 GB).</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Provide Disk Access Time Formula:</strong> State <code>Total = Seek Time + Rotational Latency + Transfer Time</code>.</li>
                <li><strong>Explain Laser Wavelengths:</strong> Mention that Blu-ray achieves higher density because its 405nm blue-violet laser has a shorter wavelength than DVD's 650nm red laser.</li>
                <li><strong>Emphasize Non-Volatility:</strong> Clearly state that secondary storage retains data without electrical power.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>Memory Retention Tip for Storage</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Remember: <strong>HDD = Gramophone Vinyl</strong> (spinning disk with physical arm), <strong>SSD = High-Speed USB on Steroids</strong> (pure silicon flash chip), and <strong>Optical = Mirror with Tiny Needle Scratches</strong> (laser reading reflections).
          </p>
        </div>

        {/* 9. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate
            title="Topic 6 · Secondary Storage Devices FAQs"
            questions={questions}
          />
        </div>

        {/* 10. Plain Text Printable Document */}
        <div className="space-y-4">
          <PlainTextPrint
            content={noteText}
            filename="topic6_secondary_storage_note.txt"
            title="CBSE Class XI CS 083 – Topic 6 Revision Handbook"
            hidePreview={false}
            showDownload={true}
          />
        </div>

        {/* 11. Teacher's Note */}
        <Teacher
          note="Make sure you can define Seek Time and Rotational Latency clearly! In CBSE exams, calculating average rotational delay (half of one revolution time = 30,000 / RPM in milliseconds) is a classic 2-mark question. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
