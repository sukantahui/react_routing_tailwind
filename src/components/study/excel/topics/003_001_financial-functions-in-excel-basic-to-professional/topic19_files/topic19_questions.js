const questions = [
  {
    "question": "What are the three core financial statements in an integrated corporate model?",
    "options": [
      "Income Statement, Balance Sheet, Cash Flow Statement",
      "Trial Balance, P&L, Tax Return",
      "Budget, Ledger, Journal",
      "Revenue, Expense, Profit"
    ],
    "correctAnswer": 0,
    "explanation": "The 3 statements are Income Statement, Balance Sheet, and Cash Flow Statement."
  },
  {
    "question": "How does Net Income link from the Income Statement to the Balance Sheet?",
    "options": [
      "Flows into Retained Earnings (Retained Earnings = Beginning Retained Earnings + Net Income - Dividends)",
      "Directly into Cash",
      "Into Accounts Payable",
      "Into Common Stock"
    ],
    "correctAnswer": 0,
    "explanation": "Net income increases Retained Earnings in Shareholder Equity."
  },
  {
    "question": "What is the starting line item of the Cash Flow Statement under the indirect method?",
    "options": [
      "Net Income (from Income Statement)",
      "Gross Revenue",
      "Operating Cash",
      "Beginning Cash"
    ],
    "correctAnswer": 0,
    "explanation": "The indirect Cash Flow Statement starts with Net Income."
  },
  {
    "question": "How does Depreciation link between the Income Statement, Balance Sheet, and Cash Flow Statement?",
    "options": [
      "Expense on Income Statement, added back in Operating Cash Flow, increases Accumulated Depreciation on Balance Sheet",
      "Only on Balance Sheet",
      "Only on Cash Flow",
      "Subtracted in Financing Cash Flow"
    ],
    "correctAnswer": 0,
    "explanation": "Depreciation is non-cash: expensed in IS, added back in CFS, and offsets gross PP&E in BS."
  },
  {
    "question": "What happens to the Cash Flow Statement when Accounts Receivable increases by ₹50,000?",
    "options": [
      "Operating Cash Flow decreases by ₹50,000 (Cash tied up in unpaid invoices)",
      "Operating Cash Flow increases by ₹50,000",
      "No change",
      "Financing Cash Flow increases"
    ],
    "correctAnswer": 0,
    "explanation": "Increases in current assets represent cash outflows (uses of cash)."
  },
  {
    "question": "What happens to the Cash Flow Statement when Accounts Payable increases by ₹30,000?",
    "options": [
      "Operating Cash Flow increases by ₹30,000 (Cash retained by delaying supplier payment)",
      "Operating Cash Flow decreases",
      "No change",
      "Investing Cash Flow increases"
    ],
    "correctAnswer": 0,
    "explanation": "Increases in current liabilities represent cash inflows (sources of cash)."
  },
  {
    "question": "How does the ending cash balance on the Cash Flow Statement connect to the Balance Sheet?",
    "options": [
      "Directly populates the Cash & Cash Equivalents line item in Current Assets",
      "Populates Retained Earnings",
      "Populates Debt",
      "Populates Revenue"
    ],
    "correctAnswer": 0,
    "explanation": "Ending Cash on CFS flows into Cash on the Balance Sheet."
  },
  {
    "question": "What is the fundamental accounting equation that must balance on every period column?",
    "options": [
      "Total Assets = Total Liabilities + Total Shareholders' Equity",
      "Revenue = Expenses",
      "Cash = Debt",
      "Assets = Liabilities - Equity"
    ],
    "correctAnswer": 0,
    "explanation": "Assets must strictly equal Liabilities plus Shareholders' Equity."
  },
  {
    "question": "What creates a circular reference in an integrated 3-statement financial model?",
    "options": [
      "Interest expense depends on debt balance, which depends on cash flow, which depends on net income, which depends on interest expense",
      "Typing SUM(A1:A1)",
      "Dividing by zero",
      "Linking two sheets"
    ],
    "correctAnswer": 0,
    "explanation": "Interest depends on debt balance which depends on cash generation (circular loop)."
  },
  {
    "question": "How is circular interest resolution enabled in Excel Options?",
    "options": [
      "File -> Options -> Formulas -> Enable iterative calculation",
      "Enable macros",
      "Enable developer tab",
      "Press F9"
    ],
    "correctAnswer": 0,
    "explanation": "Iterative calculation allows Excel to converge circular dependency loops."
  },
  {
    "question": "What is the best-practice alternative to circular interest calculation in investment banking?",
    "options": [
      "Calculating interest on beginning debt balance (or average without circularity switch)",
      "Hardcoding numbers",
      "Deleting the debt schedule",
      "Using Goal Seek"
    ],
    "correctAnswer": 0,
    "explanation": "Using beginning debt balance prevents model instability without requiring iterative calculation."
  },
  {
    "question": "What is Net Working Capital (NWC)?",
    "options": [
      "Current Assets (excluding cash) minus Current Liabilities (excluding short-term debt)",
      "Total Assets - Total Debt",
      "Cash - Inventory",
      "Gross Profit"
    ],
    "correctAnswer": 0,
    "explanation": "Operating NWC = Operating Current Assets - Operating Current Liabilities."
  },
  {
    "question": "Where does Capital Expenditure (CapEx) appear in the 3-statement model?",
    "options": [
      "Cash outflow in Investing Activities on CFS, and increases Gross PP&E on Balance Sheet",
      "Operating expense on IS",
      "Financing cash flow",
      "Retained earnings"
    ],
    "correctAnswer": 0,
    "explanation": "CapEx is an investing cash outflow that capitalizes into PP&E."
  },
  {
    "question": "What is a 'Balance Check' formula in financial modeling?",
    "options": [
      "=ROUND(Total_Assets - (Total_Liabilities + Total_Equity), 2) === 0",
      "=SUM(Assets)",
      "=IF(Cash > 0, TRUE)",
      "=AVERAGE(Debt)"
    ],
    "correctAnswer": 0,
    "explanation": "A balance check verifies that Assets minus (Liabilities + Equity) equals exactly zero."
  },
  {
    "question": "How does issuing new equity shares affect the 3 statements?",
    "options": [
      "Cash inflow in Financing Activities on CFS, increases Cash and Common Stock on Balance Sheet",
      "Increases Revenue on IS",
      "Decreases Retained Earnings",
      "Increases CapEx"
    ],
    "correctAnswer": 0,
    "explanation": "Equity financing raises cash (Financing CFS) and increases Common Stock (BS)."
  },
  {
    "question": "How do dividend payments affect the statements?",
    "options": [
      "Cash outflow in Financing Activities on CFS, reduces Retained Earnings on Balance Sheet",
      "Operating expense on IS",
      "Increases Debt",
      "Increases Net Income"
    ],
    "correctAnswer": 0,
    "explanation": "Dividends reduce cash (Financing CFS) and reduce Retained Earnings."
  },
  {
    "question": "What is Free Cash Flow to Firm (FCFF)?",
    "options": [
      "EBIT*(1-t) + D&A - CapEx - Change_in_NWC",
      "Net Income - Dividends",
      "Gross Profit / Revenue",
      "Ending Cash - Beginning Cash"
    ],
    "correctAnswer": 0,
    "explanation": "FCFF measures cash available to all capital providers after operating and CapEx needs."
  },
  {
    "question": "What is the role of a Debt Schedule in a 3-statement model?",
    "options": [
      "Tracks principal repayments, new borrowings, interest expense, and mandatory debt amortization",
      "Tracks customer invoices",
      "Computes payroll taxes",
      "Designs charts"
    ],
    "correctAnswer": 0,
    "explanation": "The Debt Schedule models borrowing, amortization, and interest expense."
  },
  {
    "question": "What is the role of a PP&E / Fixed Asset Schedule?",
    "options": [
      "Tracks Beginning PP&E + CapEx - Depreciation - Disposals = Ending PP&E",
      "Tracks inventory turnover",
      "Tracks sales commissions",
      "Computes marketing spend"
    ],
    "correctAnswer": 0,
    "explanation": "Rolls forward gross asset base, additions, depreciation, and net book value."
  },
  {
    "question": "If inventory increases by ₹20,000, what is the cash impact?",
    "options": [
      "-₹20,000 (Cash outflow in operating activities)",
      "+₹20,000 cash inflow",
      "Zero cash impact",
      "+₹20,000 revenue"
    ],
    "correctAnswer": 0,
    "explanation": "Purchasing inventory consumes cash (-₹20,000)."
  },
  {
    "question": "Why do financial analysts never hardcode ending cash on the Balance Sheet?",
    "options": [
      "Ending cash must dynamically balance the entire model via Cash Flow Statement reconciliation",
      "Excel does not allow numbers",
      "It disables colors",
      "To avoid tax"
    ],
    "correctAnswer": 0,
    "explanation": "Cash is the balancing result of all operating, investing, and financing cash flows."
  },
  {
    "question": "What does an unbalanced model (Assets != Liabilities + Equity) signify?",
    "options": [
      "A broken link or double-counted cash flow item in the model logic",
      "A normal corporate condition",
      "A rounding error of ₹10,00,000",
      "A high stock price"
    ],
    "correctAnswer": 0,
    "explanation": "An imbalance indicates a structural formula link error."
  },
  {
    "question": "What is EBITDA?",
    "options": [
      "Earnings Before Interest, Taxes, Depreciation, and Amortization",
      "Equity Balance in Total Debt Accounts",
      "Estimated Budget In Target Accounts",
      "Effective Business Tax Rate"
    ],
    "correctAnswer": 0,
    "explanation": "EBITDA is an operational cash profitability metric."
  },
  {
    "question": "In corporate consulting at Coder & AccoTax Barrackpore, how are multi-year revenue projections built?",
    "options": [
      "Volume Drivers * Unit Price Drivers with inflation assumptions",
      "Random numbers",
      "Hardcoding last year * 2",
      "SUM(A1:A100)"
    ],
    "correctAnswer": 0,
    "explanation": "Revenue is modeled from underlying operational drivers (volume * pricing)."
  },
  {
    "question": "What is a Circularity Breaker Switch in financial modeling?",
    "options": [
      "A Boolean cell (1/0) that toggles interest calculation between Average Debt and Beginning Debt to clear errors",
      "A circuit breaker in the wall",
      "A VBA kill command",
      "A delete button"
    ],
    "correctAnswer": 0,
    "explanation": "A circularity breaker resets circular reference errors instantly."
  },
  {
    "question": "Where does Principal Debt Repayment appear on the Cash Flow Statement?",
    "options": [
      "Financing Activities (Cash outflow)",
      "Operating Activities",
      "Investing Activities",
      "Revenue"
    ],
    "correctAnswer": 0,
    "explanation": "Repaying loan principal is a financing cash outflow."
  },
  {
    "question": "Where does Interest Expense appear on the Cash Flow Statement (indirect US GAAP)?",
    "options": [
      "Captured within Net Income in Operating Activities, with gross interest disclosed in notes",
      "Investing Activities",
      "Financing Activities",
      "Retained Earnings"
    ],
    "correctAnswer": 0,
    "explanation": "Interest expense reduces Net Income, which starts Operating Activities."
  },
  {
    "question": "What is the primary indicator of corporate solvency in a 3-statement model?",
    "options": [
      "Positive sustainable Operating Cash Flow and manageable Debt/EBITDA leverage",
      "Having many employees",
      "Large gross revenue only",
      "High office rent"
    ],
    "correctAnswer": 0,
    "explanation": "Operating cash flow health and manageable debt leverage indicate solvency."
  },
  {
    "question": "How does a deferred tax liability increase affect cash flow?",
    "options": [
      "Positive adjustment to Operating Cash Flow (taxes expensed on IS but deferred in cash)",
      "Negative cash flow",
      "No impact",
      "Financing outflow"
    ],
    "correctAnswer": 0,
    "explanation": "Deferred taxes represent taxes expensed but not yet paid in cash (source of cash)."
  },
  {
    "question": "Why is the 3-statement model the ultimate test of financial spreadsheet mastery?",
    "options": [
      "It requires mastery of accounting theory, formula linkages, dynamic schedules, and circular error resolution",
      "It uses many colors",
      "It has 100 pages",
      "It uses VBA only"
    ],
    "correctAnswer": 0,
    "explanation": "It unifies accounting principles, mathematical modeling, dynamic linkage, and audit integrity."
  }
];

export default questions;
