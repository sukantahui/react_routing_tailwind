const questions = [
  {
    id: "q1",
    question: "What is the primary difference in naming rules between a Java Constructor and a Method?",
    options: [
      "A constructor MUST match the class name exactly; a method can be any valid Java identifier",
      "A constructor can have any name; a method must match the class name",
      "Both must start with the keyword 'def'",
      "Both must be named 'Main'"
    ],
    answer: "A constructor MUST match the class name exactly; a method can be any valid Java identifier",
    correctAnswer: 0,
    explanation: "A constructor is bound strictly to the name of its declaring class, whereas a method can be named with any valid identifier (e.g., `calculateTotal()`, `printReport()`).",
    explanationBn: "কনস্ট্রাক্টরের নাম অবশ্যই ক্লাসের নামের সমান হতে হয়, আর মেথডের নাম যেকোনো বৈধ নাম (যেমন calculateTax) হতে পারে।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Exact class name match vs any valid identifier."
  },
  {
    id: "q2",
    question: "How do Constructors and Methods differ regarding Return Types?",
    options: [
      "Constructors have NO return type (not even void); Methods MUST declare a return type or 'void'",
      "Constructors must return an int; Methods return void",
      "Constructors and Methods both require 'void'",
      "Constructors return a boolean status code"
    ],
    answer: "Constructors have NO return type (not even void); Methods MUST declare a return type or 'void'",
    correctAnswer: 0,
    explanation: "A constructor has no return type specifier. A method must always declare its return type (`int`, `double`, `String`, `void`, etc.).",
    explanationBn: "কনস্ট্রাক্টরে কোনো রিটার্ন টাইপ (এমনকি void ও নয়) থাকে না; মেথডে অবশ্যই রিটার্ন টাইপ বা void উল্লেখ করতে হয়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "No return type vs mandatory return type/void."
  },
  {
    id: "q3",
    question: "How do Constructors and Methods differ in how they are Invoked?",
    options: [
      "A constructor is invoked automatically by the 'new' keyword during object creation; a method is invoked explicitly using the dot (.) operator on an object reference",
      "A constructor is called by the OS terminal; a method is called by the compiler",
      "Both are called automatically every second",
      "Methods cannot be called on objects"
    ],
    answer: "A constructor is invoked automatically by the 'new' keyword during object creation; a method is invoked explicitly using the dot (.) operator on an object reference",
    correctAnswer: 0,
    explanation: "Constructors are triggered implicitly upon `new ClassName()`. In contrast, methods are invoked explicitly whenever desired: `obj.methodName()`.",
    explanationBn: "কনস্ট্রাক্টর অবজেক্ট তৈরির সময় new দিয়ে স্বয়ংক্রিয়ভাবে চলে; মেথড প্রয়োজনমতো ডট (.) দিয়ে বারবার কল করতে হয়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Implicit lifecycle trigger vs explicit manual call."
  },
  {
    id: "q4",
    question: "How do Constructors and Methods differ regarding Inheritance in Java subclasses?",
    options: [
      "Methods are inherited by subclasses; Constructors are NEVER inherited by subclasses",
      "Constructors are inherited; Methods are not",
      "Both are completely inherited",
      "Neither is inherited"
    ],
    answer: "Methods are inherited by subclasses; Constructors are NEVER inherited by subclasses",
    correctAnswer: 0,
    explanation: "Subclasses inherit all non-private methods of their superclass. However, **constructors are not members of a class and are never inherited**.",
    explanationBn: "চাইল্ড ক্লাস প্যারেন্ট ক্লাসের মেথডগুলো উত্তরাধিকার সূত্রে পায়, কিন্তু প্যারেন্ট কনস্ট্রাক্টর ইনহেরিট হয় না।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Constructors are not inherited class members."
  },
  {
    id: "q5",
    question: "Can a Constructor be declared as 'static' in Java?",
    options: [
      "No, constructors cannot be static because they belong to an individual object instance being created",
      "Yes, static constructors are standard in Java",
      "Only if the class has static fields",
      "Only in package-private classes"
    ],
    answer: "No, constructors cannot be static because they belong to an individual object instance being created",
    correctAnswer: 0,
    explanation: "Static members belong to the class blueprint in Metaspace. Constructors are dedicated to initializing an individual heap instance, so `static` constructors are forbidden in Java.",
    explanationBn: "না, কনস্ট্রাক্টর অবজেক্টের ইন্সট্যান্স তৈরির সাথে যুক্ত থাকায় এটি static হতে পারে না।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Static belongs to class; constructor builds instance."
  },
  {
    id: "q6",
    question: "Can a Method be declared as 'static' in Java?",
    options: [
      "Yes, static methods belong to the class and can be invoked directly via ClassName.method() without creating an object",
      "No, static methods do not exist in Java",
      "Only if the method has no parameters",
      "Only inside interfaces"
    ],
    answer: "Yes, static methods belong to the class and can be invoked directly via ClassName.method() without creating an object",
    correctAnswer: 0,
    explanation: "Methods can be `static` (like `Math.sqrt()` or `main()`). They can be called directly without creating any object instance.",
    explanationBn: "হ্যাঁ, মেথড static হতে পারে এবং কোনো অবজেক্ট তৈরি ছাড়াই সরাসরি ClassName.method() দিয়ে কল করা যায়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Class methods like Math.max() or main()."
  },
  {
    id: "q7",
    question: "Can a Constructor be declared as 'abstract'?",
    options: [
      "No, a constructor must always have a concrete implementation to initialize fields",
      "Yes, in abstract classes",
      "Only if all methods are abstract",
      "Only if the constructor is private"
    ],
    answer: "No, a constructor must always have a concrete implementation to initialize fields",
    correctAnswer: 0,
    explanation: "An `abstract` declaration means a method has no body and must be implemented by a subclass. Since constructors cannot be overridden or inherited, an abstract constructor is meaningless and illegal.",
    explanationBn: "কনস্ট্রাক্টর ওভাররাইড বা ইনহেরিট হয় না, তাই একে abstract ঘোষণা করা নিষিদ্ধ।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Abstract members must be overridden in child classes."
  },
  {
    id: "q8",
    question: "Can a Method be declared as 'abstract'?",
    options: [
      "Yes, inside abstract classes and interfaces, requiring subclasses to provide concrete implementations",
      "No, all methods in Java must have bodies",
      "Only in final classes",
      "Only if the return type is void"
    ],
    answer: "Yes, inside abstract classes and interfaces, requiring subclasses to provide concrete implementations",
    correctAnswer: 0,
    explanation: "Methods can be `abstract` (specifying a method signature without a body `{ ... }`) to enforce a contract that concrete subclasses must implement.",
    explanationBn: "হ্যাঁ, অ্যাবস্ট্রাক্ট ক্লাস বা ইন্টারফেসে মেথডকে abstract ঘোষণা করে চাইল্ড ক্লাসে বাস্তবায়ন বাধ্যতামূলক করা যায়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Contractual method signatures in abstract classes."
  },
  {
    id: "q9",
    question: "Can a Constructor be declared as 'final'?",
    options: [
      "No, constructors cannot be final because they are never inherited or overridden anyway",
      "Yes, to prevent subclassing",
      "Yes, for security in bank apps",
      "Only if fields are final"
    ],
    answer: "No, constructors cannot be final because they are never inherited or overridden anyway",
    correctAnswer: 0,
    explanation: "`final` on a method prevents overriding. Because constructors cannot be overridden in the first place, putting `final` on a constructor is a syntax error.",
    explanationBn: "যেহেতু কনস্ট্রাক্টর এমনিতেই ওভাররাইড করা যায় না, তাই কনস্ট্রাক্টরে final লেখা কম্পাইলার এরর ঘটায়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Final prevents overriding, which is impossible for constructors."
  },
  {
    id: "q10",
    question: "Can a Method be declared as 'final'?",
    options: [
      "Yes, declaring a method as 'final' prevents subclasses from overriding its implementation",
      "No, only variables can be final",
      "Only in abstract classes",
      "Only if the method has no parameters"
    ],
    answer: "Yes, declaring a method as 'final' prevents subclasses from overriding its implementation",
    correctAnswer: 0,
    explanation: "A `final` method cannot be overridden by any child class, safeguarding critical algorithm implementations from modification.",
    explanationBn: "হ্যাঁ, কোনো মেথডকে final ঘোষণা করলে চাইল্ড ক্লাস আর সেই মেথড ওভাররাইড করতে পারে না।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Locks the method implementation against overriding."
  },
  {
    id: "q11",
    question: "How many times can a Method be executed on a single object instance compared to its Constructor?",
    options: [
      "A constructor runs exactly ONCE during creation; a method can be called ZERO, ONCE, or MULTIPLE times during the object's lifetime",
      "A constructor runs continuously; a method runs once",
      "Both can only run once",
      "Neither can run more than 5 times"
    ],
    answer: "A constructor runs exactly ONCE during creation; a method can be called ZERO, ONCE, or MULTIPLE times during the object's lifetime",
    correctAnswer: 0,
    explanation: "Constructors execute strictly once per object instantiation. Once the object is created, member methods can be invoked repeatedly as many times as desired.",
    explanationBn: "কনস্ট্রাক্টর অবজেক্টের জীবদ্দশায় কেবল একবারই চলে; কিন্তু মেথড প্রয়োজনমতো বহুবার কল করা যায়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Single initialization vs repeated operations."
  },
  {
    id: "q12",
    question: "What happens if you write 'void MyClass() { System.out.println(\"Hi\"); }' inside 'class MyClass'?",
    options: [
      "The Java compiler treats it as a METHOD, not a constructor; it will not execute on 'new MyClass()'",
      "It is an invalid syntax that will not compile",
      "It is a constructor that returns void",
      "It runs automatically every time"
    ],
    answer: "The Java compiler treats it as a METHOD, not a constructor; it will not execute on 'new MyClass()'",
    correctAnswer: 0,
    explanation: "Java allows a method to have the same name as the class if a return type is provided. However, it is **strictly a method**, NOT a constructor, and will not run upon `new`.",
    explanationBn: "রিটার্ন টাইপ (void) থাকায় এটি সাধারণ মেথড গণ্য হবে এবং অবজেক্ট তৈরির সময় স্বয়ংক্রিয়ভাবে চলবে না।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Presence of return type makes it a method."
  },
  {
    id: "q13",
    question: "Does the Java compiler ever automatically generate a default Method for a class if none are written?",
    options: [
      "No, the compiler NEVER generates default methods; it only generates a default constructor if no constructors exist",
      "Yes, it generates a default print() method",
      "Yes, it generates a default run() method",
      "Yes, it generates getter methods for all variables"
    ],
    answer: "No, the compiler NEVER generates default methods; it only generates a default constructor if no constructors exist",
    correctAnswer: 0,
    explanation: "The compiler only provides a default no-argument **constructor**. It never generates custom business methods on its own.",
    explanationBn: "কম্পাইলার কখনোই নিজে থেকে কোনো ডিফল্ট মেথড তৈরি করে না; এটি কেবল ডিফল্ট কনস্ট্রাক্টর প্রদান করতে পারে।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Compiler assistance applies only to default constructors."
  },
  {
    id: "q14",
    question: "What is the primary role difference between a Constructor and a Method in OOP architecture?",
    options: [
      "A constructor's role is to initialize object state; a method's role is to perform operations and define object behavior",
      "A constructor draws shapes; a method plays music",
      "A constructor compiles code; a method deletes code",
      "There is no architectural difference"
    ],
    answer: "A constructor's role is to initialize object state; a method's role is to perform operations and define object behavior",
    correctAnswer: 0,
    explanation: "Constructors construct and initialize state. Methods implement algorithms, state transformations, calculations, and interactions.",
    explanationBn: "কনস্ট্রাক্টর অবজেক্টের প্রাথমিক অবস্থা নির্ধারণ করে; মেথড তার কার্যাবলী ও আচরণ পরিচালনা করে।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "State initialization vs Behavioral operations."
  },
  {
    id: "q15",
    question: "Can a Method call a Constructor directly using the 'new' operator?",
    options: [
      "Yes, any method can instantiate objects using 'new ClassName()'",
      "No, methods cannot create objects",
      "Only main() can create objects",
      "Only static methods can create objects"
    ],
    answer: "Yes, any method can instantiate objects using 'new ClassName()'",
    correctAnswer: 0,
    explanation: "Inside any method (e.g. a factory method `createAccount()`), you can use `new ClassName()` to instantiate objects.",
    explanationBn: "হ্যাঁ, যেকোনো মেথডের ভেতর থেকে 'new ClassName()' লিখে অবজেক্ট তৈরি এবং কনস্ট্রাক্টর সক্রিয় করা যায়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Factory methods create objects via 'new'."
  },
  {
    id: "q16",
    question: "Can a Constructor call a Method?",
    options: [
      "Yes, a constructor can call instance methods, static methods, and private helper routines to validate or set up state",
      "No, constructors cannot call methods",
      "Only static methods can be called",
      "Only if the method has no arguments"
    ],
    answer: "Yes, a constructor can call instance methods, static methods, and private helper routines to validate or set up state",
    correctAnswer: 0,
    explanation: "Constructors routinely call helper methods like `validateInput()`, `loadDefaults()`, or `connect()` during object setup.",
    explanationBn: "হ্যাঁ, অবজেক্টের ডেটা ভ্যালিডেশন বা প্রারম্ভিক সেটআপের জন্য কনস্ট্রাক্টর অন্যান্য মেথড কল করতে পারে।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Constructors can execute any valid method calls."
  },
  {
    id: "q17",
    question: "What is the output of the following Java program?\n\nclass Sample {\n    Sample() {\n        System.out.print(\"C \");\n    }\n    void display() {\n        System.out.print(\"M \");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Sample s = new Sample();\n        s.display();\n        s.display();\n    }\n}",
    options: [
      "C M M ",
      "C M ",
      "M M C ",
      "Compilation error"
    ],
    answer: "C M M ",
    correctAnswer: 0,
    explanation: "`new Sample()` runs the constructor printing `\"C \"`. Then `s.display()` is called twice, printing `\"M \"` each time. Output: `\"C M M \"`.",
    explanationBn: "new Sample() একবার কনস্ট্রাক্টর চালিয়ে 'C ' প্রিন্ট করে এবং s.display() দুবার চলে 'M M ' প্রিন্ট করে; ফলাফল 'C M M '।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "1 constructor execution + 2 method executions."
  },
  {
    id: "q18",
    question: "Which of the following can be Overloaded in Java?",
    options: [
      "Both Constructors and Methods can be overloaded",
      "Only Methods can be overloaded",
      "Only Constructors can be overloaded",
      "Neither can be overloaded"
    ],
    answer: "Both Constructors and Methods can be overloaded",
    correctAnswer: 0,
    explanation: "Java supports both **Method Overloading** and **Constructor Overloading** by defining multiple versions with different parameter lists.",
    explanationBn: "জাভাতে মেথড এবং কনস্ট্রাক্টর উভয়ের ক্ষেত্রেই ওভারলোডিং সম্পূর্ণ সমর্থিত।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Both support compile-time overloading."
  },
  {
    id: "q19",
    question: "Which of the following can be Overridden in Java subclasses?",
    options: [
      "Only Methods can be overridden; Constructors can NEVER be overridden",
      "Both Constructors and Methods can be overridden",
      "Only Constructors can be overridden",
      "Neither can be overridden"
    ],
    answer: "Only Methods can be overridden; Constructors can NEVER be overridden",
    correctAnswer: 0,
    explanation: "Overriding requires an inherited member with identical name. Since constructors are not inherited and must match their specific class names, **only methods can be overridden**.",
    explanationBn: "শুধুমাত্র মেথড ওভাররাইড করা সম্ভব; কনস্ট্রাক্টর কখনো ওভাররাইড করা যায় না।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Constructors are not inherited and cannot be overridden."
  },
  {
    id: "q20",
    question: "Can a Method be declared with 'synchronized' keyword for multi-threading thread safety?",
    options: [
      "Yes, methods can be synchronized; Constructors CANNOT be declared synchronized",
      "Constructors can be synchronized; Methods cannot",
      "Both can be synchronized",
      "Neither can be synchronized"
    ],
    answer: "Yes, methods can be synchronized; Constructors CANNOT be declared synchronized",
    correctAnswer: 0,
    explanation: "A method can be `synchronized` to lock access for multi-threading. A constructor cannot be `synchronized` because an object under construction is only accessible to the thread creating it.",
    explanationBn: "মেথডে synchronized কিওয়ার্ড ব্যবহার করা যায়, কিন্তু কনস্ট্রাক্টরে synchronized কিওয়ার্ড নিষিদ্ধ।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Hard",
    hint: "Constructors cannot take the synchronized modifier."
  },
  {
    id: "q21",
    question: "What happens if a Method has a return type 'int' but no return statement in its body?",
    options: [
      "Compile-time error: 'missing return statement'",
      "It returns 0 automatically",
      "It returns null",
      "The method runs without issues"
    ],
    answer: "Compile-time error: 'missing return statement'",
    correctAnswer: 0,
    explanation: "Methods with a non-void return type **must** explicitly execute a `return value;` statement on all execution paths.",
    explanationBn: "নন-ভয়েড মেথডে রিটার্ন স্টেটমেন্ট না দিলে কম্পাইলার 'missing return statement' এরর দেয়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Non-void methods must return a value."
  },
  {
    id: "q22",
    question: "What happens if you write 'return 5;' inside a constructor?",
    options: [
      "Compile-time error: 'cannot return a value from a constructor'",
      "The constructor returns 5 to the new operator",
      "The object ID becomes 5",
      "The program terminates"
    ],
    answer: "Compile-time error: 'cannot return a value from a constructor'",
    correctAnswer: 0,
    explanation: "Because constructors have no return type, returning any expression or value produces a compile-time syntax error.",
    explanationBn: "কনস্ট্রাক্টরের কোনো রিটার্ন টাইপ না থাকায় মান রিটার্ন করা নিষিদ্ধ এবং এরর তৈরি করে।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Constructors cannot return data values."
  },
  {
    id: "q23",
    question: "In the Java Bytecode (.class file), what is the special internal name given to an instance constructor?",
    options: [
      "<init>",
      "<clinit>",
      "<constructor>",
      "<create>"
    ],
    answer: "<init>",
    correctAnswer: 0,
    explanation: "In Java Bytecode, the JVM translates instance constructors into special internal methods named **`<init>`** (while static class initializers are compiled as `<clinit>`).",
    explanationBn: "জাভা বাইটকোডে ইন্সট্যান্স কনস্ট্রাক্টরগুলো অভ্যন্তরীণভাবে '<init>' মেথড হিসেবে সংকলিত হয়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Hard",
    hint: "Special JVM internal identifier for instance initialization."
  },
  {
    id: "q24",
    question: "Can a Method have the same name as another Method in the same class?",
    options: [
      "Yes, if their parameter lists differ (Method Overloading)",
      "No, all method names must be completely unique",
      "Only if one returns void and the other returns int",
      "Only in abstract classes"
    ],
    answer: "Yes, if their parameter lists differ (Method Overloading)",
    correctAnswer: 0,
    explanation: "Methods can share the same name as long as their parameter signatures are distinct (Method Overloading).",
    explanationBn: "প্যারামিটারের ভিন্নতা রেখে একই নামের একাধিক মেথড লেখা যায় (মেথড ওভারলোডিং)।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Overloaded methods share the same identifier."
  },
  {
    id: "q25",
    question: "Why can't you invoke a constructor on an already created object to reset its state, e.g., 's1.Student()'?",
    options: [
      "Because a constructor is not an addressable instance method and can only be invoked by the JVM during the 'new' allocation phase",
      "Because memory would explode",
      "Because student objects are read-only",
      "Because Java only runs on 64-bit systems"
    ],
    answer: "Because a constructor is not an addressable instance method and can only be invoked by the JVM during the 'new' allocation phase",
    correctAnswer: 0,
    explanation: "Constructors are dedicated initialization lifecycle hooks, not callable instance methods. To re-initialize an object, write a custom method like `s1.reset()`.",
    explanationBn: "কনস্ট্রাক্টর অবজেক্টের সাধারণ মেথড নয়; অবজেক্ট রিসেট করতে কাস্টম reset() মেথড লিখতে হয়।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Constructors are lifecycle hooks, not reusable methods."
  },
  {
    id: "q26",
    question: "Which of the following table rows accurately contrasts a Constructor vs a Method?",
    options: [
      "Constructor: No return type, Class name match | Method: Has return type/void, Any valid identifier",
      "Constructor: Has void return type | Method: No return type",
      "Constructor: Called via dot (.) | Method: Called via new",
      "Constructor: Inherited by children | Method: Not inherited"
    ],
    answer: "Constructor: No return type, Class name match | Method: Has return type/void, Any valid identifier",
    correctAnswer: 0,
    explanation: "The primary contrasting traits: Constructors have NO return type and match the class name; Methods MUST specify a return type/void and can take any valid identifier.",
    explanationBn: "সঠিক তুলনা: কনস্ট্রাক্টরের কোনো রিটার্ন টাইপ নেই ও ক্লাসের নামের সমান; মেথডের রিটার্ন টাইপ থাকে এবং যেকোনো নাম হতে পারে।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Classic CBSE Class XII comparison question."
  },
  {
    id: "q27",
    question: "What is the difference between calling 'super()' in a constructor and calling 'super.methodName()' in a method?",
    options: [
      "'super()' invokes the superclass constructor during creation; 'super.methodName()' invokes an overridden superclass method at any time",
      "Both do the exact same thing",
      "'super()' deletes the parent class",
      "'super.methodName()' is illegal in Java"
    ],
    answer: "'super()' invokes the superclass constructor during creation; 'super.methodName()' invokes an overridden superclass method at any time",
    correctAnswer: 0,
    explanation: "`super(...)` chains parent constructor initialization during object birth, while `super.methodName(...)` calls parent implementation of an overridden method.",
    explanationBn: "super() প্যারেন্ট ক্লাসের কনস্ট্রাক্টর কল করে এবং super.method() ওভাররাইড করা প্যারেন্ট মেথড কার্যকর করে।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Medium",
    hint: "Constructor invocation vs method invocation of parent."
  },
  {
    id: "q28",
    question: "Summary for CBSE IT 802: Why does Java maintain separate concepts for Constructors and Methods instead of using a single unified function construct?",
    options: [
      "To cleanly separate object creation & lifecycle state guarantees (Constructors) from runtime behavior and business operations (Methods)",
      "To make Java harder to learn",
      "Because CPU architecture requires two different registers",
      "To allow code to run in HTML browsers"
    ],
    answer: "To cleanly separate object creation & lifecycle state guarantees (Constructors) from runtime behavior and business operations (Methods)",
    correctAnswer: 0,
    explanation: "Differentiating constructors from methods enforces object safety: constructors ensure guaranteed initialization before any operational methods can manipulate the object.",
    explanationBn: "অবজেক্টের নিরাপদ ও নির্ভরযোগ্য জন্ম (কনস্ট্রাক্টর) এবং পরবর্তী কার্যক্রমকে (মেথড) স্পষ্টভাবে পৃথক রাখতেই এই বিভাজন।",
    topic: "Differences Between Methods and Constructors in Java",
    difficulty: "Easy",
    hint: "Separation of lifecycle birth from operational life."
  }
];

export default questions;
