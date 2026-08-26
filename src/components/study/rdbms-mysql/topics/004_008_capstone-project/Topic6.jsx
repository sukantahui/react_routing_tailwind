import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Phase 5: Analytical SQL Reports (Window Functions, CTEs, GROUP BY ROLLUP, Financial Metrics)
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 5: Analytical SQL Reports (Window Functions, CTEs, GROUP BY ROLLUP, Financial Metrics).
 */
const Topic6 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Window Analytics",
      title: "1. Executive Window Analytics (Ranking & Running Totals)",
      badge: "Window Functions",
      badgeColor: "emerald",
      sqlSnippet: `-- 📈 TOP 3 BEST-SELLING PRODUCTS PER CATEGORY + RUNNING SALES:
WITH RankedSales AS (
  SELECT 
    c.category_name,
    p.product_name,
    SUM(oi.quantity * oi.unit_price) AS total_revenue,
    DENSE_RANK() OVER (
      PARTITION BY c.category_id 
      ORDER BY SUM(oi.quantity * oi.unit_price) DESC
    ) AS category_rank,
    SUM(SUM(oi.quantity * oi.unit_price)) OVER (
      PARTITION BY c.category_id 
      ORDER BY SUM(oi.quantity * oi.unit_price) DESC
    ) AS category_running_total
  FROM order_items oi
  JOIN products p ON oi.product_id = p.product_id
  JOIN categories c ON p.category_id = c.category_id
  GROUP BY c.category_id, c.category_name, p.product_id, p.product_name
)
SELECT * FROM RankedSales WHERE category_rank <= 3;`,
      explanation: "Window functions calculate category rankings and cumulative sales totals without requiring multiple correlated subqueries.",
      keyTakeaways: ["Use DENSE_RANK() to assign contiguous ranking positions without gaps.","Use SUM() OVER (PARTITION BY ... ORDER BY ...) to compute cumulative progress.","Wrap analytics inside Common Table Expressions (CTEs) for modular readability."]
    },
    concept2: {
      conceptName: "2. MoM & YoY Growth",
      title: "2. Month-over-Month (MoM) & Year-over-Year Growth Analytics",
      badge: "Time Series",
      badgeColor: "cyan",
      sqlSnippet: `-- 📊 MONTH-OVER-MONTH REVENUE GROWTH USING LAG():
WITH MonthlyRevenue AS (
  SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS sales_month,
    SUM(total_amount) AS current_month_revenue
  FROM orders
  WHERE order_status = 'COMPLETED'
  GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT 
  sales_month,
  current_month_revenue,
  LAG(current_month_revenue, 1) OVER (ORDER BY sales_month) AS prev_month_revenue,
  ROUND(
    ((current_month_revenue - LAG(current_month_revenue, 1) OVER (ORDER BY sales_month)) / 
    LAG(current_month_revenue, 1) OVER (ORDER BY sales_month)) * 100, 2
  ) AS mom_growth_percentage
FROM MonthlyRevenue;`,
      explanation: "The LAG() window function retrieves preceding period revenues to calculate precise percentage growth rates across monthly intervals.",
      keyTakeaways: ["LAG(col, 1) accesses the previous row value according to window ordering.","Handle NULL on the first row with COALESCE or IFNULL.","Essential KPI for business intelligence and financial reporting dashboards."]
    },
    concept3: {
      conceptName: "3. Hierarchical Summaries",
      title: "3. Hierarchical Subtotals & Grand Totals with WITH ROLLUP",
      badge: "GROUP BY ROLLUP",
      badgeColor: "purple",
      sqlSnippet: `-- 🏢 MULTI-LEVEL SALES REPORT WITH SUB-TOTALS & GRAND TOTAL:
SELECT 
  COALESCE(branch_name, '--- ALL BRANCHES (GRAND TOTAL) ---') AS branch,
  COALESCE(department_name, '--- SUB TOTAL ---') AS department,
  SUM(salary) AS total_payroll_expense,
  COUNT(employee_id) AS total_staff_count
FROM employees
GROUP BY branch_name, department_name WITH ROLLUP;`,
      explanation: "WITH ROLLUP automatically computes hierarchical subtotals and grand totals in a single unified database query pass.",
      keyTakeaways: ["Generates super-aggregate summary rows along grouping hierarchies.","Use COALESCE to replace NULL labels with human-friendly subtotal descriptions.","Replaces multiple UNION ALL queries with a single optimized scan."]
    },
    concept4: {
      conceptName: "4. Customer Retention",
      title: "4. Customer Cohort Retention & Recency-Frequency (RFM)",
      badge: "RFM Analytics",
      badgeColor: "rose",
      sqlSnippet: `-- 👥 RFM (RECENCY, FREQUENCY, MONETARY) SEGMENTATION:
SELECT 
  customer_id,
  DATEDIFF(CURDATE(), MAX(order_date)) AS recency_days,
  COUNT(order_id) AS frequency_orders,
  SUM(total_amount) AS monetary_value,
  NTILE(5) OVER (ORDER BY DATEDIFF(CURDATE(), MAX(order_date)) ASC) AS r_score,
  NTILE(5) OVER (ORDER BY COUNT(order_id) DESC) AS f_score,
  NTILE(5) OVER (ORDER BY SUM(total_amount) DESC) AS m_score
FROM orders
WHERE order_status = 'COMPLETED'
GROUP BY customer_id;`,
      explanation: "RFM analytics segments customers into quintiles using NTILE(5) to identify high-value VIP patrons versus churn risks.",
      keyTakeaways: ["NTILE(5) buckets records into 5 equal statistical quintiles.","Combines aggregate metrics (Recency, Frequency, Monetary) into actionable scores.","Powers marketing automation and customer loyalty programs."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.8: Capstone
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 6 of 11
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Phase 5: Analytical SQL Reports (Window Functions, CTEs, GROUP BY ROLLUP, Financial Metrics)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Developing 15 enterprise-grade analytical queries for executive KPI dashboards, period-over-period growth, top-N rankings, and running ledger totals.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Pillars ───────────────────────── */}
        <section id="pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Architectural Pillars
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core design foundations and production engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Window Framing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">PARTITION BY and ORDER BY framing computing running totals and rankings.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Time-Series</h3>
              <p className="text-xs text-slate-300 leading-relaxed">LAG() and LEAD() offsets measuring period-over-period percentage growth.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">ROLLUP</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Hierarchical multidimensional subtotals and grand totals in one pass.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">RFM Scoring</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Customer lifetime value and cohort segmentation using statistical NTILE.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Engineering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore live SQL implementation scripts, schema patterns, and architectural takeaways.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(conceptsData).map((key) => {
              const concept = conceptsData[key];
              const isSelected = selectedConceptKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConceptKey(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {concept.conceptName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Phase Implementation
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentConcept.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentConcept.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentConcept.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentConcept.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentConcept.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentConcept.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentConcept.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                SQL Runbook &amp; Production Snippet:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentConcept.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Key Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentConcept.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Practical production database case studies in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Susmita & Mamata – MoM Sales Growth in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Retail Analytics
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Susmita designed a Month-over-Month sales report using LAG() across ₹1.8 Crores in retail revenue in Barrackpore. The query highlighted a 34% surge during festive quarters and pinpointed slow product categories for discount clearance.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – Multi-Branch Payroll Rollup in Kolkata
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fintech ROLLUP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Debangshu implemented a GROUP BY branch_name, department_name WITH ROLLUP query across 12 Kolkata bank branches. The single-statement report provided branch managers with department breakdowns while giving the CFO instant grand total payroll numbers.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential guardrails, common anti-patterns, and enterprise coding standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Filtering Window Functions in WHERE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting to write WHERE DENSE_RANK() <= 3 directly in the same query block triggers SQL syntax errors.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Wrap window function calculations in a CTE or derived subquery before applying WHERE filters.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting PARTITION BY in Rolling Sums
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting PARTITION BY when calculating customer running totals mixes transactions across all customers into a single continuous sum.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always specify PARTITION BY customer_id to isolate window calculations per entity.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Structure with Modular CTEs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use Common Table Expressions (WITH clause) to break complex 40-line analytics into clean, testable logical steps.
              </p>
              <div className="text-xs text-slate-400">
                Improves SQL readability, maintainability, and code review speed.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Index ORDER BY Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure columns used in PARTITION BY and ORDER BY within window clauses have matching composite indexes.
              </p>
              <div className="text-xs text-slate-400">
                Allows the MySQL query engine to stream window results without temporary filesorts.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 6: Phase 5: Analytical SQL Reports (Window Functions, CTEs, GROUP BY ROLLUP, Financial Metrics)"
            content={noteText}
          />

          <Teacher
            note="Analytical SQL is where you demonstrate the true power of relational databases! For your capstone project, write 15 distinct analytical queries: include top-N rankings per category, running balance totals, period-over-period growth with LAG(), and hierarchical summaries with ROLLUP. Explain what business decisions each query enables!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances and viva voce examination questions for this milestone.
            </p>
          </div>

          <FAQTemplate
            title="Phase 5: Analytical SQL Reports (Window Functions, CTEs, GROUP BY ROLLUP, Financial Metrics) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
