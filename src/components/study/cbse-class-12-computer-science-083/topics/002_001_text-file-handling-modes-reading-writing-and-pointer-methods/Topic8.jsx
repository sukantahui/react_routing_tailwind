import React from 'react';
import {
  ListChecks, Search, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, FileText, Check, X, Award
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/standard_board_text_algorithms_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 8
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Guaranteed 3-Mark Exam Topic
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Standard Board Problems: Counting Words, Lines, Characters, Vowels &amp; Specific Starting Letters
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact algorithmic blueprints tested in CBSE Class XII Section C (3 Marks). Learn robust techniques for tokenizing words, handling punctuation, guarding against empty lines, and character classification.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: The Top 4 Blueprints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <Search size={18} /> 1. Word Counting Algorithm
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read file content, split by whitespace using <code>f.read().split()</code>, strip trailing punctuation, and compare case-insensitively using <code>w.lower() == target</code>.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-sky-300">
              count = sum(1 for w in f.read().split() if w.lower() == 'the')
            </div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <ListChecks size={18} /> 2. Line Filter Algorithm
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stream lines using <code>for line in f:</code>, strip whitespace, guard against empty lines (<code>if line.strip():</code>), and check initial letter via <code>line[0].upper() in ['A', 'M']</code>.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-emerald-300">
              if line.strip() and line.strip()[0].upper() in 'AM':
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Character Classification */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> String Classification Methods (Cheat Sheet)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-sky-300">ch.isupper()</span>
              <p className="text-slate-400">Evaluates to True if <code>ch</code> is an uppercase ASCII or Unicode letter.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-sky-300">ch.islower()</span>
              <p className="text-slate-400">Evaluates to True if <code>ch</code> is a lowercase letter.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-amber-300">ch.isdigit()</span>
              <p className="text-slate-400">Evaluates to True if <code>ch</code> is a digit from '0' to '9'.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-emerald-300">ch.isalpha()</span>
              <p className="text-slate-400">Evaluates to True if <code>ch</code> is alphabetic (vowel or consonant).</p>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-sky-400" /> Standard Board Algorithms Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">standard_board_text_algorithms_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="standard_board_text_algorithms_lab.py"
            highlightLines={[18, 29, 39, 44]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Directly indexing <code>line[0]</code> without checking if the line is empty (causes <code>IndexError</code>).</li>
              <li>• Forgetting <code>.lower()</code> when testing vowels, missing uppercase 'A', 'E', 'I', 'O', 'U'.</li>
              <li>• Counting words with <code>line.count('the')</code> which matches substrings inside 'other', 'breathe', etc.!</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Always tokenize with <code>f.read().split()</code> to match whole words rather than substrings.</li>
              <li>• Strip trailing punctuation from words with <code>w.strip(',.?!:;')</code> before matching.</li>
              <li>• Use <code>line.strip()</code> to eliminate trailing newlines and whitespace before testing line starts.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Warning on Substring Matching
          </h4>
          <p>
            NEVER use <code>f.read().count("the")</code> when asked to count the word "the"! That method will incorrectly count "the" inside words like "mother", "father", "together", and "theme"! You must tokenize words using <code>f.read().split()</code> and check <code>if w.lower() == "the":</code>!
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 8 FAQs: Standard Board Algorithms"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 8 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic8_board_problems.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="To Mamata, Mahima, and Susmita: Question 28 or 29 in Section C is almost always one of these exact text file problems! Learn the difference between iterating by character (for vowels) and iterating by word via split(). Writing clean code with 'with open()' will guarantee you all 3 marks! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
