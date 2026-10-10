export const topic1Questions = [
  {
    id: 1,
    question: "What is the very first and most crucial step in the problem-solving lifecycle in computer science?",
    options: [
      "Analyzing the problem and understanding input-output requirements",
      "Immediately typing code into the Python IDE",
      "Compiling the program to check for syntax errors",
      "Purchasing a faster graphics card"
    ],
    correctAnswer: 0,
    explanationEn: "Before designing algorithms or writing code, a programmer must thoroughly analyze the problem to identify inputs, expected outputs, constraints, and edge conditions.",
    explanationBn: "প্রোগ্রামিং বা অ্যালগরিদম তৈরির পূর্বে সমস্যার সঠিক অনুধাবন, ইনপুট-আউটপুট নির্ধারণ এবং সীমাবদ্ধতা যাচাই করাই হলো সবচেয়ে গুরুত্বপূর্ণ প্রথম ধাপ।"
  },
  {
    id: 2,
    question: "Which sequence correctly represents the standard stages of the problem-solving methodology?",
    options: [
      "Problem Analysis &rarr; Algorithm Design &rarr; Coding &rarr; Testing &rarr; Debugging",
      "Coding &rarr; Testing &rarr; Problem Analysis &rarr; Algorithm Design",
      "Debugging &rarr; Coding &rarr; Flowchart &rarr; Testing",
      "Algorithm Design &rarr; Debugging &rarr; Problem Analysis &rarr; Coding"
    ],
    correctAnswer: 0,
    explanationEn: "The standard software engineering workflow proceeds: Analyze Problem &rarr; Formulate Algorithm &rarr; Write Code &rarr; Execute Tests &rarr; Debug Errors.",
    explanationBn: "সমস্যা সমাধানের সঠিক ধারাবাহিক ধাপ হলো: সমস্যা বিশ্লেষণ &rarr; অ্যালগরিদম প্রণয়ন &rarr; কোডিং &rarr; টেস্টিং &rarr; ডিবাগিং।"
  },
  {
    id: 3,
    question: "What is the primary difference between 'Testing' and 'Debugging'?",
    options: [
      "Testing is the process of finding errors; Debugging is the process of locating and fixing the root cause of errors",
      "Testing is done in Python, while Debugging is done in C++",
      "Testing removes all syntax errors automatically",
      "There is no difference; they are exact synonyms"
    ],
    correctAnswer: 0,
    explanationEn: "Testing exposes the presence of defects using test cases; Debugging investigates code logic to isolate and eliminate the defect.",
    explanationBn: "টেস্টিং হলো প্রোগ্রামে ভুল বা ত্রুটি আছে কিনা তা খুঁজে বের করা; আর ডিবাগিং হলো সেই ভুলের উৎস শনাক্ত করে তা সংশোধন করা।"
  },
  {
    id: 4,
    question: "An error caused by violating the grammatical rules of the programming language (e.g., missing colon or misspelled keyword) is classified as a:",
    options: [
      "Syntax Error",
      "Logical Error",
      "Runtime Error",
      "Hardware Failure"
    ],
    correctAnswer: 0,
    explanationEn: "Syntax errors occur when the source code breaches Python grammatical rules and are detected by the parser prior to execution.",
    explanationBn: "প্রোগ্রামিং ভাষার ব্যাকরণগত নিয়ম ভঙ্গ করলে (যেমন কোলন বা বন্ধনী ভুল) তাকে সিনট্যাক্স এরর (Syntax Error) বলে।"
  },
  {
    id: 5,
    question: "When a program executes without crashing but produces mathematically incorrect results (e.g., calculating Area = length + width instead of length * width), it contains a:",
    options: [
      "Logical Error (Semantic Bug)",
      "Syntax Error",
      "Runtime Error",
      "ZeroDivisionError"
    ],
    correctAnswer: 0,
    explanationEn: "Logical errors occur when the underlying algorithm formula is flawed; the interpreter runs the code without errors but produces wrong output.",
    explanationBn: "প্রোগ্রাম কোনো ক্র্যাশ ছাড়া নির্বিঘ্নে চললেও যদি ভুল ফলাফল প্রদান করে, তবে তাকে লজিক্যাল এরর বা যৌক্তিক ভুল বলা হয়।"
  },
  {
    id: 6,
    question: "An error that occurs during program execution when an illegal operation is attempted (e.g., dividing by zero or opening a non-existent file) is a:",
    options: [
      "Runtime Error (Exception)",
      "Syntax Error",
      "Compile-time Error",
      "Lexical Token Error"
    ],
    correctAnswer: 0,
    explanationEn: "Runtime errors occur during execution when an exceptional condition (like ZeroDivisionError or FileNotFoundError) interrupts normal flow.",
    explanationBn: "প্রোগ্রাম চলাকালীন কোনো অবৈধ অপারেশন ঘটলে (যেমন শূন্য দিয়ে ভাগ) প্রোগ্রাম ক্র্যাশ করে, যাকে রানটাইম এরর (Runtime Error) বলে।"
  },
  {
    id: 7,
    question: "Why is 'Decomposition' an essential pillar of problem solving in computer science?",
    options: [
      "It breaks down a complex monolithic problem into smaller, manageable, and independently solvable sub-problems",
      "It permanently deletes temporary cache files from disk",
      "It converts text files into compressed video streams",
      "It speeds up CPU clock frequencies"
    ],
    correctAnswer: 0,
    explanationEn: "Decomposition simplifies problem solving by dividing complicated challenges into smaller modular components (divide and conquer).",
    explanationBn: "ডিকম্পোজিশন (Decomposition) হলো একটি জটিল ও বড় সমস্যাকে ছোট ছোট স্বাধীন অংশে বিভক্ত করে সহজে সমাধান করার পদ্ধতি।"
  },
  {
    id: 8,
    question: "What is an 'Algorithm' in computer science?",
    options: [
      "A finite, unambiguous, step-by-step sequence of instructions designed to perform a specific computational task or solve a problem",
      "A physical microprocessor chip installed on the motherboard",
      "A specific programming language like Python",
      "A graphic drawing software"
    ],
    correctAnswer: 0,
    explanationEn: "An algorithm is a well-defined, language-independent finite sequence of instructions to solve a problem.",
    explanationBn: "অ্যালগরিদম হলো একটি সুনির্দিষ্ট, সসীম ও দ্ব্যর্থহীন ধাপভিত্তিক নির্দেশনাবলী যা কোনো নির্দিষ্ট সমস্যা সমাধানের জন্য তৈরি করা হয়।"
  },
  {
    id: 9,
    question: "Why should a programmer develop an algorithm before writing source code?",
    options: [
      "It allows clear logical thinking and error detection independent of programming language syntax constraints",
      "Because compilers will refuse to compile Python code without an algorithm text file",
      "To increase the file size of the Python script",
      "To automatically create database tables"
    ],
    correctAnswer: 0,
    explanationEn: "Formulating an algorithm first ensures the conceptual logic is sound, preventing costly rewrites and architectural flaws later.",
    explanationBn: "আগে অ্যালগরিদম তৈরি করলে কোনো নির্দিষ্ট ভাষার সিনট্যাক্সের জটিলতা ছাড়াই যুক্তির নির্ভুলতা নিশ্চিত করা যায়।"
  },
  {
    id: 10,
    question: "What is a 'Dry-Run' (Trace Table) in program verification?",
    options: [
      "Manually stepping through code on paper using sample inputs to track variable value transitions line by line",
      "Washing the computer monitor with a dry cloth",
      "Running code without cooling fans turned on",
      "Printing source code on paper"
    ],
    correctAnswer: 0,
    explanationEn: "A dry-run or trace table is a manual testing method where a programmer traces execution step-by-step on paper to verify variable states.",
    explanationBn: "ড্রাই-রান (Dry-Run) হলো কাগজে-কলমে টেবিল বানিয়ে প্রতিটি ধাপে ভেরিয়েবলের মানের পরিবর্তন পর্যবেক্ষণ করে প্রোগ্রাম যাচাই করা।"
  },
  {
    id: 11,
    question: "Which of the following represents an ideal 'Boundary / Edge' test case for a program that checks if a person is eligible to vote (Age &ge; 18)?",
    options: [
      "Age = 17, Age = 18, and Age = 19",
      "Age = 45 and Age = 55 only",
      "Age = 1000",
      "Age = 'Hello'"
    ],
    correctAnswer: 0,
    explanationEn: "Boundary testing evaluates values right on, below, and above threshold limits (17, 18, 19) where relational decision bugs most frequently occur.",
    explanationBn: "বাউন্ডারি বা প্রান্তিক টেস্টিংয়ে সীমার ঠিক আগের, সীমার এবং সীমার পরের মান (১৭, ১৮, ১৯) দিয়ে সিদ্ধান্ত যাচাই করা হয়।"
  },
  {
    id: 12,
    question: "Which type of error is generally the hardest for a programmer to locate and fix?",
    options: [
      "Logical Error (since no syntax error message or crash occurs to point to the line)",
      "Syntax Error (detected instantly by the parser)",
      "Typo in Python keyword",
      "Missing indentation error"
    ],
    correctAnswer: 0,
    explanationEn: "Logical errors produce no warning messages or stack traces, requiring thorough manual dry-running or unit testing to identify.",
    explanationBn: "লজিক্যাল এরর সবচেয়ে কঠিন, কারণ এতে কোনো এরর মেসেজ বা ক্র্যাশ দেখায় না; ফলে ভুল ধরতে গভীর বিশ্লেষণের প্রয়োজন হয়।"
  },
  {
    id: 13,
    question: "In Python, writing `print('Result is: ' + 50)` raises which type of error during execution?",
    options: [
      "Runtime Error (TypeError: can only concatenate str to str, not 'int')",
      "Syntax Error",
      "ZeroDivisionError",
      "OverflowError"
    ],
    correctAnswer: 0,
    explanationEn: "This is a runtime TypeError because Python is strongly typed and will not implicitly concatenate an integer to a string.",
    explanationBn: "এটি একটি রানটাইম TypeError, কারণ পাইথনে টেক্সটের সাথে সরাসরি ইন্টিজার যোগ করা যায় না।"
  },
  {
    id: 14,
    question: "What is 'Code Refactoring' in the software development lifecycle?",
    options: [
      "Restructuring and improving existing source code to enhance readability and efficiency without altering its external behavior",
      "Deleting all source code and starting over from scratch",
      "Translating Python code into HTML",
      "Encrypting variable names to hide them from users"
    ],
    correctAnswer: 0,
    explanationEn: "Refactoring cleans up code structure, improves modularity, and optimizes performance without changing functional outputs.",
    explanationBn: "রিফ্যাক্টরিং (Refactoring) হলো প্রোগ্রামের মূল আচরণ ঠিক রেখে কোডকে আরও পরিচ্ছন্ন, সহজবোধ্য ও দক্ষ করে তোলা।"
  },
  {
    id: 15,
    question: "Why are meaningful identifier names and comments considered good programming practices during the Coding phase?",
    options: [
      "They significantly improve program readability, documentation, and ease of maintenance for future developers",
      "They make the Python interpreter execute code 10 times faster",
      "They prevent computers from catching viruses",
      "They are mandatory for Python code to compile"
    ],
    correctAnswer: 0,
    explanationEn: "Meaningful variable names (e.g., `net_salary` vs `x`) and inline comments make code self-documenting and maintainable.",
    explanationBn: "অর্থপূর্ণ ভেরিয়েবলের নাম ও মন্তব্য কোডের পাঠযোগ্যতা বৃদ্ধি করে এবং ভবিষ্যতে কোড বুঝতে সাহায্য করে।"
  },
  {
    id: 16,
    question: "What is a 'Test Suite'?",
    options: [
      "A collection of multiple test cases designed to test a software program comprehensively across valid, boundary, and invalid inputs",
      "A luxury room in a computer hotel",
      "A physical hardware laboratory with 100 computers",
      "A graphical chart showing computer sales"
    ],
    correctAnswer: 0,
    explanationEn: "A test suite aggregates nominal, boundary, and edge-case test datasets to thoroughly validate software robustness.",
    explanationBn: "টেস্ট সুইট (Test Suite) হলো বিভিন্ন ধরণের ইনপুট ও বাউন্ডারি মানের একটি সমন্বিত টেস্ট কেসের সংকলন।"
  },
  {
    id: 17,
    question: "What is the primary role of a 'Debugger' tool in modern IDEs like VS Code or PyCharm?",
    options: [
      "Allowing developers to set breakpoints, pause execution, and inspect variable values in memory line by line",
      "Writing algorithms automatically using artificial intelligence",
      "Purchasing software licenses online",
      "Deleting spam files from the hard drive"
    ],
    correctAnswer: 0,
    explanationEn: "Debuggers allow setting breakpoints to freeze runtime execution and inspect memory states dynamically to identify root causes of bugs.",
    explanationBn: "ডিবাগার টুলের সাহায্যে ব্রেকপয়েন্ট বসিয়ে কোডের প্রতিটি লাইনে ভেরিয়েবলের মান পরীক্ষা করে সহজেই ভুল ধরা যায়।"
  },
  {
    id: 18,
    question: "In problem analysis, identifying 'Constraints' means:",
    options: [
      "Determining the valid operational boundaries, resource limits, and edge conditions governing the problem (e.g., age &gt; 0, memory &lt; 2GB)",
      "Counting the number of letters in the problem statement",
      "Measuring the weight of the computer keyboard",
      "Choosing the font size for the Python editor"
    ],
    correctAnswer: 0,
    explanationEn: "Constraints define strict real-world boundaries (e.g., non-negative inputs, maximum allowed execution time).",
    explanationBn: "সীমাবদ্ধতা (Constraints) বলতে বোঝায় ডেটার বৈধ পরিধি ও শর্ত (যেমন বয়স ঋণাত্মক হতে পারবে না)।"
  },
  {
    id: 19,
    question: "A student writes a program to compute the average of three numbers: `avg = a + b + c / 3`. What type of error is present here?",
    options: [
      "Logical Error (due to operator precedence, only c is divided by 3; should be `(a + b + c) / 3`)",
      "Syntax Error",
      "IndentationError",
      "ZeroDivisionError"
    ],
    correctAnswer: 0,
    explanationEn: "Division `/` has higher precedence than addition `+`. Thus `a + b + (c/3)` is evaluated, causing a mathematical logical error.",
    explanationBn: "এটি একটি লজিক্যাল এরর কারণ ব্র্যাকেট না দেওয়ায় গুণের অগ্রাধিকারের কারণে শুধুমাত্র c-কে ৩ দিয়ে ভাগ করা হয়েছে।"
  },
  {
    id: 20,
    question: "What is 'Pseudocode'?",
    options: [
      "An informal high-level representation of an algorithm that uses plain English phrases structured like programming constructs without strict syntax",
      "A malicious computer virus that deletes code",
      "A compiled binary executable file",
      "An obsolete programming language from the 1960s"
    ],
    correctAnswer: 0,
    explanationEn: "Pseudocode bridges human thought and code by structuring algorithms with `IF-ELSE`, `WHILE`, and `INPUT/OUTPUT` without syntax strictness.",
    explanationBn: "সিউডোকোড (Pseudocode) হলো সাধারণ ইংরেজি শব্দের মাধ্যমে প্রোগ্রামিং কাঠামোর ন্যায় সাজানো অ্যালগরিদমের একটি রূপ।"
  },
  {
    id: 21,
    question: "What is 'Beta Testing' in the software problem-solving lifecycle?",
    options: [
      "Distributing a pre-release version of software to real external end-users in real-world environments to discover unpredicted edge-case bugs",
      "Testing software using second-generation computers",
      "Testing only on Greek alphabet characters",
      "Deleting beta version files"
    ],
    correctAnswer: 0,
    explanationEn: "Beta testing gathers feedback from real users in production-like environments to uncover unexpected defects before official release.",
    explanationBn: "বেটা টেস্টিং হলো চূড়ান্ত প্রকাশের পূর্বে আসল ব্যবহারকারীদের কাছে সফটওয়্যার দিয়ে বাস্তব পরিবেশে ত্রুটি খুঁজে বের করা।"
  },
  {
    id: 22,
    question: "What is 'Regression Testing'?",
    options: [
      "Re-running existing test cases after making code bug fixes to ensure that new changes have not broken previously functioning features",
      "Testing only linear regression algorithms in Machine Learning",
      "Rolling back computer date and time by 1 year",
      "Decreasing the size of memory chips"
    ],
    correctAnswer: 0,
    explanationEn: "Regression testing verifies that recent code fixes or updates have not inadvertently introduced new bugs into existing features.",
    explanationBn: "রিগ্রেশন টেস্টিং নিশ্চিত করে যে নতুন কোড পরিবর্তনের ফলে আগের কোনো ঠিকঠাক কাজ করা ফিচার নষ্ট হয়নি।"
  },
  {
    id: 23,
    question: "In Python, which built-in function is commonly used for basic diagnostic debugging by printing variable states to the console?",
    options: [
      "print()",
      "input()",
      "id()",
      "type()"
    ],
    correctAnswer: 0,
    explanationEn: "`print()` statements are the most ubiquitous first-line tool used by developers to inspect intermediate variable states during execution.",
    explanationBn: "`print()` ফাংশনের মাধ্যমে প্রোগ্রামের মাঝের ভেরিয়েবলের মান কনসোলে দেখে প্রাথমিক ডিবাগিং সম্পন্ন করা হয়।"
  },
  {
    id: 24,
    question: "What is 'Defensive Programming'?",
    options: [
      "Writing code that anticipates potential user input errors, exceptions, and invalid states, gracefully handling them without crashing",
      "Protecting computers with physical metal shields",
      "Installing anti-virus software on smartphones",
      "Hiding Python source code behind passwords"
    ],
    correctAnswer: 0,
    explanationEn: "Defensive programming validates user inputs and handles exceptions gracefully (e.g., checking `if divisor == 0`) to prevent unexpected crashes.",
    explanationBn: "ডিফেন্সিভ প্রোগ্রামিং হলো ব্যবহারকারীর সম্ভাব্য ভুল ইনপুট বা ব্যতিক্রমী পরিস্থিতি আগে থেকেই অনুমান করে ক্র্যাশ প্রতিরোধ করা।"
  },
  {
    id: 25,
    question: "What is the ultimate objective of adhering to the 5-step problem-solving lifecycle?",
    options: [
      "Developing robust, accurate, efficient, and easily maintainable computer programs that solve the user's requirements reliably",
      "Writing code in fewer than 5 minutes regardless of errors",
      "Making the program file as large as possible",
      "Using every single Python keyword in one script"
    ],
    correctAnswer: 0,
    explanationEn: "The structured lifecycle ensures software is systematically engineered to be correct, robust, scalable, and easy to maintain over time.",
    explanationBn: "সমস্যা সমাধানের এই ৫টি ধাপের মূল লক্ষ্য হলো ব্যবহারকারীর চাহিদা অনুযায়ী একটি নির্ভুল, দক্ষ ও টেকসই সফটওয়্যার তৈরি করা।"
  }
];
