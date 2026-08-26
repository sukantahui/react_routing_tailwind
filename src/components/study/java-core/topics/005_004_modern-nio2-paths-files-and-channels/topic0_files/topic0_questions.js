const topic0_questions = [
  {
    "question": "What were the primary architectural deficiencies of the legacy 'java.io.File' class that necessitated Java NIO.2?",
    "shortAnswer": "1. Poor Diagnostic Error Handling: Methods like 'delete()' or 'mkdir()' simply returned boolean 'false' upon failure without throwing descriptive exceptions or explaining why. 2. Performance Bottlenecks: 'listFiles()' eagerly loaded all directory entries into an array, crashing JVM memory on large directories. 3. Missing Capabilities: No support for atomic operations, symbolic links, POSIX permissions, or directory change notifications.",
    "explanation": "Java NIO.2 in Java 7 completely replaced java.io.File with Path and Files.",
    "hint": "Silent boolean failures, memory-hungry listFiles(), lack of atomic operations, and no symlink support.",
    "level": "Beginner",
    "codeExample": "// Legacy bad: boolean ok = file.delete(); // No exception explaining why"
  }
];

export default topic0_questions;