const topic5_questions = [
  {
    question: "What does the 'String.intern()' native method do in Java?",
    shortAnswer: "The 'intern()' method returns the canonical representation of the string from the String Constant Pool (SCP). If the string exists in SCP, its pool reference is returned; otherwise, the string is added to SCP and returned.",
    explanation: "Allows converting dynamically computed heap strings into shared pooled instances for memory optimization.",
    hint: "Returns the canonical pooled reference from SCP.",
    level: "Intermediate",
    codeExample: "String s2 = s1.intern(); // s2 points directly to SCP"
  }
];

export default topic5_questions;