// topic12_files/topic12_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 12: Employee Shift Duration and Overtime Calculator

export const practicalQuestions = [
  {
    id: 1,
    title: "Standard Daytime Shift Duration Calculation (Decimal Hours)",
    functionUsed: "Time Subtraction * 24",
    category: "Standard Shift Duration",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Employee clocks in at 09:00 AM (cell A2) and clocks out at 05:30 PM (cell B2). Calculate the gross shift duration in decimal hours (8.50 hours) for wage multiplication.",
    inputCell: "A2 = 09:00 AM, B2 = 05:30 PM",
    targetCell: "C2",
    formula: '=(B2 - A2) * 24',
    evaluatedOutput: "8.50",
    outputType: "Decimal Hours",
    stepByStepLogic: [
      "In Excel, 1 whole day = 1.0, so 1 hour = 1/24.",
      "Subtracting (B2 - A2) returns fractional day (0.354167).",
      "Multiplying by 24 converts the fraction into 8.50 decimal hours."
    ],
    proTip: "Make sure cell C2 is formatted as 'Number' (with 2 decimals), NOT 'Time', to display 8.5 instead of 8:30."
  },
  {
    id: 2,
    title: "Overnight Graveyard Shift Crossing Midnight (The MOD Solution)",
    functionUsed: "MOD(end - start, 1) * 24",
    category: "Overnight Shifts",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "A night-shift security officer clocks in at 10:00 PM (22:00 in A3) and clocks out at 06:30 AM (06:30 in B3) the next morning. Simple subtraction returns a negative number (-0.6458). Calculate the exact elapsed hours (8.50 hours).",
    inputCell: "A3 = 10:00 PM, B3 = 06:30 AM",
    targetCell: "C3",
    formula: '=MOD(B3 - A3, 1) * 24',
    evaluatedOutput: "8.50",
    outputType: "Decimal Hours",
    stepByStepLogic: [
      "B3 - A3 = 0.270833 - 0.916667 = -0.645833 (negative day fraction).",
      "MOD(n, 1) adds 1 to negative numbers, producing positive remainder +0.354167.",
      "Multiplying by 24 gives 8.50 hours flawlessly without IF conditions."
    ],
    proTip: "MOD(B3-A3, 1) is the universal industry standard formula for all 24/7 hospital, security, and call center shift rosters."
  },
  {
    id: 3,
    title: "Net Shift Duration Deducting Unpaid Lunch Break",
    functionUsed: "MAX with MOD Math",
    category: "Break Deductions",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Shift start is 08:30 AM (A4), shift end is 06:00 PM (B4), and lunch break duration is 45 minutes (entered as 0:45 in C4). Calculate net payable hours, ensuring duration cannot be negative.",
    inputCell: "A4 = 08:30 AM, B4 = 06:00 PM, C4 = 00:45",
    targetCell: "D4",
    formula: '=MAX(0, (MOD(B4 - A4, 1) - C4) * 24)',
    evaluatedOutput: "8.75",
    outputType: "Net Decimal Hours",
    stepByStepLogic: [
      "MOD(B4 - A4, 1) computes gross shift fraction (9.5 hours = 0.395833).",
      "Subtracting unpaid lunch break C4 (0.03125 = 45 mins) yields net day fraction 0.364583.",
      "Multiplying by 24 evaluates to 8.75 net billable hours. MAX(0, ...) guards against data entry typos."
    ],
    proTip: "Storing break duration as a true time value (00:45) allows direct fractional subtraction."
  },
  {
    id: 4,
    title: "Calculating Daily Statutory Overtime Hours (Exceeding 8 Hours Standard)",
    functionUsed: "MAX with Baseline Deduction",
    category: "Overtime Tiers",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Total net working hours for the day is 10.50 in cell D5. Standard statutory shift is 8.00 hours. Calculate overtime hours (2.50 hours). If worked hours are 7.5, OT must return 0.00.",
    inputCell: "D5 = 10.50 (Net worked hours)",
    targetCell: "E5",
    formula: '=MAX(0, D5 - 8)',
    evaluatedOutput: "2.50",
    outputType: "Overtime Hours",
    stepByStepLogic: [
      "D5 - 8 calculates excess hours (10.50 - 8.00 = 2.50).",
      "If D5 is 7.5, (7.5 - 8 = -0.5), MAX(0, -0.5) returns 0.00.",
      "Eliminates clumsy IF statements and guarantees non-negative overtime."
    ],
    proTip: "Combine with regular hours formula in cell F5: =MIN(8, D5) to split total hours into Base (8.00) and OT (2.50)."
  },
  {
    id: 5,
    title: "Tiered Overtime Engine (1.5x Standard OT vs 2.0x Double-Time Penalty)",
    functionUsed: "Nested MIN & MAX",
    category: "Overtime Tiers",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "An employee worked 13.00 hours in cell D6. Standard base is 8 hours. Overtime between 8 and 12 hours is Tier 1 (1.5x rate). Hours exceeding 12 hours are Tier 2 (Double Time, 2.0x rate). Calculate Tier 1 OT hours (4.00) and Tier 2 OT hours (1.00).",
    inputCell: "D6 = 13.00",
    targetCell: "E6 (Tier 1 OT), F6 (Tier 2 OT)",
    formula: 'Tier 1: =MEDIAN(0, 4, D6 - 8) | Tier 2: =MAX(0, D6 - 12)',
    evaluatedOutput: "Tier 1: 4.00 hrs, Tier 2: 1.00 hr",
    outputType: "Tiered Split Hours",
    stepByStepLogic: [
      "D6 - 8 = 5 total OT hours.",
      "MEDIAN(0, 4, 5) caps Tier 1 OT at a maximum of 4.00 hours.",
      "MAX(0, D6 - 12) = MAX(0, 13 - 12) captures the 1.00 hour of Double Time."
    ],
    proTip: "Using MEDIAN(min_limit, max_limit, value) is a master-level Excel technique to clamp values between limits."
  },
  {
    id: 6,
    title: "Rounding Punched Times to Nearest 15-Minute Payroll Interval",
    functionUsed: "MROUND with TIME",
    category: "Time Rounding",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "An employee punch time is 08:07 AM in cell A7. Company payroll policy rounds all clock-in times to the nearest 15-minute interval (08:00 AM for 08:07, but 08:15 AM for 08:08). Round this time to nearest 15 minutes.",
    inputCell: "A7 = 08:07 AM",
    targetCell: "B7",
    formula: '=MROUND(A7, TIME(0, 15, 0))',
    alternativeFormula: '=MROUND(A7, "0:15")',
    evaluatedOutput: "08:00 AM",
    outputType: "Rounded Time Serial",
    stepByStepLogic: [
      "TIME(0, 15, 0) generates the exact 15-minute fraction (15 / 1440 = 0.0104167).",
      "MROUND rounds the input time serial up or down to the closest multiple of 15 minutes.",
      "08:07 is closer to 08:00 than 08:15, evaluating to 08:00 AM."
    ],
    proTip: "Use CEILING(A7, '0:15') if company rules strictly round up in favor of the company, or FLOOR() if rounding down."
  },
  {
    id: 7,
    title: "Cumulative Weekly Hours Display Exceeding 24 Hours ([hh]:mm)",
    functionUsed: "Custom Format [h]:mm",
    category: "Time Formatting",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A worker accumulated 5 shifts totaling 47 hours and 30 minutes in range C2:C6. Standard =SUM(C2:C6) with regular 'hh:mm' formatting wraps around 24 hours and displays '23:30' (47.5 - 24). Display the true cumulative 47:30.",
    inputCell: "C2:C6 = [8:30, 9:00, 10:00, 11:00, 9:00]",
    targetCell: "C7",
    formula: '=SUM(C2:C6)',
    evaluatedOutput: "47:30 (with Custom Format [h]:mm)",
    outputType: "Cumulative Time String",
    stepByStepLogic: [
      "SUM(C2:C6) evaluates to serial number 1.979167 (1 day, 23 hours, 30 mins = 47.5 hours).",
      "Standard format 'hh:mm' discards full integer days and shows only the remainder clock time (23:30).",
      "Enclosing the hour token in square brackets [h]:mm tells Excel to prevent 24-hour rollover and display full 47:30."
    ],
    proTip: "Always use [h]:mm or [hh]:mm for payroll timesheet totals, project time trackers, and billing logs."
  },
  {
    id: 8,
    title: "Applying 1.5x Multiplier to Weekend Shift Hours (WEEKDAY Check)",
    functionUsed: "WEEKDAY with IF",
    category: "Weekend Differentials",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Shift date is in A8 (18-Apr-2026, a Saturday) and net hours worked is 8.00 in B8. If the shift falls on Saturday or Sunday (weekend), apply a 1.5x weekend premium rate to the billable hours; otherwise regular 1.0x.",
    inputCell: "A8 = 18-Apr-2026 (Saturday), B8 = 8.00",
    targetCell: "C8",
    formula: '=IF(WEEKDAY(A8, 2) >= 6, B8 * 1.5, B8 * 1.0)',
    evaluatedOutput: "12.00",
    outputType: "Premium Billable Hours",
    stepByStepLogic: [
      "WEEKDAY(A8, 2) uses return_type 2 where Mon=1, Tue=2 ... Sat=6, Sun=7.",
      "WEEKDAY >= 6 returns TRUE for Saturday and Sunday shifts.",
      "Calculates 8.00 * 1.5 = 12.00 billable equivalent hours."
    ],
    proTip: "Return type 2 (WEEKDAY(..., 2)) makes weekend detection as simple as checking >= 6."
  },
  {
    id: 9,
    title: "Split Shift Duration with Morning and Evening Shift Intervals",
    functionUsed: "Dual MOD Subtraction",
    category: "Split Shifts",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "A restaurant chef works a split shift: Morning Session 10:00 AM (A9) to 02:30 PM (B9) and Evening Session 06:00 PM (C9) to 11:30 PM (D9). Compute total combined payable hours in a single formula.",
    inputCell: "A9=10:00 AM, B9=02:30 PM, C9=06:00 PM, D9=11:30 PM",
    targetCell: "E9",
    formula: '=(MOD(B9 - A9, 1) + MOD(D9 - C9, 1)) * 24',
    evaluatedOutput: "10.00",
    outputType: "Decimal Hours",
    stepByStepLogic: [
      "MOD(B9 - A9, 1) calculates morning session (4.50 hours = 0.1875 days).",
      "MOD(D9 - C9, 1) calculates evening session (5.50 hours = 0.229167 days).",
      "Summing both day fractions (0.416667) and multiplying by 24 returns 10.00 total working hours."
    ],
    proTip: "Summing individual MOD fractions handles split shifts even if the evening shift crosses midnight into the next morning."
  },
  {
    id: 10,
    title: "End-to-End Gross Payroll Earnings Formula (Base Pay + Overtime)",
    functionUsed: "Comprehensive Payroll Model",
    category: "Payroll Synthesis",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "Gross shift duration is in C10 (10.5 hours), hourly base wage rate is ₹500/hr in D10, standard day is 8 hours, and statutory overtime is paid at 1.5x base rate. Calculate total gross earnings for the shift.",
    inputCell: "C10 = 10.50 (Worked Hours), D10 = ₹500.00 (Base Rate)",
    targetCell: "E10",
    formula: '=(MIN(8, C10) * D10) + (MAX(0, C10 - 8) * D10 * 1.5)',
    evaluatedOutput: "₹5,875.00",
    outputType: "Currency Currency",
    stepByStepLogic: [
      "MIN(8, 10.5) * 500 = 8 * 500 = ₹4,000 (Regular Base Pay).",
      "MAX(0, 10.5 - 8) = 2.5 overtime hours.",
      "2.5 hrs * ₹500 * 1.5 = ₹1,875 (Overtime Pay).",
      "Total gross earnings = ₹4,000 + ₹1,875 = ₹5,875.00."
    ],
    proTip: "This single parameterized formula is the fundamental engine for automated daily payroll computation."
  }
];

export default practicalQuestions;
