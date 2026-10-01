import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Languages,
  Zap,
  RotateCcw,
  Check,
  Layers,
  GitBranch,
  Split,
  Sliders,
  ShieldCheck,
  Eye,
  Boxes,
  Compass,
  CheckCircle,
  FileText,
  Clock,
  MapPin,
  HelpCircle as QuestionIcon,
  Flame,
  ArrowLeftRight,
  GitMerge
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeClauseClass, setActiveClauseClass] = useState("noun");
  const [selectedNounRole, setSelectedNounRole] = useState("subject");
  const [selectedRelativeType, setSelectedRelativeType] = useState("defining");
  const [selectedAdvType, setSelectedAdvType] = useState("time");
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState(0);

  // 25 Quiz State
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (qId, option) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const toggleExplanation = (qId) => {
    setRevealedExplanations((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setRevealedExplanations({});
    setSubmitted(false);
  };

  // Interactive Sentence Architecture Dissector
  const sampleDissections = [
    {
      sentence: "Swadeep knows that honesty is the best policy because it brings peace of mind.",
      finiteVerbs: ["knows (V5)", "is (Linking V)", "brings (V5)"],
      clauseCount: 3,
      clauses: [
        { type: "Principal Clause", text: "Swadeep knows", role: "Main independent assertion" },
        { type: "Subordinate Noun Clause", text: "that honesty is the best policy", role: "Object of transitive verb 'knows'" },
        { type: "Subordinate Adverbial Clause of Reason", text: "because it brings peace of mind", role: "Modifies the predicate of the noun clause" }
      ],
      bn: "স্বদীপ জানে যে সততাই সর্বোৎকৃষ্ট পন্থা কারণ এটি মনের শান্তি এনে দেয়। (৩টি Finite Verb = ৩টি Clause)"
    },
    {
      sentence: "The engineer who designed this bridge received an award after the project was completed.",
      finiteVerbs: ["designed (V2)", "received (V2)", "was completed (Passive V2)"],
      clauseCount: 3,
      clauses: [
        { type: "Principal Clause", text: "The engineer received an award", role: "Main independent assertion" },
        { type: "Subordinate Adjective (Relative) Clause", text: "who designed this bridge", role: "Modifies antecedent noun 'The engineer'" },
        { type: "Subordinate Adverbial Clause of Time", text: "after the project was completed", role: "Modifies verb 'received'" }
      ],
      bn: "যে প্রকৌশলী এই সেতুটি নকশা করেছিলেন তিনি প্রকল্পটি সম্পন্ন হওয়ার পর একটি পুরস্কার পেয়েছিলেন।"
    },
    {
      sentence: "The news that the exam has been postponed reached us while we were studying.",
      finiteVerbs: ["has been postponed (V3)", "reached (V2)", "were studying (Past Cont)"],
      clauseCount: 3,
      clauses: [
        { type: "Principal Clause", text: "The news reached us", role: "Main independent assertion" },
        { type: "Subordinate Noun Clause in Apposition", text: "that the exam has been postponed", role: "Explains internal fact of antecedent 'The news'" },
        { type: "Subordinate Adverbial Clause of Time", text: "while we were studying", role: "Modifies verb 'reached'" }
      ],
      bn: "পরীক্ষাটি স্থগিত করা হয়েছে এই খবরটি আমাদের কাছে পৌঁছেছিল যখন আমরা পড়াশোনা করছিলাম।"
    }
  ];

  // Noun Roles Data (Comprehensive with Segmented Clause Labeling)
  const nounRoles = {
    subject: {
      title: "1. Subject of a Finite Verb (ভার্বের কর্তা হিসেবে)",
      examples: [
        {
          clause: "That he will recover soon",
          clauseRole: "Noun Clause (Subject)",
          suffix: "is certain.",
          suffixRole: "Finite Verb ('is') + Complement",
          full: "That he will recover soon is certain.",
          bn: "তিনি যে শীঘ্রই সুস্থ হয়ে উঠবেন [Noun Clause (Subject)] তা নিশ্চিত [Main Predicate]।"
        },
        {
          clause: "What Swadeep explained",
          clauseRole: "Noun Clause (Subject)",
          suffix: "made complete sense.",
          suffixRole: "Finite Verb ('made') + Object",
          full: "What Swadeep explained made complete sense.",
          bn: "স্বদীপ যা ব্যাখ্যা করেছিল [Noun Clause (Subject)] তা পুরোপুরি যুক্তিযুক্ত ছিল [Main Predicate]।"
        },
        {
          clause: "How the burglar breached the security",
          clauseRole: "Noun Clause (Subject)",
          suffix: "remains an unsolved mystery.",
          suffixRole: "Finite Verb ('remains') + Complement",
          full: "How the burglar breached the security remains an unsolved mystery.",
          bn: "চোর কীভাবে নিরাপত্তা প্রাচীর ভেঙেছিল [Noun Clause (Subject)] তা এখনও এক অমীমাংসিত রহস্য [Main Predicate]।"
        }
      ],
      analysis: "The whole subordinate clause serves as the grammatical subject performing or undergoing the action of the main verb.",
      diagnosticTest: "Replace the clause with 'IT': 'IT is certain.' -> Perfectly valid, proves it is a Noun Clause acting as Subject.",
      bnNote: "সমগ্র ক্লজটি মূল ভার্বের পূর্বে বসে কর্তা (Subject) হিসেবে কাজ করে। ক্লজটির পরিবর্তে 'It' বা 'Something' বসালে বাক্যের অর্থ সম্পূর্ণ থাকে।"
    },
    object: {
      title: "2. Object of a Transitive Verb (সকর্মক ক্রিয়ার কর্ম হিসেবে)",
      examples: [
        {
          prefix: "Sukanta Sir knows",
          prefixRole: "Subject + Transitive Verb ('knows')",
          clause: "that consistency builds mastery.",
          clauseRole: "Noun Clause (Direct Object)",
          full: "Sukanta Sir knows that consistency builds mastery.",
          bn: "সুকান্ত স্যার জানেন [Main Verb] যে ধারাবাহিকতাই দক্ষতা তৈরি করে [Noun Clause (Object)]।"
        },
        {
          prefix: "I asked",
          prefixRole: "Subject + Transitive Verb ('asked')",
          clause: "whether the library was open on Sundays.",
          clauseRole: "Noun Clause (Direct Object)",
          full: "I asked whether the library was open on Sundays.",
          bn: "আমি জিজ্ঞাসা করেছিলাম [Main Verb] রবিবার লাইব্রেরি খোলা থাকে কিনা [Noun Clause (Object)]।"
        },
        {
          prefix: "We discovered",
          prefixRole: "Subject + Transitive Verb ('discovered')",
          clause: "who had unlocked the laboratory door.",
          clauseRole: "Noun Clause (Direct Object)",
          full: "We discovered who had unlocked the laboratory door.",
          bn: "আমরা আবিষ্কার করেছিলাম [Main Verb] কে গবেষণাগারের দরজা খুলেছিল [Noun Clause (Object)]।"
        }
      ],
      analysis: "The clause directly answers the question 'VERB + WHAT / WHOM?' and acts as the direct object.",
      diagnosticTest: "Question: 'Knows what?' -> Answer: '[that consistency builds mastery]'.",
      bnNote: "সকর্মক ক্রিয়াকে 'কী' বা 'কাকে' দিয়ে প্রশ্ন করলে যে উত্তর পাওয়া যায়, সেই ক্লজটিই হলো Object Noun Clause।"
    },
    prep_object: {
      title: "3. Object of a Preposition (Preposition-এর অবজেক্ট হিসেবে)",
      examples: [
        {
          prefix: "Pay close attention to",
          prefixRole: "Principal Clause + Preposition ('to')",
          clause: "what your mentor demonstrates.",
          clauseRole: "Noun Clause (Object of Preposition 'to')",
          full: "Pay close attention to what your mentor demonstrates.",
          bn: "মনোযোগ দাও [Main Clause] তোমার মেন্টর যা প্রদর্শন করেন তার প্রতি [Noun Clause (Object of Preposition)]।"
        },
        {
          prefix: "There is no truth in",
          prefixRole: "Principal Clause + Preposition ('in')",
          clause: "what the suspect claimed.",
          clauseRole: "Noun Clause (Object of Preposition 'in')",
          full: "There is no truth in what the suspect claimed.",
          bn: "কোনো সত্যতা নেই [Main Clause] সন্দেহভাজন ব্যক্তি যা দাবি করেছিল তার মধ্যে [Noun Clause (Object of Preposition)]।"
        },
        {
          prefix: "Success depends on",
          prefixRole: "Principal Clause + Preposition ('on')",
          clause: "how dedicatedly you practice.",
          clauseRole: "Noun Clause (Object of Preposition 'on')",
          full: "Success depends on how dedicatedly you practice.",
          bn: "সাফল্য নির্ভর করে [Main Clause] তুমি কতটা নিষ্ঠার সাথে অনুশীলন করো তার ওপর [Noun Clause (Object of Preposition)]।"
        }
      ],
      analysis: "The clause directly follows a preposition (to, in, on, about, for, with) and completes its prepositional phrase.",
      diagnosticTest: "Preposition + [Noun Clause]: 'to [SOMETHING]'.",
      bnNote: "Preposition-এর ঠিক পরেই বসে তার কর্ম (Object) হিসেবে কাজ করে।"
    },
    complement: {
      title: "4. Subject Complement (Linking Verb-এর Complement হিসেবে)",
      examples: [
        {
          prefix: "The harsh reality is",
          prefixRole: "Subject ('The reality') + Linking Verb ('is')",
          clause: "that we lack sufficient computational resources.",
          clauseRole: "Noun Clause (Subject Complement)",
          full: "The harsh reality is that we lack sufficient computational resources.",
          bn: "কঠিন বাস্তবতা হলো [Subject + Linking Verb] আমাদের পর্যাপ্ত কম্পিউটিং সংস্থানের অভাব রয়েছে [Noun Clause (Complement)]।"
        },
        {
          prefix: "My greatest wish is",
          prefixRole: "Subject ('My wish') + Linking Verb ('is')",
          clause: "that you become a proficient software engineer.",
          clauseRole: "Noun Clause (Subject Complement)",
          full: "My greatest wish is that you become a proficient software engineer.",
          bn: "আমার সবচেয়ে বড় ইচ্ছা হলো [Subject + Linking Verb] তুমি যেন একজন দক্ষ সফটওয়্যার প্রকৌশলী হও [Noun Clause (Complement)]।"
        },
        {
          prefix: "Life is",
          prefixRole: "Subject ('Life') + Linking Verb ('is')",
          clause: "what you choose to make of every opportunity.",
          clauseRole: "Noun Clause (Subject Complement)",
          full: "Life is what you choose to make of every opportunity.",
          bn: "জীবন হলো [Subject + Linking Verb] প্রতি সুযোগে তুমি যা গড়ে তোলার সিদ্ধান্ত নাও [Noun Clause (Complement)]।"
        }
      ],
      analysis: "Follows linking/copular verbs (is, was, were, seems, appears, feels) to complete the meaning and definition of the subject.",
      diagnosticTest: "[Subject] = [Complement Clause] ('Reality' = 'that we lack resources').",
      bnNote: "Linking Verb (is/was/seems)-এর পরে বসে Subject-এর পরিচয় বা অবস্থা সম্পূর্ণ করে।"
    },
    apposition: {
      title: "5. In Apposition to a Noun (Noun-এর অভ্যন্তরীণ বিষয়বস্তু হিসেবে)",
      examples: [
        {
          prefix: "The news",
          prefixRole: "Abstract Antecedent Noun ('news')",
          clause: "that the scientist received the Nobel Prize",
          clauseRole: "Noun Clause in Apposition (Explains the News)",
          suffix: "delighted all.",
          suffixRole: "Principal Predicate",
          full: "The news that the scientist received the Nobel Prize delighted all.",
          bn: "সেই খবরটি—বিজ্ঞানী নোবেল পুরস্কার পেয়েছেন [Noun Clause in Apposition]—সকলকে আনন্দিত করেছিল [Main Predicate]।"
        },
        {
          prefix: "The rumor",
          prefixRole: "Abstract Antecedent Noun ('rumor')",
          clause: "that the commercial bank failed",
          clauseRole: "Noun Clause in Apposition (Explains the Rumor)",
          suffix: "is completely groundless.",
          suffixRole: "Principal Predicate",
          full: "The rumor that the commercial bank failed is completely groundless.",
          bn: "সেই গুজবটি—বাণিজ্যিক ব্যাংকটি দেউলিয়া হয়ে গেছে [Noun Clause in Apposition]—সম্পূর্ণ ভিত্তিহীন [Main Predicate]।"
        },
        {
          prefix: "We cannot deny the fact",
          prefixRole: "Principal Clause + Noun ('fact')",
          clause: "that artificial intelligence is evolving rapidly.",
          clauseRole: "Noun Clause in Apposition",
          full: "We cannot deny the fact that artificial intelligence is evolving rapidly.",
          bn: "আমরা এই বাস্তব সত্যকে অস্বীকার করতে পারি না [Main Clause] যে কৃত্রিম বুদ্ধিমত্তা দ্রুত বিকশিত হচ্ছে [Noun Clause in Apposition]।"
        }
      ],
      analysis: "Stands right beside an abstract noun (news, rumor, fact, belief, idea, report) and defines its exact internal statement.",
      diagnosticTest: "Which-Replacement Test FAILS: You CANNOT say 'The news WHICH the scientist received the Nobel...'. 'That' is a pure conjunction.",
      bnNote: "কোনো বিমূর্ত Noun (news, rumor, fact, report)-এর পাশে বসে তার ভেতরের ঘটনাটি হুবহু ব্যক্ত করে।"
    }
  };

  // Relative Clauses Data (Defining vs Non-Defining with Segmented Labels)
  const relativeTypes = {
    defining: {
      title: "Defining (Restrictive) Relative Clause (নির্দিষ্টকারী ক্লজ)",
      status: "Essential to Identity — Cannot be Omitted",
      commas: "STRICTLY NO COMMAS ALLOWED",
      pronouns: "'That', 'Which', 'Who', 'Whom', 'Whose'",
      omission: "Pronoun CAN be omitted if it is the OBJECT of the relative clause (Contact Clause)",
      examples: [
        {
          prefix: "The doctor",
          prefixRole: "Antecedent Noun (Person)",
          clause: "who treated Swadeep",
          clauseRole: "Defining Relative Clause (Identifies the Doctor)",
          suffix: "is a renowned cardiologist.",
          suffixRole: "Principal Predicate",
          full: "The doctor who treated Swadeep is a renowned cardiologist.",
          bn: "যে ডাক্তার স্বদীপকে চিকিৎসা করেছিলেন [Defining Relative Clause] তিনি একজন খ্যাতনামা হৃদরোগ বিশেষজ্ঞ [Main Predicate]।"
        },
        {
          prefix: "The laptop",
          prefixRole: "Antecedent Noun (Thing)",
          clause: "(that) I purchased yesterday",
          clauseRole: "Defining Relative Clause [Contact Clause: 'that' omitted]",
          suffix: "has an M3 processor.",
          suffixRole: "Principal Predicate",
          full: "The laptop (that) I purchased yesterday has an M3 processor.",
          bn: "যে ল্যাপটপটি আমি গতকাল কিনেছিলাম [Defining Relative Clause] তাতে M3 প্রসেসর রয়েছে [Main Predicate]।"
        },
        {
          prefix: "Students",
          prefixRole: "Antecedent Noun (Plural)",
          clause: "who submit assignments on time",
          clauseRole: "Defining Relative Clause",
          suffix: "receive bonus credits.",
          suffixRole: "Principal Predicate",
          full: "Students who submit assignments on time receive bonus credits.",
          bn: "যেসব ছাত্রছাত্রী সময়মতো অ্যাসাইনমেন্ট জমা দেয় [Defining Relative Clause] তারা বোনাস ক্রেডিট পায় [Main Predicate]।"
        }
      ],
      meaningEffect: "Restricts the noun to a specific entity among many possibilities.",
      bnNote: "যে ক্লজটি না থাকলে মূল ব্যক্তি বা বস্তুকে সুনির্দিষ্টভাবে চিহ্নিত করা যায় না। এতে কোনো কমা ব্যবহার করা যাবে না এবং 'that' অবাধে ব্যবহৃত হয়।"
    },
    non_defining: {
      title: "Non-Defining (Parenthetical) Relative Clause (অতিরিক্ত তথ্য প্রদানকারী ক্লজ)",
      status: "Extra Supplementary Information — Can be Removed",
      commas: "MUST BE ENCLOSED IN COMMAS ( , ... , )",
      pronouns: "'Who', 'Whom', 'Whose', 'Which' (STRICTLY NEVER 'That'!)",
      omission: "Pronoun can NEVER be omitted under any circumstances",
      examples: [
        {
          prefix: "Dr. Sen,",
          prefixRole: "Antecedent (Proper Noun - Already Unique)",
          clause: "who lives in Kolkata,",
          clauseRole: "Non-Defining Relative Clause (Enclosed in Commas)",
          suffix: "is a renowned cardiologist.",
          suffixRole: "Principal Predicate",
          full: "Dr. Sen, who lives in Kolkata, is a renowned cardiologist.",
          bn: "ডা. সেন, যিনি কলকাতায় থাকেন [Non-Defining Clause: বাড়তি তথ্য], একজন খ্যাতনামা হৃদরোগ বিশেষজ্ঞ [Main Predicate]।"
        },
        {
          prefix: "My MacBook Pro,",
          prefixRole: "Antecedent (Specific Item)",
          clause: "which I bought last year,",
          clauseRole: "Non-Defining Relative Clause (Enclosed in Commas)",
          suffix: "performs flawlessly.",
          suffixRole: "Principal Predicate",
          full: "My MacBook Pro, which I bought last year, performs flawlessly.",
          bn: "আমার ম্যাকবুক প্রো, যেটি আমি গত বছর কিনেছিলাম [Non-Defining Clause], চমৎকারভাবে কাজ করছে [Main Predicate]।"
        },
        {
          prefix: "Barrackpore,",
          prefixRole: "Antecedent (Historic Town)",
          clause: "where Mangal Pandey initiated the 1857 uprising,",
          clauseRole: "Non-Defining Relative Clause (Enclosed in Commas)",
          suffix: "is a historic city.",
          suffixRole: "Principal Predicate",
          full: "Barrackpore, where Mangal Pandey initiated the 1857 uprising, is a historic city.",
          bn: "ব্যারাকপুর, যেখানে মঙ্গল পাণ্ডে ১৮৫৭ সালের বিদ্রোহ শুরু করেছিলেন [Non-Defining Clause], একটি ঐতিহাসিক স্থান [Main Predicate]।"
        }
      ],
      meaningEffect: "The noun is already uniquely identified; the clause only provides incidental extra information.",
      bnNote: "নির্দিষ্ট ব্যক্তি বা স্থানের নামের পর অতিরিক্ত তথ্য দেয় যা বাদ দিলেও মূল বাক্য অক্ষত থাকে। এটি উভয় পাশে কমা দিয়ে ঘেরা থাকে এবং এতে 'that' ব্যবহার সম্পূর্ণ নিষিদ্ধ।"
    }
  };

  // 9 Adverbial Types Data with Segmented Labels
  const advTypes = {
    time: {
      name: "Time (সময়সূচক)",
      question: "When?",
      connectors: "when, whenever, while, before, after, since, until, till, as soon as, as long as, hardly... when, no sooner... than",
      examples: [
        {
          clause: "As soon as the mentor began the lesson,",
          clauseRole: "Adverbial Clause of Time",
          suffix: "the students opened their code editors.",
          suffixRole: "Principal Clause (Action)",
          full: "As soon as the mentor began the lesson, the students opened their code editors.",
          bn: "মেন্টর পাঠ শুরু করা মাত্রই [Adverbial Clause of Time] ছাত্রছাত্রীরা তাদের কোড এডিটর খুলে ফেলল [Principal Clause]।"
        },
        {
          prefix: "I will call you",
          prefixRole: "Principal Clause (Future)",
          clause: "when I reach Barrackpore station.",
          clauseRole: "Adverbial Clause of Time (Present Simple)",
          full: "I will call you when I reach Barrackpore station.",
          bn: "আমি তোমাকে ফোন করব [Principal Clause] যখন আমি ব্যারাকপুর স্টেশনে পৌঁছাব [Adverbial Clause of Time]।"
        }
      ],
      rule: "Never use 'will' in subordinate time clauses! Use Simple Present instead: 'When he arrives (NOT will arrive)'."
    },
    place: {
      name: "Place (স্থানসূচক)",
      question: "Where?",
      connectors: "where, wherever, whither (to where), whence (from where)",
      examples: [
        {
          prefix: "Fools rush in",
          prefixRole: "Principal Clause",
          clause: "where angels fear to tread.",
          clauseRole: "Adverbial Clause of Place",
          full: "Fools rush in where angels fear to tread.",
          bn: "মূর্খরা ছুটে যায় [Principal Clause] যেখানে দেবদূতরাও পা রাখতে ভয় পান [Adverbial Clause of Place]।"
        },
        {
          prefix: "You may sit",
          prefixRole: "Principal Clause",
          clause: "wherever you feel most comfortable.",
          clauseRole: "Adverbial Clause of Place",
          full: "You may sit wherever you feel most comfortable.",
          bn: "তুমি বসতে পারো [Principal Clause] যেখানে তোমার সবচেয়ে আরামদায়ক মনে হয় [Adverbial Clause of Place]।"
        }
      ],
      rule: "Modifies the place where the verb action transpires."
    },
    reason: {
      name: "Cause / Reason (কারণসূচক)",
      question: "Why?",
      connectors: "because, as, since, for, seeing that, in as much as, that",
      examples: [
        {
          clause: "Since the severe rain flooded the streets,",
          clauseRole: "Adverbial Clause of Cause / Reason",
          suffix: "the coding workshop was rescheduled.",
          suffixRole: "Principal Clause (Result)",
          full: "Since the severe rain flooded the streets, the coding workshop was rescheduled.",
          bn: "যেহেতু প্রবল বৃষ্টিতে রাস্তা প্লাবিত হয়েছিল [Adverbial Clause of Reason], তাই কর্মশালাটি পুনর্নির্ধারণ করা হয়েছিল [Principal Clause]।"
        },
        {
          prefix: "He was awarded",
          prefixRole: "Principal Clause",
          clause: "because he solved the critical database failure.",
          clauseRole: "Adverbial Clause of Cause / Reason",
          full: "He was awarded because he solved the critical database failure.",
          bn: "তাঁকে পুরস্কৃত করা হয়েছিল [Principal Clause] কারণ তিনি জটিল ডেটাবেস ত্রুটি সমাধান করেছিলেন [Adverbial Clause of Reason]।"
        }
      ],
      rule: "Explains the underlying motive, trigger, or cause of the main clause action."
    },
    purpose: {
      name: "Purpose (উদ্দেশ্যসূচক)",
      question: "With what aim?",
      connectors: "so that, in order that, that, lest (+ should + V1)",
      examples: [
        {
          prefix: "Swadeep studies systematically",
          prefixRole: "Principal Clause (Action)",
          clause: "so that he may master complex data structures.",
          clauseRole: "Adverbial Clause of Purpose ('so that + may')",
          full: "Swadeep studies systematically so that he may master complex data structures.",
          bn: "স্বদীপ পদ্ধতিগতভাবে অধ্যয়ন করে [Principal Clause] যাতে সে জটিল ডেটা স্ট্রাকচার আয়ত্ত করতে পারে [Adverbial Clause of Purpose]।"
        },
        {
          prefix: "Walk carefully",
          prefixRole: "Principal Clause (Imperative)",
          clause: "lest you should stumble on the rocky path.",
          clauseRole: "Adverbial Clause of Negative Purpose ('lest + should')",
          full: "Walk carefully lest you should stumble on the rocky path.",
          bn: "সাবধানে হাঁটো [Principal Clause] যাতে তুমি পাথুরে পথে হোঁচট না খাও [Adverbial Clause of Purpose]।"
        }
      ],
      rule: "Present main verb takes 'may + V1'; Past main verb takes 'might + V1'. 'Lest' is followed by 'should' (never use 'not' with lest)."
    },
    result: {
      name: "Result / Consequence (ফলাফলসূচক)",
      question: "With what effect?",
      connectors: "so... that, such... that",
      examples: [
        {
          prefix: "The algorithm was so computationally expensive",
          prefixRole: "Principal Clause (Intensity)",
          clause: "that the server crashed under load.",
          clauseRole: "Adverbial Clause of Result / Consequence",
          full: "The algorithm was so computationally expensive that the server crashed under load.",
          bn: "অ্যালগরিদমটি এতটাই কম্পিউটেশনালভাবে ব্যয়বহুল ছিল [Principal Clause] যে সার্ভারটি ক্র্যাশ করেছিল [Adverbial Clause of Result]।"
        }
      ],
      rule: "Expresses the tangible outcome or direct consequence of an attribute or action."
    },
    condition: {
      name: "Condition (শর্তমূলক)",
      question: "On what condition?",
      connectors: "if, unless (if not), provided that, in case, as long as, supposing that",
      examples: [
        {
          clause: "Unless you practice debugging regularly,",
          clauseRole: "Adverbial Clause of Condition ('unless = if not')",
          suffix: "you cannot become a top software engineer.",
          suffixRole: "Principal Clause",
          full: "Unless you practice debugging regularly, you cannot become a top software engineer.",
          bn: "তুমি যদি নিয়মিত ডিবাগিং অনুশীলন না করো [Adverbial Clause of Condition], তবে তুমি শীর্ষ প্রকৌশলী হতে পারবে না [Principal Clause]।"
        },
        {
          clause: "If Swadeep completes the React project on time,",
          clauseRole: "Adverbial Clause of Condition (1st Conditional)",
          suffix: "he will receive the certificate.",
          suffixRole: "Principal Clause (Simple Future)",
          full: "If Swadeep completes the React project on time, he will receive the certificate.",
          bn: "স্বদীপ যদি সময়মতো প্রজেক্ট শেষ করে [Adverbial Clause of Condition], সে সার্টিফিকেট পাবে [Principal Clause]।"
        }
      ],
      rule: "'Unless' inherently contains negative meaning (unless = if not). Do NOT use double negatives inside unless clauses."
    },
    concession: {
      name: "Concession / Contrast (স্বীকারোক্তি / বৈসাদৃশ্য)",
      question: "In spite of what?",
      connectors: "although, though, even though, even if, while, whereas, however",
      examples: [
        {
          clause: "Although he faced severe financial constraints,",
          clauseRole: "Adverbial Clause of Concession / Contrast",
          suffix: "he completed his engineering degree with distinction.",
          suffixRole: "Principal Clause",
          full: "Although he faced severe financial constraints, he completed his engineering degree with distinction.",
          bn: "যদিও তিনি তীব্র আর্থিক সংকটের মুখোমুখি হয়েছিলেন [Adverbial Clause of Concession], তবুও তিনি সুনামের সাথে ডিগ্রি সম্পন্ন করেছিলেন [Principal Clause]।"
        }
      ],
      rule: "Expresses an unexpected contrast or concession against all odds."
    },
    comparison: {
      name: "Comparison / Degree (তুলনামূলক)",
      question: "To what extent / degree?",
      connectors: "than, as... as, so... as, the... the",
      examples: [
        {
          clause: "The higher you elevate your coding standards,",
          clauseRole: "Adverbial Clause of Proportional Comparison",
          suffix: "the cleaner your software architecture becomes.",
          suffixRole: "Principal Clause ('the... the')",
          full: "The higher you elevate your coding standards, the cleaner your software architecture becomes.",
          bn: "তুমি তোমার কোডিং মান যতটা উন্নত করবে [Adverbial Clause of Comparison], তোমার আর্কিটেকচার ততটাই পরিচ্ছন্ন হবে [Principal Clause]।"
        },
        {
          prefix: "Swadeep solves algorithms faster",
          prefixRole: "Principal Clause",
          clause: "than his peers do.",
          clauseRole: "Adverbial Clause of Degree / Comparison",
          full: "Swadeep solves algorithms faster than his peers do.",
          bn: "স্বদীপ তার সহপাঠীদের চেয়ে দ্রুত অ্যালগরিদম সমাধান করে [Adverbial Clause of Comparison]।"
        }
      ],
      rule: "Comparative clauses with 'than' or 'as' allow flexible tenses based on intended temporal logic."
    },
    manner: {
      name: "Manner (রীতিসূচক / প্রণালীসূচক)",
      question: "In what manner / how?",
      connectors: "as, as if, as though (subjunctive were), like",
      examples: [
        {
          prefix: "He explained the complex theorem",
          prefixRole: "Principal Clause",
          clause: "as though he had discovered it himself.",
          clauseRole: "Adverbial Clause of Manner (Unreal/Hypothetical)",
          full: "He explained the complex theorem as though he had discovered it himself.",
          bn: "তিনি জটিল উপপাদ্যটি ব্যাখ্যা করেছিলেন [Principal Clause] যেন তিনি নিজেই তা আবিষ্কার করেছিলেন [Adverbial Clause of Manner]।"
        }
      ],
      rule: "'As if' and 'as though' describing hypothetical situations take subjunctive 'were' or Past Perfect 'had + V3'."
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.35s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-purple-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Segment 8 • Module 007.002 • Clause Architecture
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Clause Analysis: Noun, Relative & Adverb Clauses
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the complete anatomy of complex sentences: the <span className="text-purple-400 font-semibold">5 Syntactic Roles of Noun Clauses</span>, the <span className="text-sky-400 font-semibold">Defining vs Non-Defining Relative spectrum</span>, and the <span className="text-emerald-400 font-semibold">9-Class Adverbial taxonomy</span> with rich bilingual diagnostics.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(!showBengali)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                showBengali
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              <span>{showBengali ? "Bengali Explanations ON" : "বাংলা ব্যাখ্যা দেখুন (Bengali Help)"}</span>
            </button>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-xl bg-purple-950/40 border border-purple-600/40 text-purple-200 text-sm leading-relaxed animate-fade-in">
              <p className="font-semibold text-purple-300 mb-1">💡 বাংলা গাইড (Clause Architecture Guide):</p>
              একটি বাক্যে যতগুলি Finite Verb থাকবে ঠিক ততগুলি Clause থাকবে। Subordinate Clause মূলত ৩ প্রকার: Noun Clause (যা বাক্যে Subject, Object, Preposition Object, Complement বা Apposition হিসেবে বসে), Adjective/Relative Clause (যা পূর্ববর্তী Noun-এর গুণ প্রকাশ করে), এবং Adverbial Clause (যা সময়, স্থান, কারণ, উদ্দেশ্য, ফলাফল, শর্ত ইত্যাদি ৯টি প্রেক্ষিতে ক্রিয়াকে বিশেষিত করে)।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* SYNTACTIC CROSS-REFERENCE MATRIX                                          */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Grammar Nexus: Interconnected Chapter Cross-References</h3>
              <p className="text-xs text-slate-300">Quickly navigate to connected grammar foundation topics</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/english-grammar/topic/004_008_tense-synergy-sequence-of-tenses-and-aspectual-harmony/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Sequence of Tenses Rules</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/005_005_the-subjunctive-mood-and-conditional-sentences/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Conditional Sentences</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/003_004_adverb-inversion-and-negative-fronting/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Adverb Inversion</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/007_001_conjunctions-and-syntactic-coordination/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Conjunctions Chapter</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: SENTENCE ANATOMY & CLAUSE DISSECTOR                         */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Sentence vs Clause Architecture & Dissector</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding the Golden Invariant: Number of Clauses = Number of Finite Verbs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300">
                PHRASE (শব্দগুচ্ছ)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                A group of words <strong>without a finite verb</strong> (a verb bound by tense, person, and number) that functions as a single part of speech (e.g. <em>"in the early morning"</em>, <em>"with great courage"</em>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">
                CLAUSE (উপবাক্য / খণ্ডবাক্য)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                A syntactic unit containing its <strong>own Subject and its own Finite Verb</strong> forming part of a larger sentence (e.g. <em>"...because he was ill"</em>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                SENTENCE (পূর্ণাঙ্গ বাক্য)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                A grammatically complete and independent expression containing at least one Principal Clause with complete meaning.
              </p>
            </div>
          </div>

          {/* Dedicated Finite Verb Spotlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-amber-300">
                  What is a Finite Verb? (সমাপিকা ক্রিয়া কী?)
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/english-grammar/topic/004_001_verb-classification-and-characteristics/0"
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span>Explore Module 004.001 (Verb Classification & Finite Verbs)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/english-grammar/topic/005_003_non-finite-verbs-the-infinitive/0"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span>Module 005.003 (Non-Finites)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-1.5">
                <p>
                  <strong>• Finite Verb (সমাপিকা ক্রিয়া):</strong> A verb that is <em>limited/bound</em> by the <strong>Tense</strong> of the sentence and the <strong>Person & Number</strong> of its Subject. It can independently anchor a clause:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-amber-300 space-y-0.5">
                  <p>✓ He <span className="text-emerald-400 font-bold">writes</span> code daily. (Present, 3rd Sing)</p>
                  <p>✓ They <span className="text-emerald-400 font-bold">wrote</span> code yesterday. (Past, 3rd Plural)</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <p>
                  <strong>• Non-Finite Verb (অসমাপিকা ক্রিয়া):</strong> Verbs that do <em>NOT</em> change with tense or person (Infinitives: <em>to write</em>, Gerunds: <em>writing</em>, Participles: <em>written</em>). They <strong>cannot</strong> form a clause by themselves:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-slate-400 space-y-0.5">
                  <p>• He wants <span className="text-sky-300 font-bold">to write</span> code. ('to write' is Non-Finite)</p>
                  <p>• <span className="text-sky-300 font-bold">Hearing</span> the noise, he woke up. ('Hearing' is Participle)</p>
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-600/30 text-xs text-amber-200 leading-relaxed">
                <strong>💡 বাংলা সহজ সংজ্ঞা:</strong> সমাপিকা ক্রিয়া (Finite Verb) হলো সেই ক্রিয়া যা বাক্যের Subject-এর Person (পুরুষ), Number (বচন) এবং Tense (কাল)-এর পরিবর্তনে নিজের রূপ পরিবর্তন করে এবং বাক্যের অর্থ সমাপ্ত করে। বাক্যে যতগুলি Finite Verb থাকে, বাক্যে ঠিক ততগুলি Clause থাকে। অপরদিকে অসমাপিকা ক্রিয়া (Non-Finite Verb যেমন to read, reading) কখনো একা কোনো Clause তৈরি করতে পারে না।
              </div>
            )}
          </div>

          {/* Interactive Clause Dissector */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>Interactive Complex Sentence Dissector</span>
              </h3>
              <div className="flex gap-2">
                {sampleDissections.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSentenceIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedSentenceIndex === idx
                        ? "bg-purple-600 text-white"
                        : "bg-slate-900 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Sample {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <p className="text-base sm:text-lg font-semibold text-white">
                "{sampleDissections[selectedSentenceIndex].sentence}"
              </p>
              {showBengali && (
                <p className="text-xs text-amber-300 border-t border-slate-800 pt-2">
                  🇧🇩 <strong>অনুবাদ:</strong> {sampleDissections[selectedSentenceIndex].bn}
                </p>
              )}

              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-xs text-slate-400 font-semibold">Identified Finite Verbs:</span>
                {sampleDissections[selectedSentenceIndex].finiteVerbs.map((v, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-xs font-mono bg-sky-950 text-sky-300 border border-sky-800">
                    {v}
                  </span>
                ))}
                <span className="text-xs font-mono font-bold text-emerald-400 ml-auto">
                  Total Clauses: {sampleDissections[selectedSentenceIndex].clauseCount}
                </span>
              </div>

              {/* V5 & Verb Form Notation Key */}
              <div className="p-3 rounded-xl bg-slate-950/90 border border-sky-500/20 text-xs space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-sky-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    Verb Notation Key: What is V5?
                  </span>
                  <a
                    href="/english-grammar/topic/004_002_regular-vs-irregular-verbs-and-conjugation-mechanics/0"
                    className="text-[11px] text-sky-400 hover:text-sky-300 underline font-medium inline-flex items-center gap-1"
                  >
                    <span>Module 004.002 (5 Conjugation Forms)</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-[11px] text-slate-300 pt-1">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-sky-400">V1:</strong> Base / Plural (<em>know</em>)
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-purple-400">V2:</strong> Past Simple (<em>knew</em>)
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-amber-400">V3:</strong> Past Participle (<em>known</em>)
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-400">V4:</strong> Participle -ing (<em>knowing</em>)
                  </div>
                  <div className="p-1.5 rounded bg-sky-950/80 border border-sky-500/40 text-sky-200">
                    <strong className="text-sky-300">V5:</strong> 3rd Sing -s/-es (<em>knows</em>)
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                  <strong className="text-sky-300">V5 Definition:</strong> The <strong>Third-Person Singular Simple Present</strong> form of a verb formed by adding <em>-s / -es / -ies</em> to the base verb (e.g. <em>know → knows</em>, <em>bring → brings</em>, <em>go → goes</em>) when used with singular subjects (<em>He, She, It, Swadeep</em>).
                  {showBengali && (
                    <span className="block text-amber-300/90 pt-1 border-t border-slate-800/80 mt-1">
                      🇧🇩 <strong>বাংলায় V5:</strong> Present Indefinite Tense-এ Subject যখন 3rd Person Singular Number (যেমন Swadeep, He, She, It) হয়, তখন মূল Verb (V1)-এর সাথে <strong>-s / -es / -ies</strong> যুক্ত হয়ে যে রূপ গঠন করে তাকে <strong>V5</strong> বলা হয়।
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {sampleDissections[selectedSentenceIndex].clauses.map((c, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px] block sm:inline mr-2">
                      [{c.type}]:
                    </span>
                    <span className="font-mono text-white font-semibold">"{c.text}"</span>
                  </div>
                  <span className="text-slate-400 font-medium sm:text-right">
                    {c.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE 3 CLAUSE FAMILIES WORKBENCH                             */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Boxes className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-xl font-bold text-white">2. Deep-Dive Subordinate Clause Studio</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Master the definitions, structural formulas, diagnostic tests, and connectives across all 3 Subordinate Clause families.
                </p>
              </div>
            </div>

            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveClauseClass("noun")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeClauseClass === "noun"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Noun Clauses (5 Roles)
              </button>
              <button
                onClick={() => setActiveClauseClass("relative")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeClauseClass === "relative"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Relative Clauses (Defining vs Non-Defining)
              </button>
              <button
                onClick={() => setActiveClauseClass("adverb")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeClauseClass === "adverb"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Adverbial Clauses (9 Types)
              </button>
            </div>
          </div>

          {/* Master Subordinate Architecture Primer Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <GitMerge className="w-4 h-4 text-indigo-400" />
                Fundamental Concept: What is a Subordinate Clause? (আশ্রিত খণ্ডবাক্য কী?)
              </h3>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950 px-2.5 py-0.5 rounded border border-purple-800">
                Formula: [Subordinating Conjunction / Relative Word] + Subject + Finite Verb
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A <strong>Subordinate (Dependent) Clause</strong> is a clause that has its own Subject and Finite Verb, but <strong>cannot stand alone</strong> as a complete grammatical sentence. It depends upon the Principal (Independent) Clause to fulfill its syntactic meaning. Subordinate clauses are classified entirely by the part of speech they replace:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className={`p-2.5 rounded-lg border ${activeClauseClass === "noun" ? "bg-purple-950/60 border-purple-500/50" : "bg-slate-900 border-slate-800"}`}>
                <strong className="text-purple-300">1. Noun Clause:</strong> Acts as a Noun (Subject, Object, Complement, Apposition). Answers <em>"What? / Who?"</em>.
              </div>
              <div className={`p-2.5 rounded-lg border ${activeClauseClass === "relative" ? "bg-sky-950/60 border-sky-500/50" : "bg-slate-900 border-slate-800"}`}>
                <strong className="text-sky-300">2. Adjective (Relative) Clause:</strong> Modifies an Antecedent Noun. Answers <em>"Which one? / What kind of?"</em>.
              </div>
              <div className={`p-2.5 rounded-lg border ${activeClauseClass === "adverb" ? "bg-emerald-950/60 border-emerald-500/50" : "bg-slate-900 border-slate-800"}`}>
                <strong className="text-emerald-300">3. Adverbial Clause:</strong> Modifies a Verb/Adj/Adverb. Answers <em>"When? Where? Why? How? Condition?"</em>.
              </div>
            </div>
          </div>

          {/* =================== NOUN CLAUSES TAB =================== */}
          {activeClauseClass === "noun" && (
            <div className="space-y-6 animate-fade-in">
              {/* Noun Clause Deep-Dive Definition & Connectives */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-purple-400" />
                    What is a Noun Clause? (বিশেষ্য খণ্ডবাক্য কী?)
                  </span>
                  <span className="font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Diagnostic Test: Replace Clause with "IT" or "SOMETHING"
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  A <strong>Noun Clause</strong> is a subordinate clause that performs the exact grammatical function of a Noun or Noun Phrase in a sentence. It can be the Subject of a verb, the Object of a transitive verb, the Object of a preposition, a Subject Complement, or in Apposition to an abstract noun.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 flex-wrap text-slate-300">
                  <span className="font-semibold text-slate-400">Trigger Connectives:</span>
                  <span className="font-mono text-purple-300">that, whether, if, what, whatever, who, whoever, whom, whose, which, where, when, why, how</span>
                </div>
                {showBengali && (
                  <p className="text-amber-200/90 pt-1 border-t border-slate-800">
                    🇧🇩 <strong>বাংলায় সংজ্ঞা:</strong> যে Subordinate Clause বাক্যে কোনো Noun-এর মতো কাজ করে (অর্থাৎ ক্রিয়ার Subject, Transitive Verb-এর Object, Preposition-এর Object, Linking Verb-এর Complement বা কোনো Noun-এর Apposition হিসেবে বসে) তাকে Noun Clause বলা হয়।
                  </p>
                )}
              </div>

              {/* Noun Role Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.keys(nounRoles).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedNounRole(key)}
                    className={`p-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedNounRole === key
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-md ring-1 ring-purple-500/30"
                        : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {key.replace("_", " ")}
                  </button>
                ))}
              </div>

              {/* Active Role Card */}
              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                  <h3 className="font-bold text-white text-base">
                    {nounRoles[selectedNounRole].title}
                  </h3>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                    Syntactic Blueprint: {selectedNounRole === "subject" ? "[Noun Clause] + Verb" : selectedNounRole === "object" ? "Verb + [Noun Clause]" : selectedNounRole === "prep_object" ? "Preposition + [Noun Clause]" : selectedNounRole === "complement" ? "Linking Verb + [Noun Clause]" : "Abstract Noun + [that + Clause]"}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Worked Model Sentences with Explicit Clause Markings:</span>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                      Purple Box = Subordinate Noun Clause
                    </span>
                  </span>

                  {nounRoles[selectedNounRole].examples.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                      {/* Visual Clause Decomposition Pills */}
                      <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-mono">
                        {item.prefix && (
                          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-white font-mono">"{item.prefix}"</span>
                            {item.prefixRole && (
                              <span className="text-[10px] uppercase font-sans text-slate-400 font-semibold sm:border-l sm:border-slate-700 sm:pl-1.5">
                                {item.prefixRole}
                              </span>
                            )}
                          </span>
                        )}

                        {item.clause && (
                          <span className="px-3 py-1.5 rounded-lg bg-purple-950/80 text-purple-200 border-2 border-purple-500 shadow-md shadow-purple-900/30 flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-purple-100 font-mono">[{item.clause}]</span>
                            <span className="text-[10px] uppercase font-sans text-purple-300 font-bold bg-purple-900/90 px-1.5 py-0.5 rounded border border-purple-400">
                              ★ {item.clauseRole}
                            </span>
                          </span>
                        )}

                        {item.suffix && (
                          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-white font-mono">"{item.suffix}"</span>
                            {item.suffixRole && (
                              <span className="text-[10px] uppercase font-sans text-sky-400 font-semibold sm:border-l sm:border-slate-700 sm:pl-1.5">
                                {item.suffixRole}
                              </span>
                            )}
                          </span>
                        )}
                      </div>

                      {/* Full Sentence & Bengali note */}
                      <div className="text-xs text-slate-400 space-y-0.5 pt-2 border-t border-slate-800/80">
                        <p className="text-slate-300 font-sans">
                          <strong className="text-slate-400">Complete Sentence:</strong> "{item.full}"
                        </p>
                        {showBengali && (
                          <p className="text-amber-300/90 font-sans">
                            🇧🇩 <strong>বাংলা বিশ্লেষণ:</strong> {item.bn}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-semibold block mb-1">Syntactic Breakdown & Meaning:</span>
                    <p className="text-slate-300">{nounRoles[selectedNounRole].analysis}</p>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-emerald-400 font-semibold block mb-1">Diagnostic Verification Test:</span>
                    <p className="text-slate-300">{nounRoles[selectedNounRole].diagnosticTest}</p>
                  </div>
                </div>

                {showBengali && (
                  <div className="p-3.5 bg-emerald-950/30 rounded-xl text-xs text-emerald-200 border border-emerald-800/40">
                    <strong>বাংলা নিয়ম ও বিশ্লেষণ:</strong> {nounRoles[selectedNounRole].bnNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================== RELATIVE CLAUSES TAB =================== */}
          {activeClauseClass === "relative" && (
            <div className="space-y-6 animate-fade-in">
              {/* Relative Clause Architecture & Antecedent Primer */}
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    What is an Adjective (Relative) Clause? (বিশেষণ খণ্ডবাক্য কী?)
                  </span>
                  <span className="font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                    Rule: Must follow an Antecedent Noun / Pronoun
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  An <strong>Adjective (Relative) Clause</strong> is a subordinate clause that modifies an immediately preceding Noun or Pronoun called its <strong>Antecedent (পূর্ববর্তী বিশেষ্য/সর্বনাম)</strong>. It qualifies the antecedent by answering <em>"Which one?"</em> or <em>"What kind of person/thing?"</em>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <strong className="text-sky-300">Relative Pronouns:</strong> <em>who</em> (subject-person), <em>whom</em> (object-person), <em>whose</em> (possessive), <em>which</em> (things), <em>that</em> (restrictive persons/things).
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <strong className="text-amber-300">Relative Adverbs:</strong> <em>where</em> (place antecedent), <em>when</em> (time antecedent), <em>why</em> (reason antecedent).
                  </div>
                </div>
                {showBengali && (
                  <p className="text-amber-200/90 pt-1 border-t border-slate-800">
                    🇧🇩 <strong>বাংলায় সংজ্ঞা:</strong> যে Subordinate Clause বাক্যের কোনো Noun বা Pronoun (যাকে Antecedent বলে)-এর পাশে বসে Adjective-এর মতো তার দোষ, গুণ বা পরিচয় প্রকাশ করে তাকে Adjective বা Relative Clause বলা হয়।
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedRelativeType("defining")}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                    selectedRelativeType === "defining"
                      ? "bg-sky-600 text-white border-sky-500 shadow-md"
                      : "bg-slate-950/60 text-slate-400 border-slate-800"
                  }`}
                >
                  Defining (Restrictive Relative)
                </button>
                <button
                  onClick={() => setSelectedRelativeType("non_defining")}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                    selectedRelativeType === "non_defining"
                      ? "bg-amber-600 text-white border-amber-500 shadow-md"
                      : "bg-slate-950/60 text-slate-400 border-slate-800"
                  }`}
                >
                  Non-Defining (Parenthetical Relative)
                </button>
              </div>

              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                  <h3 className="font-bold text-white text-base">
                    {relativeTypes[selectedRelativeType].title}
                  </h3>
                  <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20">
                    {relativeTypes[selectedRelativeType].status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-semibold">Punctuation Rule:</span>
                    <div className="text-amber-300 font-bold mt-1">{relativeTypes[selectedRelativeType].commas}</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-semibold">Permitted Pronouns:</span>
                    <div className="text-sky-300 font-bold mt-1">{relativeTypes[selectedRelativeType].pronouns}</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-semibold">Pronoun Omission (Contact Clause):</span>
                    <div className="text-emerald-300 font-bold mt-1">{relativeTypes[selectedRelativeType].omission}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Canonical Exam Examples with Antecedent & Relative Clause Highlighting:</span>
                    <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                      Yellow = Antecedent | Blue Box = Relative Clause
                    </span>
                  </span>

                  {relativeTypes[selectedRelativeType].examples.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                      <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-mono">
                        {item.prefix && (
                          <span className="px-3 py-1.5 rounded-lg bg-amber-950/40 text-amber-200 border border-amber-500/50 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-amber-100 font-mono">"{item.prefix}"</span>
                            <span className="text-[10px] uppercase font-sans text-amber-300 font-bold bg-amber-900/80 px-1.5 py-0.5 rounded border border-amber-600/60">
                              ★ {item.prefixRole}
                            </span>
                          </span>
                        )}

                        {item.clause && (
                          <span className="px-3 py-1.5 rounded-lg bg-sky-950/80 text-sky-200 border-2 border-sky-500 shadow-md shadow-sky-900/30 flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-sky-100 font-mono">[{item.clause}]</span>
                            <span className="text-[10px] uppercase font-sans text-sky-300 font-bold bg-sky-900/90 px-1.5 py-0.5 rounded border border-sky-400">
                              ★ {item.clauseRole}
                            </span>
                          </span>
                        )}

                        {item.suffix && (
                          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-white font-mono">"{item.suffix}"</span>
                            {item.suffixRole && (
                              <span className="text-[10px] uppercase font-sans text-slate-400 font-semibold sm:border-l sm:border-slate-700 sm:pl-1.5">
                                {item.suffixRole}
                              </span>
                            )}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 space-y-0.5 pt-2 border-t border-slate-800/80">
                        <p className="text-slate-300 font-sans">
                          <strong className="text-slate-400">Complete Sentence:</strong> "{item.full}"
                        </p>
                        {showBengali && (
                          <p className="text-amber-300/90 font-sans">
                            🇧🇩 <strong>বাংলা বিশ্লেষণ:</strong> {item.bn}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comma semantic difference box */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-xs space-y-2">
                  <span className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Crucial Exam Trap: Semantic Distinction Created by Commas
                  </span>
                  <div className="space-y-1 text-slate-300">
                    <p>• <strong>Without Commas (Defining):</strong> <em>"My brother who lives in London is an engineer."</em> → Implies I have multiple brothers; specifically the London one is an engineer.</p>
                    <p>• <strong>With Commas (Non-Defining):</strong> <em>"My brother, who lives in London, is an engineer."</em> → Implies I have only ONE brother; the London detail is just extra parenthetical info.</p>
                  </div>
                </div>

                {showBengali && (
                  <div className="p-3.5 bg-emerald-950/30 rounded-xl text-xs text-emerald-200 border border-emerald-800/40">
                    <strong>বাংলা ব্যাখ্যা:</strong> {relativeTypes[selectedRelativeType].bnNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================== ADVERBIAL CLAUSES TAB =================== */}
          {activeClauseClass === "adverb" && (
            <div className="space-y-6 animate-fade-in">
              {/* Adverbial Clause Primer */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    What is an Adverbial Clause? (ক্রিয়া-বিশেষণীয় খণ্ডবাক্য কী?)
                  </span>
                  <span className="font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    9 Distinct Functional Spectra
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  An <strong>Adverbial Clause</strong> is a subordinate clause that modifies a Verb, an Adjective, or another Adverb in the Principal Clause. It contextualizes the circumstances of the main action by answering questions like <em>When? Where? Why? For what purpose? With what result? On what condition? In spite of what? How?</em>
                </p>
                {showBengali && (
                  <p className="text-amber-200/90 pt-1 border-t border-slate-800">
                    🇧🇩 <strong>বাংলায় সংজ্ঞা:</strong> যে Subordinate Clause বাক্যের মূল Verb, Adjective বা অন্য কোনো Adverb-কে বিশেষিত করে (সময়, স্থান, কারণ, উদ্দেশ্য, ফলাফল, শর্ত, বৈসাদৃশ্য, তুলনা বা রীতি নির্দেশ করে) তাকে Adverbial Clause বলা হয়।
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {Object.keys(advTypes).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAdvType(key)}
                    className={`p-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedAdvType === key
                        ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40"
                        : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {advTypes[key].name.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                  <h3 className="font-bold text-white text-base">
                    Adverbial Clause of {advTypes[selectedAdvType].name}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    Diagnostic Question: Answers "{advTypes[selectedAdvType].question}"
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider">Trigger Subordinating Conjunctions:</span>
                  <p className="font-mono text-emerald-300 font-semibold">
                    {advTypes[selectedAdvType].connectors}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Canonical Model Sentences with Explicit Clause Markings:</span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      Green Box = Adverbial Clause
                    </span>
                  </span>

                  {advTypes[selectedAdvType].examples.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                      <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-mono">
                        {item.prefix && (
                          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-white font-mono">"{item.prefix}"</span>
                            {item.prefixRole && (
                              <span className="text-[10px] uppercase font-sans text-slate-400 font-semibold sm:border-l sm:border-slate-700 sm:pl-1.5">
                                {item.prefixRole}
                              </span>
                            )}
                          </span>
                        )}

                        {item.clause && (
                          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-200 border-2 border-emerald-500 shadow-md shadow-emerald-900/30 flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-emerald-100 font-mono">[{item.clause}]</span>
                            <span className="text-[10px] uppercase font-sans text-emerald-300 font-bold bg-emerald-900/90 px-1.5 py-0.5 rounded border border-emerald-400">
                              ★ {item.clauseRole}
                            </span>
                          </span>
                        )}

                        {item.suffix && (
                          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-white font-mono">"{item.suffix}"</span>
                            {item.suffixRole && (
                              <span className="text-[10px] uppercase font-sans text-slate-400 font-semibold sm:border-l sm:border-slate-700 sm:pl-1.5">
                                {item.suffixRole}
                              </span>
                            )}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 space-y-0.5 pt-2 border-t border-slate-800/80">
                        <p className="text-slate-300 font-sans">
                          <strong className="text-slate-400">Complete Sentence:</strong> "{item.full}"
                        </p>
                        {showBengali && (
                          <p className="text-amber-300/90 font-sans">
                            🇧🇩 <strong>বাংলা বিশ্লেষণ:</strong> {item.bn}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-amber-950/20 rounded-xl border border-amber-500/30 text-xs text-amber-200 space-y-1">
                  <strong className="block text-amber-300">Syntactic Rule & Exam Invariant:</strong>
                  <p>{advTypes[selectedAdvType].rule}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. CLASSROOM BREAKDOWN WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/30 rounded-2xl border border-indigo-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-indigo-900/50 pb-4">
            <Teacher />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-purple-400">Swadeep (Student from Barrackpore): </span>
              <p>"Sir, why is 'that' sometimes a Relative Pronoun in an Adjective Clause, and at other times a Subordinating Conjunction in a Noun Clause in Apposition? How do we avoid getting confused in exams?"</p>
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40 space-y-2">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              <p>
                "This is one of the highest-yield diagnostic questions in English grammar. Apply the <strong>Which-Replacement Diagnostic</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>
                  <strong>Case 1: Adjective (Relative) Clause:</strong> 'THAT' is a Relative Pronoun referring back to the antecedent noun. You can replace 'THAT' with 'WHICH':<br />
                  <em>"The report [THAT / WHICH he prepared] was accurate."</em> (Here, 'he prepared the report' → 'that' acts as object within the clause).
                </li>
                <li>
                  <strong>Case 2: Noun Clause in Apposition:</strong> 'THAT' is a pure Conjunction introducing the internal fact or statement of the noun. You CANNOT replace 'THAT' with 'WHICH':<br />
                  <em>"The report [THAT he had resigned] was false."</em> (He did not 'prepare' the report; the report IS that he resigned).
                </li>
              </ul>
              {showBengali && (
                <div className="mt-2 p-2.5 rounded-lg bg-emerald-950/40 text-emerald-200 text-xs border border-emerald-800/40">
                  <strong>💡 বাংলা টিপ:</strong> যদি 'that'-এর বদলে 'which' বসানো যায় এবং তা পূর্ববর্তী Noun-কে নির্দেশ করে, তবে তা Adjective Clause। আর যদি 'that' দ্বারা Noun-এর ভেতরের তথ্য বা বিবৃতি হুবহু বোঝায় এবং 'which' বসানো না যায়, তবে তা Noun Clause in Apposition।
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB (25 QUESTIONS)                      */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic clause parsing and syntactic role problems.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/20">
                {Object.keys(userAnswers).length} / {questions.length} Attempted
              </span>
              {submitted && (
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Quiz</span>
                </button>
              )}
            </div>
          </div>

          {/* Submission Score Banner */}
          {submitted && (
            <div className="p-5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-600 text-white font-black text-lg">
                  {calculateScore()} / {questions.length}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">
                    Score: {((calculateScore() / questions.length) * 100).toFixed(0)}%
                  </h4>
                  <p className="text-xs text-slate-300">
                    {calculateScore() >= 20
                      ? "Outstanding! You have mastered Clause Architecture & Syntactic Roles."
                      : "Good effort! Review the technical and Bengali explanations below."}
                  </p>
                </div>
              </div>
              <button
                onClick={resetQuiz}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md"
              >
                Retake Diagnostic Drill
              </button>
            </div>
          )}

          <div className="space-y-6">
            {questions.map((q) => {
              const selected = userAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctAnswer;
              const isExpanded = revealedExplanations[q.id] || submitted;

              return (
                <div
                  key={q.id}
                  className="bg-slate-950/60 rounded-xl border border-slate-800/80 p-5 space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-200">
                      <span className="text-purple-400 mr-2 font-bold">Q{q.id}.</span>
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, idx) => {
                      const isThisSelected = selected === opt;
                      const isThisCorrect = opt === q.correctAnswer;

                      let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";
                      if (submitted || isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold";
                        } else if (isThisSelected) {
                          btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "bg-slate-900/40 border-slate-800/50 text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(q.id, opt)}
                          className={`p-3 rounded-lg text-left text-xs sm:text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {(submitted || isAnswered) && isThisCorrect && (
                            <Check className="w-4 h-4 text-emerald-400 ml-2 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {(isAnswered || submitted) && (
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 self-start flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {isExpanded ? "Hide Technical Explanation" : "View Technical Explanation & Bangla Note"}
                      </button>

                      {isExpanded && (
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300 animate-fade-in">
                          <div>
                            <span className="text-emerald-400 font-semibold">Explanation: </span>
                            {q.explanation}
                          </div>
                          {(showBengali || true) && q.explanationBn && (
                            <div className="text-slate-400 border-t border-slate-800/80 pt-2">
                              <span className="text-sky-400 font-semibold">বাংলা ব্যাখ্যা: </span>
                              {q.explanationBn}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submitted && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all"
              >
                Submit Answers ({Object.keys(userAnswers).length} / {questions.length} answered)
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 6. AUXILIARY TOOLS: WORD DICTIONARY, PRINTABLE NOTE & FAQS               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <WordDictionary />
          <PlainTextPrint content={noteText} title="Module 007.002 Comprehensive Study Note - Clause Architecture" />
          <FAQTemplate
            faqList={[
              {
                question: "What is a Contact Clause?",
                answer: "A Contact Clause is a defining relative clause where the relative pronoun (whom/which/that) is omitted because it functions as the grammatical object of the clause (e.g., 'The book I bought' instead of 'The book that I bought')."
              },
              {
                question: "Why can't 'that' be used in non-defining relative clauses?",
                answer: "'That' by historical syntax is exclusively a restrictive (defining) relative pronoun in modern standard English. Non-defining clauses require the parenthetical relative pronouns 'who' or 'which' enclosed in commas."
              },
              {
                question: "How can I easily find the number of clauses in a complex sentence?",
                answer: "Count the number of FINITE VERBS. Every finite verb belongs to exactly one clause. Therefore, Number of Clauses = Number of Finite Verbs."
              },
              {
                question: "What is the difference between 'lest' and 'unless'?",
                answer: "'Lest' expresses negative purpose ('with the intention of preventing something') and is followed by 'should + V1' (e.g., 'Study lest you should fail'). 'Unless' expresses negative condition ('if not') and takes an indicative verb (e.g., 'Unless you study, you will fail'). Neither takes a negative word like 'not'."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/007_001_conjunctions-and-syntactic-coordination/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 007_001 (Conjunctions & Coordination)</span>
          </a>

          <a
            href="/english-grammar/topic/007_003_synthesis-of-sentences-combining-ideas/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-950 transition"
          >
            <span>Next: Module 007_003 (Sentence Synthesis)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
