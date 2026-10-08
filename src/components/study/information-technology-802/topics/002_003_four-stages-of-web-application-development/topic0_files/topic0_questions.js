const questions = [
  {
    "id": "q1",
    "question": "Q1: What are the four sequential stages of Web Application Development according to the CBSE Class XII IT (802) curriculum?",
    "options": [
      "(1) Requirement Definition, (2) Design, (3) Implementation (Coding), (4) Testing",
      "(1) Marketing, (2) Sales, (3) Accounting, (4) Taxation",
      "(1) Purchasing, (2) Storage, (3) Delivery, (4) Invoicing",
      "(1) Graphic Design, (2) Video Editing, (3) Audio Mixing, (4) Animation"
    ],
    "answer": "(1) Requirement Definition, (2) Design, (3) Implementation (Coding), (4) Testing",
    "explanation": "The standard Software Development Life Cycle (SDLC) for web applications follows these four core sequential phases.",
    "explanationBn": "ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্টের ৪টি প্রধান পর্যায় হলো: (১) প্রয়োজনীয়তা নির্ধারণ, (২) ডিজাইন, (৩) ইমপ্লিমেন্টেশন বা কোডিং, এবং (৪) টেস্টিং বা পরীক্ষা।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "(1) Requirement Definition, (2) Design..."
  },
  {
    "id": "q2",
    "question": "Q2: Why is following a structured software development methodology essential for web projects?",
    "options": [
      "To prevent project failure, avoid budget overruns, ensure security, and deliver software meeting user requirements",
      "To increase the physical weight of computers",
      "To make web pages load 100 times slower",
      "To permanently prevent users from clicking links"
    ],
    "answer": "To prevent project failure, avoid budget overruns, ensure security, and deliver software meeting user requirements",
    "explanation": "Structured life cycles provide predictable milestones, risk control, clear team deliverables, and quality assurance.",
    "explanationBn": "পরিকল্পিত ডেভেলপমেন্ট পদ্ধতি ব্যর্থতা এড়াতে, বাজেট নিয়ন্ত্রণ করতে এবং সঠিক গুণমান বজায় রাখতে সাহায্য করে।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "To prevent project failure, avoid budget..."
  },
  {
    "id": "q3",
    "question": "Q3: In which stage of web application development is the Software Requirements Specification (SRS) document compiled?",
    "options": [
      "Stage 1: Requirement Definition / Analysis Phase",
      "Stage 2: Design Phase",
      "Stage 3: Implementation / Coding Phase",
      "Stage 4: Testing Phase"
    ],
    "answer": "Stage 1: Requirement Definition / Analysis Phase",
    "explanation": "The SRS document formally details all functional descriptions, user roles, system scope, and constraints during Stage 1.",
    "explanationBn": "SRS (Software Requirements Specification) দলিলটি প্রথম পর্যায় বা Requirement Definition ধাপে তৈরি করা হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Stage 1: Requirement Definition..."
  },
  {
    "id": "q4",
    "question": "Q4: What is the primary focus of Stage 2 (Design Phase)?",
    "options": [
      "Creating architectural blueprints, UI/UX wireframes, database ER diagrams, and navigation flowcharts",
      "Writing thousands of lines of Java code",
      "Interviewing end-users to find out what features they want",
      "Finding syntax bugs in production code"
    ],
    "answer": "Creating architectural blueprints, UI/UX wireframes, database ER diagrams, and navigation flowcharts",
    "explanation": "The Design Phase answers 'HOW' the system will be built by designing visual layouts, database schemas, and data structures.",
    "explanationBn": "ডিজাইন ধাপে সিস্টেমের আর্কিটেকচার, ইউজার ইন্টারফেস (UI), ডেটাবেজ ER ডায়াগ্রাম ও ফ্লোচার্ট তৈরি করা হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Creating architectural blueprints, UI/UX wireframes..."
  },
  {
    "id": "q5",
    "question": "Q5: In which stage do developers actually write front-end HTML/CSS/JavaScript and back-end Java/SQL code?",
    "options": [
      "Stage 3: Implementation / Coding Phase",
      "Stage 1: Requirement Definition Phase",
      "Stage 2: Design Phase",
      "Stage 4: Testing Phase"
    ],
    "answer": "Stage 3: Implementation / Coding Phase",
    "explanation": "Implementation translates design mockups and database schemas into actual executable software code.",
    "explanationBn": "ইমপ্লিমেন্টেশন বা কোডিং ধাপে প্রোগ্রামাররা আসল সোর্স কোড (HTML, CSS, JS, Java, SQL) লেখেন।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Stage 3: Implementation / Coding..."
  },
  {
    "id": "q6",
    "question": "Q6: What is the primary purpose of Stage 4 (Testing & Quality Assurance Phase)?",
    "options": [
      "To execute the software with diverse inputs to discover bugs, verify functional requirements, and ensure reliability",
      "To negotiate the final project fee with the client",
      "To draw initial wireframes on paper",
      "To delete source code files from the server"
    ],
    "answer": "To execute the software with diverse inputs to discover bugs, verify functional requirements, and ensure reliability",
    "explanation": "Testing validates that the application functions correctly, securely, and without errors under real-world conditions.",
    "explanationBn": "টেস্টিং ধাপের মূল উদ্দেশ্য হলো সফটওয়্যারটি চালিয়ে ত্রুটি বা বাগ (Bugs) খুঁজে বের করা এবং গুণমান নিশ্চিত করা।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "To execute the software with diverse inputs..."
  },
  {
    "id": "q7",
    "question": "Q7: What happens if a software development team skips the Design phase and jumps directly into coding?",
    "options": [
      "Poor architecture, fragmented database tables, frequent code rewrites, and wasted development time",
      "The software runs 100 times faster",
      "The database automatically creates optimal tables",
      "All bugs are eliminated automatically"
    ],
    "answer": "Poor architecture, fragmented database tables, frequent code rewrites, and wasted development time",
    "explanation": "Skipping design leads to unstructured spaghetti code, un-normalized databases, and expensive refactoring.",
    "explanationBn": "ডিজাইন বাদ দিয়ে সরাসরি কোডিং শুরু করলে বিশৃঙ্খল কোড, ডেটাবেজ ত্রুটি এবং সময় ও অর্থের অপচয় ঘটে।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "Poor architecture, fragmented database..."
  },
  {
    "id": "q8",
    "question": "Q8: What is a 'Deliverable' in software project management?",
    "options": [
      "A tangible, verifiable output or artifact (such as an SRS document, ER diagram, or source code build) produced at the end of a phase",
      "A physical pizza delivered to the office",
      "An email containing office gossip",
      "A computer mouse purchased online"
    ],
    "answer": "A tangible, verifiable output or artifact (such as an SRS document, ER diagram, or source code build) produced at the end of a phase",
    "explanation": "Deliverables represent formal milestones that must be completed and reviewed before proceeding to subsequent stages.",
    "explanationBn": "ডেলিভারেবল হলো প্রতিটি ধাপের শেষে তৈরি হওয়া নির্দিষ্ট প্রামাণ্য ফলাফল বা দলিল (যেমন SRS বা ER ডায়াগ্রাম)।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "A tangible, verifiable output or artifact..."
  },
  {
    "id": "q9",
    "question": "Q9: Which phase follows immediately after Stage 4 (Testing) is successfully signed off?",
    "options": [
      "Deployment & Maintenance (Hosting on production servers and ongoing support)",
      "Returning to Stage 1 to start from scratch",
      "Permanently deleting the database",
      "Canceling the client contract"
    ],
    "answer": "Deployment & Maintenance (Hosting on production servers and ongoing support)",
    "explanation": "Once tested and approved, the application is deployed to live production servers and maintained over its operational life.",
    "explanationBn": "টেস্টিং সফলভাবে শেষ হওয়ার পর অ্যাপ্লিকেশনটি প্রোডাকশন সার্ভারে ডেপ্লয় (Deployment) ও রক্ষণাবেক্ষণ করা হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Deployment & Maintenance..."
  },
  {
    "id": "q10",
    "question": "Q10: In which phase would an architect decide whether to use a 3-Tier Client-Server architecture with MySQL and Java Servlets?",
    "options": [
      "Stage 2: Design Phase",
      "Stage 4: Testing Phase",
      "Stage 1: Requirement Definition Phase",
      "Post-Deployment Phase"
    ],
    "answer": "Stage 2: Design Phase",
    "explanation": "Technology stack selection and system architectural blueprints are formulated during the Design Phase.",
    "explanationBn": "সিস্টেমের আর্কিটেকচার ও টেকনোলজি স্ট্যাক (যেমন ৩-টিয়ার মডেল ও মাইএসকিউএল) নির্ধারণ করা হয় ডিজাইন ধাপে।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "Stage 2: Design Phase..."
  },
  {
    "id": "q11",
    "question": "Q11: Why is testing considered a continuous quality assurance process rather than a one-time afterthought?",
    "options": [
      "Because discovering defects early in development is dramatically cheaper and faster to fix than fixing live production bugs",
      "Because testing makes the software code longer",
      "Because clients refuse to look at working software",
      "Because computers cannot run code without testing"
    ],
    "answer": "Because discovering defects early in development is dramatically cheaper and faster to fix than fixing live production bugs",
    "explanation": "The cost of fixing software bugs increases exponentially the later they are detected in the lifecycle.",
    "explanationBn": "প্রাথমিক পর্যায়ে বাগ ধরা পড়লে তা সংশোধন করা অনেক সহজ ও কম ব্যয়বহুল হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "Because discovering defects early..."
  },
  {
    "id": "q12",
    "question": "Q12: Which role in a software engineering team is primarily responsible for compiling the SRS in Stage 1?",
    "options": [
      "Business Analyst / Systems Analyst",
      "Graphic Animator",
      "Network Cable Installer",
      "Office Security Guard"
    ],
    "answer": "Business Analyst / Systems Analyst",
    "explanation": "Business and System Analysts liaise with stakeholders to gather, analyze, and document requirements in the SRS.",
    "explanationBn": "বিজনেস অ্যানালিস্ট বা সিস্টেম অ্যানালিস্ট গ্রাহকের সাথে কথা বলে রিকোয়ারমেন্ট নির্ধারণ করেন।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "Business Analyst / Systems Analyst..."
  },
  {
    "id": "q13",
    "question": "Q13: Which role is primarily responsible for writing and executing unit test cases in Stage 4?",
    "options": [
      "Software Quality Assurance (QA) Engineer / Software Tester",
      "Accountant",
      "Human Resource Executive",
      "Marketing Sales Representative"
    ],
    "answer": "Software Quality Assurance (QA) Engineer / Software Tester",
    "explanation": "QA engineers write test plans, automated scripts, and test cases to validate software behavior.",
    "explanationBn": "সফটওয়্যার টেস্টার বা QA ইঞ্জিনিয়াররা টেস্ট কেস লিখে সফটওয়্যার পরীক্ষা করেন।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Software Quality Assurance (QA)..."
  },
  {
    "id": "q14",
    "question": "Q14: What is the relationship between the Four Stages of Web Application Development?",
    "options": [
      "They form a structured sequential pipeline where the outputs of one stage serve as the inputs for the next stage",
      "They are executed in completely random order with no dependencies",
      "All four stages must be completed on Day 1",
      "Only one stage is chosen per project"
    ],
    "answer": "They form a structured sequential pipeline where the outputs of one stage serve as the inputs for the next stage",
    "explanation": "Requirements feed into Design; Design feeds into Implementation; Implementation feeds into Testing.",
    "explanationBn": "প্রতিটি ধাপ পর্যায়ক্রমে কাজ করে এবং আগের ধাপের আউটপুট পরের ধাপের ইনপুট হিসেবে ব্যবহৃত হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "They form a structured sequential pipeline..."
  },
  {
    "id": "q15",
    "question": "Q15: What is 'Scope Creep' in web application lifecycle management?",
    "options": [
      "Uncontrolled expansion of project features and requirements without corresponding increases in time, budget, or resources",
      "A virus that infects web servers",
      "A slow mouse pointer speed",
      "A reduction in screen resolution"
    ],
    "answer": "Uncontrolled expansion of project features and requirements without corresponding increases in time, budget, or resources",
    "explanation": "Scope creep happens when new features are continuously added without formal change requests, jeopardizing deadlines.",
    "explanationBn": "স্কোপ ক্রিপ (Scope Creep) হলো পূর্বপরিকল্পনা ও বাজেট ছাড়া ক্রমাগত নতুন ফিচার যুক্ত করে প্রজেক্টকে বিলম্বিত করা।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Hard",
    "hint": "Uncontrolled expansion of project features..."
  },
  {
    "id": "q16",
    "question": "Q16: Which document serves as the formal legal and technical contract between the client and the web development team?",
    "options": [
      "Software Requirements Specification (SRS)",
      "Daily Coffee Receipt",
      "Employee Identity Card",
      "Computer Warranty Card"
    ],
    "answer": "Software Requirements Specification (SRS)",
    "explanation": "The signed SRS document defines the agreed scope, preventing disputes over expected functionality.",
    "explanationBn": "SRS দলিলটি ক্লায়েন্ট ও ডেভেলপার দলের মধ্যে প্রজেক্টের কাজের পরিধি নির্ধারণের মূল চুক্তি হিসেবে কাজ করে।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Software Requirements Specification (SRS)..."
  },
  {
    "id": "q17",
    "question": "Q17: In the web development lifecycle, what is 'Feasibility Study' conducted during Stage 1?",
    "options": [
      "An evaluation of whether the project is technically achievable, economically viable, and legally permissible within budget constraints",
      "Checking the color of the office walls",
      "Counting the number of chairs in the conference room",
      "Testing the building elevator speed"
    ],
    "answer": "An evaluation of whether the project is technically achievable, economically viable, and legally permissible within budget constraints",
    "explanation": "Feasibility analyzes technical, economic, and operational practicality before investing capital into development.",
    "explanationBn": "সম্ভাব্যতা যাচাই (Feasibility Study) প্রজেক্টটি প্রযুক্তিগত ও আর্থিকভাবে করা সম্ভব কি না তা বিচার করে।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "An evaluation of whether the project is technically..."
  },
  {
    "id": "q18",
    "question": "Q18: What is a 'Prototype' created during the early design stage?",
    "options": [
      "A preliminary visual or interactive model of the web application used to gather early user feedback before full-scale coding",
      "The final compiled production software",
      "An uninstalled operating system",
      "A database backup tape"
    ],
    "answer": "A preliminary visual or interactive model of the web application used to gather early user feedback before full-scale coding",
    "explanation": "Prototypes simulate user workflows to validate interface designs with stakeholders before heavy coding begins.",
    "explanationBn": "প্রোটোটাইপ হলো সফটওয়্যারের একটি প্রাথমিক মডেল যা দেখে ব্যবহারকারী তার মতামত জানাতে পারেন।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "A preliminary visual or interactive model..."
  },
  {
    "id": "q19",
    "question": "Q19: Which stage produces the Entity-Relationship (ER) diagram for the database schema?",
    "options": [
      "Stage 2: Design Phase",
      "Stage 3: Implementation Phase",
      "Stage 1: Requirement Definition Phase",
      "Stage 4: Testing Phase"
    ],
    "answer": "Stage 2: Design Phase",
    "explanation": "Database modeling, including ER diagrams, primary/foreign key definitions, and table normalization occurs in the Design Phase.",
    "explanationBn": "ডেটাবেজ ER ডায়াগ্রাম ও রিলেশনশিপ মডেলিং ডিজাইন ধাপে সম্পন্ন হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Stage 2: Design Phase..."
  },
  {
    "id": "q20",
    "question": "Q20: Why must coding adhere to standardized conventions (e.g. CamelCase naming, modular functions, indentation)?",
    "options": [
      "To ensure code readability, maintainability, team collaboration, and ease of future debugging",
      "To increase the cost of the computer",
      "To make the code impossible for other programmers to understand",
      "To turn the code into an encrypted secret"
    ],
    "answer": "To ensure code readability, maintainability, team collaboration, and ease of future debugging",
    "explanation": "Standardized coding practices allow multiple developers to collaborate seamlessly and maintain code efficiently.",
    "explanationBn": "নির্দিষ্ট কোডিং নিয়ম মেনে চললে কোড সহজে পড়া যায়, বাগ ঠিক করা সহজ হয় এবং অন্য ডেভেলপারদের কাজ করতে সুবিধা হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "To ensure code readability, maintainability..."
  },
  {
    "id": "q21",
    "question": "Q21: What is 'Regression Testing' in Stage 4?",
    "options": [
      "Re-running existing test cases after code modifications to verify that new bug fixes have not broken previously working features",
      "Deleting all old test files",
      "Testing only the first line of code",
      "Running code on an outdated 1980s computer"
    ],
    "answer": "Re-running existing test cases after code modifications to verify that new bug fixes have not broken previously working features",
    "explanation": "Regression testing ensures code stability by proving modifications haven't introduced unintended regressions.",
    "explanationBn": "নতুন কোড যোগ করার পর আগের কাজগুলো ঠিকমতো চলছে কি না তা নিশ্চিত করতে রিগ্রেশন টেস্টিং করা হয়।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Hard",
    "hint": "Re-running existing test cases after code..."
  },
  {
    "id": "q22",
    "question": "Q22: Which of the following correctly orders the four phases for building an Online Billing System?",
    "options": [
      "Requirement Analysis (List billing features) -> Design (Create ER diagram & Mockup) -> Implementation (Code Java & SQL) -> Testing (Execute test bills)",
      "Testing -> Implementation -> Design -> Requirement Analysis",
      "Implementation -> Requirement Analysis -> Testing -> Design",
      "Design -> Testing -> Implementation -> Requirement Analysis"
    ],
    "answer": "Requirement Analysis (List billing features) -> Design (Create ER diagram & Mockup) -> Implementation (Code Java & SQL) -> Testing (Execute test bills)",
    "explanation": "This represents the logical, sequential execution order of the four development stages.",
    "explanationBn": "সঠিক ক্রম: রিকোয়ারমেন্ট নির্ধারণ -> ডিজাইন -> ইমপ্লিমেন্টেশন -> টেস্টিং।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "Requirement Analysis -> Design -> Implementation -> Testing..."
  },
  {
    "id": "q23",
    "question": "Q23: What is 'User Acceptance Testing' (UAT)?",
    "options": [
      "Final phase of testing conducted by real end-users in a staging environment to approve formal delivery",
      "Testing done exclusively by robotic AI bots",
      "Testing done by the hardware manufacturer",
      "A test to check typing speed of users"
    ],
    "answer": "Final phase of testing conducted by real end-users in a staging environment to approve formal delivery",
    "explanation": "UAT validates that the web application satisfies real business operational workflows before production launch.",
    "explanationBn": "UAT হলো ব্যবহারকারীদের দ্বারা সরাসরি সফটওয়্যার পরীক্ষা করে চূড়ান্ত ছাড়পত্র প্রদান।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Medium",
    "hint": "Final phase of testing conducted by real end-users..."
  },
  {
    "id": "q24",
    "question": "Q24: What is 'Adaptive Maintenance' after a web application is deployed?",
    "options": [
      "Modifying the application to maintain compatibility with new operating systems, browser versions, or changing government legal regulations",
      "Fixing a crash bug reported on day 1",
      "Adding a video game into an accounting app",
      "Cleaning the computer keyboard with a cloth"
    ],
    "answer": "Modifying the application to maintain compatibility with new operating systems, browser versions, or changing government legal regulations",
    "explanation": "Adaptive maintenance updates software to stay functional in response to evolving external environment changes.",
    "explanationBn": "নতুন অপারেটিং সিস্টেম, ব্রাউজার আপডেট বা সরকারি আইনের সাথে তাল মেলাতে যে পরিবর্তন করা হয় তাকে Adaptive Maintenance বলে।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Hard",
    "hint": "Modifying the application to maintain compatibility..."
  },
  {
    "id": "q25",
    "question": "Q25: In CBSE Class XII IT board exams, how many marks are typically allocated to questions asking you to list or identify the 4 stages of web development?",
    "options": [
      "2 to 5 Marks (appearing in objective MCQs, short definitions, and scenario-based case studies)",
      "Zero marks",
      "100 marks for a single question",
      "Only optional bonus questions"
    ],
    "answer": "2 to 5 Marks (appearing in objective MCQs, short definitions, and scenario-based case studies)",
    "explanation": "The 4 stages of web development is a core foundational syllabus topic tested across Section A and Section B of the IT 802 paper.",
    "explanationBn": "সিবিএসই পরীক্ষায় এই অধ্যায় থেকে ২ থেকে ৫ নম্বরের প্রশ্ন প্রায় প্রতি বছরই আসে।",
    "topic": "Overview of the Web Application Development Lifecycle",
    "difficulty": "Easy",
    "hint": "2 to 5 Marks (appearing in objective MCQs..."
  }
];

export default questions;
