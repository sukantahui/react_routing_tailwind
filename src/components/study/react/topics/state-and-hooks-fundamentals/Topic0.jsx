import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic0 = () => {
  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // State for interactive examples
  const [counter, setCounter] = useState(0);
  const [studentAttendance, setStudentAttendance] = useState({
    Swadeep: true,
    Tuhina: false,
    Abhronila: true,
    Debangshu: true
  });
  const [temperature, setTemperature] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate API call for attendance data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Toggle student attendance
  const toggleAttendance = (studentName) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentName]: !prev[studentName]
    }));
  };

  // Increase temperature
  const increaseTemp = () => {
    setTemperature(prev => prev + 1);
  };

  // Decrease temperature
  const decreaseTemp = () => {
    setTemperature(prev => prev - 1);
  };

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900"
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
                React State Fundamentals
              </h1>
              <p className={clsx(
                "mt-1 text-sm transition-all duration-500",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Topic 0: Understanding State in React
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
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
        {/* Hero Section with Animation */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 mb-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-r from-gray-800 to-gray-700 shadow-2xl" 
              : "bg-gradient-to-r from-white to-blue-50 shadow-xl"
          )}>
            <h2 className="text-4xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
              What is State in React? 🤔
            </h2>
            <p className={clsx(
              "text-lg mb-6 leading-relaxed transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              State represents the <span className="font-bold text-blue-400">memory of a component</span> - it's the data that changes over time and causes the component to re-render. Think of it as a component's personal diary that remembers everything happening to it.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* State Analogy Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-blue-500 animate-[slideUp_1.2s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-blue-50"
              )}>
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-3">Real-world Analogy</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Like a student's attendance register at <span className="font-semibold text-teal-400">Coder & AccoTax</span> - it remembers who's present and who's absent each day.
                </p>
              </div>

              {/* Key Feature Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-green-500 animate-[slideUp_1.4s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-green-50"
              )}>
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold mb-3">Core Behavior</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  When state changes, React automatically re-renders the component to reflect the new data.
                </p>
              </div>

              {/* Type Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-purple-500 animate-[slideUp_1.6s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-purple-50"
              )}>
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-xl font-bold mb-3">Local & Private</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  State is encapsulated within a component - like a student's personal notebook at <span className="font-semibold text-purple-400">Naihati College</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Example Section */}
        <section className="mb-16 animate-[slideUp_1s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Interactive Examples 🎮
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Example 1: Counter */}
            <div className={clsx(
              "rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-blue-50"
            )}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">🧮</span> Simple Counter
              </h3>
              <p className={clsx(
                "mb-6 transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                The most basic state example. Each click increments the counter.
              </p>
              
              <div className="flex flex-col items-center justify-center p-8">
                <div className={clsx(
                  "text-7xl font-bold mb-8 transition-all duration-300",
                  "animate-[bounce_2s_ease-in-out_infinite]",
                  isDarkMode ? "text-blue-300" : "text-blue-600"
                )}>
                  {counter}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCounter(counter + 1)}
                    className={clsx(
                      "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                      "transform hover:scale-110 hover:-translate-y-1",
                      isDarkMode 
                        ? "bg-blue-600 hover:bg-blue-500 text-white" 
                        : "bg-blue-500 hover:bg-blue-400 text-white"
                    )}
                  >
                    Increment (+)
                  </button>
                  <button
                    onClick={() => setCounter(0)}
                    className={clsx(
                      "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                      "transform hover:scale-110 hover:-translate-y-1",
                      isDarkMode 
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    )}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Example 2: Student Attendance */}
            <div className={clsx(
              "rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-blue-50"
            )}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">👨‍🎓</span> Classroom Attendance
              </h3>
              <p className={clsx(
                "mb-6 transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Track students' attendance at <span className="font-semibold text-teal-400">Shyamnagar School</span>. State remembers who's present.
              </p>
              
              <div className="space-y-4">
                {Object.entries(studentAttendance).map(([student, isPresent], index) => (
                  <div
                    key={student}
                    className={clsx(
                      "flex items-center justify-between p-4 rounded-xl transition-all duration-300",
                      "animate-[slideUp_0.5s_ease-out]",
                      "hover:scale-[1.02] transform-gpu",
                      isDarkMode 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        "w-3 h-3 rounded-full transition-all duration-300",
                        isPresent 
                          ? "bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" 
                          : "bg-red-500"
                      )} />
                      <span className={clsx(
                        "font-medium transition-colors duration-500",
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      )}>
                        {student}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleAttendance(student)}
                      className={clsx(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        "hover:scale-105",
                        isPresent 
                          ? isDarkMode 
                            ? "bg-green-900/30 hover:bg-green-900/50 text-green-400" 
                            : "bg-green-100 hover:bg-green-200 text-green-700"
                          : isDarkMode 
                            ? "bg-red-900/30 hover:bg-red-900/50 text-red-400" 
                            : "bg-red-100 hover:bg-red-200 text-red-700"
                      )}
                    >
                      {isPresent ? 'Present ✅' : 'Absent ❌'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Visual Explanation Section */}
        <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Visualizing State Flow 🔄
          </h2>
          
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-blue-50"
          )}>
            {/* SVG Animation */}
            <div className="relative mb-8 overflow-hidden rounded-xl">
              <svg 
                viewBox="0 0 800 300" 
                className="w-full h-auto"
              >
                {/* Component Box */}
                <rect 
                  x="50" 
                  y="50" 
                  width="300" 
                  height="200" 
                  rx="15"
                  className={clsx(
                    "transition-all duration-500",
                    isDarkMode 
                      ? "fill-gray-700 stroke-gray-600" 
                      : "fill-white stroke-gray-300"
                  )}
                  strokeWidth="2"
                />
                
                {/* State Label */}
                <text 
                  x="200" 
                  y="90" 
                  textAnchor="middle"
                  className={clsx(
                    "text-2xl font-bold transition-colors duration-500",
                    isDarkMode ? "fill-blue-300" : "fill-blue-600"
                  )}
                >
                  React Component
                </text>
                
                {/* State Memory */}
                <rect 
                  x="100" 
                  y="120" 
                  width="200" 
                  height="40" 
                  rx="8"
                  className={clsx(
                    "transition-all duration-500",
                    isDarkMode 
                      ? "fill-blue-900/30 stroke-blue-500" 
                      : "fill-blue-100 stroke-blue-400"
                  )}
                  strokeWidth="2"
                >
                  <animate
                    attributeName="fill"
                    values={
                      isDarkMode 
                        ? "#1e3a8a30;#1e40af30;#1e3a8a30" 
                        : "#dbeafe;#93c5fd;#dbeafe"
                    }
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
                
                <text 
                  x="200" 
                  y="145" 
                  textAnchor="middle"
                  className={clsx(
                    "font-semibold transition-colors duration-500",
                    isDarkMode ? "fill-blue-300" : "fill-blue-700"
                  )}
                >
                  State Memory
                </text>
                
                {/* Update Arrow */}
                <path 
                  d="M380,140 L450,140 L450,190 L550,190" 
                  fill="none"
                  className={clsx(
                    "transition-all duration-500",
                    isDarkMode ? "stroke-green-400" : "stroke-green-500"
                  )}
                  strokeWidth="3"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
                
                <polygon 
                  points="550,190 540,185 540,195" 
                  className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "fill-green-400" : "fill-green-500"
                  )}
                />
                
                {/* Updated Component */}
                <rect 
                  x="570" 
                  y="50" 
                  width="300" 
                  height="200" 
                  rx="15"
                  className={clsx(
                    "transition-all duration-500",
                    isDarkMode 
                      ? "fill-gray-700 stroke-gray-600" 
                      : "fill-white stroke-gray-300"
                  )}
                  strokeWidth="2"
                />
                
                <text 
                  x="720" 
                  y="90" 
                  textAnchor="middle"
                  className={clsx(
                    "text-2xl font-bold transition-colors duration-500",
                    isDarkMode ? "fill-green-300" : "fill-green-600"
                  )}
                >
                  Updated Component
                </text>
                
                {/* Updated State */}
                <rect 
                  x="620" 
                  y="120" 
                  width="200" 
                  height="40" 
                  rx="8"
                  className={clsx(
                    "transition-all duration-500",
                    isDarkMode 
                      ? "fill-green-900/30 stroke-green-500" 
                      : "fill-green-100 stroke-green-400"
                  )}
                  strokeWidth="2"
                >
                  <animate
                    attributeName="fill"
                    values={
                      isDarkMode 
                        ? "#14532d30;#15803d30;#14532d30" 
                        : "#dcfce7;#86efac;#dcfce7"
                    }
                    dur="3s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </rect>
                
                <text 
                  x="720" 
                  y="145" 
                  textAnchor="middle"
                  className={clsx(
                    "font-semibold transition-colors duration-500",
                    isDarkMode ? "fill-green-300" : "fill-green-700"
                  )}
                >
                  Updated State
                </text>
              </svg>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl mb-2">1️⃣</div>
                <h4 className="font-bold mb-2">Initial State</h4>
                <p className={clsx(
                  "text-sm transition-colors duration-500",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Component loads with initial state values
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">2️⃣</div>
                <h4 className="font-bold mb-2">State Update</h4>
                <p className={clsx(
                  "text-sm transition-colors duration-500",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Event triggers state change
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">3️⃣</div>
                <h4 className="font-bold mb-2">Re-render</h4>
                <p className={clsx(
                  "text-sm transition-colors duration-500",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  React automatically updates UI
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Temperature Control Example */}
        <section className="mb-16 animate-[slideUp_1.4s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-blue-50"
          )}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🌡️</span> Classroom Temperature Control
            </h3>
            <p className={clsx(
              "mb-8 transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Imagine controlling AC temperature at <span className="font-semibold text-orange-400">CNAT Institute</span>. The temperature state determines what shows on the display.
            </p>
            
            <div className="flex flex-col items-center">
              <div className={clsx(
                "w-64 h-64 rounded-full flex items-center justify-center mb-8",
                "transition-all duration-500 border-8",
                temperature > 28 
                  ? isDarkMode 
                    ? "bg-red-900/20 border-red-500" 
                    : "bg-red-100 border-red-300"
                  : temperature < 22 
                    ? isDarkMode 
                      ? "bg-blue-900/20 border-blue-500" 
                      : "bg-blue-100 border-blue-300"
                    : isDarkMode 
                      ? "bg-green-900/20 border-green-500" 
                      : "bg-green-100 border-green-300"
              )}>
                <div className="text-center">
                  <div className={clsx(
                    "text-6xl font-bold mb-2 transition-colors duration-500",
                    temperature > 28 
                      ? "text-red-400" 
                      : temperature < 22 
                        ? "text-blue-400" 
                        : "text-green-400"
                  )}>
                    {temperature}°C
                  </div>
                  <div className={clsx(
                    "text-lg font-medium transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    {temperature > 28 ? 'Too Hot! 🔥' : temperature < 22 ? 'Too Cold! ❄️' : 'Perfect! 👍'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-6">
                <button
                  onClick={decreaseTemp}
                  className={clsx(
                    "px-8 py-4 rounded-full text-2xl transition-all duration-300",
                    "transform hover:scale-110 hover:-translate-y-1",
                    isDarkMode 
                      ? "bg-blue-700 hover:bg-blue-600 text-white" 
                      : "bg-blue-500 hover:bg-blue-400 text-white"
                  )}
                >
                  -
                </button>
                <button
                  onClick={() => setTemperature(25)}
                  className={clsx(
                    "px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300",
                    "transform hover:scale-105 hover:-translate-y-1",
                    isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  )}
                >
                  Reset to 25°C
                </button>
                <button
                  onClick={increaseTemp}
                  className={clsx(
                    "px-8 py-4 rounded-full text-2xl transition-all duration-300",
                    "transform hover:scale-110 hover:-translate-y-1",
                    isDarkMode 
                      ? "bg-red-700 hover:bg-red-600 text-white" 
                      : "bg-red-500 hover:bg-red-400 text-white"
                  )}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-16 animate-[slideUp_1.6s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Key Concepts 🗝️
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className={clsx(
              "p-6 rounded-xl border-l-4 border-blue-500 transition-all duration-500",
              "hover:scale-[1.02] transform-gpu",
              isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-800" 
                : "bg-white hover:bg-blue-50"
            )}>
              <h4 className="text-xl font-bold mb-3 text-blue-400">State is Mutable</h4>
              <p className={clsx(
                "transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Unlike props, state can be changed within the component using <code className="px-2 py-1 rounded bg-gray-800 text-blue-300">setState</code> function.
              </p>
            </div>
            
            <div className={clsx(
              "p-6 rounded-xl border-l-4 border-green-500 transition-all duration-500",
              "hover:scale-[1.02] transform-gpu",
              isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-800" 
                : "bg-white hover:bg-green-50"
            )}>
              <h4 className="text-xl font-bold mb-3 text-green-400">Triggers Re-render</h4>
              <p className={clsx(
                "transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Every state change tells React to re-render the component and update the UI.
              </p>
            </div>
            
            <div className={clsx(
              "p-6 rounded-xl border-l-4 border-purple-500 transition-all duration-500",
              "hover:scale-[1.02] transform-gpu",
              isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-800" 
                : "bg-white hover:bg-purple-50"
            )}>
              <h4 className="text-xl font-bold mb-3 text-purple-400">Local Scope</h4>
              <p className={clsx(
                "transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                State is private to its component - like <span className="font-semibold">Abhronila</span>'s personal notes in class.
              </p>
            </div>
            
            <div className={clsx(
              "p-6 rounded-xl border-l-4 border-yellow-500 transition-all duration-500",
              "hover:scale-[1.02] transform-gpu",
              isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-800" 
                : "bg-white hover:bg-yellow-50"
            )}>
              <h4 className="text-xl font-bold mb-3 text-yellow-400">Asynchronous Updates</h4>
              <p className={clsx(
                "transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                State updates may be batched - immediate reading might not show latest value.
              </p>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-16 animate-[slideUp_1.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-800/30" 
              : "bg-gradient-to-br from-red-50 to-orange-50 border border-red-200"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-red-400">⚠️ Common Pitfalls</h3>
            
            <div className="space-y-6">
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Direct Mutation ❌</h4>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Never modify state directly: <code className="px-2 py-1 rounded bg-gray-800 text-red-300">state.count = 5</code> (Wrong!)
                </p>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Async Confusion ⏳</h4>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <code className="px-2 py-1 rounded bg-gray-800 text-red-300">console.log(state)</code> right after setState might show old value.
                </p>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Too Much State 📦</h4>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Don't store computed values in state - calculate them during render instead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16 animate-[slideUp_2s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-800/30" 
              : "bg-gradient-to-br from-green-50 to-teal-50 border border-green-200"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-green-400">✅ Best Practices</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold mb-2">Keep State Minimal</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Only store what changes and can't be computed from other state/props.
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
                    <h4 className="font-bold mb-2">Lift State Up</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      When multiple components need same state, move it to their closest common ancestor.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-bold mb-2">Use Descriptive Names</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Name state variables like <code className="px-1 rounded bg-gray-800 text-green-300">userProfile</code> not <code className="px-1 rounded bg-gray-800 text-red-300">data</code>.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🧹</div>
                  <div>
                    <h4 className="font-bold mb-2">Initialize Properly</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Always provide meaningful initial state, even if it's <code className="px-1 rounded bg-gray-800 text-green-300">null</code> or empty arrays/objects.
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
              : "bg-gradient-to-r from-blue-50 to-cyan-50"
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
                    How would you track attendance for <span className="font-semibold">Debangshu</span> if he moves between classes at <span className="font-semibold">Barrackpore High School</span>?
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
                    Watch how the temperature display changes immediately when you click the buttons. That's state in action!
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
                    What if <span className="font-semibold">Tuhina</span> could mark her own attendance? How would state help manage that?
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
                  Remember: State is like a component's memory - it remembers what happened and updates accordingly.
                </p>
              </div>
            </div>
            
            <div className={clsx(
              "p-6 rounded-xl transition-all duration-500",
              isDarkMode ? "bg-gray-800/50" : "bg-white/50"
            )}>
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">💡 Tips & Tricks:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Always use the setter function - never modify state directly</li>
                  <li>Think of state as "what can change" in your component</li>
                  <li>For complex state, consider using <code className="px-1 rounded bg-gray-800 text-purple-300">useReducer</code> (we'll cover this later)</li>
                  <li>State updates are asynchronous - plan accordingly</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">🎯 Remember:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>State is private to each component instance</li>
                  <li>Each state variable should represent one concern</li>
                  <li>Initial state is set only once when component mounts</li>
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
              <h4 className="font-bold mb-2">React State Mastery</h4>
              <p className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Topic 0: What is State in React
              </p>
            </div>
            <div className={clsx(
              "text-sm transition-colors duration-500",
              isDarkMode ? "text-gray-500" : "text-gray-600"
            )}>
              Next: <span className="font-semibold text-blue-400">What are Hooks in React</span>
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

export default Topic0;