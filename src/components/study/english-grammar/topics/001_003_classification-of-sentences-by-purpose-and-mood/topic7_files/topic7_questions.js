// topic7_questions.js
// Module 001_003: Classification of Sentences by Purpose & Communicative Mood
// Topic 7: Interactive Sentence Transformation Workbench
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the GOLDEN RULE of sentence transformation in grammar?",
    options: [
      "The syntactic structure changes, but the core semantic meaning MUST remain 100% invariant (unchanged).",
      "The sentence must always be made shorter.",
      "The tense must always be shifted into past continuous.",
      "All active verbs must become passive."
    ],
    correctAnswer: 0,
    explanation: "Sentence transformation is the art of altering the grammatical form of a sentence without altering its fundamental meaning in any way.",
    explanationBn: "বাক্য রূপান্তরের প্রধান স্বর্ণসূত্র: বাক্যের গঠন বা রূপ বদলালেও তার মূল অর্থ সম্পূর্ণ অপরিবর্তিত থাকতে হবে।"
  },
  {
    id: 2,
    question: "Convert the affirmative sentence 'Man is mortal' into a negative sentence without changing its meaning:",
    options: [
      "Man is not immortal.",
      "Man is never mortal.",
      "No man is mortal.",
      "Man is mortal not."
    ],
    correctAnswer: 0,
    explanation: "To convert affirmative to negative without meaning shift, introduce 'not' combined with the antonym of the key word ('mortal' -> 'immortal'): 'Man is not immortal.'",
    explanationBn: "অর্থ ঠিক রেখে Negative করার নিয়ম: 'not' যোগ করে মূল শব্দের বিপরীত শব্দ (Antonym) বসানো ('mortal' -> 'immortal'): 'Man is not immortal'।"
  },
  {
    id: 3,
    question: "Convert 'Everyone loves flowers' into an interrogative sentence (Rhetorical Question):",
    options: [
      "Who does not love flowers?",
      "Does everyone love flowers?",
      "Why does everyone love flowers?",
      "Who loves flowers?"
    ],
    correctAnswer: 0,
    explanation: "An affirmative assertion with 'Everyone / Everybody' converts into a negative rhetorical question with 'Who does not...?': 'Who does not love flowers?'",
    explanationBn: "'Everyone / Everybody' যুক্ত হ্যাঁ-বোধক বিবৃতি Rhetorical প্রশ্নে রূপান্তরিত হয়ে 'Who does not...?' হয়।"
  },
  {
    id: 4,
    question: "Convert 'Nobody can tolerate such an insult' into an interrogative sentence:",
    options: [
      "Who can tolerate such an insult?",
      "Can nobody tolerate such an insult?",
      "Why can nobody tolerate such an insult?",
      "Who cannot tolerate such an insult?"
    ],
    correctAnswer: 0,
    explanation: "A negative assertion with 'Nobody / No one' transforms into a positive rhetorical question with 'Who can...?': 'Who can tolerate such an insult?'",
    explanationBn: "'Nobody / No one' যুক্ত না-বোধক বাক্য রূপান্তর হয়ে Positive প্রশ্ন 'Who can...?' হয়।"
  },
  {
    id: 5,
    question: "Transform the exclamatory 'How beautiful the scenery is!' into an assertive sentence:",
    options: [
      "The scenery is very beautiful.",
      "Is the scenery very beautiful?",
      "The scenery is not beautiful.",
      "What a beautiful scenery."
    ],
    correctAnswer: 0,
    explanation: "'How + Adjective' transforms into 'Subject + Verb + very + Adjective': 'The scenery is very beautiful.'",
    explanationBn: "'How + Adjective' Assertive-এ রূপান্তরিত হয়ে 'Subject + Verb + very + Adjective' হয়।"
  },
  {
    id: 6,
    question: "Transform the exclamatory 'What a terrible tragedy!' into an assertive sentence:",
    options: [
      "It was a very terrible tragedy.",
      "Was it a terrible tragedy?",
      "It is not a tragedy.",
      "How tragedy it was!"
    ],
    correctAnswer: 0,
    explanation: "'What a + Noun' transforms into 'It is/was a very/great + Noun': 'It was a very terrible tragedy.'",
    explanationBn: "'What a + Noun' Assertive-এ রূপান্তর হয়ে 'It was a very terrible tragedy' হয়।"
  },
  {
    id: 7,
    question: "Convert the imperative 'Please open the door' into an assertive sentence expressing a polite request:",
    options: [
      "You are requested to open the door.",
      "You must open the door.",
      "Open the door immediately.",
      "Why don't you open the door?"
    ],
    correctAnswer: 0,
    explanation: "'Please + Base Verb' converts assertively into 'You are requested to + Base Verb': 'You are requested to open the door.'",
    explanationBn: "'Please' যুক্ত Imperative বাক্য Assertive-এ রূপান্তরিত হয়ে 'You are requested to...' হয়।"
  },
  {
    id: 8,
    question: "Convert the imperative command 'Get out of the room' into an assertive sentence:",
    options: [
      "You are ordered to get out of the room.",
      "You may get out of the room.",
      "Are you getting out of the room?",
      "Getting out of the room is good."
    ],
    correctAnswer: 0,
    explanation: "Direct imperative commands convert assertively into 'You are ordered/instructed to...': 'You are ordered to get out of the room.'",
    explanationBn: "আদেশমূলক বাক্য Assertive-এ 'You are ordered to...' রূপ নেয়।"
  },
  {
    id: 9,
    question: "Convert 'May you be happy!' into an assertive sentence:",
    options: [
      "I wish / pray that you may be happy.",
      "You are very happy.",
      "Are you happy?",
      "Be happy now."
    ],
    correctAnswer: 0,
    explanation: "Optative wishes starting with 'May...' convert assertively into 'I wish/pray that you may...': 'I wish that you may be happy.'",
    explanationBn: "Optative প্রার্থনা Assertive-এ 'I wish / pray that...' কাঠামোতে রূপান্তরিত হয়।"
  },
  {
    id: 10,
    question: "Convert the affirmative sentence 'Only Swadeep can solve this advanced algorithm' into a negative sentence:",
    options: [
      "None but Swadeep can solve this advanced algorithm.",
      "Nobody can solve this algorithm.",
      "Swadeep cannot solve this algorithm.",
      "Only not Swadeep can solve this algorithm."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to a person transforms into 'None but': 'None but Swadeep can solve this advanced algorithm.'",
    explanationBn: "ব্যক্তিবাচক ক্ষেত্রে 'Only'-এর পরিবর্তে 'None but' বসিয়ে Negative করা হয়।"
  },
  {
    id: 11,
    question: "Convert 'He likes only ice cream' (referring to a thing) into a negative sentence:",
    options: [
      "He likes nothing but ice cream.",
      "He likes none but ice cream.",
      "He does not like ice cream.",
      "He likes neither ice cream."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to things/inanimate objects transforms into 'nothing but': 'He likes nothing but ice cream.'",
    explanationBn: "বস্তুবাচক ক্ষেত্রে 'Only'-এর বদলে 'nothing but' বসে: 'He likes nothing but ice cream'।"
  },
  {
    id: 12,
    question: "Convert 'Debangshu is only sixteen years old' (referring to age/number) into a negative sentence:",
    options: [
      "Debangshu is not more than sixteen years old.",
      "Debangshu is none but sixteen.",
      "Debangshu is nothing but sixteen.",
      "Debangshu is not sixteen."
    ],
    correctAnswer: 0,
    explanation: "'Only' referring to age or number transforms into 'not more than' or 'not less than': 'Debangshu is not more than sixteen years old.'",
    explanationBn: "বয়স বা সংখ্যার ক্ষেত্রে 'Only'-এর বদলে 'not more than' বা 'not less than' বসে।"
  },
  {
    id: 13,
    question: "Convert 'As soon as the mentor arrived, the students stood up' into a negative sentence:",
    options: [
      "No sooner did the mentor arrive than the students stood up.",
      "No sooner the mentor arrived then the students stood up.",
      "Hardly did the mentor arrive when the students not stood up.",
      "As soon as not the mentor arrived."
    ],
    correctAnswer: 0,
    explanation: "'As soon as...' transforms into 'No sooner did + Subject + V1 ... than ...' (or 'No sooner had + Subject + V3 ... than ...'). Note the correlative 'than'.",
    explanationBn: "'As soon as'-এর Negative রূপ হলো 'No sooner did ... than' (বা 'No sooner had ... than')।"
  },
  {
    id: 14,
    question: "Convert 'He is too weak to walk' into a complex negative sentence:",
    options: [
      "He is so weak that he cannot walk.",
      "He is very weak that he cannot walk.",
      "He is too weak that he can walk.",
      "He cannot walk because of weak."
    ],
    correctAnswer: 0,
    explanation: "'Too + Adj + to + Verb' transforms into 'so + Adj + that + Subject + cannot/could not + Verb': 'He is so weak that he cannot walk.'",
    explanationBn: "'Too...to' কাঠামোটি পরিবর্তিত হয়ে 'so...that + cannot/could not' হয়: 'He is so weak that he cannot walk'।"
  },
  {
    id: 15,
    question: "Convert 'You must obey the mentors' into a negative sentence using 'cannot but':",
    options: [
      "You cannot but obey the mentors.",
      "You cannot help but obey the mentors.",
      "You cannot obey the mentors.",
      "You must not obey the mentors."
    ],
    correctAnswer: 0,
    explanation: "'Must' transforms into 'cannot but + bare infinitive' (or 'cannot help + gerund'): 'You cannot but obey the mentors.'",
    explanationBn: "'Must' যুক্ত বাক্য Negative-এ 'cannot but + Base Verb' বা 'cannot help + Verb-ing' হয়।"
  },
  {
    id: 16,
    question: "Convert 'Every mother loves her child' into a negative sentence:",
    options: [
      "There is no mother but loves her child.",
      "No mother loves her child.",
      "Every mother does not love her child.",
      "There is no mother who loves her child."
    ],
    correctAnswer: 0,
    explanation: "'Every + Noun' transforms into 'There is no + Noun + but + Verb' (or 'There is no mother who does not love...'): 'There is no mother but loves her child.'",
    explanationBn: "'Every + Noun' রূপান্তর হয়ে 'There is no + Noun + but + Verb' হয়: 'There is no mother but loves her child'।"
  },
  {
    id: 17,
    question: "Convert 'I will always remember your kindness' into a negative sentence:",
    options: [
      "I will never forget your kindness.",
      "I will always forget your kindness.",
      "I will not remember your kindness.",
      "Never I will remember your kindness."
    ],
    correctAnswer: 0,
    explanation: "'Always + Verb' transforms into 'never + Antonym': 'I will never forget your kindness.'",
    explanationBn: "'Always'-এর বদলে 'never' এবং Verb-এর বিপরীত শব্দ বসিয়ে Negative করা হয়: 'I will never forget your kindness'।"
  },
  {
    id: 18,
    question: "Convert 'Their glory can never fade' into an interrogative rhetorical sentence:",
    options: [
      "When can their glory fade?",
      "Can their glory never fade?",
      "Why can their glory fade?",
      "How can their glory never fade?"
    ],
    correctAnswer: 0,
    explanation: "'Never' in an assertive sentence transforms into 'When can...?' (or 'Can...ever...?'): 'When can their glory fade?' or 'Can their glory ever fade?'.",
    explanationBn: "'Never' যুক্ত বাক্য Interrogative-এ 'When can...?' বা 'Can...ever...?' রূপ নেয়।"
  },
  {
    id: 19,
    question: "Convert 'There is no use in crying over spilt milk' into an interrogative sentence:",
    options: [
      "What is the use of crying over spilt milk?",
      "Why is there no crying over spilt milk?",
      "Is there use in crying over spilt milk?",
      "Who cries over spilt milk?"
    ],
    correctAnswer: 0,
    explanation: "'There is no use in...' transforms into the classic rhetorical inquiry 'What is the use of...?' (or 'Why cry over...?').",
    explanationBn: "'There is no use in...' রূপান্তর হয়ে 'What is the use of...?' হয়।"
  },
  {
    id: 20,
    question: "Convert the assertive sentence 'Prevention is better than cure' into an interrogative rhetorical sentence:",
    options: [
      "Is not prevention better than cure?",
      "Is prevention better than cure?",
      "Why is prevention cure?",
      "How prevention is better than cure?"
    ],
    correctAnswer: 0,
    explanation: "A positive universal truth transforms into a contracted negative interrogative: 'Is not prevention better than cure?' / 'Isn't prevention better than cure?'.",
    explanationBn: "সার্বজনীন সত্যমূলক বাক্য Negative Interrogative-এ রূপান্তরিত হয়: 'Isn't prevention better than cure?'"
  },
  {
    id: 21,
    question: "Convert 'O for a glass of chilled water!' into an assertive sentence:",
    options: [
      "I earnestly wish for a glass of chilled water.",
      "A glass of chilled water is cold.",
      "Do I want a glass of chilled water?",
      "Give me chilled water."
    ],
    correctAnswer: 0,
    explanation: "The poetic exclamatory structure 'O for + Noun!' translates assertively into 'I earnestly wish/long for...'.",
    explanationBn: "'O for...' তীব্র আকাঙ্ক্ষা বোঝায়, যার Assertive রূপ 'I earnestly wish/long for...'।"
  },
  {
    id: 22,
    question: "Convert 'Would that I were a millionaire!' into an assertive sentence:",
    options: [
      "I wish that I were a millionaire.",
      "I was a millionaire.",
      "Am I a millionaire?",
      "Let me be a millionaire."
    ],
    correctAnswer: 0,
    explanation: "'Would that...' transforms into 'I wish that...': 'I wish that I were a millionaire.'",
    explanationBn: "'Would that...'-এর Assertive রূপ হলো 'I wish that...'।"
  },
  {
    id: 23,
    question: "Convert 'It does not matter if we lose the initial match' into an interrogative sentence:",
    options: [
      "What though we lose the initial match?",
      "Does it not matter if we lose?",
      "Why we lose the initial match?",
      "When did we lose the match?"
    ],
    correctAnswer: 0,
    explanation: "'It does not matter if / though...' transforms into the idiomatic rhetorical interrogative 'What though...?' or 'What does it matter if...?'.",
    explanationBn: "'It does not matter if/though...' বাগধারাটি Interrogative-এ 'What though...?' রূপ নেয়।"
  },
  {
    id: 24,
    question: "Convert 'I was doubtful whether he would come' into a negative sentence without changing meaning:",
    options: [
      "I was not sure that he would come.",
      "I was sure he would not come.",
      "I was not doubtful if he would come.",
      "He would not come surely."
    ],
    correctAnswer: 0,
    explanation: "'Doubtful whether' is replaced by 'not sure that': 'I was not sure that he would come.'",
    explanationBn: "'Doubtful whether' Negative-এ পরিবর্তিত হয়ে 'not sure that' হয়।"
  },
  {
    id: 25,
    question: "Identify the sentence transformation that VIOLATES the Golden Rule by altering original semantic meaning:",
    options: [
      "Affirmative: 'He is honest.' ===> Negative: 'He is not dishonest.'",
      "Assertive: 'Everyone knows him.' ===> Interrogative: 'Who does not know him?'",
      "Affirmative: 'He was present.' ===> Negative: 'He was present not.'",
      "Affirmative: 'He loved all.' ===> Negative: 'He hated none.'"
    ],
    correctAnswer: 2,
    explanation: "'He was present not' is syntactically invalid ungrammatical English. All other options maintain perfect semantic fidelity and grammatical precision.",
    explanationBn: "'He was present not' ব্যাকরণগতভাবে অশুদ্ধ; বাকি সবগুলো বিকল্প সঠিক নিয়মে অর্থ বজায় রেখে রূপান্তরিত হয়েছে।"
  }
];

export default questions;
