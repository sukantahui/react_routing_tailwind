const topic3_questions = [
  {
    "question": "Why does Effective Java Item 35 strongly advise against relying on 'enum.ordinal()' for business logic or database persistence?",
    "shortAnswer": "Because 'ordinal()' represents the zero-based declaration order. If a developer reorders constants, inserts a new constant in the middle, or deletes an obsolete constant, all ordinal integer values shift, corrupting persisted database records and business rankings.",
    "explanation": "Store enum names ('String') or explicit integer codes in custom fields instead.",
    "hint": "Reordering enum constants changes ordinal values, breaking stored database records.",
    "level": "Intermediate",
    "codeExample": "int pos = status.ordinal(); // DANGEROUS for database persistence"
  }
];

export default topic3_questions;