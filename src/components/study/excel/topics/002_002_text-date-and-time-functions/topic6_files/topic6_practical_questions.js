// topic6_files/topic6_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 6: Current date/time & temporal shifts (TODAY, NOW, EDATE, EOMONTH)

export const practicalQuestions = [
  {
    id: 1,
    title: "Dynamic Accounts Receivable Overdue Aging Buckets",
    functionUsed: "TODAY & Subtraction",
    category: "Aging & Durations",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "An accounts receivable ledger records invoice issuance date in cell A2 (e.g. 15-Jun-2025). Categorize the invoice dynamically into '0-30 Days', '31-60 Days', '61-90 Days', or '90+ Days Overdue' relative to the dynamic current date.",
    inputCell: "A2 = 45823 (15-Jun-2025)",
    targetCell: "B2",
    formula: '=IFS(TODAY()-A2<=30, "0-30 Days", TODAY()-A2<=60, "31-60 Days", TODAY()-A2<=90, "61-90 Days", TRUE, "90+ Days Overdue")',
    evaluatedOutput: '"Dynamic Overdue Category"',
    outputType: "Aging Classification",
    stepByStepLogic: [
      "TODAY() returns the current volatile system date without time.",
      "TODAY() - A2 computes the exact elapsed calendar days as an integer.",
      "The IFS() logic evaluates the integer threshold into standard corporate aging buckets."
    ],
    proTip: "TODAY() is a volatile function that recalculates every time any cell in the workbook changes. For static baseline snapshots, copy and Paste Values."
  },
  {
    id: 2,
    title: "Calculating Subscription & Contract Expiration Dates (EDATE)",
    functionUsed: "EDATE",
    category: "Temporal Shifts",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "SaaS software licenses activate on the date in cell A3 (15-Aug-2025 -> 45884) with a contractual duration of 18 months specified in B3 (18). Calculate the exact renewal expiration date.",
    inputCell: "A3 = 45884 (15-Aug-2025), B3 = 18",
    targetCell: "C3",
    formula: '=EDATE(A3, B3)',
    evaluatedOutput: "46433 (Formatted: 15-Feb-2027)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "EDATE(start_date, months) shifts the calendar date forward or backward by the specified number of whole months.",
      "Shifting 15-Aug-2025 forward by 18 months moves exactly to 15-Feb-2027.",
      "Preserves the day of the month without manual day counting."
    ],
    proTip: "Pass negative integers into EDATE (e.g. EDATE(A3, -6)) to shift backward in time."
  },
  {
    id: 3,
    title: "Month-End Billing & GST Return Filing Deadlines (EOMONTH)",
    functionUsed: "EOMONTH",
    category: "Month-End Calculations",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Invoices issued on any arbitrary day in cell A4 (12-Feb-2025 -> 45700) require monthly tax reconciliation on the final calendar day of that same transaction month. Calculate the month-end closing date.",
    inputCell: "A4 = 45700 (12-Feb-2025)",
    targetCell: "B4",
    formula: '=EOMONTH(A4, 0)',
    evaluatedOutput: "45716 (Formatted: 28-Feb-2025)",
    outputType: "Excel Serial Date (Month End)",
    stepByStepLogic: [
      "EOMONTH(start_date, months) returns the serial date of the last day of the month.",
      "Setting months = 0 targets the last day of the current month.",
      "For February 2025, it accurately computes 28-Feb-2025 (accounting for non-leap year length)."
    ],
    proTip: "EOMONTH automatically calculates leap years (returning 29-Feb on leap years and 28-Feb on non-leap years)."
  },
  {
    id: 4,
    title: "Calculating Next Month's 1st Day Anchor",
    functionUsed: "EOMONTH & Addition",
    category: "Month-End Calculations",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "For quarterly provisioning, advance transaction date in A5 (24-Nov-2025) to the 1st day of the upcoming month (01-Dec-2025).",
    inputCell: "A5 = 45985 (24-Nov-2025)",
    targetCell: "B5",
    formula: '=EOMONTH(A5, 0) + 1',
    evaluatedOutput: "45992 (Formatted: 01-Dec-2025)",
    outputType: "Excel Serial Date (1st of Next Month)",
    stepByStepLogic: [
      "EOMONTH(A5, 0) evaluates to the last day of November (30-Nov-2025).",
      "Adding +1 serial day advances precisely to 01-Dec-2025.",
      "Standard pattern for building monthly timeline headers in financial models."
    ],
    proTip: "Alternative syntax: EOMONTH(A5, -1) + 1 finds the 1st day of the current month."
  },
  {
    id: 5,
    title: "Static Timestamp Recording vs Live Dynamic Clock (NOW)",
    functionUsed: "NOW & TEXT",
    category: "Timestamps",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A dispatch ledger needs to display the exact live system date and time stamp for real-time warehouse monitoring.",
    inputCell: "N/A (System Clock)",
    targetCell: "A6",
    formula: '=TEXT(NOW(), "dd-mmm-yyyy hh:mm:ss AM/PM")',
    evaluatedOutput: '"Live System Timestamp (e.g. 15-Aug-2025 02:45:12 PM)"',
    outputType: "Live Timestamp String",
    stepByStepLogic: [
      "NOW() returns the live serial number representing current date and time fraction.",
      "TEXT(NOW(), \"dd-mmm-yyyy hh:mm:ss AM/PM\") formats the live serial into human-readable seconds precision.",
      "Updates whenever the sheet recalculates."
    ],
    proTip: "To insert a PERMANENT static timestamp that never changes, use shortcut Ctrl + ; (date) followed by Space and Ctrl + Shift + ; (time)."
  },
  {
    id: 6,
    title: "Quarterly Statutory Advance Tax Payment Due Dates",
    functionUsed: "EOMONTH",
    category: "Month-End Calculations",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Corporate tax rules mandate that advance tax payments are due 15 days following the close of each calendar quarter. For invoice date in cell A7 (14-May-2025), calculate the exact Q2 tax filing due date (15-Jul-2025).",
    inputCell: "A7 = 45791 (14-May-2025)",
    targetCell: "B7",
    formula: '=EOMONTH(A7, 2 - MOD(MONTH(A7)-1, 3)) + 15',
    evaluatedOutput: "45853 (Formatted: 15-Jul-2025)",
    outputType: "Excel Serial Date (Statutory Due Date)",
    stepByStepLogic: [
      "2 - MOD(MONTH(A7)-1, 3) calculates months remaining until the quarter end (for May, month 5, returns 1 month to June).",
      "EOMONTH(A7, 1) returns the quarter end date (30-Jun-2025).",
      "Adding + 15 days lands on 15-Jul-2025.",
      "Automates quarterly corporate compliance schedules."
    ],
    proTip: "You can combine EOMONTH with WORKDAY to roll forward to the next business day if the 15th falls on a weekend."
  },
  {
    id: 7,
    title: "Prorated Warranty Period Expiration (30 Months Fixed Shift)",
    functionUsed: "EDATE",
    category: "Temporal Shifts",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Heavy machinery sold on purchase date in cell A8 (31-Aug-2025 -> 45900) includes a standard 30-month extended warranty. Determine the exact warranty expiration date.",
    inputCell: "A8 = 45900 (31-Aug-2025)",
    targetCell: "B8",
    formula: '=EDATE(A8, 30)',
    evaluatedOutput: "46812 (Formatted: 28-Feb-2028)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "EDATE(A8, 30) shifts 30 months forward from August 2025 to February 2028.",
      "Since 2028 is a leap year and February has only 29 days, EDATE automatically clamps the date to 29-Feb-2028 (or 28-Feb on non-leap).",
      "Handles end-of-month clamping flawlessly."
    ],
    proTip: "If you shift a 31st date to a 30-day month, EDATE automatically clamps to the 30th (e.g. EDATE('31-Aug', 1) -> 30-Sep)."
  },
  {
    id: 8,
    title: "Dynamic Remaining Days in Current Fiscal Year Countdown",
    functionUsed: "DATE, YEAR, TODAY & Subtraction",
    category: "Aging & Durations",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Create a live countdown banner displaying the remaining days until the close of the current Indian Fiscal Year (31-Mar-2026) relative to TODAY().",
    inputCell: "N/A (Dynamic System Date)",
    targetCell: "A9",
    formula: '=DATE(IF(MONTH(TODAY())>=4, YEAR(TODAY())+1, YEAR(TODAY())), 3, 31) - TODAY()',
    evaluatedOutput: "Integer Days Remaining (e.g. 228)",
    outputType: "Integer (Days Countdown)",
    stepByStepLogic: [
      "The DATE() logic dynamically determines the target 31st March year based on TODAY()'s month.",
      "Subtracting TODAY() yields the integer count of remaining calendar days.",
      "Displays a real-time countdown for financial year-end targets."
    ],
    proTip: "Wrap in a narrative string: =\"Days to FY26 Close: \" & (DATE(2026,3,31)-TODAY()) & \" Days Remaining\"."
  },
  {
    id: 9,
    title: "Semi-Annual Bond Coupon Payment Scheduling",
    functionUsed: "EDATE & Array Sequence",
    category: "Temporal Shifts",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A treasury bond issued on date A10 (15-Jan-2025) pays semi-annual coupons every 6 months. Calculate the next 4 coupon payment dates (6, 12, 18, 24 months).",
    inputCell: "A10 = 45672 (15-Jan-2025)",
    targetCell: "B10:B13",
    formula: '=EDATE(A10, {6; 12; 18; 24})',
    evaluatedOutput: "Spilled Array: [15-Jul-2025; 15-Jan-2026; 15-Jul-2026; 15-Jan-2027]",
    outputType: "Spilled Date Array",
    stepByStepLogic: [
      "Passing an array constant {6; 12; 18; 24} into EDATE generates a dynamic array spill.",
      "Calculates all 4 future coupon dates in a single formula.",
      "Eliminates repetitive manual row-by-row dragging."
    ],
    proTip: "In Excel 365, =EDATE(A10, SEQUENCE(4, 1, 6, 6)) generates dynamic multi-period amortization schedules."
  },
  {
    id: 10,
    title: "Employee Probation Review Date with Month-End Alignment",
    functionUsed: "EDATE, EOMONTH & IF",
    category: "Temporal Shifts",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "Company policy states that 6-month employee probation reviews for hire date in A11 (18-Aug-2025) must align with the final day of the 6th month (28-Feb-2026) for uniform HR board review batches.",
    inputCell: "A11 = 45887 (18-Aug-2025)",
    targetCell: "B11",
    formula: '=EOMONTH(A11, 6)',
    evaluatedOutput: "46081 (Formatted: 28-Feb-2026)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "EOMONTH(A11, 6) shifts 6 calendar months into the future (August + 6 = February 2026).",
      "Returns the final calendar day of that target month (28-Feb-2026).",
      "Enforces automated cohort alignment for quarterly and semi-annual performance appraisal cycles."
    ],
    proTip: "Use EOMONTH(date, N) for month-end cohort reviews; use EDATE(date, N) for exact anniversary dates."
  }
];

export default practicalQuestions;
