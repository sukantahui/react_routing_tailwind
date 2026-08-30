export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_002_005",
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
      "projectId": "EX1001",
      "title": "Lookup, Reference & XMATCH Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1001",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1001 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1001**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1001**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1002",
      "title": "Lookup, Reference & CHOOSE Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1002",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1002 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1002**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1002**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1003",
      "title": "Lookup, Reference & ADDRESS Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1003",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1003 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1003**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1003**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1004",
      "title": "Lookup, Reference & AREAS Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1004",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1004 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1004**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1004**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1005",
      "title": "Lookup, Reference & HYPERLINK Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1005",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1005 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1005**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1005**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1006",
      "title": "Lookup, Reference & VLOOKUP Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1006",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1006 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1006**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1006**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1007",
      "title": "Lookup, Reference & HLOOKUP Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1007",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1007 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1007**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1007**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1008",
      "title": "Lookup, Reference & INDEX Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1008",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1008 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1008**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1008**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1009",
      "title": "Lookup, Reference & MATCH Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1009",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1009 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1009**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1009**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1010",
      "title": "Lookup, Reference & XLOOKUP Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1010",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1010 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1010**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1010**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1011",
      "title": "Lookup, Reference & XMATCH Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1011",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1011 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1011**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1011**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1012",
      "title": "Lookup, Reference & CHOOSE Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1012",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1012 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1012**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1012**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1013",
      "title": "Lookup, Reference & ADDRESS Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1013",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1013 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1013**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1013**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1014",
      "title": "Lookup, Reference & AREAS Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1014",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1014 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1014**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1014**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1015",
      "title": "Lookup, Reference & HYPERLINK Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1015",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1015 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1015**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1015**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1016",
      "title": "Lookup, Reference & VLOOKUP Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1016",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1016 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1016**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1016**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1017",
      "title": "Lookup, Reference & HLOOKUP Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1017",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1017 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1017**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1017**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1018",
      "title": "Lookup, Reference & INDEX Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1018",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1018 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1018**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1018**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1019",
      "title": "Lookup, Reference & MATCH Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1019",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1019 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1019**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1019**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1020",
      "title": "Lookup, Reference & XLOOKUP Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1020",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1020 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1020**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1020**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1021",
      "title": "Lookup, Reference & XMATCH Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1021",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1021 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1021**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1021**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1022",
      "title": "Lookup, Reference & CHOOSE Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1022",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1022 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1022**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1022**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1023",
      "title": "Lookup, Reference & ADDRESS Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1023",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1023 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1023**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1023**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1024",
      "title": "Lookup, Reference & AREAS Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1024",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1024 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1024**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1024**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1025",
      "title": "Lookup, Reference & HYPERLINK Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1025",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1025 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1025**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1025**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
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
  "projectCategory": "Projects_002_005",
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
      "projectId": "EX1001",
      "title": "Lookup, Reference & XMATCH Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1001",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1001 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1001**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1001**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1002",
      "title": "Lookup, Reference & CHOOSE Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1002",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1002 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1002**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1002**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1003",
      "title": "Lookup, Reference & ADDRESS Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1003",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1003 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1003**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1003**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1004",
      "title": "Lookup, Reference & AREAS Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1004",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1004 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1004**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1004**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1005",
      "title": "Lookup, Reference & HYPERLINK Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1005",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1005 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1005**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1005**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1006",
      "title": "Lookup, Reference & VLOOKUP Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1006",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1006 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1006**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1006**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1007",
      "title": "Lookup, Reference & HLOOKUP Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1007",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1007 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1007**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1007**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1008",
      "title": "Lookup, Reference & INDEX Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1008",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1008 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1008**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1008**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1009",
      "title": "Lookup, Reference & MATCH Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1009",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1009 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1009**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1009**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1010",
      "title": "Lookup, Reference & XLOOKUP Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1010",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1010 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1010**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1010**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1011",
      "title": "Lookup, Reference & XMATCH Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1011",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1011 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1011**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1011**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1012",
      "title": "Lookup, Reference & CHOOSE Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1012",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1012 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1012**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1012**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1013",
      "title": "Lookup, Reference & ADDRESS Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1013",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1013 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1013**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1013**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1014",
      "title": "Lookup, Reference & AREAS Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1014",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1014 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1014**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1014**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1015",
      "title": "Lookup, Reference & HYPERLINK Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1015",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1015 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1015**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1015**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HYPERLINK Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HYPERLINK(...) | Record Output | Matched      |",
      "proTip": "Function HYPERLINK enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1016",
      "title": "Lookup, Reference & VLOOKUP Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1016",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1016 in range B4:D30. You must construct dynamic lookup formulas using **VLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1016**.",
        "In cell **C4**, write formula using **VLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1016**.\n2. **Type VLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "VLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =VLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function VLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1017",
      "title": "Lookup, Reference & HLOOKUP Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1017",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1017 in range B4:D30. You must construct dynamic lookup formulas using **HLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1017**.",
        "In cell **C4**, write formula using **HLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1017**.\n2. **Type HLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "HLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =HLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function HLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1018",
      "title": "Lookup, Reference & INDEX Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1018",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1018 in range B4:D30. You must construct dynamic lookup formulas using **INDEX** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1018**.",
        "In cell **C4**, write formula using **INDEX** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1018**.\n2. **Type INDEX Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "INDEX Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =INDEX(...) | Record Output | Matched      |",
      "proTip": "Function INDEX enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1019",
      "title": "Lookup, Reference & MATCH Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1019",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1019 in range B4:D30. You must construct dynamic lookup formulas using **MATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1019**.",
        "In cell **C4**, write formula using **MATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1019**.\n2. **Type MATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "MATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =MATCH(...) | Record Output | Matched      |",
      "proTip": "Function MATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1020",
      "title": "Lookup, Reference & XLOOKUP Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1020",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1020 in range B4:D30. You must construct dynamic lookup formulas using **XLOOKUP** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1020**.",
        "In cell **C4**, write formula using **XLOOKUP** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1020**.\n2. **Type XLOOKUP Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XLOOKUP(...) | Record Output | Matched      |",
      "proTip": "Function XLOOKUP enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1021",
      "title": "Lookup, Reference & XMATCH Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1021",
      "formula": "=XMATCH(B4, Data!A:A)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1021 in range B4:D30. You must construct dynamic lookup formulas using **XMATCH** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1021**.",
        "In cell **C4**, write formula using **XMATCH** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1021**.\n2. **Type XMATCH Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XMATCH Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =XMATCH(...) | Record Output | Matched      |",
      "proTip": "Function XMATCH enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1022",
      "title": "Lookup, Reference & CHOOSE Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1022",
      "formula": "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1022 in range B4:D30. You must construct dynamic lookup formulas using **CHOOSE** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1022**.",
        "In cell **C4**, write formula using **CHOOSE** e.g. `=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\")`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1022**.\n2. **Type CHOOSE Formula**: Enter `=CHOOSE(2, \"Q1\", \"Q2\")`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "CHOOSE Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =CHOOSE(...) | Record Output | Matched      |",
      "proTip": "Function CHOOSE enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1023",
      "title": "Lookup, Reference & ADDRESS Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1023",
      "formula": "=ADDRESS(4, 2, 1)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1023 in range B4:D30. You must construct dynamic lookup formulas using **ADDRESS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1023**.",
        "In cell **C4**, write formula using **ADDRESS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1023**.\n2. **Type ADDRESS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "ADDRESS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =ADDRESS(...) | Record Output | Matched      |",
      "proTip": "Function ADDRESS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1024",
      "title": "Lookup, Reference & AREAS Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1024",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1024 in range B4:D30. You must construct dynamic lookup formulas using **AREAS** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1024**.",
        "In cell **C4**, write formula using **AREAS** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1024**.\n2. **Type AREAS Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "AREAS Result",
        "rendered": "Extracted Record"
      },
      "expectedOutput": "| ID Code | Applied Method | Screen Result | Match Status |\n| ------- | -------------- | ------------- | ------------ |\n| EX-101  | =AREAS(...) | Record Output | Matched      |",
      "proTip": "Function AREAS enables powerful non-linear data lookups without hardcoding fixed cell indices!"
    },
    {
      "projectId": "EX1025",
      "title": "Lookup, Reference & HYPERLINK Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1025",
      "formula": "=XLOOKUP(B4, Master!A:A, Master!B:B)",
      "description": "As a Data Analyst, you are performing data matching on worksheet EX1025 in range B4:D30. You must construct dynamic lookup formulas using **HYPERLINK** to retrieve client records, return matrix row/column addresses, or execute scenario switches cleanly.",
      "requirements": [
        "Navigate to worksheet tab **EX1025**.",
        "In cell **C4**, write formula using **HYPERLINK** e.g. `=XMATCH(B4, Master!A:A)`.",
        "Wrap potential missing match errors inside `IFERROR(..., \"Record Missing\")`.",
        "Drag formula down through row 30.",
        "Verify exact lookup match accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1025**.\n2. **Type HYPERLINK Formula**: Enter `=XMATCH(B4, Master!A:A)`.\n3. **Copy Down**: Highlight C4 and drag fill handle down to C30.\n4. **Audit Check**: Test with missing input ID and verify clean error fallback.",
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
