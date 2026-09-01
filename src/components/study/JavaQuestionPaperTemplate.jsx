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
    const printWindow = window.open('', '_blank', 'width=850,height=700');
    if (!printWindow) {
      alert('Please allow popups for this site to print.');
      return;
    }

    const defaultOrg = {
      name: 'Coder & AccoTax',
      address: '123 Education Street, Knowledge City, KC 123456',
      phone: '+91 1234567890',
      email: 'info@coderandaccotax.com',
      website: 'www.coderandaccotax.com'
    };
    const org = { ...defaultOrg, ...organizationDetails };
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.title} ${showAnswers ? '(With Answers)' : ''}</title>
          <style>
            @page {
              size: A4;
              margin: 10mm 12mm;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Times New Roman', Times, Georgia, serif; 
              line-height: 1.3; 
              color: #000; 
              background: #fff; 
              font-size: 11pt;
            }
            .paper { max-width: 100%; margin: 0 auto; }
            
            /* Organization Header */
            .org-header { text-align: center; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px solid #000; }
            .org-name { font-size: 15pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
            .org-details { font-size: 8.5pt; color: #222; margin-top: 2px; line-height: 1.35; }
            .org-info-line { margin-top: 1px; }
            .org-issue-date { font-size: 8.5pt; color: #444; margin-top: 2px; font-style: italic; }

            /* Question Paper Header */
            .paper-header { text-align: center; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #000; }
            .paper-title { font-size: 14pt; font-weight: bold; margin-bottom: 3px; }
            .paper-meta { display: flex; justify-content: space-between; font-size: 9pt; font-weight: bold; margin-top: 4px; padding: 3px 0; border-top: 1px solid #000; border-bottom: 1px solid #000; }
            .paper-id { font-size: 8.5pt; color: #444; }

            /* Instructions */
            .instructions { margin-bottom: 10px; padding: 6px 10px; border: 1px solid #000; background: #fdfdfd; font-size: 9pt; page-break-inside: avoid; }
            .instructions h3 { font-size: 9.5pt; font-weight: bold; margin-bottom: 2px; text-transform: uppercase; }
            .instructions ul { list-style: disc; padding-left: 18px; }
            .instructions li { margin-bottom: 1px; }

            /* Sections */
            .section { margin-bottom: 12px; }
            .section-header { background: #f0f0f0; padding: 4px 8px; border-left: 3px solid #000; margin-bottom: 8px; border-top: 1px solid #ddd; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; page-break-inside: avoid; }
            .section-title { font-size: 11pt; font-weight: bold; }
            .section-desc { font-size: 8.5pt; color: #333; font-style: italic; }

            /* Questions */
            .question-list { list-style: decimal; padding-left: 22px; margin: 0; }
            .question { margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid; }
            .qtext { font-size: 10.5pt; display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; line-height: 1.3; }
            .qcontent { flex: 1; }
            .marks { font-size: 9pt; font-weight: bold; white-space: nowrap; }

            /* Answers */
            .answer { margin-top: 4px; padding: 5px 8px; border: 1px solid #999; border-radius: 3px; background: #f8f9fa; font-size: 9.5pt; page-break-inside: avoid; }
            .ans-label { font-weight: bold; color: #000; font-size: 9pt; margin-bottom: 2px; }

            /* Code Blocks */
            pre, code { font-family: 'Courier New', Courier, monospace !important; font-size: 9pt !important; line-height: 1.25 !important; }
            pre.code-block { background: #f4f4f4; border: 1px solid #ccc; padding: 5px 8px; margin: 4px 0; border-radius: 3px; white-space: pre-wrap; word-wrap: break-word; page-break-inside: avoid; }

            /* Footer */
            .footer { margin-top: 15px; border-top: 1px solid #000; padding-top: 4px; text-align: center; font-size: 8pt; color: #444; page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <div class="paper">
            <!-- Organization Header -->
            <div class="org-header">
              <div class="org-name">${org.name}</div>
              <div class="org-details">
                <div>${org.address}</div>
                <div class="org-info-line">
                  <span>Ph: ${org.phone}</span> &bull; 
                  <span>Email: ${org.email}</span>
                  ${org.website ? ` &bull; <span>Web: ${org.website}</span>` : ''}
                </div>
                <div class="org-issue-date">Date of Issue: ${currentDate}</div>
              </div>
            </div>

            <!-- Question Paper Header -->
            <div class="paper-header">
              <div class="paper-title">${data.title} ${showAnswers ? '<span style="font-size:10pt; font-weight:normal;">(Answer Key)</span>' : ''}</div>
              <div class="paper-meta">
                <span>Paper ID: ${data.paperId}</span>
                <span>Duration: ${data.duration}</span>
                <span>Total Marks: ${data.totalMarks}</span>
              </div>
              ${data.prerequisites ? `<div style="font-size: 8.5pt; margin-top: 2px;">Prerequisites: ${data.prerequisites}</div>` : ''}
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
                <div class="section-header">
                  <div class="section-title">Section ${section.section}: ${section.type}</div>
                  <div class="section-desc">(${section.totalQuestions} Questions × ${section.marksPerQuestion} Marks)${section.description ? ' - ' + section.description : ''}</div>
                </div>
                <ol class="question-list">
                  ${section.questions.map((q) => `
                    <li class="question">
                      <div class="qtext">
                        <div class="qcontent">${q.q.replace(/```java/g, '<pre class="code-block">').replace(/```/g, '</pre>').replace(/\n/g, '<br/>')}</div>
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
              <p>© ${new Date().getFullYear()} ${org.name} - All Rights Reserved | Page 1 of 1</p>
              <p style="font-style: italic;">*** Good Luck ***</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              }, 300);
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
    getPrintableContent(true);
  };

  // Handler for normal print (current view)
  const handleNormalPrint = () => {
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
          <div key={sectionIdx} className="mb-8 print:mb-4 section">
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
                  <li key={qIdx} className="space-y-2 print:space-y-1 question">
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
                          >
                            {isOpen ? "Hide Answer" : "Show Answer"}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {q.hint && (
                      <div className="text-xs text-gray-500 italic pl-4 no-print print:hidden">
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
          @page {
            size: A4;
            margin: 10mm 12mm !important;
          }
          body {
            background-color: white !important;
            color: black !important;
            font-family: 'Times New Roman', Times, Georgia, serif !important;
            font-size: 11pt !important;
            line-height: 1.3 !important;
          }
          .print\\:bg-white {
            background-color: white !important;
          }
          .print\\:text-black {
            color: black !important;
          }
          .print\\:text-gray-600 {
            color: #333333 !important;
          }
          .print\\:border-black {
            border-color: black !important;
          }
          .print\\:border-gray-300 {
            border-color: #999999 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          li, .question {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 6px !important;
          }
          .section {
            page-break-inside: avoid !important;
            margin-bottom: 12px !important;
          }
          pre, code {
            background-color: #f4f4f4 !important;
            color: black !important;
            border: 1px solid #ccc !important;
            font-family: 'Courier New', Courier, monospace !important;
            font-size: 9pt !important;
            line-height: 1.25 !important;
            padding: 4px 6px !important;
            margin: 4px 0 !important;
            page-break-inside: avoid !important;
          }
          .answer-content {
            page-break-inside: avoid !important;
            margin-top: 4px !important;
            padding: 4px 8px !important;
            border: 1px solid #999 !important;
            background-color: #f8f9fa !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JavaQuestionPaperTemplate;