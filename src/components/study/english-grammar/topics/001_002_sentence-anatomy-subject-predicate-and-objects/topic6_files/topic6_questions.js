// topic6_questions.js
// Module 001_002: Sentence Anatomy
// Topic 6: Subject Complements (Predicate Nouns & Predicate Adjectives) with Linking Verbs
// 25 Comprehensive Diagnostic Questions with Dual English & Bengali Pedagogical Explanations

const questions = [
  {
    id: 1,
    question: "What is a Subject Complement in English syntax?",
    options: [
      "A noun, pronoun, or adjective that follows a linking (copular) verb and renames, classifies, or describes the subject",
      "The direct object of a transitive action verb",
      "An adverb modifying the predicate verb",
      "The first word of an interrogative sentence"
    ],
    correctAnswer: 0,
    answer: "A noun, pronoun, or adjective that follows a linking (copular) verb and renames, classifies, or describes the subject",
    explanation: "A Subject Complement completes the meaning of a linking verb by asserting an identity or quality directly to the grammatical subject (Subject = Complement).",
    explanationBn: "Subject Complement হলো এমন কোনো Noun বা Adjective যা Linking Verb-এর পরে বসে কর্তারই পরিচয় বা বৈশিষ্ট্য প্রকাশ করে (কর্তা = কমপ্লিমেন্ট)।",
    hint: "Follows a linking verb and refers back to the subject.",
    level: "basic"
  },
  {
    id: 2,
    question: "What is the difference between a Predicate Noun (Predicate Nominative) and a Predicate Adjective?",
    options: [
      "A Predicate Noun renames or classifies the subject (e.g., 'Swadeep is a scholar'); a Predicate Adjective describes a quality of the subject (e.g., 'Swadeep is brilliant')",
      "They are identical grammatical terms",
      "Predicate adjectives only follow action verbs",
      "Predicate nouns can only appear in questions"
    ],
    correctAnswer: 0,
    answer: "A Predicate Noun renames or classifies the subject (e.g., 'Swadeep is a scholar'); a Predicate Adjective describes a quality of the subject (e.g., 'Swadeep is brilliant')",
    explanation: "Predicate Nouns establish nominal equivalence / categorization; Predicate Adjectives ascribe qualitative descriptors to the subject across a linking verb.",
    explanationBn: "Predicate Noun কর্তার অন্য একটি নাম বা পদমর্যাদা প্রকাশ করে (যেমন: 'He is a teacher'), আর Predicate Adjective কর্তার গুণ প্রকাশ করে (যেমন: 'He is diligent')।",
    hint: "Renames (noun) vs describes (adjective).",
    level: "basic"
  },
  {
    id: 3,
    question: "Which of the following is a primary Linking (Copular) Verb?",
    options: ["Be (is, am, are, was, were, been)", "Kick", "Throw", "Write"],
    correctAnswer: 0,
    answer: "Be (is, am, are, was, were, been)",
    explanation: "The verb 'Be' is the quintessential copular linking verb connecting subjects to complements.",
    explanationBn: "'Be' (is, am, are, was, were) হলো ইংরেজি ভাষার প্রধান Linking Verb যা কর্তার সাথে কমপ্লিমেন্টকে যুক্ত করে।",
    hint: "The copula 'be'.",
    level: "basic"
  },
  {
    id: 4,
    question: "In the sentence 'The students remained silent during the lecture', what is 'silent'?",
    options: [
      "Predicate Adjective (Subject Complement after the linking verb 'remained')",
      "Adverb of Manner",
      "Direct Object",
      "Prepositional Phrase"
    ],
    correctAnswer: 0,
    answer: "Predicate Adjective (Subject Complement after the linking verb 'remained')",
    explanation: "'Remained' is a linking verb of continuing state. 'Silent' describes the state of 'The students' (Subject Complement Adjective). Note: *'remained silently'* is a common error.",
    explanationBn: "'remained' এখানে Linking Verb; 'silent' হলো Predicate Adjective যা 'students'-এর নীরব অবস্থা প্রকাশ করছে (*'remained silently' ভুল)।",
    hint: "Describes the state of the students after 'remained'.",
    level: "intermediate"
  },
  {
    id: 5,
    question: "Why is 'The food smells delicious' correct while *'The food smells deliciously'* is an error?",
    options: [
      "'Smell' is a sensory linking verb connecting the subject 'food' to its condition, requiring an ADJECTIVE subject complement ('delicious')",
      "Because deliciously does not exist in English",
      "Because food is uncountable",
      "It is an idiom"
    ],
    correctAnswer: 0,
    answer: "'Smell' is a sensory linking verb connecting the subject 'food' to its condition, requiring an ADJECTIVE subject complement ('delicious')",
    explanation: "Sensory verbs (smell, taste, sound, feel, look) act as linking verbs when expressing the quality of the subject, strictly requiring adjective complements.",
    explanationBn: "অনুভূতি প্রকাশক Verbs (smell, taste, sound, feel, look) যখন কর্তার গুণ প্রকাশ করে তখন তারা Linking Verb, তাই Adverb নয়, Adjective 'delicious' বসবে।",
    hint: "Sensory linking verbs require adjective complements.",
    level: "intermediate"
  },
  {
    id: 6,
    question: "When does a sensory verb like 'taste' act as an ACTION verb (taking an adverb/object) rather than a linking verb?",
    options: [
      "When the subject is an active agent intentionally performing the action (e.g., 'The chef tasted the soup cautiously')",
      "Never; taste is always a linking verb",
      "Only in the future tense",
      "Only in passive voice"
    ],
    correctAnswer: 0,
    answer: "When the subject is an active agent intentionally performing the action (e.g., 'The chef tasted the soup cautiously')",
    explanation: "Compare: 'The soup tastes delicious' (Linking + Adjective) vs 'The chef tasted the soup cautiously' (Transitive Action + Object + Adverb).",
    explanationBn: "তুলনা করুন: 'The soup tastes delicious' (Linking Verb + Adjective) বনাম 'The chef tasted the soup cautiously' (সক্রিয় কাজ + Object + Adverb)।",
    hint: "An intentional active agent performing the taste test.",
    level: "advanced"
  },
  {
    id: 7,
    question: "In the sentence 'Debangshu became a proficient full-stack developer', what is 'a proficient full-stack developer'?",
    options: [
      "Predicate Noun (Subject Complement after the linking verb 'became')",
      "Direct Object",
      "Indirect Object",
      "Object Complement"
    ],
    correctAnswer: 0,
    answer: "Predicate Noun (Subject Complement after the linking verb 'became')",
    explanation: "'Became' is a linking verb of change/transition. 'A proficient full-stack developer' renames and defines 'Debangshu'.",
    explanationBn: "'became' হলো Linking Verb; 'a proficient full-stack developer' হলো Predicate Noun যা 'Debangshu'-র নতুন পরিচয় প্রকাশ করছে।",
    hint: "Renames Debangshu across the verb 'became'.",
    level: "basic"
  },
  {
    id: 8,
    question: "In formal prescriptive grammar, what case must a personal pronoun take when functioning as a Subject Complement after 'Be' (e.g., 'It is _____')?",
    options: [
      "Subjective (Nominative) Case: 'It is I' / 'It was he'",
      "Objective Case: 'It is me'",
      "Possessive Case: 'It is mine'",
      "Reflexive Case: 'It is myself'"
    ],
    correctAnswer: 0,
    answer: "Subjective (Nominative) Case: 'It is I' / 'It was he'",
    explanation: "Because the copula 'Be' acts like an equals sign (It = Subject), the complement takes the Subjective Case in formal English ('It is I', 'It was she who called').",
    explanationBn: "বিশুদ্ধ ব্যাকরণ ও প্রতিযোগিতামূলক পরীক্ষায় 'Be' ক্রিয়ার পর Subjective Case বসাতে হয়: 'It is I' (কখনো 'It is me' নয়) এবং 'It was he'।",
    hint: "Formal grammar equates subject with subjective pronoun.",
    level: "advanced"
  },
  {
    id: 9,
    question: "Which of the following sentences correctly observes formal subjective case complementation?",
    options: [
      "It was she who solved the algorithm first.",
      "It was her who solved the algorithm first.",
      "It was herself who solved the algorithm first.",
      "It was hers who solved the algorithm first."
    ],
    correctAnswer: 0,
    answer: "It was she who solved the algorithm first.",
    explanation: "'She' is in the Subjective Case acting as the complement of 'was', agreeing with the relative clause subject.",
    explanationBn: "'was'-এর পর Subject Complement হিসেবে Subjective Case 'she' বসবে ('It was she who solved...')।",
    hint: "Subjective pronoun 'she' after 'was'.",
    level: "advanced"
  },
  {
    id: 10,
    question: "In the sentence 'Tuhina appeared anxious before the interview', what is 'anxious'?",
    options: [
      "Predicate Adjective (Subject Complement)",
      "Adverb of Manner",
      "Direct Object",
      "Prepositional Phrase"
    ],
    correctAnswer: 0,
    answer: "Predicate Adjective (Subject Complement)",
    explanation: "'Appeared' functions as a linking verb of perception (seemed). 'Anxious' describes Tuhina's emotional condition.",
    explanationBn: "'appeared' (মনে হওয়া) হলো Linking Verb; 'anxious' হলো Predicate Adjective যা Tuhina-র মানসিক অবস্থা প্রকাশ করছে।",
    hint: "Describes Tuhina's condition after 'appeared'.",
    level: "basic"
  },
  {
    id: 11,
    question: "Which test can be applied to verify whether a verb is acting as a Linking Verb in a sentence?",
    options: [
      "Substitute the verb with a form of 'BE' (is/are/was); if the sentence still makes logical descriptive sense, the verb is a Linking Verb",
      "Count the letters in the verb",
      "Check if the verb ends in '-ing'",
      "Delete the subject"
    ],
    correctAnswer: 0,
    answer: "Substitute the verb with a form of 'BE' (is/are/was); if the sentence still makes logical descriptive sense, the verb is a Linking Verb",
    explanation: "Substitution Test: 'The rose smells sweet' -> 'The rose IS sweet' (Makes sense -> Linking!). 'He smelled the rose' -> *'He IS the rose'* (Nonsense -> Action verb!).",
    explanationBn: "সুকান্ত স্যারের Be-verb পরীক্ষা: ক্রিয়াটির জায়গায় 'is/are/was' বসিয়ে দেখুন; যদি অর্থ ঠিক থাকে তবে তা Linking Verb (যেমন: 'The soup tastes good' -> 'The soup IS good')।",
    hint: "The 'BE' substitution test.",
    level: "intermediate"
  },
  {
    id: 12,
    question: "In the sentence 'The leaves turned red in autumn', what is 'red'?",
    options: [
      "Predicate Adjective (Subject Complement after the linking verb 'turned')",
      "Direct Object",
      "Adverb of Color",
      "Noun Adjunct"
    ],
    correctAnswer: 0,
    answer: "Predicate Adjective (Subject Complement after the linking verb 'turned')",
    explanation: "'Turned' here means became (linking verb of change). 'Red' describes the new state of 'The leaves'.",
    explanationBn: "'turned' এখানে রং বদলানো/হওয়া অর্থে Linking Verb; 'red' হলো Predicate Adjective।",
    hint: "'Turned' means 'became' + adjective complement.",
    level: "intermediate"
  },
  {
    id: 13,
    question: "In 'Debangshu turned the steering wheel sharply', what is 'the steering wheel'?",
    options: [
      "Direct Object (turned is an action transitive verb here)",
      "Subject Complement",
      "Indirect Object",
      "Object Complement"
    ],
    correctAnswer: 0,
    answer: "Direct Object (turned is an action transitive verb here)",
    explanation: "Here 'turned' is a dynamic transitive action verb acting on 'the steering wheel' (Direct Object), modified by the adverb 'sharply'.",
    explanationBn: "এখানে 'turned' কোনো অবস্থা নয়, সরাসরি ঘোরানোর কাজ (Transitive Action); তাই 'the steering wheel' হলো Direct Object।",
    hint: "Action verb taking a direct object.",
    level: "intermediate"
  },
  {
    id: 14,
    question: "In the sentence 'The milk went sour', what is 'sour'?",
    options: ["Subject Complement (Predicate Adjective)", "Adverb of Manner", "Direct Object", "Prepositional Object"],
    correctAnswer: 0,
    answer: "Subject Complement (Predicate Adjective)",
    explanation: "'Went' functions as a linking verb of deterioration (became). 'Sour' is the adjective complement.",
    explanationBn: "'went' এখানে নষ্ট হওয়া অর্থে Linking Verb; 'sour' হলো Subject Complement Adjective।",
    hint: "'Went' means 'became' sour.",
    level: "intermediate"
  },
  {
    id: 15,
    question: "In 'Abhronila looked proud after receiving the gold medal', what is 'proud'?",
    options: [
      "Predicate Adjective (Subject Complement)",
      "Adverb of Manner",
      "Direct Object",
      "Participle"
    ],
    correctAnswer: 0,
    answer: "Predicate Adjective (Subject Complement)",
    explanation: "'Looked' is a copular verb of appearance. 'Proud' describes Abhronila's countenance.",
    explanationBn: "'looked' হলো Linking Verb; 'proud' হলো Predicate Adjective যা তার আত্মতৃপ্ত অবস্থা প্রকাশ করছে।",
    hint: "Describes how Abhronila appeared.",
    level: "basic"
  },
  {
    id: 16,
    question: "In 'Abhronila looked proudly at her gold medal', why is 'proudly' (adverb) used instead of 'proud'?",
    options: [
      "Because 'looked at' is an active transitive verb of physical gaze, modified by the Adverb of Manner 'proudly'",
      "Because gold medal is singular",
      "Because medal is metallic",
      "It is a stylistic mistake"
    ],
    correctAnswer: 0,
    answer: "Because 'looked at' is an active transitive verb of physical gaze, modified by the Adverb of Manner 'proudly'",
    explanation: "'Look at' is a dynamic physical action (gazing), answering 'How did she look at it?' -> 'proudly' (Adverb).",
    explanationBn: "'looked at' এখানে সক্রিয়ভাবে তাকানোর কাজ (Action Verb); তাই কাজটি কীভাবে করল তা বোঝাতে Adverb of Manner 'proudly' বসেছে।",
    hint: "Active gaze vs passive appearance.",
    level: "intermediate"
  },
  {
    id: 17,
    question: "In 'His dream came true after years of relentless perseverance', what is 'true'?",
    options: ["Predicate Adjective (Subject Complement after 'came')", "Adverb of Manner", "Direct Object", "Noun"],
    correctAnswer: 0,
    answer: "Predicate Adjective (Subject Complement after 'came')",
    explanation: "'Came' functions copularly (became reality). 'True' is the adjective complement.",
    explanationBn: "'came' এখানে বাস্তবে রূপ নেওয়া অর্থে Linking Verb; 'true' হলো Predicate Adjective।",
    hint: "Describes the realization of the dream.",
    level: "intermediate"
  },
  {
    id: 18,
    question: "Which of the following sentences exhibits the SVC (Subject + Linking Verb + Complement) pattern?",
    options: [
      "The masterclass was immensely inspiring.",
      "The mentor delivered an inspiring lecture.",
      "The students coded all night.",
      "Swadeep gave Debangshu the solution."
    ],
    correctAnswer: 0,
    answer: "The masterclass was immensely inspiring.",
    explanation: "Subject ('The masterclass') + Linking Verb ('was') + Adjective Complement ('immensely inspiring').",
    explanationBn: "Subject ('The masterclass') + Verb ('was') + Complement ('inspiring') — এটি SVC প্যাটার্ন।",
    hint: "Subject + Be-verb + Adjective Complement.",
    level: "basic"
  },
  {
    id: 19,
    question: "In 'He proved a loyal friend throughout the ordeal', what is 'a loyal friend'?",
    options: ["Predicate Noun (Subject Complement after linking 'proved')", "Direct Object", "Indirect Object", "Object Complement"],
    correctAnswer: 0,
    answer: "Predicate Noun (Subject Complement after linking 'proved')",
    explanation: "'Proved' means 'turned out to be' (linking). 'A loyal friend' renames 'He'.",
    explanationBn: "'proved' (প্রমাণিত হওয়া/দেখা যাওয়া) Linking Verb হিসেবে কাজ করায় 'a loyal friend' হলো Subject Complement Noun।",
    hint: "'Proved' means 'turned out to be'.",
    level: "intermediate"
  },
  {
    id: 20,
    question: "In the sentence 'The weather stayed pleasant throughout our trip to Barrackpore', what is 'pleasant'?",
    options: ["Predicate Adjective", "Adverb of Manner", "Direct Object", "Prepositional Object"],
    correctAnswer: 0,
    answer: "Predicate Adjective",
    explanation: "'Stayed' is a linking verb of continuation (remained). 'Pleasant' is the adjective complement.",
    explanationBn: "'stayed' (অব্যাহত থাকা) Linking Verb; 'pleasant' হলো Predicate Adjective।",
    hint: "Describes the continuing weather state.",
    level: "basic"
  },
  {
    id: 21,
    question: "Why is *'I feel nicely today'* incorrect in standard English?",
    options: [
      "'Feel' in reference to physical/mental health is a Linking Verb requiring the ADJECTIVE 'fine' or 'well' (good/healthy), not the adverb 'nicely'",
      "Because nicely is not a word",
      "Because today is an adverb",
      "It is acceptable in poetry"
    ],
    correctAnswer: 0,
    answer: "'Feel' in reference to physical/mental health is a Linking Verb requiring the ADJECTIVE 'fine' or 'well' (good/healthy), not the adverb 'nicely'",
    explanation: "Internal physical/emotional sensation uses adjective complements: 'I feel fine / well / good'.",
    explanationBn: "শারীরিক বা মানসিক অনুভূতি প্রকাশে 'feel' Linking Verb, তাই *'feel nicely' ভুল; বলতে হবে 'I feel well/good'।",
    hint: "Internal sensation takes adjective complements.",
    level: "intermediate"
  },
  {
    id: 22,
    question: "In 'The music sounded divine in the historic auditorium', what is 'divine'?",
    options: ["Predicate Adjective (Subject Complement)", "Adverb of Degree", "Direct Object", "Noun"],
    correctAnswer: 0,
    answer: "Predicate Adjective (Subject Complement)",
    explanation: "'Sounded' is an auditory linking verb. 'Divine' describes 'The music'.",
    explanationBn: "'sounded' হলো Auditory Linking Verb; 'divine' হলো Predicate Adjective।",
    hint: "Describes the acoustic quality of the music.",
    level: "basic"
  },
  {
    id: 23,
    question: "In 'That explanation seems plausible', what is 'plausible'?",
    options: ["Predicate Adjective (Subject Complement)", "Adverb of Manner", "Direct Object", "Preposition"],
    correctAnswer: 0,
    answer: "Predicate Adjective (Subject Complement)",
    explanation: "'Seems' is a verb of cognition/appearance. 'Plausible' describes the subject 'That explanation'.",
    explanationBn: "'seems' হলো Linking Verb; 'plausible' হলো Predicate Adjective।",
    hint: "Describes the explanation.",
    level: "basic"
  },
  {
    id: 24,
    question: "What is the primary difference between an SVO sentence and an SVC sentence?",
    options: [
      "In SVO, the Object is a separate entity receiving action; in SVC, the Complement refers to the Subject itself across a linking verb",
      "SVO has no verb",
      "SVC has two verbs",
      "They are identical"
    ],
    correctAnswer: 0,
    answer: "In SVO, the Object is a separate entity receiving action; in SVC, the Complement refers to the Subject itself across a linking verb",
    explanation: "SVO = Action on receiver (Subject != Object). SVC = Identity or quality attributed to subject (Subject == Complement).",
    explanationBn: "SVO-তে কর্ম হলো কর্তা থেকে ভিন্ন সত্তা (Subject != Object); কিন্তু SVC-তে কমপ্লিমেন্ট হলো কর্তারই অন্য রূপ বা গুণ (Subject == Complement)।",
    hint: "Subject != Object (SVO) versus Subject == Complement (SVC).",
    level: "basic"
  },
  {
    id: 25,
    question: "What is the key takeaway for Subject Complements according to Mentor Sukanta Hui?",
    options: [
      "Linking verbs act as mathematical equals signs (=); whatever follows them must be an Adjective (describing the subject) or a Noun (renaming the subject) — never an Adverb of manner.",
      "Complements can only be adverbs",
      "Linking verbs always require direct objects",
      "Complements must be written in italics"
    ],
    correctAnswer: 0,
    answer: "Linking verbs act as mathematical equals signs (=); whatever follows them must be an Adjective (describing the subject) or a Noun (renaming the subject) — never an Adverb of manner.",
    explanation: "Sukanta Sir's equation rule: Linking Verb = Equals Sign. Subject = Complement (Noun or Adjective only).",
    explanationBn: "সুকান্ত স্যারের গাণিতিক সূত্র: Linking Verb হলো সমান চিহ্ন (=)। এরপরে যা বসবে তা কর্তার সমকক্ষ Noun (পরিচয়) বা Adjective (গুণ) হবে—কখনো Adverb of Manner হবে না।",
    hint: "Linking verb = Equals sign (=).",
    level: "basic"
  }
];

export default questions;
