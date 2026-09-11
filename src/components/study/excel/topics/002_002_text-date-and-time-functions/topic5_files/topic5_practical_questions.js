// topic5_files/topic5_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 5: Core date construction & extraction (DATE, YEAR, MONTH, DAY, DATEVALUE)

export const practicalQuestions = [
  {
    id: 1,
    title: "Constructing Canonical Date Serials from Disparate Year, Month, Day Columns",
    functionUsed: "DATE",
    category: "Date Construction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "An ERP export splits transaction dates across Year in A2 (2025), Month in B2 (8), and Day in C2 (15). Construct a genuine Excel date serial that responds to date arithmetic and calendar sorting.",
    inputCell: "A2 = 2025, B2 = 8, C2 = 15",
    targetCell: "D2",
    formula: '=DATE(A2, B2, C2)',
    evaluatedOutput: "45884 (Formatted: 15-Aug-2025)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "DATE(year, month, day) accepts 3 integer arguments.",
      "Assembles the components into Excel's internal serial date integer (45884).",
      "Guarantees portability regardless of whether the operating system uses US (M/D/Y) or UK (D/M/Y) settings."
    ],
    proTip: "Never concatenate date strings with slashes (A2 & \"/\" & B2 & \"/\" & C2) because regional settings can cause Excel to misinterpret days as months."
  },
  {
    id: 2,
    title: "Extracting Birth Year and Cohort Tagging for HR Pension Audits",
    functionUsed: "YEAR",
    category: "Component Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "HR employee master files store birth dates as serial dates in cell A3 (18-Jul-1965 -> 23941). Extract the 4-digit birth year to determine the statutory superannuation cohort.",
    inputCell: "A3 = 23941 (18-Jul-1965)",
    targetCell: "B3",
    formula: '=YEAR(A3)',
    evaluatedOutput: "1965",
    outputType: "Integer (Year)",
    stepByStepLogic: [
      "YEAR(serial_number) reads the date serial.",
      "Extracts the 4-digit astronomical calendar year integer 1965.",
      "Enables mathematical cohort grouping: =IF(YEAR(A3)<=1965, \"Superannuation Due\", \"Active\")."
    ],
    proTip: "YEAR() always returns a 4-digit integer between 1900 and 9999."
  },
  {
    id: 3,
    title: "Converting Imported Text Strings to True Excel Serial Dates",
    functionUsed: "DATEVALUE",
    category: "Text to Date Parsing",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A banking CSV export formats transaction posting dates as text strings in cell A4 ('15-Aug-2025'). Convert this text string into a mathematical date serial for aging calculations.",
    inputCell: 'A4 = "15-Aug-2025"',
    targetCell: "B4",
    formula: '=DATEVALUE(A4)',
    evaluatedOutput: "45884 (Formatted: 15-08-2025)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "DATEVALUE(date_text) parses text representations of dates based on system regional formats.",
      "Converts '15-Aug-2025' into serial integer 45884.",
      "Allows formulas like =TODAY() - DATEVALUE(A4) to calculate days elapsed."
    ],
    proTip: "If DATEVALUE() returns #VALUE! due to custom text formats (e.g. '20250815'), use DATE(LEFT(A4,4), MID(A4,5,2), RIGHT(A4,2))."
  },
  {
    id: 4,
    title: "Extracting Month Number for Monthly Payroll Accumulators",
    functionUsed: "MONTH",
    category: "Component Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Timesheet submissions in cell A5 contain invoice dates (serial for 28-Feb-2025). Extract the month index (1–12) to dynamically index into a seasonal bonus lookup array.",
    inputCell: "A5 = 45716 (28-Feb-2025)",
    targetCell: "B5",
    formula: '=MONTH(A5)',
    evaluatedOutput: "2",
    outputType: "Integer (Month 1-12)",
    stepByStepLogic: [
      "MONTH(serial_number) returns the month number from 1 (January) to 12 (December).",
      "For 28-Feb-2025, MONTH evaluates to 2.",
      "Used as an index argument for CHOOSE() or XLOOKUP() quarterly tables."
    ],
    proTip: "To extract the 3-letter month name ('Feb'), use TEXT(A5, \"mmm\") instead of MONTH(A5)."
  },
  {
    id: 5,
    title: "Auditing Day-of-Month for Billing Cycle Surcharges",
    functionUsed: "DAY",
    category: "Component Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Commercial lease contracts mandate that rent payments made after the 5th day of the month incur a late fee. In cell A6 (date serial for 09-Oct-2025), extract the day of the month and evaluate penalty applicability.",
    inputCell: "A6 = 45939 (09-Oct-2025)",
    targetCell: "B6",
    formula: '=IF(DAY(A6)>5, "Late Fee Applicable (Day " & DAY(A6) & ")", "On Time")',
    evaluatedOutput: '"Late Fee Applicable (Day 9)"',
    outputType: "Billing Status",
    stepByStepLogic: [
      "DAY(A6) extracts the day component as an integer (9).",
      "The IF condition checks whether 9 > 5.",
      "Evaluates to 'Late Fee Applicable (Day 9)'."
    ],
    proTip: "DAY() returns the day of the month (1-31). For the day of the week (1-7), use WEEKDAY(A6)."
  },
  {
    id: 6,
    title: "Leap Year Safe Date Shifting (Advancing by Exactly 1 Year)",
    functionUsed: "DATE, YEAR, MONTH, DAY",
    category: "Temporal Arithmetic",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Insurance policies created on leap day in cell A7 (29-Feb-2024 -> 45351) expire exactly 1 year later. Construct the next renewal date safely without producing formula errors.",
    inputCell: "A7 = 45351 (29-Feb-2024)",
    targetCell: "B7",
    formula: '=DATE(YEAR(A7) + 1, MONTH(A7), DAY(A7))',
    evaluatedOutput: "45717 (Formatted: 01-Mar-2025)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "YEAR(A7) + 1 yields 2025.",
      "DATE(2025, 2, 29) detects that 2025 is not a leap year and automatically rolls forward by 1 day to 01-Mar-2025.",
      "Prevents invalid date crashes in annual renewal models."
    ],
    proTip: "Excel's DATE() function handles overflow automatically: DATE(2025, 2, 29) rolls to March 1; DATE(2025, 13, 1) rolls to Jan 1, 2026."
  },
  {
    id: 7,
    title: "Finding the First Day of the Current Transaction Month",
    functionUsed: "DATE, YEAR, MONTH",
    category: "Date Construction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "For monthly financial consolidation, any invoice date in cell A8 (19-Sep-2025 -> 45919) must be normalized to the 1st day of that month (01-Sep-2025) for PivotTable grouping.",
    inputCell: "A8 = 45919 (19-Sep-2025)",
    targetCell: "B8",
    formula: '=DATE(YEAR(A8), MONTH(A8), 1)',
    evaluatedOutput: "45901 (Formatted: 01-Sep-2025)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "YEAR(A8) returns 2025; MONTH(A8) returns 9.",
      "Hardcoding day = 1 creates 01-Sep-2025 (serial 45901).",
      "Normalizes all transactions in September to a uniform starting anchor date."
    ],
    proTip: "This is the most reliable way to create month-start dates without relying on EOMONTH(A8, -1) + 1."
  },
  {
    id: 8,
    title: "Calculating Exact Completed Age in Years Using Component Math",
    functionUsed: "YEAR, MONTH, DAY & IF",
    category: "Temporal Arithmetic",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Calculate the exact completed age of an employee with birth date in A9 (15-Oct-1990) as of current reference date in B9 (10-Oct-2025), accounting for whether the birthday has occurred yet this year.",
    inputCell: "A9 = 15-Oct-1990 (33161), B9 = 10-Oct-2025 (45940)",
    targetCell: "C9",
    formula: '=YEAR(B9) - YEAR(A9) - IF(OR(MONTH(B9) < MONTH(A9), AND(MONTH(B9) = MONTH(A9), DAY(B9) < DAY(A9))), 1, 0)',
    evaluatedOutput: "34",
    outputType: "Integer (Age in Years)",
    stepByStepLogic: [
      "YEAR(B9) - YEAR(A9) computes gross difference: 2025 - 1990 = 35.",
      "The IF condition checks if October 10 is before October 15 (birthday has NOT occurred yet in 2025).",
      "Subtracts 1 from the gross year count (35 - 1 = 34).",
      "Returns exact legal age 34."
    ],
    proTip: "While DATEDIF(A9, B9, \"Y\") is shorter, component math using YEAR/MONTH/DAY provides complete transparency for regulatory compliance."
  },
  {
    id: 9,
    title: "Parsing Raw 8-Digit Numeric Integers (YYYYMMDD) into Valid Dates",
    functionUsed: "DATE, INT, MOD, LEFT, MID, RIGHT",
    category: "Text to Date Parsing",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Mainframe SAP batch tables export transaction dates as pure 8-digit integers in cell A10 (20251124). Convert this number into a genuine Excel date serial (24-Nov-2025).",
    inputCell: "A10 = 20251124",
    targetCell: "B10",
    formula: '=DATE(LEFT(A10, 4), MID(A10, 5, 2), RIGHT(A10, 2))',
    evaluatedOutput: "45985 (Formatted: 24-Nov-2025)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "LEFT(A10, 4) extracts the year '2025'.",
      "MID(A10, 5, 2) extracts the month '11'.",
      "RIGHT(A10, 2) extracts the day '24'.",
      "DATE(2025, 11, 24) binds them into serial date 45985."
    ],
    proTip: "If A10 is stored as a number rather than text, string functions (LEFT/MID/RIGHT) will automatically coerce it to string during parsing."
  },
  {
    id: 10,
    title: "Dynamic Fiscal Year End Date Construction (Indian FY: 31st March)",
    functionUsed: "DATE, YEAR, MONTH",
    category: "Temporal Arithmetic",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "In Indian accounting, the fiscal year runs from April 1 to March 31. For any transaction date in cell A11 (e.g. 14-Nov-2025 or 12-Feb-2025), calculate the corresponding Fiscal Year Closing Date (31-Mar-2026 or 31-Mar-2025).",
    inputCell: "A11 = 14-Nov-2025 (45975)",
    targetCell: "B11",
    formula: '=DATE(IF(MONTH(A11)>=4, YEAR(A11)+1, YEAR(A11)), 3, 31)',
    evaluatedOutput: "46112 (Formatted: 31-Mar-2026)",
    outputType: "Excel Serial Date (FY Closing)",
    stepByStepLogic: [
      "MONTH(A11) returns 11 (November).",
      "Since 11 >= 4 (after April), the fiscal year closes next year: YEAR(A11) + 1 = 2026.",
      "For dates in Jan–Mar (e.g. Feb 2025), MONTH < 4, so the closing year is the current year (2025).",
      "DATE(2026, 3, 31) generates the exact closing date serial 46112."
    ],
    proTip: "This formula standardizes fiscal year provisioning across all accounting ledgers without manual year lookups."
  }
];

export default practicalQuestions;
