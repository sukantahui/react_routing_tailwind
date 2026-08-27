import React, { useState, useCallback, useMemo, useEffect } from "react";
import clsx from "clsx";

const FAQTemplate = ({ 
  title = "Frequently Asked Questions", 
  subtitle = "Test your understanding with these domain mastery questions",
  questions = [],
  showPrint = true,
  showExpandAll = true,
  showSearch = true,
  showProgress = true
}) => {
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIndices, setFilteredIndices] = useState([]);

  // Toggle individual answer
  const toggleAnswer = useCallback((index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  // Expand all answers
  const expandAll = useCallback(() => {
    const allVisible = {};
    questions.forEach((_, idx) => {
      allVisible[idx] = true;
    });
    setVisibleAnswers(allVisible);
  }, [questions]);

  // Collapse all answers
  const collapseAll = useCallback(() => {
    setVisibleAnswers({});
  }, []);

  // Get visible count
  const visibleCount = useMemo(() => {
    return Object.values(visibleAnswers).filter(Boolean).length;
  }, [visibleAnswers]);

  // Filter questions based on search
  useMemo(() => {
    if (!searchTerm.trim()) {
      setFilteredIndices(questions.map((_, idx) => idx));
    } else {
      const term = searchTerm.toLowerCase();
      const indices = questions
        .map((q, idx) => ({ idx, question: q.question || "", answer: q.shortAnswer || "" }))
        .filter(item => 
          item.question.toLowerCase().includes(term) || 
          item.answer.toLowerCase().includes(term)
        )
        .map(item => item.idx);
      setFilteredIndices(indices);
    }
  }, [searchTerm, questions]);

  // Print Function
  const handlePrint = useCallback(() => {
    const content = document.getElementById("question-set");
    if (!content) return;

    const wasAllExpanded = visibleCount === questions.length;
    
    if (!wasAllExpanded) {
      const allVisible = {};
      questions.forEach((_, idx) => {
        allVisible[idx] = true;
      });
      setVisibleAnswers(allVisible);
    }

    setTimeout(() => {
      const printWindow = window.open("", "_blank");
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title} - Practice Questions</title>
            <meta charset="UTF-8">
            <style>
              @page { size: A4; margin: 18mm; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              body { font-family: 'Segoe UI', 'Roboto', Arial, sans-serif; margin: 0; padding: 0; color: #1a1a2e; line-height: 1.5; }
              .print-header { text-align: center; margin-bottom: 20px; padding: 15px; background: #0f172a; color: white; border-radius: 10px; }
              .print-header h1 { font-size: 22px; margin: 0 0 5px 0; }
              .print-header p { font-size: 12px; margin: 5px 0; opacity: 0.9; }
              .print-meta { display: flex; justify-content: space-between; margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 11px; }
              .print-item { page-break-inside: avoid; margin-bottom: 14px; padding: 12px; background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 6px; }
              .question-text { font-weight: bold; font-size: 13px; color: #0f172a; margin-bottom: 6px; }
              .answer-section { font-size: 12px; color: #334155; }
              .hint-box { background: #fef3c7; padding: 6px 10px; border-radius: 4px; margin-top: 6px; font-size: 11px; color: #92400e; }
              .explanation-box { background: #e0f2fe; padding: 6px 10px; border-radius: 4px; margin-top: 6px; font-size: 11px; color: #0369a1; }
            </style>
          </head>
          <body>
            <div class="print-header">
              <h1>📚 ${title}</h1>
              <p>${subtitle}</p>
              <div class="print-meta">
                <span>👨‍🏫 Instructor: Sukanta Hui</span>
                <span>📅 Date: ${currentDate}</span>
                <span>🏫 Coder & AccoTax Academy</span>
              </div>
            </div>
            ${content.innerHTML.replace(/▲|▼|🔍|Expand All|Collapse All|Show Answer|Hide Answer/g, "")}
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);

      if (!wasAllExpanded) {
        setTimeout(() => {
          collapseAll();
        }, 500);
      }
    }, 200);
  }, [title, subtitle, questions, visibleCount, collapseAll]);

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    return questions.length > 0 ? (visibleCount / questions.length) * 100 : 0;
  }, [visibleCount, questions.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        expandAll();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        collapseAll();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [expandAll, collapseAll, handlePrint]);

  return (
    <div className="dark bg-transparent text-slate-100 space-y-4 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="text-indigo-400">❓</span> {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">{subtitle}</p>
            <div className="mt-2.5 flex items-center gap-2 text-xs flex-wrap">
              <span className="bg-slate-950/80 text-indigo-300 border border-indigo-800/60 px-2.5 py-0.5 rounded-full font-mono font-bold">
                📝 {questions.length} Questions
              </span>
              <span className="bg-slate-950/80 text-emerald-300 border border-emerald-800/60 px-2.5 py-0.5 rounded-full font-mono font-bold">
                ✅ {visibleCount} Answered
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 flex-wrap">
            {showPrint && (
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                title="Print questions (Ctrl+P)"
              >
                🖨️ Print
              </button>
            )}
            
            {showExpandAll && (
              <>
                <button
                  onClick={expandAll}
                  className="px-3 py-1.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 hover:text-white border border-indigo-700/80 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                  title="Expand all answers (Ctrl+E)"
                >
                  📖 Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                  title="Collapse all answers (Ctrl+C)"
                >
                  📝 Collapse All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && questions.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
              <span>Mastery Progress</span>
              <span className="font-bold text-sky-400">{Math.round(progressPercentage)}% ({visibleCount}/{questions.length})</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-sky-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Search Bar & Shortcuts */}
      {showSearch && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Filter questions by keyword or formula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 border border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 hidden md:flex items-center gap-1.5 shrink-0">
            <span>Shortcuts:</span>
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded font-mono text-[10px]">Ctrl+E</kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded font-mono text-[10px]">Ctrl+C</kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded font-mono text-[10px]">Ctrl+P</kbd>
          </div>
        </div>
      )}

      {/* Questions Container */}
      <div id="question-set" className="space-y-2.5">
        <div className="print-header hidden print:block"></div>

        {/* Questions List */}
        <div className="space-y-2.5">
          {filteredIndices.map((originalIdx) => {
            const faq = questions[originalIdx];
            const isVisible = visibleAnswers[originalIdx];
            
            return (
              <div 
                key={originalIdx} 
                className="rounded-xl border border-slate-800/90 bg-slate-900/60 hover:border-slate-700 transition-all duration-200 overflow-hidden shadow-sm"
              >
                {/* Question Accordion Toggle */}
                <button
                  type="button"
                  onClick={() => toggleAnswer(originalIdx)}
                  className="w-full text-left p-3.5 sm:p-4 bg-slate-900/80 hover:bg-slate-850 transition-colors flex justify-between items-start gap-3 group"
                >
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="font-mono font-bold text-sky-400 text-xs sm:text-sm min-w-[2.2rem] pt-0.5">
                      {originalIdx + 1 < 10 ? `Q0${originalIdx + 1}` : `Q${originalIdx + 1}`}.
                    </span>
                    <span className="font-semibold text-slate-100 group-hover:text-sky-300 transition-colors text-xs sm:text-sm leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    {faq.level && (
                      <span className={clsx(
                        "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider hidden sm:inline-block",
                        faq.level === "basic" && "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60",
                        faq.level === "moderate" && "bg-amber-950/80 text-amber-300 border border-amber-800/60",
                        faq.level === "advanced" && "bg-indigo-950/80 text-indigo-300 border border-indigo-800/60"
                      )}>
                        {faq.level}
                      </span>
                    )}
                    <span className={clsx(
                      "text-slate-400 group-hover:text-sky-300 text-xs font-mono transition-transform duration-200 w-5 h-5 rounded bg-slate-950 flex items-center justify-center border border-slate-800",
                      isVisible && "rotate-180 text-sky-400"
                    )}>
                      ▼
                    </span>
                  </div>
                </button>

                {/* Answer Section */}
                {isVisible && (
                  <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800/80 space-y-3 text-xs sm:text-sm">
                    {/* Quick Answer */}
                    {faq.shortAnswer && (
                      <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-3 rounded-r-lg space-y-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">✅ Quick Answer</p>
                        <p className="text-slate-200 leading-relaxed">{faq.shortAnswer}</p>
                      </div>
                    )}

                    {/* Detailed Explanation */}
                    {faq.explanation && (
                      <div className="bg-sky-950/30 border-l-4 border-sky-500 p-3 rounded-r-lg space-y-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-sky-400">📘 Detailed Breakdown</p>
                        <p className="text-slate-300 leading-relaxed">{faq.explanation}</p>
                      </div>
                    )}

                    {/* Hint */}
                    {faq.hint && (
                      <div className="bg-amber-950/30 border-l-4 border-amber-500 p-2.5 rounded-r-lg space-y-0.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">💡 Analytical Hint</p>
                        <p className="text-amber-200/90 text-xs leading-relaxed">{faq.hint}</p>
                      </div>
                    )}

                    {/* Code / Formula Example */}
                    {faq.codeExample && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto shadow-inner">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 font-sans">Formula / Syntax Blueprint:</div>
                        <pre className="whitespace-pre-wrap">{faq.codeExample}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredIndices.length === 0 && (
          <div className="text-center py-10 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
            <p className="text-slate-400 text-sm">No questions found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs text-sky-400 hover:text-sky-300 underline font-semibold"
            >
              Clear filter and show all {questions.length} questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQTemplate;