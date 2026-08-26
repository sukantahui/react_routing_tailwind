const topic14_questions = [
  {
    question: "Why does repeated String concatenation ('s += i') inside a loop cause severe O(N^2) performance degradation?",
    shortAnswer: "Because Strings are immutable, each '+' inside a loop instantiates a new StringBuilder, copies all previous characters, and creates a new String object. Over N iterations, it copies N*(N+1)/2 characters, creating quadratic O(N^2) CPU overhead and massive GC pressure.",
    explanation: "Always use StringBuilder or StringBuffer for loop concatenation.",
    hint: "Copies previous characters repeatedly, resulting in O(N^2) time complexity.",
    level: "Advanced",
    codeExample: "StringBuilder sb = new StringBuilder(); for (...) sb.append(item);"
  }
];

export default topic14_questions;