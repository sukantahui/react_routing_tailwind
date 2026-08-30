export const excelModuleProjectsData = {
  "projectCategory": "Projects_004_002",
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
      "projectId": "EX1701",
      "title": "Modern Dynamic Array & Grid Operations (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1701",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1701. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1701**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1701**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1702",
      "title": "Modern Dynamic Array & Grid Operations (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1702",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1702. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1702**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1702**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1703",
      "title": "Modern Dynamic Array & Grid Operations (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1703",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1703. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1703**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1703**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1704",
      "title": "Modern Dynamic Array & Grid Operations (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1704",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1704. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1704**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1704**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1705",
      "title": "Modern Dynamic Array & Grid Operations (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1705",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1705. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1705**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1705**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1706",
      "title": "Modern Dynamic Array & Grid Operations (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1706",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1706. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1706**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1706**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1707",
      "title": "Modern Dynamic Array & Grid Operations (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1707",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1707. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1707**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1707**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1708",
      "title": "Modern Dynamic Array & Grid Operations (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1708",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1708. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1708**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1708**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1709",
      "title": "Modern Dynamic Array & Grid Operations (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1709",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1709. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1709**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1709**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1710",
      "title": "Modern Dynamic Array & Grid Operations (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1710",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1710. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1710**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1710**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1711",
      "title": "Modern Dynamic Array & Grid Operations (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1711",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1711. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1711**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1711**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1712",
      "title": "Modern Dynamic Array & Grid Operations (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1712",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1712. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1712**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1712**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1713",
      "title": "Modern Dynamic Array & Grid Operations (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1713",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1713. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1713**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1713**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1714",
      "title": "Modern Dynamic Array & Grid Operations (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1714",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1714. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1714**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1714**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1715",
      "title": "Modern Dynamic Array & Grid Operations (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1715",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1715. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1715**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1715**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1716",
      "title": "Modern Dynamic Array & Grid Operations (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1716",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1716. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1716**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1716**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1717",
      "title": "Modern Dynamic Array & Grid Operations (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1717",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1717. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1717**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1717**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1718",
      "title": "Modern Dynamic Array & Grid Operations (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1718",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1718. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1718**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1718**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1719",
      "title": "Modern Dynamic Array & Grid Operations (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1719",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1719. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1719**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1719**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1720",
      "title": "Modern Dynamic Array & Grid Operations (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1720",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1720. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1720**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1720**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1721",
      "title": "Modern Dynamic Array & Grid Operations (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1721",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1721. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1721**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1721**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1722",
      "title": "Modern Dynamic Array & Grid Operations (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1722",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1722. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1722**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1722**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1723",
      "title": "Modern Dynamic Array & Grid Operations (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1723",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1723. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1723**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1723**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1724",
      "title": "Modern Dynamic Array & Grid Operations (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1724",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1724. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1724**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1724**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    },
    {
      "projectId": "EX1725",
      "title": "Modern Dynamic Array & Grid Operations (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1725",
      "formula": "=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)",
      "description": "As a Lead Data Architect, you are modernizing legacy spreadsheet formulas on sheet EX1725. Input payload is in range A4:D100. You must construct dynamic array formulas using FILTER, SORT, UNIQUE, and VSTACK in cell F4 that automatically spill results without needing Ctrl + Shift + Enter or manual copy-pasting.",
      "requirements": [
        "Navigate to tab **EX1725**.",
        "In cell **F4**, type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.",
        "Observe the blue border bounding box representing the spilled array range.",
        "Ensure no blocking values exist in cells below **F4** to prevent #SPILL! errors.",
        "In cell **K4**, write '=UNIQUE(A4:A100)' to extract distinct client codes dynamically."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1725**.\n2. **Enter Spilling Formula**: Type '=SORT(FILTER(A4:D100, (B4:B100=\"Completed\")*(D4:D100>=100000)), 4, -1)'.\n3. **Press Enter**: Press **Enter** (do NOT press Ctrl+Shift+Enter in modern Excel 365/2021).\n4. **Inspect Spill Range**: Click any cell inside the spilled array (e.g. G6) and notice the ghost formula in the formula bar.\n5. **Handle Spill Blockers**: If #SPILL! occurs, clear all text in cells below F4.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Array Matrix",
        "mask": "Dynamic Grid Spill",
        "rendered": "Filtered & Sorted Grid Payload"
      },
      "expectedOutput": "| Client ID | Status | Region | Revenue (Sorted Desc) | Array Behavior |\n| --------- | ------ | ------ | --------------------- | -------------- |\n| CLI-884   | Completed | West | ₹ 15,40,000.00        | Anchor Cell F4 |\n| CLI-219   | Completed | North| ₹ 12,10,000.00        | Spilled Cell F5|",
      "proTip": "To reference an entire spilled dynamic array in downstream formulas, append the hash symbol (#) e.g. =SUM(F4#)!"
    }
  ]
};
