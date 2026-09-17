// Topic 10 Questions
const topic10Questions = [
  {
    "id": "t10_q1",
    "question": "What is the primary function of the VALUE function in Excel?",
    "shortAnswer": "Converts a text string that represents a number into a true numeric value.",
    "explanation": "When numbers are imported from CSV or ERP databases as text strings, VALUE parses recognized currency, percentage, and numeric formats into numbers.",
    "hint": "Converts number strings into numeric values.",
    "level": "Basic",
    "codeExample": "=VALUE(\"$1,250.50\") // Returns numeric: 1250.5"
  },
  {
    "id": "t10_q2",
    "question": "What is the advantage of NUMBERVALUE over VALUE?",
    "shortAnswer": "NUMBERVALUE allows you to explicitly define custom decimal and group (thousand) separators.",
    "explanation": "NUMBERVALUE(text, [decimal_sep], [group_sep]) parses European/international numbers (e.g., '1.250,50 \u20ac') regardless of your computer's Windows regional settings.",
    "hint": "Handles international decimal and thousand separators.",
    "level": "Intermediate",
    "codeExample": "=NUMBERVALUE(\"1.250,50\", \",\", \".\") // Returns numeric: 1250.5"
  },
  {
    "id": "t10_q3",
    "question": "How does the DATEVALUE function work in Excel?",
    "shortAnswer": "Converts a date stored as text into an Excel date serial number.",
    "explanation": "DATEVALUE(\"2026-05-15\") returns 46157 (the serial number representing May 15, 2026), which can then be formatted as a date.",
    "hint": "Converts text dates into integer serial numbers.",
    "level": "Basic",
    "codeExample": "=DATEVALUE(\"15-Aug-2026\") // Returns serial number: 46249"
  },
  {
    "id": "t10_q4",
    "question": "What is the unary double minus (--) operator and how does it compare to VALUE?",
    "shortAnswer": "The double unary (--) coerces text numbers and booleans to numeric values faster and more compactly than VALUE.",
    "explanation": "The first minus coerces text/boolean to a negative number; the second negates it back to positive. It is widely used in SUMPRODUCT and array formulas.",
    "hint": "Double negation operator for type coercion.",
    "level": "Intermediate",
    "codeExample": "=--\"450.75\"         // Returns: 450.75\n=--(A1:A10 > 100)   // Coerces TRUE/FALSE array to 1/0 array"
  },
  {
    "id": "t10_q5",
    "question": "What happens if VALUE is applied to a cell that already contains a numeric value?",
    "shortAnswer": "It simply returns the number unchanged without error.",
    "explanation": "VALUE accepts numbers directly and returns them as-is without raising any errors.",
    "hint": "Numbers remain numbers.",
    "level": "Basic",
    "codeExample": "=VALUE(123.45) // Returns: 123.45"
  },
  {
    "id": "t10_q6",
    "question": "What error does VALUE produce if the text string contains non-convertible alpha characters?",
    "shortAnswer": "A #VALUE! error.",
    "explanation": "If the text contains characters that cannot be interpreted as part of a number, date, or time, Excel returns #VALUE!.",
    "hint": "Standard value conversion failure error.",
    "level": "Basic",
    "codeExample": "=VALUE(\"USD 150.00\") // -> #VALUE! (needs currency code removed)"
  },
  {
    "id": "t10_q7",
    "question": "How does TIMEVALUE convert text time strings?",
    "shortAnswer": "Converts a text time string into a decimal fraction between 0.0 and 0.999988426 representing the time of day.",
    "explanation": "TIMEVALUE(\"6:00 PM\") returns 0.75 (18/24 of a day). It ignores any date portion present in the string.",
    "hint": "Returns fractional day decimal for time strings.",
    "level": "Intermediate",
    "codeExample": "=TIMEVALUE(\"1:30:00 PM\") // Returns: 0.5625"
  },
  {
    "id": "t10_q8",
    "question": "How do you handle trailing minus signs (e.g., '1250.00-') imported from legacy mainframes?",
    "shortAnswer": "Use NUMBERVALUE or an IF statement with RIGHT/LEFT and VALUE.",
    "explanation": "NUMBERVALUE natively supports trailing minus signs like \"1250.00-\" and parses them directly to -1250.00.",
    "hint": "NUMBERVALUE parses trailing minus signs automatically.",
    "level": "Advanced",
    "codeExample": "=NUMBERVALUE(\"1250.00-\") // Returns: -1250"
  },
  {
    "id": "t10_q9",
    "question": "Why does DATEVALUE(\"2026-02-30\") return an error?",
    "shortAnswer": "Because February 30 is an invalid calendar date.",
    "explanation": "DATEVALUE validates Gregorian calendar dates. If a date is impossible (e.g. Feb 30, April 31), it returns #VALUE!.",
    "hint": "DATEVALUE checks calendar validity.",
    "level": "Basic",
    "codeExample": "=DATEVALUE(\"2026-02-30\") // -> #VALUE!"
  },
  {
    "id": "t10_q10",
    "question": "How does DATEVALUE handle two-digit years (e.g., '15-05-26')?",
    "shortAnswer": "It interprets 00-29 as 2000-2029 and 30-99 as 1930-1999 according to Windows 2029 threshold rules.",
    "explanation": "Excel uses the Windows 2029 cutoff rule for two-digit years: 00-29 defaults to 2000s, 30-99 defaults to 1900s.",
    "hint": "Windows two-digit year cutoff threshold.",
    "level": "Intermediate",
    "codeExample": "=YEAR(DATEVALUE(\"05/12/25\")) // -> 2025\n=YEAR(DATEVALUE(\"05/12/35\")) // -> 1935"
  },
  {
    "id": "t10_q11",
    "question": "How can you convert text numbers containing currency symbols from multiple countries (e.g., '\u20ac 1,200', '$ 500', '\u20b9 3,000') to numbers?",
    "shortAnswer": "Strip non-numeric characters using SUBSTITUTE or REGEXREPLACE (Excel 365) before applying VALUE.",
    "explanation": "VALUE fails if unfamiliar currency symbols or irregular spaces precede the number. Cleaning the symbols first ensures clean conversion.",
    "hint": "Remove currency symbols before VALUE.",
    "level": "Intermediate",
    "codeExample": "=VALUE(SUBSTITUTE(SUBSTITUTE(A1, \"\u20ac\", \"\"), \"$\", \"\"))"
  },
  {
    "id": "t10_q12",
    "question": "How do mathematical operations (+0, *1, /1) compare to the VALUE function?",
    "shortAnswer": "Performing any neutral math operation (+0, *1) implicitly coerces text numbers into true numeric values.",
    "explanation": "In Excel, arithmetic operators force type coercion. A1*1 or A1+0 converts text \"100\" to number 100 without needing the VALUE function.",
    "hint": "Neutral arithmetic forces numeric coercion.",
    "level": "Basic",
    "codeExample": "=\"500\" * 1   // Returns numeric 500\n=\"500\" + 0   // Returns numeric 500"
  },
  {
    "id": "t10_q13",
    "question": "How can you convert an entire column of text numbers into real numbers using Excel's UI without formulas?",
    "shortAnswer": "Use Text to Columns (Delimited -> Finish) or Paste Special -> Multiply by 1.",
    "explanation": "Selecting the column and opening Text to Columns then clicking Finish instantly forces Excel to evaluate and convert the text to numbers.",
    "hint": "Text to Columns wizard is the fastest UI method.",
    "level": "Basic",
    "codeExample": "Data tab -> Text to Columns -> Finish"
  },
  {
    "id": "t10_q14",
    "question": "What happens if you use DATEVALUE on a string that includes both date and time (e.g., '2026-05-15 14:30:00')?",
    "shortAnswer": "DATEVALUE converts the date portion and truncates/discards the time portion.",
    "explanation": "DATEVALUE only returns the whole integer serial number representing the date, dropping the decimal fraction representing time.",
    "hint": "DATEVALUE discards the time component.",
    "level": "Intermediate",
    "codeExample": "=DATEVALUE(\"2026-05-15 14:30:00\") // Returns 46157 (date serial only)"
  },
  {
    "id": "t10_q15",
    "question": "How do you combine DATEVALUE and TIMEVALUE to create a full datetime timestamp serial number?",
    "shortAnswer": "Add them together: =DATEVALUE(text) + TIMEVALUE(text).",
    "explanation": "Adding the integer date serial from DATEVALUE to the decimal time fraction from TIMEVALUE produces a complete datetime serial number.",
    "hint": "Sum date serial + time decimal.",
    "level": "Intermediate",
    "codeExample": "=DATEVALUE(\"2026-05-15 14:30:00\") + TIMEVALUE(\"2026-05-15 14:30:00\")\n// Result: 46157.60417"
  },
  {
    "id": "t10_q16",
    "question": "How does NUMBERVALUE handle percentage signs in text strings?",
    "shortAnswer": "NUMBERVALUE automatically parses '%' and divides the value by 100.",
    "explanation": "NUMBERVALUE(\"25.5%\") automatically recognizes the percent sign and converts it to the numeric decimal 0.255.",
    "hint": "Percent signs are automatically converted to decimals.",
    "level": "Intermediate",
    "codeExample": "=NUMBERVALUE(\"18.5%\") // Returns numeric: 0.185"
  },
  {
    "id": "t10_q17",
    "question": "Why does DATEVALUE(\"02/05/2026\") produce May 2nd in US regional settings but February 5th in UK/European settings?",
    "shortAnswer": "DATEVALUE interprets ambiguous date strings according to the host system's Windows regional locale.",
    "explanation": "US systems interpret \"02/05\" as MM/DD, whereas UK/International systems interpret it as DD/MM. To prevent ambiguity, ISO \"YYYY-MM-DD\" format is recommended.",
    "hint": "Locale settings dictate MM/DD vs DD/MM parsing.",
    "level": "Intermediate",
    "codeExample": "=DATEVALUE(\"2026-05-02\") // Unambiguous ISO format everywhere"
  },
  {
    "id": "t10_q18",
    "question": "How do you parse dates formatted as 'YYYYMMDD' (e.g., '20260515') into valid Excel dates?",
    "shortAnswer": "Use DATE with MID, LEFT, and RIGHT: =DATE(LEFT(A1,4), MID(A1,5,2), RIGHT(A1,2)).",
    "explanation": "DATEVALUE often fails on unseparated '20260515'. Slicing the components into DATE(year, month, day) is 100% reliable.",
    "hint": "Extract year, month, day substrings into DATE().",
    "level": "Intermediate",
    "codeExample": "=DATE(LEFT(A1,4), MID(A1,5,2), RIGHT(A1,2))"
  },
  {
    "id": "t10_q19",
    "question": "What function checks whether a cell contains a text string or a real numeric value?",
    "shortAnswer": "ISNUMBER(A1) or ISTEXT(A1).",
    "explanation": "ISNUMBER returns TRUE if the cell holds a true number and FALSE if it holds a text string (even if it looks like a number).",
    "hint": "Use ISNUMBER or ISTEXT type-checking functions.",
    "level": "Basic",
    "codeExample": "=ISNUMBER(\"123\")  // Returns FALSE\n=ISNUMBER(123)    // Returns TRUE"
  },
  {
    "id": "t10_q20",
    "question": "How can you convert scientific notation strings (e.g., '1.25E+04') into standard numbers?",
    "shortAnswer": "VALUE(\"1.25E+04\") or --\"1.25E+04\" natively parses scientific notation.",
    "explanation": "Excel's conversion engine natively understands scientific E-notation strings and returns 12500.",
    "hint": "VALUE natively supports exponential E notation.",
    "level": "Intermediate",
    "codeExample": "=VALUE(\"3.45E+03\") // Returns: 3450"
  },
  {
    "id": "t10_q21",
    "question": "What is the difference between NUMBERVALUE(\"1 250,50\", \",\", \" \") and VALUE(\"1 250,50\") on a US PC?",
    "shortAnswer": "NUMBERVALUE succeeds by defining space as group separator and comma as decimal; VALUE returns #VALUE! error.",
    "explanation": "On a US computer, VALUE expects commas as thousand separators and periods as decimal points.",
    "hint": "Custom separator specification prevents locale errors.",
    "level": "Advanced",
    "codeExample": "=NUMBERVALUE(\"1 250,50\", \",\", \" \") // Returns 1250.5 on all PCs"
  },
  {
    "id": "t10_q22",
    "question": "How do you parse dates formatted as '15.05.2026' into valid date serials on a US computer?",
    "shortAnswer": "Replace periods with slashes/hyphens or extract components with DATE.",
    "explanation": "US systems fail on period-separated dates. =DATEVALUE(SUBSTITUTE(A1,\".\",\"/\")) or DATE(RIGHT(A1,4), MID(A1,4,2), LEFT(A1,2)) resolves it.",
    "hint": "Substitute periods before converting.",
    "level": "Intermediate",
    "codeExample": "=DATE(RIGHT(A1,4), MID(A1,4,2), LEFT(A1,2))"
  },
  {
    "id": "t10_q23",
    "question": "How does Excel handle leading/trailing spaces during VALUE conversion?",
    "shortAnswer": "VALUE automatically ignores and trims leading and trailing standard ASCII spaces.",
    "explanation": "VALUE(\"  450.25  \") successfully evaluates to 450.25. However, non-breaking spaces CHAR(160) will cause #VALUE! unless removed.",
    "hint": "Trims ASCII spaces, but fails on CHAR(160).",
    "level": "Intermediate",
    "codeExample": "=VALUE(\"  99.9  \") // Returns: 99.9"
  },
  {
    "id": "t10_q24",
    "question": "How can you convert text booleans 'TRUE' and 'FALSE' into 1 and 0?",
    "shortAnswer": "Use the double unary: =--\"TRUE\" or =--A1.",
    "explanation": "Double unary coerces boolean TRUE to 1 and FALSE to 0, which is useful for binary filtering and weighted scoring.",
    "hint": "Use double minus -- on boolean text.",
    "level": "Basic",
    "codeExample": "=--\"TRUE\"   // Returns: 1\n=--\"FALSE\"  // Returns: 0"
  },
  {
    "id": "t10_q25",
    "question": "What formula converts time strings formatted as '3h 45m 12s' into decimal hours?",
    "shortAnswer": "Extract numeric components using TEXTBEFORE/TEXTAFTER or REGEX and combine with TIME.",
    "explanation": "Parse hours, minutes, and seconds substrings, multiply by their respective time fractions or pass to TIME().",
    "hint": "Extract numbers before 'h', 'm', 's'.",
    "level": "Advanced",
    "codeExample": "=TIME(TEXTBEFORE(A1,\"h\"), TEXTBETWEEN(A1,\"h \",\"m\"), TEXTBETWEEN(A1,\"m \",\"s\"))*24"
  },
  {
    "id": "t10_q26",
    "question": "Why does SUM(A1:A10) return 0 when the cells contain numbers with green corner triangles?",
    "shortAnswer": "Because the values are stored as text strings; SUM ignores text strings in range arguments.",
    "explanation": "SUM silently ignores text cells. To calculate them, coerce the range into numbers: =SUM(--A1:A10).",
    "hint": "SUM ignores text cells in ranges.",
    "level": "Intermediate",
    "codeExample": "=SUM(--A1:A10) // Forces array coercion and sums correctly"
  },
  {
    "id": "t10_q27",
    "question": "How can you extract numbers embedded in alphanumeric text (e.g., 'INV-00982-2026')?",
    "shortAnswer": "Use TEXTSPLIT/TEXTBETWEEN or MID/FIND to isolate the digit substring, then wrap in VALUE.",
    "explanation": "=VALUE(TEXTSPLIT(A1, \"-\")) extracts each segment, and VALUE converts numerical text blocks to numbers.",
    "hint": "Split delimiters and convert target token.",
    "level": "Intermediate",
    "codeExample": "=VALUE(INDEX(TEXTSPLIT(A1, \"-\"), 2)) // Returns: 982"
  },
  {
    "id": "t10_q28",
    "question": "How do you parse UNIX timestamps (seconds since Jan 1, 1970) into Excel datetime values?",
    "shortAnswer": "=DATE(1970,1,1) + (unix_timestamp / 86400).",
    "explanation": "Divide Unix epoch seconds by 86,400 (seconds per day) and add the base serial date for Jan 1, 1970 (serial 25569).",
    "hint": "Divide seconds by 86400 and add DATE(1970,1,1).",
    "level": "Advanced",
    "codeExample": "=(A1 / 86400) + DATE(1970,1,1) // Formatted as \"yyyy-mm-dd hh:mm:ss\""
  },
  {
    "id": "t10_q29",
    "question": "What is the result of =VALUE(\"(500.00)\")?",
    "shortAnswer": "-500 (negative 500).",
    "explanation": "In standard accounting format, parentheses denote negative numbers. VALUE recognizes parentheses as negative signs.",
    "hint": "Accounting parentheses convert to negative numbers.",
    "level": "Basic",
    "codeExample": "=VALUE(\"(500.00)\") // Returns: -500"
  },
  {
    "id": "t10_q30",
    "question": "What is the best formula pattern for error-safe number conversion when some cells contain invalid text?",
    "shortAnswer": "=IFERROR(VALUE(A1), 0) or =IFERROR(--A1, 0).",
    "explanation": "Wrapping the conversion in IFERROR ensures that header labels, blank strings, or corrupt data fall back to a default value (like 0 or empty \"\").",
    "hint": "Wrap conversion in IFERROR.",
    "level": "Basic",
    "codeExample": "=IFERROR(--A1, 0)"
  }
];

export default topic10Questions;
