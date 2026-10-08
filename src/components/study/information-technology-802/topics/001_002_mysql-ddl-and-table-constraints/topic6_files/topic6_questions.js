const questions = [
  {
    "id": "q1",
    "question": "Q1: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q2",
    "question": "Q2: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q3",
    "question": "Q3: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q4",
    "question": "Q4: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q5",
    "question": "Q5: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q6",
    "question": "Q6: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q7",
    "question": "Q7: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q8",
    "question": "Q8: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q9",
    "question": "Q9: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q10",
    "question": "Q10: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q11",
    "question": "Q11: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q12",
    "question": "Q12: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q13",
    "question": "Q13: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q14",
    "question": "Q14: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q15",
    "question": "Q15: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q16",
    "question": "Q16: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q17",
    "question": "Q17: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q18",
    "question": "Q18: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q19",
    "question": "Q19: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q20",
    "question": "Q20: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q21",
    "question": "Q21: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q22",
    "question": "Q22: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q23",
    "question": "Q23: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  },
  {
    "id": "q24",
    "question": "Q24: What value is assigned to existing table rows when a new column is added using ALTER TABLE without a DEFAULT clause?",
    "options": [
      "NULL",
      "0",
      "Blank space ('')",
      "Error 1048"
    ],
    "answer": "NULL",
    "explanation": "When a new column without a DEFAULT value is added, MySQL populates the new column in all existing rows with NULL.",
    "explanationBn": "DEFAULT মান ছাড়া নতুন কলাম যোগ করা হলে বিদ্যমান সমস্ত রো-তে স্বয়ংক্রিয়ভাবে NULL বসে।",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "SQL marker for unassigned values."
  },
  {
    "id": "q25",
    "question": "Q25: Which SQL DDL command is used to add a new column 'BloodGroup CHAR(2)' to an existing table 'Student'?",
    "options": [
      "ALTER TABLE Student ADD BloodGroup CHAR(2);",
      "MODIFY TABLE Student ADD BloodGroup CHAR(2);",
      "UPDATE TABLE Student INSERT BloodGroup CHAR(2);",
      "CHANGE TABLE Student ADD COLUMN BloodGroup CHAR(2);"
    ],
    "answer": "ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "explanation": "The correct ANSI/MySQL syntax to add an attribute is: ALTER TABLE table_name ADD column_name datatype [constraints];",
    "explanationBn": "বিদ্যমান টেবিলে নতুন কলাম যুক্ত করার সঠিক সিনট্যাক্স হলো: ALTER TABLE Student ADD BloodGroup CHAR(2);",
    "topic": "ALTER TABLE ADD Column",
    "difficulty": "Easy",
    "hint": "ALTER TABLE followed by ADD clause."
  }
];

export default questions;
