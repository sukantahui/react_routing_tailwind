// topic10_files/topic10_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 10: Converting Text Strings to Numeric Values (VALUE, NUMBERVALUE, DATEVALUE, TIMEVALUE)

export const practicalQuestions = [
  {
    id: 1,
    title: "Converting Left-Aligned Text Numbers to Calculable Numeric Floats",
    functionUsed: "VALUE",
    category: "Data Type Coercion",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "An ERP export outputs numerical sales revenues as text strings stored with leading apostrophes or text formatting in cell A2 ('$4,500.50'). Convert this string into an actual numeric float so SUM() can calculate it.",
    inputCell: 'A2 = "$4,500.50" (stored as Text)',
    targetCell: "B2",
    formula: '=VALUE(A2)',
    alternativeFormula: '=--A2',
    evaluatedOutput: "4500.50",
    outputType: "Numeric Float",
    stepByStepLogic: [
      "VALUE(text) parses standard currency symbols, commas, and decimal points according to Windows regional settings.",
      "Converts the text '$4,500.50' into the underlying serial number 4500.50.",
      "Right-aligns the number in the cell and enables aggregations like SUM, AVERAGE, and MIN."
    ],
    proTip: "The double unary prefix --A2 performs the exact same mathematical coercion faster in large array formulas."
  },
  {
    id: 2,
    title: "Parsing European Number Formats with Comma Decimals and Period Thousands",
    functionUsed: "NUMBERVALUE",
    category: "International Punctuation",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "A European branch sends invoices where thousand separators are periods and decimal marks are commas: '1.250.500,75 €' in cell A3. Standard VALUE() returns #VALUE! on US/Indian regional systems. Convert this accurately to 1250500.75.",
    inputCell: 'A3 = "1.250.500,75 €"',
    targetCell: "B3",
    formula: '=NUMBERVALUE(A3, ",", ".")',
    evaluatedOutput: "1250500.75",
    outputType: "Numeric Float",
    stepByStepLogic: [
      "NUMBERVALUE(Text, [Decimal_separator], [Group_separator]) explicitly defines custom punctuation.",
      "Sets decimal_separator = ',' and group_separator = '.'.",
      "Strips currency symbols ('€') and evaluates '1.250.500,75 €' to 1250500.75 irrespective of your local OS settings."
    ],
    proTip: "Always use NUMBERVALUE instead of VALUE when processing cross-border accounting files with European or Latin American currency formats."
  },
  {
    id: 3,
    title: "Converting Text Date String 'YYYYMMDD' to a Real Serial Date",
    functionUsed: "DATEVALUE with MID/LEFT/RIGHT",
    category: "Date Ingestion",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "A mainframe transaction log provides raw 8-digit date strings like '20260415' in cell A4. Convert this text into a genuine Excel serial date formatted as DD-MMM-YYYY.",
    inputCell: 'A4 = "20260415"',
    targetCell: "B4",
    formula: '=DATE(LEFT(A4, 4), MID(A4, 5, 2), RIGHT(A4, 2))',
    alternativeFormula: '=DATEVALUE(MID(A4, 5, 2) & "/" & RIGHT(A4, 2) & "/" & LEFT(A4, 4))',
    evaluatedOutput: "46127 (15-Apr-2026)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "LEFT(A4, 4) extracts Year '2026'.",
      "MID(A4, 5, 2) extracts Month '04'.",
      "RIGHT(A4, 2) extracts Day '15'.",
      "DATE(2026, 4, 15) constructs the integer date serial number 46127."
    ],
    proTip: "Constructing dates via DATE(year, month, day) is universally safe and 100% immune to OS date locale mix-ups (MM/DD vs DD/MM)."
  },
  {
    id: 4,
    title: "Converting 12-Hour Text Timestamp to True Time Serial Float",
    functionUsed: "TIMEVALUE",
    category: "Time Ingestion",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A biometric access device records punch-in times as raw text: '08:45:30 PM' in cell A5. Convert this text timestamp into an Excel decimal time fraction so duration arithmetic can be performed.",
    inputCell: 'A5 = "08:45:30 PM"',
    targetCell: "B5",
    formula: '=TIMEVALUE(A5)',
    evaluatedOutput: "0.864930556 (20:45:30)",
    outputType: "Time Serial Fraction",
    stepByStepLogic: [
      "TIMEVALUE(time_text) parses 12-hour (AM/PM) and 24-hour text representations.",
      "Calculates (20*3600 + 45*60 + 30) / 86400 = 0.864930556.",
      "Format cell B5 with custom format [hh:mm:ss] to display '20:45:30'."
    ],
    proTip: "TIMEVALUE strips date information and returns strictly the fractional day component (0.0 to 0.99999)."
  },
  {
    id: 5,
    title: "Extracting and Coercing Numerical Quantities Embedded in Unit Strings",
    functionUsed: "VALUE & TEXTBEFORE",
    category: "Unit Extraction & Math",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Shipping manifest in cell A6 has strings like '450.75 KG' or '1,200.00 LTRS'. Extract the leading quantity and coerce it into a calculable number for weight aggregation.",
    inputCell: 'A6 = "1,200.00 LTRS"',
    targetCell: "B6",
    formula: '=VALUE(TEXTBEFORE(A6, " "))',
    alternativeFormula: '=--LEFT(A6, FIND(" ", A6) - 1)',
    evaluatedOutput: "1200.00",
    outputType: "Numeric Float",
    stepByStepLogic: [
      "TEXTBEFORE(A6, ' ') isolates the numeric text '1,200.00'.",
      "VALUE('1,200.00') parses commas and evaluates to the raw number 1200.",
      "Allows =SUM(B2:B100) to total the entire weight column seamlessly."
    ],
    proTip: "Always wrap string extraction functions (LEFT, MID, TEXTBEFORE) in VALUE() or -- when you need numerical output."
  },
  {
    id: 6,
    title: "Converting Percent Strings with Trailing '%' into Fractional Multipliers",
    functionUsed: "NUMBERVALUE",
    category: "Financial Percentage Coercion",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Tax rate column stores tax tiers as text strings '18.00 %' in cell A7. Convert this text into the decimal multiplier 0.18 for direct invoice multiplication.",
    inputCell: 'A7 = "18.00 %"',
    targetCell: "B7",
    formula: '=NUMBERVALUE(A7, ".", ",")',
    alternativeFormula: '=VALUE(SUBSTITUTE(A7, "%", "")) / 100',
    evaluatedOutput: "0.18",
    outputType: "Decimal Float",
    stepByStepLogic: [
      "NUMBERVALUE automatically recognizes and converts percentage symbols '%' at the end of strings.",
      "Converts '18.00 %' directly to 0.18.",
      "Multiply directly by Unit Price in cell C7: =B7 * C7."
    ],
    proTip: "Using NUMBERVALUE handles trailing percentage symbols without requiring manual SUBSTITUTE or division by 100."
  },
  {
    id: 7,
    title: "Converting ISO 8601 UTC Text Timestamps ('2026-04-15T14:30:00Z')",
    functionUsed: "DATEVALUE + TIMEVALUE Combined",
    category: "ISO Timestamp Parsing",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "A REST API webhook returns ISO-formatted UTC timestamps in cell A8 ('2026-04-15T14:30:00Z'). Convert this into a full combined Excel DateTime serial number.",
    inputCell: 'A8 = "2026-04-15T14:30:00Z"',
    targetCell: "B8",
    formula: '=DATEVALUE(LEFT(A8, 10)) + TIMEVALUE(MID(A8, 12, 8))',
    evaluatedOutput: "46127.604167 (15-Apr-2026 14:30:00)",
    outputType: "DateTime Serial Number",
    stepByStepLogic: [
      "LEFT(A8, 10) extracts date string '2026-04-15'. DATEVALUE converts it to serial 46127.",
      "MID(A8, 12, 8) extracts time string '14:30:00'. TIMEVALUE converts it to fraction 0.604167.",
      "Adding Date Serial + Time Fraction yields 46127.604167."
    ],
    proTip: "Format cell B8 with custom format 'yyyy-mm-dd hh:mm:ss' to verify both date and time components."
  },
  {
    id: 8,
    title: "Parsing Negative Numbers in Accounting Parenthesis: '(1,500.00)'",
    functionUsed: "NUMBERVALUE",
    category: "Financial Accounting Coercion",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Legacy financial reports represent negative balances with parenthesis: '(1,500.00)' in cell A9. Coerce this text string into true negative float -1500.00.",
    inputCell: 'A9 = "(1,500.00)"',
    targetCell: "B9",
    formula: '=NUMBERVALUE(A9)',
    alternativeFormula: '=IF(ISNUMBER(FIND("(", A9)), -VALUE(SUBSTITUTE(SUBSTITUTE(A9, "(", ""), ")", "")), VALUE(A9))',
    evaluatedOutput: "-1500.00",
    outputType: "Negative Float",
    stepByStepLogic: [
      "NUMBERVALUE inherently recognizes financial accounting parenthesis as negative numbers.",
      "Automatically strips parenthesis and assigns a negative mathematical sign.",
      "Evaluates '(1,500.00)' directly to -1500.00."
    ],
    proTip: "Standard VALUE() may error on some localized Excel versions with parenthesis, but NUMBERVALUE reliably outputs negative floats."
  },
  {
    id: 9,
    title: "Safe Coercion with IFERROR for Dirty Datasets Containing 'N/A' or '-'",
    functionUsed: "IFERROR with VALUE",
    category: "Error Guardrails",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A raw price feed in cell A10 contains either numbers as text ('249.99') or placeholders like 'N/A', 'TBD', or '-'. Convert text numbers to numeric while safely returning 0 for non-numeric text without #VALUE! errors.",
    inputCell: 'A10 = "N/A" (or "249.99")',
    targetCell: "B10",
    formula: '=IFERROR(VALUE(A10), 0)',
    evaluatedOutput: "0 (or 249.99)",
    outputType: "Safe Float",
    stepByStepLogic: [
      "VALUE(A10) attempts to convert string to number. If A10 is '249.99', it returns 249.99.",
      "If A10 is 'N/A' or 'TBD', VALUE throws #VALUE! error.",
      "IFERROR catches the error and cleanly substitutes 0."
    ],
    proTip: "In financial reporting, replacing dirty text placeholders with 0 ensures automated sum formulas never break."
  },
  {
    id: 10,
    title: "Vectorized Coercion of an Entire Text Column Using Single Spill Formula",
    functionUsed: "Double Unary Spill (--)",
    category: "Dynamic Array Coercion",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "Cells A2:A100 contain text-formatted sales numbers. Convert the entire range into genuine numbers using a single dynamic array formula in cell B2 without dragging down.",
    inputCell: "A2:A100 (Text formatted numbers)",
    targetCell: "B2#",
    formula: '=--A2:A100',
    alternativeFormula: '=NUMBERVALUE(A2:A100)',
    evaluatedOutput: "Spilled column array of numbers",
    outputType: "Spilled Array",
    stepByStepLogic: [
      "The double unary operator (--) performs two negation operations (-(-x)).",
      "Forces Excel's calculation engine to coerce every text string in the array A2:A100 into a numeric float.",
      "Spills down column B dynamically matching the source row count."
    ],
    proTip: "Double unary (--) is the standard technique used by advanced financial modelers to vectorize type coercion."
  }
];

export default practicalQuestions;
