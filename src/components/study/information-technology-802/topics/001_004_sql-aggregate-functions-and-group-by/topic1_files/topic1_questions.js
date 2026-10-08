const questions = [
  {
    "id": "q1",
    "question": "Q1: How do the mathematical aggregate functions SUM() and AVG() treat NULL values in a column?",
    "options": [
      "They automatically ignore (skip) NULL values during calculation",
      "They treat NULL values as 0",
      "They return NULL if any row contains NULL",
      "They throw a runtime calculation error"
    ],
    "answer": "They automatically ignore (skip) NULL values during calculation",
    "explanation": "All SQL aggregate functions (except COUNT(*)) completely ignore NULL values when calculating sums and averages.",
    "explanationBn": "SQL এগ্রিগেট ফাংশনগুলো (SUM, AVG) হিসাব করার সময় NULL মানগুলোকে সম্পূর্ণ উপেক্ষা বা বাদ দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "NULL values are ignored."
  },
  {
    "id": "q2",
    "question": "Q2: Given a column with values {100, 200, NULL, 300}, what will AVG(column) return?",
    "options": [
      "200 (since 600 / 3 = 200)",
      "150 (since 600 / 4 = 150)",
      "NULL",
      "600"
    ],
    "answer": "200 (since 600 / 3 = 200)",
    "explanation": "The sum is 100+200+300=600, and non-null count is 3. AVG = 600 / 3 = 200. NULL is excluded from the denominator!",
    "explanationBn": "মোট যোগফল ৬০০ এবং নন-নাল রো সংখ্যা ৩, তাই গড় হবে ৬০০/৩ = ২০০। হরে NULL গণনা করা হয় না।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Denominator only counts non-null rows."
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
    "question": "Q7: How do the mathematical aggregate functions SUM() and AVG() treat NULL values in a column?",
    "options": [
      "They automatically ignore (skip) NULL values during calculation",
      "They treat NULL values as 0",
      "They return NULL if any row contains NULL",
      "They throw a runtime calculation error"
    ],
    "answer": "They automatically ignore (skip) NULL values during calculation",
    "explanation": "All SQL aggregate functions (except COUNT(*)) completely ignore NULL values when calculating sums and averages.",
    "explanationBn": "SQL এগ্রিগেট ফাংশনগুলো (SUM, AVG) হিসাব করার সময় NULL মানগুলোকে সম্পূর্ণ উপেক্ষা বা বাদ দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "NULL values are ignored."
  },
  {
    "id": "q8",
    "question": "Q8: Given a column with values {100, 200, NULL, 300}, what will AVG(column) return?",
    "options": [
      "200 (since 600 / 3 = 200)",
      "150 (since 600 / 4 = 150)",
      "NULL",
      "600"
    ],
    "answer": "200 (since 600 / 3 = 200)",
    "explanation": "The sum is 100+200+300=600, and non-null count is 3. AVG = 600 / 3 = 200. NULL is excluded from the denominator!",
    "explanationBn": "মোট যোগফল ৬০০ এবং নন-নাল রো সংখ্যা ৩, তাই গড় হবে ৬০০/৩ = ২০০। হরে NULL গণনা করা হয় না।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Denominator only counts non-null rows."
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
    "question": "Q13: How do the mathematical aggregate functions SUM() and AVG() treat NULL values in a column?",
    "options": [
      "They automatically ignore (skip) NULL values during calculation",
      "They treat NULL values as 0",
      "They return NULL if any row contains NULL",
      "They throw a runtime calculation error"
    ],
    "answer": "They automatically ignore (skip) NULL values during calculation",
    "explanation": "All SQL aggregate functions (except COUNT(*)) completely ignore NULL values when calculating sums and averages.",
    "explanationBn": "SQL এগ্রিগেট ফাংশনগুলো (SUM, AVG) হিসাব করার সময় NULL মানগুলোকে সম্পূর্ণ উপেক্ষা বা বাদ দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "NULL values are ignored."
  },
  {
    "id": "q14",
    "question": "Q14: Given a column with values {100, 200, NULL, 300}, what will AVG(column) return?",
    "options": [
      "200 (since 600 / 3 = 200)",
      "150 (since 600 / 4 = 150)",
      "NULL",
      "600"
    ],
    "answer": "200 (since 600 / 3 = 200)",
    "explanation": "The sum is 100+200+300=600, and non-null count is 3. AVG = 600 / 3 = 200. NULL is excluded from the denominator!",
    "explanationBn": "মোট যোগফল ৬০০ এবং নন-নাল রো সংখ্যা ৩, তাই গড় হবে ৬০০/৩ = ২০০। হরে NULL গণনা করা হয় না।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Denominator only counts non-null rows."
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
    "question": "Q19: How do the mathematical aggregate functions SUM() and AVG() treat NULL values in a column?",
    "options": [
      "They automatically ignore (skip) NULL values during calculation",
      "They treat NULL values as 0",
      "They return NULL if any row contains NULL",
      "They throw a runtime calculation error"
    ],
    "answer": "They automatically ignore (skip) NULL values during calculation",
    "explanation": "All SQL aggregate functions (except COUNT(*)) completely ignore NULL values when calculating sums and averages.",
    "explanationBn": "SQL এগ্রিগেট ফাংশনগুলো (SUM, AVG) হিসাব করার সময় NULL মানগুলোকে সম্পূর্ণ উপেক্ষা বা বাদ দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "NULL values are ignored."
  },
  {
    "id": "q20",
    "question": "Q20: Given a column with values {100, 200, NULL, 300}, what will AVG(column) return?",
    "options": [
      "200 (since 600 / 3 = 200)",
      "150 (since 600 / 4 = 150)",
      "NULL",
      "600"
    ],
    "answer": "200 (since 600 / 3 = 200)",
    "explanation": "The sum is 100+200+300=600, and non-null count is 3. AVG = 600 / 3 = 200. NULL is excluded from the denominator!",
    "explanationBn": "মোট যোগফল ৬০০ এবং নন-নাল রো সংখ্যা ৩, তাই গড় হবে ৬০০/৩ = ২০০। হরে NULL গণনা করা হয় না।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Hard",
    "hint": "Denominator only counts non-null rows."
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
    "question": "Q25: How do the mathematical aggregate functions SUM() and AVG() treat NULL values in a column?",
    "options": [
      "They automatically ignore (skip) NULL values during calculation",
      "They treat NULL values as 0",
      "They return NULL if any row contains NULL",
      "They throw a runtime calculation error"
    ],
    "answer": "They automatically ignore (skip) NULL values during calculation",
    "explanation": "All SQL aggregate functions (except COUNT(*)) completely ignore NULL values when calculating sums and averages.",
    "explanationBn": "SQL এগ্রিগেট ফাংশনগুলো (SUM, AVG) হিসাব করার সময় NULL মানগুলোকে সম্পূর্ণ উপেক্ষা বা বাদ দেয়।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "NULL values are ignored."
  }
];

export default questions;
