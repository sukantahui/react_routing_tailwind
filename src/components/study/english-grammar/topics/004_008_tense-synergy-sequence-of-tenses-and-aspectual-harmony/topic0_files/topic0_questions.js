const questions = [
  {
    id: 1,
    question: "Complete according to the Sequence of Tenses: 'He told me that he ______ to Kolkata the next day.'",
    options: [
      "is travelling",
      "was travelling",
      "will travel",
      "has travelled"
    ],
    correctAnswer: 1,
    explanation: "When the principal clause verb is in the Past tense ('told'), the subordinate clause verb must backshift to Past ('was travelling' or 'would travel')."
  },
  {
    id: 2,
    question: "Choose the correct sentence involving a scientific truth in indirect speech:",
    options: [
      "The teacher stated that water boiled at 100°C.",
      "The teacher stated that water boils at 100°C.",
      "The teacher stated that water was boiling at 100°C.",
      "The teacher stated that water had boiled at 100°C."
    ],
    correctAnswer: 1,
    explanation: "Universal truths, scientific facts, and laws of nature retain the Simple Present tense even after a past principal clause."
  },
  {
    id: 3,
    question: "Identify the sentence that correctly utilizes a purpose clause with 'so that':",
    options: [
      "He worked late into the night so that he may meet the deadline.",
      "He worked late into the night so that he might meet the deadline.",
      "He worked late into the night so that he will meet the deadline.",
      "He worked late into the night so that he meets the deadline."
    ],
    correctAnswer: 1,
    explanation: "When the main clause verb is in the Past ('worked'), purpose clauses introduced by 'so that' require 'might + V1' ('might meet')."
  },
  {
    id: 4,
    question: "What is the tense concord rule for the 3rd Conditional (unreal past hypothetical)?",
    options: [
      "If + Simple Past ... would + V1",
      "If + Past Perfect ... would have + V3",
      "If + Simple Present ... will + V1",
      "If + Past Continuous ... would have + V3"
    ],
    correctAnswer: 1,
    explanation: "The 3rd Conditional pairs the Past Perfect in the if-clause with the Perfect Conditional ('would have + V3') in the main result clause."
  },
  {
    id: 5,
    question: "Complete the sentence: 'If he ______ the truth earlier, he ______ such a devastating mistake.'",
    options: [
      "knew, would not make",
      "had known, would not have made",
      "has known, will not make",
      "had known, would not make"
    ],
    correctAnswer: 1,
    explanation: "Unfulfilled past condition: 'had known' (Past Perfect) pairs with 'would not have made' (would have + V3)."
  },
  {
    id: 6,
    question: "In the sentence 'It is high time we ______ working on our research paper', the correct verb is:",
    options: [
      "start",
      "started",
      "have started",
      "will start"
    ],
    correctAnswer: 1,
    explanation: "The idiomatic expression 'It is high time / It is time' takes the Simple Past tense ('started') to express present critical urgency (unreal past)."
  },
  {
    id: 7,
    question: "Which of the following illustrates 'Time vs Tense Discord' where a Present Tense form refers to Future Time?",
    options: [
      "The prime minister arrives in New Delhi tomorrow morning.",
      "She sings melodiously every evening.",
      "They had completed the audit last year.",
      "He was reading a novel yesterday."
    ],
    correctAnswer: 0,
    explanation: "'The prime minister arrives... tomorrow' uses the Simple Present tense form ('arrives') to express a scheduled Future event."
  },
  {
    id: 8,
    question: "Select the sentence with correct tense harmony after 'than':",
    options: [
      "He treated you more courteously in 2020 than he treats you today.",
      "He treated you more courteously in 2020 than he treated you today.",
      "He treats you more courteously in 2020 than he treats you today.",
      "He was treating you more courteously in 2020 than he will treated you."
    ],
    correctAnswer: 0,
    explanation: "In clauses of comparison introduced by 'than', the verb in the subordinate clause can take whatever tense is required by the temporal sense ('treats you today')."
  },
  {
    id: 9,
    question: "Choose the correct indirect form: 'Galileo proved: \"The earth revolves round the sun.\"'",
    options: [
      "Galileo proved that the earth revolved round the sun.",
      "Galileo proved that the earth revolves round the sun.",
      "Galileo had proved that the earth revolved round the sun.",
      "Galileo proved that the earth will revolve round the sun."
    ],
    correctAnswer: 1,
    explanation: "Since the earth revolving round the sun is an eternal astronomical truth, the present tense ('revolves') is preserved."
  },
  {
    id: 10,
    question: "Fill in the blank: 'If I ______ a bird, I would fly across the oceans.'",
    options: [
      "am",
      "was",
      "were",
      "had been"
    ],
    correctAnswer: 2,
    explanation: "In unreal present conditionals (2nd Conditional), the subjunctive 'were' is used for all persons including first-person singular 'I'."
  },
  {
    id: 11,
    question: "What is the function of the 'Historical Present' in literature and narrative prose?",
    options: [
      "To describe future predictions",
      "To vividly describe past historical events as if they were unfolding right now",
      "To denote eternal scientific formulas only",
      "To express unfulfilled past desires"
    ],
    correctAnswer: 1,
    explanation: "The Historical Present uses present tense forms to inject dramatic immediacy and vividness into past historical narratives."
  },
  {
    id: 12,
    question: "Spot the error in: 'She said that she *will help* me whenever I *needed* assistance.'",
    options: [
      "Change 'said' to 'says'",
      "Change 'will help' to 'would help'",
      "Change 'needed' to 'need'",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "Following the past principal verb 'said', the modal 'will' must backshift to past 'would': 'she would help me'."
  },
  {
    id: 13,
    question: "Complete the sentence: 'We eat so that we ______ live.'",
    options: [
      "may",
      "might",
      "shall",
      "would"
    ],
    correctAnswer: 0,
    explanation: "When the main clause is in the Present tense ('eat'), purpose clauses with 'so that' take 'may + V1'."
  },
  {
    id: 14,
    question: "Identify the correct 2nd Conditional sentence expressing an imaginary present scenario:",
    options: [
      "If Swadeep has more free time, he will build a robotic car.",
      "If Swadeep had more free time, he would build a robotic car.",
      "If Swadeep had had more free time, he would have built a robotic car.",
      "If Swadeep will have more free time, he would build a robotic car."
    ],
    correctAnswer: 1,
    explanation: "2nd Conditional (Hypothetical Present): 'If + Simple Past (had)... would + V1 (would build)'."
  },
  {
    id: 15,
    question: "Select the sentence where a Present principal clause permits a Future subordinate clause without alteration:",
    options: [
      "The economist predicts that inflation will decline next quarter.",
      "The economist predicted that inflation will decline next quarter.",
      "The economist had predicted that inflation will decline next quarter.",
      "The economist was predicting that inflation will decline next quarter."
    ],
    correctAnswer: 0,
    explanation: "When the principal verb is Present ('predicts'), the subordinate clause can naturally take Future ('will decline') without backshifting."
  },
  {
    id: 16,
    question: "Which of the following illustrates a 'Zero Conditional' sentence?",
    options: [
      "If you touch a flame, you will burn your fingers.",
      "If you heat water to 100°C, it boils.",
      "If you had heated water, it would have boiled.",
      "If you heat water, it would boil."
    ],
    correctAnswer: 1,
    explanation: "Zero Conditional represents inevitable natural cause-and-effect laws: 'If + Simple Present -> Simple Present'."
  },
  {
    id: 17,
    question: "Complete the sentence: 'He ran fast lest he ______ the train.'",
    options: [
      "should miss",
      "might miss",
      "will miss",
      "missed"
    ],
    correctAnswer: 0,
    explanation: "The conjunction 'lest' (meaning 'for fear that') traditionally takes the auxiliary 'should + V1' ('lest he should miss')."
  },
  {
    id: 18,
    question: "Choose the correct verb: 'I found out that my colleague ______ to a different branch two weeks prior.'",
    options: [
      "transferred",
      "had transferred",
      "has transferred",
      "is transferring"
    ],
    correctAnswer: 1,
    explanation: "The transferring happened prior to finding out in the past, necessitating the Past Perfect 'had transferred'."
  },
  {
    id: 19,
    question: "Identify the sentence that violates the Sequence of Tenses:",
    options: [
      "He believed that honesty is rewarded in heaven.",
      "She asked me where I was going.",
      "He replied that he is working on a new novel yesterday.",
      "They knew that we had arrived safely."
    ],
    correctAnswer: 2,
    explanation: "With past principal 'replied' and past time anchor 'yesterday', 'is working' is a gross sequence violation; it should be 'was working'."
  },
  {
    id: 20,
    question: "In reported speech, what does the modal 'can' backshift to when the reporting verb is in the past?",
    options: [
      "Could",
      "May",
      "Might",
      "Would"
    ],
    correctAnswer: 0,
    explanation: "'Can' backshifts to 'could' in the past sequence of tenses."
  },
  {
    id: 21,
    question: "Complete the Mixed Conditional: 'If I had invested in that startup five years ago, I ______ wealthy today.'",
    options: [
      "would have been",
      "would be",
      "will be",
      "had been"
    ],
    correctAnswer: 1,
    explanation: "Mixed Conditional: A past hypothetical action ('If I had invested...') with a present ongoing consequence ('I would be wealthy today')."
  },
  {
    id: 22,
    question: "Select the sentence where 'will' is correctly preserved in indirect speech because the event is still in the future relative to the speaker:",
    options: [
      "Yesterday she said that the solar eclipse will occur tomorrow.",
      "Yesterday she said that the solar eclipse would occurred.",
      "Yesterday she says that the solar eclipse will occurred.",
      "Yesterday she has said that the solar eclipse will occurred."
    ],
    correctAnswer: 0,
    explanation: "In modern English, if an event remains future at the time of reporting (tomorrow), 'will' can be preserved for clarity."
  },
  {
    id: 23,
    question: "What is the tense structure of: 'The moment the speaker concluded, the audience applauded'?",
    options: [
      "Past Continuous and Simple Past",
      "Simple Past and Simple Past",
      "Past Perfect and Simple Past",
      "Simple Present and Simple Future"
    ],
    correctAnswer: 1,
    explanation: "Two immediate sequential past actions connected by 'the moment' both take the Simple Past."
  },
  {
    id: 24,
    question: "Fill in the blank: 'Nobody knew whether he ______ the proposal or not.'",
    options: [
      "will accept",
      "would accept",
      "is accepting",
      "accepts"
    ],
    correctAnswer: 1,
    explanation: "Past principal 'knew' requires the future-in-the-past modal 'would accept'."
  },
  {
    id: 25,
    question: "Which of the following summaries accurately states the core principle of Tense Synergy?",
    options: [
      "Every sentence in a paragraph must always use the exact same tense.",
      "Tenses across connected clauses must logically harmonize according to chronological time and grammatical sequence rules.",
      "Only the Simple Present tense should be used in formal academic papers.",
      "Past and future verbs can never appear in the same complex sentence under any circumstances."
    ],
    correctAnswer: 1,
    explanation: "Tense synergy ensures that subordinate clauses harmonize grammatically with the principal clause and accurately reflect intended chronological relationships."
  }
];

export default questions;
