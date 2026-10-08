const topic2_questions = [
  {
    id: 1,
    question: "What is the primary objective of the 'Design Phase' in the Web Application Development Lifecycle?",
    options: [
      "To interview the client to understand requirements",
      "To translate the requirements into visual, structural, and technical blueprints",
      "To write raw HTML and Java source code",
      "To host the application on a live cloud web server"
    ],
    correctAnswer: 1,
    explanation: "The Design Phase answers 'HOW' the system will look and operate by creating architectural blueprints, database schemas, and UI wireframes.",
    explanationBengali: "ডিজাইন ফেজের প্রধান উদ্দেশ্য হলো রিকোয়ারমেন্টগুলোকে আর্কিটেকচারাল ব্লুপ্রিন্ট, ডেটাবেস স্কিমা এবং UI ওয়্যারফ্রেমে রূপান্তর করা ('সিস্টেমটি কীভাবে কাজ করবে ও দেখাবে')।"
  },
  {
    id: 2,
    question: "Which of the following is considered a primary deliverable of the Design Phase?",
    options: [
      "Software Requirements Specification (SRS)",
      "Design Document Specification (DDS) including ER Schemas and UI Mockups",
      "Compiled .class Java bytecodes",
      "Final User Acceptance Sign-off Certificate"
    ],
    correctAnswer: 1,
    explanation: "The primary deliverable of the design stage is the Design Document Specification (DDS) containing ER diagrams, UI wireframes, and architecture charts.",
    explanationBengali: "ডিজাইন পর্বের মূল ডেলিভারেবল হলো DDS (Design Document Specification), যার মধ্যে ER ডায়াগ্রাম, UI ওয়্যারফ্রেম এবং সিস্টেম আর্কিটেকচার অন্তর্ভুক্ত থাকে।"
  },
  {
    id: 3,
    question: "In the 3-Tier Web Architecture, what constitutes the 'Presentation Tier'?",
    options: [
      "MySQL and PostgreSQL relational databases",
      "Java Servlets and Business Logic classes",
      "Client web browser rendering HTML, CSS, and JavaScript interfaces",
      "Database connection pooling drivers"
    ],
    correctAnswer: 2,
    explanation: "The Presentation Tier (Tier 1) consists of the user interface rendered in web browsers using HTML, CSS, and client-side JavaScript.",
    explanationBengali: "থ্রি-টিয়ার আর্কিটেকচারে প্রেজেন্টেশন টিয়ার (Tier 1) হলো ক্লায়েন্ট ওয়েব ব্রাউজারের ইউজার ইন্টারফেস (HTML, CSS ও JavaScript)।"
  },
  {
    id: 4,
    question: "Which tier in 3-Tier Architecture contains the core business rules and data processing algorithms?",
    options: [
      "Presentation Tier (Front-end)",
      "Application / Business Logic Tier (Middle tier)",
      "Data Tier (Back-end database)",
      "Network Transport Tier"
    ],
    correctAnswer: 1,
    explanation: "The Application Tier (Middle Tier) executes the business rules, calculations, and server logic (written in Java, Node.js, Python, etc.).",
    explanationBengali: "অ্যাপ্লিকেশন বা বিজনেস লজিক টিয়ার (মিডল টিয়ার) সমস্ত ব্যবসার নিয়ম, হিসাব-নিকাশ এবং সার্ভার লজিক সম্পাদন করে।"
  },
  {
    id: 5,
    question: "What does an Entity-Relationship (ER) Diagram represent during the database design sub-phase?",
    options: [
      "The layout of buttons and colors on a webpage",
      "Entities, their attributes, and relationships between data entities",
      "The network bandwidth between client and server",
      "The speed of CPU clock cycles"
    ],
    correctAnswer: 1,
    explanation: "An ER Diagram visually models the data structure, identifying real-world entities (e.g., Student, Course), their attributes, and cardinality/relationships.",
    explanationBengali: "ER ডায়াগ্রাম ডেটাবেসের সত্তা (Entity), তাদের বৈশিষ্ট্য (Attributes) এবং তাদের মধ্যকার সম্পর্ক (Relationships) গ্রাফের মাধ্যমে প্রকাশ করে।"
  },
  {
    id: 6,
    question: "What is a 'Wireframe' in web application UI design?",
    options: [
      "Physical copper ethernet cables connecting routers",
      "A low-fidelity visual schematic representing page layout, element placement, and navigational flow",
      "An automated unit test script in JUnit",
      "A compiled binary DLL file"
    ],
    correctAnswer: 1,
    explanation: "A wireframe is a skeletal outline or schematic of a web page that depicts element placement, layout hierarchy, and user interaction paths without colors or detailed graphics.",
    explanationBengali: "ওয়্যারফ্রেম হলো একটি ওয়েব পেজের কঙ্কাল সদৃশ খসড়া ডিজাইন (Schematic Layout), যা বাটনের অবস্থান ও ন্যাভিগেশন স্ট্রাকচার দেখায়।"
  },
  {
    id: 7,
    question: "High-Level Design (HLD) primarily focuses on:",
    options: [
      "Detailed variable names and loop counters in source code",
      "Overall system architecture, database engine selection, and major module communication",
      "Writing bug reports in JIRA",
      "Customer payment gateway settlement reconciliation"
    ],
    correctAnswer: 1,
    explanation: "HLD provides macro-level views: system architecture, multi-tier decomposition, communication protocols, and technology stack selection.",
    explanationBengali: "HLD (High-Level Design) সামগ্রিক সিস্টেম আর্কিটেকচার, ডেটাবেস ইঞ্জিন নির্বাচন ও মডিউলগুলোর যোগাযোগ ব্যবস্থার ব্লুপ্রিন্ট তৈরি করে।"
  },
  {
    id: 8,
    question: "Low-Level Design (LLD) focuses on:",
    options: [
      "Macro business vision",
      "Detailed database table schemas, data types, constraints, class methods, and exact algorithm logic",
      "Marketing brochures and sales presentations",
      "Domain name registrar negotiations"
    ],
    correctAnswer: 1,
    explanation: "LLD details individual table schemas (columns, primary/foreign keys), class diagrams, and specific method signatures before coding begins.",
    explanationBengali: "LLD (Low-Level Design) ডেটাবেস টেবিলের সুনির্দিষ্ট কলাম, প্রাইমারি/ফরেন কি, মেথড সিগনেচার এবং অ্যালগরিদম লজিক পুঙ্খানুপুঙ্খভাবে তৈরি করে।"
  },
  {
    id: 9,
    question: "Why is database normalization performed during the database design phase?",
    options: [
      "To increase font sizes on mobile screens",
      "To eliminate data redundancy, prevent update/delete anomalies, and ensure data integrity",
      "To make SQL queries execute without passwords",
      "To convert Java source code to machine code"
    ],
    correctAnswer: 1,
    explanation: "Normalization organizes tables to reduce redundancy and avoid insertion, deletion, and modification anomalies.",
    explanationBengali: "ডেটাবেস নরমালাইজেশন অপ্রয়োজনীয় ডেটা ডুপ্লিকেশন রোধ করে এবং ইনসার্ট, আপডেট ও ডিলিট অ্যানোমালি দূর করে ডেটার সঠিকতা বজায় রাখে।"
  },
  {
    id: 10,
    question: "In database design for an Online Shopping App, what links an `Orders` table to a `Customers` table?",
    options: [
      "A primary key in `Orders` referencing an attribute in `Payments`",
      "A foreign key `CustomerID` in `Orders` referencing the primary key `CustomerID` in `Customers`",
      "A client-side cookie stored in the user's browser",
      "A CSS class name"
    ],
    correctAnswer: 1,
    explanation: "Relational referential integrity is established via a foreign key (`CustomerID` in Orders referencing `CustomerID` in Customers).",
    explanationBengali: "`Orders` টেবিলের `CustomerID` ফরেন কি `Customers` টেবিলের প্রাইমারি কি `CustomerID`-কে রেফারেন্স করে সম্পর্ক স্থাপন করে।"
  },
  {
    id: 11,
    question: "What does a 'Navigation Tree' or 'Sitemap' depict during the web design stage?",
    options: [
      "The physical IP addresses of network routers",
      "The hierarchical page structure and browsing pathways of the website",
      "The family tree of the software developers",
      "The memory tree inside the RAM chips"
    ],
    correctAnswer: 1,
    explanation: "A navigation tree maps out how users transition between the homepage, categories, product details, cart, and checkout pages.",
    explanationBengali: "ন্যাভিগেশন ট্রি বা সাইটম্যাপ ওয়েবসাইটের বিভিন্ন পেজের শ্রেণিবিন্যাস এবং এক পেজ থেকে অন্য পেজে যাওয়ার লিঙ্ক স্ট্রাকচার দেখায়।"
  },
  {
    id: 12,
    question: "Which of the following diagrams models the flow of data through an information system?",
    options: [
      "Pie Chart",
      "Data Flow Diagram (DFD)",
      "Scatter Plot",
      "Gantt Chart"
    ],
    correctAnswer: 1,
    explanation: "Data Flow Diagrams (DFDs) visually map data inputs, processing steps, data stores, and output destinations.",
    explanationBengali: "Data Flow Diagram (DFD) সিস্টেমের মধ্যে ডেটা কীভাবে প্রবেশ করে, প্রসেস হয়, সেভ থাকে ও আউটপুট হিসেবে বের হয় তা প্রদর্শন করে।"
  },
  {
    id: 13,
    question: "Which role is primarily responsible for visual aesthetics, color harmony, button ergonomics, and user satisfaction?",
    options: [
      "Database Administrator (DBA)",
      "UI/UX Designer",
      "Network Cabling Technician",
      "Billing Accountant"
    ],
    correctAnswer: 1,
    explanation: "UI/UX designers craft visually intuitive interfaces, responsive typography, and effortless user interaction paths.",
    explanationBengali: "UI/UX ডিজাইনাররা ইউজার ইন্টারফেসের সৌন্দর্য, রঙের সামঞ্জস্য, বাটন এবং ব্যবহারকারীর সহজ অভিজ্ঞতার জন্য দায়ী।"
  },
  {
    id: 14,
    question: "What is 'Responsive Web Design' created during the design phase?",
    options: [
      "A website that only runs on Windows 98",
      "A layout design that automatically adapts smoothly across mobile smartphones, tablets, and desktops",
      "A web server that replies immediately to ping requests",
      "An automated email auto-responder"
    ],
    correctAnswer: 1,
    explanation: "Responsive web design uses flexible grids, fluid media, and CSS media queries so pages render optimally on all screen sizes.",
    explanationBengali: "রেসপনসিভ ওয়েব ডিজাইন এমন লেআউট তৈরি করে যা মোবাইল, ট্যাবলেট এবং ডেস্কটপ সব ডিভাইসের স্ক্রিনে সুন্দরভাবে মানিয়ে যায়।"
  },
  {
    id: 15,
    question: "What happens if the Design Phase is skipped or executed carelessly?",
    options: [
      "Development is faster and always defect-free",
      "Developers write inconsistent code, databases suffer redundancy, and the project requires costly architectural rework",
      "The website automatically wins design awards",
      "Web browsers refuse to open any URLs"
    ],
    correctAnswer: 1,
    explanation: "Skipping design leads to chaotic spaghetti code, mismatched database schemas, poor user experiences, and immense rework costs.",
    explanationBengali: "ডিজাইন ফেজ বাদ দিলে কোডে বিশৃঙ্খলা সৃষ্টি হয়, ডেটাবেসে ত্রুটি দেখা দেয় এবং পরবর্তীতে প্রজেক্ট পুনর্নির্মাণে বিপুল অর্থ ও সময় নষ্ট হয়।"
  },
  {
    id: 16,
    question: "In a 3-tier system, which tier is responsible for storing and retrieving records from physical disk storage?",
    options: [
      "Presentation Tier",
      "Data / Database Tier",
      "Client Browser Tier",
      "CSS Stylesheet Tier"
    ],
    correctAnswer: 1,
    explanation: "The Data Tier (Tier 3) comprises DBMS engines (MySQL, Oracle) that safely persist, index, and retrieve database records.",
    explanationBengali: "ডেটা বা ডেটাবেস টিয়ার (Tier 3) হার্ড ডিস্কে ডেটা নিরাপদে সংরক্ষণ, ইন্ডেক্সিং এবং রিট্রিভ করার কাজ করে।"
  },
  {
    id: 17,
    question: "During database design, which constraint ensures that an attribute cannot contain duplicate values across records?",
    options: [
      "CHECK constraint",
      "UNIQUE or PRIMARY KEY constraint",
      "DEFAULT constraint",
      "FOREIGN KEY without unique index"
    ],
    correctAnswer: 1,
    explanation: "PRIMARY KEY and UNIQUE constraints enforce distinct values across all rows in a table (e.g., Email or Phone).",
    explanationBengali: "PRIMARY KEY বা UNIQUE কনস্ট্রেইন্ট নিশ্চিত করে যে কলামের কোনো মান একাধিক সারিতে ডুপ্লিকেট হতে পারবে না।"
  },
  {
    id: 18,
    question: "What design artifact visually demonstrates the step-by-step decision-making logic of an algorithm?",
    options: [
      "Flowchart",
      "Invoice Bill",
      "Spreadsheet Balance Sheet",
      "Network Ping Log"
    ],
    correctAnswer: 0,
    explanation: "Flowcharts use standardized geometric symbols (diamonds for decisions, rectangles for processes) to map algorithmic logic.",
    explanationBengali: "ফ্লোচার্ট স্ট্যান্ডার্ড জ্যামিতিক চিহ্নের মাধ্যমে অ্যালগরিদমের প্রতিটি সিদ্ধান্ত ও পদক্ষেপের ধারাবাহিক চিত্র তুলে ধরে।"
  },
  {
    id: 19,
    question: "What is a 'Design System' or 'Style Guide' established during Stage 2?",
    options: [
      "A collection of standardized color palettes, typography, button states, and spacing rules",
      "A legal contract signed with electricity providers",
      "A list of banned IP addresses",
      "A hardware inventory of laptops"
    ],
    correctAnswer: 0,
    explanation: "A Design System provides unified design tokens, typography rules, color tokens, and UI components to maintain visual consistency.",
    explanationBengali: "ডিজাইন সিস্টেম হলো রঙের প্যালেট, ফন্ট, বাটন স্টাইল ইত্যাদির একটি স্ট্যান্ডার্ড গাইড যা পুরো অ্যাপ্লিকেশনে ভিজ্যুয়াল সামঞ্জস্য বজায় রাখে।"
  },
  {
    id: 20,
    question: "In high-level architecture design, what does 'Decoupling' mean?",
    options: [
      "Cutting power cables to shut down servers",
      "Designing system tiers so changes in the presentation tier do not break the underlying database layer",
      "Merging front-end and back-end into a single monolithic script",
      "Deleting user passwords from the server"
    ],
    correctAnswer: 1,
    explanation: "Decoupling separates concerns across tiers, enabling developers to modify front-end styles without altering database queries or business rules.",
    explanationBengali: "ডিকাপলিং (Decoupling) হলো সিস্টেমের লেয়ারগুলোকে আলাদা রাখা, যাতে ফ্রন্ট-এন্ড পরিবর্তন করলে ব্যাক-এন্ড বা ডেটাবেসে কোনো বিরূপ প্রভাব না পড়ে।"
  },
  {
    id: 21,
    question: "Which of the following is an input to the Design Phase?",
    options: [
      "The approved Software Requirements Specification (SRS)",
      "The final deployed production server",
      "The beta testing bug sign-off",
      "The invoice receipt of cloud hosting"
    ],
    correctAnswer: 0,
    explanation: "The approved SRS document from Stage 1 serves as the mandatory input for Stage 2 Design activities.",
    explanationBengali: "প্রথম পর্ব (Stage 1)-এর অনুমোদিত SRS ডকুমেন্টটি ডিজাইন ফেজের প্রধান ইনপুট হিসেবে ব্যবহৃত হয়।"
  },
  {
    id: 22,
    question: "What is the relationship between an `Author` and `Books` entity typically modeled as in an ER diagram?",
    options: [
      "One-to-One (1:1)",
      "One-to-Many (1:N) or Many-to-Many (M:N)",
      "Zero-to-Zero",
      "Independent disconnected entities"
    ],
    correctAnswer: 1,
    explanation: "One author can write many books (1:N), and multiple co-authors can write multiple books (M:N).",
    explanationBengali: "একজন লেখক একাধিক বই লিখতে পারেন (1:N) অথবা একাধিক যৌথ লেখক একাধিক বই লিখতে পারেন (M:N)।"
  },
  {
    id: 23,
    question: "During UI design, what is 'Form Validation Schema'?",
    options: [
      "Rules specifying mandatory fields, input formats (e.g. 10-digit mobile number, valid email), and error messages",
      "The hardware price of form scanning machines",
      "The font color of the footer",
      "The speed of internet downloading"
    ],
    correctAnswer: 0,
    explanation: "Form validation schemas define client-side and server-side rules for data cleanliness and error feedback before database insertion.",
    explanationBengali: "ফর্ম ভ্যালিডেশন স্কিমা হলো ইনপুট চেকিংয়ের নিয়ম (যেমন ১০ সংখ্যার মোবাইল নম্বর, সঠিক ইমেল ইত্যাদি) যা ভুল ডেটা এন্ট্রি প্রতিরোধ করে।"
  },
  {
    id: 24,
    question: "Which of the following tools is commonly used for creating digital UI/UX wireframes and mockups?",
    options: [
      "Figma / Adobe XD",
      "MySQL Workbench CLI",
      "Apache Tomcat",
      "GCC Compiler"
    ],
    correctAnswer: 0,
    explanation: "Figma, Adobe XD, and Sketch are industry-standard collaborative vector design tools used to create UI/UX wireframes.",
    explanationBengali: "Figma এবং Adobe XD হলো বহুল ব্যবহৃত আধুনিক UI/UX ওয়্যারফ্রেম এবং মকআপ তৈরির সফটওয়্যার।"
  },
  {
    id: 25,
    question: "At the end of Stage 2 (Design Phase), before proceeding to Coding (Stage 3), what critical milestone occurs?",
    options: [
      "The website is launched directly to millions of public users",
      "Design Review and Architecture Sign-off by lead architects and stakeholders",
      "The source code is compiled and deleted",
      "Users are billed their final subscription charges"
    ],
    correctAnswer: 1,
    explanation: "Before programmers write code, the architecture and design blueprints must pass a formal design review and obtain stakeholder approval.",
    explanationBengali: "কোডিং শুরু করার আগে প্রধান স্থপতি ও স্টেকহোল্ডারদের দ্বারা ডিজাইন রিভিউ এবং আর্কিটেকচার অনুমোদন (Sign-off) গ্রহণ করা বাধ্যতামূলক।"
  }
];

export default topic2_questions;
