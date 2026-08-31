export default [
  {
    id: 1,
    question: "যখন কোনো ব্যবসা তার গ্রাহক Rohit Roy-এর কাছ থেকে নগদে ₹18,000 গ্রহণ করে, তখন Golden Rule অনুযায়ী বিশ্লেষণ কী হবে?",
    options: [
      "Debit Rohit Roy (Personal), Credit Cash (Real)",
      "Debit Cash A/c (Real - যা ব্যবসায় এলো), Credit Rohit Roy A/c (Personal - যিনি প্রদান করলেন)",
      "Debit Sales A/c, Credit Cash A/c",
      "Debit Cash A/c, Credit Discount A/c"
    ],
    answer: "Debit Cash A/c (Real - যা ব্যবসায় এলো), Credit Rohit Roy A/c (Personal - যিনি প্রদান করলেন)",
    explanation: "Cash হল একটি Real Asset যা ব্যবসায় প্রবেশ করছে (Debit what comes in)। রোহিত হলেন একজন Personal ব্যক্তি যিনি অর্থ প্রদান করছেন (Credit the giver)।"
  },
  {
    id: 2,
    question: "ব্যাঙ্ক ট্রান্সফারের মাধ্যমে ₹20,000 দোকান ভাড়া পরিশোধ করার সময় Nominal Account-এর গোল্ডেন রুল প্রয়োগ করে সঠিক জার্নাল এন্ট্রি কোনটি?",
    options: [
      "Debit Bank A/c ₹20,000 | Credit Rent A/c ₹20,000",
      "Debit Rent Expense A/c (Nominal - খরচ) ₹20,000 | Credit Bank A/c (Personal - প্রদানকারী) ₹20,000",
      "Debit Landlord Personal A/c ₹20,000 | Credit Cash A/c ₹20,000",
      "Debit Capital A/c ₹20,000 | Credit Rent A/c ₹20,000"
    ],
    answer: "Debit Rent Expense A/c (Nominal - খরচ) ₹20,000 | Credit Bank A/c (Personal - প্রদানকারী) ₹20,000",
    explanation: "Rent হল একটি পরিচালন খরচ (Debit all expenses & losses)। ব্যাঙ্ক আমাদের পক্ষ থেকে টাকা মেটাচ্ছে (Credit the giver)।"
  },
  {
    id: 3,
    question: "গোল্ডেন রুল অনুসারে ₹30,000 নগদে অফিসের জন্য আসবাবপত্র (Furniture) কেনার ডেবিট ও ক্রেডিট কী হবে?",
    options: [
      "Debit Furniture A/c (Real - এলো) | Credit Cash A/c (Real - চলে গেল)",
      "Debit Purchase A/c | Credit Cash A/c",
      "Debit Cash A/c | Credit Furniture A/c",
      "Debit Furniture A/c | Credit Capital A/c"
    ],
    answer: "Debit Furniture A/c (Real - এলো) | Credit Cash A/c (Real - চলে গেল)",
    explanation: "Furniture এবং Cash উভয়ই Real Account। আসবাবপত্র অফিসে আসছে তাই Debit, আর নগদ টাকা চলে যাচ্ছে তাই Credit।"
  },
  {
    id: 4,
    question: "যখন গ্রাহক প্রিয়াকে বাকিতে ₹12,000 মূল্যের পণ্য বিক্রি করা হয়, তখন কোন কোন অ্যাকাউন্ট ডেবিট ও ক্রেডিট হবে?",
    options: [
      "Debit Cash A/c | Credit Sales A/c",
      "Debit Priya A/c (Personal - সুবিধা গ্রহণকারী) | Credit Sales A/c (Nominal - আয়)",
      "Debit Sales A/c | Credit Priya A/c",
      "Debit Priya A/c | Credit Cash A/c"
    ],
    answer: "Debit Priya A/c (Personal - সুবিধা গ্রহণকারী) | Credit Sales A/c (Nominal - আয়)",
    explanation: "প্রিয়া পণ্য গ্রহণ করছেন (Debit the receiver), এবং Sales হল একটি বাণিজ্যিক আয়ের হিসাব (Credit all incomes & gains)।"
  },
  {
    id: 5,
    question: "TallyPrime-এর ভাউচার স্ক্রিনে 'To/By'-এর বদলে 'Cr/Dr' চালু করতে কোন অপশন ব্যবহার করা হয়?",
    options: [
      "F12 Configuration > 'Use Cr/Dr instead of To/By during voucher entry'",
      "Alt + F2 Date Change",
      "Ctrl + F3 Change Company",
      "Alt + F1 Detailed Format"
    ],
    answer: "F12 Configuration > 'Use Cr/Dr instead of To/By during voucher entry'",
    explanation: "TallyPrime-এর যে কোনো ভাউচার স্ক্রিনে F12 চেপে কনফিগারেশনে গেলে 'Use Cr/Dr instead of To/By' অপশনটি চালু করা যায়।"
  }
];
