// ============================================================================
// wampGuideData.js - Bilingual Data Store for WampServer 3.4.0 & VC++ Guide
// Author: Sukanta Hui (Coder & AccoTax)
// ============================================================================

export const translations = {
  en: {
    heroBadge: "Beginner-Friendly Production Guide • Windows 11 / 10 / 8.1 / 7 (64-Bit)",
    heroTitle: "WampServer 3.4.0 & Visual C++ Runtimes",
    heroTitleHighlight: "The Complete Beginner's Manual",
    heroDesc:
      "Never installed a local web server before? Don't worry! This comprehensive guide walks you through every single click, explains what Visual C++ Redistributable packages are and why they are mandatory, and helps you launch your first local PHP & MySQL website with zero headache.",
    authorRole: "Software Developer",
    authorOrg: "Coder & AccoTax • Technical Architecture & System Integration",
    authorVerified: "100% Tested Beginner Walkthrough",

    btnDownloadWamp: "Download WampServer 3.4.0 (x64)",
    btnDownloadWampSub: "Direct Official EXE • 64-Bit (~600 MB)",
    btnStartGuide: "Start Beginner Guide",
    btnStartGuideSub: "Understand WAMP & VC++ First",
    btnAutomatedScript: "1-Click Automated VC++ Script",
    btnAutomatedScriptSub: "Install all 10 runtimes in 1 minute",

    ch1Tag: "Chapter 1: WAMP Fundamentals",
    ch1Title: "What is WampServer and How Does It Work?",
    ch1Subtitle:
      "If you are new to web development, here is a simple breakdown of what WampServer actually does on your computer.",

    wampWTitle: "Windows",
    wampWDesc: "Your host operating system (Windows 10, Windows 11, or Windows 7/8.1 64-bit).",
    wampWRole: "The Operating System",
    wampATitle: "Apache 2.4",
    wampADesc:
      "The web server program that listens for web requests when you open http://localhost and sends web pages to your browser.",
    wampARole: "Web Server Engine",
    wampMTitle: "MySQL & MariaDB",
    wampMDesc:
      "Relational database engines used to store your website users, passwords, e-commerce products, and blog posts.",
    wampMRole: "Database Engines",
    wampPTitle: "PHP (5.6 - 8.3+)",
    wampPDesc:
      "The programming language processor that executes your server-side PHP scripts before Apache sends the HTML to the user.",
    wampPRole: "Programming Language",

    explainerBadge: "Layperson's Guide",
    explainerTitle: 'Why are "Visual C++ Redistributable Packages" Mandatory?',
    explainerText:
      "Think of Apache and PHP as software applications built using Microsoft's Visual Studio C++ compiler. To run properly, they require shared code libraries (called Dynamic Link Libraries or .dll files like MSVCR110.dll, MSVCR120.dll, VCRUNTIME140.dll).",
    analogyTitle: "A Simple Analogy:",
    analogyText:
      "Buying a car (WampServer) without an engine battery (Visual C++ Runtimes) means the car won't start. Microsoft provides these runtime packages for free, but they do not all come pre-installed in Windows by default. That is why we must install them first!",

    rule1Title: "Install VC++ Runtimes FIRST",
    rule1Text:
      "Never install WampServer before installing the Visual C++ packages. If you install WampServer first, it will fail to start services and give cryptic DLL errors.",
    rule2Title: "Install BOTH 32-bit (x86) & 64-bit (x64)",
    rule2Text:
      "Even though your Windows is 64-bit, internal components and PHP extensions can be 32-bit. You must install both architectures for all years (2008 to 2022).",
    rule3Title: 'Always "Run as Administrator"',
    rule3Text:
      "WampServer sets up Windows system services (like Apache Service and MySQL Service). Windows will block these services unless you right-click and choose Run as administrator.",

    step0Tag: "Step 0: Check Your System",
    step0Title: "Select Target Windows Operating System",
    step0Subtitle:
      "Choose your Windows version to view specific prerequisite dependencies, kernel requirements, and service pack instructions.",
    bitnessCheck:
      'Not sure if your Windows is 64-bit? Press Win + Pause/Break or open Settings → System → About and look under "System type". (WampServer 3.4.0 x64 requires a 64-bit operating system, x64-based processor).',

    vcTag: "Mandatory Prerequisites",
    vcTitle: "Visual C++ Redistributable Package Matrix",
    vcSubtitle:
      "Download and install these packages one by one, or use our automated 1-click script below. Each package takes only ~15 seconds to install.",
    goldenRuleTitle: "Crucial Reminder for 64-Bit Windows Users",
    goldenRuleText:
      "You MUST install BOTH the 32-bit (x86) and 64-bit (x64) packages for each release (2008, 2010, 2012, 2013, and 2015-2022). That is 10 small installers in total.",

    searchPlaceholder: "Search runtime by name, year, or build (e.g. 2015, x64, 2012)...",
    filterAll: "All Packages (10)",
    filterX64: "64-Bit (x64)",
    filterX86: "32-Bit (x86)",
    filterRecent: "2015 - 2022",
    filterLegacy: "2008 - 2013",
    markAllBtn: "Mark All Installed",
    resetBtn: "Reset",

    diagTitle: "Verify Your VC++ Installation with check_vcredist.exe",
    diagDesc:
      "Not sure if you missed any package? Download this lightweight official utility from Aviatechno. Right-click and run it as Administrator — it will scan your entire Windows registry and display an instant report showing whether any packages are missing.",
    diagDownload: "Download check_vcredist.exe",

    scriptTag: "Beginner Fast Track",
    scriptTitle: "Automated 1-Click PowerShell VC++ Installer",
    scriptSubtitle:
      "Don't want to download and click 10 separate installers manually? Use this beginner-friendly PowerShell script to automatically download and silently install all 10 Visual C++ Redistributable packages in under 2 minutes.",
    scriptHowTo: "How to Run This Script (3 Easy Steps for Beginners):",
    scriptStep1:
      'Press Win + X on your keyboard → click "Terminal (Admin)" or "PowerShell (Admin)". (Click "Yes" on the Windows prompt).',
    scriptStep2: 'Click the "Copy Script" button below.',
    scriptStep3:
      "Right-click anywhere inside the PowerShell window to paste, then press Enter. Wait 1-2 minutes until you see the green success message!",

    wizardTag: "Complete Roadmap",
    wizardTitle: "Step-by-Step Installation Walkthrough",
    wizardSubtitle:
      "Follow these 6 detailed stages with exact button clicks, path recommendations, and visual dialog walkthroughs.",

    firstProjTag: "Chapter 3: Practical Coding",
    firstProjTitle: 'Create Your First "Hello World" Website',
    firstProjSubtitle:
      "Now that WampServer is running green, follow these 4 simple steps to write and execute your very first PHP script.",

    troubleshootTag: "Diagnostics & Fixes",
    troubleshootTitle: 'Beginner\'s "Don\'t Panic" Troubleshooting Matrix',
    troubleshootSubtitle:
      "Encountered an issue? Here are the most common beginner errors and exact step-by-step solutions to fix them.",

    rootPassTag: "Chapter 4: MySQL Security & Credentials",
    rootPassTitle: "How to Change MySQL Default Root Password to 'sukantahui'",
    rootPassSubtitle:
      "By default, WampServer installs MySQL with username 'root' and a BLANK (empty) password. Follow this step-by-step guide to set your secure password to 'sukantahui' and synchronize phpMyAdmin so you never get Error #1045.",
    rootPassDefaultNote: "Default WAMP Credential: Username = root | Password = (leave empty/blank)",
    rootPassNewNote: "New Updated Credential: Username = root | Password = sukantahui",
    rootMethod1Tab: "Method 1: MySQL Console (Recommended)",
    rootMethod2Tab: "Method 2: phpMyAdmin GUI",
    rootMethod3Tab: "Step 3: Sync config.inc.php",
    rootMethod4Tab: "Step 4: PHP Connection Code",

    drawerTitle: "Beginner Installation Checklist",
    drawerReadiness: "Overall Readiness",
    drawerVcHeader: "Visual C++ Runtimes (10 Items)",
    drawerStepHeader: "WampServer Milestones (6 Stages)",
    drawerReset: "Reset All",
    drawerExport: "Export / Print Summary",

    footerDesc:
      "An ultra-detailed, beginner-friendly guide designed to simplify local web stack installations, eliminate Visual C++ runtime errors, and empower aspiring developers.",
    footerDownloads: "Official Downloads",
    footerDocs: "Core Stack Documentation",
    footerCopyright:
      "Documentation curated by Sukanta Hui (Coder & AccoTax). All trademarks and software names are the property of their respective owners.",
  },

  bn: {
    heroBadge: "সহজ ভাষায় সম্পূর্ণ ইনস্টলেশন গাইড • Windows 11 / 10 / 8.1 / 7 (৬৪-বিট)",
    heroTitle: "WampServer 3.4.0 ও Visual C++ রানটাইম",
    heroTitleHighlight: "নতুনদের জন্য সহজ ও সম্পূর্ণ নির্দেশিকা",
    heroDesc:
      "আগে কখনো লোকাল ওয়েব সার্ভার ইনস্টল করেননি? কোনো চিন্তা নেই! এই সহায়িকায় প্রতিটি ক্লিকের বিশদ বিবরণ, Visual C++ প্যাকেজ কেন অত্যন্ত জরুরি এবং কীভাবে প্রথম PHP ও MySQL ওয়েবসাইট চালু করবেন — তা সহজ বাংলায় তুলে ধরা হয়েছে।",
    authorRole: "সফটওয়্যার ডেভেলপার",
    authorOrg: "কোডার অ্যান্ড অ্যাকোট্যাক্স (Coder & AccoTax) • সিস্টেম আর্কিটেকচার ও সফটওয়্যার বিভাগ",
    authorVerified: "১০০% পরীক্ষিত ও প্র্যাকটিক্যাল গাইড",

    btnDownloadWamp: "WampServer 3.4.0 (x64) ডাউনলোড",
    btnDownloadWampSub: "অফিসিয়াল ডাইরেক্ট EXE • ৬৪-বিট (~৬০০ MB)",
    btnStartGuide: "টিউটোরিয়াল শুরু করুন",
    btnStartGuideSub: "WAMP ও VC++ সম্পর্কে আগে জানুন",
    btnAutomatedScript: "১-ক্লিকে অটোমেটিক VC++ স্ক্রিপ্ট",
    btnAutomatedScriptSub: "মাত্র ১ মিনিটে ১০টি প্যাকেজ ইনস্টল করুন",

    ch1Tag: "অধ্যায় ১: WAMP পরিচিতি",
    ch1Title: "WampServer কী এবং এটি কীভাবে কাজ করে?",
    ch1Subtitle:
      "লোকাল ওয়েব ডেভেলপমেন্টে একদম নতুন হলে আপনার কম্পিউটারে WampServer কীভাবে কাজ করে তা জেনে নেওয়া যাক।",

    wampWTitle: "Windows (উইন্ডোজ)",
    wampWDesc: "আপনার কম্পিউটারের অপারেটিং সিস্টেম (Windows 10, Windows 11, অথবা 8.1/7 ৬৪-বিট)।",
    wampWRole: "মূল অপারেটিং সিস্টেম",
    wampATitle: "Apache 2.4 (অ্যাপাচি)",
    wampADesc:
      "একটি ওয়েব সার্ভার প্রোগ্রাম যা ব্রাউজারে http://localhost লিখলে আপনার ওয়েবসাইটটি ব্রাউজারে প্রদর্শন করে।",
    wampARole: "ওয়েব সার্ভার ইঞ্জিন",
    wampMTitle: "MySQL ও MariaDB",
    wampMDesc:
      "একটি রিলেশনাল ডেটাবেস সিস্টেম যেখানে আপনার ওয়েবসাইটের ইউজার, পাসওয়ার্ড ও ডেটা জমা থাকে।",
    wampMRole: "ডেটাবেস ইঞ্জিন",
    wampPTitle: "PHP (৫.৬ - ৮.৩+)",
    wampPDesc:
      "একটি সার্ভার-সাইড প্রোগ্রামিং ল্যাঙ্গুয়েজ প্রসেসর যা আপনার লেখা পিএইচপি কোড এক্সিকিউট করে এইচটিএমএল আউটপুট দেয়।",
    wampPRole: "প্রোগ্রামিং ল্যাঙ্গুয়েজ",

    explainerBadge: "নতুনদের জন্য ব্যাখ্যা",
    explainerTitle: '"Visual C++ Redistributable প্যাকেজ" কেন ১০০% বাধ্যতামূলক?',
    explainerText:
      "Apache এবং PHP মূলত মাইক্রোসফটের Visual Studio C++ কম্পাইলার দিয়ে তৈরি। এগুলো উইন্ডোজে রান করার জন্য কিছু সহায়ক কোড লাইব্রেরি (.dll ফাইল যেমন: MSVCR110.dll, MSVCR120.dll, VCRUNTIME140.dll) প্রয়োজন হয়।",
    analogyTitle: "একটি সহজ উদাহরণ:",
    analogyText:
      "একটি নতুন গাড়ি (WampServer) কিনলেন কিন্তু গাড়িতে ব্যাটারি (Visual C++ Runtime) নেই — তাহলে গাড়ি স্টার্ট হবে না। মাইক্রোসফট এই রানটাইম ফাইলগুলো ফ্রিতে সরবরাহ করে, কিন্তু উইন্ডোজে এগুলো আগে থেকে সব ইনস্টল থাকে না। তাই WampServer চালু করার আগেই এগুলো ইনস্টল করতে হয়!",

    rule1Title: "আগে VC++ রানটাইম ইনস্টল করুন",
    rule1Text:
      "কখনোই Visual C++ প্যাকেজ ইনস্টল করার আগে WampServer ইনস্টল করবেন না। আগে WAMP দিলে বিভিন্ন DLL Missing এরর আসবে এবং সার্ভার লাল হয়ে থাকবে।",
    rule2Title: "৩২-বিট (x86) ও ৬৪-বিট (x64) দুটোই ইনস্টল করুন",
    rule2Text:
      "আপনার উইন্ডোজ ৬৪-বিট হলেও অভ্যন্তরীণ PHP মডিউলগুলো চালানোর জন্য ২০০৮ থেকে ২০২২ পর্যন্ত সকল সালের ৩২-বিট ও ৬৪-বিট উভয় প্যাকেজই প্রয়োজন।",
    rule3Title: 'সর্বদা "Run as Administrator" করুন',
    rule3Text:
      "WampServer উইন্ডোজের ব্যাকগ্রাউন্ড সিস্টেম সার্ভিস (Apache & MySQL Service) তৈরি করে। তাই ইনস্টলার ও WampServer আইকনটি রাইট-ক্লিক করে Run as administrator দিয়ে চালু করতে হবে।",

    step0Tag: "ধাপ ০: আপনার কম্পিউটার যাচাই করুন",
    step0Title: "আপনার উইন্ডোজ অপারেটিং সিস্টেম নির্বাচন করুন",
    step0Subtitle:
      "আপনার উইন্ডোজ সংস্করণ বেছে নিন এবং প্রয়োজনীয় নির্ভরতা ও সার্ভিস প্যাক সম্পর্কে জানুন।",
    bitnessCheck:
      'আপনার উইন্ডোজ ৬৪-বিট কি না জানতে কিবোর্ডে Win + Pause/Break চাপুন অথবা Settings → System → About এ গিয়ে "System type" দেখুন। (WampServer 3.4.0 x64 এর জন্য 64-bit operating system প্রয়োজন)।',

    vcTag: "আবশ্যকীয় পূর্বশর্ত",
    vcTitle: "Visual C++ Redistributable প্যাকেজ তালিকা",
    vcSubtitle:
      "নিচের তালিকা থেকে একটি একটি করে ডাউনলোড করে ইনস্টল করুন, অথবা আমাদের ১-ক্লিক পাওয়ারশেল স্ক্রিপ্ট ব্যবহার করুন। প্রতিটি প্যাকেজে মাত্র ১৫ সেকেন্ড সময় লাগে।",
    goldenRuleTitle: "৬৪-বিট উইন্ডোজ ব্যবহারকারীদের জন্য অত্যন্ত জরুরি নিয়ম",
    goldenRuleText:
      "আপনাকে প্রতিটি সালের জন্য ৩২-বিট (x86) এবং ৬৪-বিট (x64) উভয় প্যাকেজই ইনস্টল করতে হবে (মোট ১০টি ছোট ইনস্টলার ফাইল)।",

    searchPlaceholder: "প্যাকেজের নাম, সাল বা বিল্ড দিয়ে খুঁজুন (যেমন: 2015, x64, 2012)...",
    filterAll: "সকল প্যাকেজ (১০টি)",
    filterX64: "৬৪-বিট (x64)",
    filterX86: "৩২-বিট (x86)",
    filterRecent: "২০১৫ - ২০২২",
    filterLegacy: "২০০৮ - ২০১৩",
    markAllBtn: "সব ইনস্টল সম্পন্ন চিহ্নিত করুন",
    resetBtn: "রিসেট",

    diagTitle: "check_vcredist.exe দিয়ে আপনার কম্পিউটারের রানটাইম যাচাই করুন",
    diagDesc:
      "কোনো প্যাকেজ মিস হয়ে গেছে কি না নিশ্চিত নন? Aviatechno-এর এই ছোট ডায়াগনস্টিক টুলটি ডাউনলোড করুন। রাইট-ক্লিক করে Administrator হিসেবে চালান — এটি আপনার কম্পিউটার স্ক্যান করে একটি পরিষ্কার রিপোর্ট দেবে।",
    diagDownload: "check_vcredist.exe ডাউনলোড করুন",

    scriptTag: "নতুনদের দ্রুত ইনস্টলেশন পদ্ধতি",
    scriptTitle: "১-ক্লিকে PowerShell দিয়ে সকল VC++ ইনস্টল করার স্ক্রিপ্ট",
    scriptSubtitle:
      "১০টি ফাইল আলাদা আলাদা ডাউনলোড ও ইনস্টল করতে সময় নষ্ট করতে না চাইলে নিচের PowerShell স্ক্রিপ্টটি ব্যবহার করুন। এটি ২ মিনিটে স্বয়ংক্রিয়ভাবে সব প্যাকেজ ইনস্টল করে দেবে।",
    scriptHowTo: "কীভাবে স্ক্রিপ্টটি চালাবেন (নতুনদের জন্য সহজ ৩টি ধাপ):",
    scriptStep1:
      'কিবোর্ডে Win + X চাপুন → "Terminal (Admin)" বা "PowerShell (Admin)" অপশনে ক্লিক করুন (উইন্ডোজের "Yes" বাটনে ক্লিক করুন)।',
    scriptStep2: 'নিচের "স্ক্রিপ্ট কপি করুন" বাটনে ক্লিক করুন।',
    scriptStep3:
      "PowerShell উইন্ডোর ভেতরে রাইট-ক্লিক করলেই কোড পেস্ট হয়ে যাবে, এরপর কিবোর্ডে Enter চাপুন। ১-২ মিনিট অপেক্ষা করুন যতক্ষণ না সবুজ বার্তা আসে!",

    wizardTag: "ধাপে ধাপে ইনস্টলেশন গাইড",
    wizardTitle: "WampServer সেটআপ উইজার্ডের সম্পূর্ণ নির্দেশিকা",
    wizardSubtitle:
      "নিচের ৬টি পর্যায় নিখুঁতভাবে অনুসরণ করুন। প্রতিটি স্ক্রিনে কী ক্লিক করতে হবে তা বিস্তারিত দেখানো হলো।",

    firstProjTag: "অধ্যায় ৩: হাতে-কলমে কোডিং",
    firstProjTitle: 'আপনার প্রথম "Hello World" ওয়েবসাইট তৈরি করুন',
    firstProjSubtitle:
      "WampServer সবুজ আইকন দেখাচ্ছে? চমৎকার! এবার নিচের ৪টি সহজ ধাপে আপনার প্রথম PHP স্ক্রিপ্ট লিখে রান করান।",

    troubleshootTag: "সমস্যা ও সমাধান",
    troubleshootTitle: 'নতুনদের জন্য "Don\'t Panic" সমাধান কেন্দ্র',
    troubleshootSubtitle:
      "কোনো ত্রুটি বা এরর দেখা দিয়েছে? নতুনদের সবচেয়ে পরিচিত সমস্যাগুলোর দ্রুত সমাধান নিচে দেওয়া হলো।",

    rootPassTag: "অধ্যায় ৪: MySQL সিকিউরিটি ও পাসওয়ার্ড",
    rootPassTitle: "MySQL-এর ডিফল্ট root পাসওয়ার্ড পরিবর্তন করে 'sukantahui' করার সহজ নিয়ম",
    rootPassSubtitle:
      "WampServer ইনস্টল করার পর MySQL-এর ডিফল্ট ইউজারনেম থাকে 'root' এবং পাসওয়ার্ড থাকে সম্পূর্ণ খালি (Blank)। নিচের সহজ ধাপগুলো অনুসরণ করে আপনার পাসওয়ার্ড 'sukantahui' সেট করুন এবং phpMyAdmin সিনক্রোনাইজ করুন যাতে কোনো Error #1045 না আসে।",
    rootPassDefaultNote: "WAMP-এর ডিফল্ট লগইন: ইউজারনেম = root | পাসওয়ার্ড = (ফাঁকা রাখুন / কোনো পাসওয়ার্ড নেই)",
    rootPassNewNote: "নতুন নির্ধারিত লগইন: ইউজারনেম = root | পাসওয়ার্ড = sukantahui",
    rootMethod1Tab: "পদ্ধতি ১: MySQL কনসোল (সবচেয়ে দ্রুত ও নির্ভরযোগ্য)",
    rootMethod2Tab: "পদ্ধতি ২: phpMyAdmin ওয়েব ইন্টারফেস",
    rootMethod3Tab: "ধাপ ৩: config.inc.php সিনক্রোনাইজেশন",
    rootMethod4Tab: "ধাপ ৪: PHP ডেটাবেস সংযোগ কোড",

    drawerTitle: "ইনস্টলেশন চেকলিস্ট",
    drawerReadiness: "সামগ্রিক প্রস্তুতি",
    drawerVcHeader: "Visual C++ রানটাইম (১০টি)",
    drawerStepHeader: "WampServer ইনস্টলেশন পর্যায় (৬টি ধাপ)",
    drawerReset: "সব রিসেট করুন",
    drawerExport: "সারাংশ এক্সপোর্ট / প্রিন্ট করুন",

    footerDesc:
      "নতুন শিক্ষার্থী ও ডেভেলপারদের লোকাল ওয়েব ডেভেলপমেন্ট শেখার সুবিধার্থে এবং Visual C++ এরর দূর করতে সুকান্ত হুই (Coder & AccoTax) কর্তৃক প্রণীত বিশদ নির্দেশিকা।",
    footerDownloads: "অফিসিয়াল ডাউনলোডসমূহ",
    footerDocs: "অফিসিয়াল ডকুমেন্টেশন",
    footerCopyright:
      "নির্দেশনা প্রস্তুত করেছেন সুকান্ত হুই (Coder & AccoTax)। সকল ট্রেডমার্ক ও সফটওয়্যার সংশ্লিষ্ট প্রতিষ্ঠানের স্বত্ব।",
  },
};

export const vcPackages = [
  {
    id: "vc2008_x86",
    name: "Visual C++ 2008 SP1",
    arch: "x86",
    archLabel: "32-Bit (x86)",
    year: 2008,
    version: "v9.0.30729.6161 (MFC Security Update)",
    dll: "MSVCR90.dll, MSVCP90.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/1/1/1/1116b75c-9ec3-481a-a3c8-1777b5381140/vcredist_x86.exe",
    notes_en: "Required for older PHP extensions and legacy modules.",
    notes_bn: "পুরোনো PHP এক্সটেনশন ও লিগ্যাসি মডিউলের জন্য প্রয়োজন।",
  },
  {
    id: "vc2008_x64",
    name: "Visual C++ 2008 SP1",
    arch: "x64",
    archLabel: "64-Bit (x64)",
    year: 2008,
    version: "v9.0.30729.6161 (MFC Security Update)",
    dll: "MSVCR90.dll, MSVCP90.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/d/2/4/d242c3fb-da39-4542-979b-f6914713e33c/vcredist_x64.exe",
    notes_en: "Required for 64-bit runtime base stability.",
    notes_bn: "৬৪-বিট সিস্টেমের মূল রানটাইম স্থিতিশীলতার জন্য প্রয়োজন।",
  },
  {
    id: "vc2010_x86",
    name: "Visual C++ 2010 SP1",
    arch: "x86",
    archLabel: "32-Bit (x86)",
    year: 2010,
    version: "v10.0.40219.455",
    dll: "MSVCR100.dll, MSVCP100.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x86.exe",
    notes_en: "Fixes MSVCR100.dll missing errors on Apache/PHP modules.",
    notes_bn: "Apache এবং PHP-এর MSVCR100.dll এরর সমাধান করে।",
  },
  {
    id: "vc2010_x64",
    name: "Visual C++ 2010 SP1",
    arch: "x64",
    archLabel: "64-Bit (x64)",
    year: 2010,
    version: "v10.0.40219.455",
    dll: "MSVCR100.dll, MSVCP100.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x64.exe",
    notes_en: "Core 64-bit library dependency.",
    notes_bn: "৬৪-বিট সার্ভার সার্ভিসের জন্য আবশ্যক।",
  },
  {
    id: "vc2012_x86",
    name: "Visual C++ 2012 Update 4",
    arch: "x86",
    archLabel: "32-Bit (x86)",
    year: 2012,
    version: "v11.0.61030.0",
    dll: "MSVCR110.dll, MSVCP110.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F92E/vcredist_x86.exe",
    notes_en: "Resolves MSVCR110.dll errors in Apache 2.4 builds.",
    notes_bn: "Apache 2.4-এ MSVCR110.dll missing এরর দূর করে।",
  },
  {
    id: "vc2012_x64",
    name: "Visual C++ 2012 Update 4",
    arch: "x64",
    archLabel: "64-Bit (x64)",
    year: 2012,
    version: "v11.0.61030.0",
    dll: "MSVCR110.dll, MSVCP110.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F92E/vcredist_x64.exe",
    notes_en: "Required for 64-bit Apache HTTP services.",
    notes_bn: "৬৪-বিট Apache HTTP সেবার জন্য আবশ্যক।",
  },
  {
    id: "vc2013_x86",
    name: "Visual C++ 2013",
    arch: "x86",
    archLabel: "32-Bit (x86)",
    year: 2013,
    version: "v12.0.40664.0",
    dll: "MSVCR120.dll, MSVCP120.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x86.exe",
    notes_en: "Fixes MSVCR120.dll missing errors on PHP 5.6 & 7.0.",
    notes_bn: "PHP 5.6 ও 7.0-এ MSVCR120.dll মিসিং এরর ফিক্স করে।",
  },
  {
    id: "vc2013_x64",
    name: "Visual C++ 2013",
    arch: "x64",
    archLabel: "64-Bit (x64)",
    year: 2013,
    version: "v12.0.40664.0",
    dll: "MSVCR120.dll, MSVCP120.dll",
    category: "legacy",
    downloadUrl:
      "https://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x64.exe",
    notes_en: "Critical for MySQL & MariaDB engine daemons.",
    notes_bn: "MySQL ও MariaDB ডেটাবেস সার্ভিসের জন্য আবশ্যক।",
  },
  {
    id: "vc2015_2022_x86",
    name: "Visual C++ 2015-2022 (Combined)",
    arch: "x86",
    archLabel: "32-Bit (x86)",
    year: 2022,
    version: "v14.40+ (Latest Official Build)",
    dll: "VCRUNTIME140.dll, MSVCP140.dll, VCRUNTIME140_1.dll",
    category: "recent",
    downloadUrl: "https://aka.ms/vs/17/release/vc_redist.x86.exe",
    notes_en: "Mandatory for PHP 7.4, 8.0, 8.1, 8.2, 8.3 and modern extensions.",
    notes_bn: "আধুনিক PHP 7.4, 8.0, 8.1, 8.2, 8.3 এবং সকল এক্সটেনশনের জন্য আবশ্যক।",
  },
  {
    id: "vc2015_2022_x64",
    name: "Visual C++ 2015-2022 (Combined)",
    arch: "x64",
    archLabel: "64-Bit (x64)",
    year: 2022,
    version: "v14.40+ (Latest Official Build)",
    dll: "VCRUNTIME140.dll, MSVCP140.dll, VCRUNTIME140_1.dll",
    category: "recent",
    downloadUrl: "https://aka.ms/vs/17/release/vc_redist.x64.exe",
    notes_en: "Mandatory for WampServer 3.4.0 core 64-bit engine & PHP 8.x.",
    notes_bn: "WampServer 3.4.0 কোর ইঞ্জিন এবং আধুনিক PHP 8.x চালানোর জন্য অত্যাবশ্যক।",
  },
];

export const osData = {
  win11: {
    id: "win11",
    label: "Windows 11 (64-Bit)",
    title_en: "Windows 11 (64-Bit) — Modern Kernel",
    title_bn: "Windows 11 (৬৪-বিট) — লেটেস্ট কার্নেল",
    desc_en:
      "Fully compatible out of the box with WampServer 3.4.0 x64. Requires standard Visual C++ runtime installation.",
    desc_bn:
      "WampServer 3.4.0 x64 এর সাথে সম্পূর্ণ সামঞ্জস্যপূর্ণ। শুধুমাত্র স্ট্যান্ডার্ড Visual C++ রানটাইমগুলো ইনস্টল করলেই চলবে।",
    reqs_en: [
      { text: "64-bit CPU & Architecture", icon: "bi-cpu" },
      { text: "Run installer as Administrator", icon: "bi-shield-check" },
      { text: "All 10 VC++ Packages (x86 & x64)", icon: "bi-boxes" },
      { text: "No Windows KB patches needed", icon: "bi-check-circle" },
    ],
    reqs_bn: [
      { text: "৬৪-বিট প্রসেসর ও অপারেটিং সিস্টেম", icon: "bi-cpu" },
      { text: "অ্যাডমিনিস্ট্রেটর (Run as Administrator) হিসেবে চালু করুন", icon: "bi-shield-check" },
      { text: "১০টি VC++ প্যাকেজ (x86 ও x64)", icon: "bi-boxes" },
      { text: "অতিরিক্ত উইন্ডোজ প্যাচ প্রয়োজন নেই", icon: "bi-check-circle" },
    ],
  },
  win10: {
    id: "win10",
    label: "Windows 10 (64-Bit)",
    title_en: "Windows 10 (64-Bit) — Build 1909 to 22H2+",
    title_bn: "Windows 10 (৬৪-বিট) — বিল্ড ১৯০৯ থেকে ২২H২+",
    desc_en:
      "Fully certified for WampServer 3.4.0 x64. Standard installation with all VC++ runtimes.",
    desc_bn:
      "WampServer 3.4.0 x64 এর জন্য সম্পূর্ণ উপযুক্ত। সকল VC++ রানটাইম ইনস্টল করে সহজে ব্যবহার করা যায়।",
    reqs_en: [
      { text: "64-bit Operating System", icon: "bi-cpu" },
      { text: "Disable IIS / Port 80 conflicts", icon: "bi-hdd-network" },
      { text: "All 10 VC++ Packages (x86 & x64)", icon: "bi-boxes" },
      { text: "Run as Administrator", icon: "bi-shield-lock" },
    ],
    reqs_bn: [
      { text: "৬৪-বিট অপারেটিং সিস্টেম", icon: "bi-cpu" },
      { text: "IIS / পোর্ট ৮০ কনফ্লিক্ট বন্ধ রাখুন", icon: "bi-hdd-network" },
      { text: "১০টি VC++ প্যাকেজ (x86 ও x64)", icon: "bi-boxes" },
      { text: "Administrator হিসেবে সেটআপ করুন", icon: "bi-shield-lock" },
    ],
  },
  win8: {
    id: "win8",
    label: "Windows 8.1 (64-Bit)",
    title_en: "Windows 8.1 / Windows 8 (64-Bit)",
    title_bn: "Windows 8.1 / Windows 8 (৬৪-বিট)",
    desc_en:
      "Requires Universal C Runtime (KB2999226) and Windows Update KB2919355 before Visual C++ 2015-2022 will install properly.",
    desc_bn:
      "Visual C++ ২০১৫-২০২২ প্যাকেজ চলার আগে KB2919355 এবং Universal C Runtime (KB2999226) উইন্ডোজ আপডেট থাকতে হবে।",
    reqs_en: [
      { text: "Install KB2919355 Update Rollup first", icon: "bi-exclamation-triangle" },
      { text: "Install Universal C Runtime (KB2999226)", icon: "bi-wrench-adjustable" },
      { text: "All 10 VC++ Packages (x86 & x64)", icon: "bi-boxes" },
      { text: "Reboot after installing updates", icon: "bi-arrow-clockwise" },
    ],
    reqs_bn: [
      { text: "প্রথমে KB2919355 আপডেট ইনস্টল করুন", icon: "bi-exclamation-triangle" },
      { text: "Universal C Runtime (KB2999226) দিন", icon: "bi-wrench-adjustable" },
      { text: "১০টি VC++ প্যাকেজ (x86 ও x64)", icon: "bi-boxes" },
      { text: "আপডেট শেষে কম্পিউটার রিস্টার্ট করুন", icon: "bi-arrow-clockwise" },
    ],
  },
  win7: {
    id: "win7",
    label: "Windows 7 SP1 (64-Bit)",
    title_en: "Windows 7 Service Pack 1 (SP1) (64-Bit)",
    title_bn: "Windows 7 Service Pack 1 (SP1) (৬৪-বিট)",
    desc_en:
      "Requires Windows 7 Service Pack 1, KB2999226 (Universal C Runtime), and KB3063858 (SHA-2 code signing support) before runtime installation.",
    desc_bn:
      "উইন্ডোজ ৭ এ Service Pack 1 (SP1), SHA-2 আপডেট (KB3063858) এবং Universal C Runtime (KB2999226) আবশ্যিকভাবে লাগবে।",
    reqs_en: [
      { text: "Service Pack 1 (SP1) is Mandatory", icon: "bi-exclamation-triangle" },
      { text: "KB3063858 (SHA-2 Signing Update)", icon: "bi-shield-check" },
      { text: "KB2999226 (Universal CRT)", icon: "bi-wrench-adjustable" },
      { text: "All 10 VC++ Packages (x86 & x64)", icon: "bi-boxes" },
    ],
    reqs_bn: [
      { text: "Service Pack 1 (SP1) বাধ্যতামূলক", icon: "bi-exclamation-triangle" },
      { text: "KB3063858 (SHA-2 সাইনিং আপডেট)", icon: "bi-shield-check" },
      { text: "KB2999226 (Universal CRT)", icon: "bi-wrench-adjustable" },
      { text: "১০টি VC++ প্যাকেজ (x86 ও x64)", icon: "bi-boxes" },
    ],
  },
  winserver: {
    id: "winserver",
    label: "Windows Server (2016-2025)",
    title_en: "Windows Server (2016, 2019, 2022, 2025)",
    title_bn: "Windows Server (২০১৬, ২০১৯, ২০২২, ২০২৫)",
    desc_en:
      "Enterprise server environments. Make sure IIS (World Wide Web Publishing Service) is stopped/disabled if hosting on port 80.",
    desc_bn:
      "সার্ভার এনভায়রনমেন্ট। পোর্ট ৮০ তে WAMP চালাতে চাইলে উইন্ডোজ IIS সার্ভিস বন্ধ করে নিন।",
    reqs_en: [
      { text: "Disable or rebind IIS Web Service", icon: "bi-server" },
      { text: "Configure Windows Firewall for Port 80/443", icon: "bi-shield-shaded" },
      { text: "All 10 VC++ Packages (x86 & x64)", icon: "bi-boxes" },
      { text: "Run as Domain / Local Administrator", icon: "bi-key" },
    ],
    reqs_bn: [
      { text: "IIS ওয়েব সার্ভিস ডিজেবল করুন", icon: "bi-server" },
      { text: "ফায়ারওয়ালে পোর্ট ৮০/৪৪৩ কনফিগার করুন", icon: "bi-shield-shaded" },
      { text: "১০টি VC++ প্যাকেজ (x86 ও x64)", icon: "bi-boxes" },
      { text: "Administrator প্রিভিলেজে রান করুন", icon: "bi-key" },
    ],
  },
};

export const stepsList = [
  {
    id: "check-step-1",
    label_en: "Stage 1: Pre-Installation Port Check",
    label_bn: "পর্যায় ১: পোর্ট ও এনভায়রনমেন্ট চেক",
  },
  {
    id: "check-step-2",
    label_en: "Stage 2: Visual C++ Runtimes (All 10)",
    label_bn: "পর্যায় ২: ১০টি Visual C++ রানটাইম ইনস্টল",
  },
  {
    id: "check-step-3",
    label_en: "Stage 3: Download WampServer 3.4.0 (x64)",
    label_bn: "পর্যায় ৩: WampServer 3.4.0 (x64) ডাউনলোড",
  },
  {
    id: "check-step-4",
    label_en: "Stage 4: Run Wizard as Admin (Screens 1-9)",
    label_bn: "পর্যায় ৪: অ্যাডমিন হিসেবে উইজার্ড রান (স্ক্রিন ১-৯)",
  },
  {
    id: "check-step-5",
    label_en: "Stage 5: Verify Green System Tray Icon",
    label_bn: "পর্যায় ৫: ট্রে আইকন সবুজ (Green) হওয়া যাচাই",
  },
  {
    id: "check-step-6",
    label_en: "Stage 6: Test Localhost & phpMyAdmin",
    label_bn: "পর্যায় ৬: Localhost ও phpMyAdmin পরীক্ষা",
  },
];

export const psBatchScript = `# ==============================================================================
# Script: Automated Visual C++ Redistributables Batch Installer for WampServer
# Author: Sukanta Hui (Coder & AccoTax)
# Target: Windows 64-bit (Installs both x86 and x64 runtimes)
# ==============================================================================

# Ensure Running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Warning "Please re-run this script in PowerShell as Administrator!"
    Exit
}

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  Starting VC++ Redistributables Batch Installation for WAMP" -ForegroundColor Green
Write-Host "  Created by Sukanta Hui | Coder & AccoTax" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

$TempDir = "$env:TEMP\\VCRedist_Installers"
if (!(Test-Path $TempDir)) { New-Item -ItemType Directory -Path $TempDir | Out-Null }

$Packages = @(
    @{ Name = "VC++ 2008 SP1 (x86)"; Url = "https://download.microsoft.com/download/1/1/1/1116b75c-9ec3-481a-a3c8-1777b5381140/vcredist_x86.exe"; Args = "/q" },
    @{ Name = "VC++ 2008 SP1 (x64)"; Url = "https://download.microsoft.com/download/d/2/4/d242c3fb-da39-4542-979b-f6914713e33c/vcredist_x64.exe"; Args = "/q" },
    @{ Name = "VC++ 2010 SP1 (x86)"; Url = "https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x86.exe"; Args = "/q /norestart" },
    @{ Name = "VC++ 2010 SP1 (x64)"; Url = "https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x64.exe"; Args = "/q /norestart" },
    @{ Name = "VC++ 2012 Update 4 (x86)"; Url = "https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F92E/vcredist_x86.exe"; Args = "/quiet /norestart" },
    @{ Name = "VC++ 2012 Update 4 (x64)"; Url = "https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F92E/vcredist_x64.exe"; Args = "/quiet /norestart" },
    @{ Name = "VC++ 2013 (x86)"; Url = "https://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x86.exe"; Args = "/install /quiet /norestart" },
    @{ Name = "VC++ 2013 (x64)"; Url = "https://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x64.exe"; Args = "/install /quiet /norestart" },
    @{ Name = "VC++ 2015-2022 (x86)"; Url = "https://aka.ms/vs/17/release/vc_redist.x86.exe"; Args = "/install /quiet /norestart" },
    @{ Name = "VC++ 2015-2022 (x64)"; Url = "https://aka.ms/vs/17/release/vc_redist.x64.exe"; Args = "/install /quiet /norestart" }
)

$Total = $Packages.Count
$Count = 0

foreach ($pkg in $Packages) {
    $Count++
    $FilePath = "$TempDir\\vc_$($Count).exe"
    Write-Host "[$Count/$Total] Downloading $($pkg.Name)..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $pkg.Url -OutFile $FilePath -UseBasicParsing
    
    Write-Host "[$Count/$Total] Installing $($pkg.Name)..." -ForegroundColor Green
    Start-Process -FilePath $FilePath -ArgumentList $pkg.Args -Wait
    Remove-Item $FilePath -Force
}

Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "\`nAll Visual C++ Redistributables successfully installed!" -ForegroundColor Green
Write-Host "You may now proceed to run wampserver3.4.0_x64.exe as Administrator.\`n" -ForegroundColor Cyan`;

export const mysqlRootPasswordGuide = {
  defaultCreds: {
    username: "root",
    password: "",
    passwordLabel: "(empty / blank)",
    host: "localhost (127.0.0.1)",
    portMysql: "3306",
    portMariadb: "3307",
  },
  newCreds: {
    username: "root",
    password: "sukantahui",
    host: "localhost",
  },
  sqlCommands: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'sukantahui';
FLUSH PRIVILEGES;
EXIT;`,
  legacySqlCommands: `SET PASSWORD FOR 'root'@'localhost' = PASSWORD('sukantahui');
FLUSH PRIVILEGES;
EXIT;`,
  configIncPath: `C:\\wamp64\\apps\\phpmyadmin5.x.x\\config.inc.php`,
  configIncSnippet: `/* In C:\\wamp64\\apps\\phpmyadmin5.x.x\\config.inc.php */
// Option A: Automatic Silent Login with new password
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = 'sukantahui'; // Replace '' with 'sukantahui'
$cfg['Servers'][$i]['AllowNoPassword'] = false;`,
  configIncCookieSnippet: `/* In C:\\wamp64\\apps\\phpmyadmin5.x.x\\config.inc.php */
// Option B (Recommended): Interactive Secure Login Screen
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['user'] = '';
$cfg['Servers'][$i]['password'] = '';
$cfg['Servers'][$i]['AllowNoPassword'] = false;`,
  restartWampGuide: {
    en: [
      {
        step: 1,
        title: "Edit config.inc.php",
        desc: "Open C:\\wamp64\\apps\\phpmyadmin5.x.x\\config.inc.php in Notepad++ or VS Code, update the password to 'sukantahui' (or change auth_type to 'cookie'), and save the file (Ctrl + S).",
      },
      {
        step: 2,
        title: "Restart All Wamp Services",
        desc: "Left-click the green WampServer tray icon in the Windows taskbar and click 'Restart All Services'. Wait 5-10 seconds until the icon turns green again.",
      },
      {
        step: 3,
        title: "Launch phpMyAdmin in Fresh Browser Session",
        desc: "Open http://localhost/phpmyadmin/ in your browser. If you still see the old red error page, press Ctrl + F5 for a hard refresh or open in an Incognito window.",
      },
      {
        step: 4,
        title: "Enter New Credentials (If prompted)",
        desc: "Username: root | Password: sukantahui | Server choice: MySQL (port 3306). Click 'Log in' and enjoy your secured database!",
      },
    ],
    bn: [
      {
        step: 1,
        title: "config.inc.php ফাইলটি এডিট করুন",
        desc: "Notepad++ বা VS Code দিয়ে C:\\wamp64\\apps\\phpmyadmin5.x.x\\config.inc.php ফাইলটি খুলুন। password লাইনে 'sukantahui' লিখুন (অথবা auth_type এ 'cookie' দিন) এবং Ctrl + S চেপে সেভ করুন।",
      },
      {
        step: 2,
        title: "WAMP-এর সব সার্ভিস রিস্টার্ট দিন",
        desc: "টাস্কবারের সবুজ WAMP ট্রে আইকনে Left-Click করুন এবং 'Restart All Services' অপশনে ক্লিক করুন। ৫-১০ সেকেন্ড অপেক্ষা করুন যতক্ষণ আইকনটি পুনরায় সবুজ না হয়।",
      },
      {
        step: 3,
        title: "ব্রাউজারে ফ্রেশ সেশনে phpMyAdmin ওপেন করুন",
        desc: "ব্রাউজারে http://localhost/phpmyadmin/ ওপেন করুন। আগের লাল এরর আসলে কিবোর্ডে Ctrl + F5 চেপে হার্ড রিফ্রেশ করুন অথবা Incognito (গোপন) উইন্ডো খুলুন।",
      },
      {
        step: 4,
        title: "নতুন ক্রেডেনশিয়াল দিয়ে লগইন সম্পন্ন করুন",
        desc: "ইউজারনেম: root | পাসওয়ার্ড: sukantahui | সার্ভার: MySQL সিলেক্ট করে 'Log in' বাটনে ক্লিক করুন এবং ডেটাবেস ব্যবহার শুরু করুন!",
      },
    ],
  },
  phpMysqliSnippet: `<?php
// Database Connection via MySQLi (Procedural & Object-Oriented)
$host     = "localhost";
$user     = "root";
$password = "sukantahui"; // Your updated password
$database = "my_database";

// 1. Create connection
$conn = new mysqli($host, $user, $password, $database);

// 2. Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
echo "Connected successfully to MySQL database with password!";
?>`,
  phpPdoSnippet: `<?php
// Database Connection via Modern PHP PDO (Recommended for Security)
$host     = "localhost";
$db       = "my_database";
$user     = "root";
$pass     = "sukantahui"; // Your updated password
$charset  = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     echo "PDO Database Connected securely!";
} catch (PDOException $e) {
     throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>`,
};

