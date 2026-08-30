export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_001_005",
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
      "projectId": "EX301",
      "title": "Custom Number Formatting & Data Hygiene (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX301",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX301 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX301** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX301**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1150000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 1"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX302",
      "title": "Custom Number Formatting & Data Hygiene (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX302",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX302 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX302** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX302**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1300000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 2"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX303",
      "title": "Custom Number Formatting & Data Hygiene (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX303",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX303 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX303** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX303**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1450000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 3"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX304",
      "title": "Custom Number Formatting & Data Hygiene (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX304",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX304 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX304** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX304**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1600000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 4"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX305",
      "title": "Custom Number Formatting & Data Hygiene (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX305",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX305 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX305** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX305**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1750000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 5"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX306",
      "title": "Custom Number Formatting & Data Hygiene (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX306",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX306 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX306** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX306**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1900000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 6"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX307",
      "title": "Custom Number Formatting & Data Hygiene (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX307",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX307 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX307** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX307**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2050000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 7"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX308",
      "title": "Custom Number Formatting & Data Hygiene (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX308",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX308 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX308** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX308**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2200000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 8"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX309",
      "title": "Custom Number Formatting & Data Hygiene (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX309",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX309 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX309** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX309**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2350000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 9"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX310",
      "title": "Custom Number Formatting & Data Hygiene (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX310",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX310 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX310** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX310**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2500000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 10"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX311",
      "title": "Custom Number Formatting & Data Hygiene (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX311",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX311 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX311** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX311**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2650000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 11"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX312",
      "title": "Custom Number Formatting & Data Hygiene (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX312",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX312 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX312** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX312**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2800000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 12"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX313",
      "title": "Custom Number Formatting & Data Hygiene (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX313",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX313 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX313** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX313**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2950000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 13"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX314",
      "title": "Custom Number Formatting & Data Hygiene (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX314",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX314 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX314** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX314**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3100000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 14"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX315",
      "title": "Custom Number Formatting & Data Hygiene (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX315",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX315 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX315** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX315**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3250000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 15"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX316",
      "title": "Custom Number Formatting & Data Hygiene (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX316",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX316 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX316** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX316**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3400000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 16"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX317",
      "title": "Custom Number Formatting & Data Hygiene (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX317",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX317 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX317** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX317**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3550000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 17"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX318",
      "title": "Custom Number Formatting & Data Hygiene (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX318",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX318 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX318** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX318**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3700000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 18"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX319",
      "title": "Custom Number Formatting & Data Hygiene (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX319",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX319 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX319** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX319**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3850000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 19"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX320",
      "title": "Custom Number Formatting & Data Hygiene (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX320",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX320 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX320** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX320**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4000000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 20"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX321",
      "title": "Custom Number Formatting & Data Hygiene (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX321",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX321 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX321** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX321**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4150000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 21"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX322",
      "title": "Custom Number Formatting & Data Hygiene (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX322",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX322 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX322** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX322**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4300000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 22"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX323",
      "title": "Custom Number Formatting & Data Hygiene (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX323",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX323 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX323** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX323**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4450000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 23"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX324",
      "title": "Custom Number Formatting & Data Hygiene (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX324",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX324 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX324** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX324**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4600000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 24"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX325",
      "title": "Custom Number Formatting & Data Hygiene (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX325",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX325 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX325** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX325**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4750000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 25"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_001_005",
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
      "projectId": "EX301",
      "title": "Custom Number Formatting & Data Hygiene (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX301",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX301 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX301** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX301**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1150000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 1"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX302",
      "title": "Custom Number Formatting & Data Hygiene (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX302",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX302 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX302** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX302**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1300000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 2"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX303",
      "title": "Custom Number Formatting & Data Hygiene (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX303",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX303 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX303** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX303**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1450000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 3"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX304",
      "title": "Custom Number Formatting & Data Hygiene (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX304",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX304 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX304** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX304**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1600000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 4"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX305",
      "title": "Custom Number Formatting & Data Hygiene (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX305",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX305 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX305** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX305**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1750000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 5"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX306",
      "title": "Custom Number Formatting & Data Hygiene (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX306",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX306 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX306** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX306**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1900000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 6"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX307",
      "title": "Custom Number Formatting & Data Hygiene (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX307",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX307 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX307** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX307**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2050000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 7"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX308",
      "title": "Custom Number Formatting & Data Hygiene (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX308",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX308 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX308** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX308**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2200000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 8"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX309",
      "title": "Custom Number Formatting & Data Hygiene (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX309",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX309 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX309** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX309**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2350000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 9"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX310",
      "title": "Custom Number Formatting & Data Hygiene (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX310",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX310 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX310** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX310**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2500000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 10"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX311",
      "title": "Custom Number Formatting & Data Hygiene (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX311",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX311 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX311** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX311**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2650000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 11"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX312",
      "title": "Custom Number Formatting & Data Hygiene (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX312",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX312 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX312** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX312**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2800000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 12"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX313",
      "title": "Custom Number Formatting & Data Hygiene (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX313",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX313 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX313** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX313**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2950000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 13"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX314",
      "title": "Custom Number Formatting & Data Hygiene (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX314",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX314 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX314** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX314**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3100000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 14"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX315",
      "title": "Custom Number Formatting & Data Hygiene (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX315",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX315 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX315** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX315**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3250000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 15"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX316",
      "title": "Custom Number Formatting & Data Hygiene (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX316",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX316 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX316** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX316**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3400000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 16"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX317",
      "title": "Custom Number Formatting & Data Hygiene (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX317",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX317 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX317** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX317**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3550000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 17"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX318",
      "title": "Custom Number Formatting & Data Hygiene (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX318",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX318 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX318** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX318**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3700000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 18"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX319",
      "title": "Custom Number Formatting & Data Hygiene (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX319",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX319 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX319** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX319**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3850000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 19"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX320",
      "title": "Custom Number Formatting & Data Hygiene (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX320",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX320 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX320** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX320**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4000000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 20"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX321",
      "title": "Custom Number Formatting & Data Hygiene (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX321",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX321 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX321** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX321**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4150000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 21"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX322",
      "title": "Custom Number Formatting & Data Hygiene (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX322",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX322 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX322** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX322**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4300000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 22"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX323",
      "title": "Custom Number Formatting & Data Hygiene (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX323",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX323 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX323** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX323**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4450000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 23"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX324",
      "title": "Custom Number Formatting & Data Hygiene (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX324",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX324 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX324** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX324**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4600000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 24"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX325",
      "title": "Custom Number Formatting & Data Hygiene (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX325",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX325 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX325** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX325**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4750000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 25"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    }
  ]
};
