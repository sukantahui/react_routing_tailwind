// Topic 13 Questions
const topic13Questions = [
  {
    "id": "t13_q1",
    "question": "How do you dynamically extract the N-th word from a sentence in Excel 365?",
    "shortAnswer": "=INDEX(TEXTSPLIT(A1, \" \"), n) or =CHOOSEROWS(TOCOL(TEXTSPLIT(A1, \" \")), n).",
    "explanation": "TEXTSPLIT separates words by spaces into an array, and INDEX extracts the specific item at position n.",
    "hint": "Combine INDEX with TEXTSPLIT.",
    "level": "Intermediate",
    "codeExample": "=INDEX(TEXTSPLIT(A1, \" \"), 3) // Extracts 3rd word"
  },
  {
    "id": "t13_q2",
    "question": "How do you extract the N-th word from a sentence in legacy Excel without dynamic arrays?",
    "shortAnswer": "Use TRIM, MID, SUBSTITUTE, and REPT with space padding.",
    "explanation": "Replace spaces with 100 spaces using SUBSTITUTE(A1, ' ', REPT(' ', 100)), slice with MID at ((N-1)*100+1), and wrap in TRIM.",
    "hint": "Classic REPT/MID/SUBSTITUTE space expansion trick.",
    "level": "Advanced",
    "codeExample": "=TRIM(MID(SUBSTITUTE(A1, \" \", REPT(\" \", 100)), (N-1)*100 + 1, 100))"
  },
  {
    "id": "t13_q3",
    "question": "How do you calculate the exact number of Mondays between two arbitrary dates?",
    "shortAnswer": "=NETWORKDAYS.INTL(Start_Date, End_Date, \"0111111\").",
    "explanation": "In NETWORKDAYS.INTL's weekend string, '0' represents a working day and '1' represents a weekend day. '0111111' treats only Monday as a working day.",
    "hint": "Use weekend string '0111111' in NETWORKDAYS.INTL.",
    "level": "Advanced",
    "codeExample": "=NETWORKDAYS.INTL(A1, B1, \"0111111\") // Counts only Mondays"
  },
  {
    "id": "t13_q4",
    "question": "How do you reverse the order of words in a sentence (e.g., 'One Two Three' -> 'Three Two One')?",
    "shortAnswer": "=TEXTJOIN(\" \", TRUE, SORTBY(TEXTSPLIT(A1, \" \"), SEQUENCE(COUNTA(TEXTSPLIT(A1, \" \"))), -1)).",
    "explanation": "TEXTSPLIT generates the word array, SEQUENCE creates indices, SORTBY reverses the indices in descending order (-1), and TEXTJOIN joins them back.",
    "hint": "TEXTSPLIT + SORTBY(..., SEQUENCE, -1) + TEXTJOIN.",
    "level": "Advanced",
    "codeExample": "=LET(\n  w, TEXTSPLIT(A1, \" \"),\n  TEXTJOIN(\" \", TRUE, SORTBY(w, SEQUENCE(COUNTA(w)), -1))\n)"
  },
  {
    "id": "t13_q5",
    "question": "How do you calculate the date of the third Wednesday of a given month and year?",
    "shortAnswer": "=DATE(year, month, 1) + MOD(4 - WEEKDAY(DATE(year, month, 1)), 7) + 14.",
    "explanation": "Locate the first Wednesday of the month using MOD arithmetic, then add 14 days (2 weeks) to reach the 3rd Wednesday.",
    "hint": "Find 1st Wednesday and add 14 days.",
    "level": "Advanced",
    "codeExample": "=LET(d, DATE(2026, 5, 1), d + MOD(4 - WEEKDAY(d), 7) + 14)"
  },
  {
    "id": "t13_q6",
    "question": "How do you extract all unique numbers from a comma-separated string containing duplicates ('10, 20, 10, 30, 20')?",
    "shortAnswer": "=TEXTJOIN(\", \", TRUE, UNIQUE(TOCOL(--TEXTSPLIT(A1, \", \")))).",
    "explanation": "TEXTSPLIT splits the numbers into an array, double unary coerces to numeric, UNIQUE deduplicates, and TEXTJOIN recombines them.",
    "hint": "TEXTSPLIT + UNIQUE + TEXTJOIN pipeline.",
    "level": "Advanced",
    "codeExample": "=TEXTJOIN(\", \", TRUE, UNIQUE(TOCOL(--TEXTSPLIT(A1, \", \"))))"
  },
  {
    "id": "t13_q7",
    "question": "How do you calculate the last business day of the current quarter taking company holidays into account?",
    "shortAnswer": "=WORKDAY(EOMONTH(TODAY(), MOD(12-MONTH(TODAY()),3)) + 1, -1, Holidays).",
    "explanation": "EOMONTH finds the final calendar day of the quarter. Adding 1 moves to the start of next quarter, and WORKDAY(..., -1, holidays) finds the prior business day.",
    "hint": "WORKDAY(-1) from start of next quarter.",
    "level": "Advanced",
    "codeExample": "=LET(\n  q_end, EOMONTH(TODAY(), 3 - MOD(MONTH(TODAY())-1, 3) - 1),\n  WORKDAY(q_end + 1, -1, Holidays)\n)"
  },
  {
    "id": "t13_q8",
    "question": "How do you calculate age in full years, remaining months, and remaining days formatted as 'X yrs, Y mos, Z days'?",
    "shortAnswer": "Combine DATEDIF with 'Y', 'YM', and 'MD' interval codes.",
    "explanation": "DATEDIF(birth, today, 'Y') gets years, 'YM' gets residual months, and 'MD' gets residual days.",
    "hint": "Use DATEDIF with 'Y', 'YM', 'MD'.",
    "level": "Intermediate",
    "codeExample": "=DATEDIF(A1, TODAY(), \"Y\") & \" yrs, \" & DATEDIF(A1, TODAY(), \"YM\") & \" mos, \" & DATEDIF(A1, TODAY(), \"MD\") & \" days\""
  },
  {
    "id": "t13_q9",
    "question": "How do you sum values in column B where dates in column A fall in Q2 of 2026?",
    "shortAnswer": "=SUMIFS(B:B, A:A, \">=2026-04-01\", A:A, \"<=2026-06-30\").",
    "explanation": "SUMIFS tests that dates are greater than or equal to April 1, 2026 and less than or equal to June 30, 2026.",
    "hint": "SUMIFS with start and end date bounds.",
    "level": "Intermediate",
    "codeExample": "=SUMIFS(B2:B100, A2:A100, \">=2026-04-01\", A2:A100, \"<=2026-06-30\")"
  },
  {
    "id": "t13_q10",
    "question": "How do you test whether a year is a leap year in an Excel formula?",
    "shortAnswer": "=MONTH(DATE(Year_Val, 2, 29)) = 2.",
    "explanation": "In a leap year, DATE(year, 2, 29) creates Feb 29 (MONTH=2). In a non-leap year, Excel rolls over to March 1 (MONTH=3).",
    "hint": "Check if MONTH(DATE(year, 2, 29)) equals 2.",
    "level": "Intermediate",
    "codeExample": "=IF(MONTH(DATE(A1, 2, 29)) = 2, \"Leap Year\", \"Common Year\")"
  },
  {
    "id": "t13_q11",
    "question": "How do you extract domain extensions (TLD) from mixed URLs (e.g. '.com', '.co.uk', '.org')?",
    "shortAnswer": "Use TEXTAFTER with instance -1 or REGEXEXTRACT.",
    "explanation": "=TEXTAFTER(TEXTBEFORE(TEXTAFTER(A1, \"://\"), \"/\"), \".\", -1) isolates the top-level domain.",
    "hint": "TEXTAFTER on hostname with instance -1.",
    "level": "Advanced",
    "codeExample": "=TEXTAFTER(TEXTBEFORE(TEXTAFTER(A1,\"://\"),\"/\"), \".\", -1)"
  },
  {
    "id": "t13_q12",
    "question": "How do you generate a spilled list of all dates in the current month?",
    "shortAnswer": "=SEQUENCE(DAY(EOMONTH(TODAY(), 0)), 1, EOMONTH(TODAY(), -1) + 1).",
    "explanation": "EOMONTH(TODAY(), -1) + 1 gives the 1st of the month, and SEQUENCE generates n rows where n is total days in the month.",
    "hint": "SEQUENCE(days_in_month, 1, first_of_month).",
    "level": "Advanced",
    "codeExample": "=SEQUENCE(DAY(EOMONTH(TODAY(), 0)), 1, EOMONTH(TODAY(), -1) + 1)"
  },
  {
    "id": "t13_q13",
    "question": "How do you count the number of words in a cell regardless of extra spaces?",
    "shortAnswer": "=IF(TRIM(A1)=\"\", 0, LEN(TRIM(A1)) - LEN(SUBSTITUTE(TRIM(A1), \" \", \"\")) + 1).",
    "explanation": "TRIM removes irregular spacing. The word count equals the number of remaining single spaces plus 1.",
    "hint": "Count spaces in trimmed string + 1.",
    "level": "Intermediate",
    "codeExample": "=IF(TRIM(A1)=\"\", 0, LEN(TRIM(A1)) - LEN(SUBSTITUTE(TRIM(A1), \" \", \"\")) + 1)"
  },
  {
    "id": "t13_q14",
    "question": "How do you extract only the numeric digits from an alphanumeric code (e.g. 'AB-849#X2' -> '8492')?",
    "shortAnswer": "In Excel 365, use REDUCE with SUBSTITUTE or REGEXREPLACE(A1, \"[^0-9]\", \"\").",
    "explanation": "REGEXREPLACE strips any character that is not a digit (0-9) instantly.",
    "hint": "Use REGEXREPLACE with non-digit pattern.",
    "level": "Advanced",
    "codeExample": "=REGEXREPLACE(A1, \"[^0-9]\", \"\")"
  },
  {
    "id": "t13_q15",
    "question": "How do you calculate the CAGR (Compound Annual Growth Rate) between two dates and values?",
    "shortAnswer": "=(End_Val / Start_Val) ^ (1 / YEARFRAC(Start_Date, End_Date)) - 1.",
    "explanation": "YEARFRAC computes the exact fractional years between dates, and standard compounding formula computes CAGR.",
    "hint": "(End/Start)^(1/YEARFRAC) - 1.",
    "level": "Advanced",
    "codeExample": "=(B2 / A2) ^ (1 / YEARFRAC(C2, D2)) - 1"
  },
  {
    "id": "t13_q16",
    "question": "How do you extract the middle initials from names like 'George H. W. Bush'?",
    "shortAnswer": "Extract all words except first and last, then grab first letters: =CONCAT(LEFT(TEXTSPLIT(TEXTAFTER(TEXTBEFORE(A1,\" \",-1),\" \"),\" \"),1)).",
    "explanation": "Slicing off the first and last word leaves middle names, from which initials are extracted.",
    "hint": "Clip first and last words, then take initial letters.",
    "level": "Advanced",
    "codeExample": "=TEXTJOIN(\"\", TRUE, LEFT(TEXTSPLIT(TEXTAFTER(TEXTBEFORE(A1, \" \", -1), \" \"), \" \"), 1))"
  },
  {
    "id": "t13_q17",
    "question": "How do you calculate the SLA breach datetime (e.g., 16 business hours from ticket creation, working 09:00-17:00 M-F)?",
    "shortAnswer": "Use WORKDAY to add whole business days (16 hrs = 2 days) and add time fraction offset.",
    "explanation": "Since a workday has 8 hours, 16 business hours equals exactly 2 full business days via WORKDAY(Start, 2, Holidays).",
    "hint": "Convert business hours to business days via WORKDAY.",
    "level": "Advanced",
    "codeExample": "=WORKDAY(INT(A1), 2, Holidays) + MOD(A1, 1)"
  },
  {
    "id": "t13_q18",
    "question": "How do you check if two date ranges [Start1, End1] and [Start2, End2] overlap?",
    "shortAnswer": "=MAX(Start1, Start2) <= MIN(End1, End2).",
    "explanation": "Two intervals overlap if and only if the maximum of their start dates is less than or equal to the minimum of their end dates.",
    "hint": "MAX(Starts) <= MIN(Ends).",
    "level": "Intermediate",
    "codeExample": "=IF(MAX(A2, C2) <= MIN(B2, D2), \"Overlapping\", \"No Overlap\")"
  },
  {
    "id": "t13_q19",
    "question": "How do you capitalize the first letter of each sentence in a paragraph (Sentence Case)?",
    "shortAnswer": "Split by period-space '. ', convert first char of each sentence to UPPER, and recombine with TEXTJOIN.",
    "explanation": "TEXTSPLIT by '. ' separates sentences. UPPER(LEFT(s,1)) & LOWER(MID(s,2,LEN(s))) creates sentence casing per array item.",
    "hint": "Split by sentences, capitalize first char, rejoin.",
    "level": "Advanced",
    "codeExample": "=LET(\n  s, TEXTSPLIT(A1, \". \"),\n  TEXTJOIN(\". \", TRUE, UPPER(LEFT(s, 1)) & LOWER(MID(s, 2, 999)))\n)"
  },
  {
    "id": "t13_q20",
    "question": "How do you find the first business day of the next year?",
    "shortAnswer": "=WORKDAY(DATE(YEAR(TODAY())+1, 1, 1) - 1, 1, Holidays).",
    "explanation": "Start from Dec 31 of current year and advance by 1 business day using WORKDAY, skipping New Year's Day and weekends.",
    "hint": "WORKDAY from Dec 31 advancing 1 day.",
    "level": "Intermediate",
    "codeExample": "=WORKDAY(DATE(YEAR(TODAY())+1, 1, 1) - 1, 1, Holidays)"
  },
  {
    "id": "t13_q21",
    "question": "How do you determine which fiscal quarter a date falls into for a fiscal year starting July 1?",
    "shortAnswer": "=\"Q\" & CHOOSE(MONTH(A1), 3, 3, 3, 4, 4, 4, 1, 1, 1, 2, 2, 2).",
    "explanation": "CHOOSE maps each calendar month (1 to 12) directly to its fiscal quarter (July=Q1, Oct=Q2, Jan=Q3, Apr=Q4).",
    "hint": "Use CHOOSE(MONTH(date), ...) mapping.",
    "level": "Intermediate",
    "codeExample": "=\"Q\" & CHOOSE(MONTH(A1), 3, 3, 3, 4, 4, 4, 1, 1, 1, 2, 2, 2)"
  },
  {
    "id": "t13_q22",
    "question": "How do you pad text with trailing dots like a table of contents ('Chapter 1...........54')?",
    "shortAnswer": "=A1 & REPT(\".\", 40 - LEN(A1 & B1)) & B1.",
    "explanation": "REPT generates dots dynamically based on the available character width minus the lengths of title and page number.",
    "hint": "REPT('.', Total_Width - LEN(Title & Page)).",
    "level": "Intermediate",
    "codeExample": "=A1 & REPT(\".\", 40 - LEN(A1 & B1)) & B1"
  },
  {
    "id": "t13_q23",
    "question": "How do you calculate the exact number of days remaining until an annual anniversary/birthday this year?",
    "shortAnswer": "=DATE(YEAR(TODAY()) + (DATE(YEAR(TODAY()), MONTH(A1), DAY(A1)) < TODAY()), MONTH(A1), DAY(A1)) - TODAY().",
    "explanation": "Checks if this year's anniversary has passed. If so, sets the year to next year, then subtracts TODAY().",
    "hint": "Calculate next occurrence date and subtract TODAY().",
    "level": "Advanced",
    "codeExample": "=LET(\n  next_anniv, DATE(YEAR(TODAY()) + (DATE(YEAR(TODAY()), MONTH(A1), DAY(A1)) < TODAY()), MONTH(A1), DAY(A1)),\n  next_anniv - TODAY()\n)"
  },
  {
    "id": "t13_q24",
    "question": "How do you check if a text string is an exact palindrome (reads same forward and backward)?",
    "shortAnswer": "Compare clean string with its reverse: =EXACT(clean, CONCAT(MID(clean, SEQUENCE(LEN(clean), 1, LEN(clean), -1), 1))).",
    "explanation": "SEQUENCE in reverse steps generates letters backwards. CONCAT builds the reversed word, and EXACT checks case-sensitive equality.",
    "hint": "Reverse characters with SEQUENCE and compare with EXACT.",
    "level": "Advanced",
    "codeExample": "=LET(\n  t, LOWER(SUBSTITUTE(A1, \" \", \"\")),\n  rev, CONCAT(MID(t, SEQUENCE(LEN(t), 1, LEN(t), -1), 1)),\n  t = rev\n)"
  },
  {
    "id": "t13_q25",
    "question": "How do you extract all hashtag keywords (e.g., '#excel #finance') from a social media post?",
    "shortAnswer": "=FILTER(TEXTSPLIT(A1, \" \"), LEFT(TEXTSPLIT(A1, \" \"), 1) = \"#\").",
    "explanation": "TEXTSPLIT breaks the sentence into words, and FILTER selects only those words whose first character is '#'.",
    "hint": "FILTER words WHERE LEFT(word, 1) = '#'.",
    "level": "Advanced",
    "codeExample": "=LET(\n  words, TEXTSPLIT(A1, \" \"),\n  FILTER(words, LEFT(words, 1) = \"#\")\n)"
  },
  {
    "id": "t13_q26",
    "question": "How do you calculate working days elapsed in the current month as a percentage of total working days in the month?",
    "shortAnswer": "=NETWORKDAYS(Month_Start, TODAY(), Holidays) / NETWORKDAYS(Month_Start, Month_End, Holidays).",
    "explanation": "Computes business days worked so far divided by total available business days in the full calendar month.",
    "hint": "Ratio of NETWORKDAYS(to_date) over NETWORKDAYS(full_month).",
    "level": "Intermediate",
    "codeExample": "=LET(\n  s, EOMONTH(TODAY(), -1) + 1,\n  e, EOMONTH(TODAY(), 0),\n  NETWORKDAYS(s, TODAY(), Holidays) / NETWORKDAYS(s, e, Holidays)\n)"
  },
  {
    "id": "t13_q27",
    "question": "How do you convert Roman Numerals (e.g. 'XIV') into standard numbers in Excel?",
    "shortAnswer": "=ARABIC(\"XIV\").",
    "explanation": "ARABIC converts Roman numerals to numbers (14). The inverse function ROMAN(14) converts numbers to Roman text.",
    "hint": "Use ARABIC and ROMAN functions.",
    "level": "Basic",
    "codeExample": "=ARABIC(\"XIV\") // Returns: 14\n=ROMAN(14)     // Returns: \"XIV\""
  },
  {
    "id": "t13_q28",
    "question": "How do you calculate the median turnaround time in hours from ticket timestamps ignoring weekends?",
    "shortAnswer": "Compute business duration per row using NETWORKDAYS.INTL and fractional times, then take MEDIAN.",
    "explanation": "Calculate individual net business hours for each ticket row and wrap the array in MEDIAN.",
    "hint": "Array business hours wrapped in MEDIAN.",
    "level": "Advanced",
    "codeExample": "=MEDIAN((NETWORKDAYS(A2:A50, B2:B50) - 1)*8 + (MOD(B2:B50,1) - MOD(A2:A50,1))*24)"
  },
  {
    "id": "t13_q29",
    "question": "How do you strip duplicate consecutive words (e.g., 'the the problem') from text?",
    "shortAnswer": "Use TEXTSPLIT, compare adjacent array elements, and rejoin with TEXTJOIN.",
    "explanation": "Iterating over split words and excluding words identical to their immediate predecessor cleans stutter errors.",
    "hint": "Compare words array with shifted index.",
    "level": "Advanced",
    "codeExample": "=LET(\n  w, TEXTSPLIT(A1, \" \"),\n  n, COUNTA(w),\n  mask, VSTACK(TRUE, DROP(w, 0, 1) <> DROP(w, 0, -1)),\n  TEXTJOIN(\" \", TRUE, FILTER(w, mask))\n)"
  },
  {
    "id": "t13_q30",
    "question": "What is the single most important rule for writing complex text and date formulas in modern Excel?",
    "shortAnswer": "Use LET to name intermediate variables, breaking down complex expressions for readability, reusability, and performance.",
    "explanation": "LET prevents duplicate evaluations of slow sub-formulas (like NETWORKDAYS or complex REGEX), makes formulas readable, and eases debugging.",
    "hint": "Always use LET for clarity and performance.",
    "level": "Intermediate",
    "codeExample": "=LET(\n  raw, A1,\n  clean, TRIM(CLEAN(raw)),\n  date_val, DATEVALUE(LEFT(clean, 10)),\n  date_val\n)"
  }
];

export default topic13Questions;
