const topic12_questions = [
  {
    question: "Why is 'String.valueOf(obj)' preferred over 'obj.toString()' and 'emptyString + obj' in Java?",
    shortAnswer: "1. 'String.valueOf(obj)' is null-safe (returns \"null\" instead of throwing NullPointerException). 2. Unlike string concatenation, it avoids unnecessary StringBuilder instantiations when converting primitives.",
    explanation: "String.valueOf() is the most robust and idiomatic conversion tool in the standard library.",
    hint: "Handles nulls safely and avoids hidden StringBuilder object allocations.",
    level: "Beginner",
    codeExample: "String s = String.valueOf(data); // Null safe and clean"
  }
];

export default topic12_questions;
