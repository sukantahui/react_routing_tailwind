// Question Bank for Topic 5: Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table
// Generated for RDBMS & MySQL Masterclass

const questions = [
  {
    "question": "In the context of Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table, what is the primary structural condition required to satisfy compliance?",
    "shortAnswer": "This 3-way cyclic constraint cannot be decomposed into two binary tables without loss of constraint, but CAN be decomposed into 3 tables.",
    "explanation": "Under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table, the relation must be refactored so that all constraints and dependencies satisfy the formal normal form definition without data redundancy.",
    "hint": "Think about determinant keys, prime attributes, and functional dependencies.",
    "level": "Beginner",
    "codeExample": "-- 5NF Join Dependency: *[(supplier, part), (part, project), (supplier, project)]\n-- If we only split into 2 tables, natural join creates spurious false supplier-project pairs!"
  },
  {
    "question": "How does decomposing a table under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table resolve data modification anomalies?",
    "shortAnswer": "Zero spurious tuples upon 3-way natural join; complete integrity preserved.",
    "explanation": "Decomposition isolates independent business concepts into distinct tables, ensuring that updates happen in exactly one place and independent entities can be inserted without NULL blockers.",
    "hint": "Recall how foreign keys link decomposed child tables to their parent entities.",
    "level": "Intermediate",
    "codeExample": "-- 5NF Decomposed 3 Binary Tables:\nCREATE TABLE supplier_parts (supplier_id VARCHAR(10), part_id VARCHAR(10), PRIMARY KEY (supplier_id, part_id));\nCREATE TABLE part_projects (part_id VARCHAR(10), project_id VARCHAR(10), PRIMARY KEY (part_id, project_id));\nCREATE TABLE supplier_projects (supplier_id VARCHAR(10), project_id VARCHAR(10), PRIMARY KEY (supplier_id, project_id));"
  },
  {
    "question": "Deep-Dive Question 3 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q3 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 4 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q4 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 5 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q5 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 6 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q6 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 7 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q7 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 8 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q8 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 9 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q9 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 10 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q10 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 11 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q11 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 12 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q12 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 13 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q13 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 14 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q14 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 15 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q15 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 16 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q16 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 17 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q17 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 18 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q18 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 19 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q19 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 20 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q20 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 21 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q21 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 22 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q22 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 23 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q23 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 24 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q24 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 25 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q25 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 26 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q26 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 27 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q27 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 28 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Moderate",
    "codeExample": "-- Production verification for Q28 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 29 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Intermediate",
    "codeExample": "-- Production verification for Q29 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  },
  {
    "question": "Deep-Dive Question 30 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table): How does this relational principle scale in production enterprise systems?",
    "shortAnswer": "By eliminating duplicate storage rows, preventing lock contention, and guaranteeing deterministic query reconstruction.",
    "explanation": "Applying Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table ensures that high-throughput OLTP databases maintain microsecond query latencies and zero data divergence across concurrent sessions.",
    "hint": "Consider how candidate keys, index structures, and ACID transactions interact under Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table.",
    "level": "Expert",
    "codeExample": "-- Production verification for Q30 (Why Decomposing into 3 Tables (SP, PJ, SJ) Losslessly Reconstructs the Original SPJ Table)\nSELECT table_name, constraint_type, constraint_name\nFROM information_schema.table_constraints\nWHERE table_schema = 'barrackpore_db'\nORDER BY table_name;"
  }
];

export default questions;
