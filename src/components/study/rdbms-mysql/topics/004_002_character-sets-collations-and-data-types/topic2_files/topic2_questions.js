// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What does the `0900` in `utf8mb4_0900_ai_ci` signify?",
    shortAnswer: "It indicates that the collation is based on the **Unicode Collation Algorithm (UCA) 9.0.0** weight tables published by the Unicode Consortium, ensuring modern linguistic sorting accuracy.",
    explanation: "Represents a massive leap forward from older Unicode 5.2.0 collations.",
    hint: "Refers to the Unicode Collation Algorithm (UCA) 9.0.0 standard.",
    level: "basic"
  },
  {
    question: "What do the `_ai` and `_ci` suffixes in `utf8mb4_0900_ai_ci` mean?",
    shortAnswer: "- `_ai`: **Accent Insensitive** (treats characters with and without accents as equal: `'résumé' = 'resume'`).\n- `_ci`: **Case Insensitive** (treats uppercase and lowercase as equal: `'Admin' = 'admin'`).",
    explanation: "Provides natural, user-friendly search and sorting across international applications.",
    hint: "Accent Insensitive and Case Insensitive.",
    level: "basic"
  },
  {
    question: "Why was `utf8mb4_general_ci` replaced as the default collation in MySQL 8.0?",
    shortAnswer: "Because `utf8mb4_general_ci` used naive shortcuts that were **linguistically inaccurate** (e.g. failing to expand German `ß` to `ss` and misordering multi-byte accented and Asian characters).",
    explanation: "General collation sacrificed correctness for minor CPU gains on 1990s hardware.",
    hint: "Because general_ci used naive shortcuts that produced incorrect alphabetical sorting.",
    level: "basic"
  },
  {
    question: "Why is `utf8mb4_0900_ai_ci` significantly faster than the older `utf8mb4_unicode_ci` (Unicode 5.2.0)?",
    shortAnswer: "MySQL 8.0 rewrote the collation engine with **compact weight tables, optimized memory layouts, and SIMD CPU vectorization**, executing string comparisons up to 2x faster than `utf8mb4_unicode_ci`.",
    explanation: "Achieves both 100% linguistic accuracy and high CPU throughput.",
    hint: "Uses compact weight tables and modern CPU vectorization to run up to 2x faster.",
    level: "expert"
  },
  {
    question: "What is the critical difference between `PAD SPACE` and `NO PAD` collations in MySQL?",
    shortAnswer: "- **PAD SPACE (Legacy)**: Compares strings while **ignoring trailing spaces** (`'admin' = 'admin '` is `TRUE`).\n- **NO PAD (`utf8mb4_0900_*`)**: Compares strings strictly including trailing whitespace (`'admin' = 'admin '` is `FALSE`).",
    explanation: "A major behavioral update in MySQL 8.0 that enhances application security.",
    hint: "NO PAD treats trailing spaces as significant; PAD SPACE ignored trailing spaces.",
    level: "expert",
    codeExample: "-- In utf8mb4_0900_ai_ci (NO PAD):\nSELECT 'admin' = 'admin ' AS no_pad_result;\n-- Output: 0 (FALSE)\n\n-- In utf8mb4_general_ci (PAD SPACE):\nSELECT 'admin' = 'admin ' COLLATE utf8mb4_general_ci AS pad_result;\n-- Output: 1 (TRUE)"
  },
  {
    question: "What security vulnerability is prevented by the `NO PAD` collation attribute in MySQL 8.0?",
    shortAnswer: "**Username / Account Impersonation**: In legacy `PAD SPACE` collations, registering `'admin '` (with trailing space) could match `'admin'` during authentication or collide with unique constraints, enabling authentication bypass.",
    explanation: "NO PAD guarantees that strings with trailing spaces are treated as completely distinct entities.",
    hint: "Prevents username impersonation attacks where malicious accounts register with trailing spaces.",
    level: "expert"
  },
  {
    question: "How do you check whether a collation uses `PAD SPACE` or `NO PAD` in MySQL 8.0?",
    shortAnswer: "`SELECT COLLATION_NAME, PAD_ATTRIBUTE FROM information_schema.collations WHERE COLLATION_NAME LIKE 'utf8mb4_0900%';`",
    explanation: "Displays `NO PAD` for all modern 0900 series collations.",
    hint: "Query PAD_ATTRIBUTE from information_schema.collations.",
    level: "basic",
    codeExample: "SELECT COLLATION_NAME, PAD_ATTRIBUTE \nFROM information_schema.collations \nWHERE COLLATION_NAME IN ('utf8mb4_0900_ai_ci', 'utf8mb4_general_ci');"
  },
  {
    question: "How does `utf8mb4_0900_ai_ci` handle ligatures like German `ß` or Latin `æ`?",
    shortAnswer: "It applies official Unicode expansion rules, evaluating **`'Straße' = 'Strasse'`** and **`'encyclopædia' = 'encyclopaedia'`** as exact matches (`TRUE`).",
    explanation: "Provides true international linguistic accuracy.",
    hint: "Expands ligatures correctly (e.g. 'ß' matches 'ss', 'æ' matches 'ae').",
    level: "expert"
  },
  {
    question: "What is `utf8mb4_0900_as_cs`?",
    shortAnswer: "The **Accent Sensitive and Case Sensitive** companion to `utf8mb4_0900_ai_ci` (distinguishing both accents like `'e' != 'é'` and casing like `'A' != 'a'`).",
    explanation: "Provides maximum sorting precision in Unicode 9.0.",
    hint: "Accent Sensitive and Case Sensitive Unicode 9.0 collation.",
    level: "basic"
  },
  {
    question: "What is `utf8mb4_0900_as_ci`?",
    shortAnswer: "**Accent Sensitive and Case Insensitive**: Treats uppercase and lowercase as equal (`'A' = 'a'`), but distinguishes accented characters (`'e' != 'é'`).",
    explanation: "Useful for French or Spanish dictionaries where accents define distinct words.",
    hint: "Accent Sensitive and Case Insensitive.",
    level: "expert"
  },
  {
    question: "Why does `utf8mb4_0900_ai_ci` provide better performance for emoji sorting?",
    shortAnswer: "Because Unicode 9.0 contains comprehensive weight tables for modern emojis, sorting emojis in meaningful conceptual groupings rather than treating them as unassigned binary codepoints.",
    explanation: "Properly categorizes emojis in search and sort operations.",
    hint: "Contains native Unicode 9.0 weights for modern emojis and symbols.",
    level: "basic"
  },
  {
    question: "How do you set `utf8mb4_0900_ai_ci` as the global server default in `my.cnf`?",
    shortAnswer: "`[mysqld]`\n`character-set-server = utf8mb4`\n`collation-server = utf8mb4_0900_ai_ci`",
    explanation: "Standard configuration for production MySQL 8.0 servers.",
    hint: "Set collation-server = utf8mb4_0900_ai_ci in my.cnf.",
    level: "basic"
  },
  {
    question: "How does `utf8mb4_0900_ai_ci` support Indian scripts like Bengali and Hindi?",
    shortAnswer: "It orders Indic script consonants, vowels, and matras according to standard **Varnamala (alphabetical) dictionary ordering rules** specified by the Unicode Consortium.",
    explanation: "Ensures accurate alphabetical sorting of Indian names in educational and civic portals.",
    hint: "Sorts Indic characters according to standardized Unicode Varnamala dictionary order.",
    level: "basic"
  },
  {
    question: "What is a 'Language-Specific 0900 Collation' (e.g. `utf8mb4_de_pb_0900_ai_ci`)?",
    shortAnswer: "A collation tailored to specific national sorting standards, such as German phonebook sorting (treating `ä` as `ae`), while inheriting the modern Unicode 9.0 performance engine.",
    explanation: "Provides country-specific linguistic rules.",
    hint: "Tailored national collation (like German phonebook sorting) built on Unicode 9.0.",
    level: "expert"
  },
  {
    question: "What happens when you create a new database with `CREATE DATABASE db_name;` in MySQL 8.0 without specifying a collation?",
    shortAnswer: "It automatically defaults to **`CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`**.",
    explanation: "Default behavior in modern MySQL 8.0 installations.",
    hint: "Automatically defaults to utf8mb4 and utf8mb4_0900_ai_ci.",
    level: "basic"
  },
  {
    question: "Why should new applications NEVER use `utf8mb4_general_ci` in MySQL 8.0?",
    shortAnswer: "Because `utf8mb4_general_ci` is a **legacy, linguistically broken collation** with zero performance advantage in MySQL 8.0 over `utf8mb4_0900_ai_ci`.",
    explanation: "Legacy artifact from older MySQL versions with no modern use case.",
    hint: "It is linguistically inaccurate and has no performance benefit over 0900_ai_ci in MySQL 8.0.",
    level: "basic"
  },
  {
    question: "How does `utf8mb4_0900_ai_ci` handle Cyrillic, Greek, and Arabic scripts?",
    shortAnswer: "It handles multi-script text seamlessly in a single column, ordering each alphabet according to its native linguistic sorting rules.",
    explanation: "Enables true multi-lingual international databases.",
    hint: "Orders multi-script international text according to native linguistic rules.",
    level: "basic"
  },
  {
    question: "What is the memory footprint difference between `utf8mb4_0900_ai_ci` and `utf8mb4_bin`?",
    shortAnswer: "Both use identical 1-4 byte on-disk storage, but `utf8mb4_bin` requires zero collation weight tables in RAM, making `_bin` slightly lighter on CPU cache during massive in-memory sorts.",
    explanation: "Storage is identical; only sorting CPU complexity differs.",
    hint: "Identical on disk; _bin is lighter on CPU cache during in-memory sorts.",
    level: "expert"
  },
  {
    question: "Does `utf8mb4_0900_ai_ci` support case-insensitive searches on Cyrillic (Russian) letters?",
    shortAnswer: "Yes! Lowercase Russian letters (e.g. `москва`) match uppercase Russian letters (`МОСКВА`) identically under `utf8mb4_0900_ai_ci`.",
    explanation: "Universal case folding across all Unicode scripts.",
    hint: "Yes, supports full case-folding across Cyrillic, Greek, and Latin scripts.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 2 in Module 004_002?",
    shortAnswer: "`utf8mb4_0900_ai_ci` is the gold standard default collation in MySQL 8.0: it combines modern Unicode 9.0 linguistic accuracy across all global languages, up to 2x faster CPU sorting than older unicode collations, and enhanced NO-PAD security against trailing whitespace impersonation.",
    explanation: "The definitive collation choice for modern international database systems.",
    hint: "utf8mb4_0900_ai_ci combines Unicode 9.0 accuracy, 2x faster performance, and NO-PAD security.",
    level: "basic"
  }
];

export default questions;
