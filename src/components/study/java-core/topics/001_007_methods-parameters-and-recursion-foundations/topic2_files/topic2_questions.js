/**
 * Module 001_007: Topic 2: Method naming conventions (verb-noun camelCase)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the standard naming convention for Java methods?",
    shortAnswer: "`lowerCamelCase` starting with a lowercase verb followed by CamelCase nouns/adjectives (e.g. `calculateGrossTuition`, `printInvoice`).",
    explanation: "Oracle Java Code Conventions & JLS naming standards.",
    hint: "lowerCamelCase verb-noun structure (e.g. calculateGrossFee).",
    level: "basic",
    codeExample: "public static double calculateGrossTuition(...) { ... }"
  },
  {
    question: "Why should method names start with a lowercase letter rather than an uppercase letter?",
    shortAnswer: "Starting with an uppercase letter (`CalculateFee()`) violates Java conventions and causes confusion with Class names and Constructors (which use `UpperCamelCase`).",
    explanation: "Distinguishing methods from constructors and types.",
    hint: "Uppercase names are reserved for classes and constructors.",
    level: "basic",
    codeExample: "// Good: calculateFee() | Bad: CalculateFee() (looks like a Constructor)"
  },
  {
    question: "What prefix should be used for methods that return a `boolean` value?",
    shortAnswer: "`is`, `has`, `can`, `should`, or `contains` (e.g. `isEligibleForScholarship()`, `hasCompletedBatch()`, `canEnroll()`).",
    explanation: "Boolean predicate naming convention.",
    hint: "is, has, can, should prefixes.",
    level: "basic",
    codeExample: "public static boolean isEligible(double score) { return score >= 85.0; }"
  },
  {
    question: "What prefix is conventionally used for data conversion and type-casting methods?",
    shortAnswer: "`to` (e.g. `toString()`, `toArray()`, `toFormattedCurrency()`) or `as` (e.g. `asList()`).",
    explanation: "Conversion method taxonomy.",
    hint: "to or as prefixes (e.g. toString, toList, asReadOnly).",
    level: "basic",
    codeExample: "public static String toFormattedCurrency(double amount) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore batch system, what was the verb-noun name of the scholarship calculation method?",
    shortAnswer: "`applyMeritScholarship()` clearly describing the action (verb) and domain entity (noun) in Indian Rupees (₹).",
    explanation: "Practical application of verb-noun pairing.",
    hint: "applyMeritScholarship().",
    level: "basic",
    codeExample: "double finalFee = applyMeritScholarship(gross, 15.0);"
  },
  {
    question: "What are the JavaBean naming conventions for Getter and Setter methods?",
    shortAnswer: "Getters use `get` + PropertyName (e.g. `getFeeBalance()`) or `is` for booleans (`isActive()`); Setters use `set` + PropertyName (e.g. `setCampusName(String name)`).",
    explanation: "JavaBeans specification compliance.",
    hint: "get/is for accessors and set for mutators.",
    level: "basic",
    codeExample: "public double getBalance() { return balance; }\npublic void setBalance(double b) { balance = b; }"
  },
  {
    question: "Why should `snake_case` (e.g. `calculate_gross_fee`) be avoided in Java?",
    shortAnswer: "`snake_case` is foreign to Java idioms (used primarily in Python and C); Java standard libraries and tooling strictly enforce `lowerCamelCase`.",
    explanation: "Cross-language naming idiomatic differences.",
    hint: "snake_case is for Python/C; Java uses lowerCamelCase.",
    level: "basic",
    codeExample: "// Anti-pattern in Java: calculate_gross_fee()"
  },
  {
    question: "What are Factory Method naming conventions in modern Java (Java 9+)?",
    shortAnswer: "`of()` (e.g. `List.of()`, `Set.of()`), `valueOf()` (e.g. `Integer.valueOf()`), `from()`, `newInstance()`, and `copyOf()`.",
    explanation: "Standard library static factory method conventions.",
    hint: "of, valueOf, from, copyOf.",
    level: "intermediate",
    codeExample: "List<String> campuses = List.of(\"Barrackpore\", \"Naihati\");"
  },
  {
    question: "Why are generic names like `doWork()`, `process()`, or `data()` considered 'Code Smells'?",
    shortAnswer: "They fail to communicate business intent, forcing developers to read the entire method body to understand what operation is actually taking place.",
    explanation: "Intention-revealing clean code names.",
    hint: "Generic names lack clarity and force developers to inspect internal code.",
    level: "basic",
    codeExample: "// Bad: doStuff() | Good: deductLateFee()"
  },
  {
    question: "How should acronyms be treated in Java method names (e.g. GST, URL, ID)?",
    shortAnswer: "CamelCase treating the acronym as a standard word with only the first letter capitalized (e.g. `calculateGst`, `parseUrl`, `findStudentById`) or all uppercase if short.",
    explanation: "Acronym casing convention in Java.",
    hint: "Treat acronyms as normal capitalized words: calculateGst, parseUrl.",
    level: "intermediate",
    codeExample: "public static double calculateGst(double taxableAmount) { ... }"
  },
  {
    question: "What is the recommended length and grammatical structure for method names?",
    shortAnswer: "2 to 4 words combining an active verb with a descriptive direct object (e.g. `validateStudentEmail`, `computeCompoundInterest`).",
    explanation: "Conciseness and clarity guidelines.",
    hint: "2 to 4 words starting with an active verb followed by direct object.",
    level: "basic",
    codeExample: "public static void sendAdmissionConfirmation(Student s) { ... }"
  },
  {
    question: "What is the difference between `findStudent()` and `getStudent()` naming conventions?",
    shortAnswer: "`getStudent()` implies an instantaneous in-memory lookup expected to succeed; `findStudent()` implies searching a database/collection that might return `null` or `Optional.empty()`.",
    explanation: "Semantic nuance between get vs find.",
    hint: "get implies direct in-memory access; find implies searching with possible missing results.",
    level: "intermediate",
    codeExample: "Optional<Student> findByRollNo(int roll);"
  },
  {
    question: "What naming convention applies to methods that trigger asynchronous tasks or events?",
    shortAnswer: "Prefixes like `on` for event listeners (`onPaymentReceived()`, `onEnrollmentCompleted()`) or `Async` suffix (`processInvoiceAsync()`).",
    explanation: "Event-driven and asynchronous naming patterns.",
    hint: "onEventName or Async suffix.",
    level: "intermediate",
    codeExample: "public void onPaymentReceived(double amount) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore system, what boolean method checked student batch completion?",
    shortAnswer: "`hasCompletedBatch(int attendedHours, int totalHours)` in Indian Rupees (₹).",
    explanation: "Demonstration of boolean predicate naming.",
    hint: "hasCompletedBatch().",
    level: "basic",
    codeExample: "boolean done = hasCompletedBatch(120, 120);"
  },
  {
    question: "Can a Java method name contain numbers or dollar signs (`$`)?",
    shortAnswer: "Syntactically legal, but dollar signs (`$`) are reserved by convention for compiler-generated code (synthetic methods/inner classes) and numbers should not be the first character.",
    explanation: "Legal identifiers vs conventions.",
    hint: "Legal, but $ is reserved for compiler-generated bytecode.",
    level: "intermediate",
    codeExample: "// Legal but discouraged: process$123() | Preferred: processBatch123()"
  },
  {
    question: "What naming prefix is used for methods that validate business rules and throw exceptions on failure?",
    shortAnswer: "`validate` (e.g. `validateStudentAge()`), `check` (e.g. `checkPermission()`), or `ensure` (e.g. `ensureCapacity()`).",
    explanation: "Validation method naming taxonomy.",
    hint: "validate, check, ensure prefixes.",
    level: "basic",
    codeExample: "public static void validateAge(int age) { if (age < 18) throw new ... }"
  },
  {
    question: "What naming convention applies to methods that mutate object state in a Fluent Interface / Builder pattern?",
    shortAnswer: "Chaining verbs or property names returning `this` (e.g. `withName()`, `atCampus()`, `withDiscount()`, `build()`).",
    explanation: "Builder pattern fluent API naming.",
    hint: "withProperty or property name returning 'this'.",
    level: "intermediate",
    codeExample: "Student s = StudentBuilder.create().withName(\"Swadeep\").atCampus(\"Barrackpore\").build();"
  },
  {
    question: "Why should double negatives be avoided in boolean method names (e.g. `isNotUnregistered()`)?",
    shortAnswer: "Double negatives cause confusion and logic bugs when negated (`!isNotUnregistered()`); use clear positive affirmations like `isRegistered()`.",
    explanation: "Cognitive readability in boolean logic.",
    hint: "Avoid double negatives; use positive affirmations like isRegistered().",
    level: "intermediate",
    codeExample: "// Bad: if (!isNotInvalid()) | Good: if (isValid())"
  },
  {
    question: "What is the recommended prefix for methods creating shallow vs deep copies?",
    shortAnswer: "`clone()` for shallow copies, and `deepCopy()`, `copyOf()`, or copy constructors for deep copies.",
    explanation: "Copying method taxonomy.",
    hint: "clone vs copyOf / deepCopy.",
    level: "basic",
    codeExample: "public static StudentAccount deepCopy(StudentAccount s) { ... }"
  },
  {
    question: "How do clean method names eliminate the need for redundant comments?",
    shortAnswer: "Self-documenting code: a method named `calculateNetPayableAfterDiscountAndTax()` makes its behavior obvious without needing a comment explaining 'This calculates tax and discount'.",
    explanation: "Clean Code philosophy on comments.",
    hint: "Clear names convey business intent, making comments unnecessary.",
    level: "basic",
    codeExample: "double net = calculateNetPayableAfterDiscountAndTax(fee, disc, tax);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what conversion method formatted raw numbers into Indian Rupees?",
    shortAnswer: "`toFormattedCurrency(double amount)` returning a formatted string with `₹` and 2 decimal places.",
    explanation: "Conversion method naming demonstration.",
    hint: "toFormattedCurrency().",
    level: "basic",
    codeExample: "String formatted = toFormattedCurrency(25000.0); // \"₹25,000.00\""
  },
  {
    question: "What prefix is conventionally used for methods that remove or delete items?",
    shortAnswer: "`remove` (e.g. `removeStudent()`), `delete` (e.g. `deleteRecord()`), `clear` (e.g. `clearBatch()`), or `evict`.",
    explanation: "Deletion method naming taxonomy.",
    hint: "remove, delete, clear.",
    level: "basic",
    codeExample: "public void removeStudentById(int id) { ... }"
  },
  {
    question: "What is the difference between `countStudents()` and `getStudentCount()`?",
    shortAnswer: "`getStudentCount()` retrieves an existing stored count in $O(1)$; `countStudents()` calculates the count dynamically by iterating elements in $O(N)$.",
    explanation: "Computational complexity nuance in naming.",
    hint: "get implies O(1) stored property; count implies O(N) iteration.",
    level: "advanced",
    codeExample: "public int getStudentCount() { return size; } // O(1)\npublic int countStudents() { return calculate(); } // O(N)"
  },
  {
    question: "What naming prefix is used for lifecycle management methods?",
    shortAnswer: "`init()` / `initialize()`, `start()`, `stop()`, `pause()`, `resume()`, `destroy()`, `close()`, `dispose()`.",
    explanation: "Lifecycle method conventions in Java frameworks.",
    hint: "init, start, stop, close, destroy.",
    level: "intermediate",
    codeExample: "public void initializeEngine() { ... }"
  },
  {
    question: "Can two methods in the same class have names differing only in letter case (`process()` vs `Process()`)?",
    shortAnswer: "Syntactically legal (Java is case-sensitive), but an EXTREME code smell and severe violation of clean coding principles.",
    explanation: "Case sensitivity confusion trap.",
    hint: "Legal in Java syntax, but a disastrous anti-pattern causing confusion.",
    level: "intermediate",
    codeExample: "// Legal but never do this: void process() and void Process()"
  },
  {
    question: "What naming convention applies to methods returning Streams in Java 8+?",
    shortAnswer: "`stream()` (e.g. `studentList.stream()`) or `parallelStream()`.",
    explanation: "Java 8 Stream API conventions.",
    hint: "stream() or parallelStream().",
    level: "basic",
    codeExample: "public Stream<Student> stream() { ... }"
  },
  {
    question: "Why should Hungarian Notation prefixes (e.g. `strGetName()`, `iCalculateTotal()`) NEVER be used in Java?",
    shortAnswer: "Java is strongly typed with modern IDEs displaying types instantaneously; type prefixes in method names add useless clutter and violate standard Java idioms.",
    explanation: "Modern IDE vs legacy Hungarian notation.",
    hint: "Modern Java is strongly typed; type prefixes add noise and violate conventions.",
    level: "basic",
    codeExample: "// Anti-pattern: dblCalculateGrossFee() | Correct: calculateGrossFee()"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 2 for Java developers?",
    shortAnswer: "Always name Java methods using `lowerCamelCase` verb-noun combinations (`calculateGrossFee`), use `is`/`has` prefixes for boolean predicates, and `to`/`as` for conversions to create self-documenting, clean, and maintainable enterprise software.",
    explanation: "Mastery of Java method naming conventions.",
    hint: "lowerCamelCase verb-noun structure makes code self-documenting and professional.",
    level: "basic",
    codeExample: "// Summary: verbNoun camelCase | isBoolean | toConversion | ofFactory"
  },
  {
    question: "What is the next topic (Topic 3) in Module 001_007?",
    shortAnswer: "Formal parameters vs Actual arguments.",
    explanation: "Topic 3 explores the precise distinction between parameter declarations and argument passing in Java stack memory.",
    hint: "Formal parameters vs Actual arguments.",
    level: "basic",
    codeExample: "// Topic 3: Formal Parameters vs Actual Arguments"
  },
  {
    question: "How do method naming conventions impact automated API documentation (Swagger / OpenAPI / JavaDoc)?",
    shortAnswer: "Clear verb-noun naming automatically generates intuitive REST and RPC documentation that frontend developers and clients can understand without ambiguity.",
    explanation: "Tooling and API generation benefits.",
    hint: "Generates clear, intuitive API endpoint documentation automatically.",
    level: "intermediate",
    codeExample: "GET /api/students -> getStudents()"
  }
];

export default questions;
