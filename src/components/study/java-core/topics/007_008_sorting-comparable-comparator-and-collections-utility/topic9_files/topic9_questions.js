const topic9_questions = [
  {
    "question": "What happens if a collection containing 'null' elements is sorted with a standard Comparator, and how do 'nullsFirst()' and 'nullsLast()' solve this?",
    "shortAnswer": "Sorting a collection containing 'null' elements with standard 'Collections.sort()' or standard Comparators immediately throws a runtime 'NullPointerException' because Java attempts to call 'e.compareTo(null)' or 'null.compareTo(e)'. 'Comparator.nullsFirst(c)' and 'Comparator.nullsLast(c)' wrap the comparator, intercepting nulls and placing them safely at the beginning or end of the sorted sequence with zero exceptions.",
    "explanation": "Crucial null-safety enhancement added in Java 8.",
    "hint": "Standard sorting crashes with NPE on nulls; nullsFirst/nullsLast position nulls at the start or end safely.",
    "level": "Intermediate",
    "codeExample": "list.sort(Comparator.nullsLast(Comparator.comparing(User::getEmail)));"
  }
];

export default topic9_questions;