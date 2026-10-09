// topic6_questions.js
// CBSE Class XI Computer Science (083) - Topic 6 FAQs & Questions Bank
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: "q1",
    question: "What is Secondary Storage and why is it required when computers already have Primary Memory (RAM)?",
    answer: "Secondary storage is permanent, non-volatile auxiliary storage. It is required because Primary Memory (RAM) is volatile (loses all data upon power loss), expensive per gigabyte, and too limited in capacity to permanently store operating systems and massive user files.",
    explanation: "Secondary storage provides terabytes of cost-effective persistent data retention.",
    explanationBn: "সেকেন্ডারি স্টোরেজ হলো স্থায়ী মেমোরি। র‍্যামের বিদ্যুৎ চলে গেলে ডেটা মুছে যাওয়ার সীমাবদ্ধতা দূর করতে এবং বড় ফাইল স্থায়ীভাবে সংরক্ষণ করতে এটি প্রয়োজন।",
    category: "Concepts"
  },
  {
    id: "q2",
    question: "Explain the logical geometry of a Hard Disk Drive: Tracks, Sectors, and Cylinders.",
    answer: "Tracks are concentric circular rings on a platter surface. Sectors are pie-slice subdivisions of a track (holding 512 bytes or 4 KB). A Cylinder is the set of all tracks across all platters located at the exact same radial distance from the center spindle.",
    explanation: "Operating systems read and write hard disk data in clusters of sectors.",
    explanationBn: "Tracks হলো ডিস্কের বৃত্তাকার রিং; Sectors হলো ট্র্যাকের ছোট ছোট অংশ (সাধারণত 512 বাইট); আর Cylinder হলো সমস্ত প্লাটারের একই ব্যাসার্ধে থাকা ট্র্যাকের উল্লম্ব সমাহার।",
    category: "HDD Geometry"
  },
  {
    id: "q3",
    question: "Define the three components of Magnetic Disk Access Time: Seek Time, Rotational Latency, and Transfer Time.",
    answer: "1. Seek Time: Time taken by the mechanical read/write head arm to move to the desired track.\n2. Rotational Latency: Time taken for the platter to rotate the desired sector directly under the head.\n3. Transfer Time: Time required to magnetically read or write the actual data bits.",
    explanation: "Total Access Time = Seek Time + Rotational Latency + Transfer Time.",
    explanationBn: "১. Seek Time: হেড সঠিক ট্র্যাকে যেতে সময়। ২. Rotational Latency: ডিস্ক ঘুরে সঠিক সেক্টর হেডের নিচে আসতে সময়। ৩. Transfer Time: ডেটা স্থানান্তর হতে সময়।",
    category: "Calculations"
  },
  {
    id: "q4",
    question: "Why are Solid-State Drives (SSDs) significantly faster than traditional Hard Disk Drives (HDDs)?",
    answer: "SSDs use electrical semiconductor NAND flash memory chips with zero mechanical moving parts, eliminating the mechanical seek time and rotational latency delays that throttle HDDs.",
    explanation: "This allows SSDs to achieve random access latencies under 0.05 milliseconds compared to 10-15 milliseconds for mechanical HDDs.",
    explanationBn: "SSD-তে কোনো ঘূর্ণায়মান যান্ত্রিক অংশ থাকে না; সরাসরি সেমিকন্ডাক্টর ফ্ল্যাশ চিপ ব্যবহার করায় কোনো মেকানিক্যাল বিলম্ব থাকে না।",
    category: "SSD vs HDD"
  },
  {
    id: "q5",
    question: "Compare the storage capacities of CD-ROM, DVD-ROM, and Blu-ray Disc (BD-ROM).",
    answer: "1. CD-ROM: ~700 MB (uses 780 nm infrared laser).\n2. DVD-ROM: 4.7 GB (Single Layer) / 8.5 GB (Dual Layer, 650 nm red laser).\n3. Blu-ray (BD): 25 GB (Single Layer) / 50 GB (Dual Layer, 405 nm blue-violet laser).",
    explanation: "Shorter laser wavelengths allow smaller physical pit sizes, packing dramatically more data into the same 120 mm disc diameter.",
    explanationBn: "CD = ৭০০ এমবি, DVD = ৪.৭ থেকে ৮.৫ জিবি, Blu-ray = ২৫ থেকে ৫০ জিবি। লেজারের তরঙ্গদৈর্ঘ্য কম থাকায় ব্লু-রেতে সবচেয়ে বেশি ডেটা আঁটে।",
    category: "Optical Storage"
  },
  {
    id: "q6",
    question: "What is an NVMe SSD and how does it connect to the computer motherboard?",
    answer: "NVMe (Non-Volatile Memory Express) is a high-speed storage protocol designed specifically for flash memory that connects directly to the CPU via PCIe (Peripheral Component Interconnect Express) lanes via an M.2 slot.",
    explanation: "PCIe 4.0 NVMe drives achieve read speeds up to 7,500 MB/s, bypassing legacy SATA controller bottlenecks.",
    explanationBn: "NVMe হলো অত্যাধুনিক দ্রুতগতির এসএসডি যা মাদারবোর্ডের M.2 স্লটের মাধ্যমে সরাসরি CPU-র PCIe লেনের সাথে যুক্ত থাকে।",
    category: "SSD Technologies"
  },
  {
    id: "q7",
    question: "How is binary data physically stored and read on optical discs (CDs/DVDs)?",
    answer: "Data is recorded as a continuous microscopic spiral track containing indentations called 'Pits' and flat reflective spaces called 'Lands'. A laser diode bounces light off the surface; changes in light reflection between pits and lands are decoded as binary 1s and 0s.",
    explanation: "Pit edges cause destructive light interference, signaling transition bits.",
    explanationBn: "অপটিক্যাল ডিস্কে ডেটা 'Pits' (গর্ত) এবং 'Lands' (সমতল) হিসেবে থাকে; লেজার রশ্মি প্রতিফলিত হয়ে বাইনারি ০ ও ১ তৈরি করে।",
    category: "Optical Storage"
  },
  {
    id: "q8",
    question: "What does RPM stand for in hard disk drive specifications, and how does it affect performance?",
    answer: "RPM stands for 'Revolutions Per Minute' (e.g. 5400 RPM, 7200 RPM, 15000 RPM). Higher RPM reduces rotational latency and increases continuous data transfer rates.",
    explanation: "At 7200 RPM, average rotational latency is (60 / 7200 / 2) × 1000 = 4.17 milliseconds.",
    explanationBn: "RPM = Revolutions Per Minute। ঘূর্ণন গতি বেশি হলে ডিস্কের রিডিং স্পিড বাড়ে এবং লেটেন্সি কমে।",
    category: "HDD Specifications"
  },
  {
    id: "q9",
    question: "What is the difference between CD-R, CD-RW, and CD-ROM?",
    answer: "CD-ROM is Read-Only (factory pressed). CD-R (Compact Disc Recordable) is WORM (Write Once, Read Many). CD-RW (Compact Disc ReWritable) can be erased and rewritten multiple times using phase-change alloy recording layers.",
    explanation: "CD-RW utilizes laser heat pulses to toggle between crystalline (reflective) and amorphous (non-reflective) states.",
    explanationBn: "CD-ROM কেবল পড়ার জন্য; CD-R-এ একবার মাত্র লেখা যায়; CD-RW-তে বারবার মুছে নতুন করে লেখা যায়।",
    category: "Optical Storage"
  },
  {
    id: "q10",
    question: "True or False: 'The CPU can directly execute a Python program residing on an SSD without loading it into RAM.'",
    answer: "False. Secondary storage is not byte-addressable by the CPU's memory address bus. The operating system loader must first copy program instructions and data from the SSD into RAM.",
    explanation: "Direct execution only occurs from primary memory (RAM/Cache).",
    explanationBn: "ভুল। প্রসেসর সরাসরি এসএসডি বা হার্ডডিস্ক থেকে প্রোগ্রাম চালাতে পারে না; ওএস প্রথমে তা র‍্যামে লোড করে।",
    category: "True/False"
  },
  {
    id: "q11",
    question: "What is 'Flash Memory' and where is it used?",
    answer: "Flash Memory is a non-volatile, solid-state electronic storage medium that can be electrically erased and reprogrammed in multi-megabyte blocks. Used in USB thumb drives, SD cards, smartphones, and SSDs.",
    explanation: "Based on Floating-Gate or Charge-Trap Transistor technology.",
    explanationBn: "ফ্ল্যাশ মেমোরি হলো নন-ভোলাটাইল ইলেকট্রনিক চিপ যা পেনড্রাইভ, মেমোরি কার্ড ও এসএসডিতে ডেটা ধরে রাখতে ব্যবহৃত হয়।",
    category: "Flash Memory"
  },
  {
    id: "q12",
    question: "Calculate the average rotational latency of a 5400 RPM laptop hard drive.",
    answer: "Time for one revolution = 60 / 5400 seconds = 0.01111 s = 11.11 ms.\nAverage Rotational Latency = Half of one revolution = 11.11 / 2 = 5.56 milliseconds.",
    explanation: "Formula: Avg Rotational Latency (ms) = (30 / RPM) × 1000.",
    explanationBn: "গড় ঘূর্ণন বিলম্ব = (৩০ / ৫৪০০) × ১০০০ = ৫.৫৬ মিলি-সেকেন্ড।",
    category: "Calculations"
  },
  {
    id: "q13",
    question: "What is a 'Bad Sector' on a hard disk drive?",
    answer: "A Bad Sector is a physically damaged or magnetically degraded sector on a platter surface that cannot reliably retain data. The disk controller marks it bad and remaps requests to spare reserve sectors.",
    explanation: "Physical impacts or dust contamination can cause permanent hardware bad sectors.",
    explanationBn: "ব্যাড সেক্টর হলো ডিস্কের ক্ষতিগ্রস্ত অংশ যেখানে ডেটা পড়া বা লেখা যায় না; ড্রাইভ স্বয়ংক্রিয়ভাবে তা এড়িয়ে চলে।",
    category: "HDD Troubleshooting"
  },
  {
    id: "q14",
    question: "What is 'Wear Leveling' in SSD controllers?",
    answer: "Wear Leveling is an internal firmware algorithm that distributes write and erase cycles evenly across all physical flash memory blocks to prevent individual NAND blocks from prematurely burning out.",
    explanation: "Because NAND flash blocks have finite write endurance (e.g. 3,000 P/E cycles), wear leveling maximizes SSD lifespan.",
    explanationBn: "ওয়্যার লেভেলিং হলো এসএসডি-র এমন এক অ্যালগরিদম যা সমানভাবে সমস্ত ব্লকে ডেটা লেখে যাতে কোনো নির্দিষ্ট চিপ তাড়াতাড়ি নষ্ট না হয়।",
    category: "SSD Technologies"
  },
  {
    id: "q15",
    question: "What is the function of the 'TRIM' command in Solid-State Drives?",
    answer: "The TRIM command allows the operating system to inform the SSD controller which data blocks are no longer in use (e.g. deleted files) so the SSD can proactively wipe and garbage-collect them in the background.",
    explanation: "TRIM maintains high sustained write performance over the lifespan of the drive.",
    explanationBn: "TRIM কমান্ড মুছে ফেলা ফাইলের ব্লকগুলোকে আগেভাগেই খালি করে দিয়ে এসএসডি-র লেখার গতি বজায় রাখে।",
    category: "SSD Technologies"
  },
  {
    id: "q16",
    question: "Differentiate between Sequential Access and Direct (Random) Access storage.",
    answer: "In Sequential Access (e.g., Magnetic Tape), data must be read in linear serial order from beginning to end. In Direct Access (e.g., HDD, SSD, RAM), any arbitrary block or file can be accessed directly using its logical block address without scanning prior blocks.",
    explanation: "Direct access media allows instant random file seeking.",
    explanationBn: "Sequential অ্যাক্সেসে ক্রমানুসারে ডেটা পড়তে হয় (যেমন ম্যাগনেটিক টেপ); আর Direct অ্যাক্সেসে যেকোনো ফাইলে সরাসরি যাওয়া যায়।",
    category: "Concepts"
  },
  {
    id: "q17",
    question: "What is Magnetic Tape storage and why is it still used in modern enterprise datacenters?",
    answer: "Magnetic Tape stores data sequentially on a thin ribbon of magnetized plastic tape. Datacenters (like Google and banks) use LTO tapes for long-term cold archival backups because it offers the lowest cost per terabyte and can preserve data safely for 30+ years without power.",
    explanation: "A single LTO-9 cartridge holds 18 TB uncompressed for under $100.",
    explanationBn: "ম্যাগনেটিক টেপ কম খরচে ৩০ বছরের বেশি সময় ধরে দীর্ঘমেয়াদী ব্যাকআপ রাখার জন্য বড় বড় ডেটাসেন্টারে ব্যবহৃত হয়।",
    category: "Magnetic Media"
  },
  {
    id: "q18",
    question: "Why are Blu-ray discs able to hold more data than DVDs despite having the exact same physical disc diameter (120 mm)?",
    answer: "Blu-ray uses a shorter wavelength blue-violet laser (405 nm) compared to the red laser (650 nm) of DVDs. A shorter wavelength can be focused onto a smaller optical spot, allowing microscopic pits to be packed much closer together.",
    explanation: "Smaller pit size + narrower track pitch = 5x to 10x higher data density.",
    explanationBn: "ব্লু-রে ৪০৫ ন্যানোমিটারের নীল লেজার ব্যবহার করে যা অনেক সূক্ষ্ম স্থানে ফোকাস করতে পারে, ফলে একই মাপের ডিস্কে বেশি ডেটা আঁটে।",
    category: "Optical Storage"
  },
  {
    id: "q19",
    question: "What is a 'Hybrid Hard Drive' (SSHD)?",
    answer: "An SSHD combines a high-capacity traditional mechanical HDD with a small fast SSD cache (8-32 GB NAND flash) in a single drive enclosure, automatically caching frequently booted OS files onto flash.",
    explanation: "Provides near-SSD boot speeds at HDD storage capacities.",
    explanationBn: "SSHD হলো হার্ডডিস্ক ও ছোট এসএসডি-র সমন্বয়ে তৈরি ড্রাইভ যা কম খরচে দ্রুত বুটিং সুবিধা দেয়।",
    category: "Modern Standards"
  },
  {
    id: "q20",
    question: "Explain why SSDs are immune to mechanical fragmentation slowdowns compared to HDDs.",
    answer: "Because SSDs have electronic direct access to all flash cells with zero physical head movement. Reading fragmented blocks scattered across flash dies takes the exact same microsecond time as reading contiguous blocks.",
    explanation: "HDDs suffer severe latency when fragmented because the mechanical actuator arm must physically bounce between distant tracks.",
    explanationBn: "এসএসডিতে কোনো যান্ত্রিক হেড না থাকায় ফাইল খণ্ডবিখণ্ড (Fragmented) হলেও গতি কমে না; তাই এসএসডিতে ডিফ্র্যাগমেন্টেশন করতে হয় না।",
    category: "SSD vs HDD"
  },
  {
    id: "q21",
    question: "What is an 'Optical Jukebox'?",
    answer: "An automated robotic robotic library device that stores and swaps hundreds of optical discs (CDs, DVDs, or Blu-rays) into internal optical drive bays for permanent legal and government archiving.",
    explanation: "Provides immutable write-once read-many (WORM) archival compliance.",
    explanationBn: "অপ্টিক্যাল জুকবক্স হলো রোবোটিক ডিভাইস যা শত শত ডিস্ক স্বয়ংক্রিয়ভাবে অদলবদল করে স্থায়ী রেকর্ড সংরক্ষণ করে।",
    category: "Optical Storage"
  },
  {
    id: "q22",
    question: "Calculate the total transfer time for a 1.2 GB video file across a SATA III SSD running at 500 MB/s.",
    answer: "1.2 GB = 1.2 × 1024 MB = 1228.8 MB.\nTransfer Time = 1228.8 MB / 500 MB/s = 2.4576 seconds.",
    explanation: "On an older mechanical HDD at 100 MB/s, the same transfer takes over 12 seconds.",
    explanationBn: "১.২ জিবি = ১.২ × ১০২৪ = ১২২৮.৮ এমবি। সময় = ১২২৮.৮ / ৫০০ = প্রায় ২.৪৬ সেকেন্ড।",
    category: "Calculations"
  },
  {
    id: "q23",
    question: "What is 'SMART' in hard drive and SSD diagnostics?",
    answer: "SMART (Self-Monitoring, Analysis and Reporting Technology) is a firmware monitoring system that tracks disk health indicators (temperature, reallocated sectors, power-on hours) to warn users before hardware failure occurs.",
    explanation: "Enables proactive drive replacement before catastrophic data loss.",
    explanationBn: "SMART হলো হার্ডড্রাইভ ও এসএসডির স্বয়ংক্রিয় স্বাস্থ্য পরীক্ষা পদ্ধতি যা নষ্ট হওয়ার আগেই ব্যবহারকারীকে সতর্ক করে।",
    category: "Troubleshooting"
  },
  {
    id: "q24",
    question: "True or False: 'Defragmenting an SSD is strongly recommended every month to increase its lifespan.'",
    answer: "False. Defragmenting an SSD writes unnecessary gigabytes of data to flash blocks, rapidly consuming NAND flash write endurance cycles without providing any speed benefit.",
    explanation: "Modern operating systems automatically disable defragmentation for SSDs.",
    explanationBn: "ভুল। এসএসডি ডিফ্র্যাগমেন্ট করলে উল্টো চিপের লেখার আয়ু কমে যায়; ওএস এতে স্বয়ংক্রিয়ভাবে ডিফ্র্যাগ বন্ধ রাখে।",
    category: "True/False"
  },
  {
    id: "q25",
    question: "Summary Question: Recommend the best secondary storage device for: (a) 4K Video Editing Workstation, (b) Cold Archival Backup for 20 years, (c) Transferring school project from home to lab.",
    answer: "(a) 4K Video Editing: PCIe 4.0/5.0 NVMe M.2 SSD (highest read/write bandwidth > 7000 MB/s).\n(b) 20-Year Cold Archival: Blu-ray M-DISC or Magnetic LTO Tape (immune to magnetic decay/bitrot).\n(c) Project Transfer: USB 3.2 Flash Drive / Pendrive (compact, portable, plug-and-play).",
    explanation: "Demonstrates practical application of secondary storage media selection.",
    explanationBn: "(ক) ভিডিও এডিটিং: NVMe PCIe SSD, (খ) ২০ বছরের সংরক্ষণ: Blu-ray বা LTO Tape, (গ) প্রজেক্ট বহন: USB Flash Pendrive।",
    category: "Summary"
  }
];

export default questions;
