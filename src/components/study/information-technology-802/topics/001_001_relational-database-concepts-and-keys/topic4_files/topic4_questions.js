export default [
  {
    "id": "t4_q1",
    "question": "What does the marker 'NULL' represent in SQL databases?",
    "options": [
      "A missing, unknown, unassigned, or not applicable value",
      "The numeric value zero (0)",
      "An empty string text ''",
      "A negative number -1"
    ],
    "answer": "A missing, unknown, unassigned, or not applicable value",
    "explanation": "NULL indicates the absence of any data value. It is neither 0 (which is a valid number) nor '' (which is an empty text string of length 0).",
    "explanationBn": "NULL বলতে বোঝায় এমন একটি মান যা অনুপস্থিত, অজানা বা প্রযোজ্য নয়। এটি ০ বা ফাঁকা স্ট্রিং নয়।"
  },
  {
    "id": "t4_q2",
    "question": "Why does the query `SELECT * FROM Employee WHERE Commission = NULL;` return zero rows in MySQL?",
    "options": [
      "Because comparing anything with NULL using '=' yields UNKNOWN (Three-Valued Logic), which WHERE treats as FALSE",
      "Because MySQL does not support the word NULL",
      "Because commission cannot be earned by employees",
      "Because the table automatically deletes NULL rows"
    ],
    "answer": "Because comparing anything with NULL using '=' yields UNKNOWN (Three-Valued Logic), which WHERE treats as FALSE",
    "explanation": "Under Three-Valued Logic (3VL), comparing an unknown value with another unknown value yields UNKNOWN. In WHERE clauses, only expressions evaluating strictly to TRUE are returned.",
    "explanationBn": "SQL-এ `= NULL` তুলনা করলে ফলাফল হয় UNKNOWN, যা WHERE ক্লজ গ্রহণ করে না। তাই সবসময় `IS NULL` ব্যবহার করতে হয়।"
  },
  {
    "id": "t4_q3",
    "question": "Which of the following is the CORRECT SQL syntax to filter rows where the `Email` column has no value?",
    "options": [
      "`WHERE Email IS NULL`",
      "`WHERE Email = NULL`",
      "`WHERE Email == NULL`",
      "`WHERE Email IN (NULL)`"
    ],
    "answer": "`WHERE Email IS NULL`",
    "explanation": "`IS NULL` is the dedicated ANSI SQL operator designed specifically to test for missing or unassigned values.",
    "explanationBn": "NULL মান চেক করার জন্য সঠিক ANSI SQL অপারেটর হলো `IS NULL`।"
  },
  {
    "id": "t4_q4",
    "question": "What is the result of evaluating the arithmetic expression `100 + NULL * 5` in SQL?",
    "options": [
      "NULL",
      "100",
      "0",
      "500"
    ],
    "answer": "NULL",
    "explanation": "Any arithmetic operation involving a NULL operand propagates NULL (e.g., adding, subtracting, multiplying, or dividing with unknown data yields unknown).",
    "explanationBn": "NULL-এর সাথে যেকোনো গাণিতিক ক্রিয়া (যোগ, বিয়োগ, গুণ, ভাগ) করলে ফলাফল সবসময় NULL হয়।"
  },
  {
    "id": "t4_q5",
    "question": "Given a table with 4 rows where column `Commission` values are `(5500, 2500, NULL, 2000)`, what is the result of `AVG(Commission)`?",
    "options": [
      "3333.33 (since (5500 + 2500 + 2000) / 3 = 3333.33; NULL is completely ignored)",
      "2500.00 (since (5500 + 2500 + 0 + 2000) / 4)",
      "NULL",
      "0.00"
    ],
    "answer": "3333.33 (since (5500 + 2500 + 2000) / 3 = 3333.33; NULL is completely ignored)",
    "explanation": "Standard aggregate functions (SUM, AVG, MIN, MAX, COUNT(col)) completely ignore NULL entries in calculations and denominator counts.",
    "explanationBn": "`AVG(col)` ফাংশন হিসাব করার সময় NULL রো সম্পূর্ণ এড়িয়ে যায় এবং শুধুমাত্র ভ্যালিড ৩টি মানের গড় বের করে।"
  },
  {
    "id": "t4_q6",
    "question": "What is the difference between `COUNT(*)` and `COUNT(Commission)` when NULL values exist?",
    "options": [
      "`COUNT(*)` counts ALL rows including NULLs; `COUNT(Commission)` counts only rows where Commission is NOT NULL",
      "`COUNT(*)` counts only NULLs; `COUNT(Commission)` counts all rows",
      "Both queries return the exact same count always",
      "`COUNT(*)` results in a syntax error"
    ],
    "answer": "`COUNT(*)` counts ALL rows including NULLs; `COUNT(Commission)` counts only rows where Commission is NOT NULL",
    "explanation": "`COUNT(*)` returns total table cardinality regardless of column contents, while `COUNT(column_name)` counts non-null occurrences.",
    "explanationBn": "`COUNT(*)` সব রো গণনা করে, কিন্তু `COUNT(column_name)` কেবল সেই কলামে যেখানে মান আছে (NOT NULL) সেগুলো গণনা করে।"
  },
  {
    "id": "t4_q7",
    "question": "What does Three-Valued Logic (3VL) in SQL encompass?",
    "options": [
      "TRUE, FALSE, and UNKNOWN",
      "YES, NO, and MAYBE",
      "1, 0, and -1",
      "POSITIVE, NEGATIVE, and ZERO"
    ],
    "answer": "TRUE, FALSE, and UNKNOWN",
    "explanation": "SQL uses three truth values: TRUE, FALSE, and UNKNOWN to handle predicate logic with missing data.",
    "explanationBn": "SQL-এ Three-Valued Logic (3VL)-এর ৩টি মান হলো: TRUE, FALSE এবং UNKNOWN।"
  },
  {
    "id": "t4_q8",
    "question": "What is the result of `UNKNOWN AND FALSE` in SQL logic?",
    "options": [
      "FALSE (because AND requires all operands to be true, and one is definitely false)",
      "TRUE",
      "UNKNOWN",
      "NULL"
    ],
    "answer": "FALSE (because AND requires all operands to be true, and one is definitely false)",
    "explanation": "In SQL logic truth tables: FALSE AND anything (even UNKNOWN) is definitively FALSE.",
    "explanationBn": "AND অপারেশনে যেকোনো একটি মান FALSE হলে সম্পূর্ণ ফলাফল নিশ্চিতভাবেই FALSE হয়।"
  },
  {
    "id": "t4_q9",
    "question": "What is the result of `UNKNOWN OR TRUE` in SQL logic?",
    "options": [
      "TRUE (because OR needs at least one true operand, which is satisfied)",
      "FALSE",
      "UNKNOWN",
      "NULL"
    ],
    "answer": "TRUE (because OR needs at least one true operand, which is satisfied)",
    "explanation": "In SQL logic truth tables: TRUE OR anything (even UNKNOWN) is definitively TRUE.",
    "explanationBn": "OR অপারেশনে যেকোনো একটি মান TRUE হলে সম্পূর্ণ ফলাফল নিশ্চিতভাবেই TRUE হয়।"
  },
  {
    "id": "t4_q10",
    "question": "What is the result of `NOT UNKNOWN` in SQL logic?",
    "options": [
      "UNKNOWN",
      "TRUE",
      "FALSE",
      "NULL"
    ],
    "answer": "UNKNOWN",
    "explanation": "The negation of an unknown truth value remains UNKNOWN.",
    "explanationBn": "UNKNOWN-এর বিপরীত (NOT) মান সবসময় UNKNOWN-ই থাকে।"
  },
  {
    "id": "t4_q11",
    "question": "Which MySQL function replaces NULL with a specified fallback default value (e.g. converting NULL commission to 0.00)?",
    "options": [
      "`IFNULL(Commission, 0.00)` or `COALESCE(Commission, 0.00)`",
      "`REPLACE_NULL(Commission, 0)`",
      "`CONVERT_NULL(Commission)`",
      "`FIX(Commission, 0)`"
    ],
    "answer": "`IFNULL(Commission, 0.00)` or `COALESCE(Commission, 0.00)`",
    "explanation": "`IFNULL(expr1, expr2)` in MySQL and ANSI standard `COALESCE(expr1, expr2, ...)` return the first non-null argument.",
    "explanationBn": "`IFNULL()` বা `COALESCE()` ফাংশনের সাহায্যে কোনো কলামের NULL মানকে নির্দিষ্ট ডিফল্ট মান (যেমন ০) দিয়ে প্রতিস্থাপন করা হয়।"
  },
  {
    "id": "t4_q12",
    "question": "Can a column defined with a `PRIMARY KEY` constraint contain NULL values?",
    "options": [
      "No, Primary Key columns strictly prohibit NULL values (Must be UNIQUE and NOT NULL)",
      "Yes, up to 1 NULL value is allowed",
      "Yes, unlimited NULL values are allowed",
      "Yes, but only in test databases"
    ],
    "answer": "No, Primary Key columns strictly prohibit NULL values (Must be UNIQUE and NOT NULL)",
    "explanation": "Entity Integrity constraint dictates that a primary key cannot be NULL because it must uniquely identify an entity instance.",
    "explanationBn": "Entity Integrity অনুযায়ী Primary Key কলামে কোনোভাবেই NULL মান রাখা যাবে না।"
  },
  {
    "id": "t4_q13",
    "question": "Can a column defined with a `UNIQUE` constraint contain NULL values?",
    "options": [
      "Yes, standard SQL permits NULL values in UNIQUE columns (and in MySQL, multiple rows may contain NULL)",
      "No, UNIQUE columns reject all NULLs",
      "Only if the column is of type INT",
      "Only on weekends"
    ],
    "answer": "Yes, standard SQL permits NULL values in UNIQUE columns (and in MySQL, multiple rows may contain NULL)",
    "explanation": "A UNIQUE constraint allows NULL values unless explicitly combined with the `NOT NULL` constraint.",
    "explanationBn": "UNIQUE কনস্ট্রেইন্ট থাকা কলামে NULL মান রাখা সম্ভব, যদি না সেখানে আলাদাভাবে `NOT NULL` দেওয়া থাকে।"
  },
  {
    "id": "t4_q14",
    "question": "In Coder & AccoTax Barrackpore, student Debangshu has not yet submitted his phone number. How is this recorded in MySQL?",
    "options": [
      "The `ContactPhone` column is set to `NULL`",
      "The database crashes",
      "The student name is deleted",
      "The phone number is set to '9999999999'"
    ],
    "answer": "The `ContactPhone` column is set to `NULL`",
    "explanation": "NULL represents unassigned or uncollected data in relational tables.",
    "explanationBn": "যে তথ্য এখনো জমা পড়েনি বা অজানা, তা সংরক্ষণ করতে কলামে NULL বসানো হয়।"
  },
  {
    "id": "t4_q15",
    "question": "In SQL string concatenation with `CONCAT('Hello ', NULL, 'World')`, what does standard SQL return?",
    "options": [
      "NULL in ANSI SQL (or in MySQL `CONCAT_WS()` is used to skip NULLs)",
      "'Hello World'",
      "'Hello NULLWorld'",
      "Error"
    ],
    "answer": "NULL in ANSI SQL (or in MySQL `CONCAT_WS()` is used to skip NULLs)",
    "explanation": "Standard `CONCAT()` in MySQL returns NULL if any argument is NULL. `CONCAT_WS()` skips NULLs.",
    "explanationBn": "MySQL-এর সাধারণ `CONCAT()` ফাংশনে যেকোনো একটি আর্গুমেন্ট NULL হলে সম্পূর্ণ ফলাফল NULL হয়ে যায়।"
  },
  {
    "id": "t4_q16",
    "question": "What is the output of `SELECT 5 = NULL;` in MySQL CLI?",
    "options": [
      "NULL",
      "0 (False)",
      "1 (True)",
      "Error"
    ],
    "answer": "NULL",
    "explanation": "Equality comparison with NULL evaluates to NULL (which represents UNKNOWN).",
    "explanationBn": "`5 = NULL` এক্সপ্রেশনের মূল্যায়ন করলে আউটপুট হয় NULL।"
  },
  {
    "id": "t4_q17",
    "question": "What is the output of `SELECT 5 IS NULL;` in MySQL CLI?",
    "options": [
      "0 (False, because 5 is a valid number)",
      "1 (True)",
      "NULL",
      "Error"
    ],
    "answer": "0 (False, because 5 is a valid number)",
    "explanation": "The `IS NULL` predicate evaluates whether 5 is missing; since 5 exists, it returns 0 (FALSE).",
    "explanationBn": "`5 IS NULL` সঠিক উত্তর হিসেবে ০ (False) রিটার্ন করে।"
  },
  {
    "id": "t4_q18",
    "question": "What is the output of `SELECT NULL IS NULL;` in MySQL CLI?",
    "options": [
      "1 (True)",
      "0 (False)",
      "NULL",
      "Error"
    ],
    "answer": "1 (True)",
    "explanation": "Testing if NULL is indeed NULL evaluates to 1 (TRUE).",
    "explanationBn": "`NULL IS NULL` সত্য হওয়ায় ১ (True) রিটার্ন করে।"
  },
  {
    "id": "t4_q19",
    "question": "Why should database designers avoid excessive NULLable columns in high-performance transactional databases?",
    "options": [
      "Because NULL handling requires bitmap overhead, impairs indexing optimizations, and adds 3VL complexity to SQL queries",
      "Because NULL consumes 100GB per row",
      "Because NULL stops the hard disk from spinning",
      "Because SQL cannot store text if NULL exists"
    ],
    "answer": "Because NULL handling requires bitmap overhead, impairs indexing optimizations, and adds 3VL complexity to SQL queries",
    "explanation": "NULLable columns require internal null bitmap flags in storage engines and complicate query predicates.",
    "explanationBn": "অতিরিক্ত NULL কলাম ডেটাবেসের ইনডেক্সিং এবং পারফরম্যান্সে প্রভাব ফেলে এবং কোয়েরির জটিলতা বৃদ্ধি করে।"
  },
  {
    "id": "t4_q20",
    "question": "Which constraint is explicitly added to a column definition to prevent NULL values from ever being inserted?",
    "options": [
      "`NOT NULL`",
      "`NO_NULL`",
      "`REJECT_NULL`",
      "`MANDATORY`"
    ],
    "answer": "`NOT NULL`",
    "explanation": "The `NOT NULL` constraint enforces that a column must always be assigned a valid, non-null scalar value upon insertion or update.",
    "explanationBn": "`NOT NULL` কনস্ট্রেইন্ট দিলে সেই কলামে কোনো ফাঁকা বা NULL মান প্রবেশ করানো যায় না।"
  },
  {
    "id": "t4_q21",
    "question": "In an employee table, if an employee's salary is 50,000 and bonus is NULL, what does `SELECT Salary + Bonus` return?",
    "options": [
      "NULL",
      "50000",
      "0",
      "Error"
    ],
    "answer": "NULL",
    "explanation": "Arithmetic addition with NULL yields NULL. To get 50,000, write `Salary + IFNULL(Bonus, 0)`.",
    "explanationBn": "৫০,০০০ + NULL = NULL। সঠিক যোগফল পেতে `IFNULL(Bonus, 0)` ব্যবহার করতে হয়।"
  },
  {
    "id": "t4_q22",
    "question": "How does the `ORDER BY` clause sort NULL values in MySQL by default?",
    "options": [
      "NULL values are considered the lowest possible values and appear first in ASC order (and last in DESC order)",
      "NULL values appear randomly",
      "NULL values cause the query to fail",
      "NULL values are converted to 999999"
    ],
    "answer": "NULL values are considered the lowest possible values and appear first in ASC order (and last in DESC order)",
    "explanation": "In MySQL, NULLs are treated as smaller than non-null values and sort first in ascending order.",
    "explanationBn": "MySQL-এ `ORDER BY ASC` করার সময় NULL মানগুলো সবার শুরুতে প্রদর্শিত হয়।"
  },
  {
    "id": "t4_q23",
    "question": "Which of the following queries correctly retrieves all students who HAVE an assigned blood group?",
    "options": [
      "`SELECT * FROM Student WHERE BloodGroup IS NOT NULL;`",
      "`SELECT * FROM Student WHERE BloodGroup != NULL;`",
      "`SELECT * FROM Student WHERE BloodGroup <> NULL;`",
      "`SELECT * FROM Student WHERE BloodGroup NOT NULL;`"
    ],
    "answer": "`SELECT * FROM Student WHERE BloodGroup IS NOT NULL;`",
    "explanation": "`IS NOT NULL` is the proper SQL operator to test for non-empty, assigned values.",
    "explanationBn": "মান আছে এমন রেকর্ড ফিল্টার করতে `IS NOT NULL` ব্যবহার করতে হয়।"
  },
  {
    "id": "t4_q24",
    "question": "In CBSE board sample papers, a table has values `(10, 20, 30, NULL)`. What is `SUM(Val) + 5`?",
    "options": [
      "65 (since SUM(Val) = 60; 60 + 5 = 65)",
      "NULL",
      "60",
      "55"
    ],
    "answer": "65 (since SUM(Val) = 60; 60 + 5 = 65)",
    "explanation": "`SUM(Val)` evaluates to 60 (ignoring NULL). Then $60 + 5 = 65$.",
    "explanationBn": "`SUM()` ফাংশন NULL বাদ দিয়ে ৬০ বের করে, তার সাথে ৫ যোগ হয়ে ফলাফল হয় ৬৫।"
  },
  {
    "id": "t4_q25",
    "question": "Which golden rule summarizes the distinction between 0, '', and NULL?",
    "options": [
      "0 is a valid number; '' is a valid string of length zero; NULL is the total absence of any value",
      "0, '', and NULL are completely identical in SQL",
      "NULL is converted into 0 automatically by all queries",
      "0 is an error, while NULL is a number"
    ],
    "answer": "0 is a valid number; '' is a valid string of length zero; NULL is the total absence of any value",
    "explanation": "Always remember: 0 is a number, empty string is text, NULL is missing/unknown data.",
    "explanationBn": "০ হলো একটি সংখ্যা, '' হলো ফাঁকা লেখা, আর NULL হলো কোনো মানের অনুপস্থিতি।"
  }
];
