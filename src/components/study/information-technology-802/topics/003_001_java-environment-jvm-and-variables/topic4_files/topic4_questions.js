const topic4_questions = [
  {
    id: 1,
    question: "Which keyword is used in Java to declare a constant whose value cannot be altered once initialized?",
    options: [
      "const",
      "static",
      "final",
      "constant"
    ],
    correctAnswer: 2,
    explanation: "In Java, the 'final' keyword is used to declare constants (e.g., `final double PI = 3.14159;`). Although 'const' is a reserved keyword in Java, it has no functionality and cannot be used.",
    explanationBn: "জাভায় ধ্রুবক (Constant) তৈরি করতে 'final' কিওয়ার্ড ব্যবহার করা হয় (যেমন: `final double PI = 3.14159;`)।",
    hint: "The keyword that makes a variable's value permanent."
  },
  {
    id: 2,
    question: "What will occur when the following Java code snippet is compiled?\n```java\nfinal int PASS_MARKS = 33;\nPASS_MARKS = 40;\n```",
    options: [
      "It compiles and updates PASS_MARKS to 40",
      "Compile-time error: 'cannot assign a value to final variable PASS_MARKS'",
      "Runtime NullPointerException",
      "The program prompts the user for confirmation"
    ],
    correctAnswer: 1,
    explanation: "Because PASS_MARKS is declared with the 'final' keyword, attempting to reassign its value triggers a compile-time error: 'cannot assign a value to final variable PASS_MARKS'.",
    explanationBn: "যেহেতু PASS_MARKS ভ্যারিয়েবলটি 'final' দিয়ে ঘোষিত, তাই পরবর্তীতে এর মান পরিবর্তন করতে গেলে কম্পাইল টাইমে 'cannot assign a value to final variable' এরর হয়।",
    hint: "Final variables cannot be reassigned."
  },
  {
    id: 3,
    question: "According to standard Java naming conventions, how should named constants be formatted?",
    options: [
      "camelCase with lowercase first letter (e.g. maxScore)",
      "PascalCase with uppercase first letter (e.g. MaxScore)",
      "ALL UPPERCASE letters with words separated by underscores (e.g. MAX_SCORE)",
      "kebab-case with hyphens (e.g. max-score)"
    ],
    correctAnswer: 2,
    explanation: "Standard Java conventions dictate that constants declared with 'final' should be written in ALL_CAPS with underscore separators (e.g., `MAX_SCORE`, `GST_RATE_PERCENT`).",
    explanationBn: "জাভায় ধ্রুবকের (Constant) নামকরণের আদর্শ নিয়ম হলো সবগুলো অক্ষর বড় হাতের (Uppercase) এবং শব্দের মাঝে আন্ডারস্কোর (_) দেওয়া (যেমন: `MAX_SCORE`)।",
    hint: "UPPERCASE_WITH_UNDERSCORES."
  },
  {
    id: 4,
    question: "Which of the following is a valid declaration of the mathematical constant Pi in Java?",
    options: [
      "final double PI = 3.14159;",
      "const double PI = 3.14159;",
      "constant double PI = 3.14159;",
      "final double PI := 3.14159;"
    ],
    correctAnswer: 0,
    explanation: "`final double PI = 3.14159;` is the correct standard Java syntax for declaring a constant of type double.",
    explanationBn: "`final double PI = 3.14159;` হলো জাভায় double টাইপের গাণিতিক ধ্রুবক Pi ঘোষণার সঠিক সিনট্যাক্স।",
    hint: "Uses 'final' keyword and standard assignment operator '='."
  },
  {
    id: 5,
    question: "What is a 'Blank Final Variable' in Java?",
    options: [
      "A final variable that is assigned the value null permanently",
      "A final variable that is declared without an initial value and initialized later (e.g., inside a constructor)",
      "A variable that is deleted by the Garbage Collector immediately",
      "A variable containing only white spaces"
    ],
    correctAnswer: 1,
    explanation: "A 'Blank Final Variable' is a final variable whose initialization is deferred. For instance variables, it must be initialized in every constructor before object creation finishes.",
    explanationBn: "যে final ভ্যারিয়েবল ডিক্লেয়ারেশনের সময় কোনো মান দেওয়া হয় না এবং পরে কনস্ট্রাক্টরের ভেতরে প্রথম ও শেষবারের মতো মান দেওয়া হয়, তাকে 'Blank Final Variable' বলে।",
    hint: "Final variable initialized inside a constructor."
  },
  {
    id: 6,
    question: "What happens if a class member method is declared with the 'final' keyword in Java?",
    options: [
      "The method cannot accept parameters",
      "The method cannot be overridden by any child subclass",
      "The method can only be executed once during program lifetime",
      "The method returns 0 always"
    ],
    correctAnswer: 1,
    explanation: "When a method is declared 'final', it cannot be overridden (redefined) by subclasses in Java object-oriented inheritance.",
    explanationBn: "কোনো মেথডকে 'final' ঘোষণা করলে সাবক্লাসে সেটিকে ওভাররাইড (Override) করা যায় না।",
    hint: "Prevents method overriding in subclasses."
  },
  {
    id: 7,
    question: "What happens if an entire class is declared as `final class SecurityManager { ... }` in Java?",
    options: [
      "The class cannot be instantiated using 'new'",
      "The class cannot be inherited or extended by any other class",
      "The class is automatically deleted from the hard disk",
      "The class can only contain static variables"
    ],
    correctAnswer: 1,
    explanation: "Declaring a class as 'final' prevents it from being extended (subclassed). Examples in the standard Java API include `java.lang.String` and `java.lang.Math`.",
    explanationBn: "কোনো ক্লাসকে 'final' ঘোষণা করলে অন্য কোনো ক্লাস সেটিকে এক্সটেন্ড বা ইনহেরিট করতে পারে না (যেমন: String এবং Math ক্লাস)।",
    hint: "Prevents class inheritance."
  },
  {
    id: 8,
    question: "Can a final variable's value be calculated using an expression during initialization (e.g. `final int TOTAL_DAYS = 52 * 7;`)?",
    options: [
      "No, only raw literal numbers are permitted",
      "Yes, the expression is evaluated and the resulting value (364) is assigned permanently to TOTAL_DAYS",
      "No, expressions can only be evaluated at runtime in loops",
      "Yes, but only if the expression contains addition"
    ],
    correctAnswer: 1,
    explanation: "Yes, constant expressions (like `52 * 7`) are evaluated (often at compile time) and permanently bound to the final variable.",
    explanationBn: "হ্যাঁ, কনস্ট্যান্ট এক্সপ্রেশন (যেমন: `52 * 7`) মূল্যায়িত হয়ে স্থায়ীভাবে final ভ্যারিয়েবলে সংরক্ষিত হয়।",
    hint: "Constant expressions are evaluated during initialization."
  },
  {
    id: 9,
    question: "Is it valid to declare a method local variable as 'final' inside a method body (e.g. `final double TAX = 0.18;`)?",
    options: [
      "No, final can only be used at class level",
      "Yes, final can be applied to local variables to guarantee they are not modified within that method",
      "No, local variables are always final by default",
      "Yes, but it causes the method to become private"
    ],
    correctAnswer: 1,
    explanation: "Yes, 'final' can be applied to local variables and method parameters inside any method to enforce immutability within that scope.",
    explanationBn: "হ্যাঁ, মেথডের ভেতরের লোকাল ভ্যারিয়েবল ও প্যারামিটারেও 'final' ব্যবহার করা যায় যাতে মেথডের মধ্যে কেউ তার মান পরিবর্তন করতে না পারে।",
    hint: "Final works on local variables, parameters, instance fields, methods, and classes."
  },
  {
    id: 10,
    question: "Consider: `public static final double GST_RATE = 18.0;`. Why is `static final` commonly used together in Java?",
    options: [
      "To create a single shared constant across all instances of the class without wasting memory",
      "To make the variable private to the database",
      "To force the JVM to run faster on Windows",
      "To convert the double into an integer"
    ],
    correctAnswer: 0,
    explanation: "`static final` creates a class-level constant: 'static' ensures only one copy exists in memory shared by all objects, and 'final' ensures it cannot be modified.",
    explanationBn: "`static final` ব্যবহারের মাধ্যমে ক্লাসের জন্য একটিমাত্র মেমরি কপি সংরক্ষিত থাকে ('static') এবং তার মান অপরিবর্তনীয় থাকে ('final')।",
    hint: "Shared class-wide constant."
  },
  {
    id: 11,
    question: "What is the difference between `const` in C++ and `final` in Java?",
    options: [
      "There is no difference; they are 100% interchangeable",
      "In C++, `const` is the keyword for constants, whereas in Java, `final` is used (and `const` is a reserved unused keyword)",
      "In Java, `final` variables can be changed using pointers",
      "In C++, `const` is only for arrays"
    ],
    correctAnswer: 1,
    explanation: "C++ uses `const` for constants. Java reserved the keyword `const` but does not use it; Java uses `final` to declare constants.",
    explanationBn: "C++ এ ধ্রুবকের জন্য `const` ব্যবহার করা হয়, কিন্তু জাভায় এর জন্য `final` কিওয়ার্ড ব্যবহৃত হয় (`const` জাভায় একটি অব্যবহৃত সংরক্ষিত শব্দ)।",
    hint: "C++ uses const, Java uses final."
  },
  {
    id: 12,
    question: "Which of the following constant declarations contains a SYNTAX ERROR?",
    options: [
      "final int MAX_USERS = 1000;",
      "final float GRAVITY = 9.8f;",
      "final double PI;",
      "final String CITY = \"Barrackpore\";"
    ],
    correctAnswer: 2,
    explanation: "In a local method context, declaring `final double PI;` without initializing it or using it before initialization causes a compiler error. Local final variables cannot be used until they are assigned a value.",
    explanationBn: "লোকাল ভ্যারিয়েবল হিসেবে মান ছাড়া `final double PI;` ডিক্লেয়ার করে মান না দিলে তা ব্যবহারের সময় কম্পাইল এরর হয়।",
    hint: "Local final variables must be initialized before use."
  },
  {
    id: 13,
    question: "What is the benefit of declaring fixed configuration parameters (like database port or maximum allowed retries) as `final`?",
    options: [
      "It prevents accidental modification during program execution and allows compiler optimization",
      "It allows the program to run without RAM",
      "It doubles the computer's CPU clock speed",
      "It translates the code into JavaScript"
    ],
    correctAnswer: 0,
    explanation: "Declaring fixed parameters as `final` enforces code safety by preventing accidental reassignment bugs and enables the compiler and JIT to perform inlining optimizations.",
    explanationBn: "কনফিগারেশন মানগুলোকে `final` করলে অসাবধানতাবশত মান পরিবর্তনের ভুল প্রতিরোধ হয় এবং কম্পাইলার অপ্টিমাইজেশন সুবিধা পায়।",
    hint: "Safety against accidental modification + compiler optimization."
  },
  {
    id: 14,
    question: "If a final array is declared: `final int[] scores = {10, 20, 30};`, which of the following operations is LEGAL in Java?",
    options: [
      "scores[0] = 99; (Modifying an individual array element)",
      "scores = new int[]{50, 60}; (Reassigning the array reference to a new array)",
      "scores = null;",
      "None of these operations are legal"
    ],
    correctAnswer: 0,
    explanation: "For reference types (like arrays or objects), 'final' means the reference variable cannot point to another object/array, but the internal contents of the array/object can still be mutated (`scores[0] = 99` is legal).",
    explanationBn: "অ্যারের ক্ষেত্রে 'final' মানে হলো ভ্যারিয়েবলটিকে নতুন কোনো অ্যারেতে রি-অ্যাসাইন করা যাবে না (`scores = new ...` অবৈধ), কিন্তু ভেতরের উপাদান পরিবর্তন করা যাবে (`scores[0] = 99;` বৈধ)।",
    hint: "Final locks the reference, not the array contents."
  },
  {
    id: 15,
    question: "Which of the following correctly pairs the standard naming convention with its usage in Java?",
    options: [
      "Variable: UPPERCASE; Constant: camelCase",
      "Class: camelCase; Variable: PascalCase",
      "Constant: UPPER_SNAKE_CASE; Variable: camelCase; Class: PascalCase",
      "Package: UPPERCASE; Class: lowercase"
    ],
    correctAnswer: 2,
    explanation: "Standard Java conventions: Constants = `MAX_LIMIT` (UPPER_SNAKE_CASE); Variables = `studentAge` (camelCase); Classes = `StudentProfile` (PascalCase).",
    explanationBn: "সঠিক কনভেনশন: ধ্রুবক = `MAX_LIMIT` (বড় হাতের), ভ্যারিয়েবল = `studentAge` (camelCase), ক্লাস = `StudentProfile` (PascalCase)।",
    hint: "Review all 3 naming conventions."
  },
  {
    id: 16,
    question: "Can a `final` variable be initialized inside an `if` block in Java?",
    options: [
      "No, never",
      "Yes, provided the compiler can guarantee that the variable is assigned EXACTLY ONCE before it is read on every possible execution path",
      "Yes, it can be assigned as many times as the loop runs",
      "Only if the condition is false"
    ],
    correctAnswer: 1,
    explanation: "Java allows deferred initialization of final variables as long as definite assignment analysis proves it is assigned exactly once before use on all execution paths.",
    explanationBn: "হ্যাঁ, যদি কম্পাইলার নিশ্চিত হতে পারে যে প্রতিটি কোড পাথে final ভ্যারিয়েবলটিতে ঠিক একবারই মান বরাদ্দ করা হয়েছে, তবে তা বৈধ।",
    hint: "Definite assignment rule: assigned exactly once."
  },
  {
    id: 17,
    question: "What is the compiler output for:\n```java\nfinal int a = 10;\nfinal int b = 20;\nint c = a + b;\n```",
    options: [
      "Compile-time error because a and b are final",
      "Compiles successfully, c receives value 30 (compiler inlines 10 + 20 as 30)",
      "Throws RuntimeException",
      "Prints 1020 on the screen"
    ],
    correctAnswer: 1,
    explanation: "Using final variables in expressions is completely valid. The Java compiler inlines compile-time constants so `a + b` is replaced directly with `30` in the bytecode.",
    explanationBn: "এটি সম্পূর্ণ বৈধ। কম্পাইলার কনস্ট্যান্ট ফোল্ডিং (Constant Folding)-এর মাধ্যমে সরাসরি ৩০ মানটি 'c'-তে বরাদ্দ করে।",
    hint: "Final variables can be read and used in expressions."
  },
  {
    id: 18,
    question: "Which of the following is an example of a built-in constant in the standard Java class library (`java.lang.Math`)?",
    options: [
      "Math.PI",
      "Math.calculate()",
      "Math.new()",
      "Math.run()"
    ],
    correctAnswer: 0,
    explanation: "`Math.PI` and `Math.E` are standard public static final constants defined in the java.lang.Math class representing Pi (3.141592653589793) and Euler's number.",
    explanationBn: "`Math.PI` হলো জাভার `java.lang.Math` ক্লাসে সংজ্ঞায়িত একটি আদর্শ public static final ধ্রুবক।",
    hint: "Math.PI is the built-in mathematical constant."
  },
  {
    id: 19,
    question: "What will happen if you attempt to compile:\n```java\nfinal double DISCOUNT;\nDISCOUNT = 0.15;\nDISCOUNT = 0.20;\n```",
    options: [
      "It compiles and DISCOUNT becomes 0.20",
      "Compile-time error on the second assignment line (`DISCOUNT = 0.20;`) because variable DISCOUNT might already have been assigned",
      "It calculates the average (0.175)",
      "Runtime NullPointerException"
    ],
    correctAnswer: 1,
    explanation: "The first assignment `DISCOUNT = 0.15;` succeeds (initializing the blank final). The second assignment `DISCOUNT = 0.20;` fails with a compile error because final variables cannot be modified once assigned.",
    explanationBn: "প্রথমবার `DISCOUNT = 0.15;` মান নেওয়ার পর দ্বিতীয়বার `DISCOUNT = 0.20;` লিখতে গেলে কম্পাইলার ত্রুটি দেবে কারণ final ভ্যারিয়েবলের মান পরিবর্তন করা যায় না।",
    hint: "Cannot assign a value to final variable more than once."
  },
  {
    id: 20,
    question: "Why does Java make the `String` class `final` (`public final class String`)?",
    options: [
      "To prevent developers from overriding String methods and compromising security, thread safety, and string pool caching",
      "Because Strings cannot store numbers",
      "To save hard drive space on servers",
      "Because Strings only work in English"
    ],
    correctAnswer: 0,
    explanation: "Making String final guarantees immutability and security: nobody can subclass String to alter hashing, security tokens, or String Constant Pool caching behaviors.",
    explanationBn: "String ক্লাসকে final করার কারণ হলো নিরাপত্তা, থ্রেড-সেফটি এবং স্ট্রিং কনস্ট্যান্ট পুলের অখণ্ডতা বজায় রাখা যাতে কেউ এর আচরণ বিকৃত করতে না পারে।",
    hint: "Security, immutability, and string pool integrity."
  },
  {
    id: 21,
    question: "Which of the following modifiers cannot be combined with `final` on a method in Java?",
    options: [
      "public",
      "static",
      "abstract",
      "synchronized"
    ],
    correctAnswer: 2,
    explanation: "`abstract` requires subclasses to override the method, while `final` forbids subclasses from overriding the method. Combining `abstract` and `final` is an illegal contradiction in Java.",
    explanationBn: "`abstract` মেথডকে ওভাররাইড করা বাধ্যতামূলক, আর `final` মেথডকে ওভাররাইড করা নিষিদ্ধ। তাই `abstract` ও `final` একসাথে ব্যবহার করা অবৈধ।",
    hint: "Abstract forces overriding; final prevents overriding."
  },
  {
    id: 22,
    question: "What is the effect of declaring a method parameter as `final void calculate(final int billAmount)`?",
    options: [
      "The method cannot return a value",
      "The parameter `billAmount` cannot be modified/reassigned inside the `calculate` method body",
      "The parameter becomes visible globally to all classes",
      "The caller must pass 0 as argument"
    ],
    correctAnswer: 1,
    explanation: "A `final` parameter is treated as a read-only variable inside the method; attempting to write `billAmount = ...;` inside the method triggers a compile error.",
    explanationBn: "প্যারামিটারকে `final` করলে মেথডের ভেতরে তার মান পরিবর্তন করা যায় না; এটি রিড-ওনলি হিসেবে কাজ করে।",
    hint: "Prevents parameter reassignment inside the method body."
  },
  {
    id: 23,
    question: "Which of the following is true regarding memory optimization of `final` variables in Java?",
    options: [
      "Compile-time constants are inlined directly into bytecode instructions, eliminating runtime lookup overhead",
      "Final variables take 10 times more memory",
      "Final variables can only be stored on floppy disks",
      "Final variables disable the Garbage Collector"
    ],
    correctAnswer: 0,
    explanation: "The Java compiler replaces compile-time constants (e.g. `final int MAX = 100`) directly with their literal values in bytecode (called constant inlining), speeding up execution.",
    explanationBn: "কম্পাইল-টাইম কনস্ট্যান্টগুলোকে কম্পাইলার সরাসরি বাইটকোডে ইনলাইন করে দেয়, ফলে রানটাইমে অতিরিক্ত মেমরি লুকআপের প্রয়োজন হয় না।",
    hint: "Constant inlining in compiled bytecode."
  },
  {
    id: 24,
    question: "A store in Barrackpore has a fixed delivery charge of ₹50. Which Java statement represents the best professional practice for declaring this constant?",
    options: [
      "int delivery = 50;",
      "public static final double DELIVERY_CHARGE = 50.0;",
      "final int 50DeliveryCharge = 50;",
      "const double charge = 50.0;"
    ],
    correctAnswer: 1,
    explanation: "`public static final double DELIVERY_CHARGE = 50.0;` follows all standard best practices: accessible, class-wide (static), immutable (final), and named in UPPER_SNAKE_CASE.",
    explanationBn: "`public static final double DELIVERY_CHARGE = 50.0;` হলো ধ্রুবক ঘোষণার সর্বোত্তম নিয়ম: এটি সার্বজনীন, ক্লাসের অংশ, অপরিবর্তনীয় এবং ক্যাপিটাল লেটারে লিখিত।",
    hint: "Uses public static final with UPPER_SNAKE_CASE."
  },
  {
    id: 25,
    question: "Which of the following statements about the `final` keyword in CBSE Class 12 IT-802 is TRUE?",
    options: [
      "A final variable can be reassigned multiple times inside a while loop",
      "A final variable can be initialized only once, and any attempt to reassign it generates a compile-time error",
      "The final keyword can only be applied to integer data types",
      "Final variables must always be initialized to 0"
    ],
    correctAnswer: 1,
    explanation: "In Java, a final variable can only be assigned a value once. Any subsequent reassignment attempt produces a compile-time error.",
    explanationBn: "জাভায় final ভ্যারিয়েবলে কেবল একবারই মান বরাদ্দ করা যায়, এবং পুনরায় মান পরিবর্তনের চেষ্টা করলে কম্পাইল-টাইম এরর ঘটে।",
    hint: "Initializable once only."
  }
];

export default topic4_questions;
