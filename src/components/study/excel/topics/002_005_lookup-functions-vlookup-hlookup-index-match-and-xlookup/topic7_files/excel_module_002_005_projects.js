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
      "title": "Advanced Lookup & Data Matching Lab (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1001",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1001 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1001**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1001**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1002",
      "title": "Advanced Lookup & Data Matching Lab (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1002",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1002 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1002**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1002**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1003",
      "title": "Advanced Lookup & Data Matching Lab (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1003",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1003 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1003**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1003**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1004",
      "title": "Advanced Lookup & Data Matching Lab (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1004",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1004 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1004**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1004**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1005",
      "title": "Advanced Lookup & Data Matching Lab (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1005",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1005 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1005**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1005**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1006",
      "title": "Advanced Lookup & Data Matching Lab (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1006",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1006 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1006**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1006**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1007",
      "title": "Advanced Lookup & Data Matching Lab (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1007",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1007 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1007**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1007**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1008",
      "title": "Advanced Lookup & Data Matching Lab (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1008",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1008 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1008**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1008**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1009",
      "title": "Advanced Lookup & Data Matching Lab (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1009",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1009 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1009**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1009**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1010",
      "title": "Advanced Lookup & Data Matching Lab (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1010",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1010 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1010**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1010**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1011",
      "title": "Advanced Lookup & Data Matching Lab (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1011",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1011 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1011**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1011**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1012",
      "title": "Advanced Lookup & Data Matching Lab (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1012",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1012 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1012**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1012**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1013",
      "title": "Advanced Lookup & Data Matching Lab (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1013",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1013 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1013**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1013**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1014",
      "title": "Advanced Lookup & Data Matching Lab (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1014",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1014 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1014**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1014**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1015",
      "title": "Advanced Lookup & Data Matching Lab (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1015",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1015 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1015**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1015**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1016",
      "title": "Advanced Lookup & Data Matching Lab (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1016",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1016 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1016**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1016**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1017",
      "title": "Advanced Lookup & Data Matching Lab (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1017",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1017 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1017**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1017**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1018",
      "title": "Advanced Lookup & Data Matching Lab (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1018",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1018 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1018**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1018**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1019",
      "title": "Advanced Lookup & Data Matching Lab (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1019",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1019 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1019**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1019**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1020",
      "title": "Advanced Lookup & Data Matching Lab (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1020",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1020 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1020**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1020**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1021",
      "title": "Advanced Lookup & Data Matching Lab (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1021",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1021 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1021**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1021**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1022",
      "title": "Advanced Lookup & Data Matching Lab (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1022",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1022 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1022**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1022**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1023",
      "title": "Advanced Lookup & Data Matching Lab (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1023",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1023 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1023**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1023**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1024",
      "title": "Advanced Lookup & Data Matching Lab (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1024",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1024 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1024**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1024**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1025",
      "title": "Advanced Lookup & Data Matching Lab (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1025",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1025 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1025**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1025**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
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
      "title": "Advanced Lookup & Data Matching Lab (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1001",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1001 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1001**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1001**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1002",
      "title": "Advanced Lookup & Data Matching Lab (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1002",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1002 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1002**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1002**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1003",
      "title": "Advanced Lookup & Data Matching Lab (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1003",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1003 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1003**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1003**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1004",
      "title": "Advanced Lookup & Data Matching Lab (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1004",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1004 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1004**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1004**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1005",
      "title": "Advanced Lookup & Data Matching Lab (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1005",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1005 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1005**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1005**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1006",
      "title": "Advanced Lookup & Data Matching Lab (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1006",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1006 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1006**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1006**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1007",
      "title": "Advanced Lookup & Data Matching Lab (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1007",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1007 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1007**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1007**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1008",
      "title": "Advanced Lookup & Data Matching Lab (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1008",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1008 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1008**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1008**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1009",
      "title": "Advanced Lookup & Data Matching Lab (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1009",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1009 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1009**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1009**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1010",
      "title": "Advanced Lookup & Data Matching Lab (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1010",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1010 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1010**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1010**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1011",
      "title": "Advanced Lookup & Data Matching Lab (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1011",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1011 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1011**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1011**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1012",
      "title": "Advanced Lookup & Data Matching Lab (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1012",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1012 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1012**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1012**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1013",
      "title": "Advanced Lookup & Data Matching Lab (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1013",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1013 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1013**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1013**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1014",
      "title": "Advanced Lookup & Data Matching Lab (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1014",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1014 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1014**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1014**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1015",
      "title": "Advanced Lookup & Data Matching Lab (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1015",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1015 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1015**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1015**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1016",
      "title": "Advanced Lookup & Data Matching Lab (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1016",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1016 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1016**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1016**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1017",
      "title": "Advanced Lookup & Data Matching Lab (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1017",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1017 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1017**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1017**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1018",
      "title": "Advanced Lookup & Data Matching Lab (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1018",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1018 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1018**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1018**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1019",
      "title": "Advanced Lookup & Data Matching Lab (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1019",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1019 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1019**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1019**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1020",
      "title": "Advanced Lookup & Data Matching Lab (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1020",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1020 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1020**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1020**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1021",
      "title": "Advanced Lookup & Data Matching Lab (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1021",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1021 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1021**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1021**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1022",
      "title": "Advanced Lookup & Data Matching Lab (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1022",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1022 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1022**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1022**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1023",
      "title": "Advanced Lookup & Data Matching Lab (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1023",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1023 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1023**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1023**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1024",
      "title": "Advanced Lookup & Data Matching Lab (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1024",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1024 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1024**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1024**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1025",
      "title": "Advanced Lookup & Data Matching Lab (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1025",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1025 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1025**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1025**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    }
  ]
};
