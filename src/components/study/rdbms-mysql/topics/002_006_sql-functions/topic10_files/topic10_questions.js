// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What does the `GROUP_CONCAT()` aggregate function do in MySQL?",
    shortAnswer: "It concatenates multiple string values from grouped rows into a single delimited string result.",
    explanation: "Core purpose of GROUP_CONCAT.",
    hint: "Concatenates multiple string values into a single delimited string.",
    level: "basic"
  },
  {
    question: "What is the default delimiter / separator used by `GROUP_CONCAT()` if `SEPARATOR` is omitted?",
    shortAnswer: "A comma (`,`).",
    explanation: "Default separator in GROUP_CONCAT.",
    hint: "Comma (',').",
    level: "basic"
  },
  {
    question: "How do you specify a custom separator (e.g. `' | '` or `'; '`) in `GROUP_CONCAT()`?",
    shortAnswer: "`GROUP_CONCAT(skill_name SEPARATOR ' | ')`.",
    explanation: "SEPARATOR clause syntax.",
    hint: "Use the SEPARATOR keyword followed by the string delimiter.",
    level: "basic"
  },
  {
    question: "How do you eliminate duplicate values inside `GROUP_CONCAT()`?",
    shortAnswer: "Add the `DISTINCT` keyword inside the function call: `GROUP_CONCAT(DISTINCT department_name SEPARATOR ', ')`.",
    explanation: "Deduplication with DISTINCT inside GROUP_CONCAT.",
    hint: "GROUP_CONCAT(DISTINCT col SEPARATOR ', ').",
    level: "basic"
  },
  {
    question: "How do you sort items alphabetically inside the concatenated string?",
    shortAnswer: "`GROUP_CONCAT(student_name ORDER BY student_name ASC SEPARATOR ', ')`.",
    explanation: "Internal sorting with ORDER BY in GROUP_CONCAT.",
    hint: "Add ORDER BY inside the function arguments.",
    level: "basic"
  },
  {
    question: "What happens to `NULL` values when processed by `GROUP_CONCAT()`?",
    shortAnswer: "`NULL` values are silently ignored and skipped during concatenation.",
    explanation: "NULL value exclusion in GROUP_CONCAT.",
    hint: "NULL values are ignored and omitted from the result.",
    level: "basic"
  },
  {
    question: "What does `GROUP_CONCAT()` return if all values in the group are `NULL`?",
    shortAnswer: "`NULL`.",
    explanation: "All-null group behavior in GROUP_CONCAT.",
    hint: "Returns NULL.",
    level: "basic"
  },
  {
    question: "What system variable limits the maximum length of a string returned by `GROUP_CONCAT()`?",
    shortAnswer: "`group_concat_max_len`.",
    explanation: "System variable governing string truncation in GROUP_CONCAT.",
    hint: "group_concat_max_len.",
    level: "moderate"
  },
  {
    question: "What happens if the concatenated string exceeds `group_concat_max_len`?",
    shortAnswer: "MySQL silently truncates the output string at the limit and issues a warning.",
    explanation: "Silent truncation risk with long strings.",
    hint: "Silently truncated with a warning.",
    level: "moderate"
  },
  {
    question: "How do you increase `group_concat_max_len` to 10 MB for the current database session?",
    shortAnswer: "`SET SESSION group_concat_max_len = 10485760;` (or `10 * 1024 * 1024`).",
    explanation: "Increasing session buffer size for GROUP_CONCAT.",
    hint: "SET SESSION group_concat_max_len = 10485760;",
    level: "moderate"
  },
  {
    question: "How do you concatenate student names along with their marks in ranked order (highest to lowest)?",
    shortAnswer: "`SELECT batch_name, GROUP_CONCAT(CONCAT(student_name, ' (', marks, ')') ORDER BY marks DESC SEPARATOR ' | ') FROM exam_scores GROUP BY batch_name;`",
    explanation: "Combining CONCAT with formatted ORDER BY in GROUP_CONCAT.",
    hint: "GROUP_CONCAT(CONCAT(name, ' (', marks, ')') ORDER BY marks DESC SEPARATOR ' | ').",
    level: "basic"
  },
  {
    question: "What is the PostgreSQL equivalent of MySQL's `GROUP_CONCAT()`?",
    shortAnswer: "`STRING_AGG(expression, delimiter)`.",
    explanation: "PostgreSQL aggregate function equivalence.",
    hint: "STRING_AGG(col, delimiter).",
    level: "moderate"
  },
  {
    question: "What is the Oracle SQL equivalent of MySQL's `GROUP_CONCAT()`?",
    shortAnswer: "`LISTAGG(expression, delimiter) WITHIN GROUP (ORDER BY ...)`.",
    explanation: "Oracle aggregate function equivalence.",
    hint: "LISTAGG(...) WITHIN GROUP (ORDER BY ...).",
    level: "moderate"
  },
  {
    question: "What is the Microsoft SQL Server equivalent of `GROUP_CONCAT()`?",
    shortAnswer: "`STRING_AGG(expression, delimiter)` (or historically `FOR XML PATH('')`).",
    explanation: "SQL Server aggregate function equivalence.",
    hint: "STRING_AGG(col, delimiter).",
    level: "moderate"
  },
  {
    question: "Can `GROUP_CONCAT()` accept multiple column expressions directly without `CONCAT()`?",
    shortAnswer: "YES. MySQL allows `GROUP_CONCAT(col1, ' - ', col2 SEPARATOR '; ')`, which concatenates them per row before joining across rows.",
    explanation: "Multi-expression syntax in GROUP_CONCAT.",
    hint: "Yes, multiple expressions can be supplied directly.",
    level: "moderate"
  },
  {
    question: "Why should you use `DISTINCT` inside `GROUP_CONCAT()` when joining 1:N or M:N related tables?",
    shortAnswer: "Because joining related tables multiplies rows, causing repeated identical values to appear multiple times in the concatenated string.",
    explanation: "Preventing cartesian text duplication with DISTINCT.",
    hint: "Prevents duplicate strings caused by multi-table JOIN row multiplication.",
    level: "basic"
  },
  {
    question: "In academy batch management, list all enrolled student names for each batch in alphabetical order separated by commas.",
    shortAnswer: "`SELECT batch_name, GROUP_CONCAT(student_name ORDER BY student_name ASC SEPARATOR ', ') AS student_roster FROM enrollments GROUP BY batch_name;`",
    explanation: "Alphabetical student roster generation.",
    hint: "GROUP_CONCAT(student_name ORDER BY student_name ASC SEPARATOR ', ').",
    level: "basic"
  },
  {
    question: "How do you check the current value of `group_concat_max_len` in MySQL Workbench?",
    shortAnswer: "`SHOW VARIABLES LIKE 'group_concat_max_len';`",
    explanation: "Inspecting system variables.",
    hint: "SHOW VARIABLES LIKE 'group_concat_max_len';",
    level: "basic"
  },
  {
    question: "What is the default value of `group_concat_max_len` in MySQL 8.0?",
    shortAnswer: "`1048576` bytes (1 MB). (In MySQL 5.7 and older, it was `1024` bytes).",
    explanation: "Default buffer limits across MySQL versions.",
    hint: "1048576 bytes (1 MB) in MySQL 8.0.",
    level: "moderate"
  },
  {
    question: "How do you include missing/NULL phone numbers as `'[N/A]'` inside `GROUP_CONCAT()`?",
    shortAnswer: "`GROUP_CONCAT(COALESCE(phone_number, '[N/A]') SEPARATOR ', ')`.",
    explanation: "Replacing NULLs with fallback string in GROUP_CONCAT.",
    hint: "GROUP_CONCAT(COALESCE(col, '[N/A]') SEPARATOR ', ').",
    level: "basic"
  },
  {
    question: "In e-commerce order management, aggregate all purchased item names for each `order_id` separated by `' + '`.",
    shortAnswer: "`SELECT order_id, GROUP_CONCAT(item_name SEPARATOR ' + ') AS order_summary FROM order_items GROUP BY order_id;`",
    explanation: "Order line item aggregation.",
    hint: "GROUP_CONCAT(item_name SEPARATOR ' + ').",
    level: "basic"
  },
  {
    question: "Can `GROUP_CONCAT()` be used without a `GROUP BY` clause on an entire table?",
    shortAnswer: "YES. It concatenates all rows in the entire table into a single scalar string.",
    explanation: "Table-wide global string aggregation.",
    hint: "Yes, it concatenates all rows into a single string across the entire table.",
    level: "basic"
  },
  {
    question: "What is the return data type of `GROUP_CONCAT()` in MySQL?",
    shortAnswer: "It returns a `VARCHAR` or `BLOB/TEXT` string depending on the length of the result and character set.",
    explanation: "Return data type of GROUP_CONCAT.",
    hint: "VARCHAR or TEXT/BLOB.",
    level: "moderate"
  },
  {
    question: "How do you aggregate unique tags assigned to blog articles (e.g. `'React, MySQL, Tailwind'`)?",
    shortAnswer: "`SELECT article_id, GROUP_CONCAT(DISTINCT tag_name ORDER BY tag_name ASC SEPARATOR ', ') AS tags FROM article_tags GROUP BY article_id;`",
    explanation: "Tag aggregation with DISTINCT and ORDER BY.",
    hint: "GROUP_CONCAT(DISTINCT tag_name ORDER BY tag_name ASC SEPARATOR ', ').",
    level: "basic"
  },
  {
    question: "Why does `GROUP_CONCAT()` return `NULL` if one of the expressions in `GROUP_CONCAT(CONCAT(first, last))` has a NULL value?",
    shortAnswer: "Because `CONCAT()` returns `NULL` if any argument is NULL (NULL poisoning). To fix this, use `CONCAT_WS()` or `COALESCE()` inside `GROUP_CONCAT()`.",
    explanation: "NULL poisoning prevention in nested CONCAT.",
    hint: "CONCAT() returns NULL on NULL inputs; use CONCAT_WS() or COALESCE().",
    level: "expert"
  },
  {
    question: "Can you sort by a column that is not present in the SELECT expression inside `GROUP_CONCAT()`?",
    shortAnswer: "YES. For example, `GROUP_CONCAT(student_name ORDER BY admission_date DESC SEPARATOR ', ')` sorts the names by their admission date.",
    explanation: "Sorting by unprojected columns in GROUP_CONCAT.",
    hint: "Yes, you can ORDER BY any column available in the group.",
    level: "moderate"
  },
  {
    question: "How do you generate an HTML bulleted list (`<li>...</li>`) of course topics using `GROUP_CONCAT()`?",
    shortAnswer: "`SELECT CONCAT('<ul><li>', GROUP_CONCAT(topic_title SEPARATOR '</li><li>'), '</li></ul>') AS html_list FROM topics GROUP BY module_id;`",
    explanation: "Dynamic HTML markup generation via GROUP_CONCAT.",
    hint: "CONCAT('<ul><li>', GROUP_CONCAT(topic SEPARATOR '</li><li>'), '</li></ul>').",
    level: "expert"
  },
  {
    question: "How does `GROUP_CONCAT()` interact with character sets like `utf8mb4`?",
    shortAnswer: "`GROUP_CONCAT()` respects the character set and collation of the input columns, ensuring multi-byte characters and Bengali text ('কলকাতা', 'ব্যারাকপুর') are preserved without encoding corruption.",
    explanation: "Character set and collation handling in GROUP_CONCAT.",
    hint: "Preserves utf8mb4 multi-byte characters and regional scripts.",
    level: "moderate"
  },
  {
    question: "Can `GROUP_CONCAT()` be filtered using the `HAVING` clause?",
    shortAnswer: "YES. For example: `HAVING COUNT(*) >= 3` or `HAVING GROUP_CONCAT(skills) LIKE '%React%'`.",
    explanation: "Filtering grouped concatenated strings with HAVING.",
    hint: "Yes, HAVING can filter groups based on GROUP_CONCAT expressions.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding `GROUP_CONCAT()`?",
    shortAnswer: "Use `GROUP_CONCAT()` to collapse 1:N relations into compact delimited lists for UI badges and reports; always add `DISTINCT` and `ORDER BY` for determinism, and monitor `group_concat_max_len`.",
    explanation: "Final summary takeaway for Topic 10 in Module 6.",
    hint: "Use GROUP_CONCAT for 1:N string rollups; use DISTINCT/ORDER BY and watch group_concat_max_len.",
    level: "basic"
  }
];

export default questions;
