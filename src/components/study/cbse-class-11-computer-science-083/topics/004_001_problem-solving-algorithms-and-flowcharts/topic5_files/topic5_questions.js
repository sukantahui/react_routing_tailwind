export const topic5Questions = [
  {
    id: "t5_q1",
    question: "According to the Böhm-Jacopini theorem, what are the three fundamental control structures needed to construct any computable algorithm?",
    options: [
      "Sequence, Selection (Decision), and Iteration (Looping)",
      "Variables, Functions, and Classes",
      "Input, Output, and Storage",
      "Hardware, Software, and Network"
    ],
    correct: 0,
    explanationEn: "The Böhm-Jacopini theorem proved that sequence, selection (conditional branching), and iteration (looping) are sufficient to express any computable function.",
    explanationBn: "Böhm-Jacopini উপপাদ্য প্রমাণ করেছে যে সিকোয়েন্স (Sequence), সিলেকশন (Selection) এবং ইটারেশন (Iteration) - এই তিনটি কন্ট্রোল স্ট্রাকচার দিয়ে যে কোনো অ্যালগরিদম তৈরি করা সম্ভব।"
  },
  {
    id: "t5_q2",
    question: "Which of the following problems requires ONLY a sequential control structure?",
    options: [
      "Finding whether an entered number is positive, negative, or zero",
      "Calculating Simple Interest given Principal, Rate, and Time",
      "Finding the factorial of a positive integer N",
      "Checking whether a given year is a Leap Year"
    ],
    correct: 1,
    explanationEn: "Calculating Simple Interest (SI = P*R*T/100) involves linear calculations without any condition checking or repeating loops.",
    explanationBn: "সরল সুদ গণনা (SI = P*R*T/100) একটি রৈখিক প্রক্রিয়া যেখানে কোনো শর্ত পরীক্ষা বা লুপের পুনরাবৃত্তির প্রয়োজন হয় না।"
  },
  {
    id: "t5_q3",
    question: "In a decision-making flowchart structure, how many outgoing flow lines originate from the decision (diamond) symbol?",
    options: [
      "Exactly 1",
      "2 (or 3 in multi-way comparisons)",
      "Infinite lines",
      "0 lines"
    ],
    correct: 1,
    explanationEn: "A decision rhombus typically has 2 outgoing lines (True/False or Yes/No), or 3 in case of a 3-way numerical comparison (<, =, >).",
    explanationBn: "একটি ডিসিশন ডায়মন্ড থেকে সাধারণত ২টি নির্গমন লাইন (True/False বা Yes/No) থাকে, অথবা ৩-মুখী তুলনা থাকলে ৩টি লাইন বের হয়।"
  },
  {
    id: "t5_q4",
    question: "What is an 'Entry-Controlled Loop' (Pre-test Loop)?",
    options: [
      "A loop where the termination condition is checked AFTER the loop body executes",
      "A loop where the condition is evaluated BEFORE executing the loop body",
      "A loop that never terminates",
      "A loop that does not use any variables"
    ],
    correct: 1,
    explanationEn: "In an entry-controlled loop (like Python's while loop), the condition is checked at the entry point before executing any statements inside the loop body.",
    explanationBn: "এন্ট্রি-কন্ট্রোল্ড লুপে লুপের মূল অংশ (body) চালুর আগেই প্রবেশদ্বারে শর্ত যাচাই করা হয়। শর্ত মিথ্যা হলে লুপ একবারও চলে না।"
  },
  {
    id: "t5_q5",
    question: "If an entry-controlled loop has an initial condition that evaluates to False on the very first check, how many times will the loop body execute?",
    options: [
      "0 times",
      "1 time",
      "Infinite times",
      "N times"
    ],
    correct: 0,
    explanationEn: "Because pre-test loops check the condition before execution, if the condition is False at the start, the loop body executes 0 times.",
    explanationBn: "প্রি-টেস্ট বা এন্ট্রি-কন্ট্রোল্ড লুপে শুরুতে শর্ত মিথ্যা (False) হলে লুপের বডি ০ বার (একবারও নয়) কার্যকর হয়।"
  },
  {
    id: "t5_q6",
    question: "What are the four essential components of every iterative loop in a flowchart?",
    options: [
      "Start, Input, Output, Stop",
      "Initialization, Condition Test, Loop Body (Action), and Updation (Step)",
      "Addition, Subtraction, Multiplication, Division",
      "Hardware, Compiler, Linker, Loader"
    ],
    correct: 1,
    explanationEn: "Every well-formed loop must have: (1) Initialization of loop variable, (2) Condition check, (3) Body statements, and (4) Updation/Increment step.",
    explanationBn: "প্রতিটি সঠিক লুপে ৪টি উপাদান আবশ্যক: (১) ইনিশিয়ালাইজেশন, (২) শর্ত পরীক্ষা, (৩) লুপের বডি এবং (৪) কাউন্টার আপডেট/ইনক্রিমেন্ট।"
  },
  {
    id: "t5_q7",
    question: "What happens if a programmer omits the updation step (e.g., forgets `i = i + 1`) inside a loop?",
    options: [
      "The program runs faster",
      "The loop becomes an infinite loop because the termination condition is never reached",
      "The flowchart automatically corrects itself",
      "The loop executes backwards"
    ],
    correct: 1,
    explanationEn: "Without updating the loop control variable, the test condition remains True forever, resulting in an infinite loop.",
    explanationBn: "লুপ ভেরিয়েবল আপডেট (যেমন i = i + 1) না করলে শর্তটি সারাজীবন সত্য থেকে যায় এবং ইনফাইনাইট লুপের সৃষ্টি হয়।"
  },
  {
    id: "t5_q8",
    question: "Which geometric symbol is used to perform the loop initialization statement `count = 1` in a flowchart?",
    options: [
      "Parallelogram",
      "Oval",
      "Rectangle (Process)",
      "Diamond (Decision)"
    ],
    correct: 2,
    explanationEn: "Variable initialization (e.g., `count = 1`) is an internal assignment/action, so it is placed inside a Process Rectangle.",
    explanationBn: "ভেরিয়েবলের মান নির্ধারণ বা ইনিশিয়ালাইজেশন (`count = 1`) একটি অভ্যন্তরীণ গণনা/অ্যাসাইনমেন্ট, তাই এটি আয়তক্ষেত্র (Rectangle)-এ থাকে।"
  },
  {
    id: "t5_q9",
    question: "Which of the following problems requires a Nested Decision structure?",
    options: [
      "Calculating the area of a circle given radius",
      "Finding the largest among three distinct numbers A, B, and C",
      "Printing numbers from 1 to 100",
      "Converting kilometers to miles"
    ],
    correct: 1,
    explanationEn: "Determining the maximum of three numbers requires comparing A with B, and then conditionally comparing the winner with C (a nested if-else structure).",
    explanationBn: "তিনটি সংখ্যার মধ্যে বৃহত্তম সংখ্যা খুঁজে বের করতে একাধিক স্তরের শর্ত (নেস্টেড ডিসিশন) পরীক্ষা করতে হয়।"
  },
  {
    id: "t5_q10",
    question: "In calculating the Factorial of N (N!), what initial value should the accumulator variable `fact` have?",
    options: [
      "0",
      "1",
      "-1",
      "N"
    ],
    correct: 1,
    explanationEn: "For multiplication accumulation (like factorial), the identity element is 1. Initializing to 0 would cause the entire product to become 0.",
    explanationBn: "গুণফলের ক্ষেত্রে আইডেন্টিটি এলিমেন্ট হলো ১। `fact = 0` দিয়ে শুরু করলে পুরো গুণফল শূন্য হয়ে যাবে, তাই ১ দিয়ে শুরু করতে হয়।"
  },
  {
    id: "t5_q11",
    question: "In calculating the Sum of first N numbers, what initial value should the accumulator variable `sum` have?",
    options: [
      "0",
      "1",
      "100",
      "Undefined"
    ],
    correct: 0,
    explanationEn: "For additive accumulation, the identity element is 0, ensuring no extra value is added to the series sum.",
    explanationBn: "যোগফল জমার জন্য আইডেন্টিটি এলিমেন্ট হলো ০, যাতে ফলাফলে কোনো বাড়তি মান যোগ না হয়।"
  },
  {
    id: "t5_q12",
    question: "In a flowchart checking if a number N is divisible by 5 and 11, which operator is represented inside the decision diamond?",
    options: [
      "N / 5 == 0",
      "N % 5 == 0 AND N % 11 == 0",
      "N + 5 + 11",
      "N ** 55"
    ],
    correct: 1,
    explanationEn: "Divisibility is tested using the modulo (remainder) operator `%`. For both 5 and 11, the condition is `(N % 5 == 0) and (N % 11 == 0)`.",
    explanationBn: "ভাগশেষ পরীক্ষার জন্য মডুলাস অপারেটর `%` ব্যবহার করা হয়। ৫ ও ১১ উভয় দিয়ে বিভাজ্যতার শর্ত হলো `(N % 5 == 0) and (N % 11 == 0)`।"
  },
  {
    id: "t5_q13",
    question: "What is an 'Accumulator' in an iterative flowchart?",
    options: [
      "A hardware device for CPU cooling",
      "A variable used to collect and store progressive sums or products across iterations",
      "The oval symbol at the end of a flowchart",
      "A syntax error"
    ],
    correct: 1,
    explanationEn: "An accumulator is a designated variable (like `total = total + val` or `fact = fact * i`) updated in every loop iteration to accumulate results.",
    explanationBn: "অ্যাকিউমুলেটর হলো এমন একটি চলক যা প্রতিটি ইটারেশনে ক্রমান্বয়ে যোগফল বা গুণফল জমা রাখতে ব্যবহৃত হয়।"
  },
  {
    id: "t5_q14",
    question: "What is a 'Loop Counter'?",
    options: [
      "A variable that tracks the number of times a loop has executed",
      "A shop counter selling software",
      "An output statement",
      "A flowchart connector"
    ],
    correct: 0,
    explanationEn: "A loop counter is a variable (often named `i`, `j`, or `count`) incremented/decremented to count iterations and govern termination.",
    explanationBn: "কাউন্টার ভেরিয়েবল লুপ কতবার কার্যকর হয়েছে তা গণনা করে এবং শর্ত পূরণে ভূমিকা রাখে।"
  },
  {
    id: "t5_q15",
    question: "Which of the following is true regarding flowchart flow lines exiting a decision diamond?",
    options: [
      "They do not require any labels",
      "They must be explicitly labeled with the branch outcome (e.g., True / False or Yes / No)",
      "Both lines must go back to Start",
      "Only one line is allowed to leave a diamond"
    ],
    correct: 1,
    explanationEn: "Every line originating from a decision diamond must be clearly labeled with the outcome condition so readers know which branch to follow.",
    explanationBn: "ডিসিশন ডায়মন্ড থেকে বের হওয়া প্রতিটি লাইনের সাথে 'True'/'False' বা 'Yes'/'No' লিখে দেওয়া বাধ্যতামূলক।"
  },
  {
    id: "t5_q16",
    question: "When swapping two variables A and B using a third variable Temp, how many process rectangles are sequentially used?",
    options: [
      "1 rectangle",
      "3 sequential assignment rectangles (Temp = A; A = B; B = Temp)",
      "0 rectangles",
      "5 rectangles"
    ],
    correct: 1,
    explanationEn: "Swapping involves 3 assignment steps in order: (1) Temp = A, (2) A = B, (3) B = Temp.",
    explanationBn: "তৃতীয় চলকের সাহায্যে সোয়াপ করার ৩টি ধাপ: (১) Temp = A, (২) A = B, (৩) B = Temp।"
  },
  {
    id: "t5_q17",
    question: "Can a flowchart contain both decision-making branches and iterative loops simultaneously?",
    options: [
      "No, only one control structure is allowed per flowchart",
      "Yes, complex algorithms frequently nest decision diamonds inside loops or vice versa",
      "Only in Python 2, not Python 3",
      "Only if the flowchart has at least 10 pages"
    ],
    correct: 1,
    explanationEn: "Real-world algorithms (such as finding prime numbers or sorting data) combine sequence, selection, and loops harmoniously.",
    explanationBn: "হ্যাঁ, বাস্তব জীবনের অ্যালগরিদমে লুপের ভেতরে কন্ডিশনাল ব্রাঞ্চ বা ব্রাঞ্চের ভেতরে লুপ থাকা অত্যন্ত স্বাভাবিক।"
  },
  {
    id: "t5_q18",
    question: "In a flowchart designed to print even numbers between 1 and 20, what is the step increment for counter `i` if initialized to 2?",
    options: [
      "i = i + 1",
      "i = i + 2",
      "i = i * 2",
      "i = i - 1"
    ],
    correct: 1,
    explanationEn: "Starting from 2, adding 2 in each iteration produces the sequence 2, 4, 6, 8, ... 20.",
    explanationBn: "২ থেকে শুরু করে প্রতি ধাপে ২ যোগ (`i = i + 2`) করলে জোড় সংখ্যাগুলোর ক্রম (২, ৪, ৬, ৮...) পাওয়া যায়।"
  },
  {
    id: "t5_q19",
    question: "What is an 'infinite loop' in a flowchart?",
    options: [
      "A loop that finishes in 0 seconds",
      "A loop whose termination condition is never satisfied, causing perpetual execution",
      "A loop that counts up to infinity in mathematical terms",
      "A loop with 1000 iterations"
    ],
    correct: 1,
    explanationEn: "An infinite loop occurs when the loop condition never becomes False, trapping program execution indefinitely.",
    explanationBn: "ইনফাইনাইট লুপ হলো এমন একটি পুনরাবৃত্তি যার শেষ হওয়ার শর্তটি কখনো মিথ্যা হয় না, ফলে প্রোগ্রাম অনন্তকাল চলতে থাকে।"
  },
  {
    id: "t5_q20",
    question: "In Python, which construct directly corresponds to the 'Dual Alternative' (If-Then-Else) flowchart pattern?",
    options: [
      "if condition: ... else: ...",
      "while condition: ...",
      "import math",
      "def function():"
    ],
    correct: 0,
    explanationEn: "The `if-else` statement in Python maps directly to the two-way decision diamond flowchart pattern.",
    explanationBn: "পাইথনের `if-else` স্টেটমেন্টটি ফ্লোচার্টের দ্বি-মুখী সিদ্ধান্ত (Dual Alternative) গঠনের হুবহু রূপান্তর।"
  },
  {
    id: "t5_q21",
    question: "Which of the following flowchart segments correctly represents finding the absolute value of integer X?",
    options: [
      "If X < 0 -> (True: X = -X) -> (False: do nothing) -> Output X",
      "If X > 0 -> (True: X = -X)",
      "X = X * 0",
      "Stop -> Start"
    ],
    correct: 0,
    explanationEn: "Absolute value checks if X is negative (X < 0); if True, it negates X to make it positive; if False, X remains unchanged.",
    explanationBn: "পরম মান (Absolute value) নির্ণয়ে যদি X < 0 হয়, তবে তাকে ধনাত্মক করতে `X = -X` করা হয়।"
  },
  {
    id: "t5_q22",
    question: "What does the loop condition `count <= N` represent?",
    options: [
      "A boundary condition where the loop runs as long as count does not exceed N",
      "A syntax error",
      "An assignment of N to count",
      "A connector symbol"
    ],
    correct: 0,
    explanationEn: "`count <= N` is a relational condition that keeps the loop active while count is less than or equal to N.",
    explanationBn: "`count <= N` একটি রিলেশনাল শর্ত যা নির্দেশ করে যে count এর মান N এর সমান বা ছোট থাকা পর্যন্ত লুপটি সচল থাকবে।"
  },
  {
    id: "t5_q23",
    question: "In calculating the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8...), what are the sequential update processes in each loop step?",
    options: [
      "Next = A + B; A = B; B = Next;",
      "A = A + 1; B = B + 1;",
      "Next = A * B; A = 0;",
      "A = Next; B = Next;"
    ],
    correct: 0,
    explanationEn: "Fibonacci numbers are generated by adding the last two terms (`Next = A + B`) and shifting the windows forward (`A = B`, `B = Next`).",
    explanationBn: "ফিবোনাচি ধারায় পরবর্তী পদটি আগের দুটি পদের যোগফল (`Next = A + B`), তারপর মান স্থানান্তর করা হয় (`A = B`, `B = Next`)।"
  },
  {
    id: "t5_q24",
    question: "Why is a flowchart with only sequential structures incapable of finding prime numbers?",
    options: [
      "Because computers cannot calculate primes",
      "Because prime checking requires dynamic divisor division loops and conditional remainder tests",
      "Because flowcharts do not support math",
      "Because sequential structures are too fast"
    ],
    correct: 1,
    explanationEn: "Checking prime numbers requires testing multiple divisors using iterative loops and conditional branching based on the remainder.",
    explanationBn: "মৌলিক সংখ্যা নির্ণয়ের জন্য বিভিন্ন ভাজক দিয়ে ভাগ করার লুপ এবং ভাগশেষ শূন্য কিনা তা পরীক্ষার জন্য কন্ডিশনাল ব্রাঞ্চ প্রয়োজন।"
  },
  {
    id: "t5_q25",
    question: "What is the primary visual benefit of flowcharts when debugging control flow logic?",
    options: [
      "It allows visual tracing of all potential branches and loop exits to ensure no path is stuck",
      "It eliminates the need for computer monitors",
      "It reduces code file size on the hard drive",
      "It compiles Python code into binary automatically"
    ],
    correct: 0,
    explanationEn: "Flowcharts make it visually obvious if any conditional branch leads to an infinite loop, missing output, or unreachable dead end.",
    explanationBn: "ফ্লোচার্টের দৃশ্যমান কাঠামোর কারণে কোনো শাখা বাদ পড়লে বা কোনো লুপে অনন্তকাল আটকে থাকার সম্ভাবনা থাকলে তা সহজেই ধরা পড়ে।"
  }
];
