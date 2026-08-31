"use client";

import React, { useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic14_files/topic14_questions";
import questionsBn from "./topic14_files/topic14_questions_bn";
import noteTextEn from "./topic14_files/topic14_note.txt?raw";
import noteTextBn from "./topic14_files/topic14_note_bn.txt?raw";
import journalEntries from "./topic14_files/topic14_journal.json";

export default function Topic14() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const questions = isBengali && questionsBn ? questionsBn : questionsEn;
  const noteText = isBengali && noteTextBn ? noteTextBn : noteTextEn;

  const flowSteps = isBengali ? [
    {
        "title1": "বাস্তব ঘটনা",
        "title2": "সমস্যা",
        "desc": "বাণিজ্যিক ইনভয়েস",
        "color": "#6ee7b7",
        "grad": "url(#gradEmerald)",
        "stroke": "#10b981"
    },
    {
        "title1": "প্রথমে চেষ্টা",
        "title2": "সমাধান",
        "desc": "Dr ও Cr নির্ণয়",
        "color": "#7dd3fc",
        "grad": "url(#gradSky)",
        "stroke": "#38bdf8"
    },
    {
        "title1": "উত্তর মেলানো",
        "title2": "সঠিক জার্নাল",
        "desc": "৫-কলাম জার্নাল বই",
        "color": "#5eead4",
        "grad": "url(#gradTeal)",
        "stroke": "#2dd4bf"
    },
    {
        "title1": "ট্যালি ভাউচার",
        "title2": "ম্যাপিং",
        "desc": "অডিট ট্রেইল F4-F9",
        "color": "#a5b4fc",
        "grad": "url(#gradIndigo)",
        "stroke": "#818cf8"
    }
] : [
    {
        "title1": "REAL EVENT",
        "title2": "PROBLEM",
        "desc": "Commercial Invoice",
        "color": "#6ee7b7",
        "grad": "url(#gradEmerald)",
        "stroke": "#10b981"
    },
    {
        "title1": "SOLVE FIRST",
        "title2": "ATTEMPT",
        "desc": "Identify Dr & Cr",
        "color": "#7dd3fc",
        "grad": "url(#gradSky)",
        "stroke": "#38bdf8"
    },
    {
        "title1": "CHECK ANSWER",
        "title2": "SOLUTION",
        "desc": "5-Col Journal Book",
        "color": "#5eead4",
        "grad": "url(#gradTeal)",
        "stroke": "#2dd4bf"
    },
    {
        "title1": "TALLY VOUCHER",
        "title2": "MAPPING",
        "desc": "Audit Trail F4-F9",
        "color": "#a5b4fc",
        "grad": "url(#gradIndigo)",
        "stroke": "#818cf8"
    }
];

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        
        {/* BILINGUAL LANGUAGE TOGGLE CONTROL */}
        <div ref={addRef} className="reveal-section">
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>

        {/* HERO HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>📊</span>
            <span>TallyPrime Master Series · Module 1.2 · Topic Practice</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "Journal Sample 1 – সম্পূর্ণ ব্যবহারিক জার্নাল অনুশীলন ওয়ার্কশীট" : "Journal Sample 1 – Comprehensive Interactive Practice Worksheet"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "বাস্তব ব্যবসায়িক লেনদেনের পূর্ণাঙ্গ ৫-কলাম জার্নাল বুক অনুশীলন।" : "Full-scale 5-column commercial practice worksheet featuring real-world transactions."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-300">
                  {isBengali ? "Teacher's Desk: কমার্শিয়াল অ্যাকাউন্টিং ধারণা ও ল্যাব আলোচনা" : "Teacher's Desk: Commercial Intuition & Lab Discussion"}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Mr. CNAT &amp; Barrackpore Accounting Lab Discussion
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-emerald-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> Practical Metaphor
                </h3>
                <p>
                  {isBengali
                    ? "বাণিজ্যিক হিসাববিজ্ঞানে Journal Entry হল প্রতিটি প্রাত্যহিক লেনদেনের প্রাথমিক আইনি দলিল। এটি প্রতিটি লেনদেনের সমপরিমাণ Debit এবং Credit রূপ প্রকাশ করে।"
                    : "In commercial bookkeeping, passing accurate Journal Entries is the prime recording duty. Every entry expresses the equal Debit and Credit balance of a transaction."}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Abhronila (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ ডেটা এন্ট্রি করার সময় Narration কেন লেখা জরুরি?"' : '"Sir, why is typing a detailed Narration essential during voucher entry in TallyPrime?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"কারণ অডিটের সময় কেবল নম্বর যথেষ্ট নয়; Being... দিয়ে শুরু হওয়া Narration অডিটরকে লেনদেনের প্রকৃত পটভূমি বুঝতে সাহায্য করে!"' : '"Because during audits, numbers alone are not enough; a clear narration starting with Being... explains the exact business context to tax auditors!"'}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRACTICAL COMMERCIAL EXAMPLES & JOURNAL VIEWER ENGINE SECTION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <JournalViewerEngine
            entries={journalEntries}
            title={isBengali ? "Journal Sample 1 – সম্পূর্ণ ব্যবহারিক জার্নাল অনুশীলন ওয়ার্কশীট" : "Journal Sample 1 – Comprehensive Interactive Practice Worksheet"}
            subtitle={isBengali ? "১০টি বাস্তব ব্যবসায়িক লেনদেনের উপর ভিত্তি করে পূর্ণাঙ্গ ৫-কলাম জার্নাল বুক অনুশীলন ওয়ার্কশীট" : "Full-scale 5-column commercial practice worksheet with 10 real-world business transactions"}
            isBengali={isBengali}
            flowSteps={flowSteps}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic14_study_note_bn.txt" : "topic14_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate title={isBengali ? "Topic মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic Assessment & Diagnostic Practice"} questions={questions} />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher note={isBengali ? "জার্নাল এন্ট্রি নিখুঁতভাবে শেখাই হল TallyPrime-এ মাস্টার অ্যাকাউন্ট্যান্ট হওয়ার প্রথম সিঁড়ি। প্রতিটি লেনদেনে ডেবিট ও ক্রেডিট সমান রাখুন!" : "Mastering double-entry journalization with Mr. CNAT is the first stepping stone to becoming a master accountant in TallyPrime!"} />
        </section>

      </div>
    </>
  );
}
