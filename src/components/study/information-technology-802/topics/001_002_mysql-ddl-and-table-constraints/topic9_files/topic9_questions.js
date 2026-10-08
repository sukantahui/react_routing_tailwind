const questions = [
  {
    "id": "q1",
    "question": "Q1: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q2",
    "question": "Q2: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q3",
    "question": "Q3: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q4",
    "question": "Q4: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q5",
    "question": "Q5: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q6",
    "question": "Q6: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q7",
    "question": "Q7: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q8",
    "question": "Q8: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q9",
    "question": "Q9: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q10",
    "question": "Q10: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q11",
    "question": "Q11: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q12",
    "question": "Q12: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q13",
    "question": "Q13: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q14",
    "question": "Q14: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q15",
    "question": "Q15: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q16",
    "question": "Q16: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q17",
    "question": "Q17: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q18",
    "question": "Q18: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q19",
    "question": "Q19: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q20",
    "question": "Q20: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q21",
    "question": "Q21: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q22",
    "question": "Q22: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q23",
    "question": "Q23: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  },
  {
    "id": "q24",
    "question": "Q24: In the output of DESCRIBE table_name, what does 'PRI' in the 'Key' column indicate?",
    "options": [
      "The column is the Primary Key (or part of a composite primary key)",
      "The column is Private",
      "The column has Priority access",
      "The column stores Principal amounts"
    ],
    "answer": "The column is the Primary Key (or part of a composite primary key)",
    "explanation": "'PRI' stands for Primary Key in the MySQL DESCRIBE output metadata table.",
    "explanationBn": "DESCRIBE এর ফলাফলে 'PRI' মানে হলো উক্ত কলামটি টেবিলের Primary Key।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "Short for Primary Key."
  },
  {
    "id": "q25",
    "question": "Q25: Which SQL command displays the structural schema (columns, types, nullability, keys, defaults) of a table in MySQL?",
    "options": [
      "DESCRIBE table_name; (or DESC table_name;)",
      "SHOW TABLE STRUCTURE table_name;",
      "VIEW table_name;",
      "EXPLAIN DATA table_name;"
    ],
    "answer": "DESCRIBE table_name; (or DESC table_name;)",
    "explanation": "DESCRIBE (or DESC) outputs the tabular description of table columns, types, nullability, keys, and default values.",
    "explanationBn": "DESCRIBE table_name; বা DESC table_name; কমান্ডটি টেবিলের কলাম, ডেটা টাইপ, প্রাইমারি কি ইত্যাদি স্ট্রাকচার প্রদর্শন করে।",
    "topic": "Viewing Database Schema",
    "difficulty": "Easy",
    "hint": "DESCRIBE or DESC."
  }
];

export default questions;
