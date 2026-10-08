const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the key difference between COUNT(*) and COUNT(column_name)?",
    "options": [
      "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
      "COUNT(*) only counts primary keys",
      "COUNT(column_name) counts duplicates as 1",
      "There is no difference"
    ],
    "answer": "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
    "explanation": "COUNT(*) returns the total cardinality (number of row tuples). COUNT(column) ignores rows where that column is NULL.",
    "explanationBn": "COUNT(*) টেবিলের সব রো (NULL সহ) গণনা করে; COUNT(column_name) শুধুমাত্র যেগুলোতে মান আছে (নন-নাল) সেগুলো গণনা করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Total tuples vs non-null values."
  },
  {
    "id": "q2",
    "question": "Q2: If a table has 5 rows and a column 'Comm' has values {500, NULL, 800, NULL, 200}, what will 'SELECT COUNT(*), COUNT(Comm) FROM Emp;' return?",
    "options": [
      "5 and 3",
      "5 and 5",
      "3 and 3",
      "5 and 0"
    ],
    "answer": "5 and 3",
    "explanation": "Total rows = 5 (COUNT(*)=5). Non-null Commission values = 3 (COUNT(Comm)=3).",
    "explanationBn": "মোট রো ৫টি তাই COUNT(*)=5; এবং ৩টি রো-তে কমিশন আছে তাই COUNT(Comm)=3।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "5 total, 3 non-null."
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
    "question": "Q7: What is the key difference between COUNT(*) and COUNT(column_name)?",
    "options": [
      "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
      "COUNT(*) only counts primary keys",
      "COUNT(column_name) counts duplicates as 1",
      "There is no difference"
    ],
    "answer": "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
    "explanation": "COUNT(*) returns the total cardinality (number of row tuples). COUNT(column) ignores rows where that column is NULL.",
    "explanationBn": "COUNT(*) টেবিলের সব রো (NULL সহ) গণনা করে; COUNT(column_name) শুধুমাত্র যেগুলোতে মান আছে (নন-নাল) সেগুলো গণনা করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Total tuples vs non-null values."
  },
  {
    "id": "q8",
    "question": "Q8: If a table has 5 rows and a column 'Comm' has values {500, NULL, 800, NULL, 200}, what will 'SELECT COUNT(*), COUNT(Comm) FROM Emp;' return?",
    "options": [
      "5 and 3",
      "5 and 5",
      "3 and 3",
      "5 and 0"
    ],
    "answer": "5 and 3",
    "explanation": "Total rows = 5 (COUNT(*)=5). Non-null Commission values = 3 (COUNT(Comm)=3).",
    "explanationBn": "মোট রো ৫টি তাই COUNT(*)=5; এবং ৩টি রো-তে কমিশন আছে তাই COUNT(Comm)=3।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "5 total, 3 non-null."
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
    "question": "Q13: What is the key difference between COUNT(*) and COUNT(column_name)?",
    "options": [
      "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
      "COUNT(*) only counts primary keys",
      "COUNT(column_name) counts duplicates as 1",
      "There is no difference"
    ],
    "answer": "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
    "explanation": "COUNT(*) returns the total cardinality (number of row tuples). COUNT(column) ignores rows where that column is NULL.",
    "explanationBn": "COUNT(*) টেবিলের সব রো (NULL সহ) গণনা করে; COUNT(column_name) শুধুমাত্র যেগুলোতে মান আছে (নন-নাল) সেগুলো গণনা করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Total tuples vs non-null values."
  },
  {
    "id": "q14",
    "question": "Q14: If a table has 5 rows and a column 'Comm' has values {500, NULL, 800, NULL, 200}, what will 'SELECT COUNT(*), COUNT(Comm) FROM Emp;' return?",
    "options": [
      "5 and 3",
      "5 and 5",
      "3 and 3",
      "5 and 0"
    ],
    "answer": "5 and 3",
    "explanation": "Total rows = 5 (COUNT(*)=5). Non-null Commission values = 3 (COUNT(Comm)=3).",
    "explanationBn": "মোট রো ৫টি তাই COUNT(*)=5; এবং ৩টি রো-তে কমিশন আছে তাই COUNT(Comm)=3।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "5 total, 3 non-null."
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
    "question": "Q19: What is the key difference between COUNT(*) and COUNT(column_name)?",
    "options": [
      "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
      "COUNT(*) only counts primary keys",
      "COUNT(column_name) counts duplicates as 1",
      "There is no difference"
    ],
    "answer": "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
    "explanation": "COUNT(*) returns the total cardinality (number of row tuples). COUNT(column) ignores rows where that column is NULL.",
    "explanationBn": "COUNT(*) টেবিলের সব রো (NULL সহ) গণনা করে; COUNT(column_name) শুধুমাত্র যেগুলোতে মান আছে (নন-নাল) সেগুলো গণনা করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Total tuples vs non-null values."
  },
  {
    "id": "q20",
    "question": "Q20: If a table has 5 rows and a column 'Comm' has values {500, NULL, 800, NULL, 200}, what will 'SELECT COUNT(*), COUNT(Comm) FROM Emp;' return?",
    "options": [
      "5 and 3",
      "5 and 5",
      "3 and 3",
      "5 and 0"
    ],
    "answer": "5 and 3",
    "explanation": "Total rows = 5 (COUNT(*)=5). Non-null Commission values = 3 (COUNT(Comm)=3).",
    "explanationBn": "মোট রো ৫টি তাই COUNT(*)=5; এবং ৩টি রো-তে কমিশন আছে তাই COUNT(Comm)=3।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "5 total, 3 non-null."
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
    "question": "Q25: What is the key difference between COUNT(*) and COUNT(column_name)?",
    "options": [
      "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
      "COUNT(*) only counts primary keys",
      "COUNT(column_name) counts duplicates as 1",
      "There is no difference"
    ],
    "answer": "COUNT(*) counts all rows including rows with NULLs; COUNT(column_name) counts only non-null values",
    "explanation": "COUNT(*) returns the total cardinality (number of row tuples). COUNT(column) ignores rows where that column is NULL.",
    "explanationBn": "COUNT(*) টেবিলের সব রো (NULL সহ) গণনা করে; COUNT(column_name) শুধুমাত্র যেগুলোতে মান আছে (নন-নাল) সেগুলো গণনা করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Total tuples vs non-null values."
  }
];

export default questions;
