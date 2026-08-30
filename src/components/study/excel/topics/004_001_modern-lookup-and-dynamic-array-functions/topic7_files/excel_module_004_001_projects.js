export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_004_001",
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
      "projectId": "EX1601",
      "title": "Lookup, Reference & XMATCH Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1601",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1601 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1601**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1601**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1602",
      "title": "Lookup, Reference & CHOOSE Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1602",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1602 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1602**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1602**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1603",
      "title": "Lookup, Reference & ADDRESS Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1603",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1603 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1603**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1603**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1604",
      "title": "Lookup, Reference & AREAS Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1604",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1604 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1604**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1604**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1605",
      "title": "Lookup, Reference & HYPERLINK Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1605",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1605 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1605**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1605**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1606",
      "title": "Lookup, Reference & VLOOKUP Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1606",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1606 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1606**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1606**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1607",
      "title": "Lookup, Reference & HLOOKUP Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1607",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1607 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1607**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1607**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1608",
      "title": "Lookup, Reference & INDEX Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1608",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1608 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1608**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1608**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1609",
      "title": "Lookup, Reference & MATCH Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1609",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1609 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1609**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1609**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1610",
      "title": "Lookup, Reference & XLOOKUP Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1610",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1610 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1610**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1610**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1611",
      "title": "Lookup, Reference & XMATCH Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1611",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1611 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1611**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1611**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1612",
      "title": "Lookup, Reference & CHOOSE Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1612",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1612 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1612**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1612**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1613",
      "title": "Lookup, Reference & ADDRESS Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1613",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1613 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1613**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1613**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1614",
      "title": "Lookup, Reference & AREAS Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1614",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1614 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1614**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1614**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1615",
      "title": "Lookup, Reference & HYPERLINK Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1615",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1615 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1615**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1615**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1616",
      "title": "Lookup, Reference & VLOOKUP Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1616",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1616 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1616**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1616**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1617",
      "title": "Lookup, Reference & HLOOKUP Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1617",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1617 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1617**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1617**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1618",
      "title": "Lookup, Reference & INDEX Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1618",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1618 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1618**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1618**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1619",
      "title": "Lookup, Reference & MATCH Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1619",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1619 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1619**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1619**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1620",
      "title": "Lookup, Reference & XLOOKUP Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1620",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1620 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1620**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1620**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1621",
      "title": "Lookup, Reference & XMATCH Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1621",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1621 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1621**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1621**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1622",
      "title": "Lookup, Reference & CHOOSE Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1622",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1622 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1622**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1622**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1623",
      "title": "Lookup, Reference & ADDRESS Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1623",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1623 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1623**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1623**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1624",
      "title": "Lookup, Reference & AREAS Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1624",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1624 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1624**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1624**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1625",
      "title": "Lookup, Reference & HYPERLINK Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1625",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1625 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1625**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1625**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_004_001",
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
      "projectId": "EX1601",
      "title": "Lookup, Reference & XMATCH Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1601",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1601 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1601**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1601**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1602",
      "title": "Lookup, Reference & CHOOSE Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1602",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1602 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1602**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1602**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1603",
      "title": "Lookup, Reference & ADDRESS Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1603",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1603 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1603**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1603**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1604",
      "title": "Lookup, Reference & AREAS Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1604",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1604 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1604**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1604**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1605",
      "title": "Lookup, Reference & HYPERLINK Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1605",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1605 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1605**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1605**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1606",
      "title": "Lookup, Reference & VLOOKUP Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1606",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1606 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1606**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1606**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1607",
      "title": "Lookup, Reference & HLOOKUP Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1607",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1607 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1607**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1607**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1608",
      "title": "Lookup, Reference & INDEX Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1608",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1608 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1608**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1608**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1609",
      "title": "Lookup, Reference & MATCH Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1609",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1609 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1609**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1609**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1610",
      "title": "Lookup, Reference & XLOOKUP Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1610",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1610 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1610**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1610**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1611",
      "title": "Lookup, Reference & XMATCH Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1611",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1611 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1611**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1611**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1612",
      "title": "Lookup, Reference & CHOOSE Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1612",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1612 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1612**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1612**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1613",
      "title": "Lookup, Reference & ADDRESS Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1613",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1613 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1613**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1613**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1614",
      "title": "Lookup, Reference & AREAS Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1614",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1614 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1614**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1614**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1615",
      "title": "Lookup, Reference & HYPERLINK Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1615",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1615 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1615**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1615**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1616",
      "title": "Lookup, Reference & VLOOKUP Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1616",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1616 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1616**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1616**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1617",
      "title": "Lookup, Reference & HLOOKUP Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1617",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1617 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1617**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1617**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1618",
      "title": "Lookup, Reference & INDEX Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1618",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1618 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1618**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1618**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1619",
      "title": "Lookup, Reference & MATCH Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1619",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1619 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1619**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1619**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1620",
      "title": "Lookup, Reference & XLOOKUP Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1620",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1620 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1620**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1620**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1621",
      "title": "Lookup, Reference & XMATCH Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1621",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1621 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1621**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1621**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1622",
      "title": "Lookup, Reference & CHOOSE Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1622",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1622 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1622**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1622**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1623",
      "title": "Lookup, Reference & ADDRESS Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1623",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1623 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1623**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1623**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1624",
      "title": "Lookup, Reference & AREAS Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1624",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1624 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1624**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1624**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1625",
      "title": "Lookup, Reference & HYPERLINK Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1625",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1625 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1625**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1625**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    }
  ]
};
