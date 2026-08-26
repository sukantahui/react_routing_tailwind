import React, { useState, useEffect } from 'react';
import PrintButton from '../../common/PrintButton';
import JavaCodeBlock from '../../common/JavaCodeBlock';
import JavaCodeBlockQuestionCode from '../../common/JavaCodeBlockNoColor';

const JavaQuestionPaperTemplate = ({ data, isLoggedIn = false, organizationDetails = {} }) => {
  const [openAnswers, setOpenAnswers] = useState({});
  const [isPrintingWithAnswers, setIsPrintingWithAnswers] = useState(false);

  const toggleAnswer = (sectionIdx, qIdx) => {
    const key = `${sectionIdx}-${qIdx}`;
    setOpenAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Format question text (with code blocks)
  const formatQuestion = (text) => {
    if (!text) return null;
    if (text.includes("```java") || text.includes("```")) {
      const parts = text.split(/(```java[\s\S]*?```|```[\s\S]*?```)/g);
      return parts.map((part, i) => {
        if (part.startsWith("```java") && part.endsWith("```")) {
          const code = part.slice(7, -3).trim();
          return <JavaCodeBlockQuestionCode key={i} code={code} title="Java Code" />;
        }
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3).trim();
          return <JavaCodeBlockQuestionCode key={i} code={code} title="Code" />;
        }
        return <span key={i} className="whitespace-pre-wrap">{part}</span>;
      });
    }
    return <span className="whitespace-pre-wrap">{text}</span>;
  };

  // Format answer text
  const formatAnswer = (answer) => {
    if (!answer) return null;
    if (answer.includes("```java") || answer.includes("```")) {
      const parts = answer.split(/(```java[\s\S]*?```|```[\s\S]*?```)/g);
      return parts.map((part, i) => {
        if (part.startsWith("```java") && part.endsWith("```")) {
          const code = part.slice(7, -3).trim();
          return <JavaCodeBlock key={i} code={code} title="Java Code" />;
        }
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3).trim();
          return <JavaCodeBlock key={i} code={code} title="Code" />;
        }
        return <p key={i} className="whitespace-pre-wrap text-gray-300 print:text-black print:leading-tight">{part}</p>;
      });
    }
    return <p className="whitespace-pre-wrap text-gray-300 print:text-black print:leading-tight">{answer}</p>;
  };

  const hasJavaCode = (answer) => {
    return answer && (answer.includes("```java") || answer.includes("public class") || answer.includes("public static void"));
  };

  // Build the printable HTML content (as a string) for the new window
  const getPrintableContent = (showAnswers = false) => {
    // We'll render the content without buttons and with all answers shown if requested.
    // We'll use ReactDOMServer or build the HTML manually, but since we already have a React component,
    // it's simpler to clone the existing DOM content into a new window.
    // But we want to ensure all answers are shown. We'll create a hidden div with all answers expanded.
    // However, we can just use the existing content and modify it via CSS.
    // A cleaner approach: render a separate React component into a new window.
    // We'll create a new component that renders the paper with all answers forced open.
    // But we can't easily do that without re-rendering. So we'll open a new window, write the HTML content with inline styles.
    // Since the user already has a working print, we can simply clone the existing DOM,
    // but we need to force all answers open. Instead, we'll generate the HTML manually using the data.
    // For simplicity, we'll just use the current DOM but set all answer blocks to display:block via a style override.
    // That's easier.
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow popups for this site to print.');
      return;
    }
    // Build the HTML string
    let content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.title}</title>
          <style>
            /* Reset and print styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, Helvetica, sans-serif; line-height: 1.4; padding: 20px; color: #000; background: #fff; }
            .paper { max-width: 900px; margin: 0 auto; }
            h1 { font-size: 20px; margin-bottom: 5px; }
            .header { text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
            .header p { font-size: 12px; margin: 2px 0; }
            .instructions { margin-bottom: 15px; padding: 10px; border: 1px solid #000; border-radius: 4px; }
            .instructions h3 { font-size: 14px; margin-bottom: 5px; }
            .instructions ul { font-size: 12px; list-style: disc; padding-left: 20px; }
            .section { margin-bottom: 20px; }
            .section h2 { font-size: 16px; margin-bottom: 5px; }
            .section .desc { font-size: 12px; color: #333; }
            .question { margin-bottom: 12px; }
            .question .qtext { font-size: 14px; font-weight: 500; display: flex; justify-content: space-between; }
            .question .qtext .marks { font-size: 12px; font-weight: normal; color: #555; }
            .question .answer { margin-top: 4px; padding: 6px 10px; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9; font-size: 13px; }
            .question .answer .ans-label { font-weight: 600; color: #2a7a2a; }
            .footer { margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center; font-size: 11px; color: #777; }
            pre, code { background: #f4f4f4; padding: 4px; border-radius: 3px; font-size: 12px; }
            .code-block { background: #f4f4f4; padding: 8px; border-radius: 4px; margin: 4px 0; font-family: monospace; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="paper">
            <!-- Header -->
            <div class="header">
              <h1>${data.title}</h1>
              <p>Paper ID: ${data.paperId}</p>
              <p>Duration: ${data.duration} | Total Marks: ${data.totalMarks}</p>
              ${data.prerequisites ? `<p>Prerequisites: ${data.prerequisites}</p>` : ''}
            </div>
            <!-- Instructions -->
            ${data.instructions ? `
              <div class="instructions">
                <h3>Instructions:</h3>
                <ul>
                  ${data.instructions.map(instr => `<li>${instr}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            <!-- Sections -->
            ${data.sections.map(section => `
              <div class="section">
                <h2>Section ${section.section}: ${section.type}</h2>
                <p class="desc">(${section.totalQuestions} Questions × ${section.marksPerQuestion} Marks) ${section.description ? ' - '+section.description : ''}</p>
                <ol style="padding-left: 20px; margin-top: 8px;">
                  ${section.questions.map((q, idx) => `
                    <li class="question" style="margin-bottom: 8px;">
                      <div class="qtext">
                        <span>${q.q.replace(/```java/g, '<pre class="code-block">').replace(/```/g, '</pre>').replace(/\n/g, '<br/>')}</span>
                        <span class="marks">[${q.marks} marks]</span>
                      </div>
                      ${showAnswers && q.answer ? `
                        <div class="answer">
                          <div class="ans-label">📝 Answer:</div>
                          <div>${q.answer.replace(/```java/g, '<pre class="code-block">').replace(/```/g, '</pre>').replace(/\n/g, '<br/>')}</div>
                        </div>
                      ` : ''}
                    </li>
                  `).join('')}
                </ol>
              </div>
            `).join('')}
            <!-- Footer -->
            <div class="footer">
              <p>© ${new Date().getFullYear()} Java Question Paper - All Rights Reserved</p>
              <p>Good Luck!</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            }
          <\/script>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  // Handler for printing with all answers expanded using new window
  const handlePrintWithAnswers = () => {
    // Temporarily expand all answers in current state? No, we'll use a separate window to avoid affecting UI.
    getPrintableContent(true);
  };

  // Handler for normal print (current view)
  const handleNormalPrint = () => {
    // We can still use window.print() on the current page, which respects the print CSS.
    // But we want to keep the PrintButton functionality. We'll pass a custom print function.
    // However, we already have PrintButton component that triggers window.print().
    // We'll keep that for normal print.
    // The PrintButton component likely calls window.print() directly, so we don't need to change that.
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 shadow-lg rounded-xl text-gray-100 print:bg-white print:text-black print:p-4">
      {/* Print Buttons */}
      <div className="flex justify-end mb-4 no-print gap-2">
        {/* Regular Print Button (uses PrintButton component) */}
        <PrintButton 
          targetId="print-content" 
          title={data.title}
          organizationDetails={organizationDetails}
        />
        {/* New "Print with Answers" button - opens new window */}
        <button
          onClick={handlePrintWithAnswers}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
        >
          Print with Answers
        </button>
      </div>

      {/* Content to be printed (normal print) */}
      <div id="print-content" className="print:leading-tight">
        {/* Header, instructions, sections - unchanged */}
        <div className="text-center border-b border-gray-700 print:border-black pb-4 mb-6 print:pb-2 print:mb-3">
          <h1 className="text-2xl font-bold text-white print:text-black print:text-xl print:mb-1">{data.title}</h1>
          <p className="text-sm text-gray-400 print:text-gray-600 print:text-xs">Paper ID: {data.paperId}</p>
          <div className="flex justify-between mt-2 text-sm text-gray-400 print:text-gray-600 print:text-xs print:mt-1">
            <span>Duration: {data.duration}</span>
            <span>Total Marks: {data.totalMarks}</span>
          </div>
          {data.prerequisites && (
            <div className="mt-3 text-xs text-gray-500 print:text-gray-600 print:text-xs print:mt-1">
              <span>Prerequisites: {data.prerequisites}</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        {data.instructions && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 print:bg-white print:border-black print:shadow-none print:p-3 print:mb-3">
            <h3 className="text-md font-semibold text-yellow-400 print:text-black mb-2 print:text-sm print:mb-1">Instructions:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-300 print:text-black print:text-xs space-y-1 print:space-y-0.5">
              {data.instructions.map((instruction, idx) => (
                <li key={idx} className="print:text-black print:leading-tight">{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sections */}
        {data.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8 print:mb-4">
            <div className="mb-3 print:mb-2">
              <h2 className="text-lg font-semibold text-white print:text-black print:text-base">
                Section {section.section}: {section.type}
              </h2>
              <p className="text-sm text-gray-400 print:text-gray-600 print:text-xs">
                ({section.totalQuestions} Questions × {section.marksPerQuestion} Marks)
              </p>
              {section.description && (
                <p className="text-xs text-gray-500 print:text-gray-600 print:text-xs print:mt-0.5">{section.description}</p>
              )}
            </div>

            <ol className="list-decimal pl-5 space-y-6 print:space-y-2">
              {section.questions.map((q, qIdx) => {
                const key = `${sectionIdx}-${qIdx}`;
                const isOpen = openAnswers[key];
                const hasCode = q.answer && hasJavaCode(q.answer);
                const showToggle = isLoggedIn && !isPrintingWithAnswers;
                
                return (
                  <li key={qIdx} className="space-y-2 print:space-y-1">
                    <div className="flex justify-between items-start gap-4 print:flex-nowrap print:items-baseline print:gap-2">
                      <div className="text-gray-200 print:text-black flex-1 font-medium print:text-sm print:break-words">
                        {formatQuestion(q.q)}
                      </div>
                      <div className="flex items-center gap-3 print:flex-shrink-0 print:ml-2 print:whitespace-nowrap">
                        <span className="text-sm text-gray-400 print:text-gray-600 font-mono print:text-xs">[{q.marks} marks]</span>
                        {showToggle && (
                          <button
                            onClick={() => toggleAnswer(sectionIdx, qIdx)}
                            className="px-2 py-1 text-xs rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors no-print"
                          &gt;
                            {isOpen ? "Hide Answer" : "Show Answer"}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {q.hint && (
                      <div className="text-xs text-gray-500 print:text-gray-600 italic pl-4 print:text-xs print:leading-tight">
                        💡 Hint: {q.hint}
                      </div>
                    )}
                    
                    {isLoggedIn && (isOpen || isPrintingWithAnswers) && q.answer && (
                      <div className={`answer-content mt-3 p-4 rounded-lg border ${hasCode ? 'bg-gray-850' : 'bg-gray-800'} print:bg-white border-gray-700 print:border-black print:p-2 print:mt-1`}>
                        <div className="text-sm print:text-xs">
                          <div className="text-emerald-400 print:text-black text-xs font-semibold mb-2 flex items-center gap-2 print:mb-1">
                            <span>📝 Answer:</span>
                            {hasCode && <span className="text-blue-400 print:text-gray-600">(Includes Java Code)</span>}
                          </div>
                          {formatAnswer(q.answer)}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}

        <div className="mt-8 pt-4 border-t border-gray-700 print:border-gray-300 text-center text-xs text-gray-500 print:text-gray-600 print:mt-4 print:pt-2">
          <p>© {new Date().getFullYear()} Java Question Paper - All Rights Reserved</p>
          <p className="mt-1 print:mt-0.5">Good Luck!</p>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .print\\:bg-white {
            background-color: white !important;
          }
          .print\\:text-black {
            color: black !important;
          }
          .print\\:text-gray-600 {
            color: #4b5563 !important;
          }
          .print\\:border-black {
            border-color: black !important;
          }
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          body, div, p, li, span, h1, h2, h3, h4 {
            line-height: 1.2 !important;
          }
          li, .list-disc li {
            line-height: 1.15 !important;
            margin-bottom: 2px !important;
          }
          .mb-8 {
            margin-bottom: 0.75rem !important;
          }
          .space-y-6 &gt; * + * {
            margin-top: 0.5rem !important;
          }
          p {
            margin-bottom: 0.25rem !important;
            line-height: 1.2 !important;
          }
          pre, code {
            background-color: #f3f4f6 !important;
            color: black !important;
            border: 1px solid #d1d5db !important;
            line-height: 1.2 !important;
            margin: 0.25rem 0 !important;
          }
          h1, h2, h3 {
            margin-bottom: 0.25rem !important;
            margin-top: 0.25rem !important;
          }
          .p-4 {
            padding: 0.5rem !important;
          }
          .p-6 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JavaQuestionPaperTemplate;