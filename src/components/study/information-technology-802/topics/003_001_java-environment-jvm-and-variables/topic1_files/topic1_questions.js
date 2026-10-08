const topic1_questions = [
  {
    id: 1,
    question: "What does the famous Java slogan 'WORA' stand for?",
    options: [
      "Write Once, Read Anywhere",
      "Write Once, Run Anywhere",
      "Work Once, Repeat Anywhere",
      "Web Oriented Runtime Architecture"
    ],
    correctAnswer: 1,
    explanation: "'WORA' stands for 'Write Once, Run Anywhere', which emphasizes Java's core capability of writing code once, compiling it to bytecode, and running it on any platform equipped with a JVM.",
    explanationBn: "'WORA' এর পূর্ণরূপ হলো 'Write Once, Run Anywhere', যার অর্থ একবার জাভা কোড লিখে কম্পাইল করলে তা যেকোনো অপারেটিং সিস্টেমে যেখানে JVM আছে সেখানে চালানো যায়।",
    hint: "Think about running the compiled code on any operating system."
  },
  {
    id: 2,
    question: "Why can a native C/C++ executable (.exe) created on Windows not run on a Linux machine?",
    options: [
      "Because Linux computers do not have monitors",
      "Because C/C++ compiles directly into machine instructions and system calls specific to Windows OS and Intel/AMD architecture",
      "Because Linux only understands JavaScript",
      "Because Windows files are always password protected"
    ],
    correctAnswer: 1,
    explanation: "C and C++ compilers produce native machine binaries containing platform-specific system calls and hardware opcodes, making them platform-dependent and incapable of running directly on different operating systems.",
    explanationBn: "C/C++ কম্পাইলার সরাসরি উইন্ডোজের উপযোগী মেশিন কোড ও সিস্টেম কল তৈরি করে, ফলে সেই .exe ফাইলটি লিনাক্সের ভিন্ন আর্কিটেকচারে সরাসরি চলে না।",
    hint: "Native compilation targets one specific OS and CPU."
  },
  {
    id: 3,
    question: "Which of the following mathematical formulas accurately expresses the relationship between JDK, JRE, and JVM?",
    options: [
      "JDK = JRE + Development Tools (javac, etc.)",
      "JVM = JDK + JRE",
      "JRE = JDK + Bytecode",
      "JDK = JVM - Core Class Libraries"
    ],
    correctAnswer: 0,
    explanation: "The correct architectural formula is: JDK = JRE + Development Tools (such as javac, javadoc, jdb). Furthermore, JRE = JVM + Core Class Libraries.",
    explanationBn: "সঠিক সমীকরণটি হলো: JDK = JRE + Development Tools (যেমন javac, jdb)। এছাড়া JRE = JVM + Core Libraries।",
    hint: "JDK is the super-set containing JRE and compiler tools."
  },
  {
    id: 4,
    question: "If a user only wants to run an already compiled Java application (e.g., a school billing software) on their desktop, which package do they need to install?",
    options: [
      "Only the Java Runtime Environment (JRE)",
      "The full Java Development Kit (JDK) with source compiler",
      "A C++ compiler and Visual Studio",
      "A MySQL database server"
    ],
    correctAnswer: 0,
    explanation: "To merely run compiled Java applications (.class or .jar files), an end-user only requires the JRE (Java Runtime Environment), which contains the JVM and runtime libraries.",
    explanationBn: "শুধুমাত্র তৈরি করা জাভা অ্যাপ্লিকেশন চালানোর জন্য ব্যবহারকারীর শুধুমাত্র JRE (Java Runtime Environment) ইনস্টল করলেই চলে, JDK দরকার হয় না।",
    hint: "End users running apps only need the runtime, not development tools."
  },
  {
    id: 5,
    question: "Which of the following tools is found in the JDK but is ABSENT from a standalone JRE?",
    options: [
      "Java Virtual Machine (JVM)",
      "Java Bytecode Compiler (javac.exe)",
      "Standard Java API Class Libraries (rt.jar)",
      "Garbage Collector"
    ],
    correctAnswer: 1,
    explanation: "'javac.exe' (the Java compiler) is a development utility included exclusively in the JDK. JRE only includes the execution runtime ('java.exe') and libraries.",
    explanationBn: "'javac.exe' (জাভা কম্পাইলার) কেবল JDK-তে থাকে, সাধারণ JRE-তে এটি থাকে না।",
    hint: "The tool that compiles .java files into .class files."
  },
  {
    id: 6,
    question: "What makes Java bytecode (.class) platform-independent?",
    options: [
      "It is written in plain English sentences",
      "It is an intermediate format compiled for an abstract virtual machine (JVM) rather than any physical CPU",
      "It contains all known operating systems inside the file",
      "It deletes all hardware constraints on the computer"
    ],
    correctAnswer: 1,
    explanation: "Bytecode is platform-neutral because it conforms to the standard JVM instruction set rather than specific Intel, ARM, or AMD machine architectures.",
    explanationBn: "বাইটকোড প্ল্যাটফর্ম-স্বাধীন কারণ এটি কোনো নির্দিষ্ট প্রসেসরের জন্য তৈরি নয়, বরং একটি সার্বজনীন ভার্চুয়াল মেশিন (JVM)-এর নির্দেশের সেট।",
    hint: "It targets the universal JVM rather than physical hardware."
  },
  {
    id: 7,
    question: "A developer in Barrackpore writes a program 'ResultCalculator.java' on macOS. A school in Naihati runs the compiled 'ResultCalculator.class' on Windows 10. Why does this work without rewriting code?",
    options: [
      "Because macOS and Windows 10 have identical internal source code",
      "Because both systems have their respective platform-specific JVMs that interpret the universal bytecode",
      "Because the internet automatically converts macOS binaries into Windows binaries",
      "Because Java does not use any operating system"
    ],
    correctAnswer: 1,
    explanation: "The macOS JVM and Windows JVM both understand the exact same universal Java bytecode format and translate it into their respective OS/CPU native instructions.",
    explanationBn: "উইন্ডোজ এবং ম্যাক উভয়ের জন্যই নির্দিষ্ট JVM রয়েছে যা একই সার্বজনীন বাইটকোড বুঝতে পারে এবং নিজ নিজ ওএস-এর নির্দেশনায় রূপান্তর করে চালায়।",
    hint: "Each platform has its own JVM to interpret standard bytecode."
  },
  {
    id: 8,
    question: "Which of the following components is platform-DEPENDENT in Java?",
    options: [
      "Java Source Code (.java file)",
      "Java Bytecode (.class file)",
      "Java Virtual Machine (JVM software installer)",
      "Java Language Syntax Specification"
    ],
    correctAnswer: 2,
    explanation: "The JVM is platform-dependent because it must interact directly with the specific operating system and processor architecture (e.g., Windows x64 JVM vs Linux ARM64 JVM).",
    explanationBn: "JVM সফটওয়্যারটি প্ল্যাটফর্ম-নির্ভর, কারণ এটি নির্দিষ্ট অপারেটিং সিস্টেম ও প্রসেসরের সাথে সরাসরি কাজ করার জন্য বিশেষভাবে তৈরি।",
    hint: "You must download a different installer for Windows vs Linux."
  },
  {
    id: 9,
    question: "Which environment variable in Windows must point to the 'bin' folder of the JDK so that 'javac' and 'java' can be run from any command prompt directory?",
    options: [
      "CLASSPATH",
      "PATH",
      "TEMP",
      "JAVA_HOME_BIN"
    ],
    correctAnswer: 1,
    explanation: "The 'PATH' system environment variable tells the operating system where to look for command-line executables like javac.exe and java.exe from any folder.",
    explanationBn: "'PATH' এনভায়রনমেন্ট ভ্যারিয়েবলে JDK-এর bin ফোল্ডারের পাথ যোগ করলে যেকোনো ফোল্ডার থেকে কমান্ড প্রম্পটে javac ও java চালানো যায়।",
    hint: "Standard OS variable for executable search paths."
  },
  {
    id: 10,
    question: "What is the role of the 'CLASSPATH' environment variable in Java?",
    options: [
      "It specifies the screen resolution for Java GUI windows",
      "It tells the JVM and Java compiler where to search for user-defined classes and external JAR packages",
      "It sets the password for MySQL database connections",
      "It determines the internet download speed for Java updates"
    ],
    correctAnswer: 1,
    explanation: "The 'CLASSPATH' environment variable informs the JVM and javac where to search for compiled third-party classes and JAR packages on the filesystem.",
    explanationBn: "'CLASSPATH' ভ্যারিয়েবলটি JVM ও javac-কে বলে দেয় যে বাহ্যিক ক্লাস ও JAR ফাইলগুলো কোন ডিরেক্টরিতে খোঁজা উচিত।",
    hint: "Tells the runtime where to locate .class files."
  },
  {
    id: 11,
    question: "In Java architecture, what does 'rt.jar' (or 'java.base' in modern JDKs) contain?",
    options: [
      "Pre-installed computer video games",
      "Core Java runtime standard class libraries (like java.lang, java.util, java.io)",
      "Virus protection definitions",
      "Operating system bootloader files"
    ],
    correctAnswer: 1,
    explanation: "Core Java runtime class files (such as System, String, Math, ArrayList) are bundled in the standard class libraries (traditionally rt.jar, now modularized in java.base).",
    explanationBn: "জাভার স্ট্যান্ডার্ড লাইব্রেরির ক্লাসগুলো (যেমন String, System, Math ইত্যাদি) rt.jar বা java.base মডিউলে সংরক্ষিত থাকে।",
    hint: "Core classes like System and String live here."
  },
  {
    id: 12,
    question: "Which of the following is true regarding compilation in C vs compilation in Java?",
    options: [
      "C compiles to Bytecode; Java compiles directly to native machine code",
      "C compiles directly to platform-specific machine code; Java compiles to platform-independent Bytecode",
      "Neither C nor Java requires a compiler",
      "Both C and Java produce .class files"
    ],
    correctAnswer: 1,
    explanation: "C compiles directly to native machine code tailored to a single OS/CPU, whereas Java compiles to intermediate, universal Bytecode.",
    explanationBn: "C সরাসরি নির্দিষ্ট ওএস-এর মেশিন কোডে কম্পাইল হয়, যেখানে জাভা প্ল্যাটফর্ম-স্বাধীন বাইটকোডে কম্পাইল হয়।",
    hint: "Direct machine code vs intermediate bytecode."
  },
  {
    id: 13,
    question: "Which of the following best describes the 'Sandboxed Security' model provided by the JVM?",
    options: [
      "Java applications run in an isolated environment where the Bytecode Verifier and Security Manager prevent unauthorized memory tampering and rogue file system operations",
      "Java applications can only run when placed in a sandbox toy box",
      "Java code cannot access the internet under any circumstances",
      "Java code encrypts the computer hard disk automatically"
    ],
    correctAnswer: 0,
    explanation: "The JVM provides a sandbox environment: bytecode is validated before execution, pointers are abstracted away, and the Security Manager restricts unauthorized OS operations.",
    explanationBn: "JVM স্যান্ডবক্স পরিবেশ প্রদান করে যেখানে বাইটকোড ভেরিফায়ার নিশ্চিত করে কোনো ক্ষতিকারক মেমরি হস্তক্ষেপ বা অননুমোদিত কাজ ঘটবে না।",
    hint: "Restricted runtime environment with safety checks."
  },
  {
    id: 14,
    question: "Which utility in the JDK allows a developer to inspect and disassemble the compiled bytecode of a .class file?",
    options: [
      "javap",
      "javac",
      "jdb",
      "javadoc"
    ],
    correctAnswer: 0,
    explanation: "'javap' (the Java Class File Disassembler) allows developers to inspect fields, methods, and disassembled bytecode opcodes contained in a .class file.",
    explanationBn: "'javap' হলো জাভা ডিসঅ্যাসেম্বলার যার সাহায্যে কোনো .class ফাইলের অভ্যন্তরীণ বাইটকোড ও মেথড দেখা যায়।",
    hint: "The Java class file disassembler tool."
  },
  {
    id: 15,
    question: "Can a Java application compiled with JDK 21 run on a very old JVM version (e.g. Java 1.4)?",
    options: [
      "Yes, all Java versions are fully forward and backward compatible without limits",
      "No, older JVMs cannot execute bytecode compiled with newer major class file versions (UnsupportedClassVersionError)",
      "Yes, because Java bytecode never changes across decades",
      "Yes, but only if the computer is connected to the internet"
    ],
    correctAnswer: 1,
    explanation: "Java guarantees backward compatibility (newer JVMs run older bytecode), but older JVMs cannot run bytecode compiled by newer JDKs without targeting older source levels (yielding UnsupportedClassVersionError).",
    explanationBn: "না, পুরনো JVM নতুন JDK দ্বারা তৈরি বাইটকোড চালাতে পারে না এবং UnsupportedClassVersionError প্রদান করে। তবে নতুন JVM পুরনো বাইটকোড নির্বিঘ্নে চালাতে পারে।",
    hint: "Backward compatibility works forward, not reverse."
  },
  {
    id: 16,
    question: "Which command-line argument tells 'javac' to save the compiled .class files in a specific directory named 'bin'?",
    options: [
      "javac -d bin App.java",
      "javac -output bin App.java",
      "javac -save bin App.java",
      "javac -dest bin App.java"
    ],
    correctAnswer: 0,
    explanation: "The '-d' (destination) flag in javac specifies the root output directory where compiled package hierarchies and .class files are placed.",
    explanationBn: "'javac -d bin App.java' কমান্ডের '-d' ফ্ল্যাগটি কম্পাইল করা .class ফাইল নির্দিষ্ট 'bin' ফোল্ডারে সংরক্ষণের জন্য নির্দেশ করে।",
    hint: "'-d' stands for destination directory."
  },
  {
    id: 17,
    question: "What is an archive file with a '.jar' extension in Java?",
    options: [
      "A Java Audio Recording file",
      "Java ARchive file that packages multiple compiled .class files, metadata, and resources into a single compressed ZIP-based file",
      "A JSON Array Resource file",
      "A JavaScript Animation Resource file"
    ],
    correctAnswer: 1,
    explanation: "JAR stands for 'Java ARchive'. It is a ZIP-formatted archive file used to aggregate many Java class files and associated metadata into a single distributable bundle.",
    explanationBn: "JAR (Java ARchive) হলো জিপ ফরম্যাটের একটি প্যাকেজ যা একাধিক .class ফাইল ও রিসোর্সকে একটিমাত্র ফাইলে একত্র করে সহজে ব্যবহারের উপযোগী করে।",
    hint: "JAR stands for Java ARchive."
  },
  {
    id: 18,
    question: "Which of the following is NOT a development tool found inside the JDK bin directory?",
    options: [
      "javac.exe (Compiler)",
      "javadoc.exe (Documentation Generator)",
      "jar.exe (Archiving Tool)",
      "photoshop.exe (Image Editor)"
    ],
    correctAnswer: 3,
    explanation: "Photoshop is third-party graphics software and has nothing to do with the Java Development Kit.",
    explanationBn: "Photoshop একটি গ্রাফিক্স সফটওয়্যার, এটি JDK-এর অংশ নয়। JDK-তে javac, javadoc, jar, jdb ইত্যাদি থাকে।",
    hint: "Pick the image editing program."
  },
  {
    id: 19,
    question: "How does the JVM achieve both platform independence AND high execution speed?",
    options: [
      "By using only an interpreter without any memory allocation",
      "By combining the flexibility of an interpreter with the high speed of a Just-In-Time (JIT) compiler",
      "By deleting the operating system while the program is running",
      "By executing code directly in the graphics card hardware"
    ],
    correctAnswer: 1,
    explanation: "The JVM starts fast with an interpreter for universal portability, while the JIT compiler identifies repetitive hot spots and turns them into blazing-fast native machine code at runtime.",
    explanationBn: "JVM ইন্টারপ্রেটার দিয়ে দ্রুত শুরু করে প্ল্যাটফর্ম স্বাধীনতা বজায় রাখে এবং JIT কম্পাইলারের মাধ্যমে বারবার ব্যবহৃত কোড নেটিভ স্পিডে চালিয়ে উচ্চ কর্মক্ষমতা অর্জন করে।",
    hint: "Hybrid combination of Interpreter and JIT compiler."
  },
  {
    id: 20,
    question: "Which of the following statements is TRUE about Java source files?",
    options: [
      "A public class named 'Student' must be saved in a file named exactly 'Student.java'",
      "A .java file can contain multiple public classes",
      "Java source code is completely case-insensitive",
      "Java programs cannot run without an active internet connection"
    ],
    correctAnswer: 0,
    explanation: "In Java, if a class is declared 'public', the source file must have the exact same name with case sensitivity (e.g., public class Student -> Student.java).",
    explanationBn: "জাভায় কোনো ক্লাস যদি 'public' হয়, তবে সোর্স ফাইলের নাম অবিকল সেই ক্লাসের নামের সমান হতে হবে (যেমন: public class Student হলে ফাইল হবে Student.java)।",
    hint: "The public class name must match the .java file name."
  },
  {
    id: 21,
    question: "Why is WORA particularly advantageous for educational institutions like CBSE schools in India?",
    options: [
      "Students can write Java code on school Windows PCs and test the same .class files on home Linux laptops without rewriting code",
      "It eliminates the need for students to study programming",
      "It guarantees 100% marks in practical exams automatically",
      "It replaces all teachers with AI robots"
    ],
    correctAnswer: 0,
    explanation: "WORA allows students and educational institutions with diverse hardware and operating systems (Windows, Linux, macOS) to collaborate and execute code interchangeably without modification.",
    explanationBn: "WORA-এর কারণে শিক্ষার্থীরা স্কুলের উইন্ডোজ কম্পিউটারে কোড লিখে একই .class ফাইল বাড়ির লিনাক্স বা ম্যাক ল্যাপটপে কোনো পরিবর্তন ছাড়াই চালাতে পারে।",
    hint: "Portability allows effortless sharing across diverse OS environments."
  },
  {
    id: 22,
    question: "What is the primary role of the 'javadoc' tool in the JDK?",
    options: [
      "To automatically generate HTML-formatted API documentation from doc comments in source code",
      "To convert Java code into JavaScript",
      "To fix all compile-time errors in Java code",
      "To design printable certificates for students"
    ],
    correctAnswer: 0,
    explanation: "'javadoc' parses special documentation comments (/** ... */) in Java source code and generates standardized HTML API documentation pages.",
    explanationBn: "'javadoc' টুলটি সোর্স কোডের ডক কমেন্ট (/** ... */) পড়ে স্বয়ংক্রিয়ভাবে স্ট্যান্ডার্ড HTML ডকুমেন্টেশন পেজ তৈরি করে।",
    hint: "Generates HTML documentation from comments."
  },
  {
    id: 23,
    question: "Which part of the Java architecture is responsible for loading Java core classes from the system?",
    options: [
      "Bootstrap ClassLoader",
      "Garbage Collector",
      "System Registry",
      "Operating System Shell"
    ],
    correctAnswer: 0,
    explanation: "The Bootstrap ClassLoader (the root class loader implemented in native code) is responsible for loading core Java runtime classes (like java.lang.Object).",
    explanationBn: "বুটস্ট্র্যাপ ক্লাসলোডার (Bootstrap ClassLoader) জাভার মূল রানটাইম ক্লাসগুলো (যেমন java.lang.*) মেমরিতে লোড করে।",
    hint: "The root classloader in the JVM hierarchy."
  },
  {
    id: 24,
    question: "If a developer modifies 'Payroll.java', what must they do before running the changes with 'java Payroll'?",
    options: [
      "Recompile the source code using 'javac Payroll.java' to generate updated bytecode",
      "Restart the operating system",
      "Reinstall the JDK",
      "Change the file extension to .exe"
    ],
    correctAnswer: 0,
    explanation: "Because 'java' executes the compiled .class file, any change in .java source code must be recompiled with 'javac' to produce the updated .class bytecode.",
    explanationBn: "যেহেতু 'java' কমান্ড .class বাইটকোড চালায়, তাই সোর্স কোডে কোনো পরিবর্তন করলে প্রথমে 'javac Payroll.java' দিয়ে পুনরায় কম্পাইল করতে হয়।",
    hint: "Recompile to refresh the bytecode file."
  },
  {
    id: 25,
    question: "Which of the following correctly summarizes the CBSE IT-802 distinction between JDK, JRE, and JVM?",
    options: [
      "JDK is for development (compiler included); JRE is for running apps (libraries + JVM); JVM is the runtime engine executing bytecode",
      "JVM is for development; JRE is the compiler; JDK is the hardware CPU",
      "JDK, JRE, and JVM are completely identical terms with no difference",
      "JDK runs in web browsers; JRE runs in mobile phones; JVM runs on servers"
    ],
    correctAnswer: 0,
    explanation: "In summary: JDK is the developer toolset (with javac), JRE is the client execution runtime (with libraries + JVM), and JVM is the abstract engine that executes the bytecode.",
    explanationBn: "সংক্ষেপে: JDK হলো ডেভেলপার কিট (কম্পাইলার সহ), JRE হলো রানটাইম এনভায়রনমেন্ট (লাইব্রেরি + JVM), এবং JVM হলো বাইটকোড এক্সিকিউট করার মূল ইঞ্জিন।",
    hint: "JDK develops, JRE packages runtime, JVM executes bytecode."
  }
];

export default topic1_questions;
