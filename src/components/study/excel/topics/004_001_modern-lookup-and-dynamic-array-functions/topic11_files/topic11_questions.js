// topic11_questions.js
// 30 Structured Questions covering Dynamic Validation Lists & Spill Operator (#)

const questions = [
  {
    question: "How do you bind an Excel Data Validation dropdown list directly to a spilled dynamic array?",
    shortAnswer: "Set the Data Validation List Source to '=$OriginCell#' (e.g. =$J$2#).",
    explanation: "By appending `#` to the top-left cell of the spilled array in Data Validation > Allow: List > Source, the dropdown menu automatically expands and contracts based on the spilled items.",
    hint: "Use =$OriginCell# in Data Validation List Source.",
    level: "basic",
    codeExample: "Data Validation > Allow: List > Source: =$J$2#"
  },
  {
    question: "Why is =$J$2# superior to legacy dynamic named ranges using OFFSET and COUNTA?",
    shortAnswer: "It is non-volatile, immune to blank cell disruptions, requires no Name Manager formulas, and calculates instantly in memory.",
    explanation: "Legacy `OFFSET` recalculated on every single worksheet click, slowing workbooks down. `=$J$2#` calculates only when source data changes.",
    hint: "Non-volatile and requires no complex OFFSET formulas.",
    level: "basic",
    codeExample: "// Legacy: =OFFSET($A$2,0,0,COUNTA($A:$A)-1,1) -> Modern: =$J$2#"
  },
  {
    question: "How do you build a cascading dependent dropdown (e.g. Region -> Branch) without using the INDIRECT function?",
    shortAnswer: "Use FILTER to create a dependent spilled array in cell L2 (=SORT(UNIQUE(FILTER(BranchCol, RegionCol=J1)))), then point the Branch dropdown to =$L$2#.",
    explanation: "When Region changes in J1, the formula in L2 updates its spilled array, and the Branch dropdown bound to `=$L$2#` reflects the new branches immediately.",
    hint: "Filter the secondary list by the primary dropdown and bind with #.",
    level: "moderate",
    codeExample: "// L2: =SORT(UNIQUE(FILTER(Table1[Branch], Table1[Region]=J1)))\n// Dropdown 2 Source: =$L$2#"
  },
  {
    question: "Why did legacy dependent dropdowns with INDIRECT() fail on category names with spaces (e.g. 'West Bengal')?",
    shortAnswer: "INDIRECT required Named Ranges, which cannot contain spaces, necessitating complex SUBSTITUTE and underscore hacks.",
    explanation: "`SORT(UNIQUE(FILTER()))` operates directly on raw text strings and handles spaces, slashes, and special characters without any string substitutions.",
    hint: "Modern dynamic arrays handle spaces natively without Named Ranges.",
    level: "moderate",
    codeExample: "// Modern dropdowns support 'North 24 Parganas' without underscores"
  },
  {
    question: "Can a Data Validation dropdown reference a spilled array located on a different worksheet?",
    shortAnswer: "Yes, by including the worksheet name: =Calculations!$A$2#.",
    explanation: "Cross-sheet references are fully supported in modern Excel Data Validation.",
    hint: "Use =SheetName!$OriginCell# in the Source box.",
    level: "basic",
    codeExample: "Data Validation > Source: =Calculations!$A$2#"
  },
  {
    question: "What happens in the Data Validation dropdown when new items are added to the source dataset?",
    shortAnswer: "The source formula recalculates, spills the new items, and the dropdown menu updates automatically with zero user intervention.",
    explanation: "Because `UNIQUE` and `SORT` expand dynamically, the dropdown menu stays 100% synchronized with live records.",
    hint: "Dropdown choices expand automatically as data grows.",
    level: "basic",
    codeExample: "// Add new student -> Dropdown expands automatically"
  },
  {
    question: "How does Auto-Complete Search work inside Data Validation dropdowns in Excel 365?",
    shortAnswer: "Typing characters into the dropdown cell automatically filters the list to matching options in real time.",
    explanation: "Excel 365 natively includes searchable dropdown menus when bound to dynamic arrays, eliminating manual scrolling through long lists.",
    hint: "Excel 365 automatically filters dropdowns as you type.",
    level: "moderate",
    codeExample: "// Type 'Bar' -> Dropdown shows only 'Barrackpore'"
  },
  {
    question: "What error occurs in Data Validation if you omit the '#' operator (e.g. typing =$J$2 instead of =$J$2#)?",
    shortAnswer: "The dropdown list will only display the single item located in cell J2 instead of the entire spilled list.",
    explanation: "Without `#`, Excel treats `$J$2` as a scalar single-cell reference.",
    hint: "Always include the # operator to capture the full spilled list.",
    level: "basic",
    codeExample: "// =$J$2 shows 1 item; =$J$2# shows all spilled items"
  },
  {
    question: "How do you create a dynamic multi-level cascading hierarchy (State -> District -> Center -> Course)?",
    shortAnswer: "Chain multiple sequential FILTER formulas across dedicated calculation cells, each filtering by the previous dropdown cell.",
    explanation: "State dropdown -> District formula in M2 -> Center formula in N2 -> Course formula in O2, with each dropdown pointing to its respective origin cell `#`.",
    hint: "Chain multiple dependent spilled formulas pointing to previous dropdown cells.",
    level: "expert",
    codeExample: "=SORT(UNIQUE(FILTER(Centers, (StateCol=J1)*(DistrictCol=J2))))"
  },
  {
    question: "Can you feed a dynamic dropdown with a horizontal spilled row array (e.g. =$A$1#)?",
    shortAnswer: "Yes, Data Validation lists accept both horizontal and vertical spilled arrays.",
    explanation: "Excel flattens horizontal spilled arrays into a clean vertical dropdown list automatically.",
    hint: "Both horizontal and vertical spilled arrays work in dropdowns.",
    level: "moderate",
    codeExample: "Data Validation > Source: =$B$1#"
  },
  {
    question: "How do you prevent blank choices from appearing in a dynamic validation dropdown?",
    shortAnswer: "Filter out empty strings in the feeder formula: =SORT(UNIQUE(FILTER(A2:A100, A2:A100<>\"\"))).",
    explanation: "Explicitly excluding blank cells ensures only valid data options appear in the dropdown menu.",
    hint: "Add <>\"\" inside the feeder FILTER formula.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(FILTER(Staff[Name], Staff[Name]<>\"\")))"
  },
  {
    question: "What happens if a feeder formula returns a #SPILL! error?",
    shortAnswer: "The Data Validation dropdown will display the text '#SPILL!' as its only selectable option.",
    explanation: "The dropdown reflects whatever value or error exists in the origin cell. Resolving the spill obstruction restores the list.",
    hint: "Resolve the #SPILL! error on the sheet to fix the dropdown.",
    level: "basic",
    codeExample: "// Clear obstruction in spill path to restore dropdown items"
  },
  {
    question: "How do you sanitize text before feeding a validation dropdown to prevent duplicates caused by trailing spaces?",
    shortAnswer: "Wrap the column in TRIM: =SORT(UNIQUE(FILTER(TRIM(BranchNames), BranchNames<>\"\"))).",
    explanation: "`TRIM()` removes stray spaces, ensuring identical entries are deduplicated accurately.",
    hint: "Use TRIM() in the feeder equation.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(TRIM(MasterTable[Branch])))"
  },
  {
    question: "Can you assign a dynamic spilled range to a standard Named Range in Name Manager?",
    shortAnswer: "Yes, define a Name (e.g. 'DynamicBranches') with Refers To: =Sheet1!$J$2#.",
    explanation: "You can then set Data Validation Source to `=DynamicBranches`, creating clean, readable formulas.",
    hint: "Use Name Manager with Refers To =OriginCell#.",
    level: "moderate",
    codeExample: "Name: BranchList | Refers To: =Calculations!$J$2#"
  },
  {
    question: "How do you create a validation list of all dates in the current month dynamically?",
    shortAnswer: "Feed Data Validation with SEQUENCE and EOMONTH: =SEQUENCE(DAY(EOMONTH(TODAY(),0)), 1, DATE(YEAR(TODAY()), MONTH(TODAY()), 1), 1).",
    explanation: "Generates all days for the active month, updating automatically on the 1st of every month.",
    hint: "Use SEQUENCE with EOMONTH for monthly date dropdowns.",
    level: "advanced",
    codeExample: "=SEQUENCE(DAY(EOMONTH(TODAY(),0)), 1, DATE(YEAR(TODAY()), MONTH(TODAY()), 1), 1)"
  },
  {
    question: "What is the advantage of sorting validation feeder arrays with SORT()?",
    shortAnswer: "It presents dropdown choices in alphabetical (A to Z) order, making item selection fast and intuitive for users.",
    explanation: "Users can quickly find options alphabetically rather than scanning unsorted transaction order lists.",
    hint: "Always wrap feeder lists in SORT() for optimal user experience.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(TrainerList))"
  },
  {
    question: "How do you restrict dropdown options to only high-performing consultants (e.g. Sales > ₹10,00,000)?",
    shortAnswer: "Filter the feeder list by the threshold: =SORT(UNIQUE(FILTER(ConsultantNames, SalesCol>=1000000))).",
    explanation: "Only consultants meeting the qualification criteria are populated in the dropdown menu.",
    hint: "Apply numerical threshold filtering in the feeder formula.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(A2:A50, D2:D50>=1000000)))"
  },
  {
    question: "Can a user type a custom value not in the dynamic validation list?",
    shortAnswer: "Only if the 'Show error alert after invalid data is entered' checkbox is turned off in Data Validation > Error Alert.",
    explanation: "Unchecking the error alert allows the dropdown to suggest choices while permitting free-text entries.",
    hint: "Toggle the Error Alert tab to allow custom entries.",
    level: "moderate",
    codeExample: "Data Validation > Error Alert > Uncheck 'Show error alert'"
  },
  {
    question: "How do you create a dynamic list of Top 5 products in a dropdown?",
    shortAnswer: "Use TAKE with SORT: =TAKE(SORT(UNIQUE(FILTER(Products, SalesCol>0)), 2, -1), 5).",
    explanation: "Restricts the dropdown to strictly the top 5 highest-selling products.",
    hint: "Wrap the sorted unique list in TAKE(..., 5).",
    level: "advanced",
    codeExample: "=TAKE(SORT(ProductTable, 2, -1), 5)"
  },
  {
    question: "What happens if a feeder formula returns an empty array with [if_empty] = 'No Records'?",
    shortAnswer: "The dropdown list displays 'No Records' as a single selectable item.",
    explanation: "Provides clear visual feedback that no valid options exist for the current filter criteria.",
    hint: "The [if_empty] string populates the dropdown cleanly.",
    level: "basic",
    codeExample: "// Dropdown displays: 'No Records Found'"
  },
  {
    question: "Why should feeder formulas reside in hidden or dedicated calculation columns rather than presentation areas?",
    shortAnswer: "To prevent users from accidentally overwriting feeder origin cells or blocking spill paths with formatting.",
    explanation: "Separating calculation logic ensures validation lists remain robust and protected.",
    hint: "Keep feeder formulas on dedicated calculation sheets.",
    level: "moderate",
    codeExample: "// Place feeder arrays on '_Lists' worksheet"
  },
  {
    question: "How do you create an 'All' option in a dynamic validation dropdown?",
    shortAnswer: "Use VSTACK to prepend 'All': =VSTACK(\"All\", SORT(UNIQUE(BranchNames))).",
    explanation: "`VSTACK` places 'All' at the top of the spilled list, followed by all distinct branch locations.",
    hint: "Use VSTACK(\"All\", SpilledList).",
    level: "advanced",
    codeExample: "=VSTACK(\"All\", SORT(UNIQUE(MasterTable[Branch])))"
  },
  {
    question: "Can dynamic validation lists work inside protected worksheets?",
    shortAnswer: "Yes, as long as the cell with Data Validation is unlocked before worksheet protection is enabled.",
    explanation: "Users can select from dropdowns in unlocked cells without modifying protected feeder formula sheets.",
    hint: "Unlock the input dropdown cell before protecting the sheet.",
    level: "moderate",
    codeExample: "// Format Cells > Protection > Uncheck Locked"
  },
  {
    question: "How do you count how many items are currently available in a dynamic dropdown menu?",
    shortAnswer: "Use =COUNTA(FeederOrigin#) or =ROWS(FeederOrigin#).",
    explanation: "Inspects the height of the feeder array in memory, updating automatically.",
    hint: "Use ROWS(FeederOrigin#).",
    level: "basic",
    codeExample: "=ROWS(Calculations!$J$2#)"
  },
  {
    question: "How do you build a dynamic year selector dropdown that shows the last 5 years up to the current year?",
    shortAnswer: "Use SEQUENCE with YEAR(TODAY()): =YEAR(TODAY()) - SEQUENCE(5, 1, 4, -1).",
    explanation: "Generates consecutive years (e.g. 2022, 2023, 2024, 2025, 2026) dynamically.",
    hint: "Combine SEQUENCE with YEAR(TODAY()).",
    level: "advanced",
    codeExample: "=YEAR(TODAY()) - SEQUENCE(5, 1, 4, -1)"
  },
  {
    question: "Why does Excel 365 not require VBA to refresh dynamic dropdowns?",
    shortAnswer: "Because dynamic arrays participate directly in Excel's reactive recalculation engine.",
    explanation: "Whenever underlying data changes, the dependency graph updates the feeder array and dropdown list instantly.",
    hint: "Dynamic arrays update automatically via Excel's dependency graph.",
    level: "basic",
    codeExample: "// Zero VBA macros required for live updating dropdowns"
  },
  {
    question: "What happens if a user copies a cell with a dynamic validation dropdown to other rows?",
    shortAnswer: "The Data Validation rule copies correctly, and all copied cells reference the dynamic spilled array.",
    explanation: "Using absolute coordinates `=$J$2#` ensures all copied input cells point to the exact master feeder list.",
    hint: "Use absolute references =$J$2# so copied cells stay bound.",
    level: "basic",
    codeExample: "// Copy cell B2 with validation =$J$2# down to B3:B100"
  },
  {
    question: "How do you filter a validation dropdown to exclude already selected items from previous rows?",
    shortAnswer: "Combine FILTER with ISNA and MATCH against the already selected range.",
    explanation: "`FILTER(MasterList, ISNA(MATCH(MasterList, SelectedRange, 0)))` removes chosen candidates dynamically from future dropdowns.",
    hint: "Filter out items present in the selected column with ISNA(MATCH(...)).",
    level: "expert",
    codeExample: "=FILTER(MasterList, ISNA(MATCH(MasterList, B$2:B2, 0)))"
  },
  {
    question: "How do you combine multiple columns into a single descriptive dropdown item (e.g. 'Swadeep Roy - Barrackpore')?",
    shortAnswer: "Concatenate columns inside the feeder formula: =SORT(UNIQUE(Table1[Name] & \" - \" & Table1[Branch])).",
    explanation: "Creates formatted composite labels that spill and populate the dropdown menu directly.",
    hint: "Concatenate text columns before sorting and deduplicating.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(Table1[Student_Name] & \" - \" & Table1[City]))"
  },
  {
    question: "Why is the =$OriginCell# dynamic validation pattern considered standard best practice for modern Excel UI/UX design?",
    shortAnswer: "It delivers robust, application-grade dropdowns, cascading menus, and live searchability with zero VBA and zero workbook maintenance.",
    explanation: "In corporate financial and ERP dashboards across Barrackpore and Kolkata, `=$OriginCell#` ensures input forms remain 100% reliable, elegant, and maintenance-free.",
    hint: "It delivers application-grade data validation with zero code maintenance.",
    level: "expert",
    codeExample: "// Modern UX: Raw Data -> SORT(UNIQUE(FILTER())) -> Data Validation =$J$2#"
  }
];

export default questions;
