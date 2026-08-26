const topic10_questions = [
  {
    "question": "What happens if you insert an object that does NOT implement 'Comparable' into a 'TreeSet' created without a 'Comparator'?",
    "shortAnswer": "The first element may be inserted without issue (in some JDK versions), but adding the second element will immediately throw a runtime 'ClassCastException' ('MyClass cannot be cast to java.lang.Comparable') because TreeSet cannot compare nodes to position them in the Red-Black tree.",
    "explanation": "Mandatory requirement for TreeSet elements.",
    "hint": "Throws runtime ClassCastException because elements must implement Comparable or use a Comparator.",
    "level": "Beginner",
    "codeExample": "TreeSet<Person> set = new TreeSet<>(); set.add(new Person()); // Throws ClassCastException if not Comparable"
  }
];

export default topic10_questions;