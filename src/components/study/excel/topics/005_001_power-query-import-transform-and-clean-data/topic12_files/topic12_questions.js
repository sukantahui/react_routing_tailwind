// topic12_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 12
// Topic: Fuzzy matching: Merging datasets with typos and approximate spellings
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of 'Fuzzy Matching' in Power Query?",
    shortAnswer: "It allows merging tables based on approximate string similarity rather than exact equality, matching records despite typos, spelling errors, abbreviations, and missing spaces.",
    explanation: "Generates `Table.FuzzyNestedJoin` or `Table.FuzzyJoin` with configurable similarity algorithms.",
    hint: "Merges datasets based on approximate string similarity.",
    level: "basic",
    codeExample: "= Table.FuzzyNestedJoin(RawSales, {\"Cust_Name\"}, MasterCust, {\"Cust_Name\"}, \"Data\", JoinKind.LeftOuter, [IgnoreCase=true, Threshold=0.8])"
  },
  {
    question: "What is the default 'Similarity Threshold' in Power Query's Fuzzy Matching options?",
    shortAnswer: "0.80 (80% similarity).",
    explanation: "Values range from 0.00 (matches everything) to 1.00 (strict exact equality).",
    hint: "Default is 0.80 (80%).",
    level: "basic",
    codeExample: "[Threshold = 0.80]"
  },
  {
    question: "What happens if you set the Similarity Threshold to 0.00?",
    shortAnswer: "Power Query will match every single row in Table 1 with every row in Table 2, resulting in a chaotic Cartesian product of false positives.",
    explanation: "A threshold of 0 requires zero commonality for a match.",
    hint: "Matches everything (creates massive false positive Cartesian product).",
    level: "moderate",
    codeExample: "Threshold = 0.00 → 100% False Positives"
  },
  {
    question: "What happens if you set the Similarity Threshold to 1.00?",
    shortAnswer: "Fuzzy matching behaves identically to a standard exact merge, matching only strings that have 100% character-for-character equality.",
    explanation: "Requires absolute string equality.",
    hint: "Behaves like standard exact matching (no fuzzy tolerance).",
    level: "basic",
    codeExample: "Threshold = 1.00 &equiv; Exact Match"
  },
  {
    question: "What M function performs a Fuzzy Merge operation?",
    shortAnswer: "`Table.FuzzyNestedJoin(Table1, Key1, Table2, Key2, NewColumnName, [JoinKind], [FuzzyOptionsRecord])`.",
    explanation: "M function executing fuzzy join heuristics with options record.",
    hint: "Table.FuzzyNestedJoin.",
    level: "basic",
    codeExample: "= Table.FuzzyNestedJoin(T1, {\"Name\"}, T2, {\"Name\"}, \"Match\", JoinKind.LeftOuter, [Threshold=0.75])"
  },
  {
    question: "What is a 'Transformation Table' in Power Query Fuzzy Matching?",
    shortAnswer: "A separate 2-column mapping query (containing `From` and `To` columns) that maps custom domain-specific synonyms, acronyms, or non-phonetic abbreviations (e.g. `BKP` → `Barrackpore`, `MSFT` → `Microsoft`).",
    explanation: "Allows teaching Power Query business-specific translation rules.",
    hint: "A 2-column [From, To] mapping table for custom domain abbreviations.",
    level: "expert",
    codeExample: "[TransformationTable = CustomSynonymsTable]"
  },
  {
    question: "What exact column header names are required in a Transformation Table?",
    shortAnswer: "`From` (the raw dirty input token) and `To` (the standardized master string).",
    explanation: "Power Query's fuzzy engine requires these exact column names.",
    hint: "Must be named 'From' and 'To'.",
    level: "moderate",
    codeExample: "Columns: [From] and [To] (e.g. 'WB' → 'West Bengal')"
  },
  {
    question: "What does the 'Match by combining text parts' (Ignore Spaces / Token Recombination) option do?",
    shortAnswer: "It allows matching text even when words are concatenated or spaced differently (e.g. `Micro Soft` matches `Microsoft`, or `JohnDoe` matches `John Doe`).",
    explanation: "Tokenizes substrings and recombines them during similarity computation.",
    hint: "Matches strings with space variations (e.g. 'Micro Soft' → 'Microsoft').",
    level: "moderate",
    codeExample: "[IgnoreSpaces = true]"
  },
  {
    question: "What is the 'Maximum number of matches' setting in Fuzzy Matching options?",
    shortAnswer: "It limits how many matching candidate rows can be returned for a single input row; setting it to `1` ensures only the highest-scoring candidate is selected, avoiding row multiplication.",
    explanation: "Prevents multiple near-matches from duplicating primary fact rows.",
    hint: "Limits returned candidates; setting to 1 prevents row explosion.",
    level: "advanced",
    codeExample: "[NumberOfMatches = 1]"
  },
  {
    question: "What underlying mathematical algorithms does Power Query use for Fuzzy Matching?",
    shortAnswer: "A hybrid combination of Jaccard token n-gram similarity, Damerau-Levenshtein edit distance, and phonetic heuristics.",
    explanation: "Evaluates character transposition, deletion, insertion, and token overlap.",
    hint: "Jaccard n-gram similarity and Levenshtein edit distance.",
    level: "expert",
    codeExample: "Algorithms: Jaccard N-Gram + Levenshtein Edit Distance"
  },
  {
    question: "Why should you NOT use a Similarity Threshold below 0.65 in financial reconciliations?",
    shortAnswer: "Because low thresholds produce high false-positive rates, erroneously matching completely unrelated account names (e.g. 'Tata Motors' matching 'Tata Steel').",
    explanation: "Risk of merging incorrect commercial entities.",
    hint: "Causes dangerous false positive matches between unrelated accounts.",
    level: "advanced",
    codeExample: "Warning: Low threshold matches 'Tata Steel' to 'Tata Motors'!"
  },
  {
    question: "How do you audit fuzzy match results to verify accuracy before loading into production?",
    shortAnswer: "Expand both the raw input name and the matched master name side-by-side in the preview grid, sorting by length or inspecting potential mismatches.",
    explanation: "Visual side-by-side reconciliation inspection.",
    hint: "Expand both Raw Name and Master Name side-by-side to audit discrepancies.",
    level: "moderate",
    codeExample: "Side-by-side: [Raw_Name] vs [Matched_Master_Name]"
  },
  {
    question: "Can Fuzzy Matching be performed on numbers or dates?",
    shortAnswer: "No; Fuzzy Matching in Power Query operates strictly on `type text` columns.",
    explanation: "String similarity metrics are inapplicable to dates and numerical magnitudes.",
    hint: "No, strictly text columns.",
    level: "basic",
    codeExample: "Text columns only; coerce keys to text before fuzzy matching"
  },
  {
    question: "How do you handle case-sensitive fuzzy matching if uppercase/lowercase distinction is required?",
    shortAnswer: "In Fuzzy Options, uncheck 'Ignore case' (`[IgnoreCase = false]`).",
    explanation: "Forces fuzzy distance to penalize case discrepancies.",
    hint: "Set [IgnoreCase = false].",
    level: "basic",
    codeExample: "[IgnoreCase = false]"
  },
  {
    question: "What is the performance impact of Fuzzy Matching on very large datasets (e.g. 500,000 rows)?",
    shortAnswer: "Fuzzy matching is CPU-intensive (O(N &times; M) string comparisons); it should be performed on deduplicated distinct key tables rather than raw transactional fact tables.",
    explanation: "Deduplicate first, fuzzy-match the distinct list, then merge back.",
    hint: "CPU-heavy; fuzzy match distinct keys, not raw millions of fact rows!",
    level: "expert",
    codeExample: "1. Distinct Raw Keys → 2. Fuzzy Match Dimension → 3. Exact Merge to Fact"
  },
  {
    question: "How do you resolve a situation where 'Swadeep Banerjee' matches both 'Swadeep Banerjee' and 'Sandeep Banerjee' at threshold 0.70?",
    shortAnswer: "Raise the Similarity Threshold to 0.85 or 0.90, or add a secondary matching column (e.g. Phone Number or City).",
    explanation: "Higher threshold isolates genuine single-character typos from different names.",
    hint: "Raise threshold to 0.85+ or add secondary composite keys.",
    level: "moderate",
    codeExample: "Raise Threshold: 0.70 → 0.88"
  },
  {
    question: "Can you use multiple Transformation Tables in a single Fuzzy Merge step?",
    shortAnswer: "No; Power Query accepts exactly one Transformation Table query parameter in the options record.",
    explanation: "Combine all custom synonym mappings into a single unified transformation table.",
    hint: "Accepts 1 transformation table; combine all synonym rules into it.",
    level: "advanced",
    codeExample: "[TransformationTable = All_Synonyms_Master]"
  },
  {
    question: "What happens if a raw record finds NO fuzzy candidate above the specified threshold?",
    shortAnswer: "Power Query populates `null` in the merged column for that row (in a Left Outer fuzzy join).",
    explanation: "Unmatched records are handled gracefully without errors.",
    hint: "Populates null in the merged column.",
    level: "basic",
    codeExample: "No match above threshold → returns null"
  },
  {
    question: "How do you create a custom Transformation Table in Power Query from scratch?",
    shortAnswer: "Home → Enter Data → Name columns 'From' and 'To' → Enter abbreviation pairs → Name query `tbl_Synonyms`.",
    explanation: "Standard manual mapping table creation.",
    hint: "Enter Data → Columns 'From' and 'To' → Populate mappings.",
    level: "basic",
    codeExample: "Table with columns [From, To] entered via Enter Data"
  },
  {
    question: "How does Fuzzy Matching handle transposed letters (e.g. 'Brakacpore' vs 'Barrackpore')?",
    shortAnswer: "The Damerau-Levenshtein component calculates a very small edit penalty for adjacent letter transpositions, easily matching at default 0.80 threshold.",
    explanation: "Recognizes common typing slip transpositions.",
    hint: "Levenshtein distance handles adjacent letter transpositions easily.",
    level: "moderate",
    codeExample: "'Brakacpore' → Matches 'Barrackpore' at 0.80 threshold"
  },
  {
    question: "Can you combine exact matching on one column with fuzzy matching on another column in the same merge?",
    shortAnswer: "Not in a single step; you must first fuzzy-match the text column to create a clean standardized key, then perform an exact multi-column merge.",
    explanation: "Standard two-phase ETL matching architecture.",
    hint: "Fuzzy match text column first, then perform exact multi-column merge.",
    level: "expert",
    codeExample: "Phase 1: Fuzzy Match Name → Phase 2: Exact Merge [StandardName + City]"
  },
  {
    question: "What is the difference between Fuzzy Matching in Power Query vs Excel's Fuzzy Lookup Add-in?",
    shortAnswer: "Power Query Fuzzy Matching is built natively into the M engine, automatically refreshes in Power BI Service / Excel Data Model, and supports M code parameterization.",
    explanation: "Native cloud refresh support vs legacy desktop add-in.",
    hint: "Power Query Fuzzy is native, automated, and refreshes in Power BI cloud.",
    level: "moderate",
    codeExample: "Native M Engine vs Legacy COM Add-In"
  },
  {
    question: "How do you clean and pre-process text before applying Fuzzy Matching to maximize match accuracy?",
    shortAnswer: "Apply `Text.Clean`, `Text.Trim`, and `Text.Upper` on both tables to strip non-printable characters and whitespace noise before computing similarity.",
    explanation: "Text sanitization dramatically improves fuzzy match quality.",
    hint: "Clean, Trim, and Upper on both tables before fuzzy matching.",
    level: "basic",
    codeExample: "Clean + Trim + Upper → Fuzzy Match"
  },
  {
    question: "How do you isolate ONLY the records that required fuzzy matching (i.e. had typos and did not match exactly)?",
    shortAnswer: "Expand the matched Master Name → Add custom column: `[Raw_Name] <> [Master_Name]` → Filter for `true`.",
    explanation: "Isolates corrected typos for audit logging.",
    hint: "Filter where [Raw_Name] <> [Master_Name] and [Master_Name] <> null.",
    level: "moderate",
    codeExample: "= Table.SelectRows(#\"Expanded\", each [Raw_Name] <> [Master_Name] and [Master_Name] <> null)"
  },
  {
    question: "Does Fuzzy Matching support SQL Query Folding?",
    shortAnswer: "No; Fuzzy Matching algorithms execute entirely in-memory within the local Power Query Mashup engine.",
    explanation: "SQL relational engines do not natively support Power Query's proprietary fuzzy heuristics.",
    hint: "No; executes in local Mashup engine memory.",
    level: "advanced",
    codeExample: "Fuzzy Merge = In-Memory Mashup Processing"
  },
  {
    question: "How do you handle Indian corporate entity suffix variations (e.g. 'Pvt Ltd', 'Private Limited', 'Ltd') in Fuzzy Matching?",
    shortAnswer: "Add entries in the Transformation Table mapping 'Pvt Ltd' → 'Private Limited' and 'Ltd' → 'Limited', or strip corporate suffixes before matching.",
    explanation: "Eliminates legal entity suffix noise.",
    hint: "Map 'Pvt Ltd' → 'Private Limited' in Transformation Table.",
    level: "moderate",
    codeExample: "TransformationTable: From='Pvt Ltd', To='Private Limited'"
  },
  {
    question: "Why should you set `NumberOfMatches = 1` when fuzzy merging master customer tables?",
    shortAnswer: "To prevent multiple similar customer names from generating duplicate transaction rows in your fact table.",
    explanation: "Ensures unique single-record resolution.",
    hint: "Prevents row duplication by selecting only the single top-scoring match.",
    level: "basic",
    codeExample: "[NumberOfMatches = 1]"
  },
  {
    question: "How do you handle abbreviations like 'Dr.' vs 'Doctor' or 'St.' vs 'Street' during address fuzzy merging?",
    shortAnswer: "Include them in the Transformation Table query: `From='Dr.', To='Doctor'`.",
    explanation: "Standard address standardization dictionary pattern.",
    hint: "Add abbreviation pairs to Transformation Table.",
    level: "basic",
    codeExample: "Transformation Table: From='St.', To='Street'"
  },
  {
    question: "What is the recommended threshold range for balancing match recall and precision in customer name reconciliation?",
    shortAnswer: "Between 0.80 and 0.85.",
    explanation: "Sweet spot that catches most typos while rejecting false-positive name collisions.",
    hint: "0.80 to 0.85 is the optimal corporate balance.",
    level: "moderate",
    codeExample: "Optimal Balance: Threshold = 0.82"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Fuzzy Matching in Power Query?",
    shortAnswer: "Pre-clean text, use Transformation Tables for acronyms, and never fuzzy-match raw transaction millions! Always apply Clean and Trim first, set Similarity Threshold between 0.80 and 0.85 with NumberOfMatches=1 to avoid row explosion, supply a [From, To] Transformation Table for local domain abbreviations, and execute fuzzy joins ONLY on distinct key lists before merging back to transaction facts!",
    explanation: "Smart fuzzy matching transforms messy real-world corporate data into pristine analytics!",
    hint: "Clean & Trim + Threshold 0.80-0.85 + Transformation Table + Match on Distinct Keys = AI-Level Data Cleansing!",
    level: "expert",
    codeExample: "Rule: Clean Text → Distinct Keys → Transformation Table → FuzzyNestedJoin(Threshold=0.82)!"
  }
];

export default questions;
