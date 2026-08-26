const topic8_questions = [
  {
    question: "Why is it mandatory that if 'a.equals(b)' is true, 'a.hashCode()' must equal 'b.hashCode()'?",
    shortAnswer: "Because hash-based collections (HashMap/HashSet) use hashCode() first to locate the bucket. If two logically equal objects had different hash codes, the collection would look in different buckets and fail to find or deduplicate the object.",
    explanation: "This rule preserves collection consistency across all Java APIs.",
    hint: "Guarantees that equal objects land in the exact same hash bucket.",
    level: "Intermediate",
    codeExample: "if (a.equals(b)) assert a.hashCode() == b.hashCode();"
  }
];

export default topic8_questions;