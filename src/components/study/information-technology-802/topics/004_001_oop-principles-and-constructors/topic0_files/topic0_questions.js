const questions = [
  {
    id: "q1",
    question: "What are the four foundational pillars of Object-Oriented Programming (OOP) in Java?",
    options: [
      "Abstraction, Encapsulation, Inheritance, and Polymorphism",
      "Compilation, Interpretation, Linking, and Loading",
      "Sequencing, Selection, Iteration, and Recursion",
      "Variables, Arrays, Loops, and Functions"
    ],
    answer: "Abstraction, Encapsulation, Inheritance, and Polymorphism",
    correctAnswer: 0,
    explanation: "The four core pillars of Object-Oriented Programming (OOP) are **Abstraction** (hiding complexity), **Encapsulation** (bundling data and methods while restricting direct access), **Inheritance** (reusing code across parent-child hierarchies), and **Polymorphism** (allowing one interface or entity to exhibit multiple behaviors).",
    explanationBn: "অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিংয়ের (OOP) চারটি মূল স্তম্ভ হলো: অ্যাবস্ট্রাকশন, এনক্যাপসুলেশন, ইনহেরিটেন্স এবং পলিমরফিজম।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Recall the standard acronym A-E-I-P."
  },
  {
    id: "q2",
    question: "Which OOP principle focuses on showing only essential features of an entity while hiding complex background implementation details?",
    options: [
      "Abstraction",
      "Encapsulation",
      "Inheritance",
      "Polymorphism"
    ],
    answer: "Abstraction",
    correctAnswer: 0,
    explanation: "**Abstraction** represents the conceptual design of presenting only relevant, essential characteristics to the user (such as a car's steering wheel or brake pedal) while concealing the internal combustion or hydraulic mechanics.",
    explanationBn: "অ্যাবস্ট্রাকশন (Abstraction) হলো জটিল ভেতরের কার্যাবলী আড়াল করে শুধুমাত্র প্রয়োজনীয় তথ্য ও ইন্টারফেস প্রদর্শন করার নীতি।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Focuses on 'what' an object does rather than 'how' it does it internally."
  },
  {
    id: "q3",
    question: "Which OOP principle is implemented by binding variables and methods into a class and declaring variables 'private'?",
    options: [
      "Encapsulation",
      "Abstraction",
      "Inheritance",
      "Polymorphism"
    ],
    answer: "Encapsulation",
    correctAnswer: 0,
    explanation: "**Encapsulation** wraps fields and functions into a single capsule (a class) and enforces data hiding by restricting direct field modification from external classes using `private` access modifiers and `public` getter/setter methods.",
    explanationBn: "এনক্যাপসুলেশন (Encapsulation) ডেটা এবং মেথডগুলোকে একটি ক্লাসে আবদ্ধ করে এবং private কিওয়ার্ডের সাহায্যে ডেটা গোপন রাখে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Think of a protective medicine capsule protecting its contents."
  },
  {
    id: "q4",
    question: "Which Java keyword is used by a child class to inherit fields and methods from a parent class?",
    options: [
      "extends",
      "implements",
      "inherits",
      "super"
    ],
    answer: "extends",
    correctAnswer: 0,
    explanation: "In Java, a subclass establishes an 'is-a' inheritance relationship with a parent class using the **`extends`** keyword (e.g. `class Teacher extends Employee`).",
    explanationBn: "জাভাতে একটি চাইল্ড ক্লাস প্যারেন্ট ক্লাসের বৈশিষ্ট্য ইনহেরিট করার জন্য 'extends' কিওয়ার্ড ব্যবহার করে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Keyword that 'extends' the functionality of a superclass."
  },
  {
    id: "q5",
    question: "What is Polymorphism in Java?",
    options: [
      "The ability of an entity (method, object, or operator) to take on multiple forms and behaviors depending on context",
      "The process of converting Java source code into bytecode",
      "The mechanism of compressing .jar archive files",
      "The technique of allocating virtual RAM in the JVM"
    ],
    answer: "The ability of an entity (method, object, or operator) to take on multiple forms and behaviors depending on context",
    correctAnswer: 0,
    explanation: "**Polymorphism** (from Greek 'many forms') allows the same method name to perform different tasks based on the calling context, such as Method Overloading (compile-time) and Method Overriding (runtime).",
    explanationBn: "পলিমরফিজম হলো একই মেথড বা সত্তা ভিন্ন ভিন্ন পরিস্থিতিতে ভিন্ন রূপ ও আচরণ প্রদর্শন করার ক্ষমতা।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Poly = many, morph = form."
  },
  {
    id: "q6",
    question: "Which of the following is an example of Compile-Time Polymorphism in Java?",
    options: [
      "Method Overloading and Constructor Overloading",
      "Method Overriding with dynamic dispatch",
      "Garbage collection of orphaned objects",
      "Importing external packages"
    ],
    answer: "Method Overloading and Constructor Overloading",
    correctAnswer: 0,
    explanation: "**Method Overloading** (defining multiple methods with the same name but different parameter signatures) is resolved by the compiler at compile-time, representing static/compile-time polymorphism.",
    explanationBn: "মেথড ওভারলোডিং কম্পাইল টাইমে নির্ধারিত হয়, তাই এটি কম্পাইল-টাইম (স্ট্যাটিক) পলিমরফিজমের উদাহরণ।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Resolved before the program actually executes."
  },
  {
    id: "q7",
    question: "Which of the following is an example of Runtime Polymorphism in Java?",
    options: [
      "Method Overriding via Dynamic Method Dispatch",
      "Method Overloading with different argument count",
      "Defining static constants with final keyword",
      "Declaring integer primitive variables"
    ],
    answer: "Method Overriding via Dynamic Method Dispatch",
    correctAnswer: 0,
    explanation: "**Method Overriding** (where a subclass provides a specific implementation of a method defined in its superclass) is resolved dynamically at runtime based on the actual object instance type on the heap.",
    explanationBn: "মেথড ওভাররাইডিং রানটাইমে ডায়নামিক মেথড ডিসপ্যাচের মাধ্যমে অবজেক্ট অনুযায়ী সঠিক মেথড কল করে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "A child class provides its own custom version of a parent method."
  },
  {
    id: "q8",
    question: "What is the primary difference between Abstraction and Encapsulation?",
    options: [
      "Abstraction focuses on hiding implementation complexity; Encapsulation focuses on data security and data hiding",
      "Abstraction uses private variables; Encapsulation uses abstract methods",
      "Abstraction only works in C++; Encapsulation only works in Java",
      "There is no difference; they are exact synonyms"
    ],
    answer: "Abstraction focuses on hiding implementation complexity; Encapsulation focuses on data security and data hiding",
    correctAnswer: 0,
    explanation: "Abstraction solves the problem at the design level (**'what'** an object does from outside), while Encapsulation solves the problem at the implementation level (**'how'** to package data and protect internal fields from unauthorized access).",
    explanationBn: "অ্যাবস্ট্রাকশন সিস্টেমের জটিলতা লুকায় (What to do), আর এনক্যাপসুলেশন ডেটা নিরাপত্তা ও নিয়ন্ত্রণ নিশ্চিত করে (How to bind & protect).",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Hard",
    hint: "Complexity hiding vs Data protection."
  },
  {
    id: "q9",
    question: "Why does Java NOT support Multiple Inheritance of classes (e.g. 'class C extends A, B')?",
    options: [
      "To avoid ambiguity caused by the Diamond Problem (conflicting method implementations from multiple parents)",
      "Because computer hard drives cannot store two parent classes",
      "Because the Java compiler only allows 10 lines of code per file",
      "Because CPU registers cannot handle two inheritance trees"
    ],
    answer: "To avoid ambiguity caused by the Diamond Problem (conflicting method implementations from multiple parents)",
    correctAnswer: 0,
    explanation: "Multiple class inheritance leads to the **Diamond Problem**—if classes A and B define the same method and C inherits from both, the compiler cannot know which parent method to execute. Java resolves this by supporting multiple inheritance only through **Interfaces**.",
    explanationBn: "ডায়মন্ড সমস্যার কারণে তৈরি হওয়া বিভ্রান্তি দূর করতে জাভাতে ক্লাসের একাধিক ইনহেরিটেন্স নিষিদ্ধ, তবে ইন্টারফেসের মাধ্যমে এটি করা যায়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Hard",
    hint: "Think about the famous 'Diamond Problem' in OOP."
  },
  {
    id: "q10",
    question: "In OOP terminology, what type of relationship is represented by Inheritance?",
    options: [
      "'IS-A' relationship (e.g. A Car IS-A Vehicle)",
      "'HAS-A' relationship (e.g. A Car HAS-A Engine)",
      "'USES-A' relationship",
      "'DEPENDS-ON' relationship"
    ],
    answer: "'IS-A' relationship (e.g. A Car IS-A Vehicle)",
    correctAnswer: 0,
    explanation: "Inheritance models an **'IS-A'** relationship where the subclass is a specialized kind of the superclass (e.g., `Dog IS-A Animal`). In contrast, Composition/Aggregation models a **'HAS-A'** relationship.",
    explanationBn: "ইনহেরিটেন্স একটি 'IS-A' সম্পর্ক তৈরি করে (যেমন: Car IS-A Vehicle)।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "A Teacher IS-AN Employee."
  },
  {
    id: "q11",
    question: "What type of relationship is represented when a 'Student' class contains an instance variable of type 'Address'?",
    options: [
      "'HAS-A' relationship (Composition / Aggregation)",
      "'IS-A' relationship (Inheritance)",
      "'EXTENDS-A' relationship",
      "'RUNS-A' relationship"
    ],
    answer: "'HAS-A' relationship (Composition / Aggregation)",
    correctAnswer: 0,
    explanation: "When a class contains a reference to another class as a member field, it establishes a **'HAS-A' relationship** (Aggregation/Composition), meaning a Student *has an* Address.",
    explanationBn: "যখন একটি ক্লাসের ভেতর অন্য ক্লাসের অবজেক্ট ফিল্ড হিসেবে থাকে, তখন তাকে 'HAS-A' (কম্পোজিশন/অ্যাগ্রিগেশন) সম্পর্ক বলা হয়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "A student possesses/contains an address."
  },
  {
    id: "q12",
    question: "Which access modifier provides the highest level of data encapsulation (maximum restriction) in Java?",
    options: [
      "private",
      "default (package-private)",
      "protected",
      "public"
    ],
    answer: "private",
    correctAnswer: 0,
    explanation: "The **`private`** modifier ensures that variables and methods can ONLY be accessed from within the same enclosing class body, offering maximum encapsulation and security against outside tampering.",
    explanationBn: "'private' অ্যাক্সেস মডিফায়ার সর্বোচ্চ ডেটা সুরক্ষা প্রদান করে; এই ফিল্ডগুলো শুধুমাত্র একই ক্লাসের ভেতর থেকেই অ্যাক্সেস করা যায়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Visible only within the declaring class."
  },
  {
    id: "q13",
    question: "What is an Abstract Class in Java?",
    options: [
      "A class declared with the 'abstract' keyword that cannot be directly instantiated with 'new'",
      "A class that cannot have any subclasses",
      "A class that contains only static variables",
      "A class with no name"
    ],
    answer: "A class declared with the 'abstract' keyword that cannot be directly instantiated with 'new'",
    correctAnswer: 0,
    explanation: "An **abstract class** serves as a generic blueprint defining common properties and abstract method signatures. It **cannot be instantiated directly** using `new`; it must be extended by concrete subclasses.",
    explanationBn: "অ্যাবস্ট্রাক্ট ক্লাস হলো এমন একটি ক্লাস যাকে সরাসরি 'new' দিয়ে অবজেক্ট তৈরি করা যায় না; এটি চাইল্ড ক্লাসের মাধ্যমে বাস্তবায়িত হয়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Direct instantiation is blocked by the JVM."
  },
  {
    id: "q14",
    question: "Can an abstract class have constructors in Java?",
    options: [
      "Yes, it can have constructors which are invoked by subclass constructors via super()",
      "No, abstract classes are strictly forbidden from defining constructors",
      "Only if all instance methods are declared static",
      "Only if the constructor is private"
    ],
    answer: "Yes, it can have constructors which are invoked by subclass constructors via super()",
    correctAnswer: 0,
    explanation: "Even though an abstract class cannot be instantiated on its own, it **can define constructors** to initialize its instance variables when a concrete subclass instance is created via `super()`.",
    explanationBn: "হ্যাঁ, অ্যাবস্ট্রাক্ট ক্লাসে কনস্ট্রাক্টর থাকতে পারে, যা চাইল্ড ক্লাসের অবজেক্ট তৈরির সময় super() এর মাধ্যমে কল হয়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Hard",
    hint: "Subclasses need to initialize inherited parent fields."
  },
  {
    id: "q15",
    question: "What is an Interface in Java OOP?",
    options: [
      "A complete contract containing abstract method specifications that classes implement using the 'implements' keyword",
      "A graphical dialog box created in Swing",
      "A database table containing SQL keys",
      "A hardware socket on the motherboard"
    ],
    answer: "A complete contract containing abstract method specifications that classes implement using the 'implements' keyword",
    correctAnswer: 0,
    explanation: "In Java, an **interface** is a reference type representing 100% abstract contract of behavior (by default, methods are `public abstract`). A class provides concrete implementation using the `implements` keyword.",
    explanationBn: "ইন্টারফেস হলো মেথডের একটি বিশুদ্ধ ব্লুপ্রিন্ট বা চুক্তি, যা ক্লাসগুলো 'implements' কিওয়ার্ড দিয়ে সম্পূর্ণ করে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Classes 'extend' classes, but 'implement' interfaces."
  },
  {
    id: "q16",
    question: "Consider: 'class Bird { void fly() { ... } }' and 'class Penguin extends Bird { void fly() { ... } }'. Which OOP principle is demonstrated by Penguin's fly() method?",
    options: [
      "Method Overriding (Runtime Polymorphism)",
      "Method Overloading (Compile-Time Polymorphism)",
      "Data Abstraction only",
      "Encapsulation failure"
    ],
    answer: "Method Overriding (Runtime Polymorphism)",
    correctAnswer: 0,
    explanation: "When a child class (`Penguin`) defines a method with the identical name, return type, and parameter list as its parent class (`Bird`), it is **overriding** the superclass implementation to provide specific behavior.",
    explanationBn: "চাইল্ড ক্লাস যখন প্যারেন্ট ক্লাসের মেথডকে হুবহু একই সিগনেচারে নতুনভাবে সংজ্ঞায়িত করে, তখন তাকে মেথড ওভাররাইডিং বলে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Redefining a parent class method in a child class."
  },
  {
    id: "q17",
    question: "Which of the following method signatures represents valid Method Overloading for 'void print(int x)' in the same class?",
    options: [
      "void print(double x)",
      "int print(int x)",
      "void print(int a)",
      "public void print(int x)"
    ],
    answer: "void print(double x)",
    correctAnswer: 0,
    explanation: "Method overloading requires changing the **parameter count, parameter data types, or parameter order**. Simply changing the return type or parameter variable name (`int a`) does NOT constitute overloading and produces a duplicate method error.",
    explanationBn: "মেথড ওভারলোডিংয়ের জন্য প্যারামিটারের টাইপ বা সংখ্যা পরিবর্তন করতে হয়; শুধু রিটার্ন টাইপ পরিবর্তন করলে এরর হয়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Hard",
    hint: "Look for a different parameter data type."
  },
  {
    id: "q18",
    question: "What is the ultimate root superclass of every class in Java's class hierarchy?",
    options: [
      "java.lang.Object",
      "java.lang.Class",
      "java.lang.System",
      "java.lang.Main"
    ],
    answer: "java.lang.Object",
    correctAnswer: 0,
    explanation: "In Java, every single class directly or indirectly inherits from **`java.lang.Object`**, making it the root parent of all reference types in the language.",
    explanationBn: "জাভাতে প্রতিটি ক্লাস প্রত্যক্ষ বা পরোক্ষভাবে 'java.lang.Object' ক্লাস থেকে উত্তরাধিকার লাভ করে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "The grand ancestor of all Java classes."
  },
  {
    id: "q19",
    question: "What key benefit does Inheritance provide in large-scale software applications?",
    options: [
      "Code Reusability and reduction of redundant duplicate code",
      "Elimination of all RAM requirements",
      "Automatic generation of SQL database tables",
      "Conversion of Java code into Python script"
    ],
    answer: "Code Reusability and reduction of redundant duplicate code",
    correctAnswer: 0,
    explanation: "Inheritance enables **code reusability**: common attributes and methods are written once in a superclass, eliminating redundant boilerplate across multiple specialized child classes.",
    explanationBn: "ইনহেরিটেন্সের প্রধান সুবিধা হলো কোডের পুনঃব্যবহারযোগ্যতা (Code Reusability), যা কোডের পুনরাবৃত্তি কমায়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Write once in superclass, reuse across all subclasses."
  },
  {
    id: "q20",
    question: "How does Encapsulation protect an object's internal state from illegal values (e.g. setting age = -25)?",
    options: [
      "By funneling modifications through setter methods that enforce validation checks (e.g. 'if (a > 0) age = a;')",
      "By preventing the program from running on Windows",
      "By encrypting the source code on disk",
      "By disabling keyboard input"
    ],
    answer: "By funneling modifications through setter methods that enforce validation checks (e.g. 'if (a > 0) age = a;')",
    correctAnswer: 0,
    explanation: "Because variables are declared `private`, client code must use public setter methods. Inside the setter, conditional logic validates the input and rejects corrupted or illegal values.",
    explanationBn: "এনক্যাপসুলেশনে private ভ্যারিয়েবল থাকায় পাবলিক সেটার মেথডে শর্ত (Validation) দিয়ে ভুল ডেটা প্রবেশ ঠেকানো যায়।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Setters act as vigilant security guards for data."
  },
  {
    id: "q21",
    question: "Which of the following features is characteristic of Procedural Programming (like C) but NOT Object-Oriented Programming (like Java)?",
    options: [
      "Global data is unprotected and functions freely manipulate global variables without data hiding",
      "Encapsulation of data within classes",
      "Inheritance of properties across classes",
      "Polymorphic method dispatch"
    ],
    answer: "Global data is unprotected and functions freely manipulate global variables without data hiding",
    correctAnswer: 0,
    explanation: "In Procedural Programming, programs are divided into functions that freely manipulate global data structures without encapsulation, leading to high vulnerability and difficult debugging.",
    explanationBn: "প্রসিডিউরাল প্রোগ্রামিংয়ে গ্লোবাল ডেটা অরক্ষিত থাকে এবং যেকোনো ফাংশন সরাসরি ডেটা পরিবর্তন করতে পারে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Functions vs Objects with private states."
  },
  {
    id: "q22",
    question: "What is 'Coupling' in OOP software engineering, and what is the recommended design practice?",
    options: [
      "Coupling measures the degree of dependency between classes; Loose Coupling is recommended",
      "Coupling measures the number of lines of code; Tight Coupling is recommended",
      "Coupling is the speed of the CPU clock",
      "Coupling is the number of USB ports connected"
    ],
    answer: "Coupling measures the degree of dependency between classes; Loose Coupling is recommended",
    correctAnswer: 0,
    explanation: "**Coupling** refers to how strongly interconnected classes are. Encapsulation and interfaces promote **Loose Coupling**, meaning changing one class does not unpredictably break other classes.",
    explanationBn: "কাপলিং হলো ক্লাসগুলোর মধ্যে পারস্পরিক নির্ভরতার মাত্রা; উন্নত সফটওয়্যারে লুজ কাপলিং (Loose Coupling) কাম্য।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Hard",
    hint: "Low dependency makes systems robust and flexible."
  },
  {
    id: "q23",
    question: "What is 'Cohesion' in class design, and why is High Cohesion desirable?",
    options: [
      "Cohesion measures how focused a class is on a single, well-defined responsibility; High Cohesion ensures clean maintainability",
      "Cohesion measures how many different files are in a folder",
      "Cohesion is the process of deleting unused variables",
      "Cohesion only applies to network databases"
    ],
    answer: "Cohesion measures how focused a class is on a single, well-defined responsibility; High Cohesion ensures clean maintainability",
    correctAnswer: 0,
    explanation: "**Cohesion** evaluates the single-responsibility focus of a class. High Cohesion means all methods and variables in a class work together towards one clear, coherent objective (e.g. `InvoicePrinter`).",
    explanationBn: "কোহিশন হলো একটি ক্লাসের নির্দিষ্ট দায়িত্ব পালনের একাগ্রতা; হাই কোহিশন (High Cohesion) কোডকে পরিষ্কার ও নির্ভরযোগ্য করে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Hard",
    hint: "A class should do one thing and do it exceptionally well."
  },
  {
    id: "q24",
    question: "Which keyword in Java prevents a class from being inherited by any subclass?",
    options: [
      "final",
      "static",
      "abstract",
      "private"
    ],
    answer: "final",
    correctAnswer: 0,
    explanation: "Declaring a class as **`final`** (e.g. `public final class MathHelper`) forbids other classes from extending it, effectively locking the inheritance hierarchy.",
    explanationBn: "কোনো ক্লাসকে 'final' ঘোষণা করলে অন্য কোনো ক্লাস তাকে ইনহেরিট (extend) করতে পারে না।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Final means no further modification or extension."
  },
  {
    id: "q25",
    question: "Can a Java method be declared with both 'abstract' and 'final' keywords simultaneously?",
    options: [
      "No, because abstract requires a subclass to override it, whereas final strictly forbids overriding (contradiction)",
      "Yes, for all public methods",
      "Yes, if the method returns void",
      "Only in abstract classes with zero fields"
    ],
    answer: "No, because abstract requires a subclass to override it, whereas final strictly forbids overriding (contradiction)",
    correctAnswer: 0,
    explanation: "Combining `abstract` and `final` is a fatal contradiction: `abstract` mandates subclass overriding, while `final` bans overriding. The Java compiler generates a compile-time error: `illegal combination of modifiers: abstract and final`.",
    explanationBn: "'abstract' মানে চাইল্ড ক্লাসে ওভাররাইড করতে হবে, আর 'final' মানে ওভাররাইড নিষিদ্ধ; তাই এদের একসাথে ব্যবহার অবৈধ।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Hard",
    hint: "Opposite keywords that contradict each other."
  },
  {
    id: "q26",
    question: "What is an 'is-a' test in OOP class design?",
    options: [
      "A conceptual sanity check to verify if a child class is genuinely a specialized subtype of the parent class (e.g. 'Dog is an Animal')",
      "A database query to search for null records",
      "An automated unit test that checks CPU memory speed",
      "A compiler check for semicolons"
    ],
    answer: "A conceptual sanity check to verify if a child class is genuinely a specialized subtype of the parent class (e.g. 'Dog is an Animal')",
    correctAnswer: 0,
    explanation: "The 'is-a' test ensures that inheritance is used logically and accurately: if the phrase '[Subclass] is a [Superclass]' sounds natural (e.g., 'SavingsAccount is a BankAccount'), inheritance is appropriate.",
    explanationBn: "'is-a' টেস্ট দিয়ে যাচাই করা হয় যে চাইল্ড ক্লাসটি আসলেই প্যারেন্ট ক্লাসের একটি যৌক্তিক রূপ কিনা।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Used to determine if inheritance should be applied."
  },
  {
    id: "q27",
    question: "Which OOP concept is directly demonstrated by the '@Override' annotation in Java code?",
    options: [
      "Runtime Polymorphism (Method Overriding)",
      "Data Abstraction only",
      "Compile-time macro expansion",
      "Garbage collection instruction"
    ],
    answer: "Runtime Polymorphism (Method Overriding)",
    correctAnswer: 0,
    explanation: "The `@Override` annotation instructs the compiler to verify that the annotated method is correctly overriding a parent class method with the identical signature, preventing subtle typos in method names.",
    explanationBn: "'@Override' অ্যানোটেশনটি রানটাইম পলিমরফিজমের অংশ হিসেবে চাইল্ড ক্লাসে প্যারেন্ট মেথড প্রতিস্থাপন নিশ্চিত করে।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Medium",
    hint: "Explicit marker for overridden methods."
  },
  {
    id: "q28",
    question: "Why is Object-Oriented Programming considered superior to Procedural Programming for developing modern enterprise software?",
    options: [
      "Because OOP provides modularity, easy maintenance, code reusability, and robust data protection through encapsulation",
      "Because OOP programs run completely without memory",
      "Because OOP does not require any compiler or interpreter",
      "Because OOP is only written in binary machine code"
    ],
    answer: "Because OOP provides modularity, easy maintenance, code reusability, and robust data protection through encapsulation",
    correctAnswer: 0,
    explanation: "OOP models software as interconnected, self-contained objects mirroring real-world domains. This modular structure minimizes bugs, accelerates team development, safeguards sensitive state, and allows scalable maintenance.",
    explanationBn: "OOP কোডকে মডুলার, সহজে রক্ষণাবেক্ষণযোগ্য, পুনঃব্যবহারযোগ্য এবং ডেটা সুরক্ষিত করে, যা বৃহৎ সফটওয়্যার তৈরির জন্য আদর্শ।",
    topic: "Core Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism",
    difficulty: "Easy",
    hint: "Modularity, security, reusability, and maintainability."
  }
];

export default questions;
