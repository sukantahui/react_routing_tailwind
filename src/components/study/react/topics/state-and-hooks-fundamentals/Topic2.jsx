import { useState, useEffect, Component } from 'react';
import clsx from 'clsx';

// Class component to demonstrate life before hooks
class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isOnline: false,
      loading: true,
      userData: null
    };
    // Bind methods - necessary in class components
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.toggleOnline = this.toggleOnline.bind(this);
  }

  componentDidMount() {
    // Simulate API call
    setTimeout(() => {
      this.setState({ 
        loading: false,
        userData: { name: 'Swadeep', age: 21, location: 'Barrackpore' }
      });
    }, 1500);
    
    // Simulate event listener
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    // Complex logic to track changes
    if (prevState.count !== this.state.count) {
      console.log(`Count changed from ${prevState.count} to ${this.state.count}`);
    }
  }

  componentWillUnmount() {
    // Cleanup
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    console.log('Window resized - but we cant show it in state without complexity');
  };

  increment() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  decrement() {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }

  toggleOnline() {
    this.setState(prevState => ({ isOnline: !prevState.isOnline }));
  }

  render() {
    const { count, isOnline, loading, userData } = this.state;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold">Class Component Counter</h4>
          <div className="text-sm opacity-70">Uses this.state</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-900/20 rounded-lg">
            <div className="text-3xl font-bold text-blue-300">{count}</div>
            <div className="text-sm mt-1">Counter Value</div>
          </div>
          <div className="text-center p-4 bg-purple-900/20 rounded-lg">
            <div className="text-3xl font-bold text-purple-300">
              {isOnline ? '✅' : '❌'}
            </div>
            <div className="text-sm mt-1">Online Status</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={this.decrement}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Decrement
          </button>
          <button
            onClick={this.increment}
            className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            Increment
          </button>
          <button
            onClick={this.toggleOnline}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Toggle Online
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-4 text-yellow-400">
            Loading user data...
          </div>
        ) : (
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-sm opacity-70">User Data from API:</div>
            <div className="font-mono text-sm mt-1">
              {JSON.stringify(userData)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Functional component with hooks for comparison
const HookCounter = () => {
  const [count, setCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
      setUserData({ name: 'Tuhina', age: 20, location: 'Shyamnagar' });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold">Functional Component with Hooks</h4>
        <div className="text-sm opacity-70">Uses useState & useEffect</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-900/20 rounded-lg">
          <div className="text-3xl font-bold text-blue-300">{count}</div>
          <div className="text-sm mt-1">Counter Value</div>
        </div>
        <div className="text-center p-4 bg-purple-900/20 rounded-lg">
          <div className="text-3xl font-bold text-purple-300">
            {isOnline ? '✅' : '❌'}
          </div>
          <div className="text-sm mt-1">Online Status</div>
        </div>
        <div className="text-center p-4 bg-green-900/20 rounded-lg">
          <div className="text-3xl font-bold text-green-300">{windowWidth}</div>
          <div className="text-sm mt-1">Window Width</div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setCount(prev => prev - 1)}
          className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          Increment
        </button>
        <button
          onClick={() => setIsOnline(prev => !prev)}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Toggle Online
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-4 text-yellow-400">
          Loading user data...
        </div>
      ) : (
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <div className="text-sm opacity-70">User Data from API:</div>
          <div className="font-mono text-sm mt-1">
            {JSON.stringify(userData)}
          </div>
        </div>
      )}
    </div>
  );
};

const Topic2 = () => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showClassComponent, setShowClassComponent] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState('wrapperHell');
  const [codeView, setCodeView] = useState('class');

  // Problems data
  const problems = [
    {
      id: 'wrapperHell',
      title: 'Wrapper Hell',
      description: 'Deeply nested HOCs and render props',
      icon: '📦',
      color: 'red'
    },
    {
      id: 'complexClasses',
      title: 'Complex Class Components',
      description: 'this binding, lifecycle methods confusion',
      icon: '🏛️',
      color: 'orange'
    },
    {
      id: 'logicReuse',
      title: 'Hard Logic Reuse',
      description: 'Can\'t extract and share stateful logic easily',
      icon: '♻️',
      color: 'yellow'
    },
    {
      id: 'hugeComponents',
      title: 'Huge Components',
      description: 'Components grow too large and complex',
      icon: '🐘',
      color: 'green'
    },
    {
      id: 'confusingLifecycle',
      title: 'Confusing Lifecycle',
      description: 'componentDidMount, componentDidUpdate, etc.',
      icon: '🔄',
      color: 'blue'
    }
  ];

  // Solution data
  const solutions = [
    {
      id: 'simpleFunctions',
      title: 'Simple Functions',
      description: 'Use regular JavaScript functions',
      icon: '⚡',
      color: 'green'
    },
    {
      id: 'reusableLogic',
      title: 'Reusable Logic',
      description: 'Extract logic into custom hooks',
      icon: '🧩',
      color: 'blue'
    },
    {
      id: 'noMoreThis',
      title: 'No More "this"',
      description: 'Avoid confusing this binding',
      icon: '🎯',
      color: 'purple'
    },
    {
      id: 'betterOrganization',
      title: 'Better Organization',
      description: 'Related code stays together',
      icon: '📁',
      color: 'teal'
    }
  ];

  // Class component code example
  const classCode = `class StudentTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      loading: true,
      error: null,
      filter: 'all',
      sortBy: 'name'
    };
    // Must bind every method
    this.fetchStudents = this.fetchStudents.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.fetchStudents();
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.filterStudents();
    }
    if (prevState.sortBy !== this.state.sortBy) {
      this.sortStudents();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    // Cleanup other subscriptions...
  }

  fetchStudents() {
    // Complex API call logic
  }

  addStudent(student) {
    // Add student logic
  }

  handleFilter(filter) {
    this.setState({ filter });
  }

  handleResize = () => {
    // Handle resize
  }

  filterStudents() {
    // Filtering logic
  }

  sortStudents() {
    // Sorting logic
  }

  render() {
    // Complex render method with many conditions
    return <div>/* Lots of JSX */</div>;
  }
}`;

  // Functional component with hooks code
  const hookCode = `function StudentTracker() {
  // State management
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Data fetching
  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter effect
  useEffect(() => {
    if (students.length > 0) {
      filterStudents();
    }
  }, [filter, students]);

  // Sort effect
  useEffect(() => {
    if (students.length > 0) {
      sortStudents();
    }
  }, [sortBy, students]);

  // Window resize effect
  useEffect(() => {
    const handleResize = () => {
      // Handle resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const fetchStudents = async () => {
    // API call logic
  };

  const addStudent = (student) => {
    setStudents(prev => [...prev, student]);
  };

  const filterStudents = () => {
    // Filtering logic
  };

  const sortStudents = () => {
    // Sorting logic
  };

  return (
    <div>/* Clean JSX */</div>
  );
}`;

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-amber-50 to-gray-100 text-gray-900"
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
                Life Before Hooks: The Dark Ages ⏳
              </h1>
              <p className={clsx(
                "mt-1 text-sm transition-all duration-500",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Topic 2: Why Hooks Exist (Life Before Hooks)
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
              : "bg-gradient-to-r from-white to-amber-50 shadow-xl"
          )}>
            <h2 className="text-4xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
              Why Did React Need Hooks? 🤔
            </h2>
            <p className={clsx(
              "text-lg mb-6 leading-relaxed transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              Before hooks (pre-2019), React developers faced significant challenges with class components. 
              Hooks were created to solve <span className="font-bold text-amber-400">five major problems</span> that made React code hard to write, read, and maintain.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* The Problem Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-red-500 animate-[slideUp_1.2s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-red-50"
              )}>
                <div className="text-4xl mb-4">😫</div>
                <h3 className="text-xl font-bold mb-3 text-red-400">The Struggle Was Real</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Developers at <span className="font-semibold">Ichapur Tech Institute</span> spent more time debugging <code className="px-1 rounded bg-gray-800 text-red-300">this</code> binding than writing features.
                </p>
              </div>

              {/* The Solution Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-green-500 animate-[slideUp_1.4s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-green-50"
              )}>
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">Hooks to the Rescue</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Introduced in React 16.8, hooks solved these problems and revolutionized how we write React components.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison */}
        <section className="mb-16 animate-[slideUp_1s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Class vs Functional: Side-by-Side Comparison ⚖️
          </h2>
          
          <div className={clsx(
            "rounded-2xl p-6 mb-6 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-amber-50"
          )}>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setShowClassComponent(true)}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  showClassComponent
                    ? isDarkMode 
                      ? "bg-amber-600 text-white" 
                      : "bg-amber-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                🏛️ Class Component
              </button>
              <button
                onClick={() => setShowClassComponent(false)}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  !showClassComponent
                    ? isDarkMode 
                      ? "bg-green-600 text-white" 
                      : "bg-green-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                ⚡ Functional with Hooks
              </button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Class Component Demo */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500",
                isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
              )}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                    <span className="text-2xl">🏛️</span> Class Component
                  </h3>
                  <div className={clsx(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    isDarkMode ? "bg-amber-900/50 text-amber-300" : "bg-amber-100 text-amber-700"
                  )}>
                    React 15-16.7
                  </div>
                </div>
                <div className="h-96 overflow-y-auto">
                  {showClassComponent ? <ClassCounter /> : (
                    <div className="space-y-4 opacity-70">
                      <p className="text-center py-8">Switch to see Class Component</p>
                    </div>
                  )}
                </div>
                <div className={clsx(
                  "mt-4 p-4 rounded-lg border",
                  isDarkMode ? "border-amber-800/50 bg-amber-900/10" : "border-amber-200 bg-amber-50/50"
                )}>
                  <h4 className="font-bold mb-2 text-amber-400">Pain Points:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Must use <code className="px-1 rounded bg-gray-800 text-amber-300">this</code> everywhere</li>
                    <li>• Methods need manual binding</li>
                    <li>• Lifecycle methods are confusing</li>
                    <li>• Code gets scattered across class</li>
                  </ul>
                </div>
              </div>

              {/* Functional Component Demo */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500",
                isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
              )}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                    <span className="text-2xl">⚡</span> Functional with Hooks
                  </h3>
                  <div className={clsx(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    isDarkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                  )}>
                    React 16.8+
                  </div>
                </div>
                <div className="h-96 overflow-y-auto">
                  {!showClassComponent ? <HookCounter /> : (
                    <div className="space-y-4 opacity-70">
                      <p className="text-center py-8">Switch to see Functional Component</p>
                    </div>
                  )}
                </div>
                <div className={clsx(
                  "mt-4 p-4 rounded-lg border",
                  isDarkMode ? "border-green-800/50 bg-green-900/10" : "border-green-200 bg-green-50/50"
                )}>
                  <h4 className="font-bold mb-2 text-green-400">Advantages:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• No <code className="px-1 rounded bg-gray-800 text-green-300">this</code> binding needed</li>
                    <li>• Related code stays together</li>
                    <li>• Easy to extract reusable logic</li>
                    <li>• Cleaner, more readable code</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The 5 Major Problems */}
        <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            The 5 Major Problems Hooks Solved 🔥
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {problems.map((problem, index) => (
              <button
                key={problem.id}
                onClick={() => setSelectedProblem(problem.id)}
                className={clsx(
                  "rounded-xl p-5 text-left transition-all duration-500",
                  "transform hover:scale-[1.03] hover:-translate-y-1",
                  "border-l-4",
                  selectedProblem === problem.id
                    ? isDarkMode 
                      ? `border-${problem.color}-500 bg-${problem.color}-900/20` 
                      : `border-${problem.color}-500 bg-${problem.color}-100`
                    : isDarkMode 
                      ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800" 
                      : "border-gray-300 bg-white hover:bg-gray-100"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={clsx(
                    "text-2xl p-2 rounded-lg",
                    isDarkMode ? `bg-${problem.color}-900/30` : `bg-${problem.color}-100`
                  )}>
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{problem.title}</h3>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      {problem.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Problem Details */}
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-amber-50"
          )}>
            {problems.map((problem) => (
              selectedProblem === problem.id && (
                <div key={problem.id} className="animate-[slideUp_0.5s_ease-out]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={clsx(
                      "p-4 rounded-full text-3xl",
                      isDarkMode ? `bg-${problem.color}-700` : `bg-${problem.color}-100`
                    )}>
                      {problem.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        <span className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? `text-${problem.color}-300` : `text-${problem.color}-600`
                        )}>
                          {problem.title}
                        </span>
                      </h3>
                      <p className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>
                        {problem.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-6 rounded-lg mb-6",
                    isDarkMode ? "bg-gray-900/50" : "bg-gray-100/50"
                  )}>
                    <h4 className="font-bold mb-3 text-lg">Real Example:</h4>
                    <p className={clsx(
                      "mb-4 transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      {problem.id === 'wrapperHell' && "Imagine Abhronila building a student portal. She needs authentication, theming, and logging. With HOCs, her component looks like: withAuth(withTheme(withLogging(StudentDashboard))) - 4 levels deep!"}
                      {problem.id === 'complexClasses' && "At Barrackpore High School's coding club, Debangshu spent hours debugging why this.setState wasn't working - he forgot to bind the method in constructor!"}
                      {problem.id === 'logicReuse' && "Swadeep wanted to track window resize in multiple components. He had to copy-paste the same componentDidMount and componentWillUnmount logic everywhere."}
                      {problem.id === 'hugeComponents' && "A single StudentManagement component grew to 500+ lines with 10+ lifecycle methods. Finding related code was like searching for a needle in a haystack."}
                      {problem.id === 'confusingLifecycle' && "Tuhina added console.log in componentDidUpdate and got infinite loops. She didn't realize she needed to compare prevState with this.state."}
                    </p>
                    
                    <div className={clsx(
                      "p-4 rounded-lg font-mono text-sm",
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    )}>
                      <code className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? `text-${problem.color}-300` : `text-${problem.color}-600`
                      )}>
                        {problem.id === 'wrapperHell' && "// Before: Wrapper Hell\nconst EnhancedComponent = withAuth(withTheme(withLogging(MyComponent)));"}
                        {problem.id === 'complexClasses' && "// Before: this binding issues\nconstructor() {\n  this.handleClick = this.handleClick.bind(this);\n}"}
                        {problem.id === 'logicReuse' && "// Before: Duplicate code everywhere\ncomponentDidMount() {\n  window.addEventListener('resize', this.handleResize);\n}"}
                        {problem.id === 'hugeComponents' && "// Before: 500+ line components\nclass HugeComponent extends React.Component {\n  // 10+ lifecycle methods\n  // 20+ helper methods\n}"}
                        {problem.id === 'confusingLifecycle' && "// Before: Lifecycle confusion\ncomponentDidUpdate(prevProps, prevState) {\n  // Forgot conditional checks\n  this.fetchData(); // Causes infinite loop!\n}"}
                      </code>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Code Comparison Section */}
        <section className="mb-16 animate-[slideUp_1.4s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Code Comparison: Before vs After 🆚
          </h2>
          
          <div className={clsx(
            "rounded-2xl p-6 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-blue-50"
          )}>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setCodeView('class')}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  codeView === 'class'
                    ? isDarkMode 
                      ? "bg-amber-600 text-white" 
                      : "bg-amber-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                🏛️ Class Component Code
              </button>
              <button
                onClick={() => setCodeView('hook')}
                className={clsx(
                  "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                  "transform hover:scale-105",
                  codeView === 'hook'
                    ? isDarkMode 
                      ? "bg-green-600 text-white" 
                      : "bg-green-500 text-white"
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                ⚡ Hook Component Code
              </button>
            </div>
            
            <div className={clsx(
              "rounded-lg overflow-hidden border",
              isDarkMode ? "border-gray-700" : "border-gray-300"
            )}>
              <div className={clsx(
                "px-4 py-3 font-bold",
                isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
              )}>
                {codeView === 'class' ? 'Class Component (Before Hooks)' : 'Functional Component with Hooks (After)'}
              </div>
              <pre className={clsx(
                "p-6 overflow-x-auto text-sm",
                isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-800"
              )}>
                <code>
                  {codeView === 'class' ? classCode : hookCode}
                </code>
              </pre>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-amber-900/20" : "bg-amber-100/50"
              )}>
                <h4 className="font-bold mb-3 text-amber-400">Class Component Issues:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Methods need manual binding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Code scattered across lifecycle methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Hard to extract reusable logic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Complex this context</span>
                  </li>
                </ul>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <h4 className="font-bold mb-3 text-green-400">Hook Advantages:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✅</span>
                    <span>No this binding needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Related code stays together</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Easy to create custom hooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Clean, readable functions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Timeline */}
        <section className="mb-16 animate-[slideUp_1.6s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            React Evolution Timeline 📅
          </h2>
          
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-purple-50"
          )}>
            <div className="relative">
              {/* Timeline Line */}
              <div className={clsx(
                "absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1",
                isDarkMode ? "bg-gradient-to-b from-gray-600 to-gray-700" : "bg-gradient-to-b from-gray-300 to-gray-400"
              )}></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {/* 2013 - React Born */}
                <div className={clsx(
                  "w-full md:w-5/12 p-6 rounded-xl transition-all duration-500",
                  "hover:scale-[1.02] transform-gpu",
                  isDarkMode 
                    ? "bg-gray-800/50 border border-gray-600" 
                    : "bg-white border border-gray-300"
                )}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={clsx(
                      "p-3 rounded-full text-xl",
                      isDarkMode ? "bg-blue-700" : "bg-blue-100"
                    )}>
                      🎂
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">React Born</h3>
                      <p className={clsx(
                        "text-sm transition-colors duration-500",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        2013 - Facebook Open Sources React
                      </p>
                    </div>
                  </div>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Class components only. JSX introduced. Virtual DOM revolution begins.
                  </p>
                </div>

                {/* 2015-2017 - Class Components Era */}
                <div className={clsx(
                  "w-full md:w-5/12 md:ml-auto p-6 rounded-xl transition-all duration-500",
                  "hover:scale-[1.02] transform-gpu",
                  isDarkMode 
                    ? "bg-amber-900/20 border border-amber-800" 
                    : "bg-amber-50 border border-amber-200"
                )}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={clsx(
                      "p-3 rounded-full text-xl",
                      isDarkMode ? "bg-amber-700" : "bg-amber-100"
                    )}>
                      🏛️
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-400">Class Components Era</h3>
                      <p className={clsx(
                        "text-sm transition-colors duration-500",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        2015-2017 - The "Dark Ages"
                      </p>
                    </div>
                  </div>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    HOCs, render props, lifecycle methods. Code becomes complex and hard to maintain.
                    Students at <span className="font-semibold">Naihati Coding School</span> struggle with <code className="px-1 rounded bg-gray-800 text-amber-300">this</code> binding.
                  </p>
                </div>

                {/* 2018 - Hooks Introduced */}
                <div className={clsx(
                  "w-full md:w-5/12 p-6 rounded-xl transition-all duration-500",
                  "hover:scale-[1.02] transform-gpu",
                  isDarkMode 
                    ? "bg-green-900/20 border border-green-800" 
                    : "bg-green-50 border border-green-200"
                )}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={clsx(
                      "p-3 rounded-full text-xl animate-[pulse_2s_ease-in-out_infinite]",
                      isDarkMode ? "bg-green-700" : "bg-green-100"
                    )}>
                      🎉
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-400">Hooks Introduced</h3>
                      <p className={clsx(
                        "text-sm transition-colors duration-500",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        October 2018 - React Conf Announcement
                      </p>
                    </div>
                  </div>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    useState, useEffect, and other hooks revealed. Community excitement builds.
                  </p>
                </div>

                {/* 2019 - Hooks Stable */}
                <div className={clsx(
                  "w-full md:w-5/12 md:ml-auto p-6 rounded-xl transition-all duration-500",
                  "hover:scale-[1.02] transform-gpu",
                  isDarkMode 
                    ? "bg-teal-900/20 border border-teal-800" 
                    : "bg-teal-50 border border-teal-200"
                )}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={clsx(
                      "p-3 rounded-full text-xl",
                      isDarkMode ? "bg-teal-700" : "bg-teal-100"
                    )}>
                      🚀
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-teal-400">Hooks Stable Release</h3>
                      <p className={clsx(
                        "text-sm transition-colors duration-500",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        February 2019 - React 16.8
                      </p>
                    </div>
                  </div>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Hooks officially stable. Adoption skyrockets. New projects use hooks by default.
                  </p>
                </div>

                {/* 2020+ - Modern React */}
                <div className={clsx(
                  "w-full md:w-5/12 p-6 rounded-xl transition-all duration-500",
                  "hover:scale-[1.02] transform-gpu",
                  isDarkMode 
                    ? "bg-purple-900/20 border border-purple-800" 
                    : "bg-purple-50 border border-purple-200"
                )}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={clsx(
                      "p-3 rounded-full text-xl",
                      isDarkMode ? "bg-purple-700" : "bg-purple-100"
                    )}>
                      ⭐
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-400">Modern React</h3>
                      <p className={clsx(
                        "text-sm transition-colors duration-500",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        2020-Present - Hooks Dominance
                      </p>
                    </div>
                  </div>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Functional components with hooks become standard. Custom hooks ecosystem flourishes.
                    <span className="font-semibold"> Barrackpore developers</span> write cleaner, more maintainable code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Hooks Solved Problems */}
        <section className="mb-16 animate-[slideUp_1.8s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            How Hooks Solved These Problems 🛠️
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                  "transform-gpu border-l-4",
                  isDarkMode 
                    ? `border-${solution.color}-500 bg-gray-800/50 hover:bg-gray-800` 
                    : `border-${solution.color}-500 bg-white hover:bg-gray-50`
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={clsx(
                    "p-3 rounded-full text-2xl",
                    isDarkMode ? `bg-${solution.color}-700` : `bg-${solution.color}-100`
                  )}>
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      <span className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? `text-${solution.color}-300` : `text-${solution.color}-600`
                      )}>
                        {solution.title}
                      </span>
                    </h3>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      {solution.description}
                    </p>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4 text-sm",
                  isDarkMode ? "bg-gray-900/50" : "bg-gray-100/50"
                )}>
                  <span className="font-semibold">Example:</span>{' '}
                  {solution.id === 'simpleFunctions' && "Instead of classes, write regular functions. No more this, constructor, or super()."}
                  {solution.id === 'reusableLogic' && "Create useStudentTracker hook and reuse it across Swadeep's and Tuhina's components."}
                  {solution.id === 'noMoreThis' && "Direct access to state and setters. No more this.state.count, just count."}
                  {solution.id === 'betterOrganization' && "Keep API call, loading state, and error handling together in one useEffect."}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Pitfalls of Class Components */}
        <section className="mb-16 animate-[slideUp_2s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-r-4 border-red-500",
            isDarkMode 
              ? "bg-gradient-to-r from-red-900/20 to-red-800/20" 
              : "bg-gradient-to-r from-red-50 to-orange-50"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-red-400">⚠️ Common Class Component Pitfalls</h3>
            
            <div className="space-y-6">
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">this Binding Nightmare ❌</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Forgetting to bind methods leads to "Cannot read property 'setState' of undefined"
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// Forgot to bind: this.handleClick is undefined!</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Lifecycle Spaghetti 🔄</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Related code scattered across componentDidMount, componentDidUpdate, componentWillUnmount
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">// API setup in componentDidMount, cleanup 100 lines later in componentWillUnmount</code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Wrapper Hell 📦</h4>
                <p className={clsx(
                  "mb-2 transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Components wrapped 4-5 levels deep with HOCs for authentication, theming, logging, etc.
                </p>
                <div className={clsx(
                  "p-3 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">withRouter(withAuth(withTheme(withLogging(MyComponent))))</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices Transition */}
        <section className="mb-16 animate-[slideUp_2.2s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-green-900/20 to-teal-800/20 border border-green-800/30" 
              : "bg-gradient-to-br from-green-50 to-teal-50 border border-green-200"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-green-400">✅ Transitioning from Classes to Hooks</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">1️⃣</div>
                  <div>
                    <h4 className="font-bold mb-2">Start Simple</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Convert simple components first. Replace this.state with useState.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">2️⃣</div>
                  <div>
                    <h4 className="font-bold mb-2">Handle Lifecycle</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Convert componentDidMount to useEffect with empty dependency array.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">3️⃣</div>
                  <div>
                    <h4 className="font-bold mb-2">Extract Logic</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Move reusable logic into custom hooks. Share between components.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">4️⃣</div>
                  <div>
                    <h4 className="font-bold mb-2">Test Thoroughly</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Hooks can behave differently. Test edge cases and cleanup functions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={clsx(
              "mt-6 p-5 rounded-xl",
              isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
            )}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-bold mb-2 text-blue-300">Professional Tip</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    When migrating legacy code at <span className="font-semibold">Shyamnagar Software Solutions</span>, 
                    we convert one component at a time and run tests after each conversion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="mb-16 animate-[slideUp_2.4s_ease-out]">
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
                    How would <span className="font-semibold">Abhronila</span> explain the "this" problem to a beginner? 
                    What real-world analogy would she use?
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
                    Compare the class and functional component demos. Which one feels more intuitive? 
                    Which would be easier to debug at 2 AM?
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
                    What if <span className="font-semibold">Debangshu</span> wanted to add keyboard shortcuts to his app? 
                    Which approach (class vs hooks) would make this easier?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_2.6s_ease-out]">
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
                  Understanding why hooks exist helps you appreciate their design. 
                  We suffered through the class component era so you don't have to!
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
                  <li>I've seen teams reduce bug reports by 40% after migrating to hooks</li>
                  <li>New developers onboard 60% faster with hooks vs class components</li>
                  <li>Code review time decreases significantly with hooks' cleaner structure</li>
                  <li>At <span className="font-semibold">Barrackpore Tech Park</span>, we migrated 200+ components in 3 months</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">🎯 Remember from 27 Years Experience:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Class components still work - don't rewrite everything at once</li>
                  <li>Understand the problems hooks solve, not just the syntax</li>
                  <li>The best code is code that's easy to read 6 months later</li>
                  <li>Hooks represent React's maturation - embrace the progress</li>
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
              <h4 className="font-bold mb-2">React Evolution Journey</h4>
              <p className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Topic 2: Why Hooks Exist (Life Before Hooks)
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className={clsx(
                "text-sm mb-2 transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Previous: <span className="font-semibold text-green-400">What are Hooks in React</span>
              </div>
              <div className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Next: <span className="font-semibold text-amber-400">State vs Hooks – Conceptual Comparison</span>
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

export default Topic2;