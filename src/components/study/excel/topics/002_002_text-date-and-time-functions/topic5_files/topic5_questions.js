// Topic 5 Questions
const topic5Questions = [
  {
    "id": "t5_q1",
    "question": "What is the key difference between NETWORKDAYS and WORKDAY in Excel?",
    "shortAnswer": "NETWORKDAYS calculates the total count of working days between two dates; WORKDAY computes the resulting target date after adding/subtracting N working days.",
    "explanation": "NETWORKDAYS(start_date, end_date, [holidays]) returns an integer count of workdays. WORKDAY(start_date, days, [holidays]) returns a serial date. Both exclude Saturday and Sunday by default, along with any optional dates supplied in the holidays range.",
    "hint": "NETWORKDAYS returns a count of days; WORKDAY returns a date.",
    "level": "Beginner",
    "codeExample": "=NETWORKDAYS(A2, B2, holidays)  ' Count of days\n=WORKDAY(A2, 10, holidays)      ' Future date"
  },
  {
    "id": "t5_q2",
    "question": "How does the .INTL variant (WORKDAY.INTL and NETWORKDAYS.INTL) differ from standard WORKDAY/NETWORKDAYS?",
    "shortAnswer": ".INTL functions allow custom weekend definitions (e.g. Sunday only, Friday/Saturday, or a 7-character binary mask).",
    "explanation": "Standard functions strictly define weekends as Saturday/Sunday. In countries where weekends fall on Friday/Saturday (Middle East) or for shift workers working 6 days (Sunday-only weekend), the .INTL versions accept a weekend parameter integer (1\u201317) or a custom 7-character string mask (e.g. \"0000001\" for Sunday-only).",
    "hint": ".INTL supports custom weekend parameters and string masks.",
    "level": "Intermediate",
    "codeExample": "=NETWORKDAYS.INTL(A2, B2, 11, holidays)  ' 11 = Sunday only"
  },
  {
    "id": "t5_q3",
    "question": "How do 7-character binary weekend string masks work in WORKDAY.INTL and NETWORKDAYS.INTL?",
    "shortAnswer": "Each digit represents a day of the week from Monday to Sunday; '1' means non-working weekend day, '0' means working day.",
    "explanation": "Syntax: \"MTWTFSS\". \"0000011\" = Sat/Sun off (default). \"0000001\" = Sun off only. \"1000001\" = Mon and Sun off. \"0000110\" = Fri and Sat off. This provides absolute flexibility for any corporate shift roster.",
    "hint": "Mask starts on Monday: '1' = Weekend, '0' = Workday.",
    "level": "Intermediate",
    "codeExample": "=WORKDAY.INTL(A2, 15, \"0000001\", holidays)  ' 6-day work week"
  },
  {
    "id": "t5_q4",
    "question": "How are holidays supplied to WORKDAY, WORKDAY.INTL, NETWORKDAYS, and NETWORKDAYS.INTL?",
    "shortAnswer": "As a range reference, named range, or array constant containing valid Excel serial dates.",
    "explanation": "If a holiday falls on a scheduled weekend day, Excel intelligently avoids double-counting it. You can supply holidays as a single cell, range (e.g. `Holidays!A2:A20`), or array constant `{DATE(2024,1,26), DATE(2024,8,15)}`.",
    "hint": "Holidays on weekends are never double-counted.",
    "level": "Beginner",
    "codeExample": "=NETWORKDAYS(A2, B2, tblHolidays[Date])"
  },
  {
    "id": "t5_q5",
    "question": "What happens if start_date is greater than end_date in NETWORKDAYS?",
    "shortAnswer": "NETWORKDAYS returns a negative integer count representing the elapsed working days.",
    "explanation": "If start_date is Aug 15 and end_date is Aug 1, =NETWORKDAYS(A2, B2) evaluates the span in reverse and outputs a negative number, exactly preserving mathematical direction.",
    "hint": "Reversed dates return negative day counts.",
    "level": "Beginner",
    "codeExample": "=NETWORKDAYS(DATE(2024,8,15), DATE(2024,8,1))  ' Returns negative"
  },
  {
    "id": "t5_q6",
    "question": "How do you calculate a project deadline that requires exactly 45 working days, excluding company holidays?",
    "shortAnswer": "Use =WORKDAY(project_start_date, 45, holidays_range).",
    "explanation": "=WORKDAY(A2, 45, tblHolidays[Date]) automatically steps forward day by day, skipping every Saturday, Sunday, and listed company holiday, returning the exact contractually compliant delivery date.",
    "hint": "=WORKDAY(start, days, holidays)",
    "level": "Beginner",
    "codeExample": "=WORKDAY(A2, 45, tblHolidays[Date])"
  },
  {
    "id": "t5_q7",
    "question": "How do you calculate working days when a company operates 7 days a week (no weekend days off), but observes national holidays?",
    "shortAnswer": "Use NETWORKDAYS.INTL with weekend mask \"0000000\".",
    "explanation": "Setting the weekend mask to \"0000000\" marks all 7 days of the week as working days. The formula will then deduct only the official dates listed in the holidays parameter.",
    "hint": "Mask \"0000000\" = 7-day work week (only holidays deducted).",
    "level": "Intermediate",
    "codeExample": "=NETWORKDAYS.INTL(A2, B2, \"0000000\", tblHolidays[Date])"
  },
  {
    "id": "t5_q8",
    "question": "Why does NETWORKDAYS include both the start date and the end date in its calculation?",
    "shortAnswer": "NETWORKDAYS is inclusive of both endpoints (if they are valid working days).",
    "explanation": "If start date is Wednesday and end date is Wednesday of the same day, =NETWORKDAYS(A2, A2) returns 1 (representing that working day). If you need exclusive elapsed days, subtract 1.",
    "hint": "NETWORKDAYS includes both start and end days.",
    "level": "Intermediate",
    "codeExample": "=NETWORKDAYS(A2, A2)  ' Returns 1 if workday"
  },
  {
    "id": "t5_q9",
    "question": "How can you dynamically highlight SLA breach dates (where today exceeds promised turnaround working days) in Conditional Formatting?",
    "shortAnswer": "Use the formula =TODAY() > WORKDAY(Ticket_Date, SLA_Days, holidays).",
    "explanation": "In Conditional Formatting > New Rule: =TODAY() > WORKDAY(A2, 5, $H$2:$H$15). If current date has surpassed the 5-workday target, the rule returns TRUE and formats the ticket row in red.",
    "hint": "Condition: =TODAY() > WORKDAY(start, sla_days, holidays)",
    "level": "Intermediate",
    "codeExample": "=TODAY() > WORKDAY(A2, 5, $H$2:$H$15)"
  },
  {
    "id": "t5_q10",
    "question": "How do you calculate the percentage of working days completed so far in a project?",
    "shortAnswer": "Divide completed working days by total project working days.",
    "explanation": "=NETWORKDAYS(start_date, TODAY(), holidays) / NETWORKDAYS(start_date, end_date, holidays). Wrap in MIN(1, MAX(0, ...)) to prevent overflow beyond 100% or under 0%.",
    "hint": "Progress = NETWORKDAYS(start, TODAY) / NETWORKDAYS(start, end)",
    "level": "Intermediate",
    "codeExample": "=MIN(1, MAX(0, NETWORKDAYS(A2, TODAY(), holidays) / NETWORKDAYS(A2, B2, holidays)))"
  },
  {
    "id": "t5_q11",
    "question": "How can you count how many Mondays (or any specific weekday) occur between two dates?",
    "shortAnswer": "Use NETWORKDAYS.INTL with a mask that has '0' only for Monday and '1' for all other days.",
    "explanation": "Mask for Monday only: \"0111111\". =NETWORKDAYS.INTL(start_date, end_date, \"0111111\") treats Tuesday through Sunday as non-working days and counts strictly the Mondays in the date range.",
    "hint": "Mask \"0111111\" counts only Mondays.",
    "level": "Advanced",
    "codeExample": "=NETWORKDAYS.INTL(A2, B2, \"0111111\")  ' Counts all Mondays"
  },
  {
    "id": "t5_q12",
    "question": "How does WORKDAY handle fractional days (e.g. =WORKDAY(A2, 5.8))?",
    "shortAnswer": "Excel truncates (truncates towards zero) the days argument, treating 5.8 as 5.",
    "explanation": "WORKDAY does not process partial work days. Passing 5.8 evaluates identically to 5. To account for fractional hours, combine WORKDAY with TIME fractions.",
    "hint": "Days argument in WORKDAY is truncated to integer.",
    "level": "Beginner",
    "codeExample": "=WORKDAY(A2, INT(B2)) + MOD(B2, 1)"
  },
  {
    "id": "t5_q13",
    "question": "How do you find the previous working day if a given date falls on a weekend or holiday?",
    "shortAnswer": "Use =WORKDAY(date + 1, -1, holidays).",
    "explanation": "Adding 1 and stepping back 1 working day with WORKDAY(-1) guarantees that if 'date' was already a working day, it stays on that date; if it was a weekend/holiday, it rolls back to the immediate preceding Friday/workday.",
    "hint": "=WORKDAY(A2 + 1, -1, holidays)",
    "level": "Intermediate",
    "codeExample": "=WORKDAY(A2 + 1, -1, holidays)"
  },
  {
    "id": "t5_q14",
    "question": "How do you find the next upcoming working day if a date falls on a weekend?",
    "shortAnswer": "Use =WORKDAY(date - 1, 1, holidays).",
    "explanation": "Subtracting 1 and advancing 1 working day with WORKDAY(1) ensures that working days remain unchanged, while Saturday/Sunday dates roll forward to Monday.",
    "hint": "=WORKDAY(A2 - 1, 1, holidays)",
    "level": "Intermediate",
    "codeExample": "=WORKDAY(A2 - 1, 1, holidays)"
  },
  {
    "id": "t5_q15",
    "question": "How can you calculate employee payroll when wages are based strictly on working days worked in a month?",
    "shortAnswer": "Multiply daily wage rate by NETWORKDAYS.INTL(month_start, month_end, weekend_mask, holidays).",
    "explanation": "=DailyRate * NETWORKDAYS.INTL(DATE(2024, 8, 1), DATE(2024, 8, 31), \"0000001\", tblHolidays[Date]). This accurately computes gross billable days for 6-day work weeks.",
    "hint": "Multiply daily rate by NETWORKDAYS.INTL result.",
    "level": "Beginner",
    "codeExample": "=C2 * NETWORKDAYS.INTL(A2, B2, 11, tblHolidays[Date])"
  },
  {
    "id": "t5_q16",
    "question": "What is the result of NETWORKDAYS when start_date and end_date are on the same weekend day (e.g. Saturday)?",
    "shortAnswer": "It returns 0.",
    "explanation": "Because Saturday is a non-working day, zero working days exist within that single-day span.",
    "hint": "Same-day weekends return 0.",
    "level": "Beginner",
    "codeExample": "=NETWORKDAYS(DATE(2024,8,17), DATE(2024,8,17))  ' Returns 0"
  },
  {
    "id": "t5_q17",
    "question": "How do you generate a dynamic array of all working days in a month using WORKDAY and SEQUENCE in Excel 365?",
    "shortAnswer": "Combine WORKDAY with SEQUENCE equal to the month's total working days.",
    "explanation": "=LET(mStart, DATE(2024, 8, 1), mEnd, EOMONTH(mStart, 0), totalDays, NETWORKDAYS(mStart, mEnd, holidays), WORKDAY(mStart - 1, SEQUENCE(totalDays), holidays)). This spills all working calendar dates in one column.",
    "hint": "Use WORKDAY(start - 1, SEQUENCE(totalDays)).",
    "level": "Advanced",
    "codeExample": "=WORKDAY(A2 - 1, SEQUENCE(NETWORKDAYS(A2, B2, holidays)), holidays)"
  },
  {
    "id": "t5_q18",
    "question": "How do you calculate working hours (e.g. 9:00 AM to 5:00 PM) elapsed between two timestamps across multiple days?",
    "shortAnswer": "Calculate full working days with NETWORKDAYS, multiply by daily shift hours, and adjust for start/end partial day fractions.",
    "explanation": "Formula: =(NETWORKDAYS(start, end, hols) - 2) * (ShiftEnd - ShiftStart) + (ShiftEnd - MOD(start, 1)) + (MOD(end, 1) - ShiftStart). This excludes non-working nighttime hours and weekends.",
    "hint": "Calculate whole working days and add fractional start/end shift hours.",
    "level": "Expert",
    "codeExample": "=(NETWORKDAYS(A2, B2, hols) - 2) * (8/24) + (TIME(17,0,0) - MOD(A2, 1)) + (MOD(B2, 1) - TIME(9,0,0))"
  },
  {
    "id": "t5_q19",
    "question": "What is the numeric weekend parameter code for a Friday-only weekend in .INTL functions?",
    "shortAnswer": "Code 16 (or string mask \"0000100\").",
    "explanation": "Codes 11\u201317 represent single-day weekends: 11=Sunday, 12=Monday, 13=Tuesday, 14=Wednesday, 15=Thursday, 16=Friday, 17=Saturday.",
    "hint": "11=Sun, 16=Fri, 17=Sat.",
    "level": "Intermediate",
    "codeExample": "=WORKDAY.INTL(A2, 10, 16, holidays)"
  },
  {
    "id": "t5_q20",
    "question": "What happens if the holidays range contains invalid text or negative numbers?",
    "shortAnswer": "Excel throws a #VALUE! error.",
    "explanation": "All entries in the holidays parameter must be valid numeric dates or empty cells. Text strings that cannot be coerced into dates trigger #VALUE!.",
    "hint": "Ensure holiday lists contain pure Excel dates.",
    "level": "Beginner",
    "codeExample": "=IFERROR(WORKDAY(A2, 10, holidays), \"Holiday Range Error\")"
  },
  {
    "id": "t5_q21",
    "question": "How do you calculate a contract review cycle that requires 10 working days, but team members work 4-day weeks (Monday to Thursday)?",
    "shortAnswer": "Use WORKDAY.INTL with weekend mask \"0000111\" (Friday, Saturday, Sunday off).",
    "explanation": "=WORKDAY.INTL(A2, 10, \"0000111\", holidays). This advances exactly 10 working days, counting only Monday, Tuesday, Wednesday, and Thursday.",
    "hint": "Mask \"0000111\" sets a 4-day work week (Mon-Thu).",
    "level": "Intermediate",
    "codeExample": "=WORKDAY.INTL(A2, 10, \"0000111\", tblHolidays[Date])"
  },
  {
    "id": "t5_q22",
    "question": "How can you count the total number of weekend days between two dates?",
    "shortAnswer": "Subtract working days from total calendar days: =(end_date - start_date + 1) - NETWORKDAYS.INTL(start, end, \"0000011\").",
    "explanation": "Total days in the span is (end - start + 1). Subtracting the count of Monday\u2013Friday working days leaves strictly the count of weekend days.",
    "hint": "Weekend count = Total calendar days - NETWORKDAYS.",
    "level": "Intermediate",
    "codeExample": "=(B2 - A2 + 1) - NETWORKDAYS.INTL(A2, B2, \"0000011\")"
  },
  {
    "id": "t5_q23",
    "question": "How do you calculate milestone due dates when days parameter is negative (e.g. preparing filings 15 working days BEFORE deadline)?",
    "shortAnswer": "Supply a negative integer for days in WORKDAY: =WORKDAY(filing_deadline, -15, holidays).",
    "explanation": "=WORKDAY(A2, -15, holidays) steps backwards in time, skipping weekends and holidays to determine the latest date work must begin.",
    "hint": "Negative days step backwards in time.",
    "level": "Beginner",
    "codeExample": "=WORKDAY(A2, -15, tblHolidays[Date])"
  },
  {
    "id": "t5_q24",
    "question": "How does Excel handle duplicate dates in the holidays parameter?",
    "shortAnswer": "Duplicates are automatically ignored; each holiday date is deducted at most once.",
    "explanation": "If Christmas (Dec 25) appears three times in the holiday list, Excel's calculation engine deduplicates the list in memory and only deducts 1 day.",
    "hint": "Duplicate holidays in the range cause no errors.",
    "level": "Intermediate",
    "codeExample": "=NETWORKDAYS(A2, B2, holidays)"
  },
  {
    "id": "t5_q25",
    "question": "How do you calculate vendor turnaround time in working days when order timestamp and fulfillment timestamp include hours?",
    "shortAnswer": "Use INT(order_date) and INT(fulfill_date) inside NETWORKDAYS to strip time fractions.",
    "explanation": "=NETWORKDAYS(INT(A2), INT(B2), holidays). Stripping time fractions prevents partial-day rounding anomalies when comparing timestamps.",
    "hint": "Use INT(timestamp) to extract pure date integers.",
    "level": "Beginner",
    "codeExample": "=NETWORKDAYS(INT(A2), INT(B2), tblHolidays[Date])"
  },
  {
    "id": "t5_q26",
    "question": "How do you calculate the target date for a 90-day warranty that extends for non-working factory shutdown periods?",
    "shortAnswer": "Supply factory shutdown dates in the holidays parameter of WORKDAY.",
    "explanation": "=WORKDAY.INTL(A2, 90, \"0000000\", tblShutdowns[Date]). By setting weekend to \"0000000\" (7-day calendar) and passing shutdown dates as holidays, the warranty automatically extends.",
    "hint": "Pass shutdown dates into holidays parameter.",
    "level": "Advanced",
    "codeExample": "=WORKDAY.INTL(A2, 90, \"0000000\", tblShutdowns[Date])"
  },
  {
    "id": "t5_q27",
    "question": "How can you check if a specific date is a working business day using a simple boolean formula?",
    "shortAnswer": "Use =NETWORKDAYS(A2, A2, holidays) = 1.",
    "explanation": "If A2 is a working day, NETWORKDAYS(A2, A2) returns 1 (evaluating to TRUE). If A2 is a Saturday, Sunday, or listed holiday, it returns 0 (FALSE).",
    "hint": "=NETWORKDAYS(A2, A2, holidays) = 1 returns TRUE for workdays.",
    "level": "Intermediate",
    "codeExample": "=IF(NETWORKDAYS(A2, A2, holidays)=1, \"Business Day\", \"Non-Working Day\")"
  },
  {
    "id": "t5_q28",
    "question": "How do you calculate average resolution time in working days across a customer support ticket table?",
    "shortAnswer": "Use AVERAGE with NETWORKDAYS inside BYROW or array calculation.",
    "explanation": "=AVERAGE(NETWORKDAYS.INTL(tblTickets[Created], tblTickets[Resolved], 1, tblHolidays[Date])). In Excel 365, this averages working turnaround across all tickets dynamically.",
    "hint": "=AVERAGE(BYROW(tbl, LAMBDA(r, NETWORKDAYS(...))))",
    "level": "Advanced",
    "codeExample": "=AVERAGE(MAP(tblTickets[OpenDate], tblTickets[CloseDate], LAMBDA(o, c, NETWORKDAYS(o, c, holidays))))"
  },
  {
    "id": "t5_q29",
    "question": "What is the maximum date range span that NETWORKDAYS can calculate without performance degradation?",
    "shortAnswer": "NETWORKDAYS calculates hundreds of years across millions of cells in milliseconds because it uses mathematical integer division rather than looping.",
    "explanation": "Excel uses O(1) integer arithmetic for weekend counting: total weeks * 5 + remaining days. It only iterates through the small holidays array, making it exceptionally fast.",
    "hint": "NETWORKDAYS uses O(1) math for weekend calculation.",
    "level": "Advanced",
    "codeExample": "=NETWORKDAYS(DATE(2000,1,1), DATE(2099,12,31), holidays)"
  },
  {
    "id": "t5_q30",
    "question": "How do you calculate the bi-weekly payroll cutoff date (every alternate Friday) using WORKDAY.INTL?",
    "shortAnswer": "Add 10 working days on a standard 5-day schedule from the previous cutoff.",
    "explanation": "=WORKDAY(previous_cutoff, 10). Because 10 working days equals exactly two 5-day work weeks, the result lands on Friday two weeks later.",
    "hint": "=WORKDAY(prev_friday, 10)",
    "level": "Intermediate",
    "codeExample": "=WORKDAY(A2, 10)"
  }
];

export default topic5Questions;
