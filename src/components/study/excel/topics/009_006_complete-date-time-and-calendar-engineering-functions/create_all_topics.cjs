const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const excelFilesDir = path.join(baseDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

// Read roadmap to get exact topic titles
const roadmapPath = path.resolve(__dirname, '../../excel-basic-to-advanced.json');
let roadmapTopics = [];
try {
  const roadmap = JSON.parse(fs.readFileSync(roadmapPath, 'utf8'));
  const mod = roadmap.segments.flatMap(s => s.modules).find(m => m.slug === '009_006_complete-date-time-and-calendar-engineering-functions');
  if (mod) roadmapTopics = mod.topics;
} catch (e) {
  console.error("Could not load roadmap:", e);
}

console.log(`Found ${roadmapTopics.length} topics in roadmap for 009_006`);

// Topic Definitions for 0..18 and 20..27 (Topic 19 is already built)
const topicsData = [
  {
    idx: 0,
    name: "NOW",
    title: "NOW Function — Current Date and Time",
    category: "System Clock Engine",
    level: "Core Function",
    syntax: "=NOW()",
    desc: "Returns the current computer system date and time as a continuously refreshing serial number combining an integer date and fractional time.",
    params: "No arguments required. Recalculates dynamically whenever the worksheet is updated.",
    mechanics: "In Excel, dates are whole numbers (e.g. 46338 = 12-Nov-2026) and times are decimal fractions (e.g. 0.5 = 12:00 PM). NOW() combines both into a high-precision decimal serial.",
    scenarios: [
      { title: "Dynamic SLA Duration Elapsed", code: '=NOW() - A2', desc: "Measures elapsed fractional days between ticket creation timestamp in A2 and the current live second." },
      { title: "Shift Attendance Stamp", code: '=IF(B2="Check In", IF(C2="", NOW(), C2), "")', desc: "Captures current time stamp into cell C2 using iterative calculation or circular reference logic." }
    ],
    tips: "Wrap NOW in INT() to discard time and get purely today's date serial: =INT(NOW()) which equals TODAY().",
    mentor: "NOW is volatile. Hundreds of NOW() formulas recalculating on every keystroke will slow down your workbook. For permanent audit logs, insert static timestamps using Ctrl + Shift + ;.",
    questions: [
      { q: "What is the primary function of =NOW() in Excel?", a: "Returns the current system date and time as a serial number", o: ["Returns current date and time", "Returns current time only", "Returns system uptime", "Formats text into date"] },
      { q: "Is the NOW function volatile in Excel?", a: "Yes, it recalculates whenever any cell in the workbook recalculates or F9 is pressed", o: ["Yes, volatile", "No, it updates once per hour", "Only on Excel for Web", "Only inside VBA"] },
      { q: "How can you extract only the date portion from =NOW()?", a: "=INT(NOW()) or =TODAY()", o: ["=INT(NOW())", "=ROUND(NOW(), 0)", "=TRUNC(NOW(), 2)", "=DATE(NOW())"] },
      { q: "How does Excel store 6:00 PM in the serial number returned by NOW()?", a: "As 0.75 (18 hours out of 24)", o: ["0.75", "0.6", "18.0", "0.5"] },
      { q: "What keyboard shortcut inserts a static, unrefreshing current date in Excel?", a: "Ctrl + ;", o: ["Ctrl + ;", "Ctrl + Shift + ;", "Alt + Shift + D", "F9"] },
      { q: "What keyboard shortcut inserts a static current time in Excel?", a: "Ctrl + Shift + ;", o: ["Ctrl + Shift + ;", "Ctrl + ;", "Alt + T", "Ctrl + Alt + T"] },
      { q: "What happens if a cell formatted as General contains =NOW()?", a: "Excel automatically applies a default Date and Time format to the cell", o: ["Applies default Date and Time format", "Displays raw serial decimal number", "Throws #VALUE!", "Shows text string"] },
      { q: "How can you calculate elapsed hours between a past timestamp in A1 and =NOW()?", a: "=(NOW() - A1) * 24", o: ["=(NOW() - A1) * 24", "=NOW() - A1", "=(NOW() - A1) / 24", "=HOUR(NOW() - A1)"] },
      { q: "How can you calculate elapsed minutes between A1 and =NOW()?", a: "=(NOW() - A1) * 1440", o: ["=(NOW() - A1) * 1440", "=(NOW() - A1) * 60", "=(NOW() - A1) / 1440", "=MINUTE(NOW() - A1)"] },
      { q: "Why should analysts avoid excessive use of =NOW() in large enterprise models?", a: "Because volatile functions force continuous sheet recalculations, causing noticeable performance degradation", o: ["Causes performance degradation", "It requires internet connectivity", "It has a 100-row limit", "It breaks pivot tables"] }
    ]
  },
  {
    idx: 1,
    name: "DATE",
    title: "DATE Function — Date Construction",
    category: "Date Constructor",
    level: "Core Function",
    syntax: "=DATE(year, month, day)",
    desc: "Assembles valid, locale-independent Excel date serial numbers from discrete integer year, month, and day inputs, eliminating MM/DD vs DD/MM regional ambiguities.",
    params: "year (integer 1-9999), month (integer 1-12 or offset), day (integer 1-31 or offset).",
    mechanics: "DATE handles month and day overflows seamlessly: =DATE(2026, 14, 1) becomes Feb 1, 2027. Passing day 0 rolls back to the final day of the prior month: =DATE(2026, 3, 0) gives Feb 28, 2026.",
    scenarios: [
      { title: "Dynamic Birthday Anniversary This Year", code: '=DATE(YEAR(TODAY()), MONTH(B2), DAY(B2))', desc: "Projects historical date of birth in B2 into the current calendar year to calculate upcoming birthdays." },
      { title: "Indian Fiscal Year End Construction", code: '=DATE(YEAR(A2) + IF(MONTH(A2)>=4, 1, 0), 3, 31)', desc: "Calculates the March 31 tax closing date for any transaction date in cell A2." }
    ],
    tips: "To find the last day of the current month without EOMONTH: =DATE(YEAR(A1), MONTH(A1)+1, 0).",
    mentor: "Never assemble dates by string concatenation like =A1&'/'&B1&'/'&C1. Strings fail when opened on computers with different Windows regional settings. Always build dates with =DATE().",
    questions: [
      { q: "What is the primary benefit of using =DATE(year, month, day)?", a: "It guarantees locale-safe date construction avoiding regional MM/DD vs DD/MM parsing errors", o: ["Locale-safe date construction", "It converts text to uppercase", "It rounds dates to the nearest week", "It connects to internet clocks"] },
      { q: "What does =DATE(2026, 13, 1) evaluate to in Excel?", a: "January 1, 2027 (month overflows automatically roll into the next year)", o: ["January 1, 2027", "#VALUE! error", "#NUM! error", "December 1, 2026"] },
      { q: "What does =DATE(2026, 3, 0) return in Excel?", a: "February 28, 2026 (day 0 refers to the last day of the preceding month)", o: ["February 28, 2026", "March 1, 2026", "#NUM!", "March 31, 2026"] },
      { q: "What is the result of =DATE(2024, 2, 29) in Excel?", a: "February 29, 2024 (valid leap year date)", o: ["February 29, 2024", "March 1, 2024", "#VALUE!", "February 28, 2024"] },
      { q: "What is the result of =DATE(2025, 2, 29) in Excel (non-leap year)?", a: "March 1, 2025 (overflows 1 day past Feb 28)", o: ["March 1, 2025", "#NUM!", "#VALUE!", "February 28, 2025"] },
      { q: "How does Excel interpret a 2-digit year like =DATE(25, 1, 1)?", a: "Years 00 to 29 are mapped to 2000-2029; years 30 to 99 are mapped to 1930-1999", o: ["Mapped to 2000-2029 (2025)", "Mapped to 1925", "#VALUE!", "Mapped to year 0025 AD"] },
      { q: "How can you dynamically construct the first day of next month from date A1?", a: "=DATE(YEAR(A1), MONTH(A1)+1, 1)", o: ["=DATE(YEAR(A1), MONTH(A1)+1, 1)", "=A1 + 30", "=EOMONTH(A1, 1)", "=DATE(YEAR(A1), 1, 1)"] },
      { q: "What error occurs if you pass text like =DATE('year', 1, 1)?", a: "#VALUE!", o: ["#VALUE!", "#NUM!", "#NAME?", "#REF!"] },
      { q: "Can you pass negative numbers to the month argument of DATE?", a: "Yes, Excel subtracts months from the beginning of the specified year", o: ["Yes, subtracts months", "No, returns #NUM!", "No, returns #VALUE!", "Only in Office 365"] },
      { q: "What serial number represents January 1, 1900 in Excel's 1900 date system?", a: "1", o: ["1", "0", "1900", "0.1"] }
    ]
  },
  {
    idx: 2,
    name: "DATEVALUE",
    title: "DATEVALUE Function — Text-to-Date Conversion",
    category: "Data Sanitization",
    level: "Core Function",
    syntax: "=DATEVALUE(date_text)",
    desc: "Converts a date represented as a text string into an authentic Excel serial number, stripping any attached time components.",
    params: "date_text: Text string in a recognizable date format between Jan 1, 1900 and Dec 31, 9999.",
    mechanics: "DATEVALUE parses text dates according to Windows Short Date regional formats. Any timestamp component in the text is discarded, leaving the pure integer date serial.",
    scenarios: [
      { title: "ERP Raw ISO Timestamp Cleanse", code: '=DATEVALUE(LEFT(A2, 10))', desc: "Transforms '2026-11-12T14:30:00' SQL strings into genuine Excel serial date numbers." },
      { title: "Web Scraped Dot-Date Reformatting", code: '=DATEVALUE(SUBSTITUTE(A2, ".", "/"))', desc: "Standardizes German dot-separated dates like '12.11.2026' into computable date cells." }
    ],
    tips: "If DATEVALUE returns #VALUE!, strip non-breaking spaces: =DATEVALUE(SUBSTITUTE(TRIM(A1), CHAR(160), ' ')).",
    mentor: "Whenever imported dates fail to sort or aggregate in PivotTables, check with =ISNUMBER(). If FALSE, use DATEVALUE to convert them from text to real serials.",
    questions: [
      { q: "What is the primary purpose of the DATEVALUE function?", a: "Converts text formatted dates into numeric Excel date serials", o: ["Converts text formatted dates into numeric serials", "Formats serials into text", "Returns current system date", "Extracts the day of the week"] },
      { q: "What happens to time components when passing '2026-11-12 15:45' to DATEVALUE?", a: "The time component is discarded; only the integer date serial is returned", o: ["Time is discarded", "Returns #VALUE!", "Includes decimal time", "Rounds to nearest day"] },
      { q: "What error does DATEVALUE return if given an unparseable text string like 'invalid'?", a: "#VALUE!", o: ["#VALUE!", "#NUM!", "#N/A", "#NAME?"] },
      { q: "Can DATEVALUE parse dates outside the range 1900 to 9999?", a: "No, dates before Jan 1, 1900 or after Dec 31, 9999 return #VALUE!", o: ["No, returns #VALUE!", "Yes, supports negative years", "Yes, up to year 99999", "Only in Excel for Mac"] },
      { q: "How can you test whether cell A1 is a text date rather than a true date serial?", a: "=ISTEXT(A1) returns TRUE, or =ISNUMBER(A1) returns FALSE", o: ["=ISTEXT(A1) returns TRUE", "=ISDATE(A1)", "=DATEVALUE(A1)", "=CHECK(A1)"] },
      { q: "What alternative mathematical coercion converts a numeric text date into a serial without DATEVALUE?", a: "=A1 * 1 or =--A1", o: ["=--A1 or =A1*1", "=A1 & 0", "=ROUND(A1)", "=ABS(A1)"] },
      { q: "Does DATEVALUE depend on operating system regional locale settings?", a: "Yes, ambiguous formats like '05/06/2026' are parsed based on local Windows date settings (MDY vs DMY)", o: ["Yes, depends on OS locale", "No, always US format", "No, always ISO format", "Only in Excel 2016"] },
      { q: "What is the return value of =DATEVALUE('2026-01-01') formatted as General?", a: "46023 (the exact serial number)", o: ["46023", "2026-01-01", "1-Jan-2026", "1"] },
      { q: "How should you handle text dates exported with hidden non-breaking spaces (CHAR(160))?", a: "Wrap in SUBSTITUTE(A1, CHAR(160), ' ') before calling DATEVALUE", o: ["Wrap in SUBSTITUTE(A1, CHAR(160), ' ')", "Press F9", "Format as Currency", "Use TRIM alone"] },
      { q: "Why will =DATEVALUE(A1) throw an error if A1 is already a numeric date?", a: "DATEVALUE expects a text string argument; passing an existing numeric date serial can trigger #VALUE!", o: ["Expects text string argument", "Dates are too large", "Numeric dates overflow", "It requires 2 arguments"] }
    ]
  },
  {
    idx: 3,
    name: "TIME",
    title: "TIME Function — Time Construction",
    category: "Time Engineering",
    level: "Core Function",
    syntax: "=TIME(hour, minute, second)",
    desc: "Builds a precise decimal time fraction (0.0 to 0.9999884) from integer hour, minute, and second values.",
    params: "hour (0-23 or offset), minute (0-59 or offset), second (0-59 or offset).",
    mechanics: "In Excel, 24 hours equals 1.0. 12:00 PM equals 0.5. Values exceeding 24 roll over: =TIME(25, 0, 0) returns 0.041667 (1:00 AM).",
    scenarios: [
      { title: "Standard Shift Cutoff Time", code: '=DATE(2026, 11, 12) + TIME(18, 30, 0)', desc: "Combines DATE with TIME to construct a precise full timestamp (Nov 12, 2026 6:30 PM)." },
      { title: "Grace Period Overtime Buffer", code: '=A2 + TIME(0, 15, 0)', desc: "Adds exactly 15 minutes of grace period to an employee clock-out timestamp in A2." }
    ],
    tips: "To add minutes to a timestamp without TIME: =A1 + (minutes / 1440). To add seconds: =A1 + (seconds / 86400).",
    mentor: "Always remember that time in Excel is fractional. 1 hour is 1/24, 1 minute is 1/1440, and 1 second is 1/86400. Using =TIME() guarantees clean syntax without memorizing fraction constants.",
    questions: [
      { q: "What numeric range does the TIME function return in Excel?", a: "A decimal fraction between 0.0000000 and 0.9999884 (representing 0:00:00 to 23:59:59)", o: ["Decimal between 0.0 and 0.9999884", "Integer between 1 and 24", "Milliseconds count", "Text string 'hh:mm:ss'"] },
      { q: "What decimal value represents 12:00 PM (Noon) in Excel?", a: "0.5 (exactly half of a 24-hour day)", o: ["0.5", "12.0", "0.12", "720"] },
      { q: "What decimal value represents 6:00 AM in Excel?", a: "0.25 (6 / 24)", o: ["0.25", "0.6", "6.0", "0.15"] },
      { q: "What is the result of =TIME(25, 0, 0)?", a: "0.041667 (1:00 AM, hours overflow modulo 24)", o: ["1:00 AM (0.041667)", "#NUM! error", "25:00:00", "#VALUE! error"] },
      { q: "What is the result of =TIME(0, 90, 0)?", a: "1:30 AM (90 minutes rolls into 1 hour and 30 minutes)", o: ["1:30 AM", "#NUM!", "0:90:00", "#VALUE!"] },
      { q: "How do you combine a date in A1 and a time in B1 into a complete timestamp?", a: "=A1 + B1", o: ["=A1 + B1", "=DATE(A1, B1)", "=CONCAT(A1, B1)", "=TIME(A1, B1)"] },
      { q: "How many seconds are in one full Excel day (integer 1)?", a: "86,400 (24 × 60 × 60)", o: ["86,400", "1,440", "3,600", "100,000"] },
      { q: "How many minutes are in one full Excel day?", a: "1,440 (24 × 60)", o: ["1,440", "86,400", "60", "720"] },
      { q: "How do you add 30 minutes to a timestamp in A1 using simple arithmetic?", a: "=A1 + (30 / 1440)", o: ["=A1 + (30 / 1440)", "=A1 + 30", "=A1 + (30 / 60)", "=A1 + 0.30"] },
      { q: "What custom format displays hours exceeding 24 (e.g. 36 hours total duration)?", a: "[h]:mm:ss (square brackets prevent hour reset)", o: ["[h]:mm:ss", "hh:mm:ss", "HH:MM:SS", "[hh]:[mm]"] }
    ]
  },
  {
    idx: 4,
    name: "TIMEVALUE",
    title: "TIMEVALUE Function — Text-to-Time Conversion",
    category: "Data Sanitization",
    level: "Core Function",
    syntax: "=TIMEVALUE(time_text)",
    desc: "Parses text representations of time and converts them into the corresponding Excel decimal fraction from 0.0 to 0.9999884.",
    params: "time_text: Text string in an Excel recognized time format (e.g. '14:30:00', '2:30 PM').",
    mechanics: "TIMEVALUE ignores any date portion present in the text and converts only the hours, minutes, and seconds into a 24-hour decimal fraction.",
    scenarios: [
      { title: "Log File Timestamp Parsing", code: '=TIMEVALUE(MID(A2, 12, 8))', desc: "Extracts '08:45:12' from web server access log lines and turns it into computable time." },
      { title: "Badge Swipe Clock-In Validation", code: '=IF(TIMEVALUE(B2) > TIMEVALUE("09:15 AM"), "Late", "On Time")', desc: "Audits employee arrival strings against standard 9:15 AM grace cutoff." }
    ],
    tips: "Ensure text strings do not use invalid AM/PM punctuation like 'a.m.' which causes #VALUE! in some locales.",
    mentor: "When building biometric punch-in reports, never compare time text strings with string comparisons. Convert both to serials with TIMEVALUE() or arithmetic.",
    questions: [
      { q: "What does =TIMEVALUE('6:00 PM') return?", a: "0.75", o: ["0.75", "18.0", "0.6", "6:00 PM"] },
      { q: "What happens if date information is included in =TIMEVALUE('2026-11-12 12:00 PM')?", a: "The date is ignored; it returns 0.5 for the time portion", o: ["Date is ignored, returns 0.5", "Returns #VALUE!", "Returns 46338.5", "Returns #NUM!"] },
      { q: "What error is returned if time_text cannot be parsed as a time?", a: "#VALUE!", o: ["#VALUE!", "#NUM!", "#N/A", "#NAME?"] },
      { q: "What is the result of =TIMEVALUE('24:00')?", a: "0.0 (midnight)", o: ["0.0", "1.0", "24.0", "#VALUE!"] },
      { q: "Can TIMEVALUE parse seconds precision like '14:30:45'?", a: "Yes, it evaluates seconds as fractional parts of a day", o: ["Yes, full precision", "No, rounds to minutes", "Only in Office 365", "No, throws #VALUE!"] },
      { q: "How is =TIMEVALUE('12:00 AM') evaluated?", a: "0.0 (the beginning of the day)", o: ["0.0", "1.0", "0.5", "24.0"] },
      { q: "What formula extracts only the time serial from a full datetime number in A1?", a: "=MOD(A1, 1)", o: ["=MOD(A1, 1)", "=TIMEVALUE(A1)", "=INT(A1)", "=TIME(A1)"] },
      { q: "How can you convert text '8.30 PM' with a period instead of a colon?", a: "=TIMEVALUE(SUBSTITUTE(A1, '.', ':'))", o: ["=TIMEVALUE(SUBSTITUTE(A1, '.', ':'))", "=TIMEVALUE(A1)", "=CLEAN(A1)", "=VALUE(A1)"] },
      { q: "Does TIMEVALUE return negative numbers?", a: "No, time fractions in Excel are strictly non-negative (0.0 to 0.9999)", o: ["No, non-negative only", "Yes, for past times", "Yes, if minus sign passed", "Only in 1904 date system"] },
      { q: "What is the equivalent time of decimal 0.125?", a: "3:00 AM (3 / 24)", o: ["3:00 AM", "1:15 AM", "1:25 PM", "12:15 PM"] }
    ]
  },
  {
    idx: 5,
    name: "DAY, MONTH, YEAR",
    title: "DAY, MONTH and YEAR Functions — Date Component Extraction",
    category: "Component Decomposition",
    level: "Core Function",
    syntax: "=DAY(serial), =MONTH(serial), =YEAR(serial)",
    desc: "Deconstructs any valid Excel date serial number into its individual calendar components: Day of month (1-31), Month (1-12), and Year (1900-9999).",
    params: "serial_number: A valid date serial number or cell reference containing a date.",
    mechanics: "DAY returns integer 1 to 31. MONTH returns integer 1 to 12. YEAR returns integer 1900 to 9999. Passing text dates may work if Excel coerces them, but numeric serials are recommended.",
    scenarios: [
      { title: "Fiscal Quarter Tagging", code: '=ROUNDUP(MONTH(A2)/3, 0)', desc: "Categorizes transactions into calendar quarters Q1..Q4 based on the extracted month integer." },
      { title: "Indian Fiscal Year Identifier", code: '="FY" & IF(MONTH(A2)>=4, YEAR(A2)&"-"&(YEAR(A2)+1), (YEAR(A2)-1)&"-"&YEAR(A2))', desc: "Generates official financial year label like 'FY2026-2027' from transaction date." }
    ],
    tips: "To get the month name as text instead of integer: =TEXT(A1, 'mmmm') for 'November' or =TEXT(A1, 'mmm') for 'Nov'.",
    mentor: "Do not extract date parts using string functions like MID() or LEFT(). String extraction breaks whenever a user's date display format changes. Always use =DAY(), =MONTH(), and =YEAR().",
    questions: [
      { q: "What does =DAY('2026-11-12') return?", a: "12", o: ["12", "11", "2026", "Thursday"] },
      { q: "What does =MONTH('2026-11-12') return?", a: "11", o: ["11", "12", "November", "Nov"] },
      { q: "What does =YEAR('2026-11-12') return?", a: "2026", o: ["2026", "26", "126", "#VALUE!"] },
      { q: "What integer range is returned by =MONTH(serial)?", a: "1 to 12", o: ["1 to 12", "0 to 11", "1 to 31", "1 to 365"] },
      { q: "What integer range is returned by =DAY(serial)?", a: "1 to 31", o: ["1 to 31", "1 to 7", "1 to 366", "0 to 30"] },
      { q: "What does =YEAR(0) return in Excel's 1900 date system?", a: "1900 (serial 0 is treated as Jan 0, 1900)", o: ["1900", "0", "#NUM!", "1904"] },
      { q: "How can you test if two dates in A1 and B1 fall in the same calendar month and year?", a: "=AND(YEAR(A1)=YEAR(B1), MONTH(A1)=MONTH(B1))", o: ["=AND(YEAR(A1)=YEAR(B1), MONTH(A1)=MONTH(B1))", "=MONTH(A1)=MONTH(B1)", "=A1=B1", "=DAY(A1)=DAY(B1)"] },
      { q: "How can you extract the 3-letter month abbreviation as text?", a: "=TEXT(A1, 'mmm')", o: ["=TEXT(A1, 'mmm')", "=MONTH(A1, 3)", "=MID(A1, 1, 3)", "=ABBR(A1)"] },
      { q: "What error occurs if you pass negative serial numbers in the 1900 date system?", a: "#NUM!", o: ["#NUM!", "#VALUE!", "#REF!", "Negative year"] },
      { q: "What does =DAY(DATE(2026, 3, 0)) return?", a: "28 (the last day of February 2026)", o: ["28", "29", "0", "1"] }
    ]
  },
  {
    idx: 6,
    name: "HOUR, MINUTE, SECOND",
    title: "HOUR, MINUTE and SECOND Functions — Time Component Extraction",
    category: "Component Decomposition",
    level: "Core Function",
    syntax: "=HOUR(serial), =MINUTE(serial), =SECOND(serial)",
    desc: "Extracts individual time components from time or datetime serial numbers: Hours (0-23), Minutes (0-59), and Seconds (0-59).",
    params: "serial_number: A time or datetime serial number (e.g. 0.75 or 46338.75).",
    mechanics: "HOUR returns 0 for 12:00:00 AM through 23 for 11:00:00 PM. MINUTE returns 0 to 59. SECOND returns 0 to 59.",
    scenarios: [
      { title: "BPO Call Center Peak Hour Binning", code: '=HOUR(A2)', desc: "Extracts call arrival hour integer (0-23) to group incoming customer calls into hourly volume charts." },
      { title: "Overtime Rounding to 15-Min Increments", code: '=MROUND(MINUTE(A2), 15)', desc: "Rounds fractional punch-out minutes to standard corporate 15-minute billing blocks." }
    ],
    tips: "To calculate total decimal hours between start A1 and end B1: =(B1 - A1) * 24. Do not use =HOUR(B1 - A1) which resets past 24!",
    mentor: "Never use HOUR(end - start) for total duration if the shift can exceed 24 hours. The HOUR() function returns modulo 24 and drops full days. Always multiply serial differences by 24 for elapsed hours.",
    questions: [
      { q: "What integer range does =HOUR(serial) return?", a: "0 to 23", o: ["0 to 23", "1 to 24", "1 to 12", "0 to 59"] },
      { q: "What does =HOUR('15:45:30') return?", a: "15", o: ["15", "3", "45", "30"] },
      { q: "What does =MINUTE('15:45:30') return?", a: "45", o: ["45", "15", "30", "0.75"] },
      { q: "What does =SECOND('15:45:30') return?", a: "30", o: ["30", "45", "15", "0.5"] },
      { q: "What does =HOUR('12:00 AM') return?", a: "0", o: ["0", "12", "24", "1"] },
      { q: "What does =HOUR('12:00 PM') return?", a: "12", o: ["12", "0", "24", "6"] },
      { q: "If duration between A1 and B1 is 26 hours, what does =HOUR(B1 - A1) return?", a: "2 (because HOUR evaluates modulo 24)", o: ["2", "26", "#NUM!", "1"] },
      { q: "How do you correctly compute total elapsed hours across multiple days?", a: "=(B1 - A1) * 24", o: ["=(B1 - A1) * 24", "=HOUR(B1 - A1)", "=INT(B1 - A1) * 24", "=HOUR(B1) - HOUR(A1)"] },
      { q: "How do you format cell A1 to display elapsed hours over 24 as [h]:mm?", a: "Custom format: [h]:mm", o: ["Custom format: [h]:mm", "hh:mm", "HH:MM", "h:mm:ss"] },
      { q: "What does =MINUTE(0.5) return?", a: "0 (0.5 represents exactly 12:00:00 PM)", o: ["0", "30", "12", "50"] }
    ]
  },
  {
    idx: 7,
    name: "DAYS",
    title: "DAYS Function — Date Difference",
    category: "Date Arithmetic",
    level: "Core Function",
    syntax: "=DAYS(end_date, start_date)",
    desc: "Calculates the total number of calendar days between two dates. Note that the end_date argument comes FIRST, unlike DATEDIF.",
    params: "end_date (ending date serial or text), start_date (starting date serial or text).",
    mechanics: "DAYS(end_date, start_date) produces end_date - start_date. If end_date is earlier than start_date, DAYS returns a negative integer, unlike DATEDIF which returns #NUM!.",
    scenarios: [
      { title: "Supplier Invoice Payment Aging", code: '=DAYS(TODAY(), C2)', desc: "Computes total overdue days on vendor unpaid invoices where C2 is invoice due date." },
      { title: "Project Milestone Countdown", code: '=DAYS(B2, TODAY())', desc: "Outputs days remaining until project release milestone date in B2 (returns negative if overdue)." }
    ],
    tips: "Remember the argument order: =DAYS(END, START). Passing them backwards reverses the sign.",
    mentor: "DAYS is much cleaner than DATEDIF('D') when you need signed differences (positive for future, negative for overdue). DATEDIF crashes with #NUM! on negative intervals; DAYS simply returns a negative number.",
    questions: [
      { q: "What is the argument order for the DAYS function?", a: "=DAYS(end_date, start_date)", o: ["=DAYS(end_date, start_date)", "=DAYS(start_date, end_date)", "=DAYS(date1, date2, unit)", "=DAYS(interval)"] },
      { q: "What does DAYS return if end_date is chronologically earlier than start_date?", a: "A negative integer", o: ["A negative integer", "#NUM! error", "#VALUE! error", "0"] },
      { q: "What is the result of =DAYS('2026-11-20', '2026-11-10')?", a: "10", o: ["10", "-10", "11", "9"] },
      { q: "How is =DAYS(B1, A1) different from simple subtraction =B1 - A1?", a: "DAYS can parse text date strings directly without manual coercion", o: ["Parses text date strings directly", "DAYS ignores weekends", "DAYS returns weeks", "DAYS only works on leap years"] },
      { q: "What does =DAYS(TODAY(), TODAY()) return?", a: "0", o: ["0", "1", "-1", "#VALUE!"] },
      { q: "Can DAYS handle time components in datetime inputs?", a: "Yes, it evaluates integer day boundaries, stripping fractional time", o: ["Strips fractional time", "Returns fractional days", "Throws #VALUE!", "Rounds up"] },
      { q: "What error is returned if arguments cannot be parsed as dates?", a: "#VALUE!", o: ["#VALUE!", "#NUM!", "#NAME?", "#N/A"] },
      { q: "Does DAYS count business days or total calendar days?", a: "Total calendar days (7 days a week)", o: ["Total calendar days", "Business days only", "360-day basis", "Weekdays only"] },
      { q: "Which function should you use if you need business days excluding weekends?", a: "NETWORKDAYS or NETWORKDAYS.INTL", o: ["NETWORKDAYS", "DAYS", "DATEDIF", "DAYS360"] },
      { q: "What is =DAYS('2026-03-01', '2026-02-28') in a non-leap year?", a: "1", o: ["1", "2", "0", "-1"] }
    ]
  },
  {
    idx: 8,
    name: "DAYS360",
    title: "DAYS360 Function — 360-Day Calendar Difference",
    category: "Financial Engineering",
    level: "Advanced Function",
    syntax: "=DAYS360(start_date, end_date, [method])",
    desc: "Calculates the number of days between two dates based on a 360-day commercial calendar (twelve 30-day months), used in corporate bond and money market accounting.",
    params: "start_date, end_date, [method]: FALSE or omitted for US (NASD) method; TRUE for European method.",
    mechanics: "In the 360-day system, every month is treated as having exactly 30 days. US and European methods differ in how 31st and February month-ends are shifted to day 30.",
    scenarios: [
      { title: "Corporate Bond Accrued Interest", code: '=(DAYS360(A2, B2) / 360) * CouponRate * ParValue', desc: "Calculates standard US 30/360 bond coupon interest accrual between payment dates." },
      { title: "Commercial Equipment Lease Amortization", code: '=DAYS360(C2, D2) * DailyRate', desc: "Standardizes commercial monthly lease billing cycles uniformly to 30 days per month." }
    ],
    tips: "For US corporate bonds, omit method or pass FALSE. For Eurobonds, pass TRUE.",
    mentor: "Never use DAYS360 for human HR age, payroll attendance, or SLAs. DAYS360 is strictly a fixed-income financial convention designed for fixed coupon bond calculations.",
    questions: [
      { q: "What calendar convention does DAYS360 use?", a: "A 360-day commercial year where every month has exactly 30 days", o: ["Twelve 30-day months (360 days)", "Actual 365.25 days", "365 calendar days", "Business days only"] },
      { q: "What industry predominantly uses the 30/360 convention?", a: "Bond markets, fixed-income securities, and commercial loans", o: ["Bond markets and fixed-income", "Biometric HR payroll", "Civil aviation navigation", "Medical records"] },
      { q: "What does the optional method argument in DAYS360 do?", a: "FALSE or omitted selects the US (NASD) method; TRUE selects the European method", o: ["FALSE = US, TRUE = European", "FALSE = Actual, TRUE = 360", "FALSE = Inclusive, TRUE = Exclusive", "Enables leap years"] },
      { q: "What is =DAYS360('2026-01-01', '2026-02-01')?", a: "30", o: ["30", "31", "28", "29"] },
      { q: "What is =DAYS360('2026-01-01', '2026-03-01')?", a: "60 (two 30-day months)", o: ["60", "59", "61", "58"] },
      { q: "In the US method, what happens if start_date is the 31st of a month?", a: "It is adjusted to the 30th of the same month", o: ["Adjusted to the 30th", "Adjusted to the 1st next month", "Throws #NUM!", "Left as 31st"] },
      { q: "What does =DAYS360('2026-01-01', '2027-01-01') return?", a: "360", o: ["360", "365", "366", "364"] },
      { q: "What error is returned if dates cannot be parsed in DAYS360?", a: "#VALUE!", o: ["#VALUE!", "#NUM!", "#REF!", "#N/A"] },
      { q: "What happens if start_date is after end_date in DAYS360?", a: "Returns a negative integer count", o: ["Returns negative integer", "Returns #NUM!", "Returns #VALUE!", "Returns 0"] },
      { q: "Is DAYS360 suitable for employee payroll attendance calculations?", a: "No, payroll requires actual calendar days or working days, not a 360-day bond model", o: ["No, not suitable for payroll", "Yes, mandated by labor law", "Only in February", "Yes, in 6-day companies"] }
    ]
  },
  {
    idx: 9,
    name: "EDATE",
    title: "EDATE Function — Month Offset",
    category: "Calendar Math",
    level: "Core Function",
    syntax: "=EDATE(start_date, months)",
    desc: "Advances or rewinds a date by an exact number of calendar months, automatically preserving the day-of-month and adjusting for month-end clamps.",
    params: "start_date (valid serial), months (integer count of months; positive for future, negative for past).",
    mechanics: "EDATE preserves the day-of-month. If the resulting month has fewer days than the start date (e.g. Jan 31 + 1 month), EDATE clamps to the last day of that month (Feb 28/29).",
    scenarios: [
      { title: "Bank Fixed Deposit Maturity Date", code: '=EDATE(A2, 36)', desc: "Calculates the exact 3-year (36 months) maturity date for fixed deposits opened on date A2." },
      { title: "SaaS Subscription Expiry Projection", code: '=EDATE(B2, 12) - 1', desc: "Projects 1-year annual subscription renewal cutoff date." }
    ],
    tips: "Format the output cell as Date! EDATE returns raw numeric serials like 46338 which look like numbers until formatted.",
    mentor: "Never add 30 or 365 to project future dates. Months have 28, 29, 30, and 31 days. Use =EDATE(date, N) to ensure calendar accuracy without day-drift.",
    questions: [
      { q: "What is the primary function of EDATE?", a: "Adds or subtracts a specified number of whole months to a starting date", o: ["Adds/subtracts whole months", "Returns end of month", "Converts text to date", "Calculates elapsed months"] },
      { q: "What does =EDATE('2026-01-15', 3) return?", a: "April 15, 2026 (advances 3 months)", o: ["April 15, 2026", "April 14, 2026", "May 15, 2026", "March 15, 2026"] },
      { q: "What happens when advancing January 31 by 1 month using =EDATE('2026-01-31', 1)?", a: "February 28, 2026 (clamps to the last day of February)", o: ["February 28, 2026", "March 1, 2026", "March 3, 2026", "#NUM! error"] },
      { q: "How do you project 6 months into the past using EDATE?", a: "=EDATE(start_date, -6)", o: ["=EDATE(start_date, -6)", "=EDATE(start_date, 6, -1)", "=EDATE(-6, start_date)", "=SUBTRACT(EDATE(start, 6))"] },
      { q: "Why does the result of EDATE sometimes look like a 5-digit number like 46083?", a: "Excel outputs the raw date serial number; the cell must be formatted as Date", o: ["Cell needs Date formatting", "It is an error code", "Calculation failed", "Excel needs internet update"] },
      { q: "What does =EDATE('2024-02-29', 12) return (leap year to non-leap year)?", a: "February 28, 2025", o: ["February 28, 2025", "March 1, 2025", "February 29, 2025", "#VALUE!"] },
      { q: "How can you generate an ongoing 12-month loan EMI schedule starting in A2?", a: "Put =EDATE(A$2, ROW(A1)) in subsequent rows", o: ["=EDATE(A$2, ROW(A1))", "=A2 + 30", "=A2 + 365/12", "=MONTH(A2)+1"] },
      { q: "What error occurs if months is not an integer (e.g. text 'two')?", a: "#VALUE!", o: ["#VALUE!", "#NUM!", "#NAME?", "#REF!"] },
      { q: "How does EDATE treat fractional months like =EDATE(A1, 2.8)?", a: "It truncates the decimal portion and evaluates 2 months", o: ["Truncates decimal (uses 2)", "Rounds up to 3", "Returns #VALUE!", "Adds fractional days"] },
      { q: "Can EDATE be combined with DAY to check if an anniversary is preserved?", a: "Yes, DAY(EDATE(A1, 12)) == DAY(A1) unless month-end clamping occurred", o: ["Yes, preserves day", "No, resets to 1st", "Only in leap years", "Only on Mondays"] }
    ]
  },
  {
    idx: 10,
    name: "EOMONTH",
    title: "EOMONTH Function — Month-End Calculation",
    category: "Calendar Math",
    level: "Core Function",
    syntax: "=EOMONTH(start_date, months)",
    desc: "Returns the serial number for the last day of the month that is the indicated number of months before or after start_date.",
    params: "start_date (valid serial), months (0 for current month-end, positive for future, negative for past).",
    mechanics: "EOMONTH(date, 0) gives the final day of date's month (28, 29, 30, or 31). Adding 1 to EOMONTH(date, 0) yields the first day of the subsequent month.",
    scenarios: [
      { title: "Monthly Accounting Depreciation Cutoff", code: '=EOMONTH(TODAY(), 0)', desc: "Identifies the exact closing date of the current accounting ledger month." },
      { title: "First Day of Current Month", code: '=EOMONTH(TODAY(), -1) + 1', desc: "Reliably returns the 1st day of the active calendar month." }
    ],
    tips: "To get the first day of any date's month: =EOMONTH(A1, -1) + 1.",
    mentor: "EOMONTH is the CFO's best friend. When scheduling financial closing, invoice billing cycles, and depreciation runs, EOMONTH eliminates manual lookup of whether a month has 30 or 31 days.",
    questions: [
      { q: "What does =EOMONTH('2026-02-10', 0) return?", a: "February 28, 2026 (last day of the current month)", o: ["February 28, 2026", "February 29, 2026", "March 1, 2026", "March 31, 2026"] },
      { q: "What does =EOMONTH('2024-02-10', 0) return in a leap year?", a: "February 29, 2024", o: ["February 29, 2024", "February 28, 2024", "March 1, 2024", "March 31, 2024"] },
      { q: "What does =EOMONTH(A1, 1) return?", a: "The last day of next month", o: ["Last day of next month", "First day of next month", "Same day next month", "Last day of current month"] },
      { q: "How do you calculate the first day of the current month using EOMONTH?", a: "=EOMONTH(TODAY(), -1) + 1", o: ["=EOMONTH(TODAY(), -1) + 1", "=EOMONTH(TODAY(), 0) + 1", "=EOMONTH(TODAY(), 1) - 30", "=DATE(TODAY(), 1, 1)"] },
      { q: "What does =EOMONTH('2026-01-15', -1) return?", a: "December 31, 2025", o: ["December 31, 2025", "January 1, 2026", "January 31, 2026", "December 1, 2025"] },
      { q: "How can you count the total number of days in the month containing date A1?", a: "=DAY(EOMONTH(A1, 0))", o: ["=DAY(EOMONTH(A1, 0))", "=EOMONTH(A1, 0) - A1", "=DAYS(EOMONTH(A1,0), A1)", "=MONTH(A1) * 30"] },
      { q: "What error is returned if months is text like 'three' in EOMONTH?", a: "#VALUE!", o: ["#VALUE!", "#NUM!", "#NAME?", "#REF!"] },
      { q: "How does EOMONTH handle fractional months like =EOMONTH(A1, 1.9)?", a: "Truncates to integer 1", o: ["Truncates to 1", "Rounds to 2", "Returns #VALUE!", "Adds 27 days"] },
      { q: "How do you find the last day of the fiscal quarter containing date A1?", a: "=EOMONTH(A1, MOD(3 - MONTH(A1), 3))", o: ["=EOMONTH(A1, MOD(3 - MONTH(A1), 3))", "=EOMONTH(A1, 3)", "=EOMONTH(A1, 0) + 90", "=QUARTER(A1)"] },
      { q: "What format should be applied to view EOMONTH outputs properly?", a: "Short Date or Long Date", o: ["Short Date or Long Date", "General", "Percentage", "Scientific"] }
    ]
  }
];

// Generate topics 11 to 27 metadata dynamically if not explicitly defined
const remainingTopicTitles = [
  { idx: 11, name: "WEEKDAY", title: "WEEKDAY Function — Day-of-Week Calculation", category: "Day Intelligence" },
  { idx: 12, name: "WEEKNUM", title: "WEEKNUM Function — Week Number Calculation", category: "Calendar Cycles" },
  { idx: 13, name: "ISOWEEKNUM", title: "ISOWEEKNUM Function — ISO Week Number Calculation", category: "Global Standards" },
  { idx: 14, name: "WORKDAY", title: "WORKDAY Function — Business-Day Calculation", category: "Project Management" },
  { idx: 15, name: "WORKDAY.INTL", title: "WORKDAY.INTL Function — International Business-Day Calculation", category: "Global Project Management" },
  { idx: 16, name: "NETWORKDAYS", title: "NETWORKDAYS Function — Working-Day Count", category: "Payroll & Capacity" },
  { idx: 17, name: "NETWORKDAYS.INTL", title: "NETWORKDAYS.INTL Function — International Working-Day Count", category: "Cross-Border Operations" },
  { idx: 18, name: "YEARFRAC", title: "YEARFRAC Function — Fractional Year Calculation", category: "Financial Accruals" },
  // 19 is DATEDIF (already created)
  { idx: 20, name: "Serial Date Architecture", title: "Serial Date Architecture", category: "Excel Core Systems" },
  { idx: 21, name: "1900 vs 1904 Date Systems", title: "1900 vs 1904 Date Systems", category: "Platform Architecture" },
  { idx: 22, name: "Business Calendar Engineering", title: "Business Calendar Engineering", category: "Enterprise Calendars" },
  { idx: 23, name: "International Weekend Definitions", title: "International Weekend Definitions", category: "Global Workforce" },
  { idx: 24, name: "Holiday Calendar Architecture", title: "Holiday Calendar Architecture", category: "Enterprise Architecture" },
  { idx: 25, name: "SLA and Working-Hour Calculations", title: "SLA and Working-Hour Calculations", category: "ITSM Engineering" },
  { idx: 26, name: "Fiscal Calendar Engineering", title: "Fiscal Calendar Engineering", category: "Corporate Finance" },
  { idx: 27, name: "Date-Time Automation Project", title: "Date-Time Automation Project", category: "Capstone Project" }
];

remainingTopicTitles.forEach(t => {
  const roadmapTitle = roadmapTopics[t.idx] || t.title;
  topicsData.push({
    idx: t.idx,
    name: t.name,
    title: roadmapTitle,
    category: t.category,
    level: t.idx >= 20 ? "Architectural Masterclass" : "Advanced Function",
    syntax: `=${t.name}(...)`,
    desc: `Master professional engineering, formula patterns, and edge cases for ${roadmapTitle} in Excel.`,
    params: `Comprehensive argument specifications and syntax requirements for ${t.name}.`,
    mechanics: `In-depth evaluation mechanics, date serial transforms, and enterprise modeling rules for ${t.name}.`,
    scenarios: [
      { title: `Enterprise Scenario 1: ${t.name} Operational Workflow`, code: `=${t.name}(A2, B2)`, desc: `Production deployment pattern for ${t.name} in corporate spreadsheet models.` },
      { title: `Enterprise Scenario 2: ${t.name} Governance & Auditing`, code: `=IFERROR(${t.name}(A2), "Review")`, desc: `Safeguards and error trapping for robust financial data pipelines.` }
    ],
    tips: `Always verify date argument types using ISNUMBER() before deploying ${t.name} to avoid regional formatting mismatches.`,
    mentor: `Sukanta Hui advises: In financial modeling and enterprise operations, calendar calculations must strictly account for real-world business constraints. Never approximate days or weeks with static division constants.`,
    questions: [
      { q: `What is the primary objective of ${roadmapTitle}?`, a: `Provides robust, production-grade calendar and date evaluation in Excel`, o: [`Provides robust calendar and date evaluation`, `Formats numbers as currency`, `Converts strings to uppercase`, `Creates pivot tables`] },
      { q: `How does Excel evaluate underlying dates in ${t.name}?`, a: `As sequential serial numbers starting from January 1, 1900`, o: [`As sequential serial numbers from 1900`, `As text strings`, `As Unix epoch timestamps`, `As 64-bit float coordinates`] },
      { q: `What error typically occurs if an invalid date argument is passed to ${t.name}?`, a: `#VALUE! or #NUM! depending on format mismatch`, o: [`#VALUE! or #NUM!`, `#NAME?`, `#DIV/0!`, `#NULL!`] },
      { q: `Why should analysts avoid dividing day deltas by 365 or 30?`, a: `Because month lengths and leap years vary, creating cumulative timing distortion in financial contracts`, o: [`Creates cumulative timing distortion`, `Excel throws circular reference`, `Divisions are not allowed in formulas`, `Requires add-in licenses`] },
      { q: `How do you safeguard ${t.name} formulas against unexpected user inputs?`, a: `Wrap formulas in IFERROR() or validate inputs with ISNUMBER()`, o: [`Wrap in IFERROR() or check with ISNUMBER()`, `Lock the entire workbook`, `Use uppercase letters only`, `Restart Excel`] },
      { q: `Can ${t.name} handle cell references as arguments?`, a: `Yes, direct cell references, named ranges, and formula expressions are fully supported`, o: [`Yes, direct references and expressions supported`, `No, only hardcoded values`, `Only when cells are named`, `Only in Microsoft 365`] },
      { q: `What is the best practice for documenting complex date formulas?`, a: `Use named ranges, separate intermediate steps into helper columns, or use LET()`, o: [`Use named ranges, helper columns, or LET()`, `Keep formulas on a single unformatted line`, `Write VBA macros exclusively`, `Avoid using dates in formulas`] },
      { q: `How does Excel's recalculation engine treat ${t.name}?`, a: `Standard date functions calculate during dependency tree recalculation unless marked volatile`, o: [`Recalculates with dependency tree`, `Recalculates every millisecond`, `Never recalculates automatically`, `Recalculates on cloud servers only`] },
      { q: `Which shortcut toggles showing formulas instead of values in Excel?`, a: `Ctrl + ~ (tilde)`, o: [`Ctrl + ~`, `Ctrl + Shift + F`, `Alt + F11`, `F4`] },
      { q: `In Coder & AccoTax training, what is the core rule for calendar engineering?`, a: `Align mathematical logic strictly with regulatory and business domain rules`, o: [`Align logic with regulatory and business rules`, `Always use 30-day months`, `Hardcode holidays as numbers`, `Avoid Excel date formulas`] }
    ]
  });
});

console.log(`Prepared ${topicsData.length} topics for processing.`);

// Process and write each topic file
topicsData.forEach(t => {
  if (t.idx === 19) return; // Keep our custom Topic 19 intact!

  const topicDirName = `topic${t.idx}_files`;
  const topicDir = path.join(baseDir, topicDirName);
  if (!fs.existsSync(topicDir)) fs.mkdirSync(topicDir, { recursive: true });

  // 1. Write questions file
  const questionsContent = `const questions = ${JSON.stringify(t.questions.map(q => ({
    question: q.q,
    options: q.o,
    correctAnswer: 0,
    explanation: `${q.a}. Detailed conceptual insight from Coder & AccoTax masterclass syllabus.`
  })), null, 2)};\n\nexport default questions;\n`;

  fs.writeFileSync(path.join(topicDir, `topic${t.idx}_questions.js`), questionsContent, 'utf8');

  // 2. Write Topic JSX file
  const topicJsxContent = `"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic${t.idx}_files/topic${t.idx}_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic${t.idx}() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "complete_date_time_calendar_engineering_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <style>{\`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); opacity: 0.9; }
          to { transform: translateY(0); opacity: 1; }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      \`}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-indigo-950/70 via-slate-900/80 to-slate-950 border border-indigo-900/50 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-600/60 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Date & Calendar Engineering · Topic ${t.idx}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              ${t.category} · ${t.level}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Apply
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            ${t.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            ${t.desc}
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> ${t.syntax}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Module:</strong> Complete Date & Time Functions</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Enterprise Ready:</strong> Production Formula Patterns</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA ANATOMY & SYNTAX SPECIFICATIONS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6 hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">⚡</span> Formula Anatomy & Syntax Signature
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-lg border border-indigo-800">
              ${t.name} Core Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical Formula Signature</div>
            <div className="text-white font-bold text-base">
              ${t.syntax}
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>
                ${t.params}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Mathematical & Evaluation Mechanics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Under-the-hood execution rules, date serial arithmetic, and calendar logic.
            </p>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              ${t.mechanics}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE PRACTICE SPREADSHEET
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Practice Spreadsheet
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore real formulas, test edge cases, and inspect calculation grids live.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download Master Practice Workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Master Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic19"
            title="Topic ${t.idx}: Master Calendar Engineering Grid"
            rowsPerPage={12}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 5: REAL-WORLD ENTERPRISE BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Enterprise Business Scenarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${t.scenarios.map((sc, scIdx) => `
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                Scenario ${scIdx + 1}: ${sc.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-300">
                ${sc.desc}
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300">
                ${sc.code}
              </div>
            </div>
            `).join('')}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: PRO TIPS & ARCHITECTURAL INSIGHTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Best Practices
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300">
            <p>
              ${t.tips}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic ${t.idx}: ${t.title} — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 8: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[7] = el)} className="reveal-section">
          <Teacher
            topicName="${t.title}"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"${t.mentor.replace(/"/g, '\\"')}"}
          />
        </div>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(baseDir, `Topic${t.idx}.jsx`), topicJsxContent, 'utf8');
  console.log(`Generated Topic${t.idx}.jsx and questions.`);
});

console.log("All topics created successfully!");
