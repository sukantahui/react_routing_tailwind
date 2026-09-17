// Topic 4 Questions
const topic4Questions = [
  {
    "id": "t4_q1",
    "question": "How does Excel's internal date system represent dates in calculation memory?",
    "shortAnswer": "Excel stores dates as sequential positive integers starting from Day 1 = January 1, 1900.",
    "explanation": "In the standard 1900 date system: Jan 1, 1900 = 1; Jan 2, 1900 = 2; Aug 15, 2024 = 45519. Because dates are integers, date arithmetic is straightforward: subtracting two dates calculates the exact number of calendar days between them.",
    "hint": "Jan 1, 1900 = 1. Dates are simple integer counts of days.",
    "level": "Beginner",
    "codeExample": "=DATE(2024, 8, 15) - DATE(2024, 8, 1)  ' Returns 14 days"
  },
  {
    "id": "t4_q2",
    "question": "What is the famous \"1900 Leap Year Bug\" in Excel, and why does it exist?",
    "shortAnswer": "Excel incorrectly treats 1900 as a leap year (including Feb 29, 1900 = Day 60) for historical bug-compatibility with Lotus 1-2-3.",
    "explanation": "1900 was not a leap year in the Gregorian calendar. However, Lotus 1-2-3 contained a bug treating 1900 as a leap year. When Microsoft created Excel, they intentionally replicated this bug so that spreadsheets imported from Lotus would produce identical date serial numbers.",
    "hint": "Excel treats 1900 as a leap year for Lotus 1-2-3 compatibility.",
    "level": "Intermediate",
    "codeExample": "=DATE(1900, 2, 29)  ' Returns valid serial 60 in Excel"
  },
  {
    "id": "t4_q3",
    "question": "How does the DATE function handle rollover values (e.g. Month = 13 or Day = 32)?",
    "shortAnswer": "DATE automatically recalculates and rolls over excess months into years and excess days into months.",
    "explanation": "Syntax: =DATE(year, month, day). If you enter =DATE(2024, 13, 1), Excel rolls 13 months into 1 year + 1 month, returning January 1, 2025. If you enter =DATE(2024, 1, 32), it rolls over into February 1, 2024. This makes DATE ideal for date arithmetic.",
    "hint": "DATE(2024, 13, 1) rolls over to Jan 1, 2025.",
    "level": "Intermediate",
    "codeExample": "=DATE(2024, MONTH(TODAY()) + 3, DAY(TODAY()))  ' 3 months in future"
  },
  {
    "id": "t4_q4",
    "question": "How do you calculate the last day of the current month using the DATE function?",
    "shortAnswer": "Set month to the next month and day to 0: =DATE(YEAR(A2), MONTH(A2) + 1, 0).",
    "explanation": "Day 0 of any month represents the day before Day 1, which is the last day of the previous month. Therefore, =DATE(2024, 3, 0) returns February 29, 2024 (the last day of February in a leap year).",
    "hint": "Day 0 of Month M+1 is the last day of Month M.",
    "level": "Intermediate",
    "codeExample": "=DATE(YEAR(TODAY()), MONTH(TODAY()) + 1, 0)"
  },
  {
    "id": "t4_q5",
    "question": "What is the difference between TODAY() and NOW() in Excel?",
    "shortAnswer": "TODAY() returns the current date serial integer (without time fraction); NOW() returns the current date and time as a decimal float.",
    "explanation": "Both are volatile functions that recalculate whenever any sheet calculates. TODAY() returns an integer (e.g. 45519.0), while NOW() includes the fractional time of day (e.g. 45519.625 for 3:00 PM).",
    "hint": "TODAY() = Date integer; NOW() = Date + Time float.",
    "level": "Beginner",
    "codeExample": "=TODAY()  ' Date only\n=NOW()    ' Date and Time"
  },
  {
    "id": "t4_q6",
    "question": "How do you extract the year, month, and day components from a date cell?",
    "shortAnswer": "Use =YEAR(cell), =MONTH(cell), and =DAY(cell).",
    "explanation": "YEAR(A2) returns the 4-digit year (e.g. 2024); MONTH(A2) returns integer 1\u201312; DAY(A2) returns integer 1\u201331. These functions extract date components for custom grouping and cohort modeling.",
    "hint": "Use YEAR(), MONTH(), and DAY().",
    "level": "Beginner",
    "codeExample": "=YEAR(A2) & \"-M\" & TEXT(MONTH(A2), \"00\")"
  },
  {
    "id": "t4_q7",
    "question": "What is the 1904 Date System in Excel, and where is it used?",
    "shortAnswer": "An alternate date system where Day 0 = January 1, 1904, originally used on Mac Excel to prevent the 1900 leap year bug.",
    "explanation": "If a workbook is switched to the 1904 date system (File > Options > Advanced > Use 1904 date system), all existing date serials shift by 4 years and 1 day (1,462 days). Today, it is mainly used to allow display of negative time values.",
    "hint": "1904 system shifts dates by 1,462 days.",
    "level": "Advanced",
    "codeExample": "' 1900 system: Day 1 = Jan 1, 1900 vs 1904 system: Day 0 = Jan 1, 1904"
  },
  {
    "id": "t4_q8",
    "question": "How do you calculate a person's exact age in completed years from their date of birth?",
    "shortAnswer": "Use DATEDIF(dob, TODAY(), \"Y\") or INT(YEARFRAC(dob, TODAY(), 1)).",
    "explanation": "=DATEDIF(A2, TODAY(), \"Y\") calculates complete elapsed calendar years between birthdate and today, accurately accounting for leap years and anniversary dates.",
    "hint": "=DATEDIF(DOB, TODAY(), \"Y\") computes exact completed age.",
    "level": "Beginner",
    "codeExample": "=DATEDIF(tblStaff[DOB], TODAY(), \"Y\")"
  },
  {
    "id": "t4_q9",
    "question": "Why does entering a 2-digit year like \"24\" sometimes convert to \"1924\" instead of \"2024\"?",
    "shortAnswer": "Excel uses a 20th/21st century rollover cutoff (by default, years 00\u201329 map to 2000\u20132029; years 30\u201399 map to 1930\u20131999).",
    "explanation": "To avoid ambiguity, always author 4-digit years. When entering 2-digit years, Windows regional settings define the 100-year window (typically 1930 to 2029). Entering '35' becomes 1935, while '24' becomes 2024.",
    "hint": "Always use explicit 4-digit years in data entry.",
    "level": "Intermediate",
    "codeExample": "=DATE(2024, 8, 15)  ' Explicit 4-digit year"
  },
  {
    "id": "t4_q10",
    "question": "How do you add exactly 6 months to a date while handling month-end edge cases (e.g. Aug 31 + 6 months)?",
    "shortAnswer": "Use the EDATE function: =EDATE(A2, 6).",
    "explanation": "=EDATE(start_date, months) adds or subtracts months and automatically clamps the day to the last valid day of the target month (e.g. Aug 31 + 6 months becomes Feb 28 or Feb 29 in leap years).",
    "hint": "Use EDATE(date, N) for safe month addition.",
    "level": "Beginner",
    "codeExample": "=EDATE(A2, 6)  ' Adds 6 months"
  },
  {
    "id": "t4_q11",
    "question": "What is the purpose of the EOMONTH function, and how is it used in financial amortization schedules?",
    "shortAnswer": "EOMONTH returns the serial date of the last day of the month N months before or after a start date.",
    "explanation": "Syntax: =EOMONTH(start_date, months). =EOMONTH(A2, 0) returns the last day of the current month. =EOMONTH(A2, 1) returns the last day of next month. It is widely used in debt schedules and billing cycles.",
    "hint": "EOMONTH(date, 0) = Last day of current month.",
    "level": "Beginner",
    "codeExample": "=EOMONTH(A2, 0)  ' Current month-end date"
  },
  {
    "id": "t4_q12",
    "question": "How can you determine whether a given year is a Leap Year using an Excel formula?",
    "shortAnswer": "Check if February has 29 days: =DAY(DATE(year, 2, 29)) = 29.",
    "explanation": "If the year is a leap year, DATE(year, 2, 29) stays in February and DAY() returns 29. If not, it rolls over to March 1, and DAY() returns 1. =MONTH(DATE(year, 2, 29))=2 returns TRUE for leap years.",
    "hint": "=MONTH(DATE(year, 2, 29)) = 2 returns TRUE for leap years.",
    "level": "Intermediate",
    "codeExample": "=MONTH(DATE(A2, 2, 29)) = 2"
  },
  {
    "id": "t4_q13",
    "question": "How do you calculate the first day of the current year dynamically?",
    "shortAnswer": "Use =DATE(YEAR(TODAY()), 1, 1).",
    "explanation": "YEAR(TODAY()) extracts the current 4-digit year, and DATE(year, 1, 1) returns January 1 of that year.",
    "hint": "=DATE(YEAR(TODAY()), 1, 1)",
    "level": "Beginner",
    "codeExample": "=DATE(YEAR(TODAY()), 1, 1)"
  },
  {
    "id": "t4_q14",
    "question": "What happens if you enter a negative date serial number (e.g. -5) in the standard 1900 date system?",
    "shortAnswer": "Excel displays a string of hash symbols (######) and cannot render negative date serials visually.",
    "explanation": "In the 1900 system, dates prior to Jan 1, 1900 are unsupported and render as '######' across the cell width. The formula will still hold the negative number in calculation memory.",
    "hint": "1900 system cannot display negative dates (shows ######).",
    "level": "Intermediate",
    "codeExample": "' Format as General to see the raw negative number"
  },
  {
    "id": "t4_q15",
    "question": "How do you generate a continuous sequence of 365 calendar dates starting from Jan 1, 2024 using dynamic arrays?",
    "shortAnswer": "Use the SEQUENCE function: =SEQUENCE(365, 1, DATE(2024, 1, 1), 1).",
    "explanation": "In Excel 365, =SEQUENCE(rows, [cols], [start], [step]) generates an array of numbers. Setting start to DATE(2024, 1, 1) and step to 1 spills 365 consecutive calendar dates instantly.",
    "hint": "=SEQUENCE(365, 1, DATE(2024, 1, 1), 1)",
    "level": "Intermediate",
    "codeExample": "=SEQUENCE(365, 1, DATE(2024, 1, 1), 1)"
  },
  {
    "id": "t4_q16",
    "question": "How do you convert text dates formatted as \"YYYYMMDD\" (e.g. \"20240815\") into real Excel dates?",
    "shortAnswer": "Use DATE combined with MID, LEFT, and RIGHT: =DATE(LEFT(A2,4), MID(A2,5,2), RIGHT(A2,2)).",
    "explanation": "LEFT(A2,4) extracts \"2024\", MID(A2,5,2) extracts \"08\", and RIGHT(A2,2) extracts \"15\". The DATE function combines them into a valid serial date.",
    "hint": "=DATE(LEFT(A2, 4), MID(A2, 5, 2), RIGHT(A2, 2))",
    "level": "Beginner",
    "codeExample": "=DATE(LEFT(A2, 4), MID(A2, 5, 2), RIGHT(A2, 2))"
  },
  {
    "id": "t4_q17",
    "question": "How can you find what day of the week a date falls on (e.g. 1 for Sunday, 7 for Saturday)?",
    "shortAnswer": "Use the WEEKDAY function: =WEEKDAY(date, [return_type]).",
    "explanation": "Syntax: =WEEKDAY(serial_number, [return_type]). Type 1 (default): Sunday=1 to Saturday=7. Type 2: Monday=1 to Sunday=7. Type 3: Monday=0 to Sunday=6.",
    "hint": "Use return_type = 2 for Monday = 1 through Sunday = 7.",
    "level": "Beginner",
    "codeExample": "=WEEKDAY(A2, 2)  ' 1=Mon, 2=Tue... 7=Sun"
  },
  {
    "id": "t4_q18",
    "question": "How do you calculate the ISO week number of a date in Excel?",
    "shortAnswer": "Use the ISOWEEKNUM function: =ISOWEEKNUM(date).",
    "explanation": "ISO 8601 standardizes week numbers where Week 1 is the week containing the first Thursday of the year, starting on Monday. =ISOWEEKNUM(A2) complies strictly with international manufacturing and supply chain standards.",
    "hint": "Use ISOWEEKNUM(date) for ISO 8601 week numbers.",
    "level": "Intermediate",
    "codeExample": "=ISOWEEKNUM(A2)"
  },
  {
    "id": "t4_q19",
    "question": "Why should you avoid using TODAY() in thousands of formula cells in large enterprise financial models?",
    "shortAnswer": "TODAY() is a volatile function that forces the entire workbook calculation dependency chain to recalculate on every single user keystroke.",
    "explanation": "Volatile functions (TODAY, NOW, OFFSET, INDIRECT) invalidate Excel's smart calculation engine cache. In large models with 50,000 rows, enter =TODAY() once in a dedicated assumptions cell (e.g. 'Model_Date' in Z1) and reference $Z$1 across formulas.",
    "hint": "Store TODAY() in one dedicated cell to avoid calculation lag.",
    "level": "Advanced",
    "codeExample": "=tblSales[Date] <= $Z$1  ' Where Z1 contains =TODAY()"
  },
  {
    "id": "t4_q20",
    "question": "How do you calculate the Nth specific weekday of a month (e.g. the 2nd Tuesday of November 2024)?",
    "shortAnswer": "Calculate the 1st of the month, offset to the target weekday, and add (N-1)*7 days.",
    "explanation": "=DATE(year, month, 1) + MOD(target_weekday - WEEKDAY(DATE(year, month, 1), 2), 7) + (N - 1) * 7. This universal formula finds Thanksgiving, election dates, and board meetings.",
    "hint": "Offset from 1st of month using MOD on WEEKDAY.",
    "level": "Expert",
    "codeExample": "=DATE(2024, 11, 1) + MOD(2 - WEEKDAY(DATE(2024, 11, 1), 2), 7) + 7  ' 2nd Tuesday"
  },
  {
    "id": "t4_q21",
    "question": "How do you extract the fiscal year for an organization whose fiscal year begins on April 1 (e.g. Indian FY)?",
    "shortAnswer": "If Month >= 4, FY = Year + 1; otherwise FY = Year.",
    "explanation": "Formula: =IF(MONTH(A2)>=4, \"FY \" & YEAR(A2) & \"-\" & RIGHT(YEAR(A2)+1, 2), \"FY \" & YEAR(A2)-1 & \"-\" & RIGHT(YEAR(A2), 2)). For August 2024, it returns 'FY 2024-25'.",
    "hint": "Check IF(MONTH(date) >= 4, Year+1, Year).",
    "level": "Intermediate",
    "codeExample": "=\"FY \" & IF(MONTH(A2)>=4, YEAR(A2) & \"-\" & RIGHT(YEAR(A2)+1, 2), YEAR(A2)-1 & \"-\" & RIGHT(YEAR(A2), 2))"
  },
  {
    "id": "t4_q22",
    "question": "How do you calculate the number of days remaining until the end of the current quarter?",
    "shortAnswer": "Subtract TODAY() from the quarter-end date computed via EOMONTH.",
    "explanation": "=EOMONTH(TODAY(), 3 - MOD(MONTH(TODAY()) - 1, 3) - 1) - TODAY(). This finds the last day of the current 3-month quarter block and subtracts today's date.",
    "hint": "Subtract TODAY() from the computed quarter-end date.",
    "level": "Advanced",
    "codeExample": "=EOMONTH(DATE(YEAR(TODAY()), ROUNDUP(MONTH(TODAY())/3, 0)*3, 1), 0) - TODAY()"
  },
  {
    "id": "t4_q23",
    "question": "How do you check if a date falls on a weekend (Saturday or Sunday) in Excel?",
    "shortAnswer": "Use =WEEKDAY(A2, 2) >= 6.",
    "explanation": "Using return_type 2 (where Mon=1...Sat=6, Sun=7), any value >= 6 is a weekend. This is ideal for Conditional Formatting rules highlighting weekends.",
    "hint": "=WEEKDAY(A2, 2) >= 6 identifies Saturday and Sunday.",
    "level": "Beginner",
    "codeExample": "=IF(WEEKDAY(A2, 2)>=6, \"Weekend\", \"Workday\")"
  },
  {
    "id": "t4_q24",
    "question": "How do you convert Unix epoch timestamps (seconds since Jan 1, 1970) into Excel dates?",
    "shortAnswer": "Divide timestamp by 86,400 (seconds in a day) and add DATE(1970, 1, 1).",
    "explanation": "Formula: =(UnixTimestamp / 86400) + DATE(1970, 1, 1). For millisecond timestamps, divide by 86,400,000.",
    "hint": "Formula: =(A2 / 86400) + DATE(1970, 1, 1)",
    "level": "Intermediate",
    "codeExample": "=(A2 / 86400) + DATE(1970, 1, 1)"
  },
  {
    "id": "t4_q25",
    "question": "How do you calculate the Monday of the current week for weekly tracking dashboards?",
    "shortAnswer": "Subtract the day of the week offset: =TODAY() - WEEKDAY(TODAY(), 2) + 1.",
    "explanation": "WEEKDAY(TODAY(), 2) returns 1 for Monday, 2 for Tuesday... 7 for Sunday. Subtracting this and adding 1 rolls back to Monday of the current week.",
    "hint": "=TODAY() - WEEKDAY(TODAY(), 2) + 1",
    "level": "Intermediate",
    "codeExample": "=TODAY() - WEEKDAY(TODAY(), 2) + 1"
  },
  {
    "id": "t4_q26",
    "question": "How do you calculate the Friday of the current week?",
    "shortAnswer": "Use =TODAY() - WEEKDAY(TODAY(), 2) + 5.",
    "explanation": "Starting from Monday (+1), Friday is 4 days later (+5).",
    "hint": "=TODAY() - WEEKDAY(TODAY(), 2) + 5",
    "level": "Beginner",
    "codeExample": "=TODAY() - WEEKDAY(TODAY(), 2) + 5"
  },
  {
    "id": "t4_q27",
    "question": "What is the maximum date serial number supported in Excel?",
    "shortAnswer": "2,958,465 (representing December 31, 9999).",
    "explanation": "Excel dates cannot exceed December 31, 9999. Entering any date beyond year 9999 causes #VALUE! errors.",
    "hint": "Max date is December 31, 9999.",
    "level": "Advanced",
    "codeExample": "=DATE(9999, 12, 31)  ' Serial 2958465"
  },
  {
    "id": "t4_q28",
    "question": "How do you calculate how many days are in a specific month of any given year?",
    "shortAnswer": "Use =DAY(EOMONTH(DATE(year, month, 1), 0)).",
    "explanation": "EOMONTH finds the last day of the month, and DAY() extracts that day number (28, 29, 30, or 31), automatically handling leap years.",
    "hint": "=DAY(EOMONTH(DATE(year, month, 1), 0))",
    "level": "Intermediate",
    "codeExample": "=DAY(EOMONTH(DATE(A2, B2, 1), 0))"
  },
  {
    "id": "t4_q29",
    "question": "How do you safely parse dates entered in mixed international formats (DD/MM/YYYY vs MM/DD/YYYY)?",
    "shortAnswer": "Use Power Query locale transformation or parse explicit substrings with DATE.",
    "explanation": "If dates are imported as text, Excel's regional settings may flip day and month. Power Query's 'Using Locale' feature guarantees unambiguous parsing.",
    "hint": "Use Power Query 'Change Type with Locale' for ambiguous dates.",
    "level": "Advanced",
    "codeExample": "' Power Query: Table.TransformColumnTypes(tbl, {{\"Date\", type date}}, \"en-GB\")"
  },
  {
    "id": "t4_q30",
    "question": "How do you construct a dynamic cohort date matrix for SaaS retention analysis?",
    "shortAnswer": "Combine EOMONTH, SEQUENCE, and EDATE into dynamic spill arrays.",
    "explanation": "=EDATE(DATE(2024, 1, 1), SEQUENCE(1, 12, 0, 1)) generates a 12-month horizontal header ribbon of cohort milestone dates in a single spilled formula.",
    "hint": "=EDATE(start_date, SEQUENCE(1, 12, 0, 1))",
    "level": "Expert",
    "codeExample": "=EDATE(DATE(2024, 1, 1), SEQUENCE(1, 12, 0, 1))"
  }
];

export default topic4Questions;
