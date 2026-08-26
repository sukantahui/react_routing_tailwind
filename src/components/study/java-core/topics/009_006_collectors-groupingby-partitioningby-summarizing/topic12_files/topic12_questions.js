const topic12_questions = [
  {
    "question": "Why was Collectors.filtering() added in Java 9 when stream.filter() already existed in Java 8?",
    "shortAnswer": "To support filtering elements inside individual grouping buckets without discarding the group keys themselves. Upstream stream.filter() drops entire groups if no elements match the predicate.",
    "explanation": "Maintains full key sets in business reporting dashboards.",
    "hint": "Preserves grouping keys with empty collections rather than omitting the key entirely.",
    "level": "Intermediate",
    "codeExample": "groupingBy(Department::getName, filtering(e -> e.getSalary() > 100000, toList()))"
  },
  {
    "question": "What will the value in the Map be for a group where no elements match the filtering predicate?",
    "shortAnswer": "An empty collection (e.g. an empty List or empty Set), depending on the downstream collector.",
    "explanation": "The key exists and maps to an empty container rather than null or missing.",
    "hint": "An empty collection (e.g. empty List).",
    "level": "Beginner",
    "codeExample": "map.get('EmptyGroup') // returns [] (not null!)"
  }
];

export default topic12_questions;
