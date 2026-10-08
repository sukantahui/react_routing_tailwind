import React, { useState } from 'react';
import { 
  Award, CheckCircle2, XCircle, Clock, AlertTriangle, 
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw, Sparkles, ChevronRight, ChevronLeft, Layers 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

export default function Topic11() {
  const [activeSection, setActiveSection] = useState('mcq');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [columns, setColumns] = useState([
    { name: 'RollNo', type: 'INT', constraint: 'PRIMARY KEY' },
    { name: 'StudentName', type: 'VARCHAR(50)', constraint: 'NOT NULL' },
    { name: 'Class', type: 'VARCHAR(5)', constraint: 'NOT NULL' }
  ]);
  const [newColName, setNewColName] = useState('');
  const [newColType, setNewColType] = useState('VARCHAR(30)');
  const [newColConstraint, setNewColConstraint] = useState('DEFAULT NULL');

  const handleSelectOption = (qId, option) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQIndex(0);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const currentQ = questions[currentQIndex];
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const handleAddColumn = () => {
    if (!newColName.trim()) return;
    setColumns(prev => [...prev, {
      name: newColName.trim(),
      type: newColType,
      constraint: newColConstraint
    }]);
    setNewColName('');
  };

  const handleDropColumn = (index) => {
    if (columns.length <= 1) return;
    setColumns(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 11
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive DDL Examination Simulator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Practice your Skill here: 30-Question DDL & Constraints Challenge
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Test your mastery of Module 002 with this authentic 30-mark interactive assessment covering CREATE TABLE, ALTER TABLE, DECIMAL(p,s), and Table Constraints.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mcq', label: '1. 30 MCQs Exam Simulator', icon: Award },
            { id: 'sandbox', label: '2. Live DDL Schema Sandbox', icon: Layers },
            { id: 'subjective', label: '3. Subjective Board Drills', icon: BookOpen },
            { id: 'faqs', label: '4. Practice FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Printable Document', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SECTION 1: 30 MCQ SIMULATOR */}
        {activeSection === 'mcq' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-sky-400 tracking-wider uppercase">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded font-medium">
                      {currentQ.topic}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded font-medium">
                      {currentQ.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-400 font-medium">
                    Answered: <span className="text-white font-bold">{Object.keys(selectedAnswers).length}</span> / {questions.length}
                  </div>
                  {!submitted ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg transition"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-lg transition"
                    >
                      <RefreshCw size={14} /> Retake Test
                    </button>
                  )}
                </div>
              </div>

              {submitted && (
                <div className="bg-gradient-to-r from-slate-900 to-sky-950/60 border border-sky-500/30 rounded-2xl p-6 text-center space-y-3">
                  <h3 className="text-xl font-extrabold text-white">Assessment Result</h3>
                  <div className="text-4xl font-black text-amber-400">{score} / {questions.length}</div>
                  <p className="text-xs text-slate-300">
                    Accuracy: <span className="font-bold text-sky-300">{percentage}%</span> · {percentage >= 75 ? "🎉 Excellent! Mastered DDL & Table Constraints." : "Keep revising the DDL notes & concepts below!"}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>
                {currentQ.hint && !submitted && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                    💡 <strong>Hint:</strong> {currentQ.hint}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === opt;
                    const isCorrect = submitted && opt === currentQ.answer;
                    const isWrong = submitted && isSelected && !isCorrect;

                    return (
                      <button
                        key={oIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(currentQ.id, opt)}
                        className={`text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-3 ${
                          isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : isWrong
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                            : isSelected
                            ? 'bg-sky-500/20 border-sky-400 text-white'
                            : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-4 bg-slate-900 border border-slate-700/60 rounded-xl space-y-2 mt-4">
                    <div className="text-xs font-bold text-emerald-400">Correct Answer: {currentQ.answer}</div>
                    <div className="text-xs text-slate-300">{currentQ.explanation}</div>
                    {currentQ.explanationBn && (
                      <div className="text-xs text-sky-300 font-sans border-t border-slate-800 pt-2">
                        <strong>বাংলা ব্যাখ্যা:</strong> {currentQ.explanationBn}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-300 rounded-xl transition"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    disabled={currentQIndex === questions.length - 1}
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-30 text-xs font-bold text-white rounded-xl transition"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: LIVE DDL SCHEMA SANDBOX */}
        {activeSection === 'sandbox' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3 text-sky-400">
                <Layers size={22} />
                <h3 className="text-lg font-bold text-white">Live DDL Schema Builder & Degree Alteration Workbench</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Add and drop columns to observe real-time DDL table definition generation, degree calculations, and column position alterations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Execute ALTER TABLE ADD Column</h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Column Name:</label>
                      <input 
                        type="text" 
                        value={newColName} 
                        onChange={(e) => setNewColName(e.target.value)} 
                        placeholder="e.g. BloodGroup, EmergencyContact"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 mb-1">Data Type:</label>
                        <select 
                          value={newColType} 
                          onChange={(e) => setNewColType(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                        >
                          <option value="CHAR(2)">CHAR(2)</option>
                          <option value="VARCHAR(50)">VARCHAR(50)</option>
                          <option value="INT">INT</option>
                          <option value="DECIMAL(3,2)">DECIMAL(3,2)</option>
                          <option value="DECIMAL(8,2)">DECIMAL(8,2)</option>
                          <option value="DATE">DATE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Constraint:</label>
                        <select 
                          value={newColConstraint} 
                          onChange={(e) => setNewColConstraint(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                        >
                          <option value="DEFAULT NULL">DEFAULT NULL</option>
                          <option value="NOT NULL">NOT NULL</option>
                          <option value="UNIQUE">UNIQUE</option>
                          <option value="DEFAULT 'Barrackpore'">DEFAULT 'Barrackpore'</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={handleAddColumn}
                      className="w-full py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition"
                    >
                      + ALTER TABLE Student ADD {newColName || 'column'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-amber-400 font-bold">Current Table Degree: {columns.length}</span>
                    <span className="text-slate-400">Relation: Student</span>
                  </div>
                  <div className="space-y-2">
                    {columns.map((col, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-sky-300 font-bold">{col.name}</span>
                        <span className="text-emerald-400">{col.type}</span>
                        <span className="text-amber-300 text-[10px]">{col.constraint}</span>
                        {columns.length > 1 && (
                          <button 
                            onClick={() => handleDropColumn(idx)}
                            className="text-rose-400 hover:text-rose-300 text-[10px] font-bold px-1.5 py-0.5 bg-rose-500/10 rounded border border-rose-500/30"
                          >
                            DROP
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SUBJECTIVE BOARD DRILLS */}
        {activeSection === 'subjective' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">CBSE Class XII IT (802) High-Yield Subjective Drills</h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q1. Write the SQL DDL statement to create a table named 'Movie' with the following specifications:</h4>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li><code>MovieID</code>: Integer Primary Key</li>
                    <li><code>Title</code>: Variable length string up to 60 chars, mandatory</li>
                    <li><code>IMDb_Rating</code>: Fractional rating allowing numbers up to 9.99</li>
                  </ul>
                  <div className="p-3 bg-slate-950 rounded-lg text-sky-300 font-mono text-xs">
                    CREATE TABLE Movie (<br />
                    &nbsp;&nbsp;MovieID INT PRIMARY KEY,<br />
                    &nbsp;&nbsp;Title VARCHAR(60) NOT NULL,<br />
                    &nbsp;&nbsp;IMDb_Rating DECIMAL(3,2)<br />
                    );
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q2. Write SQL command to add a new column 'BloodGroup' of type CHAR(2) to the existing 'Student' table.</h4>
                  <div className="p-3 bg-slate-950 rounded-lg text-sky-300 font-mono text-xs">
                    ALTER TABLE Student ADD BloodGroup CHAR(2);
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400">Q3. Differentiate between DROP TABLE and DELETE FROM with respect to schema destruction and rollback.</h4>
                  <p className="text-slate-300">
                    <strong>DROP TABLE</strong> is a DDL command that destroys the table schema and data permanently; it cannot be rolled back. <strong>DELETE FROM</strong> is a DML command that removes rows while preserving the schema intact; it can be rolled back in transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FAQS */}
        {activeSection === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) Module 002 Practice FAQs" questions={questions} />
          </div>
        )}

        {/* SECTION 5: PRINTABLE NOTES */}
        {activeSection === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Module 002 Comprehensive Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download DDL Master Notes"
              downloadFileName="topic11_module002_exam_practice_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Practice DDL statements by writing complete scripts on paper. Pay special attention to DECIMAL(p,s) precision, ON DELETE CASCADE, and ALTER TABLE ADD syntax! — Sukanta Hui" />

      </div>
    </div>
  );
}