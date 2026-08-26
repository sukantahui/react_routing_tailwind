const topic12_questions = [
  {
    "question": "What does 'Collections.disjoint(c1, c2)' do and when does it return true?",
    "shortAnswer": "'Collections.disjoint(c1, c2)' tests whether two collections have NO elements in common (i.e. their mathematical intersection is empty). It returns 'true' if the two specified collections share zero identical elements; and returns 'false' if they contain at least one common element.",
    "explanation": "Standard set analysis method in java.util.Collections.",
    "hint": "Returns true if c1 and c2 have zero common elements (empty intersection).",
    "level": "Beginner",
    "codeExample": "boolean emptyIntersection = Collections.disjoint(listA, listB);"
  }
];

export default topic12_questions;