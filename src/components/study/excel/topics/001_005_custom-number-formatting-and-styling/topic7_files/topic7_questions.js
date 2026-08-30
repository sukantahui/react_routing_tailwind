// topic7_files/topic7_questions.js - 30 Comprehensive Mastery Questions
// Topic 7: Date & Time Custom Formatting: Dates, Times, Quarters, Weekdays, and Dynamic Period Labels
// Module: 001_005_custom-number-formatting-and-styling

const questions = [
  {
    question: "What does the date format code 'dddd, mmmm dd, yyyy' display for the serial date number 46261 (which corresponds to August 27, 2026)?",
    shortAnswer: "Thursday, August 27, 2026",
    explanation: "The token 'dddd' produces the full weekday name ('Thursday'), 'mmmm' produces the full month name ('August'), 'dd' produces the two-digit day ('27'), and 'yyyy' produces the four-digit year ('2026').",
    hint: "Four 'd' tokens give full weekday; four 'm' tokens give full month.",
    level: "basic",
    codeExample: 'dddd, mmmm dd, yyyy -> "Thursday, August 27, 2026"'
  },
  {
    question: "How does Excel differentiate between 'm' representing Month versus 'm' representing Minute in a custom format string?",
    shortAnswer: "Contextual positioning: 'm' represents Minute when immediately following an hour token (h or hh) or preceding a second token (s or ss); otherwise it represents Month.",
    explanation: "Excel evaluates the format string contextually. In 'hh:mm:ss', 'mm' is minutes because it follows 'hh'. In 'yyyy-mm-dd', 'mm' is months because it is paired with year and day tokens.",
    hint: "Look at adjacent tokens: if next to hour (h) or second (s), it means minutes.",
    level: "basic",
    codeExample: 'yyyy-mm-dd (Month) vs hh:mm:ss (Minute)'
  },
  {
    question: "What is the result of using the token 'ddd' vs 'dddd' in an Excel custom date format?",
    shortAnswer: "'ddd' displays a 3-letter abbreviated day (e.g. 'Thu'), while 'dddd' displays the full day name (e.g. 'Thursday').",
    explanation: "Three 'd' tokens truncate the day of week to 3 letters ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'). Four 'd' tokens render the full weekday name.",
    hint: "Count the number of 'd' characters: 3 = abbreviated, 4 = full name.",
    level: "basic",
    codeExample: 'ddd -> "Thu" | dddd -> "Thursday"'
  },
  {
    question: "Why should corporate financial reports in India prefer the format mask 'dd-mmm-yyyy' over 'dd/mm/yyyy' or 'mm/dd/yyyy'?",
    shortAnswer: "It eliminates ambiguity between US (MM/DD/YYYY) and UK/Indian (DD/MM/YYYY) date standards by explicitly spelling out the 3-letter month abbreviation.",
    explanation: "In international business, 05/06/2026 could mean May 6th (US) or June 5th (UK/India). Using '05-Jun-2026' removes all risk of multi-million dollar contractual errors.",
    hint: "Three-letter month names cannot be confused with day numbers.",
    level: "basic",
    codeExample: '05-Jun-2026 (Clear) vs 05/06/2026 (Ambiguous)'
  },
  {
    question: "How do you display a 12-hour clock format with AM/PM indicators in custom number formatting?",
    shortAnswer: "Include 'AM/PM' (or 'A/P') at the end of the time format code, e.g., 'hh:mm:ss AM/PM'.",
    explanation: "When Excel detects 'AM/PM' or 'A/P' in the format string, it automatically converts 24-hour clock values into 12-hour clock values with appropriate AM or PM suffix.",
    hint: "Add AM/PM at the tail of the format string.",
    level: "basic",
    codeExample: 'hh:mm AM/PM -> "02:30 PM" (for serial value 0.604167)'
  },
  {
    question: "What underlying numeric value does Excel store for the date January 1, 1900?",
    shortAnswer: "Serial integer 1 (under the 1900 date system).",
    explanation: "Excel dates are positive integers counting days since January 1, 1900 (serial number 1). Fractional values represent time (e.g., 0.5 is 12:00 PM noon).",
    hint: "Day 1 of the Excel date epoch.",
    level: "basic",
    codeExample: '1 -> "01-Jan-1900" | 46261 -> "27-Aug-2026"'
  },
  {
    question: "How can you format a date to display custom fiscal period prefix like 'Q3-2026' using literal text and date tokens?",
    shortAnswer: 'Use literal text quotes around "Q" or custom text, e.g., "\\"Q\\"q yyyy" or embed conditional bracket masks.',
    explanation: "Literal characters inside double quotes (or escaped with backslashes) pass through verbatim alongside year/month tokens.",
    hint: "Wrap fixed letters in double quotes inside the custom format mask.",
    level: "intermediate",
    codeExample: '"Q"m"-"yyyy -> "Q8-2026" (for August)'
  },
  {
    question: "What format code forces a single-digit day (1-9) to display without a leading zero, while 10-31 display normally?",
    shortAnswer: "Single 'd' token.",
    explanation: "A single 'd' renders day numbers 1 through 31 without zero padding. Double 'dd' forces leading zeros ('01' to '31').",
    hint: "Single token = no leading zero; double token = leading zero.",
    level: "basic",
    codeExample: 'd -> "5" | dd -> "05"'
  },
  {
    question: "What format code forces a single-digit month (1-9) to display without a leading zero?",
    shortAnswer: "Single 'm' token (when isolated from hour/second tokens).",
    explanation: "A single 'm' displays month numbers 1 to 12. Double 'mm' displays '01' to '12'. Triple 'mmm' gives 'Jan'-'Dec'. Quadruple 'mmmm' gives 'January'-'December'.",
    hint: "1 'm' = 1..12; 2 'm' = 01..12; 3 'm' = Jan..Dec; 4 'm' = January..December.",
    level: "basic",
    codeExample: 'm -> "8" | mm -> "08" | mmm -> "Aug" | mmmm -> "August"'
  },
  {
    question: "What is the purpose of five 'm' tokens ('mmmmm') in a custom date format?",
    shortAnswer: "It displays the first letter of the month name as a single character (e.g. 'J' for January, 'A' for August).",
    explanation: "Five 'm' tokens render the first letter of the month name ('J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'). Useful for compact sparkline column headers.",
    hint: "Five 'm's create a single-letter month abbreviation.",
    level: "intermediate",
    codeExample: 'mmmmm -> "A" (for August)'
  },
  {
    question: "How do you specify a specific locale language for date formatting, such as rendering dates in Hindi or French regardless of system settings?",
    shortAnswer: "Use locale hex code brackets at the start of the format string, e.g., '[$-409]' for US English or '[$-439]' for Hindi.",
    explanation: "Locale culture tags like '[$-409]' force Excel to render month and day names in a specific language regardless of OS regional settings.",
    hint: "[$-LCID] prefix forces regional language rendering.",
    level: "advanced",
    codeExample: '[$-409]dddd, mmmm dd, yyyy -> "Thursday, August 27, 2026"'
  },
  {
    question: "Why does typing '27/08/2026 14:30' as text instead of a true Excel date serial break PivotTable grouping?",
    shortAnswer: "Text strings cannot be parsed by Excel's internal date hierarchy engine, disabling automatic Year/Quarter/Month grouping.",
    explanation: "Excel requires true numeric date serials to calculate date math, group in PivotTables, and filter by date ranges. Text dates fail all date functions.",
    hint: "Text is not numeric; Excel cannot apply date hierarchy logic to pure text.",
    level: "intermediate",
    codeExample: 'Raw Float: 46261.604167 (Allows Pivot Grouping)'
  },
  {
    question: "What format code renders seconds with two decimal places (fractional seconds) for high-precision manufacturing timestamps?",
    shortAnswer: "'hh:mm:ss.00' or 'ss.000'",
    explanation: "Appending '.00' or '.000' directly after second tokens ('ss') instructs Excel to display decimal fractions of a second (milliseconds).",
    hint: "Add decimal point and zeros after 'ss'.",
    level: "intermediate",
    codeExample: 'hh:mm:ss.000 -> "14:30:15.482"'
  },
  {
    question: "What happens when you subtract an earlier time serial from a later time serial (e.g., 0.75 - 0.25) and format as 'hh:mm'?",
    shortAnswer: "It displays '12:00' (representing 12 hours difference).",
    explanation: "Since 1 day = 1.0, 0.5 = 12 hours (0.75 - 0.25 = 0.50). Formatted as 'hh:mm', it renders 12 hours and 0 minutes.",
    hint: "Time arithmetic operates on day fractions (1.0 = 24 hours).",
    level: "basic",
    codeExample: '0.75 (6:00 PM) - 0.25 (6:00 AM) = 0.50 -> "12:00"'
  },
  {
    question: "What format string displays date and 24-hour time according to the ISO 8601 international standard?",
    shortAnswer: "'yyyy-mm-dd hh:mm:ss'",
    explanation: "ISO 8601 dictates Year-Month-Day followed by 24-hour Time. This format is universally sortable as text and unambiguous across all global database systems.",
    hint: "Year first, hyphen separated, followed by 24h time.",
    level: "intermediate",
    codeExample: 'yyyy-mm-dd hh:mm:ss -> "2026-08-27 14:30:00"'
  },
  {
    question: "How do you display a 2-digit year vs a 4-digit year in custom date formatting?",
    shortAnswer: "'yy' displays a two-digit year (e.g. '26'), while 'yyyy' displays a four-digit year (e.g. '2026').",
    explanation: "'yy' takes the last two digits of the year. 'yyyy' outputs the complete four-digit calendar year.",
    hint: "2 'y's = 26; 4 'y's = 2026.",
    level: "basic",
    codeExample: 'yy -> "26" | yyyy -> "2026"'
  },
  {
    question: "What happens if a cell formatted with 'dd-mmm-yyyy hh:mm' contains the raw float value 0.0?",
    shortAnswer: "It displays '00-Jan-1900 00:00'.",
    explanation: "0.0 corresponds to day 0 of the 1900 date system (January 0, 1900 at 00:00 hours).",
    hint: "Zero is the origin of the 1900 date scale.",
    level: "intermediate",
    codeExample: '0.0 -> "00-Jan-1900 00:00"'
  },
  {
    question: "How can you format a column of dates so that Sundays appear with a specific visual note or highlight via custom format masks?",
    shortAnswer: "Using bracket conditions based on values or day tokens, or combined with conditional formatting rules.",
    explanation: "While custom format strings support conditional criteria like [>1000], weekday checking is best paired with WEEKDAY() formulas or custom format masks.",
    hint: "Combine format masks with WEEKDAY() logic for audit safety.",
    level: "advanced",
    codeExample: 'dddd" Shift"'
  },
  {
    question: "What is the difference between format code 'h:mm' and 'hh:mm'?",
    shortAnswer: "'h:mm' displays hours without a leading zero (e.g. '9:05'), whereas 'hh:mm' forces a leading zero for single-digit hours (e.g. '09:05').",
    explanation: "Single 'h' suppresses leading zero on hours 1-9. Double 'hh' enforces two-digit alignment across tabular time columns.",
    hint: "'h' = 9:05; 'hh' = 09:05.",
    level: "basic",
    codeExample: 'h:mm -> "9:15" | hh:mm -> "09:15"'
  },
  {
    question: "How can you format dates to display the fiscal year ending in March, such as 'FY26-Q2'?",
    shortAnswer: "Use text literal quotes combined with month/year masks or custom helper columns formatted as '\\F\\Yyy-\"Q\"m'.",
    explanation: "Literal prefixes like '\\F\\Y' (or wrapped in double quotes) allow presentation of custom financial reporting standards.",
    hint: "Escape 'F' and 'Y' or put them in double quotes.",
    level: "advanced",
    codeExample: '"FY"yy"-"mmm -> "FY26-Aug"'
  },
  {
    question: "Why does entering '=NOW()' in Excel return both date and time serials?",
    shortAnswer: "NOW() returns the current date integer plus time fraction (e.g. 46261.604167), whereas TODAY() returns only the date integer (46261.0).",
    explanation: "NOW() captures real-time system clock down to fractional seconds. TODAY() truncates time to 0.0 (midnight).",
    hint: "NOW() includes time decimals; TODAY() is midnight date integer.",
    level: "basic",
    codeExample: 'TODAY() -> 46261 | NOW() -> 46261.604167'
  },
  {
    question: "What format token displays seconds without leading zeros vs with leading zeros?",
    shortAnswer: "Single 's' displays 0-59 without leading zero for 0-9; 'ss' forces leading zero (00-59).",
    explanation: "Single 's' outputs 1, 2... 9, 10. Double 'ss' outputs 01, 02... 09, 10.",
    hint: "Single token = 5; double token = 05.",
    level: "basic",
    codeExample: 's -> "5" | ss -> "05"'
  },
  {
    question: "How do you display Japanese calendar era dates (e.g. Reiwa era) in Excel custom date formatting?",
    shortAnswer: "Use the locale prefix '[$-ja-JP-u-ca-japanese]' or Japanese date codes like 'e' and 'g'.",
    explanation: "Excel supports global calendar systems including Japanese Era, Hijri, and Buddhist calendars using specialized locale strings.",
    hint: "Locale code brackets enable non-Gregorian calendar transforms.",
    level: "advanced",
    codeExample: '[$-ja-JP-u-ca-japanese]ge/mm/dd'
  },
  {
    question: "What custom date format code creates a compact date string like '27-08-26' for delivery receipt stamps?",
    shortAnswer: "'dd-mm-yy'",
    explanation: "'dd' gives 2-digit day, 'mm' gives 2-digit month, 'yy' gives 2-digit year separated by hyphens.",
    hint: "Two digits for day, month, and year with hyphens.",
    level: "basic",
    codeExample: 'dd-mm-yy -> "27-08-26"'
  },
  {
    question: "What is the primary benefit of maintaining raw date serials in cell memory while applying custom date formats?",
    shortAnswer: "It allows dynamic formula calculations (e.g., EDATE, DATEDIF, WORKDAY, NETWORKDAYS) while controlling visual presentation.",
    explanation: "Calculations rely on underlying numbers. Converting dates to text strings destroys the ability to perform date math.",
    hint: "Display formatting does not corrupt underlying mathematical formulas.",
    level: "intermediate",
    codeExample: '=EDATE(A2, 3) works cleanly on formatted date serials.'
  },
  {
    question: "How do you format a timestamp to display 12-hour time with lower-case am/pm indicators?",
    shortAnswer: "Use 'hh:mm am/pm' or 'hh:mm a/p' in lowercase.",
    explanation: "Entering lowercase 'am/pm' in the format mask renders lowercase 'am' or 'pm' in the formatted cell display.",
    hint: "Type am/pm in lowercase inside the format code.",
    level: "basic",
    codeExample: 'hh:mm am/pm -> "02:30 pm"'
  },
  {
    question: "What format code creates a monthly header string formatted as 'August 2026'?",
    shortAnswer: "'mmmm yyyy'",
    explanation: "'mmmm' produces full month name ('August') followed by a space and 4-digit year 'yyyy' ('2026').",
    hint: "Four 'm's space four 'y's.",
    level: "basic",
    codeExample: 'mmmm yyyy -> "August 2026"'
  },
  {
    question: "How do you handle negative date values in Excel under the default 1900 date system?",
    shortAnswer: "Excel displays '########' error strings for negative date serials under 1900 system.",
    explanation: "The 1900 date system cannot render negative numbers as valid dates. You must use IF checks or switch to 1904 date system if negative dates are needed.",
    hint: "Negative serial numbers display as fill hashes (########).",
    level: "intermediate",
    codeExample: 'Raw -5 -> "########" (Use IF(A1<0, ...))'
  },
  {
    question: "What format string displays day of week, day of month, month name, and time for automated log entries?",
    shortAnswer: "'ddd, dd-mmm-yyyy hh:mm:ss'",
    explanation: "Combines 3-letter weekday ('Thu'), 2-digit day ('27'), 3-letter month ('Aug'), 4-digit year ('2026'), and 24-hour timestamp ('14:30:00').",
    hint: "Short weekday, audit date, and 24h timestamp.",
    level: "intermediate",
    codeExample: 'ddd, dd-mmm-yyyy hh:mm:ss -> "Thu, 27-Aug-2026 14:30:00"'
  },
  {
    question: "In Coder & AccoTax corporate audit guidelines, why are custom date format standards enforced across all financial model templates?",
    shortAnswer: "To guarantee zero data conversion loss, eliminate international date confusion, and ensure seamless database export/import compatibility.",
    explanation: "Standardized date formatting ensures that financial models built in Barrackpore or Kolkata can be audited globally without misinterpreting dates or corrupting financial calculations.",
    hint: "Standardized formatting prevents audit discrepancies and data corruption.",
    level: "advanced",
    codeExample: 'Standard: [$-409]dd-mmm-yyyy (Enforced across all templates)'
  }
];

export default questions;
