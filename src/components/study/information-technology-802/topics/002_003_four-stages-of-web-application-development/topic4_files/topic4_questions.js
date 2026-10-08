const topic4_questions = [
  {
    id: 1,
    question: "What is the primary objective of Stage 4: Testing & Quality Assurance Phase?",
    options: [
      "To negotiate developer salaries",
      "To systematically discover defects, verify SRS compliance, and ensure software reliability and security",
      "To write the first draft of database schemas",
      "To format hard drives on the server"
    ],
    correctAnswer: 1,
    explanation: "The Testing Phase ensures that the software operates without defects, complies with all requirements outlined in the SRS, and performs securely under real-world conditions.",
    explanationBengali: "টেস্টিং ও কোয়ালিটি অ্যাসুরেন্স পর্বের মূল উদ্দেশ্য হলো সফটওয়্যারের সমস্ত বাগ বা ত্রুটি শনাক্ত করা এবং SRS অনুযায়ী নির্ভুল কার্যকারিতা নিশ্চিত করা।"
  },
  {
    id: 2,
    question: "Which type of testing focuses on validating individual functions, methods, or classes in isolation?",
    options: [
      "System Testing",
      "Unit Testing",
      "User Acceptance Testing (UAT)",
      "Load Stress Testing"
    ],
    correctAnswer: 1,
    explanation: "Unit testing tests individual, isolated components or methods (such as `calculateDiscount()`) to verify internal logic.",
    explanationBengali: "ইউনিট টেস্টিং (Unit Testing) আলাদাভাবে একক ফাংশন, মেথড বা ক্লাসের সঠিকতা যাচাই করে।"
  },
  {
    id: 3,
    question: "What is 'Integration Testing' in web application development?",
    options: [
      "Testing communication and data transfer between combined software modules or tiers",
      "Buying integrated circuits for computer motherboards",
      "Checking the color contrast of logos",
      "Testing only the database hardware"
    ],
    correctAnswer: 0,
    explanation: "Integration testing verifies that multiple modules (e.g., UI form, Java controller, and MySQL database) interact and exchange data correctly.",
    explanationBengali: "ইন্টিগ্রেশন টেস্টিং একাধিক মডিউল বা টিয়ারের মধ্যে ডেটা আদান-প্রদান এবং পারস্পরিক সংযোগের সঠিকতা পরীক্ষা করে।"
  },
  {
    id: 4,
    question: "What is 'Regression Testing'?",
    options: [
      "Testing software exclusively on older versions of Windows",
      "Re-running test cases after code modifications or bug fixes to ensure existing features remain unbroken",
      "Deleting source code when a test fails",
      "Running tests in reverse alphabetical order"
    ],
    correctAnswer: 1,
    explanation: "Regression testing ensures that recent bug fixes or code changes have not accidentally introduced new bugs or broken existing working features.",
    explanationBengali: "রিগ্রেশন টেস্টিং নিশ্চিত করে যে নতুন কোড যোগ করা বা বাগ ফিক্স করার ফলে পূর্বের কোনো চালু ফিচার নষ্ট হয়নি।"
  },
  {
    id: 5,
    question: "What does 'User Acceptance Testing' (UAT) determine?",
    options: [
      "Whether the software satisfies the real-world operational and business requirements of the client / end users",
      "Whether the developer knows how to type fast",
      "Whether the computer monitor has high brightness",
      "Whether the internet router cable is plugged in"
    ],
    correctAnswer: 0,
    explanation: "UAT is the final testing phase conducted by actual clients or users to give formal sign-off for live deployment.",
    explanationBengali: "UAT (User Acceptance Testing) হলো ক্লায়েন্ট বা আসল ব্যবহারকারীদের দ্বারা পরিচালিত চূড়ান্ত টেস্টিং যা নিশ্চিত করে সিস্টেমটি ব্যবসার সমস্ত চাহিদা পূরণ করেছে।"
  },
  {
    id: 6,
    question: "What is the difference between Alpha Testing and Beta Testing?",
    options: [
      "Alpha testing is conducted by the internal development/QA team; Beta testing is conducted by real end-users in a real-world environment",
      "Alpha testing uses Greek letters; Beta testing uses English words",
      "Alpha testing is done after deployment; Beta testing is done before coding",
      "Alpha testing tests hardware; Beta testing tests electricity"
    ],
    correctAnswer: 0,
    explanation: "Alpha testing is performed internally in a simulated lab environment, while Beta testing releases a pre-release version to a select group of external end-users.",
    explanationBengali: "আলফা টেস্টিং কোম্পানির ভেতরের ইন্টারনাল টিম করে, আর বেটা টেস্টিং বাস্তব পরিবেশে বাইরের নির্বাচিত ব্যবহারকারীরা করে।"
  },
  {
    id: 7,
    question: "Which of the following is a primary deliverable produced during Stage 4?",
    options: [
      "Software Requirements Specification (SRS)",
      "Test Plan, Test Cases, and Bug Defect Reports",
      "Database Normalization Schema (3NF)",
      "Initial Project Budget Estimate"
    ],
    correctAnswer: 1,
    explanation: "QA engineers produce comprehensive Test Plans, detailed Test Cases (with inputs, expected vs actual outputs), and Bug Defect Tracking Reports.",
    explanationBengali: "টেস্টিং পর্বের মূল ডেলিভারেবল হলো টেস্ট প্ল্যান, টেস্ট কেস এবং বাগ ডিফেক্ট ট্র্যাকিং রিপোর্ট।"
  },
  {
    id: 8,
    question: "What does 'Boundary Value Analysis' test in software QA?",
    options: [
      "Testing values at the extreme minimum, maximum, and outside edges of acceptable input ranges",
      "Testing the physical perimeter walls of the office building",
      "Testing the highest resolution of monitor screens",
      "Testing printer paper margins"
    ],
    correctAnswer: 0,
    explanation: "Boundary Value Analysis checks edge cases (e.g. entering 0, 1, 99, 100, 101 when input range is 1-100) where coding errors most frequently occur.",
    explanationBengali: "বাউন্ডারি ভ্যালু অ্যানালাইসিস ইনপুট রেঞ্জের একদম প্রান্তিক মানগুলো (যেমন সর্বনিম্ন, সর্বোচ্চ ও তার ঠিক বাইরের মান) টেস্ট করে।"
  },
  {
    id: 9,
    question: "What is 'Load and Stress Testing' in web applications?",
    options: [
      "Simulating high traffic spikes and heavy concurrent user requests to evaluate server stability and breaking points",
      "Weighing the physical server machine on a weighing scale",
      "Measuring the stress levels of the programmers",
      "Checking the strength of network cables"
    ],
    correctAnswer: 0,
    explanation: "Load testing evaluates system performance under expected user traffic, while stress testing pushes the system beyond maximum limits to observe recovery behavior.",
    explanationBengali: "লোড ও স্ট্রেস টেস্টিং একসাথে হাজার হাজার ব্যবহারকারীর ট্রাফিক সিমুলেট করে সার্ভারের স্থিতিশীলতা এবং সর্বোচ্চ সহনশীলতা পরীক্ষা করে।"
  },
  {
    id: 10,
    question: "What is 'Penetration Testing' (Pen-Testing)?",
    options: [
      "Simulating authorized cyberattacks to identify security vulnerabilities (e.g. SQL Injection, XSS, insecure cookies) before hackers exploit them",
      "Testing ballpoint pens used for writing documents",
      "Testing how deep a server rack can be pushed into a wall",
      "Measuring the download speed of video games"
    ],
    correctAnswer: 0,
    explanation: "Penetration testing audits software security by actively probing for vulnerabilities like SQL injection, cross-site scripting (XSS), and broken authentication.",
    explanationBengali: "পেনিট্রেশন টেস্টিং হলো সাইবার আক্রমণের অনুকরণ করে সিস্টেমের নিরাপত্তা ফাঁকফোকর বা দুর্বলতাগুলো আগেভাগে শনাক্ত করার প্রক্রিয়া।"
  },
  {
    id: 11,
    question: "In a standard Bug Tracking Lifecycle, what is the correct sequence of states for a defect?",
    options: [
      "Closed -> Open -> New -> Fixed",
      "New -> Assigned -> Open / In Progress -> Fixed -> Retest / Verified -> Closed",
      "Fixed -> New -> Retest -> Deleted",
      "Open -> Closed -> Reopen -> Ignored"
    ],
    correctAnswer: 1,
    explanation: "A bug is logged as New, assigned to a developer, worked on (Open), marked Fixed, retested by QA, and finally marked Closed if resolved.",
    explanationBengali: "বাগ ট্র্যাকিংয়ের সঠিক ধাপ: New -> Assigned -> Open / In Progress -> Fixed -> Retest / Verified -> Closed।"
  },
  {
    id: 12,
    question: "What is 'Black-Box Testing'?",
    options: [
      "Testing software without inspecting the internal source code or architecture, evaluating only inputs and outputs",
      "Testing computers inside a dark black room",
      "Testing only airplanes and flight recorders",
      "Testing hardware when the power is turned off"
    ],
    correctAnswer: 0,
    explanation: "Black-Box testing treats the system as an opaque box, validating software behavior against requirements without knowledge of internal code structure.",
    explanationBengali: "ব্ল্যাক-বক্স টেস্টিংয়ে কোডের ভেতরের গঠন না জেনে শুধুমাত্র ইনপুট প্রদান করে আউটপুটের সঠিকতা যাচাই করা হয়।"
  },
  {
    id: 13,
    question: "What is 'White-Box Testing'?",
    options: [
      "Testing the internal code structure, execution paths, branches, loops, and data flows with full knowledge of source code",
      "Painting the server room white",
      "Testing on white paper with a pencil",
      "Testing only daytime website traffic"
    ],
    correctAnswer: 0,
    explanation: "White-Box (or Glass-Box) testing analyzes internal logic, code paths, condition coverage, and statement coverage directly.",
    explanationBengali: "হোয়াইট-বক্স টেস্টিংয়ে সোর্স কোডের ভেতরের স্ট্রাকচার, লুপ, ব্রাঞ্চ এবং লজিক পুঙ্খানুপুঙ্খভাবে পরীক্ষা করা হয়।"
  },
  {
    id: 14,
    question: "What does 'Cross-Browser Compatibility Testing' verify?",
    options: [
      "That the web application renders, operates, and behaves identically across Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge",
      "That the user can download 10 different browsers at once",
      "That browsers can communicate without internet",
      "That the web browser never requires software updates"
    ],
    correctAnswer: 0,
    explanation: "Cross-browser testing guarantees that layout styles, JavaScript execution, and interactive elements work uniformly across all popular web browsers.",
    explanationBengali: "ক্রস-ব্রাউজার টেস্টিং নিশ্চিত করে যে ওয়েব অ্যাপ্লিকেশনটি Chrome, Firefox, Safari এবং Edge-সহ সমস্ত ব্রাউজারে সমানভাবে কাজ করছে।"
  },
  {
    id: 15,
    question: "Why is early bug detection during the testing phase economically vital for software companies?",
    options: [
      "Fixing a bug during testing is significantly cheaper and easier than fixing a catastrophic bug discovered by live customers after deployment",
      "Early bugs give developers free coffee vouchers",
      "Bugs automatically turn into marketing advertisements",
      "Early bugs allow companies to avoid paying taxes"
    ],
    correctAnswer: 0,
    explanation: "The cost of fixing defects escalates exponentially the later they are discovered; catching bugs before live deployment prevents brand damage and financial loss.",
    explanationBengali: "লাইভ প্রোডাকশনের পর বাগ ঠিক করার তুলনায় টেস্টিং পর্বে বাগ দূর করা অনেক সাশ্রয়ী এবং সহজ।"
  },
  {
    id: 16,
    question: "Which of the following describes a 'Test Case' in software testing?",
    options: [
      "A document specifying inputs, execution conditions, test procedures, and expected results for verifying a specific requirement",
      "The plastic suitcase used to carry laptops",
      "A court trial between developers and managers",
      "A cardboard box containing server hard drives"
    ],
    correctAnswer: 0,
    explanation: "A Test Case formally defines test ID, description, pre-conditions, input test data, step-by-step actions, and expected vs actual results.",
    explanationBengali: "টেস্ট কেস হলো একটি সুনির্দিষ্ট ডকুমেন্ট যা ইনপুট ডেটা, কার্যপদ্ধতি এবং প্রত্যাশিত ফলাফলের রূপরেখা তুলে ধরে।"
  },
  {
    id: 17,
    question: "What is 'Usability Testing'?",
    options: [
      "Evaluating how intuitive, accessible, user-friendly, and easy-to-navigate the web interface is for ordinary end users",
      "Testing if the mouse button makes a clicking sound",
      "Testing if the computer keyboard keys can be detached",
      "Measuring internet download limits"
    ],
    correctAnswer: 0,
    explanation: "Usability testing measures user satisfaction, navigation ease, clarity of error messages, and cognitive effort required to perform tasks.",
    explanationBengali: "ইউজাবিলিটি টেস্টিং সাধারণ ব্যবহারকারীর জন্য ইন্টারফেসটি কতখানি সহজ, বোধগম্য এবং ব্যবহারবান্ধব তা যাচাই করে।"
  },
  {
    id: 18,
    question: "What happens when a critical (Showstopper / Blocker) severity bug is discovered during testing?",
    options: [
      "The release is immediately halted until the high-priority bug is resolved and verified",
      "The bug is ignored and the website is launched immediately",
      "The entire development team is fired",
      "The testing server is permanently turned off"
    ],
    correctAnswer: 0,
    explanation: "Critical blocker bugs prevent core system functionality (e.g. payment gateway crash or login failure), halting deployment until resolved.",
    explanationBengali: "ব্লকার বা শো-স্টপার বাগ ধরা পড়লে রিলিজ স্থগিত করা হয় এবং বাগটি সমাধান না হওয়া পর্যন্ত লঞ্চ করা হয় না।"
  },
  {
    id: 19,
    question: "Which testing tool is widely used for automated web browser functional testing?",
    options: [
      "Selenium / Playwright",
      "Adobe Photoshop",
      "Microsoft Word",
      "VLC Media Player"
    ],
    correctAnswer: 0,
    explanation: "Selenium, Playwright, and Cypress are leading industry test automation frameworks used to programmatically click, type, and validate web pages.",
    explanationBengali: "Selenium এবং Playwright হলো ব্রাউজারে স্বয়ংক্রিয় টেস্টিং চালানোর সবচেয়ে জনপ্রিয় অটোমেশন টুল।"
  },
  {
    id: 20,
    question: "What is the purpose of 'Sanity / Smoke Testing'?",
    options: [
      "A quick preliminary test to check if the basic build is stable enough to proceed with deeper, rigorous testing",
      "Checking for smoke coming out of the server computer",
      "Testing air conditioning in the testing laboratory",
      "Testing if the developer's chair is comfortable"
    ],
    correctAnswer: 0,
    explanation: "Smoke testing verifies initial basic stability (e.g., app starts, login page opens) before executing comprehensive test suites.",
    explanationBengali: "স্মোক টেস্টিং হলো প্রাথমিক স্বাস্থ্য পরীক্ষা যা নিশ্চিত করে যে বিল্ডটি গভীর বিস্তারিত টেস্টিং শুরু করার মতো স্থিতিশীল আছে কি না।"
  },
  {
    id: 21,
    question: "In an Online Electricity Billing app, entering '-50 kWh' into the consumption field should result in:",
    options: [
      "A negative bill amount refunded automatically to the user",
      "A clean validation error message ('Units consumed must be a positive number') rejecting the form submission",
      "A server crash with database corruption",
      "The computer turning off"
    ],
    correctAnswer: 1,
    explanation: "Robust software validation rejects negative inputs gracefully with clear error guidance rather than generating erroneous computations.",
    explanationBengali: "নেগেটিভ ইনপুট দিলে সিস্টেমটি ক্র্যাশ না করে সুন্দরভাবে এরর মেসেজ দেখিয়ে সাবমিশন বাতিল করবে।"
  },
  {
    id: 22,
    question: "Which testing phase is executed immediately after unit testing and before system testing?",
    options: [
      "Integration Testing",
      "User Acceptance Testing",
      "Production Deployment",
      "Requirement Gathering"
    ],
    correctAnswer: 0,
    explanation: "The standard testing hierarchy is: Unit Testing -> Integration Testing -> System Testing -> Acceptance Testing.",
    explanationBengali: "স্ট্যান্ডার্ড টেস্টিং ধাপ: ইউনিট টেস্টিং -> ইন্টিগ্রেশন টেস্টিং -> সিস্টেম টেস্টিং -> ইউজার অ্যাকসেপ্টেন্স টেস্টিং (UAT)।"
  },
  {
    id: 23,
    question: "What is 'Accessibility Testing' (WCAG compliance)?",
    options: [
      "Ensuring the web application is usable for persons with disabilities (e.g., screen readers for visually impaired, keyboard navigation)",
      "Checking if the office door is unlocked",
      "Testing if Wi-Fi password can be guessed",
      "Checking if the monitor screen can be rotated"
    ],
    correctAnswer: 0,
    explanation: "Accessibility testing ensures compliance with WCAG standards so users with visual, motor, or auditory impairments can utilize digital services.",
    explanationBengali: "অ্যাক্সেসিবিলিটি টেস্টিং নিশ্চিত করে যে বিশেষ চাহিদাসম্পন্ন ব্যক্তিরাও (যেমন দৃষ্টিপ্রতিবন্ধী) স্ক্রিন রিডার ও কিবোর্ড দিয়ে সহজেই সাইটটি ব্যবহার করতে পারেন।"
  },
  {
    id: 24,
    question: "What is a 'Test Suite'?",
    options: [
      "A luxury hotel room booked for testers",
      "A curated collection of test cases grouped together for execution against a specific build or feature",
      "A brand of expensive formal suits worn by developers",
      "A desktop software that cleans hard drives"
    ],
    correctAnswer: 1,
    explanation: "A Test Suite bundles multiple test cases (e.g., Regression Suite, Smoke Suite, Billing Test Suite) for structured automated or manual execution.",
    explanationBengali: "টেস্ট স্যুট হলো সম্পর্কিত একাধিক টেস্ট কেসের একটি সংগ্রহ যা একসাথে কোনো নির্দিষ্ট ফিচারের ওপর চালানো হয়।"
  },
  {
    id: 25,
    question: "What formal document signifies that testing has concluded successfully and the product is approved for live deployment?",
    options: [
      "UAT Sign-off & Quality Acceptance Certificate",
      "Initial Project Invoice",
      "Hardware Purchase Receipt",
      "Software Requirements Document (SRS)"
    ],
    correctAnswer: 0,
    explanation: "The formal UAT Sign-off and QA Quality Certificate officially authorize the transition from Stage 4 (Testing) to live Production Deployment.",
    explanationBengali: "UAT সাইন-অফ এবং কোয়ালিটি অ্যাকসেপ্টেন্স সার্টিফিকেট নির্দেশ করে যে টেস্টিং সফলভাবে সম্পন্ন হয়েছে এবং প্রজেক্টটি লাইভ হোস্ট করার জন্য প্রস্তুত।"
  }
];

export default topic4_questions;
