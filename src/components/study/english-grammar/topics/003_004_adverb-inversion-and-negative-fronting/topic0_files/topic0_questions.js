const questions = [
  {
    id: "q1",
    question: "What is the correct correlative conjunction pair for 'No sooner' in an inverted structure?",
    options: [
      "No sooner ... when",
      "No sooner ... than",
      "No sooner ... then",
      "No sooner ... but"
    ],
    correctAnswer: 1,
    explanation: "'No sooner' is a comparative structure and MUST be paired strictly with 'than'. ('When' is paired with 'Hardly'/'Scarcely'). Example: 'No sooner had I arrived THAN the bell rang.'",
    explanationBn: "'No sooner' তুলনামূলক হওয়ায় এর সাথে সর্বদা 'than' বসে। 'When' শুধুমাত্র 'Hardly' বা 'Scarcely'-র সাথে বসে।"
  },
  {
    id: "q2",
    question: "Which correlative conjunction correctly pairs with 'Hardly' and 'Scarcely'?",
    options: [
      "than",
      "when / before",
      "then",
      "that"
    ],
    correctAnswer: 1,
    explanation: "'Hardly' and 'Scarcely' are paired strictly with 'when' (or occasionally 'before'). (e.g. 'Hardly had he stepped outside WHEN it began to rain').",
    explanationBn: "'Hardly' এবং 'Scarcely'-র সাথে নির্ধারিত জোড় হিসেবে 'when' (কখনো 'before') বসে, কখনোই 'than' বসে না।"
  },
  {
    id: "q3",
    question: "Identify the sentence that correctly applies Subject-Auxiliary Inversion after a fronted negative adverb:",
    options: [
      "Never I have seen such a breathtaking sunset.",
      "Never have I seen such a breathtaking sunset.",
      "Never I saw such a breathtaking sunset.",
      "Never did I saw such a breathtaking sunset."
    ],
    correctAnswer: 1,
    explanation: "When a negative adverbial ('Never', 'Seldom', 'Rarely') opens a sentence, the auxiliary verb MUST precede the subject: 'Never + have (auxiliary) + I (subject) + seen (main verb)'.",
    explanationBn: "বাক্যের শুরুতে 'Never' বসলে Subject-Auxiliary Inversion ঘটে: 'Never + have (Auxiliary) + I (Subject) + seen (Main Verb)'।"
  },
  {
    id: "q4",
    question: "Transform into an inverted sentence: 'He rarely goes to the theatre.'",
    options: [
      "Rarely he goes to the theatre.",
      "Rarely does he go to the theatre.",
      "Rarely goes he to the theatre.",
      "Rarely is he going to the theatre."
    ],
    correctAnswer: 1,
    explanation: "In the Simple Present tense, the dummy auxiliary 'does' is introduced and inverted before the subject: 'Rarely + does + he + go'.",
    explanationBn: "Simple Present Tense-এ Inversion করার সময় 'does' Auxiliary আনতে হয়: 'Rarely does he go to the theatre'।"
  },
  {
    id: "q5",
    question: "Which of the following sentences with 'No sooner' has NO grammatical errors?",
    options: [
      "No sooner did the bell ring than the students left the classroom.",
      "No sooner the bell rang when the students left the classroom.",
      "No sooner had the bell rang than the students left the classroom.",
      "No sooner did the bell rang than the students left the classroom."
    ],
    correctAnswer: 0,
    explanation: "Option A is flawless: 'No sooner did (auxiliary) + the bell (subject) + ring (base V1) + than (correlative)'. In option C, 'had' requires past participle 'rung', not 'rang'.",
    explanationBn: "Option A সম্পূর্ণ নির্ভুল: 'No sooner + did + Subject + V1 (ring) + than + Clause'।"
  },
  {
    id: "q6",
    question: "In the sentence 'Scarcely _______ the station when the train pulled out', which option correctly fills the blank?",
    options: [
      "had we reached",
      "we had reached",
      "did we reached",
      "we reached"
    ],
    correctAnswer: 0,
    explanation: "Fronted 'Scarcely' demands inversion: Auxiliary 'had' + Subject 'we' + Past Participle 'reached'.",
    explanationBn: "'Scarcely' দিয়ে বাক্য শুরু হওয়ায় Auxiliary 'had' Subject 'we'-এর পূর্বে বসবে: 'had we reached'।"
  },
  {
    id: "q7",
    question: "When 'Not only' opens a sentence, how is inversion applied?",
    options: [
      "Both clauses are inverted.",
      "Only the first clause (immediately following 'Not only') is inverted.",
      "Only the second clause (following 'but also') is inverted.",
      "Neither clause is inverted."
    ],
    correctAnswer: 1,
    explanation: "When 'Not only' is fronted, only the first clause undergoes subject-auxiliary inversion. (e.g. 'Not only DID HE PASS the exam, but he also secured the first rank').",
    explanationBn: "'Not only' দিয়ে বাক্য শুরু হলে কেবল প্রথম Clause-টিতে Inversion ঘটে ('Not only DID HE PASS... but he also...')।"
  },
  {
    id: "q8",
    question: "Where does inversion take place in sentences opening with 'Only after...', 'Only when...', or 'Only if...'?",
    options: [
      "Inside the subordinate 'only' clause.",
      "In the main principal clause following the subordinate clause.",
      "In both clauses simultaneously.",
      "Inversion is optional in both clauses."
    ],
    correctAnswer: 1,
    explanation: "In 'Only after / when / if' structures, the subordinate clause remains in normal order, and inversion occurs in the MAIN clause. (e.g. 'Only after he left did I realize the truth').",
    explanationBn: "'Only after/when/if' যুক্ত বাক্যে Subordinate Clause স্বাভাবিক থাকে, এবং Inversion প্রধান Main Clause-এ ঘটে ('...did I realize')।"
  },
  {
    id: "q9",
    question: "Identify the correct inversion in: 'Only by working hard _______ your dreams.'",
    options: [
      "you will achieve",
      "will you achieve",
      "you achieve",
      "you can achieve"
    ],
    correctAnswer: 1,
    explanation: "'Only by + gerund phrase' acts as a restrictive prepositional phrase at the front, triggering inversion in the main clause: 'will you achieve'.",
    explanationBn: "'Only by'-এর পর Main Clause-এ Auxiliary আগে বসে: 'will you achieve'।"
  },
  {
    id: "q10",
    question: "What type of inversion is exhibited in: 'Down came the torrential rain'?",
    options: [
      "Subject-Auxiliary Inversion",
      "Locative / Directional Full Verb Inversion",
      "Conditional Inversion",
      "Comparative Inversion"
    ],
    correctAnswer: 1,
    explanation: "When a directional/locative adverbial is fronted, the FULL lexical verb precedes the subject without an auxiliary: 'Down (direction) + came (full verb) + the torrential rain (subject)'.",
    explanationBn: "দিক বা গতিবাচক Adverb (Down, Into, Away) শুরুতে বসলে পুরো Main Verb Subject-এর আগে বসে, একে Locative Full Verb Inversion বলে।"
  },
  {
    id: "q11",
    question: "If the subject is a PRONOUN in locative fronting, does full verb inversion still occur?",
    options: [
      "Yes, e.g. 'Down came it'.",
      "No, pronouns resist full verb inversion, e.g. 'Down it came'.",
      "Pronouns take dummy auxiliaries: 'Down did it come'.",
      "Locative fronting is illegal with pronouns."
    ],
    correctAnswer: 1,
    explanation: "When the subject is a personal pronoun, normal word order is retained even after locative fronting: 'Down it came' (NOT 'Down came it'), 'Away they ran'.",
    explanationBn: "Subject যদি Pronoun হয়, তবে Locative Inversion হয় না; স্বাভাবিক ক্রম বজায় থাকে: 'Down it came' (Down came it ভুল)।"
  },
  {
    id: "q12",
    question: "Which of the following represents a CONDITIONAL INVERSION (omitting 'if') for a past unreal condition?",
    options: [
      "Had I known about the meeting, I would have attended.",
      "If had I known about the meeting, I would have attended.",
      "Did I know about the meeting, I would have attended.",
      "Should I have known about the meeting, I would have attended."
    ],
    correctAnswer: 0,
    explanation: "'Had I known...' is the standard inverted equivalent of 'If I had known...'. The conjunction 'if' is dropped and 'had' is moved to the front.",
    explanationBn: "Third Conditional-এ 'if' তুলে দিয়ে 'Had' শুরুতে এনে Inversion করা হয়: 'Had I known... (= If I had known...)'।"
  },
  {
    id: "q13",
    question: "Transform 'If you should require any assistance, please call me' into an inverted structure:",
    options: [
      "Should you require any assistance, please call me.",
      "Must you require any assistance, please call me.",
      "Did you require any assistance, please call me.",
      "Would you require any assistance, please call me."
    ],
    correctAnswer: 0,
    explanation: "'Should you require...' inverts First Conditional with 'should', dropping 'if' in formal business and legal English.",
    explanationBn: "First Conditional-এ 'If you should require...' পরিবর্তিত হয়ে 'Should you require...' হয়।"
  },
  {
    id: "q14",
    question: "Identify the correct response using comparative agreement inversion: 'Priya loves classical music.' -> '_______.'",
    options: [
      "So loves Rahul.",
      "So does Rahul.",
      "So Rahul does.",
      "Neither does Rahul."
    ],
    correctAnswer: 1,
    explanation: "In affirmative agreement, 'So + auxiliary + subject' is used: 'So does Rahul'.",
    explanationBn: "হ্যাঁ-সূচক সহমত প্রকাশে Inversion সূত্র: 'So + Auxiliary + Subject' ('So does Rahul')।"
  },
  {
    id: "q15",
    question: "Identify the correct response for negative agreement: 'I do not drink tea.' -> '_______.'",
    options: [
      "So do I.",
      "Neither do I.",
      "Neither I do.",
      "Nor do I not."
    ],
    correctAnswer: 1,
    explanation: "In negative agreement, 'Neither / Nor + auxiliary + subject' is used: 'Neither do I'.",
    explanationBn: "না-সূচক সহমত প্রকাশে Inversion সূত্র: 'Neither + Auxiliary + Subject' ('Neither do I')।"
  },
  {
    id: "q16",
    question: "Select the sentence with INCORRECT inversion:",
    options: [
      "Seldom have I witnessed such courage.",
      "Little did he know what was in store for him.",
      "Under no circumstances you should leave the building.",
      "On no account must this door be unlocked."
    ],
    correctAnswer: 2,
    explanation: "'Under no circumstances' is a fronted negative prepositional phrase and MUST trigger inversion: 'Under no circumstances SHOULD YOU leave the building'.",
    explanationBn: "'Under no circumstances' শুরুতে থাকলে Inversion বাধ্যতামূলক: 'Under no circumstances SHOULD YOU leave...'।"
  },
  {
    id: "q17",
    question: "In the sentence 'No sooner _______ home than it started to pour', which auxiliary fits 'he arrived'?",
    options: [
      "did he arrived",
      "did he arrive",
      "he arrived",
      "had he arrive"
    ],
    correctAnswer: 1,
    explanation: "With auxiliary 'did', the base form (V1) 'arrive' must be used: 'did he arrive'. (If using 'had', it would be 'had he arrived').",
    explanationBn: "Auxiliary 'did'-এর পর মূল Verb-এর Base রূপ (V1) 'arrive' বসবে: 'did he arrive'।"
  },
  {
    id: "q18",
    question: "What is the inverted form of 'If I were the Prime Minister, I would abolish this tax'?",
    options: [
      "Were I the Prime Minister, I would abolish this tax.",
      "Was I the Prime Minister, I would abolish this tax.",
      "Did I be the Prime Minister, I would abolish this tax.",
      "Am I the Prime Minister, I would abolish this tax."
    ],
    correctAnswer: 0,
    explanation: "In Second Conditional subjunctive statements, 'If I were...' inverts to 'Were I...'.",
    explanationBn: "Subjunctive 'If I were...'-এর Inverted রূপ হলো 'Were I the Prime Minister...'।"
  },
  {
    id: "q19",
    question: "Which of the following phrases DOES NOT trigger subject-auxiliary inversion when placed at the start of a sentence?",
    options: [
      "On no account",
      "Hardly ever",
      "In my opinion",
      "Nowhere else"
    ],
    correctAnswer: 2,
    explanation: "'In my opinion' is an ordinary prepositional phrase expressing personal belief; it does not contain negative or restrictive force and thus does not trigger inversion.",
    explanationBn: "'In my opinion' সাধারণ মতামত প্রকাশ করে; এটি কোনো নেতিবাচক বা সীমাবদ্ধতাবোধক শব্দ নয়, তাই এতে Inversion হয় না।"
  },
  {
    id: "q20",
    question: "Correct the error: 'Hardly he had closed his eyes when the phone rang.'",
    options: [
      "Hardly had he closed his eyes when the phone rang.",
      "Hardly he closed his eyes than the phone rang.",
      "Hardly did he closed his eyes when the phone rang.",
      "Hardly had he closed his eyes than the phone rang."
    ],
    correctAnswer: 0,
    explanation: "Fronted 'Hardly' requires auxiliary inversion ('had he closed') and the correlative 'when'.",
    explanationBn: "সঠিক রূপ: 'Hardly had he closed his eyes when the phone rang'।"
  },
  {
    id: "q21",
    question: "Complete the inversion: 'Little _______ that his best friend had betrayed him.'",
    options: [
      "he suspected",
      "did he suspect",
      "did he suspected",
      "had he suspect"
    ],
    correctAnswer: 1,
    explanation: "'Little' is a negative adverb. In the past tense, it triggers 'did he suspect'.",
    explanationBn: "'Little' নেতিবাচক শব্দ হওয়ায় Simple Past-এ Inversion হবে: 'did he suspect'।"
  },
  {
    id: "q22",
    question: "What happens to word order when 'So + adjective' is fronted for dramatic emphasis (e.g. 'So devastating was the storm that...')?",
    options: [
      "Subject-Verb order remains normal.",
      "The verb (or auxiliary) precedes the subject.",
      "The sentence becomes passive.",
      "The conjunction 'that' is eliminated."
    ],
    correctAnswer: 1,
    explanation: "Fronting 'So + adjective' creates an emphatic result clause with full subject-verb inversion: 'So devastating was the storm that...'.",
    explanationBn: "'So + Adjective' দিয়ে বাক্য শুরু হলে তীব্রতা বাড়াতে Inversion ঘটে: 'So devastating was the storm that...'।"
  },
  {
    id: "q23",
    question: "Choose the correct sentence:",
    options: [
      "No sooner had I reached the bus stop than the bus arrived.",
      "No sooner had I reached the bus stop when the bus arrived.",
      "No sooner did I reached the bus stop than the bus arrived.",
      "No sooner I had reached the bus stop than the bus arrived."
    ],
    correctAnswer: 0,
    explanation: "Option A perfectly pairs 'No sooner had I reached' with 'than'.",
    explanationBn: "Option A-তে 'No sooner had I reached... than...' সম্পূর্ণ ব্যাকরণসম্মত।"
  },
  {
    id: "q24",
    question: "Identify the correct inversion in: 'Into the dark cave _______.'",
    options: [
      "did step the explorer",
      "stepped the explorer",
      "the explorer did step",
      "was the explorer stepping"
    ],
    correctAnswer: 1,
    explanation: "Prepositional directional fronting with a full noun subject takes full verb inversion: 'Into the dark cave stepped the explorer'.",
    explanationBn: "দিকবাচক Prepositional Phrase-এর পর Noun Subject থাকলে Full Verb Inversion ঘটে: 'stepped the explorer'।"
  },
  {
    id: "q25",
    question: "Why is 'No sooner had we arrived then the party began' incorrect?",
    options: [
      "Because 'arrived' should be 'arrive'.",
      "Because 'then' is a temporal adverb; the correlative comparative particle must be 'than'.",
      "Because 'had' should be 'did'.",
      "Because 'party' is singular."
    ],
    correctAnswer: 1,
    explanation: "'Then' (indicating time) is frequently confused with 'than' (comparative particle). 'No sooner' strictly demands 'than'.",
    explanationBn: "'Then' (তখন/তারপর) এবং 'than' (চেয়ে)-এর মধ্যে পার্থক্য অত্যন্ত গুরুত্বপূর্ণ। 'No sooner'-এর সাথে সর্বদা 'than' বসে।"
  }
];

export default questions;
