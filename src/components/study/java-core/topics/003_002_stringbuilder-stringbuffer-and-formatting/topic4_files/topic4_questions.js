const topic4_questions = [
  {
    question: "What is the initial default capacity of a StringBuilder, and what mathematical formula does the JVM use when dynamic resizing occurs?",
    shortAnswer: "The initial default capacity is 16 characters. When the buffer overflows, the JVM calculates new capacity using: 'newCapacity = (oldCapacity * 2) + 2'. For example, from 16 it grows to 34, then 70, then 142.",
    explanation: "You can specify an initial capacity with 'new StringBuilder(100)' to prevent expensive array reallocation copies.",
    hint: "Initial capacity is 16; growth formula is '(oldCapacity * 2) + 2'.",
    level: "Intermediate",
    codeExample: "StringBuilder sb = new StringBuilder(1024); // Pre-allocate buffer"
  }
];

export default topic4_questions;