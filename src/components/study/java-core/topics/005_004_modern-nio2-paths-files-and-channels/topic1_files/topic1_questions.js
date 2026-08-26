const topic1_questions = [
  {
    "question": "What are the 4 fundamental architectural pillars introduced by Java NIO.2 (JSR 203) in the 'java.nio.file' package?",
    "shortAnswer": "1. 'Path': Modern immutable locator interface representing filesystem path locations. 2. 'Files': Comprehensive static utility class for file manipulation, reading, and stream operations. 3. 'FileSystem / FileSystems': Pluggable filesystem SPI enabling ZIP, JAR, and cloud buckets to be navigated as native paths. 4. 'WatchService': Native OS kernel file change monitoring service.",
    "explanation": "Introduced in Java 7 and refined in Java 11/17.",
    "hint": "Path, Files, FileSystem SPI, and WatchService.",
    "level": "Beginner",
    "codeExample": "Path p = Path.of(\"data.txt\"); boolean exists = Files.exists(p);"
  }
];

export default topic1_questions;