const questions = [
  {
    id: "q1",
    question: "What is a Default Constructor in Java?",
    options: [
      "A constructor that takes no arguments (empty parameter list) and initializes instance variables to standard or predefined default values",
      "A constructor that can only be written in C++",
      "A constructor that deletes instance variables",
      "A constructor with 10 integer parameters"
    ],
    answer: "A constructor that takes no arguments (empty parameter list) and initializes instance variables to standard or predefined default values",
    correctAnswer: 0,
    explanation: "A **Default Constructor** (or No-Argument Constructor) does not accept any parameters. It sets fields to default initial states (such as zeros, nulls, or predefined defaults).",
    explanationBn: "ডিফল্ট কনস্ট্রাক্টর (নো-আর্গুমেন্ট কনস্ট্রাক্টর) কোনো প্যারামিটার গ্রহণ করে না এবং ফিল্ডগুলোকে প্রারম্ভিক ডিফল্ট মানে সেট করে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Takes zero arguments in its parameter list."
  },
  {
    id: "q2",
    question: "What is a Parameterized Constructor in Java?",
    options: [
      "A constructor that accepts one or more arguments to initialize an object's instance variables with custom, distinct values at creation time",
      "A constructor that does not accept any values",
      "A method that converts integers to floating point numbers",
      "A constructor that can only be invoked via the command line"
    ],
    answer: "A constructor that accepts one or more arguments to initialize an object's instance variables with custom, distinct values at creation time",
    correctAnswer: 0,
    explanation: "A **Parameterized Constructor** accepts parameters, allowing each instantiated object to start with unique, custom data supplied inside the `new ClassName(...)` call.",
    explanationBn: "প্যারামিটারাইজড কনস্ট্রাক্টর এক বা একাধিক আর্গুমেন্ট গ্রহণ করে অবজেক্ট তৈরির সময়েই বিভিন্ন অবজেক্টকে ভিন্ন ভিন্ন কাস্টম ডেটা দিয়ে সাজায়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Accepts parameters to initialize distinct object data."
  },
  {
    id: "q3",
    question: "What happens if a developer does NOT write any constructor in a Java class?",
    options: [
      "The Java compiler automatically generates a public, no-argument default constructor with an empty body",
      "The class cannot be instantiated under any circumstances",
      "A runtime exception is thrown when 'new' is executed",
      "The class becomes an abstract class"
    ],
    answer: "The Java compiler automatically generates a public, no-argument default constructor with an empty body",
    correctAnswer: 0,
    explanation: "If you provide no constructors, the compiler automatically inserts an invisible default constructor: `public ClassName() { super(); }`.",
    explanationBn: "ক্লাসে নিজে থেকে কোনো কনস্ট্রাক্টর না লিখলে জাভা কম্পাইলার স্বয়ংক্রিয়ভাবে একটি ডিফল্ট কনস্ট্রাক্টর যুক্ত করে দেয়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "The compiler provides a default helper."
  },
  {
    id: "q4",
    question: "What is the famous 'Compiler Default Constructor Trap' in Java?",
    options: [
      "If you write ANY custom constructor (e.g. parameterized), the compiler STOPS generating the automatic default constructor",
      "The compiler deletes your source files",
      "The default constructor runs in an infinite loop",
      "Parameterized constructors cannot take String arguments"
    ],
    answer: "If you write ANY custom constructor (e.g. parameterized), the compiler STOPS generating the automatic default constructor",
    correctAnswer: 0,
    explanation: "As soon as you define **even one** parameterized constructor, the compiler assumes you want strict control over object creation and **does NOT** provide the no-arg default constructor.",
    explanationBn: "যেকোনো একটি কাস্টম কনস্ট্রাক্টর লিখলেই কম্পাইলার স্বয়ংক্রিয় ডিফল্ট কনস্ট্রাক্টর দেওয়া বন্ধ করে দেয়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Writing a constructor disables the compiler's default."
  },
  {
    id: "q5",
    question: "Given: 'class Student { Student(String n) { } }'. What happens when compiling: 'Student s = new Student();'?",
    options: [
      "Compile-time error: 'constructor Student in class Student cannot be applied to given types: required: String; found: no arguments'",
      "Compiles successfully and initializes 'n' to null",
      "Throws a NullPointerException at runtime",
      "Creates an empty student object"
    ],
    answer: "Compile-time error: 'constructor Student in class Student cannot be applied to given types: required: String; found: no arguments'",
    correctAnswer: 0,
    explanation: "Because `Student(String)` was defined, the compiler suppressed the no-arg constructor. Calling `new Student()` fails at compile time because no matching no-arg constructor exists.",
    explanationBn: "যেহেতু Student(String) সংজ্ঞায়িত আছে, তাই আর্গুমেন্ট ছাড়া new Student() কল করলে কম্পাইল-টাইম এরর ঘটে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "No-arg constructor was not explicitly defined."
  },
  {
    id: "q6",
    question: "How can you fix the compilation error in the previous scenario to allow both 'new Student()' and 'new Student(\"Mamata\")'?",
    options: [
      "Explicitly define a no-argument constructor 'public Student() { }' in the class",
      "Change the class name to Main",
      "Make the String parameter static",
      "Delete the parameterized constructor"
    ],
    answer: "Explicitly define a no-argument constructor 'public Student() { }' in the class",
    correctAnswer: 0,
    explanation: "To support both instantiation styles, you must explicitly code a no-argument constructor (`public Student() { ... }`) alongside your parameterized constructor.",
    explanationBn: "উভয় সুবিধা পেতে ক্লাসে প্যারামিটারাইজড কনস্ট্রাক্টরের পাশাপাশি স্পষ্ট করে একটি নো-আর্গ কনস্ট্রাক্টর public Student() {} লিখে দিতে হবে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Explicitly add a no-arg constructor."
  },
  {
    id: "q7",
    question: "What is the primary advantage of a Parameterized Constructor over a Default Constructor?",
    options: [
      "It allows objects to be initialized with custom, distinct values at the exact moment of creation, avoiding subsequent multi-line setter calls",
      "It reduces bytecode file size",
      "It makes the class abstract",
      "It prevents garbage collection forever"
    ],
    answer: "It allows objects to be initialized with custom, distinct values at the exact moment of creation, avoiding subsequent multi-line setter calls",
    correctAnswer: 0,
    explanation: "A parameterized constructor enables clean, one-line instantiation with custom attributes (e.g. `new Employee(101, \"Raj\")`), ensuring immediate readiness without requiring separate field assignments.",
    explanationBn: "প্যারামিটারাইজড কনস্ট্রাক্টরের সাহায্যে এক লাইনেই কাস্টম ডেটা দিয়ে অবজেক্ট প্রস্তুত করা যায়, বারবার সেটার ডাকার দরকার হয় না।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Direct custom initialization in a single line."
  },
  {
    id: "q8",
    question: "What is the output of the following Java program?\n\nclass Box {\n    int length, breadth;\n    Box() {\n        length = 5;\n        breadth = 10;\n    }\n    Box(int l, int b) {\n        length = l;\n        breadth = b;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        Box b2 = new Box(3, 4);\n        System.out.println(b1.length * b1.breadth + \" \" + b2.length * b2.breadth);\n    }\n}",
    options: [
      "50 12",
      "12 50",
      "0 0",
      "Compilation error"
    ],
    answer: "50 12",
    correctAnswer: 0,
    explanation: "`b1` uses the default constructor (`5 * 10 = 50`). `b2` uses the parameterized constructor (`3 * 4 = 12`). Output is `50 12`.",
    explanationBn: "b1 ডিফল্ট কনস্ট্রাক্টর পেয়ে 5*10=50 এবং b2 প্যারামিটার পেয়ে 3*4=12 হবে; ফলে আউটপুট 50 12।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "5*10 and 3*4."
  },
  {
    id: "q9",
    question: "Can a class have BOTH a Default Constructor and multiple Parameterized Constructors?",
    options: [
      "Yes, this is standard Constructor Overloading in Java",
      "No, only one type is permitted per class",
      "Only if they are defined in separate packages",
      "Only if one of them is static"
    ],
    answer: "Yes, this is standard Constructor Overloading in Java",
    correctAnswer: 0,
    explanation: "A class can contain a default constructor along with multiple parameterized constructors. The compiler selects the appropriate one based on arguments provided at `new`.",
    explanationBn: "হ্যাঁ, এটি জাভাতে অত্যন্ত প্রচলিত এবং একে কনস্ট্রাক্টর ওভারলোডিং বলা হয়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Multiple constructors with distinct signatures."
  },
  {
    id: "q10",
    question: "What access level does the compiler-generated default constructor possess by default?",
    options: [
      "The same access modifier as the class itself (e.g. public for a public class)",
      "Always private",
      "Always protected",
      "Always static"
    ],
    answer: "The same access modifier as the class itself (e.g. public for a public class)",
    correctAnswer: 0,
    explanation: "The compiler assigns the default constructor the **exact same access level as the declaring class**. If the class is `public`, the default constructor is `public`; if the class is package-private, the constructor is package-private.",
    explanationBn: "কম্পাইলারের তৈরি ডিফল্ট কনস্ট্রাক্টরের অ্যাক্সেস লেভেল ক্লাসের নিজস্ব অ্যাক্সেস লেভেলের (যেমন public) অনুরূপ হয়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Hard",
    hint: "Mirrors the access level of the enclosing class."
  },
  {
    id: "q11",
    question: "What is the body of the automatic default constructor generated by the Java compiler?",
    options: [
      "It contains only a single instruction: 'super();' to invoke the superclass no-arg constructor",
      "It fills all memory with random numbers",
      "It prints 'Default constructor executed' to console",
      "It has 100 lines of system diagnostics"
    ],
    answer: "It contains only a single instruction: 'super();' to invoke the superclass no-arg constructor",
    correctAnswer: 0,
    explanation: "The compiler-generated default constructor has an empty body containing only an implicit call to `super();` (invoking the parent `Object` constructor).",
    explanationBn: "কম্পাইলারের ডিফল্ট কনস্ট্রাক্টরে মূলত শুধু 'super();' কলটি থাকে যাতে প্যারেন্ট ক্লাসের প্রারম্ভিক কাজ সম্পন্ন হয়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Hard",
    hint: "Delegates to the parent class constructor."
  },
  {
    id: "q12",
    question: "In a parameterized constructor, what is 'Variable Shadowing'?",
    options: [
      "When a parameter name is identical to an instance variable name, hiding the instance variable within that constructor scope",
      "When an object is deleted by garbage collection",
      "When two classes have the same package name",
      "When a method returns null"
    ],
    answer: "When a parameter name is identical to an instance variable name, hiding the instance variable within that constructor scope",
    correctAnswer: 0,
    explanation: "If an instance variable is `name` and the parameter is `name`, the parameter shadows the instance field. Assigning `name = name;` assigns the parameter to itself; `this.name = name;` is required to target the field.",
    explanationBn: "প্যারামিটারের নাম ও ফিল্ডের নাম একই হলে লোকাল প্যারামিটারটি ক্লাসের ফিল্ডকে ঢেকে ফেলে, যাকে শ্যাডোয়িং বলে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Local parameter hides the instance field of identical name."
  },
  {
    id: "q13",
    question: "What happens if you write 'id = id;' inside 'public Employee(int id) { id = id; }' where 'id' is also an instance variable?",
    options: [
      "The local parameter 'id' is assigned to itself; the instance variable 'id' remains untouched at its default 0",
      "The instance variable is updated correctly",
      "A compile-time error occurs",
      "A runtime exception is thrown"
    ],
    answer: "The local parameter 'id' is assigned to itself; the instance variable 'id' remains untouched at its default 0",
    correctAnswer: 0,
    explanation: "Without `this.id = id;`, the statement `id = id;` merely reassigns the local parameter to itself. The instance field `this.id` remains `0`.",
    explanationBn: "'this' ছাড়া 'id = id;' লিখলে শুধু লোকাল ভ্যারিয়েবল পরিবর্তিত হয়, মূল অবজেক্টের ফিল্ড 0 তেই অপরিবর্তিত থাকে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "A common bug caused by omitting 'this'."
  },
  {
    id: "q14",
    question: "Which of the following classes demonstrates a user-defined default constructor?",
    options: [
      "class Car { Car() { speed = 0; } }",
      "class Car { Car(int s) { speed = s; } }",
      "class Car { void Car() { } }",
      "class Car { }"
    ],
    answer: "class Car { Car() { speed = 0; } }",
    correctAnswer: 0,
    explanation: "`Car() { speed = 0; }` is a user-defined default constructor because it takes zero parameters, matches the class name, and has no return type.",
    explanationBn: "Car() { speed = 0; } একটি ইউজার-ডিফাইন্ড নো-আর্গুমেন্ট ডিফল্ট কনস্ট্রাক্টরের সঠিক উদাহরণ।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Matches class name with empty parameter list."
  },
  {
    id: "q15",
    question: "Can a parameterized constructor accept an object reference of another class as a parameter?",
    options: [
      "Yes, constructors can accept any valid Java type including primitives, Strings, arrays, and other objects",
      "No, only primitive types like int and double are allowed",
      "Only String parameters are allowed",
      "Only arrays are allowed"
    ],
    answer: "Yes, constructors can accept any valid Java type including primitives, Strings, arrays, and other objects",
    correctAnswer: 0,
    explanation: "Constructors can accept any reference type. For example, `public Student(String name, Address addr)` accepts a custom `Address` object to establish aggregation.",
    explanationBn: "হ্যাঁ, কনস্ট্রাক্টরে প্রিমিটিভ, স্ট্রিং, অ্যারে বা অন্য যেকোনো ক্লাসের অবজেক্ট প্যারামিটার হিসেবে পাঠানো যায়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Reference types are fully supported in parameter lists."
  },
  {
    id: "q16",
    question: "What is a Copy Constructor in Java design?",
    options: [
      "A parameterized constructor that takes an existing object of the same class to create a new object with duplicate state",
      "A constructor that copies files on the hard disk",
      "A constructor that prints text to a Xerox machine",
      "A built-in keyword in Java"
    ],
    answer: "A parameterized constructor that takes an existing object of the same class to create a new object with duplicate state",
    correctAnswer: 0,
    explanation: "A Copy Constructor has the signature `public ClassName(ClassName original)`. It copies fields from `original` into the newly created instance (`new ClassName(obj)`).",
    explanationBn: "কপি কনস্ট্রাক্টর একই ক্লাসের অন্য একটি অবজেক্টকে প্যারামিটার হিসেবে নিয়ে তার ডেটা হুবহু নতুন অবজেক্টে কপি করে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Creates a clone/copy of an existing object."
  },
  {
    id: "q17",
    question: "What is the output of the following Java program?\n\nclass Circle {\n    double radius;\n    Circle() {\n        this(1.0);\n    }\n    Circle(double r) {\n        radius = r;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Circle c1 = new Circle();\n        Circle c2 = new Circle(3.5);\n        System.out.println(c1.radius + \", \" + c2.radius);\n    }\n}",
    options: [
      "1.0, 3.5",
      "0.0, 3.5",
      "3.5, 3.5",
      "Compilation error"
    ],
    answer: "1.0, 3.5",
    correctAnswer: 0,
    explanation: "`c1` calls the default constructor which delegates via `this(1.0)` to the parameterized constructor setting `radius = 1.0`. `c2` calls the parameterized constructor setting `radius = 3.5`.",
    explanationBn: "c1 ডিফল্ট কনস্ট্রাক্টর থেকে this(1.0) এর মাধ্যমে 1.0 পায় এবং c2 সরাসরি 3.5 পায়; আউটপুট হবে '1.0, 3.5'।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Default constructor delegates to parameterized constructor with 1.0."
  },
  {
    id: "q18",
    question: "Why should developers explicitly declare a default constructor when creating parameterized constructors for JavaBeans or frameworks?",
    options: [
      "Many frameworks (e.g. Hibernate, JPA, JSON serializers) require a no-arg constructor to instantiate objects via reflection",
      "To prevent the program from using RAM",
      "Because Java forbids having only parameterized constructors",
      "To change the font color of the IDE"
    ],
    answer: "Many frameworks (e.g. Hibernate, JPA, JSON serializers) require a no-arg constructor to instantiate objects via reflection",
    correctAnswer: 0,
    explanation: "Modern enterprise frameworks instantiate classes dynamically via Reflection (`Class.newInstance()`), which strictly demands the presence of a public no-argument default constructor.",
    explanationBn: "বিভিন্ন ফ্রেমওয়ার্ক (যেমন JPA, JSON পার্সার) রিফ্লেকশনের মাধ্যমে অবজেক্ট তৈরিতে নো-আর্গ কনস্ট্রাক্টরের উপস্থিতি বাধ্যতামূলক মনে করে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Hard",
    hint: "Frameworks use reflection to instantiate via empty constructor."
  },
  {
    id: "q19",
    question: "Can a default constructor call a parameterized constructor in the same class?",
    options: [
      "Yes, using 'this(arg1, arg2)' as the first line of the default constructor",
      "No, default constructors cannot interact with parameterized constructors",
      "Only through the super keyword",
      "Only if the method is static"
    ],
    answer: "Yes, using 'this(arg1, arg2)' as the first line of the default constructor",
    correctAnswer: 0,
    explanation: "A default constructor can easily delegate default values to a parameterized constructor using `this(...)` (e.g. `public Student() { this(0, \"Unknown\"); }`).",
    explanationBn: "হ্যাঁ, ডিফল্ট কনস্ট্রাক্টরের প্রথম লাইনে this(...) লিখে প্যারামিটারাইজড কনস্ট্রাক্টরে ডিফল্ট মান পাঠানো যায়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Constructor chaining with this()."
  },
  {
    id: "q20",
    question: "Can a parameterized constructor call a default constructor in the same class?",
    options: [
      "Yes, using 'this()' as the first line in the parameterized constructor",
      "No, only default can call parameterized",
      "Only if the class is final",
      "Only if arguments are negative"
    ],
    answer: "Yes, using 'this()' as the first line in the parameterized constructor",
    correctAnswer: 0,
    explanation: "Any constructor in a class can invoke another constructor using `this(...)` or `this()`, as long as it is the first statement and no circular recursion occurs.",
    explanationBn: "হ্যাঁ, প্যারামিটারাইজড কনস্ট্রাক্টরের প্রথম লাইনে this() লিখে নো-আর্গুমেন্ট কনস্ট্রাক্টর কল করা সম্ভব।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Chaining works in both directions as long as no cycle exists."
  },
  {
    id: "q21",
    question: "What is the maximum number of parameters a parameterized constructor can accept in Java?",
    options: [
      "254 parameters (JVM specification limit for method/constructor argument lists)",
      "Exactly 2 parameters",
      "Maximum 10 parameters",
      "Unlimited without any JVM limit"
    ],
    answer: "254 parameters (JVM specification limit for method/constructor argument lists)",
    correctAnswer: 0,
    explanation: "According to the Java Virtual Machine (JVM) specification, a method or constructor parameter list cannot exceed 254/255 slots (accounting for `this`). Practically, having more than 4-5 parameters is discouraged in clean code design.",
    explanationBn: "JVM স্পেসিফিকেশন অনুযায়ী সর্বোচ্চ ২৫৪/২৫৫ টি প্যারামিটার নেওয়া সম্ভব, যদিও পরিষ্কার কোডের জন্য ৪-৫ টির বেশি না রাখাই ভালো।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Hard",
    hint: "JVM specification limit is around 254."
  },
  {
    id: "q22",
    question: "When should you choose a Default Constructor over a Parameterized Constructor in real-world software?",
    options: [
      "When all newly created entities share predictable baseline settings (e.g., initial bank balance ₹0, active status false)",
      "When every single customer has a unique identity known before creation",
      "When the class has no variables",
      "When creating static methods"
    ],
    answer: "When all newly created entities share predictable baseline settings (e.g., initial bank balance ₹0, active status false)",
    correctAnswer: 0,
    explanation: "Default constructors are best when objects should start with standardized, uniform baseline defaults that may later be configured gradually.",
    explanationBn: "যখন সব অবজেক্টের প্রাথমিক মান একই রকম বা প্রমিত থাকে (যেমন প্রারম্ভিক স্কোর ০), তখন ডিফল্ট কনস্ট্রাক্টর আদর্শ।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Uniform standard starting state."
  },
  {
    id: "q23",
    question: "What is the output of the following Java program?\n\nclass Person {\n    String name;\n    Person() {\n        name = \"Anonymous\";\n    }\n    Person(String n) {\n        name = n;\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Person p1 = new Person();\n        Person p2 = new Person(\"Susmita\");\n        System.out.println(p1.name + \" & \" + p2.name);\n    }\n}",
    options: [
      "Anonymous & Susmita",
      "Susmita & Anonymous",
      "null & Susmita",
      "Anonymous & null"
    ],
    answer: "Anonymous & Susmita",
    correctAnswer: 0,
    explanation: "`p1` invokes the no-arg constructor which assigns `\"Anonymous\"`. `p2` invokes the parameterized constructor which assigns `\"Susmita\"`. Result is `\"Anonymous & Susmita\"`.",
    explanationBn: "p1 নো-আর্গ কনস্ট্রাক্টরে 'Anonymous' এবং p2 প্যারামিটার পেয়ে 'Susmita' পায়; ফলাফল 'Anonymous & Susmita'।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "No-arg sets Anonymous, parameterized sets Susmita."
  },
  {
    id: "q24",
    question: "If a class defines ONLY 'public Product(int code, String name)', how can a client instantiate a Product object?",
    options: [
      "ONLY by passing an integer and a String, e.g., 'new Product(101, \"Pen\")'",
      "By calling 'new Product()' with no arguments",
      "By calling 'Product.create()'",
      "By declaring 'Product p;'"
    ],
    answer: "ONLY by passing an integer and a String, e.g., 'new Product(101, \"Pen\")'",
    correctAnswer: 0,
    explanation: "Since only the 2-parameter constructor exists, the only legal way to instantiate `Product` is by supplying arguments matching that exact signature.",
    explanationBn: "যেহেতু শুধু Product(int, String) আছে, তাই new Product(101, 'Pen') দিয়েই কেবল অবজেক্ট তৈরি করা সম্ভব।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Must supply matching arguments."
  },
  {
    id: "q25",
    question: "Can a parameterized constructor have default parameter values in Java syntax like in Python or C++ (e.g. 'int x = 10')?",
    options: [
      "No, Java does NOT support default parameter values in method or constructor signatures; constructor overloading must be used instead",
      "Yes, using the ':=' operator",
      "Yes, for all primitive parameters",
      "Only in Java 19+"
    ],
    answer: "No, Java does NOT support default parameter values in method or constructor signatures; constructor overloading must be used instead",
    correctAnswer: 0,
    explanation: "Java does not support default argument syntax (`int x = 10`). In Java, default values are provided by **overloading constructors** and delegating with `this(...)`.",
    explanationBn: "জাভাতে পাইথন বা C++ এর মতো ডিফল্ট প্যারামিটার সিনট্যাক্স নেই; এর বদলে কনস্ট্রাক্টর ওভারলোডিং ব্যবহার করা হয়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Hard",
    hint: "Java achieves default parameters via constructor overloading."
  },
  {
    id: "q26",
    question: "In CBSE Class XII IT 802, what is the best practice when writing a class with instance variables?",
    options: [
      "Provide both a default constructor (for baseline creation) and one or more parameterized constructors (for custom initialization)",
      "Never write any constructors",
      "Make all constructors private",
      "Write only static methods without constructors"
    ],
    answer: "Provide both a default constructor (for baseline creation) and one or more parameterized constructors (for custom initialization)",
    correctAnswer: 0,
    explanation: "Providing both a default constructor and parameterized constructors gives callers full flexibility: they can instantiate blank entities or fully configured entities in a single step.",
    explanationBn: "সিবিএসই পরীক্ষায় এবং প্রফেশনাল কোডিংয়ে ডিফল্ট ও প্যারামিটারাইজড উভয় কনস্ট্রাক্টর রাখাই সর্বোত্তম প্র্যাকটিস।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Offers maximum flexibility for object creation."
  },
  {
    id: "q27",
    question: "What happens if a parameterized constructor assigns values to static variables?",
    options: [
      "It modifies the single shared class variable for all instances every time an object is instantiated",
      "It causes a compilation error",
      "It creates a new copy of the static variable on the heap",
      "It deletes the static variable"
    ],
    answer: "It modifies the single shared class variable for all instances every time an object is instantiated",
    correctAnswer: 0,
    explanation: "Static variables are shared across all instances. If a constructor mutates a static variable (like `totalObjects++`), that change affects all objects across the whole application.",
    explanationBn: "কনস্ট্রাক্টরের ভেতর static ভ্যারিয়েবল পরিবর্তন করলে তা পুরো অ্যাপ্লিকেশনে থাকা সব অবজেক্টের জন্য একযোগে পরিবর্তিত হয়।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Medium",
    hint: "Static variables are shared by all instances."
  },
  {
    id: "q28",
    question: "Summary comparison: Which statement is 100% TRUE regarding Default and Parameterized constructors?",
    options: [
      "Default constructors accept zero arguments, while Parameterized constructors accept one or more arguments for flexible initialization",
      "Default constructors have return type void; Parameterized have return type int",
      "Default constructors cannot be written by developers",
      "Parameterized constructors are executed by the garbage collector"
    ],
    answer: "Default constructors accept zero arguments, while Parameterized constructors accept one or more arguments for flexible initialization",
    correctAnswer: 0,
    explanation: "Default constructors require zero parameters, whereas parameterized constructors take one or more typed parameters. Neither constructor has any return type.",
    explanationBn: "ডিফল্ট কনস্ট্রাক্টরে কোনো আর্গুমেন্ট থাকে না, আর প্যারামিটারাইজড কনস্ট্রাক্টরে নির্দিষ্ট কাস্টম মানের জন্য এক বা একাধিক আর্গুমেন্ট থাকে।",
    topic: "Types of Constructors: Default vs Parameterized",
    difficulty: "Easy",
    hint: "Zero arguments vs one or more typed arguments."
  }
];

export default questions;
