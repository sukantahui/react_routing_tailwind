const questions = [
  {
    id: 1,
    question: "Which form correctly expresses a spontaneous decision made right now: 'The phone is ringing. I ______ it.'",
    options: [
      "will answer",
      "am going to answer",
      "am answering",
      "answer"
    ],
    correctAnswer: 0,
    explanation: "Spontaneous decisions made at the moment of speaking use Simple Future with 'will' ('I'll answer it')."
  },
  {
    id: 2,
    question: "Choose the correct sentence expressing a prediction based on clear, visible present evidence:",
    options: [
      "Look at those dark clouds! It will rain.",
      "Look at those dark clouds! It is going to rain.",
      "Look at those dark clouds! It rains.",
      "Look at those dark clouds! It will have rained."
    ],
    correctAnswer: 1,
    explanation: "Predictions supported by direct physical, observable evidence (e.g. dark clouds, swaying ladder) use 'be going to'."
  },
  {
    id: 3,
    question: "Select the grammatically correct sentence regarding a fixed official train schedule:",
    options: [
      "The Howrah Express is going to depart at 6:00 AM tomorrow.",
      "The Howrah Express departs at 6:00 AM tomorrow.",
      "The Howrah Express will be departing at 6:00 AM tomorrow.",
      "The Howrah Express shall have departed at 6:00 AM tomorrow."
    ],
    correctAnswer: 1,
    explanation: "Fixed official timetables, public transport schedules, and calendar events are expressed using the Simple Present tense ('departs at 6:00 AM')."
  },
  {
    id: 4,
    question: "Spot the error in: 'If it *will rain* tomorrow, we *will postpone* the match.'",
    options: [
      "Change 'will postpone' to 'postpone'",
      "Change 'will rain' to 'rains'",
      "Change 'tomorrow' to 'yesterday'",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "In subordinate conditional clauses introduced by 'if', 'will' is strictly forbidden. The Simple Present ('rains') must be used."
  },
  {
    id: 5,
    question: "Complete the sentence: 'By the time you ______ home, mother ______ dinner.'",
    options: [
      "will reach, will prepare",
      "reach, will have prepared",
      "reached, has prepared",
      "will have reached, prepares"
    ],
    correctAnswer: 1,
    explanation: "'By the time' clause takes Simple Present ('reach') and the main clause takes Future Perfect ('will have prepared')."
  },
  {
    id: 6,
    question: "What is the primary meaning of: 'She is having lunch with the CEO next Monday'?",
    options: [
      "A sudden spontaneous decision",
      "A fixed personal arrangement with another person and a set time",
      "A natural law or universal truth",
      "A prediction without evidence"
    ],
    correctAnswer: 1,
    explanation: "Present Continuous for future expresses a pre-arranged personal appointment or booking involving other people."
  },
  {
    id: 7,
    question: "Select the sentence in the Future Continuous tense denoting an activity in progress at a specific future moment:",
    options: [
      "At 9:00 PM tonight, I will write my essay.",
      "At 9:00 PM tonight, I will be writing my essay.",
      "At 9:00 PM tonight, I will have written my essay.",
      "At 9:00 PM tonight, I write my essay."
    ],
    correctAnswer: 1,
    explanation: "Future Continuous ('will be writing') designates an action that will be in active progress at a specific future point in time."
  },
  {
    id: 8,
    question: "Fill in the blank: 'By the year 2030, Professor Roy ______ at this university for twenty-five years.'",
    options: [
      "will teach",
      "will be teaching",
      "will have been teaching",
      "has been teaching"
    ],
    correctAnswer: 2,
    explanation: "Future Perfect Continuous ('will have been teaching') indicates the duration of an ongoing action up to a future reference year (2030)."
  },
  {
    id: 9,
    question: "Which of the following expresses immediate impending future using 'about to'?",
    options: [
      "The ceremony is about to commence.",
      "The ceremony is to commence.",
      "The ceremony will commence next year.",
      "The ceremony commenced."
    ],
    correctAnswer: 0,
    explanation: "'Be about to + V1' denotes an event that is on the verge of happening within seconds or minutes."
  },
  {
    id: 10,
    question: "Choose the correct sentence combining time clause and main future clause:",
    options: [
      "As soon as the bell will ring, the children will leave the hall.",
      "As soon as the bell rings, the children will leave the hall.",
      "As soon as the bell will have rung, the children leave.",
      "As soon as the bell is ringing, the children will have left."
    ],
    correctAnswer: 1,
    explanation: "Subordinate time clauses with 'as soon as' require the Simple Present ('rings') while the main result clause takes Simple Future ('will leave')."
  },
  {
    id: 11,
    question: "Fill in the blank: 'I think humanity ______ human colonies on Mars before the end of this century.'",
    options: [
      "will establish",
      "is establishing",
      "establishes",
      "shall have establish"
    ],
    correctAnswer: 0,
    explanation: "Predictions based on personal opinion, belief, or speculation ('I think...') use 'will + V1'."
  },
  {
    id: 12,
    question: "Identify the sentence that represents a prior intention (plan made beforehand):",
    options: [
      "I will answer the doorbell.",
      "I am going to study medicine after completing school.",
      "The train arrives at 10 AM.",
      "I will be helping you."
    ],
    correctAnswer: 1,
    explanation: "'Be going to' represents a premeditated decision or plan made prior to speaking."
  },
  {
    id: 13,
    question: "Complete the sentence: 'By next Friday, our development team ______ the alpha release.'",
    options: [
      "will deploy",
      "will have deployed",
      "is deploying",
      "deploys"
    ],
    correctAnswer: 1,
    explanation: "'By + future time marker' triggers the Future Perfect tense ('will have deployed') to signify completion prior to that deadline."
  },
  {
    id: 14,
    question: "Which sentence correctly demonstrates a polite inquiry about someone's future plans without imposing?",
    options: [
      "Will you help me now?",
      "Will you be using your laptop this afternoon?",
      "Are you going to use your laptop whether you like it or not?",
      "Do you use your laptop?"
    ],
    correctAnswer: 1,
    explanation: "The Future Continuous ('Will you be using...?') is standard English etiquette for making tactful, polite inquiries about someone's existing routine plans."
  },
  {
    id: 15,
    question: "Select the sentence with a fatal grammatical error:",
    options: [
      "We will wait here until the manager arrives.",
      "We will wait here until the manager will arrive.",
      "We are going to wait here until the manager arrives.",
      "We shall wait here until the manager arrives."
    ],
    correctAnswer: 1,
    explanation: "'Until' introduces a time clause, in which 'will' is prohibited ('until the manager arrives' is correct)."
  },
  {
    id: 16,
    question: "What does 'The President is to visit Japan next month' imply?",
    options: [
      "An unexpected accident",
      "An official, scheduled diplomatic arrangement or protocol",
      "A spontaneous impulse",
      "An unreal conditional"
    ],
    correctAnswer: 1,
    explanation: "'Be + to-infinitive' ('is to visit') denotes formal, official arrangements, duties, or public itineraries."
  },
  {
    id: 17,
    question: "Complete the sentence: 'Don't phone me between 2 PM and 4 PM because I ______ an important client meeting.'",
    options: [
      "will conduct",
      "will be conducting",
      "conduct",
      "will have conducted"
    ],
    correctAnswer: 1,
    explanation: "An ongoing action taking place throughout a specified future time span uses the Future Continuous ('will be conducting')."
  },
  {
    id: 18,
    question: "Choose the correct verb: 'Unless he ______ the fine by tomorrow, his membership will be terminated.'",
    options: [
      "will pay",
      "pays",
      "is going to pay",
      "will have paid"
    ],
    correctAnswer: 1,
    explanation: "'Unless' is a conditional conjunction and takes the Simple Present ('pays')."
  },
  {
    id: 19,
    question: "In the sentence 'By 10 PM tonight, he will have been driving for eight hours', what does 'for eight hours' emphasize?",
    options: [
      "The exact point when the drive begins",
      "The duration of the ongoing driving activity up to the 10 PM benchmark",
      "That the drive is already finished in the past",
      "An unfulfilled wish"
    ],
    correctAnswer: 1,
    explanation: "Future Perfect Continuous measures the cumulative duration ('for eight hours') of an ongoing action up to a future point (10 PM)."
  },
  {
    id: 20,
    question: "Select the sentence that uses 'shall' correctly in modern formal British English for first-person promises or resolve:",
    options: [
      "We shall overcome all obstacles.",
      "He shall goes tomorrow.",
      "They shall to succeed.",
      "You shall arriving soon."
    ],
    correctAnswer: 0,
    explanation: "In formal style, 'shall' with 'I' or 'We' expresses firm determination, promise, or inevitability."
  },
  {
    id: 21,
    question: "Complete the sentence: 'Look at the speedometer! We ______ out of fuel any minute.'",
    options: [
      "will run",
      "are going to run",
      "run",
      "will have run"
    ],
    correctAnswer: 1,
    explanation: "Physical sensory evidence ('Look at the speedometer') requires 'are going to run'."
  },
  {
    id: 22,
    question: "Identify the sentence where Simple Present expresses a calendar or fixed schedule event:",
    options: [
      "Next year, Diwali falls on November 1st.",
      "Next year, Diwali will be falling on November 1st.",
      "Next year, Diwali is going to fall on November 1st.",
      "Next year, Diwali shall have fallen on November 1st."
    ],
    correctAnswer: 0,
    explanation: "Calendar events and fixed astronomical/public dates naturally take the Simple Present ('falls on November 1st')."
  },
  {
    id: 23,
    question: "Which of the following sentence pairs expresses a contrast between an offer and an arrangement?",
    options: [
      "A: 'I'll carry your bag.' (Offer) vs B: 'I'm meeting Rahul at 5.' (Arrangement)",
      "A: 'I'm meeting Rahul.' (Offer) vs B: 'I'll carry your bag.' (Arrangement)",
      "Both are unplanned impulses",
      "Both are formal timetables"
    ],
    correctAnswer: 0,
    explanation: "'I'll carry...' is an on-the-spot offer (will + V1), whereas 'I'm meeting...' is a pre-arranged appointment (Present Continuous)."
  },
  {
    id: 24,
    question: "Fill in the blank: 'When the minister arrives, the security guards ______ him to the podium.'",
    options: [
      "will escort",
      "escort",
      "have escorted",
      "will be escort"
    ],
    correctAnswer: 0,
    explanation: "'When the minister arrives (time clause in Simple Present), the security guards will escort him (main clause in Simple Future)'."
  },
  {
    id: 25,
    question: "Choose the correct Future Perfect question: '______ your project by the deadline next week?'",
    options: [
      "Will you finish",
      "Will you have finished",
      "Are you finishing",
      "Do you finish"
    ],
    correctAnswer: 1,
    explanation: "'By the deadline next week' indicates completion before a future cutoff, which requires Future Perfect ('Will you have finished...?')."
  }
];

export default questions;
