// topic5_questions.js
// CBSE Class XI Computer Science (083) - Topic 5 FAQs & Questions Bank
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: "q1",
    question: "What is Cache Memory and where is it located in computer architecture?",
    answer: "Cache Memory is a small, ultra-fast Static RAM (SRAM) buffer located directly on the CPU die between the processor execution core and main Dynamic RAM (DRAM).",
    explanation: "Its purpose is to store frequently accessed instructions and data to bridge the speed disparity between CPU clock cycles and main memory latency.",
    explanationBn: "ক্যাশ মেমোরি হলো CPU চিপের ভেতরে থাকা একটি অতি-দ্রুতগতির SRAM মেমোরি যা প্রসেসর ও ধীরগতির র‍্যামের মধ্যকার গতির ব্যবধান কমায়।",
    category: "Concepts"
  },
  {
    id: "q2",
    question: "Explain the Principle of Locality of Reference and name its two types.",
    answer: "The Principle of Locality of Reference states that memory references within a program are non-random and tend to cluster around specific locations. Its two forms are: (1) Temporal Locality (in time), and (2) Spatial Locality (in space).",
    explanation: "Cache design exploits these two principles to achieve hit rates exceeding 90-95% in everyday applications.",
    explanationBn: "Locality of Reference নীতি অনুসারে প্রোগ্রাম চলাকালে মেমোরি অ্যাক্সেস কোনো এলোমেলো ঘটনা নয়; এর ২টি রূপ: Temporal Locality (সময়ানুক্রমিক) এবং Spatial Locality (স্থানানুক্রমিক)।",
    category: "Locality"
  },
  {
    id: "q3",
    question: "Differentiate between Temporal Locality and Spatial Locality with Python code examples.",
    answer: "Temporal Locality: A recently accessed variable is likely to be accessed again soon (e.g., loop counter `total += item`). Spatial Locality: Memory locations near the current location are likely to be accessed next (e.g., iterating sequentially through a list `for x in my_list:`)",
    explanation: "Array elements stored contiguously in RAM exhibit high spatial locality, while variables inside repeated loops exhibit high temporal locality.",
    explanationBn: "Temporal: একই চলক বারবার ব্যবহার (যেমন লুপের কাউন্টার)। Spatial: পাশাপাশি থাকা মেমোরি অ্যাড্রেসের ধারাবাহিক ব্যবহার (যেমন অ্যারে বা লিস্ট ট্রাভার্সাল)।",
    category: "Locality"
  },
  {
    id: "q4",
    question: "What are L1, L2, and L3 caches? How do they differ in speed and capacity?",
    answer: "L1 Cache is internal to each CPU core (32-128 KB, 1ns latency, fastest). L2 Cache is a slightly larger dedicated core buffer (512 KB-2 MB, 3-5ns). L3 Cache is a large shared pool across all processor cores (16-96 MB, 10-20ns, larger but slightly slower).",
    explanation: "As you move from L1 to L3, capacity increases while access speed slightly decreases.",
    explanationBn: "L1 সবচেয়ে দ্রুত ও ছোট (প্রতি কোরে থাকে), L2 মাঝারি, এবং L3 সবচেয়ে বড় যা সমস্ত CPU কোরের মধ্যে ভাগ করা থাকে।",
    category: "Cache Levels"
  },
  {
    id: "q5",
    question: "What is a 'Cache Hit' and a 'Cache Miss'?",
    answer: "A Cache Hit occurs when the requested memory word is found immediately in cache memory. A Cache Miss occurs when the data is not in cache, forcing the CPU to retrieve it from slower main RAM.",
    explanation: "High cache hit rates prevent CPU pipelines from stalling waiting for memory bus transactions.",
    explanationBn: "প্রয়োজনীয় ডেটা ক্যাশ মেমোরিতে খুঁজে পেলে তাকে Cache Hit বলে; আর না পেলে তাকে Cache Miss বলে।",
    category: "Concepts"
  },
  {
    id: "q6",
    question: "Define 'Hit Ratio' and 'Miss Penalty'.",
    answer: "Hit Ratio is the fraction of total memory accesses resolved in the cache (Hits / Total Accesses). Miss Penalty is the extra time required to fetch the required block from main DRAM into the cache upon a miss.",
    explanation: "A higher hit ratio directly reduces the average time spent waiting for memory.",
    explanationBn: "Hit Ratio হলো মোট মেমোরি অনুরোধের কত শতাংশ ক্যাশে সফল হয়েছে; আর Miss Penalty হলো ডেটা না পেলে র‍্যাম থেকে আনতে অতিরিক্ত যে সময় লাগে।",
    category: "Metrics"
  },
  {
    id: "q7",
    question: "Calculate the Average Memory Access Time (AMAT) if Cache Hit Time = 2 ns, Hit Ratio = 90%, and Miss Penalty = 40 ns.",
    answer: "Miss Rate = 1 - 0.90 = 0.10 (10%).\nAMAT = Hit Time + (Miss Rate × Miss Penalty) = 2 ns + (0.10 × 40 ns) = 2 ns + 4 ns = 6 nanoseconds.",
    explanation: "Formula: AMAT = T_hit + (Miss_Rate × T_miss_penalty).",
    explanationBn: "Miss Rate = ০.১০। AMAT = ২ + (০.১০ × ৪০) = ২ + ৪ = ৬ ন্যানোসেকেন্ড।",
    category: "Calculations"
  },
  {
    id: "q8",
    question: "Why can't we replace the entire computer RAM with high-speed Cache (SRAM)?",
    answer: "Because SRAM requires 6 transistors per bit, making it prohibitively expensive, physically bulky on silicon dies, and generating far too much heat compared to high-density, economical DRAM.",
    explanation: "The memory hierarchy achieves high average speed at affordable cost by pairing a small SRAM cache with a large DRAM main pool.",
    explanationBn: "কারণ SRAM তৈরি করতে প্রচুর ট্রানজিস্টর ও খরচ লাগে; সম্পূর্ণ ৩২ বা ৬৪ জিবি SRAM বানালে কম্পিউটার অত্যন্ত ব্যয়বহুল এবং মাত্রাতিরিক্ত গরম হয়ে যাবে।",
    category: "Architecture"
  },
  {
    id: "q9",
    question: "Differentiate between 'Write-Through' and 'Write-Back' cache update policies.",
    answer: "In Write-Through, data is written simultaneously to both Cache and main RAM. In Write-Back, data is initially written only to Cache (setting a 'Dirty Bit') and written to main RAM only when the cache block is evicted.",
    explanation: "Write-Back minimizes memory bus traffic and speeds up execution, but requires dirty bit tracking.",
    explanationBn: "Write-Through-এ ক্যাশ ও র‍্যাম উভয়েই একসাথে ডেটা আপডেট হয়। Write-Back-এ কেবল ক্যাশে লেখা হয় এবং পরে প্রয়োজনমতো র‍্যামে পাঠানো হয়।",
    category: "Cache Policies"
  },
  {
    id: "q10",
    question: "What is a 'Cache Line' (or Cache Block)?",
    answer: "A Cache Line is the smallest unit of data transferred between main RAM and the cache memory in a single fetch, typically 64 bytes in modern x86 and ARM processors.",
    explanation: "Fetching a full 64-byte line rather than a single requested byte directly leverages spatial locality.",
    explanationBn: "ক্যাশ লাইন হলো একবারে র‍্যাম থেকে ক্যাশে আনা ডেটার ন্যূনতম ব্লক সাইজ (সাধারণত ৬৪ বাইট)।",
    category: "Concepts"
  },
  {
    id: "q11",
    question: "What is the role of the 'Dirty Bit' in a Write-Back cache?",
    answer: "The Dirty Bit is a status flag indicating whether the contents of a cache line have been modified by the CPU since being loaded from main memory. If dirty (1), the block must be written back to RAM upon eviction.",
    explanation: "If not dirty (0), the cache block can be discarded immediately upon eviction without wasting bus write cycles.",
    explanationBn: "Dirty Bit নির্দেশ করে ক্যাশের ডেটা পরিবর্তিত হয়েছে কিনা; পরিবর্তিত হলে র‍্যামে পুনরায় লিখে সেভ করতে হয়।",
    category: "Cache Policies"
  },
  {
    id: "q12",
    question: "Explain what happens during a 'Cold Miss' (Compulsory Miss) in cache memory.",
    answer: "A Cold Miss occurs the very first time a memory address or program is accessed when the computer starts up, because the cache is completely empty and must load the block from DRAM.",
    explanation: "Compulsory misses are inevitable on initial access regardless of cache size.",
    explanationBn: "কম্পিউটার বা প্রোগ্রাম চালু করার শুরুতে ক্যাশ খালি থাকায় প্রথমবারে যে মিস ঘটে তাকে Cold Miss বলে।",
    category: "Miss Types"
  },
  {
    id: "q13",
    question: "What is 'Cache Thrashing'?",
    answer: "Cache Thrashing occurs when multiple active data blocks map to the exact same cache set, continuously evicting each other and causing an endless cascade of cache misses that degrades system performance.",
    explanation: "Associative cache mapping and good memory layout by compilers help prevent thrashing.",
    explanationBn: "যখন দুটি ডেটা একই ক্যাশ স্লটের জন্য লড়াই করে একে অপরকে বারবার মুছে ফেলে গতি কমিয়ে দেয়, তাকে Cache Thrashing বলে।",
    category: "Advanced"
  },
  {
    id: "q14",
    question: "Why is L1 Cache split into 'L1 Instruction Cache' (L1-I) and 'L1 Data Cache' (L1-D)?",
    answer: "Splitting L1 cache allows the CPU to fetch a new program instruction and read/write data operands simultaneously without causing structural bus conflicts on the same cache port (Modified Harvard Architecture).",
    explanation: "This doubles the effective internal memory bandwidth of the execution pipeline.",
    explanationBn: "L1-কে কোড ও ডেটার জন্য আলাদা করায় প্রসেসর একই মুহূর্তে নির্দেশ ফেচ এবং ডেটা রিড/রাইট উভয় কাজই সম্পন্ন করতে পারে।",
    category: "Architecture"
  },
  {
    id: "q15",
    question: "What replacement policy is commonly used by cache controllers to decide which block to evict?",
    answer: "LRU (Least Recently Used) is the most common replacement policy, which evicts the cache block that has gone the longest time without being accessed.",
    explanation: "Other policies include FIFO (First In First Out) and Random Replacement.",
    explanationBn: "LRU (Least Recently Used) নীতি সবচেয়ে বেশি ব্যবহৃত হয়, যা সবচেয়ে পুরনো অব্যবহৃত ডেটাকে ক্যাশ থেকে বের করে দেয়।",
    category: "Cache Policies"
  },
  {
    id: "q16",
    question: "True or False: 'A 100% cache hit rate is achievable for all general-purpose computing workloads.'",
    answer: "False. Because cache size is finite (MBs vs GBs) and programs encounter cold misses, non-sequential jump branches, and new dataset loads, hit rates rarely exceed 95-98%.",
    explanation: "Compulsory and capacity misses prevent a theoretical 100% hit rate across arbitrary software.",
    explanationBn: "ভুল। ক্যাশের সীমাবদ্ধ আকার এবং প্রথমবার ডেটা লোডের কারণে কখনোই ১০০% হিট রেট অর্জন করা সম্ভব নয়।",
    category: "True/False"
  },
  {
    id: "q17",
    question: "How does row-major vs column-major 2D array traversal affect cache performance in programming?",
    answer: "Traversing a 2D array row-by-row accesses contiguous memory cells in sequence, maximizing Spatial Locality (high cache hits). Traversing column-by-column jumps across rows, causing frequent cache misses and slow execution.",
    explanation: "Writing cache-friendly traversal loops can make matrix multiplication 10x faster.",
    explanationBn: "রো অনুযায়ী অ্যারে ট্রাভার্স করলে ডেটা পাশাপাশি থাকায় ক্যাশ হিট বাড়ে; কিন্তু কলাম অনুযায়ী ট্রাভার্স করলে বারবার ক্যাশ মিস ঘটে।",
    category: "Locality"
  },
  {
    id: "q18",
    question: "What is '3D V-Cache' used in modern AMD Ryzen gaming processors?",
    answer: "3D V-Cache is a hardware packaging technology where an additional 64 MB slab of SRAM L3 cache is vertically stacked and bonded directly on top of the CPU core die using through-silicon vias (TSVs).",
    explanation: "This expands total L3 cache up to 96 MB or 128 MB, reducing DRAM roundtrips in gaming.",
    explanationBn: "3D V-Cache হলো প্রসেসর চিপের ওপর সরাসরি বাড়তি L3 ক্যাশ মেমোরি স্তূপাকারভাবে বসানোর আধুনিক প্রযুক্তি।",
    category: "Modern Standards"
  },
  {
    id: "q19",
    question: "Calculate the effective access time of a system where Cache Access Time = 1.5 ns, Main RAM Access Time = 60 ns, and Hit Ratio = 96%.",
    answer: "Effective Time = (Hit Ratio × Cache Time) + ((1 - Hit Ratio) × (Cache Time + RAM Time))\n= (0.96 × 1.5 ns) + (0.04 × (1.5 + 60 ns)) = 1.44 + (0.04 × 61.5) = 1.44 + 2.46 = 3.9 nanoseconds.",
    explanation: "Notice how a 96% hit rate reduces the average latency from 60 ns down to under 4 ns.",
    explanationBn: "গড় অ্যাক্সেস সময় = (০.৯৬ × ১.৫) + (০.০৪ × ৬১.৫) = ১.৪৪ + ২.৪৬ = ৩.৯ ন্যানোসেকেন্ড।",
    category: "Calculations"
  },
  {
    id: "q20",
    question: "What is a 'Unified Cache' compared to a 'Split Cache'?",
    answer: "A Unified Cache stores both machine code instructions and data words within the same shared storage array. A Split Cache maintains two dedicated separate memory arrays: one for instructions and one for data.",
    explanation: "L1 is typically split, whereas L2 and L3 are typically unified.",
    explanationBn: "Unified Cache-এ কোড ও ডেটা একসাথে থাকে; আর Split Cache-এ কোড ও ডেটার জন্য পৃথক দুটি ক্যাশ থাকে।",
    category: "Architecture"
  },
  {
    id: "q21",
    question: "Why are cache tags needed in cache memory controllers?",
    answer: "Cache tags store the upper high-order bits of the original RAM address so the cache controller can verify whether the data in a cache line corresponds to the exact physical address requested by the CPU.",
    explanation: "Comparing the address tag determines if the request is a Cache Hit or Cache Miss.",
    explanationBn: "ক্যাশ ট্যাগ মূল মেমোরির ঠিকানা মনে রাখে যাতে প্রসেসর যাচাই করতে পারে যে এটি কাঙ্ক্ষিত ডেটা কিনা।",
    category: "Technical Details"
  },
  {
    id: "q22",
    question: "What is 'Cache Invalidation' in multi-core processors?",
    answer: "When Core 1 modifies a variable in its private L1 cache, the cache controller sends an invalidation signal to Core 2's cache to prevent Core 2 from reading stale, outdated data (Cache Coherence protocol, e.g., MESI).",
    explanation: "Cache coherence guarantees consistent data views across all multi-threaded processor cores.",
    explanationBn: "একটি কোর ডেটা পরিবর্তন করলে অন্য কোরের পুরনো ডেটা অচল বা বাতিল করার প্রক্রিয়াকে Cache Invalidation বলে।",
    category: "Advanced"
  },
  {
    id: "q23",
    question: "Which silicon semiconductor technology is used to build cache memory?",
    answer: "Static RAM (SRAM) fabricated using 6-transistor CMOS flip-flop latch cells.",
    explanation: "Operates with zero refresh requirement at core clock frequencies.",
    explanationBn: "ক্যাশ মেমোরি তৈরি হয় ৬-ট্রানজিস্টর বিশিষ্ট দ্রুতগতির Static RAM (SRAM) দিয়ে।",
    category: "Concepts"
  },
  {
    id: "q24",
    question: "Explain what happens when a CPU experiences a 'Cache Miss' during a video stream decode.",
    answer: "The CPU pipeline pauses (stalls) on that instruction, the memory controller fetches a 64-byte cache line from DDR4/DDR5 DRAM across the system bus, loads it into L3, L2, and L1, and then resumes execution.",
    explanation: "The stall duration equals the miss penalty.",
    explanationBn: "প্রসেসর সাময়িকভাবে আটকে গিয়ে সিস্টেম বাসের মাধ্যমে র‍্যাম থেকে ৬৪-বাইটের ক্যাশ লাইন লোড করে এবং কাজ পুনরায় শুরু করে।",
    category: "Execution"
  },
  {
    id: "q25",
    question: "Summary Question: For each scenario, state whether it represents Temporal Locality, Spatial Locality, or a Cache Miss: (a) Iterating `for i in range(100): sum += i`, (b) Fetching array element `arr[5]` immediately after `arr[4]`, (c) First access to a newly opened program.",
    answer: "(a) Repeatedly accessing the `sum` variable: Temporal Locality.\n(b) Accessing adjacent array index `arr[5]`: Spatial Locality.\n(c) First launch of an app into empty cache: Cold / Compulsory Cache Miss.",
    explanation: "Demonstrates complete conceptual understanding of cache mechanics.",
    explanationBn: "(ক) sum চলক বারবার ব্যবহার = Temporal Locality, (খ) পাশাপাশি অ্যারে উপাদান arr[5] = Spatial Locality, (গ) নতুন অ্যাপের প্রথম অ্যাক্সেস = Cold Cache Miss।",
    category: "Summary"
  }
];

export default questions;
