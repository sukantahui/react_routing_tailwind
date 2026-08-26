import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import clsx from 'clsx';

// Example: Component with unnecessary state
const UnnecessaryStateExample = () => {
  const [firstName, setFirstName] = useState('Swadeep');
  const [lastName, setLastName] = useState('Das');
  const [fullName, setFullName] = useState('');
  
  // ❌ Bad: Storing computed value in state
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);
  
  return (
    <div className={clsx(
      "rounded-xl p-5 border-2",
      "border-red-500/50 bg-red-900/10"
    )}>
      <h4 className="font-bold mb-3 text-red-400">❌ Unnecessary State</h4>
      <div className="space-y-3">
        <div>
          <div className="text-sm opacity-70">First Name:</div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div>
          <div className="text-sm opacity-70">Last Name:</div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div>
          <div className="text-sm opacity-70">Full Name (computed):</div>
          <div className="font-bold">{fullName}</div>
        </div>
        <div className="text-xs text-red-400">
          ❌ Problem: fullName is computed but stored in state
        </div>
      </div>
    </div>
  );
};

// Example: Component without unnecessary state
const OptimizedExample = () => {
  const [firstName, setFirstName] = useState('Tuhina');
  const [lastName, setLastName] = useState('Sarkar');
  
  // ✅ Good: Compute during render
  const fullName = `${firstName} ${lastName}`;
  
  return (
    <div className={clsx(
      "rounded-xl p-5 border-2",
      "border-green-500/50 bg-green-900/10"
    )}>
      <h4 className="font-bold mb-3 text-green-400">✅ Optimized Version</h4>
      <div className="space-y-3">
        <div>
          <div className="text-sm opacity-70">First Name:</div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div>
          <div className="text-sm opacity-70">Last Name:</div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div>
          <div className="text-sm opacity-70">Full Name (computed):</div>
          <div className="font-bold">{fullName}</div>
        </div>
        <div className="text-xs text-green-400">
          ✅ Better: fullName computed during render, no extra state
        </div>
      </div>
    </div>
  );
};

// Example: Derived state vs stored state
const StudentGrades = () => {
  const [grades, setGrades] = useState([
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 92 },
    { subject: 'English', score: 78 },
    { subject: 'History', score: 88 },
  ]);
  
  const [newSubject, setNewSubject] = useState('');
  const [newScore, setNewScore] = useState(0);
  
  // Derived values (computed during render)
  const averageGrade = grades.length > 0 
    ? grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length 
    : 0;
  
  const highestGrade = grades.length > 0
    ? Math.max(...grades.map(g => g.score))
    : 0;
  
  const gradeLetter = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };
  
  const addGrade = () => {
    if (newSubject.trim()) {
      setGrades([...grades, { subject: newSubject, score: newScore }]);
      setNewSubject('');
      setNewScore(0);
    }
  };
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
    )}>
      <h4 className="font-bold mb-4 text-blue-400">📊 Student Grades Analysis</h4>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h5 className="font-bold mb-3">Add New Grade</h5>
          <div className="space-y-3">
            <div>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Subject name"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-70">Score:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newScore}
                  onChange={(e) => setNewScore(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="font-bold">{newScore}</span>
              </div>
            </div>
            <button
              onClick={addGrade}
              className="w-full py-2 bg-green-600 hover:bg-green-500 rounded-lg"
            >
              Add Grade
            </button>
          </div>
        </div>
        
        <div>
          <h5 className="font-bold mb-3">Derived Values (Computed)</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
              <span>Average Grade:</span>
              <span className="font-bold text-xl text-blue-300">{averageGrade.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
              <span>Highest Grade:</span>
              <span className="font-bold text-xl text-green-300">{highestGrade}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
              <span>Total Subjects:</span>
              <span className="font-bold text-xl text-purple-300">{grades.length}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h5 className="font-bold mb-3">Grade Details</h5>
        <div className="space-y-2">
          {grades.map((grade, index) => (
            <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
              <div>
                <span className="font-medium">{grade.subject}</span>
                <span className="text-sm opacity-70 ml-3">Score: {grade.score}</span>
              </div>
              <div className={clsx(
                "px-3 py-1 rounded-full text-sm font-bold",
                grade.score >= 90 ? "bg-green-900/50 text-green-300" :
                grade.score >= 80 ? "bg-blue-900/50 text-blue-300" :
                grade.score >= 70 ? "bg-yellow-900/50 text-yellow-300" :
                grade.score >= 60 ? "bg-orange-900/50 text-orange-300" :
                "bg-red-900/50 text-red-300"
              )}>
                {gradeLetter(grade.score)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm p-3 rounded-lg bg-gray-800/30">
        <div className="font-bold mb-1">What's happening here?</div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><span className="font-semibold">grades</span> is stored state (changes over time)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">✓</span>
            <span><span className="font-semibold">averageGrade</span> is derived (computed from grades)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">✓</span>
            <span><span className="font-semibold">gradeLetter</span> is a pure function (no state needed)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Example: useRef for values that shouldn't trigger re-renders
const TimerExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const renderCountRef = useRef(0);
  
  renderCountRef.current++;
  
  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      setIsRunning(true);
    }
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };
  
  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-orange-900/20 to-red-900/20"
    )}>
      <h4 className="font-bold mb-4 text-orange-400">⏱️ Timer with useRef</h4>
      
      <div className="text-center mb-6">
        <div className="text-5xl font-bold mb-2 text-orange-300">{seconds}</div>
        <div className="text-sm opacity-70">seconds elapsed</div>
      </div>
      
      <div className="flex gap-2 mb-6">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded-lg disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!isRunning}
          className="flex-1 py-2 bg-red-600 hover:bg-red-500 rounded-lg disabled:opacity-50"
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
          <span>Render Count:</span>
          <span className="font-bold text-purple-300">{renderCountRef.current}</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
          <span>Timer Running:</span>
          <span className="font-bold">{isRunning ? '✅ Yes' : '❌ No'}</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
          <span>Interval ID:</span>
          <span className="font-mono text-sm">{intervalRef.current ? 'Set' : 'Null'}</span>
        </div>
      </div>
      
      <div className="mt-4 text-sm p-3 rounded-lg bg-gray-800/30">
        <div className="font-bold mb-1">Why useRef here?</div>
        <p className="opacity-80">
          <span className="font-semibold">intervalRef</span> stores the interval ID without triggering re-renders.
          <span className="font-semibold"> renderCountRef</span> tracks renders without causing infinite loops.
        </p>
      </div>
    </div>
  );
};

// Decision Tree Component
const StateDecisionTree = () => {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  
  const questions = [
    {
      id: 1,
      question: "Does the data change over time?",
      yes: 2,
      no: "noState",
      explanation: "Static data doesn't need state"
    },
    {
      id: 2,
      question: "Is the data derived from other state/props?",
      yes: "derived",
      no: 3,
      explanation: "Derived values should be computed, not stored"
    },
    {
      id: 3,
      question: "Does the data need to persist between renders?",
      yes: 4,
      no: "noState",
      explanation: "Temporary data can be local variables"
    },
    {
      id: 4,
      question: "Does changing it require a UI update?",
      yes: "useState",
      no: "useRef",
      explanation: "No UI update? Consider useRef"
    }
  ];
  
  const currentQuestion = questions.find(q => q.id === currentStep);
  
  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentStep]: answer });
    
    if (answer === 'yes' && typeof currentQuestion.yes === 'number') {
      setCurrentStep(currentQuestion.yes);
    } else if (answer === 'no' && typeof currentQuestion.no === 'number') {
      setCurrentStep(currentQuestion.no);
    } else {
      // Reached a conclusion
      setCurrentStep(answer === 'yes' ? currentQuestion.yes : currentQuestion.no);
    }
  };
  
  const resetTree = () => {
    setAnswers({});
    setCurrentStep(1);
  };
  
  const getConclusion = (result) => {
    switch (result) {
      case 'noState':
        return {
          title: "✅ No State Needed",
          description: "This data doesn't need to be React state. Use props, local variables, or constants.",
          color: "green",
          example: "Static configuration, computed values, or temporary variables"
        };
      case 'derived':
        return {
          title: "🔄 Derived Value",
          description: "Compute this during render. Don't store derived values in state.",
          color: "blue",
          example: "Full name (first + last), totals, averages, filtered lists"
        };
      case 'useState':
        return {
          title: "📊 Use useState",
          description: "This should be React state. It changes and requires UI updates.",
          color: "purple",
          example: "Form inputs, user selections, toggles, counters"
        };
      case 'useRef':
        return {
          title: "🎯 Use useRef",
          description: "Persist values between renders without triggering re-renders.",
          color: "orange",
          example: "Timer IDs, DOM references, previous values"
        };
      default:
        return {
          title: "Start Decision Tree",
          description: "Answer the questions to determine if you need state.",
          color: "gray"
        };
    }
  };
  
  const conclusion = typeof currentStep === 'string' 
    ? getConclusion(currentStep)
    : getConclusion(null);
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-purple-900/20 to-pink-900/20"
    )}>
      <h4 className="font-bold mb-4 text-purple-400">🌳 State Decision Tree</h4>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Step {typeof currentStep === 'number' ? currentQuestion.id : 'Conclusion'}</div>
          <button
            onClick={resetTree}
            className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Reset
          </button>
        </div>
        
        {typeof currentStep === 'number' ? (
          <div className="space-y-4">
            <div className="text-lg font-bold">{currentQuestion.question}</div>
            <div className="text-sm opacity-70 p-3 rounded-lg bg-gray-800/30">
              {currentQuestion.explanation}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer('yes')}
                className="flex-1 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold"
              >
                ✅ Yes
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold"
              >
                ❌ No
              </button>
            </div>
          </div>
        ) : (
          <div className={clsx(
            "p-5 rounded-xl text-center",
            `bg-${conclusion.color}-900/20`
          )}>
            <div className="text-2xl font-bold mb-3">{conclusion.title}</div>
            <div className="mb-4">{conclusion.description}</div>
            {conclusion.example && (
              <div className="p-3 rounded-lg bg-gray-800/30">
                <div className="font-bold mb-1">Example:</div>
                <div>{conclusion.example}</div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="text-sm">
        <div className="font-bold mb-2">Your Path:</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(answers).map(([step, answer]) => (
            <div
              key={step}
              className={clsx(
                "px-3 py-1 rounded-full text-xs",
                answer === 'yes' ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
              )}
            >
              Q{step}: {answer === 'yes' ? '✅' : '❌'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('guidelines');
  const [selectedExample, setSelectedExample] = useState('unnecessaryState');
  
  // Example states
  const [counter, setCounter] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todoList, setTodoList] = useState(['Learn React', 'Build Project', 'Write Tests']);
  const [filter, setFilter] = useState('all');
  
  // Performance monitoring
  const renderCount = useRef(0);
  renderCount.current++;
  
  // Categories of when to use state
  const useStateCategories = [
    {
      id: 'uiState',
      title: 'UI State',
      description: 'Visual state that affects what users see',
      examples: ['Form inputs', 'Modal visibility', 'Toggles', 'Loading states'],
      icon: '🎨',
      color: 'blue'
    },
    {
      id: 'dataState',
      title: 'Data State',
      description: 'Application data that changes',
      examples: ['User data', 'API responses', 'Lists/collections', 'User preferences'],
      icon: '📊',
      color: 'green'
    },
    {
      id: 'controlState',
      title: 'Control State',
      description: 'State that controls application flow',
      examples: ['Current page', 'Selected item', 'Sort order', 'Filter criteria'],
      icon: '🎮',
      color: 'purple'
    }
  ];
  
  // Categories of when NOT to use state
  const noStateCategories = [
    {
      id: 'derivedValues',
      title: 'Derived Values',
      description: 'Values computed from existing state/props',
      examples: ['Filtered lists', 'Totals/averages', 'Formatted strings', 'Validation results'],
      icon: '🔄',
      color: 'orange'
    },
    {
      id: 'staticData',
      title: 'Static Data',
      description: 'Data that never changes',
      examples: ['Configuration', 'Constants', 'Hardcoded labels', 'Math formulas'],
      icon: '📄',
      color: 'gray'
    },
    {
      id: 'temporaryVars',
      title: 'Temporary Variables',
      description: 'Values only needed during render',
      examples: ['Loop counters', 'Intermediate calculations', 'Event handler params'],
      icon: '⏱️',
      color: 'yellow'
    }
  ];
  
  // Performance comparison
  const expensiveCalculation = (base) => {
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }
    return result + base;
  };
  
  // Bad: Storing expensive computation in state
  const [expensiveResult, setExpensiveResult] = useState(0);
  
  useEffect(() => {
    setExpensiveResult(expensiveCalculation(counter));
  }, [counter]);
  
  // Good: Using useMemo for expensive computation
  const memoizedResult = useMemo(() => {
    return expensiveCalculation(counter);
  }, [counter]);
  
  // Examples of good vs bad state usage
  const examples = [
    {
      id: 'unnecessaryState',
      title: 'Unnecessary State',
      description: 'Storing computed values in state',
      badCode: `// ❌ Bad
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(\`\${firstName} \${lastName}\`);
}, [firstName, lastName]);`,
      goodCode: `// ✅ Good
const fullName = \`\${firstName} \${lastName}\`;`,
      explanation: 'Derived values should be computed during render'
    },
    {
      id: 'expensiveComputation',
      title: 'Expensive Computation',
      description: 'Re-calculating on every render',
      badCode: `// ❌ Bad
const result = expensiveCalculation(props.data);
// Recalculates on every render`,
      goodCode: `// ✅ Good
const result = useMemo(() => {
  return expensiveCalculation(props.data);
}, [props.data]);`,
      explanation: 'Use useMemo for expensive calculations'
    },
    {
      id: 'temporaryValue',
      title: 'Temporary Value',
      description: 'Storing values that reset on re-render',
      badCode: `// ❌ Bad
const [tempValue, setTempValue] = useState('');
// Will reset on every re-render`,
      goodCode: `// ✅ Good
let tempValue = '';
// Use local variable instead`,
      explanation: 'Use local variables for temporary values'
    },
    {
      id: 'domReference',
      title: 'DOM Reference',
      description: 'Storing references that dont trigger updates',
      badCode: `// ❌ Bad
const [inputRef, setInputRef] = useState(null);
// State not needed for DOM refs`,
      goodCode: `// ✅ Good
const inputRef = useRef(null);`,
      explanation: 'Use useRef for DOM references and values that persist without re-renders'
    }
  ];
  
  // Filter todos based on filter state
  const filteredTodos = todoList.filter(todo => {
    if (filter === 'active') return !todo.startsWith('[Done]');
    if (filter === 'completed') return todo.startsWith('[Done]');
    return true;
  });
  
  const completeTodo = (index) => {
    const newTodos = [...todoList];
    if (newTodos[index].startsWith('[Done]')) {
      newTodos[index] = newTodos[index].replace('[Done] ', '');
    } else {
      newTodos[index] = `[Done] ${newTodos[index]}`;
    }
    setTodoList(newTodos);
  };
  
  const addTodo = () => {
    if (userInput.trim()) {
      setTodoList([...todoList, userInput]);
      setUserInput('');
    }
  };
  
  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-emerald-50 to-gray-100 text-gray-900"
    )}>
      {/* Header */}
      <header className={clsx(
        "sticky top-0 z-50 border-b transition-all duration-500",
        isDarkMode 
          ? "bg-gray-800/80 backdrop-blur-md border-gray-700" 
          : "bg-white/80 backdrop-blur-md border-gray-200"
      )}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
                State Management: When & When Not 🎯
              </h1>
              <p className={clsx(
                "mt-1 text-sm transition-all duration-500",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Topic 5: When to Use State and When Not To
              </p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={clsx(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105",
                isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 shadow-lg hover:shadow-xl" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md hover:shadow-lg"
              )}
            >
              {isDarkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 mb-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-r from-gray-800 to-gray-700 shadow-2xl" 
              : "bg-gradient-to-r from-white to-emerald-50 shadow-xl"
          )}>
            <h2 className="text-4xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
              Smart State Management 🧠
            </h2>
            <p className={clsx(
              "text-lg mb-6 leading-relaxed transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              Knowing <span className="font-bold text-emerald-400">when to use state</span> and 
              <span className="font-bold text-red-400"> when to avoid it</span> is crucial for 
              building performant, maintainable React applications. Every piece of state has a cost!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* Performance Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-emerald-500 animate-[slideUp_1.2s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-emerald-50"
              )}>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-emerald-400">Performance Impact</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Each state update triggers re-render. Unnecessary state = unnecessary re-renders.
                </p>
              </div>

              {/* Complexity Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-orange-500 animate-[slideUp_1.4s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-orange-50"
              )}>
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold mb-3 text-orange-400">Complexity Control</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  More state = more complexity. Keep state minimal for easier debugging.
                </p>
              </div>

              {/* Decision Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-purple-500 animate-[slideUp_1.6s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-purple-50"
              )}>
                <div className="text-4xl mb-4">🤔</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Smart Decisions</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Ask: "Does this truly need to be state?" before adding it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 animate-[slideUp_1s_ease-out]">
          <button
            onClick={() => setActiveTab('guidelines')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'guidelines'
                ? isDarkMode 
                  ? "bg-emerald-600 text-white" 
                  : "bg-emerald-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            📋 Guidelines
          </button>
          <button
            onClick={() => setActiveTab('demos')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'demos'
                ? isDarkMode 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            🎮 Live Demos
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'examples'
                ? isDarkMode 
                  ? "bg-purple-600 text-white" 
                  : "bg-purple-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            💡 Code Examples
          </button>
        </div>

        {/* Guidelines Section */}
        {activeTab === 'guidelines' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              When to Use State 📋
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {useStateCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={clsx(
                    "rounded-xl p-5 transition-all duration-500 hover:scale-[1.03]",
                    "transform-gpu border-l-4",
                    `border-${category.color}-500`,
                    isDarkMode 
                      ? `bg-${category.color}-900/20 hover:bg-${category.color}-900/30` 
                      : `bg-${category.color}-100/50 hover:bg-${category.color}-100`
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg">{category.title}</h3>
                      <p className="text-sm opacity-70">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {category.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={clsx(
                          "w-2 h-2 rounded-full",
                          `bg-${category.color}-500`
                        )} />
                        <span className="text-sm">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <h2 className="text-3xl font-bold mb-8 text-center text-red-400">
              When NOT to Use State 🚫
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {noStateCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={clsx(
                    "rounded-xl p-5 transition-all duration-500 hover:scale-[1.03]",
                    "transform-gpu border-l-4",
                    `border-${category.color}-500`,
                    isDarkMode 
                      ? `bg-${category.color}-900/20 hover:bg-${category.color}-900/30` 
                      : `bg-${category.color}-100/50 hover:bg-${category.color}-100`
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg">{category.title}</h3>
                      <p className="text-sm opacity-70">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {category.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={clsx(
                          "w-2 h-2 rounded-full",
                          `bg-${category.color}-500`
                        )} />
                        <span className="text-sm">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decision Tree */}
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-purple-50"
            )}>
              <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">
                State Decision Framework 🌳
              </h3>
              <StateDecisionTree />
            </div>
          </section>
        )}

        {/* Live Demos Section */}
        {activeTab === 'demos' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Interactive Demos 🎮
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Unnecessary State vs Optimized */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">
                  Unnecessary State Example
                </h3>
                <div className="space-y-6">
                  <UnnecessaryStateExample />
                  <OptimizedExample />
                </div>
                
                <div className={clsx(
                  "mt-6 p-4 rounded-lg",
                  isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
                )}>
                  <h4 className="font-bold mb-2">Key Differences:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">❌</span>
                      <span>Unnecessary state triggers extra re-renders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✅</span>
                      <span>Derived values computed during render are more efficient</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">💡</span>
                      <span>Ask: "Can this be computed from existing state/props?"</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Student Grades Demo */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-green-400">
                  Derived Values Demo
                </h3>
                <StudentGrades />
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Timer with useRef */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-400">
                  When to Use useRef Instead
                </h3>
                <TimerExample />
              </div>
              
              {/* Todo List with Filter */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-purple-400">
                  Todo List with Derived Filtering
                </h3>
                <div className={clsx(
                  "rounded-xl p-5",
                  "bg-gradient-to-br from-purple-900/20 to-pink-900/20"
                )}>
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Add a new todo..."
                        className={clsx(
                          "flex-1 px-3 py-2 rounded",
                          "bg-gray-800 border border-gray-700"
                        )}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                      />
                      <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {['all', 'active', 'completed'].map(f => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={clsx(
                            "flex-1 py-2 rounded capitalize",
                            filter === f
                              ? "bg-purple-600 text-white"
                              : "bg-gray-700 hover:bg-gray-600"
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {filteredTodos.map((todo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30"
                      >
                        <span className={todo.startsWith('[Done]') ? 'line-through opacity-60' : ''}>
                          {todo.replace('[Done] ', '')}
                        </span>
                        <button
                          onClick={() => completeTodo(todoList.indexOf(todo))}
                          className={clsx(
                            "px-3 py-1 rounded text-sm",
                            todo.startsWith('[Done]')
                              ? "bg-gray-600 hover:bg-gray-500"
                              : "bg-green-600 hover:bg-green-500"
                          )}
                        >
                          {todo.startsWith('[Done]') ? 'Undo' : 'Done'}
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
                  )}>
                    <h4 className="font-bold mb-2">What's happening here?</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span><span className="font-semibold">todoList</span> is stored state (changes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span><span className="font-semibold">filter</span> is stored state (UI control)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span><span className="font-semibold">filteredTodos</span> is derived (computed)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400">💡</span>
                        <span>No need to store filtered list in state!</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Monitor */}
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-red-50"
            )}>
              <h3 className="text-2xl font-bold mb-6 text-red-400">
                Performance Impact Demo ⚡
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div className={clsx(
                  "p-5 rounded-xl",
                  "border-2 border-red-500/50 bg-red-900/10"
                )}>
                  <h4 className="font-bold mb-4 text-red-400">With State (❌)</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm opacity-70">Counter:</div>
                      <div className="text-3xl font-bold">{counter}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Expensive Result:</div>
                      <div className="text-xl font-bold text-red-300">{expensiveResult.toFixed(2)}</div>
                    </div>
                    <div className="text-xs text-red-400">
                      ❌ Recalculates and updates state on every counter change
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-xl",
                  "border-2 border-green-500/50 bg-green-900/10"
                )}>
                  <h4 className="font-bold mb-4 text-green-400">With useMemo (✅)</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm opacity-70">Same Counter:</div>
                      <div className="text-3xl font-bold">{counter}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Memoized Result:</div>
                      <div className="text-xl font-bold text-green-300">{memoizedResult.toFixed(2)}</div>
                    </div>
                    <div className="text-xs text-green-400">
                      ✅ Memoized - only recalculates when counter changes
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setCounter(c => c + 1)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold"
                >
                  Increment Counter
                </button>
                <button
                  onClick={() => setCounter(0)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg"
                >
                  Reset
                </button>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg",
                isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
              )}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-300">{renderCount.current}</div>
                    <div className="text-sm opacity-70">Total Renders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-300">{counter}</div>
                    <div className="text-sm opacity-70">Counter Value</div>
                  </div>
                </div>
                <div className="text-sm mt-4">
                  <span className="font-semibold">Note:</span> Both calculations give the same result, 
                  but useMemo is more efficient for expensive computations.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Code Examples Section */}
        {activeTab === 'examples' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Code Examples: Good vs Bad 💡
            </h2>
            
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-blue-50"
            )}>
              <div className="flex flex-wrap gap-4 mb-8">
                {examples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => setSelectedExample(example.id)}
                    className={clsx(
                      "px-4 py-2 rounded-lg transition-all duration-300",
                      "transform hover:scale-105",
                      selectedExample === example.id
                        ? isDarkMode 
                          ? "bg-blue-600 text-white" 
                          : "bg-blue-500 text-white"
                        : isDarkMode 
                          ? "bg-gray-700 hover:bg-gray-600" 
                          : "bg-gray-200 hover:bg-gray-300"
                    )}
                  >
                    {example.title}
                  </button>
                ))}
              </div>
              
              {examples.map((example) => (
                selectedExample === example.id && (
                  <div key={example.id} className="animate-[slideUp_0.5s_ease-out]">
                    <h3 className="text-2xl font-bold mb-4">{example.title}</h3>
                    <p className="mb-6 text-lg">{example.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="font-bold mb-3 text-red-400 flex items-center gap-2">
                          <span>❌</span> Bad Practice
                        </div>
                        <pre className={clsx(
                          "p-4 rounded-lg overflow-x-auto text-sm",
                          isDarkMode ? "bg-gray-900" : "bg-gray-100"
                        )}>
                          <code className="text-red-400">{example.badCode}</code>
                        </pre>
                      </div>
                      
                      <div>
                        <div className="font-bold mb-3 text-green-400 flex items-center gap-2">
                          <span>✅</span> Good Practice
                        </div>
                        <pre className={clsx(
                          "p-4 rounded-lg overflow-x-auto text-sm",
                          isDarkMode ? "bg-gray-900" : "bg-gray-100"
                        )}>
                          <code className="text-green-400">{example.goodCode}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg",
                      isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100/50"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className="text-xl">💡</div>
                        <div>
                          <h4 className="font-bold mb-2">Why this matters:</h4>
                          <p>{example.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
              
              <div className={clsx(
                "mt-8 p-6 rounded-xl",
                isDarkMode ? "bg-gray-900/50" : "bg-gray-100/50"
              )}>
                <h4 className="font-bold mb-4">Questions to Ask Before Adding State:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">1.</span>
                      <span>Does this data change over time?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">2.</span>
                      <span>Do UI updates depend on this data?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">3.</span>
                      <span>Is this the minimal representation?</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">4.</span>
                      <span>Can this be derived from existing state?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">5.</span>
                      <span>Will this cause unnecessary re-renders?</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">6.</span>
                      <span>Does useRef or useMemo work better?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Common Pitfalls */}
        <section className="mb-16 animate-[slideUp_1.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-r-4 border-red-500",
            isDarkMode 
              ? "bg-gradient-to-r from-red-900/20 to-red-800/20" 
              : "bg-gradient-to-r from-red-50 to-orange-50"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-red-400">🚫 Common State Management Pitfalls</h3>
            
            <div className="space-y-6">
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Derived State ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Storing values that can be computed from existing state/props.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// Bad: Storing filtered list in state</code><br/>
                  <code className="text-red-300">const [filteredUsers, setFilteredUsers] = useState([]);</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Overly Granular State ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Creating separate state for each piece of related data.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// Bad: Separate state for each field</code><br/>
                  <code className="text-red-300">const [name, setName] = useState('');</code><br/>
                  <code className="text-red-300">const [email, setEmail] = useState('');</code><br/>
                  <code className="text-green-300">// Better: Single object state</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Storing UI State in Redux/Context ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Putting local UI state (like modal visibility) in global state.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// Bad: Global state for local UI</code><br/>
                  <code className="text-green-300">// Good: useState for local component state</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16 animate-[slideUp_2s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-green-900/20 to-teal-800/20 border border-green-800/30" 
              : "bg-gradient-to-br from-green-50 to-teal-50 border border-green-200"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-green-400">✅ State Management Best Practices</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold mb-2">Start with Minimal State</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Add state only when absolutely needed. Derive everything else.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <h4 className="font-bold mb-2">Use the Right Tool</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      useState for UI updates, useRef for persistence, useMemo for expensive computations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h4 className="font-bold mb-2">Optimize Performance</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Memoize expensive calculations. Avoid unnecessary re-renders.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔍</div>
                  <div>
                    <h4 className="font-bold mb-2">Regularly Review State</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Periodically check if all state is still necessary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="mb-16 animate-[slideUp_2.2s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-r-4 border-blue-500/50",
            isDarkMode 
              ? "bg-gradient-to-r from-blue-900/20 to-cyan-900/20" 
              : "bg-gradient-to-br from-blue-50 to-cyan-50"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-blue-400">💭 Hint Section</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-900/10">
                <div className="text-2xl">🤔</div>
                <div>
                  <h4 className="font-bold mb-2">Think about...</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    If <span className="font-semibold">Abhronila</span> is building a weather dashboard, 
                    should she store "feels like" temperature in state or compute it from actual temperature and humidity?
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-900/10">
                <div className="text-2xl">👀</div>
                <div>
                  <h4 className="font-bold mb-2">Observe carefully...</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    In the Student Grades demo, try adding multiple grades. 
                    Notice how the average updates instantly without any new state.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-900/10">
                <div className="text-2xl">🔧</div>
                <div>
                  <h4 className="font-bold mb-2">Try changing...</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    What if <span className="font-semibold">Swadeep</span> wanted to debounce 
                    search input in his app? Should debounced value be state?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_2.4s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-purple-500",
            "hover:scale-[1.005] transform-gpu",
            isDarkMode 
              ? "bg-gradient-to-br from-purple-900/20 to-gray-800" 
              : "bg-gradient-to-br from-purple-50 to-gray-100"
          )}>
            <div className="flex items-start gap-4 mb-6">
              <div className={clsx(
                "p-3 rounded-full text-2xl transition-all duration-500",
                "animate-[bounce_2s_ease-in-out_infinite]",
                isDarkMode ? "bg-purple-700" : "bg-purple-200"
              )}>
                👨‍🏫
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-400">Teacher's Note</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Smart state management separates good React developers from great ones. 
                  Every piece of state should earn its place in your component.
                </p>
              </div>
            </div>
            
            <div className={clsx(
              "p-6 rounded-xl transition-all duration-500",
              isDarkMode ? "bg-gray-800/50" : "bg-white/50"
            )}>
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">💡 Professional Insights:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>At <span className="font-semibold">Barrackpore Tech Solutions</span>, we reduced re-renders by 70% by eliminating unnecessary state</li>
                  <li>The most common performance issue in React apps is excessive state updates</li>
                  <li>Junior developers add state, senior developers remove unnecessary state</li>
                  <li>A good rule: If you can compute it, don't store it</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">🎯 Remember from 27 Years Experience:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>State is a liability - each piece adds complexity and performance cost</li>
                  <li>The best state is no state (when possible)</li>
                  <li>Always start with the question: "Do I really need this as state?"</li>
                  <li>Performance optimizations often come from state minimization, not fancy algorithms</li>
                </ul>
              </div>
              
              <div className={clsx(
                "mt-6 pt-6 border-t transition-colors duration-500",
                isDarkMode ? "border-gray-700" : "border-gray-300"
              )}>
                <p className="text-sm italic flex items-center gap-2">
                  <span className="text-purple-400">From:</span>
                  <span className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Sukanta Hui | 27 years experience | sukantahui@codernaccotax.co.in
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={clsx(
        "mt-12 py-8 border-t transition-colors duration-500",
        isDarkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-gray-50"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="font-bold mb-2">React State Optimization</h4>
              <p className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Topic 5: When to Use State and When Not To
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className={clsx(
                "text-sm mb-2 transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Previous: <span className="font-semibold text-cyan-400">Props vs State Differences</span>
              </div>
              <div className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Next: <span className="font-semibold text-emerald-400">Introduction to the useState Hook</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
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
      `}</style>
    </div>
  );
};

export default Topic5;