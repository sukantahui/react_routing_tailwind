// topic7_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 7
// Topic: Number and date transformations: Age calculation, start/end of month, rounding, and parity
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "How do you calculate employee Age in years from a Birth Date column in Power Query?",
    shortAnswer: "Select Birth Date → Add Column → Date → Age (creates duration), then Transform → Total Years, then Round Down (`Number.RoundDown(Duration.Days(DateTime.Date(DateTime.LocalNow()) - [BirthDate]) / 365.25)`).",
    explanation: "Standard 3-step visual workflow for accurate age calculation.",
    hint: "Date → Age → Total Years → Round Down.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"Age\", each Number.RoundDown(Duration.Days(DateTime.Date(DateTime.LocalNow()) - [Birth_Date]) / 365.25))"
  },
  {
    question: "What M function returns the first calendar date of the month for any given date?",
    shortAnswer: "`Date.StartOfMonth(Date)`.",
    explanation: "Returns the 1st day of that month (e.g. `2026-08-27` → `2026-08-01`).",
    hint: "Date.StartOfMonth.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"MonthStart\", each Date.StartOfMonth([Invoice_Date]))"
  },
  {
    question: "What M function returns the last calendar date of the month for any given date?",
    shortAnswer: "`Date.EndOfMonth(Date)` (equivalent to Excel EOMONTH with 0 offset).",
    explanation: "Returns the final day of that month (e.g. `2026-02-15` → `2026-02-28`).",
    hint: "Date.EndOfMonth.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"MonthEnd\", each Date.EndOfMonth([Invoice_Date]))"
  },
  {
    question: "What M function returns the full textual month name (e.g. 'August') for a date?",
    shortAnswer: "`Date.MonthName(Date, [Culture])`.",
    explanation: "Extracts formatted month names with optional international culture localization.",
    hint: "Date.MonthName.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"MonthName\", each Date.MonthName([Date], \"en-US\"))"
  },
  {
    question: "What M function calculates the calendar Quarter (1, 2, 3, or 4) for a date?",
    shortAnswer: "`Date.QuarterOfYear(Date)`.",
    explanation: "Returns an integer between 1 and 4 representing the calendar quarter.",
    hint: "Date.QuarterOfYear.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Quarter\", each Date.QuarterOfYear([Date]))"
  },
  {
    question: "How do you calculate the Day of the Week as an integer (0-6 or 1-7) in Power Query?",
    shortAnswer: "`Date.DayOfWeek(Date, [FirstDayOfWeek])` (e.g. passing `Day.Monday` sets Monday = 0).",
    explanation: "Extracts day of week indexing according to specified corporate calendar standards.",
    hint: "Date.DayOfWeek([Date], Day.Monday).",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"DayIndex\", each Date.DayOfWeek([Date], Day.Monday))"
  },
  {
    question: "What M function returns the full name of the day of the week (e.g. 'Thursday')?",
    shortAnswer: "`Date.DayOfWeekName(Date, [Culture])`.",
    explanation: "Returns localized weekday names for reporting.",
    hint: "Date.DayOfWeekName.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Weekday\", each Date.DayOfWeekName([Date]))"
  },
  {
    question: "What is the difference between `Number.Round`, `Number.RoundUp`, and `Number.RoundDown` in M?",
    shortAnswer: "`Number.Round` rounds to the nearest decimal (banker's rounding by default); `Number.RoundUp` rounds up away from zero (ceiling); `Number.RoundDown` rounds down towards zero (floor).",
    explanation: "Comprehensive numeric rounding control.",
    hint: "Round: nearest; RoundUp: ceiling; RoundDown: floor.",
    level: "moderate",
    codeExample: "Number.Round(12.5), Number.RoundUp(12.1) = 13, Number.RoundDown(12.9) = 12"
  },
  {
    question: "Why does `Number.Round(2.5, 0)` return 2, while `Number.Round(3.5, 0)` returns 4 in Power Query?",
    shortAnswer: "Because Power Query uses IEEE 754 Banker's Rounding (Round to Even) by default to eliminate statistical rounding bias across large financial datasets.",
    explanation: "To use standard arithmetic rounding (round half up away from zero), pass `RoundingMode.AwayFromZero`.",
    hint: "Uses Banker's Rounding (Round to Even) by default.",
    level: "expert",
    codeExample: "= Number.Round(2.5, 0, RoundingMode.AwayFromZero) = 3"
  },
  {
    question: "What M function returns the absolute value of a number (removing negative signs)?",
    shortAnswer: "`Number.Abs(Number)`.",
    explanation: "Converts negative values into positive magnitudes.",
    hint: "Number.Abs.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"AbsVariance\", each Number.Abs([Variance]))"
  },
  {
    question: "What M function checks whether a number is Even or Odd (Parity)?",
    shortAnswer: "`Number.IsEven(Number)` and `Number.IsOdd(Number)` (returns true/false).",
    explanation: "Useful for alternating row logic and batch splitting.",
    hint: "Number.IsEven and Number.IsOdd.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"IsEvenTxn\", each Number.IsEven([Txn_ID]))"
  },
  {
    question: "How do you calculate the integer remainder after division (Modulo) in Power Query?",
    shortAnswer: "`Number.Mod(Number, Divisor)` (equivalent to Excel MOD).",
    explanation: "Returns the arithmetic remainder.",
    hint: "Number.Mod.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Remainder\", each Number.Mod([Quantity], 12))"
  },
  {
    question: "What M function returns the sign of a number (-1 for negative, 0 for zero, 1 for positive)?",
    shortAnswer: "`Number.Sign(Number)`.",
    explanation: "Returns the mathematical sign indicator.",
    hint: "Number.Sign.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Direction\", each Number.Sign([NetChange]))"
  },
  {
    question: "What data type represents the difference between two DateTimes in Power Query?",
    shortAnswer: "The `Duration` type (`#duration(days, hours, minutes, seconds)`).",
    explanation: "Represents elapsed time intervals in M.",
    hint: "The Duration data type.",
    level: "moderate",
    codeExample: "[EndDate] - [StartDate] → Returns a Duration object"
  },
  {
    question: "How do you extract the total elapsed days from a Duration object?",
    shortAnswer: "`Duration.Days(Duration)` (or `Duration.TotalDays(Duration)` for fractional days).",
    explanation: "Extracts integer or fractional elapsed days.",
    hint: "Duration.Days or Duration.TotalDays.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"DaysOpen\", each Duration.Days([CloseDate] - [OpenDate]))"
  },
  {
    question: "How do you extract the total elapsed hours from a Duration object?",
    shortAnswer: "`Duration.TotalHours(Duration)`.",
    explanation: "Converts the full elapsed duration into floating-point total hours.",
    hint: "Duration.TotalHours.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"HoursElapsed\", each Duration.TotalHours([EndTime] - [StartTime]))"
  },
  {
    question: "What M function returns the current system date and time during query execution?",
    shortAnswer: "`DateTime.LocalNow()`.",
    explanation: "Fetches local machine date/time at the moment of refresh.",
    hint: "DateTime.LocalNow().",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"RefreshTime\", each DateTime.LocalNow())"
  },
  {
    question: "What is the difference between `DateTime.LocalNow()` and `DateTimeZone.UtcNow()` in M?",
    shortAnswer: "`DateTime.LocalNow()` returns local PC time; `DateTimeZone.UtcNow()` returns UTC universal coordinated time with timezone offset (+00:00).",
    explanation: "Essential for standardizing multi-region global logs.",
    hint: "LocalNow = local PC time; UtcNow = universal UTC with timezone.",
    level: "advanced",
    codeExample: "DateTime.LocalNow() vs DateTimeZone.UtcNow()"
  },
  {
    question: "How do you extract the Date component from a DateTime column?",
    shortAnswer: "`DateTime.Date(DateTime)`.",
    explanation: "Strips time components to yield a pure Date.",
    hint: "DateTime.Date.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"DateOnly\", each DateTime.Date([Timestamp]))"
  },
  {
    question: "What M function adds N months to a date (handling month-end rollover automatically)?",
    shortAnswer: "`Date.AddMonths(Date, NumberOfMonths)` (equivalent to Excel EDATE).",
    explanation: "Adds or subtracts months while preserving valid month-end days.",
    hint: "Date.AddMonths (Excel EDATE).",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"MaturityDate\", each Date.AddMonths([IssueDate], 12))"
  },
  {
    question: "What M function adds N days to a date?",
    shortAnswer: "`Date.AddDays(Date, NumberOfDays)`.",
    explanation: "Shifts calendar dates forward or backward by day increments.",
    hint: "Date.AddDays.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"DueDate\", each Date.AddDays([InvoiceDate], 30))"
  },
  {
    question: "What M function returns the ISO Week Number of the year (1-53)?",
    shortAnswer: "`Date.WeekOfYear(Date, [FirstDayOfWeek])`.",
    explanation: "Standard week numbering for retail and supply chain reporting.",
    hint: "Date.WeekOfYear.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"WeekNumber\", each Date.WeekOfYear([Date], Day.Monday))"
  },
  {
    question: "What M function checks if a given year is a Leap Year?",
    shortAnswer: "`Date.IsLeapYear(Date)` (returns true/false).",
    explanation: "Determines February 29th leap year status.",
    hint: "Date.IsLeapYear.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"IsLeap\", each Date.IsLeapYear([Date]))"
  },
  {
    question: "How do you calculate standard compound interest future value or power in M?",
    shortAnswer: "`Number.Power(Base, Exponent)`.",
    explanation: "Computes exponential powers (e.g. `(1 + r)^n`).",
    hint: "Number.Power.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"Compounded\", each [Principal] * Number.Power(1 + [Rate], [Years]))"
  },
  {
    question: "How do you compute the natural logarithm and base-10 logarithm in M?",
    shortAnswer: "`Number.Ln(Number)` for natural log; `Number.Log10(Number)` for base-10 log; `Number.Log(Number, [Base])` for arbitrary bases.",
    explanation: "Standard logarithmic functions for statistical modeling.",
    hint: "Number.Ln and Number.Log10.",
    level: "advanced",
    codeExample: "Number.Ln([Val]) and Number.Log10([Val])"
  },
  {
    question: "How do you calculate the start and end dates of the Fiscal Year in Power Query (e.g. April 1 to March 31 in India)?",
    shortAnswer: "Use conditional M logic: if `Date.Month([Date]) >= 4` then `#date(Date.Year([Date]), 4, 1)` else `#date(Date.Year([Date]) - 1, 4, 1)`.",
    explanation: "Standard Indian and UK corporate fiscal calendar alignment.",
    hint: "If Month >= 4 then Year, 4, 1 else Year - 1, 4, 1.",
    level: "advanced",
    codeExample: "= Table.AddColumn(Source, \"FY_Start\", each if Date.Month([Date]) >= 4 then #date(Date.Year([Date]), 4, 1) else #date(Date.Year([Date]) - 1, 4, 1))"
  },
  {
    question: "How do you format a numeric column as percentage directly in Power Query without multiplying by 100?",
    shortAnswer: "Change the column data type to `Percentage.Type` (`type number` with percentage semantic metadata).",
    explanation: "Displays `0.18` as `18%` in modern Excel/Power BI visuals.",
    hint: "Change type to Percentage.",
    level: "basic",
    codeExample: "= Table.TransformColumnTypes(Source, {{\"TaxRate\", Percentage.Type}})"
  },
  {
    question: "How do you round numbers to the nearest 100 or 1000 in Power Query?",
    shortAnswer: "Pass a negative number of digits to `Number.Round`: `Number.Round([Amount], -2)` rounds to nearest 100; `-3` rounds to nearest 1000.",
    explanation: "Standard negative rounding precision.",
    hint: "Number.Round([Amount], -2) = nearest 100.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"RoundedK\", each Number.Round([Revenue], -3))"
  },
  {
    question: "How do you calculate business working days between two dates excluding weekends in Power Query?",
    shortAnswer: "Generate a list of days with `List.Dates([Start], Duration.Days([End] - [Start]) + 1, #duration(1,0,0,0))`, filter where `Date.DayOfWeek(_, Day.Monday) < 5`, and count with `List.Count`.",
    explanation: "Pure in-memory business days calculation without Excel NETWORKDAYS formula dependencies.",
    hint: "List.Dates → filter DayOfWeek < 5 → List.Count.",
    level: "expert",
    codeExample: "= List.Count(List.Select(List.Dates([Start], Duration.Days([End]-[Start])+1, #duration(1,0,0,0)), each Date.DayOfWeek(_, Day.Monday) < 5))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Number & Date Transformations in Power Query?",
    shortAnswer: "Master temporal and mathematical precision in M! Always use Date.StartOfMonth and Date.EndOfMonth for period aggregations, calculate Age by converting elapsed duration into fractional years with Duration.Days / 365.25, remember that Power Query defaults to Banker's Rounding (pass RoundingMode.AwayFromZero for standard math), and build dynamic Fiscal Calendars with M conditional date logic!",
    explanation: "Accurate date and numeric transformations are the engine of corporate financial intelligence!",
    hint: "Date.StartOfMonth + Duration.Days / 365.25 + Banker's Rounding Awareness = Flawless Financial ETL!",
    level: "expert",
    codeExample: "Rule: Date Hygiene → Date.StartOfMonth → Duration.Days → Locale-Aware Math!"
  }
];

export default questions;
