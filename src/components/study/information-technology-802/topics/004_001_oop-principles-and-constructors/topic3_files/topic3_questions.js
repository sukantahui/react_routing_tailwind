const questions = [
  {
    id: "q1",
    question: "What exact Java keyword and operation triggers the automatic invocation of a constructor?",
    options: [
      "The 'new' operator during object instantiation and heap memory allocation",
      "The 'class' keyword during source code compilation",
      "The 'import' statement when loading class packages",
      "The dot (.) operator on an already instantiated object"
    ],
    answer: "The 'new' operator during object instantiation and heap memory allocation",
    correctAnswer: 0,
    explanation: "In Java, a constructor is automatically and implicitly triggered when the **`new`** keyword is executed. The `new` operator allocates memory for the object on the heap, and immediately invokes the matching constructor to initialize the object's instance variables.",
    explanationBn: "জাভাতে 'new' কিওয়ার্ড প্রয়োগ করে যখন হিপ মেমরিতে অবজেক্ট তৈরি (instantiation) করা হয়, ঠিক তখনই কনস্ট্রাক্টর স্বয়ংক্রিয়ভাবে কার্যকর (invoke) হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Easy",
    hint: "Think about the operator used to instantiate objects in Java."
  },
  {
    id: "q2",
    question: "How many times is a constructor executed for a single object instance created with 'new'?",
    options: [
      "Exactly once at the time of object instantiation",
      "Every time a member method of the object is called",
      "Twice — once at declaration and once at compilation",
      "Continuously in a background thread"
    ],
    answer: "Exactly once at the time of object instantiation",
    correctAnswer: 0,
    explanation: "A constructor executes **exactly once** during the lifecycle of a specific object instance. Once the object is initialized and its memory address is assigned to a reference variable, the constructor cannot be re-executed for that instance.",
    explanationBn: "একটি নির্দিষ্ট অবজেক্টের জীবদ্দশায় কনস্ট্রাক্টর শুধুমাত্র একবারই (তৈরির মুহূর্তে) স্বয়ংক্রিয়ভাবে এক্সিকিউট হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Easy",
    hint: "Initialization happens only once per object lifecycle."
  },
  {
    id: "q3",
    question: "What happens if a programmer attempts to manually call a constructor using an object reference, such as 's1.Student();'?",
    options: [
      "It results in a compile-time error because constructors cannot be invoked via the dot operator",
      "It re-initializes all instance variables to zero",
      "It creates a clone of the object 's1'",
      "It automatically deletes the object from heap memory"
    ],
    answer: "It results in a compile-time error because constructors cannot be invoked via the dot operator",
    correctAnswer: 0,
    explanation: "Constructors do **not** behave like normal member methods. You cannot call them explicitly on an existing object reference using the dot operator (e.g. `s1.Student()` produces a `cannot find symbol: method Student()` compile-time error).",
    explanationBn: "ডট অপারেটর দিয়ে বিদ্যমান অবজেক্টে সরাসরি কনস্ট্রাক্টর কল করা যায় না (যেমন s1.Student()); এতে কম্পাইল-টাইম এরর ঘটে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Constructors are not regular methods with callable identifiers."
  },
  {
    id: "q4",
    question: "What is the correct chronological sequence of steps performed by the JVM during the statement 'Student s = new Student();'?",
    options: [
      "1. Allocate heap memory -> 2. Default zero-initialization -> 3. Execute constructor body -> 4. Return heap memory address to reference 's'",
      "1. Execute constructor body -> 2. Allocate heap memory -> 3. Assign stack memory -> 4. Compile bytecode",
      "1. Assign reference 's' -> 2. Call destructor -> 3. Allocate heap memory -> 4. Run constructor",
      "1. Run garbage collection -> 2. Load bytecode -> 3. Execute constructor -> 4. Clear stack"
    ],
    answer: "1. Allocate heap memory -> 2. Default zero-initialization -> 3. Execute constructor body -> 4. Return heap memory address to reference 's'",
    correctAnswer: 0,
    explanation: "The JVM object creation lifecycle follows strict order: (1) Heap memory is allocated for instance variables; (2) Fields receive default zero values (0, null, false); (3) Instance initializers and the constructor execute; (4) The 32/64-bit reference address of the heap object is returned and stored in the stack reference variable `s`.",
    explanationBn: "JVM প্রথমে হিপে মেমরি বরাদ্দ করে, ডিফল্ট মান বসায়, তারপর কনস্ট্রাক্টর চালায় এবং শেষে রেফারেন্স অ্যাড্রেস ভ্যারিয়েবলে জমা করে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "Memory must be allocated before constructor can initialize fields."
  },
  {
    id: "q5",
    question: "How many times does the 'Book()' constructor execute upon running 'Book[] library = new Book[10];'?",
    options: [
      "0 times (Zero times)",
      "10 times",
      "1 time",
      "11 times"
    ],
    answer: "0 times (Zero times)",
    correctAnswer: 0,
    explanation: "Creating an array of objects like `new Book[10]` allocates memory for **10 reference pointers initialized to null**. It does **NOT** instantiate any actual `Book` objects. Therefore, the `Book()` constructor executes **0 times** until individual elements are created via `library[i] = new Book();`.",
    explanationBn: "Book[] library = new Book[10]; স্টেটমেন্টে শুধু ১০টি নাল (null) রেফারেন্সের অ্যারে তৈরি হয়, কোনো Book অবজেক্ট তৈরি না হওয়ায় কনস্ট্রাক্টর ০ বার চলে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "An array of references is not the same as an instantiated object."
  },
  {
    id: "q6",
    question: "If a class contains 'public void Student() { System.out.println(\"Hi\"); }', what happens when 'Student s = new Student();' is executed?",
    options: [
      "The method 'void Student()' is NOT treated as a constructor; the compiler supplies a default constructor and 'Hi' is NOT printed",
      "'Hi' is printed automatically upon instantiation",
      "The compiler throws an error stating duplicate class name",
      "The program terminates with a NoSuchMethodException"
    ],
    answer: "The method 'void Student()' is NOT treated as a constructor; the compiler supplies a default constructor and 'Hi' is NOT printed",
    correctAnswer: 0,
    explanation: "In Java, if a return type (even `void`) is specified before a method named after the class, Java treats it as a **standard member method**, NOT a constructor. Consequently, the default no-arg constructor runs silently and `void Student()` is never automatically invoked.",
    explanationBn: "যদি মেথডের নামের আগে void বা কোনো রিটার্ন টাইপ থাকে, তবে জাভা তাকে সাধারণ মেথড গণ্য করে; ফলে new Student() এ তা স্বয়ংক্রিয়ভাবে কল হয় না।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Constructors must NEVER have a return type, not even void."
  },
  {
    id: "q7",
    question: "Will the constructor execute when creating an anonymous object such as 'new Counter();' without storing it in a variable?",
    options: [
      "Yes, the constructor executes immediately during heap instantiation",
      "No, constructors only execute if a named reference variable is declared",
      "No, anonymous objects bypass constructor execution",
      "Only if the constructor is declared as static"
    ],
    answer: "Yes, the constructor executes immediately during heap instantiation",
    correctAnswer: 0,
    explanation: "An anonymous object is created on the heap via `new Counter()`. The constructor executes immediately. Even though no reference variable holds its memory address, the object is fully created and initialized before becoming eligible for garbage collection.",
    explanationBn: "হ্যাঁ, অ্যানোনিমাস অবজেক্ট (যেমন new Counter()) তৈরির সময়ও কনস্ট্রাক্টর তাৎক্ষণিকভাবে হিপ মেমরিতে চালু হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "The 'new' operator always triggers the constructor regardless of assignment."
  },
  {
    id: "q8",
    question: "What is the output of the following Java program?\n\nclass Item {\n    static int count = 0;\n    Item() {\n        count++;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Item a = new Item();\n        Item b = new Item();\n        Item c = new Item();\n        System.out.println(Item.count);\n    }\n}",
    options: [
      "3",
      "1",
      "0",
      "Compilation error"
    ],
    answer: "3",
    correctAnswer: 0,
    explanation: "Each time `new Item()` is called, the `Item()` constructor executes automatically. Since three objects (`a`, `b`, `c`) are instantiated, `count++` executes 3 times, resulting in `Item.count = 3`.",
    explanationBn: "তিনবার new Item() কল হওয়ায় কনস্ট্রাক্টর ৩ বার চলেছে, ফলে static ভ্যারিয়েবল count এর চূড়ান্ত মান ৩ হবে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Easy",
    hint: "Count how many times 'new Item()' was called."
  },
  {
    id: "q9",
    question: "When does the Java compiler automatically insert an implicit default constructor into a class?",
    options: [
      "Only when the developer defines NO constructors of any kind in the class",
      "Always, even if parameterized constructors are defined",
      "Only if the class extends an abstract class",
      "Only when all instance variables are declared private"
    ],
    answer: "Only when the developer defines NO constructors of any kind in the class",
    correctAnswer: 0,
    explanation: "The Java compiler provides a default no-argument constructor **only if and only when** the programmer has written zero constructors in the class. As soon as any constructor (no-arg or parameterized) is defined, the default constructor is suppressed.",
    explanationBn: "জাভা কম্পাইলার শুধুমাত্র তখনই একটি ডিফল্ট কনস্ট্রাক্টর যোগ করে যখন ক্লাসে ডেভেলপার নিজে কোনো কনস্ট্রাক্টর লেখেন না।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Defining any custom constructor disables the automatic default constructor."
  },
  {
    id: "q10",
    question: "How does the JVM select which constructor to automatically invoke when overloaded constructors exist?",
    options: [
      "By matching the number, types, and sequence of arguments passed inside 'new ClassName(...)'",
      "By selecting the constructor with the largest line count",
      "By picking the constructor declared first in the source file",
      "By choosing a constructor at random at runtime"
    ],
    answer: "By matching the number, types, and sequence of arguments passed inside 'new ClassName(...)'",
    correctAnswer: 0,
    explanation: "Java relies on **compile-time polymorphism (signature matching)**. The compiler inspects the arguments provided inside the parentheses of `new ClassName(arg1, arg2)` and binds it to the constructor with the identical parameter list signature.",
    explanationBn: "প্যারামিটারের সংখ্যা, ডেটা টাইপ ও ক্রমের সাথে হুবহু মিল রেখে JVM সঠিক ওভারলোডেড কনস্ট্রাক্টরটি নির্বাচন করে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Easy",
    hint: "Signature matching resolves constructor overloading."
  },
  {
    id: "q11",
    question: "Which statement is used inside a constructor to explicitly trigger another overloaded constructor in the same class?",
    options: [
      "this(...) as the very first statement in the constructor body",
      "super(...) as the last statement in the constructor body",
      "new self(...)",
      "call(...)"
    ],
    answer: "this(...) as the very first statement in the constructor body",
    correctAnswer: 0,
    explanation: "Constructor chaining within the same class is achieved using **`this(...)`**. Java enforces a strict rule that `this(...)` must be the **first line of code** inside the calling constructor.",
    explanationBn: "একই ক্লাসের অন্য কনস্ট্রাক্টর কল করতে this(...) ব্যবহার করা হয় এবং এটি অবশ্যই কনস্ট্রাক্টরের প্রথম লাইনে থাকতে হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Keyword used to refer to current class constructors."
  },
  {
    id: "q12",
    question: "What happens if a subclass constructor does not explicitly invoke 'super()' or 'this()' on its first line?",
    options: [
      "The compiler automatically inserts an invisible 'super()' call to invoke the superclass no-argument constructor",
      "The program generates a syntax error immediately",
      "The superclass is completely ignored and unallocated",
      "The subclass constructor aborts execution"
    ],
    answer: "The compiler automatically inserts an invisible 'super()' call to invoke the superclass no-argument constructor",
    correctAnswer: 0,
    explanation: "To ensure that parent class state is fully initialized, the Java compiler automatically prepends **`super();`** as the first instruction of any constructor that does not contain an explicit `this(...)` or `super(...)` call.",
    explanationBn: "যদি প্রথম লাইনে super() বা this() না লেখা হয়, তবে কম্পাইলার স্বয়ংক্রিয়ভাবে একটি অদৃশ্য super() কল যুক্ত করে দেয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Superclass initialization is mandatory in Java inheritance."
  },
  {
    id: "q13",
    question: "Can a constructor invoke regular instance methods or static methods during its automatic execution?",
    options: [
      "Yes, a constructor can call instance methods, static methods, and helper initializers",
      "No, constructors can only contain assignment statements",
      "Only static methods can be called, never instance methods",
      "Only if the method has private access"
    ],
    answer: "Yes, a constructor can call instance methods, static methods, and helper initializers",
    correctAnswer: 0,
    explanation: "Inside a constructor body, you can execute loops, conditional statements, call helper methods (like `validateAge()`), read configuration files, and invoke static utilities to properly configure the object state.",
    explanationBn: "হ্যাঁ, অবজেক্টের ডেটা ভ্যালিডেশন বা সেটআপের জন্য কনস্ট্রাক্টরের ভেতর থেকে অন্যান্য মেথড কল করা সম্পূর্ণ বৈধ।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Easy",
    hint: "Constructors support full Java statement logic."
  },
  {
    id: "q14",
    question: "What is the primary practical application of declaring a constructor with 'private' access modifier in Java?",
    options: [
      "To prevent external instantiation and implement patterns like the Singleton Pattern or static utility classes (e.g. java.lang.Math)",
      "To speed up JVM execution time by 50%",
      "To hide the class name from the IDE autocomplete",
      "To make all instance variables automatically public"
    ],
    answer: "To prevent external instantiation and implement patterns like the Singleton Pattern or static utility classes (e.g. java.lang.Math)",
    correctAnswer: 0,
    explanation: "A **private constructor** prevents other classes from creating instances via `new ClassName()`. This is standard in utility classes (like `Math` or `Arrays`) containing only static methods, and in the **Singleton Pattern** where only one controlled instance is permitted.",
    explanationBn: "প্রাইভেট কনস্ট্রাক্টর বাইরের কোনো ক্লাস থেকে new দিয়ে অবজেক্ট তৈরি বন্ধ করে দেয় (যেমন Singleton বা Math ক্লাসে)।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "Think about classes like java.lang.Math that should never be instantiated."
  },
  {
    id: "q15",
    question: "What error occurs if constructor A calls constructor B with 'this()', and constructor B calls constructor A with 'this()'?",
    options: [
      "Compile-time error: Recursive constructor invocation",
      "Runtime error: OutOfMemoryError",
      "Infinite loop freezing the CPU",
      "NullPointerException"
    ],
    answer: "Compile-time error: Recursive constructor invocation",
    correctAnswer: 0,
    explanation: "Java detects cyclic constructor dependency at compile time and emits a **'recursive constructor invocation'** compiler error. Constructors cannot form recursive calling loops.",
    explanationBn: "কনস্ট্রাক্টরের মধ্যে চক্রাকার কল (recursive invocation) তৈরি করলে জাভা কম্পাইলার সরাসরি এরর দেয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "Recursive constructor chaining is caught at compile time."
  },
  {
    id: "q16",
    question: "What is the order of execution between an Instance Initializer Block and a Constructor when 'new Demo()' is executed?",
    options: [
      "Instance Initializer Block executes FIRST, followed by the Constructor body",
      "Constructor body executes FIRST, followed by the Instance Initializer Block",
      "They execute simultaneously in parallel threads",
      "The Instance Initializer Block only executes when the object is destroyed"
    ],
    answer: "Instance Initializer Block executes FIRST, followed by the Constructor body",
    correctAnswer: 0,
    explanation: "Whenever an object is instantiated, the JVM copies the code of all **Instance Initializer Blocks (`{ ... }`)** into the constructor right after the `super()` call and **before** the remaining constructor statements. Thus, the initializer block always runs first.",
    explanationBn: "অবজেক্ট তৈরির সময় ইন্সট্যান্স ইনিশিয়ালাইজার ব্লক ({ ... }) কনস্ট্রাক্টরের মূল বডির কোড চলার ঠিক আগেই সম্পন্ন হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "Blocks initialize common code before custom constructor bodies."
  },
  {
    id: "q17",
    question: "In an inheritance hierarchy where 'class Sub extends Super', what is the exact order in which constructors execute upon 'new Sub()?'",
    options: [
      "Superclass constructor executes first, followed by Subclass constructor",
      "Subclass constructor executes first, followed by Superclass constructor",
      "Only the Subclass constructor executes; Superclass constructor is skipped",
      "Only the Superclass constructor executes"
    ],
    answer: "Superclass constructor executes first, followed by Subclass constructor",
    correctAnswer: 0,
    explanation: "In Java inheritance, constructor execution happens top-down: the **Superclass constructor completes first** (building the base foundation) before the **Subclass constructor** body executes.",
    explanationBn: "ইনহেরিটেন্সে আগে সুপারক্লাস (প্যারেন্ট) কনস্ট্রাক্টর সম্পন্ন হয়, তারপর সাবক্লাস (চাইল্ড) কনস্ট্রাক্টরের কাজ সম্পন্ন হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Parent foundation must be built before child features."
  },
  {
    id: "q18",
    question: "Which of the following modifiers is ILLEGAL on a constructor declaration in Java?",
    options: [
      "static, final, abstract, and synchronized",
      "public",
      "protected",
      "private"
    ],
    answer: "static, final, abstract, and synchronized",
    correctAnswer: 0,
    explanation: "Constructors can only take access modifiers (`public`, `protected`, `private`, default). They **cannot** be declared as `static` (they initialize instances), `final` (they cannot be overridden), `abstract` (they must have an implementation), or `synchronized`.",
    explanationBn: "কনস্ট্রাক্টরের সাথে static, final, abstract বা synchronized কিওয়ার্ড ব্যবহার করা নিষিদ্ধ ও বেআইনি।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Constructors cannot be static or overridden."
  },
  {
    id: "q19",
    question: "Why cannot a Java constructor be declared as 'final'?",
    options: [
      "Because constructors are never inherited by subclasses, making overriding impossible and 'final' redundant",
      "Because final is only reserved for local variables",
      "Because final constructors cause memory leaks",
      "Because final constructors cannot accept parameters"
    ],
    answer: "Because constructors are never inherited by subclasses, making overriding impossible and 'final' redundant",
    correctAnswer: 0,
    explanation: "The `final` keyword prevents method overriding in subclasses. Since **constructors are not inherited**, they can never be overridden, making `final` on a constructor conceptually invalid and illegal in Java syntax.",
    explanationBn: "কনস্ট্রাক্টর কখনো ইনহেরিট বা ওভাররাইড করা যায় না, তাই এদের 'final' ঘোষণা করা অর্থহীন এবং কম্পাইলার এরর তৈরি করে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "Constructors are not members inherited by child classes."
  },
  {
    id: "q20",
    question: "Where is the reference variable stored and where is the constructor-initialized object stored in memory?",
    options: [
      "Reference variable on the Stack; object data on the Heap",
      "Reference variable on the Heap; object data on the Stack",
      "Both are stored exclusively in CPU Registers",
      "Both are stored in Permanent Generation"
    ],
    answer: "Reference variable on the Stack; object data on the Heap",
    correctAnswer: 0,
    explanation: "In `Student s = new Student();`, the local reference variable `s` lives on the **Stack Frame**, while the actual `Student` object initialized by the constructor resides in dynamic **Heap Memory**.",
    explanationBn: "রেফারেন্স ভ্যারিয়েবলটি স্ট্যাক মেমরিতে এবং কনস্ট্রাক্টর দ্বারা গঠিত মূল অবজেক্টটি হিপ মেমরিতে অবস্থান করে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Local pointers on Stack, dynamic allocations on Heap."
  },
  {
    id: "q21",
    question: "What happens if an unhandled Exception is thrown inside a constructor body during object instantiation?",
    options: [
      "The instantiation fails, no reference address is returned, and the half-created object becomes eligible for garbage collection",
      "The JVM automatically fills missing fields with zeros and returns a valid reference",
      "The compiler deletes the class file",
      "The constructor restarts from line 1 in a retry loop"
    ],
    answer: "The instantiation fails, no reference address is returned, and the half-created object becomes eligible for garbage collection",
    correctAnswer: 0,
    explanation: "If an exception is thrown inside a constructor and not caught, the `new` expression aborts. The reference variable never receives an address, preventing incomplete or corrupted objects from polluting memory.",
    explanationBn: "কনস্ট্রাক্টরের ভেতর কোনো এক্সেপশন ঘটলে অবজেক্ট তৈরি বাতিল হয় এবং অসম্পূর্ণ অবজেক্টটি আবর্জনা হিসেবে মুছে ফেলার যোগ্য হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "An object must be fully constructed without exceptions to be valid."
  },
  {
    id: "q22",
    question: "How is a 'Copy Constructor' implemented and invoked in Java?",
    options: [
      "By defining a constructor that accepts an existing object of the same class: 'public Student(Student other)' and calling 'new Student(s1)'",
      "By using the 'copy' keyword before constructor name",
      "By calling the clone() method inside main() without new",
      "Java automatically provides a copy constructor for every class"
    ],
    answer: "By defining a constructor that accepts an existing object of the same class: 'public Student(Student other)' and calling 'new Student(s1)'",
    correctAnswer: 0,
    explanation: "Unlike C++, Java does not have a built-in copy constructor. Developers manually define one by accepting a parameter of the same class type and copying its field values: `public Student(Student other) { this.id = other.id; this.name = other.name; }`.",
    explanationBn: "জাভাতে একই ক্লাসের অবজেক্টকে প্যারামিটার হিসেবে গ্রহণ করে ফিল্ড কপি করার জন্য কাস্টম কপি কনস্ট্রাক্টর লেখা হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Pass an existing instance into a new instance constructor."
  },
  {
    id: "q23",
    question: "Consider the code: 'Student s = new Student(); s = new Student();' How many constructor executions occur and what happens to the first object?",
    options: [
      "2 constructor executions occur; the first object becomes unreferenced and eligible for Garbage Collection",
      "1 constructor execution occurs; the second statement reuses the first object",
      "0 constructor executions occur",
      "Compile-time error due to re-instantiating 's'"
    ],
    answer: "2 constructor executions occur; the first object becomes unreferenced and eligible for Garbage Collection",
    correctAnswer: 0,
    explanation: "Each `new Student()` statement creates a brand new distinct object on the heap and executes the constructor once (total 2 times). When `s` is reassigned to the second object, the first object loses its only reference and is queued for Garbage Collection.",
    explanationBn: "দুটি new কলের কারণে কনস্ট্রাক্টর ২ বার চলে; প্রথম অবজেক্টের রেফারেন্স হারিয়ে যাওয়ায় তা গার্বেজ কালেকশনের যোগ্য হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Every 'new' operator produces a separate heap object and constructor call."
  },
  {
    id: "q24",
    question: "Does the variable declaration 'Student s = null;' invoke any constructor in Java?",
    options: [
      "No, it merely creates a reference variable on the stack with a null pointer; no heap allocation or constructor occurs",
      "Yes, it invokes the default no-argument constructor",
      "Yes, it invokes a special null-constructor",
      "It causes a runtime NullPointerException"
    ],
    answer: "No, it merely creates a reference variable on the stack with a null pointer; no heap allocation or constructor occurs",
    correctAnswer: 0,
    explanation: "A reference declaration without `new` merely allocates stack space for storing an address. Since `new` is not evaluated, no memory is allocated on the heap and no constructor is invoked.",
    explanationBn: "Student s = null; স্টেটমেন্টে কেবল রেফারেন্স তৈরি হয়, হিপ মেমরিতে অবজেক্ট না তৈরি হওয়ায় কোনো কনস্ট্রাক্টর কল হয় না।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Easy",
    hint: "No 'new' keyword means no object instantiation."
  },
  {
    id: "q25",
    question: "In the expression 'Circle c = new Circle(Math.sqrt(25.0));', when is the argument expression 'Math.sqrt(25.0)' evaluated?",
    options: [
      "Evaluated first before entering the constructor body, passing 5.0 as the argument",
      "Evaluated after the constructor completes its body",
      "Evaluated in parallel during garbage collection",
      "Evaluated only when a method of 'c' is called"
    ],
    answer: "Evaluated first before entering the constructor body, passing 5.0 as the argument",
    correctAnswer: 0,
    explanation: "In Java expression evaluation rules, actual parameter expressions are evaluated from left to right **before** control transfers into the invoked constructor body. Thus `Math.sqrt(25.0)` evaluates to `5.0` first and is passed into `Circle(double r)`.",
    explanationBn: "কনস্ট্রাক্টরের ভেতর প্রবেশ করার আগেই প্যারামিটারের এক্সপ্রেশন (Math.sqrt(25.0) = 5.0) মূল্যায়িত হয়ে মান হিসেবে প্রেরিত হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Arguments are always computed before the method/constructor executes."
  },
  {
    id: "q26",
    question: "Is an empty 'return;' statement legal inside a Java constructor body?",
    options: [
      "Yes, 'return;' is valid for early exit from constructor execution, but 'return value;' is illegal",
      "No, the return keyword is strictly forbidden in any form inside a constructor",
      "Yes, and it can return integer status codes like 'return 0;'",
      "Only if the constructor is declared protected"
    ],
    answer: "Yes, 'return;' is valid for early exit from constructor execution, but 'return value;' is illegal",
    correctAnswer: 0,
    explanation: "You can write an empty **`return;`** to terminate constructor execution prematurely (e.g. after finding invalid configuration). However, attempting to return any value (e.g. `return 10;` or `return this;`) triggers a compile-time syntax error.",
    explanationBn: "কনস্ট্রাক্টরের কাজ মাঝপথে থামানোর জন্য খালি 'return;' ব্যবহার বৈধ, কিন্তু কোনো মান রিটার্ন (যেমন return 10;) করা নিষিদ্ধ।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "Empty return controls flow; returning data violates constructor rules."
  },
  {
    id: "q27",
    question: "What is the output of the following Java program?\n\nclass Sample {\n    Sample(int x) {\n        System.out.print(\"A\" + x + \" \");\n    }\n    Sample() {\n        this(5);\n        System.out.print(\"B \");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Sample s = new Sample();\n    }\n}",
    options: [
      "A5 B ",
      "B A5 ",
      "B ",
      "Compilation error"
    ],
    answer: "A5 B ",
    correctAnswer: 0,
    explanation: "Executing `new Sample()` calls the no-arg constructor. The first line `this(5)` invokes the parameterized constructor `Sample(int x)` which prints `\"A5 \"`. Control then returns to the no-arg constructor which prints `\"B \"`. Output: `\"A5 B \"`.",
    explanationBn: "this(5) এর কারণে প্রথমে প্যারামিটারাইজড কনস্ট্রাক্টর চলে 'A5 ' প্রিন্ট করে, এরপর নো-আর্গ কনস্ট্রাক্টরের বাকি অংশে 'B ' প্রিন্ট হয়।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Hard",
    hint: "Follow constructor chaining order with this()."
  },
  {
    id: "q28",
    question: "What is the key architectural purpose of the automatic invocation guarantee of constructors in Object-Oriented software design?",
    options: [
      "To guarantee that an object can never exist in memory in an uninitialized or corrupt state before member methods are called",
      "To reduce bytecode compilation file size on disk",
      "To allow multiple classes to share the same variable names",
      "To force all classes to be stored in the default package"
    ],
    answer: "To guarantee that an object can never exist in memory in an uninitialized or corrupt state before member methods are called",
    correctAnswer: 0,
    explanation: "The automatic invocation of constructors is a foundational integrity pillar in OOP. It guarantees that memory allocated for an entity is reliably and safely configured with valid initial states before any external code or method can interact with it.",
    explanationBn: "কনস্ট্রাক্টরের স্বয়ংক্রিয় সক্রিয়তা নিশ্চিত করে যে মেমরিতে থাকা প্রতিটি অবজেক্ট সবসময় সঠিক ও কার্যকরী প্রাথমিক মানে প্রস্তুত থাকে।",
    topic: "Automatic Invocation of Constructors when an Object is Created",
    difficulty: "Medium",
    hint: "Constructors guarantee object state integrity and safety."
  }
];

export default questions;
