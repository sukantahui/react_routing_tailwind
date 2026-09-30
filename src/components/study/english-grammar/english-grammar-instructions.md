# Master Instructions for English Grammar Tutorial Creation (Master Edition)

- **Repository:** `react_routing_tailwind`
- **Subject:** English Grammar & Functional Composition (Foundations to Advanced Stylistic Mastery)
- **Course Author & Designated Mentor:** **Sukanta Hui** (Senior Mentor & Educator, Coder & AccoTax, Barrackpore, West Bengal, India)
- **Target Audience:** General Learners, Board Students (ICSE, ISC, CBSE, WB Board), Competitive Aspirants (SSC CGL, Banking, WBCS, UPSC, IELTS, TOEFL), and **especially Bengali-medium students transitioning into confident English mastery**.
- **Target Environment:** React 19 + Vite + Tailwind CSS (Node.js v16 Compatible)
- **Primary Classroom Students:** Swadeep, Tuhina, Abhronila, Debangshu
- **Key Regional Centers & Localities:** Barrackpore, Shyamnagar, Ichapur, Naihati, Kolkata
- **Authoritative Roadmap File:** `src/components/study/english-grammar/english-grammar-roadmap.json`

---

## 🌟 SPECIAL DIRECTIVE 1: BILINGUAL SUPPORT & INTERACTIVE LANGUAGE SWITCHER (বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা)

Many students from Bengali-medium backgrounds struggle with English grammar because of fundamental structural differences between Bengali and English syntax (e.g., Subject-Object-Verb vs Subject-Verb-Object, zero-copula sentences, tense aspect mismatches, and auxiliary verb absence).

### Mandatory Language Switcher Button in Every Topic Page
Every single `Topic[N].jsx` **MUST** include an interactive language toggle button in its header:
- **State Management:** `const [showBengali, setShowBengali] = useState(false);`
- **Toggle UI:** A prominent, glowing button allowing the student to toggle Bengali explanations (`English Only` ↔ `বাংলা ব্যাখ্যা দেখুন`).
- **Interactive Behavior When Active (`showBengali === true`):**
  1. **বাংলা সহজ ব্যাখ্যা (Bengali Guidance Card):** Renders a dedicated card with clear Bengali explanations in each major concept section.
  2. **বাংলা ব্যাকরণের সাথে তুলনা (Comparative Grammatical Bridge):** Highlights the similarities and differences between Bengali grammar rules and English grammar rules (যেমন: বাংলা ক্রিয়ার কাল ও বিভক্তি বনাম ইংরেজি Tense & Aspect).
  3. **বাংলা অনুবাদ সতর্কতা (Translation Trap Alerts):** Warns against word-for-word translation errors (L1 interference).
  4. **সহজ ফর্মুলা ও স্মরণীয় টিপস (Bengali Mnemonics & Formulas):** Delivers clear Bengali memory rules and rhymes.

### ⚠️ Mandatory Terminology Rule: Retain Essential English Grammar Terms
When providing Bengali explanations (inside components, guidance cards, warning banners, or `topic[N]_questions.js`), **NEVER translate essential English grammatical terms into obscure or artificial Bengali words**. 
- **Preserve in English:** Keep terms like **Sentence Architecture** (never *"মৌলিক বাক্যরীতি"*), **Parts of Speech**, **Subject**, **Predicate**, **Direct Object**, **Indirect Object**, **Complement**, **Noun**, **Pronoun**, **Verb**, **Adjective**, **Adverb**, **Preposition**, **Conjunction**, **Interjection**, **Tense**, **Simple Present**, **Present Continuous**, **Present Perfect**, **Present Perfect Continuous**, **Voice Change**, **Active Voice**, **Passive Voice**, **Concord**, **Subject-Verb Agreement**, **Stative Verbs**, **Dynamic Verbs**, **Causative Verbs**, **Infinitives**, **Bare Infinitives**, **Gerunds**, **Participles**, **Dangling Modifiers**, **Modal Auxiliaries**, **Clause**, **Phrase**, **Synthesis**, **Transformation**, **Reported Speech**, **Direct/Indirect Speech**, **Subjunctive Mood**, **Inversion**, and **Question Tag** in **English**.
- **Role of Bengali:** Bengali must be used **strictly for natural explanatory flow, grammatical logic, comparative clarity, and practical exam error analysis**.

---

## ⚡ SPECIAL DIRECTIVE 2: THE 8-PILLAR VERB MASTERY FRAMEWORK (ক্রিয়া ও কাল কেন্দ্রিক বিশদ পাঠপদ্ধতি)

Verbs are the powerhouse engine of the English language. Over 90% of grammatical errors made by regional learners stem from verb confusion. Every module and topic involving verbs must thoroughly implement the **8-Pillar Verb Framework**:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                    THE 8-PILLAR VERB MASTERY FRAMEWORK                        │
├───────────────────────────────────────────────────────────────────────────────┤
│ 1. Primary Auxiliaries (Be / Do / Have) & The Zero-Copula Bridge             │
│ 2. The 5 Principal Verb Forms (V1, V2, V3, V4, V5) & Regular/Irregular Roots  │
│ 3. Stative vs Dynamic Verbs & The Bengali Continuous Tense Trap               │
│ 4. The 12-Tense Timeline & Bengali Time-Marker Aspect Mapping                 │
│ 5. Causative Verbs (Make, Have, Let, Get, Help - প্রযোজক ক্রিয়া)              │
│ 6. Non-Finite Triad (Infinitives, Gerunds & Participles - অসমাপিকা ক্রিয়া)     │
│ 7. Active & Passive Voice Transformation (বাচ্য পরিবর্তন)                     │
│ 8. Subject-Verb Concord (The 25 Invariant Rules of Agreement - অন্বয়)        │
└───────────────────────────────────────────────────────────────────────────────┘
```

### 1. Primary Auxiliaries (`Be`, `Do`, `Have`) & The "Missing Verb" Trap
- **The Zero-Copula Problem:** In Bengali, "সে একজন ভালো ছেলে" has no explicit verb. Bengali students mistakenly say *"He a good boy"*.
- **The Rule:** English sentences MUST contain a finite verb. The linking verb `is/are/am/was/were` is mandatory: *"He **is** a good boy"*.
- **The "Do-Support" Mechanism:** Bengali questions ("তুমি কি জানো?") and negatives ("আমি জানি না") do not use extra helping verbs. English mandates do-support: *"**Do** you know?"*, *"I **do not** know"* (Never *"You know?"* as formal question or *"I not know"*).

### 2. The 5 Principal Verb Forms (V1 to V5)
Every verb-centric topic must display the full 5-form conjugation matrix:
- **V1 (Base/Infinitive):** `go`, `write`, `take`, `play`
- **V2 (Simple Past):** `went`, `wrote`, `took`, `played`
- **V3 (Past Participle):** `gone`, `written`, `taken`, `played` (Used with `have/has/had` and in all Passive Voice)
- **V4 (Present Participle / -ing):** `going`, `writing`, `taking`, `playing` (Used with `be` verbs in Continuous Tenses)
- **V5 (3rd Person Singular Present):** `goes`, `writes`, `takes`, `plays` (Used with singular subjects in Simple Present)

### 3. Stative vs Dynamic Verbs (স্থির বনাম গতিশীল ক্রিয়া)
- **The Mistake:** Bengali allows continuous expressions like "আমার একটি গাড়ি আছে" -> students translate *"I am having a car"*, or "আমি বুঝতে পারছি" -> *"I am understanding"*.
- **The Invariant Rule:** Pure stative verbs of **Cognition** (know, believe, understand, remember), **Emotion** (love, hate, like, prefer), **Senses** (see, hear, smell, taste), and **Possession** (have, own, belong, possess) **NEVER** take progressive (-ing) tenses in standard English.
- *Correct:* *"I have a car"*, *"I understand the lesson"*, *"The rose smells sweet"*.

### 4. The 12-Tense Timeline & Bengali Time Mapping
| English Tense | English Formula | Bengali Meaning & Example | Common Bengali Trap to Avoid |
|---|---|---|---|
| **Simple Present** | Subject + V1/V5 | অভ্যাস বা চিরন্তন সত্য: সে যায় (He goes) | Avoid *"He is going daily"* |
| **Present Continuous** | Subject + am/is/are + V4 | এই মুহূর্তে চলছে: সে যাচ্ছে (He is going) | Avoid stative *-ing* |
| **Present Perfect** | Subject + have/has + V3 | কাজটি হয়েছে কিন্তু ফল বিদ্যমান: আমি খেয়েছি (I have eaten) | Avoid with past adverbs (*"I have seen yesterday"*) |
| **Present Perf. Cont.** | Subject + have/has been + V4 + since/for | অতীতে শুরু হয়ে এখনো চলছে: ২ ঘণ্টা ধরে পড়ছে (He has been reading for 2 hours) | Avoid *"He is reading since 2 hours"* |
| **Simple Past** | Subject + V2 | অতীতে নির্দিষ্ট সময়ে শেষ: সে গতকাল এসেছিল (He came yesterday) | Don't use Present Perfect for past time |
| **Past Continuous** | Subject + was/were + V4 | অতীতে কোনো কাজ চলছিল: সে পড়ছিল (He was reading) | Parallel past actions with *while* |
| **Past Perfect** | Subject + had + V3 | অতীতের দুটি কাজের মধ্যে যেটি আগে ঘটেছিল: ডাক্তার আসার পূর্বে (The train had left before I reached) | Don't use Past Perfect for single past actions |
| **Past Perf. Cont.** | Subject + had been + V4 | অতীতে কোনো নির্দিষ্ট সময় পর্যন্ত চলছিল (He had been studying) | Duration leading up to a past moment |
| **Simple Future** | Subject + will/shall + V1 | ভবিষ্যতে ঘটবে: সে যাবে (He will go) | Don't use *will* inside *If/When* clauses |
| **Future Continuous** | Subject + will be + V4 | ভবিষ্যতে কোনো কাজ চলতে থাকবে (He will be traveling) | Future progressive action |
| **Future Perfect** | Subject + will have + V3 | ভবিষ্যতের নির্দিষ্ট সময়ের মধ্যে শেষ হবে: আগামী সোমবারের মধ্যে (He will have finished by Monday) | Preposition *by* + deadline |
| **Future Perf. Cont.** | Subject + will have been + V4 | ভবিষ্যতের কোনো সময় পর্যন্ত কাজ চলতে থাকবে | Rare duration in future |

### 5. Causative Verbs (প্রযোজক ক্রিয়া - নিজে না করে অন্যকে দিয়ে করানো)
- Bengali: "তিনি আমাকে দিয়ে চিঠিটি লেখালেন" -> English Causative:
  - Active: *"He **made** me **write** the letter."* (Bare infinitive after *make*!)
  - Active: *"He **had** me **write** the letter."*
  - Active: *"He **got** me **to write** the letter."* (To-infinitive after *get*!)
  - Passive: *"He had the letter **written**."* (Past participle *V3*!)

### 6. Non-Finite Triad (অসমাপিকা ক্রিয়া)
- **Infinitives:** To + V1 (করতে, যেতে) vs Bare Infinitive (Without 'to' after modals, let, make, bid, see, hear).
- **Gerunds:** V1 + ing functioning as a **Noun** (সাঁতার কাটা ভালো ব্যায়াম -> *"Swimming is good exercise"*). Possessive pronoun rule before gerund: *"I insist on **his** going"*, NOT *"him going"*.
- **Participles:** Verb-Adjectives. Present Participle (চলন্ত ট্রেন -> *"Running train"*), Past Participle (ভাঙা গ্লাস -> *"Broken glass"*), Perfect Participle (কাজটি শেষ করে -> *"Having finished the work"*).
- **Dangling Participle Warning:** *"Being a rainy day, I stayed home"* [WRONG!] -> *"**It being** a rainy day, I stayed home"* [CORRECT!].

### 7. Active & Passive Voice Transformation (বাচ্য পরিবর্তন)
- **Core Formula:** Object -> Subject + Appropriate form of **Be** + **Past Participle (V3)** + By + Agent.
- Must cover: All 8 tenses, Ditransitive verbs (2 objects), Interrogatives (Who -> By whom), Imperatives (Let + Object + be + V3), Prepositional verbs (Keep the preposition!), Quasi-passives (*"Honey is sweet when it is tasted"*), and Impersonal passives (*"It is said that..."*).

### 8. Subject-Verb Concord (কর্তা ও ক্রিয়ার অন্বয় - The 25 Invariant Rules)
- The Rule of Proximity with *Either...or*, *Neither...nor*, *Not only...but also*.
- The Intervening Phrase Rule with *As well as*, *Together with*, *Along with*, *In addition to* (Verb agrees strictly with the FIRST subject).
- Collective nouns, Indefinite pronouns, Plural nouns with singular meanings (*Mathematics*, *News*, *Physics*), and lump sum quantities (*Ten miles is a long distance*).

---

## 1. Directory Structure & File Naming Rules

### A. Roadmap as the Single Source of Truth
- `english-grammar-roadmap.json` is the sole authoritative blueprint for:
  - Segment sequence and titles
  - Module sequence and slugs
  - Topic sequence and topic titles
  - Estimated hours, learning outcomes, and prerequisites
- All topic folders must be created under:
  `src/components/study/english-grammar/topics/`

### B. Module Slug Folder Naming
Every module folder name **MUST strictly match** the slug defined in the roadmap:
- **Format:** `[3-digit-segment]_[3-digit-module]_[descriptive-kebab-slug]`
- **Examples:**
  - `001_001_words-and-the-eight-parts-of-speech-overview`
  - `004_001_verb-classification-and-characteristics`
  - `004_002_subject-verb-agreement-the-twenty-five-rules-of-concord`
  - `004_003_present-tenses-forms-aspects-and-time-markers`
  - `005_001_active-and-passive-voice-complete-mechanics`
  - `005_003_non-finite-verbs-the-infinitive`
  - `007_004_transformation-of-sentences-advanced-rules`
  - `009_003_spotting-errors-and-sentence-correction-lab`

### C. Sequential Topic Files & Companion Folder
For each topic index `N` (`0`, `1`, `2`, ...):
1. Create `Topic[N].jsx` directly inside the module slug folder.
2. Create a subfolder named `topic[N]_files/` containing:
   - `topic[N]_questions.js` — Array of **25 to 30** comprehensive MCQs with both English and Bengali explanations (loaded via `<FAQTemplate>`).
   - `topic[N]_note.txt` — Clean, structured ASCII printable study note with bilingual summary (loaded via `<PlainTextPrint>`).
   - Optional: `[DescriptiveName]Demo.js` or `[GrammarWorkbench].jsx` — Interactive syntax tester.

---

## 2. Complete Component Architecture & Topic[N].jsx Template

Every `Topic[N].jsx` component must follow this exact standard:

```jsx
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
  Check
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* 1. HEADER SECTION WITH BILINGUAL SWITCHER */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Module 004_001
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Topic 0 · Verb Mechanics
              </span>
            </div>

            {/* BENGALI TOGGLE BUTTON */}
            <button
              onClick={() => setShowBengali(!showBengali)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 hover:scale-105 shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              <span>{showBengali ? "🇬🇧 English Only" : "🇧🇩 বাংলা ব্যাখ্যা দেখুন"}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                {showBengali ? "বাংলা চালু" : "বাংলা অফ"}
              </span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Verb Classification: Lexical, Auxiliary, Transitive & Stative
          </h1>
          <p className="text-lg text-slate-400">
            Mastering the dynamic engine of English sentences, helping verbs, and eliminating L1 translation traps.
          </p>

          {/* BENGALI OVERVIEW CARD */}
          {showBengali && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-200 text-sm leading-relaxed animate-fade-in">
              <span className="font-bold text-emerald-300">🇧🇩 পাঠ পরিচিতি (Bengali Summary): </span>
              ক্রিয়া (Verb) হলো যেকোনো ইংরেজি বাক্যের হৃৎপিণ্ড। এই পাঠে আমরা সমাপিকা ক্রিয়া, সাহায্যকারী ক্রিয়া (Be, Do, Have), সকর্মক ও অকর্মক ক্রিয়া এবং স্থির ক্রিয়া (Stative Verb)-এর সঠিক নিয়ম শিখব যা বাংলা মাধ্যম শিক্ষার্থীদের ইংরেজি লেখার ভয় দূর করবে।
            </div>
          )}
        </div>

        {/* 2. CONCEPT OVERVIEW SECTION */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-sky-400" />
            Concept Overview & Logical Foundations
          </h2>
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            A verb is a word that expresses an action, an event, a state of being, or a relation. Unlike nouns which name entities, verbs breathe life and temporal momentum into sentences.
          </p>

          {showBengali && (
            <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-2 animate-fade-in">
              <h3 className="font-bold text-emerald-300 flex items-center gap-2 text-base">
                <span>🇧🇩 বাংলা সহজ ব্যাখ্যা ও ধারণা (Bengali Concept Breakdown):</span>
              </h3>
              <p className="text-sm leading-relaxed text-emerald-100/90">
                বাংলায় অনেক সময় ক্রিয়া উহ্য থাকে (যেমন: "সে অসুস্থ", "আমার কলম আছে")। কিন্তু ইংরেজিতে Verb ছাড়া কোনো পূর্ণাঙ্গ বাক্য তৈরি হতে পারে না ("He is sick", "I have a pen")। তাই Verb-এর সঠিক রূপ নির্বাচন ইংরেজি শেখার সবচেয়ে গুরুত্বপূর্ণ ধাপ।
              </p>
            </div>
          )}
        </section>

        {/* 3. SEMANTIC INSTRUCTIONAL SVG DIAGRAM */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            Visual Architecture & Syntactic Map
          </h2>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-center justify-center">
            {/* Custom Responsive SVG */}
            <svg viewBox="0 0 800 350" className="w-full h-auto max-w-3xl">
              {/* Responsive SVG diagram */}
            </svg>
          </div>
          {showBengali && (
            <p className="text-xs text-emerald-400/90 italic text-center">
              💡 চিত্র পরিচিতি: ডায়াগ্রামের মাধ্যমে Verb-এর বিভিন্ন শাখা ও ক্রিয়ার ৫টি রূপ স্পষ্টভাবে প্রদর্শিত।
            </p>
          )}
        </section>

        {/* 4. DEEP TECHNICAL BREAKDOWN & RULES */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Technical Breakdown, Formulas & Verb Tables
          </h2>

          {/* 5 Principal Forms Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">V1 (Base Form)</th>
                  <th className="px-4 py-3">V2 (Simple Past)</th>
                  <th className="px-4 py-3">V3 (Past Participle)</th>
                  <th className="px-4 py-3">V4 (Present Participle)</th>
                  <th className="px-4 py-3">V5 (3rd Person Singular)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="px-4 py-3 text-sky-400">write</td>
                  <td className="px-4 py-3 text-amber-400">wrote</td>
                  <td className="px-4 py-3 text-emerald-400">written</td>
                  <td className="px-4 py-3 text-violet-400">writing</td>
                  <td className="px-4 py-3 text-rose-400">writes</td>
                </tr>
              </tbody>
            </table>
          </div>

          {showBengali && (
            <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-3 animate-fade-in">
              <h3 className="font-bold text-emerald-300 text-base">
                🇧🇩 বাংলা মাধ্যমের জন্য তুলনামূলক নিয়ম (Comparative Grammatical Rules):
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-emerald-100">
                <li><strong>V3-এর ব্যবহার:</strong> Have/Has/Had-এর পরে এবং সমস্ত Passive Voice-এ সর্বদা V3 ব্যবহৃত হয়।</li>
                <li><strong>V5-এর ব্যবহার:</strong> Subject যদি 3rd Person Singular (He/She/It/নাম) হয়, তবে Simple Present-এ Verb-এর সাথে s/es যুক্ত হয়।</li>
              </ul>
            </div>
          )}
        </section>

        {/* 5. INTERACTIVE GRAMMAR WORKBENCH */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Interactive Grammar Workbench & Sentence Tester
          </h2>
          {/* Interactive Workbench UI */}
        </section>

        {/* 6. COMMON PITFALLS & ERROR DIAGNOSTICS */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            Common Pitfalls & Bengali Translation Traps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 space-y-1">
              <span className="font-bold text-rose-400">❌ Common Bengali Translation Trap:</span>
              <p className="text-sm">"I am knowing the answer." (বাংলা: "আমি উত্তরটা বুঝতে পারছি/জানছি")</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 space-y-1">
              <span className="font-bold text-emerald-400">✓ Correct Standard English:</span>
              <p className="text-sm">"I know the answer." (Stative verb of cognition resists continuous tense)</p>
            </div>
          </div>
        </section>

        {/* 7. THINKING & PROMPTS SECTION */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">Think About This... (চিন্তা করুন)</h2>
          <p className="text-slate-300">
            Why does English allow "I am having dinner" (dynamic action of eating) but forbids "I am having a car" (stative possession)?
          </p>
        </section>

        {/* 8. COMPREHENSIVE FAQ / MCQ TEMPLATE */}
        <FAQTemplate
          title="Diagnostic FAQs & MCQs (প্রশ্নোত্তর ও মূল্যায়ন)"
          questions={questions}
        />

        {/* 9. PLAIN TEXT PRINTABLE NOTE */}
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 0: Verb Classification"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Study Note (TXT)"
          downloadFileName="english_grammar_verb_classification_topic0_note.txt"
        />

        {/* 10. TEACHER'S DESK NOTE */}
        <Teacher
          note="ইংরেজি গ্রামার কোনো মুখস্থ করার বিষয় নয়, এটি বিশুদ্ধ যুক্তি ও শৃঙ্খলার খেলা। বিশেষ করে বাংলা মাধ্যমের ছাত্র-ছাত্রীদের বলব—ক্রিয়ার ৫টি রূপ (V1 to V5) এবং Auxiliary Verb আয়ত্ত করলেই ইংরেজির ভয় চিরতরে দূর হবে। — Sukanta Hui"
        />
      </div>
    </div>
  );
}
```

---

## 3. Auxiliary File Schemas (Enhanced for Bengali Learners)

### A. FAQ / MCQ Question File (`topic[N]_files/topic[N]_questions.js`)
- Must contain **25 to 30** items.
- Every item includes both English and Bengali explanations:

```javascript
const questions = [
  {
    id: 1,
    question: "Which of the following sentences correctly demonstrates the simple present tense for a habitual action?",
    options: [
      "He is going to the school daily.",
      "He goes to school daily.",
      "He has gone to school daily.",
      "He went to school daily in present time."
    ],
    answer: "He goes to school daily.",
    explanation: "Habitual or routine actions in the present must use the Simple Present Tense (V1/V5), not the Present Continuous.",
    explanationBn: "প্রতিদিনের অভ্যাস বা নিয়মিত কাজের ক্ষেত্রে সর্বদা Simple Present Tense (He goes) ব্যবহৃত হয়। বাংলায় 'সে রোজ স্কুলে যায়'—এখানে Present Continuous (is going) ব্যবহার করা ভুল।",
    hint: "Think about routine actions vs actions happening right now.",
    level: "basic"
  },
  // ... 25 to 30 items
];

export default questions;
```

### B. Plain Text Note (`topic[N]_files/topic[N]_note.txt`)
```text
================================================================================
CODER & ACCOTAX - ENGLISH GRAMMAR MASTER ROADMAP
MODULE [SLUG]: [Module Title]
TOPIC [N]: [Topic Title]
Educator: Sukanta Hui | Barrackpore, West Bengal, India
================================================================================

1. CORE RULES & FORMULAS (মূল নিয়ম ও সূত্র)
--------------------------------------------------------------------------------
• Rule 1: ...
• বাংলা অর্থ ও প্রয়োগ: ...

2. BENGALI LEARNER BRIDGE & TRAPS (বাংলা মাধ্যমের সতর্কতা)
--------------------------------------------------------------------------------
[X] ভুল প্রয়োগ: ...
[✓] সঠিক প্রয়োগ: ...
কারণ: ...

3. ESSENTIAL REVISION CHECKLIST
--------------------------------------------------------------------------------
[✓] Point 1
[✓] Point 2
================================================================================
```

---

## 4. Master Module Registry (All 10 Segments, 38 Modules)

| Segment | Module Slug | Module Title | Level |
|---|---|---|---|
| **Seg 1** | `001_001_words-and-the-eight-parts-of-speech-overview` | Words & The Eight Parts of Speech Overview | Beginner |
| | `001_002_sentence-anatomy-subject-predicate-and-objects` | Sentence Anatomy: Subject, Predicate, Objects & Complements | Beginner |
| | `001_003_classification-of-sentences-by-purpose-and-mood` | Classification of Sentences by Purpose & Communicative Mood | Beginner |
| | `001_004_phrases-vs-clauses-and-sentence-transformation-basics` | Phrases vs Clauses & Foundational Sentence Transformations | Beginner |
| **Seg 2** | `002_001_noun-classification-number-and-irregular-plurals` | Noun Classification, Number Invariants & Irregular Plurals | Beginner |
| | `002_002_noun-gender-cases-and-the-possessive-apostrophe` | Noun Gender, Cases & The Possessive Apostrophe Mechanics | Beginner-Int |
| | `002_003_pronoun-classification-and-case-harmony` | Pronoun Classification, Antecedent Harmony & Politeness Order | Intermediate |
| | `002_004_articles-and-quantifying-determiners` | Articles (A, An, The), Zero Article & Quantifying Determiners | Intermediate |
| **Seg 3** | `003_001_adjective-types-positioning-and-order` | Adjective Classification, Positioning & Royal Order (OSASCOMP) | Intermediate |
| | `003_002_degrees-of-comparison-and-transformation` | Degrees of Comparison: Positive, Comparative, Superlative | Intermediate |
| | `003_003_adverb-types-formation-and-positioning-rules` | Adverb Types, Formation & The Royal Order of Adverbs (MPT) | Intermediate |
| | `003_004_adverb-inversion-and-negative-fronting` | Adverb Inversion, Negative Fronting & Correlative Triggers | Intermediate |
| **Seg 4 (Verbs Core)** | `004_001_verb-classification-and-characteristics` | Verb Classification: Lexical, Auxiliary, Transitive & Stative | Intermediate |
| | `004_002_subject-verb-agreement-the-twenty-five-rules-of-concord` | Subject-Verb Agreement: The 25 Invariant Rules of Concord | Intermediate |
| | `004_003_present-tenses-forms-aspects-and-time-markers` | The Present Tense System: Simple, Continuous, Perfect & Perf. Cont. | Intermediate |
| | `004_004_past-and-future-tenses-narrative-timelines` | Past & Future Tenses: Narrative Timelines & 12-Tense Matrix | Intermediate |
| **Seg 5 (Advanced Verbs)** | `005_001_active-and-passive-voice-complete-mechanics` | Active & Passive Voice: Complete Mechanics & Advanced Structures | Intermediate |
| | `005_002_modal-auxiliaries-and-semi-modals` | Modal Auxiliaries, Semi-Modals & Degrees of Modality | Intermediate |
| | `005_003_non-finite-verbs-the-infinitive` | Non-Finite Verbs: The Infinitive (To-Infinitive & Bare Infinitive) | Int-Adv |
| | `005_004_non-finite-verbs-gerunds-participles-and-dangling-modifiers` | Non-Finite Verbs: Gerunds, Participles & Dangling Modifiers | Int-Adv |
| | `005_005_the-subjunctive-mood-and-conditional-sentences` | The Subjunctive Mood, Unreal Past & Complete Conditionals | Int-Adv |
| **Seg 6** | `006_001_prepositions-of-time-place-direction-and-agency` | Prepositions of Time, Place, Direction & Spatial Relationships | Intermediate |
| | `006_002_fixed-and-appropriate-prepositions-master-catalog` | Appropriate & Fixed Prepositions: Master Collocation Catalog | Int-Adv |
| | `006_003_phrasal-verbs-and-idiomatic-collocations` | Phrasal Verbs, Particle Mechanics & Idiomatic Expressions | Int-Adv |
| | `006_004_homophones-homonyms-paronyms-and-confusables` | Homophones, Homonyms, Paronyms & Confusable Word Pairs | Intermediate |
| **Seg 7** | `007_001_conjunctions-and-syntactic-coordination` | Conjunctions, Coordination & Correlative Parallelism | Int-Adv |
| | `007_002_clause-analysis-noun-adjective-and-adverb-clauses` | Clause Analysis: Noun Clauses, Relative & Adverbial Clauses | Advanced |
| | `007_003_synthesis-of-sentences-combining-ideas` | Synthesis of Sentences: Combining Simple, Compound & Complex | Advanced |
| | `007_004_transformation-of-sentences-advanced-rules` | Advanced Sentence Transformation & Structural Interchange | Advanced |
| **Seg 8** | `008_001_fundamentals-of-reported-speech-and-tense-backshift` | Fundamentals of Reported Speech & Tense Backshift | Int-Adv |
| | `008_002_narration-of-assertive-and-interrogative-sentences` | Narration of Assertive & Interrogative Sentences | Advanced |
| | `008_003_narration-of-imperative-exclamatory-and-optative-sentences` | Narration of Imperative, Exclamatory & Optative Sentences | Advanced |
| | `008_004_passage-narration-dialogues-and-nuanced-reporting-verbs` | Passage Narration, Continuous Dialogues & Nuanced Verbs | Advanced |
| **Seg 9** | `009_001_punctuation-mastery-and-syntactic-clarity` | Punctuation Mastery, Comma Splices & Syntactic Clarity | Advanced |
| | `009_002_capitalization-and-spelling-mechanics` | Capitalization Invariants, Spelling Rules & US/UK Conventions | Int-Adv |
| | `009_003_spotting-errors-and-sentence-correction-lab` | Spotting Errors & Sentence Correction Grand Diagnostic Lab | Expert |
| | `009_004_stylistic-flaws-and-defensive-writing` | Stylistic Flaws, Nominalization & Defensive Writing Techniques | Expert |
| **Seg 10** | `010_001_vocabulary-etymology-and-word-power` | Vocabulary Expansion: Etymology & Morphological Power | Adv-Expert |
| | `010_002_precision-writing-and-plain-english-principles` | Precision Writing, Plain English Principles & Tone Modulation | Expert |
| | `010_003_paragraph-architecture-and-discourse-cohesion` | Paragraph Architecture, Cohesion, Coherence & Transitions | Ultra Expert |
| | `010_004_english-grammar-capstone-and-mastery-drills` | English Grammar Capstone Assessment & Viva Voce Drills | Ultra Expert |
