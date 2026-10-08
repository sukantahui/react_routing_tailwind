const questions = [
  {
    "id": "q1",
    "question": "Q1: When combining WHERE and GROUP BY in a query, which clause is executed FIRST by MySQL?",
    "options": [
      "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
      "The GROUP BY clause executes first, then WHERE filters the groups",
      "Both execute at the same exact time",
      "It depends on the order written in the query"
    ],
    "answer": "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
    "explanation": "In SQL execution order: FROM -> WHERE (row filter) -> GROUP BY (group formation) -> HAVING -> SELECT -> ORDER BY.",
    "explanationBn": "SQL এক্সিকিউশনে WHERE ক্লজ প্রথমে প্রতিটি রো ফিল্টার করে, তারপর অবশিষ্ট রো নিয়ে GROUP BY গ্রুপ তৈরি করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "WHERE filters rows before grouping."
  },
  {
    "id": "q2",
    "question": "Q2: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
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
    "id": "q3",
    "question": "Q3: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
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
    "id": "q4",
    "question": "Q4: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
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
    "id": "q5",
    "question": "Q5: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
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
    "id": "q6",
    "question": "Q6: When combining WHERE and GROUP BY in a query, which clause is executed FIRST by MySQL?",
    "options": [
      "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
      "The GROUP BY clause executes first, then WHERE filters the groups",
      "Both execute at the same exact time",
      "It depends on the order written in the query"
    ],
    "answer": "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
    "explanation": "In SQL execution order: FROM -> WHERE (row filter) -> GROUP BY (group formation) -> HAVING -> SELECT -> ORDER BY.",
    "explanationBn": "SQL এক্সিকিউশনে WHERE ক্লজ প্রথমে প্রতিটি রো ফিল্টার করে, তারপর অবশিষ্ট রো নিয়ে GROUP BY গ্রুপ তৈরি করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "WHERE filters rows before grouping."
  },
  {
    "id": "q7",
    "question": "Q7: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
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
    "id": "q8",
    "question": "Q8: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
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
    "id": "q9",
    "question": "Q9: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
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
    "id": "q10",
    "question": "Q10: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
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
    "id": "q11",
    "question": "Q11: When combining WHERE and GROUP BY in a query, which clause is executed FIRST by MySQL?",
    "options": [
      "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
      "The GROUP BY clause executes first, then WHERE filters the groups",
      "Both execute at the same exact time",
      "It depends on the order written in the query"
    ],
    "answer": "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
    "explanation": "In SQL execution order: FROM -> WHERE (row filter) -> GROUP BY (group formation) -> HAVING -> SELECT -> ORDER BY.",
    "explanationBn": "SQL এক্সিকিউশনে WHERE ক্লজ প্রথমে প্রতিটি রো ফিল্টার করে, তারপর অবশিষ্ট রো নিয়ে GROUP BY গ্রুপ তৈরি করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "WHERE filters rows before grouping."
  },
  {
    "id": "q12",
    "question": "Q12: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
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
    "id": "q13",
    "question": "Q13: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
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
    "id": "q14",
    "question": "Q14: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
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
    "id": "q15",
    "question": "Q15: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
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
    "id": "q16",
    "question": "Q16: When combining WHERE and GROUP BY in a query, which clause is executed FIRST by MySQL?",
    "options": [
      "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
      "The GROUP BY clause executes first, then WHERE filters the groups",
      "Both execute at the same exact time",
      "It depends on the order written in the query"
    ],
    "answer": "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
    "explanation": "In SQL execution order: FROM -> WHERE (row filter) -> GROUP BY (group formation) -> HAVING -> SELECT -> ORDER BY.",
    "explanationBn": "SQL এক্সিকিউশনে WHERE ক্লজ প্রথমে প্রতিটি রো ফিল্টার করে, তারপর অবশিষ্ট রো নিয়ে GROUP BY গ্রুপ তৈরি করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "WHERE filters rows before grouping."
  },
  {
    "id": "q17",
    "question": "Q17: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
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
    "id": "q18",
    "question": "Q18: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
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
    "id": "q19",
    "question": "Q19: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
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
    "id": "q20",
    "question": "Q20: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
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
    "id": "q21",
    "question": "Q21: When combining WHERE and GROUP BY in a query, which clause is executed FIRST by MySQL?",
    "options": [
      "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
      "The GROUP BY clause executes first, then WHERE filters the groups",
      "Both execute at the same exact time",
      "It depends on the order written in the query"
    ],
    "answer": "The WHERE clause filters rows BEFORE the GROUP BY clause forms groups",
    "explanation": "In SQL execution order: FROM -> WHERE (row filter) -> GROUP BY (group formation) -> HAVING -> SELECT -> ORDER BY.",
    "explanationBn": "SQL এক্সিকিউশনে WHERE ক্লজ প্রথমে প্রতিটি রো ফিল্টার করে, তারপর অবশিষ্ট রো নিয়ে GROUP BY গ্রুপ তৈরি করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "WHERE filters rows before grouping."
  },
  {
    "id": "q22",
    "question": "Q22: Which SQL aggregate function calculates the total sum of all values in a numeric column?",
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
    "id": "q23",
    "question": "Q23: What will 'SELECT COUNT(DISTINCT Stream) FROM Student;' return if table has 10 students across 3 unique streams?",
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
    "id": "q24",
    "question": "Q24: Which of the following clauses is executed LAST in a complete SQL SELECT statement?",
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
    "id": "q25",
    "question": "Q25: Can you use an alias created in the SELECT clause inside the WHERE clause of the same query?",
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
  }
];

export default questions;
