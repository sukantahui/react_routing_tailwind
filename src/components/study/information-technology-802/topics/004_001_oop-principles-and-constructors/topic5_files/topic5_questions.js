const questions = [
  {
    id: "q1",
    question: "What is Constructor Overloading in Java?",
    options: [
      "Defining multiple constructors within the same class, each having a distinct parameter list (different number, types, or order of parameters)",
      "Writing the same constructor in 10 different source files",
      "Overriding a superclass constructor in a subclass",
      "Making a constructor static and final"
    ],
    answer: "Defining multiple constructors within the same class, each having a distinct parameter list (different number, types, or order of parameters)",
    correctAnswer: 0,
    explanation: "**Constructor Overloading** is a feature of compile-time polymorphism in Java that allows a class to have multiple constructors with the same name (the class name) but different parameter signatures.",
    explanationBn: "একই ক্লাসে ভিন্ন ভিন্ন প্যারামিটার তালিকা বিশিষ্ট একাধিক কনস্ট্রাক্টর তৈরি করার পদ্ধতিকে কনস্ট্রাক্টর ওভারলোডিং বলে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Same constructor name with different parameter signatures."
  },
  {
    id: "q2",
    question: "Which type of Polymorphism is demonstrated by Constructor Overloading?",
    options: [
      "Compile-Time (Static) Polymorphism",
      "Runtime (Dynamic) Polymorphism",
      "Execution Polymorphism",
      "Garbage Collection Polymorphism"
    ],
    answer: "Compile-Time (Static) Polymorphism",
    correctAnswer: 0,
    explanation: "Constructor Overloading is resolved by the compiler at compile-time based on the arguments supplied, making it an example of **Compile-Time (Static) Polymorphism**.",
    explanationBn: "কনস্ট্রাক্টর ওভারলোডিং কম্পাইল টাইমে নির্ধারিত হয়, তাই এটি স্ট্যাটিক বা কম্পাইল-টাইম পলিমরফিজম।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Resolved before running the program."
  },
  {
    id: "q3",
    question: "Which of the following differences distinguishes overloaded constructors in a class?",
    options: [
      "Difference in number, data types, or sequence of parameter types",
      "Difference in return types",
      "Difference in variable names only",
      "Difference in the access specifier only"
    ],
    answer: "Difference in number, data types, or sequence of parameter types",
    correctAnswer: 0,
    explanation: "Constructors must differ in their **parameter signature**: (1) number of parameters, (2) data types of parameters, or (3) order of parameter types.",
    explanationBn: "ওভারলোডেড কনস্ট্রাক্টরগুলো অবশ্যই প্যারামিটারের সংখ্যা, ডেটা টাইপ অথবা টাইপের ক্রমে ভিন্ন হতে হবে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Parameter signature must be distinct."
  },
  {
    id: "q4",
    question: "Does changing only the parameter variable names (e.g. 'Box(int l, int w)' vs 'Box(int x, int y)') overload a constructor?",
    options: [
      "No, it produces a compile-time error for duplicate method/constructor",
      "Yes, Java differentiates constructors by parameter names",
      "Only if one of them is public",
      "Only if they are in different loops"
    ],
    answer: "No, it produces a compile-time error for duplicate method/constructor",
    correctAnswer: 0,
    explanation: "The compiler only inspects the **data types and count** of parameters (`int, int`). Parameter variable names (`l, w` vs `x, y`) are ignored, causing a duplicate constructor compilation error.",
    explanationBn: "না, শুধু প্যারামিটারের নাম পরিবর্তন করলে সিগনেচার বদলায় না; এতে ডুপ্লিকেট কনস্ট্রাক্টরের এরর দেখা দেয়।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Parameter types matter, not their local identifier names."
  },
  {
    id: "q5",
    question: "What keyword is used inside a constructor to invoke another overloaded constructor in the same class?",
    options: [
      "this(...)",
      "super(...)",
      "call(...)",
      "self(...)"
    ],
    answer: "this(...)",
    correctAnswer: 0,
    explanation: "**`this(...)`** is used for Constructor Chaining within the same class, passing arguments to another overloaded constructor.",
    explanationBn: "একই ক্লাসের অন্য একটি ওভারলোডেড কনস্ট্রাক্টরকে কল করতে 'this(...)' ব্যবহার করা হয়।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Refers to the current class constructors."
  },
  {
    id: "q6",
    question: "What is the mandatory rule regarding the placement of 'this(...)' inside a constructor body?",
    options: [
      "It MUST be the very FIRST statement in the constructor body",
      "It must be the last statement before closing brace",
      "It can be placed anywhere, even inside a loop",
      "It must be placed in the class header"
    ],
    answer: "It MUST be the very FIRST statement in the constructor body",
    correctAnswer: 0,
    explanation: "Java enforces that `this(...)` **must be the first statement** inside the constructor body. Placing any statement before `this(...)` produces a compile error: `call to this must be first statement in constructor`.",
    explanationBn: "কনস্ট্রাক্টরের ভেতর 'this(...)' কলটি অবশ্যই সবার প্রথম লাইনে (First Statement) থাকতে হবে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Strictly line 1 of the constructor body."
  },
  {
    id: "q7",
    question: "Can a constructor contain BOTH 'this(...)' and 'super(...)' explicitly?",
    options: [
      "No, because both this() and super() strictly demand to be the first statement in the constructor",
      "Yes, if this() is first and super() is second",
      "Yes, if separated by a semicolon",
      "Only in abstract classes"
    ],
    answer: "No, because both this() and super() strictly demand to be the first statement in the constructor",
    correctAnswer: 0,
    explanation: "Since both `this()` and `super()` must be on line 1, they cannot both appear in the same constructor. If you call `this()`, the target constructor will eventually call `super()`.",
    explanationBn: "না, কারণ this() এবং super() উভয়ই প্রথম লাইনে থাকার দাবি করায় একই কনস্ট্রাক্টরে একসাথে দুটি লেখা যায় না।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Hard",
    hint: "Both require the first statement slot."
  },
  {
    id: "q8",
    question: "What is the output of the following Java program?\n\nclass Box {\n    int l, b, h;\n    Box() {\n        this(1);\n    }\n    Box(int side) {\n        this(side, side, side);\n    }\n    Box(int l, int b, int h) {\n        this.l = l;\n        this.b = b;\n        this.h = h;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box();\n        System.out.println(b.l * b.b * b.h);\n    }\n}",
    options: [
      "1",
      "0",
      "3",
      "Compilation error"
    ],
    answer: "1",
    correctAnswer: 0,
    explanation: "`new Box()` calls `Box()` -> delegates to `Box(1)` -> delegates to `Box(1, 1, 1)` which sets `l=1, b=1, h=1`. Volume is `1 * 1 * 1 = 1`.",
    explanationBn: "Box() কনস্ট্রাক্টর চেইনিংয়ের মাধ্যমে Box(1) হয়ে Box(1, 1, 1) কল করে, ফলে দৈর্ঘ্য, প্রস্থ ও উচ্চতা ১ হয়ে মোট আয়তন ১ হবে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Trace the two-level constructor chaining: Box() -> Box(1) -> Box(1,1,1)."
  },
  {
    id: "q9",
    question: "What error occurs if constructor A calls constructor B via 'this()', and constructor B calls constructor A via 'this()'?",
    options: [
      "Compile-time error: 'recursive constructor invocation'",
      "Runtime StackOverflowError",
      "Infinite loop freezing the computer",
      "The program deletes itself"
    ],
    answer: "Compile-time error: 'recursive constructor invocation'",
    correctAnswer: 0,
    explanation: "The Java compiler detects cyclic constructor calls during compilation and halts with `recursive constructor invocation`.",
    explanationBn: "চক্রাকার কনস্ট্রাক্টর কল তৈরি করলে জাভা কম্পাইলার সরাসরি 'recursive constructor invocation' এরর দেয়।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Cyclic constructor dependencies are caught at compile time."
  },
  {
    id: "q10",
    question: "Why is Constructor Overloading useful in real-world application design (e.g. BankAccount)?",
    options: [
      "It allows accounts to be created under different scenarios: e.g., standard account (zero balance), funded account (with starting balance), or joint account (with multiple names)",
      "It lets the bank operate without any computers",
      "It reduces bank taxes automatically",
      "It converts all currency into USD"
    ],
    answer: "It allows accounts to be created under different scenarios: e.g., standard account (zero balance), funded account (with starting balance), or joint account (with multiple names)",
    correctAnswer: 0,
    explanation: "Constructor overloading provides flexibility: clients can instantiate objects with minimal required information or provide rich custom parameters as needed.",
    explanationBn: "বাস্তব ক্ষেত্রে বিভিন্ন পরিস্থিতিতে (যেমন শূন্য ব্যালেন্স বা প্রারম্ভিক ডিপোজিট সহ) অবজেক্ট তৈরির নমনীয়তা দিতে এটি ব্যবহৃত হয়।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Multiple flexible initialization strategies."
  },
  {
    id: "q11",
    question: "Which of the following constructor pairs in the same class is INVALID (causes a duplicate constructor error)?",
    options: [
      "Account(int id, double bal) AND Account(int num, double amount)",
      "Account(int id, double bal) AND Account(double bal, int id)",
      "Account(int id) AND Account(String id)",
      "Account() AND Account(int id)"
    ],
    answer: "Account(int id, double bal) AND Account(int num, double amount)",
    correctAnswer: 0,
    explanation: "Both constructors have the identical parameter signature `(int, double)`. Changing parameter names from `id, bal` to `num, amount` does not change the signature, resulting in a duplicate constructor error.",
    explanationBn: "উভয় কনস্ট্রাক্টরের টাইপ (int, double) একই থাকায় এদের মধ্যে পার্থক্য নেই; ফলে ডুপ্লিকেট কনস্ট্রাক্টর এরর হবে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Identical types in identical sequence."
  },
  {
    id: "q12",
    question: "What is 'Constructor Chaining' in Java?",
    options: [
      "The process of calling one constructor from another constructor within the same class or from a subclass",
      "Connecting multiple computer hard drives in RAID",
      "Running loops inside constructors",
      "Creating 100 objects with a single statement"
    ],
    answer: "The process of calling one constructor from another constructor within the same class or from a subclass",
    correctAnswer: 0,
    explanation: "**Constructor Chaining** is the practice of having one constructor delegate part of its setup to another constructor using `this(...)` (same class) or `super(...)` (parent class).",
    explanationBn: "কনস্ট্রাক্টর চেইনিং হলো this() বা super() এর মাধ্যমে এক কনস্ট্রাক্টর থেকে অন্য কনস্ট্রাক্টরকে ক্রমান্বয়ে কল করার প্রক্রিয়া।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Chaining initializers together."
  },
  {
    id: "q13",
    question: "What is the primary benefit of using 'this(...)' constructor chaining instead of copying field initialization code into every overloaded constructor?",
    options: [
      "It eliminates duplicate code, centralizes validation logic, and improves maintainability (DRY - Don't Repeat Yourself)",
      "It speeds up internet connection",
      "It makes the class abstract",
      "It allows variables to have multiple names"
    ],
    answer: "It eliminates duplicate code, centralizes validation logic, and improves maintainability (DRY - Don't Repeat Yourself)",
    correctAnswer: 0,
    explanation: "Chaining all constructors to a master constructor centralizes validation logic in one place, avoiding code duplication across overloaded constructors.",
    explanationBn: "চেইনিংয়ের মাধ্যমে কোডের পুনরাবৃত্তি বন্ধ হয় এবং সব ভ্যালিডেশন এক জায়গায় কেন্দ্রীভূত থাকে (DRY নীতি)।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Prevents code duplication across constructors."
  },
  {
    id: "q14",
    question: "Given: 'class Demo { Demo(int a) { System.out.print(\"INT \"); } Demo(double a) { System.out.print(\"DOUBLE \"); } }'. What is the output of 'new Demo(10);'?",
    options: [
      "INT ",
      "DOUBLE ",
      "INT DOUBLE ",
      "Compilation error"
    ],
    answer: "INT ",
    correctAnswer: 0,
    explanation: "`10` is an integer literal. The compiler matches the exact literal type and invokes `Demo(int a)`, printing `\"INT \"`.",
    explanationBn: "১০ একটি পূর্ণসংখ্যা (int literal) হওয়ায় কম্পাইলার হুবহু ম্যাচ করে Demo(int a) কনস্ট্রাক্টর কল করবে এবং 'INT ' প্রিন্ট করবে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Exact type match takes highest precedence."
  },
  {
    id: "q15",
    question: "Continuing from the previous question, what is the output of 'new Demo(10.5);'?",
    options: [
      "DOUBLE ",
      "INT ",
      "Compilation error",
      "10.5"
    ],
    answer: "DOUBLE ",
    correctAnswer: 0,
    explanation: "`10.5` is a `double` literal by default in Java, matching `Demo(double a)` exactly, so `\"DOUBLE \"` is printed.",
    explanationBn: "১০.৫ হলো double লিটারেল, তাই এটি সরাসরি Demo(double a) কনস্ট্রাক্টরকে কল করে 'DOUBLE ' প্রিন্ট করবে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Floating point literals default to double."
  },
  {
    id: "q16",
    question: "If a class has 'Demo(double d)' and you call 'new Demo(10)' (passing an int), what happens?",
    options: [
      "Automatic Type Promotion widens the int 10 to double 10.0 and invokes Demo(double d)",
      "A compile-time error occurs because int is not double",
      "The program crashes with a ClassCastException",
      "A default constructor is called"
    ],
    answer: "Automatic Type Promotion widens the int 10 to double 10.0 and invokes Demo(double d)",
    correctAnswer: 0,
    explanation: "If an exact match is not found, Java performs **implicit widening type promotion** (`byte -> short -> int -> long -> float -> double`). The `int` 10 is promoted to `double` 10.0.",
    explanationBn: "সরাসরি int না থাকলে জাভা স্বয়ংক্রিয়ভাবে int কে double এ প্রসারিত (Type Promotion) করে Demo(double d) কল করে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Hard",
    hint: "Automatic widening conversion in Java."
  },
  {
    id: "q17",
    question: "What is the output of the following program?\n\nclass Sample {\n    Sample() {\n        System.out.print(\"1 \");\n    }\n    Sample(int x) {\n        this();\n        System.out.print(\"2 \");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Sample s = new Sample(100);\n    }\n}",
    options: [
      "1 2 ",
      "2 1 ",
      "2 ",
      "1 "
    ],
    answer: "1 2 ",
    correctAnswer: 0,
    explanation: "`new Sample(100)` invokes `Sample(int x)`. Its first line `this()` delegates to `Sample()`, which prints `\"1 \"`. Control returns to `Sample(int x)` which prints `\"2 \"`. Output: `\"1 2 \"`.",
    explanationBn: "Sample(int) এর প্রথম লাইনে this() থাকায় আগে Sample() চলে '1 ' প্রিন্ট করে, পরে '2 ' প্রিন্ট হয়; মোট আউটপুট '1 2 '।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "this() runs before the rest of the calling constructor."
  },
  {
    id: "q18",
    question: "Can overloaded constructors have different access modifiers (e.g. one public, one protected, one private)?",
    options: [
      "Yes, each overloaded constructor can declare its own independent access modifier",
      "No, all constructors must have identical access modifiers",
      "Only public and private can be mixed",
      "Only in abstract classes"
    ],
    answer: "Yes, each overloaded constructor can declare its own independent access modifier",
    correctAnswer: 0,
    explanation: "Each constructor in an overloaded set is completely independent regarding access level. For example, a class might provide a `public` parameterized constructor and a `private` internal copy constructor.",
    explanationBn: "হ্যাঁ, প্রতিটি ওভারলোডেড কনস্ট্রাক্টরের অ্যাক্সেস মডিফায়ার (যেমন public বা private) সম্পূর্ণ স্বাধীন হতে পারে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Access specifiers can vary across overloaded constructors."
  },
  {
    id: "q19",
    question: "What happens if a class defines: 'Student(String name, int age)' and 'Student(int age, String name)'?",
    options: [
      "Valid overloading because the sequence of parameter data types is different",
      "Compilation error because both take a String and an int",
      "Runtime exception on instantiation",
      "Undefined behavior"
    ],
    answer: "Valid overloading because the sequence of parameter data types is different",
    correctAnswer: 0,
    explanation: "Reversing the sequence of parameter types (`(String, int)` vs `(int, String)`) creates two distinct method signatures, making it **valid constructor overloading**.",
    explanationBn: "প্যারামিটারের ডেটা টাইপের ক্রম ভিন্ন (String, int বনাম int, String) হওয়ায় এটি সম্পূর্ণ বৈধ কনস্ট্রাক্টর ওভারলোডিং।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Sequence of data types is part of the signature."
  },
  {
    id: "q20",
    question: "What is an Ambiguous Constructor Call in Java?",
    options: [
      "When the compiler cannot determine which overloaded constructor is a more specific match for the given arguments",
      "When a constructor has no name",
      "When a class is compiled without javac",
      "When an object is created on the stack"
    ],
    answer: "When the compiler cannot determine which overloaded constructor is a more specific match for the given arguments",
    correctAnswer: 0,
    explanation: "If multiple overloaded constructors can match through type promotions or `null` arguments with equal priority (e.g. `Test(String s)` vs `Test(Integer i)` called with `new Test(null)`), the compiler reports an `ambiguous reference` error.",
    explanationBn: "যখন কম্পাইলার একাধিক কনস্ট্রাক্টরের মধ্যে কোনটি বেশি উপযোগী তা নিশ্চিত করতে পারে না, তখন 'ambiguous call' এরর দেয়।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Hard",
    hint: "Compiler cannot choose between two equally plausible overloaded matches."
  },
  {
    id: "q21",
    question: "What is the output of the following Java snippet?\n\nclass Data {\n    Data(String s) {\n        System.out.print(\"String\");\n    }\n    Data(Object o) {\n        System.out.print(\"Object\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Data(\"CBSE\");\n    }\n}",
    options: [
      "String",
      "Object",
      "StringObject",
      "Compilation error"
    ],
    answer: "String",
    correctAnswer: 0,
    explanation: "`\"CBSE\"` is a `String`. In Java method resolution, the **most specific subtype match** is always chosen. Since `String` is a subclass of `Object`, `Data(String)` is chosen over `Data(Object)`.",
    explanationBn: "'CBSE' একটি স্ট্রিং এবং জাভাতে সবচেয়ে সুনির্দিষ্ট (most specific) টাইপ আগে গুরুত্ব পায়, তাই Data(String) চলে 'String' প্রিন্ট করবে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Hard",
    hint: "Most specific subtype takes precedence."
  },
  {
    id: "q22",
    question: "How many constructors are defined in the 'java.lang.String' class in standard Java?",
    options: [
      "Over 15 overloaded constructors (accepting char[], byte[], StringBuffer, StringBuilder, etc.)",
      "Exactly 1 constructor",
      "0 constructors",
      "Exactly 2 constructors"
    ],
    answer: "Over 15 overloaded constructors (accepting char[], byte[], StringBuffer, StringBuilder, etc.)",
    correctAnswer: 0,
    explanation: "`java.lang.String` is a prime real-world example of extensive constructor overloading, offering constructors for raw byte arrays, char arrays, subsets with offsets, and string builders.",
    explanationBn: "জাভার String ক্লাসে ১৫ টিরও বেশি ওভারলোডেড কনস্ট্রাক্টর রয়েছে যা বিভিন্ন ফরম্যাট থেকে স্ট্রিং তৈরিতে সাহায্য করে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "String class supports numerous overloaded creation methods."
  },
  {
    id: "q23",
    question: "What is the output of the following program?\n\nclass Num {\n    int val;\n    Num() {\n        val = 10;\n    }\n    Num(int v) {\n        val = v;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Num n1 = new Num();\n        Num n2 = new Num(25);\n        System.out.println(n1.val + n2.val);\n    }\n}",
    options: [
      "35",
      "1025",
      "25",
      "10"
    ],
    answer: "35",
    correctAnswer: 0,
    explanation: "`n1.val = 10` and `n2.val = 25`. The sum `n1.val + n2.val` is `10 + 25 = 35`.",
    explanationBn: "n1.val এর মান 10 এবং n2.val এর মান 25; সুতরাং যোগফল 10 + 25 = 35।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "10 + 25 = 35."
  },
  {
    id: "q24",
    question: "Can a constructor overload another constructor by simply adding the 'final' keyword to its parameter (e.g. 'Test(int a)' vs 'Test(final int a)')?",
    options: [
      "No, adding 'final' to a parameter does NOT change the method signature and results in a duplicate constructor error",
      "Yes, final changes the signature",
      "Only in Java 17+",
      "Only if the class is public"
    ],
    answer: "No, adding 'final' to a parameter does NOT change the method signature and results in a duplicate constructor error",
    correctAnswer: 0,
    explanation: "Parameter modifiers like `final` are compiler-level variable mutability restrictions and are not part of the bytecode signature. The compiler sees two identical `Test(int)` constructors and errors.",
    explanationBn: "প্যারামিটারে 'final' লিখলে সিগনেচার পরিবর্তন হয় না, ফলে কম্পাইলার ডুপ্লিকেট কনস্ট্রাক্টরের এরর দেয়।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Hard",
    hint: "Parameter modifiers do not alter the signature."
  },
  {
    id: "q25",
    question: "What is the 'Telescoping Constructor Pattern' in Java?",
    options: [
      "A pattern where a constructor with fewer parameters calls an overloaded constructor with more parameters using 'this(...)', supplying default values",
      "A constructor that zooms in on images",
      "A constructor with 1000 parameters",
      "A constructor that cannot be compiled"
    ],
    answer: "A pattern where a constructor with fewer parameters calls an overloaded constructor with more parameters using 'this(...)', supplying default values",
    correctAnswer: 0,
    explanation: "In the Telescoping Constructor pattern, simpler constructors delegate to more comprehensive constructors by supplying sensible defaults: `Account(id) -> this(id, \"Standard\", 0.0);`.",
    explanationBn: "টেলিস্কোপিং প্যাটার্নে কম প্যারামিটারের কনস্ট্রাক্টরগুলো ডিফল্ট মান পাঠিয়ে বড় কনস্ট্রাক্টরকে কল করে চেইনিং বজায় রাখে।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Hard",
    hint: "Progressive parameter delegation with this()."
  },
  {
    id: "q26",
    question: "Which of the following is TRUE about constructor overloading in CBSE Class XII IT 802?",
    options: [
      "It allows developers to create objects with different initial data sets while maintaining a single clean class name",
      "It is only allowed in interface files",
      "It requires the programmer to create separate classes for each constructor",
      "It requires memory in the C drive"
    ],
    answer: "It allows developers to create objects with different initial data sets while maintaining a single clean class name",
    correctAnswer: 0,
    explanation: "Constructor overloading lets callers initialize objects flexibly while keeping the class identifier unified and clean.",
    explanationBn: "ক্লাসের একই নাম বজায় রেখে বিভিন্ন প্রাথমিক ডেটা দিয়ে অবজেক্ট তৈরির নমনীয়তা প্রদান করাই এর মূল উদ্দেশ্য।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Flexibility with unified class names."
  },
  {
    id: "q27",
    question: "Can an overloaded constructor be declared 'private' while another constructor in the same class is declared 'public'?",
    options: [
      "Yes, this is valid and commonly used for internal helper construction or copy creation",
      "No, all overloaded constructors must have identical visibility",
      "Only if the class is marked abstract",
      "Only if parameters are floats"
    ],
    answer: "Yes, this is valid and commonly used for internal helper construction or copy creation",
    correctAnswer: 0,
    explanation: "Each overloaded constructor can have different visibility modifiers to tailor external vs internal instantiation.",
    explanationBn: "হ্যাঁ, অভ্যন্তরীণ ব্যবহারের জন্য একটি কনস্ট্রাক্টর private এবং জনসাধারণের জন্য অন্যটি public রাখা সম্পূর্ণ বৈধ।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Medium",
    hint: "Independent access modifiers across constructors."
  },
  {
    id: "q28",
    question: "What is the key takeaway rule for Constructor Overloading in Java?",
    options: [
      "Every overloaded constructor in a class must share the exact class name, have NO return type, and possess a unique parameter signature",
      "Every constructor must have a void return type",
      "Constructors can only take int parameters",
      "Constructors cannot use the this keyword"
    ],
    answer: "Every overloaded constructor in a class must share the exact class name, have NO return type, and possess a unique parameter signature",
    correctAnswer: 0,
    explanation: "Master Rule: Same Name + No Return Type + Unique Parameter Signature (Count, Types, or Order) = Valid Constructor Overloading.",
    explanationBn: "মূল নিয়ম: একই ক্লাসের নাম + কোনো রিটার্ন টাইপ নেই + অনন্য প্যারামিটার সিগনেচার = বৈধ কনস্ট্রাক্টর ওভারলোডিং।",
    topic: "Constructor Overloading (Multiple Initialization Strategies)",
    difficulty: "Easy",
    hint: "Same name, no return type, distinct parameter list."
  }
];

export default questions;
