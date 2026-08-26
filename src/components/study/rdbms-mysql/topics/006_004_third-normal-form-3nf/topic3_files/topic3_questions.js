// Question Bank for Topic 3: Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects
// Generated for RDBMS & MySQL Masterclass

const questions = [
  {
    "question": "In the context of Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects, what is the primary structural condition required to satisfy compliance?",
    "shortAnswer": "Violates 3NF: No non-prime attribute may be transitively dependent on a candidate key through another non-prime attribute.",
    "explanation": "Under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects, the relation must be refactored so that all constraints and dependencies satisfy the formal normal form definition without data redundancy.",
    "hint": "Think about determinant keys, prime attributes, and functional dependencies.",
    "level": "Beginner",
    "codeExample": "-- Transitive Dependency Chain:\n-- emp_id -> dept_id\n-- dept_id -> dept_name, dept_location\n-- Transitive: emp_id -> dept_location (Violates 3NF!)"
  },
  {
    "question": "How does decomposing a table under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects resolve data modification anomalies?",
    "shortAnswer": "Updating department location now requires modifying exactly 1 row in the departments table.",
    "explanation": "Decomposition isolates independent business concepts into distinct tables, ensuring that updates happen in exactly one place and independent entities can be inserted without NULL blockers.",
    "hint": "Recall how foreign keys link decomposed child tables to their parent entities.",
    "level": "Intermediate",
    "codeExample": "-- Decomposed 3NF Relations:\nCREATE TABLE departments (\n  dept_id VARCHAR(10) PRIMARY KEY,\n  dept_name VARCHAR(50) NOT NULL,\n  dept_location VARCHAR(50) NOT NULL\n) ENGINE=InnoDB;\n\nCREATE TABLE employees (\n  emp_id VARCHAR(10) PRIMARY KEY,\n  emp_name VARCHAR(100) NOT NULL,\n  salary_inr DECIMAL(12,2) NOT NULL,\n  dept_id VARCHAR(10) NOT NULL,\n  CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id)\n) ENGINE=InnoDB;"
  },
  {
    "question": "Deep-Dive Question 3 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q3 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 4 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q4 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 5 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q5 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 6 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q6 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 7 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q7 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 8 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q8 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 9 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q9 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 10 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q10 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 11 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q11 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 12 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q12 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 13 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q13 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 14 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q14 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 15 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q15 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 16 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q16 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 17 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q17 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 18 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q18 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 19 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q19 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 20 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q20 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 21 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q21 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 22 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q22 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 23 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q23 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 24 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q24 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 25 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q25 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 26 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q26 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 27 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q27 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 28 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q28 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 29 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q29 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 30 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q30 (Why the Prime Attribute Condition (A in Candidate Key) Exists in 3NF and What It Protects)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  }
];

export default questions;
