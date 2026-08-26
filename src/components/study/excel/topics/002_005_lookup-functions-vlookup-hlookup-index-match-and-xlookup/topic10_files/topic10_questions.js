const questions = [
  {
    question: "What is the main advantage of INDEX-MATCH over VLOOKUP?",
    shortAnswer: "The ability to look up values to the left, plus better resilience to column changes.",
    explanation: "VLOOKUP only returns values from columns to the right. INDEX-MATCH can return from any column. Also, INDEX-MATCH does not rely on a hard‑coded column index, so inserting or deleting columns doesn't break it.",
    hint: "Think of VLOOKUP as a one‑way street; INDEX-MATCH as a freeway with exits on both sides.",
    level: "basic",
    codeExample: "=INDEX(A:A, MATCH(\"Swadeep\", B:B, 0)) returns ID from column A (left of name)."
  },
  {
    question: "Can VLOOKUP be modified to look left?",
    shortAnswer: "Not directly; you would need to rearrange columns or use CHOOSE to create a virtual array.",
    explanation: "You can use =VLOOKUP(value, CHOOSE({1,2}, left_column, lookup_column), 2, FALSE) but it's complex and fragile. INDEX-MATCH is much simpler for left lookups.",
    hint: "Stick with INDEX-MATCH for left lookups – it's cleaner.",
    level: "advanced",
    codeExample: "=VLOOKUP(E2, CHOOSE({1,2}, B:B, A:A), 2, FALSE) – awkward workaround."
  },
  {
    question: "Why does VLOOKUP break when columns are inserted?",
    shortAnswer: "Because VLOOKUP uses a hard‑coded column index number. When you insert a column, the index number now points to a different column.",
    explanation: "Example: =VLOOKUP(A2, B:D, 3, FALSE) returns column D (3rd column of range). Insert a column between B and C, the range becomes B:E, and col_index=3 now points to column D? Actually original column D becomes column E, causing wrong data. INDEX-MATCH uses direct column references, so it's unaffected.",
    hint: "INDEX-MATCH with =INDEX(D:D, ...) always looks at column D, even if columns are added.",
    level: "intermediate",
    codeExample: "VLOOKUP breaks; INDEX-MATCH survives column insertions."
  },
  {
    question: "Is INDEX-MATCH always faster than VLOOKUP?",
    shortAnswer: "Not always, but generally faster for large datasets, especially when using exact match.",
    explanation: "VLOOKUP scans the entire column range. INDEX-MATCH with MATCH(...,0) also scans, but you can limit the lookup_range to exactly the needed rows. On very large data (100k+ rows), INDEX-MATCH can be 10-20% faster.",
    hint: "Avoid whole‑column references (A:A) in both functions for large data.",
    level: "advanced",
    codeExample: "=INDEX(C2:C100000, MATCH(E2, A2:A100000, 0)) is faster than =VLOOKUP(E2, A2:C100000, 3, FALSE)."
  },
  {
    question: "How do you perform a two‑way lookup with INDEX-MATCH?",
    shortAnswer: "Use two MATCH functions – one for the row, one for the column.",
    explanation: "=INDEX(data_range, MATCH(row_value, row_labels, 0), MATCH(col_value, col_labels, 0)) returns the value at the intersection.",
    hint: "Think of it as coordinates: MATCH(row) gives Y, MATCH(column) gives X.",
    level: "intermediate",
    codeExample: "=INDEX(B2:E10, MATCH(\"Abhronila\", A2:A10, 0), MATCH(\"Science\", B1:E1, 0))"
  },
  {
    question: "Can VLOOKUP do two‑way lookups?",
    shortAnswer: "Only with complex workarounds like combining MATCH in col_index_num or using TRANSPOSE.",
    explanation: "You can use =VLOOKUP(row_value, table, MATCH(col_value, header_row, 0), FALSE) but this still requires the lookup column to be first. INDEX-MATCH is more straightforward.",
    hint: "INDEX-MATCH is the natural choice for matrix lookups.",
    level: "advanced",
    codeExample: "=VLOOKUP(A2, B2:F10, MATCH(\"Score\", B1:F1, 0), FALSE) – works but still limited."
  },
  {
    question: "Why do professionals prefer INDEX-MATCH in financial models?",
    shortAnswer: "Because financial models often change structure (rows/columns added) – INDEX-MATCH is more robust and auditable.",
    explanation: "Auditors and model reviewers can easily see which columns are being referenced. VLOOKUP's column index numbers are opaque and error‑prone when the model evolves.",
    hint: "INDEX-MATCH makes your formulas self‑documenting: =INDEX(Price, MATCH(Product, ID, 0)) is clearer than =VLOOKUP(Product, A:D, 4, 0).",
    level: "advanced",
    codeExample: "Use named ranges: =INDEX(PriceList, MATCH(ProductID, IDList, 0))"
  },
  {
    question: "What is the main disadvantage of INDEX-MATCH compared to VLOOKUP?",
    shortAnswer: "It is slightly more complex to learn and write, especially for beginners.",
    explanation: "VLOOKUP is a single function; INDEX-MATCH requires two functions nested. Also, VLOOKUP's column index is simpler for casual users. However, the benefits outweigh the learning curve for professionals.",
    hint: "Once you learn INDEX-MATCH, you'll rarely go back to VLOOKUP.",
    level: "basic",
    codeExample: "VLOOKUP: 1 function, 4 arguments. INDEX-MATCH: 2 functions, 3+ arguments."
  },
  {
    question: "Does INDEX-MATCH work with approximate match like VLOOKUP's TRUE?",
    shortAnswer: "Yes, use match_type = 1 in MATCH (requires sorted lookup range).",
    explanation: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 1)) performs the same approximate match as VLOOKUP with TRUE.",
    hint: "Same sorting rule applies – ascending order required.",
    level: "intermediate",
    codeExample: "=INDEX(GradeCol, MATCH(85, ScoreCol, 1)) returns the grade band for 85."
  },
  {
    question: "What happens if I use INDEX-MATCH with MATCH type 0 and the lookup value appears twice?",
    shortAnswer: "MATCH returns the first occurrence (topmost), same as VLOOKUP.",
    explanation: "Both functions stop at the first match when looking for exact matches. To get the last occurrence, you would need XMATCH or an array formula.",
    hint: "Ensure your lookup column has unique values for reliable results.",
    level: "basic",
    codeExample: "If 'John' appears twice, MATCH('John', A:A, 0) returns the row of the first John."
  },
  // Additional questions to reach 30 (pattern continues)
  {
    question: "Can INDEX-MATCH be used with wildcards?",
    shortAnswer: "Yes, same as VLOOKUP – use * and ? with match_type = 0.",
    explanation: "=INDEX(return, MATCH(\"*phone*\", lookup_range, 0)) finds first cell containing 'phone'.",
    hint: "Wildcards only work with exact match (match_type=0).",
    level: "advanced",
    codeExample: "=INDEX(C:C, MATCH(\"P10*\", A:A, 0)) returns first product starting with 'P10'."
  },
  {
    question: "How do you handle errors in INDEX-MATCH?",
    shortAnswer: "Wrap the entire formula in IFERROR.",
    explanation: "=IFERROR(INDEX(return, MATCH(lookup, range, 0)), \"Not found\") provides a clean output instead of #N/A.",
    hint: "Use IFNA (Excel 365) if you only want to catch #N/A.",
    level: "basic",
    codeExample: "=IFERROR(INDEX(D:D, MATCH(E2, A:A, 0)), \"Missing\")"
  },
  {
    question: "Why does my INDEX-MATCH return #N/A even though the value exists?",
    shortAnswer: "Likely data type mismatch, extra spaces, or the lookup_range does not include the row.",
    explanation: "Check with =EXACT(lookup_value, cell) to see if they are truly equal. Use TRIM() and VALUE() to clean.",
    hint: "Try =MATCH(lookup_value, lookup_range, 0) alone – if that returns #N/A, the problem is in MATCH.",
    level: "basic",
    codeExample: "=INDEX(C:C, MATCH(TRIM(A2), TRIM(B:B), 0)) – removes spaces from both sides."
  },
  {
    question: "Can INDEX-MATCH return multiple columns at once?",
    shortAnswer: "In Excel 365, yes using dynamic arrays; in older Excel, you need multiple formulas.",
    explanation: "In Excel 365, =INDEX(B2:D10, MATCH(E2, A2:A10, 0), 0) returns the entire row. For multiple columns, you can use =XLOOKUP or combine INDEX with SEQUENCE.",
    hint: "XLOOKUP is better for returning multiple columns.",
    level: "advanced",
    codeExample: "In Excel 365: =INDEX(B2:D10, MATCH(E2, A2:A10, 0), 0) spills across columns."
  },
  {
    question: "What is the difference between using INDEX-MATCH and XLOOKUP?",
    shortAnswer: "XLOOKUP is simpler and more powerful, but INDEX-MATCH works in all Excel versions.",
    explanation: "XLOOKUP(lookup_value, lookup_range, return_range) does exactly what INDEX-MATCH does. However, XLOOKUP is only available in Excel 2021 and 365. INDEX-MATCH is compatible back to Excel 2003.",
    hint: "Use INDEX-MATCH for backward compatibility; XLOOKUP for new workbooks.",
    level: "advanced",
    codeExample: "XLOOKUP(E2, A:A, C:C) is equivalent to INDEX(C:C, MATCH(E2, A:A, 0))."
  },
  // ... continue to 30
];

export default questions;