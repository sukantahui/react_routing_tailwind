const questionsBn = [
  {
    id: 1,
    question: "মালিক যখন ৬,০০,০০০ টাকা নগদ ও ৫০,০০০ টাকার আসবাবপত্র দিয়ে ব্যবসা শুরু করেন, তখন কোন যৌগিক (Compound) জার্নাল এন্ট্রি করা হয়?",
    options: [
      "Debit Capital A/c ₹৬,৫০,০০০; Credit Cash A/c ₹৬,০০,০০০, Credit Furniture A/c ₹৫০,০০০",
      "Debit Cash A/c ₹৬,০০,০০০, Debit Furniture A/c ₹৫০,০০০; Credit Capital A/c ₹৬,৫০,০০০",
      "Debit Drawings A/c ₹৬,৫০,০০০; Credit Bank A/c ₹৬,৫০,০০০",
      "Debit Purchases A/c ₹৬,৫০,০০০; Credit Creditors A/c ₹৬,৫০,০০০"
    ],
    answerIndex: 1,
    explanation: "যৌগিক এন্ট্রির নিয়ম অনুযায়ী আগত সম্পদ দুটি (Cash ₹৬,০০,০০০ ও Furniture ₹৫০,০০০) ডেবিট হবে এবং মালিকের মূলধন দায় (Capital A/c) ₹৬,৫০,০০০ ক্রেডিট হবে।"
  },
  {
    id: 2,
    question: "TallyPrime-এ পাওনাদারের কাছ থেকে ১,২০,০০০ টাকার পণ্য বাকিতে কেনার জন্য কোন ভাউচার ব্যবহার করা হয়?",
    options: [
      "F5 Payment Voucher",
      "F6 Receipt Voucher",
      "F9 Purchase Voucher",
      "F8 Sales Voucher"
    ],
    answerIndex: 2,
    explanation: "পণ্য বিক্রয়ের জন্য F9 Purchase Voucher ব্যবহৃত হয়।"
  },
  {
    id: 3,
    question: "সরবরাহকারীকে ১৫,০০০ টাকার ত্রুটিপূর্ণ পণ্য ফেরত দেওয়ার সময় কোন ডকুমেন্ট ইস্যু করা হয় এবং কোন অ্যাকাউন্ট ক্রেডিট হয়?",
    options: [
      "Credit Note ইস্যু; Credit Return Inward Account",
      "Debit Note ইস্যু; Credit Return Outward Account",
      "Cash Receipt ইস্যু; Credit Bank A/c",
      "Delivery Note ইস্যু; Credit Capital A/c"
    ],
    answerIndex: 1,
    explanation: "সরবরাহকারীর দায় কমাতে Debit Note ইস্যু করা হয় এবং Return Outward A/c ক্রেডিট হয়।"
  },
  {
    id: 4,
    question: "বাকিতে কেনা গ্রাহক যখন ১০,০০০ টাকার ক্ষতিগ্রস্ত পণ্য ফেরত পাঠায়, তখন খাতায় কোন এন্ট্রি হয়?",
    options: [
      "Debit Return Inward A/c ₹১০,০০০; Credit Customer (Sundry Debtor) A/c ₹১০,০০০",
      "Debit Customer A/c ₹১০,০০০; Credit Return Inward A/c ₹১০,০০০",
      "Debit Cash A/c ₹১০,০০০; Credit Purchase A/c ₹১০,০০০",
      "Debit Capital A/c ₹১০,০০০; Credit Drawings A/c ₹১০,০০০"
    ],
    answerIndex: 0,
    explanation: "বিক্রয় ফেরত হিসাব (Return Inward A/c) ডেবিট এবং দেনাদার হিসাব (Sundry Debtor) ক্রেডিট হয়।"
  },
  {
    id: 5,
    question: "TallyPrime-এ অ-নগদ সমন্বয় ও ডেবিট/ক্রেডিট নোট এন্ট্রির জন্য কোন ভাউচার শর্টকাট কি ব্যবহৃত হয়?",
    options: [
      "F4",
      "F5",
      "F7 Journal Voucher",
      "F8"
    ],
    answerIndex: 2,
    explanation: "F7 Journal Voucher অ-নগদ সমন্বয় এন্ট্রির জন্য ব্যবহৃত হয়।"
  }
];

export default questionsBn;
