export const excelModuleProjectsData = {
  "projectCategory": "Practical Laboratory Exercises: Getting Started with Excel Master Class",
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
      "projectId": "EX101",
      "title": "Interface, Navigation & HYPERLINK Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX101",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX101. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX101, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX101** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX101** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX101**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX101, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX101) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX102",
      "title": "Interface, Navigation & CELL Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX102",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX102. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX102, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX102** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX102** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX102**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX102, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX102) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX103",
      "title": "Interface, Navigation & INFO Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX103",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX103. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX103, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX103** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX103** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX103**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX103, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX103) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX104",
      "title": "Interface, Navigation & HYPERLINK Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX104",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX104. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX104, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX104** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX104** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX104**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX104, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX104) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX105",
      "title": "Interface, Navigation & CELL Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX105",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX105. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX105, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX105** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX105** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX105**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX105, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX105) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX106",
      "title": "Interface, Navigation & INFO Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX106",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX106. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX106, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX106** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX106** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX106**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX106, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX106) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX107",
      "title": "Interface, Navigation & HYPERLINK Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX107",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX107. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX107, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX107** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX107** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX107**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX107, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX107) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX108",
      "title": "Interface, Navigation & CELL Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX108",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX108. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX108, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX108** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX108** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX108**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX108, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX108) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX109",
      "title": "Interface, Navigation & INFO Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX109",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX109. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX109, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX109** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX109** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX109**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX109, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX109) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX110",
      "title": "Interface, Navigation & HYPERLINK Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX110",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX110. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX110, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX110** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX110** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX110**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX110, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX110) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX111",
      "title": "Interface, Navigation & CELL Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX111",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX111. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX111, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX111** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX111** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX111**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX111, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX111) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX112",
      "title": "Interface, Navigation & INFO Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX112",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX112. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX112, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX112** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX112** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX112**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX112, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX112) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX113",
      "title": "Interface, Navigation & HYPERLINK Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX113",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX113. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX113, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX113** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX113** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX113**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX113, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX113) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX114",
      "title": "Interface, Navigation & CELL Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX114",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX114. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX114, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX114** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX114** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX114**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX114, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX114) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX115",
      "title": "Interface, Navigation & INFO Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX115",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX115. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX115, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX115** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX115** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX115**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX115, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX115) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX116",
      "title": "Interface, Navigation & HYPERLINK Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX116",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX116. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX116, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX116** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX116** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX116**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX116, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX116) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX117",
      "title": "Interface, Navigation & CELL Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX117",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX117. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX117, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX117** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX117** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX117**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX117, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX117) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX118",
      "title": "Interface, Navigation & INFO Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX118",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX118. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX118, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX118** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX118** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX118**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX118, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX118) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX119",
      "title": "Interface, Navigation & HYPERLINK Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX119",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX119. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX119, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX119** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX119** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX119**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX119, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX119) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX120",
      "title": "Interface, Navigation & CELL Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX120",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX120. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX120, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX120** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX120** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX120**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX120, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX120) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX121",
      "title": "Interface, Navigation & INFO Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX121",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX121. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX121, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX121** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX121** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX121**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX121, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX121) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX122",
      "title": "Interface, Navigation & HYPERLINK Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX122",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX122. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX122, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX122** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX122** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX122**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX122, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX122) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX123",
      "title": "Interface, Navigation & CELL Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX123",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX123. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX123, and implement the CELL function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX123** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **CELL** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX123** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX123**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert CELL**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX123, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =CELL(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX123) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX124",
      "title": "Interface, Navigation & INFO Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX124",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX124. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX124, and implement the INFO function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX124** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **INFO** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX124** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX124**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert INFO**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX124, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =INFO(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX124) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    },
    {
      "projectId": "EX125",
      "title": "Interface, Navigation & HYPERLINK Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX125",
      "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")",
      "description": "As an Associate Analyst at Coder & AccoTax, you are configuring worksheet tab EX125. You must practice navigation ergonomics, freeze headers in range A3:E30, assign Name Box alias Revenue_EX125, and implement the HYPERLINK function e.g. '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' or '=CELL(\"filename\", A1)' for dynamic workbook metadata tracking.",
      "requirements": [
        "Open worksheet tab **EX125** in your master workbook.",
        "Format header row **A3:E3** with navy fill (#0F172A) and bold white text.",
        "Apply Freeze Panes below row 3 so headers remain visible when scrolling.",
        "In cell **A1**, construct formula using **HYPERLINK** e.g. `=HYPERLINK(\"#'Overview'!A1\", \"🔗 Return to Landing Sheet\")`.",
        "Assign Name Box alias **Revenue_EX125** to range **B4:B30**."
      ],
      "stepByStep": "1. **Navigate to Worksheet**: Click tab **EX125**.\n2. **Format Header Row**: Highlight A3:E3, set Font to Bold, Fill Color to #0F172A, Text Color to White.\n3. **Insert HYPERLINK**: Click cell A1, type '=HYPERLINK(\"#'Overview'!A1\", \"🔗 Jump to Overview\")' and press **Enter**.\n4. **Define Name Range**: Highlight B4:B30, click **Name Box** top-left, type Revenue_EX125, press **Enter**.\n5. **Audit Verification**: Test hyperlink jump and verify formula bar output.",
      "rawMemoryVsRendered": {
        "raw": "Hyperlink Target",
        "mask": "Dynamic Link",
        "rendered": "🔗 Jump to Overview"
      },
      "expectedOutput": "| Cell | Applied Function | Screen Output Display | Audit Status |\n| ---- | ---------------- | --------------------- | ------------ |\n| A1   | =HYPERLINK(...)   | 🔗 Return to Overview  | Verified     |\n| B31  | =SUM(Revenue_EX125) | ₹ 1,45,000.00 | Passed       |",
      "proTip": "Using HYPERLINK formulas creates interactive single-click workbook navigation directories for executive audit reviews!"
    }
  ]
};
