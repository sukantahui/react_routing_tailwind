const topic14_questions = [
  {
    "question": "Why does 'TreeSet' throw a 'NullPointerException' when attempting to insert 'null', whereas 'HashSet' and 'LinkedHashSet' permit at most one 'null'?",
    "shortAnswer": "'HashSet' and 'LinkedHashSet' handle 'null' by assigning it a designated hash code of 0 (storing it in bucket 0 of the backing HashMap). In contrast, 'TreeSet' relies on 'compareTo()' or 'Comparator.compare()'. Invoking 'e.compareTo(null)' or 'null.compareTo(e)' causes a 'NullPointerException' because null cannot be compared against other elements.",
    "explanation": "Fundamental null-safety design difference among Java Set implementations.",
    "hint": "Null cannot be compared with compareTo()/compare(), triggering a NullPointerException in TreeSet.",
    "level": "Intermediate",
    "codeExample": "hashSet.add(null); // OK (size=1) | treeSet.add(null); // Throws NullPointerException!"
  }
];

export default topic14_questions;