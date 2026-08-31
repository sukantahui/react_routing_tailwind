export default [
  {
    id: 1,
    question: "একটি ব্যবসায়িক প্রতিষ্ঠানে Bookkeeping কোথায় শেষ হয় এবং Accounting কোথা থেকে শুরু হয়?",
    options: [
      "ভাউচার ফেলে দিলে Bookkeeping শেষ হয়",
      "Bookkeeping শেষ হয় লেনদেন রেকর্ড করার পর, এবং সেই রেকর্ড সংক্ষেপ ও বিশ্লেষণ করার মাধ্যমে Accounting শুরু হয়",
      "কম্পিউটার বন্ধ করলে Accounting শেষ হয়",
      "উভয় প্রক্রিয়া একই সাথে শুরু ও শেষ হয়, কোনো পার্থক্য নেই"
    ],
    answer: "Bookkeeping শেষ হয় লেনদেন রেকর্ড করার পর, এবং সেই রেকর্ড সংক্ষেপ ও বিশ্লেষণ করার মাধ্যমে Accounting শুরু হয়",
    explanation: "Bookkeeping হল লেনদেন যাচাই ও জার্নালে লেখার প্রাথমিক কাজ। এরপর সেই তথ্যের সাহায্যে লেজার, ট্রায়াল ব্যালেন্স, লাভ-ক্ষতির হিসাব এবং ফাইনাল রিপোর্ট তৈরির দায়িত্ব Accounting-এর।"
  },
  {
    id: 2,
    question: "নিচের কোন কাজটি সম্পূর্ণভাবে Bookkeeping-এর অন্তর্গত?",
    options: [
      "প্রতিদিনের সেলস ভাউচার Sales Daybook-এ রেকর্ড করা",
      "কোম্পানির ত্রৈমাসিক গ্রস প্রফিট রেশিও বিশ্লেষণ করা",
      "বার্ষিক GST অডিট রিপোর্ট প্রস্তুত করা",
      "পরবর্তী আর্থিক বছরের মূলধনী বাজেট তৈরি করা"
    ],
    answer: "প্রতিদিনের সেলস ভাউচার Sales Daybook-এ রেকর্ড করা",
    explanation: "দৈনন্দিন ভাউচার ও মেমোগুলি জার্নাল বা ডে-বুকে এন্ট্রি করা হল রুটিন বুককিপিং কাজ, যা সাধারণত বিলিং ক্লার্ক বা বুককিপাররা করে থাকেন।"
  },
  {
    id: 3,
    question: "স্ট্যান্ডার্ড Accounting Cycle-এর সঠিক পর্যায়ক্রম কোনটি?",
    options: [
      "Transaction -> Journal -> Ledger -> Trial Balance -> Final Accounts",
      "Transaction -> Balance Sheet -> Journal -> Trial Balance",
      "Trial Balance -> Journal -> Transaction -> Ledger",
      "Final Accounts -> Trial Balance -> Ledger -> Journal"
    ],
    answer: "Transaction -> Journal -> Ledger -> Trial Balance -> Final Accounts",
    explanation: "হিসাব চক্রের ধারা: প্রথমে Transaction ঘটে, তা Journal-এ এন্ট্রি হয়, তারপর Ledger-এ পোস্টিং হয়, এরপর Trial Balance তৈরি হয় এবং সবশেষে Trading, P&L ও Balance Sheet প্রস্তুত করা হয়।"
  },
  {
    id: 4,
    question: "TallyPrime সফটওয়্যারের অটোমেশন কীভাবে Bookkeeping ও Accounting-এর মধ্যকার সেতুবন্ধন তৈরি করে?",
    options: [
      "প্রতি সন্ধ্যায় অপারেটরকে হাতে ট্রায়াল ব্যালেন্সের যোগফল বের করতে হয়",
      "একটিমাত্র ভাউচার এন্ট্রি করলেই Tally স্বয়ংক্রিয়ভাবে রিয়েল-টাইমে Ledger, Trial Balance, P&L এবং Balance Sheet আপডেট করে দেয়",
      "TallyPrime শুধুমাত্র বুককিপিং করতে পারে, ব্যালেন্স শীট বানাতে পারে না",
      "TallyPrime-এ লেজার পোস্টিং করতে আলাদা সফটওয়্যার প্রয়োজন হয়"
    ],
    answer: "একটিমাত্র ভাউচার এন্ট্রি করলেই Tally স্বয়ংক্রিয়ভাবে রিয়েল-টাইমে Ledger, Trial Balance, P&L এবং Balance Sheet আপডেট করে দেয়",
    explanation: "TallyPrime-এ কোনো ম্যানুয়াল লেজার পোস্টিং বা যোগ-বিয়োগের প্রয়োজন হয় না। ভাউচার এন্ট্রি (F5, F6, F8, F9 ইত্যাদি) সেভ করার সাথে সাথেই সমস্ত রিপোর্ট স্বয়ংক্রিয়ভাবে তৈরি হয়ে যায়।"
  },
  {
    id: 5,
    question: "একটি বাণিজ্যিক প্রতিষ্ঠানে বিশ্লেষণাত্মক Accounting কাজের মূল দায়িত্বে কারা থাকেন?",
    options: [
      "Junior Billing Clerk",
      "স্টোরকিপার",
      "Professional Senior Accountant বা চার্টার্ড অ্যাকাউন্ট্যান্ট (CA)",
      "নিরাপত্তা প্রহরী"
    ],
    answer: "Professional Senior Accountant বা চার্টার্ড অ্যাকাউন্ট্যান্ট (CA)",
    explanation: "ফাইনান্সিয়াল স্টেটমেন্ট পর্যালোচনা, GST/TDS ট্যাক্স রিটার্ন ও অডিট ভেরিফিকেশনের মতো গুরুত্বপূর্ণ কাজের জন্য পেশাদার সিনিয়র অ্যাকাউন্ট্যান্টের দক্ষতার প্রয়োজন হয়।"
  }
];
