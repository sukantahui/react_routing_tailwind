const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the primary difference between a Single-Row Function and a Multi-Row (Aggregate) Function in SQL?",
    "options": [
      "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
      "Single-row functions only work on numbers, whereas aggregate functions work on strings",
      "Aggregate functions cannot be used in SELECT statements",
      "There is no difference"
    ],
    "answer": "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
    "explanation": "Single-row functions (like LENGTH, ROUND) produce one output per tuple. Multi-row functions (like SUM, AVG, COUNT) condense a group of rows into one summary scalar value.",
    "explanationBn": "সিঙ্গেল-রো ফাংশন প্রতিটি রো-এর জন্য একটি করে ফলাফল দেয়; এগ্রিগেট ফাংশন একাধিক রো নিয়ে কাজ করে একটি সামগ্রিক সারসংক্ষেপ মান ফেরত দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Row-by-row vs summary scalar output."
  },
  {
    "id": "q2",
    "question": "Q2: Which of the following is an example of an Aggregate (Multi-Row) Function in MySQL?",
    "options": [
      "SUM()",
      "LOWER()",
      "ROUND()",
      "SUBSTR()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() is an aggregate function that computes the total sum across multiple row tuples.",
    "explanationBn": "SUM() হলো একটি এগ্রিগেট ফাংশন যা একাধিক রো-এর মানের সমষ্টি বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Mathematical total function."
  },
  {
    "id": "q3",
    "question": "Q3: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
    "options": [
      "SUM()",
      "TOTAL()",
      "ADD()",
      "COUNT()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() adds all non-null numeric values in the specified column.",
    "explanationBn": "SUM() কলামের সমস্ত সংখ্যার যোগফল বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Summation function."
  },
  {
    "id": "q4",
    "question": "Q4: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
    "options": [
      "3",
      "10",
      "1",
      "NULL"
    ],
    "answer": "3",
    "explanation": "COUNT(DISTINCT column) counts the number of unique, non-null values in that column.",
    "explanationBn": "COUNT(DISTINCT Stream) ডুপ্লিকেট বাদ দিয়ে ৩টি অনন্য স্ট্রিম গণনা করবে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Counts unique values."
  },
  {
    "id": "q5",
    "question": "Q5: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
    "options": [
      "ORDER BY",
      "WHERE",
      "FROM",
      "GROUP BY"
    ],
    "answer": "ORDER BY",
    "explanation": "ORDER BY is the final operation that sorts the projected output rows.",
    "explanationBn": "SQL কোয়েরিতে সবার শেষে ORDER BY এক্সিকিউট হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Final sorting step."
  },
  {
    "id": "q6",
    "question": "Q6: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
    "options": [
      "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
      "Yes, aliases can be used anywhere in the query",
      "Yes, but only for numeric columns",
      "Only in MySQL 8.0"
    ],
    "answer": "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
    "explanation": "WHERE executes before SELECT, so column aliases created in SELECT are not yet available when WHERE runs.",
    "explanationBn": "না, কারণ WHERE ক্লজ SELECT-এর আগেই এক্সিকিউট হয়ে যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Execution order rule."
  },
  {
    "id": "q7",
    "question": "Q7: What is the primary difference between a Single-Row Function and a Multi-Row (Aggregate) Function in SQL?",
    "options": [
      "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
      "Single-row functions only work on numbers, whereas aggregate functions work on strings",
      "Aggregate functions cannot be used in SELECT statements",
      "There is no difference"
    ],
    "answer": "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
    "explanation": "Single-row functions (like LENGTH, ROUND) produce one output per tuple. Multi-row functions (like SUM, AVG, COUNT) condense a group of rows into one summary scalar value.",
    "explanationBn": "সিঙ্গেল-রো ফাংশন প্রতিটি রো-এর জন্য একটি করে ফলাফল দেয়; এগ্রিগেট ফাংশন একাধিক রো নিয়ে কাজ করে একটি সামগ্রিক সারসংক্ষেপ মান ফেরত দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Row-by-row vs summary scalar output."
  },
  {
    "id": "q8",
    "question": "Q8: Which of the following is an example of an Aggregate (Multi-Row) Function in MySQL?",
    "options": [
      "SUM()",
      "LOWER()",
      "ROUND()",
      "SUBSTR()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() is an aggregate function that computes the total sum across multiple row tuples.",
    "explanationBn": "SUM() হলো একটি এগ্রিগেট ফাংশন যা একাধিক রো-এর মানের সমষ্টি বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Mathematical total function."
  },
  {
    "id": "q9",
    "question": "Q9: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
    "options": [
      "SUM()",
      "TOTAL()",
      "ADD()",
      "COUNT()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() adds all non-null numeric values in the specified column.",
    "explanationBn": "SUM() কলামের সমস্ত সংখ্যার যোগফল বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Summation function."
  },
  {
    "id": "q10",
    "question": "Q10: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
    "options": [
      "3",
      "10",
      "1",
      "NULL"
    ],
    "answer": "3",
    "explanation": "COUNT(DISTINCT column) counts the number of unique, non-null values in that column.",
    "explanationBn": "COUNT(DISTINCT Stream) ডুপ্লিকেট বাদ দিয়ে ৩টি অনন্য স্ট্রিম গণনা করবে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Counts unique values."
  },
  {
    "id": "q11",
    "question": "Q11: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
    "options": [
      "ORDER BY",
      "WHERE",
      "FROM",
      "GROUP BY"
    ],
    "answer": "ORDER BY",
    "explanation": "ORDER BY is the final operation that sorts the projected output rows.",
    "explanationBn": "SQL কোয়েরিতে সবার শেষে ORDER BY এক্সিকিউট হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Final sorting step."
  },
  {
    "id": "q12",
    "question": "Q12: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
    "options": [
      "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
      "Yes, aliases can be used anywhere in the query",
      "Yes, but only for numeric columns",
      "Only in MySQL 8.0"
    ],
    "answer": "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
    "explanation": "WHERE executes before SELECT, so column aliases created in SELECT are not yet available when WHERE runs.",
    "explanationBn": "না, কারণ WHERE ক্লজ SELECT-এর আগেই এক্সিকিউট হয়ে যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Execution order rule."
  },
  {
    "id": "q13",
    "question": "Q13: What is the primary difference between a Single-Row Function and a Multi-Row (Aggregate) Function in SQL?",
    "options": [
      "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
      "Single-row functions only work on numbers, whereas aggregate functions work on strings",
      "Aggregate functions cannot be used in SELECT statements",
      "There is no difference"
    ],
    "answer": "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
    "explanation": "Single-row functions (like LENGTH, ROUND) produce one output per tuple. Multi-row functions (like SUM, AVG, COUNT) condense a group of rows into one summary scalar value.",
    "explanationBn": "সিঙ্গেল-রো ফাংশন প্রতিটি রো-এর জন্য একটি করে ফলাফল দেয়; এগ্রিগেট ফাংশন একাধিক রো নিয়ে কাজ করে একটি সামগ্রিক সারসংক্ষেপ মান ফেরত দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Row-by-row vs summary scalar output."
  },
  {
    "id": "q14",
    "question": "Q14: Which of the following is an example of an Aggregate (Multi-Row) Function in MySQL?",
    "options": [
      "SUM()",
      "LOWER()",
      "ROUND()",
      "SUBSTR()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() is an aggregate function that computes the total sum across multiple row tuples.",
    "explanationBn": "SUM() হলো একটি এগ্রিগেট ফাংশন যা একাধিক রো-এর মানের সমষ্টি বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Mathematical total function."
  },
  {
    "id": "q15",
    "question": "Q15: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
    "options": [
      "SUM()",
      "TOTAL()",
      "ADD()",
      "COUNT()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() adds all non-null numeric values in the specified column.",
    "explanationBn": "SUM() কলামের সমস্ত সংখ্যার যোগফল বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Summation function."
  },
  {
    "id": "q16",
    "question": "Q16: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
    "options": [
      "3",
      "10",
      "1",
      "NULL"
    ],
    "answer": "3",
    "explanation": "COUNT(DISTINCT column) counts the number of unique, non-null values in that column.",
    "explanationBn": "COUNT(DISTINCT Stream) ডুপ্লিকেট বাদ দিয়ে ৩টি অনন্য স্ট্রিম গণনা করবে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Counts unique values."
  },
  {
    "id": "q17",
    "question": "Q17: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
    "options": [
      "ORDER BY",
      "WHERE",
      "FROM",
      "GROUP BY"
    ],
    "answer": "ORDER BY",
    "explanation": "ORDER BY is the final operation that sorts the projected output rows.",
    "explanationBn": "SQL কোয়েরিতে সবার শেষে ORDER BY এক্সিকিউট হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Final sorting step."
  },
  {
    "id": "q18",
    "question": "Q18: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
    "options": [
      "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
      "Yes, aliases can be used anywhere in the query",
      "Yes, but only for numeric columns",
      "Only in MySQL 8.0"
    ],
    "answer": "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
    "explanation": "WHERE executes before SELECT, so column aliases created in SELECT are not yet available when WHERE runs.",
    "explanationBn": "না, কারণ WHERE ক্লজ SELECT-এর আগেই এক্সিকিউট হয়ে যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Execution order rule."
  },
  {
    "id": "q19",
    "question": "Q19: What is the primary difference between a Single-Row Function and a Multi-Row (Aggregate) Function in SQL?",
    "options": [
      "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
      "Single-row functions only work on numbers, whereas aggregate functions work on strings",
      "Aggregate functions cannot be used in SELECT statements",
      "There is no difference"
    ],
    "answer": "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
    "explanation": "Single-row functions (like LENGTH, ROUND) produce one output per tuple. Multi-row functions (like SUM, AVG, COUNT) condense a group of rows into one summary scalar value.",
    "explanationBn": "সিঙ্গেল-রো ফাংশন প্রতিটি রো-এর জন্য একটি করে ফলাফল দেয়; এগ্রিগেট ফাংশন একাধিক রো নিয়ে কাজ করে একটি সামগ্রিক সারসংক্ষেপ মান ফেরত দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Row-by-row vs summary scalar output."
  },
  {
    "id": "q20",
    "question": "Q20: Which of the following is an example of an Aggregate (Multi-Row) Function in MySQL?",
    "options": [
      "SUM()",
      "LOWER()",
      "ROUND()",
      "SUBSTR()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() is an aggregate function that computes the total sum across multiple row tuples.",
    "explanationBn": "SUM() হলো একটি এগ্রিগেট ফাংশন যা একাধিক রো-এর মানের সমষ্টি বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Mathematical total function."
  },
  {
    "id": "q21",
    "question": "Q21: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
    "options": [
      "SUM()",
      "TOTAL()",
      "ADD()",
      "COUNT()"
    ],
    "answer": "SUM()",
    "explanation": "SUM() adds all non-null numeric values in the specified column.",
    "explanationBn": "SUM() কলামের সমস্ত সংখ্যার যোগফল বের করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Summation function."
  },
  {
    "id": "q22",
    "question": "Q22: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
    "options": [
      "3",
      "10",
      "1",
      "NULL"
    ],
    "answer": "3",
    "explanation": "COUNT(DISTINCT column) counts the number of unique, non-null values in that column.",
    "explanationBn": "COUNT(DISTINCT Stream) ডুপ্লিকেট বাদ দিয়ে ৩টি অনন্য স্ট্রিম গণনা করবে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Counts unique values."
  },
  {
    "id": "q23",
    "question": "Q23: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
    "options": [
      "ORDER BY",
      "WHERE",
      "FROM",
      "GROUP BY"
    ],
    "answer": "ORDER BY",
    "explanation": "ORDER BY is the final operation that sorts the projected output rows.",
    "explanationBn": "SQL কোয়েরিতে সবার শেষে ORDER BY এক্সিকিউট হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Final sorting step."
  },
  {
    "id": "q24",
    "question": "Q24: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
    "options": [
      "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
      "Yes, aliases can be used anywhere in the query",
      "Yes, but only for numeric columns",
      "Only in MySQL 8.0"
    ],
    "answer": "No, because the WHERE clause is evaluated before the SELECT projection in SQL execution order",
    "explanation": "WHERE executes before SELECT, so column aliases created in SELECT are not yet available when WHERE runs.",
    "explanationBn": "না, কারণ WHERE ক্লজ SELECT-এর আগেই এক্সিকিউট হয়ে যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Execution order rule."
  },
  {
    "id": "q25",
    "question": "Q25: What is the primary difference between a Single-Row Function and a Multi-Row (Aggregate) Function in SQL?",
    "options": [
      "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
      "Single-row functions only work on numbers, whereas aggregate functions work on strings",
      "Aggregate functions cannot be used in SELECT statements",
      "There is no difference"
    ],
    "answer": "Single-row functions operate on one row and return one value per row; Aggregate functions operate on multiple rows and return a single summary value",
    "explanation": "Single-row functions (like LENGTH, ROUND) produce one output per tuple. Multi-row functions (like SUM, AVG, COUNT) condense a group of rows into one summary scalar value.",
    "explanationBn": "সিঙ্গেল-রো ফাংশন প্রতিটি রো-এর জন্য একটি করে ফলাফল দেয়; এগ্রিগেট ফাংশন একাধিক রো নিয়ে কাজ করে একটি সামগ্রিক সারসংক্ষেপ মান ফেরত দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Row-by-row vs summary scalar output."
  }
];

export default questions;
