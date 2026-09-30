const questions = [
  {
    id: "q1",
    question: "Choose the correct verb form: 'The quality of these export-grade mangoes _______ exceptional.'",
    options: [
      "is",
      "are",
      "were",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "The true grammatical subject is the singular abstract noun 'The quality', NOT the plural prepositional object 'mangoes'. Intervening prepositional phrases do not affect concord: 'The quality ... is exceptional'.",
    explanationBn: "বাক্যের আসল Subject হলো Singular Noun 'The quality'; Preposition-এর পরের 'mangoes' নয়। তাই Singular Verb 'is' বসবে।"
  },
  {
    id: "q2",
    question: "Complete the sentence: 'The captain, along with his entire crew of sailors, _______ rescued from the sinking vessel.'",
    options: [
      "were",
      "was",
      "have been",
      "are"
    ],
    correctAnswer: 1,
    explanation: "When subjects are joined by parenthetical expressions like 'along with', 'together with', 'as well as', 'in addition to', the verb agrees with the FIRST subject ('The captain' -> singular 'was').",
    explanationBn: "'Along with', 'as well as', 'together with' থাকলে প্রথম Subject ('The captain') অনুসারে Verb নিয়ন্ত্রিত হয়, তাই Singular 'was' বসবে।"
  },
  {
    id: "q3",
    question: "Select the correct option according to the Rule of Proximity: 'Neither the teacher nor the students _______ present in the laboratory.'",
    options: [
      "was",
      "is",
      "were",
      "has been"
    ],
    correctAnswer: 2,
    explanation: "When subjects are joined by 'Neither... nor' or 'Either... or', the verb agrees with the NEAREST subject. 'Students' is plural, so the verb is plural 'were'.",
    explanationBn: "'Neither... nor' দ্বারা যুক্ত থাকলে Verb-এর নিকটবর্তী Subject ('the students') অনুসারে Verb বসে, তাই Plural 'were' হবে।"
  },
  {
    id: "q4",
    question: "Choose the correct verb: 'Either the students or the teacher _______ responsible for the equipment.'",
    options: [
      "is",
      "are",
      "were",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "By the Rule of Proximity, the verb agrees with the nearest subject 'the teacher' (singular), so the verb is 'is'.",
    explanationBn: "Rule of Proximity অনুসারে Verb-এর নিকটতম Subject হলো 'the teacher' (Singular), তাই 'is' বসবে।"
  },
  {
    id: "q5",
    question: "Fill in the blank: 'Bread and butter _______ his daily morning breakfast.'",
    options: [
      "is",
      "are",
      "were",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "When two singular nouns joined by 'and' express a single unified idea or compound concept (e.g. bread and butter, slow and steady, horse and carriage), the verb is SINGULAR ('is').",
    explanationBn: "'Bread and butter' এখানে একটি একক খাদ্যতালিকা বা সমন্বিত ধারণা প্রকাশ করায় Singular Verb 'is' বসবে।"
  },
  {
    id: "q6",
    question: "What is the difference between 'A number of students' and 'The number of students'?",
    options: [
      "'A number of' (= many) takes a PLURAL verb; 'The number of' (= specific figure) takes a SINGULAR verb.",
      "'A number of' takes a singular verb; 'The number of' takes a plural verb.",
      "Both always take singular verbs.",
      "Both always take plural verbs."
    ],
    correctAnswer: 0,
    explanation: "'A number of students ARE present' (indefinite quantity = many). 'The number of students IS fifty' (definite singular total).",
    explanationBn: "'A number of' অর্থ 'অনেক' তাই Plural Verb গ্রহণ করে; আর 'The number of' নির্দিষ্ট সংখ্যা বোঝায় তাই Singular Verb গ্রহণ করে।"
  },
  {
    id: "q7",
    question: "Complete: 'A number of applicants _______ submitted their credentials.'",
    options: [
      "has",
      "have",
      "is",
      "was"
    ],
    correctAnswer: 1,
    explanation: "'A number of' requires a plural verb -> 'have submitted'.",
    explanationBn: "'A number of'-এর পরে সর্বদা Plural Verb 'have' বসে।"
  },
  {
    id: "q8",
    question: "Complete: 'The number of applicants _______ remarkably high this year.'",
    options: [
      "is",
      "are",
      "were",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "'The number of' represents a single statistic/count and requires the singular verb 'is'.",
    explanationBn: "'The number of' একটি নির্দিষ্ট পরিসংখ্যানকে নির্দেশ করায় Singular Verb 'is' বসবে।"
  },
  {
    id: "q9",
    question: "Choose the correct verb for: 'Swadeep is one of the students who _______ selected for the scholarship.'",
    options: [
      "was",
      "were",
      "has been",
      "is"
    ],
    correctAnswer: 1,
    explanation: "In 'one of the + plural noun + relative pronoun (who/that)', the relative pronoun refers to the plural antecedent 'students', requiring a PLURAL verb ('were selected').",
    explanationBn: "'One of the students who...'-তে Relative Pronoun 'who'-র Antecedent হলো Plural Noun 'students', তাই Plural Verb 'were' বসবে।"
  },
  {
    id: "q10",
    question: "Now choose for: 'Swadeep is the ONLY ONE of the students who _______ selected for the scholarship.'",
    options: [
      "was",
      "were",
      "are",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "When 'the ONLY one of' precedes the relative clause, the focus shifts to the singular individual ('the only one'), demanding a SINGULAR verb ('was selected').",
    explanationBn: "'The ONLY one of...'-এ 'only one' মূল কর্তা হওয়ায় Singular Verb 'was' বসবে।"
  },
  {
    id: "q11",
    question: "Select the correct verb: 'Each boy and each girl _______ awarded a medal.'",
    options: [
      "were",
      "was",
      "are",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "When singular subjects joined by 'and' are preceded by 'each' or 'every', the verb is strictly SINGULAR ('was awarded').",
    explanationBn: "'Each' বা 'Every' দ্বারা যুক্ত Noun-এর পূর্বে Singular Verb 'was' বসে।"
  },
  {
    id: "q12",
    question: "Choose the correct concord: 'Ten kilometers _______ a long distance to walk on foot.'",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "When a plural unit of distance, time, money, or weight is considered as a SINGLE collective unit, it takes a SINGULAR verb ('Ten kilometers is').",
    explanationBn: "দূরত্ব, সময় বা টাকার মোট পরিমাণকে একক সমষ্টি হিসেবে বিবেচনা করলে Singular Verb 'is' বসে।"
  },
  {
    id: "q13",
    question: "Select the correct verb: 'Fifty thousand rupees _______ a generous donation.'",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "A sum of money regarded as a lump sum takes a singular verb: 'Fifty thousand rupees is...'.",
    explanationBn: "নির্দিষ্ট পরিমাণ টাকা এককালীন সমষ্টি হিসেবে Singular Verb 'is' গ্রহণ করে।"
  },
  {
    id: "q14",
    question: "Choose the correct verb for: 'Fifty thousand rupees _______ distributed among the ten flood victims.'",
    options: [
      "was",
      "were",
      "is",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "When the monetary sum is thought of as individual fractional disbursements to different people, it takes a PLURAL verb: 'were distributed'.",
    explanationBn: "টাকার অংশগুলো যখন পৃথকভাবে ভিন্ন ভিন্ন ব্যক্তিবর্গের মধ্যে বণ্টিত হয়, তখন Plural Verb 'were' বসে।"
  },
  {
    id: "q15",
    question: "Identify the correct verb: 'Mathematics _______ his favorite subject in school.'",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "Names of academic disciplines plural in form (Mathematics, Physics, Economics, Politics) take a SINGULAR verb when referring to the subject: 'Mathematics is...'.",
    explanationBn: "বিষয়ের নাম হিসেবে 'Mathematics', 'Physics' দেখতে Plural হলেও অর্থগতভাবে Singular, তাই 'is' বসবে।"
  },
  {
    id: "q16",
    question: "What happens when 'mathematics' or 'statistics' refers to calculations / practical data? 'His mathematics _______ remarkably flawed.'",
    options: [
      "is",
      "are",
      "was",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "When preceded by a possessive pronoun ('his/her') and referring to practical calculations, these nouns take a PLURAL verb: 'His mathematics ARE flawed'.",
    explanationBn: "গণনা বা প্রয়োগিক দক্ষতা বোঝাতে possessive-এর পর বসলে Plural Verb 'are' গ্রহণ করে।"
  },
  {
    id: "q17",
    question: "Choose the correct verb for a Collective Noun functioning as a single unified entity: 'The jury _______ reached a unanimous verdict.'",
    options: [
      "have",
      "has",
      "are",
      "were"
    ],
    correctAnswer: 1,
    explanation: "When a collective noun (jury, committee, team) acts unanimously as one body, it takes a SINGULAR verb ('has reached').",
    explanationBn: "Collective Noun যখন একমত হয়ে ঐক্যবদ্ধ কাজ করে, তখন Singular Verb 'has' বসে।"
  },
  {
    id: "q18",
    question: "Now choose for a divided collective noun: 'The jury _______ divided in their opinions.'",
    options: [
      "was",
      "were",
      "is",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "When the individual members of a collective noun have conflicting opinions, the noun acts as a Noun of Multitude and takes a PLURAL verb ('were divided in their opinions').",
    explanationBn: "Collective Noun-এর সদস্যরা যখন ভিন্ন ভিন্ন মতে বিভক্ত হয়, তখন Plural Verb 'were' বসে।"
  },
  {
    id: "q19",
    question: "Select the correct verb: 'Neither of the two candidates _______ found suitable for the post.'",
    options: [
      "was",
      "were",
      "are",
      "have been"
    ],
    correctAnswer: 0,
    explanation: "The distributive pronoun 'Neither' (meaning neither one) is strictly SINGULAR and takes 'was'.",
    explanationBn: "'Neither of...'-এর মূল কর্তা হলো Distributive Pronoun 'Neither' যা Singular, তাই 'was' বসবে।"
  },
  {
    id: "q20",
    question: "Which verb correctly completes: 'More than one student _______ passed the test.'",
    options: [
      "have",
      "has",
      "are",
      "were"
    ],
    correctAnswer: 1,
    explanation: "By syntactic convention, 'More than one + singular noun' takes a SINGULAR verb ('has passed'). (Compare with: 'More than two students have passed').",
    explanationBn: "'More than one + Singular Noun'-এর পর ব্যাকরণিক নিয়মে সর্বদা Singular Verb 'has' বসে।"
  },
  {
    id: "q21",
    question: "Choose the correct verb for SANAM pronoun 'All': 'All the milk in the jar _______ spoiled.'",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "With SANAM pronouns (Some, Any, None, All, More/Most), the verb agrees with the noun in the 'of' phrase. 'Milk' is uncountable singular -> 'is spoiled'.",
    explanationBn: "'All of'-এর পর Uncountable Noun 'milk' থাকায় Singular Verb 'is' বসবে।"
  },
  {
    id: "q22",
    question: "Now choose for SANAM pronoun 'All' with a countable plural: 'All the students _______ present.'",
    options: [
      "is",
      "was",
      "are",
      "has been"
    ],
    correctAnswer: 2,
    explanation: "'Students' is plural countable, so 'All' takes a PLURAL verb ('are present').",
    explanationBn: "'All of'-এর পর Plural Noun 'students' থাকায় Plural Verb 'are' বসবে।"
  },
  {
    id: "q23",
    question: "Select the correct verb: 'The police _______ investigating the robbery.'",
    options: [
      "is",
      "are",
      "was",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "'Police', 'cattle', 'people', 'gentry', 'poultry' are nouns plural in meaning and ALWAYS take a PLURAL verb: 'The police ARE investigating'.",
    explanationBn: "'Police', 'cattle' সর্বদা Plural Verb ('are') গ্রহণ করে।"
  },
  {
    id: "q24",
    question: "Choose the correct concord: 'A pair of scissors _______ kept in the drawer.'",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "While 'scissors' alone takes a plural verb, when preceded by 'a pair of', the subject is 'pair' (singular), demanding a SINGULAR verb: 'A pair of scissors IS kept'.",
    explanationBn: "'A pair of'-এর ক্ষেত্রে মূল কর্তা 'pair' (Singular) হওয়ায় 'is' বসবে।"
  },
  {
    id: "q25",
    question: "Choose the correct concord: 'There _______ a lot of people waiting outside.'",
    options: [
      "is",
      "are",
      "was",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "In inverted sentences introduced by dummy 'there', the verb agrees with the true postponed subject ('a lot of people' = plural -> 'There ARE').",
    explanationBn: "'There'-এর পর Verb বসে পরবর্তী আসল Subject ('people' = Plural) অনুসারে, তাই 'are' বসবে।"
  },
  {
    id: "q26",
    question: "Select the correct verb: 'No news _______ good news.'",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "'News' is an uncountable noun and always takes a singular verb: 'No news IS good news'.",
    explanationBn: "'News' Uncountable Noun হওয়ায় সর্বদা Singular Verb 'is' গ্রহণ করে।"
  },
  {
    id: "q27",
    question: "Choose the correct verb: 'The Prime Minister, with his cabinet ministers, _______ attending the summit.'",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "Phrases with 'with' are parenthetical. The verb agrees strictly with the first subject 'The Prime Minister' (singular 'is').",
    explanationBn: "'With' দ্বারা যুক্ত বাক্যে প্রথম Subject ('The Prime Minister') অনুসারে Singular Verb 'is' হবে।"
  },
  {
    id: "q28",
    question: "What is the concord rule for 'Not only ... but also'? 'Not only the teacher but also the students _______ thrilled.'",
    options: [
      "was",
      "is",
      "were",
      "has been"
    ],
    correctAnswer: 2,
    explanation: "Like 'Either... or', 'Not only... but also' follows the Rule of Proximity, agreeing with the nearest subject 'the students' (plural -> 'were').",
    explanationBn: "'Not only... but also' নিকটবর্তী Subject 'the students' অনুসারে Plural Verb 'were' গ্রহণ করে।"
  },
  {
    id: "q29",
    question: "Select the correct option: 'Two-thirds of the city _______ submerged in floodwater.'",
    options: [
      "were",
      "was",
      "are",
      "have been"
    ],
    correctAnswer: 1,
    explanation: "For fractions and percentages, the verb agrees with the noun that follows 'of'. 'The city' is singular, so the verb is singular 'was'.",
    explanationBn: "ভগ্নাংশের ক্ষেত্রে 'of'-এর পরের Noun 'city' (Singular) হওয়ায় Verb 'was' হবে।"
  },
  {
    id: "q30",
    question: "Now choose for: 'Two-thirds of the buildings _______ damaged in the earthquake.'",
    options: [
      "was",
      "were",
      "is",
      "has been"
    ],
    correctAnswer: 1,
    explanation: "The noun following 'of' is plural ('buildings'), so the verb is plural: 'were damaged'.",
    explanationBn: "'Of'-এর পরের Noun 'buildings' Plural হওয়ায় Plural Verb 'were' বসবে।"
  }
];

export default questions;
