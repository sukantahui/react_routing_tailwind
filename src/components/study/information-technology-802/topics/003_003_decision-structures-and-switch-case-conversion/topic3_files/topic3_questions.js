const topic3_questions = [
  {
    id: 1,
    question: "When does the code inside a `default` clause execute in a Java `switch` statement?",
    options: [
      "Only when none of the specified `case` labels match the value of the switch expression.",
      "Always at the beginning of the switch block.",
      "Whenever any case matches.",
      "Only when a runtime exception is thrown."
    ],
    correctAnswer: 0,
    explanation: "The `default` clause serves as a catch-all block that executes if and only if every single `case` label fails to match the evaluated switch expression.",
    explanationBn: "`default` ক্লজটি একটি ক্যাচ-অল ব্লক হিসেবে কাজ করে যা তখনই চলে যখন কোনো কেস লেবেলই সুইচের এক্সপ্রেশনের সাথে মিলে না।",
    hint: "Executes when no case matches."
  },
  {
    id: 2,
    question: "Which component of an `if-else-if` ladder is the direct conceptual equivalent of the `default` clause?",
    options: [
      "The final trailing `else` block",
      "The initial `if` statement",
      "The first `else if` branch",
      "The condition inside parentheses"
    ],
    correctAnswer: 0,
    explanation: "The final trailing `else` in an `if-else-if` ladder handles unmatched scenarios just like the `default` clause in a `switch` statement.",
    explanationBn: "`if-else-if` ল্যাডারের শেষ `else` ব্লকটি কোনো শর্ত না মিললে যেভাবে কাজ করে, সুইচের `default` ক্লজও ঠিক একইভাবে কাজ করে।",
    hint: "Final else block."
  },
  {
    id: 3,
    question: "Is the `default` clause mandatory in a Java `switch` statement?",
    options: [
      "No, it is entirely optional.",
      "Yes, every switch must contain a default block.",
      "Only if there are fewer than 3 cases.",
      "Only when switching on strings."
    ],
    correctAnswer: 0,
    explanation: "The `default` clause is optional. If omitted and no case matches, the switch finishes without performing any action.",
    explanationBn: "`default` ক্লজ সম্পূর্ণ ঐচ্ছিক। এটি না থাকলে এবং কোনো কেস না মিললে প্রোগ্রাম কোনো ত্রুটি ছাড়াই পরবর্তী লাইনে চলে যায়।",
    hint: "Default is optional."
  },
  {
    id: 4,
    question: "How many `default` labels are legally permitted inside one `switch` block?",
    options: [
      "At most one (0 or 1)",
      "Exactly one",
      "Unlimited",
      "Two (one at start, one at end)"
    ],
    correctAnswer: 0,
    explanation: "Java allows at most one `default` clause in a switch statement. Declaring more than one results in a compilation error: \"duplicate default label\".",
    explanationBn: "একটি সুইচে সর্বোচ্চ একটিমাত্র `default` ক্লজ থাকতে পারে। একাধিক দিলে `duplicate default label` এরর হয়।",
    hint: "At most one."
  },
  {
    id: 5,
    question: "Can the `default` label be placed at the very beginning of a `switch` statement?",
    options: [
      "Yes, Java syntax allows `default` to appear anywhere (top, middle, or bottom) inside the switch block.",
      "No, default must always be at the end.",
      "No, putting default at the top causes a compile error.",
      "Only in Java 17 and later."
    ],
    correctAnswer: 0,
    explanation: "Although traditionally placed at the end, Java syntax allows `default` to be placed anywhere in the switch body.",
    explanationBn: "ঐতিহ্যগতভাবে শেষে রাখা হলেও জাভায় `default` লেবেল সুইচের শুরু, মাঝ বা শেষ যেকোনো স্থানে রাখা বৈধ।",
    hint: "Position can be anywhere."
  },
  {
    id: 6,
    question: "If `default` is placed at the top of a switch block, does Java execute it before checking the cases?",
    options: [
      "No, Java always evaluates all specific `case` labels first regardless of where `default` is located.",
      "Yes, top-to-bottom order forces default to execute first.",
      "Only if the expression is null.",
      "Yes, and it skips all cases."
    ],
    correctAnswer: 0,
    explanation: "Java's switch semantics dictate that all specific `case` constant matches take precedence. `default` is only entered if all case comparisons fail.",
    explanationBn: "`default` শুরুতে থাকলেও জাভা আগে নির্দিষ্ট কেসগুলো মেলাতে চেষ্টা করে। কোনো কেস না মিললেই কেবল default-এ প্রবেশ করে।",
    hint: "Specific cases are checked first."
  },
  {
    id: 7,
    question: "What is the output of the following Java snippet?\nint x = 1;\nswitch (x) {\n  default: System.out.print(\"Def \"); break;\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \"); break;\n}",
    options: [
      "One ",
      "Def One ",
      "Def ",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Because `x == 1`, Java jumps directly to `case 1:`, prints \"One \", and breaks. The top `default` is completely bypassed.",
    explanationBn: "যেহেতু x=১, তাই সরাসরি `case 1:` মিলে গিয়ে \"One \" প্রিন্ট করে ব্রেক করে। শুরুতে থাকা default এড়িয়ে যাওয়া হয়।",
    hint: "Matches case 1."
  },
  {
    id: 8,
    question: "What is the output of the following Java snippet?\nint x = 50;\nswitch (x) {\n  default: System.out.print(\"Def \");\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \"); break;\n}",
    options: [
      "Def One ",
      "Def ",
      "One ",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "`x = 50` matches neither 1 nor 2. Execution jumps to `default:`, printing \"Def \". Because `default:` has NO break, it falls through into `case 1:`, printing \"One \" before hitting `break`!",
    explanationBn: "৫০ কোনো কেসে না মেলায় default চলে \"Def \" প্রিন্ট করে। কিন্তু break না থাকায় নিচে গড়িয়ে `case 1:`-এর \"One \" প্রিন্ট করে ব্রেক করে। ফলাফল: \"Def One \"।",
    hint: "Default falls through into case 1."
  },
  {
    id: 9,
    question: "What is the output of the following Java snippet?\nint x = 50;\nswitch (x) {\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \"); break;\n}",
    options: [
      "Nothing is printed",
      "Def",
      "Compilation error: missing default",
      "Runtime exception"
    ],
    correctAnswer: 0,
    explanation: "No case matches 50, and there is no `default` clause. The switch block simply does nothing and exits cleanly.",
    explanationBn: "কোনো কেস ৫০-এর সাথে মেলে না এবং কোনো default নেই। ফলে সুইচটি কিছুই না করে স্বাভাবিকভাবে শেষ হয়।",
    hint: "No match and no default."
  },
  {
    id: 10,
    question: "What is the output of the following Java code?\nint code = 2;\nswitch (code) {\n  case 1: System.out.print(\"A \");\n  default: System.out.print(\"D \");\n  case 3: System.out.print(\"C \");\n}",
    options: [
      "D C ",
      "D ",
      "A D C ",
      "C "
    ],
    correctAnswer: 0,
    explanation: "`code = 2` matches neither 1 nor 3. It jumps to `default:`, printing \"D \". Without a `break;`, it falls through into `case 3:`, printing \"C \". Result: \"D C \".",
    explanationBn: "code=২ কোনো কেসে না মেলায় default-এ যায় এবং \"D \" প্রিন্ট করে। কোনো break না থাকায় নিচে `case 3:`-এ গড়িয়ে \"C \" প্রিন্ট করে।",
    hint: "Fall-through from middle default."
  },
  {
    id: 11,
    question: "What is the output of the following Java code?\nint code = 1;\nswitch (code) {\n  case 1: System.out.print(\"A \");\n  default: System.out.print(\"D \");\n  case 3: System.out.print(\"C \");\n}",
    options: [
      "A D C ",
      "A ",
      "A D ",
      "D C "
    ],
    correctAnswer: 0,
    explanation: "`code = 1` matches `case 1:`. It prints \"A \". Because there are no `break` statements anywhere, execution cascades through `default` (prints \"D \") and `case 3:` (prints \"C \"). Output: \"A D C \".",
    explanationBn: "code=১ মেলায় case 1 চলে (\"A \")। কোথাও break না থাকায় default (\"D \") এবং case 3 (\"C \") সবগুলি চলে। ফলাফল: \"A D C \"।",
    hint: "Cascades through everything."
  },
  {
    id: 12,
    question: "Why is placing a `break;` inside `default` recommended even when `default` is the last clause?",
    options: [
      "As a defensive programming safeguard against future code changes where someone might append new cases below default.",
      "Because Java syntax requires break in default.",
      "To prevent memory leaks.",
      "To improve garbage collection performance."
    ],
    correctAnswer: 0,
    explanation: "If someone later adds another `case` at the bottom of the switch, omitting `break` in `default` would cause an accidental fall-through bug.",
    explanationBn: "ভবিষ্যতে কেউ যদি default-এর নিচে নতুন কেস যোগ করে, তবে ব্রেক না থাকলে সেখানে অপ্রত্যাশিত fall-through ঘটবে। তাই ডিফেন্সিভ কোডিং হিসেবে ব্রেক দেওয়া উত্তম।",
    hint: "Safeguard against future additions."
  },
  {
    id: 13,
    question: "In defensive programming, what should a `default` clause typically do when handling unexpected inputs?",
    options: [
      "Log an error message, assign a safe fallback value, or throw an IllegalArgumentException.",
      "Format the hard drive.",
      "Shut down the JVM immediately without warning.",
      "Ignore the input and set all variables to null."
    ],
    correctAnswer: 0,
    explanation: "Defensive design uses `default` to handle corrupt or illegal inputs gracefully, ensuring the application remains robust.",
    explanationBn: "ডিফেন্সিভ প্রোগ্রামিংয়ে কোনো অপ্রত্যাশিত বা ভুল ইনপুট আসলে `default` ক্লজে সতর্কবার্তা দেওয়া বা নিরাপদ মান নির্ধারণ করা উচিত।",
    hint: "Graceful error handling or logging."
  },
  {
    id: 14,
    question: "What will happen if you compile the following Java code?\nint x = 5;\nswitch (x) {\n  default: System.out.print(\"D1 \"); break;\n  default: System.out.print(\"D2 \"); break;\n}",
    options: [
      "Compilation error: duplicate default label",
      "Prints \"D1 \"",
      "Prints \"D2 \"",
      "Runtime exception"
    ],
    correctAnswer: 0,
    explanation: "Only a single `default` label is permitted per switch block. Having two `default:` labels causes a compile-time error.",
    explanationBn: "একটি সুইচে একাধিক `default` লেবেল লিখলে কম্পাইলার `duplicate default label` ত্রুটি প্রদর্শন করে।",
    hint: "Duplicate default is illegal."
  },
  {
    id: 15,
    question: "What is the output of the following Java snippet?\nString role = \"GUEST\";\nswitch (role) {\n  case \"ADMIN\": System.out.print(\"Full \"); break;\n  case \"USER\": System.out.print(\"Limited \"); break;\n  default: System.out.print(\"Read-Only \"); break;\n}",
    options: [
      "Read-Only ",
      "Full ",
      "Limited ",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "\"GUEST\" does not match \"ADMIN\" or \"USER\". Execution transfers directly to `default:`, printing \"Read-Only \".",
    explanationBn: "\"GUEST\" কোনো কেসের সাথে না মেলায় সরাসরি `default:` চালু হয় এবং \"Read-Only \" প্রিন্ট করে।",
    hint: "Default catches GUEST."
  },
  {
    id: 16,
    question: "What does `default:` evaluate if the switch expression is `null` for a String variable?",
    options: [
      "It never reaches default; Java throws a java.lang.NullPointerException as soon as the switch evaluates the null expression.",
      "It safely executes the default block.",
      "It prints null.",
      "It skips the switch completely."
    ],
    correctAnswer: 0,
    explanation: "Under JLS rules, evaluating a `null` reference inside `switch(s)` immediately throws a `NullPointerException` before any `case` or `default` can be checked.",
    explanationBn: "সুইচের এক্সপ্রেশনে `null` স্ট্রিং থাকলে জাভা কোনো কেস বা ডিফল্ট দেখার আগেই রানটাইমে `NullPointerException` ছুড়ে দেয়।",
    hint: "Null throws exception before default."
  },
  {
    id: 17,
    question: "What is the output of the following Java code?\nint option = 0;\nswitch (option) {\n  case 1: System.out.print(\"Save \"); break;\n  case 2: System.out.print(\"Open \"); break;\n  default: System.out.print(\"Exit \");\n}",
    options: [
      "Exit ",
      "Save ",
      "Open ",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "`option = 0` does not match 1 or 2, so the `default:` clause executes, printing \"Exit \".",
    explanationBn: "option=০ কোনো কেসে না মেলায় `default` চলে \"Exit \" প্রিন্ট করে।",
    hint: "Option 0 triggers default."
  },
  {
    id: 18,
    question: "Can statements be written inside a `switch` block BEFORE the first `case` or `default` label?",
    options: [
      "No, any statement before the first case/default label causes a compilation error (`case, default, or '}' expected`).",
      "Yes, they execute every time the switch is entered.",
      "Yes, if they are variable declarations.",
      "Only comments are forbidden."
    ],
    correctAnswer: 0,
    explanation: "In Java, all executable statements inside a switch block MUST be located inside a `case` or `default` branch. Code placed before the first label is illegal.",
    explanationBn: "জাভায় সুইচের প্রথম কেস বা ডিফল্টের আগে কোনো এক্সিকিউটেবল স্টেটমেন্ট লেখা যায় না; লিখলে কম্পাইল এরর হয়।",
    hint: "Statements must be under a label."
  },
  {
    id: 19,
    question: "What is the output of the following Java code?\nint k = 4;\nswitch (k) {\n  case 1: System.out.print(\"A \"); break;\n  case 2: System.out.print(\"B \"); break;\n  case 3: System.out.print(\"C \"); break;\n  default:\n    k += 2;\n    System.out.print(k + \" \");\n    break;\n}",
    options: [
      "6 ",
      "4 ",
      "A B C 6 ",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`k = 4` matches none of 1, 2, 3. In `default:`, `k += 2` updates `k` to 6 and prints \"6 \".",
    explanationBn: "k=৪ কোনো কেসে না মেলায় default চলে; k-এর মান ৪+২=৬ হয়ে \"6 \" প্রিন্ট হয়।",
    hint: "4 + 2 = 6."
  },
  {
    id: 20,
    question: "Can a `default` clause be completely empty (e.g. `default: break;` or just `default:`)?",
    options: [
      "Yes, an empty default clause is completely legal in Java.",
      "No, default must contain at least one print statement.",
      "No, an empty default causes a compiler warning.",
      "Only in void functions."
    ],
    correctAnswer: 0,
    explanation: "A `default:` label can contain an empty body or just `break;`. It satisfies compiler checks while performing no action.",
    explanationBn: "একটি ফাঁকা `default:` লেবেল বা শুধু `default: break;` জাভায় সম্পূর্ণ বৈধ।",
    hint: "Empty default is valid."
  },
  {
    id: 21,
    question: "What is the output of the following Java snippet?\nint n = 7;\nswitch (n) {\n  default: break;\n  case 1: System.out.print(\"One \"); break;\n}\nSystem.out.print(\"Done\");",
    options: [
      "Done",
      "One Done",
      "One",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`n = 7` does not match 1. It enters `default:`, hits `break;`, exits the switch, and prints \"Done\".",
    explanationBn: "n=৭ case 1-এ না মেলায় default-এ যায় এবং break করে বেরিয়ে এসে \"Done\" প্রিন্ট করে।",
    hint: "Breaks cleanly from default."
  },
  {
    id: 22,
    question: "In GUI programming (e.g. NetBeans Swing applications tested in CBSE), why is `default` crucial when reading values from dropdowns or textfields?",
    options: [
      "To alert the user or reset the display when an invalid code or unexpected input is typed.",
      "To convert text to numbers automatically.",
      "To initialize the Swing JFrame.",
      "To connect to the MySQL database driver."
    ],
    correctAnswer: 0,
    explanation: "In GUI billing or user forms, if a user enters an unrecognized slab code, `default` sets an error message (e.g. `jLabel1.setText(\"Invalid slab!\");`).",
    explanationBn: "সুইং জিইউআই অ্যাপে ব্যবহারকারী ভুল কোড টাইপ করলে `default` ক্লজের মাধ্যমে সতর্কবার্তা বা লেবেল আপডেট করা হয়।",
    hint: "Handles unexpected or invalid user input in GUI."
  },
  {
    id: 23,
    question: "What happens if both `case 0:` and `default:` exist, and the switch expression evaluates to `0`?",
    options: [
      "Case 0 executes; default is completely ignored because an exact matching case was found.",
      "Default executes because 0 means false.",
      "Both execute simultaneously.",
      "Compilation error: 0 conflicts with default."
    ],
    correctAnswer: 0,
    explanation: "Since `case 0:` provides an exact match, Java executes `case 0:`. The `default:` clause is only visited if no matching case exists.",
    explanationBn: "যেহেতু `case 0:` হুবহু মিলে গেছে, তাই case 0-ই চলবে। নির্দিষ্ট কেস মিললে default কখনোই কার্যকর হয় না।",
    hint: "Exact case match always wins over default."
  },
  {
    id: 24,
    question: "What is the output of the following Java code?\nint x = 2;\nswitch (x) {\n  case 1: System.out.print(\"A\"); break;\n  case 2: System.out.print(\"B\");\n  default: System.out.print(\"D\");\n  case 3: System.out.print(\"C\"); break;\n}",
    options: [
      "BDC",
      "B",
      "BD",
      "D"
    ],
    correctAnswer: 0,
    explanation: "`x = 2` jumps to `case 2:`. It prints \"B\". Lacking a `break;`, it falls through into `default:` (prints \"D\"), then cascades into `case 3:` (prints \"C\") before hitting `break;`! Result: \"BDC\".",
    explanationBn: "x=২ মেলায় case 2 চলে (\"B\"); break না থাকায় default-এ গড়ায় (\"D\"), এবং তারপর case 3-তে গড়ায় (\"C\")। শেষে break করে। ফলাফল: \"BDC\"।",
    hint: "Falls through case 2, default, and case 3."
  },
  {
    id: 25,
    question: "What is the primary lesson taught by CBSE board examiners regarding the `default` clause?",
    options: [
      "Never assume `default` executes only at the end—always check its placement and whether preceding or following cases lack `break` statements.",
      "Default must always be omitted for speed.",
      "Default only works with int.",
      "Default creates a new thread."
    ],
    correctAnswer: 0,
    explanation: "CBSE board questions frequently place `default` in the middle or top of a switch without `break` to test if students understand that lack of `break` causes fall-through regardless of label type.",
    explanationBn: "সিবিএসই পরীক্ষায় প্রায়শই মাঝখানে বা শুরুতে ব্রেকবিহীন default দিয়ে শিক্ষার্থীদের fall-through জ্ঞান পরীক্ষা করা হয়।",
    hint: "Check placement and break presence carefully."
  }
];

export default topic3_questions;
