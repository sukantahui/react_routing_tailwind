/**
 * Module 001_008: Topic 10: Writing clean, readable code conforming to Google Java Style Guide
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the Google Java Style Guide standard for indentation?",
    shortAnswer: "Exactly **2 spaces** per indentation level (tab characters `\\t` are strictly forbidden).",
    explanation: "Google Java Style indentation rule.",
    hint: "2 spaces per indentation level.",
    level: "basic",
    codeExample: "public void process() {\n  int count = 0; // 2 spaces\n}"
  },
  {
    question: "What is the standard column limit (line length) in Google Java Style?",
    shortAnswer: "**100 characters** per line (with narrow exceptions for URLs or Javadoc links).",
    explanation: "Google Java Style column width limit.",
    hint: "100 characters.",
    level: "basic",
    codeExample: "// Lines wrap after 100 characters"
  },
  {
    question: "What is the naming convention for Classes, Records, and Interfaces?",
    shortAnswer: "**UpperCamelCase** (e.g. `StudentLedgerEntry`, `PaymentProcessor`, `InvoiceGenerator`).",
    explanation: "Type identifier naming convention.",
    hint: "UpperCamelCase (PascalCase).",
    level: "basic",
    codeExample: "public record StudentLedgerEntry(...) { ... }"
  },
  {
    question: "What is the naming convention for Methods and Non-Constant Fields?",
    shortAnswer: "**lowerCamelCase** (e.g. `computeFinalPayableFee`, `studentName`, `academicScore`).",
    explanation: "Method and field naming convention.",
    hint: "lowerCamelCase starting with a lowercase letter.",
    level: "basic",
    codeExample: "public static double computeFinalPayableFee(...) { ... }"
  },
  {
    question: "What is the naming convention for Constants (`static final` fields)?",
    shortAnswer: "**UPPER_SNAKE_CASE** (e.g. `INSTITUTE_NAME`, `GST_TAX_RATE`, `MERIT_DISCOUNT_THRESHOLD`).",
    explanation: "Constant naming convention.",
    hint: "UPPER_SNAKE_CASE with underscores.",
    level: "basic",
    codeExample: "public static final double GST_TAX_RATE = 0.18;"
  },
  {
    question: "Why are Wildcard Imports (`import java.util.*;`) strictly forbidden in Google Java Style?",
    shortAnswer: "Wildcard imports pollute the namespace, obscure dependencies, and cause compilation errors when new classes with matching names are added to imported packages.",
    explanation: "Prohibition of wildcard imports.",
    hint: "Pollutes namespace and causes name collisions; always import specific classes.",
    level: "basic",
    codeExample: "import java.util.List; import java.util.Objects; // Specific imports"
  },
  {
    question: "What are 'Egyptian Braces' (K&R style) in Google Java Style?",
    shortAnswer: "The opening brace `{` is placed on the **same line** as the declaration/header, and the closing brace `}` is aligned with the header line.",
    explanation: "Egyptian brace placement rule.",
    hint: "Opening brace { on same line; closing brace } on its own line.",
    level: "basic",
    codeExample: "public void process() { ... }"
  },
  {
    question: "How should utility classes containing only static methods be structured?",
    shortAnswer: "Declare the class as `final` and define a `private` zero-argument constructor to prevent instantiation.",
    explanation: "Static utility class best practice.",
    hint: "Make class final with a private constructor to prevent instantiation.",
    level: "intermediate",
    codeExample: "public final class MathUtils { private MathUtils() {} }"
  },
  {
    question: "What is the rule regarding multiple variable declarations on a single line?",
    shortAnswer: "Each variable must be declared on its **own separate line** (e.g. `int a; int b;` is required; `int a, b;` is forbidden).",
    explanation: "One variable declaration per line rule.",
    hint: "One variable per line; never combine declarations.",
    level: "basic",
    codeExample: "int rollNumber;\nString studentName;"
  },
  {
    question: "What is a 'Magic Number' and how does clean code eliminate it?",
    shortAnswer: "A hardcoded literal number in code (e.g. `0.18` or `90.0`) whose meaning is unclear; eliminate by extracting into descriptive `static final` constants (`GST_TAX_RATE`).",
    explanation: "Magic numbers elimination.",
    hint: "Replace hardcoded literal numbers with static final named constants.",
    level: "basic",
    codeExample: "public static final double GST_TAX_RATE = 0.18;"
  },
  {
    question: "How does `Objects.requireNonNull()` enforce defensive programming?",
    shortAnswer: "It validates parameters immediately at method entry, throwing a descriptive `NullPointerException` if the argument is `null` before executing logic.",
    explanation: "Objects.requireNonNull fail-fast validation.",
    hint: "Fails fast with descriptive message if parameter is null.",
    level: "basic",
    codeExample: "Objects.requireNonNull(entry, \"entry cannot be null\");"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Swadeep's discounted net fee after 15% merit waiver and 18% GST on ₹20,000 base fee?",
    shortAnswer: "Base: ₹20,000 → 15% discount: ₹17,000 → +18% GST: **₹20,060.00**.",
    explanation: "Swadeep billing fee breakdown.",
    hint: "₹20,060.00.",
    level: "basic",
    codeExample: "20000 * 0.85 * 1.18 = 20,060.00"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the total net revenue across all 4 students?",
    shortAnswer: "**₹79,591.00** total revenue.",
    explanation: "Total campus revenue verification.",
    hint: "₹79,591.00.",
    level: "basic",
    codeExample: "TOTAL BARRACKPORE CAMPUS NET REVENUE: ₹79,591.00"
  },
  {
    question: "What Javadoc tags are mandatory on non-private methods in Google Java Style?",
    shortAnswer: "`@param` for every parameter, `@return` for non-void return values, and `@throws` for declared checked exceptions.",
    explanation: "Mandatory Javadoc tag conventions.",
    hint: "@param, @return, and @throws.",
    level: "basic",
    codeExample: "/**\n * @param entry student record\n * @return net fee\n */"
  },
  {
    question: "What is the Google Java Style rule for `switch` statement default branches?",
    shortAnswer: "Every `switch` statement must include a `default` statement group, even if it contains no code or throws an exception.",
    explanation: "Default branch requirement in switch statements.",
    hint: "A default branch is mandatory in all switch statements.",
    level: "basic",
    codeExample: "switch(x) { ... default → throw new AssertionError(); }"
  },
  {
    question: "What is the rule for grouping `import` statements in Google Java Style?",
    shortAnswer: "1. Static imports in a single block. 2. Non-static imports in a single block sorted alphabetically. 3. Zero wildcard imports.",
    explanation: "Import ordering rules.",
    hint: "Alphabetical imports in single block; static imports grouped at top.",
    level: "intermediate",
    codeExample: "import java.util.List;\nimport java.util.Objects;"
  },
  {
    question: "How should acronyms be formatted in camelCase identifiers (e.g. HTTP, XML, GST)?",
    shortAnswer: "Treat acronyms as words: `GstTaxRate` or `gstTaxRate`, `XmlParser`, `HttpUrlConnection` (not `HTTPURLConnection`).",
    explanation: "Acronym capitalization in camelCase.",
    hint: "Capitalize only the first letter: HttpUrl, XmlParser, GstTax.",
    level: "intermediate",
    codeExample: "public static final double GST_TAX_RATE = 0.18; // Constant"
  },
  {
    question: "What is the 'Single Responsibility Principle' (SRP) in clean code?",
    shortAnswer: "A class or method should have one, and only one, reason to change (focusing on a single cohesive responsibility).",
    explanation: "SRP architectural principle.",
    hint: "Each class/method should do one thing and do it well.",
    level: "basic",
    codeExample: "// computeFinalPayableFee() calculates fees; generateInvoiceReport() formats text"
  },
  {
    question: "Why should local variable scope be minimized in clean code?",
    shortAnswer: "Declaring variables at the point of first use reduces cognitive load, minimizes unintended state mutations, and keeps code readable.",
    explanation: "Variable scope minimization best practice.",
    hint: "Declare variables at point of first use to minimize cognitive overhead.",
    level: "basic",
    codeExample: "double baseFee = entry.baseFeeInr(); // Declared when needed"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Tuhina's net fee for ₹25,000 base fee with 96.0% score?",
    shortAnswer: "**₹23,600.00** (₹25,000 → 15% discount: ₹21,250 → +18% GST: ₹23,600.00).",
    explanation: "Tuhina billing fee calculation.",
    hint: "₹23,600.00.",
    level: "basic",
    codeExample: "25000 * 0.85 * 1.18 = 23,600.00"
  },
  {
    question: "What is the Google Java Style rule for `if` statements without curly braces: `if (condition) return;`?",
    shortAnswer: "Braces `{}` are **mandatory for ALL `if`, `else`, `for`, `do`, and `while` statements**, even when the body is empty or contains only a single line.",
    explanation: "Mandatory braces rule.",
    hint: "Braces {} are mandatory even for single-line if and loop bodies.",
    level: "basic",
    codeExample: "if (rollNumber <= 0) {\n  throw new IllegalArgumentException();\n}"
  },
  {
    question: "How do Java Records (`record`) enhance Clean Code and Immutability?",
    shortAnswer: "Records provide boilerplate-free immutable data carriers with automatic `equals()`, `hashCode()`, `toString()`, and accessor methods, enforcing domain safety via compact constructors.",
    explanation: "Java Record clean architecture benefits.",
    hint: "Boilerplate-free immutable data carrier with built-in accessors and equals/hashCode.",
    level: "intermediate",
    codeExample: "public record StudentLedgerEntry(int roll, String name) {}"
  },
  {
    question: "What is the rule for package naming in Google Java Style?",
    shortAnswer: "Package names are strictly **all lowercase**, with consecutive words concatenated together without underscores or camelCase (e.g. `com.coderaccotax.javatutorial`).",
    explanation: "Package naming conventions.",
    hint: "All lowercase words without underscores or capitals.",
    level: "basic",
    codeExample: "package com.coderaccotax.javatutorial.foundations;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Abhronila's net fee on ₹18,000 base with 84.0% score (no scholarship)?",
    shortAnswer: "**₹19,116.00** (₹18,000 base + 18% GST: ₹21,240, wait: 18000 * 1.18 = 21,240).",
    explanation: "Abhronila invoice calculation verification.",
    hint: "₹21,240.00 (Base 18,000 + 18% GST).",
    level: "basic",
    codeExample: "18000 * 1.18 = 21,240.00"
  },
  {
    question: "What automated tool formats Java source code strictly conforming to Google Java Style?",
    shortAnswer: "**google-java-format** (plugin for IntelliJ IDEA, VS Code, Maven, and Gradle).",
    explanation: "google-java-format formatter tooling.",
    hint: "google-java-format plugin.",
    level: "basic",
    codeExample: "// google-java-format --replace File.java"
  },
  {
    question: "Why should public classes avoid exposing mutable `public` fields?",
    shortAnswer: "Exposing public fields breaks encapsulation and allows external code to corrupt internal object state; use private fields with accessors or immutable Records.",
    explanation: "Encapsulation and field access best practice.",
    hint: "Breaks encapsulation and exposes internal state to uncontrolled mutation.",
    level: "basic",
    codeExample: "private double baseFeeInr; // Encapsulated"
  },
  {
    question: "What is 'Self-Documenting Code'?",
    shortAnswer: "Code written with descriptive variable and method names such that its logic is clear and understandable without requiring explanatory inline comments.",
    explanation: "Self-documenting code philosophy.",
    hint: "Code whose clear naming explains its intent without needing comments.",
    level: "basic",
    codeExample: "double finalPayable = computeFinalPayableFee(entry); // Self-documenting"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 10 for Java developers?",
    shortAnswer: "Writing clean code is about empathy for future maintainers: follow Google Java Style (2-space indents, 100-char lines, UpperCamelCase classes, lowerCamelCase methods, UPPER_SNAKE_CASE constants), avoid wildcard imports, eliminate magic numbers, and write defensive guards.",
    explanation: "Mastery of Google Java Style and clean code hygiene.",
    hint: "Google Java Style: 2-space indents, clear naming, no wildcard imports, no magic numbers.",
    level: "basic",
    codeExample: "// Summary: Clean Code = Readability + Consistency + Defensive Guards"
  },
  {
    question: "What is the next topic (Topic 11) in Module 001_008?",
    shortAnswer: "Segment 1 Comprehensive Multiple Choice Question Exam.",
    explanation: "Topic 11 is the full Segment 1 synthesis exam covering all foundations from Modules 001_001 to 001_008.",
    hint: "Segment 1 Comprehensive Multiple Choice Question Exam.",
    level: "basic",
    codeExample: "// Topic 11: Segment 1 Comprehensive MCQ Exam"
  },
  {
    question: "How does Checkstyle enforce Google Java Style in CI/CD build pipelines?",
    shortAnswer: "Checkstyle runs `google_checks.xml` during `mvn test` or `gradle check`, failing the build if indentation, column limits, or import rules are violated.",
    explanation: "Automated CI/CD style checking with Checkstyle.",
    hint: "Checkstyle runs google_checks.xml in Maven/Gradle to fail builds on style violations.",
    level: "intermediate",
    codeExample: "<plugin><artifactId>maven-checkstyle-plugin</artifactId></plugin>"
  }
];

export default questions;
