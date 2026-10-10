export const topic3Questions = [
  {
    id: 1,
    question: "Which computer scientist formally defined the 5 essential characteristics of an algorithm (Finiteness, Definiteness, Input, Output, Effectiveness)?",
    options: [
      "Donald Knuth (in 'The Art of Computer Programming')",
      "Alan Turing",
      "John von Neumann",
      "Dennis Ritchie"
    ],
    correctAnswer: 0,
    explanationEn: "Professor Donald Knuth formalized the five fundamental criteria that define any valid computational algorithm.",
    explanationBn: "প্রফেসর ডোনাল্ড নুথ (Donald Knuth) অ্যালগরিদমের ৫টি মৌলিক বৈশিষ্ট্য (Finiteness, Definiteness, Input, Output, Effectiveness) সুস্পষ্টভাবে সংজ্ঞায়িত করেন।"
  },
  {
    id: 2,
    question: "Which characteristic dictates that an algorithm MUST terminate after a finite number of steps and not run forever in an infinite loop?",
    options: [
      "Finiteness",
      "Definiteness",
      "Effectiveness",
      "Generality"
    ],
    correctAnswer: 0,
    explanationEn: "Finiteness guarantees that the algorithm will always complete execution in a bounded number of computational operations.",
    explanationBn: "সসীমতা বা ফাইনাইটনেস (Finiteness) নির্দেশ করে যে অ্যালগরিদম অবশ্যই নির্দিষ্ট সংখ্যক ধাপের পর শেষ হবে এবং অনন্তকাল লুপে ঘুরবে না।"
  },
  {
    id: 3,
    question: "Which characteristic requires that every single instruction in an algorithm must be clear, rigorous, and completely unambiguous?",
    options: [
      "Definiteness (Unambiguity)",
      "Finiteness",
      "Multi-tenancy",
      "Polymorphism"
    ],
    correctAnswer: 0,
    explanationEn: "Definiteness ensures that each instruction has only one possible exact interpretation with zero vagueness.",
    explanationBn: "সুনির্দিষ্টতা বা ডেফিনেটনেস (Definiteness) নিশ্চিত করে যে অ্যালগরিদমের প্রতিটি নির্দেশ দ্ব্যর্থহীন, স্পষ্ট ও সুনির্দিষ্ট হবে।"
  },
  {
    id: 4,
    question: "An instruction stating 'Add some salt to the mixture' in an algorithm violates which Knuth criterion?",
    options: [
      "Definiteness (because 'some' is vague and subjective rather than exact)",
      "Finiteness",
      "Effectiveness",
      "Generality"
    ],
    correctAnswer: 0,
    explanationEn: "'Add some' is ambiguous; in algorithms, quantities must be exact (e.g., 'Add 5 grams of salt') to satisfy Definiteness.",
    explanationBn: "'কিছু পরিমাণ লবণ যোগ করো'—এই ধরনের অস্পষ্ট নির্দেশ ডেফিনেটনেস (Definiteness) নিয়ম লঙ্ঘন করে।"
  },
  {
    id: 5,
    question: "How many external inputs does a valid algorithm require?",
    options: [
      "Zero (0) or more inputs",
      "At least 1 input is mandatory",
      "Exactly 5 inputs",
      "More than 100 inputs"
    ],
    correctAnswer: 0,
    explanationEn: "An algorithm can accept zero inputs (e.g., generating the first 10 Fibonacci numbers) or multiple inputs.",
    explanationBn: "একটি বৈধ অ্যালগরিদমে শূন্য (০) বা ততোধিক বাহ্যিক ইনপুট থাকতে পারে (যেমন নির্দিষ্ট ধ্রুবক প্রিন্ট করার অ্যালগরিদমে কোনো ইনপুট লাগে না)।"
  },
  {
    id: 6,
    question: "How many outputs MUST a valid algorithm produce?",
    options: [
      "At least ONE (1) or more outputs",
      "Zero outputs is acceptable",
      "Exactly 10 outputs",
      "Outputs are optional"
    ],
    correctAnswer: 0,
    explanationEn: "An algorithm must produce at least one output; a program producing zero output provides no computational value.",
    explanationBn: "একটি অ্যালগরিদমকে অবশ্যই অন্ততপক্ষে একটি (১) বা ততোধিক ফলাফল (Output) প্রদর্শন করতে হবে।"
  },
  {
    id: 7,
    question: "Which characteristic states that all operations in an algorithm must be basic, feasible, and realistically executable by a human with paper and pencil?",
    options: [
      "Effectiveness (Feasibility)",
      "Definiteness",
      "Finiteness",
      "Encapsulation"
    ],
    correctAnswer: 0,
    explanationEn: "Effectiveness requires that every operation is fundamentally feasible and computable in finite time (e.g., 'Divide by zero' violates effectiveness).",
    explanationBn: "কার্যকারিতা বা ইফেক্টিভনেস (Effectiveness) নিশ্চিত করে যে প্রতিটি ধাপ মানুষের পক্ষে কাগজে-কলমে সম্পাদনযোগ্য ও বাস্তবসম্মত হবে।"
  },
  {
    id: 8,
    question: "An instruction in an algorithm stating 'Compute the largest prime number in existence' violates which criterion?",
    options: [
      "Effectiveness and Finiteness (since primes are infinite and non-terminating)",
      "Definiteness only",
      "Input only",
      "Output only"
    ],
    correctAnswer: 0,
    explanationEn: "Prime numbers are mathematically infinite; searching for the 'largest prime' is impossible and will never terminate, violating effectiveness and finiteness.",
    explanationBn: "মৌলিক সংখ্যা যেহেতু অসীম, তাই 'সর্বোচ্চ মৌলিক সংখ্যা' খোঁজা একটি অসম্ভব কাজ যা ইফেক্টিভনেস ও ফাইনাইটনেস নিয়ম ভঙ্গ করে।"
  },
  {
    id: 9,
    question: "What is 'Language Independence' of an algorithm?",
    options: [
      "The algorithm is written in clear, logical steps so that it can be implemented in Python, C++, Java, or any other programming language",
      "The algorithm only works without human language",
      "The algorithm cannot be translated into English",
      "The algorithm is compiled directly into binary without source code"
    ],
    correctAnswer: 0,
    explanationEn: "Algorithms represent pure logic blueprints independent of the syntax of any specific programming language.",
    explanationBn: "ল্যাঙ্গুয়েজ ইন্ডিপেন্ডেন্স হলো অ্যালগরিদমকে এমনভাবে লেখা যাতে তা পাইথন, সি++ বা জাভা—যেকোনো ভাষায় সমানভাবে কোড করা যায়।"
  },
  {
    id: 10,
    question: "A program enters a loop: `while x > 0: x = x + 1`. This violates which Knuth criterion of an algorithm?",
    options: [
      "Finiteness (Infinite Loop Bug)",
      "Definiteness",
      "Input criterion",
      "Output criterion"
    ],
    correctAnswer: 0,
    explanationEn: "Because `x` continues to increase indefinitely, the condition `x > 0` remains permanently True, creating an infinite loop violating Finiteness.",
    explanationBn: "`x` এর মান ক্রমাগত বাড়তে থাকায় লুপটি কখনো থামবে না, যা অ্যালগরিদমের সসীমতা (Finiteness) বৈশিষ্ট্য লঙ্ঘন করে।"
  },
  {
    id: 11,
    question: "What is 'Generality' in algorithm design?",
    options: [
      "The algorithm should work correctly for all valid inputs within the problem domain, rather than being hardcoded for just one specific set of numbers",
      "The algorithm should only be understood by general managers",
      "The algorithm should have a short name",
      "The algorithm should run only on Sundays"
    ],
    correctAnswer: 0,
    explanationEn: "Generality ensures that an algorithm designed to sort numbers can sort 5 numbers or 5,000 numbers of any value seamlessly.",
    explanationBn: "জেনারেলিটি (Generality) নিশ্চিত করে যে অ্যালগরিদমটি নির্দিষ্ট একটি মানের বদলে যেকোনো বৈধ ইনপুটের জন্য সঠিকভাবে কাজ করবে।"
  },
  {
    id: 12,
    question: "Which of the following is considered an algorithm rather than just a program?",
    options: [
      "Euclid's Method for finding the Greatest Common Divisor (GCD) of two integers",
      "A compiled .exe binary file on Windows",
      "A specific Python script containing syntax errors",
      "A laptop's BIOS chip"
    ],
    correctAnswer: 0,
    explanationEn: "Euclid's algorithm is a universal mathematical step-by-step method for GCD that exists independently of computer software.",
    explanationBn: "দুটি সংখ্যার গ.সা.গু নির্ণয়ের ইউক্লিডের পদ্ধতি হলো একটি বিশুদ্ধ ও সার্বজনীন অ্যালগরিদম।"
  },
  {
    id: 13,
    question: "Why is 'Time Complexity' an important metric when evaluating competing algorithms for the same problem?",
    options: [
      "It measures how the execution time of the algorithm grows as the input size (N) increases",
      "It measures the price of the computer clock",
      "It sets the time zone of the operating system",
      "It records the time of day the program was compiled"
    ],
    correctAnswer: 0,
    explanationEn: "Time complexity evaluates algorithmic efficiency by measuring the rate of operational growth as input data scales (e.g., O(N) vs O(N^2)).",
    explanationBn: "টাইম কমপ্লেক্সিটি (Time Complexity) পরিমাপ করে ডেটার পরিমাণ (N) বাড়ার সাথে সাথে অ্যালগরিদমটি সম্পন্ন হতে কতটা সময় বেশি লাগে।"
  },
  {
    id: 14,
    question: "Why is 'Space Complexity' an important metric in algorithm analysis?",
    options: [
      "It measures the amount of working memory (RAM) an algorithm requires during execution relative to input size",
      "It measures the physical dimensions of the computer room",
      "It measures the size of outer space satellites",
      "It counts the number of spaces between words"
    ],
    correctAnswer: 0,
    explanationEn: "Space complexity quantifies how much auxiliary memory (RAM) the algorithm allocates to store intermediate variables.",
    explanationBn: "স্পেস কমপ্লেক্সিটি (Space Complexity) পরিমাপ করে অ্যালগরিদমটি রান করার সময় কম্পিউটারের মেমরিতে (RAM) কতটা অতিরিক্ত জায়গা দখল করে।"
  },
  {
    id: 15,
    question: "What is the very first step in a standard algorithm written in numbered format?",
    options: [
      "Step 1: Start (or Begin)",
      "Step 1: Print final answer",
      "Step 1: Stop",
      "Step 1: Import modules"
    ],
    correctAnswer: 0,
    explanationEn: "Every standard formal algorithm explicitly starts with an unambiguous entry step: 'Step 1: Start'.",
    explanationBn: "যেকোনো আনুষ্ঠানিক অ্যালগরিদমের সর্বপ্রথম ধাপটি সুনির্দিষ্টভাবে 'Step 1: Start' (শুরু) দিয়ে আরম্ভ হয়।"
  },
  {
    id: 16,
    question: "What is the final step in a standard algorithm written in numbered format?",
    options: [
      "Step N: Stop (or End)",
      "Step N: Start",
      "Step N: Input numbers",
      "Step N: Declare variables"
    ],
    correctAnswer: 0,
    explanationEn: "To satisfy the Finiteness criterion, algorithms formally conclude with 'Step N: Stop'.",
    explanationBn: "অ্যালগরিদম সমাপ্তি নিশ্চিত করতে শেষ ধাপ হিসেবে 'Step N: Stop' (শেষ) লেখা হয়।"
  },
  {
    id: 17,
    question: "If an algorithm produces the correct output for even numbers but crashes or loops infinitely for odd numbers, it violates:",
    options: [
      "Generality and Finiteness",
      "Definiteness only",
      "Input criteria only",
      "Hardware requirements"
    ],
    correctAnswer: 0,
    explanationEn: "The algorithm fails to generalize across the entire domain of integers and fails finiteness by looping infinitely for odd inputs.",
    explanationBn: "জোড় সংখ্যায় কাজ করলেও বিজোড় সংখ্যায় অনন্তকাল লুপে ঘুরলে তা জেনারেলিটি ও সসীমতার নিয়ম ভঙ্গ করে।"
  },
  {
    id: 18,
    question: "Which of the following is an example of an algorithm that takes ZERO external inputs?",
    options: [
      "An algorithm that prints the first 50 even natural numbers",
      "An algorithm that calculates the simple interest given P, R, and T",
      "An algorithm that finds the largest of three given numbers",
      "An algorithm that searches for a student's name in a roll list"
    ],
    correctAnswer: 0,
    explanationEn: "Generating known constants or sequences (like first 50 even numbers: 2, 4, 6... 100) requires no external runtime user inputs.",
    explanationBn: "প্রথম ৫০টি জোড় সংখ্যা প্রিন্ট করার জন্য ব্যবহারকারীর কাছ থেকে কোনো বাড়তি ইনপুট নেওয়ার প্রয়োজন হয় না।"
  },
  {
    id: 19,
    question: "What is the historical origin of the word 'Algorithm'?",
    options: [
      "Named after 9th-century Persian mathematician Muhammad ibn Musa al-Khwarizmi",
      "Named after the Greek island of Algorithes",
      "Derived from Latin words for algebraic computing",
      "Named after a software company in California"
    ],
    correctAnswer: 0,
    explanationEn: "The word 'Algorithm' is derived from the latinization of the name of Persian mathematician Al-Khwarizmi.",
    explanationBn: "'অ্যালগরিদম' শব্দটি ৯ম শতাব্দীর বিখ্যাত গণিতবিদ মুহাম্মদ ইবনে মুসা আল-খোয়ারিজমির নাম থেকে উদ্ভূত।"
  },
  {
    id: 20,
    question: "An instruction in an algorithm states: `x = 10 / 0`. Which Knuth criterion is immediately violated?",
    options: [
      "Effectiveness (since mathematical division by zero is undefined and incomputable)",
      "Input criterion",
      "Output criterion",
      "Generality"
    ],
    correctAnswer: 0,
    explanationEn: "Division by zero is mathematically undefined and cannot be computed feasibly, violating the Effectiveness criterion.",
    explanationBn: "শূন্য দিয়ে ভাগ করা গাণিতিকভাবে অসংজ্ঞায়িত হওয়ায় এটি কার্যকারিতা (Effectiveness) নিয়ম ভঙ্গ করে।"
  },
  {
    id: 21,
    question: "Which of the following algorithms is most famous for finding the shortest path between nodes in a network graph?",
    options: [
      "Dijkstra's Algorithm",
      "Bubble Sort",
      "Linear Search",
      "Euclid's GCD"
    ],
    correctAnswer: 0,
    explanationEn: "Edsger Dijkstra formulated the famous shortest-path algorithm used globally in GPS routing and internet packet switching.",
    explanationBn: "ডিকস্ট্রার অ্যালগরিদম (Dijkstra's Algorithm) নেটওয়ার্কে সর্বনিম্ন দূরত্বের পথ নির্ণয়ে বিশ্বজুড়ে ব্যবহৃত হয়।"
  },
  {
    id: 22,
    question: "How does an algorithm differ from a computer program?",
    options: [
      "An algorithm is an abstract language-independent logical design; a program is the concrete implementation of an algorithm in a specific programming language syntax",
      "An algorithm can only run on supercomputers",
      "A program does not require an algorithm",
      "They are identical terms"
    ],
    correctAnswer: 0,
    explanationEn: "An algorithm is the pure conceptual logic blueprint, while a program is that logic translated into concrete language code (like Python).",
    explanationBn: "অ্যালগরিদম হলো একটি ধারণাগত যৌক্তিক নকশা, আর প্রোগ্রাম হলো কোনো নির্দিষ্ট ভাষায় সেই নকশার কোডিং রূপ।"
  },
  {
    id: 23,
    question: "What is 'Deterministic Execution' in algorithm theory?",
    options: [
      "Given the exact same input values, the algorithm will always execute the same sequence of steps and produce the identical output every single time",
      "The algorithm chooses random outputs on every run",
      "The algorithm terminates only when the user presses Enter",
      "The computer decides what result to show"
    ],
    correctAnswer: 0,
    explanationEn: "Deterministic algorithms guarantee completely repeatable, consistent outcomes given the same initial input states.",
    explanationBn: "ডিটারমিনিস্টিক এক্সিকিউশন মানে একই ইনপুট দিলে অ্যালগরিদমটি প্রতিবার হুবহু একই ফলাফল প্রদান করবে।"
  },
  {
    id: 24,
    question: "When two different algorithms solve the same problem correctly, which one is preferred in computer science?",
    options: [
      "The algorithm with lower time complexity (runs faster) and lower space complexity (uses less memory)",
      "The algorithm written with more lines of code",
      "The algorithm that uses fancy variable names",
      "The algorithm created in the year 1950"
    ],
    correctAnswer: 0,
    explanationEn: "Algorithmic optimization prioritizes algorithms that minimize operational steps (time) and memory footprint (space).",
    explanationBn: "যে অ্যালগরিদমটি কম সময়ে (Time) এবং কম মেমরি (Space) খরচ করে সঠিক ফলাফল দেয়, সেটিকেই অগ্রাধিকার দেওয়া হয়।"
  },
  {
    id: 25,
    question: "What is the primary summary takeaway regarding Algorithm Characteristics for CBSE Class 11 exams?",
    options: [
      "A valid algorithm must strictly satisfy: Finiteness (terminates), Definiteness (unambiguous), Input (>=0), Output (>=1), and Effectiveness (feasible)",
      "Algorithms only need to have a title; no other rules exist",
      "Only Python programs can be called algorithms",
      "Algorithms must always contain at least 100 steps"
    ],
    correctAnswer: 0,
    explanationEn: "Donald Knuth's 5 criteria (Finiteness, Definiteness, Input, Output, Effectiveness) define the core standard for all valid algorithms.",
    explanationBn: "অ্যালগরিদমের ৫টি মৌলিক বৈশিষ্ট্য হলো: সসীমতা (Finiteness), সুনির্দিষ্টতা (Definiteness), ইনপুট (>=0), আউটপুট (>=1), এবং কার্যকারিতা (Effectiveness)।"
  }
];
