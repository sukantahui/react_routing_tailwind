const topic5_questions = [
  {
    "question": "Why is 'java.nio.file.Files' designed as a final utility class with only static methods rather than instance methods on Path?",
    "shortAnswer": "'Path' is an immutable locator interface, decoupling the path representation from physical filesystem operations. 'Files' is the centralized static operations hub that delegates operations to the underlying FileSystemProvider SPI, ensuring thread safety, clean separation of concerns, and full pluggability.",
    "explanation": "Same design pattern used by java.util.Collections and java.util.Arrays.",
    "hint": "Decouples the immutable path locator from physical filesystem operations.",
    "level": "Intermediate",
    "codeExample": "Path p = Path.of(\"data.txt\"); long size = Files.size(p); // Static invocation"
  }
];

export default topic5_questions;