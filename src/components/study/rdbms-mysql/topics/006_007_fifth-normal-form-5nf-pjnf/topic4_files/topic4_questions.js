// Question Bank for Topic 4: The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint
// Generated for RDBMS & MySQL Masterclass

const questions = [
  {
    "question": "In the context of The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint, what is the primary structural condition required to satisfy compliance?",
    "shortAnswer": "This 3-way cyclic constraint cannot be decomposed into two binary tables without loss of constraint, but CAN be decomposed into 3 tables.",
    "explanation": "Under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint, the relation must be refactored so that all constraints and dependencies satisfy the formal normal form definition without data redundancy.",
    "hint": "Think about determinant keys, prime attributes, and functional dependencies.",
    "level": "Beginner",
    "codeExample": "-- 5NF Join Dependency: *[(supplier, part), (part, project), (supplier, project)]\n-- If we only split into 2 tables, natural join creates spurious false supplier-project pairs!"
  },
  {
    "question": "How does decomposing a table under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint resolve data modification anomalies?",
    "shortAnswer": "Zero spurious tuples upon 3-way natural join; complete integrity preserved.",
    "explanation": "Decomposition isolates independent business concepts into distinct tables, ensuring that updates happen in exactly one place and independent entities can be inserted without NULL blockers.",
    "hint": "Recall how foreign keys link decomposed child tables to their parent entities.",
    "level": "Intermediate",
    "codeExample": "-- 5NF Decomposed 3 Binary Tables:\nCREATE TABLE supplier_parts (supplier_id VARCHAR(10), part_id VARCHAR(10), PRIMARY KEY (supplier_id, part_id));\nCREATE TABLE part_projects (part_id VARCHAR(10), project_id VARCHAR(10), PRIMARY KEY (part_id, project_id));\nCREATE TABLE supplier_projects (supplier_id VARCHAR(10), project_id VARCHAR(10), PRIMARY KEY (supplier_id, project_id));"
  },
  {
    "question": "Deep-Dive Question 3 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q3 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 4 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q4 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 5 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q5 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 6 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q6 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 7 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q7 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 8 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q8 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 9 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q9 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 10 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q10 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 11 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q11 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 12 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q12 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 13 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q13 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 14 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q14 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 15 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q15 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 16 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q16 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 17 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q17 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 18 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q18 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 19 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q19 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 20 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q20 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 21 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q21 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 22 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q22 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 23 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q23 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 24 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q24 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 25 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q25 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 26 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q26 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 27 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q27 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 28 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q28 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 29 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q29 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 30 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q30 (The Classic 3-Way Relationship Example: Supplier-Part-Project (SPJ) Cyclic Constraint)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  }
];

export default questions;
