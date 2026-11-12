import React, { useState } from 'react';
import JavaQuestionPaperTemplate from '../../../JavaQuestionPaperTemplate';
import javaPaperData from './topic7_files/question.json';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import JavaFileLoader from '../../../../../common/JavaFileLoader';

const demoJavaCode = `/**
 * ICSE Class X Computer Applications - Full ICSE Board String Section B Final Simulation Paper
 * Paper ID: ICSE-STR-FULL-08
 * Educator: Sukanta Hui, Coder & AccoTax, Barrackpore (+91 7003756860)
 */
public class FullStringBoardExamDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE String Examination Practice Simulation ===");
        System.out.println("Paper: ICSE-STR-FULL-08 - Full ICSE Board String Section B Final Simulation Paper");
        System.out.println("Conducted by: Sukanta Hui, Coder & AccoTax, Barrackpore");
    }
}`;

const Topic7 = () => {
  const [currentPaper] = useState(javaPaperData);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "Barrackpore, Kolkata",
    logo: "/assets/logos/java-logo.svg"
  };

  const filteredFaqs = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || q.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header & Navigation Context */}
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
          <span>Module 006_004</span>
          <span>•</span>
          <span>Topic 7</span>
          <span>•</span>
          <span className="bg-sky-950/80 px-2 py-0.5 rounded text-sky-300 border border-sky-800">
            ICSE-STR-FULL-08
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Full ICSE Board String Section B Final Simulation Paper
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-4xl">
          Authentic CISCE Class 10 Board Section B final simulation paper with 4 complete 15-mark programming questions with full Class definitions, Scanner input, methods, and Variable Description Tables.
        </p>
      </div>

      {/* 2. Interactive ICSE Question Paper Template */}
      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-8 shadow-2xl">
        <JavaQuestionPaperTemplate 
          data={currentPaper}
          isLoggedIn={true}
          organizationDetails={organizationDetails}
        />
      </div>

      {/* 3. Runnable Java Demo Loader */}
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <span className="w-2.5 h-6 bg-emerald-500 rounded-full" />
            Runnable Java Implementation Demo
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            BlueJ compatible reference program for Section B Final Simulation.
          </p>
        </div>
        <JavaFileLoader
          fileName="FullStringBoardExamDemo.java"
          code={demoJavaCode}
        />
      </div>

      {/* 4. 25 Comprehensive ICSE Board FAQs Section */}
      <div className="max-w-6xl mx-auto space-y-6 bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>❓</span> Section B Final Simulation ICSE Board FAQs
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              25 frequently asked board exam conceptual and output questions with detailed explanations.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
              {filteredFaqs.length} of {questions.length} Questions
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search questions by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
          <div className="flex gap-2">
            {['all', 'basic', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-800 rounded-xl bg-slate-950/70 overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="text-sm md:text-base font-semibold text-slate-200">
                    <span className="text-sky-400 font-mono mr-2">Q{faq.id.toString().padStart(2, '0')}.</span>
                    {faq.question}
                  </span>
                  <span className="text-slate-500 text-sm font-bold flex-shrink-0">
                    {isOpen ? '▲' : '▼'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3 bg-slate-900/30">
                    <div className="text-sm font-medium text-emerald-400">
                      <strong>Answer: </strong>{faq.shortAnswer}
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {faq.explanation}
                    </p>
                    {faq.codeExample && (
                      <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-sky-300 border border-slate-800 overflow-x-auto">
                        {faq.codeExample}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Teacher Commentary Section */}
      <div className="max-w-6xl mx-auto">
        <Teacher
          note="Sukanta Hui (Coder & AccoTax, Barrackpore): In ICSE Board examinations, string questions in Section B carry 15 marks each and are the most scoring problems if you write clean loops, handle boundary conditions, and provide a complete Variable Description Table. Practice tracing your loop logic with sample strings on paper before writing code in BlueJ."
        />
      </div>
    </div>
  );
};

export default Topic7;
