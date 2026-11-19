/**
 * TOPIC 10: REMOVING DUPLICATE RECORDS & ENTITY RESOLUTION
 * Graded Academic & Industry Certification Question Bank
 * Course: Introduction to Machine Learning (BCAC701B)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 
 * 30 Authentic Graded Questions:
 * - Tier 1: Foundation & Terminology (Q1 - Q8)
 * - Tier 2: Mathematical & Algorithmic Mechanics (Q9 - Q16)
 * - Tier 3: Machine Learning System Design & Engineering (Q17 - Q24)
 * - Tier 4: Advanced Production & Scalability Analysis (Q25 - Q30)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the primary operational difference between 'Exact Duplicates' and 'Fuzzy Duplicates' in tabular machine learning datasets?",
    options: [
      "Exact duplicates only occur in numerical features, whereas fuzzy duplicates only occur in text features.",
      "Exact duplicates share identical values across all compared attributes byte-for-byte, while fuzzy duplicates represent the same real-world entity with minor syntactic or typographical discrepancies.",
      "Exact duplicates can be removed automatically, while fuzzy duplicates never have any negative impact on machine learning models.",
      "Exact duplicates require quadratic O(N^2) time to detect, whereas fuzzy duplicates can always be found in linear O(1) time using hash tables."
    ],
    correctIndex: 1,
    explanation: "Exact duplicates are identical across all compared attributes byte-for-byte and can be detected in O(N) average time via cryptographic hashing (MD5/SHA-256). In contrast, fuzzy duplicates refer to records representing the same real-world entity (e.g., 'Debangshu Mukherjee' and 'Debangsu Mukhopadhyay') that differ due to spelling variants, typos, abbreviations, or transliteration.",
    practicalTip: "Never assume string equality alone is sufficient; real-world data from municipal or banking databases in West Bengal almost always contains phonetically equivalent typographical variants.",
    codeSnippet: "# Exact deduplication in pandas\ndf_exact = df.drop_duplicates()\n\n# Subkey deduplication on business keys\ndf_subkey = df.drop_duplicates(subset=['phone', 'pin_code'], keep='first')",
    examRelevance: "MAKAUT BCAC701B Semester Exam & Technical Interviews"
  },
  {
    id: 2,
    tier: "Tier 1: Foundation & Terminology",
    question: "In Python pandas, what is the default behavior of `df.drop_duplicates()` if no arguments are provided?",
    options: [
      "It drops duplicates based strictly on the DataFrame index.",
      "It checks all columns and retains the first occurrence ('keep=\"first\"') while removing subsequent identical rows.",
      "It drops all occurrences of duplicated rows, retaining neither the first nor the last.",
      "It prompts the user interactively to select which record to keep."
    ],
    correctIndex: 1,
    explanation: "By default, `df.drop_duplicates(subset=None, keep='first', inplace=False, ignore_index=False)` evaluates every column in the DataFrame and keeps the first instance encountered, discarding subsequent identical rows.",
    practicalTip: "Beware: If your DataFrame contains an auto-incrementing ID column (e.g. `row_id` or `id`), `df.drop_duplicates()` with default parameters will match NOTHING because the ID is unique for every row! Always specify `subset`.",
    codeSnippet: "# DANGER: If 'user_id' is an auto-increment PK, this drops 0 rows!\ndf.drop_duplicates()\n\n# SAFE PRACTICE:\ndf.drop_duplicates(subset=['email', 'mobile_no'], keep='first')",
    examRelevance: "MAKAUT Practical Lab Examination & Python Data Wrangling Tests"
  },
  {
    id: 3,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why does the presence of an auto-generated primary key column (such as `id` or `transaction_id`) cause naive deduplication to fail?",
    options: [
      "Because primary keys cause memory overflow in Python dictionaries.",
      "Because each row receives a distinct unique ID at ingestion, rendering the entire row unique even when all underlying domain attributes are duplicated.",
      "Because primary keys automatically convert string values into integers.",
      "Because SQL and pandas enforce a strict lock preventing row deletion if a primary key is defined."
    ],
    correctIndex: 1,
    explanation: "When database tables or CSVs auto-generate surrogate keys upon row insertion, identical real-world events or repeated HTTP POST requests receive distinct key values (e.g., ID 101 vs ID 102). A full-row equality check fails to detect the semantic duplicate unless the surrogate key is explicitly excluded.",
    practicalTip: "Always isolate the 'Business Key' or 'Natural Key' (e.g., Aadhaar number, phone + date of birth, PAN card) from surrogate artificial keys before deduplication.",
    codeSnippet: "# Exclude surrogate primary key before checking duplicates\nnatural_keys = [col for col in df.columns if col not in ('id', 'created_at', 'uuid')]\ndf_clean = df.drop_duplicates(subset=natural_keys, keep='last')",
    examRelevance: "MAKAUT Data Engineering Core Concepts"
  },
  {
    id: 4,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is a 'Golden Master Record' in the context of entity resolution and duplicate consolidation?",
    options: [
      "The first record that was ever inserted into the database table.",
      "A synthetic authoritative composite record constructed by aggregating, coalescing null values, and reconciling conflicts across all duplicate instances of an entity.",
      "A database backup stored on an immutable write-once read-many (WORM) storage drive.",
      "A record that contains no missing values and has been certified by an external human auditor."
    ],
    correctIndex: 1,
    explanation: "A Golden Record (or Single Customer View / Single Source of Truth) is synthesized from a cluster of linked duplicate records by selecting the most accurate, recent, and complete field values from each record in the cluster.",
    practicalTip: "Use null-coalescence (taking non-null values from older records to fill gaps in newer records) to maximize information density.",
    codeSnippet: "# Group-by coalescence to create a Golden Master record\ndef coalesce_cluster(group):\n    return group.bfill().ffill().iloc[-1]\n\ngolden_df = df.groupby('entity_cluster_id').apply(coalesce_cluster).reset_index(drop=True)",
    examRelevance: "Enterprise Data Warehousing & Master Data Management (MDM)"
  },
  {
    id: 5,
    tier: "Tier 1: Foundation & Terminology",
    question: "In the pandas `drop_duplicates(keep=...)` method, what does `keep=False` specify?",
    options: [
      "It disables duplicate removal completely.",
      "It drops all occurrences of duplicated rows, leaving none of them in the resulting DataFrame.",
      "It keeps the last occurrence and inverts the sort order of the table.",
      "It returns a boolean Series rather than a modified DataFrame."
    ],
    correctIndex: 1,
    explanation: "Setting `keep=False` discards all rows that are part of a duplicate group. Neither the first nor the subsequent records are preserved. This is commonly used in anomaly detection to isolate and inspect all contaminated records.",
    practicalTip: "To inspect which records are causing collision issues, filter using `df[df.duplicated(subset=..., keep=False)]`.",
    codeSnippet: "# Inspect all conflicting records in Barrackpore student enrollment\ncollision_audit = df[df.duplicated(subset=['phone', 'roll_no'], keep=False)]\nprint(f'Total conflicting rows: {len(collision_audit)}')",
    examRelevance: "MAKAUT Lab Viva & Data Quality Diagnostics"
  },
  {
    id: 6,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the time complexity of a naive pairwise duplicate comparison across a dataset of N records?",
    options: [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(2^N)"
    ],
    correctIndex: 2,
    explanation: "Comparing every record against every other record requires evaluating N * (N - 1) / 2 distinct candidate pairs, which is strictly quadratic O(N^2). For N = 1,000,000 records, this requires ~500 Billion comparisons, making naive pairwise comparison impossible without blocking.",
    practicalTip: "Always implement blocking, indexing, or locality-sensitive hashing (LSH) when N exceeds 10,000 records.",
    codeSnippet: "N = 50000\nnaive_pairs = N * (N - 1) // 2\nprint(f'Pairs to evaluate: {naive_pairs:,}')  # 1,249,750,000 pairs!",
    examRelevance: "MAKAUT Algorithm Complexity & Gate CS Core"
  },
  {
    id: 7,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is 'Soundex' and in what scenario is it most effective during record linkage?",
    options: [
      "A cryptographic hash function designed to encrypt audio files.",
      "A phonetic indexing algorithm that encodes names by pronunciation rather than spelling, matching homophones like 'Smith' and 'Smyth'.",
      "A lossless data compression codec for speech signals.",
      "A metric that computes the Euclidean distance between acoustic word embeddings."
    ],
    correctIndex: 1,
    explanation: "Soundex is a phonetic algorithm developed by Robert C. Russell and Margaret King Odell. It indexes names by their phonetic English sound, converting words to a 4-character code (1 letter + 3 digits), enabling matches between phonetically identical names despite spelling differences.",
    practicalTip: "Soundex is very effective as a coarse blocking key for Indian and Bengali surnames (e.g., 'Banerjee' vs 'Banerji' both map to B562).",
    codeSnippet: "# In Python standard library or custom function:\n# soundex('Banerjee') -> 'B562'\n# soundex('Banerji')  -> 'B562'",
    examRelevance: "Information Retrieval & NLP Foundations"
  },
  {
    id: 8,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why is canonicalization (normalization) essential BEFORE computing hash digests for exact duplicate detection?",
    options: [
      "Because hash functions require inputs to be in alphabetical order.",
      "Because cryptographic hash functions like SHA-256 exhibit the avalanche effect: even a single trailing whitespace or case difference changes the entire hash digest.",
      "Because un-normalized strings cannot be converted into UTF-8 byte arrays.",
      "Because pandas automatically deletes strings with mixed capitalization."
    ],
    correctIndex: 1,
    explanation: "Cryptographic hash functions are strictly deterministic but chaotic: changing a single bit (e.g., 'Kolkata' vs 'Kolkata ') produces completely uncorrelated digests. Canonicalization (trimming whitespace, lowercasing, unicode normalization) ensures semantic identity maps to byte-level identity.",
    practicalTip: "Always strip whitespace and lowercase text fields before running exact deduplication.",
    codeSnippet: "import hashlib\n\ndef hash_row(val1, val2):\n    # Canonicalize:\n    norm = f'{val1.strip().lower()}|{val2.strip().lower()}'\n    return hashlib.sha256(norm.encode('utf-8')).hexdigest()",
    examRelevance: "System Design & Secure Data Engineering"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL & ALGORITHMIC MECHANICS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "In the 1969 Fellegi-Sunter model of record linkage, what do the parameters m_k and u_k represent for a comparison attribute k?",
    options: [
      "m_k is the mean of attribute k, and u_k is the uncertainty (variance) of attribute k.",
      "m_k = P(agree_k | Match) is the probability of agreement given the pair is a true match; u_k = P(agree_k | Unmatched) is the probability of agreement purely by chance among different entities.",
      "m_k is the missing rate in dataset A, and u_k is the missing rate in dataset B.",
      "m_k is the precision of attribute k, and u_k is the recall of attribute k."
    ],
    correctIndex: 1,
    explanation: "In Fellegi-Sunter theory, m_k = P(gamma_k = 1 | (a, b) in M) is the probability that field k agrees when the records represent the same entity (usually high, e.g. 0.95). u_k = P(gamma_k = 1 | (a, b) in U) is the probability of coincidental agreement between two unrelated entities (usually low, e.g. 0.01).",
    practicalTip: "Fields with low u_k (like phone number or PAN card) yield huge positive agreement weights, while fields with high u_k (like gender or state) carry low discriminatory weight.",
    codeSnippet: "# Fellegi-Sunter weight calculation\nimport math\nm = 0.98  # P(agree | Match)\nu = 0.001 # P(agree | NonMatch)\nw_agree = math.log2(m / u)               # +9.94 bits (Strong Match)\nw_disagree = math.log2((1 - m) / (1 - u)) # -5.64 bits (Strong Penalty)",
    examRelevance: "MAKAUT BCAC701B Advanced Theory & Research Methods"
  },
  {
    id: 10,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is the mathematical definition of the Levenshtein distance between two strings s1 and s2?",
    options: [
      "The dot product of their term-frequency vectors.",
      "The minimum number of single-character insertions, deletions, and substitutions required to transform s1 into s2.",
      "The length of the longest common subsequence divided by the maximum string length.",
      "The Euclidean distance between the ASCII codes of their constituent characters."
    ],
    correctIndex: 1,
    explanation: "Levenshtein distance is the foundational edit-distance metric computed via dynamic programming using the recurrence: D(i, j) = min(D(i-1, j) + 1, D(i, j-1) + 1, D(i-1, j-1) + cost), where cost = 0 if s1[i] == s2[j] else 1.",
    practicalTip: "Normalized Levenshtein similarity is defined as: 1.0 - (LevenshteinDistance / max(len(s1), len(s2))).",
    codeSnippet: "# Dynamic Programming Levenshtein\ndef lev(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0] = i\n    for j in range(n+1): dp[0][j] = j\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            cost = 0 if s1[i-1] == s2[j-1] else 1\n            dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost)\n    return dp[m][n]",
    examRelevance: "MAKAUT Dynamic Programming & Algorithms Curriculum"
  },
  {
    id: 11,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "How does the Jaro-Winkler metric modify the standard Jaro similarity metric, and why is this modification beneficial for human names?",
    options: [
      "It penalizes long words by subtracting a logarithmic factor.",
      "It adds an upward boost proportional to the length of the common initial prefix (up to 4 characters), because typographical errors in human names occur much less frequently at the start of words.",
      "It converts both strings to phonemes before computing cosine distance.",
      "It applies exponential decay to matching characters that are separated by more than 2 positions."
    ],
    correctIndex: 1,
    explanation: "William E. Winkler observed that people rarely misspell the first few letters of their given name or surname. Jaro-Winkler adds a prefix bonus: J_W = J + L * p * (1 - J), where L is the length of the common prefix (max 4) and p = 0.1 is the prefix scale factor.",
    practicalTip: "Use Jaro-Winkler when linking person names ('Susmita' vs 'Sushmita' or 'Banerjee' vs 'Banerji'); use Jaccard or Levenshtein for free-form street addresses.",
    codeSnippet: "# Winkler prefix boost\njaro_score = 0.85\nprefix_len = 3  # e.g., 'Deb'\np = 0.1\njw_score = jaro_score + (prefix_len * p * (1.0 - jaro_score))\nprint(f'Jaro: {jaro_score:.3f} -> Jaro-Winkler: {jw_score:.3f}')  # 0.895",
    examRelevance: "MAKAUT NLP & Entity Linkage Mechanics"
  },
  {
    id: 12,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "Given two street addresses: A = 'Park Street, Kolkata' and B = 'Park St, Kolkata', which metric is most resilient against the word abbreviation and order permutation?",
    options: [
      "Hamming distance.",
      "Character N-gram Jaccard similarity (e.g. bigrams or trigrams).",
      "Strict Soundex encoding.",
      "Exact equality check."
    ],
    correctIndex: 1,
    explanation: "Hamming distance requires identical string lengths and fails. Soundex only works on single words (surnames). Character N-gram Jaccard splits the address into overlapping sub-strings (e.g., 'pa', 'ar', 'rk', 'st', 'ko', 'ol'...), measuring intersection over union. Because most shingles match, Jaccard produces a high similarity score.",
    practicalTip: "For Indian address deduplication, character trigrams (n=3) or token-sort ratios provide the highest empirical match recall.",
    codeSnippet: "def char_ngrams(s, n=2):\n    s = f'#{s.lower()}#'\n    return {s[i:i+n] for i in range(len(s)-n+1)}\n\ng1 = char_ngrams('Park Street')\ng2 = char_ngrams('Park St')\njaccard = len(g1 & g2) / len(g1 | g2)\nprint(f'Jaccard bigram similarity: {jaccard:.2f}')",
    examRelevance: "MAKAUT Text Preprocessing & Information Retrieval"
  },
  {
    id: 13,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is the definition of 'Reduction Ratio' (RR) in evaluating blocking and indexing mechanisms for duplicate detection?",
    options: [
      "RR = (True Positives) / (True Positives + False Negatives)",
      "RR = 1.0 - (Candidate Pairs Evaluated by Blocking / Total Naive Pairwise Combinations)",
      "RR = (Memory Used After Deduplication) / (Original Memory Footprint)",
      "RR = (False Positives) / (Total Pairs Evaluated)"
    ],
    correctIndex: 1,
    explanation: "Reduction Ratio (RR) measures the efficiency gain achieved by blocking: RR = 1 - (C / [N(N-1)/2]), where C is the number of candidate pairs generated by the blocking key. An RR of 0.99 means 99% of unnecessary pairwise comparisons were skipped.",
    practicalTip: "Always monitor the trade-off: A very high Reduction Ratio (e.g., 99.9%) might cause Pairs Completeness (Recall) to drop if the blocking key is too restrictive.",
    codeSnippet: "N = 10000\ntotal_pairs = N * (N - 1) // 2  # 49,995,000\ncandidate_pairs = 450000        # Evaluated within blocks\nrr = 1.0 - (candidate_pairs / total_pairs)\nprint(f'Reduction Ratio: {rr * 100:.2f}%')  # 99.10%",
    examRelevance: "MAKAUT Scalability Metrics & Performance Analysis"
  },
  {
    id: 14,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "In Fellegi-Sunter linkage, what are the three decision outcomes defined by the upper threshold T_mu and lower threshold T_lambda?",
    options: [
      "Class 0 (Negative), Class 1 (Positive), Class 2 (Outlier).",
      "A1: Definite Match (weight >= T_mu), A2: Clerical Review (T_lambda <= weight < T_mu), A3: Definite Non-Match (weight < T_lambda).",
      "High Confidence, Medium Confidence, Low Confidence.",
      "Training Sample, Validation Sample, Test Sample."
    ],
    correctIndex: 1,
    explanation: "The hallmark of the Fellegi-Sunter model is the formal three-action decision rule: Pairs above T_mu are automatically merged as matches (A1); pairs below T_lambda are rejected as non-matches (A3); pairs falling in between are flagged for Clerical Review (A2) by human experts or secondary verification.",
    practicalTip: "In banking and tax audits (e.g., KMC property tax or Aadhaar enrollment), routing ambiguous border cases to clerical review prevents wrongful identity mergers.",
    codeSnippet: "if total_weight >= T_mu:\n    decision = 'MATCH'\nelif total_weight >= T_lambda:\n    decision = 'CLERICAL_REVIEW'\nelse:\n    decision = 'NON_MATCH'",
    examRelevance: "MAKAUT BCAC701B Decision Theory in Machine Learning"
  },
  {
    id: 15,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "Why does inverted index blocking on a single fragile attribute (such as PIN code alone) risk lowering 'Pairs Completeness' (Recall)?",
    options: [
      "Because PIN codes cannot be converted into hash integers.",
      "Because if any record contains a typographical or transcription error in its PIN code (e.g. 700120 typed as 700020), the duplicate records will be placed into different blocks and NEVER compared.",
      "Because inverted indexes are restricted to text columns and cannot index numerical codes.",
      "Because blocking algorithms crash when encountering duplicate keys."
    ],
    correctIndex: 1,
    explanation: "Standard blocking partitions the dataset. If a true duplicate pair differs on the chosen blocking key due to an error, they will be routed to different buckets, resulting in a False Negative (missed duplicate). This directly reduces Pairs Completeness (Recall).",
    practicalTip: "Solution: Use 'Multi-Pass Blocking' (Standard Union Rule), generating candidate pairs across multiple independent keys: Pass 1 by PIN code; Pass 2 by Surname Soundex + First Initial.",
    codeSnippet: "# Multi-pass blocking candidate union\npairs_pass1 = generate_pairs_by_key(df, 'pin_code')\npairs_pass2 = generate_pairs_by_key(df, 'soundex_surname')\nall_candidates = pairs_pass1.union(pairs_pass2)",
    examRelevance: "Data Linkage Architecture & Fault Tolerance"
  },
  {
    id: 16,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is the difference between Jaccard similarity and Dice-Sørensen coefficient for two character sets A and B?",
    options: [
      "Jaccard divides by the product of set sizes, while Dice divides by the difference.",
      "Jaccard is |A INTERSECT B| / |A UNION B|, while Dice-Sørensen is 2 * |A INTERSECT B| / (|A| + |B|), giving higher weight to common elements.",
      "Dice-Sørensen is non-symmetric, while Jaccard is symmetric.",
      "Jaccard only works on binary vectors, while Dice works on continuous probability distributions."
    ],
    correctIndex: 1,
    explanation: "Dice-Sørensen coefficient equals 2*|A n B| / (|A| + |B|). It is monotonically related to Jaccard by: Dice = 2*J / (1 + J). Because it doubles the numerator, Dice gives higher weight to positive overlaps and is widely used in record linkage and medical imaging.",
    practicalTip: "Both metrics satisfy the requirements for string token overlap, but Dice produces slightly higher numerical values for intuitive human interpretation.",
    codeSnippet: "def dice_coefficient(a, b):\n    intersection = len(a & b)\n    return (2.0 * intersection) / (len(a) + len(b))",
    examRelevance: "MAKAUT Mathematics for Data Science"
  },

  // =========================================================================
  // TIER 3: MACHINE LEARNING SYSTEM DESIGN & ENGINEERING (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "If a dataset with 15% duplicate instances is partitioned into 80% train and 20% test sets WITHOUT prior deduplication, what is the primary consequence?",
    options: [
      "The model training time will increase exponentially.",
      "Severe Data Leakage: duplicate pairs will be split across train and test sets, causing the model to memorize instances and yield deceptively high test accuracy that fails in production.",
      "The test set will automatically reject the duplicate rows at runtime.",
      "The gradient descent optimizer will divide by zero during backpropagation."
    ],
    correctIndex: 1,
    explanation: "For any duplicate pair {r1, r2}, the probability that r1 lands in train and r2 lands in test is 2 * (0.80 * 0.20) = 32%. Across hundreds of duplicates, nearly all will contaminate the test set. The model simply memorizes the features and predicts labels it has already seen, producing a false benchmark.",
    practicalTip: "MANDATORY RULE: Deduplication must always be executed BEFORE train/test splitting or cross-validation fold generation.",
    codeSnippet: "# CORRECT WORKFLOW:\n# 1. Deduplicate FIRST\ndf_clean = df.drop_duplicates(subset=features)\n# 2. Split AFTER\nX_train, X_test, y_train, y_test = train_test_split(df_clean[features], df_clean[target], test_size=0.2)",
    examRelevance: "MAKAUT Machine Learning Pitfalls & Production ML Architecture"
  },
  {
    id: 18,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "How do duplicate records distort the loss optimization process during gradient descent in empirical risk minimization?",
    options: [
      "Duplicates cause the learning rate to decay to zero instantly.",
      "Duplicates act as non-uniform prior sample weights, multiplying the gradient vector of the duplicated point by its frequency count and pulling the decision boundary toward the repeated mode.",
      "Duplicates convert convex optimization problems into non-convex problems.",
      "Duplicates eliminate all local minima in neural network loss landscapes."
    ],
    correctIndex: 1,
    explanation: "The empirical risk gradient is the average of individual sample loss gradients: Grad L = (1/N) * sum_i grad l(x_i, y_i). If sample x* appears k times, its gradient contributes k * grad l(x*, y*). This artificially skews the objective function toward over-fitting that specific repeated data point.",
    practicalTip: "If certain records represent genuine frequent occurrences (e.g., repeated transactions), encode them via explicit sample weights rather than physical duplicate rows.",
    codeSnippet: "# Physical duplicates distort loss:\n# loss = (loss(x1) + loss(x1) + loss(x1) + loss(x2)) / 4\n# x1 accounts for 75% of total gradient update!",
    examRelevance: "MAKAUT Optimization in Machine Learning"
  },
  {
    id: 19,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In K-Means clustering, what pathological artifact is directly caused by the presence of numerous uncleaned duplicate records?",
    options: [
      "The algorithm enters an infinite loop and never converges.",
      "The algorithm creates artificial high-density centroid clusters centered directly on the duplicated points, robbing clusters from genuine data regions.",
      "K-Means automatically removes duplicates during the Lloyd's algorithm update step.",
      "The inertia (within-cluster sum of squares) becomes negative."
    ],
    correctIndex: 1,
    explanation: "K-Means updates cluster centroids by computing the arithmetic mean of all assigned points. If a single point is duplicated 50 times, the centroid is pulled directly to that exact coordinate with nearly zero variance, wasting a cluster k on an artifact of dirty data.",
    practicalTip: "Always run deduplication before unsupervised clustering or density estimation (e.g., DBSCAN or Gaussian Mixture Models).",
    codeSnippet: "# In K-Means, duplicate points pull the centroid:\n# centroid = sum(points) / N\n# 50 duplicates of (10, 10) dominate the average!",
    examRelevance: "MAKAUT Unsupervised Learning & Clustering Pitfalls"
  },
  {
    id: 20,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "Suppose an e-commerce platform in Salt Lake Sector V wants to consolidate duplicate customer records. Customer A has missing email but complete address; Customer B has email but missing address. What resolution strategy should be deployed?",
    options: [
      "Drop both records because they both contain missing fields.",
      "Construct a Golden Record via Completeness (Null-Coalescence), filling the missing fields of one record with the non-null values of the linked record.",
      "Randomly delete one of the records using `df.drop_duplicates(keep='first')`.",
      "Impute both missing values with the global mode of all customers in West Bengal."
    ],
    correctIndex: 1,
    explanation: "Null-coalescence (field-by-field union) merges the attributes of linked records to create an information-dense Golden Master Record: Email from Customer B + Address from Customer A.",
    practicalTip: "Using `keep='first'` would permanently destroy either the address or the email. Always coalesce records when secondary fields are partially populated.",
    codeSnippet: "# Pandas forward-fill / backward-fill null coalescence across duplicate cluster\ndef merge_cluster(group):\n    return group.bfill().ffill().iloc[0]\n\nclean_customers = df.groupby('cluster_id', as_index=False).apply(merge_cluster)",
    examRelevance: "Data Engineering Architecture & Production ETL"
  },
  {
    id: 21,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In a real-time streaming ML pipeline (e.g. Apache Kafka / Flink), why is full-history deduplication technically challenging compared to batch processing?",
    options: [
      "Because streaming brokers do not support string data types.",
      "Because maintaining an unbounded state store of all previously seen record hashes causes memory consumption to grow infinitely over time (State Store Exhaustion).",
      "Because cryptographic hashing is not thread-safe in streaming environments.",
      "Because Kafka automatically drops all duplicate messages at the broker level."
    ],
    correctIndex: 1,
    explanation: "In batch processing, the dataset is finite and fits into memory or disk. In streaming pipelines, records arrive indefinitely. Keeping a hash of every record seen forever consumes infinite RAM. Engineers must implement sliding time-window deduplication (e.g., 24-hour window) or probabilistic Bloom filters.",
    practicalTip: "Use Redis with TTL (Time-To-Live) or RocksDB state stores with tumbling/sliding event-time windows for streaming deduplication.",
    codeSnippet: "# Redis TTL deduplication logic\ndef is_duplicate_stream(record_id, redis_client, ttl_seconds=86400):\n    # Set if Not Exists with expiration\n    is_new = redis_client.set(f'seen:{record_id}', 1, nx=True, ex=ttl_seconds)\n    return not is_new  # True if duplicate",
    examRelevance: "Big Data & Real-Time ML System Design"
  },
  {
    id: 22,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "What is a 'Bloom Filter' and how is it used in large-scale preliminary duplicate record detection?",
    options: [
      "A neural network architecture that filters image noise.",
      "A space-efficient probabilistic data structure used to test set membership that can yield False Positives (saying an item is a duplicate when it is not) but NEVER False Negatives.",
      "An exact hash table that guarantees zero hash collisions.",
      "A decision tree pruning heuristic used in random forests."
    ],
    correctIndex: 1,
    explanation: "A Bloom filter uses a bit array and multiple independent hash functions. If the filter reports an element is NOT present, it is 100% guaranteed not to be a duplicate (zero false negatives). If it reports present, it might be a false positive, so the system only then queries the expensive disk storage.",
    practicalTip: "Bloom filters allow checking billions of records in RAM with mere megabytes of space before touching disk databases.",
    codeSnippet: "# Conceptual Bloom Filter guarantee:\n# bloom.contains(x) == False => DEFINITELY NOT A DUPLICATE (Skip disk check)\n# bloom.contains(x) == True  => MAYBE DUPLICATE (Perform exact disk lookup)",
    examRelevance: "Big Data Engineering & Scalable Machine Learning"
  },
  {
    id: 23,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "When deduplicating transaction records in a Kolkata banking fraud detection system, two transactions share identical [Card_ID, Merchant, Amount], but occurred 2 seconds apart. What is the correct engineering diagnosis?",
    options: [
      "Always delete the second transaction as a duplicate technical retry.",
      "Analyze the network payload: It could be a duplicate POS network retry (technical duplicate) OR a rapid succession fraud attack (genuine separate events). Merging without transaction ID / gateway auth code validation risks masking financial crime.",
      "Convert both transactions into their logarithmic values.",
      "Retain the transaction with the highest timestamp and ignore the first."
    ],
    correctIndex: 1,
    explanation: "In high-stakes domains (banking, healthcare), identical features can represent either technical network retries or authentic rapid-fire malicious events. Verifying unique gateway idempotency keys or authorization tokens is mandatory before dropping records.",
    practicalTip: "Use API Idempotency Keys (e.g., Stripe/Razorpay `Idempotency-Key` HTTP header) to distinguish technical retries from duplicate user actions.",
    codeSnippet: "# Idempotency key deduplication\n# If idempotency_key is identical => Technical retry (Drop)\n# If idempotency_key is different => Distinct transaction (Retain)\ndf.drop_duplicates(subset=['idempotency_key'], keep='first')",
    examRelevance: "FinTech & Secure Transaction Systems"
  },
  {
    id: 24,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In tabular classification, if duplicate rows exist ONLY within the majority class, how does this affect model evaluation metrics like Precision and Recall?",
    options: [
      "It has no effect on any metric.",
      "It artificially inflates majority class prevalence, leading the model to predict the majority class more aggressively, which reduces minority class Recall and skews Accuracy upward.",
      "It causes Precision to become exactly equal to Recall.",
      "It reduces ROC-AUC to zero."
    ],
    correctIndex: 1,
    explanation: "Duplicating majority class records artificially increases the prior probability P(Y = majority). The model adjusts its decision threshold, predicting the majority class more frequently. Consequently, true minority instances are misclassified, slashing minority class Recall.",
    practicalTip: "Always verify class distribution before and after deduplication to ensure the natural prior distribution is preserved.",
    codeSnippet: "# Check class distribution drift after deduplication\nprint('Raw:', df['target'].value_counts(normalize=True))\ndf_dedup = df.drop_duplicates()\nprint('Cleaned:', df_dedup['target'].value_counts(normalize=True))",
    examRelevance: "MAKAUT Model Evaluation & Imbalanced Learning"
  },

  // =========================================================================
  // TIER 4: ADVANCED PRODUCTION & SCALABILITY ANALYSIS (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "What is Locality-Sensitive Hashing (LSH) and how does it revolutionize entity resolution for high-dimensional textual or biometric records?",
    options: [
      "A cryptographic hash designed to prevent rainbow table attacks.",
      "An algorithmic family of hash functions where similar input items collide into the same hash buckets with high probability, reducing candidate pair comparisons from O(N^2) to sub-quadratic O(N^(1+rho)).",
      "A compression algorithm that reduces database storage by 90%.",
      "A sorting algorithm specifically designed for distributed GPU clusters."
    ],
    correctIndex: 1,
    explanation: "Unlike cryptographic hashes that maximize divergence (avalanche effect), LSH (such as MinHash for Jaccard distance or SimHash for Cosine distance) is designed so that P(h(x) = h(y)) = sim(x, y). Records that hash into the same bucket form candidate duplicate pairs.",
    practicalTip: "MinHash LSH is the gold standard for deduplicating millions of patient records or web-crawled documents at scale.",
    codeSnippet: "# Conceptual MinHash LSH\n# from datasketch import MinHash, MinHashLSH\n# lsh = MinHashLSH(threshold=0.8, num_perm=128)\n# lsh.insert('rec1', minhash1)\n# duplicates = lsh.query(minhash2)",
    examRelevance: "Advanced Data Mining & Big Data Analytics"
  },
  {
    id: 26,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "In the context of the West Bengal Swasthya Sathi scheme (covering 20+ Million citizens), how does 'Transitive Closure' in graph-based entity resolution resolve multi-record duplicate clusters?",
    options: [
      "It discards all graph nodes with odd degrees.",
      "If Record A matches Record B (via Phone), and Record B matches Record C (via Address), transitive closure groups {A, B, C} into a single connected component cluster, even if A and C share no direct common attribute.",
      "It limits deduplication strictly to direct parent-child relationships.",
      "It prevents records from being merged if they were created in different fiscal years."
    ],
    correctIndex: 1,
    explanation: "In record linkage, individual pairwise matches form edges in an undirected graph. Transitive closure computes Connected Components: if edge(A, B) exists and edge(B, C) exists, {A, B, C} belong to the same underlying citizen identity.",
    practicalTip: "Warning: Beware of 'Giant Component Collapse'! A single false positive match (e.g. two people with the same placeholder phone number '9999999999') can erroneously merge thousands of distinct citizens into one mega-cluster.",
    codeSnippet: "import networkx as nx\n\nG = nx.Graph()\nG.add_edges_from([('C101', 'C102'), ('C102', 'C103')])\nclusters = list(nx.connected_components(G))\nprint(clusters)  # [{'C101', 'C102', 'C103'}]",
    examRelevance: "Graph Algorithms & Large Scale Master Data Management"
  },
  {
    id: 27,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "What is the 'Idempotency Key' pattern and why is it considered the most elegant preventative cure for duplicate records in distributed microservices?",
    options: [
      "It encrypts database tables so duplicate entries cannot be decoded.",
      "The client sends a unique deterministic UUID with each mutating API request; the server checks an in-memory cache and if already processed, immediately returns the cached response without re-executing or inserting a duplicate.",
      "It reboots backend server containers whenever a duplicate row is detected.",
      "It forces all microservices to run sequentially on a single CPU core."
    ],
    correctIndex: 1,
    explanation: "Idempotence ensures f(f(x)) = f(x). In payment gateways (e.g., UPI, Stripe, Razorpay), network timeouts often lead users to click 'Pay' twice. The idempotency key ensures the transaction executes exactly once, preventing duplicate deductions and duplicate database rows.",
    practicalTip: "Generate idempotency keys on the frontend using UUIDv4 or deterministic hash of client session + timestamp + cart ID.",
    codeSnippet: "# FastAPI / Flask Idempotency Middleware\n@app.post('/api/order')\ndef create_order(order: OrderSchema, idempotency_key: str = Header(...)):\n    if cache.exists(idempotency_key):\n        return cache.get(idempotency_key)\n    result = process_order(order)\n    cache.set(idempotency_key, result, ex=3600)\n    return result",
    examRelevance: "Distributed Systems Architecture & Senior SWE Interviews"
  },
  {
    id: 28,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "Under what specific circumstance can deduplication accidentally introduce 'Survival Bias' or distort genuine frequency distributions?",
    options: [
      "When the dataset contains no string columns.",
      "In Clickstream or Time-Series forecasting, where repeated events (e.g. repeated daily app logins or sensor heartbeats) represent true physical behavioral frequency; dropping them destroys the underlying temporal intensity signal.",
      "When using 64-bit floating point numbers.",
      "When deduplication is run on an Ubuntu Linux server."
    ],
    correctIndex: 1,
    explanation: "Not all repeated rows are errors! In user telemetry, IoT sensor monitoring, or customer repeat purchases, multiple rows represent genuine recurring physical phenomena. Blindly running `drop_duplicates()` flattens the frequency distribution, destroying vital temporal density information.",
    practicalTip: "Always ask: 'Does duplicate row count convey physical frequency?' If yes, aggregate with `count()` or `frequency` features rather than silently discarding.",
    codeSnippet: "# INSTEAD OF DROPPING REPEATED LOGINS:\n# Compute visit frequency feature:\nlogin_counts = df.groupby(['user_id', 'date']).size().reset_index(name='daily_login_freq')",
    examRelevance: "Feature Engineering & Time Series Analysis"
  },
  {
    id: 29,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "Why does the 'Double Metaphone' algorithm outperform original 'Soundex' for multi-cultural and Bengali transliterated names in India?",
    options: [
      "Double Metaphone uses neural networks trained on Sanskrit text.",
      "Double Metaphone returns primary and alternate phonetic codes, accounting for silent letters, Slavic/Germanic/Asian phonemes, and non-English pronunciation rules that Soundex ignores.",
      "Double Metaphone can only process numerical inputs.",
      "Soundex is restricted to words with fewer than 3 characters."
    ],
    correctIndex: 1,
    explanation: "Lawrence Philips developed Double Metaphone to overcome Soundex's strict English assumptions. It produces two codes (primary and secondary), perfectly capturing names with variable pronunciations or phonetic ambiguities like 'Chakraborty' vs 'Chakravarty' or 'Mukherjee' vs 'Mukhopadhyay'.",
    practicalTip: "For Indian identity systems, combine Double Metaphone with Jaro-Winkler string distance for optimal phonetic and orthographic matching.",
    codeSnippet: "# Double Metaphone example:\n# from metaphone import doublemetaphone\n# primary, alternate = doublemetaphone('Chakraborty')",
    examRelevance: "Natural Language Processing & Demographic Analytics"
  },
  {
    id: 30,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "In automated machine learning (AutoML) pipelines, what is the 'Deduplication Contract' required between the Feature Store and Training Harness?",
    options: [
      "The Feature Store must guarantee that no two features share the same column name.",
      "The Feature Store must enforce immutable point-in-time entity snapshots with deterministic deduplication keys before features are served to the model training pipeline, preventing historical revisionism and leakages.",
      "The training harness must re-train the model every time a duplicate record is detected.",
      "All duplicate rows must be written to an external public Google Drive folder."
    ],
    correctIndex: 1,
    explanation: "Modern enterprise Feature Stores (like Feast or Hopsworks) maintain entity records. A strict Deduplication Contract ensures that joining feature tables with labels respects point-in-time correctness (AS-OF joins) and deduplicates entity states so the training harness receives exactly one ground-truth feature vector per entity timestamp.",
    practicalTip: "Always implement Point-In-Time (AS-OF) joins in feature stores to ensure features reflect historical reality without future duplicate mutations.",
    codeSnippet: "# Point-in-time join in Feast Feature Store\ntraining_data = feature_store.get_historical_features(\n    entity_df=entity_df,\n    features=['customer_features:credit_score', 'customer_features:balance']\n).to_df()",
    examRelevance: "Production MLOps & Enterprise Architecture"
  }
];

export default questions;
