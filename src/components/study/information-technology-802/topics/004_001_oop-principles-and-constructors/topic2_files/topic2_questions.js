const questions = [
  {
    id: "q1",
    question: "What is a Constructor in Java?",
    options: [
      "A special member block that has the exact same name as the class, has NO return type, and is automatically invoked to initialize new objects",
      "A graphical tool in the IDE for designing user interfaces",
      "A background thread that deletes unused files from the hard disk",
      "A database table constraint used to enforce primary keys"
    ],
    answer: "A special member block that has the exact same name as the class, has NO return type, and is automatically invoked to initialize new objects",
    correctAnswer: 0,
    explanation: "A **Constructor** is a special member in a Java class whose primary purpose is to initialize instance variables and execute startup logic whenever a new object is created with the `new` operator.",
    explanationBn: "কনস্ট্রাক্টর হলো ক্লাসের একটি বিশেষ মেম্বার যার নাম ক্লাসের নামের হুবহু সমান, কোনো রিটার্ন টাইপ থাকে না এবং অবজেক্ট তৈরির সময় স্বয়ংক্রিয়ভাবে ফিল্ডগুলোর প্রাথমিক মান নির্ধারণ করে।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Special initializer sharing the class name."
  },
  {
    id: "q2",
    question: "Which of the following is a MANDATORY naming rule for a Java constructor?",
    options: [
      "Its name MUST match the class name exactly (case-sensitive)",
      "Its name must always start with 'init'",
      "Its name must be written in ALL CAPITAL LETTERS",
      "Its name must end with an underscore"
    ],
    answer: "Its name MUST match the class name exactly (case-sensitive)",
    correctAnswer: 0,
    explanation: "In Java, a constructor **must have the exact same identifier name** as the enclosing class, including exact matching case sensitivity (e.g. `public Student()` for `public class Student`).",
    explanationBn: "কনস্ট্রাক্টরের নাম অবশ্যই ক্লাসের নামের সাথে হুবহু এক হতে হবে (Case-Sensitive)।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "If class is 'BankAccount', constructor must be 'BankAccount'."
  },
  {
    id: "q3",
    question: "What return type should be specified when writing a Java constructor?",
    options: [
      "NO return type at all (not even void)",
      "void",
      "int",
      "Object"
    ],
    answer: "NO return type at all (not even void)",
    correctAnswer: 0,
    explanation: "Constructors **must NOT have any return type**, not even `void`. Specifying any return type converts the constructor into a regular method.",
    explanationBn: "কনস্ট্রাক্টরের কোনো রিটার্ন টাইপ থাকে না, এমনকি 'void' ও লেখা যাবে না।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Not even void is permissible for a constructor."
  },
  {
    id: "q4",
    question: "What happens if you declare a method as 'public void Student() { ... }' inside 'class Student'?",
    options: [
      "The Java compiler treats it as a regular member method, NOT a constructor; it will NOT execute upon 'new Student()'",
      "It creates a default constructor",
      "It causes a compilation syntax error",
      "It runs automatically twice"
    ],
    answer: "The Java compiler treats it as a regular member method, NOT a constructor; it will NOT execute upon 'new Student()'",
    correctAnswer: 0,
    explanation: "Because `void` is specified as a return type, Java demotes `Student()` to a regular instance method. It will never execute during `new Student()`; it would only run if called manually as `s.Student()`.",
    explanationBn: "void লেখার কারণে এটি আর কনস্ট্রাক্টর থাকে না, সাধারণ মেথড হয়ে যায় এবং অবজেক্ট তৈরির সময় স্বয়ংক্রিয়ভাবে চলে না।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "Adding a return type breaks the constructor definition."
  },
  {
    id: "q5",
    question: "Why don't constructors have a return type in Java?",
    options: [
      "Because the 'new' operator implicitly returns the reference (memory address) of the newly created object",
      "Because Java doesn't know how to return integers",
      "Because return types slow down the compiler by 90%",
      "Because constructors only work on primitive data"
    ],
    answer: "Because the 'new' operator implicitly returns the reference (memory address) of the newly created object",
    correctAnswer: 0,
    explanation: "The purpose of `new ClassName()` is to return the heap address of the instantiated object. Allowing constructors to specify custom return types would conflict with this core language architecture.",
    explanationBn: "'new' অপারেটর স্বয়ংক্রিয়ভাবে তৈরি হওয়া নতুন অবজেক্টের মেমরি রেফারেন্স রিটার্ন করে, তাই কনস্ট্রাক্টরে আলাদা রিটার্ন টাইপের প্রয়োজন হয় না।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Hard",
    hint: "The creation expression already produces the object reference."
  },
  {
    id: "q6",
    question: "Can a constructor be declared as 'private' in Java?",
    options: [
      "Yes, to restrict instantiation from outside classes (e.g. Singleton design pattern or Utility classes)",
      "No, constructors must always be public",
      "Only in abstract classes",
      "Only if it has at least 5 parameters"
    ],
    answer: "Yes, to restrict instantiation from outside classes (e.g. Singleton design pattern or Utility classes)",
    correctAnswer: 0,
    explanation: "A constructor can have `private` access. This prevents other classes from creating instances with `new`, commonly used in the Singleton pattern and static utility classes like `java.lang.Math`.",
    explanationBn: "হ্যাঁ, প্রাইভেট কনস্ট্রাক্টর লেখা যায়, যা বাইরের ক্লাস থেকে সরাসরি অবজেক্ট তৈরি করা বন্ধ করতে ব্যবহৃত হয় (যেমন Singleton প্যাটার্ন)।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "Used when you want to control or prevent instantiation."
  },
  {
    id: "q7",
    question: "Which of the following modifiers is ILLEGAL on a constructor declaration in Java?",
    options: [
      "static, final, abstract, and synchronized",
      "public",
      "protected",
      "private"
    ],
    answer: "static, final, abstract, and synchronized",
    correctAnswer: 0,
    explanation: "Constructors can only take access modifiers (`public`, `protected`, `private`, or package default). They **cannot** be `static` (they belong to an instance), `final` (they cannot be overridden), `abstract`, or `synchronized`.",
    explanationBn: "কনস্ট্রাক্টরে static, final, abstract বা synchronized মডিফায়ার ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "Constructors cannot be static or overridden."
  },
  {
    id: "q8",
    question: "What is the primary operational difference between a Constructor and a Method?",
    options: [
      "A constructor initializes object state and is invoked implicitly during 'new'; a method performs actions and is called explicitly on an object",
      "A constructor only runs in Linux; a method only runs in Windows",
      "A constructor has a return type; a method does not",
      "There is no difference"
    ],
    answer: "A constructor initializes object state and is invoked implicitly during 'new'; a method performs actions and is called explicitly on an object",
    correctAnswer: 0,
    explanation: "A **constructor** constructs and initializes the state of an object automatically upon `new`. A **method** encapsulates reusable operational behavior that is invoked explicitly on demand using the dot operator.",
    explanationBn: "কনস্ট্রাক্টর অবজেক্টের প্রাথমিক মান নির্ধারণ করে এবং 'new' দিয়ে স্বয়ংক্রিয়ভাবে চলে; মেথড কোনো কাজ সম্পাদন করে এবং ডট (.) দিয়ে কল করতে হয়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Initialization vs Operational behavior."
  },
  {
    id: "q9",
    question: "Can a constructor return an explicit value using 'return 10;' inside its body?",
    options: [
      "No, returning any value triggers a compile-time error",
      "Yes, if the class name is a number",
      "Yes, it returns the number to the OS",
      "Only in void constructors"
    ],
    answer: "No, returning any value triggers a compile-time error",
    correctAnswer: 0,
    explanation: "Constructors do not have a return type, so returning a value (e.g. `return 10;`) produces a compile error: `cannot return a value from a constructor`.",
    explanationBn: "কনস্ট্রাক্টরের কোনো রিটার্ন টাইপ না থাকায় মান রিটার্ন করা (যেমন return 10;) কম্পাইল-টাইম এরর তৈরি করে।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "Returning data from a constructor is illegal."
  },
  {
    id: "q10",
    question: "Is an empty 'return;' statement (without an expression) allowed inside a constructor?",
    options: [
      "Yes, an empty 'return;' is valid for early control-flow termination",
      "No, the return keyword is completely banned in constructors",
      "Only in abstract classes",
      "Only if an exception was thrown"
    ],
    answer: "Yes, an empty 'return;' is valid for early control-flow termination",
    correctAnswer: 0,
    explanation: "You may use an empty `return;` to exit a constructor early (e.g. if an invalid input condition is detected before proceeding).",
    explanationBn: "হ্যাঁ, কনস্ট্রাক্টরের কাজ দ্রুত সমাপ্ত করার জন্য কোনো মান ছাড়া শুধু 'return;' লেখা সম্পূর্ণ বৈধ।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Hard",
    hint: "Empty return controls execution flow without returning values."
  },
  {
    id: "q11",
    question: "What is the output of the following Java program?\n\nclass Book {\n    Book() {\n        System.out.print(\"Init \");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Book b1 = new Book();\n        Book b2 = new Book();\n    }\n}",
    options: [
      "Init Init ",
      "Init ",
      "No output",
      "Compilation error"
    ],
    answer: "Init Init ",
    correctAnswer: 0,
    explanation: "Each `new Book()` instantiates a distinct object on the heap, triggering the `Book()` constructor once per instance. Thus, `Init ` is printed twice: `Init Init `.",
    explanationBn: "দুবার new Book() কল করায় কনস্ট্রাক্টর দুইবার চলে এবং 'Init Init ' প্রিন্ট হয়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Two objects created = two constructor invocations."
  },
  {
    id: "q12",
    question: "Which access modifiers can be applied to a Java constructor?",
    options: [
      "public, protected, default (package-private), and private",
      "public and private only",
      "public only",
      "static and final only"
    ],
    answer: "public, protected, default (package-private), and private",
    correctAnswer: 0,
    explanation: "Constructors support all four Java access levels: `public` (accessible anywhere), `protected` (package + subclasses), default (same package), and `private` (same class only).",
    explanationBn: "কনস্ট্রাক্টরের ক্ষেত্রে জাভার চারটি অ্যাক্সেস লেভেলই (public, protected, default, private) প্রযোজ্য।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "All 4 standard access levels."
  },
  {
    id: "q13",
    question: "Can a constructor have parameters in Java?",
    options: [
      "Yes, a constructor can accept zero, one, or multiple typed parameters (Parameterized Constructor)",
      "No, constructors must always have empty parentheses ()",
      "Only integer parameters are allowed",
      "Only String parameters are allowed"
    ],
    answer: "Yes, a constructor can accept zero, one, or multiple typed parameters (Parameterized Constructor)",
    correctAnswer: 0,
    explanation: "Constructors can define parameter lists just like methods. When parameters are present, it is called a **Parameterized Constructor**.",
    explanationBn: "হ্যাঁ, কনস্ট্রাক্টরে শূন্য বা একাধিক বিভিন্ন টাইপের প্যারামিটার দেওয়া যায় (যাকে প্যারামিটারাইজড কনস্ট্রাক্টর বলে)।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Used to pass custom initial values."
  },
  {
    id: "q14",
    question: "Are constructors inherited by subclasses in Java?",
    options: [
      "No, constructors are NOT members of a class and are never inherited by subclasses",
      "Yes, all constructors are inherited just like methods",
      "Only private constructors are inherited",
      "Only public constructors are inherited"
    ],
    answer: "No, constructors are NOT members of a class and are never inherited by subclasses",
    correctAnswer: 0,
    explanation: "Constructors are **not inherited** by child classes. A subclass can invoke a superclass constructor via `super()`, but it does not inherit the parent constructor as its own.",
    explanationBn: "না, কনস্ট্রাক্টর চাইল্ড ক্লাসে ইনহেরিট হয় না; তবে চাইল্ড ক্লাস super() দিয়ে প্যারেন্ট কনস্ট্রাক্টর কল করতে পারে।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Hard",
    hint: "Constructors belong uniquely to the class that defines them."
  },
  {
    id: "q15",
    question: "Can you override a constructor in a subclass?",
    options: [
      "No, because constructors are not inherited and must match their respective class names",
      "Yes, using the @Override annotation",
      "Yes, if the constructor is public",
      "Yes, if both classes have the same package"
    ],
    answer: "No, because constructors are not inherited and must match their respective class names",
    correctAnswer: 0,
    explanation: "Overriding requires an inherited method with the same name. Since a subclass has a different name from its superclass and does not inherit parent constructors, **constructor overriding is impossible**.",
    explanationBn: "কনস্ট্রাক্টরের নাম ক্লাসের নামের সমান হতে হয় এবং এরা ইনহেরিট হয় না, তাই কনস্ট্রাক্টর ওভাররাইড করা অসম্ভব।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Hard",
    hint: "Overriding requires identical names in parent and child."
  },
  {
    id: "q16",
    question: "Can a constructor be overloaded in Java?",
    options: [
      "Yes, a class can have multiple constructors with different parameter signatures (Constructor Overloading)",
      "No, Java only allows exactly one constructor per class",
      "Only if they have different return types",
      "Only in abstract classes"
    ],
    answer: "Yes, a class can have multiple constructors with different parameter signatures (Constructor Overloading)",
    correctAnswer: 0,
    explanation: "A single class can define multiple constructors as long as their parameter lists differ in count, types, or order. This is known as **Constructor Overloading**.",
    explanationBn: "হ্যাঁ, একটি ক্লাসে বিভিন্ন প্যারামিটার বিশিষ্ট একাধিক কনস্ট্রাক্টর থাকতে পারে, যাকে কনস্ট্রাক্টর ওভারলোডিং বলে।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Compile-time polymorphism for constructors."
  },
  {
    id: "q17",
    question: "What happens if a class does not define ANY constructor explicitly?",
    options: [
      "The Java compiler automatically generates a default no-argument constructor with an empty body",
      "The class cannot be compiled",
      "The class cannot have any variables",
      "The program crashes with a ClassFormatError"
    ],
    answer: "The Java compiler automatically generates a default no-argument constructor with an empty body",
    correctAnswer: 0,
    explanation: "If no constructor is written, the compiler automatically provides a public no-arg default constructor: `public ClassName() { super(); }`.",
    explanationBn: "যদি কোনো কনস্ট্রাক্টর না লেখা হয়, তবে জাভা কম্পাইলার স্বয়ংক্রিয়ভাবে একটি ডিফল্ট নো-আর্গুমেন্ট কনস্ট্রাক্টর যুক্ত করে দেয়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "The compiler assists by providing a default."
  },
  {
    id: "q18",
    question: "Consider: 'class Demo { Demo(int a) {} }'. Can you instantiate an object using 'Demo d = new Demo();'?",
    options: [
      "No, it produces a compile error because the compiler no longer provides the default no-arg constructor once a parameterized constructor is defined",
      "Yes, Java always supplies the default constructor",
      "Yes, it initializes 'a' to 0 automatically",
      "Only if you add 'void' before Demo(int a)"
    ],
    answer: "No, it produces a compile error because the compiler no longer provides the default no-arg constructor once a parameterized constructor is defined",
    correctAnswer: 0,
    explanation: "Defining any custom constructor suppresses the automatic default constructor. Calling `new Demo()` without defining `Demo()` causes a compile-time error: `constructor Demo in class Demo cannot be applied to given types`.",
    explanationBn: "প্যারামিটারাইজড কনস্ট্রাক্টর লিখলে কম্পাইলারের ডিফল্ট কনস্ট্রাক্টর বাতিল হয়ে যায়; ফলে new Demo() কল করলে এরর হয়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Hard",
    hint: "A classic CBSE Class XII board exam trap!"
  },
  {
    id: "q19",
    question: "What is the purpose of initializing fields inside a constructor rather than using default zeros?",
    options: [
      "To ensure objects start their lifecycle with valid, meaningful, and consistent business data",
      "To reduce CPU heat generation",
      "To prevent files from being saved on disk",
      "To make variables static"
    ],
    answer: "To ensure objects start their lifecycle with valid, meaningful, and consistent business data",
    correctAnswer: 0,
    explanation: "Constructors guarantee business integrity: a `BankAccount` object can be initialized with an account number and starting balance (e.g. ₹1000) so that it is never in an invalid state.",
    explanationBn: "কনস্ট্রাক্টরের মূল উদ্দেশ্য হলো অবজেক্ট তৈরি হওয়ার সাথে সাথেই সঠিক ও কার্যকর প্রারম্ভিক ডেটা দিয়ে অবজেক্টকে সক্রিয় করা।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Guarantees valid state from birth."
  },
  {
    id: "q20",
    question: "Which of the following lines correctly defines a constructor for 'class Account'?",
    options: [
      "public Account(String accNo, double bal) { ... }",
      "public void Account(String accNo, double bal) { ... }",
      "public int Account(String accNo, double bal) { ... }",
      "Account_constructor(String accNo, double bal) { ... }"
    ],
    answer: "public Account(String accNo, double bal) { ... }",
    correctAnswer: 0,
    explanation: "A valid constructor must match the class name (`Account`) and **must not include any return type specifier** (such as `void` or `int`).",
    explanationBn: "সঠিক কনস্ট্রাক্টরে কোনো রিটার্ন টাইপ থাকবে না এবং নাম হুবহু ক্লাসের নামের সমান হবে (যেমন public Account(...))।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Look for class name match with no return type."
  },
  {
    id: "q21",
    question: "Can a constructor throw checked exceptions using the 'throws' clause?",
    options: [
      "Yes, a constructor can declare and throw checked and unchecked exceptions (e.g. 'public FileProcessor() throws IOException')",
      "No, constructors cannot throw exceptions",
      "Only unchecked RuntimeExceptions are permitted",
      "Only if the class extends Throwable"
    ],
    answer: "Yes, a constructor can declare and throw checked and unchecked exceptions (e.g. 'public FileProcessor() throws IOException')",
    correctAnswer: 0,
    explanation: "Constructors can declare `throws ExceptionName` just like standard methods. If initialization fails (e.g. file not found or invalid network port), an exception is thrown and the object creation is safely aborted.",
    explanationBn: "হ্যাঁ, অবজেক্ট তৈরির সময় কোনো ত্রুটি ঘটলে কনস্ট্রাক্টর 'throws' ক্লজের মাধ্যমে এক্সেপশন ছুঁড়ে দিতে পারে।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "Constructors support exception throwing."
  },
  {
    id: "q22",
    question: "What is the primary role of the 'this' keyword when used inside a constructor like 'this.salary = salary;'?",
    options: [
      "To resolve ambiguity between the instance variable 'salary' and the parameter 'salary'",
      "To double the salary value",
      "To make salary a constant",
      "To print salary to the console"
    ],
    answer: "To resolve ambiguity between the instance variable 'salary' and the parameter 'salary'",
    correctAnswer: 0,
    explanation: "When a parameter shares the exact name of an instance field, `this.salary` explicitly refers to the field of the current object on the heap, resolving variable shadowing.",
    explanationBn: "প্যারামিটার ও ইন্সট্যান্স ফিল্ডের নাম একই হলে 'this.salary' দিয়ে ক্লাসের নিজস্ব ফিল্ডকে চিহ্নিত করা হয়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Resolves parameter shadowing."
  },
  {
    id: "q23",
    question: "What is the output of the following snippet?\n\nclass Test {\n    int x;\n    Test() {\n        x = 10;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Test t = new Test();\n        System.out.println(t.x);\n    }\n}",
    options: [
      "10",
      "0",
      "null",
      "Compilation error"
    ],
    answer: "10",
    correctAnswer: 0,
    explanation: "The `new Test()` creates an object and automatically executes `Test()`, which sets `x = 10`. Thus, `t.x` prints `10`.",
    explanationBn: "new Test() এর মাধ্যমে কনস্ট্রাক্টর কল হয়ে x এর মান 10 নির্ধারণ করে, তাই আউটপুট হবে 10।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Constructor initializes x to 10."
  },
  {
    id: "q24",
    question: "Can a constructor be called recursively (e.g., calling itself via this())?",
    options: [
      "No, recursive constructor invocation is caught as a compile-time error in Java",
      "Yes, it behaves like normal recursive functions",
      "Yes, until heap memory is full",
      "Only in abstract classes"
    ],
    answer: "No, recursive constructor invocation is caught as a compile-time error in Java",
    correctAnswer: 0,
    explanation: "Java strictly forbids cyclic constructor chaining. If a constructor attempts to call itself directly or indirectly via `this()`, the compiler reports `recursive constructor invocation`.",
    explanationBn: "কনস্ট্রাক্টরের ভেতর নিজেকে বা চক্রাকারে অন্যকে কল করলে কম্পাইলার 'recursive constructor invocation' এরর দেয়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "Cyclic constructor calling is prevented at compile time."
  },
  {
    id: "q25",
    question: "In CBSE Class XII IT 802, what marks will a student lose if they write 'void Student()' when asked to create a constructor for 'class Student'?",
    options: [
      "Marks will be deducted because writing 'void' makes it a regular method rather than a valid constructor",
      "No marks lost, void is optional",
      "Full marks awarded for creative coding",
      "None of these"
    ],
    answer: "Marks will be deducted because writing 'void' makes it a regular method rather than a valid constructor",
    correctAnswer: 0,
    explanation: "In CBSE Board examinations, adding `void` to a constructor is a serious conceptual error. Evaluators mark it as a standard member method, leading to loss of constructor marks.",
    explanationBn: "সিবিএসই বোর্ড পরীক্ষায় কনস্ট্রাক্টরে void লিখলে তা মেথড গণ্য হয় এবং কনস্ট্রাক্টরের নম্বর কাটা যায়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Medium",
    hint: "A vital board exam evaluation guideline."
  },
  {
    id: "q26",
    question: "How many constructors can a single Java class have?",
    options: [
      "As many as needed, as long as each has a unique parameter signature (Constructor Overloading)",
      "Exactly one",
      "Maximum two",
      "Maximum four"
    ],
    answer: "As many as needed, as long as each has a unique parameter signature (Constructor Overloading)",
    correctAnswer: 0,
    explanation: "There is no arbitrary limit on constructor count in Java. A class can define multiple overloaded constructors to accommodate different initialization workflows.",
    explanationBn: "প্যারামিটার সিগনেচার ভিন্ন রেখে একটি ক্লাসে যত খুশি তত কনস্ট্রাক্টর লেখা যায়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Overloading allows multiple unique constructors."
  },
  {
    id: "q27",
    question: "Can a constructor contain a loop (such as for or while loop)?",
    options: [
      "Yes, a constructor can contain loops, if-else conditions, and any standard Java statements",
      "No, only assignments are permitted",
      "Only while loops are allowed",
      "Only if the loop runs exactly once"
    ],
    answer: "Yes, a constructor can contain loops, if-else conditions, and any standard Java statements",
    correctAnswer: 0,
    explanation: "A constructor is a complete block of executable Java code. It can iterate through arrays, validate complex ranges with conditionals, and populate initial data collections.",
    explanationBn: "হ্যাঁ, কনস্ট্রাক্টরের ভেতর লুপ, শর্ত (if-else) এবং যেকোনো স্বাভাবিক জাভা স্টেটমেন্ট ব্যবহার করা যায়।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Constructors have full statement capabilities."
  },
  {
    id: "q28",
    question: "Why is the constructor termed the 'birth-chamber' of a Java object?",
    options: [
      "Because every object must pass through its constructor during creation to receive its initial life and state before it can be used",
      "Because it deletes the object after use",
      "Because it compiles the source code",
      "Because it formats the hard drive"
    ],
    answer: "Because every object must pass through its constructor during creation to receive its initial life and state before it can be used",
    correctAnswer: 0,
    explanation: "No object can exist in Java memory without its constructor having run. It is the initial gatekeeper that grants state, structure, and integrity to a newly born heap instance.",
    explanationBn: "কনস্ট্রাক্টর অবজেক্টের জন্মের মুহূর্তে তার প্রাথমিক গঠন ও রূপ দেয়; এর মধ্য দিয়েই অবজেক্ট কার্যকরী জীবন শুরু করে।",
    topic: "What is a Constructor in Java? (Same Name as Class, No Return Type)",
    difficulty: "Easy",
    hint: "Every object is born through constructor execution."
  }
];

export default questions;
