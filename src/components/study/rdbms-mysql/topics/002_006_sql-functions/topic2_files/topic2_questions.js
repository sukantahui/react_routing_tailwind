// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What are the synonyms for `UPPER()` and `LOWER()` in MySQL?",
    shortAnswer: "`UCASE()` and `LCASE()`.",
    explanation: "Synonyms for case conversion functions.",
    hint: "UCASE() and LCASE().",
    level: "basic"
  },
  {
    question: "What does `TRIM('   Barrackpore   ')` return?",
    shortAnswer: "`'Barrackpore'` (removes both leading and trailing whitespace).",
    explanation: "Default whitespace trimming.",
    hint: "'Barrackpore'",
    level: "basic"
  },
  {
    question: "How do you remove only leading (left-side) spaces in SQL?",
    shortAnswer: "Using `LTRIM(str)`.",
    explanation: "LTRIM function.",
    hint: "LTRIM().",
    level: "basic"
  },
  {
    question: "How do you strip leading zeros from a string like '000105' using `TRIM()`?",
    shortAnswer: "`SELECT TRIM(LEADING '0' FROM '000105');` (returns '105').",
    explanation: "TRIM LEADING specific character.",
    hint: "TRIM(LEADING '0' FROM str).",
    level: "moderate"
  },
  {
    question: "How does `REPLACE('983-000-1234', '-', '')` work?",
    shortAnswer: "It replaces all occurrences of the hyphen `'-'` with an empty string `''`, returning `'9830001234'`.",
    explanation: "Deleting characters using REPLACE.",
    hint: "Replaces all hyphens with empty string: '9830001234'.",
    level: "basic"
  },
  {
    question: "Is `REPLACE()` in MySQL case-sensitive by default?",
    shortAnswer: "YES. In standard collation searches, `REPLACE('Cat cat', 'cat', 'dog')` only replaces the lowercase instance, returning `'Cat dog'`.",
    explanation: "Case sensitivity in REPLACE.",
    hint: "Yes, case-sensitive in default binary/utf8 collations.",
    level: "moderate"
  },
  {
    question: "What does `LPAD('101', 6, '0')` return?",
    shortAnswer: "`'000101'` (left-pads with zeros until total length is 6 characters).",
    explanation: "LPAD sequence formatting.",
    hint: "'000101'",
    level: "basic"
  },
  {
    question: "What happens if the target length `len` in `LPAD('Barrackpore', 4, '*')` is smaller than the string length?",
    shortAnswer: "The string is TRUNCATED to 4 characters, returning `'Barr'`.",
    explanation: "Truncation behavior in LPAD/RPAD.",
    hint: "Truncates the string to the target length: 'Barr'.",
    level: "moderate"
  },
  {
    question: "In academy reporting, how do you format an invoice code as 'INV-000042' from `invoice_id = 42`?",
    shortAnswer: "`SELECT CONCAT('INV-', LPAD(invoice_id, 6, '0')) AS invoice_code;`",
    explanation: "Invoice code formatting with CONCAT and LPAD.",
    hint: "CONCAT('INV-', LPAD(invoice_id, 6, '0')).",
    level: "basic"
  },
  {
    question: "What does `RPAD('MySQL', 10, '.')` return?",
    shortAnswer: "`'MySQL.....'` (right-pads with dots until total length is 10).",
    explanation: "RPAD right-side padding.",
    hint: "'MySQL.....'",
    level: "basic"
  },
  {
    question: "In user authentication, why is `LOWER(TRIM(email))` recommended before saving or querying user emails?",
    shortAnswer: "To prevent duplicate accounts and login failures caused by accidental trailing spaces or inconsistent upper/lowercase casing.",
    explanation: "Email standardization best practice.",
    hint: "Eliminates accidental spaces and standardizes case.",
    level: "basic"
  },
  {
    question: "What does `TRIM(BOTH 'x' FROM 'xxxMamataxxx')` return?",
    shortAnswer: "`'Mamata'`.",
    explanation: "TRIM BOTH specific character.",
    hint: "'Mamata'",
    level: "basic"
  },
  {
    question: "Can `REPLACE()` replace multiple different characters in a single function call?",
    shortAnswer: "NO. To replace multiple different characters (e.g. hyphens and spaces), you must chain multiple `REPLACE()` calls: `REPLACE(REPLACE(str, '-', ''), ' ', '')`.",
    explanation: "Chaining REPLACE function calls.",
    hint: "No, requires nesting/chaining multiple REPLACE calls.",
    level: "basic"
  },
  {
    question: "What is `INSERT(str, pos, len, newstr)` in MySQL?",
    shortAnswer: "Replaces `len` characters in string `str` starting at position `pos` with the new string `newstr`.",
    explanation: "INSERT string function in MySQL.",
    hint: "Substitutes a slice of a string at a specific position.",
    level: "moderate"
  },
  {
    question: "What does `REPEAT('₹', 5)` return?",
    shortAnswer: "`'₹₹₹₹₹'` (repeats the string 5 times).",
    explanation: "REPEAT string function.",
    hint: "'₹₹₹₹₹'",
    level: "basic"
  },
  {
    question: "What does `REVERSE('Barrackpore')` return?",
    shortAnswer: "`'eropkcarraB'` (reverses the character order of the string).",
    explanation: "REVERSE string function.",
    hint: "'eropkcarraB'",
    level: "basic"
  },
  {
    question: "In banking EDI file exports, how do you format customer names to a strict fixed width of 30 characters padded with spaces?",
    shortAnswer: "`SELECT RPAD(SUBSTRING(customer_name, 1, 30), 30, ' ') AS fixed_name FROM customers;`",
    explanation: "Fixed-width banking file formatting.",
    hint: "RPAD(SUBSTRING(name, 1, 30), 30, ' ').",
    level: "moderate"
  },
  {
    question: "What does `SPACE(5)` return in MySQL?",
    shortAnswer: "A string consisting of 5 space characters (`'     '`).",
    explanation: "SPACE string generator function.",
    hint: "A string of 5 spaces.",
    level: "basic"
  },
  {
    question: "In phone number sanitation, how do you strip country code prefix '+91' from '+919830001234'?",
    shortAnswer: "`SELECT REPLACE(phone, '+91', '');` or `SUBSTRING(phone, 4)`.",
    explanation: "Phone number prefix stripping.",
    hint: "REPLACE(phone, '+91', '') or SUBSTRING(phone, 4).",
    level: "basic"
  },
  {
    question: "What does `TRIM(TRAILING '/' FROM 'https://codernaccotax.co.in/')` return?",
    shortAnswer: "`'https://codernaccotax.co.in'` (strips trailing forward slash).",
    explanation: "TRIM TRAILING specific character.",
    hint: "Strips trailing slash from URL.",
    level: "basic"
  },
  {
    question: "What is the output of `SELECT UPPER(NULL);`?",
    shortAnswer: "`NULL`.",
    explanation: "NULL handling in scalar case functions.",
    hint: "NULL.",
    level: "basic"
  },
  {
    question: "What does `LEFT(str, len)` and `RIGHT(str, len)` do in MySQL?",
    shortAnswer: "`LEFT()` extracts `len` characters from the beginning of string; `RIGHT()` extracts `len` characters from the end of string.",
    explanation: "LEFT and RIGHT string convenience functions.",
    hint: "Extracts N characters from the left or right side of string.",
    level: "basic"
  },
  {
    question: "What does `RIGHT('Debangshu', 3)` return?",
    shortAnswer: "`'shu'` (the rightmost 3 characters).",
    explanation: "RIGHT function evaluation.",
    hint: "'shu'",
    level: "basic"
  },
  {
    question: "In data migration, how do you sanitize stray carriage returns (`\\r`) and newlines (`\\n`) from text fields?",
    shortAnswer: "`SELECT REPLACE(REPLACE(description, '\\r', ''), '\\n', ' ') FROM notes;`",
    explanation: "Cleaning newline and carriage return characters.",
    hint: "Chained REPLACE on '\\r' and '\\n'.",
    level: "moderate"
  },
  {
    question: "Can `LPAD()` and `RPAD()` use multi-character padding strings (e.g. `LPAD('1', 5, 'ab')`)?",
    shortAnswer: "YES. It repeats the multi-character pattern until the target length is met (e.g. `'abab1'`).",
    explanation: "Multi-character padding strings.",
    hint: "Yes, repeats the pattern: 'abab1'.",
    level: "moderate"
  },
  {
    question: "What is `ELT(N, str1, str2, ...)` in MySQL?",
    shortAnswer: "Returns the $N^{\\text{th}}$ string from the argument list (e.g. `ELT(2, 'A', 'B', 'C')` returns `'B'`).",
    explanation: "ELT string list lookup function.",
    hint: "Returns the Nth element from the list.",
    level: "expert"
  },
  {
    question: "What is `FIELD(str, str1, str2, ...)` in MySQL?",
    shortAnswer: "Returns the 1-based index position of `str` in the argument list (or 0 if not found).",
    explanation: "FIELD position search function.",
    hint: "Returns index position of a string in an argument list.",
    level: "moderate"
  },
  {
    question: "In student sorting, how does `ORDER BY FIELD(status, 'ACTIVE', 'PENDING', 'SUSPENDED')` work?",
    shortAnswer: "It sorts rows in the exact custom order defined in the `FIELD()` function rather than alphabetical order.",
    explanation: "Custom ordering using FIELD().",
    hint: "Sorts records in the custom sequence given in FIELD().",
    level: "moderate"
  },
  {
    question: "Why does `WHERE UPPER(student_name) = 'MAMATA'` hurt index lookup performance?",
    shortAnswer: "Because wrapping `student_name` in `UPPER()` is non-SARGable; in default case-insensitive collations (`_ci`), writing `WHERE student_name = 'MAMATA'` is already case-insensitive and uses the index directly.",
    explanation: "SARGability penalty of redundant UPPER().",
    hint: "Redundant in case-insensitive collations and disables index seek lookups.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding String Transformations?",
    shortAnswer: "`UPPER`, `LOWER`, and `TRIM` are essential for data sanitization, `REPLACE` enables global character substitution, and `LPAD`/`RPAD` guarantee standardized fixed-width format sequences.",
    explanation: "Final summary conclusion for Topic 2 in Module 6.",
    hint: "Use TRIM/UPPER for sanitization, REPLACE for substitution, and LPAD/RPAD for fixed-width formatting.",
    level: "basic"
  }
];

export default questions;
