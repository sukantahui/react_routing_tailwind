// topic2_files/topic2_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 2: Concatenation strategies (CONCAT, TEXTJOIN, & Operator)

export const practicalQuestions = [
  {
    id: 1,
    title: "Assembling Full Customer Names with Ampersand (&) Operator",
    functionUsed: "& Operator",
    category: "Basic Concatenation",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Customer registration logs split customer names across first name in A2 ('Swadeep') and last name in B2 ('Banerjee'). Construct a single consolidated full name with a clean space delimiter.",
    inputCell: 'A2 = "Swadeep", B2 = "Banerjee"',
    targetCell: "C2",
    formula: '=A2 & " " & B2',
    evaluatedOutput: '"Swadeep Banerjee"',
    outputType: "Text String",
    stepByStepLogic: [
      "The ampersand (&) operator links the string in cell A2 with a space literal \" \".",
      "The second ampersand attaches the string in cell B2.",
      "Evaluates into 'Swadeep Banerjee' cleanly and efficiently."
    ],
    proTip: "For simple 2-cell joins, the & operator has lower computation overhead than calling built-in functions."
  },
  {
    id: 2,
    title: "Comma-Separated Skills Aggregation with Blanks Ignored",
    functionUsed: "TEXTJOIN",
    category: "Delimited Aggregation",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Employee competency matrices list up to 5 certified skills across columns A3:E3 (e.g., A3='Excel', B3='VBA', C3='', D3='SQL', E3=''). Aggregate all acquired skills into a single comma-separated list, completely skipping empty cells.",
    inputCell: 'A3:E3 = ["Excel", "VBA", "", "SQL", ""]',
    targetCell: "F3",
    formula: '=TEXTJOIN(", ", TRUE, A3:E3)',
    evaluatedOutput: '"Excel, VBA, SQL"',
    outputType: "Delimited List",
    stepByStepLogic: [
      "TEXTJOIN(\", \", TRUE, A3:E3) applies ', ' as the joining delimiter.",
      "Setting ignore_empty = TRUE instructs the formula engine to bypass blank cells C3 and E3 without generating orphan commas (', ,').",
      "Produces a concise comma-separated string 'Excel, VBA, SQL'."
    ],
    proTip: "Always set the 2nd argument of TEXTJOIN to TRUE when aggregating optional or sparse fields to avoid messy trailing or double commas."
  },
  {
    id: 3,
    title: "Multi-Line Mailing Address Assembly for Courier Invoices",
    functionUsed: "TEXTJOIN & CHAR(10)",
    category: "Formatted Output",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Dispatch logistics requires building a printable multi-line mailing label from Street (A4='14 Riverside Road'), City (B4='Barrackpore'), State (C4='West Bengal'), and PIN (D4='700120'). Ensure each field appears on a new line within a single cell.",
    inputCell: 'A4="14 Riverside Road", B4="Barrackpore", C4="West Bengal", D4="700120"',
    targetCell: "E4",
    formula: '=TEXTJOIN(CHAR(10), TRUE, A4, B4, C4 & " - " & D4)',
    evaluatedOutput: '"14 Riverside Road\\nBarrackpore\\nWest Bengal - 700120"',
    outputType: "Multi-Line Text",
    stepByStepLogic: [
      "CHAR(10) generates the ASCII Line Feed control character in Windows Excel.",
      "TEXTJOIN uses CHAR(10) to insert a newline between each valid address line.",
      "The last term combines state and postal code with a hyphen separator.",
      "Enabling 'Wrap Text' in Excel renders the output as a formatted mailing address label."
    ],
    proTip: "You must turn on 'Wrap Text' (Home > Wrap Text or Alt + H + W) on the target cell to see the line breaks visually."
  },
  {
    id: 4,
    title: "Combining Continuous Cell Ranges with CONCAT",
    functionUsed: "CONCAT",
    category: "Range Assembly",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "An optical barcode validator segments a 12-digit EAN barcode across 4 contiguous cells A5:D5 ('890', '1234', '5678', '9'). Merge all 4 segments without delimiters into a single 12-digit barcode text string.",
    inputCell: 'A5:D5 = ["890", "1234", "5678", "9"]',
    targetCell: "E5",
    formula: '=CONCAT(A5:D5)',
    evaluatedOutput: '"890123456789"',
    outputType: "Text String",
    stepByStepLogic: [
      "CONCAT accepts contiguous multi-cell ranges (A5:D5), unlike the legacy CONCATENATE function which required individual comma-separated cell references.",
      "Iterates left-to-right through the range and binds each cell without delimiters.",
      "Returns '890123456789'."
    ],
    proTip: "Use CONCAT() when merging contiguous ranges without delimiters; use TEXTJOIN() whenever a delimiter or blank-skipping logic is required."
  },
  {
    id: 5,
    title: "Dynamic Executive Summary String with Formatted Numbers",
    functionUsed: "& Operator & TEXT",
    category: "Formatted Output",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "An automated financial dashboard KPI card requires displaying sales rep performance (Rep in A6='Tuhina Das', Sales in B6=485000, Target% in C6=1.125) as: 'Tuhina Das achieved ₹4,85,000 (112.5% of Target)'.",
    inputCell: 'A6="Tuhina Das", B6=485000, C6=1.125',
    targetCell: "D6",
    formula: '=A6 & " achieved " & TEXT(B6, "₹#,##,##0") & " (" & TEXT(C6, "0.0%") & " of Target)"',
    evaluatedOutput: '"Tuhina Das achieved ₹4,85,000 (112.5% of Target)"',
    outputType: "Executive Narrative",
    stepByStepLogic: [
      "Joining raw numeric cells with & strips formatting (converting 485000 to '485000' and 1.125 to '1.125').",
      "TEXT(B6, \"₹#,##,##0\") formats sales into Indian currency notation with commas.",
      "TEXT(C6, \"0.0%\") formats the percentage with a single decimal place.",
      "The ampersands bind the text literals and formatted numbers into an executive summary."
    ],
    proTip: "Whenever concatenating numbers or dates, always wrap them in TEXT(cell, \"format\") to prevent them from reverting to unformatted raw serials."
  },
  {
    id: 6,
    title: "Building SQL WHERE IN Clause from Excel List",
    functionUsed: "TEXTJOIN",
    category: "Delimited Aggregation",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Database administrators need to generate a valid SQL query filter from a list of employee IDs in cells A7:A10 ('EMP101', 'EMP102', 'EMP103', 'EMP104') formatted as: IN ('EMP101', 'EMP102', 'EMP103', 'EMP104').",
    inputCell: 'A7:A10 = ["EMP101", "EMP102", "EMP103", "EMP104"]',
    targetCell: "B7",
    formula: '="IN (\'" & TEXTJOIN("\', \'", TRUE, A7:A10) & "\')"',
    evaluatedOutput: '"IN (\'EMP101\', \'EMP102\', \'EMP103\', \'EMP104\')"',
    outputType: "SQL Clause",
    stepByStepLogic: [
      "TEXTJOIN uses the custom delimiter \"', '\" to join the items with internal quotes and commas.",
      "Prefixing with \"IN ('\" and suffixing with \"')\" encloses the start and end of the SQL predicate.",
      "Generates production-ready SQL filter code directly from spreadsheet records."
    ],
    proTip: "Escaping quotes in Excel requires doubling them up or defining custom delimiter patterns like \"', '\"."
  },
  {
    id: 7,
    title: "Combining Mixed Data Types with Date Formatting",
    functionUsed: "& Operator & TEXT",
    category: "Formatted Output",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Generate a standard audit log stamp combining user in A8 ('Abhronila Das') and audit timestamp in B8 (serial date for 15-Aug-2025 14:30) as: 'Audited by Abhronila Das on 15-Aug-2025 at 02:30 PM'.",
    inputCell: 'A8="Abhronila Das", B8=45884.604167',
    targetCell: "C8",
    formula: '="Audited by " & A8 & " on " & TEXT(B8, "dd-mmm-yyyy") & " at " & TEXT(B8, "hh:mm AM/PM")',
    evaluatedOutput: '"Audited by Abhronila Das on 15-Aug-2025 at 02:30 PM"',
    outputType: "Audit Stamp",
    stepByStepLogic: [
      "Concatenating raw date serial B8 directly would result in 'Audited by Abhronila Das on 45884.604167...'.",
      "TEXT(B8, \"dd-mmm-yyyy\") converts the date portion to '15-Aug-2025'.",
      "TEXT(B8, \"hh:mm AM/PM\") converts the time fraction to '02:30 PM'.",
      "Ampersands assemble the complete human-readable compliance stamp."
    ],
    proTip: "You can format date and time in a single TEXT call: TEXT(B8, \"dd-mmm-yyyy [at] hh:mm AM/PM\")."
  },
  {
    id: 8,
    title: "Conditional Delimited List of Outstanding Overdue Invoices",
    functionUsed: "TEXTJOIN & IF Array",
    category: "Advanced Dynamic Joins",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "An accounts receivable ledger tracks customer invoices across A9:A12 ('INV-101', 'INV-102', 'INV-103', 'INV-104') and statuses in B9:B12 ('Paid', 'Overdue', 'Paid', 'Overdue'). Join only the invoice numbers that have status 'Overdue'.",
    inputCell: 'A9:A12=["INV-101","INV-102","INV-103","INV-104"], B9:B12=["Paid","Overdue","Paid","Overdue"]',
    targetCell: "C9",
    formula: '=TEXTJOIN("; ", TRUE, IF(B9:B12="Overdue", A9:A12, ""))',
    evaluatedOutput: '"INV-102; INV-104"',
    outputType: "Filtered List",
    stepByStepLogic: [
      "The inner IF(B9:B12=\"Overdue\", A9:A12, \"\") evaluates as an array: [\"\", \"INV-102\", \"\", \"INV-104\"].",
      "TEXTJOIN(\"; \", TRUE, ...) filters through the array and ignores the empty string entries.",
      "Joins only the overdue invoices separated by semicolons: 'INV-102; INV-104'."
    ],
    proTip: "Combining TEXTJOIN with IF or FILTER creates dynamic, multi-condition aggregation strings without requiring helper columns."
  },
  {
    id: 9,
    title: "Constructing Standardized Global SKU Barcode Keys",
    functionUsed: "CONCAT & UPPER & TRIM",
    category: "Range Assembly",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Assemble a composite SKU code from brand in A13 ('  Nike '), category in B13 ('run '), and item code in C13 (' 9801 ') formatted as: 'NIKE-RUN-9801'.",
    inputCell: 'A13="  Nike ", B13="run ", C13=" 9801 "',
    targetCell: "D13",
    formula: '=UPPER(TRIM(A13)) & "-" & UPPER(TRIM(B13)) & "-" & UPPER(TRIM(C13))',
    alternativeFormula: '=TEXTJOIN("-", TRUE, UPPER(TRIM(A13:C13)))',
    evaluatedOutput: '"NIKE-RUN-9801"',
    outputType: "Master SKU Key",
    stepByStepLogic: [
      "TRIM() removes loose spaces around each attribute.",
      "UPPER() normalizes text casing.",
      "Hyphens (-) connect the tokens into an enterprise SKU code."
    ],
    proTip: "In Excel 365, =TEXTJOIN(\"-\", TRUE, UPPER(TRIM(A13:C13))) handles range transformations across all cells dynamically."
  },
  {
    id: 10,
    title: "Creating JSON Key-Value Payload Line from Table Columns",
    functionUsed: "TEXTJOIN & & Operator",
    category: "Advanced Dynamic Joins",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "API data integration requires converting row fields (ID in A14=101, Name in B14='Debangshu', Role in C14='Manager') into a valid JSON object string: {\"id\":101,\"name\":\"Debangshu\",\"role\":\"Manager\"}.",
    inputCell: 'A14=101, B14="Debangshu", C14="Manager"',
    targetCell: "D14",
    formula: '="{" & TEXTJOIN(",", TRUE, "\"id\":" & A14, "\"name\":\"" & B14 & "\"", "\"role\":\"" & C14 & "\"") & "}"',
    evaluatedOutput: '"{\\"id\\":101,\\"name\\":\\"Debangshu\\",\\"role\\":\\"Manager\\"}"',
    outputType: "JSON String",
    stepByStepLogic: [
      "Each JSON key-value pair is constructed using escaped double quotes (\"\").",
      "TEXTJOIN(\",\", TRUE, ...) joins all key-value pairs with commas.",
      "Surrounding with \"{\" and \"}\" produces a valid JSON object string for webhook transmission."
    ],
    proTip: "To insert a literal double quote inside an Excel formula string, write two double quotes side-by-side (\"\")."
  }
];

export default practicalQuestions;
