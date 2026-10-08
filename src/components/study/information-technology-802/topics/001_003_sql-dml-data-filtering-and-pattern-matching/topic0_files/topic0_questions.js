const questions = [
  {
    "id": "q1",
    "question": "Q1: Which SQL DML command is used to add new row tuples into an existing relation?",
    "options": [
      "INSERT INTO",
      "ADD RECORD",
      "CREATE ROW",
      "APPEND TO"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is the standard ANSI SQL DML command used to insert new rows into a table.",
    "explanationBn": "INSERT INTO হলো মানক DML কমান্ড যা টেবিলে নতুন রো বা রেকর্ড যুক্ত করতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Standard DML insertion keyword."
  },
  {
    "id": "q2",
    "question": "Q2: In MySQL, which literals MUST always be enclosed within single quotes ('...')?",
    "options": [
      "Character Strings and Temporal Dates",
      "Integer and Decimal numbers",
      "The keyword NULL",
      "Column identifiers"
    ],
    "answer": "Character Strings and Temporal Dates",
    "explanation": "In SQL, character literals ('Amit') and date literals ('2026-10-08') must be enclosed in single quotes.",
    "explanationBn": "SQL-এ স্ট্রিং এবং তারিখের মান সর্বদা সিঙ্গেল কোটেশনের মধ্যে রাখতে হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Text and date literal syntax."
  },
  {
    "id": "q3",
    "question": "Q3: What is the standard ISO date format expected by MySQL when inserting dates?",
    "options": [
      "YYYY-MM-DD",
      "DD-MM-YYYY",
      "MM-DD-YYYY",
      "YYYY/DD/MM"
    ],
    "answer": "YYYY-MM-DD",
    "explanation": "MySQL expects dates in the ISO format 'YYYY-MM-DD' (e.g., '2026-04-15').",
    "explanationBn": "MySQL-এ তারিখের আদর্শ ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Year-Month-Day."
  },
  {
    "id": "q4",
    "question": "Q4: What happens to omitted columns when using 'INSERT INTO Student (RollNo, Name) VALUES (101, 'Ravi');'?",
    "options": [
      "They receive their default value or NULL (if allowed)",
      "MySQL throws an error",
      "The entire table is wiped",
      "The command is ignored"
    ],
    "answer": "They receive their default value or NULL (if allowed)",
    "explanation": "Omitted columns automatically take their defined DEFAULT value or NULL if nullable.",
    "explanationBn": "কলামের নাম উল্লেখ করে ইনসার্ট করলে বাদ পড়া কলামগুলোতে DEFAULT মান বা NULL বসে।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Default column assignment."
  },
  {
    "id": "q5",
    "question": "Q5: How should the literal NULL be written in an INSERT statement?",
    "options": [
      "NULL (without quotes)",
      "'NULL' (with quotes)",
      "\"NULL\"",
      "0"
    ],
    "answer": "NULL (without quotes)",
    "explanation": "NULL is a SQL keyword representing missing data and must never be enclosed in quotes.",
    "explanationBn": "NULL কিওয়ার্ডটি কোটেশন ছাড়া লিখতে হয়। কোটেশন দিলে তা স্ট্রিং হয়ে যায়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Keyword without quotes."
  },
  {
    "id": "q6",
    "question": "Q6: Which SQL command is used to add new records into an existing database table?",
    "options": [
      "INSERT INTO",
      "ADD RECORD",
      "CREATE ROW",
      "UPDATE"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is the standard DML command used to insert new row tuples into a relation.",
    "explanationBn": "INSERT INTO হলো মানক DML কমান্ড যা টেবিলে নতুন রো যুক্ত করতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "SQL keyword to insert rows."
  },
  {
    "id": "q7",
    "question": "Q7: Which of the following values must ALWAYS be enclosed in single quotes ('...') when writing an INSERT statement in MySQL?",
    "options": [
      "Character strings and Date/Time values",
      "Integers and Floats",
      "The keyword NULL",
      "Column names"
    ],
    "answer": "Character strings and Date/Time values",
    "explanation": "In SQL, character string literals (e.g. 'Amit') and temporal dates ('2026-10-08') must be enclosed in single quotes.",
    "explanationBn": "SQL-এ স্ট্রিং এবং তারিখের মান সর্বদা সিঙ্গেল কোটেশনের মধ্যে রাখতে হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Text and date formatting rules."
  },
  {
    "id": "q8",
    "question": "Q8: What happens if you execute an UPDATE statement without specifying a WHERE clause?",
    "options": [
      "All rows in the entire table will be updated with the new value",
      "MySQL will throw a syntax error and refuse to execute",
      "Only the first row will be updated",
      "The table will be deleted"
    ],
    "answer": "All rows in the entire table will be updated with the new value",
    "explanation": "Without a WHERE clause to filter rows, the UPDATE statement applies its modifications to EVERY tuple in the table.",
    "explanationBn": "WHERE ক্লজ ছাড়া UPDATE কমান্ড চালালে টেবিলের সমস্ত রো-এর মান পরিবর্তিত হয়ে যাবে।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Unconditional mass update behavior."
  },
  {
    "id": "q9",
    "question": "Q9: Write the SQL clause to increase the attribute 'Value' in table 'STOCKDATA' by 25% for all rows:",
    "options": [
      "UPDATE STOCKDATA SET Value = Value * 1.25;",
      "UPDATE STOCKDATA SET Value = Value + 25%;",
      "MODIFY STOCKDATA Value = Value * 1.25;",
      "ALTER TABLE STOCKDATA INCREASE Value BY 25%;"
    ],
    "answer": "UPDATE STOCKDATA SET Value = Value * 1.25;",
    "explanation": "A 25% increase corresponds to multiplying by (1 + 0.25) = 1.25 in standard SQL arithmetic.",
    "explanationBn": "২৫% বৃদ্ধির জন্য মানকে ১.২৫ দিয়ে গুণ করতে হয়: UPDATE STOCKDATA SET Value = Value * 1.25;",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Percentage multiplier is 1.25."
  },
  {
    "id": "q10",
    "question": "Q10: Which wildcard character in the SQL LIKE operator matches ANY sequence of zero, one, or more characters?",
    "options": [
      "% (Percent)",
      "_ (Underscore)",
      "* (Asterisk)",
      "? (Question mark)"
    ],
    "answer": "% (Percent)",
    "explanation": "The percent symbol (%) matches zero, one, or multiple arbitrary characters in SQL pattern matching.",
    "explanationBn": "% (Percent) ওয়াইল্ডকার্ড শূন্য বা একাধিক যেকোনো সংখ্যক ক্যারেক্টার মেলাতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Standard SQL multi-character wildcard."
  },
  {
    "id": "q11",
    "question": "Q11: Which wildcard character in the SQL LIKE operator matches EXACTLY ONE single character at that position?",
    "options": [
      "_ (Underscore)",
      "% (Percent)",
      "$ (Dollar)",
      "# (Hash)"
    ],
    "answer": "_ (Underscore)",
    "explanation": "The underscore (_) matches strictly one single character at the specified index.",
    "explanationBn": "_ (Underscore) ওয়াইল্ডকার্ড ঠিক ১টি একক ক্যারেক্টার মেলাতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Single character wildcard."
  },
  {
    "id": "q12",
    "question": "Q12: Which SQL condition correctly selects all students whose FullName contains the word 'Kumar' anywhere?",
    "options": [
      "WHERE FullName LIKE '%Kumar%'",
      "WHERE FullName LIKE 'Kumar%'",
      "WHERE FullName LIKE '%Kumar'",
      "WHERE FullName = '%Kumar%'"
    ],
    "answer": "WHERE FullName LIKE '%Kumar%'",
    "explanation": "Enclosing 'Kumar' with leading and trailing percent wildcards ('%Kumar%') matches strings containing 'Kumar' at the beginning, middle, or end.",
    "explanationBn": "'%Kumar%' প্যাটার্নটি নামের যেকোনো স্থানে 'Kumar' শব্দ থাকলে সেটি খুঁজে বের করে।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Wildcard on both sides."
  },
  {
    "id": "q13",
    "question": "Q13: Which SQL operator tests if a column's value matches ANY value present in a discrete list?",
    "options": [
      "IN",
      "BETWEEN",
      "LIKE",
      "EXISTS"
    ],
    "answer": "IN",
    "explanation": "The IN operator tests for set membership against a comma-separated list of literal values.",
    "explanationBn": "IN অপারেটর একটি তালিকার যেকোনো মানের সাথে মেলাতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Set membership operator."
  },
  {
    "id": "q14",
    "question": "Q14: Is the SQL BETWEEN operator inclusive of its boundary values?",
    "options": [
      "Yes, BETWEEN value1 AND value2 includes both value1 and value2",
      "No, it excludes both value1 and value2",
      "It includes only value1",
      "It includes only value2"
    ],
    "answer": "Yes, BETWEEN value1 AND value2 includes both value1 and value2",
    "explanation": "BETWEEN is inclusive: 'Marks BETWEEN 80 AND 90' is equivalent to 'Marks >= 80 AND Marks <= 90'.",
    "explanationBn": "হ্যাঁ, BETWEEN অপারেটর উভয় সীমানার মানকেই অন্তর্ভুক্ত করে (>= এবং <=)।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Inclusive range behavior."
  },
  {
    "id": "q15",
    "question": "Q15: Why does the query 'SELECT * FROM Employee WHERE Commission = NULL;' fail to return rows where Commission is NULL?",
    "options": [
      "Because comparison with NULL in SQL 3-Valued Logic yields UNKNOWN (which WHERE treats as non-matching)",
      "Because NULL is equal to 0",
      "Because Commission must be a character string",
      "Because SQL does not allow tables to have NULL values"
    ],
    "answer": "Because comparison with NULL in SQL 3-Valued Logic yields UNKNOWN (which WHERE treats as non-matching)",
    "explanation": "In SQL Three-Valued Logic, any equality comparison with NULL evaluates to UNKNOWN. You must use 'IS NULL' instead.",
    "explanationBn": "SQL থ্রি-ভ্যালুড লজিকে NULL-এর সাথে সমতা পরীক্ষা করলে UNKNOWN ফলাফল আসে, তাই 'IS NULL' ব্যবহার করতে হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Hard",
    "hint": "Three-valued logic rules."
  },
  {
    "id": "q16",
    "question": "Q16: Which keyword is used in a SELECT statement to remove duplicate rows from the query output?",
    "options": [
      "DISTINCT",
      "UNIQUE",
      "DIFFERENT",
      "NO_DUPLICATE"
    ],
    "answer": "DISTINCT",
    "explanation": "DISTINCT filters out repeated duplicate tuples from the displayed query result set.",
    "explanationBn": "DISTINCT কিওয়ার্ড কোয়েরির ফলাফল থেকে ডুপ্লিকেট রো বাদ দিতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Standard SQL duplicate filtering keyword."
  },
  {
    "id": "q17",
    "question": "Q17: What is the default sorting order when using the ORDER BY clause in SQL?",
    "options": [
      "Ascending (ASC)",
      "Descending (DESC)",
      "Random order",
      "Insertion order"
    ],
    "answer": "Ascending (ASC)",
    "explanation": "In SQL, if neither ASC nor DESC is specified, MySQL defaults to Ascending order (A to Z, 1 to 100).",
    "explanationBn": "ORDER BY ক্লজে কিছু উল্লেখ না থাকলে ডিফল্টভাবে Ascending (ASC) ক্রমে সাজানো হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Default A to Z sorting."
  },
  {
    "id": "q18",
    "question": "Q18: Which SQL DML command is used to add new row tuples into an existing relation?",
    "options": [
      "INSERT INTO",
      "ADD RECORD",
      "CREATE ROW",
      "APPEND TO"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is the standard ANSI SQL DML command used to insert new rows into a table.",
    "explanationBn": "INSERT INTO হলো মানক DML কমান্ড যা টেবিলে নতুন রো বা রেকর্ড যুক্ত করতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Standard DML insertion keyword."
  },
  {
    "id": "q19",
    "question": "Q19: In MySQL, which literals MUST always be enclosed within single quotes ('...')?",
    "options": [
      "Character Strings and Temporal Dates",
      "Integer and Decimal numbers",
      "The keyword NULL",
      "Column identifiers"
    ],
    "answer": "Character Strings and Temporal Dates",
    "explanation": "In SQL, character literals ('Amit') and date literals ('2026-10-08') must be enclosed in single quotes.",
    "explanationBn": "SQL-এ স্ট্রিং এবং তারিখের মান সর্বদা সিঙ্গেল কোটেশনের মধ্যে রাখতে হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Text and date literal syntax."
  },
  {
    "id": "q20",
    "question": "Q20: What is the standard ISO date format expected by MySQL when inserting dates?",
    "options": [
      "YYYY-MM-DD",
      "DD-MM-YYYY",
      "MM-DD-YYYY",
      "YYYY/DD/MM"
    ],
    "answer": "YYYY-MM-DD",
    "explanation": "MySQL expects dates in the ISO format 'YYYY-MM-DD' (e.g., '2026-04-15').",
    "explanationBn": "MySQL-এ তারিখের আদর্শ ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Year-Month-Day."
  },
  {
    "id": "q21",
    "question": "Q21: What happens to omitted columns when using 'INSERT INTO Student (RollNo, Name) VALUES (101, 'Ravi');'?",
    "options": [
      "They receive their default value or NULL (if allowed)",
      "MySQL throws an error",
      "The entire table is wiped",
      "The command is ignored"
    ],
    "answer": "They receive their default value or NULL (if allowed)",
    "explanation": "Omitted columns automatically take their defined DEFAULT value or NULL if nullable.",
    "explanationBn": "কলামের নাম উল্লেখ করে ইনসার্ট করলে বাদ পড়া কলামগুলোতে DEFAULT মান বা NULL বসে।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Default column assignment."
  },
  {
    "id": "q22",
    "question": "Q22: How should the literal NULL be written in an INSERT statement?",
    "options": [
      "NULL (without quotes)",
      "'NULL' (with quotes)",
      "\"NULL\"",
      "0"
    ],
    "answer": "NULL (without quotes)",
    "explanation": "NULL is a SQL keyword representing missing data and must never be enclosed in quotes.",
    "explanationBn": "NULL কিওয়ার্ডটি কোটেশন ছাড়া লিখতে হয়। কোটেশন দিলে তা স্ট্রিং হয়ে যায়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Keyword without quotes."
  },
  {
    "id": "q23",
    "question": "Q23: Which SQL command is used to add new records into an existing database table?",
    "options": [
      "INSERT INTO",
      "ADD RECORD",
      "CREATE ROW",
      "UPDATE"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is the standard DML command used to insert new row tuples into a relation.",
    "explanationBn": "INSERT INTO হলো মানক DML কমান্ড যা টেবিলে নতুন রো যুক্ত করতে ব্যবহৃত হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "SQL keyword to insert rows."
  },
  {
    "id": "q24",
    "question": "Q24: Which of the following values must ALWAYS be enclosed in single quotes ('...') when writing an INSERT statement in MySQL?",
    "options": [
      "Character strings and Date/Time values",
      "Integers and Floats",
      "The keyword NULL",
      "Column names"
    ],
    "answer": "Character strings and Date/Time values",
    "explanation": "In SQL, character string literals (e.g. 'Amit') and temporal dates ('2026-10-08') must be enclosed in single quotes.",
    "explanationBn": "SQL-এ স্ট্রিং এবং তারিখের মান সর্বদা সিঙ্গেল কোটেশনের মধ্যে রাখতে হয়।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Easy",
    "hint": "Text and date formatting rules."
  },
  {
    "id": "q25",
    "question": "Q25: What happens if you execute an UPDATE statement without specifying a WHERE clause?",
    "options": [
      "All rows in the entire table will be updated with the new value",
      "MySQL will throw a syntax error and refuse to execute",
      "Only the first row will be updated",
      "The table will be deleted"
    ],
    "answer": "All rows in the entire table will be updated with the new value",
    "explanation": "Without a WHERE clause to filter rows, the UPDATE statement applies its modifications to EVERY tuple in the table.",
    "explanationBn": "WHERE ক্লজ ছাড়া UPDATE কমান্ড চালালে টেবিলের সমস্ত রো-এর মান পরিবর্তিত হয়ে যাবে।",
    "topic": "SQL DML & Data Filtering",
    "difficulty": "Medium",
    "hint": "Unconditional mass update behavior."
  }
];

export default questions;
