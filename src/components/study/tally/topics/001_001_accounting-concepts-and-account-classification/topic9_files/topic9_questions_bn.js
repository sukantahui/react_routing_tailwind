export default [
  {
    id: 1,
    question: "৪-ধাপের লেনদেন বিশ্লেষণ অ্যালগরিদমের প্রথম ধাপটি কী?",
    options: [
      "TallyPrime-এ Ctrl+A চেপে সেভ করা",
      "উৎস ভাউচার বা বিল দেখে সংশ্লিষ্ট দুই বা ততোধিক লেজার অ্যাকাউন্ট চিহ্নিত করা",
      "ট্যাক্স পেনাল্টি গণনা করা",
      "ব্যালেন্স শীট প্রিন্ট করা"
    ],
    answer: "উৎস ভাউচার বা বিল দেখে সংশ্লিষ্ট দুই বা ততোধিক লেজার অ্যাকাউন্ট চিহ্নিত করা",
    explanation: "ধাপ ১-এ যে কোনো বাণিজ্যিক নথি (বিল, ক্যাশ মেমো, রসিদ) বিশ্লেষণ করে লেনদেনে জড়িত নির্দিষ্ট অ্যাকাউন্ট বা লেজারগুলি সনাক্ত করতে হয়।"
  },
  {
    id: 2,
    question: "'ABC Tech Ltd-এর কাছ থেকে বাকিতে ₹1,20,000 মূল্যের যন্ত্রপাতি ক্রয়' বিশ্লেষণ করলে কোন দুটি লেজার ও কোন Tally ভাউচার ব্যবহৃত হবে?",
    options: [
      "Machinery A/c এবং ABC Tech Ltd A/c | ভাউচার: F7 Journal",
      "Purchase A/c এবং Cash A/c | ভাউচার: F9 Purchase",
      "Machinery A/c এবং Cash A/c | ভাউচার: F5 Payment",
      "Sales A/c এবং Debtors A/c | ভাউচার: F8 Sales"
    ],
    answer: "Machinery A/c এবং ABC Tech Ltd A/c | ভাউচার: F7 Journal",
    explanation: "বাকিতে স্থায়ী সম্পদ কেনায় কোনো নগদ লেনদেন হয় না এবং এটি পুনরায় বিক্রির মাল নয়, তাই Machinery (Dr) ও ABC Tech Ltd (Cr) করে F7 Journal ভাউচারে এন্ট্রি করা হয়।"
  },
  {
    id: 3,
    question: "অফিসের ক্যাশ বাক্স থেকে ₹50,000 নগদ টাকা SBI চলতি ব্যাঙ্ক অ্যাকাউন্টে জমা দেওয়ার সময় TallyPrime-এ কোন ভাউচার ব্যবহার করা হয়?",
    options: [
      "F5 Payment",
      "F6 Receipt",
      "F4 Contra",
      "F7 Journal"
    ],
    answer: "F4 Contra",
    explanation: "শুধুমাত্র Cash এবং Bank-এর মধ্যকার অভ্যন্তরীণ লেনদেন (নগদ জমা বা উত্তোলন) রেকর্ড করতে F4 Contra ভাউচার ব্যবহৃত হয়।"
  },
  {
    id: 4,
    question: "'পাওনাদার Zenith Ltd-এর ₹8,500 পাওনার পূর্ণ নিষ্পত্তিতে (Full Settlement) চেকে ₹8,000 দেওয়া হল' - এর সঠিক এন্ট্রি কোনটি?",
    options: [
      "Debit Zenith Ltd ₹8,500 | Credit Bank ₹8,000 | Credit Discount Received ₹500",
      "Debit Zenith Ltd ₹8,000 | Credit Bank ₹8,000",
      "Debit Bank ₹8,500 | Credit Zenith Ltd ₹8,500",
      "Debit Discount ₹500 | Credit Cash ₹500"
    ],
    answer: "Debit Zenith Ltd ₹8,500 | Credit Bank ₹8,000 | Credit Discount Received ₹500",
    explanation: "Zenith Ltd-এর সম্পূর্ণ দায় মিটে গেল তাই Dr Zenith Ltd ₹8,500, ব্যাঙ্ক থেকে টাকা কমল তাই Cr Bank ₹8,000, এবং ₹500 লাভ বা ডিসকাউন্ট পাওয়ায় Cr Discount Received ₹500।"
  },
  {
    id: 5,
    question: "প্রতিটি Double-Entry লেনদেনে সেভ করার পূর্বে মোট Debit এবং মোট Credit সমান হওয়া বাধ্যতামূলক কেন?",
    options: [
      "মৌলিক Accounting Equation (Assets = Capital + Liabilities) অক্ষুণ্ণ রাখা এবং Trial Balance-এর সমতা রক্ষার জন্য",
      "না হলে কম্পিউটার ক্র্যাশ করবে",
      "ব্যাঙ্ক ম্যানেজার অসমান সংখ্যা পছন্দ করেন না",
      "কারণ সরকার কেবল জোড় সংখ্যা অনুমোদন করে"
    ],
    answer: "মৌলিক Accounting Equation (Assets = Capital + Liabilities) অক্ষুণ্ণ রাখা এবং Trial Balance-এর সমতা রক্ষার জন্য",
    explanation: "ডেবিট ও ক্রেডিটের সমান মান অ্যাকাউন্টিং সমীকরণ এবং ট্রায়াল ব্যালেন্সের নিখুঁত গাণিতিক ভারসাম্য বজায় রাখে।"
  }
];
