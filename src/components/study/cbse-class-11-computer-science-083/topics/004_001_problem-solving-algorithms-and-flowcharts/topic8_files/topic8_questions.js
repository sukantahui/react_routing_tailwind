export const topic8Questions = [
  {
    id: "t8_q1",
    question: "Which of the following documents is created FIRST during the software problem-solving lifecycle?",
    options: [
      "User Manual",
      "Problem Definition and Requirement Specification",
      "Compiled Binary File",
      "Marketing Brochure"
    ],
    correct: 1,
    explanationEn: "Problem analysis and requirements specification is the foundational first phase before any algorithm or code is created.",
    explanationBn: "সফটওয়্যার সমস্যা সমাধানের জীবনচক্রে অ্যালগরিদম বা কোডিং শুরু করার আগে প্রথমে সমস্যার প্রয়োজনীয়তা ও স্পেসিফিকেশন ডকুমেন্ট প্রস্তুত করা হয়।"
  },
  {
    id: "t8_q2",
    question: "Why is documentation considered an essential phase in software development?",
    options: [
      "It allows future developers and maintenance teams to understand, modify, and extend the codebase easily",
      "It uses up extra disk space",
      "It is required by the computer monitor",
      "It prevents the CPU from heating"
    ],
    correct: 0,
    explanationEn: "Comprehensive documentation ensures maintainability, ease of debugging, and enables smooth knowledge transfer among engineering teams.",
    explanationBn: "সঠিক ডকুমেন্টেশন থাকলে ভবিষ্যতে অন্য প্রোগ্রামাররা সহজেই কোড বুঝতে, সংশোধন করতে এবং নতুন ফিচার যোগ করতে পারে।"
  },
  {
    id: "t8_q3",
    question: "Which pillar of computational thinking involves filtering out unnecessary details to create a reusable model?",
    options: [
      "Decomposition",
      "Abstraction",
      "Pattern Recognition",
      "Debugging"
    ],
    correct: 1,
    explanationEn: "Abstraction focuses strictly on core relevant details while concealing unnecessary complexities.",
    explanationBn: "অ্যাবস্ট্রাকশন (Abstraction) অপ্রয়োজনীয় জটিলতা ও বিবরণ বাদ দিয়ে মূল ও প্রাসঙ্গিক তথ্যের উপর আলোকপাত করে।"
  },
  {
    id: "t8_q4",
    question: "In algorithm analysis, what does the property of 'Definiteness' mandate?",
    options: [
      "Every instruction must be completely clear, unambiguous, and have exactly one interpretation",
      "The algorithm must run indefinitely",
      "The algorithm must use Python 3",
      "The algorithm must be 100 lines long"
    ],
    correct: 0,
    explanationEn: "Definiteness guarantees that every operation in the algorithm is rigorously defined without ambiguity.",
    explanationBn: "Definiteness নির্দেশ করে যে প্রতিটি ধাপ সুস্পষ্ট এবং দ্বিধাহীন হতে হবে যাতে কোনো বিভ্রান্তি না থাকে।"
  },
  {
    id: "t8_q5",
    question: "Which ANSI symbol is used to represent arithmetic operations such as `Area = 0.5 * Base * Height` in a flowchart?",
    options: [
      "Parallelogram",
      "Rectangle (Process)",
      "Diamond",
      "Oval"
    ],
    correct: 1,
    explanationEn: "Arithmetic assignments and computations are represented inside the Process Rectangle.",
    explanationBn: "গাণিতিক হিসাব এবং অ্যাসাইনমেন্ট স্টেটমেন্ট আয়তক্ষেত্র (Process Rectangle) প্রতীকের মধ্যে লেখা হয়।"
  },
  {
    id: "t8_q6",
    question: "Which symbol connects two parts of a flowchart that reside on the SAME physical page?",
    options: [
      "Off-page connector (Pentagon)",
      "On-page connector (Small Circle)",
      "Decision Diamond",
      "Terminal Oval"
    ],
    correct: 1,
    explanationEn: "Small circles are used as on-page connectors to prevent crisscrossing lines on a single page.",
    explanationBn: "একই পৃষ্ঠায় একাধিক লাইনের জটিলতা ও ক্রসিং এড়াতে বৃত্তাকার On-page Connector ব্যবহার করা হয়।"
  },
  {
    id: "t8_q7",
    question: "Which control structure is used to solve the problem of finding whether a person is eligible to vote (Age >= 18)?",
    options: [
      "Sequential Structure only",
      "Decision-Making (Selection) Structure",
      "Infinite Iteration",
      "Connector Symbol"
    ],
    correct: 1,
    explanationEn: "Eligibility involves testing a condition (`Age >= 18`), which requires a decision-making (if-else) control structure.",
    explanationBn: "ভোটাধিকার যোগ্যতা যাচাইয়ে শর্ত পরীক্ষা (`Age >= 18`) প্রয়োজন, যা সিলেকশন বা ডিসিশন স্ট্রাকচারের উদাহরণ।"
  },
  {
    id: "t8_q8",
    question: "What is the primary difference between a pre-test loop and a post-test loop?",
    options: [
      "Pre-test loops check conditions before loop body execution; post-test loops check condition after executing the body at least once",
      "Pre-test loops run only at night",
      "Post-test loops cannot be written in pseudocode",
      "There is no difference"
    ],
    correct: 0,
    explanationEn: "Pre-test loops (like `while`) evaluate condition before entering; post-test loops (like `repeat-until` or `do-while`) evaluate after executing the body.",
    explanationBn: "প্রি-টেস্ট লুপ শুরুতে শর্ত দেখে, আর পোস্ট-টেস্ট লুপে অন্তত একবার কাজ সম্পন্ন করার পর শেষে শর্ত যাচাই করা হয়।"
  },
  {
    id: "t8_q9",
    question: "What is the output of the algorithm:\nSET a = 12\nSET b = 18\nWHILE b != 0 DO\n    SET t = b\n    SET b = a MOD b\n    SET a = t\nENDWHILE\nOUTPUT a",
    options: [
      "6",
      "12",
      "18",
      "0"
    ],
    correct: 0,
    explanationEn: "This is Euclid's algorithm to compute the GCD of 12 and 18. Step 1: t=18, b=12, a=18; Step 2: t=12, b=6, a=12; Step 3: t=6, b=0, a=6. Output is 6.",
    explanationBn: "১২ ও ১৮ এর গসাগু (GCD) নির্ণয়ের ইউক্লিড অ্যালগরিদম। চূড়ান্ত মান ৬।"
  },
  {
    id: "t8_q10",
    question: "In Python, which function converts a string representation of an integer to a numeric integer?",
    options: [
      "`str()`",
      "`int()`",
      "`float()`",
      "`type()`"
    ],
    correct: 1,
    explanationEn: "`int()` parses and converts a valid string or float into an integer type.",
    explanationBn: "`int()` ফাংশন স্ট্রিং মানকে পূর্ণসংখ্যায় (Integer) রূপান্তর করে।"
  },
  {
    id: "t8_q11",
    question: "What is the outcome of desk checking an algorithm before writing code?",
    options: [
      "It wastes time",
      "It helps find and eliminate logical bugs early before syntax-level debugging",
      "It increases computer electricity consumption",
      "It makes the computer keyboard obsolete"
    ],
    correct: 1,
    explanationEn: "Early defect detection via desk checking drastically reduces development time and debugging complexity.",
    explanationBn: "কোড লেখার আগেই লজিক্যাল ভুল শনাক্ত ও সমাধান করে সময় এবং শ্রম সাশ্রয় করে।"
  },
  {
    id: "t8_q12",
    question: "What type of error is present in this Python statement: `print(5 / 0)`?",
    options: [
      "Syntax Error",
      "Runtime Error (ZeroDivisionError)",
      "Logical Error",
      "Hardware Error"
    ],
    correct: 1,
    explanationEn: "Dividing by zero is mathematically undefined and triggers a `ZeroDivisionError` at runtime.",
    explanationBn: "শূন্য দিয়ে ভাগ করার ফলে প্রোগ্রাম চলাকালীন রানটাইম এরর (`ZeroDivisionError`) তৈরি হয়।"
  },
  {
    id: "t8_q13",
    question: "Which flowchart symbol must have at least one incoming flow line and zero outgoing flow lines?",
    options: [
      "Start Terminal",
      "Stop / End Terminal",
      "Process Rectangle",
      "Decision Diamond"
    ],
    correct: 1,
    explanationEn: "The Stop/End oval is the termination boundary: it receives incoming flow lines and has 0 outgoing lines.",
    explanationBn: "Stop বা End ওভাল হলো সমাপ্তি চিহ্ন, এতে কন্ট্রোল এসে থামে তাই এর কোনো নির্গমন লাইন থাকে না।"
  },
  {
    id: "t8_q14",
    question: "In pseudocode, what does the keyword `BREAK` do?",
    options: [
      "Immediately terminates and exits the enclosing loop",
      "Pauses for user input",
      "Shuts down the operating system",
      "Skips only the next line"
    ],
    correct: 0,
    explanationEn: "`BREAK` forces an immediate exit from the active loop construct.",
    explanationBn: "`BREAK` স্টেটমেন্ট বর্তমান লুপের পুনরাবৃত্তি সাথে সাথে বন্ধ করে লুপ থেকে বের হয়ে আসে।"
  },
  {
    id: "t8_q15",
    question: "What does an accumulator variable in an algorithm do?",
    options: [
      "Stores CPU temperature",
      "Collects and accumulates running results (sums, products) across loop cycles",
      "Counts characters in the file",
      "Draws flowcharts automatically"
    ],
    correct: 1,
    explanationEn: "An accumulator maintains running progressive values across successive loop iterations.",
    explanationBn: "অ্যাকিউমুলেটর লুপের প্রতিটি আবর্তনে ফলাফল বা যোগফল ধারাবাহিকভাবে জমা রাখে।"
  },
  {
    id: "t8_q16",
    question: "Which of the following is an example of Pattern Recognition in problem solving?",
    options: [
      "Noticing that calculating the sum of 1 to N uses the same arithmetic progression formula as computing grade totals",
      "Changing monitor brightness",
      "Naming a variable `x`",
      "Drawing a diamond"
    ],
    correct: 0,
    explanationEn: "Pattern recognition identifies recurring mathematical models or structural similarities across different problem domains.",
    explanationBn: "বিভিন্ন সমস্যার মধ্যে মিল বা সাধারণ প্যাটার্ন শনাক্ত করে পূর্বের সমাধানের সূত্র প্রয়োগ করা।"
  },
  {
    id: "t8_q17",
    question: "What is the purpose of testing with boundary/edge cases (e.g., N=0, N=1, negative inputs)?",
    options: [
      "To test whether the algorithm handles edge conditions gracefully without crashing or producing incorrect results",
      "To break the monitor",
      "To make the code look longer",
      "To test internet bandwidth"
    ],
    correct: 0,
    explanationEn: "Edge cases reveal hidden boundary flaws (such as division by zero or off-by-one errors) that normal test cases miss.",
    explanationBn: "প্রান্তিক মান যাচাই করলে অস্বাভাবিক বা শূন্য সংক্রান্ত জটিলতায় কোড ক্র্যাশ করে কিনা তা নিশ্চিত হওয়া যায়।"
  },
  {
    id: "t8_q18",
    question: "Which of the following is a characteristic of effective pseudocode?",
    options: [
      "It uses consistent indentation and clear language-independent keywords",
      "It relies on obscure machine code numbers",
      "It must have semicolons after every word",
      "It cannot be understood by humans"
    ],
    correct: 0,
    explanationEn: "Effective pseudocode is clean, readable, language-independent, and utilizes standard indentation.",
    explanationBn: "ভালো সিউডোকোড সবসময় সহজবোধ্য, সার্বজনীন কিওয়ার্ডযুক্ত এবং সুশৃঙ্খল ইন্ডেন্টেশন মেনে চলে।"
  },
  {
    id: "t8_q19",
    question: "What is the output of the following dry run snippet?\nSET count = 1\nSET fact = 1\nWHILE count <= 3 DO\n    SET fact = fact * count\n    SET count = count + 1\nENDWHILE\nOUTPUT fact",
    options: [
      "3",
      "6",
      "9",
      "1"
    ],
    correct: 1,
    explanationEn: "fact = 1 * 1 = 1 -> fact = 1 * 2 = 2 -> fact = 2 * 3 = 6. Output is 6 (which is 3!).",
    explanationBn: "১ * ২ * ৩ = ৬ (যা ৩ এর ফ্যাক্টোরিয়াল)। আউটপুট: ৬।"
  },
  {
    id: "t8_q20",
    question: "What is an off-by-one error?",
    options: [
      "A loop executing one time too many or one time too few due to an incorrect relational boundary condition",
      "A keyboard typing error",
      "A printer ink overflow",
      "A screen resolution error"
    ],
    correct: 0,
    explanationEn: "An off-by-one error is a classic logic bug where a loop iterates N+1 or N-1 times instead of exactly N times.",
    explanationBn: "লুপের শর্তের ভুলে লুপটি নির্ধারিত সংখ্যার চেয়ে একবার বেশি বা কম চলাকে Off-by-one error বলা হয়।"
  },
  {
    id: "t8_q21",
    question: "Which of the following flowchart symbols is used to take user input in a Python program using `input()`?",
    options: [
      "Rectangle",
      "Parallelogram",
      "Diamond",
      "Circle"
    ],
    correct: 1,
    explanationEn: "User input operations (like `input()`) are strictly represented using the Parallelogram (I/O symbol).",
    explanationBn: "ইনপুট গ্রহণের কার্যক্রম নির্দেশ করতে সামান্তরিক (Parallelogram) প্রতীক ব্যবহার করা হয়।"
  },
  {
    id: "t8_q22",
    question: "Why should flow lines in a flowchart never intersect without clarity?",
    options: [
      "Because intersecting lines cause visual confusion regarding the true direction of control flow",
      "Because paper will tear",
      "Because compilers reject drawn lines",
      "Because ink runs out"
    ],
    correct: 0,
    explanationEn: "Intersecting lines obscure the unambiguous direction of program control flow.",
    explanationBn: "ফ্লো লাইন পরস্পরকে ক্রস করলে প্রবাহের সঠিক দিক নিয়ে বিভ্রান্তি তৈরি হয়।"
  },
  {
    id: "t8_q23",
    question: "What does the term 'Dry Run' originate from?",
    options: [
      "Testing fire hoses without turning on the water",
      "A rehearsal or simulation of a procedure without actually running live physical machinery",
      "Drying computers with a towel",
      "Running out of memory"
    ],
    correct: 1,
    explanationEn: "'Dry Run' historically referred to a rehearsal or practice run without live ammunition or full machinery operation.",
    explanationBn: "ড্রাই রান কথাটি মহড়া বা প্রস্তুতিমূলক পরীক্ষা থেকে এসেছে যেখানে মূল যন্ত্র না চালিয়ে ধাপে ধাপে যাচাই করা হয়।"
  },
  {
    id: "t8_q24",
    question: "What is the primary role of an algorithm before a software project is coded?",
    options: [
      "It serves as the logical blueprint and roadmap for the software solution",
      "It replaces the computer CPU",
      "It formats the hard drive",
      "It creates 3D animations"
    ],
    correct: 0,
    explanationEn: "An algorithm acts as the fundamental logical blueprint that guides all software implementation.",
    explanationBn: "অ্যালগরিদম হলো সফটওয়্যার তৈরির মূল যৌক্তিক নকশা ও দিকনির্দেশনা।"
  },
  {
    id: "t8_q25",
    question: "Which of the following represents the correct sequence in computational problem solving?",
    options: [
      "Problem Definition -> Algorithm / Flowchart -> Coding -> Testing & Debugging -> Documentation",
      "Coding -> Problem Definition -> Testing -> Algorithm",
      "Documentation -> Coding -> Testing -> Algorithm",
      "Testing -> Coding -> Flowchart -> Problem Definition"
    ],
    correct: 0,
    explanationEn: "The disciplined engineering sequence begins with Problem Definition, followed by Algorithm/Flowchart design, Coding, Testing/Debugging, and Documentation.",
    explanationBn: "সমস্যা সমাধানের সঠিক ধাপ: সমস্যা বিশ্লেষণ -> অ্যালগরিদম/ফ্লোচার্ট তৈরি -> কোডিং -> টেস্টিং ও ডিবাগিং -> ডকুমেন্টেশন।"
  }
];
