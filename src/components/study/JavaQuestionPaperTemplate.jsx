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

  // Sanitize LaTeX math commands to clean Unicode symbols
  const cleanMath = (text) => {
    if (!text) return '';
    return text
      .replace(/\\times/g, '×')
      .replace(/\\neq/g, '≠')
      .replace(/\\le(?![a-zA-Z])/g, '≤')
      .replace(/\\leq/g, '≤')
      .replace(/\\ge(?![a-zA-Z])/g, '≥')
      .replace(/\\geq/g, '≥')
      .replace(/\\rightarrow/g, '→')
      .replace(/\\%/g, '%')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\$1\^3 \+ 5\^3 \+ 3\^3 = 1 \+ 125 \+ 27 = 153\$/g, '1³ + 5³ + 3³ = 1 + 125 + 27 = 153')
      .replace(/\$([^$\n]+)\$/g, '$1');
  };

  // Render inline markdown formatting (bold, italic, code) into React elements
  const renderMarkdownText = (text) => {
    if (!text) return null;
    const cleaned = cleanMath(text);
    const parts = cleaned.split(/(\*\*[\s\S]*?\*\*|__[\s\S]*?__|`[^`]+`|\*[^*\n]+\*)/g);

    return parts.map((part, index) => {
      if (!part) return null;

      // Bold: **text** or __text__
      if ((part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
          (part.startsWith('__') && part.endsWith('__') && part.length >= 4)) {
        const inner = part.slice(2, -2);
        return (
          <strong key={index} className="font-bold text-white print:text-black print:font-bold">
            {renderMarkdownText(inner)}
          </strong>
        );
      }

      // Inline code: `code`
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        const code = part.slice(1, -1);
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 mx-0.5 rounded bg-gray-800 text-emerald-400 font-mono text-xs border border-gray-700 print:bg-gray-100 print:text-black print:border-gray-300"
          >
            {code}
          </code>
        );
      }

      // Italic: *text*
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        const inner = part.slice(1, -1);
        return (
          <em key={index} className="italic text-gray-300 print:text-gray-700">
            {inner}
          </em>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  // Render paragraph blocks with heading, question banner, and sub-item detection
  const renderParagraphs = (text, isAnswer = false, marks = null) => {
    if (!text) return null;
    const lines = text.split('\n');
    let headerRendered = false;

    return (
      <div className={`space-y-2 ${isAnswer ? 'text-gray-300 print:text-black' : 'text-gray-200 print:text-black'}`}>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          // Question header detection: e.g. "Question 7 [2D Array - Matrix Diagonals & Symmetry]" or "Question 3"
          const qHeaderMatch = !isAnswer && !headerRendered && trimmed.match(/^(Question\s+\d+)(?:\s*\[(.*?)\])?$/i);
          if (qHeaderMatch) {
            headerRendered = true;
            const qNum = qHeaderMatch[1];
            const qTag = qHeaderMatch[2];
            return (
              <div
                key={idx}
                className="font-bold text-base sm:text-lg text-yellow-400 print:text-black mb-2 pb-1.5 border-b border-gray-700/80 print:border-black flex justify-between items-baseline"
              >
                <div>
                  <span className="font-bold text-yellow-400 print:text-black">{qNum}</span>
                  {qTag && (
                    <span className="text-xs sm:text-sm font-normal text-gray-400 print:text-gray-700 ml-2 italic">
                      [{qTag}]
                    </span>
                  )}
                </div>
                {marks && (
                  <span className="text-xs sm:text-sm font-mono font-semibold text-gray-300 print:text-black">
                    [{marks} Marks]
                  </span>
                )}
              </div>
            );
          }

          // Markdown headers: ### Heading or ## Heading
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-xs sm:text-sm font-bold text-yellow-400 print:text-black mt-3 mb-1 uppercase tracking-wide">
                {renderMarkdownText(trimmed.slice(4))}
              </h4>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-sm sm:text-base font-bold text-white print:text-black mt-4 mb-1">
                {renderMarkdownText(trimmed.slice(3))}
              </h3>
            );
          }

          // Sub-items: "1. ", "2. ", "(a)", "(i)", etc.
          const subItemMatch = trimmed.match(/^(\d+\.|\([a-zA-Z0-9ivx]+\)|[ivx]+\.|\*|-|•)\s+(.*)$/i);
          if (subItemMatch) {
            const bullet = subItemMatch[1];
            const rest = subItemMatch[2];
            return (
              <div key={idx} className="pl-6 print:pl-5 flex items-start gap-2 text-sm print:text-xs leading-relaxed print:leading-tight my-1">
                <strong className="text-emerald-400 print:text-black font-semibold min-w-[22px] shrink-0">
                  {bullet}
                </strong>
                <span className="flex-1">
                  {renderMarkdownText(rest)}
                </span>
              </div>
            );
          }

          return (
            <p key={idx} className="whitespace-pre-wrap leading-relaxed print:leading-tight text-sm print:text-xs">
              {renderMarkdownText(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // Render text block with table detection and inline markdown
  const renderTextBlock = (block, isAnswer = false, marks = null) => {
    if (!block) return null;

    if (block.includes('|') && block.includes('---')) {
      const lines = block.split('\n');
      const tableLines = [];
      const beforeLines = [];
      const afterLines = [];
      let inTable = false;
      let tableDone = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && line.endsWith('|')) {
          inTable = true;
          tableLines.push(line);
        } else if (inTable && !tableDone) {
          tableDone = true;
          afterLines.push(lines[i]);
        } else if (tableDone) {
          afterLines.push(lines[i]);
        } else {
          beforeLines.push(lines[i]);
        }
      }

      if (tableLines.length >= 2) {
        const headerLine = tableLines[0];
        const headers = headerLine.split('|').map(s => s.trim()).filter(Boolean);
        const dataRows = tableLines.slice(2).map(row => 
          row.split('|').map(s => s.trim()).filter(Boolean)
        );

        return (
          <div className="space-y-3">
            {beforeLines.length > 0 && renderParagraphs(beforeLines.join('\n'), isAnswer, marks)}
            <div className="overflow-x-auto my-3">
              <table className="min-w-full text-xs text-left border border-gray-700 print:border-black rounded-lg overflow-hidden">
                <thead className="bg-gray-800 print:bg-gray-200 text-gray-200 print:text-black font-semibold uppercase">
                  <tr>
                    {headers.map((h, hIdx) => (
                      <th key={hIdx} className="px-3 py-2 border-b border-gray-700 print:border-black">
                        {renderMarkdownText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 print:divide-gray-300">
                  {dataRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-gray-800/40 print:hover:bg-transparent">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-2 text-gray-300 print:text-black">
                          {renderMarkdownText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {afterLines.length > 0 && renderParagraphs(afterLines.join('\n'), isAnswer, marks)}
          </div>
        );
      }
    }

    return renderParagraphs(block, isAnswer, marks);
  };

  // Format question text (with code blocks, headers, and sub-items)
  const formatQuestion = (text, marks = null) => {
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
        return <div key={i}>{renderTextBlock(part, false, marks)}</div>;
      });
    }
    return renderTextBlock(text, false, marks);
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
        return <div key={i}>{renderTextBlock(part, true)}</div>;
      });
    }
    return renderTextBlock(answer, true);
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

    const escapeHtml = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };

    const formatPrintableInline = (text) => {
      if (!text) return '';
      return cleanMath(text)
        .replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__([\s\S]*?)__/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="font-family:Courier New,monospace; background:#f0f0f0; padding:1px 4px; border-radius:2px; font-size:8.5pt; border:1px solid #ddd;">$1</code>')
        .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    };

    const formatPrintableBlock = (block, marks = null) => {
      if (!block) return '';

      // Check for markdown table
      if (block.includes('|') && block.includes('---')) {
        const lines = block.split('\n');
        const tableLines = [];
        const beforeLines = [];
        const afterLines = [];
        let inTable = false;
        let tableDone = false;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith('|') && line.endsWith('|')) {
            inTable = true;
            tableLines.push(line);
          } else if (inTable && !tableDone) {
            tableDone = true;
            afterLines.push(lines[i]);
          } else if (tableDone) {
            afterLines.push(lines[i]);
          } else {
            beforeLines.push(lines[i]);
          }
        }

        if (tableLines.length >= 2) {
          const headerCells = tableLines[0].split('|').map(s => s.trim()).filter(Boolean);
          const dataRows = tableLines.slice(2).map(row =>
            row.split('|').map(s => s.trim()).filter(Boolean)
          );

          let tableHtml = '<table class="print-table" style="width:100%; border-collapse:collapse; margin:6px 0; font-size:8.5pt;">';
          tableHtml += '<thead><tr style="background:#e8e8e8;">';
          headerCells.forEach(h => {
            tableHtml += `<th style="border:1px solid #333; padding:3px 6px; text-align:left; font-weight:bold;">${formatPrintableInline(h)}</th>`;
          });
          tableHtml += '</tr></thead><tbody>';
          dataRows.forEach(row => {
            tableHtml += '<tr>';
            row.forEach(cell => {
              tableHtml += `<td style="border:1px solid #333; padding:3px 6px;">${formatPrintableInline(cell)}</td>`;
            });
            tableHtml += '</tr>';
          });
          tableHtml += '</tbody></table>';

          const beforeHtml = beforeLines.length > 0 ? formatPrintableBlock(beforeLines.join('\n'), marks) : '';
          const afterHtml = afterLines.length > 0 ? formatPrintableBlock(afterLines.join('\n'), marks) : '';
          return `${beforeHtml}${tableHtml}${afterHtml}`;
        }
      }

      const lines = block.split('\n');
      let out = '';
      let headerDone = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) {
          out += '<div style="height: 5px;"></div>';
          continue;
        }

        // Question title header: e.g. "Question 7 [2D Array - Matrix Diagonals & Symmetry]" or "Question 3"
        const qHeaderMatch = !headerDone && trimmed.match(/^(Question\s+\d+)(?:\s*\[(.*?)\])?$/i);
        if (qHeaderMatch) {
          headerDone = true;
          const qNum = qHeaderMatch[1];
          const qTag = qHeaderMatch[2] ? ` <span style="font-size: 8.5pt; font-weight: normal; color: #444; font-style: italic;">[${formatPrintableInline(qHeaderMatch[2])}]</span>` : '';
          out += `
            <div style="font-size: 11pt; font-weight: bold; margin-bottom: 5px; padding-bottom: 2px; border-bottom: 1.5px solid #000; display: flex; justify-content: space-between; align-items: baseline;">
              <span>${qNum}${qTag}</span>
              ${marks ? `<span style="font-size: 9.5pt; font-family: 'Courier New', monospace; font-weight: bold;">[${marks} Marks]</span>` : ''}
            </div>
          `;
          continue;
        }

        // Markdown headings
        if (trimmed.startsWith('### ')) {
          out += `<div style="font-weight:bold; margin-top:6px; margin-bottom:2px; font-size:9.5pt; text-transform:uppercase;">${formatPrintableInline(trimmed.slice(4))}</div>`;
          continue;
        }
        if (trimmed.startsWith('## ')) {
          out += `<div style="font-weight:bold; margin-top:8px; margin-bottom:3px; font-size:10.5pt;">${formatPrintableInline(trimmed.slice(3))}</div>`;
          continue;
        }

        // Sub-items or options: "1. ", "2. ", "(a)", "(i)", etc.
        const subItemMatch = trimmed.match(/^(\d+\.|\([a-zA-Z0-9ivx]+\)|[ivx]+\.|\*|-|•)\s+(.*)$/i);
        if (subItemMatch) {
          const bullet = subItemMatch[1];
          const rest = subItemMatch[2];
          out += `
            <div style="margin-left: 24px; text-indent: -24px; margin-top: 2px; margin-bottom: 2px; line-height: 1.35; font-size: 10pt;">
              <strong style="min-width: 20px; display: inline-block;">${bullet}</strong> ${formatPrintableInline(rest)}
            </div>
          `;
          continue;
        }

        // Regular text line
        out += `<div style="margin-bottom: 3px; line-height: 1.35; font-size: 10pt;">${formatPrintableInline(trimmed)}</div>`;
      }

      return out;
    };

    const formatPrintableHtml = (raw, marks = null) => {
      if (!raw) return '';
      if (raw.includes('```java') || raw.includes('```')) {
        const parts = raw.split(/(```java[\s\S]*?```|```[\s\S]*?```)/g);
        return parts.map(part => {
          if (part.startsWith('```java') && part.endsWith('```')) {
            const code = part.slice(7, -3).trim();
            return `<pre class="code-block">${escapeHtml(code)}</pre>`;
          }
          if (part.startsWith('```') && part.endsWith('```')) {
            const code = part.slice(3, -3).trim();
            return `<pre class="code-block">${escapeHtml(code)}</pre>`;
          }
          return formatPrintableBlock(part, marks);
        }).join('');
      }
      return formatPrintableBlock(raw, marks);
    };

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
              line-height: 1.35; 
              color: #000; 
              background: #fff; 
              font-size: 10.5pt;
            }
            .paper { max-width: 100%; margin: 0 auto; }
            strong, b { font-weight: bold !important; }
            
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
            .section { margin-bottom: 14px; }
            .section-header { background: #f0f0f0; padding: 4px 8px; border-left: 3px solid #000; margin-bottom: 10px; border-top: 1px solid #ddd; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; page-break-inside: avoid; }
            .section-title { font-size: 11pt; font-weight: bold; }
            .section-desc { font-size: 8.5pt; color: #333; font-style: italic; }

            /* Questions (No artificial outer numbering) */
            .question-list { list-style: none; padding: 0; margin: 0; }
            .question { margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid; }
            .qtext-wrapper { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
            .qcontent-body { flex: 1; }
            .marks-badge { font-size: 9pt; font-family: 'Courier New', monospace; font-weight: bold; white-space: nowrap; }

            /* Answers */
            .answer { margin-top: 5px; padding: 6px 10px; border: 1px solid #999; border-radius: 3px; background: #f8f9fa; font-size: 9.5pt; page-break-inside: avoid; }
            .ans-label { font-weight: bold; color: #000; font-size: 9pt; margin-bottom: 2px; }

            /* Code Blocks */
            pre, code { font-family: 'Courier New', Courier, monospace !important; font-size: 9pt !important; line-height: 1.25 !important; }
            pre.code-block { background: #f4f4f4; border: 1px solid #ccc; padding: 5px 8px; margin: 4px 0; border-radius: 3px; white-space: pre-wrap; word-wrap: break-word; page-break-inside: avoid; }

            /* Tables */
            .print-table { border: 1px solid #333; page-break-inside: avoid; }
            .print-table th, .print-table td { border: 1px solid #333; }

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
              ${data.source ? `<div style="font-size: 8.5pt; color: #222; margin-top: 3px; font-weight: 500;">Source: ${data.source} ${data.sourceUrl ? `(<a href="${data.sourceUrl}" target="_blank" style="color:#0055aa; text-decoration:underline;">${data.sourceUrl}</a>)` : ''}</div>` : ''}
              ${data.prerequisites ? `<div style="font-size: 8.5pt; margin-top: 2px; color: #555;">Prerequisites: ${data.prerequisites}</div>` : ''}
            </div>

            <!-- Instructions -->
            ${data.instructions ? `
              <div class="instructions">
                <h3>Instructions:</h3>
                <ul>
                  ${(Array.isArray(data.instructions) ? data.instructions : typeof data.instructions === 'string' ? [data.instructions] : []).map(instr => `<li>${formatPrintableHtml(instr)}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- Sections -->
            ${(data.sections || []).map(section => `
              <div class="section">
                <div class="section-header">
                  <div class="section-title">Section ${section.section}: ${section.type}</div>
                  <div class="section-desc">(${section.totalQuestions} Questions × ${section.marksPerQuestion} Marks)${section.description ? ' - ' + formatPrintableHtml(section.description) : ''}</div>
                </div>
                <div class="question-list">
                  ${section.questions.map((q) => {
                    const hasEmbeddedHeader = q.q && /^\s*Question\s+\d+/i.test(q.q);
                    return `
                      <div class="question">
                        ${hasEmbeddedHeader ? `
                          <div>${formatPrintableHtml(q.q, q.marks)}</div>
                        ` : `
                          <div class="qtext-wrapper">
                            <div class="qcontent-body">${formatPrintableHtml(q.q)}</div>
                            <span class="marks-badge">[${q.marks} mark${q.marks > 1 ? 's' : ''}]</span>
                          </div>
                        `}
                        ${showAnswers && q.answer ? `
                          <div class="answer">
                            <div class="ans-label">📝 Answer / Marking Scheme:</div>
                            <div>${formatPrintableHtml(q.answer)}</div>
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
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

  // Handler for normal print (blank question paper)
  const handlePrintQuestionPaper = () => {
    getPrintableContent(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 shadow-lg rounded-xl text-gray-100 print:bg-white print:text-black print:p-4">
      {/* Print Buttons */}
      <div className="flex justify-end mb-4 no-print gap-2">
        <button
          onClick={handlePrintQuestionPaper}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors shadow-md"
          title="Print official blank question paper"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Question Paper
        </button>
        <button
          onClick={handlePrintWithAnswers}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors shadow-md"
          title="Print question paper with answers and solutions"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Print with Answers
        </button>
      </div>

      {/* Content to be printed (normal print) */}
      <div id="print-content" className="print:leading-tight">
        {/* Header, instructions, sections */}
        <div className="text-center border-b border-gray-700 print:border-black pb-4 mb-6 print:pb-2 print:mb-3">
          <h1 className="text-2xl font-bold text-white print:text-black print:text-xl print:mb-1">{data.title}</h1>
          <p className="text-sm text-gray-400 print:text-gray-600 print:text-xs">Paper ID: {data.paperId}</p>
          <div className="flex justify-between mt-2 text-sm text-gray-400 print:text-gray-600 print:text-xs print:mt-1">
            <span>Duration: {data.duration}</span>
            <span>Total Marks: {data.totalMarks}</span>
          </div>
          {data.source && (() => {
            const sourceUrl = data.sourceUrl || (data.source?.includes('CISCE') ? 'https://cisce.org/' : null);
            return sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-medium hover:bg-emerald-900/80 hover:text-emerald-300 hover:border-emerald-400 hover:shadow-sm hover:shadow-emerald-500/20 transition-all duration-200 group no-underline print:bg-transparent print:border-none print:text-gray-700"
                title="Open official CISCE website (cisce.org)"
              >
                <span>🏛️ Source: {data.source}</span>
                <span className="inline-flex items-center text-[11px] underline decoration-emerald-500/50 group-hover:decoration-emerald-300 text-emerald-300 font-semibold gap-1 ml-0.5">
                  Visit CISCE
                  <svg className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform no-print" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            ) : (
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium print:bg-transparent print:border-none print:text-gray-700">
                <span>🏛️ Source: {data.source}</span>
              </div>
            );
          })()}
          {data.prerequisites && (
            <div className="mt-2 text-xs text-gray-500 print:text-gray-600 print:text-xs print:mt-1">
              <span>Prerequisites: {data.prerequisites}</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        {data.instructions && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 print:bg-white print:border-black print:shadow-none print:p-3 print:mb-3">
            <h3 className="text-md font-semibold text-yellow-400 print:text-black mb-2 print:text-sm print:mb-1">Instructions:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-300 print:text-black print:text-xs space-y-1 print:space-y-0.5">
              {(Array.isArray(data.instructions) ? data.instructions : [data.instructions]).map((instruction, idx) => (
                <li key={idx} className="print:text-black print:leading-tight">{renderMarkdownText(instruction)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sections */}
        {(data.sections || []).map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8 print:mb-4 section">
            <div className="mb-3 print:mb-2">
              <h2 className="text-lg font-semibold text-white print:text-black print:text-base">
                Section {section.section}: {section.type}
              </h2>
              <p className="text-sm text-gray-400 print:text-gray-600 print:text-xs">
                ({section.totalQuestions} Questions × {section.marksPerQuestion} Marks)
              </p>
              {section.description && (
                <p className="text-xs text-gray-500 print:text-gray-600 print:text-xs print:mt-0.5">{renderMarkdownText(section.description)}</p>
              )}
            </div>

            <div className="space-y-6 print:space-y-4">
              {section.questions.map((q, qIdx) => {
                const key = `${sectionIdx}-${qIdx}`;
                const isOpen = openAnswers[key];
                const hasCode = q.answer && hasJavaCode(q.answer);
                const showToggle = isLoggedIn && !isPrintingWithAnswers;
                const hasEmbeddedHeader = q.q && /^\s*Question\s+\d+/i.test(q.q);
                
                return (
                  <div key={qIdx} className="space-y-2 print:space-y-1.5 question">
                    <div className="flex justify-between items-start gap-4 print:flex-nowrap print:items-baseline print:gap-2">
                      <div className="text-gray-200 print:text-black flex-1 font-medium print:text-sm print:break-words">
                        {formatQuestion(q.q, q.marks)}
                      </div>
                      <div className="flex items-center gap-3 print:flex-shrink-0 print:ml-2 print:whitespace-nowrap">
                        {!hasEmbeddedHeader && (
                          <span className="text-sm text-gray-400 print:text-gray-600 font-mono print:text-xs">[{q.marks} mark{q.marks > 1 ? 's' : ''}]</span>
                        )}
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
                        💡 Hint: {renderMarkdownText(q.hint)}
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
                  </div>
                );
              })}
            </div>
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