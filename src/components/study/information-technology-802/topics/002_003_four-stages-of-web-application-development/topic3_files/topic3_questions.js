const topic3_questions = [
  {
    id: 1,
    question: "What is the primary objective of the 'Implementation / Coding Phase' in web development?",
    options: [
      "To draft the project budget and financial invoices",
      "To translate the Design Document Specifications (DDS) into working, executable source code",
      "To gather client requirements via surveys",
      "To conduct final marketing campaigns"
    ],
    correctAnswer: 1,
    explanation: "The Implementation Phase converts structural blueprints and design specifications into actual programming code across front-end and back-end tiers.",
    explanationBengali: "ইমপ্লিমেন্টেশন বা কোডিং পর্বের মূল লক্ষ্য হলো ডিজাইন স্পেসিফিকেশনগুলোকে কার্যকরী সোর্স কোডে রূপান্তর করা।"
  },
  {
    id: 2,
    question: "Which of the following is considered the primary input to the Implementation Phase?",
    options: [
      "Software Requirements Specification (SRS) alone without designs",
      "Approved Design Document Specification (DDS) including ER schemas and UI wireframes",
      "Bug Reports from final Beta Testing",
      "User Acceptance Certificate"
    ],
    correctAnswer: 1,
    explanation: "Developers write code based directly on the approved DDS (wireframes, table schemas, class diagrams) produced in Stage 2.",
    explanationBengali: "ডেভেলপাররা ডিজাইন ফেজে তৈরি অনুমোদিত DDS (ডিজাইন ডকুমেন্ট স্পেসিফিকেশন)-এর ওপর ভিত্তি করে কোড লিখেন।"
  },
  {
    id: 3,
    question: "Which set of technologies is predominantly used for front-end web development?",
    options: [
      "HTML5, CSS3, and JavaScript",
      "C++, Assembly, and COBOL",
      "MySQL, Oracle, and MongoDB",
      "Apache Tomcat and Nginx"
    ],
    correctAnswer: 0,
    explanation: "HTML5 builds semantic document structure, CSS3 provides responsive styling, and JavaScript adds interactive dynamic behavior.",
    explanationBengali: "ফ্রন্ট-এন্ড ওয়েব ডেভেলপমেন্টে মূলত HTML5 (স্ট্রাকচার), CSS3 (স্টাইলিং) এবং JavaScript (ইন্টারঅ্যাকশন) ব্যবহৃত হয়।"
  },
  {
    id: 4,
    question: "Why should developers use `PreparedStatement` instead of `Statement` when executing SQL queries in Java back-end code?",
    options: [
      "To make Java code compile into Python code",
      "To prevent SQL Injection vulnerabilities and pre-compile SQL queries for better performance",
      "To bypass database passwords completely",
      "To increase font sizes in MySQL output"
    ],
    correctAnswer: 1,
    explanation: "PreparedStatements parameterize input with placeholders (`?`), neutralizing malicious SQL injection attacks and optimizing query execution plans.",
    explanationBengali: "PreparedStatement প্যারামিটারাইজড কুয়েরি ব্যবহার করে SQL Injection আক্রমণ প্রতিরোধ করে এবং কুয়েরি দ্রুত এক্সিকিউট করে।"
  },
  {
    id: 5,
    question: "Which JDBC method is used to execute `INSERT`, `UPDATE`, or `DELETE` SQL statements in Java?",
    options: [
      "executeQuery()",
      "executeUpdate()",
      "fetchRows()",
      "commitTransactionOnly()"
    ],
    correctAnswer: 1,
    explanation: "`executeUpdate()` executes DML/DDL statements (INSERT, UPDATE, DELETE) and returns the number of affected rows (an integer).",
    explanationBengali: "`executeUpdate()` মেথডটি INSERT, UPDATE এবং DELETE কুয়েরি চালানোর জন্য ব্যবহৃত হয় এবং প্রভাবিত সারির সংখ্যা রিটার্ন করে।"
  },
  {
    id: 6,
    question: "Which JDBC method is used to execute a `SELECT` query and retrieve database records in Java?",
    options: [
      "executeUpdate()",
      "executeQuery()",
      "dropTable()",
      "createConnection()"
    ],
    correctAnswer: 1,
    explanation: "`executeQuery()` executes SELECT statements and returns a `ResultSet` object containing the retrieved tabular data.",
    explanationBengali: "`executeQuery()` মেথডটি SELECT কুয়েরি রান করে এবং ডেটা সহ একটি ResultSet অবজেক্ট রিটার্ন করে।"
  },
  {
    id: 7,
    question: "What is the role of the `ResultSet` object in Java JDBC programming?",
    options: [
      "It represents a tabular stream of database rows returned by a SELECT query",
      "It compiles Java code into native machine code",
      "It renders CSS styles in Google Chrome",
      "It encrypts hard drives"
    ],
    correctAnswer: 0,
    explanation: "A `ResultSet` maintains a cursor pointing to a table of data, allowing rows to be traversed using `.next()` and read using `.getString()`, `.getInt()`, etc.",
    explanationBengali: "`ResultSet` হলো একটি কার্সার ভিত্তিক অবজেক্ট যা SELECT কুয়েরির মাধ্যমে প্রাপ্ত টেবিলের রেকর্ডগুলো একে একে রিড করতে সাহায্য করে।"
  },
  {
    id: 8,
    question: "What does AJAX / Fetch API enable in modern web application front-ends?",
    options: [
      "Asynchronous data exchange with the server without reloading the entire web page",
      "Permanent deletion of client-side hard drive files",
      "Direct hardware acceleration of CPU fans",
      "Bypassing internet service provider firewalls"
    ],
    correctAnswer: 0,
    explanation: "AJAX and Fetch API allow web pages to send and receive data from web servers asynchronously in the background without refreshing the page.",
    explanationBengali: "AJAX বা Fetch API পেজ রিলোড না করেই ব্যাকগ্রাউন্ডে সার্ভারের সাথে ডেটা আদান-প্রদান করতে দেয়।"
  },
  {
    id: 9,
    question: "In desktop Java GUI development using NetBeans, which component is used to trigger action events when clicked?",
    options: [
      "JLabel",
      "JButton",
      "JPanel",
      "JProgressBar"
    ],
    correctAnswer: 1,
    explanation: "`JButton` triggers an `ActionEvent` when clicked, which is handled inside the `actionPerformed()` event handler method.",
    explanationBengali: "NetBeans GUI-তে `JButton` ক্লিকের মাধ্যমে অ্যাকশন ইভেন্ট ট্রিগার করে, যা `actionPerformed()` মেথডে প্রসেস করা হয়।"
  },
  {
    id: 10,
    question: "Which of the following represents a best practice for clean, maintainable code during Stage 3?",
    options: [
      "Writing all code in a single 10,000-line file with single-letter variable names",
      "Using meaningful variable identifiers, modular functions, consistent indentation, and explanatory comments",
      "Hardcoding database passwords in client-side HTML files",
      "Disabling all error handling and try-catch blocks"
    ],
    correctAnswer: 1,
    explanation: "Clean code adheres to naming conventions, modular component design, proper indentation, and robust exception handling.",
    explanationBengali: "অর্থপূর্ণ ভ্যারিয়েবলের নাম, মডিউলার ফাংশন, সঠিক ইন্ডেন্টেশন ও কমেন্ট ব্যবহার করা কোডিংয়ের সর্বোত্তম নিয়ম।"
  },
  {
    id: 11,
    question: "What is the function of a 'Version Control System' (such as Git) during the coding phase?",
    options: [
      "It tracks code changes, manages branches, and enables collaborative development among multiple programmers",
      "It replaces the need for writing HTML or CSS",
      "It automatically pays developer salaries",
      "It prevents web servers from getting dusty"
    ],
    correctAnswer: 0,
    explanation: "Git tracks historical commits, merges code written by team members, and prevents accidental code overwrites.",
    explanationBengali: "Git ভার্সন কন্ট্রোল কোডের পরিবর্তন রেকর্ড রাখে, ব্রাঞ্চিং পরিচালনা করে এবং একাধিক ডেভেলপারের একসাথে কাজ করা সহজ করে।"
  },
  {
    id: 12,
    question: "Which Java package provides classes and interfaces for JDBC database connectivity?",
    options: [
      "java.io.*",
      "java.sql.*",
      "java.awt.*",
      "java.net.*"
    ],
    correctAnswer: 1,
    explanation: "The `java.sql` package contains `Connection`, `DriverManager`, `Statement`, `PreparedStatement`, and `ResultSet`.",
    explanationBengali: "`java.sql` প্যাকেজে JDBC ডেটাবেস সংযোগের সমস্ত ক্লাস এবং ইন্টারফেস রয়েছে।"
  },
  {
    id: 13,
    question: "What is the purpose of input sanitization during front-end and back-end implementation?",
    options: [
      "To clean dust off keyboard keys",
      "To filter out dangerous characters and scripts to prevent Cross-Site Scripting (XSS) and SQL injection",
      "To make user input bold and italic",
      "To automatically convert rupee amounts to dollars"
    ],
    correctAnswer: 1,
    explanation: "Sanitizing and validating user inputs prevents attackers from injecting malicious scripts (XSS) or destructive SQL statements.",
    explanationBengali: "ইনপুট স্যানিটাইজেশন ক্ষতিকারক স্ক্রিপ্ট ও স্পেশাল ক্যারেক্টার ফিল্টার করে XSS এবং SQL Injection প্রতিরোধ করে।"
  },
  {
    id: 14,
    question: "In NetBeans Java Swing, which component is used to capture single-line textual user input (e.g., Consumer ID)?",
    options: [
      "JLabel",
      "JTextField",
      "JRadioButton",
      "JCheckBox"
    ],
    correctAnswer: 1,
    explanation: "`JTextField` allows users to enter and edit a single line of unformatted text.",
    explanationBengali: "`JTextField` ব্যবহারকারীকে এক লাইনের টেক্সট ইনপুট (যেমন কনজিউমার আইডি) প্রদান করতে সাহায্য করে।"
  },
  {
    id: 15,
    question: "Why should database credentials (username and password) never be embedded in client-side JavaScript code?",
    options: [
      "Because JavaScript files are executed in the user's browser, allowing anyone to inspect source code and steal database access",
      "Because JavaScript cannot connect to the internet",
      "Because JavaScript automatically deletes passwords every 5 minutes",
      "Because web servers crash when reading JavaScript strings"
    ],
    correctAnswer: 0,
    explanation: "Client-side code is publicly viewable via browser developer tools; database access must always be mediated by a secure back-end tier.",
    explanationBengali: "ব্রাউজারে ক্লায়েন্ট-সাইড JS কোড যে কেউ 'View Source' বা DevTools দিয়ে দেখতে পারে, তাই ডেটাবেস ক্রেডেনশিয়াল কখনোই ক্লায়েন্টে রাখা যাবে না।"
  },
  {
    id: 16,
    question: "What is a 'REST API' developed during the implementation phase?",
    options: [
      "A software interface enabling systems to communicate over HTTP using standard methods like GET, POST, PUT, DELETE",
      "A holiday schedule for programmers",
      "An automated sleep timer for web servers",
      "A printer driver protocol"
    ],
    correctAnswer: 0,
    explanation: "REST (Representational State Transfer) APIs allow front-end apps to send and retrieve structured JSON data to and from back-end servers.",
    explanationBengali: "REST API হলো একটি ইন্টারফেস যা HTTP পদ্ধতির (GET, POST ইত্যাদি) মাধ্যমে ক্লায়েন্ট ও সার্ভারের মধ্যে JSON ডেটা আদান-প্রদান করতে ব্যবহৃত হয়।"
  },
  {
    id: 17,
    question: "What happens if an unexpected database connection error occurs during Java backend execution?",
    options: [
      "The computer catches fire",
      "A `SQLException` is thrown, which should be caught inside a `try-catch` block to provide graceful error handling",
      "The database automatically deletes all tables",
      "The Java compiler uninstalls itself"
    ],
    correctAnswer: 1,
    explanation: "Database errors throw a checked `SQLException`, which developers must handle gracefully with `try-catch-finally` to avoid server crashes.",
    explanationBengali: "ডেটাবেস ত্রুটি হলে `SQLException` তৈরি হয়, যা `try-catch` ব্লকে হ্যান্ডেল করে ব্যবহারকারীকে সুন্দর বার্তা দিতে হয়।"
  },
  {
    id: 18,
    question: "Which HTTP method is universally used when a client submits sensitive form data (e.g. passwords, billing payments) to the server?",
    options: [
      "GET",
      "POST",
      "HEAD",
      "OPTIONS"
    ],
    correctAnswer: 1,
    explanation: "POST packages data inside the HTTP request body rather than displaying parameters openly in the browser URL query string.",
    explanationBengali: "সংবেদনশীল ডেটা (যেমন পাসওয়ার্ড বা বিল পেমেন্ট) পাঠানোর জন্য POST মেথড ব্যবহৃত হয় কারণ এটি URL-এ ডেটা উন্মুক্ত করে না।"
  },
  {
    id: 19,
    question: "In Java JDBC, which object is responsible for establishing a physical connection to the MySQL database?",
    options: [
      "DriverManager.getConnection(url, user, password)",
      "System.out.println()",
      "Scanner.nextLine()",
      "Math.random()"
    ],
    correctAnswer: 0,
    explanation: "`DriverManager.getConnection()` connects to the database using the JDBC URL (e.g. `jdbc:mysql://localhost:3306/billing_db`).",
    explanationBengali: "`DriverManager.getConnection()` নির্দিষ্ট JDBC URL এবং ইউজারনেম/পাসওয়ার্ড দিয়ে ডেটাবেসের সাথে কানেকশন তৈরি করে।"
  },
  {
    id: 20,
    question: "What is 'Modularity' in software implementation?",
    options: [
      "Breaking a large software program into smaller, independent, reusable modules or classes",
      "Buying expensive computer monitors",
      "Writing duplicate code across multiple files",
      "Disabling CSS styles"
    ],
    correctAnswer: 0,
    explanation: "Modularity divides code into manageable components (e.g. BillingService, AuthService, DBConnection), improving readability and reusability.",
    explanationBengali: "মডিউলারিটি হলো একটি বড় প্রোগ্রামকে ছোট ছোট স্বাধীন ও পুনর্ব্যবহারযোগ্য মডিউলে বিভক্ত করার প্রক্রিয়া।"
  },
  {
    id: 21,
    question: "What is the primary deliverable of Stage 3 (Implementation / Coding Phase)?",
    options: [
      "A signed client questionnaire",
      "Complete, fully functional, and integrated source code repository ready for testing",
      "The initial project feasibility study",
      "The final marketing brochure"
    ],
    correctAnswer: 1,
    explanation: "The output of Stage 3 is the integrated, executable source code codebase covering front-end and back-end modules.",
    explanationBengali: "তৃতীয় পর্বের মূল ডেলিভারেবল হলো সম্পূর্ণ কার্যকরী এবং সমন্বিত সোর্স কোড রিপোজিটরি যা টেস্ট করার জন্য প্রস্তুত।"
  },
  {
    id: 22,
    question: "What is 'Continuous Integration' (CI) during modern software coding?",
    options: [
      "Regularly merging developer code commits into a central repository and running automated compilation and tests",
      "Writing code for 24 hours without sleeping",
      "Deleting previous versions of code permanently",
      "Keeping the web server disconnected from the network"
    ],
    correctAnswer: 0,
    explanation: "CI automates building and verifying code whenever developers commit changes, identifying merge conflicts early.",
    explanationBengali: "CI (Continuous Integration) হলো স্বয়ংক্রিয়ভাবে কোড একত্রীকরণ এবং বিল্ড/টেস্ট চালিয়ে ত্রুটি দ্রুত শনাক্ত করার প্রক্রিয়া।"
  },
  {
    id: 23,
    question: "Which of the following represents a secure coding practice for storing user passwords in the database?",
    options: [
      "Storing passwords as plain text strings (e.g. 'mypassword123')",
      "Hashing passwords using one-way cryptographic algorithms with salt (e.g., BCrypt, PBKDF2)",
      "Sharing user passwords on public chat channels",
      "Saving passwords in a public text file on the desktop"
    ],
    correctAnswer: 1,
    explanation: "Passwords must never be saved in plaintext; secure systems hash and salt passwords so even database administrators cannot view them.",
    explanationBengali: "পাসওয়ার্ড কখনোই প্লেইন টেক্সটে রাখা উচিত নয়; সেগুলোকে শক্তিশালী হ্যাশিং অ্যালগরিদম (যেমন BCrypt) দিয়ে হ্যাশ করে সংরক্ষণ করতে হয়।"
  },
  {
    id: 24,
    question: "In NetBeans Swing GUI, how do you extract text entered into a `JTextField` named `txtConsumerId`?",
    options: [
      "txtConsumerId.getText()",
      "txtConsumerId.deleteText()",
      "txtConsumerId.clear()",
      "txtConsumerId.sendEmail()"
    ],
    correctAnswer: 0,
    explanation: "`txtConsumerId.getText()` returns a `String` containing the characters entered by the user in the text field.",
    explanationBengali: "`txtConsumerId.getText()` মেথডটি টেক্সটফিল্ডে ব্যবহারকারীর টাইপ করা স্ট্রিং মানটি রিট্রিভ করে।"
  },
  {
    id: 25,
    question: "What phase immediately follows the Implementation / Coding Phase in the standard Web Application Development Lifecycle?",
    options: [
      "Requirement Definition Phase",
      "Testing & Quality Assurance Phase (Stage 4)",
      "Design Phase (Stage 2)",
      "Feasibility Study Phase"
    ],
    correctAnswer: 1,
    explanation: "Once the code is implemented, it directly enters Stage 4: Testing & Quality Assurance Phase for rigorous bug hunting and validation.",
    explanationBengali: "কোডিং সমাপ্ত হওয়ার পর অ্যাপ্লিকেশনটি সরাসরি চতুর্থ পর্বে (Stage 4: Testing & Quality Assurance Phase) প্রবেশ করে।"
  }
];

export default topic3_questions;
