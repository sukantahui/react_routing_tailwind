const fs = require('fs');
const path = require('path');
const { buildTopicJsx, baseDir } = require('./topic_template_engine.cjs');

const topics0to4 = [
  // ---------------------------------------------------------------------------
  // TOPIC 0: NOW()
  // ---------------------------------------------------------------------------
  {
    idx: 0,
    name: "NOW",
    h1Title: "NOW Function — Live System Timestamp & SLA Drift Engine",
    badgeLevel: "Core Function · Volatile Engine",
    bloomTaxonomy: "Evaluate & Apply",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">NOW()</code> function is Excel's real-time system clock transducer. It interrogates the host operating system's local clock cycle and returns a 64-bit double precision floating-point serial number combining the integer date with the high-precision fractional day.</p><p>Because <code className="text-indigo-300 font-mono">NOW()</code> is classified as a <strong>Volatile Function</strong>, it forces recalculation of its host cell and all downstream dependent calculation trees whenever Excel executes a recalculation event (cell edit, F9 manual trigger, or workbook open). In enterprise analytics across IT service management, real-time SLA monitors, automated shift attendance, and dynamic batch execution pipelines, understanding its dual-precision nature and performance overhead is mandatory.</p>`,
    syntaxSummary: "=NOW()",
    domainSummary: "Real-Time IT Service Desk & SLA Monitoring",
    patternSummary: "=NOW() - A2 (Elapsed Fractional Days)",
    engineType: "Dynamic Host Clock Engine",
    canonicalSignature: `=NOW()`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">Arguments:</strong> None. The function accepts no parameters. Any arguments supplied inside the parentheses will trigger a <code className="font-mono text-rose-400">#N/A</code> or syntax error dialog.</div><div>• <strong className="text-sky-300">Return Value:</strong> Serial date-time number. The integer portion represents days elapsed since January 1, 1900; the decimal portion represents fractional day elapsed since 12:00:00 AM (midnight).</div><div>• <strong className="text-amber-300">Recalculation Behavior:</strong> Volatile. Recalculates dynamically across all threads upon worksheet recalculation events.</div>`,
    matrixTitle: "NOW() Precision & Serial Breakdown Matrix",
    matrixSubtitle: "Observe how Excel stores fractional time slices and how time arithmetic operates on the serial.",
    matrixHeaders: ["Fractional Serial", "Clock Time", "Elapsed Hours", "Elapsed Minutes", "Sample Formula Extraction"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.000000</td>
        <td className="py-3.5 px-4 text-white">12:00:00 AM (Midnight)</td>
        <td className="py-3.5 px-4 text-slate-300">0.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">0 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW())</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.250000</td>
        <td className="py-3.5 px-4 text-white">06:00:00 AM</td>
        <td className="py-3.5 px-4 text-slate-300">6.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">360 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW()) + 0.25</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.500000</td>
        <td className="py-3.5 px-4 text-white">12:00:00 PM (Noon)</td>
        <td className="py-3.5 px-4 text-slate-300">12.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">720 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW()) + 0.50</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">0.750000</td>
        <td className="py-3.5 px-4 text-white">06:00:00 PM</td>
        <td className="py-3.5 px-4 text-slate-300">18.0 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">1,080 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=INT(NOW()) + 0.75</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-amber-400 font-bold">0.999988</td>
        <td className="py-3.5 px-4 text-white">11:59:59 PM</td>
        <td className="py-3.5 px-4 text-slate-300">23.999 Hours</td>
        <td className="py-3.5 px-4 text-slate-300">1,439.98 Minutes</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">=NOW()</td>
      </tr>
    `,
    deepDiveTitle: "The Volatility Cascade & Operating System Clock Resolution",
    deepDiveSubtitle: "Why thousands of =NOW() formulas cripple workbook responsiveness and how enterprise models mitigate recalculation spikes.",
    deepDiveContent: `<p>In Microsoft Excel's multi-threaded calculation engine, formulas are indexed into an internal <strong>Dependency Tree</strong>. Standard formulas (such as <code className="text-white font-mono">=A1 + B1</code>) only recalculate when their predecessor precedents change.</p><p>However, functions flagged as <strong>Volatile</strong> (<code className="text-indigo-300 font-mono">NOW</code>, <code className="text-indigo-300 font-mono">TODAY</code>, <code className="text-indigo-300 font-mono">RAND</code>, <code className="text-indigo-300 font-mono">OFFSET</code>, <code className="text-indigo-300 font-mono">INDIRECT</code>) register unconditionally on the global unbuffered recalculation list. Every single time a user enters data into ANY cell in the workbook, Excel is forced to evaluate every <code className="text-indigo-300 font-mono">NOW()</code> formula and recalculate all downstream dependent formulas.</p>`,
    badPracticeTitle: "The Volatile Performance Killer Pattern",
    badPracticeCode: `=IF(NOW() > [@[SLADeadline]], "Breached", "In SLA")`,
    badPracticeDesc: "Placed in 50,000 table rows: Recalculates 50,000 times per keystroke across the entire workbook, causing 4 to 8 second UI freezing.",
    goodPracticeTitle: "Production Single-Cell Reference Pattern",
    goodPracticeCode: `=IF($Z$1 > [@[SLADeadline]], "Breached", "In SLA")`,
    goodPracticeDesc: "Place =NOW() in exactly one anchor cell ($Z$1). The dependency engine updates only the anchor and only triggers recalculations when explicitly targeted.",
    svgCaption: "Visual architecture of the host OS clock cycle flowing into Excel's 64-bit IEEE 754 floating point representation.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <defs>
          <linearGradient id="nowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <rect x="30" y="40" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">OS Hardware Clock</text>
        <text x="140" y="98" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">System RTC (2026-11-12)</text>
        <text x="140" y="120" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">18:45:00.000 UTC+5:30</text>

        <path d="M 250 95 L 310 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="310" y="40" width="230" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="425" y="75" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">Excel Serial Assembler</text>
        <text x="425" y="98" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Date Part: 46338 (Days)</text>
        <text x="425" y="120" textAnchor="middle" fill="#34D399" className="text-xs font-mono">+ Time Part: 0.78125</text>

        <path d="M 540 95 L 600 95" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="600" y="40" width="210" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="705" y="75" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Evaluated =NOW()</text>
        <text x="705" y="100" textAnchor="middle" fill="#6EE7B7" className="text-sm font-black font-mono">46338.78125</text>
        <text x="705" y="122" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">12-Nov-2026 6:45 PM</text>
      </svg>
    `,
    simulatorCode: `
  const [ticketTimeStr, setTicketTimeStr] = useState("2026-11-12T09:00");
  const [slaHoursLimit, setSlaHoursLimit] = useState(8);
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeTimestamp, setFreezeTimestamp] = useState(null);

  const liveNow = useMemo(() => {
    return isFrozen && freezeTimestamp ? freezeTimestamp : new Date();
  }, [isFrozen, freezeTimestamp]);

  const liveCalculation = useMemo(() => {
    const tStart = new Date(ticketTimeStr);
    if (isNaN(tStart.getTime())) {
      return { error: "Invalid Start Time", isError: true };
    }
    const diffMs = liveNow.getTime() - tStart.getTime();
    const diffFractionalDays = diffMs / (1000 * 60 * 60 * 24);
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffMinutes = (diffMs / (1000 * 60)) % 60;
    const diffSeconds = Math.floor((diffMs / 1000) % 60);

    const isBreached = diffHours > slaHoursLimit;
    const remainingHours = slaHoursLimit - diffHours;

    // Excel serial calculation:
    // Days between 1900-01-01 and 1970-01-01 is 25569. Excel leap year bug adds 1 day -> 25569.
    const excelSerial = 25569.0 + (liveNow.getTime() - (liveNow.getTimezoneOffset() * 60000)) / 86400000.0;

    return {
      isError: false,
      diffFractionalDays: diffFractionalDays.toFixed(6),
      diffHours: diffHours.toFixed(2),
      formattedDuration: \`\${Math.floor(diffHours)}h \${Math.floor(diffMinutes)}m \${diffSeconds}s\`,
      isBreached,
      remainingHours: remainingHours.toFixed(2),
      excelSerial: excelSerial.toFixed(5),
      isoString: liveNow.toISOString().replace("T", " ").slice(0, 19)
    };
  }, [ticketTimeStr, slaHoursLimit, liveNow]);

  const applyPreset = (preset) => {
    const now = new Date();
    if (preset === "incident") {
      const past = new Date(now.getTime() - 3.5 * 3600000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(4);
    } else if (preset === "breach") {
      const past = new Date(now.getTime() - 11.2 * 3600000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(8);
    } else if (preset === "shift") {
      const past = new Date(now.getTime() - 7.8 * 3600000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(8.5);
    } else if (preset === "just_logged") {
      const past = new Date(now.getTime() - 15 * 60000);
      setTicketTimeStr(past.toISOString().slice(0, 16));
      setSlaHoursLimit(2);
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Live NOW() System Clock & SLA Bench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate real-time SLA drift, examine Excel 64-bit serial calculations, and toggle live vs frozen clock states.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (isFrozen) {
                setIsFrozen(false);
                setFreezeTimestamp(null);
              } else {
                setIsFrozen(true);
                setFreezeTimestamp(new Date());
              }
            }}
            className={\`px-3 py-1.5 text-xs rounded-xl font-bold border transition cursor-pointer flex items-center gap-1.5 \${
              isFrozen
                ? "bg-amber-950/80 text-amber-300 border-amber-600/70"
                : "bg-emerald-950/80 text-emerald-300 border-emerald-600/70 animate-pulse"
            }\`}
          >
            <span>{isFrozen ? "❄️ Frozen Clock (Static)" : "⚡ Live Ticking (Volatile)"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">SLA Presets:</span>
        <button
          onClick={() => applyPreset("incident")}
          className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
        >
          P1 Incident (4h SLA)
        </button>
        <button
          onClick={() => applyPreset("breach")}
          className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
        >
          Critical SLA Breach
        </button>
        <button
          onClick={() => applyPreset("shift")}
          className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
        >
          Daily Shift Handover
        </button>
        <button
          onClick={() => applyPreset("just_logged")}
          className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
        >
          15-Min Heartbeat
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Ticket Logged Timestamp (A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Past Baseline</span>
          </label>
          <input
            type="datetime-local"
            value={ticketTimeStr}
            onChange={(e) => setTicketTimeStr(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>SLA Target Limit (Hours)</span>
            <span className="text-[10px] text-emerald-400 font-mono">Contractual Ceiling</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="72"
            value={slaHoursLimit}
            onChange={(e) => setSlaHoursLimit(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =(NOW() - A2) * 24
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Elapsed Hours:</span>
            <span
              className={\`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl \${
                liveCalculation.isBreached
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }\`}
            >
              {liveCalculation.diffHours} hrs
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Calculated Duration:</span>
            <span className="text-amber-300 font-semibold font-mono text-sm">
              {liveCalculation.formattedDuration}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">SLA Compliance:</span>
            <span
              className={\`font-bold inline-flex items-center gap-1.5 \${
                liveCalculation.isBreached ? "text-rose-400" : "text-emerald-400"
              }\`}
            >
              {liveCalculation.isBreached ? "✗ SLA Breached" : "✓ Within Contractual SLA"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Raw NOW() Serial:</span>
            <span className="text-sky-300 font-semibold font-mono text-sm">
              {liveCalculation.excelSerial}
            </span>
          </div>
        </div>
      </div>
    `,
    scenarios: [
      {
        category: "ITSM Incident Management",
        location: "Kolkata Cloud NOC",
        title: "Dynamic Severity-1 Incident Duration Tracker",
        context: "The Tier-3 cloud operations team needs a live formula to calculate elapsed minutes since server outage timestamp in cell A2 and trigger an escalation alert if time exceeds 30 minutes.",
        comment: "Calculate elapsed fractional days, multiply by 1440 minutes in a day, compare against SLA",
        formula: `=IF((NOW() - A2) * 1440 > 30, "ESCALATE TO VP ENGINEERING", "IN MONITORING")`,
        sampleOutput: `"ESCALATE TO VP ENGINEERING" (when outage is 42 mins old)`
      },
      {
        category: "Corporate HR & Attendance",
        location: "Barrackpore Technology Park",
        title: "Automated Daily Shift Check-In Timestamp Capture",
        context: "HR requires capturing an immutable check-in timestamp when an employee clicks 'Check-In' in cell B2, without having the timestamp update on subsequent days.",
        comment: "Requires Iterative Calculation enabled (Options > Formulas > Enable iterative calculation)",
        formula: `=IF(B2="Check-In", IF(C2="", NOW(), C2), "")`,
        sampleOutput: `46338.37500 (Displays 09:00:00 AM permanently in C2)`
      },
      {
        category: "Banking Treasury & Forex",
        location: "Dalhousie Financial Hub, Kolkata",
        title: "T+1 Overnight Interbank Repo Interest Accrual",
        context: "Money market desk calculates fractional day interest accrued on an overnight overnight repo loan of INR 50 Crores since booking timestamp in cell D2.",
        comment: "Fractional day times annual rate divided by 360 commercial bank days",
        formula: `=(NOW() - D2) * (Principal * RepoRate / 360)`,
        sampleOutput: `INR 93,750.00 (accrued for 0.75 fractional days)`
      },
      {
        category: "Supply Chain & Cold Storage",
        location: "Dankuni Logistics Center",
        title: "Temperature Excursion Warning Horizon",
        context: "Vaccine storage monitors track vaccine temperature readings updated every 15 minutes. If no ping is received from sensor within 45 minutes of cell E2, flag communication failure.",
        comment: "Subtract sensor timestamp from NOW() and verify minutes elapsed",
        formula: `=IF((NOW() - E2) * 24 * 60 > 45, "SENSOR TIMEOUT / ALARM", "ONLINE")`,
        sampleOutput: `"ONLINE" (when last ping was 12 mins ago)`
      },
      {
        category: "Enterprise Finance & Month End",
        location: "Salt Lake Sector V, Kolkata",
        title: "Month-End Financial Books Closing Countdown",
        context: "Corporate controller publishes a live dashboard showing exact hours and fractional minutes remaining until financial book closure at 11:59:59 PM on month end.",
        comment: "Subtract NOW() from EOMONTH midnight deadline",
        formula: `=(EOMONTH(TODAY(), 0) + TIME(23, 59, 59) - NOW()) * 24`,
        sampleOutput: `18.42 Hours Remaining`
      },
      {
        category: "Digital Signature & Audit Log",
        location: "Naihati Compliance Center",
        title: "Cryptographic Audit Token Expiration Check",
        context: "Tax audit reports contain an OAuth token with a 3600-second TTL created at timestamp F2. Flag whether the token is still valid for automated GST portal submission.",
        comment: "Convert 3600 seconds to fractional days (3600 / 86400 = 0.041667)",
        formula: `=IF(NOW() <= F2 + (3600 / 86400), "TOKEN VALID", "TOKEN EXPIRED")`,
        sampleOutput: `"TOKEN VALID" (at 2,100 seconds elapsed)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Understand Excel's 64-Bit Serial Storage",
        description: "Excel stores dates as whole integers starting with 1 = Jan 1, 1900. Times are stored as decimals from 0.00000 to 0.99999 representing the portion of the 24-hour cycle.",
        code: "NOW() -> 46338.75 = 12-Nov-2026 at 6:00:00 PM"
      },
      {
        title: "Step 2: Isolate the Date Portion",
        description: "To strip off the fractional time and retain purely today's date serial, apply the INT() function or use TODAY().",
        code: "=INT(NOW()) equals =TODAY()"
      },
      {
        title: "Step 3: Isolate the Time Portion",
        description: "To extract the fractional time of day independent of the calendar date, use the MOD function with divisor 1.",
        code: "=MOD(NOW(), 1) -> Returns 0.75 for 6:00 PM"
      },
      {
        title: "Step 4: Scale Elapsed Time into Practical Units",
        description: "Subtracting two timestamps yields fractional days. Multiply by 24 for hours, 1,440 for minutes, or 86,400 for seconds.",
        code: "Elapsed Hours: =(NOW() - StartTime) * 24\nElapsed Minutes: =(NOW() - StartTime) * 1440"
      }
    ],
    troubleshootingRows: [
      {
        code: "Continuous Workbook Freezing",
        cause: "Too many volatile NOW() formulas in large worksheets triggering global recalculation cascades on every edit.",
        trigger: "=NOW() copied across 50,000 table rows",
        remedy: "Calculate =NOW() once in a single dedicated control cell ($Z$1) and reference that cell across formulas."
      },
      {
        code: "#VALUE! on Subtraction",
        cause: "The baseline cell contains a text string resembling a date rather than an authentic numeric date-time serial.",
        trigger: "=NOW() - '12-11-2026 09:00'",
        remedy: "Convert the string using DATEVALUE + TIMEVALUE or replace text with authentic date serials."
      },
      {
        code: "Negative Time Displayed as #######",
        cause: "Excel's 1900 date system cannot display negative dates or times unless the 1904 date system is enabled.",
        trigger: "=(StartTime - NOW()) formatted as [h]:mm:ss",
        remedy: "Wrap with ABS() or use IF(StartTime > NOW(), ...) before formatting as time."
      }
    ],
    proTips: [
      {
        title: "Static Timestamp Shortcuts",
        text: "Need a timestamp that NEVER changes? Press 'Ctrl + ;' for static date, followed by Space, then 'Ctrl + Shift + ;' for static time.",
        color: "text-indigo-400"
      },
      {
        title: "F9 Recalculation Control",
        text: "Switch Excel to Manual Calculation (Formulas > Calculation Options > Manual) when working on massive models. Press F9 only when ready to refresh.",
        color: "text-emerald-400"
      },
      {
        title: "Custom Time Number Formatting",
        text: "To display cumulative elapsed hours beyond 24, wrap the hour token in brackets: [h]:mm:ss instead of standard hh:mm:ss.",
        color: "text-sky-400"
      },
      {
        title: "VBA & Office Script Alternatives",
        text: "For audit trails, write a single-line Worksheet_Change event in VBA to write DateTime.Now statically into logging columns.",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "System Architecture",
        question: "Why does Microsoft Excel consider NOW() volatile while mathematical functions like SUM, AVERAGE, and EXP are strictly non-volatile?"
      },
      {
        prompt: "Data Engineering Precision",
        question: "If an automated macro records transaction logs using NOW(), what precision issues might arise when transactions occur milliseconds apart?"
      }
    ],
    mentorAdvice: "In enterprise data engineering, NOW() is like a running engine: powerful, but you must know when to turn it off. Never use NOW() in large transactional tables across tens of thousands of rows. Anchor it to a single dashboard cell, or better yet, use static timestamp shortcuts for historical tracking."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 1: DATE()
  // ---------------------------------------------------------------------------
  {
    idx: 1,
    name: "DATE",
    h1Title: "DATE Function — Robust Component Assembly & Overflow Math",
    badgeLevel: "Core Constructor · Deterministic Engine",
    bloomTaxonomy: "Analyze & Construct",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">DATE(year, month, day)</code> function is the foundation of defensive calendar engineering in Microsoft Excel. It accepts three discrete integer inputs and compiles them into an unambiguous, locale-agnostic 64-bit date serial number.</p><p>Unlike brittle text concatenation (<code className="text-rose-300 font-mono">="12/11/2026"</code>) which disastrously flips between <em>DD/MM/YYYY</em> and <em>MM/DD/YYYY</em> depending on whether the workbook is opened in the United Kingdom, India, or the United States, <code className="text-indigo-300 font-mono">DATE()</code> is 100% immune to regional Windows configuration variances. Furthermore, it incorporates an intelligent mathematical overflow and underflow engine, making rolling calendar offsets trivial.</p>`,
    syntaxSummary: "=DATE(year, month, day)",
    domainSummary: "Cross-Border ERP, Tax & Fiscal Calendar Engineering",
    patternSummary: "=DATE(YEAR(A2)+1, 3, 31) (Indian Fiscal Closing)",
    engineType: "Locale-Safe Serial Synthesizer",
    canonicalSignature: `=DATE(year, month, day)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">year:</strong> Required. An integer from 1 to 9999. Four-digit years (e.g. 2026) are strongly recommended. Two-digit numbers (0-29 map to 2000-2029; 30-99 map to 1930-1999).</div><div>• <strong className="text-sky-300">month:</strong> Required. A positive or negative integer representing the month of the year from 1 to 12. Values greater than 12 roll forward into subsequent years; values less than 1 roll backward into prior years.</div><div>• <strong className="text-amber-300">day:</strong> Required. A positive or negative integer representing the day of the month from 1 to 31. Values exceeding month length roll forward into next months; passing 0 rolls back to the final day of the preceding month.</div>`,
    matrixTitle: "DATE Function Overflow & Underflow Behavior Matrix",
    matrixSubtitle: "Explore how Excel gracefully normalizes out-of-range month and day arguments without throwing errors.",
    matrixHeaders: ["Formula Expression", "Intended Math", "Evaluated Date", "Underlying Serial", "Operational Use Case"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2026, 14, 1)</td>
        <td className="py-3.5 px-4 text-white">Year 2026 + 14 Months</td>
        <td className="py-3.5 px-4 text-emerald-300">01-Feb-2027</td>
        <td className="py-3.5 px-4 text-slate-300">46419</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Multi-month project delay forward modeling</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2026, 3, 0)</td>
        <td className="py-3.5 px-4 text-white">Day 0 of March 2026</td>
        <td className="py-3.5 px-4 text-emerald-300">28-Feb-2026</td>
        <td className="py-3.5 px-4 text-slate-300">46081</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Dynamic last day of February calculation</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2024, 2, 29)</td>
        <td className="py-3.5 px-4 text-white">Leap Year Leap Day</td>
        <td className="py-3.5 px-4 text-emerald-300">29-Feb-2024</td>
        <td className="py-3.5 px-4 text-slate-300">45351</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Leap year quadrennial anniversary checks</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2025, 2, 29)</td>
        <td className="py-3.5 px-4 text-white">Common Year Overflow</td>
        <td className="py-3.5 px-4 text-amber-300">01-Mar-2025</td>
        <td className="py-3.5 px-4 text-slate-300">45717</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Automatic boundary rollover on non-leap years</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=DATE(2026, 0, 15)</td>
        <td className="py-3.5 px-4 text-white">Month 0 (Rollback)</td>
        <td className="py-3.5 px-4 text-emerald-300">15-Dec-2025</td>
        <td className="py-3.5 px-4 text-slate-300">46006</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Backward fiscal calendar quarter modeling</td>
      </tr>
    `,
    deepDiveTitle: "Defensive Date Construction vs String Ambiguity",
    deepDiveSubtitle: "The catastrophic consequences of text date strings in multinational enterprise sheets.",
    deepDiveContent: `<p>In corporate environments where financial workbooks circulate globally between India, the United Kingdom, Singapore, and the United States, text-based date formatting is the #1 cause of silent financial miscalculations.</p><p>When an analyst writes <code className="text-white font-mono">="05/06/2026"</code>, Excel in London or Kolkata parses it as <strong>5th June 2026</strong>. When the exact same file is opened by an executive in New York, Excel parses it as <strong>May 6th 2026</strong>! By constructing dates using <code className="text-indigo-300 font-mono">=DATE(2026, 6, 5)</code>, the numeric serial (46178) is permanently fixed, rendering the formula 100% immune to regional corruption.</p>`,
    badPracticeTitle: "Brittle String Concatenation Pattern",
    badPracticeCode: `=A2 & "/" & B2 & "/" & C2`,
    badPracticeDesc: "Produces a text string that fails in mathematical operations, breaks sorting, and reverses month/day when shared internationally.",
    goodPracticeTitle: "Enterprise Deterministic DATE() Pattern",
    goodPracticeCode: `=DATE(C2, B2, A2)`,
    goodPracticeDesc: "Assembles integer year, month, and day into an inviolable numeric serial that formats seamlessly under all international Windows locales.",
    svgCaption: "Pipeline of discrete component integers transformed into the unified Excel numeric serial.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="30" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Year: 2026</text>

        <rect x="30" y="80" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="105" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Month: 11</text>

        <rect x="30" y="130" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="155" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Day: 12</text>

        <path d="M 195 50 L 320 100 M 195 100 L 320 100 M 195 150 L 320 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="320" y="45" width="240" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">=DATE(Y, M, D) Engine</text>
        <text x="440" y="105" textAnchor="middle" fill="#94A3B8" className="text-xs">Gregorian Leap Validation</text>
        <text x="440" y="125" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">Overflow / Underflow Roll</text>

        <path d="M 560 100 L 630 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="630" y="45" width="180" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Numeric Serial</text>
        <text x="720" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338</text>
        <text x="720" y="130" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">12-Nov-2026</text>
      </svg>
    `,
    simulatorCode: `
  const [inpYear, setInpYear] = useState(2026);
  const [inpMonth, setInpMonth] = useState(11);
  const [inpDay, setInpDay] = useState(12);

  const evaluatedDate = useMemo(() => {
    const y = parseInt(inpYear, 10);
    const m = parseInt(inpMonth, 10);
    const d = parseInt(inpDay, 10);

    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return { error: "#VALUE! Invalid integer parameter", isError: true };
    }
    if (y < 1 || y > 9999) {
      return { error: "#NUM! Year must be between 1 and 9999", isError: true };
    }

    // Exact JavaScript implementation matching Excel DATE(y, m, d) overflow logic
    // In JS Date, months are 0-indexed, so m - 1
    const dt = new Date(y, m - 1, d);

    // Format output
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const outStr = \`\${String(dt.getDate()).padStart(2, "0")}-\${monthNames[dt.getMonth()]}-\${dt.getFullYear()}\`;
    const isLeap = (dt.getFullYear() % 4 === 0 && dt.getFullYear() % 100 !== 0) || (dt.getFullYear() % 400 === 0);

    // Calculate approximate Excel serial
    const baseUtc = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const excelEpoch = Date.UTC(1899, 11, 30); // 1899-12-30 takes care of 1900 leap bug
    const serialNum = Math.round((baseUtc - excelEpoch) / 86400000);

    const hasRolled = dt.getFullYear() !== y || dt.getMonth() !== (m - 1) || dt.getDate() !== d;

    return {
      isError: false,
      dateString: outStr,
      serialNum,
      isLeap,
      hasRolled,
      dayOfWeek: dt.toLocaleDateString("en-US", { weekday: "long" })
    };
  }, [inpYear, inpMonth, inpDay]);

  const applyPreset = (preset) => {
    if (preset === "tax_close") {
      setInpYear(2027);
      setInpMonth(3);
      setInpDay(31);
    } else if (preset === "leap_valid") {
      setInpYear(2024);
      setInpMonth(2);
      setInpDay(29);
    } else if (preset === "month_overflow") {
      setInpYear(2026);
      setInpMonth(14);
      setInpDay(1);
    } else if (preset === "day_zero") {
      setInpYear(2026);
      setInpMonth(3);
      setInpDay(0);
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive DATE(Year, Month, Day) Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Experiment with discrete year, month, and day inputs. Observe automatic overflow handling and serial conversions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("tax_close")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            FY Tax End (31-Mar)
          </button>
          <button
            onClick={() => applyPreset("leap_valid")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Leap Day (29-Feb)
          </button>
          <button
            onClick={() => applyPreset("month_overflow")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Month Overflow (+14)
          </button>
          <button
            onClick={() => applyPreset("day_zero")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Day Zero Rollover
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Year (1-9999)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpYear}
            onChange={(e) => setInpYear(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Month (Can Overflow)</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpMonth}
            onChange={(e) => setInpMonth(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Day (Can Overflow)</span>
            <span className="text-[10px] text-emerald-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpDay}
            onChange={(e) => setInpDay(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DATE({inpYear}, {inpMonth}, {inpDay})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Result:</span>
            <span
              className={\`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl \${
                evaluatedDate.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }\`}
            >
              {evaluatedDate.isError ? evaluatedDate.error : evaluatedDate.dateString}
            </span>
          </div>
        </div>

        {!evaluatedDate.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Numeric Serial:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {evaluatedDate.serialNum.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day of Week:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {evaluatedDate.dayOfWeek}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Rollover Detected:</span>
              <span
                className={\`font-bold inline-flex items-center gap-1.5 \${
                  evaluatedDate.hasRolled ? "text-amber-400" : "text-slate-300"
                }\`}
              >
                {evaluatedDate.hasRolled ? "⚠️ Yes (Input Rolled Over)" : "✓ Direct Mapping"}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Corporate Taxation & Statutory Audit",
        location: "Kolkata IT & Auditing Hub",
        title: "Dynamic Indian Fiscal Year Closing Date Generator",
        context: "Indian corporate financial years run from April 1 to March 31. For any arbitrary transaction date in cell A2, generate the exact statutory audit cut-off date.",
        comment: "If month is April (4) or later, fiscal year closes March 31 of next calendar year",
        formula: `=DATE(YEAR(A2) + IF(MONTH(A2) >= 4, 1, 0), 3, 31)`,
        sampleOutput: `31-Mar-2027 (for transaction dated 15-Nov-2026)`
      },
      {
        category: "Human Resources & Payroll",
        location: "Titagarh Industrial Zone",
        title: "Projected Birthday Anniversary This Calendar Year",
        context: "HR requires sending automatic birthday greetings and milestone awards. Given an employee's Date of Birth in cell B2, calculate their anniversary date in the current calendar year.",
        comment: "Extract birth month and day, inject into current calendar year",
        formula: `=DATE(YEAR(TODAY()), MONTH(B2), DAY(B2))`,
        sampleOutput: `24-Aug-2026 (for an employee born on 24-Aug-1992)`
      },
      {
        category: "Banking & Loan Amortization",
        location: "Shyamnagar Banking Operations",
        title: "Quarterly Fixed Deposit Interest Payout Milestone",
        context: "A commercial fixed deposit begins on deposit date in C2. Generate the exact milestone date for the end of the 2nd quarter without requiring Analysis ToolPak add-ins.",
        comment: "Add 6 full months to month component; DATE handles year rollover seamlessly",
        formula: `=DATE(YEAR(C2), MONTH(C2) + 6, DAY(C2))`,
        sampleOutput: `15-Oct-2027 (from initial deposit on 15-Apr-2027)`
      },
      {
        category: "Manufacturing ERP & Supply Chain",
        location: "Ichapur Ordnance & Heavy Engineering",
        title: "Bill of Materials Batch Expiry Date Engineering",
        context: "Raw chemical reagents expire exactly on the final calendar day of the 18th month following production date in cell D2.",
        comment: "Use month offset + 19 with day 0 to find the last day of month 18",
        formula: `=DATE(YEAR(D2), MONTH(D2) + 19, 0)`,
        sampleOutput: `31-Dec-2027 (for production batch manufactured in May 2026)`
      },
      {
        category: "Retail Inventory & Supply Chain",
        location: "Naihati Central Logistics Hub",
        title: "Dynamic Beginning-of-Month Consolidation Date",
        context: "Consolidate daily transactional ledger records into monthly summary buckets starting on the 1st of the month for invoice timestamp in E2.",
        comment: "Force day parameter to 1 for uniform monthly grouping",
        formula: `=DATE(YEAR(E2), MONTH(E2), 1)`,
        sampleOutput: `01-Nov-2026 (for invoice dated 18-Nov-2026)`
      },
      {
        category: "Government Treasury & Bond Market",
        location: "Barrackpore Municipal Treasury",
        title: "Semi-Annual Coupon Payment Anchor",
        context: "Municipal infrastructure bonds pay semi-annual coupons on June 30 and December 31. Return the upcoming coupon payment date based on settlement date in F2.",
        comment: "Check whether settlement date is in the first half or second half of the year",
        formula: `=IF(MONTH(F2) <= 6, DATE(YEAR(F2), 6, 30), DATE(YEAR(F2), 12, 31))`,
        sampleOutput: `31-Dec-2026 (for bond settled on 14-Aug-2026)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Extract Component Integers",
        description: "Deconstruct source date or discrete year/month/day columns from upstream legacy systems.",
        code: "Year: =YEAR(A2), Month: =MONTH(A2), Day: =DAY(A2)"
      },
      {
        title: "Step 2: Apply Mathematical Offsets",
        description: "Add or subtract integer intervals directly inside the parameter slots. Do not worry about month overflow.",
        code: "=DATE(YEAR(A2), MONTH(A2) + 6, DAY(A2))"
      },
      {
        title: "Step 3: Leverage Day Zero for Prior Month Clamping",
        description: "Passing 0 to the day argument tells Excel to roll back exactly 1 day from the 1st of the month, landing on the last day of the previous month.",
        code: "=DATE(2026, 3, 0) -> Returns 28-Feb-2026"
      },
      {
        title: "Step 4: Format as Locale-Agnostic Display",
        description: "Once constructed, format the cell using custom number format 'YYYY-MM-DD' or 'DD-MMM-YYYY' to prevent visual ambiguity.",
        code: "Format Cells > Custom > 'yyyy-mm-dd'"
      }
    ],
    troubleshootingRows: [
      {
        code: "#NUM! Error",
        cause: "Year parameter is less than 0 or greater than 9999, which exceeds Excel's Gregorian calculation boundary.",
        trigger: "=DATE(-5, 1, 1) or =DATE(10000, 1, 1)",
        remedy: "Validate year input with IF(AND(Y>=1, Y<=9999), DATE(Y,M,D), 'Invalid Year')."
      },
      {
        code: "#VALUE! Error",
        cause: "One of the arguments contains text or non-numeric characters that cannot be coerced to an integer.",
        trigger: "=DATE('2026', 'Nov', 12)",
        remedy: "Ensure month is passed as an integer (11 for November) or use DATEVALUE for text dates."
      },
      {
        code: "Two-Digit Year 1926 vs 2026 Confusion",
        cause: "Excel maps years 00 to 29 to 2000-2029, and years 30 to 99 to 1930-1999.",
        trigger: "=DATE(26, 1, 1) -> 2026, but =DATE(35, 1, 1) -> 1935!",
        remedy: "Always supply explicit 4-digit years in formula constructions."
      }
    ],
    proTips: [
      {
        title: "The EOMONTH Alternative Trick",
        text: "Need the last day of the current month without loading add-ins? Use =DATE(YEAR(A1), MONTH(A1)+1, 0). It is 100% equivalent to =EOMONTH(A1, 0).",
        color: "text-indigo-400"
      },
      {
        title: "Handling February 29 Anniversaries",
        text: "For employees born on Feb 29, =DATE(2025, 2, 29) evaluates to March 1 on common years. This is the legal convention in most commonwealth jurisdictions.",
        color: "text-emerald-400"
      },
      {
        title: "Dynamic Quarter Constructor",
        text: "Construct the first day of the current calendar quarter using: =DATE(YEAR(A1), INT((MONTH(A1)-1)/3)*3 + 1, 1).",
        color: "text-sky-400"
      },
      {
        title: "Avoid String Concatenation",
        text: "Never assemble dates using =A1&'/'&B1&'/'&C1. This produces brittle text strings that fail in sorting and pivot tables.",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "Calendar Architecture",
        question: "Why does passing Month = 0 in =DATE(2026, 0, 15) return December 15, 2025 instead of throwing a parameter error?"
      },
      {
        prompt: "Regulatory Compliance",
        question: "Why is =DATE(YEAR(A2), MONTH(A2), DAY(A2)) preferred by financial auditors over raw date literals when building automated financial models?"
      }
    ],
    mentorAdvice: "The DATE function is your shield against global date corruption. In my 20+ years training enterprise accountants and systems engineers, 80% of date errors stem from text concatenation. Memorize the Day 0 trick (=DATE(Y, M+1, 0)) for month-ends, and always pass four-digit years."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 2: DATEVALUE()
  // ---------------------------------------------------------------------------
  {
    idx: 2,
    name: "DATEVALUE",
    h1Title: "DATEVALUE Function — Enterprise Text-to-Date Sanitization",
    badgeLevel: "Data Cleansing · ETL Sanitizer",
    bloomTaxonomy: "Analyze & Cleanse",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">DATEVALUE(date_text)</code> function is the frontline sanitation engine for ETL (Extract, Transform, Load) pipelines in Excel. It interrogates raw text strings representing calendar dates, strips out formatting anomalies, and converts them into authentic numeric Excel date serials.</p><p>When enterprise data is exported from external ERPs (SAP, Oracle NetSuite, Tally Prime) or scraped from web portals, dates frequently arrive as dead text strings. These pseudo-dates look valid to the human eye, but fail catastrophically inside PivotTables, timeline slicers, and mathematical formulas. <code className="text-indigo-300 font-mono">DATEVALUE()</code> bridges this gap, while simultaneously stripping away any attached timestamps.</p>`,
    syntaxSummary: "=DATEVALUE(date_text)",
    domainSummary: "ETL Pipelines, ERP Data Migration & Web Scraping",
    patternSummary: "=DATEVALUE(LEFT(A2, 10)) (ISO String Sanitization)",
    engineType: "Text-to-Serial Translation Engine",
    canonicalSignature: `=DATEVALUE(date_text)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">date_text:</strong> Required. A text string that represents a date in a format recognized by your operating system's Short Date regional settings, or a cell reference containing text. Must represent a date between January 1, 1900 and December 31, 9999.</div><div>• <strong className="text-sky-300">Attached Time Behavior:</strong> Any timestamp attached to the text string (e.g. "2026-11-12 18:30:00") is automatically discarded. DATEVALUE returns purely the integer date serial.</div><div>• <strong className="text-amber-300">Error Trigger:</strong> Returns <code className="font-mono text-rose-400">#VALUE!</code> if the text string cannot be coerced into a valid date under the active Windows regional settings.</div>`,
    matrixTitle: "DATEVALUE Input Text Parsing Matrix",
    matrixSubtitle: "Observe how DATEVALUE parses various text date structures across standard enterprise exports.",
    matrixHeaders: ["Input Text String", "Format Type", "DATEVALUE Serial", "Evaluated Date", "Sanitization Strategy"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2026-11-12"</td>
        <td className="py-3.5 px-4 text-white">ISO 8601 Standard</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Direct parse; standard SQL export format</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"12-Nov-2026"</td>
        <td className="py-3.5 px-4 text-white">Alpha Month String</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Locale-safe; alpha month eliminates MM/DD confusion</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2026.11.12"</td>
        <td className="py-3.5 px-4 text-white">German / Dot Delimited</td>
        <td className="py-3.5 px-4 text-amber-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Requires SUBSTITUTE(A2, ".", "-") before DATEVALUE</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"2026-11-12T18:45:00Z"</td>
        <td className="py-3.5 px-4 text-white">Full ISO UTC String</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Requires LEFT(A2, 10) to isolate date before parsing</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-rose-400 font-bold">" 2026-11-12 "</td>
        <td className="py-3.5 px-4 text-white">Dirty Web Scraped Text</td>
        <td className="py-3.5 px-4 text-emerald-300">46338</td>
        <td className="py-3.5 px-4 text-slate-300">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Wrap with TRIM() and SUBSTITUTE(..., CHAR(160), " ")</td>
      </tr>
    `,
    deepDiveTitle: "The Invisible Saboteur: Non-Breaking Spaces (CHAR 160)",
    deepDiveSubtitle: "Why standard TRIM() fails on web exports and how to clean SAP/Oracle reports bulletproof.",
    deepDiveContent: `<p>A ubiquitous trap in enterprise data migration occurs when data exported from web portals or SAP systems includes the HTML entity <code className="text-amber-300 font-mono">&amp;nbsp;</code> (Unicode character 160, ASCII 160).</p><p>To the human eye, <code className="text-white font-mono">"2026-11-12 "</code> looks like a normal space. However, Excel's native <code className="text-white font-mono">TRIM()</code> function <strong>only removes ASCII space 32</strong>! It completely ignores character 160, leaving behind invisible debris that causes <code className="text-rose-400 font-mono">DATEVALUE()</code> to throw a fatal <code className="text-rose-400 font-mono">#VALUE!</code> error.</p>`,
    badPracticeTitle: "The Incomplete Sanitization Trap",
    badPracticeCode: `=DATEVALUE(TRIM(A2))`,
    badPracticeDesc: "Fails on web scraped or ERP data containing non-breaking spaces (CHAR 160), returning #VALUE! errors.",
    goodPracticeTitle: "Production Deep-Cleanse Formula",
    goodPracticeCode: `=DATEVALUE(TRIM(SUBSTITUTE(A2, CHAR(160), " ")))`,
    goodPracticeDesc: "Transmutes all non-breaking spaces into standard spaces before trimming and passing to DATEVALUE.",
    svgCaption: "The multi-stage sanitization pipeline from dirty ERP text to clean Excel numeric serial.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="200" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="130" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Dirty Text String</text>
        <text x="130" y="105" textAnchor="middle" fill="#F43F5E" className="text-xs font-mono">" 2026-11-12T14:30 "</text>
        <text x="130" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Contains CHAR(160) + Time</text>

        <path d="M 230 100 L 290 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="290" y="45" width="240" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="410" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">Sanitization Filters</text>
        <text x="410" y="102" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">1. LEFT(A2, 10)</text>
        <text x="410" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">2. SUBSTITUTE(CHAR 160)</text>

        <path d="M 530 100 L 590 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="590" y="45" width="220" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="700" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">DATEVALUE() Serial</text>
        <text x="700" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338</text>
        <text x="700" y="128" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">Valid Numeric Date</text>
      </svg>
    `,
    simulatorCode: `
  const [inputText, setInputText] = useState("2026-11-12T14:30:00Z");
  const [stripSpaces, setStripSpaces] = useState(true);

  const parsedResult = useMemo(() => {
    let cleanText = inputText;
    if (stripSpaces) {
      // Clean non-breaking and standard spaces
      cleanText = cleanText.replace(/\\u00a0/g, " ").trim();
    }

    // Try parsing date
    // Check if ISO format with time
    if (cleanText.includes("T")) {
      cleanText = cleanText.split("T")[0];
    } else if (cleanText.includes(" ")) {
      cleanText = cleanText.split(" ")[0];
    }

    // Replace dots with hyphens
    cleanText = cleanText.replace(/\\./g, "-").replace(/\\//g, "-");

    const parts = cleanText.split("-");
    let y, m, d;

    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // YYYY-MM-DD
        y = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
        d = parseInt(parts[2], 10);
      } else if (parts[2].length === 4) {
        // DD-MM-YYYY or MM-DD-YYYY
        d = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
        y = parseInt(parts[2], 10);
      }
    }

    if (!y || isNaN(y) || !m || isNaN(m) || !d || isNaN(d)) {
      return {
        isError: true,
        error: "#VALUE! Unable to parse text into valid date serial",
        raw: inputText
      };
    }

    const dt = new Date(y, m - 1, d);
    if (isNaN(dt.getTime())) {
      return { isError: true, error: "#VALUE! Invalid date range", raw: inputText };
    }

    const baseUtc = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const excelEpoch = Date.UTC(1899, 11, 30);
    const serial = Math.round((baseUtc - excelEpoch) / 86400000);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = \`\${String(dt.getDate()).padStart(2, "0")}-\${monthNames[dt.getMonth()]}-\${dt.getFullYear()}\`;

    return {
      isError: false,
      serial,
      formattedDate,
      isolatedText: cleanText,
      isNumeric: true
    };
  }, [inputText, stripSpaces]);

  const applyPreset = (preset) => {
    if (preset === "iso_timestamp") {
      setInputText("2026-11-12T18:45:00Z");
    } else if (preset === "german_dot") {
      setInputText("12.11.2026");
    } else if (preset === "dirty_space") {
      setInputText("   2026-11-12   ");
    } else if (preset === "invalid_string") {
      setInputText("CONFIRMED_ON_NOVEMBER");
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Live DATEVALUE Text Sanitization Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test how raw ERP text strings, ISO timestamps, and dirty web scrapes are converted into clean numeric serials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("iso_timestamp")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            ISO Timestamp (API)
          </button>
          <button
            onClick={() => applyPreset("german_dot")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            European Dot Date
          </button>
          <button
            onClick={() => applyPreset("dirty_space")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Dirty Padded Text
          </button>
          <button
            onClick={() => applyPreset("invalid_string")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Malformed String
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Raw Text Input (Cell A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Unsanitized String</span>
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Sanitization Pre-Processor Filters
          </label>
          <label className="flex items-center gap-2 cursor-pointer mt-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={stripSpaces}
              onChange={(e) => setStripSpaces(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Strip Non-Breaking Spaces (CHAR 160) & Auto-Split Timestamp</span>
          </label>
          <span className="text-[10px] text-slate-500 mt-1">Simulates: =DATEVALUE(LEFT(TRIM(A2), 10))</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =DATEVALUE("{inputText}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Result:</span>
            <span
              className={\`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl \${
                parsedResult.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }\`}
            >
              {parsedResult.isError ? parsedResult.error : parsedResult.serial}
            </span>
          </div>
        </div>

        {!parsedResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Evaluated Calendar Date:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                {parsedResult.formattedDate}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Numeric Verification:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                =ISNUMBER() ➔ TRUE
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Isolated Date String:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                "{parsedResult.isolatedText}"
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "ERP Data Integration",
        location: "Kolkata IT Corridor",
        title: "SAP S/4HANA ISO Timestamp Cleanse",
        context: "Raw database exports deliver order creation timestamps in ISO format ('2026-11-12T08:30:00Z') in column A. Convert them into authentic Excel dates for weekly sales trend charts.",
        comment: "Isolate the first 10 characters and parse with DATEVALUE",
        formula: `=DATEVALUE(LEFT(A2, 10))`,
        sampleOutput: `46338 (Formats to 12-Nov-2026)`
      },
      {
        category: "Web Scraping & Competitor Intelligence",
        location: "Barrackpore E-Commerce Logistics",
        title: "Sanitizing Web Scraped Dot-Separated Dates",
        context: "Scraped competitor shipping logs contain dot-delimited dates like '15.11.2026' with trailing non-breaking spaces. Convert them into computable date serials.",
        comment: "Substitute dots with hyphens and strip non-breaking spaces",
        formula: `=DATEVALUE(SUBSTITUTE(SUBSTITUTE(TRIM(A2), CHAR(160), ""), ".", "-"))`,
        sampleOutput: `46341 (15-Nov-2026)`
      },
      {
        category: "Banking Reconciliation",
        location: "Titagarh Co-Operative Bank",
        title: "Tally Prime Ledger Text Date Conversion",
        context: "Legacy Tally accounting export stores transaction dates as text in format '12-Nov-26'. Convert them into full 4-digit serial numbers for automated bank reconciliation.",
        comment: "Direct DATEVALUE parse handles 3-letter month abbreviations cleanly",
        formula: `=DATEVALUE(A2)`,
        sampleOutput: `46338 (12-Nov-2026)`
      },
      {
        category: "Tax Audit & Compliance",
        location: "Naihati GST Facilitation Centre",
        title: "Govt GST Portal JSON String Parsing",
        context: "GST portal GSTR-2B JSON payloads output invoice dates as plain text numbers '12112026' (DDMMYYYY). Reconstruct into standard format before DATEVALUE.",
        comment: "Slice day, month, year with MID and concatenate with hyphens",
        formula: `=DATEVALUE(LEFT(A2,2) & "-" & MID(A2,3,2) & "-" & RIGHT(A2,4))`,
        sampleOutput: `46338 (12-Nov-2026)`
      },
      {
        category: "Clinical Healthcare Systems",
        location: "Ichapur Health Research Labs",
        title: "Patient Intake Log Timestamp Discard",
        context: "Electronic Health Records (EHR) export patient triage check-ins as '12/11/2026 09:15:30 AM'. Extract purely the date component for daily census counting.",
        comment: "DATEVALUE strips the timestamp automatically from valid date strings",
        formula: `=DATEVALUE(A2)`,
        sampleOutput: `46338 (12-Nov-2026)`
      },
      {
        category: "Payroll & Provident Fund",
        location: "Shyamnagar Jute Mills Payroll",
        title: "EPFO Member Portal Date String Sanitization",
        context: "Provident Fund portal exports date of exit as '30-06-2026'. Ensure the cell is recognized as a number before running gratuity and pension formulas.",
        comment: "Wrap with IFERROR to guard against corrupted text entries",
        formula: `=IFERROR(DATEVALUE(A2), "INVALID DATE STRING")`,
        sampleOutput: `46199 (30-Jun-2026)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Test with ISNUMBER()",
        description: "Before applying DATEVALUE, verify whether the target cell is already a number. If =ISNUMBER(A2) returns TRUE, it is already a date; applying DATEVALUE may throw #VALUE!.",
        code: "=IF(ISNUMBER(A2), A2, DATEVALUE(A2))"
      },
      {
        title: "Step 2: Clean Non-Breaking Spaces",
        description: "Replace CHAR(160) entities and trim whitespace from the string.",
        code: "=SUBSTITUTE(TRIM(A2), CHAR(160), '')"
      },
      {
        title: "Step 3: Strip Attached Timestamp Strings",
        description: "If text contains timestamps ('2026-11-12T14:30:00'), isolate the date substring before parsing.",
        code: "=LEFT(A2, 10)"
      },
      {
        title: "Step 4: Execute DATEVALUE and Apply Number Format",
        description: "Feed clean text to DATEVALUE and format cell as Short Date.",
        code: "=DATEVALUE(LEFT(SUBSTITUTE(A2, CHAR(160), ''), 10))"
      }
    ],
    troubleshootingRows: [
      {
        code: "#VALUE! on Legitimate Date",
        cause: "The target cell already contains an authentic numeric serial. DATEVALUE expects text and rejects numbers.",
        trigger: "=DATEVALUE(46338) or =DATEVALUE(TODAY())",
        remedy: "Wrap with =IF(ISNUMBER(A2), A2, DATEVALUE(A2))."
      },
      {
        code: "#VALUE! from Regional Settings Mismatch",
        cause: "Text format '13/05/2026' opened on a US computer expecting MM/DD/YYYY throws #VALUE! because month 13 does not exist.",
        trigger: "=DATEVALUE('13/05/2026') on Windows US Locale",
        remedy: "Use DATE(RIGHT(A2,4), MID(A2,4,2), LEFT(A2,2)) instead of DATEVALUE."
      },
      {
        code: "#VALUE! Caused by Hidden Characters",
        cause: "Carriage returns (CHAR 10) or non-breaking spaces (CHAR 160) embedded in data.",
        trigger: "=DATEVALUE(A2) where cell has web copy-pasted text",
        remedy: "Apply CLEAN() and SUBSTITUTE(A2, CHAR(160), '') before DATEVALUE."
      }
    ],
    proTips: [
      {
        title: "The Double-Unary Math Trick",
        text: "Did you know that adding 0 or applying double unary (--A2) to a text date achieves the exact same result as DATEVALUE? E.g., =--LEFT(A2,10).",
        color: "text-indigo-400"
      },
      {
        title: "PivotTable Grouping Rescue",
        text: "If your PivotTable refuses to group by Years and Months, it means one or more records are text dates. Run DATEVALUE across the column to fix.",
        color: "text-emerald-400"
      },
      {
        title: "Text to Columns Utility",
        text: "Need to convert 100,000 text dates at once without formulas? Select column > Data tab > Text to Columns > Delimited > Next > Next > Select Date (YMD) > Finish.",
        color: "text-sky-400"
      },
      {
        title: "Safety with IFERROR",
        text: "Always wrap production ETL conversions in IFERROR: =IFERROR(DATEVALUE(A2), 'Flagged for Manual Review').",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "System Compatibility",
        question: "Why does the double-unary trick (=--A2) often convert text dates faster in large spreadsheets than the formal =DATEVALUE(A2) function?"
      },
      {
        prompt: "ETL Architecture",
        question: "If an upstream database changes its date output from YYYY-MM-DD to DD/MM/YYYY, how will DATEVALUE behave on workstations configured with US vs UK regional settings?"
      }
    ],
    mentorAdvice: "In data engineering, never trust raw text dates. Every analyst must know how to inspect data with =ISNUMBER(). If FALSE, sanitize non-breaking spaces immediately. Master the combination of TRIM, SUBSTITUTE(CHAR(160)), and DATEVALUE to ensure your downstream financial models never crash."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 3: TIME()
  // ---------------------------------------------------------------------------
  {
    idx: 3,
    name: "TIME",
    h1Title: "TIME Function — 24-Hour Decimal Assembly & Fractional Math",
    badgeLevel: "Core Constructor · Fractional Precision",
    bloomTaxonomy: "Analyze & Apply",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">TIME(hour, minute, second)</code> function is Excel's dedicated engine for constructing decimal time serials from discrete integer hour, minute, and second values.</p><p>In Excel's mathematical architecture, 1 complete day equals <code className="text-white font-mono">1.0</code>. Consequently, time is purely a fractional decimal between <code className="text-white font-mono">0.000000</code> (midnight 12:00:00 AM) and <code className="text-white font-mono">0.999988</code> (11:59:59 PM). The <code className="text-indigo-300 font-mono">TIME()</code> function automatically performs modulo-24 arithmetic: any hour exceeding 23 or minute/second exceeding 59 is seamlessly rolled forward, enabling elegant shift modeling and operational scheduling without manual clock wraps.</p>`,
    syntaxSummary: "=TIME(hour, minute, second)",
    domainSummary: "Shift Rosters, Manufacturing Punch Clocks & SLA Timers",
    patternSummary: "=TIME(8, 30, 0) (0.354167 Day Serial)",
    engineType: "Modulo-24 Decimal Synthesizer",
    canonicalSignature: `=TIME(hour, minute, second)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">hour:</strong> Required. A number from 0 (12:00 AM) to 32767 representing the hour. Values greater than 23 are divided by 24 and the remainder is treated as the hour value (modulo-24).</div><div>• <strong className="text-sky-300">minute:</strong> Required. A number from 0 to 32767 representing the minute. Values greater than 59 are converted to hours and minutes.</div><div>• <strong className="text-amber-300">second:</strong> Required. A number from 0 to 32767 representing the second. Values greater than 59 are converted to hours, minutes, and seconds.</div>`,
    matrixTitle: "TIME Function Fractional Value Matrix",
    matrixSubtitle: "Observe the exact decimal day fraction generated for key operational clock intervals.",
    matrixHeaders: ["Formula", "24-Hour Clock", "12-Hour AM/PM", "Excel Decimal Serial", "Industrial Utility"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(0, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">00:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">12:00:00 AM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.000000</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Midnight zero reset anchor</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(8, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">08:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">08:00:00 AM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.333333</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Morning factory shift commencement</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(12, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">12:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">12:00:00 PM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.500000</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Midday half-day mark</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">=TIME(16, 30, 0)</td>
        <td className="py-3.5 px-4 text-white">16:30:00</td>
        <td className="py-3.5 px-4 text-slate-300">04:30:00 PM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.687500</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">General shift departure bell</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-amber-400 font-bold">=TIME(25, 0, 0)</td>
        <td className="py-3.5 px-4 text-white">01:00:00</td>
        <td className="py-3.5 px-4 text-slate-300">01:00:00 AM</td>
        <td className="py-3.5 px-4 text-emerald-300">0.041667</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Modulo-24 wrap (25 - 24 = 1:00 AM)</td>
      </tr>
    `,
    deepDiveTitle: "The Modulo-24 Trap: Why TIME() Discards Completed Days",
    deepDiveSubtitle: "Understanding why =TIME(28, 0, 0) returns 4:00 AM (0.1667) rather than 1.1667 days.",
    deepDiveContent: `<p>A critical architectural nuance of Excel's <code className="text-indigo-300 font-mono">TIME()</code> function is that it is <strong>strictly bound to a single 24-hour cycle</strong>. If you pass an hour value greater than 23, Excel performs an internal modulo operation: <code className="text-white font-mono">Hour MOD 24</code>.</p><p>For example, if a shift lasts 28 hours, <code className="text-white font-mono">=TIME(28, 0, 0)</code> will return <code className="text-emerald-300 font-mono">0.166667</code> (which represents 4:00 AM), completely discarding the full 24-hour day! To calculate total elapsed duration exceeding 24 hours, perform direct decimal math: <code className="text-emerald-300 font-mono">=Hours / 24</code> rather than using <code className="text-indigo-300 font-mono">TIME()</code>.</p>`,
    badPracticeTitle: "The Multi-Day Overflow Blunder",
    badPracticeCode: `=TIME(ElapsedHours, ElapsedMinutes, 0)`,
    badPracticeDesc: "If ElapsedHours = 36, TIME() strips the 24 hours and evaluates to 12:00 PM (0.5), losing an entire day of billing!",
    goodPracticeTitle: "Production Elapsed Duration Formula",
    goodPracticeCode: `=(ElapsedHours / 24) + (ElapsedMinutes / 1440)`,
    goodPracticeDesc: "Preserves whole days as integer serials (1.5 days for 36 hours) and formats cleanly with [h]:mm.",
    svgCaption: "Hour, Minute, and Second integers transformed into decimal fractions of a single 24-hour day.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="30" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="55" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Hour: 14 (/24)</text>

        <rect x="30" y="80" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="105" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Minute: 30 (/1440)</text>

        <rect x="30" y="130" width="160" height="40" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="110" y="155" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono font-bold">Second: 00 (/86400)</text>

        <path d="M 195 50 L 320 100 M 195 100 L 320 100 M 195 150 L 320 100" stroke="#38BDF8" strokeWidth="2" />

        <rect x="320" y="45" width="240" height="110" rx="16" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="80" textAnchor="middle" fill="#38BDF8" className="text-sm font-bold">=TIME(H, M, S) Engine</text>
        <text x="440" y="102" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">(14/24) + (30/1440)</text>
        <text x="440" y="122" textAnchor="middle" fill="#6EE7B7" className="text-xs font-mono">Modulo 24 Math</text>

        <path d="M 560 100 L 630 100" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arr)" />

        <rect x="630" y="45" width="180" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Decimal Day Fraction</text>
        <text x="720" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">0.604167</text>
        <text x="720" y="128" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">02:30:00 PM</text>
      </svg>
    `,
    simulatorCode: `
  const [inpHour, setInpHour] = useState(8);
  const [inpMin, setInpMin] = useState(30);
  const [inpSec, setInpSec] = useState(0);

  const timeResult = useMemo(() => {
    const h = parseInt(inpHour, 10);
    const m = parseInt(inpMin, 10);
    const s = parseInt(inpSec, 10);

    if (isNaN(h) || isNaN(m) || isNaN(s)) {
      return { isError: true, error: "#VALUE! Invalid integer argument" };
    }

    // Excel modulo-24 algorithm
    const totalSeconds = (h * 3600) + (m * 60) + s;
    const daySeconds = 86400;
    const moduloSeconds = ((totalSeconds % daySeconds) + daySeconds) % daySeconds;
    const decimalFraction = moduloSeconds / daySeconds;

    const evaluatedHours = Math.floor(moduloSeconds / 3600);
    const evaluatedMinutes = Math.floor((moduloSeconds % 3600) / 60);
    const evaluatedSecs = moduloSeconds % 60;

    const ampm = evaluatedHours >= 12 ? "PM" : "AM";
    const displayHour12 = evaluatedHours % 12 === 0 ? 12 : evaluatedHours % 12;
    const formatted12 = \`\${String(displayHour12).padStart(2, "0")}:\${String(evaluatedMinutes).padStart(2, "0")}:\${String(evaluatedSecs).padStart(2, "0")} \${ampm}\`;
    const formatted24 = \`\${String(evaluatedHours).padStart(2, "0")}:\${String(evaluatedMinutes).padStart(2, "0")}:\${String(evaluatedSecs).padStart(2, "0")}\`;

    const hasWrappedDay = totalSeconds >= 86400;

    return {
      isError: false,
      decimalFraction: decimalFraction.toFixed(6),
      formatted12,
      formatted24,
      hasWrappedDay,
      totalSeconds
    };
  }, [inpHour, inpMin, inpSec]);

  const applyPreset = (preset) => {
    if (preset === "morning") {
      setInpHour(8);
      setInpMin(30);
      setInpSec(0);
    } else if (preset === "noon") {
      setInpHour(12);
      setInpMin(0);
      setInpSec(0);
    } else if (preset === "evening") {
      setInpHour(17);
      setInpMin(45);
      setInpSec(30);
    } else if (preset === "overflow") {
      setInpHour(26);
      setInpMin(90);
      setInpSec(0);
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive TIME(Hour, Minute, Second) Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Construct time serials, inspect decimal conversions, and observe Excel's modulo-24 boundary wrap live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("morning")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            Morning Shift (08:30)
          </button>
          <button
            onClick={() => applyPreset("noon")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Midday Noon (12:00)
          </button>
          <button
            onClick={() => applyPreset("evening")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Evening Shift (17:45:30)
          </button>
          <button
            onClick={() => applyPreset("overflow")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Wrap (26h 90m)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Hour (0-32767)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpHour}
            onChange={(e) => setInpHour(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Minute (0-32767)</span>
            <span className="text-[10px] text-sky-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpMin}
            onChange={(e) => setInpMin(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Second (0-32767)</span>
            <span className="text-[10px] text-emerald-400 font-mono">Integer</span>
          </label>
          <input
            type="number"
            value={inpSec}
            onChange={(e) => setInpSec(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =TIME({inpHour}, {inpMin}, {inpSec})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Decimal Fraction:</span>
            <span
              className={\`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl \${
                timeResult.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }\`}
            >
              {timeResult.isError ? timeResult.error : timeResult.decimalFraction}
            </span>
          </div>
        </div>

        {!timeResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">12-Hour AM/PM:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {timeResult.formatted12}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">24-Hour Military:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {timeResult.formatted24}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Modulo-24 Day Rollover:</span>
              <span
                className={\`font-bold inline-flex items-center gap-1.5 \${
                  timeResult.hasWrappedDay ? "text-amber-400" : "text-slate-300"
                }\`}
              >
                {timeResult.hasWrappedDay ? "⚠️ Yes (>24 Hours Wrapped)" : "✓ Single Day Window"}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Industrial Shift Rosters",
        location: "Kankinara Paper Mills",
        title: "Standard Shift Work Schedule Synthesizer",
        context: "Roster software provides discrete punch-in hour in column B and minute in column C. Assemble into a standard time serial for automated overtime evaluation.",
        comment: "Synthesize hour and minute into decimal fraction serial",
        formula: `=TIME(B2, C2, 0)`,
        sampleOutput: `0.354167 (Displays as 08:30 AM)`
      },
      {
        category: "Call Center Operations",
        location: "Sector V BPO Complex, Salt Lake",
        title: "Agent Grace Period Late Arrival Detector",
        context: "Agents receive an 8-minute grace window past the 9:00 AM shift start before being marked late. Calculate whether punch-in time in D2 breached grace limit.",
        comment: "Construct 09:08:00 cutoff dynamically using TIME",
        formula: `=IF(MOD(D2, 1) > TIME(9, 8, 0), "LATE ARRIVAL", "ON TIME")`,
        sampleOutput: `"LATE ARRIVAL" (for check-in at 09:11 AM)`
      },
      {
        category: "Logistics & Fleet Transport",
        location: "Barrackpore Express Cargo",
        title: "Highway Toll Gate Night Tariff Applicator",
        context: "Commercial trucks crossing toll plazas between 22:00:00 (10:00 PM) and 05:00:00 (05:00 AM) are billed off-peak freight rates based on timestamp in E2.",
        comment: "Use OR with TIME boundaries to identify overnight window",
        formula: `=IF(OR(MOD(E2, 1) >= TIME(22, 0, 0), MOD(E2, 1) < TIME(5, 0, 0)), "NIGHT TARIFF", "DAY TARIFF")`,
        sampleOutput: `"NIGHT TARIFF" (for vehicle crossing at 23:45)`
      },
      {
        category: "Hospital Emergency Operations",
        location: "Naihati State General Hospital",
        title: "ICU Patient Hourly Vitals Reminder",
        context: "Nurses record vital signs at fixed 2-hour increments starting from patient admission timestamp in F2. Project next scheduled vitals check time.",
        comment: "Add 2 hours to time serial cleanly",
        formula: `=F2 + TIME(2, 0, 0)`,
        sampleOutput: `12-Nov-2026 16:30:00 (from 14:30:00 admission)`
      },
      {
        category: "Manufacturing Assembly Line",
        location: "Ichapur Gun & Shell Factory",
        title: "Batch Cycle Duration Increment Modeling",
        context: "An automated CNC lathe cycle requires exactly 45 minutes and 30 seconds per component. Add cycle time to batch start timestamp in G2.",
        comment: "Inject minutes and seconds into TIME constructor",
        formula: `=G2 + TIME(0, 45, 30)`,
        sampleOutput: `09:45:30 AM (from 09:00:00 AM start)`
      },
      {
        category: "Software DevOps & Cloud SLA",
        location: "Rajarhat IT Campus",
        title: "Automated Maintenance Downtime Window",
        context: "Cloud database backup starts at 02:00 AM every Sunday and is permitted a maximum duration of 1 hour and 15 minutes. Establish the hard recovery deadline.",
        comment: "Construct maintenance window ceiling",
        formula: `=DATE(YEAR(H2), MONTH(H2), DAY(H2)) + TIME(3, 15, 0)`,
        sampleOutput: `15-Nov-2026 03:15:00 AM`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Understand the 86,400-Second Day",
        description: "1 second in Excel equals 1 / 86400 = 0.000011574. 1 minute equals 1 / 1440 = 0.0006944. 1 hour equals 1 / 24 = 0.0416667.",
        code: "TIME(1, 0, 0) = 1/24 = 0.041667"
      },
      {
        title: "Step 2: Assemble Integer Elements",
        description: "Pass three integers to TIME(H, M, S). Negative numbers or decimals are automatically coerced or rolled.",
        code: "=TIME(14, 30, 0) -> Returns 0.604167"
      },
      {
        title: "Step 3: Combine with Calendar Dates",
        description: "To create a complete date-time timestamp, add the DATE() and TIME() formulas together.",
        code: "=DATE(2026, 11, 12) + TIME(14, 30, 0)"
      },
      {
        title: "Step 4: Format Cell Appropriately",
        description: "Format the cell with custom format 'hh:mm:ss AM/PM' for 12-hour or 'hh:mm:ss' for 24-hour military display.",
        code: "Format Cells > Time > Choose preferred display"
      }
    ],
    troubleshootingRows: [
      {
        code: "Lost Elapsed Days on > 24 Hours",
        cause: "Using TIME() to accumulate multi-day elapsed hours causes modulo-24 truncation.",
        trigger: "=TIME(36, 0, 0) returns 12:00:00 PM instead of 36 hours",
        remedy: "Use =(Hours/24) directly and apply custom format [h]:mm:ss."
      },
      {
        code: "#NUM! Error",
        cause: "Passing numbers greater than 32,767 or extremely large negative integers.",
        trigger: "=TIME(35000, 0, 0)",
        remedy: "Constrain hours to valid ranges or use standard decimal arithmetic."
      },
      {
        code: "#VALUE! Error",
        cause: "Passing text strings like '12' or 'PM' instead of numeric integers.",
        trigger: "=TIME(8, '30', 'AM')",
        remedy: "Ensure all three arguments are numeric integers."
      }
    ],
    proTips: [
      {
        title: "Night Shift Midnight Inversion",
        text: "When subtracting shift times that cross midnight (e.g. 10:00 PM to 06:00 AM), use: =MOD(EndTime - StartTime, 1). This eliminates negative time errors!",
        color: "text-indigo-400"
      },
      {
        title: "Custom Cumulative Hour Formatting",
        text: "To show cumulative hours past 24 (e.g. 48:00), apply custom number format [h]:mm:ss. The brackets prevent rollover to 0.",
        color: "text-emerald-400"
      },
      {
        title: "Direct Decimal Equivalents",
        text: "Adding 15 minutes is simply =A1 + (15/1440) or =A1 + TIME(0, 15, 0). Direct division is faster in 100k-row formulas.",
        color: "text-sky-400"
      },
      {
        title: "Rounding Time to Nearest 15 Mins",
        text: "Round clock punches to nearest 15-minute billing block using: =MROUND(A1, TIME(0, 15, 0)).",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "Mathematical Design",
        question: "Why did Microsoft design TIME() to perform modulo-24 arithmetic rather than returning multi-day integer serials?"
      },
      {
        prompt: "Precision Limits",
        question: "Due to IEEE 754 floating-point limitations, why does =TIME(0,1,0)*1440 sometimes yield 0.999999999999999 instead of exactly 1.0?"
      }
    ],
    mentorAdvice: "Time in Excel is just a fraction of a 24-hour day. Never forget: 1 hour is 1/24, 1 minute is 1/1440, and 1 second is 1/86400. For shifts crossing midnight, always use =MOD(End - Start, 1) — it is the single most useful trick in corporate payroll engineering."
  },

  // ---------------------------------------------------------------------------
  // TOPIC 4: TIMEVALUE()
  // ---------------------------------------------------------------------------
  {
    idx: 4,
    name: "TIMEVALUE",
    h1Title: "TIMEVALUE Function — ERP Text-to-Time Conversion & Normalization",
    badgeLevel: "Data Cleansing · Decimal Converter",
    bloomTaxonomy: "Analyze & Coerce",
    heroDescription: `<p>The <code className="text-indigo-300 font-mono font-bold">TIMEVALUE(time_text)</code> function is the specialized counterpart to DATEVALUE for temporal string sanitization. It reads text strings representing clock times and transforms them into standard Excel decimal fractions between <code className="text-white font-mono">0.0</code> and <code className="text-white font-mono">0.999988</code>.</p><p>In enterprise biometric systems, RFID turnstiles, and legacy punch clock software, timestamps frequently export as dead text strings such as <code className="text-white font-mono">"08:30:15 AM"</code> or <code className="text-white font-mono">"18:45"</code>. These strings cannot be summed, subtracted, or averaged directly. <code className="text-indigo-300 font-mono">TIMEVALUE()</code> converts these strings into genuine numeric day fractions while discarding any accompanying calendar date strings.</p>`,
    syntaxSummary: "=TIMEVALUE(time_text)",
    domainSummary: "Biometric Punch Clocks, Telephony CDRs & Shift Payroll",
    patternSummary: "=TIMEVALUE(RIGHT(A2, 8)) (Extract Decimal Time)",
    engineType: "Time String Coercion Engine",
    canonicalSignature: `=TIMEVALUE(time_text)`,
    parameterBreakdown: `<div>• <strong className="text-teal-300">time_text:</strong> Required. A text string that represents a time in any of the Microsoft Excel time formats, such as "6:45 PM" or "18:45:00". Cell references containing text dates and times are also valid.</div><div>• <strong className="text-sky-300">Date Information Stripping:</strong> Any date information included inside the time_text argument (e.g. "12-Nov-2026 6:45 PM") is completely ignored; only the fractional time component is evaluated.</div><div>• <strong className="text-amber-300">Error Trigger:</strong> Returns <code className="font-mono text-rose-400">#VALUE!</code> if the text string cannot be parsed as a valid clock time between 00:00:00 and 23:59:59.</div>`,
    matrixTitle: "TIMEVALUE String Parsing & Output Matrix",
    matrixSubtitle: "Observe how TIMEVALUE handles 12-hour, 24-hour military, and composite date-time text strings.",
    matrixHeaders: ["Input String", "Format Description", "Decimal Serial", "Parsed Time", "Industrial Application"],
    matrixRowsHtml: `
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"06:30 AM"</td>
        <td className="py-3.5 px-4 text-white">12-Hour Morning String</td>
        <td className="py-3.5 px-4 text-emerald-300">0.270833</td>
        <td className="py-3.5 px-4 text-slate-300">06:30:00 AM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Early shift factory attendance log</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"18:45:30"</td>
        <td className="py-3.5 px-4 text-white">24-Hour Military Format</td>
        <td className="py-3.5 px-4 text-emerald-300">0.781597</td>
        <td className="py-3.5 px-4 text-slate-300">06:45:30 PM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Server syslog & database event logging</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"12-Nov-2026 14:00"</td>
        <td className="py-3.5 px-4 text-white">Composite Date + Time</td>
        <td className="py-3.5 px-4 text-emerald-300">0.583333</td>
        <td className="py-3.5 px-4 text-slate-300">02:00:00 PM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Extracts time; strips date automatically</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">"23:59:59"</td>
        <td className="py-3.5 px-4 text-white">Day End Boundary</td>
        <td className="py-3.5 px-4 text-amber-300">0.999988</td>
        <td className="py-3.5 px-4 text-slate-300">11:59:59 PM</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">End of billing cycle cutoff</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-rose-400 font-bold">"24:30:00"</td>
        <td className="py-3.5 px-4 text-white">Invalid Clock String</td>
        <td className="py-3.5 px-4 text-rose-400">#VALUE!</td>
        <td className="py-3.5 px-4 text-slate-400">Error</td>
        <td className="py-3.5 px-4 text-slate-400 font-sans">Hour 24 is out of clock range (0-23)</td>
      </tr>
    `,
    deepDiveTitle: "Composite Date-Time Parsing: DATEVALUE vs TIMEVALUE",
    deepDiveSubtitle: "How to deconstruct and reconstruct composite timestamps with surgical precision.",
    deepDiveContent: `<p>When an enterprise ERP exports composite strings such as <code className="text-white font-mono">"2026-11-12 18:45:00"</code>, neither DATEVALUE nor TIMEVALUE alone provides the complete numeric timestamp.</p><p><code className="text-indigo-300 font-mono">DATEVALUE()</code> extracts <code className="text-emerald-300 font-mono">46338.0</code> (discarding the time), while <code className="text-sky-300 font-mono">TIMEVALUE()</code> extracts <code className="text-amber-300 font-mono">0.78125</code> (discarding the date). To reconstruct the full high-precision 64-bit timestamp, add both functions together: <code className="text-emerald-300 font-mono">=DATEVALUE(A2) + TIMEVALUE(A2)</code>.</p>`,
    badPracticeTitle: "Brittle Text Substring Slicing",
    badPracticeCode: `=VALUE(MID(A2, 12, 2))/24 + VALUE(MID(A2, 15, 2))/1440`,
    badPracticeDesc: "Hardcoded character positions break instantly when date formats switch between single-digit and double-digit months/days.",
    goodPracticeTitle: "Production Composite Reconstructor",
    goodPracticeCode: `=DATEVALUE(A2) + TIMEVALUE(A2)`,
    goodPracticeDesc: "Allows Excel's internal parser to intelligently separate the integer date and decimal time regardless of string spacing.",
    svgCaption: "Composite text timestamp bifurcated into integer date and fractional time before final summation.",
    svgMarkup: `
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="45" width="220" height="110" rx="16" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Composite Text String</text>
        <text x="140" y="105" textAnchor="middle" fill="#A5B4FC" className="text-xs font-mono">"2026-11-12 18:45:00"</text>
        <text x="140" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">Unformatted Database Export</text>

        <path d="M 250 80 L 330 65 M 250 120 L 330 135" stroke="#38BDF8" strokeWidth="2" />

        <rect x="330" y="30" width="220" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="55" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">=DATEVALUE(A2)</text>
        <text x="440" y="75" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Integer: 46338</text>

        <rect x="330" y="110" width="220" height="60" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
        <text x="440" y="135" textAnchor="middle" fill="#F59E0B" className="text-xs font-bold font-mono">=TIMEVALUE(A2)</text>
        <text x="440" y="155" textAnchor="middle" fill="#E2E8F0" className="text-xs font-mono">Decimal: 0.78125</text>

        <path d="M 550 65 L 630 85 M 550 135 L 630 115" stroke="#38BDF8" strokeWidth="2" />

        <rect x="630" y="45" width="180" height="110" rx="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="80" textAnchor="middle" fill="#FFFFFF" className="text-sm font-bold">Summed Serial</text>
        <text x="720" y="108" textAnchor="middle" fill="#6EE7B7" className="text-base font-black font-mono">46338.78125</text>
        <text x="720" y="128" textAnchor="middle" fill="#A7F3D0" className="text-xs font-mono">Complete Timestamp</text>
      </svg>
    `,
    simulatorCode: `
  const [inputTimeString, setInputTimeString] = useState("02:30:45 PM");

  const parsedTimeResult = useMemo(() => {
    const raw = inputTimeString.trim();
    if (!raw) return { isError: true, error: "Empty input string" };

    // Regex check for 12h or 24h format
    const match12 = raw.match(/^(\\d{1,2}):(\\d{2})(?::(\\d{2}))?\\s*(AM|PM)?$/i);
    if (!match12) {
      // Try checking if composite string
      const matchComp = raw.match(/\\b(\\d{1,2}):(\\d{2})(?::(\\d{2}))?\\s*(AM|PM)?\\b/i);
      if (!matchComp) {
        return { isError: true, error: "#VALUE! Text cannot be parsed as valid time format" };
      }
    }

    // Parse time components
    let hours = 0;
    let mins = 0;
    let secs = 0;

    const parts = raw.split(" ");
    let timePart = parts[0];
    let ampmPart = parts[1];

    if (parts.length > 2) {
      // Composite date time
      timePart = parts[1];
      ampmPart = parts[2];
    }

    const tBits = timePart.split(":");
    hours = parseInt(tBits[0], 10);
    mins = parseInt(tBits[1], 10);
    secs = tBits[2] ? parseInt(tBits[2], 10) : 0;

    if (isNaN(hours) || isNaN(mins) || isNaN(secs)) {
      return { isError: true, error: "#VALUE! Invalid numeric components" };
    }

    if (ampmPart) {
      const isPm = ampmPart.toUpperCase() === "PM";
      const isAm = ampmPart.toUpperCase() === "AM";
      if (isPm && hours < 12) hours += 12;
      if (isAm && hours === 12) hours = 0;
    }

    if (hours < 0 || hours > 23 || mins < 0 || mins > 59 || secs < 0 || secs > 59) {
      return { isError: true, error: "#VALUE! Hours (0-23), Mins (0-59), Secs (0-59) out of bounds" };
    }

    const totalSeconds = (hours * 3600) + (mins * 60) + secs;
    const decimal = totalSeconds / 86400;

    const formatted24 = \`\${String(hours).padStart(2, "0")}:\${String(mins).padStart(2, "0")}:\${String(secs).padStart(2, "0")}\`;

    return {
      isError: false,
      decimalSerial: decimal.toFixed(6),
      formatted24,
      totalSeconds,
      fractionDescription: \`\${totalSeconds} / 86,400 seconds of a day\`
    };
  }, [inputTimeString]);

  const applyPreset = (preset) => {
    if (preset === "afternoon_12h") {
      setInputTimeString("02:30:45 PM");
    } else if (preset === "military_24h") {
      setInputTimeString("18:45:00");
    } else if (preset === "composite") {
      setInputTimeString("2026-11-12 09:15:00 AM");
    } else if (preset === "invalid_clock") {
      setInputTimeString("25:10:00");
    }
  };
    `,
    simulatorUi: `
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-indigo-400">🧪</span> Interactive TIMEVALUE Text Converter Workbench
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Convert 12-hour AM/PM, 24-hour military, or composite strings into authentic decimal day fractions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("afternoon_12h")}
            className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/60 transition cursor-pointer"
          >
            12-Hour "02:30:45 PM"
          </button>
          <button
            onClick={() => applyPreset("military_24h")}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
          >
            Military "18:45:00"
          </button>
          <button
            onClick={() => applyPreset("composite")}
            className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition cursor-pointer"
          >
            Composite Date + Time
          </button>
          <button
            onClick={() => applyPreset("invalid_clock")}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 transition cursor-pointer"
          >
            Invalid "25:10:00"
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Time Text String (Cell A2)</span>
            <span className="text-[10px] text-indigo-400 font-mono">Uncoerced String</span>
          </label>
          <input
            type="text"
            value={inputTimeString}
            onChange={(e) => setInputTimeString(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center space-y-1 text-xs">
          <span className="text-slate-400">Mathematical Relationship:</span>
          <span className="text-indigo-300 font-mono font-bold">1 Day = 1.0 = 24 Hours = 86,400 Seconds</span>
          <span className="text-[11px] text-slate-500">TIMEVALUE returns purely the decimal portion (0.0 to 0.999988).</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-indigo-300">
            Formula Evaluated:{" "}
            <span className="text-white font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              =TIMEVALUE("{inputTimeString}")
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Decimal Fraction:</span>
            <span
              className={\`font-mono text-xl sm:text-2xl font-black px-4 py-1 rounded-xl \${
                parsedTimeResult.isError
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-700"
              }\`}
            >
              {parsedTimeResult.isError ? parsedTimeResult.error : parsedTimeResult.decimalSerial}
            </span>
          </div>
        </div>

        {!parsedTimeResult.isError && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Normalized 24-Hr Time:</span>
              <span className="text-emerald-300 font-semibold font-mono text-sm">
                {parsedTimeResult.formatted24}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Elapsed Seconds:</span>
              <span className="text-sky-300 font-semibold font-mono text-sm">
                {parsedTimeResult.totalSeconds.toLocaleString()} s
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Day Fraction Ratio:</span>
              <span className="text-amber-300 font-semibold font-mono text-sm">
                {parsedTimeResult.fractionDescription}
              </span>
            </div>
          </div>
        )}
      </div>
    `,
    scenarios: [
      {
        category: "Biometric Shift Attendance",
        location: "Kolkata IT Park Turnstiles",
        title: "RFID Badge Punch Text Normalization",
        context: "Biometric turnstiles log employee entry as text string '08:45:22' in column B. Convert into decimal time and evaluate whether the punch occurred before 09:00:00 AM.",
        comment: "Convert text string to decimal and compare against 9:00 AM cutoff",
        formula: `=IF(TIMEVALUE(B2) <= TIME(9, 0, 0), "ON-TIME BONUS", "STANDARD PAY")`,
        sampleOutput: `"ON-TIME BONUS" (for punch at 08:45:22)`
      },
      {
        category: "Telephony & BPO Contact Center",
        location: "Salt Lake Sector V Call Center",
        title: "Telecom CDR Call Start Time Normalization",
        context: "Call Detail Records (CDRs) log call initiation times as '14:22:10' text strings. Calculate total call volume arriving during the afternoon peak window (14:00 to 16:00).",
        comment: "Filter calls using TIMEVALUE between 14:00 and 16:00",
        formula: `=IF(AND(TIMEVALUE(C2) >= TIME(14,0,0), TIMEVALUE(C2) < TIME(16,0,0)), "PEAK HOUR", "OFF-PEAK")`,
        sampleOutput: `"PEAK HOUR" (for call at 14:22:10)`
      },
      {
        category: "Hospitality & Flight Operations",
        location: "Netaji Subhash Chandra Bose Airport",
        title: "Flight Departure Schedule Drift Analysis",
        context: "Airline flight schedule API exports scheduled departure as '18:30' (text in D2) and actual takeoff as '19:15' (text in E2). Calculate delay in minutes.",
        comment: "Subtract scheduled TIMEVALUE from actual TIMEVALUE and multiply by 1440",
        formula: `=(TIMEVALUE(E2) - TIMEVALUE(D2)) * 1440`,
        sampleOutput: `45 Minutes Delay`
      },
      {
        category: "Manufacturing Heavy Plant",
        location: "Titagarh Rail Systems",
        title: "Night Shift Punch Clock Midnight Bridge",
        context: "Night welding shift workers punch in at '22:15' (A2) and punch out at '06:30' (B2) on the following day. Calculate total shift hours worked without error.",
        comment: "Combine TIMEVALUE with MOD 1 to bridge midnight boundary",
        formula: `=MOD(TIMEVALUE(B2) - TIMEVALUE(A2), 1) * 24`,
        sampleOutput: `8.25 Hours Worked`
      },
      {
        category: "E-Commerce Dispatch Hub",
        location: "Dankuni Warehouse",
        title: "Courier Express Pickup Cutoff Enforcement",
        context: "Parcels packed before courier cutoff string '17:00:00' in cell F2 qualify for same-day dispatch. Evaluate pack timestamp string in G2.",
        comment: "Compare parcel packaging TIMEVALUE against cutoff",
        formula: `=IF(TIMEVALUE(G2) <= TIMEVALUE(F2), "SAME-DAY AIR", "NEXT-DAY SURFACE")`,
        sampleOutput: `"SAME-DAY AIR" (for order packed at 16:20)`
      },
      {
        category: "Cloud Security & Audit Logs",
        location: "Barrackpore Cyber Command",
        title: "Firewall Intrusion Time Window Classification",
        context: "AWS CloudTrail security alerts log intrusion attempts as text strings '03:15:20 AM'. Classify whether the event occurred during the dead-of-night high-risk window.",
        comment: "Evaluate whether intrusion timestamp falls between 01:00 AM and 05:00 AM",
        formula: `=IF(AND(TIMEVALUE(H2) >= TIME(1,0,0), TIMEVALUE(H2) <= TIME(5,0,0)), "HIGH RISK NOCTURNAL", "STANDARD")`,
        sampleOutput: `"HIGH RISK NOCTURNAL" (for event at 03:15:20 AM)`
      }
    ],
    walkthroughSteps: [
      {
        title: "Step 1: Inspect Text Format",
        description: "Ensure the text string uses recognizable delimiters (: or .) and optionally valid AM/PM indicators.",
        code: "Target: '14:30:00' or '02:30 PM'"
      },
      {
        title: "Step 2: Clean Non-Standard Characters",
        description: "Strip leading/trailing whitespace and non-breaking spaces with TRIM and SUBSTITUTE.",
        code: "=SUBSTITUTE(TRIM(A2), CHAR(160), '')"
      },
      {
        title: "Step 3: Execute TIMEVALUE",
        description: "Pass sanitized text into TIMEVALUE to obtain the 64-bit decimal day fraction.",
        code: "=TIMEVALUE(A2) -> Yields 0.604167"
      },
      {
        title: "Step 4: Scale into Desired Operational Metric",
        description: "Multiply by 24 for elapsed hours, or 1,440 for elapsed minutes.",
        code: "Hours: =TIMEVALUE(A2) * 24\nMinutes: =TIMEVALUE(A2) * 1440"
      }
    ],
    troubleshootingRows: [
      {
        code: "#VALUE! on 24:00:00",
        cause: "Excel's 24-hour clock only recognizes hours 0 through 23. Hour 24 is invalid syntax.",
        trigger: "=TIMEVALUE('24:00:00')",
        remedy: "Replace '24:00' with '00:00' or '23:59:59' before converting."
      },
      {
        code: "#VALUE! on Missing Colon Delimiters",
        cause: "Time text formatted as raw digits like '143000' rather than standard '14:30:00'.",
        trigger: "=TIMEVALUE('143000')",
        remedy: "Inject colons using: =TIME(LEFT(A2,2), MID(A2,3,2), RIGHT(A2,2))."
      },
      {
        code: "#VALUE! on Authentic Numeric Time",
        cause: "The target cell is already an authentic numeric decimal. TIMEVALUE expects text and rejects numbers.",
        trigger: "=TIMEVALUE(0.5) or =TIMEVALUE(NOW())",
        remedy: "Wrap with =IF(ISNUMBER(A2), MOD(A2,1), TIMEVALUE(A2))."
      }
    ],
    proTips: [
      {
        title: "The Double Unary Shortcut for Times",
        text: "Just like dates, applying double unary (--A2) to a valid time text string automatically converts it to its decimal serial without TIMEVALUE!",
        color: "text-indigo-400"
      },
      {
        title: "Composite Reassembly Trick",
        text: "Recombine separate date and time columns into a complete timestamp: =DATEVALUE(A2) + TIMEVALUE(B2).",
        color: "text-emerald-400"
      },
      {
        title: "Time Extraction from ISO Strings",
        text: "For strings like '2026-11-12T18:45:00', extract time instantly using: =TIMEVALUE(MID(A2, 12, 8)).",
        color: "text-sky-400"
      },
      {
        title: "Handling 12-Hour Midnight Ambiguity",
        text: "Remember that '12:00 AM' is 0.0 (midnight), while '12:00 PM' is 0.5 (noon). Always verify AM/PM tags on biometric exports.",
        color: "text-amber-400"
      }
    ],
    socraticQuestions: [
      {
        prompt: "System Architecture",
        question: "Why does TIMEVALUE discard any date part in composite strings like '2026-11-12 18:30', while DATEVALUE discards the time part?"
      },
      {
        prompt: "Performance Optimization",
        question: "In a 200,000-row telephony dataset, why is =--RIGHT(A2,8) significantly faster than =TIMEVALUE(RIGHT(A2,8))?"
      }
    ],
    mentorAdvice: "When dealing with punch clocks and biometric exports, TIMEVALUE is indispensable. Always remember that Excel treats time as a decimal fraction of 24 hours. If an export arrives without colons (e.g. 1430), don't force TIMEVALUE — use TIME(LEFT(A2,2), RIGHT(A2,2), 0) instead."
  }
];

// Generate files for Topics 0 to 4
for (const t of topics0to4) {
  const jsx = buildTopicJsx(t);
  const outPath = path.join(baseDir, `Topic${t.idx}.jsx`);
  fs.writeFileSync(outPath, jsx, 'utf8');
  console.log(`Generated Topic${t.idx}.jsx (${jsx.split('\n').length} lines)`);
}

