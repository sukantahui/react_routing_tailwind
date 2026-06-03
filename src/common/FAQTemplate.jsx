import React, { useState, useCallback, useMemo } from "react";
import clsx from "clsx";

const FAQTemplate = ({ 
  title = "Frequently Asked Questions", 
  subtitle = "Test your understanding with these practice questions",
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
        .map((q, idx) => ({ idx, question: q.question, answer: q.shortAnswer }))
        .filter(item => 
          item.question.toLowerCase().includes(term) || 
          item.answer.toLowerCase().includes(term)
        )
        .map(item => item.idx);
      setFilteredIndices(indices);
    }
  }, [searchTerm, questions]);

  // 🖨️ PRINT FUNCTION (Enhanced)
  const handlePrint = useCallback(() => {
    const content = document.getElementById("question-set");
    if (!content) return;

    // Store current visibility state
    const wasAllExpanded = visibleCount === questions.length;
    
    // If not all expanded, expand all for print
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
              @page {
                size: A4;
                margin: 18mm;
              }

              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              body {
                font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
                margin: 0;
                padding: 0;
                color: #1a1a2e;
                line-height: 1.5;
              }

              .print-header {
                text-align: center;
                margin-bottom: 25px;
                padding: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 12px;
              }

              .print-header h1 {
                font-size: 24px;
                margin: 0 0 5px 0;
                letter-spacing: 1px;
              }

              .print-header p {
                font-size: 13px;
                margin: 5px 0;
                opacity: 0.95;
              }

              .print-meta {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                padding-top: 8px;
                border-top: 1px solid rgba(255,255,255,0.3);
                font-size: 12px;
              }

              .print-item {
                page-break-inside: avoid;
                margin-bottom: 16px;
                padding: 12px;
                background: #f8f9fa;
                border-left: 5px solid #4f46e5;
                border-radius: 8px;
              }

              .question-text {
                font-weight: 700;
                font-size: 15px;
                color: #1e293b;
                margin-bottom: 12px;
                padding-bottom: 8px;
                border-bottom: 2px solid #e2e8f0;
              }

              .answer-section {
                margin-top: 10px;
              }

              .answer-hint {
                background: #fff3e0;
                border-left: 3px solid #f59e0b;
                padding: 8px 12px;
                margin: 8px 0;
                border-radius: 6px;
                font-size: 13px;
              }

              .answer-short {
                background: #e6f7e6;
                border-left: 3px solid #10b981;
                padding: 8px 12px;
                margin: 8px 0;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 500;
              }

              .answer-explanation {
                background: #e8f0fe;
                border-left: 3px solid #3b82f6;
                padding: 8px 12px;
                margin: 8px 0;
                border-radius: 6px;
                font-size: 13px;
              }

              .toggle-icon, .action-buttons, .search-bar, .progress-bar {
                display: none !important;
              }

              .footer {
                position: fixed;
                bottom: 15mm;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 11px;
                color: #94a3b8;
              }

              .page-number:after {
                content: " - Page " counter(page);
              }
            </style>
          </head>

          <body>
            <div class="print-header">
              <h1>📚 ${title}</h1>
              <p>Master Java Inheritance - Practice Questions</p>
              <div class="print-meta">
                <span>👨‍🏫 Instructor: Sukanta Hui</span>
                <span>📅 Date: ${currentDate}</span>
              </div>
              <div class="print-meta">
                <span>🏫 Coder & AccoTax Academy</span>
                <span>⏱️ Time: 45 minutes</span>
              </div>
            </div>

            ${content.innerHTML.replace(/▲|▼|🔍|Expand All|Collapse All|Show Answer|Hide Answer/g, "")}
            
            <div class="footer">
              <span class="page-number"></span>
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);

      // Restore original visibility state if needed
      if (!wasAllExpanded) {
        setTimeout(() => {
          collapseAll();
        }, 500);
      }
    }, 200);
  }, [title, questions, visibleCount, collapseAll]);

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    return (visibleCount / questions.length) * 100;
  }, [visibleCount, questions.length]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + E to expand all
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        expandAll();
      }
      // Ctrl/Cmd + C to collapse all
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        collapseAll();
      }
      // Ctrl/Cmd + P to print
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [expandAll, collapseAll, handlePrint]);

  return (
    <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out]">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-indigo-100">{subtitle}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                📝 {questions.length} Questions
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                ✅ {visibleCount} Answered
              </span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {showPrint && (
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 font-medium flex items-center gap-2 shadow-md hover:shadow-xl"
              >
                🖨️ Print
              </button>
            )}
            
            {showExpandAll && (
              <>
                <button
                  onClick={expandAll}
                  className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all duration-300 font-medium flex items-center gap-2"
                >
                  📖 Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all duration-300 font-medium flex items-center gap-2"
                >
                  📝 Collapse All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Your Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="relative animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <input
            type="text"
            placeholder="🔍 Search questions by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Keyboard Shortcuts Hint */}
      <div className="text-xs text-center text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_0.15s]">
        💡 Pro tip: Use <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+E</kbd> to expand all, 
        <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded ml-1">Ctrl+C</kbd> to collapse all, 
        <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded ml-1">Ctrl+P</kbd> to print
      </div>

      {/* Questions Container */}
      <div id="question-set">
        {/* Hidden Print Header (only visible when printing) */}
        <div className="print-header hidden print:block"></div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredIndices.map((originalIdx, displayIdx) => {
            const faq = questions[originalIdx];
            const isVisible = visibleAnswers[originalIdx];
            
            return (
              <div 
                key={originalIdx} 
                className={clsx(
                  "border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300",
                  "hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700",
                  "animate-[fadeSlideUp_0.6s_ease-out]"
                )}
                style={{ animationDelay: `${displayIdx * 0.03}s` }}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleAnswer(originalIdx)}
                  className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 flex justify-between items-center group"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-indigo-500 dark:text-indigo-400 min-w-[2rem]">
                      {originalIdx + 1}.
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <span className={clsx(
                    "text-indigo-500 dark:text-indigo-400 text-xl transition-transform duration-300",
                    isVisible && "rotate-180"
                  )}>
                    ▼
                  </span>
                </button>

                {/* Answer Section - Animated */}
                <div
                  className={clsx(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    isVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    {/* Hint */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-3 rounded-r-lg hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">💡 Hint</p>
                      <p className="text-amber-700 dark:text-amber-200 text-sm">{faq.hint}</p>
                    </div>
                    
                    {/* Short Answer */}
                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3 rounded-r-lg hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">✅ Quick Answer</p>
                      <p className="text-green-700 dark:text-green-200 text-sm">{faq.shortAnswer}</p>
                    </div>
                    
                    {/* Detailed Explanation */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-r-lg hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">📘 Detailed Explanation</p>
                      <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">{faq.explanation}</p>
                    </div>

                    {/* Code Example (if provided) */}
                    {faq.codeExample && (
                      <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-gray-300 text-xs font-mono">{faq.codeExample}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredIndices.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">No questions found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-3 text-indigo-500 hover:text-indigo-600 underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQTemplate;