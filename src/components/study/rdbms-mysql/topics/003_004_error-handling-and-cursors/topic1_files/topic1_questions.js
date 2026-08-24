// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the structural format of an ANSI standard SQLSTATE code?",
    shortAnswer: "A 5-character alphanumeric string consisting of a 2-character Class code followed by a 3-character Subclass code (e.g. `'23000'`).",
    explanation: "ANSI SQL standard SQLSTATE structure.",
    hint: "5 characters: 2-char class code + 3-char subclass code.",
    level: "basic"
  },
  {
    question: "What does SQLSTATE Class `'00'` represent?",
    shortAnswer: "Successful completion (`'00000'` indicates no error or warning occurred).",
    explanation: "Success status class.",
    hint: "Successful completion ('00000').",
    level: "basic"
  },
  {
    question: "What does SQLSTATE Class `'01'` represent?",
    shortAnswer: "A warning condition (e.g. data truncation or non-fatal condition).",
    explanation: "Warning status class.",
    hint: "Warning conditions.",
    level: "basic"
  },
  {
    question: "What does SQLSTATE Class `'02'` represent?",
    shortAnswer: "No data found / `NOT FOUND` (e.g. when a cursor reaches the end of a dataset).",
    explanation: "No data / cursor exhaustion status class.",
    hint: "No data / NOT FOUND.",
    level: "basic"
  },
  {
    question: "What does SQLSTATE Class `'23'` represent?",
    shortAnswer: "Integrity constraint violations (`'23000'` covers duplicate primary keys, foreign key violations, and NOT NULL violations).",
    explanation: "Integrity constraint violation status class.",
    hint: "Integrity constraint violations (duplicate keys, foreign keys).",
    level: "basic"
  },
  {
    question: "What does SQLSTATE Class `'40'` represent?",
    shortAnswer: "Transaction rollback / serialization failures (`'40001'` covers deadlock detection).",
    explanation: "Transaction rollback and deadlock status class.",
    hint: "Transaction rollback / deadlock.",
    level: "basic"
  },
  {
    question: "What does SQLSTATE Class `'42'` represent?",
    shortAnswer: "Syntax errors or access rule violations (e.g. `'42S02'` Table not found, `'42000'` Syntax error).",
    explanation: "Syntax and catalog rule violation status class.",
    hint: "Syntax errors or access rule violations.",
    level: "basic"
  },
  {
    question: "What does SQLSTATE Class `'45'` represent?",
    shortAnswer: "User-defined custom exceptions raised explicitly via the `SIGNAL` or `RESIGNAL` statement (`'45000'`).",
    explanation: "User-defined application exception status class.",
    hint: "User-defined exception raised via SIGNAL ('45000').",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate MySQL Error Numbers vs SQLSTATE?",
    shortAnswer: "When inserting duplicate student Mamata (ID 101), MySQL raises Error Number `1062` corresponding to ANSI SQLSTATE `'23000'`; when referencing a non-existent department for Susmita, Error `1452` also maps to SQLSTATE `'23000'`.",
    explanation: "Concrete mapping of error codes on student operations.",
    hint: "Error 1062 and 1452 both map to ANSI SQLSTATE '23000'.",
    level: "basic"
  },
  {
    question: "What is the MySQL error number for Duplicate Entry on a PRIMARY/UNIQUE key?",
    shortAnswer: "`1062` (`ER_DUP_ENTRY`).",
    explanation: "Duplicate key error code in MySQL.",
    hint: "Error 1062.",
    level: "basic"
  },
  {
    question: "What is the MySQL error number for Foreign Key Constraint Failure?",
    shortAnswer: "`1452` (`ER_NO_REFERENCED_ROW_2`).",
    explanation: "Foreign key reference error code in MySQL.",
    hint: "Error 1452.",
    level: "basic"
  },
  {
    question: "What is the MySQL error number for Table Does Not Exist?",
    shortAnswer: "`1146` (`ER_NO_SUCH_TABLE`, SQLSTATE `'42S02'`).",
    explanation: "Missing table error code in MySQL.",
    hint: "Error 1146.",
    level: "basic"
  },
  {
    question: "What is the MySQL error number for Deadlock Found when Trying to Get Lock?",
    shortAnswer: "`1213` (`ER_LOCK_DEADLOCK`, SQLSTATE `'40001'`).",
    explanation: "Deadlock error code in InnoDB.",
    hint: "Error 1213.",
    level: "basic"
  },
  {
    question: "What is the MySQL error number for Division by Zero?",
    shortAnswer: "`1365` (`ER_DIVISION_BY_ZERO`, SQLSTATE `'22012'`).",
    explanation: "Division by zero error code in MySQL.",
    hint: "Error 1365.",
    level: "basic"
  },
  {
    question: "What is the MySQL error number for Column Cannot Be Null?",
    shortAnswer: "`1048` (`ER_BAD_NULL_ERROR`, SQLSTATE `'23000'`).",
    explanation: "NOT NULL constraint violation error code.",
    hint: "Error 1048.",
    level: "basic"
  },
  {
    question: "How do you declare a handler using an ANSI SQLSTATE string in MySQL?",
    shortAnswer: "`DECLARE EXIT HANDLER FOR SQLSTATE '23000' BEGIN ROLLBACK; END;`.",
    explanation: "SQLSTATE handler declaration syntax.",
    hint: "DECLARE EXIT HANDLER FOR SQLSTATE '23000' ...",
    level: "basic"
  },
  {
    question: "How do you declare a handler using a raw MySQL Error Number?",
    shortAnswer: "`DECLARE EXIT HANDLER FOR 1062 BEGIN ROLLBACK; END;`.",
    explanation: "MySQL error number handler declaration syntax.",
    hint: "DECLARE EXIT HANDLER FOR 1062 ...",
    level: "basic"
  },
  {
    question: "Why do enterprise database architects prefer handling by SQLSTATE over MySQL error numbers when possible?",
    shortAnswer: "Because SQLSTATE codes are standard ANSI SQL compliant, ensuring portability and consistent error categorization across diverse database engines (PostgreSQL, Oracle, MySQL).",
    explanation: "Portability advantage of ANSI SQLSTATE.",
    hint: "ANSI SQLSTATE provides cross-database standard portability.",
    level: "expert"
  },
  {
    question: "When is it advantageous to catch a specific MySQL Error Number (e.g. `1062`) instead of SQLSTATE `'23000'`?",
    shortAnswer: "When you need to differentiate specifically between a Duplicate Key (1062) and a Foreign Key violation (1452), since both share the broad SQLSTATE `'23000'`.",
    explanation: "Granular error discrimination.",
    hint: "When distinguishing duplicate keys from foreign key violations that share SQLSTATE '23000'.",
    level: "expert"
  },
  {
    question: "Can multiple MySQL error numbers map to the exact same SQLSTATE code?",
    shortAnswer: "YES; for example, Errors 1062 (Duplicate entry), 1452 (Foreign key), and 1048 (Null violation) all map to SQLSTATE `'23000'`.",
    explanation: "Many-to-one mapping between error numbers and SQLSTATE.",
    hint: "Yes, multiple error numbers map into a single SQLSTATE class.",
    level: "basic"
  },
  {
    question: "What is the SQLSTATE code for Data Truncation (e.g., string exceeds VARCHAR length)?",
    shortAnswer: "`'22001'` (String data right truncation).",
    explanation: "Data truncation SQLSTATE code.",
    hint: "SQLSTATE '22001'.",
    level: "moderate"
  },
  {
    question: "How do you create a named condition for Deadlock Error 1213?",
    shortAnswer: "`DECLARE deadlock_error CONDITION FOR 1213;` (or `DECLARE deadlock_error CONDITION FOR SQLSTATE '40001';`).",
    explanation: "Creating named conditions for deadlock exceptions.",
    hint: "DECLARE deadlock_error CONDITION FOR 1213;",
    level: "basic"
  },
  {
    question: "What built-in statement extracts the current statement's SQLSTATE code?",
    shortAnswer: "`GET DIAGNOSTICS CONDITION 1 @state = RETURNED_SQLSTATE;`.",
    explanation: "Diagnostics area SQLSTATE extraction.",
    hint: "GET DIAGNOSTICS CONDITION 1 @state = RETURNED_SQLSTATE;",
    level: "expert"
  },
  {
    question: "What built-in statement extracts the current statement's vendor MySQL error number?",
    shortAnswer: "`GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO;`.",
    explanation: "Diagnostics area MySQL error number extraction.",
    hint: "GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO;",
    level: "expert"
  },
  {
    question: "Can an application query the MySQL error message using `MESSAGE_TEXT`?",
    shortAnswer: "YES; `GET DIAGNOSTICS CONDITION 1 @msg = MESSAGE_TEXT;` extracts the human-readable explanation.",
    explanation: "Message text extraction in stored procedures.",
    hint: "GET DIAGNOSTICS CONDITION 1 @msg = MESSAGE_TEXT;",
    level: "basic"
  },
  {
    question: "What is SQLSTATE `'HY000'`?",
    shortAnswer: "A generic / CLI specific vendor error code used when no specific ANSI SQLSTATE mapping exists.",
    explanation: "Generic fallback SQLSTATE.",
    hint: "Generic CLI/vendor-specific fallback SQLSTATE.",
    level: "moderate"
  },
  {
    question: "What SQLSTATE should custom business rule violations raised via `SIGNAL` always use?",
    shortAnswer: "Class `'45'` (specifically `'45000'`), which is reserved exclusively for user-defined application exceptions.",
    explanation: "Standard user exception class code.",
    hint: "SQLSTATE '45000' (Class 45 for user exceptions).",
    level: "basic"
  },
  {
    question: "How do you inspect the server-level error message file in MySQL?",
    shortAnswer: "`SHOW VARIABLES LIKE 'lc_messages_dir';` and `SHOW VARIABLES LIKE 'lc_messages';`.",
    explanation: "Server localized error message configuration.",
    hint: "SHOW VARIABLES LIKE 'lc_messages%';",
    level: "moderate"
  },
  {
    question: "What happens if you declare two handlers in the same block for `SQLSTATE '23000'` and `1062`?",
    shortAnswer: "For a duplicate key error, the `1062` handler executes (more specific); for a foreign key error, the `'23000'` handler executes.",
    explanation: "Handler resolution specificity in MySQL.",
    hint: "The 1062 handler runs for duplicates; SQLSTATE '23000' runs for foreign keys.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for MySQL Error Codes and SQLSTATE Values?",
    shortAnswer: "Understand the taxonomy: use ANSI SQLSTATE codes (like `'23000'`, `'40001'`, `'45000'`) for broad standard exception handling; use vendor error numbers (`1062`, `1452`) when you need precise discrimination between sub-conditions; and use `GET DIAGNOSTICS` to record both in your production error logs.",
    explanation: "Authoritative architectural best practices for error code handling.",
    hint: "SQLSTATE for standard categories + error numbers for precise sub-types + GET DIAGNOSTICS for telemetry.",
    level: "expert"
  }
];

export default questions;
