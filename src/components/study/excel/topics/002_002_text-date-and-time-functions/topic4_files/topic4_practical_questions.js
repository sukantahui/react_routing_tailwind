// topic4_files/topic4_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 4: Number & Date Formatting with Formulas (TEXT, VALUE, NUMBERVALUE)

export const practicalQuestions = [
  {
    id: 1,
    title: "Formatting Currency and Decimals in Financial Statements",
    functionUsed: "TEXT",
    category: "Number Formatting",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A financial summary report requires displaying raw numeric revenue in cell A2 (1849200.75) with Indian Rupee formatting, thousands separators, and 2 decimal places (₹18,49,200.75).",
    inputCell: "A2 = 1849200.75",
    targetCell: "B2",
    formula: '=TEXT(A2, "₹#,##,##0.00")',
    evaluatedOutput: '"₹18,49,200.75"',
    outputType: "Formatted Currency Text",
    stepByStepLogic: [
      "TEXT(value, format_text) converts the numeric value into formatted text using custom number formatting syntax.",
      "The format mask \"₹#,##,##0.00\" applies Indian lakh/crore grouping and guarantees 2 decimal places.",
      "Produces a formatted string ready for executive presentations."
    ],
    proTip: "Remember that TEXT() outputs a string. If you need to perform calculations downstream, keep the raw number in a source cell and format it for presentation."
  },
  {
    id: 2,
    title: "Converting European Number Formats (Comma Decimals, Period Grouping)",
    functionUsed: "NUMBERVALUE",
    category: "Locale Parsing",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "German and French invoices export currency amounts with periods for thousands separators and commas for decimals in cell A3 ('1.250.450,85 €'). Parse this into a standard numeric value for Excel calculations.",
    inputCell: 'A3 = "1.250.450,85 €"',
    targetCell: "B3",
    formula: '=NUMBERVALUE(TRIM(SUBSTITUTE(A3, "€", "")), ",", ".")',
    evaluatedOutput: "1250450.85",
    outputType: "True Number (Decimal)",
    stepByStepLogic: [
      "SUBSTITUTE(A3, \"€\", \"\") strips the currency symbol.",
      "NUMBERVALUE(text, [decimal_sep], [group_sep]) parses the string.",
      "Specifying decimal_sep = \",\" and group_sep = \".\" tells Excel how to interpret the European number delimiters.",
      "Evaluates to genuine numeric 1250450.85."
    ],
    proTip: "NUMBERVALUE() is the ultimate function for international multi-currency data ingestion because it explicitly handles non-US decimal and grouping separators."
  },
  {
    id: 3,
    title: "Parsing Text-Encoded Numbers into True Integers",
    functionUsed: "VALUE",
    category: "Type Coercion",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A legacy payroll system exports employee overtime hours as left-aligned text strings in cell A4 (' 42.50 '). Convert this text into a genuine numeric value so it can be multiplied by hourly pay rates.",
    inputCell: 'A4 = " 42.50 "',
    targetCell: "B4",
    formula: '=VALUE(A4)',
    alternativeFormula: '=--A4',
    evaluatedOutput: "42.5",
    outputType: "True Number (Double)",
    stepByStepLogic: [
      "VALUE(text) parses numeric characters, ignoring surrounding whitespace.",
      "Converts the text representation ' 42.50 ' into the mathematical number 42.5.",
      "Enables downstream multiplication with wage rate tables."
    ],
    proTip: "VALUE() automatically recognizes standard currency symbols ($), percentage signs (%), and scientific notation (1.2E+3)."
  },
  {
    id: 4,
    title: "Formatting Dates into Long Form with Day Names",
    functionUsed: "TEXT",
    category: "Date Formatting",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Human resources requires displaying the employee joining date serial in cell A5 (45884 -> 15-Aug-2025) as 'Friday, August 15, 2025' for formal appointment letters.",
    inputCell: "A5 = 45884",
    targetCell: "B5",
    formula: '=TEXT(A5, "dddd, mmmm dd, yyyy")',
    evaluatedOutput: '"Friday, August 15, 2025"',
    outputType: "Long Date Text",
    stepByStepLogic: [
      "\"dddd\" returns the full day of the week ('Friday').",
      "\"mmmm\" returns the full month name ('August').",
      "\"dd\" outputs the 2-digit day ('15') and \"yyyy\" outputs the 4-digit year ('2025').",
      "Assembles a formal contractual date string."
    ],
    proTip: "\"ddd\" returns 3-letter day ('Fri'); \"dddd\" returns full day ('Friday'). \"mmm\" returns 3-letter month ('Aug'); \"mmmm\" returns full month ('August')."
  },
  {
    id: 5,
    title: "Padding Leading Zeros for Bank Account & IFSC Branch Codes",
    functionUsed: "TEXT",
    category: "Number Formatting",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Core banking imports strip leading zeros from customer account serials in cell A6 (98421). Pad the number with leading zeros so it always displays as an exact 8-digit string ('00098421').",
    inputCell: "A6 = 98421",
    targetCell: "B6",
    formula: '=TEXT(A6, "00000000")',
    evaluatedOutput: '"00098421"',
    outputType: "Padded Text Serial",
    stepByStepLogic: [
      "The \"0\" formatting token forces Excel to display a digit or a zero if no digit exists.",
      "An 8-digit zero mask \"00000000\" pads the 5-digit number 98421 with 3 leading zeros.",
      "Ensures bank account numbers conform to fixed-width clearing house protocols."
    ],
    proTip: "Formatting with # does NOT pad zeros (e.g. \"########\"); you must use \"00000000\" to enforce fixed zero padding."
  },
  {
    id: 6,
    title: "Dynamic Percentage Difference Callout with Explicit Signs (+/-)",
    functionUsed: "TEXT",
    category: "Financial Formatting",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "An executive dashboard variance column compares sales growth in cell A7 (0.0842 -> +8.42% or -0.032 -> -3.20%). Format the number to show an explicit plus (+) or minus (-) sign with 2 decimal percentage points.",
    inputCell: "A7 = 0.0842",
    targetCell: "B7",
    formula: '=TEXT(A7, "+0.00%;-0.00%;0.00%")',
    evaluatedOutput: '"+8.42%"',
    outputType: "Signed Percentage Text",
    stepByStepLogic: [
      "Excel number formats use semicolons to separate Positive; Negative; Zero sections.",
      "Section 1 (+0.00%) formats positive numbers with an explicit '+' sign and percentage.",
      "Section 2 (-0.00%) formats negative numbers.",
      "Section 3 (0.00%) formats zero.",
      "Evaluates 0.0842 to '+8.42%'."
    ],
    proTip: "The 4-part format structure is: Positive; Negative; Zero; Text. You can customize colors and labels in each section."
  },
  {
    id: 7,
    title: "Extracting Fiscal Quarter Name from Serial Date",
    functionUsed: "TEXT & ROUNDUP",
    category: "Date Formatting",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Financial statements require tagging transactional dates in cell A8 (serial for 14-Nov-2025) with their calendar quarter and year as 'Q4-2025'.",
    inputCell: "A8 = 45975",
    targetCell: "B8",
    formula: '="Q" & ROUNDUP(MONTH(A8)/3, 0) & "-" & TEXT(A8, "yyyy")',
    evaluatedOutput: '"Q4-2025"',
    outputType: "Quarter Label",
    stepByStepLogic: [
      "MONTH(A8) returns month integer 11.",
      "ROUNDUP(11/3, 0) evaluates to ROUNDUP(3.66, 0) = 4 (Quarter 4).",
      "TEXT(A8, \"yyyy\") extracts the 4-digit year '2025'.",
      "Combines to yield 'Q4-2025'."
    ],
    proTip: "For Indian fiscal quarters (April to March), offset the month by 3: ROUNDUP(MONTH(EDATE(A8, -3))/3, 0)."
  },
  {
    id: 8,
    title: "Parsing US-Formatted String Currency with Parentheses Negatives",
    functionUsed: "VALUE, SUBSTITUTE & TRIM",
    category: "Financial Formatting",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Accounting exports list negative balances with parentheses in cell A9 (' ($14,500.00) '). Convert this string into a genuine negative numeric value (-14500) for budget variance formulas.",
    inputCell: 'A9 = " ($14,500.00) "',
    targetCell: "B9",
    formula: '=VALUE(A9)',
    evaluatedOutput: "-14500",
    outputType: "True Number (Negative)",
    stepByStepLogic: [
      "VALUE() natively recognizes US accounting notation where parentheses represent negative numbers.",
      "Automatically strips whitespace, parses the dollar symbol ($) and commas.",
      "Returns mathematical negative number -14500."
    ],
    proTip: "If VALUE() produces #VALUE! on accounting strings from non-English locales, use SUBSTITUTE to replace parentheses with minus signs."
  },
  {
    id: 9,
    title: "Formatting 24-Hour Time to Standard 12-Hour AM/PM String",
    functionUsed: "TEXT",
    category: "Date Formatting",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A factory shift punch-in timestamp in cell A10 stores time as decimal 0.770833 (18:30:00). Format this into human-readable 12-hour format: '06:30 PM'.",
    inputCell: "A10 = 0.770833",
    targetCell: "B10",
    formula: '=TEXT(A10, "hh:mm AM/PM")',
    evaluatedOutput: '"06:30 PM"',
    outputType: "12-Hour Time Text",
    stepByStepLogic: [
      "Decimal 0.770833 represents 18 hours and 30 minutes past midnight (18.5 / 24).",
      "TEXT(A10, \"hh:mm AM/PM\") converts 24-hour military time into 12-hour clock format with AM/PM meridian suffix.",
      "Returns '06:30 PM'."
    ],
    proTip: "To display elapsed duration exceeding 24 hours (e.g. cumulative machine uptime), wrap hours in square brackets: TEXT(A10, \"[h]:mm:ss\")."
  },
  {
    id: 10,
    title: "Constructing Multi-Lingual Statutory Tax Summary Narrative",
    functionUsed: "TEXT & & Operator",
    category: "Financial Formatting",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "An automated GST invoicing engine needs to generate a compliance sentence combining Base in A11 (100000), GST% in B11 (0.18), and Tax in C11 (18000) as: 'Taxable Value: ₹1,00,000.00 | GST @ 18.0%: ₹18,000.00 | Total Invoice: ₹1,18,000.00'.",
    inputCell: "A11=100000, B11=0.18, C11=18000",
    targetCell: "D11",
    formula: '="Taxable Value: " & TEXT(A11, "₹#,##,##0.00") & " | GST @ " & TEXT(B11, "0.0%") & ": " & TEXT(C11, "₹#,##,##0.00") & " | Total Invoice: " & TEXT(A11+C11, "₹#,##,##0.00")',
    evaluatedOutput: '"Taxable Value: ₹1,00,000.00 | GST @ 18.0%: ₹18,000.00 | Total Invoice: ₹1,18,000.00"',
    outputType: "Compliance Statement",
    stepByStepLogic: [
      "TEXT(A11, \"₹#,##,##0.00\") formats taxable base to '₹1,00,000.00'.",
      "TEXT(B11, \"0.0%\") formats tax rate to '18.0%'.",
      "TEXT(C11, \"₹#,##,##0.00\") formats tax amount to '₹18,000.00'.",
      "TEXT(A11+C11, \"₹#,##,##0.00\") computes and formats total invoice value '₹1,18,000.00'.",
      "Combines all formatted components into a single legal compliance narrative."
    ],
    proTip: "Performing arithmetic directly inside TEXT (e.g. TEXT(A11+C11, ...)) avoids the need for temporary calculation helper columns."
  }
];

export default practicalQuestions;
