const topic5_questions = [
  {
    "question": "Summarize the 4 key differences between 'Comparable<T>' and 'Comparator<T>' in Java.",
    "shortAnswer": "1. 'Package & Method': Comparable is in 'java.lang' with 'compareTo(T o)' (1 argument); Comparator is in 'java.util' with 'compare(T o1, T o2)' (2 arguments). 2. 'Flexibility': Comparable provides a single default natural ordering; Comparator allows multiple independent sorting strategies. 3. 'Source Modification': Comparable requires modifying the domain class; Comparator works externally without touching domain code. 4. 'Functional API': Comparator is a '@FunctionalInterface' supporting lambdas and method chaining.",
    "explanation": "Universal Java interview comparison question.",
    "hint": "1 arg compareTo in java.lang vs 2 args compare in java.util; single natural sort vs multiple dynamic strategies.",
    "level": "Intermediate",
    "codeExample": "class Student implements Comparable<Student> { ... } // vs // Comparator<Student> byGpa = ...;"
  }
];

export default topic5_questions;