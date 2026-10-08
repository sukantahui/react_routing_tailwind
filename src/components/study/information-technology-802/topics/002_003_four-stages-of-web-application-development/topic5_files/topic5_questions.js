const topic5_questions = [
  {
    id: 1,
    question: "What is 'Production Deployment' in web application development?",
    options: [
      "Publishing the fully tested application onto live cloud/web servers accessible to the general public",
      "Writing the first line of JavaScript code",
      "Drafting client questionnaires",
      "Printing paper manuals for developers"
    ],
    correctAnswer: 0,
    explanation: "Production deployment makes the verified software live and operational on web servers (e.g., AWS, Tomcat) for end users worldwide.",
    explanationBengali: "প্রোডাকশন ডেপ্লয়মেন্ট হলো সম্পূর্ণরূপে টেস্ট করা ওয়েব অ্যাপ্লিকেশনটিকে লাইভ ক্লাউড বা ওয়েব সার্ভারে সাধারণ ব্যবহারকারীদের জন্য উন্মুক্ত করা।"
  },
  {
    id: 2,
    question: "Which type of software maintenance involves repairing bugs, defects, and crashes reported by live users after launch?",
    options: [
      "Adaptive Maintenance",
      "Corrective Maintenance",
      "Perfective Maintenance",
      "Preventive Maintenance"
    ],
    correctAnswer: 1,
    explanation: "Corrective Maintenance diagnoses and fixes operational errors, calculation mistakes, or system crashes discovered during live usage.",
    explanationBengali: "কারেক্টিভ মেইনটেন্যান্স (Corrective Maintenance) লাইভ সার্ভারে ব্যবহারকারীদের দ্বারা শনাক্ত হওয়া বাগ, ক্র্যাশ এবং ত্রুটিগুলো সমাধান করে।"
  },
  {
    id: 3,
    question: "Modifying an online billing application to comply with new government GST tax rates is an example of:",
    options: [
      "Corrective Maintenance",
      "Adaptive Maintenance",
      "Preventive Maintenance",
      "Beta Testing"
    ],
    correctAnswer: 1,
    explanation: "Adaptive Maintenance modifies software to keep it operational when external environments, legal regulations (e.g. GST), or operating systems change.",
    explanationBengali: "নতুন সরকারি GST ট্যাক্স রেট বা বাহ্যিক পরিবেশ পরিবর্তনের সাথে খাপ খাইয়ে সফটওয়্যার আপডেট করা হলো অ্যাডাপ্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 4,
    question: "Enhancing user interface speed, adding dark mode, or increasing search speed based on user feedback is classified as:",
    options: [
      "Perfective Maintenance",
      "Corrective Maintenance",
      "System Crashing",
      "Unit Testing"
    ],
    correctAnswer: 0,
    explanation: "Perfective Maintenance improves software performance, enhances usability, or adds convenient new features beyond original requirements.",
    explanationBengali: "পারফেক্টিভ মেইনটেন্যান্স (Perfective Maintenance) ব্যবহারকারীর চাহিদার ভিত্তিতে সফটওয়্যারের গতি বৃদ্ধি, নতুন ফিচার যোগ এবং পারফরম্যান্স উন্নত করে।"
  },
  {
    id: 5,
    question: "Proactively refactoring database indexes and upgrading libraries to prevent future failures before they occur is known as:",
    options: [
      "Corrective Maintenance",
      "Adaptive Maintenance",
      "Preventive Maintenance",
      "Alpha Testing"
    ],
    correctAnswer: 2,
    explanation: "Preventive Maintenance anticipates future problems and refactors code or updates infrastructure to avoid potential disruptions.",
    explanationBengali: "প্রিভেন্টিভ মেইনটেন্যান্স (Preventive Maintenance) ভবিষ্যতে যাতে কোনো সমস্যা বা ক্র্যাশ না ঘটে তার জন্য আগেভাগেই কোড ও ডেটাবেস আপডেট করে।"
  },
  {
    id: 6,
    question: "What is an 'SSL/TLS Certificate' configured during web application deployment?",
    options: [
      "A digital certificate that encrypts data transmitted between browser and web server, enabling secure HTTPS",
      "A paper degree given to the lead developer",
      "A warranty receipt for server computer hard drives",
      "A credit card used for paying cloud bills"
    ],
    correctAnswer: 0,
    explanation: "SSL/TLS certificates authenticate web servers and enable HTTPS encryption to safeguard user data from eavesdropping.",
    explanationBengali: "SSL/TLS সার্টিফিকেট ব্রাউজার এবং সার্ভারের মধ্যবর্তী ডেটা এনক্রিপ্ট করে সুরক্ষিত HTTPS সংযোগ নিশ্চিত করে।"
  },
  {
    id: 7,
    question: "What is the purpose of configuring a 'Domain Name System' (DNS) during deployment?",
    options: [
      "To map human-readable domain names (e.g. www.codernaccotax.co.in) to numerical IP addresses of web servers",
      "To count the number of HTML files",
      "To prevent computers from turning off",
      "To automatically design web page buttons"
    ],
    correctAnswer: 0,
    explanation: "DNS translates user-friendly domain URLs into IP addresses so browsers can locate web servers across the internet.",
    explanationBengali: "DNS মানুষের পাঠযোগ্য ডোমেন নামকে সার্ভারের নিউমেরিক আইপি (IP) অ্যাড্রেসে রূপান্তর করে।"
  },
  {
    id: 8,
    question: "Why is 'User Feedback Integration' essential throughout the software lifecycle?",
    options: [
      "It provides real-world insights that guide the next iteration's Requirement Definition phase",
      "It allows developers to stop writing software documentation",
      "It eliminates the need for web hosting servers",
      "It permanently locks database tables"
    ],
    correctAnswer: 0,
    explanation: "User feedback completes the lifecycle loop, providing actionable requirements for subsequent feature iterations and updates.",
    explanationBengali: "ইউজার ফিডব্যাক সফটওয়্যারের পরবর্তী ভার্সনের জন্য নতুন চাহিদা (Requirements) শনাক্ত করে পুরো লাইফসাইকেলকে গতিশীল রাখে।"
  },
  {
    id: 9,
    question: "What is a 'Rollback Strategy' in deployment management?",
    options: [
      "The ability to immediately revert to the previous stable version if the newly deployed version encounters catastrophic live bugs",
      "Rolling the server computer across the room",
      "Turning off electricity to the entire office",
      "Deleting all client invoices"
    ],
    correctAnswer: 0,
    explanation: "Rollback plans ensure that faulty releases can be quickly reverted to previous working versions to minimize customer disruption.",
    explanationBengali: "রোলব্যাক স্ট্র্যাটেজি হলো নতুন ভার্সনে গুরুতর সমস্যা দেখা দিলে দ্রুত পূর্ববর্তী স্থিতিশীল ভার্সনে ফিরে যাওয়ার নিরাপত্তা ব্যবস্থা।"
  },
  {
    id: 10,
    question: "What is 'Server Monitoring and Uptime Tracking' post-deployment?",
    options: [
      "Continuously tracking server CPU usage, memory load, response times, and 99.9% uptime availability",
      "Watching the developer type code on screen",
      "Counting the number of physical keys on keyboards",
      "Listening to sound from cooling fans"
    ],
    correctAnswer: 0,
    explanation: "Monitoring tools track server health, network traffic spikes, and server downtime to alert engineers immediately if faults arise.",
    explanationBengali: "সার্ভার মনিটরিং সার্বক্ষণিকভাবে সার্ভারের CPU, মেমোরি, লোড ও রেসপন্স টাইম পর্যবেক্ষণ করে সিস্টেম চালু রাখে।"
  },
  {
    id: 11,
    question: "If a web app is updated to run smoothly on Google Chrome version 130 after a browser engine update, what maintenance type is this?",
    options: [
      "Adaptive Maintenance",
      "Corrective Maintenance",
      "Trivial Maintenance",
      "Regression Testing"
    ],
    correctAnswer: 0,
    explanation: "Adapting to external third-party software updates (like a new browser release) is classified as Adaptive Maintenance.",
    explanationBengali: "নতুন ব্রাউজার বা অপারেটিং সিস্টেম আপডেটের সাথে সামঞ্জস্য রেখে কোড পরিবর্তন করা হলো অ্যাডাপ্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 12,
    question: "Which of the following maintenance activities occupies the largest share of long-term software lifecycle expenditure?",
    options: [
      "Initial Requirement Gathering",
      "Post-deployment Maintenance (Corrective, Adaptive, Perfective, Preventive)",
      "Buying office stationery",
      "Designing initial wireframes"
    ],
    correctAnswer: 1,
    explanation: "Studies show that 60% to 80% of total software lifecycle costs are spent on ongoing post-deployment maintenance and feature enhancements.",
    explanationBengali: "সফটওয়্যার লাইফসাইকেলের মোট ব্যয়ের প্রায় ৬০% থেকে ৮০% খরচ হয় ডেপ্লয়মেন্ট-পরবর্তী মেইনটেন্যান্সে।"
  },
  {
    id: 13,
    question: "What is a 'Hotfix' in production maintenance?",
    options: [
      "An emergency patch applied directly to the live production server to resolve a critical bug without waiting for the next scheduled release",
      "Heating the server hardware with a heater",
      "A spicy lunch provided to programmers",
      "A fast internet connection cable"
    ],
    correctAnswer: 0,
    explanation: "A hotfix is an urgent, targeted bug fix deployed immediately to live servers to remedy critical operational or security issues.",
    explanationBengali: "হটফিক্স (Hotfix) হলো লাইভ সার্ভারে জরুরি কোনো মারাত্মক বাগ দ্রুত ঠিক করার জন্য তাৎক্ষণিক প্যাচ।"
  },
  {
    id: 14,
    question: "What does an SLA (Service Level Agreement) specify for a deployed web application?",
    options: [
      "Guaranteed uptime percentage (e.g. 99.9%), support response times, and penalty clauses for outages",
      "The price of developer laptops",
      "The color of office wall paint",
      "The food menu in the company cafeteria"
    ],
    correctAnswer: 0,
    explanation: "An SLA contractually guarantees service availability, uptime percentage, and support resolution time commitments to clients.",
    explanationBengali: "SLA হলো একটি চুক্তি যা সার্ভারের আপটাইম (যেমন ৯৯.৯%) এবং সাপোর্ট রেসপন্স টাইমের নিশ্চয়তা প্রদান করে।"
  },
  {
    id: 15,
    question: "Which tool or platform is commonly used to automate continuous deployment (CD) of web applications?",
    options: [
      "GitHub Actions / Jenkins / Docker",
      "Notepad",
      "Windows Media Player",
      "Paint 3D"
    ],
    correctAnswer: 0,
    explanation: "GitHub Actions, Jenkins, and Docker automate building, testing, containerizing, and deploying code to cloud servers seamlessly.",
    explanationBengali: "GitHub Actions এবং Jenkins স্বয়ংক্রিয়ভাবে কোড বিল্ড ও লাইভ সার্ভারে ডেপ্লয় করার জন্য ব্যবহৃত হয়।"
  },
  {
    id: 16,
    question: "A company discovers that a bank transaction round-off calculation is deducting 1 paisa extra from customers. Fixing this is:",
    options: [
      "Corrective Maintenance",
      "Adaptive Maintenance",
      "Preventive Maintenance",
      "Feature Request"
    ],
    correctAnswer: 0,
    explanation: "Fixing a calculation logic error occurring in production is standard Corrective Maintenance.",
    explanationBengali: "লাইভ সিস্টেমে হিসাবের ভুল ঠিক করা হলো কারেক্টিভ মেইনটেন্যান্স (Corrective Maintenance)।"
  },
  {
    id: 17,
    question: "What is a 'Staging Environment' used for prior to production deployment?",
    options: [
      "An exact replica of the production server environment used for final end-to-end rehearsal before going live",
      "A theater stage for musical performances",
      "A storage room for empty computer boxes",
      "A public demo for advertising"
    ],
    correctAnswer: 0,
    explanation: "Staging mimics live hardware, database, and network configurations to catch deployment-specific anomalies before real users access the system.",
    explanationBengali: "স্টেজিং এনভায়রনমেন্ট হলো প্রোডাকশন সার্ভারের হুবহু অনুরূপ পরিবেশ যেখানে লাইভ হওয়ার আগে শেষবারের মতো মহড়া দেওয়া হয়।"
  },
  {
    id: 18,
    question: "Why should database migrations (e.g., adding a new column to MySQL tables) be tested on a backup database first?",
    options: [
      "To prevent data corruption, data loss, or server lockup on live customer transactions",
      "Because MySQL refuses to alter tables without a backup",
      "To make SQL queries execute in alphabetical order",
      "To change the font color of MySQL Workbench"
    ],
    correctAnswer: 0,
    explanation: "Testing schema migrations on staging database backups ensures table structure changes do not lock tables or wipe live customer data.",
    explanationBengali: "ব্যাকআপ ডেটাবেসে আগে টেস্ট করলে লাইভ ডেটা নষ্ট হওয়া বা ডেটাবেস লক হয়ে যাওয়ার ঝুঁকি থাকে না।"
  },
  {
    id: 19,
    question: "What is 'Zero-Downtime Deployment'?",
    options: [
      "A deployment technique (such as Blue-Green deployment) where updates are rolled out without taking the website offline for users",
      "Running web servers without electricity",
      "A website that has 0 lines of code",
      "A computer that never turns on"
    ],
    correctAnswer: 0,
    explanation: "Zero-downtime deployment redirects traffic seamlessly to a new updated server instance without interrupting active user sessions.",
    explanationBengali: "জিরো-ডাউনটাইম ডেপ্লয়মেন্ট এমন কৌশল যা সাইট অফলাইন বা বন্ধ না করেই নতুন আপডেট লাইভ করতে পারে।"
  },
  {
    id: 20,
    question: "What role does 'Application Performance Monitoring' (APM) play in maintenance?",
    options: [
      "Tracking database query execution times, API latency, memory leaks, and server throughput in real time",
      "Measuring the weight of the server racks",
      "Cleaning server dust filters",
      "Checking keyboard typing speed"
    ],
    correctAnswer: 0,
    explanation: "APM tools monitor live application metrics, pinpointing slow SQL queries and server bottlenecks before they impact end users.",
    explanationBengali: "APM টুলস লাইভ অ্যাপ্লিকেশনের গতি, মেমোরি লিক এবং ধীরগতির কুয়েরি সার্বক্ষণিক ট্র্যাক করে পারফরম্যান্স বজায় রাখে।"
  },
  {
    id: 21,
    question: "Upgrading an authentication library to resolve a newly discovered global security vulnerability before an exploit happens is:",
    options: [
      "Preventive Maintenance",
      "Corrective Maintenance",
      "Alpha Testing",
      "System Crashing"
    ],
    correctAnswer: 0,
    explanation: "Proactively patching security holes prior to an actual attack is the hallmark of Preventive Maintenance.",
    explanationBengali: "সম্ভাব্য সাইবার হামলা প্রতিরোধে আগেভাগেই সিকিউরিটি লাইব্রেরি আপডেট করা হলো প্রিভেন্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 22,
    question: "What is a 'Feedback Loop' in software lifecycle management?",
    options: [
      "A continuous process of collecting user feedback, analyzing support tickets, and feeding improvements into the next development cycle",
      "An audio microphone creating a loud screeching noise",
      "An infinite loop that crashes the web server",
      "A circular Ethernet cable connected to itself"
    ],
    correctAnswer: 0,
    explanation: "The feedback loop connects live user experiences directly with future development iterations (Stage 1 Requirements).",
    explanationBengali: "ফিডব্যাক লুপ হলো ব্যবহারকারীর মতামত সংগ্রহ করে পরবর্তী ডেভেলপমেন্ট সাইকেলে অন্তর্ভুক্ত করার একটি ধারাবাহিক প্রক্রিয়া।"
  },
  {
    id: 23,
    question: "In cloud hosting deployment, what does 'Auto-Scaling' mean?",
    options: [
      "Automatically spinning up additional server instances when user traffic surges, and scaling down when traffic subsides",
      "Automatically zooming in on web page text",
      "Automatically increasing monthly server subscription charges without notice",
      "Automatically resizing images on the desktop"
    ],
    correctAnswer: 0,
    explanation: "Auto-scaling dynamically provisions server capacity to handle massive traffic spikes (e.g. Diwali e-commerce sales) without crashes.",
    explanationBengali: "অটো-স্কেলিং ট্রাফিক বৃদ্ধির সাথে সাথে স্বয়ংক্রিয়ভাবে ক্লাউড সার্ভারের সংখ্যা বাড়িয়ে ওয়েবসাইটকে সচল রাখে।"
  },
  {
    id: 24,
    question: "Which maintenance type is triggered when users request an export-to-PDF button for their billing history?",
    options: [
      "Perfective Maintenance",
      "Corrective Maintenance",
      "Emergency Maintenance",
      "Hardware Maintenance"
    ],
    correctAnswer: 0,
    explanation: "Adding new user convenience features or export capabilities requested by users is Perfective Maintenance.",
    explanationBengali: "ব্যবহারকারীদের সুবিধার্থে পিডিএফ এক্সপোর্ট বা নতুন সুবিধা যোগ করা হলো পারফেক্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 25,
    question: "What is the ultimate goal of the combined 4 stages + post-deployment maintenance lifecycle?",
    options: [
      "Delivering high-quality, secure, reliable, and user-aligned software that continuously evolves with user needs",
      "Writing the longest possible code file",
      "Using up all available hard drive memory",
      "Spending as much money as possible"
    ],
    correctAnswer: 0,
    explanation: "The WADLC ensures structured, high-quality engineering that produces maintainable, secure, and user-centric digital products.",
    explanationBengali: "ওয়েব ডেভেলপমেন্ট লাইফসাইকেলের মূল লক্ষ্য হলো উচ্চমানের, নিরাপদ এবং ব্যবহারবান্ধব সফটওয়্যার তৈরি করা যা সময়ের সাথে সাথে আপগ্রেড হতে পারে।"
  }
];

export default topic5_questions;
