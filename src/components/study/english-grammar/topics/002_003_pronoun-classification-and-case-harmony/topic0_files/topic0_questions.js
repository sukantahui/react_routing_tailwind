// topic0_questions.js
// Module 002_003: Pronoun Classification, Antecedent Harmony & Politeness Order
// 25 Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "In the sentence 'Between you and ________, the final algorithm requires further optimization', which pronoun correctly fills the blank?",
    options: [
      "I",
      "me",
      "myself",
      "he"
    ],
    correctAnswer: 1,
    explanation: "'Between' is a Preposition. Prepositions strictly govern the OBJECTIVE (Accusative) case: 'Between you and ME' (NEVER 'Between you and I').",
    explanationBn: "'Between' একটি Preposition। Preposition-এর পর সর্বদাই Objective Case বসে: 'Between you and me' ('Between you and I' সম্পূর্ণ ভুল)।"
  },
  {
    id: 2,
    question: "According to the 231 Politeness Rule in standard English, how should multiple singular personal pronouns be sequenced in positive/neutral contexts?",
    options: [
      "First Person -> Second Person -> Third Person (I, you, and he)",
      "Second Person -> Third Person -> First Person (You, he, and I)",
      "Third Person -> Second Person -> First Person (He, you, and I)",
      "First Person -> Third Person -> Second Person (I, he, and you)"
    ],
    correctAnswer: 1,
    explanation: "The 231 Rule dictates that for politeness in positive or neutral contexts, sequence: 2nd Person (You) -> 3rd Person (He/She) -> 1st Person (I): 'You, he, and I will lead the Barrackpore project.'",
    explanationBn: "ইংরেজি শিষ্টাচারের ২-৩-১ নিয়ম অনুযায়ী সাধারণ বা ভালো কাজের ক্ষেত্রে ক্রম হয়: Second Person (You) $\\rightarrow$ Third Person (He/She) $\\rightarrow$ First Person (I): 'You, he, and I'।"
  },
  {
    id: 3,
    question: "When confessing a mistake, admitting a crime, or using plural pronouns, what is the correct pronoun sequence (The 123 Rule)?",
    options: [
      "2 -> 3 -> 1 (You, he, and I)",
      "1 -> 2 -> 3 (I, you, and he)",
      "3 -> 2 -> 1 (He, you, and I)",
      "1 -> 3 -> 2 (I, he, and you)"
    ],
    correctAnswer: 1,
    explanation: "When admitting fault, guilt, or blameworthy acts, the 123 Rule places the speaker first to take responsibility: 'I, you, and he are to blame for this calculation error.' Also used for plural pronouns: 'We, you, and they'.",
    explanationBn: "ভুল স্বীকার, অপরাধের দায়িত্ব নেওয়া বা বহুবচন সর্বনামের ক্ষেত্রে ১-২-৩ ক্রম বজায় থাকে: 'I, you, and he are to blame' এবং 'We, you, and they'।"
  },
  {
    id: 4,
    question: "In the sentence 'Let ________ and ________ complete the documentation', which pronouns are grammatically correct?",
    options: [
      "he, I",
      "him, me",
      "he, me",
      "him, I"
    ],
    correctAnswer: 1,
    explanation: "The verb 'Let' takes pronouns in the OBJECTIVE (Accusative) case: 'Let HIM and ME complete the documentation.'",
    explanationBn: "'Let' Verb-এর পর সর্বদাই Objective Case-এর Pronoun বসে: 'Let him and me complete the work'।"
  },
  {
    id: 5,
    question: "In 'The scientist ________ solved the complex theorem was felicitated at Barrackpore', which relative pronoun correctly fills the blank?",
    options: [
      "whom",
      "who",
      "which",
      "whose"
    ],
    correctAnswer: 1,
    explanation: "'Who' functions as the SUBJECT of the subordinate relative clause ('who solved the theorem'). 'Whom' is used strictly for objects.",
    explanationBn: "Subordinate Clause-এর Subject হিসেবে ব্যক্তিবাচক Relative Pronoun 'who' বসে ('who solved the theorem')। 'Whom' শুধুমাত্র Object হিসেবে বসে।"
  },
  {
    id: 6,
    question: "In 'This is the student ________ the university awarded the gold medal', which relative pronoun is correct?",
    options: [
      "who",
      "whom",
      "which",
      "what"
    ],
    correctAnswer: 1,
    explanation: "'Whom' functions as the OBJECT of the verb 'awarded' (The university awarded the gold medal to HIM).",
    explanationBn: "এখানে 'the university' হলো Subject এবং যাকে দেওয়া হয়েছে তা Object, তাই Objective Relative Pronoun 'whom' বসবে।"
  },
  {
    id: 7,
    question: "After superlative adjectives (e.g. 'the best', 'the most diligent'), which relative pronoun is MANDATORY in standard English?",
    options: [
      "Which",
      "Who",
      "That",
      "Whom"
    ],
    correctAnswer: 2,
    explanation: "Standard English mandates 'THAT' (not 'which' or 'who') after superlative adjectives, 'all', 'the same', 'the only', 'none', and 'everything': 'This is the best book THAT I have ever read.'",
    explanationBn: "Superlative Degree, 'All', 'The same', 'The only', 'None'-এর পর Relative Pronoun হিসেবে 'which' বা 'who'-এর বদলে বাধ্যতামূলকভাবে 'THAT' বসে।"
  },
  {
    id: 8,
    question: "What is the difference between Reflexive and Emphatic pronouns in: 'Swadeep solved the problem himself' vs 'Swadeep himself solved the problem'?",
    options: [
      "In the first it is reflexive; in the second it is emphatic.",
      "In both it is emphatic (used for dramatic emphasis; omitting it leaves the sentence complete: 'Swadeep solved the problem').",
      "They are two completely different words.",
      "Reflexive pronouns cannot end in -self."
    ],
    correctAnswer: 1,
    explanation: "An Emphatic pronoun is added merely for emphasis and can be removed without making the sentence ungrammatical. A pure Reflexive pronoun acts as direct/prepositional object where the subject and object are the same ('He hurt himself').",
    explanationBn: "Emphatic Pronoun বাক্যে জোর প্রদানের জন্য বসে এবং এটি বাদ দিলেও বাক্য ব্যাকরণগতভাবে সম্পূর্ণ থাকে। আর Reflexive Pronoun বাক্যের Object হিসেবে কাজ করে (যেমন: 'He hurt himself')।"
  },
  {
    id: 9,
    question: "In the sentence 'Every student must submit ________ assignment before Friday', which pronoun is traditionally prescribed in formal grammar?",
    options: [
      "their",
      "his or her (or his)",
      "its",
      "one's"
    ],
    correctAnswer: 1,
    explanation: "'Every student' is grammatically singular. Traditional prescriptive grammar mandates singular agreement: 'his or her' (or traditional generic 'his'), though singular 'their' is common informally.",
    explanationBn: "'Every student' ব্যাকরণগতভাবে Singular, তাই প্রথাগত ব্যাকরণে Singular Pronoun 'his or her' (বা 'his') ব্যবহৃত হয়।"
  },
  {
    id: 10,
    question: "What is the correct pronoun in: 'One should always fulfill ________ moral obligations'?",
    options: [
      "his",
      "her",
      "one's",
      "their"
    ],
    correctAnswer: 2,
    explanation: "The indefinite pronoun 'One' must maintain antecedent harmony throughout the sentence using 'one' and 'one's' (NEVER switch to 'his' or 'their'): 'One must keep ONE'S promise.'",
    explanationBn: "'One' দিয়ে বাক্য শুরু হলে তার Possessive সর্বদাই 'one's' হবে (কখনোই 'his' বা 'their' নয়): 'One should fulfill one's duties'।"
  },
  {
    id: 11,
    question: "In 'The two brothers helped ________ during the crisis', which reciprocal pronoun is correct?",
    options: [
      "one another",
      "each other",
      "themselves",
      "one other"
    ],
    correctAnswer: 1,
    explanation: "In traditional grammar, 'Each other' is used when referring to TWO entities; 'One another' is used when referring to MORE THAN TWO entities.",
    explanationBn: "ঐতিহ্যগত ব্যাকরণ অনুযায়ী দুজনের মধ্যে পারস্পরিক সম্পর্ক বোঝাতে 'each other' এবং দুইয়ের অধিক ব্যক্তির মধ্যে 'one another' বসে।"
  },
  {
    id: 12,
    question: "In 'All the members of the Barrackpore committee supported ________ during the election', which pronoun is correct?",
    options: [
      "each other",
      "one another",
      "themselves",
      "each one"
    ],
    correctAnswer: 1,
    explanation: "Since 'All the members' denotes more than two individuals, 'one another' is the standard reciprocal pronoun.",
    explanationBn: "যেহেতু কমিটির সদস্য সংখ্যা দুইয়ের বেশি, তাই Reciprocal Pronoun হিসেবে 'one another' বসবে।"
  },
  {
    id: 13,
    question: "In the sentence 'She is as intelligent as ________', which pronoun is correct in formal prescriptive grammar?",
    options: [
      "he",
      "him",
      "his",
      "himself"
    ],
    correctAnswer: 0,
    explanation: "In formal comparisons with 'as... as' or 'than', an elliptical clause follows: 'She is as intelligent as HE [is intelligent]'. The subjective pronoun 'he' is correct.",
    explanationBn: "আনুষ্ঠানিক ব্যাকরণে 'as... as' বা 'than'-এর পর উহ্য Clause থাকায় Subjective Pronoun বসে: 'as intelligent as he [is]'।"
  },
  {
    id: 14,
    question: "What type of pronoun is 'This' in: 'This is the computer I purchased from Shyamnagar'?",
    options: [
      "Demonstrative Pronoun",
      "Demonstrative Adjective",
      "Personal Pronoun",
      "Relative Pronoun"
    ],
    correctAnswer: 0,
    explanation: "'This' stands alone as the grammatical subject before the linking verb 'is'. Hence, it is a Demonstrative Pronoun. (If it directly preceded a noun, e.g., 'This computer is new', it would be a Demonstrative Adjective).",
    explanationBn: "'This' শব্দটি কোনো Noun ছাড়া স্বাধীনভাবে Subject হিসেবে বসেছে, তাই এটি Demonstrative Pronoun (নির্দেশক সর্বনাম)।"
  },
  {
    id: 15,
    question: "In 'Neither of the proposals ________ acceptable to the council', which verb is correct?",
    options: [
      "is",
      "are",
      "were",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "The distributive pronoun 'Neither' means 'not one nor the other of two' and is strictly singular, governing the singular verb 'is'.",
    explanationBn: "Distributive Pronoun 'Neither' (দুজনের কেউই না) সর্বদা Singular এবং Singular Verb 'is' গ্রহণ করে।"
  },
  {
    id: 16,
    question: "Which sentence correctly uses 'Who' vs 'Whom'?",
    options: [
      "Whom wrote this software module?",
      "Who did you invite to the seminar?",
      "Whom did you invite to the seminar?",
      "Who did you give the book?"
    ],
    correctAnswer: 2,
    explanation: "In 'Whom did you invite?', 'you' is the subject, and 'Whom' is the direct object of 'invite' (You invited HIM $\\rightarrow$ Whom).",
    explanationBn: "'Whom did you invite?'-তে 'you' হলো Subject এবং 'Whom' হলো 'invite' Verb-এর Direct Object।"
  },
  {
    id: 17,
    question: "In the sentence 'All that glitters is not gold', why is 'which' NOT used?",
    options: [
      "Because 'all' requires the relative pronoun 'that' in standard English proverbs and grammar.",
      "Because which is an adverb.",
      "Because gold is uncountable.",
      "Because glitters is a verb."
    ],
    correctAnswer: 0,
    explanation: "After the indefinite word 'All', the relative pronoun 'that' is strictly mandated: 'All THAT glitters is not gold' (never *'All which glitters'*).",
    explanationBn: "'All'-এর পর Relative Pronoun হিসেবে সর্বদাই 'that' বসে: 'All that glitters is not gold'।"
  },
  {
    id: 18,
    question: "In the sentence 'You, he, and I have completed ________ project', which possessive determiner agrees with the compound subject?",
    options: [
      "your",
      "his",
      "our",
      "their"
    ],
    correctAnswer: 2,
    explanation: "When a compound subject includes the 1st person ('I'), the comprehensive 1st person plural possessive 'our' must be used: 'You, he, and I have completed OUR project.'",
    explanationBn: "Compound Subject-এ First Person ('I') অন্তর্ভুক্ত থাকলে সম্মিলিত Possessive হিসেবে 'our' বসে: 'You, he, and I ... our project'।"
  },
  {
    id: 19,
    question: "In 'You and he should submit ________ research proposals', which possessive determiner agrees?",
    options: [
      "our",
      "your",
      "their",
      "his"
    ],
    correctAnswer: 1,
    explanation: "When combining 2nd Person ('You') and 3rd Person ('He') without 1st person, the 2nd person plural possessive 'your' takes precedence: 'You and he should submit YOUR proposals.'",
    explanationBn: "Subject-এ Second Person ('You') এবং Third Person ('He') থাকলে যৌথ Possessive হিসেবে 'your' বসে: 'You and he ... your proposals'।"
  },
  {
    id: 20,
    question: "What is the error in: 'Myself am Sukanta Hui'?",
    options: [
      "There is no error.",
      "A reflexive/emphatic pronoun ('Myself') cannot serve as the subject of a sentence without an overt nominative pronoun ('I myself am...').",
      "Am should be is.",
      "Hui should be lowercase."
    ],
    correctAnswer: 1,
    explanation: "Reflexive/emphatic pronouns cannot stand alone as grammatical subjects. The correct introduction is 'I am Sukanta Hui' or 'My name is Sukanta Hui'.",
    explanationBn: "'Myself' কখনো বাক্যের Subject হতে পারে না। সঠিক রূপ হলো 'I am Sukanta Hui' বা 'My name is Sukanta Hui'।"
  },
  {
    id: 21,
    question: "In the sentence 'The climate of Barrackpore is like ________ of Kolkata', which pronoun correctly completes the comparison?",
    options: [
      "that",
      "those",
      "this",
      "these"
    ],
    correctAnswer: 0,
    explanation: "To prevent repeating the singular noun 'climate', use the demonstrative pronoun 'that': 'The climate of Barrackpore is like THAT of Kolkata' (Never compare 'climate' directly with 'Kolkata'!).",
    explanationBn: "Singular Noun-এর পুনরাবৃত্তি এড়াতে 'that of' বসে: 'The climate of Barrackpore is like that of Kolkata'।"
  },
  {
    id: 22,
    question: "In 'The streets of Kolkata are wider than ________ of Naihati', which pronoun is correct?",
    options: [
      "that",
      "those",
      "this",
      "these"
    ],
    correctAnswer: 1,
    explanation: "For plural nouns ('streets'), use the demonstrative pronoun 'those': 'The streets of Kolkata are wider than THOSE of Naihati.'",
    explanationBn: "Plural Noun-এর পুনরাবৃত্তি এড়াতে 'those of' বসে: 'The streets of Kolkata are wider than those of Naihati'।"
  },
  {
    id: 23,
    question: "What is the grammatical error in: 'He is one of those scholars who DOES not compromise on quality'?",
    options: [
      "No error.",
      "The relative pronoun 'who' refers to the plural antecedent 'those scholars'; therefore, the verb must be plural 'DO', not singular 'does'.",
      "Quality should be plural.",
      "Compromise should be compromising."
    ],
    correctAnswer: 1,
    explanation: "In 'one of those + Plural Noun + who', the antecedent of 'who' is the plural noun ('scholars'), requiring a plural verb: 'who DO not compromise'. (Only if preceded by 'The ONLY one of...' does it take singular).",
    explanationBn: "'One of those scholars who...'-তে 'who'-এর Antecedent হলো Plural 'scholars', তাই Verb হবে Plural 'DO' ('who DO not compromise')।"
  },
  {
    id: 24,
    question: "In 'He is the ONLY one of the candidates who ________ cleared the cut-off', which verb is correct?",
    options: [
      "has",
      "have",
      "are",
      "were"
    ],
    correctAnswer: 0,
    explanation: "When modified by 'the ONLY one of...', the focus shifts strictly to the singular individual, requiring the singular verb 'HAS cleared'.",
    explanationBn: "'The ONLY one of...'-এর ক্ষেত্রে একক ব্যক্তিকে নির্দেশ করায় Singular Verb 'has' বসে।"
  },
  {
    id: 25,
    question: "Why is mastering Pronoun Case Harmony and Antecedent Rules essential for competitive exam aspirants?",
    options: [
      "Because pronoun discord (like 'Between you and I', 'who vs whom', and 'that of vs those of') accounts for over 30% of sentence correction questions in SSC CGL, Banking, and WBCS exams.",
      "Because pronouns are optional in English.",
      "Because pronouns cannot be translated into Bengali.",
      "Because pronouns only appear in spoken English."
    ],
    correctAnswer: 0,
    explanation: "Pronoun case violations and antecedent disagreement are among the most frequently tested diagnostic traps in competitive government and graduate examinations.",
    explanationBn: "Pronoun Case ('Between you and me') এবং Antecedent Harmony ('that of / those of', 'who vs whom') প্রতিযোগিতামূলক পরীক্ষায় Error Spotting-এর অন্যতম প্রধান ক্ষেত্র।"
  }
];

export default questions;
