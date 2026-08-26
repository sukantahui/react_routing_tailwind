const topic4_questions = [
  {
    "question": "Why is wrapping 'FileReader' inside 'BufferedReader' recommended for reading text files in Java?",
    "shortAnswer": "Wrapping 'FileReader' inside 'BufferedReader' ('new BufferedReader(new FileReader(file, StandardCharsets.UTF_8))') adds an 8KB memory buffer that drastically reduces disk head seek operations and provides the high-level 'readLine()' method, allowing clean line-by-line file parsing.",
    "explanation": "Standard design pattern for all text file processing in Java.",
    "hint": "Combines 8KB disk buffering with the high-level readLine() method.",
    "level": "Beginner",
    "codeExample": "try (BufferedReader br = new BufferedReader(new FileReader(f, StandardCharsets.UTF_8))) { ... }"
  }
];

export default topic4_questions;