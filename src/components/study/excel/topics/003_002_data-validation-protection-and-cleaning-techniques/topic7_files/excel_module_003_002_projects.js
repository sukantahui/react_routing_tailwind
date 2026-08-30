export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_003_002",
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
      "projectId": "EX1301",
      "title": "Practical Workplace Audit & Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1301",
      "formula": "=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1301 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1301.",
      "requirements": [
        "Open worksheet tab **EX1301** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1301**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "26500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 26,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1301-01| =IFERROR(XLOOKUP)| ₹ 26,500.00 | Verified     |\n| C5   | EMP-EX1301-02| =IFERROR(XLOOKUP)| ₹ 36,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1302",
      "title": "Practical Workplace Audit & Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1302",
      "formula": "=IFERROR(XLOOKUP(A5, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1302 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1302.",
      "requirements": [
        "Open worksheet tab **EX1302** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1302**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "28000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 28,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1302-01| =IFERROR(XLOOKUP)| ₹ 28,000.00 | Verified     |\n| C5   | EMP-EX1302-02| =IFERROR(XLOOKUP)| ₹ 38,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1303",
      "title": "Practical Workplace Audit & Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1303",
      "formula": "=IFERROR(XLOOKUP(A6, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1303 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1303.",
      "requirements": [
        "Open worksheet tab **EX1303** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1303**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "29500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 29,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1303-01| =IFERROR(XLOOKUP)| ₹ 29,500.00 | Verified     |\n| C5   | EMP-EX1303-02| =IFERROR(XLOOKUP)| ₹ 39,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1304",
      "title": "Practical Workplace Audit & Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1304",
      "formula": "=IFERROR(XLOOKUP(A7, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1304 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1304.",
      "requirements": [
        "Open worksheet tab **EX1304** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1304**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "31000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 31,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1304-01| =IFERROR(XLOOKUP)| ₹ 31,000.00 | Verified     |\n| C5   | EMP-EX1304-02| =IFERROR(XLOOKUP)| ₹ 41,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1305",
      "title": "Practical Workplace Audit & Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1305",
      "formula": "=IFERROR(XLOOKUP(A8, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1305 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1305.",
      "requirements": [
        "Open worksheet tab **EX1305** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1305**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "32500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 32,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1305-01| =IFERROR(XLOOKUP)| ₹ 32,500.00 | Verified     |\n| C5   | EMP-EX1305-02| =IFERROR(XLOOKUP)| ₹ 42,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1306",
      "title": "Practical Workplace Audit & Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1306",
      "formula": "=IFERROR(XLOOKUP(A9, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1306 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1306.",
      "requirements": [
        "Open worksheet tab **EX1306** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1306**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "34000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 34,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1306-01| =IFERROR(XLOOKUP)| ₹ 34,000.00 | Verified     |\n| C5   | EMP-EX1306-02| =IFERROR(XLOOKUP)| ₹ 44,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1307",
      "title": "Practical Workplace Audit & Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1307",
      "formula": "=IFERROR(XLOOKUP(A10, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1307 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1307.",
      "requirements": [
        "Open worksheet tab **EX1307** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1307**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "35500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 35,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1307-01| =IFERROR(XLOOKUP)| ₹ 35,500.00 | Verified     |\n| C5   | EMP-EX1307-02| =IFERROR(XLOOKUP)| ₹ 45,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1308",
      "title": "Practical Workplace Audit & Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1308",
      "formula": "=IFERROR(XLOOKUP(A11, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1308 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1308.",
      "requirements": [
        "Open worksheet tab **EX1308** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1308**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "37000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 37,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1308-01| =IFERROR(XLOOKUP)| ₹ 37,000.00 | Verified     |\n| C5   | EMP-EX1308-02| =IFERROR(XLOOKUP)| ₹ 47,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1309",
      "title": "Practical Workplace Audit & Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1309",
      "formula": "=IFERROR(XLOOKUP(A12, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1309 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1309.",
      "requirements": [
        "Open worksheet tab **EX1309** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1309**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "38500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 38,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1309-01| =IFERROR(XLOOKUP)| ₹ 38,500.00 | Verified     |\n| C5   | EMP-EX1309-02| =IFERROR(XLOOKUP)| ₹ 48,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1310",
      "title": "Practical Workplace Audit & Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1310",
      "formula": "=IFERROR(XLOOKUP(A13, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1310 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1310.",
      "requirements": [
        "Open worksheet tab **EX1310** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1310**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "40000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 40,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1310-01| =IFERROR(XLOOKUP)| ₹ 40,000.00 | Verified     |\n| C5   | EMP-EX1310-02| =IFERROR(XLOOKUP)| ₹ 50,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1311",
      "title": "Practical Workplace Audit & Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1311",
      "formula": "=IFERROR(XLOOKUP(A14, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1311 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1311.",
      "requirements": [
        "Open worksheet tab **EX1311** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1311**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "41500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 41,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1311-01| =IFERROR(XLOOKUP)| ₹ 41,500.00 | Verified     |\n| C5   | EMP-EX1311-02| =IFERROR(XLOOKUP)| ₹ 51,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1312",
      "title": "Practical Workplace Audit & Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1312",
      "formula": "=IFERROR(XLOOKUP(A15, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1312 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1312.",
      "requirements": [
        "Open worksheet tab **EX1312** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1312**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "43000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 43,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1312-01| =IFERROR(XLOOKUP)| ₹ 43,000.00 | Verified     |\n| C5   | EMP-EX1312-02| =IFERROR(XLOOKUP)| ₹ 53,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1313",
      "title": "Practical Workplace Audit & Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1313",
      "formula": "=IFERROR(XLOOKUP(A16, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1313 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1313.",
      "requirements": [
        "Open worksheet tab **EX1313** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1313**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "44500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 44,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1313-01| =IFERROR(XLOOKUP)| ₹ 44,500.00 | Verified     |\n| C5   | EMP-EX1313-02| =IFERROR(XLOOKUP)| ₹ 54,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1314",
      "title": "Practical Workplace Audit & Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1314",
      "formula": "=IFERROR(XLOOKUP(A17, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1314 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1314.",
      "requirements": [
        "Open worksheet tab **EX1314** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1314**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "46000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 46,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1314-01| =IFERROR(XLOOKUP)| ₹ 46,000.00 | Verified     |\n| C5   | EMP-EX1314-02| =IFERROR(XLOOKUP)| ₹ 56,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1315",
      "title": "Practical Workplace Audit & Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1315",
      "formula": "=IFERROR(XLOOKUP(A18, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1315 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1315.",
      "requirements": [
        "Open worksheet tab **EX1315** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1315**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "47500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 47,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1315-01| =IFERROR(XLOOKUP)| ₹ 47,500.00 | Verified     |\n| C5   | EMP-EX1315-02| =IFERROR(XLOOKUP)| ₹ 57,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1316",
      "title": "Practical Workplace Audit & Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1316",
      "formula": "=IFERROR(XLOOKUP(A19, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1316 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1316.",
      "requirements": [
        "Open worksheet tab **EX1316** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1316**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "49000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 49,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1316-01| =IFERROR(XLOOKUP)| ₹ 49,000.00 | Verified     |\n| C5   | EMP-EX1316-02| =IFERROR(XLOOKUP)| ₹ 59,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1317",
      "title": "Practical Workplace Audit & Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1317",
      "formula": "=IFERROR(XLOOKUP(A20, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1317 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1317.",
      "requirements": [
        "Open worksheet tab **EX1317** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1317**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "50500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 50,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1317-01| =IFERROR(XLOOKUP)| ₹ 50,500.00 | Verified     |\n| C5   | EMP-EX1317-02| =IFERROR(XLOOKUP)| ₹ 60,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1318",
      "title": "Practical Workplace Audit & Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1318",
      "formula": "=IFERROR(XLOOKUP(A21, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1318 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1318.",
      "requirements": [
        "Open worksheet tab **EX1318** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1318**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "52000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 52,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1318-01| =IFERROR(XLOOKUP)| ₹ 52,000.00 | Verified     |\n| C5   | EMP-EX1318-02| =IFERROR(XLOOKUP)| ₹ 62,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1319",
      "title": "Practical Workplace Audit & Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1319",
      "formula": "=IFERROR(XLOOKUP(A22, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1319 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1319.",
      "requirements": [
        "Open worksheet tab **EX1319** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1319**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "53500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 53,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1319-01| =IFERROR(XLOOKUP)| ₹ 53,500.00 | Verified     |\n| C5   | EMP-EX1319-02| =IFERROR(XLOOKUP)| ₹ 63,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1320",
      "title": "Practical Workplace Audit & Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1320",
      "formula": "=IFERROR(XLOOKUP(A23, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1320 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1320.",
      "requirements": [
        "Open worksheet tab **EX1320** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1320**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "55000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 55,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1320-01| =IFERROR(XLOOKUP)| ₹ 55,000.00 | Verified     |\n| C5   | EMP-EX1320-02| =IFERROR(XLOOKUP)| ₹ 65,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1321",
      "title": "Practical Workplace Audit & Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1321",
      "formula": "=IFERROR(XLOOKUP(A24, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1321 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1321.",
      "requirements": [
        "Open worksheet tab **EX1321** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1321**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "56500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 56,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1321-01| =IFERROR(XLOOKUP)| ₹ 56,500.00 | Verified     |\n| C5   | EMP-EX1321-02| =IFERROR(XLOOKUP)| ₹ 66,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1322",
      "title": "Practical Workplace Audit & Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1322",
      "formula": "=IFERROR(XLOOKUP(A25, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1322 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1322.",
      "requirements": [
        "Open worksheet tab **EX1322** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1322**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "58000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 58,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1322-01| =IFERROR(XLOOKUP)| ₹ 58,000.00 | Verified     |\n| C5   | EMP-EX1322-02| =IFERROR(XLOOKUP)| ₹ 68,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1323",
      "title": "Practical Workplace Audit & Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1323",
      "formula": "=IFERROR(XLOOKUP(A26, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1323 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1323.",
      "requirements": [
        "Open worksheet tab **EX1323** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1323**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "59500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 59,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1323-01| =IFERROR(XLOOKUP)| ₹ 59,500.00 | Verified     |\n| C5   | EMP-EX1323-02| =IFERROR(XLOOKUP)| ₹ 69,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1324",
      "title": "Practical Workplace Audit & Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1324",
      "formula": "=IFERROR(XLOOKUP(A27, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1324 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1324.",
      "requirements": [
        "Open worksheet tab **EX1324** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1324**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "61000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 61,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1324-01| =IFERROR(XLOOKUP)| ₹ 61,000.00 | Verified     |\n| C5   | EMP-EX1324-02| =IFERROR(XLOOKUP)| ₹ 71,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1325",
      "title": "Practical Workplace Audit & Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1325",
      "formula": "=IFERROR(XLOOKUP(A28, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1325 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1325.",
      "requirements": [
        "Open worksheet tab **EX1325** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1325**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "62500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 62,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1325-01| =IFERROR(XLOOKUP)| ₹ 62,500.00 | Verified     |\n| C5   | EMP-EX1325-02| =IFERROR(XLOOKUP)| ₹ 72,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_003_002",
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
      "projectId": "EX1301",
      "title": "Practical Workplace Audit & Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1301",
      "formula": "=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1301 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1301.",
      "requirements": [
        "Open worksheet tab **EX1301** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1301**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "26500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 26,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1301-01| =IFERROR(XLOOKUP)| ₹ 26,500.00 | Verified     |\n| C5   | EMP-EX1301-02| =IFERROR(XLOOKUP)| ₹ 36,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1302",
      "title": "Practical Workplace Audit & Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1302",
      "formula": "=IFERROR(XLOOKUP(A5, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1302 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1302.",
      "requirements": [
        "Open worksheet tab **EX1302** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1302**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "28000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 28,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1302-01| =IFERROR(XLOOKUP)| ₹ 28,000.00 | Verified     |\n| C5   | EMP-EX1302-02| =IFERROR(XLOOKUP)| ₹ 38,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1303",
      "title": "Practical Workplace Audit & Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1303",
      "formula": "=IFERROR(XLOOKUP(A6, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1303 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1303.",
      "requirements": [
        "Open worksheet tab **EX1303** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1303**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "29500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 29,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1303-01| =IFERROR(XLOOKUP)| ₹ 29,500.00 | Verified     |\n| C5   | EMP-EX1303-02| =IFERROR(XLOOKUP)| ₹ 39,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1304",
      "title": "Practical Workplace Audit & Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1304",
      "formula": "=IFERROR(XLOOKUP(A7, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1304 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1304.",
      "requirements": [
        "Open worksheet tab **EX1304** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1304**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "31000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 31,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1304-01| =IFERROR(XLOOKUP)| ₹ 31,000.00 | Verified     |\n| C5   | EMP-EX1304-02| =IFERROR(XLOOKUP)| ₹ 41,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1305",
      "title": "Practical Workplace Audit & Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1305",
      "formula": "=IFERROR(XLOOKUP(A8, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1305 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1305.",
      "requirements": [
        "Open worksheet tab **EX1305** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1305**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "32500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 32,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1305-01| =IFERROR(XLOOKUP)| ₹ 32,500.00 | Verified     |\n| C5   | EMP-EX1305-02| =IFERROR(XLOOKUP)| ₹ 42,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1306",
      "title": "Practical Workplace Audit & Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1306",
      "formula": "=IFERROR(XLOOKUP(A9, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1306 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1306.",
      "requirements": [
        "Open worksheet tab **EX1306** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1306**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "34000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 34,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1306-01| =IFERROR(XLOOKUP)| ₹ 34,000.00 | Verified     |\n| C5   | EMP-EX1306-02| =IFERROR(XLOOKUP)| ₹ 44,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1307",
      "title": "Practical Workplace Audit & Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1307",
      "formula": "=IFERROR(XLOOKUP(A10, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1307 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1307.",
      "requirements": [
        "Open worksheet tab **EX1307** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1307**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "35500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 35,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1307-01| =IFERROR(XLOOKUP)| ₹ 35,500.00 | Verified     |\n| C5   | EMP-EX1307-02| =IFERROR(XLOOKUP)| ₹ 45,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1308",
      "title": "Practical Workplace Audit & Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1308",
      "formula": "=IFERROR(XLOOKUP(A11, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1308 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1308.",
      "requirements": [
        "Open worksheet tab **EX1308** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1308**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "37000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 37,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1308-01| =IFERROR(XLOOKUP)| ₹ 37,000.00 | Verified     |\n| C5   | EMP-EX1308-02| =IFERROR(XLOOKUP)| ₹ 47,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1309",
      "title": "Practical Workplace Audit & Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1309",
      "formula": "=IFERROR(XLOOKUP(A12, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1309 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1309.",
      "requirements": [
        "Open worksheet tab **EX1309** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1309**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "38500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 38,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1309-01| =IFERROR(XLOOKUP)| ₹ 38,500.00 | Verified     |\n| C5   | EMP-EX1309-02| =IFERROR(XLOOKUP)| ₹ 48,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1310",
      "title": "Practical Workplace Audit & Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1310",
      "formula": "=IFERROR(XLOOKUP(A13, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1310 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1310.",
      "requirements": [
        "Open worksheet tab **EX1310** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1310**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "40000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 40,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1310-01| =IFERROR(XLOOKUP)| ₹ 40,000.00 | Verified     |\n| C5   | EMP-EX1310-02| =IFERROR(XLOOKUP)| ₹ 50,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1311",
      "title": "Practical Workplace Audit & Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1311",
      "formula": "=IFERROR(XLOOKUP(A14, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1311 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1311.",
      "requirements": [
        "Open worksheet tab **EX1311** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1311**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "41500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 41,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1311-01| =IFERROR(XLOOKUP)| ₹ 41,500.00 | Verified     |\n| C5   | EMP-EX1311-02| =IFERROR(XLOOKUP)| ₹ 51,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1312",
      "title": "Practical Workplace Audit & Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1312",
      "formula": "=IFERROR(XLOOKUP(A15, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1312 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1312.",
      "requirements": [
        "Open worksheet tab **EX1312** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1312**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "43000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 43,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1312-01| =IFERROR(XLOOKUP)| ₹ 43,000.00 | Verified     |\n| C5   | EMP-EX1312-02| =IFERROR(XLOOKUP)| ₹ 53,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1313",
      "title": "Practical Workplace Audit & Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1313",
      "formula": "=IFERROR(XLOOKUP(A16, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1313 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1313.",
      "requirements": [
        "Open worksheet tab **EX1313** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1313**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "44500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 44,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1313-01| =IFERROR(XLOOKUP)| ₹ 44,500.00 | Verified     |\n| C5   | EMP-EX1313-02| =IFERROR(XLOOKUP)| ₹ 54,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1314",
      "title": "Practical Workplace Audit & Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1314",
      "formula": "=IFERROR(XLOOKUP(A17, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1314 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1314.",
      "requirements": [
        "Open worksheet tab **EX1314** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1314**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "46000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 46,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1314-01| =IFERROR(XLOOKUP)| ₹ 46,000.00 | Verified     |\n| C5   | EMP-EX1314-02| =IFERROR(XLOOKUP)| ₹ 56,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1315",
      "title": "Practical Workplace Audit & Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1315",
      "formula": "=IFERROR(XLOOKUP(A18, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1315 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1315.",
      "requirements": [
        "Open worksheet tab **EX1315** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1315**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "47500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 47,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1315-01| =IFERROR(XLOOKUP)| ₹ 47,500.00 | Verified     |\n| C5   | EMP-EX1315-02| =IFERROR(XLOOKUP)| ₹ 57,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1316",
      "title": "Practical Workplace Audit & Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1316",
      "formula": "=IFERROR(XLOOKUP(A19, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1316 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1316.",
      "requirements": [
        "Open worksheet tab **EX1316** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1316**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "49000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 49,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1316-01| =IFERROR(XLOOKUP)| ₹ 49,000.00 | Verified     |\n| C5   | EMP-EX1316-02| =IFERROR(XLOOKUP)| ₹ 59,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1317",
      "title": "Practical Workplace Audit & Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1317",
      "formula": "=IFERROR(XLOOKUP(A20, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1317 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1317.",
      "requirements": [
        "Open worksheet tab **EX1317** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1317**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "50500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 50,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1317-01| =IFERROR(XLOOKUP)| ₹ 50,500.00 | Verified     |\n| C5   | EMP-EX1317-02| =IFERROR(XLOOKUP)| ₹ 60,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1318",
      "title": "Practical Workplace Audit & Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1318",
      "formula": "=IFERROR(XLOOKUP(A21, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1318 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1318.",
      "requirements": [
        "Open worksheet tab **EX1318** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1318**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "52000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 52,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1318-01| =IFERROR(XLOOKUP)| ₹ 52,000.00 | Verified     |\n| C5   | EMP-EX1318-02| =IFERROR(XLOOKUP)| ₹ 62,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1319",
      "title": "Practical Workplace Audit & Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1319",
      "formula": "=IFERROR(XLOOKUP(A22, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1319 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1319.",
      "requirements": [
        "Open worksheet tab **EX1319** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1319**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "53500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 53,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1319-01| =IFERROR(XLOOKUP)| ₹ 53,500.00 | Verified     |\n| C5   | EMP-EX1319-02| =IFERROR(XLOOKUP)| ₹ 63,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1320",
      "title": "Practical Workplace Audit & Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1320",
      "formula": "=IFERROR(XLOOKUP(A23, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1320 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1320.",
      "requirements": [
        "Open worksheet tab **EX1320** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1320**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "55000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 55,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1320-01| =IFERROR(XLOOKUP)| ₹ 55,000.00 | Verified     |\n| C5   | EMP-EX1320-02| =IFERROR(XLOOKUP)| ₹ 65,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1321",
      "title": "Practical Workplace Audit & Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1321",
      "formula": "=IFERROR(XLOOKUP(A24, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1321 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1321.",
      "requirements": [
        "Open worksheet tab **EX1321** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1321**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "56500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 56,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1321-01| =IFERROR(XLOOKUP)| ₹ 56,500.00 | Verified     |\n| C5   | EMP-EX1321-02| =IFERROR(XLOOKUP)| ₹ 66,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1322",
      "title": "Practical Workplace Audit & Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1322",
      "formula": "=IFERROR(XLOOKUP(A25, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1322 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1322.",
      "requirements": [
        "Open worksheet tab **EX1322** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1322**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "58000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 58,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1322-01| =IFERROR(XLOOKUP)| ₹ 58,000.00 | Verified     |\n| C5   | EMP-EX1322-02| =IFERROR(XLOOKUP)| ₹ 68,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1323",
      "title": "Practical Workplace Audit & Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1323",
      "formula": "=IFERROR(XLOOKUP(A26, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1323 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1323.",
      "requirements": [
        "Open worksheet tab **EX1323** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1323**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "59500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 59,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1323-01| =IFERROR(XLOOKUP)| ₹ 59,500.00 | Verified     |\n| C5   | EMP-EX1323-02| =IFERROR(XLOOKUP)| ₹ 69,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1324",
      "title": "Practical Workplace Audit & Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1324",
      "formula": "=IFERROR(XLOOKUP(A27, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1324 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1324.",
      "requirements": [
        "Open worksheet tab **EX1324** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1324**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "61000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 61,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1324-01| =IFERROR(XLOOKUP)| ₹ 61,000.00 | Verified     |\n| C5   | EMP-EX1324-02| =IFERROR(XLOOKUP)| ₹ 71,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX1325",
      "title": "Practical Workplace Audit & Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1325",
      "formula": "=IFERROR(XLOOKUP(A28, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX1325 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX1325.",
      "requirements": [
        "Open worksheet tab **EX1325** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX1325**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "62500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 62,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX1325-01| =IFERROR(XLOOKUP)| ₹ 62,500.00 | Verified     |\n| C5   | EMP-EX1325-02| =IFERROR(XLOOKUP)| ₹ 72,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    }
  ]
};
