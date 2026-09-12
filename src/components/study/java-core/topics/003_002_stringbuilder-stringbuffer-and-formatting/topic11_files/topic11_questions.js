const topic11_questions = [
  {
    "question": "Why are Text Blocks considered a massive upgrade for writing SQL queries in Java?",
    "shortAnswer": "They eliminate repetitive quote concatenation and escaped newlines, allowing SQL queries to be copied and pasted directly to and from database GUI consoles.",
    "explanation": "A 20-line complex SQL query with CTEs and window functions remains beautifully formatted exactly as written in SQL tools.",
    "hint": "Direct copy-paste between Java code and database tools without quotes.",
    "level": "basic",
    "codeExample": "String sql = \"\"\"\n    SELECT u.id, u.username, o.total\n    FROM users u\n    JOIN orders o ON u.id = o.user_id\n    WHERE o.status = 'COMPLETED'\n    ORDER BY o.created_at DESC;\n    \"\"\";"
  },
  {
    "question": "What is the critical security rule when constructing dynamic SQL queries with Text Blocks?",
    "shortAnswer": "NEVER use string concatenation or .formatted() to inject untrusted user input into an SQL string! Always use PreparedStatement with '?' bind parameters.",
    "explanation": "Formatting untrusted input (e.g. usernames or search queries) directly into SQL strings causes catastrophic SQL Injection vulnerabilities.",
    "hint": "Direct formatting into SQL queries causes SQL Injection.",
    "level": "basic",
    "codeExample": "// DANGEROUS SQL INJECTION:\n// String sql = \"SELECT * FROM users WHERE id = %s\".formatted(userInput);\n\n// SAFE:\nString sql = \"\"\"\n    SELECT * FROM users WHERE id = ?\n    \"\"\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setInt(1, userId);"
  },
  {
    "question": "How do Text Blocks simplify generating JSON payloads in unit tests and mock servers?",
    "shortAnswer": "Double quotes (\") around JSON keys and string values do NOT need backslash escaping.",
    "explanation": "In classic strings, writing '{\"name\": \"Alice\"}' required '\"{\\\"name\\\": \\\"Alice\\\"}\"'. Text Blocks allow clean, unescaped raw JSON syntax.",
    "hint": "No backslash escaping required for JSON double quotes.",
    "level": "basic",
    "codeExample": "String json = \"\"\"\n    {\n      \"orderId\": 1024,\n      \"customer\": \"Acme Corp\",\n      \"shipped\": true\n    }\n    \"\"\";"
  },
  {
    "question": "How can you format dynamic values into a JSON template using Text Blocks?",
    "shortAnswer": "Combine Text Blocks with format specifiers (%s, %d, %b) and call '.formatted(...)'.",
    "explanation": "For mock endpoints or dynamic test fixtures, this creates clean parameterized JSON in seconds.",
    "hint": "Use %s or %d inside the JSON template and call .formatted().",
    "level": "basic",
    "codeExample": "String json = \"\"\"\n    {\n      \"sku\": \"%s\",\n      \"price\": %.2f\n    }\n    \"\"\".formatted(\"WIDGET-99\", 49.95);"
  },
  {
    "question": "When generating HTML email templates with Text Blocks, how do you handle inline CSS containing double quotes?",
    "shortAnswer": "Write double quotes normally without backslashes. Only triple quotes need escaping.",
    "explanation": "HTML attributes like <div style=\"color: #0284c7; font-size: 14px;\"> can be written completely naturally.",
    "hint": "HTML attributes with double quotes require no escaping.",
    "level": "basic",
    "codeExample": "String email = \"\"\"\n    <div style=\"font-family: Arial; color: #1e293b;\">\n      <h1>Welcome, %s!</h1>\n      <p>Your activation code is <strong>%s</strong>.</p>\n    </div>\n    \"\"\".formatted(userName, code);"
  },
  {
    "question": "When should you combine Java 15 Text Blocks with StringBuilder in production services?",
    "shortAnswer": "Use Text Blocks for static multi-line skeletons (headers, footers, row templates) and use StringBuilder for accumulating dynamic loop rows.",
    "explanation": "A batch CSV generator or multi-row invoice uses Text Blocks for document layout and StringBuilder for the high-frequency row iteration.",
    "hint": "Text Block for the document frame, StringBuilder for loop rows.",
    "level": "moderate",
    "codeExample": "StringBuilder report = new StringBuilder(\"\"\"\n    REPORT: DAILY AUDIT\n    -------------------\n    \"\"\");\nfor(Item item : items) {\n    report.append(String.format(\"%-15s | $%.2f%n\", item.name, item.price));\n}"
  },
  {
    "question": "How do you escape double quotes inside dynamic values to prevent JSON corruption?",
    "shortAnswer": "Use a dedicated JSON library (Jackson, Gson) or escape dynamic values (e.g. val.replace(\"\\\"\", \"\\\\\\\"\")) before formatting.",
    "explanation": "If a user's name contains a double quote (e.g. John \"The Rock\"), inserting it raw into a JSON template will break the JSON grammar.",
    "hint": "Dynamic values must have internal quotes escaped or use Jackson/Gson.",
    "level": "moderate"
  },
  {
    "question": "How do you generate dynamic CSV files using StringBuilder and format specifiers?",
    "shortAnswer": "Loop through data rows, appending comma-separated values and line breaks via sb.append().",
    "explanation": "Pre-size the StringBuilder, format values without intermediate objects, and write out to stream.",
    "hint": "Comma-separated columns with %n or \\n line breaks.",
    "level": "basic",
    "codeExample": "StringBuilder csv = new StringBuilder(\"ID,NAME,SCORE\\n\");\nfor(Student s : students) {\n    csv.append(s.id).append(',').append(s.name).append(',').append(s.score).append('\\n');\n}"
  },
  {
    "question": "What is the advantage of using Text Blocks for GraphQL query definitions in Java?",
    "shortAnswer": "GraphQL queries are deeply nested multi-line strings with curly braces and fields; Text Blocks represent them identically to their native GraphQL schema syntax.",
    "explanation": "Makes Java GraphQL client code readable, maintainable, and easy to test against GraphiQL IDEs.",
    "hint": "Nested curly braces and field selection match native GraphQL syntax.",
    "level": "moderate",
    "codeExample": "String query = \"\"\"\n    query GetUser($id: ID!) {\n      user(id: $id) {\n        id\n        name\n        email\n      }\n    }\n    \"\"\";"
  },
  {
    "question": "How can you build multi-line XML / SOAP payloads with Text Blocks?",
    "shortAnswer": "Write the XML tags directly without escaping angle brackets (< >) or attribute quotes.",
    "explanation": "XML prolog, namespaces, and nested tags remain cleanly formatted.",
    "hint": "XML angle brackets and attribute quotes need zero escaping in text blocks.",
    "level": "basic",
    "codeExample": "String xml = \"\"\"\n    <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <invoice id=\"%d\">\n      <amount currency=\"USD\">%.2f</amount>\n    </invoice>\n    \"\"\".formatted(invId, amount);"
  },
  {
    "question": "What is the performance benefit of using Text Blocks for templates compared to loading external .txt files?",
    "shortAnswer": "Text Blocks are compiled directly into bytecode constants in memory, requiring zero file I/O or disk latency at runtime.",
    "explanation": "Loading external template files requires disk reads, error handling, and classloader lookups. Text Blocks are available instantly in memory.",
    "hint": "Zero disk I/O; available immediately in JVM bytecode constants.",
    "level": "moderate"
  },
  {
    "question": "How do you generate a markdown document dynamically using StringBuilder and Text Blocks?",
    "shortAnswer": "Use Text Blocks for headings, blockquotes, and tables, and append dynamic list items using StringBuilder.",
    "explanation": "Markdown tables require strict alignment, which Text Blocks express cleanly in Java code.",
    "hint": "Text blocks for table templates and headers, StringBuilder for rows.",
    "level": "basic"
  },
  {
    "question": "Why should you avoid hardcoding sensitive secrets (passwords, API tokens) inside Text Block templates?",
    "shortAnswer": "Because Text Blocks are compiled into class files and stored as plain text in the String Constant Pool, making them trivial to decompile.",
    "explanation": "Never put production database passwords in a text block; load them from secure environment variables or vault services at runtime.",
    "hint": "Class files can be decompiled easily to reveal plain text constants.",
    "level": "moderate"
  },
  {
    "question": "How do you handle conditional sections in an HTML template built with Text Blocks?",
    "shortAnswer": "Interpolate empty string \"\" when false, or concatenate conditional sub-blocks using ternary operators or if-statements.",
    "explanation": "For example: String banner = isVip ? \"\"\"<div class=\"vip\">VIP</div>\"\"\" : \"\";",
    "hint": "Use conditional sub-blocks or ternary operators.",
    "level": "moderate",
    "codeExample": "String banner = isVip ? \"\"\"\n    <span class=\"badge\">VIP Member</span>\n    \"\"\" : \"\";"
  },
  {
    "question": "Can Text Blocks be used to define Dockerfile or shell script templates in Java testcontainers?",
    "shortAnswer": "Yes! Testcontainers and DevOps tooling in Java frequently use Text Blocks to define inline Dockerfiles, Bash scripts, or Nginx configs.",
    "explanation": "Multi-line shell scripts with quotes and variables are represented cleanly without escaping every quote.",
    "hint": "Ideal for inline Dockerfiles and shell scripts in Testcontainers.",
    "level": "advanced",
    "codeExample": "String dockerfile = \"\"\"\n    FROM eclipse-temurin:21-jdk-alpine\n    WORKDIR /app\n    COPY . .\n    ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]\n    \"\"\";"
  },
  {
    "question": "How do you validate that a generated JSON Text Block is syntactically valid in Java?",
    "shortAnswer": "Parse it through ObjectMapper (Jackson) or JsonParser (Gson) in a unit test.",
    "explanation": "If the JSON has syntax errors (like missing commas or unbalanced braces), the parser will throw a JsonParseException immediately.",
    "hint": "Verify with Jackson ObjectMapper in unit tests.",
    "level": "moderate"
  },
  {
    "question": "What is the best way to handle large SQL IN-clauses (e.g. 'WHERE id IN (?, ?, ?)') dynamically?",
    "shortAnswer": "Use StringBuilder to generate the required number of '?' placeholders, then embed into the SQL Text Block.",
    "explanation": "Writing a small loop: sb.append(\"?,\".repeat(count - 1)).append(\"?\") generates the exact bind placeholder string.",
    "hint": "Generate placeholders with StringBuilder/repeat, then bind parameters.",
    "level": "advanced"
  },
  {
    "question": "How does Text Block compile-time whitespace stripping prevent bloated HTTP payload sizes?",
    "shortAnswer": "By automatically stripping common leading indentation, leaving only necessary line breaks and content in the final String.",
    "explanation": "If your source code is indented 12 spaces deep, the compiler strips those 12 spaces, saving bandwidth over network wires.",
    "hint": "Removes source code indentation so network payloads stay compact.",
    "level": "moderate"
  },
  {
    "question": "What is String.format vs Text Blocks String Template preview in Java 21 (JEP 430)?",
    "shortAnswer": "Java 21 introduced String Templates (STR.\"...\") as a preview feature, though Text Blocks with .formatted() remains the finalized standard solution across LTS versions.",
    "explanation": "While String Templates were previewed, Text Blocks combined with .formatted() is universally available and fully supported in all Java 15+ environments.",
    "hint": "Text blocks with .formatted() is finalized and standard in Java 15-21+.",
    "level": "advanced"
  },
  {
    "question": "Summary: What are the three golden rules for template generation in Java backend development?",
    "shortAnswer": "1. Use Text Blocks for clean multi-line readability. 2. Use .formatted() for variable interpolation. 3. Use PreparedStatement (never string interpolation) for SQL parameters.",
    "explanation": "Following these rules ensures expressive, maintainable, high-performance, and secure enterprise code.",
    "hint": "Readability with Text Blocks, flexibility with .formatted(), security with PreparedStatement.",
    "level": "basic"
  }
];

export default topic11_questions;
