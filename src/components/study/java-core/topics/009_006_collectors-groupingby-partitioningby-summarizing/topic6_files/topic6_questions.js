const topic6_questions = [
  {
    "question": "Can a grouping classifier categorize elements into keys that are not fields on the original object?",
    "shortAnswer": "Yes! The classifier is a general Function<T, K> that can compute any arbitrary key value (such as age brackets, string lengths, ranges, or custom enum values) dynamically for each element.",
    "explanation": "This allows dynamic classification without modifying domain models.",
    "hint": "The classifier can be any function calculating dynamic keys.",
    "level": "Beginner",
    "codeExample": "words.stream().collect(Collectors.groupingBy(String::length)); // Groups by word length"
  },
  {
    "question": "How do you group by multiple fields (e.g. Center AND Course) in single-level grouping?",
    "shortAnswer": "By creating and returning a Java Record (or composite key class) with value-based equals and hashCode from the classifier function: groupingBy(s -> new CenterCourse(s.center(), s.course())).",
    "explanation": "Java records provide automatic value equality, making them perfect composite grouping keys.",
    "hint": "Use a Java record as a composite key in the classifier function.",
    "level": "Intermediate",
    "codeExample": "record BranchCourse(String branch, String course) {}\\nstream.collect(groupingBy(s -> new BranchCourse(s.getBranch(), s.getCourse())));"
  }
];

export default topic6_questions;
