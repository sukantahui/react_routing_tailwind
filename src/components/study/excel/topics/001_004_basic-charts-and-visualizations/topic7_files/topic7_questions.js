// topic7_questions.js - 30 Comprehensive Practice & Viva Questions
// Topic 7: Practice Session: Creating a Business Performance Chart Pack
// Module: 001_004_basic-charts-and-visualizations

const questions = [
  {
    question: "What is a Business Performance Chart Pack in executive reporting?",
    shortAnswer: "A cohesive, curated suite of complementary charts that together communicate operational, financial, and growth performance across an enterprise.",
    explanation: "A chart pack combines volume, profit, variance, and trend visuals on a unified canvas with synchronized color palettes and scales.",
    hint: "Consolidates revenue, volume, margin, and trajectory into one executive view.",
    level: "basic",
    codeExample: "Chart Pack = Trend (Line) + Category (Column) + Share (Doughnut) + In-cell (Sparkline)"
  },
  {
    question: "How do you ensure consistent color harmony across multiple charts in a workbook?",
    shortAnswer: "By defining a central 3-color palette (e.g. Primary Navy, Accent Cyan, Alert Amber) and applying it identically to corresponding metrics across all visuals.",
    explanation: "Visual consistency reduces cognitive load; using different colors for the same metric across different tabs confuses leadership.",
    hint: "Use identical color accents for the same data metrics across all charts.",
    level: "basic",
    codeExample: "Actuals = Navy (#0F172A), Budget = Slate (#64748B), Variance = Emerald (#10B981)"
  },
  {
    question: "Why should you align chart titles and axes consistently across a multi-chart dashboard?",
    shortAnswer: "To establish a clean visual reading rhythm, making it easy for stakeholders to scan metrics from left to right without readjusting focus.",
    explanation: "Inconsistent alignments create visual tension and make reports look amateurish.",
    hint: "Uniform top-left alignment helps executives scan KPIs rapidly.",
    level: "basic",
    codeExample: "Align all chart titles top-left with 14pt Bold Segoe UI."
  },
  {
    question: "How do you link a chart title directly to a cell value for dynamic updates?",
    shortAnswer: "Select the Chart Title → Click inside the Formula Bar → Type `='SheetName'!$A$1` → Press Enter.",
    explanation: "Dynamic chart titles automatically reflect selected date ranges or branch filters without manual editing.",
    hint: "Click the title box, then in the Formula Bar type = and point to the cell.",
    level: "moderate",
    codeExample: "=Topic7_Chart_Pack_Practice!$B$2"
  },
  {
    question: "What is the best way to handle different numerical magnitudes on a single chart?",
    shortAnswer: "Use a Combo Chart with a Secondary Axis, or separate the metrics into distinct aligned charts in the pack.",
    explanation: "Mixing raw currency ($10M) with percentage margins (18%) on a single axis flattens percentages into an invisible horizontal line at zero.",
    hint: "Assign percentages or small units to a Secondary Vertical Axis.",
    level: "moderate",
    codeExample: "Primary Axis: Revenue ($) | Secondary Axis: Margin (%)"
  },
  {
    question: "How do you suppress chart clutter when plotting multi-branch monthly performance?",
    shortAnswer: "Remove heavy horizontal gridlines, eliminate redundant legend boxes by using direct data labels on endpoint series, and soften border strokes.",
    explanation: "Decluttering maximizes data-ink ratio and highlights business variances immediately.",
    hint: "Remove gray backgrounds, thick borders, and repetitive axis decimals.",
    level: "basic",
    codeExample: "Data-Ink Ratio = (Data Ink) / (Total Ink Used)"
  },
  {
    question: "When should you use in-cell Sparklines alongside full-size charts in a summary pack?",
    shortAnswer: "Use sparklines inside high-density summary tables to show 12-month trajectory at a glance without taking up screen real estate.",
    explanation: "Sparklines provide micro-visual context right beside tabular numbers.",
    hint: "Sparklines offer lightweight trend context inside dense financial tables.",
    level: "basic",
    codeExample: "Insert → Sparklines → Line (Data: C2:N2, Location: O2)"
  },
  {
    question: "How do you format data labels to display negative variances in red and positive in green?",
    shortAnswer: "Apply a custom number format to the data label source: `[Color10]+0.0%;[Red]-0.0%;\"-\"`.",
    explanation: "Custom color formatting at the data source carries through directly to chart labels.",
    hint: "Use color tags like [Green] and [Red] in custom number formats.",
    level: "advanced",
    codeExample: "[Color10]+0.0%;[Red]-0.0%;0.0%"
  },
  {
    question: "Why should 3D charts never be used in a professional corporate chart pack?",
    shortAnswer: "3D perspectives distort proportional slice angles in pie charts and misalign bar heights against axis gridlines.",
    explanation: "Perspective angles cause optical distortion, leading to inaccurate data interpretation.",
    hint: "3D visual depth distorts geometrical scale and misleads viewers.",
    level: "basic",
    codeExample: "Always use flat 2D Column, Bar, Line, or Doughnut visuals."
  },
  {
    question: "How do you ensure charts resize smoothly when printing or exporting to PDF?",
    shortAnswer: "Right-click Chart → Format Chart Area → Properties → Select 'Move and size with cells'.",
    explanation: "Prevents chart elements from drifting or overlapping when grid rows/columns are resized.",
    hint: "Set chart properties to 'Move and size with cells'.",
    level: "moderate",
    codeExample: "Format Chart Area → Size & Properties → Move and size with cells"
  },
  {
    question: "How do you highlight the maximum or latest value in a line chart dynamically?",
    shortAnswer: "Add a helper series in the table with formula `=IF(C2=MAX($C$2:$C$13), C2, NA())` and format it as a distinct scatter marker.",
    explanation: "Plotting `#N/A` prevents Excel from drawing unnecessary points, leaving only the peak marker.",
    hint: "Use an #N/A-filtered helper column to plot a single highlight marker.",
    level: "advanced",
    codeExample: "=IF(B2=MAX($B$2:$B$13), B2, NA())"
  },
  {
    question: "What is the recommended maximum number of slices in a pie or doughnut chart in a chart pack?",
    shortAnswer: "No more than 5 to 6 slices; aggregate remaining smaller slices into an 'Other' bucket.",
    explanation: "Beyond 6 slices, label overlap occurs and human perception struggles to compare slice angles.",
    hint: "Keep slices to 5 or fewer; combine minor categories into 'Other'.",
    level: "basic",
    codeExample: "Top 4 Categories + 1 'Other / Miscellaneous' Slice"
  },
  {
    question: "How do you plot a target benchmark line across a clustered column chart?",
    shortAnswer: "Add a 'Target' column to your data table with uniform target values, then change its series chart type to 'Line' in the Combo Chart settings.",
    explanation: "A combo column-and-line chart provides instant visual target-vs-actual comparison.",
    hint: "Add a static target series and set its chart type to Line.",
    level: "moderate",
    codeExample: "Change Chart Type → Combo → Target: Line, Actual: Clustered Column"
  },
  {
    question: "How do you lock chart aspect ratios to prevent stretched distortion on different monitors?",
    shortAnswer: "Right-click Chart → Format Chart Area → Size → Check 'Lock aspect ratio'.",
    explanation: "Preserves width-to-height proportions when pasting into PowerPoint or executive decks.",
    hint: "Check 'Lock aspect ratio' in chart size properties.",
    level: "basic",
    codeExample: "Format Chart Area → Size → Lock Aspect Ratio = TRUE"
  },
  {
    question: "What is the role of an executive summary card above a chart pack?",
    shortAnswer: "It provides top-level scalar KPIs (Total Revenue, YoY Growth %, Net Margin) before the user dives into the granular visual trends.",
    explanation: "Allows C-suite executives to understand the bottom-line numbers in 5 seconds.",
    hint: "Executive summary cards summarize high-level KPIs at the top.",
    level: "basic",
    codeExample: "KPI Card 1: Revenue | KPI Card 2: Growth % | KPI Card 3: EBITDA"
  },
  {
    question: "How do you handle zero or null values in line chart time series without dropping the line to the bottom?",
    shortAnswer: "Select Chart → Select Data → Hidden and Empty Cells → Choose 'Connect data points with line' or represent blanks as `#N/A`.",
    explanation: "Prevents artificial dips to zero when data is simply missing or pending collection.",
    hint: "In Select Data → Hidden and Empty Cells → Connect data points with line.",
    level: "moderate",
    codeExample: "Hidden & Empty Cells → Connect data points with line"
  },
  {
    question: "How do you configure a waterfall chart in a corporate financial chart pack?",
    shortAnswer: "Select the step data (Gross Revenue, COGS, OpEx, Taxes, Net Income) → Insert Waterfall Chart → Right-click subtotal columns → Set as Total.",
    explanation: "Waterfall charts show how positive and negative components bridge starting and ending totals.",
    hint: "Right-click bridge totals and select 'Set as Total'.",
    level: "moderate",
    codeExample: "Insert → Waterfall Chart → Format Data Point → Set as Total"
  },
  {
    question: "Why should you avoid using bright saturated rainbow colors across multiple chart series?",
    shortAnswer: "Rainbow colors create visual chaos, lack semantic meaning, and distract from the actual data variance.",
    explanation: "Monochromatic gradients or curated 2-tone themes provide far superior legibility.",
    hint: "Use monochromatic tones with a single bright accent color for emphasis.",
    level: "basic",
    codeExample: "Use Slate Navy tones with Emerald green for positive variance."
  },
  {
    question: "How do you copy chart formatting from one chart to another instantly?",
    shortAnswer: "Select formatted chart → Press `Ctrl + C` → Select target chart → Press `Alt + E + S` (Paste Special) → Choose 'Formats' → Click OK.",
    explanation: "Transfers font styles, colors, border strokes, and gridline settings in 1 second.",
    hint: "Copy chart, select target chart, and use Paste Special → Formats.",
    level: "moderate",
    codeExample: "Ctrl+C → Select Target → Alt+E+S → Formats → Enter"
  },
  {
    question: "What is the purpose of adding a rolling 3-month moving average trendline to volatile daily charts?",
    shortAnswer: "To smooth out high-frequency noise and reveal the true underlying trajectory.",
    explanation: "A moving average dampens daily fluctuations caused by weekends or billing cycles.",
    hint: "Trendlines smooth seasonal spikes and clarify direction.",
    level: "moderate",
    codeExample: "Add Chart Element → Trendline → Moving Average (Period: 3)"
  },
  {
    question: "How do you align multiple chart objects perfectly in a worksheet grid?",
    shortAnswer: "Hold `Ctrl` and click each chart → Shape Format → Align → Select 'Align Top' and 'Distribute Horizontally'.",
    explanation: "Mathematical alignment gives dashboards a polished, executive software aesthetic.",
    hint: "Use Shape Format → Align → Align Top / Distribute Horizontally.",
    level: "basic",
    codeExample: "Shape Format → Align → Align Top → Distribute Horizontally"
  },
  {
    question: "How do you snap a chart's borders to the underlying worksheet gridlines?",
    shortAnswer: "Hold the `Alt` key while dragging or resizing the chart corners.",
    explanation: "Holding `Alt` activates magnetic snapping to row and column boundaries.",
    hint: "Hold Alt while dragging chart edges to snap to cell grid boundaries.",
    level: "basic",
    codeExample: "Hold ALT + Drag Chart Corner to snap to grid"
  },
  {
    question: "Why should you avoid placing heavy borders around every individual chart container?",
    shortAnswer: "Heavy outer borders create visual 'boxes within boxes' that clutter the dashboard interface.",
    explanation: "Border-free charts on a subtle shaded card container look modern and airy.",
    hint: "Set Shape Outline to 'No Outline' for modern flat design.",
    level: "basic",
    codeExample: "Shape Format → Shape Outline → No Outline"
  },
  {
    question: "How do you create a bullet chart for target vs actual benchmarking in Excel?",
    shortAnswer: "Create a stacked bar chart for qualitative performance bands (Poor, Good, Excellent) and add Actual/Target series on secondary axes.",
    explanation: "Bullet charts replace bloated gauge meters by providing rich context in a compact bar.",
    hint: "Use stacked bars with secondary scatter or error bar markers.",
    level: "advanced",
    codeExample: "Stacked Bar (Bands) + Secondary Clustered Bar (Actual) + Line Marker (Target)"
  },
  {
    question: "What is the primary benefit of grouping multiple chart objects together?",
    shortAnswer: "Grouping allows you to move, resize, format, or reposition the entire chart pack as a single unified component.",
    explanation: "Select charts → Right-click → Group → Group (or `Ctrl + G`).",
    hint: "Grouping bundles individual charts into one moveable dashboard container.",
    level: "basic",
    codeExample: "Select all charts → Shape Format → Group"
  },
  {
    question: "How do you add interactive slicers to filter charts created from structured Excel Tables?",
    shortAnswer: "Click inside the Table → Table Design → Insert Slicer → Select filter columns (Branch, Year, Department).",
    explanation: "Slicers linked to structured tables dynamically filter the table and its connected charts simultaneously.",
    hint: "Insert Slicers from the Table Design tab to filter table-connected charts.",
    level: "moderate",
    codeExample: "Table Design → Insert Slicer → Select [Branch], [Department]"
  },
  {
    question: "Why should vertical axis scales start at zero on all column and bar charts?",
    shortAnswer: "Because the visual height of a bar represents quantity; starting above zero exaggerates minor differences misleadingly.",
    explanation: "Truncated axes create deceptive visual representations, violating data ethics.",
    hint: "Bar heights encode absolute value; truncating axis distorts proportionality.",
    level: "basic",
    codeExample: "Format Axis → Bounds Minimum = 0"
  },
  {
    question: "How do you format financial numbers on chart axes to display in Lakhs or Crores?",
    shortAnswer: "Use custom number formats: `[>=10000000]0.00,,\" Cr\";[>=100000]0.0,\" L\";0`.",
    explanation: "Shortens multi-digit numbers to fit cleanly without cluttering axis labels.",
    hint: "Use custom comma-scaling number formats for Lakhs and Crores.",
    level: "advanced",
    codeExample: "[>=10000000]0.00,,\" Cr\";[>=100000]0.0,\" L\";0"
  },
  {
    question: "How do you test chart readability for color-blind accessibility?",
    shortAnswer: "Ensure visual series differ in shape, pattern, or lightness contrast, not solely by red/green hue differences.",
    explanation: "Approximately 8% of men experience red-green color blindness; relying only on red/green leads to misinterpretation.",
    hint: "Combine color with icons, dashed lines, or high luminance contrast.",
    level: "moderate",
    codeExample: "Use Blue/Orange contrast or solid/dashed line variations."
  },
  {
    question: "What is the ultimate golden rule of corporate business chart pack design?",
    shortAnswer: "Every visual element must serve a purpose: eliminate chart junk, maximize data-ink ratio, tell a clear story, and guide executive decision-making.",
    explanation: "A great chart pack answers 'What happened?', 'Why did it happen?', and 'What should we do next?'.",
    hint: "Maximize data clarity, eliminate clutter, and drive actionable executive insight.",
    level: "basic",
    codeExample: "Data Clarity = High Contrast + Zero Fluff + Actionable Insights"
  }
];

export default questions;
