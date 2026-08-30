export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_001_003",
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
      "projectId": "EX401",
      "title": "Statistical & Aggregation Formula Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX401",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A4, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX401. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX401** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX401** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "51200",
        "mask": "Standard Number",
        "rendered": "₹ 51,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX402",
      "title": "Statistical & Aggregation Formula Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX402",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A5, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX402. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX402** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX402** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "52400",
        "mask": "Standard Number",
        "rendered": "₹ 52,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX403",
      "title": "Statistical & Aggregation Formula Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX403",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A6, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX403. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX403** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX403** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "53600",
        "mask": "Standard Number",
        "rendered": "₹ 53,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX404",
      "title": "Statistical & Aggregation Formula Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX404",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A7, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX404. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX404** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX404** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "54800",
        "mask": "Standard Number",
        "rendered": "₹ 54,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX405",
      "title": "Statistical & Aggregation Formula Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX405",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A8, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX405. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX405** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX405** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "56000",
        "mask": "Standard Number",
        "rendered": "₹ 56,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX406",
      "title": "Statistical & Aggregation Formula Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX406",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A9, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX406. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX406** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX406** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "57200",
        "mask": "Standard Number",
        "rendered": "₹ 57,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX407",
      "title": "Statistical & Aggregation Formula Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX407",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A10, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX407. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX407** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX407** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "58400",
        "mask": "Standard Number",
        "rendered": "₹ 58,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX408",
      "title": "Statistical & Aggregation Formula Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX408",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A11, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX408. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX408** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX408** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "59600",
        "mask": "Standard Number",
        "rendered": "₹ 59,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX409",
      "title": "Statistical & Aggregation Formula Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX409",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A12, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX409. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX409** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX409** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "60800",
        "mask": "Standard Number",
        "rendered": "₹ 60,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX410",
      "title": "Statistical & Aggregation Formula Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX410",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A13, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX410. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX410** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX410** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "62000",
        "mask": "Standard Number",
        "rendered": "₹ 62,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX411",
      "title": "Statistical & Aggregation Formula Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX411",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A14, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX411. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX411** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX411** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "63200",
        "mask": "Standard Number",
        "rendered": "₹ 63,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX412",
      "title": "Statistical & Aggregation Formula Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX412",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A15, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX412. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX412** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX412** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "64400",
        "mask": "Standard Number",
        "rendered": "₹ 64,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX413",
      "title": "Statistical & Aggregation Formula Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX413",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A16, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX413. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX413** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX413** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "65600",
        "mask": "Standard Number",
        "rendered": "₹ 65,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX414",
      "title": "Statistical & Aggregation Formula Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX414",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A17, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX414. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX414** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX414** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "66800",
        "mask": "Standard Number",
        "rendered": "₹ 66,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX415",
      "title": "Statistical & Aggregation Formula Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX415",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A18, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX415. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX415** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX415** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "68000",
        "mask": "Standard Number",
        "rendered": "₹ 68,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX416",
      "title": "Statistical & Aggregation Formula Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX416",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A19, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX416. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX416** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX416** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "69200",
        "mask": "Standard Number",
        "rendered": "₹ 69,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX417",
      "title": "Statistical & Aggregation Formula Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX417",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A20, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX417. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX417** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX417** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "70400",
        "mask": "Standard Number",
        "rendered": "₹ 70,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX418",
      "title": "Statistical & Aggregation Formula Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX418",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A21, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX418. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX418** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX418** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "71600",
        "mask": "Standard Number",
        "rendered": "₹ 71,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX419",
      "title": "Statistical & Aggregation Formula Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX419",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A22, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX419. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX419** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX419** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "72800",
        "mask": "Standard Number",
        "rendered": "₹ 72,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX420",
      "title": "Statistical & Aggregation Formula Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX420",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A23, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX420. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX420** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX420** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "74000",
        "mask": "Standard Number",
        "rendered": "₹ 74,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX421",
      "title": "Statistical & Aggregation Formula Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX421",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A24, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX421. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX421** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX421** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "75200",
        "mask": "Standard Number",
        "rendered": "₹ 75,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX422",
      "title": "Statistical & Aggregation Formula Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX422",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A25, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX422. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX422** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX422** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "76400",
        "mask": "Standard Number",
        "rendered": "₹ 76,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX423",
      "title": "Statistical & Aggregation Formula Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX423",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A26, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX423. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX423** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX423** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "77600",
        "mask": "Standard Number",
        "rendered": "₹ 77,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX424",
      "title": "Statistical & Aggregation Formula Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX424",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A27, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX424. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX424** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX424** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "78800",
        "mask": "Standard Number",
        "rendered": "₹ 78,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX425",
      "title": "Statistical & Aggregation Formula Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX425",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A28, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX425. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX425** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX425** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
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
  "projectCategory": "Projects_001_003",
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
      "projectId": "EX401",
      "title": "Statistical & Aggregation Formula Modeling (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX401",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A4, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX401. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX401** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX401** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "51200",
        "mask": "Standard Number",
        "rendered": "₹ 51,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX402",
      "title": "Statistical & Aggregation Formula Modeling (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX402",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A5, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX402. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX402** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX402** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "52400",
        "mask": "Standard Number",
        "rendered": "₹ 52,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX403",
      "title": "Statistical & Aggregation Formula Modeling (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX403",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A6, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX403. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX403** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX403** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "53600",
        "mask": "Standard Number",
        "rendered": "₹ 53,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX404",
      "title": "Statistical & Aggregation Formula Modeling (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX404",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A7, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX404. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX404** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX404** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "54800",
        "mask": "Standard Number",
        "rendered": "₹ 54,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX405",
      "title": "Statistical & Aggregation Formula Modeling (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX405",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A8, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX405. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX405** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX405** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "56000",
        "mask": "Standard Number",
        "rendered": "₹ 56,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX406",
      "title": "Statistical & Aggregation Formula Modeling (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX406",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A9, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX406. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX406** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX406** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "57200",
        "mask": "Standard Number",
        "rendered": "₹ 57,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX407",
      "title": "Statistical & Aggregation Formula Modeling (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX407",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A10, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX407. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX407** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX407** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "58400",
        "mask": "Standard Number",
        "rendered": "₹ 58,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX408",
      "title": "Statistical & Aggregation Formula Modeling (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX408",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A11, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX408. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX408** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX408** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "59600",
        "mask": "Standard Number",
        "rendered": "₹ 59,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX409",
      "title": "Statistical & Aggregation Formula Modeling (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX409",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A12, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX409. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX409** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX409** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "60800",
        "mask": "Standard Number",
        "rendered": "₹ 60,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX410",
      "title": "Statistical & Aggregation Formula Modeling (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX410",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A13, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX410. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX410** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX410** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "62000",
        "mask": "Standard Number",
        "rendered": "₹ 62,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX411",
      "title": "Statistical & Aggregation Formula Modeling (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX411",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A14, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX411. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX411** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX411** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "63200",
        "mask": "Standard Number",
        "rendered": "₹ 63,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX412",
      "title": "Statistical & Aggregation Formula Modeling (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX412",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A15, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX412. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX412** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX412** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "64400",
        "mask": "Standard Number",
        "rendered": "₹ 64,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX413",
      "title": "Statistical & Aggregation Formula Modeling (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX413",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A16, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX413. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX413** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX413** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "65600",
        "mask": "Standard Number",
        "rendered": "₹ 65,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX414",
      "title": "Statistical & Aggregation Formula Modeling (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX414",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A17, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX414. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX414** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX414** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "66800",
        "mask": "Standard Number",
        "rendered": "₹ 66,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX415",
      "title": "Statistical & Aggregation Formula Modeling (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX415",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A18, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX415. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX415** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX415** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "68000",
        "mask": "Standard Number",
        "rendered": "₹ 68,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX416",
      "title": "Statistical & Aggregation Formula Modeling (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX416",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A19, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX416. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX416** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX416** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "69200",
        "mask": "Standard Number",
        "rendered": "₹ 69,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX417",
      "title": "Statistical & Aggregation Formula Modeling (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX417",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A20, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX417. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX417** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX417** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "70400",
        "mask": "Standard Number",
        "rendered": "₹ 70,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX418",
      "title": "Statistical & Aggregation Formula Modeling (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX418",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A21, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX418. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX418** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX418** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "71600",
        "mask": "Standard Number",
        "rendered": "₹ 71,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX419",
      "title": "Statistical & Aggregation Formula Modeling (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX419",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A22, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX419. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX419** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX419** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "72800",
        "mask": "Standard Number",
        "rendered": "₹ 72,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX420",
      "title": "Statistical & Aggregation Formula Modeling (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX420",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A23, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX420. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX420** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX420** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "74000",
        "mask": "Standard Number",
        "rendered": "₹ 74,000"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX421",
      "title": "Statistical & Aggregation Formula Modeling (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX421",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A24, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX421. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX421** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX421** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "75200",
        "mask": "Standard Number",
        "rendered": "₹ 75,200"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX422",
      "title": "Statistical & Aggregation Formula Modeling (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX422",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A25, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX422. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX422** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX422** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "76400",
        "mask": "Standard Number",
        "rendered": "₹ 76,400"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX423",
      "title": "Statistical & Aggregation Formula Modeling (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX423",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A26, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX423. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX423** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX423** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "77600",
        "mask": "Standard Number",
        "rendered": "₹ 77,600"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX424",
      "title": "Statistical & Aggregation Formula Modeling (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX424",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A27, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX424. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX424** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX424** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
      "rawMemoryVsRendered": {
        "raw": "78800",
        "mask": "Standard Number",
        "rendered": "₹ 78,800"
      },
      "expectedOutput": "| Item Code | Department | Criteria Filter | Dynamic Formula | Aggregated Total |\n| --------- | ---------- | --------------- | --------------- | ---------------- |\n| EX-101    | Finance    | FY2026          | =SUMIFS(...)   | ₹ 4,50,000.00    |\n| EX-102    | Operations | FY2026          | =SUMIFS(...)   | ₹ 8,25,000.00    |",
      "proTip": "Pressing key F4 while editing a cell range toggles absolute locking modes ($A$1 -> A$1 -> $A1 -> A1). Master this shortcut to build error-free financial models!"
    },
    {
      "projectId": "EX425",
      "title": "Statistical & Aggregation Formula Modeling (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX425",
      "formula": "=SUMIFS(Data!C:C, Data!A:A, A28, Data!B:B, \">=\"&B1)",
      "description": "As a Senior Corporate Accountant at AccoTax, you need to aggregate multi-departmental expenditure metrics on worksheet EX425. Input payload is located in range A4:D50. You must construct dynamic, non-hardcoded formulas using SUMIFS, AVERAGEIFS, COUNTIFS, and MAXIFS with absolute cell lock references ($A$4:$A$50) to ensure seamless drag-copying down column E.",
      "requirements": [
        "Navigate to tab **EX425** in your workbook.",
        "In cell **E4**, write formula '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.",
        "Use absolute locking (**$**) on criterion ranges so formula references do not shift when copied.",
        "Double-click the fill handle in cell **E4** to auto-fill formula down to **E50**.",
        "Verify zero #N/A or #REF! error propagation."
      ],
      "stepByStep": "1. **Select Cell E4**: Open worksheet **EX425** and click cell E4.\n2. **Type Formula**: Enter '=SUMIFS(C$4:C$50, A$4:A$50, A4, B$4:B$50, \">=\"&B$1)'.\n3. **Lock References**: Press **F4** while selecting range parameters to insert **$** dollar locks.\n4. **Copy Formula**: Hover over the bottom-right corner of cell E4 until black cross **+** appears, then double-click to drag down.\n5. **Audit Verification**: Press **Ctrl + ~**, verify formula syntax, and press **Ctrl + ~** again to return to normal view.",
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
