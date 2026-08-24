// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is a UNIQUE Index in MySQL?",
    shortAnswer: "A B+Tree index that enforces distinctness on indexed column values (preventing duplicate rows) while accelerating point lookups to $O(\\log N)$.",
    explanation: "Combines data integrity constraint enforcement with logarithmic search acceleration.",
    hint: "An index enforcing unique values while accelerating lookups.",
    level: "basic"
  },
  {
    question: "What MySQL error is raised when an `INSERT` violates a UNIQUE index constraint?",
    shortAnswer: "`ERROR 1062 (23000): Duplicate entry 'value' for key 'index_name'`",
    explanation: "MySQL blocks duplicate row insertions with Error 1062.",
    hint: "Error 1062 (Duplicate entry).",
    level: "basic"
  },
  {
    question: "Can multiple `NULL` values exist in a column covered by a UNIQUE index in MySQL InnoDB?",
    shortAnswer: "YES. In SQL standard and MySQL InnoDB, `NULL` is not equal to `NULL`, so multiple `NULL` values are permitted in unique columns.",
    explanation: "Unique indexes allow multiple NULL entries unless the column is explicitly defined as NOT NULL.",
    hint: "Yes; multiple NULLs are permitted in UNIQUE indexes.",
    level: "basic"
  },
  {
    question: "What is a Composite UNIQUE Index?",
    shortAnswer: "A unique index across multiple columns enforcing that the combined tuple `(col1, col2)` is unique across the table (e.g. `UNIQUE (student_id, course_id)`).",
    explanation: "Prevents duplicate pairings across multiple relational attributes.",
    hint: "Enforces uniqueness across the combination of multiple columns.",
    level: "basic"
  },
  {
    question: "What is a FULLTEXT Index in MySQL?",
    shortAnswer: "A specialized **Inverted Index** built on text columns (`CHAR`, `VARCHAR`, `TEXT`) to enable fast natural language keyword searches.",
    explanation: "Maps individual words (tokens) to document IDs for high-speed text search.",
    hint: "An inverted index enabling high-speed natural language text searches.",
    level: "basic"
  },
  {
    question: "Why is `WHERE column LIKE '%keyword%'` slow for text searching compared to FULLTEXT indexes?",
    shortAnswer: "Because leading wildcards (`%keyword`) prevent B-Tree index traversal, forcing a 100% Full Table Scan across all rows.",
    explanation: "Linear string pattern matching across text blobs causes high CPU and disk I/O.",
    hint: "Leading wildcard forces a full table scan, whereas FULLTEXT uses an inverted index.",
    level: "basic"
  },
  {
    question: "What is an 'Inverted Index'?",
    shortAnswer: "A data structure that stores a mapping from individual words/tokens to the database records (and word positions) where those words occur.",
    explanation: "The core foundational architecture of search engines like Lucene, Elasticsearch, and MySQL FULLTEXT.",
    hint: "A dictionary mapping words/tokens to the documents containing them.",
    level: "moderate"
  },
  {
    question: "What SQL syntax is used to query a FULLTEXT index in MySQL?",
    shortAnswer: "`WHERE MATCH(col1, col2) AGAINST('search term' [search_modifier])`",
    explanation: "MATCH takes the indexed columns; AGAINST specifies search terms and mode.",
    hint: "MATCH(columns) AGAINST('term')",
    level: "basic"
  },
  {
    question: "What are the two most common search modes for MySQL FULLTEXT queries?",
    shortAnswer: "`IN NATURAL LANGUAGE MODE` (default) and `IN BOOLEAN MODE`.",
    explanation: "Natural language mode ranks by relevance; boolean mode supports operators (+, -, *).",
    hint: "Natural Language Mode and Boolean Mode.",
    level: "basic"
  },
  {
    question: "In FULLTEXT Boolean Mode, what does the `+` operator indicate?",
    shortAnswer: "The leading `+` indicates that the word **MUST** be present in every returned row (e.g. `+React`).",
    explanation: "Mandatory term operator in boolean search.",
    hint: "Word MUST be present in matching rows.",
    level: "basic"
  },
  {
    question: "In FULLTEXT Boolean Mode, what does the `-` operator indicate?",
    shortAnswer: "The leading `-` indicates that the word **MUST NOT** be present in any returned row (e.g. `-Angular`).",
    explanation: "Exclusion term operator in boolean search.",
    hint: "Word MUST NOT be present in matching rows.",
    level: "basic"
  },
  {
    question: "In FULLTEXT Boolean Mode, what does the `*` operator indicate?",
    shortAnswer: "The trailing `*` acts as a prefix wildcard matching any word starting with the prefix (e.g. `micro*` matches microservices, microfrontend).",
    explanation: "Prefix wildcard operator in boolean search.",
    hint: "Prefix wildcard matching words starting with the prefix.",
    level: "basic"
  },
  {
    question: "In FULLTEXT Boolean Mode, what do double quotes `\"...\"` indicate?",
    shortAnswer: "Exact phrase matching: searches for the exact contiguous phrase inside quotes (e.g. `\"React Redux Toolkit\"`).",
    explanation: "Matches words in exact contiguous sequence.",
    hint: "Exact phrase matching.",
    level: "moderate"
  },
  {
    question: "What is a 'Stopword' in FULLTEXT indexing?",
    shortAnswer: "Common words (e.g. 'the', 'is', 'at', 'which', 'and') that are automatically ignored during indexing to save space and avoid unselective matches.",
    explanation: "MySQL maintains default stopword lists for InnoDB fulltext indexes.",
    hint: "Common words filtered out during text indexing.",
    level: "moderate"
  },
  {
    question: "What system variable controls the minimum word length for InnoDB FULLTEXT indexes?",
    shortAnswer: "`innodb_ft_min_token_size` (default is 3 characters in InnoDB).",
    explanation: "Words shorter than this threshold (e.g. 2-letter words like 'DB' or 'AI') are ignored unless the threshold is reconfigured.",
    hint: "innodb_ft_min_token_size (default: 3).",
    level: "expert"
  },
  {
    question: "What happens if a user searches for a 2-letter word (like 'UI' or 'JS') with default `innodb_ft_min_token_size = 3`?",
    shortAnswer: "The query returns 0 matches because words with fewer than 3 characters are not indexed in the inverted index.",
    explanation: "To index 2-letter words, innodb_ft_min_token_size must be set to 2 in my.cnf and indexes rebuilt.",
    hint: "Returns 0 matches because 2-letter words are below the 3-character threshold.",
    level: "expert"
  },
  {
    question: "Can a FULLTEXT index return a numeric relevance score for each matching document?",
    shortAnswer: "YES. Evaluating `MATCH(col) AGAINST('term')` in the `SELECT` list returns a floating-point relevance score based on term frequency and inverse document frequency (TF-IDF).",
    explanation: "Allows sorting results by relevance: `ORDER BY relevance_score DESC`.",
    hint: "Yes; evaluating MATCH() in the SELECT clause returns a TF-IDF relevance score.",
    level: "moderate"
  },
  {
    question: "What storage engines in MySQL support FULLTEXT indexes?",
    shortAnswer: "`InnoDB` and `MyISAM` (InnoDB added fulltext support in MySQL 5.6+).",
    explanation: "InnoDB is the modern standard transactional engine for fulltext search.",
    hint: "InnoDB and MyISAM.",
    level: "basic"
  },
  {
    question: "Can you create a FULLTEXT index across multiple text columns simultaneously?",
    shortAnswer: "YES: `CREATE FULLTEXT INDEX idx_ft_course ON courses (course_title, course_description, course_syllabus);`",
    explanation: "Allows unified searching across multiple text fields.",
    hint: "Yes; fulltext indexes can span multiple text columns.",
    level: "basic"
  },
  {
    question: "What rule must be followed regarding columns in the `MATCH()` clause vs the FULLTEXT index definition?",
    shortAnswer: "The column list inside `MATCH(col1, col2)` must EXACTLY match the column list defined in the `CREATE FULLTEXT INDEX` statement in Natural Language Mode.",
    explanation: "Mismatched column lists cause MySQL to fail to use the index.",
    hint: "The columns in MATCH() must match the exact columns in the FULLTEXT index definition.",
    level: "expert"
  },
  {
    question: "How does `INSERT ... ON DUPLICATE KEY UPDATE` interact with UNIQUE indexes?",
    shortAnswer: "If an insert violates a UNIQUE index or Primary Key constraint, MySQL automatically executes the `UPDATE` clause instead of throwing Error 1062.",
    explanation: "Enables atomic upsert operations in MySQL.",
    hint: "Performs an UPDATE instead of throwing Error 1062 on duplicate key violations.",
    level: "moderate"
  },
  {
    question: "What does `INSERT IGNORE` do when inserting a duplicate key on a UNIQUE index?",
    shortAnswer: "It silently discards the conflicting insert without throwing an error, generating a warning instead.",
    explanation: "Allows batch inserts to continue uninterrupted despite duplicate keys.",
    hint: "Silently skips the duplicate row without throwing an error.",
    level: "moderate"
  },
  {
    question: "Why can't a UNIQUE index be used for natural language substring text searching?",
    shortAnswer: "Because UNIQUE indexes use standard B-Trees that compare entire string keys, rather than decomposing text into individual words like an inverted index.",
    explanation: "B-Trees match whole keys; inverted indexes match individual words.",
    hint: "UNIQUE B-Trees match entire values, not individual words inside text.",
    level: "basic"
  },
  {
    question: "Can a FULLTEXT index be used to enforce uniqueness of documents?",
    shortAnswer: "NO. FULLTEXT indexes are designed solely for text searching and do not enforce uniqueness constraints.",
    explanation: "Uniqueness is strictly enforced by UNIQUE B-Tree indexes.",
    hint: "No; FULLTEXT indexes do not enforce uniqueness.",
    level: "basic"
  },
  {
    question: "What is the 50% threshold rule in MySQL MyISAM Natural Language Fulltext search (and why was it relaxed in InnoDB)?",
    shortAnswer: "In MyISAM, if a word appears in >50% of all rows, it is treated as a stopword and ignored; in InnoDB, this rule is not enforced in the same restrictive manner.",
    explanation: "MyISAM treated very common words in small tables as noise.",
    hint: "MyISAM ignored words present in over 50% of table records.",
    level: "expert"
  },
  {
    question: "How do you create a UNIQUE index on `email_address` in table `students`?",
    shortAnswer: "`CREATE UNIQUE INDEX idx_uq_email ON students (email_address);`",
    explanation: "Standard DDL command for unique index creation.",
    hint: "CREATE UNIQUE INDEX idx_uq_email ON students (email_address);",
    level: "basic"
  },
  {
    question: "How do you create a FULLTEXT index on `course_title` and `course_description` in table `courses`?",
    shortAnswer: "`CREATE FULLTEXT INDEX idx_ft_course ON courses (course_title, course_description);`",
    explanation: "Standard DDL command for fulltext index creation.",
    hint: "CREATE FULLTEXT INDEX idx_ft_course ON courses (course_title, course_description);",
    level: "basic"
  },
  {
    question: "How does creating a UNIQUE index on student Aadhaar numbers protect data integrity for Mamata, Susmita, Abhronila, and Debangshu?",
    shortAnswer: "It guarantees that no two candidates can be registered with the same 12-digit Aadhaar number, instantly rejecting duplicate submissions with Error 1062.",
    explanation: "Enforces strict identity integrity across academy admissions.",
    hint: "Guarantees that duplicate Aadhaar registrations are automatically blocked.",
    level: "basic"
  },
  {
    question: "How does FULLTEXT search accelerate course catalog searches for 'React Microservices' across Barrackpore and Kolkata branches?",
    shortAnswer: "It queries the inverted index in under 1 millisecond, ranking matching course syllabi by TF-IDF relevance score instead of scanning thousands of description rows.",
    explanation: "Provides instant keyword searching with relevance ranking.",
    hint: "Delivers sub-millisecond keyword matches with TF-IDF relevance ranking.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for UNIQUE vs FULLTEXT indexes?",
    shortAnswer: "Use UNIQUE B-Tree indexes to enforce relational integrity on business identifiers (emails, phone numbers, codes), and use FULLTEXT Inverted Indexes for high-speed multi-word document search.",
    explanation: "Proper index selection matches the underlying data model and search requirements.",
    hint: "UNIQUE B-Trees for identity integrity; FULLTEXT inverted indexes for multi-word search.",
    level: "expert"
  }
];

export default questions;
