import { useState } from 'react';
import clsx from 'clsx';

const Topic9 = () => {
  // Example 1: Correct vs Incorrect State Updates
  const [counter, setCounter] = useState(0);
  const [student, setStudent] = useState({
    name: 'Swadeep',
    age: 20,
    location: 'Barrackpore',
    grades: {
      math: 88,
      science: 92,
      english: 85
    }
  });
  const [attendanceList, setAttendanceList] = useState(['Abhronila', 'Debangshu', 'Swadeep']);
  const [updateHistory, setUpdateHistory] = useState([]);

  // Example 2: Nested Object Updates
  const [classroom, setClassroom] = useState({
    className: 'React Fundamentals',
    teacher: 'Sukanta Hui',
    students: [
      { id: 1, name: 'Tuhina', present: true },
      { id: 2, name: 'Abhronila', present: true },
      { id: 3, name: 'Debangshu', present: false }
    ],
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      time: '10:00 AM'
    }
  });

  // Example 3: Complex Array Updates
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn useState', completed: true, priority: 'high' },
    { id: 2, title: 'Understand Immutability', completed: false, priority: 'medium' },
    { id: 3, title: 'Practice State Updates', completed: false, priority: 'high' }
  ]);

  // Track correct/incorrect updates
  const addToHistory = (message, isCorrect) => {
    setUpdateHistory(prev => [
      { id: Date.now(), message, isCorrect, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4) // Keep only last 5
    ]);
  };

  // ===== INCORRECT UPDATES =====
  const incorrectPrimitiveUpdate = () => {
    try {
      // WRONG: Direct mutation
      counter = counter + 1;
      addToHistory('Direct mutation: counter = counter + 1', false);
    } catch (error) {
      addToHistory(`Error: ${error.message}`, false);
    }
  };

  const incorrectObjectUpdate = () => {
    try {
      // WRONG: Direct property mutation
      student.age = 21;
      addToHistory('Direct mutation: student.age = 21', false);
    } catch (error) {
      addToHistory('Mutation successful but React won\'t detect it', false);
    }
  };

  const incorrectArrayUpdate = () => {
    try {
      // WRONG: Direct array mutation
      attendanceList.push('New Student');
      addToHistory('Direct mutation: attendanceList.push()', false);
    } catch (error) {
      addToHistory('Mutation successful but React won\'t detect it', false);
    }
  };

  const incorrectNestedUpdate = () => {
    try {
      // WRONG: Partial update with direct mutation
      student.grades.math = 95;
      addToHistory('Direct nested mutation: student.grades.math = 95', false);
    } catch (error) {
      addToHistory('Nested mutation - React won\'t detect', false);
    }
  };

  // ===== CORRECT UPDATES =====
  const correctPrimitiveUpdate = () => {
    // CORRECT: Using setter function
    setCounter(prev => prev + 1);
    addToHistory('Correct: setCounter(prev => prev + 1)', true);
  };

  const correctObjectUpdate = () => {
    // CORRECT: Create new object with spread
    setStudent(prev => ({
      ...prev,
      age: prev.age + 1,
      location: prev.location === 'Barrackpore' ? 'Shyamnagar' : 'Barrackpore'
    }));
    addToHistory('Correct: setStudent({...prev, age: prev.age + 1})', true);
  };

  const correctArrayUpdate = () => {
    // CORRECT: Create new array
    const newStudent = `Student${attendanceList.length + 1}`;
    setAttendanceList([...attendanceList, newStudent]);
    addToHistory('Correct: setAttendanceList([...prev, newStudent])', true);
  };

  const correctNestedUpdate = () => {
    // CORRECT: Update nested object immutably
    setStudent(prev => ({
      ...prev,
      grades: {
        ...prev.grades,
        math: prev.grades.math + 5,
        science: prev.grades.science + 3
      }
    }));
    addToHistory('Correct: Nested update with spread operator', true);
  };

  const correctArrayRemove = () => {
    // CORRECT: Remove from array
    if (attendanceList.length > 0) {
      setAttendanceList(attendanceList.slice(0, -1));
      addToHistory('Correct: setAttendanceList(prev.slice(0, -1))', true);
    }
  };

  // ===== COMPLEX EXAMPLES =====
  const updateClassroomSchedule = () => {
    setClassroom(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        days: [...prev.schedule.days, 'Thu'],
        time: '11:00 AM'
      }
    }));
    addToHistory('Updated classroom schedule immutably', true);
  };

  const toggleStudentAttendance = (id) => {
    setClassroom(prev => ({
      ...prev,
      students: prev.students.map(student =>
        student.id === id
          ? { ...student, present: !student.present }
          : student
      )
    }));
    addToHistory(`Toggled student ${id} attendance with map()`, true);
  };

  const addNewTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: `New Task ${tasks.length + 1}`,
      completed: false,
      priority: 'medium'
    };
    setTasks([...tasks, newTask]);
    addToHistory('Added new task to array', true);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    addToHistory(`Toggled task ${id} completion`, true);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    addToHistory(`Deleted task ${id} with filter()`, true);
  };

  const sortTasksByPriority = () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    setTasks(prev =>
      [...prev].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    );
    addToHistory('Sorted tasks by priority', true);
  };

  // Reset all states
  const resetAll = () => {
    setCounter(0);
    setStudent({
      name: 'Swadeep',
      age: 20,
      location: 'Barrackpore',
      grades: {
        math: 88,
        science: 92,
        english: 85
      }
    });
    setAttendanceList(['Abhronila', 'Debangshu', 'Swadeep']);
    setUpdateHistory([]);
    setClassroom({
      className: 'React Fundamentals',
      teacher: 'Sukanta Hui',
      students: [
        { id: 1, name: 'Tuhina', present: true },
        { id: 2, name: 'Abhronila', present: true },
        { id: 3, name: 'Debangshu', present: false }
      ],
      schedule: {
        days: ['Mon', 'Wed', 'Fri'],
        time: '10:00 AM'
      }
    });
    setTasks([
      { id: 1, title: 'Learn useState', completed: true, priority: 'high' },
      { id: 2, title: 'Understand Immutability', completed: false, priority: 'medium' },
      { id: 3, title: 'Practice State Updates', completed: false, priority: 'high' }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500">
      <style jsx>{`
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
        
        @keyframes pulseCorrect {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
        }
        
        @keyframes pulseIncorrect {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        }
        
        @keyframes highlight {
          0% { background-color: rgba(59, 130, 246, 0.2); }
          100% { background-color: transparent; }
        }
      `}</style>

      {/* Header Section */}
      <div 
        className="max-w-6xl mx-auto mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
        style={{ animation: 'fadeSlideUp 0.8s ease-out' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
          Updating State Correctly (Immutability Principle)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Learn the fundamental principle of immutability and how to update state correctly in React
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Theory Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700
                     transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.1s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.1s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                           rounded-lg p-2 mr-3 text-xl">📘</span>
            The Immutability Principle
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">What is Immutability?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Immutability</strong> means never modifying data directly. Instead, you create 
                new copies of data with the desired changes. In React, state should be treated as immutable.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">Why Immutability?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Predictable state updates
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Performance optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Easier debugging
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Time-travel debugging support
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Component re-rendering triggers
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">The Problem with Mutation</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    React can't detect changes
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    No re-renders triggered
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Hard to track state changes
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Bugs are hard to debug
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Key Concept</h3>
              <p className="text-gray-700 dark:text-gray-300">
                React compares state references (not deep equality) to determine if re-rendering is needed. 
                If you mutate state directly, the reference stays the same, and React won't know to update.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison: Correct vs Incorrect */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⚖️</span>
            Correct vs Incorrect State Updates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Incorrect Updates */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Incorrect Updates</h3>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm">
                  Direct Mutation
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Primitive State</h4>
                  <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                    {`// WRONG: Direct assignment\ncounter = counter + 1;`}
                  </div>
                  <button
                    onClick={incorrectPrimitiveUpdate}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Try Incorrect Update
                  </button>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Object State</h4>
                  <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                    {`// WRONG: Direct property mutation\nstudent.age = 21;`}
                  </div>
                  <button
                    onClick={incorrectObjectUpdate}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Try Incorrect Update
                  </button>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Array State</h4>
                  <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                    {`// WRONG: Direct array mutation\nattendanceList.push('New Student');`}
                  </div>
                  <button
                    onClick={incorrectArrayUpdate}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Try Incorrect Update
                  </button>
                </div>
              </div>
            </div>
            
            {/* Correct Updates */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Correct Updates</h3>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                  Immutable Updates
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Primitive State</h4>
                  <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                    {`// CORRECT: Using setter function\nsetCounter(prev => prev + 1);`}
                  </div>
                  <button
                    onClick={correctPrimitiveUpdate}
                    className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg
                             transition-all duration-300 hover:scale-[1.02]
                             motion-safe:animate-[pulseCorrect_2s_ease-in-out_infinite]"
                  >
                    Try Correct Update
                  </button>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Object State</h4>
                  <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                    {`// CORRECT: Create new object\nsetStudent(prev => ({\n  ...prev,\n  age: prev.age + 1\n}));`}
                  </div>
                  <button
                    onClick={correctObjectUpdate}
                    className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Try Correct Update
                  </button>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Array State</h4>
                  <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                    {`// CORRECT: Create new array\nsetAttendanceList([\n  ...prev,\n  'New Student'\n]);`}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button
                      onClick={correctArrayUpdate}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg
                               transition-all duration-300"
                    >
                      Add Student
                    </button>
                    <button
                      onClick={correctArrayRemove}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg
                               transition-all duration-300"
                    >
                      Remove Last
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Current State Display */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Counter</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{counter}</div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Student Age</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{student.age}</div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Attendance Count</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{attendanceList.length}</div>
            </div>
          </div>
        </div>

        {/* Nested Object Updates */}
        <div 
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🧩</span>
            Nested Object Updates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">The Challenge</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Nested Object Structure</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div>student: {'{'}</div>
                    <div className="ml-4">name: 'Swadeep',</div>
                    <div className="ml-4">grades: {'{'}</div>
                    <div className="ml-8">math: 88,</div>
                    <div className="ml-8">science: 92,</div>
                    <div className="ml-8">english: 85</div>
                    <div className="ml-4">{'}'}</div>
                    <div>{'}'}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Incorrect Nested Update</h4>
                  <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                    {`// WRONG: Only spreads top level\nsetStudent({\n  ...student,\n  grades: { math: 95 }\n});\n// Loses science and english grades!`}
                  </div>
                  <button
                    onClick={incorrectNestedUpdate}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Try Incorrect Nested Update
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Correct Solution</h3>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Correct Nested Update</h4>
                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                  {`// CORRECT: Spread at each level\nsetStudent(prev => ({\n  ...prev,\n  grades: {\n    ...prev.grades,  // Preserve other grades\n    math: prev.grades.math + 5\n  }\n}));`}
                </div>
                <button
                  onClick={correctNestedUpdate}
                  className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Try Correct Nested Update
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Current Student Grades</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                    <div className="text-xs text-gray-500">Math</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{student.grades.math}</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded">
                    <div className="text-xs text-gray-500">Science</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{student.grades.science}</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded">
                    <div className="text-xs text-gray-500">English</div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{student.grades.english}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complex State Management */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🏫</span>
            Complex State: Classroom Management
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Classroom State</h3>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Class Details</div>
                  <div className="text-xl font-bold text-gray-800 dark:text-white">{classroom.className}</div>
                  <div className="text-gray-600 dark:text-gray-400">Teacher: {classroom.teacher}</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Schedule</div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="font-medium">Days: {classroom.schedule.days.join(', ')}</div>
                      <div className="text-sm text-gray-500">Time: {classroom.schedule.time}</div>
                    </div>
                    <button
                      onClick={updateClassroomSchedule}
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg
                               transition-all duration-300 hover:scale-105"
                    >
                      Update
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Students</div>
                  <div className="space-y-2">
                    {classroom.students.map(student => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700
                                 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-300"
                      >
                        <div className="flex items-center">
                          <div className={clsx(
                            "w-3 h-3 rounded-full mr-3",
                            student.present ? "bg-green-500" : "bg-red-500"
                          )} />
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <button
                          onClick={() => toggleStudentAttendance(student.id)}
                          className={clsx(
                            "px-3 py-1 rounded text-sm transition-all duration-300",
                            student.present
                              ? "bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300"
                              : "bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300"
                          )}
                        >
                          {student.present ? 'Mark Absent' : 'Mark Present'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Update Code Examples</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Update Nested Schedule</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div>setClassroom(prev =&gt; ({"{"}</div>
                    <div className="ml-4">...prev,</div>
                    <div className="ml-4">schedule: {"{"}</div>
                    <div className="ml-8">...prev.schedule,</div>
                    <div className="ml-8">days: [...prev.schedule.days, 'Thu'],</div>
                    <div className="ml-8">time: '11:00 AM'</div>
                    <div className="ml-4">{"}"}</div>
                    <div>{"}));"}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Toggle Student Attendance</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div>setClassroom(prev =&gt; ({"{"}</div>
                    <div className="ml-4">...prev,</div>
                    <div className="ml-4">students: prev.students.map(student =&gt;</div>
                    <div className="ml-8">student.id === id</div>
                    <div className="ml-12">? {"{"} ...student, present: !student.present {"}"}</div>
                    <div className="ml-8">: student</div>
                    <div className="ml-4">)</div>
                    <div>{"}));"}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Key Pattern</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    For arrays of objects, use <code className="bg-gray-100 dark:bg-gray-700 px-1">map()</code> to 
                    create a new array with updated objects. Spread operator at each level preserves unchanged data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Array Operations Guide */}
        <div 
          className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-teal-100 dark:border-teal-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📝</span>
            Array Operations with Immutability
          </h2>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Task Manager</h3>
              <div className="flex space-x-2">
                <button
                  onClick={addNewTask}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg
                           transition-all duration-300 hover:scale-105"
                >
                  Add Task
                </button>
                <button
                  onClick={sortTasksByPriority}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg
                           transition-all duration-300 hover:scale-105"
                >
                  Sort by Priority
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={clsx(
                    "flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
                    task.completed
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="w-5 h-5 mr-3 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <div className={clsx(
                        "font-medium",
                        task.completed && "line-through text-gray-500 dark:text-gray-400"
                      )}>
                        {task.title}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className={clsx(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          task.priority === 'high' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                          task.priority === 'medium' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                          task.priority === 'low' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        )}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          ID: {task.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 
                             dark:hover:bg-red-900/50 dark:text-red-300 rounded text-sm
                             transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Adding Items</h4>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                {`setTasks([...tasks, newTask]);`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Create new array with spread operator
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Updating Items</h4>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                {`setTasks(tasks.map(task =>\n  task.id === id\n    ? {...task, completed: true}\n    : task\n));`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Use map() to create new array with updated item
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Removing Items</h4>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                {`setTasks(tasks.filter(task => task.id !== id));`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Use filter() to exclude item
              </p>
            </div>
          </div>
        </div>

        {/* Update History */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-gray-500 to-gray-700 text-white 
                           rounded-lg p-2 mr-3 text-xl">📋</span>
            Update History
          </h2>
          
          <div className="space-y-3">
            {updateHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No updates yet. Try clicking the buttons above!
              </div>
            ) : (
              updateHistory.map(item => (
                <div
                  key={item.id}
                  className={clsx(
                    "flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
                    item.isCorrect
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  )}
                >
                  <div className="flex items-center">
                    <div className={clsx(
                      "w-3 h-3 rounded-full mr-3",
                      item.isCorrect ? "bg-green-500" : "bg-red-500"
                    )} />
                    <div>
                      <div className="font-medium">{item.message}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.timestamp}
                      </div>
                    </div>
                  </div>
                  <span className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    item.isCorrect
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  )}>
                    {item.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Common Pitfalls */}
        <div 
          className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-red-100 dark:border-red-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.7s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🚫</span>
            Common Pitfalls & Anti-Patterns
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Shallow Copy Trap</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`const newObj = { ...oldObj };\nnewObj.nested.prop = 'changed'; // Still mutates!`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Spread operator only creates shallow copies. Nested objects still share references.
                </p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Array Mutation Methods</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`// These MUTATE the original array:\n.push() .pop() .shift() .unshift()\n.splice() .sort() .reverse()`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Use immutable alternatives or create copies first.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Performance Concerns</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Creating new objects/arrays for every update might seem inefficient, but:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                  <li>• JavaScript engines optimize object creation</li>
                  <li>• React's re-render optimization relies on immutability</li>
                  <li>• Shallow comparison is much faster than deep comparison</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">When to Deep Clone</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For deeply nested structures, consider libraries like <code>immer</code> or 
                  <code>lodash.cloneDeep</code>. But for most cases, careful spreading works.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-emerald-100 dark:border-emerald-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.8s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 
                           rounded-lg p-2 mr-3 text-xl">🏆</span>
            Best Practices & Patterns
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">1.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Always Spread</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use spread operator for objects and arrays
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">2.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Nested Updates</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Spread at each level for nested structures
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">3.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Array Methods</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use map, filter, concat, slice
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">4.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Functional Updates</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use updater functions for sequential updates
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Immutability Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Never mutate state directly
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Always create new objects/arrays for updates
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Use spread operator for shallow copies
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Spread at each level for nested updates
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Use map/filter for array updates
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Consider functional updates for sequential changes
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.9s_both]
                     motion-safe:animate-[pulseCorrect_3s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.9s both' }}
        >
          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 
                          rounded-full p-3 mr-4 text-2xl">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Teacher's Note</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Sukanta Hui • 27 years experience • sukantahui@codernaccotax.co.in
              </div>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Remember:</strong> Immutability is like writing on a whiteboard in a classroom. 
                  When Swadeep from Barrackpore makes a mistake, he doesn't try to erase and rewrite 
                  in the same space—he takes a new whiteboard marker and writes the corrected version. 
                  React works the same way with state updates.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Think in snapshots:</strong> Each state update creates a new snapshot of your data
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Use ESLint rules:</strong> Enable rules that prevent direct state mutation
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Consider Immer:</strong> For complex nested updates, the Immer library can help
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Practice patterns:</strong> The spread operator pattern becomes second nature
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "When Tuhina from Shyamnagar keeps student records, she never modifies the original 
                  register. She creates new entries. This is exactly how React state should be updated. 
                  Remember: mutate and you'll frustrate, create new and you'll get through!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_1s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 1s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 
                           rounded-lg p-2 mr-3 text-xl">💡</span>
            Thinking Exercises
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Think about...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Why does React need immutability? What would happen if React used deep comparison 
                instead of reference comparison?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Try the incorrect updates and see what happens. Do they work at all? 
                Why or why not?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try implementing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Add a "Move Task Up" button that reorders tasks immutably. 
                Hint: You'll need to swap array elements without mutating.
              </p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetAll}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 
                     text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl
                     transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Reset All Examples
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Next: Understand Why State Updates Are Asynchronous
        </p>
      </div>
    </div>
  );
};

export default Topic9;