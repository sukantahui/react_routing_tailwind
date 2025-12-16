import React, { Component } from "react";
import {
  MessageSquareText,
  BookOpen,
  CheckCircle2,
  XCircle,
  History,
  AlertTriangle,
} from "lucide-react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            Writing Meaningful Commit Messages
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            A commit message is not a formality.  
            It is a <strong>permanent explanation of your decision</strong>.
          </p>
        </header>

        {/* ================= WHY IT MATTERS ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <BookOpen size={18} /> Why Commit Messages Matter
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Every commit becomes part of the <strong>project history</strong>.
            This history is read by:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Your future self</li>
            <li>Team members</li>
            <li>Code reviewers</li>
            <li>Sometimes even legal auditors</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            A bad commit message hides intent.  
            A good commit message explains <strong>why</strong>.
          </p>
        </section>

        {/* ================= STRUCTURE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <MessageSquareText size={18} /> Structure of a Good Commit Message
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Part</th>
                <th className="p-2 border">Guideline</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Subject line", "Short, clear, in present tense"],
                ["Length", "Ideally under 50 characters"],
                ["Meaning", "Describe what the commit does"],
                ["Tone", "Command style (Fix, Add, Update)"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-sky-300"
                >
                  <td className="p-2 border">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= GOOD vs BAD ================= */}
        <section className="space-y-6">

          {/* Bad */}
          <div className="bg-slate-900 border border-red-400 rounded-lg p-5">
            <h3 className="flex items-center gap-2 text-red-300 font-medium">
              <XCircle size={18} /> Bad Commit Messages
            </h3>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
              <li>update</li>
              <li>fixed bug</li>
              <li>changes done</li>
              <li>final code</li>
            </ul>

            <p className="text-slate-500 text-xs mt-2">
              These messages tell <strong>nothing useful</strong>.
            </p>
          </div>

          {/* Good */}
          <div className="bg-slate-900 border border-emerald-400 rounded-lg p-5">
            <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
              <CheckCircle2 size={18} /> Good Commit Messages
            </h3>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
              <li>Add user login validation</li>
              <li>Fix calculation error in invoice total</li>
              <li>Update README with installation steps</li>
              <li>Refactor loop logic for better performance</li>
            </ul>

            <p className="text-slate-500 text-xs mt-2">
              These explain <strong>what changed and why</strong>.
            </p>
          </div>

        </section>

        {/* ================= PRESENT TENSE RULE ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <History size={18} /> Use Present Tense (Important Rule)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Wrong</th>
                <th className="p-2 border">Correct</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Added validation", "Add validation"],
                ["Fixed bug", "Fix bug"],
                ["Updated file", "Update file"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-sky-300"
                >
                  <td className="p-2 border">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-slate-400 text-sm mt-2">
            Git treats the message as:  
            <em>“If applied, this commit will …”</em>
          </p>
        </section>

        {/* ================= COMMON WARNINGS ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Common Beginner Mistakes:</strong><br />
          • Writing commit messages after coding fatigue  
          • Mixing multiple unrelated changes in one commit  
          • Using emotional or casual language
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Your code may change, but your commit message stays forever.  
          Treat every commit message as a line in your professional diary.
        </section>

      </div>
    );
  }
}
