export const excelModuleProjectsData = {
  "projectCategory": "Projects_006_003",
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
      "projectId": "EX2601",
      "title": "Practical Workplace Audit & Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX2601",
      "formula": "=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2601 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2601.",
      "requirements": [
        "Open worksheet tab **EX2601** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2601**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "26500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 26,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2601-01| =IFERROR(XLOOKUP)| ₹ 26,500.00 | Verified     |\n| C5   | EMP-EX2601-02| =IFERROR(XLOOKUP)| ₹ 36,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2602",
      "title": "Practical Workplace Audit & Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX2602",
      "formula": "=IFERROR(XLOOKUP(A5, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2602 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2602.",
      "requirements": [
        "Open worksheet tab **EX2602** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2602**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "28000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 28,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2602-01| =IFERROR(XLOOKUP)| ₹ 28,000.00 | Verified     |\n| C5   | EMP-EX2602-02| =IFERROR(XLOOKUP)| ₹ 38,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2603",
      "title": "Practical Workplace Audit & Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX2603",
      "formula": "=IFERROR(XLOOKUP(A6, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2603 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2603.",
      "requirements": [
        "Open worksheet tab **EX2603** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2603**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "29500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 29,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2603-01| =IFERROR(XLOOKUP)| ₹ 29,500.00 | Verified     |\n| C5   | EMP-EX2603-02| =IFERROR(XLOOKUP)| ₹ 39,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2604",
      "title": "Practical Workplace Audit & Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX2604",
      "formula": "=IFERROR(XLOOKUP(A7, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2604 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2604.",
      "requirements": [
        "Open worksheet tab **EX2604** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2604**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "31000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 31,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2604-01| =IFERROR(XLOOKUP)| ₹ 31,000.00 | Verified     |\n| C5   | EMP-EX2604-02| =IFERROR(XLOOKUP)| ₹ 41,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2605",
      "title": "Practical Workplace Audit & Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX2605",
      "formula": "=IFERROR(XLOOKUP(A8, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2605 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2605.",
      "requirements": [
        "Open worksheet tab **EX2605** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2605**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "32500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 32,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2605-01| =IFERROR(XLOOKUP)| ₹ 32,500.00 | Verified     |\n| C5   | EMP-EX2605-02| =IFERROR(XLOOKUP)| ₹ 42,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2606",
      "title": "Practical Workplace Audit & Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX2606",
      "formula": "=IFERROR(XLOOKUP(A9, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2606 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2606.",
      "requirements": [
        "Open worksheet tab **EX2606** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2606**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "34000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 34,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2606-01| =IFERROR(XLOOKUP)| ₹ 34,000.00 | Verified     |\n| C5   | EMP-EX2606-02| =IFERROR(XLOOKUP)| ₹ 44,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2607",
      "title": "Practical Workplace Audit & Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX2607",
      "formula": "=IFERROR(XLOOKUP(A10, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2607 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2607.",
      "requirements": [
        "Open worksheet tab **EX2607** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2607**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "35500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 35,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2607-01| =IFERROR(XLOOKUP)| ₹ 35,500.00 | Verified     |\n| C5   | EMP-EX2607-02| =IFERROR(XLOOKUP)| ₹ 45,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2608",
      "title": "Practical Workplace Audit & Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX2608",
      "formula": "=IFERROR(XLOOKUP(A11, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2608 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2608.",
      "requirements": [
        "Open worksheet tab **EX2608** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2608**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "37000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 37,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2608-01| =IFERROR(XLOOKUP)| ₹ 37,000.00 | Verified     |\n| C5   | EMP-EX2608-02| =IFERROR(XLOOKUP)| ₹ 47,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2609",
      "title": "Practical Workplace Audit & Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX2609",
      "formula": "=IFERROR(XLOOKUP(A12, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2609 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2609.",
      "requirements": [
        "Open worksheet tab **EX2609** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2609**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "38500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 38,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2609-01| =IFERROR(XLOOKUP)| ₹ 38,500.00 | Verified     |\n| C5   | EMP-EX2609-02| =IFERROR(XLOOKUP)| ₹ 48,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2610",
      "title": "Practical Workplace Audit & Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX2610",
      "formula": "=IFERROR(XLOOKUP(A13, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2610 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2610.",
      "requirements": [
        "Open worksheet tab **EX2610** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2610**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "40000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 40,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2610-01| =IFERROR(XLOOKUP)| ₹ 40,000.00 | Verified     |\n| C5   | EMP-EX2610-02| =IFERROR(XLOOKUP)| ₹ 50,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2611",
      "title": "Practical Workplace Audit & Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX2611",
      "formula": "=IFERROR(XLOOKUP(A14, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2611 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2611.",
      "requirements": [
        "Open worksheet tab **EX2611** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2611**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "41500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 41,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2611-01| =IFERROR(XLOOKUP)| ₹ 41,500.00 | Verified     |\n| C5   | EMP-EX2611-02| =IFERROR(XLOOKUP)| ₹ 51,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2612",
      "title": "Practical Workplace Audit & Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX2612",
      "formula": "=IFERROR(XLOOKUP(A15, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2612 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2612.",
      "requirements": [
        "Open worksheet tab **EX2612** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2612**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "43000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 43,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2612-01| =IFERROR(XLOOKUP)| ₹ 43,000.00 | Verified     |\n| C5   | EMP-EX2612-02| =IFERROR(XLOOKUP)| ₹ 53,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2613",
      "title": "Practical Workplace Audit & Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX2613",
      "formula": "=IFERROR(XLOOKUP(A16, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2613 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2613.",
      "requirements": [
        "Open worksheet tab **EX2613** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2613**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "44500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 44,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2613-01| =IFERROR(XLOOKUP)| ₹ 44,500.00 | Verified     |\n| C5   | EMP-EX2613-02| =IFERROR(XLOOKUP)| ₹ 54,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2614",
      "title": "Practical Workplace Audit & Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX2614",
      "formula": "=IFERROR(XLOOKUP(A17, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2614 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2614.",
      "requirements": [
        "Open worksheet tab **EX2614** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2614**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "46000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 46,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2614-01| =IFERROR(XLOOKUP)| ₹ 46,000.00 | Verified     |\n| C5   | EMP-EX2614-02| =IFERROR(XLOOKUP)| ₹ 56,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2615",
      "title": "Practical Workplace Audit & Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX2615",
      "formula": "=IFERROR(XLOOKUP(A18, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2615 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2615.",
      "requirements": [
        "Open worksheet tab **EX2615** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2615**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "47500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 47,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2615-01| =IFERROR(XLOOKUP)| ₹ 47,500.00 | Verified     |\n| C5   | EMP-EX2615-02| =IFERROR(XLOOKUP)| ₹ 57,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2616",
      "title": "Practical Workplace Audit & Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX2616",
      "formula": "=IFERROR(XLOOKUP(A19, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2616 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2616.",
      "requirements": [
        "Open worksheet tab **EX2616** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2616**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "49000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 49,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2616-01| =IFERROR(XLOOKUP)| ₹ 49,000.00 | Verified     |\n| C5   | EMP-EX2616-02| =IFERROR(XLOOKUP)| ₹ 59,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2617",
      "title": "Practical Workplace Audit & Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX2617",
      "formula": "=IFERROR(XLOOKUP(A20, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2617 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2617.",
      "requirements": [
        "Open worksheet tab **EX2617** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2617**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "50500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 50,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2617-01| =IFERROR(XLOOKUP)| ₹ 50,500.00 | Verified     |\n| C5   | EMP-EX2617-02| =IFERROR(XLOOKUP)| ₹ 60,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2618",
      "title": "Practical Workplace Audit & Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX2618",
      "formula": "=IFERROR(XLOOKUP(A21, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2618 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2618.",
      "requirements": [
        "Open worksheet tab **EX2618** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2618**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "52000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 52,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2618-01| =IFERROR(XLOOKUP)| ₹ 52,000.00 | Verified     |\n| C5   | EMP-EX2618-02| =IFERROR(XLOOKUP)| ₹ 62,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2619",
      "title": "Practical Workplace Audit & Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX2619",
      "formula": "=IFERROR(XLOOKUP(A22, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2619 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2619.",
      "requirements": [
        "Open worksheet tab **EX2619** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2619**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "53500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 53,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2619-01| =IFERROR(XLOOKUP)| ₹ 53,500.00 | Verified     |\n| C5   | EMP-EX2619-02| =IFERROR(XLOOKUP)| ₹ 63,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2620",
      "title": "Practical Workplace Audit & Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX2620",
      "formula": "=IFERROR(XLOOKUP(A23, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2620 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2620.",
      "requirements": [
        "Open worksheet tab **EX2620** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2620**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "55000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 55,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2620-01| =IFERROR(XLOOKUP)| ₹ 55,000.00 | Verified     |\n| C5   | EMP-EX2620-02| =IFERROR(XLOOKUP)| ₹ 65,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2621",
      "title": "Practical Workplace Audit & Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX2621",
      "formula": "=IFERROR(XLOOKUP(A24, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2621 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2621.",
      "requirements": [
        "Open worksheet tab **EX2621** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2621**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "56500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 56,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2621-01| =IFERROR(XLOOKUP)| ₹ 56,500.00 | Verified     |\n| C5   | EMP-EX2621-02| =IFERROR(XLOOKUP)| ₹ 66,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2622",
      "title": "Practical Workplace Audit & Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX2622",
      "formula": "=IFERROR(XLOOKUP(A25, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2622 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2622.",
      "requirements": [
        "Open worksheet tab **EX2622** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2622**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "58000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 58,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2622-01| =IFERROR(XLOOKUP)| ₹ 58,000.00 | Verified     |\n| C5   | EMP-EX2622-02| =IFERROR(XLOOKUP)| ₹ 68,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2623",
      "title": "Practical Workplace Audit & Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX2623",
      "formula": "=IFERROR(XLOOKUP(A26, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2623 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2623.",
      "requirements": [
        "Open worksheet tab **EX2623** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2623**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "59500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 59,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2623-01| =IFERROR(XLOOKUP)| ₹ 59,500.00 | Verified     |\n| C5   | EMP-EX2623-02| =IFERROR(XLOOKUP)| ₹ 69,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2624",
      "title": "Practical Workplace Audit & Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX2624",
      "formula": "=IFERROR(XLOOKUP(A27, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2624 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2624.",
      "requirements": [
        "Open worksheet tab **EX2624** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2624**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "61000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 61,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2624-01| =IFERROR(XLOOKUP)| ₹ 61,000.00 | Verified     |\n| C5   | EMP-EX2624-02| =IFERROR(XLOOKUP)| ₹ 71,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2625",
      "title": "Practical Workplace Audit & Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX2625",
      "formula": "=IFERROR(XLOOKUP(A28, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2625 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2625.",
      "requirements": [
        "Open worksheet tab **EX2625** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2625**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "62500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 62,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2625-01| =IFERROR(XLOOKUP)| ₹ 62,500.00 | Verified     |\n| C5   | EMP-EX2625-02| =IFERROR(XLOOKUP)| ₹ 72,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    }
  ]
};
