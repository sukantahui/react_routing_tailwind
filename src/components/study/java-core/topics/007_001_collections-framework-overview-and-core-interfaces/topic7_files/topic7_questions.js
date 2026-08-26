const topic7_questions = [
  {
    "question": "How does 'java.util.Set<E>' detect and reject duplicate elements when calling 'set.add(element)'?",
    "shortAnswer": "When calling 'set.add(e)', the Set implementation uses 'equals()' and 'hashCode()' (in HashSet/LinkedHashSet) or 'compareTo()/compare()' (in TreeSet). If an existing element 'e2' evaluates to '(e == null ? e2 == null : e.equals(e2))' or compare returns 0, the Set leaves the collection unmodified and returns 'false', guaranteeing strict uniqueness.",
    "explanation": "Core contract of java.util.Set and Effective Java Item 10 & 11.",
    "hint": "Uses hashCode() and equals() to check for equality; returns false if already present.",
    "level": "Beginner",
    "codeExample": "Set<String> s = new HashSet<>(); s.add(\"A\"); boolean rejected = !s.add(\"A\");"
  }
];

export default topic7_questions;