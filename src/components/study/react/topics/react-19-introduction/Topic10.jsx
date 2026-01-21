import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight, Code, AlertTriangle, CheckCircle, XCircle, Zap, Braces, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

const Topic10 = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode as default
  const [activeSection, setActiveSection] = useState('basics');
  const [jsxExample, setJsxExample] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const { moduleSlug, topicIndex } = useParams();
  const currentIndex = Number(topicIndex);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const jsxExamples = [
    {
      title: "Basic JSX",
      code: `// Simple JSX element
const element = <h1>Hello, Barrackpore!</h1>`,
      correct: true,
      explanation: "JSX looks like HTML but it's JavaScript. This creates a React element."
    },
    {
      title: "JSX with Expressions",
      code: `const student = 'Swadeep'
const element = <h1>Welcome, {student}!</h1>`,
      correct: true,
      explanation: "Curly braces {} let you embed JavaScript expressions in JSX."
    },
    {
      title: "JSX with Attributes",
      code: `const element = (
  <img 
    src="/logo.png" 
    alt="School Logo"
    className="logo"
  />
)`,
      correct: true,
      explanation: "Attributes use camelCase (className, not class). Quotes for strings."
    },
    {
      title: "JSX Must Have One Parent",
      code: `// ❌ WRONG: Multiple root elements
const element = (
  <h1>Title</h1>
  <p>Content</p>
)

// ✅ CORRECT: Single parent
const element = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
)`,
      correct: false,
      explanation: "JSX must have exactly one parent element. Use fragments <>...</> for multiple."
    },
    {
      title: "JSX is JavaScript",
      code: `// JSX gets compiled to JavaScript:
const element = <h1 className="title">Hello</h1>

// Compiles to:
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello'
)`,
      correct: true,
      explanation: "Browsers don't understand JSX. Tools like Babel compile it to JavaScript."
    }
  ];

  const syntaxRules = [
    {
      rule: "One Root Element",
      description: "JSX expressions must have exactly one parent element",
      correct: `<div><p>A</p><p>B</p></div>`,
      wrong: `<p>A</p><p>B</p>`,
      tip: "Use React Fragment <>...</> for multiple elements"
    },
    {
      rule: "Close All Tags",
      description: "All JSX tags must be closed, even self-closing ones",
      correct: `<img src="logo.png" />`,
      wrong: `<img src="logo.png">`,
      tip: "Self-closing tags need /> in JSX"
    },
    {
      rule: "camelCase Attributes",
      description: "HTML attributes become camelCase in JSX",
      correct: `<div className="header" tabIndex="0"></div>`,
      wrong: `<div class="header" tabindex="0"></div>`,
      tip: "class → className, for → htmlFor, onclick → onClick"
    },
    {
      rule: "JavaScript in {}",
      description: "Use curly braces for JavaScript expressions",
      correct: `<h1>Count: {count}</h1>`,
      wrong: `<h1>Count: count</h1>`,
      tip: "Anything inside {} is evaluated as JavaScript"
    },
    {
      rule: "Style is an Object",
      description: "The style attribute takes a JavaScript object",
      correct: `<div style={{ color: 'red', fontSize: '20px' }}></div>`,
      wrong: `<div style="color: red; font-size: 20px;"></div>`,
      tip: "Double curly braces: outer for JSX, inner for object"
    }
  ];

  const commonErrors = [
    {
      error: "Adjacent JSX elements",
      code: `return (
  <h1>Title</h1>
  <p>Content</p>
)`,
      message: "Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag",
      fix: "Wrap in <div> or use <> fragment",
      fixedCode: `return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
)`
    },
    {
      error: "Unclosed tag",
      code: `const element = <img src="logo.png">`,
      message: "Warning: <img> is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`",
      fix: "Add closing slash",
      fixedCode: `const element = <img src="logo.png" />`
    },
    {
      error: "Using class instead of className",
      code: `<div class="container">Content</div>`,
      message: "Warning: Invalid DOM property `class`. Did you mean `className`?",
      fix: "Use className instead",
      fixedCode: `<div className="container">Content</div>`
    },
    {
      error: "Forgetting {} for expressions",
      code: `<h1>Welcome, studentName!</h1>`,
      message: "Shows literal text 'studentName' instead of variable value",
      fix: "Wrap variable in curly braces",
      fixedCode: `<h1>Welcome, {studentName}!</h1>`
    },
    {
      error: "JavaScript statements in JSX",
      code: `<div>{if (isLoggedIn) return <p>Welcome</p>}</div>`,
      message: "Error: Expected an expression",
      fix: "Use ternary operator or move logic outside JSX",
      fixedCode: `<div>{isLoggedIn ? <p>Welcome</p> : null}</div>`
    }
  ];

  const jsxExpressions = [
    {
      type: "Variables",
      example: `const name = 'Tuhina'
return <h1>Hello, {name}</h1>`,
      output: "Hello, Tuhina",
      rule: "Any variable can be inserted with {}"
    },
    {
      type: "Functions",
      example: `function formatName(first, last) {
  return \`\${first} \${last}\`
}
return <p>{formatName('Abhronila', 'Das')}</p>`,
      output: "Abhronila Das",
      rule: "Function calls are valid expressions"
    },
    {
      type: "Arrays",
      example: `const students = ['Swadeep', 'Debangshu']
return <ul>{students.map(s => <li key={s}>{s}</li>)}</ul>`,
      output: "• Swadeep\n• Debangshu",
      rule: "map() returns array of elements"
    },
    {
      type: "Conditionals",
      example: `const isPresent = true
return <div>{isPresent ? 'Present ✓' : 'Absent ✗'}</div>`,
      output: "Present ✓",
      rule: "Ternary operator for conditional rendering"
    },
    {
      type: "Object Properties",
      example: `const student = { name: 'Rohit', grade: 'A' }
return <p>{student.name} got {student.grade}</p>`,
      output: "Rohit got A",
      rule: "Access object properties with dot notation"
    }
  ];

  const limitations = [
    {
      limitation: "No if statements",
      reason: "JSX only accepts expressions, not statements",
      workaround: "Use ternary operator or move logic outside JSX",
      example: `// ❌ Can't do this:
<div>{if (condition) <p>Yes</p>}</div>

// ✅ Do this instead:
<div>{condition ? <p>Yes</p> : null}</div>`
    },
    {
      limitation: "No for loops",
      reason: "for is a statement, not an expression",
      workaround: "Use map() for arrays or prepare array before return",
      example: `// ❌ Can't do this:
<div>{for (let i = 0; i < 5; i++) <span>{i}</span>}</div>

// ✅ Do this instead:
<div>{[...Array(5)].map((_, i) => <span key={i}>{i}</span>)}</div>`
    },
    {
      limitation: "No HTML comments",
      reason: "<!-- comment --> would be treated as text",
      workaround: "Use JavaScript comments inside {}",
      example: `// ❌ Can't do this:
<div><!-- This is a comment -->Content</div>

// ✅ Do this instead:
<div>{/* This is a comment */}Content</div>`
    },
    {
      limitation: "Reserved words",
      reason: "class, for are reserved in JavaScript",
      workaround: "Use className, htmlFor instead",
      example: `// ❌ Can't do this:
<label for="name">Name</label>
<div class="container"></div>

// ✅ Do this instead:
<label htmlFor="name">Name</label>
<div className="container"></div>`
    },
    {
      limitation: "Inline styles as objects",
      reason: "style attribute expects JavaScript object",
      workaround: "Use double curly braces for style object",
      example: `// ❌ Can't do this:
<div style="color: red; font-size: 20px;"></div>

// ✅ Do this instead:
<div style={{ color: 'red', fontSize: '20px' }}></div>`
    }
  ];

  const bestPractices = [
    {
      practice: "Use fragments for multiple elements",
      reason: "Avoids unnecessary div wrappers",
      example: `return (
  <>
    <Header />
    <MainContent />
    <Footer />
  </>
)`,
      tip: "Short syntax <> is same as <React.Fragment>"
    },
    {
      practice: "Extract complex logic",
      reason: "Keep JSX readable and maintainable",
      example: `// Instead of:
return <div>{complexCalculation(data)}</div>

// Do:
const result = complexCalculation(data)
return <div>{result}</div>`,
      tip: "Students in Ichapur should calculate before returning JSX"
    },
    {
      practice: "Use descriptive variable names",
      reason: "Makes JSX self-documenting",
      example: `// Instead of:
const e = <div>...</div>

// Do:
const studentCard = <div>...</div>`,
      tip: "Name variables by what they represent, not their type"
    },
    {
      practice: "Consistent formatting",
      reason: "Improves readability and team collaboration",
      example: `// Be consistent with:
// - Indentation (2 spaces)
// - Quotes (single or double)
// - Self-closing tag style
// - Line breaks for long attributes`,
      tip: "Use Prettier or ESLint to enforce consistency"
    },
    {
      practice: "Comment complex JSX",
      reason: "Helps others understand your intent",
      example: `return (
  {/* Student attendance section */}
  <div className="attendance">
    {students.map(student => (
      // Each student gets a card with hover effects
      <StudentCard key={student.id} {...student} />
    ))}
  </div>
)`,
      tip: "Use {/* */} for JSX comments, not //"
    }
  ];

  const studentScenarios = [
    {
      student: "Swadeep",
      location: "Naihati",
      task: "Display student list with attendance status",
      problem: "Getting error about adjacent elements",
      solution: "Wrap list items in <ul> or fragment",
      code: `// Problem:
return (
  <li>Swadeep - Present</li>
  <li>Tuhina - Absent</li>
)

// Solution:
return (
  <ul>
    <li>Swadeep - Present</li>
    <li>Tuhina - Absent</li>
  </ul>
)`
    },
    {
      student: "Tuhina",
      location: "Shyamnagar",
      task: "Add CSS classes conditionally",
      problem: "class attribute not working",
      solution: "Use className with template literal",
      code: `// Problem:
<div class="card {isActive ? 'active' : ''}">

// Solution:
<div className={\`card \${isActive ? 'active' : ''}\`}>`
    },
    {
      student: "Abhronila",
      location: "Barrackpore",
      task: "Render list of quiz questions",
      problem: "Missing key prop warning",
      solution: "Add unique key to each list item",
      code: `// Problem:
{questions.map(q => <Question question={q} />)}

// Solution:
{questions.map(q => <Question key={q.id} question={q} />)}`
    },
    {
      student: "Debangshu",
      location: "Ichapur",
      task: "Inline styling for highlighted text",
      problem: "Style not applying correctly",
      solution: "Use style object with camelCase properties",
      code: `// Problem:
<span style="color: blue; font-weight: bold;">

// Solution:
<span style={{ color: 'blue', fontWeight: 'bold' }}>`
    }
  ];

  const sections = [
    { id: 'basics', label: 'JSX Basics', icon: '📚' },
    { id: 'syntax', label: 'Syntax Rules', icon: '⚡' },
    { id: 'expressions', label: 'Expressions', icon: '💡' },
    { id: 'limitations', label: 'Limitations', icon: '🚫' },
    { id: 'errors', label: 'Common Errors', icon: '⚠️' },
    { id: 'best', label: 'Best Practices', icon: '✅' }
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
                <Code size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 10: JSX Fundamentals</p>
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
                  💎
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    JSX: The DNA of React
                  </h2>
                  <p className="text-xl text-gray-300">
                    HTML-like syntax that's actually JavaScript - master the rules to build better UIs
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                When Tuhina from Shyamnagar writes <code className="text-blue-300">&lt;h1&gt;Hello&lt;/h1&gt;</code> in React, 
                she's not writing HTML. She's writing JSX - a special syntax that combines the familiarity of HTML 
                with the power of JavaScript. Today, you'll learn its rules, limitations, and superpowers.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Syntax Rules
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Live Examples
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Common Mistakes
                </span>
                <span className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Best Practices
                </span>
              </div>
            </div>
            
            {/* Animated JSX Brackets */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="200" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                <text x="50" y="50" fontSize="24" fill="#3B82F6" className="animate-pulse">&lt;</text>
                <text x="70" y="50" fontSize="24" fill="#8B5CF6">div</text>
                <text x="120" y="50" fontSize="24" fill="#3B82F6">&gt;</text>
                
                <text x="60" y="80" fontSize="16" fill="#10B981">Hello JSX</text>
                
                <text x="50" y="110" fontSize="24" fill="#3B82F6">&lt;/</text>
                <text x="80" y="110" fontSize="24" fill="#8B5CF6">div</text>
                <text x="130" y="110" fontSize="24" fill="#3B82F6">&gt;</text>
                
                <rect x="140" y="40" width="40" height="20" rx="3" fill="none" stroke="#F59E0B" strokeWidth="1">
                  <animate attributeName="opacity" from="0.3" to="1" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="160" y="53" textAnchor="middle" fontSize="10" fill="#F59E0B">JSX</text>
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
        </section>

        {/* JSX Basics Section */}
        {activeSection === 'basics' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  JSX Basics: What It Is & Isn't
                </h2>
                <p className="text-gray-400 mt-2">
                  JSX looks like HTML but behaves like JavaScript. Understanding this duality is key.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className={clsx(
                "rounded-xl p-6",
                "border border-blue-800",
                "bg-gradient-to-br from-gray-800 to-gray-900"
              )}>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">What JSX IS:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">JavaScript Syntax Extension</h4>
                      <p className="text-gray-400 text-sm">It's not a separate language, just JavaScript with HTML-like syntax</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">Compiles to React.createElement()</h4>
                      <p className="text-gray-400 text-sm">Babel transforms JSX into regular JavaScript function calls</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">Expression-Oriented</h4>
                      <p className="text-gray-400 text-sm">Every JSX expression evaluates to a value (a React element)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">Type-Safe</h4>
                      <p className="text-gray-400 text-sm">TypeScript can check JSX for type errors during compilation</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className={clsx(
                "rounded-xl p-6",
                "border border-red-800",
                "bg-gradient-to-br from-gray-800 to-gray-900"
              )}>
                <h3 className="text-xl font-semibold mb-4 text-red-300">What JSX ISN'T:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <XCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">Not HTML</h4>
                      <p className="text-gray-400 text-sm">Browsers don't understand JSX. It must be compiled first.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                      <XCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">Not a Template Language</h4>
                      <p className="text-gray-400 text-sm">No special template syntax - it's all JavaScript expressions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <XCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">Not Required for React</h4>
                      <p className="text-gray-400 text-sm">You can use React without JSX, but JSX makes it much easier</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <XCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200">Not Valid in Plain JavaScript</h4>
                      <p className="text-gray-400 text-sm">JSX only works with React (or similar libraries) and a compiler</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <h3>Babel = translator between new JavaScript and old browsers</h3>

            {/* Interactive JSX Examples */}
            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Interactive JSX Examples</h3>
              
              <div className="flex items-center mb-6">
                <div className="flex space-x-2">
                  {jsxExamples.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setJsxExample(index)}
                      className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                        jsxExample === index
                          ? "bg-purple-600 text-white scale-110"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="ml-4">
                  <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm">
                    Example {jsxExample + 1} of {jsxExamples.length}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-200">JSX Code:</h4>
                    <div className="flex items-center">
                      {jsxExamples[jsxExample].correct ? (
                        <span className="px-2 py-1 rounded-full bg-green-900/30 text-green-300 text-xs flex items-center">
                          <CheckCircle size={12} className="mr-1" /> Correct
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-900/30 text-red-300 text-xs flex items-center">
                          <AlertTriangle size={12} className="mr-1" /> Contains Error
                        </span>
                      )}
                    </div>
                  </div>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
                    {jsxExamples[jsxExample].code}
                  </pre>
                </div>
                
                <div>
                  <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">Explanation:</h4>
                    <p className="text-gray-400">{jsxExamples[jsxExample].explanation}</p>
                  </div>
                  
                  <div className="mt-4 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">Try This:</h4>
                    <p className="text-gray-400 text-sm">
                      In your React project, create a component that uses this JSX pattern. 
                      For students in Naihati: Try changing the variable names to match your classmates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* JSX Compilation Visualization */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">JSX Compilation Process</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">1. You Write JSX</h4>
                  <pre className="text-xs text-gray-300 bg-black p-3 rounded">
{`const element = 
  <h1 className="title">
    Hello, React!
  </h1>`}</pre>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">2. Babel Compiles It</h4>
                  <pre className="text-xs text-gray-300 bg-black p-3 rounded">
{`// During build process
// JSX → JavaScript`}</pre>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-green-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚛️</span>
                  </div>
                  <h4 className="font-semibold text-gray-200 mb-2">3. React Creates Element</h4>
                  <pre className="text-xs text-gray-300 bg-black p-3 rounded">
{`const element = 
  React.createElement(
    'h1',
    { className: 'title' },
    'Hello, React!'
  )`}</pre>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Why This Matters:</h4>
                <p className="text-gray-400 text-sm">
                  Understanding that JSX compiles to React.createElement() helps debug complex components. 
                  When Swadeep sees an error about "React is not defined", he now knows it's because 
                  JSX needs React to work. The compilation happens automatically with Vite.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Syntax Rules Section */}
        {activeSection === 'syntax' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
                <Zap size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  JSX Syntax Rules
                </h2>
                <p className="text-gray-400 mt-2">
                  The non-negotiable rules that make JSX work. Break these, and React breaks.
                </p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {syntaxRules.map((rule, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
                    "border border-gray-700",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg hover:border-blue-700"
                  )}
                >
                  <div className="flex items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-blue-300">{rule.rule}</h3>
                      <p className="text-gray-400 mt-1">{rule.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <CheckCircle size={16} className="text-green-400 mr-2" />
                        <h4 className="font-semibold text-green-300">Correct:</h4>
                      </div>
                      <pre className="text-sm text-gray-300 bg-black p-4 rounded">
                        {rule.correct}
                      </pre>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <XCircle size={16} className="text-red-400 mr-2" />
                        <h4 className="font-semibold text-red-300">Wrong:</h4>
                      </div>
                      <pre className="text-sm text-gray-300 bg-black p-4 rounded">
                        {rule.wrong}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">Tip for Students:</h4>
                    <p className="text-gray-400 text-sm">{rule.tip}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Attribute Reference */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-yellow-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-yellow-300">HTML → JSX Attribute Conversion</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">HTML</th>
                      <th className="text-left py-3 px-4 text-gray-300">JSX</th>
                      <th className="text-left py-3 px-4 text-gray-300">Reason</th>
                      <th className="text-left py-3 px-4 text-gray-300">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { html: 'class', jsx: 'className', reason: 'class is reserved in JavaScript', example: '<div className="card">' },
                      { html: 'for', jsx: 'htmlFor', reason: 'for is reserved in JavaScript', example: '<label htmlFor="name">' },
                      { html: 'onclick', jsx: 'onClick', reason: 'camelCase convention', example: '<button onClick={handleClick}>' },
                      { html: 'tabindex', jsx: 'tabIndex', reason: 'camelCase convention', example: '<div tabIndex="0">' },
                      { html: 'maxlength', jsx: 'maxLength', reason: 'camelCase convention', example: '<input maxLength="10">' },
                      { html: 'style="..."', jsx: 'style={{...}}', reason: 'Expects JavaScript object', example: '<div style={{color: "red"}}>' }
                    ].map((attr, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-3 px-4">
                          <code className="text-red-300">{attr.html}</code>
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-green-300">{attr.jsx}</code>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{attr.reason}</td>
                        <td className="py-3 px-4">
                          <code className="text-blue-300 text-xs">{attr.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                <h4 className="font-semibold text-yellow-300 mb-2">Memory Tip for Students:</h4>
                <p className="text-gray-400 text-sm">
                  When Debangshu from Ichapur gets attribute errors, he remembers: "If it's a word JavaScript uses, 
                  JSX probably changes it." class → className, for → htmlFor. For events, add "on" and use camelCase: click → onClick.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Expressions Section */}
        {activeSection === 'expressions' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
                <Braces size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  JSX Expressions
                </h2>
                <p className="text-gray-400 mt-2">
                  Curly braces {} are the gateway between JSX and JavaScript. What goes inside matters.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {jsxExpressions.map((expr, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    "border border-gray-700",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className={clsx(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-4",
                      index === 0 ? "bg-blue-600" :
                      index === 1 ? "bg-purple-600" :
                      index === 2 ? "bg-green-600" :
                      index === 3 ? "bg-yellow-600" : "bg-red-600"
                    )}>
                      <span className="text-white">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100">{expr.type}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-200 mb-2">Code:</h4>
                    <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                      {expr.example}
                    </pre>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Output:</h4>
                      <p className="text-gray-400 text-sm whitespace-pre">{expr.output}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-1">Rule:</h4>
                      <p className="text-gray-400 text-sm">{expr.rule}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expression Rules */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Expression Rules & Limitations</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">✅ Allowed in {}:</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Variables and constants</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Function calls and method calls</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Mathematical operations: {`{2 + 2}`} = 4</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Ternary operators: {`{isTrue ? 'Yes' : 'No'}`}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Array.map() for rendering lists</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">❌ Not Allowed in {}:</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>if/else statements (use ternary instead)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>for/while loops (prepare data first)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>Variable declarations (const x = 5)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>Regular object literals (except style)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>HTML tags (they must be outside {})</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Expression Thinking Exercise:</h4>
                <p className="text-gray-400 text-sm">
                  When Tuhina wants to show "Good Morning" before noon and "Good Afternoon" after, 
                  she can't use if/else in JSX. Instead, she thinks: "I need an expression that 
                  evaluates to different values." Solution: {`{hour < 12 ? 'Good Morning' : 'Good Afternoon'}`}.
                  This shift from statement-thinking to expression-thinking is key in React.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Limitations Section */}
        {activeSection === 'limitations' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  JSX Limitations & Workarounds
                </h2>
                <p className="text-gray-400 mt-2">
                  What JSX can't do, and how to do it anyway. Every limitation has a solution.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {limitations.map((limit, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300",
                    "border border-red-800",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg hover:border-red-700"
                  )}
                >
                  <div className="flex items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-300">{limit.limitation}</h3>
                      <p className="text-gray-400 mt-1">{limit.reason}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Workaround:</h4>
                      <p className="text-gray-400 mb-4">{limit.workaround}</p>
                      <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                        <h4 className="font-semibold text-green-300 mb-1">Correct Code:</h4>
                        <pre className="text-xs text-gray-300 mt-2">
                          {limit.example.split('// ✅ Do this instead:')[1]}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Common Student Mistake:</h4>
                      <div className="p-3 rounded-lg bg-red-900/20 border border-red-800 mb-4">
                        <pre className="text-xs text-red-300">
                          {limit.example.split('// ✅ Do this instead:')[0].split('// ❌ Can\'t do this:')[1]}
                        </pre>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                        <h4 className="font-semibold text-blue-300 mb-1">Teaching Tip:</h4>
                        <p className="text-gray-400 text-sm">
                          When students in Barrackpore hit this limitation, remind them: 
                          "JSX is for describing WHAT to render, not HOW to decide. Do the thinking first, then render."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Common Errors Section */}
        {activeSection === 'errors' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Common JSX Errors & Solutions
                </h2>
                <p className="text-gray-400 mt-2">
                  The errors students make, and how to fix them. Learn from Swadeep, Tuhina, and Abhronila's mistakes.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <button
                onClick={() => setShowErrors(!showErrors)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium mb-4",
                  showErrors ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                {showErrors ? "Hide Error Examples" : "Show Error Examples"}
              </button>
            </div>

            <div className="space-y-6">
              {commonErrors.map((error, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300",
                    "border border-yellow-800",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-300">{error.error}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Error Code:</h4>
                      <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                        <pre className="text-sm text-red-300 overflow-x-auto">
                          {error.code}
                        </pre>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                        <h4 className="font-semibold text-gray-200 mb-1">Error Message:</h4>
                        <p className="text-gray-400 text-sm">{error.message}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Fixed Code:</h4>
                      <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                        <pre className="text-sm text-green-300 overflow-x-auto">
                          {error.fixedCode}
                        </pre>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                        <h4 className="font-semibold text-blue-300 mb-1">Solution:</h4>
                        <p className="text-gray-400 text-sm">{error.fix}</p>
                      </div>
                    </div>
                  </div>
                  
                  {showErrors && (
                    <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                      <h4 className="font-semibold text-purple-300 mb-2">Why This Error Happens:</h4>
                      <p className="text-gray-400 text-sm">
                        {index === 0 && "React needs one parent element to return. Multiple elements need wrapping."}
                        {index === 1 && "In HTML, some tags self-close. In JSX, ALL tags must explicitly close."}
                        {index === 2 && "'class' is a reserved word in JavaScript. React uses 'className' instead."}
                        {index === 3 && "JSX treats text literally. Variables need {} to be evaluated as JavaScript."}
                        {index === 4 && "JSX {} only accepts expressions. if/else are statements, not expressions."}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Student Scenarios */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Real Student Scenarios</h3>
              
              <div className="space-y-6">
                {studentScenarios.map((scenario, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-5 transition-all duration-300",
                      "border border-gray-700",
                      "bg-gray-900/50",
                      "hover:bg-gray-800/50"
                    )}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white mr-4">
                        <span className="font-bold">{scenario.student.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-100">{scenario.student}'s Project</h4>
                        <p className="text-gray-500">{scenario.location} • {scenario.task}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Problem:</h5>
                        <p className="text-gray-400 text-sm">{scenario.problem}</p>
                        <div className="mt-3 p-3 rounded bg-red-900/20 border border-red-800">
                          <pre className="text-xs text-red-300">
                            {scenario.code.split('// Solution:')[0]}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Solution:</h5>
                        <p className="text-gray-400 text-sm">{scenario.solution}</p>
                        <div className="mt-3 p-3 rounded bg-green-900/20 border border-green-800">
                          <pre className="text-xs text-green-300">
                            {scenario.code.split('// Solution:')[1]}
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

        {/* Best Practices Section */}
        {activeSection === 'best' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  JSX Best Practices
                </h2>
                <p className="text-gray-400 mt-2">
                  Professional habits that make your JSX cleaner, more maintainable, and easier to debug.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {bestPractices.map((practice, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    "border border-green-800",
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
                      <h4 className="font-semibold text-gray-200 mb-1">Why:</h4>
                      <p className="text-gray-400 text-sm">{practice.reason}</p>
                    </div>
                    
                    {practice.example && (
                      <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                        <h4 className="font-semibold text-gray-200 mb-1">Example:</h4>
                        <pre className="text-xs text-gray-300 mt-2 overflow-x-auto">
                          {practice.example}
                        </pre>
                      </div>
                    )}
                    
                    <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-1">Teaching Tip:</h4>
                      <p className="text-gray-400 text-sm">{practice.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* JSX Quality Checklist */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">JSX Code Review Checklist</h3>
              
              <div className="space-y-4">
                {[
                  "✓ One parent element per JSX return",
                  "✓ All tags properly closed",
                  "✓ className instead of class",
                  "✓ JavaScript expressions wrapped in {}",
                  "✓ Complex logic extracted from JSX",
                  "✓ Consistent indentation (2 spaces)",
                  "✓ Descriptive variable names",
                  "✓ Key prop for list items",
                  "✓ Fragments used instead of unnecessary divs",
                  "✓ Comments for complex sections"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "flex items-center p-4 rounded-lg transition-all duration-300",
                      "border border-gray-700",
                      "hover:bg-gray-800/50",
                      "hover:border-green-700"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center mr-4">
                      <span className="text-green-300">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Code Review Exercise:</h4>
                <p className="text-gray-400 text-sm">
                  Swap projects with a classmate from a different location (Barrackpore with Ichapur). 
                  Review each other's JSX using this checklist. Look for:
                  <br/>1. JSX syntax errors
                  <br/>2. Opportunities to extract logic
                  <br/>3. Missing key props in lists
                  <br/>4. Inconsistent formatting
                  <br/>This peer review builds professional skills and catches mistakes you might miss.
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
                      The JSX Learning Curve:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      When Swadeep first sees JSX, he thinks "This looks like HTML, I know this!" 
                      Then he gets errors about className and fragments, and confusion sets in. 
                      This is normal. The key is understanding that JSX is JavaScript in disguise. 
                      Once students make that mental shift, everything clicks. They stop trying to 
                      write HTML in React and start writing JavaScript that looks like HTML.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Teaching JSX Effectively:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Start with pure HTML, then introduce JSX differences</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Show the compiled JavaScript - it demystifies JSX</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Create "error scavenger hunts" - find and fix JSX errors</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">4</span>
                          </div>
                          <span>Use the Babel REPL online to see JSX compilation live</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common JSX Misconceptions:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"JSX is just HTML with some changes" (It's JavaScript!)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"I need to learn JSX separately" (It's part of React)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"{} work like template literals" (Different rules apply)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Fragments are just empty divs" (They don't create DOM nodes)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      27 Years of Syntax Teaching:
                    </h5>
                    <p className="text-gray-400">
                      I've taught syntax for C, Java, Python, JavaScript, and now React. Every language 
                      has its quirks. JSX's genius is making UI code look familiar (HTML) while being 
                      powerful (JavaScript). The challenge is students see the familiarity first and 
                      get frustrated by the differences. My approach: embrace the errors. When Tuhina 
                      gets 10 className errors, she's not failing - she's learning the boundaries of JSX. 
                      Each error teaches a rule. By the time she's fixed them all, she understands JSX 
                      better than if she'd never made the mistakes. That's why I emphasize common errors 
                      - they're not failures, they're learning opportunities in disguise.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching programming syntax and error-based learning since 1997</p>
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
              📋 Topic 10 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Write basic JSX elements with proper syntax",
                "Use curly braces {} for JavaScript expressions",
                "Apply camelCase for JSX attributes (className, onClick)",
                "Close all JSX tags (including self-closing)",
                "Wrap adjacent elements in a parent or fragment",
                "Differentiate between expressions and statements in JSX",
                "Use ternary operator for conditional rendering",
                "Fix common JSX errors like 'Adjacent JSX elements'",
                "Apply inline styles as JavaScript objects",
                "Follow JSX best practices for clean, maintainable code"
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
                to="/react-foundations/topic/Module1/11"
                className="inline-flex items-center gap-2
               px-6 py-3 rounded-lg
               bg-gradient-to-r from-blue-500 to-purple-600
               text-white font-medium"
              >
                Ready for Topic 11
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-sm text-gray-400">
                Next: JSX expressions vs statements
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 10: JSX Fundamentals</p>
            <p className="mt-2 text-sm">Mastering the syntax that makes React UIs possible</p>
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

export default Topic10;