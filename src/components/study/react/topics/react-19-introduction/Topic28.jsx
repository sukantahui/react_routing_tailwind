// Topic28.jsx - Debugging JSX and component errors
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic28 = () => {
  const [activeError, setActiveError] = useState(0);
  const [isFixed, setIsFixed] = useState([false, false, false, false, false]);

  // Common JSX/Component errors with examples
  const errors = [
    {
      id: 0,
      title: "Unclosed JSX Tags",
      description: "Missing closing tags is one of the most common JSX errors, especially when nesting elements.",
      errorCode: `
function Card() {
  return (
    <div className="card">
      <h1>Profile Card
      <p>This is my profile</p>
    </div>
  );
}`,
      fixedCode: `
function Card() {
  return (
    <div className="card">
      <h1>Profile Card</h1>
      <p>This is my profile</p>
    </div>
  );
}`,
      errorMessage: "Parsing error: Unterminated JSX contents",
      solution: "Always ensure every opening tag has a corresponding closing tag. Modern IDEs help by highlighting unclosed tags.",
      commonIn: "Beginners who are new to JSX syntax",
      example: "Swadeep often forgets to close his <div> tags when rushing through assignments."
    },
    {
      id: 1,
      title: "Returning Multiple Elements",
      description: "React components must return a single parent element. Multiple sibling elements cause errors.",
      errorCode: `
function Header() {
  return (
    <h1>Welcome</h1>
    <p>To our application</p>
  );
}`,
      fixedCode: `
function Header() {
  return (
    <div className="header">
      <h1>Welcome</h1>
      <p>To our application</p>
    </div>
  );
}`,
      errorMessage: "Adjacent JSX elements must be wrapped in an enclosing tag",
      solution: "Wrap multiple elements in a <div>, <> (Fragment), or any container element.",
      commonIn: "Components that need to return multiple UI elements",
      example: "Tuhina tried returning both a title and description without wrapping them."
    },
    {
      id: 2,
      title: "Using JavaScript Reserved Words",
      description: "JSX attributes that conflict with JavaScript keywords will fail silently or throw errors.",
      errorCode: `
function InputField() {
  return (
    <input class="form-input" for="username">
  );
}`,
      fixedCode: `
function InputField() {
  return (
    <input className="form-input" htmlFor="username">
  );
}`,
      errorMessage: "Invalid DOM property 'class'. Did you mean 'className'?",
      solution: "Use React-specific attribute names: 'className' instead of 'class', 'htmlFor' instead of 'for'.",
      commonIn: "Developers transitioning from HTML to JSX",
      example: "Abhronila kept using 'class' in her JSX after learning HTML in her web design course."
    },
    {
      id: 3,
      title: "Missing Curly Braces for JS Expressions",
      description: "Forgetting curly braces when embedding JavaScript expressions in JSX leads to literal strings.",
      errorCode: `
function Greeting({ name }) {
  return (
    <p>Hello, name!</p>
  );
}`,
      fixedCode: `
function Greeting({ name }) {
  return (
    <p>Hello, {name}!</p>
  );
}`,
      errorMessage: "No error, but displays 'Hello, name!' instead of 'Hello, John!'",
      solution: "Wrap JavaScript expressions in curly braces {} to evaluate them.",
      commonIn: "Dynamic content rendering with props or state",
      example: "Debangshu wrote 'Hello, {studentName}' but forgot the braces, showing it as text."
    },
    {
      id: 4,
      title: "Incorrect Event Handler Syntax",
      description: "Using string event handlers or incorrect function references causes runtime errors.",
      errorCode: `
function Button() {
  function handleClick() {
    console.log("Clicked!");
  }
  
  return (
    <button onclick="handleClick()">
      Click me
    </button>
  );
}`,
      fixedCode: `
function Button() {
  function handleClick() {
    console.log("Clicked!");
  }
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`,
      errorMessage: "Nothing happens on click, or 'handleClick is not defined' error",
      solution: "Use camelCase event names (onClick) and pass function reference without parentheses (unless you want immediate execution).",
      commonIn: "Event handling in functional components",
      example: "A student from Barrackpore used 'onclick' (lowercase) and couldn't figure out why events didn't fire."
    }
  ];

  // Common component errors
  const componentErrors = [
    {
      id: 5,
      title: "Incorrect Hook Usage",
      description: "Violating the Rules of Hooks leads to unexpected behavior and errors.",
      errorCode: `
function Profile() {
  if (user) {
    const [name, setName] = useState('');
  }
  
  return <div>{name}</div>;
}`,
      fixedCode: `
function Profile() {
  const [name, setName] = useState('');
  
  if (user) {
    // Use name here
  }
  
  return <div>{name}</div>;
}`,
      errorMessage: "React Hook 'useState' is called conditionally. React Hooks must be called in the exact same order.",
      solution: "Always call hooks at the top level of your component, never inside loops, conditions, or nested functions.",
      commonIn: "Conditional logic implementation",
      example: "Conditionally showing student data based on login status."
    },
    {
      id: 6,
      title: "Missing Key Prop in Lists",
      description: "Rendering lists without unique keys causes performance issues and state bugs.",
      errorCode: `
function StudentList({ students }) {
  return (
    <ul>
      {students.map((student) => (
        <li>{student.name}</li>
      ))}
    </ul>
  );
}`,
      fixedCode: `
function StudentList({ students }) {
  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
}`,
      errorMessage: "Warning: Each child in a list should have a unique 'key' prop.",
      solution: "Always provide a stable, unique key for each list item. Use IDs when available, not array indices.",
      commonIn: "Dynamic list rendering from arrays",
      example: "Displaying student lists from Ichapur college database."
    }
  ];

  const toggleFix = (index) => {
    const newFixed = [...isFixed];
    newFixed[index] = !newFixed[index];
    setIsFixed(newFixed);
  };

  // Animation styles
  const revealAnimation = `
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500">
      <style>{revealAnimation}</style>
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Debugging JSX & Component Errors
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Mastering error debugging is crucial for efficient React development. Learn to identify, understand, 
            and fix common JSX and component errors with practical examples and professional debugging techniques.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Why Debugging Matters</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proper debugging saves hours of development time. React's error messages are helpful guides—learn to read them correctly.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Common Error Patterns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Most React errors fall into predictable categories. Recognizing patterns helps fix issues faster.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Debugging Mindset</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Approach errors systematically: read message, locate source, understand cause, apply fix, verify solution.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Error Examples */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
            <span className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </span>
            Common JSX Syntax Errors
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {errors.map((error, index) => (
              <div 
                key={error.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                onMouseEnter={() => setActiveError(error.id)}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {error.title}
                    </h3>
                    <button
                      onClick={() => toggleFix(index)}
                      className={clsx(
                        "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                        isFixed[index] 
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50"
                      )}
                    >
                      {isFixed[index] ? '✓ Fixed' : 'Show Error'}
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {error.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Error Message: {error.errorMessage}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Common in: {error.commonIn}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    
                    <pre className={clsx(
                      "bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mt-6 transition-all duration-500",
                      isFixed[index] ? "opacity-60" : "opacity-100"
                    )}>
                      <code>
                        {isFixed[index] ? error.fixedCode : error.errorCode}
                      </code>
                    </pre>
                    
                    {isFixed[index] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-8 border-2 border-green-500/30">
                          <div className="text-center">
                            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-green-600 dark:text-green-400 font-semibold">
                              Fixed! {error.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Real Example:</span> {error.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Component-Specific Errors */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '0.9s' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
            <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </span>
            Component & Hook Errors
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {componentErrors.map((error, index) => (
              <div 
                key={error.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                style={{ animationDelay: `${1.0 + index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  {error.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {error.description}
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Error Code</h4>
                    <pre className="text-sm text-red-800 dark:text-red-300 overflow-x-auto">
                      {error.errorCode}
                    </pre>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Fixed Code</h4>
                    <pre className="text-sm text-green-800 dark:text-green-300 overflow-x-auto">
                      {error.fixedCode}
                    </pre>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Solution:</span> {error.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Debugging Checklist */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '1.2s' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Systematic Debugging Checklist
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {[
                {
                  step: 1,
                  title: "Read Error Message",
                  description: "React error messages are specific. Read them carefully—they often point directly to the problem.",
                  icon: "📋"
                },
                {
                  step: 2,
                  title: "Check Console",
                  description: "Browser DevTools console shows warnings and errors. Don't ignore yellow warnings—they indicate potential issues.",
                  icon: "🔍"
                },
                {
                  step: 3,
                  title: "Isolate Component",
                  description: "Comment out sections to isolate the error. Determine if it's JSX syntax, component logic, or data related.",
                  icon: "🎯"
                },
                {
                  step: 4,
                  title: "Verify Props/State",
                  description: "Check if props are passed correctly and state is initialized properly. Use console.log() strategically.",
                  icon: "✅"
                }
              ].map((item, index) => (
                <div 
                  key={item.step}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 group"
                  style={{ animationDelay: `${1.3 + index * 0.1}s` }}
                >
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Pro Tip: Use React Developer Tools
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Install React DevTools extension for Chrome/Firefox. It lets you inspect component hierarchy, 
                view props/state, and track component renders—invaluable for debugging complex components.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <code className="text-sm text-gray-800 dark:text-gray-300">
                    npm install -D @redux-devtools/extension
                  </code>
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls Section */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '1.5s' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
            <span className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m15.5 5.5l2.5-2.5-2.5-2.5M4 12l2.5 2.5L4 17m16-5l-2.5 2.5L20 17" />
              </svg>
            </span>
            Common Pitfalls & Solutions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                pitfall: "Ignoring Console Warnings",
                impact: "Warnings often become errors in production. They indicate suboptimal patterns that can cause bugs.",
                solution: "Always address React warnings. They're guidance from the React team about best practices.",
                example: "Missing key prop warnings → list reordering bugs"
              },
              {
                pitfall: "Overcomplicated Debugging",
                impact: "Beginners often change multiple things at once, making it hard to identify what fixed the issue.",
                solution: "Change one thing at a time. Use a systematic approach. Keep a debug log of what you tried.",
                example: "Changing JSX, props, and state all together when debugging"
              },
              {
                pitfall: "Not Using PropTypes/TypeScript",
                impact: "Runtime errors from incorrect prop types that could be caught at compile time.",
                solution: "Use PropTypes for basic validation or TypeScript for comprehensive type safety.",
                example: "Passing string instead of number to a component expecting numeric input"
              },
              {
                pitfall: "Forgetting Import Statements",
                impact: "'X is not defined' errors that confuse beginners.",
                solution: "Always check import statements. Modern IDEs auto-import, but verify when errors occur.",
                example: "Using useState without importing it from 'react'"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${1.6 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">❌</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {item.pitfall}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Impact</h4>
                        <p className="text-red-800 dark:text-red-300">{item.impact}</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h4>
                        <p className="text-green-800 dark:text-green-300">{item.solution}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Example:</span> {item.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '2s' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Best Practices for Error-Free Code
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Preventative Measures
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Use ESLint with React rules to catch errors before runtime
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Write smaller, focused components (Single Responsibility Principle)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Type check props with PropTypes or TypeScript
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Always provide keys for list items
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Keep components pure—same props, same output
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Debugging Tools
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                    🛠
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    React Developer Tools browser extension
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                    🛠
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Console logging with conditional breakpoints
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                    🛠
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Error Boundary components for production
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                    🛠
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Strict Mode for identifying potential problems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                    🛠
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Testing with React Testing Library
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '2.3s' }}
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors duration-300">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">👨‍🏫</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Teacher's Note
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Debugging is a skill that improves with practice. Remember these key points:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center flex-shrink-0 mt-1">
                        1
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Don't panic when you see red errors.</strong> React's error messages are designed to help you. Read them carefully—they often contain the exact solution.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center flex-shrink-0 mt-1">
                        2
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Develop a systematic approach.</strong> Start with console errors, then check JSX syntax, then component logic, then data flow. Change one thing at a time.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center flex-shrink-0 mt-1">
                        3
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Learn from mistakes.</strong> Keep a log of errors you've encountered and how you fixed them. This builds your debugging intuition over time.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center flex-shrink-0 mt-1">
                        4
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Use the tools.</strong> React Developer Tools, ESLint, and proper editor setup prevent many errors before they happen.
                      </span>
                    </li>
                  </ul>
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "When Debangshu from Naihati first encountered the 'key prop' warning, he ignored it. 
                      Later, when his student list started behaving strangely during filtering, he spent hours debugging 
                      before realizing it was the missing keys. Always address warnings—they're future errors waiting to happen."
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-800">
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Teacher:</strong> Sukanta Hui | 27 years experience | Web Development Specialist
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '2.6s' }}
        >
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thinking Exercise
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Think about...</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Why does React require keys for list items? What would happen if you used array indices as keys 
                  when items can be reordered, filtered, or deleted?
                </p>
              </div>
              
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Next time you get a JSX error, read the entire error message. Notice how React often points to 
                  the exact line and suggests the fix. What patterns do you notice in the error messages?
                </p>
              </div>
              
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Try changing this...</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Create a component with a deliberate error (like unclosed tag). Observe the error. Now fix it 
                  and notice how the error changes or disappears. This helps build error recognition skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div 
          className="animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '2.9s' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Professional Tips & Tricks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Error Boundary Pattern",
                description: "Wrap components with Error Boundaries to catch and display errors gracefully in production.",
                code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}`,
                tip: "Use at top-level or critical component boundaries"
              },
              {
                title: "Strategic Console Logging",
                description: "Use conditional logging and console groups to organize debug output.",
                code: `// Development-only logging
if (process.env.NODE_ENV === 'development') {
  console.group('Component Debug');
  console.log('Props:', props);
  console.log('State:', state);
  console.groupEnd();
}`,
                tip: "Automatically removed in production builds"
              },
              {
                title: "Component Isolation",
                description: "When debugging, isolate the problematic component by rendering it alone with test data.",
                code: `// Create a test file
import ProblemComponent from './ProblemComponent';

function TestWrapper() {
  return (
    <ProblemComponent 
      testProp="test value"
      onTest={() => console.log('test')}
    />
  );
}`,
                tip: "Eliminates parent component interference"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto mb-3">
                  <code>{item.code}</code>
                </pre>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Pro Tip:</strong> {item.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary Card */}
          <div className="mt-12 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Debugging Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-3 text-blue-300">Key Takeaways</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Read error messages carefully</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Check console for warnings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Use React Developer Tools</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-green-300">Common Errors</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Unclosed JSX tags</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Missing curly braces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Incorrect hook usage</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-purple-300">Next Steps</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Practice with deliberate errors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Install React DevTools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Set up ESLint for React</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic28;