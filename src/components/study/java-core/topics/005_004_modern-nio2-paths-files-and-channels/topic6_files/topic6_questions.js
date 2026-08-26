const topic6_questions = [
  {
    "question": "Why should developers check 'Files.isRegularFile(path)' instead of only checking 'Files.exists(path)' before reading file contents?",
    "shortAnswer": "'Files.exists(path)' returns true for directories, special device files, named pipes, and symbolic links as well as normal files. Calling read methods on a directory or special device will throw an exception. Checking 'Files.isRegularFile(path)' guarantees that the target is an actual physical data file containing readable bytes.",
    "explanation": "Defensive best practice in all filesystem file processing pipelines.",
    "hint": "exists() returns true for directories too; isRegularFile() ensures it is an actual physical data file.",
    "level": "Beginner",
    "codeExample": "if (Files.isRegularFile(path)) { String content = Files.readString(path); }"
  }
];

export default topic6_questions;