const topic10_questions = [
  {
    "question": "What is the crucial difference between 'java.util.Collection' and 'java.util.Collections' in Java?",
    "shortAnswer": "'java.util.Collection' is the root generic INTERFACE for list, set, and queue data structures in the Java Collections Framework hierarchy. In contrast, 'java.util.Collections' (plural) is a non-instantiable static UTILITY CLASS consisting entirely of static polymorphic algorithms, wrappers, and factory methods (such as 'sort()', 'unmodifiableList()', 'synchronizedMap()').",
    "explanation": "Fundamental Java vocabulary question in interviews.",
    "hint": "Collection is the root interface; Collections is the static utility class containing helper algorithms.",
    "level": "Beginner",
    "codeExample": "Collection<String> c = new ArrayList<>(); Collections.sort((List<String>) c);"
  }
];

export default topic10_questions;