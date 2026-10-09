const questions = [
  {
    id: "q1",
    question: "What is Encapsulation in Java?",
    options: [
      "The OOP technique of wrapping data fields and methods together into a class while restricting direct access to internal variables from outside code",
      "The process of converting Java bytecode into C++ code",
      "The method of compressing Java class files into zip archives",
      "A technique for deleting database rows"
    ],
    answer: "The OOP technique of wrapping data fields and methods together into a class while restricting direct access to internal variables from outside code",
    correctAnswer: 0,
    explanation: "**Encapsulation** binds data (instance fields) and behavior (methods) into a cohesive unit and enforces data hiding by restricting direct field access through `private` modifiers.",
    explanationBn: "এনক্যাপসুলেশন হলো ডেটা ও মেথডকে একটি ক্লাসের মধ্যে একত্রিত করে ডেটাকে বাইরের অনিয়ন্ত্রিত হস্তক্ষেপ থেকে গোপন ও সুরক্ষিত রাখার কৌশল।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Data binding + Data hiding."
  },
  {
    id: "q2",
    question: "What is the standard two-step 'recipe' for implementing Encapsulation in a Java class?",
    options: [
      "1. Declare instance variables as 'private' -> 2. Provide 'public' getter and setter methods for controlled access",
      "1. Declare all variables as 'public' -> 2. Delete all methods",
      "1. Make the class 'abstract' -> 2. Make all constructors 'private'",
      "1. Write everything in the main() method"
    ],
    answer: "1. Declare instance variables as 'private' -> 2. Provide 'public' getter and setter methods for controlled access",
    correctAnswer: 0,
    explanation: "Standard encapsulation requires making internal fields `private` and exposing public accessor (getter) and mutator (setter) methods.",
    explanationBn: "এনক্যাপসুলেশনের মূল নিয়ম: ভ্যারিয়েবলগুলোকে 'private' রাখা এবং পাবলিক গেটার ও সেটার মেথড দিয়ে তাদের নিয়ন্ত্রণ করা।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Private variables + Public getters/setters."
  },
  {
    id: "q3",
    question: "Why is declaring instance variables as 'public' considered poor programming practice in OOP design?",
    options: [
      "Because external code can bypass validation and directly assign invalid, corrupted, or insecure values (e.g. setting bank balance = -999999)",
      "Because public variables cannot store integers",
      "Because the compiler refuses to compile public variables",
      "Because public variables use double the RAM"
    ],
    answer: "Because external code can bypass validation and directly assign invalid, corrupted, or insecure values (e.g. setting bank balance = -999999)",
    correctAnswer: 0,
    explanation: "Public fields lack defense. External code can freely mutate fields with illegal or destructive values, violating business logic and state consistency.",
    explanationBn: "পাবলিক ভ্যারিয়েবল থাকলে বাইরের যেকোনো কোড ভুল বা ক্ষতিকর মান (যেমন নেগেটিভ ব্যালেন্স) সরাসরি বসিয়ে ডেটা নষ্ট করতে পারে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Direct field access lacks validation defense."
  },
  {
    id: "q4",
    question: "What is a 'Getter' (Accessor) method in Java?",
    options: [
      "A public method that returns the current value of a private instance variable to the caller",
      "A method that deletes an object",
      "A method that reads input from the keyboard",
      "A constructor with 5 arguments"
    ],
    answer: "A public method that returns the current value of a private instance variable to the caller",
    correctAnswer: 0,
    explanation: "A **Getter** is a public method (e.g. `public String getName() { return name; }`) providing read-only access to a private field.",
    explanationBn: "গেটার (Getter) হলো একটি পাবলিক মেথড যা প্রাইভেট ভ্যারিয়েবলের মান নিরাপদে রিড (read) করতে সাহায্য করে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Accessor method used for reading."
  },
  {
    id: "q5",
    question: "What is a 'Setter' (Mutator) method in Java?",
    options: [
      "A public method that accepts a parameter, validates it, and updates the value of a private instance variable",
      "A tool for setting IDE preferences",
      "A method that prints text to a printer",
      "A static block that runs during class loading"
    ],
    answer: "A public method that accepts a parameter, validates it, and updates the value of a private instance variable",
    correctAnswer: 0,
    explanation: "A **Setter** is a public method (e.g. `public void setAge(int age)`) that checks validation rules before mutating a private field.",
    explanationBn: "সেটার (Setter) হলো একটি পাবলিক মেথড যা ভ্যালিডেশন যাচাই করে প্রাইভেট ভ্যারিয়েবলের মান পরিবর্তন (write) করে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Mutator method used for controlled writing."
  },
  {
    id: "q6",
    question: "According to standard JavaBeans naming conventions, what is the proper getter method name for a boolean field 'isActive'?",
    options: [
      "public boolean isActive() (or getActive())",
      "public boolean isactive()",
      "public void getIsActive()",
      "public boolean fetchActiveState()"
    ],
    answer: "public boolean isActive() (or getActive())",
    correctAnswer: 0,
    explanation: "For `boolean` primitive properties, JavaBeans naming conventions specify prefixing with **`is`** (e.g. `isActive()`) or `get` (e.g. `getActive()`).",
    explanationBn: "বুলিয়ান ফিল্ডের ক্ষেত্রে জাভাবিন্স নিয়ম অনুযায়ী গেটারের নাম 'isActive()' অথবা 'getActive()' হওয়া প্রমিত।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Prefix with 'is' for boolean fields."
  },
  {
    id: "q7",
    question: "How do you create a 'Read-Only' property in an encapsulated Java class?",
    options: [
      "Provide a public getter method, but DO NOT provide any setter method",
      "Declare the class as abstract",
      "Make the variable public static",
      "Delete all constructors"
    ],
    answer: "Provide a public getter method, but DO NOT provide any setter method",
    correctAnswer: 0,
    explanation: "By providing only a getter (e.g. `getId()`) and omitting the setter, callers can read the property value but cannot modify it after construction.",
    explanationBn: "রিড-অনলি প্রোপার্টি তৈরি করতে শুধু গেটার (Getter) দিতে হয় এবং কোনো সেটার (Setter) মেথড লেখা হয় না।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Provide Getter only, omit Setter."
  },
  {
    id: "q8",
    question: "How do you create a 'Write-Only' property in an encapsulated Java class?",
    options: [
      "Provide a public setter method, but DO NOT provide any getter method (e.g. for sensitive passwords)",
      "Declare the variable with the 'writeonly' keyword",
      "Make the method private",
      "Make the class final"
    ],
    answer: "Provide a public setter method, but DO NOT provide any getter method (e.g. for sensitive passwords)",
    correctAnswer: 0,
    explanation: "Omitting the getter prevents reading the field, while providing a setter allows writing (e.g. setting an encrypted password hash or secret API token).",
    explanationBn: "রাইট-অনলি প্রোপার্টিতে শুধু সেটার থাকে এবং কোনো গেটার থাকে না (যেমন সংবেদনশীল পাসওয়ার্ড সেট করার ক্ষেত্রে)।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Provide Setter only, omit Getter."
  },
  {
    id: "q9",
    question: "Consider the code snippet:\n\nclass Student {\n    private int marks;\n    public void setMarks(int m) {\n        if (m >= 0 && m <= 100) {\n            marks = m;\n        }\n    }\n    public int getMarks() {\n        return marks;\n    }\n}\n\nWhat happens if a caller executes 's.setMarks(-40);' on a new Student object?",
    options: [
      "The invalid value -40 is rejected by the if-condition; marks remains at its default value 0",
      "marks becomes -40",
      "The JVM crashes with an IllegalArgumentException",
      "The computer restarts"
    ],
    answer: "The invalid value -40 is rejected by the if-condition; marks remains at its default value 0",
    correctAnswer: 0,
    explanation: "The setter's defensive check `m >= 0 && m <= 100` evaluates to `false` for `-40`. The assignment is safely ignored and `marks` stays `0`.",
    explanationBn: "সেটারের শর্ত (-40 >= 0) মিথ্যা হওয়ায় মানটি বাতিল হবে এবং marks এর মান আগের মতোই 0 থাকবে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Validation guard blocks illegal input."
  },
  {
    id: "q10",
    question: "How does Encapsulation enhance software 'Maintainability'?",
    options: [
      "Internal implementation details (such as renaming fields or changing data structures) can change without breaking client code that uses public getters/setters",
      "It automatically repairs broken hard drives",
      "It deletes old comments from code",
      "It speeds up compilation by 1000%"
    ],
    answer: "Internal implementation details (such as renaming fields or changing data structures) can change without breaking client code that uses public getters/setters",
    correctAnswer: 0,
    explanation: "Because callers interact only with `getName()` and `setName()`, developers can refactor internal fields (e.g. splitting `name` into `firstName` and `lastName`) while keeping the external API unchanged.",
    explanationBn: "অভ্যন্তরীণ ভ্যারিয়েবলের নাম পরিবর্তন করলেও বাইরের ব্যবহারকারীদের কোড ভাঙে না, কারণ তারা কেবল গেটার/সেটার কল করে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Insulates client code from internal refactoring."
  },
  {
    id: "q11",
    question: "What is the visibility of a field declared with NO access modifier (default access) in Java?",
    options: [
      "Visible to all classes within the SAME package, but hidden from classes in other packages",
      "Visible to every class in the world",
      "Visible only to the declaring class",
      "Visible only to subclasses in other packages"
    ],
    answer: "Visible to all classes within the SAME package, but hidden from classes in other packages",
    correctAnswer: 0,
    explanation: "Package-private (default) access allows classes in the same package to access the member directly, but conceals it from external packages.",
    explanationBn: "কোনো মডিফায়ার না দিলে (Default) একই প্যাকেজের ভেতরের সব ক্লাস তা ব্যবহার করতে পারে, কিন্তু বাইরের প্যাকেজ পারে না।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Package-private scope."
  },
  {
    id: "q12",
    question: "What is the visibility of a member declared with the 'protected' access modifier?",
    options: [
      "Accessible within the SAME package AND by SUBCLASSES located in other packages",
      "Accessible only within the declaring class",
      "Accessible by any class anywhere",
      "Accessible only on Sundays"
    ],
    answer: "Accessible within the SAME package AND by SUBCLASSES located in other packages",
    correctAnswer: 0,
    explanation: "`protected` members can be accessed by any class in the same package and by child classes (subclasses) residing in external packages.",
    explanationBn: "'protected' মেম্বার একই প্যাকেজের ক্লাসে এবং অন্য প্যাকেজে থাকা সাবক্লাসে (Inheritance) ব্যবহার করা যায়।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Package access + derived subclass access."
  },
  {
    id: "q13",
    question: "Arrange the four Java access modifiers in order from MOST RESTRICTIVE to LEAST RESTRICTIVE:",
    options: [
      "private -> default (package-private) -> protected -> public",
      "public -> protected -> default -> private",
      "private -> protected -> default -> public",
      "default -> private -> protected -> public"
    ],
    answer: "private -> default (package-private) -> protected -> public",
    correctAnswer: 0,
    explanation: "Restriction Hierarchy: `private` (class only) is most restrictive, followed by `default` (package), `protected` (package + subclasses), and `public` (universal access).",
    explanationBn: "সর্বোচ্চ সুরক্ষিত থেকে উন্মুক্ত ক্রম: private -> default -> protected -> public।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Private is most restricted, Public is least restricted."
  },
  {
    id: "q14",
    question: "What is a 'JavaBean' class in standard enterprise Java programming?",
    options: [
      "A fully encapsulated class that has private fields, a public no-argument constructor, public getters/setters, and implements Serializable",
      "A class that brews digital coffee",
      "A special Java compiler for Android",
      "A database index file"
    ],
    answer: "A fully encapsulated class that has private fields, a public no-argument constructor, public getters/setters, and implements Serializable",
    correctAnswer: 0,
    explanation: "A **JavaBean** is a standard encapsulated POJO (Plain Old Java Object) possessing private properties, getter/setter methods, and a public no-arg constructor.",
    explanationBn: "জাভাবিন (JavaBean) হলো সম্পূর্ণ এনক্যাপসুলেটেড ক্লাস যাতে প্রাইভেট ফিল্ড, পাবলিক নো-আর্গ কনস্ট্রাক্টর ও গেটার-সেটার থাকে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Standard POJO convention for frameworks."
  },
  {
    id: "q15",
    question: "What is the output of the following Java program?\n\nclass Account {\n    private double balance = 1000.0;\n    public double getBalance() {\n        return balance;\n    }\n    public void deposit(double amt) {\n        if (amt > 0) balance += amt;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Account acc = new Account();\n        acc.deposit(500.0);\n        acc.deposit(-200.0);\n        System.out.println(acc.getBalance());\n    }\n}",
    options: [
      "1500.0",
      "1300.0",
      "1000.0",
      "Compilation error"
    ],
    answer: "1500.0",
    correctAnswer: 0,
    explanation: "Initial balance = `1000.0`. `deposit(500.0)` adds 500 (`1500.0`). `deposit(-200.0)` fails the `amt > 0` check and is ignored. Balance remains `1500.0`.",
    explanationBn: "প্রথমে 1000 ছিল, 500 যোগ হয়ে 1500 হলো; নেগেটিভ -200 শর্তে আটকে বাতিল হওয়ায় চূড়ান্ত ব্যালেন্স 1500.0 থাকবে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "1000 + 500 = 1500, negative deposit is rejected."
  },
  {
    id: "q16",
    question: "Why should getter methods for mutable objects (like Date or Arrays) return a defensive copy rather than the direct reference?",
    options: [
      "To prevent external callers from mutating internal private object state through the returned reference",
      "Because Java cannot return arrays",
      "To save CPU cache memory",
      "Because Date objects are automatically deleted"
    ],
    answer: "To prevent external callers from mutating internal private object state through the returned reference",
    correctAnswer: 0,
    explanation: "Returning a direct reference to a mutable field (e.g. `return myDate;`) breaks encapsulation because callers can write `getBirthDate().setTime(0)`. Returning a cloned copy prevents this.",
    explanationBn: "মিউটেবল অবজেক্টের সরাসরি রেফারেন্স দিলে বাইরে থেকে ভেতরের ডেটা বদলে দেওয়া যায়, তাই ডিফেন্সিভ কপি (Defensive Copy) রিটার্ন করা উচিত।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Hard",
    hint: "Defensive copying prevents reference leakage."
  },
  {
    id: "q17",
    question: "Can a setter method perform side-effects like writing to an audit log file whenever a variable is modified?",
    options: [
      "Yes, setter methods can execute logging, event broadcasting, and recalculation logic seamlessly",
      "No, setters can only contain an assignment operator",
      "Only in abstract classes",
      "Only if the method is static"
    ],
    answer: "Yes, setter methods can execute logging, event broadcasting, and recalculation logic seamlessly",
    correctAnswer: 0,
    explanation: "Because setters centralize access, they can trigger audit logs, validate database constraints, and notify listeners whenever a field is updated.",
    explanationBn: "হ্যাঁ, সেটারের ভেতর লগ তৈরি করা, অন্যান্য ভ্যালু রিক্যালকুলেট করা বা নোটিফিকেশন পাঠানোর মতো কাজ অনায়াসে যুক্ত করা যায়।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Encapsulation enables centralized control and logging."
  },
  {
    id: "q18",
    question: "What is an 'Immutable Class' in Java?",
    options: [
      "A class whose object state cannot be modified after creation (e.g. java.lang.String)",
      "A class that cannot be saved to disk",
      "A class with no constructors",
      "A class that has only public variables"
    ],
    answer: "A class whose object state cannot be modified after creation (e.g. java.lang.String)",
    correctAnswer: 0,
    explanation: "An **Immutable Class** (like `String` or `Integer`) has all fields marked `private final`, provides getters only (no setters), and prevents subclassing via `final class`.",
    explanationBn: "ইমিউটেবল ক্লাস (যেমন String) হলো এমন একটি ক্লাস যার অবজেক্ট একবার তৈরি হলে তার ভেতরের মান আর পরিবর্তন করা যায় না।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Read-only after instantiation (like String)."
  },
  {
    id: "q19",
    question: "Which keyword helps enforce immutability on instance variables by preventing reassignment after constructor execution?",
    options: [
      "final",
      "static",
      "abstract",
      "volatile"
    ],
    answer: "final",
    correctAnswer: 0,
    explanation: "Marking an instance field as **`final`** (e.g. `private final int rollNo;`) ensures that once assigned in the constructor, its value can never be reassigned.",
    explanationBn: "কোনো ফিল্ডকে 'final' ঘোষণা করলে কনস্ট্রাক্টরে একবার মান পাওয়ার পর আর তাকে পরিবর্তন করা যায় না।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Locks the variable against reassignment."
  },
  {
    id: "q20",
    question: "What compile error occurs if external code writes 'obj.age = 20;' when 'age' is declared 'private int age;'?",
    options: [
      "age has private access in ClassName",
      "NullPointerException",
      "Variable age is missing",
      "Cannot find symbol: method age()"
    ],
    answer: "age has private access in ClassName",
    correctAnswer: 0,
    explanation: "Attempting to access a `private` member from outside its declaring class triggers the compiler error: `age has private access in ClassName`.",
    explanationBn: "বাইরের ক্লাস থেকে private ফিল্ড অ্যাক্সেস করতে গেলে কম্পাইলার 'has private access' এরর প্রদর্শন করে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Direct private access violation."
  },
  {
    id: "q21",
    question: "In CBSE Class XII IT 802, what real-world medical analogy is used to explain Encapsulation?",
    options: [
      "A medical medicine capsule containing various chemical ingredients safely enclosed inside a protective gelatin shell",
      "A stethoscope listening to heartbeats",
      "An X-ray machine taking photographs",
      "A microscope examining bacteria"
    ],
    answer: "A medical medicine capsule containing various chemical ingredients safely enclosed inside a protective gelatin shell",
    correctAnswer: 0,
    explanation: "Just as a medicinal capsule encloses powders inside a safe capsule shell, Encapsulation encloses variables and methods inside a protective class boundary.",
    explanationBn: "ওষুধের ক্যাপসুলের মতো এনক্যাপসুলেশন ভেতরের সব উপাদানকে একটি নিরাপদ খোলসের ভেতর আবদ্ধ রাখে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Medicine capsule protecting its powder."
  },
  {
    id: "q22",
    question: "How does Encapsulation promote 'Data Hiding'?",
    options: [
      "By concealing internal implementation fields from external classes and permitting interactions solely via public interfaces",
      "By storing data in hidden Windows folders",
      "By deleting unused variables from source files",
      "By making class files invisible"
    ],
    answer: "By concealing internal implementation fields from external classes and permitting interactions solely via public interfaces",
    correctAnswer: 0,
    explanation: "Data Hiding isolates internal state variables so that other classes cannot directly inspect or corrupt them, ensuring secure state transitions.",
    explanationBn: "ডেটা হাইডিং ইন্টারনাল ফিল্ডগুলোকে লুকিয়ে রেখে কেবল অনুমোদিত পাবলিক গেটার/সেটারের মাধ্যমে নিয়ন্ত্রিত যোগাযোগের অনুমতি দেয়।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Private state hidden behind public interface."
  },
  {
    id: "q23",
    question: "Consider: 'public double getTemperatureInFahrenheit() { return (celsius * 9/5) + 32; }'. What encapsulation benefit is shown here?",
    options: [
      "Derived/Computed Property: Providing formatted or converted data on-the-fly without needing extra storage variables",
      "Data corruption",
      "Code duplication",
      "Memory leakage"
    ],
    answer: "Derived/Computed Property: Providing formatted or converted data on-the-fly without needing extra storage variables",
    correctAnswer: 0,
    explanation: "Encapsulation allows getters to compute and format values dynamically without requiring extra fields in storage, maintaining single-source-of-truth.",
    explanationBn: "গেটার মেথড অতিরিক্ত ভ্যারিয়েবল ছাড়াই প্রয়োজনমতো ডেটা হিসাব করে (Computed Property) রিটার্ন করতে পারে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "On-the-fly computed property."
  },
  {
    id: "q24",
    question: "What is the consequence of not validating input inside a setter method?",
    options: [
      "The setter acts no better than a public variable, losing the defensive integrity benefits of encapsulation",
      "The program runs 10x faster",
      "The compiler flags a syntax error",
      "The variable becomes constant"
    ],
    answer: "The setter acts no better than a public variable, losing the defensive integrity benefits of encapsulation",
    correctAnswer: 0,
    explanation: "A blind setter `setAge(int a) { age = a; }` without validation checks offers no protection against corrupted data, nullifying the defensive purpose of encapsulation.",
    explanationBn: "সেটারের ভেতর ভ্যালিডেশন না রাখলে তা পাবলিক ভ্যারিয়েবলের মতোই অরক্ষিত হয়ে পড়ে এবং এনক্যাপসুলেশনের মূল উদ্দেশ্য নষ্ট হয়।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Medium",
    hint: "Setters must validate to provide real defense."
  },
  {
    id: "q25",
    question: "Can a constructor use setter methods to initialize private instance variables?",
    options: [
      "Yes, calling setters inside constructors ensures that initialization also benefits from validation rules",
      "No, constructors cannot call setter methods",
      "Only in abstract classes",
      "Only if the setter is static"
    ],
    answer: "Yes, calling setters inside constructors ensures that initialization also benefits from validation rules",
    correctAnswer: 0,
    explanation: "Using `setAge(age)` inside a constructor guarantees that invalid initial values (e.g. `-10`) are caught by the same validation logic applied during runtime updates.",
    explanationBn: "হ্যাঁ, কনস্ট্রাক্টরের ভেতর সেটার কল করলে অবজেক্ট তৈরির সময়েও একই ভ্যালিডেশন নিয়ম কার্যকর থাকে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Reuses validation logic during initialization."
  },
  {
    id: "q26",
    question: "Which of the following classes is properly encapsulated according to CBSE Class XII IT 802 guidelines?",
    options: [
      "class Employee { private int id; public int getId() { return id; } public void setId(int i) { id = i; } }",
      "class Employee { public int id; }",
      "class Employee { int id; }",
      "class Employee { private int id; }"
    ],
    answer: "class Employee { private int id; public int getId() { return id; } public void setId(int i) { id = i; } }",
    correctAnswer: 0,
    explanation: "Option 1 adheres completely to encapsulation: `private` variable + public `getId()` accessor + public `setId()` mutator.",
    explanationBn: "প্রথম অপশনে private ভ্যারিয়েবলের সাথে পাবলিক গেটার ও সেটার থাকায় এটি নিখুঁত এনক্যাপসুলেশনের উদাহরণ।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Look for private fields with public getter and setter methods."
  },
  {
    id: "q27",
    question: "How does Encapsulation support the OOP principle of Abstraction?",
    options: [
      "Encapsulation is the practical mechanism that enforces abstraction by shielding the private internal mechanisms from the public interface",
      "They are opposing concepts that cancel each other out",
      "Abstraction replaces encapsulation in Java 17",
      "Encapsulation makes all code abstract"
    ],
    answer: "Encapsulation is the practical mechanism that enforces abstraction by shielding the private internal mechanisms from the public interface",
    correctAnswer: 0,
    explanation: "Abstraction defines the conceptual public interface (what callers see), while Encapsulation implements that abstraction by hiding internal data behind that interface.",
    explanationBn: "অ্যাবস্ট্রাকশন হলো নকশা বা ধারণা, আর এনক্যাপসুলেশন হলো সেই ধারণাকে কোডে বাস্তবায়িত করার সুরক্ষিত প্রক্রিয়া।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Hard",
    hint: "Encapsulation is the vehicle that realizes abstraction in code."
  },
  {
    id: "q28",
    question: "Summary for CBSE IT 802: What is the primary golden rule of Encapsulation?",
    options: [
      "Keep data private, make methods public (unless they are internal helpers), and always validate modifications through setters",
      "Make everything public for easiest access",
      "Never use getters or setters",
      "Keep all variables in a single global file"
    ],
    answer: "Keep data private, make methods public (unless they are internal helpers), and always validate modifications through setters",
    correctAnswer: 0,
    explanation: "The golden rule of OOP Encapsulation: **Private Data + Public Controlled Access via Getters & Validating Setters** guarantees data security, modularity, and maintainability.",
    explanationBn: "সোনালী নিয়ম: ডেটা থাকবে private, প্রয়োজনীয় মেথড থাকবে public এবং সেটারের মাধ্যমে সবসময় মান যাচাই হবে।",
    topic: "Encapsulation in Action: Private Fields & Getters/Setters",
    difficulty: "Easy",
    hint: "Private data + Public validating accessors."
  }
];

export default questions;
