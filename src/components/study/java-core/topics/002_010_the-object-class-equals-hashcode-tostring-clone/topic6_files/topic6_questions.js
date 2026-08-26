const topic6_questions = [
  {
    question: "What is the purpose of the 'hashCode()' method in Java, and why is the prime number 31 commonly used in hash algorithms?",
    shortAnswer: "The 'hashCode()' method returns an integer hash value used by hash-based data structures (HashMap, HashSet, Hashtable) to determine bucket placement. 31 is an odd prime that produces good bucket distribution and allows JVM bit-shift optimization: '31 * i == (i << 5) - i'.",
    explanation: "Ensures uniform hash distribution and high performance in collections.",
    hint: "Returns integer bucket index; 31 optimizes to bit-shift '(i << 5) - i'.",
    level: "Intermediate",
    codeExample: "int hash = Objects.hash(id, name);"
  }
];

export default topic6_questions;