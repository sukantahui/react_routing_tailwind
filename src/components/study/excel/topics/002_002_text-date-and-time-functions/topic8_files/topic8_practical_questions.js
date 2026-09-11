// topic8_files/topic8_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 8: Modern Text Manipulation (TEXTBEFORE, TEXTAFTER, TEXTSPLIT)

export const practicalQuestions = [
  {
    id: 1,
    title: "Extracting First Name with Modern TEXTBEFORE (No FIND Required)",
    functionUsed: "TEXTBEFORE",
    category: "Prefix Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Customer full name in cell A2 is 'Subhashree Chattopadhyay'. Extract the variable-length first name in a single modern formula without nesting FIND() or subtracting character lengths.",
    inputCell: 'A2 = "Subhashree Chattopadhyay"',
    targetCell: "B2",
    formula: '=TEXTBEFORE(A2, " ")',
    evaluatedOutput: '"Subhashree"',
    outputType: "Text String",
    stepByStepLogic: [
      "TEXTBEFORE(text, delimiter) scans the text and automatically returns everything preceding the first occurrence of the delimiter.",
      "Replaces the legacy formula =LEFT(A2, FIND(\" \", A2)-1).",
      "Outputs 'Subhashree' cleanly in a single readable function."
    ],
    proTip: "If the delimiter might be missing, supply the optional match_mode and if_not_found arguments: =TEXTBEFORE(A2, \" \", , , , A2)."
  },
  {
    id: 2,
    title: "Extracting Last Name / Surname with Modern TEXTAFTER",
    functionUsed: "TEXTAFTER with Negative Instance (-1)",
    category: "Suffix Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "In cell A3 ('Dr. Anirban Kumar Mukherjee'), extract the last name ('Mukherjee') regardless of whether the person has titles, middle names, or variable name tokens.",
    inputCell: 'A3 = "Dr. Anirban Kumar Mukherjee"',
    targetCell: "B3",
    formula: '=TEXTAFTER(A3, " ", -1)',
    evaluatedOutput: '"Mukherjee"',
    outputType: "Text String",
    stepByStepLogic: [
      "TEXTAFTER(text, delimiter, [instance_num]) accepts negative instance numbers.",
      "Setting instance_num = -1 instructs Excel to search from the RIGHT end of the string.",
      "Extracts everything after the final space delimiter, effortlessly returning 'Mukherjee'."
    ],
    proTip: "Using instance_num = -1 in TEXTAFTER eliminates the complex legacy formula =RIGHT(A3, LEN(A3)-FIND(\"@\", SUBSTITUTE(A3, \" \", \"@\", LEN(A3)-LEN(SUBSTITUTE(A3, \" \", \"\")))))."
  },
  {
    id: 3,
    title: "Dynamic Array Splitting into Multiple Column Cells (TEXTSPLIT)",
    functionUsed: "TEXTSPLIT",
    category: "Dynamic Array Splitting",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A comma-separated list of product tags in cell A4 ('Laptops, Monitors, Keyboards, Mice') must be parsed into 4 distinct horizontal column cells (B4:E4).",
    inputCell: 'A4 = "Laptops, Monitors, Keyboards, Mice"',
    targetCell: "B4:E4 (Spilled Array)",
    formula: '=TEXTSPLIT(A4, ", ")',
    evaluatedOutput: 'Spilled Array: ["Laptops", "Monitors", "Keyboards", "Mice"]',
    outputType: "Horizontal Spilled Array",
    stepByStepLogic: [
      "TEXTSPLIT(text, col_delimiter, [row_delimiter]) parses text into dynamic spilled arrays.",
      "Supplying ', ' as the col_delimiter splits the text into separate adjacent columns across B4, C4, D4, E4.",
      "Spills automatically without needing legacy Text-to-Columns wizard."
    ],
    proTip: "To trim unwanted whitespace around spilled elements automatically, wrap with TRIM: =TRIM(TEXTSPLIT(A4, \",\"))."
  },
  {
    id: 4,
    title: "Splitting Comma-Separated Data Vertically into Multiple Rows",
    functionUsed: "TEXTSPLIT (Row Delimiter)",
    category: "Dynamic Array Splitting",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A single cell A5 contains multiple branch names separated by semicolons ('Kolkata; Siliguri; Durgapur; Asansol'). Split them vertically down a column into multiple rows (A6:A9).",
    inputCell: 'A5 = "Kolkata; Siliguri; Durgapur; Asansol"',
    targetCell: "A6:A9 (Spilled Column)",
    formula: '=TEXTSPLIT(A5, , "; ")',
    evaluatedOutput: 'Vertical Spilled Array: ["Kolkata"; "Siliguri"; "Durgapur"; "Asansol"]',
    outputType: "Vertical Spilled Array",
    stepByStepLogic: [
      "Leaving col_delimiter empty and supplying row_delimiter = '; ' tells TEXTSPLIT to split downwards into rows.",
      "Generates a vertical array spilling from cell A6 down to A9.",
      "Perfect for normalizing unpivoted summary tables."
    ],
    proTip: "Syntax: TEXTSPLIT(text, [col_delimiter], [row_delimiter]). Notice the comma skipping the col_delimiter argument."
  },
  {
    id: 5,
    title: "Extracting Middle Token Between 2 Delimiters in a Single Clean Step",
    functionUsed: "TEXTBEFORE & TEXTAFTER",
    category: "Token Isolation",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "ERP transaction reference in cell A6 is 'TXN-50142-CC902'. Extract the middle token '50142' without nested FIND calculations.",
    inputCell: 'A6 = "TXN-50142-CC902"',
    targetCell: "B6",
    formula: '=TEXTBEFORE(TEXTAFTER(A6, "-"), "-")',
    evaluatedOutput: '"50142"',
    outputType: "Text Token",
    stepByStepLogic: [
      "TEXTAFTER(A6, \"-\") extracts everything after the 1st hyphen: '50142-CC902'.",
      "TEXTBEFORE(..., \"-\") extracts everything before the remaining hyphen: '50142'.",
      "Replaces over 60 characters of legacy MID + FIND + FIND formula with an intuitive 30-character expression."
    ],
    proTip: "Alternative syntax: =INDEX(TEXTSPLIT(A6, \"-\"), 2) achieves the same result using array indexing."
  },
  {
    id: 6,
    title: "Splitting Data by Multiple Different Delimiters Simultaneously",
    functionUsed: "TEXTSPLIT with Delimiter Array",
    category: "Dynamic Array Splitting",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A raw log string in cell A7 mixes hyphens, slashes, and semicolons: 'Item101-Red/Large;InStock'. Split into separate attributes using all 3 delimiters simultaneously.",
    inputCell: 'A7 = "Item101-Red/Large;InStock"',
    targetCell: "B7:E7",
    formula: '=TEXTSPLIT(A7, {"-", "/", ";"})',
    evaluatedOutput: 'Spilled Array: ["Item101", "Red", "Large", "InStock"]',
    outputType: "Multi-Delimiter Spilled Array",
    stepByStepLogic: [
      "Passing an array constant {\"-\", \"/\", \";\"} as the col_delimiter allows TEXTSPLIT to recognize any of the specified delimiters.",
      "Splits on whichever delimiter appears, outputting a clean 4-element row.",
      "Handles messy, non-standardized multi-system data feeds with zero pre-cleaning."
    ],
    proTip: "You can pass as many delimiter variations as needed inside the array constant: {\",\", \";\", \"|\", \"-\", \"/\"}."
  },
  {
    id: 7,
    title: "Extracting Domain from Email with Case-Insensitive Matching",
    functionUsed: "TEXTAFTER",
    category: "Suffix Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Extract the domain name from email address in cell A8 ('tuhina.das@accotax.in') using TEXTAFTER.",
    inputCell: 'A8 = "tuhina.das@accotax.in"',
    targetCell: "B8",
    formula: '=TEXTAFTER(A8, "@")',
    evaluatedOutput: '"accotax.in"',
    outputType: "Domain String",
    stepByStepLogic: [
      "TEXTAFTER(A8, \"@\") isolates everything following the '@' sign.",
      "Returns 'accotax.in' with zero index math.",
      "Eliminates the need for MID(A8, FIND(\"@\", A8)+1, LEN(A8))."
    ],
    proTip: "To extract the username before the domain, simply use =TEXTBEFORE(A8, \"@\")."
  },
  {
    id: 8,
    title: "Parsing 2D Table Data Directly from Web / Text Matrix",
    functionUsed: "TEXTSPLIT (2D Grid)",
    category: "2D Grid Transformations",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "A structured data block in cell A9 stores tabular rows separated by newlines (CHAR 10) and columns separated by commas: ('ID,Name,Dept' & CHAR(10) & '101,Swadeep,Audit' & CHAR(10) & '102,Tuhina,Tax'). Parse this entire string into a 3x3 spreadsheet grid.",
    inputCell: 'A9 = "ID,Name,Dept\\n101,Swadeep,Audit\\n102,Tuhina,Tax"',
    targetCell: "B9:D11 (2D Spilled Grid)",
    formula: '=TEXTSPLIT(A9, ",", CHAR(10))',
    evaluatedOutput: "2D Spilled Grid (3 Rows x 3 Columns)",
    outputType: "2D Dynamic Array",
    stepByStepLogic: [
      "TEXTSPLIT(A9, \",\", CHAR(10)) uses comma for column separation and CHAR(10) for row separation.",
      "Instantly converts the single multi-line text block into a complete 2D Excel table.",
      "Spills across B9:D11 in a single calculation step."
    ],
    proTip: "This eliminates the need for Power Query or VBA when pasting multi-line delimited text blocks into Excel."
  },
  {
    id: 9,
    title: "Extracting Everything Before the Last Period (File Name Slicing)",
    functionUsed: "TEXTBEFORE with Negative Index (-1)",
    category: "Prefix Extraction",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A file name in cell A10 contains multiple periods: 'Quarterly.Financial.Report.2025.final.xlsx'. Extract the base file name without the final file extension.",
    inputCell: 'A10 = "Quarterly.Financial.Report.2025.final.xlsx"',
    targetCell: "B10",
    formula: '=TEXTBEFORE(A10, ".", -1)',
    evaluatedOutput: '"Quarterly.Financial.Report.2025.final"',
    outputType: "Base File Name",
    stepByStepLogic: [
      "Setting instance_num = -1 instructs TEXTBEFORE to locate the LAST period from the right.",
      "Extracts all characters before that final period, preserving the periods in 'Quarterly.Financial.Report.2025.final'.",
      "Strips only the '.xlsx' extension."
    ],
    proTip: "To extract ONLY the file extension, use =TEXTAFTER(A10, \".\", -1), which returns 'xlsx'."
  },
  {
    id: 10,
    title: "Safe Extraction with Custom Error Fallback (if_not_found Argument)",
    functionUsed: "TEXTAFTER with if_not_found Parameter",
    category: "Safe Extraction",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "SKU catalog in cell A11 might or might not have a size suffix code after a hyphen (e.g. 'SHIRT-XL' or 'SHIRT'). Extract the size, but if no hyphen exists, return 'Standard' instead of #N/A.",
    inputCell: 'A11 = "SHIRT"',
    targetCell: "B11",
    formula: '=TEXTAFTER(A11, "-", , , , "Standard")',
    evaluatedOutput: '"Standard"',
    outputType: "Fallback Text",
    stepByStepLogic: [
      "The 6th argument of TEXTAFTER is [if_not_found].",
      "When the '-' delimiter is missing, Excel skips throwing an #N/A error and returns the fallback string 'Standard'.",
      "Eliminates the need to wrap formulas in IFERROR()."
    ],
    proTip: "The 6 arguments of TEXTAFTER/TEXTBEFORE are: (text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])."
  }
];

export default practicalQuestions;
