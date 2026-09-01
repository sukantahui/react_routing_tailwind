const questions = [
  {
    question: "Why is a leading space required before %c in scanf(\" %c\", &ch)?",
    shortAnswer: "The leading space tells scanf to skip leftover whitespace and newline characters in stdin.",
    explanation: "When pressing Enter after numeric input, '\\n' remains in the input stream. A leading space in scanf format string consumes trailing newlines before reading the character.",
    hint: "Leading space consumes leftover '\\n'.",
    level: "intermediate"
  }
];

export default questions;
