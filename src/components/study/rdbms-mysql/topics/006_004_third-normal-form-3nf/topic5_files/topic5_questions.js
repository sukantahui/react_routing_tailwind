// Question Bank for Topic 5: Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF
// Generated for RDBMS & MySQL Masterclass

const questions = [
  {
    "question": "In the context of Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF, what is the primary structural condition required to satisfy compliance?",
    "shortAnswer": "Violates 3NF: No non-prime attribute may be transitively dependent on a candidate key through another non-prime attribute.",
    "explanation": "Under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF, the relation must be refactored so that all constraints and dependencies satisfy the formal normal form definition without data redundancy.",
    "hint": "Think about determinant keys, prime attributes, and functional dependencies.",
    "level": "Beginner",
    "codeExample": "-- Transitive Dependency Chain:\n-- emp_id -> dept_id\n-- dept_id -> dept_name, dept_location\n-- Transitive: emp_id -> dept_location (Violates 3NF!)"
  },
  {
    "question": "How does decomposing a table under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF resolve data modification anomalies?",
    "shortAnswer": "Updating department location now requires modifying exactly 1 row in the departments table.",
    "explanation": "Decomposition isolates independent business concepts into distinct tables, ensuring that updates happen in exactly one place and independent entities can be inserted without NULL blockers.",
    "hint": "Recall how foreign keys link decomposed child tables to their parent entities.",
    "level": "Intermediate",
    "codeExample": "-- Decomposed 3NF Relations:\nCREATE TABLE departments (\n  dept_id VARCHAR(10) PRIMARY KEY,\n  dept_name VARCHAR(50) NOT NULL,\n  dept_location VARCHAR(50) NOT NULL\n) ENGINE=InnoDB;\n\nCREATE TABLE employees (\n  emp_id VARCHAR(10) PRIMARY KEY,\n  emp_name VARCHAR(100) NOT NULL,\n  salary_inr DECIMAL(12,2) NOT NULL,\n  dept_id VARCHAR(10) NOT NULL,\n  CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id)\n) ENGINE=InnoDB;"
  },
  {
    "question": "Deep-Dive Question 3 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q3 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 4 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q4 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 5 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q5 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 6 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q6 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 7 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q7 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 8 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q8 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 9 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q9 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 10 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q10 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 11 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q11 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 12 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q12 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 13 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q13 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 14 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q14 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 15 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q15 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 16 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q16 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 17 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q17 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 18 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q18 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 19 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q19 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 20 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q20 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 21 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q21 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 22 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q22 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 23 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q23 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 24 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q24 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 25 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q25 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 26 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q26 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 27 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q27 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 28 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q28 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 29 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q29 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 30 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q30 (Detailed Example: Hospital Patient-Doctor-Room Allocation Schema Normalized to 3NF)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  }
];

export default questions;
