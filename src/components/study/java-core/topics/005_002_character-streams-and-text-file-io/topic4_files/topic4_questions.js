const topic4_questions = [
  {
    "question": "Why was using 'FileReader' and 'FileWriter' prior to Java 11 considered risky in enterprise applications?",
    "shortAnswer": "Prior to Java 11, 'FileReader' and 'FileWriter' always used the host operating system's default platform encoding (e.g. Windows-1252 on Windows vs UTF-8 on Linux) and did NOT allow passing a 'Charset' parameter. A file written on Windows would get corrupted when read on Linux. In Java 11+, constructors accepting 'StandardCharsets.UTF_8' were finally added.",
    "explanation": "Java 11 rectified a 20-year-old API omission in Java I/O.",
    "hint": "Pre-Java 11 constructors did not support Charset, causing cross-platform encoding bugs.",
    "level": "Intermediate",
    "codeExample": "new FileReader(file, StandardCharsets.UTF_8); // Java 11+"
  }
];

export default topic4_questions;