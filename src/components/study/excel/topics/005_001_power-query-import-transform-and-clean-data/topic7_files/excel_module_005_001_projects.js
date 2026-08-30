export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_005_001",
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
      "projectId": "EX2001",
      "title": "Practical Workplace Audit & Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX2001",
      "formula": "=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2001 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2001.",
      "requirements": [
        "Open worksheet tab **EX2001** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2001**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "26500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 26,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2001-01| =IFERROR(XLOOKUP)| ₹ 26,500.00 | Verified     |\n| C5   | EMP-EX2001-02| =IFERROR(XLOOKUP)| ₹ 36,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2002",
      "title": "Practical Workplace Audit & Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX2002",
      "formula": "=IFERROR(XLOOKUP(A5, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2002 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2002.",
      "requirements": [
        "Open worksheet tab **EX2002** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2002**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "28000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 28,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2002-01| =IFERROR(XLOOKUP)| ₹ 28,000.00 | Verified     |\n| C5   | EMP-EX2002-02| =IFERROR(XLOOKUP)| ₹ 38,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2003",
      "title": "Practical Workplace Audit & Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX2003",
      "formula": "=IFERROR(XLOOKUP(A6, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2003 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2003.",
      "requirements": [
        "Open worksheet tab **EX2003** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2003**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "29500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 29,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2003-01| =IFERROR(XLOOKUP)| ₹ 29,500.00 | Verified     |\n| C5   | EMP-EX2003-02| =IFERROR(XLOOKUP)| ₹ 39,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2004",
      "title": "Practical Workplace Audit & Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX2004",
      "formula": "=IFERROR(XLOOKUP(A7, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2004 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2004.",
      "requirements": [
        "Open worksheet tab **EX2004** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2004**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "31000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 31,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2004-01| =IFERROR(XLOOKUP)| ₹ 31,000.00 | Verified     |\n| C5   | EMP-EX2004-02| =IFERROR(XLOOKUP)| ₹ 41,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2005",
      "title": "Practical Workplace Audit & Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX2005",
      "formula": "=IFERROR(XLOOKUP(A8, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2005 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2005.",
      "requirements": [
        "Open worksheet tab **EX2005** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2005**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "32500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 32,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2005-01| =IFERROR(XLOOKUP)| ₹ 32,500.00 | Verified     |\n| C5   | EMP-EX2005-02| =IFERROR(XLOOKUP)| ₹ 42,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2006",
      "title": "Practical Workplace Audit & Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX2006",
      "formula": "=IFERROR(XLOOKUP(A9, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2006 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2006.",
      "requirements": [
        "Open worksheet tab **EX2006** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2006**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "34000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 34,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2006-01| =IFERROR(XLOOKUP)| ₹ 34,000.00 | Verified     |\n| C5   | EMP-EX2006-02| =IFERROR(XLOOKUP)| ₹ 44,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2007",
      "title": "Practical Workplace Audit & Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX2007",
      "formula": "=IFERROR(XLOOKUP(A10, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2007 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2007.",
      "requirements": [
        "Open worksheet tab **EX2007** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2007**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "35500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 35,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2007-01| =IFERROR(XLOOKUP)| ₹ 35,500.00 | Verified     |\n| C5   | EMP-EX2007-02| =IFERROR(XLOOKUP)| ₹ 45,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2008",
      "title": "Practical Workplace Audit & Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX2008",
      "formula": "=IFERROR(XLOOKUP(A11, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2008 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2008.",
      "requirements": [
        "Open worksheet tab **EX2008** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2008**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "37000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 37,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2008-01| =IFERROR(XLOOKUP)| ₹ 37,000.00 | Verified     |\n| C5   | EMP-EX2008-02| =IFERROR(XLOOKUP)| ₹ 47,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2009",
      "title": "Practical Workplace Audit & Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX2009",
      "formula": "=IFERROR(XLOOKUP(A12, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2009 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2009.",
      "requirements": [
        "Open worksheet tab **EX2009** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2009**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "38500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 38,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2009-01| =IFERROR(XLOOKUP)| ₹ 38,500.00 | Verified     |\n| C5   | EMP-EX2009-02| =IFERROR(XLOOKUP)| ₹ 48,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2010",
      "title": "Practical Workplace Audit & Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX2010",
      "formula": "=IFERROR(XLOOKUP(A13, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2010 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2010.",
      "requirements": [
        "Open worksheet tab **EX2010** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2010**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "40000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 40,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2010-01| =IFERROR(XLOOKUP)| ₹ 40,000.00 | Verified     |\n| C5   | EMP-EX2010-02| =IFERROR(XLOOKUP)| ₹ 50,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2011",
      "title": "Practical Workplace Audit & Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX2011",
      "formula": "=IFERROR(XLOOKUP(A14, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2011 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2011.",
      "requirements": [
        "Open worksheet tab **EX2011** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2011**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "41500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 41,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2011-01| =IFERROR(XLOOKUP)| ₹ 41,500.00 | Verified     |\n| C5   | EMP-EX2011-02| =IFERROR(XLOOKUP)| ₹ 51,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2012",
      "title": "Practical Workplace Audit & Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX2012",
      "formula": "=IFERROR(XLOOKUP(A15, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2012 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2012.",
      "requirements": [
        "Open worksheet tab **EX2012** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2012**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "43000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 43,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2012-01| =IFERROR(XLOOKUP)| ₹ 43,000.00 | Verified     |\n| C5   | EMP-EX2012-02| =IFERROR(XLOOKUP)| ₹ 53,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2013",
      "title": "Practical Workplace Audit & Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX2013",
      "formula": "=IFERROR(XLOOKUP(A16, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2013 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2013.",
      "requirements": [
        "Open worksheet tab **EX2013** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2013**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "44500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 44,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2013-01| =IFERROR(XLOOKUP)| ₹ 44,500.00 | Verified     |\n| C5   | EMP-EX2013-02| =IFERROR(XLOOKUP)| ₹ 54,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2014",
      "title": "Practical Workplace Audit & Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX2014",
      "formula": "=IFERROR(XLOOKUP(A17, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2014 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2014.",
      "requirements": [
        "Open worksheet tab **EX2014** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2014**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "46000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 46,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2014-01| =IFERROR(XLOOKUP)| ₹ 46,000.00 | Verified     |\n| C5   | EMP-EX2014-02| =IFERROR(XLOOKUP)| ₹ 56,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2015",
      "title": "Practical Workplace Audit & Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX2015",
      "formula": "=IFERROR(XLOOKUP(A18, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2015 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2015.",
      "requirements": [
        "Open worksheet tab **EX2015** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2015**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "47500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 47,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2015-01| =IFERROR(XLOOKUP)| ₹ 47,500.00 | Verified     |\n| C5   | EMP-EX2015-02| =IFERROR(XLOOKUP)| ₹ 57,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2016",
      "title": "Practical Workplace Audit & Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX2016",
      "formula": "=IFERROR(XLOOKUP(A19, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2016 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2016.",
      "requirements": [
        "Open worksheet tab **EX2016** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2016**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "49000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 49,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2016-01| =IFERROR(XLOOKUP)| ₹ 49,000.00 | Verified     |\n| C5   | EMP-EX2016-02| =IFERROR(XLOOKUP)| ₹ 59,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2017",
      "title": "Practical Workplace Audit & Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX2017",
      "formula": "=IFERROR(XLOOKUP(A20, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2017 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2017.",
      "requirements": [
        "Open worksheet tab **EX2017** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2017**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "50500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 50,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2017-01| =IFERROR(XLOOKUP)| ₹ 50,500.00 | Verified     |\n| C5   | EMP-EX2017-02| =IFERROR(XLOOKUP)| ₹ 60,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2018",
      "title": "Practical Workplace Audit & Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX2018",
      "formula": "=IFERROR(XLOOKUP(A21, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2018 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2018.",
      "requirements": [
        "Open worksheet tab **EX2018** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2018**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "52000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 52,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2018-01| =IFERROR(XLOOKUP)| ₹ 52,000.00 | Verified     |\n| C5   | EMP-EX2018-02| =IFERROR(XLOOKUP)| ₹ 62,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2019",
      "title": "Practical Workplace Audit & Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX2019",
      "formula": "=IFERROR(XLOOKUP(A22, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2019 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2019.",
      "requirements": [
        "Open worksheet tab **EX2019** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2019**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "53500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 53,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2019-01| =IFERROR(XLOOKUP)| ₹ 53,500.00 | Verified     |\n| C5   | EMP-EX2019-02| =IFERROR(XLOOKUP)| ₹ 63,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2020",
      "title": "Practical Workplace Audit & Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX2020",
      "formula": "=IFERROR(XLOOKUP(A23, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2020 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2020.",
      "requirements": [
        "Open worksheet tab **EX2020** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2020**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "55000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 55,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2020-01| =IFERROR(XLOOKUP)| ₹ 55,000.00 | Verified     |\n| C5   | EMP-EX2020-02| =IFERROR(XLOOKUP)| ₹ 65,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2021",
      "title": "Practical Workplace Audit & Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX2021",
      "formula": "=IFERROR(XLOOKUP(A24, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2021 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2021.",
      "requirements": [
        "Open worksheet tab **EX2021** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2021**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "56500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 56,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2021-01| =IFERROR(XLOOKUP)| ₹ 56,500.00 | Verified     |\n| C5   | EMP-EX2021-02| =IFERROR(XLOOKUP)| ₹ 66,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2022",
      "title": "Practical Workplace Audit & Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX2022",
      "formula": "=IFERROR(XLOOKUP(A25, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2022 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2022.",
      "requirements": [
        "Open worksheet tab **EX2022** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2022**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "58000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 58,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2022-01| =IFERROR(XLOOKUP)| ₹ 58,000.00 | Verified     |\n| C5   | EMP-EX2022-02| =IFERROR(XLOOKUP)| ₹ 68,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2023",
      "title": "Practical Workplace Audit & Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX2023",
      "formula": "=IFERROR(XLOOKUP(A26, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2023 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2023.",
      "requirements": [
        "Open worksheet tab **EX2023** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2023**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "59500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 59,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2023-01| =IFERROR(XLOOKUP)| ₹ 59,500.00 | Verified     |\n| C5   | EMP-EX2023-02| =IFERROR(XLOOKUP)| ₹ 69,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2024",
      "title": "Practical Workplace Audit & Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX2024",
      "formula": "=IFERROR(XLOOKUP(A27, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2024 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2024.",
      "requirements": [
        "Open worksheet tab **EX2024** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2024**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "61000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 61,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2024-01| =IFERROR(XLOOKUP)| ₹ 61,000.00 | Verified     |\n| C5   | EMP-EX2024-02| =IFERROR(XLOOKUP)| ₹ 71,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2025",
      "title": "Practical Workplace Audit & Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX2025",
      "formula": "=IFERROR(XLOOKUP(A28, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2025 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2025.",
      "requirements": [
        "Open worksheet tab **EX2025** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2025**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "62500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 62,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2025-01| =IFERROR(XLOOKUP)| ₹ 62,500.00 | Verified     |\n| C5   | EMP-EX2025-02| =IFERROR(XLOOKUP)| ₹ 72,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_005_001",
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
      "projectId": "EX2001",
      "title": "Practical Workplace Audit & Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX2001",
      "formula": "=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2001 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2001.",
      "requirements": [
        "Open worksheet tab **EX2001** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2001**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "26500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 26,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2001-01| =IFERROR(XLOOKUP)| ₹ 26,500.00 | Verified     |\n| C5   | EMP-EX2001-02| =IFERROR(XLOOKUP)| ₹ 36,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2002",
      "title": "Practical Workplace Audit & Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX2002",
      "formula": "=IFERROR(XLOOKUP(A5, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2002 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2002.",
      "requirements": [
        "Open worksheet tab **EX2002** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2002**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "28000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 28,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2002-01| =IFERROR(XLOOKUP)| ₹ 28,000.00 | Verified     |\n| C5   | EMP-EX2002-02| =IFERROR(XLOOKUP)| ₹ 38,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2003",
      "title": "Practical Workplace Audit & Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX2003",
      "formula": "=IFERROR(XLOOKUP(A6, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2003 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2003.",
      "requirements": [
        "Open worksheet tab **EX2003** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2003**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "29500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 29,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2003-01| =IFERROR(XLOOKUP)| ₹ 29,500.00 | Verified     |\n| C5   | EMP-EX2003-02| =IFERROR(XLOOKUP)| ₹ 39,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2004",
      "title": "Practical Workplace Audit & Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX2004",
      "formula": "=IFERROR(XLOOKUP(A7, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2004 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2004.",
      "requirements": [
        "Open worksheet tab **EX2004** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2004**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "31000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 31,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2004-01| =IFERROR(XLOOKUP)| ₹ 31,000.00 | Verified     |\n| C5   | EMP-EX2004-02| =IFERROR(XLOOKUP)| ₹ 41,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2005",
      "title": "Practical Workplace Audit & Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX2005",
      "formula": "=IFERROR(XLOOKUP(A8, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2005 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2005.",
      "requirements": [
        "Open worksheet tab **EX2005** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2005**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "32500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 32,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2005-01| =IFERROR(XLOOKUP)| ₹ 32,500.00 | Verified     |\n| C5   | EMP-EX2005-02| =IFERROR(XLOOKUP)| ₹ 42,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2006",
      "title": "Practical Workplace Audit & Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX2006",
      "formula": "=IFERROR(XLOOKUP(A9, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2006 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2006.",
      "requirements": [
        "Open worksheet tab **EX2006** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2006**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "34000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 34,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2006-01| =IFERROR(XLOOKUP)| ₹ 34,000.00 | Verified     |\n| C5   | EMP-EX2006-02| =IFERROR(XLOOKUP)| ₹ 44,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2007",
      "title": "Practical Workplace Audit & Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX2007",
      "formula": "=IFERROR(XLOOKUP(A10, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2007 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2007.",
      "requirements": [
        "Open worksheet tab **EX2007** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2007**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "35500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 35,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2007-01| =IFERROR(XLOOKUP)| ₹ 35,500.00 | Verified     |\n| C5   | EMP-EX2007-02| =IFERROR(XLOOKUP)| ₹ 45,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2008",
      "title": "Practical Workplace Audit & Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX2008",
      "formula": "=IFERROR(XLOOKUP(A11, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2008 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2008.",
      "requirements": [
        "Open worksheet tab **EX2008** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2008**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "37000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 37,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2008-01| =IFERROR(XLOOKUP)| ₹ 37,000.00 | Verified     |\n| C5   | EMP-EX2008-02| =IFERROR(XLOOKUP)| ₹ 47,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2009",
      "title": "Practical Workplace Audit & Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX2009",
      "formula": "=IFERROR(XLOOKUP(A12, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2009 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2009.",
      "requirements": [
        "Open worksheet tab **EX2009** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2009**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "38500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 38,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2009-01| =IFERROR(XLOOKUP)| ₹ 38,500.00 | Verified     |\n| C5   | EMP-EX2009-02| =IFERROR(XLOOKUP)| ₹ 48,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2010",
      "title": "Practical Workplace Audit & Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX2010",
      "formula": "=IFERROR(XLOOKUP(A13, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2010 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2010.",
      "requirements": [
        "Open worksheet tab **EX2010** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2010**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "40000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 40,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2010-01| =IFERROR(XLOOKUP)| ₹ 40,000.00 | Verified     |\n| C5   | EMP-EX2010-02| =IFERROR(XLOOKUP)| ₹ 50,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2011",
      "title": "Practical Workplace Audit & Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX2011",
      "formula": "=IFERROR(XLOOKUP(A14, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2011 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2011.",
      "requirements": [
        "Open worksheet tab **EX2011** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2011**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "41500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 41,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2011-01| =IFERROR(XLOOKUP)| ₹ 41,500.00 | Verified     |\n| C5   | EMP-EX2011-02| =IFERROR(XLOOKUP)| ₹ 51,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2012",
      "title": "Practical Workplace Audit & Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX2012",
      "formula": "=IFERROR(XLOOKUP(A15, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2012 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2012.",
      "requirements": [
        "Open worksheet tab **EX2012** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2012**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "43000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 43,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2012-01| =IFERROR(XLOOKUP)| ₹ 43,000.00 | Verified     |\n| C5   | EMP-EX2012-02| =IFERROR(XLOOKUP)| ₹ 53,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2013",
      "title": "Practical Workplace Audit & Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX2013",
      "formula": "=IFERROR(XLOOKUP(A16, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2013 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2013.",
      "requirements": [
        "Open worksheet tab **EX2013** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2013**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "44500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 44,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2013-01| =IFERROR(XLOOKUP)| ₹ 44,500.00 | Verified     |\n| C5   | EMP-EX2013-02| =IFERROR(XLOOKUP)| ₹ 54,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2014",
      "title": "Practical Workplace Audit & Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX2014",
      "formula": "=IFERROR(XLOOKUP(A17, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2014 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2014.",
      "requirements": [
        "Open worksheet tab **EX2014** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2014**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "46000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 46,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2014-01| =IFERROR(XLOOKUP)| ₹ 46,000.00 | Verified     |\n| C5   | EMP-EX2014-02| =IFERROR(XLOOKUP)| ₹ 56,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2015",
      "title": "Practical Workplace Audit & Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX2015",
      "formula": "=IFERROR(XLOOKUP(A18, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2015 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2015.",
      "requirements": [
        "Open worksheet tab **EX2015** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2015**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "47500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 47,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2015-01| =IFERROR(XLOOKUP)| ₹ 47,500.00 | Verified     |\n| C5   | EMP-EX2015-02| =IFERROR(XLOOKUP)| ₹ 57,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2016",
      "title": "Practical Workplace Audit & Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX2016",
      "formula": "=IFERROR(XLOOKUP(A19, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2016 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2016.",
      "requirements": [
        "Open worksheet tab **EX2016** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2016**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "49000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 49,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2016-01| =IFERROR(XLOOKUP)| ₹ 49,000.00 | Verified     |\n| C5   | EMP-EX2016-02| =IFERROR(XLOOKUP)| ₹ 59,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2017",
      "title": "Practical Workplace Audit & Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX2017",
      "formula": "=IFERROR(XLOOKUP(A20, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2017 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2017.",
      "requirements": [
        "Open worksheet tab **EX2017** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2017**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "50500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 50,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2017-01| =IFERROR(XLOOKUP)| ₹ 50,500.00 | Verified     |\n| C5   | EMP-EX2017-02| =IFERROR(XLOOKUP)| ₹ 60,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2018",
      "title": "Practical Workplace Audit & Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX2018",
      "formula": "=IFERROR(XLOOKUP(A21, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2018 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2018.",
      "requirements": [
        "Open worksheet tab **EX2018** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2018**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "52000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 52,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2018-01| =IFERROR(XLOOKUP)| ₹ 52,000.00 | Verified     |\n| C5   | EMP-EX2018-02| =IFERROR(XLOOKUP)| ₹ 62,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2019",
      "title": "Practical Workplace Audit & Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX2019",
      "formula": "=IFERROR(XLOOKUP(A22, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2019 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2019.",
      "requirements": [
        "Open worksheet tab **EX2019** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2019**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "53500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 53,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2019-01| =IFERROR(XLOOKUP)| ₹ 53,500.00 | Verified     |\n| C5   | EMP-EX2019-02| =IFERROR(XLOOKUP)| ₹ 63,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2020",
      "title": "Practical Workplace Audit & Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX2020",
      "formula": "=IFERROR(XLOOKUP(A23, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2020 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2020.",
      "requirements": [
        "Open worksheet tab **EX2020** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2020**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "55000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 55,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2020-01| =IFERROR(XLOOKUP)| ₹ 55,000.00 | Verified     |\n| C5   | EMP-EX2020-02| =IFERROR(XLOOKUP)| ₹ 65,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2021",
      "title": "Practical Workplace Audit & Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX2021",
      "formula": "=IFERROR(XLOOKUP(A24, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2021 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2021.",
      "requirements": [
        "Open worksheet tab **EX2021** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2021**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "56500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 56,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2021-01| =IFERROR(XLOOKUP)| ₹ 56,500.00 | Verified     |\n| C5   | EMP-EX2021-02| =IFERROR(XLOOKUP)| ₹ 66,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2022",
      "title": "Practical Workplace Audit & Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX2022",
      "formula": "=IFERROR(XLOOKUP(A25, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2022 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2022.",
      "requirements": [
        "Open worksheet tab **EX2022** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2022**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "58000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 58,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2022-01| =IFERROR(XLOOKUP)| ₹ 58,000.00 | Verified     |\n| C5   | EMP-EX2022-02| =IFERROR(XLOOKUP)| ₹ 68,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2023",
      "title": "Practical Workplace Audit & Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX2023",
      "formula": "=IFERROR(XLOOKUP(A26, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2023 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2023.",
      "requirements": [
        "Open worksheet tab **EX2023** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2023**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "59500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 59,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2023-01| =IFERROR(XLOOKUP)| ₹ 59,500.00 | Verified     |\n| C5   | EMP-EX2023-02| =IFERROR(XLOOKUP)| ₹ 69,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2024",
      "title": "Practical Workplace Audit & Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX2024",
      "formula": "=IFERROR(XLOOKUP(A27, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2024 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2024.",
      "requirements": [
        "Open worksheet tab **EX2024** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2024**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "61000",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 61,000.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2024-01| =IFERROR(XLOOKUP)| ₹ 61,000.00 | Verified     |\n| C5   | EMP-EX2024-02| =IFERROR(XLOOKUP)| ₹ 71,000.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    },
    {
      "projectId": "EX2025",
      "title": "Practical Workplace Audit & Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX2025",
      "formula": "=IFERROR(XLOOKUP(A28, Data!A:A, Data!C:C), \"Pending Audit\")",
      "description": "As a Business Systems Analyst, you are auditing operational data on worksheet EX2025 in cell range B4:E30. The current grid payload contains inconsistent formats, missing lookups, and unformatted outputs. Your goal is to structure formulas, enforce custom formatting masks, verify underlying float memory, and ensure zero error propagation on tab EX2025.",
      "requirements": [
        "Open worksheet tab **EX2025** in your master workbook.",
        "Highlight range **B4:E30** and verify column data types.",
        "Apply formula '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' in cell **C4**.",
        "Format monetary outputs with Indian currency mask '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Double-click fill handle to copy formulas down through row 30.",
        "Verify summary formula '=SUM(C4:C30)' in cell **C31** computes cleanly."
      ],
      "stepByStep": "1. **Navigate to Tab**: Click worksheet tab **EX2025**.\n2. **Highlight Range**: Select cells B4:E30.\n3. **Apply Formula**: Click cell C4, enter '=IFERROR(XLOOKUP(A4, Data!A:A, Data!C:C), \"Pending Audit\")' and press **Enter**.\n4. **Apply Format Mask**: Press **Ctrl + 1**, select **Custom**, paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' and click **OK**.\n5. **Audit Verification**: Confirm calculations run cleanly without #VALUE! or #N/A errors.",
      "rawMemoryVsRendered": {
        "raw": "62500",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 62,500.00"
      },
      "expectedOutput": "| Cell | Input Identifier | Applied Operation | Rendered Screen Display | Audit Status |\n| ---- | ---------------- | ----------------- | ----------------------- | ------------ |\n| C4   | EMP-EX2025-01| =IFERROR(XLOOKUP)| ₹ 62,500.00 | Verified     |\n| C5   | EMP-EX2025-02| =IFERROR(XLOOKUP)| ₹ 72,500.00 | Verified     |",
      "proTip": "Always double-check formulas with Ctrl + ~ to toggle formula view and audit cell dependencies before submitting final workbooks!"
    }
  ]
};
