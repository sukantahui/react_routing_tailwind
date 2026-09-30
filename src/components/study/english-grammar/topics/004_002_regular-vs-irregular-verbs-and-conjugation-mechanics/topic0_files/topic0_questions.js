// topic0_questions.js
// Module 004_002: Regular vs Irregular Verbs, 5 Principal Forms & Confusable Verb Pairs

const questions = [
  {
    id: 1,
    question: "Which of the following sentences uses the verb 'lie' (to recline) correctly in the past tense?",
    options: [
      "The exhausted traveler lay under the banyan tree for two hours.",
      "The exhausted traveler laid under the banyan tree for two hours.",
      "The exhausted traveler lied under the banyan tree for two hours.",
      "The exhausted traveler has lain under the tree yesterday."
    ],
    correctAnswer: 0,
    explanation: "The intransitive verb 'lie' (to recline) conjugates as: Base=lie, Past=lay, Past Participle=lain. 'Laid' is the past of transitive 'lay' (to put/place something).",
    explanationBn: "বিশ্রাম নেওয়া অর্থে Intransitive 'lie'-এর Past tense হল 'lay' (lie -> lay -> lain)। 'Laid' হল Transitive 'lay' (কোনো কিছু রাখা)-এর Past tense।"
  },
  {
    id: 2,
    question: "Select the correct verb to complete: 'Please _______ the newborn baby gently on the cot.'",
    options: ["lay", "lie", "lain", "lying"],
    correctAnswer: 0,
    explanation: "'Lay' is a transitive verb requiring a direct object ('the newborn baby'). Its present base form is 'lay' (lay -> laid -> laid).",
    explanationBn: "'The newborn baby' একটি Direct Object, তাই Transitive Verb হিসেবে 'lay' (রাখা) বসবে।"
  },
  {
    id: 3,
    question: "Identify the sentence with the correct usage of 'rise' or 'raise':",
    options: [
      "The committee raised important questions during the annual meeting.",
      "The committee rose important questions during the annual meeting.",
      "The sun raises in the east every morning.",
      "Smoke was raising from the chimney."
    ],
    correctAnswer: 0,
    explanation: "'Raise' is transitive (raise + object: 'raised important questions'). 'Rise' is intransitive (no object: 'the sun rises').",
    explanationBn: "'Raise' হল Transitive (Raise + Object); 'Rise' হল Intransitive (The sun rises, কোনো Object নেই)।"
  },
  {
    id: 4,
    question: "In which sentence is the verb 'hang' used with correct grammatical inflection for human capital punishment?",
    options: [
      "The notorious assassin was hanged at dawn after the supreme verdict.",
      "The notorious assassin was hung at dawn after the supreme verdict.",
      "The assassin was hanging on the wall.",
      "The judge hung the criminal yesterday."
    ],
    correctAnswer: 0,
    explanation: "When 'hang' refers to execution by hanging, its past and participle forms are strictly 'hanged'. For objects suspended on a wall, it is 'hung' (hang -> hung -> hung).",
    explanationBn: "ফাঁসি দেওয়া অর্থে 'hang'-এর Past ও Past Participle হল 'hanged'। ছবি বা জামাকাপড় টাঙানো অর্থে 'hung' ব্যবহৃত হয়।"
  },
  {
    id: 5,
    question: "Which of the following irregular verbs has IDENTICAL forms across Base (V1), Simple Past (V2), and Past Participle (V3)?",
    options: ["Burst", "Burn", "Bite", "Blow"],
    correctAnswer: 0,
    explanation: "'Burst' is an invariable 3-form identical verb: burst -> burst -> burst (like put, cut, hit, hurt, cast, spread).",
    explanationBn: "'Burst' একটি 3-Form Identical Verb: burst -> burst -> burst (কখনোই 'bursted' হয় না)।"
  },
  {
    id: 6,
    question: "Identify the correct 5 Principal Forms of the verb 'Fly':",
    options: [
      "V1: fly, V2: flew, V3: flown, V4: flying, V5: flies",
      "V1: fly, V2: flied, V3: flied, V4: flying, V5: flys",
      "V1: fly, V2: flew, V3: flowed, V4: flying, V5: flies",
      "V1: fly, V2: flow, V3: flown, V4: flying, V5: flies"
    ],
    correctAnswer: 0,
    explanation: "'Fly' is an irregular strong verb: fly (V1), flew (V2), flown (V3), flying (V4), flies (V5). (Do not confuse with 'flow -> flowed -> flowed').",
    explanationBn: "'Fly'-এর ৫টি রূপ হল: fly -> flew -> flown -> flying -> flies।"
  },
  {
    id: 7,
    question: "Select the sentence with the correct past tense of 'fall' (drop) vs 'fell' (cut down):",
    options: [
      "The lumberjack felled three massive pine trees yesterday.",
      "The lumberjack fallen three massive pine trees yesterday.",
      "The dry leaves felled from the branches.",
      "The lumberjack fell three massive pine trees yesterday without an object."
    ],
    correctAnswer: 0,
    explanation: "'Fell' (to cut down/knock down) is a regular transitive verb: fell -> felled -> felled. 'Fall' (to drop) is intransitive: fall -> fell -> fallen.",
    explanationBn: "গাছ কেটে ফেলা অর্থে Transitive Verb 'fell'-এর Past Form হল 'felled' (fell -> felled -> felled)।"
  },
  {
    id: 8,
    question: "What is the past tense (V2) of 'found' when used in the sense of 'establishing an institution'?",
    options: ["founded", "found", "finded", "founden"],
    correctAnswer: 0,
    explanation: "'Found' (to establish an institution or trust) is regular: found -> founded -> founded. 'Find' (to discover) is find -> found -> found.",
    explanationBn: "কোনো প্রতিষ্ঠান স্থাপন করা অর্থে 'found' মূল Verb, যার Past tense হল 'founded' (found -> founded -> founded)।"
  },
  {
    id: 9,
    question: "Which of the following regular verbs has the past tense '-ed' pronounced with the /ɪd/ sound?",
    options: ["Decided", "Watched", "Played", "Kicked"],
    correctAnswer: 0,
    explanation: "Verbs ending in /t/ or /d/ sounds (e.g. decide /d/, want /t/) take the full /ɪd/ syllable ending in the past tense ('decided', 'wanted').",
    explanationBn: "যেসব Verb-এর শেষ ধ্বনি /t/ বা /d/, সেগুলোর Past Form-এ '-ed' উচ্চারিত হয় /ɪd/ হিসেবে ('decided', 'wanted')।"
  },
  {
    id: 10,
    question: "Why is 'The river has overflown its banks' grammatically incorrect?",
    options: [
      "Because the verb is 'overflow' (from 'flow' -> flowed), so the correct past participle is 'overflowed', not 'overflown' (which comes from 'fly')",
      "Because 'banks' is plural",
      "Because 'river' cannot overflow",
      "Because 'has' must be 'have'"
    ],
    correctAnswer: 0,
    explanation: "'Flow' conjugates as flow -> flowed -> flowed (overflow -> overflowed). 'Overflown' is from 'overfly' (fly -> flew -> flown).",
    explanationBn: "নদীর জল উপচে পড়া অর্থে 'overflow'-এর V3 রূপ হল 'overflowed' ('flow' থেকে); 'overflown' আসে 'fly' (ওড়া) থেকে।"
  },
  {
    id: 11,
    question: "Identify the correct conjugation of 'bear' in the sense of 'giving birth to offspring':",
    options: [
      "bear -> bore -> born (used in passive: 'He was born in Barrackpore')",
      "bear -> bore -> borne (used for carrying loads: 'borne the burden')",
      "Both A and B accurately describe the dual participles of 'bear'",
      "bear -> beared -> beared"
    ],
    correctAnswer: 2,
    explanation: "'Bear' (birth) uses past participle 'born' in passive structures. 'Bear' (carry/endure) uses past participle 'borne' in active and passive.",
    explanationBn: "জন্মদান অর্থে Passive-এ 'born' বসে; কিন্তু ভার বহন করা বা সহ্য করা অর্থে সর্বদা 'borne' ব্যবহৃত হয়।"
  },
  {
    id: 12,
    question: "What is the past participle (V3) of 'strike' when used as a predicative participial adjective meaning affected by calamity?",
    options: ["stricken (or struck)", "strook", "striked", "strikening"],
    correctAnswer: 0,
    explanation: "'Struck' is standard past and participle, but archaic/formal 'stricken' functions as adjective ('poverty-stricken', 'grief-stricken').",
    explanationBn: "'Struck' সাধারণ V3 রূপ; তবে বিশেষ অর্থ ও Adjective হিসেবে 'stricken' (যেমন: 'panic-stricken', 'grief-stricken') ব্যবহৃত হয়।"
  },
  {
    id: 13,
    question: "Select the sentence with the correct form of 'bind' (tie) vs 'bound' (leap/border):",
    options: [
      "The prisoner was bound with heavy chains.",
      "The deer bounded gracefully across the meadow.",
      "Both A and B are grammatically accurate",
      "The prisoner was bounded with chains."
    ],
    correctAnswer: 2,
    explanation: "'Bind' (tie) -> bound -> bound. 'Bound' (leap/spring) -> bounded -> bounded.",
    explanationBn: "বাঁধা অর্থে 'bind' -> 'bound'; কিন্তু লাফিয়ে চলা অর্থে 'bound' -> 'bounded'।"
  },
  {
    id: 14,
    question: "Identify the error in: 'He has casted his vote in the municipal election.'",
    options: [
      "'Casted' is an erroneous form; 'cast' is an invariable verb (cast -> cast -> cast)",
      "'Vote' should be plural",
      "'Has' should be 'is'",
      "'Municipal' is misspelled"
    ],
    correctAnswer: 0,
    explanation: "'Cast' has identical V1, V2, and V3 forms: cast -> cast -> cast. 'Casted' is completely non-standard.",
    explanationBn: "'Cast'-এর তিনটি রূপই এক (cast -> cast -> cast); ইংরেজিতে 'casted' বলে কোনো শব্দ নেই।"
  },
  {
    id: 15,
    question: "Which of the following irregular verbs exhibits a single vowel shift from /iː/ to /e/ in V2 and V3?",
    options: ["Bleed (bled, bled)", "Feed (fed, fed)", "Meet (met, met)", "All of the above"],
    correctAnswer: 3,
    explanation: "Bleed/bled/bled, Feed/fed/fed, Meet/met/met, Lead/led/led, Read/read/read all share this single vowel shortening pattern.",
    explanationBn: "Bleed -> bled, Feed -> fed, Meet -> met সবগুলোই স্বরধ্বনি সংক্ষিপ্তকরণের (Vowel shortening) একই প্যাটার্ন অনুসরণ করে।"
  },
  {
    id: 16,
    question: "Select the sentence where 'wind' (turn/twist) vs 'wound' (injure) is used correctly:",
    options: [
      "The nurse dressed the soldier's bullet wound, while the river wound through the valley.",
      "The nurse dressed the soldier's bullet winded, while the river winded through the valley.",
      "The clock was wounded by the caretaker.",
      "The soldier was winded in the battle."
    ],
    correctAnswer: 0,
    explanation: "'Wind' (/waɪnd/ - turn/coil) has past 'wound' (/waʊnd/). 'Wound' (/wuːnd/ - injure) is a regular verb: wound -> wounded -> wounded.",
    explanationBn: "ঘোড়ানো বা আঁকাবাঁকা পথ চলা অর্থে 'wind' (/waɪnd/) -> 'wound' (/waʊnd/); কিন্তু জখম করা অর্থে 'wound' (/wuːnd/) -> 'wounded'।"
  },
  {
    id: 17,
    question: "What is the past form of 'grind' (crush into powder) versus 'ground' (base an idea / restrict aircraft)?",
    options: [
      "Grind -> ground -> ground; Ground -> grounded -> grounded",
      "Grind -> grinded -> grinded; Ground -> ground -> ground",
      "Grind -> groond -> groond; Ground -> ground -> ground",
      "Both are identical in all forms"
    ],
    correctAnswer: 0,
    explanation: "'Grind' (crush) is irregular: grind -> ground -> ground. 'Ground' (base/prohibit flying) is regular: ground -> grounded -> grounded.",
    explanationBn: "পেষা বা চূর্ণ করা অর্থে 'grind -> ground -> ground'; বিমান উড্ডয়ন নিষিদ্ধ করা বা যুক্তিভিত্তিক প্রতিষ্ঠা অর্থে 'ground -> grounded -> grounded'।"
  },
  {
    id: 18,
    question: "Which sentence accurately distinguishes 'saw' (cut with a tool) from 'see' (visual perception)?",
    options: [
      "The carpenter sawed the oak plank after he saw the blueprints.",
      "The carpenter seen the oak plank after he sawed the blueprints.",
      "The carpenter saw the oak plank with a sawed yesterday.",
      "The carpenter sawn the timber before he seen it."
    ],
    correctAnswer: 0,
    explanation: "'Saw' (to cut with saw) is regular/mixed: saw -> sawed -> sawed/sawn. 'See' is irregular: see -> saw -> seen.",
    explanationBn: "করাত দিয়ে কাটা অর্থে 'saw -> sawed -> sawed/sawn'; দেখা অর্থে 'see -> saw -> seen'।"
  },
  {
    id: 19,
    question: "Select the sentence that correctly employs the archaic/formal auction vs command forms of 'bid':",
    options: [
      "At the auction he bid $5,000, while the king bade his courtiers farewell.",
      "At the auction he bade $5,000, while the king bid his courtiers farewell.",
      "He bidded $5,000 at the auction.",
      "The king was bidded farewell."
    ],
    correctAnswer: 0,
    explanation: "'Bid' (auction/tender) is invariable: bid -> bid -> bid. 'Bid' (command/greet/farewell) conjugates as: bid -> bade -> bidden.",
    explanationBn: "নিলামে দর হাঁকা অর্থে 'bid -> bid -> bid'; কিন্তু আদেশ দেওয়া বা বিদায় জানানো অর্থে 'bid -> bade -> bidden'।"
  },
  {
    id: 20,
    question: "Which of the following verbs has a past tense '-ed' pronounced as the voiceless sound /t/?",
    options: ["Laughed", "Played", "Loved", "Mended"],
    correctAnswer: 0,
    explanation: "When a verb root ends in a voiceless consonant sound (/f/ in laugh, /k/, /s/, /ʃ/, /tʃ/, /p/), the past '-ed' morpheme is pronounced as /t/ ('laughed' = /lɑːft/).",
    explanationBn: "ভয়েসলেস ধ্বনি (যেমন laugh-এর /f/) এর পর '-ed' উচ্চারিত হয় /t/ হিসেবে ('laughed' -> /lɑːft/)।"
  },
  {
    id: 21,
    question: "Why is 'The media telecasted the breaking news live' marked as incorrect in formal British & Indian standard examinations?",
    options: [
      "'Telecast' and 'Broadcast' follow the invariable root 'cast' (broadcast -> broadcast -> broadcast; telecast -> telecast -> telecast)",
      "Because 'media' is always singular",
      "Because 'live' cannot be used with news",
      "Because 'breaking news' is an informal slang"
    ],
    correctAnswer: 0,
    explanation: "In formal standard English, compound verbs based on 'cast' (broadcast, telecast, forecast) retain the invariable 3-form pattern (no '-ed').",
    explanationBn: "'Cast'-এর মতো 'Broadcast' ও 'Telecast'-এর তিনটি রূপই এক (broadcast -> broadcast -> broadcast; telecast -> telecast -> telecast)।"
  },
  {
    id: 22,
    question: "Identify the difference between 'drunk' and 'drunken':",
    options: [
      "'Drunk' is the standard past participle (e.g. 'He has drunk water'), while 'drunken' is an attributive adjective before a noun (e.g. 'a drunken driver')",
      "'Drunken' is the past tense, while 'drunk' is the past participle",
      "'Drunk' is only a noun, while 'drunken' is a verb",
      "They are identical and interchangeable in all positions"
    ],
    correctAnswer: 0,
    explanation: "'Drunk' is the V3 verbal participle ('has drunk'). 'Drunken' is strictly an attributive adjective placed before a noun ('a drunken brawl').",
    explanationBn: "Verb-এর V3 রূপ হল 'drunk' (has drunk); কিন্তু Noun-এর পূর্বে গুণবাচক Adjective হিসেবে 'drunken' বসে ('a drunken driver')।"
  },
  {
    id: 23,
    question: "What are the 5 Principal Forms of the verb 'Flee' (run away from danger)?",
    options: [
      "V1: flee, V2: fled, V3: fled, V4: fleeing, V5: flees",
      "V1: flee, V2: fleed, V3: fleed, V4: fleeing, V5: flees",
      "V1: flee, V2: flew, V3: flown, V4: fleeing, V5: flees",
      "V1: flee, V2: flow, V3: fled, V4: fleeing, V5: flees"
    ],
    correctAnswer: 0,
    explanation: "'Flee' conjugates as flee -> fled -> fled -> fleeing -> flees. (Do not confuse with 'fly -> flew -> flown' or 'flow -> flowed -> flowed').",
    explanationBn: "বিপদ দেখে পালিয়ে যাওয়া অর্থে 'flee'-এর ৫টি রূপ হল: flee -> fled -> fled -> fleeing -> flees।"
  },
  {
    id: 24,
    question: "Which of the following verbs changes its meaning when conjugated as 'hung' vs 'hanged'?",
    options: ["Hang", "Hand", "Hold", "Hatch"],
    correctAnswer: 0,
    explanation: "'Hang' -> hung -> hung (objects/pictures suspended); 'Hang' -> hanged -> hanged (judicial execution of a person).",
    explanationBn: "'Hang' ফাঁসি দেওয়া অর্থে 'hanged', কিন্তু কোনো বস্তু টাঙানো অর্থে 'hung'।"
  },
  {
    id: 25,
    question: "Select the pair of verbs where the first is INTRANSITIVE (no object) and the second is TRANSITIVE (takes object):",
    options: [
      "Lie (recline) / Lay (place)",
      "Rise (ascend) / Raise (lift)",
      "Fall (drop) / Fell (cut down)",
      "All of the above pairs follow the Intransitive / Transitive paradigm"
    ],
    correctAnswer: 3,
    explanation: "All three pairs (Lie/Lay, Rise/Raise, Fall/Fell) represent the classic English Intransitive (spontaneous) vs Transitive (agent-driven) verbal pairs.",
    explanationBn: "সব কটি জোড়াই (Lie/Lay, Rise/Raise, Fall/Fell) Intransitive (স্বতঃস্ফূর্ত/নিজে হওয়া) বনাম Transitive (অন্য কাউকে/কিছুকে করানো) বৈপরীত্য প্রদর্শন করে।"
  }
];

export default questions;
