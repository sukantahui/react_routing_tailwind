import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight, Code, Shield, AlertTriangle, CheckCircle, XCircle, Braces, Lock, Eye, Zap } from "lucide-react";
import { useParams } from "react-router-dom";

const Topic12 = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode as default
  const [activeSection, setActiveSection] = useState('basics');
  const [currentExample, setCurrentExample] = useState(0);
  const [showDangers, setShowDangers] = useState(false);
  const { moduleSlug, topicIndex } = useParams();
  const currentIndex = Number(topicIndex);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const embeddingBasics = {
    title: "The Power of {} in JSX",
    description: "Curly braces are React's portal between JSX and JavaScript. They let you embed dynamic values, but must be used safely.",
    analogy: "Like windows in a house - they let you see outside, but need proper framing.",
    rules: [
      "Only expressions (not statements) inside {}",
      "Automatic escaping of dangerous content",
      "Type conversion happens automatically",
      "Null/undefined become empty strings"
    ]
  };

  const safeEmbeddingExamples = [
    {
      title: "Variables",
      code: `const studentName = 'Swadeep'
const age = 18

return (
  <div>
    <h1>Welcome, {studentName}!</h1>
    <p>Age: {age}</p>
    <p>Next year: {age + 1}</p>
  </div>
)`,
      safety: "✅ Safe - values are automatically escaped",
      explanation: "Variables and simple calculations are always safe"
    },
    {
      title: "Object Properties",
      code: `const student = {
  name: 'Tuhina',
  grades: { math: 85, science: 92 }
}

return (
  <div>
    <p>Name: {student.name}</p>
    <p>Math Grade: {student.grades.math}</p>
    {/* Optional chaining for safety */}
    <p>History: {student.grades?.history || 'N/A'}</p>
  </div>
)`,
      safety: "✅ Safe - property access is escaped",
      explanation: "Nested properties work, optional chaining prevents errors"
    },
    {
      title: "Function Calls",
      code: `function formatGrade(score) {
  return score >= 90 ? 'A' : 'B'
}

const scores = [85, 92, 78]

return (
  <div>
    <p>Formatted: {formatGrade(85)}</p>
    <p>Average: {
      scores.reduce((a, b) => a + b) / scores.length
    }</p>
  </div>
)`,
      safety: "✅ Safe - function return values are escaped",
      explanation: "Any function that returns a value can be embedded"
    },
    {
      title: "Conditional Expressions",
      code: `const isPresent = true
const score = 85

return (
  <div>
    <p>Status: {isPresent ? 'Present ✓' : 'Absent ✗'}</p>
    <p>Result: {score > 50 ? 'Pass' : 'Fail'}</p>
    {/* Logical AND for conditional rendering */}
    {isPresent && <AttendanceBadge />}
  </div>
)`,
      safety: "✅ Safe - expressions evaluate to values",
      explanation: "Ternary and logical operators are expressions, not statements"
    }
  ];

  const dangerousPatterns = [
    {
      danger: "Direct HTML Injection",
      code: `// ❌ DANGEROUS - Never do this!
const userInput = '<script>alert("hacked")</script>'
return <div>{userInput}</div>`,
      safeVersion: `// ✅ SAFE - React escapes automatically
const userInput = '<script>alert("hacked")</script>'
return <div>{userInput}</div>`,
      risk: "XSS attack if React didn't escape",
      protection: "React automatically escapes HTML in {}"
    },
    {
      danger: "dangerouslySetInnerHTML",
      code: `// ❌ RISKY - Only use with trusted content
const htmlContent = '<b>Bold text</b>'
return <div dangerouslySetInnerHTML={{__html: htmlContent}} />`,
      safeVersion: `// ✅ SAFER - Use JSX instead
const htmlContent = '<b>Bold text</b>'
// Convert to JSX structure
return <div><b>Bold text</b></div>`,
      risk: "Potential XSS if content is untrusted",
      protection: "Avoid dangerouslySetInnerHTML unless absolutely necessary"
    },
    {
      danger: "eval() in JSX",
      code: `// ❌ EXTREMELY DANGEROUS
const code = '2 + 2'
return <div>{eval(code)}</div>`,
      safeVersion: `// ✅ SAFE - Calculate normally
const result = 2 + 2
return <div>{result}</div>`,
      risk: "Code injection, security vulnerabilities",
      protection: "Never use eval(), especially with user input"
    },
    {
      danger: "Unsanitized User Input",
      code: `// ❌ DANGEROUS - User can inject scripts
const comment = userInput // From form
return <div className="comment">{comment}</div>`,
      safeVersion: `// ✅ SAFE - React escapes, but validate anyway
const comment = sanitize(userInput) // Clean first
return <div className="comment">{comment}</div>`,
      risk: "XSS, data corruption",
      protection: "Always sanitize user input on the server"
    }
  ];

  const escapingBehavior = [
    {
      input: "<script>alert('xss')</script>",
      output: "&lt;script&gt;alert('xss')&lt;/script&gt;",
      visible: "<script>alert('xss')</script>",
      explanation: "HTML tags are converted to HTML entities"
    },
    {
      input: "John & Jane",
      output: "John &amp; Jane",
      visible: "John & Jane",
      explanation: "Special characters are escaped"
    },
    {
      input: '"Quotes" and \'apostrophes\'',
      output: "&quot;Quotes&quot; and &#39;apostrophes&#39;",
      visible: "\"Quotes\" and 'apostrophes'",
      explanation: "Quotes are escaped to prevent attribute injection"
    },
    {
      input: "Line 1\nLine 2",
      output: "Line 1\nLine 2",
      visible: "Line 1 Line 2",
      explanation: "Newlines are preserved but need <br> for HTML breaks"
    }
  ];

  const safePatterns = [
    {
      pattern: "Template Literals",
      code: `const firstName = 'Abhronila'
const lastName = 'Das'
return <h1>{\`\${firstName} \${lastName}\`}</h1>`,
      useCase: "Combining multiple variables",
      safety: "✅ Safe - evaluated before embedding"
    },
    {
      pattern: "Array Methods",
      code: `const students = ['Swadeep', 'Tuhina', 'Debangshu']
return (
  <ul>
    {students.map((name, index) => (
      <li key={index}>{name}</li>
    ))}
  </ul>
)`,
      useCase: "Rendering lists from data",
      safety: "✅ Safe - each item is individually escaped"
    },
    {
      pattern: "Conditional Classes",
      code: `const isActive = true
const hasError = false
return (
  <div className={\`
    button 
    \${isActive ? 'active' : ''}
    \${hasError ? 'error' : ''}
  \`}>
    Click me
  </div>
)`,
      useCase: "Dynamic styling",
      safety: "✅ Safe - class names are safe strings"
    },
    {
      pattern: "Number Formatting",
      code: `const price = 99.99
const quantity = 5
return (
  <div>
    <p>Total: {\`\$\${(price * quantity).toFixed(2)}\`}</p>
    <p>Items: {quantity.toString().padStart(3, '0')}</p>
  </div>
)`,
      useCase: "Formatting numbers for display",
      safety: "✅ Safe - numbers become strings automatically"
    }
  ];

  const studentScenarios = [
    {
      student: "Swadeep",
      project: "School Portal Comments",
      problem: "Students can post comments that might contain HTML",
      solution: "React auto-escapes, but also sanitize on backend",
      code: `// Frontend - React handles escaping
function Comment({ text }) {
  return <div className="comment">{text}</div>
}

// Backend - Additional protection
function saveComment(comment) {
  const sanitized = comment
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  database.save(sanitized)
}`
    },
    {
      student: "Tuhina",
      project: "Library Book Descriptions",
      problem: "Book descriptions from database might have special characters",
      solution: "Trust React's escaping, validate data source",
      code: `function BookDescription({ description }) {
  // React automatically escapes HTML
  return (
    <div className="description">
      {description}
      {/* For line breaks, use CSS or split */}
      {description.split('\\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )
}`
    },
    {
      student: "Abhronila",
      project: "Quiz Platform",
      problem: "Displaying user-generated quiz questions safely",
      solution: "Use React's escaping, never dangerouslySetInnerHTML",
      code: `function QuizQuestion({ question, options }) {
  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            {/* Safe - React escapes option text */}
            <label>
              <input type="radio" name="answer" />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}`
    }
  ];

  const securityBestPractices = [
    {
      practice: "Never Trust Client-Side",
      reason: "Users can bypass frontend validation",
      implementation: "Always validate and sanitize on server",
      example: "Express.js middleware to clean input"
    },
    {
      practice: "Use Content Security Policy",
      reason: "Adds extra layer of protection",
      implementation: "Configure CSP headers",
      example: "script-src 'self'; object-src 'none'"
    },
    {
      practice: "Validate Input Types",
      reason: "Ensure data matches expected format",
      implementation: "Use PropTypes or TypeScript",
      example: "PropTypes.string for text props"
    },
    {
      practice: "Escape Before Storage",
      reason: "Protect database and other systems",
      implementation: "Sanitize before saving to DB",
      example: "Replace < with &lt; in user content"
    }
  ];

  const debuggingExamples = [
    {
      issue: "HTML Showing as Text",
      code: `const content = '<strong>Important</strong>'
return <div>{content}</div>`,
      result: "Shows: <strong>Important</strong>",
      fix: "This is CORRECT - React is protecting you",
      explanation: "React escapes HTML to prevent XSS"
    },
    {
      issue: "Missing Line Breaks",
      code: `const text = 'Line 1\\nLine 2'
return <div>{text}</div>`,
      result: "Shows: Line 1 Line 2",
      fix: `text.split('\\n').map((line, i) => <p key={i}>{line}</p>)`,
      explanation: "HTML ignores newlines, need <br> or separate elements"
    },
    {
      issue: "Undefined Showing",
      code: `const user = null
return <div>Welcome, {user.name}</div>`,
      result: "Error: Cannot read property 'name' of null",
      fix: `{user?.name || 'Guest'}`,
      explanation: "Use optional chaining and default values"
    }
  ];

  const sections = [
    { id: 'basics', label: 'Embedding Basics', icon: '📚' },
    { id: 'safe', label: 'Safe Examples', icon: '✅' },
    { id: 'danger', label: 'Danger Patterns', icon: '⚠️' },
    { id: 'escaping', label: 'Escaping Behavior', icon: '🛡️' },
    { id: 'patterns', label: 'Safe Patterns', icon: '🎯' },
    { id: 'security', label: 'Security Practices', icon: '🔒' }
  ];

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
    )}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 12: Embedding JavaScript in JSX Safely</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-300 dark:border-gray-600"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-16 animate-[fadeIn_0.8s_ease-out]">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 border border-gray-700">
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-3xl text-white mr-6">
                  🛡️
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Safe JavaScript Embedding
                  </h2>
                  <p className="text-xl text-gray-300">
                    How React protects you from XSS while letting you embed dynamic content
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                When Debangshu from Ichapur lets students post comments on his school portal, 
                he needs to ensure safety. React's {} braces automatically escape HTML, but understanding 
                the limits of this protection is crucial for building secure applications.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Automatic Escaping
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Safe Patterns
                </span>
                <span className="px-4 py-2 bg-red-900/30 text-red-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Danger Zones
                </span>
                <span className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Security Best Practices
                </span>
              </div>
            </div>
            
            {/* Animated Safety Shield */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="200" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                <circle cx="100" cy="70" r="40" fill="none" stroke="#10B981" strokeWidth="3">
                  <animate attributeName="stroke-dasharray" from="0, 251" to="251, 0" dur="3s" repeatCount="indefinite" />
                </circle>
                <path d="M100,40 L110,60 L130,65 L115,80 L120,100 L100,90 L80,100 L85,80 L70,65 L90,60 Z" 
                      fill="none" stroke="#3B82F6" strokeWidth="2">
                  <animate attributeName="opacity" from="0.3" to="1" dur="2s" repeatCount="indefinite" />
                </path>
                <text x="100" y="120" textAnchor="middle" fontSize="12" fill="#EF4444">Safe {`{ }`}</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="mb-8 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex overflow-x-auto space-x-2 pb-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={clsx(
                  "flex items-center px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-300",
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                )}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowDangers(!showDangers)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium flex items-center",
                showDangers 
                  ? "bg-red-900/30 text-red-300 border border-red-800"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              )}
            >
              <AlertTriangle size={16} className="mr-2" />
              {showDangers ? "Hide Danger Examples" : "Show Danger Examples"}
            </button>
          </div>
        </section>

        {/* Embedding Basics Section */}
        {activeSection === 'basics' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  How {} Works in JSX
                </h2>
                <p className="text-gray-400 mt-2">
                  Understanding React's automatic protection system
                </p>
              </div>
            </div>

            {/* Core Concept */}
            <div className={clsx(
              "rounded-xl p-8 mb-8",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                  <span className="text-3xl">{`{ }`}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{embeddingBasics.title}</h3>
                <p className="text-gray-400 italic mb-4">"{embeddingBasics.analogy}"</p>
                <p className="text-gray-300 max-w-3xl mx-auto">{embeddingBasics.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-4 flex items-center">
                    <CheckCircle size={20} className="text-green-400 mr-2" />
                    What Happens Automatically:
                  </h4>
                  <ul className="space-y-3">
                    {embeddingBasics.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-green-300 text-sm">✓</span>
                        </div>
                        <span className="text-gray-300">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-200 mb-4 flex items-center">
                    <Zap size={20} className="text-yellow-400 mr-2" />
                    The Protection Process:
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                          1
                        </div>
                        <h5 className="font-semibold text-blue-300">Value Insertion</h5>
                      </div>
                      <p className="text-gray-400 text-sm">JavaScript expression is evaluated</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                          2
                        </div>
                        <h5 className="font-semibold text-green-300">Automatic Escaping</h5>
                      </div>
                      <p className="text-gray-400 text-sm">HTML special characters are converted</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                          3
                        </div>
                        <h5 className="font-semibold text-purple-300">Safe Insertion</h5>
                      </div>
                      <p className="text-gray-400 text-sm">Escaped value is inserted into DOM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Flow */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">The Safety Flow Visualization</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Your Code</h4>
                  <div className="p-3 rounded bg-gray-900">
                    <code className="text-sm text-blue-300">{`<div>{userInput}</div>`}</code>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="text-3xl">➡️</div>
                    <div className="text-gray-500 text-sm mt-2">React processes</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Auto-Escaping</h4>
                  <div className="p-3 rounded bg-gray-900">
                    <code className="text-sm text-yellow-300">{"< → &lt;"}</code>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="text-3xl">➡️</div>
                    <div className="text-gray-500 text-sm mt-2">becomes</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🖥️</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Safe Output</h4>
                  <div className="p-3 rounded bg-gray-900">
                    <code className="text-sm text-green-300">{`&lt;script&gt;...&lt;/script&gt;`}</code>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Key Insight for Students:</h4>
                <p className="text-gray-400 text-sm">
                  When Swadeep sees HTML tags displayed as text instead of rendered, that's not a bug - 
                  that's React protecting his application. The braces {} are like a security checkpoint 
                  that scans everything passing through.
                </p>
              </div>
            </div>

            {/* Mental Model */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Mental Model: What Actually Happens</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">What You Write:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`const message = '<b>Hello</b>'
return <div>{message}</div>`}</pre>
                  <p className="text-gray-400 text-sm mt-2">You think: "Show bold text"</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">What React Does:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`// 1. Escape the content
const escaped = message
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
// Result: '&lt;b&gt;Hello&lt;/b&gt;'

// 2. Create element
React.createElement('div', null, escaped)`}</pre>
                  <p className="text-gray-400 text-sm mt-2">Reality: "Show text that looks like HTML"</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Teaching This Concept:</h4>
                <p className="text-gray-400 text-sm">
                  For students in Barrackpore: Use the "restaurant kitchen" analogy. Raw ingredients (user input) 
                  go through a sanitization station ({}) before being served. Some ingredients need special handling 
                  (dangerouslySetInnerHTML) and require chef supervision (explicit developer approval).
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Safe Examples Section */}
        {activeSection === 'safe' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Safe Embedding Examples
                </h2>
                <p className="text-gray-400 mt-2">
                  What works perfectly and why it's safe
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {safeEmbeddingExamples.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentExample(index)}
                      className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                        currentExample === index
                          ? "bg-green-600 text-white scale-110"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                  Example {currentExample + 1} of {safeEmbeddingExamples.length}
                </div>
              </div>
            </div>

            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-xl mr-4">
                  {currentExample + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-100">
                    {safeEmbeddingExamples[currentExample].title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center px-3 py-1 rounded-full bg-green-900/30">
                      <CheckCircle size={14} className="text-green-300 mr-2" />
                      <span className="text-green-300 text-sm">Safe Pattern</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">Code Example:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
                    {safeEmbeddingExamples[currentExample].code}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">Safety Analysis:</h4>
                    <p className="text-gray-400">{safeEmbeddingExamples[currentExample].safety}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {safeEmbeddingExamples[currentExample].explanation}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">Why This is Safe:</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      {currentExample === 0 && (
                        <>
                          <li>• Variables are evaluated to primitive values</li>
                          <li>• Calculations produce numbers/strings</li>
                          <li>• All output is automatically escaped</li>
                        </>
                      )}
                      {currentExample === 1 && (
                        <>
                          <li>• Property access returns values</li>
                          <li>• Optional chaining prevents runtime errors</li>
                          <li>• Nested objects are safely traversed</li>
                        </>
                      )}
                      {currentExample === 2 && (
                        <>
                          <li>• Functions must return values (expressions)</li>
                          <li>• Array methods produce new arrays</li>
                          <li>• All return values are escaped</li>
                        </>
                      )}
                      {currentExample === 3 && (
                        <>
                          <li>• Ternary operator is an expression</li>
                          <li>• Logical AND returns the right side or false</li>
                          <li>• Both are valid JavaScript expressions</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Student Exercise:</h4>
                <p className="text-gray-400 text-sm">
                  Create a component that uses this pattern with your own data. For students in Naihati: 
                  Use your classmates' names and grades. Test what happens if you try to embed HTML - 
                  you'll see it gets displayed as text, not rendered.
                </p>
              </div>
            </div>

            {/* Safe Embedding Principles */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Principles of Safe Embedding</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    principle: "Expression Only",
                    description: "Only JavaScript expressions work in {}",
                    icon: "💡",
                    color: "from-blue-600 to-cyan-600"
                  },
                  {
                    principle: "Auto-Escape",
                    description: "HTML tags become safe text",
                    icon: "🛡️",
                    color: "from-green-600 to-emerald-700"
                  },
                  {
                    principle: "Type Safety",
                    description: "Numbers, booleans convert to strings",
                    icon: "🔒",
                    color: "from-purple-600 to-pink-600"
                  },
                  {
                    principle: "Null Safety",
                    description: "null/undefined become empty strings",
                    icon: "⚠️",
                    color: "from-yellow-600 to-orange-600"
                  }
                ].map((principle, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-5 transition-all duration-300 hover:scale-[1.02]",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:shadow-lg"
                    )}
                  >
                    <div className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4",
                      `bg-gradient-to-br ${principle.color}`
                    )}>
                      {principle.icon}
                    </div>
                    <h4 className="font-semibold text-gray-200 mb-2">{principle.principle}</h4>
                    <p className="text-gray-400 text-sm">{principle.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">Golden Rule for Students:</h4>
                <p className="text-gray-400 text-sm">
                  If your embedded JavaScript produces a value (string, number, boolean, array, object), 
                  it will be safely displayed. If it tries to perform an action (if, for, variable declaration), 
                  it will fail. This constraint is your protection.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Danger Patterns Section */}
        {activeSection === 'danger' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Danger Zones & Anti-Patterns
                </h2>
                <p className="text-gray-400 mt-2">
                  What to avoid and why - with safer alternatives
                </p>
              </div>
            </div>

            {showDangers && (
              <div className="space-y-6 mb-8">
                {dangerousPatterns.map((danger, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-xl p-6 transition-all duration-300",
                      "border border-red-800",
                      "bg-gradient-to-br from-gray-800 to-gray-900",
                      "hover:shadow-lg hover:border-red-700"
                    )}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-300">{danger.danger}</h3>
                        <p className="text-gray-500">High-risk pattern to avoid</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <XCircle size={16} className="text-red-400 mr-2" />
                          <h4 className="font-semibold text-red-300">Dangerous Pattern:</h4>
                        </div>
                        <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                          <pre className="text-sm text-red-300 overflow-x-auto">
                            {danger.code}
                          </pre>
                        </div>
                        
                        <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                          <h4 className="font-semibold text-gray-200 mb-1">Risk:</h4>
                          <p className="text-gray-400 text-sm">{danger.risk}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <CheckCircle size={16} className="text-green-400 mr-2" />
                          <h4 className="font-semibold text-green-300">Safe Alternative:</h4>
                        </div>
                        <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                          <pre className="text-sm text-green-300 overflow-x-auto">
                            {danger.safeVersion}
                          </pre>
                        </div>
                        
                        <div className="mt-4 p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                          <h4 className="font-semibold text-blue-300 mb-1">Protection:</h4>
                          <p className="text-gray-400 text-sm">{danger.protection}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Real-World Impact */}
                    <div className="mt-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                      <h4 className="font-semibold text-yellow-300 mb-2">Real-World Impact:</h4>
                      <p className="text-gray-400 text-sm">
                        {index === 0 && "If React didn't escape HTML, a malicious user could steal session cookies or redirect users."}
                        {index === 1 && "Many React security vulnerabilities come from misuse of dangerouslySetInnerHTML."}
                        {index === 2 && "eval() can execute arbitrary code - a massive security hole in any application."}
                        {index === 3 && "Unsanitized user input is the #1 cause of web application security breaches."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* dangerouslySetInnerHTML Deep Dive */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-yellow-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-yellow-300">
                dangerouslySetInnerHTML: When (Not) To Use It
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">❌ Bad Use Cases:</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <XCircle size={16} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                      <span>User-generated content (comments, posts)</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle size={16} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                      <span>Content from untrusted APIs</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle size={16} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                      <span>Dynamic HTML from user input</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle size={16} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                      <span>Any content you don't 100% control</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">✅ Acceptable Use Cases:</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span>Hardcoded, trusted HTML snippets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-3 mt=1 flex-shrink-0" />
                      <span>HTML from your own CMS that you sanitize</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-3 mt=1 flex-shrink-0" />
                      <span>WYSIWYG editor output (with server-side sanitization)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-3 mt=1 flex-shrink-0" />
                      <span>Third-party widgets you explicitly trust</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Safe Usage Pattern */}
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <h4 className="font-semibold text-gray-200 mb-3">If You MUST Use It:</h4>
                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`// 1. Sanitize on server
import DOMPurify from 'dompurify'

// 2. Sanitize before using
const cleanHTML = DOMPurify.sanitize(userContent, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href', 'target']
})

// 3. Use with extreme caution
return (
  <div 
    dangerouslySetInnerHTML={{__html: cleanHTML}}
    // 4. Add additional protections
    className="user-content"
  />
)`}</pre>
                <div className="mt-3 text-gray-400 text-sm">
                  <p>Always use a library like DOMPurify. Never write your own sanitizer.</p>
                </div>
              </div>
            </div>

            {/* XSS Demonstration */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-red-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-red-300">XSS Attack Demonstration</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">The Attack:</h4>
                  <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                    <pre className="text-sm text-red-300">
{`// Malicious user inputs this as a "comment":
<img src="x" onerror="stealCookies()" />

// Without React's protection, this would:
// 1. Create an image element
// 2. Trigger onerror when image fails to load
// 3. Execute stealCookies() function
// 4. Send user's cookies to attacker`}</pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">React's Defense:</h4>
                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <pre className="text-sm text-green-300">
{`// What actually happens with React:
const userInput = '<img src="x" onerror="stealCookies()" />'

// React escapes it to:
// &lt;img src=&quot;x&quot; onerror=&quot;stealCookies()&quot; /&gt;

// Which renders as plain text:
// <img src="x" onerror="stealCookies()" />

// The attack is neutralized!`}</pre>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">Teaching This to Students:</h4>
                  <p className="text-gray-400 text-sm">
                    Show students in Shyamnagar what happens when you bypass React's protection. 
                    Create a controlled demo where dangerouslySetInnerHTML allows an XSS attack 
                    (in a sandboxed environment). The visual impact of seeing an attack work 
                    makes the security lesson memorable.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Escaping Behavior Section */}
        {activeSection === 'escaping' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
                <Lock size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Automatic Escaping Behavior
                </h2>
                <p className="text-gray-400 mt-2">
                  Exactly how React transforms potentially dangerous content
                </p>
              </div>
            </div>

            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Character Escaping Reference</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">Input Character</th>
                      <th className="text-left py-3 px-4 text-gray-300">HTML Entity</th>
                      <th className="text-left py-3 px-4 text-gray-300">What You See</th>
                      <th className="text-left py-3 px-4 text-gray-300">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {escapingBehavior.map((row, index) => (
                      <tr 
                        key={index}
                        className={clsx(
                          "border-b border-gray-800 hover:bg-gray-800/30",
                          "transition-colors duration-200"
                        )}
                      >
                        <td className="py-3 px-4">
                          <code className="text-red-300 font-mono">{row.input}</code>
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-green-300 font-mono">{row.output}</code>
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-blue-300 font-mono">{row.visible}</code>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{row.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Why This Matters:</h4>
                <p className="text-gray-400 text-sm">
                  When Abhronila from Barrackpore sees &lt;script&gt; in her quiz app comments, 
                  she knows React has neutralized a potential attack. The characters are still there, 
                  but they're harmless text instead of executable code. This automatic conversion 
                  happens for every value inside {}.
                </p>
              </div>
            </div>

            {/* Escaping Demonstration */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Live Escaping Demonstration</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Original</h4>
                  <div className="p-3 rounded bg-gray-900">
                    <code className="text-sm text-red-300">
                      {'<a href="#" onclick="bad()">Click</a>'}
                    </code>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">React Processes</h4>
                  <div className="p-3 rounded bg-gray-900">
                    <code className="text-sm text-yellow-300">
                      escapeHTML(input)
                    </code>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🖥️</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Rendered Output</h4>
                  <div className="p-3 rounded bg-gray-900">
                    <code className="text-sm text-green-300">
                      &lt;a href=&quot;#&quot; onclick=&quot;bad()&quot;&gt;Click&lt;/a&gt;
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <h4 className="font-semibold text-gray-200 mb-3">The Escape Function (Simplified):</h4>
                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// React calls this automatically for all {} content`}</pre>
              </div>
            </div>

            {/* What Gets Escaped */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">What About Other Contexts?</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Attributes Are Also Escaped:</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`const userClass = 'normal" onclick="alert(1)'
return <div className={userClass}>Content</div>`}</pre>
                      <p className="text-gray-400 text-sm mt-2">Attribute values are escaped too</p>
                    </div>
                    <div>
                      <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                        <p className="text-gray-400 text-sm">
                          Becomes: <code className="text-green-300">class="normal&amp;quot; onclick=&amp;quot;alert(1)"</code>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Style Attribute is Special:</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`const color = 'red; background: url("attack")'
return <div style={{ color }}>Text</div>`}</pre>
                      <p className="text-gray-400 text-sm mt-2">CSS values need their own validation</p>
                    </div>
                    <div>
                      <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                        <p className="text-gray-400 text-sm">
                          CSS injection is possible! Always validate style values.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">Complete Protection:</h4>
                  <p className="text-gray-400 text-sm">
                    React escapes content in these contexts: text content, attribute values, 
                    string children. It does NOT automatically escape: style values, href/src URLs, 
                    dangerouslySetInnerHTML content. For complete safety, validate all dynamic values.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Safe Patterns Section */}
        {activeSection === 'patterns' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
                <Eye size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Safe Embedding Patterns
                </h2>
                <p className="text-gray-400 mt-2">
                  Recommended patterns for common use cases
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {safePatterns.map((pattern, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    "border border-yellow-800",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg hover:border-yellow-700"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-300">{pattern.pattern}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Implementation:</h4>
                      <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                        {pattern.code}
                      </pre>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Use Case:</h4>
                      <p className="text-gray-400 text-sm">{pattern.useCase}</p>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-green-900/20 border border-green-800">
                      <CheckCircle size={16} className="text-green-300 mr-3" />
                      <span className="text-green-300 text-sm">{pattern.safety}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Scenarios */}
            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">Student Project Scenarios</h3>
              
              <div className="space-y-6">
                {studentScenarios.map((student, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-5",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:bg-gray-800/30"
                    )}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white mr-4">
                        <span className="font-bold">{student.student.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-100">{student.student}'s Project</h4>
                        <p className="text-gray-500">{student.project}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Security Concern:</h5>
                        <p className="text-gray-400 text-sm mb-3">{student.problem}</p>
                        <div className="p-3 rounded bg-red-900/20 border border-red-800">
                          <p className="text-gray-400 text-sm">
                            Without protection: Potential XSS attacks
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Safe Solution:</h5>
                        <p className="text-gray-400 text-sm mb-3">{student.solution}</p>
                        <div className="p-3 rounded bg-green-900/20 border border-green-800">
                          <p className="text-gray-400 text-sm">
                            With React + backend sanitization: Complete protection
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h5 className="font-semibold text-gray-200 mb-2">Implementation Code:</h5>
                      <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                        {student.code}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern Decision Guide */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Pattern Selection Guide</h3>
              
              <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-700">
                <div className="space-y-8">
                  {/* Level 1 */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      <span className="font-bold text-white">Need to display dynamic content?</span>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">what type of content?</div>
                  </div>
                  
                  {/* Level 2 */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 mb-2">
                        <span className="font-bold text-white">Simple Values</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Strings, numbers, booleans</p>
                      <code className="text-xs text-green-300 bg-black p-2 rounded block">
                        {`{variable}`}
                      </code>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-yellow-600 mb-2">
                        <span className="font-bold text-white">Lists/Arrays</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Multiple items</p>
                      <code className="text-xs text-yellow-300 bg-black p-2 rounded block">
                        {`{array.map(item => ...)}`}
                      </code>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 mb-2">
                        <span className="font-bold text-white">HTML Content</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">With formatting</p>
                      <code className="text-xs text-red-300 bg-black p-2 rounded block">
                        {`parse to JSX`}
                      </code>
                      <div className="text-gray-400 text-xs mt-2">Never dangerouslySetInnerHTML</div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">is content trusted?</div>
                  </div>
                  
                  {/* Level 3 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600">
                        <span className="font-bold text-white">Untrusted Content</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-gray-400 text-sm">✅ Use React's automatic escaping</div>
                        <div className="text-gray-400 text-sm">✅ Sanitize on server</div>
                        <div className="text-gray-400 text-sm">✅ Validate input format</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-600">
                        <span className="font-bold text-white">Trusted Content</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-gray-400 text-sm">✅ Still use automatic escaping</div>
                        <div className="text-gray-400 text-sm">✅ Consider JSX structure instead</div>
                        <div className="text-gray-400 text-sm">⚠️ Only use dangerouslySetInnerHTML if absolutely necessary</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">Student Decision Framework:</h4>
                <p className="text-gray-400 text-sm">
                  When Debangshu needs to display content, he asks: "Who created this?" 
                  If the answer is "a user" or "external API", he uses automatic escaping. 
                  If it's "me" or "our CMS", he still prefers automatic escaping but has more options. 
                  This simple question prevents security mistakes.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Security Practices Section */}
        {activeSection === 'security' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gray-900/30 flex items-center justify-center mr-4">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Security Best Practices
                </h2>
                <p className="text-gray-400 mt-2">
                  Beyond React: Complete application security
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {securityBestPractices.map((practice, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    "border border-gray-700",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg hover:border-green-700"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-green-300">{practice.practice}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Reason:</h4>
                      <p className="text-gray-400 text-sm">{practice.reason}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Implementation:</h4>
                      <p className="text-gray-400 text-sm">{practice.implementation}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Example:</h4>
                      <code className="text-gray-400 text-sm">{practice.example}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Security Stack */}
            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Complete Security Stack</h3>
              
              <div className="space-y-6">
                {[
                  {
                    layer: "Frontend (React)",
                    protections: ["Automatic escaping in {}", "PropTypes/TypeScript", "Input validation"],
                    responsibility: "First line of defense"
                  },
                  {
                    layer: "Backend API",
                    protections: ["Input sanitization", "Output encoding", "Rate limiting"],
                    responsibility: "Core security layer"
                  },
                  {
                    layer: "Database",
                    protections: ["Parameterized queries", "SQL injection prevention", "Data validation"],
                    responsibility: "Data integrity"
                  },
                  {
                    layer: "Infrastructure",
                    protections: ["CSP headers", "HTTPS enforcement", "WAF (Web Application Firewall)"],
                    responsibility: "Environment protection"
                  }
                ].map((layer, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-5",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:bg-gray-800/30"
                    )}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-100">{layer.layer}</h4>
                        <p className="text-gray-500">{layer.responsibility}</p>
                      </div>
                    </div>
                    
                    <div className="ml-14">
                      <h5 className="font-semibold text-gray-200 mb-2">Protections:</h5>
                      <ul className="space-y-2">
                        {layer.protections.map((protection, idx) => (
                          <li key={idx} className="flex items-center text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                            {protection}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Debugging Security Issues */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-yellow-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-yellow-300">Debugging Security Issues</h3>
              
              <div className="space-y-6">
                {debuggingExamples.map((example, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-5",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:bg-gray-800/30"
                    )}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-gray-200">{example.issue}</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Problem Code:</h5>
                        <pre className="text-sm text-gray-300 bg-black p-4 rounded">
                          {example.code}
                        </pre>
                        <div className="mt-3 p-3 rounded bg-gray-900 border border-gray-700">
                          <h5 className="font-semibold text-gray-200 mb-1">Actual Result:</h5>
                          <p className="text-gray-400 text-sm">{example.result}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Solution:</h5>
                        <div className="p-4 rounded-lg bg-green-900/20 border border-green-800 mb-3">
                          <pre className="text-sm text-green-300 overflow-x-auto">
                            {example.fix}
                          </pre>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                          <h5 className="font-semibold text-blue-300 mb-1">Explanation:</h5>
                          <p className="text-gray-400 text-sm">{example.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                <h4 className="font-semibold text-yellow-300 mb-2">Security Testing for Students:</h4>
                <p className="text-gray-400 text-sm">
                  Encourage students in Ichapur to test their applications: try entering 
                  <code className="text-yellow-300"> {'<script>alert("test")</script>'}</code> in forms. 
                  If they see an alert, they have a security hole. If they see the text displayed, 
                  React is protecting them. This hands-on testing builds security awareness.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Teacher's Note */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl",
            "border-l-4 border-blue-500",
            "bg-gradient-to-r from-gray-800 to-gray-900",
            "hover:from-gray-700 hover:to-gray-800"
          )}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl text-white">👨‍🏫</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-100 mr-4">
                    Teacher's Note
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-sm font-medium">
                    Sukanta Hui
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mr-3">🎯</span>
                      Teaching Security Mindset:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      When Tuhina builds her library portal, she focuses on features first: "Students can post book reviews." 
                      My job is to add: "...safely." That mindset shift—from "it works" to "it works securely"—is what separates 
                      amateur from professional developers. React's automatic escaping is a gift, but it's not a complete 
                      security solution. Students need to understand both its power and its limits.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Effective Security Teaching:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Show, don't just tell - demonstrate XSS in controlled environment</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Use the "security layers" analogy - React is one layer of armor</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Create safe/unsafe comparison - side-by-side code examples</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">4</span>
                          </div>
                          <span>Encourage testing - have students try to "break" each other's apps</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Student Misunderstandings:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"React makes my app 100% secure" (no single tool does)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"If HTML shows as text, my code is broken" (it's working correctly!)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"I need dangerouslySetInnerHTML for rich text" (use a Markdown parser)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Security is the backend team's job" (frontend has crucial responsibilities)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      27 Years of Security Teaching:
                    </h5>
                    <p className="text-gray-400">
                      I've taught security since the early days of the web. The principles never change: 
                      validate input, escape output, never trust the client. What changes is how frameworks 
                      implement these principles. React's automatic escaping is brilliant—it makes the safe 
                      path the default path. But like any safety feature, it can create complacency. 
                      Students see that HTML is escaped and think "I don't need to worry about security." 
                      Actually, they need to worry differently. Instead of escaping manually, they need to 
                      think about validation, sanitization, and defense in depth. The modern security mindset 
                      isn't about writing escape functions—it's about understanding the complete data flow 
                      through an application. When Swadeep builds his school portal, he needs to think: 
                      "Where does this data come from? Who controls it? Where does it go?" That holistic 
                      thinking is what I'm really teaching here.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching web security and defensive programming since 1997</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className={clsx(
            "rounded-2xl p-8",
            "bg-gradient-to-br from-gray-800 to-gray-900",
            "border border-gray-700"
          )}>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-100">
              📋 Topic 12 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Embed variables and expressions safely in JSX {}",
                "Understand React's automatic HTML escaping",
                "Recognize dangerous patterns like dangerouslySetInnerHTML",
                "Use safe alternatives to dangerous patterns",
                "Implement backend sanitization for user input",
                "Apply security best practices in student projects",
                "Debug common security-related rendering issues",
                "Explain XSS attacks and React's defenses",
                "Choose appropriate patterns for different content types",
                "Develop a holistic security mindset for applications"
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-start p-4 rounded-lg transition-all duration-300",
                    "border border-gray-700",
                    "hover:bg-gray-800",
                    "hover:shadow-md hover:border-green-700"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-green-300">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 pt-1">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/react-foundations/topic/Module1/13"
                className="inline-flex items-center gap-2
               px-6 py-3 rounded-lg
               bg-gradient-to-r from-blue-500 to-purple-600
               text-white font-medium"
              >
                Ready for Topic 13
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-sm text-gray-400">
                Next: Components in React: function-based components (React 19 standard)
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 12: Embedding JavaScript in JSX Safely</p>
            <p className="mt-2 text-sm">Building secure React applications with automatic protection</p>
          </div>
        </div>
      </footer>

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        .motion-safe {
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default Topic12;