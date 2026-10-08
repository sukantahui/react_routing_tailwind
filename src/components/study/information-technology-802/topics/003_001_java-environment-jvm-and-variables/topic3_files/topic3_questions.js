const topic3_questions = [
  {
    id: 1,
    question: "Which of the following is a VALID variable declaration in Java?",
    options: [
      "int 2ndSemester = 85;",
      "double percentage = 87.6%;",
      "char Section = 'D';",
      "float total-marks = 450.0f;"
    ],
    correctAnswer: 2,
    explanation: "'char Section = 'D';' is valid because 'Section' is a valid identifier (starts with a letter) and 'D' is a single character enclosed in single quotes. The other options fail due to: starting with a digit (2ndSemester), invalid '%' symbol, and invalid hyphen/subtraction operator (total-marks).",
    explanationBn: "'char Section = 'D';' সম্পূর্ণ বৈধ কারণ Section একটি সঠিক আইডেন্টিফায়ার এবং 'D' একক উদ্ধৃতিচিহ্নে আবদ্ধ। বাকি অপশনগুলোতে ডিজিট দিয়ে শুরু, অবৈধ % প্রতীক এবং বিয়োগ চিহ্ন (-) ব্যবহারের কারণে ভুল।",
    hint: "Identifiers cannot start with a digit or contain special symbols like % or -."
  },
  {
    id: 2,
    question: "Why is the declaration `double percentage = 87.6%;` INVALID in Java?",
    options: [
      "Because double cannot store numbers with decimal points",
      "Because the '%' symbol is the modulus operator in Java and is not allowed inside numeric literals or variable names",
      "Because percentage must always be an integer",
      "Because the semicolon is in the wrong place"
    ],
    correctAnswer: 1,
    explanation: "In Java, '%' is the arithmetic modulus operator. Java does not support mathematical percent notation in numeric literals. The literal must be written as `87.6` or `0.876`.",
    explanationBn: "জাভায় '%' হলো মডুলাস (ভাগশেষ) অপারেটর, তাই সংখ্যাসূচক মানে '%' লিখলে সিনট্যাক্স এরর হয়। সঠিক রূপ হবে `87.6`।",
    hint: "The percent sign is treated as an operator, not a literal suffix."
  },
  {
    id: 3,
    question: "Which of the following characters can legally be used to START a Java identifier?",
    options: [
      "Digits (0-9)",
      "Hyphen (-)",
      "Underscore (_) or Dollar sign ($)",
      "At symbol (@)"
    ],
    correctAnswer: 2,
    explanation: "Java identifiers can only begin with a letter (A-Z, a-z), an underscore (_), or a currency dollar sign ($). Starting with digits or symbols like @, #, % is strictly prohibited.",
    explanationBn: "জাভা আইডেন্টিফায়ার শুধুমাত্র অক্ষর (A-Z, a-z), আন্ডারস্কোর (_) অথবা ডলার ($) চিহ্ন দিয়ে শুরু হতে পারে। ডিজিট বা @ চিহ্ন দিয়ে শুরু হতে পারে না।",
    hint: "Letter, underscore, or dollar sign."
  },
  {
    id: 4,
    question: "Which of the following is a reserved keyword in Java and CANNOT be used as an identifier?",
    options: [
      "main",
      "final",
      "String",
      "System"
    ],
    correctAnswer: 1,
    explanation: "'final' is a reserved Java keyword (used for constants and non-inheritable classes/methods). 'main' is a regular method identifier, and 'String' and 'System' are class names (valid identifiers, though shadowing them is bad practice).",
    explanationBn: "'final' হলো একটি সংরক্ষিত জাভা কিওয়ার্ড (Keyword), তাই এটিকে কোনো ভ্যারিয়েবলের নাম হিসেবে ব্যবহার করা অবৈধ।",
    hint: "The keyword used to declare constants."
  },
  {
    id: 5,
    question: "How does the Java compiler treat the identifiers `StudentName`, `studentname`, and `STUDENTNAME`?",
    options: [
      "As three completely separate and distinct identifiers because Java is strictly case-sensitive",
      "As identical synonyms causing a duplicate variable compiler error",
      "As automatic conversions to uppercase",
      "As invalid syntax"
    ],
    correctAnswer: 0,
    explanation: "Java is strictly case-sensitive. 'StudentName', 'studentname', and 'STUDENTNAME' differ in letter casing and are treated as three independent variables in memory.",
    explanationBn: "জাভা কঠোরভাবে কেস-সেনসিটিভ (Case-Sensitive), তাই 'StudentName', 'studentname', এবং 'STUDENTNAME' তিনটি সম্পূর্ণ পৃথক ভ্যারিয়েবল হিসেবে গণ্য হয়।",
    hint: "Case sensitivity distinguishes uppercase from lowercase."
  },
  {
    id: 6,
    question: "Which of the following identifier names is INVALID in Java?",
    options: [
      "_userCount",
      "$totalRevenue",
      "student_101",
      "3rdAttempt"
    ],
    correctAnswer: 3,
    explanation: "'3rdAttempt' is invalid because Java identifiers cannot begin with a numeric digit (0-9).",
    explanationBn: "'3rdAttempt' অবৈধ কারণ কোনো জাভা আইডেন্টিফায়ারের নাম ডিজিট (০-৯) দিয়ে শুরু হতে পারে না।",
    hint: "Look for the name starting with a number."
  },
  {
    id: 7,
    question: "What is wrong with the declaration: `int student roll = 45;`?",
    options: [
      "45 is too large for an int",
      "There is an illegal space between 'student' and 'roll'",
      "int cannot be lowercase",
      "The equal sign must be '=='"
    ],
    correctAnswer: 1,
    explanation: "Java identifiers cannot contain whitespace (spaces, tabs). The variable name must be connected, such as `studentRoll` or `student_roll`.",
    explanationBn: "জাভা ভ্যারিয়েবলের নামের মাঝে কোনো ফাঁকা স্থান (Space) থাকতে পারে না। সঠিক নাম হবে `studentRoll` বা `student_roll`।",
    hint: "Whitespace is not allowed in identifiers."
  },
  {
    id: 8,
    question: "Which of the following declarations correctly demonstrates the standard camelCase naming convention for variables in Java?",
    options: [
      "int Student_Daily_Attendance_Count;",
      "int studentDailyAttendanceCount;",
      "int STUDENTDAILYATTENDANCECOUNT;",
      "int student_daily_attendance_count;"
    ],
    correctAnswer: 1,
    explanation: "CamelCase convention begins with a lowercase letter and capitalizes the first letter of each subsequent concatenated word (e.g. `studentDailyAttendanceCount`).",
    explanationBn: "জাভায় ভ্যারিয়েবলের আদর্শ CamelCase কনভেনশন হলো প্রথম শব্দ ছোট হাতের অক্ষরে শুরু করা এবং পরবর্তী প্রতিটি শব্দের প্রথম অক্ষর বড় হাতের করা (যেমন: `studentDailyAttendanceCount`)।",
    hint: "Starts lowercase, next words capitalized."
  },
  {
    id: 9,
    question: "What is the compiler result for the statement: `int _ = 50;` in modern Java (Java 9+)?",
    options: [
      "Compiles successfully and prints 50",
      "Compile-time error: as of Java 9, a single underscore '_' is a reserved keyword and cannot be used as an identifier",
      "Converts 50 into a string",
      "Throws an ArithmeticException"
    ],
    correctAnswer: 1,
    explanation: "Starting in Java 9, the single underscore character `_` was officially made a reserved keyword and can no longer be used as a standalone identifier (though names like `_count` or `total_` remain valid).",
    explanationBn: "জাভা ৯ থেকে একটিমাত্র আন্ডারস্কোর `_` কে সংরক্ষিত কিওয়ার্ড করা হয়েছে, তাই একক `_` দিয়ে ভ্যারিয়েবল ডিক্লেয়ার করলে কম্পাইল এরর হয়।",
    hint: "A single underscore is a reserved keyword in modern Java."
  },
  {
    id: 10,
    question: "Consider the statement: `char ch = \"K\";`. What will the Java compiler report?",
    options: [
      "Success, ch stores 'K'",
      "Error: incompatible types: java.lang.String cannot be converted to char",
      "Warning: single quote recommended",
      "Runtime NullPointerException"
    ],
    correctAnswer: 1,
    explanation: "In Java, double quotes `\"K\"` define a String object. Assigning a String to a primitive char variable causes a compile error: 'incompatible types: java.lang.String cannot be converted to char'. Char requires single quotes `'K'`.",
    explanationBn: "ডবল কোটেশন `\"K\"` একটি String তৈরি করে, যা প্রিমিটিভ char-এ রাখা যায় না। char-এর জন্য একক উদ্ধৃতি `'K'` প্রয়োজন।",
    hint: "Double quotes create String objects, not char primitives."
  },
  {
    id: 11,
    question: "Which of the following is a VALID identifier name in Java?",
    options: [
      "goto",
      "const",
      "$salary_in_INR",
      "public"
    ],
    correctAnswer: 2,
    explanation: "'$salary_in_INR' contains only allowed characters ($ and _) and starts with $. Note that 'goto', 'const', and 'public' are all reserved Java keywords.",
    explanationBn: "'$salary_in_INR' সম্পূর্ণ বৈধ কারণ এতে অনুমোদিত $ এবং _ রয়েছে। 'goto', 'const', ও 'public' হলো সংরক্ষিত কিওয়ার্ড।",
    hint: "goto and const are reserved keywords even though unused in Java."
  },
  {
    id: 12,
    question: "What happens when multiple variables of the same type are declared in a single line, such as: `int a = 10, b = 20, c;`?",
    options: [
      "Compile-time error: each variable must be on a separate line",
      "Valid: declares three integer variables a, b, and c in one statement",
      "Only a is initialized to 10; b and c are converted to float",
      "Syntax error on the comma character"
    ],
    correctAnswer: 1,
    explanation: "Java allows multiple comma-separated variables of the same data type to be declared (and optionally initialized) in a single statement ending with a semicolon.",
    explanationBn: "জাভায় কমা (,) দিয়ে পৃথক করে একই লাইনে একই টাইপের একাধিক ভ্যারিয়েবল ডিক্লেয়ার ও ইনিশিয়ালাইজ করা সম্পূর্ণ বৈধ।",
    hint: "Comma-separated multi-variable declaration is standard Java syntax."
  },
  {
    id: 13,
    question: "Which identifier violates Java standard convention for naming a CLASS (PascalCase)?",
    options: [
      "StudentBillingSystem",
      "studentBillingSystem",
      "InvoiceReport",
      "DatabaseConnector"
    ],
    correctAnswer: 1,
    explanation: "By convention, Java classes and interfaces use PascalCase (starting with an uppercase letter). 'studentBillingSystem' starts with a lowercase letter, violating class naming convention (though technically legal).",
    explanationBn: "জাভা ক্লাসের নামকরণের আদর্শ নিয়ম (PascalCase) হলো প্রথম অক্ষর বড় হাতের দেওয়া (যেমন: StudentBillingSystem)। ছোট হাতের অক্ষর দিয়ে শুরু করা ক্লাস কনভেনশন লঙ্ঘন করে।",
    hint: "Classes should begin with an uppercase letter."
  },
  {
    id: 14,
    question: "Which of the following variable declarations is INVALID due to an illegal symbol?",
    options: [
      "int employee#Id = 404;",
      "int employee_Id = 404;",
      "int employee$Id = 404;",
      "int employeeId = 404;"
    ],
    correctAnswer: 0,
    explanation: "'#' is an illegal character in Java identifiers. Only alphanumeric characters, '$', and '_' are allowed.",
    explanationBn: "'#' প্রতীকটি জাভা আইডেন্টিফায়ারে ব্যবহার করা নিষিদ্ধ। তাই `employee#Id` অবৈধ।",
    hint: "Look for the hash / pound symbol."
  },
  {
    id: 15,
    question: "Can an identifier in Java be named 'True' with an uppercase 'T'?",
    options: [
      "No, 'true' is a boolean literal and cannot be used in any form",
      "Yes, because Java is case-sensitive, 'True' is not identical to the reserved literal 'true'",
      "No, all words starting with 'T' are reserved",
      "Yes, but only in Android programming"
    ],
    correctAnswer: 1,
    explanation: "Because Java is case-sensitive, 'true' (all lowercase) is the reserved boolean literal, while 'True' (capital T) is a legally valid identifier (though not recommended due to possible confusion).",
    explanationBn: "হ্যাঁ, কারণ জাভা কেস-সেনসিটিভ। ছোট হাতের 'true' একটি সংরক্ষিত লিটারাল, কিন্তু বড় হাতের 'True' একটি বৈধ আইডেন্টিফায়ার।",
    hint: "Case sensitivity makes True different from true."
  },
  {
    id: 16,
    question: "What is the maximum allowed length of an identifier in Java?",
    options: [
      "31 characters",
      "64 characters",
      "255 characters",
      "There is no theoretical limit"
    ],
    correctAnswer: 3,
    explanation: "According to the Java Language Specification (JLS), there is no theoretical limit to the length of a Java identifier.",
    explanationBn: "জাভা ল্যাঙ্গুয়েজ স্পেসিফিকেশন অনুযায়ী জাভা আইডেন্টিফায়ারের দৈর্ঘ্যের কোনো তাত্ত্বিক সর্বোচ্চ সীমা নেই।",
    hint: "No limit specified in Java language standard."
  },
  {
    id: 17,
    question: "What is the result of the declaration: `int ab = 38;`?",
    options: [
      "Allocates 4 bytes in stack memory, names the location 'ab', and assigns the integer value 38",
      "Prints 38 on the monitor",
      "Causes a compile error because variable names must be at least 3 letters",
      "Saves 38 in a database file"
    ],
    correctAnswer: 0,
    explanation: "The declaration allocates 4 bytes of integer memory, binds the identifier 'ab' to that memory address, and stores the initial value 38.",
    explanationBn: "এই ডিক্লেয়ারেশনটি স্ট্যাক মেমরিতে ৪ বাইট জায়গা বরাদ্দ করে, সেটির নাম 'ab' দেয় এবং তাতে ৩৮ মানটি জমা রাখে।",
    hint: "Standard variable allocation and initialization."
  },
  {
    id: 18,
    question: "Which of the following is an invalid variable name because it contains a mathematical operator symbol?",
    options: [
      "net_pay",
      "netPay",
      "net-pay",
      "$netPay"
    ],
    correctAnswer: 2,
    explanation: "'net-pay' contains a hyphen '-', which the Java compiler interprets as the subtraction operator (net minus pay), causing a syntax error.",
    explanationBn: "'net-pay'-এ থাকা হাইফেন (-) কে কম্পাইলার বিয়োগ অপারেটর মনে করে, ফলে সিনট্যাক্স এরর হয়।",
    hint: "Hyphens look like subtraction operators to compilers."
  },
  {
    id: 19,
    question: "Which keyword is used to declare a variable whose value cannot be changed once initialized?",
    options: [
      "const",
      "static",
      "final",
      "immutable"
    ],
    correctAnswer: 2,
    explanation: "In Java, the 'final' keyword is used to declare constants (e.g. `final double PI = 3.14159;`). Once initialized, its value cannot be reassigned.",
    explanationBn: "জাভায় ধ্রুবক বা অপরিবর্তনীয় ভ্যারিয়েবল ঘোষণার জন্য 'final' কিওয়ার্ড ব্যবহার করা হয়।",
    hint: "The final value that cannot be modified."
  },
  {
    id: 20,
    question: "Which of the following identifier names represents a constant according to standard Java naming conventions?",
    options: [
      "maxStudentsCount",
      "MAX_STUDENTS_COUNT",
      "MaxStudentsCount",
      "max_students_count"
    ],
    correctAnswer: 1,
    explanation: "Standard Java convention mandates that named constants (declared with 'final') should be written in all UPPERCASE letters with words separated by underscores (e.g. `MAX_STUDENTS_COUNT`).",
    explanationBn: "জাভার কনভেনশন অনুযায়ী 'final' ধ্রুবকগুলোর নাম সম্পূর্ণ বড় হাতের অক্ষরে এবং শব্দগুলোর মাঝে আন্ডারস্কোর দিয়ে লিখতে হয় (যেমন: `MAX_STUDENTS_COUNT`)।",
    hint: "ALL_CAPS_WITH_UNDERSCORES."
  },
  {
    id: 21,
    question: "Which of the following is NOT a reserved keyword in Java?",
    options: [
      "native",
      "transient",
      "volatile",
      "integer"
    ],
    correctAnswer: 3,
    explanation: "'integer' is NOT a Java keyword; the primitive keyword is 'int' and the wrapper class is 'Integer'. 'native', 'transient', and 'volatile' are all reserved Java keywords.",
    explanationBn: "'integer' কোনো সংরক্ষিত কিওয়ার্ড নয়; আদি টাইপ হলো 'int' এবং র‍্যাপার ক্লাস হলো 'Integer'।",
    hint: "The keyword is 'int', not 'integer'."
  },
  {
    id: 22,
    question: "What is the error in the following snippet: `int x; System.out.println(x);` inside a method?",
    options: [
      "No error, it prints 0",
      "Compile-time error: 'variable x might not have been initialized'",
      "Runtime NullPointerException",
      "Syntax error: println cannot accept variables"
    ],
    correctAnswer: 1,
    explanation: "In Java, local variables inside methods do NOT receive default values. Accessing an uninitialized local variable results in a compile-time error: 'variable x might not have been initialized'.",
    explanationBn: "জাভায় মেথডের ভেতরের লোকাল ভ্যারিয়েবল স্বয়ংক্রিয়ভাবে ডিফল্ট মান পায় না। মান না দিয়ে তা প্রিন্ট করতে গেলে 'variable x might not have been initialized' কম্পাইল এরর হয়।",
    hint: "Local variables must be explicitly initialized before use."
  },
  {
    id: 23,
    question: "Can an identifier in Java contain currency symbols other than the US Dollar sign (e.g. `int ₹price = 200;`)?",
    options: [
      "No, only ASCII characters are allowed",
      "Yes, Java supports Unicode currency symbols including '₹', '€', '¥' as valid identifier characters in Java specifications",
      "No, only '$' is supported",
      "Yes, but only inside comments"
    ],
    correctAnswer: 1,
    explanation: "Because Java source code uses Unicode (UTF-16), `Character.isJavaIdentifierStart()` considers Unicode currency symbols (like ₹, €, ¥) and letters from international alphabets as valid identifier characters.",
    explanationBn: "জাভা ইউনিকোড ভিত্তিক হওয়ায় ভারতীয় রুপি চিহ্ন '₹' সহ বিভিন্ন আন্তর্জাতিক মুদ্রা প্রতীক ও বর্ণমালা আইডেন্টিফায়ারের অংশ হতে পারে।",
    hint: "Java supports Unicode characters throughout its syntax."
  },
  {
    id: 24,
    question: "Which declaration represents a valid floating-point number without error?",
    options: [
      "float temp = 98.6;",
      "float temp = 98.6f;",
      "float temp = '98.6';",
      "float temp = 98,6f;"
    ],
    correctAnswer: 1,
    explanation: "`float temp = 98.6f;` is valid. `98.6` without `f` is double; `'98.6'` is invalid char syntax; and comma `,` is invalid decimal notation.",
    explanationBn: "`float temp = 98.6f;` সঠিক। 'f' ছাড়া লিখলে double ধরা হয়, কোটেশন দিলে স্ট্রিং/চার এরর হয় এবং কমা (,) অবৈধ।",
    hint: "Includes the mandatory 'f' suffix."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding Java variable declaration rules is 100% accurate for CBSE Board examinations?",
    options: [
      "Identifiers cannot begin with a digit, cannot contain spaces or special symbols (except _ and $), cannot use keywords, and are strictly case-sensitive",
      "Identifiers can contain any punctuation mark as long as it ends with a semicolon",
      "Variable names are completely case-insensitive in Java",
      "All variable names must start with a dollar sign ($)"
    ],
    correctAnswer: 0,
    explanation: "The 4 core rules: 1) Cannot start with digit; 2) Only alphanumeric, _, and $ allowed; 3) No reserved keywords; 4) Strictly case-sensitive.",
    explanationBn: "সঠিক সারাংশ: ডিজিট দিয়ে শুরু করা যাবে না, কোনো স্পেস বা বিশেষ প্রতীক (_ ও $ বাদে) থাকবে না, কিওয়ার্ড হওয়া চলবে না এবং এটি কেস-সেনসিটিভ।",
    hint: "Review all 4 fundamental identifier rules."
  }
];

export default topic3_questions;
