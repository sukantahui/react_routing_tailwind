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
      "title": "Dynamic Grid Spilling & EXPAND Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1701",
      "formula": "=EXPAND(A4:B10, 10, 3, \"N/A\")",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1701. Input payload is in range A4:D50. You must construct dynamic array formulas using function **EXPAND** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1701**.",
        "In cell **F4**, type dynamic array formula using **EXPAND** e.g. `=EXPAND(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1701**.\n2. **Type EXPAND**: Enter `=EXPAND(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =EXPAND(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function EXPAND empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1702",
      "title": "Dynamic Grid Spilling & RANDARRAY Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1702",
      "formula": "=RANDARRAY(5, 3, 10, 50, TRUE)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1702. Input payload is in range A4:D50. You must construct dynamic array formulas using function **RANDARRAY** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1702**.",
        "In cell **F4**, type dynamic array formula using **RANDARRAY** e.g. `=RANDARRAY(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1702**.\n2. **Type RANDARRAY**: Enter `=RANDARRAY(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =RANDARRAY(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function RANDARRAY empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1703",
      "title": "Dynamic Grid Spilling & FILTER Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1703",
      "formula": "=FILTER(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1703. Input payload is in range A4:D50. You must construct dynamic array formulas using function **FILTER** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1703**.",
        "In cell **F4**, type dynamic array formula using **FILTER** e.g. `=FILTER(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1703**.\n2. **Type FILTER**: Enter `=FILTER(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =FILTER(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function FILTER empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1704",
      "title": "Dynamic Grid Spilling & SORT Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1704",
      "formula": "=SORT(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1704. Input payload is in range A4:D50. You must construct dynamic array formulas using function **SORT** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1704**.",
        "In cell **F4**, type dynamic array formula using **SORT** e.g. `=SORT(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1704**.\n2. **Type SORT**: Enter `=SORT(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =SORT(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function SORT empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1705",
      "title": "Dynamic Grid Spilling & SORTBY Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1705",
      "formula": "=SORTBY(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1705. Input payload is in range A4:D50. You must construct dynamic array formulas using function **SORTBY** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1705**.",
        "In cell **F4**, type dynamic array formula using **SORTBY** e.g. `=SORTBY(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1705**.\n2. **Type SORTBY**: Enter `=SORTBY(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =SORTBY(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function SORTBY empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1706",
      "title": "Dynamic Grid Spilling & UNIQUE Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1706",
      "formula": "=UNIQUE(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1706. Input payload is in range A4:D50. You must construct dynamic array formulas using function **UNIQUE** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1706**.",
        "In cell **F4**, type dynamic array formula using **UNIQUE** e.g. `=UNIQUE(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1706**.\n2. **Type UNIQUE**: Enter `=UNIQUE(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =UNIQUE(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function UNIQUE empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1707",
      "title": "Dynamic Grid Spilling & SEQUENCE Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1707",
      "formula": "=SEQUENCE(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1707. Input payload is in range A4:D50. You must construct dynamic array formulas using function **SEQUENCE** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1707**.",
        "In cell **F4**, type dynamic array formula using **SEQUENCE** e.g. `=SEQUENCE(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1707**.\n2. **Type SEQUENCE**: Enter `=SEQUENCE(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =SEQUENCE(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function SEQUENCE empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1708",
      "title": "Dynamic Grid Spilling & CHOOSEROWS Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1708",
      "formula": "=CHOOSEROWS(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1708. Input payload is in range A4:D50. You must construct dynamic array formulas using function **CHOOSEROWS** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1708**.",
        "In cell **F4**, type dynamic array formula using **CHOOSEROWS** e.g. `=CHOOSEROWS(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1708**.\n2. **Type CHOOSEROWS**: Enter `=CHOOSEROWS(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =CHOOSEROWS(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function CHOOSEROWS empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1709",
      "title": "Dynamic Grid Spilling & CHOOSECOLS Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1709",
      "formula": "=CHOOSECOLS(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1709. Input payload is in range A4:D50. You must construct dynamic array formulas using function **CHOOSECOLS** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1709**.",
        "In cell **F4**, type dynamic array formula using **CHOOSECOLS** e.g. `=CHOOSECOLS(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1709**.\n2. **Type CHOOSECOLS**: Enter `=CHOOSECOLS(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =CHOOSECOLS(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function CHOOSECOLS empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1710",
      "title": "Dynamic Grid Spilling & TAKE Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1710",
      "formula": "=TAKE(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1710. Input payload is in range A4:D50. You must construct dynamic array formulas using function **TAKE** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1710**.",
        "In cell **F4**, type dynamic array formula using **TAKE** e.g. `=TAKE(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1710**.\n2. **Type TAKE**: Enter `=TAKE(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =TAKE(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function TAKE empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1711",
      "title": "Dynamic Grid Spilling & DROP Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1711",
      "formula": "=DROP(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1711. Input payload is in range A4:D50. You must construct dynamic array formulas using function **DROP** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1711**.",
        "In cell **F4**, type dynamic array formula using **DROP** e.g. `=DROP(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1711**.\n2. **Type DROP**: Enter `=DROP(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =DROP(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function DROP empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1712",
      "title": "Dynamic Grid Spilling & HSTACK Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1712",
      "formula": "=HSTACK(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1712. Input payload is in range A4:D50. You must construct dynamic array formulas using function **HSTACK** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1712**.",
        "In cell **F4**, type dynamic array formula using **HSTACK** e.g. `=HSTACK(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1712**.\n2. **Type HSTACK**: Enter `=HSTACK(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =HSTACK(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function HSTACK empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1713",
      "title": "Dynamic Grid Spilling & VSTACK Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1713",
      "formula": "=VSTACK(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1713. Input payload is in range A4:D50. You must construct dynamic array formulas using function **VSTACK** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1713**.",
        "In cell **F4**, type dynamic array formula using **VSTACK** e.g. `=VSTACK(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1713**.\n2. **Type VSTACK**: Enter `=VSTACK(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =VSTACK(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function VSTACK empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1714",
      "title": "Dynamic Grid Spilling & WRAPROWS Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1714",
      "formula": "=WRAPROWS(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1714. Input payload is in range A4:D50. You must construct dynamic array formulas using function **WRAPROWS** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1714**.",
        "In cell **F4**, type dynamic array formula using **WRAPROWS** e.g. `=WRAPROWS(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1714**.\n2. **Type WRAPROWS**: Enter `=WRAPROWS(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =WRAPROWS(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function WRAPROWS empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1715",
      "title": "Dynamic Grid Spilling & WRAPCOLS Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1715",
      "formula": "=WRAPCOLS(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1715. Input payload is in range A4:D50. You must construct dynamic array formulas using function **WRAPCOLS** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1715**.",
        "In cell **F4**, type dynamic array formula using **WRAPCOLS** e.g. `=WRAPCOLS(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1715**.\n2. **Type WRAPCOLS**: Enter `=WRAPCOLS(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =WRAPCOLS(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function WRAPCOLS empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1716",
      "title": "Dynamic Grid Spilling & TOCOL Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1716",
      "formula": "=TOCOL(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1716. Input payload is in range A4:D50. You must construct dynamic array formulas using function **TOCOL** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1716**.",
        "In cell **F4**, type dynamic array formula using **TOCOL** e.g. `=TOCOL(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1716**.\n2. **Type TOCOL**: Enter `=TOCOL(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =TOCOL(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function TOCOL empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1717",
      "title": "Dynamic Grid Spilling & TOROW Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1717",
      "formula": "=TOROW(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1717. Input payload is in range A4:D50. You must construct dynamic array formulas using function **TOROW** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1717**.",
        "In cell **F4**, type dynamic array formula using **TOROW** e.g. `=TOROW(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1717**.\n2. **Type TOROW**: Enter `=TOROW(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =TOROW(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function TOROW empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1718",
      "title": "Dynamic Grid Spilling & EXPAND Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1718",
      "formula": "=EXPAND(A4:B10, 10, 3, \"N/A\")",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1718. Input payload is in range A4:D50. You must construct dynamic array formulas using function **EXPAND** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1718**.",
        "In cell **F4**, type dynamic array formula using **EXPAND** e.g. `=EXPAND(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1718**.\n2. **Type EXPAND**: Enter `=EXPAND(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =EXPAND(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function EXPAND empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1719",
      "title": "Dynamic Grid Spilling & RANDARRAY Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1719",
      "formula": "=RANDARRAY(5, 3, 10, 50, TRUE)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1719. Input payload is in range A4:D50. You must construct dynamic array formulas using function **RANDARRAY** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1719**.",
        "In cell **F4**, type dynamic array formula using **RANDARRAY** e.g. `=RANDARRAY(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1719**.\n2. **Type RANDARRAY**: Enter `=RANDARRAY(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =RANDARRAY(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function RANDARRAY empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1720",
      "title": "Dynamic Grid Spilling & FILTER Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1720",
      "formula": "=FILTER(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1720. Input payload is in range A4:D50. You must construct dynamic array formulas using function **FILTER** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1720**.",
        "In cell **F4**, type dynamic array formula using **FILTER** e.g. `=FILTER(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1720**.\n2. **Type FILTER**: Enter `=FILTER(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =FILTER(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function FILTER empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1721",
      "title": "Dynamic Grid Spilling & SORT Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1721",
      "formula": "=SORT(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1721. Input payload is in range A4:D50. You must construct dynamic array formulas using function **SORT** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1721**.",
        "In cell **F4**, type dynamic array formula using **SORT** e.g. `=SORT(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1721**.\n2. **Type SORT**: Enter `=SORT(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =SORT(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function SORT empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1722",
      "title": "Dynamic Grid Spilling & SORTBY Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1722",
      "formula": "=SORTBY(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1722. Input payload is in range A4:D50. You must construct dynamic array formulas using function **SORTBY** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1722**.",
        "In cell **F4**, type dynamic array formula using **SORTBY** e.g. `=SORTBY(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1722**.\n2. **Type SORTBY**: Enter `=SORTBY(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =SORTBY(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function SORTBY empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1723",
      "title": "Dynamic Grid Spilling & UNIQUE Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1723",
      "formula": "=UNIQUE(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1723. Input payload is in range A4:D50. You must construct dynamic array formulas using function **UNIQUE** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1723**.",
        "In cell **F4**, type dynamic array formula using **UNIQUE** e.g. `=UNIQUE(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1723**.\n2. **Type UNIQUE**: Enter `=UNIQUE(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =UNIQUE(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function UNIQUE empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1724",
      "title": "Dynamic Grid Spilling & SEQUENCE Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1724",
      "formula": "=SEQUENCE(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1724. Input payload is in range A4:D50. You must construct dynamic array formulas using function **SEQUENCE** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1724**.",
        "In cell **F4**, type dynamic array formula using **SEQUENCE** e.g. `=SEQUENCE(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1724**.\n2. **Type SEQUENCE**: Enter `=SEQUENCE(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =SEQUENCE(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function SEQUENCE empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    },
    {
      "projectId": "EX1725",
      "title": "Dynamic Grid Spilling & CHOOSEROWS Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1725",
      "formula": "=CHOOSEROWS(A4:D50)",
      "description": "As a Lead Data Architect, you are developing dynamic array transformations on sheet EX1725. Input payload is in range A4:D50. You must construct dynamic array formulas using function **CHOOSEROWS** in cell F4 to spill expanded grids, reshape matrix dimensions, or generate random test arrays without needing Ctrl+Shift+Enter.",
      "requirements": [
        "Navigate to tab **EX1725**.",
        "In cell **F4**, type dynamic array formula using **CHOOSEROWS** e.g. `=CHOOSEROWS(A4:B10, 10, 3, \"N/A\")`.",
        "Observe the blue border bounding box representing the spilled range.",
        "Ensure no text exists in cells below **F4** to prevent #SPILL! errors.",
        "Reference the spilled range in cell **K4** using hash syntax `=SUM(F4#)`."
      ],
      "stepByStep": "1. **Click Cell F4**: Open worksheet **EX1725**.\n2. **Type CHOOSEROWS**: Enter `=CHOOSEROWS(A4:B10, 10, 3, \"N/A\")` and press **Enter**.\n3. **Inspect Spill**: Notice blue border around spilled cells.\n4. **Hash Reference**: In K4, type `=SUM(F4#)` to reference entire spilled array.",
      "rawMemoryVsRendered": {
        "raw": "Spilled Grid Array",
        "mask": "Dynamic Spill",
        "rendered": "Reshaped Grid Matrix"
      },
      "expectedOutput": "| Anchor Cell | Applied Method | Spill Behavior | Downstream Reference |\n| ----------- | -------------- | -------------- | -------------------- |\n| F4          | =CHOOSEROWS(...) | Spilled Grid   | =SUM(F4#)            |",
      "proTip": "Function CHOOSEROWS empowers dynamic array grid manipulation. Use hash references (#) to feed spilled ranges into downstream formulas!"
    }
  ]
};
