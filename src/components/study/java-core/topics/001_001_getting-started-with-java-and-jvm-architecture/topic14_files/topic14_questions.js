const questions = [
  {
    question: "What are the three distinct types of comments supported in Java?",
    shortAnswer: "Single-line (`//`), Multi-line block (`/* ... */`), and Javadoc documentation (`/** ... */`).",
    explanation: "Single-line comments span to the end of the line; Multi-line comments span across multiple lines; Javadoc comments generate standardized HTML documentation.",
    hint: "Single-line, Multi-line, and Javadoc.",
    level: "basic",
    codeExample: "// Single line\n/* Multi\n   line */\n/** Javadoc */"
  },
  {
    question: "Do comments affect the size or performance of compiled .class bytecode files?",
    shortAnswer: "No! The javac compiler discards all comments during lexical scanning.",
    explanation: "Comments exist purely for human maintainability and produce 0 bytecode opcodes and 0 runtime memory overhead.",
    hint: "Stripped out by the compiler scanner.",
    level: "basic",
    codeExample: "// Bytecode contains zero comments."
  },
  {
    question: "Why can you not nest multi-line comments in Java (e.g. `/* outer /* inner */ outer */`)?",
    shortAnswer: "Because the compiler treats the first `*/` it encounters as the closing delimiter for the entire comment.",
    explanation: "The trailing `outer */` text is left outside the comment, causing syntax compilation errors.",
    hint: "First */ closes the comment block.",
    level: "basic",
    codeExample: "// Syntax Error: /* Outer /* Inner */ Still comment? */"
  },
  {
    question: "What is the primary purpose of Javadoc comments (`/** ... */`)?",
    shortAnswer: "To author structured API documentation that can be compiled into professional HTML web pages using the `javadoc` tool.",
    explanation: "IDEs also read Javadoc comments to provide rich hover tooltips and parameter hints while coding.",
    hint: "HTML documentation generation & IDE hover tooltips.",
    level: "basic",
    codeExample: "/**\n * Represents a banking account ledger.\n */"
  },
  {
    question: "What does the `@param` Javadoc tag document?",
    shortAnswer: "The name and description of a method parameter.",
    explanation: "Syntax: `@param paramName description of what the parameter represents`.",
    hint: "Documents method input arguments.",
    level: "basic",
    codeExample: "/**\n * @param accountId Unique identifier of the bank account\n */"
  },
  {
    question: "What does the `@return` Javadoc tag document?",
    shortAnswer: "The return value of a non-void method.",
    explanation: "Syntax: `@return description of the returned data and possible return states`.",
    hint: "Documents method output value.",
    level: "basic",
    codeExample: "/**\n * @return The updated account balance after deposit\n */"
  },
  {
    question: "What does the `@throws` (or `@exception`) Javadoc tag document?",
    shortAnswer: "Any checked or runtime exceptions that the method may throw under specific error conditions.",
    explanation: "Syntax: `@throws ExceptionType condition under which this exception is triggered`.",
    hint: "Documents thrown exceptions.",
    level: "basic",
    codeExample: "/**\n * @throws InsufficientFundsException If withdrawal exceeds available balance\n */"
  },
  {
    question: "What is the difference between `@deprecated` (Javadoc tag) and `@Deprecated` (Java annotation)?",
    shortAnswer: "`@deprecated` explains WHY an API is obsolete in HTML docs; `@Deprecated` triggers compiler warnings when the API is invoked.",
    explanation: "Best practice is to use both: the annotation triggers compiler checks, and the Javadoc tag recommends the replacement method.",
    hint: "Javadoc tag (explanation) vs Java annotation (compiler warning).",
    level: "intermediate",
    codeExample: "/**\n * @deprecated Use {@link #calculateTaxV2()} instead.\n */\n@Deprecated\npublic void calculateTax() { }"
  },
  {
    question: "What does the `{@code ...}` inline Javadoc tag do?",
    shortAnswer: "Formats enclosed text in a monospace code font and suppresses HTML character escaping (like < and >).",
    explanation: "Allows writing `{@code List<String>}` in documentation without typing `&lt;` and `&gt;`.",
    hint: "Monospaced code styling without HTML escaping.",
    level: "intermediate",
    codeExample: "/**\n * Accepts a {@code List<Integer>} collection.\n */"
  },
  {
    question: "What does the `{@link TargetClass#methodName}` inline Javadoc tag do?",
    shortAnswer: "Generates a clickable hyperlink in the HTML Javadoc pointing to the specified class or method.",
    explanation: "Allows cross-referencing related classes and methods seamlessly in generated documentation.",
    hint: "Clickable cross-reference link.",
    level: "intermediate",
    codeExample: "/**\n * See also {@link BankingService#transferFunds(double)}.\n */"
  },
  {
    question: "What does the `@see` Javadoc tag do?",
    shortAnswer: "Adds a 'See Also' section at the bottom of the method or class documentation.",
    explanation: "Accepts class names, method signatures, URLs, or plain text references.",
    hint: "'See Also' reference section.",
    level: "basic",
    codeExample: "/**\n * @see java.util.Collections#sort(List)\n */"
  },
  {
    question: "What does the `@since` Javadoc tag document?",
    shortAnswer: "The release or software version in which this class or method was first introduced.",
    explanation: "Helps API consumers know which library version introduced the feature (e.g. `@since 2.1.0` or `@since 17`).",
    hint: "Version introduction history.",
    level: "basic",
    codeExample: "/**\n * @since 1.8\n */"
  },
  {
    question: "What does the `@author` Javadoc tag document?",
    shortAnswer: "The author or maintainer of the class or interface.",
    explanation: "Only included in generated documentation if the `javadoc -author` flag is passed.",
    hint: "Author of the source file.",
    level: "basic",
    codeExample: "/**\n * @author Sukanta Hui (Barrackpore)\n */"
  },
  {
    question: "What command generates HTML Javadoc documentation from the terminal?",
    shortAnswer: "`javadoc -d doc -sourcepath src -subpackages com.mycompany`.",
    explanation: "The `javadoc` tool reads all source files, extracts doc comments, and generates browsable HTML API documentation in the `doc/` directory.",
    hint: "javadoc CLI tool command.",
    level: "intermediate",
    codeExample: "// Command: javadoc -d doc -sourcepath src com.codernaccotax.banking"
  },
  {
    question: "What is a 'Doclet' in the Javadoc architecture?",
    shortAnswer: "A pluggable Java program that specifies the content and format of the output generated by the Javadoc tool.",
    explanation: "The default doclet outputs standard HTML, but custom doclets can generate PDF, Markdown, or JSON API specifications.",
    hint: "Pluggable output renderer for Javadoc.",
    level: "expert",
    codeExample: "// Command: javadoc -doclet CustomDoclet ..."
  },
  {
    question: "Can HTML tags like `<p>`, `<b>`, `<ul>`, and `<li>` be used inside Javadoc comments?",
    shortAnswer: "Yes! Javadoc comments support standard HTML formatting tags.",
    explanation: "Because Javadoc generates HTML pages, embedding `<p>` tags separates paragraphs, and `<ul><li>` creates bulleted lists.",
    hint: "HTML tags are supported inside Javadoc.",
    level: "basic",
    codeExample: "/**\n * <p>Performs account verification.</p>\n * <ul>\n *   <li>Checks active status</li>\n *   <li>Validates KYC</li>\n * </ul>\n */"
  },
  {
    question: "What is the `{@value #CONSTANT_NAME}` inline Javadoc tag?",
    shortAnswer: "It displays the constant literal value of a `static final` field in the generated documentation.",
    explanation: "If `public static final int MAX = 100;`, `{@value #MAX}` renders as `100` in HTML docs.",
    hint: "Renders the actual value of a constant field.",
    level: "intermediate",
    codeExample: "/**\n * Maximum attempts permitted: {@value #MAX_ATTEMPTS}.\n */\npublic static final int MAX_ATTEMPTS = 3;"
  },
  {
    question: "What is `{@docRoot}` in Javadoc?",
    shortAnswer: "Represents the relative path to the generated documentation root directory from any page.",
    explanation: "Used to include images or external CSS styles in custom doc setups: `<img src=\"{@docRoot}/images/logo.png\">`.",
    hint: "Relative path to documentation root.",
    level: "advanced",
    codeExample: "/**\n * <img src=\"{@docRoot}/doc-files/diagram.png\" alt=\"Architecture\">\n */"
  },
  {
    question: "What is the `@inheritDoc` tag in Javadoc?",
    shortAnswer: "Inherits the Javadoc description, `@param`, and `@return` tags from the overridden superclass or interface method.",
    explanation: "Avoids copy-pasting documentation across method overrides in subclasses.",
    hint: "Inherits documentation from superclass method.",
    level: "intermediate",
    codeExample: "/**\n * {@inheritDoc}\n */\n@Override\npublic void execute() { }"
  },
  {
    question: "What is a 'Self-Documenting Code' philosophy and how does it relate to comments?",
    shortAnswer: "Writing clean, expressive variable and method names so comments explain 'WHY' decisions were made rather than 'WHAT' the code does.",
    explanation: "Good code: `boolean isEligibleForDiscount = ...` (clear without comments). Comments should explain business context, trade-offs, and non-obvious workarounds.",
    hint: "Explain 'Why', not 'What'.",
    level: "intermediate",
    codeExample: "// BAD: i = i + 1; // Increment i by 1\n// GOOD: // Workaround for vendor bug #412 where zero timeout hangs socket"
  },
  {
    question: "What is the difference between a normal block comment `/* ... */` and a Javadoc comment `/** ... */`?",
    shortAnswer: "Javadoc starts with two asterisks (`/**`); standard block comments start with one (`/*`) and are ignored by the `javadoc` tool.",
    explanation: "Only comments starting with `/**` are parsed as public API documentation.",
    hint: "Two asterisks for Javadoc.",
    level: "basic",
    codeExample: "/* Standard block comment - ignored by javadoc */\n/** Javadoc comment - parsed into HTML */"
  },
  {
    question: "What is a 'TODO' comment in Java IDEs?",
    shortAnswer: "A comment starting with `// TODO` that IDEs index automatically into a dedicated Tasks tool window.",
    explanation: "Allows developers to mark pending refactorings or incomplete tasks for later review.",
    hint: "Special task marker recognized by IDEs.",
    level: "basic",
    codeExample: "// TODO: Migrate to Spring Boot 3 Virtual Threads in next sprint"
  },
  {
    question: "What is a 'FIXME' comment in Java IDEs?",
    shortAnswer: "A high-priority comment indicating broken code, temporary hacks, or known bugs that require immediate attention.",
    explanation: "IDEs highlight `// FIXME` in distinctive colors to warn developers of dangerous code.",
    hint: "High-priority bug marker.",
    level: "basic",
    codeExample: "// FIXME: Race condition when two threads withdraw simultaneously"
  },
  {
    question: "What happens if a Javadoc comment is placed before an import statement instead of before a class?",
    shortAnswer: "It is treated as a dangling unattached comment and will NOT be associated with any class in the generated documentation.",
    explanation: "Javadoc comments MUST be placed immediately adjacent to the class, method, or field they document.",
    hint: "Must be directly adjacent to the documented member.",
    level: "basic",
    codeExample: "// Dangling doc comment before imports will not attach to class!"
  },
  {
    question: "What is the `javadoc` tool's `-package`, `-private`, and `-protected` access options?",
    shortAnswer: "They configure the visibility threshold of members included in the generated HTML documentation.",
    explanation: "Default generates docs for `protected` and `public` members. Passing `-private` generates docs for all private internal methods as well.",
    hint: "Controls visibility level of generated API docs.",
    level: "intermediate",
    codeExample: "// Command: javadoc -private -d internal-doc src/App.java"
  },
  {
    question: "Can comments appear in the middle of a Java expression?",
    shortAnswer: "Yes! Block comments can appear anywhere whitespace is allowed (e.g. `int total = 10 + /* bonus */ 5;`).",
    explanation: "The compiler replaces block comments with whitespace during tokenization.",
    hint: "Block comments are treated as whitespace.",
    level: "intermediate",
    codeExample: "int x = 10 + /* inline comment */ 20; // x = 30"
  },
  {
    question: "What is the danger of leaving commented-out 'dead code' in production repositories?",
    shortAnswer: "It creates clutter, confusion for maintainers, and becomes outdated without compiler checks.",
    explanation: "Best practice: rely on Git version control history to recover old code rather than leaving commented-out zombie code blocks in source files.",
    hint: "Rely on Git history rather than commented dead code.",
    level: "basic",
    codeExample: "// Anti-pattern: 50 lines of commented-out legacy code."
  },
  {
    question: "How do you document generic type parameters in Javadoc?",
    shortAnswer: "Using `@param <T> description of generic type`.",
    explanation: "Syntax: `@param <K> Type of keys` and `@param <V> Type of mapped values` for generic classes and methods.",
    hint: "@param <T> syntax for type parameters.",
    level: "advanced",
    codeExample: "/**\n * @param <E> The element type contained in this list\n */\npublic class CustomList<E> { }"
  },
  {
    question: "What is the `@snippet` tag introduced in Java 18 (JEP 413) for Javadoc?",
    shortAnswer: "A modern tag that embeds clean, multi-line, validated code examples in Javadoc without cumbersome HTML escaping.",
    explanation: "`{@snippet ...}` allows linking external Java test files directly as verified documentation examples.",
    hint: "Modern code snippet tag in Java 18+.",
    level: "expert",
    codeExample: "/**\n * Example usage:\n * {@snippet :\n *   var client = new BankingClient();\n *   client.login(\"admin\");\n * }\n */"
  },
  {
    question: "How does writing clean Javadoc elevate your professional software engineering career?",
    shortAnswer: "It makes your libraries reusable across teams, produces enterprise-grade documentation, and reduces onboarding friction.",
    explanation: "Well-documented APIs allow developers across an enterprise organization to consume your services effortlessly without needing to read internal source code.",
    hint: "Professional API documentation makes code enterprise-ready.",
    level: "basic",
    codeExample: "// Javadoc Mastery = Enterprise-Grade Code Documentation."
  }
];

export default questions;
