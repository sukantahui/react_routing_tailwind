// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What are the five integer data types in MySQL and their respective byte sizes?",
    shortAnswer: "1) `TINYINT` (1 Byte),\n2) `SMALLINT` (2 Bytes),\n3) `MEDIUMINT` (3 Bytes),\n4) `INT` / `INTEGER` (4 Bytes),\n5) `BIGINT` (8 Bytes).",
    explanation: "Standard binary integer sizes governing maximum numerical ranges.",
    hint: "TINYINT (1B), SMALLINT (2B), MEDIUMINT (3B), INT (4B), BIGINT (8B).",
    level: "basic"
  },
  {
    question: "What is the numerical range difference between `INT SIGNED` and `INT UNSIGNED`?",
    shortAnswer: "- `INT SIGNED`: **-2,147,483,648 to +2,147,483,647** (approx. -2.14 to +2.14 Billion)\n- `INT UNSIGNED`: **0 to 4,294,967,295** (approx. 0 to 4.29 Billion).",
    explanation: "UNSIGNED shifts the negative range to double the positive capacity.",
    hint: "SIGNED is -2.14B to +2.14B; UNSIGNED is 0 to 4.29 Billion.",
    level: "basic"
  },
  {
    question: "Why was the display width specification in integer data types (like `INT(11)` or `TINYINT(4)`) deprecated in MySQL 8.0?",
    shortAnswer: "Because the display width was **purely visual formatting metadata** for client zero-padding (`ZEROFILL`) and had **zero effect on storage size or numerical range**; an `INT(4)` still stored the full 4-byte range.",
    explanation: "Deprecated in MySQL 8.0.17+ to eliminate developer confusion.",
    hint: "It only affected visual formatting with ZEROFILL, not storage size or numerical range.",
    level: "expert"
  },
  {
    question: "What does `DECIMAL(10, 2)` specify in MySQL?",
    shortAnswer: "- **Precision (10)**: Total number of significant digits (both sides of the decimal point);\n- **Scale (2)**: Number of digits stored to the right of the decimal point;\n- Can store numbers from `-99,999,999.99` to `+99,999,999.99` with 100% exact mathematical accuracy.",
    explanation: "The universal standard for storing currency amounts (e.g. ₹12,500.50).",
    hint: "Total 10 digits with 2 digits after the decimal point (exact fixed-point).",
    level: "basic"
  },
  {
    question: "Why should `FLOAT` or `DOUBLE` NEVER be used to store monetary balances or currency values?",
    shortAnswer: "Because `FLOAT` and `DOUBLE` use **IEEE 754 Binary Floating-Point representation**, which cannot represent base-10 decimal fractions exactly, producing cumulative rounding errors (e.g. `0.1 + 0.2 = 0.30000000000000004`).",
    explanation: "Financial ledgers and tax audits require 100% exact precision provided by DECIMAL.",
    hint: "Because binary floating point causes precision rounding errors in monetary calculations.",
    level: "basic",
    codeExample: "-- Inaccurate in FLOAT:\nSELECT CAST(0.1 AS FLOAT) + CAST(0.2 AS FLOAT) AS float_res;\n\n-- 100% Exact in DECIMAL:\nSELECT CAST(0.1 AS DECIMAL(10,2)) + CAST(0.2 AS DECIMAL(10,2)) AS decimal_res;\n-- Output: 0.30"
  },
  {
    question: "How does MySQL physically store `DECIMAL` numbers in memory and on disk?",
    shortAnswer: "It packs groups of **9 decimal digits into 4 bytes** binary chunks, storing the integer and fractional parts separately to achieve high density and exact arithmetic in CPU.",
    explanation: "Provides high storage efficiency for exact fixed-point numbers.",
    hint: "Packs groups of 9 decimal digits into 4-byte binary chunks.",
    level: "expert"
  },
  {
    question: "What is the maximum precision (`M`) and scale (`D`) supported by `DECIMAL` in MySQL?",
    shortAnswer: "- Maximum Precision ($M$): **65 Digits**;\n- Maximum Scale ($D$): **30 Digits**.",
    explanation: "Accommodates massive astronomical and high-precision financial calculations.",
    hint: "Maximum precision M = 65 digits; maximum scale D = 30 digits.",
    level: "expert"
  },
  {
    question: "What happens when an `INSERT` statement exceeds the maximum range of an integer column under strict SQL mode?",
    shortAnswer: "The transaction fails with **MySQL Error 1264 (22003): Out of range value for column '...' at row 1**.",
    explanation: "Strict SQL mode prevents silent value clamping to ensure data integrity.",
    hint: "Throws Error 1264: Out of range value for column.",
    level: "basic"
  },
  {
    question: "When should a Primary Key column be defined as `BIGINT UNSIGNED` instead of `INT UNSIGNED`?",
    shortAnswer: "When a table is expected to exceed **4.29 Billion rows** over its lifecycle (e.g. high-volume financial transaction ledgers, telemetry logs, event streams, or clickstream records).",
    explanation: "Prevents auto-increment sequence exhaustion.",
    hint: "When table row count could exceed 4.29 billion records (BIGINT supports up to 18.44 Quintillion).",
    level: "basic"
  },
  {
    question: "What is the consequence of reaching the maximum value of an `AUTO_INCREMENT` column?",
    shortAnswer: "All subsequent `INSERT` operations will fail with **Error 1062: Duplicate entry for key 'PRIMARY'**, causing a complete application write outage until the column data type is expanded.",
    explanation: "The famous 'Auto-Increment Exhaustion' disaster.",
    hint: "Subsequent inserts fail with Duplicate Key Error 1062, halting all write operations.",
    level: "expert"
  },
  {
    question: "What are the storage sizes and precisions of `FLOAT` vs `DOUBLE` in MySQL?",
    shortAnswer: "- `FLOAT`: **4 Bytes** (single precision, approx. 7 decimal digits precision);\n- `DOUBLE`: **8 Bytes** (double precision, approx. 15 decimal digits precision).",
    explanation: "Standard IEEE 754 single and double precision floats.",
    hint: "FLOAT is 4 bytes (~7 digits); DOUBLE is 8 bytes (~15 digits).",
    level: "basic"
  },
  {
    question: "What is the `BIT(M)` data type in MySQL?",
    shortAnswer: "A data type used to store bitfield values from $1$ to $64$ bits (e.g. `BIT(1)` for boolean flags `0` or `1`, or `BIT(8)` for 8-bit permission bitmasks).",
    explanation: "Saves storage for boolean and bitmask flags.",
    hint: "Stores bit values from 1 to 64 bits (ideal for booleans and permission masks).",
    level: "basic",
    codeExample: "CREATE TABLE user_permissions (\n  user_id INT PRIMARY KEY,\n  is_active BIT(1) DEFAULT b'1',\n  permission_mask BIT(8) DEFAULT b'00000001'\n);"
  },
  {
    question: "What is the difference between `BOOLEAN` / `BOOL` and `TINYINT(1)` in MySQL?",
    shortAnswer: "`BOOLEAN` and `BOOL` are **syntactic synonyms for `TINYINT(1)`**; MySQL stores `TRUE` as the integer `1` and `FALSE` as `0`.",
    explanation: "MySQL has no separate internal 1-bit boolean data type.",
    hint: "BOOLEAN is an alias for TINYINT(1) where 1=TRUE and 0=FALSE.",
    level: "basic"
  },
  {
    question: "Why does `SELECT 0.1 + 0.2 = 0.3` return `FALSE` (0) when using floating-point numbers in SQL?",
    shortAnswer: "Because `0.1` and `0.2` in binary floating-point representation are repeating non-terminating binary fractions that introduce subtle rounding discrepancies at the 17th decimal place.",
    explanation: "Demonstrates the mathematical nature of IEEE 754 floating point.",
    hint: "Because non-terminating binary fractions introduce subtle rounding variations.",
    level: "basic"
  },
  {
    question: "What is the recommended data type for storing Indian Rupee (`₹`) transaction amounts in an accounting database?",
    shortAnswer: "**`DECIMAL(15, 2)`** (or `DECIMAL(18, 4)` for micro-interest calculations), which allows storing up to ₹999,999,999,999.99 (999 Billion Rupees) with exact paise accuracy.",
    explanation: "Standard enterprise financial accounting specification.",
    hint: "DECIMAL(15, 2) or DECIMAL(18, 4) for exact currency amounts and interest precision.",
    level: "basic"
  },
  {
    question: "What is the `UNSIGNED` attribute behavior on `FLOAT` and `DOUBLE` in MySQL 8.0?",
    shortAnswer: "`UNSIGNED` on `FLOAT`, `DOUBLE`, and `DECIMAL` is **deprecated in MySQL 8.0**; DBAs should use `CHECK (col >= 0)` constraints instead to enforce non-negative values.",
    explanation: "Standardized SQL compliance in modern MySQL.",
    hint: "Deprecated in MySQL 8.0; use CHECK constraints (col >= 0) instead.",
    level: "expert"
  },
  {
    question: "How many bytes does `DECIMAL(10, 2)` consume on disk?",
    shortAnswer: "**5 Bytes total**:\n- 8 integer digits → 4 bytes\n- 2 fraction digits → 1 byte\n- Total: 5 bytes.",
    explanation: "Calculated based on MySQL's 9-digit 4-byte packed decimal algorithm.",
    hint: "5 bytes (4 bytes for 8 integer digits + 1 byte for 2 fraction digits).",
    level: "expert"
  },
  {
    question: "What is the advantage of using `TINYINT UNSIGNED` for an `age` or `rating` column?",
    shortAnswer: "It consumes only **1 Byte** per row (range 0 to 255), saving 3 bytes per row compared to `INT` (4 bytes), which saves 30 MB per 10 million rows and maximizes Buffer Pool cache density.",
    explanation: "Right-sizing integer columns optimizes memory and storage footprint.",
    hint: "Consumes only 1 byte per row, saving 75% memory and disk compared to INT.",
    level: "basic"
  },
  {
    question: "How do you inspect the current auto-increment counter value of an `AUTO_INCREMENT` table?",
    shortAnswer: "Query `information_schema.tables`: `SELECT auto_increment FROM information_schema.tables WHERE table_name = 'orders';`",
    explanation: "Allows proactive monitoring of auto-increment sequence consumption.",
    hint: "Query auto_increment from information_schema.tables.",
    level: "basic",
    codeExample: "SELECT table_name, auto_increment \nFROM information_schema.tables \nWHERE table_schema = 'college_admissions' AND table_name = 'students';"
  },
  {
    question: "What is the primary architectural takeaway of Topic 5 in Module 004_002?",
    shortAnswer: "Choosing the correct numeric data type prevents catastrophic failures: always use `DECIMAL` for exact financial and currency ledgers, right-size integer types (`TINYINT` to `BIGINT`) to optimize memory, size Primary Keys to `BIGINT UNSIGNED` on high-volume tables to avoid auto-increment exhaustion, and restrict `FLOAT/DOUBLE` to scientific metrics.",
    explanation: "Fundamental knowledge for building accurate, scalable, and crash-free financial and enterprise systems.",
    hint: "DECIMAL for exact finance, right-sized integers for memory, and BIGINT for scalable primary keys.",
    level: "basic"
  }
];

export default questions;
