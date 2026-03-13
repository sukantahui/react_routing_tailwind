import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

// Child Component that receives props
const StudentCard = ({ student, onUpdateScore, onToggleAttendance }) => {
  const [localNote, setLocalNote] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className={clsx(
      "rounded-xl p-5 transition-all duration-500",
      "border-2 hover:scale-[1.02] transform-gpu",
      student.isPresent 
        ? "border-green-500/50 bg-green-900/10" 
        : "border-red-500/50 bg-red-900/10"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{student.name}</h3>
          <p className="text-sm opacity-70">{student.location}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleAttendance(student.id)}
            className={clsx(
              "px-3 py-1 rounded-lg text-sm transition-all duration-300",
              student.isPresent 
                ? "bg-green-700 hover:bg-green-600" 
                : "bg-red-700 hover:bg-red-600"
            )}
          >
            {student.isPresent ? 'Present' : 'Absent'}
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
          >
            {showDetails ? '▲' : '▼'}
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Score: {student.score}/100</span>
          <div className="flex gap-1">
            <button
              onClick={() => onUpdateScore(student.id, -5)}
              className="w-6 h-6 bg-red-600 hover:bg-red-500 rounded flex items-center justify-center"
              disabled={student.score <= 0}
            >
              -
            </button>
            <button
              onClick={() => onUpdateScore(student.id, 5)}
              className="w-6 h-6 bg-green-600 hover:bg-green-500 rounded flex items-center justify-center"
              disabled={student.score >= 100}
            >
              +
            </button>
          </div>
        </div>
        <div className={clsx(
          "h-2 rounded-full overflow-hidden",
          student.score >= 70 ? "bg-green-900/50" : 
          student.score >= 40 ? "bg-yellow-900/50" : "bg-red-900/50"
        )}>
          <div 
            className={clsx(
              "h-full transition-all duration-500",
              student.score >= 70 ? "bg-green-500" : 
              student.score >= 40 ? "bg-yellow-500" : "bg-red-500"
            )}
            style={{ width: `${student.score}%` }}
          />
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="mb-3">
            <label className="block text-sm mb-1">Add a local note (state):</label>
            <input
              type="text"
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              className={clsx(
                "w-full px-3 py-2 rounded border",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "bg-gray-800 border-gray-700 text-white"
              )}
              placeholder="This is local state..."
            />
            {localNote && (
              <p className="text-sm text-blue-400 mt-1">
                Note: "{localNote}" - This only exists in this component
              </p>
            )}
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="opacity-70">Prop: Student Name</span>
              <span className="font-medium">{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Prop: Score</span>
              <span className="font-medium">{student.score}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">State: Local Note</span>
              <span className="font-medium">{localNote || '(empty)'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Parent Component that manages state and passes props
const ClassroomManager = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Swadeep', score: 85, location: 'Barrackpore', isPresent: true },
    { id: 2, name: 'Tuhina', score: 92, location: 'Shyamnagar', isPresent: true },
    { id: 3, name: 'Abhronila', score: 78, location: 'Ichapur', isPresent: false },
    { id: 4, name: 'Debangshu', score: 65, location: 'Naihati', isPresent: true },
  ]);
  
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentLocation, setNewStudentLocation] = useState('Barrackpore');
  
  const updateScore = (id, change) => {
    setStudents(prev => prev.map(student => 
      student.id === id 
        ? { ...student, score: Math.max(0, Math.min(100, student.score + change)) }
        : student
    ));
  };
  
  const toggleAttendance = (id) => {
    setStudents(prev => prev.map(student => 
      student.id === id 
        ? { ...student, isPresent: !student.isPresent }
        : student
    ));
  };
  
  const addStudent = () => {
    if (newStudentName.trim()) {
      const newStudent = {
        id: Date.now(),
        name: newStudentName,
        score: 50,
        location: newStudentLocation,
        isPresent: true
      };
      setStudents(prev => [...prev, newStudent]);
      setNewStudentName('');
    }
  };
  
  const resetAllScores = () => {
    setStudents(prev => prev.map(student => ({ ...student, score: 50 })));
  };
  
  const averageScore = students.length > 0 
    ? students.reduce((sum, student) => sum + student.score, 0) / students.length 
    : 0;
  
  const presentCount = students.filter(s => s.isPresent).length;
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Classroom Stats */}
        <div className={clsx(
          "rounded-xl p-5",
          "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
        )}>
          <h3 className="font-bold text-lg mb-4">📊 Classroom Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Students:</span>
              <span className="font-bold">{students.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Present Today:</span>
              <span className="font-bold text-green-400">{presentCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Score:</span>
              <span className="font-bold text-yellow-400">{averageScore.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Top Scorer:</span>
              <span className="font-bold text-green-400">
                {students.length > 0 
                  ? students.reduce((max, s) => s.score > max.score ? s : max).name 
                  : 'None'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Add Student Form */}
        <div className={clsx(
          "rounded-xl p-5",
          "bg-gradient-to-br from-green-900/20 to-teal-900/20"
        )}>
          <h3 className="font-bold text-lg mb-4">➕ Add New Student</h3>
          <div className="space-y-3">
            <div>
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="Student name..."
                className={clsx(
                  "w-full px-3 py-2 rounded border",
                  "focus:outline-none focus:ring-2 focus:ring-green-500",
                  "bg-gray-800 border-gray-700 text-white"
                )}
                onKeyPress={(e) => e.key === 'Enter' && addStudent()}
              />
            </div>
            <div>
              <select
                value={newStudentLocation}
                onChange={(e) => setNewStudentLocation(e.target.value)}
                className={clsx(
                  "w-full px-3 py-2 rounded border",
                  "focus:outline-none focus:ring-2 focus:ring-green-500",
                  "bg-gray-800 border-gray-700 text-white"
                )}
              >
                <option value="Barrackpore">Barrackpore</option>
                <option value="Shyamnagar">Shyamnagar</option>
                <option value="Ichapur">Ichapur</option>
                <option value="Naihati">Naihati</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addStudent}
                className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
                disabled={!newStudentName.trim()}
              >
                Add Student
              </button>
              <button
                onClick={resetAllScores}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-colors"
              >
                Reset All Scores
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Student Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {students.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onUpdateScore={updateScore}
            onToggleAttendance={toggleAttendance}
          />
        ))}
      </div>
      
      <div className={clsx(
        "rounded-xl p-4 text-sm",
        "bg-gradient-to-r from-blue-900/10 to-purple-900/10"
      )}>
        <div className="flex items-start gap-3">
          <div className="text-lg">💡</div>
          <div>
            <p className="font-medium mb-1">Parent-Child Relationship Demo</p>
            <p className="opacity-80">
              The <span className="font-semibold text-blue-400">ClassroomManager</span> (parent) manages the students state and passes it as 
              <span className="font-semibold text-green-400"> props</span> to <span className="font-semibold text-purple-400">StudentCard</span> components (children).
              Each StudentCard also has its own <span className="font-semibold text-yellow-400">local state</span> for notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic4 = () => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('comparison');
  const [selectedConcept, setSelectedConcept] = useState('props');
  const [demoType, setDemoType] = useState('parentChild');
  
  // Demo states
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('Hello from parent!');
  const [theme, setTheme] = useState('dark');
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    darkMode: true,
    fontSize: 16
  });

  // Concepts data
  const concepts = [
    {
      id: 'props',
      name: 'Props',
      description: 'Data passed from parent to child',
      icon: '📤',
      color: 'blue',
      characteristics: [
        'Read-only (immutable)',
        'Passed from parent to child',
        'Can be any data type',
        'Trigger re-renders when changed'
      ]
    },
    {
      id: 'state',
      name: 'State',
      description: 'Data managed within a component',
      icon: '💾',
      color: 'green',
      characteristics: [
        'Mutable (can be updated)',
        'Local to component',
        'Triggers re-renders when updated',
        'Initialized within component'
      ]
    }
  ];

  // Comparison data
  const comparisons = [
    {
      aspect: 'Mutability',
      props: 'Immutable (read-only)',
      state: 'Mutable (can be updated)',
      analogy: 'Props are like exam questions (fixed), State is like your answers (can change)'
    },
    {
      aspect: 'Ownership',
      props: 'Owned by parent component',
      state: 'Owned by the component itself',
      analogy: 'Props are borrowed books, State is your personal notebook'
    },
    {
      aspect: 'Updates',
      props: 'Changed by parent component',
      state: 'Changed by component itself',
      analogy: 'Props change when parent decides, State changes when you decide'
    },
    {
      aspect: 'Scope',
      props: 'Passed down through component tree',
      state: 'Local to component (unless lifted up)',
      analogy: 'Props travel between cities, State stays in your home'
    },
    {
      aspect: 'Purpose',
      props: 'Configuration for components',
      state: 'Memory of the component',
      analogy: 'Props are settings, State is memory'
    },
    {
      aspect: 'Initial Value',
      props: 'Passed from parent',
      state: 'Defined in component with useState',
      analogy: 'Props come from outside, State is created inside'
    }
  ];

  // Real-world examples
  const examples = [
    {
      scenario: 'Student Profile Card',
      props: 'student name, photo, grade (passed from parent)',
      state: 'isExpanded, local notes (managed internally)',
      location: 'Barrackpore High School'
    },
    {
      scenario: 'Weather App',
      props: 'city name, temperature unit (user preference)',
      state: 'current temperature, loading status (fetched data)',
      location: 'Shyamnagar Weather Station'
    },
    {
      scenario: 'Online Quiz',
      props: 'question text, options (from question bank)',
      state: 'selected answer, timer, score (user interaction)',
      location: 'Ichapur Learning Center'
    },
    {
      scenario: 'Shopping Cart',
      props: 'product details, prices (from catalog)',
      state: 'quantity, cart total, checkout status (user actions)',
      location: 'Naihati Marketplace'
    }
  ];

  // Simple Child Component for demo
  const MessageDisplay = ({ message, onUpdate }) => {
    const [localCount, setLocalCount] = useState(0);
    
    return (
      <div className={clsx(
        "p-5 rounded-xl border-2",
        "border-blue-500/50 bg-blue-900/10"
      )}>
        <h4 className="font-bold mb-3 text-blue-400">Child Component</h4>
        
        <div className="space-y-4">
          <div>
            <div className="text-sm opacity-70">Prop received from parent:</div>
            <div className="font-bold text-lg">{message}</div>
          </div>
          
          <div>
            <div className="text-sm opacity-70">Local state (only in child):</div>
            <div className="font-bold text-lg">Count: {localCount}</div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setLocalCount(c => c - 1)}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
              >
                Decrement
              </button>
              <button
                onClick={() => setLocalCount(c => c + 1)}
                className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm"
              >
                Increment
              </button>
            </div>
          </div>
          
          <div>
            <button
              onClick={() => onUpdate('Updated from child!')}
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
            >
              Send Update to Parent
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Theme Switcher Component
  const ThemeSwitcher = ({ theme, onThemeChange }) => {
    return (
      <div className={clsx(
        "p-5 rounded-xl border-2",
        "border-purple-500/50 bg-purple-900/10"
      )}>
        <h4 className="font-bold mb-3 text-purple-400">Theme Switcher (Child)</h4>
        <div className="space-y-3">
          <div className="text-sm opacity-70">
            Current theme (passed as prop): <span className="font-bold">{theme}</span>
          </div>
          <div className="flex gap-2">
            {['light', 'dark', 'blue', 'green'].map(t => (
              <button
                key={t}
                onClick={() => onThemeChange(t)}
                className={clsx(
                  "flex-1 py-2 rounded-lg transition-all duration-300",
                  "hover:scale-105",
                  theme === t
                    ? "bg-purple-600 text-white" 
                    : "bg-gray-700 hover:bg-gray-600"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-cyan-50 to-gray-100 text-gray-900"
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
                Props vs State: The Fundamental Difference ⚖️
              </h1>
              <p className={clsx(
                "mt-1 text-sm transition-all duration-500",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Topic 4: Props vs State – Conceptual Differences
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
              : "bg-gradient-to-r from-white to-cyan-50 shadow-xl"
          )}>
            <h2 className="text-4xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
              Props vs State: What's the Difference? 🤔
            </h2>
            <p className={clsx(
              "text-lg mb-6 leading-relaxed transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              <span className="font-bold text-blue-400">Props</span> (short for properties) are data passed from parent to child.
              <span className="font-bold text-green-400"> State</span> is data managed within a component itself.
              Understanding this distinction is crucial for React mastery.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Props Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-blue-500 animate-[slideUp_1.2s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-blue-50"
              )}>
                <div className="text-4xl mb-4">📤</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">Props (Properties)</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Data <span className="font-semibold">passed down</span> from parent components.
                  Like <span className="font-semibold">Swadeep</span>'s exam paper - he can read it but not change the questions.
                </p>
              </div>

              {/* State Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-green-500 animate-[slideUp_1.4s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-green-50"
              )}>
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">State</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Data <span className="font-semibold">managed internally</span> by a component.
                  Like <span className="font-semibold">Tuhina</span>'s notes - she can write, edit, and update them as needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 animate-[slideUp_1s_ease-out]">
          <button
            onClick={() => setActiveTab('comparison')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'comparison'
                ? isDarkMode 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            ⚖️ Detailed Comparison
          </button>
          <button
            onClick={() => setActiveTab('demos')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'demos'
                ? isDarkMode 
                  ? "bg-green-600 text-white" 
                  : "bg-green-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            🎮 Interactive Demos
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
            📚 Real-world Examples
          </button>
        </div>

        {/* Detailed Comparison Section */}
        {activeTab === 'comparison' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Props vs State: Side-by-Side Comparison ⚖️
            </h2>
            
            <div className={clsx(
              "rounded-2xl p-8 mb-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-blue-50"
            )}>
              {/* Concept Selector */}
              <div className="flex gap-4 mb-8 justify-center">
                {concepts.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => setSelectedConcept(concept.id)}
                    className={clsx(
                      "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                      "transform hover:scale-105",
                      selectedConcept === concept.id
                        ? isDarkMode 
                          ? `bg-${concept.color}-600 text-white` 
                          : `bg-${concept.color}-500 text-white`
                        : isDarkMode 
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    )}
                  >
                    {concept.icon} {concept.name}
                  </button>
                ))}
              </div>
              
              {/* Concept Details */}
              <div className="grid md:grid-cols-2 gap-8">
                {concepts.map((concept) => (
                  selectedConcept === concept.id && (
                    <div key={concept.id} className="animate-[slideUp_0.5s_ease-out]">
                      <div className={clsx(
                        "rounded-xl p-6",
                        isDarkMode ? `bg-${concept.color}-900/20` : `bg-${concept.color}-100/50`
                      )}>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={clsx(
                            "p-4 rounded-full text-3xl",
                            isDarkMode ? `bg-${concept.color}-700` : `bg-${concept.color}-200`
                          )}>
                            {concept.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">
                              <span className={clsx(
                                "transition-colors duration-500",
                                isDarkMode ? `text-${concept.color}-300` : `text-${concept.color}-600`
                              )}>
                                {concept.name}
                              </span>
                            </h3>
                            <p className={clsx(
                              "transition-colors duration-500",
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            )}>
                              {concept.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="font-bold mb-3 text-lg">Key Characteristics:</h4>
                          <ul className="space-y-2">
                            {concept.characteristics.map((char, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className={clsx(
                                  "mt-1",
                                  isDarkMode ? `text-${concept.color}-400` : `text-${concept.color}-500`
                                )}>
                                  •
                                </span>
                                <span className={clsx(
                                  "transition-colors duration-500",
                                  isDarkMode ? "text-gray-300" : "text-gray-700"
                                )}>
                                  {char}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className={clsx(
                          "p-4 rounded-lg font-mono",
                          isDarkMode ? "bg-gray-900" : "bg-gray-100"
                        )}>
                          <code className={clsx(
                            "transition-colors duration-500",
                            isDarkMode ? `text-${concept.color}-300` : `text-${concept.color}-600`
                          )}>
                            {concept.id === 'props' 
                              ? '<ChildComponent name="Swadeep" score={85} />' 
                              : 'const [count, setCount] = useState(0);'}
                          </code>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
              
              {/* Comparison Table */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Comparison Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={clsx(
                        "border-b transition-colors duration-500",
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      )}>
                        <th className="text-left py-4 px-4 font-bold">Aspect</th>
                        <th className="text-left py-4 px-4 font-bold text-blue-400">Props</th>
                        <th className="text-left py-4 px-4 font-bold text-green-400">State</th>
                        <th className="text-left py-4 px-4 font-bold text-purple-400">Real-world Analogy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((item, index) => (
                        <tr 
                          key={item.aspect}
                          className={clsx(
                            "border-b transition-all duration-300 hover:scale-[1.01]",
                            isDarkMode 
                              ? "border-gray-800 hover:bg-gray-800/50" 
                              : "border-gray-200 hover:bg-gray-100"
                          )}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <td className="py-4 px-4 font-bold">{item.aspect}</td>
                          <td className="py-4 px-4">
                            <div className={clsx(
                              "p-3 rounded-lg",
                              isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
                            )}>
                              {item.props}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className={clsx(
                              "p-3 rounded-lg",
                              isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
                            )}>
                              {item.state}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className={clsx(
                              "p-3 rounded-lg italic text-sm",
                              isDarkMode ? "bg-purple-900/20" : "bg-purple-100/50"
                            )}>
                              {item.analogy}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className={clsx(
                "mt-8 p-6 rounded-xl",
                isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100/50"
              )}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold mb-2 text-yellow-300">Golden Rule</h4>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      <span className="font-semibold">Props flow down</span>, 
                      <span className="font-semibold"> state stays local</span>. 
                      If a child needs to update data, the state should live in the parent and be passed down as props.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Interactive Demos Section */}
        {activeTab === 'demos' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Interactive Demos 🎮
            </h2>
            
            <div className="flex gap-4 mb-6 justify-center">
              <button
                onClick={() => setDemoType('parentChild')}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  demoType === 'parentChild'
                    ? isDarkMode 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                👨‍👦 Parent-Child Demo
              </button>
              <button
                onClick={() => setDemoType('classroom')}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  demoType === 'classroom'
                    ? isDarkMode 
                      ? "bg-green-600 text-white" 
                      : "bg-green-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                🏫 Classroom Manager
              </button>
              <button
                onClick={() => setDemoType('theme')}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  demoType === 'theme'
                    ? isDarkMode 
                      ? "bg-purple-600 text-white" 
                      : "bg-purple-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                🎨 Theme Switcher
              </button>
            </div>

            {demoType === 'parentChild' ? (
              <div className={clsx(
                "rounded-2xl p-8 transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-blue-50"
              )}>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">
                  Parent-Child Communication Demo
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Parent Component */}
                  <div className={clsx(
                    "p-5 rounded-xl border-2",
                    "border-green-500/50 bg-green-900/10"
                  )}>
                    <h4 className="font-bold mb-4 text-green-400">Parent Component</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm opacity-70 mb-2">Parent State:</div>
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold">{counter}</div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setCounter(c => c - 1)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
                            >
                              -
                            </button>
                            <button
                              onClick={() => setCounter(c => c + 1)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-2">Message to send to child:</label>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className={clsx(
                            "w-full px-3 py-2 rounded border",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500",
                            "bg-gray-800 border-gray-700 text-white"
                          )}
                        />
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gray-800/30">
                        <div className="text-sm font-medium mb-2">Props being passed to child:</div>
                        <div className="font-mono text-sm">
                          <div className="text-blue-400">message="{message}"</div>
                          <div className="text-green-400">onUpdate={'(newMessage) => setMessage(newMessage)'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Child Component */}
                  <MessageDisplay 
                    message={message}
                    onUpdate={setMessage}
                  />
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDarkMode ? "bg-gray-900/50" : "bg-gray-100/50"
                )}>
                  <h4 className="font-bold mb-3">What's happening here?</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold">Parent</span> manages the <span className="font-semibold text-green-400">message state</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">✓</span>
                      <span className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold">Message</span> is passed as a <span className="font-semibold text-blue-400">prop</span> to child
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✓</span>
                      <span className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold">Child</span> can update parent via callback <span className="font-semibold text-purple-400">prop</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">✓</span>
                      <span className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold">Child</span> has its own <span className="font-semibold text-yellow-400">localCount state</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : demoType === 'classroom' ? (
              <div className={clsx(
                "rounded-2xl p-8 transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-green-50"
              )}>
                <h3 className="text-2xl font-bold mb-6 text-green-400">
                  Classroom Management System
                </h3>
                <ClassroomManager />
              </div>
            ) : (
              <div className={clsx(
                "rounded-2xl p-8 transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-purple-50"
              )}>
                <h3 className="text-2xl font-bold mb-6 text-purple-400">
                  Theme Switcher Demo
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Parent */}
                  <div className={clsx(
                    "p-5 rounded-xl border-2",
                    "border-blue-500/50 bg-blue-900/10"
                  )}>
                    <h4 className="font-bold mb-4 text-blue-400">Parent Component</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm opacity-70">Current Theme (State):</div>
                        <div className="text-2xl font-bold mt-1">{theme}</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gray-800/30">
                        <div className="text-sm font-medium mb-2">Props being passed to ThemeSwitcher:</div>
                        <div className="font-mono text-sm">
                          <div className="text-purple-400">theme="{theme}"</div>
                          <div className="text-green-400">onThemeChange={'(newTheme) => setTheme(newTheme)'}</div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg" style={{
                        backgroundColor: 
                          theme === 'light' ? '#f3f4f6' :
                          theme === 'dark' ? '#1f2937' :
                          theme === 'blue' ? '#1e40af' :
                          theme === 'green' ? '#047857' : '#1f2937',
                        color: theme === 'light' ? '#111827' : 'white'
                      }}>
                        <div className="text-center font-bold">
                          Preview of {theme} theme
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Child */}
                  <ThemeSwitcher 
                    theme={theme}
                    onThemeChange={setTheme}
                  />
                </div>
                
                <div className={clsx(
                  "mt-8 p-6 rounded-xl",
                  isDarkMode ? "bg-gray-900/50" : "bg-gray-100/50"
                )}>
                  <h4 className="font-bold mb-3">Key Learning Points:</h4>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Parent manages the <span className="font-semibold text-green-400">theme state</span>
                    </li>
                    <li className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Theme is passed as a <span className="font-semibold text-blue-400">prop</span> to ThemeSwitcher
                    </li>
                    <li className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      ThemeSwitcher can request changes via callback <span className="font-semibold text-purple-400">prop</span>
                    </li>
                    <li className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Single source of truth: theme state lives in parent only
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Real-world Examples Section */}
        {activeTab === 'examples' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Real-world Examples 📚
            </h2>
            
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-purple-50"
            )}>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "rounded-xl p-5 transition-all duration-500 hover:scale-[1.02]",
                      "transform-gpu border-l-4 border-purple-500",
                      isDarkMode 
                        ? "bg-gray-800/50 hover:bg-gray-800" 
                        : "bg-white hover:bg-purple-50"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-4">
                      <div className="text-sm opacity-70 mb-1">{example.location}</div>
                      <h3 className="font-bold text-lg">{example.scenario}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-blue-400 mb-1">Props (from parent):</div>
                        <div className="text-sm pl-3 border-l-2 border-blue-500">
                          {example.props}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-green-400 mb-1">State (managed internally):</div>
                        <div className="text-sm pl-3 border-l-2 border-green-500">
                          {example.state}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Flow Diagram */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Data Flow Visualization</h3>
                
                <div className="relative overflow-hidden rounded-xl p-8 bg-gray-900/30">
                  <svg 
                    viewBox="0 0 800 400" 
                    className="w-full h-auto"
                  >
                    {/* Parent Component */}
                    <rect 
                      x="50" 
                      y="50" 
                      width="300" 
                      height="100" 
                      rx="10"
                      className={clsx(
                        "transition-all duration-500",
                        isDarkMode 
                          ? "fill-green-900/30 stroke-green-500" 
                          : "fill-green-100 stroke-green-400"
                      )}
                      strokeWidth="2"
                    />
                    
                    <text 
                      x="200" 
                      y="100" 
                      textAnchor="middle"
                      className={clsx(
                        "font-bold transition-colors duration-500",
                        isDarkMode ? "fill-green-300" : "fill-green-700"
                      )}
                    >
                      Parent Component
                    </text>
                    <text 
                      x="200" 
                      y="125" 
                      textAnchor="middle"
                      className={clsx(
                        "text-sm transition-colors duration-500",
                        isDarkMode ? "fill-green-400" : "fill-green-600"
                      )}
                    >
                      Manages State
                    </text>
                    
                    {/* Props Flow */}
                    <path 
                      d="M350,100 L450,100" 
                      fill="none"
                      className={clsx(
                        "transition-all duration-500",
                        isDarkMode ? "stroke-blue-400" : "stroke-blue-500"
                      )}
                      strokeWidth="3"
                      markerEnd="url(#arrow)"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="20"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                    
                    <text 
                      x="400" 
                      y="90" 
                      textAnchor="middle"
                      className={clsx(
                        "text-sm font-bold transition-colors duration-500",
                        isDarkMode ? "fill-blue-300" : "fill-blue-600"
                      )}
                    >
                      Props Flow Down
                    </text>
                    
                    {/* Child Component */}
                    <rect 
                      x="450" 
                      y="50" 
                      width="300" 
                      height="100" 
                      rx="10"
                      className={clsx(
                        "transition-all duration-500",
                        isDarkMode 
                          ? "fill-blue-900/30 stroke-blue-500" 
                          : "fill-blue-100 stroke-blue-400"
                      )}
                      strokeWidth="2"
                    />
                    
                    <text 
                      x="600" 
                      y="100" 
                      textAnchor="middle"
                      className={clsx(
                        "font-bold transition-colors duration-500",
                        isDarkMode ? "fill-blue-300" : "fill-blue-700"
                      )}
                    >
                      Child Component
                    </text>
                    <text 
                      x="600" 
                      y="125" 
                      textAnchor="middle"
                      className={clsx(
                        "text-sm transition-colors duration-500",
                        isDarkMode ? "fill-blue-400" : "fill-blue-600"
                      )}
                    >
                      Receives Props
                    </text>
                    
                    {/* State in Child */}
                    <rect 
                      x="500" 
                      y="200" 
                      width="200" 
                      height="60" 
                      rx="8"
                      className={clsx(
                        "transition-all duration-500",
                        isDarkMode 
                          ? "fill-green-900/30 stroke-green-500" 
                          : "fill-green-100 stroke-green-400"
                      )}
                      strokeWidth="2"
                    />
                    
                    <text 
                      x="600" 
                      y="235" 
                      textAnchor="middle"
                      className={clsx(
                        "font-bold transition-colors duration-500",
                        isDarkMode ? "fill-green-300" : "fill-green-700"
                      )}
                    >
                      Local State
                    </text>
                    
                    {/* Arrow definition */}
                    <defs>
                      <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                      >
                        <path
                          d="M 0 0 L 10 5 L 0 10 z"
                          className={isDarkMode ? "fill-blue-400" : "fill-blue-500"}
                        />
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6 text-center">
                  <div>
                    <div className="text-lg mb-2">📤</div>
                    <div className="font-bold text-blue-400">Props Flow Down</div>
                    <div className="text-sm opacity-70">Parent → Child</div>
                  </div>
                  <div>
                    <div className="text-lg mb-2">🔄</div>
                    <div className="font-bold text-purple-400">Events Bubble Up</div>
                    <div className="text-sm opacity-70">Child → Parent via callbacks</div>
                  </div>
                  <div>
                    <div className="text-lg mb-2">💾</div>
                    <div className="font-bold text-green-400">State Stays Local</div>
                    <div className="text-sm opacity-70">Unless lifted to parent</div>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-6 rounded-xl",
                isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100/50"
              )}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold mb-2 text-yellow-300">When to Use Props vs State</h4>
                    <ul className="space-y-2">
                      <li className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold text-blue-400">Use Props</span> when data needs to be shared between components
                      </li>
                      <li className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold text-green-400">Use State</span> when data is local and private to a component
                      </li>
                      <li className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold text-purple-400">Lift State Up</span> when multiple children need the same data
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        <section className="mb-16 animate-[slideUp_1.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-r-4 border-red-500",
            isDarkMode 
              ? "bg-gradient-to-r from-red-900/20 to-red-800/20" 
              : "bg-gradient-to-r from-red-50 to-orange-50"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-red-400">🚫 Common Mistakes</h3>
            
            <div className="space-y-6">
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Trying to Modify Props Directly ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Props are read-only. You cannot modify them directly in the child component.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// WRONG: this.props.name = "New Name"</code><br/>
                  <code className="text-green-300">// RIGHT: Use callback to ask parent to update</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Duplicating State ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Storing the same data in both parent state and child state leads to inconsistency.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// WRONG: Child has its own copy of parent's data</code><br/>
                  <code className="text-green-300">// RIGHT: Single source of truth in parent</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Not Lifting State Up ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  When siblings need to share data, state should live in their common parent.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-green-300">// Move state from children to common parent</code>
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
            <h3 className="text-3xl font-bold mb-6 text-green-400">✅ Best Practices</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📤</div>
                  <div>
                    <h4 className="font-bold mb-2">Props Down</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Pass data and callbacks from parent to child via props.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <h4 className="font-bold mb-2">Events Up</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Children communicate with parent via callback props.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💾</div>
                  <div>
                    <h4 className="font-bold mb-2">Single Source</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Keep state as close as possible to where it's needed.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🏗️</div>
                  <div>
                    <h4 className="font-bold mb-2">Lift When Needed</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Move state up to common ancestor when sharing between siblings.
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
                    If <span className="font-semibold">Abhronila</span> and <span className="font-semibold">Debangshu</span> 
                    both need to see the same timer in a quiz app, where should the timer state live?
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
                    In the Classroom Manager demo, try adding a note in one student card. 
                    Why doesn't it affect other student cards?
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
                    What if <span className="font-semibold">Swadeep</span> wanted his student card 
                    to remember whether it was expanded or collapsed between page reloads?
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
                  Understanding props vs state is the foundation of React architecture. 
                  Get this right, and everything else becomes much easier.
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
                  <li>At <span className="font-semibold">Barrackpore Tech Academy</span>, we teach: "Props are configuration, State is memory"</li>
                  <li>Proper prop/state separation reduces bugs by 60% in large applications</li>
                  <li>The React team's "Lifting State Up" pattern solves most data sharing problems</li>
                  <li>Every senior React interview tests understanding of props vs state</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">🎯 Remember from 27 Years Experience:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>When in doubt, ask: "Who owns this data?"</li>
                  <li>Props flow one way - this simplifies debugging immensely</li>
                  <li>State should be minimal - store only what truly changes</li>
                  <li>Good component design separates presentational (props) from container (state) components</li>
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
              <h4 className="font-bold mb-2">React Fundamentals Mastery</h4>
              <p className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Topic 4: Props vs State – Conceptual Differences
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className={clsx(
                "text-sm mb-2 transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Previous: <span className="font-semibold text-indigo-400">State vs Hooks Comparison</span>
              </div>
              <div className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Next: <span className="font-semibold text-cyan-400">When to Use State and When Not To</span>
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

export default Topic4;