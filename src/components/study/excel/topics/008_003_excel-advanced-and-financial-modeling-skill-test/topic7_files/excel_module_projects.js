export const excelModuleProjectsData = {
  "projectCategory": "Projects_008_003",
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
      "projectId": "EX3201",
      "title": "Financial Modeling & Investment Valuation (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX3201",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3201. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3201**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3201**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3202",
      "title": "Financial Modeling & Investment Valuation (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX3202",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3202. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3202**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3202**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3203",
      "title": "Financial Modeling & Investment Valuation (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX3203",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3203. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3203**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3203**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3204",
      "title": "Financial Modeling & Investment Valuation (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX3204",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3204. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3204**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3204**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3205",
      "title": "Financial Modeling & Investment Valuation (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX3205",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3205. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3205**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3205**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3206",
      "title": "Financial Modeling & Investment Valuation (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX3206",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3206. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3206**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3206**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3207",
      "title": "Financial Modeling & Investment Valuation (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX3207",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3207. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3207**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3207**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3208",
      "title": "Financial Modeling & Investment Valuation (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX3208",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3208. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3208**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3208**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3209",
      "title": "Financial Modeling & Investment Valuation (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX3209",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3209. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3209**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3209**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3210",
      "title": "Financial Modeling & Investment Valuation (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX3210",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3210. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3210**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3210**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3211",
      "title": "Financial Modeling & Investment Valuation (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX3211",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3211. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3211**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3211**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3212",
      "title": "Financial Modeling & Investment Valuation (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX3212",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3212. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3212**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3212**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3213",
      "title": "Financial Modeling & Investment Valuation (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX3213",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3213. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3213**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3213**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3214",
      "title": "Financial Modeling & Investment Valuation (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX3214",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3214. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3214**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3214**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3215",
      "title": "Financial Modeling & Investment Valuation (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX3215",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3215. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3215**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3215**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3216",
      "title": "Financial Modeling & Investment Valuation (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX3216",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3216. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3216**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3216**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3217",
      "title": "Financial Modeling & Investment Valuation (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX3217",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3217. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3217**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3217**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3218",
      "title": "Financial Modeling & Investment Valuation (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX3218",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3218. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3218**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3218**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3219",
      "title": "Financial Modeling & Investment Valuation (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX3219",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3219. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3219**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3219**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3220",
      "title": "Financial Modeling & Investment Valuation (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX3220",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3220. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3220**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3220**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3221",
      "title": "Financial Modeling & Investment Valuation (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX3221",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3221. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3221**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3221**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3222",
      "title": "Financial Modeling & Investment Valuation (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX3222",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3222. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3222**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3222**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3223",
      "title": "Financial Modeling & Investment Valuation (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX3223",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3223. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3223**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3223**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3224",
      "title": "Financial Modeling & Investment Valuation (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX3224",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3224. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3224**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3224**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
      "rawMemoryVsRendered": {
        "raw": "0.2485",
        "mask": "Percentage 2-Decimal",
        "rendered": "24.85%"
      },
      "expectedOutput": "| Metric | Calculated Formula | Output Display | Decision Rule |\n| ------ | ------------------ | -------------- | ------------- |\n| Net Present Value (XNPV) | =XNPV(0.12, C4:C15, B4:B15) | ₹ 18,45,210.50 | Accept Project (NPV > 0) |\n| Internal Rate of Return (XIRR) | =XIRR(C4:C15, B4:B15) | 24.85% | Exceeds Hurdle Rate (12%) |",
      "proTip": "Use XNPV and XIRR instead of standard NPV/IRR whenever cash flow dates are irregular or non-periodic. Standard NPV assumes strictly equal 365-day intervals!"
    },
    {
      "projectId": "EX3225",
      "title": "Financial Modeling & Investment Valuation (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX3225",
      "formula": "=XIRR(C4:C15, B4:B15)",
      "description": "As a Financial Modeling Analyst at AccoTax, you are evaluating an investment proposal on worksheet EX3225. Initial capital outlay of ₹ 50,00,000 occurs on 01-Jan-2026, followed by irregular cash inflows across 3 years. Your task is to calculate Net Present Value (XNPV) at a 12% discount rate and Internal Rate of Return (XIRR), and construct a dynamic debt amortization schedule in range F4:J36.",
      "requirements": [
        "Navigate to tab **EX3225**. Cash flow dates are in **B4:B15** and values in **C4:C15**.",
        "In cell **C17**, write '=XNPV(0.12, C4:C15, B4:B15)' to compute Net Present Value.",
        "In cell **C18**, write '=XIRR(C4:C15, B4:B15)' to compute exact annual return rate.",
        "In debt amortization table **F4:J36**, write '=PMT(rate/12, nper, -pv)' for monthly EMI.",
        "Format all financial outputs in Indian Rupee currency mask '₹ #,##,##0.00'."
      ],
      "stepByStep": "1. **Navigate to Sheet**: Open tab **EX3225**.\n2. **Calculate XNPV**: Click cell C17, type '=XNPV(0.12, C4:C15, B4:B15)' and press **Enter**.\n3. **Calculate XIRR**: Click cell C18, type '=XIRR(C4:C15, B4:B15)' and format cell as Percentage (**Ctrl + Shift + %**).\n4. **Build Amortization Schedule**: In cell H4, type '=PMT(10.5%/12, 36, -5000000)' for monthly loan installment.\n5. **Audit Checks**: Verify balance in row 36 reaches exactly ₹ 0.00.",
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
