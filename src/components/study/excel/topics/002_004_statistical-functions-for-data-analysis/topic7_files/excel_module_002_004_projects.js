export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_002_004",
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
      "projectId": "EX901",
      "title": "Statistical & Aggregation Formula Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX901",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A4, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX901. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX901** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX901** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "51200",
        "mask": "Standard Number",
        "rendered": "₹ 51,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX902",
      "title": "Statistical & Aggregation Formula Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX902",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A5, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX902. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX902** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX902** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "52400",
        "mask": "Standard Number",
        "rendered": "₹ 52,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX903",
      "title": "Statistical & Aggregation Formula Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX903",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A6, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX903. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX903** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX903** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "53600",
        "mask": "Standard Number",
        "rendered": "₹ 53,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX904",
      "title": "Statistical & Aggregation Formula Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX904",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A7, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX904. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX904** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX904** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "54800",
        "mask": "Standard Number",
        "rendered": "₹ 54,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX905",
      "title": "Statistical & Aggregation Formula Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX905",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A8, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX905. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX905** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX905** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "56000",
        "mask": "Standard Number",
        "rendered": "₹ 56,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX906",
      "title": "Statistical & Aggregation Formula Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX906",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A9, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX906. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX906** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX906** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "57200",
        "mask": "Standard Number",
        "rendered": "₹ 57,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX907",
      "title": "Statistical & Aggregation Formula Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX907",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A10, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX907. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX907** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX907** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "58400",
        "mask": "Standard Number",
        "rendered": "₹ 58,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX908",
      "title": "Statistical & Aggregation Formula Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX908",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A11, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX908. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX908** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX908** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "59600",
        "mask": "Standard Number",
        "rendered": "₹ 59,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX909",
      "title": "Statistical & Aggregation Formula Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX909",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A12, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX909. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX909** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX909** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "60800",
        "mask": "Standard Number",
        "rendered": "₹ 60,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX910",
      "title": "Statistical & Aggregation Formula Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX910",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A13, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX910. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX910** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX910** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "62000",
        "mask": "Standard Number",
        "rendered": "₹ 62,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX911",
      "title": "Statistical & Aggregation Formula Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX911",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A14, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX911. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX911** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX911** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "63200",
        "mask": "Standard Number",
        "rendered": "₹ 63,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX912",
      "title": "Statistical & Aggregation Formula Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX912",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A15, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX912. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX912** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX912** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "64400",
        "mask": "Standard Number",
        "rendered": "₹ 64,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX913",
      "title": "Statistical & Aggregation Formula Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX913",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A16, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX913. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX913** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX913** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "65600",
        "mask": "Standard Number",
        "rendered": "₹ 65,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX914",
      "title": "Statistical & Aggregation Formula Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX914",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A17, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX914. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX914** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX914** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "66800",
        "mask": "Standard Number",
        "rendered": "₹ 66,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX915",
      "title": "Statistical & Aggregation Formula Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX915",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A18, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX915. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX915** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX915** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "68000",
        "mask": "Standard Number",
        "rendered": "₹ 68,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX916",
      "title": "Statistical & Aggregation Formula Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX916",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A19, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX916. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX916** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX916** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "69200",
        "mask": "Standard Number",
        "rendered": "₹ 69,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX917",
      "title": "Statistical & Aggregation Formula Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX917",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A20, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX917. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX917** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX917** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "70400",
        "mask": "Standard Number",
        "rendered": "₹ 70,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX918",
      "title": "Statistical & Aggregation Formula Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX918",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A21, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX918. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX918** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX918** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "71600",
        "mask": "Standard Number",
        "rendered": "₹ 71,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX919",
      "title": "Statistical & Aggregation Formula Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX919",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A22, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX919. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX919** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX919** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "72800",
        "mask": "Standard Number",
        "rendered": "₹ 72,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX920",
      "title": "Statistical & Aggregation Formula Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX920",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A23, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX920. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX920** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX920** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "74000",
        "mask": "Standard Number",
        "rendered": "₹ 74,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX921",
      "title": "Statistical & Aggregation Formula Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX921",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A24, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX921. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX921** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX921** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "75200",
        "mask": "Standard Number",
        "rendered": "₹ 75,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX922",
      "title": "Statistical & Aggregation Formula Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX922",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A25, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX922. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX922** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX922** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "76400",
        "mask": "Standard Number",
        "rendered": "₹ 76,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX923",
      "title": "Statistical & Aggregation Formula Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX923",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A26, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX923. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX923** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX923** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "77600",
        "mask": "Standard Number",
        "rendered": "₹ 77,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX924",
      "title": "Statistical & Aggregation Formula Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX924",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A27, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX924. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX924** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX924** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "78800",
        "mask": "Standard Number",
        "rendered": "₹ 78,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX925",
      "title": "Statistical & Aggregation Formula Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX925",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A28, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX925. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX925** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX925** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "80000",
        "mask": "Standard Number",
        "rendered": "₹ 80,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_002_004",
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
      "projectId": "EX901",
      "title": "Statistical & Aggregation Formula Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX901",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A4, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX901. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX901** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX901** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "51200",
        "mask": "Standard Number",
        "rendered": "₹ 51,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX902",
      "title": "Statistical & Aggregation Formula Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX902",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A5, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX902. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX902** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX902** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "52400",
        "mask": "Standard Number",
        "rendered": "₹ 52,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX903",
      "title": "Statistical & Aggregation Formula Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX903",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A6, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX903. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX903** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX903** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "53600",
        "mask": "Standard Number",
        "rendered": "₹ 53,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX904",
      "title": "Statistical & Aggregation Formula Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX904",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A7, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX904. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX904** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX904** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "54800",
        "mask": "Standard Number",
        "rendered": "₹ 54,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX905",
      "title": "Statistical & Aggregation Formula Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX905",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A8, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX905. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX905** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX905** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "56000",
        "mask": "Standard Number",
        "rendered": "₹ 56,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX906",
      "title": "Statistical & Aggregation Formula Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX906",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A9, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX906. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX906** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX906** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "57200",
        "mask": "Standard Number",
        "rendered": "₹ 57,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX907",
      "title": "Statistical & Aggregation Formula Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX907",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A10, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX907. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX907** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX907** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "58400",
        "mask": "Standard Number",
        "rendered": "₹ 58,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX908",
      "title": "Statistical & Aggregation Formula Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX908",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A11, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX908. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX908** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX908** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "59600",
        "mask": "Standard Number",
        "rendered": "₹ 59,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX909",
      "title": "Statistical & Aggregation Formula Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX909",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A12, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX909. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX909** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX909** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "60800",
        "mask": "Standard Number",
        "rendered": "₹ 60,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX910",
      "title": "Statistical & Aggregation Formula Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX910",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A13, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX910. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX910** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX910** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "62000",
        "mask": "Standard Number",
        "rendered": "₹ 62,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX911",
      "title": "Statistical & Aggregation Formula Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX911",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A14, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX911. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX911** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX911** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "63200",
        "mask": "Standard Number",
        "rendered": "₹ 63,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX912",
      "title": "Statistical & Aggregation Formula Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX912",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A15, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX912. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX912** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX912** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "64400",
        "mask": "Standard Number",
        "rendered": "₹ 64,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX913",
      "title": "Statistical & Aggregation Formula Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX913",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A16, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX913. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX913** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX913** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "65600",
        "mask": "Standard Number",
        "rendered": "₹ 65,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX914",
      "title": "Statistical & Aggregation Formula Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX914",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A17, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX914. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX914** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX914** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "66800",
        "mask": "Standard Number",
        "rendered": "₹ 66,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX915",
      "title": "Statistical & Aggregation Formula Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX915",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A18, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX915. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX915** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX915** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "68000",
        "mask": "Standard Number",
        "rendered": "₹ 68,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX916",
      "title": "Statistical & Aggregation Formula Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX916",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A19, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX916. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX916** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX916** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "69200",
        "mask": "Standard Number",
        "rendered": "₹ 69,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX917",
      "title": "Statistical & Aggregation Formula Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX917",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A20, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX917. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX917** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX917** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "70400",
        "mask": "Standard Number",
        "rendered": "₹ 70,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX918",
      "title": "Statistical & Aggregation Formula Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX918",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A21, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX918. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX918** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX918** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "71600",
        "mask": "Standard Number",
        "rendered": "₹ 71,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX919",
      "title": "Statistical & Aggregation Formula Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX919",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A22, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX919. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX919** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX919** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "72800",
        "mask": "Standard Number",
        "rendered": "₹ 72,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX920",
      "title": "Statistical & Aggregation Formula Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX920",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A23, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX920. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX920** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX920** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "74000",
        "mask": "Standard Number",
        "rendered": "₹ 74,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX921",
      "title": "Statistical & Aggregation Formula Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX921",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A24, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX921. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX921** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX921** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "75200",
        "mask": "Standard Number",
        "rendered": "₹ 75,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX922",
      "title": "Statistical & Aggregation Formula Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX922",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A25, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX922. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX922** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX922** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "76400",
        "mask": "Standard Number",
        "rendered": "₹ 76,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX923",
      "title": "Statistical & Aggregation Formula Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX923",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A26, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX923. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX923** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX923** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "77600",
        "mask": "Standard Number",
        "rendered": "₹ 77,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX924",
      "title": "Statistical & Aggregation Formula Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX924",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A27, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX924. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX924** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX924** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "78800",
        "mask": "Standard Number",
        "rendered": "₹ 78,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX925",
      "title": "Statistical & Aggregation Formula Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX925",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A28, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX925. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX925** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX925** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "80000",
        "mask": "Standard Number",
        "rendered": "₹ 80,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    }
  ]
};
