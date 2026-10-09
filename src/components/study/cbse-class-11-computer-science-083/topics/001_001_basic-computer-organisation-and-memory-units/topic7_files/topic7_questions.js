// topic7_questions.js
// CBSE Class XI Computer Science (083) - Topic 7 FAQs & Questions Bank
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: "q1",
    question: "What is the difference between a Bit, a Nibble, and a Byte?",
    answer: "A Bit is a single binary digit (0 or 1). A Nibble is a group of exactly 4 bits. A Byte is a group of exactly 8 bits (2 Nibbles), which forms the basic addressable unit of memory.",
    explanation: "1 Byte = 2 Nibbles = 8 Bits.",
    explanationBn: "Bit হলো ১টি বাইনারি ডিজিট (০ বা ১); Nibble হলো ৪টি বিটের দল; আর Byte হলো ৮টি বিটের দল (২টি নিবল)।",
    category: "Concepts"
  },
  {
    id: "q2",
    question: "List all standard memory units in ascending hierarchical order from Byte to Yottabyte.",
    answer: "Byte (B) ➔ Kilobyte (KB) ➔ Megabyte (MB) ➔ Gigabyte (GB) ➔ Terabyte (TB) ➔ Petabyte (PB) ➔ Exabyte (EB) ➔ Zettabyte (ZB) ➔ Yottabyte (YB).",
    explanation: "Each step represents a multiplication factor of 1024 (2^10).",
    explanationBn: "Byte ➔ KB ➔ MB ➔ GB ➔ TB ➔ PB ➔ EB ➔ ZB ➔ YB। প্রতিটি ধাপ পূর্ববর্তী ধাপের চেয়ে ১০২৪ গুণ বড়।",
    category: "Hierarchy"
  },
  {
    id: "q3",
    question: "Why is 1 Kilobyte equal to 1,024 Bytes instead of 1,000 Bytes in computer architecture?",
    answer: "Because digital electronic computers operate on the binary base-2 number system, where powers of 2 naturally define memory addressing. 2^10 = 1,024 is the closest power of 2 to the decimal metric prefix kilo (1,000).",
    explanation: "2^10 = 1,024 provides complete utilization of 10 binary address lines without wasting addressing states.",
    explanationBn: "কারণ কম্পিউটার বাইনারি বেস-২ ভিত্তিক কাজ করে; ২^১০ = ১০২৪ হলো ১০০০-এর নিকটতম বাইনারি পাওয়ার।",
    category: "Binary vs Decimal"
  },
  {
    id: "q4",
    question: "How many bytes are there in 4 Terabytes (TB)? Express your answer in powers of 2.",
    answer: "4 TB = 2^2 × (2^10)^4 Bytes = 2^2 × 2^40 Bytes = 2^42 Bytes = 4,398,046,511,104 Bytes.",
    explanation: "1 TB = 2^40 Bytes. Therefore, 4 TB = 4 × 2^40 = 2^2 × 2^40 = 2^42 Bytes.",
    explanationBn: "৪ TB = ৪ × ২^৪০ বাইট = ২^২ × ২^৪০ = ২^৪২ বাইট।",
    category: "Calculations"
  },
  {
    id: "q5",
    question: "How many bits are present in 1.5 Megabytes (MB)?",
    answer: "1.5 MB = 1.5 × 1,024 KB = 1.5 × 1,024 × 1,024 Bytes = 1,572,864 Bytes.\nTotal Bits = 1,572,864 Bytes × 8 bits/byte = 12,582,912 bits.",
    explanation: "Multiply Megabytes by 1,048,576 to get bytes, then multiply by 8 to get bits.",
    explanationBn: "১.৫ MB = ১.৫ × ১০২৪ × ১০২৪ × ৮ = ১২,৫৮২,৯১২ বিট।",
    category: "Calculations"
  },
  {
    id: "q6",
    question: "How many 256 KB document files can be saved on a 2 GB USB Flash Drive?",
    answer: "2 GB in KB = 2 × 1,024 × 1,024 KB = 2,097,152 KB.\nTotal Files = 2,097,152 KB / 256 KB = 8,192 files.",
    explanation: "Number of files = (Total storage capacity in KB) / (Single file size in KB).",
    explanationBn: "২ GB = ২ × ১০২৪ × ১০২৪ = ২,০৯৭,১৫২ KB। ফাইলের সংখ্যা = ২,০৯৭,১৫২ / ২৫৬ = ৮,১৯২টি ফাইল।",
    category: "Word Problems"
  },
  {
    id: "q7",
    question: "Differentiate between 'b' (lowercase) and 'B' (uppercase) in data unit abbreviations.",
    answer: "'b' denotes Bits (e.g. 100 Mbps = 100 Megabits per second, commonly used for network speeds), whereas 'B' denotes Bytes (e.g. 100 MBps = 100 Megabytes per second = 800 Mbps, used for file sizes).",
    explanation: "Confusing b and B causes an 8-fold error in speed and capacity calculations.",
    explanationBn: "ছোট হাতের 'b' মানে বিট (যেমন ইন্টারনেটের গতি 100 Mbps); আর বড় হাতের 'B' মানে বাইট (যেমন ফাইলের আকার 100 MB)।",
    category: "Terminology"
  },
  {
    id: "q8",
    question: "What is a 'Gibibyte' (GiB) compared to a 'Gigabyte' (GB)?",
    answer: "A Gibibyte (GiB) is an IEC standard binary unit equal to exactly 2^30 (1,073,741,824) bytes. A Gigabyte (GB) in SI decimal definition is equal to 10^9 (1,000,000,000) bytes.",
    explanation: "Operating systems like Windows calculate file sizes in GiB (binary) but display the label as GB.",
    explanationBn: "GiB হলো ২^৩০ (১,০৭৩,৭৪১,৮২৪) বাইট; আর SI দশমিকে GB হলো ১০^৯ (১,০০০,০০০,০০০) বাইট।",
    category: "Modern Standards"
  },
  {
    id: "q9",
    question: "Why does a 1 Terabyte (1 TB) external hard drive show only ~931 GB in Windows Explorer?",
    answer: "Because the manufacturer specifies 1 TB using decimal SI (1,000,000,000,000 bytes). Windows divides by binary base-2 (1024^3 = 1,073,741,824): 1,000,000,000,000 / 1,073,741,824 ≈ 931.32 GiB.",
    explanation: "The drive has full hardware capacity; the difference is purely binary vs decimal unit representation.",
    explanationBn: "কারণ কোম্পানি ১০০০ ভিত্তিক গণনা করে ১ TB দেয়, কিন্তু উইন্ডোজ ১০২৪ ভিত্তিক ভাগ করে ৯৩১ GB প্রদর্শন করে।",
    category: "Real-World"
  },
  {
    id: "q10",
    question: "Convert 8,388,608 bits into Kilobytes (KB).",
    answer: "Bytes = 8,388,608 / 8 = 1,048,576 Bytes.\nKilobytes = 1,048,576 / 1024 = 1,024 KB (or 1 MB).",
    explanation: "Divide by 8 to convert to bytes, then divide by 1024 to convert to KB.",
    explanationBn: "৮,৩৮৮,৬০৮ / ৮ = ১,০৪৮,৫৭৬ বাইট। এরপর ১,০৪৮,৫৭৬ / ১০২৪ = ১০২৪ KB (বা ১ MB)।",
    category: "Calculations"
  },
  {
    id: "q11",
    question: "How many Petabytes (PB) are in 1 Exabyte (EB)?",
    answer: "1 Exabyte (EB) = 1,024 Petabytes (PB) = 2^10 PB.",
    explanation: "Each adjacent unit in the binary hierarchy differs by a factor of 1024 (2^10).",
    explanationBn: "১ Exabyte (EB) = ১০২৪ Petabytes (PB)।",
    category: "Hierarchy"
  },
  {
    id: "q12",
    question: "How many ASCII characters can be stored in 1 Kilobyte of uncompressed text?",
    answer: "1 Kilobyte = 1,024 Bytes. Since 1 standard ASCII character occupies exactly 1 Byte (8 bits), 1 KB can store exactly 1,024 ASCII characters.",
    explanation: "Each character (like 'A', '7', '$') takes 1 byte in standard ASCII encoding.",
    explanationBn: "প্রতিটি ASCII ক্যারেক্টার ১ বাইট নেয়, তাই ১ KB মেমোরিতে ঠিক ১০২৪টি অক্ষর সংরক্ষণ করা যাবে।",
    category: "Character Encoding"
  },
  {
    id: "q13",
    question: "A high-definition audio song is 40 MB. How many such songs can fit on a 32 GB SD card?",
    answer: "32 GB = 32 × 1,024 MB = 32,768 MB.\nNumber of songs = 32,768 / 40 = 819.2 ➔ 819 complete songs.",
    explanation: "Divide total card capacity in MB by individual song size.",
    explanationBn: "৩২ GB = ৩২,৭৬৮ MB। মোট গানের সংখ্যা = ৩২,৭৬৮ / ৪০ = ৮১৯টি সম্পূর্ণ গান।",
    category: "Word Problems"
  },
  {
    id: "q14",
    question: "What unit of memory comes immediately after Terabyte (TB)?",
    answer: "Petabyte (PB). 1 PB = 1,024 TB = 2^50 Bytes.",
    explanation: "The hierarchy order is TB ➔ PB ➔ EB ➔ ZB ➔ YB.",
    explanationBn: "টেরাবাইট (TB)-এর ঠিক পরবর্তী একক হলো পেটাবাইট (PB)। ১ PB = ১০২৪ TB।",
    category: "Hierarchy"
  },
  {
    id: "q15",
    question: "If a database grows at a rate of 50 GB per day, how many Terabytes (TB) will it consume in 30 days?",
    answer: "Total Growth = 50 GB × 30 days = 1,500 GB.\nIn Terabytes = 1,500 / 1024 ≈ 1.465 TB (or exactly 1,500 / 1024 TB).",
    explanation: "Convert daily accumulation into total gigabytes, then divide by 1024.",
    explanationBn: "মোট বৃদ্ধি = ৫০ × ৩০ = ১৫০০ GB। টেরাবাইটে = ১৫০০ / ১০২৪ = প্রায় ১.৪৭ TB।",
    category: "Calculations"
  },
  {
    id: "q16",
    question: "True or False: 'A 64-bit integer takes 8 Bytes of computer memory.'",
    answer: "True. Since 1 Byte = 8 bits, 64 bits = 64 / 8 = 8 Bytes.",
    explanation: "Standard 64-bit integers and memory pointers occupy 8 bytes in RAM.",
    explanationBn: "সত্য। ৬৪ বিট = ৬৪ / ৮ = ৮ বাইট।",
    category: "True/False"
  },
  {
    id: "q17",
    question: "What is a 'Zettabyte' and in what context is it used?",
    answer: "1 Zettabyte (ZB) = 1,024 Exabytes = 2^70 Bytes (~10^21 bytes). It is used to quantify the total global annual data generated across the entire internet and world telecommunications.",
    explanation: "Global internet traffic surpassed dozens of Zettabytes annually in the 2020s.",
    explanationBn: "১ ZB = ১০২৪ EB; এটি বিশ্বব্যাপী তৈরি হওয়া মোট ইন্টারনেট ডেটার পরিমাণ মাপতে ব্যবহৃত হয়।",
    category: "Global Data"
  },
  {
    id: "q18",
    question: "Calculate the value of N if 2^N Bytes = 16 Gigabytes (GB).",
    answer: "16 GB = 16 × 2^30 Bytes = 2^4 × 2^30 Bytes = 2^34 Bytes.\nTherefore, N = 34.",
    explanation: "Express 16 as 2^4 and 1 GB as 2^30; add the exponents: 4 + 30 = 34.",
    explanationBn: "১৬ GB = ২^৪ × ২^৩০ = ২^৩৪ বাইট। সুতরাং N = ৩৪।",
    category: "Calculations"
  },
  {
    id: "q19",
    question: "How many 4-bit nibbles are in a 64 KB memory module?",
    answer: "64 KB = 64 × 1024 Bytes = 65,536 Bytes.\nSince 1 Byte contains 2 Nibbles:\nTotal Nibbles = 65,536 Bytes × 2 nibbles/byte = 131,072 Nibbles.",
    explanation: "Multiply total bytes by 2 to find the total nibble count.",
    explanationBn: "৬৪ KB = ৬৫,৫৩৬ বাইট। প্রতি বাইটে ২টি নিবল থাকায় মোট নিবল = ৬৫,৫৩৬ × ২ = ১৩১,০৭২টি নিবল।",
    category: "Calculations"
  },
  {
    id: "q20",
    question: "A video is recorded at a bitrate of 8 Megabits per second (8 Mbps). How many Megabytes (MB) will 1 minute of video occupy?",
    answer: "Bitrate in Bytes = 8 Mbps / 8 = 1 Megabyte per second (1 MB/s).\nTotal Time = 1 minute = 60 seconds.\nTotal Size = 1 MB/s × 60 s = 60 Megabytes (MB).",
    explanation: "Convert bits/sec to bytes/sec by dividing by 8, then multiply by duration.",
    explanationBn: "৮ Mbps = ১ MB/s। ১ মিনিট = ৬০ সেকেন্ড। মোট আকার = ১ × ৬০ = ৬০ Megabytes (MB)।",
    category: "Word Problems"
  },
  {
    id: "q21",
    question: "What is a 'Yottabyte' (YB)? Express its size in powers of 2 and powers of 10.",
    answer: "1 Yottabyte (YB) = 2^80 Bytes (Binary) ≈ 10^24 Bytes (Decimal Septillion). It is the largest officially standardized SI/IEC data storage prefix.",
    explanation: "1 YB = 1,024 ZB = 1,048,576 EB.",
    explanationBn: "১ YB = ২^৮০ বাইট ≈ ১০^২৪ বাইট; এটি আন্তর্জাতিকভাবে স্বীকৃত সর্ববৃহৎ মেমোরি একক।",
    category: "Hierarchy"
  },
  {
    id: "q22",
    question: "Convert 512 Megabytes (MB) into Gigabytes (GB).",
    answer: "512 MB / 1024 = 0.5 Gigabytes (0.5 GB or 1/2 GB).",
    explanation: "Dividing by 1024 converts from MB up to GB.",
    explanationBn: "৫১২ / ১০২৪ = ০.৫ Gigabytes (0.5 GB)।",
    category: "Calculations"
  },
  {
    id: "q23",
    question: "How many address bits are required to address a 1 MB memory chip byte-by-byte?",
    answer: "1 MB = 2^20 Bytes. Therefore, exactly 20 address bits (lines) are required.",
    explanation: "The exponent of the power of 2 represents the required address bus bit-width.",
    explanationBn: "১ MB = ২^২০ বাইট; তাই ঠিক ২০টি অ্যাড্রেস বিটের প্রয়োজন।",
    category: "Addressing"
  },
  {
    id: "q24",
    question: "How many 1.44 MB 3.5-inch floppy disks would be needed to store a modern 4.7 GB DVD movie?",
    answer: "4.7 GB in MB = 4.7 × 1024 MB = 4,812.8 MB.\nNumber of floppies = 4,812.8 / 1.44 ≈ 3,343 floppy disks!",
    explanation: "Illustrates the massive exponential growth in digital storage density over decades.",
    explanationBn: "৪.৭ GB = ৪,৮১২.৮ MB। মোট ফ্লপি ডিস্ক প্রয়োজন = ৪,৮১২.৮ / ১.৪৪ = প্রায় ৩,৩৪৩টি ফ্লপি!",
    category: "Word Problems"
  },
  {
    id: "q25",
    question: "Summary Question: Arrange in strictly increasing order of size: (A) 2^24 Bytes, (B) 16 MB, (C) 128 Megabits, (D) 0.05 GB.",
    answer: "Let us convert all values into Megabytes (MB):\n- (A) 2^24 Bytes = 2^4 × 2^20 Bytes = 16 MB\n- (B) 16 MB = 16 MB\n- (C) 128 Megabits = 128 / 8 = 16 MB\n- (D) 0.05 GB = 0.05 × 1024 MB = 51.2 MB\nOrder: (A) = (B) = (C) [16 MB] < (D) [51.2 MB].",
    explanation: "Demonstrates thorough mathematical proficiency in memory unit conversions.",
    explanationBn: "A = ১৬ MB, B = ১৬ MB, C = ১৬ MB, D = ৫১.২ MB। সুতরাং A = B = C < D।",
    category: "Summary"
  }
];

export default questions;
