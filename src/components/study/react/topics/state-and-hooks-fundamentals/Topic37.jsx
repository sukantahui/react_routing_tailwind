import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Topic37 = () => {
    const [componentStage, setComponentStage] = useState('mounting');
    const [count, setCount] = useState(0);
    const [user, setUser] = useState({ name: 'Tuhina', age: 22 });
    const [messages, setMessages] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [lifecycleLogs, setLifecycleLogs] = useState([]);
    const [isMounted, setIsMounted] = useState(true);

    const prevCountRef = useRef();
    const prevUserRef = useRef();
    const mountTimeRef = useRef();

    // Helper to add logs
    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLifecycleLogs(prev => [
            { id: Date.now(), message, type, timestamp },
            ...prev.slice(0, 9) // Keep only last 10 logs
        ]);
    };

    // Simulating constructor and componentDidMount
    useEffect(() => {
        // This runs once when component mounts (constructor + componentDidMount)
        addLog('🟢 Constructor: Component is being created', 'mount');
        addLog('🟢 componentDidMount: Component is now mounted in DOM', 'mount');

        mountTimeRef.current = Date.now();

        // Simulate initial data fetch (like in componentDidMount)
        setTimeout(() => {
            addLog('📥 componentDidMount: Fetching initial data...', 'mount');
            setMessages(['Welcome!', 'Component mounted successfully']);
        }, 1000);

        // Cleanup for componentWillUnmount
        return () => {
            const mountDuration = Date.now() - mountTimeRef.current;
            addLog(`🔴 componentWillUnmount: Component existed for ${mountDuration}ms`, 'unmount');
            addLog('🔴 componentWillUnmount: Cleaning up resources...', 'unmount');
        };
    }, []); // Empty array = runs once on mount

    // Simulating componentDidUpdate for count changes
    useEffect(() => {
        if (prevCountRef.current !== undefined) {
            addLog(`🔄 componentDidUpdate: Count changed from ${prevCountRef.current} to ${count}`, 'update');

            // Simulate side effect after count update
            if (count % 5 === 0 && count > 0) {
                addLog(`🎯 Count reached multiple of 5: ${count}`, 'special');
            }
        }
        prevCountRef.current = count;
    }, [count]); // Runs when count changes

    // Simulating componentDidUpdate for user changes
    useEffect(() => {
        if (prevUserRef.current) {
            addLog(`🔄 componentDidUpdate: User object changed`, 'update');

            // Compare specific properties
            if (prevUserRef.current.name !== user.name) {
                addLog(`👤 Name changed from "${prevUserRef.current.name}" to "${user.name}"`, 'update');
            }
            if (prevUserRef.current.age !== user.age) {
                addLog(`🎂 Age changed from ${prevUserRef.current.age} to ${user.age}`, 'update');
            }
        }
        prevUserRef.current = { ...user };
    }, [user]);

    // Simulating getDerivedStateFromProps
    const [derivedState, setDerivedState] = useState({});
    useEffect(() => {
        // This simulates getDerivedStateFromProps
        // Here we derive state based on props (simulated by count)
        if (count > 10) {
            setDerivedState({ status: 'High', color: 'text-red-500' });
        } else if (count > 5) {
            setDerivedState({ status: 'Medium', color: 'text-yellow-500' });
        } else {
            setDerivedState({ status: 'Low', color: 'text-green-500' });
        }
    }, [count]); // Re-run when "props" (count) change

    // Simulating shouldComponentUpdate
    const shouldUpdateRef = useRef(true);
    useEffect(() => {
        if (!shouldUpdate) {
            addLog('⏸️ shouldComponentUpdate: Blocking unnecessary update', 'control');
            shouldUpdateRef.current = false;
        } else {
            shouldUpdateRef.current = true;
        }
    }, [shouldUpdate]);

    // Combined lifecycle stage tracking
    useEffect(() => {
        if (count === 0) {
            setComponentStage('mounted');
        } else if (count < 5) {
            setComponentStage('updating-early');
        } else if (count < 10) {
            setComponentStage('updating-mid');
        } else {
            setComponentStage('updating-late');
        }
    }, [count]);

    const handleIncrement = () => {
        if (shouldUpdateRef.current) {
            setCount(prev => prev + 1);
        } else {
            addLog('🚫 Update blocked by shouldComponentUpdate simulation', 'blocked');
        }
    };

    const handleChangeUser = () => {
        const names = ['Swadeep', 'Abhronila', 'Debangshu', 'Tuhina'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        setUser({
            name: randomName,
            age: user.age + 1
        });
    };

    const handleAddMessage = () => {
        const newMessage = `Message #${messages.length + 1} from ${user.name}`;
        setMessages(prev => [...prev, newMessage]);
    };

    const clearLogs = () => {
        setLifecycleLogs([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <div
                    className="mb-8 animate-[fadeIn_0.8s_ease-out]"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Simulating Component Lifecycle Using <span className="text-blue-600 dark:text-blue-400">useEffect</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Bridging class component lifecycle methods with React Hooks
                    </p>
                </div>

                {/* Concept Explanation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Column - Theory */}
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                            <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">🔄</span>
                            From Class Lifecycle to useEffect
                        </h2>

                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <p>
                                Class components had specific lifecycle methods. With Hooks, we use <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useEffect</code> to achieve similar behavior in function components.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4">
                                <strong className="block mb-2 text-blue-800 dark:text-blue-300">Key Concept:</strong>
                                <p>useEffect with different dependency arrays can simulate different lifecycle phases.</p>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                                <strong className="block mb-2 text-green-800 dark:text-green-300">Migration Path:</strong>
                                <p>This is essential knowledge when migrating from class components to function components, or when reading older React codebases.</p>
                            </div>
                        </div>

                        {/* Lifecycle Comparison Table */}
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Lifecycle Method Mapping</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700">
                                            <th className="p-3 text-left">Class Method</th>
                                            <th className="p-3 text-left">useEffect Equivalent</th>
                                            <th className="p-3 text-left">Purpose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                            <td className="p-3"><code>componentDidMount</code></td>
                                            <td className="p-3">
                                                <code>
                                                    {`useEffect(() => { }, [])`}
                                                </code>
                                            </td>
                                            <td className="p-3">Run once after initial render</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                            <td className="p-3"><code>componentDidUpdate</code></td>
                                            <td className="p-3">
                                                <code>
                                                    {`useEffect(() => { }, [deps])`}
                                                </code>
                                            </td>
                                            <td className="p-3">Run when dependencies change</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                            <td className="p-3"><code>componentWillUnmount</code></td>
                                            <td className="p-3">
                                                <code>
                                                    {`useEffect(() => { return () => { } }, [])`}
                                                </code>
                                            </td>
                                            <td className="p-3">Cleanup before unmount</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                            <td className="p-3"><code>getDerivedStateFromProps</code></td>
                                            <td className="p-3">
                                                <code>
                                                    {`useEffect(() => { }, [props])`}
                                                </code>
                                            </td>
                                            <td className="p-3">Update state based on props</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visual Diagram */}
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_0.2s]"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                            <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">📊</span>
                            Lifecycle Visualization
                        </h2>

                        <div className="relative h-64 mb-6">
                            {/* Lifecycle Diagram */}
                            <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
                                {/* Mounting Phase */}
                                <g className="hover:scale-105 transition-transform duration-300">
                                    <rect x="50" y="40" width="100" height="50" rx="8"
                                        fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                                    <text x="100" y="70" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                                        Mounting
                                    </text>
                                    <text x="100" y="85" textAnchor="middle" className="text-[10px] fill-blue-600">
                                        useEffect([], cleanup)
                                    </text>
                                </g>

                                {/* Update Phase */}
                                <g className="hover:scale-105 transition-transform duration-300">
                                    <rect x="200" y="40" width="100" height="50" rx="8"
                                        fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                                    <text x="250" y="70" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                                        Updating
                                    </text>
                                    <text x="250" y="85" textAnchor="middle" className="text-[10px] fill-green-600">
                                        useEffect([deps])
                                    </text>
                                </g>

                                {/* Unmount Phase */}
                                <g className="hover:scale-105 transition-transform duration-300">
                                    <rect x="350" y="40" width="100" height="50" rx="8"
                                        fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="2" />
                                    <text x="400" y="70" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                                        Unmounting
                                    </text>
                                    <text x="400" y="85" textAnchor="middle" className="text-[10px] fill-red-600">
                                        cleanup function
                                    </text>
                                </g>

                                {/* Flow Arrows */}
                                <path d="M 155 65 L 195 65" stroke="#9CA3AF" strokeWidth="2" />
                                <polygon points="195,65 185,60 185,70" fill="#9CA3AF" />

                                <path d="M 305 65 L 345 65" stroke="#9CA3AF" strokeWidth="2" />
                                <polygon points="345,65 335,60 335,70" fill="#9CA3AF" />

                                {/* Cycle Arrow */}
                                <path d="M 455 65 L 455 150 L 50 150 L 50 95"
                                    stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                                <text x="250" y="140" textAnchor="middle" className="text-[10px] fill-purple-500">
                                    Update Cycle
                                </text>

                                {/* Current Stage Indicator */}
                                <g>
                                    <circle
                                        cx={
                                            componentStage === 'mounted' ? 100 :
                                                componentStage === 'updating-early' ? 250 :
                                                    componentStage === 'updating-mid' ? 250 :
                                                        componentStage === 'updating-late' ? 250 : 100
                                        }
                                        cy="110"
                                        r="15"
                                        fill="#F59E0B"
                                        className="animate-pulse"
                                    />
                                    <text
                                        x={
                                            componentStage === 'mounted' ? 100 :
                                                componentStage === 'updating-early' ? 250 :
                                                    componentStage === 'updating-mid' ? 250 :
                                                        componentStage === 'updating-late' ? 250 : 100
                                        }
                                        y="110"
                                        textAnchor="middle"
                                        dy=".3em"
                                        className="text-xs font-bold fill-gray-900"
                                    >
                                        ●
                                    </text>
                                </g>
                            </svg>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Current Stage:</div>
                                <div className={clsx(
                                    "font-bold text-lg",
                                    componentStage === 'mounted' && "text-blue-600 dark:text-blue-400",
                                    componentStage.includes('updating') && "text-green-600 dark:text-green-400"
                                )}>
                                    {componentStage.replace('-', ' ').toUpperCase()}
                                </div>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Derived State:</div>
                                <div className={clsx("font-bold", derivedState.color)}>
                                    {derivedState.status || 'Low'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Simulation */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.4s]">
                        <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">🎮</span>
                        Lifecycle Simulation Dashboard
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Control Panel */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Control Panel</h3>

                            <div className="space-y-4">
                                <button
                                    onClick={handleIncrement}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Increment Count (Trigger Update)
                                </button>

                                <button
                                    onClick={handleChangeUser}
                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Change User (Update Object)
                                </button>

                                <button
                                    onClick={handleAddMessage}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Add Message (Update Array)
                                </button>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={shouldUpdate}
                                                onChange={(e) => setShouldUpdate(e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={clsx(
                                                "block w-12 h-6 rounded-full transition-colors duration-300",
                                                shouldUpdate ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                                            )}></div>
                                            <div className={clsx(
                                                "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300",
                                                shouldUpdate ? "transform translate-x-6" : ""
                                            )}></div>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                            shouldComponentUpdate Simulation: {shouldUpdate ? '✅ Updates Allowed' : '⏸️ Updates Blocked'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Current State Values:</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Count:</span>
                                        <span className="font-bold text-blue-600 dark:text-blue-400">{count}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">User:</span>
                                        <span className="font-bold text-purple-600 dark:text-purple-400">{user.name} ({user.age})</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Messages:</span>
                                        <span className="font-bold text-green-600 dark:text-green-400">{messages.length} items</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lifecycle Logs */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Lifecycle Event Logs</h3>
                                <button
                                    onClick={clearLogs}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                                >
                                    Clear Logs
                                </button>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
                                {lifecycleLogs.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        <div className="text-center">
                                            <div className="text-4xl mb-2">📋</div>
                                            <p>Perform actions to see lifecycle events</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {lifecycleLogs.map((log) => (
                                            <div
                                                key={log.id}
                                                className={clsx(
                                                    "p-3 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-1",
                                                    log.type === 'mount' && "bg-blue-50 dark:bg-blue-900/20 border-blue-500",
                                                    log.type === 'update' && "bg-green-50 dark:bg-green-900/20 border-green-500",
                                                    log.type === 'unmount' && "bg-red-50 dark:bg-red-900/20 border-red-500",
                                                    log.type === 'special' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500",
                                                    log.type === 'blocked' && "bg-gray-100 dark:bg-gray-700 border-gray-500",
                                                    log.type === 'info' && "bg-gray-50 dark:bg-gray-800 border-gray-400"
                                                )}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="font-medium text-gray-800 dark:text-gray-200">{log.message}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                                                        {log.timestamp}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                    <span>Mount</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span>Update</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                    <span>Unmount</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                                    <span>Special</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code Examples */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.6s]">
                        <span className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-xl mr-4">💻</span>
                        Implementation Examples
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Example 1: componentDidMount Simulation */}
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl">🚀</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    componentDidMount Simulation
                                </h3>
                            </div>

                            <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4">
                                {`// Class Component
componentDidMount() {
  console.log('Component mounted');
  this.fetchData();
}

// Function Component with useEffect
useEffect(() => {
  console.log('Component mounted');
  fetchData();
  
  // componentWillUnmount simulation
  return () => {
    console.log('Component will unmount');
    cleanup();
  };
}, []); // Empty array = runs once`}
                            </pre>

                            <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                                <p className="text-blue-200 text-sm">
                                    <strong>Key Point:</strong> Empty dependency array ensures the effect runs only once after initial render, simulating componentDidMount.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: componentDidUpdate Simulation */}
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center mb-4">
                                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl">🔄</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    componentDidUpdate Simulation
                                </h3>
                            </div>

                            <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4">
                                {`// Class Component
componentDidUpdate(prevProps, prevState) {
  if (this.props.userId !== prevProps.userId) {
    this.fetchUserData(this.props.userId);
  }
}

// Function Component with useEffect
useEffect(() => {
  // This runs whenever userId changes
  if (userId) {
    fetchUserData(userId);
  }
}, [userId]); // Runs when userId changes

// Tracking previous values (like prevProps)
const prevUserIdRef = useRef();
useEffect(() => {
  if (prevUserIdRef.current !== userId) {
    console.log('UserId changed:', prevUserIdRef.current, '→', userId);
  }
  prevUserIdRef.current = userId;
}, [userId]);`}
                            </pre>

                            <div className="mt-4 p-3 bg-green-900/30 rounded-lg">
                                <p className="text-green-200 text-sm">
                                    <strong>Key Point:</strong> Include dependencies in the array to simulate componentDidUpdate for specific values.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_0.8s]">
                    <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
                        <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
                        Common Pitfalls & Migration Challenges
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Incorrect Dependency Arrays</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                When Swadeep migrates a class component, he might forget to include all dependencies in the array, causing stale closures or missing updates.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. Multiple Effects vs Single Lifecycle Method</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Abhronila tries to put all logic from componentDidMount and componentDidUpdate into one useEffect. This leads to complex conditions and bugs.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. Missing Cleanup Functions</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Debangshu forgets that componentWillUnmount logic goes in the cleanup function, leaving event listeners active after component unmounts.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. ShouldComponentUpdate Simulation</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Tuhina tries to exactly replicate shouldComponentUpdate with useRef and useEffect, but misses that React.memo provides a more direct equivalent.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
                        <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
                        Best Practices for Lifecycle Simulation
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Migration Strategy:</h4>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start">
                                    <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                                    Use ESLint exhaustive-deps rule to catch missing dependencies
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                                    Split complex lifecycle methods into multiple useEffect hooks
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                                    Use useRef to track previous values for comparison
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                                    Test mount/unmount cycles thoroughly
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Modern Alternatives:</h4>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start">
                                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">↪️</span>
                                    Use React.memo instead of shouldComponentUpdate
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">↪️</span>
                                    Consider useMemo/useCallback for derived values
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">↪️</span>
                                    Use custom hooks to encapsulate lifecycle logic
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">↪️</span>
                                    Embrace function component mindset, don't just translate class patterns
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-l-8 border-blue-500 dark:border-blue-400 rounded-2xl p-6 mb-12 hover:shadow-2xl transition-all duration-500 group">
                    <div className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl mr-6 group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-3xl">👨‍🏫</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                Teacher's Note
                            </h3>

                            <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    <strong>Think of lifecycle simulation like learning to drive an automatic car after knowing manual!</strong> The fundamentals are the same (steering, braking), but the implementation differs.
                                </p>

                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Just like how students from Barrackpore traveling to Shyamnagar need to adapt to different bus schedules, React developers need to adapt from class lifecycle to useEffect thinking.
                                </p>

                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Remember:</strong> useEffect isn't a 1:1 replacement for lifecycle methods—it's a more powerful abstraction. Don't fight it; embrace the mental model shift. The dependency array is your friend, not an obstacle.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                    <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        In my 27 years, I've seen many paradigm shifts. The key to mastering React Hooks is to stop thinking in lifecycle methods and start thinking in effects and dependencies.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                    <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        When debugging useEffect issues, ask: "When should this code run?" Your answer determines the dependency array.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                                <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
                                    <span className="mr-4"><strong>Sukanta Hui</strong></span>
                                    <span className="mr-4">27 years experience</span>
                                    <span>Web Development Expert</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 mb-12">
                    <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 flex items-center">
                        <span className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">💡</span>
                        Thinking Exercise
                    </h3>

                    <div className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Observe carefully:</strong> Watch the logs when you click "Increment Count" multiple times. Notice how componentDidUpdate simulation triggers each time, but with different messages based on the count value.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Try changing this:</strong> What happens if you toggle "shouldComponentUpdate Simulation" off and then try to increment the count? Why does the behavior change?
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Think about:</strong> How would you simulate getSnapshotBeforeUpdate using React Hooks? (Hint: This one is tricky and may not have a direct equivalent!)
                        </p>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-6 text-center">📋 Lifecycle Simulation Checklist</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gray-700/50 rounded-xl">
                            <div className="text-3xl mb-3">🚀</div>
                            <h4 className="font-bold mb-2">Mounting Phase</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li>UseEffect with [] for mount</li>
                                <li>Return cleanup for unmount</li>
                                <li>Fetch initial data here</li>
                                <li>Setup subscriptions</li>
                            </ul>
                        </div>

                        <div className="text-center p-4 bg-gray-700/50 rounded-xl">
                            <div className="text-3xl mb-3">🔄</div>
                            <h4 className="font-bold mb-2">Updating Phase</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li>UseEffect with dependencies</li>
                                <li>Track prev values with useRef</li>
                                <li>Split by concern</li>
                                <li>Cleanup before re-run</li>
                            </ul>
                        </div>

                        <div className="text-center p-4 bg-gray-700/50 rounded-xl">
                            <div className="text-3xl mb-3">🧠</div>
                            <h4 className="font-bold mb-2">Mental Shift</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li>Think in effects</li>
                                <li>Not 1:1 translation</li>
                                <li>Dependencies are key</li>
                                <li>Embrace function components</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-300">
                            <strong>Remember:</strong> useEffect(fn, deps) = "Run fn when deps change"
                        </p>
                    </div>
                </div>
            </div>

            {/* Inline CSS for animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out_0\\.2s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.6s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.8s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_1s\\] {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .group-hover\\:scale-110,
          .group-hover\\:rotate-12,
          .hover\\:scale-105,
          .hover\\:translate-x-1 {
            transform: none;
          }
          
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
};

export default Topic37;