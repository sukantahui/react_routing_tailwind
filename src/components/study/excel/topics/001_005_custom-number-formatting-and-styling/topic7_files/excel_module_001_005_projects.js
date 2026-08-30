export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_001_005",
  "subject": "Microsoft Excel Practical Workplace Modeling & Audit Lab",
  "trackCode": "EXCEL-PRO-901",
  "level": "Beginner to Advanced",
  "tools": [
    "Excel 365",
    "Excel 2021",
    "Power Query",
    "Office Online"
  ],
  "institute": {
    "author": "Sukanta Hui",
    "name": "Coder & AccoTax",
    "location": "Barrackpore & Naihati"
  },
  "projects": [
    {
      "projectId": "EX301",
      "title": "Data Hygiene & INT Function (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX301",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX301 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX301** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX301**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 11,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX302",
      "title": "Data Hygiene & TRUNC Function (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX302",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX302 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX302** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX302**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 13,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =TRUNC(B4)   | Formatted Display | Passed      |",
      "proTip": "Method TRUNC allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX303",
      "title": "Data Hygiene & ABS Function (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX303",
      "formula": "=ABS(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX303 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ABS** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX303** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ABS** e.g. `=ABS(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX303**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ABS**: Click cell C4, enter `=ABS(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 14,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ABS(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ABS allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX304",
      "title": "Data Hygiene & MOD Function (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX304",
      "formula": "=MOD(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX304 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MOD** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX304** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MOD** e.g. `=MOD(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX304**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MOD**: Click cell C4, enter `=MOD(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 16,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MOD(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MOD allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX305",
      "title": "Data Hygiene & QUOTIENT Function (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX305",
      "formula": "=QUOTIENT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX305 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **QUOTIENT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX305** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **QUOTIENT** e.g. `=QUOTIENT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX305**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply QUOTIENT**: Click cell C4, enter `=QUOTIENT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1750000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 17,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =QUOTIENT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method QUOTIENT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX306",
      "title": "Data Hygiene & ROUND Function (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX306",
      "formula": "=ROUND(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX306 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **ROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX306** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **ROUND** e.g. `=ROUND(B4, 2)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX306**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply ROUND**: Click cell C4, enter `=ROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1900000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 19,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX307",
      "title": "Data Hygiene & ROUNDUP Function (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX307",
      "formula": "=ROUNDUP(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX307 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **ROUNDUP** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX307** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDUP** e.g. `=ROUNDUP(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX307**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply ROUNDUP**: Click cell C4, enter `=ROUNDUP(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2050000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 20,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDUP(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDUP allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX308",
      "title": "Data Hygiene & ROUNDDOWN Function (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX308",
      "formula": "=ROUNDDOWN(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX308 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ROUNDDOWN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX308** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDDOWN** e.g. `=ROUNDDOWN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX308**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ROUNDDOWN**: Click cell C4, enter `=ROUNDDOWN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2200000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 22,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDDOWN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDDOWN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX309",
      "title": "Data Hygiene & MROUND Function (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX309",
      "formula": "=MROUND(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX309 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX309** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MROUND** e.g. `=MROUND(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX309**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MROUND**: Click cell C4, enter `=MROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2350000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 23,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX310",
      "title": "Data Hygiene & CEILING.MATH Function (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX310",
      "formula": "=CEILING.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX310 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **CEILING.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX310** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **CEILING.MATH** e.g. `=CEILING.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX310**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply CEILING.MATH**: Click cell C4, enter `=CEILING.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2500000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 25,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CEILING.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CEILING.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX311",
      "title": "Data Hygiene & FLOOR.MATH Function (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX311",
      "formula": "=FLOOR.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX311 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FLOOR.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX311** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FLOOR.MATH** e.g. `=FLOOR.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX311**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FLOOR.MATH**: Click cell C4, enter `=FLOOR.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2650000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 26,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FLOOR.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FLOOR.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX312",
      "title": "Data Hygiene & SIGN Function (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX312",
      "formula": "=SIGN(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX312 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **SIGN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX312** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **SIGN** e.g. `=SIGN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX312**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply SIGN**: Click cell C4, enter `=SIGN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2800000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 28,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SIGN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SIGN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX313",
      "title": "Data Hygiene & SQRT Function (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX313",
      "formula": "=SQRT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX313 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **SQRT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX313** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **SQRT** e.g. `=SQRT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX313**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply SQRT**: Click cell C4, enter `=SQRT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2950000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 29,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SQRT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SQRT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX314",
      "title": "Data Hygiene & POWER Function (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX314",
      "formula": "=POWER(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX314 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **POWER** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX314** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **POWER** e.g. `=POWER(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX314**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply POWER**: Click cell C4, enter `=POWER(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3100000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 31,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =POWER(B4)   | Formatted Display | Passed      |",
      "proTip": "Method POWER allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX315",
      "title": "Data Hygiene & EXACT Function (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX315",
      "formula": "=EXACT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX315 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **EXACT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX315** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **EXACT** e.g. `=EXACT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX315**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply EXACT**: Click cell C4, enter `=EXACT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3250000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 32,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =EXACT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method EXACT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX316",
      "title": "Data Hygiene & CHAR Function (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX316",
      "formula": "=CHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX316 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **CHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX316** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **CHAR** e.g. `=CHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX316**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply CHAR**: Click cell C4, enter `=CHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3400000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 34,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX317",
      "title": "Data Hygiene & CODE Function (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX317",
      "formula": "=CODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX317 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **CODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX317** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **CODE** e.g. `=CODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX317**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply CODE**: Click cell C4, enter `=CODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3550000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 35,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX318",
      "title": "Data Hygiene & UNICHAR Function (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX318",
      "formula": "=UNICHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX318 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **UNICHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX318** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **UNICHAR** e.g. `=UNICHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX318**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply UNICHAR**: Click cell C4, enter `=UNICHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3700000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 37,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX319",
      "title": "Data Hygiene & UNICODE Function (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX319",
      "formula": "=UNICODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX319 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **UNICODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX319** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **UNICODE** e.g. `=UNICODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX319**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply UNICODE**: Click cell C4, enter `=UNICODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3850000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 38,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX320",
      "title": "Data Hygiene & REPT Function (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX320",
      "formula": "=REPT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX320 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **REPT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX320** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **REPT** e.g. `=REPT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX320**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply REPT**: Click cell C4, enter `=REPT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4000000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 40,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =REPT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method REPT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX321",
      "title": "Data Hygiene & FIXED Function (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX321",
      "formula": "=FIXED(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX321 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FIXED** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX321** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FIXED** e.g. `=FIXED(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX321**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FIXED**: Click cell C4, enter `=FIXED(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 41,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FIXED(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FIXED allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX322",
      "title": "Data Hygiene & DOLLAR Function (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX322",
      "formula": "=DOLLAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX322 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **DOLLAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX322** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **DOLLAR** e.g. `=DOLLAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX322**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply DOLLAR**: Click cell C4, enter `=DOLLAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 43,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =DOLLAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method DOLLAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX323",
      "title": "Data Hygiene & BAHTTEXT Function (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX323",
      "formula": "=BAHTTEXT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX323 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **BAHTTEXT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX323** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **BAHTTEXT** e.g. `=BAHTTEXT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX323**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply BAHTTEXT**: Click cell C4, enter `=BAHTTEXT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 44,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =BAHTTEXT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method BAHTTEXT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX324",
      "title": "Data Hygiene & INT Function (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX324",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX324 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX324** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX324**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 46,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX325",
      "title": "Data Hygiene & TRUNC Function (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX325",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX325 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX325** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX325**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4750000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 47,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =TRUNC(B4)   | Formatted Display | Passed      |",
      "proTip": "Method TRUNC allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_001_005",
  "subject": "Microsoft Excel Practical Workplace Modeling & Audit Lab",
  "trackCode": "EXCEL-PRO-901",
  "level": "Beginner to Advanced",
  "tools": [
    "Excel 365",
    "Excel 2021",
    "Power Query",
    "Office Online"
  ],
  "institute": {
    "author": "Sukanta Hui",
    "name": "Coder & AccoTax",
    "location": "Barrackpore & Naihati"
  },
  "projects": [
    {
      "projectId": "EX301",
      "title": "Data Hygiene & INT Function (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX301",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX301 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX301** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX301**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 11,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX302",
      "title": "Data Hygiene & TRUNC Function (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX302",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX302 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX302** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX302**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 13,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =TRUNC(B4)   | Formatted Display | Passed      |",
      "proTip": "Method TRUNC allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX303",
      "title": "Data Hygiene & ABS Function (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX303",
      "formula": "=ABS(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX303 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ABS** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX303** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ABS** e.g. `=ABS(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX303**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ABS**: Click cell C4, enter `=ABS(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 14,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ABS(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ABS allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX304",
      "title": "Data Hygiene & MOD Function (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX304",
      "formula": "=MOD(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX304 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MOD** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX304** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MOD** e.g. `=MOD(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX304**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MOD**: Click cell C4, enter `=MOD(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 16,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MOD(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MOD allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX305",
      "title": "Data Hygiene & QUOTIENT Function (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX305",
      "formula": "=QUOTIENT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX305 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **QUOTIENT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX305** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **QUOTIENT** e.g. `=QUOTIENT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX305**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply QUOTIENT**: Click cell C4, enter `=QUOTIENT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1750000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 17,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =QUOTIENT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method QUOTIENT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX306",
      "title": "Data Hygiene & ROUND Function (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX306",
      "formula": "=ROUND(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX306 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **ROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX306** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **ROUND** e.g. `=ROUND(B4, 2)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX306**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply ROUND**: Click cell C4, enter `=ROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1900000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 19,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX307",
      "title": "Data Hygiene & ROUNDUP Function (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX307",
      "formula": "=ROUNDUP(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX307 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **ROUNDUP** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX307** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDUP** e.g. `=ROUNDUP(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX307**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply ROUNDUP**: Click cell C4, enter `=ROUNDUP(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2050000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 20,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDUP(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDUP allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX308",
      "title": "Data Hygiene & ROUNDDOWN Function (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX308",
      "formula": "=ROUNDDOWN(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX308 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ROUNDDOWN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX308** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDDOWN** e.g. `=ROUNDDOWN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX308**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ROUNDDOWN**: Click cell C4, enter `=ROUNDDOWN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2200000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 22,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDDOWN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDDOWN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX309",
      "title": "Data Hygiene & MROUND Function (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX309",
      "formula": "=MROUND(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX309 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX309** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MROUND** e.g. `=MROUND(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX309**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MROUND**: Click cell C4, enter `=MROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2350000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 23,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX310",
      "title": "Data Hygiene & CEILING.MATH Function (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX310",
      "formula": "=CEILING.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX310 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **CEILING.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX310** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **CEILING.MATH** e.g. `=CEILING.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX310**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply CEILING.MATH**: Click cell C4, enter `=CEILING.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2500000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 25,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CEILING.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CEILING.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX311",
      "title": "Data Hygiene & FLOOR.MATH Function (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX311",
      "formula": "=FLOOR.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX311 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FLOOR.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX311** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FLOOR.MATH** e.g. `=FLOOR.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX311**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FLOOR.MATH**: Click cell C4, enter `=FLOOR.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2650000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 26,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FLOOR.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FLOOR.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX312",
      "title": "Data Hygiene & SIGN Function (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX312",
      "formula": "=SIGN(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX312 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **SIGN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX312** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **SIGN** e.g. `=SIGN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX312**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply SIGN**: Click cell C4, enter `=SIGN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2800000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 28,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SIGN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SIGN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX313",
      "title": "Data Hygiene & SQRT Function (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX313",
      "formula": "=SQRT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX313 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **SQRT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX313** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **SQRT** e.g. `=SQRT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX313**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply SQRT**: Click cell C4, enter `=SQRT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2950000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 29,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SQRT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SQRT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX314",
      "title": "Data Hygiene & POWER Function (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX314",
      "formula": "=POWER(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX314 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **POWER** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX314** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **POWER** e.g. `=POWER(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX314**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply POWER**: Click cell C4, enter `=POWER(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3100000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 31,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =POWER(B4)   | Formatted Display | Passed      |",
      "proTip": "Method POWER allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX315",
      "title": "Data Hygiene & EXACT Function (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX315",
      "formula": "=EXACT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX315 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **EXACT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX315** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **EXACT** e.g. `=EXACT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX315**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply EXACT**: Click cell C4, enter `=EXACT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3250000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 32,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =EXACT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method EXACT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX316",
      "title": "Data Hygiene & CHAR Function (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX316",
      "formula": "=CHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX316 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **CHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX316** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **CHAR** e.g. `=CHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX316**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply CHAR**: Click cell C4, enter `=CHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3400000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 34,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX317",
      "title": "Data Hygiene & CODE Function (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX317",
      "formula": "=CODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX317 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **CODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX317** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **CODE** e.g. `=CODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX317**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply CODE**: Click cell C4, enter `=CODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3550000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 35,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX318",
      "title": "Data Hygiene & UNICHAR Function (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX318",
      "formula": "=UNICHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX318 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **UNICHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX318** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **UNICHAR** e.g. `=UNICHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX318**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply UNICHAR**: Click cell C4, enter `=UNICHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3700000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 37,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX319",
      "title": "Data Hygiene & UNICODE Function (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX319",
      "formula": "=UNICODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX319 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **UNICODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX319** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **UNICODE** e.g. `=UNICODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX319**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply UNICODE**: Click cell C4, enter `=UNICODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3850000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 38,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX320",
      "title": "Data Hygiene & REPT Function (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX320",
      "formula": "=REPT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX320 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **REPT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX320** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **REPT** e.g. `=REPT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX320**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply REPT**: Click cell C4, enter `=REPT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4000000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 40,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =REPT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method REPT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX321",
      "title": "Data Hygiene & FIXED Function (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX321",
      "formula": "=FIXED(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX321 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FIXED** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX321** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FIXED** e.g. `=FIXED(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX321**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FIXED**: Click cell C4, enter `=FIXED(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 41,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FIXED(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FIXED allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX322",
      "title": "Data Hygiene & DOLLAR Function (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX322",
      "formula": "=DOLLAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX322 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **DOLLAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX322** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **DOLLAR** e.g. `=DOLLAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX322**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply DOLLAR**: Click cell C4, enter `=DOLLAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 43,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =DOLLAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method DOLLAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX323",
      "title": "Data Hygiene & BAHTTEXT Function (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX323",
      "formula": "=BAHTTEXT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX323 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **BAHTTEXT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX323** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **BAHTTEXT** e.g. `=BAHTTEXT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX323**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply BAHTTEXT**: Click cell C4, enter `=BAHTTEXT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 44,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =BAHTTEXT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method BAHTTEXT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX324",
      "title": "Data Hygiene & INT Function (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX324",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX324 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX324** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX324**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 46,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX325",
      "title": "Data Hygiene & TRUNC Function (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX325",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX325 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX325** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX325**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4750000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 47,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =TRUNC(B4)   | Formatted Display | Passed      |",
      "proTip": "Method TRUNC allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    }
  ]
};
