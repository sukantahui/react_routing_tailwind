const topic3_questions = [
  {
    "question": "What does it mean for 'compareTo()' to be 'consistent with equals()', and what happens if a class violates this recommendation?",
    "shortAnswer": "'compareTo()' is 'consistent with equals()' if and only if '(x.compareTo(y) == 0) == (x.equals(y))' for all instances. If violated (such as in 'java.math.BigDecimal' where '1.0.equals(1.00)' is false but '1.0.compareTo(1.00)' is 0), collections that use 'equals()' (like 'HashSet') will retain both elements, whereas sorted collections that use 'compareTo()' (like 'TreeSet') will treat them as duplicates and discard one, causing inconsistent behavior.",
    "explanation": "Effective Java Item 14 and java.lang.Comparable Javadoc specification.",
    "hint": "(x.compareTo(y) == 0) == (x.equals(y)); inconsistency causes divergent behavior between HashSet and TreeSet.",
    "level": "Advanced",
    "codeExample": "BigDecimal a = new BigDecimal(\"1.0\"); BigDecimal b = new BigDecimal(\"1.00\"); a.equals(b); // false; a.compareTo(b); // 0"
  }
];

export default topic3_questions;