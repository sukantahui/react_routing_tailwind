const topic10_questions = [
  {
    "question": "When should you use 'Files.readAllLines(path)' vs 'Files.lines(path)' in Java NIO.2?",
    "shortAnswer": "'Files.readAllLines(path)' loads all lines eagerly into a 'List<String>' in Java Heap RAM simultaneously; it is ideal for small files where random indexed access is required. 'Files.lines(path)' returns a lazy 'Stream<String>' that streams lines on-demand without loading the entire file into RAM, making it mandatory for massive multi-gigabyte log files.",
    "explanation": "Choosing readAllLines on a 2GB file will throw OutOfMemoryError.",
    "hint": "readAllLines loads all lines into a List in RAM; Files.lines() streams lazily for huge files.",
    "level": "Intermediate",
    "codeExample": "List<String> list = Files.readAllLines(path); // Eager RAM list"
  }
];

export default topic10_questions;