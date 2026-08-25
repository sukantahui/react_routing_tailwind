// Question Bank for Topic 9: Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys
// Generated for RDBMS & MySQL Masterclass

const questions = [
  {
    "question": "In the context of Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys, what is the primary structural condition required to satisfy compliance?",
    "shortAnswer": "Violates 2NF: All non-prime attributes must be fully functionally dependent on the ENTIRE composite candidate key.",
    "explanation": "Under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys, the relation must be refactored so that all constraints and dependencies satisfy the formal normal form definition without data redundancy.",
    "hint": "Think about determinant keys, prime attributes, and functional dependencies.",
    "level": "Beginner",
    "codeExample": "-- 2NF Violation: Partial Dependency in Flat Table\n-- Candidate Key: {student_id, course_id}\n-- Partial FD 1: student_id -> student_name (Depends only on part of PK!)\n-- Partial FD 2: course_id -> course_title, fee_inr (Depends only on part of PK!)"
  },
  {
    "question": "How does decomposing a table under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys resolve data modification anomalies?",
    "shortAnswer": "Every non-prime column is now fully functionally dependent on its table's full primary key.",
    "explanation": "Decomposition isolates independent business concepts into distinct tables, ensuring that updates happen in exactly one place and independent entities can be inserted without NULL blockers.",
    "hint": "Recall how foreign keys link decomposed child tables to their parent entities.",
    "level": "Intermediate",
    "codeExample": "-- Normalized 2NF Relations:\n-- 1. Full FD on student_id:\nCREATE TABLE students (student_id INT PRIMARY KEY, student_name VARCHAR(100) NOT NULL);\n-- 2. Full FD on course_id:\nCREATE TABLE courses (course_id VARCHAR(10) PRIMARY KEY, course_title VARCHAR(100) NOT NULL, fee_inr DECIMAL(10,2));\n-- 3. Full FD on composite key {student_id, course_id}:\nCREATE TABLE enrollments (\n  student_id INT, course_id VARCHAR(10), grade CHAR(2),\n  PRIMARY KEY (student_id, course_id),\n  FOREIGN KEY (student_id) REFERENCES students(student_id),\n  FOREIGN KEY (course_id) REFERENCES courses(course_id)\n);"
  },
  {
    "question": "Deep-Dive Question 3 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q3 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 4 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q4 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 5 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q5 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 6 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q6 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 7 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q7 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 8 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q8 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 9 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q9 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 10 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q10 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 11 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q11 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 12 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q12 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 13 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q13 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 14 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q14 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 15 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q15 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 16 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q16 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 17 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q17 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 18 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q18 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 19 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q19 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 20 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q20 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 21 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q21 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 22 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q22 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 23 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q23 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 24 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q24 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 25 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q25 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 26 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q26 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 27 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q27 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 28 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q28 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 29 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q29 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 30 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q30 (Common Design Mistakes: Confusing Multiple Individual Foreign Keys with Composite Primary Keys)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  }
];

export default questions;
