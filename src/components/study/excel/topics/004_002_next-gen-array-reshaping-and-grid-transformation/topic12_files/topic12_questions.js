// topic12_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 12
// Topic: Real-World Project: Converting Unformatted Multi-Column Bank Transaction Statements into Clean Tabular Data
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary objective of the Topic 12 Real-World Banking Project?",
    shortAnswer: "To build a fully automated, zero-VBA ETL pipeline that ingests raw unformatted multi-line bank statements and outputs a clean, sorted relational accounting ledger.",
    explanation: "This project integrates DROP, WRAPROWS, CHOOSECOLS, HSTACK, VSTACK, and SORT into a single unified dynamic array engine.",
    hint: "End-to-end automated bank statement sanitization pipeline.",
    level: "basic",
    codeExample: "End-to-End Dynamic Array ETL Pipeline"
  },
  {
    question: "Why do raw bank statement text dumps present challenges for corporate accountants?",
    shortAnswer: "Because transactions are exported as repeating multi-line vertical streams mixed with introductory metadata banners and trailing account disclaimers.",
    explanation: "Standard Excel tools like PivotTables cannot process unshaped vertical streams without first reshaping them into 2D relational tables.",
    hint: "Multi-line repeating records mixed with metadata banners.",
    level: "basic",
    codeExample: "Unstructured 1D Log Dump &rarr; Clean Relational Table"
  },
  {
    question: "Which function is used first in the pipeline to strip introductory bank account metadata headers?",
    shortAnswer: "DROP(RawStream, N)",
    explanation: "DROP removes the initial N metadata lines (e.g. Account Number, IFSC Code, Opening Balance) in memory before shaping.",
    hint: "DROP excludes top metadata lines.",
    level: "basic",
    codeExample: "=DROP(A1:A50, 4)"
  },
  {
    question: "How does WRAPROWS reconstruct the continuous bank transaction stream into a 4-column relational table?",
    shortAnswer: "By setting wrap_count=4 to unroll repeating 4-token packets [Txn_ID, Date, Narration, Amount] into distinct rows.",
    explanation: "WRAPROWS maps every 4 consecutive items in the 1D stream into columns 1 through 4 of each row.",
    hint: "WRAPROWS shapes repeating 4-field records into rows.",
    level: "moderate",
    codeExample: "=WRAPROWS(CleanStream, 4, \"-\")"
  },
  {
    question: "How is HSTACK used to attach calculated tax columns to the reshaped bank ledger?",
    shortAnswer: "=HSTACK(TableBody, CHOOSECOLS(TableBody, 4)*0.18, CHOOSECOLS(TableBody, 4)*1.18)",
    explanation: "HSTACK joins the original 4 transaction columns alongside dynamic 18% GST and Gross Invoiced amount vectors.",
    hint: "Attach dynamic calculation vectors using HSTACK.",
    level: "advanced",
    codeExample: "=HSTACK(Body, AmountCol*0.18, AmountCol*1.18)"
  },
  {
    question: "How is VSTACK used to attach both the master table header and the grand total footer in a single formula?",
    shortAnswer: "=VSTACK(HeaderRow, DataBodyWithTaxes, TotalFooterRow)",
    explanation: "VSTACK stacks the top column title ribbon, the middle dynamic data body, and the bottom grand-total summary line into 1 composite card.",
    hint: "Stack Header, Data Body, and Total Footer with VSTACK.",
    level: "advanced",
    codeExample: "=VSTACK(Header, Body, Footer)"
  },
  {
    question: "How does LET optimize the entire bank statement pipeline in Excel 365?",
    shortAnswer: "LET assigns intermediate calculation stages (dropped headers, wrapped matrix, tax columns) to variables, executing the pipeline in 1 C++ pass.",
    explanation: "Using LET prevents repetitive recalculation of the source stream, ensuring instantaneous sub-millisecond calculation speeds.",
    hint: "Cache pipeline stages in named LET variables.",
    level: "expert",
    codeExample: "=LET(raw, A2:A50, clean, DROP(raw, 2), body, WRAPROWS(clean, 4), ...)"
  },
  {
    question: "What happens if a bank transaction is corrupted and missing a narration line?",
    shortAnswer: "A phase shift occurs where subsequent records misalign across column boundaries.",
    explanation: "Because WRAPROWS relies on strict token periodicity (4 items per record), a missing item shifts all downstream tokens. Data must be sanitized before wrapping.",
    hint: "Missing tokens cause a stream phase shift.",
    level: "expert",
    codeExample: "Stream Periodicity Phase Shift Hazard"
  },
  {
    question: "How can you sanitize the raw bank stream to remove blank spacer rows before applying WRAPROWS?",
    shortAnswer: "=WRAPROWS(FILTER(RawStream, RawStream<>\"\"), 4, \"-\")",
    explanation: "Wrapping the source stream in FILTER(Stream, Stream<>\") strips blank delimiter rows dynamically in memory.",
    hint: "Filter out blanks with FILTER before WRAPROWS.",
    level: "advanced",
    codeExample: "=WRAPROWS(FILTER(A2:A100, A2:A100<>\"\"), 4, \"-\")"
  },
  {
    question: "How can CHOOSECOLS re-order the extracted bank fields into [Date, Txn_ID, Amount, Narration]?",
    shortAnswer: "=CHOOSECOLS(WrappedTable, 2, 1, 4, 3)",
    explanation: "Passing column indices (2, 1, 4, 3) reorganizes the extracted columns into the preferred chronological accounting schema.",
    hint: "Reorder columns using CHOOSECOLS indices.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(T, 2, 1, 4, 3)"
  },
  {
    question: "How does SORT rank the final sanitized bank ledger by Amount descending?",
    shortAnswer: "=SORT(SanitizedBody, 4, -1)",
    explanation: "SORT orders the final data matrix by Column 4 (Amount) in descending order (-1) to highlight highest-value transactions.",
    hint: "Sort on column 4 with sort_order = -1.",
    level: "moderate",
    codeExample: "=SORT(Body, 4, -1)"
  },
  {
    question: "What error occurs if the final composite bank report spills onto cells containing existing notes?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any non-empty cell in the output footprint halts execution and triggers a #SPILL! error.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can you dynamically categorize bank transactions (e.g. 'UPI', 'NEFT', 'Card') using dynamic array formulas?",
    shortAnswer: "=IFS(ISNUMBER(SEARCH(\"UPI\", NarrationCol)), \"UPI\", ISNUMBER(SEARCH(\"NEFT\", NarrationCol)), \"NEFT\", TRUE, \"Other\")",
    explanation: "Vectorized IFS with SEARCH inspects the narration column dynamically across all rows and returns the payment channel.",
    hint: "Use IFS with SEARCH on the narration column.",
    level: "advanced",
    codeExample: "=IFS(ISNUMBER(SEARCH(\"UPI\", C2#)), \"UPI\", TRUE, \"Other\")"
  },
  {
    question: "How does this dynamic array pipeline compare to legacy VBA banking import macros?",
    shortAnswer: "It is 100% macro-free, works on Excel for Web and Mac, updates instantly in real time, and is immune to macro security blocks.",
    explanation: "Dynamic array formulas run in native compiled C++ within the core Excel calculation tree without COM security prompts.",
    hint: "Zero VBA, cross-platform, live recalculation.",
    level: "expert",
    codeExample: "Modern Dynamic Array vs Legacy VBA"
  },
  {
    question: "How do you calculate the total deposit sum dynamically from the sanitized spilled table (e.g. C2#)?",
    shortAnswer: "=SUM(CHOOSECOLS(C2#, 4))",
    explanation: "Extracting the Amount column with CHOOSECOLS and wrapping in SUM computes the true total.",
    hint: "Extract column with CHOOSECOLS and sum.",
    level: "basic",
    codeExample: "=SUM(CHOOSECOLS(C2#, 4))"
  },
  {
    question: "How can you format the extracted Amount column as Indian Rupee currency in Excel?",
    shortAnswer: "Apply the custom number format: [$\u20B9-en-IN] #,##0.00",
    explanation: "Setting the Indian Rupee format displays numbers with appropriate lakh and crore comma separators.",
    hint: "Use Indian Rupee number formatting: ₹#,##0.00.",
    level: "basic",
    codeExample: "[₹-en-IN] #,##0.00"
  },
  {
    question: "Can this pipeline process multiple bank accounts from different branches simultaneously?",
    shortAnswer: "Yes, by wrapping each branch pipeline in VSTACK to build a consolidated master ledger.",
    explanation: "Writing =VSTACK(Pipeline(BK_Bank), Pipeline(SH_Bank)) consolidates multiple banking feeds in 1 model.",
    hint: "Consolidate multiple feeds using VSTACK.",
    level: "advanced",
    codeExample: "=VSTACK(Bank1_Pipeline, Bank2_Pipeline)"
  },
  {
    question: "How can you filter the sanitized bank ledger to show only transactions above \u20B950,000?",
    shortAnswer: "=FILTER(SanitizedLedger, CHOOSECOLS(SanitizedLedger, 4) > 50000)",
    explanation: "FILTER extracts only records where the Amount column exceeds ₹50,000.",
    hint: "Filter on the Amount column using FILTER.",
    level: "moderate",
    codeExample: "=FILTER(Ledger#, CHOOSECOLS(Ledger#, 4)>50000)"
  },
  {
    question: "How does DROP prevent double-counting when summing sanitized bank records that contain trailing bank summary footers?",
    shortAnswer: "By passing a negative integer (e.g. -2) to DROP to strip trailing footer lines from the bottom of the raw stream.",
    explanation: "DROP(Stream, , -2) strips the trailing summary rows before numbers enter calculation vectors.",
    hint: "Use DROP(-2) to exclude trailing summary rows.",
    level: "moderate",
    codeExample: "=DROP(RawStream, -2)"
  },
  {
    question: "Why is WRAPROWS preferred over WRAPCOLS for bank statement processing?",
    shortAnswer: "Because each banking transaction record is a set of fields that must form a single horizontal row across columns.",
    explanation: "WRAPROWS fills horizontally across columns, matching the standard tabular row format of accounting ledgers.",
    hint: "Records are structured as horizontal rows.",
    level: "basic",
    codeExample: "WRAPROWS creates horizontal record rows"
  },
  {
    question: "How can you attach an auto-incrementing serial number (Sl. No.) column to the sanitized bank table?",
    shortAnswer: "=HSTACK(SEQUENCE(ROWS(DataBody)), DataBody)",
    explanation: "SEQUENCE generates 1 to N matching the row count, and HSTACK attaches it as the leftmost column.",
    hint: "Generate numbers with SEQUENCE, then attach with HSTACK.",
    level: "moderate",
    codeExample: "=HSTACK(SEQUENCE(ROWS(Body)), Body)"
  },
  {
    question: "How does the pipeline handle dates formatted as text strings (e.g. '2024-08-15')?",
    shortAnswer: "Wrap the date column in DATEVALUE() or DATE(LEFT(), MID(), RIGHT()) inside LET to convert to serial date numbers.",
    explanation: "Converting text strings to true date numbers allows chronological sorting and dynamic date filtering.",
    hint: "Coerce date text to serial numbers using DATEVALUE.",
    level: "advanced",
    codeExample: "=DATEVALUE(CHOOSECOLS(Body, 2))"
  },
  {
    question: "How can you isolate only credit transactions vs debit transactions in the pipeline?",
    shortAnswer: "=FILTER(SanitizedLedger, ISNUMBER(SEARCH(\"CR\", CHOOSECOLS(SanitizedLedger, 3))))",
    explanation: "Searching for \"CR\" or \"DR\" tokens in the narration column extracts credit or debit subsets.",
    hint: "Search for CR/DR tags in narration with FILTER.",
    level: "moderate",
    codeExample: "=FILTER(Ledger#, ISNUMBER(SEARCH(\"CR\", NarrationCol)))"
  },
  {
    question: "What is the computational complexity of the entire banking pipeline in Excel 365?",
    shortAnswer: "O(N) linear time complexity with single-pass memory allocation in native C++.",
    explanation: "Because all reshaping operations execute as contiguous memory pointer transfers, calculation is instantaneous even for thousands of rows.",
    hint: "Linear O(N) execution in compiled C++.",
    level: "expert",
    codeExample: "O(N) Linear Time Pipeline"
  },
  {
    question: "How can you export the sanitized bank table directly to CSV or ERP accounting software?",
    shortAnswer: "Copy the dynamic spilled range (C2#) and paste as values, or reference C2# directly in Power BI / Python.",
    explanation: "The spilled output is a clean 2D table ready for direct CSV export or database ingestion.",
    hint: "Export spilled anchor C2# directly.",
    level: "basic",
    codeExample: "Export C2# to ERP / CSV"
  },
  {
    question: "How do you handle variable-length bank statement dumps where the row count changes every month?",
    shortAnswer: "Dynamic array references (e.g. A2# or Table1[Data]) automatically adapt their output dimensions to match incoming data.",
    explanation: "Unlike static formulas, dynamic array formulas expand and contract automatically as raw data grows.",
    hint: "Dynamic spilled arrays automatically adjust to data volume.",
    level: "basic",
    codeExample: "Auto-sizing Dynamic Spilled Arrays"
  },
  {
    question: "How can you verify that the grand total in the footer matches the sum of all individual data rows?",
    shortAnswer: "By evaluating =SUM(DataAmounts) against the raw opening/closing balance delta in the statement.",
    explanation: "Automated reconciliation formulas verify mathematical integrity before financial sign-off.",
    hint: "Reconcile SUM(Amounts) against bank statement balance.",
    level: "moderate",
    codeExample: "=SUM(Amounts) = BankStatementDelta"
  },
  {
    question: "What happens if [pad_with] is omitted in WRAPROWS during banking ingestion?",
    shortAnswer: "Any incomplete record at the end of the file will display #N/A errors in missing fields.",
    explanation: "Supplying an explicit fallback like \"-\" or \"MISSING_DATA\" prevents unsightly #N/A tags.",
    hint: "Always provide an explicit pad_with constant.",
    level: "basic",
    codeExample: "=WRAPROWS(Data, 4, \"MISSING\")"
  },
  {
    question: "How can the pipeline be wrapped into a reusable custom LAMBDA function in Excel?",
    shortAnswer: "=LAMBDA(raw_stream, LET(clean, DROP(raw_stream, 2), WRAPROWS(clean, 4, \"\")))",
    explanation: "Saving this formula in Name Manager creates a reusable =CLEAN_BANK_STATEMENT(Range) function.",
    hint: "Create a custom reusable function with LAMBDA.",
    level: "expert",
    codeExample: "=LAMBDA(stream, LET(c, DROP(stream, 2), WRAPROWS(c, 4, \"\")))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for real-world automated financial ETL pipelines?",
    shortAnswer: "Never touch raw bank files manually. Build a robust in-memory array pipeline using DROP, WRAPROWS, HSTACK, and VSTACK to guarantee 100% auditable, reproducible financial reconciliation.",
    explanation: "Manual copy-pasting, deleting rows, or editing transaction files destroys audit trails and introduces human error. An automated formula pipeline running in RAM ensures perfect data governance, zero-VBA security compliance, and instant recalculation upon data refresh!",
    hint: "Preserve raw data integrity; sanitize in RAM with dynamic array pipelines.",
    level: "expert",
    codeExample: "Enterprise Banking ETL Pipeline: =LET(raw, BankDump, clean, DROP(raw, 2), WRAPROWS(clean, 4, \"\"))"
  }
];

export default questions;
