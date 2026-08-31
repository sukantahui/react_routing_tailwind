// topic2_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 2
// Topic: The Power Query Editor interface: Queries pane, Applied Steps, and Formula bar
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What are the 5 primary visual zones of the Power Query Editor interface?",
    shortAnswer: "1. The Ribbon, 2. The Queries Pane (Left), 3. The Data Preview Grid (Center), 4. The Formula Bar (Top), and 5. The Query Settings Pane (Right).",
    explanation: "Provides complete visual control over data ingestion, transformation recipes, and M expressions.",
    hint: "Ribbon, Queries Pane, Grid, Formula Bar, Query Settings.",
    level: "basic",
    codeExample: "5 UI Zones: Ribbon, Queries, Grid, Formula Bar, Query Settings"
  },
  {
    question: "What is the difference between 'Transform' and 'Add Column' tabs in the Power Query ribbon?",
    shortAnswer: "'Transform' modifies the selected column in-place; 'Add Column' preserves the original column and creates a brand-new calculated column.",
    explanation: "Transform overwrites; Add Column creates new output.",
    hint: "Transform: in-place modification; Add Column: creates new column.",
    level: "basic",
    codeExample: "Transform Tab (In-Place) vs Add Column Tab (New Column)"
  },
  {
    question: "What is the function of the 'Applied Steps' pane on the right side of the editor?",
    shortAnswer: "It records every data transformation action chronologically as a step in the query's M recipe.",
    explanation: "Clicking any prior step allows inspecting the historical state of the dataset at that exact point in time.",
    hint: "Chronological list of transformation steps.",
    level: "basic",
    codeExample: "Source → Promoted Headers → Changed Type → Filtered Rows"
  },
  {
    question: "What happens when you click on a previous step in the Applied Steps list?",
    shortAnswer: "The data preview grid immediately time-travels to display the exact data state as it existed at that step.",
    explanation: "Enables step-by-step visual debugging without changing data permanently.",
    hint: "Time-travels data preview to that historical step.",
    level: "basic",
    codeExample: "Click 'Source' → Preview raw unpromoted data snapshot"
  },
  {
    question: "How do you enable or display the Formula Bar in the Power Query Editor if it is hidden?",
    shortAnswer: "Go to the 'View' tab on the Power Query ribbon and check the 'Formula Bar' checkbox.",
    explanation: "Displays the M formula expression for the active step.",
    hint: "View Tab → Check 'Formula Bar'.",
    level: "basic",
    codeExample: "View Tab → Layout Group → Check [X] Formula Bar"
  },
  {
    question: "What is the difference between 'Duplicate' and 'Reference' when copying a query in the Queries pane?",
    shortAnswer: "'Duplicate' creates an independent, standalone clone of the query; 'Reference' creates a downstream child query that uses the parent query's final output as its Source.",
    explanation: "Reference queries prevent re-executing heavy ingestion steps multiple times.",
    hint: "Duplicate: Independent clone; Reference: Linked child query.",
    level: "moderate",
    codeExample: "Right-Click Query → Duplicate vs Reference"
  },
  {
    question: "What is the Advanced Editor in Power Query?",
    shortAnswer: "A dedicated code editing modal displaying the complete, raw M script structured in `let ... in ...` syntax for the active query.",
    explanation: "Allows power users to author custom logic, nested lambdas, and complex ETL algorithms.",
    hint: "Full M script window with let...in blocks.",
    level: "advanced",
    codeExample: "Home Tab → Advanced Editor"
  },
  {
    question: "How do you rename an Applied Step to give it a descriptive business name?",
    shortAnswer: "Right-click the step in the Applied Steps pane and select 'Rename', or select the step and press F2.",
    explanation: "Best practice for enterprise auditability and documentation.",
    hint: "Right-click → Rename or press F2.",
    level: "basic",
    codeExample: "Rename: #\"Changed Type\" → #\"Coerce Amount To Decimal\""
  },
  {
    question: "What happens if you insert a new step in the middle of an existing Applied Steps chain?",
    shortAnswer: "Power Query warns that inserting an intermediate step may break subsequent dependent steps, and recalculates downstream transformations.",
    explanation: "Downstream steps referencing altered columns may need manual formula adjustments.",
    hint: "Warns about potential downstream dependency breakage.",
    level: "moderate",
    codeExample: "Dialog: 'Insert Step: Are you sure you want to insert a step?'"
  },
  {
    question: "How do you delete a specific Applied Step from the query settings pane?",
    shortAnswer: "Click the red 'X' icon next to the step name or right-click the step and choose 'Delete'.",
    explanation: "Removes the transformation from the M recipe.",
    hint: "Click the 'X' button next to the step.",
    level: "basic",
    codeExample: "Right-Click Step → Delete (or click red X)"
  },
  {
    question: "What do the small icon badges next to each column header represent?",
    shortAnswer: "The assigned Data Type for that column (e.g. `123` = Whole Number, `ABC` = Text, `📅` = Date, `1.2` = Decimal Number).",
    explanation: "Clicking the icon allows instant one-click data type changing.",
    hint: "Visual indicators of the column's data type.",
    level: "basic",
    codeExample: "Icon Badges: ABC (Text), 123 (Int), 1.2 (Float), Date (Calendar)"
  },
  {
    question: "What is Query Grouping in the Queries pane?",
    shortAnswer: "Organizing multiple queries into hierarchical folders (e.g. `Staging`, `Dimensions`, `Facts`, `Parameters`) to maintain order in enterprise workbooks.",
    explanation: "Improves project navigation when managing 20+ queries.",
    hint: "Organizing queries into named folder groups.",
    level: "basic",
    codeExample: "Right-Click Queries Pane → New Group..."
  },
  {
    question: "What does the gear / cog icon next to an Applied Step signify?",
    shortAnswer: "It indicates that the step was configured via a visual dialog box (e.g. Filter, Split Column, Merge) and can be reopened to edit settings visually.",
    explanation: "Clicking the gear re-launches the configuration modal.",
    hint: "Reopens the visual configuration dialog for that step.",
    level: "basic",
    codeExample: "Click Gear Icon → Edit Filter / Split settings"
  },
  {
    question: "What is the M code structure of an Applied Step assignment?",
    shortAnswer: "`#\"Step Name\" = FunctionName(#\"Previous Step Name\", [Options])`.",
    explanation: "Every step explicitly takes the output table of the prior step as its first parameter.",
    hint: "#\"StepName\" = Function(#\"PriorStep\", ...).",
    level: "advanced",
    codeExample: "#\"Filtered Rows\" = Table.SelectRows(#\"Promoted Headers\", each [Amount] > 1000)"
  },
  {
    question: "Why do step names in M code often have a `#` prefix and double quotes (e.g. `#\"Changed Type\"`)?",
    shortAnswer: "In M syntax, any identifier containing spaces or special characters must be escaped using the `#\"...\"` literal string format.",
    explanation: "Identifers without spaces (e.g. `Source`) do not require the `#\"\"` wrapper.",
    hint: "Escapes identifiers that contain spaces or symbols.",
    level: "moderate",
    codeExample: "#\"Promoted Headers\" vs Source"
  },
  {
    question: "What is the 'View' tab's 'Data Preview' group used for?",
    shortAnswer: "To toggle Column Quality, Column Distribution, Column Profile, and Monospaced Font displays.",
    explanation: "Enables instant statistical health profiling across all columns.",
    hint: "Toggles Column Quality, Distribution, and Profile bars.",
    level: "basic",
    codeExample: "View Tab → Check [X] Column quality, [X] Column profile"
  },
  {
    question: "How do you reorder Applied Steps in the Query Settings pane?",
    shortAnswer: "Drag and drop the step up or down the list, or right-click the step and select 'Move Up' or 'Move Down'.",
    explanation: "Alters the chronological execution order of the ETL recipe.",
    hint: "Drag and drop step, or right-click → Move Up/Down.",
    level: "moderate",
    codeExample: "Right-Click Step → Move Up / Move Down"
  },
  {
    question: "What happens when you right-click a column header in the Power Query grid?",
    shortAnswer: "A context menu appears with one-click actions: Remove, Remove Other Columns, Duplicate Column, Change Type, Split Column, and Unpivot.",
    explanation: "Fastest way to apply single-column transformations.",
    hint: "Context menu with column-specific transformations.",
    level: "basic",
    codeExample: "Right-Click Header → Remove Other Columns"
  },
  {
    question: "What is the 'Remove Other Columns' transformation, and why is it considered a best practice?",
    shortAnswer: "It explicitly selects the columns you need and discards all others, ensuring your query doesn't break or slow down if unexpected extra columns appear in the source.",
    explanation: "Guarantees schema stability and memory efficiency.",
    hint: "Explicitly retains selected columns and drops all others.",
    level: "expert",
    codeExample: "= Table.SelectColumns(#\"Changed Type\", {\"Date\", \"Amount\"})"
  },
  {
    question: "How do you view the total row count and column count of the current preview in Power Query?",
    shortAnswer: "Look at the Status Bar at the bottom left of the Power Query Editor (e.g. '15 columns, 1000+ rows').",
    explanation: "Displays metadata about the currently cached dataset snapshot.",
    hint: "Bottom left status bar.",
    level: "basic",
    codeExample: "Status Bar: '12 columns, 1000+ rows'"
  },
  {
    question: "Why does the preview grid only show '1000+ rows' by default?",
    shortAnswer: "Power Query optimizes editor performance by loading only the first 1,000 rows into the visual preview cache.",
    explanation: "The full dataset will be processed when Close & Load is executed.",
    hint: "Visual performance optimization (1,000 row cache).",
    level: "moderate",
    codeExample: "Bottom Status: 'Column profiling based on top 1000 rows'"
  },
  {
    question: "How do you change column profiling from 'Top 1000 rows' to 'Entire dataset'?",
    shortAnswer: "Click the status bar text at the bottom left ('Column profiling based on top 1000 rows') and select 'Column profiling based on entire data set'.",
    explanation: "Ensures comprehensive statistical checks across multi-million row tables.",
    hint: "Click status bar → Profiling based on entire data set.",
    level: "advanced",
    codeExample: "Status Bar → Select 'Profiling based on entire data set'"
  },
  {
    question: "How do you add step-by-step documentation comments to an Applied Step for external audit review?",
    shortAnswer: "Right-click the step → Properties → Enter description text in the 'Description' box.",
    explanation: "Hovering over the step's 'i' info icon displays the documentation tooltip.",
    hint: "Right-click Step → Properties → Description.",
    level: "moderate",
    codeExample: "Step Properties → Description: 'Tax compliance filter per FY26 audit rules'"
  },
  {
    question: "What is the 'Query Dependencies' view in Power Query?",
    shortAnswer: "A visual flowchart diagram (View Tab → Query Dependencies) mapping relationships and upstream/downstream data flows between all queries and sources.",
    explanation: "Essential for understanding architecture in enterprise workbooks with 30+ linked queries.",
    hint: "View Tab → Query Dependencies (Visual Flowchart).",
    level: "advanced",
    codeExample: "View Tab → Query Dependencies"
  },
  {
    question: "What does the green progress bar at the top of column headers represent?",
    shortAnswer: "The Column Quality bar, displaying the percentage of Valid (Green), Error (Red), and Empty (Grey) values in that column.",
    explanation: "Visual health indicator for data hygiene.",
    hint: "Column Quality: Valid (Green), Error (Red), Empty (Grey).",
    level: "basic",
    codeExample: "Quality Bar: 98% Valid, 2% Empty, 0% Errors"
  },
  {
    question: "How do you discard all changes and exit the Power Query Editor without saving?",
    shortAnswer: "Click the 'X' close button in the top right and select 'Discard' (or 'Keep' to save).",
    explanation: "Prevents accidental modification of production queries.",
    hint: "Close Window → Click 'Discard'.",
    level: "basic",
    codeExample: "Close Dialog → Discard Changes"
  },
  {
    question: "Can you copy an Applied Step from one query and paste it into another query?",
    shortAnswer: "Yes, select the step M code in the formula bar (or Advanced Editor), copy it, and paste it into the target query.",
    explanation: "Allows rapid sharing of complex transformation logic between queries.",
    hint: "Copy M code from formula bar or Advanced Editor.",
    level: "moderate",
    codeExample: "Copy M Step → Paste in Target Query Formula Bar"
  },
  {
    question: "What is the keyboard shortcut to open the Advanced Editor in Power Query?",
    shortAnswer: "Press Alt → H → V (or click Advanced Editor on the Home tab).",
    explanation: "Quick access to the raw M code script.",
    hint: "Home Tab → Advanced Editor.",
    level: "basic",
    codeExample: "Home Tab → Advanced Editor"
  },
  {
    question: "How do you inspect native query folding SQL for a specific Applied Step?",
    shortAnswer: "Right-click the step in the Applied Steps pane and click 'View Native Query'.",
    explanation: "If enabled, displays the exact SQL dialect sent to the server.",
    hint: "Right-click step → View Native Query.",
    level: "expert",
    codeExample: "Right-Click Step → View Native Query"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for navigating the Power Query Editor interface?",
    shortAnswer: "Treat the Applied Steps pane as your immutable financial audit trail! Always rename steps with clear business intent (press F2), use 'Remove Other Columns' to lock down schema stability, verify M formulas in the Formula Bar, and use Reference queries instead of Duplicate to build modular, high-speed corporate data architectures!",
    explanation: "Mastery of the Power Query UI separates spreadsheet amateurs from institutional data architects!",
    hint: "Rename Steps (F2) + Remove Other Columns + Formula Bar Mastery = Enterprise Architecture!",
    level: "expert",
    codeExample: "Rule: UI Navigation → Treat Applied Steps as Your Audit Recipe!"
  }
];

export default questions;
