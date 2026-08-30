/**
 * Master Excel Functions & Methods Catalog (101 Essential, Important, Advanced & Optional Functions)
 * Curated for Coder & AccoTax Excel Training Curriculum (EXCEL-PRO-901)
 * Author: Sukanta Hui
 */

export const excelFunctionsCatalog = [
  // ------------------------------------------------------------------------
  // 1. MATH & AGGREGATION (18 Functions)
  // ------------------------------------------------------------------------
  {
    name: "SUMPRODUCT",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=SUMPRODUCT(array1, [array2], ...)",
    description: "Multiplies corresponding components in two or more arrays and returns the sum of those products.",
    example: "=SUMPRODUCT(B4:B10, C4:C10)",
    result: "₹ 1,45,000.00",
    useCase: "Weighted averages, inventory valuation, and multi-criteria conditional summation without helper columns.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "SUBTOTAL",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=SUBTOTAL(function_num, ref1, [ref2], ...)",
    description: "Returns a subtotal in a list or database, dynamically ignoring hidden rows when filtered.",
    example: "=SUBTOTAL(109, C4:C100)",
    result: "₹ 8,50,000.00",
    useCase: "Dynamic summary total rows in filtered tables (function_num 109 ignores manual hidden rows).",
    mappedModule: "002_001_tables-sorting-and-filtering"
  },
  {
    name: "AGGREGATE",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=AGGREGATE(function_num, options, array, [k])",
    description: "Returns an aggregate sum, average, max, or min while optionally ignoring hidden rows, error values, or nested SUBTOTALs.",
    example: "=AGGREGATE(9, 6, C4:C100)",
    result: "₹ 12,30,000.00",
    useCase: "Summing datasets that contain #N/A or #VALUE! errors without breaking downstream calculation.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "PRODUCT",
    category: "Math & Aggregation",
    priority: "Important",
    syntax: "=PRODUCT(number1, [number2], ...)",
    description: "Multiplies all numbers given as arguments and returns the product.",
    example: "=PRODUCT(1.10, 1.05, 1.08)",
    result: "1.2474",
    useCase: "Compounding growth factors or multi-period return multipliers.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "ABS",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=ABS(number)",
    description: "Returns the absolute value of a number (the number without its sign).",
    example: "=ABS(-4500)",
    result: "4500",
    useCase: "Variance analysis, budget discrepancy checks, and calculating absolute error margins.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "INT",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=INT(number)",
    description: "Rounds a number down to the nearest integer.",
    example: "=INT(89.95)",
    result: "89",
    useCase: "Extracting integer days from date-time serial timestamps (e.g., INT(NOW()) returns date serial).",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "TRUNC",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=TRUNC(number, [num_digits])",
    description: "Truncates a number to an integer by removing the fractional part without rounding.",
    example: "=TRUNC(145.897, 2)",
    result: "145.89",
    useCase: "Stripping decimal digits for tax computation or strict non-rounded financial figures.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "MOD",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=MOD(number, divisor)",
    description: "Returns the remainder after a number is divided by a divisor.",
    example: "=MOD(ROW(), 2)",
    result: "0 or 1",
    useCase: "Alternating row color shading (zebra striping) and shift rotation scheduling.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "QUOTIENT",
    category: "Math & Aggregation",
    priority: "Important",
    syntax: "=QUOTIENT(numerator, denominator)",
    description: "Returns the integer portion of a division, discarding the remainder.",
    example: "=QUOTIENT(25, 6)",
    result: "4",
    useCase: "Calculating full carton packaging quantities or complete batch counts.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "ROUND",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=ROUND(number, num_digits)",
    description: "Rounds a number to a specified number of digits.",
    example: "=ROUND(1254.567, 2)",
    result: "1254.57",
    useCase: "Currency rounding for invoice billing to avoid floating-point penny discrepancies.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "ROUNDUP",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=ROUNDUP(number, num_digits)",
    description: "Rounds a number up, away from zero.",
    example: "=ROUNDUP(12.1, 0)",
    result: "13",
    useCase: "Calculating required container or transport vehicle counts where any fractional unit requires a full vehicle.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "ROUNDDOWN",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=ROUNDDOWN(number, num_digits)",
    description: "Rounds a number down, towards zero.",
    example: "=ROUNDDOWN(12.9, 0)",
    result: "12",
    useCase: "Calculating completed billable hours or conservative bonus thresholds.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "MROUND",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=MROUND(number, multiple)",
    description: "Returns a number rounded to the specified multiple.",
    example: "=MROUND(48, 5)",
    result: "50",
    useCase: "Rounding prices to nearest 50 paisa, ₹ 5, or cash denomination increments.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "CEILING.MATH",
    category: "Math & Aggregation",
    priority: "Important",
    syntax: "=CEILING.MATH(number, [significance], [mode])",
    description: "Rounds a number up to the nearest integer or to the nearest multiple of significance.",
    example: "=CEILING.MATH(4.2, 5)",
    result: "5",
    useCase: "Commercial pricing bands, minimum lot size orders, and shift scheduling.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "FLOOR.MATH",
    category: "Math & Aggregation",
    priority: "Important",
    syntax: "=FLOOR.MATH(number, [significance], [mode])",
    description: "Rounds a number down to the nearest integer or to the nearest multiple of significance.",
    example: "=FLOOR.MATH(24.8, 5)",
    result: "20",
    useCase: "Discount bracket thresholds and volume rebate tiers.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "SIGN",
    category: "Math & Aggregation",
    priority: "Important",
    syntax: "=SIGN(number)",
    description: "Determines the sign of a number: returns 1 if positive, 0 if zero, and -1 if negative.",
    example: "=SIGN(-1500)",
    result: "-1",
    useCase: "Directional indicator logic for stock gain/loss or cash flow direction.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "SQRT",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=SQRT(number)",
    description: "Returns a positive square root.",
    example: "=SQRT(144)",
    result: "12",
    useCase: "Calculating standard deviation components, volatility metrics, and distance formulas.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "POWER",
    category: "Math & Aggregation",
    priority: "Essential",
    syntax: "=POWER(number, power)",
    description: "Returns the result of a number raised to a power.",
    example: "=POWER(1.08, 5)",
    result: "1.4693",
    useCase: "Compound interest growth formulas `PV * POWER(1 + r, n)` and engineering math.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },

  // ------------------------------------------------------------------------
  // 2. RANDOM & SIMULATION (3 Functions)
  // ------------------------------------------------------------------------
  {
    name: "RAND",
    category: "Random & Simulation",
    priority: "Essential",
    syntax: "=RAND()",
    description: "Returns an evenly distributed random real number greater than or equal to 0 and less than 1.",
    example: "=RAND()",
    result: "0.7482",
    useCase: "Monte Carlo risk simulation models, probabilistic cash flow projections, and random sampling.",
    mappedModule: "004_001_modern-lookup-and-dynamic-array-functions"
  },
  {
    name: "RANDBETWEEN",
    category: "Random & Simulation",
    priority: "Essential",
    syntax: "=RANDBETWEEN(bottom, top)",
    description: "Returns a random integer number between the numbers you specify.",
    example: "=RANDBETWEEN(1000, 9999)",
    result: "5842",
    useCase: "Generating mock invoice numbers, transaction test IDs, and synthetic benchmark datasets.",
    mappedModule: "004_001_modern-lookup-and-dynamic-array-functions"
  },
  {
    name: "RANDARRAY",
    category: "Random & Simulation",
    priority: "Essential",
    syntax: "=RANDARRAY([rows], [columns], [min], [max], [whole_number])",
    description: "Generates a dynamic array of random numbers between specified bounds.",
    example: "=RANDARRAY(5, 3, 10, 50, TRUE)",
    result: "[Spilled 5x3 Grid]",
    useCase: "Populating large multi-column simulation grids for financial stress testing.",
    mappedModule: "004_001_modern-lookup-and-dynamic-array-functions"
  },

  // ------------------------------------------------------------------------
  // 3. MATH & LOGARITHMIC (4 Functions)
  // ------------------------------------------------------------------------
  {
    name: "EXP",
    category: "Math & Logarithmic",
    priority: "Important",
    syntax: "=EXP(number)",
    description: "Returns e raised to the power of number.",
    example: "=EXP(1)",
    result: "2.71828",
    useCase: "Continuous compounding interest models (`PV * EXP(r * t)`) and exponential growth curves.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "LN",
    category: "Math & Logarithmic",
    priority: "Important",
    syntax: "=LN(number)",
    description: "Returns the natural logarithm of a number.",
    example: "=LN(10)",
    result: "2.30258",
    useCase: "Continuous return rate computation in stock market price time-series analysis.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "LOG",
    category: "Math & Logarithmic",
    priority: "Important",
    syntax: "=LOG(number, [base])",
    description: "Returns the logarithm of a number to a specified base.",
    example: "=LOG(100, 10)",
    result: "2",
    useCase: "Decibel scaling, logarithmic decay models, and economic elasticities.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "LOG10",
    category: "Math & Logarithmic",
    priority: "Important",
    syntax: "=LOG10(number)",
    description: "Returns the base-10 logarithm of a number.",
    example: "=LOG10(1000)",
    result: "3",
    useCase: "Order-of-magnitude scaling and financial ratios.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },

  // ------------------------------------------------------------------------
  // 4. LOOKUP & REFERENCE (5 Functions)
  // ------------------------------------------------------------------------
  {
    name: "XMATCH",
    category: "Lookup & Reference",
    priority: "Essential",
    syntax: "=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])",
    description: "Returns the relative position of an item in an array. Supports exact match, wildcard, and reverse search.",
    example: "=XMATCH(\"East\", RegionList)",
    result: "3",
    useCase: "Modern dynamic row/column index matching paired with INDEX or CHOOSEROWS.",
    mappedModule: "002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup"
  },
  {
    name: "CHOOSE",
    category: "Lookup & Reference",
    priority: "Essential",
    syntax: "=CHOOSE(index_num, value1, [value2], ...)",
    description: "Uses index_num to return a value from a list of value arguments.",
    example: "=CHOOSE(2, \"Q1\", \"Q2\", \"Q3\", \"Q4\")",
    result: "Q2",
    useCase: "Financial scenario modeling (Base, Bull, Bear case switching) and custom quarter labeling.",
    mappedModule: "003_003_what-if-analysis-and-scenario-planning"
  },
  {
    name: "ADDRESS",
    category: "Lookup & Reference",
    priority: "Essential",
    syntax: "=ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_text])",
    description: "Creates a cell reference as text, given specified row and column numbers.",
    example: "=ADDRESS(4, 2, 1)",
    result: "$B$4",
    useCase: "Dynamic range construction, formula auditing, and generating cell coordinate text.",
    mappedModule: "002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup"
  },
  {
    name: "AREAS",
    category: "Lookup & Reference",
    priority: "Optional",
    syntax: "=AREAS(reference)",
    description: "Returns the number of contiguous ranges in a reference.",
    example: "=AREAS((A1:B5, C1:D5))",
    result: "2",
    useCase: "Validating multi-selection cell inputs in VBA macros or complex model checks.",
    mappedModule: "002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup"
  },
  {
    name: "HYPERLINK",
    category: "Lookup & Reference",
    priority: "Important",
    syntax: "=HYPERLINK(link_location, [friendly_name])",
    description: "Creates a shortcut or jump that opens a document stored on a network server, intranet, or the Internet.",
    example: "=HYPERLINK(\"#'EX101'!A1\", \"🔗 Jump to EX101\")",
    result: "🔗 Jump to EX101",
    useCase: "Building interactive workbook directories and Overview landing sheets.",
    mappedModule: "001_001_getting-started-with-excel"
  },

  // ------------------------------------------------------------------------
  // 5. INFORMATION (14 Functions)
  // ------------------------------------------------------------------------
  {
    name: "ISTEXT",
    category: "Information",
    priority: "Essential",
    syntax: "=ISTEXT(value)",
    description: "Checks whether a value is text, and returns TRUE or FALSE.",
    example: "=ISTEXT(A4)",
    result: "TRUE",
    useCase: "Data validation audits to catch text-stored numbers before feeding into math formulas.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "ISNONTEXT",
    category: "Information",
    priority: "Important",
    syntax: "=ISNONTEXT(value)",
    description: "Checks whether a value is not text (blank cells are nontext).",
    example: "=ISNONTEXT(150)",
    result: "TRUE",
    useCase: "Filtering out text annotations from numerical audit columns.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "ISLOGICAL",
    category: "Information",
    priority: "Important",
    syntax: "=ISLOGICAL(value)",
    description: "Checks whether a value is a logical value (TRUE or FALSE).",
    example: "=ISLOGICAL(A4>10)",
    result: "TRUE",
    useCase: "Audit checks on conditional boolean rule flags.",
    mappedModule: "002_003_conditional-logic-with-if-and-related-functions"
  },
  {
    name: "ISREF",
    category: "Information",
    priority: "Important",
    syntax: "=ISREF(value)",
    description: "Checks whether a value is a valid cell reference.",
    example: "=ISREF(B4:B10)",
    result: "TRUE",
    useCase: "Validating dynamic reference inputs inside custom LAMBDA functions.",
    mappedModule: "004_003_custom-functions-with-lambda-and-helper-engines"
  },
  {
    name: "ISFORMULA",
    category: "Information",
    priority: "Essential",
    syntax: "=ISFORMULA(reference)",
    description: "Checks whether a cell contains a formula, returning TRUE or FALSE.",
    example: "=ISFORMULA(C4)",
    result: "TRUE",
    useCase: "Wall Street audit checks to ensure financial model input cells contain hardcoded numbers while output cells contain formulas.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "TYPE",
    category: "Information",
    priority: "Essential",
    syntax: "=TYPE(value)",
    description: "Returns a code representing the data type of a value (1=Number, 2=Text, 4=Logical, 16=Error, 64=Array).",
    example: "=TYPE(A4)",
    result: "1",
    useCase: "Inspecting data type mismatches in automated ETL pipelines.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "ERROR.TYPE",
    category: "Information",
    priority: "Important",
    syntax: "=ERROR.TYPE(error_val)",
    description: "Returns a number corresponding to an error type (1=#NULL!, 2=#DIV/0!, 3=#VALUE!, 4=#REF!, 7=#N/A).",
    example: "=ERROR.TYPE(A4)",
    result: "7",
    useCase: "Specific exception handling in financial reporting formulas.",
    mappedModule: "002_003_conditional-logic-with-if-and-related-functions"
  },
  {
    name: "FORMULATEXT",
    category: "Information",
    priority: "Essential",
    syntax: "=FORMULATEXT(reference)",
    description: "Returns a formula as a text string from a given reference.",
    example: "=FORMULATEXT(C4)",
    result: "=SUM(B4:B10)",
    useCase: "Creating transparent model documentation sheets and student step-by-step formula walkthroughs.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "ISEVEN",
    category: "Information",
    priority: "Important",
    syntax: "=ISEVEN(number)",
    description: "Returns TRUE if the number is even, or FALSE if odd.",
    example: "=ISEVEN(44)",
    result: "TRUE",
    useCase: "Alternating row formatting rules and batch processing parity checks.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "ISODD",
    category: "Information",
    priority: "Important",
    syntax: "=ISODD(number)",
    description: "Returns TRUE if the number is odd, or FALSE if even.",
    example: "=ISODD(45)",
    result: "TRUE",
    useCase: "Bespoke schedule rotations and odd-even license plate filters.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "NA",
    category: "Information",
    priority: "Important",
    syntax: "=NA()",
    description: "Returns the error value #N/A (value not available).",
    example: "=NA()",
    result: "#N/A",
    useCase: "Forcing charts to skip missing data points without plotting artificial zero values.",
    mappedModule: "001_004_basic-charts-and-visualizations"
  },
  {
    name: "N",
    category: "Information",
    priority: "Optional",
    syntax: "=N(value)",
    description: "Converts a non-number value to a number, dates to serial numbers, and text to 0.",
    example: "=N(\"Text\")",
    result: "0",
    useCase: "Adding inline text comments inside complex formulas e.g. `=SUM(A1:A5) + N(\"Audit note\")`.",
    mappedModule: "001_003_basic-formulas-and-functions"
  },
  {
    name: "CELL",
    category: "Information",
    priority: "Important",
    syntax: "=CELL(info_type, [reference])",
    description: "Returns information about the formatting, location, or contents of a cell.",
    example: "=CELL(\"filename\", A1)",
    result: "C:\Workbook.xlsx[Sheet1]",
    useCase: "Extracting current worksheet tab name dynamically in header title formulas.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "INFO",
    category: "Information",
    priority: "Optional",
    syntax: "=INFO(type_text)",
    description: "Returns information about the current operating environment (e.g. Excel version, OS version).",
    example: "=INFO(\"release\")",
    result: "16.0",
    useCase: "System capability checks in enterprise template workbooks.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },

  // ------------------------------------------------------------------------
  // 6. LOGICAL (1 Function)
  // ------------------------------------------------------------------------
  {
    name: "XOR",
    category: "Logical",
    priority: "Important",
    syntax: "=XOR(logical1, [logical2], ...)",
    description: "Returns a Logical Exclusive OR of all arguments (TRUE if an odd number of conditions are met).",
    example: "=XOR(A4>10, B4>10)",
    result: "TRUE",
    useCase: "Exclusive authorization checks where exactly one approval path must be active, not both.",
    mappedModule: "002_003_conditional-logic-with-if-and-related-functions"
  },

  // ------------------------------------------------------------------------
  // 7. DATE & TIME (12 Functions)
  // ------------------------------------------------------------------------
  {
    name: "TIME",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=TIME(hour, minute, second)",
    description: "Returns the decimal number for a particular time serial.",
    example: "=TIME(14, 30, 0)",
    result: "0.604167 (2:30 PM)",
    useCase: "Constructing time timestamps for shift registers and attendance logs.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "TIMEVALUE",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=TIMEVALUE(time_text)",
    description: "Converts a time in the form of text to a time serial number.",
    example: "=TIMEVALUE(\"02:30 PM\")",
    result: "0.604167",
    useCase: "Converting text-exported punch clock times into numeric time serials for elapsed time math.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "HOUR",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=HOUR(serial_number)",
    description: "Returns the hour of a time value, as an integer from 0 (12:00 A.M.) to 23 (11:00 P.M.).",
    example: "=HOUR(NOW())",
    result: "14",
    useCase: "Categorizing call center traffic or hourly sales trends.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "MINUTE",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=MINUTE(serial_number)",
    description: "Returns the minute of a time value, as an integer from 0 to 59.",
    example: "=MINUTE(NOW())",
    result: "30",
    useCase: "Duration logging and SLA response time analysis.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "SECOND",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=SECOND(serial_number)",
    description: "Returns the second of a time value, as an integer from 0 to 59.",
    example: "=SECOND(NOW())",
    result: "45",
    useCase: "High-precision process timing logs.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "EDATE",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=EDATE(start_date, months)",
    description: "Returns the serial number of the date that is the indicated number of months before or after the start date.",
    example: "=EDATE(TODAY(), 6)",
    result: "46200 (formatted date)",
    useCase: "Calculating EMI due dates, passport expiry dates, and contract renewal milestones.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "EOMONTH",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=EOMONTH(start_date, months)",
    description: "Returns the serial number of the last day of the month before or after a specified number of months.",
    example: "=EOMONTH(TODAY(), 0)",
    result: "Last day of current month",
    useCase: "Corporate financial accounting month-end closing dates and GST filing deadlines.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "DAYS",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=DAYS(end_date, start_date)",
    description: "Returns the number of days between two dates.",
    example: "=DAYS(\"31-Dec-2026\", \"01-Jan-2026\")",
    result: "364",
    useCase: "Invoice aging analysis (30/60/90 days overdue) and project turnaround time.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "DAYS360",
    category: "Date & Time",
    priority: "Important",
    syntax: "=DAYS360(start_date, end_date, [method])",
    description: "Calculates the number of days between two dates based on a 360-day year (12 30-day months).",
    example: "=DAYS360(\"01-Jan-2026\", \"31-Dec-2026\")",
    result: "360",
    useCase: "Corporate bond interest accruals and commercial accounting standards.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "WEEKDAY",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=WEEKDAY(serial_number, [return_type])",
    description: "Returns a number representing the day of the week of a date (1=Sunday..7=Saturday, or 1=Monday..7=Sunday).",
    example: "=WEEKDAY(TODAY(), 2)",
    result: "1 (Monday)",
    useCase: "Weekend surcharge logic and automated employee shift rosters.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "WEEKNUM",
    category: "Date & Time",
    priority: "Essential",
    syntax: "=WEEKNUM(serial_number, [return_type])",
    description: "Returns the week number of a specific date in a year.",
    example: "=WEEKNUM(TODAY())",
    result: "35",
    useCase: "Weekly sales performance reporting and factory production planning.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "ISOWEEKNUM",
    category: "Date & Time",
    priority: "Important",
    syntax: "=ISOWEEKNUM(date)",
    description: "Returns the ISO 8601 week number of the year for a given date.",
    example: "=ISOWEEKNUM(TODAY())",
    result: "35",
    useCase: "International supply chain calendar alignment.",
    mappedModule: "002_002_text-date-and-time-functions"
  },

  // ------------------------------------------------------------------------
  // 8. TEXT (9 Functions)
  // ------------------------------------------------------------------------
  {
    name: "EXACT",
    category: "Text",
    priority: "Essential",
    syntax: "=EXACT(text1, text2)",
    description: "Checks whether two text strings are exactly identical, including case sensitivity.",
    example: "=EXACT(\"ACCOTAX\", \"accotax\")",
    result: "FALSE",
    useCase: "Case-sensitive password validation, SKU code verification, and security checks.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "CHAR",
    category: "Text",
    priority: "Important",
    syntax: "=CHAR(number)",
    description: "Returns the character specified by a number from the ANSI/ASCII character set.",
    example: "=CHAR(10)",
    result: "[Line Break]",
    useCase: "Inserting in-cell line breaks (`CHAR(10)`) or bullet points (`CHAR(149)`) in dynamic formulas.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "CODE",
    category: "Text",
    priority: "Important",
    syntax: "=CODE(text)",
    description: "Returns a numeric code for the first character in a text string.",
    example: "=CODE(\"A\")",
    result: "65",
    useCase: "Inspecting non-printing hidden ASCII characters (like non-breaking space 160).",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "UNICHAR",
    category: "Text",
    priority: "Important",
    syntax: "=UNICHAR(number)",
    description: "Returns the Unicode character that is referenced by the given numeric value.",
    example: "=UNICHAR(8377)",
    result: "₹",
    useCase: "Inserting special symbols e.g. Indian Rupee `UNICHAR(8377)` or checkmarks `UNICHAR(10004)` dynamically.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "UNICODE",
    category: "Text",
    priority: "Important",
    syntax: "=UNICODE(text)",
    description: "Returns the number (code point) corresponding to the first character of the text.",
    example: "=UNICODE(\"₹\")",
    result: "8377",
    useCase: "Unicode character inspection for multi-lingual text payloads.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "REPT",
    category: "Text",
    priority: "Essential",
    syntax: "=REPT(text, number_times)",
    description: "Repeats text a given number of times.",
    example: "=REPT(\"★\", 4)",
    result: "★★★★",
    useCase: "Creating in-cell visual bar charts e.g. `=REPT(\"|\", Sales/1000)` and star rating systems.",
    mappedModule: "001_004_basic-charts-and-visualizations"
  },
  {
    name: "FIXED",
    category: "Text",
    priority: "Optional",
    syntax: "=FIXED(number, [decimals], [no_commas])",
    description: "Rounds a number to the specified number of decimals, formats the result as text using a period and commas.",
    example: "=FIXED(12345.678, 2)",
    result: "\"12,345.68\"",
    useCase: "Concatenating formatted numbers inside text strings e.g. `=\"Total: \" & FIXED(A1, 2)`.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "DOLLAR",
    category: "Text",
    priority: "Optional",
    syntax: "=DOLLAR(number, [decimals])",
    description: "Converts a number to text using currency format ($).",
    example: "=DOLLAR(1250)",
    result: "\"$1,250.00\"",
    useCase: "Quick text conversion for international USD reporting strings.",
    mappedModule: "002_002_text-date-and-time-functions"
  },
  {
    name: "BAHTTEXT",
    category: "Text",
    priority: "Optional",
    syntax: "=BAHTTEXT(number)",
    description: "Converts a number to Thai text and adds a suffix of 'Baht'.",
    example: "=BAHTTEXT(100)",
    result: "Text payload",
    useCase: "Specialized Thai currency invoice reporting.",
    mappedModule: "002_002_text-date-and-time-functions"
  },

  // ------------------------------------------------------------------------
  // 9. STATISTICS (10 Functions)
  // ------------------------------------------------------------------------
  {
    name: "FREQUENCY",
    category: "Statistics",
    priority: "Essential",
    syntax: "=FREQUENCY(data_array, bins_array)",
    description: "Calculates how often values occur within a range of values, and returns a vertical array.",
    example: "=FREQUENCY(Scores, Bins)",
    result: "[Spilled Vertical Histogram]",
    useCase: "Building grade distribution curves, mark brackets, and statistical histograms.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "GEOMEAN",
    category: "Statistics",
    priority: "Important",
    syntax: "=GEOMEAN(number1, [number2], ...)",
    description: "Returns the geometric mean of an array or range of positive data.",
    example: "=GEOMEAN(1.10, 1.08, 1.15) - 1",
    result: "10.98%",
    useCase: "Calculating compound annual growth rate (CAGR) and multi-year investment portfolio returns.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "HARMEAN",
    category: "Statistics",
    priority: "Important",
    syntax: "=HARMEAN(number1, [number2], ...)",
    description: "Returns the harmonic mean of a data set.",
    example: "=HARMEAN(40, 60)",
    result: "48",
    useCase: "Average speed calculations and price-to-earnings (P/E) ratio averages in financial analytics.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "TRIMMEAN",
    category: "Statistics",
    priority: "Important",
    syntax: "=TRIMMEAN(array, percent)",
    description: "Returns the mean of the interior of a data set, excluding outliers.",
    example: "=TRIMMEAN(Scores, 0.2)",
    result: "84.5",
    useCase: "Calculating robust average performance score by removing top 10% and bottom 10% outliers.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "AVEDEV",
    category: "Statistics",
    priority: "Important",
    syntax: "=AVEDEV(number1, [number2], ...)",
    description: "Returns the average of the absolute deviations of data points from their mean.",
    example: "=AVEDEV(C4:C30)",
    result: "12.45",
    useCase: "Measuring dispersion and consistency in production quality control.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "DEVSQ",
    category: "Statistics",
    priority: "Important",
    syntax: "=DEVSQ(number1, [number2], ...)",
    description: "Returns the sum of squares of deviations of data points from their sample mean.",
    example: "=DEVSQ(C4:C30)",
    result: "1450.8",
    useCase: "Variance analysis component in statistical hypothesis testing.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "SKEW",
    category: "Statistics",
    priority: "Important",
    syntax: "=SKEW(number1, [number2], ...)",
    description: "Returns the skewness of a distribution (asymmetry around the mean).",
    example: "=SKEW(RevenueList)",
    result: "0.85",
    useCase: "Determining whether sales or income distributions are right-skewed or left-skewed.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "SKEW.P",
    category: "Statistics",
    priority: "Important",
    syntax: "=SKEW.P(number1, [number2], ...)",
    description: "Returns the skewness of a distribution based on an entire population.",
    example: "=SKEW.P(PopulationData)",
    result: "0.82",
    useCase: "Population-wide asymmetry metrics in census or complete audit datasets.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "KURT",
    category: "Statistics",
    priority: "Important",
    syntax: "=KURT(number1, [number2], ...)",
    description: "Returns the kurtosis of a data set (peakedness or tail thickness of distribution).",
    example: "=KURT(StockReturns)",
    result: "3.12",
    useCase: "Fat-tail risk evaluation in financial risk management (identifying extreme market events).",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "STANDARDIZE",
    category: "Statistics",
    priority: "Important",
    syntax: "=STANDARDIZE(x, mean, standard_dev)",
    description: "Returns a normalized value (Z-score) from a distribution characterized by mean and standard_dev.",
    example: "=STANDARDIZE(85, 70, 10)",
    result: "1.5",
    useCase: "Converting student test marks or candidate metrics into standardized Z-scores.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },

  // ------------------------------------------------------------------------
  // 10. STATISTICAL TESTING (4 Functions)
  // ------------------------------------------------------------------------
  {
    name: "Z.TEST",
    category: "Statistical Testing",
    priority: "Advanced",
    syntax: "=Z.TEST(array, x, [sigma])",
    description: "Returns the one-tailed probability value of a z-test.",
    example: "=Z.TEST(SampleData, 75)",
    result: "0.042",
    useCase: "Determining whether a sample mean significantly exceeds a benchmark threshold.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "T.TEST",
    category: "Statistical Testing",
    priority: "Advanced",
    syntax: "=T.TEST(array1, array2, tails, type)",
    description: "Returns the probability associated with a Student's t-test.",
    example: "=T.TEST(BeforeTraining, AfterTraining, 2, 1)",
    result: "0.008",
    useCase: "Comparing pre-training vs post-training performance metrics for statistical significance.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "F.TEST",
    category: "Statistical Testing",
    priority: "Advanced",
    syntax: "=F.TEST(array1, array2)",
    description: "Returns the result of an F-test (the two-tailed probability that variances in two samples are not significantly different).",
    example: "=F.TEST(MachineA, MachineB)",
    result: "0.154",
    useCase: "Comparing production line consistency across two manufacturing plants.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "CHISQ.TEST",
    category: "Statistical Testing",
    priority: "Advanced",
    syntax: "=CHISQ.TEST(actual_range, expected_range)",
    description: "Returns the test for independence (Chi-square test statistic).",
    example: "=CHISQ.TEST(ActualObserved, ExpectedModel)",
    result: "0.031",
    useCase: "A/B testing evaluation and demographic independence testing.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },

  // ------------------------------------------------------------------------
  // 11. REGRESSION & COVARIANCE (6 Functions)
  // ------------------------------------------------------------------------
  {
    name: "COVARIANCE.S",
    category: "Regression & Covariance",
    priority: "Advanced",
    syntax: "=COVARIANCE.S(array1, array2)",
    description: "Returns sample covariance, the average of the products of deviations for each data point pair.",
    example: "=COVARIANCE.S(AdSpend, Revenue)",
    result: "45800.5",
    useCase: "Measuring co-movement between marketing expenditure and sales revenue.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "COVARIANCE.P",
    category: "Regression & Covariance",
    priority: "Advanced",
    syntax: "=COVARIANCE.P(array1, array2)",
    description: "Returns population covariance.",
    example: "=COVARIANCE.P(MarketReturn, StockReturn)",
    result: "0.0245",
    useCase: "Portfolio Beta calculation in financial asset pricing models (CAPM).",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "SLOPE",
    category: "Regression & Covariance",
    priority: "Important",
    syntax: "=SLOPE(known_y's, known_x's)",
    description: "Returns the slope of the linear regression line through data points in known_y's and known_x's.",
    example: "=SLOPE(Sales, AdSpend)",
    result: "4.25",
    useCase: "Determining incremental sales generated per rupee spent on advertising.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "INTERCEPT",
    category: "Regression & Covariance",
    priority: "Important",
    syntax: "=INTERCEPT(known_y's, known_x's)",
    description: "Calculates the point at which a line will intersect the y-axis by using existing x-values and y-values.",
    example: "=INTERCEPT(Sales, AdSpend)",
    result: "150000",
    useCase: "Estimating baseline fixed sales when advertising spend is zero.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "RSQ",
    category: "Regression & Covariance",
    priority: "Important",
    syntax: "=RSQ(known_y's, known_x's)",
    description: "Returns the square of the Pearson product moment correlation coefficient (R-squared).",
    example: "=RSQ(Sales, AdSpend)",
    result: "0.892",
    useCase: "Evaluating regression model explanatory power (89.2% of sales variation explained by ad spend).",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },
  {
    name: "STEYX",
    category: "Regression & Covariance",
    priority: "Advanced",
    syntax: "=STEYX(known_y's, known_x's)",
    description: "Returns the standard error of the predicted y-value for each x in the regression.",
    example: "=STEYX(Sales, AdSpend)",
    result: "12400",
    useCase: "Evaluating forecast error confidence intervals in econometric modeling.",
    mappedModule: "002_004_statistical-functions-for-data-analysis"
  },

  // ------------------------------------------------------------------------
  // 12. DYNAMIC ARRAY (1 Function)
  // ------------------------------------------------------------------------
  {
    name: "EXPAND",
    category: "Dynamic Array",
    priority: "Essential",
    syntax: "=EXPAND(array, rows, [columns], [pad_with])",
    description: "Expands or pads an array to specified row and column dimensions.",
    example: "=EXPAND(A4:B10, 10, 3, \"N/A\")",
    result: "[Spilled Padded Grid Matrix]",
    useCase: "Standardizing dynamic array dimensions before merging grids with VSTACK or HSTACK.",
    mappedModule: "004_002_next-gen-array-reshaping-and-grid-transformation"
  },

  // ------------------------------------------------------------------------
  // 13. DATABASE (7 Functions)
  // ------------------------------------------------------------------------
  {
    name: "DSUM",
    category: "Database",
    priority: "Important",
    syntax: "=DSUM(database, field, criteria)",
    description: "Adds the numbers in a field (column) of records in a list or database that match conditions specified in a criteria range.",
    example: "=DSUM(DataList, \"Revenue\", CriteriaRange)",
    result: "₹ 14,50,000.00",
    useCase: "High-speed database querying using dedicated Criteria ranges.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "DCOUNT",
    category: "Database",
    priority: "Important",
    syntax: "=DCOUNT(database, field, criteria)",
    description: "Counts the cells that contain numbers in a column of records in a list or database that match conditions.",
    example: "=DCOUNT(DataList, \"Amount\", CriteriaRange)",
    result: "42",
    useCase: "Counting numeric database records matching complex multi-column criteria.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "DCOUNTA",
    category: "Database",
    priority: "Important",
    syntax: "=DCOUNTA(database, field, criteria)",
    description: "Counts non-blank cells in a field of records in a database that match specified criteria.",
    example: "=DCOUNTA(DataList, \"ClientName\", CriteriaRange)",
    result: "58",
    useCase: "Counting non-blank text records in structured database ranges.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "DAVERAGE",
    category: "Database",
    priority: "Important",
    syntax: "=DAVERAGE(database, field, criteria)",
    description: "Averages the values in a column of records in a list or database that match conditions.",
    example: "=DAVERAGE(DataList, \"Salary\", CriteriaRange)",
    result: "₹ 65,000.00",
    useCase: "Extracting criteria-filtered average metrics from structured ledgers.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "DMAX",
    category: "Database",
    priority: "Important",
    syntax: "=DMAX(database, field, criteria)",
    description: "Returns the largest number in a field of records in a database that matches conditions.",
    example: "=DMAX(DataList, \"Sales\", CriteriaRange)",
    result: "₹ 4,50,000.00",
    useCase: "Locating top regional sales records from structured database tables.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "DMIN",
    category: "Database",
    priority: "Important",
    syntax: "=DMIN(database, field, criteria)",
    description: "Returns the smallest number in a field of records in a database that matches conditions.",
    example: "=DMIN(DataList, \"Cost\", CriteriaRange)",
    result: "₹ 1,200.00",
    useCase: "Finding minimum vendor price quote across multi-attribute criteria.",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },
  {
    name: "DGET",
    category: "Database",
    priority: "Important",
    syntax: "=DGET(database, field, criteria)",
    description: "Extracts a single record from a database that matches specified criteria.",
    example: "=DGET(DataList, \"Email\", CriteriaRange)",
    result: "sukanta@codernaccotax.co.in",
    useCase: "Single record database extraction (returns #NUM! if multiple matches exist).",
    mappedModule: "003_002_data-validation-protection-and-cleaning-techniques"
  },

  // ------------------------------------------------------------------------
  // 14. FINANCIAL (7 Functions)
  // ------------------------------------------------------------------------
  {
    name: "FV",
    category: "Financial",
    priority: "Essential",
    syntax: "=FV(rate, nper, pmt, [pv], [type])",
    description: "Returns the future value of an investment based on periodic, constant payments and a constant interest rate.",
    example: "=FV(8%/12, 120, -10000, 0)",
    result: "₹ 18,29,460.40",
    useCase: "SIP (Systematic Investment Plan) future wealth accumulation modeling.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "RATE",
    category: "Financial",
    priority: "Essential",
    syntax: "=RATE(nper, pmt, pv, [fv], [type], [guess])",
    description: "Returns the interest rate per period of an annuity.",
    example: "=RATE(36, -15000, 450000) * 12",
    result: "12.45%",
    useCase: "Calculating effective annual interest rate on bank loan products.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "NPER",
    category: "Financial",
    priority: "Essential",
    syntax: "=NPER(rate, pmt, pv, [fv], [type])",
    description: "Returns the number of periods for an investment based on periodic, constant payments and a constant interest rate.",
    example: "=NPER(10%/12, -20000, 500000)",
    result: "29.2 Months",
    useCase: "Calculating debt payoff timelines and retirement duration.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "RRI",
    category: "Financial",
    priority: "Advanced",
    syntax: "=RRI(nper, pv, fv)",
    description: "Returns an equivalent interest rate for the growth of an investment.",
    example: "=RRI(5, 100000, 180000)",
    result: "12.47%",
    useCase: "Computing CAGR (Compound Annual Growth Rate) directly without custom math power formulas.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "PDURATION",
    category: "Financial",
    priority: "Advanced",
    syntax: "=PDURATION(rate, pv, fv)",
    description: "Returns the number of periods required by an investment to reach a specified value.",
    example: "=PDURATION(0.08, 100000, 200000)",
    result: "9.01 Years",
    useCase: "Calculating investment doubling time (Rule of 72 exact verification).",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "ISPMT",
    category: "Financial",
    priority: "Advanced",
    syntax: "=ISPMT(rate, per, nper, pv)",
    description: "Calculates the interest paid during a specific period of an investment.",
    example: "=ISPMT(10%/12, 1, 36, 500000)",
    result: "₹ -4,166.67",
    useCase: "Evaluating straight-line principal reduction loan schedules.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  },
  {
    name: "FVSCHEDULE",
    category: "Financial",
    priority: "Advanced",
    syntax: "=FVSCHEDULE(principal, schedule)",
    description: "Returns the future value of an initial principal after applying a series of compound interest rates.",
    example: "=FVSCHEDULE(100000, {0.05, 0.07, 0.08})",
    result: "₹ 1,21,332.00",
    useCase: "Modeling investments with variable annual interest rate schedules.",
    mappedModule: "003_001_financial-functions-in-excel-basic-to-professional"
  }
];
