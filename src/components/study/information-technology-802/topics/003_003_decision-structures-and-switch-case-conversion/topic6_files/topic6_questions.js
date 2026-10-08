const topic6_questions = [
  {
    id: 1,
    question: "Which of the following primitive data types CANNOT be used in a Java `switch` statement?",
    options: [
      "double",
      "int",
      "char",
      "byte"
    ],
    correctAnswer: 0,
    explanation: "`double` (and `float`) cannot be used in a switch expression due to IEEE 754 precision representation issues. The compiler rejects it with: 'selector type not allowed'.",
    explanationBn: "জাভায় `double` (ও `float`) ফ্লোটিং-পয়েন্ট প্রিসিশন সমস্যার কারণে সুইচ এক্সপ্রেশনে ব্যবহার করা যায় না। কম্পাইলার এটি নিষিদ্ধ করে।",
    hint: "Floating point numbers are not allowed."
  },
  {
    id: 2,
    question: "Why does Java forbid using `float` and `double` in `switch` statements?",
    options: [
      "Because floating-point representation involves binary rounding imprecision (e.g. 0.1 + 0.2 != 0.3), making exact binary equality (==) comparisons unreliable.",
      "Because float values take up too much disk space.",
      "Because JVM cannot perform division on floats.",
      "Because NetBeans does not support floating points."
    ],
    correctAnswer: 0,
    explanation: "Floating-point numbers often cannot be represented exactly in IEEE 754 binary format. Since `switch` relies strictly on exact equality (`==`), rounding errors could cause cases to fail to match unpredictably.",
    explanationBn: "ফ্লোটিং-পয়েন্ট সংখ্যায় বাইনারি রাউন্ডিংয়ের কারণে নিখুঁত সমতা (==) নির্ভরযোগ্য হয় না। তাই জাভায় ফ্লোট ও ডাবল নিষিদ্ধ।",
    hint: "Floating point rounding and precision issues."
  },
  {
    id: 3,
    question: "Why is the `long` primitive data type disallowed in Java `switch` expressions?",
    options: [
      "Because JVM bytecode instructions `tableswitch` and `lookupswitch` only support 32-bit signed integer offsets, whereas `long` is 64 bits.",
      "Because long values cannot be positive.",
      "Because long is an object, not a primitive.",
      "Because long was deprecated in Java 5."
    ],
    correctAnswer: 0,
    explanation: "The underlying JVM bytecode instructions for switch are limited to 32-bit integer indexes. A 64-bit `long` cannot be represented in a 32-bit jump table.",
    explanationBn: "জেভিএম-এর সুইচ বাইটকোড নির্দেশাবলী (`tableswitch`) ৩২-বিট পূর্ণসংখ্যার জাম্প টেবিল সমর্থন করে, কিন্তু `long` হলো ৬৪-বিট।",
    hint: "JVM bytecode jump tables are 32-bit."
  },
  {
    id: 4,
    question: "Why is `boolean` disallowed in Java `switch` expressions?",
    options: [
      "Because a boolean only has two possible states (`true`/`false`), making an `if-else` statement far more natural, concise, and appropriate.",
      "Because booleans cannot be compared.",
      "Because booleans take up 64 bits of memory.",
      "Because true and false are keywords."
    ],
    correctAnswer: 0,
    explanation: "A boolean expression only has two outcomes. A switch statement with `case true:` and `case false:` adds unnecessary syntax verbosity over a clean `if-else`.",
    explanationBn: "বুলিয়ানের মান কেবল দুটি (`true` বা `false`) হতে পারে। এর জন্য সুইচের জটিল সিনট্যাক্সের চেয়ে `if-else` ব্যবহার করা অনেক বেশি স্বাভাবিক।",
    hint: "Only two states, if-else is ideal."
  },
  {
    id: 5,
    question: "Starting with which version of Java was the `String` data type permitted in `switch` statements?",
    options: [
      "Java 7 (JDK 1.7)",
      "Java 5 (JDK 1.5)",
      "Java 8 (JDK 1.8)",
      "Java 1.0 (from inception)"
    ],
    correctAnswer: 0,
    explanation: "Support for `String` objects in `switch` statements was introduced in Java 7 (2011) as part of Project Coin.",
    explanationBn: "জাভা ৭ (২০১১) সংস্করণে `String` অবজেক্টের ওপর সুইচ স্টেটমেন্ট ব্যবহারের সুবিধা যুক্ত করা হয়।",
    hint: "Java 7."
  },
  {
    id: 6,
    question: "How does the Java compiler implement `switch` on `String` under the hood in bytecode?",
    options: [
      "By first switching on the string's `hashCode()` integer, and then verifying the match with `equals()` to avoid hash collisions.",
      "By comparing every character in a while loop.",
      "By converting strings to double numbers.",
      "By converting text to ASCII uppercase."
    ],
    correctAnswer: 0,
    explanation: "The compiler generates an integer switch using `s.hashCode()`, followed by an `equals()` check inside the target case to resolve any hash collisions safely.",
    explanationBn: "কম্পাইলার প্রথমে `hashCode()` ব্যবহার করে পূর্ণসংখ্যায় সুইচ করে এবং পরে হ্যাশ কোলিশন এড়াতে `equals()` দিয়ে নিশ্চিত করে।",
    hint: "hashCode() plus equals() check."
  },
  {
    id: 7,
    question: "What happens if a `String` variable passed to `switch(s)` is `null` at runtime?",
    options: [
      "Throws java.lang.NullPointerException immediately upon evaluating the switch expression.",
      "Jumps directly to the default case.",
      "Treats null as the empty string \"\".",
      "Skips the switch without error."
    ],
    correctAnswer: 0,
    explanation: "Because the compiler calls `s.hashCode()`, calling a method on `null` throws a runtime `NullPointerException` before any cases are checked.",
    explanationBn: "যেহেতু জাভা অভ্যন্তরীণভাবে `s.hashCode()` কল করে, তাই `null` স্ট্রিংয়ের ক্ষেত্রে সাথে সাথে `NullPointerException` ঘটে।",
    hint: "NullPointerException on null String."
  },
  {
    id: 8,
    question: "Which of the following data types is VALID in a Java `switch` statement?",
    options: [
      "char",
      "float",
      "double",
      "boolean"
    ],
    correctAnswer: 0,
    explanation: "`char` is an integral type (16-bit Unicode integer) and is fully supported in switch expressions from Java 1.0.",
    explanationBn: "`char` হলো ১৬-বিট ইউনিকোড পূর্ণসংখ্যা এবং জাভায় সুইচে এটি সম্পূর্ণরূপে অনুমোদিত।",
    hint: "char is an integer type."
  },
  {
    id: 9,
    question: "Can an `enum` (Enumerated type) be used in a Java `switch` statement?",
    options: [
      "Yes, enums are fully supported in switch since Java 5.",
      "No, enums can only be used with if statements.",
      "Only in Java 17.",
      "Only if converted to an integer explicitly."
    ],
    correctAnswer: 0,
    explanation: "Java 5 introduced `enum` types along with direct support in `switch` statements using the enum constant names.",
    explanationBn: "জাভা ৫ থেকে `enum` ডেটা টাইপ সরাসরি সুইচ স্টেটমেন্টে ব্যবহারের সুবিধা রয়েছে।",
    hint: "Enums are supported since Java 5."
  },
  {
    id: 10,
    question: "When switching on an `enum`, how must the case labels be written?",
    options: [
      "Using the bare enum constant name (e.g. `case RED:`), NOT qualified with the enum type (e.g. NOT `case Color.RED:`).",
      "Qualified with the enum name: `case Color.RED:`",
      "Enclosed in double quotes: `case \"RED\":`",
      "Using their ordinal integer: `case 0:`"
    ],
    correctAnswer: 0,
    explanation: "Under JLS rules, case labels for enum switches must be the unqualified constant identifier (e.g. `case RED:`). Writing `case Color.RED:` causes a compile error.",
    explanationBn: "এনাম সুইচে কেস লেবেলে সরাসরি এনাম কনস্ট্যান্টের নাম লিখতে হয় (যেমন `case RED:`), এনামের নামসহ `Color.RED` লিখলে কম্পাইল এরর হয়।",
    hint: "Bare enum constant name without prefix."
  },
  {
    id: 11,
    question: "What is the result of attempting to compile:\nfloat f = 2.5f;\nswitch (f) {\n  case 2.5f: System.out.println(\"Match\"); break;\n}",
    options: [
      "Compilation error: selector type not allowed (incompatible types: float cannot be converted to int)",
      "Prints \"Match\"",
      "Prints nothing",
      "Runtime ClassCastException"
    ],
    correctAnswer: 0,
    explanation: "Java does not permit `float` as a selector expression in switch. The compiler halts with an incompatible types error.",
    explanationBn: "জাভায় `float` সুইচে দেওয়া নিষিদ্ধ হওয়ায় কম্পাইলার ত্রুটি দিয়ে প্রোগ্রাম বন্ধ করে দেয়।",
    hint: "Compile-time error on float switch."
  },
  {
    id: 12,
    question: "Are boxed wrapper classes (`Byte`, `Short`, `Character`, `Integer`) permitted in `switch` expressions?",
    options: [
      "Yes, Java automatically unboxes wrapper objects into their corresponding primitive types.",
      "No, only raw primitive types are allowed.",
      "Only Integer is allowed.",
      "Only in static methods."
    ],
    correctAnswer: 0,
    explanation: "Through auto-unboxing introduced in Java 5, wrapper classes `Byte`, `Short`, `Character`, and `Integer` are automatically converted to primitives and allowed in switch.",
    explanationBn: "জাভা ৫-এর অটো-আনবক্সিং সুবিধার ফলে `Byte`, `Short`, `Character` ও `Integer` ক্লাসগুলো অনায়াসে সুইচে ব্যবহার করা যায়।",
    hint: "Auto-unboxing enables integer wrapper classes."
  },
  {
    id: 13,
    question: "What happens if a boxed `Integer` wrapper variable is `null` when passed to `switch(num)`?\nInteger num = null;\nswitch (num) { ... }",
    options: [
      "Throws java.lang.NullPointerException during auto-unboxing (`num.intValue()`).",
      "Enters the default case.",
      "Treats num as 0.",
      "Skips the switch statement."
    ],
    correctAnswer: 0,
    explanation: "Auto-unboxing calls `num.intValue()`. Invoking a method on a `null` reference throws `NullPointerException` at runtime.",
    explanationBn: "আনবক্সিংয়ের সময় জাভা `num.intValue()` কল করে, যা `null` অবজেক্টের কারণে রানটাইমে `NullPointerException` ঘটায়।",
    hint: "Auto-unboxing null throws NullPointerException."
  },
  {
    id: 14,
    question: "Which four primitive types are strictly PERMITTED in Java `switch` statements?",
    options: [
      "byte, short, char, int",
      "int, long, float, double",
      "boolean, byte, int, char",
      "short, int, long, double"
    ],
    correctAnswer: 0,
    explanation: "Only the four 8-bit to 32-bit integer primitives (`byte`, `short`, `char`, `int`) are permitted. `long`, `float`, `double`, and `boolean` are forbidden.",
    explanationBn: "কেবলমাত্র চারটি ইন্টিগ্রাল প্রিমিটিভ (`byte`, `short`, `char`, `int`) সুইচে অনুমোদিত।",
    hint: "byte, short, char, int."
  },
  {
    id: 15,
    question: "Which of the following is the complete list of non-primitive types permitted in a Java `switch`?",
    options: [
      "String, enums, and the wrapper classes (Byte, Short, Character, Integer)",
      "All classes in java.lang",
      "Arrays and Collections",
      "Any class implementing Comparable"
    ],
    correctAnswer: 0,
    explanation: "Modern Java allows `String`, `enum` types, and the four integral wrapper types (`Byte`, `Short`, `Character`, `Integer`). General objects and arrays are illegal.",
    explanationBn: "আধুনিক জাভায় `String`, `enum` এবং ইন্টিজার র‍্যাপার ক্লাসগুলো ছাড়া সাধারণ অবজেক্ট বা অ্যারে সুইচে ব্যবহার করা যায় না।",
    hint: "String, enum, and integer wrappers."
  },
  {
    id: 16,
    question: "Can an array be used as the expression in a `switch` statement (e.g. `int[] arr = {1, 2}; switch(arr)`)?",
    options: [
      "No, arrays cannot be used in switch statements (compile error).",
      "Yes, it compares the first element.",
      "Yes, it compares the array length.",
      "Only char arrays are permitted."
    ],
    correctAnswer: 0,
    explanation: "Arrays are reference objects that cannot be unboxed to an integer or String, so they are invalid in switch expressions.",
    explanationBn: "অ্যারে সুইচে ব্যবহার করা সম্পূর্ণ অবৈধ; কম্পাইলার এরর দেয়।",
    hint: "Arrays are forbidden."
  },
  {
    id: 17,
    question: "What is the output of the following Java snippet?\nbyte b = 2;\nswitch (b) {\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \"); break;\n  default: System.out.print(\"Other \");\n}",
    options: [
      "Two ",
      "One ",
      "Other ",
      "Compilation error: byte cannot be used in switch"
    ],
    correctAnswer: 0,
    explanation: "`byte` is a valid integral type for switch. It matches `case 2:`, prints \"Two \", and breaks.",
    explanationBn: "`byte` সুইচে সম্পূর্ণ অনুমোদিত। এটি `case 2:` এর সাথে মিলে \"Two \" প্রিন্ট করে।",
    hint: "byte is valid."
  },
  {
    id: 18,
    question: "What happens if a case value exceeds the maximum value of the switch variable type?\nbyte b = 10;\nswitch (b) {\n  case 200: System.out.println(\"Big\"); break;\n}",
    options: [
      "Compilation error: possible lossy conversion from int to byte (200 is outside byte range -128 to 127).",
      "It wraps around to -56 and matches.",
      "It compiles and runs default.",
      "Runtime ClassCastException."
    ],
    correctAnswer: 0,
    explanation: "Because `byte` can only hold values from -128 to 127, the constant `200` cannot fit into a `byte`, causing a compile-time type conversion error.",
    explanationBn: "বাইটের সর্বোচ্চ সীমা ১২৭। ২০০ মানটি বাইটের সীমার বাইরে হওয়ায় কম্পাইলার lossy conversion এরর দেয়।",
    hint: "200 exceeds byte max 127."
  },
  {
    id: 19,
    question: "What is the output of the following Java code?\nchar grade = 'A';\nswitch (grade) {\n  case 65: System.out.print(\"ASCII \"); break;\n  case 'B': System.out.print(\"Grade \"); break;\n}",
    options: [
      "ASCII ",
      "Grade ",
      "Compilation error: cannot mix int and char in switch",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "In Java, `'A'` has Unicode value 65. The constant 65 is assignment-compatible with `char`, so `case 65:` matches `'A'`, printing \"ASCII \".",
    explanationBn: "জাভায় `'A'` এর মান ৬৫। পূর্ণসংখ্যা ৬৫ ক্যারেক্টারের সাথে সামঞ্জস্যপূর্ণ হওয়ায় `case 65:` মিলে গিয়ে \"ASCII \" প্রিন্ট করে।",
    hint: "Unicode value of 'A' is 65."
  },
  {
    id: 20,
    question: "Is case sensitivity maintained when switching on `String` values in Java?",
    options: [
      "Yes, string comparisons in switch are strictly case-sensitive (\"Apple\" != \"apple\").",
      "No, switch is case-insensitive for strings.",
      "Only if toLowerCase() is called.",
      "Depends on operating system."
    ],
    correctAnswer: 0,
    explanation: "String switch uses `String.equals()`, which is strictly case-sensitive. \"ADMIN\" will never match \"admin\".",
    explanationBn: "স্ট্রিং সুইচ মূলত `String.equals()` ব্যবহার করে, যা কেস-সেনসিটিভ (বড় হাতের ও ছোট হাতের অক্ষর আলাদা)।",
    hint: "String switch is strictly case-sensitive."
  },
  {
    id: 21,
    question: "What is the output of the following Java snippet?\nString city = \"Kolkata\";\nswitch (city) {\n  case \"kolkata\": System.out.print(\"Lower \"); break;\n  case \"Kolkata\": System.out.print(\"Proper \"); break;\n  default: System.out.print(\"Other \");\n}",
    options: [
      "Proper ",
      "Lower ",
      "Lower Proper ",
      "Other "
    ],
    correctAnswer: 0,
    explanation: "Because string comparison in `switch` is case-sensitive, \"Kolkata\" skips `\"kolkata\"` and matches `\"Kolkata\"`, printing \"Proper \".",
    explanationBn: "কেস-সেনসিটিভ হওয়ার কারণে বড় হাতের 'K' যুক্ত `\"Kolkata\"` মিলে গিয়ে \"Proper \" প্রিন্ট করে।",
    hint: "Case-sensitive exact match."
  },
  {
    id: 22,
    question: "Why does the following code fail to compile?\nboolean isPass = true;\nswitch (isPass) {\n  case true: System.out.println(\"Passed\"); break;\n}",
    options: [
      "Compilation error: selector type not allowed (boolean is not allowed in switch).",
      "case true requires quotes (\"true\").",
      "isPass must be declared final.",
      "switch must have a default."
    ],
    correctAnswer: 0,
    explanation: "Boolean expressions are illegal in Java switch statements. The compiler rejects the code immediately.",
    explanationBn: "জাভায় `boolean` চলকের ওপর সুইচ করা নিষিদ্ধ হওয়ায় এটি কম্পাইল হতে ব্যর্থ হয়।",
    hint: "boolean is illegal in switch."
  },
  {
    id: 23,
    question: "What is the diagnostic compiler error produced when compiling `switch (10.5)` in Java?",
    options: [
      "\"incompatible types: possible lossy conversion from double to int\" (or selector type not allowed)",
      "\"NullPointerException\"",
      "\"unreachable code\"",
      "\"missing semicolon\""
    ],
    correctAnswer: 0,
    explanation: "The Java compiler flags double literals in switch as incompatible types because `double` cannot be safely converted to a switch selector type.",
    explanationBn: "ডাবল মান দিলে কম্পাইলার \"incompatible types: possible lossy conversion from double to int\" ত্রুটি দেয়।",
    hint: "Incompatible types error."
  },
  {
    id: 24,
    question: "Which of the following would successfully compile without errors in Java?",
    options: [
      "short s = 5; switch(s) { case 5: break; }",
      "double d = 5; switch(d) { case 5: break; }",
      "long l = 5; switch(l) { case 5: break; }",
      "boolean b = true; switch(b) { case true: break; }"
    ],
    correctAnswer: 0,
    explanation: "`short` is an allowed integral type. `double`, `long`, and `boolean` all produce compilation errors in switch statements.",
    explanationBn: "`short` একটি বৈধ ইন্টিগ্রাল টাইপ। বাকি তিনটি (`double`, `long`, `boolean`) কম্পাইল এরর তৈরি করে।",
    hint: "short is permitted."
  },
  {
    id: 25,
    question: "In the CBSE Class 12 IT-802 syllabus, why is memorizing permissible switch types critical for MCQs?",
    options: [
      "Because board exam papers consistently feature multiple-choice trap questions asking 'Which data type is not allowed in switch?' with double/float/boolean as options.",
      "Because only permissible types can be stored in MySQL.",
      "Because permissible types run faster in NetBeans.",
      "Because Java 21 removes switch."
    ],
    correctAnswer: 0,
    explanation: "CBSE board question papers routinely test the exact list of forbidden types (`float`, `double`, `boolean`, `long`) in Section A 1-mark multiple choice questions.",
    explanationBn: "সিবিএসই বোর্ড পরীক্ষায় ১ নম্বরের এমসিকিউতে প্রায়ই জানতে চাওয়া হয় কোন ডেটা টাইপটি সুইচে ব্যবহার করা যায় না।",
    hint: "Frequent 1-mark MCQ topic in CBSE exams."
  }
];

export default topic6_questions;
