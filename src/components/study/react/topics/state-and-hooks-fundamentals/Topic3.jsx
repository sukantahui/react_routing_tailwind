import { useState, useEffect, useReducer, useContext, createContext, useRef } from 'react';
import clsx from 'clsx';

// Create context for theme demonstration
const ThemeContext = createContext();

// Custom hook for demonstration
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Custom hook for counter with localStorage
const useCounterWithStorage = (initialValue = 0, key = 'counter') => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? parseInt(saved, 10) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, count.toString());
  }, [count, key]);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset, setCount };
};

// Custom hook for form handling
const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate validation
    const newErrors = {};
    if (!values.name) newErrors.name = 'Name is required';
    if (!values.email) newErrors.email = 'Email is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      await callback(values);
    }
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
};

const Topic3 = () => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('concepts');
  const [selectedHook, setSelectedHook] = useState('useState');
  const [comparisonView, setComparisonView] = useState('differences');

  // Various state examples
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Swadeep', age: 21, location: 'Barrackpore' });
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Hooks', completed: true },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Master State Management', completed: false },
  ]);
  const [theme, setTheme] = useState('dark');

  // Using custom hooks
  const windowSize = useWindowSize();
  const counterStorage = useCounterWithStorage(0, 'demo-counter');
  const form = useForm({ name: '', email: '', subscribe: true });

  // useReducer example
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [...state, { 
          id: Date.now(), 
          text: action.payload, 
          completed: false 
        }];
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.payload 
            ? { ...todo, completed: !todo.completed } 
            : todo
        );
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };
  const [todoList, dispatch] = useReducer(todoReducer, []);

  // useRef example
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const previousCount = useRef(count);

  useEffect(() => {
    renderCount.current += 1;
  });

  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  // Hooks data for demonstration
  const hooksData = [
    {
      id: 'useState',
      name: 'useState',
      type: 'State Hook',
      description: 'Manages component state',
      stateRelation: 'Direct state management',
      example: 'const [count, setCount] = useState(0)',
      icon: '📊',
      color: 'blue',
      whenToUse: 'Local component state, form inputs, UI state'
    },
    {
      id: 'useEffect',
      name: 'useEffect',
      type: 'Effect Hook',
      description: 'Handles side effects',
      stateRelation: 'React to state changes',
      example: 'useEffect(() => { /* effect */ }, [deps])',
      icon: '🔄',
      color: 'green',
      whenToUse: 'API calls, subscriptions, event listeners'
    },
    {
      id: 'useContext',
      name: 'useContext',
      type: 'Context Hook',
      description: 'Accesses React context',
      stateRelation: 'Global state access',
      example: 'const value = useContext(MyContext)',
      icon: '📡',
      color: 'purple',
      whenToUse: 'Theming, user auth, global preferences'
    },
    {
      id: 'useReducer',
      name: 'useReducer',
      type: 'Reducer Hook',
      description: 'Manages complex state logic',
      stateRelation: 'Advanced state management',
      example: 'const [state, dispatch] = useReducer(reducer, initialState)',
      icon: '⚙️',
      color: 'red',
      whenToUse: 'Complex forms, multiple sub-values, state machines'
    },
    {
      id: 'useRef',
      name: 'useRef',
      type: 'Ref Hook',
      description: 'Persists values across renders',
      stateRelation: 'State without re-renders',
      example: 'const ref = useRef(initialValue)',
      icon: '🎯',
      color: 'orange',
      whenToUse: 'DOM references, previous values, intervals'
    },
    {
      id: 'customHook',
      name: 'Custom Hooks',
      type: 'Custom Logic',
      description: 'Reusable stateful logic',
      stateRelation: 'Abstracted state logic',
      example: 'const { value, update } = useCustomHook()',
      icon: '🧩',
      color: 'teal',
      whenToUse: 'Repeating patterns, cross-cutting concerns'
    }
  ];

  // Comparison data
  const comparisons = [
    {
      aspect: 'Definition',
      state: 'Data that changes over time in a component',
      hooks: 'Functions that let you use React features',
      analogy: 'State is the memory, hooks are the tools to access it'
    },
    {
      aspect: 'Purpose',
      state: 'Store and manage dynamic data',
      hooks: 'Access React features (state, lifecycle, context)',
      analogy: 'State is what you remember, hooks are how you remember it'
    },
    {
      aspect: 'Usage',
      state: 'Created and updated within components',
      hooks: 'Imported and called in components',
      analogy: 'State is your notebook, hooks are your pens and highlighters'
    },
    {
      aspect: 'Relation',
      state: 'Managed by useState hook',
      hooks: 'Include useState, useEffect, useContext, etc.',
      analogy: 'State is a type of data, hooks are ways to handle that data'
    },
    {
      aspect: 'Scope',
      state: 'Local to component (unless lifted up)',
      hooks: 'Can be local or global (via context)',
      analogy: 'State is personal memory, hooks can access shared memory'
    }
  ];

  // Add a new todo
  const addTodo = () => {
    if (inputRef.current && inputRef.current.value.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputRef.current.value });
      inputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    alert(`Welcome ${formData.name}! Check your email at ${formData.email}`);
    form.resetForm();
  };

  // Update user location
  const updateLocation = (location) => {
    setUser(prev => ({ ...prev, location }));
  };

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-indigo-50 to-gray-100 text-gray-900"
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
                State vs Hooks: Understanding the Relationship 🔗
              </h1>
              <p className={clsx(
                "mt-1 text-sm transition-all duration-500",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Topic 3: State vs Hooks – Conceptual Comparison
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
              : "bg-gradient-to-r from-white to-indigo-50 shadow-xl"
          )}>
            <h2 className="text-4xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
              State vs Hooks: What's the Difference? 🤔
            </h2>
            <p className={clsx(
              "text-lg mb-6 leading-relaxed transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              <span className="font-bold text-indigo-400">State</span> is the data that changes in your app.
              <span className="font-bold text-green-400"> Hooks</span> are the tools that help you manage that data.
              They're not alternatives—they work together!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* State Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-blue-500 animate-[slideUp_1.2s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-blue-50"
              )}>
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">State</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  The <span className="font-semibold">data</span> that changes. Like <span className="font-semibold">Tuhina</span>'s current score in her coding challenge.
                </p>
              </div>

              {/* Hooks Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-green-500 animate-[slideUp_1.4s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-green-50"
              )}>
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">Hooks</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  The <span className="font-semibold">tools</span> to manage state. Like the functions that update <span className="font-semibold">Swadeep</span>'s attendance record.
                </p>
              </div>

              {/* Relationship Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-purple-500 animate-[slideUp_1.6s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-purple-50"
              )}>
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Relationship</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Hooks <span className="font-semibold">use</span> and <span className="font-semibold">manage</span> state. They're different concepts that work together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 animate-[slideUp_1s_ease-out]">
          <button
            onClick={() => setActiveTab('concepts')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'concepts'
                ? isDarkMode 
                  ? "bg-indigo-600 text-white" 
                  : "bg-indigo-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            📚 Core Concepts
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={clsx(
              "px-6 py-3 rounded-lg font-bold transition-all duration-300",
              "transform hover:scale-105",
              activeTab === 'comparison'
                ? isDarkMode 
                  ? "bg-green-600 text-white" 
                  : "bg-green-500 text-white"
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
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-500 text-white"
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            🎮 Interactive Demos
          </button>
        </div>

        {/* Core Concepts Section */}
        {activeTab === 'concepts' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Understanding the Concepts 📚
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* State Explanation */}
              <div className={clsx(
                "rounded-2xl p-8 transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-blue-50"
              )}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-400">
                  <span className="text-3xl">📊</span> What is State?
                </h3>
                
                <div className="space-y-6">
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
                  )}>
                    <h4 className="font-bold mb-2 text-blue-300">Definition</h4>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      State is the <span className="font-semibold">memory</span> of a component. 
                      It stores data that can change over time and causes re-renders when updated.
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
                  )}>
                    <h4 className="font-bold mb-2 text-blue-300">Real-world Analogy</h4>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Like <span className="font-semibold">Abhronila</span>'s exam scores at 
                      <span className="font-semibold"> Barrackpore High School</span>. 
                      The scores (state) change after each test.
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
                  )}>
                    <h4 className="font-bold mb-2 text-blue-300">Key Characteristics</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          Changes over time
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          Causes re-renders when updated
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          Local to component (usually)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hooks Explanation */}
              <div className={clsx(
                "rounded-2xl p-8 transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-green-50"
              )}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-400">
                  <span className="text-3xl">🛠️</span> What are Hooks?
                </h3>
                
                <div className="space-y-6">
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
                  )}>
                    <h4 className="font-bold mb-2 text-green-300">Definition</h4>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Hooks are <span className="font-semibold">functions</span> that let you 
                      "hook into" React features like state and lifecycle from functional components.
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
                  )}>
                    <h4 className="font-bold mb-2 text-green-300">Real-world Analogy</h4>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Like the <span className="font-semibold">tools</span> in 
                      <span className="font-semibold"> Debangshu</span>'s coding toolkit. 
                      useState is his notebook, useEffect is his reminder app.
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
                  )}>
                    <h4 className="font-bold mb-2 text-green-300">Key Characteristics</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          Start with "use" (useState, useEffect, etc.)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          Can create custom hooks
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          Follow Rules of Hooks
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Relationship */}
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-purple-50"
            )}>
              <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">
                The Relationship Visualized 🔗
              </h3>
              
              <div className="relative mb-8 overflow-hidden rounded-xl">
                <svg 
                  viewBox="0 0 800 300" 
                  className="w-full h-auto"
                >
                  {/* State Circle */}
                  <circle 
                    cx="200" 
                    cy="150" 
                    r="80"
                    className={clsx(
                      "transition-all duration-500",
                      isDarkMode 
                        ? "fill-blue-900/30 stroke-blue-500" 
                        : "fill-blue-100 stroke-blue-400"
                    )}
                    strokeWidth="3"
                  >
                    <animate
                      attributeName="r"
                      values="80;85;80"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  <text 
                    x="200" 
                    y="150" 
                    textAnchor="middle"
                    className={clsx(
                      "text-xl font-bold transition-colors duration-500",
                      isDarkMode ? "fill-blue-300" : "fill-blue-700"
                    )}
                  >
                    State
                  </text>
                  <text 
                    x="200" 
                    y="180" 
                    textAnchor="middle"
                    className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "fill-blue-400" : "fill-blue-600"
                    )}
                  >
                    Data
                  </text>
                  
                  {/* Hooks Circle */}
                  <circle 
                    cx="600" 
                    cy="150" 
                    r="80"
                    className={clsx(
                      "transition-all duration-500",
                      isDarkMode 
                        ? "fill-green-900/30 stroke-green-500" 
                        : "fill-green-100 stroke-green-400"
                    )}
                    strokeWidth="3"
                  >
                    <animate
                      attributeName="r"
                      values="80;85;80"
                      dur="3s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                  </circle>
                  
                  <text 
                    x="600" 
                    y="150" 
                    textAnchor="middle"
                    className={clsx(
                      "text-xl font-bold transition-colors duration-500",
                      isDarkMode ? "fill-green-300" : "fill-green-700"
                    )}
                  >
                    Hooks
                  </text>
                  <text 
                    x="600" 
                    y="180" 
                    textAnchor="middle"
                    className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "fill-green-400" : "fill-green-600"
                    )}
                  >
                    Tools
                  </text>
                  
                  {/* Connection Arrow */}
                  <path 
                    d="M280,150 L520,150" 
                    fill="none"
                    className={clsx(
                      "transition-all duration-500",
                      isDarkMode ? "stroke-purple-400" : "stroke-purple-500"
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
                    points="520,150 510,145 510,155" 
                    className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "fill-purple-400" : "fill-purple-500"
                    )}
                  />
                  
                  {/* Relationship Text */}
                  <text 
                    x="400" 
                    y="100" 
                    textAnchor="middle"
                    className={clsx(
                      "font-bold transition-colors duration-500",
                      isDarkMode ? "fill-purple-300" : "fill-purple-600"
                    )}
                  >
                    Hooks Manage State
                  </text>
                </svg>
              </div>
              
              <div className="text-center">
                <p className={clsx(
                  "text-lg font-semibold mb-4 transition-colors duration-500",
                  isDarkMode ? "text-purple-300" : "text-purple-600"
                )}>
                  useState is a hook that gives you state
                </p>
                <div className={clsx(
                  "inline-block p-4 rounded-lg font-mono",
                  isDarkMode ? "bg-gray-900" : "bg-gray-100"
                )}>
                  <code className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-purple-300" : "text-purple-600"
                  )}>
                    const [state, setState] = useState(initialValue)
                  </code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Comparison Section */}
        {activeTab === 'comparison' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Detailed Comparison ⚖️
            </h2>
            
            <div className="flex gap-4 mb-6 justify-center">
              <button
                onClick={() => setComparisonView('differences')}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  comparisonView === 'differences'
                    ? isDarkMode 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                🔍 Differences
              </button>
              <button
                onClick={() => setComparisonView('hooks')}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  comparisonView === 'hooks'
                    ? isDarkMode 
                      ? "bg-green-600 text-white" 
                      : "bg-green-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                🛠️ Hooks Deep Dive
              </button>
            </div>

            {comparisonView === 'differences' ? (
              <div className={clsx(
                "rounded-2xl p-8 transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-blue-50"
              )}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={clsx(
                        "border-b transition-colors duration-500",
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      )}>
                        <th className="text-left py-4 px-4 font-bold">Aspect</th>
                        <th className="text-left py-4 px-4 font-bold text-blue-400">State</th>
                        <th className="text-left py-4 px-4 font-bold text-green-400">Hooks</th>
                        <th className="text-left py-4 px-4 font-bold text-purple-400">Analogy</th>
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
                              {item.state}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className={clsx(
                              "p-3 rounded-lg",
                              isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
                            )}>
                              {item.hooks}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className={clsx(
                              "p-3 rounded-lg italic",
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
                
                <div className={clsx(
                  "mt-8 p-6 rounded-xl",
                  isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100/50"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="font-bold mb-2 text-yellow-300">Key Insight</h4>
                      <p className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className="font-semibold">State</span> and <span className="font-semibold">hooks</span> are not 
                        alternatives! <span className="font-semibold">useState</span> is a hook that 
                        <span className="font-semibold"> provides</span> state to your component.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={clsx(
                "rounded-2xl p-8 transition-all duration-500",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-green-50"
              )}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {hooksData.map((hook, index) => (
                    <button
                      key={hook.id}
                      onClick={() => setSelectedHook(hook.id)}
                      className={clsx(
                        "rounded-xl p-5 text-left transition-all duration-500",
                        "transform hover:scale-[1.03] hover:-translate-y-1",
                        "border-l-4",
                        selectedHook === hook.id
                          ? isDarkMode 
                            ? `border-${hook.color}-500 bg-${hook.color}-900/20` 
                            : `border-${hook.color}-500 bg-${hook.color}-100`
                          : isDarkMode 
                            ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800" 
                            : "border-gray-300 bg-white hover:bg-gray-100"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          "text-2xl p-2 rounded-lg",
                          isDarkMode ? `bg-${hook.color}-900/30` : `bg-${hook.color}-100`
                        )}>
                          {hook.icon}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{hook.name}</h3>
                          <p className={clsx(
                            "text-sm transition-colors duration-500",
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          )}>
                            {hook.type}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Hook Details */}
                <div className={clsx(
                  "rounded-xl p-6 transition-all duration-500",
                  isDarkMode ? "bg-gray-800/50" : "bg-white"
                )}>
                  {hooksData.map((hook) => (
                    selectedHook === hook.id && (
                      <div key={hook.id} className="animate-[slideUp_0.5s_ease-out]">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={clsx(
                            "p-4 rounded-full text-3xl",
                            isDarkMode ? `bg-${hook.color}-700` : `bg-${hook.color}-100`
                          )}>
                            {hook.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">
                              <span className={clsx(
                                "transition-colors duration-500",
                                isDarkMode ? `text-${hook.color}-300` : `text-${hook.color}-600`
                              )}>
                                {hook.name}
                              </span>
                            </h3>
                            <p className={clsx(
                              "transition-colors duration-500",
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            )}>
                              {hook.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className={clsx(
                            "p-4 rounded-lg",
                            isDarkMode ? "bg-gray-900" : "bg-gray-100"
                          )}>
                            <h4 className="font-bold mb-2">Relationship to State</h4>
                            <p className={clsx(
                              "transition-colors duration-500",
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            )}>
                              {hook.stateRelation}
                            </p>
                          </div>
                          
                          <div className={clsx(
                            "p-4 rounded-lg",
                            isDarkMode ? "bg-gray-900" : "bg-gray-100"
                          )}>
                            <h4 className="font-bold mb-2">When to Use</h4>
                            <p className={clsx(
                              "transition-colors duration-500",
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            )}>
                              {hook.whenToUse}
                            </p>
                          </div>
                        </div>
                        
                        <div className={clsx(
                          "p-4 rounded-lg mb-6 font-mono",
                          isDarkMode ? "bg-gray-900" : "bg-gray-100"
                        )}>
                          <code className={clsx(
                            "transition-colors duration-500",
                            isDarkMode ? `text-${hook.color}-300` : `text-${hook.color}-600`
                          )}>
                            {hook.example}
                          </code>
                        </div>
                        
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
                        )}>
                          <h4 className="font-bold mb-2">Real Example:</h4>
                          <p className={clsx(
                            "transition-colors duration-500",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>
                            {hook.id === 'useState' && "Tracking Swadeep's daily coding hours at Barrackpore Tech Academy"}
                            {hook.id === 'useEffect' && "Automatically saving Tuhina's form data to localStorage"}
                            {hook.id === 'useContext' && "Switching themes across Abhronila's entire application"}
                            {hook.id === 'useReducer' && "Managing Debangshu's complex shopping cart state"}
                            {hook.id === 'useRef' && "Keeping track of previous values without causing re-renders"}
                            {hook.id === 'customHook' && "Reusing form validation logic across multiple components at Ichapur Institute"}
                          </p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Interactive Demos Section */}
        {activeTab === 'demos' && (
          <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Interactive Demos 🎮
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Demo 1: useState & Custom Hook */}
              <div className={clsx(
                "rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-blue-50"
              )}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">📊</span> useState vs Custom Hook
                </h3>
                <p className={clsx(
                  "mb-6 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Compare basic useState with a custom hook that adds localStorage persistence.
                </p>
                
                <div className="space-y-6">
                  {/* Basic useState Counter */}
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
                  )}>
                    <h4 className="font-bold mb-3 text-blue-400">Basic useState Counter</h4>
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-blue-300 mb-2">{count}</div>
                      <div className="text-sm opacity-70">Resets on refresh</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCount(c => c - 1)}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        Decrement
                      </button>
                      <button
                        onClick={() => setCount(0)}
                        className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setCount(c => c + 1)}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        Increment
                      </button>
                    </div>
                  </div>

                  {/* Custom Hook Counter */}
                  <div className={clsx(
                    "p-5 rounded-xl",
                    isDarkMode ? "bg-teal-900/20" : "bg-teal-100/50"
                  )}>
                    <h4 className="font-bold mb-3 text-teal-400">Custom Hook Counter</h4>
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-teal-300 mb-2">{counterStorage.count}</div>
                      <div className="text-sm opacity-70">Persists in localStorage</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={counterStorage.decrement}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        Decrement
                      </button>
                      <button
                        onClick={counterStorage.reset}
                        className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        Reset
                      </button>
                      <button
                        onClick={counterStorage.increment}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        Increment
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "mt-4 p-4 rounded-lg",
                  isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
                )}>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    <span className="font-semibold">Note:</span> The custom hook uses useState internally but adds localStorage persistence. 
                    This shows how hooks can <span className="font-semibold">extend</span> state functionality.
                  </p>
                </div>
              </div>

              {/* Demo 2: useReducer Todo List */}
              <div className={clsx(
                "rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl",
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                  : "bg-gradient-to-br from-white to-green-50"
              )}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚙️</span> useReducer Todo List
                </h3>
                <p className={clsx(
                  "mb-6 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Complex state management with useReducer. Perfect for multiple related state values.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Add a new todo..."
                      className={clsx(
                        "flex-1 px-4 py-2 rounded-lg border",
                        "focus:outline-none focus:ring-2 focus:ring-green-500",
                        isDarkMode 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900"
                      )}
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <button
                      onClick={addTodo}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {todoList.map(todo => (
                      <div
                        key={todo.id}
                        className={clsx(
                          "flex items-center justify-between p-3 rounded-lg transition-all duration-300",
                          "hover:scale-[1.02] transform-gpu",
                          isDarkMode 
                            ? "bg-gray-700/50 hover:bg-gray-700" 
                            : "bg-gray-100 hover:bg-gray-200"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                            className={clsx(
                              "w-5 h-5 rounded border flex items-center justify-center",
                              todo.completed 
                                ? "bg-green-500 border-green-500" 
                                : "border-gray-400"
                            )}
                          >
                            {todo.completed && '✓'}
                          </button>
                          <span className={clsx(
                            todo.completed && "line-through opacity-60"
                          )}>
                            {todo.text}
                          </span>
                        </div>
                        <button
                          onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    
                    {todoList.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No todos yet. Add one above!
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={clsx(
                  "mt-4 p-4 rounded-lg",
                  isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
                )}>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    <span className="font-semibold">useReducer</span> manages complex state transitions. 
                    Instead of multiple useState calls, we have one state object and action dispatches.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo 3: Object State & useEffect */}
            <div className={clsx(
              "rounded-2xl p-6 mb-8 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-purple-50"
            )}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">👤</span> Object State & Side Effects
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* User Object State */}
                <div>
                  <h4 className="font-bold mb-4 text-purple-400">User Object State</h4>
                  <div className={clsx(
                    "p-5 rounded-xl mb-4",
                    isDarkMode ? "bg-purple-900/20" : "bg-purple-100/50"
                  )}>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm opacity-70">Name</div>
                        <div className="font-bold text-lg">{user.name}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-70">Age</div>
                        <div className="font-bold text-lg">{user.age}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-70">Location</div>
                        <div className="font-bold text-lg">{user.location}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati'].map(location => (
                      <button
                        key={location}
                        onClick={() => updateLocation(location)}
                        className={clsx(
                          "px-4 py-2 rounded-lg transition-all duration-300",
                          "hover:scale-105",
                          user.location === location
                            ? isDarkMode 
                              ? "bg-purple-600 text-white" 
                              : "bg-purple-500 text-white"
                            : isDarkMode 
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        )}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Window Size Effect */}
                <div>
                  <h4 className="font-bold mb-4 text-green-400">useEffect Window Tracker</h4>
                  <div className={clsx(
                    "p-5 rounded-xl mb-4",
                    isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
                  )}>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-300 mb-2">
                        {windowSize.width} × {windowSize.height}
                      </div>
                      <div className="text-sm opacity-70">Current Window Size</div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
                  )}>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      <span className="font-semibold">useEffect</span> listens to window resize events. 
                      Notice how it updates state when you resize your browser window.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo 4: useRef & Previous Values */}
            <div className={clsx(
              "rounded-2xl p-6 transition-all duration-500",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-orange-50"
            )}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🎯</span> useRef: State Without Re-renders
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className={clsx(
                  "p-5 rounded-xl text-center",
                  isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
                )}>
                  <div className="text-sm opacity-70">Current Count</div>
                  <div className="text-4xl font-bold text-blue-300 mt-2">{count}</div>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-xl text-center",
                  isDarkMode ? "bg-orange-900/20" : "bg-orange-100/50"
                )}>
                  <div className="text-sm opacity-70">Previous Count</div>
                  <div className="text-4xl font-bold text-orange-300 mt-2">{previousCount.current}</div>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-xl text-center",
                  isDarkMode ? "bg-purple-900/20" : "bg-purple-100/50"
                )}>
                  <div className="text-sm opacity-70">Render Count</div>
                  <div className="text-4xl font-bold text-purple-300 mt-2">{renderCount.current}</div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setCount(c => c - 1)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Decrement
                </button>
                <button
                  onClick={() => setCount(c => c + 1)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Increment
                </button>
              </div>
              
              <div className={clsx(
                "mt-6 p-4 rounded-lg",
                isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
              )}>
                <p className={clsx(
                  "text-sm transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <span className="font-semibold">useRef</span> stores the previous count value without causing re-renders. 
                  The render count increases with each state update, but previous count only updates via useEffect.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Common Misconceptions */}
        <section className="mb-16 animate-[slideUp_1.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-r-4 border-red-500",
            isDarkMode 
              ? "bg-gradient-to-r from-red-900/20 to-red-800/20" 
              : "bg-gradient-to-r from-red-50 to-orange-50"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-red-400">🚫 Common Misconceptions</h3>
            
            <div className="space-y-6">
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">"Hooks replace state" ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Hooks don't replace state—they provide state to functional components. 
                  useState is a hook that gives you state capability.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-green-300">// Correct: Hooks provide state</code><br/>
                  <code className="text-green-300">const [state, setState] = useState(initialValue);</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">"Only useState manages state" ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Multiple hooks work with state: useContext for global state, 
                  useReducer for complex state, useRef for mutable references.
                </p>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">"Hooks are only for state" ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Hooks handle many React features: useEffect for side effects, 
                  useRef for DOM access, useContext for context, and more.
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
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold mb-2">Choose the Right Hook</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Use useState for simple state, useReducer for complex transitions, 
                      useContext for global access.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🧩</div>
                  <div>
                    <h4 className="font-bold mb-2">Create Custom Hooks</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Extract repeated state logic into custom hooks. 
                      Like our useCounterWithStorage example.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h4 className="font-bold mb-2">Keep State Minimal</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Store only what changes. Compute derived values during render.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔗</div>
                  <div>
                    <h4 className="font-bold mb-2">Understand Relationships</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Remember: Hooks are tools, state is data. 
                      They work together to build dynamic UIs.
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
                    If <span className="font-semibold">Swadeep</span> is building a weather app, 
                    what would be the <span className="font-semibold">state</span> and which 
                    <span className="font-semibold"> hooks</span> would he use?
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
                    Watch how the custom hook counter persists but the basic one doesn't. 
                    What does this tell you about the relationship between hooks and state?
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
                    What if <span className="font-semibold">Tuhina</span> wanted to add due dates to her todo list? 
                    Which hook would help manage this additional state complexity?
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
                  Understanding the state-hooks relationship is fundamental. 
                  Think of state as your data and hooks as your toolkit for managing that data.
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
                  <li>At <span className="font-semibold">Barrackpore Software Solutions</span>, we teach: "State is the what, hooks are the how"</li>
                  <li>Proper hook selection can reduce code complexity by 50%</li>
                  <li>Custom hooks are the single biggest productivity boost in modern React</li>
                  <li>Understanding this relationship is what separates juniors from seniors</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">🎯 Remember from 27 Years Experience:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Every hook exists to solve a specific state management problem</li>
                  <li>The React team designed hooks based on real-world pain points</li>
                  <li>Mastering hooks means understanding when to use each one</li>
                  <li>Good architecture starts with proper state-hook relationships</li>
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
              <h4 className="font-bold mb-2">React Concepts Mastery</h4>
              <p className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Topic 3: State vs Hooks – Conceptual Comparison
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className={clsx(
                "text-sm mb-2 transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Previous: <span className="font-semibold text-amber-400">Why Hooks Exist</span>
              </div>
              <div className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Next: <span className="font-semibold text-indigo-400">Props vs State – Conceptual Differences</span>
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

export default Topic3;