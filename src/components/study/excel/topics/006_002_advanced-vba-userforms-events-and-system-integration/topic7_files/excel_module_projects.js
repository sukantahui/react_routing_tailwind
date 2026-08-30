export const excelModuleProjectsData = {
  "projectCategory": "Projects_006_002",
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
      "projectId": "EX2501",
      "title": "VBA & Macro Workflow Automation (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX2501",
      "formula": "Sub ProcessData_EX2501(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2501. You must write a VBA macro or Office Script named ProcessData_EX2501 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2501** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2501()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2501** and assign macro 'ProcessData_EX2501'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2501()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2501.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2502",
      "title": "VBA & Macro Workflow Automation (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX2502",
      "formula": "Sub ProcessData_EX2502(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2502. You must write a VBA macro or Office Script named ProcessData_EX2502 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2502** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2502()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2502** and assign macro 'ProcessData_EX2502'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2502()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2502.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2503",
      "title": "VBA & Macro Workflow Automation (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX2503",
      "formula": "Sub ProcessData_EX2503(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2503. You must write a VBA macro or Office Script named ProcessData_EX2503 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2503** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2503()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2503** and assign macro 'ProcessData_EX2503'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2503()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2503.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2504",
      "title": "VBA & Macro Workflow Automation (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX2504",
      "formula": "Sub ProcessData_EX2504(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2504. You must write a VBA macro or Office Script named ProcessData_EX2504 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2504** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2504()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2504** and assign macro 'ProcessData_EX2504'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2504()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2504.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2505",
      "title": "VBA & Macro Workflow Automation (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX2505",
      "formula": "Sub ProcessData_EX2505(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2505. You must write a VBA macro or Office Script named ProcessData_EX2505 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2505** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2505()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2505** and assign macro 'ProcessData_EX2505'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2505()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2505.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2506",
      "title": "VBA & Macro Workflow Automation (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX2506",
      "formula": "Sub ProcessData_EX2506(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2506. You must write a VBA macro or Office Script named ProcessData_EX2506 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2506** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2506()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2506** and assign macro 'ProcessData_EX2506'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2506()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2506.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2507",
      "title": "VBA & Macro Workflow Automation (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX2507",
      "formula": "Sub ProcessData_EX2507(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2507. You must write a VBA macro or Office Script named ProcessData_EX2507 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2507** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2507()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2507** and assign macro 'ProcessData_EX2507'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2507()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2507.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2508",
      "title": "VBA & Macro Workflow Automation (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX2508",
      "formula": "Sub ProcessData_EX2508(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2508. You must write a VBA macro or Office Script named ProcessData_EX2508 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2508** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2508()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2508** and assign macro 'ProcessData_EX2508'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2508()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2508.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2509",
      "title": "VBA & Macro Workflow Automation (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX2509",
      "formula": "Sub ProcessData_EX2509(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2509. You must write a VBA macro or Office Script named ProcessData_EX2509 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2509** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2509()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2509** and assign macro 'ProcessData_EX2509'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2509()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2509.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2510",
      "title": "VBA & Macro Workflow Automation (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX2510",
      "formula": "Sub ProcessData_EX2510(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2510. You must write a VBA macro or Office Script named ProcessData_EX2510 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2510** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2510()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2510** and assign macro 'ProcessData_EX2510'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2510()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2510.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2511",
      "title": "VBA & Macro Workflow Automation (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX2511",
      "formula": "Sub ProcessData_EX2511(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2511. You must write a VBA macro or Office Script named ProcessData_EX2511 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2511** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2511()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2511** and assign macro 'ProcessData_EX2511'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2511()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2511.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2512",
      "title": "VBA & Macro Workflow Automation (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX2512",
      "formula": "Sub ProcessData_EX2512(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2512. You must write a VBA macro or Office Script named ProcessData_EX2512 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2512** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2512()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2512** and assign macro 'ProcessData_EX2512'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2512()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2512.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2513",
      "title": "VBA & Macro Workflow Automation (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX2513",
      "formula": "Sub ProcessData_EX2513(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2513. You must write a VBA macro or Office Script named ProcessData_EX2513 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2513** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2513()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2513** and assign macro 'ProcessData_EX2513'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2513()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2513.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2514",
      "title": "VBA & Macro Workflow Automation (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX2514",
      "formula": "Sub ProcessData_EX2514(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2514. You must write a VBA macro or Office Script named ProcessData_EX2514 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2514** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2514()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2514** and assign macro 'ProcessData_EX2514'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2514()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2514.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2515",
      "title": "VBA & Macro Workflow Automation (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX2515",
      "formula": "Sub ProcessData_EX2515(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2515. You must write a VBA macro or Office Script named ProcessData_EX2515 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2515** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2515()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2515** and assign macro 'ProcessData_EX2515'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2515()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2515.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2516",
      "title": "VBA & Macro Workflow Automation (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX2516",
      "formula": "Sub ProcessData_EX2516(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2516. You must write a VBA macro or Office Script named ProcessData_EX2516 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2516** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2516()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2516** and assign macro 'ProcessData_EX2516'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2516()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2516.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2517",
      "title": "VBA & Macro Workflow Automation (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX2517",
      "formula": "Sub ProcessData_EX2517(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2517. You must write a VBA macro or Office Script named ProcessData_EX2517 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2517** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2517()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2517** and assign macro 'ProcessData_EX2517'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2517()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2517.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2518",
      "title": "VBA & Macro Workflow Automation (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX2518",
      "formula": "Sub ProcessData_EX2518(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2518. You must write a VBA macro or Office Script named ProcessData_EX2518 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2518** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2518()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2518** and assign macro 'ProcessData_EX2518'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2518()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2518.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2519",
      "title": "VBA & Macro Workflow Automation (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX2519",
      "formula": "Sub ProcessData_EX2519(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2519. You must write a VBA macro or Office Script named ProcessData_EX2519 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2519** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2519()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2519** and assign macro 'ProcessData_EX2519'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2519()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2519.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2520",
      "title": "VBA & Macro Workflow Automation (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX2520",
      "formula": "Sub ProcessData_EX2520(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2520. You must write a VBA macro or Office Script named ProcessData_EX2520 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2520** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2520()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2520** and assign macro 'ProcessData_EX2520'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2520()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2520.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2521",
      "title": "VBA & Macro Workflow Automation (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX2521",
      "formula": "Sub ProcessData_EX2521(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2521. You must write a VBA macro or Office Script named ProcessData_EX2521 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2521** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2521()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2521** and assign macro 'ProcessData_EX2521'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2521()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2521.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2522",
      "title": "VBA & Macro Workflow Automation (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX2522",
      "formula": "Sub ProcessData_EX2522(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2522. You must write a VBA macro or Office Script named ProcessData_EX2522 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2522** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2522()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2522** and assign macro 'ProcessData_EX2522'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2522()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2522.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2523",
      "title": "VBA & Macro Workflow Automation (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX2523",
      "formula": "Sub ProcessData_EX2523(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2523. You must write a VBA macro or Office Script named ProcessData_EX2523 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2523** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2523()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2523** and assign macro 'ProcessData_EX2523'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2523()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2523.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2524",
      "title": "VBA & Macro Workflow Automation (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX2524",
      "formula": "Sub ProcessData_EX2524(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2524. You must write a VBA macro or Office Script named ProcessData_EX2524 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2524** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2524()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2524** and assign macro 'ProcessData_EX2524'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2524()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2524.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2525",
      "title": "VBA & Macro Workflow Automation (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX2525",
      "formula": "Sub ProcessData_EX2525(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2525. You must write a VBA macro or Office Script named ProcessData_EX2525 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2525** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2525()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2525** and assign macro 'ProcessData_EX2525'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2525()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2525.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    }
  ]
};
