import { useState } from 'react';
import clsx from 'clsx';

const Topic7 = () => {
  // Example 1: Primitive state values
  const [score, setScore] = useState(95);
  const [studentName, setStudentName] = useState('Swadeep');
  const [isPresent, setIsPresent] = useState(true);
  
  // Example 2: Object state
  const [student, setStudent] = useState({
    name: 'Tuhina',
    age: 21,
    location: 'Shyamnagar',
    grades: {
      math: 88,
      science: 92,
      english: 85
    }
  });
  
  // Example 3: Array state
  const [attendanceList, setAttendanceList] = useState(['Abhronila', 'Debangshu', 'Swadeep']);
  const [marks, setMarks] = useState([75, 82, 90, 67, 88]);

  const updateScore = () => {
    setScore(prev => prev + 5);
  };

  const toggleAttendance = () => {
    setIsPresent(!isPresent);
  };

  const updateStudentLocation = () => {
    setStudent(prev => ({
      ...prev,
      location: prev.location === 'Shyamnagar' ? 'Ichapur' : 'Shyamnagar',
      age: prev.age + 1
    }));
  };

  const addStudentToAttendance = () => {
    const newStudent = `Student${attendanceList.length + 1}`;
    setAttendanceList([...attendanceList, newStudent]);
  };

  const updateMathGrade = () => {
    setStudent(prev => ({
      ...prev,
      grades: {
        ...prev.grades,
        math: prev.grades.math + 2
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500">
      <style jsx="true">{`
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
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        }
        
        @keyframes highlightCode {
          0% { background-color: rgba(34, 197, 94, 0.2); }
          100% { background-color: transparent; }
        }
      `}</style>

      {/* Header Section */}
      <div 
        className="max-w-6xl mx-auto mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
        style={{ animation: 'fadeSlideUp 0.8s ease-out' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
          Declaring and Reading State Values
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Learn how to properly declare state variables and read their values in React components
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
            Conceptual Foundation
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              <strong>State declaration</strong> is the process of creating state variables in a React component 
              using the <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useState</code> hook. 
              <strong> Reading state</strong> is how you access and use these values in your component's render logic.
            </p>
            
            <div className="grid md:grid-cols-1 gap-6 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Declaration Syntax</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Array destructuring pattern
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    First element: current value
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Second element: updater function
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Initial value passed to useState()
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Reading State</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Use the variable directly
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Access nested properties with dot notation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Can be used in JSX, calculations, or effects
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Always reactive - updates trigger re-render
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* State Declaration Visual Guide */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🔧</span>
            State Declaration Patterns
          </h2>
          
          <div className="grid md:grid-cols-1 gap-6">
            {/* Primitive State */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700
                          hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <h3 className="font-bold text-gray-800 dark:text-white">Primitive Values</h3>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const [score, setScore] 
  = useState(95);

const [studentName, 
  setStudentName] 
  = useState('Swadeep');

const [isPresent, 
  setIsPresent] 
  = useState(true);`}
              </pre>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Numbers, strings, booleans - simple values
              </div>
            </div>
            
            {/* Object State */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700
                          hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <h3 className="font-bold text-gray-800 dark:text-white">Object State</h3>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const [student, setStudent] 
  = useState({
    name: 'Tuhina',
    age: 21,
    location: 'Shyamnagar',
    grades: {
      math: 88,
      science: 92
    }
  });`}
              </pre>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Group related data together
              </div>
            </div>
            
            {/* Array State */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700
                          hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <h3 className="font-bold text-gray-800 dark:text-white">Array State</h3>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const [attendanceList, 
  setAttendanceList] 
  = useState([
    'Abhronila', 
    'Debangshu'
  ]);

const [marks, setMarks] 
  = useState([
    75, 82, 90
  ]);`}
              </pre>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Lists, collections, multiple items
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:border-green-200 dark:hover:border-green-700
                     transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 
                           rounded-lg p-2 mr-3 text-xl">💻</span>
            Interactive Examples
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Primitive State Example */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Primitive State Values</h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Current Score</div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{score}</div>
                </div>
                
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <div className="text-sm text-green-700 dark:text-green-300 mb-1">Student Name</div>
                  <div className="text-xl font-semibold text-gray-800 dark:text-white">{studentName}</div>
                </div>
                
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <div className="text-sm text-yellow-700 dark:text-yellow-300 mb-1">Attendance Status</div>
                  <div className={`text-xl font-semibold ${isPresent ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isPresent ? 'Present ✓' : 'Absent ✗'}
                  </div>
                </div>
              </div>
              
              <button
                onClick={updateScore}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Increase Score by 5
              </button>
              <button
                onClick={toggleAttendance}
                className="w-full mt-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                         text-gray-800 dark:text-white py-3 rounded-lg font-medium
                         transition-all duration-300"
              >
                Toggle Attendance Status
              </button>
            </div>
            
            {/* Object State Example */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Object State Values</h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Student Object</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Name:</span>
                      <span className="font-semibold">{student.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Age:</span>
                      <span className="font-semibold">{student.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Location:</span>
                      <span className="font-semibold">{student.location}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-700">
                      <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Grades:</div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Math</div>
                          <div className="font-bold">{student.grades.math}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Science</div>
                          <div className="font-bold">{student.grades.science}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">English</div>
                          <div className="font-bold">{student.grades.english}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={updateStudentLocation}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02]"
              >
                Update Location & Age
              </button>
              <button
                onClick={updateMathGrade}
                className="w-full mt-3 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300"
              >
                Improve Math Grade
              </button>
            </div>
          </div>
          
          {/* Array State Example */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Array State Values</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Attendance List</div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  {attendanceList.map((student, index) => (
                    <div 
                      key={index}
                      className="flex items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 
                                     text-blue-600 dark:text-blue-300 rounded-full text-sm mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-800 dark:text-white">{student}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Student Marks</div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-5 gap-2">
                    {marks.map((mark, index) => (
                      <div 
                        key={index}
                        className={clsx(
                          "p-3 rounded-lg text-center transition-all duration-300",
                          mark >= 85 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                          mark >= 75 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" :
                          "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                        )}
                      >
                        <div className="text-xs opacity-75">Test {index + 1}</div>
                        <div className="font-bold text-lg">{mark}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={addStudentToAttendance}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 
                       hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium
                       transition-all duration-300 hover:scale-[1.02]"
            >
              Add New Student to Attendance
            </button>
          </div>
        </div>

        {/* How to Read State Section */}
        <div 
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 dark:border-green-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 
                           rounded-lg p-2 mr-3 text-xl">👁️</span>
            How to Read State Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">Correct Ways</h3>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Primitive State</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`const value = score; // Direct access`}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Object Properties</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`const name = student.name; // Dot notation`}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nested Properties</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`const mathGrade = student.grades.math;`}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Array Elements</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`const firstMark = marks[0]; // Array index`}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">In JSX Rendering</h3>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Direct Display</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`<div>Score: {score}</div>`}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Conditional Rendering</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`{isPresent && <span>Present</span>}`}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">In Calculations</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`const average = marks.reduce((a,b)=>a+b,0)/marks.length;`}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">As Props</div>
                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {`<StudentCard name={studentName} score={score} />`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:border-red-200 dark:hover:border-red-700
                     transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 
                           rounded-lg p-2 mr-3 text-xl">⚠️</span>
            Common Pitfalls & Mistakes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Direct Mutation</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Never modify state directly - it won't trigger re-renders
                </p>
                <div className="font-mono text-xs bg-gray-800 text-red-300 p-2 rounded">
                  {`// WRONG ❌\nstudent.age = 22;\nattendanceList.push('NewStudent');`}
                </div>
                <div className="font-mono text-xs bg-gray-800 text-green-300 p-2 rounded mt-2">
                  {`// CORRECT ✓\nsetStudent({...student, age: 22});\nsetAttendanceList([...attendanceList, 'NewStudent']);`}
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Async State Reading</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  State updates are asynchronous - don't read immediately after setting
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Nested State Issues</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Deeply nested objects require careful updating
                </p>
                <div className="font-mono text-xs bg-gray-800 text-red-300 p-2 rounded">
                  {`// Partial update (WRONG ❌)\nsetStudent({\n  grades: { math: 95 }\n});`}
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Naming Confusion</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Use descriptive names: [value, setValue] pattern helps readability
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-emerald-100 dark:border-emerald-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 
                           rounded-lg p-2 mr-3 text-xl">🏆</span>
            Best Practices
          </h2>
          
          <div className="grid md:grid-cols-1 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">1.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Descriptive Names</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use [noun, setNoun] pattern: [user, setUser], [score, setScore]
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">2.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Group Related Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use objects for related properties instead of multiple state variables
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">3.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Initialize Properly</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Always provide meaningful initial values matching the expected data type
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Quick Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Used array destructuring [value, setValue]
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Provided initial value in useState()
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Used descriptive, meaningful names
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Reading state with dot notation for objects
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Never directly modifying state
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]
                     motion-safe:animate-[pulseGlow_2s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.7s both' }}
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
                  <strong>Remember:</strong> State is like a student's memory in a classroom. When Swadeep 
                  from Barrackpore learns something new, his memory updates. Similarly, when state changes, 
                  your component "remembers" the new value and re-renders accordingly.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Think of state variables as "live values" that React watches
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Always use the setter function - never modify the variable directly
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      For complex state, consider using useReducer instead of useState
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Keep state as minimal as possible - derive values when you can
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "Just like how Tuhina from Shyamnagar keeps track of her daily attendance, 
                  React components keep track of their state. The key is understanding that 
                  state is reactive - when it changes, everything that depends on it updates automatically."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.8s both' }}
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
                What happens if you declare state but never use the setter function? 
                Is the state still useful?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                When you click "Update Location & Age", notice how both properties update 
                simultaneously. This demonstrates atomic state updates.
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try changing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                In the object state example, try accessing a property that doesn't exist, 
                like <code className="bg-gray-100 dark:bg-gray-700 px-1">student.address</code>. 
                What value do you get?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Next: Learn about State Initialization with different data types
        </p>
      </div>
    </div>
  );
};

export default Topic7;