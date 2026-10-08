const topic7_questions = [
  {
    id: 1,
    question: "What is the primary purpose of the Downloadable Documents & Master Revision Hub?",
    options: [
      "To provide structured revision cheat-sheets, phase templates, and downloadable resources covering all 4 development stages",
      "To automatically uninstall IDEs from the student computer",
      "To play video games during class",
      "To disconnect the internet connection"
    ],
    correctAnswer: 0,
    explanation: "Topic 7 consolidates master revision summaries, templates (SRS, DDS, JDBC snippets, QA test suites), and pre-board checklists.",
    explanationBengali: "Topic 7-এর মূল উদ্দেশ্য হলো ৪টি পর্যায়ের মাস্টার রিভিশন নোট, টেমপ্লেট এবং পরীক্ষার প্রস্তুতি চেকলিস্ট সরবরাহ করা।"
  },
  {
    id: 2,
    question: "Which of the following pairings correctly matches a development phase with its primary deliverable?",
    options: [
      "Stage 1 -> Executable Bytecode (.class)",
      "Stage 2 -> Software Requirements Specification (SRS)",
      "Stage 3 -> Design Document Specification (DDS)",
      "Stage 4 -> Comprehensive Test Plan, Test Cases, and Bug Reports"
    ],
    correctAnswer: 3,
    explanation: "Stage 4 produces Test Plans, Test Cases, Bug Tracking logs, and UAT Sign-off reports.",
    explanationBengali: "Stage 4 (টেস্টিং)-এর সঠিক ডেলিভারেবল হলো টেস্ট প্ল্যান, টেস্ট কেস এবং বাগ ট্র্যাকিং রিপোর্ট।"
  },
  {
    id: 3,
    question: "Why is the Software Requirements Specification (SRS) considered the contractual foundation of the entire software project?",
    options: [
      "Because all downstream stages (Design, Coding, Testing) are measured, designed, and verified strictly against the requirements frozen in the SRS",
      "Because it contains developer credit card details",
      "Because it is written in binary 0s and 1s",
      "Because it replaces the need for computers"
    ],
    correctAnswer: 0,
    explanation: "The SRS defines the agreed scope, preventing scope creep and serving as the benchmark for both design blueprints and test case validation.",
    explanationBengali: "SRS হলো চুক্তির মূল ভিত্তি কারণ এর ওপর ভিত্তি করেই ডিজাইন, কোডিং ও টেস্টিং পরিচালিত হয়।"
  },
  {
    id: 4,
    question: "In the 3-Tier Web Architecture, why is business logic placed in Tier 2 (Application Tier) rather than Tier 1 (Client Browser)?",
    options: [
      "To protect sensitive business formulas, enforce security validation on the server, and keep client-side scripts lightweight",
      "Because web browsers cannot perform addition or subtraction",
      "To make web pages load 10 times slower",
      "Because MySQL refuses to talk to browsers"
    ],
    correctAnswer: 0,
    explanation: "Executing business rules on the server protects sensitive calculations, prevents client tampering, and ensures secure database communication.",
    explanationBengali: "সার্ভার সাইডে বিজনেস লজিক রাখলে ক্লায়েন্টের নিরাপত্তা নিশ্চিত হয় এবং সংবেদনশীল হিসাব-নিকাশ গোপন থাকে।"
  },
  {
    id: 5,
    question: "Which Java interface in `java.sql.*` is used to navigate and retrieve tabular rows returned by a SQL query?",
    options: [
      "ResultSet",
      "PreparedStatement",
      "DriverManager",
      "SQLException"
    ],
    correctAnswer: 0,
    explanation: "`ResultSet` maintains a cursor pointing to data rows, traversed using `.next()` and read with `.getString()`, `.getInt()`, etc.",
    explanationBengali: "`ResultSet` অবজেক্টটি ডেটাবেস থেকে প্রাপ্ত টেবিলের সারিগুলো এক এক করে রিড করতে সাহায্য করে।"
  },
  {
    id: 6,
    question: "Which software testing type is carried out by real clients in a production-like environment before issuing formal acceptance?",
    options: [
      "User Acceptance Testing (UAT / Beta Testing)",
      "Unit Testing",
      "White-Box Loop Testing",
      "Feasibility Survey"
    ],
    correctAnswer: 0,
    explanation: "UAT (Alpha/Beta testing) is conducted by real users to confirm the system meets operational business needs prior to launch.",
    explanationBengali: "UAT (User Acceptance Testing) আসল ব্যবহারকারীদের দ্বারা পরিচালিত হয় চূড়ান্ত অনুমোদনের জন্য।"
  },
  {
    id: 7,
    question: "A company updates its online shopping portal to integrate the newly launched Unified Payments Interface (UPI 2.0). What maintenance is this?",
    options: [
      "Adaptive Maintenance",
      "Corrective Maintenance",
      "Showstopper Defect",
      "Unit Testing"
    ],
    correctAnswer: 0,
    explanation: "Adapting to new external payment gateway standards and protocols is classic Adaptive Maintenance.",
    explanationBengali: "নতুন পেমেন্ট গেটওয়ে বা বাহ্যিক স্ট্যান্ডার্ডের সাথে সামঞ্জস্য রেখে কোড আপডেট করা হলো অ্যাডাপ্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 8,
    question: "Why should developers use parameter placeholders (`?`) in PreparedStatements instead of string concatenation?",
    options: [
      "To prevent malicious SQL Injection exploits and improve execution performance",
      "To save keyboard typing effort",
      "To make Java code run without JVM",
      "To make MySQL queries case-sensitive"
    ],
    correctAnswer: 0,
    explanation: "PreparedStatements parameterize inputs, neutralizing SQL injection attacks and allowing the database to cache query execution plans.",
    explanationBengali: "PreparedStatement প্যারামিটারাইজড কুয়েরি ব্যবহার করে SQL Injection আক্রমণ প্রতিরোধ করে।"
  },
  {
    id: 9,
    question: "What is 'Scope Creep' and in which stage must it be controlled?",
    options: [
      "The uncontrolled expansion of project features without budget or timeline adjustments; controlled in Stage 1: Requirement Definition",
      "A software bug that crawls across the monitor screen",
      "A physical defect in fiber optic cables",
      "A slow mouse pointer movement"
    ],
    correctAnswer: 0,
    explanation: "Scope Creep occurs when requirements expand during development; clear SRS boundaries in Stage 1 prevent it.",
    explanationBengali: "স্কোপ ক্রিপ হলো প্রজেক্ট চলাকালে অনিয়ন্ত্রিতভাবে নতুন ফিচার যোগ হওয়া, যা প্রথম পর্বেই (SRS-এ) নিয়ন্ত্রণ করতে হয়।"
  },
  {
    id: 10,
    question: "Which document contains Entity-Relationship (ER) diagrams and 3-tier system architecture charts?",
    options: [
      "Design Document Specification (DDS)",
      "Project Purchase Bill",
      "Cloud Server Invoice",
      "Bug Defect Report"
    ],
    correctAnswer: 0,
    explanation: "The Design Document Specification (DDS) produced in Stage 2 contains all technical blueprints, ER schemas, and UI wireframes.",
    explanationBengali: "DDS (Design Document Specification)-এর মধ্যে ER ডায়াগ্রাম, আর্কিটেকচার এবং UI ওয়্যারফ্রেম সংরক্ষিত থাকে।"
  },
  {
    id: 11,
    question: "In NetBeans Java Swing GUI, which method handles click events generated by a `JButton`?",
    options: [
      "actionPerformed(ActionEvent e)",
      "main(String[] args)",
      "paintComponent(Graphics g)",
      "closeConnection()"
    ],
    correctAnswer: 0,
    explanation: "Button clicks trigger an `ActionEvent`, which invokes the `actionPerformed()` event listener method.",
    explanationBengali: "NetBeans-এ বাটন ক্লিকের ঘটনা `actionPerformed(ActionEvent e)` মেথডে প্রসেস করা হয়।"
  },
  {
    id: 12,
    question: "What is the primary deliverable of Stage 3 (Implementation / Coding Phase)?",
    options: [
      "Fully integrated, executable source code repository adhering to design specifications",
      "Signed client survey form",
      "The initial project budget estimation",
      "Final marketing brochure"
    ],
    correctAnswer: 0,
    explanation: "The output of Stage 3 is the integrated source code codebase covering front-end and back-end modules.",
    explanationBengali: "তৃতীয় পর্বের মূল ডেলিভারেবল হলো সম্পূর্ণ কার্যকরী এবং সমন্বিত সোর্স কোড রিপোজিটরি।"
  },
  {
    id: 13,
    question: "What is 'Regression Testing'?",
    options: [
      "Re-running test cases after code changes or bug fixes to ensure existing features remain unaffected",
      "Testing software on older hardware computers",
      "Testing while moving backward in an office chair",
      "Testing without opening the computer"
    ],
    correctAnswer: 0,
    explanation: "Regression testing verifies that recent bug fixes or code modifications have not introduced new unintended defects into existing features.",
    explanationBengali: "রিগ্রেশন টেস্টিং নিশ্চিত করে যে নতুন কোড যোগ করার ফলে পূর্বের কোনো ভালো ফিচার নষ্ট হয়নি।"
  },
  {
    id: 14,
    question: "Which of the following maintenance types involves adding a requested Dark Theme UI to a billing portal?",
    options: [
      "Perfective Maintenance",
      "Corrective Maintenance",
      "Preventive Maintenance",
      "Beta Testing"
    ],
    correctAnswer: 0,
    explanation: "Enhancing user satisfaction and adding convenient new capabilities based on user suggestions is Perfective Maintenance.",
    explanationBengali: "ব্যবহারকারীর চাহিদার ভিত্তিতে ডার্ক মোড বা নতুন সুবিধা যোগ করা হলো পারফেক্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 15,
    question: "What is the status progression of a defect in a standard Bug Tracking system?",
    options: [
      "New -> Assigned -> Open -> Fixed -> Retest -> Closed",
      "Closed -> Open -> Fixed -> New",
      "Assigned -> New -> Deleted -> Open",
      "Fixed -> Retest -> Open -> Closed"
    ],
    correctAnswer: 0,
    explanation: "Defects move systematically through New -> Assigned -> Open -> Fixed -> Retest -> Closed.",
    explanationBengali: "বাগের সঠিক ট্র্যাকিং ধারা: New -> Assigned -> Open -> Fixed -> Retest -> Closed।"
  },
  {
    id: 16,
    question: "What is the role of an SSL/TLS certificate during deployment?",
    options: [
      "It encrypts HTTP traffic into secure HTTPS, preventing eavesdropping and data tampering",
      "It makes the web server run without electricity",
      "It speeds up CPU clock frequency",
      "It automatically pays developer salaries"
    ],
    correctAnswer: 0,
    explanation: "SSL/TLS certificates provide end-to-end encryption for internet communications, displaying the secure HTTPS padlock.",
    explanationBengali: "SSL/TLS সার্টিফিকেট ডেটা এনক্রিপ্ট করে সুরক্ষিত HTTPS সংযোগ প্রদান করে।"
  },
  {
    id: 17,
    question: "Which of the following is an example of 'Preventive Maintenance'?",
    options: [
      "Refactoring database indexes and upgrading OpenSSL libraries to prevent potential future security crashes",
      "Fixing a broken login button reported by a user",
      "Updating tax rates for the new financial year",
      "Writing the initial project SRS document"
    ],
    correctAnswer: 0,
    explanation: "Preventive maintenance proactively eliminates potential failure points before any live operational breakdown occurs.",
    explanationBengali: "ভবিষ্যতের সম্ভাব্য ঝুঁকি বা ক্র্যাশ এড়াতে আগেভাগেই ডেটাবেস ও সিকিউরিটি আপডেট করা হলো প্রিভেন্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 18,
    question: "What is 'Boundary Value Analysis' in Stage 4 testing?",
    options: [
      "Testing extreme input limits (minimum, maximum, and boundary adjacent values)",
      "Testing the physical walls of the office building",
      "Testing how far Wi-Fi signals travel outside the building",
      "Testing printer paper margins"
    ],
    correctAnswer: 0,
    explanation: "Boundary Value Analysis tests data partitions at extreme threshold limits where coding logic errors are most common.",
    explanationBengali: "বাউন্ডারি ভ্যালু অ্যানালাইসিস ইনপুটের প্রান্তিক মানগুলো (সর্বনিম্ন ও সর্বোচ্চ সীমা) পরীক্ষা করে।"
  },
  {
    id: 19,
    question: "What does DNS (Domain Name System) accomplish during web application deployment?",
    options: [
      "It resolves human-readable domain names into numerical server IP addresses",
      "It counts the number of database records",
      "It turns off the computer at night",
      "It compiles Java code to machine code"
    ],
    correctAnswer: 0,
    explanation: "DNS translates domain names (e.g. `www.codernaccotax.co.in`) into IP addresses so browsers can reach web servers.",
    explanationBengali: "DNS মানুষের পাঠযোগ্য ডোমেন নামকে সার্ভারের আইপি (IP) অ্যাড্রেসে রূপান্তর করে।"
  },
  {
    id: 20,
    question: "In database design, what does database normalization (1NF, 2NF, 3NF) prevent?",
    options: [
      "Data redundancy, insertion anomalies, update anomalies, and deletion anomalies",
      "Web browsers from closing",
      "CSS colors from displaying",
      "Computers from overheating"
    ],
    correctAnswer: 0,
    explanation: "Normalization decomposes redundant tables to ensure data integrity and avoid anomalies during CRUD operations.",
    explanationBengali: "ডেটাবেস নরমালাইজেশন তথ্যের অনাকাঙ্ক্ষিত পুনরাবৃত্তি এবং ইনসার্ট/আপডেট/ডিলিট অ্যানোমালি দূর করে।"
  },
  {
    id: 21,
    question: "Which testing phase immediately precedes production deployment?",
    options: [
      "User Acceptance Testing (UAT)",
      "Stage 1 Feasibility Study",
      "Stage 2 Wireframing",
      "Stage 3 Coding"
    ],
    correctAnswer: 0,
    explanation: "UAT is the final gatekeeper testing phase where stakeholders grant the formal sign-off for live deployment.",
    explanationBengali: "লাইভ ডেপ্লয়মেন্টের ঠিক আগের চূড়ান্ত ধাপ হলো User Acceptance Testing (UAT)।"
  },
  {
    id: 22,
    question: "What connects user feedback from a deployed application back into Stage 1 of the development lifecycle?",
    options: [
      "The Continuous Feedback Loop",
      "A long Ethernet cable",
      "Deleting the MySQL database",
      "Re-formatting the server hard drive"
    ],
    correctAnswer: 0,
    explanation: "The Continuous Feedback Loop captures user feedback and channelizes it into new requirements for subsequent software versions.",
    explanationBengali: "কন্টিনিউয়াস ফিডব্যাক লুপ ব্যবহারকারীর অভিজ্ঞতাকে পরবর্তী সফটওয়্যার ভার্সনের নতুন রিকোয়ারমেন্ট হিসেবে সংযুক্ত করে।"
  },
  {
    id: 23,
    question: "In JDBC, which method must be called to establish a database connection?",
    options: [
      "DriverManager.getConnection(url, user, password)",
      "System.exit(0)",
      "Math.sqrt(100)",
      "Thread.sleep(1000)"
    ],
    correctAnswer: 0,
    explanation: "`DriverManager.getConnection()` connects Java applications to the relational database using the JDBC URL and credentials.",
    explanationBengali: "`DriverManager.getConnection()` নির্দিষ্ট ডাটাবেস URL এবং ক্রেডেনশিয়াল দিয়ে সংযোগ স্থাপন করে।"
  },
  {
    id: 24,
    question: "Why does the CBSE Class 12 IT 802 syllabus emphasize the 4 stages of web development?",
    options: [
      "To provide students with industry-standard systems engineering methodologies for developing scalable, secure web software",
      "To replace mathematics with typing",
      "To teach students how to fix broken keyboards",
      "To make examinations more difficult"
    ],
    correctAnswer: 0,
    explanation: "The WADLC curriculum instills structured engineering discipline, requirement scoping, architectural design, secure coding, and quality testing.",
    explanationBengali: "এই সিলেবাস শিক্ষার্থীদের বাস্তব কর্মক্ষেত্রের সফটওয়্যার ইঞ্জিনিয়ারিং পদ্ধতি ও লাইফসাইকেল সম্পর্কে দক্ষ করে তোলে।"
  },
  {
    id: 25,
    question: "Which of the following summaries best captures the Web Application Development Lifecycle?",
    options: [
      "A continuous engineering lifecycle progressing from Requirements -> Design -> Coding -> Testing, followed by live Deployment and Maintenance",
      "A one-time activity of writing random HTML code without testing",
      "A hardware assembly procedure for computer parts",
      "A financial accounting ledger"
    ],
    correctAnswer: 0,
    explanation: "WADLC is an iterative, structured engineering framework comprising Requirements, Design, Implementation, Testing, Deployment, and Maintenance.",
    explanationBengali: "WADLC হলো একটি ধারাবাহিক ও সুশৃঙ্খল ইঞ্জিনিয়ারিং প্রক্রিয়া যা রিকোয়ারমেন্ট, ডিজাইন, কোডিং, টেস্টিং এবং মেইনটেন্যান্সের সমন্বয়ে গঠিত।"
  }
];

export default topic7_questions;
