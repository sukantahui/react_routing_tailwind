export const excelModuleProjectsData = {
  projectCategory: "Module Capstone Projects: 20 Real-World Text, Date & Time Applications",
  subject: "Microsoft Excel Practical Workplace Modeling & Audit Lab",
  trackCode: "EXCEL-MOD-202-PRJ",
  level: "Beginner to Advanced Workplace Scenarios",
  tools: [
    "Excel 365",
    "Excel 2021",
    "Excel Online",
    "Power Query"
  ],
  institute: {
    author: "Sukanta Hui",
    name: "Coder & AccoTax",
    location: "Barrackpore & Naihati"
  },
  projects: [
    {
      projectId: "PRJ-TDT-01",
      title: "Employee Full Name & Title Harmonizer",
      difficulty: "beginner",
      sheetName: "PRJ_TDT_01",
      formula: '=PROPER(TRIM(CLEAN(SUBSTITUTE(B4, CHAR(160), " "))))',
      description: "As an HR Systems Auditor, you are importing candidate records from legacy web forms. Column B contains names with irregular upper/lower casing, unwanted ASCII/Unicode non-breaking spaces (CHAR 160), tab spaces, and excess padding. Clean, standardize, and format each employee name into clean Title Case.",
      requirements: [
        "Open worksheet **PRJ_TDT_01** and locate messy records in range **B4:B30**.",
        "In cell **C4**, write a nested formula using **SUBSTITUTE**, **CLEAN**, **TRIM**, and **PROPER** to strip invisible non-breaking spaces (code 160) and unprintable control characters.",
        "Ensure multi-word strings have exactly one single space between names and each token is correctly capitalized.",
        "Fill the formula down to row 30.",
        "Verify that leading, trailing, and embedded double spaces are fully eradicated."
      ],
      stepByStep: "1. **Select Cell C4**: Click cell C4 on worksheet PRJ_TDT_01.\n2. **Handle Non-Breaking Spaces**: Wrap the reference with `=SUBSTITUTE(B4, CHAR(160), \" \")` to convert non-breaking web spaces to regular spaces.\n3. **Remove Control Characters**: Enclose with `CLEAN(...)` to strip ASCII characters 0-31.\n4. **Collapse Whitespace**: Enclose with `TRIM(...)` to leave only single spaces between words.\n5. **Apply Proper Casing**: Wrap the entire expression with `PROPER(...)`.\n6. **Double-click Fill Handle**: Copy formula from C4 down to C30.",
      rawMemoryVsRendered: {
        raw: "   dr.   sAnJAy   kUMAr  gHOSH   ",
        mask: "Clean Text String",
        rendered: "Dr. Sanjay Kumar Ghosh"
      },
      expectedOutput: "| Raw Input (B4) | Formula Applied | Sanitized Output (C4) | Audit Status |\n| -------------- | --------------- | ---------------------- | ------------ |\n| `   aMitAbh  bose  ` | `=PROPER(TRIM(CLEAN(SUBSTITUTE(B4, CHAR(160), \\\" \\\"))))` | `Amitabh Bose` | Verified |\n| `PRIYA   dEvI  ` | `=PROPER(TRIM(CLEAN(SUBSTITUTE(B4, CHAR(160), \\\" \\\"))))` | `Priya Devi` | Verified |",
      proTip: "Regular TRIM only removes ASCII space 32! It completely ignores web non-breaking space CHAR(160). Always nest SUBSTITUTE(B4, CHAR(160), \" \") inside TRIM for web-scraped data."
    },
    {
      projectId: "PRJ-TDT-02",
      title: "Smart Corporate Email & Username Generator",
      difficulty: "beginner",
      sheetName: "PRJ_TDT_02",
      formula: '=LOWER(LEFT(B4, 1) & "." & MID(B4, SEARCH(" ", B4) + 1, LEN(B4)) & "@coderaccotax.in")',
      description: "Automate corporate IT provisioning by creating standard corporate email addresses (`firstInitial.lastName@coderaccotax.in`) from employee full names formatted as 'FirstName LastName'.",
      requirements: [
        "In worksheet **PRJ_TDT_02**, inspect candidate names in **B4:B30**.",
        "In cell **C4**, extract the first letter of the first name using **LEFT**.",
        "Locate the space separator using **SEARCH** to dynamically extract the full surname using **MID**.",
        "Concatenate the first initial, period, surname, and domain `@coderaccotax.in`.",
        "Ensure all email characters are strictly lowercase using **LOWER**."
      ],
      stepByStep: "1. **Navigate to C4**: Click cell C4.\n2. **Extract Initial**: Use `LEFT(B4, 1)`.\n3. **Locate Delimiter**: Calculate the start index of the surname using `SEARCH(\" \", B4) + 1`.\n4. **Extract Surname**: Use `MID(B4, SEARCH(\" \", B4) + 1, LEN(B4))`.\n5. **Combine & Lowercase**: Combine parts with `&` operator and enclose within `=LOWER(...)`.\n6. **Validate Downward**: Populate through row 30.",
      rawMemoryVsRendered: {
        raw: "Rahul Chatterjee",
        mask: "Standard Email URI",
        rendered: "r.chatterjee@coderaccotax.in"
      },
      expectedOutput: "| Full Name (B4) | Generated Email (C4) | Domain Check |\n| -------------- | -------------------- | ------------ |\n| Subhashree Roy | `s.roy@coderaccotax.in` | Validated |\n| Tanmoy Sen | `t.sen@coderaccotax.in` | Validated |",
      proTip: "Use SEARCH rather than FIND when handling text where case-insensitive matching is preferred. SEARCH also supports wildcards (* and ?) if needed."
    },
    {
      projectId: "PRJ-TDT-03",
      title: "PCI-DSS Compliant Credit Card & Account Masker",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_03",
      formula: '=REPT("•", LEN(SUBSTITUTE(B4, "-", "")) - 4) & "-" & RIGHT(SUBSTITUTE(B4, "-", ""), 4)',
      description: "Financial regulatory compliance (RBI / PCI-DSS) strictly forbids storing or displaying plain-text account and card numbers. Build an automated masking engine that replaces all leading digits with bullet glyphs (`•`) while exposing only the last 4 verification digits.",
      requirements: [
        "Open worksheet **PRJ_TDT_03** with raw card and bank account numbers in **B4:B30**.",
        "Sanitize hyphens or space delimiters using **SUBSTITUTE**.",
        "Use **LEN** to determine total string length and **REPT** to generate matching bullet masks for all characters except the last four.",
        "Append a hyphen and the last 4 characters using **RIGHT** in cell **C4**.",
        "Confirm the formula adapts accurately for 12-digit, 14-digit, and 16-digit card/account numbers."
      ],
      stepByStep: "1. **Access Cell C4**: Click cell C4.\n2. **Strip Hyphens**: Test `=SUBSTITUTE(B4, \"-\", \"\")` to normalize.\n3. **Calculate Mask Count**: Compute mask length using `LEN(SUBSTITUTE(B4, \"-\", \"\")) - 4`.\n4. **Build Repeat Mask**: Generate bullets using `REPT(\"•\", ...)`.\n5. **Append Suffix**: Add `& \"-\" & RIGHT(SUBSTITUTE(B4, \"-\", \"\"), 4)`.\n6. **Deploy Downward**: Drag down across range C4:C30.",
      rawMemoryVsRendered: {
        raw: "4532-8921-7832-9014",
        mask: "Masked Token",
        rendered: "••••••••••••-9014"
      },
      expectedOutput: "| Raw Account / Card (B4) | Masked Output (C4) | Security Audit |\n| ----------------------- | ------------------ | -------------- |\n| 5421-9820-1123-4589     | `••••••••••••-4589` | PCI Compliant  |\n| 6071882910394811        | `••••••••••••-4811` | PCI Compliant  |",
      proTip: "Using REPT with Unicode bullet character `•` (Alt + 0149 or CHAR(149)) provides clean, professional executive dashboard visuals compared to plain asterisks."
    },
    {
      projectId: "PRJ-TDT-04",
      title: "Multi-Tenant SKU & Logistics Code Segmenter",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_04",
      formula: '=TEXTSPLIT(B4, "-")',
      description: "An e-commerce fulfillment warehouse uses compound barcode serials such as `IND-KOL-WH2-ELEC-89021-A`. Using Excel 365 modern dynamic array functions, split each SKU code across adjacent columns into Country, Hub, Warehouse, Category, Serial, and Grade.",
      requirements: [
        "In worksheet **PRJ_TDT_04**, inspect inventory SKUs in **B4:B30**.",
        "In cell **C4**, enter the dynamic array formula `=TEXTSPLIT(B4, \"-\")`.",
        "Verify that the formula naturally spills across columns C, D, E, F, G, and H without dragging horizontally.",
        "If using legacy Excel 2019/2016, verify the fallback MID + FIND solution.",
        "Ensure all SKU elements are extracted cleanly without trailing delimiters."
      ],
      stepByStep: "1. **Select Cell C4**: Click cell C4 on worksheet PRJ_TDT_04.\n2. **Enter TEXTSPLIT**: Type `=TEXTSPLIT(B4, \"-\")` and press **Enter**.\n3. **Observe Dynamic Spill**: Notice the blue spill outline across columns C4:H4.\n4. **Copy Down Vertically**: Drag the fill handle of C4 down to C30.\n5. **Check Header Alignment**: Columns align: Country, City, Warehouse, Dept, ItemID, Grade.",
      rawMemoryVsRendered: {
        raw: "IND-KOL-WH2-ELEC-89021-A",
        mask: "Spilled Array",
        rendered: "IND | KOL | WH2 | ELEC | 89021 | A"
      },
      expectedOutput: "| SKU Code (B4) | C4 (Country) | D4 (City) | E4 (Facility) | F4 (Dept) | G4 (Serial) | H4 (Grade) |\n| ------------- | ------------ | --------- | ------------- | --------- | ----------- | ---------- |\n| IND-DEL-WH1-FURN-33201-B | IND | DEL | WH1 | FURN | 33201 | B |",
      proTip: "TEXTSPLIT also accepts row delimiters as its 3rd argument! You can split text into a multi-row, multi-column 2D grid in one single calculation."
    },
    {
      projectId: "PRJ-TDT-05",
      title: "International E.164 Telecom Number Formatter",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_05",
      formula: '="+91 " & TEXT(VALUE(RIGHT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(B4, " ", ""), "-", ""), "+91", ""), 10)), "00000-00000")',
      description: "Cleanse customer call center lead databases with varying phone number entries (e.g. `9830012345`, `+91 98300 12345`, `098300-12345`). Standardize all entries into international carrier format `+91 XXXXX-XXXXX`.",
      requirements: [
        "In worksheet **PRJ_TDT_05**, inspect raw phone records in **B4:B30**.",
        "Strip spaces, hyphens, and existing country prefixes using nested **SUBSTITUTE**.",
        "Extract the core 10-digit national number using **RIGHT**.",
        "Coerce to numeric using **VALUE** and apply custom numeric display formatting via **TEXT** mask `\"00000-00000\"`.",
        "Prefix with `+91 ` in cell **C4** and copy down to C30."
      ],
      stepByStep: "1. **Select Cell C4**: Click cell C4.\n2. **Strip Delimiters**: Apply `=SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(B4, \" \", \"\"), \"-\", \"\"), \"+91\", \"\")`.\n3. **Extract 10 Digits**: Wrap with `RIGHT(..., 10)`.\n4. **Convert & Format**: Wrap with `TEXT(VALUE(...), \"00000-00000\")`.\n5. **Add Country Code**: Prepend `\"+91 \" & `.\n6. **Verify Range**: Double-click fill handle down to C30.",
      rawMemoryVsRendered: {
        raw: "098301-44552",
        mask: "Carrier Mask",
        rendered: "+91 98301-44552"
      },
      expectedOutput: "| Raw Contact (B4) | Formatted E.164 Phone (C4) | Status |\n| ---------------- | -------------------------- | ------ |\n| `+91 98300 12345` | `+91 98300-12345` | Standardized |\n| `9830012345` | `+91 98300-12345` | Standardized |",
      proTip: "Always convert the 10-digit text substring to numeric with VALUE before passing to TEXT so that custom zero-padded digit masks (like 00000-00000) take effect correctly."
    },
    {
      projectId: "PRJ-TDT-06",
      title: "Automated Contract Narrative & Expiry Builder",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_06",
      formula: '="Service Contract with " & B4 & " for " & TEXT(C4, "₹#,##0.00") & " executed on " & TEXT(D4, "dddd, mmmm dd, yyyy") & " (Valid until: " & TEXT(EDATE(D4, E4), "dd-mmm-yyyy") & ")"',
      description: "Corporate legal operations require automated boilerplate executive clauses. Assemble a multi-variable contract summary string combining Vendor Name (B4), Contract Value (C4), Start Date (D4), and Duration in Months (E4).",
      requirements: [
        "In worksheet **PRJ_TDT_06**, review vendor parameters across columns B, C, D, and E.",
        "In cell **F4**, build a narrative sentence string using concatenation.",
        "Format contract amounts using **TEXT** with currency mask `\"₹#,##0.00\"`.",
        "Format the commencement date as full day and month name (`\"dddd, mmmm dd, yyyy\"`).",
        "Calculate the contract expiry milestone using **EDATE(D4, E4)** and format as `\"dd-mmm-yyyy\"`."
      ],
      stepByStep: "1. **Click Cell F4**: Navigate to row 4.\n2. **Concatenate Vendor**: Start with `=\"Service Contract with \" & B4 & \" for \"`.\n3. **Format Currency**: Append `TEXT(C4, \"₹#,##0.00\") & \" executed on \"`.\n4. **Format Start Date**: Append `TEXT(D4, \"dddd, mmmm dd, yyyy\")`.\n5. **Calculate Expiry**: Append `\" (Valid until: \" & TEXT(EDATE(D4, E4), \"dd-mmm-yyyy\") & \")\"`.\n6. **Copy Down**: Apply down to F30.",
      rawMemoryVsRendered: {
        raw: "Vendor: Apex Labs | Amt: 450000 | Date: 46100 | Mos: 12",
        mask: "Narrative Clause",
        rendered: "Service Contract with Apex Labs for ₹4,50,000.00 executed on Wednesday, April 01, 2026 (Valid until: 01-Apr-2027)"
      },
      expectedOutput: "| Vendor (B4) | Value (C4) | Start (D4) | Mos (E4) | Executive Contract Clause (F4) |\n| ----------- | ---------- | ---------- | -------- | ------------------------------ |\n| Horizon Tech | 250000 | 15-May-2026 | 6 | Service Contract with Horizon Tech for ₹2,50,000.00 executed on Friday, May 15, 2026 (Valid until: 15-Nov-2026) |",
      proTip: "Without the TEXT function, concatenating raw Excel dates yields serial numbers like '46100', and numbers lose their currency symbols and commas!"
    },
    {
      projectId: "PRJ-TDT-07",
      title: "Fiscal Year & Tax Quarter Allocator (Indian FY)",
      difficulty: "advanced",
      sheetName: "PRJ_TDT_07",
      formula: '="FY " & IF(MONTH(B4)>=4, YEAR(B4) & "-" & RIGHT(YEAR(B4)+1, 2), (YEAR(B4)-1) & "-" & RIGHT(YEAR(B4), 2)) & " | Q" & CHOOSE(MONTH(B4), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)',
      description: "Indian corporate taxation, GST, and MCA reporting operate on an April 1st to March 31st financial calendar. Build an automated formula that converts invoice transaction dates in column B into the appropriate Fiscal Year label (e.g. `FY 2026-27`) and Tax Quarter (`Q1` to `Q4`).",
      requirements: [
        "In worksheet **PRJ_TDT_07**, inspect invoice dates in **B4:B30**.",
        "In cell **C4**, write a formula that checks if `MONTH(B4) >= 4`.",
        "If true, the fiscal year begins in `YEAR(B4)` and ends in `YEAR(B4)+1`. Otherwise, it began in `YEAR(B4)-1`.",
        "Map months 1, 2, 3 to Q4; months 4, 5, 6 to Q1; months 7, 8, 9 to Q2; and months 10, 11, 12 to Q3 using **CHOOSE**.",
        "Combine the output as `\"FY 2026-27 | Q1\"` and fill down to row 30."
      ],
      stepByStep: "1. **Navigate to C4**: Select cell C4 on worksheet PRJ_TDT_07.\n2. **Determine FY Boundary**: Use `=IF(MONTH(B4)>=4, YEAR(B4)&\"-\"&RIGHT(YEAR(B4)+1,2), (YEAR(B4)-1)&\"-\"&RIGHT(YEAR(B4),2))`.\n3. **Map Fiscal Quarter**: Use `CHOOSE(MONTH(B4), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)`.\n4. **Assemble Output**: Prefix with `\"FY \" & ... & \" | Q\" & ...`.\n5. **Audit Cross-Year Cases**: Verify dates in January, February, and March correctly fall into Q4 of the previous calendar year.",
      rawMemoryVsRendered: {
        raw: "15-Feb-2027",
        mask: "Fiscal Label",
        rendered: "FY 2026-27 | Q4"
      },
      expectedOutput: "| Invoice Date (B4) | Month Index | Fiscal Period (C4) | Tax Bracket |\n| ----------------- | ----------- | ------------------ | ----------- |\n| 10-May-2026       | 5           | `FY 2026-27 | Q1`   | Verified    |\n| 22-Jan-2027       | 1           | `FY 2026-27 | Q4`   | Verified    |",
      proTip: "CHOOSE is vastly superior and cleaner than 4 nested IF statements when mapping 12 months to non-standard fiscal quarters!"
    },
    {
      projectId: "PRJ-TDT-08",
      title: "Employee Service Tenure & Gratuity Calculator",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_08",
      formula: '=DATEDIF(B4, TODAY(), "Y") & " Yrs, " & DATEDIF(B4, TODAY(), "YM") & " Mos, " & DATEDIF(B4, TODAY(), "MD") & " Days"',
      description: "Calculate exact completed employee service tenures from date of joining (column B) to current date (TODAY) expressed in Years, Months, and Days for Gratuity Act eligibility (5+ completed years threshold).",
      requirements: [
        "In worksheet **PRJ_TDT_08**, inspect employee joining dates in **B4:B30**.",
        "In cell **C4**, calculate completed full years using `DATEDIF(B4, TODAY(), \"Y\")`.",
        "Calculate remaining months excluding years using `DATEDIF(B4, TODAY(), \"YM\")`.",
        "Calculate remaining days excluding full months using `DATEDIF(B4, TODAY(), \"MD\")`.",
        "In cell **D4**, write an eligibility audit formula: `=IF(DATEDIF(B4, TODAY(), \"Y\")>=5, \"ELIGIBLE FOR GRATUITY\", \"INELIGIBLE\")`."
      ],
      stepByStep: "1. **Select Cell C4**: Click cell C4.\n2. **Compute Full Years**: Enter `DATEDIF(B4, TODAY(), \"Y\") & \" Yrs, \"`.\n3. **Compute Remaining Months**: Append `DATEDIF(B4, TODAY(), \"YM\") & \" Mos, \"`.\n4. **Compute Remaining Days**: Append `DATEDIF(B4, TODAY(), \"MD\") & \" Days\"`.\n5. **Add Eligibility Flag**: In cell D4, add `=IF(DATEDIF(B4, TODAY(), \"Y\")>=5, \"ELIGIBLE\", \"PENDING\")`.\n6. **Copy Down**: Drag formulas down to row 30.",
      rawMemoryVsRendered: {
        raw: "10-Aug-2018",
        mask: "Tenure String",
        rendered: "8 Yrs, 1 Mos, 6 Days"
      },
      expectedOutput: "| Joining Date (B4) | Service Tenure (C4) | Gratuity Status (D4) |\n| ------------------ | ------------------- | -------------------- |\n| 01-Jul-2015        | 11 Yrs, 2 Mos, 15 Days | ELIGIBLE FOR GRATUITY |\n| 14-Oct-2023        | 2 Yrs, 11 Mos, 2 Days  | INELIGIBLE           |",
      proTip: "DATEDIF is a documented compatibility function in Excel. Remember that interval code 'YM' computes remaining months after full years, and 'MD' calculates remaining days after full months."
    },
    {
      projectId: "PRJ-TDT-09",
      title: "Project SLA Net Working Days Calculator",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_09",
      formula: '=NETWORKDAYS.INTL(B4, C4, 1, $K$4:$K$18)',
      description: "IT service desk tickets and software deliverable SLAs require computing exact billable business working days between Ticket Created Date (B4) and Resolved Date (C4), strictly omitting Saturday/Sunday weekends and gazetted public holidays listed in range K4:K18.",
      requirements: [
        "In worksheet **PRJ_TDT_09**, inspect ticket start dates in **B4:B30** and end dates in **C4:C30**.",
        "Locate the holiday master list in range **K4:K18**.",
        "In cell **D4**, enter formula `=NETWORKDAYS.INTL(B4, C4, 1, $K$4:$K$18)`.",
        "Ensure holiday range is locked as absolute reference (`$K$4:$K$18`).",
        "In cell **E4**, flag tickets breaching SLA (>10 working days): `=IF(D4>10, \"SLA BREACH\", \"WITHIN SLA\")`."
      ],
      stepByStep: "1. **Click Cell D4**: Navigate to column D.\n2. **Write Formula**: Enter `=NETWORKDAYS.INTL(B4, C4, 1, $K$4:$K$18)`.\n3. **Notice Weekend Parameter**: Value `1` denotes standard Saturday + Sunday weekend.\n4. **Add SLA Breach Flag**: In E4, enter `=IF(D4>10, \"SLA BREACH\", \"WITHIN SLA\")`.\n5. **Fill Both Columns**: Drag D4:E4 down through row 30.",
      rawMemoryVsRendered: {
        raw: "Start: 01-Oct-2026 | End: 20-Oct-2026 | Holidays: 3",
        mask: "Integer Count",
        rendered: "11 Net Business Days"
      },
      expectedOutput: "| Start Date (B4) | End Date (C4) | Net Working Days (D4) | Compliance (E4) |\n| --------------- | ------------- | --------------------- | --------------- |\n| 01-Oct-2026     | 08-Oct-2026   | 5                     | WITHIN SLA      |\n| 01-Oct-2026     | 25-Oct-2026   | 14                    | SLA BREACH      |",
      proTip: "NETWORKDAYS.INTL accepts custom 7-character binary weekend strings such as \"0000011\" (Sat/Sun off) or \"0000001\" (Sunday only off), giving full flexibility for Middle East or retail shift schedules."
    },
    {
      projectId: "PRJ-TDT-10",
      title: "Manufacturing Target Delivery Date Forecaster",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_10",
      formula: '=WORKDAY.INTL(B4, C4, 11, $K$4:$K$18)',
      description: "A factory operates on a 6-day work week where Sunday is the sole weekend day off (code 11). Given Job Order Start Date (B4) and required manufacturing duration in production days (C4), forecast the exact Target Completion Date skipping Sundays and official plant shutdown holidays.",
      requirements: [
        "In worksheet **PRJ_TDT_10**, check Job Start Dates in **B4:B30** and Lead Times in **C4:C30**.",
        "Locate plant holiday closures in **K4:K18**.",
        "In cell **D4**, enter formula `=WORKDAY.INTL(B4, C4, 11, $K$4:$K$18)`.",
        "Format cell D4 as date mask `dd-mmm-yyyy (dddd)`.",
        "Double-click to fill down through row 30."
      ],
      stepByStep: "1. **Select Cell D4**: Click cell D4 on worksheet PRJ_TDT_10.\n2. **Enter WORKDAY.INTL**: Type `=WORKDAY.INTL(B4, C4, 11, $K$4:$K$18)`.\n3. **Understand Argument 11**: Code `11` specifies Sunday-only weekend.\n4. **Format Date Output**: Press **Ctrl + 1**, choose Custom, enter `dd-mmm-yyyy (dddd)`.\n5. **Propagate Down**: Fill down to D30.",
      rawMemoryVsRendered: {
        raw: "46320",
        mask: "dd-mmm-yyyy (dddd)",
        rendered: "28-Nov-2026 (Saturday)"
      },
      expectedOutput: "| Start Date (B4) | Lead Days (C4) | Promised Delivery Date (D4) | Status |\n| --------------- | -------------- | --------------------------- | ------ |\n| 02-Nov-2026     | 18             | 24-Nov-2026 (Tuesday)       | Target Set |\n| 10-Nov-2026     | 25             | 10-Dec-2026 (Thursday)      | Target Set |",
      proTip: "Unlike basic WORKDAY which assumes Sat/Sun off, WORKDAY.INTL supports 17 distinct weekend codes. Code 11 is essential for Indian and Asian 6-day commercial establishments."
    },
    {
      projectId: "PRJ-TDT-11",
      title: "Commercial Banking EMI & Maturity Scheduler",
      difficulty: "beginner",
      sheetName: "PRJ_TDT_11",
      formula: '=EOMONTH(B4, C4)',
      description: "A commercial banking loan desk issues corporate credit facilities. Loans mature exactly on the final calendar day of the maturity month (N months after disbursement). Calculate exact maturity dates and quarterly billing cycles.",
      requirements: [
        "In worksheet **PRJ_TDT_11**, locate disbursement dates in **B4:B30** and tenure in months in **C4:C30**.",
        "In cell **D4**, write formula `=EOMONTH(B4, C4)` to compute the final calendar date of the repayment month.",
        "In cell **E4**, write formula `=EDATE(B4, 1)` to compute the first monthly EMI payment due date.",
        "Apply date formatting `dd-mmm-yyyy` across columns D and E.",
        "Verify leap year February handling (e.g. 28 vs 29 days)."
      ],
      stepByStep: "1. **Select Cell D4**: Click cell D4.\n2. **Apply EOMONTH**: Type `=EOMONTH(B4, C4)` and press **Enter**.\n3. **Apply EDATE in E4**: Type `=EDATE(B4, 1)` for initial installment date.\n4. **Format Range**: Highlight D4:E30, press **Ctrl + Shift + 3** for default date format.\n5. **Copy Down**: Double-click fill handle.",
      rawMemoryVsRendered: {
        raw: "46387",
        mask: "dd-mmm-yyyy",
        rendered: "31-Jan-2027"
      },
      expectedOutput: "| Disbursement (B4) | Tenure Mos (C4) | Maturity Date (D4) | 1st EMI Due (E4) |\n| ------------------ | --------------- | ------------------ | ---------------- |\n| 15-Jan-2026        | 12              | 31-Jan-2027        | 15-Feb-2026      |\n| 20-Feb-2028        | 24              | 29-Feb-2030        | 20-Mar-2028      |",
      proTip: "EOMONTH(date, 0) is the standard Excel idiom to get the last day of the current month! EOMONTH(date, -1) + 1 gives the first day of the current month."
    },
    {
      projectId: "PRJ-TDT-12",
      title: "Overnight Factory Shift Duration & Decimal Hours",
      difficulty: "advanced",
      sheetName: "PRJ_TDT_12",
      formula: '=MOD(C4 - B4, 1) * 24',
      description: "A 24x7 chemical plant operates night shifts where workers punch in at 20:00 (8:00 PM) and punch out at 04:30 (4:30 AM next day). In plain subtraction, `04:30 - 20:00` returns a negative number (`#####`). Use the mathematical MOD function to correctly compute elapsed decimal hours spanning midnight.",
      requirements: [
        "In worksheet **PRJ_TDT_12**, inspect shift Start Times in **B4:B30** and End Times in **C4:C30**.",
        "In cell **D4**, write formula `=MOD(C4 - B4, 1) * 24` to compute elapsed decimal hours.",
        "In cell **E4**, write formula `=MOD(C4 - B4, 1)` and format as `[h]:mm` to display standard clock duration.",
        "Verify that both daytime shifts (09:00 to 17:30) and overnight shifts (21:30 to 06:00) yield positive, accurate numbers.",
        "Copy formulas down through row 30."
      ],
      stepByStep: "1. **Navigate to D4**: Click cell D4 on worksheet PRJ_TDT_12.\n2. **Understand Date-Time Math**: Excel times are fractions of a day (24 hours = 1.0).\n3. **Apply MOD 1**: `=MOD(C4 - B4, 1)` normalizes negative differences by adding 1.0 (24 hours) whenever end time is smaller than start time.\n4. **Convert to Decimal Hours**: Multiply by 24: `=MOD(C4 - B4, 1) * 24`.\n5. **Format Columns**: Format D as Number (`0.00`) and E as Custom Time (`[h]:mm`).",
      rawMemoryVsRendered: {
        raw: "0.354166667",
        mask: "Decimal Hours (0.00)",
        rendered: "8.50 Hours"
      },
      expectedOutput: "| In Time (B4) | Out Time (C4) | Decimal Hours (D4) | Duration [h]:mm (E4) |\n| ------------ | ------------- | ------------------ | -------------------- |\n| 21:00        | 05:30         | 8.50               | 8:30                 |\n| 08:00        | 16:30         | 8.50               | 8:30                 |",
      proTip: "The formula =MOD(End - Start, 1) is the cleanest, industry-standard solution for midnight-crossing times. It completely eliminates bulky IF(End < Start, ...) logic!"
    },
    {
      projectId: "PRJ-TDT-13",
      title: "Overtime & Wage Discrepancy Payroll Auditor",
      difficulty: "advanced",
      sheetName: "PRJ_TDT_13",
      formula: '=MAX(0, (MOD(C4 - B4, 1) * 24) - 8.5)',
      description: "Factory labor legislation stipulates standard shift work of 8.5 hours (including 30-min lunch). Any work beyond 8.5 hours qualifies for Overtime (OT) at 1.5x regular pay. Compute regular hours, overtime hours, and gross wage.",
      requirements: [
        "In worksheet **PRJ_TDT_13**, inspect shift logs in **B4:C30** and base hourly rate in **D4:D30**.",
        "In cell **E4**, compute Overtime hours using `=ROUND(MAX(0, (MOD(C4 - B4, 1) * 24) - 8.5), 2)`.",
        "In cell **F4**, compute Regular billable hours using `=MIN(8.5, MOD(C4 - B4, 1) * 24)`.",
        "In cell **G4**, compute Gross Payable: `=(F4 * D4) + (E4 * D4 * 1.5)`.",
        "Format Gross Pay as currency `₹#,##0.00` and fill down to row 30."
      ],
      stepByStep: "1. **Select Cell E4**: Click cell E4.\n2. **Enter OT Formula**: `=ROUND(MAX(0, (MOD(C4 - B4, 1) * 24) - 8.5), 2)`.\n3. **Compute Base Hours in F4**: `=MIN(8.5, MOD(C4 - B4, 1) * 24)`.\n4. **Calculate Total Wage in G4**: `=(F4 * D4) + (E4 * D4 * 1.5)`.\n5. **Format Currency**: Apply format `₹#,##0.00` to column G.\n6. **Copy Down**: Double-click fill handle for range E4:G30.",
      rawMemoryVsRendered: {
        raw: "11.0 Total Hours, Base Rate: 200",
        mask: "Currency Wage",
        rendered: "Reg: 8.5 hrs | OT: 2.5 hrs | Pay: ₹2,450.00"
      },
      expectedOutput: "| Punch In (B4) | Punch Out (C4) | Rate/hr (D4) | OT Hrs (E4) | Reg Hrs (F4) | Gross Pay (G4) |\n| ------------- | -------------- | ------------ | ----------- | ------------ | -------------- |\n| 08:00         | 19:00          | ₹200.00      | 2.50        | 8.50         | ₹2,450.00      |\n| 09:00         | 17:30          | ₹200.00      | 0.00        | 8.50         | ₹1,700.00      |",
      proTip: "Using MAX(0, Hours - Threshold) guarantees OT is never negative when an employee works fewer than 8.5 hours."
    },
    {
      projectId: "PRJ-TDT-14",
      title: "ISO 8601 Retail Supply Chain Week Code Generator",
      difficulty: "beginner",
      sheetName: "PRJ_TDT_14",
      formula: '=YEAR(B4) & "-W" & TEXT(ISOWEEKNUM(B4), "00")',
      description: "Global FMCG and retail inventory systems track shipments by ISO 8601 calendar week format (e.g. `2026-W38`). Generate ISO year and week codes to prevent mismatch between standard US calendar weeks and European/ISO retail weeks.",
      requirements: [
        "In worksheet **PRJ_TDT_14**, check shipment dates in **B4:B30**.",
        "In cell **C4**, write formula `=YEAR(B4) & \"-W\" & TEXT(ISOWEEKNUM(B4), \"00\")`.",
        "In cell **D4**, compare standard US WEEKNUM: `=WEEKNUM(B4)`.",
        "In cell **E4**, flag year-end transition discrepancies where WEEKNUM differs from ISOWEEKNUM.",
        "Fill down through row 30."
      ],
      stepByStep: "1. **Navigate to C4**: Select cell C4.\n2. **Enter ISO Formula**: `=YEAR(B4) & \"-W\" & TEXT(ISOWEEKNUM(B4), \"00\")`.\n3. **Inspect Text Padding**: Notice `\"00\"` ensures single-digit weeks format as W01, W02 instead of W1, W2.\n4. **Add Comparison in D4**: `=WEEKNUM(B4)`.\n5. **Flag Differences in E4**: `=IF(ISOWEEKNUM(B4)<>WEEKNUM(B4), \"DIFFERENT\", \"SAME\")`.\n6. **Copy Down**: Drag through row 30.",
      rawMemoryVsRendered: {
        raw: "02-Jan-2027",
        mask: "ISO Code",
        rendered: "2026-W53"
      },
      expectedOutput: "| Dispatch Date (B4) | ISO 8601 Week Code (C4) | US WEEKNUM (D4) | Audit Status |\n| ------------------ | ----------------------- | --------------- | ------------ |\n| 16-Sep-2026        | `2026-W38`              | 38              | SAME         |\n| 01-Jan-2027        | `2026-W53`              | 1               | DIFFERENT    |",
      proTip: "ISOWEEKNUM always defines Monday as the first day of the week, and Week 1 is the week containing the first Thursday of the year. US WEEKNUM defaults to Sunday."
    },
    {
      projectId: "PRJ-TDT-15",
      title: "In-Cell Text Sparkline & KPI Progress Visualizer",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_15",
      formula: '=REPT("█", ROUND(B4 * 20, 0)) & REPT("░", 20 - ROUND(B4 * 20, 0)) & " " & TEXT(B4, "0.0%")',
      description: "Build an executive-ready in-cell graphical progress bar using pure Excel text functions and Unicode block characters (`█` and `░`). This enables rich visual bar charts without inserting chart objects, add-ins, or conditional formatting data bars.",
      requirements: [
        "In worksheet **PRJ_TDT_15**, inspect project completion percentages in **B4:B30** (values 0.0 to 1.0).",
        "In cell **C4**, scale the percentage to 20 total block characters.",
        "Generate filled blocks using `REPT(\"█\", ROUND(B4 * 20, 0))`.",
        "Generate remaining empty blocks using `REPT(\"░\", 20 - ROUND(B4 * 20, 0))`.",
        "Append the formatted percentage text: ` & \" \" & TEXT(B4, \"0.0%\")`.",
        "Fill down to row 30 and align left with font Consolas or Segoe UI."
      ],
      stepByStep: "1. **Select Cell C4**: Click cell C4 on worksheet PRJ_TDT_15.\n2. **Calculate Filled Units**: `ROUND(B4 * 20, 0)` computes filled blocks out of 20.\n3. **Calculate Remaining Units**: `20 - ROUND(B4 * 20, 0)`.\n4. **Combine REPT Blocks**: `=REPT(\"█\", ROUND(B4*20,0)) & REPT(\"░\", 20 - ROUND(B4*20,0))`.\n5. **Append Percentage**: Append `& \" \" & TEXT(B4, \"0.0%\")`.\n6. **Format Display**: Set font to Segoe UI or Consolas for even character widths.",
      rawMemoryVsRendered: {
        raw: "0.75",
        mask: "Text Bar Visualizer",
        rendered: "███████████████░░░░░ 75.0%"
      },
      expectedOutput: "| Completion % (B4) | In-Cell Progress Visualizer (C4) | Audit |\n| ------------------ | -------------------------------- | ----- |\n| 0.40               | `████████░░░░░░░░░░░░ 40.0%`     | Done  |\n| 0.90               | `██████████████████░░ 90.0%`     | Done  |",
      proTip: "Text-based sparkbars can be exported seamlessly into PDFs, emails, and CSV outputs where embedded chart objects and conditional formatting data bars often fail to render!"
    },
    {
      projectId: "PRJ-TDT-16",
      title: "Web Scrape Currency & Number Sanitizer",
      difficulty: "advanced",
      sheetName: "PRJ_TDT_16",
      formula: '=NUMBERVALUE(TRIM(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(B4, "$", ""), "USD", ""), "₹", ""), ",", "")), ".", ",")',
      description: "Data scraped from multiple global e-commerce portals contains mixed currencies, European decimal commas (`1.250,50 €`), and trailing currency codes (`USD 4,500.00`). Extract and sanitize these text strings into real Excel numeric values suitable for SUM and mathematical operations.",
      requirements: [
        "In worksheet **PRJ_TDT_16**, inspect noisy pricing strings in **B4:B30**.",
        "In cell **C4**, strip currency glyphs (`$`, `₹`, `€`, `USD`, `INR`) using nested **SUBSTITUTE**.",
        "Remove all thousands separators and spaces using **TRIM**.",
        "Use **NUMBERVALUE** specifying decimal and group separator arguments to coerce cleanly into a true numeric float.",
        "In cell **D4**, format as Currency `₹#,##0.00` and verify `=SUM(C4:C30)` calculates without `#VALUE!` errors."
      ],
      stepByStep: "1. **Navigate to C4**: Select cell C4.\n2. **Strip Symbols**: Strip `$`, `USD`, `₹`, and commas.\n3. **Wrap in NUMBERVALUE**: Use `=NUMBERVALUE(TRIM(SUBSTITUTE(...)), \".\", \",\")`.\n4. **Apply Currency Mask**: Format cell C4 as `₹#,##0.00`.\n5. **Verify Math**: In cell C31, verify `=SUM(C4:C30)` calculates an accurate total.",
      rawMemoryVsRendered: {
        raw: "USD 12,450.75",
        mask: "True Numeric Float",
        rendered: "12450.75 (Formatted as ₹12,450.75)"
      },
      expectedOutput: "| Raw Scraped String (B4) | Sanitized Numeric Value (C4) | Can Be Summed? |\n| ----------------------- | ---------------------------- | -------------- |\n| `$ 1,890.50`            | `1890.50`                    | YES            |\n| `₹ 45,200.00`           | `45200.00`                   | YES            |",
      proTip: "NUMBERVALUE was introduced specifically to eliminate regional locale parsing headaches. It lets you explicitly specify the decimal and group separator right in the formula!"
    },
    {
      projectId: "PRJ-TDT-17",
      title: "SEO URL Slug & Canonical Permalink Generator",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_17",
      formula: '=LOWER(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(TRIM(B4), " ", "-"), "--", "-"), "/", "-"))',
      description: "A content management and marketing analytics team needs clean, search engine optimized URL slugs generated from raw blog article headlines (e.g. converting `Advanced Excel 2026: Tips & Tricks / Formulas!` to `advanced-excel-2026-tips-tricks-formulas`).",
      requirements: [
        "In worksheet **PRJ_TDT_17**, review raw article headlines in **B4:B30**.",
        "In cell **C4**, remove extra spaces using **TRIM** and convert to lowercase using **LOWER**.",
        "Replace spaces and slashes with hyphens using **SUBSTITUTE**.",
        "Collapse double hyphens (`--`) into single hyphens (`-`).",
        "Prepend the root domain `https://coderaccotax.in/blog/` in cell **D4**."
      ],
      stepByStep: "1. **Select Cell C4**: Click cell C4.\n2. **Trim & Lower**: Start with `=LOWER(TRIM(B4))`.\n3. **Substitute Spaces**: Wrap with `SUBSTITUTE(..., \" \", \"-\")`.\n4. **Substitute Slashes**: Wrap with `SUBSTITUTE(..., \"/\", \"-\")`.\n5. **Collapse Double Hyphens**: Wrap with `SUBSTITUTE(..., \"--\", \"-\")`.\n6. **Assemble Final URL**: In D4, write `=\"https://coderaccotax.in/blog/\" & C4`.\n7. **Copy Down**: Drag through row 30.",
      rawMemoryVsRendered: {
        raw: "Financial Modeling & Budgeting / 2026 Masterclass",
        mask: "Canonical Slug",
        rendered: "financial-modeling-budgeting-2026-masterclass"
      },
      expectedOutput: "| Headline (B4) | Generated Slug (C4) | Full Canonical URL (D4) |\n| ------------- | ------------------- | ------------------------ |\n| Top 10 Date Formulas in Excel | `top-10-date-formulas-in-excel` | `https://coderaccotax.in/blog/top-10-date-formulas-in-excel` |",
      proTip: "Nesting multiple SUBSTITUTE passes ensures punctuation marks like slashes and colons are systematically replaced with clean SEO-friendly hyphens."
    },
    {
      projectId: "PRJ-TDT-18",
      title: "Hospital Bed Stay Duration & Triage Billing",
      difficulty: "advanced",
      sheetName: "PRJ_TDT_18",
      formula: '=INT(C4 - B4) & "d " & TEXT(MOD(C4 - B4, 1), "hh:mm")',
      description: "A super-specialty hospital management system records patient admission timestamps (B4) and discharge timestamps (C4). Calculate exact bed stay duration expressed as 'X days Y hours Z minutes', and compute billable day units rounding any partial day over 4 hours up to a full day.",
      requirements: [
        "In worksheet **PRJ_TDT_18**, inspect Admission in **B4:B30** and Discharge in **C4:C30**.",
        "In cell **D4**, compute full days using `INT(C4 - B4)` and append formatted residual time using `TEXT(MOD(C4 - B4, 1), \"hh:mm\")`.",
        "In cell **E4**, calculate total decimal stay days: `=(C4 - B4)`.",
        "In cell **F4**, calculate billable hospital days: if residual hours > 4, round up: `=INT(C4 - B4) + IF(MOD(C4 - B4, 1) * 24 >= 4, 1, 0)`.",
        "Fill formulas down to row 30."
      ],
      stepByStep: "1. **Navigate to D4**: Click cell D4.\n2. **Extract Days**: Enter `INT(C4 - B4) & \"d \"`.\n3. **Append Hours & Mins**: Append `TEXT(MOD(C4 - B4, 1), \"hh:mm\")`.\n4. **Add Billing Logic in F4**: `=INT(C4 - B4) + IF(MOD(C4 - B4, 1) * 24 >= 4, 1, 0)`.\n5. **Format Columns**: Format F as Integer.\n6. **Verify Range**: Fill down through row 30.",
      rawMemoryVsRendered: {
        raw: "Adm: 10-Aug-2026 09:30 | Disch: 14-Aug-2026 16:45",
        mask: "Clinical Stay String",
        rendered: "4d 07:15 (Billable: 5 Days)"
      },
      expectedOutput: "| Admission (B4) | Discharge (C4) | Elapsed Stay (D4) | Billable Days (F4) |\n| -------------- | -------------- | ----------------- | ------------------ |\n| 01-Sep-2026 08:00 | 03-Sep-2026 15:30 | `2d 07:30` | 3 Days |\n| 10-Sep-2026 11:00 | 11-Sep-2026 13:00 | `1d 02:00` | 1 Day |",
      proTip: "In Excel date-time math, INT(Date2 - Date1) extracts the integer calendar days, while MOD(Date2 - Date1, 1) isolates the exact remaining clock fraction!"
    },
    {
      projectId: "PRJ-TDT-19",
      title: "Customer Escalation & Sentiment Keyword Scanner",
      difficulty: "intermediate",
      sheetName: "PRJ_TDT_19",
      formula: '=IF(OR(ISNUMBER(SEARCH("refund", B4)), ISNUMBER(SEARCH("legal", B4)), ISNUMBER(SEARCH("fraud", B4)), ISNUMBER(SEARCH("complaint", B4))), "🚨 ESCALATE IMMEDIATELY", "STANDARD")',
      description: "An e-commerce support desk receives hundreds of free-form customer feedback messages daily in column B. Build an automated triage scanner that flags tickets as '🚨 ESCALATE IMMEDIATELY' if any high-risk keywords ('refund', 'legal', 'fraud', 'complaint') appear anywhere in the comment.",
      requirements: [
        "In worksheet **PRJ_TDT_19**, examine feedback comments in **B4:B30**.",
        "In cell **C4**, write a multi-condition search formula using **SEARCH**, **ISNUMBER**, and **OR**.",
        "Ensure the search is case-insensitive so 'REFUND', 'Refund', and 'refund' are detected equally.",
        "Return `\"🚨 ESCALATE IMMEDIATELY\"` for matches, and `\"STANDARD\"` otherwise.",
        "Apply conditional formatting to highlight escalation cells in soft red."
      ],
      stepByStep: "1. **Select Cell C4**: Click cell C4 on worksheet PRJ_TDT_19.\n2. **Test Search**: Note that `SEARCH(\"refund\", B4)` returns character position if found, or `#VALUE!` if missing.\n3. **Convert to Boolean**: Wrap with `ISNUMBER(SEARCH(\"refund\", B4))` to get TRUE/FALSE.\n4. **Combine Multiple Keywords**: Enclose multiple tests in `=OR(ISNUMBER(SEARCH(\"refund\", B4)), ISNUMBER(SEARCH(\"legal\", B4)), ...)`.\n5. **Apply IF Condition**: Wrap with `=IF(OR(...), \"🚨 ESCALATE IMMEDIATELY\", \"STANDARD\")`.\n6. **Copy Down**: Drag through row 30.",
      rawMemoryVsRendered: {
        raw: "Product arrived damaged. I want a refund or I will take legal action.",
        mask: "Alert Status",
        rendered: "🚨 ESCALATE IMMEDIATELY"
      },
      expectedOutput: "| Feedback Text (B4) | Triage Classification (C4) | Action Required |\n| ------------------ | -------------------------- | --------------- |\n| \"Fast delivery and great packing!\" | `STANDARD` | No Action |\n| \"Item missing from package. Filing fraud complaint.\" | `🚨 ESCALATE IMMEDIATELY` | Manager Review |",
      proTip: "SEARCH returns a number if found and an error if not. Wrapping SEARCH in ISNUMBER is the quintessential Excel technique to convert string searches into safe Boolean flags."
    },
    {
      projectId: "PRJ-TDT-20",
      title: "Universal ISO 8601 & UTC Timestamp Normalizer",
      difficulty: "advanced",
      sheetName: "PRJ_TDT_20",
      formula: '=DATE(LEFT(B4, 4), MID(B4, 6, 2), MID(B4, 9, 2)) + TIME(MID(B4, 12, 2), MID(B4, 15, 2), MID(B4, 18, 2))',
      description: "Cloud database and API server logs store event times as strict ISO 8601 strings (e.g. `2026-09-16T14:30:45.000Z`). Excel treats these as plain text strings, making date filtering and time calculations impossible. Build a universal parsing formula to convert ISO 8601 strings into true Excel date-time serial numbers.",
      requirements: [
        "In worksheet **PRJ_TDT_20**, inspect raw ISO strings in **B4:B30**.",
        "In cell **C4**, extract Year using `LEFT(B4, 4)`, Month using `MID(B4, 6, 2)`, and Day using `MID(B4, 9, 2)` inside **DATE**.",
        "Extract Hour using `MID(B4, 12, 2)`, Minute using `MID(B4, 15, 2)`, and Second using `MID(B4, 18, 2)` inside **TIME**.",
        "Add the DATE and TIME results together: `=DATE(...) + TIME(...)`.",
        "Format cell C4 as custom mask `yyyy-mm-dd hh:mm:ss`.",
        "Verify that sorting by column C sorts chronologically as true numeric dates."
      ],
      stepByStep: "1. **Navigate to C4**: Click cell C4 on worksheet PRJ_TDT_20.\n2. **Extract Date Portion**: `=DATE(LEFT(B4, 4), MID(B4, 6, 2), MID(B4, 9, 2))`.\n3. **Extract Time Portion**: `+ TIME(MID(B4, 12, 2), MID(B4, 15, 2), MID(B4, 18, 2))`.\n4. **Combine**: The sum produces the exact composite serial number (e.g. 46282.60469).\n5. **Apply Format**: Press **Ctrl + 1**, select Custom, and enter `yyyy-mm-dd hh:mm:ss`.\n6. **Validate Range**: Copy down through row 30.",
      rawMemoryVsRendered: {
        raw: "2026-09-16T14:30:45.000Z",
        mask: "yyyy-mm-dd hh:mm:ss",
        rendered: "2026-09-16 14:30:45"
      },
      expectedOutput: "| Raw ISO 8601 String (B4) | Parsed Serial DateTime (C4) | Chronological Sort? |\n| ------------------------- | --------------------------- | ------------------- |\n| `2026-01-05T08:15:00Z`    | `2026-01-05 08:15:00`       | Valid               |\n| `2026-11-20T23:59:59Z`    | `2026-11-20 23:59:59`       | Valid               |",
      proTip: "In Excel, integers represent calendar days since January 1, 1900, while decimals represent the fraction of the 24-hour day. Simply adding DATE() + TIME() creates a seamless, fully sortable timestamp!"
    }
  ]
};
