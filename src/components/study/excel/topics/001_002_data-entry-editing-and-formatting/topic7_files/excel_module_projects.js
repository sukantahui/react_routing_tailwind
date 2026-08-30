export const excelModuleProjectsData = {
  "projectCategory": "Projects_001_002",
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
      "projectId": "EX201",
      "title": "Custom Number Formatting & Data Hygiene (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX201",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX201 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX201** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX201**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1150000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 1"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX202",
      "title": "Custom Number Formatting & Data Hygiene (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX202",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX202 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX202** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX202**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1300000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 2"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX203",
      "title": "Custom Number Formatting & Data Hygiene (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX203",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX203 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX203** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX203**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1450000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 3"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX204",
      "title": "Custom Number Formatting & Data Hygiene (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX204",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX204 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX204** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX204**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1600000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 4"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX205",
      "title": "Custom Number Formatting & Data Hygiene (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX205",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX205 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX205** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX205**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1750000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 5"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX206",
      "title": "Custom Number Formatting & Data Hygiene (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX206",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX206 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX206** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX206**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "1900000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 6"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX207",
      "title": "Custom Number Formatting & Data Hygiene (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX207",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX207 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX207** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX207**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2050000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 7"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX208",
      "title": "Custom Number Formatting & Data Hygiene (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX208",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX208 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX208** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX208**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2200000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 8"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX209",
      "title": "Custom Number Formatting & Data Hygiene (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX209",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX209 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX209** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX209**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2350000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 9"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX210",
      "title": "Custom Number Formatting & Data Hygiene (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX210",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX210 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX210** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX210**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2500000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 10"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX211",
      "title": "Custom Number Formatting & Data Hygiene (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX211",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX211 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX211** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX211**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2650000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 11"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX212",
      "title": "Custom Number Formatting & Data Hygiene (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX212",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX212 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX212** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX212**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2800000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 12"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX213",
      "title": "Custom Number Formatting & Data Hygiene (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX213",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX213 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX213** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX213**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "2950000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 13"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX214",
      "title": "Custom Number Formatting & Data Hygiene (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX214",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX214 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX214** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX214**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3100000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 14"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX215",
      "title": "Custom Number Formatting & Data Hygiene (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX215",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX215 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX215** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX215**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3250000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 15"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX216",
      "title": "Custom Number Formatting & Data Hygiene (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX216",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX216 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX216** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX216**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3400000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 16"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX217",
      "title": "Custom Number Formatting & Data Hygiene (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX217",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX217 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX217** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX217**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3550000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 17"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX218",
      "title": "Custom Number Formatting & Data Hygiene (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX218",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX218 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX218** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX218**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3700000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 18"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX219",
      "title": "Custom Number Formatting & Data Hygiene (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX219",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX219 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX219** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX219**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "3850000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 19"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX220",
      "title": "Custom Number Formatting & Data Hygiene (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX220",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX220 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX220** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX220**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4000000",
        "mask": "[h]:mm:ss",
        "rendered": "Formatted Payload 20"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX221",
      "title": "Custom Number Formatting & Data Hygiene (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX221",
      "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX221 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX221** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX221**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4150000",
        "mask": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
        "rendered": "Formatted Payload 21"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX222",
      "title": "Custom Number Formatting & Data Hygiene (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX222",
      "formula": "0000-0000-0000",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX222 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (0000-0000-0000) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX222** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '0000-0000-0000'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX222**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '0000-0000-0000' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4300000",
        "mask": "0000-0000-0000",
        "rendered": "Formatted Payload 22"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX223",
      "title": "Custom Number Formatting & Data Hygiene (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX223",
      "formula": "dd-mmm-yyyy (dddd)",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX223 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask (dd-mmm-yyyy (dddd)) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX223** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: 'dd-mmm-yyyy (dddd)'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX223**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste 'dd-mmm-yyyy (dddd)' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4450000",
        "mask": "dd-mmm-yyyy (dddd)",
        "rendered": "Formatted Payload 23"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX224",
      "title": "Custom Number Formatting & Data Hygiene (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX224",
      "formula": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX224 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX224** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX224**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
      "rawMemoryVsRendered": {
        "raw": "4600000",
        "mask": "[>10000000]₹ #,,,\" Cr\";[>100000]₹ #,,\" Lakh\";₹ #,##0",
        "rendered": "Formatted Payload 24"
      },
      "expectedOutput": "| Cell | Raw Memory Float | Screen Display Output | Audit Check |\n| ---- | ---------------- | --------------------- | ----------- |\n| B4   | 14500000         | Formatted Mask Display| Passed      |\n| B5   | -250000          | [Red] Parentheses Mask| Passed      |\n| B26  | =SUM(B4:B25)     | Total Revenue Sum     | Passed      |",
      "proTip": "Never type currency symbols ('₹') or text directly into cells! Typing characters converts numbers to text strings, breaking SUM calculations!"
    },
    {
      "projectId": "EX225",
      "title": "Custom Number Formatting & Data Hygiene (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX225",
      "formula": "[h]:mm:ss",
      "description": "As a Financial Reporting Specialist, you are auditing raw numerical payloads on sheet EX225 in range B4:B25. Raw figures e.g. 14500000 or negative adjustments -250000 lack formatting discipline. Your task is to apply a 4-section custom number format mask ([h]:mm:ss) that displays currency symbols, Lakhs/Crores grouping, or custom date serials without altering underlying numeric float memory.",
      "requirements": [
        "Navigate to sheet **EX225** in the master workbook.",
        "Highlight target range **B4:B25**.",
        "Press **Ctrl + 1** to launch the Format Cells dialog and select **Custom**.",
        "Enter custom format mask: '[h]:mm:ss'.",
        "Ensure negative numbers appear in bold red inside parentheses without converting numbers to text strings.",
        "Verify that '=SUM(B4:B25)' in cell **B26** evaluates without #VALUE! errors."
      ],
      "stepByStep": "1. **Select Cell Range**: Highlight range B4:B25 on worksheet **EX225**.\n2. **Open Format Cells**: Press **Ctrl + 1** (or Right-Click -> **Format Cells...**).\n3. **Navigate to Custom**: Click **Custom** in the Category sidebar.\n4. **Paste Mask**: Type or paste '[h]:mm:ss' into the Type input field.\n5. **Audit Verification**: Click **OK**. Check that formula bar shows raw float value while grid displays formatted string.",
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
