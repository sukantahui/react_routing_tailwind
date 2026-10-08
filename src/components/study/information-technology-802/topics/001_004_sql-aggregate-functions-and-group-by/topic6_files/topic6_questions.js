const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the primary difference between the WHERE clause and the HAVING clause?",
    "options": [
      "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
      "WHERE works on groups, HAVING works on rows",
      "WHERE can contain aggregate functions like SUM(Salary), HAVING cannot",
      "They are completely interchangeable"
    ],
    "answer": "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
    "explanation": "WHERE cannot filter on aggregate results (e.g. WHERE SUM(Salary) > 50000 is ILLEGAL). You must use HAVING for aggregate conditions.",
    "explanationBn": "WHERE গ্রুপিংয়ের আগে রো ফিল্টার করে; HAVING গ্রুপিং ও এগ্রিগেশনের পরে গ্রুপ ফিল্টার করে (এগ্রিগেট ফাংশন HAVING-এ বসে)।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "WHERE for rows, HAVING for aggregate groups."
  },
  {
    "id": "q2",
    "question": "Q2: Why does the query 'SELECT Department, AVG(Salary) FROM Emp WHERE AVG(Salary) > 50000 GROUP BY Department;' throw an error?",
    "options": [
      "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
      "Because AVG() cannot be calculated on Salary",
      "Because GROUP BY must come before WHERE",
      "Because Department is a string"
    ],
    "answer": "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
    "explanation": "An aggregate function cannot be evaluated in the WHERE clause because WHERE operates before groups exist. Use HAVING instead.",
    "explanationBn": "WHERE ক্লজের সময় গ্রুপ গঠিত হয় না, তাই সেখানে AVG() বসানো যায় না। এর বদলে HAVING ব্যবহার করতে হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Aggregate in WHERE is invalid."
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
    "question": "Q7: What is the primary difference between the WHERE clause and the HAVING clause?",
    "options": [
      "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
      "WHERE works on groups, HAVING works on rows",
      "WHERE can contain aggregate functions like SUM(Salary), HAVING cannot",
      "They are completely interchangeable"
    ],
    "answer": "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
    "explanation": "WHERE cannot filter on aggregate results (e.g. WHERE SUM(Salary) > 50000 is ILLEGAL). You must use HAVING for aggregate conditions.",
    "explanationBn": "WHERE গ্রুপিংয়ের আগে রো ফিল্টার করে; HAVING গ্রুপিং ও এগ্রিগেশনের পরে গ্রুপ ফিল্টার করে (এগ্রিগেট ফাংশন HAVING-এ বসে)।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "WHERE for rows, HAVING for aggregate groups."
  },
  {
    "id": "q8",
    "question": "Q8: Why does the query 'SELECT Department, AVG(Salary) FROM Emp WHERE AVG(Salary) > 50000 GROUP BY Department;' throw an error?",
    "options": [
      "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
      "Because AVG() cannot be calculated on Salary",
      "Because GROUP BY must come before WHERE",
      "Because Department is a string"
    ],
    "answer": "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
    "explanation": "An aggregate function cannot be evaluated in the WHERE clause because WHERE operates before groups exist. Use HAVING instead.",
    "explanationBn": "WHERE ক্লজের সময় গ্রুপ গঠিত হয় না, তাই সেখানে AVG() বসানো যায় না। এর বদলে HAVING ব্যবহার করতে হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Aggregate in WHERE is invalid."
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
    "question": "Q13: What is the primary difference between the WHERE clause and the HAVING clause?",
    "options": [
      "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
      "WHERE works on groups, HAVING works on rows",
      "WHERE can contain aggregate functions like SUM(Salary), HAVING cannot",
      "They are completely interchangeable"
    ],
    "answer": "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
    "explanation": "WHERE cannot filter on aggregate results (e.g. WHERE SUM(Salary) > 50000 is ILLEGAL). You must use HAVING for aggregate conditions.",
    "explanationBn": "WHERE গ্রুপিংয়ের আগে রো ফিল্টার করে; HAVING গ্রুপিং ও এগ্রিগেশনের পরে গ্রুপ ফিল্টার করে (এগ্রিগেট ফাংশন HAVING-এ বসে)।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "WHERE for rows, HAVING for aggregate groups."
  },
  {
    "id": "q14",
    "question": "Q14: Why does the query 'SELECT Department, AVG(Salary) FROM Emp WHERE AVG(Salary) > 50000 GROUP BY Department;' throw an error?",
    "options": [
      "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
      "Because AVG() cannot be calculated on Salary",
      "Because GROUP BY must come before WHERE",
      "Because Department is a string"
    ],
    "answer": "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
    "explanation": "An aggregate function cannot be evaluated in the WHERE clause because WHERE operates before groups exist. Use HAVING instead.",
    "explanationBn": "WHERE ক্লজের সময় গ্রুপ গঠিত হয় না, তাই সেখানে AVG() বসানো যায় না। এর বদলে HAVING ব্যবহার করতে হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Aggregate in WHERE is invalid."
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
    "question": "Q19: What is the primary difference between the WHERE clause and the HAVING clause?",
    "options": [
      "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
      "WHERE works on groups, HAVING works on rows",
      "WHERE can contain aggregate functions like SUM(Salary), HAVING cannot",
      "They are completely interchangeable"
    ],
    "answer": "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
    "explanation": "WHERE cannot filter on aggregate results (e.g. WHERE SUM(Salary) > 50000 is ILLEGAL). You must use HAVING for aggregate conditions.",
    "explanationBn": "WHERE গ্রুপিংয়ের আগে রো ফিল্টার করে; HAVING গ্রুপিং ও এগ্রিগেশনের পরে গ্রুপ ফিল্টার করে (এগ্রিগেট ফাংশন HAVING-এ বসে)।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "WHERE for rows, HAVING for aggregate groups."
  },
  {
    "id": "q20",
    "question": "Q20: Why does the query 'SELECT Department, AVG(Salary) FROM Emp WHERE AVG(Salary) > 50000 GROUP BY Department;' throw an error?",
    "options": [
      "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
      "Because AVG() cannot be calculated on Salary",
      "Because GROUP BY must come before WHERE",
      "Because Department is a string"
    ],
    "answer": "Because aggregate functions like AVG() cannot appear in a WHERE clause; you must use HAVING AVG(Salary) > 50000",
    "explanation": "An aggregate function cannot be evaluated in the WHERE clause because WHERE operates before groups exist. Use HAVING instead.",
    "explanationBn": "WHERE ক্লজের সময় গ্রুপ গঠিত হয় না, তাই সেখানে AVG() বসানো যায় না। এর বদলে HAVING ব্যবহার করতে হয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Aggregate in WHERE is invalid."
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
    "question": "Q25: What is the primary difference between the WHERE clause and the HAVING clause?",
    "options": [
      "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
      "WHERE works on groups, HAVING works on rows",
      "WHERE can contain aggregate functions like SUM(Salary), HAVING cannot",
      "They are completely interchangeable"
    ],
    "answer": "WHERE filters individual rows BEFORE grouping; HAVING filters summary groups AFTER aggregation",
    "explanation": "WHERE cannot filter on aggregate results (e.g. WHERE SUM(Salary) > 50000 is ILLEGAL). You must use HAVING for aggregate conditions.",
    "explanationBn": "WHERE গ্রুপিংয়ের আগে রো ফিল্টার করে; HAVING গ্রুপিং ও এগ্রিগেশনের পরে গ্রুপ ফিল্টার করে (এগ্রিগেট ফাংশন HAVING-এ বসে)।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "WHERE for rows, HAVING for aggregate groups."
  }
];

export default questions;
