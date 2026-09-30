// topic3_questions.js
// Topic 3: High-Level Overview of Nouns, Pronouns, and Verbs
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is the primary syntactic role of a Noun or Pronoun in an English clause?",
    options: [
      "Modifying an adverb",
      "Functioning as Subject, Direct/Indirect Object, or Complement",
      "Connecting two independent clauses",
      "Expressing sudden emotion"
    ],
    correctAnswer: 1,
    answer: "Functioning as Subject, Direct/Indirect Object, or Complement",
    explanation: "Nominals (Nouns and Pronouns) occupy the core syntactic argument slots of a clause: Subject, Object of Verb, Object of Preposition, or Complement.",
    explanationBn: "যেকোনো বাক্যে Noun ও Pronoun মূলত Subject (কর্তা), Object (কর্ম), অথবা Complement হিসেবে ব্যবহৃত হয়।",
    hint: "Think about who performs or receives the action.",
    level: "basic"
  },
  {
    id: 2,
    question: "Why is a Finite Verb considered the indispensable engine of an English sentence?",
    options: [
      "Because it contains the longest words",
      "Because a clause cannot exist in standard English without at least one finite verb indicating tense/person",
      "Because verbs are always capitalized",
      "Because verbs can only appear at the very beginning of a sentence"
    ],
    correctAnswer: 1,
    answer: "Because a clause cannot exist in standard English without at least one finite verb indicating tense/person",
    explanation: "Unlike some languages with zero-copula sentences, English requires an explicit finite verb in every independent clause.",
    explanationBn: "ইংরেজিতে সমাপিকা ক্রিয়া (Finite Verb) ছাড়া কোনো পূর্ণাঙ্গ বাক্য গঠিত হতে পারে না; Verb বাক্যের কাল ও কাজ নির্ধারণ করে।",
    hint: "Can a grammatically complete sentence exist in English without a finite verb?",
    level: "basic"
  },
  {
    id: 3,
    question: "What is a major structural difference between Bengali and English regarding linking verbs (Be-verbs)?",
    options: [
      "Bengali requires three verbs per sentence",
      "Bengali allows zero-copula sentences (যেমন: 'সে অসুস্থ') whereas English mandates a linking verb ('He is ill')",
      "English never uses linking verbs",
      "Bengali sentences never have subjects"
    ],
    correctAnswer: 1,
    answer: "Bengali allows zero-copula sentences (যেমন: 'সে অসুস্থ') whereas English mandates a linking verb ('He is ill')",
    explanation: "In Bengali, the present tense copula is regularly omitted ('তিনি শিক্ষক'), leading regional learners to mistakenly write *'He teacher' instead of 'He is a teacher'.",
    explanationBn: "বাংলায় 'সে অসুস্থ' বাক্যে কোনো ক্রিয়াপদ না থাকলেও চলে, কিন্তু ইংরেজিতে 'He is ill'—এখানে 'is' Verb দেওয়া বাধ্যতামূলক।",
    hint: "Think of the missing verb trap in Bengali to English translation.",
    level: "intermediate"
  },
  {
    id: 4,
    question: "Which of the following represents an Abstract Noun?",
    options: ["Barrackpore", "Integrity", "Smartphone", "Swadeep"],
    correctAnswer: 1,
    answer: "Integrity",
    explanation: "'Integrity' names an intangible quality, state, or concept that cannot be perceived with physical senses, making it an Abstract Noun.",
    explanationBn: "'Integrity' (সততা/নিষ্ঠা) হলো একটি গুণ বা ধারণার নাম, তাই এটি Abstract Noun।",
    hint: "An intangible quality or state.",
    level: "basic"
  },
  {
    id: 5,
    question: "In the sentence 'Debangshu gave Tuhina a comprehensive grammar handbook', what is the role of 'Tuhina'?",
    options: ["Subject", "Direct Object", "Indirect Object", "Subject Complement"],
    correctAnswer: 2,
    answer: "Indirect Object",
    explanation: "'Tuhina' is the recipient of the direct object ('a comprehensive grammar handbook'), answering 'To whom did Debangshu give it?'.",
    explanationBn: "'Tuhina' এখানে 'gave' Verb-এর পরোক্ষ কর্ম (Indirect Object), কারণ সে বইটি গ্রহণ করেছে।",
    hint: "She receives the direct object.",
    level: "intermediate"
  },
  {
    id: 6,
    question: "Which of the following is a Relative Pronoun introducing an adjective clause?",
    options: ["Whose", "Ouch", "Yesterday", "Between"],
    correctAnswer: 0,
    answer: "Whose",
    explanation: "'Whose' is a relative pronoun indicating possession and connecting a relative clause to its nominal antecedent.",
    explanationBn: "'Whose' হলো Relative Pronoun যা পূর্ববর্তী Noun-এর সাথে সম্পর্ক স্থাপন করে।",
    hint: "Used to show possession in relative clauses.",
    level: "basic"
  },
  {
    id: 7,
    question: "What differentiates a Transitive Verb from an Intransitive Verb?",
    options: [
      "Transitive verbs require a direct object to complete their meaning; intransitive verbs do not",
      "Intransitive verbs are only used in the past tense",
      "Transitive verbs have no subject",
      "Intransitive verbs always take two objects"
    ],
    correctAnswer: 0,
    answer: "Transitive verbs require a direct object to complete their meaning; intransitive verbs do not",
    explanation: "A transitive verb transfers action to an object (e.g., 'She wrote a letter'), while an intransitive verb does not require an object (e.g., 'The baby slept').",
    explanationBn: "সকর্মক ক্রিয়া (Transitive Verb)-এর কর্ম (Direct Object) থাকে, কিন্তু অকর্মক ক্রিয়া (Intransitive Verb)-এর কোনো কর্মের প্রয়োজন হয় না।",
    hint: "Look for the presence or absence of a direct object.",
    level: "basic"
  },
  {
    id: 8,
    question: "In the sentence 'The soup tastes delicious', what kind of verb is 'tastes'?",
    options: ["Transitive Action Verb", "Linking (Copular) / Stative Verb", "Auxiliary Verb", "Modal Verb"],
    correctAnswer: 1,
    answer: "Linking (Copular) / Stative Verb",
    explanation: "'Tastes' connects the subject ('The soup') to its subject complement adjective ('delicious') rather than performing a physical action.",
    explanationBn: "'tastes' এখানে কোনো শারীরিক কাজ নয়, বরং Subject-এর অবস্থা প্রকাশ করে Linking Verb হিসেবে বসেছে।",
    hint: "It connects the subject to an adjective complement.",
    level: "intermediate"
  },
  {
    id: 9,
    question: "Which sentence demonstrates a Stative Verb incorrectly used in the continuous aspect (a frequent Bengali learner trap)?",
    options: [
      "I am understanding the concept clearly now.",
      "I understand the concept clearly now.",
      "He understands the rules.",
      "They understood the situation."
    ],
    correctAnswer: 0,
    answer: "I am understanding the concept clearly now.",
    explanation: "'Understand' is a stative verb of cognition and resists the continuous aspect in standard English. The correct form is 'I understand'.",
    explanationBn: "বাংলায় 'আমি বুঝতে পারছি' দেখে অনেকেই *'I am understanding' বলে, যা ভুল। Stative Verb হিসেবে সর্বদা 'I understand' বলতে হয়।",
    hint: "Stative verbs of cognition do not take -ing in standard English.",
    level: "intermediate"
  },
  {
    id: 10,
    question: "Identify the Reflexive Pronoun in the following sentence: 'Abhronila prepared the entire presentation herself.'",
    options: ["presentation", "entire", "herself", "prepared"],
    correctAnswer: 2,
    answer: "herself",
    explanation: "'Herself' refers back to the female subject 'Abhronila' for emphasis or reflection.",
    explanationBn: "'herself' হলো Reflexive/Emphatic Pronoun যা কর্তা 'Abhronila'-কে নির্দেশ করছে।",
    hint: "It ends in '-self'.",
    level: "basic"
  },
  {
    id: 11,
    question: "Which of the following nouns is an Uncountable (Mass) Noun in standard English?",
    options: ["Information", "Suggestion", "Book", "Computer"],
    correctAnswer: 0,
    answer: "Information",
    explanation: "'Information' is an uncountable noun in English; it cannot take plural '-s' (*informations) nor the indefinite article 'an'.",
    explanationBn: "'Information' হলো Uncountable Noun; এর সাথে 's' যোগ করা বা এর আগে 'an' বসানো ভুল (বলতে হয় 'a piece of information')।",
    hint: "Cannot be made plural with an '-s'.",
    level: "intermediate"
  },
  {
    id: 12,
    question: "What is the function of the Pronoun in 'Neither of the two solutions is viable'?",
    options: ["Distributive Pronoun (Subject)", "Demonstrative Pronoun", "Personal Pronoun", "Relative Pronoun"],
    correctAnswer: 0,
    answer: "Distributive Pronoun (Subject)",
    explanation: "'Neither' is a Distributive Pronoun referring to choices individually and taking a singular verb ('is').",
    explanationBn: "'Neither' হলো Distributive Pronoun যা দুইয়ের কোনটিই নয় বুঝিয়ে Singular Verb 'is' গ্রহণ করে।",
    hint: "Refers to members of a pair one at a time.",
    level: "intermediate"
  },
  {
    id: 13,
    question: "In the sentence 'Swimming is an excellent cardiovascular exercise', what is 'Swimming'?",
    options: ["Present Continuous Verb", "Gerund (Verbal Noun as Subject)", "Present Participle Adjective", "Infinitive"],
    correctAnswer: 1,
    answer: "Gerund (Verbal Noun as Subject)",
    explanation: "'Swimming' is a V1+-ing word functioning as a nominal Subject of the sentence. Hence, it is a Gerund.",
    explanationBn: "'Swimming' শব্দটি Verb-এর সাথে '-ing' যুক্ত হয়ে বাক্যের Subject হিসেবে Noun-এর মতো কাজ করায় এটি একটি Gerund (ক্রিয়াবাচক বিশেষ্য)।",
    hint: "An -ing word acting as the subject of the verb.",
    level: "intermediate"
  },
  {
    id: 14,
    question: "Which of the following is a Ditransitive Verb (a verb capable of taking two objects)?",
    options: ["Arrive", "Give", "Sleep", "Laugh"],
    correctAnswer: 1,
    answer: "Give",
    explanation: "'Give' routinely takes both an Indirect Object and a Direct Object (e.g., 'He gave me a book').",
    explanationBn: "'Give' হলো Ditransitive Verb কারণ এটি দুটি কর্ম গ্রহণ করতে পারে (কাকে দিল + কী দিল)।",
    hint: "Takes both 'whom' and 'what'.",
    level: "basic"
  },
  {
    id: 15,
    question: "In the sentence 'Sukanta Sir appointed Swadeep team leader', what is 'team leader'?",
    options: ["Direct Object", "Indirect Object", "Object Complement", "Subject Complement"],
    correctAnswer: 2,
    answer: "Object Complement",
    explanation: "'Team leader' renames and completes the status of the direct object 'Swadeep' after the complex-transitive verb 'appointed'.",
    explanationBn: "'team leader' পদটি Direct Object 'Swadeep'-এর পদমর্যাদা প্রকাশ করায় এটি Object Complement।",
    hint: "It completes the identity of the object 'Swadeep'.",
    level: "advanced"
  },
  {
    id: 16,
    question: "Which pronoun should replace the blank to maintain grammatical case harmony: 'Between you and ____, this strategy is flawless'?",
    options: ["I", "me", "myself", "he"],
    correctAnswer: 1,
    answer: "me",
    explanation: "'Between' is a preposition, and prepositions strictly govern the Objective Case ('you and me', never 'you and I').",
    explanationBn: "'Between' হলো Preposition, তাই এর পরে Objective Case 'me' বসবে ('Between you and me', কখনো 'you and I' নয়)।",
    hint: "Prepositions require objective case pronouns.",
    level: "advanced"
  },
  {
    id: 17,
    question: "What are the 5 Principal Forms of the irregular verb 'WRITE'?",
    options: [
      "V1: write, V2: wrote, V3: written, V4: writing, V5: writes",
      "V1: write, V2: writed, V3: writed, V4: writing, V5: write",
      "V1: wrote, V2: write, V3: writing, V4: written, V5: writes",
      "V1: writes, V2: wrote, V3: written, V4: write, V5: writing"
    ],
    correctAnswer: 0,
    answer: "V1: write, V2: wrote, V3: written, V4: writing, V5: writes",
    explanation: "Standard 5-form paradigm: V1 (Base), V2 (Past), V3 (Past Participle), V4 (Present Participle), V5 (3rd Person Singular).",
    explanationBn: "ক্রিয়ার ৫টি প্রধান রূপ: V1 (write), V2 (wrote), V3 (written), V4 (writing), V5 (writes)।",
    hint: "Look for base, past, past participle, -ing, and -s forms in order.",
    level: "basic"
  },
  {
    id: 18,
    question: "Which of the following is a Collective Noun that takes a singular verb when viewed as a unified body?",
    options: ["Committee", "Laptops", "Ideas", "Rivers"],
    correctAnswer: 0,
    answer: "Committee",
    explanation: "'Committee' is a collective noun denoting a single organized group acting in unison.",
    explanationBn: "'Committee' হলো Collective Noun, যা সমগ্র সংস্থাকে একসাথে বুঝালে Singular Verb গ্রহণ করে।",
    hint: "A noun denoting a group of individuals.",
    level: "basic"
  },
  {
    id: 19,
    question: "In the sentence 'The jury were divided in their opinions', why does 'jury' take the plural verb 'were'?",
    options: [
      "Because jury is always plural",
      "Because the members of the collective noun are acting as separate individuals with conflicting opinions (Noun of Multitude)",
      "It is a printing error",
      "Because opinions is plural"
    ],
    correctAnswer: 1,
    answer: "Because the members of the collective noun are acting as separate individuals with conflicting opinions (Noun of Multitude)",
    explanation: "When members of a collective noun act separately or in conflict, it behaves as a Noun of Multitude and takes a plural verb and pronoun.",
    explanationBn: "Collective Noun-এর সদস্যরা যখন ভিন্ন ভিন্ন মত পোষণ করে আলাদা ব্যক্তি হিসেবে প্রতীয়মান হয়, তখন Plural Verb (were) ও Pronoun (their) ব্যবহৃত হয়।",
    hint: "The members are divided in disagreement.",
    level: "advanced"
  },
  {
    id: 20,
    question: "Identify the Indefinite Pronoun in: 'Somebody has left their umbrella in the seminar room.'",
    options: ["their", "umbrella", "Somebody", "room"],
    correctAnswer: 2,
    answer: "Somebody",
    explanation: "'Somebody' refers to an unspecified, non-particular person, functioning as an Indefinite Pronoun.",
    explanationBn: "'Somebody' হলো Indefinite Pronoun যা কোনো অনির্দিষ্ট ব্যক্তিকে বোঝায়।",
    hint: "Refers to an unstated person.",
    level: "basic"
  },
  {
    id: 21,
    question: "What is an Ergative Verb in English syntax?",
    options: [
      "A verb that can be used either transitively or intransitively where the intransitive subject corresponds to the transitive object (e.g. 'The bell rang' vs 'He rang the bell')",
      "A verb that never takes a subject",
      "A verb that only appears in negative sentences",
      "A verb that only exists in poetry"
    ],
    correctAnswer: 0,
    answer: "A verb that can be used either transitively or intransitively where the intransitive subject corresponds to the transitive object (e.g. 'The bell rang' vs 'He rang the bell')",
    explanation: "Ergative verbs (open, break, melt, ring) allow the semantic patient to serve as subject intransitively ('The door opened') or object transitively ('Swadeep opened the door').",
    explanationBn: "Ergative Verb হলো এমন ক্রিয়া যা সকর্মক ও অকর্মক উভয়ভাবেই ব্যবহৃত হয় এবং অকর্মক রূপের Subject সকর্মক রূপের Object-এর সমান হয় (যেমন: 'The door opened' এবং 'He opened the door')।",
    hint: "Think of verbs like 'open', 'melt', 'ring'.",
    level: "advanced"
  },
  {
    id: 22,
    question: "Which of the following is a Demonstrative Pronoun?",
    options: ["Those", "Quickly", "Because", "Through"],
    correctAnswer: 0,
    answer: "Those",
    explanation: "'Those' points out specific distant plural entities standing independently without an immediately following noun.",
    explanationBn: "'Those' যখন কোনো Noun ছাড়াই একা বসে দূরের বস্তুগুলোকে নির্দেশ করে, তখন তা Demonstrative Pronoun।",
    hint: "Points out specific items.",
    level: "basic"
  },
  {
    id: 23,
    question: "In the sentence 'It is I who am responsible for this project', why is 'am' used instead of 'is'?",
    options: [
      "Because 'It' is first person",
      "Because the relative pronoun 'who' agrees in person and number with its antecedent 'I', requiring 'am'",
      "It is a colloquialism",
      "Because 'project' is singular"
    ],
    correctAnswer: 1,
    answer: "Because the relative pronoun 'who' agrees in person and number with its antecedent 'I', requiring 'am'",
    explanation: "The verb in a relative clause must agree with the antecedent of the relative pronoun ('I' -> 'am').",
    explanationBn: "Relative Pronoun 'who'-এর পূর্ববর্তী পদ (Antecedent) হলো 'I', তাই Concord-এর নিয়মানুযায়ী 'I'-এর সাথে 'am' বসবে।",
    hint: "Look at the antecedent pronoun before 'who'.",
    level: "advanced"
  },
  {
    id: 24,
    question: "Which sentence correctly pairs a singular Indefinite Pronoun with a singular verb?",
    options: [
      "Everyone have completed the test.",
      "Everyone has completed the test.",
      "Each of the students are present.",
      "Neither of the answers were correct."
    ],
    correctAnswer: 1,
    answer: "Everyone has completed the test.",
    explanation: "'Everyone' is grammatically singular and requires the singular verb 'has'.",
    explanationBn: "'Everyone' ব্যাকরণগতভাবে Singular Indefinite Pronoun, তাই এর সাথে Singular Verb 'has' বসবে।",
    hint: "'Everyone' is grammatically singular.",
    level: "intermediate"
  },
  {
    id: 25,
    question: "What is the key takeaway regarding Nouns, Pronouns, and Verbs according to Mentor Sukanta Hui?",
    options: [
      "Nouns and Pronouns are the nominal actors of the sentence, while Verbs supply the temporal energy and predication",
      "Verbs are optional if pronouns are present",
      "Nouns cannot take adjectives",
      "Pronouns only appear in questions"
    ],
    correctAnswer: 0,
    answer: "Nouns and Pronouns are the nominal actors of the sentence, while Verbs supply the temporal energy and predication",
    explanation: "Nouns and Pronouns build the structural entities (arguments) of thought, while Verbs provide the temporal action, relations, and truth-value.",
    explanationBn: "Noun ও Pronoun বাক্যের পাত্র-পাত্রী বা কর্তা-কর্ম গড়ে তোলে, আর Verb তাতে কাল ও গতির সঞ্চার করে বাক্যের প্রাণ প্রতিষ্ঠা করে।",
    hint: "They form the core triad of English clause architecture.",
    level: "basic"
  }
];

export default questions;
