const questions = [
  {
    "id": "q1",
    "question": "Q1: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q2",
    "question": "Q2: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q3",
    "question": "Q3: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q4",
    "question": "Q4: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q5",
    "question": "Q5: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q6",
    "question": "Q6: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q7",
    "question": "Q7: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q8",
    "question": "Q8: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q9",
    "question": "Q9: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q10",
    "question": "Q10: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q11",
    "question": "Q11: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q12",
    "question": "Q12: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q13",
    "question": "Q13: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q14",
    "question": "Q14: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q15",
    "question": "Q15: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q16",
    "question": "Q16: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q17",
    "question": "Q17: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q18",
    "question": "Q18: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q19",
    "question": "Q19: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q20",
    "question": "Q20: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q21",
    "question": "Q21: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q22",
    "question": "Q22: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q23",
    "question": "Q23: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  },
  {
    "id": "q24",
    "question": "Q24: How does a UNIQUE constraint differ from a PRIMARY KEY constraint?",
    "options": [
      "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
      "UNIQUE allows duplicate values while PRIMARY KEY does not",
      "UNIQUE only applies to numbers while PRIMARY KEY applies to text",
      "There is no difference between them"
    ],
    "answer": "A table can have multiple UNIQUE constraints and they accept NULLs; a table has only ONE Primary Key and it rejects NULLs",
    "explanation": "A table may have multiple UNIQUE columns which can accept NULLs. A table can only have one PRIMARY KEY which never accepts NULLs.",
    "explanationBn": "একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে এবং NULL গ্রহণ করতে পারে; কিন্তু PRIMARY KEY কেবল একটিই হয় এবং কোনো NULL গ্রহণ করে না।",
    "topic": "Column Constraints",
    "difficulty": "Medium",
    "hint": "Consider quantity per table and NULL acceptance."
  },
  {
    "id": "q25",
    "question": "Q25: Which integrity constraint enforces both uniqueness and non-null values for a column and serves as the primary row identifier?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "PRIMARY KEY uniquely identifies each row and implicitly enforces both UNIQUE and NOT NULL rules.",
    "explanationBn": "PRIMARY KEY প্রতিটি রো-কে এককভাবে চিহ্নিত করে এবং স্বয়ংক্রিয়ভাবে UNIQUE ও NOT NULL প্রয়োগ করে।",
    "topic": "Column Constraints",
    "difficulty": "Easy",
    "hint": "The fundamental entity identifier constraint."
  }
];

export default questions;
