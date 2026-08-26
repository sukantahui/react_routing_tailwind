const topic3_questions = [
  {
    "question": "What does 'BufferedReader.readLine()' return upon reaching the End-Of-File (EOF), and does the returned line contain line break characters?",
    "shortAnswer": "1. 'readLine()' returns 'null' when the end of the stream is reached (unlike read() which returns -1). 2. The returned String does NOT include any line termination characters ('\\n' or '\\r\\n'); they are automatically stripped by the method.",
    "explanation": "Universal line parser recognizing Windows (\\r\\n), Linux (\\n), and legacy Mac (\\r) line endings.",
    "hint": "Returns null on EOF, and strips trailing \\n or \\r\\n line terminators from the returned string.",
    "level": "Beginner",
    "codeExample": "String line; while ((line = br.readLine()) != null) { ... }"
  }
];

export default topic3_questions;