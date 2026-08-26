const topic9_questions = [
  {
    "question": "What makes 'Files.readString(path)' and 'Files.writeString(path, content)' (introduced in Java 11) the preferred way to handle small-to-medium text files?",
    "shortAnswer": "They allow reading or writing an entire text file in a single line of code with zero boilerplate. They automatically manage internal stream allocation, buffering, character decoding (UTF-8 by default), and resource closing, eliminating the need for manual try-with-resources BufferedReader/Writer loops for standard configuration, JSON, or template files.",
    "explanation": "Added in Java 11 under JEP 181/330 to simplify text file processing.",
    "hint": "Single-line full text reading and writing with automatic stream opening, buffering, and closing.",
    "level": "Beginner",
    "codeExample": "String json = Files.readString(Path.of(\"config.json\"));"
  }
];

export default topic9_questions;