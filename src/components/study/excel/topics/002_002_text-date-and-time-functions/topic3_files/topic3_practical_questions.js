// topic3_files/topic3_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 3: Character encoding & substitution (EXACT, REPLACE, SUBSTITUTE, CHAR, CODE)

export const practicalQuestions = [
  {
    id: 1,
    title: "Case-Sensitive Password & Voucher Code Verification",
    functionUsed: "EXACT",
    category: "Security & Validation",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "An e-commerce gift card validation system compares the entered voucher code in A2 ('PROMO2025') against the database master key in B2 ('Promo2025'). Verify whether the two strings are 100% case-exact.",
    inputCell: 'A2 = "PROMO2025", B2 = "Promo2025"',
    targetCell: "C2",
    formula: '=EXACT(A2, B2)',
    evaluatedOutput: "FALSE",
    outputType: "Boolean (TRUE/FALSE)",
    stepByStepLogic: [
      "The standard comparison =(A2=B2) in Excel is case-insensitive and would erroneously return TRUE.",
      "EXACT(A2, B2) performs a strict binary character-by-character comparison.",
      "Detects that 'PROMO' does not match 'Promo' and correctly returns FALSE."
    ],
    proTip: "Never use simple equality (=) for security tokens, passwords, or case-sensitive voucher keys; always use EXACT()."
  },
  {
    id: 2,
    title: "Masking Credit Card / Account Numbers for Compliance (PCI-DSS)",
    functionUsed: "REPLACE & REPT",
    category: "Data Masking",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Customer payment records store 16-digit card numbers in cell A3 ('4532890123456789'). Mask the first 12 digits with 'X' characters, leaving only the last 4 digits visible for customer receipts (e.g. 'XXXXXXXXXXXX6789').",
    inputCell: 'A3 = "4532890123456789"',
    targetCell: "B3",
    formula: '=REPLACE(A3, 1, 12, "XXXXXXXXXXXX")',
    alternativeFormula: '=REPLACE(A3, 1, 12, REPT("X", 12))',
    evaluatedOutput: '"XXXXXXXXXXXX6789"',
    outputType: "Masked String",
    stepByStepLogic: [
      "REPLACE(old_text, start_num, num_chars, new_text) targets position 1.",
      "Specifies num_chars = 12, which removes the first 12 characters.",
      "Inserts 'XXXXXXXXXXXX' in their place, leaving the remaining 4 characters ('6789') intact."
    ],
    proTip: "REPLACE is positional (operates on character indices); SUBSTITUTE is content-based (operates on matching text patterns)."
  },
  {
    id: 3,
    title: "Replacing the 2nd Occurrence of a Delimiter Only",
    functionUsed: "SUBSTITUTE with [instance_num]",
    category: "Targeted Substitution",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A compound serial code in cell A4 is 'KOL-FIN-2025-001'. Replace only the 2nd hyphen with a slash (/) to conform to statutory invoice numbering ('KOL-FIN/2025-001').",
    inputCell: 'A4 = "KOL-FIN-2025-001"',
    targetCell: "B4",
    formula: '=SUBSTITUTE(A4, "-", "/", 2)',
    evaluatedOutput: '"KOL-FIN/2025-001"',
    outputType: "Standardized Serial",
    stepByStepLogic: [
      "SUBSTITUTE(text, old_text, new_text, [instance_num]) locates all hyphens.",
      "Passing instance_num = 2 targets exclusively the 2nd hyphen.",
      "The 1st and 3rd hyphens remain untouched, producing 'KOL-FIN/2025-001'."
    ],
    proTip: "If instance_num is omitted, SUBSTITUTE replaces every occurrence in the text. Always specify instance_num for selective delimiter replacement."
  },
  {
    id: 4,
    title: "Converting Line Breaks (CHAR 10) to Semicolon Separators",
    functionUsed: "SUBSTITUTE & CHAR(10)",
    category: "Whitespace & Line Breaks",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Customer notes exported from a CRM contain multi-line bullet points separated by line breaks in cell A5 ('Order Confirmed' & CHAR(10) & 'Payment Verified' & CHAR(10) & 'Dispatched'). Replace all line breaks with '; ' for single-row CSV exports.",
    inputCell: 'A5 = "Order Confirmed" & CHAR(10) & "Payment Verified" & CHAR(10) & "Dispatched"',
    targetCell: "B5",
    formula: '=SUBSTITUTE(A5, CHAR(10), "; ")',
    evaluatedOutput: '"Order Confirmed; Payment Verified; Dispatched"',
    outputType: "Single-Line Text",
    stepByStepLogic: [
      "CHAR(10) represents the ASCII line feed character inserted when users press Alt + Enter in Excel.",
      "SUBSTITUTE replaces every instance of CHAR(10) with '; '.",
      "Flattens multi-line records without losing structural separation."
    ],
    proTip: "On Windows Excel, line breaks are CHAR(10). On Mac Excel, legacy files may use CHAR(13); use SUBSTITUTE(SUBSTITUTE(A5, CHAR(13), \"; \"), CHAR(10), \"; \") for cross-platform safety."
  },
  {
    id: 5,
    title: "Identifying Leading ASCII / ANSI Character Codes for Encoding Audit",
    functionUsed: "CODE",
    category: "Character Encoding",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "An engineer inspects mystery delimiter characters imported into cell A6 ('#'). Return the integer ASCII character code of the first character to configure an ETL data pipeline.",
    inputCell: 'A6 = "#"',
    targetCell: "B6",
    formula: '=CODE(A6)',
    evaluatedOutput: "35",
    outputType: "Integer (ASCII Code)",
    stepByStepLogic: [
      "CODE(text) returns the numeric code for the first character in the given text string.",
      "For '#', CODE returns integer 35.",
      "Enables developers to programmatically verify delimiter bytes."
    ],
    proTip: "Use CODE() to diagnose invisible characters (e.g. CODE(A6)=160 confirms a web non-breaking space; CODE(A6)=32 confirms a standard space)."
  },
  {
    id: 6,
    title: "Counting Total Words in a Sentence Using Length Differential",
    functionUsed: "LEN & SUBSTITUTE",
    category: "Advanced Algorithms",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "HR job application essays in cell A7 contain narrative text ('Certified Financial Auditor with Enterprise ERP Experience'). Calculate the exact word count automatically using formula mechanics.",
    inputCell: 'A7 = "Certified Financial Auditor with Enterprise ERP Experience"',
    targetCell: "B7",
    formula: '=LEN(TRIM(A7)) - LEN(SUBSTITUTE(TRIM(A7), " ", "")) + 1',
    evaluatedOutput: "7",
    outputType: "Integer (Word Count)",
    stepByStepLogic: [
      "TRIM(A7) normalizes all internal spaces to single spaces (total length = 60).",
      "SUBSTITUTE(TRIM(A7), \" \", \"\") strips all spaces (length without spaces = 54).",
      "Subtracting the two lengths (60 - 54 = 6) gives the exact count of space delimiters.",
      "Adding 1 (6 + 1 = 7) yields the total number of words in the sentence."
    ],
    proTip: "This length-differential pattern (LEN(text) - LEN(SUBSTITUTE(text, char, \"\"))) is the universal formula for counting character occurrences in Excel."
  },
  {
    id: 7,
    title: "Sanitizing Old Currency Symbols to New ISO Codes",
    functionUsed: "SUBSTITUTE (Nested)",
    category: "Data Standardization",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Legacy price lists in cell A8 contain old currency prefixes 'Rs. 1,450.00'. Standardize all instances by replacing 'Rs.' with 'INR' and removing periods.",
    inputCell: 'A8 = "Rs. 1,450.00"',
    targetCell: "B8",
    formula: '=TRIM(SUBSTITUTE(A8, "Rs.", "INR"))',
    evaluatedOutput: '"INR 1,450.00"',
    outputType: "Standardized Price",
    stepByStepLogic: [
      "SUBSTITUTE(A8, \"Rs.\", \"INR\") replaces the legacy prefix.",
      "TRIM(...) ensures uniform spacing between the currency symbol and the number.",
      "Returns clean ISO-standard price label 'INR 1,450.00'."
    ],
    proTip: "Nested SUBSTITUTE calls can chain multiple symbol replacements: =SUBSTITUTE(SUBSTITUTE(A8, \"$\", \"USD \"), \"€\", \"EUR \")."
  },
  {
    id: 8,
    title: "Replacing the Last Occurrence of a Variable-Count Delimiter",
    functionUsed: "SUBSTITUTE & LEN Differential",
    category: "Advanced Algorithms",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "A file path in cell A9 is 'C:\\Reports\\2025\\Finance\\Q3_Summary.xlsx'. Replace ONLY the last backslash (\\) with ' > ' to isolate the parent folder from the file name.",
    inputCell: 'A9 = "C:\\Reports\\2025\\Finance\\Q3_Summary.xlsx"',
    targetCell: "B9",
    formula: '=SUBSTITUTE(A9, "\\", " > ", LEN(A9) - LEN(SUBSTITUTE(A9, "\\", "")))',
    evaluatedOutput: '"C:\\Reports\\2025\\Finance > Q3_Summary.xlsx"',
    outputType: "Formatted Path",
    stepByStepLogic: [
      "LEN(A9) - LEN(SUBSTITUTE(A9, \"\\\", \"\")) dynamically calculates the total count of backslashes (4).",
      "Passing this count as the 4th argument (instance_num = 4) tells SUBSTITUTE to replace only the 4th (final) backslash.",
      "Replaces the last backslash with ' > ', leaving the first 3 backslashes untouched."
    ],
    proTip: "This is the enterprise standard formula for targeting the last delimiter when the path depth or token count varies."
  },
  {
    id: 9,
    title: "Dynamic Visual Bullet Symbol Injection for Executive Reports",
    functionUsed: "CHAR & & Operator",
    category: "Formatted Output",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Format a executive memo note in cell A10 ('All tax filings submitted on time') with a high-impact circular bullet symbol (• / CHAR 149) and a tab space.",
    inputCell: 'A10 = "All tax filings submitted on time"',
    targetCell: "B10",
    formula: '=CHAR(149) & " " & A10',
    evaluatedOutput: '"• All tax filings submitted on time"',
    outputType: "Bulletized String",
    stepByStepLogic: [
      "CHAR(149) returns the standard bullet point character (•).",
      "Concatenates with a space and cell A10.",
      "Produces polished executive dashboard annotations without manual copy-pasting of symbols."
    ],
    proTip: "Useful CHAR codes for reports: CHAR(149) for bullet (•), CHAR(174) for registered trademark (®), CHAR(169) for copyright (©)."
  },
  {
    id: 10,
    title: "Case-Insensitive Substring Replacement with UPPER Masking",
    functionUsed: "REPLACE, SEARCH & LEN",
    category: "Advanced Algorithms",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "SUBSTITUTE is strictly case-sensitive. In cell A11 ('Urgent: Contact support team for support'), replace the first occurrence of the word 'support' (regardless of whether typed as 'Support', 'SUPPORT', or 'support') with 'Helpdesk'.",
    inputCell: 'A11 = "Urgent: Contact support team for support"',
    targetCell: "B11",
    formula: '=REPLACE(A11, SEARCH("support", A11), LEN("support"), "Helpdesk")',
    evaluatedOutput: '"Urgent: Contact Helpdesk team for support"',
    outputType: "Targeted Replacement",
    stepByStepLogic: [
      "SEARCH(\"support\", A11) finds the starting character position of 'support' case-insensitively (position 17).",
      "LEN(\"support\") calculates the length to replace (7 characters).",
      "REPLACE(A11, 17, 7, \"Helpdesk\") replaces the target text cleanly regardless of original casing."
    ],
    proTip: "To achieve case-insensitive text replacement in Excel, combine positional REPLACE() with case-insensitive SEARCH()."
  }
];

export default practicalQuestions;
