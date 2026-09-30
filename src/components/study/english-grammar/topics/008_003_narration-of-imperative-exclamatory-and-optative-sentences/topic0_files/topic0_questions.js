// topic0_questions.js - Module 008_003: Narration of Imperative, Exclamatory & Optative Sentences
// 25 High-Yield Diagnostic MCQs with Technical and Bengali Explanations

const questions = [
  {
    id: 1,
    question: "Convert the Imperative sentence to Indirect Speech: The captain said to the soldiers, 'March forward boldly and capture the outpost.'",
    options: [
      "The captain commanded the soldiers to march forward boldly and capture the outpost.",
      "The captain said to the soldiers that march forward boldly.",
      "The captain requested the soldiers to march forward boldly.",
      "The captain commanded that the soldiers should march forward boldly."
    ],
    correctAnswer: "The captain commanded the soldiers to march forward boldly and capture the outpost.",
    explanation: "Military or authoritarian orders use the reporting verb 'commanded' followed by the personal object and a to-infinitive phrase ('to march forward...').",
    explanationBn: "সামরিক বা কর্তৃত্বমূলক নির্দেশের ক্ষেত্রে Reporting Verb হিসেবে 'commanded' এবং সংযোজক হিসেবে To-Infinitive ('to march forward') ব্যবহৃত হয়।"
  },
  {
    id: 2,
    question: "Convert the Negative Imperative using 'forbade': The mother said to the child, 'Do not touch that hot iron kettle.'",
    options: [
      "The mother forbade the child not to touch that hot iron kettle.",
      "The mother forbade the child to touch that hot iron kettle.",
      "The mother told the child to not touch that hot iron kettle.",
      "The mother ordered the child that do not touch that kettle."
    ],
    correctAnswer: "The mother forbade the child to touch that hot iron kettle.",
    explanation: "'Forbade' (past of forbid) inherently contains negative meaning ('ordered not to'). Therefore, adding 'not' produces an erroneous double negative. The correct structure is 'forbade + object + TO + V1'.",
    explanationBn: "'Forbade' শব্দের অর্থই হলো 'নিষেধ করা' (ordered not to)। তাই এর সাথে কখনো 'not' বসে না; গঠনটি হলো: forbade + object + TO + V1।"
  },
  {
    id: 3,
    question: "Convert the 'Let us' Proposal to Indirect Speech: Rohan said to his friends, 'Let us organize a tree plantation campaign.'",
    options: [
      "Rohan proposed to his friends that they should organize a tree plantation campaign.",
      "Rohan told his friends to organize a tree plantation campaign.",
      "Rohan requested his friends that let them organize a campaign.",
      "Rohan asked his friends that they might organize a campaign."
    ],
    correctAnswer: "Rohan proposed to his friends that they should organize a tree plantation campaign.",
    explanation: "'Let us...' expresses a mutual proposal/suggestion and transforms into 'proposed/suggested to [object] + THAT + they/we + SHOULD + V1'.",
    explanationBn: "'Let us...' যৌথ প্রস্তাব (Proposal/Suggestion) বোঝায় এবং তা 'proposed/suggested that they SHOULD organize...' রূপে রূপান্তরিত হয়।"
  },
  {
    id: 4,
    question: "Convert the 'Let me' Permission request to Indirect Speech: The prisoner said to the guard, 'Let me speak to my lawyer.'",
    options: [
      "The prisoner proposed that he should speak to his lawyer.",
      "The prisoner begged the guard that he might be allowed to speak to his lawyer.",
      "The prisoner said to the guard to let him speak to his lawyer.",
      "The prisoner commanded the guard to let him speak."
    ],
    correctAnswer: "The prisoner begged the guard that he might be allowed to speak to his lawyer.",
    explanation: "'Let me...' expresses a request for permission and transforms into 'requested/begged + that he might be allowed to + V1' (or 'requested to let him speak').",
    explanationBn: "'Let me...' অনুমতি চাওয়ার প্রার্থনা প্রকাশ করে, যা 'requested/begged that he might be allowed to speak...' বা 'requested to let him speak'-এ রূপান্তরিত হয়।"
  },
  {
    id: 5,
    question: "Convert the Exclamatory sentence to Indirect Speech: The spectators said, 'Hurrah! Our team has won the World Cup championship!'",
    options: [
      "The spectators exclaimed with joy that their team had won the World Cup championship.",
      "The spectators exclaimed with sorrow that their team has won the World Cup championship.",
      "The spectators said that hurrah their team had won the World Cup championship.",
      "The spectators told with joy that their team had won the World Cup championship."
    ],
    correctAnswer: "The spectators exclaimed with joy that their team had won the World Cup championship.",
    explanation: "'Hurrah!' is an interjection of celebration that transforms into 'exclaimed with joy that...' and the tense backshifts to past perfect ('had won').",
    explanationBn: "'Hurrah!' আনন্দের অনুভূতি প্রকাশ করায় তা 'exclaimed with joy that...' এবং Present Perfect পরিবর্তিত হয়ে Past Perfect ('had won') হয়।"
  },
  {
    id: 6,
    question: "Convert the Exclamatory sentence to Indirect Speech: The poor man said, 'Alas! I am utterly ruined!'",
    options: [
      "The poor man exclaimed with sorrow that he was utterly ruined.",
      "The poor man exclaimed with joy that he was utterly ruined.",
      "The poor man said with sorrow that I am utterly ruined.",
      "The poor man asked that he was utterly ruined."
    ],
    correctAnswer: "The poor man exclaimed with sorrow that he was utterly ruined.",
    explanation: "'Alas!' expresses grief and converts to 'exclaimed with sorrow / grief that + he was utterly ruined'.",
    explanationBn: "'Alas!' দুঃখ বা শোক প্রকাশ করায় তা 'exclaimed with sorrow/grief that he was utterly ruined'-এ রূপান্তরিত হয়।"
  },
  {
    id: 7,
    question: "Convert the Exclamatory sentence to Indirect Speech: She said, 'What a breathtakingly beautiful landscape!'",
    options: [
      "She exclaimed with wonder that it was a very breathtakingly beautiful landscape.",
      "She said that what a beautiful landscape it was.",
      "She exclaimed that what a breathtakingly beautiful landscape.",
      "She asked if the landscape was beautiful."
    ],
    correctAnswer: "She exclaimed with wonder that it was a very breathtakingly beautiful landscape.",
    explanation: "Exclamatory sentences with 'What a...!' convert into declarative statements modified by 'very / truly' ('exclaimed with wonder that it was a very...').",
    explanationBn: "'What a...!' দিয়ে গঠিত বিস্ময়সূচক বাক্য 'exclaimed with wonder that it was a very...'-এ রূপান্তরিত হয়।"
  },
  {
    id: 8,
    question: "Convert the Optative sentence to Indirect Speech: The saint said to the king, 'May God shower eternal blessings upon you!'",
    options: [
      "The saint prayed that God might shower eternal blessings upon the king.",
      "The saint wished that God may shower eternal blessings upon the king.",
      "The saint blessed that may God shower eternal blessings upon the king.",
      "The saint told that God would shower blessings upon the king."
    ],
    correctAnswer: "The saint prayed that God might shower eternal blessings upon the king.",
    explanation: "Optative prayers convert into 'prayed that + Subject (God) + MIGHT + V1'.",
    explanationBn: "প্রার্থনামূলক বাক্য (Optative) 'prayed that + God might shower...'-এ রূপান্তরিত হয় ('May' পরিবর্তিত হয়ে 'might' হয়)।"
  },
  {
    id: 9,
    question: "Convert the Optative wish to Indirect Speech: The old woman said to the young boy, 'May you live long!'",
    options: [
      "The old woman wished that he might live long.",
      "The old woman prayed that may you live long.",
      "The old woman blessed him that he will live long.",
      "The old woman said that he may live long."
    ],
    correctAnswer: "The old woman wished that he might live long.",
    explanation: "Personal wishes and blessings transform into 'wished/blessed that + Subject + might + V1'.",
    explanationBn: "আশীর্বাদ বা শুভকামনা 'wished/blessed that he might live long'-এ রূপান্তরিত হয়।"
  },
  {
    id: 10,
    question: "Convert to Indirect Speech: The doctor said to the patient, 'Take these prescribed medicines twice daily and avoid oily food.'",
    options: [
      "The doctor advised the patient to take those prescribed medicines twice daily and to avoid oily food.",
      "The doctor ordered the patient take those prescribed medicines twice daily.",
      "The doctor suggested that take these prescribed medicines twice daily.",
      "The doctor told the patient to take these prescribed medicines."
    ],
    correctAnswer: "The doctor advised the patient to take those prescribed medicines twice daily and to avoid oily food.",
    explanation: "Medical counsel uses the reporting verb 'advised' followed by the to-infinitive phrase, and 'these' shifts to 'those'.",
    explanationBn: "চিকিৎসকের পরামর্শের ক্ষেত্রে Reporting Verb হিসেবে 'advised' এবং 'these' পরিবর্তিত হয়ে 'those' হয়।"
  },
  {
    id: 11,
    question: "Convert to Indirect Speech: The general said, 'Bravo! You fought with extraordinary valour!'",
    options: [
      "The general applauded them saying that they had fought with extraordinary valour.",
      "The general exclaimed with joy that you fought with extraordinary valour.",
      "The general shouted that bravo they had fought with valour.",
      "The general told that they fought with extraordinary valour."
    ],
    correctAnswer: "The general applauded them saying that they had fought with extraordinary valour.",
    explanation: "'Bravo!' expresses admiration and applause, correctly reported using 'applauded [someone] saying that...'.",
    explanationBn: "'Bravo!' প্রশংসা বা বাহবা প্রকাশ করায় 'applauded [someone] saying that...'-এ রূপান্তর করা সর্বাধিক মার্জিত।"
  },
  {
    id: 12,
    question: "Convert to Indirect Speech: The master said to the servant, 'Bring me a glass of cold water immediately.'",
    options: [
      "The master ordered the servant to bring him a glass of cold water immediately.",
      "The master asked the servant that bring him a glass of cold water.",
      "The master told the servant to bring me a glass of cold water immediately.",
      "The master requested the servant to bring him water."
    ],
    correctAnswer: "The master ordered the servant to bring him a glass of cold water immediately.",
    explanation: "Master to servant commands use 'ordered + object + to bring him...'.",
    explanationBn: "মালিকের আদেশের ক্ষেত্রে 'ordered the servant to bring him...' বসে।"
  },
  {
    id: 13,
    question: "Identify the error in: 'The teacher forbade the students not to enter the chemistry lab without goggles.'",
    options: [
      "'not to' should be 'to'",
      "'forbade' should be 'forbids'",
      "'without' should be 'with'",
      "'enter' should be 'entering'"
    ],
    correctAnswer: "'not to' should be 'to'",
    explanation: "'Forbade' is already negative; pairing it with 'not to' produces a severe double negative violation.",
    explanationBn: "'Forbade'-এর পরে 'not to' না বসে শুধু 'to' বসবে।"
  },
  {
    id: 14,
    question: "Convert to Indirect Speech: The teacher said to the students, 'Do not write on both sides of the examination sheet.'",
    options: [
      "The teacher instructed the students not to write on both sides of the examination sheet.",
      "The teacher forbade the students not to write on both sides.",
      "The teacher said to the students that do not write on both sides.",
      "The teacher commanded the students to not write on both sides."
    ],
    correctAnswer: "The teacher instructed the students not to write on both sides of the examination sheet.",
    explanation: "When using 'instructed / advised / ordered', the negative infinitive is 'not to + V1'.",
    explanationBn: "'Instructed/ordered'-এর সাথে Negative Infinitive 'not to write' বসে।"
  },
  {
    id: 15,
    question: "Convert to Indirect Speech: The citizen said, 'How corrupt and disgraceful this administration is!'",
    options: [
      "The citizen exclaimed with disgust that that administration was very corrupt and disgraceful.",
      "The citizen said with sorrow that this administration is very corrupt.",
      "The citizen asked how corrupt that administration was.",
      "The citizen exclaimed that how corrupt was that administration."
    ],
    correctAnswer: "The citizen exclaimed with disgust that that administration was very corrupt and disgraceful.",
    explanation: "The expression of disgust transforms to 'exclaimed with disgust that that administration was very corrupt...'.",
    explanationBn: "তীব্র ঘৃণা বা ক্ষোভ প্রকাশ করতে 'exclaimed with disgust that that administration was...' ব্যবহৃত হয়।"
  },
  {
    id: 16,
    question: "Convert to Indirect Speech: The passengers said, 'Let us wait until the heavy thunderstorm subsides.'",
    options: [
      "The passengers suggested waiting until the heavy thunderstorm subsided.",
      "The passengers proposed that they should wait until the heavy thunderstorm subsided.",
      "Both A and B are grammatically valid indirect representations.",
      "The passengers asked that let them wait."
    ],
    correctAnswer: "Both A and B are grammatically valid indirect representations.",
    explanation: "'Let us' suggestions can be reported either with 'suggested + Gerund (waiting)' or 'proposed/suggested that they should wait'.",
    explanationBn: "'Let us'-যুক্ত প্রস্তাব 'suggested waiting' বা 'proposed that they should wait' উভয়ভাবেই রূপান্তর করা যায়।"
  },
  {
    id: 17,
    question: "Convert to Indirect Speech: The monk said, 'May peace prevail across the entire world!'",
    options: [
      "The monk prayed that peace might prevail across the entire world.",
      "The monk wished that may peace prevail across the world.",
      "The monk blessed that peace would prevail across the world.",
      "The monk said that peace might prevail."
    ],
    correctAnswer: "The monk prayed that peace might prevail across the entire world.",
    explanation: "Spiritual prayer transforms into 'prayed that + Subject (peace) + might + prevail'.",
    explanationBn: "বিশ্বশান্তির প্রার্থনা 'prayed that peace might prevail...'-এ রূপান্তরিত হয়।"
  },
  {
    id: 18,
    question: "Convert to Indirect Speech: He said, 'Fie! You are such a coward!'",
    options: [
      "He exclaimed with contempt that he was such a coward.",
      "He said with joy that he was a coward.",
      "He told with sorrow that he was such a coward.",
      "He wondered that he was a coward."
    ],
    correctAnswer: "He exclaimed with contempt that he was such a coward.",
    explanation: "'Fie!' is an interjection of contempt/scorn, appropriately reported as 'exclaimed with contempt / disdain that...'.",
    explanationBn: "'Fie!' (ছিঃ) অবজ্ঞা বা ঘৃণা প্রকাশ করায় 'exclaimed with contempt/disdain that...'-এ রূপান্তর হয়।"
  },
  {
    id: 19,
    question: "Convert to Indirect Speech: The beggar said to the gentleman, 'Please give me a coin to buy food.'",
    options: [
      "The beggar begged the gentleman to give him a coin to buy food.",
      "The beggar ordered the gentleman to give him a coin.",
      "The beggar said to the gentleman that please give him a coin.",
      "The beggar told the gentleman to give me a coin."
    ],
    correctAnswer: "The beggar begged the gentleman to give him a coin to buy food.",
    explanation: "A plea from a beggar uses 'begged / implored / pleaded with + object + to-infinitive'.",
    explanationBn: "আকুল মিনতি বা ভিক্ষা চাওয়ার ক্ষেত্রে 'begged/implored + to give him...' বসে।"
  },
  {
    id: 20,
    question: "Convert to Indirect Speech: She said, 'How delicious this dessert tastes!'",
    options: [
      "She exclaimed with delight that that dessert tasted very delicious.",
      "She said that how delicious that dessert tasted.",
      "She asked if that dessert tasted delicious.",
      "She told that that dessert tasted delicious."
    ],
    correctAnswer: "She exclaimed with delight that that dessert tasted very delicious.",
    explanation: "'Exclaimed with delight that that dessert tasted very delicious' accurately captures the emotional register.",
    explanationBn: "স্বাদ বা আনন্দের তারিফ 'exclaimed with delight that that dessert tasted very delicious'-এ রূপান্তরিত হয়।"
  },
  {
    id: 21,
    question: "Convert to Indirect Speech: The officer said to the clerk, 'Dispatch this confidential dossier immediately.'",
    options: [
      "The officer directed the clerk to dispatch that confidential dossier immediately.",
      "The officer requested the clerk to dispatch this dossier.",
      "The officer said the clerk to dispatch that dossier.",
      "The officer asked that the clerk dispatches that dossier."
    ],
    correctAnswer: "The officer directed the clerk to dispatch that confidential dossier immediately.",
    explanation: "Official administrative instructions use 'directed / instructed / ordered + to dispatch that...'.",
    explanationBn: "দাপ্তরিক নির্দেশের ক্ষেত্রে 'directed/instructed the clerk to dispatch that...' বসে।"
  },
  {
    id: 22,
    question: "Convert to Indirect Speech: The crowd said, 'Long live our visionary leader!'",
    options: [
      "The crowd shouted with enthusiasm that their visionary leader might live long.",
      "The crowd prayed that their visionary leader might live long.",
      "The crowd wished their visionary leader a long life.",
      "All of the above are valid and elegant indirect representations."
    ],
    correctAnswer: "All of the above are valid and elegant indirect representations.",
    explanation: "The optative acclamation 'Long live...' can be rendered as 'prayed that their leader might live long' or 'wished their leader a long life'.",
    explanationBn: "'Long live...' ধ্বনিটি 'prayed that their leader might live long' বা 'wished their leader a long life' উভয়ভাবেই রূপান্তর করা যায়।"
  },
  {
    id: 23,
    question: "Convert to Indirect Speech: The father said to his son, 'Never associate with corrupt companions.'",
    options: [
      "The father warned his son never to associate with corrupt companions.",
      "The father said his son to never associate with corrupt companions.",
      "The father forbade his son never to associate with corrupt companions.",
      "The father requested his son that never associate."
    ],
    correctAnswer: "The father warned his son never to associate with corrupt companions.",
    explanation: "'Warned / advised his son never to associate...' captures the paternal caution perfectly.",
    explanationBn: "সতর্কতামূলক উপদেশের ক্ষেত্রে 'warned his son never to associate...' বসে।"
  },
  {
    id: 24,
    question: "What happens to interjections like 'Hurrah!', 'Alas!', 'Bravo!', and 'Oh!' in indirect speech?",
    options: [
      "They are omitted and their emotional meaning is converted into adverbial phrases with the reporting verb (e.g., 'exclaimed with joy/sorrow').",
      "They are retained inside the reported clause with quotation marks.",
      "They are placed at the end of the sentence.",
      "They are replaced by the word 'that'."
    ],
    correctAnswer: "They are omitted and their emotional meaning is converted into adverbial phrases with the reporting verb (e.g., 'exclaimed with joy/sorrow').",
    explanation: "Interjections are purely emotive direct speech markers. In indirect speech, they are dropped, and their emotional force is transferred to the reporting verb phrase ('exclaimed with joy / sorrow / wonder').",
    explanationBn: "Interjection (Alas, Hurrah) বাদ দেওয়া হয় এবং তাদের অন্তর্নিহিত ভাবকে Reporting Verb-এর সাথে Adverbial Phrase (যেমন: exclaimed with joy/sorrow) হিসেবে যোগ করা হয়।"
  },
  {
    id: 25,
    question: "Convert to Indirect Speech: The guide said, 'Let us take shelter under the pavilion until the storm passes.'",
    options: [
      "The guide proposed that they should take shelter under the pavilion until the storm passed.",
      "The guide asked to take shelter under the pavilion.",
      "The guide ordered them that they take shelter.",
      "The guide said to let them take shelter."
    ],
    correctAnswer: "The guide proposed that they should take shelter under the pavilion until the storm passed.",
    explanation: "'Let us' becomes 'proposed that they should take shelter...' and 'passes' backshifts to 'passed'.",
    explanationBn: "'Let us' পরিবর্তিত হয়ে 'proposed that they should take shelter...' এবং 'passes' পরিবর্তিত হয়ে 'passed' হয়।"
  }
];

export default questions;
