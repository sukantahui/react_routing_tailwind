const topic8_questions = [
  {
    "question": "What does the downstream collector in groupingBy(classifier, downstream) operate on?",
    "shortAnswer": "The downstream collector operates independently on the sub-stream of elements that belong to each specific classification group/bucket.",
    "explanation": "This enables per-group aggregations without manual iteration.",
    "hint": "Operates on the elements assigned to each group bucket.",
    "level": "Intermediate",
    "codeExample": "stream.collect(groupingBy(Student::getCenter, counting()));"
  },
  {
    "question": "What is the return type of groupingBy(Student::getCenter, toSet())?",
    "shortAnswer": "Map<String, Set<Student>>, where each key maps to a Set rather than the default List.",
    "explanation": "Passing toSet() as downstream changes the value container from List to Set.",
    "hint": "Map<String, Set<Student>>",
    "level": "Beginner",
    "codeExample": "Map<String, Set<Student>> map = stream.collect(groupingBy(Student::getCenter, toSet()));"
  }
];

export default topic8_questions;
