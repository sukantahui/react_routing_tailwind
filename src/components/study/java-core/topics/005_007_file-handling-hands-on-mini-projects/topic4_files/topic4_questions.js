const topic4_questions = [
  {
    "question": "Which of the following File I/O methods loads an entire file into heap RAM simultaneously and should NEVER be used on multi-gigabyte files?",
    "shortAnswer": "'Files.readAllLines(path)' and 'Files.readAllBytes(path)' read every single byte/line of a file into a Java List/Array in heap memory at once. If used on a multi-gigabyte file, the JVM will immediately exhaust heap memory and crash with 'java.lang.OutOfMemoryError: Java heap space'. Always use lazy 'Files.lines(path)' instead.",
    "explanation": "Critical performance rule for all Java backend developers.",
    "hint": "Files.readAllLines loads all lines into a List in RAM, causing OutOfMemoryError on big files.",
    "level": "Intermediate",
    "codeExample": "Files.lines(path) // Safe lazy stream vs Files.readAllLines(path) // Memory hazard"
  }
];

export default topic4_questions;