const topic5_questions = [
  {
    "question": "Why should developers use 'BufferedWriter.newLine()' instead of hardcoding '\\\\n' when writing text files?",
    "shortAnswer": "'BufferedWriter.newLine()' inserts the platform-specific line separator determined by the underlying operating system ('\\r\\n' on Windows, '\\n' on Linux/macOS) by querying 'System.lineSeparator()'. Hardcoding '\\n' creates non-standard line endings on Windows systems.",
    "explanation": "Ensures generated reports, CSVs, and logs open cleanly across all operating systems.",
    "hint": "Inserts the OS-specific line separator ('\\r\\n' on Windows vs '\\n' on Linux) dynamically.",
    "level": "Beginner",
    "codeExample": "bw.write(\"Hello\"); bw.newLine(); // Platform-independent line break"
  }
];

export default topic5_questions;