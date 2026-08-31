const topic0_questions = [
  {
    "question": "Summarize the key architectural difference between classic Java I/O (java.io) and modern Java NIO.2 (java.nio.file).",
    "shortAnswer": "Classic 'java.io' is stream-oriented and blocking, using legacy 'File' which suffers from silent boolean failures and poor large-directory performance. Modern 'java.nio.file' (NIO.2) uses the immutable 'Path' interface, the static 'Files' powerhouse with 50+ atomic methods, lazy Java 8 Streams (Files.lines/walk), and native OS kernel event monitoring (WatchService).",
    "explanation": "Standard progression in modern enterprise Java development.",
    "hint": "java.io is stream-based and blocking; NIO.2 is Path/Files-based, atomic, lazy-stream ready, and kernel-integrated.",
    "level": "Intermediate",
    "codeExample": "// Classic: File f = new File(); → Modern: Path p = Path.of(); Files.readString(p);"
  }
];

export default topic0_questions;