export default [
  {
    id: 1,
    question: "একমালিকানা ব্যবসায়ের মালিক যখন নগদ ₹5,00,000 দিয়ে ব্যবসা শুরু করেন, তখন সঠিক জার্নাল এন্ট্রি এবং TallyPrime ভাউচার কোনটি?",
    options: [
      "Debit Cash A/c ₹5,00,000 | Credit Capital A/c ₹5,00,000 | ভাউচার: F6 Receipt",
      "Debit Capital A/c ₹5,00,000 | Credit Cash A/c ₹5,00,000 | ভাউচার: F5 Payment",
      "Debit Purchase A/c ₹5,00,000 | Credit Cash A/c ₹5,00,000 | ভাউচার: F9 Purchase",
      "Debit Bank A/c ₹5,00,000 | Credit Sales A/c ₹5,00,000 | ভাউচার: F8 Sales"
    ],
    answer: "Debit Cash A/c ₹5,00,000 | Credit Capital A/c ₹5,00,000 | ভাউচার: F6 Receipt",
    explanation: "ব্যবসায়ের ক্যাশ বক্সে নগদ সম্পত্তি আসছে (Debit Cash), এবং মালিকের মূলধন দায় হিসেবে ক্রেডিট হচ্ছে (Credit Capital)। যেহেতু ব্যবসায়ে অর্থ গৃহীত হল, এটি F6 Receipt ভাউচারে এন্ট্রি হয়।"
  },
  {
    id: 2,
    question: "সরবরাহকারী HP Supplies Ltd-এর কাছ থেকে বাকিতে ₹80,000 মূল্যের পণ্য কেনার ক্ষেত্রে TallyPrime-এ কী এন্ট্রি হবে?",
    options: [
      "Debit Purchase A/c ₹80,000 | Credit HP Supplies Ltd A/c ₹80,000 (F9 Purchase ভাউচারে)",
      "Debit HP Supplies Ltd A/c ₹80,000 | Credit Purchase A/c ₹80,000 (F8 Sales ভাউচারে)",
      "Debit Cash A/c ₹80,000 | Credit Purchase A/c ₹80,000 (F5 Payment ভাউচারে)",
      "Debit Purchase A/c ₹80,000 | Credit Sales A/c ₹80,000 (F4 Contra ভাউচারে)"
    ],
    answer: "Debit Purchase A/c ₹80,000 | Credit HP Supplies Ltd A/c ₹80,000 (F9 Purchase ভাউচারে)",
    explanation: "পণ্য ক্রয় বাড়ায় Purchase A/c ডেবিট হয় এবং সরবরাহকারী পাওনাদার বাড়ায় HP Supplies Ltd ক্রেডিট হয়। ভাউচারটি F9 Purchase-এ এন্ট্রি হয়।"
  },
  {
    id: 3,
    question: "গ্রাহক Sohini Traders-এর কাছে বাকিতে ₹60,000 মূল্যের পণ্য বিক্রির অ্যাকাউন্টিং এন্ট্রি কী হবে?",
    options: [
      "Debit Sohini Traders (Sundry Debtor) ₹60,000 | Credit Sales A/c ₹60,000 (F8 Sales ভাউচারে)",
      "Debit Sales A/c ₹60,000 | Credit Sohini Traders ₹60,000 (F9 Purchase ভাউচারে)",
      "Debit Cash A/c ₹60,000 | Credit Capital A/c ₹60,000 (F6 Receipt ভাউচারে)",
      "Debit Bank A/c ₹60,000 | Credit Sohini Traders ₹60,000 (F5 Payment ভাউচারে)"
    ],
    answer: "Debit Sohini Traders (Sundry Debtor) ₹60,000 | Credit Sales A/c ₹60,000 (F8 Sales ভাউচারে)",
    explanation: "সোহিনী ট্রেডার্স একজন দেনাদার গ্রাহক (Asset বৃদ্ধি - Debit), এবং সেলস হল বাণিজ্যিক আয়ের হিসাব (Income বৃদ্ধি - Credit), যা F8 Sales ভাউচারে রেকর্ড হয়।"
  },
  {
    id: 4,
    question: "মালিক যখন ব্যক্তিগত পারিবারিক ব্যবহারের জন্য দোকান থেকে ₹5,000 মূল্যের পণ্যসামগ্রী তোলেন, তখন কীভাবে হিসাব রাখা হয়?",
    options: [
      "Debit Drawings A/c ₹5,000 | Credit Purchase A/c ₹5,000 (ভাউচার: F7 Journal)",
      "Debit Sales A/c ₹5,000 | Credit Cash A/c ₹5,000 (ভাউচার: F8 Sales)",
      "Debit Office Expense A/c ₹5,000 | Credit Stock A/c ₹5,000 (ভাউচার: F5 Payment)",
      "কোনো এন্ট্রি হবে না কারণ মালটি মালিকেরই"
    ],
    answer: "Debit Drawings A/c ₹5,000 | Credit Purchase A/c ₹5,000 (ভাউচার: F7 Journal)",
    explanation: "মালিকের ব্যক্তিগত উত্তোলন হওয়ায় Drawings ডেবিট হয় এবং বিক্রয়ের জন্য রাখা পণ্যের খরচ কমাতে Purchase অ্যাকাউন্টকে ক্রয়মূল্যে ক্রেডিট করা হয়। এটি F7 Journal ভাউচারে এন্ট্রি হয়।"
  },
  {
    id: 5,
    question: "HDFC ব্যাঙ্ক চেকের মাধ্যমে কর্মীদের ₹25,000 বেতন পরিশোধ করার সময় TallyPrime-এ কোন ভাউচার ব্যবহার করা হয়?",
    options: [
      "F5 Payment",
      "F6 Receipt",
      "F4 Contra",
      "F9 Purchase"
    ],
    answer: "F5 Payment",
    explanation: "ব্যবসা থেকে নগদ টাকা বা ব্যাঙ্ক অ্যাকাউন্টের মাধ্যমে যে কোনো বহিরাগত অর্থ প্রদান F5 Payment ভাউচারে রেকর্ড করা হয়।"
  }
];
