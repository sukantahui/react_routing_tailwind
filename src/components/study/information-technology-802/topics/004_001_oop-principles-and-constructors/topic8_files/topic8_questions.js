const questions = [
  {
    id: "q1",
    question: "Which of the following correctly identifies all four core pillars of OOP tested in CBSE Class XII IT (802)?",
    options: [
      "Abstraction, Encapsulation, Inheritance, and Polymorphism",
      "Iteration, Selection, Sequence, and Recursion",
      "Compilation, Interpretation, Loading, and Execution",
      "Arrays, Pointers, Structures, and Unions"
    ],
    answer: "Abstraction, Encapsulation, Inheritance, and Polymorphism",
    correctAnswer: 0,
    explanation: "The four foundational pillars of Object-Oriented Programming (OOP) in Java are **Abstraction**, **Encapsulation**, **Inheritance**, and **Polymorphism**.",
    explanationBn: "সিবিএসই দ্বাদশ শ্রেণির সিলেবাস অনুযায়ী OOP এর চারটি প্রধান স্তম্ভ: অ্যাবস্ট্রাকশন, এনক্যাপসুলেশন, ইনহেরিটেন্স ও পলিমরফিজম।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Recall the standard acronym A-E-I-P."
  },
  {
    id: "q2",
    question: "In Java memory management, where does the reference variable live and where does the instantiated object reside?",
    options: [
      "Reference variable resides on the Stack; Object instance resides in Heap memory",
      "Reference variable on Heap; Object on Stack",
      "Both reside exclusively in the Metaspace",
      "Both reside in the CPU L1 Cache"
    ],
    answer: "Reference variable resides on the Stack; Object instance resides in Heap memory",
    correctAnswer: 0,
    explanation: "Local reference variables (e.g. `s1`, `acc`) live on the thread's **Stack Frame**, while the actual object body containing instance fields is allocated in dynamic **Heap Memory**.",
    explanationBn: "লোকাল পয়েন্টার বা রেফারেন্স ভ্যারিয়েবল স্ট্যাক মেমরিতে থাকে এবং 'new' দ্বারা গঠিত মূল অবজেক্টটি হিপ মেমরিতে থাকে।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Stack stores references; Heap stores actual object instances."
  },
  {
    id: "q3",
    question: "What are the three essential rules defining a Java constructor?",
    options: [
      "1. Must match class name exactly, 2. Must NOT have any return type (not even void), 3. Invoked automatically upon 'new'",
      "1. Must return void, 2. Must be static, 3. Must be private",
      "1. Must have parameters, 2. Must be abstract, 3. Must be final",
      "1. Must be written in C++, 2. Must have no name, 3. Must return int"
    ],
    answer: "1. Must match class name exactly, 2. Must NOT have any return type (not even void), 3. Invoked automatically upon 'new'",
    correctAnswer: 0,
    explanation: "Constructors must share the exact class name, have no return type specifier, and execute implicitly whenever an object is instantiated via `new`.",
    explanationBn: "কনস্ট্রাক্টরের ৩টি মূল নিয়ম: ক্লাসের নামের সমান নাম, কোনো রিটার্ন টাইপ নেই (void ও নয়), এবং new এর সাথে স্বয়ংক্রিয়ভাবে কার্যকর হয়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "The three golden rules of Java constructors."
  },
  {
    id: "q4",
    question: "What compile-time error occurs when executing 'Student s = new Student();' if the class defines ONLY 'Student(int r, String n)'?",
    options: [
      "constructor Student in class Student cannot be applied to given types: required: int, String; found: no arguments",
      "NullPointerException",
      "NoSuchMethodError",
      "ClassNotFoundException"
    ],
    answer: "constructor Student in class Student cannot be applied to given types: required: int, String; found: no arguments",
    correctAnswer: 0,
    explanation: "Defining a parameterized constructor suppresses the automatic default constructor. Invoking `new Student()` fails because no matching no-arg constructor exists.",
    explanationBn: "প্যারামিটারাইজড কনস্ট্রাক্টর লিখলে কম্পাইলারের ডিফল্ট কনস্ট্রাক্টর বাতিল হয়ে যায়; ফলে আর্গুমেন্ট ছাড়া new Student() কল করলে এরর হয়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "The compiler suppresses the default constructor once a custom one is defined."
  },
  {
    id: "q5",
    question: "How many times does the constructor execute during the statement 'Student[] batch = new Student[50];'?",
    options: [
      "0 times (Zero times)",
      "50 times",
      "1 time",
      "51 times"
    ],
    answer: "0 times (Zero times)",
    correctAnswer: 0,
    explanation: "`new Student[50]` creates an array of 50 null reference slots. It does **not** create any `Student` objects; constructors execute only when elements are instantiated individually (e.g., `batch[i] = new Student();`).",
    explanationBn: "Student[50] শুধু ৫০টি নাল রেফারেন্সের অ্যারে তৈরি করে, কোনো অবজেক্ট তৈরি হয় না; তাই কনস্ট্রাক্টর ০ বার চলে।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Hard",
    hint: "Array allocation creates reference slots, not instantiated objects."
  },
  {
    id: "q6",
    question: "What is the output of the following Java program?\n\nclass A {\n    A() {\n        System.out.print(\"Parent \");\n    }\n}\nclass B extends A {\n    B() {\n        System.out.print(\"Child \");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        B obj = new B();\n    }\n}",
    options: [
      "Parent Child ",
      "Child Parent ",
      "Child ",
      "Parent "
    ],
    answer: "Parent Child ",
    correctAnswer: 0,
    explanation: "In inheritance, the subclass constructor automatically invokes `super()` first. Thus, parent class `A` constructor runs first (`\"Parent \"`), followed by `B` constructor (`\"Child \"`).",
    explanationBn: "ইনহেরিটেন্সে সাবক্লাস কনস্ট্রাক্টর স্বয়ংক্রিয়ভাবে super() কল করে, তাই আগে 'Parent ' এবং পরে 'Child ' প্রিন্ট হবে।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Parent constructor executes before child constructor."
  },
  {
    id: "q7",
    question: "Which statement correctly describes Constructor Chaining using 'this(...)' in Java?",
    options: [
      "It allows one constructor to call another constructor in the same class and MUST be the first statement",
      "It allows a method to call a constructor",
      "It can appear anywhere inside a method body",
      "It calls all constructors simultaneously in parallel threads"
    ],
    answer: "It allows one constructor to call another constructor in the same class and MUST be the first statement",
    correctAnswer: 0,
    explanation: "`this(...)` delegates initialization to an overloaded constructor in the same class and must strictly be placed on the first line of the calling constructor.",
    explanationBn: "this(...) একই ক্লাসের অন্য ওভারলোডেড কনস্ট্রাক্টরকে কল করে এবং এটি অবশ্যই কনস্ট্রাক্টরের প্রথম লাইনে থাকতে হয়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Must be on line 1 of the constructor."
  },
  {
    id: "q8",
    question: "Case Study (Banking Application): What encapsulation design ensures that account balance cannot be set to a negative amount?",
    options: [
      "Declare 'private double balance;' and write 'public void setBalance(double b) { if (b >= 0) balance = b; }'",
      "Declare 'public double balance;' and trust users to enter positive numbers",
      "Make balance a static final constant",
      "Delete the balance variable"
    ],
    answer: "Declare 'private double balance;' and write 'public void setBalance(double b) { if (b >= 0) balance = b; }'",
    correctAnswer: 0,
    explanation: "Encapsulation prevents corrupt state: private variable + setter with conditional validation enforces that negative balances are rejected.",
    explanationBn: "ব্যালেন্সকে private করে সেটারের ভেতর if (b >= 0) শর্ত দিলে কোনো নেগেটিভ মান ডেটাবেজে ঢুকতে পারে না।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Private field with validating public setter."
  },
  {
    id: "q9",
    question: "What is the output of the following Java snippet?\n\nclass Item {\n    int price;\n    Item() {\n        this(500);\n    }\n    Item(int p) {\n        price = p;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Item i1 = new Item();\n        Item i2 = new Item(800);\n        System.out.println(i1.price + i2.price);\n    }\n}",
    options: [
      "1300",
      "1000",
      "1600",
      "Compilation error"
    ],
    answer: "1300",
    correctAnswer: 0,
    explanation: "`i1` calls `Item()` which sets `price = 500` via `this(500)`. `i2` sets `price = 800`. Sum: `500 + 800 = 1300`.",
    explanationBn: "i1 এর দাম ৫০০ এবং i2 এর দাম ৮০০; সুতরাং মোট যোগফল ৫০০ + ৮০০ = ১৩০০।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "500 + 800 = 1300."
  },
  {
    id: "q10",
    question: "Which of the following method declarations demonstrates valid Method Overloading in Java?",
    options: [
      "double calculateArea(double radius) AND double calculateArea(double length, double width)",
      "double calculateArea(double r) AND float calculateArea(double r)",
      "void calculateArea(double r) AND int calculateArea(double r)",
      "double calculateArea(double radius) AND double calculateArea(double rad)"
    ],
    answer: "double calculateArea(double radius) AND double calculateArea(double length, double width)",
    correctAnswer: 0,
    explanation: "Method Overloading requires changing the parameter count or types (`double` vs `double, double`). Changing only the return type or parameter names is invalid.",
    explanationBn: "প্যারামিটারের সংখ্যার ভিন্নতা (১টি বনাম ২টি) থাকায় এটি সম্পূর্ণ বৈধ মেথড ওভারলোডিং।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Different number of parameters."
  },
  {
    id: "q11",
    question: "What is the result of comparing two object references with '==' vs '.equals()' in Java?",
    options: [
      "'==' compares memory addresses (identity); '.equals()' can be overridden to compare logical state/content",
      "'==' compares content; '.equals()' compares memory addresses",
      "Both always compare only memory addresses",
      "Both always compare only alphabetical names"
    ],
    answer: "'==' compares memory addresses (identity); '.equals()' can be overridden to compare logical state/content",
    correctAnswer: 0,
    explanation: "`==` checks if both references point to the identical heap address. `.equals()` evaluates content equivalence when overridden in classes like `String` or custom entities.",
    explanationBn: "'==' মেমরি অ্যাড্রেস তুলনা করে; আর '.equals()' মেথড ওভাররাইড করে ভেতরের ডেটা বা বিষয়বস্তু তুলনা করা যায়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Reference equality vs State/Content equality."
  },
  {
    id: "q12",
    question: "What is the primary difference between Compile-Time and Runtime Polymorphism?",
    options: [
      "Compile-time is resolved by method/constructor overloading signatures; Runtime is resolved by method overriding via dynamic method dispatch",
      "Compile-time only works on laptops; Runtime works on phones",
      "Compile-time uses RAM; Runtime uses ROM",
      "There is no difference"
    ],
    answer: "Compile-time is resolved by method/constructor overloading signatures; Runtime is resolved by method overriding via dynamic method dispatch",
    correctAnswer: 0,
    explanation: "Compile-time polymorphism (overloading) binds method calls during javac compilation. Runtime polymorphism (overriding) dynamically selects the method version based on the actual runtime object.",
    explanationBn: "কম্পাইল-টাইম পলিমরফিজম ওভারলোডিং দিয়ে কম্পাইল সময়ে নির্ধারিত হয়; রানটাইম পলিমরফিজম ওভাররাইডিং দিয়ে রান করার সময় নির্ধারিত হয়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Static binding vs Dynamic method dispatch."
  },
  {
    id: "q13",
    question: "Case Study (School Management): In a class hierarchy 'class Teacher extends Employee', which constructor executes first when 'new Teacher()' is called?",
    options: [
      "Employee constructor executes first, then Teacher constructor body executes",
      "Teacher constructor executes first, then Employee constructor",
      "Only Teacher constructor executes",
      "Only Employee constructor executes"
    ],
    answer: "Employee constructor executes first, then Teacher constructor body executes",
    correctAnswer: 0,
    explanation: "In Java inheritance, construction is hierarchical from superclass to subclass: the `Employee` constructor completes before the `Teacher` constructor runs.",
    explanationBn: "ইনহেরিটেন্সে প্যারেন্ট ক্লাস (Employee) কনস্ট্রাক্টরের কাজ আগে শেষ হয়, তারপর চাইল্ড ক্লাস (Teacher) কনস্ট্রাক্টর কাজ করে।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Superclass builds base state before subclass runs."
  },
  {
    id: "q14",
    question: "Why cannot a Java constructor be declared with the 'abstract' keyword?",
    options: [
      "Because constructors must initialize the object state directly and cannot be overridden by subclasses",
      "Because abstract is only for HTML tags",
      "Because constructors must return double",
      "Because Java 8 deprecated abstract constructors"
    ],
    answer: "Because constructors must initialize the object state directly and cannot be overridden by subclasses",
    correctAnswer: 0,
    explanation: "`abstract` requires a subclass to provide an overriding implementation. Since constructors are never inherited or overridden, an abstract constructor is conceptually impossible.",
    explanationBn: "কনস্ট্রাক্টর কখনো ইনহেরিট বা ওভাররাইড হয় না, তাই একে abstract ঘোষণা করা অর্থহীন ও অবৈধ।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Constructors cannot be overridden."
  },
  {
    id: "q15",
    question: "What is the output of the following Java code?\n\nclass Sample {\n    static int count = 0;\n    Sample() {\n        count++;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Sample s1 = new Sample();\n        Sample s2 = new Sample();\n        Sample s3 = new Sample();\n        Sample s4 = null;\n        System.out.println(Sample.count);\n    }\n}",
    options: [
      "3",
      "4",
      "0",
      "NullPointerException"
    ],
    answer: "3",
    correctAnswer: 0,
    explanation: "`new Sample()` was evaluated 3 times (`s1, s2, s3`). `s4` is merely declared and assigned `null` without `new`, so `count` increments 3 times to `3`.",
    explanationBn: "new অপারেটর ৩ বার চলায় কনস্ট্রাক্টর ৩ বার চলেছে; s4 = null কোনো অবজেক্ট তৈরি না করায় count এর চূড়ান্ত মান ৩।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Declaring null does not invoke any constructor."
  },
  {
    id: "q16",
    question: "Which of the following correctly creates an Anonymous Object and calls its 'display()' method?",
    options: [
      "new Student().display();",
      "Student.display();",
      "anonymous Student.display();",
      "create Student().display();"
    ],
    answer: "new Student().display();",
    correctAnswer: 0,
    explanation: "`new Student().display()` creates an unnamed object on the heap, invokes its `display()` method, and leaves the object eligible for garbage collection.",
    explanationBn: "new Student().display(); কোনো ভ্যারিয়েবলে রেফারেন্স সংরক্ষণ না করেই সরাসরি অ্যানোনিমাস অবজেক্ট থেকে মেথড কল করে।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Instantiate with new and immediately chain method call."
  },
  {
    id: "q17",
    question: "What is the purpose of the 'super' keyword when used inside a subclass method like 'super.show();'?",
    options: [
      "To explicitly invoke the overridden version of 'show()' defined in the superclass",
      "To restart the JVM",
      "To delete the subclass",
      "To create a supercomputer thread"
    ],
    answer: "To explicitly invoke the overridden version of 'show()' defined in the superclass",
    correctAnswer: 0,
    explanation: "`super.methodName()` allows a subclass to invoke the parent class version of a method that has been overridden in the child class.",
    explanationBn: "super.show() দিয়ে চাইল্ড ক্লাসের ভেতর থেকে প্যারেন্ট ক্লাসের ওভাররাইড হওয়া মেথডটি কার্যকর করা যায়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Calls the parent version of an overridden method."
  },
  {
    id: "q18",
    question: "Case Study (E-Commerce): How does a Product class prevent negative quantities from being ordered?",
    options: [
      "By marking 'private int quantity;' and implementing 'public void setQuantity(int q) { if (q >= 1) quantity = q; }'",
      "By setting price to ₹0",
      "By disabling the internet connection",
      "By making the class abstract"
    ],
    answer: "By marking 'private int quantity;' and implementing 'public void setQuantity(int q) { if (q >= 1) quantity = q; }'",
    correctAnswer: 0,
    explanation: "Encapsulation through a validated setter guarantees that quantities below 1 are rejected, preserving data integrity in checkout orders.",
    explanationBn: "পরিমাণকে private করে সেটারে if (q >= 1) শর্ত দিলে কোনো ঋণাত্মক বা শূন্য অর্ডার সিস্টেমে ঢুকতে পারবে না।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Validated setter prevents invalid quantities."
  },
  {
    id: "q19",
    question: "What happens if a method is declared as 'public void Student()' inside 'class Student'?",
    options: [
      "It is treated as a regular METHOD, not a constructor; it will NOT execute automatically on 'new Student()'",
      "It is an invalid syntax that will not compile",
      "It executes automatically twice",
      "It makes the class abstract"
    ],
    answer: "It is treated as a regular METHOD, not a constructor; it will NOT execute automatically on 'new Student()'",
    correctAnswer: 0,
    explanation: "The presence of a return type (`void`) classifies it as a regular member method rather than a constructor. It will not run upon `new Student()`.",
    explanationBn: "void লেখার কারণে এটি সাধারণ মেথড গণ্য হবে এবং অবজেক্ট তৈরির সময় স্বয়ংক্রিয়ভাবে চলবে না।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Return type demotes constructor to a method."
  },
  {
    id: "q20",
    question: "Which of the following statements about Garbage Collection in Java is TRUE?",
    options: [
      "Garbage collection runs automatically in the background to reclaim memory occupied by unreferenced heap objects",
      "Programmers must write manual delete statements for every object like in C++",
      "Garbage collection deletes .java source files from disk",
      "Objects on the stack are cleaned by the garbage collector"
    ],
    answer: "Garbage collection runs automatically in the background to reclaim memory occupied by unreferenced heap objects",
    correctAnswer: 0,
    explanation: "Java features automatic garbage collection: the JVM daemon thread periodically frees heap memory used by objects with zero active references.",
    explanationBn: "জাভাতে কোনো অবজেক্টের রেফারেন্স হারিয়ে গেলে ব্যাকগ্রাউন্ডের অটোমেটিক গার্বেজ কালেক্টর স্বয়ংক্রিয়ভাবে সেই মেমরি খালি করে।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Automatic background memory reclamation."
  },
  {
    id: "q21",
    question: "What is the difference between Method Overloading and Method Overriding?",
    options: [
      "Overloading occurs in the same class with different signatures (compile-time); Overriding occurs in a subclass with identical signatures (runtime)",
      "Overloading is runtime; Overriding is compile-time",
      "Overloading requires extends; Overriding does not",
      "There is no difference"
    ],
    answer: "Overloading occurs in the same class with different signatures (compile-time); Overriding occurs in a subclass with identical signatures (runtime)",
    correctAnswer: 0,
    explanation: "**Overloading** = Same class, same name, different parameters (Static binding). **Overriding** = Parent-child classes, identical signature and return type (Dynamic dispatch).",
    explanationBn: "ওভারলোডিং একই ক্লাসে ভিন্ন সিগনেচারে ঘটে (কম্পাইল-টাইম); ওভাররাইডিং চাইল্ড ক্লাসে হুবহু একই সিগনেচারে ঘটে (রানটাইম)।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Same class different params vs subclass identical params."
  },
  {
    id: "q22",
    question: "Can an abstract class have both concrete (implemented) methods and abstract methods?",
    options: [
      "Yes, an abstract class can contain both concrete methods with bodies and abstract methods without bodies",
      "No, all methods in an abstract class must be abstract",
      "No, abstract classes cannot have methods",
      "Only static methods can have bodies"
    ],
    answer: "Yes, an abstract class can contain both concrete methods with bodies and abstract methods without bodies",
    correctAnswer: 0,
    explanation: "Unlike pure interfaces (pre-Java 8), abstract classes can combine fully implemented concrete methods (shared logic) with abstract methods (custom logic).",
    explanationBn: "হ্যাঁ, অ্যাবস্ট্রাক্ট ক্লাসে বডি বিশিষ্ট সাধারণ মেথড এবং বডি ছাড়া অ্যাবস্ট্রাক্ট মেথড উভয়ই থাকতে পারে।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Supports a mix of implemented and abstract methods."
  },
  {
    id: "q23",
    question: "What is the output of the following Java program?\n\nclass Test {\n    int a, b;\n    Test() {\n        this(10, 20);\n    }\n    Test(int x, int y) {\n        a = x;\n        b = y;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Test t = new Test();\n        System.out.println(t.a + \", \" + t.b);\n    }\n}",
    options: [
      "10, 20",
      "0, 0",
      "20, 10",
      "Compilation error"
    ],
    answer: "10, 20",
    correctAnswer: 0,
    explanation: "`new Test()` calls the no-arg constructor which delegates to `Test(10, 20)`, setting `a = 10` and `b = 20`. Result is `10, 20`.",
    explanationBn: "নো-আর্গুমেন্ট কনস্ট্রাক্টর this(10, 20) দিয়ে প্যারামিটারাইজড কনস্ট্রাক্টর কল করে a=10 ও b=20 করে; আউটপুট '10, 20'।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "this(10, 20) sets a=10 and b=20."
  },
  {
    id: "q24",
    question: "Which of the following best describes the 'is-a' relationship vs the 'has-a' relationship in Java software engineering?",
    options: [
      "'is-a' is implemented via Inheritance (extends); 'has-a' is implemented via Composition/Aggregation (instance variables)",
      "'is-a' uses interfaces; 'has-a' uses static variables",
      "'is-a' is only in C++; 'has-a' is only in Java",
      "Both are identical concepts"
    ],
    answer: "'is-a' is implemented via Inheritance (extends); 'has-a' is implemented via Composition/Aggregation (instance variables)",
    correctAnswer: 0,
    explanation: "**`is-a`** (Inheritance): `Car extends Vehicle`. **`has-a`** (Composition): `Car` has an `Engine` field inside it.",
    explanationBn: "'is-a' সম্পর্ক ইনহেরিটেন্স (extends) দিয়ে তৈরি হয়; আর 'has-a' সম্পর্ক ক্লাসের ভেতর অন্য অবজেক্টকে ফিল্ড হিসেবে রেখে (কম্পোজিশন) তৈরি হয়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Medium",
    hint: "Inheritance vs Composition."
  },
  {
    id: "q25",
    question: "What is the primary role of the 'final' keyword when applied to a class?",
    options: [
      "It prevents the class from being extended (subclassed) by any other class",
      "It prevents the class from being instantiated",
      "It deletes the class at program end",
      "It makes all methods abstract"
    ],
    answer: "It prevents the class from being extended (subclassed) by any other class",
    correctAnswer: 0,
    explanation: "Declaring `public final class Math` prevents any other class from inheriting from it, locking its architecture and safeguarding security.",
    explanationBn: "কোনো ক্লাসকে 'final' ঘোষণা করলে অন্য কোনো ক্লাস তাকে ইনহেরিট করতে পারে না।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Prevents inheritance."
  },
  {
    id: "q26",
    question: "In CBSE Class XII IT 802, what is the default value of an uninitialized instance variable of reference type (e.g. String or custom object)?",
    options: [
      "null",
      "0",
      "\"\"",
      "undefined"
    ],
    answer: "null",
    correctAnswer: 0,
    explanation: "All uninitialized reference variables on the heap default to **`null`**.",
    explanationBn: "হিপ মেমরিতে থাকা যেকোনো অবজেক্ট রেফারেন্স বা স্ট্রিং ভ্যারিয়েবলের ডিফল্ট মান হলো 'null'।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Reference types default to null."
  },
  {
    id: "q27",
    question: "Why should developers favor Encapsulation and Data Hiding over global public variables?",
    options: [
      "Because encapsulation prevents unauthorized state corruption, allows validation rules, reduces coupling, and enhances system security",
      "Because encapsulation allows code to run without memory",
      "Because public variables cause hardware fires",
      "Because public variables cannot be used in loops"
    ],
    answer: "Because encapsulation prevents unauthorized state corruption, allows validation rules, reduces coupling, and enhances system security",
    correctAnswer: 0,
    explanation: "Encapsulation creates robust, modular software by keeping data private and enforcing business validation through well-defined public accessors.",
    explanationBn: "এনক্যাপসুলেশন ডেটা বিকৃতি রোধ করে, ভ্যালিডেশন নিশ্চিত করে এবং সিস্টেমের নির্ভরযোগ্যতা ও নিরাপত্তা বহুগুণ বাড়িয়ে দেয়।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Data protection, validation, and modularity."
  },
  {
    id: "q28",
    question: "Master Summary for Module 004_001: Which formula captures the complete lifecycle and design philosophy of Java OOP & Constructors?",
    options: [
      "Class (Blueprint) -> new (Heap Allocation) -> Constructor (Automatic State Initialization) -> Encapsulation (Private State + Public Validation)",
      "Source Code -> Machine Code -> Manual Memory Free",
      "Variables -> Functions -> Global Access",
      "HTML -> CSS -> JavaScript"
    ],
    answer: "Class (Blueprint) -> new (Heap Allocation) -> Constructor (Automatic State Initialization) -> Encapsulation (Private State + Public Validation)",
    correctAnswer: 0,
    explanation: "The complete OOP lifecycle in Java: Classes define blueprints, `new` allocates memory, Constructors safely configure initial state, and Encapsulation guards ongoing object integrity.",
    explanationBn: "সম্পূর্ণ জীবনচক্র: ক্লাস (নকশা) -> new (হিপ মেমরি বরাদ্দ) -> কনস্ট্রাক্টর (স্বয়ংক্রিয় প্রারম্ভিক মান) -> এনক্যাপসুলেশন (নিরাপদ সুরক্ষা)।",
    topic: "Comprehensive Module Review, Diagnostic Test & Real-World Case Studies",
    difficulty: "Easy",
    hint: "Blueprint -> Allocation -> Initialization -> Protection."
  }
];

export default questions;
