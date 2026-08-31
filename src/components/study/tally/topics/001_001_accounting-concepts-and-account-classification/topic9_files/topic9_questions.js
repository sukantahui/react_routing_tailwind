export default [
  {
    id: 1,
    question: "What is the very first step in the step-by-step transaction analysis workflow before passing a journal entry?",
    options: [
      "Identify the two or more specific accounts affected by the commercial transaction event",
      "Decide whether to print a paper receipt",
      "Calculate GST tax percentage in Excel",
      "Shut down the TallyPrime software"
    ],
    answer: "Identify the two or more specific accounts affected by the commercial transaction event",
    explanation: "Step 1 of transaction analysis requires identifying which accounts (e.g. Cash, Furniture, Rent, Subhash) are impacted by the event."
  },
  {
    id: 2,
    question: "What is Step 2 in the transaction analysis process?",
    options: [
      "Classify each identified account into Personal, Real, or Nominal (or Asset, Liability, Capital, Expense, Revenue)",
      "Print the invoice immediately",
      "Pass the voucher in Tally without checking balances",
      "Ask the bank manager for approval"
    ],
    answer: "Classify each identified account into Personal, Real, or Nominal (or Asset, Liability, Capital, Expense, Revenue)",
    explanation: "Step 2 classifies identified accounts into their respective traditional or modern accounting categories."
  },
  {
    id: 3,
    question: "What is Step 3 in the transaction analysis process?",
    options: [
      "Determine whether each account is increasing/decreasing (or receiving/giving, coming in/going out, expense/income)",
      "Post to ledger without journalizing",
      "Calculate employee salary",
      "Select voucher printer settings"
    ],
    answer: "Determine whether each account is increasing/decreasing (or receiving/giving, coming in/going out, expense/income)",
    explanation: "Step 3 evaluates the directional effect (increase/decrease, in/out) on each affected account."
  },
  {
    id: 4,
    question: "What is Step 4 in transaction analysis?",
    options: [
      "Apply the applicable accounting rule to assign Debit and Credit status to each account, ensuring Total Debit = Total Credit",
      "Discard source documents",
      "Close the accounting period",
      "Delete opening balances"
    ],
    answer: "Apply the applicable accounting rule to assign Debit and Credit status to each account, ensuring Total Debit = Total Credit",
    explanation: "Step 4 applies Golden or Modern rules to assign Debit and Credit, verifying the invariant Total Debit = Total Credit."
  },
  {
    id: 5,
    question: "Transaction Analysis: Business pays ₹10,000 cash for shop rent. Step 1 identifies Rent A/c and Cash A/c. How are they classified and debited/credited?",
    options: [
      "Rent (Nominal Expense) is Debited; Cash (Real Asset Going Out) is Credited",
      "Cash is Debited; Rent is Credited",
      "Rent is Credited; Landlord Personal is Debited",
      "Capital is Debited; Cash is Credited"
    ],
    answer: "Rent (Nominal Expense) is Debited; Cash (Real Asset Going Out) is Credited",
    explanation: "Rent is a nominal expense (Debit all expenses); Cash is a real asset going out (Credit what goes out)."
  },
  {
    id: 6,
    question: "Transaction Analysis: Purchased raw materials for ₹75,000 on credit from vendor 'Bengal Chemicals'. What accounts are affected and how?",
    options: [
      "Purchase A/c (Expense/Stock) is Debited ₹75,000; Bengal Chemicals A/c (Sundry Creditor Liability) is Credited ₹75,000",
      "Cash A/c is Debited; Purchase A/c is Credited",
      "Bengal Chemicals A/c is Debited; Sales A/c is Credited",
      "Purchase A/c is Credited; Bank A/c is Debited"
    ],
    answer: "Purchase A/c (Expense/Stock) is Debited ₹75,000; Bengal Chemicals A/c (Sundry Creditor Liability) is Credited ₹75,000",
    explanation: "Purchase expense increases (Debit Purchase); Creditor vendor liability increases (Credit Bengal Chemicals)."
  },
  {
    id: 7,
    question: "Transaction Analysis: Sold finished goods for ₹1,20,000 cash. What accounts are affected and how?",
    options: [
      "Cash A/c (Real Asset Coming In) is Debited ₹1,20,000; Sales A/c (Nominal Revenue Income) is Credited ₹1,20,000",
      "Sales A/c is Debited; Cash A/c is Credited",
      "Debtor A/c is Debited; Stock A/c is Credited",
      "Bank A/c is Debited; Capital A/c is Credited"
    ],
    answer: "Cash A/c (Real Asset Coming In) is Debited ₹1,20,000; Sales A/c (Nominal Revenue Income) is Credited ₹1,20,000",
    explanation: "Cash asset comes in (Debit Cash); Sales revenue increases (Credit Sales A/c)."
  },
  {
    id: 8,
    question: "Transaction Analysis: Sold goods for ₹90,000 on credit to customer 'Subhash Enterprise'. What accounts are affected and how?",
    options: [
      "Subhash Enterprise A/c (Sundry Debtor Asset) is Debited ₹90,000; Sales A/c (Revenue Income) is Credited ₹90,000",
      "Sales A/c is Debited; Subhash Enterprise A/c is Credited",
      "Cash A/c is Debited; Subhash Enterprise A/c is Credited",
      "Purchase A/c is Debited; Sales A/c is Credited"
    ],
    answer: "Subhash Enterprise A/c (Sundry Debtor Asset) is Debited ₹90,000; Sales A/c (Revenue Income) is Credited ₹90,000",
    explanation: "Customer debtor asset increases (Debit Subhash Enterprise); Sales turnover increases (Credit Sales)."
  },
  {
    id: 9,
    question: "Transaction Analysis: Received ₹90,000 cheque from Subhash Enterprise in full settlement. What is the voucher type in TallyPrime and entries affected?",
    options: [
      "F6 Receipt Voucher; Debit Bank A/c (Asset +) ₹90,000; Credit Subhash Enterprise A/c (Debtor Asset -) ₹90,000",
      "F5 Payment Voucher; Debit Subhash Enterprise; Credit Bank",
      "F4 Contra Voucher; Debit Cash; Credit Bank",
      "F7 Journal Voucher; Debit Sales; Credit Bank"
    ],
    answer: "F6 Receipt Voucher; Debit Bank A/c (Asset +) ₹90,000; Credit Subhash Enterprise A/c (Debtor Asset -) ₹90,000",
    explanation: "Receipt of customer cheque is recorded in F6 Receipt voucher: Debit Bank, Credit Debtor."
  },
  {
    id: 10,
    question: "Transaction Analysis: Paid ₹75,000 to vendor 'Bengal Chemicals' by NEFT bank transfer. What is the entry in TallyPrime?",
    options: [
      "F5 Payment Voucher; Debit Bengal Chemicals A/c (Creditor Liability -) ₹75,000; Credit Bank A/c (Asset -) ₹75,000",
      "F6 Receipt Voucher; Debit Bank; Credit Bengal Chemicals",
      "F4 Contra Voucher; Debit Cash; Credit Bank",
      "F8 Sales Voucher; Debit Bengal Chemicals; Credit Sales"
    ],
    answer: "F5 Payment Voucher; Debit Bengal Chemicals A/c (Creditor Liability -) ₹75,000; Credit Bank A/c (Asset -) ₹75,000",
    explanation: "Bank disbursement to vendor is recorded in F5 Payment voucher: Debit Creditor, Credit Bank."
  },
  {
    id: 11,
    question: "What is a Compound Journal Entry?",
    options: [
      "A journal entry involving more than one debit or more than one credit account for a single financial transaction event",
      "A journal entry that is recorded twice in error",
      "A journal entry written in foreign currency",
      "A journal entry that contains no numbers"
    ],
    answer: "A journal entry involving more than one debit or more than one credit account for a single financial transaction event",
    explanation: "Compound entries combine multiple debits or credits arising from a single transaction event (e.g. paying salary, rent, and electricity together)."
  },
  {
    id: 12,
    question: "Compound Entry Analysis: Business pays ₹30,000 Salary, ₹10,000 Rent, and ₹5,000 Electricity by a single cheque of ₹45,000. What is the correct entry?",
    options: [
      "Debit Salary A/c ₹30,000, Debit Rent A/c ₹10,000, Debit Electricity A/c ₹5,000; Credit Bank A/c ₹45,000",
      "Debit Bank A/c ₹45,000; Credit Expenses ₹45,000",
      "Debit Salary A/c ₹45,000; Credit Cash A/c ₹45,000",
      "Debit Capital A/c ₹45,000; Credit Bank A/c ₹45,000"
    ],
    answer: "Debit Salary A/c ₹30,000, Debit Rent A/c ₹10,000, Debit Electricity A/c ₹5,000; Credit Bank A/c ₹45,000",
    explanation: "Each individual nominal expense account is debited, and Bank asset is credited for the total payment of ₹45,000."
  },
  {
    id: 13,
    question: "Transaction Analysis: Paid ₹18,000 cash for 1-year trade insurance. What account is debited under accrual accounting if 6 months belong to next year?",
    options: [
      "Debit Insurance Expense A/c ₹9,000, Debit Prepaid Insurance Asset A/c ₹9,000; Credit Cash A/c ₹18,000",
      "Debit Cash A/c ₹18,000; Credit Insurance A/c ₹18,000",
      "Debit Capital A/c ₹18,000; Credit Bank A/c ₹18,000",
      "Debit Insurance Expense A/c ₹18,000 with no prepaid adjustment"
    ],
    answer: "Debit Insurance Expense A/c ₹9,000, Debit Prepaid Insurance Asset A/c ₹9,000; Credit Cash A/c ₹18,000",
    explanation: "Matching concept splits the ₹18,000 payment into current period expense (₹9,000) and prepaid asset (₹9,000)."
  },
  {
    id: 14,
    question: "Transaction Analysis: Owner withdraws ₹15,000 cash and goods worth ₹5,000 for personal family use. What is the compound entry?",
    options: [
      "Debit Drawings A/c ₹20,000; Credit Cash A/c ₹15,000, Credit Purchase A/c (Stock) ₹5,000",
      "Debit Cash A/c ₹20,000; Credit Drawings A/c ₹20,000",
      "Debit Sales A/c ₹20,000; Credit Drawings A/c ₹20,000",
      "Debit General Expenses A/c ₹20,000; Credit Bank A/c ₹20,000"
    ],
    answer: "Debit Drawings A/c ₹20,000; Credit Cash A/c ₹15,000, Credit Purchase A/c (Stock) ₹5,000",
    explanation: "Total personal withdrawal of ₹20,000 is debited to Drawings; Cash decreases by ₹15,000 and Purchase stock cost decreases by ₹5,000."
  },
  {
    id: 15,
    question: "Why is Purchase Account credited (instead of Sales) when the owner withdraws goods for personal use or distributes free samples?",
    options: [
      "Because goods are withdrawn at cost price, reducing the original cost of purchases made for business resale",
      "Because it represents a sale to a customer",
      "Because TallyPrime does not support Drawings entries",
      "Because free samples earn GST tax profit"
    ],
    answer: "Because goods are withdrawn at cost price, reducing the original cost of purchases made for business resale",
    explanation: "Goods taken for personal use or sample distribution are not sales; they reduce gross inventory cost (Purchase A/c) at cost price."
  },
  {
    id: 16,
    question: "Transaction Analysis: Purchased delivery vehicle for ₹6,00,000 by paying ₹1,00,000 cash down payment and financing ₹5,00,000 via vehicle loan from HDFC Bank. What is the entry?",
    options: [
      "Debit Motor Vehicle A/c ₹6,00,000; Credit Cash A/c ₹1,00,000, Credit HDFC Vehicle Loan A/c ₹5,00,000",
      "Debit Motor Vehicle A/c ₹6,00,000; Credit Cash A/c ₹6,00,000",
      "Debit Vehicle Loan A/c ₹5,00,000; Credit Motor Vehicle A/c ₹5,00,000",
      "Debit Expenses A/c ₹6,00,000; Credit Bank A/c ₹6,00,000"
    ],
    answer: "Debit Motor Vehicle A/c ₹6,00,000; Credit Cash A/c ₹1,00,000, Credit HDFC Vehicle Loan A/c ₹5,00,000",
    explanation: "Vehicle asset increases by full cost ₹6,00,000; Cash asset decreases by ₹1,00,000 and Loan liability increases by ₹5,00,000."
  },
  {
    id: 17,
    question: "Transaction Analysis: Bank debits ₹500 from business account as quarterly bank service charges. What is the entry in TallyPrime?",
    options: [
      "F5 Payment Voucher; Debit Bank Charges A/c (Indirect Expense) ₹500; Credit Bank A/c (Asset -) ₹500",
      "F6 Receipt Voucher; Debit Bank; Credit Bank Charges",
      "F4 Contra Voucher; Debit Cash; Credit Bank",
      "F7 Journal; Debit Capital; Credit Cash"
    ],
    answer: "F5 Payment Voucher; Debit Bank Charges A/c (Indirect Expense) ₹500; Credit Bank A/c (Asset -) ₹500",
    explanation: "Bank charges deducted by bank are operating expenses: Debit Bank Charges A/c, Credit Bank A/c."
  },
  {
    id: 18,
    question: "Transaction Analysis: Customer checks returned dishonored by bank due to insufficient funds (₹25,000). What entry reverses the original receipt?",
    options: [
      "Debit Customer Sundry Debtor A/c ₹25,000; Credit Bank A/c ₹25,000",
      "Debit Bank A/c ₹25,000; Credit Customer A/c ₹25,000",
      "Debit Sales A/c ₹25,000; Credit Cash A/c ₹25,000",
      "Debit Bad Debt A/c ₹25,000; Credit Capital A/c ₹25,000"
    ],
    answer: "Debit Customer Sundry Debtor A/c ₹25,000; Credit Bank A/c ₹25,000",
    explanation: "Cheque dishonor reverses the original receipt entry, restoring the customer's debtor balance and reducing bank balance."
  },
  {
    id: 19,
    question: "Transaction Analysis: Accrued interest of ₹4,00,000 on fixed deposit is credited by bank directly into FD account. What is the entry?",
    options: [
      "Debit Fixed Deposit A/c (Asset +) ₹4,00,000; Credit Interest Income A/c (Revenue +) ₹4,00,000",
      "Debit Cash A/c ₹4,00,000; Credit Fixed Deposit A/c ₹4,00,000",
      "Debit Interest Expense A/c ₹4,00,000; Credit Bank A/c ₹4,00,000",
      "Debit Capital A/c ₹4,00,000; Credit Fixed Deposit A/c ₹4,00,000"
    ],
    answer: "Debit Fixed Deposit A/c (Asset +) ₹4,00,000; Credit Interest Income A/c (Revenue +) ₹4,00,000",
    explanation: "Interest added to FD increases FD asset value (Debit FD) and increases interest revenue (Credit Interest Income)."
  },
  {
    id: 20,
    question: "In TallyPrime, what screen feature allows an operator to verify the debit/credit effect of a voucher before saving?",
    options: [
      "Voucher entry mode / Debit-Credit mode (Single Entry vs Double Entry toggle via Ctrl+H)",
      "Print Setup dialog",
      "Export JSON window",
      "Company alter screen"
    ],
    answer: "Voucher entry mode / Debit-Credit mode (Single Entry vs Double Entry toggle via Ctrl+H)",
    explanation: "Pressing Ctrl+H (Change Mode) in TallyPrime lets operators switch between 'Double Entry' (Dr/Cr) and 'Single Entry' modes."
  },
  {
    id: 21,
    question: "Transaction Analysis: Depreciation of ₹25,000 charged on factory machinery. What is the non-cash adjusting entry in F7 Journal?",
    options: [
      "Debit Depreciation Expense A/c ₹25,000; Credit Machinery A/c (or Accumulated Depreciation) ₹25,000",
      "Debit Cash A/c ₹25,000; Credit Machinery A/c ₹25,000",
      "Debit Machinery A/c ₹25,000; Credit Depreciation A/c ₹25,000",
      "Debit Bank A/c ₹25,000; Credit Capital A/c ₹25,000"
    ],
    answer: "Debit Depreciation Expense A/c ₹25,000; Credit Machinery A/c (or Accumulated Depreciation) ₹25,000",
    explanation: "Depreciation is a non-cash expense: Debit Depreciation Expense A/c, Credit Machinery Asset A/c."
  },
  {
    id: 22,
    question: "Transaction Analysis: Goods worth ₹15,000 destroyed by fire in godown, insurance claim admitted for ₹10,000. What is the compound entry?",
    options: [
      "Debit Insurance Claim Receivable A/c ₹10,000, Debit Loss by Fire A/c ₹5,000; Credit Purchase / Stock A/c ₹15,000",
      "Debit Cash A/c ₹15,000; Credit Stock A/c ₹15,000",
      "Debit Loss by Fire A/c ₹15,000; Credit Cash A/c ₹15,000",
      "Debit Capital A/c ₹15,000; Credit Sales A/c ₹15,000"
    ],
    answer: "Debit Insurance Claim Receivable A/c ₹10,000, Debit Loss by Fire A/c ₹5,000; Credit Purchase / Stock A/c ₹15,000",
    explanation: "Insurance claim asset +₹10k, net fire loss expense +₹5k, offsetting stock cost -₹15k."
  },
  {
    id: 23,
    question: "What is the critical rule for every single journal entry passed in commercial accounting?",
    options: [
      "The sum of all Debit amounts MUST strictly equal the sum of all Credit amounts (Fundamental Double-Entry Invariant)",
      "Debit amounts must always be greater than Credit amounts",
      "Credit amounts must always be double the Debit amounts",
      "Debits can be left blank if approved by manager"
    ],
    answer: "The sum of all Debit amounts MUST strictly equal the sum of all Credit amounts (Fundamental Double-Entry Invariant)",
    explanation: "Total Debit = Total Credit is the unbreakable mathematical invariant of double-entry accounting."
  },
  {
    id: 24,
    question: "What is a Narration in a journal entry?",
    options: [
      "A brief plain-text description explaining the business background of a recorded transaction, starting with 'Being...'",
      "The customer's email address",
      "The software developer's signature",
      "The tax percentage code"
    ],
    answer: "A brief plain-text description explaining the business background of a recorded transaction, starting with 'Being...'",
    explanation: "A narration provides audit context (e.g. 'Being office rent paid for March 2026 via Chq No 004125')."
  },
  {
    id: 25,
    question: "Why is mastering step-by-step transaction analysis essential for non-accounting students before touching TallyPrime software?",
    options: [
      "Because software only automates calculations; the operator must correctly identify accounts, determine debit/credit, and select appropriate voucher types",
      "Because TallyPrime refuses to open without an accounting test",
      "Because transaction analysis replaces GST returns",
      "Because computers cannot store ledger names"
    ],
    answer: "Because software only automates calculations; the operator must correctly identify accounts, determine debit/credit, and select appropriate voucher types",
    explanation: "TallyPrime automates ledger summaries and report generation, but garbage input leads to garbage financial statements—accurate transaction analysis guarantees flawless reporting."
  }
];
