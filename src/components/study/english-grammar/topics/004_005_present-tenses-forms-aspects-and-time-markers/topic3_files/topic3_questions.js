const questions = [
  {
    id: 1,
    question: "Identify the sentence where the Present Continuous expresses emotional annoyance / irritation:",
    options: [
      "She is working on her dissertation in the quiet library.",
      "He is always interrupting others when they are presenting their arguments!",
      "The students are conducting chemistry experiments this semester.",
      "We are flying to Bengaluru next Thursday morning."
    ],
    correctAnswer: 1,
    explanation: "'Is always interrupting' with exclamation expresses speaker exasperation and annoyance at an unwelcome repeated habit.",
    explanationBn: "'Is always interrupting' গঠনটি ক্ষোভ বা বিরক্তি (Emotional Annoyance) প্রকাশ করে।"
  },
  {
    id: 2,
    question: "Fill in the blank with the appropriate verb form: 'Listen! Someone ______ frantically at the main entrance door.'",
    options: [
      "knocks",
      "is knocking",
      "has knocked",
      "was knocking"
    ],
    correctAnswer: 1,
    explanation: "'Listen!' is an imperative exclamation signaling an action happening at the exact moment of speaking, requiring Present Continuous ('is knocking').",
    explanationBn: "'Listen!' নির্দেশ করে ঘটনাটি ঠিক এই মুহূর্তে ঘটছে, তাই 'is knocking' হবে।"
  },
  {
    id: 3,
    question: "Select the sentence expressing a temporary situation in progress around now:",
    options: [
      "The sun rises in the east.",
      "I am living with my uncle in Barrackpore until my hostel room is renovated.",
      "Water consists of hydrogen and oxygen.",
      "The train arrives at 10 AM daily."
    ],
    correctAnswer: 1,
    explanation: "'I am living with my uncle... until...' indicates a temporary, non-permanent living arrangement in progress around the present time.",
    explanationBn: "সাময়িক বসবাস বা অস্থায়ী ব্যবস্থা প্রকাশে Present Continuous ব্যবহৃত হয়।"
  },
  {
    id: 4,
    question: "Choose the correct spelling when adding '-ing' to the verb 'begin':",
    options: [
      "begining",
      "beginning",
      "beginneing",
      "beging"
    ],
    correctAnswer: 1,
    explanation: "Two-syllable verb ending in CVC with stress on the second syllable (be'gin) doubles the final consonant: 'beginning'.",
    explanationBn: "দ্বিতীয় Syllable-এ জোর (stress) থাকায় 'begin'-এর ক্ষেত্রে 'n' দ্বিগুণ হয়ে 'beginning' হয়।"
  },
  {
    id: 5,
    question: "Which of the following sentences correctly expresses a planned personal future arrangement?",
    options: [
      "I am meeting the dean of admissions tomorrow afternoon at 3:00 PM.",
      "I meet the dean of admissions tomorrow afternoon at 3:00 PM.",
      "I have met the dean of admissions tomorrow.",
      "I was meeting the dean of admissions tomorrow."
    ],
    correctAnswer: 0,
    explanation: "Present Continuous ('am meeting') is the standard way to express confirmed personal future appointments with a designated time.",
    explanationBn: "আগাম নির্ধারিত ব্যক্তিগত ভবিষ্যৎ সাক্ষাতের ক্ষেত্রে Present Continuous ('am meeting') ব্যবহৃত হয়।"
  },
  {
    id: 6,
    question: "Identify the sentence illustrating a developing trend / changing situation:",
    options: [
      "The Earth revolves around the sun.",
      "The cost of living is rising steadily across metropolitan cities.",
      "He drinks a cup of black coffee every morning.",
      "The library opens at 9:00 AM."
    ],
    correctAnswer: 1,
    explanation: "'Is rising steadily' describes a continuous macro trend and ongoing evolution.",
    explanationBn: "ক্রমবর্ধমান পরিবর্তন বা সামাজিক প্রবণতা বোঝাতে 'is rising' ব্যবহৃত হয়।"
  },
  {
    id: 7,
    question: "Fill in the blank: 'Why ______ your car keys? You really need to be more organized!'",
    options: [
      "do you always lose",
      "are you always losing",
      "have you always lost",
      "did you always lose"
    ],
    correctAnswer: 1,
    explanation: "'Are you always losing' conveys irritation and exasperation toward a careless repeated habit.",
    explanationBn: "বারবার ভুলে যাওয়ার বিরক্তিকর অভ্যাস প্রকাশে 'are you always losing' প্রযোজ্য।"
  },
  {
    id: 8,
    question: "Correct the spelling error: Which of the following '-ing' forms is incorrect?",
    options: [
      "lying (from lie)",
      "dying (from die)",
      "tying (from tie)",
      "lieing (from lie)"
    ],
    correctAnswer: 3,
    explanation: "Verbs ending in '-ie' change '-ie' to '-y' before adding '-ing' (lie -> lying). 'Lieing' is misspelled.",
    explanationBn: "'-ie' যুক্ত verb-এর শেষে '-ing' যোগ করলে '-ie' পরিবর্তিত হয়ে '-y' হয় (lie -> lying)।"
  },
  {
    id: 9,
    question: "Spot the error: 'Look at those dark clouds! (A) The weather changes (B) rapidly this afternoon (C).'",
    options: [
      "Look at those dark clouds! (A)",
      "The weather changes (B)",
      "rapidly this afternoon (C)",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "The immediate visual evidence indicates an ongoing change occurring right now; use 'is changing rapidly'.",
    explanationBn: "এই মুহূর্তে আবহাওয়ার দ্রুত পরিবর্তন বোঝাতে 'is changing' প্রয়োজন।"
  },
  {
    id: 10,
    question: "Complete the sentence: 'Don't make any noise; the newborn baby ______ peacefully.'",
    options: [
      "sleeps",
      "is sleeping",
      "has slept",
      "was sleeping"
    ],
    correctAnswer: 1,
    explanation: "'Don't make noise' indicates the baby is currently asleep at the moment of speaking ('is sleeping').",
    explanationBn: "শিশুটির এই মুহূর্তে ঘুমানো বোঝাতে 'is sleeping' হবে।"
  },
  {
    id: 11,
    question: "What is the difference between: (A) 'He always criticizes my essays.' vs (B) 'He is always criticizing my essays!'?",
    options: [
      "(A) is past, (B) is future.",
      "(A) is a neutral statement of frequency; (B) expresses speaker annoyance and emotional irritation.",
      "(A) is grammatically incorrect; (B) is correct.",
      "Both mean identical objective facts without any emotional nuance."
    ],
    correctAnswer: 1,
    explanation: "Simple Present + always is a neutral objective statement. Present Continuous + always carries strong subjective annoyance and exasperation.",
    explanationBn: "Simple Present নিরপেক্ষ তথ্য দেয়; কিন্তু Present Continuous + always বিরক্তি ও ক্ষোভ প্রকাশ করে।"
  },
  {
    id: 12,
    question: "Fill in the blank: 'Debopam ______ hard for his IELTS examination these days.'",
    options: [
      "is studying",
      "studies",
      "has studied",
      "studied"
    ],
    correctAnswer: 0,
    explanation: "'These days' signals a temporary ongoing activity in the present period, calling for Present Continuous ('is studying').",
    explanationBn: "'These days' সময়ের সাথে সাময়িক চলমান ক্রিয়ায় 'is studying' বসে।"
  },
  {
    id: 13,
    question: "Select the sentence where '-ing' form correctly dropped the silent '-e':",
    options: [
      "writeing",
      "writing",
      "writting",
      "writeying"
    ],
    correctAnswer: 1,
    explanation: "'Write' drops the silent '-e' to become 'writing'.",
    explanationBn: "Silent '-e' উঠে গিয়ে 'writing' হয়।"
  },
  {
    id: 14,
    question: "Choose the sentence with correct subject-verb harmony in Present Continuous:",
    options: [
      "Neither Swadeep nor his friends is attending the conference.",
      "Neither Swadeep nor his friends are attending the conference.",
      "Neither Swadeep nor his friends am attending the conference.",
      "Neither Swadeep nor his friends be attending the conference."
    ],
    correctAnswer: 1,
    explanation: "With 'neither... nor', the auxiliary agrees with the closer subject ('his friends' -> plural 'are attending').",
    explanationBn: "'Neither... nor'-এ শেষের Subject অনুযায়ী Plural Verb 'are attending' হবে।"
  },
  {
    id: 15,
    question: "Fill in the blank: 'Hush! The principal ______ the annual report to the assembly.'",
    options: [
      "delivers",
      "is delivering",
      "has delivered",
      "delivered"
    ],
    correctAnswer: 1,
    explanation: "'Hush!' calls for immediate silence because an action is in progress right now ('is delivering').",
    explanationBn: "'Hush!' এই মুহূর্তে চলমান ক্রিয়ার ইঙ্গিত দেয়, তাই 'is delivering' হবে।"
  },
  {
    id: 16,
    question: "Which of the following time adverbials is NOT compatible with Present Continuous for speech-moment actions?",
    options: [
      "Right now",
      "At this moment",
      "Currently",
      "Every single year without fail"
    ],
    correctAnswer: 3,
    explanation: "'Every single year without fail' denotes a permanent annual routine, requiring Simple Present.",
    explanationBn: "'Every single year without fail' চিরন্তন বার্ষিক অভ্যাস, তাই Simple Present প্রযোজ্য।"
  },
  {
    id: 17,
    question: "Identify the correct negative question form:",
    options: [
      "Isn't she preparing for the debate competition?",
      "Does she not preparing for the debate competition?",
      "Is she not prepare for the debate competition?",
      "Are she not preparing for the debate competition?"
    ],
    correctAnswer: 0,
    explanation: "Contraction 'Isn't she preparing...?' is standard and grammatically pristine.",
    explanationBn: "'Isn't she preparing...?' হলো সঠিক নেগেটিভ ইন্টারোগেটিভ রূপ।"
  },
  {
    id: 18,
    question: "Complete the sentence: 'Medical research ______ at an unprecedented pace due to machine learning integrations.'",
    options: [
      "is advancing",
      "advances",
      "has advanced",
      "advanced"
    ],
    correctAnswer: 0,
    explanation: "Ongoing scientific evolution and dynamic acceleration are expressed with Present Continuous ('is advancing').",
    explanationBn: "বিজ্ঞান ও প্রযুক্তির চলমান অগ্রগতি বোঝাতে 'is advancing' ব্যবহৃত হয়।"
  },
  {
    id: 19,
    question: "Why is 'The sun is rising in the east every day' ungrammatical in standard English?",
    options: [
      "Because 'the sun' is an uncountable noun.",
      "Because universal permanent cosmic laws require Simple Present, not Present Continuous.",
      "Because 'every day' requires Past Perfect.",
      "Because 'rise' is an irregular verb."
    ],
    correctAnswer: 1,
    explanation: "Permanent universal truths must be in the Simple Present ('The sun rises in the east').",
    explanationBn: "চিরন্তন মহাজাগতিক সত্যে Continuous ব্যবহার করা যায় না; Simple Present আবশ্যক।"
  },
  {
    id: 20,
    question: "Transform into Present Continuous to show irritation: 'He leaves the laboratory lights on.'",
    options: [
      "He is always leaving the laboratory lights on!",
      "He was always leaving the laboratory lights on.",
      "He has been leaving the laboratory lights on.",
      "He always is leaving the laboratory lights on."
    ],
    correctAnswer: 0,
    explanation: "'He is always leaving the laboratory lights on!' correctly uses is + always + V-ing to show exasperation.",
    explanationBn: "'He is always leaving...' সঠিক বিন্যাস।"
  },
  {
    id: 21,
    question: "Fill in the blank: 'We ______ our grandparents in North 24 Parganas this coming weekend.'",
    options: [
      "are visiting",
      "visit",
      "have visited",
      "visited"
    ],
    correctAnswer: 0,
    explanation: "Confirmed personal weekend arrangement requires Present Continuous ('are visiting').",
    explanationBn: "সপ্তাহান্তে পরিবারের সাথে দেখা করার নির্দিষ্ট পরিকল্পনায় 'are visiting' বসে।"
  },
  {
    id: 22,
    question: "Which of the following verbs doubles its final consonant before '-ing'?",
    options: [
      "Visit -> Visiting",
      "Happen -> Happening",
      "Prefer -> Preferring",
      "Open -> Opening"
    ],
    correctAnswer: 2,
    explanation: "In 'pre-FER', stress is on the second syllable ending in CVC, so 'r' is doubled to 'preferring'. In visit, happen, and open, the first syllable is stressed.",
    explanationBn: "'Prefer'-এ দ্বিতীয় সিলেবলে স্ট্রেস থাকায় 'preferring' হয়।"
  },
  {
    id: 23,
    question: "Identify the sentence where Present Continuous is MISUSED with a stative verb:",
    options: [
      "She is feeling much better after the medication.",
      "I am understanding your grammatical reasoning completely.",
      "They are having a lively debate in the hall.",
      "He is thinking of taking a course in computational linguistics."
    ],
    correctAnswer: 1,
    explanation: "'Understand' is purely stative (cognition) and cannot take continuous form (*I am understanding). It must be 'I understand'.",
    explanationBn: "'Understand' একটি Stative Verb, তাই 'am understanding' ভুল; 'I understand' হবে।"
  },
  {
    id: 24,
    question: "Fill in the blank: 'Why ______ so loudly? People are trying to concentrate in the reading room.'",
    options: [
      "do you speak",
      "are you speaking",
      "have you spoken",
      "were you speaking"
    ],
    correctAnswer: 1,
    explanation: "Action in progress right now causing immediate disturbance requires Present Continuous ('are you speaking').",
    explanationBn: "বর্তমান মুহূর্তে বিরক্তি সৃষ্টিকারী চলমান ক্রিয়ায় 'are you speaking' হবে।"
  },
  {
    id: 25,
    question: "Complete the sentence: 'Global sea levels ______ because polar ice sheets ______ at alarming rates.'",
    options: [
      "are rising; are melting",
      "rise; melt",
      "have risen; melted",
      "will rise; had melted"
    ],
    correctAnswer: 0,
    explanation: "Both clauses describe simultaneous ongoing climate trends and environmental processes in the present era ('are rising; are melting').",
    explanationBn: "উভয় ক্লজেই চলমান বৈশ্বিক পরিবর্তন বোঝাতে 'are rising; are melting' ব্যবহৃত হয়েছে।"
  }
];

export default questions;
