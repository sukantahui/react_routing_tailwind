const topic1_questions = [
  {
    "question": "What is the default internal buffer size used by 'BufferedInputStream' and 'BufferedReader' in the standard Java runtime?",
    "shortAnswer": "8192 bytes (8 KB) for 'BufferedInputStream' and 8192 characters (16 KB in UTF-16 memory) for 'BufferedReader'. This size aligns with standard OS virtual memory page sizes (4KB to 8KB) and disk block clusters.",
    "explanation": "You can supply a custom buffer size via the 2-argument constructor: new BufferedReader(reader, 65536).",
    "hint": "8192 bytes/chars (8 KB), matching OS memory page boundaries.",
    "level": "Beginner",
    "codeExample": "new BufferedReader(reader, 16384); // Custom 16KB buffer"
  }
];

export default topic1_questions;