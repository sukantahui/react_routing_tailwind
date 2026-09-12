const topic6_questions = [
  {
    "question": "What enables method chaining in StringBuilder?",
    "shortAnswer": "Mutation methods return the exact same instance reference ('return this;').",
    "explanation": "Because append(), insert(), delete(), and reverse() return 'this', the caller can immediately invoke another method on the same returned reference without declaring intermediate variables.",
    "hint": "Returning 'this' allows chaining.",
    "level": "basic",
    "codeExample": "new StringBuilder().append(\"A\").append(\"B\").reverse();"
  },
  {
    "question": "Does method chaining create multiple objects in memory?",
    "shortAnswer": "No! All chained operations modify the exact same single StringBuilder object on the Heap.",
    "explanation": "Chaining in StringBuilder is completely zero-allocation. Every chained call operates directly on the same internal buffer.",
    "hint": "Only one object exists on the heap throughout the entire chain.",
    "level": "basic"
  },
  {
    "question": "How does method chaining in StringBuilder compare to method chaining in String?",
    "shortAnswer": "String chaining (e.g. s.trim().toLowerCase().replace()) creates a NEW String object at every single step; StringBuilder chaining mutates the SAME object.",
    "explanation": "Three chained operations on a String create three separate objects on the Heap. Three chained operations on a StringBuilder create ZERO new objects.",
    "hint": "String chaining creates intermediate immutable objects; StringBuilder chaining mutates in-place.",
    "level": "moderate"
  },
  {
    "question": "What design pattern is exemplified by StringBuilder's fluent API?",
    "shortAnswer": "The Builder Design Pattern (specifically the Fluent Interface / Method Chaining idiom).",
    "explanation": "It separates complex object construction from its representation, allowing readable, step-by-step assembly of complex text before finalizing with .toString().",
    "hint": "The Gang of Four Builder Pattern.",
    "level": "moderate"
  },
  {
    "question": "Can you chain setCharAt() with append()?",
    "shortAnswer": "No! setCharAt() returns void, so chaining after it causes a compilation error.",
    "explanation": "Because setCharAt() returns void, you must call it on its own line before resuming chaining with other methods.",
    "hint": "setCharAt returns void, which terminates any chain.",
    "level": "basic",
    "codeExample": "// ERROR: sb.setCharAt(0, 'X').append(\"Y\");\n// CORRECT:\nsb.setCharAt(0, 'X');\nsb.append(\"Y\");"
  },
  {
    "question": "What is the result of 'sb.append(\"A\").append(\"B\") == sb'?",
    "shortAnswer": "true.",
    "explanation": "The expression evaluates to true because the return value of append() is literally the exact same object reference as 'sb'.",
    "hint": "Both sides point to the exact same heap memory address.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"Init\");\nSystem.out.println(sb.append(\"!\") == sb); // prints true"
  },
  {
    "question": "In what order are chained methods executed in Java?",
    "shortAnswer": "Strictly from left to right.",
    "explanation": "Java evaluates expressions from left to right. In sb.append(\"A\").insert(0, \"B\").reverse(), append runs first, then insert, and finally reverse.",
    "hint": "Left-to-right operator evaluation order.",
    "level": "basic"
  },
  {
    "question": "What is the output of 'new StringBuilder(\"123\").append(\"45\").reverse().insert(0, \"9\").toString()'?",
    "shortAnswer": "\"954321\".",
    "explanation": "Starts: \"123\" -> append(\"45\"): \"12345\" -> reverse(): \"54321\" -> insert(0, \"9\"): \"954321\".",
    "hint": "Trace each operation left to right.",
    "level": "moderate"
  },
  {
    "question": "How does method chaining affect debugging with breakpoints?",
    "shortAnswer": "Chained methods on a single line are harder to step through individually. Breaking chains across multiple lines improves debugger step-over visibility.",
    "explanation": "Formatting chains with each method call on its own indented line allows developers to place breakpoints on specific intermediate operations.",
    "hint": "Format chained calls on separate lines for easier debugging.",
    "level": "moderate",
    "codeExample": "String result = new StringBuilder()\n    .append(\"Part 1: \")\n    .append(data)\n    .append(\"\\n\")\n    .toString();"
  },
  {
    "question": "Can an exception thrown in the middle of a chain leave the StringBuilder in a partially modified state?",
    "shortAnswer": "Yes! Any operations executed before the exception was thrown have already mutated the internal buffer.",
    "explanation": "Because mutations occur in-place eagerly, an exception midway through does NOT roll back prior mutations.",
    "hint": "No automatic rollback; previous mutations persist in the buffer.",
    "level": "moderate"
  },
  {
    "question": "Can you chain methods across conditional if-else statements?",
    "shortAnswer": "Not in a single expression, but you can retain the builder reference and chain inside conditional blocks.",
    "explanation": "For dynamic queries or reports, conditional blocks can add clauses to the builder before continuing with the chain.",
    "hint": "Keep the reference in a variable and chain within if blocks.",
    "level": "basic"
  },
  {
    "question": "How does the bytecode compiler optimize method chaining?",
    "shortAnswer": "The JVM simply duplicates the object reference on the operand stack (dup) or reloads it, calling invokeVirtual on the same receiver.",
    "explanation": "JIT compilers frequently inline chained methods completely, resulting in machine code that modifies memory directly with zero call overhead.",
    "hint": "Aggressive inlining by HotSpot JIT.",
    "level": "advanced"
  },
  {
    "question": "What happens if you chain .toString() at the end of a chain?",
    "shortAnswer": "The return type switches from StringBuilder to java.lang.String, finalizing the text and preventing further buffer mutation chaining.",
    "explanation": "Once toString() is called, any subsequent chained calls must be methods of java.lang.String (like .toUpperCase() or .trim()).",
    "hint": "Switches the type from mutable StringBuilder to immutable String.",
    "level": "basic"
  },
  {
    "question": "Can you chain substring() directly into append()?",
    "shortAnswer": "Yes, because substring() returns a String, and append() accepts a String as an argument, though not as a fluent receiver.",
    "explanation": "You cannot do sb.substring(0, 2).append() because String does not have an append() method. But you can do sb.append(otherSb.substring(0, 2)).",
    "hint": "substring() returns String, which has no append() method.",
    "level": "moderate"
  },
  {
    "question": "What is the difference between chaining append() calls and passing multiple arguments to String.format()?",
    "shortAnswer": "Chained append() calls are significantly faster (zero parsing); String.format() parses format strings with regex and boxes primitives into Object[].",
    "explanation": "Use chained appends for performance-critical high-throughput routines; use String.format() when alignment, padding, or decimal precision is needed.",
    "hint": "Chained appends avoid format string parsing and boxing overhead.",
    "level": "moderate"
  },
  {
    "question": "Why is 'String s = new StringBuilder().append(\"A\").append(\"B\");' a compilation error?",
    "shortAnswer": "Because the chain returns a StringBuilder, which cannot be assigned to a String variable without calling .toString().",
    "explanation": "StringBuilder does not inherit from String (both are final classes implementing CharSequence). You must call .toString() at the end.",
    "hint": "Missing .toString() call.",
    "level": "basic"
  },
  {
    "question": "What is fluent interface readability and why is it favored in modern Java DSLs?",
    "shortAnswer": "It mimics natural language sentences, reducing visual clutter and eliminating repetitive variable names.",
    "explanation": "Frameworks like Spring, Mockito, and Stream API heavily utilize fluent chaining inspired by StringBuilder's design.",
    "hint": "Reads like a coherent sentence without boilerplate variables.",
    "level": "basic"
  },
  {
    "question": "Is chaining safe if the StringBuilder reference is shared across threads?",
    "shortAnswer": "No! Even if you chain operations in a single line, other threads can interleave mutations between the chained calls.",
    "explanation": "A single line of chained calls compiles into multiple bytecode instructions. Context switches can occur between any two instructions.",
    "hint": "One line of Java code does NOT mean an atomic single CPU instruction.",
    "level": "moderate"
  },
  {
    "question": "Can you chain repeat() in Java 21+?",
    "shortAnswer": "Yes! sb.repeat(CharSequence, count) returns 'this', making it fully chainable.",
    "explanation": "You can fluently chain: sb.append(\"Title\\n\").repeat(\"=\", 10).append(\"\\n\");",
    "hint": "repeat() in Java 21 returns StringBuilder for chaining.",
    "level": "basic",
    "codeExample": "String header = new StringBuilder()\n    .append(\"DATA REPORT\\n\")\n    .repeat(\"-\", 15)\n    .toString();"
  },
  {
    "question": "Best practice: How should long chained StringBuilder calls be formatted?",
    "shortAnswer": "Place each dot operator on a new line indented with 4 spaces for maximum code readability and clear git diffs.",
    "explanation": "Clean formatting makes changes easier to review and prevents long horizontal scrolling in IDEs.",
    "hint": "One dot per line with 4-space indentation.",
    "level": "basic"
  }
];

export default topic6_questions;
