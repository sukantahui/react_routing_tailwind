const topic12_questions = [
  {
    "question": "What is the difference between 'subSet(from, to)' from SortedSet and 'subSet(from, fromInclusive, to, toInclusive)' from NavigableSet?",
    "shortAnswer": "The older 'SortedSet.subSet(from, to)' is strictly fixed to 'half-open' intervals (from is inclusive, to is exclusive). In contrast, 'NavigableSet.subSet(from, fromInc, to, toInc)' allows explicit boolean configuration for whether the start and end boundaries are inclusive or exclusive, offering full mathematical flexibility.",
    "explanation": "Enhanced range view APIs introduced with java.util.NavigableSet.",
    "hint": "NavigableSet allows explicit boolean flags to specify whether from and to bounds are inclusive.",
    "level": "Intermediate",
    "codeExample": "set.subSet(10, true, 50, true); // Fully closed interval [10, 50]"
  }
];

export default topic12_questions;