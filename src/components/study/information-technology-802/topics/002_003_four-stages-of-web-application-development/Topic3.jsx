import React, { useState } from 'react';
import { 
  Code, Terminal, Database, Server, Monitor, 
  Layers, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ShieldCheck, Play, 
  FileCode, CheckSquare, Lock, Cpu, RefreshCw, Copy, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

// Interactive 3-Tier Code Pipeline Inspector
const CodePipelineInspector = () => {
  const [selectedScenario, setSelectedScenario] = useState('billing'); // 'billing' | 'login'
  const [activeCodeTab, setActiveCodeTab] = useState('backend'); // 'frontend' | 'backend' | 'database'
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState(null);

  const scenarios = {
    billing: {
      title: "Generate Online Utility Bill (Barrackpore Electric)",
      frontendCode: `<!-- Front-End: HTML5 Form + JavaScript Fetch API -->
<form id="billingForm" onsubmit="handleGenerateBill(event)">
  <label>Consumer ID:</label>
  <input type="text" id="consumerId" placeholder="e.g. WB-KOL-8921" required />
  
  <label>Units Consumed (kWh):</label>
  <input type="number" id="units" min="1" step="0.5" required />
  
  <button type="submit">Calculate & Save Bill</button>
</form>

<script>
async function handleGenerateBill(event) {
  event.preventDefault();
  const consumerId = document.getElementById('consumerId').value;
  const units = parseFloat(document.getElementById('units').value);

  // Asynchronous HTTP POST request to middle-tier Java Servlet
  const response = await fetch('/api/bills/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ consumerId, units })
  });
  const data = await response.json();
  alert('Bill Generated! Total Payable: ₹' + data.totalAmount);
}
</script>`,
      backendCode: `// Middle-Tier: Java Servlet Controller with JDBC PreparedStatement
import java.io.*;
import java.sql.*;
import javax.servlet.http.*;

public class BillingServlet extends HttpServlet {
  protected void doPost(HttpServletRequest req, HttpServletResponse res) 
      throws IOException {
    String consumerId = req.getParameter("consumerId");
    double units = Double.parseDouble(req.getParameter("units"));

    // Business Logic: Slab-based electricity tariff calculation
    double ratePerUnit = (units > 200) ? 6.50 : 5.00;
    double totalAmount = units * ratePerUnit + 150.00; // Fixed charge

    // Secure Database Persistence using JDBC PreparedStatement
    String sql = "INSERT INTO BILLS (ConsumerID, Units, TotalAmount, Status) VALUES (?, ?, ?, 'Unpaid')";
    
    try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/billing_db", "dbuser", "Pass@123");
         PreparedStatement ps = con.prepareStatement(sql)) {
      
      ps.setString(1, consumerId);
      ps.setDouble(2, units);
      ps.setDouble(3, totalAmount);
      
      int affectedRows = ps.executeUpdate(); // Executes DML statement
      
      res.setContentType("application/json");
      res.getWriter().write("{\\"status\\":\\"success\\", \\"totalAmount\\":" + totalAmount + "}");
    } catch (SQLException e) {
      res.setStatus(500);
      res.getWriter().write("{\\"error\\": \\"" + e.getMessage() + "\\"}");
    }
  }
}`,
      databaseCode: `-- Back-End Database: MySQL DDL Schema & Executed Query
CREATE TABLE BILLS (
  BillID INT AUTO_INCREMENT PRIMARY KEY,
  ConsumerID VARCHAR(30) NOT NULL,
  Units DECIMAL(8,2) NOT NULL,
  TotalAmount DECIMAL(10,2) NOT NULL,
  BillingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Status ENUM('Unpaid', 'Paid') DEFAULT 'Unpaid'
);

-- Parameterized Query executed via JDBC PreparedStatement:
INSERT INTO BILLS (ConsumerID, Units, TotalAmount, Status) 
VALUES ('WB-KOL-8921', 240.0, 1710.00, 'Unpaid');`
    },
    login: {
      title: "User Authentication & Password Verification",
      frontendCode: `<!-- Front-End: Login Form with Client-Side Validation -->
<form id="loginForm" onsubmit="handleLogin(event)">
  <input type="text" id="username" placeholder="Username / Email" required />
  <input type="password" id="password" placeholder="Password" required />
  <button type="submit">Sign In</button>
</form>

<script>
async function handleLogin(e) {
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u, password: p })
  });
  const result = await res.json();
  if (result.authenticated) window.location.href = '/dashboard';
}
</script>`,
      backendCode: `// Middle-Tier: Java Authentication Service with PreparedStatement
import java.sql.*;
import org.mindrot.jbcrypt.BCrypt;

public class AuthService {
  public boolean authenticateUser(String username, String rawPassword) throws SQLException {
    // PREPAREDSTATEMENT prevents SQL Injection attacks like: ' OR '1'='1
    String query = "SELECT PasswordHash FROM USERS WHERE Username = ?";
    
    try (Connection conn = DBConnection.getConnection();
         PreparedStatement ps = conn.prepareStatement(query)) {
      
      ps.setString(1, username);
      ResultSet rs = ps.executeQuery(); // Executes SELECT query
      
      if (rs.next()) {
        String storedHash = rs.getString("PasswordHash");
        // Verify hashed password safely with BCrypt
        return BCrypt.checkpw(rawPassword, storedHash);
      }
      return false; // User not found
    }
  }
}`,
      databaseCode: `-- Back-End Database: MySQL Users Table
CREATE TABLE USERS (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(50) UNIQUE NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  Role VARCHAR(20) DEFAULT 'Citizen'
);

-- Parameterized SELECT executed securely:
SELECT PasswordHash FROM USERS WHERE Username = 'sukanta_hui';`
    }
  };

  const handleRunExecution = () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      if (selectedScenario === 'billing') {
        setExecutionOutput({
          status: "HTTP 200 OK",
          message: "PreparedStatement compiled successfully. 1 row inserted into MySQL table `BILLS`.",
          calcDetails: "Units: 240 kWh | Rate: ₹6.50/unit + ₹150 base = ₹1,710.00 Total Bill.",
          dbRecord: "{ BillID: 1042, ConsumerID: 'WB-KOL-8921', TotalAmount: 1710.00, Status: 'Unpaid' }"
        });
      } else {
        setExecutionOutput({
          status: "HTTP 200 OK",
          message: "PreparedStatement bound parameter 'sukanta_hui'. Hash verified via BCrypt.",
          calcDetails: "User authenticated successfully. JWT session token generated.",
          dbRecord: "{ UserID: 412, Username: 'sukanta_hui', Role: 'Educator', Session: 'ACTIVE' }"
        });
      }
    }, 1200);
  };

  const curScenario = scenarios[selectedScenario];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Code className="w-3.5 h-3.5" /> Stage 3: Construction Pipeline
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Interactive 3-Tier Code Pipeline Inspector</h3>
          <p className="text-sm text-slate-400">See how Front-End JavaScript, Middle-Tier Java Servlets, and Back-End MySQL interact seamlessly.</p>
        </div>

        {/* Scenario Picker */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => { setSelectedScenario('billing'); setExecutionOutput(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedScenario === 'billing' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Billing Logic
          </button>
          <button
            onClick={() => { setSelectedScenario('login'); setExecutionOutput(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedScenario === 'login' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Auth & PreparedStatements
          </button>
        </div>
      </div>

      {/* Code Tier Selector */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveCodeTab('frontend')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              activeCodeTab === 'frontend'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> 1. Front-End (HTML/JS)
          </button>
          <button
            onClick={() => setActiveCodeTab('backend')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              activeCodeTab === 'backend'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
            }`}
          >
            <Server className="w-3.5 h-3.5" /> 2. Middle-Tier (Java / JDBC)
          </button>
          <button
            onClick={() => setActiveCodeTab('database')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              activeCodeTab === 'database'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800/40'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> 3. Data Tier (MySQL SQL)
          </button>
        </div>

        <button
          onClick={handleRunExecution}
          disabled={isExecuting}
          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
        >
          {isExecuting ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Executing Pipeline...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Test Code Pipeline
            </>
          )}
        </button>
      </div>

      {/* Code Display Window */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto relative">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 pb-2 border-b border-slate-800">
          <span>
            {activeCodeTab === 'frontend' && "Presentation Tier Source (Client-Side HTML5 / JavaScript)"}
            {activeCodeTab === 'backend' && "Application Tier Source (Java Servlet with PreparedStatement)"}
            {activeCodeTab === 'database' && "Database Tier Script (MySQL DDL / Executed Statement)"}
          </span>
          <span className="text-emerald-400">Strictly follows Stage 2 DDS Blueprints</span>
        </div>
        <pre className="text-slate-300 leading-relaxed">
          {activeCodeTab === 'frontend' && curScenario.frontendCode}
          {activeCodeTab === 'backend' && curScenario.backendCode}
          {activeCodeTab === 'database' && curScenario.databaseCode}
        </pre>
      </div>

      {/* Live Execution Console Output */}
      {executionOutput && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/40 font-mono text-xs space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-emerald-400 font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Live Code Execution Successful ({executionOutput.status})
            </span>
            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">Runtime: 12ms</span>
          </div>
          <div className="text-slate-300">{executionOutput.message}</div>
          <div className="text-amber-300">{executionOutput.calcDetails}</div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-400">
            <span className="text-sky-300 font-bold">Database Return: </span>
            {executionOutput.dbRecord}
          </div>
        </div>
      )}
    </div>
  );
};

// Security Spotlight: SQL Injection vs PreparedStatement
const SecuritySpotlight = () => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border border-rose-500/30 shadow-xl mb-12">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-6 h-6 text-rose-400" />
        <h3 className="text-xl font-bold text-white">Security Spotlight: Why PreparedStatements are Mandatory</h3>
      </div>
      <p className="text-xs text-slate-300 mb-6 max-w-3xl">
        One of the most dangerous coding vulnerabilities is <strong>SQL Injection</strong>. In CBSE Class 12 IT 802, 
        students must understand how parameter placeholders (`?`) prevent hackers from altering database query logic.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vulnerable Code */}
        <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40 font-mono text-xs">
          <div className="flex items-center justify-between text-rose-400 font-bold mb-2 pb-1 border-b border-rose-500/30">
            <span className="flex items-center gap-1"><XCircle className="w-4 h-4" /> Flawed / Vulnerable Statement</span>
            <span className="text-[10px] text-rose-300 bg-rose-950 px-1.5 py-0.5 rounded">High Risk</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">Concatenating raw user input directly into SQL strings:</p>
          <pre className="text-rose-300 bg-slate-900 p-2.5 rounded mb-2 overflow-x-auto text-[11px]">
{`// DANGEROUS: String Concatenation
String q = "SELECT * FROM Users WHERE User='" 
           + userInput + "' AND Pass='" + pass + "'";
Statement stmt = con.createStatement();
ResultSet rs = stmt.executeQuery(q);`}
          </pre>
          <div className="text-[11px] text-slate-400">
            <strong className="text-rose-400">Exploit:</strong> Entering <code className="text-amber-300">' OR '1'='1</code> turns the query into: <code className="text-slate-300">WHERE User='' OR '1'='1'</code>, granting unauthorized access!
          </div>
        </div>

        {/* Secure Code */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 font-mono text-xs">
          <div className="flex items-center justify-between text-emerald-400 font-bold mb-2 pb-1 border-b border-emerald-500/30">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Secure PreparedStatement</span>
            <span className="text-[10px] text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded">Best Practice</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">Parameterizing inputs with positional `?` placeholders:</p>
          <pre className="text-emerald-300 bg-slate-900 p-2.5 rounded mb-2 overflow-x-auto text-[11px]">
{`// SECURE: Pre-compiled PreparedStatement
String q = "SELECT * FROM Users WHERE User = ? AND Pass = ?";
PreparedStatement ps = con.prepareStatement(q);
ps.setString(1, userInput);
ps.setString(2, pass);
ResultSet rs = ps.executeQuery();`}
          </pre>
          <div className="text-[11px] text-slate-400">
            <strong className="text-emerald-400">Protection:</strong> The database engine treats the entire input strictly as literal string values, preventing query manipulation completely.
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Topic3 Component
export default function Topic3() {
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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Segment 2: Operating Web-Based Applications</span>
            <span>/</span>
            <span>Module: Four Stages of Web App Dev</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stage 3: Implementation / Coding Phase
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Transforming design blueprints into robust executable code: Front-End UI scripting, 
            Middle-Tier Java Servlet logic, JDBC PreparedStatement database transactions, and secure coding standards.
          </p>
        </div>

        {/* Interactive 3-Tier Code Pipeline Inspector */}
        <CodePipelineInspector />

        {/* Security Spotlight: SQL Injection vs PreparedStatements */}
        <SecuritySpotlight />

        {/* Core CBSE Theoretical Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
              <Terminal className="w-5 h-5" />
              <h4>JDBC Methods: `executeUpdate` vs `executeQuery`</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Java database programming (`java.sql.*`), developers must choose the correct execution method based on SQL query type:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• <strong className="text-emerald-300">executeUpdate():</strong> Used for `INSERT`, `UPDATE`, `DELETE`, and DDL statements. Returns an <code className="text-purple-300 font-mono">int</code> representing affected row count.</li>
              <li>• <strong className="text-sky-300">executeQuery():</strong> Used for `SELECT` queries. Returns a <code className="text-purple-300 font-mono">ResultSet</code> object that allows row-by-row data reading via <code className="text-slate-300">rs.next()</code>.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-lg">
              <FileCode className="w-5 h-5" />
              <h4>Clean Code Standards & Modularity</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Writing production-ready software requires strict adherence to naming conventions (camelCase methods, PascalCase classes), modular separation of concerns, comprehensive error logging, and Git version control.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
              <span className="text-purple-300 font-semibold">Stage 3 Deliverable:</span> Fully integrated executable code repository tested with unit tests and ready for Stage 4 QA validation.
            </div>
          </div>
        </div>

        {/* Interactive MCQ Practice Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <CheckSquare className="w-3.5 h-3.5" /> Self-Assessment Challenge
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Topic 3 Mastery Quiz (25 MCQs)</h3>
              <p className="text-sm text-slate-400">Test your knowledge of Stage 3 Implementation, JDBC, PreparedStatements, and Front-End/Back-End coding.</p>
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
                        btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold ring-1 ring-emerald-500";
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
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25'
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
          title="Frequently Asked Questions: Stage 3 Implementation & Coding"
          faqs={[
            {
              question: "What is the key input required before programmers begin coding in Stage 3?",
              answer: "The approved Design Document Specification (DDS), which contains the UI wireframes, Entity-Relationship schemas, normalized tables, class diagrams, and process flowcharts."
            },
            {
              question: "How do PreparedStatements prevent SQL Injection attacks?",
              answer: "PreparedStatements pre-compile the SQL template and treat input values bound to '?' placeholders strictly as literal data rather than executable SQL syntax."
            },
            {
              question: "What is the difference between executeUpdate() and executeQuery() in JDBC?",
              answer: "executeUpdate() is used for DML/DDL commands (INSERT, UPDATE, DELETE) and returns an integer count of modified rows. executeQuery() is used for SELECT statements and returns a ResultSet object containing queried rows."
            }
          ]}
        />

        {/* Printable Note Section */}
        <PlainTextPrint 
          title="CBSE Class 12 IT 802: Topic 3 - Stage 3: Implementation Phase Notes"
          content={noteText}
        />

        {/* Teacher Sukanta Hui note card */}
        <Teacher 
          topicName="Stage 3: Implementation & Coding Phase"
          unitName="Four Stages of Web Application Development"
        />

      </div>
    </div>
  );
}
