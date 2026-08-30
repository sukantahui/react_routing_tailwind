export const excelDataEntryProjectsData = {
  "projectCategory": "Practical Laboratory Exercises: Data Validation, Protection and Cleaning Techniques Master Class",
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
      "projectId": "EX1301",
      "title": "Information Auditing & ISTEXT Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1301",
      "formula": "=ISTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1301 in range B4:B30. You must use function **ISTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1301**.",
        "In column C, apply information formula `=ISTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1301**.\n2. **Enter ISTEXT**: Type `=ISTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1302",
      "title": "Information Auditing & ISNONTEXT Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1302",
      "formula": "=ISNONTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1302 in range B4:B30. You must use function **ISNONTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1302**.",
        "In column C, apply information formula `=ISNONTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1302**.\n2. **Enter ISNONTEXT**: Type `=ISNONTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISNONTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISNONTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISNONTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1303",
      "title": "Information Auditing & ISLOGICAL Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1303",
      "formula": "=ISLOGICAL(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1303 in range B4:B30. You must use function **ISLOGICAL** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1303**.",
        "In column C, apply information formula `=ISLOGICAL(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1303**.\n2. **Enter ISLOGICAL**: Type `=ISLOGICAL(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISLOGICAL | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISLOGICAL(B4)      | Verified     |",
      "proTip": "Using information functions like ISLOGICAL guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1304",
      "title": "Information Auditing & ISREF Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1304",
      "formula": "=ISREF(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1304 in range B4:B30. You must use function **ISREF** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1304**.",
        "In column C, apply information formula `=ISREF(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1304**.\n2. **Enter ISREF**: Type `=ISREF(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISREF | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISREF(B4)      | Verified     |",
      "proTip": "Using information functions like ISREF guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1305",
      "title": "Information Auditing & ISFORMULA Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1305",
      "formula": "=ISFORMULA(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1305 in range B4:B30. You must use function **ISFORMULA** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1305**.",
        "In column C, apply information formula `=ISFORMULA(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1305**.\n2. **Enter ISFORMULA**: Type `=ISFORMULA(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISFORMULA | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISFORMULA(B4)      | Verified     |",
      "proTip": "Using information functions like ISFORMULA guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1306",
      "title": "Information Auditing & TYPE Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1306",
      "formula": "=TYPE(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1306 in range B4:B30. You must use function **TYPE** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1306**.",
        "In column C, apply information formula `=TYPE(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1306**.\n2. **Enter TYPE**: Type `=TYPE(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied TYPE | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =TYPE(B4)      | Verified     |",
      "proTip": "Using information functions like TYPE guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1307",
      "title": "Information Auditing & ERROR.TYPE Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1307",
      "formula": "=ERROR.TYPE(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1307 in range B4:B30. You must use function **ERROR.TYPE** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1307**.",
        "In column C, apply information formula `=ERROR.TYPE(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1307**.\n2. **Enter ERROR.TYPE**: Type `=ERROR.TYPE(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ERROR.TYPE | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ERROR.TYPE(B4)      | Verified     |",
      "proTip": "Using information functions like ERROR.TYPE guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1308",
      "title": "Information Auditing & FORMULATEXT Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1308",
      "formula": "=FORMULATEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1308 in range B4:B30. You must use function **FORMULATEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1308**.",
        "In column C, apply information formula `=FORMULATEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1308**.\n2. **Enter FORMULATEXT**: Type `=FORMULATEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied FORMULATEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =FORMULATEXT(B4)      | Verified     |",
      "proTip": "Using information functions like FORMULATEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1309",
      "title": "Information Auditing & ISEVEN Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1309",
      "formula": "=ISEVEN(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1309 in range B4:B30. You must use function **ISEVEN** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1309**.",
        "In column C, apply information formula `=ISEVEN(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1309**.\n2. **Enter ISEVEN**: Type `=ISEVEN(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISEVEN | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISEVEN(B4)      | Verified     |",
      "proTip": "Using information functions like ISEVEN guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1310",
      "title": "Information Auditing & ISODD Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1310",
      "formula": "=ISODD(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1310 in range B4:B30. You must use function **ISODD** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1310**.",
        "In column C, apply information formula `=ISODD(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1310**.\n2. **Enter ISODD**: Type `=ISODD(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISODD | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISODD(B4)      | Verified     |",
      "proTip": "Using information functions like ISODD guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1311",
      "title": "Information Auditing & NA Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1311",
      "formula": "=NA(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1311 in range B4:B30. You must use function **NA** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1311**.",
        "In column C, apply information formula `=NA(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1311**.\n2. **Enter NA**: Type `=NA(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied NA | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =NA(B4)      | Verified     |",
      "proTip": "Using information functions like NA guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1312",
      "title": "Information Auditing & N Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1312",
      "formula": "=N(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1312 in range B4:B30. You must use function **N** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1312**.",
        "In column C, apply information formula `=N(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1312**.\n2. **Enter N**: Type `=N(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied N | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =N(B4)      | Verified     |",
      "proTip": "Using information functions like N guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1313",
      "title": "Information Auditing & CELL Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1313",
      "formula": "=CELL(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1313 in range B4:B30. You must use function **CELL** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1313**.",
        "In column C, apply information formula `=CELL(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1313**.\n2. **Enter CELL**: Type `=CELL(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied CELL | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =CELL(B4)      | Verified     |",
      "proTip": "Using information functions like CELL guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1314",
      "title": "Information Auditing & INFO Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1314",
      "formula": "=INFO(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1314 in range B4:B30. You must use function **INFO** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1314**.",
        "In column C, apply information formula `=INFO(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1314**.\n2. **Enter INFO**: Type `=INFO(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied INFO | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =INFO(B4)      | Verified     |",
      "proTip": "Using information functions like INFO guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1315",
      "title": "Information Auditing & DSUM Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1315",
      "formula": "=DSUM(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1315 in range B4:B30. You must use function **DSUM** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1315**.",
        "In column C, apply information formula `=DSUM(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1315**.\n2. **Enter DSUM**: Type `=DSUM(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DSUM | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DSUM(B4)      | Verified     |",
      "proTip": "Using information functions like DSUM guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1316",
      "title": "Information Auditing & DCOUNT Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1316",
      "formula": "=DCOUNT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1316 in range B4:B30. You must use function **DCOUNT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1316**.",
        "In column C, apply information formula `=DCOUNT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1316**.\n2. **Enter DCOUNT**: Type `=DCOUNT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DCOUNT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DCOUNT(B4)      | Verified     |",
      "proTip": "Using information functions like DCOUNT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1317",
      "title": "Information Auditing & DCOUNTA Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1317",
      "formula": "=DCOUNTA(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1317 in range B4:B30. You must use function **DCOUNTA** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1317**.",
        "In column C, apply information formula `=DCOUNTA(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1317**.\n2. **Enter DCOUNTA**: Type `=DCOUNTA(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DCOUNTA | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DCOUNTA(B4)      | Verified     |",
      "proTip": "Using information functions like DCOUNTA guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1318",
      "title": "Information Auditing & DAVERAGE Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1318",
      "formula": "=DAVERAGE(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1318 in range B4:B30. You must use function **DAVERAGE** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1318**.",
        "In column C, apply information formula `=DAVERAGE(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1318**.\n2. **Enter DAVERAGE**: Type `=DAVERAGE(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DAVERAGE | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DAVERAGE(B4)      | Verified     |",
      "proTip": "Using information functions like DAVERAGE guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1319",
      "title": "Information Auditing & DMAX Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1319",
      "formula": "=DMAX(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1319 in range B4:B30. You must use function **DMAX** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1319**.",
        "In column C, apply information formula `=DMAX(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1319**.\n2. **Enter DMAX**: Type `=DMAX(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DMAX | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DMAX(B4)      | Verified     |",
      "proTip": "Using information functions like DMAX guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1320",
      "title": "Information Auditing & DMIN Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1320",
      "formula": "=DMIN(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1320 in range B4:B30. You must use function **DMIN** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1320**.",
        "In column C, apply information formula `=DMIN(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1320**.\n2. **Enter DMIN**: Type `=DMIN(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DMIN | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DMIN(B4)      | Verified     |",
      "proTip": "Using information functions like DMIN guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1321",
      "title": "Information Auditing & DGET Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1321",
      "formula": "=DGET(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1321 in range B4:B30. You must use function **DGET** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1321**.",
        "In column C, apply information formula `=DGET(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1321**.\n2. **Enter DGET**: Type `=DGET(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DGET | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DGET(B4)      | Verified     |",
      "proTip": "Using information functions like DGET guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1322",
      "title": "Information Auditing & ISTEXT Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1322",
      "formula": "=ISTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1322 in range B4:B30. You must use function **ISTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1322**.",
        "In column C, apply information formula `=ISTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1322**.\n2. **Enter ISTEXT**: Type `=ISTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1323",
      "title": "Information Auditing & ISNONTEXT Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1323",
      "formula": "=ISNONTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1323 in range B4:B30. You must use function **ISNONTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1323**.",
        "In column C, apply information formula `=ISNONTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1323**.\n2. **Enter ISNONTEXT**: Type `=ISNONTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISNONTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISNONTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISNONTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1324",
      "title": "Information Auditing & ISLOGICAL Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1324",
      "formula": "=ISLOGICAL(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1324 in range B4:B30. You must use function **ISLOGICAL** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1324**.",
        "In column C, apply information formula `=ISLOGICAL(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1324**.\n2. **Enter ISLOGICAL**: Type `=ISLOGICAL(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISLOGICAL | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISLOGICAL(B4)      | Verified     |",
      "proTip": "Using information functions like ISLOGICAL guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1325",
      "title": "Information Auditing & ISREF Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1325",
      "formula": "=ISREF(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1325 in range B4:B30. You must use function **ISREF** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1325**.",
        "In column C, apply information formula `=ISREF(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1325**.\n2. **Enter ISREF**: Type `=ISREF(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISREF | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISREF(B4)      | Verified     |",
      "proTip": "Using information functions like ISREF guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_003_002",
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
      "projectId": "EX1301",
      "title": "Information Auditing & ISTEXT Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1301",
      "formula": "=ISTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1301 in range B4:B30. You must use function **ISTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1301**.",
        "In column C, apply information formula `=ISTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1301**.\n2. **Enter ISTEXT**: Type `=ISTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1302",
      "title": "Information Auditing & ISNONTEXT Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1302",
      "formula": "=ISNONTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1302 in range B4:B30. You must use function **ISNONTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1302**.",
        "In column C, apply information formula `=ISNONTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1302**.\n2. **Enter ISNONTEXT**: Type `=ISNONTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISNONTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISNONTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISNONTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1303",
      "title": "Information Auditing & ISLOGICAL Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1303",
      "formula": "=ISLOGICAL(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1303 in range B4:B30. You must use function **ISLOGICAL** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1303**.",
        "In column C, apply information formula `=ISLOGICAL(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1303**.\n2. **Enter ISLOGICAL**: Type `=ISLOGICAL(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISLOGICAL | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISLOGICAL(B4)      | Verified     |",
      "proTip": "Using information functions like ISLOGICAL guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1304",
      "title": "Information Auditing & ISREF Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1304",
      "formula": "=ISREF(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1304 in range B4:B30. You must use function **ISREF** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1304**.",
        "In column C, apply information formula `=ISREF(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1304**.\n2. **Enter ISREF**: Type `=ISREF(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISREF | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISREF(B4)      | Verified     |",
      "proTip": "Using information functions like ISREF guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1305",
      "title": "Information Auditing & ISFORMULA Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1305",
      "formula": "=ISFORMULA(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1305 in range B4:B30. You must use function **ISFORMULA** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1305**.",
        "In column C, apply information formula `=ISFORMULA(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1305**.\n2. **Enter ISFORMULA**: Type `=ISFORMULA(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISFORMULA | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISFORMULA(B4)      | Verified     |",
      "proTip": "Using information functions like ISFORMULA guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1306",
      "title": "Information Auditing & TYPE Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1306",
      "formula": "=TYPE(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1306 in range B4:B30. You must use function **TYPE** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1306**.",
        "In column C, apply information formula `=TYPE(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1306**.\n2. **Enter TYPE**: Type `=TYPE(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied TYPE | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =TYPE(B4)      | Verified     |",
      "proTip": "Using information functions like TYPE guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1307",
      "title": "Information Auditing & ERROR.TYPE Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1307",
      "formula": "=ERROR.TYPE(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1307 in range B4:B30. You must use function **ERROR.TYPE** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1307**.",
        "In column C, apply information formula `=ERROR.TYPE(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1307**.\n2. **Enter ERROR.TYPE**: Type `=ERROR.TYPE(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ERROR.TYPE | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ERROR.TYPE(B4)      | Verified     |",
      "proTip": "Using information functions like ERROR.TYPE guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1308",
      "title": "Information Auditing & FORMULATEXT Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1308",
      "formula": "=FORMULATEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1308 in range B4:B30. You must use function **FORMULATEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1308**.",
        "In column C, apply information formula `=FORMULATEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1308**.\n2. **Enter FORMULATEXT**: Type `=FORMULATEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied FORMULATEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =FORMULATEXT(B4)      | Verified     |",
      "proTip": "Using information functions like FORMULATEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1309",
      "title": "Information Auditing & ISEVEN Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1309",
      "formula": "=ISEVEN(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1309 in range B4:B30. You must use function **ISEVEN** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1309**.",
        "In column C, apply information formula `=ISEVEN(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1309**.\n2. **Enter ISEVEN**: Type `=ISEVEN(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISEVEN | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISEVEN(B4)      | Verified     |",
      "proTip": "Using information functions like ISEVEN guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1310",
      "title": "Information Auditing & ISODD Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1310",
      "formula": "=ISODD(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1310 in range B4:B30. You must use function **ISODD** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1310**.",
        "In column C, apply information formula `=ISODD(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1310**.\n2. **Enter ISODD**: Type `=ISODD(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISODD | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISODD(B4)      | Verified     |",
      "proTip": "Using information functions like ISODD guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1311",
      "title": "Information Auditing & NA Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1311",
      "formula": "=NA(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1311 in range B4:B30. You must use function **NA** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1311**.",
        "In column C, apply information formula `=NA(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1311**.\n2. **Enter NA**: Type `=NA(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied NA | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =NA(B4)      | Verified     |",
      "proTip": "Using information functions like NA guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1312",
      "title": "Information Auditing & N Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1312",
      "formula": "=N(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1312 in range B4:B30. You must use function **N** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1312**.",
        "In column C, apply information formula `=N(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1312**.\n2. **Enter N**: Type `=N(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied N | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =N(B4)      | Verified     |",
      "proTip": "Using information functions like N guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1313",
      "title": "Information Auditing & CELL Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1313",
      "formula": "=CELL(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1313 in range B4:B30. You must use function **CELL** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1313**.",
        "In column C, apply information formula `=CELL(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1313**.\n2. **Enter CELL**: Type `=CELL(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied CELL | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =CELL(B4)      | Verified     |",
      "proTip": "Using information functions like CELL guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1314",
      "title": "Information Auditing & INFO Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1314",
      "formula": "=INFO(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1314 in range B4:B30. You must use function **INFO** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1314**.",
        "In column C, apply information formula `=INFO(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1314**.\n2. **Enter INFO**: Type `=INFO(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied INFO | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =INFO(B4)      | Verified     |",
      "proTip": "Using information functions like INFO guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1315",
      "title": "Information Auditing & DSUM Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1315",
      "formula": "=DSUM(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1315 in range B4:B30. You must use function **DSUM** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1315**.",
        "In column C, apply information formula `=DSUM(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1315**.\n2. **Enter DSUM**: Type `=DSUM(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DSUM | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DSUM(B4)      | Verified     |",
      "proTip": "Using information functions like DSUM guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1316",
      "title": "Information Auditing & DCOUNT Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1316",
      "formula": "=DCOUNT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1316 in range B4:B30. You must use function **DCOUNT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1316**.",
        "In column C, apply information formula `=DCOUNT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1316**.\n2. **Enter DCOUNT**: Type `=DCOUNT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DCOUNT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DCOUNT(B4)      | Verified     |",
      "proTip": "Using information functions like DCOUNT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1317",
      "title": "Information Auditing & DCOUNTA Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1317",
      "formula": "=DCOUNTA(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1317 in range B4:B30. You must use function **DCOUNTA** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1317**.",
        "In column C, apply information formula `=DCOUNTA(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1317**.\n2. **Enter DCOUNTA**: Type `=DCOUNTA(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DCOUNTA | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DCOUNTA(B4)      | Verified     |",
      "proTip": "Using information functions like DCOUNTA guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1318",
      "title": "Information Auditing & DAVERAGE Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1318",
      "formula": "=DAVERAGE(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1318 in range B4:B30. You must use function **DAVERAGE** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1318**.",
        "In column C, apply information formula `=DAVERAGE(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1318**.\n2. **Enter DAVERAGE**: Type `=DAVERAGE(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DAVERAGE | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DAVERAGE(B4)      | Verified     |",
      "proTip": "Using information functions like DAVERAGE guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1319",
      "title": "Information Auditing & DMAX Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1319",
      "formula": "=DMAX(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1319 in range B4:B30. You must use function **DMAX** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1319**.",
        "In column C, apply information formula `=DMAX(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1319**.\n2. **Enter DMAX**: Type `=DMAX(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DMAX | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DMAX(B4)      | Verified     |",
      "proTip": "Using information functions like DMAX guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1320",
      "title": "Information Auditing & DMIN Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1320",
      "formula": "=DMIN(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1320 in range B4:B30. You must use function **DMIN** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1320**.",
        "In column C, apply information formula `=DMIN(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1320**.\n2. **Enter DMIN**: Type `=DMIN(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DMIN | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DMIN(B4)      | Verified     |",
      "proTip": "Using information functions like DMIN guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1321",
      "title": "Information Auditing & DGET Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1321",
      "formula": "=DGET(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1321 in range B4:B30. You must use function **DGET** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1321**.",
        "In column C, apply information formula `=DGET(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1321**.\n2. **Enter DGET**: Type `=DGET(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied DGET | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =DGET(B4)      | Verified     |",
      "proTip": "Using information functions like DGET guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1322",
      "title": "Information Auditing & ISTEXT Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1322",
      "formula": "=ISTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1322 in range B4:B30. You must use function **ISTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1322**.",
        "In column C, apply information formula `=ISTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1322**.\n2. **Enter ISTEXT**: Type `=ISTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1323",
      "title": "Information Auditing & ISNONTEXT Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1323",
      "formula": "=ISNONTEXT(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1323 in range B4:B30. You must use function **ISNONTEXT** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1323**.",
        "In column C, apply information formula `=ISNONTEXT(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1323**.\n2. **Enter ISNONTEXT**: Type `=ISNONTEXT(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISNONTEXT | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISNONTEXT(B4)      | Verified     |",
      "proTip": "Using information functions like ISNONTEXT guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1324",
      "title": "Information Auditing & ISLOGICAL Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1324",
      "formula": "=ISLOGICAL(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1324 in range B4:B30. You must use function **ISLOGICAL** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1324**.",
        "In column C, apply information formula `=ISLOGICAL(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1324**.\n2. **Enter ISLOGICAL**: Type `=ISLOGICAL(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISLOGICAL | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISLOGICAL(B4)      | Verified     |",
      "proTip": "Using information functions like ISLOGICAL guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    },
    {
      "projectId": "EX1325",
      "title": "Information Auditing & ISREF Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1325",
      "formula": "=ISREF(B4)",
      "description": "As an MIS Compliance Specialist at AccoTax, you are conducting cell audits on worksheet EX1325 in range B4:B30. You must use function **ISREF** to inspect cell data types, verify formula presence, audit error codes, or execute database query aggregations cleanly.",
      "requirements": [
        "Open worksheet tab **EX1325**.",
        "In column C, apply information formula `=ISREF(B4)`.",
        "Verify TRUE / FALSE or extracted code response in cell **C4**.",
        "Use Conditional Formatting to highlight cells where `ISFORMULA(B4)` evaluates to FALSE.",
        "Confirm audit summary calculations run error-free."
      ],
      "stepByStep": "1. **Click Cell C4**: Open tab **EX1325**.\n2. **Enter ISREF**: Type `=ISREF(B4)` and press **Enter**.\n3. **Drag Fill**: Double-click fill handle in C4 to auto-fill down to C30.\n4. **Audit Check**: Verify output text or boolean flag.",
      "rawMemoryVsRendered": {
        "raw": "B4 Reference",
        "mask": "Info Audit Flag",
        "rendered": "TRUE"
      },
      "expectedOutput": "| Audited Cell | Cell Content | Applied ISREF | Audit Output |\n| ------------ | ------------ | ------------------ | ------------ |\n| B4           | 145000       | =ISREF(B4)      | Verified     |",
      "proTip": "Using information functions like ISREF guarantees financial model integrity by detecting unwanted hardcoded numbers inside formula ranges!"
    }
  ]
};
