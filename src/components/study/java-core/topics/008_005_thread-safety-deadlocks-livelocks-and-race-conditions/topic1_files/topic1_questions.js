const topic1_questions = [
  {
    "question": "Compare the two primary categories of Race Conditions: 'Read-Modify-Write' vs 'Check-Then-Act'.",
    "shortAnswer": "1. 'Read-Modify-Write': Occurs when the next state of a variable depends on its previous state (e.g. 'counter++' or 'balance += amount'). Multiple threads read the same stale value, calculate their updates in local registers, and write back, overwriting and losing each other's increments. 2. 'Check-Then-Act': Occurs when a thread verifies a condition (e.g. 'if (instance == null)' or 'if (map.containsKey(key))'), but before it can perform the subsequent action, another thread interleaves and mutates the state, rendering the verified condition invalid.",
    "explanation": "Comprehensive taxonomy of race conditions in computer science.",
    "hint": "Read-Modify-Write causes lost updates (count++); Check-Then-Act causes actions on stale conditions (lazy singleton).",
    "level": "Intermediate",
    "codeExample": "// RMW: count++; | CTA: if (instance == null) instance = new Helper();"
  }
];

export default topic1_questions;