const questions = [
  {
    id: "q1",
    question: "What form of the verb is used in the MANDATIVE SUBJUNCTIVE (after verbs/adjectives of demand, recommendation, or urgency like 'demand', 'insist', 'recommend', 'vital', 'essential')?",
    options: [
      "The 3rd Person Singular form with '-s' (e.g. 'goes')",
      "The BARE BASE FORM (Infinitive root: 'go', 'be') regardless of the subject's person or number",
      "Past Tense (e.g. 'went')",
      "Present Participle (e.g. 'going')"
    ],
    correctAnswer: 1,
    explanation: "The mandative subjunctive requires the bare root base form without '-s' or modal auxiliaries: 'The doctor recommends that he STOP smoking' (not 'stops'), 'It is essential that she BE present'.",
    explanationBn: "Mandative Subjunctive (আদেশ বা সুপারিশসূচক বাক্য)-এ Subject ৩য় পুরুষ একবচন হলেও মূল Verb-এর Base Form (যথা: 'be', 'go', 'stop') বসে, কোনো '-s' যোগ হয় না।"
  },
  {
    id: "q2",
    question: "Select the sentence that correctly employs the MANDATIVE SUBJUNCTIVE:",
    options: [
      "The committee demanded that the president resigns immediately.",
      "The committee demanded that the president resign immediately.",
      "The committee demanded that the president to resign immediately.",
      "The committee demanded that the president will resign."
    ],
    correctAnswer: 1,
    explanation: "'Demanded that + Subject + Base Verb (resign)': 'The committee demanded that the president resign immediately'.",
    explanationBn: "'Demanded that'-এর পর Subjunctive Base Form 'resign' বসবে ('resigns' নয়)।"
  },
  {
    id: "q3",
    question: "In the HYPOTHETICAL / UNREAL Second Conditional, why is 'WERE' used with singular subjects like 'I', 'He', 'She'?",
    options: [
      "It is a spelling error in modern English.",
      "It is the 'Past Subjunctive' (Irrealis 'were') used to express imaginary, counterfactual, or hypothetical non-real states ('If I were you', 'If he were a king').",
      "Because 'I' is plural in old English.",
      "Because 'were' is future tense."
    ],
    correctAnswer: 1,
    explanation: "The Irrealis 'were' (Past Subjunctive) indicates counterfactual unreality contrary to fact: 'If I were a millionaire, I would travel the world'.",
    explanationBn: "অবাস্তব বা কল্পনামূলক পরিস্থিতিতে (Unreal/Counterfactual) Singular Subject ('I', 'He', 'She')-র সাথেও Past Subjunctive হিসেবে 'WERE' বসে ('If I were a bird')।"
  },
  {
    id: "q4",
    question: "Identify the formula for the THIRD CONDITIONAL (Past Unreal Condition with unalterable past result):",
    options: [
      "If + Simple Present ..., will + Base Verb",
      "If + Simple Past ..., would + Base Verb",
      "If + Past Perfect (had + V3) ..., Subject + would/could/might have + V3",
      "If + Past Continuous ..., will have + V3"
    ],
    correctAnswer: 2,
    explanation: "Third Conditional: 'If + had + V3 ..., would have + V3' (e.g. 'If I had studied harder, I would have passed the exam').",
    explanationBn: "Third Conditional-এর সূত্র: 'If + had + V3 ..., Subject + would have + V3'।"
  },
  {
    id: "q5",
    question: "Transform into an inverted Third Conditional (dropping 'if'): 'If he had practiced daily, he would have won the championship.'",
    options: [
      "Had he practiced daily, he would have won the championship.",
      "Did he practice daily, he would have won the championship.",
      "Should he practice daily, he would have won the championship.",
      "Were he practiced daily, he would have won."
    ],
    correctAnswer: 0,
    explanation: "'Had he practiced...' is the standard inverted equivalent of 'If he had practiced...', dropping the conjunction 'if'.",
    explanationBn: "Third Conditional-এ 'If' তুলে দিয়ে 'Had' প্রথমে এনে বাক্য গঠন করা হয়: 'Had he practiced daily...'।"
  },
  {
    id: "q6",
    question: "Complete the ZERO CONDITIONAL (Scientific / Universal General Truth): 'If you heat ice, it _______.'",
    options: [
      "will melt",
      "melts",
      "melted",
      "would melt"
    ],
    correctAnswer: 1,
    explanation: "Zero Conditional represents automatic cause-and-effect natural laws using Simple Present in both clauses: 'If you heat ice, it melts'.",
    explanationBn: "Zero Conditional (চিরন্তন বৈজ্ঞানিক কার্যকারণ)-এ উভয় ক্লজেই Simple Present Tense বসে: 'it melts'।"
  },
  {
    id: "q7",
    question: "Complete the FIRST CONDITIONAL (Real Future Possibility): 'If it _______ tomorrow, the cricket match will be postponed.'",
    options: [
      "will rain",
      "rains",
      "rained",
      "would rain"
    ],
    correctAnswer: 1,
    explanation: "First Conditional uses Simple Present ('rains') in the conditional 'if' clause and 'will + V1' in the main clause.",
    explanationBn: "First Conditional-এর 'If' যুক্ত অংশে Simple Present 'rains' বসবে ('will rain' লেখা ব্যাকরণগত ভুল)।"
  },
  {
    id: "q8",
    question: "Complete the SECOND CONDITIONAL (Present / Future Hypothetical): 'If I _______ his phone number, I would call him immediately.'",
    options: [
      "know",
      "knew",
      "have known",
      "had known"
    ],
    correctAnswer: 1,
    explanation: "Second Conditional uses Simple Past ('knew') in the 'if' clause and 'would + Base Verb' in the main clause.",
    explanationBn: "Second Conditional-এ 'If' অংশে Simple Past 'knew' এবং প্রধান অংশে 'would + Base Verb' বসে।"
  },
  {
    id: "q9",
    question: "What is a MIXED CONDITIONAL?",
    options: [
      "A sentence mixing two different languages.",
      "A conditional sentence where the time in the 'if' clause (e.g. past action) is different from the time in the result clause (e.g. present consequence).",
      "A sentence with no verb.",
      "A conditional with two 'if' words."
    ],
    correctAnswer: 1,
    explanation: "A Mixed Conditional connects past events to present results (e.g. 'If I had won the lottery last year [Past], I would be rich today [Present]').",
    explanationBn: "Mixed Conditional অতীতে সম্পন্ন কাজের ফলাফল বর্তমানে চলমান থাকা বোঝাতে ব্যবহৃত হয় (যেমন: 'If I had taken that flight, I would be dead now')।"
  },
  {
    id: "q10",
    question: "Identify the MIXED CONDITIONAL in the following choices:",
    options: [
      "If you touch fire, you get burned.",
      "If it rains, we will stay home.",
      "If I had studied medicine in college, I would be a doctor now.",
      "If I were a bird, I would fly."
    ],
    correctAnswer: 2,
    explanation: "'If I had studied' (Past Perfect: past condition) + 'I would be a doctor now' (would + base: present result) is a classic Type 3-to-Type 2 Mixed Conditional.",
    explanationBn: "অতীতে ডাক্তারি পড়লে বর্তমানে ডাক্তার থাকতাম: এটি Mixed Conditional-এর উদাহরণ।"
  },
  {
    id: "q11",
    question: "Complete the Mandative Subjunctive: 'It is essential that every student _______ the code of conduct.'",
    options: [
      "follows",
      "follow",
      "followed",
      "will follow"
    ],
    correctAnswer: 1,
    explanation: "After 'essential that', the subjunctive base form 'follow' (with no '-s') must be used.",
    explanationBn: "'It is essential that'-এর পর Subjunctive Base Form 'follow' বসবে ('follows' নয়)।"
  },
  {
    id: "q12",
    question: "Choose the correct sentence to express an unfulfilled past wish with 'WISH':",
    options: [
      "I wish I know the answer.",
      "I wish I had known the answer before the test.",
      "I wish I will know the answer.",
      "I wish I am knowing the answer."
    ],
    correctAnswer: 1,
    explanation: "Regret about an unalterable past event is expressed with 'Wish + Past Perfect': 'I wish I had known'.",
    explanationBn: "অতীতের অপূর্ণ অনুশোচনা প্রকাশে 'Wish + Past Perfect' ('had known') বসে।"
  },
  {
    id: "q13",
    question: "Choose the correct sentence to express a present imaginary wish contrary to fact:",
    options: [
      "I wish I were taller.",
      "I wish I was taller. (Informal only)",
      "I wish I am taller.",
      "I wish I will be taller."
    ],
    correctAnswer: 0,
    explanation: "In formal standard English, the subjunctive 'were' is used with 'I' in present counterfactual wishes: 'I wish I were taller'.",
    explanationBn: "প্রমিত ইংরেজিতে অবাস্তব আকাঙ্ক্ষা প্রকাশে 'I wish I were taller' সঠিক।"
  },
  {
    id: "q14",
    question: "In the sentence 'It is high time we _______ our preparation', which form correctly completes the idiom?",
    options: [
      "start",
      "started",
      "have started",
      "will start"
    ],
    correctAnswer: 1,
    explanation: "'It is high time / It is time + Subject' is an unreal past construction that MUST take the Simple Past tense ('started') to indicate urgency.",
    explanationBn: "'It is high time'-এর পর Subject থাকলে Verb-এর Simple Past রূপ ('started') বসানো বাধ্যতামূলক।"
  },
  {
    id: "q15",
    question: "What does 'Unless you study hard, you will not pass' mean?",
    options: [
      "If you study hard, you will fail.",
      "If you do NOT study hard, you will fail ('Unless' = 'If ... not').",
      "You study hard only after passing.",
      "None of the above."
    ],
    correctAnswer: 1,
    explanation: "'Unless' inherently contains negative meaning ('if not'). Therefore, the clause following 'unless' cannot contain another negative particle.",
    explanationBn: "'Unless' অর্থ 'যদি না' (If not)। তাই 'Unless'-যুক্ত অংশে আর কোনো 'not' বসে না।"
  },
  {
    id: "q16",
    question: "Identify the formula for the INVERTED First Conditional with 'Should':",
    options: [
      "Should you require any assistance, please contact the front desk.",
      "If should you require assistance...",
      "Do you require assistance...",
      "Will you require assistance..."
    ],
    correctAnswer: 0,
    explanation: "'Should you require...' inverts First Conditional by dropping 'if' and fronting 'should' in polite business/formal English.",
    explanationBn: "First Conditional-এ 'If'-এর বদলে 'Should' শুরুতে এনে Inversion করা হয়: 'Should you require...'।"
  },
  {
    id: "q17",
    question: "Complete the sentence: 'He talks as if he _______ the owner of the company.'",
    options: [
      "is",
      "were",
      "was to be",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "'As if' / 'As though' expressing a counterfactual or imaginary state requires the past subjunctive 'were': 'as if he were the owner'.",
    explanationBn: "'As if' বা 'As though'-এর পর অবাস্তব ভাব প্রকাশে 'were' বসে ('as if he were the owner')।"
  },
  {
    id: "q18",
    question: "Identify the FORMULAIC SUBJUNCTIVE in archaic/traditional idioms:",
    options: [
      "God save the King!",
      "Long live the Republic!",
      "Be that as it may...",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Fixed traditional subjunctive expressions retain the bare base verb without third-person '-s' (e.g. 'God save', 'Long live', 'Be that as it may', 'Heaven forbid').",
    explanationBn: "প্রচলিত প্রাচীন ও ঐতিহ্যবাহী প্রার্থনামূলক উক্তিতে Subjunctive Base Form অক্ষুণ্ণ থাকে ('God save the King', 'Long live')."
  },
  {
    id: "q19",
    question: "Choose the correct sentence regarding Mandative Subjunctive with the verb 'BE':",
    options: [
      "The judge ordered that the prisoner is released.",
      "The judge ordered that the prisoner be released.",
      "The judge ordered that the prisoner was released.",
      "The judge ordered that the prisoner will be released."
    ],
    correctAnswer: 1,
    explanation: "The mandative subjunctive of the verb 'to be' is simply 'BE': 'ordered that the prisoner BE released'.",
    explanationBn: "Mandative Subjunctive-এ 'to be' ক্রিয়ার রূপ সর্বদা 'BE' হয়: 'ordered that the prisoner BE released'।"
  },
  {
    id: "q20",
    question: "What is the error in: 'If I will win the lottery, I will buy a house'?",
    options: [
      "'Will' should never appear in both conditional and result clauses; the 'if' clause must use Simple Present ('If I win...').",
      "'Lottery' is misspelled.",
      "'House' should be plural.",
      "No error."
    ],
    correctAnswer: 0,
    explanation: "In conditional sentences, future auxiliaries ('will/shall') are strictly forbidden in the conditional 'if' clause: 'If I win the lottery, I will buy a house'.",
    explanationBn: "'If'-যুক্ত শর্তমূলক বাক্যাংশে 'will' বসানো সম্পূর্ণ ভুল; সেখানে Simple Present 'If I win' হবে।"
  },
  {
    id: "q21",
    question: "Complete the sentence: 'Provided that you _______ all the terms, we will sign the agreement.'",
    options: [
      "will accept",
      "accept",
      "accepted",
      "would accept"
    ],
    correctAnswer: 1,
    explanation: "'Provided that' functions as a conditional conjunction equivalent to 'if' and takes the Simple Present tense ('accept').",
    explanationBn: "'Provided that' (শর্ত থাকে যে)-এর পর Simple Present 'accept' বসবে।"
  },
  {
    id: "q22",
    question: "Convert 'If I were in your position, I would resign' into an INVERTED CONDITIONAL:",
    options: [
      "Were I in your position, I would resign.",
      "Was I in your position, I would resign.",
      "Did I be in your position, I would resign.",
      "Had I been in your position, I would resign."
    ],
    correctAnswer: 0,
    explanation: "'If I were...' inverts to 'Were I...'.",
    explanationBn: "Second Conditional-এর Inverted রূপ: 'Were I in your position, I would resign'।"
  },
  {
    id: "q23",
    question: "Select the sentence with correct subjunctive verb form:",
    options: [
      "The manager proposed that Swadeep leads the project.",
      "The manager proposed that Swadeep lead the project.",
      "The manager proposed that Swadeep will lead the project.",
      "The manager proposed that Swadeep led the project."
    ],
    correctAnswer: 1,
    explanation: "'Proposed that' triggers the mandative subjunctive bare base form 'lead' without '-s'.",
    explanationBn: "'Proposed that'-এর পর Subjunctive Base Form 'lead' বসবে।"
  },
  {
    id: "q24",
    question: "What is the difference between 'In case of fire, break the glass' and 'In case it rains'?",
    options: [
      "'In case of' is a prepositional phrase followed by a noun; 'In case' is a conjunction followed by a clause of precaution.",
      "Both are identical.",
      "'In case' requires past tense.",
      "'In case of' requires future tense."
    ],
    correctAnswer: 0,
    explanation: "'In case of + Noun' (prepositional). 'In case + Clause' (subordinating conjunction of precaution: 'Take an umbrella in case it rains').",
    explanationBn: "'In case of'-এর পর Noun বসে; আর 'In case'-এর পর পূর্ণাঙ্গ Clause বসে।"
  },
  {
    id: "q25",
    question: "Identify the Optative / Formulaic Subjunctive expressing a blessing: 'May God _______ you with peace.'",
    options: [
      "blesses",
      "bless",
      "blessed",
      "blessing"
    ],
    correctAnswer: 1,
    explanation: "Modal 'May' in optative prayers takes the bare base verb 'bless': 'May God bless you'.",
    explanationBn: "প্রার্থনা বা আশীর্বাদ প্রকাশে 'May God bless you' ব্যবহৃত হয়।"
  }
];

export default questions;
