/* eslint-disable react-refresh/only-export-components */
"use client";

import React from "react";
import { Printer, Download, X, Award, FileText } from "lucide-react";

export const triggerA4CommercePrint = ({
  projectTitle = "Project 1: Commercial Accounting Assignment",
  companyName = "M/s Apex Global Traders",
  period = "April 2026",
  transactions = [],
  isBengali = false
}) => {
  const printWin = window.open("", "_blank");
  if (!printWin) return;

  const title = isBengali
    ? `কোডার ও অ্যাকাউন্টাক্স অফিশিয়াল কমার্স প্রশ্নপত্র — ${companyName}`
    : `CODER & ACCOTAX OFFICIAL COMMERCE QUESTION PAPER — ${companyName}`;

  const rowsHtml = transactions.map(tx => `
    <tr>
      <td style="text-align: center; font-weight: bold; width: 45px; font-family: Arial, sans-serif;">Q${tx.id}.</td>
      <td style="width: 95px; font-family: monospace; font-size: 10pt;">${tx.date}</td>
      <td style="font-weight: 600;">${isBengali ? tx.descBn : tx.descEn}</td>
      <td style="text-align: center; width: 50px; font-family: Arial, sans-serif;">1</td>
    </tr>
  `).join("");

  const contentHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }
    body {
      font-family: 'Times New Roman', Times, Georgia, serif;
      color: #000;
      background: #fff;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      line-height: 1.35;
      -webkit-print-color-adjust: exact;
    }
    .outer-border {
      border: 3px double #000;
      padding: 16px;
      box-sizing: border-box;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .sub-header {
      font-size: 9pt;
      font-family: Arial, sans-serif;
      letter-spacing: 1px;
      font-weight: bold;
      text-transform: uppercase;
      color: #111;
    }
    .main-title {
      font-size: 22pt;
      font-weight: 900;
      text-transform: uppercase;
      margin: 2px 0;
      font-family: 'Times New Roman', Times, serif;
      letter-spacing: 0.5px;
    }
    .center-info {
      font-size: 9.5pt;
      font-family: Arial, sans-serif;
      color: #222;
    }
    .exam-banner {
      margin-top: 6px;
      font-size: 11.5pt;
      font-weight: bold;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
      background: #f0f0f0;
      padding: 4px;
      border: 1px solid #ccc;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-family: Arial, sans-serif;
      font-size: 9.5pt;
    }
    .meta-table td {
      border: 1px solid #000;
      padding: 5px 8px;
      background: #fafafa;
    }
    .candidate-block {
      border: 1px solid #000;
      padding: 8px 12px;
      margin-bottom: 12px;
      font-family: Arial, sans-serif;
      font-size: 9.5pt;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
    }
    .instructions {
      border: 1px solid #000;
      background: #f9f9f9;
      padding: 8px 12px;
      margin-bottom: 12px;
      font-size: 9.5pt;
    }
    .instructions h4 {
      margin: 0 0 4px 0;
      font-family: Arial, sans-serif;
      font-size: 9.5pt;
      text-transform: uppercase;
    }
    .instructions ol {
      margin: 0;
      padding-left: 20px;
    }
    .q-section-title {
      font-weight: bold;
      font-family: Arial, sans-serif;
      font-size: 10.5pt;
      margin-bottom: 6px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
    .q-table {
      width: 100%;
      border-collapse: collapse;
    }
    .q-table th {
      background: #e8e8e8;
      border: 1px solid #000;
      padding: 6px;
      font-family: Arial, sans-serif;
      font-size: 9.5pt;
      text-transform: uppercase;
    }
    .q-table td {
      border: 1px solid #000;
      padding: 6px 8px;
      font-size: 10pt;
      vertical-align: top;
    }
    .footer {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-family: Arial, sans-serif;
      font-size: 9pt;
      page-break-inside: avoid;
    }
    .sig-box {
      text-align: center;
      width: 180px;
    }
    .sig-line {
      border-bottom: 1px solid #000;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="outer-border">
    
    <div class="header">
      <div class="sub-header">ISO 9001:2015 Certified Academy of Commerce &amp; IT</div>
      <div class="main-title">CODER &amp; ACCOTAX</div>
      <div class="center-info">Center for Practical Accounting, TallyPrime &amp; Taxation Studies · Barrackpore Lab</div>
      <div class="center-info" style="font-size: 8.5pt; margin-top: 2px;">Exam Center Code: CA-743121 | Affiliation ID: ACC-IND-2026</div>

      <div class="exam-banner">
        DIPLOMA IN PRACTICAL ACCOUNTING — SEMESTER EXAMINATION
      </div>
      <div style="font-size: 10.5pt; font-weight: bold; margin-top: 4px;">
        ${projectTitle} (${companyName} — Financial Period: ${period})
      </div>
    </div>

    <table class="meta-table">
      <tr>
        <td><strong>Time Allowed:</strong> 2 Hours (120 Mins)</td>
        <td><strong>Course Code:</strong> TALLY-PRO-103</td>
        <td><strong>Full Marks:</strong> 30 Marks</td>
        <td><strong>Pass Marks:</strong> 12 Marks</td>
      </tr>
    </table>

    <div class="candidate-block">
      <div><strong>Candidate Name:</strong> _____________________________________</div>
      <div><strong>Roll / Reg No:</strong> ______________________</div>
      <div style="margin-top: 4px;"><strong>Study Center:</strong> ____________________________________</div>
      <div style="margin-top: 4px;"><strong>Exam Date:</strong> ______________________</div>
    </div>

    <div class="instructions">
      <h4>General Instructions for Candidates:</h4>
      <ol>
        <li>${isBengali ? "সকল প্রশ্নের উত্তর আবশ্যক। নিচে প্রদত্ত ৩০টি ব্যবসায়িক লেনদেন সমাধান করুন।" : "All questions are compulsory. Solve all 30 commercial business transactions listed below."}</li>
        <li>${isBengali ? "৫-কলামের জাবেদা বইয়ে (Date, Particulars, J.F., Dr., Cr.) হিসাবভুক্ত করুন।" : "Record entries in 5-column General Journal format (Date, Particulars, J.F., Debit, Credit)."}</li>
        <li>${isBengali ? "T-ফরম্যাটে খতিয়ান অ্যাকাউন্ট (8-Column Ledgers) প্রস্তুত করে মাস শেষে Balance c/d বের করুন।" : "Post entries to 8-column T-Account Ledgers and balance each account with Balance c/d."}</li>
        <li>${isBengali ? "পরবর্তী মাসের ১লা তারিখে Balance b/d হিসাবে জের আনয়ন করুন এবং রেওয়ামিল মিলিয়ে দিন।" : "Carry forward Balance b/d on 1st of next month and reconcile final Trial Balance."}</li>
      </ol>
    </div>

    <div class="q-section-title">
      <span>SECTION B: 30 Commercial Business Transactions (30 Marks)</span>
      <span>[1 Mark Each]</span>
    </div>

    <table class="q-table">
      <thead>
        <tr>
          <th style="width: 45px;">Q#</th>
          <th style="width: 95px;">Date</th>
          <th>Commercial Business Transaction Statement</th>
          <th style="width: 55px;">Marks</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="footer">
      <div class="sig-box">
        <div class="sig-line"></div>
        <div>Candidate's Signature</div>
      </div>
      <div class="sig-box">
        <div class="sig-line"></div>
        <div>Invigilator's Signature</div>
      </div>
      <div class="sig-box">
        <div class="sig-line"></div>
        <div style="font-weight: bold;">Mr. CNAT (Chief Examiner)</div>
        <div style="font-size: 8pt;">Coder &amp; AccoTax Examination Board</div>
      </div>
    </div>

  </div>
  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() { window.close(); }, 500);
    };
  </script>
</body>
</html>`;

  printWin.document.write(contentHtml);
  printWin.document.close();
};

export default function CoderAccoTaxQuestionPaperModal({
  isOpen,
  onClose,
  projectTitle = "Project 1: Commercial Accounting Assignment",
  companyName = "M/s Apex Global Traders",
  period = "April 2026",
  transactions = [],
  isBengali = false,
  plainTextQp = ""
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    triggerA4CommercePrint({
      projectTitle,
      companyName,
      period,
      transactions,
      isBengali
    });
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([plainTextQp], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = isBengali ? "Coder_AccoTax_Commerce_Question_Paper_bn.txt" : "Coder_AccoTax_Commerce_Question_Paper.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* MODAL NAVBAR / CONTROLS */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <Award className="text-emerald-400" size={20} />
            <h3 className="text-sm font-bold font-mono text-emerald-300">
              {isBengali ? "কোডার ও অ্যাকাউন্টাক্স কমার্স প্রশ্নপত্র প্যানেল" : "Coder & AccoTax Commerce Exam Question Paper"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg scale-105"
            >
              <Printer size={16} />
              <span>{isBengali ? "🖨️ A4 কমার্স প্রশ্নপত্র প্রিন্ট / PDF" : "🖨️ Print A4 Commerce Question Paper"}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition flex items-center gap-2 border border-slate-700"
            >
              <Download size={14} />
              <span>{isBengali ? "TXT ডাউনলোড" : "Download .txt"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ON-SCREEN PREVIEW OF THE A4 QUESTION PAPER SHEET */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-900 bg-slate-100 font-serif">
          
          <div className="border-4 border-slate-900 p-6 rounded-none space-y-6 bg-white shadow-xl">
            
            {/* COMMERCE EXAM HEADER BANNER */}
            <div className="text-center space-y-1.5 border-b-2 border-slate-900 pb-4">
              <div className="text-xs font-mono font-bold tracking-widest text-slate-700 uppercase">
                ISO 9001:2015 CERTIFIED ACADEMY OF COMMERCE &amp; IT
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase font-serif">
                CODER &amp; ACCOTAX
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 font-sans">
                Center for Practical Accounting, TallyPrime &amp; Taxation Studies · Barrackpore Lab
              </p>
              <p className="text-[11px] font-mono text-slate-600">
                Exam Center Code: CA-743121 | Affiliation ID: ACC-IND-2026
              </p>

              <div className="pt-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide font-sans bg-slate-100 py-1 border border-slate-300">
                  DIPLOMA IN PRACTICAL ACCOUNTING — SEMESTER EXAMINATION
                </h2>
                <p className="text-xs font-mono text-slate-800 font-bold mt-1">
                  {projectTitle} ({companyName} — Financial Period: {period})
                </p>
              </div>
            </div>

            {/* MARKS, TIME & MARGINS TABLE */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono font-bold bg-slate-50 p-2.5 border border-slate-900 text-slate-900">
              <span>Time Allowed: 2 Hours (120 Mins)</span>
              <span>Course Code: TALLY-PRO-103</span>
              <span>Full Marks: 30 Marks</span>
              <span>Pass Marks: 12 Marks</span>
            </div>

            {/* CANDIDATE FILLABLE REGISTRATION BLOCK */}
            <div className="border border-slate-900 p-3.5 font-mono text-xs text-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50">
              <div><strong>Name of Candidate:</strong> _____________________________________</div>
              <div><strong>Registration / Roll No:</strong> ______________________</div>
              <div><strong>Study Center Name:</strong> ____________________________________</div>
              <div><strong>Date of Examination:</strong> ______________________</div>
            </div>

            {/* SECTION A: GENERAL INSTRUCTIONS */}
            <div className="p-3.5 bg-slate-50 border border-slate-900 space-y-1.5 text-xs font-sans text-slate-900">
              <h4 className="font-mono font-bold uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
                <FileText size={14} />
                <span>{isBengali ? "পরীক্ষার্থীদের জন্য সাধারণ নির্দেশাবলী (General Instructions):" : "General Instructions for Candidates:"}</span>
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-slate-800">
                <li>{isBengali ? "সকল প্রশ্নের উত্তর আবশ্যক। নিচে প্রদত্ত ৩০টি ব্যবসায়িক লেনদেন সমাধান করুন।" : "All questions are compulsory. Solve all 30 commercial business transactions listed below."}</li>
                <li>{isBengali ? "৫-কলামের জাবেদা বইয়ে (Date, Particulars, J.F., Dr., Cr.) হিসাবভুক্ত করুন।" : "Record entries in 5-column General Journal format (Date, Particulars, J.F., Debit, Credit)."}</li>
                <li>{isBengali ? "T-ফরম্যাটে খতিয়ান অ্যাকাউন্ট (8-Column Ledgers) প্রস্তুত করে মাস শেষে Balance c/d বের করুন।" : "Post entries to 8-column T-Account Ledgers and balance each account with Balance c/d."}</li>
                <li>{isBengali ? "পরবর্তী মাসের ১লা তারিখে Balance b/d হিসাবে জের আনয়ন করুন এবং রেওয়ামিল মিলিয়ে দিন।" : "Carry forward Balance b/d on 1st of next month and reconcile final Trial Balance."}</li>
              </ol>
            </div>

            {/* SECTION B: 30 COMMERCIAL TRANSACTIONS QUESTION TABLE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-1.5 font-sans">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950">
                  {isBengali ? "বিভাগ-খ: ৩০টি ব্যবসায়িক লেনদেন প্রশ্নাবলী (৩০ নম্বর)" : "SECTION B: 30 Commercial Business Transactions (30 Marks)"}
                </h3>
                <span className="text-xs font-mono text-slate-800 font-bold">[1 Mark Each]</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse border border-slate-900">
                  <thead>
                    <tr className="bg-slate-200 text-slate-950 font-mono font-bold border-b border-slate-900">
                      <th className="py-2 px-3 w-12 text-center border-r border-slate-900">Q#</th>
                      <th className="py-2 px-3 w-28 font-mono border-r border-slate-900">Date</th>
                      <th className="py-2 px-3 border-r border-slate-900">Commercial Business Transaction Statement</th>
                      <th className="py-2 px-3 w-16 text-center">Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-400 text-slate-900">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-center font-mono font-bold text-slate-950 border-r border-slate-300">
                          Q{tx.id}.
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700 border-r border-slate-300">
                          {tx.date}
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-950 border-r border-slate-300">
                          {isBengali ? tx.descBn : tx.descEn}
                        </td>
                        <td className="py-2 px-3 text-center font-mono font-bold text-slate-800">
                          1
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* OFFICIAL SIGNATURE FOOTER */}
            <div className="pt-8 flex justify-between items-end font-sans text-xs text-slate-900">
              <div className="text-center space-y-1">
                <div className="w-44 border-b border-slate-900 mb-1"></div>
                <div>Candidate's Signature</div>
              </div>
              <div className="text-center space-y-1">
                <div className="w-44 border-b border-slate-900 mb-1"></div>
                <div>Invigilator's Signature</div>
              </div>
              <div className="text-center space-y-1">
                <div className="w-44 border-b border-slate-900 mb-1"></div>
                <div className="font-bold text-slate-950">Mr. CNAT (Chief Examiner)</div>
                <div className="text-[10px] font-mono text-slate-700">Coder &amp; AccoTax Examination Board</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
