import { useState } from 'react';
import clsx from 'clsx';

const Topic8 = () => {
  // Example 1: Primitive state initialization
  const [score, setScore] = useState(95); // Number initialization
  const [studentName, setStudentName] = useState('Swadeep'); // String initialization
  const [isPresent, setIsPresent] = useState(true); // Boolean initialization
  const [undefinedValue, setUndefinedValue] = useState(); // Undefined initialization (not recommended)
  const [nullValue, setNullValue] = useState(null); // Null initialization
  
  // Example 2: Object state initialization
  const [student, setStudent] = useState({
    name: 'Tuhina',
    age: 21,
    location: 'Shyamnagar',
    grades: {
      math: 88,
      science: 92,
      english: 85
    },
    isActive: true
  });
  
  // Example 3: Array state initialization
  const [attendanceList, setAttendanceList] = useState(['Abhronila', 'Debangshu', 'Swadeep']);
  const [marks, setMarks] = useState([75, 82, 90, 67, 88]);
  const [emptyArray, setEmptyArray] = useState([]); // Empty array
  const [nestedArray, setNestedArray] = useState([[1, 2], [3, 4]]); // Nested arrays
  
  // Example 4: Complex initialization (function as initial state)
  const [computedInitial, setComputedInitial] = useState(() => {
    // Complex computation for initial value
    const initialMarks = [85, 90, 78, 92, 88];
    const average = initialMarks.reduce((a, b) => a + b, 0) / initialMarks.length;
    return {
      marks: initialMarks,
      average: average,
      performance: average >= 85 ? 'Excellent' : average >= 75 ? 'Good' : 'Average'
    };
  });
  
  // Example 5: Multiple related states vs single object
  const [name, setName] = useState('Debangshu');
  const [age, setAge] = useState(22);
  const [location, setLocation] = useState('Ichapur');
  
  const [studentData, setStudentData] = useState({
    name: 'Abhronila',
    age: 20,
    location: 'Naihati'
  });

  // Interactive functions
  const updatePrimitiveState = () => {
    setScore(100);
    setStudentName('Tuhina Roy');
    setIsPresent(false);
  };

  const resetToInitial = () => {
    setScore(95);
    setStudentName('Swadeep');
    setIsPresent(true);
    setStudent({
      name: 'Tuhina',
      age: 21,
      location: 'Shyamnagar',
      grades: {
        math: 88,
        science: 92,
        english: 85
      },
      isActive: true
    });
    setAttendanceList(['Abhronila', 'Debangshu', 'Swadeep']);
  };

  const updateObjectNested = () => {
    setStudent(prev => ({
      ...prev,
      age: prev.age + 1,
      grades: {
        ...prev.grades,
        math: prev.grades.math + 5,
        science: prev.grades.science + 3
      }
    }));
  };

  const addToArray = () => {
    const newStudent = `Student${attendanceList.length + 1}`;
    setAttendanceList([...attendanceList, newStudent]);
  };

  const removeFromArray = () => {
    if (attendanceList.length > 0) {
      setAttendanceList(attendanceList.slice(0, -1));
    }
  };

  const updateMultipleStates = () => {
    setName('Debangshu Roy');
    setAge(23);
    setLocation('Barrackpore');
  };

  const updateSingleObject = () => {
    setStudentData(prev => ({
      ...prev,
      name: 'Abhronila Das',
      age: prev.age + 1,
      location: 'Shyamnagar'
    }));
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
        
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
          50% { border-color: rgba(59, 130, 246, 0.7); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>

      {/* Header Section */}
      <div 
        className="max-w-6xl mx-auto mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
        style={{ animation: 'fadeSlideUp 0.8s ease-out' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
          State Initialization: Primitive, Object, and Array
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Learn how to properly initialize different types of state in React components
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
              <strong>State initialization</strong> is the process of setting the initial value when 
              declaring a state variable with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useState</code>. 
              The initial value can be any JavaScript data type: primitives, objects, arrays, or even functions.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Primitive Types</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Numbers: <code>useState(0)</code>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Strings: <code>useState('')</code>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Booleans: <code>useState(false)</code>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    null/undefined
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Object Types</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Simple objects
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Nested objects
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Dates, custom objects
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Group related data
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Array Types</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Simple arrays
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Arrays of objects
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Multi-dimensional
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Empty arrays
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Primitive State Initialization */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🔢</span>
            Primitive State Initialization
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Code Examples</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Number initialization</div>
                  <div className="font-mono text-green-300">
                    <span className="text-blue-400">const</span> [score, setScore] ={' '}
                    <span className="text-yellow-300">useState</span>(
                      <span className="text-orange-400">95</span>
                    );
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">String initialization</div>
                  <div className="font-mono text-green-300">
                    <span className="text-blue-400">const</span> [studentName, setStudentName] ={' '}
                    <span className="text-yellow-300">useState</span>(
                      <span className="text-orange-400">'Swadeep'</span>
                    );
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Boolean initialization</div>
                  <div className="font-mono text-green-300">
                    <span className="text-blue-400">const</span> [isPresent, setIsPresent] ={' '}
                    <span className="text-yellow-300">useState</span>(
                      <span className="text-orange-400">true</span>
                    );
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Special cases</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div>// Undefined (not recommended)</div>
                    <div>const [value, setValue] = useState();</div>
                    <div className="mt-2">// Null initialization</div>
                    <div>const [data, setData] = useState(null);</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Live Values</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Score (number)</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</div>
                    <div className="text-xs text-gray-500 mt-1">Type: {typeof score}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Name (string)</div>
                    <div className="text-xl font-bold text-gray-800 dark:text-white">{studentName}</div>
                    <div className="text-xs text-gray-500 mt-1">Type: {typeof studentName}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Present (boolean)</div>
                    <div className={`text-xl font-bold ${isPresent ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isPresent ? 'Yes ✓' : 'No ✗'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Type: {typeof isPresent}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Undefined</div>
                    <div className="text-lg font-mono text-gray-600 dark:text-gray-400">
                      {undefinedValue === undefined ? 'undefined' : JSON.stringify(undefinedValue)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Type: {typeof undefinedValue}</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={updatePrimitiveState}
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Update All Primitive States
              </button>
            </div>
          </div>
        </div>

        {/* Object State Initialization */}
        <div 
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 dark:border-green-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📦</span>
            Object State Initialization
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Initialization Patterns</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Simple Object</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div><span className="text-blue-400">const</span> [user, setUser] ={' '}
                    <span className="text-yellow-300">useState</span>({'{'}</div>
                    <div className="ml-4">name: <span className="text-orange-400">'Tuhina'</span>,</div>
                    <div className="ml-4">age: <span className="text-orange-400">21</span>,</div>
                    <div className="ml-4">location: <span className="text-orange-400">'Shyamnagar'</span></div>
                    <div>
                        {`{'});`}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Nested Object</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div><span className="text-blue-400">const</span> [student, setStudent] ={' '}
                    <span className="text-yellow-300">useState</span>({'{'}</div>
                    <div className="ml-4">name: <span className="text-orange-400">'Swadeep'</span>,</div>
                    <div className="ml-4">grades: {'{'}</div>
                    <div className="ml-8">math: <span className="text-orange-400">88</span>,</div>
                    <div className="ml-8">science: <span className="text-orange-400">92</span></div>
                    <div className="ml-4">{'}'}</div>
                    <div>
                        {`{'});`}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Empty Object</div>
                  <div className="font-mono text-green-300">
                    <span className="text-blue-400">const</span> [formData, setFormData] ={' '}
                    <span className="text-yellow-300">useState</span>({'{ }'});
                  </div>
                  <div className="text-xs text-yellow-400 mt-2">
                    Note: Use when structure is dynamic or unknown initially
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Object State</h3>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Student Object Structure</div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-bold text-gray-800 dark:text-white">{student.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-400">Age:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{student.age}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{student.location}</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Grades:</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                        <div className="text-xs text-gray-500">Math</div>
                        <div className="font-bold">{student.grades.math}</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900/30 rounded">
                        <div className="text-xs text-gray-500">Science</div>
                        <div className="font-bold">{student.grades.science}</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/30 rounded">
                        <div className="text-xs text-gray-500">English</div>
                        <div className="font-bold">{student.grades.english}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Active:</span>
                    <span className={`font-bold ${student.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {student.isActive ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={updateObjectNested}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02]"
              >
                Update Nested Object Properties
              </button>
            </div>
          </div>
        </div>

        {/* Array State Initialization */}
        <div 
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📋</span>
            Array State Initialization
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Initialization Examples</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Simple Array</div>
                  <div className="font-mono text-green-300">
                    <span className="text-blue-400">const</span> [students, setStudents] ={' '}
                    <span className="text-yellow-300">useState</span>([
                      <span className="text-orange-400">'Abhronila'</span>,{' '}
                      <span className="text-orange-400">'Debangshu'</span>
                    ]);
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Array of Objects</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div><span className="text-blue-400">const</span> [users, setUsers] ={' '}
                    <span className="text-yellow-300">useState</span>([</div>
                    <div className="ml-4">{'{'} name: <span className="text-orange-400">'Tuhina'</span>, age: <span className="text-orange-400">21</span> {'}'},</div>
                    <div className="ml-4">{'{'} name: <span className="text-orange-400">'Swadeep'</span>, age: <span className="text-orange-400">20</span> {'}'}</div>
                    <div>]);</div>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Empty & Nested Arrays</div>
                  <div className="font-mono text-green-300 text-sm">
                    <div>// Empty array</div>
                    <div>const [list, setList] = useState([]);</div>
                    <div className="mt-2">// Nested arrays</div>
                    <div>const [matrix, setMatrix] = useState([[1, 2], [3, 4]]);</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Array States</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Attendance List</div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="space-y-2">
                      {attendanceList.map((student, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg
                                   hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                        >
                          <div className="flex items-center">
                            <span className="w-6 h-6 flex items-center justify-center bg-purple-100 dark:bg-purple-900 
                                           text-purple-600 dark:text-purple-300 rounded-full text-xs mr-3">
                              {index + 1}
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">{student}</span>
                          </div>
                          <span className="text-xs text-gray-500">Index: {index}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      Length: {attendanceList.length} | Type: Array
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Student Marks</div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {marks.map((mark, index) => (
                        <div 
                          key={index}
                          className={clsx(
                            "px-4 py-3 rounded-lg text-center transition-all duration-300 hover:scale-105",
                            mark >= 90 ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300" :
                            mark >= 80 ? "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300" :
                            mark >= 70 ? "bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300" :
                            "bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300"
                          )}
                        >
                          <div className="text-xs opacity-75">Test {index + 1}</div>
                          <div className="text-xl font-bold">{mark}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      Average: {(marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={addToArray}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Add Student
                </button>
                <button
                  onClick={removeFromArray}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Remove Last
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lazy Initialization */}
        <div 
          className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100 dark:border-orange-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⚡</span>
            Lazy Initialization (Function Initializer)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">When to Use</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Expensive Computations</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    When the initial state requires complex calculations
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">One-time Computation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Prevent re-calculation on every re-render
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Dynamic Initialization</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    When initial value depends on props or other runtime data
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Code Example</h3>
              
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <div className="text-sm text-gray-400 mb-2">Lazy Initialization Syntax</div>
                <div className="font-mono text-green-300 text-sm">
                  <div><span className="text-blue-400">const</span> [computedValue, setComputedValue] ={' '}
                  <span className="text-yellow-300">useState</span>({`() => {`}</div>
                  <div className="ml-4"><span className="text-blue-400">const</span> marks = [85, 90, 78, 92, 88];</div>
                  <div className="ml-4"><span className="text-blue-400">const</span> average = marks.reduce((a, b) =&gt; a + b, 0) / marks.length;</div>
                  <div className="ml-4"><span className="text-blue-400">return</span> {'{'}</div>
                  <div className="ml-8">marks,</div>
                  <div className="ml-8">average,</div>
                  <div className="ml-8">performance: average &gt;= 85 ? <span className="text-orange-400">'Excellent'</span> : <span className="text-orange-400">'Good'</span></div>
                  <div className="ml-4">{'};'}</div>
                  <div>{`});`}</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Computed Initial State</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Marks:</span>
                    <span className="font-bold">{JSON.stringify(computedInitial.marks)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{computedInitial.average.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance:</span>
                    <span className={clsx(
                      "font-bold",
                      computedInitial.performance === 'Excellent' ? "text-green-600 dark:text-green-400" :
                      computedInitial.performance === 'Good' ? "text-yellow-600 dark:text-yellow-400" :
                      "text-orange-600 dark:text-orange-400"
                    )}>
                      {computedInitial.performance}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple States vs Single Object */}
        <div 
          className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-cyan-100 dark:border-cyan-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⚖️</span>
            Multiple States vs Single Object
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Multiple Separate States</h3>
              
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <div className="font-mono text-green-300 text-sm">
                  <div><span className="text-blue-400">const</span> [name, setName] ={' '}
                  <span className="text-yellow-300">useState</span>(<span className="text-orange-400">'Debangshu'</span>);</div>
                  <div><span className="text-blue-400">const</span> [age, setAge] ={' '}
                  <span className="text-yellow-300">useState</span>(<span className="text-orange-400">22</span>);</div>
                  <div>
                    <span className="text-blue-400">const</span>
                        {`[location, setLocation] ={' '}`}
                  <span className="text-yellow-300">useState</span>
                  (<span className="text-orange-400">'Ichapur'
                    </span>);</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Current Values</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-bold">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-bold">{age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-bold">{location}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={updateMultipleStates}
                className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium
                         transition-all duration-300"
              >
                Update All Separate States
              </button>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">When to use:</div>
                <ul className="space-y-1">
                  <li>• Values are independent</li>
                  <li>• Only one value updates at a time</li>
                  <li>• Simple form fields</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Single Object State</h3>
              
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <div className="font-mono text-green-300 text-sm">
                  <div><span className="text-blue-400">const</span> 
                  {`[studentData, setStudentData] ={' '}`}
                  <span className="text-yellow-300">useState</span>
                  {`({'{'}`}
                  </div>
                  <div className="ml-4">name: <span className="text-orange-400">'Abhronila'</span>,</div>
                  <div className="ml-4">age: <span className="text-orange-400">20</span>,</div>
                  <div className="ml-4">location: <span className="text-orange-400">'Naihati'</span></div>
                  <div> 
                    {`{'});`}
                    </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Current Values</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-bold">{studentData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-bold">{studentData.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-bold">{studentData.location}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={updateSingleObject}
                className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium
                         transition-all duration-300"
              >
                Update Object State
              </button>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
                <div className="font-bold text-green-700 dark:text-green-300 mb-1">When to use:</div>
                <ul className="space-y-1">
                  <li>• Values are related</li>
                  <li>• Multiple values update together</li>
                  <li>• Form with many fields</li>
                  <li>• Data from API response</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:border-red-200 dark:hover:border-red-700
                     transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.7s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 
                           rounded-lg p-2 mr-3 text-xl">⚠️</span>
            Common Pitfalls in State Initialization
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Undefined Initial State</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Avoid <code>useState()</code> without an initial value
                </p>
                <div className="font-mono text-xs bg-gray-800 text-red-300 p-2 rounded">
                  {`// WRONG - Causes undefined errors\nconst [value, setValue] = useState();\nconsole.log(value.toUpperCase()); // TypeError`}
                </div>
                <div className="font-mono text-xs bg-gray-800 text-green-300 p-2 rounded mt-2">
                  {`// CORRECT - Provide initial value\nconst [value, setValue] = useState('');`}
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Expensive Computations</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Don't do heavy computation directly in useState argument
                </p>
                <div className="font-mono text-xs bg-gray-800 text-red-300 p-2 rounded mt-2">
                  {`// WRONG - Runs on every render\nconst [data, setData] = useState(heavyCalculation());`}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Inconsistent Types</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Initialize with the correct data type
                </p>
                <div className="font-mono text-xs bg-gray-800 text-red-300 p-2 rounded">
                  {`// CONFUSING - Mixed types\nconst [data, setData] = useState(''); // String\nsetData(123); // Now number`}
                </div>
                <div className="font-mono text-xs bg-gray-800 text-green-300 p-2 rounded mt-2">
                  {`// BETTER - Consistent type\nconst [count, setCount] = useState(0); // Always number`}
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Missing Properties</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Initialize all object properties to avoid undefined errors
                </p>
                <div className="font-mono text-xs bg-gray-800 text-red-300 p-2 rounded mt-2">
                  {`// WRONG - Missing properties\nconst [user, setUser] = useState({ name: 'John' });\nconsole.log(user.age); // undefined`}
                </div>
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
            Best Practices
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">1.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Always Initialize</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Never use <code>useState()</code> without a value
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">2.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use Lazy Init</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                For expensive computations, use function initializer
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">3.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Group Related Data</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use objects for related properties
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">4.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Meaningful Defaults</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Initialize with realistic, meaningful values
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">State Initialization Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Provided initial value for all state variables
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Used appropriate data type (string, number, object, array)
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Grouped related data in objects when needed
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Used lazy initialization for expensive computations
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Chose meaningful default values
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Avoided undefined/null unless specifically needed
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.9s_both]
                     motion-safe:animate-[pulseBorder_3s_ease-in-out_infinite]"
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
                  <strong>Remember:</strong> State initialization is like preparing a student's report card 
                  at the beginning of the year. You need to set up the right structure with meaningful 
                  starting values. Just like how Swadeep from Barrackpore starts with an empty grade sheet 
                  that gets filled throughout the year.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Think ahead:</strong> Initialize state with the complete structure you'll need
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Avoid "undefined":</strong> Always provide default values to prevent errors
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Group wisely:</strong> If data changes together, keep it in one object state
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Performance:</strong> Use function initializer for expensive setup
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "When Tuhina from Shyamnagar starts a new project, she sets up all her tools 
                  and materials first. Similarly, proper state initialization sets up your component 
                  for success. Remember: garbage in, garbage out - start with good data!"
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
                When should you use multiple useState calls vs a single object? 
                Consider a form with 10 fields - which approach is better?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Look at the "Update Object State" vs "Update All Separate States" buttons. 
                Which one causes more re-renders? Why?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try changing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Modify the lazy initialization example to calculate the median instead of average. 
                How does this affect performance?
              </p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetToInitial}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 
                     text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl
                     transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Reset All States to Initial Values
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Next: Learn about Updating State Correctly with the Immutability Principle
        </p>
      </div>
    </div>
  );
};

export default Topic8;