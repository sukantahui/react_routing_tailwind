// topic0_questions.js
// Module 002_004: Articles (A, An, The), Zero Article & Quantifying Determiners
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Which of the following phrases correctly uses the INDEFINITE ARTICLE based on initial phonetic sound?",
    options: [
      "An university",
      "A European",
      "An one-rupee note",
      "A honest person"
    ],
    correctAnswer: 1,
    explanation: "'European' begins with the consonant semi-vowel sound /j/ (yoo-ro-pe-an), which mandates the article 'A' ('A European'). 'Honest' has a silent /h/ and takes 'An'. 'University' starts with /j/ and takes 'A'. 'One' starts with /w/ and takes 'A'.",
    explanationBn: "'European' শব্দটি Vowel 'E' দিয়ে শুরু হলেও এর উচ্চারণ কনসোনেন্ট সাউন্ড /j/ (ইউ)-এর মতো, তাই এর পূর্বে 'A' বসে। একইভাবে 'A university', 'A one-rupee note', কিন্তু 'An honest man' (যেখানে 'h' অনুচ্চারিত)।"
  },
  {
    id: 2,
    question: "In which of the following cases is the definite article 'The' INCORRECTLY used?",
    options: [
      "The Himalayas",
      "The Mount Everest",
      "The Indian Ocean",
      "The Ganges"
    ],
    correctAnswer: 1,
    explanation: "'The' is used before mountain RANGES ('The Himalayas', 'The Alps'), but NEVER before individual mountain PEAKS ('Mount Everest', 'Mount Kilimanjaro', 'Kanchenjunga').",
    explanationBn: "পর্বতমালা (Mountain Ranges)-এর পূর্বে 'The' বসে ('The Himalayas'); কিন্তু একক পর্বতশৃঙ্গের (Individual Peaks) পূর্বে কখনোই 'The' বসে না ('Mount Everest', 'The Mount Everest' ভুল)।"
  },
  {
    id: 3,
    question: "Which of the following country names MUST take the definite article 'The'?",
    options: [
      "India",
      "United States of America",
      "Japan",
      "Germany"
    ],
    correctAnswer: 1,
    explanation: "Countries with plural names, or those containing political descriptor words like 'States', 'Kingdom', 'Republic', or 'Emirates' take 'The': 'The USA', 'The UK', 'The Netherlands', 'The UAE', 'The Philippines'.",
    explanationBn: "যেসব দেশের নামের সাথে 'States', 'Kingdom', 'Republic' বা বহুবচন রূপ থাকে, সেগুলোর পূর্বে 'The' বসে: 'The USA', 'The UK', 'The Netherlands', 'The UAE'।"
  },
  {
    id: 4,
    question: "In the sentence 'Swadeep has ________ friends in Barrackpore, so he feels lonely', which quantifier correctly conveys the negative sense of 'almost none'?",
    options: [
      "a few",
      "few",
      "the few",
      "many"
    ],
    correctAnswer: 1,
    explanation: "'Few' (without 'a') has a negative meaning equivalent to 'hardly any' or 'almost none'. 'A few' has a positive meaning meaning 'some'.",
    explanationBn: "'Few' (a ছাড়া) না-বোধক অর্থ প্রকাশ করে (প্রায় নেই বললেই চলে)। 'A few' হ্যাঁ-বোধক অর্থ প্রকাশ করে (কিছু সংখ্যক)। যেহেতু সে একাকী বোধ করে, তাই 'few' হবে।"
  },
  {
    id: 5,
    question: "In 'There is ________ milk left in the refrigerator, so we can make a cup of tea', which quantifier is appropriate?",
    options: [
      "little",
      "a little",
      "the little",
      "few"
    ],
    correctAnswer: 1,
    explanation: "'A little' is used with uncountable nouns ('milk') to express a positive quantity meaning 'some / a small amount' (enough to make tea). 'Little' would mean almost none.",
    explanationBn: "Uncountable Noun-এর ক্ষেত্রে 'a little' ইতিবাচক পরিমাণ (কিছুটা পরিমাণ) বোঝায়, যা দিয়ে চা বানানো সম্ভব। 'Little' মানে প্রায় কিছুই নেই।"
  },
  {
    id: 6,
    question: "Which of the following takes ZERO ARTICLE (omission of article)?",
    options: [
      "Names of languages (e.g. Bengali, English, French)",
      "Names of meals (e.g. Breakfast, Lunch, Dinner)",
      "Names of academic subjects (e.g. Physics, History)",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Standard English omits articles before languages ('He speaks English'), general meals ('Let's have lunch'), and academic subjects ('She studies Physics').",
    explanationBn: "ভাষার নাম ('English'), সাধারণ আহারের নাম ('Dinner'), এবং বিষয়ের নামের ('Physics') পূর্বে কোনো Article বসে না (Zero Article)।"
  },
  {
    id: 7,
    question: "What is the difference in meaning between: 'He went to hospital' vs 'He went to THE hospital'?",
    options: [
      "'He went to hospital' means as a patient for medical treatment; 'He went to the hospital' means visiting someone or on official work.",
      "Both mean the exact same thing.",
      "The first is an American slang.",
      "The second implies he works as a surgeon."
    ],
    correctAnswer: 0,
    explanation: "When institutional nouns (school, college, hospital, church, prison, temple) are visited for their PRIMARY institutional purpose, omit 'the'. When visited for a SECONDARY purpose, use 'the'.",
    explanationBn: "প্রাথমিক উদ্দেশ্যে (রোগী হিসেবে) গেলে Article বসে না ('went to hospital'); কিন্তু পরিদর্শক বা অন্য কাজে গেলে 'the' বসে ('went to the hospital')।"
  },
  {
    id: 8,
    question: "In the comparative sentence '________ higher you climb, ________ cooler you feel', which articles are required?",
    options: [
      "A, a",
      "The, the",
      "The, a",
      "Zero article, zero article"
    ],
    correctAnswer: 1,
    explanation: "In parallel proportional comparative constructions ('The more... the more...'), both comparative clauses take the definite article 'The' as an adverbial intensifier: 'THE higher you climb, THE cooler you feel.'",
    explanationBn: "সমান্তরাল তুলনামূলক বাক্যে (Proportional Comparison) উভয় দিকেই 'The' বসে: 'The higher you climb, the cooler you feel'।"
  },
  {
    id: 9,
    question: "Choose the correct article for an abbreviation: 'He is ________ MBA graduate from a prestigious institute.'",
    options: [
      "a",
      "an",
      "the",
      "zero article"
    ],
    correctAnswer: 1,
    explanation: "The initial letter 'M' in 'MBA' is pronounced with an initial vowel sound /ɛm/ (em-bee-ay). Therefore, it requires the article 'An': 'AN MBA graduate', 'AN MP', 'AN FIR', 'AN SDPO'.",
    explanationBn: "সংক্ষিপ্ত শব্দ 'MBA'-এর প্রথম অক্ষর 'M' উচ্চারণে প্রথমে Vowel Sound /ɛm/ (এম) আসে, তাই এর পূর্বে 'An' বসে: 'An MBA', 'An MP', 'An FIR', 'An SDPO'।"
  },
  {
    id: 10,
    question: "In 'I spent ________ money I had on buying reference books', which quantifier correctly fills the blank?",
    options: [
      "little",
      "a little",
      "the little",
      "few"
    ],
    correctAnswer: 2,
    explanation: "'The little' means 'the small quantity that was available, all of it'. Since all the available money was spent, 'the little' is correct.",
    explanationBn: "'The little' মানে 'যে সামান্য পরিমাণ ছিল তার সম্পূর্ণটাই'। যেহেতু সমস্ত টাকাই বই কিনতে খরচ হয়ে গেছে, তাই 'the little' বসবে।"
  },
  {
    id: 11,
    question: "Which of the following correctly uses the definite article with MUSICAL INSTRUMENTS?",
    options: [
      "Swadeep plays guitar very well.",
      "Swadeep plays the guitar very well.",
      "Swadeep plays a guitar very well.",
      "Swadeep plays an guitar."
    ],
    correctAnswer: 1,
    explanation: "In standard British and international English, verbs of playing take the definite article 'The' before musical instruments: 'plays THE piano', 'plays THE violin', 'plays THE guitar'.",
    explanationBn: "বাদ্যযন্ত্র বাজানোর ক্ষেত্রে বাদ্যযন্ত্রের নামের পূর্বে সর্বদাই 'The' বসে: 'plays the guitar', 'plays the piano'।"
  },
  {
    id: 12,
    question: "In the sentence '________ gold of Kolar is renowned worldwide', why is 'The' required before the material noun 'gold'?",
    options: [
      "Because gold is a precious metal.",
      "Because the material noun is particularized and specified by the phrase 'of Kolar'.",
      "Because gold starts with a consonant.",
      "Because Kolar is a town."
    ],
    correctAnswer: 1,
    explanation: "While material nouns in general take zero article ('Gold is a precious metal'), when a material noun is particularized by a following defining phrase ('of Kolar'), it requires 'The': 'THE gold of Kolar'.",
    explanationBn: "সাধারণভাবে Material Noun-এর পূর্বে Article বসে না; কিন্তু যখন কোনো নির্দিষ্ট স্থানের উপাদান বোঝানো হয় ('gold of Kolar'), তখন নির্দিষ্ট করে 'The' বসে।"
  },
  {
    id: 13,
    question: "Which of the following sentences correctly applies article rules to HOLY BOOKS?",
    options: [
      "Gita is a sacred scripture.",
      "The Gita is a sacred scripture.",
      "A Gita is a sacred scripture.",
      "The Homer's Iliad is an epic."
    ],
    correctAnswer: 1,
    explanation: "Holy and sacred books take 'The': 'The Gita', 'The Quran', 'The Bible', 'The Vedas'. (Exception: If preceded by the author's possessive name, omit 'the': 'Homer's Iliad', NOT *'The Homer's Iliad'*).",
    explanationBn: "ধর্মগ্রন্থের নামের পূর্বে 'The' বসে ('The Gita', 'The Bible')। তবে লেখকের নাম যুক্ত থাকলে 'the' বসে না ('Homer's Iliad')।"
  },
  {
    id: 14,
    question: "In 'He is ________ Newton of our department', why is the indefinite article 'a' / definite article 'the' used before a Proper Noun?",
    options: [
      "Because the proper noun is used metaphorically as a common noun possessing the legendary attributes of Newton.",
      "Because Newton is an adjective.",
      "It is a typographical mistake.",
      "Proper nouns always take articles."
    ],
    correctAnswer: 0,
    explanation: "When a proper noun is used figuratively to denote someone with similar renowned characteristics, it takes an article: 'He is THE Newton of our department' (meaning the greatest scientist).",
    explanationBn: "কোনো বিশ্বখ্যাত ব্যক্তির গুণ বা মেধার তুলনা দিতে Proper Noun-কে Common Noun হিসেবে ব্যবহার করলে তার পূর্বে 'The' বসে: 'the Newton of our department'।"
  },
  {
    id: 15,
    question: "In the sentence 'Do you have ________ questions regarding the grammar module?', which quantifier is standard in questions and negatives?",
    options: [
      "some",
      "any",
      "little",
      "much"
    ],
    correctAnswer: 1,
    explanation: "In general questions and negative sentences, 'any' is used. 'Some' is typically restricted to affirmative statements or polite offers expecting a 'yes' answer.",
    explanationBn: "সাধারণ প্রশ্নবোধক এবং না-বোধক বাক্যে 'any' ব্যবহৃত হয়। হ্যাঁ-বোধক বাক্যে 'some' ব্যবহৃত হয়।"
  },
  {
    id: 16,
    question: "Which of the following ocean/river names is punctuated CORRECTLY?",
    options: [
      "Pacific Ocean",
      "The Pacific Ocean",
      "An Pacific Ocean",
      "Pacific the Ocean"
    ],
    correctAnswer: 1,
    explanation: "All oceans, seas, rivers, and gulfs strictly require 'The': 'The Pacific Ocean', 'The Atlantic Ocean', 'The Arabian Sea', 'The Ganges', 'The Nile', 'The Persian Gulf'.",
    explanationBn: "মহাসাগর, সাগর, নদী ও উপসাগরের নামের পূর্বে সর্বদাই 'The' বসে: 'The Pacific Ocean', 'The Ganges', 'The Arabian Sea'।"
  },
  {
    id: 17,
    question: "In 'He has been appointed ________ Director of the institution', why is there NO article before 'Director'?",
    options: [
      "Because Director is an adjective.",
      "Because nouns denoting a unique office or position held by only one person at a time take zero article after verbs like appoint, elect, make.",
      "Because director is an uncountable noun.",
      "It is an informal sentence."
    ],
    correctAnswer: 1,
    explanation: "When a noun denotes a unique office (held by one person) following verbs like 'elected', 'appointed', 'made', the article is omitted: 'elected President', 'appointed Director'.",
    explanationBn: "'Elected', 'appointed', 'made'-এর পর কোনো অনন্য বা শীর্ষ পদের নামের পূর্বে Article বসে না: 'appointed Director', 'elected President'।"
  },
  {
    id: 18,
    question: "What is the difference between 'Each student' and 'Every student'?",
    options: [
      "'Each' is used for two or more individuals considered individually; 'Every' is used for a larger number considered as a whole group (always greater than two).",
      "'Each' is plural; 'Every' is singular.",
      "'Every' can be used for two people.",
      "There is no difference."
    ],
    correctAnswer: 0,
    explanation: "'Each' refers to individuals separately (applicable to two or more). 'Every' refers to all members of a larger group collectively (only applicable to three or more). Both take singular verbs.",
    explanationBn: "'Each' দুই বা ততোধিক ব্যক্তির ক্ষেত্রে প্রত্যেককে আলাদাভাবে বোঝায়; 'Every' দুইয়ের অধিক বৃহত্তর দলের ক্ষেত্রে সকলকে বোঝায়। উভয়ই Singular Verb নেয়।"
  },
  {
    id: 19,
    question: "In 'The English defeated the French at Waterloo', what do 'The English' and 'The French' mean?",
    options: [
      "The English language and the French language",
      "The people / army of England and France respectively",
      "English food and French wine",
      "English literature"
    ],
    correctAnswer: 1,
    explanation: "When 'The' is placed before the name of a language/nationality adjective, it refers to the entire NATION / PEOPLE: 'The English' = the English people; 'English' = the language.",
    explanationBn: "ভাষার নামের আগে 'The' বসালে সমগ্র জাতিকে বোঝায়: 'The English' = ইংরেজ জাতি; কিন্তু শুধু 'English' = ইংরেজি ভাষা।"
  },
  {
    id: 20,
    question: "In the sentence 'He is ________ heir to a vast ancestral estate in Barrackpore', which article is correct?",
    options: [
      "a",
      "an",
      "the",
      "zero article"
    ],
    correctAnswer: 1,
    explanation: "The initial letter 'h' in 'heir' (and 'heiress') is silent, producing an initial vowel sound /ɛə/ (air). Hence, it takes 'An': 'AN heir'.",
    explanationBn: "'Heir' (উত্তরাধিকারী) শব্দের 'h' অনুচ্চারিত থাকায় Vowel Sound দিয়ে শুরু হয়, তাই এর পূর্বে 'An' বসে: 'An heir'।"
  },
  {
    id: 21,
    question: "Which of the following sentences correctly applies article rules to DESERTS and ISLAND GROUPS?",
    options: [
      "The Sahara Desert and The Andaman Islands",
      "Sahara Desert and Andaman Islands",
      "A Sahara Desert and An Andaman Islands",
      "The Sahara Desert and Andaman Island"
    ],
    correctAnswer: 0,
    explanation: "Deserts and island archipelago groups require 'The': 'The Sahara Desert', 'The Thar Desert', 'The Andaman and Nicobar Islands', 'The West Indies'.",
    explanationBn: "মরুভূমি এবং দ্বীপপুঞ্জের (Island Groups) নামের পূর্বে 'The' বসে: 'The Sahara Desert', 'The Andaman Islands'।"
  },
  {
    id: 22,
    question: "In 'He gave me ________ advice on software architecture', which option is correct?",
    options: [
      "an advice",
      "some advice",
      "many advices",
      "an advices"
    ],
    correctAnswer: 1,
    explanation: "'Advice' is uncountable and cannot take 'an' or 'many advices'. Use 'some advice' or 'a piece of advice'.",
    explanationBn: "'Advice' Uncountable Noun হওয়ায় 'an advice' বা 'advices' হয় না; সঠিক রূপ হলো 'some advice' বা 'a piece of advice'।"
  },
  {
    id: 23,
    question: "In the sentence 'Man is a social animal', why is there NO article before 'Man'?",
    options: [
      "Because 'Man' is used in its widest universal sense denoting humanity as a whole.",
      "Because Man is capitalized.",
      "Because social is an adjective.",
      "It is a grammatical exception for nouns ending in -n."
    ],
    correctAnswer: 0,
    explanation: "When 'Man' or 'Woman' is used in a universal sense representing all humanity, articles are omitted: 'Man is mortal', 'Man is a social animal'.",
    explanationBn: "সমগ্র মানবজাতি বা মনুষ্যত্ব অর্থে 'Man' বা 'Woman'-এর পূর্বে কোনো Article বসে না: 'Man is mortal'।"
  },
  {
    id: 24,
    question: "In 'I have read ________ pages of this book', which quantifier is appropriate?",
    options: [
      "much",
      "many",
      "little",
      "a little"
    ],
    correctAnswer: 1,
    explanation: "'Pages' is a plural countable noun, so it requires the countable quantifier 'many'. ('Much' and 'little' are strictly for uncountable nouns).",
    explanationBn: "'Pages' হলো Countable Plural Noun, তাই এর সাথে 'many' বসবে ('much' বা 'little' কেবল Uncountable Noun-এ বসে)।"
  },
  {
    id: 25,
    question: "Why is mastering Articles and Quantifiers critical for Bengali-medium students transitioning into advanced English?",
    options: [
      "Because Bengali has no definite/indefinite articles ('A/An/The') system like English (using post-nominal enclitics like '-টি', '-খানা', '-গুলো' instead), making article placement the single most frequent L1 interference error.",
      "Because English articles change every year.",
      "Because articles only apply in spoken English.",
      "Because articles are only used in science."
    ],
    correctAnswer: 0,
    explanation: "Bengali uses enclitic particles ('-টা', '-টি', '-গুলো') attached after nouns rather than preceding independent articles ('a', 'an', 'the'), making English article rules a major source of translation and grammatical interference.",
    explanationBn: "বাংলা ভাষায় 'A/An/The'-এর মতো পৃথক Article নেই; বাংলায় শব্দের শেষে পদাশ্রয়ী নির্দেশক ('-টা', '-টি', '-খানা') যুক্ত হয়। তাই ইংরেজি Article-এর সঠিক প্রয়োগ শেখা বাংলা মাধ্যম শিক্ষার্থীদের জন্য সর্বাধিক জরুরি।"
  }
];

export default questions;
