import React, { useState } from 'react';
import { 
  CheckCircle, Bug, ShieldAlert, Cpu, Activity, 
  Layers, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ShieldCheck, Play, 
  FileCheck, CheckSquare, RefreshCw, AlertOctagon, Terminal
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

// Interactive QA Test Case Simulator & Bug Tracker
const QATestLabSimulator = () => {
  const [testCases, setTestCases] = useState([
    {
      id: "TC-01",
      name: "Valid Electricity Bill Calculation",
      type: "Unit & Functional Test",
      input: "ConsumerID: 'WB-KOL-8921', Units: 240 kWh",
      expected: "HTTP 200 OK | Bill: ₹1,710.00 | Status: Unpaid",
      status: "ready", // ready | running | passed | failed
      actual: null,
      logs: null,
      severity: "N/A"
    },
    {
      id: "TC-02",
      name: "Negative Input Boundary Test",
      type: "Boundary Value Analysis",
      input: "ConsumerID: 'WB-KOL-8921', Units: -50 kWh",
      expected: "Validation Error: 'Units consumed must be a positive number'",
      status: "ready",
      actual: null,
      logs: null,
      severity: "N/A"
    },
    {
      id: "TC-03",
      name: "SQL Injection Penetration Attempt",
      type: "Security & Pen-Testing",
      input: "Username: 'admin' OR '1'='1' --",
      expected: "Blocked by PreparedStatement: Access Denied",
      status: "ready",
      actual: null,
      logs: null,
      severity: "N/A"
    },
    {
      id: "TC-04",
      name: "Unregistered Consumer Search Handling",
      type: "Exception & Integration Test",
      input: "ConsumerID: 'WB-UNKNOWN-9999'",
      expected: "HTTP 404: 'Consumer record not found in Barrackpore database'",
      status: "ready",
      actual: null,
      logs: null,
      severity: "N/A"
    }
  ]);

  const [activeTab, setActiveTab] = useState("tests"); // 'tests' | 'bug_lifecycle'
  const [loggedBugs, setLoggedBugs] = useState([]);

  const runTestCase = (testId) => {
    setTestCases(prev => prev.map(tc => {
      if (tc.id === testId) return { ...tc, status: "running" };
      return tc;
    }));

    setTimeout(() => {
      setTestCases(prev => prev.map(tc => {
        if (tc.id !== testId) return tc;

        if (tc.id === "TC-01") {
          return {
            ...tc,
            status: "passed",
            actual: "HTTP 200 OK | Total Bill: ₹1,710.00 (Units: 240 * ₹6.50 + ₹150 base)",
            logs: "[INFO] BillingService.calculateTariff() executed in 4ms. Database row inserted with BillID #1042."
          };
        } else if (tc.id === "TC-02") {
          return {
            ...tc,
            status: "passed",
            actual: "HTTP 400 Bad Request | 'Units consumed must be a positive number'",
            logs: "[PASS] Client-side & Server-side validator successfully trapped negative integer."
          };
        } else if (tc.id === "TC-03") {
          return {
            ...tc,
            status: "passed",
            actual: "HTTP 401 Unauthorized | Parameterized query treated input as literal string.",
            logs: "[SECURITY PASS] java.sql.PreparedStatement neutralized SQL payload."
          };
        } else if (tc.id === "TC-04") {
          // Simulated defect
          return {
            ...tc,
            status: "failed",
            actual: "HTTP 500 Internal Server Error (NullPointerException on unhandled ResultSet)",
            logs: "[DEFECT FOUND] NullPointerException in BillingServlet.java:42 when consumer row is absent!",
            severity: "Major Defect"
          };
        }
        return tc;
      }));
    }, 800);
  };

  const runAllTests = () => {
    testCases.forEach((tc, idx) => {
      setTimeout(() => {
        runTestCase(tc.id);
      }, idx * 600);
    });
  };

  const logDefectToJira = (tc) => {
    if (loggedBugs.some(b => b.testId === tc.id)) return;
    const newBug = {
      bugId: "BUG-IT802-" + (loggedBugs.length + 101),
      testId: tc.id,
      title: `NullPointerException when searching non-existent Consumer ID`,
      severity: "Major (Functional Crash)",
      state: "ASSIGNED",
      assignee: "Sukanta Hui (Lead Backend Dev)",
      timestamp: "Just now"
    };
    setLoggedBugs(prev => [newBug, ...prev]);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Activity className="w-3.5 h-3.5" /> Stage 4: QA Execution Engine
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Interactive QA Test Execution & Bug Tracker</h3>
          <p className="text-sm text-slate-400">Run automated functional, boundary, and security test suites and log discovered bugs.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={runAllTests}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Play className="w-3.5 h-3.5" /> Run All Test Cases
          </button>
        </div>
      </div>

      {/* Test Case Cards */}
      <div className="space-y-4 mb-6">
        {testCases.map((tc) => (
          <div 
            key={tc.id}
            className={`p-4 rounded-xl border transition-all ${
              tc.status === 'passed'
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : tc.status === 'failed'
                  ? 'bg-rose-950/30 border-rose-500/50 ring-1 ring-rose-500/30'
                  : tc.status === 'running'
                    ? 'bg-amber-950/20 border-amber-500/50 animate-pulse'
                    : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {tc.id}
                </span>
                <span className="text-sm font-bold text-white">{tc.name}</span>
                <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {tc.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {tc.status === 'passed' && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> PASSED
                  </span>
                )}
                {tc.status === 'failed' && (
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> FAILED (Defect Found)
                  </span>
                )}
                {tc.status === 'running' && (
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <RefreshCw className="w-4 h-4 animate-spin" /> RUNNING...
                  </span>
                )}
                {tc.status === 'ready' && (
                  <button
                    onClick={() => runTestCase(tc.id)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-all"
                  >
                    Execute Test
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono mt-3">
              <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300">
                <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold mb-1">Test Input:</div>
                <div>{tc.input}</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300">
                <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold mb-1">Expected Output:</div>
                <div className="text-slate-300">{tc.expected}</div>
              </div>
            </div>

            {/* Execution logs / Actual outcome */}
            {tc.actual && (
              <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Actual Result: <strong className={tc.status === 'passed' ? 'text-emerald-300' : 'text-rose-300'}>{tc.actual}</strong></span>
                  {tc.status === 'failed' && (
                    <button
                      onClick={() => logDefectToJira(tc)}
                      disabled={loggedBugs.some(b => b.testId === tc.id)}
                      className={`px-2.5 py-1 rounded text-xs font-sans font-bold flex items-center gap-1 transition-all ${
                        loggedBugs.some(b => b.testId === tc.id)
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow'
                      }`}
                    >
                      <Bug className="w-3.5 h-3.5" />
                      {loggedBugs.some(b => b.testId === tc.id) ? 'Defect Logged' : 'Log Bug in Tracker'}
                    </button>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{tc.logs}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logged Bugs Summary Table */}
      {loggedBugs.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
            <Bug className="w-4 h-4" /> Live QA Defect Tracker (JIRA Simulation)
          </div>
          <div className="space-y-2 font-mono text-xs">
            {loggedBugs.map((b) => (
              <div key={b.bugId} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-500/30 rounded font-bold">
                    {b.bugId}
                  </span>
                  <span className="text-white font-sans">{b.title}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="text-amber-400">{b.severity}</span>
                  <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded text-[10px] font-sans font-semibold">
                    {b.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Topic4 Component
export default function Topic4() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header section */}
        <div className="border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Segment 2: Operating Web-Based Applications</span>
            <span>/</span>
            <span>Module: Four Stages of Web App Dev</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stage 4: Testing & Quality Assurance Phase
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Systematic verification and validation: Unit, Integration, System, and User Acceptance Testing (UAT), 
            boundary value analysis, defect lifecycle management, and security vulnerability elimination.
          </p>
        </div>

        {/* Interactive QA Test Lab Simulator */}
        <QATestLabSimulator />

        {/* Testing Hierarchy Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
              <Layers className="w-5 h-5" />
              <h4>The 4 Levels of Testing Hierarchy</h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• <strong className="text-white">1. Unit Testing:</strong> Validates isolated methods, subroutines, and individual calculations.</li>
              <li>• <strong className="text-white">2. Integration Testing:</strong> Tests data transfer and API communication across interconnected modules.</li>
              <li>• <strong className="text-white">3. System Testing:</strong> End-to-end evaluation of the integrated system against all functional specifications.</li>
              <li>• <strong className="text-white">4. User Acceptance (UAT):</strong> Alpha & Beta testing by real clients to validate business readiness.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
              <Bug className="w-5 h-5" />
              <h4>The Bug / Defect Lifecycle</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a defect is discovered during QA, it follows a standardized lifecycle:
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-amber-300 flex items-center justify-between overflow-x-auto">
              <span>NEW</span> -&gt; <span>ASSIGNED</span> -&gt; <span>OPEN</span> -&gt; <span>FIXED</span> -&gt; <span>RETEST</span> -&gt; <span>CLOSED</span>
            </div>
            <p className="text-xs text-slate-400">
              If the bug persists upon retesting by QA, it transitions from <code className="text-rose-400">RETEST</code> to <code className="text-rose-400">REOPENED</code> for further developer fixes.
            </p>
          </div>
        </div>

        {/* Interactive MCQ Practice Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <CheckSquare className="w-3.5 h-3.5" /> Self-Assessment Challenge
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Topic 4 Mastery Quiz (25 MCQs)</h3>
              <p className="text-sm text-slate-400">Test your mastery of Stage 4 Testing, QA Levels, Bug Lifecycle, and UAT Sign-off.</p>
            </div>

            {showResults && (
              <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Your Score</div>
                  <div className="text-xl font-extrabold text-amber-400">
                    {calculateScore()} / {questions.length}
                  </div>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
                >
                  Retake
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = isAnswered && userAnswer === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-slate-300 shrink-0">
                      {qIndex + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-200">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-9">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = userAnswer === optIndex;
                      let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80";

                      if (showResults) {
                        if (optIndex === q.correctAnswer) {
                          btnStyle = "border-emerald-500/80 bg-emerald-950/50 text-emerald-200 font-semibold";
                        } else if (isSelected) {
                          btnStyle = "border-rose-500/80 bg-rose-950/50 text-rose-200 font-semibold";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-amber-500 bg-amber-950/50 text-amber-200 font-semibold ring-1 ring-amber-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleOptionClick(q.id, optIndex)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && optIndex === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {showResults && isSelected && optIndex !== q.correctAnswer && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-4 ml-9 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-emerald-400 font-semibold">Explanation:</div>
                      <p className="text-slate-300">{q.explanation}</p>
                      <p className="text-slate-400 italic font-bengali">{q.explanationBengali}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  Object.keys(selectedAnswers).length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-500/25'
                }`}
              >
                Submit & Check Answers ({Object.keys(selectedAnswers).length}/{questions.length})
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white transition-all"
              >
                Reset & Try Again
              </button>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate 
          title="Frequently Asked Questions: Stage 4 Testing & QA"
          faqs={[
            {
              question: "What is Regression Testing and when is it executed?",
              answer: "Regression testing involves re-running test cases after code changes or bug fixes to verify that existing functionality has not been inadvertently broken."
            },
            {
              question: "What is the difference between Alpha Testing and Beta Testing?",
              answer: "Alpha testing is carried out internally by QA engineers and developers in a controlled environment. Beta testing is conducted by real prospective end-users in their live production or operational environments prior to general release."
            },
            {
              question: "What constitutes the formal deliverable that permits live production launch?",
              answer: "The User Acceptance Testing (UAT) Sign-off Certificate and QA Quality Audit Report."
            }
          ]}
        />

        {/* Printable Note Section */}
        <PlainTextPrint 
          title="CBSE Class 12 IT 802: Topic 4 - Stage 4: Testing & QA Phase Notes"
          content={noteText}
        />

        {/* Teacher Sukanta Hui note card */}
        <Teacher 
          topicName="Stage 4: Testing & Quality Assurance Phase"
          unitName="Four Stages of Web Application Development"
        />

      </div>
    </div>
  );
}
