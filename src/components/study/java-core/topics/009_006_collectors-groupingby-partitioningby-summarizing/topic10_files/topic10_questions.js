const topic10_questions = [
  {
    "question": "What is the purpose of Collectors.mapping() inside a groupingBy collector?",
    "shortAnswer": "Collectors.mapping() transforms each element in a group (e.g. extracting a specific property like getName()) before feeding the transformed value into another downstream collector (like toList() or toSet()).",
    "explanation": "This changes the value collection from List<Object> to List<FieldType>.",
    "hint": "Transforms elements inside each group before downstream collection.",
    "level": "Intermediate",
    "codeExample": "groupingBy(Employee::getDept, mapping(Employee::getSalary, toList()))"
  },
  {
    "question": "Can Collectors.mapping() be chained with joining()?",
    "shortAnswer": "Yes! For example: groupingBy(Student::getCenter, mapping(Student::getName, joining(', '))) produces Map<String, String> where each center maps to a comma-separated string of student names.",
    "explanation": "Collectors are fully composable building blocks.",
    "hint": "mapping(Student::getName, joining(', ')) produces a joined string per group.",
    "level": "Intermediate",
    "codeExample": "stream.collect(groupingBy(Student::getCenter, mapping(Student::getName, joining(', '))));"
  }
];

export default topic10_questions;
