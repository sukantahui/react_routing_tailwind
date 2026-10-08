const questions = [
  {
    "id": "q1",
    "question": "Q1: What does the query 'SELECT MAX(Fee), MIN(Fee) FROM COACH;' return?",
    "options": [
      "The highest Fee and lowest Fee among all coaches in the COACH table",
      "The average fee of coaches",
      "The total number of coaches",
      "A list of all coaches sorted by fee"
    ],
    "answer": "The highest Fee and lowest Fee among all coaches in the COACH table",
    "explanation": "MAX() returns the maximum scalar value and MIN() returns the minimum scalar value in the specified column.",
    "explanationBn": "MAX(Fee) সর্বোচ্চ ফি এবং MIN(Fee) সর্বনিম্ন ফি প্রদর্শন করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Highest and lowest value discovery."
  },
  {
    "id": "q2",
    "question": "Q2: Can MIN() and MAX() functions be used on DATE and VARCHAR columns in SQL?",
    "options": [
      "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
      "No, they only work on numeric data types",
      "Only MAX works on strings, MIN does not",
      "Only on integer columns"
    ],
    "answer": "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
    "explanation": "MIN/MAX work across numeric, temporal date (earliest/latest date), and character data types (lexicographic ordering).",
    "explanationBn": "হ্যাঁ, MIN এবং MAX সংখ্যা, তারিখ (সবচেয়ে পুরনো/নতুন) এবং টেক্সট (বর্ণানুক্রমিক) সব ধরনের ডেটা টাইপেই কাজ করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Supports numerics, dates, and text."
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
    "question": "Q7: What does the query 'SELECT MAX(Fee), MIN(Fee) FROM COACH;' return?",
    "options": [
      "The highest Fee and lowest Fee among all coaches in the COACH table",
      "The average fee of coaches",
      "The total number of coaches",
      "A list of all coaches sorted by fee"
    ],
    "answer": "The highest Fee and lowest Fee among all coaches in the COACH table",
    "explanation": "MAX() returns the maximum scalar value and MIN() returns the minimum scalar value in the specified column.",
    "explanationBn": "MAX(Fee) সর্বোচ্চ ফি এবং MIN(Fee) সর্বনিম্ন ফি প্রদর্শন করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Highest and lowest value discovery."
  },
  {
    "id": "q8",
    "question": "Q8: Can MIN() and MAX() functions be used on DATE and VARCHAR columns in SQL?",
    "options": [
      "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
      "No, they only work on numeric data types",
      "Only MAX works on strings, MIN does not",
      "Only on integer columns"
    ],
    "answer": "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
    "explanation": "MIN/MAX work across numeric, temporal date (earliest/latest date), and character data types (lexicographic ordering).",
    "explanationBn": "হ্যাঁ, MIN এবং MAX সংখ্যা, তারিখ (সবচেয়ে পুরনো/নতুন) এবং টেক্সট (বর্ণানুক্রমিক) সব ধরনের ডেটা টাইপেই কাজ করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Supports numerics, dates, and text."
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
    "question": "Q13: What does the query 'SELECT MAX(Fee), MIN(Fee) FROM COACH;' return?",
    "options": [
      "The highest Fee and lowest Fee among all coaches in the COACH table",
      "The average fee of coaches",
      "The total number of coaches",
      "A list of all coaches sorted by fee"
    ],
    "answer": "The highest Fee and lowest Fee among all coaches in the COACH table",
    "explanation": "MAX() returns the maximum scalar value and MIN() returns the minimum scalar value in the specified column.",
    "explanationBn": "MAX(Fee) সর্বোচ্চ ফি এবং MIN(Fee) সর্বনিম্ন ফি প্রদর্শন করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Highest and lowest value discovery."
  },
  {
    "id": "q14",
    "question": "Q14: Can MIN() and MAX() functions be used on DATE and VARCHAR columns in SQL?",
    "options": [
      "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
      "No, they only work on numeric data types",
      "Only MAX works on strings, MIN does not",
      "Only on integer columns"
    ],
    "answer": "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
    "explanation": "MIN/MAX work across numeric, temporal date (earliest/latest date), and character data types (lexicographic ordering).",
    "explanationBn": "হ্যাঁ, MIN এবং MAX সংখ্যা, তারিখ (সবচেয়ে পুরনো/নতুন) এবং টেক্সট (বর্ণানুক্রমিক) সব ধরনের ডেটা টাইপেই কাজ করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Supports numerics, dates, and text."
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
    "question": "Q19: What does the query 'SELECT MAX(Fee), MIN(Fee) FROM COACH;' return?",
    "options": [
      "The highest Fee and lowest Fee among all coaches in the COACH table",
      "The average fee of coaches",
      "The total number of coaches",
      "A list of all coaches sorted by fee"
    ],
    "answer": "The highest Fee and lowest Fee among all coaches in the COACH table",
    "explanation": "MAX() returns the maximum scalar value and MIN() returns the minimum scalar value in the specified column.",
    "explanationBn": "MAX(Fee) সর্বোচ্চ ফি এবং MIN(Fee) সর্বনিম্ন ফি প্রদর্শন করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Highest and lowest value discovery."
  },
  {
    "id": "q20",
    "question": "Q20: Can MIN() and MAX() functions be used on DATE and VARCHAR columns in SQL?",
    "options": [
      "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
      "No, they only work on numeric data types",
      "Only MAX works on strings, MIN does not",
      "Only on integer columns"
    ],
    "answer": "Yes, MIN/MAX work on Numbers, Dates (earliest/latest), and Strings (alphabetical order)",
    "explanation": "MIN/MAX work across numeric, temporal date (earliest/latest date), and character data types (lexicographic ordering).",
    "explanationBn": "হ্যাঁ, MIN এবং MAX সংখ্যা, তারিখ (সবচেয়ে পুরনো/নতুন) এবং টেক্সট (বর্ণানুক্রমিক) সব ধরনের ডেটা টাইপেই কাজ করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Medium",
    "hint": "Supports numerics, dates, and text."
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
    "question": "Q25: What does the query 'SELECT MAX(Fee), MIN(Fee) FROM COACH;' return?",
    "options": [
      "The highest Fee and lowest Fee among all coaches in the COACH table",
      "The average fee of coaches",
      "The total number of coaches",
      "A list of all coaches sorted by fee"
    ],
    "answer": "The highest Fee and lowest Fee among all coaches in the COACH table",
    "explanation": "MAX() returns the maximum scalar value and MIN() returns the minimum scalar value in the specified column.",
    "explanationBn": "MAX(Fee) সর্বোচ্চ ফি এবং MIN(Fee) সর্বনিম্ন ফি প্রদর্শন করে।",
    "topic": "SQL Aggregate Functions & GROUP BY",
    "difficulty": "Easy",
    "hint": "Highest and lowest value discovery."
  }
];

export default questions;
