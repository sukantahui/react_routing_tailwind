// src/common/bengaliExplanations/cyberSecurityKnowledge.js

/**
 * Universal Cyber Security Bilingual Concept Knowledge Engine
 * Designed for BCA Cyber Security (BCAC703) & Enterprise Defense
 * সমস্ত টেকনিক্যাল টার্ম ইংরেজিতে অক্ষুণ্ণ রেখে প্রফেশনাল অ্যাকাডেমিক বাংলায় পুঙ্খানুপুঙ্খ ব্যাখ্যা তৈরি করে
 */

export const CYBER_SECURITY_PROFILES = {
  // SEGMENT 1: Networking & Fundamentals
  "001_001": {
    domainName: "Computer Networks & Architecture",
    domainBn: "কম্পিউটার নেটওয়ার্ক ও ডেটা কমিউনিকেশন",
    defaultAnalogy: "ডাক বিভাগের মাধ্যমে চিঠি প্রেরণের মতো—চিঠির মূল বক্তব্য হলো Data Payload, খামের ওপরের প্রেরক ও প্রাপকের ঠিকানা হলো IP ও MAC Address, এবং বিভিন্ন আঞ্চলিক ডাকঘরের বাছাই প্রক্রিয়া হলো Network Routing ও Packet Switching।",
    defaultMistake: "Physical MAC Address এবং Logical IP Address-এর ভূমিকা গুলিয়ে ফেলা, অথবা TCP (Connection-oriented, Reliable) এবং UDP (Connectionless, Fast) প্রোটোকলের পার্থক্য না বোঝা।",
    defaultExamTip: "OSI Reference Model-এর ৭টি লেয়ার (Physical, Data Link, Network, Transport, Session, Presentation, Application) ক্রমানুসারে লিখে প্রতিটি লেয়ারের Protocols ও Data Units (Bits, Frames, Packets, Segments) ছক আকারে লিখবেন।",
    defaultFormula: "\\text{Transmission Delay} = \\frac{L}{R}, \\quad \\text{Propagation Delay} = \\frac{d}{s}, \\quad \\text{Latency} = \\text{Processing} + \\text{Queuing} + \\text{Transmission} + \\text{Propagation}"
  },

  "001_002": {
    domainName: "Cyber Security Principles & Threat Landscape",
    domainBn: "সাইবার সুরক্ষার মূল স্তম্ভ ও থ্রেট ল্যান্ডস্কেপ",
    defaultAnalogy: "একটি সুরক্ষিত ব্যাংকের বহুমুখী নিরাপত্তা ব্যবস্থার মতো—বাইরে সশস্ত্র প্রহরী ও সিসিটিভি (Perimeter Defense), ভেতরে মেটাল ডিটেক্টর ও আইডি কার্ড চেক (Access Control), এবং কেন্দ্রীয় ভল্টের ভেতরে বিশেষ বায়োমেট্রিক ও লকার (Encryption & Data Protection)।",
    defaultMistake: "Threat (সম্ভাব্য বিপদ) এবং Vulnerability (সিস্টেমের ভেতরের ত্রুটি বা দুর্বলতা)-র পার্থক্য গুলিয়ে ফেলা। Vulnerability ছাড়া কোনো Threat একা সিস্টেমে ক্ষতি করতে পারে না।",
    defaultExamTip: "Defense-in-Depth কৌশল এবং Attack Surface কমানোর উপায়গুলো পয়েন্ট আকারে ইংরেজিতে টেকনিক্যাল টার্মসহ লিখবেন।",
    defaultFormula: "\\text{Cyber Risk} = \\text{Threat Likelihood} \\times \\text{Vulnerability Severity} \\times \\text{Asset Impact}"
  },

  // SEGMENT 2: Foundations & Cryptography
  "002_001": {
    domainName: "Security Triad (CIA) & Core Goals",
    domainBn: "সিআইএ ট্রায়াড (Confidentiality, Integrity, Availability)",
    defaultAnalogy: "একটি সিলমোহর করা আইনি দলিল বা উইলের মতো—দলিলটি কেবল মনোনীত ব্যক্তিই পড়তে পারবেন (Confidentiality), দলিলের ভেতরে কোনো তথ্য গোপনে বিকৃত করা যাবে না (Integrity), এবং প্রয়োজনের মুহূর্তে আদালতের আর্কাইভে তা অবিলম্বে সহজলভ্য হবে (Availability)।",
    defaultMistake: "Integrity বজায় রাখার ক্ষেত্রে Hashing এবং Encryption-এর ভূমিকা গুলিয়ে ফেলা। Encryption গোপনীয়তা রক্ষা করে, কিন্তু Hashing ও Digital Signature ডেটার অখণ্ডতা নিশ্চিত করে।",
    defaultExamTip: "CIA Triad-এর ত্রিভুজ ডায়াগ্রাম এঁকে প্রতিটি স্তম্ভের লঙ্ঘনের একটি বাস্তব উদাহরণ দিন (যেমন Eavesdropping ভঙ্গ করে Confidentiality, Man-in-the-Middle ভঙ্গ করে Integrity, DoS আক্রমণ ভঙ্গ করে Availability)।",
    defaultFormula: "\\text{Information Security} = \\text{Confidentiality} + \\text{Integrity} + \\text{Availability} + \\text{Non-Repudiation}"
  },

  "002_002": {
    domainName: "Hacking & Ethical Hacking",
    domainBn: "হ্যাকিং, এথিক্যাল হ্যাকিং ও হ্যাকার শ্রেণিবিভাগ",
    defaultAnalogy: "একজন লাইসেন্সপ্রাপ্ত মাস্টার তালার মিস্ত্রি (Locksmith) বনাম চোরের মতো—উভয়েই তালার ভেতরের ত্রুটি ও মেকানিজম সম্যকভাবে জানে, কিন্তু এথিক্যাল হ্যাকার বাড়ির মালিকের লিখিত অনুমতি নিয়ে নিরাপত্তার ত্রুটি মেরামত করে, আর চোর চুরির উদ্দেশ্যে তালা ভাঙে।",
    defaultMistake: "অনুমতিহীন কোনো সার্ভারে শিক্ষামূলক উদ্দেশ্যে পেন্টেস্টিং করাও যে আইনত অপরাধ (Black Hat Activity under IT Act 2000), তা অনুধাবন না করা।",
    defaultExamTip: "White Hat, Black Hat এবং Grey Hat হ্যাকারের তুলনামূলক পার্থক্য ছক তৈরি করবেন এবং Indian Information Technology Act (IT Act 2000 Section 43 & 66) উল্লেখ করবেন।",
    defaultFormula: "\\text{Ethical Hacking Scope} = \\text{Written Authorization (NDA)} + \\text{Defined Boundary} + \\text{Vulnerability Disclosure}"
  },

  "002_003": {
    domainName: "Phases of Hacking Methodology",
    domainBn: "হ্যাকিং ও পেনিট্রেশন টেস্টিংয়ের ৫টি পর্যায়",
    defaultAnalogy: "একটি সামরিক অভিযানের মতো—প্রথমে স্যাটেলাইট ও গোয়েন্দা দিয়ে এলাকা পরিদর্শন (Reconnaissance), বাউন্ডারি ও গেট পরীক্ষা (Scanning), দুর্গের ভেতরে প্রবেশ (Gaining Access), গোপন ঘাঁটি তৈরি রাখা (Maintaining Access), এবং ক্যামেরার ফুটেজ মুছে ফেলা (Covering Tracks)।",
    defaultMistake: "Passive Reconnaissance (যেখানে টার্গেটের সাথে কোনো সরাসরি প্যাকেট আদান-প্রদান হয় না) এবং Active Scanning-এর পার্থক্য গুলিয়ে ফেলা।",
    defaultExamTip: "CEH ফ্রেমওয়ার্কের ৫টি ধাপ ক্রমানুসারে ইংরেজিতে ফ্লোচার্ট একে লিখবেন এবং প্রতি ধাপে ব্যবহৃত দুটি করে কমান্ড বা টুলের নাম (Nmap, Wireshark, Metasploit, Burp Suite) দেবেন।",
    defaultFormula: "\\text{PenTest Workflow: } \\text{Recon} \\rightarrow \\text{Scanning} \\rightarrow \\text{Gaining Access} \\rightarrow \\text{Maintaining Access} \\rightarrow \\text{Clearing Tracks}"
  },

  "002_004": {
    domainName: "Cryptography & Watermarking",
    domainBn: "ক্রিপ্টোগ্রাফি, সিমেট্রিক-অ্যাসিমেট্রিক সাইফার ও ওয়াটারমার্কিং",
    defaultAnalogy: "একটি বিশেষ লকার বক্স—Symmetric Encryption হলো এমন একটি তালা যার একটাই চাবি দুজনের কাছে থাকে। Asymmetric Encryption হলো এমন এক ড্রপ-বক্স যাতে যে কেউ চিঠি ফেলতে পারে (Public Key), কিন্তু বক্সটি খোলার মাস্টার চাবি শুধু প্রাপকের কাছে থাকে (Private Key)।",
    defaultMistake: "Steganography এবং Cryptography-র পার্থক্য গুলিয়ে ফেলা। Cryptography বার্তাকে অপাঠ্য বানায় (Visible scrambling), আর Steganography বার্তার অস্তিত্বকেই গোপন করে (Hidden inside carrier file)।",
    defaultExamTip: "Kerckhoffs's Principle অবশ্যই উল্লেখ করবেন: 'ক্রিপ্টোগ্রাফিক অ্যালগরিদম প্রকাশ্যে জানাজানি হলেও ক্ষতি নেই, সিস্টেমের নিরাপত্তা সম্পূর্ণ নির্ভর করে Secret Key-এর সুরক্ষার ওপর।'",
    defaultFormula: "\\text{Caesar Cipher: } C = (P + k) \\pmod{26}, \\quad \\text{Hill Cipher: } C = K \\cdot P \\pmod{26}"
  },

  "002_005": {
    domainName: "RSA Public Key Cryptography & PKI",
    domainBn: "আরএসএ (RSA) অ্যালগরিদম ও পাবলিক কি ইনফ্রাস্ট্রাকচার",
    defaultAnalogy: "একমুখী ট্র্যাপডোর ফাংশন (Trapdoor Function)—দুটি বিশাল কাঁচের জার ভর্তি রঙিন মার্বেল মিশিয়ে ফেলা সেকেন্ডের কাজ (Forward Prime Multiplication), কিন্তু সেই মিশ্রণ দেখে কোন জার থেকে কতগুলো মার্বেল এসেছিল তা বের করা মানবিকভাবে অসম্ভব (Integer Factorization Problem)।",
    defaultMistake: "Encryption এবং Decryption করার সময় Private Key ($d$) এবং Public Key ($e$) এর স্থান পরিবর্তন করে ফেলা। $e$ সবার জন্য উন্মুক্ত, কিন্তু $d$ সম্পূর্ণ গোপন।",
    defaultExamTip: "পরীক্ষায় ছোট সংখ্যা ($p=3, q=11, e=3$ or $7$) দিয়ে ধাপে ধাপে $n, \\phi(n), d$ নির্ণয় করে একটি সম্পূর্ণ গাণিতিক সমীকরণ সমাধান করে দেখাবেন।",
    defaultFormula: "n = p \\cdot q, \\quad \\phi(n) = (p-1)(q-1), \\quad e \\cdot d \\equiv 1 \\pmod{\\phi(n)}, \\quad C = M^e \\pmod n, \\quad M = C^d \\pmod n"
  },

  // SEGMENT 3: Information Security Management
  "003_001": {
    domainName: "Information Security Management (ISM)",
    domainBn: "তথ্য নিরাপত্তা ব্যবস্থাপনা ও রিসোর্স প্রোটেকশন",
    defaultAnalogy: "একটি বহুজাতিক কর্পোরেট সেন্টারের সিকিউরিটি ম্যানেজমেন্টের মতো—ভবনের মূল্যবান সম্পত্তি তালিকাভুক্ত করা, কোন রুমে কার প্রবেশের অনুমতি রয়েছে তা নির্ধারণ করা এবং নিয়মিত দুর্যোগ মোকাবিলার মহড়া পরিচালনা করা।",
    defaultMistake: "Security Management-কে কেবল একটি প্রযুক্তিগত (IT) বিষয় মনে করা; বাস্তবে এটি পলিসি, মানুষ ও প্রযুক্তির সমন্বিত সাংগঠনিক ব্যবস্থাপনা।",
    defaultExamTip: "Asset Classification Matrix (Public, Internal, Confidential, Restricted) ছক আকারে উপস্থাপন করবেন।",
    defaultFormula: "\\text{ISM Balance} = \\text{Security Rigor} \\iff \\text{Operational Usability} + \\text{Cost Efficiency}"
  },

  "003_002": {
    domainName: "ISMS Framework & ISO/IEC 27001",
    domainBn: "আইএসএমএস ও আইএসও ২৭০০১ আন্তর্জাতিক মানদণ্ড",
    defaultAnalogy: "একটি আন্তর্জাতিক মানের কারখানায় গুণমান বজায় রাখতে যেমন ISO কোয়ালিটি সার্কেল অনুসরণ করা হয়, সিকিউরিটিতেও তেমনই কোনো ত্রুটি স্থায়ী হতে না দিয়ে ক্রমাগত পরিমার্জন করা হয়।",
    defaultMistake: "ISO 27001 এবং ISO 27002-এর পার্থক্য গুলিয়ে ফেলা। 27001 হলো অডিট ও সার্টিফিকেশনের স্পেসিফিকেশন, আর 27002 হলো গাইডলাইন ও কন্ট্রোলসের বিস্তারিত গাইড।",
    defaultExamTip: "PDCA (Plan-Do-Check-Act) সাইকেলের ডায়াগ্রাম এঁকে প্রতিটি ধাপে কী কী কাজ সম্পাদিত হয় তা পয়েন্ট আকারে লিখবেন।",
    defaultFormula: "\\text{PDCA Cycle: } \\text{Plan (Context \\& Policy)} \\rightarrow \\text{Do (Implement Controls)} \\rightarrow \\text{Check (Audit \\& Review)} \\rightarrow \\text{Act (Corrective Actions)}"
  },

  "003_003": {
    domainName: "Security Policies & Risk Management",
    domainBn: "সিকিউরিটি পলিসি, ঝুঁকি মূল্যায়ন ও প্রশমন",
    defaultAnalogy: "একটি ফায়ার সেফটি পলিসির মতো—আগুন লাগার সম্ভাবনা চিহ্নিত করা (Risk Assessment), ভবনে স্মোক ডিটেক্টর ও স্প্রিঙ্কলার বসানো (Risk Mitigation), এবং ফায়ার ইন্স্যুরেন্স করিয়ে আর্থিক ঝুঁকি অন্য সংস্থায় স্থানান্তর করা (Risk Transfer)।",
    defaultMistake: "ঝুঁকি সম্পূর্ণভাবে শূন্য করা সম্ভব বলে ভুল ধারণা পোষণ করা; সবসময় কিছু Residual Risk (অবশিষ্ট ঝুঁকি) থেকে যায় যা ম্যানেজমেন্টকে গ্রহণ (Accept) করতে হয়।",
    defaultExamTip: "Risk Treatment-এর ৪টি বিকল্প (Mitigate, Transfer, Avoid, Accept) এবং ALE গণনার সূত্র পরিষ্কারভাবে লিখবেন।",
    defaultFormula: "\\text{ALE (Annual Loss Expectancy)} = \\text{SLE (Single Loss Expectancy)} \\times \\text{ARO (Annual Rate of Occurrence)}"
  },

  "003_004": {
    domainName: "Information Security Audit & Compliance",
    domainBn: "তথ্য নিরাপত্তা অডিট, প্রমাণ সংগ্রহ ও কমপ্লায়েন্স",
    defaultAnalogy: "একটি আর্থিক অডিটের মতো—কোম্পানি নিজে যা দাবি করছে, নিরপেক্ষ বহিঃস্থ চার্টার্ড অ্যাকাউন্ট্যান্ট যেমন প্রতিটি রসিদ ও লেজার মিলিয়ে দেখেন, সাইবার অডিটরও তেমনই সার্ভারের লগ ও পলিসি কনফিগারেশন মিলিয়ে সত্যতা যাচাই করেন।",
    defaultMistake: "Vulnerability Assessment (স্বয়ংক্রিয় স্ক্যান দিয়ে সম্ভাব্য ত্রুটির তালিকা) এবং Penetration Testing (হ্যাকারের মতো আক্রমণ চালিয়ে ত্রুটি কাজে লাগানো)-কে একই জিনিস মনে করা।",
    defaultExamTip: "Internal Audit এবং External Certification Audit-এর ৩টি পার্থক্য লিখবেন এবং অডিটের ৩টি পর্যায় (Pre-audit, On-site Execution, Reporting) পয়েন্ট করবেন।",
    defaultFormula: "\\text{Audit Finding} = \\text{Condition (Current State)} \\text{ vs } \\text{Criteria (Policy Standard)} \\rightarrow \\text{Impact \\& Remedy}"
  },

  // SEGMENT 4: Cyber Attacks & Threat Analysis
  "004_001": {
    domainName: "Passive vs Active Cyber Attacks",
    domainBn: "প্যাসিভ বনাম অ্যাক্টিভ সাইবার আক্রমণ",
    defaultAnalogy: "প্যাসিভ আক্রমণ হলো ঘরের বাইরে দাঁড়িয়ে আড়ি পেতে কথা শোনা (গোপন তথ্য জানা কিন্তু কেউ বুঝতে পারে না); অ্যাক্টিভ আক্রমণ হলো ঘরে জোর করে ঢুকে নথি ছিঁড়ে ফেলা বা ব্যাগে রাখা টাকা চুরি করে নেওয়া।",
    defaultMistake: "প্যাসিভ আক্রমণ সহজে ধরা যায় মনে করা; বাস্তবে প্যাসিভ অ্যাটাকে কোনো প্যাকেট পরিবর্তন হয় না বলে এটি ডিটেক্ট করা অত্যন্ত কঠিন, এনক্রিপশনই এর একমাত্র প্রধান প্রতিরোধ।",
    defaultExamTip: "প্যাসিভ (Eavesdropping, Traffic Analysis) বনাম অ্যাক্টিভ (Masquerading, Replay, Modification, DoS) আক্রমণ সুন্দর তুলনামূলক ছক আকারে উপস্থাপন করবেন।",
    defaultFormula: "\\text{Passive Goal: Compromise Confidentiality} \\quad \\iff \\quad \\text{Active Goal: Compromise Integrity / Availability}"
  },

  "004_002": {
    domainName: "Malware Taxonomy & Behavioral Analysis",
    domainBn: "ম্যালওয়্যার শ্রেণিবিভাগ, সংক্রমণ কৌশল ও র‍্যানসমওয়্যার",
    defaultAnalogy: "জৈবিক জীবাণুর মতো—ভাইরাস যেমন নিজে একা ছড়াতে পারে না, অন্য কোষের ভেতরে ঢুকে বিস্তার লাভ করে; প্যারাসাইটিক ব্যাকটেরিয়া (Worm) নিজে নিজেই অবাধে ছড়িয়ে পড়ে; আর গ্রিক ট্রোজান হর্স হলো উপহারের ছদ্মবেশে ভেতরে ঢুকে রাতে আক্রমণকারী সেনা।",
    defaultMistake: "Virus এবং Worm-এর পার্থক্য না বোঝা। ভাইরাসের ক্ষেত্রে ব্যবহারকারীর হিউম্যান ইন্টারঅ্যাকশন (ফাইল ওপেন/রান) লাগে, কিন্তু Worm নেটওয়ার্কের ত্রুটি কাজে লাগিয়ে সম্পূর্ণ স্বয়ংক্রিয়ভাবে রেপ্লিকেট করে।",
    defaultExamTip: "Ransomware (WannaCry) কীভাবে কাজ করে এবং কীভাবে Symmetric ও Asymmetric ক্রিপ্টোগ্রাফি ব্যবহার করে ভিকটিমের ফাইল এনক্রিপ্ট করে তা ব্যাখ্যা করবেন।",
    defaultFormula: "\\text{Malware Detection} = \\text{Static Signature Matching} + \\text{Dynamic Heuristic / Sandbox Behavior Analysis}"
  },

  "004_003": {
    domainName: "Phishing & Social Engineering",
    domainBn: "ফিশিং, সোশ্যাল ইঞ্জিনিয়ারিং ও মানবিক মনস্তাত্ত্বিক আক্রমণ",
    defaultAnalogy: "মাছ ধরার টোপের মতো—চকচকে আকর্ষণীয় খাবার ঝুলিয়ে মাছকে প্রলুব্ধ করা; সাইবার অপরাধীও তেমনই লোভনীয় অফার, ভুয়া লটারি বা অ্যাকাউন্ট ব্লক হওয়ার ভুয়ো আতঙ্ক তৈরি করে মানুষকে পাসওয়ার্ড দিতে বাধ্য করে।",
    defaultMistake: "ফিশিং কেবল সাধারণ ইমেলের মাধ্যমেই ঘটে মনে করা; বাস্তবে Spear Phishing নির্দিষ্ট ব্যক্তির ওপর গভীর রিসার্চ করে অত্যন্ত নিখুঁতভাবে তৈরি করা হয়।",
    defaultExamTip: "Social Engineering-এর ৬টি মনস্তাত্ত্বিক নীতি (Authority, Urgency, Scarcity, Fear, Social Proof, Likability) পয়েন্ট আকারে লিখবেন।",
    defaultFormula: "\\text{Human Factor: } \\text{Sophisticated Tech Defenses} \\times 0 \\text{ (Human Click on Malicious Link)} = 0 \\text{ Security}"
  },

  "004_004": {
    domainName: "Denial of Service (DoS) & DDoS Attacks",
    domainBn: "ডিনায়াল অব সার্ভিস (DoS) ও ডিস্ট্রিবিউটেড ডিওএস আক্রমণ",
    defaultAnalogy: "একটি জনপ্রিয় ছোট মিষ্টির দোকানের কাউন্টারে হাজার হাজার ভুয়ো লোক লাইন দিয়ে দাঁড়িয়ে পড়ল, যার ফলে দোকানের আসল ও প্রকৃত ক্রেতারা মিষ্টি কেনার কোনো সুযোগই পেল না এবং দোকানটি অচল হয়ে পড়ল।",
    defaultMistake: "DoS এবং DDoS-এর পার্থক্য ভুলে যাওয়া; DoS আক্রমণ করে একটি একক মেশিন থেকে (যা সহজে ব্লক করা যায়), আর DDoS-এ বিশ্বজুড়ে ছড়িয়ে থাকা লাখ লাখ জম্বি কম্পিউটারের Botnet ব্যবহার করা হয়।",
    defaultExamTip: "TCP 3-Way Handshake (SYN, SYN-ACK, ACK) এবং SYN Flood অ্যাটাক কীভাবে সার্ভারের কানেকশন ব্যাকলগ কিউ পূর্ণ করে দেয় তা ডায়াগ্রাম দিয়ে বোঝাবেন।",
    defaultFormula: "\\text{Botnet Scale} = \\sum_{i=1}^M \\text{Zombie Nodes} \\times \\text{Bandwidth Amplification Factor} \\gg \\text{Victim Bandwidth}"
  },

  "004_005": {
    domainName: "Web Application Attacks & SQL Injection",
    domainBn: "ওয়েব অ্যাপ্লিকেশন নিরাপত্তা, এসকিউএল ইনজেকশন ও এক্সএসএস",
    defaultAnalogy: "একটি ফর্ম পূরণের বাক্সে নামের জায়গায় কোনো বিশেষ আইনি নির্দেশ লিখে দেওয়া, যা দেখে বিচারক অন্ধভাবে ফাঁদে পা দিয়ে পুরো আদালতের ফাইল প্রদর্শন করে ফেলল।",
    defaultMistake: "Client-side validation (HTML/JS) দিয়ে SQL Injection আটকানো যাবে বলে মনে করা; হ্যাকাররা সরাসরি HTTP রিকোয়েস্ট তৈরি করে ব্রাউজারের ভ্যালিডেশন এড়িয়ে যায়।",
    defaultExamTip: "Parameterized Queries (Prepared Statements) কীভাবে SQL কোড এবং ডেটাকে আলাদা করে SQL Injection সম্পূর্ণ প্রতিরোধ করে, তার কোড সিনট্যাক্স লিখবেন।",
    defaultFormula: "\\text{Tautology Injection: } \\texttt{\"SELECT * FROM users WHERE user='' OR '1'='1' --\"} \\implies \\text{Always True (Auth Bypass)}"
  },

  "004_006": {
    domainName: "Landmark Cyber Attack Case Studies",
    domainBn: "ঐতিহাসিক প্রধান সাইবার আক্রমণের কেস স্টাডি",
    defaultAnalogy: "ইতিহাসের বড় বড় যুদ্ধ বা দুর্ঘটনার বিশ্লেষণ যেমন পরবর্তী প্রজন্মের জন্য দুর্ভেদ্য সুরক্ষা নকশা তৈরি করতে শেখায়, সাইবার জগতের স্টাক্সনেট ও ওয়ানাক্রাইও তেমনই ডিজিটাল সুরক্ষার মোড় ঘুরিয়ে দিয়েছে।",
    defaultMistake: "Stuxnet-কে সাধারণ কম্পিউটার ভাইরাস মনে করা; এটি ছিল বাস্তব বিশ্বের সেন্ট্রিফিউজ ধ্বংস করার উদ্দেশ্যে উদ্ভাবিত প্রথম সামরিক সাইবার অস্ত্র (Military Cyber Weapon)।",
    defaultExamTip: "Stuxnet (SCADA PLC attack), WannaCry (EternalBlue exploit) এবং SolarWinds (Supply Chain attack) এই ৩টি কেস স্টাডির লক্ষ্য, মেকানিজম ও শিক্ষা পয়েন্ট করবেন।",
    defaultFormula: "\\text{Attack Vector: } \\text{Zero-Day Exploits} + \\text{Air-Gapped Infiltration} \\rightarrow \\text{Kinetic Physical Destruction}"
  },

  // SEGMENT 5: Technological Aspects of Cyber Security
  "005_001": {
    domainName: "Firewalls & Perimeter Defense Architectures",
    domainBn: "ফায়ারওয়াল ও নেটওয়ার্ক পেরিমিটার ডিফেন্স আর্কিটেকচার",
    defaultAnalogy: "একটি আন্তর্জাতিক এয়ারপোর্টের ইমিগ্রেশন ও সিকিউরিটি চেকপয়েন্টের মতো—কার পাসপোর্ট বৈধ, কার ব্যাগে নিষিদ্ধ বস্তু রয়েছে তা পরীক্ষা করা এবং সন্দেহজনক কাউকে ভেতরে প্রবেশ করতে না দেওয়া।",
    defaultMistake: "Stateless Packet Filter এবং Stateful Inspection Firewalls-এর কাজের ধারা গুলিয়ে ফেলা। Stateful ফায়ারওয়াল পূর্ববর্তী সেশনের স্টেট টেবিল মনে রাখে, Stateless কেবল একক প্যাকেট দেখে।",
    defaultExamTip: "DMZ (Demilitarized Zone)-এর আর্কিটেকচার ডায়াগ্রাম এঁকে দেখাবেন কীভাবে পাবলিক ওয়েব সার্ভারকে ইন্টারনাল ল্যান থেকে আলাদা রাখা হয়।",
    defaultFormula: "\\text{Firewall Rule: } \\text{IF } \\langle \\text{Src IP, Dst IP, Src Port, Dst Port, Protocol} \\rangle \\text{ matches rule THEN } \\{ \\text{ALLOW / DROP} \\}"
  },

  "005_002": {
    domainName: "IDS, IPS & Honeypot Technologies",
    domainBn: "আইডিএস (IDS), আইপিএস (IPS) ও হানিপট প্রযুক্তি",
    defaultAnalogy: "চোর ধরার সতর্ক ঘণ্টা (IDS alarm) বনাম স্বয়ংক্রিয়ভাবে লক হয়ে যাওয়া লেজার গেট (IPS prevention); আর হানিপট হলো গোয়েন্দাদের পাতা সুস্বাদু টোপ দেওয়া ফাঁদ যাতে চোরের আচরণ ক্যামেরাবন্দী করা যায়।",
    defaultMistake: "IDS এবং IPS-এর পজিশনিং গুলিয়ে ফেলা। IDS সাধারণত নেটওয়ার্কের সুইচ স্প্যান পোর্টে প্যাসিভ থাকে, আর IPS-কে ইন-লাইন (সরাসরি ডেটা ট্রাফিকের রাস্তায়) বসাতে হয়।",
    defaultExamTip: "Signature-based Detection (জ্ঞাত প্যাটার্ন) বনাম Anomaly-based Detection (অস্বাভাবিক আচরণ) এর তুলনামূলক সুবিধা ও অসুবিধা লিখবেন।",
    defaultFormula: "\\text{Detection Accuracy} = \\frac{\\text{True Positives}}{\\text{True Positives} + \\text{False Positives}} \\quad \\text{(Minimize False Alarm Rate)}"
  },

  "005_003": {
    domainName: "Virtual Private Networks (VPN) & Tunneling",
    domainBn: "ভিপিএন (VPN) ও নিরাপদ টানেলিং প্রযুক্তি",
    defaultAnalogy: "একটি ব্যস্ত সর্বজনীন মহাসড়কের নিচ দিয়ে ব্যক্তিগত কংক্রিটের সুরক্ষিত গোপন সুরঙ্গ (Tunnel) তৈরি করে চলাচল করা—বাইরের কেউ ভেতরে কী পরিবহন হচ্ছে দেখতে বা স্পর্শ করতে পারে না।",
    defaultMistake: "VPN ব্যবহার করলে সম্পূর্ণ বেনামী (100% anonymous) হওয়া যায় বলে ভাবা; VPN ট্রান্সমিশন এনক্রিপ্ট করে এবং আইপি মাস্ক করে, কিন্তু ব্রাউজার ফিঙ্গারপ্রিন্টিং বা লগইন ট্র্যাকিং বন্ধ করতে পারে না।",
    defaultExamTip: "Remote Access VPN এবং Site-to-Site VPN-এর নেটওয়ার্ক ডায়াগ্রাম ও IPsec Tunnel Mode বনাম Transport Mode-এর আর্কিটেকচার ব্যাখ্যা করবেন।",
    defaultFormula: "\\text{Encapsulation: } [\\text{New IP Header}] + [\\text{IPsec ESP Header}] + \\text{Encrypted } [\\text{Original IP Header} + \\text{Payload}]"
  },

  "005_004": {
    domainName: "Security Protocols: SSL, TLS & IPsec",
    domainBn: "নেটওয়ার্ক সিকিউরিটি প্রোটোকল: এসএসএল, টিএলএস ও আইপিসেক",
    defaultAnalogy: "একটি সরকারি গোপন নথির ওপর উচ্চ আদালতের বিচারপতির ডিজিটাল সিলমোহর ও ওয়াটারমার্ক—যা প্রমাণ করে নথিটি আসল এবং পথিমধ্যে কেউ পরিবর্তন করেনি।",
    defaultMistake: "SSL এবং TLS-কে আলাদা বিপরীত প্রোটোকল মনে করা; SSL হলো পুরোনো এবং ত্রুটিযুক্ত সংস্করণ, যার আধুনিক ও সুরক্ষিত রূপান্তর হলো TLS (বর্তমানে TLS 1.3 ব্যবহৃত হয়)।",
    defaultExamTip: "TLS Handshake-এর ধাপগুলো (ClientHello, ServerHello, Certificate Exchange, Key Generation, Finished) ফ্লোচার্ট দিয়ে দেখাবেন।",
    defaultFormula: "\\text{TLS Security} = \\text{Asymmetric Handshake (Auth \\& Key Exchange)} + \\text{Symmetric Session Cipher (Data AES)} + \\text{HMAC (Integrity)}"
  },

  "005_005": {
    domainName: "Authentication Frameworks & Multi-Factor Auth (MFA)",
    domainBn: "অথেনটিকেশন ফ্রেমওয়ার্ক ও মাল্টি-ফ্যাক্টর অথেনটিকেশন (MFA)",
    defaultAnalogy: "একটি সামরিক আর্মারি খোলার প্রক্রিয়া—পাসওয়ার্ড জানা (Something you know), বিশেষ ফিজিক্যাল ইউএসবি সিকিউরিটি কি থাকা (Something you have), এবং কমান্ডারের রেটিনা স্ক্যান করা (Something you are)।",
    defaultMistake: "পাসওয়ার্ড ডাটাবেসে প্লেইন টেক্সট বা কেবল সাধারণ MD5 হ্যাশ করে রাখা; Rainbow Table অ্যাটাক ঠেকাতে সবসময় ক্রিপ্টোগ্রাফিক সল্ট (Cryptographic Salt) সহ bcrypt বা Argon2 ব্যবহার করতে হয়।",
    defaultExamTip: "Authentication-এর ৩টি মৌলিক ফ্যাক্টর (Knowledge, Possession, Inherence) পরিষ্কারভাবে উদাহরণসহ লিখবেন এবং SMS-based OTP-র চেয়ে Authenticator App (TOTP) কেন বেশি সুরক্ষিত তা ব্যাখ্যা করবেন।",
    defaultFormula: "\\text{Password Security: } \\text{Hash} = \\text{KDF}(\\text{Password} + \\text{Cryptographic Salt}, \\text{Work Factor})"
  },

  "005_006": {
    domainName: "Emerging Technologies in Cyber Security",
    domainBn: "সাইবার সুরক্ষার উদীয়মান প্রযুক্তি, জিরো ট্রাস্ট ও এআই ডিফেন্স",
    defaultAnalogy: "জিরো ট্রাস্ট আর্কিটেকচার হলো এমন এক অতি-সুরক্ষিত গবেষণাগার যেখানে কর্মরত বিজ্ঞানীদেরও প্রতি দরজায় নতুন করে পরিচয়পত্র ও চোখের স্ক্যান দিতে হয়—'কাউকেই অন্ধভাবে বিশ্বাস করো না, প্রতি মুহূর্তে যাচাই করো'।",
    defaultMistake: "ঐতিহ্যবাহী পেরিমিটার সিকিউরিটিকে আধুনিক ক্লাউড পরিবেশে যথেষ্ট মনে করা; ফায়ারওয়াল পার হয়ে ভেতরের ল্যানে ঢুকলেই সবাইকে বিশ্বাস করা মারাত্মক ভুল নীতি।",
    defaultExamTip: "Zero Trust Architecture-এর মূল নীতি ('Never Trust, Always Verify') এবং AI/ML কীভাবে রিয়েল-টাইম থ্রেট অ্যানালাইসিসে সহায়তা করে তা বুলেট পয়েন্টে লিখবেন।",
    defaultFormula: "\\text{Zero Trust Core: } \\text{Verify Explicitly} + \\text{Least Privilege Access} + \\text{Assume Breach Always}"
  }
};

/**
 * Helper to identify which profile fits a given module slug
 */
export function getCyberProfile(moduleSlug = "") {
  const s = (moduleSlug || "").toLowerCase();
  for (const key of Object.keys(CYBER_SECURITY_PROFILES)) {
    if (s.startsWith(key) || s.includes(key)) {
      return CYBER_SECURITY_PROFILES[key];
    }
  }

  // Keyword-based fallback
  if (s.includes("network")) return CYBER_SECURITY_PROFILES["001_001"];
  if (s.includes("cia") || s.includes("triad")) return CYBER_SECURITY_PROFILES["002_001"];
  if (s.includes("ethical") || s.includes("hack")) return CYBER_SECURITY_PROFILES["002_002"];
  if (s.includes("phase")) return CYBER_SECURITY_PROFILES["002_003"];
  if (s.includes("crypto") || s.includes("cipher")) return CYBER_SECURITY_PROFILES["002_004"];
  if (s.includes("rsa")) return CYBER_SECURITY_PROFILES["002_005"];
  if (s.includes("ism") || s.includes("governance")) return CYBER_SECURITY_PROFILES["003_001"];
  if (s.includes("isms") || s.includes("27001")) return CYBER_SECURITY_PROFILES["003_002"];
  if (s.includes("policy") || s.includes("risk")) return CYBER_SECURITY_PROFILES["003_003"];
  if (s.includes("audit")) return CYBER_SECURITY_PROFILES["003_004"];
  if (s.includes("passive") || s.includes("active")) return CYBER_SECURITY_PROFILES["004_001"];
  if (s.includes("malware") || s.includes("virus") || s.includes("worm")) return CYBER_SECURITY_PROFILES["004_002"];
  if (s.includes("phishing") || s.includes("social")) return CYBER_SECURITY_PROFILES["004_003"];
  if (s.includes("dos") || s.includes("ddos")) return CYBER_SECURITY_PROFILES["004_004"];
  if (s.includes("sql") || s.includes("web") || s.includes("injection")) return CYBER_SECURITY_PROFILES["004_005"];
  if (s.includes("case") || s.includes("stuxnet") || s.includes("landmark")) return CYBER_SECURITY_PROFILES["004_006"];
  if (s.includes("firewall") || s.includes("perimeter")) return CYBER_SECURITY_PROFILES["005_001"];
  if (s.includes("ids") || s.includes("ips") || s.includes("honeypot")) return CYBER_SECURITY_PROFILES["005_002"];
  if (s.includes("vpn") || s.includes("tunnel")) return CYBER_SECURITY_PROFILES["005_003"];
  if (s.includes("ssl") || s.includes("tls") || s.includes("ipsec")) return CYBER_SECURITY_PROFILES["005_004"];
  if (s.includes("auth") || s.includes("mfa") || s.includes("factor")) return CYBER_SECURITY_PROFILES["005_005"];
  if (s.includes("emerging") || s.includes("zero-trust") || s.includes("ai")) return CYBER_SECURITY_PROFILES["005_006"];

  return CYBER_SECURITY_PROFILES["001_002"];
}

/**
 * Generate a comprehensive 4-tab explanation for any Cyber Security topic
 */
export function generateCyberSecurityExplanation({
  topicIndex = 0,
  topicTitle = "",
  moduleSlug = "",
  moduleTitle = ""
}) {
  const profile = getCyberProfile(moduleSlug);
  const displayTitle = topicTitle || `Topic ${topicIndex + 1}`;

  return {
    topicNumber: topicIndex,
    titleEn: displayTitle,
    titleBn: `${displayTitle} (সহজ বাংলায় পুঙ্খানুপুঙ্খ পাঠ)`,
    subtitleBn: `${moduleTitle || profile.domainBn}: সাইবার সিকিউরিটি বিশ্লেষণ ও প্রয়োগ`,
    simpleSummary: `সহজ ভাষায়, "${displayTitle}" হলো ${moduleTitle || profile.domainName}-এর একটি অত্যন্ত মৌলিক ও অপরিহার্য বিষয়। আধুনিক সাইবার সুরক্ষায় কম্পিউটার সিস্টেম, নেটওয়ার্ক ও সংবেদনশীল ডেটাকে বহিরাগত হ্যাকার ও অভ্যন্তরীণ ম্যালিশাস কার্যক্রম থেকে সুরক্ষিত রাখতে এই প্রযুক্তির নীতি ও মেকানিজম সরাসরি প্রয়োগ করা হয়।`,
    coreIntuition: `বাস্তব বিশ্বের ডিজিটাল সিস্টেমে কোনো নিরাপত্তাই স্বয়ংক্রিয় বা নিশ্ছিদ্র নয়। হ্যাকাররা সর্বদা সিস্টেমের দুর্বলতম লিঙ্ক বা ছিদ্র অনুসন্ধান করে। "${displayTitle}" ধারণাটি ডিফেন্ডারদের শেখায় কীভাবে প্রযুক্তি, সুনির্দিষ্ট পলিসি ও গাণিতিক প্রোটোকলের সমন্বয়ে সাইবার আক্রমণের ঝুঁকি ন্যূনতম পর্যায়ে নামিয়ে আনা যায়।`,
    whyImportant: `ডিজিটাল যুগে একটি ছোট্ট নিরাপত্তা ত্রুটির কারণে সমগ্র সংস্থার গোপন ডেটা চুরি, কোটি টাকার আর্থিক ক্ষতি বা গুরুত্বপূর্ণ সার্ভার অচল হয়ে পড়তে পারে। "${displayTitle}"-এর গভীর তাত্ত্বিক ও ব্যবহারিক জ্ঞান অর্জন না করলে একজন সিকিউরিটি ইঞ্জিনিয়ার বা শিক্ষার্থী কখনোই এন্টারপ্রাইজ সিস্টেমের সুরক্ষা নিশ্চিত করতে পারবে না।`,
    keyPoints: [
      {
        title: "Theoretical Foundation & Working Mechanism",
        explanation: `টপিকটির মূল মেকানিজম, আর্কিটেকচার এবং নেটওয়ার্ক বা ওএস স্তরে এটি কীভাবে কার্যকর হয় তা পরিষ্কারভাবে অনুধাবন করা।`
      },
      {
        title: "Defensive Implementation & Standard Protocols",
        explanation: `ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্রোটোকল, শক্তিশালী ক্রিপ্টোগ্রাফিক অ্যালগরিদম ও আধুনিক টুলসের সাহায্যে এই সুরক্ষা ব্যবস্থা সিস্টেমে বাস্তবায়িত করা।`
      },
      {
        title: "Threat Mitigation & Best Practices",
        explanation: `সাইবার আক্রমণকারীদের এক্সপ্লয়েট ও সামাজিক প্রকৌশল কৌশল ব্যর্থ করে দিয়ে সিস্টেমের Confidentiality, Integrity ও Availability অটুট রাখা।`
      }
    ],
    realWorldAnalogy: profile.defaultAnalogy,
    formulaOrRule: profile.defaultFormula,
    commonMistakes: profile.defaultMistake,
    examTips: profile.defaultExamTip
  };
}
