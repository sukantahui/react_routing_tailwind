const topic2_questions = [
  {
    "question": "Is 'java.nio.file.Path' an interface or a class, and does instantiating a Path perform physical disk I/O?",
    "shortAnswer": "'Path' is an INTERFACE (implemented by platform-specific classes like WindowsPath or UnixPath). Creating a Path object does NOT perform any physical disk I/O or check if the file exists; it is purely an immutable, in-memory representation of a hierarchical filesystem location.",
    "explanation": "Physical disk operations are delegated exclusively to the java.nio.file.Files class.",
    "hint": "Path is an immutable interface and creating one does not touch the physical disk.",
    "level": "Beginner",
    "codeExample": "Path p = Path.of(\"non_existent.txt\"); // Instant, no I/O performed"
  }
];

export default topic2_questions;