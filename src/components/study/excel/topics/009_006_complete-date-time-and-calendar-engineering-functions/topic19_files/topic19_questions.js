const questions = [
  {
    question: "What is the primary purpose of the DATEDIF function in Excel?",
    options: [
      "It calculates the difference between two dates in specified interval units such as completed years, months, or days",
      "It checks whether a date format is valid and converts it to text",
      "It adds a specific number of workdays to a given starting date",
      "It calculates the fractional year using financial day-count conventions"
    ],
    correctAnswer: 0,
    explanation: "DATEDIF(start_date, end_date, unit) computes the elapsed time between two dates in full completed years ('Y'), months ('M'), days ('D'), or remaining modular intervals ('YM', 'YD', 'MD')."
  },
  {
    question: "What are the three required arguments of the DATEDIF function in proper sequence?",
    options: [
      "=DATEDIF(start_date, end_date, unit)",
      "=DATEDIF(end_date, start_date, unit)",
      "=DATEDIF(unit, start_date, end_date)",
      "=DATEDIF(date, interval, format)"
    ],
    correctAnswer: 0,
    explanation: "The correct syntax is =DATEDIF(start_date, end_date, unit). The start_date must precede or equal end_date, followed by a valid text unit string."
  },
  {
    question: "Why does DATEDIF not appear in Excel's Formula AutoComplete / IntelliSense suggestions when typing =DATE...?",
    options: [
      "It is an undocumented legacy compatibility function preserved from Lotus 1-2-3, retained for backwards compatibility without official IntelliSense listing",
      "It was deprecated in Excel 2013 and is no longer supported",
      "It is an add-in function that requires the Analysis ToolPak to be activated",
      "It only works in Office Scripts and VBA, not native Excel worksheet cells"
    ],
    correctAnswer: 0,
    explanation: "Microsoft originally included DATEDIF to ensure complete compatibility with spreadsheets migrated from Lotus 1-2-3. Because of historical licensing and known edge cases, Microsoft keeps it undocumented and unlisted in formula autocompletion, but it functions natively across all modern Excel versions."
  },
  {
    question: "What does the unit code 'Y' return in =DATEDIF(start_date, end_date, 'Y')?",
    options: [
      "The total number of complete, fully elapsed calendar years between the two dates",
      "The year number of the start date (e.g., 2026)",
      "The fractional years with decimal precision",
      "The total number of months divided by 12 with remainder"
    ],
    correctAnswer: 0,
    explanation: "Unit 'Y' counts the number of full, completed years between start_date and end_date. If an anniversary has not yet been reached, the year is not counted."
  },
  {
    question: "What does the unit code 'M' return in =DATEDIF(start_date, end_date, 'M')?",
    options: [
      "The total number of complete, fully elapsed calendar months between the two dates",
      "The month number of the end date (1 to 12)",
      "The remaining months after subtracting full years",
      "The average monthly calendar delta based on 30.4 days per month"
    ],
    correctAnswer: 0,
    explanation: "Unit 'M' returns the total count of completed whole calendar months between the two dates across all elapsed years."
  },
  {
    question: "What does the unit code 'D' return in =DATEDIF(start_date, end_date, 'D')?",
    options: [
      "The total number of calendar days between start_date and end_date (equivalent to end_date - start_date)",
      "The day of the week (1 for Sunday, 7 for Saturday)",
      "The day number of the month (1 to 31)",
      "The business working days excluding weekends"
    ],
    correctAnswer: 0,
    explanation: "Unit 'D' calculates the total number of full elapsed calendar days between the two dates, which produces identical results to simple subtraction =end_date - start_date."
  },
  {
    question: "What does the modular unit code 'YM' compute in DATEDIF?",
    options: [
      "The remaining completed months between the dates as if they were in the same year (ignoring the year component)",
      "The total months multiplied by the year",
      "The month difference including fractional days",
      "The number of years remaining until the next full decade"
    ],
    correctAnswer: 0,
    explanation: "'YM' returns the remaining months after full years have been subtracted, evaluating the interval 0 to 11 months. It is used in human age strings (e.g., 5 years and 4 months)."
  },
  {
    question: "What does the modular unit code 'YD' compute in DATEDIF?",
    options: [
      "The remaining days between the dates as if they were in the same calendar year (ignoring full elapsed years)",
      "The total days divided by 365",
      "The day of the year from 1 to 366",
      "The remaining days after full months have been deducted"
    ],
    correctAnswer: 0,
    explanation: "'YD' calculates the day delta between the start and end dates ignoring the year portion, simulating both dates falling within the same 12-month calendar cycle."
  },
  {
    question: "What does the unit code 'MD' calculate in DATEDIF?",
    options: [
      "The difference between the days in start_date and end_date, ignoring both months and years",
      "The maximum days possible in the given month",
      "The median day of the elapsed period",
      "The month-to-date elapsed working days"
    ],
    correctAnswer: 0,
    explanation: "'MD' computes the difference between day-of-month values, ignoring elapsed full months and full years. It is traditionally used to calculate the remaining 'days' portion of an age."
  },
  {
    question: "What is the well-documented Microsoft warning and bug regarding the 'MD' unit in DATEDIF?",
    options: [
      "It can return inaccurate results, negative numbers, or zero when comparing dates across months with differing day counts (such as January 31 to March 1)",
      "It causes Excel to crash on 64-bit operating systems",
      "It cannot be combined with the & concatenation operator",
      "It only functions properly during leap years"
    ],
    correctAnswer: 0,
    explanation: "Microsoft officially documents that the 'MD' argument may calculate a negative number, a zero, or an inaccurate result because month lengths vary (28, 29, 30, or 31 days). Modern Excel developers use an EDATE-based formula instead."
  },
  {
    question: "Which robust formula provides a bulletproof, mathematically sound replacement for =DATEDIF(start, end, 'MD') to avoid the known 'MD' bug?",
    options: [
      "=end_date - EDATE(start_date, DATEDIF(start_date, end_date, 'M'))",
      "=DATEDIF(start_date, end_date, 'D') - 30",
      "=DAY(end_date) - DAY(start_date)",
      "=MOD(end_date - start_date, 365)"
    ],
    correctAnswer: 0,
    explanation: "By taking the start_date, advancing it by all completed months using EDATE(start_date, DATEDIF(start_date, end_date, 'M')), and subtracting that milestone from end_date, you get the exact remaining days without any month-length distortion."
  },
  {
    question: "What error does DATEDIF return if start_date is chronologically later than end_date (e.g., =DATEDIF('2026-12-01', '2026-01-01', 'Y'))?",
    options: [
      "#NUM!",
      "#VALUE!",
      "#N/A",
      "Negative number (e.g., -1)"
    ],
    correctAnswer: 0,
    explanation: "DATEDIF requires start_date <= end_date. If start_date > end_date, Excel triggers a #NUM! numeric error."
  },
  {
    question: "What error does DATEDIF return if an invalid or unsupported unit code such as 'W' (for weeks) or 'H' (for hours) is supplied?",
    options: [
      "#NUM!",
      "#VALUE!",
      "#REF!",
      "#NAME?"
    ],
    correctAnswer: 0,
    explanation: "Providing any unit other than the six valid strings ('Y', 'M', 'D', 'YM', 'YD', 'MD') causes DATEDIF to return a #NUM! error."
  },
  {
    question: "What error does DATEDIF return if an argument cannot be recognized as a valid date (e.g., text 'N/A' or invalid punctuation)?",
    options: [
      "#VALUE!",
      "#NUM!",
      "#NULL!",
      "#DIV/0!"
    ],
    correctAnswer: 0,
    explanation: "If either start_date or end_date cannot be coerced into a valid Excel serial date, Excel returns the standard #VALUE! data type error."
  },
  {
    question: "How can you construct a dynamic formula in Excel that outputs a complete human-readable age such as '28 Years, 4 Months, 12 Days'?",
    options: [
      '=DATEDIF(B2, TODAY(), "Y") & " Years, " & DATEDIF(B2, TODAY(), "YM") & " Months, " & DATEDIF(B2, TODAY(), "MD") & " Days"',
      '=YEAR(TODAY()-B2) & " Years, " & MONTH(TODAY()-B2) & " Months, " & DAY(TODAY()-B2) & " Days"',
      '=TEXT(TODAY()-B2, "yy ""Years,"" mm ""Months,"" dd ""Days""")',
      '=DATEDIF(B2, TODAY(), "YMD")'
    ],
    correctAnswer: 0,
    explanation: "Concatenating DATEDIF with unit 'Y' for full years, 'YM' for remaining months, and 'MD' (or the EDATE delta) for remaining days creates the standard HR age and service tenure string."
  },
  {
    question: "Are the interval unit strings in DATEDIF case-sensitive in Excel formulas?",
    options: [
      "No, DATEDIF treats 'y' and 'Y', 'm' and 'M', etc., completely identically",
      "Yes, lowercase letters throw a #VALUE! error",
      "Yes, lowercase letters return fractional values",
      "Only on Excel for Mac and Excel for the Web"
    ],
    correctAnswer: 0,
    explanation: "Excel formula evaluation is case-insensitive for text unit codes in DATEDIF; both 'y' and 'Y', 'ym' and 'YM', etc., work interchangeably."
  },
  {
    question: "If an employee joins an organization on 15-Jan-2020 and resigns on 14-Jan-2025, what will =DATEDIF(join_date, resign_date, 'Y') return?",
    options: [
      "4",
      "5",
      "4.99",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "DATEDIF only counts completed anniversaries. Because 14-Jan-2025 is exactly one day before the 5th anniversary (15-Jan-2025), only 4 full years have elapsed."
  },
  {
    question: "Under the Indian Payment of Gratuity Act 1972, an employee is eligible for gratuity upon completing 5 years of continuous service. Which logical formula accurately verifies eligibility for an employee with joining date in cell C5?",
    options: [
      '=IF(DATEDIF(C5, TODAY(), "Y") >= 5, "Eligible", "Not Eligible")',
      '=IF((TODAY() - C5) / 365 >= 5, "Eligible", "Not Eligible")',
      '=IF(YEAR(TODAY()) - YEAR(C5) >= 5, "Eligible", "Not Eligible")',
      '=IF(DATEDIF(C5, TODAY(), "M") >= 50, "Eligible", "Not Eligible")'
    ],
    correctAnswer: 0,
    explanation: "DATEDIF(C5, TODAY(), 'Y') strictly checks whether the employee has reached their 5th work anniversary, avoiding false positives caused by leap-year drift or month subtractions."
  },
  {
    question: "Why is =YEAR(TODAY()) - YEAR(DOB) considered an incorrect way to calculate a person's age?",
    options: [
      "It only subtracts the year integers and ignores whether the person's birthday has actually occurred in the current year, often overstating age by 1 year",
      "It returns a negative number for anyone born before 1900",
      "The YEAR function cannot accept cell references",
      "It calculates age in 360-day commercial calendar years"
    ],
    correctAnswer: 0,
    explanation: "If today is 12-Nov-2026 and someone was born on 25-Dec-2000, 2026 - 2000 gives 26, but their 26th birthday is still over a month away (actual age is 25). DATEDIF correctly returns 25."
  },
  {
    question: "How does DATEDIF handle date inputs that contain time components (e.g., 2026-05-10 16:45)?",
    options: [
      "DATEDIF effectively truncates or evaluates based on the date serial, but time fractional values may affect exact day completion calculations",
      "It converts the time into minutes and divides by 1440",
      "It throws a #VALUE! error whenever a timestamp is present",
      "It automatically rounds the timestamp to the nearest midnight before processing"
    ],
    correctAnswer: 0,
    explanation: "Dates in Excel are stored as serial numbers where the integer is the date and the decimal fraction is the time. If start_date has a larger time fraction than end_date, a full 24-hour day may not be counted as complete, which can alter the day count. Wrapping inputs in INT() removes time fractions."
  },
  {
    question: "What is the result of =DATEDIF('2026-01-31', '2026-02-28', 'M')?",
    options: [
      "0",
      "1",
      "#NUM!",
      "0.9"
    ],
    correctAnswer: 0,
    explanation: "In a non-leap year, January 31 to February 28 has not reached the 31st of the subsequent month. Because one full month from Jan 31 is considered Feb 28/March 1 depending on calendar convention, DATEDIF counts complete month cycles from matching day-of-month (31 to 31), returning 0 full completed months."
  },
  {
    question: "What is the result of =DATEDIF('2026-01-31', '2026-03-01', 'M')?",
    options: [
      "1",
      "2",
      "0",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "By March 1, the end of February has been completely crossed, completing 1 full month cycle from January 31."
  },
  {
    question: "How can you calculate the exact number of completed weeks between two dates using DATEDIF?",
    options: [
      "=INT(DATEDIF(start_date, end_date, 'D') / 7)",
      "=DATEDIF(start_date, end_date, 'W')",
      "=WEEKNUM(end_date) - WEEKNUM(start_date)",
      "=ROUND(DATEDIF(start_date, end_date, 'D') / 7, 0)"
    ],
    correctAnswer: 0,
    explanation: "Because 'W' is not a valid unit in DATEDIF, you calculate total elapsed days using DATEDIF(start, end, 'D') and divide by 7 with INT() to get completed weeks."
  },
  {
    question: "How does DATEDIF differ fundamentally from the YEARFRAC function?",
    options: [
      "DATEDIF returns an integer count of completed periods, whereas YEARFRAC returns a fractional decimal representing proportional year progress based on day-count basis",
      "DATEDIF only works on dates after 2000, whereas YEARFRAC supports all historical dates",
      "YEARFRAC ignores leap years while DATEDIF accounts for them",
      "DATEDIF is a volatile function that recalculates on every keystroke"
    ],
    correctAnswer: 0,
    explanation: "DATEDIF(A1, B1, 'Y') outputs whole completed integers (e.g., 2), while YEARFRAC(A1, B1) outputs exact fractional progress (e.g., 2.7482) using financial conventions such as Actual/Actual or 30/360."
  },
  {
    question: "How can you prevent a formula using DATEDIF from displaying a #NUM! error when a start_date in cell A2 might be in the future relative to B2?",
    options: [
      "=IF(A2 <= B2, DATEDIF(A2, B2, 'Y'), 0)",
      "=IFERROR(DATEDIF(A2, B2, 'Y'), 0)",
      "Both A and B are effective defense patterns",
      "=ABS(DATEDIF(A2, B2, 'Y'))"
    ],
    correctAnswer: 2,
    explanation: "Both checking if start_date <= end_date beforehand and wrapping the formula in IFERROR() provide clean protection against the #NUM! error."
  },
  {
    question: "Can the unit argument of DATEDIF be supplied through a dynamic cell reference (e.g., cell C1 containing the text 'YM')?",
    options: [
      "Yes, =DATEDIF(A2, B2, C1) works perfectly as long as cell C1 contains a valid unit string",
      "No, unit strings must always be hardcoded in quotes inside the formula",
      "Only if wrapped in the INDIRECT() function",
      "Only if the cell is formatted as Text"
    ],
    correctAnswer: 0,
    explanation: "The unit argument can be any expression or cell reference that evaluates to one of the six recognized text strings."
  },
  {
    question: "If an employee's Date of Birth is in cell B2, which formula accurately determines their superannuation retirement date at age 60 on the last day of their birthday month?",
    options: [
      "=EOMONTH(EDATE(B2, 60 * 12), 0)",
      "=EDATE(B2, 60 * 12)",
      "=DATE(YEAR(B2) + 60, MONTH(B2), DAY(B2))",
      "=DATEDIF(B2, TODAY(), 'Y') + 60"
    ],
    correctAnswer: 0,
    explanation: "EDATE(B2, 720) advances exactly 60 years (720 months), and wrapping it in EOMONTH(..., 0) shifts it to the final calendar day of that retirement month as per corporate superannuation policies."
  },
  {
    question: "What is the result of =DATEDIF('2024-02-29', '2025-02-28', 'Y') across a leap year into a non-leap year?",
    options: [
      "0 (because Feb 29 does not occur in 2025, Excel requires matching to the 28th/March 1)",
      "1 (because one calendar year has elapsed)",
      "#NUM! error",
      "#VALUE! error"
    ],
    correctAnswer: 0,
    explanation: "In Excel's Lotus 1-2-3 logic, starting on Feb 29 means a full year is only completed when reaching the exact same day in the next year or March 1; Feb 28, 2025 returns 0 full completed years, whereas March 1, 2025 returns 1."
  },
  {
    question: "In IT service management (ITSM), how is DATEDIF used to track SLA resolution aging in days and hours?",
    options: [
      "DATEDIF(open_date, close_date, 'D') provides completed days, while the decimal time delta multiplied by 24 provides remaining hours",
      "DATEDIF natively calculates working hours using unit 'H'",
      "DATEDIF automatically subtracts company holiday calendars",
      "ITSM software disallows the use of DATEDIF"
    ],
    correctAnswer: 0,
    explanation: "DATEDIF is frequently combined with time arithmetic (e.g., MOD(end_date - start_date, 1) * 24) to create clean SLA turnaround reports such as '3 Days, 5 Hours'."
  },
  {
    question: "Why should developers and financial analysts avoid dividing elapsed days by 365.25 (e.g., =(end-start)/365.25) when calculating legal human age?",
    options: [
      "Because calendar years vary between 365 and 366 days, average decimal division causes birthdays to be celebrated on the wrong calendar day depending on leap cycles",
      "Because 365.25 produces a circular reference error in Excel",
      "Because Excel date serial numbers reset every century",
      "Because labor laws mandate 360-day European counting"
    ],
    correctAnswer: 0,
    explanation: "A person turns 18 on their legal birthday, not when 6,574.5 days have elapsed. Depending on how many leap years occurred during their lifetime, dividing by 365.25 can miscalculate age by days or weeks. DATEDIF evaluates true calendar anniversaries."
  }
];

export default questions;

