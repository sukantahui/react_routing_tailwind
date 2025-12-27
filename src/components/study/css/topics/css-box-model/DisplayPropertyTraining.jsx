import React from "react";

/*
  Topic: Mastering CSS Display Property
  Trainer: Sukanta Hui – Coder & AccoTax
*/

export default function DisplayPropertyTraining() {
  return (
    <section className="min-h-screen bg-slate-900 text-slate-200 p-10 font-sans space-y-14">

      <header>
        <h1 className="text-4xl font-bold text-sky-400 mb-2">
          🏋️ Mastering CSS Display Property
        </h1>
        <p className="text-slate-400 max-w-3xl">
          The <code className="text-pink-400">display</code> property controls how
          an element participates in layout. It decides whether the element
          behaves like a block, word, box, flexible container, grid, or
          disappears completely.
        </p>
      </header>

      <div className="mt-12 max-w-3xl">
        <h3 className="text-xl font-semibold text-sky-400 mb-4">
          📌 Default <code className="text-pink-400">display</code> values of common HTML elements
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-4 py-2 border-b border-slate-700">Element</th>
                <th className="px-4 py-2 border-b border-slate-700">Default display</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900">
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  &lt;div&gt;, &lt;p&gt;, &lt;section&gt;
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  block
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  &lt;span&gt;, &lt;a&gt;, &lt;strong&gt;
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  inline
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  &lt;img&gt;, &lt;input&gt;
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  inline-block
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  &lt;ul&gt;
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  block
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2">
                  &lt;li&gt;
                </td>
                <td className="px-4 py-2 text-pink-400">
                  list-item
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* BLOCK */}
      <div>
        <h2 className="sectionTitle">1️⃣ display: block</h2>
        <p className="desc">
          Block elements behave like solid bricks in construction. They always
          start on a new line and occupy the <b>full width of the parent</b>.
        </p>

        <div className="blockBox">Block One</div>
        <div className="blockBox">Block Two</div>

        <ul className="notes">
          <li>Always starts on a new line</li>
          <li>Width & height are respected</li>
          <li>Common block tags: div, p, section, header</li>
        </ul>
      </div>

      {/* INLINE */}
      <div>
        <h2 className="sectionTitle">2️⃣ display: inline</h2>
        <p className="desc">
          Inline elements behave like words in a paragraph. Width & height are
          ignored.
        </p>

        <span className="inlineBox">Inline One</span>
        <span className="inlineBox">Inline Two</span>
        <span className="inlineBox">Inline Three</span>

        <ul className="notes">
          <li>Stays in the same line</li>
          <li>Height & width are ignored</li>
          <li>Examples: span, a, strong, em</li>
        </ul>
      </div>

      {/* INLINE BLOCK */}
      <div>
        <h2 className="sectionTitle">3️⃣ display: inline-block</h2>
        <p className="desc">
          Inline-block is a hybrid: it flows inline but behaves like a block.
          This is perfect for buttons, cards and badges.
        </p>

        <div className="ibBox">HTML</div>
        <div className="ibBox">CSS</div>
        <div className="ibBox">JavaScript</div>

        <ul className="notes">
          <li>Appears in same line</li>
          <li>Width & height are allowed</li>
          <li>Most commonly used for UI components</li>
        </ul>
      </div>

      {/* FLEX */}
      <div>
        <h2 className="sectionTitle">4️⃣ display: flex</h2>
        <p className="desc">
          Flexbox is a one-dimensional layout system that aligns items in rows or
          columns automatically.
        </p>

        <div className="flexRow">
          <div className="flexItem">A</div>
          <div className="flexItem">B</div>
          <div className="flexItem">C</div>
        </div>

        <ul className="notes">
          <li>Parent becomes flex container</li>
          <li>Children auto-align</li>
          <li>Used in navbar, cards, dashboards</li>
        </ul>
      </div>

      {/* GRID */}
      <div>
        <h2 className="sectionTitle">5️⃣ display: grid</h2>
        <p className="desc">
          Grid is a 2-dimensional layout system – rows AND columns.
        </p>

        <div className="gridLayout">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div className="gridItem" key={n}>{n}</div>
          ))}
        </div>

        <ul className="notes">
          <li>Perfect for page layout</li>
          <li>Used in image gallery, dashboards, admin panels</li>
        </ul>
      </div>

      {/* NONE */}
      <div>
        <h2 className="sectionTitle">6️⃣ display: none</h2>
        <p className="desc">
          The element is completely removed from the layout.
        </p>

        <div className="hiddenBox">You should not see me</div>

        <ul className="notes">
          <li>Element is not rendered at all</li>
          <li>Used in modals, dropdowns, conditional UI</li>
        </ul>
      </div>

      <div className="mt-10 max-w-3xl">
        <h3 className="text-xl font-semibold text-sky-400 mb-4">
          🎯 When to use which <code className="text-pink-400">display</code> value
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-4 py-2 border-b border-slate-700">If you want…</th>
                <th className="px-4 py-2 border-b border-slate-700">Use</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900">
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  Stack elements vertically
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  display: block
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  Inline text only (like words)
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  display: inline
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  Button-like boxes in a row
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  display: inline-block
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  Navbar, cards, row / column layouts
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  display: flex
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2 border-b border-slate-800">
                  Full page, dashboard, gallery layout
                </td>
                <td className="px-4 py-2 border-b border-slate-800 text-pink-400">
                  display: grid
                </td>
              </tr>
              <tr className="hover:bg-slate-800 transition">
                <td className="px-4 py-2">
                  Hide element completely
                </td>
                <td className="px-4 py-2 text-pink-400">
                  display: none
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* Styles */}
      <style>{`
        .sectionTitle{font-size:1.5rem;color:#facc15}
        .desc{max-width:700px;margin-bottom:10px;color:#cbd5f5}
        .notes{margin-top:8px;color:#94a3b8}
        .notes li{margin-left:20px;list-style:disc}

        .blockBox{display:block;width:160px;height:60px;background:#38bdf8;margin:6px 0;text-align:center;line-height:60px;color:#000;font-weight:bold}
        .inlineBox{display:inline;background:#fb7185;padding:10px;margin:5px;color:#000;font-weight:bold}
        .ibBox{display:inline-block;width:140px;height:70px;background:#4ade80;margin:6px;line-height:70px;text-align:center;color:#000;font-weight:bold}
        .flexRow{display:flex;justify-content:space-between;background:#1e293b;padding:10px}
        .flexItem{width:70px;height:70px;background:#60a5fa;text-align:center;line-height:70px;font-weight:bold;color:#000}
        .gridLayout{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:#1e293b;padding:10px}
        .gridItem{height:60px;background:#a78bfa;text-align:center;line-height:60px;color:#000;font-weight:bold}
        .hiddenBox{display:none}
      `}</style>
    </section>
  );
}
