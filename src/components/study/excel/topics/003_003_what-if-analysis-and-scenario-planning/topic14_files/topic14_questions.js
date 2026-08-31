const questions = [
  {
    "question": "What is a Tornado Chart in financial and risk analysis?",
    "options": [
      "A specialized stacked bar chart that ranks sensitivity variables by magnitude of impact on project NPV/EBITDA",
      "A weather map",
      "A circular radar chart",
      "A 3D surface plot"
    ],
    "correctAnswer": 0,
    "explanation": "Tornado charts rank input variables from largest to smallest impact."
  },
  {
    "question": "Why is it called a 'Tornado' chart?",
    "options": [
      "The horizontal bars widen from bottom to top, creating a funnel/tornado shape",
      "It measures storm damage",
      "It rotates dynamically",
      "It is created in Python only"
    ],
    "correctAnswer": 0,
    "explanation": "Sorting variables from highest variance to lowest produces a visual funnel."
  },
  {
    "question": "What is the core purpose of Sensitivity Analysis in corporate capital budgeting?",
    "options": [
      "To identify which input variables have the greatest impact on project profitability and risk",
      "To format cells nicely",
      "To eliminate all costs",
      "To speed up printing"
    ],
    "correctAnswer": 0,
    "explanation": "Identifies key value drivers and vulnerabilities in financial models."
  },
  {
    "question": "In a Two-Way Data Table, where must the model formula reference be placed?",
    "options": [
      "In the top-left corner cell of the table matrix",
      "In the center cell",
      "Outside the sheet",
      "In row 1 only"
    ],
    "correctAnswer": 0,
    "explanation": "The top-left corner cell links the formula to be simulated across row and column inputs."
  },
  {
    "question": "What is the difference between One-Way and Two-Way Data Tables?",
    "options": [
      "One-Way tests 1 variable with multiple output metrics; Two-Way tests 2 variables across 1 output metric",
      "One-Way is faster only",
      "Two-Way cannot handle numbers",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "One-Way tests 1 input across many metrics; Two-Way tests 2 inputs across 1 metric."
  },
  {
    "question": "How do you test a +/- 20% swing on Unit Price, Cost of Goods, and Volume in a Tornado analysis?",
    "options": [
      "Run low and high test cases for each variable while keeping others at baseline",
      "Change all inputs simultaneously",
      "Delete all inputs",
      "Use Goal Seek"
    ],
    "correctAnswer": 0,
    "explanation": "Tornado analysis tests individual input swings ceteris paribus (all else equal)."
  },
  {
    "question": "What chart type in Excel is customized to build a Tornado Diagram?",
    "options": [
      "Stacked Bar Chart or Clustered Bar Chart with centered vertical axis",
      "Line Chart",
      "Donut Chart",
      "Treemap"
    ],
    "correctAnswer": 0,
    "explanation": "A clustered or stacked horizontal bar chart with axis labels centered or offset."
  },
  {
    "question": "What does the baseline vertical axis in a Tornado chart represent?",
    "options": [
      "The Base Case project NPV or output value",
      "Zero",
      "100%",
      "Target date"
    ],
    "correctAnswer": 0,
    "explanation": "The vertical axis marks the Base Case expected value."
  },
  {
    "question": "If a 10% change in Selling Price swings NPV by ₹5,00,000, but a 10% change in Rent swings NPV by ₹20,000, which sits at the top of the Tornado chart?",
    "options": [
      "Selling Price (higher variance impact)",
      "Rent",
      "Neither",
      "Both at bottom"
    ],
    "correctAnswer": 0,
    "explanation": "The largest swing variable is positioned at the top."
  },
  {
    "question": "What shortcut recalculates Excel Data Tables without recalculating the entire heavy workbook?",
    "options": [
      "File → Options → Formulas → Calculation options: 'Automatic except for data tables' (Press F9 to update)",
      "Alt+F4",
      "Ctrl+Z",
      "Shift+Delete"
    ],
    "correctAnswer": 0,
    "explanation": "'Automatic except for data tables' speeds up workbook response."
  },
  {
    "question": "What error occurs if you try to edit or delete an individual cell inside a Data Table output range?",
    "options": [
      "\"Cannot change part of a data table\"",
      "#REF!",
      "#VALUE!",
      "Excel crashes"
    ],
    "correctAnswer": 0,
    "explanation": "Data Tables are atomic array ranges that cannot be edited piecemeal."
  },
  {
    "question": "How do you delete an entire Data Table?",
    "options": [
      "Select the entire table output range and press Delete",
      "Delete cell A1 only",
      "Clear format only",
      "Rename sheet"
    ],
    "correctAnswer": 0,
    "explanation": "The full table array range must be selected to clear it."
  },
  {
    "question": "How does Scenario Manager differ from Sensitivity Analysis?",
    "options": [
      "Scenario Manager evaluates discrete combinations of multiple variables (Best, Base, Worst case); Sensitivity analyzes individual variable sensitivity ranges",
      "Scenario Manager only handles text",
      "Sensitivity uses VBA only",
      "They are identical"
    ],
    "correctAnswer": 0,
    "explanation": "Scenario Manager tests discrete multi-variable cases; sensitivity tests continuous ranges."
  },
  {
    "question": "What is Monte Carlo Simulation compared to Sensitivity Analysis?",
    "options": [
      "Monte Carlo runs thousands of probabilistic random iterations across all input probability distributions simultaneously",
      "Monte Carlo is 1 table",
      "Monte Carlo is for weather",
      "Monte Carlo has no math"
    ],
    "correctAnswer": 0,
    "explanation": "Monte Carlo simulates probability distributions across thousands of trials."
  },
  {
    "question": "How can dynamic conditional formatting heat maps be added to a Two-Way Data Table?",
    "options": [
      "Apply Color Scales (Green-Yellow-Red) to highlight high vs low NPV outcomes",
      "Manually color cells",
      "Use borders only",
      "Change font size"
    ],
    "correctAnswer": 0,
    "explanation": "Color scales provide instant visual intuition of breakeven frontiers."
  },
  {
    "question": "What does the Breakeven Frontier represent in a Two-Way Sensitivity Table?",
    "options": [
      "The boundary curve where NPV = 0 or Profit = 0 across the two variables",
      "Maximum profit",
      "Minimum tax",
      "Table borders"
    ],
    "correctAnswer": 0,
    "explanation": "The frontier separates profitable combinations from loss-making ones."
  },
  {
    "question": "In Barrackpore real estate development models, which two variables are most commonly paired in a Two-Way Table?",
    "options": [
      "Sale Price per Sq. Ft. vs Construction Cost per Sq. Ft.",
      "Office paint color vs desk count",
      "Student name vs date",
      "Phone number vs email"
    ],
    "correctAnswer": 0,
    "explanation": "Sale price vs construction cost drives real estate project feasibility."
  },
  {
    "question": "Why is a Tornado chart valuable in executive board presentations?",
    "options": [
      "It immediately communicates which 2 or 3 risk factors require active hedging or management focus",
      "It looks like a storm",
      "It hides negative numbers",
      "It takes up space"
    ],
    "correctAnswer": 0,
    "explanation": "Directs executive attention to the critical 20% of variables driving 80% of risk."
  },
  {
    "question": "What formula dynamically computes the spread (High Case - Low Case) for sorting Tornado rows?",
    "options": [
      "=ABS(High_Value - Low_Value)",
      "=SUM(High, Low)",
      "=AVERAGE(High, Low)",
      "=MAX(High)"
    ],
    "correctAnswer": 0,
    "explanation": "Spread magnitude determines the vertical ranking order."
  },
  {
    "question": "How can modern dynamic arrays sort sensitivity variables for a Tornado chart automatically?",
    "options": [
      "=SORTBY(variable_names, spreads, -1)",
      "=FILTER(variable_names, 1)",
      "=UNIQUE()",
      "=SEQUENCE()"
    ],
    "correctAnswer": 0,
    "explanation": "SORTBY sorts variables dynamically in descending order of spread."
  },
  {
    "question": "What is a 'Spider Chart' alternative to Tornado diagrams?",
    "options": [
      "A radar or line plot showing percentage curve responses for each input variable",
      "A circle chart",
      "A box plot",
      "A waterfall"
    ],
    "correctAnswer": 0,
    "explanation": "Spider charts show curve slopes for each variable."
  },
  {
    "question": "Can a Two-Way Data Table reference inputs located on different worksheets?",
    "options": [
      "The row and column input cells must be on the same sheet or referenced via workbook names",
      "No, never",
      "Only in CSV",
      "Only with macros"
    ],
    "correctAnswer": 0,
    "explanation": "Data tables can reference workbook inputs across sheets."
  },
  {
    "question": "What is the impact of high fixed costs in sensitivity analysis?",
    "options": [
      "Increases operating leverage, making EBIT highly sensitive to volume swings",
      "Reduces risk",
      "Eliminates variance",
      "Fixes profit"
    ],
    "correctAnswer": 0,
    "explanation": "High operating leverage amplifies profit sensitivity to revenue changes."
  },
  {
    "question": "What does a horizontal bar extending far to the left of the base axis in a Tornado chart indicate?",
    "options": [
      "Severe downside risk under adverse conditions for that variable",
      "High profit",
      "Zero risk",
      "Tax credit"
    ],
    "correctAnswer": 0,
    "explanation": "Long leftward bars indicate significant downside vulnerability."
  },
  {
    "question": "What does a horizontal bar extending far to the right indicate?",
    "options": [
      "Significant upside potential under favorable conditions",
      "Loss",
      "Error",
      "Audit failure"
    ],
    "correctAnswer": 0,
    "explanation": "Rightward bars illustrate upside potential."
  },
  {
    "question": "Why should analysts test asymmetric percentage swings (e.g. +10% / -20%) when justified by historical volatility?",
    "options": [
      "Real-world market risks are often skewed and asymmetric",
      "To make the chart uneven",
      "Excel requires asymmetric inputs",
      "To avoid division by zero"
    ],
    "correctAnswer": 0,
    "explanation": "Downside risks often exceed upside volatility in real economies."
  },
  {
    "question": "How to simulate 1,000 trials of a Two-Way Table with random numbers?",
    "options": [
      "Feed RANDARRAY() into the model inputs and record with Data Table iterations",
      "Type random numbers",
      "Press F5",
      "Use AutoSum"
    ],
    "correctAnswer": 0,
    "explanation": "Data tables can iterate random seed trials to generate empirical distributions."
  },
  {
    "question": "What is the primary limitation of standard one-variable-at-a-time (OVAT) sensitivity analysis?",
    "options": [
      "It ignores correlations and simultaneous interactions between multiple input variables",
      "It is too complex",
      "It requires Python",
      "It only handles integers"
    ],
    "correctAnswer": 0,
    "explanation": "OVAT assumes independence; real inputs often move together."
  },
  {
    "question": "How do you format a Two-Way Data Table top-left corner cell so the formula is invisible but active?",
    "options": [
      "Custom number format ;;; or matching font color to background fill",
      "Delete the cell",
      "Hide column",
      "Lock sheet"
    ],
    "correctAnswer": 0,
    "explanation": "Custom format ;;; hides cell text while preserving formula evaluation."
  },
  {
    "question": "Why is Sensitivity Analysis mandatory in corporate financial models mentored by Sukanta Hui?",
    "options": [
      "A single point estimate is always wrong; understanding sensitivity ranges enables robust risk management",
      "To make models longer",
      "To use more memory",
      "Because Excel requires it"
    ],
    "correctAnswer": 0,
    "explanation": "Point forecasts are uncertain; understanding sensitivities prepares leadership for volatility."
  }
];

export default questions;
