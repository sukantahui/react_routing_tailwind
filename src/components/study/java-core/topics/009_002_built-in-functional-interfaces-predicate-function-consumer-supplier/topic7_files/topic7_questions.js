const topic7_questions = [
  {
    "question": "How do 'and()', 'or()', 'negate()', and 'Predicate.isEqual()' combine conditional validation logic in Java?",
    "shortAnswer": "1. 'p1.and(p2)': Returns a short-circuiting logical AND predicate that evaluates true only if both p1 and p2 are true. 2. 'p1.or(p2)': Returns a short-circuiting logical OR predicate that evaluates true if either p1 or p2 is true. 3. 'p.negate()': Returns a logical NOT predicate that inverts the result of p. 4. 'Predicate.isEqual(target)': A static factory method that returns a predicate testing if an object equals the target using 'Objects.equals()'.",
    "explanation": "Comprehensive guide to Predicate default and static methods in Java 8.",
    "hint": "and(), or(), negate() form boolean logic; Predicate.isEqual() checks equality using Objects.equals().",
    "level": "Intermediate",
    "codeExample": "Predicate<Student> honors = isEnrolled.and(hasHighMarks).and(isFeePaid.negate());"
  }
];

export default topic7_questions;