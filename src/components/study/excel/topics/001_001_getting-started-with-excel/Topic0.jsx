// Topic0.jsx
import React from "react";

export default function Topic0() {
  return (
    <div className="space-y-8 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Introduction to Microsoft Excel
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Understand what Excel is, why it is so widely used in education and
          professional life, and how it becomes the base tool for data, accounts,
          reports, and decision-making.
        </p>
      </header>

      {/* LEARNING OBJECTIVES */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">
          After this topic, you will be able to:
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-slate-300 text-sm md:text-base">
          <li>Explain what Microsoft Excel is in simple words.</li>
          <li>Identify different areas where Excel is used in study and work.</li>
          <li>Recognize the role of Excel in accounts, GST, data analysis and MIS.</li>
          <li>Understand why Excel is considered a “must know” digital skill.</li>
        </ul>
      </section>

      {/* WHAT IS EXCEL */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          What is Microsoft Excel?
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Microsoft Excel is a spreadsheet software. It allows you to store data
          in rows and columns, perform calculations on that data, create charts,
          analyze trends, and prepare reports. Think of it as a powerful digital
          register with built-in calculator and graph paper.
        </p>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Each Excel file is called a <span className="font-semibold">workbook</span>.
          Inside the workbook, you work with one or more{" "}
          <span className="font-semibold">worksheets</span> (or “sheets”).
          Worksheets are made of a grid of cells (tiny boxes) arranged in rows
          and columns.
        </p>
      </section>

      {/* WHERE EXCEL IS USED */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-300">
          Where is Excel Used in Study and Work?
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-lg font-semibold text-sky-300 mb-2">
              In School / College
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-300">
              <li>Maintaining student marks and attendance.</li>
              <li>Creating project data tables and charts.</li>
              <li>Statistical calculations for science, economics, commerce.</li>
              <li>Simple data analysis for academic research.</li>
            </ul>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-lg font-semibold text-sky-300 mb-2">
              In Office / Business
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-300">
              <li>Sales register, stock register, purchase register.</li>
              <li>Salary sheet, PF, ESI and other HR calculations.</li>
              <li>GST working sheets, reconciliation and reports.</li>
              <li>MIS dashboards and performance tracking.</li>
              <li>Budgeting and financial projections.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* REAL-LIFE EXAMPLES */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-purple-300">
          Real-Life Examples
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm md:text-base">
          <li>
            A shopkeeper tracks daily sales of items in Excel and finds out
            which product is selling more.
          </li>
          <li>
            An accountant prepares a GST working sheet where each invoice is
            entered and tax is calculated automatically with formulas.
          </li>
          <li>
            A student prepares a project on population growth, enters data from
            different years, and creates charts to show trends.
          </li>
        </ul>
      </section>

      {/* PRACTICE */}
      <section className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-emerald-300">
          Try It Yourself – Activity
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Open Microsoft Excel on your computer.</li>
          <li>
            Create a new blank workbook and save it as{" "}
            <span className="font-mono">MyFirstExcel.xlsx</span>.
          </li>
          <li>
            In the first sheet, enter a simple table of 5 items:
            <br />
            <span className="italic">
              Item Name, Quantity, Rate, Total Amount.
            </span>
          </li>
          <li>
            Manually calculate Total Amount for each item using pen and paper.
          </li>
          <li>
            Then enter the same values in Excel and compare. (We will automate
            total calculation with formulas in later topics.)
          </li>
        </ol>
      </section>

      {/* MINI QUIZ */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-rose-300">Quick Check</h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>What is a spreadsheet?</li>
          <li>Name any three uses of Excel in office work.</li>
          <li>What is the name given to an Excel file?</li>
          <li>Why is Excel important for students?</li>
        </ol>
        <p className="text-xs text-slate-500">
          (Teacher/Trainer: You may use this as a short oral or written quiz.)
        </p>
      </section>
    </div>
  );
}
