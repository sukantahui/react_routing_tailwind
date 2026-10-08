const questions = [
  {
    "id": "q1",
    "question": "Q1: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q2",
    "question": "Q2: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q3",
    "question": "Q3: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q4",
    "question": "Q4: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q5",
    "question": "Q5: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q6",
    "question": "Q6: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q7",
    "question": "Q7: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q8",
    "question": "Q8: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q9",
    "question": "Q9: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q10",
    "question": "Q10: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q11",
    "question": "Q11: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q12",
    "question": "Q12: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q13",
    "question": "Q13: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q14",
    "question": "Q14: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q15",
    "question": "Q15: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q16",
    "question": "Q16: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q17",
    "question": "Q17: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q18",
    "question": "Q18: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q19",
    "question": "Q19: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q20",
    "question": "Q20: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q21",
    "question": "Q21: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q22",
    "question": "Q22: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q23",
    "question": "Q23: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  },
  {
    "id": "q24",
    "question": "Q24: What is the default action in MySQL if a parent row is deleted and no ON DELETE action is explicitly specified?",
    "options": [
      "ON DELETE RESTRICT (Deletion is rejected with an error)",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "Deletes only the parent primary key column"
    ],
    "answer": "ON DELETE RESTRICT (Deletion is rejected with an error)",
    "explanation": "By default, MySQL enforces RESTRICT / NO ACTION, which prevents deleting a parent row if dependent child records exist.",
    "explanationBn": "ডিফল্টভাবে MySQL-এ RESTRICT প্রযোজ্য হয়, যা সম্পর্কিত চাইল্ড রেকর্ড থাকলে প্যারেন্ট রো ডিলিট হতে বাধা দেয়।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Default protective restriction against data loss."
  },
  {
    "id": "q25",
    "question": "Q25: What happens when a parent table row is deleted if the child table foreign key is defined with 'ON DELETE CASCADE'?",
    "options": [
      "All matching child table rows are automatically deleted",
      "The deletion is blocked with an error",
      "The child foreign key values are set to 0",
      "The entire database is deleted"
    ],
    "answer": "All matching child table rows are automatically deleted",
    "explanation": "ON DELETE CASCADE automatically propagates the deletion to all corresponding child rows, preventing orphan records.",
    "explanationBn": "ON DELETE CASCADE প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে ফেলে।",
    "topic": "Foreign Keys & Cascading",
    "difficulty": "Medium",
    "hint": "Deletion cascades down to referencing rows."
  }
];

export default questions;
