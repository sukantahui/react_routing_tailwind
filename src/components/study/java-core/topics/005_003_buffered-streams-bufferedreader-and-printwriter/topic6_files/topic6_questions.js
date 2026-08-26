const topic6_questions = [
  {
    "question": "What capabilities make 'java.io.PrintWriter' the most popular character stream writer for report and log generation?",
    "shortAnswer": "1. It provides overloaded 'print()' and 'println()' for all primitive types and Objects (calling String.valueOf()). 2. It supports rich C-style tabular formatting via 'printf()' and 'format()'. 3. It can be constructed with an 'autoFlush' boolean flag that automatically flushes buffers on every println/printf call. 4. It does not throw checked IOExceptions.",
    "explanation": "PrintWriter is the foundation behind ServletResponse.getWriter() in enterprise Java web apps.",
    "hint": "print/println for primitives, printf formatting, auto-flush support, and no checked IOExceptions.",
    "level": "Beginner",
    "codeExample": "PrintWriter pw = new PrintWriter(file, StandardCharsets.UTF_8); pw.printf(\"%-10s: %d\", name, score);"
  }
];

export default topic6_questions;