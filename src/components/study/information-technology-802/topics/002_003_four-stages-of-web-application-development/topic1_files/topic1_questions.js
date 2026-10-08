const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the primary objective of Stage 1 (Requirement Definition / Analysis Phase)?",
    "options": [
      "To understand stakeholder needs, define project scope, compile feature descriptions, identify constraints, and document the SRS",
      "To write Java database connectivity code",
      "To execute stress tests on production web servers",
      "To design color palettes and graphic icons"
    ],
    "answer": "To understand stakeholder needs, define project scope, compile feature descriptions, identify constraints, and document the SRS",
    "explanation": "Requirement Definition establishes the functional boundaries and deliverables before designing or coding begins.",
    "explanationBn": "প্রথম ধাপের মূল উদ্দেশ্য হলো গ্রাহকের প্রয়োজন বুঝে প্রজেক্টের কাজের পরিধি, সীমাবদ্ধতা ও ফিচারসমূহ বিস্তারিতভাবে নথিবদ্ধ করা।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "To understand stakeholder needs, define project scope..."
  },
  {
    "id": "q2",
    "question": "Q2: What does the acronym 'SRS' stand for in software engineering?",
    "options": [
      "Software Requirements Specification",
      "System Recovery Server",
      "Standard Routing Protocol",
      "Source Resource Schema"
    ],
    "answer": "Software Requirements Specification",
    "explanation": "An SRS is a formal document describing what the software will do and how it will perform.",
    "explanationBn": "SRS এর পূর্ণরূপ হলো Software Requirements Specification।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Software Requirements Specification..."
  },
  {
    "id": "q3",
    "question": "Q3: Which fact-finding technique involves one-on-one structured conversations with end-users and managers?",
    "options": [
      "Stakeholder Interviews",
      "Automated Unit Testing",
      "SQL Query Profiling",
      "Screen Wireframing"
    ],
    "answer": "Stakeholder Interviews",
    "explanation": "Interviews allow analysts to gather rich qualitative insights into existing problems and user expectations.",
    "explanationBn": "সরাসরি ইন্টারভিউ বা সাক্ষাৎকার গ্রহণের মাধ্যমে ব্যবহারকারীদের চাহিদা জানা যায়।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Stakeholder Interviews..."
  },
  {
    "id": "q4",
    "question": "Q4: Which of the following is an example of a 'Functional Requirement' for an Online Billing System?",
    "options": [
      "The system must allow a cashier to scan item barcodes, compute 18% GST, and generate a printable PDF invoice",
      "The server must have a blue chassis",
      "The system must look pretty",
      "The office must have fast air conditioning"
    ],
    "answer": "The system must allow a cashier to scan item barcodes, compute 18% GST, and generate a printable PDF invoice",
    "explanation": "Functional requirements describe specific behavioral capabilities and business operations the software must execute.",
    "explanationBn": "ফাংশনাল রিকোয়ারমেন্ট হলো নির্দিষ্ট কাজ যা সফটওয়্যারটিকে অবশ্যই সম্পন্ন করতে হবে (যেমন বারকোড স্ক্যান ও বিল তৈরি)।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "The system must allow a cashier to scan..."
  },
  {
    "id": "q5",
    "question": "Q5: Which of the following is an example of a 'Non-Functional Requirement'?",
    "options": [
      "The checkout page must load within 1.5 seconds under a concurrent load of 5,000 simultaneous shoppers",
      "Adding a book to the shopping cart",
      "Generating a monthly sales report",
      "Resetting a forgotten password"
    ],
    "answer": "The checkout page must load within 1.5 seconds under a concurrent load of 5,000 simultaneous shoppers",
    "explanation": "Non-functional requirements define performance, security, availability, and usability criteria rather than specific features.",
    "explanationBn": "নন-ফাংশনাল রিকোয়ারমেন্ট সফটওয়্যারের গতি, নিরাপত্তা ও লোড ধারণক্ষমতা নির্দেশ করে।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "The checkout page must load within 1.5 seconds..."
  },
  {
    "id": "q6",
    "question": "Q6: What is 'Technical Feasibility' in the initial analysis phase?",
    "options": [
      "Evaluating whether the required hardware, software technologies, and team engineering skills exist to build the proposed system",
      "Checking the price of office chairs",
      "Counting the number of light bulbs in the building",
      "Testing if the mouse works"
    ],
    "answer": "Evaluating whether the required hardware, software technologies, and team engineering skills exist to build the proposed system",
    "explanation": "Technical feasibility verifies that available technology and technical expertise can successfully realize the project vision.",
    "explanationBn": "প্রযুক্তিগত সম্ভাব্যতা যাচাই করে যে প্রজেক্টটি করার মতো হার্ডওয়্যার ও প্রোগ্রামার দলের দক্ষতা আছে কি না।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "Evaluating whether the required hardware..."
  },
  {
    "id": "q7",
    "question": "Q7: What is 'Economic Feasibility' (Cost-Benefit Analysis)?",
    "options": [
      "Determining whether the projected financial benefits and operational savings justify the estimated development and hosting costs",
      "Buying gold coins for the office",
      "Writing price tags on laptops",
      "Calculating bank interest rates in math class"
    ],
    "answer": "Determining whether the projected financial benefits and operational savings justify the estimated development and hosting costs",
    "explanation": "Economic feasibility assesses Return on Investment (ROI) to ensure the project makes sound financial sense.",
    "explanationBn": "আর্থিক সম্ভাব্যতা (Cost-Benefit Analysis) যাচাই করে যে প্রজেক্টের লাভ তার খরচের চেয়ে বেশি হবে কি না।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "Determining whether the projected financial..."
  },
  {
    "id": "q8",
    "question": "Q8: What is 'Scope Definition' in an Online Billing System project?",
    "options": [
      "Explicitly establishing what features are INCLUDED (e.g. barcode scan, GST calculation) and what are EXCLUDED (e.g. automated manufacturing robotics)",
      "Looking through a microscope",
      "Magnifying computer screens",
      "Counting the lines of code on day 1"
    ],
    "answer": "Explicitly establishing what features are INCLUDED (e.g. barcode scan, GST calculation) and what are EXCLUDED (e.g. automated manufacturing robotics)",
    "explanation": "Defining clear scope boundaries prevents misunderstandings and controls project delivery timelines.",
    "explanationBn": "স্কোপ ডেফিনিশন স্পষ্ট করে দেয় প্রজেক্টে কোন কোন ফিচার থাকবে এবং কোনগুলো থাকবে না।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Explicitly establishing what features are INCLUDED..."
  },
  {
    "id": "q9",
    "question": "Q9: Which of the following describes an operational constraint in an SRS?",
    "options": [
      "The system must run on low-bandwidth 2G mobile internet and work across older browsers without crashes",
      "The software must be written by only one student",
      "The database must be deleted every night",
      "The website must be invisible during the day"
    ],
    "answer": "The system must run on low-bandwidth 2G mobile internet and work across older browsers without crashes",
    "explanation": "Operational constraints specify environmental, regulatory, or hardware limitations the software must adhere to.",
    "explanationBn": "অপারেশনাল সীমাবদ্ধতা হলো বাস্তব সীমাবদ্ধতা (যেমন কম গতির ইন্টারনেটে কাজ করা)।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "The system must run on low-bandwidth..."
  },
  {
    "id": "q10",
    "question": "Q10: What is a 'User Story' in requirement analysis?",
    "options": [
      "A short, simple description of a feature told from the perspective of an end-user (e.g., 'As a patient, I want to book an online appointment so that I avoid clinic queues')",
      "A bedtime story told to programmers",
      "A biography of the computer manufacturer",
      "A fictional novel about robots"
    ],
    "answer": "A short, simple description of a feature told from the perspective of an end-user (e.g., 'As a patient, I want to book an online appointment so that I avoid clinic queues')",
    "explanation": "User stories express user needs in human-readable 'Role-Action-Benefit' formats.",
    "explanationBn": "ইউজার স্টোরি হলো ব্যবহারকারীর দৃষ্টিকোণ থেকে ফিচারের সহজ বিবরণ (যেমন: 'আমি একজন রোগী হিসেবে অনলাইন টিকিট বুক করতে চাই...')।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "A short, simple description of a feature..."
  },
  {
    "id": "q11",
    "question": "Q11: Why is requirement ambiguity dangerous in Stage 1?",
    "options": [
      "Vague or conflicting requirements lead to incorrect designs, wrong code, project delays, and costly rework",
      "It makes the computer run out of battery",
      "It makes the keyboard type random numbers",
      "It changes the monitor resolution"
    ],
    "answer": "Vague or conflicting requirements lead to incorrect designs, wrong code, project delays, and costly rework",
    "explanation": "Ambiguity causes developers to build features based on false assumptions, leading to client rejection.",
    "explanationBn": "রিকোয়ারমেন্ট অস্পষ্ট থাকলে ভুল ডিজাইনের কারণে পুরো প্রজেক্ট ব্যর্থ হতে পারে।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Vague or conflicting requirements lead to..."
  },
  {
    "id": "q12",
    "question": "Q12: Which document represents the official signed baseline for Stage 1 sign-off before commencing the Design Phase?",
    "options": [
      "Approved and Signed Software Requirements Specification (SRS)",
      "Daily team chat logs",
      "Initial whiteboard sketch",
      "Draft invoice estimate"
    ],
    "answer": "Approved and Signed Software Requirements Specification (SRS)",
    "explanation": "A signed SRS acts as the contract defining the project scope and baseline for testing.",
    "explanationBn": "স্বাক্ষরিত SRS দলিলটি প্রথম ধাপের আনুষ্ঠানিক ছাড়পত্র ও পরবর্তী কাজের মূল ভিত্তি।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Approved and Signed Software Requirements..."
  },
  {
    "id": "q13",
    "question": "Q13: Which fact-finding method involves analyzing physical paper bill books, ledger registers, and manual receipts of an existing organization?",
    "options": [
      "Document Analysis & Workflow Inspection",
      "Microphone Audio Recording",
      "SQL Query Optimization",
      "CSS Grid Inspection"
    ],
    "answer": "Document Analysis & Workflow Inspection",
    "explanation": "Examining existing paper documents reveals business rules, data fields, calculation formulas, and validation steps.",
    "explanationBn": "পুরনো নথিপত্র ও রসিদ বই পরীক্ষা করে বিদ্যমান কাজের প্রক্রিয়া বোঝা যায়।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "Document Analysis & Workflow..."
  },
  {
    "id": "q14",
    "question": "Q14: In an Online Hospital Management System, which of the following is a key user role identified during Stage 1?",
    "options": [
      "Doctor, Patient, Receptionist, and Pharmacist",
      "Truck Driver only",
      "Building Architect only",
      "Airplane Pilot only"
    ],
    "answer": "Doctor, Patient, Receptionist, and Pharmacist",
    "explanation": "Identifying distinct user roles and their specific access permissions is a core task of requirement definition.",
    "explanationBn": "হাসপাতাল সিস্টেমে ডাক্তার, রোগী, রিসেপশনিস্ট ও ফার্মাসিস্ট হলেন মূল ইউজার রোল।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Doctor, Patient, Receptionist..."
  },
  {
    "id": "q15",
    "question": "Q15: What is 'Operational Feasibility'?",
    "options": [
      "Evaluating whether the proposed software will be comfortably adopted and operated by current employees without disruptive organizational resistance",
      "Checking the physical speed of the elevator",
      "Testing the strength of the office roof",
      "Counting the number of desks"
    ],
    "answer": "Evaluating whether the proposed software will be comfortably adopted and operated by current employees without disruptive organizational resistance",
    "explanation": "Operational feasibility ensures the system integrates smoothly into existing human workflows and corporate culture.",
    "explanationBn": "অপারেশনাল সম্ভাব্যতা বিচার করে যে কর্মীরা নতুন সফটওয়্যারটি সহজে ব্যবহার করতে পারবে কি না।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "Evaluating whether the proposed software will be comfortably..."
  },
  {
    "id": "q16",
    "question": "Q16: Which section of the SRS lists third-party software dependencies (such as MySQL 8.0, Java 17 JDK, Apache Tomcat)?",
    "options": [
      "Software & Hardware Environment / Dependencies Section",
      "User Story Appendix",
      "Glossary of Terms",
      "Project History Section"
    ],
    "answer": "Software & Hardware Environment / Dependencies Section",
    "explanation": "The environment section defines operating systems, runtime JDKs, web servers, and database versions required.",
    "explanationBn": "সফটওয়্যার ও হার্ডওয়্যার ডিপেন্ডেন্সি অংশে প্রয়োজনীয় সফটওয়্যার ও ভার্সন উল্লেখ থাকে।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "Software & Hardware Environment..."
  },
  {
    "id": "q17",
    "question": "Q17: What is 'Questionnaire / Survey' method in requirement elicitation?",
    "options": [
      "Distributing structured multiple-choice forms to hundreds of potential users to gather quantitative usage requirements",
      "Taking an offline written board examination",
      "Asking random strangers on the street for money",
      "Answering phone calls from telemarketers"
    ],
    "answer": "Distributing structured multiple-choice forms to hundreds of potential users to gather quantitative usage requirements",
    "explanation": "Questionnaires efficiently collect broad feedback from large, geographically dispersed user groups.",
    "explanationBn": "অনেক ব্যবহারকারীর মতামত ও চাহিদা একসাথে সংগ্রহের জন্য প্রশ্নপত্র বা সার্ভে ব্যবহার করা হয়।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Distributing structured multiple-choice forms..."
  },
  {
    "id": "q18",
    "question": "Q18: What is 'Data Dictionary' compilation initiated during requirement analysis?",
    "options": [
      "A centralized repository listing definitions, data types, lengths, and validation constraints of all business data fields",
      "An English-to-Bengali language book",
      "A book containing software passwords",
      "A list of employee home addresses"
    ],
    "answer": "A centralized repository listing definitions, data types, lengths, and validation constraints of all business data fields",
    "explanation": "A data dictionary defines field names, allowable formats (e.g. Phone: 10 digits), and meanings across the project.",
    "explanationBn": "ডেটা ডিকশনারিতে সমস্ত ফিল্ডের নাম, ডেটা টাইপ ও ভ্যালিডেশন নিয়ম গুছিয়ে রাখা হয়।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Hard",
    "hint": "A centralized repository listing definitions..."
  },
  {
    "id": "q19",
    "question": "Q19: How does the Requirement Definition phase protect a client from unexpected cost escalation?",
    "options": [
      "By locking in the agreed feature set and acceptance criteria in the SRS before development expenses commence",
      "By giving the client free computers",
      "By deleting all project records",
      "By postponing the project for 10 years"
    ],
    "answer": "By locking in the agreed feature set and acceptance criteria in the SRS before development expenses commence",
    "explanation": "Clear scope definition prevents unforeseen scope expansion and associated financial cost overruns.",
    "explanationBn": "কাজের পরিধি আগেই নির্দিষ্ট করে নিলে অতিরিক্ত কাজের জন্য অনাকাঙ্ক্ষিত খরচ বাড়ার ঝুঁকি থাকে না।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "By locking in the agreed feature set..."
  },
  {
    "id": "q20",
    "question": "Q20: Which of the following is NOT an activity performed in Stage 1?",
    "options": [
      "Writing SQL database trigger procedures in MySQL Workbench",
      "Interviewing billing store managers",
      "Analyzing existing paper invoice templates",
      "Compiling the SRS document"
    ],
    "answer": "Writing SQL database trigger procedures in MySQL Workbench",
    "explanation": "Writing SQL code is performed in Stage 3 (Implementation), NOT in Stage 1 (Requirement Definition).",
    "explanationBn": "এসকিউএল কোড লেখা হলো ইমপ্লিমেন্টেশন বা কোডিং ধাপের কাজ, রিকোয়ারমেন্ট নির্ধারণের নয়।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Writing SQL database trigger procedures..."
  },
  {
    "id": "q21",
    "question": "Q21: What is 'Traceability' in requirement management?",
    "options": [
      "The ability to trace every design element, code module, and test case back to a specific requirement in the SRS",
      "Tracking the delivery van on GPS",
      "Tracing a drawing on tracing paper",
      "Tracking employee lunch hours"
    ],
    "answer": "The ability to trace every design element, code module, and test case back to a specific requirement in the SRS",
    "explanation": "Requirements traceability matrices ensure that all requested features are implemented and tested completely.",
    "explanationBn": "ট্রেসিবিলিটি নিশ্চিত করে যে প্রতিটি ফিচার ডিজাইনে আছে, কোড করা হয়েছে এবং টেস্ট করা হয়েছে।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Hard",
    "hint": "The ability to trace every design element..."
  },
  {
    "id": "q22",
    "question": "Q22: In an Online Hotel Reservation SRS, which feature represents a core business rule?",
    "options": [
      "A room cannot be booked by two different customers for overlapping check-in/check-out dates",
      "The hotel building must have 5 floors",
      "All guests must wear blue shirts",
      "The website must only be opened on Sundays"
    ],
    "answer": "A room cannot be booked by two different customers for overlapping check-in/check-out dates",
    "explanation": "Business rules define organizational constraints and logical invariants governing transaction validity.",
    "explanationBn": "বিজনেস রুল হলো ব্যবসায়িক নীতি (যেমন একই রুম একই তারিখে দুজন বুক করতে পারবে না)।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "A room cannot be booked by two different customers..."
  },
  {
    "id": "q23",
    "question": "Q23: What is 'Schedule Feasibility' in project planning?",
    "options": [
      "Determining whether the web application can be built and launched before a critical business deadline (e.g. before the festive shopping season)",
      "Checking the railway train timetable",
      "Looking at the office wall calendar",
      "Setting an alarm clock"
    ],
    "answer": "Determining whether the web application can be built and launched before a critical business deadline (e.g. before the festive shopping season)",
    "explanation": "Schedule feasibility ensures that milestones and release dates are realistic given team capacity.",
    "explanationBn": "সময়সীমার সম্ভাব্যতা যাচাই করে যে নির্দিষ্ট ডেডলাইনের মধ্যে কাজটি শেষ করা সম্ভব কি না।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Medium",
    "hint": "Determining whether the web application can be built..."
  },
  {
    "id": "q24",
    "question": "Q24: In CBSE Class XII IT (802) board questions, if a prompt says: 'A team is interviewing store managers to compile a list of required features for an online billing system', which stage is this?",
    "options": [
      "Stage 1: Requirement Definition / Analysis Phase",
      "Stage 2: Design Phase",
      "Stage 3: Implementation Phase",
      "Stage 4: Testing Phase"
    ],
    "answer": "Stage 1: Requirement Definition / Analysis Phase",
    "explanation": "Interviewing users to list needed features is the defining activity of the Requirement Definition Phase.",
    "explanationBn": "ফিচারের তালিকা তৈরির জন্য সাক্ষাৎকার নেওয়া হলো প্রথম ধাপ বা Requirement Definition।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Stage 1: Requirement Definition..."
  },
  {
    "id": "q25",
    "question": "Q25: Why is the SRS called the 'Single Source of Truth' for a web application project?",
    "options": [
      "Because designers, front-end developers, back-end coders, testers, and clients all rely on it as the authoritative reference for what the system must deliver",
      "Because it is the only file stored on the computer",
      "Because it can never be edited again",
      "Because it was written by the CEO"
    ],
    "answer": "Because designers, front-end developers, back-end coders, testers, and clients all rely on it as the authoritative reference for what the system must deliver",
    "explanation": "The SRS aligns all stakeholders to a single shared understanding of system scope and acceptance criteria.",
    "explanationBn": "SRS হলো প্রজেক্টের কেন্দ্রীয় নির্দেশিকা যা ডিজাইনার, কোডার ও টেস্টার সবাই মেনে চলেন।",
    "topic": "Stage 1: Requirement Definition / Analysis Phase",
    "difficulty": "Easy",
    "hint": "Because designers, front-end developers, back-end..."
  }
];

export default questions;
