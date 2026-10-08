const questions = [
  {
    "id": "q1",
    "question": "Q1: Which clause is used in SQL to divide table records into categorical summary groups?",
    "options": [
      "GROUP BY",
      "ORDER BY",
      "SPLIT BY",
      "CATEGORIZE BY"
    ],
    "answer": "GROUP BY",
    "explanation": "The GROUP BY clause groups rows that have the same values in specified columns into summary rows.",
    "explanationBn": "টেবিলের রেকর্ডগুলোকে নির্দিষ্ট ক্যাটাগরি বা গ্রুপে ভাগ করার জন্য GROUP BY ক্লজ ব্যবহৃত হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Group rows by categorical column."
  },
  {
    "id": "q2",
    "question": "Q2: In a query with 'GROUP BY Department', which columns can be safely included in the SELECT projection list?",
    "options": [
      "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
      "Any arbitrary column from the table",
      "Only the primary key",
      "No columns at all"
    ],
    "answer": "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
    "explanation": "Under standard SQL rules, columns in the SELECT list must either be in the GROUP BY clause or be enclosed inside an aggregate function.",
    "explanationBn": "SELECT তালিকায় শুধুমাত্র GROUP BY-তে থাকা কলাম এবং এগ্রিগেট ফাংশন রাখা যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Grouped column or aggregate expressions."
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
    "question": "Q7: Which clause is used in SQL to divide table records into categorical summary groups?",
    "options": [
      "GROUP BY",
      "ORDER BY",
      "SPLIT BY",
      "CATEGORIZE BY"
    ],
    "answer": "GROUP BY",
    "explanation": "The GROUP BY clause groups rows that have the same values in specified columns into summary rows.",
    "explanationBn": "টেবিলের রেকর্ডগুলোকে নির্দিষ্ট ক্যাটাগরি বা গ্রুপে ভাগ করার জন্য GROUP BY ক্লজ ব্যবহৃত হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Group rows by categorical column."
  },
  {
    "id": "q8",
    "question": "Q8: In a query with 'GROUP BY Department', which columns can be safely included in the SELECT projection list?",
    "options": [
      "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
      "Any arbitrary column from the table",
      "Only the primary key",
      "No columns at all"
    ],
    "answer": "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
    "explanation": "Under standard SQL rules, columns in the SELECT list must either be in the GROUP BY clause or be enclosed inside an aggregate function.",
    "explanationBn": "SELECT তালিকায় শুধুমাত্র GROUP BY-তে থাকা কলাম এবং এগ্রিগেট ফাংশন রাখা যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Grouped column or aggregate expressions."
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
    "question": "Q13: Which clause is used in SQL to divide table records into categorical summary groups?",
    "options": [
      "GROUP BY",
      "ORDER BY",
      "SPLIT BY",
      "CATEGORIZE BY"
    ],
    "answer": "GROUP BY",
    "explanation": "The GROUP BY clause groups rows that have the same values in specified columns into summary rows.",
    "explanationBn": "টেবিলের রেকর্ডগুলোকে নির্দিষ্ট ক্যাটাগরি বা গ্রুপে ভাগ করার জন্য GROUP BY ক্লজ ব্যবহৃত হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Group rows by categorical column."
  },
  {
    "id": "q14",
    "question": "Q14: In a query with 'GROUP BY Department', which columns can be safely included in the SELECT projection list?",
    "options": [
      "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
      "Any arbitrary column from the table",
      "Only the primary key",
      "No columns at all"
    ],
    "answer": "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
    "explanation": "Under standard SQL rules, columns in the SELECT list must either be in the GROUP BY clause or be enclosed inside an aggregate function.",
    "explanationBn": "SELECT তালিকায় শুধুমাত্র GROUP BY-তে থাকা কলাম এবং এগ্রিগেট ফাংশন রাখা যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Grouped column or aggregate expressions."
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
    "question": "Q19: Which clause is used in SQL to divide table records into categorical summary groups?",
    "options": [
      "GROUP BY",
      "ORDER BY",
      "SPLIT BY",
      "CATEGORIZE BY"
    ],
    "answer": "GROUP BY",
    "explanation": "The GROUP BY clause groups rows that have the same values in specified columns into summary rows.",
    "explanationBn": "টেবিলের রেকর্ডগুলোকে নির্দিষ্ট ক্যাটাগরি বা গ্রুপে ভাগ করার জন্য GROUP BY ক্লজ ব্যবহৃত হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Group rows by categorical column."
  },
  {
    "id": "q20",
    "question": "Q20: In a query with 'GROUP BY Department', which columns can be safely included in the SELECT projection list?",
    "options": [
      "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
      "Any arbitrary column from the table",
      "Only the primary key",
      "No columns at all"
    ],
    "answer": "The grouped column (Department) and aggregate functions (e.g. SUM, AVG, COUNT)",
    "explanation": "Under standard SQL rules, columns in the SELECT list must either be in the GROUP BY clause or be enclosed inside an aggregate function.",
    "explanationBn": "SELECT তালিকায় শুধুমাত্র GROUP BY-তে থাকা কলাম এবং এগ্রিগেট ফাংশন রাখা যায়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Grouped column or aggregate expressions."
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
    "question": "Q25: Which clause is used in SQL to divide table records into categorical summary groups?",
    "options": [
      "GROUP BY",
      "ORDER BY",
      "SPLIT BY",
      "CATEGORIZE BY"
    ],
    "answer": "GROUP BY",
    "explanation": "The GROUP BY clause groups rows that have the same values in specified columns into summary rows.",
    "explanationBn": "টেবিলের রেকর্ডগুলোকে নির্দিষ্ট ক্যাটাগরি বা গ্রুপে ভাগ করার জন্য GROUP BY ক্লজ ব্যবহৃত হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Group rows by categorical column."
  }
];

export default questions;
