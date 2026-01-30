import { useState } from 'react';
import clsx from 'clsx';

const Topic13 = () => {
  // Example 1: Student attendance list
  const [attendance, setAttendance] = useState([
    { id: 1, name: 'Swadeep', present: true, grade: 'A' },
    { id: 2, name: 'Tuhina', present: true, grade: 'B+' },
    { id: 3, name: 'Abhronila', present: false, grade: 'A-' },
    { id: 4, name: 'Debangshu', present: true, grade: 'B' },
    { id: 5, name: 'Arghya', present: false, grade: 'C+' }
  ]);

  // Example 2: Task list with priorities
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React State', completed: true, priority: 'high' },
    { id: 2, title: 'Practice Array Methods', completed: false, priority: 'high' },
    { id: 3, title: 'Build Todo App', completed: false, priority: 'medium' },
    { id: 4, title: 'Study useEffect Hook', completed: false, priority: 'low' },
    { id: 5, title: 'Review Spread Operator', completed: true, priority: 'medium' }
  ]);

  // Example 3: Shopping cart items
  const [cartItems, setCartItems] = useState([
    { id: 101, name: 'JavaScript Book', price: 29.99, quantity: 2, category: 'Books' },
    { id: 102, name: 'React T-shirt', price: 19.99, quantity: 1, category: 'Apparel' },
    { id: 103, name: 'Web Dev Course', price: 99.99, quantity: 1, category: 'Courses' },
    { id: 104, name: 'Programming Stickers', price: 4.99, quantity: 5, category: 'Accessories' }
  ]);

  // Example 4: Number array for basic operations
  const [numbers, setNumbers] = useState([10, 25, 35, 50, 65, 80]);

  // New item inputs
  const [newStudentName, setNewStudentName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newCartItem, setNewCartItem] = useState({ name: '', price: '', quantity: 1 });

  // History of operations
  const [operationHistory, setOperationHistory] = useState([]);

  const addHistoryEntry = (operation, method, details) => {
    setOperationHistory(prev => [
      {
        id: Date.now(),
        operation,
        method,
        details,
        timestamp: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 9) // Keep last 10 entries
    ]);
  };

  // ===== ARRAY METHOD: map() =====
  // Used for: Transforming/updating items in array

  const toggleAttendance = (id) => {
    setAttendance(prev => 
      prev.map(student =>
        student.id === id
          ? { ...student, present: !student.present }
          : student
      )
    );
    addHistoryEntry('Toggle attendance', 'map()', `Toggled student ${id} attendance`);
  };

  const upgradeAllGrades = () => {
    const gradeMap = { 'A': 'A+', 'A-': 'A', 'B+': 'A-', 'B': 'B+', 'C+': 'B', 'C': 'C+' };
    
    setAttendance(prev =>
      prev.map(student => ({
        ...student,
        grade: gradeMap[student.grade] || student.grade
      }))
    );
    addHistoryEntry('Upgrade all grades', 'map()', 'Applied grade upgrade to all students');
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    addHistoryEntry('Toggle task completion', 'map()', `Toggled task ${id} completion`);
  };

  const increaseAllPrices = () => {
    setCartItems(prev =>
      prev.map(item => ({
        ...item,
        price: Number((item.price * 1.1).toFixed(2)) // 10% increase
      }))
    );
    addHistoryEntry('Increase all prices', 'map()', 'Increased all prices by 10%');
  };

  const doubleAllNumbers = () => {
    setNumbers(prev => prev.map(n => n * 2));
    addHistoryEntry('Double all numbers', 'map()', 'Multiplied all numbers by 2');
  };

  // ===== ARRAY METHOD: filter() =====
  // Used for: Removing items from array

  const removeAbsentStudents = () => {
    setAttendance(prev => prev.filter(student => student.present));
    addHistoryEntry('Remove absent students', 'filter()', 'Removed all absent students');
  };

  const removeCompletedTasks = () => {
    setTasks(prev => prev.filter(task => !task.completed));
    addHistoryEntry('Remove completed tasks', 'filter()', 'Removed all completed tasks');
  };

  const removeLowPriorityTasks = () => {
    setTasks(prev => prev.filter(task => task.priority !== 'low'));
    addHistoryEntry('Remove low priority tasks', 'filter()', 'Removed low priority tasks');
  };

  const removeExpensiveItems = () => {
    setCartItems(prev => prev.filter(item => item.price < 50));
    addHistoryEntry('Remove expensive items', 'filter()', 'Removed items costing $50+');
  };

  const removeEvenNumbers = () => {
    setNumbers(prev => prev.filter(n => n % 2 !== 0));
    addHistoryEntry('Remove even numbers', 'filter()', 'Removed all even numbers');
  };

  const removeHighQuantityItems = () => {
    setCartItems(prev => prev.filter(item => item.quantity <= 3));
    addHistoryEntry('Remove high quantity items', 'filter()', 'Removed items with quantity > 3');
  };

  // ===== ARRAY METHOD: concat() =====
  // Used for: Adding items to array (alternative to spread)

  const addStudentWithConcat = () => {
    if (!newStudentName.trim()) return;
    
    const newStudent = {
      id: attendance.length + 1,
      name: newStudentName,
      present: true,
      grade: 'B'
    };
    
    setAttendance(prev => prev.concat(newStudent));
    addHistoryEntry('Add student', 'concat()', `Added student: ${newStudentName}`);
    setNewStudentName('');
  };

  const addTaskWithConcat = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
      priority: 'medium'
    };
    
    setTasks(prev => prev.concat(newTask));
    addHistoryEntry('Add task', 'concat()', `Added task: ${newTaskTitle}`);
    setNewTaskTitle('');
  };

  const addCartItemWithConcat = () => {
    if (!newCartItem.name.trim() || !newCartItem.price) return;
    
    const newItem = {
      id: cartItems.length + 101,
      name: newCartItem.name,
      price: parseFloat(newCartItem.price),
      quantity: parseInt(newCartItem.quantity) || 1,
      category: 'Other'
    };
    
    setCartItems(prev => prev.concat(newItem));
    addHistoryEntry('Add cart item', 'concat()', `Added item: ${newCartItem.name}`);
    setNewCartItem({ name: '', price: '', quantity: 1 });
  };

  const addNumberWithConcat = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setNumbers(prev => prev.concat(newNumber));
    addHistoryEntry('Add number', 'concat()', `Added number: ${newNumber}`);
  };

  // ===== OTHER ARRAY METHODS =====

  // slice() - Creating subsets
  const getFirstThreeStudents = () => {
    setAttendance(prev => prev.slice(0, 3));
    addHistoryEntry('Get first 3 students', 'slice()', 'Kept only first 3 students');
  };

  // find() + map() - Finding and updating
  const updateSpecificTask = (id, updates) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates }
          : task
      )
    );
    addHistoryEntry('Update specific task', 'find() + map()', `Updated task ${id}`);
  };

  // reduce() - Calculating totals
  const calculateCartTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total.toFixed(2);
  };

  const calculateAverageGrade = () => {
    const gradeValues = { 'A+': 95, 'A': 90, 'A-': 87, 'B+': 83, 'B': 80, 'B-': 77, 'C+': 73, 'C': 70 };
    const total = attendance.reduce((sum, student) => sum + (gradeValues[student.grade] || 75), 0);
    return (total / attendance.length).toFixed(1);
  };

  // sort() - Sorting arrays (with spread to avoid mutation)
  const sortStudentsByName = () => {
    setAttendance(prev =>
      [...prev].sort((a, b) => a.name.localeCompare(b.name))
    );
    addHistoryEntry('Sort by name', 'sort() + spread', 'Sorted students alphabetically');
  };

  const sortTasksByPriority = () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    setTasks(prev =>
      [...prev].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    );
    addHistoryEntry('Sort by priority', 'sort() + spread', 'Sorted tasks by priority');
  };

  // ===== COMBINATION PATTERNS =====

  // map() + filter() - Complex transformations
  const markAllPresentAndRemoveFails = () => {
    setAttendance(prev =>
      prev
        .map(student => ({ ...student, present: true })) // First: mark all present
        .filter(student => student.grade !== 'C' && student.grade !== 'C+') // Then: remove low grades
    );
    addHistoryEntry('Mark all present & remove low grades', 'map() + filter()', 'Complex transformation');
  };

  // filter() + map() - Selective updates
  const upgradeCompletedTasks = () => {
    setTasks(prev =>
      prev.map(task =>
        task.completed
          ? { ...task, priority: 'high' }
          : task
      )
    );
    addHistoryEntry('Upgrade completed tasks', 'filter() + map()', 'Set priority to high for completed tasks');
  };

  // ===== COMMON MISTAKES DEMONSTRATIONS =====

  const demonstrateMutationMistake = () => {
    addHistoryEntry('Attempting mutation', 'WRONG: push()', 'Trying to mutate array directly');
    
    // WRONG: Direct mutation
    try {
      attendance.push({ id: 999, name: 'Mutation Test', present: true, grade: 'A' });
      addHistoryEntry('Direct push attempted', 'push()', 'Array mutated but React wont update');
    } catch (e) {
      addHistoryEntry('Error in mutation', 'ERROR', e.message);
    }
  };

  const demonstrateWrongMap = () => {
    addHistoryEntry('Wrong map usage', 'WRONG: map() mutation', 'Mutating in map()');
    
    // WRONG: Mutating in map
    try {
      setAttendance(prev =>
        prev.map(student => {
          student.grade = 'A+'; // MUTATION!
          return student;
        })
      );
    } catch (e) {
      addHistoryEntry('Map mutation error', 'ERROR', 'Mutated objects in map()');
    }
  };

  // ===== RESET FUNCTIONS =====

  const resetAttendance = () => {
    setAttendance([
      { id: 1, name: 'Swadeep', present: true, grade: 'A' },
      { id: 2, name: 'Tuhina', present: true, grade: 'B+' },
      { id: 3, name: 'Abhronila', present: false, grade: 'A-' },
      { id: 4, name: 'Debangshu', present: true, grade: 'B' },
      { id: 5, name: 'Arghya', present: false, grade: 'C+' }
    ]);
    addHistoryEntry('Reset attendance', 'RESET', 'Reset to initial student data');
  };

  const resetAll = () => {
    resetAttendance();
    setTasks([
      { id: 1, title: 'Learn React State', completed: true, priority: 'high' },
      { id: 2, title: 'Practice Array Methods', completed: false, priority: 'high' },
      { id: 3, title: 'Build Todo App', completed: false, priority: 'medium' },
      { id: 4, title: 'Study useEffect Hook', completed: false, priority: 'low' },
      { id: 5, title: 'Review Spread Operator', completed: true, priority: 'medium' }
    ]);
    setCartItems([
      { id: 101, name: 'JavaScript Book', price: 29.99, quantity: 2, category: 'Books' },
      { id: 102, name: 'React T-shirt', price: 19.99, quantity: 1, category: 'Apparel' },
      { id: 103, name: 'Web Dev Course', price: 99.99, quantity: 1, category: 'Courses' },
      { id: 104, name: 'Programming Stickers', price: 4.99, quantity: 5, category: 'Accessories' }
    ]);
    setNumbers([10, 25, 35, 50, 65, 80]);
    setOperationHistory([]);
    setNewStudentName('');
    setNewTaskTitle('');
    setNewCartItem({ name: '', price: '', quantity: 1 });
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
        
        @keyframes pulseArray {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
            border-color: rgba(139, 92, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
            border-color: rgba(139, 92, 246, 0.7);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .history-entry {
          animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes highlight {
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
          Updating Array State Using map, filter, and concat
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Master immutable array operations in React state management
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Theory Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-700
                     transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.1s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.1s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 
                           rounded-lg p-2 mr-3 text-xl">📘</span>
            Immutable Array Operations
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Why Immutability Matters</h3>
              <p className="text-gray-700 dark:text-gray-300">
                React detects state changes by comparing object references. When you mutate an array directly 
                (like with <code className="bg-gray-100 dark:bg-gray-700 px-1">push()</code> or <code className="bg-gray-100 dark:bg-gray-700 px-1">splice()</code>), 
                the reference stays the same, so React won't re-render. We use <strong>map()</strong>, <strong>filter()</strong>, 
                and <strong>concat()</strong> to create new arrays.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">map()</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Purpose:</strong> Transform each item in array
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Use when:</strong> Updating items, changing properties
                </p>
                <div className="mt-2 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                  {`array.map(item => newItem)`}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">filter()</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Purpose:</strong> Select subset of items
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Use when:</strong> Removing items, filtering data
                </p>
                <div className="mt-2 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                  {`array.filter(item => condition)`}
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">concat()</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Purpose:</strong> Add items to array
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Use when:</strong> Adding new items (alternative to spread)
                </p>
                <div className="mt-2 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                  {`array.concat(newItem)`}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">⚠️ Never Use These (They Mutate)</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <code>push()</code>
                </div>
                <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <code>pop()</code>
                </div>
                <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <code>splice()</code>
                </div>
                <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <code>sort()</code>*
                </div>
                <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <code>reverse()</code>*
                </div>
                <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <code>shift()</code>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                *Can be used with spread: <code>[...array].sort()</code>
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div 
          className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]
                     motion-safe:animate-[pulseArray_3s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⚖️</span>
            Mutation vs Immutability
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Mutable (WRONG)</h3>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm">
                  Direct Mutation
                </span>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">push() - Adds item</h4>
                <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                  {`// WRONG: Mutates original array\nconst newArray = originalArray;\nnewArray.push(newItem);\n// originalArray is also changed!`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Both variables reference the same array
                </p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">splice() - Removes item</h4>
                <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                  {`// WRONG: Direct mutation\nconst index = 2;\noriginalArray.splice(index, 1);\n// Array is mutated`}
                </div>
              </div>
              
              <button
                onClick={demonstrateMutationMistake}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Demonstrate Mutation Problem
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Immutable (CORRECT)</h3>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                  New Arrays
                </span>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">concat() - Adds item</h4>
                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                  {`// CORRECT: Creates new array\nconst newArray = originalArray.concat(newItem);\n// originalArray unchanged`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Alternative: <code>[...originalArray, newItem]</code>
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">filter() - Removes item</h4>
                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                  {`// CORRECT: Creates new array\nconst newArray = originalArray.filter(\n  (_, idx) => idx !== index\n);`}
                </div>
              </div>
              
              <button
                onClick={demonstrateWrongMap}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02]"
              >
                Demonstrate Wrong map() Usage
              </button>
            </div>
          </div>
        </div>

        {/* Example 1: Student Attendance */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">👨‍🎓</span>
            Example 1: Student Attendance (map() & filter())
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Attendance</h3>
              
              <div className="space-y-3">
                {attendance.map(student => (
                  <div
                    key={student.id}
                    className={clsx(
                      "flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
                      student.present
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    )}
                  >
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-3 h-3 rounded-full mr-3",
                        student.present ? "bg-green-500" : "bg-red-500"
                      )} />
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">Grade: {student.grade}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={clsx(
                        "px-2 py-1 rounded text-xs font-medium",
                        student.grade === 'A' || student.grade === 'A+' || student.grade === 'A-'
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : student.grade === 'B' || student.grade === 'B+'
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      )}>
                        {student.grade}
                      </span>
                      <button
                        onClick={() => toggleAttendance(student.id)}
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
                  </div>
                ))}
                
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Statistics</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <div className="text-xs text-gray-500">Present</div>
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">
                        {attendance.filter(s => s.present).length}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <div className="text-xs text-gray-500">Average Grade</div>
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {calculateAverageGrade()}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Operations</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">map() Operations</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={upgradeAllGrades}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm
                               transition-all duration-300 hover:scale-[1.02]"
                    >
                      Upgrade All Grades
                    </button>
                    <button
                      onClick={markAllPresentAndRemoveFails}
                      className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm
                               transition-all duration-300 hover:scale-[1.02]"
                    >
                      Mark All Present & Remove Low Grades
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">filter() Operations</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={removeAbsentStudents}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm
                               transition-all duration-300 hover:scale-[1.02]"
                    >
                      Remove Absent Students
                    </button>
                    <button
                      onClick={getFirstThreeStudents}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm
                               transition-all duration-300 hover:scale-[1.02]"
                    >
                      Keep First 3 Students
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">concat() - Add Student</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      placeholder="Enter student name"
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                    <button
                      onClick={addStudentWithConcat}
                      disabled={!newStudentName.trim()}
                      className={clsx(
                        "px-4 py-2 rounded-lg transition-all duration-300",
                        newStudentName.trim()
                          ? "bg-purple-500 hover:bg-purple-600 text-white hover:scale-[1.02]"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      )}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Other Operations</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={sortStudentsByName}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg text-sm
                               transition-all duration-300 hover:scale-[1.02]"
                    >
                      Sort by Name
                    </button>
                    <button
                      onClick={resetAttendance}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm
                               transition-all duration-300 hover:scale-[1.02]"
                    >
                      Reset Attendance
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">map() Example Code</div>
                <div className="font-mono text-xs text-green-300">
                  {`// Toggle attendance for specific student\nsetAttendance(prev =>\n  prev.map(student =>\n    student.id === id\n      ? { ...student, present: !student.present }\n      : student\n  )\n);`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example 2: Task Management */}
        <div 
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 dark:border-green-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📋</span>
            Example 2: Task Management (map() & filter())
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Tasks</h3>
              
              <div className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={clsx(
                      "p-4 rounded-lg border transition-all duration-300",
                      task.completed
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className={clsx(
                            "font-medium",
                            task.completed && "line-through text-gray-500 dark:text-gray-400"
                          )}>
                            {task.title}
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className={clsx(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              task.priority === 'high' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                              task.priority === 'medium' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                              task.priority === 'low' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            )}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-gray-500">
                              ID: {task.id}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => updateSpecificTask(task.id, { priority: 'high' })}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 
                                 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 
                                 rounded text-sm transition-all duration-300"
                      >
                        Set High
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Task Summary</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-lg font-bold">{tasks.length}</div>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <div className="text-xs text-gray-500">Completed</div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {tasks.filter(t => t.completed).length}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <div className="text-xs text-gray-500">High Priority</div>
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {tasks.filter(t => t.priority === 'high').length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Task Operations</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={removeCompletedTasks}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Remove Completed Tasks
                  </button>
                  <button
                    onClick={removeLowPriorityTasks}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Remove Low Priority
                  </button>
                </div>
                
                <button
                  onClick={upgradeCompletedTasks}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Set High Priority for Completed Tasks
                </button>
                
                <button
                  onClick={sortTasksByPriority}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Sort by Priority
                </button>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Add New Task</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title"
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                    <button
                      onClick={addTaskWithConcat}
                      disabled={!newTaskTitle.trim()}
                      className={clsx(
                        "px-4 py-2 rounded-lg transition-all duration-300",
                        newTaskTitle.trim()
                          ? "bg-green-500 hover:bg-green-600 text-white hover:scale-[1.02]"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      )}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">filter() Example Code</div>
                <div className="font-mono text-xs text-green-300">
                  {`// Remove completed tasks\nsetTasks(prev =>\n  prev.filter(task => !task.completed)\n);\n\n`}
                  {`// Remove low priority tasks\nsetTasks(prev =>\n  prev.filter(task => task.priority !== 'low')\n);`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example 3: Shopping Cart */}
        <div 
          className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100 dark:border-orange-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🛒</span>
            Example 3: Shopping Cart (Combined Operations)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Cart Items</h3>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        Subtotal: <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCartItems(prev =>
                            prev.map(cartItem =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
                                : cartItem
                            )
                          )}
                          className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/30 
                                   text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 
                                   dark:hover:bg-red-900/50 transition-colors"
                        >
                          -
                        </button>
                        <button
                          onClick={() => setCartItems(prev =>
                            prev.map(cartItem =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                            )
                          )}
                          className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/30 
                                   text-green-600 dark:text-green-300 rounded-full hover:bg-green-200 
                                   dark:hover:bg-green-900/50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">Cart Total:</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${calculateCartTotal()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {cartItems.length} items in cart
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Cart Operations</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={increaseAllPrices}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Increase Prices 10%
                  </button>
                  <button
                    onClick={removeExpensiveItems}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Remove Expensive Items
                  </button>
                </div>
                
                <button
                  onClick={removeHighQuantityItems}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Remove High Quantity Items (Qty > 3)
                </button>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Add New Item</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newCartItem.name}
                      onChange={(e) => setNewCartItem(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Item name"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={newCartItem.price}
                        onChange={(e) => setNewCartItem(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="Price"
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                      <input
                        type="number"
                        value={newCartItem.quantity}
                        onChange={(e) => setNewCartItem(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="Quantity"
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                    </div>
                    <button
                      onClick={addCartItemWithConcat}
                      disabled={!newCartItem.name.trim() || !newCartItem.price}
                      className={clsx(
                        "w-full py-2 rounded-lg font-medium transition-all duration-300",
                        newCartItem.name.trim() && newCartItem.price
                          ? "bg-orange-500 hover:bg-orange-600 text-white hover:scale-[1.02]"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      )}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">reduce() Example Code</div>
                <div className="font-mono text-xs text-green-300">
                  {`// Calculate cart total\nconst total = cartItems.reduce(\n  (sum, item) => sum + (item.price * item.quantity),\n  0\n);`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operation History */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                             rounded-lg p-2 mr-3 text-xl">📊</span>
              Operation History
            </h2>
            <button
              onClick={() => setOperationHistory([])}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                       text-gray-800 dark:text-white rounded-lg transition-all duration-300"
            >
              Clear History
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto p-2">
            {operationHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-4">📝</div>
                <p>Perform array operations to see history</p>
                <p className="text-sm mt-2">Each operation shows the method used and details</p>
              </div>
            ) : (
              operationHistory.map(entry => (
                <div
                  key={entry.id}
                  className={clsx(
                    "history-entry p-4 rounded-lg border transition-all duration-300",
                    entry.method === 'map()' && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                    entry.method === 'filter()' && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                    entry.method === 'concat()' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                    entry.method === 'sort() + spread' && "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                    entry.method === 'map() + filter()' && "bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-green-800",
                    entry.method === 'filter() + map()' && "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-blue-800",
                    entry.method === 'find() + map()' && "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
                    entry.method === 'RESET' && "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700",
                    (entry.method.includes('WRONG') || entry.method === 'ERROR') && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{entry.operation}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{entry.details}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</div>
                      <span className={clsx(
                        "text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block",
                        entry.method === 'map()' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                        entry.method === 'filter()' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                        entry.method === 'concat()' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                        entry.method === 'sort() + spread' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                        entry.method === 'map() + filter()' && "bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 dark:from-blue-900/30 dark:to-green-900/30 dark:text-blue-300",
                        entry.method === 'filter() + map()' && "bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:from-green-900/30 dark:to-blue-900/30 dark:text-green-300",
                        entry.method === 'find() + map()' && "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
                        entry.method === 'RESET' && "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300",
                        (entry.method.includes('WRONG') || entry.method === 'ERROR') && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      )}>
                        {entry.method}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Best Practices */}
        <div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-emerald-100 dark:border-emerald-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.7s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 
                           rounded-lg p-2 mr-3 text-xl">🏆</span>
            Best Practices & Patterns
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">1.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use map() for Updates</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Transform items without mutation
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">2.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use filter() for Removal</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Create new array with filtered items
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">3.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use concat() or Spread</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Add items immutably
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">4.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Combine Methods</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Chain operations for complex updates
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Array Operations Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using map() to update items in array
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using filter() to remove items from array
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using concat() or spread to add items
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Never mutating arrays directly
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using spread with sort() and reverse()
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Chaining methods for complex operations
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]
                     motion-safe:animate-[pulseArray_3s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.8s both' }}
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
                  <strong>Think of array methods like kitchen tools:</strong> When Swadeep from Barrackpore 
                  prepares a meal, he doesn't cook everything in one pot. He uses different tools for 
                  different tasks - a knife for cutting, a pan for frying, a pot for boiling. Similarly, 
                  use map() for transformations, filter() for selection, and concat() for adding.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Master the basics first:</strong> map(), filter(), concat() cover 90% of use cases
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Chain wisely:</strong> Multiple map/filter calls can often be combined
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Watch performance:</strong> Very large arrays might need optimization
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Practice patterns:</strong> The more you use them, the more intuitive they become
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "When Tuhina from Shyamnagar manages the class attendance register, she doesn't tear out 
                  pages for absent students. She creates a new list with only present students. That's exactly 
                  what filter() does - it creates a new array without mutating the original."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.9s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.9s both' }}
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
                Why do map() and filter() return new arrays? How does this help React's 
                re-rendering mechanism?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Try the "Remove Absent Students" and "Mark All Present & Remove Low Grades" operations. 
                What's the difference in how they work? Which array methods are used in each?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try implementing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Create a function that finds a student by name and updates their grade, 
                using find() to locate and map() to update. Remember immutability!
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
          Next: Learn about Event Handling in React Components
        </p>
      </div>
    </div>
  );
};

export default Topic13;