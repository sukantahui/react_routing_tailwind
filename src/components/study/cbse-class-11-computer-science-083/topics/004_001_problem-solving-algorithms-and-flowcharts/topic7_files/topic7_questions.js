export const topic7Questions = [
  {
    id: "t7_q1",
    question: "What is a 'Dry Run' (Desk Checking) in computer science?",
    options: [
      "Running code on a supercomputer without water cooling",
      "Manually tracing an algorithm step-by-step on paper to verify its logic and record variable states",
      "Compiling code without syntax errors",
      "Erasing hard drive data"
    ],
    correct: 1,
    explanationEn: "A dry run is a manual, pen-and-paper tracing technique used by programmers to test algorithm correctness before writing code.",
    explanationBn: "ড্রাই রান (বা ডেস্ক চেকিং) হলো কম্পিউটারে কোড চালানোর আগে কাগজে-কলমে ধাপে ধাপে অ্যালগরিদম পর্যবেক্ষণ করে চলকের মান যাচাইয়ের পদ্ধতি।"
  },
  {
    id: "t7_q2",
    question: "What is the primary function of a Trace Table?",
    options: [
      "To store graphics files",
      "To systematically record the values of variables at each step or iteration of an algorithm",
      "To count CPU clock speed",
      "To connect network cables"
    ],
    correct: 1,
    explanationEn: "A trace table provides a column-by-column log of variable mutations and condition checks across loop iterations.",
    explanationBn: "ট্রেস টেবিল প্রতিটি ধাপে বা লুপের আবর্তনে চলকগুলোর পরিবর্তিত মান সুশৃঙ্খলভাবে রেকর্ড করে।"
  },
  {
    id: "t7_q3",
    question: "Which of the following errors is most easily identified by constructing a dry-run trace table?",
    options: [
      "Off-by-one loop errors (e.g., `<` vs `<=`)",
      "Syntax errors in C++ headers",
      "Physical keyboard disconnects",
      "Monitor refresh rate"
    ],
    correct: 0,
    explanationEn: "Trace tables reveal whether a loop iterates one time too few or one time too many by tracking the exact iteration count.",
    explanationBn: "ট্রেস টেবিলের মাধ্যমে লুপ প্রয়োজনের চেয়ে একবার বেশি বা কম চলছে কিনা (Off-by-one error) তা তাৎক্ষণিকভাবে ধরা পড়ে।"
  },
  {
    id: "t7_q4",
    question: "Consider the algorithm:\nSET x = 1\nSET sum = 0\nWHILE x < 4 DO\n    SET sum = sum + x\n    SET x = x + 1\nENDWHILE\nWhat is the final value of `sum` in the trace table?",
    options: [
      "10",
      "6",
      "3",
      "4"
    ],
    correct: 1,
    explanationEn: "Iterations: (1) x=1: sum=1, x=2; (2) x=2: sum=1+2=3, x=3; (3) x=3: sum=3+3=6, x=4; Condition 4 < 4 is False. Final sum = 6.",
    explanationBn: "লুপ চলবে x = ১, ২, এবং ৩ এর জন্য। sum = ১ + ২ + ৩ = ৬। x = ৪ হলে লুপ থেমে যাবে। চূড়ান্ত মান ৬।"
  },
  {
    id: "t7_q5",
    question: "In the previous question, what is the final value of `x` when the loop condition `x < 4` evaluates to False?",
    options: [
      "3",
      "4",
      "5",
      "0"
    ],
    correct: 1,
    explanationEn: "Inside the last iteration where x was 3, `x = x + 1` makes x = 4. The condition `4 < 4` is False, so the loop terminates with x = 4.",
    explanationBn: "তৃতীয় ইটারেশনে `x = x + 1` এর ফলে x এর মান ৪ হয়, এবং ৪ < ৪ শর্তটি মিথ্যা হয়ে লুপ বন্ধ হয়। ফলে x এর শেষ মান ৪।"
  },
  {
    id: "t7_q6",
    question: "What logic defect occurs if an accumulator variable (like `sum = 0`) is erroneously placed INSIDE the body of a loop?",
    options: [
      "The program runs at double speed",
      "The accumulator resets to 0 on every iteration, losing previously accumulated totals",
      "The computer crashes immediately",
      "The loop never terminates"
    ],
    correct: 1,
    explanationEn: "Re-initializing an accumulator inside the loop wipes out previously stored results on each iteration cycle.",
    explanationBn: "লুপের ভেতর `sum = 0` রাখলে প্রতিবার লুপ ঘোরার সময় পূর্বের জমানো মান মুছে গিয়ে শূন্য হয়ে যাবে।"
  },
  {
    id: "t7_q7",
    question: "What values does variable `digit` take during the dry run of `Sum of Digits` for N = 538?",
    options: [
      "5, 3, 8",
      "8, 3, 5",
      "538",
      "16"
    ],
    correct: 1,
    explanationEn: "Using `digit = N % 10` extracts digits from right to left: 538 % 10 = 8; 53 % 10 = 3; 5 % 10 = 5. Sequence: 8, 3, 5.",
    explanationBn: "`N % 10` এর মাধ্যমে ডানদিক থেকে অঙ্ক পৃথক হয়: ৫৩৮ % ১০ = ৮, ৫৩ % ১০ = ৩, ৫ % ১০ = ৫। ক্রম: ৮, ৩, ৫।"
  },
  {
    id: "t7_q8",
    question: "Consider this trace snippet:\nStep 1: a=24, b=18, rem=6\nStep 2: a=18, b=6, rem=0\nStep 3: a=6, b=0 (Halt)\nWhich classical algorithm is being traced?",
    options: [
      "Bubble Sort",
      "Euclidean Algorithm for Greatest Common Divisor (GCD / HCF)",
      "Binary Search",
      "Selection Sort"
    ],
    correct: 1,
    explanationEn: "This is Euclid's GCD algorithm where remainder is calculated repeatedly until b becomes 0, leaving GCD = 6.",
    explanationBn: "এটি ইউক্লিডের গসাগু (GCD) নির্ণয়ের অ্যালগরিদম, যেখানে ভাগশেষ শূন্য না হওয়া পর্যন্ত প্রতিস্থাপন চলতে থাকে।"
  },
  {
    id: "t7_q9",
    question: "When performing a dry run, which test cases are most critical to test?",
    options: [
      "Only very large random numbers",
      "Boundary values, zero, negative numbers (if applicable), and standard typical cases",
      "Only odd numbers",
      "Only numbers divisible by 100"
    ],
    correct: 1,
    explanationEn: "Boundary conditions (edge cases like 0, 1, negative inputs, empty lists) reveal subtle bugs that typical cases hide.",
    explanationBn: "প্রান্তিক মান (০, ১, ঋণাত্মক সংখ্যা, বা সীমানা মান) যাচাই করলে লুকানো লজিক্যাল ভুলগুলো দ্রুত ধরা পড়ে।"
  },
  {
    id: "t7_q10",
    question: "What is an 'unreachable code' branch in a flowchart or algorithm?",
    options: [
      "Code located in a locked folder",
      "A statement or branch whose conditional logic can never evaluate to True under any valid inputs",
      "Code written in machine language",
      "Code without comments"
    ],
    correct: 1,
    explanationEn: "Unreachable code is dead code that can never be executed because prior conditions prevent control flow from ever reaching it.",
    explanationBn: "আনরিচেবল কোড হলো এমন অংশ যেখানে শর্তের কারণে প্রোগ্রামের কন্ট্রোল কোনো অবস্থাতেই পৌঁছাতে পারে না (মৃত কোড)।"
  },
  {
    id: "t7_q11",
    question: "Trace this loop:\nSET count = 10\nWHILE count > 0 DO\n    SET count = count - 3\nENDWHILE\nHow many times does the loop body execute?",
    options: [
      "3 times",
      "4 times",
      "10 times",
      "Infinite times"
    ],
    correct: 1,
    explanationEn: "Iteration 1: count becomes 7 (7>0); Iteration 2: count becomes 4 (4>0); Iteration 3: count becomes 1 (1>0); Iteration 4: count becomes -2 (-2>0 is False). Total = 4 iterations.",
    explanationBn: "১ম ধাপ: count = ৭; ২য় ধাপ: count = ৪; ৩য় ধাপ: count = ১; ৪র্থ ধাপ: count = -২ (শর্ত মিথ্যা)। মোট ৪ বার কার্যকর হয়।"
  },
  {
    id: "t7_q12",
    question: "What is the value of `count` after the loop in Question 11 terminates?",
    options: [
      "0",
      "1",
      "-2",
      "-3"
    ],
    correct: 2,
    explanationEn: "In the 4th iteration, `count = 1 - 3 = -2`. Since `-2 > 0` is False, the loop halts with count = -2.",
    explanationBn: "চতুর্থ ধাপে ১ - ৩ = -২ হয়, এবং -২ > ০ শর্তটি মিথ্যা হওয়ায় লুপ শেষ হয়। ফলে count এর মান -২।"
  },
  {
    id: "t7_q13",
    question: "In Python, which built-in function or tool allows interactive step-by-step debugging similar to an automated dry run?",
    options: [
      "`pdb` (Python Debugger) or IDE step-over breakpoints",
      "`math.sqrt()`",
      "`random.choice()`",
      "`sys.exit()`"
    ],
    correct: 0,
    explanationEn: "The `pdb` module and modern IDE debuggers allow developers to step through code line-by-line while inspecting variables in real time.",
    explanationBn: "পাইথনের `pdb` মডিউল এবং আধুনিক IDE এর ডিবাগার লাইন ধরে কোড এক্সিকিউট ও ভেরিয়েবলের মান পর্যবেক্ষণ করার সুবিধা দেয়।"
  },
  {
    id: "t7_q14",
    question: "What is the output of the following dry run trace?\nSET a = 5\nSET b = 2\nSET result = a ^ b (power)\nOUTPUT result",
    options: [
      "7",
      "10",
      "25",
      "3"
    ],
    correct: 2,
    explanationEn: "5 raised to the power of 2 (5^2 or 5**2) equals 25.",
    explanationBn: "৫ এর ঘাত ২ (৫^২) হলে ফলাফল হয় ২৫।"
  },
  {
    id: "t7_q15",
    question: "Trace this loop:\nSET p = 1\nFOR i = 1 TO 4 DO\n    SET p = p * 2\nENDFOR\nWhat is the final value of `p`?",
    options: [
      "8",
      "16",
      "32",
      "4"
    ],
    correct: 1,
    explanationEn: "p doubles 4 times: 1 * 2 = 2 -> 2 * 2 = 4 -> 4 * 2 = 8 -> 8 * 2 = 16.",
    explanationBn: "p এর মান প্রতি ধাপে দ্বিগুণ হয়: ১ -> ২ -> ৪ -> ৮ -> ১৬। চূড়ান্ত মান ১৬।"
  },
  {
    id: "t7_q16",
    question: "Why should a programmer check intermediate variable states rather than only looking at the final output?",
    options: [
      "Because two canceling logic bugs can produce a coincidentally correct final output on one specific test case while failing on others",
      "To waste extra paper",
      "Because intermediate states are required by the OS",
      "Because variables change names randomly"
    ],
    correct: 0,
    explanationEn: "Coincidental correctness can mask serious logic bugs if two errors happen to cancel each other out for a specific input.",
    explanationBn: "দুটি বিপরীতমুখী ভুলের কারণে কোনো একটি টেস্ট কেসে ফলাফল দৈবক্রমে সঠিক হতে পারে, যা মধ্যবর্তী মান পর্যবেক্ষণ না করলে বোঝা যায় না।"
  },
  {
    id: "t7_q17",
    question: "Consider this pseudocode:\nSET total = 0\nFOR i FROM 1 TO 5 DO\n    IF i MOD 2 == 0 THEN\n        SET total = total + i\n    ENDIF\nENDFOR\nWhat is the final value of `total`?",
    options: [
      "6 (sum of 2 and 4)",
      "9 (sum of 1, 3, 5)",
      "15 (sum of 1 to 5)",
      "0"
    ],
    correct: 0,
    explanationEn: "The condition `i MOD 2 == 0` filters for even numbers. Even numbers between 1 and 5 are 2 and 4. Total = 2 + 4 = 6.",
    explanationBn: "`i MOD 2 == 0` শর্তটি কেবল জোড় সংখ্যা যাচাই করে। ১ থেকে ৫ এর মধ্যে জোড় সংখ্যা হলো ২ ও ৪। যোগফল = ২ + ৪ = ৬।"
  },
  {
    id: "t7_q18",
    question: "What is the primary role of a 'Loop Invariant' in dry run verification?",
    options: [
      "A condition that remains true before and after every single iteration of a loop",
      "A variable that changes randomly",
      "An output statement",
      "A hardware component"
    ],
    correct: 0,
    explanationEn: "A loop invariant is a formal logical property that holds true throughout the lifecycle of the loop, mathematically proving algorithm correctness.",
    explanationBn: "লুপ ইনভেরিয়েন্ট হলো এমন একটি যৌক্তিক সম্পর্ক যা লুপ চলার শুরু থেকে শেষ পর্যন্ত প্রতিটি আবর্তনে অপরিবর্তিত ও সত্য থাকে।"
  },
  {
    id: "t7_q19",
    question: "In dry running a sorting algorithm (like Bubble Sort on array [4, 2, 1]), what represents one complete 'Pass'?",
    options: [
      "Comparing every adjacent pair once through the entire array",
      "Deleting the array",
      "Printing the first element only",
      "Turning off the screen"
    ],
    correct: 0,
    explanationEn: "A pass in Bubble Sort refers to traversing the array from beginning to end, comparing adjacent elements and swapping if out of order.",
    explanationBn: "বাবল সর্টে একটি পাস বলতে পুরো অ্যারটি শুরু থেকে শেষ পর্যন্ত একবার স্ক্যান করে পাশাপাশি উপাদানগুলোর তুলনা ও অদলবদল করা বোঝায়।"
  },
  {
    id: "t7_q20",
    question: "During dry run of Integer Division `Q = A // B` and Remainder `R = A % B` with A=17 and B=5, what are Q and R?",
    options: [
      "Q = 3, R = 2",
      "Q = 2, R = 3",
      "Q = 3.4, R = 0",
      "Q = 5, R = 17"
    ],
    correct: 0,
    explanationEn: "17 divided by 5 yields quotient Q = 3 (since 5*3=15) and remainder R = 17 - 15 = 2.",
    explanationBn: "১৭ কে ৫ দিয়ে ভাগ করলে ভাগফল Q = ৩ (৫*৩=১৫) এবং ভাগশেষ R = ১৭ - ১৫ = ২।"
  },
  {
    id: "t7_q21",
    question: "What will be printed by this dry run?\nSET x = 5\nWHILE x > 0 DO\n    OUTPUT x\n    SET x = x - 2\nENDWHILE",
    options: [
      "5, 3, 1",
      "5, 4, 3, 2, 1",
      "5, 3, 1, -1",
      "5"
    ],
    correct: 0,
    explanationEn: "x starts at 5 (printed), becomes 3 (printed), becomes 1 (printed), then becomes -1 where condition `-1 > 0` fails. Output: 5, 3, 1.",
    explanationBn: "x এর মান ৫ (প্রিন্ট), ৩ (প্রিন্ট), এবং ১ (প্রিন্ট) হবে। -১ হলে শর্ত মিথ্যা হয়ে লুপ বন্ধ হবে। ফলে আউটপুট: 5, 3, 1।"
  },
  {
    id: "t7_q22",
    question: "What is the state of boolean flag `found` in a Linear Search trace if the target element is NOT present in the list?",
    options: [
      "It remains `False` (initial state)",
      "It automatically becomes `True`",
      "It changes to `None`",
      "It throws a syntax error"
    ],
    correct: 0,
    explanationEn: "If the target is never found, the assignment `found = True` inside the IF condition never executes, preserving the initial `False`.",
    explanationBn: "খোঁজ করা মানটি তালিকায় না থাকলে IF ব্লকের ভেতর কোড প্রবেশ না করায় `found` ফ্ল্যাগটি প্রাথমিক `False` অবস্থাতেই থেকে যায়।"
  },
  {
    id: "t7_q23",
    question: "In tracing the Fibonacci series up to 5 terms (0, 1, 1, 2, 3), what are the values of (a, b) at step 3 if initialized with a=0, b=1?",
    options: [
      "a = 1, b = 2",
      "a = 0, b = 1",
      "a = 2, b = 3",
      "a = 5, b = 8"
    ],
    correct: 0,
    explanationEn: "Init: (0, 1) -> Step 1: next=1, a=1, b=1 -> Step 2: next=2, a=1, b=2 -> Step 3: next=3, a=2, b=3. At start of step 3 window, a=1, b=2.",
    explanationBn: "ধাপ ১: a=১, b=১; ধাপ ২: a=১, b=২; ধাপ ৩: a=২, b=৩।"
  },
  {
    id: "t7_q24",
    question: "Why are dry-run trace tables frequently requested in CBSE Class 11 theory examinations?",
    options: [
      "To test whether students understand the exact internal state mutation and step-by-step execution dynamics of algorithms",
      "Because students do not have computers during the board exam",
      "Both A and B",
      "Neither A nor B"
    ],
    correct: 2,
    explanationEn: "Dry runs both test deep computational thinking skills and evaluate a student's ability to simulate CPU execution without a machine.",
    explanationBn: "ট্রেস টেবিল শিক্ষার্থীদের অ্যালগরিদমের অভ্যন্তরীণ পরিবর্তন বোঝার গভীরতা এবং কম্পিউটার ছাড়া নিজে নিজে কোড পর্যালোচনার দক্ষতা মূল্যায়ন করে।"
  },
  {
    id: "t7_q25",
    question: "What is the best practice after completing a manual trace table for an algorithm?",
    options: [
      "Compare the final values against the expected mathematical outcome for the given input",
      "Throw away the notes",
      "Rewrite the entire algorithm in HTML",
      "Ignore any discrepancy"
    ],
    correct: 0,
    explanationEn: "Comparing observed trace table outputs against known correct mathematical solutions validates algorithmic soundness.",
    explanationBn: "ট্রেস টেবিল থেকে প্রাপ্ত চূড়ান্ত মানের সাথে প্রত্যাশিত গাণিতিক ফলাফল মিলিয়ে দেখে অ্যালগরিদমের নির্ভুলতা নিশ্চিত করতে হয়।"
  }
];
