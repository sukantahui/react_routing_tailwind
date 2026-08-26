const topic5_questions = [
  {
    "question": "What is the default Map and Collection type returned by the 1-argument Collectors.groupingBy(classifier)?",
    "shortAnswer": "It returns a java.util.HashMap containing keys of classifier type K and values of java.util.ArrayList containing elements of type T (Map<K, List<T>>).",
    "explanation": "If a different Map or Collection type is needed, the 2-arg or 3-arg overloads must be used.",
    "hint": "Returns HashMap<K, List<T>>.",
    "level": "Beginner",
    "codeExample": "Map<String, List<Student>> map = list.stream().collect(Collectors.groupingBy(Student::getCenter));"
  },
  {
    "question": "Can the classification function in groupingBy() return null?",
    "shortAnswer": "In standard HashMap implementations, null keys are permitted by HashMap, but using null keys is considered an anti-pattern. If a TreeMap supplier is passed, returning null will throw a NullPointerException.",
    "explanation": "Prefer using Optional or sentinel default values instead of null keys.",
    "hint": "Avoid null classifier keys to prevent TreeMap exceptions and maintain clean design.",
    "level": "Intermediate",
    "codeExample": "s -> s.getCenter() != null ? s.getCenter() : 'Unassigned'"
  }
];

export default topic5_questions;
