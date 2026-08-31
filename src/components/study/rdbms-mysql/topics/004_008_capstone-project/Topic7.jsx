import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Phase 6: Procedural Automation (Stored Procedures, Triggers for Auditing, Event Scheduler)
 * Module: 004_008_capstone-project
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Phase 6: Procedural Automation (Stored Procedures, Triggers for Auditing, Event Scheduler).
 */
const Topic7 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Atomic Procedures",
      title: "1. Atomic Multi-Table Stored Procedures (Checkout Workflow)",
      badge: "Stored Procedure",
      badgeColor: "emerald",
      sqlSnippet: `-- ⚡ COMPLETE ATOMIC ORDER CHECKOUT TRANSACTION PROCEDURE:
DELIMITER $$
CREATE PROCEDURE sp_process_checkout(
  IN p_customer_id BIGINT,
  IN p_product_id BIGINT,
  IN p_qty INT,
  OUT p_order_id BIGINT,
  OUT p_status_code VARCHAR(20)
)
proc_label: BEGIN
  DECLARE v_stock INT;
  DECLARE v_price DECIMAL(10,2);
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_status_code = 'TRANSACTION_ERROR';
  END;

  START TRANSACTION;
  -- Lock row for update:
  SELECT stock_quantity, unit_price INTO v_stock, v_price 
  FROM products WHERE product_id = p_product_id FOR UPDATE;

  IF v_stock &lt; p_qty THEN
    ROLLBACK;
    SET p_status_code = 'INSUFFICIENT_STOCK';
    LEAVE proc_label;
  END IF;

  -- Deduct inventory:
  UPDATE products SET stock_quantity = stock_quantity - p_qty WHERE product_id = p_product_id;

  -- Create order:
  INSERT INTO orders (customer_id, total_amount, order_status)
  VALUES (p_customer_id, v_price * p_qty, 'CONFIRMED');
  SET p_order_id = LAST_INSERT_ID();

  -- Insert order item:
  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (p_order_id, p_product_id, p_qty, v_price);

  COMMIT;
  SET p_status_code = 'SUCCESS';
END $$
DELIMITER ;`,
      explanation: "Encapsulates inventory verification, pessimistic row locking, stock reduction, and order creation inside a single atomic ACID transaction.",
      keyTakeaways: ["Uses SELECT ... FOR UPDATE to prevent race conditions and overselling.","EXIT HANDLER FOR SQLEXCEPTION guarantees automatic rollback on failure.","Returns status codes (SUCCESS, INSUFFICIENT_STOCK) for backend application consumption."]
    },
    concept2: {
      conceptName: "2. Audit Triggers",
      title: "2. Automated Audit Trail Triggers (BEFORE / AFTER)",
      badge: "Audit Triggers",
      badgeColor: "cyan",
      sqlSnippet: `-- 🛡️ AUDIT TRIGGER CAPTURING SALARY CHANGES:
CREATE TABLE employee_audit_log (
  audit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  old_salary DECIMAL(10,2),
  new_salary DECIMAL(10,2),
  changed_by VARCHAR(100),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$
CREATE TRIGGER trg_audit_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  IF OLD.salary != NEW.salary THEN
    INSERT INTO employee_audit_log (employee_id, old_salary, new_salary, changed_by)
    VALUES (OLD.employee_id, OLD.salary, NEW.salary, CURRENT_USER());
  END IF;
END $$
DELIMITER ;`,
      explanation: "Database triggers automatically capture data modifications, recording previous values, new values, user identities, and timestamps.",
      keyTakeaways: ["Triggers execute automatically inside the transaction of the triggering statement.","Access OLD.column and NEW.column values to detect and log exact field changes.","Provides tamper-proof compliance logging for financial and HR regulations."]
    },
    concept3: {
      conceptName: "3. Event Scheduler",
      title: "3. Recurring Automated Database Maintenance Events",
      badge: "Event Scheduler",
      badgeColor: "purple",
      sqlSnippet: `-- ⏰ SCHEDULED MIDNIGHT CART EXPIRATION CLEANUP:
SET GLOBAL event_scheduler = ON;

DELIMITER $$
CREATE EVENT evt_expire_abandoned_carts
ON SCHEDULE EVERY 1 DAY
STARTS '2026-09-01 00:00:00'
DO
BEGIN
  -- Release inventory reserved in unpaid carts older than 2 hours:
  UPDATE products p
  JOIN cart_items ci ON p.product_id = ci.product_id
  JOIN carts c ON ci.cart_id = c.cart_id
  SET p.stock_quantity = p.stock_quantity + ci.quantity
  WHERE c.status = 'ACTIVE' AND c.updated_at &lt; NOW() - INTERVAL 2 HOUR;

  -- Mark carts expired:
  UPDATE carts 
  SET status = 'EXPIRED' 
  WHERE status = 'ACTIVE' AND updated_at < NOW() - INTERVAL 2 HOUR;
END $$
DELIMITER ;`,
      explanation: "MySQL Event Scheduler runs recurring maintenance routines directly inside the database engine without relying on external cron jobs.",
      keyTakeaways: ["Verify event_scheduler is enabled with SET GLOBAL event_scheduler = ON.","Automate routine tasks like releasing abandoned cart inventory or purging logs.","Inspect scheduled events with SHOW EVENTS."]
    },
    concept4: {
      conceptName: "4. Stored Functions",
      title: "4. Deterministic User-Defined Stored Functions (UDFs)",
      badge: "Stored Functions",
      badgeColor: "rose",
      sqlSnippet: `-- 🧮 DETERMINISTIC TAX CALCULATION FUNCTION:
DELIMITER $$
CREATE FUNCTION fn_calculate_gst(
  p_amount DECIMAL(12,2),
  p_tax_slab_percent DECIMAL(5,2)
) 
RETURNS DECIMAL(12,2)
DETERMINISTIC
NO SQL
BEGIN
  RETURN ROUND(p_amount * (p_tax_slab_percent / 100.0), 2);
END $$
DELIMITER ;

-- Usage in standard queries:
SELECT order_id, total_amount, fn_calculate_gst(total_amount, 18.00) AS gst_amount FROM orders;`,
      explanation: "Deterministic stored functions encapsulate standardized mathematical formulas and business calculations for reuse across SQL queries.",
      keyTakeaways: ["Declare DETERMINISTIC to allow optimizer caching of calculation results.","Stored functions return a single scalar value and can be embedded in SELECT lists.","Centralizes GST tax and discount rules in a single maintainable routine."]
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
            Topic 7 of 11
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Phase 6: Procedural Automation (Stored Procedures, Triggers for Auditing, Event Scheduler)
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Building server-side procedural business logic, transactional atomic checkouts, automated audit trail triggers, and recurring maintenance event jobs.
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
              <h3 className="font-bold text-white text-base">ACID Procedures</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Transactional procedures with pessimistic locking and error rollback handlers.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Audit Triggers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Automatic tamper-proof changelogging of modified row attributes.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">Event Jobs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Automated recurring maintenance and abandoned cart inventory release.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Functions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Deterministic scalar calculation functions for tax, currency, and scoring.</p>
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
                >
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
                  Case 1: Mahima & Susmita – Audit Logging on Patient Vitals in Jadavpur
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Hospital Triggers
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mahima implemented AFTER UPDATE triggers on ICU patient vitals in Jadavpur Hospital. Any modification to prescribed dosage or doctor notes was automatically copied into an immutable medical audit table with timestamp and doctor ID, satisfying healthcare accreditation audits.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Mamata – Scheduled Daily Interest Accrual in Ichapur Bank
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Banking Events
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Ichapur, Debangshu configured a midnight MySQL Event that iterated through active fixed deposit accounts, calculated daily interest using a deterministic stored function, and posted journal entries with zero manual operator intervention.
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
                <span>⚠️</span> Pitfall 1: Triggers Calling Heavy Procedures
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Placing complex multi-table queries or external network calls inside row triggers slows down every single INSERT/UPDATE statement.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep triggers lightweight; restrict them to audit logging and simple constraint validation.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Missing DELIMITER Keyword
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing procedure definitions without changing the command delimiter triggers syntax errors at the first semicolon.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always wrap stored routine definitions with DELIMITER $$ ... DELIMITER ;.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Always Implement Error Handlers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Declare explicit EXIT HANDLER FOR SQLEXCEPTION to ensure failed transactions roll back cleanly.
              </p>
              <div className="text-xs text-slate-400">
                Prevents orphaned locks and partial table updates.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Grant Granular Routine Privileges
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Grant EXECUTE privilege only to specific application service accounts rather than root.
              </p>
              <div className="text-xs text-slate-400">
                Enforces principle of least privilege on stored routines.
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
            title="Topic 7: Phase 6: Procedural Automation (Stored Procedures, Triggers for Auditing, Event Scheduler)"
            content={noteText}
          />

          <Teacher
            note="Server-side procedural logic turns a passive relational schema into an active, self-regulating data engine! For your capstone project, write at least 3 comprehensive stored procedures (including checkout/transfer transactions), 3 audit triggers, and 1 recurring maintenance event. Make sure your procedures handle exceptions gracefully!"
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
            title="Phase 6: Procedural Automation (Stored Procedures, Triggers for Auditing, Event Scheduler) FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
