import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight, Code, AlertTriangle, CheckCircle, XCircle, Braces, Hash, Filter, GitMerge } from "lucide-react";
import { useParams } from "react-router-dom";

const Topic11 = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode as default
  const [activeTab, setActiveTab] = useState('difference');
  const [currentExample, setCurrentExample] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);
  const { moduleSlug, topicIndex } = useParams();
  const currentIndex = Number(topicIndex);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const coreConcept = {
    title: "Expressions vs Statements",
    analogy: "Ingredients vs Recipe Steps",
    description: "Expressions produce values. Statements perform actions. JSX only accepts expressions.",
    examples: [
      {
        expression: "2 + 2",
        statement: "let x = 2 + 2;",
        explanation: "Expression evaluates to 4. Statement stores 4 in x."
      },
      {
        expression: "student.name",
        statement: "const student = { name: 'Swadeep' };",
        explanation: "Expression accesses value. Statement creates variable."
      },
      {
        expression: "isPresent ? 'Yes' : 'No'",
        statement: "if (isPresent) { return 'Yes'; } else { return 'No'; }",
        explanation: "Expression evaluates to string. Statement controls flow."
      }
    ]
  };

  const expressionVsStatement = [
    {
      category: "Definition",
      expression: "Produces a value",
      statement: "Performs an action",
      example: "5 + 3 produces 8",
      exampleStatement: "if (x > 5) performs check"
    },
    {
      category: "JSX Compatibility",
      expression: "✅ Allowed in {}",
      statement: "❌ Not allowed in {}",
      example: "{student.name} works",
      exampleStatement: "{let x = 5} fails"
    },
    {
      category: "Can Stand Alone",
      expression: "❌ Needs context",
      statement: "✅ Can stand alone",
      example: "2 + 2 needs assignment or use",
      exampleStatement: "console.log('hi') works alone"
    },
    {
      category: "Return Value",
      expression: "Always returns value",
      statement: "May or may not return",
      example: "Math.random() returns number",
      exampleStatement: "for loop returns undefined"
    },
    {
      category: "Mental Model",
      expression: "What is it? (Value)",
      statement: "What to do? (Action)",
      example: "'The result is 42'",
      exampleStatement: "'Calculate the result'"
    }
  ];

  const jsxExpressionExamples = [
    {
      title: "Variable References",
      code: `const student = 'Tuhina'
return <h1>{student}</h1>`,
      type: "Expression",
      why: "student evaluates to string value",
      output: "<h1>Tuhina</h1>"
    },
    {
      title: "Function Calls",
      code: `function formatName(first, last) {
  return \`\${first} \${last}\`
}
return <p>{formatName('Abhronila', 'Das')}</p>`,
      type: "Expression",
      why: "Function call returns value",
      output: "<p>Abhronila Das</p>"
    },
    {
      title: "Ternary Operator",
      code: `const isPresent = true
return <span>{isPresent ? '✓' : '✗'}</span>`,
      type: "Expression",
      why: "Ternary evaluates to value",
      output: "<span>✓</span>"
    },
    {
      title: "Array Methods",
      code: `const grades = [85, 92, 78]
return <p>Average: {grades.reduce((a, b) => a + b) / grades.length}</p>`,
      type: "Expression",
      why: "Method chain returns computed value",
      output: "<p>Average: 85</p>"
    }
  ];

  const forbiddenStatements = [
    {
      statement: "if/else",
      wrong: `<div>{if (isLoggedIn) <p>Welcome</p>}</div>`,
      right: `<div>{isLoggedIn ? <p>Welcome</p> : null}</div>`,
      reason: "if is a statement, not an expression",
      fix: "Use ternary operator or move logic outside JSX"
    },
    {
      statement: "for/while loops",
      wrong: `<ul>{for (let i = 0; i < 5; i++) <li>{i}</li>}</ul>`,
      right: `<ul>{Array(5).fill().map((_, i) => <li key={i}>{i}</li>)}</ul>`,
      reason: "Loops are statements that don't produce values",
      fix: "Use array methods or prepare data before JSX"
    },
    {
      statement: "Variable declarations",
      wrong: `<div>{const message = 'Hello'}</div>`,
      right: `const message = 'Hello'\nreturn <div>{message}</div>`,
      reason: "const/let/var are declaration statements",
      fix: "Declare variables outside JSX"
    },
    {
      statement: "switch statements",
      wrong: `<div>{switch(grade) { case 'A': return 'Excellent' }}</div>`,
      right: `<div>{grade === 'A' ? 'Excellent' : 'Good'}</div>`,
      reason: "switch is a complex statement",
      fix: "Use object lookup or multiple ternaries"
    }
  ];

  const expressionPatterns = [
    {
      pattern: "Immediately Invoked Function",
      code: `return <div>{
        (() => {
          const total = scores.reduce((a, b) => a + b)
          return \`Total: \${total}\`
        })()
      }</div>`,
      useCase: "Complex calculations that need temporary variables",
      warning: "Use sparingly - can make JSX hard to read"
    },
    {
      pattern: "Logical AND for conditional",
      code: `return <div>
        {isLoaded && <DataComponent />}
      </div>`,
      useCase: "Simple show/hide without else clause",
      warning: "Watch for falsy values (0, '', false)"
    },
    {
      pattern: "Object property access with optional chaining",
      code: `return <div>
        {student?.grades?.math || 'No grade'}
      </div>`,
      useCase: "Safe access to nested properties",
      warning: "|| operator for fallback values"
    },
    {
      pattern: "Template literals in expressions",
      code: `return <div className={\`card \${isActive ? 'active' : ''}\`}>
        {\`Student: \${firstName} \${lastName}\`}
      </div>`,
      useCase: "Dynamic strings with variables",
      warning: "Keep template literals simple"
    }
  ];

  const studentThinkingProcess = [
    {
      student: "Swadeep",
      problem: "Show different messages based on time",
      wrongThought: "I need if/else in my JSX",
      correctThought: "I need an expression that evaluates to different strings",
      solution: `const greeting = hour < 12 ? 'Good Morning' : 'Good Afternoon'
return <h1>{greeting}, Swadeep!</h1>`
    },
    {
      student: "Tuhina",
      problem: "Display list with conditional formatting",
      wrongThought: "I'll put a for loop in JSX",
      correctThought: "I'll prepare the data first, then map it",
      solution: `const formattedStudents = students.map(student => ({
        ...student,
        status: student.score > 50 ? 'Pass' : 'Fail'
      }))
      
      return (
        <ul>
          {formattedStudents.map(s => (
            <li className={s.status === 'Pass' ? 'pass' : 'fail'}>
              {s.name}: {s.status}
            </li>
          ))}
        </ul>
      )`
    },
    {
      student: "Abhronila",
      problem: "Calculate and display statistics",
      wrongThought: "I'll do calculations inside JSX",
      correctThought: "Calculate first, display results",
      solution: `const average = grades.reduce((a, b) => a + b) / grades.length
      const highest = Math.max(...grades)
      const lowest = Math.min(...grades)
      
      return (
        <div>
          <p>Average: {average.toFixed(1)}</p>
          <p>Highest: {highest}</p>
          <p>Lowest: {lowest}</p>
        </div>
      )`
    }
  ];

  const conversionTechniques = [
    {
      from: "if/else statement",
      to: "Ternary expression",
      example: `// Statement:
let message
if (score > 50) {
  message = 'Pass'
} else {
  message = 'Fail'
}

// Expression:
const message = score > 50 ? 'Pass' : 'Fail'`,
      tip: "Think: condition ? valueIfTrue : valueIfFalse"
    },
    {
      from: "for loop",
      to: "Array.map()",
      example: `// Statement:
const items = []
for (let i = 0; i < students.length; i++) {
  items.push(<li key={i}>{students[i]}</li>)
}

// Expression:
const items = students.map((student, i) => (
  <li key={i}>{student}</li>
))`,
      tip: "map() returns new array - perfect for JSX"
    },
    {
      from: "switch statement",
      to: "Object lookup",
      example: `// Statement:
let gradeText
switch(grade) {
  case 'A': gradeText = 'Excellent'; break
  case 'B': gradeText = 'Good'; break
  default: gradeText = 'Needs Improvement'
}

// Expression:
const gradeText = {
  'A': 'Excellent',
  'B': 'Good'
}[grade] || 'Needs Improvement'`,
      tip: "Objects as lookup tables work well in JSX"
    },
    {
      from: "Multiple ifs",
      to: "Logical operators",
      example: `// Statement:
if (isLoggedIn) {
  if (isAdmin) {
    return <AdminPanel />
  } else {
    return <UserPanel />
  }
} else {
  return <Login />
}

// Expression:
return isLoggedIn 
  ? (isAdmin ? <AdminPanel /> : <UserPanel />)
  : <Login />`,
      tip: "Nested ternaries for multiple conditions"
    }
  ];

  const debuggingExercises = [
    {
      code: `function StudentList({ students }) {
  return (
    <ul>
      {for (let i = 0; i < students.length; i++) {
        <li key={i}>{students[i].name}</li>
      }}
    </ul>
  )
}`,
      error: "for loop is a statement, not allowed in JSX",
      fix: "Use students.map() instead",
      fixedCode: `function StudentList({ students }) {
  return (
    <ul>
      {students.map((student, i) => (
        <li key={i}>{student.name}</li>
      ))}
    </ul>
  )
}`
    },
    {
      code: `function WelcomeMessage({ user }) {
  return (
    <div>
      {if (user) {
        <h1>Welcome back, {user.name}!</h1>
      } else {
        <h1>Please log in</h1>
      }}
    </div>
  )
}`,
      error: "if/else statement in JSX",
      fix: "Use ternary operator or move logic outside",
      fixedCode: `function WelcomeMessage({ user }) {
  return (
    <div>
      {user ? (
        <h1>Welcome back, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  )
}`
    },
    {
      code: `function Counter() {
  return (
    <div>
      {let count = 0}
      <button onClick={() => count++}>
        Count: {count}
      </button>
    </div>
  )
}`,
      error: "Variable declaration in JSX",
      fix: "Use useState hook for state",
      fixedCode: `function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}`
    }
  ];

  const tabs = [
    { id: 'difference', label: 'Core Difference', icon: '⚡' },
    { id: 'examples', label: 'JSX Expressions', icon: '💡' },
    { id: 'forbidden', label: 'Forbidden Statements', icon: '🚫' },
    { id: 'patterns', label: 'Expression Patterns', icon: '🎯' },
    { id: 'conversion', label: 'Conversion Guide', icon: '🔄' },
    { id: 'debugging', label: 'Debugging Practice', icon: '🐛' }
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
                <GitMerge size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 11: JSX Expressions vs Statements</p>
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
                  ⚡
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    The Great Divide: Expressions vs Statements
                  </h3>
                  <p className="text-xl text-gray-300">
                    Understanding what can go inside <code>{`{}`}</code> is the key to mastering JSX
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                When Abhronila from Barrackpore tries to use <code className="text-blue-300">if</code> inside her JSX, 
                React says no. When Swadeep uses <code className="text-green-300">?</code> instead, it works perfectly. 
                This single distinction—expressions vs statements—determines what works in JSX. 
                Master it, and you master React's rendering logic.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Core Concept
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Live Examples
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Conversion Techniques
                </span>
                <span className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Debugging Practice
                </span>
              </div>
            </div>
            
            {/* Animated Expression vs Statement */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="200" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                <rect x="30" y="30" width="70" height="40" rx="5" fill="none" stroke="#10B981" strokeWidth="2">
                  <animate attributeName="opacity" from="0.3" to="1" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="65" y="55" textAnchor="middle" fontSize="12" fill="#10B981">Expression</text>
                <text x="65" y="70" textAnchor="middle" fontSize="8" fill="#10B981">Produces Value</text>
                
                <rect x="100" y="30" width="70" height="40" rx="5" fill="none" stroke="#EF4444" strokeWidth="2">
                  <animate attributeName="opacity" from="1" to="0.3" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="135" y="55" textAnchor="middle" fontSize="12" fill="#EF4444">Statement</text>
                <text x="135" y="70" textAnchor="middle" fontSize="8" fill="#EF4444">Performs Action</text>
                
                <rect x="65" y="80" width="70" height="40" rx="5" fill="none" stroke="#3B82F6" strokeWidth="2">
                  <animate attributeName="width" from="70" to="100" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="100" y="105" textAnchor="middle" fontSize="12" fill="#3B82F6">JSX {`{ }`}</text>
                <text x="100" y="120" textAnchor="middle" fontSize="8" fill="#3B82F6">Accepts Expressions Only</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="mb-8 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex overflow-x-auto space-x-2 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex items-center px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                )}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Core Difference Section */}
        {activeTab === 'difference' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  The Fundamental Difference
                </h2>
                <p className="text-gray-400 mt-2">
                  Expressions produce values. Statements perform actions. JSX curly braces {} only accept expressions.
                </p>
              </div>
            </div>

            {/* Core Concept Card */}
            <div className={clsx(
              "rounded-xl p-8 mb-8",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{coreConcept.title}</h3>
                <p className="text-gray-400 italic">"{coreConcept.analogy}"</p>
                <p className="text-gray-300 mt-4 max-w-2xl mx-auto">{coreConcept.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {coreConcept.examples.map((example, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-6 transition-all duration-300",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:shadow-lg"
                    )}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-gray-100">Example {index + 1}</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <CheckCircle size={16} className="text-green-400 mr-2" />
                          <h5 className="font-semibold text-green-300">Expression:</h5>
                        </div>
                        <code className="text-sm text-green-300 bg-black/30 p-2 rounded block">
                          {example.expression}
                        </code>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <XCircle size={16} className="text-red-400 mr-2" />
                          <h5 className="font-semibold text-red-300">Statement:</h5>
                        </div>
                        <code className="text-sm text-red-300 bg-black/30 p-2 rounded block">
                          {example.statement}
                        </code>
                      </div>
                      
                      <div className="p-3 rounded bg-gray-800 border border-gray-700">
                        <p className="text-gray-400 text-sm">{example.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Detailed Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">Category</th>
                      <th className="text-left py-3 px-4 text-green-300">Expression</th>
                      <th className="text-left py-3 px-4 text-red-300">Statement</th>
                      <th className="text-left py-3 px-4 text-gray-300">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expressionVsStatement.map((row, index) => (
                      <tr 
                        key={index}
                        className={clsx(
                          "border-b border-gray-800 hover:bg-gray-800/30",
                          "transition-colors duration-200"
                        )}
                      >
                        <td className="py-3 px-4">
                          <div className="font-semibold text-gray-200">{row.category}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {row.expression.startsWith('✅') && (
                              <CheckCircle size={16} className="text-green-400 mr-2" />
                            )}
                            {row.expression.startsWith('❌') && (
                              <XCircle size={16} className="text-red-400 mr-2" />
                            )}
                            <span className={row.expression.startsWith('✅') ? 'text-green-300' : 'text-red-300'}>
                              {row.expression.replace('✅', '').replace('❌', '')}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {row.statement.startsWith('✅') && (
                              <CheckCircle size={16} className="text-green-400 mr-2" />
                            )}
                            {row.statement.startsWith('❌') && (
                              <XCircle size={16} className="text-red-400 mr-2" />
                            )}
                            <span className={row.statement.startsWith('✅') ? 'text-green-300' : 'text-red-300'}>
                              {row.statement.replace('✅', '').replace('❌', '')}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-400 text-sm">
                            <div className="mb-1">{row.example}</div>
                            <div>{row.exampleStatement}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">Mental Model for Students:</h4>
                <p className="text-gray-400 text-sm">
                  When Tuhina from Shyamnagar writes JSX, she asks: "Am I describing a value or giving instructions?" 
                  Values (expressions) go in {}. Instructions (statements) stay outside. This simple question 
                  prevents 90% of JSX syntax errors.
                </p>
              </div>
            </div>

            {/* Visualization */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">Visualizing the Flow</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Statements</h4>
                  <p className="text-gray-400 text-sm">Prepare data, set up logic</p>
                  <div className="mt-4 p-3 rounded bg-gray-900">
                    <code className="text-xs text-red-300">if, for, let, const</code>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="text-3xl">➡️</div>
                    <div className="text-gray-500 text-sm mt-2">compile time</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{`{ }`}</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">JSX Curly Braces</h4>
                  <p className="text-gray-400 text-sm">Accept expressions only</p>
                  <div className="mt-4 p-3 rounded bg-gray-900">
                    <code className="text-xs text-green-300">variables, functions, ternaries</code>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="text-3xl">➡️</div>
                    <div className="text-gray-500 text-sm mt-2">render time</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🖥️</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">Rendered Output</h4>
                  <p className="text-gray-400 text-sm">Final HTML with values</p>
                  <div className="mt-4 p-3 rounded bg-gray-900">
                    <code className="text-xs text-blue-300">&lt;div&gt;Hello&lt;/div&gt;</code>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-green-900/20 border border-green-800">
                <p className="text-gray-400 text-sm">
                  <strong>Key Insight:</strong> Statements happen BEFORE JSX rendering. Expressions happen DURING rendering. 
                  This timing difference explains why statements can't be in {} - they need to complete before React starts building the UI.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* JSX Expressions Section */}
        {activeTab === 'examples' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
                <Braces size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  JSX Expression Examples
                </h2>
                <p className="text-gray-400 mt-2">
                  What works inside {}. Each example shows a valid expression and why it's allowed.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {jsxExpressionExamples.map((_, index) => (
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
                
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </button>
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
                    {jsxExpressionExamples[currentExample].title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                      {jsxExpressionExamples[currentExample].type}
                    </span>
                    <span className="ml-3 text-gray-500">
                      Valid JSX expression
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">Code:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
                    {jsxExpressionExamples[currentExample].code}
                  </pre>
                  
                  <div className="mt-4 p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">Output:</h4>
                    <code className="text-green-300">
                      {jsxExpressionExamples[currentExample].output}
                    </code>
                  </div>
                </div>
                
                <div>
                  {showExplanation && (
                    <>
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-200 mb-2">Why This Works:</h4>
                        <p className="text-gray-400">
                          {jsxExpressionExamples[currentExample].why}
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                        <h4 className="font-semibold text-blue-300 mb-2">Expression Thinking:</h4>
                        <p className="text-gray-400 text-sm">
                          This works because it's asking "What is the value?" not "What should I do?". 
                          For students in Naihati: Think of expressions as completed calculations ready to display.
                        </p>
                      </div>
                      
                      <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
                        <h4 className="font-semibold text-green-300 mb-2">Try This Variation:</h4>
                        <p className="text-gray-400 text-sm">
                          Modify the code to use a different variable name or add a second expression. 
                          For example, add {`{student.toUpperCase()}`} to see how expressions can be chained.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Expression Categories */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Categories of Valid Expressions</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    category: "Literals",
                    examples: ["'Hello'", "42", "true", "[1,2,3]"],
                    color: "from-blue-600 to-cyan-600"
                  },
                  {
                    category: "Variables",
                    examples: ["student", "count", "isLoading"],
                    color: "from-purple-600 to-pink-600"
                  },
                  {
                    category: "Operations",
                    examples: ["a + b", "x > 5", "!isActive"],
                    color: "from-green-600 to-emerald-700"
                  },
                  {
                    category: "Function Calls",
                    examples: ["Math.max(a,b)", "formatDate(now)", "user.getName()"],
                    color: "from-yellow-600 to-orange-600"
                  },
                  {
                    category: "Ternary",
                    examples: ["x ? 'Yes' : 'No'", "isAdult ? 18 : 0"],
                    color: "from-red-600 to-pink-600"
                  },
                  {
                    category: "Array Methods",
                    examples: ["arr.map(x => x*2)", "list.filter(i => i)"],
                    color: "from-indigo-600 to-purple-600"
                  },
                  {
                    category: "Property Access",
                    examples: ["user.name", "scores[0]", "obj?.nested?.prop"],
                    color: "from-pink-600 to-rose-600"
                  },
                  {
                    category: "Template Literals",
                    examples: ["`Hello ${name}`", "`Score: ${score}/100`"],
                    color: "from-teal-600 to-emerald-600"
                  }
                ].map((cat, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:shadow-lg"
                    )}
                  >
                    <div className={clsx(
                      "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                      `bg-gradient-to-br ${cat.color}`
                    )}>
                      <span className="text-white font-bold">{cat.category.charAt(0)}</span>
                    </div>
                    <h4 className="font-semibold text-gray-200 mb-3">{cat.category}</h4>
                    <div className="space-y-1">
                      {cat.examples.map((ex, idx) => (
                        <code key={idx} className="block text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
                          {ex}
                        </code>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Rule of Thumb:</h4>
                <p className="text-gray-400 text-sm">
                  If you can imagine it on the right side of an equals sign (<code className="text-purple-300">const x = ???</code>), 
                  it's probably an expression. If you can't (like <code className="text-red-300">const x = if...</code>), 
                  it's a statement and won't work in JSX.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Forbidden Statements Section */}
        {activeTab === 'forbidden' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Forbidden in JSX: Common Statements
                </h2>
                <p className="text-gray-400 mt-2">
                  What doesn't work inside {}, and how to fix it. Learn from common student mistakes.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {forbiddenStatements.map((item, index) => (
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
                      <h3 className="text-xl font-semibold text-red-300">{item.statement} Statement</h3>
                      <p className="text-gray-500">{item.reason}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <XCircle size={16} className="text-red-400 mr-2" />
                        <h4 className="font-semibold text-red-300">Wrong (in JSX):</h4>
                      </div>
                      <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                        <pre className="text-sm text-red-300 overflow-x-auto">
                          {item.wrong}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <CheckCircle size={16} className="text-green-400 mr-2" />
                        <h4 className="font-semibold text-green-300">Right (expression):</h4>
                      </div>
                      <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                        <pre className="text-sm text-green-300 overflow-x-auto">
                          {item.right}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-2">Why This Fails:</h4>
                      <p className="text-gray-400 text-sm">{item.reason}</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-2">Fix Strategy:</h4>
                      <p className="text-gray-400 text-sm">{item.fix}</p>
                    </div>
                  </div>
                  
                  {/* Student Connection */}
                  <div className="mt-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                    <h4 className="font-semibold text-yellow-300 mb-2">Student Story:</h4>
                    <p className="text-gray-400 text-sm">
                      {index === 0 && "When Swadeep tried to use if in JSX for his attendance system, he got frustrated. He learned that ternary operators (?) give him the conditional rendering he needs."}
                      {index === 1 && "Tuhina wanted to loop through student records. Her for loop didn't work. She discovered array.map() and now her code is cleaner and more React-like."}
                      {index === 2 && "Abhronila declared a variable inside JSX for her quiz app. The error confused her until she realized variables must be declared before return."}
                      {index === 3 && "Debangshu from Ichapur used switch for grade letters. Converting to object lookup made his code more readable and JSX-compatible."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statement Recognition Exercise */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Can You Spot the Statements?</h3>
              
              <div className="space-y-6">
                {[
                  {
                    code: `function ProblemComponent() {
  return (
    <div>
      {let x = 5}
      <p>Value: {x}</p>
      {if (x > 3) {
        <span>Large</span>
      }}
    </div>
  )
}`,
                    statements: ["let x = 5", "if (x > 3) { ... }"],
                    explanation: "Both are statements. Declare x before return, use ternary for conditional."
                  },
                  {
                    code: `function LoopProblem() {
  const items = ['A', 'B', 'C']
  return (
    <ul>
      {for (let i = 0; i < items.length; i++) {
        <li key={i}>{items[i]}</li>
      }}
    </ul>
  )
}`,
                    statements: ["for (let i = 0; i < items.length; i++)"],
                    explanation: "for loop is a statement. Use items.map() instead."
                  },
                  {
                    code: `function SwitchProblem() {
  const grade = 'A'
  return (
    <div>
      {switch(grade) {
        case 'A': return 'Excellent'
        default: return 'Good'
      }}
    </div>
  )
}`,
                    statements: ["switch(grade) { ... }"],
                    explanation: "switch statement. Use object lookup or ternary."
                  }
                ].map((exercise, exIndex) => (
                  <div 
                    key={exIndex}
                    className={clsx(
                      "rounded-lg p-5",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:bg-gray-800/30"
                    )}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                        {exIndex + 1}
                      </div>
                      <h4 className="font-semibold text-gray-200">Exercise {exIndex + 1}</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Problem Code:</h5>
                        <pre className="text-sm text-gray-300 bg-black p-4 rounded">
                          {exercise.code}
                        </pre>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Statements in JSX:</h5>
                        <ul className="space-y-2 mb-4">
                          {exercise.statements.map((stmt, idx) => (
                            <li key={idx} className="flex items-center text-red-300">
                              <XCircle size={14} className="mr-2" />
                              {stmt}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                          <h5 className="font-semibold text-blue-300 mb-1">Solution:</h5>
                          <p className="text-gray-400 text-sm">{exercise.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Expression Patterns Section */}
        {activeTab === 'patterns' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
                <Filter size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Advanced Expression Patterns
                </h2>
                <p className="text-gray-400 mt-2">
                  Creative ways to use expressions in JSX for complex scenarios.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {expressionPatterns.map((pattern, index) => (
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
                      <h4 className="font-semibold text-gray-200 mb-2">Code Pattern:</h4>
                      <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                        {pattern.code}
                      </pre>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Use Case:</h4>
                      <p className="text-gray-400 text-sm">{pattern.useCase}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-red-900/20 border border-red-800">
                      <h4 className="font-semibold text-red-300 mb-1">Warning:</h4>
                      <p className="text-gray-400 text-sm">{pattern.warning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Thinking Process */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">Student Thinking Process</h3>
              
              <div className="space-y-6">
                {studentThinkingProcess.map((student, index) => (
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
                        <h4 className="font-semibold text-gray-100">{student.student}'s Challenge</h4>
                        <p className="text-gray-500">{student.problem}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <XCircle size={16} className="text-red-400 mr-2" />
                          <h5 className="font-semibold text-red-300">Wrong Thinking:</h5>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 italic">"{student.wrongThought}"</p>
                        <div className="p-3 rounded bg-red-900/20 border border-red-800">
                          <p className="text-gray-400 text-sm">
                            This leads to statements in JSX, which won't compile.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <CheckCircle size={16} className="text-green-400 mr-2" />
                          <h5 className="font-semibold text-green-300">Correct Thinking:</h5>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 italic">"{student.correctThought}"</p>
                        <div className="p-3 rounded bg-green-900/20 border border-green-800">
                          <p className="text-gray-400 text-sm">
                            This leads to expressions that work perfectly in JSX.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h5 className="font-semibold text-gray-200 mb-2">Implementation:</h5>
                      <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                        {student.solution}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern Decision Tree */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Expression Pattern Decision Tree</h3>
              
              <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-700">
                <div className="space-y-8">
                  {/* Level 1 */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      <span className="font-bold text-white">Need to show conditionally?</span>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">choose based on complexity</div>
                  </div>
                  
                  {/* Level 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 mb-2">
                        <span className="font-bold text-white">Simple show/hide</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">No else clause needed</p>
                      <code className="text-xs text-green-300 bg-black p-2 rounded block">
                        {`{condition && <Component />}`}
                      </code>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-yellow-600 mb-2">
                        <span className="font-bold text-white">If/else choice</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Two alternatives</p>
                      <code className="text-xs text-yellow-300 bg-black p-2 rounded block">
                        {`{condition ? <A /> : <B />}`}
                      </code>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">for multiple conditions</div>
                  </div>
                  
                  {/* Level 3 */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600">
                      <span className="font-bold text-white">Multiple conditions?</span>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">choose approach</div>
                  </div>
                  
                  {/* Level 4 */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-2">Nested ternary</div>
                      <code className="text-xs text-blue-300 bg-black p-2 rounded block">
                        {`{a ? <A /> : b ? <B /> : <C />}`}
                      </code>
                      <div className="text-gray-400 text-xs mt-2">Short chains only</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-2">IIFE</div>
                      <code className="text-xs text-purple-300 bg-black p-2 rounded block">
                        {`{(() => { if(a) return <A /> })()}`}
                      </code>
                      <div className="text-gray-400 text-xs mt-2">Complex logic</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-2">Extract function</div>
                      <code className="text-xs text-green-300 bg-black p-2 rounded block">
                        {`{getComponent()}`}
                      </code>
                      <div className="text-gray-400 text-xs mt-2">Best practice</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Decision Making for Students:</h4>
                <p className="text-gray-400 text-sm">
                  When Debangshu faces a rendering problem, he walks through this tree. 
                  Simple condition? Use &&. Two choices? Use ? :. Complex logic? Extract a function. 
                  This systematic approach eliminates guesswork and leads to clean, working JSX.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Conversion Guide Section */}
        {activeTab === 'conversion' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Statement to Expression Conversion
                </h2>
                <p className="text-gray-400 mt-2">
                  How to transform common statements into JSX-compatible expressions.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {conversionTechniques.map((technique, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300",
                    "border border-blue-800",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg hover:border-blue-700"
                  )}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-300">
                        {technique.from} → {technique.to}
                      </h3>
                      <p className="text-gray-500">Converting statements to expressions</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Statement Approach:</h4>
                      <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                        <pre className="text-sm text-red-300 overflow-x-auto">
                          {technique.example.split('// Expression:')[0]}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Expression Approach:</h4>
                      <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                        <pre className="text-sm text-green-300 overflow-x-auto">
                          {technique.example.split('// Expression:')[1]}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-2">Key Insight:</h4>
                      <p className="text-gray-400 text-sm">
                        {index === 0 && "if/else chooses between actions. Ternary chooses between values."}
                        {index === 1 && "for loops perform actions repeatedly. map() transforms values repeatedly."}
                        {index === 2 && "switch directs flow. Object lookup retrieves values."}
                        {index === 3 && "Nested ifs create complex flow. Nested expressions create complex values."}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                      <h4 className="font-semibold text-yellow-300 mb-2">Memory Tip:</h4>
                      <p className="text-gray-400 text-sm">{technique.tip}</p>
                    </div>
                  </div>
                  
                  {/* Student Application */}
                  <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                    <h4 className="font-semibold text-purple-300 mb-2">Student Application:</h4>
                    <p className="text-gray-400 text-sm">
                      {index === 0 && "Swadeep used this to show 'Present' or 'Absent' in his attendance system."}
                      {index === 1 && "Tuhina converted her student list rendering from for loops to map()."}
                      {index === 2 && "Abhronila simplified her quiz grading logic with object lookups."}
                      {index === 3 && "Debangshu cleaned up his nested conditionals for displaying different UI states."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion Practice */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">Practice Conversion</h3>
              
              <div className="space-y-8">
                {[
                  {
                    statement: `// Convert this statement to expression
const statusMessage = ''
if (score >= 90) {
  statusMessage = 'Excellent'
} else if (score >= 70) {
  statusMessage = 'Good'
} else {
  statusMessage = 'Needs Improvement'
}
return <p>{statusMessage}</p>`,
                    hint: "Use nested ternary or object lookup",
                    solution: `// Expression solution
const statusMessage = score >= 90 
  ? 'Excellent' 
  : score >= 70 
    ? 'Good' 
    : 'Needs Improvement'
    
return <p>{statusMessage}</p>`
                  },
                  {
                    statement: `// Convert loop to expression
const listItems = []
for (let i = 0; i < students.length; i++) {
  listItems.push(<li key={i}>{students[i].name}</li>)
}
return <ul>{listItems}</ul>`,
                    hint: "Use array.map()",
                    solution: `// Expression solution
return (
  <ul>
    {students.map((student, i) => (
      <li key={i}>{student.name}</li>
    ))}
  </ul>
)`
                  }
                ].map((exercise, exIndex) => (
                  <div 
                    key={exIndex}
                    className={clsx(
                      "rounded-lg p-5",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:bg-gray-800/30"
                    )}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                        {exIndex + 1}
                      </div>
                      <h4 className="font-semibold text-gray-200">Conversion Exercise {exIndex + 1}</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Statement Code:</h5>
                        <pre className="text-sm text-gray-300 bg-black p-4 rounded">
                          {exercise.statement}
                        </pre>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-200 mb-2">Hint:</h5>
                          <p className="text-gray-400 text-sm">{exercise.hint}</p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                          <h5 className="font-semibold text-green-300 mb-2">Solution:</h5>
                          <pre className="text-xs text-green-300">
                            {exercise.solution}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Debugging Practice Section */}
        {activeTab === 'debugging' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">🐛</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Debugging Practice
                </h2>
                <p className="text-gray-400 mt-2">
                  Find and fix expression/statement errors in real code examples.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {debuggingExercises.map((exercise, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300",
                    "border border-purple-800",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg hover:border-purple-700"
                  )}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-300">Bug Hunt {index + 1}</h3>
                      <p className="text-gray-500">Find the statement in JSX</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Buggy Code:</h4>
                      <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                        <pre className="text-sm text-red-300 overflow-x-auto">
                          {exercise.code}
                        </pre>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                        <h4 className="font-semibold text-gray-200 mb-1">Error:</h4>
                        <p className="text-gray-400 text-sm">{exercise.error}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Fixed Code:</h4>
                      <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                        <pre className="text-sm text-green-300 overflow-x-auto">
                          {exercise.fixedCode}
                        </pre>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                        <h4 className="font-semibold text-blue-300 mb-1">Fix:</h4>
                        <p className="text-gray-400 text-sm">{exercise.fix}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Learning Point */}
                  <div className="mt-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                    <h4 className="font-semibold text-yellow-300 mb-2">Learning Point:</h4>
                    <p className="text-gray-400 text-sm">
                      {index === 0 && "When you see a loop in JSX, think 'map'. When you see if, think 'ternary'. This mental conversion becomes automatic with practice."}
                      {index === 1 && "Conditional rendering is one of the most common uses of expressions in JSX. Mastering ternaries unlocks dynamic UIs."}
                      {index === 2 && "State management belongs in hooks (useState), not in JSX expressions. JSX is for displaying state, not creating it."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Self-Check Exercise */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-yellow-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-yellow-300">Self-Check: Expression or Statement?</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-4">Which are expressions? (Select all)</h4>
                  
                  <div className="space-y-3">
                    {[
                      { code: "students.length", isExpression: true },
                      { code: "for (let i = 0; i < 5; i++)", isExpression: false },
                      { code: "isActive ? 'Yes' : 'No'", isExpression: true },
                      { code: "const x = 5", isExpression: false },
                      { code: "Math.random()", isExpression: true },
                      { code: "if (x > 5) return true", isExpression: false }
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        className={clsx(
                          "p-3 rounded-lg cursor-pointer transition-all duration-200",
                          item.isExpression
                            ? "bg-green-900/20 border border-green-800 hover:bg-green-900/30"
                            : "bg-red-900/20 border border-red-800 hover:bg-red-900/30"
                        )}
                      >
                        <div className="flex items-center">
                          {item.isExpression ? (
                            <CheckCircle size={16} className="text-green-400 mr-3" />
                          ) : (
                            <XCircle size={16} className="text-red-400 mr-3" />
                          )}
                          <code className="text-gray-300">{item.code}</code>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          {item.isExpression ? "✅ Works in JSX {}" : "❌ Statement - won't work"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">Quick Reference Guide</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-1">Always Expressions:</h5>
                        <ul className="text-gray-400 text-sm space-y-1">
                          <li>• Variables and constants</li>
                          <li>• Function/method calls</li>
                          <li>• Mathematical operations</li>
                          <li>• Ternary operator (? :)</li>
                          <li>• Property access (obj.prop)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-1">Always Statements:</h5>
                        <ul className="text-gray-400 text-sm space-y-1">
                          <li>• if/else/switch</li>
                          <li>• for/while/do-while</li>
                          <li>• Variable declarations</li>
                          <li>• Function declarations</li>
                          <li>• return/break/continue</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 rounded bg-gray-900 border border-gray-700">
                        <h5 className="font-semibold text-green-300 mb-1">Test Rule:</h5>
                        <p className="text-gray-400 text-xs">
                          Can it go after <code className="text-green-300">const x =</code>? 
                          If yes → expression. If no → statement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
                      The Expression Mindset Shift:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      When Tuhina first learns programming, she thinks in steps: "First do this, then do that." 
                      That's statement thinking. React requires expression thinking: "This value, transformed by that operation." 
                      The shift from imperative (do this) to declarative (show this) is fundamental. Students who 
                      master this shift become better React developers. They stop fighting JSX and start leveraging it.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Teaching the Shift:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Start with "const x =" test - can the code go after equals?</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Show Babel compilation - see how JSX becomes createElement calls</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Create "conversion exercises" - given statement, write expression</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">4</span>
                          </div>
                          <span>Use error messages as teaching moments - "Why did React say no?"</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Student Blockers:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"But if/else works everywhere else in JavaScript!"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Ternary operators look confusing with nested conditions"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"I need temporary variables inside my JSX"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"map() feels less intuitive than for loops"</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      27 Years of Teaching Expressions:
                    </h5>
                    <p className="text-gray-400">
                      I've taught this concept in every language I've taught. In C, it's lvalues and rvalues. 
                      In Lisp, everything's an expression. In React JSX, it's "what works in curly braces." 
                      The pattern is always the same: students initially resist the constraint, then they 
                      discover its power. When Swadeep can't use if in JSX, he feels limited. When he masters 
                      ternary and logical operators, he realizes he can do everything he needs, often more 
                      elegantly. Constraints breed creativity. JSX's "expressions only" rule seems limiting, 
                      but it actually forces better code organization. Logic stays outside JSX, making components 
                      more readable and testable. That's the hidden lesson: React's constraints aren't bugs, 
                      they're features guiding you toward better architecture.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching expression-based thinking and constraint-driven design since 1997</p>
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
              📋 Topic 11 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Differentiate between expressions and statements",
                "Identify what can and cannot go in JSX {}",
                "Use ternary operators for conditional rendering",
                "Convert if/else statements to expressions",
                "Replace for loops with array.map() in JSX",
                "Use logical && for simple conditional rendering",
                "Extract complex logic from JSX into helper functions",
                "Recognize and fix statement-in-JSX errors",
                "Apply expression patterns for common scenarios",
                "Think in expressions when designing React components"
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
                to="/react-foundations/topic/Module1/12"
                className="inline-flex items-center gap-2
               px-6 py-3 rounded-lg
               bg-gradient-to-r from-blue-500 to-purple-600
               text-white font-medium"
              >
                Ready for Topic 12
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-sm text-gray-400">
                Next: Embedding JavaScript inside JSX safely
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 11: JSX Expressions vs Statements</p>
            <p className="mt-2 text-sm">Mastering the fundamental distinction that controls React rendering</p>
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

export default Topic11;