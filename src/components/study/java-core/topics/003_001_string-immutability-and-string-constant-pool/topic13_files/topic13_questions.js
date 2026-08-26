const topic13_questions = [
  {
    question: "Why should you always specify 'StandardCharsets.UTF_8' when calling 'String.getBytes()'?",
    shortAnswer: "Calling parameterless 'getBytes()' uses the operating system's default charset (e.g. Windows-1252), causing silent data corruption when deployed across different platforms (e.g. Linux servers). 'StandardCharsets.UTF_8' guarantees universal cross-platform consistency.",
    explanation: "Always explicitly supply StandardCharsets.UTF_8 for binary and network encoding.",
    hint: "Prevents platform-dependent charset corruption across Windows and Linux servers.",
    level: "Intermediate",
    codeExample: "byte[] data = text.getBytes(StandardCharsets.UTF_8);"
  }
];

export default topic13_questions;