const topic8_questions = [
  {
    id: 1,
    question: "What is the correct chronological sequence of the four stages of web application development?",
    options: [
      "Design -> Coding -> Testing -> Requirement Definition",
      "Requirement Definition -> Design -> Implementation (Coding) -> Testing & Quality Assurance",
      "Implementation -> Design -> Testing -> Deployment",
      "Testing -> Requirement Definition -> Coding -> Design"
    ],
    correctAnswer: 1,
    explanation: "The standard sequence is: 1. Requirement Definition -> 2. Design -> 3. Implementation -> 4. Testing.",
    explanationBengali: "সঠিক ধারাবাহিক ক্রম: ১. Requirement Definition -> ২. Design -> ৩. Implementation (Coding) -> ৪. Testing & Quality Assurance।"
  },
  {
    id: 2,
    question: "Which document serves as the formal deliverable of the Requirement Definition Phase (Stage 1)?",
    options: [
      "Software Requirements Specification (SRS)",
      "Design Document Specification (DDS)",
      "Unit Test Case Report",
      "Cloud Deployment Certificate"
    ],
    correctAnswer: 0,
    explanation: "The SRS defines the functional scope, operational constraints, and boundaries agreed upon by the client and engineers.",
    explanationBengali: "প্রথম পর্বের মূল আউটপুট হলো SRS (Software Requirements Specification) ডকুমেন্ট।"
  },
  {
    id: 3,
    question: "Which phase of web development answers 'HOW' the application will look, navigate, and technically operate?",
    options: [
      "Stage 1: Requirement Definition",
      "Stage 2: Design Phase",
      "Stage 3: Implementation Phase",
      "Stage 4: Testing Phase"
    ],
    correctAnswer: 1,
    explanation: "Stage 2 (Design Phase) creates the visual wireframes, 3-tier architecture, and normalized ER schemas.",
    explanationBengali: "দ্বিতীয় পর্ব (Design Phase) নির্ধারণ করে সিস্টেমটি কীভাবে কাজ করবে ও দেখাবে।"
  },
  {
    id: 4,
    question: "In the 3-Tier Client-Server Architecture, which tier is responsible for rendering HTML/CSS/JS and capturing user input?",
    options: [
      "Presentation Tier (Tier 1)",
      "Application Logic Tier (Tier 2)",
      "Data Tier (Tier 3)",
      "Network Gateway Tier"
    ],
    correctAnswer: 0,
    explanation: "The Presentation Tier is the client-facing user interface running in web browsers.",
    explanationBengali: "প্রেজেন্টেশন টিয়ার (Tier 1) ব্যবহারকারীর ব্রাউজারে UI রেন্ডার করে এবং ইনপুট গ্রহণ করে।"
  },
  {
    id: 5,
    question: "Why are PreparedStatements preferred over regular Statements in Java JDBC back-end development?",
    options: [
      "They prevent SQL Injection exploits and improve execution performance through pre-compilation",
      "They allow Java code to run without installing the JDK",
      "They automatically design UI wireframes",
      "They bypass database password security"
    ],
    correctAnswer: 0,
    explanation: "PreparedStatements parameterize input data with `?`, blocking malicious SQL injection attempts.",
    explanationBengali: "PreparedStatement প্যারামিটারাইজড কুয়েরি ব্যবহার করে SQL Injection প্রতিরোধ করে।"
  },
  {
    id: 6,
    question: "Which JDBC method executes a `SELECT` statement and returns retrieved rows in Java?",
    options: [
      "executeQuery()",
      "executeUpdate()",
      "executeDelete()",
      "commitRows()"
    ],
    correctAnswer: 0,
    explanation: "`executeQuery()` executes SELECT queries and returns a `ResultSet` object.",
    explanationBengali: "`executeQuery()` মেথডটি SELECT কুয়েরি রান করে এবং ResultSet প্রদান করে।"
  },
  {
    id: 7,
    question: "Which JDBC method executes `INSERT`, `UPDATE`, or `DELETE` statements?",
    options: [
      "executeUpdate()",
      "executeQuery()",
      "fetchNext()",
      "closeConnection()"
    ],
    correctAnswer: 0,
    explanation: "`executeUpdate()` executes DML statements and returns the integer count of affected rows.",
    explanationBengali: "`executeUpdate()` মেথডটি INSERT, UPDATE এবং DELETE কুয়েরির জন্য ব্যবহৃত হয়।"
  },
  {
    id: 8,
    question: "Which level of testing focuses on validating individual methods or functions in isolation?",
    options: [
      "Unit Testing",
      "Integration Testing",
      "System Testing",
      "User Acceptance Testing (UAT)"
    ],
    correctAnswer: 0,
    explanation: "Unit testing tests individual functions/methods (e.g. `calculateDiscount()`) in isolation.",
    explanationBengali: "ইউনিট টেস্টিং আলাদাভাবে একক ফাংশন বা মেথডের নির্ভুলতা পরীক্ষা করে।"
  },
  {
    id: 9,
    question: "What is 'Regression Testing' in software quality assurance?",
    options: [
      "Re-running test cases after code changes to confirm existing working features remain unbroken",
      "Testing software on obsolete operating systems",
      "Testing by deleting all user accounts",
      "Testing with reverse typing"
    ],
    correctAnswer: 0,
    explanation: "Regression testing ensures bug fixes or code modifications have not introduced new defects.",
    explanationBengali: "রিগ্রেশন টেস্টিং নিশ্চিত করে যে নতুন কোড যোগ করার ফলে আগের চালু ফিচার নষ্ট হয়নি।"
  },
  {
    id: 10,
    question: "What is the final testing phase conducted by real clients to grant sign-off for production launch?",
    options: [
      "User Acceptance Testing (UAT / Beta Testing)",
      "Unit Testing",
      "Boundary Value Analysis",
      "High-Level Design Review"
    ],
    correctAnswer: 0,
    explanation: "UAT validates that the system fulfills client business requirements in a real-world setting.",
    explanationBengali: "UAT (User Acceptance Testing) হলো ক্লায়েন্টদের দ্বারা পরিচালিত চূড়ান্ত অনুমোদন পরীক্ষা।"
  },
  {
    id: 11,
    question: "Repairing a live billing calculation error reported by consumers post-launch is classified as:",
    options: [
      "Corrective Maintenance",
      "Adaptive Maintenance",
      "Perfective Maintenance",
      "Preventive Maintenance"
    ],
    correctAnswer: 0,
    explanation: "Corrective Maintenance fixes operational bugs and crashes discovered during live usage.",
    explanationBengali: "লাইভ সিস্টেমে বাগ বা ত্রুটি সমাধান করা হলো কারেক্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 12,
    question: "Updating an online billing portal to comply with newly revised Indian GST tax rates is an example of:",
    options: [
      "Adaptive Maintenance",
      "Corrective Maintenance",
      "Preventive Maintenance",
      "Unit Testing"
    ],
    correctAnswer: 0,
    explanation: "Adaptive Maintenance modifies software to adapt to external legal, regulatory, or environment changes.",
    explanationBengali: "নতুন সরকারি GST আইনের সাথে সামঞ্জস্য রেখে কোড আপডেট করা হলো অ্যাডাপ্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 13,
    question: "Adding Dark Mode UI and a 1-click 'Download PDF Statement' button based on user requests is:",
    options: [
      "Perfective Maintenance",
      "Corrective Maintenance",
      "Preventive Maintenance",
      "Alpha Testing"
    ],
    correctAnswer: 0,
    explanation: "Perfective Maintenance enhances performance and adds desirable new features based on user demand.",
    explanationBengali: "ব্যবহারকারীর চাহিদার ভিত্তিতে ডার্ক মোড বা নতুন সুবিধা যোগ করা হলো পারফেক্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 14,
    question: "Proactively optimizing MySQL indexes and updating OpenSSL libraries to prevent future crashes is:",
    options: [
      "Preventive Maintenance",
      "Corrective Maintenance",
      "Adaptive Maintenance",
      "Beta Testing"
    ],
    correctAnswer: 0,
    explanation: "Preventive Maintenance refactors code and infrastructure to prevent potential breakdowns before they occur.",
    explanationBengali: "ভবিষ্যতের ঝুঁকি বা ক্র্যাশ এড়াতে আগেভাগেই ডেটাবেস ও সিকিউরিটি আপডেট করা হলো প্রিভেন্টিভ মেইনটেন্যান্স।"
  },
  {
    id: 15,
    question: "What does an Entity-Relationship (ER) diagram represent during Stage 2 database design?",
    options: [
      "Entities, attributes, and relational cardinalities (1:1, 1:N, M:N) between data models",
      "The physical layout of developer desks",
      "The electrical wiring inside the server room",
      "The font sizes used on web pages"
    ],
    correctAnswer: 0,
    explanation: "ER diagrams visually model data entities, attributes, and relational links before creating SQL tables.",
    explanationBengali: "ER ডায়াগ্রাম ডেটাবেসের সত্তা (Entity), বৈশিষ্ট্য (Attributes) ও তাদের সম্পর্ক প্রকাশ করে।"
  },
  {
    id: 16,
    question: "What is a 'Wireframe' in web design?",
    options: [
      "A skeletal visual schematic depicting page structure, element placement, and user flow without colors",
      "An electrical wire connecting computer monitors",
      "A software compiler error",
      "An automated unit testing framework"
    ],
    correctAnswer: 0,
    explanation: "Wireframes define layout hierarchy and UI element arrangement without cosmetic distractions.",
    explanationBengali: "ওয়্যারফ্রেম হলো একটি ওয়েব পেজের কঙ্কাল সদৃশ খসড়া ডিজাইন যা লেআউট ও ন্যাভিগেশন প্রদর্শন করে।"
  },
  {
    id: 17,
    question: "What is 'Scope Creep' in project management?",
    options: [
      "The uncontrolled addition of features without adjusting time, budget, or resources",
      "A virus that slows down internet connections",
      "A developer moving between desks",
      "A broken hyperlink on a web page"
    ],
    correctAnswer: 0,
    explanation: "Scope Creep refers to uncontrolled project expansion; strict Stage 1 SRS definitions prevent it.",
    explanationBengali: "স্কোপ ক্রিপ হলো প্রজেক্ট চলাকালে অনিয়ন্ত্রিতভাবে নতুন চাহিদা বৃদ্ধি পাওয়া।"
  },
  {
    id: 18,
    question: "In NetBeans Java Swing, which GUI component captures single-line textual user inputs?",
    options: [
      "JTextField",
      "JLabel",
      "JPanel",
      "JProgressBar"
    ],
    correctAnswer: 0,
    explanation: "`JTextField` allows users to enter and edit a single line of unformatted text.",
    explanationBengali: "`JTextField` ব্যবহারকারীকে এক লাইনের টেক্সট ইনপুট প্রদান করতে দেয়।"
  },
  {
    id: 19,
    question: "What does 'Boundary Value Analysis' test in Stage 4 QA?",
    options: [
      "Input values at the exact minimum, maximum, and threshold limits of acceptable ranges",
      "The physical perimeter of the school campus",
      "The signal strength of Wi-Fi routers",
      "The margin width of printed pages"
    ],
    correctAnswer: 0,
    explanation: "Boundary Value Analysis tests edge cases (e.g. 0, 1, 9999, 10000) where logic bugs most often hide.",
    explanationBengali: "বাউন্ডারি ভ্যালু অ্যানালাইসিস ইনপুটের প্রান্তিক মানগুলো (সর্বনিম্ন ও সর্বোচ্চ সীমা) পরীক্ষা করে।"
  },
  {
    id: 20,
    question: "What is the function of the Domain Name System (DNS) during deployment?",
    options: [
      "Resolving human-friendly domain names (e.g. www.codernaccotax.co.in) to server IP addresses",
      "Writing SQL queries automatically",
      "Encrypting hard drive partitions",
      "Creating HTML form elements"
    ],
    correctAnswer: 0,
    explanation: "DNS maps domain names into numerical IP addresses so client browsers can locate web servers.",
    explanationBengali: "DNS মানুষের পাঠযোগ্য ডোমেন নামকে সার্ভারের আইপি (IP) অ্যাড্রেসে রূপান্তর করে।"
  },
  {
    id: 21,
    question: "What security feature is provided by installing an SSL/TLS certificate on a web server?",
    options: [
      "Enables encrypted HTTPS communication, protecting sensitive transaction data from packet sniffing",
      "Increases computer download speeds by 500%",
      "Eliminates the need for writing unit tests",
      "Turns off server heating"
    ],
    correctAnswer: 0,
    explanation: "SSL/TLS encrypts browser-to-server traffic, guaranteeing data privacy and integrity.",
    explanationBengali: "SSL/TLS সার্টিফিকেট ডেটা এনক্রিপ্ট করে সুরক্ষিত HTTPS সংযোগ নিশ্চিত করে।"
  },
  {
    id: 22,
    question: "What is the standard progression of states in a Bug Tracking defect lifecycle?",
    options: [
      "New -> Assigned -> Open -> Fixed -> Retest -> Closed",
      "Closed -> Open -> Fixed -> New",
      "Assigned -> New -> Closed -> Retest",
      "Fixed -> Retest -> Open -> Deleted"
    ],
    correctAnswer: 0,
    explanation: "A defect moves from New -> Assigned -> Open -> Fixed -> Retest -> Closed.",
    explanationBengali: "বাগের সঠিক ট্র্যাকিং ধারা: New -> Assigned -> Open -> Fixed -> Retest -> Closed।"
  },
  {
    id: 23,
    question: "Why is database normalization (1NF, 2NF, 3NF) conducted during Stage 2 Design?",
    options: [
      "To eliminate data redundancy and prevent insertion, deletion, and update anomalies",
      "To make SQL tables completely invisible to users",
      "To change the language of MySQL to Hindi",
      "To increase the cost of database servers"
    ],
    correctAnswer: 0,
    explanation: "Normalization organizes table structures to eliminate duplicate data and guarantee referential integrity.",
    explanationBengali: "ডেটাবেস নরমালাইজেশন তথ্যের অপ্রয়োজনীয় পুনরাবৃত্তি এবং ডেটাবেস অ্যানোমালি দূর করে।"
  },
  {
    id: 24,
    question: "What is the difference between Alpha Testing and Beta Testing?",
    options: [
      "Alpha testing is done internally by the QA/dev team; Beta testing is done by real end-users in live environments",
      "Alpha testing uses Greek alphabet; Beta testing uses numbers",
      "Alpha testing is done after launch; Beta testing before coding",
      "Alpha testing tests hardware; Beta testing tests electricity"
    ],
    correctAnswer: 0,
    explanation: "Alpha testing is an internal controlled test; Beta testing is an external pre-release test with real users.",
    explanationBengali: "আলফা টেস্টিং ইন্টারনাল টিম করে, আর বেটা টেস্টিং বাস্তব পরিবেশে বাইরের আসল ব্যবহারকারীরা করে।"
  },
  {
    id: 25,
    question: "Which testing type simulates thousands of simultaneous user requests to evaluate server stability?",
    options: [
      "Load and Stress Testing",
      "Unit Testing",
      "White-Box Loop Testing",
      "Feasibility Study"
    ],
    correctAnswer: 0,
    explanation: "Load & Stress testing (e.g. using Apache JMeter) measures system throughput and breaking points under heavy traffic.",
    explanationBengali: "লোড ও স্ট্রেস টেস্টিং একসাথে হাজার হাজার ব্যবহারকারীর ট্রাফিক সিমুলেট করে সার্ভারের ক্ষমতা পরীক্ষা করে।"
  },
  {
    id: 26,
    question: "Scenario: 'A developer writes a Java method to calculate late fee charges on overdue bills.' Which stage is this?",
    options: [
      "Stage 1: Requirement Definition",
      "Stage 2: Design Phase",
      "Stage 3: Implementation / Coding Phase",
      "Deployment Phase"
    ],
    correctAnswer: 2,
    explanation: "Writing program logic in Java or other languages belongs to Stage 3: Implementation.",
    explanationBengali: "Java মেথড কোডিং করা হলো তৃতীয় পর্ব (Stage 3: Implementation)-এর কাজ।"
  },
  {
    id: 27,
    question: "Scenario: 'A system architect draws a Level 0 Context Data Flow Diagram (DFD) for an Online Electricity Portal.' Which stage is this?",
    options: [
      "Stage 1: Requirement Definition",
      "Stage 2: Design Phase (High-Level Design)",
      "Stage 3: Coding Phase",
      "Stage 4: Testing Phase"
    ],
    correctAnswer: 1,
    explanation: "Constructing DFDs and architectural schematics occurs during Stage 2: Design Phase.",
    explanationBengali: "DFD তৈরি করা হলো দ্বিতীয় পর্বের High-Level Design (HLD)-এর অংশ।"
  },
  {
    id: 28,
    question: "Which of the following describes the continuous User Feedback Loop?",
    options: [
      "Collecting live user suggestions, reviews, and bug reports to formulate requirements for the next software version",
      "An audio speaker loop creating high pitched noise",
      "An infinite loop that crashes the server",
      "A circular fiber optic cable"
    ],
    correctAnswer: 0,
    explanation: "The feedback loop funnels production user insights back into Stage 1 Requirements for continuous product evolution.",
    explanationBengali: "ফিডব্যাক লুপ ব্যবহারকারীর অভিজ্ঞতাকে পরবর্তী সফটওয়্যার ভার্সনের নতুন রিকোয়ারমেন্ট হিসেবে সংযুক্ত করে।"
  },
  {
    id: 29,
    question: "What percentage of total software lifecycle expenditure is typically attributed to post-deployment maintenance?",
    options: [
      "1% to 5%",
      "10% to 15%",
      "60% to 80%",
      "100%"
    ],
    correctAnswer: 2,
    explanation: "Industry studies consistently show that 60% to 80% of total lifecycle costs occur during post-deployment maintenance and updates.",
    explanationBengali: "সফটওয়্যারের মোট ব্যয়ের প্রায় ৬০% থেকে ৮০% খরচ হয় ডেপ্লয়মেন্ট-পরবর্তী মেইনটেন্যান্সে।"
  },
  {
    id: 30,
    question: "What is the ultimate benefit of following the 4 stages of web application development in CBSE Class 12 IT 802?",
    options: [
      "It delivers robust, secure, maintainable, and user-aligned software on time and within budget",
      "It ensures that software never needs to be updated",
      "It eliminates the need for computer monitors",
      "It guarantees 100% free internet for all citizens"
    ],
    correctAnswer: 0,
    explanation: "Following structured WADLC engineering principles guarantees high-quality, secure, scalable, and verified software deliverables.",
    explanationBengali: "এই ৪টি স্তর অনুসরণ করার ফলে সময়মতো, বাজেটের মধ্যে এবং ব্যবহারকারীর উপযোগী উচ্চমানের ও নিরাপদ সফটওয়্যার তৈরি করা সম্ভব হয়।"
  }
];

export default topic8_questions;
