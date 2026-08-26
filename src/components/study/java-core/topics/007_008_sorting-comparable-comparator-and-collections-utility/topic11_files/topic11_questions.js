const topic11_questions = [
  {
    "question": "What is the mandatory prerequisite before calling 'Collections.binarySearch(list, key)', and what does a negative return value indicate?",
    "shortAnswer": "1. 'Prerequisite': the list MUST be sorted in ascending order according to natural ordering or the specified Comparator prior to calling 'binarySearch()'. If unsorted, the result is undefined. 2. 'Negative Return Value': if the element is not found, binarySearch returns '(-(insertion point) - 1)', indicating the exact index where the key would be inserted while preserving sort order.",
    "explanation": "Classic binary search algorithm contract in java.util.Collections.",
    "hint": "Must be sorted first; returns negative index '(-(insertion point) - 1)' if key is absent.",
    "level": "Intermediate",
    "codeExample": "Collections.sort(list); int idx = Collections.binarySearch(list, \"Target\");"
  }
];

export default topic11_questions;