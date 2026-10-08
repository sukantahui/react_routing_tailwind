const questions = [
  {
    "id": "q1",
    "question": "Q1: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q2",
    "question": "Q2: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q3",
    "question": "Q3: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q4",
    "question": "Q4: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q5",
    "question": "Q5: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q6",
    "question": "Q6: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q7",
    "question": "Q7: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q8",
    "question": "Q8: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q9",
    "question": "Q9: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q10",
    "question": "Q10: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q11",
    "question": "Q11: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q12",
    "question": "Q12: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q13",
    "question": "Q13: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q14",
    "question": "Q14: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q15",
    "question": "Q15: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q16",
    "question": "Q16: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q17",
    "question": "Q17: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q18",
    "question": "Q18: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q19",
    "question": "Q19: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q20",
    "question": "Q20: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q21",
    "question": "Q21: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q22",
    "question": "Q22: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  },
  {
    "id": "q23",
    "question": "Q23: Which ALTER TABLE clause is used to rename a column AND optionally change its data type?",
    "options": [
      "CHANGE",
      "MODIFY",
      "RENAME TABLE",
      "ALTER COLUMN"
    ],
    "answer": "CHANGE",
    "explanation": "ALTER TABLE table CHANGE old_name new_name new_datatype renames the column and allows updating its datatype.",
    "explanationBn": "কলামের নাম পরিবর্তন এবং প্রয়োজনে ডেটা টাইপ পরিবর্তন করতে CHANGE ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Medium",
    "hint": "Takes both old and new column names."
  },
  {
    "id": "q24",
    "question": "Q24: Which SQL command permanently removes an attribute 'Remarks' from the 'Student' table?",
    "options": [
      "ALTER TABLE Student DROP COLUMN Remarks;",
      "DELETE Remarks FROM Student;",
      "REMOVE COLUMN Remarks FROM Student;",
      "DROP Remarks FROM Student;"
    ],
    "answer": "ALTER TABLE Student DROP COLUMN Remarks;",
    "explanation": "ALTER TABLE table DROP COLUMN col_name removes the column and its data permanently from the table schema.",
    "explanationBn": "টেবিল থেকে কলাম সম্পূর্ণ মুছে ফেলতে ALTER TABLE Student DROP COLUMN Remarks; ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "ALTER TABLE with DROP clause."
  },
  {
    "id": "q25",
    "question": "Q25: Which ALTER TABLE clause is used to change the data type or width of a column WITHOUT changing its name?",
    "options": [
      "MODIFY",
      "CHANGE",
      "UPDATE",
      "REPLACE"
    ],
    "answer": "MODIFY",
    "explanation": "ALTER TABLE table MODIFY col_name new_datatype is used to modify the definition, width, or constraints of a column without renaming it.",
    "explanationBn": "কলামের নাম পরিবর্তন না করে শুধু ডেটা টাইপ বা সাইজ পরিবর্তন করতে MODIFY ক্লজ ব্যবহৃত হয়।",
    "topic": "ALTER TABLE MODIFY, CHANGE & DROP",
    "difficulty": "Easy",
    "hint": "Modifies type in place."
  }
];

export default questions;
