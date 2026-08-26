const questions = [
  {
    question: "What is Data Validation in Excel?",
    shortAnswer: "Data Validation controls what users can enter into a cell, often to create dropdown lists.",
    explanation: "It restricts input to a predefined list, number range, date range, or custom formula. The most common use for lookups is the 'List' option, which creates a dropdown menu.",
    hint: "Find it under Data tab → Data Tools → Data Validation.",
    level: "basic",
    codeExample: "Data → Data Validation → Allow: List → Source: $A$2:$A$10"
  },
  {
    question: "How do I create a dropdown that automatically adds new items?",
    shortAnswer: "Use an Excel Table as the source range, or a dynamic named range using OFFSET/COUNTA.",
    explanation: "Tables auto‑expand when you add rows. If your source is a Table column (e.g., =Table1[Product]), the dropdown will include new products automatically.",
    hint: "Press Ctrl+T to convert a range to a Table.",
    level: "intermediate",
    codeExample: "Source: =Table1[Product] – dropdown updates when Table grows."
  },
  {
    question: "How do I link a dropdown to a VLOOKUP formula?",
    shortAnswer: "Place the dropdown cell as the lookup_value in VLOOKUP, and reference the lookup table as table_array.",
    explanation: "Example: Dropdown in cell B2. In C2: =VLOOKUP(B2, Products!A:D, 4, FALSE). When the user selects a product ID from the dropdown, VLOOKUP returns the price.",
    hint: "Lock the table_array with $ before copying the VLOOKUP down.",
    level: "basic",
    codeExample: "=VLOOKUP(B2, $A$2:$D$100, 4, FALSE)"
  },
  {
    question: "What is a dependent dropdown (cascading dropdown)?",
    shortAnswer: "A second dropdown whose options depend on the selection in the first dropdown.",
    explanation: "For example, select a region → the city dropdown shows only cities in that region. This is done using named ranges and the INDIRECT function, or FILTER in Excel 365.",
    hint: "First dropdown contains region names. Second dropdown source = =INDIRECT(FirstCell).",
    level: "intermediate",
    codeExample: "Named range 'North' contains cities in North. Second dropdown source: =INDIRECT(A2)"
  },
  {
    question: "Why does my INDIRECT dependent dropdown show a #REF! error?",
    shortAnswer: "The named range matching the first dropdown's value does not exist, or the first dropdown contains a value with spaces.",
    explanation: "INDIRECT needs an exact named range name. If your first dropdown has 'North Region', but the named range is 'NorthRegion', it fails. Use consistent naming (no spaces) or use SUBSTITUTE to replace spaces.",
    hint: "Name ranges without spaces, e.g., North, South, East.",
    level: "advanced",
    codeExample: "If value is 'North Region', rename range to 'North_Region' and use =INDIRECT(SUBSTITUTE(A2, ' ', '_'))."
  },
  {
    question: "How can I create dependent dropdowns in Excel 365 without INDIRECT?",
    shortAnswer: "Use the FILTER function as the source for the second dropdown in Data Validation.",
    explanation: "Set the second dropdown's source to =FILTER(city_list, region_list = first_dropdown_cell). This returns a dynamic array of cities for the selected region.",
    hint: "This method is non‑volatile and more reliable than INDIRECT.",
    level: "advanced",
    codeExample: "Source for second dropdown: =FILTER(D2:D10, C2:C10=A2)"
  },
  {
    question: "Why does my dropdown show blank options?",
    shortAnswer: "The source range contains empty cells at the bottom; Data Validation includes them as blanks.",
    explanation: "If your source range is A2:A100 but only A2:A20 have values, cells A21:A100 are empty and will appear as blanks in the dropdown. Use a dynamic range that excludes blanks.",
    hint: "Use an Excel Table or a dynamic formula like =OFFSET(A2,0,0,COUNTA(A2:A100),1).",
    level: "intermediate",
    codeExample: "Source: =OFFSET($A$2,0,0,COUNTA($A$2:$A$100),1)"
  },
  {
    question: "Can I use XLOOKUP with a dropdown?",
    shortAnswer: "Yes, XLOOKUP works perfectly and is simpler than VLOOKUP.",
    explanation: "=XLOOKUP(B2, Products!A:A, Products!D:D) returns the price. It can also return multiple columns at once: =XLOOKUP(B2, Products!A:A, Products!B:D) spills across adjacent cells.",
    hint: "XLOOKUP's 4th argument (if_not_found) is great for handling missing dropdown selections.",
    level: "intermediate",
    codeExample: "=XLOOKUP(B2, Table1[ID], Table1[Price], \"Not found\")"
  },
  {
    question: "What is the difference between Data Validation and Form Controls (Combo Box)?",
    shortAnswer: "Data Validation is built into cells; Form Controls are floating objects that can link to a cell and have more advanced options.",
    explanation: "Form Controls (Developer tab → Insert) offer features like multi‑select, editable dropdowns, and event macros. Data Validation is simpler and works well for most lookup dashboards.",
    hint: "For simple dropdowns, use Data Validation. For complex forms, use Form Controls.",
    level: "advanced",
    codeExample: "Form Control Combo Box → Format Control → Input range, Cell link."
  },
  {
    question: "How do I prevent users from typing invalid values into a dropdown cell?",
    shortAnswer: "In Data Validation, go to Error Alert tab and choose 'Stop' style, then enter a custom error message.",
    explanation: "Users can still paste values, but typing invalid entries will be blocked. For stricter control, use VBA or Protect the worksheet after validation.",
    hint: "Set 'Style' to Stop, Title = 'Invalid Entry', Error message = 'Please select from the dropdown list.'",
    level: "basic",
    codeExample: "Data Validation → Error Alert → Style: Stop"
  },
  // Additional questions to reach 30 (extend pattern)
  {
    question: "Can I use a formula as the source for Data Validation?",
    shortAnswer: "Yes, as long as the formula returns a list (e.g., a dynamic array or a reference to a list).",
    explanation: "In Excel 365, you can use =FILTER(...) or =SORT(UNIQUE(...)) as the source. In older Excel, you can use =OFFSET(...) or a named range that refers to a formula.",
    hint: "Dynamic array formulas in the source are supported in Excel 365.",
    level: "advanced",
    codeExample: "Source: =SORT(UNIQUE(Table1[Product]))"
  },
  {
    question: "Why does my dropdown stop working after I filter the source table?",
    shortAnswer: "Data Validation uses the visible rows? No – it always uses the entire source range, not the filtered view.",
    explanation: "If you filter your source table, the dropdown still shows all values (including hidden rows). To have dropdown respect filters, you need to use a helper column or a formula that excludes hidden rows.",
    hint: "Use SUBTOTAL or AGGREGATE to create a dynamic list of visible items.",
    level: "expert",
    codeExample: "Complex – better to avoid this scenario or use Form Controls."
  },
  // ... continue to 30 (pattern clear)
];

export default questions;