import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight, Code, Box, Puzzle, Layers, Cpu, GitBranch, Zap, CheckCircle  } from "lucide-react";
import { useParams } from "react-router-dom";

const Topic13 = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode as default
  const [activeSection, setActiveSection] = useState('basics');
  const [componentDemo, setComponentDemo] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { moduleSlug, topicIndex } = useParams();
  const currentIndex = Number(topicIndex);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const componentBasics = {
    title: "React Components: Building Blocks of UI",
    analogy: "Like Lego bricks - small, reusable pieces that combine to create complex structures",
    description: "Components are independent, reusable pieces of UI. They can be as small as a button or as large as an entire page.",
    characteristics: [
      "Receive data via props",
      "Return JSX describing UI",
      "Can maintain internal state",
      "Reusable across application"
    ]
  };

  const functionComponentExamples = [
    {
      title: "Simple Button Component",
      code: `function PrimaryButton({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {children}
    </button>
  )
}

// Usage in another component:
function App() {
  return (
    <PrimaryButton onClick={() => alert('Clicked!')}>
      Save Changes
    </PrimaryButton>
  )
}`,
      features: ["Receives props (children, onClick)", "Returns JSX", "Reusable styling and behavior"],
      purpose: "Encapsulate button styling and behavior"
    },
    {
      title: "Student Card Component",
      code: `function StudentCard({ name, grade, attendance }) {
  return (
    <div className="student-card p-4 border rounded-lg shadow">
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="mt-2 space-y-1">
        <p>Grade: <span className="font-semibold">{grade}</span></p>
        <p>Attendance: 
          <span className={\`ml-2 px-2 py-1 rounded \${attendance > 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
            {attendance}%
          </span>
        </p>
      </div>
    </div>
  )
}

// Usage:
function ClassList() {
  return (
    <div className="space-y-4">
      <StudentCard name="Swadeep" grade="A" attendance={92} />
      <StudentCard name="Tuhina" grade="B+" attendance={88} />
      <StudentCard name="Abhronila" grade="A-" attendance={95} />
    </div>
  )
}`,
      features: ["Multiple props", "Conditional styling", "Reusable data display"],
      purpose: "Display student information consistently"
    },
    {
      title: "Counter Component with State",
      code: `import { useState } from 'react'

function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue)
  
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(initialValue)
  
  return (
    <div className="counter p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Counter: {count}</h3>
      <div className="space-x-2">
        <button onClick={decrement} className="px-3 py-1 bg-gray-200 rounded">
          Decrement
        </button>
        <button onClick={reset} className="px-3 py-1 bg-yellow-200 rounded">
          Reset
        </button>
        <button onClick={increment} className="px-3 py-1 bg-green-200 rounded">
          Increment
        </button>
      </div>
    </div>
  )
}`,
      features: ["Uses useState hook", "Internal state management", "Default prop value"],
      purpose: "Self-contained interactive component"
    },
    {
      title: "Conditional Rendering Component",
      code: `function AttendanceStatus({ isPresent, studentName }) {
  if (isPresent === null || isPresent === undefined) {
    return (
      <div className="attendance status-unknown p-2 border rounded">
        <span className="text-gray-500">Attendance not marked for {studentName}</span>
      </div>
    )
  }
  
  return isPresent ? (
    <div className="attendance status-present p-2 border rounded bg-green-50">
      <span className="text-green-700">✓ {studentName} is present</span>
    </div>
  ) : (
    <div className="attendance status-absent p-2 border rounded bg-red-50">
      <span className="text-red-700">✗ {studentName} is absent</span>
    </div>
  )
}`,
      features: ["Conditional rendering", "Early returns", "Multiple JSX returns"],
      purpose: "Display different UI based on conditions"
    }
  ];

  const componentAnatomy = [
    {
      part: "Function Declaration",
      description: "Defines the component as a JavaScript function",
      code: `function ComponentName() {`,
      purpose: "Creates a reusable component"
    },
    {
      part: "Parameters (Props)",
      description: "Receives data from parent component",
      code: `function ComponentName({ prop1, prop2 }) {`,
      purpose: "Make component configurable"
    },
    {
      part: "Component Body",
      description: "Contains logic, state, and calculations",
      code: `  const [state, setState] = useState()
  const result = calculateSomething()`,
      purpose: "Implement component behavior"
    },
    {
      part: "Return Statement",
      description: "Returns JSX describing the UI",
      code: `  return (
    <div>JSX Content</div>
  )`,
      purpose: "Render component output"
    },
    {
      part: "Export Statement",
      description: "Makes component available for import",
      code: `export default ComponentName`,
      purpose: "Enable component reuse"
    }
  ];

  const componentTypes = [
    {
      type: "Presentational Components",
      description: "Focus on how things look",
      characteristics: ["Receive data via props", "Rarely have own state", "Focus on UI/UX"],
      example: "Button, Card, Modal, Header",
      analogy: "Painters - they make things look good"
    },
    {
      type: "Container Components",
      description: "Focus on how things work",
      characteristics: ["Manage state and data", "Pass data to presentational", "Handle logic"],
      example: "UserProfile, ProductList, Dashboard",
      analogy: "Managers - they handle the business logic"
    },
    {
      type: "Layout Components",
      description: "Define page structure",
      characteristics: ["Define overall layout", "Often use children prop", "Consistent structure"],
      example: "PageLayout, SidebarLayout, GridContainer",
      analogy: "Architects - they define the structure"
    },
    {
      type: "Utility Components",
      description: "Provide specific functionality",
      characteristics: ["Single responsibility", "Often abstract complex logic", "Highly reusable"],
      example: "ErrorBoundary, LoadingSpinner, Tooltip",
      analogy: "Tools - each has a specific job"
    }
  ];

  const compositionExamples = [
    {
      pattern: "Parent-Child Composition",
      code: `function ParentComponent() {
  return (
    <div className="parent">
      <ChildComponent message="Hello from parent" />
      <AnotherChild count={5} />
    </div>
  )
}`,
      explanation: "Parent renders children, passes data via props"
    },
    {
      pattern: "Slot Pattern (Children Prop)",
      code: `function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

// Usage:
<Card title="Student Info">
  <p>Name: Swadeep</p>
  <p>Grade: A</p>
</Card>`,
      explanation: "Component accepts dynamic content via children"
    },
    {
      pattern: "Component Specialization",
      code: `function Button({ variant = 'primary', ...props }) {
  const baseClasses = "px-4 py-2 rounded font-medium"
  const variantClasses = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    danger: "bg-red-600 text-white"
  }
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
      {...props}
    />
  )
}

// Specialized versions:
function SubmitButton(props) {
  return <Button variant="primary" type="submit" {...props} />
}

function CancelButton(props) {
  return <Button variant="secondary" {...props} />
}`,
      explanation: "Create specialized versions of base components"
    },
    {
      pattern: "Compound Components",
      code: `function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null)
  
  return React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      isOpen: index === openIndex,
      onToggle: () => setOpenIndex(index === openIndex ? null : index)
    })
  )
}

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="accordion-item">
      <button onClick={onToggle} className="accordion-header">
        {title}
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  )
}

// Usage:
<Accordion>
  <AccordionItem title="Question 1">
    <p>Answer 1</p>
  </AccordionItem>
  <AccordionItem title="Question 2">
    <p>Answer 2</p>
  </AccordionItem>
</Accordion>`,
      explanation: "Components work together as a group"
    }
  ];

  const studentComponentProjects = [
    {
      student: "Swadeep",
      project: "School Attendance Dashboard",
      components: [
        { name: "AttendanceCard", type: "Presentational", purpose: "Show student attendance" },
        { name: "ClassList", type: "Container", purpose: "Manage class data" },
        { name: "StatisticsPanel", type: "Presentational", purpose: "Display attendance stats" },
        { name: "DatePicker", type: "Utility", purpose: "Select date range" }
      ],
      structure: `AttendanceDashboard/
  ├── AttendanceCard.jsx      # Presentational
  ├── ClassList.jsx          # Container
  ├── StatisticsPanel.jsx    # Presentational
  └── DatePicker.jsx         # Utility`
    },
    {
      student: "Tuhina",
      project: "Library Management System",
      components: [
        { name: "BookCard", type: "Presentational", purpose: "Display book information" },
        { name: "SearchBar", type: "Utility", purpose: "Search books" },
        { name: "BorrowModal", type: "Presentational", purpose: "Borrow book form" },
        { name: "LibraryLayout", type: "Layout", purpose: "Page structure" }
      ],
      structure: `LibrarySystem/
  ├── BookCard.jsx           # Presentational
  ├── SearchBar.jsx          # Utility
  ├── BorrowModal.jsx        # Presentational
  └── LibraryLayout.jsx      # Layout`
    },
    {
      student: "Abhronila",
      project: "Quiz Application",
      components: [
        { name: "QuestionCard", type: "Presentational", purpose: "Display quiz question" },
        { name: "Timer", type: "Utility", purpose: "Countdown timer" },
        { name: "ScoreBoard", type: "Presentational", purpose: "Show scores" },
        { name: "QuizManager", type: "Container", purpose: "Manage quiz state" }
      ],
      structure: `QuizApp/
  ├── QuestionCard.jsx       # Presentational
  ├── Timer.jsx             # Utility
  ├── ScoreBoard.jsx        # Presentational
  └── QuizManager.jsx       # Container`
    }
  ];

  const componentBestPractices = [
    {
      practice: "Single Responsibility",
      description: "Each component should do one thing well",
      example: "Button component handles clicks, not data fetching",
      benefit: "Easier to test, maintain, and reuse"
    },
    {
      practice: "Descriptive Naming",
      description: "Name components by what they are, not what they do",
      example: "StudentCard not DisplayStudentInformationBox",
      benefit: "Self-documenting code"
    },
    {
      practice: "Props Destructuring",
      description: "Destructure props immediately for cleaner code",
      example: `function Component({ prop1, prop2 }) {`,
      benefit: "Clear what props are used"
    },
    {
      practice: "Default Props",
      description: "Provide sensible defaults for optional props",
      example: `function Component({ size = 'medium' }) {`,
      benefit: "More robust components"
    },
    {
      practice: "Keep Components Small",
      description: "If a component grows too large, split it",
      example: "Extract helper components or hooks",
      benefit: "Easier to understand and maintain"
    },
    {
      practice: "Use PropTypes or TypeScript",
      description: "Define prop types for better documentation",
      example: `Component.propTypes = { name: PropTypes.string }`,
      benefit: "Catches bugs early, better IDE support"
    }
  ];

  const componentLifecycle = [
    {
      phase: "Creation",
      description: "Component is created and rendered for first time",
      hooks: ["useState", "useEffect with empty deps"],
      analogy: "Birth - coming into existence"
    },
    {
      phase: "Update",
      description: "Component re-renders due to props or state changes",
      hooks: ["useEffect with dependency array", "useMemo", "useCallback"],
      analogy: "Growth - responding to changes"
    },
    {
      phase: "Unmount",
      description: "Component is removed from DOM",
      hooks: ["useEffect cleanup function"],
      analogy: "Departure - cleaning up before leaving"
    }
  ];

  const sections = [
    { id: 'basics', label: 'Component Basics', icon: '📚' },
    { id: 'anatomy', label: 'Component Anatomy', icon: '🔬' },
    { id: 'types', label: 'Component Types', icon: '📦' },
    { id: 'composition', label: 'Composition', icon: '🧩' },
    { id: 'lifecycle', label: 'Lifecycle', icon: '🔄' },
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
                <Box size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 13: Function-Based Components</p>
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
                  🧱
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Building with Components
                  </h2>
                  <p className="text-xl text-gray-300">
                    The fundamental unit of React applications - reusable, composable building blocks
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                When Tuhina builds her library system, she doesn't create one giant page. 
                She builds small, reusable components: <code className="text-blue-300">BookCard</code>, 
                <code className="text-purple-300"> SearchBar</code>, <code className="text-green-300">BorrowButton</code>. 
                Each component has a single responsibility, and together they create a complete application.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Component Anatomy
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Composition Patterns
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Best Practices
                </span>
                <span className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Student Projects
                </span>
              </div>
            </div>
            
            {/* Animated Component Assembly */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="200" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                <rect x="40" y="40" width="40" height="40" rx="5" fill="none" stroke="#3B82F6" strokeWidth="2">
                  <animate attributeName="x" from="40" to="50" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="60" y="65" textAnchor="middle" fontSize="10" fill="#3B82F6">Card</text>
                
                <rect x="100" y="40" width="40" height="40" rx="5" fill="none" stroke="#10B981" strokeWidth="2">
                  <animate attributeName="x" from="100" to="90" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="120" y="65" textAnchor="middle" fontSize="10" fill="#10B981">Button</text>
                
                <rect x="40" y="100" width="40" height="40" rx="5" fill="none" stroke="#8B5CF6" strokeWidth="2">
                  <animate attributeName="y" from="100" to="90" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="60" y="125" textAnchor="middle" fontSize="10" fill="#8B5CF6">Input</text>
                
                <rect x="100" y="100" width="40" height="40" rx="5" fill="none" stroke="#F59E0B" strokeWidth="2">
                  <animate attributeName="y" from="100" to="110" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="120" y="125" textAnchor="middle" fontSize="10" fill="#F59E0B">List</text>
                
                <rect x="65" y="65" width="70" height="50" rx="8" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,5">
                  <animate attributeName="opacity" from="0.3" to="0.7" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="100" y="80" textAnchor="middle" fontSize="8" fill="#EF4444">App</text>
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

        {/* Component Basics Section */}
        {activeSection === 'basics' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  What Are React Components?
                </h2>
                <p className="text-gray-400 mt-2">
                  The fundamental building blocks of every React application
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
                  <span className="text-3xl">🧩</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{componentBasics.title}</h3>
                <p className="text-gray-400 italic mb-4">"{componentBasics.analogy}"</p>
                <p className="text-gray-300 max-w-3xl mx-auto">{componentBasics.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-4 flex items-center">
                    <Zap size={20} className="text-yellow-400 mr-2" />
                    Key Characteristics:
                  </h4>
                  <ul className="space-y-4">
                    {componentBasics.characteristics.map((characteristic, index) => (
                      <li key={index} className="flex items-start">
                        <div className={clsx(
                          "w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0",
                          index === 0 ? "bg-blue-600" :
                          index === 1 ? "bg-green-600" :
                          index === 2 ? "bg-purple-600" : "bg-yellow-600"
                        )}>
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-200">{characteristic.split(':')[0]}</h5>
                          <p className="text-gray-400 mt-1">{characteristic.split(':')[1] || characteristic}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-200 mb-4 flex items-center">
                    <Layers size={20} className="text-green-400 mr-2" />
                    Why Components Matter:
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                          1
                        </div>
                        <h5 className="font-semibold text-blue-300">Reusability</h5>
                      </div>
                      <p className="text-gray-400 text-sm">Write once, use everywhere. Like Swadeep's StudentCard across multiple pages.</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                          2
                        </div>
                        <h5 className="font-semibold text-green-300">Maintainability</h5>
                      </div>
                      <p className="text-gray-400 text-sm">Small, focused components are easier to debug and update.</p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                          3
                        </div>
                        <h5 className="font-semibold text-purple-300">Team Collaboration</h5>
                      </div>
                      <p className="text-gray-400 text-sm">Different team members can work on different components simultaneously.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Component Examples */}
            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-100">
                    Function Component Examples
                  </h3>
                  <p className="text-gray-500">Modern React (React 19) uses function components exclusively</p>
                </div>
                
                <div className="flex space-x-2">
                  {functionComponentExamples.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setComponentDemo(index)}
                      className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                        componentDemo === index
                          ? "bg-green-600 text-white scale-110"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-200">{functionComponentExamples[componentDemo].title}</h4>
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                      Example {componentDemo + 1}
                    </span>
                  </div>
                  
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto max-h-[400px]">
                    {functionComponentExamples[componentDemo].code}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {functionComponentExamples[componentDemo].features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-400">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">Component Purpose:</h4>
                    <p className="text-gray-400">{functionComponentExamples[componentDemo].purpose}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">Student Thinking:</h4>
                    <p className="text-gray-400 text-sm">
                      {componentDemo === 0 && "When Swadeep needs buttons throughout his attendance system, he creates one PrimaryButton component instead of repeating styles."}
                      {componentDemo === 1 && "Tuhina's StudentCard ensures every student is displayed consistently across her library system."}
                      {componentDemo === 2 && "Abhronila's Counter component manages its own state - perfect for quiz timers and score tracking."}
                      {componentDemo === 3 && "Debangshu uses conditional rendering to show different attendance statuses clearly."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Component vs Regular Function */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Component vs Regular Function</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Regular JavaScript Function:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`function calculateTotal(prices) {
  return prices.reduce((sum, price) => sum + price, 0)
}

// Usage:
const total = calculateTotal([10, 20, 30])
// Returns: 60`}</pre>
                  <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                    <p className="text-gray-400 text-sm">Takes input, returns data, used for calculations</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">React Component Function:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`function StudentList({ students }) {
  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  )
}

// Usage:
<StudentList students={studentData} />
// Returns: JSX describing UI`}</pre>
                  <div className="mt-4 p-3 rounded-lg bg-purple-900/20 border border-purple-800">
                    <p className="text-gray-400 text-sm">Takes props, returns JSX, describes user interface</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">The Key Difference:</h4>
                <p className="text-gray-400 text-sm">
                  Regular functions return data. React components return descriptions of UI (JSX). 
                  This is why components are special - they bridge JavaScript logic with visual interface.
                  When a student from Barrackpore writes a component, they're not just calculating - 
                  they're describing what should appear on the screen.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Component Anatomy Section */}
        {activeSection === 'anatomy' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
                <Cpu size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Component Anatomy
                </h2>
                <p className="text-gray-400 mt-2">
                  Dissecting a React component - every part explained
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {componentAnatomy.map((part, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    "border border-gray-700",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg",
                    "hover:border-blue-700"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4",
                      index === 0 ? "bg-blue-600" :
                      index === 1 ? "bg-green-600" :
                      index === 2 ? "bg-purple-600" :
                      index === 3 ? "bg-yellow-600" : "bg-red-600"
                    )}>
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100">{part.part}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Description:</h4>
                      <p className="text-gray-400 text-sm">{part.description}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-black/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Code:</h4>
                      <code className="text-sm text-blue-300">{part.code}</code>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Purpose:</h4>
                      <p className="text-gray-400 text-sm">{part.purpose}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Component Example */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Complete Component - All Parts Together</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Annotated Component:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`// 1️⃣ Import dependencies
import { useState } from 'react'

// 2️⃣ Function declaration with descriptive name
function StudentGradeCard({ student, initialGrade = 'A' }) {
  // 3️⃣ Component state (optional)
  const [grade, setGrade] = useState(initialGrade)
  
  // 4️⃣ Event handlers (component logic)
  const handleGradeChange = (newGrade) => {
    setGrade(newGrade)
    console.log(\`\${student}'s grade changed to \${newGrade}\`)
  }
  
  // 5️⃣ Return JSX (the UI)
  return (
    <div className="grade-card p-4 border rounded">
      <h3 className="text-lg font-bold">{student}</h3>
      <div className="mt-2">
        <p>Current Grade: <span className="font-semibold">{grade}</span></p>
        <div className="mt-3 space-x-2">
          {['A', 'B', 'C', 'D'].map(g => (
            <button
              key={g}
              onClick={() => handleGradeChange(g)}
              className={\`px-3 py-1 rounded \${grade === g ? 'bg-blue-600 text-white' : 'bg-gray-200'}\`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 6️⃣ Export for use in other files
export default StudentGradeCard`}</pre>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Component Breakdown:</h4>
                  
                  <div className="space-y-4">
                    {[
                      {
                        part: "Imports",
                        description: "Bring in React features and other components",
                        icon: "📦"
                      },
                      {
                        part: "Function Signature",
                        description: "Defines component name and expected props",
                        icon: "🏷️"
                      },
                      {
                        part: "State & Variables",
                        description: "Internal data management and calculations",
                        icon: "💾"
                      },
                      {
                        part: "Event Handlers",
                        description: "Functions that respond to user interactions",
                        icon: "🖱️"
                      },
                      {
                        part: "JSX Return",
                        description: "Describes what should be rendered",
                        icon: "🎨"
                      },
                      {
                        part: "Export",
                        description: "Makes component available for import",
                        icon: "🚀"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={clsx(
                          "flex items-center p-3 rounded-lg",
                          "border border-gray-700",
                          "bg-gray-900/50",
                          "hover:bg-gray-800/50"
                        )}
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center text-xl mr-4">
                          {item.icon}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-200">{item.part}</h5>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <h4 className="font-semibold text-green-300 mb-2">Student Exercise:</h4>
                    <p className="text-gray-400 text-sm">
                      Create your own component following this structure. Start with a simple 
                      <code className="text-green-300"> WelcomeMessage</code> component that takes a 
                      <code className="text-green-300"> name</code> prop and displays "Welcome, [name]!". 
                      Then add a button that changes the message when clicked.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Component File Structure */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Component File Structure</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Recommended Structure:</h4>
                  <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                    <pre className="text-sm text-gray-300">
{`src/components/StudentCard/
├── StudentCard.jsx          # Main component
├── StudentCard.module.css   # Component styles (optional)
├── StudentCard.test.jsx     # Tests
└── index.js                # Export file

// index.js contents:
export { default } from './StudentCard'`}</pre>
                  </div>
                  
                  <div className="mt-4 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <p className="text-gray-400 text-sm">
                      This structure keeps related files together and makes imports cleaner:
                      <code className="text-blue-300"> import StudentCard from './components/StudentCard'</code>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">File Naming Conventions:</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <CheckCircle size={16} className="text-green-400 mr-3" />
                      <div>
                        <h5 className="font-semibold text-gray-200">PascalCase for components</h5>
                        <p className="text-gray-400 text-sm"><code className="text-green-300">StudentCard.jsx</code> not <code className="text-red-300">student-card.jsx</code></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <CheckCircle size={16} className="text-green-400 mr-3" />
                      <div>
                        <h5 className="font-semibold text-gray-200">Descriptive names</h5>
                        <p className="text-gray-400 text-sm"><code className="text-green-300">AttendanceStatisticsCard.jsx</code> not <code className="text-red-300">Stats.jsx</code></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <CheckCircle size={16} className="text-green-400 mr-3" />
                      <div>
                        <h5 className="font-semibold text-gray-200">One component per file</h5>
                        <p className="text-gray-400 text-sm">(Except small related helper components)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <CheckCircle size={16} className="text-green-400 mr-3" />
                      <div>
                        <h5 className="font-semibold text-gray-200">Use .jsx extension</h5>
                        <p className="text-gray-400 text-sm">Makes it clear the file contains JSX</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Component Types Section */}
        {activeSection === 'types' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
                <Layers size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Types of Components
                </h2>
                <p className="text-gray-400 mt-2">
                  Different components for different purposes - choosing the right tool
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {componentTypes.map((type, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    "border border-purple-800",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    "hover:shadow-lg hover:border-purple-700"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4",
                      index === 0 ? "bg-blue-600" :
                      index === 1 ? "bg-green-600" :
                      index === 2 ? "bg-yellow-600" : "bg-red-600"
                    )}>
                      {index === 0 ? "🎨" : index === 1 ? "⚙️" : index === 2 ? "🏗️" : "🛠️"}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">{type.type}</h3>
                      <p className="text-gray-500">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-2">Characteristics:</h4>
                      <ul className="space-y-2">
                        {type.characteristics.map((char, idx) => (
                          <li key={idx} className="flex items-center text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Examples:</h4>
                      <p className="text-gray-400">{type.example}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-1">Analogy:</h4>
                      <p className="text-gray-400 text-sm">"{type.analogy}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Component Type Decision Guide */}
            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">Choosing Component Type</h3>
              
              <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-700">
                <div className="space-y-8">
                  {/* Level 1 */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      <span className="font-bold text-white">What does this component need to do?</span>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">choose based on responsibility</div>
                  </div>
                  
                  {/* Level 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 mb-2">
                        <span className="font-bold text-white">Display Data</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Show information to user</p>
                      <div className="space-y-2">
                        <div className="text-gray-400 text-sm">✅ Presentational Component</div>
                        <div className="text-gray-400 text-sm">✅ Layout Component</div>
                      </div>
                      <div className="mt-3 p-2 rounded bg-gray-800">
                        <code className="text-xs text-blue-300">StudentCard, Header, Footer</code>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 mb-2">
                        <span className="font-bold text-white">Manage Logic</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Handle data, state, events</p>
                      <div className="space-y-2">
                        <div className="text-gray-400 text-sm">✅ Container Component</div>
                        <div className="text-gray-400 text-sm">✅ Utility Component</div>
                      </div>
                      <div className="mt-3 p-2 rounded bg-gray-800">
                        <code className="text-xs text-green-300">UserProfile, SearchManager</code>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">will it be reused?</div>
                  </div>
                  
                  {/* Level 3 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-yellow-600">
                        <span className="font-bold text-white">Specific Use</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-gray-400 text-sm">Used in one place</div>
                        <div className="text-gray-400 text-sm">Tightly coupled to context</div>
                        <div className="text-gray-400 text-sm">Can be larger, more complex</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600">
                        <span className="font-bold text-white">Reusable</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-gray-400 text-sm">Used in multiple places</div>
                        <div className="text-gray-400 text-sm">Loosely coupled, generic</div>
                        <div className="text-gray-400 text-sm">Should be small, focused</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Student Decision Framework:</h4>
                <p className="text-gray-400 text-sm">
                  When Abhronila creates a component for her quiz app, she asks: 
                  "Is this for showing things (Presentational) or doing things (Container)?" 
                  Then: "Will I use this elsewhere (reusable) or just here (specific)?" 
                  This two-question framework guides her to the right component type.
                </p>
              </div>
            </div>

            {/* Student Project Examples */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Student Project Component Architecture</h3>
              
              <div className="space-y-6">
                {studentComponentProjects.map((project, index) => (
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
                        <span className="font-bold">{project.student.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-100">{project.student}'s Project</h4>
                        <p className="text-gray-500">{project.project}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">Components:</h5>
                        <div className="space-y-3">
                          {project.components.map((comp, idx) => (
                            <div 
                              key={idx}
                              className={clsx(
                                "flex items-center p-3 rounded",
                                comp.type === 'Presentational' ? "bg-blue-900/20 border border-blue-800" :
                                comp.type === 'Container' ? "bg-green-900/20 border border-green-800" :
                                comp.type === 'Layout' ? "bg-yellow-900/20 border border-yellow-800" :
                                "bg-red-900/20 border border-red-800"
                              )}
                            >
                              <div className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                comp.type === 'Presentational' ? "bg-blue-600" :
                                comp.type === 'Container' ? "bg-green-600" :
                                comp.type === 'Layout' ? "bg-yellow-600" : "bg-red-600"
                              )}>
                                <span className="text-white text-xs">{comp.type.charAt(0)}</span>
                              </div>
                              <div>
                                <h6 className="font-semibold text-gray-200">{comp.name}</h6>
                                <p className="text-gray-400 text-sm">{comp.purpose}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-2">File Structure:</h5>
                        <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                          <pre className="text-sm text-gray-300">
                            {project.structure}
                          </pre>
                        </div>
                        
                        <div className="mt-4 p-3 rounded-lg bg-purple-900/20 border border-purple-800">
                          <h6 className="font-semibold text-purple-300 mb-1">Architecture Insight:</h6>
                          <p className="text-gray-400 text-sm">
                            {index === 0 && "Swadeep separates presentational cards from container logic for better reusability."}
                            {index === 1 && "Tuhina uses layout components for consistent page structure across her library system."}
                            {index === 2 && "Abhronila keeps utility components like Timer separate for easy testing and reuse."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Composition Section */}
        {activeSection === 'composition' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
                <Puzzle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Component Composition
                </h2>
                <p className="text-gray-400 mt-2">
                  Combining small components to build complex UIs
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {compositionExamples.map((pattern, index) => (
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
                      <h4 className="font-semibold text-gray-200 mb-1">Explanation:</h4>
                      <p className="text-gray-400 text-sm">{pattern.explanation}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-1">Student Use Case:</h4>
                      <p className="text-gray-400 text-sm">
                        {index === 0 && "Swadeep uses this for his AttendanceDashboard composing smaller components."}
                        {index === 1 && "Tuhina's BookCard uses children prop for flexible content display."}
                        {index === 2 && "Abhronila creates specialized quiz buttons from a base Button component."}
                        {index === 3 && "Debangshu builds complex forms using compound components for better organization."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Composition vs Inheritance */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-red-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-red-300">Composition Over Inheritance</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">❌ Inheritance Approach (Not Recommended):</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`class BaseButton {
  constructor(label) {
    this.label = label
  }
  
  render() {
    return \`<button>\${this.label}</button>\`
  }
}

class PrimaryButton extends BaseButton {
  render() {
    return \`<button class="primary">\${this.label}</button>\`
  }
}

// Problems:
// 1. Tight coupling
// 2. Hard to change
// 3. Inheritance hierarchy gets complex`}</pre>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">✅ Composition Approach (React Way):</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded">
{`function Button({ variant = 'default', children, ...props }) {
  const baseClasses = "px-4 py-2 rounded"
  const variantClasses = {
    default: "bg-gray-200",
    primary: "bg-blue-600 text-white",
    danger: "bg-red-600 text-white"
  }
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
      {...props}
    >
      {children}
    </button>
  )
}

// Usage:
<Button variant="primary">Save</Button>
<Button variant="danger">Delete</Button>

// Benefits:
// 1. Flexible
// 2. Easy to change
// 3. No complex hierarchy`}</pre>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                <h4 className="font-semibold text-red-300 mb-2">React Philosophy:</h4>
                <p className="text-gray-400 text-sm">
                  React favors composition over inheritance. Instead of creating complex class hierarchies, 
                  build small, focused components and combine them. This approach is more flexible, 
                  easier to understand, and aligns with how UI naturally breaks down into pieces.
                  When students in Barrackpore build their applications, they should think "What components 
                  can I combine?" not "What can I inherit from?"
                </p>
              </div>
            </div>

            {/* Visual Composition Demo */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-green-300">Visual Composition Example</h3>
              
              <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-700">
                <div className="flex flex-col items-center space-y-8">
                  {/* Level 1 - Atomic Components */}
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-200 mb-4">Atomic Components</h4>
                    <div className="flex space-x-4">
                      {['Button', 'Input', 'Label', 'Icon'].map((name, idx) => (
                        <div 
                          key={idx}
                          className="w-16 h-16 rounded-lg bg-blue-900/30 border border-blue-800 flex items-center justify-center"
                        >
                          <span className="text-blue-300 text-sm">{name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Small, reusable building blocks</p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">compose together</div>
                  </div>
                  
                  {/* Level 2 - Molecular Components */}
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-200 mb-4">Molecular Components</h4>
                    <div className="flex space-x-6">
                      {['SearchBar', 'FormField', 'Card'].map((name, idx) => (
                        <div 
                          key={idx}
                          className={clsx(
                            "w-24 h-20 rounded-lg border flex items-center justify-center",
                            idx === 0 ? "bg-green-900/30 border-green-800" :
                            idx === 1 ? "bg-purple-900/30 border-purple-800" :
                            "bg-yellow-900/30 border-yellow-800"
                          )}
                        >
                          <span className={clsx(
                            "text-sm",
                            idx === 0 ? "text-green-300" :
                            idx === 1 ? "text-purple-300" : "text-yellow-300"
                          )}>
                            {name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Combinations of atomic components</p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">compose together</div>
                  </div>
                  
                  {/* Level 3 - Organism Components */}
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-200 mb-4">Organism Components</h4>
                    <div className="flex space-x-8">
                      {['LoginForm', 'ProductCard', 'Navbar'].map((name, idx) => (
                        <div 
                          key={idx}
                          className={clsx(
                            "w-32 h-24 rounded-lg border flex items-center justify-center",
                            idx === 0 ? "bg-red-900/30 border-red-800" :
                            idx === 1 ? "bg-indigo-900/30 border-indigo-800" :
                            "bg-pink-900/30 border-pink-800"
                          )}
                        >
                          <span className={clsx(
                            idx === 0 ? "text-red-300" :
                            idx === 1 ? "text-indigo-300" : "text-pink-300"
                          )}>
                            {name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Complete UI sections</p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center">
                    <div className="text-2xl">↓</div>
                    <div className="text-gray-500 text-sm">compose together</div>
                  </div>
                  
                  {/* Level 4 - Page */}
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-200 mb-4">Complete Page</h4>
                    <div className="w-64 h-32 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800 flex items-center justify-center">
                      <span className="text-xl text-white">Dashboard Page</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Full application page composed of organisms</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Atomic Design for Students:</h4>
                <p className="text-gray-400 text-sm">
                  This "Atomic Design" approach helps students think about component hierarchy. 
                  Start with atoms (smallest components), combine into molecules (small groups), 
                  then organisms (complete sections), and finally pages (full views). 
                  This systematic approach prevents "mega-components" that try to do everything.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Lifecycle Section */}
        {activeSection === 'lifecycle' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mr-4">
                <GitBranch size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Component Lifecycle
                </h2>
                <p className="text-gray-400 mt-2">
                  How components are born, live, and are removed
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {componentLifecycle.map((phase, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    "border",
                    index === 0 ? "border-green-800" :
                    index === 1 ? "border-yellow-800" : "border-red-800",
                    "bg-gradient-to-br from-gray-800 to-gray-900",
                    index === 0 ? "hover:border-green-700" :
                    index === 1 ? "hover:border-yellow-700" : "hover:border-red-700"
                  )}
                >
                  <div className="flex items-center mb-4">
                    <div className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4",
                      index === 0 ? "bg-green-600" :
                      index === 1 ? "bg-yellow-600" : "bg-red-600"
                    )}>
                      {index === 0 ? "👶" : index === 1 ? "📈" : "👋"}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">{phase.phase}</h3>
                      <p className="text-gray-500 text-sm">{phase.analogy}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Description:</h4>
                      <p className="text-gray-400 text-sm">{phase.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Relevant Hooks:</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.hooks.map((hook, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm"
                          >
                            {hook}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Student Example:</h4>
                      <p className="text-gray-400 text-sm">
                        {index === 0 && "When Swadeep's AttendanceCard first appears, useState sets up its initial state."}
                        {index === 1 && "When Tuhina's SearchBar receives new props, useEffect updates the search results."}
                        {index === 2 && "When Abhronila's Timer is removed, useEffect cleanup stops the interval."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lifecycle Visualization */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Component Lifecycle Flow</h3>
              
              <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  {/* Creation */}
                  <div className={clsx(
                    "text-center mb-8 md:mb-0",
                    isMounted ? "opacity-100 scale-100" : "opacity-50 scale-95"
                  )}>
                    <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👶</span>
                    </div>
                    <h4 className="font-semibold text-gray-200 mb-2">Creation</h4>
                    <div className="space-y-1">
                      <div className="text-gray-400 text-sm">Component is born</div>
                      <div className="text-gray-400 text-sm">useState initializes</div>
                      <div className="text-gray-400 text-sm">First render happens</div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center mb-8 md:mb-0">
                    <div className="text-3xl animate-pulse">➡️</div>
                    <div className="text-gray-500 text-sm">props/state change</div>
                  </div>
                  
                  {/* Updates */}
                  <div className={clsx(
                    "text-center mb-8 md:mb-0",
                    isMounted ? "opacity-100 scale-100" : "opacity-50 scale-95"
                  )}>
                    <div className="w-20 h-20 rounded-full bg-yellow-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h4 className="font-semibold text-gray-200 mb-2">Updates</h4>
                    <div className="space-y-1">
                      <div className="text-gray-400 text-sm">Re-renders occur</div>
                      <div className="text-gray-400 text-sm">State/props change</div>
                      <div className="text-gray-400 text-sm">useEffect runs</div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-center mb-8 md:mb-0">
                    <div className="text-3xl animate-pulse">➡️</div>
                    <div className="text-gray-500 text-sm">component removed</div>
                  </div>
                  
                  {/* Unmount */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👋</span>
                    </div>
                    <h4 className="font-semibold text-gray-200 mb-2">Unmount</h4>
                    <div className="space-y-1">
                      <div className="text-gray-400 text-sm">Component removed</div>
                      <div className="text-gray-400 text-sm">Cleanup runs</div>
                      <div className="text-gray-400 text-sm">Memory freed</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">Lifecycle Thinking:</h4>
                <p className="text-gray-400 text-sm">
                  When Debangshu builds components, he thinks about their entire lifecycle: 
                  "What setup does this need when created? What should happen when data changes? 
                  What cleanup is needed when it's removed?" This holistic thinking prevents 
                  memory leaks and ensures components behave correctly throughout their lifespan.
                </p>
              </div>
            </div>

            {/* Lifecycle Code Example */}
            <div className={clsx(
              "mt-8 rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Lifecycle in Code</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Component with Full Lifecycle:</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`function StudentTracker({ studentId }) {
  // 🎯 CREATION: Initialize state
  const [attendance, setAttendance] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // 🎯 CREATION & UPDATES: Fetch data when studentId changes
  useEffect(() => {
    setIsLoading(true)
    
    // Fetch attendance data
    fetchAttendance(studentId)
      .then(data => {
        setAttendance(data)
        setIsLoading(false)
      })
    
    // 🎯 UNMOUNT: Cleanup function
    return () => {
      // Cancel any pending requests
      console.log('Cleaning up tracker for student:', studentId)
    }
  }, [studentId]) // Re-run when studentId changes
  
  // 🎯 UPDATES: Calculate derived data
  const totalClasses = attendance.length
  const presentCount = attendance.filter(a => a.isPresent).length
  const attendanceRate = totalClasses > 0 
    ? (presentCount / totalClasses * 100).toFixed(1)
    : 0
  
  // 🎯 RENDER: Return JSX
  return (
    <div className="tracker">
      {isLoading ? (
        <p>Loading attendance...</p>
      ) : (
        <>
          <h3>Attendance: {attendanceRate}%</h3>
          <ul>
            {attendance.map(record => (
              <li key={record.date}>
                {record.date}: {record.isPresent ? '✓' : '✗'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}`}</pre>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Lifecycle Breakdown:</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                          1
                        </div>
                        <h5 className="font-semibold text-green-300">Creation (Mount)</h5>
                      </div>
                      <ul className="space-y-2 text-gray-400 text-sm ml-9">
                        <li>• useState hooks initialize state</li>
                        <li>• Component renders for first time</li>
                        <li>• useEffect runs after initial render</li>
                        <li>• Data fetching begins</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold mr-3">
                          2
                        </div>
                        <h5 className="font-semibold text-yellow-300">Updates (Re-renders)</h5>
                      </div>
                      <ul className="space-y-2 text-gray-400 text-sm ml-9">
                        <li>• studentId prop changes trigger re-render</li>
                        <li>• useEffect dependency array detects change</li>
                        <li>• Cleanup runs from previous effect</li>
                        <li>• New effect runs with new studentId</li>
                        <li>• State updates trigger another re-render</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-3">
                          3
                        </div>
                        <h5 className="font-semibold text-red-300">Removal (Unmount)</h5>
                      </div>
                      <ul className="space-y-2 text-gray-400 text-sm ml-9">
                        <li>• Component removed from DOM</li>
                        <li>• useEffect cleanup function runs</li>
                        <li>• Any pending promises are cancelled</li>
                        <li>• Event listeners removed</li>
                        <li>• Memory is freed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Best Practices Section */}
        {activeSection === 'best' && (
          <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gray-900/30 flex items-center justify-center mr-4">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-100">
                  Component Best Practices
                </h2>
                <p className="text-gray-400 mt-2">
                  Professional habits for building maintainable, reusable components
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {componentBestPractices.map((practice, index) => (
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
                      <h4 className="font-semibold text-gray-200 mb-1">Description:</h4>
                      <p className="text-gray-400 text-sm">{practice.description}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                      <h4 className="font-semibold text-gray-200 mb-1">Example:</h4>
                      <p className="text-gray-400 text-sm">{practice.example}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                      <h4 className="font-semibold text-blue-300 mb-1">Benefit:</h4>
                      <p className="text-gray-400 text-sm">{practice.benefit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Component Quality Checklist */}
            <div className={clsx(
              "rounded-xl p-6 mb-8",
              "border border-yellow-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-yellow-300">Component Quality Checklist</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-4">✅ Does Your Component:</h4>
                  <div className="space-y-3">
                    {[
                      "Have a single, clear responsibility?",
                      "Use descriptive, PascalCase naming?",
                      "Accept props to customize behavior?",
                      "Provide sensible default props?",
                      "Handle edge cases (null, undefined)?",
                      "Have appropriate TypeScript/PropTypes?",
                      "Include helpful comments for complex logic?",
                      "Export properly for reuse?"
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 rounded-lg bg-green-900/20 border border-green-800"
                      >
                        <CheckCircle size={16} className="text-green-400 mr-3" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-4">❌ Does Your Component Avoid:</h4>
                  <div className="space-y-3">
                    {[
                      "Side effects in render (API calls directly in JSX)?",
                      "Overly complex logic (should be split)?",
                      "Tight coupling to specific parent?",
                      "Magic numbers/strings (use constants)?",
                      "Large files (>150 lines consider splitting)?",
                      "Mixing presentation and business logic?",
                      "Direct DOM manipulation (use React state)?",
                      "Prop drilling (consider Context API)?"
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 rounded-lg bg-red-900/20 border border-red-800"
                      >
                        <span className="text-red-400 mr-3 text-xl">✗</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                <h4 className="font-semibold text-yellow-300 mb-2">Code Review Exercise:</h4>
                <p className="text-gray-400 text-sm">
                  Pair up with a classmate from a different location (Barrackpore with Ichapur). 
                  Review each other's components using this checklist. Look for:
                  <br/>1. Single responsibility violations
                  <br/>2. Missing prop validation
                  <br/>3. Opportunities for splitting large components
                  <br/>4. Magic strings/numbers that should be constants
                  <br/>This peer review builds professional skills and improves code quality.
                </p>
              </div>
            </div>

            {/* Refactoring Example */}
            <div className={clsx(
              "rounded-xl p-6",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-6 text-purple-300">Refactoring to Better Components</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Before: Monolithic Component</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`function StudentDashboard() {
  // Too many responsibilities!
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [attendance, setAttendance] = useState({})
  const [grades, setGrades] = useState({})
  
  // Data fetching mixed with UI logic
  useEffect(() => {
    fetchStudents().then(setStudents)
    fetchAttendance().then(setAttendance)
    fetchGrades().then(setGrades)
  }, [])
  
  // Complex rendering logic
  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>
      
      {/* Student list section */}
      <div className="student-list">
        <h2>Students</h2>
        <ul>
          {students.map(student => (
            <li key={student.id}>
              <button onClick={() => setSelectedStudent(student)}>
                {student.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Attendance section */}
      {selectedStudent && (
        <div className="attendance-section">
          <h2>Attendance for {selectedStudent.name}</h2>
          <p>Present: {attendance[selectedStudent.id]?.present || 0}</p>
          <p>Absent: {attendance[selectedStudent.id]?.absent || 0}</p>
        </div>
      )}
      
      {/* Grades section */}
      {selectedStudent && (
        <div className="grades-section">
          <h2>Grades for {selectedStudent.name}</h2>
          <p>Math: {grades[selectedStudent.id]?.math || 'N/A'}</p>
          <p>Science: {grades[selectedStudent.id]?.science || 'N/A'}</p>
        </div>
      )}
    </div>
  )
}`}</pre>
                  <div className="mt-3 p-3 rounded-lg bg-red-900/20 border border-red-800">
                    <p className="text-gray-400 text-sm">
                      Problems: 300+ lines, mixed responsibilities, hard to test, impossible to reuse parts
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">After: Composed Components</h4>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`// StudentDashboard.jsx - Now just composition
function StudentDashboard() {
  const { students, loading } = useStudents()
  const [selectedId, setSelectedId] = useState(null)
  
  return (
    <DashboardLayout>
      <StudentList 
        students={students}
        onSelect={setSelectedId}
        loading={loading}
      />
      
      {selectedId && (
        <>
          <AttendanceCard studentId={selectedId} />
          <GradesCard studentId={selectedId} />
        </>
      )}
    </DashboardLayout>
  )
}

// StudentList.jsx - Single responsibility
function StudentList({ students, onSelect, loading }) {
  if (loading) return <LoadingSpinner />
  
  return (
    <Card title="Students">
      {students.map(student => (
        <StudentListItem 
          key={student.id}
          student={student}
          onClick={() => onSelect(student.id)}
        />
      ))}
    </Card>
  )
}

// AttendanceCard.jsx - Reusable, testable
function AttendanceCard({ studentId }) {
  const { data, loading } = useAttendance(studentId)
  
  return (
    <Card title="Attendance">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <p>Present: {data.present}</p>
          <p>Absent: {data.absent}</p>
        </>
      )}
    </Card>
  )
}

// Similar for GradesCard, StudentListItem, etc.`}</pre>
                  <div className="mt-3 p-3 rounded-lg bg-green-900/20 border border-green-800">
                    <p className="text-gray-400 text-sm">
                      {`Benefits: Each component <100 lines, reusable, testable, maintainable`}
                    </p>
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
                      The Component Mindset Shift:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      When Swadeep first learns React, he thinks in pages: "I need an attendance page." 
                      The component mindset shift is thinking in pieces: "I need a StudentCard, 
                      an AttendanceChart, a DatePicker." This shift from monolithic to modular thinking 
                      is fundamental. It's not just about React—it's about how we solve complex problems 
                      by breaking them into manageable pieces.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Teaching Component Thinking:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Start with UI breakdown exercises - take a screenshot, draw boxes around components</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Use the "single responsibility" test - can you describe the component in one sentence?</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Practice refactoring - take working code and split it into smaller components</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">4</span>
                          </div>
                          <span>Component naming games - "What would you call this piece?" builds vocabulary</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Student Challenges:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Everything in one component works, why split it?" (maintainability)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"How small is too small?" (when splitting creates more complexity)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Props drilling feels messy" (introduce Context API later)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt=1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"I don't know what to name components" (practice with real examples)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      27 Years of Component Thinking:
                    </h5>
                    <p className="text-gray-400">
                      I've taught software design since 1997. The component concept appears everywhere: 
                      in object-oriented programming (classes), in functional programming (pure functions), 
                      in architecture (microservices). React components are just the latest manifestation 
                      of a timeless principle: divide and conquer. When Tuhina builds her library system 
                      with components, she's learning a universal problem-solving strategy. The real skill 
                      isn't React syntax—it's the ability to look at a complex system and see the natural 
                      seams where it can be divided. That skill transfers to every area of software 
                      development and beyond. That's why I spend so much time on components: they're not 
                      just React features, they're a fundamental way of thinking about complexity.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching component-based thinking and software design principles since 1997</p>
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
              📋 Topic 13 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Create function-based components with proper syntax",
                "Understand component anatomy (props, state, JSX return)",
                "Differentiate between presentational and container components",
                "Compose components using parent-child relationships",
                "Apply the 'single responsibility' principle to components",
                "Use props to make components configurable and reusable",
                "Follow naming conventions (PascalCase, descriptive names)",
                "Implement component lifecycle methods appropriately",
                "Apply component best practices in student projects",
                "Think in components when designing application architecture"
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
                to="/react-foundations/topic/Module1/14"
                className="inline-flex items-center gap-2
               px-6 py-3 rounded-lg
               bg-gradient-to-r from-blue-500 to-purple-600
               text-white font-medium"
              >
                Ready for Topic 14
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-sm text-gray-400">
                Next: Why class components are legacy (conceptual awareness only)
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 13: Function-Based Components</p>
            <p className="mt-2 text-sm">Mastering the fundamental building blocks of React applications</p>
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

export default Topic13;