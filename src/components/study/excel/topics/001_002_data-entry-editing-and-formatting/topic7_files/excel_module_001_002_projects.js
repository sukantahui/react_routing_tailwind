export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_001_002",
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
      "projectId": "EX201",
      "title": "Data Hygiene & INT Function (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX201",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX201 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX201** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX201**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 11,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX202",
      "title": "Data Hygiene & TRUNC Function (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX202",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX202 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX202** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX202**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 13,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =TRUNC(B4)   | Formatted Display | Passed      |",
      "proTip": "Method TRUNC allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX203",
      "title": "Data Hygiene & ABS Function (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX203",
      "formula": "=ABS(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX203 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ABS** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX203** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ABS** e.g. `=ABS(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX203**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ABS**: Click cell C4, enter `=ABS(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 14,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ABS(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ABS allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX204",
      "title": "Data Hygiene & MOD Function (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX204",
      "formula": "=MOD(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX204 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MOD** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX204** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MOD** e.g. `=MOD(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX204**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MOD**: Click cell C4, enter `=MOD(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 16,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MOD(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MOD allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX205",
      "title": "Data Hygiene & QUOTIENT Function (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX205",
      "formula": "=QUOTIENT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX205 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **QUOTIENT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX205** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **QUOTIENT** e.g. `=QUOTIENT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX205**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply QUOTIENT**: Click cell C4, enter `=QUOTIENT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1750000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 17,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =QUOTIENT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method QUOTIENT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX206",
      "title": "Data Hygiene & ROUND Function (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX206",
      "formula": "=ROUND(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX206 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **ROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX206** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **ROUND** e.g. `=ROUND(B4, 2)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX206**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply ROUND**: Click cell C4, enter `=ROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1900000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 19,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX207",
      "title": "Data Hygiene & ROUNDUP Function (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX207",
      "formula": "=ROUNDUP(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX207 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **ROUNDUP** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX207** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDUP** e.g. `=ROUNDUP(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX207**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply ROUNDUP**: Click cell C4, enter `=ROUNDUP(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2050000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 20,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDUP(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDUP allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX208",
      "title": "Data Hygiene & ROUNDDOWN Function (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX208",
      "formula": "=ROUNDDOWN(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX208 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ROUNDDOWN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX208** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDDOWN** e.g. `=ROUNDDOWN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX208**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ROUNDDOWN**: Click cell C4, enter `=ROUNDDOWN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2200000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 22,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDDOWN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDDOWN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX209",
      "title": "Data Hygiene & MROUND Function (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX209",
      "formula": "=MROUND(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX209 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX209** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MROUND** e.g. `=MROUND(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX209**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MROUND**: Click cell C4, enter `=MROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2350000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 23,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX210",
      "title": "Data Hygiene & CEILING.MATH Function (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX210",
      "formula": "=CEILING.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX210 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **CEILING.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX210** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **CEILING.MATH** e.g. `=CEILING.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX210**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply CEILING.MATH**: Click cell C4, enter `=CEILING.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2500000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 25,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CEILING.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CEILING.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX211",
      "title": "Data Hygiene & FLOOR.MATH Function (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX211",
      "formula": "=FLOOR.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX211 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FLOOR.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX211** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FLOOR.MATH** e.g. `=FLOOR.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX211**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FLOOR.MATH**: Click cell C4, enter `=FLOOR.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2650000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 26,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FLOOR.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FLOOR.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX212",
      "title": "Data Hygiene & SIGN Function (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX212",
      "formula": "=SIGN(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX212 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **SIGN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX212** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **SIGN** e.g. `=SIGN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX212**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply SIGN**: Click cell C4, enter `=SIGN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2800000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 28,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SIGN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SIGN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX213",
      "title": "Data Hygiene & SQRT Function (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX213",
      "formula": "=SQRT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX213 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **SQRT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX213** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **SQRT** e.g. `=SQRT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX213**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply SQRT**: Click cell C4, enter `=SQRT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2950000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 29,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SQRT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SQRT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX214",
      "title": "Data Hygiene & POWER Function (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX214",
      "formula": "=POWER(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX214 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **POWER** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX214** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **POWER** e.g. `=POWER(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX214**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply POWER**: Click cell C4, enter `=POWER(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3100000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 31,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =POWER(B4)   | Formatted Display | Passed      |",
      "proTip": "Method POWER allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX215",
      "title": "Data Hygiene & EXACT Function (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX215",
      "formula": "=EXACT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX215 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **EXACT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX215** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **EXACT** e.g. `=EXACT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX215**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply EXACT**: Click cell C4, enter `=EXACT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3250000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 32,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =EXACT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method EXACT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX216",
      "title": "Data Hygiene & CHAR Function (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX216",
      "formula": "=CHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX216 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **CHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX216** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **CHAR** e.g. `=CHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX216**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply CHAR**: Click cell C4, enter `=CHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3400000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 34,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX217",
      "title": "Data Hygiene & CODE Function (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX217",
      "formula": "=CODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX217 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **CODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX217** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **CODE** e.g. `=CODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX217**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply CODE**: Click cell C4, enter `=CODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3550000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 35,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX218",
      "title": "Data Hygiene & UNICHAR Function (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX218",
      "formula": "=UNICHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX218 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **UNICHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX218** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **UNICHAR** e.g. `=UNICHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX218**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply UNICHAR**: Click cell C4, enter `=UNICHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3700000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 37,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX219",
      "title": "Data Hygiene & UNICODE Function (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX219",
      "formula": "=UNICODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX219 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **UNICODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX219** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **UNICODE** e.g. `=UNICODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX219**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply UNICODE**: Click cell C4, enter `=UNICODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3850000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 38,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX220",
      "title": "Data Hygiene & REPT Function (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX220",
      "formula": "=REPT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX220 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **REPT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX220** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **REPT** e.g. `=REPT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX220**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply REPT**: Click cell C4, enter `=REPT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4000000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 40,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =REPT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method REPT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX221",
      "title": "Data Hygiene & FIXED Function (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX221",
      "formula": "=FIXED(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX221 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FIXED** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX221** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FIXED** e.g. `=FIXED(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX221**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FIXED**: Click cell C4, enter `=FIXED(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 41,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FIXED(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FIXED allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX222",
      "title": "Data Hygiene & DOLLAR Function (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX222",
      "formula": "=DOLLAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX222 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **DOLLAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX222** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **DOLLAR** e.g. `=DOLLAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX222**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply DOLLAR**: Click cell C4, enter `=DOLLAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 43,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =DOLLAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method DOLLAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX223",
      "title": "Data Hygiene & BAHTTEXT Function (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX223",
      "formula": "=BAHTTEXT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX223 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **BAHTTEXT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX223** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **BAHTTEXT** e.g. `=BAHTTEXT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX223**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply BAHTTEXT**: Click cell C4, enter `=BAHTTEXT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 44,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =BAHTTEXT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method BAHTTEXT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX224",
      "title": "Data Hygiene & INT Function (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX224",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX224 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX224** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX224**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 46,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX225",
      "title": "Data Hygiene & TRUNC Function (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX225",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX225 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX225** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX225**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
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
  "projectCategory": "Projects_001_002",
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
      "projectId": "EX201",
      "title": "Data Hygiene & INT Function (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX201",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX201 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX201** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX201**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 11,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX202",
      "title": "Data Hygiene & TRUNC Function (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX202",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX202 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX202** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX202**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 13,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =TRUNC(B4)   | Formatted Display | Passed      |",
      "proTip": "Method TRUNC allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX203",
      "title": "Data Hygiene & ABS Function (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX203",
      "formula": "=ABS(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX203 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ABS** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX203** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ABS** e.g. `=ABS(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX203**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ABS**: Click cell C4, enter `=ABS(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 14,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ABS(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ABS allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX204",
      "title": "Data Hygiene & MOD Function (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX204",
      "formula": "=MOD(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX204 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MOD** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX204** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MOD** e.g. `=MOD(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX204**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MOD**: Click cell C4, enter `=MOD(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 16,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MOD(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MOD allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX205",
      "title": "Data Hygiene & QUOTIENT Function (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX205",
      "formula": "=QUOTIENT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX205 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **QUOTIENT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX205** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **QUOTIENT** e.g. `=QUOTIENT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX205**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply QUOTIENT**: Click cell C4, enter `=QUOTIENT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1750000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 17,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =QUOTIENT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method QUOTIENT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX206",
      "title": "Data Hygiene & ROUND Function (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX206",
      "formula": "=ROUND(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX206 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **ROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX206** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **ROUND** e.g. `=ROUND(B4, 2)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX206**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply ROUND**: Click cell C4, enter `=ROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "1900000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 19,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX207",
      "title": "Data Hygiene & ROUNDUP Function (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX207",
      "formula": "=ROUNDUP(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX207 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **ROUNDUP** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX207** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDUP** e.g. `=ROUNDUP(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX207**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply ROUNDUP**: Click cell C4, enter `=ROUNDUP(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2050000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 20,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDUP(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDUP allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX208",
      "title": "Data Hygiene & ROUNDDOWN Function (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX208",
      "formula": "=ROUNDDOWN(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX208 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **ROUNDDOWN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX208** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **ROUNDDOWN** e.g. `=ROUNDDOWN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX208**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply ROUNDDOWN**: Click cell C4, enter `=ROUNDDOWN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2200000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 22,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =ROUNDDOWN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method ROUNDDOWN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX209",
      "title": "Data Hygiene & MROUND Function (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX209",
      "formula": "=MROUND(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX209 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **MROUND** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX209** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **MROUND** e.g. `=MROUND(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX209**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply MROUND**: Click cell C4, enter `=MROUND(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2350000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 23,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =MROUND(B4)   | Formatted Display | Passed      |",
      "proTip": "Method MROUND allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX210",
      "title": "Data Hygiene & CEILING.MATH Function (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX210",
      "formula": "=CEILING.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX210 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **CEILING.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX210** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **CEILING.MATH** e.g. `=CEILING.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX210**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply CEILING.MATH**: Click cell C4, enter `=CEILING.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2500000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 25,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CEILING.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CEILING.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX211",
      "title": "Data Hygiene & FLOOR.MATH Function (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX211",
      "formula": "=FLOOR.MATH(B4, 5)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX211 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FLOOR.MATH** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX211** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FLOOR.MATH** e.g. `=FLOOR.MATH(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX211**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FLOOR.MATH**: Click cell C4, enter `=FLOOR.MATH(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2650000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 26,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FLOOR.MATH(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FLOOR.MATH allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX212",
      "title": "Data Hygiene & SIGN Function (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX212",
      "formula": "=SIGN(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX212 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **SIGN** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX212** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **SIGN** e.g. `=SIGN(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX212**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply SIGN**: Click cell C4, enter `=SIGN(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2800000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 28,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SIGN(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SIGN allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX213",
      "title": "Data Hygiene & SQRT Function (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX213",
      "formula": "=SQRT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX213 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **SQRT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX213** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **SQRT** e.g. `=SQRT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX213**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply SQRT**: Click cell C4, enter `=SQRT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "2950000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 29,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =SQRT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method SQRT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX214",
      "title": "Data Hygiene & POWER Function (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX214",
      "formula": "=POWER(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX214 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **POWER** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX214** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **POWER** e.g. `=POWER(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX214**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply POWER**: Click cell C4, enter `=POWER(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3100000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 31,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =POWER(B4)   | Formatted Display | Passed      |",
      "proTip": "Method POWER allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX215",
      "title": "Data Hygiene & EXACT Function (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX215",
      "formula": "=EXACT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX215 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **EXACT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX215** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **EXACT** e.g. `=EXACT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX215**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply EXACT**: Click cell C4, enter `=EXACT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3250000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 32,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =EXACT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method EXACT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX216",
      "title": "Data Hygiene & CHAR Function (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX216",
      "formula": "=CHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX216 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **CHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX216** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **CHAR** e.g. `=CHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX216**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply CHAR**: Click cell C4, enter `=CHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3400000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 34,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX217",
      "title": "Data Hygiene & CODE Function (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX217",
      "formula": "=CODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX217 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **CODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX217** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **CODE** e.g. `=CODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX217**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply CODE**: Click cell C4, enter `=CODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3550000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 35,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =CODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method CODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX218",
      "title": "Data Hygiene & UNICHAR Function (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX218",
      "formula": "=UNICHAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX218 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **UNICHAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX218** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **UNICHAR** e.g. `=UNICHAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX218**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply UNICHAR**: Click cell C4, enter `=UNICHAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3700000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 37,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICHAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICHAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX219",
      "title": "Data Hygiene & UNICODE Function (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX219",
      "formula": "=UNICODE(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX219 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **UNICODE** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX219** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **UNICODE** e.g. `=UNICODE(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX219**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply UNICODE**: Click cell C4, enter `=UNICODE(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "3850000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 38,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =UNICODE(B4)   | Formatted Display | Passed      |",
      "proTip": "Method UNICODE allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX220",
      "title": "Data Hygiene & REPT Function (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX220",
      "formula": "=REPT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX220 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **REPT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX220** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **REPT** e.g. `=REPT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX220**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply REPT**: Click cell C4, enter `=REPT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4000000.849",
        "mask": "[h]:mm:ss",
        "rendered": "₹ 40,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =REPT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method REPT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX221",
      "title": "Data Hygiene & FIXED Function (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX221",
      "formula": "=FIXED(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX221 in range B4:B25. You must apply custom formatting mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and use method **FIXED** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX221** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' via **Ctrl + 1**.",
        "In column C, write formula using **FIXED** e.g. `=FIXED(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX221**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into Type input.\n4. **Apply FIXED**: Click cell C4, enter `=FIXED(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4150000.849",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "₹ 41,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =FIXED(B4)   | Formatted Display | Passed      |",
      "proTip": "Method FIXED allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX222",
      "title": "Data Hygiene & DOLLAR Function (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX222",
      "formula": "=DOLLAR(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX222 in range B4:B25. You must apply custom formatting mask '0000-0000-0000' and use method **DOLLAR** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX222** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '0000-0000-0000' via **Ctrl + 1**.",
        "In column C, write formula using **DOLLAR** e.g. `=DOLLAR(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX222**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '0000-0000-0000' into Type input.\n4. **Apply DOLLAR**: Click cell C4, enter `=DOLLAR(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4300000.849",
        "mask": "0000-0000-0000",
        "rendered": "₹ 43,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =DOLLAR(B4)   | Formatted Display | Passed      |",
      "proTip": "Method DOLLAR allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX223",
      "title": "Data Hygiene & BAHTTEXT Function (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX223",
      "formula": "=BAHTTEXT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX223 in range B4:B25. You must apply custom formatting mask 'dd-mmm-yyyy (dddd)' and use method **BAHTTEXT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX223** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: 'dd-mmm-yyyy (dddd)' via **Ctrl + 1**.",
        "In column C, write formula using **BAHTTEXT** e.g. `=BAHTTEXT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX223**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type 'dd-mmm-yyyy (dddd)' into Type input.\n4. **Apply BAHTTEXT**: Click cell C4, enter `=BAHTTEXT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4450000.849",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "₹ 44,50,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =BAHTTEXT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method BAHTTEXT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX224",
      "title": "Data Hygiene & INT Function (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX224",
      "formula": "=INT(B4)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX224 in range B4:B25. You must apply custom formatting mask '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' and use method **INT** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX224** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' via **Ctrl + 1**.",
        "In column C, write formula using **INT** e.g. `=INT(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX224**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into Type input.\n4. **Apply INT**: Click cell C4, enter `=INT(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
      "rawMemoryVsRendered": {
        "raw": "4600000.849",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "₹ 46,00,000.85"
      },
      "expectedOutput": "| Cell | Raw Input Float | Applied Function | Formatted Display | Audit Check |\n| ---- | --------------- | ---------------- | ----------------- | ----------- |\n| B4   | 14500000.849    | =INT(B4)   | Formatted Display | Passed      |",
      "proTip": "Method INT allows precise control over number precision. Always round financial figures before billing to prevent penny rounding errors!"
    },
    {
      "projectId": "EX225",
      "title": "Data Hygiene & TRUNC Function (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX225",
      "formula": "=TRUNC(B4, 2)",
      "description": "As a Financial Reporting Specialist, you are auditing numerical payloads on sheet EX225 in range B4:B25. You must apply custom formatting mask '[h]:mm:ss' and use method **TRUNC** to clean fractional digits, calculate absolute variances, format currency strings, or enforce math rounding bounds without altering raw float cell memory.",
      "requirements": [
        "Navigate to sheet **EX225** in the master workbook.",
        "Highlight range **B4:B25**.",
        "Apply custom format mask: '[h]:mm:ss' via **Ctrl + 1**.",
        "In column C, write formula using **TRUNC** e.g. `=TRUNC(B4)`.",
        "Ensure negative numbers appear in red inside parentheses without converting numbers to text strings."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight B4:B25 on worksheet **EX225**.\n2. **Open Format Cells**: Press **Ctrl + 1** -> select **Custom**.\n3. **Apply Mask**: Type '[h]:mm:ss' into Type input.\n4. **Apply TRUNC**: Click cell C4, enter `=TRUNC(B4)` and drag fill handle down to C25.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! errors.",
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
