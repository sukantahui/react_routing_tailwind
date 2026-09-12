// topic18_files/topic18_questions.js

const questions = [
  {
    question: "Why should we always use DECIMAL instead of FLOAT or DOUBLE for financial amounts in MySQL schemas?",
    shortAnswer: "DECIMAL stores exact fixed-point numbers, preventing binary floating-point rounding errors and paisa discrepancies in financial balances.",
    explanation: "FLOAT and DOUBLE are binary approximations governed by IEEE 754. In contrast, DECIMAL stores exact base-10 digits in binary packs, ensuring that monetary transactions, invoice totals, and account balances remain 100% mathematically exact.",
    hint: "Think about financial audits and preventing fractional cent/paisa rounding errors.",
    level: "basic",
    codeExample: "unit_price DECIMAL(10, 2) NOT NULL"
  },
  {
    question: "Why does `WHERE discharge_date = NULL` return no rows, and what is the correct syntax?",
    shortAnswer: "In three-valued SQL logic, comparison with NULL yields UNKNOWN. The correct syntax is `WHERE discharge_date IS NULL`.",
    explanation: "In SQL, NULL represents the absence of a value or an unknown state. Comparing anything to NULL with '=' evaluates to UNKNOWN (neither TRUE nor FALSE). To check for the presence or absence of NULL, use `IS NULL` or `IS NOT NULL`.",
    hint: "SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN.",
    level: "basic",
    codeExample: "SELECT * FROM admissions WHERE discharge_date IS NULL;"
  },
  {
    question: "What is the structural difference between `TRUNCATE TABLE` and `DROP TABLE` in MySQL?",
    shortAnswer: "TRUNCATE deletes all rows and resets AUTO_INCREMENT while preserving the table schema; DROP deletes both data and the schema definition.",
    explanation: "TRUNCATE TABLE is a fast DDL command that deallocates data pages and recreates the table empty, keeping column definitions, indexes, and constraints intact. DROP TABLE permanently wipes the data and deletes the table definition from the data dictionary.",
    hint: "Emptying a filing cabinet vs throwing the entire filing cabinet into the incinerator.",
    level: "moderate",
    codeExample: "TRUNCATE TABLE temp_leads; -- Keeps structure\nDROP TABLE temp_leads;     -- Deletes structure"
  },
  {
    question: "How does the single-character wildcard '_' differ from the multi-character wildcard '%' in SQL LIKE queries?",
    shortAnswer: "'_' matches exactly ONE single character, whereas '%' matches zero, one, or multiple characters.",
    explanation: "Pattern `EXP-_____` requires 'EXP-' followed by exactly 5 characters (e.g. 'EXP-10492'). In contrast, `EXP-%` would match 'EXP-1', 'EXP-10492', or 'EXP-ANYTHING'.",
    hint: "Exact character count matching vs arbitrary variable length matching.",
    level: "moderate",
    codeExample: "WHERE tracking_no LIKE 'EXP-_____'; -- Exactly 5 characters after hyphen"
  },
  {
    question: "How do you calculate the LIMIT and OFFSET parameters for Page N in SQL pagination?",
    shortAnswer: "For Page N with page size S, LIMIT is S and OFFSET is (N - 1) * S.",
    explanation: "To implement pagination for a web application displaying 10 items per page: Page 1 uses `LIMIT 10 OFFSET 0`, Page 2 uses `LIMIT 10 OFFSET 10`, and Page 3 uses `LIMIT 10 OFFSET 20`.",
    hint: "Offset is the number of preceding records to skip.",
    level: "moderate",
    codeExample: "-- Page 2 with 3 items per page:\nSELECT * FROM movies ORDER BY imdb_rating DESC LIMIT 3 OFFSET 3;"
  }
];

export default questions;
