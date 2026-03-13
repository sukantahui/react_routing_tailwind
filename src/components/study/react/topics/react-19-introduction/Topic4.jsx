import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";

const Topic4 = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode as default
  const [count, setCount] = useState(0);
  const [isPresent, setIsPresent] = useState(false);
  const [studentName, setStudentName] = useState('Swadeep');
  const { moduleSlug, topicIndex } = useParams();
  const currentIndex = Number(topicIndex);
  const folder = roadmapData.folder;

  // find the current module
  const currentModule = roadmapData.segments
    .flatMap(segment => segment.modules)
    .find(module => module.slug === moduleSlug);

  // safety guard
  if (!currentModule) return null;
  const totalTopics = currentModule.topics.length;
  const hasNext = currentIndex < totalTopics - 1;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Interactive example: Update student name
  const handleStudentChange = () => {
    const students = ['Swadeep', 'Tuhina', 'Abhronila', 'Debangshu'];
    const currentIndex = students.indexOf(studentName);
    const nextIndex = (currentIndex + 1) % students.length;
    setStudentName(students[nextIndex]);
  };

  // Effect to demonstrate state changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Just for demonstration, not essential functionality
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const uiAsFunctionExamples = [
    {
      title: "Simple Counter",
      formula: "UI = f(count)",
      code: `function Counter() {
  const [count, setCount] = useState(0);
  return <button>Count: {count}</button>;
}`,
      explanation: "Button text depends entirely on count value"
    },
    {
      title: "Student Attendance",
      formula: "UI = f(isPresent, studentName)",
      code: `function Attendance() {
  const [isPresent, setIsPresent] = useState(false);
  const [student, setStudent] = useState('Swadeep');
  return <div>{student}: {isPresent ? 'Present' : 'Absent'}</div>;
}`,
      explanation: "Display changes based on attendance state and student name"
    },
    {
      title: "Grade Calculator",
      formula: "UI = f(scores, weights)",
      code: `function GradeCard() {
  const [scores, setScores] = useState([85, 90, 78]);
  const total = scores.reduce((a, b) => a + b, 0);
  return <div>Average: {total / scores.length}</div>;
}`,
      explanation: "Grade display automatically updates when scores change"
    }
  ];

  const principles = [
    {
      principle: "Single Source of Truth",
      icon: "🎯",
      color: "from-blue-600 to-cyan-600",
      description: "Each piece of state has one definitive source",
      example: "Student attendance should be stored once, not duplicated"
    },
    {
      principle: "State Drives UI",
      icon: "⚡",
      color: "from-purple-600 to-pink-600",
      description: "UI is a reflection of state, not the other way around",
      example: "Don't manipulate DOM directly; change state instead"
    },
    {
      principle: "Pure Functions",
      icon: "🧪",
      color: "from-green-600 to-emerald-700",
      description: "Same state always produces same UI",
      example: "Component should render identically with same props/state"
    },
    {
      principle: "State is Minimal",
      icon: "📦",
      color: "from-yellow-600 to-orange-600",
      description: "Store only what's necessary, derive the rest",
      example: "Don't store calculated average; compute it from scores"
    }
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
                <span className="font-bold text-white">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 4: UI as a Function of State</p>
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
        {/* Hero Section with Interactive Example */}
        <section className="mb-16 animate-[fadeIn_0.8s_ease-out]">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 border border-gray-700">
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl text-white mr-6">
                  ƒ(x)
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    UI = f(state)
                  </h2>
                  <p className="text-xl text-gray-300">
                    The Core Philosophy of Modern React
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Think of React components as mathematical functions. You give them state (input), 
                they return UI (output). Just like Tuhina's report card is a function of her test scores - 
                change the scores, the report card updates automatically.
              </p>
              
              {/* Interactive Demo */}
              <div className={clsx(
                "rounded-xl p-6 mb-6",
                "border border-blue-800",
                "bg-gradient-to-br from-gray-800 to-gray-900"
              )}>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Live Demonstration</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-gray-200 mb-2">Current State</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Student Name:</p>
                        <p className="text-xl font-bold text-blue-300">{studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Attendance:</p>
                        <p className={`text-xl font-bold ${isPresent ? 'text-green-400' : 'text-red-400'}`}>
                          {isPresent ? 'Present ✅' : 'Absent ❌'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Counter:</p>
                        <p className="text-xl font-bold text-purple-300">{count}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                    <h4 className="font-semibold text-gray-200 mb-2">UI Output</h4>
                    <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                      <div className="text-center p-4">
                        <h3 className="text-lg font-bold text-gray-200 mb-2">Student Status</h3>
                        <div className={`text-2xl font-bold mb-2 ${isPresent ? 'text-green-400' : 'text-red-400'}`}>
                          {isPresent ? 'PRESENT' : 'ABSENT'}
                        </div>
                        <p className="text-gray-400">Student: <span className="text-blue-300 font-semibold">{studentName}</span></p>
                        <p className="text-gray-400 mt-2">Interactions: <span className="text-purple-300 font-semibold">{count}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <h4 className="font-semibold text-gray-200 mb-2">Change State</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => setCount(count + 1)}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Increment Counter
                      </button>
                      <button
                        onClick={() => setIsPresent(!isPresent)}
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      >
                        Toggle Attendance
                      </button>
                      <button
                        onClick={handleStudentChange}
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        Change Student
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">
                    Notice: When state changes → UI updates automatically. That's UI = f(state) in action!
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Declarative Programming
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Predictable UIs
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Easy Debugging
                </span>
              </div>
            </div>
            
            {/* Animated Function SVG */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="180" height="180" viewBox="0 0 200 200" className="animate-[float_6s_ease-in-out_infinite]">
                <path d="M20,100 Q50,50 100,100 T180,100" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="100" cy="100" r="8" fill="#3B82F6">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="50" y="50" textAnchor="middle" fontSize="14" fill="currentColor">state</text>
                <text x="150" y="150" textAnchor="middle" fontSize="14" fill="currentColor">UI</text>
                <path d="M50,50 L100,100" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="5,5" />
                <path d="M100,100 L150,150" stroke="#10B981" strokeWidth="1" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>
        </section>

        {/* The Core Concept */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Understanding UI = f(state)
              </h2>
              <p className="text-gray-400 mt-2">
                Breaking down React's fundamental equation
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mathematical Analogy */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-blue-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-900/30 flex items-center justify-center text-2xl mr-4">
                  ∫
                </div>
                <h3 className="text-xl font-semibold text-blue-300">Mathematical Analogy</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                  <div className="text-center text-2xl font-bold text-blue-300 mb-2">
                    f(x) = x² + 2x + 1
                  </div>
                  <p className="text-gray-400 text-sm text-center">
                    For x = 3 → f(3) = 16
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                  <div className="text-center text-2xl font-bold text-purple-300 mb-2">
                    UI(state) = render(state)
                  </div>
                  <p className="text-gray-400 text-sm text-center">
                    For state = {'{count: 5}'} → UI shows "Count: 5"
                  </p>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Key Insight:</h4>
                  <p className="text-gray-400">
                    Just like mathematical functions always give the same output for the same input, 
                    React components should render the same UI for the same state/props.
                  </p>
                </div>
              </div>
            </div>

            {/* Real-World Examples */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-green-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mr-4">
                  🏫
                </div>
                <h3 className="text-xl font-semibold text-green-300">School Portal Examples</h3>
              </div>
              
              <div className="space-y-4">
                {uiAsFunctionExamples.map((example, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">{example.title}</h4>
                    <div className="font-mono text-sm text-blue-300 mb-2">{example.formula}</div>
                    <p className="text-gray-400 text-sm">{example.explanation}</p>
                  </div>
                ))}
                
                <div className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-800">
                  <p className="text-gray-400 text-sm">
                    <strong>Remember:</strong> In Barrackpore school portal, every display is a function of some state. 
                    Attendance list = f(attendanceData), Grades = f(testScores), Schedule = f(timetable).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Core Principles of State-Driven UI
              </h2>
              <p className="text-gray-400 mt-2">
                Guidelines that make React predictable and maintainable
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl"
                )}
              >
                <div className={clsx(
                  "w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4",
                  `bg-gradient-to-br ${principle.color} text-white`
                )}>
                  {principle.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  {principle.principle}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {principle.description}
                </p>
                <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                  <p className="text-sm text-gray-500">
                    <strong>Example:</strong> {principle.example}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-purple-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">The Mental Shift</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-300 mb-2">Traditional Thinking:</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <span className="text-xs text-red-300">✗</span>
                    </div>
                    <span>"How do I update this button's text?"</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <span className="text-xs text-red-300">✗</span>
                    </div>
                    <span>Direct DOM manipulation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <span className="text-xs text-red-300">✗</span>
                    </div>
                    <span>Scattered update logic</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-300 mb-2">React Thinking:</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <span className="text-xs text-green-300">✓</span>
                    </div>
                    <span>"What state determines this button's text?"</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <span className="text-xs text-green-300">✓</span>
                    </div>
                    <span>State change triggers updates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <span className="text-xs text-green-300">✓</span>
                    </div>
                    <span>Centralized state management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Code Comparison: Imperative vs Declarative */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Imperative vs Declarative
              </h2>
              <p className="text-gray-400 mt-2">
                The fundamental shift in thinking
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200">
                Scenario: Update Student Attendance Display
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                How would Abhronila update the attendance display in different approaches?
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              {/* Imperative Approach */}
              <div className="bg-gray-900 p-6 border-r border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-red-300">Imperative (Traditional JavaScript)</h4>
                  <span className="px-3 py-1 rounded-full bg-red-900/30 text-red-300 text-sm">
                    HOW to do it
                  </span>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Traditional JavaScript approach
const button = document.getElementById('attendanceBtn');
const status = document.getElementById('statusText');
const student = document.getElementById('studentName');

// When button is clicked
button.addEventListener('click', () => {
  // Find current status
  const currentStatus = status.textContent;
  
  // Determine new status
  const newStatus = currentStatus === 'Present' 
    ? 'Absent' 
    : 'Present';
  
  // Update status text
  status.textContent = newStatus;
  
  // Update button color
  if (newStatus === 'Present') {
    status.style.color = 'green';
    button.textContent = 'Mark Absent';
  } else {
    status.style.color = 'red';
    button.textContent = 'Mark Present';
  }
  
  // Update student display
  student.textContent = 'Swadeep: ' + newStatus;
});

// Change student
const changeStudentBtn = document.getElementById('changeStudent');
changeStudentBtn.addEventListener('click', () => {
  // Update multiple elements
  student.textContent = 'Tuhina: ' + status.textContent;
  // Need to update other elements too...
});`}</pre>
                <div className="mt-4 p-3 rounded-lg bg-red-900/20 border border-red-800">
                  <h4 className="font-semibold text-red-300 mb-2">Problems:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Manual DOM traversal and updates</li>
                    <li>• Scattered update logic</li>
                    <li>• Hard to track all dependencies</li>
                    <li>• Prone to bugs when adding new features</li>
                  </ul>
                </div>
              </div>

              {/* Declarative Approach */}
              <div className="bg-gray-900 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-green-300">Declarative (React)</h4>
                  <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                    WHAT to show
                  </span>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// React approach - UI as function of state
function AttendanceDisplay() {
  // State declarations
  const [isPresent, setIsPresent] = useState(true);
  const [studentName, setStudentName] = useState('Swadeep');
  
  // UI depends entirely on state
  return (
    <div>
      <h2 id="studentName">
        {studentName}: {isPresent ? 'Present' : 'Absent'}
      </h2>
      
      <p id="statusText" style={{
        color: isPresent ? 'green' : 'red'
      }}>
        Status: {isPresent ? 'PRESENT ✅' : 'ABSENT ❌'}
      </p>
      
      <button 
        id="attendanceBtn"
        onClick={() => setIsPresent(!isPresent)}
      >
        {isPresent ? 'Mark Absent' : 'Mark Present'}
      </button>
      
      <button 
        id="changeStudent"
        onClick={() => setStudentName('Tuhina')}
      >
        Change Student
      </button>
    </div>
  );
}`}</pre>
                <div className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-800">
                  <h4 className="font-semibold text-green-300 mb-2">Benefits:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• UI automatically updates when state changes</li>
                    <li>• Single source of truth for data</li>
                    <li>• Easy to add new features</li>
                    <li>• Predictable and testable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className={clsx(
            "mt-6 rounded-xl p-6",
            "border border-blue-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-blue-300">The Key Insight</h3>
            <p className="text-gray-400">
              In React, you don't tell the browser <em>how</em> to update the UI step-by-step. 
              You declare <em>what</em> the UI should look like for any given state, and React 
              figures out the most efficient way to make it happen. It's like giving Debangshu 
              a recipe (state) versus telling him each cooking step manually.
            </p>
          </div>
        </section>

        {/* Practical Application */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🏗️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Applying UI = f(state) in Projects
              </h2>
              <p className="text-gray-400 mt-2">
                Practical steps for students building school portals
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-blue-300">Identify State Variables</h3>
              </div>
              <div className="ml-14">
                <p className="text-gray-400 mb-4">
                  For any UI element, ask: "What data determines how this looks/behaves?"
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-1">Student Card</h4>
                    <ul className="text-sm text-gray-400">
                      <li>• studentName</li>
                      <li>• grade</li>
                      <li>• isPresent</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-800">
                    <h4 className="font-semibold text-purple-300 mb-1">Grade Display</h4>
                    <ul className="text-sm text-gray-400">
                      <li>• testScores[]</li>
                      <li>• weights[]</li>
                      <li>• maxScore</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-green-900/20 border border-green-800">
                    <h4 className="font-semibold text-green-300 mb-1">Attendance List</h4>
                    <ul className="text-sm text-gray-400">
                      <li>• students[]</li>
                      <li>• date</li>
                      <li>• filterStatus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-purple-300">Define State Structure</h3>
              </div>
              <div className="ml-14">
                <p className="text-gray-400 mb-4">
                  Organize state logically. Keep it minimal - derive calculated values.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-300 mb-2">Not Recommended:</h4>
                    <pre className="text-sm text-gray-300 bg-gray-900 p-3 rounded-lg overflow-x-auto">
{`// Storing derived data
const [average, setAverage] = useState(0);
const [total, setTotal] = useState(0);
const [scores, setScores] = useState([85, 90, 78]);

// Need to update all when scores change
useEffect(() => {
  setTotal(scores.reduce((a, b) => a + b, 0));
  setAverage(total / scores.length);
}, [scores]);`}</pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Recommended:</h4>
                    <pre className="text-sm text-gray-300 bg-gray-900 p-3 rounded-lg overflow-x-auto">
{`// Store only source data
const [scores, setScores] = useState([85, 90, 78]);

// Derive when needed
const total = scores.reduce((a, b) => a + b, 0);
const average = total / scores.length;

// UI uses derived values
return <div>Average: {average}</div>;`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-green-300">Build UI from State</h3>
              </div>
              <div className="ml-14">
                <p className="text-gray-400 mb-4">
                  Every piece of UI should be expressible in terms of state variables.
                </p>
                <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                  <div className="font-mono text-sm text-gray-300">
                    <span className="text-blue-300">// Attendance badge color</span><br/>
                    <span className="text-purple-300">const</span> badgeColor = isPresent ? <span className="text-green-400">'bg-green-500'</span> : <span className="text-red-400">'bg-red-500'</span>;<br/><br/>
                    
                    <span className="text-blue-300">// Grade status text</span><br/>
                    <span className="text-purple-300">const</span> status = average {">="} 70 ? <span className="text-green-400">'Passing'</span> : <span className="text-red-400">'Needs Improvement'</span>;<br/><br/>
                    
                    <span className="text-blue-300">// Button text</span><br/>
                    <span className="text-purple-300">const</span> buttonText = isEditing ? <span className="text-yellow-400">'Save Changes'</span> : <span className="text-blue-400">'Edit Profile'</span>;<br/>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-800">
                  <p className="text-gray-400 text-sm">
                    <strong>Tip for Shyamnagar students:</strong> If you find yourself writing complex conditions 
                    or calculations in your JSX, extract them as variables computed from state.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
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
                      The Most Important Concept in React:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      UI = f(state) is not just a technical concept - it's a new way of thinking about 
                      web development. When Tuhina from Barrackpore understands this, she stops fighting 
                      with the DOM and starts thinking about data flow. This mental shift is what separates 
                      React developers from traditional JavaScript developers.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Teaching Strategy:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Start with simple examples like counters before complex forms</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Use live demos - seeing state change update UI is powerful</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Relate to school scenarios - students understand grade calculations</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Student Mistakes:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Storing derived data in state instead of computing it</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Trying to manipulate DOM elements directly with refs</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Creating too much state instead of composing components</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      27 Years Experience Insight:
                    </h5>
                    <p className="text-gray-400">
                      I've taught programming since the days of manual DOM manipulation. The shift to 
                      declarative UI with React is revolutionary. When Debangshu grasps that UI = f(state), 
                      he stops asking "how do I update this element?" and starts asking "what state determines 
                      this display?" That's the moment he becomes a React thinker.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching declarative thinking since 1997</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[slideUp_0.8s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className={clsx(
            "rounded-2xl p-8",
            "bg-gradient-to-br from-gray-800 to-gray-900",
            "border border-gray-700"
          )}>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-100">
              📋 Topic 4 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Understand UI = f(state) as React's core philosophy",
                "Recognize the difference between imperative and declarative programming",
                "Identify state variables needed for UI components",
                "Apply single source of truth principle",
                "Build UI that depends entirely on state",
                "Avoid storing derived data in state",
                "Think in terms of 'what to show' not 'how to update'",
                "Use the mental model when debugging React applications"
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-start p-4 rounded-lg transition-all duration-300",
                    "border border-gray-700",
                    "hover:bg-gray-800",
                    "hover:shadow-md hover:border-blue-700"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-blue-300">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 pt-1">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              {hasNext ? (
                <Link
                  to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
                  className="inline-flex items-center gap-2
                 px-6 py-3 rounded-lg
                 bg-gradient-to-r from-blue-500 to-purple-600
                 text-white font-medium"
                >
                  Ready for Topic {currentIndex + 2}
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2
                   px-6 py-3 rounded-lg
                   bg-slate-900 text-slate-500
                   border border-slate-800
                   cursor-not-allowed"
                >
                  No More Topics
                  <ArrowRight size={18} />
                </button>
              )}

              <p className="mt-4 text-sm text-gray-400">
                Next: Setting up the React environment
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 4: UI as a Function of State</p>
            <p className="mt-2 text-sm">The fundamental philosophy behind modern React</p>
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

export default Topic4;