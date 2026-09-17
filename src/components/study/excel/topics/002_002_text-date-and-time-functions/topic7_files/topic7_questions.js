// Topic 7 Questions
const topic7Questions = [
  {
    "id": "t7_q1",
    "question": "How does Excel represent time values internally in its calculation engine?",
    "shortAnswer": "Time is stored as a fractional decimal number representing the fraction of a 24-hour day (e.g. 0.5 = 12:00 PM, 0.25 = 6:00 AM).",
    "explanation": "Because 1 day = 1.0, 1 hour = 1/24 (0.041666...), 1 minute = 1/1440 (0.000694...), and 1 second = 1/86400 (0.00001157...). A date-time timestamp like 45519.75 represents 6:00 PM on August 15, 2024.",
    "hint": "1 hour = 1/24; 1 minute = 1/1440; 1 second = 1/86400.",
    "level": "Beginner",
    "codeExample": "=TIME(12, 0, 0)  ' Evaluates to numeric float 0.5"
  },
  {
    "id": "t7_q2",
    "question": "How do you calculate total hours worked across midnight (e.g. shift starting at 10:00 PM and ending at 6:00 AM)?",
    "shortAnswer": "Use =MOD(End_Time - Start_Time, 1) or =IF(End < Start, End + 1 - Start, End - Start).",
    "explanation": "Because 6:00 AM (0.25) is smaller than 10:00 PM (0.9167), simple subtraction returns a negative number (-0.6667), displaying '######'. Applying =MOD(0.25 - 0.9167, 1) adds 1 full day (24 hours) automatically, returning exactly 0.3333 (8.0 hours).",
    "hint": "Use =MOD(End - Start, 1) for overnight time calculations.",
    "level": "Intermediate",
    "codeExample": "=MOD(B2 - A2, 1) * 24  ' Total hours as decimal (e.g. 8.0)"
  },
  {
    "id": "t7_q3",
    "question": "Why does a cell summing total project hours display \"04:30\" instead of \"28:30\" when summing multiple shifts?",
    "shortAnswer": "Standard \"hh:mm\" format resets to 0 after every 24-hour cycle (modulo 24); you must apply \"[h]:mm\" formatting.",
    "explanation": "Enclosing the hour token in square brackets [h] instructs Excel to display total cumulative elapsed hours without resetting every 24 hours (e.g. 28 hours 30 minutes).",
    "hint": "Apply custom number format [h]:mm:ss.",
    "level": "Beginner",
    "codeExample": "=TEXT(SUM(A2:A10), \"[h]:mm\")"
  },
  {
    "id": "t7_q4",
    "question": "How do you convert decimal hours (e.g. 7.5 hours) into standard Excel time format (07:30:00)?",
    "shortAnswer": "Divide the decimal hours by 24: =A2 / 24, then format as Time.",
    "explanation": "Since 1 day = 24 hours, dividing decimal hours by 24 converts it to Excel's internal day-fraction representation (7.5 / 24 = 0.3125 = 7:30 AM/elapsed).",
    "hint": "Decimal hours to Excel time: Divide by 24.",
    "level": "Beginner",
    "codeExample": "=A2 / 24  ' Format as [h]:mm"
  },
  {
    "id": "t7_q5",
    "question": "How do you convert Excel time (e.g. 07:30:00) into decimal hours (7.5) for hourly rate multiplication?",
    "shortAnswer": "Multiply the time cell by 24 and format as General or Number: =A2 * 24.",
    "explanation": "Excel time is a fraction of a day. Multiplying by 24 converts day fractions into total decimal hours (0.3125 * 24 = 7.5). Multiplying by hourly rate ($50/hr) yields gross pay ($375.00).",
    "hint": "Excel time to decimal hours: Multiply by 24.",
    "level": "Beginner",
    "codeExample": "=(B2 - A2) * 24 * HourlyRate"
  },
  {
    "id": "t7_q6",
    "question": "What is the syntax and behavior of the TIME function in Excel?",
    "shortAnswer": "Syntax: =TIME(hour, minute, second). It accepts integer inputs and rolls over values greater than 23 hours, 59 minutes, or 59 seconds.",
    "explanation": "=TIME(27, 0, 0) rolls 27 hours into 1 day + 3 hours, returning 0.125 (3:00 AM). =TIME(14, 90, 0) rolls 90 minutes into 1 hour 30 mins, returning 15:30 (3:30 PM).",
    "hint": "TIME(hour, min, sec) automatically rolls over excess values.",
    "level": "Beginner",
    "codeExample": "=TIME(HOUR(A2) + 2, MINUTE(A2) + 30, 0)"
  },
  {
    "id": "t7_q7",
    "question": "How do you extract the individual hour, minute, and second components from a time cell?",
    "shortAnswer": "Use =HOUR(cell), =MINUTE(cell), and =SECOND(cell).",
    "explanation": "HOUR(A2) returns integer 0\u201323. MINUTE(A2) returns integer 0\u201359. SECOND(A2) returns integer 0\u201359. These extract clean integers for time grouping.",
    "hint": "HOUR(), MINUTE(), SECOND() return integers.",
    "level": "Beginner",
    "codeExample": "=HOUR(A2) & \"h \" & MINUTE(A2) & \"m\""
  },
  {
    "id": "t7_q8",
    "question": "How do you round time to the nearest 15-minute billing increment in Excel?",
    "shortAnswer": "Use MROUND or CEILING: =MROUND(A2, \"0:15\") or =MROUND(A2, TIME(0, 15, 0)).",
    "explanation": "=MROUND(A2, TIME(0, 15, 0)) rounds to the nearest 15-minute mark (e.g. 09:07 becomes 09:00; 09:08 becomes 09:15). To always round up for client billing, use =CEILING.MATH(A2, TIME(0, 15, 0)).",
    "hint": "Use =MROUND(A2, TIME(0, 15, 0)) for nearest 15 mins.",
    "level": "Intermediate",
    "codeExample": "=CEILING.MATH(A2, TIME(0, 15, 0))  ' Round up to 15m"
  },
  {
    "id": "t7_q9",
    "question": "How do you subtract a 30-minute unpaid lunch break from total daily shift duration?",
    "shortAnswer": "Subtract TIME(0, 30, 0) or (30/1440) from elapsed shift time: =MOD(End - Start, 1) - TIME(0, 30, 0).",
    "explanation": "If employee worked from 9:00 AM to 5:30 PM (8.5 hrs), subtracting =TIME(0, 30, 0) (0.5 hrs) leaves exactly 8.0 billable hours. Wrap in MAX(0, ...) to prevent negative durations.",
    "hint": "Subtract TIME(0, 30, 0) for 30m break.",
    "level": "Intermediate",
    "codeExample": "=MAX(0, MOD(B2 - A2, 1) - TIME(0, 30, 0)) * 24"
  },
  {
    "id": "t7_q10",
    "question": "How do you calculate overtime hours worked when normal shift threshold is 8 hours per day?",
    "shortAnswer": "Use =MAX(0, (MOD(End - Start, 1) * 24) - 8).",
    "explanation": "If total elapsed hours is 10.5, (10.5 - 8) = 2.5 overtime hours. If elapsed is 7.0, (7.0 - 8) = -1.0, and MAX(0, -1.0) returns 0.0, cleanly isolating overtime.",
    "hint": "=MAX(0, TotalHours - 8)",
    "level": "Beginner",
    "codeExample": "=MAX(0, (MOD(B2 - A2, 1) * 24) - 8)"
  },
  {
    "id": "t7_q11",
    "question": "How does Excel convert text strings like \"14:30\" into numeric time values?",
    "shortAnswer": "Use the TIMEVALUE function: =TIMEVALUE(\"14:30:00\").",
    "explanation": "=TIMEVALUE(time_text) parses string time and outputs its decimal day fraction (0.6041667). Double unary (--\"14:30\") also coerces it directly.",
    "hint": "Use =TIMEVALUE(text) or --text.",
    "level": "Beginner",
    "codeExample": "=TIMEVALUE(\"09:30 AM\")"
  },
  {
    "id": "t7_q12",
    "question": "How do you extract strictly the time portion from a combined date-time timestamp cell (e.g. \"2024-08-15 17:30:00\")?",
    "shortAnswer": "Use the MOD function with divisor 1: =MOD(A2, 1).",
    "explanation": "Timestamps are stored as Integer.Fraction (e.g. 45519.729167). =INT(A2) returns the date integer (45519), and =MOD(A2, 1) returns strictly the decimal time fraction (0.729167 = 5:30 PM).",
    "hint": "=MOD(A2, 1) extracts time fraction; INT(A2) extracts date.",
    "level": "Intermediate",
    "codeExample": "=MOD(A2, 1)"
  },
  {
    "id": "t7_q13",
    "question": "How do you combine a separate date cell (A2) and a separate time cell (B2) into a single timestamp?",
    "shortAnswer": "Simply add them together: =A2 + B2.",
    "explanation": "Because dates are integers and times are decimal fractions, adding date + time (e.g. 45519 + 0.375 = 45519.375) creates a complete date-time timestamp.",
    "hint": "Timestamp = Date + Time.",
    "level": "Beginner",
    "codeExample": "=A2 + B2  ' Format as \"yyyy-mm-dd hh:mm:ss\""
  },
  {
    "id": "t7_q14",
    "question": "How do you calculate night shift differential hours (hours worked between 10:00 PM and 6:00 AM)?",
    "shortAnswer": "Compare shift intervals against night window bounds using MIN and MAX overlap calculations.",
    "explanation": "Calculate overlap between [ShiftStart, ShiftEnd] and [22:00, 06:00] window. For single overnight shifts: =(MAX(0, MIN(End, TIME(6,0,0)) - Start) + MAX(0, End - MAX(Start, TIME(22,0,0)))) * 24.",
    "hint": "Use MIN/MAX window intersection math.",
    "level": "Expert",
    "codeExample": "=(MAX(0, MIN(B2, 6/24) - A2) + MAX(0, B2 - MAX(A2, 22/24))) * 24"
  },
  {
    "id": "t7_q15",
    "question": "How do you calculate total turnaround time in minutes between two timestamps?",
    "shortAnswer": "Subtract start from end and multiply by 1,440 (minutes in a day): =(B2 - A2) * 1440.",
    "explanation": "Since 1 day has 24 * 60 = 1,440 minutes, multiplying the timestamp difference by 1,440 returns total elapsed minutes as an integer float.",
    "hint": "Minutes = (End - Start) * 1440.",
    "level": "Beginner",
    "codeExample": "=(B2 - A2) * 1440"
  },
  {
    "id": "t7_q16",
    "question": "How do you calculate total turnaround time in seconds?",
    "shortAnswer": "Subtract start from end and multiply by 86,400: =(B2 - A2) * 86400.",
    "explanation": "Since 1 day = 86,400 seconds, multiplying elapsed days by 86,400 converts day fractions to exact seconds.",
    "hint": "Seconds = (End - Start) * 86400.",
    "level": "Beginner",
    "codeExample": "=(B2 - A2) * 86400"
  },
  {
    "id": "t7_q17",
    "question": "How do you format time to display milliseconds (e.g. race lap times 01:23.456)?",
    "shortAnswer": "Apply custom number format \"mm:ss.000\".",
    "explanation": "Placing \".000\" after seconds instructs Excel to display thousandths of a second.",
    "hint": "Use format mask \"mm:ss.000\".",
    "level": "Intermediate",
    "codeExample": "=TEXT(A2, \"mm:ss.000\")"
  },
  {
    "id": "t7_q18",
    "question": "How do you generate a 24-hour time schedule in 30-minute intervals using SEQUENCE in Excel 365?",
    "shortAnswer": "Use =SEQUENCE(48, 1, 0, 1/48) and format as Time.",
    "explanation": "48 intervals of 30 minutes exist in 24 hours. Starting at 0 with step 1/48 (= 30 mins) spills all 48 time slots from 00:00 to 23:30.",
    "hint": "=SEQUENCE(48, 1, 0, TIME(0, 30, 0))",
    "level": "Intermediate",
    "codeExample": "=SEQUENCE(48, 1, 0, TIME(0, 30, 0))"
  },
  {
    "id": "t7_q19",
    "question": "Why does subtracting 13:00 from 12:00 display \"######\" in Excel?",
    "shortAnswer": "In the standard 1900 date system, Excel cannot render negative time values.",
    "explanation": "A negative time (12:00 - 13:00 = -1 hour = -0.04167) renders as ##### across the cell. To display negative time, switch to the 1904 Date System or format via formula: =IF(diff<0, \"-\" & TEXT(ABS(diff), \"hh:mm\"), TEXT(diff, \"hh:mm\")).",
    "hint": "Use IF(diff<0, \"-\" & TEXT(ABS(diff)), ...) for negative times.",
    "level": "Intermediate",
    "codeExample": "=IF(B2<A2, \"-\" & TEXT(A2-B2, \"hh:mm\"), TEXT(B2-A2, \"hh:mm\"))"
  },
  {
    "id": "t7_q20",
    "question": "How do you calculate employee overtime pay with standard rate for first 40 hours and 1.5x time-and-a-half for excess hours?",
    "shortAnswer": "Use =MIN(40, TotalHours)*Rate + MAX(0, TotalHours - 40)*Rate*1.5.",
    "explanation": "MIN(40, H) caps regular hours at 40. MAX(0, H - 40) isolates overtime hours and multiplies by 1.5 times the hourly wage.",
    "hint": "=MIN(40, H)*Rate + MAX(0, H-40)*Rate*1.5",
    "level": "Intermediate",
    "codeExample": "=MIN(40, A2)*B2 + MAX(0, A2 - 40)*B2*1.5"
  },
  {
    "id": "t7_q21",
    "question": "How do you round time UP to the next full hour (e.g. 08:05 becomes 09:00)?",
    "shortAnswer": "Use CEILING.MATH: =CEILING.MATH(A2, 1/24).",
    "explanation": "Since 1 hour = 1/24, =CEILING.MATH(A2, 1/24) rounds any fractional minute up to the next integer hour mark.",
    "hint": "=CEILING.MATH(A2, 1/24)",
    "level": "Intermediate",
    "codeExample": "=CEILING.MATH(A2, 1/24)"
  },
  {
    "id": "t7_q22",
    "question": "How do you round time DOWN to the previous full hour (e.g. 08:55 becomes 08:00)?",
    "shortAnswer": "Use FLOOR.MATH: =FLOOR.MATH(A2, 1/24) or =INT(A2*24)/24.",
    "explanation": "=FLOOR.MATH(A2, 1/24) truncates minutes and seconds, keeping only the base hour.",
    "hint": "=FLOOR.MATH(A2, 1/24)",
    "level": "Intermediate",
    "codeExample": "=FLOOR.MATH(A2, 1/24)"
  },
  {
    "id": "t7_q23",
    "question": "How do you determine whether a given time falls within business operating hours (9:00 AM to 6:00 PM)?",
    "shortAnswer": "Use =AND(MOD(A2, 1) >= TIME(9,0,0), MOD(A2, 1) <= TIME(18,0,0)).",
    "explanation": "MOD(A2, 1) isolates the time fraction. AND() verifies that the time is between 09:00 (0.375) and 18:00 (0.75).",
    "hint": "=AND(MOD(A2,1)>=TIME(9,0,0), MOD(A2,1)<=TIME(18,0,0))",
    "level": "Beginner",
    "codeExample": "=IF(AND(MOD(A2,1)>=TIME(9,0,0), MOD(A2,1)<=TIME(18,0,0)), \"Open\", \"Closed\")"
  },
  {
    "id": "t7_q24",
    "question": "How do you parse flight departure and arrival times across different time zones?",
    "shortAnswer": "Convert both timestamps to UTC (UTC = LocalTime - TimeZoneOffset/24) before calculating duration.",
    "explanation": "Flight duration = (ArrivalLocal - DestOffset/24) - (DepartureLocal - OrigOffset/24). Normalizing to UTC prevents erroneous durations.",
    "hint": "Convert to UTC by subtracting (Offset / 24).",
    "level": "Advanced",
    "codeExample": "=(B2 - D2/24) - (A2 - C2/24)"
  },
  {
    "id": "t7_q25",
    "question": "How can you prevent users from entering invalid future times in Data Validation?",
    "shortAnswer": "Use custom Data Validation rule: =A2 <= NOW().",
    "explanation": "In Data Validation > Allow: Custom, formula =A2 <= NOW() rejects any timestamp later than the current system clock.",
    "hint": "Data Validation: =A2 <= NOW()",
    "level": "Beginner",
    "codeExample": "=A2 <= NOW()"
  },
  {
    "id": "t7_q26",
    "question": "How do you calculate average response time in seconds across a live server log?",
    "shortAnswer": "Use =AVERAGE(tblLogs[EndTime] - tblLogs[StartTime]) * 86400.",
    "explanation": "Subtracting start from end gives day fractions. Averaging and multiplying by 86,400 yields mean response time in seconds.",
    "hint": "Mean seconds = AVERAGE(End - Start) * 86400.",
    "level": "Intermediate",
    "codeExample": "=AVERAGE(tblLogs[ResponseTime]) * 86400"
  },
  {
    "id": "t7_q27",
    "question": "What is the difference between NOW() and TODAY() in terms of workbook performance?",
    "shortAnswer": "Both are volatile and trigger recalculation, but NOW() includes time serial fractions that change every second.",
    "explanation": "Both functions recalculate whenever Excel calculates. In automated financial dashboards, avoid placing =NOW() inside thousands of formulas.",
    "hint": "Store =NOW() in one single cell to maintain workbook speed.",
    "level": "Intermediate",
    "codeExample": "=MOD($Z$1, 1)  ' Where Z1 contains =NOW()"
  },
  {
    "id": "t7_q28",
    "question": "How do you calculate total billable hours when employees record time in minutes (e.g. 450 minutes)?",
    "shortAnswer": "Divide minutes by 60: =A2 / 60.",
    "explanation": "450 / 60 = 7.5 decimal hours.",
    "hint": "Hours = Minutes / 60.",
    "level": "Beginner",
    "codeExample": "=A2 / 60"
  },
  {
    "id": "t7_q29",
    "question": "How do you format a duration to display \"X Hours, Y Minutes\" without seconds?",
    "shortAnswer": "Use =INT(A2*24) & \" Hours, \" & MINUTE(A2) & \" Minutes\".",
    "explanation": "INT(A2*24) extracts total cumulative hours (even >24h), and MINUTE(A2) extracts remaining minutes.",
    "hint": "=INT(A2*24) & \"h \" & MINUTE(A2) & \"m\"",
    "level": "Intermediate",
    "codeExample": "=INT(A2*24) & \" Hours, \" & MINUTE(A2) & \" Minutes\""
  },
  {
    "id": "t7_q30",
    "question": "What is the universal master formula for employee timecard calculation that handles overnight shifts, 45-minute lunch breaks, and 8-hour overtime thresholds in one cell?",
    "shortAnswer": "Combine MOD, MAX, and MIN in a clean LET formula.",
    "explanation": "=LET(grossHours, MOD(ShiftEnd - ShiftStart, 1)*24, netHours, MAX(0, grossHours - 0.75), regHours, MIN(8, netHours), otHours, MAX(0, netHours - 8), HSTACK(regHours, otHours)). This spills regular and overtime hours instantly.",
    "hint": "Use LET with MOD, MAX, and MIN for robust timecards.",
    "level": "Expert",
    "codeExample": "=LET(raw, MOD(B2-A2,1)*24 - 0.75, HSTACK(MIN(8, raw), MAX(0, raw - 8)))"
  }
];

export default topic7Questions;
