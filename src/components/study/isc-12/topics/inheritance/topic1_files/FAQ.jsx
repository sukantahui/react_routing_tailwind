import React, { useState } from "react";
import questions from "./Faqs";

const FAQ = ({ title = "FAQs" }) => {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  // Toggle UI
  const toggleAnswer = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 🖨️ PRINT FUNCTION
  const handlePrint = () => {
    const content = document.getElementById("question-set");
    if (!content) return;

    const printWindow = window.open("", "_blank");

    // Expand all answers
    const allVisible = {};
    questions.forEach((_, idx) => {
      allVisible[idx] = true;
    });
    setVisibleAnswers(allVisible);

    setTimeout(() => {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>

              @page {
                size: A4;
                margin: 18mm;
              }

              /* 🔥 FORCE COLORS */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              body {
                font-family: "Segoe UI", Arial, sans-serif;
                margin: 0;
                padding: 0;
                color: #222;
                counter-reset: page;
              }

              /* REMOVE ARROWS */
              .toggle-icon {
                display: none !important;
              }

              /* HEADER */
              .print-header {
                text-align: center;
                margin-bottom: 20px;
                padding: 12px;
                border-bottom: 2px solid #4f46e5;
              }

              .print-header h1 {
                font-size: 20px;
                margin: 0;
                color: #4f46e5;
              }

              .print-header p {
                font-size: 13px;
                margin: 2px 0;
              }

              /* QUESTION CARD */
              .print-item {
                page-break-inside: avoid;
                margin-bottom: 14px;
                padding: 10px;
                border-left: 4px solid #6366f1;
                background: #f9fafb;
                border-radius: 6px;

                counter-increment: page;
              }

              /* ANSWER BLOCKS */
              .answer p {
                margin: 6px 0;
                padding: 6px 8px;
                border-radius: 4px;
                font-size: 13px;
              }

              /* Hint */
              .answer p:nth-child(1) {
                background: #fff7ed;
                border-left: 3px solid #f59e0b;
              }

              /* Answer */
              .answer p:nth-child(2) {
                background: #ecfdf5;
                border-left: 3px solid #10b981;
              }

              /* Explanation */
              .answer p:nth-child(3) {
                background: #eff6ff;
                border-left: 3px solid #3b82f6;
              }

              /* FOOTER (PAGE NUMBER) */
              .page-footer {
                position: fixed;
                bottom: 10mm;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 12px;
                color: #555;
              }

              .page-footer::after {
                content: "Page " counter(page) " | Coder & AccoTax";
              }

            </style>
          </head>

          <body>
            ${content.innerHTML.replace(/▲|▼/g, "")}

            <div class="page-footer"></div>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 200);

    }, 300);
  };

  return (
    <div className="space-y-6">

      {/* Title + Print Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          🖨️ Print
        </button>
      </div>

      {/* PRINT CONTENT */}
      <div id="question-set">

        {/* HEADER */}
        <div className="print-header">
          <h1>Coder & AccoTax</h1>
          <p>Instructor: Sukanta Hui</p>
          <p>{title}</p>
          <p>Name: _______________________ &nbsp;&nbsp; Date: __________</p>
        </div>

        {/* FAQ LIST */}
        {questions.map((faq, idx) => (
          <div key={idx} className="border rounded-xl overflow-hidden print-item">

            {/* Question */}
            <button
              onClick={() => toggleAnswer(idx)}
              className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-900 flex justify-between items-center"
            >
              <span className="font-semibold text-gray-900 dark:text-white">
                {idx + 1}. {faq.question}
              </span>

              {/* Arrow (UI only) */}
              <span className="toggle-icon">
                {visibleAnswers[idx] ? "▲" : "▼"}
              </span>
            </button>

            {/* Answer */}
            {visibleAnswers[idx] && (
              <div className="px-6 py-4 space-y-2 bg-white dark:bg-gray-800 answer">
                <p><strong>💡 Hint:</strong> {faq.hint}</p>
                <p><strong>✅ Answer:</strong> {faq.shortAnswer}</p>
                <p><strong>📘 Explanation:</strong> {faq.explanation}</p>
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default FAQ;