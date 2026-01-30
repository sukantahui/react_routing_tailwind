import React, { useState } from 'react';
import clsx from 'clsx';

const Topic27 = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [listType, setListType] = useState('withKeys');
  const [students, setStudents] = useState([
    { id: 1, name: "Swadeep", grade: "A", attendance: 95, location: "Barrackpore", isPresent: true },
    { id: 2, name: "Tuhina", grade: "A+", attendance: 98, location: "Shyamnagar", isPresent: true },
    { id: 3, name: "Abhronila", grade: "B+", attendance: 88, location: "Ichapur", isPresent: false },
    { id: 4, name: "Debangshu", grade: "A-", attendance: 92, location: "Naihati", isPresent: true },
    { id: 5, name: "Soumya", grade: "B", attendance: 85, location: "Barasat", isPresent: true },
  ]);

  const [books, setBooks] = useState([
    { id: "book1", title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008, rating: 4.5 },
    { id: "book2", title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2011, rating: 4.7 },
    { id: "book3", title: "You Don't Know JS", author: "Kyle Simpson", year: 2015, rating: 4.8 },
    { id: "book4", title: "React in Action", author: "Mark Tielens Thomas", year: 2018, rating: 4.3 },
  ]);

  const [tasks, setTasks] = useState([
    { id: Date.now() + 1, text: "Learn React keys", completed: false },
    { id: Date.now() + 2, text: "Practice useEffect", completed: true },
    { id: Date.now() + 3, text: "Build a project", completed: false },
  ]);

  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("B");
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newTask, setNewTask] = useState("");
  const [animationMode, setAnimationMode] = useState(true);
  const [showVirtualDOM, setShowVirtualDOM] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [highlightedKey, setHighlightedKey] = useState(null);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Function to add a student with or without proper keys
  const addStudent = () => {
    if (!newStudentName.trim()) return;
    
    const newStudent = {
      id: listType === 'withKeys' ? Date.now() : undefined,
      name: newStudentName,
      grade: newStudentGrade,
      attendance: Math.floor(Math.random() * 20) + 80,
      location: "New Location",
      isPresent: true
    };

    if (listType === 'noKeys') {
      setStudents(prev => [...prev, { ...newStudent }]);
    } else if (listType === 'indexKeys') {
      setStudents(prev => [...prev, { ...newStudent }]);
    } else {
      setStudents(prev => [...prev, { ...newStudent, id: Date.now() }]);
    }
    
    setNewStudentName("");
  };

  // Function to remove a student
  const removeStudent = (index) => {
    if (listType === 'noKeys') {
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
    } else {
      setStudents(prev => prev.filter((student, i) => i !== index));
    }
  };

  // Function to reorder students
  const shuffleStudents = () => {
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    setStudents(shuffled);
  };

  // Function to add a book
  const addBook = () => {
    if (!newBookTitle.trim() || !newBookAuthor.trim()) return;
    
    const newBook = {
      id: `book${Date.now()}`,
      title: newBookTitle,
      author: newBookAuthor,
      year: 2024,
      rating: 4.0
    };
    
    setBooks(prev => [...prev, newBook]);
    setNewBookTitle("");
    setNewBookAuthor("");
  };

  // Function to add a task
  const addTask = () => {
    if (!newTask.trim()) return;
    
    const newTaskItem = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    
    setTasks(prev => [...prev, newTaskItem]);
    setNewTask("");
  };

  // Function to toggle task completion
  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to sort students
  const sortStudents = (order) => {
    setSortOrder(order);
    let sorted = [...students];
    
    switch (order) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'grade':
        const gradeOrder = { 'A+': 0, 'A': 1, 'A-': 2, 'B+': 3, 'B': 4, 'B-': 5, 'C': 6 };
        sorted.sort((a, b) => (gradeOrder[a.grade] || 99) - (gradeOrder[b.grade] || 99));
        break;
      case 'attendance':
        sorted.sort((a, b) => b.attendance - a.attendance);
        break;
      default:
        // Reset to original order (by id if exists)
        sorted = [...students].sort((a, b) => a.id - b.id);
    }
    
    setStudents(sorted);
  };

  // Function to simulate performance issue
  const simulateHeavyUpdate = () => {
    const startTime = performance.now();
    
    // Force re-render with state update
    setStudents(prev => prev.map(student => ({
      ...student,
      attendance: student.attendance + (Math.random() > 0.5 ? 1 : -1)
    })));
    
    const endTime = performance.now();
    return (endTime - startTime).toFixed(2);
  };

  const sections = [
    { id: 1, title: "Introduction", icon: "🎯" },
    { id: 2, title: "Why Keys Matter", icon: "🔑" },
    { id: 3, title: "Visual Comparison", icon: "👁️" },
    { id: 4, title: "Common Mistakes", icon: "⚠️" },
    { id: 5, title: "Best Practices", icon: "✅" },
  ];

  // Get key for student based on listType
  const getStudentKey = (student, index) => {
    switch (listType) {
      case 'noKeys': return undefined;
      case 'indexKeys': return index;
      case 'withKeys': return student.id || index;
      default: return student.id || index;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white">
            <span className="text-xl">🔑</span>
            <h1 className="text-2xl md:text-4xl font-bold">
              Understanding Keys in List Rendering
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how React uses keys to efficiently update lists and avoid common performance pitfalls
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.2s]">
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={clsx(
                  "flex-shrink-0 px-4 md:px-6 py-3 rounded-xl border transition-all duration-300 transform hover:scale-[1.02]",
                  activeSection === section.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg border-transparent"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium whitespace-nowrap">{section.title}</span>
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Introduction Section */}
        {activeSection === 1 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    What Are Keys in React?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Keys are special string attributes that help React identify which items have changed, 
                    been added, or been removed in a list. They give elements a stable identity across re-renders.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-4">The Key Concept</h3>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                        <p className="font-mono text-amber-700 dark:text-amber-400">
                          {`{items.map(item => <li key={item.id}>{item.name}</li>)}`}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          The <code>key</code> prop tells React which element is which
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-700 dark:text-green-400">With Keys</p>
                          <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                            React knows exactly which item changed
                          </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                          <p className="text-sm font-medium text-red-700 dark:text-red-400">Without Keys</p>
                          <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                            React re-renders entire list on changes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">Classroom Analogy</h3>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-xl">👨‍🏫</span>
                      </div>
                      <div>
                        <p className="text-blue-700 dark:text-blue-400">
                          Imagine <span className="font-semibold">Tuhina's</span> classroom in Shyamnagar. If students don't have 
                          roll numbers (keys), when a student leaves, the teacher has to re-check every student 
                          to find who's missing. With roll numbers, she instantly knows which student is absent.
                        </p>
                        <p className="text-blue-700 dark:text-blue-400 mt-2">
                          React works the same way - keys are like roll numbers for list items.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Key Characteristics</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Stable Identity</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Keys should be stable, predictable, and unique among siblings
                        </p>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Not Props</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Keys are not passed to components as props - React uses them internally
                        </p>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Sibling Uniqueness</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Keys only need to be unique among sibling elements, not globally
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Remember</h4>
                      <p className="text-purple-700 dark:text-purple-400 text-sm">
                        React uses keys to match elements between renders. Without proper keys, 
                        React can't tell which items correspond between renders, leading to 
                        performance issues and state bugs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How React Uses Keys */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">How React's Diffing Algorithm Uses Keys</h2>
              
              <div className="flex flex-col items-center">
                <div className="w-full max-w-4xl">
                  {/* Step 1 */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <div className="ml-6 flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white">Before Update</h3>
                      <p className="text-gray-600 dark:text-gray-400">React stores a virtual DOM with keys</p>
                    </div>
                  </div>
                  
                  {/* Virtual DOM Visualization */}
                  <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-800 dark:text-white">Virtual DOM Tree</h4>
                      <button
                        onClick={() => setShowVirtualDOM(!showVirtualDOM)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        {showVirtualDOM ? "Hide Details" : "Show Details"}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4">
                      {students.slice(0, 5).map((student, index) => (
                        <div 
                          key={getStudentKey(student, index)}
                          className={clsx(
                            "p-4 rounded-lg border-2 transition-all duration-300",
                            highlightedKey === student.id ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                          )}
                          onMouseEnter={() => setHighlightedKey(student.id)}
                          onMouseLeave={() => setHighlightedKey(null)}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Key: {getStudentKey(student, index) || '(none)'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {showVirtualDOM && (
                      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                        <pre className="text-sm text-gray-300 font-mono">
{`// Virtual DOM representation
<ul>
  <li key="1">Swadeep (Barrackpore)</li>
  <li key="2">Tuhina (Shyamnagar)</li>
  <li key="3">Abhronila (Ichapur)</li>
  <li key="4">Debangshu (Naihati)</li>
  <li key="5">Soumya (Barasat)</li>
</ul>

// Each element has a unique key
// React uses these keys to track elements`}
                        </pre>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex justify-center mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-600"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                    <div className="ml-6 flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white">After Update</h3>
                      <p className="text-gray-600 dark:text-gray-400">React compares keys to determine what changed</p>
                    </div>
                  </div>
                  
                  {/* Diffing Process */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-800 dark:text-green-300">Key Matches</h4>
                          <p className="text-green-700 dark:text-green-400">React reuses DOM element</p>
                        </div>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-500">
                        When keys match between renders, React knows it's the same element and only updates props if needed.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">➕</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-800 dark:text-blue-300">New Key</h4>
                          <p className="text-blue-700 dark:text-blue-400">React creates new element</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-500">
                        When a new key appears, React creates a new DOM element and inserts it at the correct position.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🗑️</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-red-800 dark:text-red-300">Missing Key</h4>
                          <p className="text-red-700 dark:text-red-400">React removes element</p>
                        </div>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-500">
                        When a key disappears, React removes the corresponding DOM element from the tree.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why Keys Matter Section */}
        {activeSection === 2 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-amber-500 mr-2">🔑</span> Why Keys Are Essential
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Interactive Demo */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-800 dark:text-white">Key Strategy Comparison</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setListType('noKeys')}
                          className={clsx(
                            "px-3 py-1 rounded-lg text-sm",
                            listType === 'noKeys'
                              ? "bg-red-500 text-white"
                              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                          )}
                        >
                          No Keys
                        </button>
                        <button
                          onClick={() => setListType('indexKeys')}
                          className={clsx(
                            "px-3 py-1 rounded-lg text-sm",
                            listType === 'indexKeys'
                              ? "bg-yellow-500 text-white"
                              : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                          )}
                        >
                          Index Keys
                        </button>
                        <button
                          onClick={() => setListType('withKeys')}
                          className={clsx(
                            "px-3 py-1 rounded-lg text-sm",
                            listType === 'withKeys'
                              ? "bg-green-500 text-white"
                              : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                          )}
                        >
                          Proper Keys
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className={clsx(
                        "p-4 rounded-lg mb-4",
                        listType === 'noKeys' && "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
                        listType === 'indexKeys' && "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800",
                        listType === 'withKeys' && "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      )}>
                        <p className="font-mono text-sm">
                          {listType === 'noKeys' && "students.map(student => <StudentCard student={student} />)"}
                          {listType === 'indexKeys' && "students.map((student, index) => <StudentCard key={index} student={student} />)"}
                          {listType === 'withKeys' && "students.map(student => <StudentCard key={student.id} student={student} />)"}
                        </p>
                      </div>

                      {/* Student List */}
                      <div className="space-y-3">
                        {students.map((student, index) => (
                          <div
                            key={getStudentKey(student, index)}
                            className={clsx(
                              "p-4 rounded-lg border transition-all duration-300",
                              animationMode && "hover:scale-[1.02]",
                              listType === 'noKeys' && "border-red-200 dark:border-red-800 bg-white dark:bg-gray-800",
                              listType === 'indexKeys' && "border-yellow-200 dark:border-yellow-800 bg-white dark:bg-gray-800",
                              listType === 'withKeys' && "border-green-200 dark:border-green-800 bg-white dark:bg-gray-800"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={clsx(
                                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                                  listType === 'noKeys' && "bg-red-500",
                                  listType === 'indexKeys' && "bg-yellow-500",
                                  listType === 'withKeys' && "bg-green-500"
                                )}>
                                  {student.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-bold">{student.name}</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {student.location} • Grade: {student.grade}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={clsx(
                                  "px-2 py-1 rounded text-xs",
                                  student.isPresent 
                                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                                )}>
                                  {student.isPresent ? "Present" : "Absent"}
                                </span>
                                <button
                                  onClick={() => removeStudent(index)}
                                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm">
                              <span>Key: {getStudentKey(student, index) || <span className="text-red-500">(none)</span>}</span>
                              <span>Attendance: {student.attendance}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={shuffleStudents}
                        className="py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Shuffle Order
                      </button>
                      <button
                        onClick={simulateHeavyUpdate}
                        className="py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Simulate Update
                      </button>
                    </div>
                  </div>

                  {/* Add Student Form */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4">Add New Student</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Student Name
                        </label>
                        <input
                          type="text"
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                          placeholder="Enter student name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Grade
                        </label>
                        <select
                          value={newStudentGrade}
                          onChange={(e) => setNewStudentGrade(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        >
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B">B</option>
                          <option value="B-">B-</option>
                          <option value="C">C</option>
                        </select>
                      </div>
                      <button
                        onClick={addStudent}
                        disabled={!newStudentName.trim()}
                        className={clsx(
                          "w-full py-3 rounded-lg font-medium transition-all duration-300",
                          !newStudentName.trim()
                            ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg"
                        )}
                      >
                        Add Student ({listType === 'withKeys' ? 'With Key' : listType === 'indexKeys' ? 'With Index Key' : 'Without Key'})
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Explanation */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-4">What Happens With Each Strategy</h3>
                    
                    <div className="space-y-4">
                      <div className={clsx(
                        "p-4 rounded-lg border transition-all duration-300",
                        listType === 'noKeys' 
                          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      )}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            listType === 'noKeys' ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          )}>
                            1
                          </div>
                          <h4 className={clsx(
                            "font-bold",
                            listType === 'noKeys' ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"
                          )}>
                            No Keys ❌
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500">✗</span>
                            <span className={listType === 'noKeys' ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}>
                              React can't identify items uniquely
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500">✗</span>
                            <span className={listType === 'noKeys' ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}>
                              State gets mixed up when list changes
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500">✗</span>
                            <span className={listType === 'noKeys' ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}>
                              Performance suffers on large lists
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className={clsx(
                        "p-4 rounded-lg border transition-all duration-300",
                        listType === 'indexKeys' 
                          ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      )}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            listType === 'indexKeys' ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          )}>
                            2
                          </div>
                          <h4 className={clsx(
                            "font-bold",
                            listType === 'indexKeys' ? "text-yellow-700 dark:text-yellow-300" : "text-gray-700 dark:text-gray-300"
                          )}>
                            Index Keys ⚠️
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-500">⚠</span>
                            <span className={listType === 'indexKeys' ? "text-yellow-600 dark:text-yellow-400" : "text-gray-600 dark:text-gray-400"}>
                              Keys change when items are added/removed
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-500">⚠</span>
                            <span className={listType === 'indexKeys' ? "text-yellow-600 dark:text-yellow-400" : "text-gray-600 dark:text-gray-400"}>
                              Can cause state bugs on reorder
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-500">⚠</span>
                            <span className={listType === 'indexKeys' ? "text-yellow-600 dark:text-yellow-400" : "text-gray-600 dark:text-gray-400"}>
                              Okay for static lists only
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className={clsx(
                        "p-4 rounded-lg border transition-all duration-300",
                        listType === 'withKeys' 
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      )}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            listType === 'withKeys' ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          )}>
                            3
                          </div>
                          <h4 className={clsx(
                            "font-bold",
                            listType === 'withKeys' ? "text-green-700 dark:text-green-400" : "text-gray-700 dark:text-gray-300"
                          )}>
                            Proper Keys ✅
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className={listType === 'withKeys' ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                              React can track items accurately
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className={listType === 'withKeys' ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                              State preserved during reorders
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className={listType === 'withKeys' ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                              Optimal performance
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Try This Experiment</h4>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        1. Set to "No Keys" and shuffle the list<br />
                        2. Notice React warnings in console<br />
                        3. Switch to "Proper Keys" and shuffle again<br />
                        4. See how React efficiently reorders items
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-4">Real-World Impact</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">⚡</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Performance</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            Without keys, React re-renders entire list on every change
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">🐛</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">State Bugs</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            Form inputs lose state when list order changes
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">🔄</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Animation</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            CSS transitions break without stable keys
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Visual Comparison Section */}
        {activeSection === 3 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-blue-500 mr-2">👁️</span> Visual Comparison
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Task List Example */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Todo List with State</h3>
                    
                    <div className="space-y-4">
                      {/* Add Task Form */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Add a new task..."
                        />
                        <button
                          onClick={addTask}
                          disabled={!newTask.trim()}
                          className={clsx(
                            "px-6 py-3 rounded-lg font-medium transition-all duration-300",
                            !newTask.trim()
                              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg"
                          )}
                        >
                          Add
                        </button>
                      </div>

                      {/* Task List */}
                      <div className="space-y-3">
                        {tasks.map((task, index) => (
                          <div
                            key={listType === 'noKeys' ? undefined : listType === 'indexKeys' ? index : task.id}
                            className={clsx(
                              "p-4 rounded-lg border transition-all duration-300",
                              animationMode && "hover:scale-[1.02]",
                              listType === 'noKeys' && "border-red-200 dark:border-red-800",
                              listType === 'indexKeys' && "border-yellow-200 dark:border-yellow-800",
                              listType === 'withKeys' && "border-green-200 dark:border-green-800",
                              task.completed 
                                ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20" 
                                : "bg-white dark:bg-gray-800"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => toggleTask(task.id)}
                                  className={clsx(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                    task.completed
                                      ? "bg-green-500 border-green-500"
                                      : "border-gray-300 dark:border-gray-600"
                                  )}
                                >
                                  {task.completed && (
                                    <span className="text-white text-sm">✓</span>
                                  )}
                                </button>
                                <div>
                                  <h4 className={clsx(
                                    "font-medium",
                                    task.completed && "line-through text-gray-500 dark:text-gray-400"
                                  )}>
                                    {task.text}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Key: {listType === 'noKeys' ? '(none)' : listType === 'indexKeys' ? index : task.id.toString().slice(-4)}
                                  </p>
                                </div>
                              </div>
                              <span className={clsx(
                                "px-2 py-1 rounded text-xs",
                                task.completed
                                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                                  : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
                              )}>
                                {task.completed ? "Done" : "Pending"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Book List Example */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Book Collection</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          value={newBookTitle}
                          onChange={(e) => setNewBookTitle(e.target.value)}
                          className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Book title"
                        />
                        <input
                          type="text"
                          value={newBookAuthor}
                          onChange={(e) => setNewBookAuthor(e.target.value)}
                          className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Author"
                        />
                      </div>
                      <button
                        onClick={addBook}
                        disabled={!newBookTitle.trim() || !newBookAuthor.trim()}
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add Book
                      </button>

                      <div className="space-y-3">
                        {books.map((book, index) => (
                          <div
                            key={book.id}
                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold">{book.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">by {book.author}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400">{book.year}</p>
                                <p className="text-amber-600 dark:text-amber-400 font-bold">⭐ {book.rating}</p>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              Key: {book.id}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Visualization */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">React's Reconciliation Process</h3>
                    
                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">1. List Before Change</h4>
                        <div className="flex items-center gap-2">
                          {['A', 'B', 'C', 'D'].map((item, i) => (
                            <div key={i} className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Step 2 */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">2. Remove 'B'</h4>
                        <div className="flex items-center gap-2">
                          {['A', 'B', 'C', 'D'].map((item, i) => (
                            <div key={i} className="relative">
                              <div className={clsx(
                                "w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all duration-300",
                                item === 'B' 
                                  ? "bg-red-500 text-white scale-90 opacity-50" 
                                  : "bg-blue-500 text-white"
                              )}>
                                {item}
                              </div>
                              {item === 'B' && (
                                <div className="absolute inset-0 border-2 border-red-500 rounded-lg animate-ping"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Step 3 */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">3. Without Keys</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            React thinks C became B, D became C
                          </p>
                          <div className="flex items-center gap-2">
                            {['A', 'C', 'D'].map((item, i) => (
                              <div key={i} className="w-12 h-12 bg-yellow-500 text-white rounded-lg flex items-center justify-center font-bold">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 4 */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">4. With Keys</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            React knows exactly which item was removed
                          </p>
                          <div className="flex items-center gap-2">
                            {[
                              { id: 1, letter: 'A' },
                              { id: 3, letter: 'C' },
                              { id: 4, letter: 'D' },
                            ].map((item) => (
                              <div key={item.id} className="relative">
                                <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold">
                                  {item.letter}
                                </div>
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-700 text-white text-xs rounded-full flex items-center justify-center">
                                  {item.id}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Demo */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-purple-800 dark:text-purple-300">Performance Impact</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-purple-600 dark:text-purple-400">Animations:</span>
                        <button
                          onClick={() => setAnimationMode(!animationMode)}
                          className={clsx(
                            "px-3 py-1 rounded text-sm",
                            animationMode
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          )}
                        >
                          {animationMode ? "On" : "Off"}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Re-renders</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {listType === 'noKeys' ? '100%' : listType === 'indexKeys' ? '50%' : '10%'}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
                          <p className="text-sm text-gray-500 dark:text-gray-400">DOM Updates</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {listType === 'noKeys' ? 'High' : listType === 'indexKeys' ? 'Medium' : 'Low'}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Memory</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {listType === 'noKeys' ? 'High' : listType === 'indexKeys' ? 'Medium' : 'Low'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Performance Scale</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">No Keys</span>
                            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Index Keys</span>
                            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Proper Keys</span>
                            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Debug Info */}
                  {showDebugInfo && (
                    <div className="bg-gray-900 rounded-xl p-6">
                      <h4 className="font-bold text-gray-300 mb-3">Debug Information</h4>
                      <pre className="text-xs text-gray-400 overflow-x-auto">
{`Current Configuration:
- List Type: ${listType}
- Items Count: ${students.length}
- Key Strategy: ${listType === 'noKeys' ? 'No keys' : listType === 'indexKeys' ? 'Index as key' : 'Proper keys'}
- Performance Mode: ${performanceMode ? 'On' : 'Off'}
- Animation Mode: ${animationMode ? 'On' : 'Off'}

Expected Behavior:
${listType === 'noKeys' 
  ? '⚠️ React will warn about missing keys\n⚠️ State may be lost on reorder\n⚠️ All items re-render on change'
  : listType === 'indexKeys'
  ? '⚠️ Keys change when list modifies\n⚠️ State may be incorrect after add/remove\n✅ No React warnings'
  : '✅ React can track items accurately\n✅ State preserved during reorders\n✅ Optimal performance'
}`}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sorting Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white">Sorting Demonstration</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => sortStudents('name')}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm",
                      sortOrder === 'name'
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                    )}
                  >
                    Sort by Name
                  </button>
                  <button
                    onClick={() => sortStudents('grade')}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm",
                      sortOrder === 'grade'
                        ? "bg-purple-500 text-white"
                        : "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800"
                    )}
                  >
                    Sort by Grade
                  </button>
                  <button
                    onClick={() => sortStudents('attendance')}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm",
                      sortOrder === 'attendance'
                        ? "bg-green-500 text-white"
                        : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                    )}
                  >
                    Sort by Attendance
                  </button>
                  <button
                    onClick={() => sortStudents('default')}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Reset Order
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-800/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">What to Observe</h4>
                <p className="text-amber-700 dark:text-amber-400 text-sm">
                  When sorting with <span className="font-semibold">index keys</span>, React reuses DOM elements incorrectly. 
                  With <span className="font-semibold">proper keys</span>, each student maintains their state (like attendance toggles) 
                  even when the list order changes.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Common Mistakes Section */}
        {activeSection === 4 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-red-500 mr-2">⚠️</span> Common Key Mistakes
              </h2>

              <div className="space-y-6">
                {/* Mistake 1: Index as Key */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-red-600 dark:text-red-400">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-800 dark:text-red-300">Mistake: Using Array Index as Key</h3>
                      <p className="text-red-700 dark:text-red-400 mt-2">
                        The most common and dangerous mistake that causes subtle bugs.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Problem</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-red-400 font-mono">
{`// ❌ Index changes when items are added/removed
{todos.map((todo, index) => (
  <TodoItem 
    key={index}      // Changes when list modifies!
    todo={todo}
  />
))}

// Adding item at beginning:
// Index 0 becomes new item
// Original item 0 becomes index 1
// React reuses wrong DOM elements!`}
                        </pre>
                      </div>
                      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                        <p className="text-sm text-red-800 dark:text-red-300 font-medium">What breaks:</p>
                        <ul className="text-sm text-red-700 dark:text-red-400 mt-1 space-y-1">
                          <li>• Form inputs get wrong values</li>
                          <li>• Component state gets mixed up</li>
                          <li>• Animations break</li>
                          <li>• Performance degrades</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Solution</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-green-400 font-mono">
{`// ✅ Use stable, unique identifier
{todos.map(todo => (
  <TodoItem 
    key={todo.id}    // Stable across renders
    todo={todo}
  />
))}

// If no id, generate one
{todos.map(todo => (
  <TodoItem 
    key={todo.id || todo.title + todo.createdAt}
    todo={todo}
  />
))}

// ✅ Index only for static lists
// (Never changes order, no add/remove)`}
                        </pre>
                      </div>
                      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-300 font-medium">When index is okay:</p>
                        <ul className="text-sm text-green-700 dark:text-green-400 mt-1 space-y-1">
                          <li>• Static lists (never changes)</li>
                          <li>• No state in list items</li>
                          <li>• No reordering needed</li>
                          <li>• Simple display only</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mistake 2: Non-unique Keys */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-yellow-600 dark:text-yellow-400">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">Mistake: Duplicate Keys</h3>
                      <p className="text-yellow-700 dark:text-yellow-400 mt-2">
                        Using the same key for multiple items causes React to merge elements incorrectly.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Problem</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-red-400 font-mono">
{`// ❌ Multiple items with same key
const items = [
  { id: 1, name: 'Apple' },
  { id: 1, name: 'Orange' }, // Same ID!
  { id: 2, name: 'Banana' }
];

{items.map(item => (
  <Fruit key={item.id} fruit={item} />
))}

// React will:
// 1. Merge Apple and Orange
// 2. Show only one of them
// 3. Warning in console`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Solution</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-green-400 font-mono">
{`// ✅ Ensure uniqueness
const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Orange' },
  { id: 3, name: 'Banana' }
];

// If data has duplicates, fix at source
const uniqueItems = [...new Map(
  items.map(item => [item.id, item])
).values()];

// Or use composite keys
{items.map((item, index) => (
  <Fruit key={\`\${item.id}-\${index}\`} fruit={item} />
))}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mistake 3: Unstable Keys */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-purple-600 dark:text-purple-400">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">Mistake: Unstable/Changing Keys</h3>
                      <p className="text-purple-700 dark:text-purple-400 mt-2">
                        Keys that change between renders cause React to recreate DOM elements unnecessarily.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Problem</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-red-400 font-mono">
{`// ❌ Key changes every render
{messages.map(message => (
  <Message 
    key={Math.random()}  // New key every time!
    message={message}
  />
))}

// ❌ Key based on unstable value
{messages.map(message => (
  <Message 
    key={message.timestamp}  // Might change
    message={message}
  />
))}

// React will:
// 1. Destroy and recreate elements
// 2. Lose component state
// 3. Break animations`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Solution</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-green-400 font-mono">
{`// ✅ Use stable identifiers
{messages.map(message => (
  <Message 
    key={message.id}  // Stable ID
    message={message}
  />
))}

// ✅ Generate stable key if needed
const generateStableKey = (item) => {
  // Use multiple properties for stability
  return \`\${item.type}-\${item.createdAt}-\${item.content.hashCode()}\`;
};

{messages.map(message => (
  <Message 
    key={generateStableKey(message)}
    message={message}
  />
))}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Mistakes */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-3">⚠️ Missing Keys</h4>
                    <div className="space-y-3">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <pre className="text-sm text-red-700 dark:text-red-400">
{`// ❌ No key at all
items.map(item => <Component item={item} />)`}
                        </pre>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        React will warn you in development, but it's easy to miss in production.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-3">⚠️ Keys on Wrong Element</h4>
                    <div className="space-y-3">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <pre className="text-sm text-yellow-700 dark:text-yellow-400">
{`// ❌ Key on div instead of Component
<div key={item.id}>
  <Component item={item} />
</div>`}
                        </pre>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Put keys on the component being mapped, not wrapper elements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Best Practices Section */}
        {activeSection === 5 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-green-500 mr-2">✅</span> Best Practices for Keys
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Guidelines */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-green-800 dark:text-emerald-300 mb-4">Choosing Good Keys</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-emerald-500">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-emerald-400">Use Existing IDs</p>
                          <p className="text-sm text-green-600 dark:text-emerald-500">
                            Database IDs, UUIDs, or any stable unique identifier
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-emerald-500">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-emerald-400">Generate if Needed</p>
                          <p className="text-sm text-green-600 dark:text-emerald-500">
                            Use <code>crypto.randomUUID()</code> or <code>Date.now()</code> + counter
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-emerald-500">3</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-emerald-400">Composite Keys</p>
                          <p className="text-sm text-green-600 dark:text-emerald-500">
                            Combine multiple fields: <code>{`\${type}-\${id}-\${timestamp}`}</code>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-emerald-500">4</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-emerald-400">Avoid These</p>
                          <p className="text-sm text-green-600 dark:text-emerald-500">
                            Math.random(), array index (for dynamic lists), unstable values
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Key Selection Flowchart</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <p>1. Does item have a unique ID? → Use it</p>
                        <p>2. Is list static? → Index is okay</p>
                        <p>3. Can you add ID at data source? → Do it</p>
                        <p>4. Otherwise → Generate stable composite key</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">Debugging Key Issues</h3>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400">React DevTools</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-500">
                          Use "Highlight updates when components render" to see unnecessary re-renders
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400">Console Warnings</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-500">
                          Never ignore "Each child in a list should have a unique 'key' prop"
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400">Strict Mode</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-500">
                          React StrictMode helps catch key-related bugs during development
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Code Examples */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Proper Key Examples</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">API Data with IDs</h4>
                        <div className="bg-gray-900 p-4 rounded-lg">
                          <pre className="text-sm text-green-400 font-mono">
{`// ✅ Data from backend usually has IDs
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

// ✅ For nested lists
const TeamList = ({ teams }) => {
  return (
    <div>
      {teams.map(team => (
        <div key={team.id}>
          <h3>{team.name}</h3>
          <ul>
            {team.members.map(member => (
              <li key={\`team-\${team.id}-member-\${member.id}\`}>
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Generated Keys</h4>
                        <div className="bg-gray-900 p-4 rounded-lg">
                          <pre className="text-sm text-green-400 font-mono">
{`// ✅ When you need to generate keys
import { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(), // Stable unique ID
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}  // ✅ Stable key
          todo={todo}
        />
      ))}
    </ul>
  );
};

// ✅ Composite key for data without IDs
const LogList = ({ logs }) => {
  return (
    <ul>
      {logs.map((log, index) => (
        <li key={\`\${log.timestamp}-\${log.type}-\${index}\`}>
          {log.message}
        </li>
      ))}
    </ul>
  );
};`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-4">Performance Tips</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">⚡</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Use Production Build</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            Development warnings add overhead - test in production mode
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">📊</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Profile Performance</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            Use React DevTools Profiler to identify key-related performance issues
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">🧪</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Test Edge Cases</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            Always test adding, removing, and reordering list items
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl overflow-hidden animate-[slideUp_0.8s_ease-out_0.6s]">
              <div className="p-6 md:p-8 text-white">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl md:text-3xl">👨‍🏫</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold">Teacher's Note</h3>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Sukanta Hui | 27 years experience
                      </span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-white/90 leading-relaxed">
                        In my 27 years of teaching programming from Barrackpore to Naihati, I've found that 
                        understanding keys is one of the most important React concepts. Students like 
                        <span className="font-semibold"> Swadeep </span> often think keys are optional 
                        until they encounter strange bugs in their applications.
                      </p>
                      <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <h4 className="font-bold mb-2">Golden Rule to Remember:</h4>
                        <p className="text-white/90">
                          "Keys are like student roll numbers. Without them, the teacher (React) can't tell 
                          who's who when students change seats. With proper roll numbers, everyone keeps 
                          their identity no matter where they sit."
                        </p>
                      </div>
                      <p className="text-white/90">
                        When <span className="font-semibold">Abhronila</span> was debugging a form that kept 
                        losing values, we discovered she was using index as key. After switching to proper 
                        IDs, the bug vanished instantly. This is why I always say: "If your list can change 
                        (add, remove, reorder), never use index as key."
                      </p>
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-sm text-white/80">
                          Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Learning Checklist</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Understanding Check</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-amber-600 rounded" />
                      <div>
                        <p className="font-medium">I understand why React needs keys for lists</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For efficient updates and state preservation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-amber-600 rounded" />
                      <div>
                        <p className="font-medium">I can explain the problem with index keys</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Keys change when list modifies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-amber-600 rounded" />
                      <div>
                        <p className="font-medium">I know what makes a good key</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Stable, unique, predictable</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Skill Practice</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                      <div>
                        <p className="font-medium">I can fix index key usage in existing code</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Replace with proper keys</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                      <div>
                        <p className="font-medium">I can generate proper keys when needed</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Using IDs or composite keys</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                      <div>
                        <p className="font-medium">I can debug key-related issues</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Using React warnings and DevTools</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Hint Section</h3>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-800/20 rounded-lg p-4">
                  <p className="text-amber-800 dark:text-amber-300 italic">
                    Think about: What happens to Debangshu's attendance toggle when you shuffle the list with index keys?
                    Observe carefully how the task list maintains completed state with proper keys vs index keys.
                    Try adding a student at the beginning of the list and watch how keys affect React's updates.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.2s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.6s\\] {
            animation: none !important;
            opacity: 1;
            transform: none !important;
          }
        }
        
        /* Hide scrollbar for navigation */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Topic27;