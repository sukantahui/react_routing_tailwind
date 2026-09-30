// topic5_questions.js
// Module 001_004: Phrases vs Clauses & Foundational Sentence Transformations
// Topic 5: Affirmative ↔ Negative Sentence Transformation
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "Transform the affirmative sentence 'He is an honest police officer' into a negative sentence without altering meaning:",
    options: [
      "He is not a dishonest police officer.",
      "He is a dishonest police officer not.",
      "He is never an honest officer.",
      "No officer is honest like him."
    ],
    correctAnswer: 0,
    explanation: "Affirmative sentences with positive adjectives are transformed into negative equivalents by introducing 'not' and the antonym ('honest' -> 'dishonest'): 'He is not a dishonest police officer.'",
    explanationBn: "Adjective-এর Antonym (বিপরীত শব্দ) এবং 'not' যোগ করে অর্থ ঠিক রেখে Negative করা হয়: 'He is not a dishonest police officer'।"
  },
  {
    id: 2,
    question: "Transform 'Only Swadeep secured full marks in the algorithm test' into a negative sentence:",
    options: [
      "None but Swadeep secured full marks in the algorithm test.",
      "Nothing but Swadeep secured full marks.",
      "Nobody secured full marks except not Swadeep.",
      "Swadeep did not secure full marks."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to a person ('Swadeep') transforms into 'None but': 'None but Swadeep secured full marks in the algorithm test.'",
    explanationBn: "ব্যক্তিবাচক ক্ষেত্রে 'Only'-এর পরিবর্তে 'None but' বসে।"
  },
  {
    id: 3,
    question: "Transform 'Debangshu purchased only reference books at the book fair' into a negative sentence:",
    options: [
      "Debangshu purchased nothing but reference books at the book fair.",
      "Debangshu purchased none but reference books.",
      "Debangshu did not purchase reference books.",
      "Debangshu purchased no books."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to inanimate objects/things ('reference books') transforms into 'nothing but': 'Debangshu purchased nothing but reference books...'.",
    explanationBn: "বস্তুবাচক ক্ষেত্রে 'Only'-এর জায়গায় 'nothing but' বসে।"
  },
  {
    id: 4,
    question: "Transform 'The young prodigy is only twelve years old' into a negative sentence:",
    options: [
      "The young prodigy is not more than twelve years old.",
      "The young prodigy is none but twelve years old.",
      "The young prodigy is nothing but twelve years old.",
      "The young prodigy is not twelve years old."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to age/quantity transforms into 'not more than' (or 'not less than'): 'The young prodigy is not more than twelve years old.'",
    explanationBn: "বয়স বা পরিমাণের ক্ষেত্রে 'Only'-এর বদলে 'not more than' বা 'not less than' বসে।"
  },
  {
    id: 5,
    question: "Transform 'As soon as the mentor entered the lab, the students opened their code editors' into a negative sentence:",
    options: [
      "No sooner did the mentor enter the lab than the students opened their code editors.",
      "No sooner the mentor entered the lab when the students opened their code editors.",
      "No sooner did the mentor enter the lab then the students opened their editors.",
      "Hardly the mentor entered when students opened editors."
    ],
    correctAnswer: 0,
    explanation: "'As soon as...' transforms into 'No sooner did + Subject + V1 (enter) ... than ...'. Note the mandatory use of 'than' (NOT 'then' or 'when').",
    explanationBn: "'As soon as'-এর Negative রূপ: 'No sooner did + Subject + Base Verb ... than ...'। মনে রাখবেন, 'than' বসে ('then' বা 'when' নয়)।"
  },
  {
    id: 6,
    question: "Transform 'He is too weak to walk unaided' into a negative complex sentence:",
    options: [
      "He is so weak that he cannot walk unaided.",
      "He is very weak that he cannot walk.",
      "He is too weak that he walks unaided.",
      "He cannot walk because of weakness."
    ],
    correctAnswer: 0,
    explanation: "Present tense 'too + Adj + to + Verb' transforms into 'so + Adj + that + Subject + cannot + Verb': 'He is so weak that he cannot walk unaided.'",
    explanationBn: "'too...to' কাঠামোটি পরিবর্তিত হয়ে 'so...that + cannot + Base Verb' হয়।"
  },
  {
    id: 7,
    question: "Transform 'The problem was too complex for the beginners to solve' into a negative sentence:",
    options: [
      "The problem was so complex that the beginners could not solve it.",
      "The problem was so complex that the beginners cannot solve it.",
      "The problem was too complex that beginners solved it.",
      "The beginners could solve the problem not."
    ],
    correctAnswer: 0,
    explanation: "Because the main verb is past tense ('was'), the modal auxiliary in the 'so...that' clause must be past tense ('could not'): '...that the beginners could not solve it.'",
    explanationBn: "যেহেতু মূল বাক্য Past Tense ('was')-এ আছে, তাই Subordinate Clause-এ 'could not' বসবে ('cannot' নয়)।"
  },
  {
    id: 8,
    question: "Transform 'Every rose has a thorn' into a negative sentence:",
    options: [
      "There is no rose but has a thorn.",
      "No rose has a thorn.",
      "Every rose has not a thorn.",
      "A rose without thorn is every."
    ],
    correctAnswer: 0,
    explanation: "'Every + Noun' transforms into 'There is no + Noun + but + Verb' (or 'There is no rose without a thorn'): 'There is no rose but has a thorn.'",
    explanationBn: "'Every + Noun' রূপান্তর হয়ে 'There is no + Noun + but + Verb' বা 'There is no rose without a thorn' হয়।"
  },
  {
    id: 9,
    question: "Transform 'You must submit to authority' into a negative sentence using 'cannot but':",
    options: [
      "You cannot but submit to authority.",
      "You cannot help submit to authority.",
      "You cannot submit to authority.",
      "You must not submit to authority."
    ],
    correctAnswer: 0,
    explanation: "'Must' transforms into 'cannot but + bare infinitive' (or 'cannot help + gerund'): 'You cannot but submit to authority.'",
    explanationBn: "'Must' পরিবর্তিত হয়ে 'cannot but + Base Verb' হয়: 'You cannot but submit to authority'।"
  },
  {
    id: 10,
    question: "Transform 'He could not help laughing at the joke' into an equivalent negative structure with 'could not but':",
    options: [
      "He could not but laugh at the joke.",
      "He could not but laughing at the joke.",
      "He could not laugh at the joke.",
      "He could help to laugh."
    ],
    correctAnswer: 0,
    explanation: "'Could not help + V-ing' is 100% equivalent to 'Could not but + bare infinitive (laugh)': 'He could not but laugh at the joke.'",
    explanationBn: "'could not help + V-ing' এবং 'could not but + Base Verb' পরস্পরের সমার্থক।"
  },
  {
    id: 11,
    question: "Transform 'I will always remember your invaluable mentorship' into a negative sentence:",
    options: [
      "I will never forget your invaluable mentorship.",
      "I will always forget your mentorship.",
      "I will not remember your mentorship.",
      "Never will I remember your mentorship."
    ],
    correctAnswer: 0,
    explanation: "'Always + Verb' transforms into 'never + Antonym': 'I will never forget your invaluable mentorship.'",
    explanationBn: "'Always'-এর জায়গায় 'never' এবং Verb-এর বিপরীত শব্দ বসিয়ে Negative করা হয়: 'I will never forget...'।"
  },
  {
    id: 12,
    question: "Transform 'Where there is smoke, there is fire' into a negative sentence:",
    options: [
      "There is no smoke without fire.",
      "There is no fire without smoke.",
      "Smoke is not fire.",
      "Where there is no smoke there is fire."
    ],
    correctAnswer: 0,
    explanation: "'Where there is A, there is B' transforms into the famous proverb 'There is no A without B': 'There is no smoke without fire.'",
    explanationBn: "'Where there is smoke...'-এর চিরন্তন Negative প্রবাদ রূপ: 'There is no smoke without fire'।"
  },
  {
    id: 13,
    question: "Transform 'Both Swadeep and Debangshu attended the advanced syntax clinic' using 'Not only...but also':",
    options: [
      "Not only Swadeep but also Debangshu attended the advanced syntax clinic.",
      "Not only Swadeep and Debangshu attended the clinic.",
      "Swadeep attended but also Debangshu attended not.",
      "Neither Swadeep nor Debangshu attended."
    ],
    correctAnswer: 0,
    explanation: "'Both A and B' transforms into correlative 'Not only A but also B': 'Not only Swadeep but also Debangshu attended...'.",
    explanationBn: "'Both...and' রূপান্তরিত হয়ে 'Not only...but also' কাঠামো গঠন করে।"
  },
  {
    id: 14,
    question: "Transform 'I was doubtful whether the train would arrive on time' into a negative sentence:",
    options: [
      "I was not sure that the train would arrive on time.",
      "I was sure the train would not arrive on time.",
      "I was not doubtful if the train arrives.",
      "The train did not arrive on time surely."
    ],
    correctAnswer: 0,
    explanation: "'Doubtful whether' is transformed into 'not sure that': 'I was not sure that the train would arrive on time.'",
    explanationBn: "'Doubtful whether' পরিবর্তিত হয়ে 'not sure that' হয়।"
  },
  {
    id: 15,
    question: "Transform 'He is sometimes foolish' into a negative sentence:",
    options: [
      "He is not always wise.",
      "He is never foolish.",
      "He is always foolish.",
      "He is not foolish sometimes."
    ],
    correctAnswer: 0,
    explanation: "'Sometimes + Adjective' transforms into 'not always + Antonym': 'He is not always wise.' (or 'He is not always sensible').",
    explanationBn: "'Sometimes + Adjective' রূপান্তর হয়ে 'not always + Antonym' হয়: 'He is not always wise'।"
  },
  {
    id: 16,
    question: "Transform 'Many students were present in the hall' into a negative sentence using 'a few':",
    options: [
      "Not a few students were present in the hall.",
      "Few students were present in the hall.",
      "A few students were not present.",
      "No students were present in the hall."
    ],
    correctAnswer: 0,
    explanation: "'Many' transforms into litotes 'not a few' (meaning a great number): 'Not a few students were present in the hall.'",
    explanationBn: "'Many' (অনেক)-এর সমার্থক Negative Litotes রূপ হলো 'Not a few' (কম নয় অর্থাৎ অনেক)।"
  },
  {
    id: 17,
    question: "Transform 'He has much wealth' into a negative sentence using 'little':",
    options: [
      "He does not have a little wealth.",
      "He has little wealth.",
      "He has no little wealth.",
      "Wealth is not much to him."
    ],
    correctAnswer: 0,
    explanation: "'Much' transforms into 'not a little': 'He does not have a little wealth.' (or 'He has not a little wealth').",
    explanationBn: "'Much' (প্রচুর)-এর Negative রূপ হলো 'not a little'।"
  },
  {
    id: 18,
    question: "Transform 'She failed to notice the warning sign' into a negative sentence:",
    options: [
      "She did not notice the warning sign.",
      "She noticed the warning sign.",
      "She never noticed not the sign.",
      "Did she notice the sign?"
    ],
    correctAnswer: 0,
    explanation: "'Failed to + Verb' translates directly into the negative 'did not + Verb': 'She did not notice the warning sign.'",
    explanationBn: "'Failed to + Verb'-এর সরাসরি Negative রূপ হলো 'did not + Base Verb'।"
  },
  {
    id: 19,
    question: "Transform 'He always speaks the truth' into a negative sentence:",
    options: [
      "He never tells a lie.",
      "He does not speak the truth.",
      "Never he speaks a lie.",
      "He speaks no truth."
    ],
    correctAnswer: 0,
    explanation: "'Always speaks the truth' transforms into 'never tells a lie' (using paired idioms and antonyms).",
    explanationBn: "'Always speaks the truth' পরিবর্তিত হয়ে 'never tells a lie' হয়।"
  },
  {
    id: 20,
    question: "Transform 'God will bless only those who help themselves' into a negative sentence:",
    options: [
      "God will bless none but those who help themselves.",
      "God will not bless those who help themselves.",
      "Nobody will help themselves.",
      "God blesses nothing but help."
    ],
    correctAnswer: 0,
    explanation: "'Only' qualifying persons transforms into 'none but': 'God will bless none but those who help themselves.'",
    explanationBn: "ব্যক্তিবাচক ক্ষেত্রে 'Only' পরিবর্তিত হয়ে 'none but' হয়।"
  },
  {
    id: 21,
    question: "Transform 'Whenever it rains, it pours' into a negative sentence:",
    options: [
      "It never rains but it pours.",
      "It does not rain when it pours.",
      "It rains not without pouring.",
      "No rain without pouring."
    ],
    correctAnswer: 0,
    explanation: "'Whenever A, B' transforms into the idiomatic negative structure 'Never A but B': 'It never rains but it pours.'",
    explanationBn: "'Whenever A, B' রূপান্তর হয়ে 'Never A but B' হয়: 'It never rains but it pours'।"
  },
  {
    id: 22,
    question: "Transform 'A scholar cannot be forgotten' into an affirmative sentence:",
    options: [
      "A scholar is always remembered / immortal.",
      "A scholar is forgotten always.",
      "Nobody forgets a scholar.",
      "Is a scholar forgotten?"
    ],
    correctAnswer: 0,
    explanation: "The negative passive 'cannot be forgotten' transforms affirmatively into 'is always remembered' or 'is immortal'.",
    explanationBn: "'Cannot be forgotten'-এর হ্যাঁ-বোধক রূপ হলো 'is always remembered' বা 'is immortal'।"
  },
  {
    id: 23,
    question: "Transform 'None but the brave can scale Mount Everest' into an affirmative sentence:",
    options: [
      "Only the brave can scale Mount Everest.",
      "The brave cannot scale Mount Everest.",
      "Everyone can scale Mount Everest.",
      "Scaling Mount Everest is brave."
    ],
    correctAnswer: 0,
    explanation: "'None but' referring to people converts back into affirmative 'Only': 'Only the brave can scale Mount Everest.'",
    explanationBn: "'None but'-এর Affirmative রূপ হলো 'Only': 'Only the brave can scale Mount Everest'।"
  },
  {
    id: 24,
    question: "Transform 'No sooner did the train arrive than the passengers rushed forward' into an affirmative sentence:",
    options: [
      "As soon as the train arrived, the passengers rushed forward.",
      "Hardly the train arrived when passengers rushed.",
      "The train arrived and passengers rushed not.",
      "When the train arrived passengers rushed."
    ],
    correctAnswer: 0,
    explanation: "'No sooner...than' converts back into affirmative 'As soon as': 'As soon as the train arrived, the passengers rushed forward.'",
    explanationBn: "'No sooner...than'-এর Affirmative রূপ হলো 'As soon as'।"
  },
  {
    id: 25,
    question: "Why is a double negative like *'I didn't see nobody'* unacceptable in standard English?",
    options: [
      "Because two negative markers in the same clause cancel each other out logically to create an unintentional affirmative meaning, violating standard syntax.",
      "Because 'nobody' cannot be used after verbs.",
      "Because 'didn't' can only be used with adjectives.",
      "Because sentences cannot have more than 4 words."
    ],
    correctAnswer: 0,
    explanation: "In standard English, double negatives cancel out mathematically. Use 'I didn't see ANYBODY' or 'I saw NOBODY'.",
    explanationBn: "Standard English-এ একই বাক্যে দুটি Negative শব্দ বসানো নিষিদ্ধ; শুদ্ধ রূপ: 'I didn't see anybody' বা 'I saw nobody'।"
  }
];

export default questions;
