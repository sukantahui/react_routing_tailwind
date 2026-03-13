import { useState } from 'react';
import clsx from 'clsx';

const Topic15 = () => {
    // Example 1: Click events with arguments
    const [clickHistory, setClickHistory] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [buttonClicks, setButtonClicks] = useState({});

    // Example 2: Dynamic button actions
    const [actions, setActions] = useState([
        { id: 1, name: 'Swadeep', action: 'Submit Assignment', location: 'Barrackpore', status: 'pending' },
        { id: 2, name: 'Tuhina', action: 'Ask Question', location: 'Shyamnagar', status: 'completed' },
        { id: 3, name: 'Abhronila', action: 'Request Leave', location: 'Naihati', status: 'pending' },
        { id: 4, name: 'Debangshu', action: 'Report Issue', location: 'Ichapur', status: 'in-progress' },
    ]);

    // Example 3: Calculator with operation arguments
    const [calculator, setCalculator] = useState({
        value1: 0,
        value2: 0,
        operation: '+',
        result: 0,
        history: []
    });

    // Example 4: Todo list with item-specific actions
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn onClick with arguments', completed: true, priority: 'high' },
        { id: 2, text: 'Practice onChange patterns', completed: false, priority: 'medium' },
        { id: 3, text: 'Master form onSubmit', completed: false, priority: 'high' },
        { id: 4, text: 'Build event handling app', completed: false, priority: 'low' },
    ]);

    // Example 5: Shopping cart with quantity updates
    const [cart, setCart] = useState([
        { id: 101, name: 'React Book', price: 29.99, quantity: 1, category: 'Books' },
        { id: 102, name: 'JavaScript Guide', price: 19.99, quantity: 2, category: 'Books' },
        { id: 103, name: 'Web Dev Course', price: 99.99, quantity: 1, category: 'Courses' },
    ]);

    // Add to history
    const addToHistory = (message, type = 'info') => {
        setClickHistory(prev => [
            {
                id: Date.now(),
                message,
                type,
                timestamp: new Date().toLocaleTimeString()
            },
            ...prev.slice(0, 9) // Keep last 10
        ]);
    };

    // ===== PATTERN 1: Inline Arrow Function =====
    const handleClickWithInlineArrow = (studentName, location) => {
        setSelectedStudent({ name: studentName, location });
        addToHistory(`Inline arrow: ${studentName} from ${location}`, 'inline-arrow');
    };

    // ===== PATTERN 2: Wrapper Function =====
    const createClickHandler = (studentName, location) => {
        return () => {
            setSelectedStudent({ name: studentName, location });
            addToHistory(`Wrapper function: ${studentName} from ${location}`, 'wrapper');
        };
    };

    // ===== PATTERN 3: Data Attributes =====
    const handleDataAttributeClick = (e) => {
        const name = e.target.dataset.name;
        const location = e.target.dataset.location;
        if (name && location) {
            setSelectedStudent({ name, location });
            addToHistory(`Data attribute: ${name} from ${location}`, 'data-attr');
        }
    };

    // ===== PATTERN 4: Higher-Order Function =====
    const withLogging = (fn, actionName) => {
        return (...args) => {
            addToHistory(`Starting: ${actionName}`, 'logging');
            const result = fn(...args);
            addToHistory(`Completed: ${actionName}`, 'logging');
            return result;
        };
    };

    const handleActionWithLogging = withLogging((actionId, newStatus) => {
        setActions(prev =>
            prev.map(action =>
                action.id === actionId
                    ? { ...action, status: newStatus }
                    : action
            )
        );
    }, 'Update Action Status');

    // ===== PATTERN 5: Button Counter with Arguments =====
    const handleButtonClickCounter = (buttonId) => {
        setButtonClicks(prev => ({
            ...prev,
            [buttonId]: (prev[buttonId] || 0) + 1
        }));
        addToHistory(`Button ${buttonId} clicked`, 'counter');
    };

    // ===== PATTERN 6: Calculator Operations =====
    const handleCalculatorOperation = (operation) => {
        const value1 = parseFloat(calculator.value1) || 0;
        const value2 = parseFloat(calculator.value2) || 0;
        let result;

        switch (operation) {
            case '+':
                result = value1 + value2;
                break;
            case '-':
                result = value1 - value2;
                break;
            case '*':
                result = value1 * value2;
                break;
            case '/':
                result = value2 !== 0 ? value1 / value2 : 'Error: Division by zero';
                break;
            default:
                result = 0;
        }

        setCalculator(prev => ({
            ...prev,
            operation,
            result,
            history: [
                `${value1} ${operation} ${value2} = ${result}`,
                ...prev.history.slice(0, 4)
            ]
        }));
        addToHistory(`Calculator: ${value1} ${operation} ${value2} = ${result}`, 'calculator');
    };

    const updateCalculatorValue = (field, value) => {
        setCalculator(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // ===== PATTERN 7: Todo List Actions =====
    const handleTodoAction = (todoId, action) => {
        switch (action) {
            case 'toggle':
                setTodos(prev =>
                    prev.map(todo =>
                        todo.id === todoId
                            ? { ...todo, completed: !todo.completed }
                            : todo
                    )
                );
                addToHistory(`Toggled todo ${todoId}`, 'todo');
                break;

            case 'delete':
                setTodos(prev => prev.filter(todo => todo.id !== todoId));
                addToHistory(`Deleted todo ${todoId}`, 'todo');
                break;

            case 'priority-up':
                const priorityOrder = { low: 'medium', medium: 'high', high: 'high' };
                setTodos(prev =>
                    prev.map(todo =>
                        todo.id === todoId
                            ? { ...todo, priority: priorityOrder[todo.priority] || todo.priority }
                            : todo
                    )
                );
                addToHistory(`Increased priority for todo ${todoId}`, 'todo');
                break;

            default:
                break;
        }
    };

    // ===== PATTERN 8: Shopping Cart Updates =====
    const handleCartUpdate = (itemId, action) => {
        switch (action) {
            case 'increment':
                setCart(prev =>
                    prev.map(item =>
                        item.id === itemId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
                addToHistory(`Incremented item ${itemId}`, 'cart');
                break;

            case 'decrement':
                setCart(prev =>
                    prev.map(item =>
                        item.id === itemId && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                );
                addToHistory(`Decremented item ${itemId}`, 'cart');
                break;

            case 'remove':
                setCart(prev => prev.filter(item => item.id !== itemId));
                addToHistory(`Removed item ${itemId} from cart`, 'cart');
                break;

            default:
                break;
        }
    };

    // ===== PATTERN 9: Form Submission with Data =====
    const handleFormSubmit = (formData) => {
        addToHistory(`Form submitted: ${JSON.stringify(formData)}`, 'form');
        // In real app, you would send to server
        console.log('Form data:', formData);
    };

    // ===== PATTERN 10: Event Object with Custom Data =====
    const handleCustomEvent = (e, customData) => {
        addToHistory(`Custom event with data: ${JSON.stringify(customData)}`, 'custom');
        // Can still access original event if needed
        console.log('Original event:', e.type);
    };

    // ===== RESET FUNCTIONS =====
    const resetAll = () => {
        setClickHistory([]);
        setSelectedStudent(null);
        setButtonClicks({});
        setActions([
            { id: 1, name: 'Swadeep', action: 'Submit Assignment', location: 'Barrackpore', status: 'pending' },
            { id: 2, name: 'Tuhina', action: 'Ask Question', location: 'Shyamnagar', status: 'completed' },
            { id: 3, name: 'Abhronila', action: 'Request Leave', location: 'Naihati', status: 'pending' },
            { id: 4, name: 'Debangshu', action: 'Report Issue', location: 'Ichapur', status: 'in-progress' },
        ]);
        setCalculator({
            value1: 0,
            value2: 0,
            operation: '+',
            result: 0,
            history: []
        });
        setTodos([
            { id: 1, text: 'Learn onClick with arguments', completed: true, priority: 'high' },
            { id: 2, text: 'Practice onChange patterns', completed: false, priority: 'medium' },
            { id: 3, text: 'Master form onSubmit', completed: false, priority: 'high' },
            { id: 4, text: 'Build event handling app', completed: false, priority: 'low' },
        ]);
        setCart([
            { id: 101, name: 'React Book', price: 29.99, quantity: 1, category: 'Books' },
            { id: 102, name: 'JavaScript Guide', price: 19.99, quantity: 2, category: 'Books' },
            { id: 103, name: 'Web Dev Course', price: 99.99, quantity: 1, category: 'Courses' },
        ]);
        addToHistory('All examples reset', 'reset');
    };

    // Calculate cart total
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500">
            <style>{`
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
        
        @keyframes pulseArgument {
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
      `}</style>

            {/* Header Section */}
            <div
                className="max-w-6xl mx-auto mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
                style={{ animation: 'fadeSlideUp 0.8s ease-out' }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
                    Passing Arguments to Event Handlers
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Learn different patterns for passing data to event handlers in React
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
                        Why Pass Arguments to Event Handlers?
                    </h2>

                    <div className="space-y-6">
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">The Challenge</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Event handlers in React receive the event object as their first argument. But often
                                we need to pass additional data like IDs, values, or other context. We can't simply
                                call 
                                <code>
                                    {`onClick={handleClick(id)}`}
                                </code> because that would invoke the function immediately.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ WRONG: Immediate Invocation</h3>
                                <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                                    {`// This calls handleClick immediately!\n`}
                                    {`<button onClick={handleClick(id)}>\n`}
                                    {`  Click me\n`}
                                    {`</button>\n\n`}
                                    {`// Result: handleClick runs on render, not on click!`}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Function is called during render, not when clicked
                                </p>
                            </div>

                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ CORRECT: Function Reference</h3>
                                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                                    {`// This passes a function reference\n`}
                                    {`<button onClick={() => handleClick(id)}>\n`}
                                    {`  Click me\n`}
                                    {`</button>\n\n`}
                                    {`// Result: handleClick runs only on click`}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Arrow function creates a new function that calls handleClick with arguments
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Key Concept</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                React expects a <strong>function reference</strong> for event handlers, not a function call.
                                We need to create a new function that, when called, will invoke our handler with the
                                desired arguments.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pattern Comparison */}
                <div
                    className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]
                     motion-safe:animate-[pulseArgument_3s_ease-in-out_infinite]"
                    style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🔄</span>
                        Pattern Comparison: Student Selection
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Pattern 1 */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="text-center mb-3">
                                <div className="text-2xl mb-2">1.</div>
                                <h3 className="font-bold text-gray-800 dark:text-white">Inline Arrow Function</h3>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleClickWithInlineArrow('Swadeep', 'Barrackpore')}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Select Swadeep
                                </button>

                                <button
                                    onClick={() => handleClickWithInlineArrow('Tuhina', 'Shyamnagar')}
                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Select Tuhina
                                </button>
                            </div>

                            <div className="mt-4 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                                {`<button onClick={() =>\n  handleClick(studentId)\n}>`}
                            </div>

                            <div className="mt-2 text-xs text-gray-500">
                                <strong>Pros:</strong> Simple, inline<br />
                                <strong>Cons:</strong> Creates new function on each render
                            </div>
                        </div>

                        {/* Pattern 2 */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="text-center mb-3">
                                <div className="text-2xl mb-2">2.</div>
                                <h3 className="font-bold text-gray-800 dark:text-white">Wrapper Function</h3>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={createClickHandler('Abhronila', 'Naihati')}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Select Abhronila
                                </button>

                                <button
                                    onClick={createClickHandler('Debangshu', 'Ichapur')}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Select Debangshu
                                </button>
                            </div>

                            <div className="mt-4 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                                {`const handler = (id) => () => {\n  handleClick(id);\n};\n\n`}
                                {`<button onClick={handler(id)}>`}
                            </div>

                            <div className="mt-2 text-xs text-gray-500">
                                <strong>Pros:</strong> Clean JSX, reusable<br />
                                <strong>Cons:</strong> Extra function creation
                            </div>
                        </div>

                        {/* Pattern 3 */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="text-center mb-3">
                                <div className="text-2xl mb-2">3.</div>
                                <h3 className="font-bold text-gray-800 dark:text-white">Data Attributes</h3>
                            </div>

                            <div className="space-y-3">
                                <button
                                    data-name="Arghya"
                                    data-location="Kolkata"
                                    onClick={handleDataAttributeClick}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Select Arghya
                                </button>

                                <button
                                    data-name="Priya"
                                    data-location="Howrah"
                                    onClick={handleDataAttributeClick}
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Select Priya
                                </button>
                            </div>

                            <div className="mt-4 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                                {`<button \n  data-id={id}\n  onClick={handleClick}\n>\n\n`}
                                {`// In handler:\nconst id = e.target.dataset.id;`}
                            </div>

                            <div className="mt-2 text-xs text-gray-500">
                                <strong>Pros:</strong> Single handler, HTML5 standard<br />
                                <strong>Cons:</strong> Type conversion needed
                            </div>
                        </div>
                    </div>

                    {/* Selected Student Display */}
                    {selectedStudent && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Selected Student</h3>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-xl">👨‍🎓</span>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{selectedStudent.name}</div>
                                    <div className="text-gray-600 dark:text-gray-400">From {selectedStudent.location}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Items with Status Updates */}
                <div
                    className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 dark:border-green-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
                    style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📋</span>
                        Action Items with Multiple Arguments
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Student Actions</h3>

                            <div className="space-y-4">
                                {actions.map(action => (
                                    <div
                                        key={action.id}
                                        className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <div className="font-bold">{action.name}</div>
                                                <div className="text-sm text-gray-500">{action.location}</div>
                                            </div>
                                            <span className={clsx(
                                                "px-3 py-1 rounded-full text-xs font-medium",
                                                action.status === 'completed' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                                                action.status === 'pending' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                                                action.status === 'in-progress' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                            )}>
                                                {action.status}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm text-gray-500 mb-1">Action:</div>
                                            <div className="font-medium">{action.action}</div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() => handleActionWithLogging(action.id, 'pending')}
                                                className={clsx(
                                                    "py-2 rounded text-sm transition-all duration-300 hover:scale-[1.02]",
                                                    action.status === 'pending'
                                                        ? "bg-yellow-500 text-white"
                                                        : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 dark:text-yellow-300"
                                                )}
                                            >
                                                Pending
                                            </button>

                                            <button
                                                onClick={() => handleActionWithLogging(action.id, 'in-progress')}
                                                className={clsx(
                                                    "py-2 rounded text-sm transition-all duration-300 hover:scale-[1.02]",
                                                    action.status === 'in-progress'
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300"
                                                )}
                                            >
                                                In Progress
                                            </button>

                                            <button
                                                onClick={() => handleActionWithLogging(action.id, 'completed')}
                                                className={clsx(
                                                    "py-2 rounded text-sm transition-all duration-300 hover:scale-[1.02]",
                                                    action.status === 'completed'
                                                        ? "bg-green-500 text-white"
                                                        : "bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300"
                                                )}
                                            >
                                                Completed
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Pattern Explanation</h3>

                            <div className="space-y-6">
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">Higher-Order Function Pattern</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        This pattern uses a function that returns another function. The outer function
                                        captures the arguments, and the inner function uses them when called.
                                    </p>

                                    <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                                        {`// Higher-order function with logging\n`}
                                        {`const withLogging = (fn, actionName) => {\n`}
                                        {`  return (...args) => {\n`}
                                        {`    console.log(\`Starting: \${actionName}\`);\n`}
                                        {`    const result = fn(...args);\n`}
                                        {`    console.log(\`Completed: \${actionName}\`);\n`}
                                        {`    return result;\n`}
                                        {`  };\n`}
                                        {`};\n\n`}
                                        {`// Usage\n`}
                                        {`const handleAction = withLogging(\n`}
                                        {`  (id, status) => { /* update logic */ },\n`}
                                        {`  'Update Status'\n`}
                                        {`);\n\n`}
                                        {`// In JSX\n`}
                                        {`<button onClick={() => handleAction(id, 'completed')}>\n`}
                                        {`  Mark Complete\n`}
                                        {`</button>`}
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Performance Consideration</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Inline arrow functions create new function instances on every render. For lists
                                        with many items, consider using memoization or the wrapper function pattern.
                                    </p>
                                </div>

                                <div className="p-4 bg-gray-900 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">Multiple Arguments Pattern</div>
                                    <div className="font-mono text-xs text-green-300">
                                        {`// Passing multiple arguments\n`}
                                        {`<button onClick={() => handleAction(id, status, user)}>\n`}
                                        {`  Do Action\n`}
                                        {`</button>\n\n`}
                                        {`// Handler receives all arguments\n`}
                                        {`const handleAction = (id, status, user) => {\n`}
                                        {`  console.log(id, status, user);\n`}
                                        {`  // Update logic here\n`}
                                        {`};`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculator with Operation Arguments */}
                <div
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
                    style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🧮</span>
                        Calculator: Dynamic Operation Arguments
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Calculator</h3>

                            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Value 1</label>
                                        <input
                                            type="number"
                                            value={calculator.value1}
                                            onChange={(e) => updateCalculatorValue('value1', e.target.value)}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Value 2</label>
                                        <input
                                            type="number"
                                            value={calculator.value2}
                                            onChange={(e) => updateCalculatorValue('value2', e.target.value)}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        <button
                                            onClick={() => handleCalculatorOperation('+')}
                                            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                               transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => handleCalculatorOperation('-')}
                                            className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg
                               transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            -
                                        </button>
                                        <button
                                            onClick={() => handleCalculatorOperation('*')}
                                            className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg
                               transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            ×
                                        </button>
                                        <button
                                            onClick={() => handleCalculatorOperation('/')}
                                            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg
                               transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            ÷
                                        </button>
                                    </div>

                                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1">Result</div>
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {calculator.result}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {calculator.value1} {calculator.operation} {calculator.value2}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Calculation History</h3>

                            <div className="space-y-4">
                                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-3">Recent Calculations</h4>

                                    <div className="space-y-2">
                                        {calculator.history.length === 0 ? (
                                            <div className="text-center py-4 text-gray-500">No calculations yet</div>
                                        ) : (
                                            calculator.history.map((calc, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded"
                                                >
                                                    <div className="font-mono">{calc}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {index === 0 ? 'Latest' : `${index} ago`}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-900 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">Operation Handler Pattern</div>
                                    <div className="font-mono text-xs text-green-300">
                                        {`// Single handler for multiple operations\n`}
                                        {`const handleOperation = (operation) => {\n`}
                                        {`const value1 = parseFloat(calculator.value1) || 0;`}
                                        {`const value2 = parseFloat(calculator.value2) || 0;`}
                                        {`let result;\n\n`}
                                        {`  switch (operation) {\n`}
                                        {`    case '+': result = value1 + value2; break;\n`}
                                        {`    case '-': result = value1 - value2; break;\n`}
                                        {`    // ... other operations\n`}
                                        {`  }\n\n`}
                                        {`  setCalculator(prev => ({ ...prev, operation, result }));\n`}
                                        {`};\n\n`}
                                        {`// In JSX - pass operation as argument\n`}
                                        {`<button onClick={() => handleOperation('+')}>+</button>\n`}
                                        {`<button onClick={() => handleOperation('-')}>-</button>`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Todo List with Item Actions */}
                <div
                    className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100 dark:border-orange-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
                    style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">✅</span>
                        Todo List: Multiple Actions per Item
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Todo Items</h3>

                            <div className="space-y-4">
                                {todos.map(todo => (
                                    <div
                                        key={todo.id}
                                        className={clsx(
                                            "p-4 rounded-lg border transition-all duration-300",
                                            todo.completed
                                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                                            todo.priority === 'high' && "border-l-4 border-red-500",
                                            todo.priority === 'medium' && "border-l-4 border-yellow-500",
                                            todo.priority === 'low' && "border-l-4 border-blue-500"
                                        )}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start space-x-3">
                                                <button
                                                    onClick={() => handleTodoAction(todo.id, 'toggle')}
                                                    className={clsx(
                                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                        todo.completed
                                                            ? "bg-green-500 border-green-500"
                                                            : "border-gray-300 dark:border-gray-600 hover:border-green-500"
                                                    )}
                                                >
                                                    {todo.completed && "✓"}
                                                </button>
                                                <div>
                                                    <div className={clsx(
                                                        "font-medium",
                                                        todo.completed && "line-through text-gray-500"
                                                    )}>
                                                        {todo.text}
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className={clsx(
                                                            "px-2 py-1 rounded-full text-xs",
                                                            todo.priority === 'high' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                                                            todo.priority === 'medium' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                                                            todo.priority === 'low' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                        )}>
                                                            {todo.priority} priority
                                                        </span>
                                                        <span className={clsx(
                                                            "px-2 py-1 rounded-full text-xs",
                                                            todo.completed
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                        )}>
                                                            {todo.completed ? "Completed" : "Pending"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleTodoAction(todo.id, 'priority-up')}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                    title="Increase priority"
                                                >
                                                    ⬆
                                                </button>
                                                <button
                                                    onClick={() => handleTodoAction(todo.id, 'delete')}
                                                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                    title="Delete todo"
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2 mt-3">
                                            <button
                                                onClick={() => handleTodoAction(todo.id, 'toggle')}
                                                className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                                 rounded text-sm transition-colors"
                                            >
                                                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Action Pattern</h3>

                            <div className="space-y-6">
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">Switch Statement Pattern</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        This pattern uses a single handler with a switch statement to handle multiple
                                        action types for the same item.
                                    </p>

                                    <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                                        {`// Single handler for multiple todo actions\n`}
                                        {`const handleTodoAction = (todoId, action) => {\n`}
                                        {`  switch (action) {\n`}
                                        {`    case 'toggle':\n`}
                                        {`      // Toggle completion logic\n`}
                                        {`      break;\n`}
                                        {`    case 'delete':\n`}
                                        {`      // Delete todo logic\n`}
                                        {`      break;\n`}
                                        {`    case 'priority-up':\n`}
                                        {`      // Increase priority logic\n`}
                                        {`      break;\n`}
                                        {`  }\n`}
                                        {`};\n\n`}
                                        {`// In JSX - pass todo ID and action type\n`}
                                        {`<button onClick={() => handleTodoAction(id, 'toggle')}>\n`}
                                        {`  Toggle Complete\n`}
                                        {`</button>\n`}
                                        {`<button onClick={() => handleTodoAction(id, 'delete')}>\n`}
                                        {`  Delete\n`}
                                        {`</button>`}
                                    </div>
                                </div>

                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Benefits</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        <li>• Single handler function for all related actions</li>
                                        <li>• Clear separation of action types</li>
                                        <li>• Easy to add new action types</li>
                                        <li>• Consistent pattern across all items</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-gray-900 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">Alternative: Multiple Handlers</div>
                                    <div className="font-mono text-xs text-yellow-300">
                                        {`// Alternative: Separate handlers\n`}
                                        {`const handleToggle = (id) => { /* ... */ };\n`}
                                        {`const handleDelete = (id) => { /* ... */ };\n`}
                                        {`const handlePriorityUp = (id) => { /* ... */ };\n\n`}
                                        {`// In JSX\n`}
                                        {`<button onClick={() => handleToggle(id)}>Toggle</button>\n`}
                                        {`<button onClick={() => handleDelete(id)}>Delete</button>`}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Trade-off: More handler functions but each is simpler
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shopping Cart */}
                <div
                    className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-pink-100 dark:border-pink-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
                    style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🛒</span>
                        Shopping Cart: Complex Item Updates
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Cart Items</h3>

                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div
                                        key={item.id}
                                        className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-sm text-gray-500">{item.category}</div>
                                            </div>
                                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleCartUpdate(item.id, 'decrement')}
                                                    disabled={item.quantity <= 1}
                                                    className={clsx(
                                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                                        item.quantity <= 1
                                                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                                            : "bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300"
                                                    )}
                                                >
                                                    -
                                                </button>

                                                <div className="w-12 text-center font-bold">{item.quantity}</div>

                                                <button
                                                    onClick={() => handleCartUpdate(item.id, 'increment')}
                                                    className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-600 
                                   dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300
                                   flex items-center justify-center"
                                                >
                                                    +
                                                </button>

                                                <div className="ml-4 text-gray-600 dark:text-gray-400">
                                                    ${item.price} each
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleCartUpdate(item.id, 'remove')}
                                                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Cart Summary */}
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-sm text-gray-500">Total Items</div>
                                            <div className="text-xl font-bold">
                                                {cart.reduce((total, item) => total + item.quantity, 0)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Cart Total</div>
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                ${cartTotal.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quantity Update Pattern</h3>

                            <div className="space-y-6">
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">Action-Based Updates</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        Similar to the todo pattern, but with quantity-specific logic for increment
                                        and decrement operations.
                                    </p>

                                    <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                                        {`// Cart update handler with action types\n`}
                                        {`const handleCartUpdate = (itemId, action) => {\n`}
                                        {`  switch (action) {\n`}
                                        {`    case 'increment':\n`}
                                        {`      setCart(prev => prev.map(item =>\n`}
                                        {`        item.id === itemId\n`}
                                        {`          ? { ...item, quantity: item.quantity + 1 }\n`}
                                        {`          : item\n`}
                                        {`      ));\n`}
                                        {`      break;\n`}
                                        {`    \n`}
                                        {`    case 'decrement':\n`}
                                        {`      setCart(prev => prev.map(item =>\n`}
                                        {`        item.id === itemId && item.quantity > 1\n`}
                                        {`          ? { ...item, quantity: item.quantity - 1 }\n`}
                                        {`          : item\n`}
                                        {`      ));\n`}
                                        {`      break;\n`}
                                        {`    \n`}
                                        {`    case 'remove':\n`}
                                        {`      setCart(prev => prev.filter(item => item.id !== itemId));\n`}
                                        {`      break;\n`}
                                        {`  }\n`}
                                        {`};\n\n`}
                                        {`// Usage in JSX\n`}
                                        {`<button onClick={() => handleCartUpdate(item.id, 'increment')}>\n`}
                                        {`  +\n`}
                                        {`</button>\n`}
                                        {`<button onClick={() => handleCartUpdate(item.id, 'decrement')}>\n`}
                                        {`  -\n`}
                                        {`</button>`}
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Conditional Logic</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Note how the decrement action includes a condition to prevent quantity from
                                        going below 1. This demonstrates how you can include conditional logic within
                                        your action handlers.
                                    </p>
                                </div>

                                <div className="p-4 bg-gray-900 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">Alternative: Separate Value</div>
                                    <div className="font-mono text-xs text-yellow-300">
                                        {`// Alternative: Pass new quantity directly\n`}
                                        {`const handleQuantityChange = (itemId, newQuantity) => {\n`}
                                        {`  if (newQuantity < 1) return;\n`}
                                        {`  setCart(prev => prev.map(item =>\n`}
                                        {`    item.id === itemId\n`}
                                        {`      ? { ...item, quantity: newQuantity }\n`}
                                        {`      : item\n`}
                                        {`  ));\n`}
                                        {`};\n\n`}
                                        {`// Usage\n`}
                                        {`<button onClick={() => handleQuantityChange(id, quantity + 1)}>\n`}
                                        {`  Increase\n`}
                                        {`</button>`}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        More flexible but requires calculating new value in JSX
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Patterns */}
                <div
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]"
                    style={{ animation: 'fadeSlideUp 0.8s ease-out 0.7s both' }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🎯</span>
                        Additional Patterns & Best Practices
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Pattern 9: Form Submission */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Form Submission Pattern</h3>

                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                                    {`// Form component with inline handler\n`}
                                    {`const FormComponent = () => {\n`}
                                    {`  const [formData, setFormData] = useState({ name: '', email: '' });\n`}
                                    {`  \n`}
                                    {`  const handleSubmit = (e, extraData) => {\n`}
                                    {`    e.preventDefault();\n`}
                                    {`    // Combine form data with extra arguments\n`}
                                    {`    onSubmit({ ...formData, ...extraData });\n`}
                                    {`  };\n`}
                                    {`  \n`}
                                    {`  return (\n`}
                                    {`    <form onSubmit={(e) => handleSubmit(e, { source: 'web', timestamp: Date.now() })}>\n`}
                                    {`      {/* form fields */}\n`}
                                    {`      <button type="submit">Submit</button>\n`}
                                    {`    </form>\n`}
                                    {`  );\n`}
                                    {`};`}
                                </div>
                            </div>

                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Key Insight</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    You can pass both the event object and custom arguments to form handlers. The
                                    event object is always the first argument.
                                </p>
                            </div>
                        </div>

                        {/* Pattern 10: Event Object with Custom Data */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Event + Custom Data</h3>

                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                                    {`// Handler that accepts both event and custom data\n`}
                                    {`const handleClickWithData = (e, customData) => {\n`}
                                    {`  // Can still prevent default if needed\n`}
                                    {`  if (customData.preventDefault) {\n`}
                                    {`    e.preventDefault();\n`}
                                    {`  }\n`}
                                    {`  \n`}
                                    {`  // Use both event data and custom data\n`}
                                    {`  console.log('Target:', e.target);\n`}
                                    {`  console.log('Custom:', customData);\n`}
                                    {`};\n\n`}
                                    {`// Usage\n`}
                                    {`<a \n`}
                                    {`  href="#" \n`}
                                    {`  onClick={(e) => handleClickWithData(e, { id: 1, action: 'delete' })}\n`}
                                    {`>\n`}
                                    {`  Delete Item\n`}
                                    {`</a>`}
                                </div>
                            </div>

                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={(e) => handleCustomEvent(e, { action: 'test', value: 123 })}
                                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                                >
                                    Test Event + Data
                                </button>

                                <button
                                    onClick={(e) => handleCustomEvent(e, {
                                        type: 'analytics',
                                        event: 'button_click',
                                        page: 'arguments_demo'
                                    })}
                                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                                >
                                    Analytics Event
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Best Practices Card */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">Best Practices Summary</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">✓</div>
                                    <span className="font-medium">Use inline arrow for simple cases</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                                    Perfect for components with few re-renders
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">✓</div>
                                    <span className="font-medium">Use wrapper functions for performance</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                                    When dealing with large lists or frequent re-renders
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">✓</div>
                                    <span className="font-medium">Consider data attributes</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                                    When you need to extract data from DOM elements
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">✓</div>
                                    <span className="font-medium">Use higher-order functions</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                                    For cross-cutting concerns like logging or analytics
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Log */}
                <div
                    className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]"
                    style={{ animation: 'fadeSlideUp 0.8s ease-out 0.8s both' }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                            <span className="bg-gray-800 dark:bg-gray-700 text-white rounded-lg p-2 mr-3 text-xl">📝</span>
                            Event History
                        </h2>
                        <button
                            onClick={resetAll}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                            Reset All
                        </button>
                    </div>

                    <div className="space-y-3">
                        {clickHistory.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No events yet. Click some buttons to see the history!
                            </div>
                        ) : (
                            clickHistory.map(entry => (
                                <div
                                    key={entry.id}
                                    className="history-entry p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-3">
                                            <div className={clsx(
                                                "w-2 h-2 rounded-full",
                                                entry.type === 'inline-arrow' && "bg-blue-500",
                                                entry.type === 'wrapper' && "bg-green-500",
                                                entry.type === 'data-attr' && "bg-purple-500",
                                                entry.type === 'logging' && "bg-yellow-500",
                                                entry.type === 'counter' && "bg-pink-500",
                                                entry.type === 'calculator' && "bg-cyan-500",
                                                entry.type === 'todo' && "bg-orange-500",
                                                entry.type === 'cart' && "bg-red-500",
                                                entry.type === 'form' && "bg-indigo-500",
                                                entry.type === 'custom' && "bg-teal-500",
                                                entry.type === 'reset' && "bg-gray-500"
                                            )} />
                                            <div className="font-medium">{entry.message}</div>
                                        </div>
                                        <div className="text-sm text-gray-500">{entry.timestamp}</div>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1 ml-5">
                                        Type: {entry.type}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center py-8">
                    <div className="text-gray-600 dark:text-gray-400 mb-2">
                        Pass arguments confidently to your React event handlers!
                    </div>
                    <div className="text-sm text-gray-500">
                        Patterns demonstrated: Inline Arrow Functions • Wrapper Functions • Data Attributes •
                        Higher-Order Functions • Switch Statement Handlers • Form Submission • Custom Events
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic15; 