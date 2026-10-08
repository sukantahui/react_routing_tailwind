const topic7_questions = [
  {
    id: 1,
    question: "What is 'fall-through' in a Java `switch` statement?",
    options: [
      "The execution of subsequent case statements without checking their labels when a preceding case omits a `break;` statement.",
      "A JVM crash caused by infinite recursion in switch.",
      "The automatic re-evaluation of the switch condition.",
      "The conversion of an integer to a float."
    ],
    correctAnswer: 0,
    explanation: "When a `case` matches and does not end with `break;`, control flows unconditionally into the next case, executing its statements regardless of whether its label matches.",
    explanationBn: "সুইচের কোনো কেস মেলার পর যদি `break;` না থাকে, তবে পরবর্তী কেসের শর্ত না মিলিয়েই সরাসরি তার কোড কার্যকর করাকে 'fall-through' বলে।",
    hint: "Cascading execution into next cases without checking labels."
  },
  {
    id: 2,
    question: "During fall-through, does Java evaluate the case labels of the subsequent cases it executes?",
    options: [
      "No, once execution enters a switch block, subsequent case labels are completely ignored during fall-through.",
      "Yes, it tests each label and stops if they don't match.",
      "Only if the cases have numbers.",
      "Only in 64-bit systems."
    ],
    correctAnswer: 0,
    explanation: "Once inside, Java treats all subsequent code as a continuous stream of instructions until a `break;` or `}` is reached, ignoring case labels entirely.",
    explanationBn: "একবার ভেতরে প্রবেশের পর জাভা পরবর্তী কোনো কেস লেবেল পরীক্ষা করে না; ব্রেক না পাওয়া পর্যন্ত সব কোড অন্ধের মতো চালিয়ে যায়।",
    hint: "Case labels are ignored during fall-through."
  },
  {
    id: 3,
    question: "What is the output of the following Java snippet?\nint n = 2;\nswitch (n) {\n  case 1: System.out.print(\"A\");\n  case 2: System.out.print(\"B\");\n  case 3: System.out.print(\"C\");\n  default: System.out.print(\"D\");\n}",
    options: [
      "BCD",
      "B",
      "BC",
      "ABCD"
    ],
    correctAnswer: 0,
    explanation: "`n = 2` jumps to `case 2:`. It prints \"B\". Since there are NO `break` statements anywhere, execution cascades through `case 3:` (prints \"C\") and `default:` (prints \"D\"), producing \"BCD\".",
    explanationBn: "n=২ মেলায় case 2 চলে (\"B\"); কোনো break না থাকায় case 3 (\"C\") এবং default (\"D\") সবগুলি চলে। আউটপুট: \"BCD\"।",
    hint: "Falls through case 2, 3, and default."
  },
  {
    id: 4,
    question: "What is the output of the following Java snippet?\nint n = 2;\nswitch (n) {\n  case 1: System.out.print(\"A\");\n  case 2: System.out.print(\"B\");\n  case 3: System.out.print(\"C\"); break;\n  default: System.out.print(\"D\");\n}",
    options: [
      "BC",
      "B",
      "BCD",
      "C"
    ],
    correctAnswer: 0,
    explanation: "`n = 2` prints \"B\", falls into `case 3:` printing \"C\", and then hits `break;` which stops further execution. Output: \"BC\".",
    explanationBn: "case 2-তে \"B\" প্রিন্ট হয়, নিচে গড়িয়ে case 3-তে \"C\" প্রিন্ট হয় এবং break-এ এসে থেমে যায়। আউটপুট: \"BC\"।",
    hint: "Stops at break in case 3."
  },
  {
    id: 5,
    question: "When is fall-through INTENTIONALLY used by Java programmers?",
    options: [
      "When multiple case labels should execute the exact same block of code (e.g. grouping vowels or weekdays).",
      "To make the JVM run faster.",
      "To bypass variable initialization.",
      "To avoid writing switch closing braces."
    ],
    correctAnswer: 0,
    explanation: "Intentional fall-through allows grouping multiple case labels together (e.g. `case 'A': case 'E': case 'I': case 'O': case 'U':`) to share a single handler block.",
    explanationBn: "একাধিক কেস লেবেল যখন হুবহু একই কাজ সম্পাদন করে (যেমন ভাওয়েল বা ছুটির দিন চিহ্নিতকরণ), তখন ইচ্ছাকৃতভাবে fall-through ব্যবহার করা হয়।",
    hint: "Grouping multiple cases to share logic."
  },
  {
    id: 6,
    question: "What is the output of the following Java code?\nchar ch = 'o';\nswitch (ch) {\n  case 'a': case 'e': case 'i': case 'o': case 'u':\n    System.out.println(\"Vowel\");\n    break;\n  default:\n    System.out.println(\"Consonant\");\n}",
    options: [
      "Vowel",
      "Consonant",
      "VowelConsonant",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`ch = 'o'` matches `case 'o':`. Because of intentional fall-through, it enters the shared statement block, prints \"Vowel\", and breaks.",
    explanationBn: "`ch = 'o'` কেস 'o'-এর সাথে মেলে এবং শেয়ার করা ব্লকে গিয়ে \"Vowel\" প্রিন্ট করে ব্রেক করে।",
    hint: "Vowel cases are stacked."
  },
  {
    id: 7,
    question: "What is the output of the following Java snippet?\nint day = 6;\nswitch (day) {\n  case 1: case 2: case 3: case 4: case 5:\n    System.out.println(\"Work\");\n    break;\n  case 6: case 7:\n    System.out.println(\"Rest\");\n    break;\n  default:\n    System.out.println(\"Invalid\");\n}",
    options: [
      "Rest",
      "Work",
      "WorkRest",
      "Invalid"
    ],
    correctAnswer: 0,
    explanation: "`day = 6` jumps to `case 6:`, falls through into `case 7:`'s shared block, prints \"Rest\", and breaks.",
    explanationBn: "`day = 6` কেস ৬-এ গিয়ে নিচে ৭-এর ব্লকে প্রবেশ করে \"Rest\" প্রিন্ট করে এবং ব্রেক করে।",
    hint: "Day 6 and 7 print Rest."
  },
  {
    id: 8,
    question: "What is the output of the following Java code?\nint x = 1;\nswitch (x) {\n  case 1: x += 2;\n  case 2: x += 3;\n  case 3: x += 4; break;\n  default: x += 5;\n}\nSystem.out.println(x);",
    options: [
      "10",
      "3",
      "6",
      "15"
    ],
    correctAnswer: 0,
    explanation: "1) `case 1:`: `x` becomes `1 + 2 = 3`. 2) Falls through to `case 2:`: `x` becomes `3 + 3 = 6`. 3) Falls through to `case 3:`: `x` becomes `6 + 4 = 10`. 4) Hits `break;`. Final `x = 10`.",
    explanationBn: "১) case 1: x = ১ + ২ = ৩; ২) case 2: x = ৩ + ৩ = ৬; ৩) case 3: x = ৬ + ৪ = ১০; ৪) break হয়। চূড়ান্ত x = ১০।",
    hint: "1 + 2 + 3 + 4 = 10."
  },
  {
    id: 9,
    question: "What is the output of the code in Question 8 if initial `x = 2`?\nint x = 2;\nswitch (x) {\n  case 1: x += 2;\n  case 2: x += 3;\n  case 3: x += 4; break;\n  default: x += 5;\n}\nSystem.out.println(x);",
    options: [
      "9",
      "10",
      "5",
      "14"
    ],
    correctAnswer: 0,
    explanation: "1) Jumps directly to `case 2:`: `x` becomes `2 + 3 = 5`. 2) Falls through to `case 3:`: `x` becomes `5 + 4 = 9`. 3) Hits `break;`. Output: 9.",
    explanationBn: "x=২ সরাসরি case 2-তে যায়: ২+৩=৫; তারপর case 3-তে গড়ায়: ৫+৪=৯; ব্রেক করে বেরিয়ে আসে। আউটপুট: ৯।",
    hint: "2 + 3 + 4 = 9."
  },
  {
    id: 10,
    question: "What is the output of the code in Question 8 if initial `x = 5`?\nint x = 5;\nswitch (x) {\n  case 1: x += 2;\n  case 2: x += 3;\n  case 3: x += 4; break;\n  default: x += 5;\n}\nSystem.out.println(x);",
    options: [
      "10",
      "5",
      "15",
      "0"
    ],
    correctAnswer: 0,
    explanation: "`x = 5` matches none of 1, 2, 3. It jumps to `default:`, computing `x = 5 + 5 = 10`.",
    explanationBn: "x=৫ কোনো কেসে না মেলায় default চলে: ৫ + ৫ = ১০।",
    hint: "Default adds 5 to 5."
  },
  {
    id: 11,
    question: "What is the output of the following Java snippet?\nint a = 0;\nswitch (a) {\n  case 0: System.out.print(\"Zero \");\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \");\n}",
    options: [
      "Zero One ",
      "Zero ",
      "Zero One Two ",
      "One "
    ],
    correctAnswer: 0,
    explanation: "`a = 0` matches `case 0:` (\"Zero \"), falls through into `case 1:` (\"One \"), and halts at `break;`. Output: \"Zero One \".",
    explanationBn: "case 0 চলে (\"Zero \"), নিচে case 1-এ গড়িয়ে (\"One \") প্রিন্ট করে এবং ব্রেক করে।",
    hint: "Zero One."
  },
  {
    id: 12,
    question: "Can a `default` clause cause fall-through into regular `case` blocks?",
    options: [
      "Yes, if `default` is placed before other cases and does not contain a `break;` statement.",
      "No, default can never fall through.",
      "Only in Java 1.2.",
      "Only if cases are characters."
    ],
    correctAnswer: 0,
    explanation: "If `default` appears at the top or in the middle without a `break;`, execution cascades into whatever `case` is written immediately below it.",
    explanationBn: "`default` যদি শুরুতে বা মাঝে থাকে এবং তাতে `break;` না থাকে, তবে এটি নিচের কেসগুলোতে অনায়াসে গড়িয়ে পড়ে।",
    hint: "Default behaves like any other case without break."
  },
  {
    id: 13,
    question: "What is the output of the following Java snippet?\nint val = 99;\nswitch (val) {\n  default: System.out.print(\"D \");\n  case 1: System.out.print(\"1 \");\n  case 2: System.out.print(\"2 \"); break;\n  case 3: System.out.print(\"3 \");\n}",
    options: [
      "D 1 2 ",
      "D ",
      "D 1 ",
      "D 1 2 3 "
    ],
    correctAnswer: 0,
    explanation: "`val = 99` enters `default:` (\"D \"), falls into `case 1:` (\"1 \"), then falls into `case 2:` (\"2 \"), and halts at `break;`. Output: \"D 1 2 \".",
    explanationBn: "val=৯৯ default-এ গিয়ে \"D \" দেয়; break না থাকায় case 1-এ গিয়ে \"1 \" এবং case 2-তে গিয়ে \"2 \" প্রিন্ট করে ব্রেক করে।",
    hint: "Falls through default -> case 1 -> case 2."
  },
  {
    id: 14,
    question: "What is the output of the following Java snippet?\nint val = 1;\nswitch (val) {\n  default: System.out.print(\"D \");\n  case 1: System.out.print(\"1 \");\n  case 2: System.out.print(\"2 \"); break;\n  case 3: System.out.print(\"3 \");\n}",
    options: [
      "1 2 ",
      "D 1 2 ",
      "1 ",
      "D 1 "
    ],
    correctAnswer: 0,
    explanation: "Even though `default` is at the top, `case 1:` matches first! It prints \"1 \", falls into `case 2:` (\"2 \"), and halts at `break;`. Output: \"1 2 \".",
    explanationBn: "default উপরে থাকলেও জাভা আগে case 1 মেলায়। তাই \"1 \" প্রিন্ট হয়ে নিচে case 2-তে গিয়ে \"2 \" প্রিন্ট করে ব্রেক করে। ফলাফল: \"1 2 \"।",
    hint: "Case 1 matches, default is skipped."
  },
  {
    id: 15,
    question: "What is the output of the following Java code?\nint c = 3;\nswitch (c) {\n  case 1: System.out.print(\"A\"); break;\n  case 2: System.out.print(\"B\"); break;\n  case 3:\n  case 4: System.out.print(\"C\"); break;\n  default: System.out.print(\"D\");\n}",
    options: [
      "C",
      "CD",
      "ABCD",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "`case 3:` is empty and intentionally falls through into `case 4:`, printing \"C\" and breaking.",
    explanationBn: "`case 3:` ফাঁকা হওয়ায় নিচে case 4-এ প্রবেশ করে \"C\" প্রিন্ট করে এবং ব্রেক করে।",
    hint: "Case 3 and 4 share code."
  },
  {
    id: 16,
    question: "What happens if a `break` is omitted after the LAST case in a switch block when that case is at the bottom?",
    options: [
      "It has no adverse effect because execution naturally reaches the closing brace `}` and exits.",
      "Causes a compilation error: 'missing break at end'.",
      "The switch statement restarts in an infinite loop.",
      "Throws a runtime exception."
    ],
    correctAnswer: 0,
    explanation: "The closing brace `}` acts as a natural boundary. Omitting `break;` in the very last statement block at the bottom does not cause any fall-through.",
    explanationBn: "সুইচের একেবারে শেষ ব্লকে `break;` না থাকলেও সমস্যা হয় না কারণ প্রোগ্রাম স্বয়ংক্রিয়ভাবে সমাপ্তি বন্ধনী `}` অতিক্রম করে বের হয়ে যায়।",
    hint: "Closing brace } ends the switch."
  },
  {
    id: 17,
    question: "What is the output of the following Java code?\nint x = 10;\nswitch (x) {\n  case 10: x *= 2;\n  case 20: x *= 3;\n  case 30: x *= 4;\n}\nSystem.out.println(x);",
    options: [
      "240",
      "20",
      "60",
      "120"
    ],
    correctAnswer: 0,
    explanation: "1) `case 10:`: `x = 10 * 2 = 20`. 2) Falls through to `case 20:`: `x = 20 * 3 = 60`. 3) Falls through to `case 30:`: `x = 60 * 4 = 240`. Final `x = 240`.",
    explanationBn: "১) case 10: ১০ * ২ = ২০; ২) case 20: ২০ * ৩ = ৬০; ৩) case 30: ৬০ * ৪ = ২৪০। চূড়ান্ত মান ২৪০।",
    hint: "10 * 2 * 3 * 4 = 240."
  },
  {
    id: 18,
    question: "In Question 17, why did `case 20:` execute when initial `x` was `10`?",
    options: [
      "Because after case 10 finished without a break, execution fell through into case 20 unconditionally without checking the label.",
      "Because x became 20 after case 10 and matched case 20's label.",
      "Because 10 is divisible by 20.",
      "Because switch re-evaluates the variable on every line."
    ],
    correctAnswer: 0,
    explanation: "This is a classic misconception! Case labels are NOT re-checked during execution. Even if `x` had remained 10, `case 20:` would have executed anyway due to fall-through!",
    explanationBn: "এটি একটি সাধারণ ভুল ধারণা! fall-through এর সময় কেস লেবেল কখনোই পুনরায় পরীক্ষা করা হয় না; break না থাকলে নিচের কেস স্বয়ংক্রিয়ভাবে চলে।",
    hint: "Case labels are ignored during fall-through."
  },
  {
    id: 19,
    question: "What is the output of the following Java snippet?\nint m = 1;\nswitch (m) {\n  case 1: System.out.print(\"Start \");\n  case 2: System.out.print(\"Mid \"); return;\n  case 3: System.out.print(\"End \");\n}\nSystem.out.print(\"After\");",
    options: [
      "Start Mid ",
      "Start Mid After",
      "Start Mid End After",
      "Start "
    ],
    correctAnswer: 0,
    explanation: "`case 1:` prints \"Start \", falls into `case 2:` which prints \"Mid \", and then `return;` exits the ENTIRE enclosing method! \"After\" is never reached.",
    explanationBn: "case 1-এ \"Start \" প্রিন্ট হয়, নিচে case 2-তে \"Mid \" প্রিন্ট হয়, তারপর `return;` মেথড থেকে বের করে দেয়। \"After\" আর চলে না।",
    hint: "return exits the method."
  },
  {
    id: 20,
    question: "What is the output of the following Java snippet?\nchar c = 'B';\nswitch (c) {\n  case 'A': System.out.print(\"1\");\n  case 'B': System.out.print(\"2\");\n  case 'C': System.out.print(\"3\"); break;\n  case 'D': System.out.print(\"4\");\n}",
    options: [
      "23",
      "2",
      "123",
      "234"
    ],
    correctAnswer: 0,
    explanation: "`c = 'B'` jumps to `case 'B':` (prints \"2\"), falls through into `case 'C':` (prints \"3\"), and halts at `break;`. Output: \"23\".",
    explanationBn: "'B' কেস 'B'-তে গিয়ে \"2\" প্রিন্ট করে, নিচে case 'C'-তে গিয়ে \"3\" প্রিন্ট করে এবং ব্রেক করে। ফলাফল: \"23\"।",
    hint: "2 followed by 3."
  },
  {
    id: 21,
    question: "Can comments like `// fall through` suppress compiler warnings in modern Java IDEs?",
    options: [
      "Yes, linters and compilers recognize `// fall through` or `@SuppressWarnings(\"fallthrough\")` as intentional fall-through documentation.",
      "No, comments have no effect on linters.",
      "Comments cause compilation errors in switch.",
      "Only HTML comments work."
    ],
    correctAnswer: 0,
    explanation: "IDEs (like NetBeans and Eclipse) inspect code for unintentional missing breaks; adding `// fall through` or `@SuppressWarnings(\"fallthrough\")` confirms to the compiler that the behavior is intentional.",
    explanationBn: "নেটবিন্স ও কম্পাইলার ইচ্ছাকৃত fall-through বুঝতে পারে যদি `// fall through` মন্তব্য বা অ্যানোটেশন ব্যবহার করা হয়।",
    hint: "Document intentional fall-through."
  },
  {
    id: 22,
    question: "What is the output of the following Java code?\nint p = 5;\nswitch (p) {\n  default: System.out.print(\"Def \");\n  case 10: System.out.print(\"Ten \");\n  case 20: System.out.print(\"Twenty \"); break;\n  case 30: System.out.print(\"Thirty \");\n}",
    options: [
      "Def Ten Twenty ",
      "Def ",
      "Def Ten ",
      "Thirty "
    ],
    correctAnswer: 0,
    explanation: "`p = 5` matches no case. It enters `default:` (\"Def \"), falls into `case 10:` (\"Ten \"), falls into `case 20:` (\"Twenty \"), and stops at `break;`.",
    explanationBn: "p=৫ কোনো কেসে না মেলায় default-এ যায় (\"Def \"), নিচে case 10 (\"Ten \") ও case 20 (\"Twenty \") চলে এবং ব্রেক করে।",
    hint: "Def Ten Twenty."
  },
  {
    id: 23,
    question: "What is the output of the code in Question 22 if `p = 10`?\nint p = 10;\nswitch (p) {\n  default: System.out.print(\"Def \");\n  case 10: System.out.print(\"Ten \");\n  case 20: System.out.print(\"Twenty \"); break;\n  case 30: System.out.print(\"Thirty \");\n}",
    options: [
      "Ten Twenty ",
      "Def Ten Twenty ",
      "Ten ",
      "Def Ten "
    ],
    correctAnswer: 0,
    explanation: "Since `p = 10` matches `case 10:`, it jumps straight to `case 10:`, prints \"Ten \", falls into `case 20:` (\"Twenty \"), and breaks! Default is never executed.",
    explanationBn: "p=১০ মেলায় সরাসরি case 10 চলে (\"Ten \"), তারপর case 20 চলে (\"Twenty \") এবং ব্রেক করে। default কার্যকর হয় না।",
    hint: "Direct match to case 10."
  },
  {
    id: 24,
    question: "Why do CBSE board examiners include fall-through questions in almost every Class 12 IT-802 paper?",
    options: [
      "To test whether students blindly assume switch statements stop after executing one case, rather than tracing the execution flow statement-by-statement until an actual break is encountered.",
      "Because switch statements are the only topic in Java.",
      "To encourage students to write code without breaks.",
      "Because NetBeans does not support if-else."
    ],
    correctAnswer: 0,
    explanation: "Students frequently assume each case is automatically isolated like an if-else ladder. Examiners test whether candidates understand that `break;` is required to halt execution.",
    explanationBn: "অনেক শিক্ষার্থী ভুলবশত মনে করে কেস নিজে থেকেই থেমে যায়। তাই ব্রেক না থাকলে যে কোড নিচে গড়িয়ে যায়, তা পরীক্ষা করতেই এই প্রশ্নগুলো দেওয়া হয়।",
    hint: "Tests deep understanding of control flow vs assumptions."
  },
  {
    id: 25,
    question: "What is the best mental model for tracing a Java `switch` statement in an exam?",
    options: [
      "1) Find the single entry point (matching case or default); 2) From that point downward, execute every statement sequentially until you hit a `break;` or `}`.",
      "1) Execute all cases simultaneously; 2) Average the outputs.",
      "1) Count the number of colons; 2) Multiply by 2.",
      "1) Skip all cases without numbers."
    ],
    correctAnswer: 0,
    explanation: "Switch has a single entry door (the matching case or default). Once entered, execution moves straight down through everything until a `break;` or the exit door `}` is reached.",
    explanationBn: "সুইচের নিয়ম: শুরুতে একটিমাত্র প্রবেশদ্বার খুঁজে বের করো (মিলিত কেস বা ডিফল্ট), এরপর সেখান থেকে সোজা নিচে নামতে নামতে ব্রেক বা সমাপ্তি বন্ধনী না পাওয়া পর্যন্ত সব চালাতে থাকো।",
    hint: "Find entry point, then execute straight down until break."
  }
];

export default topic7_questions;
