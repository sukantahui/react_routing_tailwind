const questions = [
  {
    "id": "q1",
    "question": "Q1: Which of the following is a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "UPDATE",
      "INSERT",
      "SELECT"
    ],
    "answer": "ALTER TABLE",
    "explanation": "ALTER TABLE is a DDL command that modifies the structural schema of a database relation.",
    "explanationBn": "ALTER TABLE হলো একটি DDL কমান্ড যা টেবিলের গঠন পরিবর্তন করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Modifies table structure."
  },
  {
    "id": "q2",
    "question": "Q2: What is the maximum value that can be stored in DECIMAL(4, 2)?",
    "options": [
      "99.99",
      "9.999",
      "999.9",
      "9999"
    ],
    "answer": "99.99",
    "explanation": "Precision = 4, Scale = 2. Integer digits = 4 - 2 = 2. Maximum value = 99.99.",
    "explanationBn": "DECIMAL(4,2)-এর ক্ষেত্রে পূর্ণসংখ্যায় ২ অঙ্ক এবং দশমিকে ২ অঙ্ক—সর্বোচ্চ মান ৯৯.৯৯।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "4 - 2 = 2 integer digits and 2 decimal digits."
  },
  {
    "id": "q3",
    "question": "Q3: Which command permanently removes both the schema and records of a relation from the database?",
    "options": [
      "DROP TABLE",
      "DELETE FROM",
      "TRUNCATE TABLE",
      "CLEAR TABLE"
    ],
    "answer": "DROP TABLE",
    "explanation": "DROP TABLE completely eliminates the table schema, constraints, and rows from the catalog.",
    "explanationBn": "DROP TABLE ডেটাবেস থেকে টেবিলের গঠন ও ডেটা সম্পূর্ণ ধ্বংস করে দেয়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Destroys table schema."
  },
  {
    "id": "q4",
    "question": "Q4: Write the clause to add a new column 'AadhaarNo CHAR(12)' after the 'FullName' column in 'Student':",
    "options": [
      "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "ALTER TABLE Student INSERT AadhaarNo CHAR(12) NEXT TO FullName;",
      "MODIFY TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "UPDATE TABLE Student ADD AadhaarNo CHAR(12) BEHIND FullName;"
    ],
    "answer": "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "explanation": "The correct DDL syntax uses ALTER TABLE ... ADD ... AFTER existing_column.",
    "explanationBn": "সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "ADD with AFTER positioning."
  },
  {
    "id": "q5",
    "question": "Q5: What happens when a parent record is deleted in a table with a foreign key defined as 'ON DELETE CASCADE'?",
    "options": [
      "All matching child records referencing that parent are automatically deleted",
      "MySQL blocks the deletion with an error",
      "The child foreign keys are set to 0",
      "The parent record cannot be deleted until computer restart"
    ],
    "answer": "All matching child records referencing that parent are automatically deleted",
    "explanation": "ON DELETE CASCADE cascades deletions to all referencing child tuples to maintain referential integrity.",
    "explanationBn": "প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে যায়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "Cascades to referencing child rows."
  },
  {
    "id": "q6",
    "question": "Q6: Which constraint ensures that a column cannot store NULL values and only allows distinct values, while only ONE such constraint is permitted per table?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "A table has strictly ONE Primary Key, which combines uniqueness and non-null enforcement.",
    "explanationBn": "টেবিলে কেবল একটিই PRIMARY KEY হতে পারে যা ইউনিক এবং নন-নাল দুটোই প্রয়োগ করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Single primary entity identifier."
  },
  {
    "id": "q7",
    "question": "Q7: Which of the following is a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "UPDATE",
      "INSERT",
      "SELECT"
    ],
    "answer": "ALTER TABLE",
    "explanation": "ALTER TABLE is a DDL command that modifies the structural schema of a database relation.",
    "explanationBn": "ALTER TABLE হলো একটি DDL কমান্ড যা টেবিলের গঠন পরিবর্তন করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Modifies table structure."
  },
  {
    "id": "q8",
    "question": "Q8: What is the maximum value that can be stored in DECIMAL(4, 2)?",
    "options": [
      "99.99",
      "9.999",
      "999.9",
      "9999"
    ],
    "answer": "99.99",
    "explanation": "Precision = 4, Scale = 2. Integer digits = 4 - 2 = 2. Maximum value = 99.99.",
    "explanationBn": "DECIMAL(4,2)-এর ক্ষেত্রে পূর্ণসংখ্যায় ২ অঙ্ক এবং দশমিকে ২ অঙ্ক—সর্বোচ্চ মান ৯৯.৯৯।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "4 - 2 = 2 integer digits and 2 decimal digits."
  },
  {
    "id": "q9",
    "question": "Q9: Which command permanently removes both the schema and records of a relation from the database?",
    "options": [
      "DROP TABLE",
      "DELETE FROM",
      "TRUNCATE TABLE",
      "CLEAR TABLE"
    ],
    "answer": "DROP TABLE",
    "explanation": "DROP TABLE completely eliminates the table schema, constraints, and rows from the catalog.",
    "explanationBn": "DROP TABLE ডেটাবেস থেকে টেবিলের গঠন ও ডেটা সম্পূর্ণ ধ্বংস করে দেয়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Destroys table schema."
  },
  {
    "id": "q10",
    "question": "Q10: Write the clause to add a new column 'AadhaarNo CHAR(12)' after the 'FullName' column in 'Student':",
    "options": [
      "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "ALTER TABLE Student INSERT AadhaarNo CHAR(12) NEXT TO FullName;",
      "MODIFY TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "UPDATE TABLE Student ADD AadhaarNo CHAR(12) BEHIND FullName;"
    ],
    "answer": "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "explanation": "The correct DDL syntax uses ALTER TABLE ... ADD ... AFTER existing_column.",
    "explanationBn": "সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "ADD with AFTER positioning."
  },
  {
    "id": "q11",
    "question": "Q11: What happens when a parent record is deleted in a table with a foreign key defined as 'ON DELETE CASCADE'?",
    "options": [
      "All matching child records referencing that parent are automatically deleted",
      "MySQL blocks the deletion with an error",
      "The child foreign keys are set to 0",
      "The parent record cannot be deleted until computer restart"
    ],
    "answer": "All matching child records referencing that parent are automatically deleted",
    "explanation": "ON DELETE CASCADE cascades deletions to all referencing child tuples to maintain referential integrity.",
    "explanationBn": "প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে যায়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "Cascades to referencing child rows."
  },
  {
    "id": "q12",
    "question": "Q12: Which constraint ensures that a column cannot store NULL values and only allows distinct values, while only ONE such constraint is permitted per table?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "A table has strictly ONE Primary Key, which combines uniqueness and non-null enforcement.",
    "explanationBn": "টেবিলে কেবল একটিই PRIMARY KEY হতে পারে যা ইউনিক এবং নন-নাল দুটোই প্রয়োগ করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Single primary entity identifier."
  },
  {
    "id": "q13",
    "question": "Q13: Which of the following is a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "UPDATE",
      "INSERT",
      "SELECT"
    ],
    "answer": "ALTER TABLE",
    "explanation": "ALTER TABLE is a DDL command that modifies the structural schema of a database relation.",
    "explanationBn": "ALTER TABLE হলো একটি DDL কমান্ড যা টেবিলের গঠন পরিবর্তন করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Modifies table structure."
  },
  {
    "id": "q14",
    "question": "Q14: What is the maximum value that can be stored in DECIMAL(4, 2)?",
    "options": [
      "99.99",
      "9.999",
      "999.9",
      "9999"
    ],
    "answer": "99.99",
    "explanation": "Precision = 4, Scale = 2. Integer digits = 4 - 2 = 2. Maximum value = 99.99.",
    "explanationBn": "DECIMAL(4,2)-এর ক্ষেত্রে পূর্ণসংখ্যায় ২ অঙ্ক এবং দশমিকে ২ অঙ্ক—সর্বোচ্চ মান ৯৯.৯৯।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "4 - 2 = 2 integer digits and 2 decimal digits."
  },
  {
    "id": "q15",
    "question": "Q15: Which command permanently removes both the schema and records of a relation from the database?",
    "options": [
      "DROP TABLE",
      "DELETE FROM",
      "TRUNCATE TABLE",
      "CLEAR TABLE"
    ],
    "answer": "DROP TABLE",
    "explanation": "DROP TABLE completely eliminates the table schema, constraints, and rows from the catalog.",
    "explanationBn": "DROP TABLE ডেটাবেস থেকে টেবিলের গঠন ও ডেটা সম্পূর্ণ ধ্বংস করে দেয়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Destroys table schema."
  },
  {
    "id": "q16",
    "question": "Q16: Write the clause to add a new column 'AadhaarNo CHAR(12)' after the 'FullName' column in 'Student':",
    "options": [
      "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "ALTER TABLE Student INSERT AadhaarNo CHAR(12) NEXT TO FullName;",
      "MODIFY TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "UPDATE TABLE Student ADD AadhaarNo CHAR(12) BEHIND FullName;"
    ],
    "answer": "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "explanation": "The correct DDL syntax uses ALTER TABLE ... ADD ... AFTER existing_column.",
    "explanationBn": "সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "ADD with AFTER positioning."
  },
  {
    "id": "q17",
    "question": "Q17: What happens when a parent record is deleted in a table with a foreign key defined as 'ON DELETE CASCADE'?",
    "options": [
      "All matching child records referencing that parent are automatically deleted",
      "MySQL blocks the deletion with an error",
      "The child foreign keys are set to 0",
      "The parent record cannot be deleted until computer restart"
    ],
    "answer": "All matching child records referencing that parent are automatically deleted",
    "explanation": "ON DELETE CASCADE cascades deletions to all referencing child tuples to maintain referential integrity.",
    "explanationBn": "প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে যায়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "Cascades to referencing child rows."
  },
  {
    "id": "q18",
    "question": "Q18: Which constraint ensures that a column cannot store NULL values and only allows distinct values, while only ONE such constraint is permitted per table?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "A table has strictly ONE Primary Key, which combines uniqueness and non-null enforcement.",
    "explanationBn": "টেবিলে কেবল একটিই PRIMARY KEY হতে পারে যা ইউনিক এবং নন-নাল দুটোই প্রয়োগ করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Single primary entity identifier."
  },
  {
    "id": "q19",
    "question": "Q19: Which of the following is a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "UPDATE",
      "INSERT",
      "SELECT"
    ],
    "answer": "ALTER TABLE",
    "explanation": "ALTER TABLE is a DDL command that modifies the structural schema of a database relation.",
    "explanationBn": "ALTER TABLE হলো একটি DDL কমান্ড যা টেবিলের গঠন পরিবর্তন করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Modifies table structure."
  },
  {
    "id": "q20",
    "question": "Q20: What is the maximum value that can be stored in DECIMAL(4, 2)?",
    "options": [
      "99.99",
      "9.999",
      "999.9",
      "9999"
    ],
    "answer": "99.99",
    "explanation": "Precision = 4, Scale = 2. Integer digits = 4 - 2 = 2. Maximum value = 99.99.",
    "explanationBn": "DECIMAL(4,2)-এর ক্ষেত্রে পূর্ণসংখ্যায় ২ অঙ্ক এবং দশমিকে ২ অঙ্ক—সর্বোচ্চ মান ৯৯.৯৯।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "4 - 2 = 2 integer digits and 2 decimal digits."
  },
  {
    "id": "q21",
    "question": "Q21: Which command permanently removes both the schema and records of a relation from the database?",
    "options": [
      "DROP TABLE",
      "DELETE FROM",
      "TRUNCATE TABLE",
      "CLEAR TABLE"
    ],
    "answer": "DROP TABLE",
    "explanation": "DROP TABLE completely eliminates the table schema, constraints, and rows from the catalog.",
    "explanationBn": "DROP TABLE ডেটাবেস থেকে টেবিলের গঠন ও ডেটা সম্পূর্ণ ধ্বংস করে দেয়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Destroys table schema."
  },
  {
    "id": "q22",
    "question": "Q22: Write the clause to add a new column 'AadhaarNo CHAR(12)' after the 'FullName' column in 'Student':",
    "options": [
      "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "ALTER TABLE Student INSERT AadhaarNo CHAR(12) NEXT TO FullName;",
      "MODIFY TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "UPDATE TABLE Student ADD AadhaarNo CHAR(12) BEHIND FullName;"
    ],
    "answer": "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "explanation": "The correct DDL syntax uses ALTER TABLE ... ADD ... AFTER existing_column.",
    "explanationBn": "সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "ADD with AFTER positioning."
  },
  {
    "id": "q23",
    "question": "Q23: What happens when a parent record is deleted in a table with a foreign key defined as 'ON DELETE CASCADE'?",
    "options": [
      "All matching child records referencing that parent are automatically deleted",
      "MySQL blocks the deletion with an error",
      "The child foreign keys are set to 0",
      "The parent record cannot be deleted until computer restart"
    ],
    "answer": "All matching child records referencing that parent are automatically deleted",
    "explanation": "ON DELETE CASCADE cascades deletions to all referencing child tuples to maintain referential integrity.",
    "explanationBn": "প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে যায়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "Cascades to referencing child rows."
  },
  {
    "id": "q24",
    "question": "Q24: Which constraint ensures that a column cannot store NULL values and only allows distinct values, while only ONE such constraint is permitted per table?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "A table has strictly ONE Primary Key, which combines uniqueness and non-null enforcement.",
    "explanationBn": "টেবিলে কেবল একটিই PRIMARY KEY হতে পারে যা ইউনিক এবং নন-নাল দুটোই প্রয়োগ করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Single primary entity identifier."
  },
  {
    "id": "q25",
    "question": "Q25: Which of the following is a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "UPDATE",
      "INSERT",
      "SELECT"
    ],
    "answer": "ALTER TABLE",
    "explanation": "ALTER TABLE is a DDL command that modifies the structural schema of a database relation.",
    "explanationBn": "ALTER TABLE হলো একটি DDL কমান্ড যা টেবিলের গঠন পরিবর্তন করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Modifies table structure."
  },
  {
    "id": "q26",
    "question": "Q26: What is the maximum value that can be stored in DECIMAL(4, 2)?",
    "options": [
      "99.99",
      "9.999",
      "999.9",
      "9999"
    ],
    "answer": "99.99",
    "explanation": "Precision = 4, Scale = 2. Integer digits = 4 - 2 = 2. Maximum value = 99.99.",
    "explanationBn": "DECIMAL(4,2)-এর ক্ষেত্রে পূর্ণসংখ্যায় ২ অঙ্ক এবং দশমিকে ২ অঙ্ক—সর্বোচ্চ মান ৯৯.৯৯।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "4 - 2 = 2 integer digits and 2 decimal digits."
  },
  {
    "id": "q27",
    "question": "Q27: Which command permanently removes both the schema and records of a relation from the database?",
    "options": [
      "DROP TABLE",
      "DELETE FROM",
      "TRUNCATE TABLE",
      "CLEAR TABLE"
    ],
    "answer": "DROP TABLE",
    "explanation": "DROP TABLE completely eliminates the table schema, constraints, and rows from the catalog.",
    "explanationBn": "DROP TABLE ডেটাবেস থেকে টেবিলের গঠন ও ডেটা সম্পূর্ণ ধ্বংস করে দেয়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Destroys table schema."
  },
  {
    "id": "q28",
    "question": "Q28: Write the clause to add a new column 'AadhaarNo CHAR(12)' after the 'FullName' column in 'Student':",
    "options": [
      "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "ALTER TABLE Student INSERT AadhaarNo CHAR(12) NEXT TO FullName;",
      "MODIFY TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
      "UPDATE TABLE Student ADD AadhaarNo CHAR(12) BEHIND FullName;"
    ],
    "answer": "ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "explanation": "The correct DDL syntax uses ALTER TABLE ... ADD ... AFTER existing_column.",
    "explanationBn": "সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD AadhaarNo CHAR(12) AFTER FullName;",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "ADD with AFTER positioning."
  },
  {
    "id": "q29",
    "question": "Q29: What happens when a parent record is deleted in a table with a foreign key defined as 'ON DELETE CASCADE'?",
    "options": [
      "All matching child records referencing that parent are automatically deleted",
      "MySQL blocks the deletion with an error",
      "The child foreign keys are set to 0",
      "The parent record cannot be deleted until computer restart"
    ],
    "answer": "All matching child records referencing that parent are automatically deleted",
    "explanation": "ON DELETE CASCADE cascades deletions to all referencing child tuples to maintain referential integrity.",
    "explanationBn": "প্যারেন্ট রো ডিলিট হলে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সমস্ত সম্পর্কিত রো মুছে যায়।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Medium",
    "hint": "Cascades to referencing child rows."
  },
  {
    "id": "q30",
    "question": "Q30: Which constraint ensures that a column cannot store NULL values and only allows distinct values, while only ONE such constraint is permitted per table?",
    "options": [
      "PRIMARY KEY",
      "UNIQUE",
      "NOT NULL",
      "CHECK"
    ],
    "answer": "PRIMARY KEY",
    "explanation": "A table has strictly ONE Primary Key, which combines uniqueness and non-null enforcement.",
    "explanationBn": "টেবিলে কেবল একটিই PRIMARY KEY হতে পারে যা ইউনিক এবং নন-নাল দুটোই প্রয়োগ করে।",
    "topic": "CBSE Class XII IT (802) DDL Assessment",
    "difficulty": "Easy",
    "hint": "Single primary entity identifier."
  }
];

export default questions;
