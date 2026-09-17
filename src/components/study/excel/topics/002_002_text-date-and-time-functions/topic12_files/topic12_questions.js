// Topic 12 Questions
const topic12Questions = [
  {
    "id": "t12_q1",
    "question": "How do you calculate total hours worked for an employee who clocks in at 08:30 and clocks out at 17:00 with an unpaid 30-minute lunch?",
    "shortAnswer": "=(Out_Time - In_Time - Lunch_Duration) * 24.",
    "explanation": "Subtracting start time from end time yields fractional day units. Subtracting unpaid lunch (e.g. 30/1440 or 0.5/24) and multiplying by 24 converts the result to decimal hours (8.0 hours).",
    "hint": "Subtract start and break from end time, multiply by 24.",
    "level": "Basic",
    "codeExample": "=(B2 - A2 - (30/1440)) * 24 // 17:00 - 08:30 - 30m = 8.0 hours"
  },
  {
    "id": "t12_q2",
    "question": "How do you calculate shift hours when an employee works an overnight shift crossing midnight (e.g., 22:00 to 06:00)?",
    "shortAnswer": "=MOD(Out_Time - In_Time, 1) * 24.",
    "explanation": "When Out_Time is less than In_Time, subtracting them produces a negative number. MOD(end - start, 1) adds 1 full day (24h) to wrap around midnight seamlessly.",
    "hint": "Use MOD(End - Start, 1) * 24.",
    "level": "Intermediate",
    "codeExample": "=MOD(TIME(6,0,0) - TIME(22,0,0), 1) * 24 // Returns: 8.0 hours"
  },
  {
    "id": "t12_q3",
    "question": "How do you separate regular hours (up to 8 hours) from overtime hours in a single daily shift?",
    "shortAnswer": "Regular: =MIN(8, Total_Hours); Overtime: =MAX(0, Total_Hours - 8).",
    "explanation": "MIN(8, total) caps regular hours at 8. MAX(0, total - 8) captures any excess time above 8 hours without returning negative numbers.",
    "hint": "Use MIN for regular cap and MAX for overtime excess.",
    "level": "Intermediate",
    "codeExample": "// Regular Hours (Cell D2):\n=MIN(8, C2)\n// Overtime Hours (Cell E2):\n=MAX(0, C2 - 8)"
  },
  {
    "id": "t12_q4",
    "question": "How do you round shift clock-in and clock-out times to the nearest 15-minute increment?",
    "shortAnswer": "Use MROUND with TIME(0, 15, 0): =MROUND(A2, TIME(0, 15, 0)) or =MROUND(A2, \"0:15\").",
    "explanation": "MROUND rounds values up or down to the nearest specified multiple. For 15 minutes, 15/(24*60) or TIME(0,15,0) specifies the exact time interval.",
    "hint": "Use MROUND(cell, TIME(0,15,0)).",
    "level": "Basic",
    "codeExample": "=MROUND(A2, TIME(0, 15, 0))\n// 08:07 -> 08:00\n// 08:08 -> 08:15"
  },
  {
    "id": "t12_q5",
    "question": "What is the difference between CEILING and FLOOR when applied to employee timesheets?",
    "shortAnswer": "CEILING rounds up to the next interval (e.g. grace period expiry); FLOOR rounds down to the previous interval.",
    "explanation": "CEILING(A2, \"0:15\") rounds up to the nearest 15 minutes, while FLOOR(A2, \"0:15\") rounds down.",
    "hint": "CEILING always rounds up; FLOOR always rounds down.",
    "level": "Intermediate",
    "codeExample": "=CEILING(A2, TIME(0, 15, 0)) // 08:01 -> 08:15\n=FLOOR(A2, TIME(0, 15, 0))   // 08:14 -> 08:00"
  },
  {
    "id": "t12_q6",
    "question": "How do you calculate gross pay with 1.5x pay for overtime hours?",
    "shortAnswer": "=(Regular_Hours * Hourly_Rate) + (Overtime_Hours * Hourly_Rate * 1.5).",
    "explanation": "Multiply regular hours by standard base rate and overtime hours by 1.5 times the base rate.",
    "hint": "Regular * Rate + OT * Rate * 1.5.",
    "level": "Basic",
    "codeExample": "=(D2 * $G$1) + (E2 * $G$1 * 1.5)"
  },
  {
    "id": "t12_q7",
    "question": "How do you calculate tiered overtime: 1.5x for hours between 8 and 12, and 2.0x (double time) for hours over 12?",
    "shortAnswer": "Regular: MIN(8,T); OT 1.5x: MEDIAN(0, T-8, 4); Double Time 2.0x: MAX(0, T-12).",
    "explanation": "MEDIAN(0, Total-8, 4) neatly bounds the 1.5x overtime bucket between 0 and 4 hours. MAX(0, Total-12) captures anything exceeding 12 hours.",
    "hint": "Use MEDIAN to bound the middle 4-hour tier.",
    "level": "Advanced",
    "codeExample": "// Regular:\n=MIN(8, C2)\n// 1.5x Overtime (Hours 8 to 12):\n=MEDIAN(0, C2 - 8, 4)\n// 2.0x Double Time (Hours > 12):\n=MAX(0, C2 - 12)"
  },
  {
    "id": "t12_q8",
    "question": "How do you calculate weekly overtime when overtime is defined as total weekly hours exceeding 40 hours rather than daily limits?",
    "shortAnswer": "Weekly Regular: =MIN(40, SUM(Daily_Hours)); Weekly Overtime: =MAX(0, SUM(Daily_Hours) - 40).",
    "explanation": "Sum all days of the work week first, then apply the 40-hour threshold across the weekly total.",
    "hint": "Sum the week first, then cap at 40.",
    "level": "Basic",
    "codeExample": "// Regular:\n=MIN(40, SUM(C2:C8))\n// Overtime:\n=MAX(0, SUM(C2:C8) - 40)"
  },
  {
    "id": "t12_q9",
    "question": "How do you format a cell to display total cumulative timesheet hours exceeding 24 hours (e.g. 52 hours 30 mins)?",
    "shortAnswer": "Use the custom number format [h]:mm or [h]:mm:ss.",
    "explanation": "Enclosing the hour code in square brackets [h] instructs Excel not to reset to zero every 24 hours, displaying total elapsed hours.",
    "hint": "Square brackets [h]:mm format.",
    "level": "Basic",
    "codeExample": "Custom Format: [h]:mm"
  },
  {
    "id": "t12_q10",
    "question": "How do you calculate night shift differential hours worked between 22:00 (10 PM) and 06:00 (6 AM)?",
    "shortAnswer": "Use overlapping interval arithmetic with MEDIAN/MAX/MIN against the night window.",
    "explanation": "Comparing shift start and end times against the 22:00-06:00 window boundaries calculates exact night premium hours.",
    "hint": "Overlap between shift interval and 22:00-06:00 window.",
    "level": "Advanced",
    "codeExample": "=LET(\n  s, MOD(In_Time, 1), e, MOD(Out_Time, 1),\n  dur, MOD(e - s, 1),\n  night_start, 22/24, night_end, 6/24,\n  // Interval calculation logic\n  dur * 24\n)"
  },
  {
    "id": "t12_q11",
    "question": "How do you automatically deduct a 30-minute lunch break only if an employee works more than 6 continuous hours?",
    "shortAnswer": "=IF(Gross_Hours > 6, Gross_Hours - 0.5, Gross_Hours).",
    "explanation": "Using an IF statement conditionally applies the 0.5 hour (30 min) deduction only when gross elapsed hours exceed 6.0.",
    "hint": "Conditional deduction using IF(hours > 6, hours - 0.5, hours).",
    "level": "Intermediate",
    "codeExample": "=IF((B2-A2)*24 > 6, (B2-A2)*24 - 0.5, (B2-A2)*24)"
  },
  {
    "id": "t12_q12",
    "question": "Why does multiplying a time difference by 24 sometimes produce small floating-point discrepancies like 7.999999999999?",
    "shortAnswer": "Binary floating-point precision limitations in decimal-to-binary fraction conversion.",
    "explanation": "Times like 1/3 (8 hours) or 1/24 cannot be represented perfectly in base-2 binary floating point. Use ROUND(formula, 2) to eliminate rounding artifacts.",
    "hint": "Wrap time calculations in ROUND(..., 2).",
    "level": "Intermediate",
    "codeExample": "=ROUND(MOD(B2 - A2, 1) * 24, 2)"
  },
  {
    "id": "t12_q13",
    "question": "How do you calculate holiday premium pay (e.g., 2.0x) on shifts worked on specific company holiday dates?",
    "shortAnswer": "=IF(ISNUMBER(MATCH(Shift_Date, Holiday_List, 0)), Total_Hours * Rate * 2.0, Standard_Pay_Formula).",
    "explanation": "MATCH checks whether the shift date exists in the designated holiday range. If matched, the 2.0x multiplier applies to all hours worked.",
    "hint": "Use MATCH against holiday dates array.",
    "level": "Intermediate",
    "codeExample": "=IF(ISNUMBER(MATCH(A2, $H$2:$H$15, 0)), C2 * $Rate * 2.0, (MIN(8,C2)*$Rate + MAX(0,C2-8)*$Rate*1.5))"
  },
  {
    "id": "t12_q14",
    "question": "How do you calculate weekend premium pay for shifts falling on Saturday or Sunday?",
    "shortAnswer": "=IF(WEEKDAY(Shift_Date, 2) >= 6, Weekend_Rate, Standard_Rate).",
    "explanation": "WEEKDAY with return_type=2 numbers Monday=1 through Saturday=6 and Sunday=7. Checking >= 6 identifies weekend dates.",
    "hint": "WEEKDAY(date, 2) >= 6 identifies weekends.",
    "level": "Basic",
    "codeExample": "=IF(WEEKDAY(A2, 2) >= 6, C2 * $Rate * 1.5, C2 * $Rate)"
  },
  {
    "id": "t12_q15",
    "question": "How do you calculate cumulative weekly overtime when daily hours are entered in a column?",
    "shortAnswer": "Use running SUM with MIN and MAX formulas across the cumulative sum column.",
    "explanation": "Track the cumulative hours worked from Monday through Friday. Once the cumulative sum exceeds 40, allocate daily hours to overtime.",
    "hint": "Calculate cumulative hours and test against 40.",
    "level": "Advanced",
    "codeExample": "=LET(\n  prior_cum, SUM($C$1:C1),\n  today_hrs, C2,\n  new_cum, prior_cum + today_hrs,\n  reg_hrs, MAX(0, MIN(today_hrs, 40 - prior_cum)),\n  ot_hrs, today_hrs - reg_hrs,\n  HSTACK(reg_hrs, ot_hrs)\n)"
  },
  {
    "id": "t12_q16",
    "question": "How do you calculate shift durations when dates and times are combined in full timestamps (e.g. '2026-05-15 22:00' to '2026-05-16 06:00')?",
    "shortAnswer": "=(End_Timestamp - Start_Timestamp) * 24.",
    "explanation": "When full datetime serial numbers are used, simple subtraction automatically handles midnight crossings and multi-day spans without requiring MOD.",
    "hint": "Simple subtraction handles full timestamps across midnight.",
    "level": "Basic",
    "codeExample": "=(B2 - A2) * 24 // 46158.25 - 46157.9167 = 0.3333 days -> 8.0 hours"
  },
  {
    "id": "t12_q17",
    "question": "How do you convert decimal hours (e.g., 8.75) into a friendly text string like '8 hrs 45 mins'?",
    "shortAnswer": "=INT(A1) & \" hrs \" & ROUND(MOD(A1, 1) * 60, 0) & \" mins\".",
    "explanation": "INT(A1) extracts whole hours. MOD(A1, 1) * 60 calculates remaining minutes, and string concatenation formats the output.",
    "hint": "INT for hours, MOD * 60 for minutes.",
    "level": "Intermediate",
    "codeExample": "=INT(A1) & \" hrs \" & ROUND(MOD(A1, 1) * 60, 0) & \" mins\""
  },
  {
    "id": "t12_q18",
    "question": "How do you calculate total billable hours when billing in minimum 30-minute increments rounded up?",
    "shortAnswer": "=CEILING(MOD(Out_Time - In_Time, 1) * 24, 0.5).",
    "explanation": "CEILING rounds the decimal hours up to the next 0.5 (half-hour) threshold. A 1h 10m shift becomes 1.5 billable hours.",
    "hint": "Use CEILING(decimal_hours, 0.5).",
    "level": "Intermediate",
    "codeExample": "=CEILING(MOD(B2 - A2, 1) * 24, 0.5)"
  },
  {
    "id": "t12_q19",
    "question": "How do you prevent negative time values from displaying '#####...' errors in standard 1900 date system Excel?",
    "shortAnswer": "Calculate time as decimal numbers or use IF(start > end, ...); do not leave negative numbers formatted as time.",
    "explanation": "Excel's 1900 date system cannot format negative numbers as time, producing '#####'. Keeping calculations in decimal hours avoids this issue.",
    "hint": "Use decimal math or check for start > end.",
    "level": "Basic",
    "codeExample": "=IF(B2 >= A2, B2 - A2, - (A2 - B2))"
  },
  {
    "id": "t12_q20",
    "question": "How do you calculate rest break compliance (e.g., alert if an employee has less than 11 hours between consecutive shifts)?",
    "shortAnswer": "=IF((Next_Shift_In - Prior_Shift_Out) * 24 < 11, \"VIOLATION\", \"OK\").",
    "explanation": "Subtract prior shift clock-out datetime from next shift clock-in datetime and check if the interval is below legal rest limits.",
    "hint": "Compare elapsed hours between shifts against 11.",
    "level": "Intermediate",
    "codeExample": "=IF((A3 - B2) * 24 < 11, \"Rest Violation\", \"Compliant\")"
  },
  {
    "id": "t12_q21",
    "question": "How do you compute total shift hours for a 7-day employee timesheet ignoring absent days (blank or 'OFF')?",
    "shortAnswer": "=SUM(IF(ISNUMBER(Out_Range), (Out_Range - In_Range) * 24, 0)).",
    "explanation": "Using ISNUMBER ignores text entries like 'OFF', 'SICK', or 'VACATION' while summing valid shift duration pairs.",
    "hint": "Filter with ISNUMBER in array sum.",
    "level": "Intermediate",
    "codeExample": "=SUM(IF(ISNUMBER(B2:B8), MOD(B2:B8 - A2:A8, 1) * 24, 0))"
  },
  {
    "id": "t12_q22",
    "question": "How do you calculate seventh-consecutive-day overtime rules (e.g., California labor law)?",
    "shortAnswer": "Check if employee worked 7 consecutive days in the workweek; if day 7 count is 7, all day 7 hours are overtime.",
    "explanation": "COUNT(Mon:Sat) = 6 means Sunday is the 7th consecutive workday. On day 7, first 8 hours are 1.5x and hours > 8 are 2.0x.",
    "hint": "Count non-zero shifts in preceding 6 days.",
    "level": "Advanced",
    "codeExample": "=IF(COUNT(C2:C7) = 6, \"7th Day Overtime Rules Apply\", \"Standard Rules\")"
  },
  {
    "id": "t12_q23",
    "question": "How do you calculate tardiness penalties (e.g., minutes late past scheduled 09:00 start with a 5-minute grace period)?",
    "shortAnswer": "=MAX(0, (Actual_In - Scheduled_In) * 1440 - Grace_Minutes).",
    "explanation": "Multiplying the time difference by 1440 gives minutes late. Subtracting grace minutes and applying MAX(0, ...) computes penalty minutes.",
    "hint": "Multiply day fraction by 1440 to get minutes.",
    "level": "Intermediate",
    "codeExample": "=MAX(0, ROUND((A2 - TIME(9,0,0)) * 1440, 0) - 5)"
  },
  {
    "id": "t12_q24",
    "question": "How do you handle split shifts (e.g., working 09:00-13:00 and 17:00-21:00 on the same day)?",
    "shortAnswer": "Sum the durations of both shift segments: =((Out1 - In1) + (Out2 - In2)) * 24.",
    "explanation": "Compute each segment duration independently and add them together to evaluate combined daily hours against overtime limits.",
    "hint": "Add segment 1 + segment 2.",
    "level": "Basic",
    "codeExample": "=(MOD(B2-A2, 1) + MOD(D2-C2, 1)) * 24"
  },
  {
    "id": "t12_q25",
    "question": "How do you generate a summary timesheet showing total employee hours by department using modern dynamic arrays?",
    "shortAnswer": "Use GROUPBY (Excel 365) or UNIQUE with SUMIFS: =GROUPBY(Dept_Col, Hours_Col, SUM).",
    "explanation": "GROUPBY aggregates department totals dynamically, or UNIQUE(Dept_Col) combined with SUMIFS(Hours_Col, Dept_Col, unique_dept).",
    "hint": "Use GROUPBY or UNIQUE + SUMIFS.",
    "level": "Intermediate",
    "codeExample": "=GROUPBY(A2:A100, C2:C100, SUM)"
  },
  {
    "id": "t12_q26",
    "question": "How do you highlight employees who exceeded 40 hours in a week using Conditional Formatting?",
    "shortAnswer": "Apply a conditional formatting rule with formula: =$Total_Hours > 40.",
    "explanation": "Setting a formula-based rule highlights rows or total cells whenever total weekly hours exceed the 40-hour limit.",
    "hint": "Conditional formatting formula =$E2 > 40.",
    "level": "Basic",
    "codeExample": "Rule Formula: =$E2 > 40"
  },
  {
    "id": "t12_q27",
    "question": "How do you calculate shift durations when times are entered as integers like 830 (8:30 AM) and 1700 (5:00 PM)?",
    "shortAnswer": "Convert integers to true times using TIME(INT(A1/100), MOD(A1,100), 0) before calculating differences.",
    "explanation": "INT(830/100) = 8 (hours); MOD(830, 100) = 30 (minutes). TIME(8, 30, 0) produces a true Excel time serial.",
    "hint": "Convert integer HHMM to TIME(INT/100, MOD 100, 0).",
    "level": "Advanced",
    "codeExample": "=TIME(INT(B2/100), MOD(B2,100), 0) - TIME(INT(A2/100), MOD(A2,100), 0)"
  },
  {
    "id": "t12_q28",
    "question": "How do you calculate shift overlap between two employees to ensure continuous coverage?",
    "shortAnswer": "=MAX(0, MIN(Emp1_Out, Emp2_Out) - MAX(Emp1_In, Emp2_In)) * 24.",
    "explanation": "The overlap of two intervals [A, B] and [C, D] is MAX(0, MIN(B, D) - MAX(A, C)). Multiplying by 24 gives overlap in hours.",
    "hint": "MIN(Ends) - MAX(Starts).",
    "level": "Advanced",
    "codeExample": "=MAX(0, MIN(B2, D2) - MAX(A2, C2)) * 24"
  },
  {
    "id": "t12_q29",
    "question": "How do you calculate on-call standby pay (e.g., $5/hr on standby, $30/hr when active)?",
    "shortAnswer": "=(Standby_Hours * Standby_Rate) + (Active_Hours * Active_Rate).",
    "explanation": "Subtract active hours from total scheduled on-call window to determine standby hours, then apply respective pay rates.",
    "hint": "Separate standby hours from active dispatch hours.",
    "level": "Basic",
    "codeExample": "=((Total_Window_Hours - Active_Hours) * 5) + (Active_Hours * 30)"
  },
  {
    "id": "t12_q30",
    "question": "What is the best practice for architecting scalable payroll timesheets in Excel?",
    "shortAnswer": "Store raw clock punches in an Excel Table, separate calculation logic into distinct columns (Regular, OT1, OT2), and summarize via PivotTables.",
    "explanation": "Structured tables provide automatic formula expansion, clean column naming, robust range referencing, and simple aggregation.",
    "hint": "Use Excel Tables + modular columns + PivotTables.",
    "level": "Intermediate",
    "codeExample": "// Table structured reference formula:\n=MIN(8, [@GrossHours])"
  }
];

export default topic12Questions;
