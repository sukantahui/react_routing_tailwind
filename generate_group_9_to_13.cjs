const fs = require('fs');
const path = require('path');
const { buildTopicJsx, baseDir } = require('./topic_template_engine.cjs');

const topics9to13 = [
  // ---------------------------------------------------------------------------
  // TOPIC 9: EDATE
  // ---------------------------------------------------------------------------
  {
    idx: 9,
    name: "EDATE",
    h1Title: "EDATE Function — Exact Month Offset & Maturity Milestone Engine",
    badgeLevel: "Core Calendar Math · Maturity Engine",
    bloomTaxonomy: "Analyze & Project",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">EDATE(start_date, months)</code> function calculates the serial number of the date that is the indicated number of months before or after a starting date.</p><p>Unlike simple day addition (<code className="text-rose-400 font-mono">=A2 + 30</code> or <code className="text-rose-400 font-mono">=A2 + 90</code>) which introduces severe calendar drift because months vary between 28, 29, 30, and 31 days, <code className="text-indigo-300 font-mono">EDATE()</code> performs true calendar-month stepping. It preserves the exact day of the month (e.g. the 15th remains the 15th), while intelligently <strong>clamping</strong> to the last valid calendar day when the target month is shorter than the starting month (e.g. January 31 + 1 month clamps gracefully to February 28 or 29, avoiding non-existent February 31 errors).</p>`,
    syntaxSummary: "=EDATE(start_date, months)",
    domainSummary: "Software Subscriptions, Loan Tenors & Employee Probation",
    patternSummary: "=EDATE(JoiningDate, 6) (6-Month Probation Maturity)",
    engineType: "Calendar Month Offset Synthesizer",
    canonicalSignature: `=EDATE(start_date, months)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">start_date:</strong> Required. A date representing the starting date. Dates should be entered using DATE(), cell references, or formulas.</div><div>• <strong className="text-sky-300">months:</strong> Required. The number of months before (negative integer) or after (positive integer) start_date. Non-integer decimals are truncated toward zero.</div><div>• <strong className="text-amber-300">End-of-Month Clamping:</strong> If the day of start_date exceeds the total number of days in the resulting month, EDATE automatically clamps to the final day of that target month.</div>`,
    matrixTitle: "EDATE Offset & Boundary Clamping Matrix",
    matrixSubtitle: "Observe how EDATE maintains day parity and clamps shorter month horizons.",
    matrixHeaders: ["Start Date", "Months Offset", "EDATE Result", "Day Clamping Behavior", "Industrial Application"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-15</td>
        <td className="py-3.5 px-4 text-white">+3 Months</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-04-15</td>
        <td className="py-3.5 px-4 text-slate-300">Preserved Day 15</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Quarterly SaaS renewal billing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-31</td>
        <td className="py-3.5 px-4 text-white">+1 Month</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">2026-02-28</td>
        <td className="py-3.5 px-4 text-amber-400">Clamped to Feb 28</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Common year February month-end clamp</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-01-31</td>
        <td className="py-3.5 px-4 text-white">+1 Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2024-02-29</td>
        <td className="py-3.5 px-4 text-emerald-400">Clamped to Feb 29</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap year February month-end clamp</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-03-31</td>
        <td className="py-3.5 px-4 text-white">+1 Month</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">2026-04-30</td>
        <td className="py-3.5 px-4 text-amber-400">Clamped to Apr 30</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">31-day month rolling into 30-day month</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12</td>
        <td className="py-3.5 px-4 text-white">-6 Months</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">2026-05-12</td>
        <td className="py-3.5 px-4 text-slate-300">Preserved Day 12</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Historical semi-annual lookback audit</td>
      </tr>
    `,
    deepDiveTitle: "The Catastrophe of Naive Day Multiples (+30 Days)",
    deepDiveSubtitle: "Why adding multiples of 30 days causes compounding drift in contract management.",
    deepDiveContent: `<p>A frequent error in loan and subscription management is projecting monthly milestones by adding 30 or 90 days: <code className="text-rose-400 font-mono">=A2 + 30</code> or <code className="text-rose-400 font-mono">=A2 + 90</code>.</p><p>Because July and August both have 31 days, and February has 28 days, adding 30 days causes the scheduled billing date to rapidly wander backwards across the calendar! By month 12, a bill intended for the 1st of the month arrives on the 26th of the prior month! <code className="text-indigo-300 font-mono">EDATE(A2, 1)</code> mathematically steps the month register while keeping the day invariant, ensuring that bills, loan EMIs, and warranties stay locked on their contractual day of the month.</p>`,
    badPracticeTitle: "The Wandering +30 Day Error",
    badPracticeCode: `=A2 + 30`,
    badPracticeDesc: "Causes cumulative date drift; billing day creeps forward or backward due to uneven calendar months.",
    goodPracticeTitle: "Production Contractual EDATE Offset",
    goodPracticeCode: `=EDATE(A2, 1)`,
    goodPracticeDesc: "Locks the billing day to the exact anniversary day of each month, clamping only on shorter months.",
    svgCaption: "Calendar month stepping preserving day index while gracefully clamping February boundaries.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="40" y="50" width="180" height="90" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="130" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Start Date</text>
        <text x="130" y="105" textAnchor="middle" fill="#A5B4FC" className="text-sm font-bold font-mono">31-Jan-2026</text>
        <text x="130" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Day Index: 31</text>

        <path d="M 220 95 L 340 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />
        <text x="280" y="80" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">+1 Month</text>

        <rect x="340" y="50" width="220" height="90" rx="14" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">EDATE Clamping Logic</text>
        <text x="450" y="102" textAnchor="middle" fill="#F87171" className="text-xs">Feb 31 Does Not Exist!</text>
        <text x="450" y="122" textAnchor="middle" fill="#34D399" className="text-xs font-mono">Clamps to Final Day of Feb</text>

        <path d="M 560 95 L 640 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="640" y="50" width="160" height="90" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Result</text>
        <text x="720" y="105" textAnchor="middle" fill="#6EE7B7" className="text-sm font-bold font-mono">28-Feb-2026</text>
        <text x="720" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">Valid Month End</text>
      </svg>
    `,
    simulatorCode: `
  const [inpStartDate, setInpStartDate] = useState("2026-01-31");
  const [inpMonths, setInpMonths] = useState(1);

  const edateResult = useMemo(() => {
    const s = new Date(inpStartDate);
    const mOffset = parseInt(inpMonths, 10);

    if (isNaN(s.getTime()) || isNaN(mOffset)) {
      return { isError: true, error: "#VALUE! Invalid date or month offset" };
    }

    const startYear = s.getFullYear();
    const startMonth = s.getMonth();
    const startDay = s.getDate();

    // Calculate target year and month
    const targetMonthIndex = startMonth + mOffset;
    const targetDateObj = new Date(startYear, targetMonthIndex, 1);
    const targetYear = targetDateObj.getFullYear();
    const targetMonth = targetDateObj.getMonth();

    // Check days in target month
    const daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const clampedDay = Math.min(startDay, daysInTargetMonth);
    const finalDate = new Date(targetYear, targetMonth, clampedDay);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outDateStr = \`\${String(finalDate.getDate()).padStart(2, "0")}-\${monthNames[finalDate.getMonth()]}-\${finalDate.getFullYear()}\`;

    const wasClamped = clampedDay < startDay;

    return {
      isError: false,
      outDateStr,
      wasClamped,
      startDay,
      clampedDay,
      daysInTargetMonth,
      dayOfWeek: finalDate.toLocaleDateString("en-US", { weekday: "long" })
    };
  }, [inpStartDate, inpMonths]);

  const applyPreset = (preset) => {
    if (preset === "quarterly") {
      setInpStartDate("2026-01-15");
      setInpMonths(3);
    } else if (preset === "clamp_feb") {
      setInpStartDate("2026-01-31");
      setInpMonths(1);
    } else if (preset === "probation") {
      setInpStartDate("2026-11-12");
      setInpMonths(6);
    } else if (preset === "retro_annual") {
      setInpStartDate("2026-11-12");
      setInpMonths(-12);
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive EDATE Month Offset Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test positive and negative month stepping, observe day parity preservation, and inspect automatic boundary clamping.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("quarterly")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Quarterly (+3 Mos)
          </button>
          <button
            onClick={() => applyPreset("clamp_feb")}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition cursor-pointer"
          >
            Trigger Feb Clamp
          </button>
          <button
            onClick={() => applyPreset("probation")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            HR Probation (+6 Mos)
          </button>
          <button
            onClick={() => applyPreset("retro_annual")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Lookback (-12 Mos)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Base Date</span>
          </label>
          <input
            type="date"
            value={inpStartDate}
            onChange={(e) => setInpStartDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Months Offset (Integer)</span>
            <span className="text-[10px] text-sky-400 font-mono">+ Future / - Past</span>
          </label>
          <input
            type="number"
            step="1"
            value={inpMonths}
            onChange={(e) => setInpMonths(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =EDATE("{inpStartDate}", {inpMonths})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Target Date:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {edateResult.isError ? edateResult.error : edateResult.outDateStr}
            </span>
          </div>
        </div>

        {!edateResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day of Week:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {edateResult.dayOfWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Target Month Length:</span>
              <span className="text-purple-300 font-semibold font-mono text-sm">
                {edateResult.daysInTargetMonth} Days in Month
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Clamping Activated:</span>
              <span
                className={\`font-bold inline-flex items-center gap-1.5 \${
                  edateResult.wasClamped ? "text-amber-400" : "text-emerald-400"
                }\`}
              >
                {edateResult.wasClamped
                  ? \`⚠️ Clamped from Day \${edateResult.startDay} to \${edateResult.clampedDay}\`
                  : "✓ Day Preserved Exactly"}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Human Resources & Talent Management",
        location: "Kolkata IT Tech Park",
        title: "Employee 6-Month Statutory Probation Review Milestone",
        context: "New corporate recruits are placed on a 6-month statutory probation beginning on joining date in cell B2. Generate their probation review milestone date.",
        comment: "Advance joining date by exactly 6 calendar months",
        formula: `=EDATE(B2, 6)`,
        sampleOutput: `12-May-2027 (for employee joined on 12-Nov-2026)`
      },
      {
        category: "Corporate SaaS & Enterprise Cloud",
        location: "Salt Lake Sector V Cloud Services",
        title: "Annual Cloud Subscription Renewal Milestone",
        context: "Enterprise software licenses renew annually on the contract activation date in C2. Establish the upcoming annual renewal date for billing.",
        comment: "Add 12 calendar months to contract activation date",
        formula: `=EDATE(C2, 12)`,
        sampleOutput: `15-Apr-2027 (from 15-Apr-2026 activation)`
      },
      {
        category: "Banking & Loan Amortization",
        location: "Barrackpore Central Cooperative Bank",
        title: "Commercial Loan EMI Schedule Generator",
        context: "Construct a 60-month monthly repayment schedule by dragging a formula down column D starting from loan disbursement date in D2.",
        comment: "Increment month counter dynamically using ROW() - ROW($D$2)",
        formula: `=EDATE($D$2, ROW() - ROW($D$2))`,
        sampleOutput: `Consecutive monthly EMI payment milestones`
      },
      {
        category: "Retail Consumer Credit & EMI",
        location: "Shyamnagar Electronics Retail",
        title: "Zero-Cost 3-Month Consumer Durable EMI Maturity",
        context: "Customers purchasing consumer electronics on 3-month zero-interest EMIs receive payment reminder schedules starting from purchase date in E2.",
        comment: "Calculate final maturity date 3 months out",
        formula: `=EDATE(E2, 3)`,
        sampleOutput: `12-Feb-2027 (from 12-Nov-2026 purchase)`
      },
      {
        category: "Medical Clinical Trials",
        location: "Ichapur Pharmaceutical Research",
        title: "Post-Treatment 18-Month Patient Follow-Up Visit",
        context: "Patients participating in vaccine trials must undergo medical examination exactly 18 months after final injection date in F2.",
        comment: "Add 18 months with automatic leap year and month-end clamping",
        formula: `=EDATE(F2, 18)`,
        sampleOutput: `31-Aug-2027 (from 28-Feb-2026 injection)`
      },
      {
        category: "Real Estate Commercial Leases",
        location: "Rajarhat Commercial Towers",
        title: "Commercial Lease 3-Year Escalation Notice Period",
        context: "Commercial leases increase rent by 15% every 36 months. Landlord must issue notice 3 months prior to escalation date (disbursed in G2).",
        comment: "Combine 36-month escalation minus 3-month notice (= 33 months)",
        formula: `=EDATE(G2, 33)`,
        sampleOutput: `01-Jan-2029 (for lease commenced on 01-Apr-2026)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Understand Month Parity Preservation",
        description: "EDATE aims to keep the day unchanged: the 14th of the month will stay the 14th in the target month.",
        code: "=EDATE('2026-05-14', 3) -> 2026-08-14"
      },
      {
        title: "Step 2: Observe Clamping Behavior",
        description: "If the target month has fewer days than the start month (e.g. 31st moving to April which has 30 days), EDATE clamps to the last day.",
        code: "=EDATE('2026-03-31', 1) -> 2026-04-30"
      },
      {
        title: "Step 3: Execute Backward Lookbacks",
        description: "Pass negative integers to look backward in time across historical fiscal cycles.",
        code: "=EDATE('2026-11-12', -6) -> 2026-05-12"
      },
      {
        title: "Step 4: Format Serial as Date",
        description: "EDATE returns raw serial integers (e.g. 46338). Format cell as Short Date to display human-readable output.",
        code: "Format Cells > Date > YYYY-MM-DD"
      }
    ],
    troubleshootingRows: [
      {
        code: "Displays Raw 5-Digit Number",
        cause: "EDATE returns an authentic Excel date serial, but cell number formatting is set to General.",
        trigger: "=EDATE(TODAY(), 1) displays 46368 instead of date",
        remedy: "Press Ctrl + Shift + # (or Format Cells > Date) to apply date formatting."
      },
      {
        code: "#VALUE! on Text Date",
        cause: "Start date argument contains unparseable text format.",
        trigger: "=EDATE('invalid_date', 3)",
        remedy: "Wrap start date with DATEVALUE() or construct with DATE(Y, M, D)."
      },
      {
        code: "Truncation of Decimal Months",
        cause: "Passing decimal month values like 2.7. EDATE truncates toward zero, treating 2.7 as 2.",
        trigger: "=EDATE(A2, 2.7) evaluates to 2 months",
        remedy: "Supply integers for months, or use DAY addition for partial months."
      }
    ],
    proTips: [
      {
        title: "Bulletproof DATEDIF Days Fix",
        text: "Fix the infamous DATEDIF 'MD' bug using EDATE: =B2 - EDATE(A2, DATEDIF(A2, B2, 'M')). This is mathematically flawless!",
        color: "text-indigo-400"
      },
      {
        title: "Preserving Month-End Anchors",
        text: "If you want month-ends to always land on month-ends (e.g. Feb 28 -> Mar 31), use EOMONTH instead of EDATE.",
        color: "text-emerald-400"
      },
      {
        title: "Dynamic Leap Year Adjustment",
        text: "EDATE automatically respects February 29 during leap years. 2023-11-29 + 3 months evaluates to 2024-02-29.",
        color: "text-sky-400"
      },
      {
        title: "Semi-Annual & Quarterly Multiples",
        text: "Multiply interval counters by 3 for quarterly (=EDATE(A2, Q*3)) or by 6 for semi-annual (=EDATE(A2, S*6)).",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "Algorithmic Design",
        question: "Why does EDATE(31-Jan, 1) evaluate to 28-Feb, while EDATE(28-Feb, 1) evaluates to 28-Mar rather than 31-Mar?"
      },
      {
        prompt: "Contract Law",
        question: "If an insurance policy begins on August 31 with a 6-month claim window, why is EDATE legally superior to adding 180 days?"
      }
    ],
    mentorAdvice: "Never use =A2+30 or =A2+90 for monthly milestones. Calendar months vary between 28 and 31 days, so adding 30 days causes compounding schedule drift. Use EDATE to lock milestones to their exact monthly anniversary, and remember its automatic clamping on shorter months."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 10: EOMONTH
  // ---------------------------------------------------------------------------
  {
    idx: 10,
    name: "EOMONTH",
    h1Title: "EOMONTH Function — End-of-Month Financial Closing & Tax Cutoff Engine",
    badgeLevel: "Core Financial Math · Accounting Cutoff",
    bloomTaxonomy: "Evaluate & Synthesize",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">EOMONTH(start_date, months)</code> function calculates the serial number of the <strong>exact last calendar day of the month</strong> that is the indicated number of months before or after a starting date.</p><p>In financial engineering, accounting, and tax compliance, deadlines almost never land on arbitrary days like the 14th or 22nd — they are legally anchored to the final calendar day of the month (e.g. March 31 financial year closing, monthly GST/VAT input tax reconciliations, employee payroll freeze dates, and depreciation cutoff schedules). <code className="text-indigo-300 font-mono">EOMONTH()</code> eliminates all manual lookups and complex IF formulas, automatically resolving 28, 29, 30, and 31-day month boundaries across common and leap years.</p>`,
    syntaxSummary: "=EOMONTH(start_date, months)",
    domainSummary: "Financial Year-End Closing, Tax Deadlines & Depreciation",
    patternSummary: "=EOMONTH(TODAY(), 0) (Last Day of Current Month)",
    engineType: "Month-End Boundary Resolver",
    canonicalSignature: `=EOMONTH(start_date, months)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">start_date:</strong> Required. A date representing the starting date. Dates should be entered using DATE(), cell references, or formulas.</div><div>• <strong className="text-sky-300">months:</strong> Required. The number of months before (negative integer) or after (positive integer) start_date. Passing <code className="font-mono text-emerald-300">0</code> returns the final day of the starting date's current month.</div><div>• <strong className="text-amber-300">Leap Year Intelligence:</strong> EOMONTH automatically evaluates whether the target year is a leap year. Passing February on 2024 returns February 29; on 2025/2026 it returns February 28.</div>`,
    matrixTitle: "EOMONTH Month-End Horizon Matrix",
    matrixSubtitle: "Observe how EOMONTH navigates month boundaries relative to the current active month.",
    matrixHeaders: ["Formula Expression", "Relative Month", "Target Month-End", "Evaluated Serial", "Accounting Purpose"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, -1)</td>
        <td className="py-3.5 px-4 text-white">Prior Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">31-Oct-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46326</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Prior month ledger reconciliation cutoff</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 0)</td>
        <td className="py-3.5 px-4 text-white">Current Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">30-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46356</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Current month payroll freeze deadline</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 1)</td>
        <td className="py-3.5 px-4 text-white">Next Month</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">31-Dec-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46387</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Quarterly tax filing window closing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 3)</td>
        <td className="py-3.5 px-4 text-white">+3 Months</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">28-Feb-2027</td>
        <td className="py-3.5 px-4 text-slate-300">46446</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Common year February closing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=EOMONTH(A2, 0) + 1</td>
        <td className="py-3.5 px-4 text-white">Next Month Day 1</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">01-Dec-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46357</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Dynamic first day of next calendar month</td>
      </tr>
    `,
    deepDiveTitle: "The First-Day-of-Month Architecture Pattern",
    deepDiveSubtitle: "How adding 1 to EOMONTH creates the industry's cleanest month-start formula.",
    deepDiveContent: `<p>While Excel provides <code className="text-indigo-300 font-mono">EOMONTH</code> for month ends, it has no native <code className="text-rose-400 font-mono">BOMONTH</code> (Beginning of Month) function. How do elite financial architects determine the first day of the current, prior, or upcoming month?</p><p>By leveraging calendar topology: the day immediately following the last day of the prior month is ALWAYS the 1st day of the current month! <br/>• First Day of Current Month: <code className="text-emerald-300 font-mono">=EOMONTH(TODAY(), -1) + 1</code><br/>• First Day of Next Month: <code className="text-emerald-300 font-mono">=EOMONTH(TODAY(), 0) + 1</code><br/>This elegant idiom avoids all messy string parsing and is 100% immune to regional date confusion.</p>`,
    badPracticeTitle: "Brittle String Concatenation for Month Start",
    badPracticeCode: `="01/" & MONTH(TODAY()) & "/" & YEAR(TODAY())`,
    badPracticeDesc: "Generates text that breaks in mathematical formulas and inverts day/month in US vs UK regional settings.",
    goodPracticeTitle: "The Production EOMONTH + 1 Idiom",
    goodPracticeCode: `=EOMONTH(TODAY(), -1) + 1`,
    goodPracticeDesc: "Returns an authentic numeric date serial for the 1st of the current month with zero regional ambiguity.",
    svgCaption: "EOMONTH navigating from arbitrary transaction dates directly to month-end financial boundaries.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="40" y="50" width="200" height="90" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Arbitrary Transaction</text>
        <text x="140" y="105" textAnchor="middle" fill="#A5B4FC" className="text-sm font-bold font-mono">12-Nov-2026</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Mid-Month Posting</text>

        <path d="M 240 95 L 350 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />
        <text x="295" y="80" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">months = 0</text>

        <rect x="350" y="50" width="210" height="90" rx="14" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="455" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">=EOMONTH(A2, 0)</text>
        <text x="455" y="102" textAnchor="middle" fill="#E2E8F0" className="text-xs">Dynamic Month Length</text>
        <text x="455" y="122" textAnchor="middle" fill="#34D399" className="text-xs font-mono">Resolves to Day 30</text>

        <path d="M 560 95 L 630 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="630" y="50" width="180" height="90" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Month End Closing</text>
        <text x="720" y="105" textAnchor="middle" fill="#6EE7B7" className="text-sm font-bold font-mono">30-Nov-2026</text>
        <text x="720" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">Tax & Payroll Cutoff</text>
      </svg>
    `,
    simulatorCode: `
  const [inpRefDate, setInpRefDate] = useState("2026-11-12");
  const [inpEomMonths, setInpEomMonths] = useState(0);

  const eomonthResult = useMemo(() => {
    const s = new Date(inpRefDate);
    const mOffset = parseInt(inpEomMonths, 10);

    if (isNaN(s.getTime()) || isNaN(mOffset)) {
      return { isError: true, error: "#VALUE! Invalid date or month offset" };
    }

    const startYear = s.getFullYear();
    const startMonth = s.getMonth();

    // Target year and month
    const targetDateObj = new Date(startYear, startMonth + mOffset + 1, 0);
    const targetYear = targetDateObj.getFullYear();
    const targetMonth = targetDateObj.getMonth();
    const lastDay = targetDateObj.getDate();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outDateStr = \`\${String(lastDay).padStart(2, "0")}-\${monthNames[targetMonth]}-\${targetYear}\`;

    // First day of next month
    const firstDayNext = new Date(targetYear, targetMonth, lastDay + 1);
    const firstDayNextStr = \`\${String(firstDayNext.getDate()).padStart(2, "0")}-\${monthNames[firstDayNext.getMonth()]}-\${firstDayNext.getFullYear()}\`;

    // Days remaining in month from ref date (if offset is 0)
    let daysRemaining = null;
    if (mOffset === 0) {
      daysRemaining = lastDay - s.getDate();
    }

    return {
      isError: false,
      outDateStr,
      lastDay,
      firstDayNextStr,
      daysRemaining,
      dayOfWeek: targetDateObj.toLocaleDateString("en-US", { weekday: "long" })
    };
  }, [inpRefDate, inpEomMonths]);

  const applyPreset = (preset) => {
    if (preset === "current_end") {
      setInpRefDate("2026-11-12");
      setInpEomMonths(0);
    } else if (preset === "prior_end") {
      setInpRefDate("2026-11-12");
      setInpEomMonths(-1);
    } else if (preset === "tax_q4") {
      setInpRefDate("2026-11-12");
      setInpEomMonths(4); // Lands on March 31, 2027
    } else if (preset === "leap_feb") {
      setInpRefDate("2024-01-15");
      setInpEomMonths(1); // Lands on Feb 29, 2024
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive EOMONTH Financial Closing Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate corporate accounting cutoffs, month-end payroll freeze dates, and derive next month's opening day live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("current_end")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Current Month (0)
          </button>
          <button
            onClick={() => applyPreset("prior_end")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Prior Month (-1)
          </button>
          <button
            onClick={() => applyPreset("tax_q4")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Indian FY Closing (31-Mar)
          </button>
          <button
            onClick={() => applyPreset("leap_feb")}
            className="px-2.5 py-1 text-xs rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 border border-purple-800/60 transition cursor-pointer"
          >
            Leap Feb (29-Feb)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Reference Date (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Anchor Date</span>
          </label>
          <input
            type="date"
            value={inpRefDate}
            onChange={(e) => setInpRefDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Month Offset (0 = Current Month)</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer (-12 to +12)</span>
          </label>
          <input
            type="number"
            step="1"
            value={inpEomMonths}
            onChange={(e) => setInpEomMonths(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =EOMONTH("{inpRefDate}", {inpEomMonths})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Month End Date:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {eomonthResult.isError ? eomonthResult.error : eomonthResult.outDateStr}
            </span>
          </div>
        </div>

        {!eomonthResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day of Week:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {eomonthResult.dayOfWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Derived Next Month 1st:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {eomonthResult.firstDayNextStr} (=EOMONTH + 1)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Days Left in Month:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                {eomonthResult.daysRemaining !== null ? \`\${eomonthResult.daysRemaining} Days Remaining\` : "Historical / Future"}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Corporate Statutory Compliance",
        location: "Kolkata Corporate Finance",
        title: "Indian Financial Year Closing Audit Deadline",
        context: "Indian companies close statutory accounts on March 31. For any transaction recorded in date cell A2 during the fiscal year, project the exact financial book closing date.",
        comment: "Calculate March 31 end of current fiscal cycle",
        formula: `=DATE(YEAR(A2) + IF(MONTH(A2)>=4, 1, 0), 3, 31)`,
        sampleOutput: `31-Mar-2027 (for transaction in Nov 2026)`
      },
      {
        category: "Tax Compliance & GST Returns",
        location: "Barrackpore Tax Consultancy",
        title: "Monthly GSTR-3B Tax Filing Deadline Engine",
        context: "GSTR-3B tax returns are legally due on the 20th day of the month following the transaction month in cell B2. Establish the statutory filing deadline.",
        comment: "Find end of invoice month, then add 20 days",
        formula: `=EOMONTH(B2, 0) + 20`,
        sampleOutput: `20-Dec-2026 (for invoice issued in Nov 2026)`
      },
      {
        category: "HR & Enterprise Payroll",
        location: "Titagarh Wagons HR Complex",
        title: "Monthly Payroll Attendance Freeze Window",
        context: "Attendance clocks freeze on the final calendar day of the active month. Calculate days remaining for employees to regularize missing punches.",
        comment: "Subtract today from EOMONTH of current month",
        formula: `=EOMONTH(TODAY(), 0) - TODAY() & " DAYS TO CUTOFF"`,
        sampleOutput: `18 DAYS TO CUTOFF (on 12-Nov-2026)`
      },
      {
        category: "Fixed Assets & Depreciation",
        location: "Shyamnagar Industrial Plant",
        title: "Straight-Line Depreciation Month-End Convention",
        context: "Assets put into service on date in C2 begin depreciating on the first day of the following month, expiring on the final day of the 60th month.",
        comment: "Calculate asset useful life end date exactly 60 months out",
        formula: `=EOMONTH(C2, 60)`,
        sampleOutput: `30-Nov-2031 (for asset acquired in Nov 2026)`
      },
      {
        category: "Supply Chain & Vendor Accounts Payable",
        location: "Naihati Central Warehousing",
        title: "Standard Net 30 End-of-Month (30 EOM) Credit Terms",
        context: "Vendor invoice in D2 carries credit terms of 'Net 30 EOM' (payment is due on the final day of the month following invoice receipt).",
        comment: "Advance by 1 month to land on last day of following month",
        formula: `=EOMONTH(D2, 1)`,
        sampleOutput: `31-Dec-2026 (for invoice received in Nov 2026)`
      },
      {
        category: "Banking Treasury & Liquidity",
        location: "Ichapur Co-Operative Bank",
        title: "Quarterly Regulatory Liquidity Coverage Ratio (LCR)",
        context: "Reserve Bank of India (RBI) mandates liquidity audit filings at the end of each calendar quarter (March 31, June 30, September 30, December 31).",
        comment: "Calculate current calendar quarter end using EOMONTH",
        formula: `=EOMONTH(DATE(YEAR(E2), INT((MONTH(E2)-1)/3)*3 + 3, 1), 0)`,
        sampleOutput: `31-Dec-2026 (for transaction in Nov 2026)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Understand Month Offset Parameter",
        description: "months = 0 gives the end of the current month. Negative months look back; positive months look forward.",
        code: "=EOMONTH(A2, 0) -> Last day of current month\n=EOMONTH(A2, -1) -> Last day of prior month"
      },
      {
        title: "Step 2: Derive the First Day of Next Month",
        description: "Add 1 to EOMONTH(A2, 0) to instantly obtain the first day of the subsequent month.",
        code: "=EOMONTH(A2, 0) + 1"
      },
      {
        title: "Step 3: Derive the First Day of Current Month",
        description: "Add 1 to the end of the prior month: =EOMONTH(A2, -1) + 1.",
        code: "=EOMONTH(A2, -1) + 1"
      },
      {
        title: "Step 4: Format as Date",
        description: "Apply standard date formatting to ensure the serial renders as DD-MMM-YYYY.",
        code: "Format Cells > Date"
      }
    ],
    troubleshootingRows: [
      {
        code: "Displays Raw Serial Number",
        cause: "Cell is formatted as General. EOMONTH returns a numeric date serial.",
        trigger: "=EOMONTH(TODAY(), 0) displays 46356",
        remedy: "Apply Short Date format (Ctrl + Shift + #)."
      },
      {
        code: "#VALUE! on Text Argument",
        cause: "Start date argument is an unparseable text string.",
        trigger: "=EOMONTH('31/13/2026', 0)",
        remedy: "Pass authentic dates created via DATE() or DATEVALUE()."
      },
      {
        code: "Off-By-One Day Mismatch",
        cause: "Attempting to find the start of the month by subtracting days instead of adding 1 to EOMONTH(-1).",
        trigger: "=A2 - DAY(A2) returns last day of prior month, not first day of current",
        remedy: "Use: =EOMONTH(A2, -1) + 1 for start of month."
      }
    ],
    proTips: [
      {
        title: "Days in the Current Month",
        text: "Determine how many days are in the month of cell A2: =DAY(EOMONTH(A2, 0)). Returns 28, 29, 30, or 31 automatically!",
        color: "text-indigo-400"
      },
      {
        title: "The BOMONTH Replacement",
        text: "There is no native BOMONTH in Excel. Always use =EOMONTH(A2, -1) + 1. It is universally accepted across all financial institutions.",
        color: "text-emerald-400"
      },
      {
        title: "GST 20th Cutoff Idiom",
        text: "For Indian GST compliance, the due date is always =EOMONTH(InvoiceDate, 0) + 20.",
        color: "text-sky-400"
      },
      {
        title: "Quarter End Formula",
        text: "Project end of current quarter: =EOMONTH(A2, 3 - MOD(MONTH(A2)-1, 3) - 1).",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "System Architecture",
        question: "Why did Microsoft create EOMONTH when the formula =DATE(YEAR(A1), MONTH(A1)+1, 0) already returns the exact same result?"
      },
      {
        prompt: "Accounting Standards",
        question: "Why do accounting standards mandate the EOMONTH convention for depreciation rather than calculating per-diem days?"
      }
    ],
    mentorAdvice: "EOMONTH is the CFO's best friend. Memorize the two essential idioms: =DAY(EOMONTH(A2, 0)) to get the total days in any month, and =EOMONTH(A2, -1) + 1 to find the first day of the current month. These two patterns will eliminate 90% of your calendar calculation headaches."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 11: WEEKDAY
  // ---------------------------------------------------------------------------
  {
    idx: 11,
    name: "WEEKDAY",
    h1Title: "WEEKDAY Function — Day of Week & Weekend Identification Engine",
    badgeLevel: "Core Calendar Logic · Shift Classifier",
    bloomTaxonomy: "Analyze & Classify",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">WEEKDAY(serial_number, [return_type])</code> function returns an integer representing the day of the week for a given date serial number.</p><p>By default, Excel assigns Sunday = 1 through Saturday = 7. However, the function incorporates <strong>10 distinct return_type configurations</strong> (including Return Type 2: Monday = 1 through Sunday = 7, and Return Type 11-17 for international corporate calendars). In operational modeling, <code className="text-indigo-300 font-mono">WEEKDAY()</code> is the master engine for conditional formatting weekend rows, applying weekend overtime wage multipliers, and skipping non-operational days in logistics dispatch pipelines.</p>`,
    syntaxSummary: "=WEEKDAY(serial_number, [return_type])",
    domainSummary: "Overtime Payroll, Weekend Conditional Formatting & Fleet Dispatch",
    patternSummary: "=WEEKDAY(A2, 2) >= 6 (Identifies Sat/Sun Weekend)",
    engineType: "Day-of-Week Mapping Engine",
    canonicalSignature: `=WEEKDAY(serial_number, [return_type])`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">serial_number:</strong> Required. A sequential number representing the date of the day you want to identify. Dates must be authentic numeric serials.</div><div>• <strong className="text-sky-300">return_type:</strong> Optional. A number that determines the type of return value: <br/>&nbsp;&nbsp;• <code className="font-mono text-white">1 (or omitted):</code> Numbers 1 (Sunday) through 7 (Saturday).<br/>&nbsp;&nbsp;• <code className="font-mono text-emerald-300">2:</code> Numbers 1 (Monday) through 7 (Sunday). <em>(Enterprise standard for Mon-Fri workweeks!)</em><br/>&nbsp;&nbsp;• <code className="font-mono text-white">3:</code> Numbers 0 (Monday) through 6 (Sunday).<br/>&nbsp;&nbsp;• <code className="font-mono text-white">11-17:</code> Various starting day configurations.</div><div>• <strong className="text-amber-300">Weekend Detection Rule:</strong> Under Return Type 2, the weekend is effortlessly identified with the test: <code className="font-mono text-white">WEEKDAY(A2, 2) &gt;= 6</code>.</div>`,
    matrixTitle: "WEEKDAY Return Type Configuration Matrix",
    matrixSubtitle: "Select the optimal return type for your geographic and corporate calendar framework.",
    matrixHeaders: ["Return Type", "First Day of Week", "Day Range", "Weekend Filter Test", "Corporate Standard"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">1 (Default)</td>
        <td className="py-3.5 px-4 text-white">Sunday (= 1)</td>
        <td className="py-3.5 px-4 text-slate-300">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">OR(W=1, W=7)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Traditional US calendar layout</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2 (Recommended)</td>
        <td className="py-3.5 px-4 text-white">Monday (= 1)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">WEEKDAY(A2, 2) &gt;= 6</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Global ISO 8601 & European business standard</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">3</td>
        <td className="py-3.5 px-4 text-white">Monday (= 0)</td>
        <td className="py-3.5 px-4 text-slate-300">0 to 6</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">WEEKDAY(A2, 3) &gt;= 5</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Python / C++ zero-indexed array compatibility</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">11</td>
        <td className="py-3.5 px-4 text-white">Monday (= 1)</td>
        <td className="py-3.5 px-4 text-slate-300">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">WEEKDAY(A2, 11) &gt;= 6</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Explicit Monday start (Excel 2010+)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">17</td>
        <td className="py-3.5 px-4 text-white">Sunday (= 1)</td>
        <td className="py-3.5 px-4 text-slate-300">1 to 7</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">OR(W=6, W=7)</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Middle East Fri-Sat weekend shift alignment</td>
      </tr>
    `,
    deepDiveTitle: "The Superiority of Return Type 2 for Weekend Logic",
    deepDiveSubtitle: "Why Return Type 2 simplifies weekend conditional formatting from a clumsy OR to a clean >=",
    deepDiveContent: `<p>Under Excel's default <code className="text-white font-mono">WEEKDAY(A2)</code> (Return Type 1), Sunday is 1 and Saturday is 7. To test whether a date is a weekend, an analyst must write an awkward compound formula: <code className="text-rose-400 font-mono">=OR(WEEKDAY(A2)=1, WEEKDAY(A2)=7)</code>.</p><p>However, by specifying <strong>Return Type 2</strong> (<code className="text-indigo-300 font-mono">=WEEKDAY(A2, 2)</code>), Monday becomes 1, Tuesday is 2, ..., Saturday is 6, and Sunday is 7! Now, Saturday and Sunday are adjacent at the top of the range. The weekend test reduces to an elegant single comparison: <code className="text-emerald-300 font-mono">=WEEKDAY(A2, 2) &gt;= 6</code>. This simple adjustment speeds up conditional formatting evaluation by over 40% on massive tables.</p>`,
    badPracticeTitle: "Clumsy Default Return Type 1 Test",
    badPracticeCode: `=IF(OR(WEEKDAY(A2)=1, WEEKDAY(A2)=7), "Weekend", "Workday")`,
    badPracticeDesc: "Requires two separate function evaluations and an OR wrapper, creating unnecessary calculation overhead.",
    goodPracticeTitle: "Streamlined Return Type 2 Pattern",
    goodPracticeCode: `=IF(WEEKDAY(A2, 2) >= 6, "Weekend", "Workday")`,
    goodPracticeDesc: "Single function call with single greater-than-or-equal comparison; the gold standard for conditional formatting.",
    svgCaption: "Return Type 2 mapping Monday through Sunday, placing weekends conveniently at >= 6.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="80" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Mon (1)</text>
        <text x="80" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="135" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="185" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Tue (2)</text>
        <text x="185" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="240" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="290" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Wed (3)</text>
        <text x="290" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="345" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="395" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Thu (4)</text>
        <text x="395" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="450" y="50" width="100" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="500" y="80" textAnchor="middle" fill="#94A3B8" className="text-xs font-bold">Fri (5)</text>
        <text x="500" y="110" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono">Workday</text>

        <rect x="560" y="45" width="120" height="100" rx="12" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="620" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold">Sat (6)</text>
        <text x="620" y="110" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">WEEKEND</text>

        <rect x="690" y="45" width="120" height="100" rx="12" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="750" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold">Sun (7)</text>
        <text x="750" y="110" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">WEEKEND</text>
      </svg>
    `,
    simulatorCode: `
  const [inpWeekdayDate, setInpWeekdayDate] = useState("2026-11-12");
  const [selectedReturnType, setSelectedReturnType] = useState(2);

  const weekdayCalcResult = useMemo(() => {
    const s = new Date(inpWeekdayDate);
    if (isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const jsDay = s.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[jsDay];

    let numericVal = 1;
    if (selectedReturnType === 1) {
      numericVal = jsDay + 1; // Sun=1..Sat=7
    } else if (selectedReturnType === 2) {
      numericVal = jsDay === 0 ? 7 : jsDay; // Mon=1..Sun=7
    } else if (selectedReturnType === 3) {
      numericVal = jsDay === 0 ? 6 : jsDay - 1; // Mon=0..Sun=6
    }

    const isWeekend = jsDay === 0 || jsDay === 6;
    const overtimeRate = isWeekend ? "2.0x (Double Time)" : "1.0x (Standard Time)";

    return {
      isError: false,
      dayName,
      numericVal,
      isWeekend,
      overtimeRate
    };
  }, [inpWeekdayDate, selectedReturnType]);

  const applyPreset = (preset) => {
    if (preset === "thursday") {
      setInpWeekdayDate("2026-11-12"); // Thursday
    } else if (preset === "saturday") {
      setInpWeekdayDate("2026-11-14"); // Saturday
    } else if (preset === "sunday") {
      setInpWeekdayDate("2026-11-15"); // Sunday
    } else if (preset === "monday") {
      setInpWeekdayDate("2026-11-16"); // Monday
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive WEEKDAY Day-of-Week Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test different dates, toggle return types (1, 2, 3), and observe weekend detection logic live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("thursday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Thursday (Workday)
          </button>
          <button
            onClick={() => applyPreset("saturday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Saturday (Weekend)
          </button>
          <button
            onClick={() => applyPreset("sunday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Sunday (Weekend)
          </button>
          <button
            onClick={() => applyPreset("monday")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Monday (Week Start)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Date Selection (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpWeekdayDate}
            onChange={(e) => setInpWeekdayDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Select Return Type (Argument 2)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { type: 1, label: "Type 1 (Sun=1)", desc: "1 to 7" },
              { type: 2, label: "Type 2 (Mon=1)", desc: "1 to 7 (Best)" },
              { type: 3, label: "Type 3 (Mon=0)", desc: "0 to 6" }
            ].map(item => (
              <button
                key={item.type}
                onClick={() => setSelectedReturnType(item.type)}
                className={\`p-2.5 rounded-xl border text-left transition cursor-pointer \${
                  selectedReturnType === item.type
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                }\`}
              >
                <div className="font-bold text-xs">{item.label}</div>
                <div className="text-[10px] opacity-75">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =WEEKDAY("{inpWeekdayDate}", {selectedReturnType})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Day Index:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-700">
              {weekdayCalcResult.isError ? weekdayCalcResult.error : weekdayCalcResult.numericVal}
            </span>
          </div>
        </div>

        {!weekdayCalcResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day Name:</span>
              <span className="text-emerald-300 font-semibold font-mono text-base">
                {weekdayCalcResult.dayName}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Weekend Classification:</span>
              <span
                className={\`font-bold inline-flex items-center gap-1.5 \${
                  weekdayCalcResult.isWeekend ? "text-rose-400" : "text-emerald-400"
                }\`}
              >
                {weekdayCalcResult.isWeekend ? "🚨 Weekend (Sat / Sun)" : "✓ Standard Workday"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Overtime Multiplier:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {weekdayCalcResult.overtimeRate}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Corporate Payroll & Overtime",
        location: "Barrackpore Manufacturing Unit",
        title: "Weekend Overtime Double-Time Pay Multiplier",
        context: "Factory workers performing shifts on Saturday or Sunday earn 2.0x base wage rate in cell C2; weekday shifts earn standard 1.0x pay.",
        comment: "Test WEEKDAY >= 6 under Return Type 2",
        formula: `=C2 * IF(WEEKDAY(A2, 2) >= 6, 2.0, 1.0)`,
        sampleOutput: `INR 2,400.00 (double pay for Saturday shift)`
      },
      {
        category: "Retail Operations & Staffing",
        location: "Kolkata City Center Mall",
        title: "Retail Weekend Footfall Premium Surcharge",
        context: "Weekend retail shoppers are charged a valet parking weekend rate. Given ticket entry date in B2, tag records into 'Weekend Premium' or 'Standard Weekday'.",
        comment: "Apply Return Type 2 weekend threshold",
        formula: `=IF(WEEKDAY(B2, 2) >= 6, "WEEKEND PREMIUM", "STANDARD WEEKDAY")`,
        sampleOutput: `"WEEKEND PREMIUM" (for Sunday entry)`
      },
      {
        category: "Supply Chain & Logistics",
        location: "Dankuni Surface Logistics",
        title: "Delivery Dispatch Friday Roll-Forward Guard",
        context: "Parcels that finish packing on Friday (Day 5) or Saturday (Day 6) must not be dispatched until Monday morning (Day 1) to avoid warehouse congestion.",
        comment: "Roll Friday orders to Monday (+3 days) and Saturday to Monday (+2 days)",
        formula: `=IF(WEEKDAY(D2, 2)=5, D2+3, IF(WEEKDAY(D2, 2)=6, D2+2, D2+1))`,
        sampleOutput: `16-Nov-2026 (for parcel packed on Friday 13-Nov)`
      },
      {
        category: "Treasury & Bond Markets",
        location: "Salt Lake Financial Operations",
        title: "Following Business Day Bond Coupon Settlement",
        context: "If a bond coupon milestone in E2 falls on a weekend, push the settlement date automatically to the following Monday.",
        comment: "If Saturday add 2; if Sunday add 1",
        formula: `=E2 + CHOOSE(WEEKDAY(E2, 2), 0, 0, 0, 0, 0, 2, 1)`,
        sampleOutput: `16-Nov-2026 (for coupon landing on Sunday 15-Nov)`
      },
      {
        category: "Healthcare & Clinic Rostering",
        location: "Naihati Multispecialty Hospital",
        title: "Doctor Weekend On-Call Roster Assignment",
        context: "Senior surgeons are on emergency trauma on-call duty exclusively on Saturdays and Sundays based on date in F2.",
        comment: "Filter on-call duty using WEEKDAY",
        formula: `=IF(WEEKDAY(F2, 2) >= 6, "TRAUMA ON-CALL DUTY", "OPD CLINIC")`,
        sampleOutput: `"TRAUMA ON-CALL DUTY" (for Saturday 14-Nov)`
      },
      {
        category: "IT Support & Helpdesk SLAs",
        location: "Titagarh IT Global Services",
        title: "24/7 Severity-1 Weekend Escalation Matrix",
        context: "Incident tickets logged during weekends require direct notification to the Director of Cloud Engineering.",
        comment: "Detect weekend ticket creation via Return Type 2",
        formula: `=IF(WEEKDAY(G2, 2) >= 6, "NOTIFY VP / ESCALATE", "ROUTINE HELP DESK")`,
        sampleOutput: `"NOTIFY VP / ESCALATE" (for Sunday incident)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Always Specify Return Type 2",
        description: "Avoid Return Type 1. Specifying 2 sets Monday = 1 through Sunday = 7, making weekend logic trivial.",
        code: "=WEEKDAY(A2, 2)"
      },
      {
        title: "Step 2: Apply the >= 6 Weekend Filter",
        description: "Because Saturday is 6 and Sunday is 7, testing >= 6 isolates both weekend days instantly.",
        code: "=WEEKDAY(A2, 2) >= 6"
      },
      {
        title: "Step 3: Leverage CHOOSE for Custom Weekend Shifts",
        description: "Need to shift weekend dates to Monday? Use CHOOSE(WEEKDAY(A2,2), 0,0,0,0,0, 2, 1).",
        code: "=A2 + CHOOSE(WEEKDAY(A2, 2), 0,0,0,0,0, 2, 1)"
      },
      {
        title: "Step 4: Extract Text Day Name",
        description: "If you want the text name ('Thursday') instead of the number, use =TEXT(A2, 'dddd').",
        code: "=TEXT(A2, 'dddd') -> 'Thursday'"
      }
    ],
    troubleshootingRows: [
      {
        code: "Weekend Logic Bugs from Return Type 1",
        cause: "Using default WEEKDAY(A2) where Sunday is 1 and Saturday is 7, then testing >= 6 which forgets Sunday!",
        trigger: "=IF(WEEKDAY(A2)>=6, 'Weekend', 'Workday') misses Sunday!",
        remedy: "Always specify Return Type 2: =IF(WEEKDAY(A2, 2)>=6, 'Weekend', 'Workday')."
      },
      {
        code: "#VALUE! on Text Date",
        cause: "Target cell contains unparseable date text.",
        trigger: "=WEEKDAY('invalid')",
        remedy: "Sanitize with DATEVALUE() or pass authentic numeric serials."
      },
      {
        code: "Conditional Formatting Fails on Shift",
        cause: "Conditional formatting formula uses relative references incorrectly across table rows.",
        trigger: "Formula =WEEKDAY(A2, 2)>=6 entered without locking column ($A2)",
        remedy: "Lock column coordinate: =WEEKDAY($A2, 2)>=6 to format the entire row."
      }
    ],
    proTips: [
      {
        title: "The Ultimate Conditional Formatting Rule",
        text: "Highlight entire weekend rows in gray: Select table > New Rule > Formula: =WEEKDAY($A2, 2)>=6 > Set gray fill. Works seamlessly across millions of rows!",
        color: "text-indigo-400"
      },
      {
        title: "Day Name Extraction Without Formulas",
        text: "Just format the cell with custom number format 'dddd' to show 'Thursday' while keeping the underlying date serial intact for math.",
        color: "text-emerald-400"
      },
      {
        title: "Middle East Fri/Sat Weekend Rule",
        text: "For Saudi Arabia, UAE, or Qatar operations where Friday and Saturday are weekends, use: =OR(WEEKDAY(A2,2)=5, WEEKDAY(A2,2)=6).",
        color: "text-sky-400"
      },
      {
        title: "Next Friday Calculation",
        text: "Calculate upcoming Friday for any date: =A2 + (5 - WEEKDAY(A2, 2)) + IF(WEEKDAY(A2, 2)>5, 7, 0).",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "System Architecture",
        question: "Why did Microsoft introduce 10 different return types for WEEKDAY instead of standardizing on ISO 8601 Monday-start?"
      },
      {
        prompt: "Computational Efficiency",
        question: "Why is =WEEKDAY($A2, 2)>=6 significantly faster in Conditional Formatting than using =TEXT($A2, 'ddd')='Sun'?"
      }
    ],
    mentorAdvice: "If you remember only one thing about WEEKDAY: ALWAYS pass 2 as the second argument (=WEEKDAY(A2, 2)). It sets Monday=1 and Sunday=7, allowing you to identify weekends with a clean >=6. Never use the clumsy default Return Type 1 with OR statements."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 12: WEEKNUM
  // ---------------------------------------------------------------------------
  {
    idx: 12,
    name: "WEEKNUM",
    h1Title: "WEEKNUM Function — Calendar Week Numbering & Retail Cycle Engine",
    badgeLevel: "Core Cycle Math · Retail Forecasting",
    bloomTaxonomy: "Analyze & Sequence",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">WEEKNUM(serial_number, [return_type])</code> function returns an integer between 1 and 54 indicating where a specific date falls within the calendar year's sequential week cycles.</p><p>In retail merchandising, FMCG sales forecasting, manufacturing sprint planning, and supply chain logistics, business performance is analyzed weekly rather than monthly. Excel supports two fundamentally distinct week-numbering systems: <strong>System 1</strong> (where Week 1 begins unconditionally on January 1, regardless of day of week) and <strong>System 2</strong> (the European ISO 8601 standard, where Week 1 is the first week containing at least four days in the new year). Choosing the proper return type is critical to prevent cross-border operational misalignment.</p>`,
    syntaxSummary: "=WEEKNUM(serial_number, [return_type])",
    domainSummary: "Retail Weekly Sales Cycles, FMCG Logistics & Agile Sprints",
    patternSummary: '=WEEKNUM(A2, 2) (Monday-Start Calendar Week)',
    engineType: "Calendar Week Sequencing Engine",
    canonicalSignature: `=WEEKNUM(serial_number, [return_type])`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">serial_number:</strong> Required. A date representing the date you want to sequence within the year.</div><div>• <strong className="text-sky-300">return_type:</strong> Optional. A number that determines on which day the week begins and which system is used: <br/>&nbsp;&nbsp;• <code className="font-mono text-white">1 (or omitted):</code> System 1. Week begins on Sunday. Week containing Jan 1 is Week 1.<br/>&nbsp;&nbsp;• <code className="font-mono text-emerald-300">2:</code> System 1. Week begins on Monday. Week containing Jan 1 is Week 1. <em>(Standard corporate retail!)</em><br/>&nbsp;&nbsp;• <code className="font-mono text-amber-300">21:</code> System 2. ISO 8601 compliant. Week begins on Monday; Week 1 has the first Thursday.</div><div>• <strong className="text-amber-300">Week 53 / 54 Occurrence:</strong> In System 1, years can have up to 54 partial weeks when Jan 1 falls on a Saturday.</div>`,
    matrixTitle: "WEEKNUM Return Type & System Matrix",
    matrixSubtitle: "Observe the differences between System 1 (Jan 1 Anchor) and System 2 (ISO 8601).",
    matrixHeaders: ["Return Type", "Week Starts On", "System Type", "Week 1 Definition", "Industrial Application"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">1 (Default)</td>
        <td className="py-3.5 px-4 text-white">Sunday</td>
        <td className="py-3.5 px-4 text-slate-300">System 1</td>
        <td className="py-3.5 px-4 text-slate-300">Contains January 1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">US retail fiscal calendars (NRF)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2 (Common)</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">System 1</td>
        <td className="py-3.5 px-4 text-slate-300">Contains January 1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Global corporate Monday-start dashboards</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">21 (ISO Standard)</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">System 2</td>
        <td className="py-3.5 px-4 text-sky-400">First week with Thursday</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">European supply chain & logistics (ISO 8601)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">11-17</td>
        <td className="py-3.5 px-4 text-white">Mon through Sun</td>
        <td className="py-3.5 px-4 text-slate-300">System 1</td>
        <td className="py-3.5 px-4 text-slate-300">Contains January 1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Custom regional week start alignments</td>
      </tr>
    `,
    deepDiveTitle: "System 1 vs System 2 (ISO 8601): The January 1 Battleground",
    deepDiveSubtitle: "Why the same date can be Week 1 in New York and Week 52 in Frankfurt.",
    deepDiveContent: `<p>The conflict between <strong>System 1</strong> and <strong>System 2</strong> is one of the most contentious topics in international supply chain analytics.</p><p>Under <strong>System 1</strong> (<code className="text-white font-mono">=WEEKNUM(A2, 2)</code>), January 1 is ALWAYS in Week 1, even if January 1 is a Sunday! This creates tiny 1-day or 2-day 'stub weeks' at the beginning of the year. <br/>Under <strong>System 2 (ISO 8601)</strong> (<code className="text-indigo-300 font-mono">=WEEKNUM(A2, 21)</code>), Week 1 must contain at least 4 days of the new year (the 'First Thursday' rule). If Jan 1 is a Friday, Saturday, or Sunday, those days belong to <strong>Week 52 or 53 of the PREVIOUS year</strong>! Always align with your supply chain partners before finalizing weekly reporting keys.</p>`,
    badPracticeTitle: "Default US Weeknum in European Supply Chains",
    badPracticeCode: `=WEEKNUM(A2)`,
    badPracticeDesc: "Uses Sunday start and System 1, causing week mismatch with European logistics partners using ISO 8601.",
    goodPracticeTitle: "Production Explicit Weeknum Pattern",
    goodPracticeCode: `=WEEKNUM(A2, 2)  // Or =WEEKNUM(A2, 21) for ISO`,
    goodPracticeDesc: "Always explicitly pass argument 2 (2 for standard corporate or 21 for ISO 8601).",
    svgCaption: "System 1 (unconditional Jan 1 anchor) vs System 2 (ISO First Thursday rule).",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Jan 1 on Friday</text>
        <text x="140" y="98" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">Date: 01-Jan-2021</text>
        <text x="140" y="120" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Only 3 days in year</text>

        <path d="M 250 80 L 340 60 M 250 120 L 340 140" stroke="#38BDF8" strokeWidth="2" />

        <rect x="340" y="30" width="230" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="455" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">System 1 (=WEEKNUM(A2, 2))</text>
        <text x="455" y="75" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold font-mono">➔ Evaluates as WEEK 1</text>

        <rect x="340" y="110" width="230" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="455" y="135" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">System 2 (=WEEKNUM(A2, 21))</text>
        <text x="455" y="155" textAnchor="middle" fill="#F87171" className="text-xs font-bold font-mono">➔ Evaluates as WEEK 53 (Prior)</text>

        <path d="M 570 60 L 640 85 M 570 140 L 640 115" stroke="#38BDF8" strokeWidth="2" />

        <rect x="640" y="45" width="170" height="110" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Audit Impact</text>
        <text x="725" y="105" textAnchor="middle" fill="#FDE047" className="text-xs font-mono font-bold">1-Week Disparity</text>
        <text x="725" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">Supply Chain Alert</text>
      </svg>
    `,
    simulatorCode: `
  const [inpWeekDate, setInpWeekDate] = useState("2026-11-12");
  const [returnTypeSelection, setReturnTypeSelection] = useState(2);

  const weeknumResult = useMemo(() => {
    const s = new Date(inpWeekDate);
    if (isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const y = s.getFullYear();

    // Standard System 1 calculation with Monday start (type 2)
    const jan1 = new Date(y, 0, 1);
    const dayOfYear = Math.floor((s.getTime() - jan1.getTime()) / 86400000) + 1;
    const jan1DayOfWeek = (jan1.getDay() === 0 ? 7 : jan1.getDay()); // Mon=1..Sun=7

    // System 1 weeknum
    const sys1Week = Math.floor((dayOfYear + jan1DayOfWeek - 2) / 7) + 1;

    // ISO 8601 calculation (type 21)
    const target = new Date(s.valueOf());
    const dayNr = (s.getDay() + 6) % 7; // Mon=0..Sun=6
    target.setDate(target.getDate() - dayNr + 3); // Nearest Thursday
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const isoWeek = 1 + Math.ceil((firstThursday - target) / 604800000);

    const activeWeek = returnTypeSelection === 21 ? isoWeek : sys1Week;

    const weeksInYear = 52;
    const progressPct = Math.min(100, Math.round((activeWeek / weeksInYear) * 100));

    return {
      isError: false,
      activeWeek,
      sys1Week,
      isoWeek,
      progressPct,
      hasDiscrepancy: sys1Week !== isoWeek
    };
  }, [inpWeekDate, returnTypeSelection]);

  const applyPreset = (preset) => {
    if (preset === "today") {
      setInpWeekDate("2026-11-12");
      setReturnTypeSelection(2);
    } else if (preset === "jan1_dispute") {
      setInpWeekDate("2021-01-01"); // Classic dispute date!
      setReturnTypeSelection(2);
    } else if (preset === "mid_year") {
      setInpWeekDate("2026-07-01");
      setReturnTypeSelection(2);
    } else if (preset === "iso_mode") {
      setInpWeekDate("2026-11-12");
      setReturnTypeSelection(21);
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive WEEKNUM System Modeler
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare System 1 (Jan 1 Anchor) vs System 2 (ISO 8601) week numbers and observe January dispute edges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("today")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Today (12-Nov)
          </button>
          <button
            onClick={() => applyPreset("jan1_dispute")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Jan 1 Dispute Edge
          </button>
          <button
            onClick={() => applyPreset("mid_year")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Mid-Year Week 26
          </button>
          <button
            onClick={() => applyPreset("iso_mode")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            ISO 8601 Mode (Type 21)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Date Selection (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpWeekDate}
            onChange={(e) => setInpWeekDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Select Weeknum System (Arg 2)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setReturnTypeSelection(2)}
              className={\`p-2.5 rounded-xl border text-left transition cursor-pointer \${
                returnTypeSelection === 2
                  ? "bg-indigo-600 text-white border-indigo-400 shadow-lg"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }\`}
            >
              <div className="font-bold text-xs">Type 2: System 1</div>
              <div className="text-[10px] opacity-75">Mon Start, Jan 1 Anchor</div>
            </button>
            <button
              onClick={() => setReturnTypeSelection(21)}
              className={\`p-2.5 rounded-xl border text-left transition cursor-pointer \${
                returnTypeSelection === 21
                  ? "bg-indigo-600 text-white border-indigo-400 shadow-lg"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }\`}
            >
              <div className="font-bold text-xs">Type 21: ISO 8601</div>
              <div className="text-[10px] opacity-75">Mon Start, First Thursday</div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =WEEKNUM("{inpWeekDate}", {returnTypeSelection})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Week Number:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              Week {weeknumResult.isError ? weeknumResult.error : weeknumResult.activeWeek}
            </span>
          </div>
        </div>

        {!weeknumResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">System 1 (Type 2):</span>
              <span className="text-indigo-300 font-semibold font-mono text-base">
                Week {weeknumResult.sys1Week}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">System 2 (ISO Type 21):</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                Week {weeknumResult.isoWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">System Disparity Check:</span>
              <span
                className={\`font-bold inline-flex items-center gap-1.5 \${
                  weeknumResult.hasDiscrepancy ? "text-amber-400" : "text-emerald-400"
                }\`}
              >
                {weeknumResult.hasDiscrepancy ? "⚠️ Discrepancy Detected!" : "✓ Both Systems Match"}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Retail FMCG & Hypermarket Sales",
        location: "Kolkata Retail Chain Headquarters",
        title: "Weekly Store Revenue Aggregation Key",
        context: "Supermarkets track weekly turnover for year-over-year same-store sales comps. Generate an unambiguous weekly key (e.g. '2026-WK46') from transaction date in A2.",
        comment: "Combine year with zero-padded weeknum",
        formula: `=YEAR(A2) & "-WK" & TEXT(WEEKNUM(A2, 2), "00")`,
        sampleOutput: `"2026-WK46" (for 12-Nov-2026)`
      },
      {
        category: "Agile Software Engineering",
        location: "Salt Lake Sector V DevOps",
        title: "Bi-Weekly Sprint Numbering Allocation",
        context: "Software engineering runs 2-week sprints starting every odd week. Classify project milestone date in B2 into Sprint cycle.",
        comment: "Divide weeknum by 2 and round up with CEILING",
        formula: `="Sprint " & ROUNDUP(WEEKNUM(B2, 2) / 2, 0)`,
        sampleOutput: `"Sprint 23" (for Week 46 milestone)`
      },
      {
        category: "Automotive Manufacturing",
        location: "Barrackpore Assembly Plant",
        title: "Vehicle Chassis Production Week Stamping",
        context: "Chassis compliance plates must stamp production week number according to German automotive standard (ISO 8601).",
        comment: "Supply Return Type 21 for ISO 8601 compliance",
        formula: `="CW" & TEXT(WEEKNUM(C2, 21), "00")`,
        sampleOutput: `"CW46" (Calendar Week 46)`
      },
      {
        category: "Cold Chain & Dairy Logistics",
        location: "Shyamnagar Dairy Distribution",
        title: "Weekly Route Delivery Schedule Assignment",
        context: "Milk tanker delivery routes alternate between Route Alpha (odd week numbers) and Route Beta (even week numbers) based on dispatch date in D2.",
        comment: "Test whether WEEKNUM is even or odd using ISODD",
        formula: `=IF(ISODD(WEEKNUM(D2, 2)), "ROUTE ALPHA", "ROUTE BETA")`,
        sampleOutput: `"ROUTE BETA" (for Week 46)`
      },
      {
        category: "Human Resources Shift Planning",
        location: "Titagarh Industrial Roster",
        title: "Rotating Fortnight Shift Differential",
        context: "Factory team switches between day shift and night shift on alternating calendar weeks. Establish rotation key based on shift date in E2.",
        comment: "Evaluate modulo 2 on week number",
        formula: `=IF(MOD(WEEKNUM(E2, 2), 2) = 1, "TEAM 1 DAY SHIFT", "TEAM 2 NIGHT SHIFT")`,
        sampleOutput: `"TEAM 2 NIGHT SHIFT" (for Week 46)`
      },
      {
        category: "Agricultural Commodity Market",
        location: "Naihati Jute Exchange",
        title: "Jute Fiber Harvest Weekly Price Index",
        context: "Jute procurement prices are updated weekly on the first business day of the week. Group daily market prices by weekly sequence.",
        comment: "Group transactions into weekly index buckets",
        formula: `=WEEKNUM(F2, 2)`,
        sampleOutput: `Week 46 (for trading on 12-Nov)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Choose Your Weeknum System",
        description: "Determine whether your corporate partners use System 1 (type 2) or System 2 (ISO 8601 type 21).",
        code: "Corporate Standard: =WEEKNUM(A2, 2)\nISO 8601 Standard: =WEEKNUM(A2, 21)"
      },
      {
        title: "Step 2: Avoid Default Type 1",
        description: "Never leave the return type empty unless you explicitly want Sunday as day 1.",
        code: "Always pass argument 2 explicitly"
      },
      {
        title: "Step 3: Construct Standard Weekly Label",
        description: "Pad week numbers with TEXT(..., '00') to ensure proper sorting in PivotTables.",
        code: '=YEAR(A2) & "-W" & TEXT(WEEKNUM(A2, 2), "00")'
      },
      {
        title: "Step 4: Audit January Edge Cases",
        description: "Check how your formula behaves for January 1, 2, and 3 to ensure cross-system consistency.",
        code: "Verify Jan 1 behavior across calendar boundaries"
      }
    ],
    troubleshootingRows: [
      {
        code: "Week 53 / 54 Confusion",
        cause: "System 1 starts Week 1 unconditionally on Jan 1, creating stub weeks and pushing late December into Week 53 or 54.",
        trigger: "Years where Jan 1 is Saturday or Sunday under System 1",
        remedy: "Switch to ISO 8601 (Type 21 or ISOWEEKNUM) to eliminate partial stub weeks."
      },
      {
        code: "Cross-Border 1-Week Disparity",
        cause: "US division using =WEEKNUM(A2) (Type 1) while European branch uses =WEEKNUM(A2, 21) (ISO).",
        trigger: "Week 1 on US report matches Week 52 on European report",
        remedy: "Standardize enterprise policy on Return Type 2 or Return Type 21."
      },
      {
        code: "#NUM! Error",
        cause: "Supplying an invalid return type code (e.g. 5 or 25).",
        trigger: "=WEEKNUM(A2, 5)",
        remedy: "Use only valid return types: 1, 2, 11-17, or 21."
      }
    ],
    proTips: [
      {
        title: "The Zero-Padded Key Pattern",
        text: "Always zero-pad week numbers: =YEAR(A2) & '-W' & TEXT(WEEKNUM(A2,2), '00'). Without '00', Week 10 will sort before Week 2 alphabetically!",
        color: "text-indigo-400"
      },
      {
        title: "Direct ISOWEEKNUM Alternative",
        text: "In modern Excel (2013+), the function =ISOWEEKNUM(A2) is 100% equivalent to =WEEKNUM(A2, 21).",
        color: "text-emerald-400"
      },
      {
        title: "4-4-5 Retail Calendars",
        text: "National Retail Federation (NRF) 4-4-5 calendars split quarters into 4-week, 4-week, and 5-week months based on WEEKNUM.",
        color: "text-sky-400"
      },
      {
        title: "Weeks Remaining in the Year",
        text: "Calculate remaining weeks until year end: =52 - WEEKNUM(TODAY(), 2).",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "Global Standards",
        question: "Why did European standardization bodies create ISO 8601 week numbering instead of adopting the American Jan 1 convention?"
      },
      {
        prompt: "Data Modeling",
        question: "Why does sorting a column of unpadded week numbers ('W1', 'W2', ... 'W10') alphabetically break reporting dashboards?"
      }
    ],
    mentorAdvice: "When designing weekly sales or inventory dashboards, NEVER write =WEEKNUM(A2) without the second parameter. The default uses Sunday and System 1. Always write =WEEKNUM(A2, 2) for standard Monday-start weeks, and pad with TEXT(..., '00') so your charts sort chronologically."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 13: ISOWEEKNUM
  // ---------------------------------------------------------------------------
  {
    idx: 13,
    name: "ISOWEEKNUM",
    h1Title: "ISOWEEKNUM Function — ISO 8601 Global Week Numbering Engine",
    badgeLevel: "Global Standard · Supply Chain Logistics",
    bloomTaxonomy: "Analyze & Standardize",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">ISOWEEKNUM(date)</code> function returns the ISO 8601 week number of the year for a given date. Introduced in Excel 2013, it provides a dedicated, foolproof implementation of the international standard.</p><p>Under the ISO 8601 calendar specification (governing international shipping, container shipping lines like Maersk, global automotive manufacturing like BMW and Volkswagen, and European financial settlement systems), weeks <strong>strictly begin on Monday</strong> and end on Sunday. <strong>Week 1</strong> of any calendar year is formally defined as the week that contains the <strong>first Thursday of the new year</strong> (or equivalently, the week that contains January 4th). Consequently, dates in late December can belong to Week 1 of the following year, while dates in early January can belong to Week 52 or 53 of the preceding year.</p>`,
    syntaxSummary: "=ISOWEEKNUM(date)",
    domainSummary: "International Supply Chain, Container Logistics & European Manufacturing",
    patternSummary: '=YEAR(A2) & "-W" & TEXT(ISOWEEKNUM(A2), "00")',
    engineType: "ISO 8601 International Standard Engine",
    canonicalSignature: `=ISOWEEKNUM(date)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">date:</strong> Required. The date for which you want to find the ISO 8601 week number. Must be an authentic Excel date serial or formula result.</div><div>• <strong className="text-sky-300">The First Thursday Rule:</strong> Week 1 is strictly the week with the year's first Thursday. This guarantees that Week 1 always has at least 4 days in the new year.</div><div>• <strong className="text-amber-300">Zero Configuration:</strong> Unlike WEEKNUM which requires memorizing return type 21, ISOWEEKNUM takes exactly one argument, eliminating configuration errors across distributed teams.</div>`,
    matrixTitle: "ISO 8601 Boundary Year-End Behavior Matrix",
    matrixSubtitle: "Observe the First Thursday Rule shifting early January and late December dates across calendar years.",
    matrixHeaders: ["Date", "Day of Week", "ISOWEEKNUM()", "ISO Year Assignment", "Explanation of Rule"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2021-01-01</td>
        <td className="py-3.5 px-4 text-white">Friday</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">53</td>
        <td className="py-3.5 px-4 text-amber-300">ISO Year 2020</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">First Thursday is Jan 7; Jan 1-3 belong to 2020 Week 53!</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2021-01-04</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">1</td>
        <td className="py-3.5 px-4 text-emerald-300">ISO Year 2021</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Contains Thursday Jan 7; official start of Week 1</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12</td>
        <td className="py-3.5 px-4 text-white">Thursday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">46</td>
        <td className="py-3.5 px-4 text-emerald-300">ISO Year 2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Standard mid-year operational week</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-12-30</td>
        <td className="py-3.5 px-4 text-white">Monday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">1</td>
        <td className="py-3.5 px-4 text-sky-400">ISO Year 2025</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Contains Thursday Jan 2, 2025; Dec 30 is in Week 1 of 2025!</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-12-29</td>
        <td className="py-3.5 px-4 text-white">Sunday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">52</td>
        <td className="py-3.5 px-4 text-emerald-300">ISO Year 2024</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Final day of ISO Year 2024 Week 52</td>
      </tr>
    `,
    deepDiveTitle: "The ISO Year Mismatch Dilemma: ISO Year vs Calendar Year",
    deepDiveSubtitle: "Why combining =YEAR(A2) with =ISOWEEKNUM(A2) corrupts December and January reporting keys.",
    deepDiveContent: `<p>A pervasive bug in enterprise reporting occurs when an analyst naively combines the calendar year with the ISO week number: <code className="text-rose-400 font-mono">=YEAR(A2) & "-W" & ISOWEEKNUM(A2)</code>.</p><p>Consider <strong>December 30, 2024</strong>: <br/>• <code className="text-white font-mono">YEAR(A2)</code> returns <code className="text-white font-mono">2024</code>.<br/>• <code className="text-white font-mono">ISOWEEKNUM(A2)</code> returns <code className="text-white font-mono">1</code> (because the week contains Thursday Jan 2, 2025).<br/>The naive formula produces <code className="text-rose-400 font-mono">"2024-W01"</code>! This merges late December transactions with transactions from early January 2024! To construct a true ISO 8601 string, the year must be derived from the <strong>Thursday of the current week</strong>: <code className="text-emerald-300 font-mono">=YEAR(A2 - WEEKDAY(A2, 2) + 4) & "-W" & TEXT(ISOWEEKNUM(A2), "00")</code>.</p>`,
    badPracticeTitle: "The Corrupting Naive ISO String Pattern",
    badPracticeCode: `=YEAR(A2) & "-W" & TEXT(ISOWEEKNUM(A2), "00")`,
    badPracticeDesc: "Disastrously stamps December 30, 2024 as '2024-W01', mixing it with January 2024 records.",
    goodPracticeTitle: "Production Bulletproof ISO Year-Week Formula",
    goodPracticeCode: `=YEAR(A2 - WEEKDAY(A2, 2) + 4) & "-W" & TEXT(ISOWEEKNUM(A2), "00")`,
    goodPracticeDesc: "Identifies the Thursday of the active week to anchor the ISO year accurately across year-end boundaries.",
    svgCaption: "Finding the Thursday of the current week to establish the inviolable ISO Year.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="14" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Boundary Date</text>
        <text x="140" y="98" textAnchor="middle" fill="#F87171" className="text-sm font-bold font-mono">30-Dec-2024 (Mon)</text>
        <text x="140" y="120" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Calendar Year: 2024</text>

        <path d="M 250 100 L 330 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="330" y="45" width="240" height="110" rx="14" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="75" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">Find Thursday of Week</text>
        <text x="450" y="98" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Thursday = 02-Jan-2025</text>
        <text x="450" y="120" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">ISO Year = 2025</text>

        <path d="M 570 100 L 640 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="640" y="45" width="170" height="110" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">True ISO Key</text>
        <text x="725" y="102" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">2025-W01</text>
        <text x="725" y="125" textAnchor="middle" fill="#A7F3D0" className="text-[10px]">100% ISO Compliant</text>
      </svg>
    `,
    simulatorCode: `
  const [inpIsoDate, setInpIsoDate] = useState("2024-12-30");

  const isoEvaluation = useMemo(() => {
    const s = new Date(inpIsoDate);
    if (isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayOfWeekNames[s.getDay()];

    // Accurate ISO 8601 algorithm
    const target = new Date(s.valueOf());
    const dayNr = (s.getDay() + 6) % 7; // Mon=0..Sun=6
    target.setDate(target.getDate() - dayNr + 3); // Find Thursday of week

    const isoYear = target.getFullYear(); // The year of Thursday is the ISO Year!
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const isoWeekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);

    const calendarYear = s.getFullYear();
    const hasYearMismatch = calendarYear !== isoYear;

    const canonicalIsoString = \`\${isoYear}-W\${String(isoWeekNumber).padStart(2, "0")}-\${(s.getDay() === 0 ? 7 : s.getDay())}\`;

    return {
      isError: false,
      isoWeekNumber,
      isoYear,
      calendarYear,
      dayOfWeek,
      hasYearMismatch,
      canonicalIsoString
    };
  }, [inpIsoDate]);

  const applyPreset = (preset) => {
    if (preset === "dispute_dec") {
      setInpIsoDate("2024-12-30"); // Mon -> Belongs to 2025-W01!
    } else if (preset === "dispute_jan") {
      setInpIsoDate("2021-01-01"); // Fri -> Belongs to 2020-W53!
    } else if (preset === "standard_now") {
      setInpIsoDate("2026-11-12");
    } else if (preset === "standard_leap") {
      setInpIsoDate("2024-02-29");
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive ISO 8601 Week Engine & Year Auditor
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit edge-case boundary dates where ISO Year differs from Calendar Year according to the First Thursday Rule.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("dispute_dec")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Dec 30, 2024 (➔ 2025-W01)
          </button>
          <button
            onClick={() => applyPreset("dispute_jan")}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/60 transition cursor-pointer"
          >
            Jan 1, 2021 (➔ 2020-W53)
          </button>
          <button
            onClick={() => applyPreset("standard_now")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Today (12-Nov-2026)
          </button>
          <button
            onClick={() => applyPreset("standard_leap")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Leap Day (2024-W09)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Date Selection (Cell A2)</span>
            <span className="text-[10px] text-teal-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={inpIsoDate}
            onChange={(e) => setInpIsoDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center space-y-1 text-xs">
          <span className="text-slate-400">The ISO 8601 First Thursday Rule:</span>
          <span className="text-indigo-300 font-mono font-bold">Week 1 contains the 1st Thursday of the year</span>
          <span className="text-[11px] text-slate-500">ISO weeks strictly run Monday (1) through Sunday (7).</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =ISOWEEKNUM("{inpIsoDate}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">ISO Week Number:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              Week {isoEvaluation.isError ? isoEvaluation.error : isoEvaluation.isoWeekNumber}
            </span>
          </div>
        </div>

        {!isoEvaluation.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Canonical ISO 8601 Key:</span>
              <span className="text-amber-300 font-semibold font-mono text-base">
                {isoEvaluation.canonicalIsoString}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">True ISO Year:</span>
              <span className="text-sky-300 font-semibold font-mono text-base">
                {isoEvaluation.isoYear}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Calendar Year Mismatch:</span>
              <span
                className={\`font-bold inline-flex items-center gap-1.5 \${
                  isoEvaluation.hasYearMismatch ? "text-rose-400" : "text-emerald-400"
                }\`}
              >
                {isoEvaluation.hasYearMismatch
                  ? \`⚠️ Mismatch! (Cal: \${isoEvaluation.calendarYear} vs ISO: \${isoEvaluation.isoYear})\`
                  : "✓ Years Align Perfectly"}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "International Ocean Freight Logistics",
        location: "Kolkata Port Container Terminal",
        title: "Maersk Global Container Booking Week Key",
        context: "Global maritime shipping lines schedule vessel arrivals by ISO week numbers. Generate an authenticated ISO week identifier for cargo manifest date in A2.",
        comment: "Combine Thursday-anchored ISO year with ISOWEEKNUM",
        formula: `=YEAR(A2 - WEEKDAY(A2, 2) + 4) & "-W" & TEXT(ISOWEEKNUM(A2), "00")`,
        sampleOutput: `"2026-W46" (for shipment on 12-Nov-2026)`
      },
      {
        category: "European Automotive Supply Chain",
        location: "BMW / Continental Tier-1 Vendor, Pune",
        title: "European OEM Component Delivery Schedule Compliance",
        context: "German automotive OEMs issue production call-offs as 'CW48'. Verify whether manufacturing batch completion date in B2 meets the required ISO calendar week.",
        comment: "Direct ISOWEEKNUM comparison against target CW",
        formula: `=IF(ISOWEEKNUM(B2) <= TargetCW, "ON SCHEDULE", "LOGISTICS DELAY")`,
        sampleOutput: `"ON SCHEDULE" (batch completed in CW46)`
      },
      {
        category: "Global Pharmaceutical Cold Chain",
        location: "Barrackpore Bio-Tech Hub",
        title: "WHO Vaccine Batch Production Week Identifier",
        context: "World Health Organization vaccine compliance requires printing the 2-digit ISO week number on vaccine ampoule packaging.",
        comment: "Format ISOWEEKNUM with leading zero",
        formula: `="W" & TEXT(ISOWEEKNUM(C2), "00")`,
        sampleOutput: `"W46"`
      },
      {
        category: "Multinational ERP Integration",
        location: "Salt Lake Sector V SAP Center",
        title: "SAP ECC to Excel Weekly Sales Ledger Harmonization",
        context: "SAP stores weekly turnover under field 'GJAHR-POPER' (Year-Period). Harmonize Excel transactional export dates in D2 with SAP ISO week periods.",
        comment: "Match SAP's internal ISO week algorithm",
        formula: `=YEAR(D2 - WEEKDAY(D2, 2) + 4) & "/" & TEXT(ISOWEEKNUM(D2), "00")`,
        sampleOutput: `"2026/46"`
      },
      {
        category: "Agile Software Development",
        location: "Rajarhat Global Technology Center",
        title: "Cross-Border Multinational Sprint Release Cadence",
        context: "Engineering teams in London, Frankfurt, and Kolkata synchronize bi-weekly sprint reviews based on ISO odd/even week numbers.",
        comment: "Ensure global parity on odd vs even sprint cycles",
        formula: `=IF(ISODD(ISOWEEKNUM(E2)), "SPRINT DEMO WEEK", "SPRINT PLANNING WEEK")`,
        sampleOutput: `"SPRINT PLANNING WEEK" (for Week 46)`
      },
      {
        category: "International Air Freight",
        location: "NSCB International Cargo Terminal",
        title: "IATA Air Waybill Scheduled Flight Rotation",
        context: "Charter cargo flights operate on weekly slot rotations allocated by IATA calendar week numbers.",
        comment: "Extract IATA compliant ISO week number",
        formula: `=ISOWEEKNUM(F2)`,
        sampleOutput: `46`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Understand Single-Parameter Design",
        description: "Unlike WEEKNUM which requires return_type 21, ISOWEEKNUM takes exactly one argument, guaranteeing zero-configuration error.",
        code: "=ISOWEEKNUM(A2)"
      },
      {
        title: "Step 2: Recognize the First Thursday Rule",
        description: "Week 1 is the week with the year's first Thursday. Early January dates can belong to Week 52 or 53 of the prior year.",
        code: "=ISOWEEKNUM('2021-01-01') -> Returns 53"
      },
      {
        title: "Step 3: Anchor the ISO Year to Thursday",
        description: "Never use =YEAR(A2). Always calculate the Thursday of the week: =YEAR(A2 - WEEKDAY(A2, 2) + 4).",
        code: "True ISO Year: =YEAR(A2 - WEEKDAY(A2, 2) + 4)"
      },
      {
        title: "Step 4: Format with 'W' Prefix",
        description: "Combine with zero-padding for canonical ISO 8601 compliance.",
        code: '=YEAR(A2 - WEEKDAY(A2, 2) + 4) & "-W" & TEXT(ISOWEEKNUM(A2), "00")'
      }
    ],
    troubleshootingRows: [
      {
        code: "December Labeled with Wrong Year",
        cause: "Using =YEAR(A2) & ISOWEEKNUM(A2) for late December dates that already belong to Week 1 of next year.",
        trigger: "30-Dec-2024 labels as '2024-W01' instead of '2025-W01'",
        remedy: "Use the Thursday-anchored year formula: =YEAR(A2 - WEEKDAY(A2, 2) + 4)."
      },
      {
        code: "#NAME? Error in Legacy Excel",
        cause: "ISOWEEKNUM was introduced in Excel 2013. Opening the sheet in Excel 2010 or older throws #NAME?.",
        trigger: "=ISOWEEKNUM(A2) in Excel 2010",
        remedy: "Use backward-compatible equivalent: =WEEKNUM(A2, 21)."
      },
      {
        code: "#VALUE! on Text Argument",
        cause: "Date cell contains unrecognized text string.",
        trigger: "=ISOWEEKNUM('text')",
        remedy: "Sanitize using DATEVALUE() or DATE(YYYY, MM, DD)."
      }
    ],
    proTips: [
      {
        title: "The Golden ISO Year-Week Formula",
        text: "Save this formula in your notes: =YEAR(A2 - WEEKDAY(A2, 2) + 4) & '-W' & TEXT(ISOWEEKNUM(A2), '00'). It is the only 100% bug-free ISO string generator in Excel.",
        color: "text-indigo-400"
      },
      {
        title: "Why Week 53 Exists",
        text: "In common years starting on Thursday or leap years starting on Wednesday/Thursday, the year contains 53 full ISO weeks.",
        color: "text-emerald-400"
      },
      {
        title: "Full Canonical ISO 8601 String",
        text: "Construct complete standard ISO week date: =YEAR(A2 - WEEKDAY(A2,2)+4) & '-W' & TEXT(ISOWEEKNUM(A2), '00') & '-' & WEEKDAY(A2, 2). E.g. '2026-W46-4'.",
        color: "text-sky-400"
      },
      {
        title: "Direct Weekday Alignment",
        text: "Under ISO 8601, Monday is always day 1 and Sunday is always day 7. Always pair ISOWEEKNUM with WEEKDAY(A2, 2).",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "Global Engineering",
        question: "Why does the ISO 8601 standard stipulate that Week 1 must contain at least 4 days of the new calendar year?"
      },
      {
        prompt: "Data Pipeline Integrity",
        question: "If a database ETL pipeline incorrectly extracts =YEAR(A2) alongside ISOWEEKNUM, what reporting errors occur during the final week of December?"
      }
    ],
    mentorAdvice: "ISOWEEKNUM is mandatory for European trade and multinational supply chains. Remember: NEVER write =YEAR(A2) & ISOWEEKNUM(A2) — doing so will corrupt late December dates every few years! Always anchor the year to the Thursday of the week: =YEAR(A2 - WEEKDAY(A2, 2) + 4)."
  }
];

// Generate files for Topics 9 to 13
for (const t of topics9to13) {
  const jsx = buildTopicJsx(t);
  const outPath = path.join(baseDir, `Topic${t.idx}.jsx`);
  fs.writeFileSync(outPath, jsx, 'utf8');
  console.log(`Generated Topic${t.idx}.jsx (${jsx.split('\n').length} lines)`);
}

