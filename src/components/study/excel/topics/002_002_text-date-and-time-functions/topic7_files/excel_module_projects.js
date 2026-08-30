export const excelModuleProjectsData = {
  "projectCategory": "Projects_002_002",
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
      "projectId": "EX701",
      "title": "Practical Workplace Audit & Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX701",
      "formula": "=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX701 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX701.",
      "requirements": [
        "Open worksheet tab **EX701** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX701**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "26500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 26,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX701-01| =IFERROR(XLOOKUP)| ₹ 26,500.00 | Verified     |\n| C5   | EMP-EX701-02| =IFERROR(XLOOKUP)| ₹ 36,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX702",
      "title": "Practical Workplace Audit & Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX702",
      "formula": "=IFERROR(XLOOKUP(A5, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX702 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX702.",
      "requirements": [
        "Open worksheet tab **EX702** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX702**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "28000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 28,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX702-01| =IFERROR(XLOOKUP)| ₹ 28,000.00 | Verified     |\n| C5   | EMP-EX702-02| =IFERROR(XLOOKUP)| ₹ 38,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX703",
      "title": "Practical Workplace Audit & Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX703",
      "formula": "=IFERROR(XLOOKUP(A6, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX703 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX703.",
      "requirements": [
        "Open worksheet tab **EX703** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX703**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "29500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 29,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX703-01| =IFERROR(XLOOKUP)| ₹ 29,500.00 | Verified     |\n| C5   | EMP-EX703-02| =IFERROR(XLOOKUP)| ₹ 39,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX704",
      "title": "Practical Workplace Audit & Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX704",
      "formula": "=IFERROR(XLOOKUP(A7, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX704 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX704.",
      "requirements": [
        "Open worksheet tab **EX704** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX704**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "31000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 31,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX704-01| =IFERROR(XLOOKUP)| ₹ 31,000.00 | Verified     |\n| C5   | EMP-EX704-02| =IFERROR(XLOOKUP)| ₹ 41,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX705",
      "title": "Practical Workplace Audit & Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX705",
      "formula": "=IFERROR(XLOOKUP(A8, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX705 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX705.",
      "requirements": [
        "Open worksheet tab **EX705** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX705**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "32500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 32,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX705-01| =IFERROR(XLOOKUP)| ₹ 32,500.00 | Verified     |\n| C5   | EMP-EX705-02| =IFERROR(XLOOKUP)| ₹ 42,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX706",
      "title": "Practical Workplace Audit & Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX706",
      "formula": "=IFERROR(XLOOKUP(A9, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX706 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX706.",
      "requirements": [
        "Open worksheet tab **EX706** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX706**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "34000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 34,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX706-01| =IFERROR(XLOOKUP)| ₹ 34,000.00 | Verified     |\n| C5   | EMP-EX706-02| =IFERROR(XLOOKUP)| ₹ 44,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX707",
      "title": "Practical Workplace Audit & Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX707",
      "formula": "=IFERROR(XLOOKUP(A10, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX707 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX707.",
      "requirements": [
        "Open worksheet tab **EX707** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX707**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "35500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 35,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX707-01| =IFERROR(XLOOKUP)| ₹ 35,500.00 | Verified     |\n| C5   | EMP-EX707-02| =IFERROR(XLOOKUP)| ₹ 45,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX708",
      "title": "Practical Workplace Audit & Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX708",
      "formula": "=IFERROR(XLOOKUP(A11, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX708 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX708.",
      "requirements": [
        "Open worksheet tab **EX708** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX708**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "37000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 37,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX708-01| =IFERROR(XLOOKUP)| ₹ 37,000.00 | Verified     |\n| C5   | EMP-EX708-02| =IFERROR(XLOOKUP)| ₹ 47,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX709",
      "title": "Practical Workplace Audit & Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX709",
      "formula": "=IFERROR(XLOOKUP(A12, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX709 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX709.",
      "requirements": [
        "Open worksheet tab **EX709** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX709**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "38500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 38,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX709-01| =IFERROR(XLOOKUP)| ₹ 38,500.00 | Verified     |\n| C5   | EMP-EX709-02| =IFERROR(XLOOKUP)| ₹ 48,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX710",
      "title": "Practical Workplace Audit & Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX710",
      "formula": "=IFERROR(XLOOKUP(A13, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX710 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX710.",
      "requirements": [
        "Open worksheet tab **EX710** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX710**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "40000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 40,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX710-01| =IFERROR(XLOOKUP)| ₹ 40,000.00 | Verified     |\n| C5   | EMP-EX710-02| =IFERROR(XLOOKUP)| ₹ 50,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX711",
      "title": "Practical Workplace Audit & Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX711",
      "formula": "=IFERROR(XLOOKUP(A14, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX711 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX711.",
      "requirements": [
        "Open worksheet tab **EX711** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX711**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "41500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 41,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX711-01| =IFERROR(XLOOKUP)| ₹ 41,500.00 | Verified     |\n| C5   | EMP-EX711-02| =IFERROR(XLOOKUP)| ₹ 51,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX712",
      "title": "Practical Workplace Audit & Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX712",
      "formula": "=IFERROR(XLOOKUP(A15, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX712 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX712.",
      "requirements": [
        "Open worksheet tab **EX712** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX712**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "43000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 43,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX712-01| =IFERROR(XLOOKUP)| ₹ 43,000.00 | Verified     |\n| C5   | EMP-EX712-02| =IFERROR(XLOOKUP)| ₹ 53,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX713",
      "title": "Practical Workplace Audit & Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX713",
      "formula": "=IFERROR(XLOOKUP(A16, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX713 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX713.",
      "requirements": [
        "Open worksheet tab **EX713** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX713**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "44500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 44,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX713-01| =IFERROR(XLOOKUP)| ₹ 44,500.00 | Verified     |\n| C5   | EMP-EX713-02| =IFERROR(XLOOKUP)| ₹ 54,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX714",
      "title": "Practical Workplace Audit & Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX714",
      "formula": "=IFERROR(XLOOKUP(A17, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX714 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX714.",
      "requirements": [
        "Open worksheet tab **EX714** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX714**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "46000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 46,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX714-01| =IFERROR(XLOOKUP)| ₹ 46,000.00 | Verified     |\n| C5   | EMP-EX714-02| =IFERROR(XLOOKUP)| ₹ 56,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX715",
      "title": "Practical Workplace Audit & Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX715",
      "formula": "=IFERROR(XLOOKUP(A18, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX715 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX715.",
      "requirements": [
        "Open worksheet tab **EX715** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX715**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "47500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 47,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX715-01| =IFERROR(XLOOKUP)| ₹ 47,500.00 | Verified     |\n| C5   | EMP-EX715-02| =IFERROR(XLOOKUP)| ₹ 57,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX716",
      "title": "Practical Workplace Audit & Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX716",
      "formula": "=IFERROR(XLOOKUP(A19, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX716 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX716.",
      "requirements": [
        "Open worksheet tab **EX716** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX716**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "49000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 49,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX716-01| =IFERROR(XLOOKUP)| ₹ 49,000.00 | Verified     |\n| C5   | EMP-EX716-02| =IFERROR(XLOOKUP)| ₹ 59,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX717",
      "title": "Practical Workplace Audit & Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX717",
      "formula": "=IFERROR(XLOOKUP(A20, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX717 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX717.",
      "requirements": [
        "Open worksheet tab **EX717** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX717**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "50500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 50,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX717-01| =IFERROR(XLOOKUP)| ₹ 50,500.00 | Verified     |\n| C5   | EMP-EX717-02| =IFERROR(XLOOKUP)| ₹ 60,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX718",
      "title": "Practical Workplace Audit & Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX718",
      "formula": "=IFERROR(XLOOKUP(A21, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX718 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX718.",
      "requirements": [
        "Open worksheet tab **EX718** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX718**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "52000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 52,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX718-01| =IFERROR(XLOOKUP)| ₹ 52,000.00 | Verified     |\n| C5   | EMP-EX718-02| =IFERROR(XLOOKUP)| ₹ 62,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX719",
      "title": "Practical Workplace Audit & Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX719",
      "formula": "=IFERROR(XLOOKUP(A22, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX719 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX719.",
      "requirements": [
        "Open worksheet tab **EX719** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX719**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "53500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 53,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX719-01| =IFERROR(XLOOKUP)| ₹ 53,500.00 | Verified     |\n| C5   | EMP-EX719-02| =IFERROR(XLOOKUP)| ₹ 63,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX720",
      "title": "Practical Workplace Audit & Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX720",
      "formula": "=IFERROR(XLOOKUP(A23, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX720 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX720.",
      "requirements": [
        "Open worksheet tab **EX720** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX720**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "55000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 55,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX720-01| =IFERROR(XLOOKUP)| ₹ 55,000.00 | Verified     |\n| C5   | EMP-EX720-02| =IFERROR(XLOOKUP)| ₹ 65,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX721",
      "title": "Practical Workplace Audit & Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX721",
      "formula": "=IFERROR(XLOOKUP(A24, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX721 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX721.",
      "requirements": [
        "Open worksheet tab **EX721** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX721**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "56500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 56,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX721-01| =IFERROR(XLOOKUP)| ₹ 56,500.00 | Verified     |\n| C5   | EMP-EX721-02| =IFERROR(XLOOKUP)| ₹ 66,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX722",
      "title": "Practical Workplace Audit & Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX722",
      "formula": "=IFERROR(XLOOKUP(A25, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX722 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX722.",
      "requirements": [
        "Open worksheet tab **EX722** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX722**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "58000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 58,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX722-01| =IFERROR(XLOOKUP)| ₹ 58,000.00 | Verified     |\n| C5   | EMP-EX722-02| =IFERROR(XLOOKUP)| ₹ 68,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX723",
      "title": "Practical Workplace Audit & Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX723",
      "formula": "=IFERROR(XLOOKUP(A26, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX723 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX723.",
      "requirements": [
        "Open worksheet tab **EX723** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX723**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "59500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 59,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX723-01| =IFERROR(XLOOKUP)| ₹ 59,500.00 | Verified     |\n| C5   | EMP-EX723-02| =IFERROR(XLOOKUP)| ₹ 69,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX724",
      "title": "Practical Workplace Audit & Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX724",
      "formula": "=IFERROR(XLOOKUP(A27, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX724 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX724.",
      "requirements": [
        "Open worksheet tab **EX724** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX724**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "61000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 61,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX724-01| =IFERROR(XLOOKUP)| ₹ 61,000.00 | Verified     |\n| C5   | EMP-EX724-02| =IFERROR(XLOOKUP)| ₹ 71,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX725",
      "title": "Practical Workplace Audit & Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX725",
      "formula": "=IFERROR(XLOOKUP(A28, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX725 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX725.",
      "requirements": [
        "Open worksheet tab **EX725** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX725**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "62500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 62,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX725-01| =IFERROR(XLOOKUP)| ₹ 62,500.00 | Verified     |\n| C5   | EMP-EX725-02| =IFERROR(XLOOKUP)| ₹ 72,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    }
  ]
};
