const topic0_questions = [
  {
    id: 1,
    question: "What is the primary role of the Java Virtual Machine (JVM) in the Java runtime environment?",
    options: [
      "To compile high-level Java source code directly into operating system assembly code",
      "To execute platform-independent Java bytecode by translating it into host machine instructions",
      "To design graphical user interfaces and database tables automatically",
      "To format hard drives and manage network socket connections"
    ],
    correctAnswer: 1,
    explanation: "The JVM (Java Virtual Machine) is an abstract runtime environment whose primary purpose is to load, verify, and execute compiled platform-independent Java bytecode (.class files) by converting it into native machine code for the underlying OS/CPU.",
    explanationBn: "JVM (Java Virtual Machine) হলো একটি রানটাইম এনভায়রনমেন্ট যার প্রধান কাজ হলো প্ল্যাটফর্ম-স্বাধীন জাভা বাইটকোড (.class ফাইল) লোড ও ভেরিফাই করে হোস্ট কম্পিউটারের প্রসেসর উপযোগী মেশিন কোডে রূপান্তর করে চালানো।",
    hint: "Think about which component actually runs the .class files."
  },
  {
    id: 2,
    question: "Which file extension is produced when the Java compiler (javac) successfully compiles a source file named 'BillingApp.java'?",
    options: [
      "BillingApp.exe",
      "BillingApp.obj",
      "BillingApp.class",
      "BillingApp.bin"
    ],
    correctAnswer: 2,
    explanation: "When javac compiles a .java source file, it produces intermediate bytecode stored in a file with the '.class' extension (e.g., BillingApp.class).",
    explanationBn: "javac কম্পাইলার যখন কোনো .java সোর্স ফাইল সফলভাবে কম্পাইল করে, তখন মধ্যবর্তী বাইটকোড তৈরি হয় যা '.class' এক্সটেনশন বিশিষ্ট ফাইলে সংরক্ষিত থাকে।",
    hint: "Bytecode files in Java always have this 5-letter extension."
  },
  {
    id: 3,
    question: "Why is Java described as both a 'compiled' and 'interpreted' programming language?",
    options: [
      "Because developers can write Java code in either C++ or Python syntax",
      "Because Java source code is first compiled into bytecode (by javac), which is then interpreted/JIT-compiled by the JVM",
      "Because it runs in two separate browsers simultaneously",
      "Because it uses two keyboards for coding and testing"
    ],
    correctAnswer: 1,
    explanation: "Java adopts a hybrid execution model: high-level .java source code is first compiled into bytecode using 'javac', and then the JVM interprets (or JIT-compiles) that bytecode into native machine instructions at runtime.",
    explanationBn: "জাভাকে কম্পাইল্ড এবং ইন্টারপ্রিটেড উভয়ই বলা হয় কারণ javac প্রথমে সোর্স কোডকে বাইটকোডে কম্পাইল করে, এবং পরবর্তীতে JVM সেই বাইটকোড ইন্টারপ্রেট/JIT-কম্পাইল করে রান করায়।",
    hint: "First stage is javac compilation to bytecode, second stage is JVM execution."
  },
  {
    id: 4,
    question: "Which component of the JVM is responsible for inspecting bytecode prior to execution to ensure it doesn't violate memory constraints or security policies?",
    options: [
      "Garbage Collector",
      "Bytecode Verifier",
      "JIT Profiler",
      "Native Interface Bridge"
    ],
    correctAnswer: 1,
    explanation: "The Bytecode Verifier is a core security component of the JVM ClassLoader subsystem that checks the .class file for illegal memory access, stack overflows, and type safety before execution.",
    explanationBn: "বাইটকোড ভেরিফায়ার (Bytecode Verifier) নিশ্চিত করে যে লোড হওয়া বাইটকোডে কোনো অননুমোদিত মেমরি অ্যাক্সেস বা নিরাপত্তা লঙ্ঘন নেই।",
    hint: "It 'verifies' the safety of bytecode."
  },
  {
    id: 5,
    question: "Is the Java Virtual Machine (JVM) itself platform-dependent or platform-independent?",
    options: [
      "JVM is platform-independent, and Bytecode is platform-dependent",
      "JVM is platform-dependent, while Bytecode is platform-independent",
      "Both JVM and Bytecode are strictly platform-dependent",
      "Neither JVM nor Bytecode depends on any hardware architecture"
    ],
    correctAnswer: 1,
    explanation: "The Bytecode (.class) is platform-independent (identical across Windows, Linux, macOS), but the JVM itself is platform-dependent because it must interact directly with the specific underlying OS and CPU architecture.",
    explanationBn: "বাইটকোড হলো প্ল্যাটফর্ম-স্বাধীন (সকল OS-এ একই), কিন্তু JVM নিজে প্ল্যাটফর্ম-নির্ভর (উইন্ডোজ, লিনাক্স বা ম্যাকের জন্য আলাদা JVM ইনস্টল করতে হয়)।",
    hint: "You must download a specific JVM installer for Windows vs Linux."
  },
  {
    id: 6,
    question: "What is the function of the Just-In-Time (JIT) compiler inside the Java Virtual Machine?",
    options: [
      "To compile HTML templates into CSS stylesheets",
      "To compile frequently executed bytecode blocks ('hotspots') into native machine code at runtime to boost performance",
      "To delete unused Java files from the hard drive automatically",
      "To convert Java swing components into database queries"
    ],
    correctAnswer: 1,
    explanation: "The JIT (Just-In-Time) compiler identifies repetitive, heavily used bytecode blocks ('hotspots') and compiles them directly into native host machine code, storing them in memory so they execute at near-native speeds without re-interpretation.",
    explanationBn: "JIT কম্পাইলার বারবার ব্যবহৃত কোড বা 'হটস্পট' চিহ্নিত করে সরাসরি নেটিভ মেশিন কোডে রূপান্তর করে মেমরিতে রাখে, যাতে ইন্টারপ্রিটেশনের তুলনায় কোড দ্রুত চলে।",
    hint: "JIT speeds up execution by compiling hot spots to native code."
  },
  {
    id: 7,
    question: "In the JVM memory architecture, where are instantiated Java objects and their instance variables stored?",
    options: [
      "Method Area",
      "Heap Memory",
      "Java Stack Area",
      "Program Counter (PC) Register"
    ],
    correctAnswer: 1,
    explanation: "All Java objects created via the 'new' keyword are dynamically allocated in the JVM Heap Memory, which is shared among all threads and managed by the Garbage Collector.",
    explanationBn: "জাভায় 'new' কিওয়ার্ড দ্বারা তৈরি সমস্ত অবজেক্ট এবং ইন্সট্যান্স ভ্যারিয়েবল JVM-এর হিপ মেমরি (Heap Memory)-তে সংরক্ষিত হয়।",
    hint: "The shared memory pool managed by the Garbage Collector."
  },
  {
    id: 8,
    question: "Where are method local variables and call frames stored during Java program execution?",
    options: [
      "Heap Area",
      "Java Stack Memory",
      "Hard Disk Swap File",
      "Constant Pool"
    ],
    correctAnswer: 1,
    explanation: "Java Stack Memory stores call frames, method parameters, and local primitive variables for each active thread. When a method finishes, its stack frame is popped automatically.",
    explanationBn: "মেথডের লোকাল ভ্যারিয়েবল এবং কল ফ্রেম JVM-এর স্ট্যাক মেমরি (Stack Memory)-তে সংরক্ষিত থাকে। মেথড শেষ হলে স্ট্যাক ফ্রেম মুছে যায়।",
    hint: "Last-In-First-Out memory structure for function calls."
  },
  {
    id: 9,
    question: "What is the primary role of the Java Garbage Collector (GC)?",
    options: [
      "To identify syntax errors in .java source files",
      "To automatically reclaim memory occupied by objects that are no longer referenced or reachable",
      "To compress compiled .jar files into ZIP format",
      "To encrypt passwords stored in database connection strings"
    ],
    correctAnswer: 1,
    explanation: "The Garbage Collector (GC) automatically monitors heap memory and deletes unreachable/orphan objects, freeing memory without requiring manual memory deallocation like free() or delete in C/C++.",
    explanationBn: "গার্বেজ কালেক্টর (GC) হিপ মেমরিতে থাকা যেসকল অবজেক্ট আর কোনো রেফারেন্সের সাথে যুক্ত নেই সেগুলোকে স্বয়ংক্রিয়ভাবে মুছে মেমরি খালি করে।",
    hint: "Automatic memory reclamation system in Java."
  },
  {
    id: 10,
    question: "Which command-line utility is used to compile a Java source file named 'BarrackporeStore.java'?",
    options: [
      "java BarrackporeStore.java",
      "javac BarrackporeStore.java",
      "javadoc BarrackporeStore.java",
      "jar BarrackporeStore.java"
    ],
    correctAnswer: 1,
    explanation: "'javac' is the Java Compiler executable. Running 'javac BarrackporeStore.java' compiles the human-readable source code into 'BarrackporeStore.class' bytecode.",
    explanationBn: "'javac' হলো জাভা কম্পাইলার। 'javac BarrackporeStore.java' কমান্ড দিয়ে সোর্স ফাইল কম্পাইল করে বাইটকোড তৈরি করা হয়।",
    hint: "Notice the 'c' in the command name standing for compiler."
  },
  {
    id: 11,
    question: "Which command is used to run a compiled Java class file named 'StudentProfile.class' using the JVM?",
    options: [
      "javac StudentProfile.class",
      "java StudentProfile",
      "execute StudentProfile.class",
      "run StudentProfile.java"
    ],
    correctAnswer: 1,
    explanation: "To execute a compiled class file, use 'java <ClassName>' without the '.class' extension. The JVM locates and loads 'StudentProfile.class' and calls its main() method.",
    explanationBn: "কম্পাইল করা ক্লাস ফাইল চালাতে 'java StudentProfile' কমান্ড লিখতে হয় (.class এক্সটেনশন দেওয়া হয় না)।",
    hint: "Use 'java' followed by just the class name without .class."
  },
  {
    id: 12,
    question: "What does the JVM ClassLoader do during the 'Loading' phase?",
    options: [
      "Downloads updates from the internet",
      "Reads the binary representation of a class file (.class) and creates a Class object in JVM memory",
      "Re-formats Java code with proper indentation",
      "Connects to MySQL database server automatically"
    ],
    correctAnswer: 1,
    explanation: "The ClassLoader loads binary bytecode data from .class files into the JVM's Method Area and creates corresponding java.lang.Class instances in memory.",
    explanationBn: "ClassLoader বাইনারি বাইটকোড (.class ফাইল) মেথড এরিয়াতে লোড করে এবং JVM মেমরিতে ক্লাস অবজেক্ট তৈরি করে।",
    hint: "It loads the .class binary into memory."
  },
  {
    id: 13,
    question: "What is stored in the JVM 'Method Area' (also known as Metaspace in modern Java)?",
    options: [
      "Temporary user input from the keyboard",
      "Class metadata, method bytecodes, static variables, and runtime constant pool",
      "Operating system driver files",
      "Log files written by System.out.println()"
    ],
    correctAnswer: 1,
    explanation: "The JVM Method Area stores class structures, method bytecode instructions, static variables, field information, and the runtime constant pool.",
    explanationBn: "মেথড এরিয়াতে (বা মেটাস্পেস) ক্লাসের মেটাডাটা, মেথড বাইটকোড, স্ট্যাটিক ভ্যারিয়েবল এবং কনস্ট্যান্ট পুল সংরক্ষিত থাকে।",
    hint: "It holds class definitions, static members, and bytecode instructions."
  },
  {
    id: 14,
    question: "What does the Program Counter (PC) Register in the JVM hold for each active thread?",
    options: [
      "The price of the computer hardware",
      "The memory address of the JVM instruction currently being executed by that thread",
      "The total number of lines in the .java source file",
      "The user's login password hash"
    ],
    correctAnswer: 1,
    explanation: "Each JVM thread has its own PC (Program Counter) register that contains the address of the currently executing JVM instruction (or undefined for native methods).",
    explanationBn: "প্রতিটি থ্রেডের জন্য PC রেজিস্টার বর্তমান নির্বাহাধীন JVM নির্দেশের (instruction) মেমরি অ্যাড্রেস ধারণ করে।",
    hint: "PC stands for Program Counter, tracking the current instruction."
  },
  {
    id: 15,
    question: "Which of the following statements about Java bytecode is FALSE?",
    options: [
      "Bytecode instructions are strictly 8-bit opcodes followed by optional parameters",
      "Bytecode is CPU-dependent and can only execute on Intel x86 processors",
      "Bytecode can be transferred across networks and executed on any device with a compatible JVM",
      "Bytecode is stored in files ending with .class"
    ],
    correctAnswer: 1,
    explanation: "Statement B is false because Java bytecode is CPU-independent. It executes on Intel x86, ARM, Apple Silicon, AMD64, SPARC, or any hardware processor that has a JVM.",
    explanationBn: "বিবৃতি B ভুল, কারণ জাভা বাইটকোড কোনো নির্দিষ্ট প্রসেসরের ওপর নির্ভরশীল নয়; যেকোনো প্রসেসরে যেখানে JVM ইনস্টল আছে সেখানে এটি চলবে।",
    hint: "Java's core promise is hardware independence."
  },
  {
    id: 16,
    question: "When a developer in Kolkata compiles 'Payroll.java' on Windows 11 and sends 'Payroll.class' to a client in London running Ubuntu Linux, what will happen?",
    options: [
      "The class file will fail because Windows and Linux use incompatible file systems",
      "The client can run 'Payroll.class' directly using the Linux JVM without recompiling",
      "The client must rewrite the program in C++ before running",
      "The bytecode must be converted into an .exe file first"
    ],
    correctAnswer: 1,
    explanation: "Due to Java's 'Write Once, Run Anywhere' capability, the pre-compiled .class bytecode runs directly on Ubuntu Linux's JVM without requiring any source code modification or recompilation.",
    explanationBn: "জাভার 'Write Once, Run Anywhere' সুবিধার কারণে উইন্ডোজে তৈরি .class ফাইলটি লিনাক্স JVM-এ কোনো পরিবর্তন ছাড়াই সরাসরি চালানো যাবে।",
    hint: "WORA allows cross-platform execution of .class files."
  },
  {
    id: 17,
    question: "What is the relationship between the Java Development Kit (JDK), Java Runtime Environment (JRE), and Java Virtual Machine (JVM)?",
    options: [
      "JVM contains JRE, and JRE contains JDK",
      "JDK contains JRE and development tools (javac); JRE contains JVM and core libraries",
      "JDK and JRE are identical synonyms for the JVM",
      "JVM is only used for web browsers, while JDK is for mobile apps"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy is: JDK (includes javac, debugger, jar tools) > JRE (includes runtime libraries and class loaders) > JVM (the core execution engine that runs bytecode).",
    explanationBn: "সম্পর্কটি হলো: JDK এর মধ্যে JRE ও ডেভেলপার টুলস (javac) থাকে; JRE এর মধ্যে লাইব্রেরি ও JVM থাকে। অর্থাৎ JDK ⊃ JRE ⊃ JVM।",
    hint: "JDK is the full kit, JRE is runtime only, JVM is the innermost engine."
  },
  {
    id: 18,
    question: "What is the Java Native Interface (JNI) in the JVM architecture?",
    options: [
      "A tool to convert Java code to JavaScript for web pages",
      "A framework that allows Java code running in a JVM to interact with native libraries written in C or C++",
      "A security scanner that removes viruses from .class files",
      "A cloud database connection manager"
    ],
    correctAnswer: 1,
    explanation: "JNI (Java Native Interface) is a foreign function interface programming framework that enables Java code in the JVM to call and be called by native applications and libraries written in C, C++, or assembly.",
    explanationBn: "JNI হলো এমন একটি ফ্রেমওয়ার্ক যা JVM-এ চলমান জাভা কোডকে C বা C++ এ লিখিত নেটিভ লাইব্রেরির সাথে যুক্ত হতে সহায়তা করে।",
    hint: "Bridge between Java and C/C++ native system libraries."
  },
  {
    id: 19,
    question: "What happens if a Java program exhausts all available Heap memory during object creation?",
    options: [
      "The computer immediately restarts",
      "The JVM throws a 'java.lang.OutOfMemoryError: Java heap space'",
      "The JVM automatically deletes the source code",
      "The operating system converts the hard drive into RAM"
    ],
    correctAnswer: 1,
    explanation: "When objects fill up heap memory and Garbage Collection cannot free enough space for new allocations, the JVM throws an 'OutOfMemoryError: Java heap space'.",
    explanationBn: "যদি হিপ মেমরিতে নতুন অবজেক্ট তৈরির মতো জায়গা না থাকে এবং GC মেমরি খালি করতে না পারে, তবে JVM 'OutOfMemoryError: Java heap space' প্রদান করে।",
    hint: "The error name explicitly mentions 'OutOfMemory' in Heap space."
  },
  {
    id: 20,
    question: "What happens if a recursive method in Java calls itself infinitely without a terminating base condition?",
    options: [
      "The JVM throws a 'java.lang.StackOverflowError'",
      "The JVM converts the recursion into a for loop",
      "The compiler produces a NullPointerException at compile time",
      "The program runs at double speed"
    ],
    correctAnswer: 0,
    explanation: "Each method invocation creates a new stack frame in Stack Memory. Infinite recursion rapidly consumes all allocated stack memory, resulting in a 'java.lang.StackOverflowError'.",
    explanationBn: "প্রতিটি মেথড কল স্ট্যাকে নতুন ফ্রেম তৈরি করে। অসীম রিকার্শনের কারণে স্ট্যাকের নির্ধারিত মেমরি পূর্ণ হয়ে যায় এবং 'StackOverflowError' ঘটে।",
    hint: "Memory error occurring on the Java method call stack."
  },
  {
    id: 21,
    question: "Which of the following is an advantage of executing bytecode inside the JVM rather than compiling directly to native machine code?",
    options: [
      "Sandboxed security execution and platform independence across heterogeneous hardware",
      "Zero memory consumption during runtime",
      "Automatic generation of database schemas from variable names",
      "Elimination of all syntax errors automatically"
    ],
    correctAnswer: 0,
    explanation: "Bytecode execution inside the JVM provides two monumental benefits: platform portability ('Write Once, Run Anywhere') and sandboxed memory safety (protection against malicious pointers and unauthorized memory access).",
    explanationBn: "JVM-এ বাইটকোড চালানোর দুটি প্রধান সুবিধা হলো প্ল্যাটফর্ম স্বাধীনতা এবং স্যান্ডবক্সড সিকিউরিটি (অননুমোদিত মেমরি অ্যাক্সেস প্রতিরোধ)।",
    hint: "Think about security and cross-platform flexibility."
  },
  {
    id: 22,
    question: "Can two different vendors provide their own implementation of the JVM as long as it adheres to the Java Virtual Machine Specification?",
    options: [
      "No, only Sun Microsystems/Oracle is legally allowed to build a JVM",
      "Yes, examples include Oracle HotSpot, OpenJDK, Eclipse OpenJ9, and Amazon Corretto",
      "No, every computer must use the exact same binary JVM file",
      "Yes, but only if the JVM runs on mobile phones"
    ],
    correctAnswer: 1,
    explanation: "Yes! The JVM is a formal specification. Anyone can build a compliant JVM implementation. Well-known implementations include Oracle HotSpot, OpenJDK, Eclipse OpenJ9, and Amazon Corretto.",
    explanationBn: "হ্যাঁ, JVM হলো একটি মানদণ্ড বা স্পেসিফিকেশন। যেকোনো সংস্থা এই স্পেসিফিকেশন মেনে নিজস্ব JVM তৈরি করতে পারে (যেমন HotSpot, OpenJDK, OpenJ9, Corretto)।",
    hint: "Multiple open-source and commercial JVM implementations exist."
  },
  {
    id: 23,
    question: "In Java, what is the 'Magic Number' that uniquely identifies every valid compiled Java .class file in hexadecimal?",
    options: [
      "0xDEADBEEF",
      "0xCAFEBABE",
      "0x12345678",
      "0xFFFFFFFF"
    ],
    correctAnswer: 1,
    explanation: "Every valid Java bytecode .class file starts with the famous 4-byte hexadecimal magic number '0xCAFEBABE', which the JVM Bytecode Verifier checks first upon loading.",
    explanationBn: "প্রতিটি জাভা .class ফাইলের শুরুতে ৪-বাইটের একটি ইউনিক হেক্সাডেসিমাল ম্যাজিক নাম্বার থাকে যা হলো '0xCAFEBABE'।",
    hint: "It relates to coffee / cafe."
  },
  {
    id: 24,
    question: "Consider a Java class with a static variable 'collegeCode'. Where will this variable reside in JVM memory?",
    options: [
      "In the Java Stack of the main thread",
      "In the Method Area / Metaspace along with the class metadata",
      "On the user's hard drive desktop folder",
      "Inside the CPU cache registers permanently"
    ],
    correctAnswer: 1,
    explanation: "Static variables belong to the class rather than any individual object instance. They are loaded and maintained in the Method Area / Metaspace when the class is initialized by the ClassLoader.",
    explanationBn: "স্ট্যাটিক ভ্যারিয়েবল ক্লাসের অংশ হিসেবে মেথড এরিয়া বা মেটাস্পেসে (Method Area) ক্লাসের মেটাডাটার সাথে সংরক্ষিত থাকে।",
    hint: "Static members belong to the class level, not stack frames."
  },
  {
    id: 25,
    question: "Which of the following best summarizes the CBSE Class 12 IT-802 concept of Java execution?",
    options: [
      "Source Code (.java) -> javac -> Bytecode (.class) -> JVM (Interpreter/JIT) -> Native Machine Code -> Hardware CPU",
      "Source Code (.java) -> JVM -> Assembly Code -> javac -> Hardware CPU",
      "Source Code (.java) -> Web Browser -> HTML5 -> Native Machine Code",
      "Source Code (.java) -> MySQL Server -> SQL Query -> Screen Output"
    ],
    correctAnswer: 0,
    explanation: "The complete pipeline is: Human writes .java -> javac compiles it into platform-neutral .class (bytecode) -> JVM loads and interprets/JIT-compiles bytecode into native host machine instructions -> Hardware CPU executes.",
    explanationBn: "সঠিক ক্রমটি হলো: .java সোর্স কোড -> javac দ্বারা .class বাইটকোডে রূপান্তর -> JVM দ্বারা ইন্টারপ্রেট/JIT কম্পাইল করে নেটিভ কোডে রূপান্তর -> কম্পিউটারের হার্ডওয়্যার CPU-তে এক্সিকিউশন।",
    hint: "Follow the full path from javac to .class to JVM to hardware."
  }
];

export default topic0_questions;
