export default [
  {
    id: 1,
    question: "Modern Classification অনুযায়ী কোন দুটি অ্যাকাউন্টের সাধারণ ব্যালেন্স Debit হয় এবং বৃদ্ধি পেলে Debit করতে হয়?",
    options: [
      "Assets এবং Expenses",
      "Liabilities এবং Capital",
      "Incomes এবং Assets",
      "Liabilities এবং Incomes"
    ],
    answer: "Assets এবং Expenses",
    explanation: "আধুনিক নিয়মে সমস্ত Asset (সম্পত্তি) এবং Expense (খরচ) অ্যাকাউন্টের স্বাভাবিক ব্যালেন্স Debit হয়; এদের মান বৃদ্ধি পেলে Debit (+) এবং হ্রাস পেলে Credit (-) করতে হয়।"
  },
  {
    id: 2,
    question: "যখন কোনো প্রতিষ্ঠান চেকের মাধ্যমে ₹50,000 ব্যাঙ্ক ঋণ (Bank Loan) শোধ করে, তখন আধুনিক নিয়মে কী ঘটে?",
    options: [
      "Debit Bank Loan (Liability হ্রাস পায়) | Credit Bank Asset (Asset হ্রাস পায়)",
      "Debit Bank Asset | Credit Bank Loan",
      "Debit Capital | Credit Bank Asset",
      "Debit Expenses | Credit Cash"
    ],
    answer: "Debit Bank Loan (Liability হ্রাস পায়) | Credit Bank Asset (Asset হ্রাস পায়)",
    explanation: "Bank Loan নামক দায়টি কমে যাচ্ছে (Liability হ্রাস পেলে Debit হয়), এবং Bank Asset ব্যালেন্স কমে যাচ্ছে (Asset হ্রাস পেলে Credit হয়)।"
  },
  {
    id: 3,
    question: "আধুনিক অ্যাকাউন্টিংয়ে 'DEAL' শর্টকাট সূত্রটি কোন কোন উপাদানের জন্য প্রযোজ্য?",
    options: [
      "Drawings, Expenses, Assets (যা বৃদ্ধি পেলে Debit হয়)",
      "Debtors, Earnings, Accounts, Liabilities",
      "Direct Expenses, Assets, Ledger",
      "Daybook, Equity, Assets, Loans"
    ],
    answer: "Drawings, Expenses, Assets (যা বৃদ্ধি পেলে Debit হয়)",
    explanation: "DEAL অ্যাক্রোনিম মনে করিয়ে দেয় যে Drawings, Expenses এবং Assets বাড়লে Debit এবং কমলে Credit হয়।"
  },
  {
    id: 4,
    question: "যখন কোনো গ্রাহক সেবা বা কনসাল্টিং ফি বাবদ ₹15,000 প্রদান করেন, তখন আধুনিক নিয়মে কীভাবে হিসাব প্রভাবিত হয়?",
    options: [
      "Debit Bank/Cash (Asset বৃদ্ধি পায়) | Credit Service Revenue (Income বৃদ্ধি পায়)",
      "Debit Service Revenue | Credit Cash",
      "Debit Capital | Credit Bank",
      "Debit Liability | Credit Income"
    ],
    answer: "Debit Bank/Cash (Asset বৃদ্ধি পায়) | Credit Service Revenue (Income বৃদ্ধি পায়)",
    explanation: "নগদ বা ব্যাঙ্ক Asset বাড়ছে তাই Debit, এবং সেবামূলক আয়ের Income অ্যাকাউন্ট বৃদ্ধি পাচ্ছে তাই Credit।"
  },
  {
    id: 5,
    question: "আধুনিক অ্যাকাউন্টিং শ্রেণীবিভাগ কেন TallyPrime বা কম্পিউটারাইজড ইআরপি সিস্টেমের জন্য বিশেষভাবে উপযুক্ত?",
    options: [
      "কারণ এটি সরাসরি ডেটাবেসের গাণিতিক চিহ্নের (+ এবং -) সাথে মিলে যায় এবং ডেবিট-ক্রেডিট ব্যালেন্স সহজেই হিসাব করে",
      "কারণ কম্পিউটার ট্র্যাডিশনাল অ্যাকাউন্ট পড়তে পারে না",
      "কারণ সরকার কম্পিউটার ব্যবহারের জন্য ট্র্যাডিশনাল নিয়ম নিষিদ্ধ করেছে",
      "কারণ এতে কোনো লেজারের প্রয়োজন হয় না"
    ],
    answer: "কারণ এটি সরাসরি ডেটাবেসের গাণিতিক চিহ্নের (+ এবং -) সাথে মিলে যায় এবং ডেবিট-ক্রেডিট ব্যালেন্স সহজেই হিসাব করে",
    explanation: "সফটওয়্যার ডেটাবেস সরাসরি বীজগাণিতিক নিয়মে চলে; Asset ও Expense কে ধনাত্মক (+) এবং Capital, Liability ও Revenue কে ঋণাত্মক (-) ধরে স্বয়ংক্রিয়ভাবে ট্রায়াল ব্যালেন্সের নিখুঁত সমতা রক্ষা করে।"
  }
];
