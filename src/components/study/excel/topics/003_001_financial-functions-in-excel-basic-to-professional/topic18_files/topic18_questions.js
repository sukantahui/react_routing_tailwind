const questions = [
  {
    "question": "What does VDB stand for in Excel financial functions?",
    "options": [
      "Variable Declining Balance",
      "Verified Depreciation Book",
      "Vector Debt Balance",
      "Valuation Discount Bound"
    ],
    "correctAnswer": 0,
    "explanation": "VDB stands for Variable Declining Balance."
  },
  {
    "question": "What is the key advantage of VDB over DDB and DB?",
    "options": [
      "Allows calculating depreciation for arbitrary/partial periods and automatically switches to straight-line when optimal",
      "Only handles vehicles",
      "Disables salvage value",
      "Rounds to integer"
    ],
    "correctAnswer": 0,
    "explanation": "VDB supports fractional periods and optimal straight-line crossover."
  },
  {
    "question": "What does the default factor argument (value 2) specify in VDB?",
    "options": [
      "Double-declining balance (200% acceleration)",
      "Straight-line (100%)",
      "150% declining balance",
      "Triple declining balance"
    ],
    "correctAnswer": 0,
    "explanation": "Factor 2 specifies double declining balance depreciation."
  },
  {
    "question": "What does setting no_switch = TRUE in VDB enforce?",
    "options": [
      "Prevents switching to straight-line depreciation even when straight-line is greater",
      "Forces straight line",
      "Disables salvage value",
      "Returns #N/A"
    ],
    "correctAnswer": 0,
    "explanation": "no_switch = TRUE keeps declining balance without straight-line crossover."
  },
  {
    "question": "How do you calculate depreciation for the first 6 months of an asset with 5-year life?",
    "options": [
      "=VDB(cost, salvage, 5, 0, 0.5)",
      "=VDB(cost, salvage, 5, 1, 6)",
      "=DDB(cost, salvage, 5, 0.5)",
      "=SLN(cost, salvage, 5)/2"
    ],
    "correctAnswer": 0,
    "explanation": "Start period 0 and end period 0.5 calculates the first half year."
  },
  {
    "question": "What happens when an asset's declining balance depreciation drops below straight-line remaining depreciation?",
    "options": [
      "VDB automatically switches to straight-line (if no_switch=FALSE) to fully amortize the asset",
      "Excel produces #NUM!",
      "Depreciation stops",
      "Asset is written off to 0"
    ],
    "correctAnswer": 0,
    "explanation": "VDB switches to straight-line to ensure full depreciation to salvage value."
  },
  {
    "question": "What does cost represent in VDB?",
    "options": [
      "Initial acquisition cost of the asset",
      "Current market value",
      "Scrap value",
      "Annual maintenance"
    ],
    "correctAnswer": 0,
    "explanation": "Cost is the initial purchase price of the capital asset."
  },
  {
    "question": "What does salvage represent in VDB?",
    "options": [
      "Residual value of the asset at the end of its useful life",
      "Initial purchase price",
      "Total accumulated tax",
      "Repair cost"
    ],
    "correctAnswer": 0,
    "explanation": "Salvage is the estimated terminal scrap value."
  },
  {
    "question": "What does life represent in VDB?",
    "options": [
      "Total number of periods over which the asset is depreciated",
      "Asset warranty",
      "Company age",
      "Current year"
    ],
    "correctAnswer": 0,
    "explanation": "Life is the total useful lifespan in periods."
  },
  {
    "question": "Which Indian Companies Act depreciation schedules can be modeled with VDB?",
    "options": [
      "Written Down Value (WDV) method with partial financial year additions",
      "Only cash accounting",
      "LIFO inventory",
      "GST tax credits"
    ],
    "correctAnswer": 0,
    "explanation": "WDV with partial year asset additions is modeled using VDB."
  },
  {
    "question": "How do you compute total depreciation from Year 2 to Year 4 in one formula?",
    "options": [
      "=VDB(cost, salvage, life, 1, 4)",
      "=SUM(VDB(..., 1), VDB(..., 4))",
      "=VDB(cost, salvage, life, 2, 4)",
      "=DDB(...) * 3"
    ],
    "correctAnswer": 0,
    "explanation": "start_period 1 to end_period 4 sums depreciation over years 2, 3, and 4."
  },
  {
    "question": "What error occurs if start_period > end_period in VDB?",
    "options": [
      "#NUM!",
      "#VALUE!",
      "#N/A",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Invalid period sequence produces #NUM! error."
  },
  {
    "question": "What error occurs if cost or salvage is negative in VDB?",
    "options": [
      "#NUM!",
      "#VALUE!",
      "#N/A",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Negative values produce #NUM!."
  },
  {
    "question": "What is 150% declining balance modeled as in VDB?",
    "options": [
      "factor = 1.5",
      "factor = 150",
      "factor = 0.15",
      "factor = 1"
    ],
    "correctAnswer": 0,
    "explanation": "factor 1.5 models 150% declining balance."
  },
  {
    "question": "How do you calculate monthly depreciation using VDB for Year 1 Month 1 (where life is in years)?",
    "options": [
      "=VDB(cost, salvage, life*12, 0, 1)",
      "=VDB(cost, salvage, life, 0, 1)",
      "=SLN(cost, salvage, 12)",
      "=DDB(cost, salvage, 12, 1)"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplying life by 12 sets the unit to months."
  },
  {
    "question": "Does VDB ever depreciate an asset below its salvage value?",
    "options": [
      "No, it strictly caps accumulated depreciation at (cost - salvage)",
      "Yes, if no_switch=TRUE",
      "Only with factor 3",
      "Yes, in year 1"
    ],
    "correctAnswer": 0,
    "explanation": "VDB never depreciates below salvage value."
  },
  {
    "question": "Why do corporate financial modelers use VDB for tax shield calculations?",
    "options": [
      "Accelerated early depreciation maximizes present value of tax shields (MACRS)",
      "It eliminates taxes",
      "It creates interest income",
      "It is required by IRS only"
    ],
    "correctAnswer": 0,
    "explanation": "Accelerated depreciation maximizes tax shield present value."
  },
  {
    "question": "How to generate a complete depreciation schedule across 10 years dynamically in Excel 365?",
    "options": [
      "=MAP(SEQUENCE(10), LAMBDA(y, VDB(cost, salvage, 10, y-1, y)))",
      "=VDB(cost, salvage, 10, SEQUENCE(10))",
      "=DDB(all)",
      "=SLN(10)"
    ],
    "correctAnswer": 0,
    "explanation": "MAP with SEQUENCE(10) generates the full schedule dynamically."
  },
  {
    "question": "What is the Book Value at the end of period t?",
    "options": [
      "Cost minus Cumulative VDB depreciation up to period t",
      "Salvage value",
      "Market price",
      "Current cash balance"
    ],
    "correctAnswer": 0,
    "explanation": "Book Value = Initial Cost - Cumulative Depreciation."
  },
  {
    "question": "How does VDB handle assets purchased on October 1st in a calendar fiscal year?",
    "options": [
      "start_period = 0, end_period = 0.25 (3 months / 12 months)",
      "start_period = 1",
      "Cannot be done",
      "start_period = 0.5"
    ],
    "correctAnswer": 0,
    "explanation": "Oct-Dec is 3/12 = 0.25 years."
  },
  {
    "question": "What does factor = 1 represent in VDB?",
    "options": [
      "100% declining balance (Straight-line rate declining)",
      "Double declining",
      "Zero depreciation",
      "MACRS 200%"
    ],
    "correctAnswer": 0,
    "explanation": "Factor 1 is 100% declining balance rate."
  },
  {
    "question": "What happens if salvage value is set to 0 in VDB?",
    "options": [
      "Asset is fully depreciated to 0 over its life",
      "Returns #DIV/0!",
      "Returns #NUM!",
      "Defaults to 10%"
    ],
    "correctAnswer": 0,
    "explanation": "Asset amortizes completely to 0."
  },
  {
    "question": "In Barrackpore manufacturing units, why use VDB for CNC machinery?",
    "options": [
      "Machinery incurs heavy early wear and high initial productivity",
      "To inflate profits",
      "Because CNC machines don't wear",
      "To avoid audits"
    ],
    "correctAnswer": 0,
    "explanation": "Reflects real economic machine degradation and tax benefits."
  },
  {
    "question": "What is the straight-line depreciation function in Excel?",
    "options": [
      "SLN()",
      "DDB()",
      "DB()",
      "SYD()"
    ],
    "correctAnswer": 0,
    "explanation": "SLN calculates straight-line depreciation."
  },
  {
    "question": "What is the sum-of-years' digits depreciation function in Excel?",
    "options": [
      "SYD()",
      "SLN()",
      "VDB()",
      "AMORLINC()"
    ],
    "correctAnswer": 0,
    "explanation": "SYD computes sum-of-years' digits amortization."
  },
  {
    "question": "Can start_period and end_period be fractional (e.g. 1.25 to 2.75)?",
    "options": [
      "Yes, VDB natively integrates fractional periods",
      "No, integers only",
      "Only halves",
      "Only with VBA"
    ],
    "correctAnswer": 0,
    "explanation": "VDB handles exact continuous fractional intervals."
  },
  {
    "question": "What is the effect of straight-line crossover on later years?",
    "options": [
      "Prevents depreciation from asymptotically tapering to tiny negligible fractions",
      "Increases taxes",
      "Causes errors",
      "Extends asset life"
    ],
    "correctAnswer": 0,
    "explanation": "Ensures the asset reaches scrap value smoothly."
  },
  {
    "question": "If an asset cost is ₹1,00,000, salvage is ₹10,000, life is 5 years, what is total VDB over 0 to 5?",
    "options": [
      "₹90,000",
      "₹1,00,000",
      "₹10,000",
      "₹50,000"
    ],
    "correctAnswer": 0,
    "explanation": "Total depreciation = Cost - Salvage = ₹90,000."
  },
  {
    "question": "How does VDB differ from DB?",
    "options": [
      "DB uses fixed-rate declining balance (asset life formula); VDB uses factor-based declining balance with crossover",
      "DB handles months, VDB does not",
      "VDB is deprecated",
      "DB is only for real estate"
    ],
    "correctAnswer": 0,
    "explanation": "DB uses fixed declining balance; VDB uses accelerated factor with crossover."
  },
  {
    "question": "Why is VDB considered the most versatile depreciation tool in corporate finance?",
    "options": [
      "It unifies DDB, straight-line, fractional periods, and multi-period aggregation in one function",
      "It connects to bank accounts",
      "It requires no inputs",
      "It calculates interest"
    ],
    "correctAnswer": 0,
    "explanation": "VDB unifies all declining balance and straight-line mechanics with partial-period flexibility."
  }
];

export default questions;
