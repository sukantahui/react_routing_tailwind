const topic15_questions = [
  {
    "question": "What is the 'Lost Key' problem in a HashMap, and how does it create silent memory leaks?",
    "shortAnswer": "The 'Lost Key' problem occurs when a mutable object is used as a HashMap key and its fields participating in 'hashCode()' are modified after insertion. When 'get(key)' or 'remove(key)' is called later, the newly computed hash code directs the search to a different bucket, returning 'null'. The original entry remains trapped in the old bucket indefinitely, consuming heap memory without any way to retrieve or clean it up.",
    "explanation": "Classic production defect pattern and core Java interview scenario.",
    "hint": "Key mutation alters hashCode causing lookups to inspect the wrong bucket; original entry becomes unreachable.",
    "level": "Advanced",
    "codeExample": "key.setDept(\"New\"); map.get(key); // returns null! Entry is stuck in old bucket forever!"
  }
];

export default topic15_questions;