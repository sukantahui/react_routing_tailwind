// topic5_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 5
// Topic: Cleaning, masking, and reformatting text with REGEXREPLACE
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of REGEXREPLACE in Excel 365?",
    shortAnswer: "To replace occurrences of a regular expression pattern in a text string with a new replacement string or backreferenced group.",
    explanation: "Replaces legacy SUBSTITUTE and complex string formulas with high-speed pattern-based replacement.",
    hint: "Replaces regex pattern matches with replacement text.",
    level: "basic",
    codeExample: "=REGEXREPLACE(text, pattern, replacement, [occurrence], [case_sensitivity])"
  },
  {
    question: "How do you mask the first 8 digits of a 12-digit Indian Aadhaar number (e.g. `5482-9921-3344` &rarr; `XXXX-XXXX-3344`)?",
    shortAnswer: "=REGEXREPLACE(A2, \"^\\d{4}-\\d{4}-(\\d{4})$\", \"XXXX-XXXX-$1\")",
    explanation: "Captures the last 4 digits in group 1 and references them with `$1` in the replacement.",
    hint: "Use backreference $1 for the last 4 digits.",
    level: "basic",
    codeExample: "=REGEXREPLACE(A2, \"^\\d{4}-\\d{4}-(\\d{4})$\", \"XXXX-XXXX-$1\")"
  },
  {
    question: "What is a Backreference (e.g. `$1, $2`) in REGEXREPLACE?",
    shortAnswer: "A token in the replacement string that dynamically inserts the text matched by the corresponding parenthetical capturing group `(...)` in the pattern.",
    explanation: "$1 inserts group 1, $2 inserts group 2, etc.",
    hint: "$1 inserts group 1 match.",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"Banerjee, Swadeep\", \"^(\\w+),\\s+(\\w+)$\", \"$2 $1\")"
  },
  {
    question: "How do you strip all HTML and XML tags from a scraped text string using REGEXREPLACE?",
    shortAnswer: "=REGEXREPLACE(A2, \"<[^>]+>\", \"\")",
    explanation: "`<[^>]+>` matches any HTML tag from `<` to `>` and replaces it with an empty string.",
    hint: "<[^>]+> replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"<p>Hello <b>World</b></p>\", \"<[^>]+>\", \"\") &rarr; \"Hello World\""
  },
  {
    question: "How do you reformat a date from `DD/MM/YYYY` to standard SQL `YYYY-MM-DD` using backreferences?",
    shortAnswer: "=REGEXREPLACE(A2, \"^(\\d{2})/(\\d{2})/(\\d{4})$\", \"$3-$2-$1\")",
    explanation: "Group 1 is DD, Group 2 is MM, Group 3 is YYYY. `$3-$2-$1` rearranges them into YYYY-MM-DD.",
    hint: "Reorder groups: $3-$2-$1.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"26/08/2026\", \"^(\\d{2})/(\\d{2})/(\\d{4})$\", \"$3-$2-$1\")"
  },
  {
    question: "How do you collapse multiple consecutive whitespace characters, tabs, or newlines into a single clean space?",
    shortAnswer: "=TRIM(REGEXREPLACE(A2, \"\\s+\", \" \"))",
    explanation: "`\\s+` matches one or more whitespace characters and replaces them with a single space.",
    hint: "\\s+ replaced with \" \".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"Swadeep    Banerjee\", \"\\s+\", \" \")"
  },
  {
    question: "How do you remove all non-alphanumeric characters (symbols, punctuation) except spaces from a customer comment?",
    shortAnswer: "=REGEXREPLACE(A2, \"[^a-zA-Z0-9\\s]\", \"\")",
    explanation: "Negated character class `[^a-zA-Z0-9\\s]` matches all symbols and strips them.",
    hint: "[^a-zA-Z0-9\\s] replaced with \"\".",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"Invoice #88421 -- Paid!\", \"[^a-zA-Z0-9\\s]\", \"\")"
  },
  {
    question: "What is the default value of the `occurrence` argument in REGEXREPLACE?",
    shortAnswer: "0 (which replaces all matching occurrences across the string).",
    explanation: "Default occurrence = 0 performs global replacement.",
    hint: "Default is 0 (all occurrences).",
    level: "basic",
    codeExample: "occurrence = 0 &rarr; Global Replace"
  },
  {
    question: "How do you replace only the 1st occurrence of a pattern while leaving subsequent matches untouched?",
    shortAnswer: "Set `occurrence = 1` in the 4th argument: `=REGEXREPLACE(A2, pattern, replacement, 1)`.",
    explanation: "Specifying an integer N &ge; 1 targets only that specific match instance.",
    hint: "Pass 1 as the 4th argument.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(A2, \"INV-\", \"BILL-\", 1)"
  },
  {
    question: "How do you mask an email address like `swadeep.banerjee@corp.in` to `sw***@corp.in`?",
    shortAnswer: "=REGEXREPLACE(A2, \"^([^@]{2})[^@]+(@.+)$\", \"$1***$2\")",
    explanation: "Group 1 captures first 2 characters of username, Group 2 captures `@corp.in`, and middle characters are masked with `***`.",
    hint: "^([^@]{2})[^@]+(@.+)$ with replacement $1***$2.",
    level: "advanced",
    codeExample: "=REGEXREPLACE(\"swadeep.banerjee@corp.in\", \"^([^@]{2})[^@]+(@.+)$\", \"$1***$2\")"
  },
  {
    question: "How do you convert unformatted 10-digit phone numbers `9830111223` into standard format `(983) 011-1223`?",
    shortAnswer: "=REGEXREPLACE(A2, \"^(\\d{3})(\\d{3})(\\d{4})$\", \"($1) $2-$3\")",
    explanation: "Splits 10 digits into 3-3-4 groups and inserts parentheses and hyphens.",
    hint: "^(\\d{3})(\\d{3})(\\d{4})$ &rarr; ($1) $2-$3.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"9830111223\", \"^(\\d{3})(\\d{3})(\\d{4})$\", \"($1) $2-$3\")"
  },
  {
    question: "How do you strip all non-digit characters from a messy telephone string like `+91 (033) 2592-1144`?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\D\", \"\")",
    explanation: "`\\D` matches any non-digit character and replaces it with empty string `\"\"`.",
    hint: "\\D replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"+91 (033) 2592-1144\", \"\\D\", \"\") &rarr; \"9103325921144\""
  },
  {
    question: "How do you swap a `Last Name, First Name` string into `First Name Last Name` format in 1 formula?",
    shortAnswer: "=REGEXREPLACE(A2, \"^([^,]+),\\s*(.+)$\", \"$2 $1\")",
    explanation: "Group 1 captures last name, Group 2 captures first name, and `$2 $1` swaps their position.",
    hint: "^([^,]+),\\s*(.+)$ &rarr; $2 $1.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"Banerjee, Swadeep\", \"^([^,]+),\\s*(.+)$\", \"$2 $1\")"
  },
  {
    question: "How do you remove leading zeros from product codes like `000088421`?",
    shortAnswer: "=REGEXREPLACE(A2, \"^0+\", \"\")",
    explanation: "`^0+` matches one or more zeros at the start of the string.",
    hint: "^0+ replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"000088421\", \"^0+\", \"\") &rarr; \"88421\""
  },
  {
    question: "How do you replace multiple alternative spelling variations of a city name (e.g. `Calcutta|Kolkata`) with standard `Kolkata`?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\b(Calcutta|Kolkata)\\b\", \"Kolkata\", 0, 1)",
    explanation: "Alternation matches either spelling case-insensitively and replaces with standard name.",
    hint: "\\b(Calcutta|Kolkata)\\b replaced with \"Kolkata\".",
    level: "moderate",
    codeExample: "=REGEXREPLACE(A2, \"\\b(Calcutta|Kolkata)\\b\", \"Kolkata\", 0, 1)"
  },
  {
    question: "What happens if REGEXREPLACE finds no matches in the target text?",
    shortAnswer: "It returns the original unchanged text string without throwing an error.",
    explanation: "Graceful no-op behavior when patterns do not match.",
    hint: "Returns original text unmodified.",
    level: "basic",
    codeExample: "No match &rarr; Original text returned"
  },
  {
    question: "How do you sanitize SQL query parameters by removing semicolons, quotes, and comment dashes?",
    shortAnswer: "=REGEXREPLACE(A2, \"['\";]|--\", \"\")",
    explanation: "Matches single quotes, double quotes, semicolons, and SQL comment markers.",
    hint: "['\";]|-- replaced with \"\".",
    level: "advanced",
    codeExample: "=REGEXREPLACE(Input, \"['\";]|--\", \"\")"
  },
  {
    question: "How do you insert thousands separator commas into a numeric string `1000000` using regex lookahead?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\B(?=(\\d{3})+(?!\\d))\", \",\")",
    explanation: "Uses zero-width non-word boundary and positive lookahead to place commas every 3 digits.",
    hint: "\\B(?=(\\d{3})+(?!\\d)) replaced with \",\".",
    level: "expert",
    codeExample: "=REGEXREPLACE(\"1000000\", \"\\B(?=(\\d{3})+(?!\\d))\", \",\")"
  },
  {
    question: "Can REGEXREPLACE operate on an entire column range (e.g. `A5:A1000`) in a single dynamic array formula?",
    shortAnswer: "Yes, passing a range like `=REGEXREPLACE(A5:A1000, \"<[^>]+>\", \"\")` spills a sanitized column vector instantly.",
    explanation: "Fully vectorized dynamic array support.",
    hint: "Spills vertical column array when passed a column range.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(A5:A1000, \"<[^>]+>\", \"\")"
  },
  {
    question: "How do you mask 16-digit credit card numbers leaving only the last 4 digits visible?",
    shortAnswer: "=REGEXREPLACE(A2, \"^\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?(\\d{4})$\", \"XXXX-XXXX-XXXX-$1\")",
    explanation: "Captures the 4th block of digits in group 1 and masks the first 3 blocks with 'XXXX-XXXX-XXXX-'.",
    hint: "XXXX-XXXX-XXXX-$1.",
    level: "basic",
    codeExample: "=REGEXREPLACE(Card, \"^\\d{4}-\\d{4}-\\d{4}-(\\d{4})$\", \"XXXX-XXXX-XXXX-$1\")"
  },
  {
    question: "How do you convert camelCase or PascalCase strings like `CustomerMasterData` into space-separated words `Customer Master Data`?",
    shortAnswer: "=REGEXREPLACE(A2, \"([a-z])([A-Z])\", \"$1 $2\")",
    explanation: "Captures lowercase character followed by uppercase character and inserts a space between them.",
    hint: "([a-z])([A-Z]) &rarr; $1 $2.",
    level: "advanced",
    codeExample: "=REGEXREPLACE(\"CustomerMasterData\", \"([a-z])([A-Z])\", \"$1 $2\")"
  },
  {
    question: "How do you replace all non-printable ASCII control characters (ASCII 0 to 31) from legacy text exports?",
    shortAnswer: "=REGEXREPLACE(A2, \"[\\x00-\\x1F]\", \"\")",
    explanation: "Hexadecimal range `[\\x00-\\x1F]` strips invisible ASCII control codes.",
    hint: "[\\x00-\\x1F] replaced with \"\".",
    level: "expert",
    codeExample: "=REGEXREPLACE(RawExport, \"[\\x00-\\x1F]\", \"\")"
  },
  {
    question: "How do you strip markdown formatting like bold `**text**` and italic `*text*` from text strings?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\*{1,2}([^*]+)\\*{1,2}\", \"$1\")",
    explanation: "Matches surrounding asterisks and preserves only the inner text content `$1`.",
    hint: "\\*{1,2}([^*]+)\\*{1,2} &rarr; $1.",
    level: "advanced",
    codeExample: "=REGEXREPLACE(\"**Urgent** Notice\", \"\\*+([^*]+)\\*+\", \"$1\")"
  },
  {
    question: "How do you standardize Indian currency symbols by converting `Rs.`, `Rs`, `INR `, or `Rs. ` to standard `₹`?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\b(Rs\\.?|INR)\\s*\", \"₹\")",
    explanation: "Matches common currency abbreviations with optional trailing spaces and replaces with `₹`.",
    hint: "\\b(Rs\\.?|INR)\\s* &rarr; ₹.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"Rs. 45000\", \"\\b(Rs\\.?|INR)\\s*\", \"₹\")"
  },
  {
    question: "How do you create a named LAMBDA `FX_CLEAN_TEXT` that strips HTML and normalizes whitespace in 1 call?",
    shortAnswer: "=LAMBDA(rawText, TRIM(REGEXREPLACE(REGEXREPLACE(rawText, \"<[^>]+>\", \"\"), \"\\s+\", \" \")))",
    explanation: "Chains HTML stripping with whitespace normalization in a reusable 1-parameter corporate function.",
    hint: "LAMBDA(t, TRIM(REGEXREPLACE(REGEXREPLACE(t, \"<[^>]+>\", \"\"), \"\\s+\", \" \"))).",
    level: "advanced",
    codeExample: "FX_CLEAN_TEXT = LAMBDA(t, TRIM(REGEXREPLACE(REGEXREPLACE(t, \"<[^>]+>\", \"\"), \"\\s+\", \" \")))"
  },
  {
    question: "How do you remove file extensions from filenames (e.g. `Audit_Report_2026.xlsx` &rarr; `Audit_Report_2026`)?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\.[a-zA-Z0-9]+$\", \"\")",
    explanation: "Matches the dot and extension at the end of the string and replaces with empty string.",
    hint: "\\.[a-zA-Z0-9]+$ replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"Audit.xlsx\", \"\\.[a-zA-Z0-9]+$\", \"\")"
  },
  {
    question: "What is the speed advantage of REGEXREPLACE over chaining 8 nested SUBSTITUTE functions?",
    shortAnswer: "A single REGEXREPLACE pattern executes in 1 pass in compiled C++ RAM, whereas 8 nested SUBSTITUTE functions recreate strings 8 times, causing massive calculation lag.",
    explanation: "Single-pass regex compilation vs repeated O(N) memory string allocations.",
    hint: "Single-pass SIMD execution vs 8x string reallocation.",
    level: "expert",
    codeExample: "1 Fast REGEXREPLACE vs 8 Slow Nested SUBSTITUTE Functions"
  },
  {
    question: "How do you replace all vowels in a word with an asterisk `*`?",
    shortAnswer: "=REGEXREPLACE(A2, \"[aeiouAEIOU]\", \"*\")",
    explanation: "Character class matches all uppercase and lowercase English vowels.",
    hint: "[aeiouAEIOU] replaced with \"*\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"Barrackpore\", \"[aeiouAEIOU]\", \"*\")"
  },
  {
    question: "How do you extract domain URLs from email addresses by replacing the username and `@` sign?",
    shortAnswer: "=REGEXREPLACE(A2, \"^[^@]+@\", \"\")",
    explanation: "Matches everything up to the `@` symbol and deletes it, leaving only the domain.",
    hint: "^[^@]+@ replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"tuhina@shyamnagar.org\", \"^[^@]+@\", \"\") &rarr; \"shyamnagar.org\""
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for data cleaning and masking with REGEXREPLACE?",
    shortAnswer: "Never leave sensitive statutory identifiers (like Aadhaar, PAN, or Credit Cards) unmasked in corporate reports! Use REGEXREPLACE with capturing groups and backreferences ($1, $2) to sanitize data at scale, reorder date components, and strip noisy HTML/whitespace in sub-millisecond memory speed!",
    explanation: "Mastering REGEXREPLACE ensures absolute data privacy compliance and pristine ETL data hygiene!",
    hint: "Backreferences ($1, $2) + Capturing Groups + Single-Pass Cleaning = Pristine Data Hygiene!",
    level: "expert",
    codeExample: "Rule: Data Privacy & ETL Cleansing &rarr; Deploy REGEXREPLACE + Backreferences!"
  }
];

export default questions;
