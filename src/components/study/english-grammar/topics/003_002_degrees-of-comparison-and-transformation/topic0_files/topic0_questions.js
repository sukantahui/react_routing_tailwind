const questions = [
  {
    id: "q1",
    question: "Which preposition must follow Latin comparatives such as 'senior', 'junior', 'superior', 'inferior', 'prior', and 'preferable'?",
    options: [
      "than",
      "to",
      "from",
      "against"
    ],
    correctAnswer: 1,
    explanation: "Latin comparatives ending in '-ior' (and 'preferable') are strictly followed by the preposition 'to', never 'than'. (e.g. 'He is senior to me').",
    explanationBn: "Latin Comparative শব্দসমূহ (senior, junior, superior, inferior, preferable)-এর পর সর্বদা Preposition 'to' বসে, 'than' কখনোই বসে না।"
  },
  {
    id: "q2",
    question: "Transform this Superlative sentence into Positive degree: 'Iron is the most useful of all metals.'",
    options: [
      "Iron is more useful than any other metal.",
      "No other metal is as useful as iron.",
      "Very few metals are as useful as iron.",
      "All metals are as useful as iron."
    ],
    correctAnswer: 1,
    explanation: "When transforming a singular superlative ('the most useful'), the positive degree begins with 'No other + singular noun + is as/so ... as'.",
    explanationBn: "'The most useful' যুক্ত Superlative বাক্যকে Positive ডিগ্রিতে রূপান্তরের সূত্র: 'No other + singular noun + is as/so + positive degree + as'।"
  },
  {
    id: "q3",
    question: "Which of the following sentences corrects the illogical comparison in: 'The climate of Chennai is hotter than Kolkata'?",
    options: [
      "The climate of Chennai is hotter than that of Kolkata.",
      "The climate of Chennai is more hotter than Kolkata.",
      "Chennai is hotter than the climate of Kolkata.",
      "The climate of Chennai is hotter than Kolkata's climate of all."
    ],
    correctAnswer: 0,
    explanation: "You cannot compare the 'climate' of one city directly to the 'city' of Kolkata. You must compare climate to climate using 'that of Kolkata' (or 'Kolkata's').",
    explanationBn: "Illogical Comparison এড়াতে একই জাতীয় সত্ত্বার মধ্যে তুলনা করতে হয়: 'climate'-এর সাথে 'climate'-এর তুলনা করতে 'that of Kolkata' ব্যবহার করতে হবে।"
  },
  {
    id: "q4",
    question: "Which of the following adjectives is NON-GRADABLE (Absolute) and cannot logically take comparative or superlative forms?",
    options: [
      "Intelligent",
      "Unique",
      "Rich",
      "Cold"
    ],
    correctAnswer: 1,
    explanation: "'Unique' means one of a kind. Something cannot be 'more unique' or 'most unique'. Other absolute adjectives include: perfect, square, round, dead, complete, universal, chief.",
    explanationBn: "'Unique' একটি Absolute / Non-gradable Adjective যার অর্থ 'অনন্য'। তাই এর আগে 'more' বা 'most' বসানো ভুল।"
  },
  {
    id: "q5",
    question: "Transform into Comparative degree: 'Lead is the heaviest of all metals.'",
    options: [
      "Lead is heavier than any other metal.",
      "Lead is heavier than all other metal.",
      "No other metal is as heavy as lead.",
      "Lead is more heavy than other metals."
    ],
    correctAnswer: 0,
    explanation: "The comparative formula for absolute superlatives is: Subject + Verb + Comparative + 'than any other' + Singular Noun ('than any other metal').",
    explanationBn: "Comparative রূপান্তরের নিয়ম: Subject + Verb + Comparative + 'than any other' + Singular Noun ('than any other metal')।"
  },
  {
    id: "q6",
    question: "What is the correct distinction between 'elder' and 'older'?",
    options: [
      "There is no difference in modern English.",
      "'Elder' is used exclusively for members of the same family and is not followed by 'than'; 'older' is used for general age of people or things and can be followed by 'than'.",
      "'Elder' is used for things; 'older' is used for people.",
      "'Elder' is followed by 'than'; 'older' is followed by 'to'."
    ],
    correctAnswer: 1,
    explanation: "'Elder' / 'eldest' is restricted to kinship (same family) in attributive position without 'than' (e.g. 'my elder brother'). 'Older' / 'oldest' applies generally to anyone or anything and pairs with 'than' ('He is older than me').",
    explanationBn: "'Elder' শুধুমাত্র একই পরিবারের রক্তসম্পর্কীয় সদস্যদের ক্ষেত্রে Noun-এর পূর্বে বসে (এর সাথে 'than' বসে না)। 'Older' সাধারণ বয়স বা বস্তুর ক্ষেত্রে বসে এবং এর সাথে 'than' ব্যবহার হয়।"
  },
  {
    id: "q7",
    question: "Identify the error in: 'She is more cleverer than her sister.'",
    options: [
      "It should use 'as' instead of 'than'.",
      "Double comparative: 'more' and 'cleverer' cannot be used together.",
      "'Cleverer' is not a valid word.",
      "'Sister' should be plural."
    ],
    correctAnswer: 1,
    explanation: "Using 'more' alongside an '-er' comparative inflection creates a prohibited Double Comparative. The correct sentence is 'She is cleverer than her sister' (or 'more clever').",
    explanationBn: "Double Comparative (একত্রে 'more' এবং '-er' যুক্ত করা) ব্যাকরণগত ভুল। সঠিক বাক্য: 'She is cleverer than her sister'।"
  },
  {
    id: "q8",
    question: "Transform into Positive degree: 'Kolkata is larger than most other cities in India.'",
    options: [
      "No other city in India is as large as Kolkata.",
      "Very few cities in India are as large as Kolkata.",
      "Kolkata is as large as all cities in India.",
      "All cities in India are larger than Kolkata."
    ],
    correctAnswer: 1,
    explanation: "When a comparative has 'than most other + plural noun' (or superlative has 'one of the largest'), the positive degree starts with 'Very few + plural noun' ('Very few cities in India are as large as Kolkata').",
    explanationBn: "'One of the largest' বা 'than most other' যুক্ত বাক্যকে Positive করতে 'Very few + Plural noun' দিয়ে শুরু করতে হয়।"
  },
  {
    id: "q9",
    question: "What is the difference between 'farther' and 'further'?",
    options: [
      "'Farther' refers to physical geographical distance; 'further' refers to figurative extent, additional quantity, or depth.",
      "'Further' refers only to physical distance; 'farther' refers to time.",
      "Both are completely interchangeable in all contexts.",
      "'Farther' is British English; 'further' is American English."
    ],
    correctAnswer: 0,
    explanation: "'Farther' measures literal physical distance ('5 miles farther down the road'). 'Further' denotes additional or deeper extent ('for further information', 'without further delay').",
    explanationBn: "'Farther' ভৌগোলিক বা শারীরিক দূরত্ব বোঝায় ('5 miles farther'); আর 'further' অতিরিক্ত বা পরবর্তী মাত্রা বোঝায় ('further details')।"
  },
  {
    id: "q10",
    question: "Choose the correct sentence involving Parallel / Proportional Comparison:",
    options: [
      "The more you earn, more you spend.",
      "More you earn, the more you spend.",
      "The more you earn, the more you spend.",
      "The more you earn, the most you spend."
    ],
    correctAnswer: 2,
    explanation: "The parallel comparative formula is: 'THE + comparative clause, THE + comparative clause'. Both clauses must have 'The'.",
    explanationBn: "আনুপাতিক তুলনা (Parallel Comparison)-র সঠিক গঠন হলো: 'THE + Comparative ..., THE + Comparative ...'। উভয় অংশে 'The' থাকা বাধ্যতামূলক।"
  },
  {
    id: "q11",
    question: "Identify the correct comparative form of the adjective 'bad':",
    options: [
      "badder",
      "more bad",
      "worse",
      "worst"
    ],
    correctAnswer: 2,
    explanation: "'Bad' has an irregular comparative: Bad (Positive) -> Worse (Comparative) -> Worst (Superlative).",
    explanationBn: "'Bad'-এর অনিয়মিত রূপ: Bad (Positive) -> Worse (Comparative) -> Worst (Superlative)।"
  },
  {
    id: "q12",
    question: "Which of the following sentences correctly compares two qualities in the SAME person?",
    options: [
      "He is braver than wise.",
      "He is more brave than wise.",
      "He is as brave as wise.",
      "He is most brave than wise."
    ],
    correctAnswer: 1,
    explanation: "When comparing two different qualities of the SAME person or entity, always use 'more + positive degree', never the '-er' form (e.g. 'He is more brave than wise').",
    explanationBn: "একই ব্যক্তির দুটি ভিন্ন গুণের মধ্যে তুলনা বোঝালে '-er' যুক্ত না করে সর্বদা 'more + Positive Degree' ব্যবহার করতে হয় ('more brave than wise')।"
  },
  {
    id: "q13",
    question: "Transform into Superlative degree: 'No other dramatist in English is as great as Shakespeare.'",
    options: [
      "Shakespeare is greater than any other dramatist in English.",
      "Shakespeare is the greatest dramatist in English.",
      "Shakespeare is one of the greatest dramatists in English.",
      "Shakespeare is as great as all dramatists in English."
    ],
    correctAnswer: 1,
    explanation: "'No other ... as great as' converts to absolute superlative: 'Subject + is the greatest + singular noun' ('Shakespeare is the greatest dramatist in English').",
    explanationBn: "'No other ... as great as' যুক্ত Positive বাক্য সরাসরি Absolute Superlative-এ রূপান্তরিত হয়: 'Shakespeare is the greatest dramatist in English'।"
  },
  {
    id: "q14",
    question: "Select the grammatically correct sentence:",
    options: [
      "Tea is preferable than coffee.",
      "Tea is more preferable than coffee.",
      "Tea is preferable to coffee.",
      "Tea is most preferable to coffee."
    ],
    correctAnswer: 2,
    explanation: "'Preferable' already conveys comparative value and is inherently paired with the preposition 'to' without 'more'.",
    explanationBn: "'Preferable' শব্দের সাথে কখনোই 'more' বা 'than' বসে না; এর সাথে সর্বদা 'to' বসে ('Tea is preferable to coffee')।"
  },
  {
    id: "q15",
    question: "What is the comparative form of 'little' when referring to quantity?",
    options: [
      "littler",
      "less",
      "least",
      "lesser"
    ],
    correctAnswer: 1,
    explanation: "Positive: Little -> Comparative: Less (or Lesser in archaic/specialized noun use) -> Superlative: Least.",
    explanationBn: "পরিমাণ নির্দেশক 'Little'-এর Comparative রূপ হলো 'Less' এবং Superlative রূপ হলো 'Least'।"
  },
  {
    id: "q16",
    question: "Which sentence correctly uses 'any other' to exclude the subject from the compared group?",
    options: [
      "Gold is more precious than any metal.",
      "Gold is more precious than any other metal.",
      "Gold is more precious than all metal.",
      "Gold is as precious than any metal."
    ],
    correctAnswer: 1,
    explanation: "When comparing an item to its own class, 'other' must be included ('than any other metal') so that gold is not compared with itself (gold is a metal).",
    explanationBn: "একই শ্রেণীর অন্তর্ভুক্ত কোনো উপাদানের তুলনা করার সময় Subject-কে বাদ দিতে 'other' যোগ করা বাধ্যতামূলক ('than any other metal')।"
  },
  {
    id: "q17",
    question: "If we say 'Diamond is harder than any metal', why is 'other' omitted?",
    options: [
      "It is a grammar error; 'other' must always be present.",
      "Because diamond is a mineral/allotrope of carbon, not a metal; it is not part of the metal class, so self-exclusion is not needed.",
      "Because 'harder' is irregular.",
      "Because 'diamond' is singular."
    ],
    correctAnswer: 1,
    explanation: "Since diamond does not belong to the class of metals, 'other' is NOT used. We say 'Diamond is harder than any metal'.",
    explanationBn: "হীরে (Diamond) যেহেতু ধাতু (Metal) শ্রেণীর অন্তর্ভুক্ত নয়, তাই এখানে 'other' বাদ থাকবে ('harder than any metal')।"
  },
  {
    id: "q18",
    question: "What is the meaning of 'latter' vs 'later'?",
    options: [
      "'Later' refers to time; 'latter' refers to the second of two mentioned items.",
      "'Later' refers to position; 'latter' refers to time.",
      "Both mean the same thing.",
      "'Latter' is superlative; 'later' is comparative."
    ],
    correctAnswer: 0,
    explanation: "'Later' is the comparative of 'late' relating to time ('See you later'). 'Latter' denotes positional sequence between two items ('Of milk and tea, I prefer the latter').",
    explanationBn: "'Later' সময় নির্দেশ করে (দেরিতে); আর 'latter' পূর্বে উল্লিখিত দুটি বিষয়ের মধ্যে দ্বিতীয়টিকে নির্দেশ করে।"
  },
  {
    id: "q19",
    question: "Which of the following sentences has a correct transformation of: 'Mount Everest is higher than all other peaks in the world'?",
    options: [
      "No other peak in the world is as high as Mount Everest.",
      "Mount Everest is the highest peak in the world.",
      "Very few peaks in the world are as high as Mount Everest.",
      "Both A and B are correct transformations."
    ],
    correctAnswer: 3,
    explanation: "Both A (Positive: 'No other peak is as high as Mount Everest') and B (Superlative: 'Mount Everest is the highest peak in the world') are valid semantically identical transformations.",
    explanationBn: "A (Positive) এবং B (Superlative) উভয় বাক্যই অর্থ অপরিবর্তিত রেখে সঠিক রূপান্তর প্রদর্শন করে।"
  },
  {
    id: "q20",
    question: "Identify the absolute adjective in: 'This ancient manuscript contains a perfect description of the empire.'",
    options: [
      "ancient",
      "manuscript",
      "perfect",
      "empire"
    ],
    correctAnswer: 2,
    explanation: "'Perfect' is an absolute adjective meaning flawless. It cannot grammatically admit degrees (no 'more perfect').",
    explanationBn: "'Perfect' একটি Absolute Adjective যা চরম অবস্থা প্রকাশ করে এবং কোনো তুলনামূলক মাত্রা গ্রহণ করে না।"
  },
  {
    id: "q21",
    question: "Choose the correct sentence:",
    options: [
      "This is the most unique opportunity of my life.",
      "This is a unique opportunity in my life.",
      "This is a more unique opportunity.",
      "This is the uniquest opportunity."
    ],
    correctAnswer: 1,
    explanation: "'Unique' means sole/unparalleled; modifiers like 'most' or 'more' are redundant and incorrect. 'A unique opportunity' is correct.",
    explanationBn: "'Unique'-এর পূর্বে 'most' বা 'more' বসানো ভুল; 'a unique opportunity' সম্পূর্ণ শুদ্ধ।"
  },
  {
    id: "q22",
    question: "In the sentence 'Of the two sisters, Ananya is _______', what is the correct choice?",
    options: [
      "the prettiest",
      "prettier",
      "the prettier",
      "more pretty"
    ],
    correctAnswer: 2,
    explanation: "When selecting between exactly TWO entities with 'of the two', the comparative degree MUST take the definite article 'the': 'the prettier'.",
    explanationBn: "দুটি সত্ত্বার মধ্য থেকে একজনকে নির্দিষ্ট করার সময় ('of the two...') Comparative Degree-এর পূর্বে 'the' বসে ('the prettier')।"
  },
  {
    id: "q23",
    question: "Transform into Comparative degree: 'Very few kings were as great as Ashoka.'",
    options: [
      "Ashoka was greater than most other kings.",
      "Ashoka was the greatest king.",
      "No other king was as great as Ashoka.",
      "Ashoka was greater than any other king."
    ],
    correctAnswer: 0,
    explanation: "'Very few ... as great as' transforms into comparative with 'than most other + plural noun': 'Ashoka was greater than most other kings'.",
    explanationBn: "'Very few' যুক্ত Positive বাক্য Comparative-এ 'greater than most other + plural noun'-এ পরিবর্তিত হয়।"
  },
  {
    id: "q24",
    question: "Which of the following forms is the irregular superlative of 'old' used for family rank?",
    options: [
      "oldest",
      "eldest",
      "most old",
      "elderest"
    ],
    correctAnswer: 1,
    explanation: "'Eldest' is the irregular superlative applied strictly to familial seniority without comparative 'than'.",
    explanationBn: "পারিবারিক সম্পর্কের ক্ষেত্রে জ্যেষ্ঠতা বোঝাতে 'eldest' রূপটি ব্যবহৃত হয়।"
  },
  {
    id: "q25",
    question: "What is the correct superlative form of 'up' acting as an adjective?",
    options: [
      "upper",
      "uppest",
      "uppermost / upmost",
      "most upper"
    ],
    correctAnswer: 2,
    explanation: "The positional adverb/preposition 'up' forms comparative 'upper' and superlative 'uppermost' or 'upmost'.",
    explanationBn: "'Up' থেকে গঠিত Comparative হলো 'upper' এবং Superlative হলো 'uppermost' বা 'upmost'।"
  }
];

export default questions;
