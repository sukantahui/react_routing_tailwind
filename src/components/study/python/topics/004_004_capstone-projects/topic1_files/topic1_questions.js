// src/components/study/python/topics/004_004_capstone-projects/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Integrating SQLite / JSON persistence, OOP models, and business logic

const questions = [
  {
    question: "Why must you execute 'PRAGMA foreign_keys = ON;' on every new SQLite connection in Python?",
    shortAnswer: "For historical backwards compatibility, SQLite disables foreign key constraint enforcement by default; executing 'PRAGMA foreign_keys = ON;' ensures referential integrity (e.g. preventing orphan student ledger entries) is strictly enforced.",
    explanation: "SQLite foreign key default behavior and referential integrity.",
    hint: "SQLite disables foreign keys by default for backwards compatibility; you must turn it on.",
    level: "basic",
    codeExample: "conn = sqlite3.connect('campus.db')\nconn.execute('PRAGMA foreign_keys = ON;')"
  },
  {
    question: "What is SQL Injection and how do parameterized queries ('?') eliminate this vulnerability?",
    shortAnswer: "SQL Injection occurs when user input strings are formatted directly into SQL queries (e.g. f-strings), allowing attackers to execute malicious commands; parameterized queries pass data separately as bound parameters, ensuring input is treated purely as literal values.",
    explanation: "SQL Injection mechanism and parameterized query defense.",
    hint: "Never use f-strings in SQL; use '?' placeholders with tuples of parameters.",
    level: "basic",
    codeExample: "# VULNERABLE: f'SELECT * FROM users WHERE name = {user}'\n# SECURE: cursor.execute('SELECT * FROM users WHERE name = ?', (user,))"
  },
  {
    question: "How does Python's 'with conn:' context manager handle SQLite transactions automatically?",
    shortAnswer: "When wrapping database operations in 'with conn:', Python opens an atomic transaction; if the block executes without error, it automatically calls 'conn.commit()'; if an exception is raised, it automatically triggers 'conn.rollback()'.",
    explanation: "Automated transaction commit and rollback via connection context managers.",
    hint: "Commits automatically on success; rolls back automatically on unhandled exception.",
    level: "basic",
    codeExample: "with conn:\n    conn.execute('UPDATE accounts SET bal = bal - 100 WHERE id = 1')\n    conn.execute('UPDATE accounts SET bal = bal + 100 WHERE id = 2')"
  },
  {
    question: "What is 'Atomic File Writing' in JSON persistence and why is it crucial?",
    shortAnswer: "Writing data to a temporary file (e.g. 'data.json.tmp') first and then atomically swapping it with 'os.replace()' ensures that if the computer crashes or loses power during the write, the original 'data.json' remains uncorrupted.",
    explanation: "Preventing zero-byte file corruption during sudden system crashes.",
    hint: "Write to a temporary file first, then use os.replace() to prevent file corruption during crashes.",
    level: "moderate",
    codeExample: "# Atomic JSON write pattern:\nwith open('data.tmp', 'w') as f: json.dump(data, f)\nos.replace('data.tmp', 'data.json')"
  },
  {
    question: "What is the 'Repository Pattern' and what architectural problem does it solve?",
    shortAnswer: "The Repository Pattern acts as an abstraction layer between business services and the data persistence tier, mediating between domain objects and SQL/JSON storage so business logic remains 100% agnostic to storage implementation details.",
    explanation: "Repository Pattern decoupling domain models from storage mechanisms.",
    hint: "Mediates between domain entities and SQL/JSON queries, keeping business logic clean.",
    level: "moderate",
    codeExample: "class StudentRepository:\n    def get_by_id(self, sid: str) -> Student:\n        # Encapsulates SQL queries"
  },
  {
    question: "How can you serialize custom dataclasses and datetime objects to JSON in Python?",
    shortAnswer: "By defining a custom subclass of 'json.JSONEncoder' overriding 'default()' (or using dataclasses.asdict() and datetime.isoformat()), or using Pydantic's 'model_dump_json()'.",
    explanation: "Custom JSON serialization for complex Python objects.",
    hint: "Subclass json.JSONEncoder or use dataclasses.asdict() / model.isoformat().",
    level: "basic",
    codeExample: "class CustomEncoder(json.JSONEncoder):\n    def default(self, o):\n        if isinstance(o, datetime): return o.isoformat()\n        return super().default(o)"
  },
  {
    question: "What is the difference between 'cursor.fetchone()' and 'cursor.fetchall()'?",
    shortAnswer: "'cursor.fetchone()' retrieves the next single row from the result set (returning None when no rows remain), minimizing memory usage; 'cursor.fetchall()' loads all remaining rows into memory at once as a list.",
    explanation: "Result set memory streaming vs batch fetching in sqlite3.",
    hint: "fetchone() loads one row at a time; fetchall() loads all rows into a list.",
    level: "basic",
    codeExample: "row = cursor.fetchone() # Efficient for single lookups"
  },
  {
    question: "Why should database column names be mapped to domain model attributes rather than passing raw tuples through services?",
    shortAnswer: "Passing raw tuples (e.g. 'row[0]', 'row[3]') creates fragile, unreadable code that breaks whenever SQL column ordering changes; mapping tuples to strongly-typed dataclasses provides type safety, autocompletion, and domain encapsulation.",
    explanation: "Domain Model Entity mapping vs raw tuple anti-pattern.",
    hint: "Raw tuples break easily if column order changes; dataclasses provide clear named fields.",
    level: "basic",
    codeExample: "# Convert tuple to Dataclass: Student(*row) or Student(sid=row[0], name=row[1])"
  },
  {
    question: "What is an SQLite 'INDEX' and when should you create one?",
    shortAnswer: "An index is a B-tree data structure that accelerates lookups and queries on specific columns (e.g. 'CREATE INDEX idx_student_campus ON students(campus);'); they should be created on frequently searched, filtered, or joined columns.",
    explanation: "Query optimization and index design in SQLite.",
    hint: "Speeds up search queries on frequently filtered columns like campus or email.",
    level: "moderate",
    codeExample: "CREATE INDEX IF NOT EXISTS idx_campus ON students(campus);"
  },
  {
    question: "How do you configure sqlite3 to return dictionary-like row objects instead of raw tuples?",
    shortAnswer: "Set 'conn.row_factory = sqlite3.Row', which allows accessing columns by name (e.g. 'row[\"name\"]') as well as by positional index.",
    explanation: "sqlite3.Row dictionary-like column access.",
    hint: "Set conn.row_factory = sqlite3.Row to access columns by name like a dict.",
    level: "basic",
    codeExample: "conn.row_factory = sqlite3.Row\nrow = cursor.fetchone()\nprint(row['name'])"
  },
  {
    question: "What are ACID properties in database management systems?",
    shortAnswer: "Atomicity (all operations succeed or all roll back), Consistency (data satisfies all schema rules and constraints), Isolation (concurrent transactions do not interfere), and Durability (committed transactions survive system crashes).",
    explanation: "The foundational ACID relational database principles.",
    hint: "Atomicity, Consistency, Isolation, and Durability.",
    level: "moderate",
    codeExample: "# ACID ensures financial transactions remain correct under all conditions"
  },
  {
    question: "When is JSON document storage preferred over an SQLite database?",
    shortAnswer: "JSON is ideal for hierarchical configuration files, small semi-structured document payloads, or user preferences; SQLite is vastly superior for relational data, large datasets, indexing, concurrent access, and ACID transactions.",
    explanation: "Trade-offs between flat JSON documents and relational SQLite databases.",
    hint: "JSON is great for simple configs; SQLite is best for relational data and indexing.",
    level: "moderate",
    codeExample: "# JSON for config.json | SQLite for institutional_ledger.db"
  },
  {
    question: "How do you safely handle database migrations and schema upgrades in Python?",
    shortAnswer: "By maintaining a 'schema_version' metadata table, tracking applied migration scripts sequentially, and running migration DDL commands inside atomic transactions.",
    explanation: "Schema versioning and migration lifecycle management.",
    hint: "Use a schema_version table to track applied migration scripts sequentially.",
    level: "complex",
    codeExample: "CREATE TABLE IF NOT EXISTS schema_version (version INT PRIMARY KEY);"
  },
  {
    question: "What happens if an unhandled Python exception occurs inside a 'with conn:' block?",
    shortAnswer: "The connection context manager catches the exception, immediately executes 'ROLLBACK' on the active transaction to restore previous state, and re-raises the exception to the caller.",
    explanation: "Automated error recovery and rollback mechanics.",
    hint: "The transaction is rolled back automatically to prevent corrupted partial state.",
    level: "basic",
    codeExample: "# Unhandled error -> ROLLBACK -> database remains in consistent valid state"
  },
  {
    question: "Why should you never store database connection objects as global module-level singletons in multi-threaded applications?",
    shortAnswer: "By default, standard SQLite connection objects cannot be shared across different operating system threads without risk of race conditions and threading crashes ('SQLite objects created in a thread can only be used in that same thread').",
    explanation: "Thread safety and SQLite connection scoping.",
    hint: "SQLite connections are not thread-safe by default; create scoped connections or use pooling.",
    level: "complex",
    codeExample: "# Create connection per request/thread or use connection pooling"
  },
  {
    question: "How do you implement an In-Memory SQLite database for fast unit testing?",
    shortAnswer: "Pass ':memory:' as the database path to 'sqlite3.connect(\":memory:\")', creating an ultra-fast database that lives exclusively in RAM and is destroyed upon connection close.",
    explanation: "Ephemeral in-memory SQLite testing databases.",
    hint: "Use sqlite3.connect(':memory:') for isolated, ultra-fast unit testing.",
    level: "basic",
    codeExample: "test_conn = sqlite3.connect(':memory:')"
  },
  {
    question: "What is the purpose of 'ON DELETE CASCADE' in foreign key definitions?",
    shortAnswer: "It automatically deletes associated child records when a parent record is deleted (e.g. deleting a student automatically removes all their ledger and grade entries), preventing orphan rows.",
    explanation: "Cascade deletion and referential integrity automation.",
    hint: "Automatically deletes child records when the parent record is deleted.",
    level: "moderate",
    codeExample: "FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE"
  },
  {
    question: "How can you prevent race conditions when updating ledger balances in SQLite?",
    shortAnswer: "Perform updates using atomic SQL arithmetic (e.g. 'UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?') inside an immediate transaction, checking that rowcount == 1.",
    explanation: "Atomic update arithmetic preventing balance race conditions.",
    hint: "Use atomic SQL math like 'balance = balance - ?' inside an atomic transaction.",
    level: "moderate",
    codeExample: "UPDATE ledgers SET balance = balance - 500 WHERE id = 1 AND balance >= 500;"
  },
  {
    question: "What is the difference between 'json.dump()' and 'json.dumps()'?",
    shortAnswer: "'json.dump()' serializes Python objects directly into a writable file stream; 'json.dumps()' serializes Python objects into an in-memory string.",
    explanation: "File streaming serialization vs in-memory string formatting in json module.",
    hint: "dump() writes to a file; dumps() returns a string ('dump string').",
    level: "basic",
    codeExample: "json.dump(data, file_handle) vs string_data = json.dumps(data)"
  },
  {
    question: "What is the ultimate golden rule of database persistence in professional Python software?",
    shortAnswer: "Always enforce foreign keys ('PRAGMA foreign_keys = ON'), use parameterized queries ('?') without exception, encapsulate SQL in dedicated Repository classes, and wrap multi-statement mutations in atomic transactions.",
    explanation: "The complete enterprise Python database persistence standard.",
    hint: "Foreign keys ON + parameterized queries + Repository pattern + atomic transactions.",
    level: "basic",
    codeExample: "# Enterprise Python Database Persistence Standard"
  }
];

export default questions;
