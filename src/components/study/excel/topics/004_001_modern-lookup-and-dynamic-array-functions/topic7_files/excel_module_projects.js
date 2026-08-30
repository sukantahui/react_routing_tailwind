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
      "title": "Advanced Lookup & Data Matching Lab (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1601",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1601 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1601**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1601**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1602",
      "title": "Advanced Lookup & Data Matching Lab (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1602",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1602 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1602**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1602**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1603",
      "title": "Advanced Lookup & Data Matching Lab (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1603",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1603 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1603**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1603**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1604",
      "title": "Advanced Lookup & Data Matching Lab (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1604",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1604 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1604**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1604**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1605",
      "title": "Advanced Lookup & Data Matching Lab (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1605",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1605 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1605**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1605**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1606",
      "title": "Advanced Lookup & Data Matching Lab (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1606",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1606 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1606**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1606**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1607",
      "title": "Advanced Lookup & Data Matching Lab (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1607",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1607 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1607**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1607**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1608",
      "title": "Advanced Lookup & Data Matching Lab (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1608",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1608 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1608**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1608**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1609",
      "title": "Advanced Lookup & Data Matching Lab (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1609",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1609 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1609**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1609**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1610",
      "title": "Advanced Lookup & Data Matching Lab (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1610",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1610 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1610**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1610**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1611",
      "title": "Advanced Lookup & Data Matching Lab (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1611",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1611 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1611**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1611**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1612",
      "title": "Advanced Lookup & Data Matching Lab (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1612",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1612 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1612**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1612**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1613",
      "title": "Advanced Lookup & Data Matching Lab (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1613",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1613 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1613**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1613**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1614",
      "title": "Advanced Lookup & Data Matching Lab (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1614",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1614 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1614**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1614**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1615",
      "title": "Advanced Lookup & Data Matching Lab (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1615",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1615 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1615**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1615**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1616",
      "title": "Advanced Lookup & Data Matching Lab (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1616",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1616 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1616**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1616**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1617",
      "title": "Advanced Lookup & Data Matching Lab (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1617",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1617 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1617**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1617**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1618",
      "title": "Advanced Lookup & Data Matching Lab (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1618",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1618 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1618**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1618**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1619",
      "title": "Advanced Lookup & Data Matching Lab (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1619",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1619 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1619**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1619**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1620",
      "title": "Advanced Lookup & Data Matching Lab (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1620",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1620 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1620**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1620**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1621",
      "title": "Advanced Lookup & Data Matching Lab (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1621",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1621 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1621**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1621**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1622",
      "title": "Advanced Lookup & Data Matching Lab (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1622",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1622 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1622**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1622**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1623",
      "title": "Advanced Lookup & Data Matching Lab (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1623",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1623 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1623**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1623**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1624",
      "title": "Advanced Lookup & Data Matching Lab (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1624",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1624 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1624**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1624**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
      "rawMemoryVsRendered": {
        "raw": "EX-104",
        "mask": "XLOOKUP Result",
        "rendered": "Sukanta Hui (AccoTax)"
      },
      "expectedOutput": "| Lookup ID | Extracted Client Name | Account Balance | Match Status |\n| --------- | --------------------- | --------------- | ------------ |\n| EX-101    | Rahul Verma           | ₹ 1,45,000.00   | Matched      |\n| EX-102    | Anita Sharma          | ₹ 3,20,000.00   | Matched      |\n| EX-999    | Not Found             | Check ID        | Handled      |",
      "proTip": "XLOOKUP replaces legacy VLOOKUP because it searches left-to-right or right-to-left, does not break when inserting columns, and defaults to exact match (0)!"
    },
    {
      "projectId": "EX1625",
      "title": "Advanced Lookup & Data Matching Lab (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1625",
      "formula": "=XLOOKUP(B4, MasterData!A:A, MasterData!D:D, \"Record Not Found\", 0, 1)",
      "description": "As a Data Analyst, you are reconciling client IDs in range B4:B30 on sheet EX1625 against an external master database table on sheet MasterData. Your task is to write dynamic XLOOKUP and INDEX-MATCH formulas in column C to pull client names, and column D to pull outstanding balances, ensuring clean fallback strings when IDs are missing.",
      "requirements": [
        "Navigate to worksheet tab **EX1625**.",
        "In cell **C4**, write '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")'.",
        "In cell **D4**, write '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.",
        "Wrap potential missing match errors inside 'IFERROR(..., \"Check ID\")'.",
        "Drag formulas down through row 30 and verify lookup accuracy."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1625**.\n2. **Construct XLOOKUP**: Type '=XLOOKUP(B4, MasterData!A:A, MasterData!B:B, \"Not Found\")' in C4.\n3. **Construct INDEX-MATCH**: In D4, type '=INDEX(MasterData!D:D, MATCH(B4, MasterData!A:A, 0))'.\n4. **Copy Down**: Highlight C4:D4 and drag fill handle down to row 30.\n5. **Audit Verification**: Test with a non-existent ID e.g. EX-999 and verify fallback string displays cleanly without #N/A.",
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
