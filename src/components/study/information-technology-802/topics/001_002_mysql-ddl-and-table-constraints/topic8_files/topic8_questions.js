const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q2",
    "question": "Q2: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q3",
    "question": "Q3: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q4",
    "question": "Q4: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q5",
    "question": "Q5: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q6",
    "question": "Q6: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q7",
    "question": "Q7: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q8",
    "question": "Q8: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q9",
    "question": "Q9: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q10",
    "question": "Q10: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q11",
    "question": "Q11: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q12",
    "question": "Q12: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q13",
    "question": "Q13: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q14",
    "question": "Q14: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q15",
    "question": "Q15: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q16",
    "question": "Q16: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q17",
    "question": "Q17: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q18",
    "question": "Q18: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q19",
    "question": "Q19: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q20",
    "question": "Q20: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q21",
    "question": "Q21: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q22",
    "question": "Q22: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q23",
    "question": "Q23: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  },
  {
    "id": "q24",
    "question": "Q24: Can a DROP TABLE command be rolled back using the ROLLBACK statement in MySQL?",
    "options": [
      "No, because DDL statements auto-commit immediately",
      "Yes, always",
      "Yes, if executed inside a transaction block",
      "Only if the table has no primary key"
    ],
    "answer": "No, because DDL statements auto-commit immediately",
    "explanation": "DDL commands like DROP TABLE cannot be rolled back because MySQL issues an implicit commit immediately.",
    "explanationBn": "না, কারণ DDL স্টেটমেন্টগুলি তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Medium",
    "hint": "DDL auto-commit behavior."
  },
  {
    "id": "q25",
    "question": "Q25: What is the key difference between DROP TABLE and DELETE FROM?",
    "options": [
      "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
      "DROP TABLE only deletes rows; DELETE FROM deletes the database",
      "DELETE FROM is DDL; DROP TABLE is DML",
      "There is no difference between them"
    ],
    "answer": "DROP TABLE removes the table schema and data permanently; DELETE FROM deletes rows while preserving the table schema",
    "explanation": "DROP TABLE destroys the table definition and schema entirely. DELETE FROM removes tuples/rows while keeping the table structure intact for future inserts.",
    "explanationBn": "DROP TABLE টেবিলের কাঠামো এবং ডেটা দুটোই সম্পূর্ণ মুছে ফেলে; DELETE FROM কাঠামো অক্ষত রেখে রো মুছে ফেলে।",
    "topic": "DROP TABLE vs DELETE FROM",
    "difficulty": "Easy",
    "hint": "Schema destruction vs row deletion."
  }
];

export default questions;
