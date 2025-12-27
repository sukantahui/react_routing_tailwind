// src/components/study/css/responsive/Topic22.jsx
// Topic – Display Property of CSS (block, inline, inline-block, flex)

import React, { Component } from "react";
import DisplayPropertyTraining from "./DisplayPropertyTraining";
import {
  Layers,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  ClipboardCopy,
} from "lucide-react";


const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic24 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false, copied: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  copyCode(text) {
    navigator.clipboard.writeText(text);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1500);
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const code = `
.block { display:block; }
.inline { display:inline; }
.inlineBlock { display:inline-block; }
.flexRow { display:flex; gap:1rem; }
.flexCol { display:flex; flex-direction:column; }`;

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{animationStyles}</style>

        <DisplayPropertyTraining/>
        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Layers size={20} /> Display Property – How Elements Behave
          </h2>
          <p className="mt-2">
            Swadeep was confused why his buttons stacked vertically in Barrackpore lab,
            while Tuhina’s links flowed in one line in Naihati.
            The answer is one property: <b>display</b>.
          </p>
        </section>

        {/* COPY CODE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <div className="relative group mt-3">
            <button
              onClick={() => this.copyCode(code)}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-700 text-white rounded opacity-0 group-hover:opacity-100"
            >
              <ClipboardCopy size={12} /> {this.state.copied ? "Copied" : "Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm">
              {code}
            </pre>
          </div>
        </section>

        {/* BLOCK */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: block</h3>
          <p>Always starts on a new line & takes full width.</p>
          <svg viewBox="0 0 400 60" className="w-full mt-2">
            <rect x="10" y="10" width="380" height="20" rx="6" fill="#22c55e" />
            <rect x="10" y="40" width="380" height="20" rx="6" fill="#22c55e" />
          </svg>
        </section>

        {/* INLINE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: inline</h3>
          <p>Flows in text line, ignores width & height.</p>
          <svg viewBox="0 0 400 60" className="w-full mt-2">
            <rect x="10" y="20" width="60" height="20" rx="6" fill="#3b82f6" />
            <rect x="80" y="20" width="60" height="20" rx="6" fill="#3b82f6" />
            <rect x="150" y="20" width="60" height="20" rx="6" fill="#3b82f6" />
          </svg>
        </section>

        {/* INLINE BLOCK */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: inline-block</h3>
          <p>Flows inline but respects width & height.</p>
          <svg viewBox="0 0 400 80" className="w-full mt-2">
            <rect x="10" y="10" width="60" height="60" rx="6" fill="#f59e0b" />
            <rect x="90" y="10" width="100" height="60" rx="6" fill="#f59e0b" />
            <rect x="210" y="10" width="70" height="60" rx="6" fill="#f59e0b" />
          </svg>
        </section>

        {/* FLEX */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: flex</h3>
          <p>Powerful layout engine for rows, columns & alignment.</p>
          <svg viewBox="0 0 400 80" className="w-full mt-2">
            <rect x="10" y="20" width="80" height="40" rx="6" fill="#ec4899" />
            <rect x="110" y="20" width="80" height="40" rx="6" fill="#ec4899" />
            <rect x="210" y="20" width="80" height="40" rx="6" fill="#ec4899" />
          </svg>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <HelpCircle size={16} /> Hint
          </h3>
          <p>Try toggling span → block in DevTools and observe layout jumps.</p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-red-400 font-semibold">
            <AlertTriangle size={16} /> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6">
            <li>Using inline when width is required.</li>
            <li>Overusing float instead of flex.</li>
          </ul>
        </section>

        {/* FLEX – DEEP DIVE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold text-xl">
            display: flex — Real Power of CSS Layout
          </h3>

          <p className="mt-2">
            Flexbox is a <b>one-dimensional layout system</b>. It arranges elements in a
            row or column and gives you pixel-perfect alignment without hacks like float.
          </p>

          <p className="mt-2">
            When Abhronila built a student dashboard in Ichapur, she only wrote
            <code className="px-1 bg-slate-800 rounded ml-1">display:flex</code> and
            suddenly all cards aligned automatically.
          </p>

          {/* FLEX AXES SVG */}
          <svg viewBox="0 0 460 140" className="w-full mt-4">
            <rect x="20" y="50" width="100" height="40" rx="6" fill="#ec4899" />
            <rect x="150" y="50" width="100" height="40" rx="6" fill="#ec4899" />
            <rect x="280" y="50" width="100" height="40" rx="6" fill="#ec4899" />

            <line x1="20" y1="110" x2="380" y2="110" stroke="#0ea5e9" strokeWidth="2" />
            <text x="180" y="130" fill="#0ea5e9" fontSize="12">Main Axis</text>

            <line x1="10" y1="30" x2="10" y2="100" stroke="#22c55e" strokeWidth="2" />
            <text x="2" y="20" fill="#22c55e" fontSize="12">Cross</text>
          </svg>

          {/* FLEX ROW vs COLUMN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-slate-800 text-slate-200">
              <p className="text-sky-400 mb-1">Row (default)</p>
              <pre className="text-sm">
                {`.container { display:flex; }`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 text-slate-200">
              <p className="text-sky-400 mb-1">Column</p>
              <pre className="text-sm">
                {`.container {
  display:flex;
  flex-direction: column;
}`}
              </pre>
            </div>
          </div>

          {/* JUSTIFY vs ALIGN */}
          <div className="mt-6">
            <h4 className="font-semibold text-sky-400">
              justify-content vs align-items
            </h4>
            <p className="mt-1">
              Swadeep always mixed these two. Remember:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li><b>justify-content</b> → controls Main Axis spacing</li>
              <li><b>align-items</b> → controls Cross Axis alignment</li>
            </ul>
          </div>

          {/* FLEX WRAP */}
          <div className="mt-6">
            <h4 className="font-semibold text-sky-400">flex-wrap</h4>
            <p className="mt-1">
              When screens shrink in Shyamnagar mobiles, cards must wrap —
              not overflow.
            </p>
            <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg text-sm mt-2">
              {`.container {
  display:flex;
  flex-wrap: wrap;
}`}
            </pre>
          </div>

          {/* MINI CHECKLIST */}
          <div className="mt-6">
            <h4 className="font-semibold text-sky-400">Mini Checklist</h4>
            <ul className="list-disc ml-6 mt-2">
              <li>Use flex for navigation bars</li>
              <li>Use gap instead of margin hacks</li>
              <li>Always test flex-wrap on small screens</li>
            </ul>
          </div>
        </section>

        {/* FLEX – REAL WORLD SCENARIOS */}
<section className={`${card} ${reveal}`}>
  <h3 className="text-sky-500 font-semibold text-xl">
    Flexbox in Real-World Interfaces
  </h3>

  <p className="mt-2">
    Let us solve problems that students like Swadeep, Tuhina and Debangshu
    actually face while building school portals and dashboards.
  </p>

  {/* NAV BAR */}
  <div className="mt-5">
    <h4 className="font-semibold text-sky-400">1️⃣ Responsive Navigation Bar</h4>
    <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg text-sm mt-2">
{`.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`}
    </pre>
    <p className="mt-1">
      Used in top bars of admin panels in Barrackpore computer labs.
    </p>
  </div>

  {/* PROFILE CARD */}
  <div className="mt-6">
    <h4 className="font-semibold text-sky-400">2️⃣ Profile Card Layout</h4>
    <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg text-sm mt-2">
{`.card {
  display: flex;
  gap: 1rem;
  align-items: center;
}`}
    </pre>
    <p className="mt-1">
      Perfect for student profile lists in Ichapur schools.
    </p>
  </div>

  {/* DASHBOARD GRID */}
  <div className="mt-6">
    <h4 className="font-semibold text-sky-400">3️⃣ Auto-Wrapping Dashboard Cards</h4>
    <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg text-sm mt-2">
{`.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}`}
    </pre>
    <p className="mt-1">
      When Debangshu opens the portal on his mobile, cards automatically shift to next row.
    </p>
  </div>

  {/* COMMON MISTAKES */}
  <div className="mt-6">
    <h4 className="font-semibold text-red-400">🚫 Common Student Mistakes</h4>
    <ul className="list-disc ml-6 mt-2">
      <li>Forgetting <code>flex-wrap</code></li>
      <li>Using margin hacks instead of <code>gap</code></li>
      <li>Mixing up justify-content & align-items</li>
    </ul>
  </div>

  {/* PROFESSIONAL TIP */}
  <div className="mt-6">
    <h4 className="font-semibold text-emerald-400">💡 Professional Tip</h4>
    <p>
      Modern developers almost never use floats anymore.
      Flexbox is the default mental model for layouts.
    </p>
  </div>
</section>

{/* FLEX vs GRID */}
<section className={`${card} ${reveal}`}>
  <h3 className="text-sky-500 font-semibold text-xl">
    Flexbox vs Grid – Choosing the Right Tool
  </h3>

  <p className="mt-2">
    Swadeep once used Flexbox to build a full dashboard in Barrackpore and
    struggled badly. That layout actually needed Grid, not Flex.
  </p>

  <table className="w-full mt-4 text-sm border border-slate-700 rounded-lg overflow-hidden">
    <thead className="bg-slate-800 text-slate-200">
      <tr>
        <th className="p-2">Use Case</th>
        <th className="p-2">Flexbox</th>
        <th className="p-2">Grid</th>
      </tr>
    </thead>
    <tbody className="bg-slate-900/60">
      <tr><td className="p-2">Navigation Bar</td><td className="p-2">✔</td><td className="p-2">✘</td></tr>
      <tr><td className="p-2">Dashboard Layout</td><td className="p-2">✘</td><td className="p-2">✔</td></tr>
      <tr><td className="p-2">Card Alignment</td><td className="p-2">✔</td><td className="p-2">✘</td></tr>
    </tbody>
  </table>
</section>

{/* FLEX CENTERING */}
<section className={`${card} ${reveal}`}>
  <h3 className="text-sky-500 font-semibold text-xl">
    Perfect Centering – Once and For All
  </h3>

  <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm mt-3">
{`.centerBox {
  display:flex;
  justify-content:center;
  align-items:center;
}`}
  </pre>

  <p className="mt-2">
    Tuhina struggled for weeks with margin hacks in Naihati.
    One flex rule solved everything.
  </p>
</section>




{/* FLEX DEBUGGING */}
<section className={`${card} ${reveal}`}>
  <h3 className="text-red-400 font-semibold text-xl">
    Why is My Flexbox Not Working?
  </h3>

  <ul className="list-disc ml-6 mt-3">
    <li>Did you forget <code>display:flex</code> on the parent?</li>
    <li>Are you using <code>justify-content</code> on the child instead of parent?</li>
    <li>Is <code>flex-wrap</code> missing?</li>
    <li>Are children stuck with fixed widths?</li>
  </ul>
</section>



        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle size={16} /> Best Practices
          </h3>
          <ul className="list-disc ml-6">
            <li>Layouts → flex/grid</li>
            <li>Text → inline</li>
            <li>Cards → block / inline-block</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <Lightbulb size={16} /> Teacher’s Note
          </h3>
          <p>
            Let students break layouts intentionally.
            Display is not memorised — it is *felt*.
          </p>
        </section>
      </div>
    );
  }
}
