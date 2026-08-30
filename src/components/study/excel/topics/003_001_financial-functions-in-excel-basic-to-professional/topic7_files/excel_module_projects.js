export const excelModuleProjectsData = {
  "projectCategory": "Projects_003_001",
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
      "title": "Financial Modeling & Investment Valuation (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1201",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1201. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1201**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1201**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1202",
      "title": "Financial Modeling & Investment Valuation (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1202",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1202. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1202**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1202**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1203",
      "title": "Financial Modeling & Investment Valuation (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1203",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1203. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1203**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1203**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1204",
      "title": "Financial Modeling & Investment Valuation (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1204",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1204. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1204**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1204**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1205",
      "title": "Financial Modeling & Investment Valuation (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1205",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1205. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1205**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1205**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1206",
      "title": "Financial Modeling & Investment Valuation (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1206",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1206. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1206**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1206**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1207",
      "title": "Financial Modeling & Investment Valuation (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1207",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1207. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1207**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1207**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1208",
      "title": "Financial Modeling & Investment Valuation (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1208",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1208. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1208**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1208**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1209",
      "title": "Financial Modeling & Investment Valuation (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1209",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1209. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1209**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1209**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1210",
      "title": "Financial Modeling & Investment Valuation (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1210",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1210. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1210**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1210**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1211",
      "title": "Financial Modeling & Investment Valuation (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1211",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1211. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1211**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1211**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1212",
      "title": "Financial Modeling & Investment Valuation (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1212",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1212. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1212**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1212**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1213",
      "title": "Financial Modeling & Investment Valuation (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1213",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1213. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1213**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1213**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1214",
      "title": "Financial Modeling & Investment Valuation (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1214",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1214. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1214**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1214**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1215",
      "title": "Financial Modeling & Investment Valuation (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1215",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1215. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1215**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1215**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1216",
      "title": "Financial Modeling & Investment Valuation (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1216",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1216. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1216**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1216**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1217",
      "title": "Financial Modeling & Investment Valuation (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1217",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1217. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1217**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1217**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1218",
      "title": "Financial Modeling & Investment Valuation (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1218",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1218. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1218**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1218**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1219",
      "title": "Financial Modeling & Investment Valuation (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1219",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1219. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1219**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1219**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1220",
      "title": "Financial Modeling & Investment Valuation (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1220",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1220. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1220**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1220**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1221",
      "title": "Financial Modeling & Investment Valuation (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1221",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1221. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1221**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1221**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1222",
      "title": "Financial Modeling & Investment Valuation (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1222",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1222. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1222**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1222**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1223",
      "title": "Financial Modeling & Investment Valuation (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1223",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1223. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1223**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1223**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1224",
      "title": "Financial Modeling & Investment Valuation (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1224",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1224. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1224**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1224**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX1225",
      "title": "Financial Modeling & Investment Valuation (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1225",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX1225. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX1225**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX1225**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    }
  ]
};
