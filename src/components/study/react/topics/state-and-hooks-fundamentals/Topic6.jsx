import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

// Simple Counter Component
const CounterExample = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
    )}>
      <h4 className="font-bold mb-4 text-blue-400">🔢 Simple Counter</h4>
      
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-blue-300 mb-2">{count}</div>
        <div className="text-sm opacity-70">Current Count Value</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setCount(count - 1)}
          className="py-3 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="py-3 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
        >
          Increment
        </button>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setCount(0)}
          className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
        >
          Reset to 0
        </button>
        <button
          onClick={() => setCount(100)}
          className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg"
        >
          Set to 100
        </button>
      </div>
    </div>
  );
};

// Toggle Component
const ToggleExample = () => {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-green-900/20 to-teal-900/20"
    )}>
      <h4 className="font-bold mb-4 text-green-400">🔘 Toggle Switch</h4>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-2xl font-bold">{isOn ? 'ON' : 'OFF'}</div>
          <div className="text-sm opacity-70">Current State</div>
        </div>
        
        <div className="relative">
          <div 
            className={clsx(
              "w-16 h-8 rounded-full transition-all duration-300 cursor-pointer",
              isOn ? "bg-green-500" : "bg-gray-600"
            )}
            onClick={() => setIsOn(!isOn)}
          >
            <div 
              className={clsx(
                "absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300",
                isOn ? "left-9" : "left-1"
              )}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => setIsOn(true)}
          className="w-full py-2 bg-green-600 hover:bg-green-500 rounded-lg"
        >
          Turn ON
        </button>
        <button
          onClick={() => setIsOn(false)}
          className="w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg"
        >
          Turn OFF
        </button>
        <button
          onClick={() => setIsOn(prev => !prev)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
        >
          Toggle
        </button>
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-gray-800/30">
        <div className="text-sm">
          <span className="font-semibold">State declaration:</span>{' '}
          <code className="text-green-400">const [isOn, setIsOn] = useState(false)</code>
        </div>
      </div>
    </div>
  );
};

// User Profile Component
const UserProfileExample = () => {
  const [user, setUser] = useState({
    name: 'Swadeep',
    age: 21,
    location: 'Barrackpore',
    isStudent: true
  });
  
  const [editing, setEditing] = useState(false);
  
  const updateField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-purple-900/20 to-pink-900/20"
    )}>
      <h4 className="font-bold mb-4 text-purple-400">👤 User Profile Object</h4>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm opacity-70">Name</div>
            {editing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="px-3 py-1 rounded bg-gray-800 border border-gray-700"
              />
            ) : (
              <div className="font-bold text-lg">{user.name}</div>
            )}
          </div>
          <button
            onClick={() => updateField('isStudent', !user.isStudent)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm",
              user.isStudent 
                ? "bg-green-900/50 text-green-300" 
                : "bg-red-900/50 text-red-300"
            )}
          >
            {user.isStudent ? 'Student' : 'Not Student'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm opacity-70">Age</div>
            {editing ? (
              <input
                type="number"
                value={user.age}
                onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-1 rounded bg-gray-800 border border-gray-700"
              />
            ) : (
              <div className="font-bold text-lg">{user.age}</div>
            )}
          </div>
          
          <div>
            <div className="text-sm opacity-70">Location</div>
            {editing ? (
              <select
                value={user.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="w-full px-3 py-1 rounded bg-gray-800 border border-gray-700"
              >
                <option value="Barrackpore">Barrackpore</option>
                <option value="Shyamnagar">Shyamnagar</option>
                <option value="Ichapur">Ichapur</option>
                <option value="Naihati">Naihati</option>
              </select>
            ) : (
              <div className="font-bold text-lg">{user.location}</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setEditing(!editing)}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
        >
          {editing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => setUser({
            name: 'Swadeep',
            age: 21,
            location: 'Barrackpore',
            isStudent: true
          })}
          className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-gray-800/30">
        <div className="text-sm font-mono">
          <div>State is an <span className="text-purple-400">object</span>:</div>
          <div className="text-purple-300">{JSON.stringify(user, null, 2)}</div>
        </div>
      </div>
    </div>
  );
};

// Todo List Component
const TodoListExample = () => {
  const [todos, setTodos] = useState([
    'Learn useState hook',
    'Build a project',
    'Practice with examples'
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [completed, setCompleted] = useState([false, false, false]);
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setCompleted([...completed, false]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };
  
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    const newCompleted = completed.filter((_, i) => i !== index);
    setTodos(newTodos);
    setCompleted(newCompleted);
  };
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-orange-900/20 to-red-900/20"
    )}>
      <h4 className="font-bold mb-4 text-orange-400">📝 Todo List Array</h4>
      
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTodo(index)}
                className={clsx(
                  "w-5 h-5 rounded border flex items-center justify-center",
                  completed[index] 
                    ? "bg-green-500 border-green-500" 
                    : "border-gray-400"
                )}
              >
                {completed[index] && '✓'}
              </button>
              <span className={completed[index] ? 'line-through opacity-60' : ''}>
                {todo}
              </span>
            </div>
            <button
              onClick={() => removeTodo(index)}
              className="text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 rounded-lg bg-gray-800/30">
          <div className="text-2xl font-bold text-blue-300">{todos.length}</div>
          <div className="text-sm opacity-70">Total Todos</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-gray-800/30">
          <div className="text-2xl font-bold text-green-300">
            {completed.filter(c => c).length}
          </div>
          <div className="text-sm opacity-70">Completed</div>
        </div>
      </div>
    </div>
  );
};

// useState Anatomy Visualizer
const UseStateAnatomy = () => {
  const [selectedPart, setSelectedPart] = useState('declaration');
  
  const parts = [
    {
      id: 'declaration',
      title: 'Declaration',
      code: 'const [state, setState]',
      description: 'Destructure array returned by useState',
      color: 'blue'
    },
    {
      id: 'stateVar',
      title: 'State Variable',
      code: 'state',
      description: 'Current state value (read-only)',
      color: 'green'
    },
    {
      id: 'setter',
      title: 'Setter Function',
      code: 'setState',
      description: 'Function to update state',
      color: 'purple'
    },
    {
      id: 'initial',
      title: 'Initial Value',
      code: 'useState(initialValue)',
      description: 'Starting value (only on first render)',
      color: 'orange'
    }
  ];
  
  const selected = parts.find(p => p.id === selectedPart);
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
    )}>
      <h4 className="font-bold mb-4 text-cyan-400">🔍 useState Anatomy</h4>
      
      <div className="mb-6">
        <div className={clsx(
          "p-4 rounded-lg font-mono text-center text-lg",
          "bg-gray-800/50 border-2 border-cyan-500/30"
        )}>
          <span className="text-cyan-300">const [</span>
          <span 
            className={clsx(
              "cursor-pointer hover:underline",
              selectedPart === 'stateVar' ? "text-green-400 font-bold" : "text-green-300"
            )}
            onClick={() => setSelectedPart('stateVar')}
          >
            state
          </span>
          <span className="text-cyan-300">, </span>
          <span 
            className={clsx(
              "cursor-pointer hover:underline",
              selectedPart === 'setter' ? "text-purple-400 font-bold" : "text-purple-300"
            )}
            onClick={() => setSelectedPart('setter')}
          >
            setState
          </span>
          <span className="text-cyan-300">] = </span>
          <span className="text-yellow-300">useState</span>
          <span className="text-cyan-300">(</span>
          <span 
            className={clsx(
              "cursor-pointer hover:underline",
              selectedPart === 'initial' ? "text-orange-400 font-bold" : "text-orange-300"
            )}
            onClick={() => setSelectedPart('initial')}
          >
            initialValue
          </span>
          <span className="text-cyan-300">)</span>
          <span 
            className={clsx(
              "cursor-pointer hover:underline ml-4 text-sm",
              selectedPart === 'declaration' ? "text-blue-400 font-bold" : "text-blue-300"
            )}
            onClick={() => setSelectedPart('declaration')}
          >
            // Declaration
          </span>
        </div>
      </div>
      
      <div className={clsx(
        "p-4 rounded-lg",
        `bg-${selected.color}-900/20`
      )}>
        <div className="flex items-center gap-3 mb-3">
          <div className={clsx(
            "px-3 py-1 rounded-full text-sm font-bold",
            `bg-${selected.color}-900/50 text-${selected.color}-300`
          )}>
            {selected.title}
          </div>
          <div className="font-mono text-lg">{selected.code}</div>
        </div>
        <p className="opacity-90">{selected.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        {parts.map(part => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(part.id)}
            className={clsx(
              "p-3 rounded-lg text-left transition-all duration-300",
              "hover:scale-[1.02]",
              selectedPart === part.id
                ? `bg-${part.color}-600/30 border-2 border-${part.color}-500/50`
                : "bg-gray-800/30"
            )}
          >
            <div className={clsx(
              "font-bold mb-1",
              `text-${part.color}-400`
            )}>
              {part.title}
            </div>
            <div className="text-sm opacity-70">{part.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Common Mistakes Examples
const CommonMistakes = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Tuhina', score: 0 });
  const [mistakeType, setMistakeType] = useState('directMutation');
  
  const mistakes = [
    {
      id: 'directMutation',
      title: 'Direct Mutation',
      description: 'Modifying state directly instead of using setter',
      badCode: 'count = count + 1',
      goodCode: 'setCount(count + 1)',
      color: 'red'
    },
    {
      id: 'asyncUpdate',
      title: 'Async Update Assumption',
      description: 'Expecting immediate update after setState',
      badCode: 'setCount(count + 1); console.log(count)',
      goodCode: 'setCount(prev => prev + 1); useEffect(() => { console.log(count) }, [count])',
      color: 'orange'
    },
    {
      id: 'objectMutation',
      title: 'Object Mutation',
      description: 'Mutating objects/arrays instead of creating new ones',
      badCode: 'user.score = 10',
      goodCode: 'setUser({ ...user, score: 10 })',
      color: 'yellow'
    },
    {
      id: 'multipleUpdates',
      title: 'Multiple Synchronous Updates',
      description: 'Calling setState multiple times in sequence',
      badCode: 'setCount(count + 1); setCount(count + 1)',
      goodCode: 'setCount(prev => prev + 2)',
      color: 'purple'
    }
  ];
  
  const selectedMistake = mistakes.find(m => m.id === mistakeType);
  
  return (
    <div className={clsx(
      "rounded-xl p-5",
      "bg-gradient-to-br from-red-900/20 to-orange-900/20"
    )}>
      <h4 className="font-bold mb-4 text-red-400">🚫 Common useState Mistakes</h4>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {mistakes.map(mistake => (
          <button
            key={mistake.id}
            onClick={() => setMistakeType(mistake.id)}
            className={clsx(
              "px-3 py-2 rounded-lg text-sm transition-all duration-300",
              "hover:scale-105",
              mistakeType === mistake.id
                ? `bg-${mistake.color}-600 text-white` 
                : `bg-gray-700 hover:bg-gray-600`
            )}
          >
            {mistake.title}
          </button>
        ))}
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="font-bold mb-2 text-red-300">❌ Common Mistake:</div>
          <div className={clsx(
            "p-3 rounded-lg font-mono text-sm",
            "bg-gray-800 border-l-4 border-red-500"
          )}>
            <code className="text-red-400">{selectedMistake.badCode}</code>
          </div>
        </div>
        
        <div>
          <div className="font-bold mb-2 text-green-300">✅ Correct Approach:</div>
          <div className={clsx(
            "p-3 rounded-lg font-mono text-sm",
            "bg-gray-800 border-l-4 border-green-500"
          )}>
            <code className="text-green-400">{selectedMistake.goodCode}</code>
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-gray-800/30">
          <div className="text-sm">
            <span className="font-semibold">Why this matters:</span>{' '}
            {selectedMistake.description}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 rounded-lg bg-gray-800/30">
          <div className="text-2xl font-bold text-blue-300">{count}</div>
          <div className="text-sm opacity-70">Counter State</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-gray-800/30">
          <div className="text-2xl font-bold text-green-300">{user.score}</div>
          <div className="text-sm opacity-70">User Score</div>
        </div>
      </div>
    </div>
  );
};

const Topic6 = () => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('basics');
  const [selectedDataType, setSelectedDataType] = useState('number');
  
  // Multiple state examples for demonstration
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState('Hello React!');
  const [isActive, setIsActive] = useState(true);
  const [numberList, setNumberList] = useState([1, 2, 3]);
  const [userData, setUserData] = useState({
    username: 'abhronila',
    email: 'abhronila@example.com',
    role: 'student'
  });
  
  // Render counter
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });
  
  // Data types for useState
  const dataTypes = [
    {
      type: 'number',
      example: 'const [count, setCount] = useState(0)',
      useCase: 'Counters, scores, ratings',
      icon: '🔢',
      color: 'blue'
    },
    {
      type: 'string',
      example: 'const [name, setName] = useState("")',
      useCase: 'Text inputs, messages, labels',
      icon: '📝',
      color: 'green'
    },
    {
      type: 'boolean',
      example: 'const [isOpen, setIsOpen] = useState(false)',
      useCase: 'Toggles, switches, flags',
      icon: '🔘',
      color: 'purple'
    },
    {
      type: 'array',
      example: 'const [items, setItems] = useState([])',
      useCase: 'Lists, collections, todo items',
      icon: '📋',
      color: 'orange'
    },
    {
      type: 'object',
      example: 'const [user, setUser] = useState({})',
      useCase: 'Forms, user profiles, settings',
      icon: '👤',
      color: 'pink'
    },
    {
      type: 'null',
      example: 'const [data, setData] = useState(null)',
      useCase: 'Loading states, optional data',
      icon: '❓',
      color: 'gray'
    }
  ];
  
  // Basic syntax breakdown
  const syntaxParts = [
    { part: 'const', description: 'Variable declaration - state is constant reference', color: 'blue' },
    { part: '[state, setState]', description: 'Array destructuring - get value and setter', color: 'green' },
    { part: '=', description: 'Assignment operator', color: 'gray' },
    { part: 'useState', description: 'React hook function', color: 'purple' },
    { part: '(initialValue)', description: 'Initial state value (first render only)', color: 'orange' }
  ];
  
  // Lazy initialization example
  const expensiveInitialization = () => {
    console.log('Expensive calculation running...');
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return Math.floor(result);
  };
  
  // Regular initialization (runs on every render)
  const [regularState] = useState(expensiveInitialization());
  
  // Lazy initialization (function runs once)
  const [lazyState] = useState(() => {
    console.log('Lazy initialization running...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return Math.floor(result);
  });
  
  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-sky-50 to-gray-100 text-gray-900"
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
                useState Hook: React's State Foundation 🏗️
              </h1>
              <p className={clsx(
                "mt-1 text-sm transition-all duration-500",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Topic 6: Introduction to the useState Hook
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
              : "bg-gradient-to-r from-white to-sky-50 shadow-xl"
          )}>
            <h2 className="text-4xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
              Meet useState: Your First React Hook 🎣
            </h2>
            <p className={clsx(
              "text-lg mb-6 leading-relaxed transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              <span className="font-bold text-sky-400">useState</span> is the most fundamental React hook. 
              It allows functional components to have <span className="font-bold text-green-400">state</span> - 
              data that changes over time and causes the component to re-render.
            </p>
            
            <div className="grid md:grid-cols-1 gap-6 mt-8">
              {/* Simple Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-sky-500 animate-[slideUp_1.2s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-sky-50"
              )}>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-sky-400">Simple to Use</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  One line gives you state management. Perfect for beginners at 
                  <span className="font-semibold"> Barrackpore Coding School</span>.
                </p>
              </div>

              {/* Versatile Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-green-500 animate-[slideUp_1.4s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-green-50"
              )}>
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">Incredibly Versatile</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Handles numbers, strings, booleans, arrays, objects - any data type 
                  <span className="font-semibold"> Swadeep</span> needs.
                </p>
              </div>

              {/* Foundation Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-purple-500 animate-[slideUp_1.6s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-purple-50"
              )}>
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Foundation Hook</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Master useState first, then other hooks become much easier to understand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 animate-[slideUp_1s_ease-out]">
          <button
            onClick={() => setActiveTab('basics')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'basics'
                ? isDarkMode 
                  ? "bg-sky-600 text-white" 
                  : "bg-sky-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            🏗️ Basics & Syntax
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
            onClick={() => setActiveTab('patterns')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'patterns'
                ? isDarkMode 
                  ? "bg-purple-600 text-white" 
                  : "bg-purple-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            💡 Patterns & Tips
          </button>
        </div>

        {/* Basics & Syntax Section */}
        {activeTab === 'basics' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              useState Basics & Syntax 🏗️
            </h2>
            
            <div className={clsx(
              "rounded-2xl p-8 mb-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-sky-50"
            )}>
              <h3 className="text-2xl font-bold mb-6 text-sky-400">
                Basic Syntax Breakdown
              </h3>
              
              <div className="mb-8">
                <div className={clsx(
                  "p-6 rounded-lg font-mono text-xl text-center",
                  "bg-gray-800/50 border-2 border-sky-500/30"
                )}>
                  <span className="text-blue-400">const</span>{' '}
                  <span className="text-green-400">[state, setState]</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-purple-400">useState</span>
                  <span className="text-orange-400">(initialValue)</span>
                </div>
                
                <div className="grid md:grid-cols-5 gap-4 mt-6">
                  {syntaxParts.map((part, index) => (
                    <div
                      key={part.part}
                      className={clsx(
                        "p-4 rounded-lg text-center transition-all duration-300",
                        "hover:scale-105",
                        `bg-${part.color}-900/20`
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={clsx(
                        "font-bold mb-2",
                        `text-${part.color}-400`
                      )}>
                        {part.part}
                      </div>
                      <div className="text-sm opacity-70">{part.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Data Types */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-green-400">
                  Data Types for useState
                </h3>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  {dataTypes.map((dataType, index) => (
                    <button
                      key={dataType.type}
                      onClick={() => setSelectedDataType(dataType.type)}
                      className={clsx(
                        "p-4 rounded-lg text-left transition-all duration-300",
                        "hover:scale-[1.03] hover:-translate-y-1",
                        selectedDataType === dataType.type
                          ? `border-2 border-${dataType.color}-500 bg-${dataType.color}-900/20`
                          : "border border-gray-700 bg-gray-800/30"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{dataType.icon}</div>
                        <div className={clsx(
                          "font-bold capitalize",
                          `text-${dataType.color}-400`
                        )}>
                          {dataType.type}
                        </div>
                      </div>
                      <div className="font-mono text-sm mb-2">{dataType.example}</div>
                      <div className="text-sm opacity-70">{dataType.useCase}</div>
                    </button>
                  ))}
                </div>
                
                {/* Selected Data Type Details */}
                <div className={clsx(
                  "p-6 rounded-lg",
                  `bg-${dataTypes.find(d => d.type === selectedDataType)?.color}-900/10`
                )}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">
                      {dataTypes.find(d => d.type === selectedDataType)?.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold capitalize">
                        {selectedDataType} State Example
                      </h4>
                      <p className="opacity-70">
                        {selectedDataType === 'number' && "Perfect for counters, scores, and ratings"}
                        {selectedDataType === 'string' && "Ideal for text inputs, messages, and labels"}
                        {selectedDataType === 'boolean' && "Great for toggles, switches, and flags"}
                        {selectedDataType === 'array' && "Best for lists, collections, and todo items"}
                        {selectedDataType === 'object' && "Excellent for forms, user profiles, and settings"}
                        {selectedDataType === 'null' && "Useful for loading states and optional data"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-1 gap-6">
                    <div>
                      <div className="font-bold mb-2">Declaration:</div>
                      <div className={clsx(
                        "p-4 rounded-lg font-mono",
                        "bg-gray-800/50"
                      )}>
                        <code className={clsx(
                          `text-${dataTypes.find(d => d.type === selectedDataType)?.color}-300`
                        )}>
                          {dataTypes.find(d => d.type === selectedDataType)?.example}
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-bold mb-2">Real Example:</div>
                      <div className="p-4 rounded-lg bg-gray-800/30">
                        {selectedDataType === 'number' && (
                          <div>
                            <div className="text-sm opacity-70">Tracking <span className="font-semibold">Debangshu</span>'s quiz score at Ichapur Institute</div>
                            <div className="font-mono mt-2 text-green-400">const [score, setScore] = useState(0)</div>
                          </div>
                        )}
                        {selectedDataType === 'string' && (
                          <div>
                            <div className="text-sm opacity-70">Storing <span className="font-semibold">Tuhina</span>'s name in a form input</div>
                            <div className="font-mono mt-2 text-green-400">const [name, setName] = useState("Tuhina")</div>
                          </div>
                        )}
                        {selectedDataType === 'boolean' && (
                          <div>
                            <div className="text-sm opacity-70">Controlling modal visibility in <span className="font-semibold">Swadeep</span>'s app</div>
                            <div className="font-mono mt-2 text-green-400">const [isModalOpen, setIsModalOpen] = useState(false)</div>
                          </div>
                        )}
                        {selectedDataType === 'array' && (
                          <div>
                            <div className="text-sm opacity-70">Managing <span className="font-semibold">Abhronila</span>'s shopping cart items</div>
                            <div className="font-mono mt-2 text-green-400">const [cartItems, setCartItems] = useState([])</div>
                          </div>
                        )}
                        {selectedDataType === 'object' && (
                          <div>
                            <div className="text-sm opacity-70">Storing user profile at <span className="font-semibold">Barrackpore School</span></div>
                            <div className="font-mono mt-2 text-green-400">
                                <code>
                                {`const [user, setUser] = useState({ name: "", age: 0 })`}
                                </code>
                            </div>
                          </div>
                        )}
                        {selectedDataType === 'null' && (
                          <div>
                            <div className="text-sm opacity-70">Handloading loading state for API data</div>
                            <div className="font-mono mt-2 text-green-400">const [userData, setUserData] = useState(null)</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Anatomy Visualizer */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-purple-400">
                  useState Anatomy Visualizer
                </h3>
                <UseStateAnatomy />
              </div>
              
              {/* Initialization Methods */}
              <div className={clsx(
                "p-6 rounded-lg",
                "bg-gradient-to-br from-orange-900/20 to-yellow-900/20"
              )}>
                <h3 className="text-2xl font-bold mb-6 text-orange-400">
                  Initialization: Regular vs Lazy
                </h3>
                
                <div className="grid md:grid-cols-1 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold mb-3 text-red-400">Regular Initialization</h4>
                    <div className={clsx(
                      "p-4 rounded-lg font-mono mb-4",
                      "bg-gray-800/50"
                    )}>
                      <code className="text-red-400">const [state, setState] = useState(expensiveInitialization())</code>
                    </div>
                    <div className="text-sm opacity-70">
                      ❌ Runs on every render, even if state doesn't change
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-3 text-green-400">Lazy Initialization</h4>
                    <div className={clsx(
                      "p-4 rounded-lg font-mono mb-4",
                      "bg-gray-800/50"
                    )}>
                      <code className="text-green-400">const [state, setState] = useState(() => expensiveInitialization())</code>
                    </div>
                    <div className="text-sm opacity-70">
                      ✅ Function runs only on initial render
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gray-800/30">
                    <div className="text-2xl font-bold text-blue-300">{regularState}</div>
                    <div className="text-sm opacity-70">Regular State</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-800/30">
                    <div className="text-2xl font-bold text-green-300">{lazyState}</div>
                    <div className="text-sm opacity-70">Lazy State</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 rounded-lg bg-gray-800/30">
                  <div className="text-sm">
                    <span className="font-semibold">Note:</span> Both give same result, but lazy initialization 
                    is more efficient for expensive computations. Check console for logs.
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
              Interactive useState Demos 🎮
            </h2>
            
            <div className={clsx(
              "rounded-2xl p-8 mb-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-green-50"
            )}>
              <h3 className="text-2xl font-bold mb-6 text-green-400">
                Basic useState Examples
              </h3>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <CounterExample />
                <ToggleExample />
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <UserProfileExample />
                <TodoListExample />
              </div>
              
              {/* Multiple State Variables */}
              <div className={clsx(
                "rounded-xl p-5 mb-8",
                "bg-gradient-to-br from-indigo-900/20 to-blue-900/20"
              )}>
                <h4 className="font-bold mb-4 text-indigo-400">🎯 Multiple State Variables</h4>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 rounded-lg bg-gray-800/30">
                    <div className="text-3xl font-bold text-blue-300 mb-2">{counter}</div>
                    <div className="text-sm opacity-70 mb-3">Counter (number)</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCounter(c => c - 1)}
                        className="flex-1 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setCounter(c => c + 1)}
                        className="flex-1 py-1 bg-green-600 hover:bg-green-500 rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-gray-800/30">
                    <div className="text-xl font-bold text-green-300 mb-2">{text}</div>
                    <div className="text-sm opacity-70 mb-3">Text (string)</div>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full px-3 py-1 rounded bg-gray-800 border border-gray-700 text-sm"
                    />
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-gray-800/30">
                    <div className="text-3xl font-bold text-purple-300 mb-2">
                      {isActive ? '✅' : '❌'}
                    </div>
                    <div className="text-sm opacity-70 mb-3">Active (boolean)</div>
                    <button
                      onClick={() => setIsActive(!isActive)}
                      className="w-full py-1 bg-purple-600 hover:bg-purple-500 rounded text-sm"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-gray-800/30">
                  <div className="font-bold mb-2">Component Code:</div>
                  <div className="font-mono text-sm space-y-1">
                    <div className="text-blue-400">const [counter, setCounter] = useState(0)</div>
                    <div className="text-green-400">const [text, setText] = useState('Hello React!')</div>
                    <div className="text-purple-400">const [isActive, setIsActive] = useState(true)</div>
                    <div className="text-orange-400">const [numberList, setNumberList] = useState([1, 2, 3])</div>
                    <div className="text-pink-400">const [userData, setUserData] = useState({"{"}...{"}"})</div>
                  </div>
                </div>
              </div>
              
              {/* Common Mistakes */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-red-400">
                  Common useState Mistakes
                </h3>
                <CommonMistakes />
              </div>
            </div>
          </section>
        )}

        {/* Patterns & Tips Section */}
        {activeTab === 'patterns' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              useState Patterns & Tips 💡
            </h2>
            
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-purple-50"
            )}>
              {/* Best Practices */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-green-400">
                  ✅ Best Practices
                </h3>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div className={clsx(
                    "p-5 rounded-xl",
                    "bg-gradient-to-br from-green-900/20 to-teal-900/20"
                  )}>
                    <h4 className="font-bold mb-3 text-green-400">Use Descriptive Names</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400">❌</span>
                        <div>
                          <div className="font-mono text-sm text-red-300">const [x, setX] = useState(0)</div>
                          <div className="text-xs opacity-70">What does x represent?</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400">✅</span>
                        <div>
                          <div className="font-mono text-sm text-green-300">const [score, setScore] = useState(0)</div>
                          <div className="text-xs opacity-70">Clear what it represents</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    "bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
                  )}>
                    <h4 className="font-bold mb-3 text-blue-400">Group Related State</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400">❌</span>
                        <div>
                          <div className="font-mono text-sm text-red-300">
                            const [name, setName] = useState('')<br/>
                            const [email, setEmail] = useState('')<br/>
                            const [age, setAge] = useState(0)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400">✅</span>
                        <div>
                          <div className="font-mono text-sm text-green-300">
                            const [user, setUser] = useState({"{"}<br/>
                            &nbsp;&nbsp;name: '',<br/>
                            &nbsp;&nbsp;email: '',<br/>
                            &nbsp;&nbsp;age: 0<br/>
                            {"}"})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    "bg-gradient-to-br from-purple-900/20 to-pink-900/20"
                  )}>
                    <h4 className="font-bold mb-3 text-purple-400">Use Functional Updates</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400">❌</span>
                        <div>
                          <div className="font-mono text-sm text-red-300">
                            setCount(count + 1)<br/>
                            setCount(count + 1) // May not work as expected
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400">✅</span>
                        <div>
                          <div className="font-mono text-sm text-green-300">
                            setCount(prev => prev + 1)<br/>
                            setCount(prev => prev + 1) // Works correctly
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    "bg-gradient-to-br from-orange-900/20 to-yellow-900/20"
                  )}>
                    <h4 className="font-bold mb-3 text-orange-400">Lazy Initialization</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400">❌</span>
                        <div>
                          <div className="font-mono text-sm text-red-300">
                            const [data, setData] = useState(expensiveCalculation())
                          </div>
                          <div className="text-xs opacity-70">Runs on every render</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400">✅</span>
                        <div>
                          <div className="font-mono text-sm text-green-300">
                            const [data, setData] = useState(() => expensiveCalculation())
                          </div>
                          <div className="text-xs opacity-70">Runs only once</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Patterns */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-blue-400">
                  🔄 Common useState Patterns
                </h3>
                
                <div className="space-y-6">
                  <div className={clsx(
                    "p-5 rounded-xl",
                    "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
                  )}>
                    <h4 className="font-bold mb-3 text-blue-400">Toggle Pattern</h4>
                    <div className="grid md:grid-cols-1 gap-6">
                      <div>
                        <div className="font-mono text-sm mb-3 text-green-400">
                            <code>
                                {`const [isOpen, setIsOpen] = useState(false)`}<br/><br/>
                                {`const toggle = () => {"{"}`}<br/>
                                {`&nbsp;&nbsp;setIsOpen(prev => !prev)`}<br/>
                                {`{"}"}`}
                          </code>
                        </div>
                        <div className="text-sm opacity-70">
                          Perfect for modals, dropdowns, accordions
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => setIsActive(!isActive)}
                          className={clsx(
                            "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                            isActive 
                              ? "bg-green-600 hover:bg-green-500" 
                              : "bg-red-600 hover:bg-red-500"
                          )}
                        >
                          {isActive ? 'Open' : 'Closed'}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    "bg-gradient-to-br from-green-900/20 to-teal-900/20"
                  )}>
                    <h4 className="font-bold mb-3 text-green-400">Form Pattern</h4>
                    <div className="grid md:grid-cols-1 gap-6">
                      <div>
                        <div className="font-mono text-sm mb-3 text-green-400">
                          const [form, setForm] = useState({"{"}<br/>
                          &nbsp;&nbsp;name: '',<br/>
                          &nbsp;&nbsp;email: '',<br/>
                          &nbsp;&nbsp;message: ''<br/>
                          {"}"})<br/><br/>
                          const handleChange = (e) => {"{"}<br/>
                          &nbsp;&nbsp;setForm(prev => ({"{"}<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;...prev,<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;[e.target.name]: e.target.value<br/>
                          &nbsp;&nbsp;{"}"}))<br/>
                          {"}"}
                        </div>
                      </div>
                      <div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                          />
                          <textarea
                            placeholder="Message"
                            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                            rows="3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    "bg-gradient-to-br from-purple-900/20 to-pink-900/20"
                  )}>
                    <h4 className="font-bold mb-3 text-purple-400">Loading State Pattern</h4>
                    <div className="grid md:grid-cols-1 gap-6">
                      <div>
                        <div className="font-mono text-sm mb-3 text-green-400">
                          const [data, setData] = useState(null)<br/>
                          const [loading, setLoading] = useState(true)<br/>
                          const [error, setError] = useState(null)<br/><br/>
                          useEffect(() => {"{"}<br/>
                          &nbsp;&nbsp;fetchData()<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;.then(data => setData(data))<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;.catch(err => setError(err))<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;.finally(() => setLoading(false))<br/>
                          {"}"}, [])
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-gray-800/30 text-center">
                          <div className="text-lg font-bold">
                            {`oading: {loading ? '✅' : '❌'}`}
                          </div>
                          <div className="text-sm opacity-70">Data fetching status</div>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-800/30 text-center">
                            <div className="text-lg font-bold">
                                {`Has Data: {data ? '✅' : '❌'}`}
                            </div>
                          <div className="text-sm opacity-70">Data loaded status</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* When to Use Multiple useState */}
              <div className={clsx(
                "p-6 rounded-lg",
                "bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
              )}>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  🤔 When to Use Multiple useState Calls
                </h3>
                
                <div className="grid md:grid-cols-1 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold mb-3 text-green-400">Separate useState Calls</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>States are independent (counter and theme)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Simple primitive values (boolean, number, string)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Different update frequencies</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-3 text-blue-400">Single Object State</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span>Related data (user profile, form fields)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span>Multiple fields updated together</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span>Complex nested structures</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-gray-800/30">
                  <div className="text-sm">
                    <span className="font-semibold">Rule of thumb:</span> If updating one piece often 
                    causes others to update, use separate useState. If they change together, use object state.
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
            <h3 className="text-3xl font-bold mb-6 text-red-400">🚫 useState Pitfalls to Avoid</h3>
            
            <div className="space-y-6">
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Storing Computed Values ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Don't store values that can be computed from existing state/props.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// Bad: Storing computed value</code><br/>
                  <code className="text-red-300">const [fullName, setFullName] = useState('')</code><br/>
                  <code className="text-green-300">// Good: Compute during render</code><br/>
                  <code className="text-green-300">const fullName = `{"${firstName}"} {"${lastName}"}`</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Async State Updates ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  State updates are asynchronous. Don't expect immediate changes.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// Bad: Logging immediately after setState</code><br/>
                  <code className="text-red-300">setCount(count + 1); console.log(count) // Old value</code><br/>
                  <code className="text-green-300">// Good: Use useEffect or functional update</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Mutating State Directly ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Always create new objects/arrays when updating state.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// Bad: Direct mutation</code><br/>
                  <code className="text-red-300">user.name = 'New Name' // Won't trigger re-render</code><br/>
                  <code className="text-green-300">// Good: Create new object</code><br/>
                  <code className="text-green-300">setUser({"{"} ...user, name: 'New Name' {"}"})</code>
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
            <h3 className="text-3xl font-bold mb-6 text-green-400">✅ useState Best Practices Summary</h3>
            
            <div className="grid md:grid-cols-1 gap-6">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-bold mb-2">Start Simple</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Begin with primitive values before moving to objects/arrays.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📝</div>
                  <div>
                    <h4 className="font-bold mb-2">Descriptive Names</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Name state variables clearly (count, isLoading, userData).
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
                    <h4 className="font-bold mb-2">Lazy Initialization</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Use functions for expensive initial values.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔧</div>
                  <div>
                    <h4 className="font-bold mb-2">Functional Updates</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Use (prev) => newValue pattern for reliable updates.
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
                    If <span className="font-semibold">Debangshu</span> is building a shopping cart, 
                    should he use multiple useState calls or a single object? Why?
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
                    In the toggle demo, try clicking the toggle button rapidly. 
                    Why does it work reliably with functional updates?
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
                    What if <span className="font-semibold">Abhronila</span> wanted her todo list 
                    to remember items between page reloads? How could useState help?
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
                  useState is your gateway to dynamic React applications. 
                  Master it well, and you'll build a strong foundation for all other hooks.
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
                  <li>At <span className="font-semibold">Barrackpore Coding Academy</span>, we start every React course with useState</li>
                  <li>90% of React state management needs can be handled with just useState</li>
                  <li>The useState + useEffect combination solves most real-world problems</li>
                  <li>Understanding useState deeply makes learning useContext and useReducer much easier</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">🎯 Remember from 27 Years Experience:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Always ask: "What's the minimal state I need?" before adding more</li>
                  <li>Practice with different data types - each has its own patterns</li>
                  <li>Console.log your state changes to understand the update cycle</li>
                  <li>Functional updates are your friend for complex state logic</li>
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
              <h4 className="font-bold mb-2">React Hooks Foundation</h4>
              <p className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Topic 6: Introduction to the useState Hook
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className={clsx(
                "text-sm mb-2 transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Previous: <span className="font-semibold text-emerald-400">When to Use State and When Not To</span>
              </div>
              <div className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Next: <span className="font-semibold text-sky-400">Declaring and Reading State Values</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Inline CSS for animations */}
      <style jsx="true">{`
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

export default Topic6;