const questions = [
  {
    id: "utw-q01",
    question: "Which of the following sentences correctly expresses a past discontinued state of residence?",
    options: [
      "Subhendu would live in Barrackpore before shifting to Kolkata.",
      "Subhendu used to live in Barrackpore before shifting to Kolkata.",
      "Subhendu is used to live in Barrackpore before shifting to Kolkata.",
      "Subhendu was used to live in Barrackpore before shifting to Kolkata."
    ],
    correctAnswer: 1,
    explanation: "'Live' is a stative verb describing a permanent residence/state. 'Would' cannot be used with stative verbs to describe past states; 'used to' is the only correct construction.",
    explanationBn: "'Live' একটি stative verb (অবস্থা নির্দেশক)। অতীতের কোনো স্থায়ী অবস্থা বোঝাতে 'would' ব্যবহার করা যায় না; শুধুমাত্র 'used to live' সঠিক।"
  },
  {
    id: "utw-q02",
    question: "Identify the sentence that correctly employs 'would' to describe a repeated dynamic past habit:",
    options: [
      "Grandfather would have a vintage pocket watch when he was a professor.",
      "Grandfather would believe in strict morning meditation.",
      "During summer breaks, Grandfather would narrate historical epics every evening.",
      "Grandfather would belong to a prestigious academic society in his youth."
    ],
    correctAnswer: 2,
    explanation: "'Would' is strictly permitted with dynamic action verbs (narrate, tell, swim, walk) in nostalgic past contexts. Verbs like 'have' (possession), 'believe' (cognition), and 'belong' (stative) cannot pair with 'would'.",
    explanationBn: "'Narrate' (বর্ণনা করা) একটি dynamic action verb। অতীতের পুনরাবৃত্তিমূলক কাজের জন্য 'would narrate' সম্পূর্ণ ব্যাকরণসম্মত।"
  },
  {
    id: "utw-q03",
    question: "Choose the grammatically pristine negative formulation of 'used to':",
    options: [
      "We didn't used to drink black coffee during our college days.",
      "We didn't use to drink black coffee during our college days.",
      "We were not used to drink black coffee during our college days.",
      "We had not used to drink black coffee during our college days."
    ],
    correctAnswer: 1,
    explanation: "When 'did' or 'didn't' is used in past questions or negatives, the main verb reverts to its base form 'use' ('didn't use to', not 'didn't used to').",
    explanationBn: "Negative বাক্যে 'didn't' বসলে auxiliary 'did'-এর প্রভাবে 'used' পরিবর্তিত হয়ে মূল Base Form 'use' হবে ('didn't use to')।"
  },
  {
    id: "utw-q04",
    question: "What is the error in the sentence: 'There would be an ancient library building on this corner before the modernization project'?",
    options: [
      "'Would be' must be replaced by 'used to be' because existence is a stative condition.",
      "'Modernization' should be 'modernizing'.",
      "'Before' cannot take noun phrases.",
      "There is no error; 'would be' is perfectly acceptable."
    ],
    correctAnswer: 0,
    explanation: "Past existence/states ('there was/existed') cannot be expressed with 'would'. The correct phrasing is 'There used to be an ancient library building...'",
    explanationBn: "অতীতের কোনো কিছুর অস্তিত্ব বা অবস্থান (State/Existence) বোঝাতে 'would be' ব্যবহার করা ভুল; সঠিক রূপ হলো 'There used to be'।"
  },
  {
    id: "utw-q05",
    question: "Which option correctly uses the structure 'be used to' to indicate familiarity/habituation?",
    options: [
      "Sneha is used to commute by local suburban train every day.",
      "Sneha used to commuting by local suburban train every day.",
      "Sneha is used to commuting by local suburban train every day.",
      "Sneha got used to commute by local suburban train every day."
    ],
    correctAnswer: 2,
    explanation: "The construction 'be used to' is followed by a gerund (V-ing) or noun phrase to mean 'accustomed to'. Hence, 'is used to commuting' is correct.",
    explanationBn: "'Be used to' (অভ্যস্ত থাকা) গঠনের পর সর্বদা Gerund (V-ing) বা Noun বসে। তাই 'is used to commuting' সঠিক।"
  },
  {
    id: "utw-q06",
    question: "Complete the interrogative sentence: '______ play competitive chess in school?'",
    options: [
      "Did you used to",
      "Did you use to",
      "Were you used to",
      "Had you used to"
    ],
    correctAnswer: 1,
    explanation: "In questions with the auxiliary 'did', the base form 'use to' is required: 'Did you use to play...?'",
    explanationBn: "'Did' সহযোগে প্রশ্ন করার সময় 'use to' (d ছাড়া) রূপটি ব্যবহৃত হয়: 'Did you use to play...?'"
  },
  {
    id: "utw-q07",
    question: "Why is 'She would be afraid of thunder in her early childhood' unnatural/incorrect in formal English?",
    options: [
      "'Be afraid' is an emotional state, and 'would' cannot describe past states.",
      "'Would' requires a future marker.",
      "'Afraid' cannot take preposition 'of' with 'would'.",
      "'In her early childhood' cannot be used with past modal verbs."
    ],
    correctAnswer: 0,
    explanation: "'Be afraid' describes a mental/emotional state (stative). Past states must be expressed with 'used to be afraid', not 'would be afraid'.",
    explanationBn: "ভীত হওয়া বা ভয়ের অনুভূতি একটি মানসিক অবস্থা (Stative Condition), তাই 'would be afraid'-এর বদলে 'used to be afraid' বসবে।"
  },
  {
    id: "utw-q08",
    question: "Choose the sentence that demonstrates the process of becoming accustomed to a new environment:",
    options: [
      "Subir used to wake up early when he was in the hostel.",
      "Subir is getting used to working in the fast-paced research laboratory.",
      "Subir would work late nights during his university days.",
      "Subir didn't use to enjoy spicy Bengali curries."
    ],
    correctAnswer: 1,
    explanation: "'Get used to + V-ing' specifically expresses the ongoing process or transition of adapting to a new circumstance.",
    explanationBn: "'Get used to + V-ing' কোনো নতুন পরিস্থিতির সাথে ক্রমান্বয়ে অভ্যস্ত হয়ে ওঠার প্রক্রিয়াকে নির্দেশ করে।"
  },
  {
    id: "utw-q09",
    question: "Spot the error: 'Whenever Sukanta Sir visited (A) the laboratory, he would (B) inspect the apparatus (C) and was used to guide the students (D).'",
    options: [
      "A",
      "B",
      "C",
      "D"
    ],
    correctAnswer: 3,
    explanation: "Part (D) contains an error. Parallelism with 'would inspect' requires either 'and (would) guide the students' or 'and used to guide the students'. 'Was used to guide' is ungrammatical.",
    explanationBn: "Parallelism-এর নিয়মে 'would inspect ... and (would) guide' অথবা 'used to guide' হবে। 'Was used to guide' ভুল গঠন।"
  },
  {
    id: "utw-q10",
    question: "Select the sentence where BOTH 'used to' and 'would' can be interchangeably substituted without any semantic or grammatical error:",
    options: [
      "When we stayed in Darjeeling, we ______ go for long morning walks along the ridge.",
      "Priyabrata ______ own a vintage sports motorcycle.",
      "There ______ be a dense mango orchard behind our ancestral home.",
      "Debanjan ______ understand German fluently during his student exchange year."
    ],
    correctAnswer: 0,
    explanation: "'Go for long morning walks' is a repeated dynamic physical action in a defined past context ('When we stayed in Darjeeling'). Both 'used to go' and 'would go' are fully grammatical.",
    explanationBn: "'Go for walks' একটি dynamic action। অতীতের প্রেক্ষাপট দেওয়া থাকায় এখানে 'used to go' এবং 'would go' দুটিই সমানভাবে প্রযোজ্য।"
  },
  {
    id: "utw-q11",
    question: "Which of the following stative verbs CANNOT be used with 'would' to describe past situations?",
    options: [
      "Swim",
      "Jog",
      "Resemble",
      "Visit"
    ],
    correctAnswer: 2,
    explanation: "'Resemble' (চেহারার সাদৃশ্য থাকা) is a pure stative verb. You can say 'She used to resemble her grandmother', but NOT 'She would resemble...'.",
    explanationBn: "'Resemble' একটি Stative Verb। তাই এর সাথে 'would' ব্যবহৃত হতে পারে না; 'used to resemble' বলতে হবে।"
  },
  {
    id: "utw-q12",
    question: "Identify the correct rewrite: 'In the 1990s, families gathered around the television every Sunday morning.' (Using 'would')",
    options: [
      "In the 1990s, families would gather around the television every Sunday morning.",
      "In the 1990s, families would have gathered around the television every Sunday morning.",
      "In the 1990s, families would be gathering around the television every Sunday morning.",
      "In the 1990s, families would to gather around the television every Sunday morning."
    ],
    correctAnswer: 0,
    explanation: "'Would + Base Verb (V1)' accurately denotes habitual past action: 'families would gather...'",
    explanationBn: "'Would + V1 (Base verb)' অতীতের স্বাভাবিক অভ্যাস প্রকাশ করে: 'families would gather'।"
  },
  {
    id: "utw-q13",
    question: "Select the correct sentence regarding past belief:",
    options: [
      "Ancient sailors would believe the Earth was completely flat.",
      "Ancient sailors used to believe the Earth was completely flat.",
      "Ancient sailors were used to believe the Earth was completely flat.",
      "Ancient sailors didn't use to believing the Earth was flat."
    ],
    correctAnswer: 1,
    explanation: "'Believe' is a verb of mental state (cognition). Past states require 'used to believe', not 'would believe'.",
    explanationBn: "'Believe' মনের বিশ্বাস বা অবস্থাজ্ঞাপক ক্রিয়াপদ (Stative)। তাই 'used to believe' সঠিক।"
  },
  {
    id: "utw-q14",
    question: "What does the sentence 'Tathagata is used to the noise of the railway tracks' mean?",
    options: [
      "Tathagata frequently makes noise on the railway tracks.",
      "Tathagata has lived near the tracks in the past but does not live there now.",
      "Tathagata finds the railway noise normal and is accustomed to it.",
      "Tathagata is beginning to feel annoyed by the railway noise."
    ],
    correctAnswer: 2,
    explanation: "'Be used to + Noun' means to be accustomed to something and not find it strange or difficult.",
    explanationBn: "'Is used to the noise' মানে হলো সে শব্দে সম্পূর্ণ অভ্যস্ত এবং এটি তার কাছে স্বাভাবিক।"
  },
  {
    id: "utw-q15",
    question: "Which sentence correctly expresses that an action happened only ONCE in the past (where neither 'used to' nor 'would' is permitted)?",
    options: [
      "Last year, Abhronila used to win the National Physics Olympiad gold medal.",
      "Last year, Abhronila would win the National Physics Olympiad gold medal.",
      "Last year, Abhronila won the National Physics Olympiad gold medal.",
      "Last year, Abhronila was used to winning the National Physics Olympiad gold medal."
    ],
    correctAnswer: 2,
    explanation: "Neither 'used to' nor 'would' can be used for single, isolated past events that occurred once at a specific time. Use the Simple Past (V2): 'Abhronila won...'",
    explanationBn: "অতীতে কোনো ঘটনা মাত্র একবার ঘটলে 'used to' বা 'would' বসে না; সেক্ষেত্রে সাধারণ Simple Past Tense (V2) ব্যবহৃত হয়।"
  },
  {
    id: "utw-q16",
    question: "Find the grammatical flaw: 'Did she used to have a pet parrot when she lived in Shyamnagar?'",
    options: [
      "'Lived' should be 'living'.",
      "'Did she used to' should be 'Did she use to'.",
      "'Have' cannot follow 'used to'.",
      "'When' must be replaced with 'while'."
    ],
    correctAnswer: 1,
    explanation: "In past interrogative questions with 'did', the base form 'use to' must be used rather than the past form 'used to'.",
    explanationBn: "'Did' দিয়ে গঠিত প্রশ্নবোধক বাক্যে 'used to' না হয়ে Base Form 'use to' হবে।"
  },
  {
    id: "utw-q17",
    question: "Choose the correct sentence to describe past possession:",
    options: [
      "Sukanta Sir would have an extensive library of vintage grammar manuscripts.",
      "Sukanta Sir used to have an extensive library of vintage grammar manuscripts.",
      "Sukanta Sir was used to have an extensive library of vintage grammar manuscripts.",
      "Sukanta Sir got used to have an extensive library of vintage grammar manuscripts."
    ],
    correctAnswer: 1,
    explanation: "'Have' indicating possession is stative. 'Used to have' is correct; 'would have' cannot be used for past possession.",
    explanationBn: "মালিকানা বা অধিকার (Possession) বোঝাতে 'have' একটি stative verb। তাই 'used to have' সঠিক রূপ।"
  },
  {
    id: "utw-q18",
    question: "Which of the following illustrates a correct transformation of: 'Grandmother always woke up early and sat on the veranda'?",
    options: [
      "Grandmother would wake up early and sit on the veranda.",
      "Grandmother would waking up early and sitting on the veranda.",
      "Grandmother used to waking up early and sitting on the veranda.",
      "Grandmother was used to wake up early and sit on the veranda."
    ],
    correctAnswer: 0,
    explanation: "'Would + V1' accurately captures the repeated, nostalgic dynamic actions: 'would wake up ... and sit'.",
    explanationBn: "'Would + V1' অতীতের পুনরাবৃত্তিমূলক স্বভাব বা অভ্যাস বোঝাতে চমৎকারভাবে প্রযুক্ত হয়।"
  },
  {
    id: "utw-q19",
    question: "In which sentence is 'used to' acting as an adjective meaning 'accustomed'?",
    options: [
      "I used to walk five miles to school every day.",
      "They are used to harsh winter temperatures in the Himalayas.",
      "He used to work as a mechanical engineer.",
      "We didn't use to watch late-night television."
    ],
    correctAnswer: 1,
    explanation: "In 'They are used to harsh winter temperatures', 'used' is a predicate adjective meaning 'accustomed/familiar', followed by the noun phrase complement.",
    explanationBn: "'They are used to harsh winter temperatures' বাক্যে 'used to' অর্থ 'অভ্যস্ত' (Adjective হিসেবে ব্যবহৃত)।"
  },
  {
    id: "utw-q20",
    question: "Fill in the blank: 'It took him several months to ______ driving on the left side of the road in the UK.'",
    options: [
      "used to",
      "get used to",
      "be would",
      "use to"
    ],
    correctAnswer: 1,
    explanation: "'Get used to + V-ing' is required after 'to' when expressing the process of adaptation over time ('took him several months to get used to driving').",
    explanationBn: "অভ্যস্ত হওয়ার সময়সাপেক্ষ প্রক্রিয়া বোঝাতে 'get used to + V-ing' ব্যবহৃত হয়।"
  },
  {
    id: "utw-q21",
    question: "Identify the correct statement regarding the stylistic use of 'would' in narrative writing:",
    options: [
      "'Would' can introduce a new past habit even if no past timeframe has been mentioned.",
      "'Would' should typically follow an initial framing sentence established with Simple Past or 'Used to'.",
      "'Would' is preferred over 'used to' for all verbs expressing feelings and perceptions.",
      "'Would' is never permitted in fiction or storytelling."
    ],
    correctAnswer: 1,
    explanation: "In narrative prose, writers often establish the past context with Simple Past or 'used to' first, and then continue subsequent nostalgic details with 'would'.",
    explanationBn: "গল্প বা স্মৃতিচারণমূলক রচনায় প্রথমে Simple Past বা 'Used to' দিয়ে সময় নির্ধারণ করে পরে ধারাবাহিক বিবরণে 'would' ব্যবহার করা উত্তম রীতি।"
  },
  {
    id: "utw-q22",
    question: "Spot the error: 'When Swadeep was five years old, he used to be knowing the names of all European capitals.'",
    options: [
      "When Swadeep was",
      "used to be knowing",
      "the names of",
      "European capitals"
    ],
    correctAnswer: 1,
    explanation: "'Know' is a stative verb and cannot take continuous forms ('used to be knowing' is ungrammatical). It should be 'used to know' or 'knew'.",
    explanationBn: "'Know' একটি stative verb, তাই 'used to be knowing' ভুল। সঠিক হবে 'used to know'।"
  },
  {
    id: "utw-q23",
    question: "Which of the following pairs shows the exact semantic contrast between 'used to work' and 'is used to working'?",
    options: [
      "Past discontinued career vs current familiar routine",
      "Current action vs future hypothetical action",
      "Single completed event vs continuous ongoing event",
      "Passive condition vs active permission"
    ],
    correctAnswer: 0,
    explanation: "'Used to work' means the subject worked in the past but does not work there now. 'Is used to working' means the subject is currently accustomed to working in that manner.",
    explanationBn: "'Used to work' = অতীতে কাজ করত কিন্তু এখন করে না; 'Is used to working' = বর্তমানে কাজের সাথে সু-অভ্যস্ত।"
  },
  {
    id: "utw-q24",
    question: "Choose the correct sentence:",
    options: [
      "Did you use to dislike mathematics before Sukanta Sir taught you?",
      "Did you used to disliking mathematics before Sukanta Sir taught you?",
      "Would you dislike mathematics before Sukanta Sir taught you?",
      "Were you use to dislike mathematics before Sukanta Sir taught you?"
    ],
    correctAnswer: 0,
    explanation: "'Dislike' is an emotion (stative), so 'would' is prohibited. In questions with 'did', the base form 'use to' is required: 'Did you use to dislike...?'",
    explanationBn: "'Dislike' একটি মানসিক অনুভূতি (Stative Verb)। 'Did'-এর সাথে 'use to' সঠিক: 'Did you use to dislike...?'"
  },
  {
    id: "utw-q25",
    question: "Select the sentence with NO grammatical or syntactic errors:",
    options: [
      "Whenever power outages occurred in monsoon, we would sit by the window and listen to the rain.",
      "Whenever power outages occurred in monsoon, we would had sat by the window.",
      "Whenever power outages occurred in monsoon, we were used to sit by the window.",
      "Whenever power outages occurred in monsoon, we didn't used to panic."
    ],
    correctAnswer: 0,
    explanation: "Option A is flawless: established past timeframe ('Whenever power outages occurred'), followed by 'would + V1' ('would sit ... and listen') describing repeated dynamic actions.",
    explanationBn: "Option A সম্পূর্ণ নির্ভুল: অতীতের প্রেক্ষাপটে পুনরাবৃত্তিমূলক কাজের জন্য 'would + Base Verb' ('would sit and listen') যথাযথভাবে প্রযুক্ত।"
  }
];

export default questions;
