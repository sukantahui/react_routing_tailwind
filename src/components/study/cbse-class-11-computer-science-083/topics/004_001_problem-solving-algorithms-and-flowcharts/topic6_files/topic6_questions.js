export const topic6Questions = [
  {
    id: "t6_q1",
    question: "What does the prefix 'pseudo' in 'Pseudocode' literally mean?",
    options: [
      "Machine-executable",
      "False or Imitation",
      "Fast compilation",
      "Object-oriented"
    ],
    correct: 1,
    explanationEn: "'Pseudo' is derived from Greek meaning false or imitation. Pseudocode is an imitation of actual programming code using informal natural language.",
    explanationBn: "'Pseudo' শব্দের অর্থ নকল বা অনুকরণ। সিউডোকোড হলো প্রাকৃতিক ভাষা ও প্রোগ্রামিং কনস্ট্রাক্টের সমন্বয়ে তৈরি নকল কোড যা সরাসরি কম্পিউটারে চলে না।"
  },
  {
    id: "t6_q2",
    question: "Can pseudocode be compiled or executed directly by a Python interpreter or C++ compiler?",
    options: [
      "Yes, all compilers parse pseudocode automatically",
      "No, pseudocode is language-independent and intended solely for human understanding",
      "Only if saved with a .pseudo file extension",
      "Yes, if the CPU architecture is 64-bit"
    ],
    correct: 1,
    explanationEn: "Pseudocode has no strict formal grammar understood by compilers. It serves exclusively as a human-readable blueprint for problem-solving.",
    explanationBn: "না, সিউডোকোড কোনো নির্দিষ্ট কম্পাইলার বা ইন্টারপ্রেটারে চলে না; এটি শুধুমাত্র মানুষের বোঝার ও যুক্তি সাজানোর জন্য ব্যবহৃত হয়।"
  },
  {
    id: "t6_q3",
    question: "Which of the following is a key advantage of pseudocode over flowcharts for complex algorithms?",
    options: [
      "Pseudocode takes up less space and is much easier to modify or edit without redrawing diagrams",
      "Pseudocode runs 10x faster on GPUs",
      "Flowcharts cannot represent if-else conditions",
      "Pseudocode does not require variables"
    ],
    correct: 0,
    explanationEn: "Pseudocode is compact, easily modified using standard text editors, and avoids the cumbersome geometric redrawing required by complex flowcharts.",
    explanationBn: "সিউডোকোড টেক্সট আকারে থাকায় সহজেই পরিবর্তন ও সংশোধন করা যায়, যেখানে ফ্লোচার্ট পরিবর্তন করতে পুরো চিত্র নতুন করে আঁকতে হয়।"
  },
  {
    id: "t6_q4",
    question: "Which standardized keyword is typically used in pseudocode to accept input values from a user?",
    options: [
      "INPUT / READ / GET",
      "SYSTEM.OUT.PRINTLN",
      "IMPORT",
      "MALLOC"
    ],
    correct: 0,
    explanationEn: "Standard pseudocode keywords for input include INPUT, READ, GET, or PROMPT.",
    explanationBn: "ব্যবহারকারীর কাছ থেকে ডেটা ইনপুট নেওয়ার জন্য সিউডোকোডে INPUT, READ বা GET কিওয়ার্ড ব্যবহার করা হয়।"
  },
  {
    id: "t6_q5",
    question: "Which keyword is traditionally used in pseudocode to assign a new calculated value to a variable?",
    options: [
      "SET or ASSIGN",
      "PRINT",
      "WHILE",
      "INCLUDE"
    ],
    correct: 0,
    explanationEn: "The keyword `SET` (e.g., `SET total = total + x`) or the assignment arrow `<-` is standard in pseudocode.",
    explanationBn: "ভেরিয়েবলে কোনো মান নির্ধারণ বা গণনা যুক্ত করতে `SET` বা `ASSIGN` কিওয়ার্ড ব্যবহার করা হয়।"
  },
  {
    id: "t6_q6",
    question: "Why are standard structural keywords in pseudocode (like IF, THEN, ELSE, WHILE, FOR) conventionally written in UPPERCASE?",
    options: [
      "To satisfy the ASCII compiler validator",
      "To clearly distinguish control flow keywords from variable names and algorithmic logic",
      "Because lowercase letters are not permitted in computer science",
      "To increase memory allocation"
    ],
    correct: 1,
    explanationEn: "Capitalizing keywords makes the control structure immediately obvious and visually separates logic commands from problem-specific variables.",
    explanationBn: "কন্ট্রোল স্ট্রাকচারের কিওয়ার্ডগুলো বড় হাতের অক্ষরে লিখলে ভেরিয়েবল ও কোডের কাঠামোর পার্থক্য সহজেই চোখে পড়ে।"
  },
  {
    id: "t6_q7",
    question: "Consider the pseudocode snippet:\nSET count = 1\nWHILE count <= 5 DO\n    OUTPUT count\n    SET count = count + 2\nENDWHILE\nWhat values are outputted?",
    options: [
      "1, 2, 3, 4, 5",
      "1, 3, 5",
      "2, 4, 6",
      "1, 3, 5, 7"
    ],
    correct: 1,
    explanationEn: "Count starts at 1 (printed), becomes 3 (printed), becomes 5 (printed), then becomes 7 where (7 <= 5) is False. Output: 1, 3, 5.",
    explanationBn: "count এর মান ১ (প্রিন্ট), ৩ (প্রিন্ট), এবং ৫ (প্রিন্ট) হবে। ৭ হলে শর্ত মিথ্যা হয়ে লুপ বন্ধ হবে। ফলে আউটপুট: 1, 3, 5।"
  },
  {
    id: "t6_q8",
    question: "How is block structure and nesting typically represented in clean pseudocode?",
    options: [
      "Using binary machine codes",
      "Using consistent indentation (2 to 4 spaces) and closing keywords (e.g., ENDIF, ENDWHILE)",
      "Using random punctuation marks",
      "By writing everything on a single continuous line"
    ],
    correct: 1,
    explanationEn: "Clean pseudocode relies on indentation and matching closing keywords (like ENDIF, ENDFOR) to denote block scope clearly.",
    explanationBn: "সিউডোকোডে নেস্টিং ও ব্লকের পরিধি বোঝাতে ইন্ডেন্টেশন (স্পেস) এবং সমাপ্তি কিওয়ার্ড (ENDIF, ENDWHILE) ব্যবহার করা হয়।"
  },
  {
    id: "t6_q9",
    question: "Which of the following represents a dual-alternative conditional branch in pseudocode?",
    options: [
      "IF condition THEN ... ELSE ... ENDIF",
      "FOR i = 1 TO 10 DO ... ENDFOR",
      "FUNCTION test() ... ENDFUNCTION",
      "SET x = 10"
    ],
    correct: 0,
    explanationEn: "The `IF ... THEN ... ELSE ... ENDIF` construct represents a two-way (dual alternative) conditional branch.",
    explanationBn: "`IF ... THEN ... ELSE ... ENDIF` কাঠামোটি দ্বি-মুখী বিকল্প শর্ত নির্ধারণে ব্যবহৃত হয়।"
  },
  {
    id: "t6_q10",
    question: "What is the pseudocode equivalent of Python's `for i in range(1, 11):` loop?",
    options: [
      "FOR i FROM 1 TO 10 DO ... ENDFOR",
      "WHILE False DO",
      "IF i == 10 THEN",
      "INPUT 1 TO 10"
    ],
    correct: 0,
    explanationEn: "`FOR i FROM 1 TO 10 DO ... ENDFOR` explicitly defines the starting, ending boundary, and loop action.",
    explanationBn: "পাইথনের `range(1, 11)` লুপটি সিউডোকোডে `FOR i FROM 1 TO 10 DO ... ENDFOR` হিসেবে লেখা হয়।"
  },
  {
    id: "t6_q11",
    question: "What operator is standardly used in pseudocode for calculating division remainders?",
    options: [
      "MOD or %",
      "DIV",
      "^",
      "AND"
    ],
    correct: 0,
    explanationEn: "`MOD` (or `%`) is universally accepted in pseudocode for calculating the remainder of an integer division.",
    explanationBn: "ভাগশেষ বের করার জন্য সিউডোকোডে সার্বজনীনভাবে `MOD` বা `%` অপারেটর ব্যবহার করা হয়।"
  },
  {
    id: "t6_q12",
    question: "What does the statement `RETURN result` denote in a pseudocode subprogram/function?",
    options: [
      "It restarts the computer",
      "It terminates the function and sends the computed value back to the caller",
      "It prints the value to physical paper",
      "It deletes the variable"
    ],
    correct: 1,
    explanationEn: "`RETURN` exits the current function scope and hands the final calculated value back to the calling routine.",
    explanationBn: "`RETURN` কিওয়ার্ড ফাংশনের কাজ শেষ করে এবং গণনাকৃত ফলাফলটি কলকারী অংশে ফেরত পাঠায়।"
  },
  {
    id: "t6_q13",
    question: "Which of the following is NOT a good practice when writing pseudocode?",
    options: [
      "Using language-specific obscure syntax quirks (e.g., C++ pointer arithmetic `*ptr++`)",
      "Indenting conditional blocks and loop bodies",
      "Using meaningful variable names like `totalMarks` or `discountRate`",
      "Writing clear comments to explain non-trivial steps"
    ],
    correct: 0,
    explanationEn: "Pseudocode should remain high-level and language-independent. Low-level syntax quirks defeat the purpose of pseudocode.",
    explanationBn: "সিউডোকোডে কোনো নির্দিষ্ট ভাষার জটিল সিনট্যাক্স (যেমন পয়েন্টার এরিথমেটিক) ব্যবহার করা অনুচিত।"
  },
  {
    id: "t6_q14",
    question: "Consider this pseudocode:\nALGORITHM FindMax(A, B)\nBEGIN\n    IF A >= B THEN\n        SET Max = A\n    ELSE\n        SET Max = B\n    ENDIF\n    RETURN Max\nEND\nWhat is the output for FindMax(15, 23)?",
    options: [
      "15",
      "23",
      "38",
      "-8"
    ],
    correct: 1,
    explanationEn: "Since 15 >= 23 is False, the ELSE branch executes, assigning Max = 23, which is then returned.",
    explanationBn: "১৫ >= ২৩ শর্তটি মিথ্যা হওয়ায় ELSE ব্লক কার্যকর হয় এবং Max = ২৩ রিটার্ন হয়।"
  },
  {
    id: "t6_q15",
    question: "What is the difference between Pseudocode and Natural Language (English)?",
    options: [
      "Pseudocode is strictly structured with formal logic constructs, eliminating natural language ambiguity and wordiness",
      "Pseudocode can only be written in Latin",
      "Natural language has strict compilation rules",
      "There is no difference"
    ],
    correct: 0,
    explanationEn: "Natural language contains ambiguity, idiomatic nuances, and verbosity. Pseudocode applies structured keywords to ensure unambiguous algorithmic flow.",
    explanationBn: "প্রাকৃতিক ভাষায় দ্বি-অর্থবোধকতা ও অস্পষ্টতা থাকে, কিন্তু সিউডোকোড নির্দিষ্ট যৌক্তিক কাঠামোর মাধ্যমে সুস্পষ্ট নির্দেশ প্রদান করে।"
  },
  {
    id: "t6_q16",
    question: "Which loop construct in pseudocode is guaranteed to execute at least once before testing its condition?",
    options: [
      "WHILE ... DO ... ENDWHILE",
      "REPEAT ... UNTIL condition",
      "FOR ... ENDFOR",
      "IF ... THEN"
    ],
    correct: 1,
    explanationEn: "The `REPEAT ... UNTIL` construct is a post-test loop where the body executes first, and the exit condition is checked at the bottom.",
    explanationBn: "`REPEAT ... UNTIL` হলো একটি পোস্ট-টেস্ট লুপ যার বডি অন্তত একবার চলার পর শেষে শর্ত যাচাই করা হয়।"
  },
  {
    id: "t6_q17",
    question: "In the pseudocode loop `REPEAT ... UNTIL condition`, when does the loop stop?",
    options: [
      "When the condition becomes TRUE",
      "When the condition becomes FALSE",
      "After exactly 10 iterations always",
      "Never"
    ],
    correct: 0,
    explanationEn: "Unlike a WHILE loop (which continues WHILE condition is True), an UNTIL loop repeats UNTIL the condition becomes True (stops on True).",
    explanationBn: "WHILE লুপ শর্ত সত্য থাকলে চলে, কিন্তু REPEAT-UNTIL লুপ শর্ত সত্য (True) হওয়া মাত্র থেমে যায়।"
  },
  {
    id: "t6_q18",
    question: "Why do software development teams create pseudocode before writing production code?",
    options: [
      "To verify logic correctness with team members and stakeholders before investing time in language syntax",
      "Because pseudocode is required by the computer hardware",
      "To slow down the project delivery",
      "Because Python requires a pseudocode import module"
    ],
    correct: 0,
    explanationEn: "Pseudocode enables rapid peer review, logical validation, and algorithmic optimization before committing to syntax-heavy programming.",
    explanationBn: "কোডিং করার আগে যুক্তির নির্ভুলতা যাচাই ও দলের সবার সাথে আলোচনা করে অ্যালগরিদম ঠিক করার জন্য সিউডোকোড লেখা হয়।"
  },
  {
    id: "t6_q19",
    question: "What will be stored in `sum` after this pseudocode executes?\nSET sum = 0\nSET i = 1\nWHILE i <= 4 DO\n    SET sum = sum + (i * i)\n    SET i = i + 1\nENDWHILE",
    options: [
      "10",
      "30",
      "16",
      "100"
    ],
    correct: 1,
    explanationEn: "The loop sums the squares of numbers 1 to 4: 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30.",
    explanationBn: "১ থেকে ৪ পর্যন্ত সংখ্যার বর্গের যোগফল: ১ + ৪ + ৯ + ১৬ = ৩০।"
  },
  {
    id: "t6_q20",
    question: "Which of the following correctly translates the condition 'X is between 10 and 50 inclusive' in pseudocode?",
    options: [
      "IF (X >= 10 AND X <= 50) THEN",
      "IF 10 < X > 50 THEN",
      "IF X == 10 OR 50 THEN",
      "IF X IN RANGE(10, 50)"
    ],
    correct: 0,
    explanationEn: "The universal logical expression is `IF (X >= 10 AND X <= 50) THEN`.",
    explanationBn: "সার্বজনীন যৌক্তিক প্রকাশ হলো `IF (X >= 10 AND X <= 50) THEN`।"
  },
  {
    id: "t6_q21",
    question: "What is the purpose of the `BREAK` statement inside a pseudocode loop?",
    options: [
      "To pause execution for 5 seconds",
      "To immediately terminate and exit the containing loop prematurely",
      "To crash the program",
      "To delete the loop counter"
    ],
    correct: 1,
    explanationEn: "`BREAK` causes an immediate premature exit from the enclosing loop, transferring control to the statement directly following the loop.",
    explanationBn: "`BREAK` স্টেটমেন্ট লুপের স্বাভাবিক পুনরাবৃত্তি ভেঙে সাথে সাথে লুপ থেকে বের হয়ে আসে।"
  },
  {
    id: "t6_q22",
    question: "Which keyword can be used inside a loop to skip the rest of the current iteration and jump straight to the next iteration?",
    options: [
      "CONTINUE / NEXT",
      "STOP",
      "EXIT",
      "HALT"
    ],
    correct: 0,
    explanationEn: "`CONTINUE` (or `NEXT`) skips the remaining lines of the current loop cycle and advances to the next iteration cycle.",
    explanationBn: "`CONTINUE` বা `NEXT` বর্তমান চক্রের বাকি কাজ বাদ দিয়ে সরাসরি পরবর্তী ইটারেশনে চলে যায়।"
  },
  {
    id: "t6_q23",
    question: "How are 1D Array elements typically accessed in pseudocode?",
    options: [
      "Using index brackets like A[i] or Array(i)",
      "Using pointer arrows only `A->i`",
      "Using HTML tags `<A>`",
      "Arrays cannot be used in pseudocode"
    ],
    correct: 0,
    explanationEn: "Arrays are universally accessed via bracket index notation `A[i]` or `Array[index]` in pseudocode.",
    explanationBn: "সিউডোকোডে অ্যারের উপাদানগুলোকে সূচক বা ইনডেক্স ব্র্যাকেট `A[i]` দ্বারা চিহ্নিত করা হয়।"
  },
  {
    id: "t6_q24",
    question: "What is the output of the following pseudocode?\nSET X = 10\nSET Y = 20\nSET X = X + Y\nSET Y = X - Y\nSET X = X - Y\nOUTPUT X, Y",
    options: [
      "10, 20",
      "20, 10",
      "30, 30",
      "0, 0"
    ],
    correct: 1,
    explanationEn: "This is the classic arithmetic swap without a temporary variable: X becomes 30; Y becomes 30 - 20 = 10; X becomes 30 - 10 = 20. Output: 20, 10.",
    explanationBn: "তৃতীয় চলক ছাড়া দুটি চলকের মান অদলবদল (Swap): X = ৩০; Y = ৩০ - ২০ = ১০; X = ৩০ - ১০ = ২০। আউটপুট: 20, 10।"
  },
  {
    id: "t6_q25",
    question: "Which statement best describes the relationship between an Algorithm, Pseudocode, and a Python program?",
    options: [
      "Algorithm is the conceptual solution; Pseudocode is the structured textual blueprint; Python is the executable implementation",
      "They are three different programming languages developed by Microsoft",
      "Flowcharts replace Python completely in modern computers",
      "Pseudocode runs on the CPU while Python runs on the monitor"
    ],
    correct: 0,
    explanationEn: "An algorithm is the logical idea/strategy, pseudocode represents it in structured human-readable text, and Python is the executable code implementation.",
    explanationBn: "অ্যালগরিদম হলো সমস্যা সমাধানের যৌক্তিক চিন্তা; সিউডোকোড হলো তার মানব-পাঠ্য কাঠামো; আর পাইথন হলো কম্পিউটারে চালনাযোগ্য বাস্তব রূপ।"
  }
];
