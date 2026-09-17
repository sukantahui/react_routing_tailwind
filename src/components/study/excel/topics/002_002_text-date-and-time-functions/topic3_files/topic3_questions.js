// Topic 3 Questions
const topic3Questions = [
  {
    "id": "t3_q1",
    "question": "What is the primary purpose of the TEXT function in Excel, and what is its return data type?",
    "shortAnswer": "The TEXT function converts numbers, dates, and times into text strings formatted according to a specified format mask, always returning a string (text) data type.",
    "explanation": "Syntax: =TEXT(value, format_text). It takes a numeric value, serial date, or time and renders it as text using standard Excel formatting tokens (e.g. \"dd-mmm-yyyy\", \"\u20b9 #,##,##0.00\"). Because it returns text, math operations like SUM will ignore the result unless explicitly coerced.",
    "hint": "TEXT always converts numbers/dates to text strings.",
    "level": "Beginner",
    "codeExample": "=TEXT(45519, \"dd-mmm-yyyy\")  ' Returns \"15-Aug-2024\""
  },
  {
    "id": "t3_q2",
    "question": "What are the four sections of an Excel custom number format mask in the TEXT function, and what controls each section?",
    "shortAnswer": "Positive; Negative; Zero; Text (separated by semicolons).",
    "explanation": "Format syntax: Positive_Format;Negative_Format;Zero_Format;Text_Format. For example, =TEXT(A2, \"$#,##0.00;($#,##0.00);\"\"-\"\";@\") applies green positive display, bracketed negative display, a dash for exact zero, and passes raw text through unchanged.",
    "hint": "4 sections: Positive ; Negative ; Zero ; Text",
    "level": "Intermediate",
    "codeExample": "=TEXT(A2, \"\u20b9 #,##0;[Red](\u20b9 #,##0);\"\"-\"\";@\")"
  },
  {
    "id": "t3_q3",
    "question": "What is the difference between '0', '#', and '?' placeholders in custom number formatting masks?",
    "shortAnswer": "'0' forces leading/trailing zeroes; '#' displays significant digits only without padding; '?' aligns decimal digits with space padding.",
    "explanation": "For the number 5: =TEXT(5, \"000\") yields \"005\". =TEXT(5, \"###\") yields \"5\". =TEXT(5.5, \"0.00\") yields \"5.50\". The '?' token adds a space instead of a digit to ensure decimals align vertically in accounting tables.",
    "hint": "'0' = required digit; '#' = optional digit; '?' = space-padded alignment.",
    "level": "Beginner",
    "codeExample": "=TEXT(A2, \"00000\")  ' Pads employee ID to 5 digits (e.g. \"00123\")"
  },
  {
    "id": "t3_q4",
    "question": "How do you format dates to display the full day name and full month name using the TEXT function?",
    "shortAnswer": "Use the \"dddd, mmmm d, yyyy\" mask.",
    "explanation": "'d' = day number (5); 'dd' = 2-digit day (05); 'ddd' = 3-letter day (Thu); 'dddd' = full day name (Thursday). Similarly, 'm' = 8; 'mm' = 08; 'mmm' = Aug; 'mmmm' = August. =TEXT(TODAY(), \"dddd, mmmm dd, yyyy\") returns e.g. \"Thursday, August 15, 2024\".",
    "hint": "4 'd's = Full Day Name; 4 'm's = Full Month Name.",
    "level": "Beginner",
    "codeExample": "=TEXT(TODAY(), \"dddd, mmmm dd, yyyy\")"
  },
  {
    "id": "t3_q5",
    "question": "How do you format elapsed time exceeding 24 hours (e.g. 38 hours 15 minutes) using the TEXT function?",
    "shortAnswer": "Enclose the hour token in square brackets: \"[h]:mm:ss\".",
    "explanation": "Standard \"hh:mm\" resets to 0 after every 24 hours (so 26 hours renders as 02:00). Enclosing 'h' in brackets \"[h]:mm\" instructs Excel to display total cumulative elapsed hours without modulo-24 reset.",
    "hint": "Square brackets [h] prevent hour reset past 24.",
    "level": "Intermediate",
    "codeExample": "=TEXT(SUM(tblTimes[Duration]), \"[h]:mm:ss\")"
  },
  {
    "id": "t3_q6",
    "question": "How can you format numbers in Indian Lakhs and Crores numbering system using the TEXT function?",
    "shortAnswer": "Use the format mask \"\u20b9 ##,##,##0.00\" or \"\u20b9 [>9999999]##\\,##\\,##0.00;[>99999]##\\,##0.00;##0.00\".",
    "explanation": "In Indian accounting: 1,00,000 is 1 Lakh and 1,00,00,000 is 1 Crore. In Excel, =TEXT(A2, \"\u20b9 ##,##,##0.00\") formats numbers using 2-digit comma grouping after the initial 3-digit thousand unit.",
    "hint": "Use \"\u20b9 ##,##,##0.00\" for Indian numbering formatting.",
    "level": "Intermediate",
    "codeExample": "=TEXT(A2, \"\u20b9 ##,##,##0.00\")"
  },
  {
    "id": "t3_q7",
    "question": "How do you display numbers in thousands (K) or millions (M) using scale-abbreviating format masks in TEXT?",
    "shortAnswer": "Add one trailing comma for thousands (0.0,\"K\") and two trailing commas for millions (0.0,,\"M\").",
    "explanation": "In Excel format masks, a comma placed immediately after the digit placeholder scales the value down by a factor of 1,000. Two commas scale by 1,000,000. For example: =TEXT(5200000, \"$0.0,,\"\"M\"\"\") returns \"$5.2M\", and =TEXT(45000, \"$0,\"\"K\"\"\") returns \"$45K\".",
    "hint": "1 trailing comma = /1,000 (K); 2 trailing commas = /1,000,000 (M).",
    "level": "Advanced",
    "codeExample": "=TEXT(A2, \"\u20b9 0.0,,\"\"M\"\"\")  ' Formats 7500000 to \u20b9 7.5M"
  },
  {
    "id": "t3_q8",
    "question": "How can you apply specific language/locale formatting in the TEXT function (e.g. US English vs Indian English vs French)?",
    "shortAnswer": "Prefix the format mask with a Locale ID tag: [$-409] for US English, [$-4009] for Hindi/India, [$-40C] for French.",
    "explanation": "By default, =TEXT() formats dates using the operating system's regional settings. To force month names to appear in US English regardless of user PC settings, use: =TEXT(A2, \"[$-409]dd-mmmm-yyyy\").",
    "hint": "Use [$-409] to lock formatting strictly to US English.",
    "level": "Advanced",
    "codeExample": "=TEXT(A2, \"[$-409]dddd, mmmm dd, yyyy\")"
  },
  {
    "id": "t3_q9",
    "question": "How do you pad invoice numbers or customer IDs with leading zeroes to a fixed 6-digit length (e.g. 42 to \"INV-000042\")?",
    "shortAnswer": "Combine string prefix with TEXT using six zeroes: =\"INV-\" & TEXT(A2, \"000000\").",
    "explanation": "The format mask \"000000\" ensures that any number smaller than 6 digits is automatically left-padded with zeroes. For 42, it returns \"000042\", creating clean standardized invoice keys.",
    "hint": "Use TEXT(A2, \"000000\") for 6-digit leading zero padding.",
    "level": "Beginner",
    "codeExample": "=\"INV-\" & TEXT(A2, \"000000\")"
  },
  {
    "id": "t3_q10",
    "question": "What is the difference between \"m\" in date formats vs \"m\" in time formats within the TEXT function?",
    "shortAnswer": "Excel determines 'm' based on adjacent tokens: 'm' after 'h' or before 's' is minute; otherwise 'm' is month.",
    "explanation": "If 'm' is preceded by 'h' (e.g. \"hh:mm:ss\"), Excel interprets it as minutes. If 'm' is preceded or followed by 'd' or 'y' (e.g. \"dd/mm/yyyy\"), Excel interprets it as month. If written alone, 'm' defaults to month.",
    "hint": "Next to 'h'/'s' = minute; next to 'd'/'y' = month.",
    "level": "Intermediate",
    "codeExample": "=TEXT(NOW(), \"yyyy-mm-dd hh:mm:ss\")"
  },
  {
    "id": "t3_q11",
    "question": "How do you display phone numbers in standard format \"+91 (033) 2592-1234\" using the TEXT function?",
    "shortAnswer": "Use the mask \"+91 (000) 0000-0000\".",
    "explanation": "=TEXT(A2, \"+91 (000) 0000-0000\") takes a 10-digit raw numeric phone number and automatically inserts area code brackets, spaces, and hyphens without altering the raw numeric underlying data.",
    "hint": "Use digit masks with literal brackets and hyphens.",
    "level": "Beginner",
    "codeExample": "=TEXT(A2, \"+91 (000) 0000-0000\")"
  },
  {
    "id": "t3_q12",
    "question": "How do you format negative numbers in red or brackets in a dashboard text callout using the TEXT function?",
    "shortAnswer": "Specify brackets or minus in the second section: =TEXT(A2, \"\u20b9 #,##0.00;(\u20b9 #,##0.00);\"\"-\"\")\".",
    "explanation": "The second section of the format mask handles negative numbers. Placing parentheses around the mask (e.g. \"(\u20b9 #,##0.00)\") causes negative numbers to render in accounting bracket style.",
    "hint": "Section 2 defines negative number formatting.",
    "level": "Intermediate",
    "codeExample": "=TEXT(A2, \"+\u20b9 #,##0;-\u20b9 #,##0;\"\"-\"\"\")"
  },
  {
    "id": "t3_q13",
    "question": "How do you format a date to show the quarter (e.g. \"Q1-2024\" or \"2024-Q3\") using formulas with TEXT?",
    "shortAnswer": "Combine \"Q\" & ROUNDUP(MONTH(A2)/3, 0) & \"-\" & YEAR(A2) or \"Q\" & INT((MONTH(A2)+2)/3).",
    "explanation": "Excel does not have a native 'Q' format token in the TEXT mask. To generate quarter strings, calculate quarter number via ROUNDUP(MONTH(A2)/3, 0) and concatenate with =TEXT(A2, \"yyyy\"): =\"Q\" & ROUNDUP(MONTH(A2)/3, 0) & \"-\" & TEXT(A2, \"yyyy\").",
    "hint": "Quarter = ROUNDUP(MONTH(A2)/3, 0)",
    "level": "Intermediate",
    "codeExample": "=\"Q\" & ROUNDUP(MONTH(A2)/3, 0) & \"-\" & TEXT(A2, \"yyyy\")"
  },
  {
    "id": "t3_q14",
    "question": "How do you display numbers in scientific notation (e.g. 1.25E+06) using the TEXT function?",
    "shortAnswer": "Use the \"0.00E+00\" format mask.",
    "explanation": "=TEXT(1250000, \"0.00E+00\") returns \"1.25E+06\", which represents numbers scaled to powers of 10 for scientific and engineering reports.",
    "hint": "Use \"0.00E+00\" for scientific notation.",
    "level": "Intermediate",
    "codeExample": "=TEXT(A2, \"0.00E+00\")"
  },
  {
    "id": "t3_q15",
    "question": "Why does =SUM(TEXT(A2:A10, \"0.00\")) return 0 in Excel?",
    "shortAnswer": "The SUM function automatically ignores text strings, and TEXT outputs strings.",
    "explanation": "Because TEXT outputs text data types, passing its array into standard SUM returns 0. To calculate on formatted values, you must coerce them back to numbers with double negative: =SUM(--TEXT(A2:A10, \"0.00\")).",
    "hint": "Prefix with -- inside SUM: SUM(--TEXT(...)).",
    "level": "Intermediate",
    "codeExample": "=SUM(--TEXT(A2:A10, \"0.00\"))"
  },
  {
    "id": "t3_q16",
    "question": "How can you display conditional colors (e.g. [Green], [Red], [Blue]) using the TEXT function?",
    "shortAnswer": "Conditional color tags in TEXT masks only work when rendered directly inside cell custom formatting, but return raw text when evaluated in formula memory.",
    "explanation": "While custom cell number formatting supports [Red] and [Green] visual styling, the =TEXT() formula function evaluates in text memory and will output literal strings without actual color rendering on the grid.",
    "hint": "Color brackets [Red] require Cell Formatting, not formula text.",
    "level": "Advanced",
    "codeExample": "' Use Conditional Formatting for colors, TEXT for strings"
  },
  {
    "id": "t3_q17",
    "question": "How do you display fractions (e.g. 5 1/2 or 3/8) using the TEXT function?",
    "shortAnswer": "Use fraction masks like \"# ?/?\" or \"# ??/??\".",
    "explanation": "=TEXT(5.5, \"# ?/?\") outputs \"5 1/2\". The '?' placeholder instructs Excel to compute the closest rational fraction up to single-digit or double-digit denominators.",
    "hint": "Use \"# ?/?\" for fractional text conversion.",
    "level": "Intermediate",
    "codeExample": "=TEXT(5.75, \"# ?/?\")  ' Returns \"5 3/4\""
  },
  {
    "id": "t3_q18",
    "question": "How do you format a timestamp to include 12-hour AM/PM notation with milliseconds (e.g. \"09:30:15.250 AM\")?",
    "shortAnswer": "Use the format mask \"hh:mm:ss.000 AM/PM\".",
    "explanation": "'000' after the second token captures fractional milliseconds. 'AM/PM' enables 12-hour clock notation: =TEXT(NOW(), \"hh:mm:ss.000 AM/PM\").",
    "hint": "Append .000 for milliseconds and AM/PM for 12-hour clock.",
    "level": "Intermediate",
    "codeExample": "=TEXT(NOW(), \"hh:mm:ss.000 AM/PM\")"
  },
  {
    "id": "t3_q19",
    "question": "How can you build a dynamic sentence displaying project progress (e.g. \"Task 14 of 50 (28.0% Complete)\")?",
    "shortAnswer": "Concatenate COUNT/COUNTA results with TEXT percentage formatting.",
    "explanation": "=\"Task \" & COUNTIF(B2:B50, \"Done\") & \" of \" & COUNTA(A2:A50) & \" (\" & TEXT(COUNTIF(B2:B50, \"Done\")/COUNTA(A2:A50), \"0.0%\") & \" Complete)\".",
    "hint": "Combine progress ratios with TEXT(ratio, \"0.0%\").",
    "level": "Intermediate",
    "codeExample": "=\"Progress: \" & TEXT(B2/C2, \"0.0%\") & \" (\" & B2 & \"/\" & C2 & \")\""
  },
  {
    "id": "t3_q20",
    "question": "What is the escape character used in TEXT format masks to treat special formatting tokens as literal characters?",
    "shortAnswer": "The backslash (\\) character or double quotes (\"\").",
    "explanation": "Tokens like 'd', 'm', 'y', 'h', 's', '0', '#' have built-in meaning. To render a literal 'd' or 'm', prefix with a backslash (e.g. \"\\d\\a\\y: dd\") or enclose in double quotes (e.g. \"\"\"Day: \"\"dd-mmm\").",
    "hint": "Use backslash (\\) or quotes (\"\") to escape literal characters.",
    "level": "Advanced",
    "codeExample": "=TEXT(TODAY(), \"\\D\\a\\y dd \\o\\f mmmm\")"
  },
  {
    "id": "t3_q21",
    "question": "How do you display dates formatted as ISO 8601 standard (\"YYYY-MM-DDTHH:MM:SSZ\") in Excel?",
    "shortAnswer": "Use the mask \"yyyy-mm-dd\"\"T\"\"hh:mm:ss\"\"Z\"\"\".",
    "explanation": "=TEXT(NOW(), \"yyyy-mm-dd\"\"T\"\"hh:mm:ss\"\"Z\"\"\") creates standardized ISO 8601 timestamp strings used by cloud databases, REST APIs, and Power BI.",
    "hint": "Enclose 'T' and 'Z' in double quotes inside the format mask.",
    "level": "Intermediate",
    "codeExample": "=TEXT(NOW(), \"yyyy-mm-dd\"\"T\"\"hh:mm:ss\"\"Z\"\"\")"
  },
  {
    "id": "t3_q22",
    "question": "How do you convert numbers into text words (e.g. 500 into \"Five Hundred\") in standard Excel without VBA?",
    "shortAnswer": "Native Excel does not have a spell-number function; you must use a custom LAMBDA or VBA SpellNumber function.",
    "explanation": "While =TEXT() formats numbers with punctuation and currencies, it cannot convert numeric values into English words (e.g. 100 to 'One Hundred'). In Excel 365, recursive LAMBDA functions or VBA UDFs are required for check writing.",
    "hint": "TEXT formats digits; spell-number requires custom LAMBDA or VBA.",
    "level": "Advanced",
    "codeExample": "' Use custom LAMBDA =SPELLNUMBER(A2) or VBA"
  },
  {
    "id": "t3_q23",
    "question": "How does TEXT handle boolean TRUE and FALSE values passed as the value argument?",
    "shortAnswer": "It converts TRUE to 1 and FALSE to 0, and formats them according to the numeric mask.",
    "explanation": "=TEXT(TRUE, \"0.00\") evaluates TRUE as numeric 1, returning \"1.00\". =TEXT(FALSE, \"0.00\") evaluates FALSE as 0, returning \"0.00\".",
    "hint": "Booleans coerce to 1 (TRUE) and 0 (FALSE) inside TEXT.",
    "level": "Intermediate",
    "codeExample": "=TEXT(A2>100, \"0\")  ' Returns \"1\" if TRUE, \"0\" if FALSE"
  },
  {
    "id": "t3_q24",
    "question": "How do you format a date to display the Buddhist or Hijri calendar using the TEXT function?",
    "shortAnswer": "Use calendar locale tags like [$-1010409] (Hijri) or [$-101041E] (Buddhist).",
    "explanation": "=TEXT(TODAY(), \"[$-1010409]dd-mmmm-yyyy\") formats the date according to the Islamic Hijri calendar; [$-101041E] applies the Buddhist era (BE) calendar.",
    "hint": "Prefix with [$-1010409] for Hijri calendar formatting.",
    "level": "Expert",
    "codeExample": "=TEXT(TODAY(), \"[$-1010409]dd mmmm yyyy\")"
  },
  {
    "id": "t3_q25",
    "question": "How do you display pure positive and negative variances with explicit plus (+) and minus (-) signs (e.g. \"+15.2%\" and \"-4.1%\")?",
    "shortAnswer": "Specify explicit plus and minus signs in sections 1 and 2: \"+0.0%;-0.0%;0.0%\".",
    "explanation": "=TEXT(A2, \"+0.0%;-0.0%;0.0%\"). Section 1 forces a literal '+' for positive numbers, section 2 forces '-' for negatives, and section 3 renders exactly '0.0%' without a sign.",
    "hint": "Format mask: \"+0.0%;-0.0%;0.0%\".",
    "level": "Beginner",
    "codeExample": "=TEXT(B2-C2, \"+0.0%;-0.0%;0.0%\")"
  },
  {
    "id": "t3_q26",
    "question": "What is the result of passing text strings into the TEXT function with a numeric format mask (e.g. =TEXT(\"Hello\", \"$#,##0.00\"))?",
    "shortAnswer": "It returns the original text string (\"Hello\") unchanged.",
    "explanation": "If the input value is already text, Excel bypasses the numeric sections and applies the 4th (text) section, which defaults to '@' (pass text through unchanged).",
    "hint": "Text inputs bypass numeric masks and return unchanged.",
    "level": "Beginner",
    "codeExample": "=TEXT(\"Pending\", \"$0.00\")  ' Returns \"Pending\""
  },
  {
    "id": "t3_q27",
    "question": "How do you hide zero values entirely in a text-formatted table output?",
    "shortAnswer": "Leave the 3rd (zero) section empty: \"$#,##0.00;($#,##0.00);\".",
    "explanation": "Because the 3rd section between semicolons is left blank, any value equal to 0 produces an empty string (\"\"), cleanly suppressing zeroes in financial summaries.",
    "hint": "Leaving section 3 blank suppresses zero values.",
    "level": "Intermediate",
    "codeExample": "=TEXT(A2, \"\u20b9 #,##0;(\u20b9 #,##0);\")"
  },
  {
    "id": "t3_q28",
    "question": "How do you format a number as Roman numerals in Excel?",
    "shortAnswer": "Use the ROMAN function: =ROMAN(number, [form]).",
    "explanation": "While TEXT handles standard numeric masks, converting Arabic numerals to Roman numerals uses the dedicated =ROMAN(A2) function (e.g. =ROMAN(2024) returns \"MMXXIV\").",
    "hint": "Use =ROMAN(A2) to convert numbers to Roman numerals.",
    "level": "Beginner",
    "codeExample": "=ROMAN(2024)  ' Returns \"MMXXIV\""
  },
  {
    "id": "t3_q29",
    "question": "How do you format a date to display Roman numeral months (e.g. \"15-VIII-2024\")?",
    "shortAnswer": "Combine DAY, ROMAN(MONTH), and YEAR.",
    "explanation": "=DAY(A2) & \"-\" & ROMAN(MONTH(A2)) & \"-\" & YEAR(A2). This extracts day and year normally and converts the month number to Roman numerals.",
    "hint": "Use =DAY(A2) & \"-\" & ROMAN(MONTH(A2)) & \"-\" & YEAR(A2).",
    "level": "Intermediate",
    "codeExample": "=DAY(A2) & \"-\" & ROMAN(MONTH(A2)) & \"-\" & YEAR(A2)"
  },
  {
    "id": "t3_q30",
    "question": "What is the recommended practice when preparing numbers formatted with TEXT for export to SQL or CSV files?",
    "shortAnswer": "Only apply TEXT formatting when creating human-readable display fields; keep raw numerical fields unformatted for relational database ingestion.",
    "explanation": "Relational databases (PostgreSQL, MySQL, SQL Server) expect clean floats (e.g. 50000.00) without currency symbols or commas. Applying =TEXT(A2, \"\u20b9 50,000.00\") turns the data into strings, which can cause data-type errors during ETL bulk imports.",
    "hint": "Export clean floats for databases; use TEXT only for human reports.",
    "level": "Intermediate",
    "codeExample": "=ROUND(A2, 2)  ' Numeric float for database export"
  }
];

export default topic3Questions;
