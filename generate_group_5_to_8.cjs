const fs = require('fs');
const path = require('path');
const { buildTopicJsx, baseDir } = require('./topic_template_engine.cjs');

const topics5to8 = [
  // ---------------------------------------------------------------------------
  // TOPIC 5: DAY, MONTH & YEAR
  // ---------------------------------------------------------------------------
  {
    idx: 5,
    name: "DAY, MONTH & YEAR",
    h1Title: "DAY, MONTH & YEAR Functions — Date Component Decomposition Engine",
    badgeLevel: "Core Decomposition · Temporal Extraction",
    bloomTaxonomy: "Analyze & Deconstruct",
    heroDescription: `<p>The triad functions <code className="text-indigo-300 font-mono font-bold">YEAR(serial_number)</code>, <code className="text-indigo-300 font-mono font-bold">MONTH(serial_number)</code>, and <code className="text-indigo-300 font-mono font-bold">DAY(serial_number)</code> represent Excel's core temporal decomposition engine. They accept an authentic serial date number and isolate its constituent calendar units as pure integers.</p><p>In enterprise analytics, extracting these discrete components is the prerequisite for multi-year cohort analysis, customer churn tracking, fiscal quarter classification, and month-over-month variance reporting. These functions bypass all display formatting, extracting the underlying calendar reality regardless of whether the cell is formatted as "12-Nov-2026", "2026/11/12", or "Thursday, November 12".</p>`,
    syntaxSummary: "=YEAR(date), =MONTH(date), =DAY(date)",
    domainSummary: "Financial Cohort Analysis, Fiscal Quartering & Sales Trends",
    patternSummary: '="Q" & INT((MONTH(A2)-1)/3) + 1 (Calendar Quarter)',
    engineType: "Gregorian Decomposition Engine",
    canonicalSignature: `=YEAR(serial_number) | =MONTH(serial_number) | =DAY(serial_number)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">serial_number:</strong> Required. The date from which you want to extract the year (1900-9999), month (1-12), or day (1-31). Must be an authentic numeric date serial, cell reference, or date constructor.</div><div>• <strong className="text-sky-300">Coercion Mechanism:</strong> If a text date is supplied, Excel attempts implicit coercion based on regional settings. If text cannot be parsed, returns <code className="font-mono text-rose-400">#VALUE!</code>.</div><div>• <strong className="text-amber-300">Time Discard:</strong> Any fractional time attached to the serial is ignored. Only the integer day calendar boundary is evaluated.</div>`,
    matrixTitle: "Component Extraction & Derived Metrics Matrix",
    matrixSubtitle: "Observe how YEAR, MONTH, and DAY decompose sample dates into analytical dimensions.",
    matrixHeaders: ["Source Date", "YEAR()", "MONTH()", "DAY()", "Derived Fiscal / Quarter Formula"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-white">2026</td>
        <td className="py-3.5 px-4 text-emerald-300">11</td>
        <td className="py-3.5 px-4 text-sky-300">12</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Calendar Q4 / Indian Fiscal Q3</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">31-Mar-2027</td>
        <td className="py-3.5 px-4 text-white">2027</td>
        <td className="py-3.5 px-4 text-emerald-300">3</td>
        <td className="py-3.5 px-4 text-sky-300">31</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Indian FY 2026-27 Year End</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">29-Feb-2024</td>
        <td className="py-3.5 px-4 text-white">2024</td>
        <td className="py-3.5 px-4 text-emerald-300">2</td>
        <td className="py-3.5 px-4 text-sky-300">29</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap Day Verification: DAY(A2)=29</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">01-Jan-2026</td>
        <td className="py-3.5 px-4 text-white">2026</td>
        <td className="py-3.5 px-4 text-emerald-300">1</td>
        <td className="py-3.5 px-4 text-sky-300">1</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Calendar Day 1 / New Year Opening</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">15-Aug-2026</td>
        <td className="py-3.5 px-4 text-white">2026</td>
        <td className="py-3.5 px-4 text-emerald-300">8</td>
        <td className="py-3.5 px-4 text-sky-300">15</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">National Statutory Holiday Tracking</td>
      </tr>
    `,
    deepDiveTitle: "The Dangerous Fallacy of Naive Year Subtraction",
    deepDiveSubtitle: "Why =YEAR(TODAY()) - YEAR(DOB) fails corporate payroll and legal compliance.",
    deepDiveContent: `<p>A rampant error committed by novice analysts is calculating age or employee tenure using simple year subtraction: <code className="text-rose-400 font-mono">=YEAR(TODAY()) - YEAR(DOB)</code>.</p><p>This naive formula looks strictly at the calendar year numbers, completely ignoring whether the person's birthday has actually occurred in the current year! For example, if a person was born on December 30, 2000, on January 5, 2026 naive year subtraction computes <code className="text-white font-mono">2026 - 2000 = 26</code>, overstating their legal age by nearly an entire year when they are actually only 25! True age requires checking whether today's date has crossed their annual birthday anniversary.</p>`,
    badPracticeTitle: "The Naive Year Subtraction Blunder",
    badPracticeCode: `=YEAR(TODAY()) - YEAR(B2)`,
    badPracticeDesc: "Overstates age by 1 full year whenever the employee's birthday has not yet occurred in the current calendar year.",
    goodPracticeTitle: "Production Legal Anniversary Formula",
    goodPracticeCode: `=YEAR(TODAY()) - YEAR(B2) - IF(TODAY() < DATE(YEAR(TODAY()), MONTH(B2), DAY(B2)), 1, 0)`,
    goodPracticeDesc: "Subtracts 1 if the current date is chronologically before the anniversary, or leverage DATEDIF(B2, TODAY(), 'Y').",
    svgCaption: "Decomposition of unified date serial into Year, Month, and Day integer channels.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Input Date Serial</text>
        <text x="140" y="105" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">12-Nov-2026</text>

        <path d="M 250 80 L 340 50 M 250 100 L 340 100 M 250 120 L 340 150" stroke="#38BDF8" strokeWidth="2" />

        <rect x="340" y="30" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">=YEAR(A2) ➔ 2026</text>

        <rect x="340" y="80" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="105" textAnchor="middle" fill="#10B981" className="text-xs font-mono font-bold">=MONTH(A2) ➔ 11</text>

        <rect x="340" y="130" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="155" textAnchor="middle" fill="#F59E0B" className="text-xs font-mono font-bold">=DAY(A2) ➔ 12</text>

        <path d="M 560 50 L 640 100 M 560 100 L 640 100 M 560 150 L 640 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="640" y="45" width="170" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Derived Metrics</text>
        <text x="725" y="102" textAnchor="middle" fill="#FDE047" className="text-xs font-mono font-bold">Quarter: Q4</text>
        <text x="725" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono font-bold">FY: 2026-27</text>
      </svg>
    `,
    simulatorCode: `
  const [sampleDateStr, setSampleDateStr] = useState("2026-11-12");

  const decompResult = useMemo(() => {
    const dt = new Date(sampleDateStr);
    if (isNaN(dt.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    const y = dt.getFullYear();
    const m = dt.getMonth() + 1;
    const d = dt.getDate();

    // Derived analytics
    const calendarQuarter = Math.floor((m - 1) / 3) + 1;
    // Indian Fiscal Year starts April (Month 4)
    const indianFY = m >= 4 ? \`FY \${y}-\${String(y + 1).slice(-2)}\` : \`FY \${y - 1}-\${String(y).slice(-2)}\`;
    const indianFiscalQuarter = m >= 4 ? Math.floor((m - 4) / 3) + 1 : 4;

    const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    const isLeapDay = isLeap && m === 2 && d === 29;

    // Day of Year
    const startOfYear = new Date(y, 0, 1);
    const dayOfYear = Math.floor((dt.getTime() - startOfYear.getTime()) / 86400000) + 1;

    return {
      isError: false,
      year: y,
      month: m,
      day: d,
      calendarQuarter: \`Q\${calendarQuarter}\`,
      indianFY,
      indianFiscalQuarter: \`FQ\${indianFiscalQuarter}\`,
      dayOfYear,
      isLeap,
      isLeapDay
    };
  }, [sampleDateStr]);

  const applyPreset = (preset) => {
    if (preset === "today") {
      setSampleDateStr("2026-11-12");
    } else if (preset === "fiscal_end") {
      setSampleDateStr("2027-03-31");
    } else if (preset === "leap_day") {
      setSampleDateStr("2024-02-29");
    } else if (preset === "mid_year") {
      setSampleDateStr("2026-07-01");
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Live Date Decomposition Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pick any date and observe how YEAR, MONTH, and DAY isolate integers to drive downstream fiscal reporting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("today")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Today (12-Nov-2026)
          </button>
          <button
            onClick={() => applyPreset("fiscal_end")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Indian FY End (31-Mar)
          </button>
          <button
            onClick={() => applyPreset("leap_day")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Leap Day (29-Feb)
          </button>
          <button
            onClick={() => applyPreset("mid_year")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Mid-Year (01-Jul)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Input Date (Cell A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Date Picker</span>
          </label>
          <input
            type="date"
            value={sampleDateStr}
            onChange={(e) => setSampleDateStr(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">YEAR(A2)</span>
            <span className="text-xl font-bold font-mono text-indigo-300">{decompResult.year}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">MONTH(A2)</span>
            <span className="text-xl font-bold font-mono text-emerald-300">{decompResult.month}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">DAY(A2)</span>
            <span className="text-xl font-bold font-mono text-sky-300">{decompResult.day}</span>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Derived Financial & Calendar Dimensions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Calendar Quarter:</span>
            <span className="text-amber-300 font-semibold font-mono text-base">{decompResult.calendarQuarter}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Indian Fiscal Year:</span>
            <span className="text-emerald-300 font-semibold font-mono text-base">{decompResult.indianFY}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Fiscal Quarter:</span>
            <span className="text-sky-300 font-semibold font-mono text-base">{decompResult.indianFiscalQuarter}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Day of Year:</span>
            <span className="text-purple-300 font-semibold font-mono text-base">Day {decompResult.dayOfYear}</span>
          </div>
        </div>
      </div>
    `,
    scenarios: [
      {
        category: "Corporate Financial Reporting",
        location: "Kolkata Commercial Headquarters",
        title: "Dynamic Indian Fiscal Quarter Classification",
        context: "Financial analysts need to tag every ledger entry in column A into Indian Fiscal Quarters: Q1 (Apr-Jun), Q2 (Jul-Sep), Q3 (Oct-Dec), Q4 (Jan-Mar).",
        comment: "Subtract 4 modulo 12 to shift April to bucket 0",
        formula: `="FQ" & CHOOSE(MONTH(A2), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)`,
        sampleOutput: `"FQ3" (for invoice dated 12-Nov-2026)`
      },
      {
        category: "Human Resources & Payroll",
        location: "Barrackpore Industrial Division",
        title: "Tenure Cohort Binning for Annual Performance Appraisals",
        context: "Group employees based on the calendar year of their joining date in cell B2 into historical hiring cohorts (e.g. 'Class of 2021').",
        comment: "Concatenate static label with extracted year integer",
        formula: `="Batch of " & YEAR(B2)`,
        sampleOutput: `"Batch of 2021" (for joining date 15-Jul-2021)`
      },
      {
        category: "Customer Analytics & Marketing",
        location: "Salt Lake Retail Analytics",
        title: "End-of-Month Customer Birthday Campaign Filter",
        context: "Marketing sends birthday discount promo codes during the customer's birth month. Flag whether customer DOB in cell C2 matches the current active month.",
        comment: "Compare month of birth against current active system month",
        formula: `=IF(MONTH(C2) = MONTH(TODAY()), "SEND DISCOUNT PROMO", "NOT THIS MONTH")`,
        sampleOutput: `"SEND DISCOUNT PROMO" (if customer born in November)`
      },
      {
        category: "Supply Chain & Manufacturing",
        location: "Titagarh Precision Castings",
        title: "Bi-Monthly Inventory Physical Audit Trigger",
        context: "Manufacturing inventory audits occur exclusively on the final calendar day of even-numbered months (Feb, Apr, Jun, Aug, Oct, Dec).",
        comment: "Check if month is even via ISODD or MOD, and verify last day",
        formula: `=IF(AND(MOD(MONTH(D2), 2) = 0, DAY(D2 + 1) = 1), "PHYSICAL AUDIT TODAY", "STANDARD OPS")`,
        sampleOutput: `"PHYSICAL AUDIT TODAY" (on 30-Jun-2026)`
      },
      {
        category: "Tax Compliance & TDS Filing",
        location: "Naihati Tax Consultancy",
        title: "Monthly TDS Payment Challan Due Date Engine",
        context: "Indian Tax Deducted at Source (TDS) must be deposited by the 7th of the month following the deduction date in cell E2 (except March).",
        comment: "Construct the 7th of next month dynamically",
        formula: `=DATE(YEAR(E2) + IF(MONTH(E2)=12, 1, 0), MONTH(E2) + 1, 7)`,
        sampleOutput: `07-Dec-2026 (for TDS deducted on 18-Nov-2026)`
      },
      {
        category: "Agricultural Banking & Insurance",
        location: "Hooghly Agro-Fin Corp",
        title: "Crop Insurance Kharif vs Rabi Season Tagging",
        context: "Agricultural crop loans are bifurcated into Kharif season (sowing June to October) and Rabi season (sowing November to April) based on loan disbursal date in F2.",
        comment: "Evaluate month integer to segment agro-climatic season",
        formula: `=IF(AND(MONTH(F2) >= 6, MONTH(F2) <= 10), "KHARIF CROP", "RABI CROP")`,
        sampleOutput: `"RABI CROP" (for loan disbursed on 12-Nov-2026)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Verify Date Validity with ISNUMBER()",
        description: "YEAR, MONTH, and DAY require numeric serials. Verify with =ISNUMBER(A2) before passing to decomposition formulas.",
        code: "=ISNUMBER(A2) -> TRUE"
      },
      {
        title: "Step 2: Isolate the Calendar Year",
        description: "Apply =YEAR(A2) to obtain a 4-digit integer between 1900 and 9999.",
        code: "=YEAR(DATE(2026, 11, 12)) -> 2026"
      },
      {
        title: "Step 3: Isolate the Month Index",
        description: "Apply =MONTH(A2) to obtain an integer from 1 (January) to 12 (December).",
        code: "=MONTH(DATE(2026, 11, 12)) -> 11"
      },
      {
        title: "Step 4: Isolate the Day Number",
        description: "Apply =DAY(A2) to obtain the calendar day of the month from 1 to 31.",
        code: "=DAY(DATE(2026, 11, 12)) -> 12"
      }
    ],
    troubleshootingRows: [
      {
        code: "#VALUE! on Text Date",
        cause: "Cell contains a dead text string rather than an authentic numeric date serial.",
        trigger: "=MONTH('12-Nov-2026') on systems where text parsing fails",
        remedy: "Sanitize text using DATEVALUE() before extracting components."
      },
      {
        code: "YEAR(0) Returns 1900",
        cause: "Target cell is empty or contains zero. In Excel's 1900 date system, serial 0 evaluates to Jan 0, 1900.",
        trigger: "=YEAR(A2) where A2 is completely empty",
        remedy: "Wrap with: =IF(A2='', '', YEAR(A2))."
      },
      {
        code: "MONTH() Inversion on Ambiguous Text",
        cause: "Date '05/06/2026' parsed as May instead of June due to US vs UK regional settings mismatch.",
        trigger: "=MONTH(A2) where A2 is text rather than numeric date",
        remedy: "Convert source data using Data > Text to Columns specifying exact column format (DMY or MDY)."
      }
    ],
    proTips: [
      {
        title: "Leap Day Detection Formula",
        text: "Determine if year in A1 is a leap year instantly without complex MOD logic: =DAY(DATE(A1, 2, 29))=29. Returns TRUE for leap years!",
        color: "text-indigo-400"
      },
      {
        title: "Day of Year Calculation",
        text: "Calculate current day of the year (1-366): =A2 - DATE(YEAR(A2), 1, 0).",
        color: "text-emerald-400"
      },
      {
        title: "Last Day of Month Detection",
        text: "Check if date in A2 is the final day of its month: =DAY(A2 + 1) = 1. If adding 1 rolls to day 1, today is month end!",
        color: "text-sky-400"
      },
      {
        title: "Month Name Extraction",
        text: "To extract full 3-letter month name as text: =TEXT(A2, 'mmm') or full name: =TEXT(A2, 'mmmm').",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "System Architecture",
        question: "Why does passing an empty cell to =YEAR(A1) return 1900 while =MONTH(A1) returns 1 and =DAY(A1) returns 0?"
      },
      {
        prompt: "Performance Optimization",
        question: "In a 500,000-row table, why is =YEAR(A2) & '-' & MONTH(A2) significantly faster for PivotTable grouping than building calculated columns via TEXT()?"
      }
    ],
    mentorAdvice: "YEAR, MONTH, and DAY are the Swiss Army knives of spreadsheet engineering. Never assemble or disassemble dates using string functions like LEFT, MID, or RIGHT — doing so invites regional formatting disasters. Master the =DAY(A2+1)=1 trick for month-end detection; it will save you countless lines of code."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 6: HOUR, MINUTE & SECOND
  // ---------------------------------------------------------------------------
  {
    idx: 6,
    name: "HOUR, MINUTE & SECOND",
    h1Title: "HOUR, MINUTE & SECOND Functions — Temporal Clock Parsing Engine",
    badgeLevel: "Core Decomposition · Clock Parser",
    bloomTaxonomy: "Analyze & Bin",
    heroDescription: `<p>The precision triad <code className="text-indigo-300 font-mono font-bold">HOUR(serial_number)</code>, <code className="text-indigo-300 font-mono font-bold">MINUTE(serial_number)</code>, and <code className="text-indigo-300 font-mono font-bold">SECOND(serial_number)</code> isolates discrete time components from Excel's fractional day serials.</p><p>Because time in Excel is stored as an IEEE 754 64-bit floating point number between <code className="text-white font-mono">0.0</code> and <code className="text-white font-mono">0.99999</code>, extracting discrete hours (0-23), minutes (0-59), and seconds (0-59) via manual division often triggers minute floating-point rounding errors. These dedicated functions eliminate rounding jitter, providing reliable building blocks for shift binning, peak telephony call arrival modeling, server load profiling, and microsecond SLA tracking.</p>`,
    syntaxSummary: "=HOUR(time), =MINUTE(time), =SECOND(time)",
    domainSummary: "BPO Call Center Queues, Web Traffic Peaks & Manufacturing Shifts",
    patternSummary: '=CHOOSE(INT(HOUR(A2)/8)+1, "Shift 1", "Shift 2", "Shift 3")',
    engineType: "Floating-Point Temporal Extractor",
    canonicalSignature: `=HOUR(serial_number) | =MINUTE(serial_number) | =SECOND(serial_number)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">serial_number:</strong> Required. The time or date-time value containing the time you want to extract. Can be supplied as a decimal serial, text string in quotes, or formula result.</div><div>• <strong className="text-sky-300">HOUR Return Range:</strong> An integer from 0 (12:00:00 AM) to 23 (11:00:00 PM). Excel always evaluates hours on a 24-hour military clock basis.</div><div>• <strong className="text-amber-300">MINUTE & SECOND Return Range:</strong> Integers from 0 to 59 representing the elapsed minutes and seconds within the current hour.</div>`,
    matrixTitle: "Time Extraction & Operational Binning Matrix",
    matrixSubtitle: "Observe how fractional time decimals are decomposed into discrete 24-hour integers.",
    matrixHeaders: ["Input Serial / Time", "HOUR()", "MINUTE()", "SECOND()", "Shift / Bin Assignment"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">08:15:30 AM (0.3441)</td>
        <td className="py-3.5 px-4 text-white">8</td>
        <td className="py-3.5 px-4 text-emerald-300">15</td>
        <td className="py-3.5 px-4 text-sky-300">30</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Morning Production Shift A</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">14:45:00 PM (0.6146)</td>
        <td className="py-3.5 px-4 text-white">14</td>
        <td className="py-3.5 px-4 text-emerald-300">45</td>
        <td className="py-3.5 px-4 text-sky-300">0</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Peak Telephony Inbound Spike</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">23:59:59 PM (0.9999)</td>
        <td className="py-3.5 px-4 text-white">23</td>
        <td className="py-3.5 px-4 text-emerald-300">59</td>
        <td className="py-3.5 px-4 text-sky-300">59</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Day-End Financial Batch Cutoff</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">00:30:15 AM (0.0210)</td>
        <td className="py-3.5 px-4 text-white">0</td>
        <td className="py-3.5 px-4 text-emerald-300">30</td>
        <td className="py-3.5 px-4 text-sky-300">15</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Graveyard / Nocturnal Maintenance</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12:00:00 PM (0.5000)</td>
        <td className="py-3.5 px-4 text-white">12</td>
        <td className="py-3.5 px-4 text-emerald-300">0</td>
        <td className="py-3.5 px-4 text-sky-300">0</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Midday Lunch Break Window</td>
      </tr>
    `,
    deepDiveTitle: "Floating Point Epsilon Jitter in Time Division",
    deepDiveSubtitle: "Why manual division =A1*24 triggers minute boundary mismatch errors.",
    deepDiveContent: `<p>Due to IEEE 754 binary floating-point specifications, fractional numbers like <code className="text-white font-mono">1/24</code> (0.0416666666666667) and <code className="text-white font-mono">1/1440</code> cannot be represented exactly in binary registers.</p><p>If an analyst attempts to extract the minute integer manually using <code className="text-rose-400 font-mono">=INT((A1 - INT(A1*24)/24) * 1440)</code>, floating point epsilon noise often causes <code className="text-white font-mono">15.00000000000001</code> to round down to <code className="text-rose-400 font-mono">14</code>! Excel's native <code className="text-indigo-300 font-mono">MINUTE()</code> function internally rounds to the nearest second before extracting the minute integer, completely shielding your formulas from binary rounding corruption.</p>`,
    badPracticeTitle: "Brittle Manual Floating Point Extraction",
    badPracticeCode: `=INT((MOD(A1, 1) - INT(MOD(A1, 1)*24)/24) * 1440)`,
    badPracticeDesc: "Vulnerable to IEEE 754 precision dropoffs, intermittently returning minutes off by 1.",
    goodPracticeTitle: "Production Native MINUTE() Function",
    goodPracticeCode: `=MINUTE(A1)`,
    goodPracticeDesc: "Direct C++ microcode evaluation incorporating binary epsilon compensation.",
    svgCaption: "Decomposition of high-precision floating point time serial into discrete hour, minute, and second registers.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Time Decimal Serial</text>
        <text x="140" y="105" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">0.614583</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">14:45:00 PM</text>

        <path d="M 250 80 L 340 50 M 250 100 L 340 100 M 250 120 L 340 150" stroke="#38BDF8" strokeWidth="2" />

        <rect x="340" y="30" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-mono font-bold">=HOUR(A2) ➔ 14 (2 PM)</text>

        <rect x="340" y="80" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="105" textAnchor="middle" fill="#10B981" className="text-xs font-mono font-bold">=MINUTE(A2) ➔ 45</text>

        <rect x="340" y="130" width="220" height="40" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="450" y="155" textAnchor="middle" fill="#F59E0B" className="text-xs font-mono font-bold">=SECOND(A2) ➔ 00</text>

        <path d="M 560 50 L 640 100 M 560 100 L 640 100 M 560 150 L 640 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="640" y="45" width="170" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="725" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Operational Bin</text>
        <text x="725" y="102" textAnchor="middle" fill="#FDE047" className="text-xs font-mono font-bold">Shift: Afternoon</text>
        <text x="725" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono font-bold">Peak Traffic Window</text>
      </svg>
    `,
    simulatorCode: `
  const [sampleTimeVal, setSampleTimeVal] = useState("14:45:30");

  const parsedClockResult = useMemo(() => {
    const bits = sampleTimeVal.split(":");
    const h = parseInt(bits[0], 10) || 0;
    const m = parseInt(bits[1], 10) || 0;
    const s = parseInt(bits[2], 10) || 0;

    const totalSecondsInDay = (h * 3600) + (m * 60) + s;
    const decimalSerial = totalSecondsInDay / 86400;

    // Shift binning: Morning (06:00-14:00), Evening (14:00-22:00), Night (22:00-06:00)
    let shiftName = "Night Shift C";
    if (h >= 6 && h < 14) shiftName = "Morning Shift A";
    else if (h >= 14 && h < 22) shiftName = "Evening Shift B";

    // 15-Minute interval binning (e.g. 14:45)
    const quarterBin = \`\${String(h).padStart(2, "0")}:\${String(Math.floor(m / 15) * 15).padStart(2, "0")}\`;

    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;

    return {
      hour: h,
      minute: m,
      second: s,
      shiftName,
      quarterBin,
      decimalSerial: decimalSerial.toFixed(6),
      display12h: \`\${h12}:\${String(m).padStart(2, "0")}:\${String(s).padStart(2, "0")} \${ampm}\`
    };
  }, [sampleTimeVal]);

  const applyPreset = (preset) => {
    if (preset === "morning_shift") {
      setSampleTimeVal("08:15:00");
    } else if (preset === "peak_traffic") {
      setSampleTimeVal("14:45:30");
    } else if (preset === "night_cutoff") {
      setSampleTimeVal("23:59:45");
    } else if (preset === "graveyard") {
      setSampleTimeVal("02:30:10");
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive Temporal Clock Decomposer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Input any time string and observe real-time extraction of HOUR, MINUTE, SECOND alongside operational shift binning.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("morning_shift")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Morning Shift (08:15)
          </button>
          <button
            onClick={() => applyPreset("peak_traffic")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Peak Hour (14:45:30)
          </button>
          <button
            onClick={() => applyPreset("night_cutoff")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Day End (23:59:45)
          </button>
          <button
            onClick={() => applyPreset("graveyard")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Graveyard (02:30:10)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Input Time (hh:mm:ss)</span>
            <span className="text-[10px] text-indigo-400 font-mono">24-Hour Input</span>
          </label>
          <input
            type="text"
            value={sampleTimeVal}
            onChange={(e) => setSampleTimeVal(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">HOUR()</span>
            <span className="text-xl font-bold font-mono text-indigo-300">{parsedClockResult.hour}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">MINUTE()</span>
            <span className="text-xl font-bold font-mono text-emerald-300">{parsedClockResult.minute}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">SECOND()</span>
            <span className="text-xl font-bold font-mono text-sky-300">{parsedClockResult.second}</span>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Derived Operational Classifications
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Assigned Shift:</span>
            <span className="text-amber-300 font-semibold font-mono text-base">{parsedClockResult.shiftName}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">15-Min Telephony Bin:</span>
            <span className="text-emerald-300 font-semibold font-mono text-base">{parsedClockResult.quarterBin} Block</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">12-Hour AM/PM:</span>
            <span className="text-sky-300 font-semibold font-mono text-base">{parsedClockResult.display12h}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Day Fraction:</span>
            <span className="text-purple-300 font-semibold font-mono text-base">{parsedClockResult.decimalSerial}</span>
          </div>
        </div>
      </div>
    `,
    scenarios: [
      {
        category: "BPO Inbound Telephony",
        location: "Kolkata IT Park Telecom",
        title: "Inbound Call Arrival Peak Hour Binning",
        context: "Call center analytics requires binning thousands of call arrival timestamps in column A into single-hour buckets (0 to 23) to forecast workforce staffing requirements.",
        comment: "Extract hour integer directly for PivotTable group charting",
        formula: `=HOUR(A2)`,
        sampleOutput: `14 (representing 2:00 PM to 3:00 PM peak arrival)`
      },
      {
        category: "Corporate Facility Management",
        location: "Barrackpore Technology Center",
        title: "Three-Tier Manufacturing Shift Assignment",
        context: "Classify worker swipe time in B2 into Shift 1 (06:00-14:00), Shift 2 (14:00-22:00), or Shift 3 (22:00-06:00 overnight).",
        comment: "Segment into shifts based on HOUR() boundaries",
        formula: `=IFS(HOUR(B2) < 6, "Shift 3", HOUR(B2) < 14, "Shift 1", HOUR(B2) < 22, "Shift 2", TRUE, "Shift 3")`,
        sampleOutput: `"Shift 1" (for swipe at 07:45 AM)`
      },
      {
        category: "E-Commerce Delivery Hub",
        location: "Shyamnagar Logistics Fulfillment",
        title: "Dispatch Delivery Run Cycle Binning",
        context: "Parcels sorted between minutes 0-29 go to Run Cycle 1; parcels sorted between minutes 30-59 go to Run Cycle 2.",
        comment: "Evaluate MINUTE() to bifurcate the delivery run",
        formula: `=IF(MINUTE(C2) < 30, "CYCLE 1 (TOP OF HOUR)", "CYCLE 2 (BOTTOM OF HOUR)")`,
        sampleOutput: `"CYCLE 2" (for parcel scanned at 10:42 AM)`
      },
      {
        category: "Cloud Database Architecture",
        location: "Salt Lake Data Center",
        title: "Automated Micro-Batch Latency SLA Tracker",
        context: "Database transactions must complete in under 45 seconds. Given start timestamp in D2 and end timestamp in E2, calculate elapsed seconds within the minute.",
        comment: "Calculate difference in seconds using SECOND() and MINUTE()",
        formula: `=(MINUTE(E2) - MINUTE(D2)) * 60 + (SECOND(E2) - SECOND(D2))`,
        sampleOutput: `28 Seconds Latency`
      },
      {
        category: "Healthcare Diagnostic Lab",
        location: "Naihati Pathology Center",
        title: "Blood Sample Centrifuge Centering Rounding",
        context: "Blood samples must be centrifuged within 15 minutes of collection timestamp in F2. Extract the exact minute elapsed to trigger alert.",
        comment: "Compare current system minute against collection minute",
        formula: `=IF((NOW() - F2) * 1440 > 15, "SAMPLE REJECTED - EXPIRED", "READY FOR TESTING")`,
        sampleOutput: `"READY FOR TESTING" (at 8 minutes elapsed)`
      },
      {
        category: "Power Grid & Renewable Energy",
        location: "Titagarh Solar Substation",
        title: "Solar Inverter Peak Solar Generation Window",
        context: "Peak solar irradiance occurs between 11:00 AM and 14:00 PM. Flag whether inverter telemetry timestamp in G2 occurred during peak generation.",
        comment: "Check whether HOUR is between 11 and 13 inclusive",
        formula: `=IF(AND(HOUR(G2) >= 11, HOUR(G2) < 14), "PEAK GENERATION", "STANDARD")`,
        sampleOutput: `"PEAK GENERATION" (at 12:35 PM)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Isolate Time from Mixed Timestamps",
        description: "HOUR, MINUTE, and SECOND automatically ignore the calendar date integer and evaluate purely the decimal fraction.",
        code: "=HOUR('2026-11-12 14:45:30') -> 14"
      },
      {
        title: "Step 2: Understand the 24-Hour Range",
        description: "HOUR returns values from 0 to 23. Midnight is 0, noon is 12, and 11 PM is 23.",
        code: "HOUR('12:00 AM') = 0\nHOUR('12:00 PM') = 12"
      },
      {
        title: "Step 3: Extract Minutes and Seconds",
        description: "Apply MINUTE() and SECOND() to obtain precise 0-59 integer counters.",
        code: "MINUTE('14:45:30') = 45\nSECOND('14:45:30') = 30"
      },
      {
        title: "Step 4: Construct Time Slices",
        description: "Combine extracted components into custom time buckets using integer math.",
        code: "30-Min Bin: =HOUR(A2) + IF(MINUTE(A2)>=30, 0.5, 0)"
      }
    ],
    troubleshootingRows: [
      {
        code: "#VALUE! from Unrecognized Format",
        cause: "Text string lacks valid colons or is formatted in a non-standard delimiter.",
        trigger: "=HOUR('14.30.00') on systems configured for colons",
        remedy: "Substitute dots with colons or pass authentic numeric serials."
      },
      {
        code: "HOUR() Returns 0 for Blank Cells",
        cause: "Empty cells evaluate to 0 in Excel, representing midnight 12:00:00 AM.",
        trigger: "=HOUR(A2) where A2 is blank",
        remedy: "Wrap with: =IF(A2='', '', HOUR(A2))."
      },
      {
        code: "12-Hour AM/PM Misinterpretation",
        cause: "Entering '12:30' without AM/PM defaults to 12:30 PM (Hour 12) rather than 00:30 AM (Hour 0).",
        trigger: "=HOUR('12:30')",
        remedy: "Explicitly include AM/PM or use 24-hour military clock '00:30'."
      }
    ],
    proTips: [
      {
        title: "Converting Time to Decimal Hours",
        text: "Convert any timestamp to total decimal hours (e.g. 14.75 hours for 14:45): =HOUR(A2) + MINUTE(A2)/60 + SECOND(A2)/3600.",
        color: "text-indigo-400"
      },
      {
        title: "15-Minute Block Rounding",
        text: "Group records into 15-minute telephony blocks for pivot charts: =TIME(HOUR(A2), FLOOR(MINUTE(A2), 15), 0).",
        color: "text-emerald-400"
      },
      {
        title: "Total Seconds Elapsed from Midnight",
        text: "Calculate absolute seconds elapsed since midnight: =HOUR(A2)*3600 + MINUTE(A2)*60 + SECOND(A2).",
        color: "text-sky-400"
      },
      {
        title: "Avoid Floating Point Rounding Bugs",
        text: "Always use native MINUTE() instead of manual modulo division to avoid IEEE 754 precision dropoffs.",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "System Architecture",
        question: "Why does Excel's HOUR() function return 0 for both 12:00:00 AM and 00:00:00, but returns 12 for 12:00:00 PM?"
      },
      {
        prompt: "Data Engineering",
        question: "When aggregating telephony call volume into hourly histograms, why is grouping by =HOUR(A2) preferred over grouping by text intervals like '14:00 - 15:00'?"
      }
    ],
    mentorAdvice: "HOUR, MINUTE, and SECOND are critical for operational shift modeling. Always remember that HOUR operates strictly on a 24-hour clock. For call center staffing and plant rosters, memorize the 15-minute floor formula: =TIME(HOUR(A2), FLOOR(MINUTE(A2), 15), 0) — it is the gold standard for queue analytics."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 7: DAYS
  // ---------------------------------------------------------------------------
  {
    idx: 7,
    name: "DAYS",
    h1Title: "DAYS Function — Signed Date Difference & SLA Variance Engine",
    badgeLevel: "Core Difference · Signed Arithmetic",
    bloomTaxonomy: "Evaluate & Compare",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">DAYS(end_date, start_date)</code> function calculates the exact signed number of calendar days between two dates. It was introduced in modern Excel to provide a formalized, error-checked function for date subtraction.</p><p>Unlike simple arithmetic subtraction (<code className="text-white font-mono">=B2 - A2</code>) which can silently produce misleading results when formulas encounter mixed data types or regional text dates, <code className="text-indigo-300 font-mono">DAYS()</code> explicitly coerces recognized date text and strips away all attached timestamps before calculating the interval. Crucially, it observes strict sign convention: if <code className="text-teal-300 font-mono">end_date</code> is chronologically before <code className="text-sky-300 font-mono">start_date</code>, it returns a <strong>negative integer</strong>, making it the perfect mathematical engine for overdue debt aging, schedule variances, and contract lead-time audits.</p>`,
    syntaxSummary: "=DAYS(end_date, start_date)",
    domainSummary: "Project Schedule Variances, Accounts Receivable & SLA Overruns",
    patternSummary: "=DAYS(Deadline, TODAY()) (Days Remaining / Overdue)",
    engineType: "Signed Calendar Difference Engine",
    canonicalSignature: `=DAYS(end_date, start_date)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">end_date:</strong> Required. The ending date of the evaluated span. If end_date is after start_date, the result is positive; if earlier, the result is negative.</div><div>• <strong className="text-sky-300">start_date:</strong> Required. The starting date of the evaluated span.</div><div>• <strong className="text-amber-300">Parameter Order Alert:</strong> Notice the order: <code className="font-mono text-white">end_date</code> comes FIRST, <code className="font-mono text-white">start_date</code> comes SECOND. Inverting them reverses the sign of your result!</div>`,
    matrixTitle: "DAYS() Calculation & Sign Convention Matrix",
    matrixSubtitle: "Observe how DAYS handles forward, backward, text-coerced, and identical date boundaries.",
    matrixHeaders: ["End Date (Arg 1)", "Start Date (Arg 2)", "DAYS() Output", "Sign Status", "Operational Interpretation"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-26</td>
        <td className="py-3.5 px-4 text-white">2026-11-12</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">+14</td>
        <td className="py-3.5 px-4 text-emerald-400">Positive</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Sprint duration: 14 days ahead</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-01</td>
        <td className="py-3.5 px-4 text-white">2026-11-12</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">-11</td>
        <td className="py-3.5 px-4 text-rose-400">Negative</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Overdue invoice: 11 days past deadline</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-11-12</td>
        <td className="py-3.5 px-4 text-white">2026-11-12</td>
        <td className="py-3.5 px-4 text-white font-bold">0</td>
        <td className="py-3.5 px-4 text-slate-400">Zero</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Same day milestone: 0 days elapsed</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2027-03-31"</td>
        <td className="py-3.5 px-4 text-white">"2026-04-01"</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">+364</td>
        <td className="py-3.5 px-4 text-emerald-400">Positive</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Full fiscal year span (Text auto-coerced)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2024-03-01</td>
        <td className="py-3.5 px-4 text-white">2024-02-01</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">+29</td>
        <td className="py-3.5 px-4 text-emerald-400">Positive</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap February span: correctly counts 29 days</td>
      </tr>
    `,
    deepDiveTitle: "DAYS() vs Direct Subtraction vs DATEDIF('D')",
    deepDiveSubtitle: "Choosing the optimal date subtraction engine for mission-critical enterprise systems.",
    deepDiveContent: `<p>Spreadsheet engineers frequently debate whether to write <code className="text-white font-mono">=B2 - A2</code>, <code className="text-indigo-300 font-mono">=DAYS(B2, A2)</code>, or <code className="text-sky-300 font-mono">=DATEDIF(A2, B2, "D")</code>.</p><p>Understanding their structural differences is vital: <br/>1. <code className="text-white font-mono">=B2 - A2</code> preserves fractional times. If B2 is 5:00 PM and A2 is 9:00 AM, subtraction yields <code className="text-white font-mono">0.333</code> days rather than a clean integer.<br/>2. <code className="text-sky-300 font-mono">=DATEDIF(A2, B2, "D")</code> strictly prohibits negative values; if start > end, it throws a fatal <code className="text-rose-400 font-mono">#NUM!</code> error.<br/>3. <code className="text-indigo-300 font-mono">=DAYS(B2, A2)</code> strips time automatically, handles text coercion, and safely returns signed negative integers when milestones are breached.</p>`,
    badPracticeTitle: "The DATEDIF Negative Breach Trap",
    badPracticeCode: `=DATEDIF(TargetDeadline, TODAY(), "D")`,
    badPracticeDesc: "Throws #NUM! as soon as the project deadline passes (since start_date > end_date), destroying downstream dashboards.",
    goodPracticeTitle: "Production Signed DAYS() Variance",
    goodPracticeCode: `=DAYS(TargetDeadline, TODAY())`,
    goodPracticeDesc: "Returns clean negative numbers (e.g. -5 days) when overdue and positive numbers (+12 days) when ahead of schedule.",
    svgCaption: "Signed date difference pipeline showing positive forward horizons vs negative overdue variance.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <line x1="80" y1="100" x2="760" y2="100" stroke="#334155" strokeWidth="4" />

        <circle cx="420" cy="100" r="14" fill="#4338CA" stroke="#818CF8" strokeWidth="3" />
        <text x="420" y="135" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold font-mono">Baseline Date (Arg 2)</text>
        <text x="420" y="155" textAnchor="middle" fill="#94A3B8" className="text-[10px]">e.g. TODAY()</text>

        <path d="M 435 85 Q 560 40 675 85" fill="none" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="555" y="55" textAnchor="middle" fill="#34D399" className="text-xs font-bold font-mono">+14 Days (In Future)</text>

        <circle cx="680" cy="100" r="12" fill="#059669" stroke="#34D399" strokeWidth="2" />
        <text x="680" y="135" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono font-bold">Future Target</text>

        <path d="M 405 85 Q 280 40 165 85" fill="none" stroke="#F43F5E" strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="285" y="55" textAnchor="middle" fill="#FB7185" className="text-xs font-bold font-mono">-11 Days (Overdue)</text>

        <circle cx="160" cy="100" r="12" fill="#BE123C" stroke="#F43F5E" strokeWidth="2" />
        <text x="160" y="135" textAnchor="middle" fill="#FECDD3" className="text-xs font-mono font-bold">Past Due Target</text>
      </svg>
    `,
    simulatorCode: `
  const [inpEndDate, setInpEndDate] = useState("2026-11-26");
  const [inpStartDate, setInpStartDate] = useState("2026-11-12");

  const daysDifference = useMemo(() => {
    const e = new Date(inpEndDate);
    const s = new Date(inpStartDate);

    if (isNaN(e.getTime()) || isNaN(s.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    // Isolate midnight UTC to strictly replicate DAYS() behavior
    const utcE = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
    const utcS = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());

    const diffDays = Math.round((utcE - utcS) / 86400000);

    let statusText = "Milestone on Target";
    let badgeClass = "text-emerald-400";
    if (diffDays < 0) {
      statusText = \`⚠️ Overdue by \${Math.abs(diffDays)} Days\`;
      badgeClass = "text-rose-400";
    } else if (diffDays > 0) {
      statusText = \`✓ \${diffDays} Days Remaining\`;
      badgeClass = "text-emerald-400";
    }

    const weeks = (diffDays / 7).toFixed(1);

    return {
      isError: false,
      diffDays,
      statusText,
      badgeClass,
      weeks,
      isPositive: diffDays >= 0
    };
  }, [inpEndDate, inpStartDate]);

  const applyPreset = (preset) => {
    if (preset === "sprint") {
      setInpStartDate("2026-11-12");
      setInpEndDate("2026-11-26");
    } else if (preset === "overdue") {
      setInpStartDate("2026-11-12");
      setInpEndDate("2026-11-01");
    } else if (preset === "quarter") {
      setInpStartDate("2026-10-01");
      setInpEndDate("2026-12-31");
    } else if (preset === "annual") {
      setInpStartDate("2026-04-01");
      setInpEndDate("2027-03-31");
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive DAYS(End, Start) Bench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate signed date differences, observe parameter order sensitivity, and test schedule overdue variances.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("sprint")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            2-Week Sprint (+14)
          </button>
          <button
            onClick={() => applyPreset("overdue")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Overdue Invoice (-11)
          </button>
          <button
            onClick={() => applyPreset("quarter")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Quarter Span (91d)
          </button>
          <button
            onClick={() => applyPreset("annual")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Indian FY (364d)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>End Date (Argument 1)</span>
            <span className="text-[10px] text-teal-400 font-mono">Target Deadline</span>
          </label>
          <input
            type="date"
            value={inpEndDate}
            onChange={(e) => setInpEndDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date (Argument 2)</span>
            <span className="text-[10px] text-sky-400 font-mono">Baseline / TODAY()</span>
          </label>
          <input
            type="date"
            value={inpStartDate}
            onChange={(e) => setInpStartDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DAYS("{inpEndDate}", "{inpStartDate}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Signed Difference:</span>
            <span
              className={\`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl \${
                daysDifference.diffDays < 0
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }\`}
            >
              {daysDifference.isError ? daysDifference.error : \`\${daysDifference.diffDays > 0 ? "+" : ""}\${daysDifference.diffDays} Days\`}
            </span>
          </div>
        </div>

        {!daysDifference.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Operational Status:</span>
              <span className={\`font-semibold font-mono text-sm \${daysDifference.badgeClass}\`}>
                {daysDifference.statusText}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Equivalent Weeks:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {daysDifference.weeks} Weeks
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Argument Order Check:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                End ({inpEndDate}) - Start ({inpStartDate})
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Corporate Accounts Receivable",
        location: "Barrackpore Industrial Finance",
        title: "Accounts Receivable Invoice Aging Bucket Engine",
        context: "Credit control audits unpaid customer invoices based on invoice payment due date in column B relative to today's date. Tag invoices overdue by more than 30 days.",
        comment: "Calculate days past due: TODAY() - DueDate",
        formula: `=IFS(DAYS(TODAY(), B2) <= 0, "CURRENT (NOT DUE)", DAYS(TODAY(), B2) <= 30, "1-30 DAYS PAST DUE", TRUE, "CRITICAL OVERDUE")`,
        sampleOutput: `"1-30 DAYS PAST DUE" (for invoice due 18 days ago)`
      },
      {
        category: "Software Project Management",
        location: "Salt Lake Sector V Agile Hub",
        title: "Agile Sprint Delivery Countdown Indicator",
        context: "Sprint dashboard displays exact calendar days remaining until release milestone in cell C2. Display 'SPRINT EXPIRED' if deadline has elapsed.",
        comment: "Use DAYS with milestone deadline as end_date",
        formula: `=IF(DAYS(C2, TODAY()) < 0, "SPRINT EXPIRED", DAYS(C2, TODAY()) & " DAYS REMAINING")`,
        sampleOutput: `"8 DAYS REMAINING" (for sprint ending in 8 days)`
      },
      {
        category: "Banking Fixed Term Deposits",
        location: "Kolkata Commercial Bank",
        title: "Premature FD Break Penalty Assessment",
        context: "Fixed deposit penalty rates depend on total calendar days elapsed since booking date in D2 prior to liquidation date in E2.",
        comment: "Measure total completed calendar days elapsed",
        formula: `=DAYS(E2, D2)`,
        sampleOutput: `184 Days Elapsed`
      },
      {
        category: "Procurement & Vendor SLAs",
        location: "Titagarh Railway Wagons",
        title: "Vendor Purchase Order Lead Time Variance",
        context: "Track vendor fulfillment performance by subtracting promised delivery date in F2 from actual warehouse receipt date in G2.",
        comment: "Positive variance denotes vendor delivery delay",
        formula: `=DAYS(G2, F2)`,
        sampleOutput: `+6 Days Delay`
      },
      {
        category: "Insurance & Warranty Claims",
        location: "Naihati Consumer Electronics",
        title: "Product Extended Warranty Validity Audit",
        context: "Warranty coverage lasts exactly 730 days (2 years) from purchase date in H2. Verify whether incident claim date in I2 occurred within warranty span.",
        comment: "Verify claim date minus purchase date does not exceed 730 days",
        formula: `=IF(DAYS(I2, H2) <= 730, "WARRANTY APPROVED", "CLAIM REJECTED - EXPIRED")`,
        sampleOutput: `"WARRANTY APPROVED" (at 610 days elapsed)`
      },
      {
        category: "Hospital Inpatient Census",
        location: "Ichapur Medical Institute",
        title: "Patient Length of Stay (LOS) Calculator",
        context: "Health insurance billing requires calculating total inpatient billable calendar days between admission date in J2 and discharge date in K2.",
        comment: "DAYS strips time component; add 1 for inclusive stay billing",
        formula: `=MAX(1, DAYS(K2, J2))`,
        sampleOutput: `5 Days Length of Stay`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Check Parameter Sequence",
        description: "Remember that DAYS(end_date, start_date) puts the END date first. Passing start date first inverts the sign of your result.",
        code: "=DAYS(End, Start) -> Correct\n=DAYS(Start, End) -> Inverted Sign"
      },
      {
        title: "Step 2: Automatic Time Component Stripping",
        description: "DAYS evaluates purely the integer calendar day, completely ignoring any attached timestamps.",
        code: "=DAYS('2026-11-15 18:00', '2026-11-12 09:00') -> Returns exactly 3"
      },
      {
        title: "Step 3: Handle Automatic Text Coercion",
        description: "DAYS automatically parses standard ISO date text without requiring manual DATEVALUE wrapping.",
        code: "=DAYS('2026-11-20', '2026-11-10') -> 10"
      },
      {
        title: "Step 4: Interpret Sign Convention",
        description: "Positive result = End is after Start (Future). Negative result = End is before Start (Past/Overdue).",
        code: "If Result < 0 -> Milestone Breached / Overdue"
      }
    ],
    troubleshootingRows: [
      {
        code: "Inverted Negative Numbers",
        cause: "Swapping the arguments by writing start_date first instead of end_date.",
        trigger: "=DAYS(StartDate, EndDate)",
        remedy: "Ensure end_date is argument 1: =DAYS(EndDate, StartDate)."
      },
      {
        code: "#VALUE! from Unparseable Text",
        cause: "One of the arguments contains text in an unrecognized regional format.",
        trigger: "=DAYS('31/13/2026', '2026-11-12')",
        remedy: "Convert dates using DATE(YYYY, MM, DD) or verify Short Date regional settings."
      },
      {
        code: "Inclusive vs Exclusive Off-By-One",
        cause: "DAYS calculates elapsed difference (End - Start). If billing requires counting both start and end days inclusively, add 1.",
        trigger: "Booking from Monday to Monday yields 7, but billing requires 8 inclusive days",
        remedy: "Use: =DAYS(End, Start) + 1 for inclusive calendar counting."
      }
    ],
    proTips: [
      {
        title: "DAYS vs Simple Minus Sign",
        text: "Simple subtraction =B2 - A2 retains fractional time. Use DAYS(B2, A2) when you want strictly whole integer days regardless of timestamps.",
        color: "text-indigo-400"
      },
      {
        title: "Safe Overdue Aging Formulas",
        text: "Never use DATEDIF for overdue tracking because it crashes with #NUM! on negative numbers. Always use DAYS(Deadline, TODAY()).",
        color: "text-emerald-400"
      },
      {
        title: "Automatic Leap Year Compliance",
        text: "DAYS automatically accounts for leap years. =DAYS('2024-03-01', '2024-02-01') correctly yields 29.",
        color: "text-sky-400"
      },
      {
        title: "Absolute Elapsed Days",
        text: "To determine absolute distance between two dates regardless of chronological order: =ABS(DAYS(A2, B2)).",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "Function Design",
        question: "Why did Microsoft position end_date as Argument 1 and start_date as Argument 2 in the DAYS function signature?"
      },
      {
        prompt: "Financial Audit",
        question: "When auditing commercial invoices, why must an auditor verify whether contract terms stipulate inclusive or exclusive day counts?"
      }
    ],
    mentorAdvice: "The DAYS function is the bedrock of project variance and overdue debt analysis. The #1 mistake students make is parameter inversion: always remember END comes before START. If you need clean negative variance numbers for overdue milestones, DAYS is vastly superior to DATEDIF."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 8: DAYS360
  // ---------------------------------------------------------------------------
  {
    idx: 8,
    name: "DAYS360",
    h1Title: "DAYS360 Function — Commercial 360-Day Bond Convention Engine",
    badgeLevel: "Financial Engineering · 30/360 Convention",
    bloomTaxonomy: "Evaluate & Calculate",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">DAYS360(start_date, end_date, [method])</code> function calculates the day difference between two dates based on a standardized <strong>360-day commercial calendar</strong>, where every calendar month is artificially treated as having exactly 30 days.</p><p>Originating in European commercial banking and formalized by the US National Association of Securities Dealers (NASD), the 30/360 day-count convention simplifies interest accrual schedules, corporate bond coupon pricing, commercial paper yields, and fixed-rate mortgage amortization tables. Understanding the subtle mathematical differences between the <strong>US (NASD) Method</strong> and the <strong>European Method</strong>—particularly around month-end dates and February boundaries—is essential for financial analysts and corporate accountants.</p>`,
    syntaxSummary: "=DAYS360(start_date, end_date, [method])",
    domainSummary: "Corporate Bond Pricing, Commercial Paper & Mortgage Amortization",
    patternSummary: "=DAYS360(A2, B2, FALSE) (US NASD 30/360 Method)",
    engineType: "Commercial 30/360 Financial Engine",
    canonicalSignature: `=DAYS360(start_date, end_date, [method])`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">start_date:</strong> Required. The beginning date of the interest accrual period.</div><div>• <strong className="text-sky-300">end_date:</strong> Required. The ending date of the interest accrual period.</div><div>• <strong className="text-amber-300">method:</strong> Optional. A boolean value specifying the calculation method: <br/>&nbsp;&nbsp;• <code className="font-mono text-white">FALSE or omitted:</code> <strong>US (NASD) Method.</strong> If start date is day 31, it becomes day 30. If end date is day 31 and start date is earlier than day 30, end date becomes day 1 of next month; otherwise day 30.<br/>&nbsp;&nbsp;• <code className="font-mono text-white">TRUE:</code> <strong>European Method.</strong> Start dates and end dates occurring on day 31 become day 30.</div>`,
    matrixTitle: "US (NASD) vs European 30/360 Method Comparison Matrix",
    matrixSubtitle: "Observe how month-end date pairs calculate under US vs European financial standards.",
    matrixHeaders: ["Start Date", "End Date", "Actual Days (DAYS)", "DAYS360 (US - FALSE)", "DAYS360 (Euro - TRUE)"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-01</td>
        <td className="py-3.5 px-4 text-white">2026-01-31</td>
        <td className="py-3.5 px-4 text-slate-300">30</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">30</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">29</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-31</td>
        <td className="py-3.5 px-4 text-white">2026-02-28</td>
        <td className="py-3.5 px-4 text-slate-300">28</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">28</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">28</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-02-28</td>
        <td className="py-3.5 px-4 text-white">2026-03-31</td>
        <td className="py-3.5 px-4 text-slate-300">31</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">33</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">32</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-01</td>
        <td className="py-3.5 px-4 text-white">2026-07-01</td>
        <td className="py-3.5 px-4 text-slate-300">181</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">180</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">180</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2026-01-01</td>
        <td className="py-3.5 px-4 text-white">2027-01-01</td>
        <td className="py-3.5 px-4 text-slate-300">365</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold">360</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">360</td>
      </tr>
    `,
    deepDiveTitle: "Financial Day-Count Conventions: Actual/Actual vs 30/360",
    deepDiveSubtitle: "Why multi-million dollar bond interest calculations depend on the 360-day baseline.",
    deepDiveContent: `<p>In global financial markets, interest is calculated using the canonical formula: <code className="text-white font-mono">Interest = Principal × Rate × (Days / BaseYear)</code>.</p><p>Under the <strong>Actual/Actual</strong> convention used for US Treasury Bonds, the actual calendar days (365 or 366) are divided by the actual days in the year. However, for <strong>Corporate Bonds and Commercial Paper</strong>, the standardized <strong>30/360</strong> convention is mandated. By pretending every month has exactly 30 days and the year has 360 days, semi-annual coupons are perfectly equal (<code className="text-emerald-300 font-mono">180 / 360 = 0.50</code>), preventing coupon payment discrepancies between leap years and common years.</p>`,
    badPracticeTitle: "The Common Calendar Bond Pricing Error",
    badPracticeCode: `=Principal * Rate * ((B2 - A2) / 365)`,
    badPracticeDesc: "Fails regulatory compliance for municipal and corporate bonds that legally stipulate the 30/360 day-count convention.",
    goodPracticeTitle: "Production Regulatory DAYS360 Formula",
    goodPracticeCode: `=Principal * Rate * (DAYS360(A2, B2, FALSE) / 360)`,
    goodPracticeDesc: "Applies the exact NASD 30/360 day-count rule, ensuring penny-accurate bond coupon pricing.",
    svgCaption: "The 30/360 convention homogenizing calendar months into uniform 30-day blocks.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="30" width="160" height="60" rx="12" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-bold font-mono">January (31 Days)</text>
        <text x="110" y="75" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Real Calendar</text>

        <rect x="210" y="30" width="160" height="60" rx="12" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="290" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-bold font-mono">February (28 Days)</text>
        <text x="290" y="75" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Real Calendar</text>

        <path d="M 110 95 L 200 135 M 290 95 L 200 135" stroke="#38BDF8" strokeWidth="2" />

        <rect x="120" y="130" width="160" height="50" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="200" y="152" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">DAYS360 Engine</text>
        <text x="200" y="168" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Clamp: Month = 30 Days</text>

        <path d="M 285 155 L 360 155" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="360" y="125" width="450" height="60" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="585" y="150" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold font-mono">Semi-Annual Coupon: Exactly 180 Days (180/360 = 0.50)</text>
        <text x="585" y="170" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">No Leap Year Fluctuations</text>
      </svg>
    `,
    simulatorCode: `
  const [inpStart, setInpStart] = useState("2026-01-01");
  const [inpEnd, setInpEnd] = useState("2026-07-01");
  const [methodEuro, setMethodEuro] = useState(false);
  const [bondPrincipal, setBondPrincipal] = useState(10000000);
  const [couponRate, setCouponRate] = useState(7.5);

  const bondCalcResult = useMemo(() => {
    const s = new Date(inpStart);
    const e = new Date(inpEnd);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date entered" };
    }

    // Days360 algorithm
    let d1 = s.getDate();
    let m1 = s.getMonth() + 1;
    let y1 = s.getFullYear();

    let d2 = e.getDate();
    let m2 = e.getMonth() + 1;
    let y2 = e.getFullYear();

    if (!methodEuro) {
      // US (NASD) Method
      if (d1 === 31) d1 = 30;
      if (d2 === 31 && d1 >= 30) d2 = 30;
    } else {
      // European Method
      if (d1 === 31) d1 = 30;
      if (d2 === 31) d2 = 30;
    }

    const days360Value = (y2 - y1) * 360 + (m2 - m1) * 30 + (d2 - d1);

    // Actual calendar days
    const utcE = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
    const utcS = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
    const actualDays = Math.round((utcE - utcS) / 86400000);

    const interestAccrued = (bondPrincipal * (couponRate / 100) * (days360Value / 360));
    const actualInterest = (bondPrincipal * (couponRate / 100) * (actualDays / 365));
    const variance = interestAccrued - actualInterest;

    return {
      isError: false,
      days360Value,
      actualDays,
      interestAccrued: interestAccrued.toLocaleString("en-IN", { maximumFractionDigits: 2 }),
      actualInterest: actualInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 }),
      variance: variance.toLocaleString("en-IN", { maximumFractionDigits: 2 })
    };
  }, [inpStart, inpEnd, methodEuro, bondPrincipal, couponRate]);

  const applyPreset = (preset) => {
    if (preset === "semi_annual") {
      setInpStart("2026-01-01");
      setInpEnd("2026-07-01");
      setMethodEuro(false);
    } else if (preset === "month_end_jan") {
      setInpStart("2026-01-01");
      setInpEnd("2026-01-31");
      setMethodEuro(false);
    } else if (preset === "euro_feb") {
      setInpStart("2026-02-28");
      setInpEnd("2026-03-31");
      setMethodEuro(true);
    } else if (preset === "full_year") {
      setInpStart("2026-01-01");
      setInpEnd("2027-01-01");
      setMethodEuro(false);
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive DAYS360 Bond Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare the US (NASD) vs European 30/360 day-count methods and calculate commercial bond interest accruals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("semi_annual")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Semi-Annual (180d)
          </button>
          <button
            onClick={() => applyPreset("month_end_jan")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Jan 1 - Jan 31
          </button>
          <button
            onClick={() => applyPreset("euro_feb")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            European Feb Clamping
          </button>
          <button
            onClick={() => applyPreset("full_year")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Full Year (360 vs 365)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Start Date</span>
            <span className="text-[10px] text-teal-400 font-mono">Coupon Start</span>
          </label>
          <input
            type="date"
            value={inpStart}
            onChange={(e) => setInpStart(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>End Date</span>
            <span className="text-[10px] text-sky-400 font-mono">Settlement Date</span>
          </label>
          <input
            type="date"
            value={inpEnd}
            onChange={(e) => setInpEnd(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Method Selection (3rd Arg)
          </label>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setMethodEuro(false)}
              className={\`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer \${
                !methodEuro ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }\`}
            >
              US NASD (FALSE)
            </button>
            <button
              onClick={() => setMethodEuro(true)}
              className={\`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer \${
                methodEuro ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }\`}
            >
              European (TRUE)
            </button>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">Controls day 31 clamping rules</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DAYS360("{inpStart}", "{inpEnd}", {methodEuro ? "TRUE" : "FALSE"})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">360-Day Count:</span>
            <span className="font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700">
              {bondCalcResult.days360Value} Days
            </span>
          </div>
        </div>

        {!bondCalcResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Actual Calendar Days (DAYS):</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {bondCalcResult.actualDays} Days
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">30/360 Accrued Interest:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                ₹{bondCalcResult.interestAccrued}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Interest Variance vs Actual/365:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                ₹{bondCalcResult.variance}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Corporate Debt & Bond Treasury",
        location: "Kolkata Dalhousie Financial District",
        title: "Corporate Debenture Semi-Annual Coupon Accrual",
        context: "A commercial debenture of INR 10 Crores pays a 7.5% annual coupon under the US 30/360 bond convention. Calculate accrued interest between settlement dates in A2 and B2.",
        comment: "Multiply principal by rate and fractional 360-day year",
        formula: `=Principal * CouponRate * (DAYS360(A2, B2, FALSE) / 360)`,
        sampleOutput: `INR 3,75,000.00 (exactly 0.50 of year for 180 days)`
      },
      {
        category: "Commercial Banking & Mortgages",
        location: "Barrackpore Cooperative Bank",
        title: "Commercial Real Estate Mortgage Interest Schedule",
        context: "Commercial mortgage amortizations accrue interest on a 30/360 day basis to ensure identical monthly interest debits regardless of February's 28-day length.",
        comment: "Calculate monthly interest factor on 30-day basis",
        formula: `=LoanOutstanding * (AnnualRate / 360) * DAYS360(StartDate, EndDate)`,
        sampleOutput: `INR 62,500.00 (standardized 30-day interest charge)`
      },
      {
        category: "Money Market & Commercial Paper",
        location: "Salt Lake Financial Operations",
        title: "90-Day Commercial Paper Discount Yield Valuation",
        context: "Discounted commercial paper issued on date in C2 matures on date in D2. Verify whether the issuance complies with the standard 90-day 30/360 tenor.",
        comment: "Verify exact 90-day commercial tenor",
        formula: `=IF(DAYS360(C2, D2) = 90, "COMPLIANT 90-DAY CP", "NON-STANDARD TENOR")`,
        sampleOutput: `"COMPLIANT 90-DAY CP"`
      },
      {
        category: "International Trade & Letters of Credit",
        location: "Kolkata Port Logistics",
        title: "European Method Usance LC Acceptance Commission",
        context: "A European buyer issues a 180-day Usance Letter of Credit. Acceptance commission of 1.25% p.a. is calculated using the European 30/360 day-count convention.",
        comment: "Pass TRUE for European 30/360 calculation method",
        formula: `=LCAmount * CommissionRate * (DAYS360(IssueDate, MaturityDate, TRUE) / 360)`,
        sampleOutput: `EUR 12,500.00 (on EUR 2,000,000 LC)`
      },
      {
        category: "Municipal Bond Finance",
        location: "Kanchrapara Urban Infrastructure",
        title: "Municipal Infrastructure Bond Broken Period Interest",
        context: "When a municipal bond is purchased between coupon dates (broken period from 15-Jan to 28-Feb), calculate accrued interest owed to seller under NASD rules.",
        comment: "Calculate accrued broken period days using DAYS360",
        formula: `=FaceValue * Coupon * (DAYS360(LastCouponDate, PurchaseDate, FALSE) / 360)`,
        sampleOutput: `INR 18,333.33 (for 44 commercial days)`
      },
      {
        category: "Equipment Lease Amortization",
        location: "Naihati Heavy Machinery Rentals",
        title: "Heavy Equipment Lease Per-Diem Accrual",
        context: "Lease contract stipulates interest compounding on a 360-day commercial year. Determine per diem interest rate for crane rental over date range in E2 to F2.",
        comment: "DAYS360 ensures 30 days per month regardless of month lengths",
        formula: `=LeaseCapital * Rate * (DAYS360(E2, F2) / 360)`,
        sampleOutput: `INR 45,000.00 (for 3 months lease period)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Identify Financial Convention",
        description: "Verify whether your loan or bond agreement mandates US (NASD) 30/360 or European 30/360.",
        code: "US Method: method = FALSE (or omitted)\nEuropean: method = TRUE"
      },
      {
        title: "Step 2: Understand the 30-Day Month Constraint",
        description: "DAYS360 treats every month as having exactly 30 days. February 28 to March 31 is computed as 33 days in US NASD method.",
        code: "=DAYS360('2026-02-28', '2026-03-31', FALSE) -> 33"
      },
      {
        title: "Step 3: Calculate the Year Fraction",
        description: "Divide DAYS360 output by 360 to obtain the exact commercial year fraction for interest formulas.",
        code: "Fraction: =DAYS360(A2, B2) / 360"
      },
      {
        title: "Step 4: Contrast Against Actual/Actual",
        description: "Notice that DAYS360 yields 180 for semi-annual dates, whereas actual calendar days fluctuates between 181 and 184.",
        code: "Semi-Annual: 180 / 360 = 0.5000 exactly"
      }
    ],
    troubleshootingRows: [
      {
        code: "Discrepancy Between US and European Methods",
        cause: "End date falls on day 31. European method clamps day 31 to day 30, while US method rolls to day 1 under specific rules.",
        trigger: "=DAYS360('2026-01-01', '2026-01-31', FALSE) -> 30, but TRUE -> 29!",
        remedy: "Check bond prospectus for exact '30E/360' (European) or '30/360 US' specification."
      },
      {
        code: "Mismatched Parameter Order",
        cause: "Unlike the DAYS function which takes (End, Start), DAYS360 takes (Start, End).",
        trigger: "=DAYS360(EndDate, StartDate) returns a negative number",
        remedy: "Pass StartDate as Arg 1 and EndDate as Arg 2: =DAYS360(Start, End)."
      },
      {
        code: "Accrual Variance vs Bank Statements",
        cause: "Using DAYS360 for bank accounts that calculate interest on Actual/365 convention.",
        trigger: "Calculating consumer savings account interest with DAYS360",
        remedy: "Use standard DAYS(End, Start) / 365 for retail bank accounts."
      }
    ],
    proTips: [
      {
        title: "Parameter Sequence Warning",
        text: "Beware! =DAYS(End, Start) has End first, but =DAYS360(Start, End) has Start first! This is one of Excel's most infamous parameter inconsistencies.",
        color: "text-rose-400"
      },
      {
        title: "The YEARFRAC Basis 0 Equivalent",
        text: "The formula =DAYS360(A2, B2, FALSE) / 360 is mathematically 100% identical to =YEARFRAC(A2, B2, 0).",
        color: "text-indigo-400"
      },
      {
        title: "Why 360 Days Exists",
        text: "Before computers, calculating 365-day fractional interest with varying month lengths (28, 30, 31) was slow and error-prone. The 30/360 convention standardized manual math.",
        color: "text-emerald-400"
      },
      {
        title: "Negative Tenor Support",
        text: "If start date is chronologically after end date, DAYS360 returns a negative integer, allowing backward interest adjustments.",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "Financial History",
        question: "Why did 19th-century commercial banks create the 360-day year convention, and why does Wall Street still use it for corporate debentures today?"
      },
      {
        prompt: "Parameter Nuance",
        question: "Why does DAYS360 take (start_date, end_date) while the newer DAYS function takes (end_date, start_date)?"
      }
    ],
    mentorAdvice: "In corporate debt capital markets, precision is paramount. Never use standard day subtraction for bond coupons — corporate debentures legally mandate the 30/360 day-count convention. And guard against Excel's signature trap: DAYS takes (End, Start), while DAYS360 takes (Start, End)."
  }
];

// Generate files for Topics 5 to 8
for (const t of topics5to8) {
  const jsx = buildTopicJsx(t);
  const outPath = path.join(baseDir, `Topic${t.idx}.jsx`);
  fs.writeFileSync(outPath, jsx, 'utf8');
  console.log(`Generated Topic${t.idx}.jsx (${jsx.split('\n').length} lines)`);
}

