const topic8_questions = [
  {
    "question": "Why is Files.lines() superior to Files.readAllLines() when reading multi-gigabyte financial audit logs?",
    "shortAnswer": "Files.lines() returns a lazy, memory-efficient Stream<String> that reads one line at a time from disk, preventing OutOfMemoryErrors, whereas Files.readAllLines() loads the entire file into a List in RAM.",
    "explanation": "Memory-efficient stream processing in Java NIO.2.",
    "hint": "Streams lines lazily without buffering the whole file in heap memory.",
    "level": "Beginner",
    "codeExample": "try (Stream<String> stream = Files.lines(path)) { stream.forEach(...); }"
  },
  {
    "question": "What StandardOpenOption flags should be used when writing a newly generated statement file?",
    "shortAnswer": "StandardOpenOption.CREATE (creates file if not present) and StandardOpenOption.TRUNCATE_EXISTING (overwrites old content if present).",
    "explanation": "Standard NIO.2 file creation options.",
    "hint": "CREATE and TRUNCATE_EXISTING.",
    "level": "Beginner",
    "codeExample": "Files.writeString(path, text, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);"
  }
];

export default topic8_questions;
