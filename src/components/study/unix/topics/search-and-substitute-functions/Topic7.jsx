import React, { useState } from 'react';
import clsx from 'clsx';

// Import external scripts (.sh files as raw text)
import renameFilesSedScript from './topic7_files/rename_files_sed.sh?raw';
import updateConfigsScript from './topic7_files/update_configs.sh?raw';
import cleanCsvScript from './topic7_files/clean_csv.sh?raw';
import logAnonymizeScript from './topic7_files/log_anonymize.sh?raw';
import batchHtmlEditScript from './topic7_files/batch_html_edit.sh?raw';
import markdownConverterScript from './topic7_files/markdown_converter.sh?raw';
import csvToSqlScript from './topic7_files/csv_to_sql.sh?raw';
import bulkFindReplaceScript from './topic7_files/bulk_find_replace.sh?raw';
import gitCommitCleanupScript from './topic7_files/git_commit_cleanup.sh?raw';
import questions from './topic7_files/topic7_questions.js';

// Reusable ShellFileLoader component
const ShellFileLoader = ({ fileModule, title, highlightLines = [] }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(fileModule);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <span className="text-sm font-mono font-medium text-gray-700 dark:text-gray-200">{title}</span>
                <button onClick={handleCopy} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
                <code>
                    {fileModule.split('\n').map((line, idx) => (
                        <div key={idx} className={clsx(highlightLines.includes(idx + 1) && 'bg-yellow-200 dark:bg-yellow-900/30')}>
                            {line}
                        </div>
                    ))}
                </code>
            </pre>
        </div>
    );
};

// Reusable FAQTemplate component
const FAQTemplate = ({ title, questions }) => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <div className="my-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h3>
            <div className="space-y-4">
                {questions.map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
                        <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left px-6 py-4 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex justify-between items-center">
                            <span>{faq.question}</span>
                            <svg className={clsx("w-5 h-5 transition-transform duration-300", openIndex === idx && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openIndex === idx && (
                            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 animate-[fadeIn_0.3s_ease-out]">
                                <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">Short:</span> {faq.shortAnswer}</p>
                                <p className="text-gray-700 dark:text-gray-200 mb-2"><span className="font-semibold">Explanation:</span> {faq.explanation}</p>
                                {faq.hint && <p className="text-sm text-indigo-600 dark:text-indigo-400 italic mb-2"><span className="font-semibold">💡 Hint:</span> {faq.hint}</p>}
                                {faq.codeExample && (
                                    <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto mt-2"><code>{faq.codeExample}</code></pre>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main component: Topic 7
const Topic7 = () => {
    const currentYear = new Date().getFullYear();
    const experienceYears = currentYear - 1998;

    // SVG Illustration for practical examples
    const PracticalExamplesIllustration = () => (
        <div className="flex justify-center my-8">
            <svg width="600" height="280" viewBox="0 0 600 280" className="w-full max-w-md h-auto">
                <rect width="600" height="280" rx="12" fill="#f8fafc" className="dark:fill-gray-800" />

                {/* Use case icons */}
                <rect x="30" y="30" width="160" height="80" rx="8" fill="#e0e7ff" className="dark:fill-indigo-900/40" />
                <text x="110" y="55" fontSize="14" textAnchor="middle" fill="#4f46e5">📝 Batch Config</text>
                <text x="110" y="75" fontSize="11" textAnchor="middle" fill="#4f46e5">sed -i 's/old/new/' *.conf</text>
                <text x="110" y="95" fontSize="11" textAnchor="middle" fill="#4f46e5">→ 50 files updated</text>

                <rect x="220" y="30" width="160" height="80" rx="8" fill="#dcfce7" className="dark:fill-green-900/40" />
                <text x="300" y="55" fontSize="14" textAnchor="middle" fill="#16a34a">🧹 CSV Cleanup</text>
                <text x="300" y="75" fontSize="11" textAnchor="middle" fill="#16a34a">sed 's/", "/|/g'</text>
                <text x="300" y="95" fontSize="11" textAnchor="middle" fill="#16a34a">→ Normalize delimiters</text>

                <rect x="410" y="30" width="160" height="80" rx="8" fill="#fee2e2" className="dark:fill-red-900/40" />
                <text x="490" y="55" fontSize="14" textAnchor="middle" fill="#dc2626">🔒 Log Anonymize</text>
                <text x="490" y="75" fontSize="11" textAnchor="middle" fill="#dc2626">sed 's/[0-9]{4}/XXXX/g'</text>
                <text x="490" y="95" fontSize="11" textAnchor="middle" fill="#dc2626">→ GDPR compliant</text>

                <rect x="70" y="140" width="160" height="80" rx="8" fill="#fef9c3" className="dark:fill-yellow-900/40" />
                <text x="150" y="165" fontSize="14" textAnchor="middle" fill="#854d0e">🔄 Find & Replace</text>
                <text x="150" y="185" fontSize="11" textAnchor="middle" fill="#854d0e">grep -rl 'old' | xargs sed -i</text>
                <text x="150" y="205" fontSize="11" textAnchor="middle" fill="#854d0e">→ Across whole project</text>

                <rect x="260" y="140" width="160" height="80" rx="8" fill="#cffafe" className="dark:fill-cyan-900/40" />
                <text x="340" y="165" fontSize="14" textAnchor="middle" fill="#0891b2">📄 HTML→Markdown</text>
                <text x="340" y="185" fontSize="11" textAnchor="middle" fill="#0891b2">sed 's/<h1>/# /g'</h1></text>
                <text x="340" y="205" fontSize="11" textAnchor="middle" fill="#0891b2">→ Blog migration</text>

                <rect x="450" y="140" width="120" height="80" rx="8" fill="#e9d5ff" className="dark:fill-purple-900/40" />
                <text x="510" y="165" fontSize="14" textAnchor="middle" fill="#9333ea">🗄️ CSV→SQL</text>
                <text x="510" y="185" fontSize="11" textAnchor="middle" fill="#9333ea">sed 's/^/INSERT INTO/'</text>
                <text x="510" y="205" fontSize="11" textAnchor="middle" fill="#9333ea">→ Data migration</text>

                {/* Animated highlight */}
                <rect x="30" y="30" width="540" height="190" rx="12" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6">
                    <animate attributeName="stroke-dashoffset" values="0;100" dur="4s" repeatCount="indefinite" />
                </rect>
            </svg>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
            <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .reveal-section {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section { animation: none; opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                {/* Header */}
                <div className="reveal-section text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                        Practical Examples: Search & Replace Operations
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Real‑world, production‑grade scripts using grep and sed – from bulk file edits to data anonymization, CSV cleaning, and SQL generation.
                    </p>
                </div>

                {/* SVG Illustration */}
                <div className="reveal-section" style={{ animationDelay: '0.1s' }}>
                    <PracticalExamplesIllustration />
                </div>

                {/* Overview */}
                <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.15s' }}>
                    <h2 className="text-2xl font-bold mb-3">🔧 What You'll Learn</h2>
                    <p className="mb-3">This topic brings together everything from previous lessons to solve real tasks:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Bulk renaming of files using <code>sed</code> pipelines</li>
                        <li>Updating configuration values across hundreds of files</li>
                        <li>Cleaning messy CSV data (quote normalization, delimiter conversion)</li>
                        <li>Anonymizing sensitive information in logs (IPs, emails, credit cards)</li>
                        <li>Batch HTML to Markdown conversion for static site migrations</li>
                        <li>Transforming CSV into SQL INSERT statements</li>
                        <li>Finding and replacing text across entire Git repositories</li>
                        <li>Cleaning up commit messages or code comments</li>
                    </ul>
                    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border-l-4 border-purple-500">
                        <p className="text-sm"><strong>Why this matters:</strong> At Shyamnagar IT Park, a junior developer spent two hours manually editing 50 config files. We showed her <code className="bg-gray-200 dark:bg-gray-700 px-1">sed -i 's/localhost:3000/api.example.com/g' *.env</code> – she finished in 2 seconds. These skills separate beginners from professionals.</p>
                    </div>
                </div>

                {/* Script Demos – using external .sh files */}
                <div className="reveal-section space-y-6" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-2xl font-bold">📁 Real‑World Script Demos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={renameFilesSedScript} title="📂 Bulk File Renaming with sed" highlightLines={[12, 18, 24]} />
                        </div>
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={updateConfigsScript} title="⚙️ Update Configuration Files" highlightLines={[14, 20, 26]} />
                        </div>
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={cleanCsvScript} title="📊 CSV Cleaning & Normalization" highlightLines={[15, 22, 29]} />
                        </div>
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={logAnonymizeScript} title="🔒 Log Anonymization (GDPR)" highlightLines={[18, 25, 32]} />
                        </div>
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={batchHtmlEditScript} title="🌐 Batch HTML to Markdown" highlightLines={[14, 22, 30]} />
                        </div>
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={markdownConverterScript} title="📝 Markdown Batch Editor" highlightLines={[12, 18, 25]} />
                        </div>
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={csvToSqlScript} title="🗄️ CSV to SQL Generator" highlightLines={[14, 22, 30]} />
                        </div>
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={bulkFindReplaceScript} title="🔍 Bulk Find & Replace Across Project" highlightLines={[15, 22, 29]} />
                        </div>
                        <div className="md:col-span-2 hover:scale-[1.01] transition-transform duration-300">
                            <ShellFileLoader fileModule={gitCommitCleanupScript} title="🧹 Git Commit Message Cleanup" highlightLines={[14, 20, 27]} />
                        </div>
                    </div>
                </div>

                {/* Tips & Tricks + Common Mistakes */}
                <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animationDelay: '0.25s' }}>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
                        <h3 className="text-xl font-bold flex items-center gap-2">💎 Pro Production Tips</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                            <li><strong>Always backup:</strong> Use `sed -i.bak` or `cp file file.bak` before bulk operations.</li>
                            <li><strong>Dry run first:</strong> Remove `-i` and check output, or use `grep` to count matches.</li>
                            <li><strong>Use version control:</strong> `git diff` after changes to review before committing.</li>
                            <li><strong>Log what you changed:</strong> Redirect sed output to a log: `sed -i 's/old/new/g' file && echo "Changed file" >> changelog`.</li>
                            <li><strong>Preserve timestamps:</strong> Use `touch -r` after `sed -i` to keep modification times.</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-5 rounded-xl hover:shadow-md transition-all">
                        <h3 className="text-xl font-bold flex items-center gap-2">⚠️ Common Pitfalls in Production</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                            <li><strong>No dry run:</strong> Changing 1000 files with a wrong regex is disastrous. Always preview.</li>
                            <li><strong>Forgetting to escape special characters:</strong> `.` `*` `[` `$` etc. in patterns cause unexpected matches.</li>
                            <li><strong>Using `grep | sed` to modify files:</strong> Use `sed -i` with address instead.</li>
                            <li><strong>Over‑matching symlinks:</strong> `grep -r` follows symlinks; may change unintended files.</li>
                            <li><strong>Case sensitivity surprises:</strong> Add `-i` to grep or sed when needed.</li>
                        </ul>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="reveal-section bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-2xl font-bold mb-3">✅ Production‑Ready Best Practices</h2>
                    <div className="flex flex-wrap gap-4 justify-between">
                        <div className="space-y-2">
                            <p>✔️ Use a staging directory: copy files, test, then move to production.</p>
                            <p>✔️ Write idempotent sed commands – running twice shouldn't break anything.</p>
                            <p>✔️ Use `grep -l` before `xargs sed -i` to limit files to those that actually match.</p>
                        </div>
                        <div className="space-y-2">
                            <p>✔️ Store regex patterns in variables for reuse and clarity.</p>
                            <p>✔️ Add `set -euo pipefail` to bash scripts for safe error handling.</p>
                            <p>✔️ Comment every non‑obvious sed command.</p>
                        </div>
                    </div>
                    <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-bold">📝 Mini Checklist for Production Scripts</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
                            <li>☐ I have a backup of all files before running the script.</li>
                            <li>☐ I tested the command on a single file first.</li>
                            <li>☐ I used `grep -c` to verify expected number of matches.</li>
                            <li>☐ I handled edge cases (empty files, no matches, special chars).</li>
                            <li>☐ My command is idempotent (safe to run twice).</li>
                            <li>☐ I logged what was changed for audit.</li>
                            <li>☐ I committed changes to version control before and after.</li>
                        </ul>
                    </div>
                </div>

                {/* Hint Section */}
                <p className="mt-1">
                    You're tasked with migrating a 10,000‑page website: all &lt;h1&gt; tags should become # in Markdown, and all internal links from .html to .md. How would you approach this with a single sed command? What about nested tags? Consider using pattern ranges (/start/,/end/) and backreferences. Can you write a one‑liner that safely handles &lt;h1 class="..."&gt;?
                </p>

                {/* Teacher's Note */}
                <div className="reveal-section rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">👨‍🏫</div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
                            <p className="font-medium text-purple-700 dark:text-purple-300">Sukanta Hui — Master Educator (since 1998, {experienceYears} years of experience)</p>
                            <p className="mt-2 text-gray-700 dark:text-gray-200"><strong>Expertise:</strong> Programming Language, RDBMS, Operating System, Web Development | <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                            <div className="mt-3 bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                                <p><strong>🎓 Teacher's Advice for Practical grep + sed:</strong></p>
                                <ul className="list-disc ml-5 mt-1 space-y-1">
                                    <li>"In my 27+ years of teaching at Barrackpore, I've seen students transform from command‑line novices to automation wizards after mastering these practical patterns."</li>
                                    <li>Classroom exercise: Give them a large CSV with student names (Swadeep, Tuhina, etc.) and ask them to generate SQL INSERT statements – they'll learn real data engineering skills.</li>
                                    <li>Emphasise the 'safety first' mindset: backup, dry run, version control. Production mistakes are costly.</li>
                                    <li>Encourage building a personal 'toolbox' of sed/grep scripts for repetitive tasks (log summariser, config updater, etc.).</li>
                                </ul>
                                <p className="mt-2 italic text-sm">"The difference between a junior and senior engineer isn't knowing the commands – it's knowing when and how to apply them safely." — Sukanta Sir</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="reveal-section" style={{ animationDelay: '0.45s' }}>
                    <FAQTemplate title="❓ Practical Search & Replace — 30 Expert FAQs" questions={questions} />
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800">
                    Topic 7: Practical Examples — Master Real‑World Search & Replace
                </div>
            </div>
        </div>
    );
};

export default Topic7;