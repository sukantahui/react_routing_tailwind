export const excelModuleProjectsData = {
  "projectCategory": "Practical Laboratory Exercises: Financial Functions in Excel (Basic to Professional) Master Class",
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
      "projectId": "EX1201",
      "title": "Financial Engineering & FV Method (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1201",
      "formula": "=FV(8%/12, 120, -10000, 0)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1201. You must implement financial function **FV** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1201**.",
        "In cell **C15**, write financial formula using **FV** e.g. `=FV(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1201**.\n2. **Enter FV**: Type `=FV(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| FV Output  | =FV(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using FV eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1202",
      "title": "Financial Engineering & RATE Method (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1202",
      "formula": "=RATE(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1202. You must implement financial function **RATE** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1202**.",
        "In cell **C15**, write financial formula using **RATE** e.g. `=RATE(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1202**.\n2. **Enter RATE**: Type `=RATE(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| RATE Output  | =RATE(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using RATE eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1203",
      "title": "Financial Engineering & NPER Method (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1203",
      "formula": "=NPER(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1203. You must implement financial function **NPER** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1203**.",
        "In cell **C15**, write financial formula using **NPER** e.g. `=NPER(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1203**.\n2. **Enter NPER**: Type `=NPER(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| NPER Output  | =NPER(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using NPER eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1204",
      "title": "Financial Engineering & RRI Method (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1204",
      "formula": "=RRI(5, 100000, 180000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1204. You must implement financial function **RRI** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1204**.",
        "In cell **C15**, write financial formula using **RRI** e.g. `=RRI(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1204**.\n2. **Enter RRI**: Type `=RRI(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| RRI Output  | =RRI(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using RRI eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1205",
      "title": "Financial Engineering & PDURATION Method (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1205",
      "formula": "=PDURATION(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1205. You must implement financial function **PDURATION** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1205**.",
        "In cell **C15**, write financial formula using **PDURATION** e.g. `=PDURATION(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1205**.\n2. **Enter PDURATION**: Type `=PDURATION(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| PDURATION Output  | =PDURATION(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using PDURATION eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1206",
      "title": "Financial Engineering & ISPMT Method (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1206",
      "formula": "=ISPMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1206. You must implement financial function **ISPMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1206**.",
        "In cell **C15**, write financial formula using **ISPMT** e.g. `=ISPMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1206**.\n2. **Enter ISPMT**: Type `=ISPMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| ISPMT Output  | =ISPMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using ISPMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1207",
      "title": "Financial Engineering & FVSCHEDULE Method (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1207",
      "formula": "=FVSCHEDULE(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1207. You must implement financial function **FVSCHEDULE** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1207**.",
        "In cell **C15**, write financial formula using **FVSCHEDULE** e.g. `=FVSCHEDULE(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1207**.\n2. **Enter FVSCHEDULE**: Type `=FVSCHEDULE(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| FVSCHEDULE Output  | =FVSCHEDULE(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using FVSCHEDULE eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1208",
      "title": "Financial Engineering & PMT Method (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1208",
      "formula": "=PMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1208. You must implement financial function **PMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1208**.",
        "In cell **C15**, write financial formula using **PMT** e.g. `=PMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1208**.\n2. **Enter PMT**: Type `=PMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| PMT Output  | =PMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using PMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1209",
      "title": "Financial Engineering & PPMT Method (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1209",
      "formula": "=PPMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1209. You must implement financial function **PPMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1209**.",
        "In cell **C15**, write financial formula using **PPMT** e.g. `=PPMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1209**.\n2. **Enter PPMT**: Type `=PPMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| PPMT Output  | =PPMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using PPMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1210",
      "title": "Financial Engineering & IPMT Method (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1210",
      "formula": "=IPMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1210. You must implement financial function **IPMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1210**.",
        "In cell **C15**, write financial formula using **IPMT** e.g. `=IPMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1210**.\n2. **Enter IPMT**: Type `=IPMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| IPMT Output  | =IPMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using IPMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1211",
      "title": "Financial Engineering & PV Method (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1211",
      "formula": "=PV(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1211. You must implement financial function **PV** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1211**.",
        "In cell **C15**, write financial formula using **PV** e.g. `=PV(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1211**.\n2. **Enter PV**: Type `=PV(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| PV Output  | =PV(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using PV eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1212",
      "title": "Financial Engineering & NPV Method (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1212",
      "formula": "=NPV(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1212. You must implement financial function **NPV** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1212**.",
        "In cell **C15**, write financial formula using **NPV** e.g. `=NPV(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1212**.\n2. **Enter NPV**: Type `=NPV(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| NPV Output  | =NPV(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using NPV eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1213",
      "title": "Financial Engineering & IRR Method (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1213",
      "formula": "=IRR(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1213. You must implement financial function **IRR** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1213**.",
        "In cell **C15**, write financial formula using **IRR** e.g. `=IRR(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1213**.\n2. **Enter IRR**: Type `=IRR(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| IRR Output  | =IRR(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using IRR eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1214",
      "title": "Financial Engineering & XNPV Method (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1214",
      "formula": "=XNPV(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1214. You must implement financial function **XNPV** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1214**.",
        "In cell **C15**, write financial formula using **XNPV** e.g. `=XNPV(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1214**.\n2. **Enter XNPV**: Type `=XNPV(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| XNPV Output  | =XNPV(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using XNPV eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1215",
      "title": "Financial Engineering & XIRR Method (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1215",
      "formula": "=XIRR(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1215. You must implement financial function **XIRR** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1215**.",
        "In cell **C15**, write financial formula using **XIRR** e.g. `=XIRR(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1215**.\n2. **Enter XIRR**: Type `=XIRR(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| XIRR Output  | =XIRR(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using XIRR eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1216",
      "title": "Financial Engineering & FV Method (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1216",
      "formula": "=FV(8%/12, 120, -10000, 0)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1216. You must implement financial function **FV** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1216**.",
        "In cell **C15**, write financial formula using **FV** e.g. `=FV(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1216**.\n2. **Enter FV**: Type `=FV(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| FV Output  | =FV(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using FV eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1217",
      "title": "Financial Engineering & RATE Method (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1217",
      "formula": "=RATE(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1217. You must implement financial function **RATE** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1217**.",
        "In cell **C15**, write financial formula using **RATE** e.g. `=RATE(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1217**.\n2. **Enter RATE**: Type `=RATE(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| RATE Output  | =RATE(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using RATE eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1218",
      "title": "Financial Engineering & NPER Method (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1218",
      "formula": "=NPER(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1218. You must implement financial function **NPER** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1218**.",
        "In cell **C15**, write financial formula using **NPER** e.g. `=NPER(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1218**.\n2. **Enter NPER**: Type `=NPER(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| NPER Output  | =NPER(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using NPER eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1219",
      "title": "Financial Engineering & RRI Method (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1219",
      "formula": "=RRI(5, 100000, 180000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1219. You must implement financial function **RRI** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1219**.",
        "In cell **C15**, write financial formula using **RRI** e.g. `=RRI(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1219**.\n2. **Enter RRI**: Type `=RRI(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| RRI Output  | =RRI(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using RRI eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1220",
      "title": "Financial Engineering & PDURATION Method (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1220",
      "formula": "=PDURATION(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1220. You must implement financial function **PDURATION** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1220**.",
        "In cell **C15**, write financial formula using **PDURATION** e.g. `=PDURATION(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1220**.\n2. **Enter PDURATION**: Type `=PDURATION(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| PDURATION Output  | =PDURATION(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using PDURATION eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1221",
      "title": "Financial Engineering & ISPMT Method (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1221",
      "formula": "=ISPMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1221. You must implement financial function **ISPMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1221**.",
        "In cell **C15**, write financial formula using **ISPMT** e.g. `=ISPMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1221**.\n2. **Enter ISPMT**: Type `=ISPMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| ISPMT Output  | =ISPMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using ISPMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1222",
      "title": "Financial Engineering & FVSCHEDULE Method (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1222",
      "formula": "=FVSCHEDULE(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1222. You must implement financial function **FVSCHEDULE** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1222**.",
        "In cell **C15**, write financial formula using **FVSCHEDULE** e.g. `=FVSCHEDULE(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1222**.\n2. **Enter FVSCHEDULE**: Type `=FVSCHEDULE(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| FVSCHEDULE Output  | =FVSCHEDULE(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using FVSCHEDULE eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1223",
      "title": "Financial Engineering & PMT Method (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1223",
      "formula": "=PMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1223. You must implement financial function **PMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1223**.",
        "In cell **C15**, write financial formula using **PMT** e.g. `=PMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1223**.\n2. **Enter PMT**: Type `=PMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| PMT Output  | =PMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using PMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1224",
      "title": "Financial Engineering & PPMT Method (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1224",
      "formula": "=PPMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1224. You must implement financial function **PPMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1224**.",
        "In cell **C15**, write financial formula using **PPMT** e.g. `=PPMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1224**.\n2. **Enter PPMT**: Type `=PPMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| PPMT Output  | =PPMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using PPMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    },
    {
      "projectId": "EX1225",
      "title": "Financial Engineering & IPMT Method (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1225",
      "formula": "=IPMT(10%/12, 36, -500000)",
      "description": "As a Corporate Financial Valuation Specialist at AccoTax, you are building an investment amortization schedule on sheet EX1225. You must implement financial function **IPMT** to compute future values, loan interest rates, payback durations, compound annual growth rates (CAGR), or net present values.",
      "requirements": [
        "Navigate to tab **EX1225**.",
        "In cell **C15**, write financial formula using **IPMT** e.g. `=IPMT(8%/12, 120, -10000, 0)`.",
        "Format monetary outputs with Indian Rupee mask `₹ #,##,##0.00`.",
        "Format interest rate outputs as Percentages (2 decimal places).",
        "Verify balance schedule reaches exactly ₹ 0.00."
      ],
      "stepByStep": "1. **Click Cell C15**: Open tab **EX1225**.\n2. **Enter IPMT**: Type `=IPMT(8%/12, 120, -10000, 0)` and press **Enter**.\n3. **Format Cell**: Press **Ctrl + Shift + $** for currency or **Ctrl + Shift + %** for percentage.\n4. **Audit Verification**: Confirm output matches theoretical investment model.",
      "rawMemoryVsRendered": {
        "raw": "1829460.4",
        "mask": "₹ #,##,##0.00",
        "rendered": "₹ 18,29,460.40"
      },
      "expectedOutput": "| Financial Metric | Applied Function | Calculated Result | Investment Rule |\n| ---------------- | ---------------- | ----------------- | --------------- |\n| IPMT Output  | =IPMT(...)   | ₹ 18,29,460.40    | Target Achieved |",
      "proTip": "Using IPMT eliminates standard compounding math mistakes and builds corporate-grade financial models!"
    }
  ]
};
