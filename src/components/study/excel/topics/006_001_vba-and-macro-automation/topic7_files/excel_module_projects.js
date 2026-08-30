export const excelModuleProjectsData = {
  "projectCategory": "Projects_006_001",
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
      "projectId": "EX2401",
      "title": "VBA & Macro Workflow Automation (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX2401",
      "formula": "Sub ProcessData_EX2401(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2401. You must write a VBA macro or Office Script named ProcessData_EX2401 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2401** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2401()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2401** and assign macro 'ProcessData_EX2401'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2401()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2401.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2402",
      "title": "VBA & Macro Workflow Automation (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX2402",
      "formula": "Sub ProcessData_EX2402(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2402. You must write a VBA macro or Office Script named ProcessData_EX2402 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2402** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2402()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2402** and assign macro 'ProcessData_EX2402'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2402()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2402.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2403",
      "title": "VBA & Macro Workflow Automation (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX2403",
      "formula": "Sub ProcessData_EX2403(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2403. You must write a VBA macro or Office Script named ProcessData_EX2403 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2403** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2403()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2403** and assign macro 'ProcessData_EX2403'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2403()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2403.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2404",
      "title": "VBA & Macro Workflow Automation (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX2404",
      "formula": "Sub ProcessData_EX2404(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2404. You must write a VBA macro or Office Script named ProcessData_EX2404 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2404** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2404()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2404** and assign macro 'ProcessData_EX2404'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2404()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2404.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2405",
      "title": "VBA & Macro Workflow Automation (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX2405",
      "formula": "Sub ProcessData_EX2405(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2405. You must write a VBA macro or Office Script named ProcessData_EX2405 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2405** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2405()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2405** and assign macro 'ProcessData_EX2405'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2405()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2405.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2406",
      "title": "VBA & Macro Workflow Automation (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX2406",
      "formula": "Sub ProcessData_EX2406(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2406. You must write a VBA macro or Office Script named ProcessData_EX2406 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2406** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2406()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2406** and assign macro 'ProcessData_EX2406'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2406()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2406.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2407",
      "title": "VBA & Macro Workflow Automation (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX2407",
      "formula": "Sub ProcessData_EX2407(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2407. You must write a VBA macro or Office Script named ProcessData_EX2407 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2407** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2407()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2407** and assign macro 'ProcessData_EX2407'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2407()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2407.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2408",
      "title": "VBA & Macro Workflow Automation (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX2408",
      "formula": "Sub ProcessData_EX2408(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2408. You must write a VBA macro or Office Script named ProcessData_EX2408 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2408** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2408()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2408** and assign macro 'ProcessData_EX2408'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2408()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2408.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2409",
      "title": "VBA & Macro Workflow Automation (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX2409",
      "formula": "Sub ProcessData_EX2409(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2409. You must write a VBA macro or Office Script named ProcessData_EX2409 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2409** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2409()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2409** and assign macro 'ProcessData_EX2409'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2409()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2409.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2410",
      "title": "VBA & Macro Workflow Automation (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX2410",
      "formula": "Sub ProcessData_EX2410(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2410. You must write a VBA macro or Office Script named ProcessData_EX2410 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2410** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2410()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2410** and assign macro 'ProcessData_EX2410'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2410()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2410.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2411",
      "title": "VBA & Macro Workflow Automation (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX2411",
      "formula": "Sub ProcessData_EX2411(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2411. You must write a VBA macro or Office Script named ProcessData_EX2411 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2411** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2411()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2411** and assign macro 'ProcessData_EX2411'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2411()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2411.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2412",
      "title": "VBA & Macro Workflow Automation (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX2412",
      "formula": "Sub ProcessData_EX2412(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2412. You must write a VBA macro or Office Script named ProcessData_EX2412 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2412** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2412()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2412** and assign macro 'ProcessData_EX2412'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2412()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2412.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2413",
      "title": "VBA & Macro Workflow Automation (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX2413",
      "formula": "Sub ProcessData_EX2413(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2413. You must write a VBA macro or Office Script named ProcessData_EX2413 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2413** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2413()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2413** and assign macro 'ProcessData_EX2413'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2413()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2413.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2414",
      "title": "VBA & Macro Workflow Automation (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX2414",
      "formula": "Sub ProcessData_EX2414(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2414. You must write a VBA macro or Office Script named ProcessData_EX2414 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2414** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2414()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2414** and assign macro 'ProcessData_EX2414'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2414()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2414.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2415",
      "title": "VBA & Macro Workflow Automation (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX2415",
      "formula": "Sub ProcessData_EX2415(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2415. You must write a VBA macro or Office Script named ProcessData_EX2415 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2415** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2415()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2415** and assign macro 'ProcessData_EX2415'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2415()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2415.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2416",
      "title": "VBA & Macro Workflow Automation (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX2416",
      "formula": "Sub ProcessData_EX2416(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2416. You must write a VBA macro or Office Script named ProcessData_EX2416 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2416** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2416()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2416** and assign macro 'ProcessData_EX2416'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2416()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2416.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2417",
      "title": "VBA & Macro Workflow Automation (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX2417",
      "formula": "Sub ProcessData_EX2417(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2417. You must write a VBA macro or Office Script named ProcessData_EX2417 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2417** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2417()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2417** and assign macro 'ProcessData_EX2417'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2417()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2417.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2418",
      "title": "VBA & Macro Workflow Automation (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX2418",
      "formula": "Sub ProcessData_EX2418(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2418. You must write a VBA macro or Office Script named ProcessData_EX2418 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2418** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2418()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2418** and assign macro 'ProcessData_EX2418'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2418()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2418.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2419",
      "title": "VBA & Macro Workflow Automation (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX2419",
      "formula": "Sub ProcessData_EX2419(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2419. You must write a VBA macro or Office Script named ProcessData_EX2419 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2419** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2419()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2419** and assign macro 'ProcessData_EX2419'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2419()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2419.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2420",
      "title": "VBA & Macro Workflow Automation (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX2420",
      "formula": "Sub ProcessData_EX2420(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2420. You must write a VBA macro or Office Script named ProcessData_EX2420 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2420** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2420()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2420** and assign macro 'ProcessData_EX2420'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2420()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2420.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2421",
      "title": "VBA & Macro Workflow Automation (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX2421",
      "formula": "Sub ProcessData_EX2421(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2421. You must write a VBA macro or Office Script named ProcessData_EX2421 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2421** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2421()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2421** and assign macro 'ProcessData_EX2421'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2421()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2421.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2422",
      "title": "VBA & Macro Workflow Automation (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX2422",
      "formula": "Sub ProcessData_EX2422(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2422. You must write a VBA macro or Office Script named ProcessData_EX2422 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2422** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2422()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2422** and assign macro 'ProcessData_EX2422'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2422()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2422.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2423",
      "title": "VBA & Macro Workflow Automation (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX2423",
      "formula": "Sub ProcessData_EX2423(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2423. You must write a VBA macro or Office Script named ProcessData_EX2423 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2423** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2423()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2423** and assign macro 'ProcessData_EX2423'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2423()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2423.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2424",
      "title": "VBA & Macro Workflow Automation (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX2424",
      "formula": "Sub ProcessData_EX2424(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2424. You must write a VBA macro or Office Script named ProcessData_EX2424 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2424** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2424()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2424** and assign macro 'ProcessData_EX2424'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2424()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2424.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
      "rawMemoryVsRendered": {
        "raw": "  sukanta hui  ",
        "mask": "VBA UCase(Trim())",
        "rendered": "SUKANTA HUI"
      },
      "expectedOutput": "| Button Trigger | Input Cell Value | Macro Transformation | Process Status |\n| -------------- | ---------------- | -------------------- | -------------- |\n| [ Run Macro ]  | \"  acco tax  \"   | ACCO TAX             | Executed (0s)  |",
      "proTip": "Always save VBA-enabled workbooks in .xlsm format! Saving a VBA workbook as standard .xlsx silently strips away all macro code!"
    },
    {
      "projectId": "EX2425",
      "title": "VBA & Macro Workflow Automation (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX2425",
      "formula": "Sub ProcessData_EX2425(): Range(\"B4:B50\").Value = UCase(Range(\"B4:B50\")): End Sub",
      "description": "As an Automation Developer at AccoTax, you are developing an automated macro workflow on sheet EX2425. You must write a VBA macro or Office Script named ProcessData_EX2425 that iterates through cells B4:B50, strips leading/trailing whitespace, converts text to uppercase, and formats monetary values automatically upon clicking an assigned Form Control Button.",
      "requirements": [
        "Open worksheet **EX2425** and press **Alt + F11** to launch the Visual Basic Editor (VBE).",
        "Click **Insert** -> **Module** and paste sub procedure 'Sub ProcessData_EX2425()'.",
        "Use a 'For Each cell In Range(\"B4:B50\")' loop to apply Trim(), UCase(), and formatting.",
        "Draw a Form Control Command Button on sheet **EX2425** and assign macro 'ProcessData_EX2425'.",
        "Test execution and confirm zero runtime errors (Err.Number = 0)."
      ],
      "stepByStep": "1. **Open VBE**: Press **Alt + F11** (or Developer tab -> Visual Basic).\n2. **Insert Module**: Click **Insert** menu -> **Module**.\n3. **Write VBA Procedure**: Paste the macro code:\n   Sub ProcessData_EX2425()\n     Dim cell As Range\n     For Each cell In ActiveSheet.Range(\"B4:B50\")\n       cell.Value = UCase(Trim(cell.Value))\n     Next cell\n   End Sub\n4. **Assign Button**: Return to Excel (**Alt + Q**), click **Developer** -> **Insert** -> **Button (Form Control)**. Draw button on sheet and select ProcessData_EX2425.\n5. **Execute & Test**: Click button and verify uppercase transformation instantly.",
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
