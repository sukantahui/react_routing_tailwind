import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic27 = () => {
  // State for dark mode (default to true as specified)
  const [isDark, setIsDark] = useState(true);
  
  // Animation state for staggered reveal
  const [isVisible, setIsVisible] = useState(false);
  
  // Demo state for interactive examples
  const [activeMistake, setActiveMistake] = useState('parentElement');
  const [userCode, setUserCode] = useState(`function Welcome() {
  return 
    <div>
      <h1>Hello, Barrackpore College!</h1>
      <p>Welcome to React learning</p>
    </div>
}`);
  const [codeError, setCodeError] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  // Common mistakes data
  const commonMistakes = {
    parentElement: {
      title: "Missing Parent Element",
      error: "Adjacent JSX elements must be wrapped in an enclosing tag",
      wrongCode: `function StudentList() {
  return (
    <h2>Students of Barrackpore College</h2>
    <ul>
      <li>Swadeep - Shyamnagar</li>
      <li>Tuhina - Barrackpore</li>
    </ul>
  );
}`,
      correctCode: `function StudentList() {
  return (
    <div>
      <h2>Students of Barrackpore College</h2>
      <ul>
        <li>Swadeep - Shyamnagar</li>
        <li>Tuhina - Barrackpore</li>
      </ul>
    </div>
  );
}`,
      explanation: "JSX must return a single parent element. Use <div>, <>, or React.Fragment",
      errorMessage: "Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag"
    },
    classNameVsClass: {
      title: "className vs class",
      error: "Using 'class' instead of 'className'",
      wrongCode: `function StudentCard() {
  return (
    <div class="card">
      <h3 class="title">Student Details</h3>
      <p>Location: Barrackpore</p>
    </div>
  );
}`,
      correctCode: `function StudentCard() {
  return (
    <div className="card">
      <h3 className="title">Student Details</h3>
      <p>Location: Barrackpore</p>
    </div>
  );
}`,
      explanation: "JSX uses 'className' instead of 'class' because 'class' is a reserved keyword in JavaScript",
      errorMessage: "Warning: Invalid DOM property 'class'. Did you mean 'className'?"
    },
    jsExpression: {
      title: "JS Expressions in JSX",
      error: "Using JavaScript statements instead of expressions",
      wrongCode: `function Attendance() {
  const present = true;
  return (
    <div>
      <p>Swadeep's attendance: {
        if (present) {
          return 'Present';
        } else {
          return 'Absent';
        }
      }</p>
    </div>
  );
}`,
      correctCode: `function Attendance() {
  const present = true;
  return (
    <div>
      <p>Swadeep's attendance: {
        present ? 'Present' : 'Absent'
      }</p>
    </div>
  );
}`,
      explanation: "JSX can only contain expressions, not statements. Use ternary operators or immediately invoked functions",
      errorMessage: "Parsing error: Unexpected token"
    },
    selfClosing: {
      title: "Self-closing Tags",
      error: "Forgetting to close void elements",
      wrongCode: `function ImageGallery() {
  return (
    <div>
      <img src="college.jpg" alt="Barrackpore College">
      <br>
      <hr>
      <input type="text" placeholder="Student name">
    </div>
  );
}`,
      correctCode: `function ImageGallery() {
  return (
    <div>
      <img src="college.jpg" alt="Barrackpore College" />
      <br />
      <hr />
      <input type="text" placeholder="Student name" />
    </div>
  );
}`,
      explanation: "Void elements in JSX must be self-closed with />",
      errorMessage: "Parsing error: Unterminated JSX contents"
    },
    mapKey: {
      title: "Missing key Prop in map()",
      error: "Forgetting to add unique 'key' prop when rendering lists",
      wrongCode: `function StudentList() {
  const students = ['Swadeep', 'Tuhina', 'Abhronila'];
  return (
    <ul>
      {students.map(student => (
        <li>{student}</li>
      ))}
    </ul>
  );
}`,
      correctCode: `function StudentList() {
  const students = ['Swadeep', 'Tuhina', 'Abhronila'];
  return (
    <ul>
      {students.map((student, index) => (
        <li key={index}>{student}</li>
      ))}
    </ul>
  );
}`,
      explanation: "React needs keys to identify which items have changed, are added, or are removed",
      errorMessage: "Warning: Each child in a list should have a unique 'key' prop"
    },
    eventHandler: {
      title: "Event Handler Mistakes",
      error: "Calling function instead of passing reference",
      wrongCode: `function AttendanceButton() {
  const markPresent = () => {
    console.log('Marked present');
  };
  
  return (
    <button onClick={markPresent()}>
      Mark Present
    </button>
  );
}`,
      correctCode: `function AttendanceButton() {
  const markPresent = () => {
    console.log('Marked present');
  };
  
  return (
    <button onClick={markPresent}>
      Mark Present
    </button>
  );
}`,
      explanation: "Event handlers should be passed as function references, not function calls",
      errorMessage: "Infinite re-renders or immediate execution"
    },
    stateMutation: {
      title: "Direct State Mutation",
      error: "Modifying state directly instead of using setState",
      wrongCode: `function StudentManager() {
  const [student, setStudent] = useState({
    name: 'Swadeep',
    location: 'Shyamnagar'
  });
  
  const updateLocation = () => {
    student.location = 'Barrackpore'; // ❌ Wrong
  };
  
  return <button onClick={updateLocation}>Update</button>;
}`,
      correctCode: `function StudentManager() {
  const [student, setStudent] = useState({
    name: 'Swadeep',
    location: 'Shyamnagar'
  });
  
  const updateLocation = () => {
    setStudent({...student, location: 'Barrackpore'}); // ✅ Correct
  };
  
  return <button onClick={updateLocation}>Update</button>;
}`,
      explanation: "React state should be treated as immutable. Always create new objects/arrays",
      errorMessage: "UI doesn't update when state changes"
    },
    hookRules: {
      title: "Rules of Hooks Violation",
      error: "Calling hooks conditionally or in loops",
      wrongCode: `function StudentProfile({ isAdmin }) {
  if (isAdmin) {
    const [adminData, setAdminData] = useState(null); // ❌
  }
  
  const [studentData, setStudentData] = useState(null);
  
  return <div>Profile</div>;
}`,
      correctCode: `function StudentProfile({ isAdmin }) {
  const [studentData, setStudentData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  
  // Use adminData conditionally
  return <div>Profile</div>;
}`,
      explanation: "Hooks must be called at the top level of React functions, not conditionally",
      errorMessage: "React Hook \"useState\" is called conditionally"
    }
  };
  
  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Validate user code
  const validateCode = () => {
    const code = userCode;
    
    // Check for common mistakes
    if (code.includes('return\n')) {
      setCodeError('❌ Automatic Semicolon Insertion: Add opening parentheses after return');
      setShowHint(true);
    } else if (code.includes(' class="')) {
      setCodeError('❌ Use className instead of class');
      setShowHint(true);
    } else if (code.includes('<img') && !code.includes('/>')) {
      setCodeError('❌ Self-close void elements: <img src="..." />');
      setShowHint(true);
    } else {
      setCodeError('✅ Code looks good!');
      setShowHint(false);
    }
  };
  
  // Get active mistake details
  const activeDetails = commonMistakes[activeMistake];

  return (
    <div className={clsx(
      "min-h-screen transition-all duration-500",
      isDark 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
    )}>
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <div className={clsx(
            "max-w-6xl mx-auto",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            "transition-all duration-700 motion-safe:animate-[fadeIn_0.8s_ease-out]"
          )}>
            {/* Theme Toggle */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsDark(!isDark)}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all duration-300",
                  "hover:scale-105 hover:shadow-lg",
                  isDark 
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" 
                    : "bg-white hover:bg-gray-50 border border-gray-200 shadow"
                )}
              >
                <span className="flex items-center gap-2">
                  {isDark ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      Switch to Dark Mode
                    </>
                  )}
                </span>
              </button>
            </div>

            <h1 className={clsx(
              "text-4xl md:text-5xl font-bold mb-6",
              isDark ? "text-white" : "text-gray-900",
              "motion-safe:animate-[slideUp_0.8s_ease-out]"
            )}>
              Topic 28: Common JSX & Component Mistakes
            </h1>
            
            <p className={clsx(
              "text-xl mb-8",
              isDark ? "text-gray-300" : "text-gray-700",
              "motion-safe:animate-[slideUp_0.8s_ease-out_0.1s] motion-safe:animation-fill-forwards opacity-0"
            )}>
              Learn from errors - Every React developer makes these mistakes!
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        {/* Introduction Card */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-150"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-3xl font-bold mb-6 pb-4 border-b",
              isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-300"
            )}>
              🚨 Why Do Beginners Make These Mistakes?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className={clsx(
                    "text-xl font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    The Learning Curve is Normal
                  </h3>
                  <p className={clsx(
                    "leading-relaxed",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    Every React developer from Barrackpore to Bangalore has made these exact mistakes. 
                    They're part of the learning process. The key is to recognize them quickly and know how to fix them.
                  </p>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h4 className={clsx(
                    "font-semibold mb-3",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    Real-World Classroom Analogy
                  </h4>
                  <ul className={clsx(
                    "space-y-2 pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">📝</span>
                      <span><strong>HTML habits:</strong> Using class instead of className</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">🔗</span>
                      <span><strong>JavaScript confusion:</strong> Statements vs expressions in JSX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">🎯</span>
                      <span><strong>React specifics:</strong> Keys, fragments, hook rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">💡</span>
                      <span><strong>Debugging skill:</strong> Reading error messages correctly</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className={clsx(
                "p-6 rounded-xl",
                isDark ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
              )}>
                <h3 className={clsx(
                  "text-xl font-semibold mb-4",
                  isDark ? "text-purple-300" : "text-purple-600"
                )}>
                  Most Common Error Categories
                </h3>
                
                <div className="space-y-4">
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        isDark ? "bg-red-900" : "bg-red-100"
                      )}>
                        <span className="text-red-400">⚡</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        JSX Syntax Errors
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Missing parent elements, wrong attribute names
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        isDark ? "bg-yellow-900" : "bg-yellow-100"
                      )}>
                        <span className="text-yellow-400">🔄</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        State & Props Issues
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Mutating state, wrong prop usage
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        isDark ? "bg-green-900" : "bg-green-100"
                      )}>
                        <span className="text-green-400">⚓</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Hook Rule Violations
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Conditional hooks, wrong hook usage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Mistakes Explorer */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-300"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Interactive Mistakes Explorer
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column - Mistakes List */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-4 flex items-center gap-2",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    Common Mistakes
                  </h3>
                  
                  <div className="space-y-2">
                    {Object.entries(commonMistakes).map(([key, mistake]) => (
                      <div
                        key={key}
                        className={clsx(
                          "p-3 rounded-lg cursor-pointer transition-all duration-200",
                          "hover:scale-[1.02] hover:shadow-md",
                          activeMistake === key
                            ? isDark
                              ? "bg-blue-900/50 border border-blue-700"
                              : "bg-blue-100 border border-blue-300"
                            : isDark
                              ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                              : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                        )}
                        onClick={() => setActiveMistake(key)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={clsx(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          )}>
                            <span className="text-red-400">❌</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{mistake.title}</div>
                            <div className="text-xs mt-1 opacity-75 truncate">
                              {mistake.error}
                            </div>
                          </div>
                          {activeMistake === key && (
                            <div className={clsx(
                              "w-2 h-2 rounded-full",
                              isDark ? "bg-blue-400" : "bg-blue-500"
                            )} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Statistics */}
                  <div className={clsx(
                    "mt-6 p-4 rounded-lg",
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  )}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className={clsx(
                          "text-2xl font-bold",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          {Object.keys(commonMistakes).length}
                        </div>
                        <div className={clsx(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Common Mistakes
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={clsx(
                          "text-2xl font-bold",
                          isDark ? "text-green-400" : "text-green-600"
                        )}>
                          90%
                        </div>
                        <div className={clsx(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Beginner Coverage
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Middle Column - Wrong Code */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={clsx(
                      "text-lg font-semibold flex items-center gap-2",
                      isDark ? "text-red-300" : "text-red-600"
                    )}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Wrong Code
                    </h3>
                    <span className={clsx(
                      "px-3 py-1 rounded-lg text-sm",
                      isDark ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-700"
                    )}>
                      ❌ Error
                    </span>
                  </div>
                  
                  {/* Code Display - Wrong */}
                  <div className={clsx(
                    "p-4 rounded-lg mb-4 h-64 overflow-y-auto",
                    isDark ? "bg-gray-900" : "bg-red-50"
                  )}>
                    <pre className="text-sm text-gray-300 font-mono">
                      <code>{activeDetails.wrongCode}</code>
                    </pre>
                  </div>
                  
                  {/* Error Message */}
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDark ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                  )}>
                    <h4 className={clsx(
                      "font-semibold mb-2 flex items-center gap-2",
                      isDark ? "text-red-300" : "text-red-600"
                    )}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Error Message
                    </h4>
                    <p className={clsx(
                      "text-sm font-mono",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      {activeDetails.errorMessage}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Correct Code */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={clsx(
                      "text-lg font-semibold flex items-center gap-2",
                      isDark ? "text-green-300" : "text-green-600"
                    )}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Correct Code
                    </h3>
                    <span className={clsx(
                      "px-3 py-1 rounded-lg text-sm",
                      isDark ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"
                    )}>
                      ✅ Fixed
                    </span>
                  </div>
                  
                  {/* Code Display - Correct */}
                  <div className={clsx(
                    "p-4 rounded-lg mb-4 h-64 overflow-y-auto",
                    isDark ? "bg-gray-900" : "bg-green-50"
                  )}>
                    <pre className="text-sm text-gray-300 font-mono">
                      <code>{activeDetails.correctCode}</code>
                    </pre>
                  </div>
                  
                  {/* Explanation */}
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDark ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                  )}>
                    <h4 className={clsx(
                      "font-semibold mb-2 flex items-center gap-2",
                      isDark ? "text-green-300" : "text-green-600"
                    )}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Why This Works
                    </h4>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      {activeDetails.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Validator Tool */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-500"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Code Validator Tool
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Code Editor */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={clsx(
                      "text-lg font-semibold",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      Test Your JSX Code
                    </h3>
                    <button
                      onClick={validateCode}
                      className={clsx(
                        "px-4 py-2 rounded-lg transition-all duration-300",
                        "hover:scale-105",
                        isDark 
                          ? "bg-blue-700 hover:bg-blue-600" 
                          : "bg-blue-500 hover:bg-blue-400 text-white"
                      )}
                    >
                      Validate Code
                    </button>
                  </div>
                  
                  {/* Code Editor */}
                  <div className={clsx(
                    "p-4 rounded-lg mb-4",
                    isDark ? "bg-gray-900" : "bg-white border border-gray-300"
                  )}>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className={clsx(
                        "w-full h-64 font-mono text-sm resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        isDark 
                          ? "bg-gray-900 text-gray-300" 
                          : "bg-white text-gray-900"
                      )}
                      spellCheck="false"
                    />
                  </div>
                  
                  {/* Validation Result */}
                  <div className={clsx(
                    "p-4 rounded-lg",
                    codeError.startsWith('✅')
                      ? isDark 
                        ? "bg-green-900/20 border border-green-700/30" 
                        : "bg-green-50 border border-green-200"
                      : isDark
                        ? "bg-red-900/20 border border-red-700/30"
                        : "bg-red-50 border border-red-200"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        codeError.startsWith('✅')
                          ? isDark ? "bg-green-900" : "bg-green-100"
                          : isDark ? "bg-red-900" : "bg-red-100"
                      )}>
                        {codeError.startsWith('✅') ? (
                          <span className="text-green-400">✅</span>
                        ) : (
                          <span className="text-red-400">❌</span>
                        )}
                      </div>
                      <div>
                        <h4 className={clsx(
                          "font-semibold",
                          codeError.startsWith('✅')
                            ? isDark ? "text-green-300" : "text-green-600"
                            : isDark ? "text-red-300" : "text-red-600"
                        )}>
                          Validation Result
                        </h4>
                        <p className={clsx(
                          "text-sm mt-1",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          {codeError}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hint Section */}
                    {showHint && (
                      <div className={clsx(
                        "mt-4 p-3 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      )}>
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className="text-sm font-medium flex items-center gap-2 w-full"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          Click for Hint
                        </button>
                        
                        {showHint && (
                          <div className="mt-3 space-y-2">
                            <p className={clsx(
                              "text-sm",
                              isDark ? "text-gray-300" : "text-gray-700"
                            )}>
                              <strong>Automatic Semicolon Insertion (ASI):</strong> JavaScript automatically adds semicolons at the end of lines. When you write:
                            </p>
                            <pre className="text-xs p-2 rounded bg-gray-900 text-red-300">
{`return 
  <div>Hello</div>;

// Becomes:
return;
  <div>Hello</div>;`}
                            </pre>
                            <p className={clsx(
                              "text-sm",
                              isDark ? "text-gray-300" : "text-gray-700"
                            )}>
                              <strong>Solution:</strong> Put opening brace on same line as return:
                            </p>
                            <pre className="text-xs p-2 rounded bg-gray-900 text-green-300">
{`return (
  <div>Hello</div>
);`}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Common Patterns */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-4",
                    isDark ? "text-yellow-300" : "text-yellow-600"
                  )}>
                    Quick Fix Patterns
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Pattern 1 */}
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-blue-900" : "bg-blue-100"
                        )}>
                          <span className="text-blue-400">🔧</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold mb-1",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Fragment Pattern
                          </h4>
                          <p className={clsx(
                            "text-sm",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            Use <>&lt;&gt;&lt;/&gt;</> or React.Fragment to avoid extra divs
                          </p>
                          <pre className="text-xs mt-2 p-2 rounded bg-gray-900/50 text-green-300">
{`return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pattern 2 */}
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-green-900" : "bg-green-100"
                        )}>
                          <span className="text-green-400">🎯</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold mb-1",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Key Prop Pattern
                          </h4>
                          <p className={clsx(
                            "text-sm",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            Always add unique key when mapping arrays
                          </p>
                          <pre className="text-xs mt-2 p-2 rounded bg-gray-900/50 text-green-300">
{`students.map((student, index) => (
  <li key={student.id || index}>
    {student.name}
  </li>
))`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pattern 3 */}
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-purple-900" : "bg-purple-100"
                        )}>
                          <span className="text-purple-400">⚡</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold mb-1",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Event Handler Pattern
                          </h4>
                          <p className={clsx(
                            "text-sm",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            Pass function reference, don't call it
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <pre className="text-xs p-2 rounded bg-gray-900/50 text-red-300">
{`onClick={handleClick()} ❌`}
                            </pre>
                            <pre className="text-xs p-2 rounded bg-gray-900/50 text-green-300">
{`onClick={handleClick} ✅`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Debugging Strategies */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-700"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Debugging Strategies
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <h3 className={clsx(
                    "text-xl font-semibold mb-4",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    Reading Error Messages
                  </h3>
                  
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <div className="space-y-4">
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-white"
                      )}>
                        <h4 className={clsx(
                          "font-medium mb-2 text-red-400",
                          isDark ? "text-red-300" : "text-red-600"
                        )}>
                          ❌ Error: Adjacent JSX elements...
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>What it means:</strong> You have multiple elements at the same level without a parent
                        </p>
                        <p className={clsx(
                          "text-sm mt-2",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>Look for:</strong> Two or more sibling elements after return
                        </p>
                      </div>
                      
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-white"
                      )}>
                        <h4 className={clsx(
                          "font-medium mb-2 text-yellow-400",
                          isDark ? "text-yellow-300" : "text-yellow-600"
                        )}>
                          ⚠️ Warning: Each child in a list...
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>What it means:</strong> You're rendering a list without unique keys
                        </p>
                        <p className={clsx(
                          "text-sm mt-2",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>Look for:</strong> .map() without key prop
                        </p>
                      </div>
                      
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-white"
                      )}>
                        <h4 className={clsx(
                          "font-medium mb-2 text-red-400",
                          isDark ? "text-red-300" : "text-red-600"
                        )}>
                          ❌ Error: React Hook is called conditionally
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>What it means:</strong> Hooks are called inside if/for/while
                        </p>
                        <p className={clsx(
                          "text-sm mt-2",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>Look for:</strong> useState/useEffect inside conditions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                )}>
                  <h4 className={clsx(
                    "font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-red-300" : "text-red-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Silent Errors (No Console Errors)
                  </h4>
                  <ul className={clsx(
                    "space-y-3 text-sm",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <strong>UI doesn't update:</strong> Direct state mutation
                        <p className="text-xs mt-1 opacity-75">
                          Check if you're modifying state directly instead of using setState
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <strong>Event handler fires immediately:</strong> 
                        {`onClick={handleClick()}`}
                        <p className="text-xs mt-1 opacity-75">
                          {`Remove parentheses: onClick={handleClick}`}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <strong>Component renders undefined:</strong> Automatic semicolon insertion
                        <pre className="text-xs mt-1 p-2 rounded bg-gray-900/50">
{`return      // ❌ Adds semicolon here
  <div>Hello</div>;

return (     // ✅ Correct
  <div>Hello</div>
);`}
                        </pre>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <h3 className={clsx(
                    "text-xl font-semibold mb-4",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    Systematic Debugging Approach
                  </h3>
                  
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={clsx(
                        "p-3 rounded-xl",
                        isDark ? "bg-green-900" : "bg-green-100"
                      )}>
                        <span className="text-green-400">🔍</span>
                      </div>
                      <div>
                        <h4 className={clsx(
                          "font-semibold",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          Barrackpore College Debugging Method
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Step-by-step approach I teach my students
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                            isDark ? "bg-blue-700" : "bg-blue-100 text-blue-700"
                          )}>1</span>
                          <span className={clsx(
                            "font-medium",
                            isDark ? "text-white" : "text-gray-900"
                          )}>Read the error message</span>
                        </div>
                        <p className={clsx(
                          "text-sm pl-8",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Don't panic! Read carefully - React gives excellent error messages
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                            isDark ? "bg-green-700" : "bg-green-100 text-green-700"
                          )}>2</span>
                          <span className={clsx(
                            "font-medium",
                            isDark ? "text-white" : "text-gray-900"
                          )}>Check the common mistakes list</span>
                        </div>
                        <p className={clsx(
                          "text-sm pl-8",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          90% of beginner errors are in this list
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                            isDark ? "bg-yellow-700" : "bg-yellow-100 text-yellow-700"
                          )}>3</span>
                          <span className={clsx(
                            "font-medium",
                            isDark ? "text-white" : "text-gray-900"
                          )}>Simplify and isolate</span>
                        </div>
                        <p className={clsx(
                          "text-sm pl-8",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Remove code until error disappears, then add back piece by piece
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                            isDark ? "bg-purple-700" : "bg-purple-100 text-purple-700"
                          )}>4</span>
                          <span className={clsx(
                            "font-medium",
                            isDark ? "text-white" : "text-gray-900"
                          )}>Use React DevTools</span>
                        </div>
                        <p className={clsx(
                          "text-sm pl-8",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Inspect component tree, props, and state
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                )}>
                  <h4 className={clsx(
                    "font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Professional Tips
                  </h4>
                  <ul className={clsx(
                    "space-y-2 text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Keep the React error message page open in another tab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Use ESLint with React plugin - catches 80% of errors before runtime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Create a "common mistakes" cheat sheet for quick reference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>When stuck, explain the problem to someone (or a rubber duck)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={clsx(
          "max-w-6xl mx-auto mt-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-900"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300 group",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gradient-to-br from-blue-900/30 to-purple-900/30 hover:from-blue-900/40 hover:to-purple-900/40 backdrop-blur-sm border border-blue-700/30" 
              : "bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200 shadow-lg"
          )}>
            <div className="flex items-start gap-4">
              <div className={clsx(
                "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110",
                isDark ? "bg-blue-900/50" : "bg-blue-100"
              )}>
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="flex-1">
                <h3 className={clsx(
                  "text-2xl font-bold mb-4",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  Teacher's Note
                </h3>
                
                <div className={clsx(
                  "mb-6 p-6 rounded-xl",
                  isDark ? "bg-gray-900/50" : "bg-white/80"
                )}>
                  <p className={clsx(
                    "text-lg leading-relaxed mb-4",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <strong>Dear Students,</strong> Making mistakes is how we learn React. 
                    When Swadeep from Shyamnagar first started, he made every single mistake on this list. 
                    The key difference between beginners and professionals isn't <strong>not making mistakes</strong>, 
                    but <strong>recognizing and fixing them quickly</strong>.
                  </p>
                  
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4 mt-4",
                    isDark ? "border-yellow-500 bg-yellow-900/20" : "border-yellow-400 bg-yellow-50"
                  )}>
                    <p className={clsx(
                      "font-semibold",
                      isDark ? "text-yellow-300" : "text-yellow-700"
                    )}>
                      Key Insight: Every error message is React trying to help you. Learn to read them like a friend's advice.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <h4 className={clsx(
                      "font-bold mb-3 flex items-center gap-2",
                      isDark ? "text-green-300" : "text-green-600"
                    )}>
                      Classroom Success Story
                    </h4>
                    <ol className={clsx(
                      "space-y-3 text-sm pl-6",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">Week 1:</strong>
                        <span>Tuhina spent 2 hours debugging "class" vs "className"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">Week 2:</strong>
                        <span>She made the same mistake but fixed it in 2 minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">Week 3:</strong>
                        <span>She caught the error while typing, before running the code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">Today:</strong>
                        <span>She teaches other students how to avoid this mistake</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <h4 className={clsx(
                      "font-bold mb-3 flex items-center gap-2",
                      isDark ? "text-blue-300" : "text-blue-600"
                    )}>
                      Mindset Shift
                    </h4>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      Instead of thinking "I made an error", think "React is telling me how to write better code".
                    </p>
                    <div className={clsx(
                      "mt-4 p-3 rounded-lg text-xs",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code>"Errors are not failures, they're learning opportunities in disguise"</code>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "mt-6 pt-6 border-t",
                  isDark ? "border-gray-700" : "border-gray-300"
                )}>
                  <p className={clsx(
                    "text-sm flex items-center gap-2",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <strong>Sukanta Hui</strong> | 27 years experience | 
                      <a href="mailto:sukantahui@codernaccotax.co.in" className="ml-2 hover:underline">
                        sukantahui@codernaccotax.co.in
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={clsx(
          "max-w-6xl mx-auto mt-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-1000"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist & Practice
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4",
                  isDark ? "text-blue-300" : "text-blue-600"
                )}>
                  ✅ Error Recognition Checklist:
                </h3>
                <ul className={clsx(
                  "space-y-3",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can recognize "Adjacent JSX elements" error</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Know to use className instead of class</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Always add keys when using .map()</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Never call hooks conditionally</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Use fragments to avoid extra divs</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4",
                  isDark ? "text-green-300" : "text-green-600"
                )}>
                  🛠 Debugging Practice:
                </h3>
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50" : "bg-gray-50"
                )}>
                  <p className={clsx(
                    "mb-4",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    Fix this buggy Barrackpore College component:
                  </p>
                  <pre className={clsx(
                    "text-sm p-4 rounded-lg overflow-x-auto",
                    isDark ? "bg-gray-800 text-red-300" : "bg-red-50 text-red-700"
                  )}>
{`function BuggyComponent() {
  const [students] = useState(['Swadeep', 'Tuhina']);
  const [count, setCount] = useState(0);
  
  if (count > 0) {
    const [extra, setExtra] = useState(''); // ❌
  }
  
  return 
    <div class="container">
      <h1>Barrackpore Students</h1>
      <ul>
        {students.map(student => (
          <li>{student}</li>
        ))}
      </ul>
      <button onClick={setCount(count + 1)}>
        Count: {count}
      </button>
      <img src="college.jpg" alt="College">
    </div>
}`}
                  </pre>
                  
                  <div className={clsx(
                    "mt-6 p-4 rounded-lg",
                    isDark ? "bg-blue-900/30" : "bg-blue-50"
                  )}>
                    <h4 className={clsx(
                      "font-medium mb-2",
                      isDark ? "text-blue-300" : "text-blue-600"
                    )}>
                      💡 Hint Section
                    </h4>
                    <p className={clsx(
                      "text-sm italic",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Count the errors:</strong> There are at least 5 mistakes in this code. How many can you find?
                    </p>
                    <p className={clsx(
                      "text-sm italic mt-2",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Systematic approach:</strong> Fix one error at a time, starting with syntax errors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={clsx(
              "mt-8 p-6 rounded-xl text-center",
              isDark ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-gray-50 to-gray-100"
            )}>
              <p className={clsx(
                "text-lg",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                <strong>Remember:</strong> Every professional React developer was once a beginner who made these exact same mistakes!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic27;