// topic8_questions.js - 30 Comprehensive Assessment & Quiz Questions
// Topic 8: Quick Check Quiz & Module Assessment: Basic Charts and Visualizations
// Module: 001_004_basic-charts-and-visualizations

const questions = [
  {
    question: "What is the fundamental difference between a Column Chart and a Bar Chart in Excel?",
    shortAnswer: "Column charts use vertical rectangles (ideal for time series and few categories); Bar charts use horizontal rectangles (ideal for long text labels and ranking).",
    explanation: "Horizontal bar charts provide ample horizontal space to display lengthy branch or product names without diagonal label tilt.",
    hint: "Column = Vertical; Bar = Horizontal (ideal for long category labels).",
    level: "basic",
    codeExample: "Column Chart: Time series | Bar Chart: Long category label ranking"
  },
  {
    question: "Which keyboard shortcut creates an embedded chart on the active worksheet instantly?",
    shortAnswer: "Alt + F1",
    explanation: "Pressing Alt+F1 inserts a default clustered column chart on the active sheet; F11 creates a chart in a new dedicated chart sheet.",
    hint: "Alt + F1 for active sheet; F11 for a dedicated chart sheet.",
    level: "basic",
    codeExample: "Alt + F1 (Active Sheet) vs F11 (Dedicated Chart Sheet)"
  },
  {
    question: "Why is a Line Chart preferable to a Scatter Plot for plotting monthly revenue?",
    shortAnswer: "Because monthly time intervals are uniform discrete categories; scatter plots are meant for plotting continuous numeric (X, Y) relationships.",
    explanation: "Line charts treat the X-axis as evenly spaced intervals, whereas scatter plots position points based on numerical X coordinate values.",
    hint: "Line charts are for uniform time intervals; scatter plots are for numeric correlation.",
    level: "moderate",
    codeExample: "Line: Month vs Revenue | Scatter: Advertising Spend vs Sales"
  },
  {
    question: "What happens if a pie chart contains 15 categorical slices?",
    shortAnswer: "It becomes illegible: slice angles become too small to compare, data labels overlap, and viewer cognitive load surges.",
    explanation: "Human perception cannot accurately gauge small angular variations; limit pie charts to 5 slices or use a horizontal bar chart.",
    hint: "Avoid pie charts with > 5 slices; switch to horizontal bar charts.",
    level: "basic",
    codeExample: "Rule: Max 5-6 slices in a Pie/Doughnut visual."
  },
  {
    question: "How do you plot metrics with vast scale differences (e.g. Sales in Lakhs vs Margin %) on one chart?",
    shortAnswer: "Use a Combo Chart and assign the smaller metric (Margin %) to a Secondary Vertical Axis.",
    explanation: "A secondary vertical axis provides an independent right-hand scale, preventing percentage values from flattening at zero.",
    hint: "Assign Margin % to a Secondary Axis in Combo Chart settings.",
    level: "moderate",
    codeExample: "Primary Axis: Sales (₹) | Secondary Axis: Margin (%)"
  },
  {
    question: "What are Sparklines and where are they rendered in Excel?",
    shortAnswer: "Sparklines are miniature in-cell trendline charts rendered directly inside standard worksheet cells.",
    explanation: "Introduced by Edward Tufte, sparklines provide quick historical trajectory context right alongside tabular row numbers.",
    hint: "Sparklines live inside individual spreadsheet cells.",
    level: "basic",
    codeExample: "Insert → Sparklines → Line (Location: $O$2)"
  },
  {
    question: "Why should you never truncate the vertical axis on a Column or Bar chart?",
    shortAnswer: "Because the visual height of a bar represents absolute magnitude; truncating the baseline exaggerates minor differences misleadingly.",
    explanation: "Starting an axis at 50,000 when values are 52,000 and 54,000 makes a 4% difference look like a 200% difference.",
    hint: "Column and bar visual encodings require a zero baseline.",
    level: "basic",
    codeExample: "Format Axis → Minimum Bound = 0"
  },
  {
    question: "When is it acceptable to start the vertical axis above zero?",
    shortAnswer: "In Line Charts and Scatter Plots that focus on tracking fine variance and trajectory over time rather than total mass.",
    explanation: "Line charts encode data via positional coordinates rather than bar height, making non-zero baselines permissible to observe subtle fluctuations.",
    hint: "Line charts can focus on variance using zoomed vertical bounds.",
    level: "moderate",
    codeExample: "Line chart tracking body temperature (97°F - 104°F)"
  },
  {
    question: "How do you link a chart title to an Excel cell dynamically?",
    shortAnswer: "Select the Chart Title → Click inside the Formula Bar → Type `='Sheet1'!$A$1` → Press Enter.",
    explanation: "Cell-linked titles automatically update when slicers or dynamic formula values change.",
    hint: "Select title box, click formula bar, type =, and reference the cell.",
    level: "moderate",
    codeExample: "=Topic8_Charts_Assessment!$B$2"
  },
  {
    question: "What is 'Chart Junk' according to information design principles?",
    shortAnswer: "Visual elements that do not convey information, such as 3D tilts, dark background fills, decorative textures, and thick heavy borders.",
    explanation: "Edward Tufte coined the term to emphasize maximizing the 'Data-Ink Ratio'.",
    hint: "Unnecessary visual clutter that distracts from the core data.",
    level: "basic",
    codeExample: "Chart Junk = 3D Shadows + Heavy Grids + Loud Backgrounds"
  },
  {
    question: "How do you add a moving average trendline to smooth noisy time-series data?",
    shortAnswer: "Select the series → Click '+' (Chart Elements) → Trendline → Moving Average → Set Period (e.g. 3 or 7).",
    explanation: "Moving average trendlines filter short-term fluctuations to reveal underlying cyclical or seasonal trajectory.",
    hint: "Add Chart Element → Trendline → Moving Average.",
    level: "moderate",
    codeExample: "Trendline → Moving Average (Period = 3)"
  },
  {
    question: "What is the primary benefit of converting raw data to an Excel Table (Ctrl+T) before creating charts?",
    shortAnswer: "Newly added rows automatically expand the chart's data series without needing to manually edit the source range.",
    explanation: "Structured tables dynamically update series ranges when rows or columns are inserted.",
    hint: "Structured tables automatically expand connected chart series.",
    level: "basic",
    codeExample: "Ctrl + T → Create Table → Insert Chart"
  },
  {
    question: "How do you prevent chart objects from stretching when resizing worksheet columns?",
    shortAnswer: "Right-click Chart → Format Chart Area → Size & Properties → Select 'Don't move or size with cells' or 'Move but don't size with cells'.",
    explanation: "Prevents distortion of carefully formatted dashboard visuals when neighboring cells are adjusted.",
    hint: "Format Chart Area → Properties → Don't move or size with cells.",
    level: "moderate",
    codeExample: "Format Chart Area → Properties → Don't move or size with cells"
  },
  {
    question: "How do you magnetically snap chart borders to worksheet gridlines?",
    shortAnswer: "Hold the `Alt` key while dragging or resizing the chart edges.",
    explanation: "The Alt key activates grid-snapping for precision alignment.",
    hint: "Hold Alt while dragging chart borders.",
    level: "basic",
    codeExample: "Hold ALT + Drag"
  },
  {
    question: "What is a Doughnut Chart and how does it compare to a Pie Chart?",
    shortAnswer: "A doughnut chart has a hollow center that can hold summary KPI callouts, reducing visual mass and improving focus on slice arc lengths.",
    explanation: "Doughnut charts use center space efficiently for total values while displaying part-to-whole proportions.",
    hint: "Doughnut charts feature a hollow center for summary labels.",
    level: "basic",
    codeExample: "Doughnut Hole Size = 65%"
  },
  {
    question: "How do you copy visual formatting from one chart to another in 1 second?",
    shortAnswer: "Copy the formatted chart (`Ctrl+C`), select the target chart, and use Paste Special Formats (`Alt+E+S → Formats`).",
    explanation: "Transfers palettes, fonts, gridlines, and border styles across charts seamlessly.",
    hint: "Ctrl+C on formatted chart → Select target → Alt+E+S → Formats.",
    level: "moderate",
    codeExample: "Ctrl+C → Select Target → Alt+E+S → Formats"
  },
  {
    question: "What is an Area Chart and when should it be avoided?",
    shortAnswer: "An area chart is a line chart with shaded regions below; avoid when overlapping unstacked series obscure each other.",
    explanation: "Unstacked 2D area charts create solid colored fills that hide downstream series behind front layers.",
    hint: "Use Stacked Area for cumulative totals; avoid unstacked area with many series.",
    level: "moderate",
    codeExample: "Stacked Area Chart: Tracking Cumulative Multi-Product Revenue"
  },
  {
    question: "How do you format data labels to display values in thousands ('K') or millions ('M')?",
    shortAnswer: "Apply custom number formats to the data labels: `$#,##0.0,\" K\"` or `$#,##0.0,,\" M\"`.",
    explanation: "Comma scaling at the end of custom number format codes divides the displayed value by 1,000 or 1,000,000.",
    hint: "Use trailing commas in custom formats for K and M scaling.",
    level: "advanced",
    codeExample: "$#,##0.0,,\" M\" (Displays 5,400,000 as $5.4 M)"
  },
  {
    question: "Why is a Waterfall Chart used in financial analysis?",
    shortAnswer: "It visually bridges starting revenue to ending net profit by displaying sequential positive additions and negative expenses.",
    explanation: "Highlights how intermediate debits and credits contribute to final net income.",
    hint: "Waterfall charts show cumulative step-by-step additions and deductions.",
    level: "moderate",
    codeExample: "Insert → Waterfall Chart → Set intermediate columns as Total"
  },
  {
    question: "How do you filter specific series in a chart without altering the underlying grid table?",
    shortAnswer: "Click the Chart Filters funnel icon next to the chart → Uncheck unwanted series or categories → Apply.",
    explanation: "Chart filters dynamically isolate specific categories on the fly without hiding table rows.",
    hint: "Use the funnel icon on the top-right corner of the chart.",
    level: "basic",
    codeExample: "Chart Filters (Funnel Icon) → Uncheck Series → Apply"
  },
  {
    question: "What is the purpose of adding Error Bars to a column or scatter chart?",
    shortAnswer: "To communicate statistical uncertainty, standard deviation, or experimental margin of error visually.",
    explanation: "Error bars show confidence intervals or measurement tolerances around data points.",
    hint: "Error bars visualize statistical variance and uncertainty.",
    level: "advanced",
    codeExample: "Add Chart Element → Error Bars → Standard Deviation"
  },
  {
    question: "How do you display high and low points automatically on an in-cell Sparkline?",
    shortAnswer: "Select the sparkline → Sparkline tab → Check 'High Point' and 'Low Point' in the Show group → Set distinct marker colors.",
    explanation: "Highlighting extremes draws immediate attention to annual best and worst performance periods.",
    hint: "Check 'High Point' and 'Low Point' on the Sparkline ribbon tab.",
    level: "basic",
    codeExample: "Sparkline Ribbon → Show: High Point, Low Point"
  },
  {
    question: "Why should you avoid placing red and green series side-by-side without secondary cues?",
    shortAnswer: "To ensure accessibility for color-blind individuals who cannot distinguish red-green hues.",
    explanation: "Use blue/orange contrasts or add symbols/markers so information is not conveyed by color alone.",
    hint: "Color-blind friendly design uses blue/orange or distinct line styles.",
    level: "basic",
    codeExample: "Use Blue (#0284C7) vs Orange (#F97316) for accessible contrast."
  },
  {
    question: "How do you change the order of series in a multi-series clustered column chart?",
    shortAnswer: "Right-click Chart → Select Data → Use the 'Move Up' and 'Move Down' arrow buttons under Legend Entries.",
    explanation: "Reorders series horizontally inside each category cluster.",
    hint: "Select Data → Legend Entries → Move Up / Move Down.",
    level: "moderate",
    codeExample: "Select Data → Move Up / Move Down"
  },
  {
    question: "What is a Radar (Spider) Chart and when is it best used?",
    shortAnswer: "A chart that evaluates multiple qualitative or quantitative dimensions radiating from a central point, best for employee competency or product feature benchmarking.",
    explanation: "Allows simultaneous comparison of 5-8 skill dimensions across multiple candidates.",
    hint: "Radar charts compare multi-dimensional scores on radiating axes.",
    level: "moderate",
    codeExample: "Employee Skill Assessment: [Technical, Communication, Leadership, Speed]"
  },
  {
    question: "How do you combine multiple charts into a single moveable grouped dashboard unit?",
    shortAnswer: "Select all charts while holding `Ctrl` → Shape Format → Group → Group.",
    explanation: "Grouped visuals move, copy, and align together as one unified container.",
    hint: "Select charts → Shape Format → Group.",
    level: "basic",
    codeExample: "Ctrl + Click → Shape Format → Group"
  },
  {
    question: "How do you insert an interactive Slicer that controls both a Table and its connected chart?",
    shortAnswer: "Click inside the structured Table → Table Design → Insert Slicer → Choose filter columns.",
    explanation: "Slicers filter table rows, and the connected chart updates automatically in real time.",
    hint: "Insert Slicers from the Table Design ribbon tab.",
    level: "basic",
    codeExample: "Table Design → Insert Slicer → [Branch]"
  },
  {
    question: "What is the recommended Gap Width for professional Clustered Column charts?",
    shortAnswer: "Between 100% and 150% (prevents columns from appearing too thin or overly fat and crowded).",
    explanation: "Default gap width (219%) leaves columns too narrow; reducing to 120-150% creates balanced proportions.",
    hint: "Set Gap Width to 100% - 150% in Format Data Series.",
    level: "moderate",
    codeExample: "Format Data Series → Gap Width = 120%"
  },
  {
    question: "How do you plot a non-contiguous range on an Excel chart?",
    shortAnswer: "Hold the `Ctrl` key while selecting non-adjacent cell ranges, then insert the chart.",
    explanation: "Allows selective plotting of Column A (Names) and Column D (Totals) while skipping Columns B and C.",
    hint: "Hold Ctrl while selecting non-adjacent columns.",
    level: "basic",
    codeExample: "Select A1:A10 → Hold Ctrl → Select D1:D10 → Alt+F1"
  },
  {
    question: "What is the ultimate objective of business data visualization in Excel?",
    shortAnswer: "To transform raw numbers into immediate, actionable intelligence that empowers leadership to make confident, data-driven decisions.",
    explanation: "A great visualization is not art; it is a clear, unambiguous business communication tool.",
    hint: "Transform numbers into actionable executive intelligence.",
    level: "basic",
    codeExample: "Visual Intelligence = Clarity + Speed + Actionable Insight"
  }
];

export default questions;
