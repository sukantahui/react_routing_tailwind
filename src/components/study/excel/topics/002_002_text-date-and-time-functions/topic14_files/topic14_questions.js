// topic14_files/topic14_questions.js - Comprehensive Capstone Project FAQs
// Topic 14: Module Project: 20 Real-World Capstone Projects in Text, Date and Time Functions
// Module: 002_002_text-date-and-time-functions

const questions = [
  {
    question: "Why does concatenating a date cell with text in Excel return a five-digit number like 46200 instead of a formatted date?",
    shortAnswer: "Excel stores all dates internally as sequential integer serial numbers (where Jan 1, 1900 = 1). Concatenation forces raw unformatted value coercion unless wrapped in the TEXT() function.",
    explanation: "When you concatenate with `&` or CONCAT, Excel ignores the cell's visual number formatting and pulls its underlying raw numerical value. To preserve date formatting, always use the TEXT function: `= \"Agreement signed on \" & TEXT(B4, \"dd-mmm-yyyy\")`.",
    hint: "Use TEXT(cell, \"format_code\") whenever combining numbers or dates into narrative text sentences.",
    level: "basic",
    codeExample: '="Expires on: " & TEXT(D4, "dd-mmm-yyyy")'
  },
  {
    question: "How does the formula =MOD(End - Start, 1) calculate elapsed hours across midnight without returning a negative or #VALUE! error?",
    shortAnswer: "The MOD function with divisor 1 normalizes negative differences by adding 1.0 (representing 24 full hours) whenever the end time is numerically smaller than the start time.",
    explanation: "Times in Excel are stored as decimal fractions of a day (e.g. 06:00 = 0.25, 18:00 = 0.75). When a night shift starts at 22:00 (0.9167) and ends at 06:00 next day (0.25), direct subtraction yields -0.6667. The modulo function MOD(-0.6667, 1) computes 0.3333 (equivalent to exactly 8 hours). Multiplying by 24 gives 8.0 decimal hours.",
    hint: "MOD(fraction, 1) wraps around 24 hours seamlessly without needing complicated IF(End < Start) conditions.",
    level: "intermediate",
    codeExample: '=MOD(C4 - B4, 1) * 24'
  },
  {
    question: "What is the difference between TRIM and CLEAN, and why is SUBSTITUTE needed for web-scraped whitespace?",
    shortAnswer: "TRIM removes only standard ASCII 32 spaces. CLEAN removes unprintable control characters (ASCII 0-31). Non-breaking web spaces (ASCII 160) require SUBSTITUTE(text, CHAR(160), ' ').",
    explanation: "Web browsers commonly use `&nbsp;` (Unicode/ASCII 160) to prevent line breaks. Excel's standard TRIM function only detects ASCII 32. If your data contains CHAR(160), TRIM leaves it intact, causing lookups and number conversions to fail. The gold-standard data cleaning idiom is `=TRIM(CLEAN(SUBSTITUTE(B4, CHAR(160), \" \")))`.",
    hint: "CHAR(160) is the invisible culprit behind failed TRIM and VLOOKUP operations on web data.",
    level: "intermediate",
    codeExample: '=PROPER(TRIM(CLEAN(SUBSTITUTE(B4, CHAR(160), " "))))'
  },
  {
    question: "How does DATEDIF calculate elapsed time intervals with 'Y', 'YM', and 'MD' arguments?",
    shortAnswer: "'Y' calculates completed full calendar years, 'YM' gives remaining months excluding complete years, and 'MD' calculates remaining days excluding complete months.",
    explanation: "DATEDIF(start_date, end_date, unit) is the most efficient way to build tenure and milestone statements. 'Y' ignores months and days; 'YM' computes `(Total Months) MOD 12`; and 'MD' calculates elapsed days as if both dates occurred in the same month.",
    hint: "Combine 'Y', 'YM', and 'MD' with ampersands to build clean strings like '5 Yrs, 3 Mos, 12 Days'.",
    level: "intermediate",
    codeExample: '=DATEDIF(B4, TODAY(), "Y") & " Yrs, " & DATEDIF(B4, TODAY(), "YM") & " Mos"'
  },
  {
    question: "Why is NETWORKDAYS.INTL preferred over standard NETWORKDAYS in commercial production models?",
    shortAnswer: "NETWORKDAYS.INTL supports customizable weekend patterns (e.g. Sunday-only or custom 7-character binary strings), whereas standard NETWORKDAYS is rigidly locked to Saturday/Sunday.",
    explanation: "Many global industries, retail chains, and manufacturing facilities operate 6-day work weeks or non-Saturday/Sunday shifts. NETWORKDAYS.INTL lets you specify weekend codes (such as code 11 for Sunday only) or binary masks like \"0000001\" (Sunday only off) along with designated corporate holiday ranges.",
    hint: "Use code 11 as the 3rd argument of NETWORKDAYS.INTL for 6-day workplace schedules.",
    level: "advanced",
    codeExample: '=NETWORKDAYS.INTL(B4, C4, 11, $K$4:$K$18)'
  },
  {
    question: "How does NUMBERVALUE safely convert numbers with European or foreign separators compared to VALUE?",
    shortAnswer: "NUMBERVALUE allows explicit definition of the decimal and group separators, eliminating dependence on local operating system Windows regional settings.",
    explanation: "If an overseas vendor provides invoice totals formatted as `1.450,75 €`, using `=VALUE()` on a computer with US/UK regional settings throws `#VALUE!`. With `=NUMBERVALUE(B4, \",\", \".\")`, Excel explicitly recognizes comma as the decimal point and period as the thousands separator.",
    hint: "NUMBERVALUE takes decimal_separator and group_separator as its 2nd and 3rd arguments.",
    level: "advanced",
    codeExample: '=NUMBERVALUE(B4, ",", ".")'
  }
];

export default questions;
