export const excelModuleProjectsData = {
  "projectCategory": "Practical Laboratory Exercises: Tables, Sorting and Filtering Master Class",
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
      "projectId": "EX601",
      "title": "Practical Workplace Modeling & Audit (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX601",
      "formula": "=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX101 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX601.",
      "requirements": [
        "Open worksheet tab **EX601** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX601**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "26500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 26,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX601-01| =IFERROR(XLOOKUP)| ₹ 26,500.00 | Verified     |\n| C5   | EMP-EX601-02| =IFERROR(XLOOKUP)| ₹ 36,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX602",
      "title": "Practical Workplace Modeling & Audit (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX602",
      "formula": "=IFERROR(XLOOKUP(A5, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX102 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX602.",
      "requirements": [
        "Open worksheet tab **EX602** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX602**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "28000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 28,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX602-01| =IFERROR(XLOOKUP)| ₹ 28,000.00 | Verified     |\n| C5   | EMP-EX602-02| =IFERROR(XLOOKUP)| ₹ 38,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX603",
      "title": "Practical Workplace Modeling & Audit (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX603",
      "formula": "=IFERROR(XLOOKUP(A6, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX103 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX603.",
      "requirements": [
        "Open worksheet tab **EX603** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX603**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "29500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 29,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX603-01| =IFERROR(XLOOKUP)| ₹ 29,500.00 | Verified     |\n| C5   | EMP-EX603-02| =IFERROR(XLOOKUP)| ₹ 39,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX604",
      "title": "Practical Workplace Modeling & Audit (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX604",
      "formula": "=IFERROR(XLOOKUP(A7, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX104 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX604.",
      "requirements": [
        "Open worksheet tab **EX604** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX604**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "31000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 31,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX604-01| =IFERROR(XLOOKUP)| ₹ 31,000.00 | Verified     |\n| C5   | EMP-EX604-02| =IFERROR(XLOOKUP)| ₹ 41,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX605",
      "title": "Practical Workplace Modeling & Audit (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX605",
      "formula": "=IFERROR(XLOOKUP(A8, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX105 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX605.",
      "requirements": [
        "Open worksheet tab **EX605** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX605**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "32500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 32,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX605-01| =IFERROR(XLOOKUP)| ₹ 32,500.00 | Verified     |\n| C5   | EMP-EX605-02| =IFERROR(XLOOKUP)| ₹ 42,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX606",
      "title": "Practical Workplace Modeling & Audit (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX606",
      "formula": "=IFERROR(XLOOKUP(A9, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX106 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX606.",
      "requirements": [
        "Open worksheet tab **EX606** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX606**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "34000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 34,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX606-01| =IFERROR(XLOOKUP)| ₹ 34,000.00 | Verified     |\n| C5   | EMP-EX606-02| =IFERROR(XLOOKUP)| ₹ 44,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX607",
      "title": "Practical Workplace Modeling & Audit (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX607",
      "formula": "=IFERROR(XLOOKUP(A10, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX107 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX607.",
      "requirements": [
        "Open worksheet tab **EX607** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX607**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "35500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 35,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX607-01| =IFERROR(XLOOKUP)| ₹ 35,500.00 | Verified     |\n| C5   | EMP-EX607-02| =IFERROR(XLOOKUP)| ₹ 45,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX608",
      "title": "Practical Workplace Modeling & Audit (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX608",
      "formula": "=IFERROR(XLOOKUP(A11, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX108 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX608.",
      "requirements": [
        "Open worksheet tab **EX608** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX608**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "37000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 37,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX608-01| =IFERROR(XLOOKUP)| ₹ 37,000.00 | Verified     |\n| C5   | EMP-EX608-02| =IFERROR(XLOOKUP)| ₹ 47,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX609",
      "title": "Practical Workplace Modeling & Audit (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX609",
      "formula": "=IFERROR(XLOOKUP(A12, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX109 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX609.",
      "requirements": [
        "Open worksheet tab **EX609** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX609**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "38500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 38,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX609-01| =IFERROR(XLOOKUP)| ₹ 38,500.00 | Verified     |\n| C5   | EMP-EX609-02| =IFERROR(XLOOKUP)| ₹ 48,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX610",
      "title": "Practical Workplace Modeling & Audit (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX610",
      "formula": "=IFERROR(XLOOKUP(A13, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX610.",
      "requirements": [
        "Open worksheet tab **EX610** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX610**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "40000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 40,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX610-01| =IFERROR(XLOOKUP)| ₹ 40,000.00 | Verified     |\n| C5   | EMP-EX610-02| =IFERROR(XLOOKUP)| ₹ 50,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX611",
      "title": "Practical Workplace Modeling & Audit (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX611",
      "formula": "=IFERROR(XLOOKUP(A14, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX611.",
      "requirements": [
        "Open worksheet tab **EX611** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX611**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "41500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 41,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX611-01| =IFERROR(XLOOKUP)| ₹ 41,500.00 | Verified     |\n| C5   | EMP-EX611-02| =IFERROR(XLOOKUP)| ₹ 51,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX612",
      "title": "Practical Workplace Modeling & Audit (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX612",
      "formula": "=IFERROR(XLOOKUP(A15, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX612.",
      "requirements": [
        "Open worksheet tab **EX612** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX612**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "43000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 43,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX612-01| =IFERROR(XLOOKUP)| ₹ 43,000.00 | Verified     |\n| C5   | EMP-EX612-02| =IFERROR(XLOOKUP)| ₹ 53,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX613",
      "title": "Practical Workplace Modeling & Audit (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX613",
      "formula": "=IFERROR(XLOOKUP(A16, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX613.",
      "requirements": [
        "Open worksheet tab **EX613** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX613**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "44500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 44,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX613-01| =IFERROR(XLOOKUP)| ₹ 44,500.00 | Verified     |\n| C5   | EMP-EX613-02| =IFERROR(XLOOKUP)| ₹ 54,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX614",
      "title": "Practical Workplace Modeling & Audit (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX614",
      "formula": "=IFERROR(XLOOKUP(A17, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX614.",
      "requirements": [
        "Open worksheet tab **EX614** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX614**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "46000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 46,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX614-01| =IFERROR(XLOOKUP)| ₹ 46,000.00 | Verified     |\n| C5   | EMP-EX614-02| =IFERROR(XLOOKUP)| ₹ 56,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX615",
      "title": "Practical Workplace Modeling & Audit (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX615",
      "formula": "=IFERROR(XLOOKUP(A18, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX615.",
      "requirements": [
        "Open worksheet tab **EX615** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX615**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "47500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 47,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX615-01| =IFERROR(XLOOKUP)| ₹ 47,500.00 | Verified     |\n| C5   | EMP-EX615-02| =IFERROR(XLOOKUP)| ₹ 57,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX616",
      "title": "Practical Workplace Modeling & Audit (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX616",
      "formula": "=IFERROR(XLOOKUP(A19, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX616.",
      "requirements": [
        "Open worksheet tab **EX616** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX616**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "49000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 49,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX616-01| =IFERROR(XLOOKUP)| ₹ 49,000.00 | Verified     |\n| C5   | EMP-EX616-02| =IFERROR(XLOOKUP)| ₹ 59,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX617",
      "title": "Practical Workplace Modeling & Audit (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX617",
      "formula": "=IFERROR(XLOOKUP(A20, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX617.",
      "requirements": [
        "Open worksheet tab **EX617** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX617**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "50500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 50,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX617-01| =IFERROR(XLOOKUP)| ₹ 50,500.00 | Verified     |\n| C5   | EMP-EX617-02| =IFERROR(XLOOKUP)| ₹ 60,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX618",
      "title": "Practical Workplace Modeling & Audit (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX618",
      "formula": "=IFERROR(XLOOKUP(A21, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX618.",
      "requirements": [
        "Open worksheet tab **EX618** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX618**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "52000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 52,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX618-01| =IFERROR(XLOOKUP)| ₹ 52,000.00 | Verified     |\n| C5   | EMP-EX618-02| =IFERROR(XLOOKUP)| ₹ 62,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX619",
      "title": "Practical Workplace Modeling & Audit (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX619",
      "formula": "=IFERROR(XLOOKUP(A22, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX619.",
      "requirements": [
        "Open worksheet tab **EX619** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX619**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "53500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 53,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX619-01| =IFERROR(XLOOKUP)| ₹ 53,500.00 | Verified     |\n| C5   | EMP-EX619-02| =IFERROR(XLOOKUP)| ₹ 63,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX620",
      "title": "Practical Workplace Modeling & Audit (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX620",
      "formula": "=IFERROR(XLOOKUP(A23, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX620.",
      "requirements": [
        "Open worksheet tab **EX620** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX620**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "55000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 55,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX620-01| =IFERROR(XLOOKUP)| ₹ 55,000.00 | Verified     |\n| C5   | EMP-EX620-02| =IFERROR(XLOOKUP)| ₹ 65,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX621",
      "title": "Practical Workplace Modeling & Audit (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX621",
      "formula": "=IFERROR(XLOOKUP(A24, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX621.",
      "requirements": [
        "Open worksheet tab **EX621** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX621**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "56500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 56,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX621-01| =IFERROR(XLOOKUP)| ₹ 56,500.00 | Verified     |\n| C5   | EMP-EX621-02| =IFERROR(XLOOKUP)| ₹ 66,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX622",
      "title": "Practical Workplace Modeling & Audit (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX622",
      "formula": "=IFERROR(XLOOKUP(A25, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX622.",
      "requirements": [
        "Open worksheet tab **EX622** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX622**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "58000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 58,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX622-01| =IFERROR(XLOOKUP)| ₹ 58,000.00 | Verified     |\n| C5   | EMP-EX622-02| =IFERROR(XLOOKUP)| ₹ 68,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX623",
      "title": "Practical Workplace Modeling & Audit (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX623",
      "formula": "=IFERROR(XLOOKUP(A26, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX623.",
      "requirements": [
        "Open worksheet tab **EX623** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX623**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "59500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 59,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX623-01| =IFERROR(XLOOKUP)| ₹ 59,500.00 | Verified     |\n| C5   | EMP-EX623-02| =IFERROR(XLOOKUP)| ₹ 69,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX624",
      "title": "Practical Workplace Modeling & Audit (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX624",
      "formula": "=IFERROR(XLOOKUP(A27, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX624.",
      "requirements": [
        "Open worksheet tab **EX624** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX624**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "61000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 61,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX624-01| =IFERROR(XLOOKUP)| ₹ 61,000.00 | Verified     |\n| C5   | EMP-EX624-02| =IFERROR(XLOOKUP)| ₹ 71,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX625",
      "title": "Practical Workplace Modeling & Audit (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX625",
      "formula": "=IFERROR(XLOOKUP(A28, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Senior Systems Analyst, you are auditing operational data on worksheet EX110 in range B4:E30. Your objective is to structure dynamic formulas, enforce custom number formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX625.",
      "requirements": [
        "Open worksheet tab **EX625** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula `=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")` in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX625**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "62500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 62,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX625-01| =IFERROR(XLOOKUP)| ₹ 62,500.00 | Verified     |\n| C5   | EMP-EX625-02| =IFERROR(XLOOKUP)| ₹ 72,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    }
  ]
};
