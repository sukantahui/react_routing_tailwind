const topic15_questions = [
  {
    "question": "What threshold does Eclipse MAT typically use to flag an object as a 'Problem Suspect' in the Leak Suspects Report?",
    "shortAnswer": "MAT flags any single object, collection, or retained object subtree that dominates more than roughly 10% to 15% of the total heap memory.",
    "explanation": "Heuristic based on anomalous memory accumulation.",
    "hint": "Objects dominating more than ~10-15% of total heap memory.",
    "level": "Intermediate",
    "codeExample": "Problem Suspect: 1 instance occupies 82% of heap."
  },
  {
    "question": "What section of the Problem Suspect Details view shows the exact thread and call stack that allocated the leaking object?",
    "shortAnswer": "The 'Thread Details' / 'Accumulated Objects by Class' section, which links the object to the active Thread Stack frame at the time the dump was captured.",
    "explanation": "Pins the leak down to the specific line of code.",
    "hint": "Thread Details / Stack Trace section.",
    "level": "Intermediate",
    "codeExample": "Thread Details → Displays call stack and local variable anchors."
  }
];

export default topic15_questions;
