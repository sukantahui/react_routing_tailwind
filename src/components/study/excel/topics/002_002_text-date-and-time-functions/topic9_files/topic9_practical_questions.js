// topic9_files/topic9_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 9: REPLACE and SUBSTITUTE

export const practicalQuestions = [
  {
    id: 1,
    title: "Replacing Space Delimiters with Hyphens in Product SKU Codes",
    functionUsed: "SUBSTITUTE",
    category: "Global Text Replacement",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Legacy product SKU codes are entered with spaces such as 'ELEC 2026 PRO BLK' in cell A2. The inventory system requires uniform hyphen separation ('ELEC-2026-PRO-BLK'). Replace all spaces globally.",
    inputCell: 'A2 = "ELEC 2026 PRO BLK"',
    targetCell: "B2",
    formula: '=SUBSTITUTE(A2, " ", "-")',
    evaluatedOutput: '"ELEC-2026-PRO-BLK"',
    outputType: "Text String",
    stepByStepLogic: [
      "SUBSTITUTE(text, old_text, new_text, [instance_num]) searches for all occurrences of old_text when instance_num is omitted.",
      "Replaces every space character ' ' with a hyphen '-'.",
      "Outputs 'ELEC-2026-PRO-BLK' ready for barcode scanner databases."
    ],
    proTip: "Unlike REPLACE (which needs character positions), SUBSTITUTE operates entirely on matching string content."
  },
  {
    id: 2,
    title: "Masking the Middle 6 Digits of an Indian Aadhaar or Credit Card Number",
    functionUsed: "REPLACE",
    category: "Positional Masking",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "A customer payment table stores 16-digit card numbers in cell A3 ('4532-8921-3456-9812'). To comply with PCI-DSS compliance, mask the middle 6 characters starting at character position 6 with '******'.",
    inputCell: 'A3 = "4532-8921-3456-9812"',
    targetCell: "B3",
    formula: '=REPLACE(A3, 6, 6, "******")',
    evaluatedOutput: '"4532-******456-9812"',
    outputType: "Text String",
    stepByStepLogic: [
      "REPLACE(old_text, start_num, num_chars, new_text) targets character index 6.",
      "Removes exactly 6 characters starting from index 6 ('8921-3').",
      "Inserts '******' in their place, producing a compliant masked string."
    ],
    proTip: "Use REPLACE when the character positions are fixed, and SUBSTITUTE when the content to replace is known but in variable positions."
  },
  {
    id: 3,
    title: "Replacing Only the Second Occurrence of a Delimiter",
    functionUsed: "SUBSTITUTE with Instance Number",
    category: "Targeted Instance Replacement",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "A hierarchical category string in cell A4 is 'Electronics/Audio/Wireless/Headphones'. You need to replace only the 2nd forward slash '/' with ' -> ' to mark a major department tier divide.",
    inputCell: 'A4 = "Electronics/Audio/Wireless/Headphones"',
    targetCell: "B4",
    formula: '=SUBSTITUTE(A4, "/", " -> ", 2)',
    evaluatedOutput: '"Electronics/Audio -> Wireless/Headphones"',
    outputType: "Text String",
    stepByStepLogic: [
      "Supplying instance_num = 2 targets exclusively the 2nd instance of '/'.",
      "The 1st and 3rd slashes remain untouched.",
      "Evaluates to 'Electronics/Audio -> Wireless/Headphones'."
    ],
    proTip: "Specifying instance_num prevents accidental replacement of preceding or following delimiters."
  },
  {
    id: 4,
    title: "Counting Specific Character Occurrences via LEN and SUBSTITUTE",
    functionUsed: "LEN & SUBSTITUTE Combination",
    category: "Character Frequency Analysis",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Cell A5 contains a comma-separated list of transaction tags: 'URGENT,RECONCILED,FLAGGED,PENDING,AUDIT'. Count how many tags (items) are in the list by counting the commas plus 1.",
    inputCell: 'A5 = "URGENT,RECONCILED,FLAGGED,PENDING,AUDIT"',
    targetCell: "B5",
    formula: '=LEN(A5)-LEN(SUBSTITUTE(A5, ",", ""))+1',
    evaluatedOutput: "5",
    outputType: "Numeric Integer",
    stepByStepLogic: [
      "LEN(A5) computes the total string length (42 characters).",
      "SUBSTITUTE(A5, ',', '') strips all commas from the string (length 38).",
      "LEN(A5) - LEN(...) yields the number of commas (4). Adding 1 returns total count of tags (5)."
    ],
    proTip: "If cell A5 might be blank, wrap with IF: =IF(ISBLANK(A5), 0, LEN(A5)-LEN(SUBSTITUTE(A5, \",\", \"\"))+1)."
  },
  {
    id: 5,
    title: "Stripping Non-Breaking Spaces (CHAR(160)) Copied from Web Portals",
    functionUsed: "SUBSTITUTE with CHAR",
    category: "Data Hygiene & Normalization",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Data imported from a web ERP contains stubborn non-breaking spaces (ASCII 160) in cell A6 ('₹ 95,000') that Excel's TRIM function refuses to delete. Substitute CHAR(160) with standard space CHAR(32) and trim it.",
    inputCell: 'A6 = "₹ 95,000" (contains ASCII 160)',
    targetCell: "B6",
    formula: '=TRIM(SUBSTITUTE(A6, CHAR(160), " "))',
    evaluatedOutput: '"₹ 95,000"',
    outputType: "Cleaned Text",
    stepByStepLogic: [
      "CHAR(160) generates the hidden web non-breaking space character.",
      "SUBSTITUTE replaces every instance of CHAR(160) with a standard space \" \".",
      "TRIM collapses any redundant regular spaces, allowing subsequent number parsing."
    ],
    proTip: "This formula is the industry standard for fixing 'broken numbers' pasted from web dashboards and HTML tables."
  },
  {
    id: 6,
    title: "Chained Nested SUBSTITUTE for Multi-Character Sanitization",
    functionUsed: "Nested SUBSTITUTE",
    category: "Sanitization & Punctuation Stripping",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "Customer phone numbers arrive in diverse formats like '(033) 2456-7890'. Strip out opening parenthesis '(', closing parenthesis ')', spaces ' ', and hyphens '-' to produce clean 10-digit numeric text.",
    inputCell: 'A7 = "(033) 2456-7890"',
    targetCell: "B7",
    formula: '=SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A7, "(", ""), ")", ""), " ", ""), "-", "")',
    evaluatedOutput: '"03324567890"',
    outputType: "Text String",
    stepByStepLogic: [
      "Inner SUBSTITUTE strips '(': '033) 2456-7890'.",
      "Next layer strips ')': '033 2456-7890'.",
      "Next layer strips ' ': '0332456-7890'.",
      "Outer layer strips '-': '03324567890'."
    ],
    proTip: "In modern Excel 365, you can also use REDUCE with LAMBDA to sanitize arbitrary arrays of illegal characters without deep nesting."
  },
  {
    id: 7,
    title: "Dynamic Filename Extension Updating via REPLACE and FIND",
    functionUsed: "REPLACE & FIND Combination",
    category: "Dynamic Positional Editing",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "A column of image asset paths contains names like 'annual_report_2026.png' in cell A8. Dynamically replace whatever extension follows the final dot '.' with 'webp' regardless of file extension length (.png, .jpeg, .tiff).",
    inputCell: 'A8 = "annual_report_2026.png"',
    targetCell: "B8",
    formula: '=REPLACE(A8, FIND(".", A8) + 1, LEN(A8) - FIND(".", A8), "webp")',
    evaluatedOutput: '"annual_report_2026.webp"',
    outputType: "Text String",
    stepByStepLogic: [
      "FIND('.', A8) identifies the exact character position of the dot (19).",
      "start_num is 19 + 1 = 20 (where the extension begins).",
      "num_chars is calculated as LEN(A8) - FIND('.', A8) = 22 - 18 = 3 ('png').",
      "REPLACE swaps 'png' for 'webp'."
    ],
    proTip: "In Excel 365, =TEXTBEFORE(A8, \".\") & \".webp\" is a cleaner alternative."
  },
  {
    id: 8,
    title: "Case-Sensitive Product Code Correction (SUBSTITUTE vs Case-Sensitivity)",
    functionUsed: "SUBSTITUTE",
    category: "Case-Sensitive Replacement",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A batch code in cell A9 contains 'Batch-v1-prod-V1-final'. Replace uppercase version flag 'V1' with 'V2' while leaving lowercase 'v1' completely unchanged.",
    inputCell: 'A9 = "Batch-v1-prod-V1-final"',
    targetCell: "B9",
    formula: '=SUBSTITUTE(A9, "V1", "V2")',
    evaluatedOutput: '"Batch-v1-prod-V2-final"',
    outputType: "Text String",
    stepByStepLogic: [
      "SUBSTITUTE is strictly case-sensitive by default.",
      "Matches only uppercase 'V1' and skips lowercase 'v1'.",
      "Evaluates to 'Batch-v1-prod-V2-final'."
    ],
    proTip: "If you need case-insensitive replacement in Excel, use REGEXREPLACE (Excel 365 Insider) or helper columns."
  },
  {
    id: 9,
    title: "Replacing the Last Occurrence of a Delimiter Using LEN Math",
    functionUsed: "SUBSTITUTE & LEN Math",
    category: "Targeted Instance Replacement",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "A file directory path in cell A10 is 'C:/Reports/Financials/2026/Q4_Audit.xlsx'. Replace only the LAST forward slash '/' with a pipe symbol '|' to isolate folder path from file name.",
    inputCell: 'A10 = "C:/Reports/Financials/2026/Q4_Audit.xlsx"',
    targetCell: "B10",
    formula: '=SUBSTITUTE(A10, "/", "|", LEN(A10)-LEN(SUBSTITUTE(A10, "/", "")))',
    evaluatedOutput: '"C:/Reports/Financials/2026|Q4_Audit.xlsx"',
    outputType: "Text String",
    stepByStepLogic: [
      "LEN(A10) - LEN(SUBSTITUTE(A10, '/', '')) calculates total count of slashes (4).",
      "Passes this total count (4) directly into the instance_num argument of the outer SUBSTITUTE.",
      "Replaces exclusively the 4th (and final) slash with '|'."
    ],
    proTip: "This is the classic, formula-only technique to locate the last delimiter in pre-Excel 365 environments."
  },
  {
    id: 10,
    title: "Inserting a New Substring Without Overwriting (Zero Character Replacement)",
    functionUsed: "REPLACE with num_chars = 0",
    category: "Positional Insertion",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Employee codes in cell A11 are formatted as 'EMP1008'. You need to insert a hyphen '-' between 'EMP' and '1008' without deleting or overwriting any existing characters.",
    inputCell: 'A11 = "EMP1008"',
    targetCell: "B11",
    formula: '=REPLACE(A11, 4, 0, "-")',
    evaluatedOutput: '"EMP-1008"',
    outputType: "Text String",
    stepByStepLogic: [
      "REPLACE(A11, 4, 0, '-') targets character position 4.",
      "Setting num_chars = 0 instructs Excel to delete ZERO characters.",
      "Inserts '-' right before position 4, converting 'EMP1008' into 'EMP-1008'."
    ],
    proTip: "Setting num_chars = 0 turns the REPLACE function into a precise positional string injector."
  }
];

export default practicalQuestions;
