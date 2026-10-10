export const topic10Questions = [
  {
    id: 1,
    question: "What is Grid Computing?",
    options: [
      "A distributed computing paradigm that aggregates geographically dispersed, heterogeneous computers to work collaboratively as a virtual supercomputer",
      "Connecting four computers using an electrical extension cord",
      "A software program used to draw grid graphs in spreadsheets",
      "A high-voltage power generation station"
    ],
    correctAnswer: 0,
    explanationEn: "Grid Computing harnesses the collective processing power of geographically distributed, heterogeneous computers to solve massive scientific tasks.",
    explanationBn: "গ্রিড কম্পিউটিং হলো বিভিন্ন ভৌগোলিক স্থানে ছড়িয়ে থাকা বহু কম্পিউটারকে নেটওয়ার্কের মাধ্যমে সংযুক্ত করে একটি বিশাল ভার্চুয়াল সুপারকম্পিউটার হিসেবে কাজ করানোর ব্যবস্থা।"
  },
  {
    id: 2,
    question: "Which of the following is a primary distinction between Cloud Computing and Grid Computing?",
    options: [
      "Grid Computing pools heterogeneous resources for collaborative scientific computing, while Cloud Computing provides homogeneous on-demand commercial services on a utility model",
      "Grid Computing requires no internet connection",
      "Cloud Computing is exclusively owned by government armies",
      "There is no distinction; they are identical technologies"
    ],
    correctAnswer: 0,
    explanationEn: "Grids focus on collaborative federated computing for massive scientific computations; Clouds deliver centralized, on-demand commercial pay-as-you-go services.",
    explanationBn: "গ্রিড কম্পিউটিং বিভিন্ন প্রতিষ্ঠানের সক্ষমতাকে একত্রিত করে যৌথ গবেষণার কাজ করে, আর ক্লাউড কম্পিউটিং বাণিজ্যিক ভিত্তিতে চাহিদামতো সেবা ভাড়া দেয়।"
  },
  {
    id: 3,
    question: "What is a 'Computational Grid'?",
    options: [
      "A grid system designed to aggregate idle CPU processing power across machines for intensive calculations (e.g., protein folding, climate modeling)",
      "A grid that stores paper documents in boxes",
      "An array of solar panels",
      "A computer monitor with a pixel grid"
    ],
    correctAnswer: 0,
    explanationEn: "Computational grids pool unused CPU cycles from thousands of computers to perform complex scientific and mathematical simulations.",
    explanationBn: "কম্পিউটেশনাল গ্রিড হলো হাজার হাজার কম্পিউটারের অব্যবহৃত সিপিইউ প্রসেসিং ক্ষমতাকে একত্র করে জটিল হিসাব-নিকাশ সম্পন্ন করার ব্যবস্থা।"
  },
  {
    id: 4,
    question: "What is a 'Data Grid'?",
    options: [
      "A distributed grid architecture dedicated to managing, accessing, and analyzing massive multi-petabyte datasets stored across global research centers",
      "A spreadsheet with 10 rows and 5 columns",
      "A hard drive formatted in FAT32",
      "A network cable splitter"
    ],
    correctAnswer: 0,
    explanationEn: "Data grids (like the CERN LHC Computing Grid) provide secure access to vast datasets distributed across research laboratories worldwide.",
    explanationBn: "ডেটা গ্রিড বিশ্বের বিভিন্ন গবেষণাগারে সংরক্ষিত বিপুল পরিমাণ ডেটাকে সহজে আদান-প্রদান ও বিশ্লেষণের জন্য সংযুক্ত করে।"
  },
  {
    id: 5,
    question: "What is Blockchain technology?",
    options: [
      "A decentralized, distributed, and immutable cryptographic digital ledger that records transactions across a peer-to-peer network",
      "A plastic chain used to lock server racks",
      "A computer virus that blocks internet access",
      "A database software that deletes records every hour"
    ],
    correctAnswer: 0,
    explanationEn: "Blockchain is a decentralized, tamper-resistant digital ledger where transaction records are bundled into cryptographically linked blocks.",
    explanationBn: "ব্লকচেইন হলো একটি বিকেন্দ্রীভূত, অপরিবর্তনযোগ্য ও ক্রিপ্টোগ্রাফিকভাবে সুরক্ষিত ডিজিটাল লেজার বা খতিয়ান যা পিয়ার-টু-পিয়ার নেটওয়ার্কে পরিচালিত হয়।"
  },
  {
    id: 6,
    question: "What is the 'Genesis Block' in a blockchain?",
    options: [
      "The very first block (Block #0) created in the blockchain, whose previous hash is set to zeros",
      "A block created on January 1st every year",
      "A corrupted block that causes the blockchain to crash",
      "The final block that closes the blockchain permanently"
    ],
    correctAnswer: 0,
    explanationEn: "The Genesis Block is the foundational first block of any blockchain ledger, having an index of 0 and no previous block to link to.",
    explanationBn: "জেনেসিস ব্লক (Genesis Block) হলো যেকোনো ব্লকচেইনের সর্বপ্রথম তৈরি হওয়া ব্লক (ব্লক #০), যার কোনো পূর্ববর্তী ব্লক থাকে না।"
  },
  {
    id: 7,
    question: "Which cryptographic hash algorithm is famously used in Bitcoin and standard blockchain systems to ensure tamper-evidence?",
    options: [
      "SHA-256 (Secure Hash Algorithm 256-bit)",
      "Caesar Cipher",
      "ASCII Code 128",
      "Base64 Encoding"
    ],
    correctAnswer: 0,
    explanationEn: "SHA-256 produces a deterministic, irreversible 256-bit (64 hexadecimal character) cryptographic hash digest for data verification.",
    explanationBn: "SHA-256 হলো ২৫৬-বিট বিশিষ্ট একটি শক্তিশালী ক্রিপ্টোগ্রাফিক হ্যাশ অ্যালগরিদম যা ব্লকচেইনের তথ্যের অখণ্ডতা ও নিরাপত্তা রক্ষা করে।"
  },
  {
    id: 8,
    question: "What happens if a malicious actor attempts to alter a transaction inside an existing block in a blockchain?",
    options: [
      "The block's hash changes immediately, causing a cryptographic mismatch with the 'previous hash' stored in the next block, invalidating the entire chain",
      "The alteration is accepted silently without any notice",
      "The blockchain automatically rewards the attacker with free coins",
      "The server restarts in safe mode"
    ],
    correctAnswer: 0,
    explanationEn: "Because each block cryptographically stores the hash of the preceding block, modifying even a single character breaks the chain of trust across all nodes.",
    explanationBn: "কোনো ব্লকের ডেটা বদলালে তার হ্যাশ পরিবর্তন হয়ে যায়, ফলে পরবর্তী ব্লকে থাকা পূর্ববর্তী হ্যাশের সাথে মিল না থাকায় পুরো চেইনটি বাতিল ও অবৈধ হয়ে যায়।"
  },
  {
    id: 9,
    question: "What is a 'Nonce' (Number used once) in Proof-of-Work blockchain mining?",
    options: [
      "A 32-bit counter value that miners repeatedly increment to calculate a block hash that satisfies the network's difficulty target (e.g., starts with leading zeros)",
      "The total number of users logged into the network",
      "The price of one Bitcoin in US Dollars",
      "The serial number of the miner's graphics card"
    ],
    correctAnswer: 0,
    explanationEn: "Miners iterate the Nonce millions of times per second until the resulting SHA-256 hash falls below the network's mathematical target threshold.",
    explanationBn: "ননস (Nonce) হলো একটি সংখ্যা যা মাইনাররা ক্রমাগত পরিবর্তন করে কাঙ্ক্ষিত শর্তযুক্ত (যেমন শুরুতে নির্দিষ্ট সংখ্যক শূন্য) হ্যাশ খুঁজে বের করার চেষ্টা করে।"
  },
  {
    id: 10,
    question: "What is 'Proof of Work' (PoW) in blockchain consensus?",
    options: [
      "A consensus mechanism where network nodes (miners) solve computationally intensive cryptographic puzzles to validate transactions and create new blocks",
      "Submitting a signed paper receipt to the bank manager",
      "Showing an employee ID card to enter the office",
      "Typing code without making any syntax errors"
    ],
    correctAnswer: 0,
    explanationEn: "Proof of Work requires miners to expend computational power to solve hash puzzles, preventing spam transactions and Sybil attacks.",
    explanationBn: "প্রুফ অব ওয়ার্ক (PoW) হলো একটি কনসেনসাস পদ্ধতি যেখানে মাইনাররা কম্পিউটারের গাণিতিক শক্তি ব্যবহার করে জটিল পাজল সমাধান করে লেনদেন যাচাই করে।"
  },
  {
    id: 11,
    question: "What is a 'Smart Contract' in modern blockchain platforms like Ethereum?",
    options: [
      "A self-executing computerized program with transaction terms written directly into lines of code that runs automatically when predetermined conditions are met",
      "A legal agreement printed on glossy paper",
      "A contract signed by artificial intelligence robots",
      "A verbal agreement recorded as an MP3 file"
    ],
    correctAnswer: 0,
    explanationEn: "Smart contracts are decentralized programs deployed on blockchains that automatically enforce contractual agreements without intermediaries.",
    explanationBn: "স্মার্ট কন্ট্রাক্ট হলো ব্লকচেইনে সংরক্ষিত স্বয়ংক্রিয় কোড যা নির্দিষ্ট শর্ত পূরণ হওয়া মাত্র কোনো তৃতীয় পক্ষের হস্তক্ষেপ ছাড়াই স্বয়ংক্রিয়ভাবে কার্যকর হয়।"
  },
  {
    id: 12,
    question: "How does Blockchain eliminate the need for a centralized intermediary (like a traditional bank or broker)?",
    options: [
      "Through a decentralized Peer-to-Peer (P2P) network where all nodes independently verify transactions using consensus protocols and cryptographic ledgers",
      "By eliminating all money completely",
      "By requiring government officials to manually approve every payment",
      "By operating exclusively on offline calculators"
    ],
    correctAnswer: 0,
    explanationEn: "Blockchain achieves trust in a trustless environment by utilizing consensus mechanisms and cryptographic proof across a distributed P2P network.",
    explanationBn: "ব্লকচেইনে কোনো একক কেন্দ্রীয় ব্যাংকের প্রয়োজন হয় না, কারণ নেটওয়ার্কের সমস্ত পিয়ার-টু-পিয়ার নোড ক্রিপ্টোগ্রাফিক নিয়মে যৌথভাবে লেনদেন যাচাই করে।"
  },
  {
    id: 13,
    question: "How can Blockchain technology prevent fraud in Land Registry and Property Title Deeds?",
    options: [
      "By creating an immutable, timestamped record of property ownership transfers that cannot be forged, duplicated, or backdated by corrupt entities",
      "By demolishing all physical buildings",
      "By replacing physical land with digital pixels",
      "By requiring buyers to pay in physical gold only"
    ],
    correctAnswer: 0,
    explanationEn: "Blockchain land registries provide unalterable historical provenance of title deeds, eliminating fraudulent double-selling of real estate.",
    explanationBn: "ব্লকচেইন জমির দলিলের মালিকানার ইতিহাসকে অপরিবর্তনীয় ডিজিটাল লেজারে লিপিবদ্ধ করে জাল দলিল বা একই জমি একাধিকবার বিক্রির জালিয়াতি বন্ধ করে।"
  },
  {
    id: 14,
    question: "In pharmaceutical and food supply chains, how does Blockchain enhance safety?",
    options: [
      "By tracking each medicine batch or food container at every transit hop from factory to consumer, proving genuine origin and preventing counterfeits",
      "By making medicines taste sweet",
      "By freezing all food products in liquid nitrogen",
      "By reducing shipping container weight to zero"
    ],
    correctAnswer: 0,
    explanationEn: "Supply chain blockchain enables end-to-end provenance tracking, verifying that pharmaceuticals are 100% authentic and un-tampered.",
    explanationBn: "ঔষধ ও খাদ্য সরবরাহ চেইনে ব্লকচেইন প্রতিটি স্তরের তথ্য নিখুঁতভাবে রেকর্ড করে নকল ঔষধ ও ভেজাল পণ্য প্রতিরোধ করে।"
  },
  {
    id: 15,
    question: "What is 'SETI@home' in the history of Grid Computing?",
    options: [
      "A famous volunteer distributed computing project where millions of home computers analyzed radio telescope signals searching for extraterrestrial intelligence",
      "A social media network for astronomers",
      "A desktop astronomy wallpaper app",
      "A video game simulating space combat"
    ],
    correctAnswer: 0,
    explanationEn: "SETI@home harnessed millions of volunteer PCs worldwide across the internet to process radio astronomy datasets collaboratively.",
    explanationBn: "SETI@home হলো গ্রিড কম্পিউটিংয়ের একটি বিখ্যাত উদাহরণ যেখানে বিশ্বের লক্ষ লক্ষ সাধারণ কম্পিউটারের শক্তি কাজে লাগিয়ে মহাকাশের রেডিও সংকেত বিশ্লেষণ করা হতো।"
  },
  {
    id: 16,
    question: "What is the 'Avalanche Effect' in cryptographic SHA-256 hashing?",
    options: [
      "A minor change in input (even a single bit or comma) produces a drastically different and unpredictable output hash digest",
      "A snow avalanche that destroys an outdoor datacenter",
      "When computer CPU temperatures suddenly drop below zero",
      "When files are downloaded simultaneously by 100 users"
    ],
    correctAnswer: 0,
    explanationEn: "The avalanche effect ensures that even a microscopic change in input data completely scrambles the output hash, making reverse prediction impossible.",
    explanationBn: "অ্যাভালাঞ্চ ইফেক্ট (Avalanche Effect) হলো ইনপুটের একটি ক্ষুদ্রতম অক্ষর বা কমা পরিবর্তন করলেও তার আউটপুট হ্যাশ সম্পূর্ণ ও অপ্রত্যাশিতভাবে বদলে যাওয়া।"
  },
  {
    id: 17,
    question: "What is 'Proof of Stake' (PoS) and why is it increasingly favored over Proof of Work (PoW)?",
    options: [
      "PoS selects block validators based on the number of cryptocurrency tokens staked, consuming over 99% less electrical energy than PoW mining",
      "PoS requires miners to build massive coal power stations",
      "PoS only works on smartphones",
      "PoS makes the blockchain run slower"
    ],
    correctAnswer: 0,
    explanationEn: "Proof of Stake eliminates energy-hungry mining hardware rigs, achieving consensus through economic staking with 99.95% energy savings.",
    explanationBn: "প্রুফ অব স্টেক (PoS) পদ্ধতিতে কোনো বিদ্যুৎ অপচয়কারী মাইনিং ছাড়াই টোকেন স্টেক করার মাধ্যমে পরিবেশবান্ধব উপায়ে লেনদেন যাচাই করা হয়।"
  },
  {
    id: 18,
    question: "How do educational examination boards like CBSE utilize Blockchain for Academic Credentials?",
    options: [
      "By minting digital, tamper-evident Class 10/12 marksheets and certificates on blockchain ledgers for instant, fraud-proof verification by employers and colleges",
      "By eliminating all student examinations",
      "By replacing paper pens with digital styluses",
      "By printing diplomas on gold foil"
    ],
    correctAnswer: 0,
    explanationEn: "Blockchain academic certificates allow universities and employers globally to verify authenticity in seconds without contacting the board directly.",
    explanationBn: "CBSE ব্লকচেইনের সাহায্যে ডিজিটাল মার্কশিট ও সার্টিফিকেট প্রকাশ করে যাতে নিয়োগকর্তারা তাৎক্ষণিকভাবে জাল সার্টিফিকেট শনাক্ত ও যাচাই করতে পারেন।"
  },
  {
    id: 19,
    question: "What is the primary role of a 'P2P (Peer-to-Peer) Network' in Blockchain architecture?",
    options: [
      "Every node in the network maintains a full synchronized copy of the ledger, eliminating any single point of failure or centralized control",
      "Connecting two computer monitors together",
      "Streaming peer-to-peer music illegally",
      "Sharing printer paper between two offices"
    ],
    correctAnswer: 0,
    explanationEn: "A P2P distributed topology ensures that every participant holds a verified ledger replica, making the blockchain resilient against outages and censorship.",
    explanationBn: "P2P নেটওয়ার্কের কারণে প্রতিটি নোড সম্পূর্ণ খতিয়ানের একটি অনুলিপি নিজের কাছে রাখে, ফলে কোনো কেন্দ্রীয় সার্ভার নষ্ট হলেও সিস্টেম সচল থাকে।"
  },
  {
    id: 20,
    question: "Which of the following is an example of an 'Enterprise / Permissioned' Blockchain?",
    options: [
      "Hyperledger Fabric (Linux Foundation)",
      "Public Bitcoin Network",
      "Public Dogecoin Network",
      "Anonymous Darknet Ledger"
    ],
    correctAnswer: 0,
    explanationEn: "Hyperledger Fabric is a permissioned enterprise blockchain framework where network access and transaction visibility are strictly controlled.",
    explanationBn: "Hyperledger Fabric হলো এন্টারপ্রাইজ ব্যবহারের জন্য একটি পারমিশনড ব্লকচেইন ফ্রেমওয়ার্ক যেখানে শুধুমাত্র অনুমোদিত প্রতিষ্ঠানগুলো অংশগ্রহণ করতে পারে।"
  },
  {
    id: 21,
    question: "What is 'Decentralization' in Blockchain systems?",
    options: [
      "Transfer of control and decision-making from a centralized entity (individual, corporation, or government) to a distributed network of independent nodes",
      "Moving computer servers to the center of the room",
      "Deleting the central processor from a computer",
      "Connecting all computers to a single master server"
    ],
    correctAnswer: 0,
    explanationEn: "Decentralization prevents any single entity from unilaterally tampering with, altering, or shutting down the distributed transaction ledger.",
    explanationBn: "বিকেন্দ্রীকরণ (Decentralization) হলো ক্ষমতা কোনো একক সংস্থা বা সরকারের হাতে কুক্ষিগত না রেখে নেটওয়ার্কের সমস্ত নোডের মধ্যে সমানভাবে বণ্টন করা।"
  },
  {
    id: 22,
    question: "What is a 'Merkle Tree' inside a blockchain block?",
    options: [
      "A mathematical binary tree of cryptographic hashes used to efficiently and securely summarize and verify the integrity of thousands of transactions in a block",
      "A wooden tree planted outside a datacenter",
      "A branching algorithm used to render 3D leaves in video games",
      "A directory folder tree in Windows Explorer"
    ],
    correctAnswer: 0,
    explanationEn: "A Merkle tree hierarchically hashes transaction pairs up to a single 'Merkle Root' hash, enabling ultra-fast verification of individual transactions.",
    explanationBn: "মার্কেল ট্রি (Merkle Tree) হলো একটি ক্রিপ্টোগ্রাফিক ট্রি যা একটি ব্লকের ভেতরের হাজার হাজার লেনদেনের অখণ্ডতা দ্রুত ও নির্ভুলভাবে যাচাই করতে ব্যবহৃত হয়।"
  },
  {
    id: 23,
    question: "What is 'Distributed Resource Sharing' in Grid Computing?",
    options: [
      "Dynamic allocation and coordinated sharing of processing power, memory, software, and scientific datasets across administrative domains",
      "Passing a single USB drive around a classroom",
      "Sharing an internet connection with neighbors",
      "Printing multiple copies of a document"
    ],
    correctAnswer: 0,
    explanationEn: "Grid computing enables secure, controlled multi-institutional resource sharing among virtual scientific organizations.",
    explanationBn: "ডিস্ট্রিবিউটেড রিসোর্স শেয়ারিং হলো বিভিন্ন বিশ্ববিদ্যালয়ের কম্পিউটার ও সার্ভারকে পারস্পরিক বৈজ্ঞানিক গবেষণায় যৌথভাবে ব্যবহার করার প্রক্রিয়া।"
  },
  {
    id: 24,
    question: "What is 'Immutability' in the context of Blockchain ledgers?",
    options: [
      "The characteristic that once data is recorded and confirmed in a block, it is permanent and cannot be altered, overwritten, or deleted by anyone",
      "The inability of a computer to be moved physically",
      "A program that refuses to shut down",
      "A screen that cannot change brightness"
    ],
    correctAnswer: 0,
    explanationEn: "Immutability guarantees that confirmed historical blockchain transactions remain permanently unalterable for all future generations.",
    explanationBn: "ইমিউটেবিলিটি (Immutability) হলো ব্লকচেইনের এমন এক বৈশিষ্ট্য যেখানে একবার তথ্য লিপিবদ্ধ হলে তা কেউ পরিবর্তন বা মুছে ফেলতে পারে না।"
  },
  {
    id: 25,
    question: "Which of the following encapsulates the core takeaway of Grid Computing and Blockchain for CBSE Class 11 students?",
    options: [
      "Grid Computing pools distributed compute power for massive simulations; Blockchain provides an immutable, decentralized ledger for trustless digital record keeping",
      "Grid Computing and Blockchain are identical technologies with different names",
      "Both technologies were invented solely for video games",
      "Both technologies are illegal to study in schools"
    ],
    correctAnswer: 0,
    explanationEn: "Grid computing aggregates decentralized compute for massive tasks, while Blockchain establishes decentralized trust through cryptographic consensus.",
    explanationBn: "গ্রিড কম্পিউটিং জটিল হিসাবের জন্য কম্পিউটার শক্তি একত্র করে, আর ব্লকচেইন ক্রিপ্টোগ্রাফির মাধ্যমে একটি অপরিবর্তনীয় ও বিশ্বস্ত ডিজিটাল খতিয়ান তৈরি করে।"
  }
];
