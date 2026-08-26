const topic7_questions = [
  {
    "question": "What is the difference between 'Files.createDirectory()' and 'Files.createDirectories()' in Java NIO.2?",
    "shortAnswer": "'Files.createDirectory(path)' creates only the single target directory and throws 'NoSuchFileException' if parent directories do not already exist. 'Files.createDirectories(path)' creates all missing parent directories in the entire hierarchy automatically (equivalent to 'mkdir -p' in Unix).",
    "explanation": "createDirectories() is almost always preferred in production application startup scripts.",
    "hint": "createDirectories creates the entire parent folder hierarchy automatically (like mkdir -p).",
    "level": "Beginner",
    "codeExample": "Files.createDirectories(Path.of(\"a\", \"b\", \"c\")); // Creates all 3 folders"
  }
];

export default topic7_questions;