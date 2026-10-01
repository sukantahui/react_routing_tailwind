const questions = [
  {
    id: 1,
    question: "A colleague knocks on Swadeep's office door looking for him. His assistant replies: 'He ______ to the laboratory to inspect the reagents.' Which verb form is correct?",
    options: [
      "has been",
      "has gone",
      "was been",
      "had been"
    ],
    correctAnswer: 1,
    explanation: "Because Swadeep is absent from his office and currently at the laboratory, 'has gone' correctly indicates he has not returned.",
    explanationBn: "স্বদীপ বর্তমানে অফিসে নেই এবং ল্যাবরেটরিতে আছে (অনুপস্থিত), তাই 'has gone' হবে।"
  },
  {
    id: 2,
    question: "Why is it logically and syntactically absurd to tell your friend in Kolkata: 'I have gone to London twice'?",
    options: [
      "Because 'London' requires the definite article 'the'.",
      "Because 'have gone' implies you are currently in London, which contradicts your physical presence in Kolkata.",
      "Because 'twice' cannot be used with Present Perfect.",
      "Because 'I' requires 'has gone'."
    ],
    correctAnswer: 1,
    explanation: "'Have gone' means you are currently at the destination. If you are standing in front of your friend in Kolkata, you must say 'I have been to London twice' (visited and returned).",
    explanationBn: "যেহেতু আপনি কলকাতায় উপস্থিত আছেন, লন্ডন ঘুরে আসার অভিজ্ঞতা বোঝাতে 'have been to' হবে, 'have gone' নয়।"
  },
  {
    id: 3,
    question: "Fill in the blank: 'Tuhina knows the roads of Darjeeling thoroughly because she ______ there multiple times.'",
    options: [
      "has gone",
      "has been",
      "is gone",
      "had gone"
    ],
    correctAnswer: 1,
    explanation: "'Has been there multiple times' indicates completed past visits and round-trips from which she has returned.",
    explanationBn: "একাধিকবার দার্জিলিং ভ্রমণ করে ফিরে আসার অভিজ্ঞতা বোঝাতে 'has been' ব্যবহৃত হয়।"
  },
  {
    id: 4,
    question: "Choose the correct question to ask someone about their travel experiences in life:",
    options: [
      "Have you ever gone to the Grand Canyon?",
      "Have you ever been to the Grand Canyon?",
      "Did you ever gone to the Grand Canyon?",
      "Were you ever gone to the Grand Canyon?"
    ],
    correctAnswer: 1,
    explanation: "Inquiring about life travel experience (visited and returned) universally requires 'Have you ever been to...?'",
    explanationBn: "ভ্রমণের অভিজ্ঞতা জানতে প্রমিত ইংরেজিতে 'Have you ever been to...?' ব্যবহৃত হয়।"
  },
  {
    id: 5,
    question: "What is the meaning of the sentence: 'Dr. Mukherjee has been in the United Kingdom for a decade'?",
    options: [
      "Dr. Mukherjee visited the UK 10 years ago and left immediately.",
      "Dr. Mukherjee is currently absent traveling on an airplane.",
      "Dr. Mukherjee has continuously resided/lived in the UK for the past ten years.",
      "Dr. Mukherjee was deported from the UK ten years ago."
    ],
    correctAnswer: 2,
    explanation: "'Has been IN [place] for [duration]' expresses continuous dwelling or residence in that location.",
    explanationBn: "'Has been IN UK for a decade' নির্দেশ করে তিনি গত ১০ বছর ধরে যুক্তরাজ্যে একটানা বসবাস করছেন।"
  },
  {
    id: 6,
    question: "Select the sentence where 'has gone to' is used correctly in context:",
    options: [
      "Welcome back, Abhronila! I heard you have gone to the Himalayas.",
      "Where is the accountant? — He has gone to the bank to deposit the cheques.",
      "I have gone to the cinema yesterday and watched a documentary.",
      "Have you ever gone to Japan in your life?"
    ],
    correctAnswer: 1,
    explanation: "The accountant is absent right now, having departed for the bank, making 'has gone to' contextually accurate.",
    explanationBn: "অ্যাকাউন্ট্যান্ট বর্তমানে অনুপস্থিত এবং ব্যাংকে আছেন, তাই 'has gone to' সঠিক।"
  },
  {
    id: 7,
    question: "Fill in the blank: 'The secretary isn't at her desk right now; she ______ to the archive room.'",
    options: [
      "has been",
      "has gone",
      "had been",
      "is been"
    ],
    correctAnswer: 1,
    explanation: "Her current absence from her desk indicates she has departed for the archive room ('has gone').",
    explanationBn: "ডেস্কে না থাকা বা অনুপস্থিতি বোঝাতে 'has gone' হবে।"
  },
  {
    id: 8,
    question: "Complete the dialogue: 'You have a wonderful suntan!' — 'Thanks! I ______ to Goa for a beach vacation and just got back yesterday.'",
    options: [
      "have gone",
      "have been",
      "was gone",
      "had gone"
    ],
    correctAnswer: 1,
    explanation: "The speaker is back home with a tan, describing a completed trip, so 'have been' is required.",
    explanationBn: "ছুটি কাটিয়ে বাড়ি ফিরে আসায় 'have been' প্রযোজ্য।"
  },
  {
    id: 9,
    question: "Spot the error: 'He is not (A) at home because (B) he has been to the market (C) to buy groceries.'",
    options: [
      "He is not (A)",
      "at home because (B)",
      "he has been to the market (C)",
      "No error"
    ],
    correctAnswer: 2,
    explanation: "Because he is currently not at home, he is still at the market; it should be 'he has gone to the market'.",
    explanationBn: "যেহেতু তিনি বাড়ি ফেরেননি, তাই 'has been' ভুল; 'has gone to the market' হবে।"
  },
  {
    id: 10,
    question: "Which of the following sentences conveys that the subject has NOT returned?",
    options: [
      "Debopam has been to Bengaluru twice this year.",
      "Debopam has gone to Bengaluru for an interview.",
      "Debopam was in Bengaluru last month.",
      "Debopam visited Bengaluru in 2022."
    ],
    correctAnswer: 1,
    explanation: "'Has gone to' signifies that Debopam is currently in Bengaluru or traveling there, having not yet returned.",
    explanationBn: "'Debopam has gone to Bengaluru' নির্দেশ করে সে এখনো ফেরেনি।"
  },
  {
    id: 11,
    question: "Fill in the blank: 'How many times ______ you ______ to the Indian Museum in Kolkata?'",
    options: [
      "have; been",
      "have; gone",
      "did; went",
      "were; gone"
    ],
    correctAnswer: 0,
    explanation: "Inquiring about the number of completed visits in one's life requires 'have you been to...?'",
    explanationBn: "কতবার গিয়ে ফিরে এসেছেন তা জানতে 'have you been to...?' বসে।"
  },
  {
    id: 12,
    question: "Choose the correct preposition: 'He has been ______ France for six months studying linguistics.'",
    options: [
      "to",
      "in",
      "into",
      "at"
    ],
    correctAnswer: 1,
    explanation: "When expressing continuous stay/duration inside a country, use 'in' ('has been in France for six months').",
    explanationBn: "কোনো দেশে একটানা অবস্থান বোঝাতে 'been in' ব্যবহৃত হয়।"
  },
  {
    id: 13,
    question: "Identify the sentence that correctly explains the subject's ongoing whereabouts:",
    options: [
      "Rohan is in Mumbai; he has been to Mumbai yesterday.",
      "Rohan is in Mumbai; he has gone to Mumbai for official audits.",
      "Rohan is in Mumbai; he went gone to Mumbai.",
      "Rohan is in Mumbai; he has been in Mumbai yesterday."
    ],
    correctAnswer: 1,
    explanation: "'He has gone to Mumbai' matches the fact that he is currently in Mumbai.",
    explanationBn: "'Has gone to Mumbai' তার মুম্বাইতে বর্তমান উপস্থিতি প্রমাণ করে।"
  },
  {
    id: 14,
    question: "Complete the sentence: 'I am so glad to see you back in Barrackpore! Where ______ you ______?'",
    options: [
      "have; been",
      "have; gone",
      "did; gone",
      "had; went"
    ],
    correctAnswer: 0,
    explanation: "Welcoming someone who has returned: 'Where have you been?' (inquiring about the completed round-trip).",
    explanationBn: "ফিরে আসা ব্যক্তিকে জিজ্ঞাসা করতে 'Where have you been?' বলা হয়।"
  },
  {
    id: 15,
    question: "Why is 'She has been to the chemist's' used when she returns with medicine?",
    options: [
      "Because 'been to' indicates she went to the pharmacy and has now returned home with the medicine.",
      "Because 'chemist's' is a noun in the possessive case.",
      "Because 'has gone to' is prohibited with retail stores.",
      "Because medicine requires the verb 'to be'."
    ],
    correctAnswer: 0,
    explanation: "'Has been to' indicates the completed round-trip errand: she went, purchased medicine, and is back.",
    explanationBn: "ঔষধ নিয়ে বাড়ি ফিরে আসায় সম্পন্ন যাত্রা বোঝাতে 'has been to' সঠিক।"
  },
  {
    id: 16,
    question: "Fill in the blank: 'Sourav isn't attending the training today because he ______ to New Delhi.'",
    options: [
      "has gone",
      "has been",
      "is been",
      "was gone"
    ],
    correctAnswer: 0,
    explanation: "Sourav's absence from training is explained by his departure for New Delhi ('has gone').",
    explanationBn: "সৌরভ বর্তমানে দিল্লিতে যাওয়ায় প্রশিক্ষণে অনুপস্থিত ('has gone')।"
  },
  {
    id: 17,
    question: "Select the sentence showing pure life experience:",
    options: [
      "I have never been to an opera performance in my entire life.",
      "I have never gone to an opera performance right now.",
      "I never was to an opera yesterday.",
      "I am never been to an opera."
    ],
    correctAnswer: 0,
    explanation: "'Have never been to...' is the standard idiomatic construction for expressing lack of lifetime travel/cultural experience.",
    explanationBn: "জীবনে কখনো অপেরা না দেখার অভিজ্ঞতা প্রকাশে 'have never been to' ব্যবহৃত হয়।"
  },
  {
    id: 18,
    question: "Spot the error: 'Can I leave a message for Mr. Sen? — No, he has been to Singapore and won't return until Friday.'",
    options: [
      "leave a message",
      "has been to Singapore",
      "won't return until Friday",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "Since he will not return until Friday, he is currently absent in Singapore; it must be 'he has gone to Singapore'.",
    explanationBn: "যেহেতু শুক্রবারের আগে তিনি ফিরবেন না, তাই 'has been' ভুল; 'has gone' হবে।"
  },
  {
    id: 19,
    question: "Which of the following is correct when talking to your classmate about past vacations?",
    options: [
      "I have gone to Kerala last summer.",
      "I went to Kerala last summer / I have been to Kerala twice.",
      "I have been to Kerala yesterday.",
      "I am gone to Kerala twice."
    ],
    correctAnswer: 1,
    explanation: "Specific past time ('last summer') requires Simple Past ('went'); lifetime frequency without specific past date uses Present Perfect ('have been to Kerala twice').",
    explanationBn: "নির্দিষ্ট অতীত সময়ের জন্য 'went' এবং মোট অভিজ্ঞতার জন্য 'have been to' সঠিক।"
  },
  {
    id: 20,
    question: "Fill in the blank: 'Where is Dr. Sukanta Hui? — He ______ to the conference hall to inaugurate the event.'",
    options: [
      "has gone",
      "has been",
      "is been",
      "was been"
    ],
    correctAnswer: 0,
    explanation: "He is currently absent in the conference hall ('has gone').",
    explanationBn: "তিনি বর্তমানে কনফারেন্স হলে আছেন (অনুপস্থিত), তাই 'has gone' হবে।"
  },
  {
    id: 21,
    question: "What does 'The courier has gone to the wrong address' mean?",
    options: [
      "The courier delivered the parcel and returned to the hub.",
      "The courier traveled to the incorrect location and is currently there or trying to resolve the delivery.",
      "The courier never left the sorting office.",
      "The parcel was lost ten years ago."
    ],
    correctAnswer: 1,
    explanation: "'Has gone' indicates the courier departed for and is currently at or dealing with the wrong destination.",
    explanationBn: "কুরিয়ার ভুল ঠিকানায় গিয়ে এখনো সেখানেই আছে।"
  },
  {
    id: 22,
    question: "Choose the grammatically pristine sentence:",
    options: [
      "Have you ever been in London for a vacation?",
      "Have you ever been to London?",
      "Have you ever gone in London?",
      "Have you ever being to London?"
    ],
    correctAnswer: 1,
    explanation: "'Have you ever been to [City]?' is the immaculate, universally recognized standard question.",
    explanationBn: "'Have you ever been to London?' হলো প্রমিত রূপ।"
  },
  {
    id: 23,
    question: "In the sentence 'She has been to the post office and is now preparing tea', 'has been to' indicates:",
    options: [
      "An uncompleted journey",
      "A completed round-trip errand from which the subject has returned",
      "A permanent relocation to the post office",
      "An impossible future event"
    ],
    correctAnswer: 1,
    explanation: "She went to the post office and is now back home preparing tea (completed round-trip).",
    explanationBn: "পোস্ট অফিস থেকে কাজ শেষ করে বাড়ি ফিরে আসাকে 'has been to' নির্দেশ করছে।"
  },
  {
    id: 24,
    question: "Fill in the blank: 'My parents ______ to Varanasi on pilgrimage; they will return next Tuesday.'",
    options: [
      "have gone",
      "have been",
      "had gone",
      "were been"
    ],
    correctAnswer: 0,
    explanation: "Because they will return next Tuesday, they are currently in Varanasi ('have gone').",
    explanationBn: "তারা আগামী মঙ্গলবার ফিরবেন, অর্থাৎ এখন বারাণসীতে আছেন ('have gone')।"
  },
  {
    id: 25,
    question: "Which formula summarizes the fundamental semantic rule of 'has been to'?",
    options: [
      "Subject departed + Subject currently absent = Has been to",
      "Subject departed + Subject visited + Subject returned to origin = Has been to",
      "Subject resides permanently = Has been to",
      "Subject will travel tomorrow = Has been to"
    ],
    correctAnswer: 1,
    explanation: "'Has been to' encapsulates the full cycle: Departure + Visit + Return to starting point.",
    explanationBn: "যাত্রা শুরু + পরিদর্শন + প্রারম্ভিক স্থানে প্রত্যাবর্তন = Has been to।"
  }
];

export default questions;
