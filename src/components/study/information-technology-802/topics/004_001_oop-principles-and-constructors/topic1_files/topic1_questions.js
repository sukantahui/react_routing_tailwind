const questions = [
  {
    id: "q1",
    question: "What is a Class in Java Object-Oriented Programming?",
    options: [
      "A user-defined template or blueprint that defines the variables (state) and methods (behavior) common to all objects of its kind",
      "A specific physical memory block located inside the CPU cache",
      "An operating system thread that executes bytecode",
      "A compiled executable binary file with .exe extension"
    ],
    answer: "A user-defined template or blueprint that defines the variables (state) and methods (behavior) common to all objects of its kind",
    correctAnswer: 0,
    explanation: "A **Class** in Java is a conceptual blueprint or template. It does not occupy memory for instance data until objects are instantiated from it.",
    explanationBn: "ক্লাস হলো অবজেক্ট তৈরির একটি ব্লুপ্রিন্ট বা নকশা, যা অবজেক্টের ফিল্ড (state) এবং মেথড (behavior) নির্ধারণ করে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "Think of an architectural blueprint for a building."
  },
  {
    id: "q2",
    question: "What is an Object in Java?",
    options: [
      "A runtime instance of a class that occupies memory and possesses state and behavior",
      "A static keyword used to declare variables",
      "A compiler tool used to format source code",
      "A special comment line ignored by JVM"
    ],
    answer: "A runtime instance of a class that occupies memory and possesses state and behavior",
    correctAnswer: 0,
    explanation: "An **Object** is a concrete runtime instance of a class created in heap memory. It has distinct state (values of its instance variables) and behavior (methods defined by its class).",
    explanationBn: "অবজেক্ট হলো ক্লাসের একটি বাস্তব রূপ যা মেমরিতে জায়গা দখল করে এবং নিজস্ব ডেটা ও আচরণ ধারণ করে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "If class is the blueprint, object is the actual constructed house."
  },
  {
    id: "q3",
    question: "Which operator is strictly used in Java to dynamically allocate heap memory for an object?",
    options: [
      "new operator",
      "malloc operator",
      "create operator",
      "alloc operator"
    ],
    answer: "new operator",
    correctAnswer: 0,
    explanation: "Java uses the **`new`** operator exclusively to allocate dynamic memory on the Heap for new object instances and arrays.",
    explanationBn: "জাভাতে হিপ মেমরিতে অবজেক্ট বা অ্যারের জন্য নতুন মেমরি বরাদ্দ করতে 'new' অপারেটর ব্যবহার করা হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "The three-letter keyword used in every object instantiation."
  },
  {
    id: "q4",
    question: "In the statement 'Student s1 = new Student();', which part represents the object Declaration?",
    options: [
      "Student s1",
      "=",
      "new",
      "Student()"
    ],
    answer: "Student s1",
    correctAnswer: 0,
    explanation: "**`Student s1`** is the declaration part. It reserves space on the Stack for a reference variable named `s1` capable of holding the memory address of a `Student` object.",
    explanationBn: "'Student s1' অংশটি হলো রেফারেন্স ভ্যারিয়েবলের ডিক্লারেশন (Declaration), যা স্ট্যাক মেমরিতে সংরক্ষিত হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Specifies the class type and the variable name."
  },
  {
    id: "q5",
    question: "In the statement 'Student s1 = new Student();', which part represents the Instantiation and Initialization?",
    options: [
      "'new' instantiates (allocates heap memory) and 'Student()' initializes the object state via constructor",
      "'Student s1' initializes and 'new' compiles the class",
      "'=' allocates CPU cache",
      "None of these"
    ],
    answer: "'new' instantiates (allocates heap memory) and 'Student()' initializes the object state via constructor",
    correctAnswer: 0,
    explanation: "**Instantiation** is performed by `new` (allocating memory block on the heap), while **Initialization** is performed by invoking the constructor `Student()` to set initial field values.",
    explanationBn: "'new' হিপে মেমরি তৈরি করে (Instantiation) এবং 'Student()' কনস্ট্রাক্টরের মাধ্যমে ফিল্ডের প্রাথমিক মান নির্ধারণ করে (Initialization)।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Memory allocation + Constructor execution."
  },
  {
    id: "q6",
    question: "Where are object reference variables and actual object instances stored in Java memory architecture?",
    options: [
      "Reference variables reside in Stack Memory; object instances reside in Heap Memory",
      "Reference variables reside in Heap; objects reside in Stack",
      "Both are stored exclusively in the Code segment",
      "Both are stored in permanent ROM"
    ],
    answer: "Reference variables reside in Stack Memory; object instances reside in Heap Memory",
    correctAnswer: 0,
    explanation: "Local reference variables (pointers) live on the **Stack frame** of the executing thread, while the dynamic object bodies containing instance fields are allocated in the **Heap Memory**.",
    explanationBn: "লোকাল রেফারেন্স ভ্যারিয়েবলগুলো স্ট্যাক মেমরিতে এবং অবজেক্টের মূল ডেটা হিপ মেমরিতে সংরক্ষিত থাকে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Pointers on stack, allocated memory on heap."
  },
  {
    id: "q7",
    question: "What are the default values assigned to instance variables of types int, double, boolean, and String if not explicitly initialized?",
    options: [
      "int: 0, double: 0.0, boolean: false, String: null",
      "int: 1, double: 1.0, boolean: true, String: ''",
      "int: undefined, double: undefined, boolean: false, String: 'null'",
      "int: -1, double: 0, boolean: null, String: empty"
    ],
    answer: "int: 0, double: 0.0, boolean: false, String: null",
    correctAnswer: 0,
    explanation: "Java guarantees default zero-initialization for all instance variables on the heap: integer types get `0`, floating points get `0.0`, booleans get `false`, and reference types get `null`.",
    explanationBn: "হিপের ইন্সট্যান্স ভ্যারিয়েবলগুলোর ডিফল্ট মান: int এর জন্য 0, double এর জন্য 0.0, boolean এর জন্য false এবং অবজেক্ট রেফারেন্সের জন্য null।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "Numeric zeros, false for boolean, null for references."
  },
  {
    id: "q8",
    question: "Which operator is used to access an object's instance variables and member methods in Java?",
    options: [
      "Dot (.) operator",
      "Arrow (->) operator",
      "Scope resolution (::) operator",
      "Tilde (~) operator"
    ],
    answer: "Dot (.) operator",
    correctAnswer: 0,
    explanation: "In Java, members (fields and methods) of an object are accessed using the **dot (`.`) operator** (e.g. `s1.name = 'Mamata'; s1.calculateGrade();`).",
    explanationBn: "জাভাতে অবজেক্টের ফিল্ড বা মেথড ব্যবহারের জন্য ডট (.) অপারেটর প্রয়োগ করা হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "A single period between the object name and the member name."
  },
  {
    id: "q9",
    question: "What happens when you execute the statement: 's1 = null;' where 's1' is the only reference pointing to a heap object?",
    options: [
      "The heap object becomes unreferenced (orphaned) and eligible for Garbage Collection",
      "The program deletes the .class file from hard disk",
      "The computer memory is immediately wiped",
      "The JVM terminates with a NullPointerException"
    ],
    answer: "The heap object becomes unreferenced (orphaned) and eligible for Garbage Collection",
    correctAnswer: 0,
    explanation: "Setting `s1 = null` severs the reference link. Since no other reference variable points to that object on the heap, it becomes unreachable and will be reclaimed by Java's automatic Garbage Collector.",
    explanationBn: "রেফারেন্স নাল (null) করে দিলে অবজেক্টটি বিচ্ছিন্ন হয়ে পড়ে এবং স্বয়ংক্রিয় গার্বেজ কালেক্টরের মাধ্যমে মেমরি খালি করার উপযুক্ত হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Unreachable memory is cleared by GC."
  },
  {
    id: "q10",
    question: "What runtime exception is thrown if you try to call a method on a reference variable that currently holds 'null' (e.g. 'Student s = null; s.display();')?",
    options: [
      "java.lang.NullPointerException",
      "java.lang.ArrayIndexOutOfBoundsException",
      "java.lang.ClassCastException",
      "java.lang.IllegalArgumentException"
    ],
    answer: "java.lang.NullPointerException",
    correctAnswer: 0,
    explanation: "Attempting to dereference a `null` variable (invoking a method or accessing a field) causes the JVM to throw a **`NullPointerException`** at runtime.",
    explanationBn: "নাল (null) রেফারেন্সের ওপর মেথড বা ফিল্ড অ্যাক্সেস করতে গেলে JVM 'NullPointerException' ছুঁড়ে দেয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "One of the most famous exceptions in Java."
  },
  {
    id: "q11",
    question: "Consider the code: 'Student s1 = new Student(); Student s2 = s1;' How many Student objects exist on the heap and how many reference variables exist?",
    options: [
      "1 Object on Heap, 2 Reference Variables on Stack pointing to the SAME object",
      "2 Objects on Heap, 2 Reference Variables on Stack",
      "0 Objects on Heap, 1 Reference Variable",
      "2 Objects on Heap, 1 Reference Variable"
    ],
    answer: "1 Object on Heap, 2 Reference Variables on Stack pointing to the SAME object",
    correctAnswer: 0,
    explanation: "Only one `new Student()` was evaluated, so **exactly 1 object** is created on the heap. The assignment `s2 = s1` copies the memory address from `s1` into `s2`, so both references point to that single object.",
    explanationBn: "যেহেতু 'new' একবারই চলেছে, তাই হিপে মাত্র ১টি অবজেক্ট থাকবে এবং স্ট্যাকের দুটি রেফারেন্স (s1 ও s2) একই অবজেক্টকে নির্দেশ করবে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Assignment of references copies the pointer, not the object."
  },
  {
    id: "q12",
    question: "Continuing from the previous question, if 's1.rollNo = 105;' is executed, what is the value of 's2.rollNo'?",
    options: [
      "105",
      "0",
      "null",
      "Compilation error"
    ],
    answer: "105",
    correctAnswer: 0,
    explanation: "Because `s1` and `s2` refer to the identical object in heap memory, mutating the object's state via `s1.rollNo` is immediately visible when inspected via `s2.rollNo`.",
    explanationBn: "s1 এবং s2 একই অবজেক্ট নির্দেশ করায় s1 দিয়ে মান পরিবর্তন করলে s2 তেও 105 পাওয়া যাবে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "Both references view the same underlying memory block."
  },
  {
    id: "q13",
    question: "What is an Anonymous Object in Java?",
    options: [
      "An object created with 'new ClassName()' that is not assigned to any named reference variable",
      "An object with a private name field",
      "An object encrypted with SHA-256",
      "An object defined without any class"
    ],
    answer: "An object created with 'new ClassName()' that is not assigned to any named reference variable",
    correctAnswer: 0,
    explanation: "An **Anonymous Object** is instantiated without assigning its memory reference to a variable (e.g. `new Calculator().add(5, 10);`). It is typically used for one-time method invocations.",
    explanationBn: "অ্যানোনিমাস অবজেক্ট হলো এমন অবজেক্ট যা কোনো ভ্যারিয়েবলে সংরক্ষণ না করে সরাসরি এককালীন ব্যবহারের জন্য তৈরি হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Created without an identifier name on the left side of '='."
  },
  {
    id: "q14",
    question: "What is the difference between Instance Variables and Local Variables in Java?",
    options: [
      "Instance variables are declared inside a class but outside methods and have default values; local variables are declared inside methods and have NO default values",
      "Instance variables are stored in CPU registers; local variables are stored in hard drives",
      "Instance variables must be static; local variables must be final",
      "Local variables exist forever; instance variables are deleted immediately"
    ],
    answer: "Instance variables are declared inside a class but outside methods and have default values; local variables are declared inside methods and have NO default values",
    correctAnswer: 0,
    explanation: "**Instance variables** belong to the object on the heap and receive default values (0, null, etc.). **Local variables** exist only within the method stack frame and must be explicitly initialized before reading.",
    explanationBn: "ইন্সট্যান্স ভ্যারিয়েবল ক্লাসের ভেতর মেথডের বাইরে থাকে এবং ডিফল্ট মান পায়; লোকাল ভ্যারিয়েবল মেথডের ভেতর থাকে এবং ব্যবহারের পূর্বে মান দিতে হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Hard",
    hint: "Scope inside method vs scope throughout the class."
  },
  {
    id: "q15",
    question: "What is the output of the following Java code snippet?\n\nclass Box {\n    int width;\n}\npublic class Test {\n    public static void main(String[] args) {\n        Box b;\n        // System.out.println(b.width);\n    }\n}",
    options: [
      "If uncommented, it produces a compile error: 'variable b might not have been initialized'",
      "Prints 0",
      "Prints null",
      "Throws a NullPointerException at runtime"
    ],
    answer: "If uncommented, it produces a compile error: 'variable b might not have been initialized'",
    correctAnswer: 0,
    explanation: "Because `b` is a local reference variable inside `main()`, it is NOT assigned any default value. Reading an uninitialized local variable causes a compile-time error.",
    explanationBn: "মেথডের ভেতরের লোকাল ভ্যারিয়েবল 'b' মান ছাড়া ব্যবহার করতে গেলে কম্পাইলার 'variable might not have been initialized' এরর দেয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Hard",
    hint: "Local variables do not get automatic default initialization."
  },
  {
    id: "q16",
    question: "Which keyword can be used inside an instance method to refer to the current invoking object?",
    options: [
      "this",
      "self",
      "current",
      "me"
    ],
    answer: "this",
    correctAnswer: 0,
    explanation: "The **`this`** keyword is a reference variable in Java that refers directly to the current object instance whose method or constructor is being executed.",
    explanationBn: "জাভাতে 'this' কিওয়ার্ডটি বর্তমান অবজেক্টকে (যে অবজেক্ট মেথডটি কল করেছে) নির্দেশ করতে ব্যবহৃত হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "Used to distinguish instance variables from parameter shadowing."
  },
  {
    id: "q17",
    question: "Why is 'this.name = name;' commonly written inside Java constructors or setter methods?",
    options: [
      "To resolve Variable Shadowing when a parameter name is identical to an instance variable name",
      "To convert the string to uppercase",
      "To allocate a new array",
      "To restart the JVM"
    ],
    answer: "To resolve Variable Shadowing when a parameter name is identical to an instance variable name",
    correctAnswer: 0,
    explanation: "When method/constructor parameters have the exact same identifier as instance fields, the local parameter **shadows** the field. `this.name` explicitly targets the instance variable.",
    explanationBn: "প্যারামিটার এবং ক্লাসের ফিল্ডের নাম একই হলে 'this.name' দিয়ে ক্লাসের নিজস্ব ফিল্ডকে নির্দিষ্ট করা হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Differentiates class attribute from local argument."
  },
  {
    id: "q18",
    question: "Can multiple objects instantiated from the same class have different values for their instance variables?",
    options: [
      "Yes, each object has its own separate copy of all instance variables in heap memory",
      "No, all objects must share identical values forever",
      "Only if they are created in different packages",
      "Only if the class is marked abstract"
    ],
    answer: "Yes, each object has its own separate copy of all instance variables in heap memory",
    correctAnswer: 0,
    explanation: "Every object instantiated via `new` receives its own distinct memory block on the heap, allowing `student1.marks` to be `95.0` while `student2.marks` is `82.5`.",
    explanationBn: "হ্যাঁ, প্রতিটি অবজেক্ট হিপ মেমরিতে নিজস্ব পৃথক মেমরি ব্লক পায়, ফলে তাদের ফিল্ডগুলোর মান ভিন্ন হতে পারে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "Each instance holds independent state."
  },
  {
    id: "q19",
    question: "What is the difference between an Instance Variable and a Static (Class) Variable?",
    options: [
      "Instance variables have one copy per object instance; Static variables have only one single shared copy for the entire class",
      "Instance variables use static keyword; Static variables do not",
      "Instance variables cannot be accessed via dot operator",
      "Static variables are deleted after every method call"
    ],
    answer: "Instance variables have one copy per object instance; Static variables have only one single shared copy for the entire class",
    correctAnswer: 0,
    explanation: "**Instance variables** are duplicated per object on the heap. A **`static` variable** is created once when the class is loaded in Metaspace/Method Area and is shared by all instances.",
    explanationBn: "ইন্সট্যান্স ভ্যারিয়েবল প্রতি অবজেক্টে আলাদা তৈরি হয়, আর static ভ্যারিয়েবল পুরো ক্লাসের জন্য একটাই থাকে এবং সবাই শেয়ার করে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Per-instance vs per-class memory allocation."
  },
  {
    id: "q20",
    question: "How do you access a static method or variable of a class named 'MathUtil'?",
    options: [
      "Using the class name directly: MathUtil.calculateSum()",
      "Must always create 10 objects first",
      "Using the 'delete' operator",
      "Static members cannot be accessed"
    ],
    answer: "Using the class name directly: MathUtil.calculateSum()",
    correctAnswer: 0,
    explanation: "Static members belong to the class rather than any object instance, so the standard and recommended way to access them is via the Class Name: `ClassName.staticMember`.",
    explanationBn: "স্ট্যাটিক মেথড বা ভ্যারিয়েবল সরাসরি ক্লাসের নাম দিয়ে (যেমন MathUtil.calculateSum()) ব্যবহার করা হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "No object instantiation is required to call static members."
  },
  {
    id: "q21",
    question: "What is the output of the following Java program?\n\nclass Counter {\n    int count = 0;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        c1.count = 10;\n        System.out.println(c2.count);\n    }\n}",
    options: [
      "0",
      "10",
      "null",
      "Compilation error"
    ],
    answer: "0",
    correctAnswer: 0,
    explanation: "Because `count` is an instance variable, `c1` and `c2` have completely independent copies. Modifying `c1.count` to `10` does NOT alter `c2.count`, which remains its initial default `0`.",
    explanationBn: "যেহেতু count একটি সাধারণ ইন্সট্যান্স ভ্যারিয়েবল, তাই c1 পরিবর্তনের প্রভাব c2 তে পড়ে না; c2.count এর মান 0 থাকবে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Instance variables are isolated per object."
  },
  {
    id: "q22",
    question: "What is the return value of the 'new' operator expression in Java?",
    options: [
      "A reference (memory address) to the newly created object on the heap",
      "An integer status code indicating success (0 or 1)",
      "The total byte size of the class",
      "A boolean true"
    ],
    answer: "A reference (memory address) to the newly created object on the heap",
    correctAnswer: 0,
    explanation: "The `new` operator dynamically allocates memory on the heap, initializes it, and returns the **reference (address pointer)** of that allocated memory block.",
    explanationBn: "'new' অপারেটর হিপ মেমরিতে জায়গা বরাদ্দ করে এবং সেই মেমরি ব্লকের রেফারেন্স (ঠিকানা) প্রদান করে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "The address stored into the reference variable."
  },
  {
    id: "q23",
    question: "Can a Java class contain both state (variables) and behavior (methods), or only one of them?",
    options: [
      "A class can contain variables, methods, constructors, blocks, and nested classes",
      "A class can only contain variables, never methods",
      "A class can only contain methods, never variables",
      "A class can only contain text comments"
    ],
    answer: "A class can contain variables, methods, constructors, blocks, and nested classes",
    correctAnswer: 0,
    explanation: "A Java class is a comprehensive unit of software encapsulation that can contain instance fields, static variables, constructors, methods, initializer blocks, and inner classes.",
    explanationBn: "একটি জাভা ক্লাসে ভ্যারিয়েবল, মেথড, কনস্ট্রাক্টর, ইনিশিয়ালাইজার ব্লক ও নেস্টেড ক্লাস সবকিছুই থাকতে পারে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "Complete blueprint for encapsulation."
  },
  {
    id: "q24",
    question: "In CBSE Class XII IT 802, what is the file name rule when a Java file contains a 'public class Student'?",
    options: [
      "The source file MUST be named 'Student.java' (exact case match)",
      "The file can be named anything like 'program.txt'",
      "The file must be named 'Main.java' always",
      "The file must have no extension"
    ],
    answer: "The source file MUST be named 'Student.java' (exact case match)",
    correctAnswer: 0,
    explanation: "In Java, a source file can contain at most one `public` top-level class, and the file name **must exactly match** the public class name with the `.java` extension.",
    explanationBn: "জাভাতে সোর্স ফাইলের নাম অবশ্যই তার ভেতরের পাবলিক ক্লাসের নামের সাথে হুবহু মিল রেখে 'Student.java' হতে হবে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "Java compiler enforces strict public class name matching."
  },
  {
    id: "q25",
    question: "What does the 'instanceof' operator check in Java?",
    options: [
      "Whether an object reference is an instance of a specific class or implements a specific interface",
      "The memory size of an object in gigabytes",
      "How many times an object was modified",
      "Whether the class file exists on disk"
    ],
    answer: "Whether an object reference is an instance of a specific class or implements a specific interface",
    correctAnswer: 0,
    explanation: "The `instanceof` operator tests type compatibility at runtime: `if (s1 instanceof Student)` returns `true` if `s1` refers to an instance of `Student` or a subclass.",
    explanationBn: "'instanceof' অপারেটর দিয়ে রানটাইমে যাচাই করা হয় যে একটি অবজেক্ট নির্দিষ্ট ক্লাসের অন্তর্ভুক্ত কিনা।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Returns boolean true or false for type checking."
  },
  {
    id: "q26",
    question: "Consider: 'Student a = new Student(); Student b = new Student(); boolean res = (a == b);'. What is the value of 'res'?",
    options: [
      "false (because '==' compares reference memory addresses, and 'a' and 'b' reside at distinct heap locations)",
      "true (because both are empty Student objects)",
      "null",
      "Compilation error"
    ],
    answer: "false (because '==' compares reference memory addresses, and 'a' and 'b' reside at distinct heap locations)",
    correctAnswer: 0,
    explanation: "The `==` operator on object references compares **memory addresses**, not field values. Because `a` and `b` were created by separate `new` statements, they occupy different heap addresses, so `a == b` evaluates to `false`.",
    explanationBn: "অবজেক্টের ক্ষেত্রে '==' তাদের মেমরি অ্যাড্রেস তুলনা করে; দুটি ভিন্ন অবজেক্ট ভিন্ন মেমরিতে থাকায় (a == b) এর মান false হবে।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Hard",
    hint: "'==' compares memory addresses for reference types."
  },
  {
    id: "q27",
    question: "Which method in 'java.lang.Object' is intended to be overridden to provide a meaningful text representation of an object?",
    options: [
      "toString()",
      "equals()",
      "hashCode()",
      "getClass()"
    ],
    answer: "toString()",
    correctAnswer: 0,
    explanation: "By default, `System.out.println(s1)` calls `s1.toString()`. Overriding `toString()` in your class produces human-readable output instead of `ClassName@HexHashCode`.",
    explanationBn: "অবজেক্টের ভেতরের তথ্যের সুন্দর টেক্সট রূপ দেখানোর জন্য 'toString()' মেথড ওভাররাইড করা হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Medium",
    hint: "Converts the object to a String."
  },
  {
    id: "q28",
    question: "Why is an object referred to as an 'instance' of a class in Object-Oriented terminology?",
    options: [
      "Because it represents a single, concrete manifestation of the generic blueprint defined by the class",
      "Because it runs instantly in zero nanoseconds",
      "Because it is an instant messaging tool",
      "Because it can only be created once in the entire program"
    ],
    answer: "Because it represents a single, concrete manifestation of the generic blueprint defined by the class",
    correctAnswer: 0,
    explanation: "An object is called an **instance** because it is an actual, realized realization of the conceptual pattern (the class). The process of creating this realization is called **instantiation**.",
    explanationBn: "অবজেক্টকে ক্লাসের একটি বাস্তব দৃষ্টান্ত বা প্রতিরূপ বলা হয়, যা নকশা থেকে হিপ মেমরিতে বাস্তবে তৈরি হয়।",
    topic: "Defining Classes and Instantiating Objects using the 'new' Operator",
    difficulty: "Easy",
    hint: "An exemplar or concrete realization of a blueprint."
  }
];

export default questions;
