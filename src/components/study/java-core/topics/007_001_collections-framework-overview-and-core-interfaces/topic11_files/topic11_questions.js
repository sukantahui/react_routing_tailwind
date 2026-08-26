const topic11_questions = [
  {
    "question": "What is the critical distinction between 'Arrays.asList()', 'List.of()', and 'Collections.unmodifiableList()' regarding mutability and backing arrays?",
    "shortAnswer": "1. 'Arrays.asList()': A fixed-size wrapper backed directly by an array; you CANNOT add/remove elements, but you CAN modify elements in-place ('list.set(i, val)') which mutates the original array. 2. 'Collections.unmodifiableList()': An unmodifiable view wrapper; the view itself cannot be modified, but mutations to the underlying backing list are visible through the view. 3. 'List.of()': A standalone, truly immutable collection with no backing array/list leaks and zero null tolerance.",
    "explanation": "One of the most frequently asked senior Java interview questions.",
    "hint": "Arrays.asList allows set(); unmodifiableList reflects underlying list changes; List.of is truly standalone immutable.",
    "level": "Intermediate",
    "codeExample": "Arrays.asList(arr).set(0, \"New\"); // Mutates arr! List.of(\"A\").set(0, \"New\"); // Throws exception!"
  }
];

export default topic11_questions;