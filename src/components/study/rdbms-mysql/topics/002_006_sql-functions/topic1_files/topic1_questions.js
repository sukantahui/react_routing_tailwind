// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What happens if any argument passed to `CONCAT('Hello', NULL, 'World')` is NULL?",
    shortAnswer: "The entire function returns `NULL` (NULL poisoning).",
    explanation: "CONCAT NULL behavior.",
    hint: "Returns NULL.",
    level: "basic"
  },
  {
    question: "What does `CONCAT_WS()` stand for, and how does it handle NULL arguments?",
    shortAnswer: "`CONCAT_WS` stands for 'Concatenate With Separator'; it skips `NULL` arguments and concatenates the remaining strings using the first argument as a delimiter.",
    explanation: "CONCAT_WS definition and NULL resilience.",
    hint: "Concatenate With Separator; skips NULL values.",
    level: "basic"
  },
  {
    question: "What is the output of `SELECT CONCAT_WS(', ', 'Mamata', NULL, 'Barrackpore');`?",
    shortAnswer: "`'Mamata, Barrackpore'` (the NULL middle argument is silently skipped).",
    explanation: "CONCAT_WS evaluation with NULL.",
    hint: "'Mamata, Barrackpore'",
    level: "basic"
  },
  {
    question: "In MySQL, is string indexing in `SUBSTRING()` 0-based or 1-based?",
    shortAnswer: "1-BASED (the first character is at position 1).",
    explanation: "1-based indexing in SQL strings.",
    hint: "1-based indexing.",
    level: "basic"
  },
  {
    question: "What does `SUBSTRING('Barrackpore', 1, 4)` return?",
    shortAnswer: "`'Barr'` (extracts 4 characters starting from index 1).",
    explanation: "Basic substring extraction.",
    hint: "'Barr'",
    level: "basic"
  },
  {
    question: "What does `SUBSTRING('Barrackpore', -4)` return?",
    shortAnswer: "`'pore'` (negative start index counts backwards from the end of the string).",
    explanation: "Negative index in SUBSTRING.",
    hint: "'pore'",
    level: "basic"
  },
  {
    question: "What is the critical difference between `LENGTH()` and `CHAR_LENGTH()` in MySQL?",
    shortAnswer: "`LENGTH()` returns the length in BYTES, while `CHAR_LENGTH()` returns the length in CHARACTERS / CODE POINTS.",
    explanation: "Byte length vs character count.",
    hint: "LENGTH measures bytes; CHAR_LENGTH measures characters.",
    level: "basic"
  },
  {
    question: "If a string contains the Bengali word 'কলকাতা' in `utf8mb4` encoding (where each Bengali letter is 3 bytes), what do `CHAR_LENGTH()` and `LENGTH()` return?",
    shortAnswer: "`CHAR_LENGTH('কলকাতা')` returns `6` characters; `LENGTH('কলকাতা')` returns `18` bytes.",
    explanation: "Multi-byte Unicode length disparity.",
    hint: "CHAR_LENGTH = 6; LENGTH = 18 bytes.",
    level: "moderate"
  },
  {
    question: "For an emoji string '🚀' in UTF-8 (`utf8mb4`), what does `LENGTH('🚀')` return and what does `CHAR_LENGTH('🚀')` return?",
    shortAnswer: "`LENGTH('🚀')` returns `4` bytes; `CHAR_LENGTH('🚀')` returns `1` character.",
    explanation: "4-byte UTF-8 emoji length.",
    hint: "LENGTH = 4 bytes; CHAR_LENGTH = 1 character.",
    level: "moderate"
  },
  {
    question: "Which function should always be used to validate form input maximum lengths (e.g. bio max 100 chars)?",
    shortAnswer: "`CHAR_LENGTH()` (or `CHARACTER_LENGTH()`).",
    explanation: "Character validation best practice.",
    hint: "CHAR_LENGTH().",
    level: "basic"
  },
  {
    question: "What is the synonym for `SUBSTRING()` in MySQL?",
    shortAnswer: "`SUBSTR()` and `MID()`.",
    explanation: "SUBSTRING function aliases.",
    hint: "SUBSTR() or MID().",
    level: "basic"
  },
  {
    question: "What is the standard ANSI SQL syntax for `SUBSTRING(str, pos, len)`?",
    shortAnswer: "`SUBSTRING(str FROM pos FOR len)`.",
    explanation: "ANSI SQL FROM...FOR syntax.",
    hint: "SUBSTRING(str FROM pos FOR len).",
    level: "moderate"
  },
  {
    question: "In student badge generation, write a query to create a badge code from `student_id` (e.g. 'S101') and first 3 letters of `name` ('MAM').",
    shortAnswer: "`SELECT CONCAT('BADGE-', SUBSTRING(student_id, 2), '-', UPPER(SUBSTRING(name, 1, 3))) AS badge_code;`",
    explanation: "Generating formatted badge codes with CONCAT and SUBSTRING.",
    hint: "CONCAT with SUBSTRING and UPPER.",
    level: "basic"
  },
  {
    question: "What does `CONCAT_WS(NULL, 'A', 'B')` return?",
    shortAnswer: "`NULL` (if the separator itself is NULL, the result is NULL).",
    explanation: "NULL separator in CONCAT_WS.",
    hint: "Returns NULL if separator is NULL.",
    level: "moderate"
  },
  {
    question: "What happens if `start_pos` in `SUBSTRING(str, start_pos, len)` exceeds the total string length?",
    shortAnswer: "It returns an empty string (`''`).",
    explanation: "Out-of-bounds start position.",
    hint: "Returns an empty string.",
    level: "basic"
  },
  {
    question: "What happens if `length` in `SUBSTRING(str, start_pos, length)` is 0 or negative?",
    shortAnswer: "It returns an empty string (`''`).",
    explanation: "Non-positive length in SUBSTRING.",
    hint: "Returns an empty string.",
    level: "basic"
  },
  {
    question: "In e-commerce, how do you mask a customer's 16-digit credit card number to show only the last 4 digits (e.g. '************1234')?",
    shortAnswer: "`SELECT CONCAT('************', SUBSTRING(card_number, -4)) AS masked_card;`",
    explanation: "Credit card masking using CONCAT and negative SUBSTRING.",
    hint: "CONCAT('************', SUBSTRING(card_number, -4)).",
    level: "basic"
  },
  {
    question: "What does `OCTET_LENGTH(str)` do in MySQL?",
    shortAnswer: "It is a synonym for `LENGTH(str)`, returning the byte count.",
    explanation: "OCTET_LENGTH synonym.",
    hint: "Synonym for LENGTH (returns byte count).",
    level: "moderate"
  },
  {
    question: "What is `BIT_LENGTH(str)` in MySQL?",
    shortAnswer: "Returns the length of the string measured in BITS ($8 \\times \\text{byte count}$).",
    explanation: "Bit length calculation.",
    hint: "Length in bits (bytes × 8).",
    level: "moderate"
  },
  {
    question: "In academy address printing, how do you format `(street, city, state, pincode)` so missing streets don't leave double commas?",
    shortAnswer: "`SELECT CONCAT_WS(', ', street, city, state, pincode) FROM student_addresses;`",
    explanation: "Clean address formatting with CONCAT_WS.",
    hint: "Use CONCAT_WS(', ', ...).",
    level: "basic"
  },
  {
    question: "What is the result of `SUBSTRING('CoderAccoTax', 6)`?",
    shortAnswer: "`'AccoTax'` (extracts from index 6 to the end of the string).",
    explanation: "SUBSTRING with start position only.",
    hint: "'AccoTax'",
    level: "basic"
  },
  {
    question: "Can `CONCAT()` accept numbers and dates directly without explicit `CAST()`?",
    shortAnswer: "YES. MySQL automatically coerces numbers and dates to strings inside `CONCAT()`.",
    explanation: "Implicit type coercion in CONCAT.",
    hint: "Yes, MySQL auto-converts numbers and dates to string.",
    level: "basic"
  },
  {
    question: "What is the maximum return length of `CONCAT()` or `CONCAT_WS()`?",
    shortAnswer: "Governed by the MySQL server variable `max_allowed_packet`.",
    explanation: "Maximum packet size limit.",
    hint: "max_allowed_packet system variable.",
    level: "expert"
  },
  {
    question: "In banking, how do you extract the 4-digit bank branch code from an IFSC code like 'HDFC0001234'?",
    shortAnswer: "`SELECT SUBSTRING('HDFC0001234', 1, 4);` (returns 'HDFC').",
    explanation: "IFSC code branch prefix extraction.",
    hint: "SUBSTRING(ifsc, 1, 4).",
    level: "basic"
  },
  {
    question: "What does `SUBSTRING_INDEX(str, delim, count)` do in MySQL?",
    shortAnswer: "Returns the substring from string `str` before `count` occurrences of delimiter `delim`.",
    explanation: "SUBSTRING_INDEX delimiter extraction.",
    hint: "Extracts substring before N occurrences of a delimiter.",
    level: "moderate"
  },
  {
    question: "How do you extract the domain name from an email 'mamata@codernaccotax.co.in' using `SUBSTRING_INDEX()`?",
    shortAnswer: "`SELECT SUBSTRING_INDEX('mamata@codernaccotax.co.in', '@', -1);` (returns 'codernaccotax.co.in').",
    explanation: "Extracting email domain with negative delimiter index.",
    hint: "SUBSTRING_INDEX(email, '@', -1).",
    level: "moderate"
  },
  {
    question: "What is the output of `SELECT LENGTH('');` and `SELECT CHAR_LENGTH('');`?",
    shortAnswer: "`0` and `0`.",
    explanation: "Empty string length.",
    hint: "0 and 0.",
    level: "basic"
  },
  {
    question: "What is the output of `SELECT LENGTH(NULL);` and `SELECT CHAR_LENGTH(NULL);`?",
    shortAnswer: "`NULL` and `NULL`.",
    explanation: "NULL string length evaluation.",
    hint: "NULL and NULL.",
    level: "basic"
  },
  {
    question: "Why does `WHERE SUBSTRING(phone_number, 1, 3) = '983'` disable standard B-Tree index range scans?",
    shortAnswer: "Because wrapping `phone_number` in `SUBSTRING()` is non-SARGable; the query should be written as `WHERE phone_number LIKE '983%'` to utilize the B-Tree index.",
    explanation: "SARGable string prefix matching.",
    hint: "Non-SARGable; rewrite as phone_number LIKE '983%'.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding basic String Functions?",
    shortAnswer: "`CONCAT_WS()` is superior to `CONCAT()` for nullable text, string indices are 1-based, and `CHAR_LENGTH()` must be used instead of `LENGTH()` for multi-byte Unicode text validation.",
    explanation: "Final summary conclusion for Topic 1 in Module 6.",
    hint: "Use CONCAT_WS for nullable text, remember 1-based indexing, and use CHAR_LENGTH for multi-byte UTF-8.",
    level: "basic"
  }
];

export default questions;
