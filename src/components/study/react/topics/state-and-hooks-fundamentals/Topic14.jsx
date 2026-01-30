import { useState } from 'react';
import clsx from 'clsx';

const Topic14 = () => {
  // Example 1: Click events
  const [clickCount, setClickCount] = useState(0);
  const [lastClickPosition, setLastClickPosition] = useState({ x: 0, y: 0 });
  const [buttonHistory, setButtonHistory] = useState([]);

  // Example 2: Form events
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newsletter: false,
    comments: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Example 3: Mouse events
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mouseEvents, setMouseEvents] = useState([]);

  // Example 4: Keyboard events
  const [keyPressed, setKeyPressed] = useState('');
  const [keyHistory, setKeyHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Event history
  const [eventHistory, setEventHistory] = useState([]);

  const addEventHistory = (eventType, details, element = '') => {
    setEventHistory(prev => [
      {
        id: Date.now(),
        eventType,
        details,
        element,
        timestamp: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 14) // Keep last 15 entries
    ]);
  };

  // ===== CLICK EVENT HANDLERS =====
  const handleButtonClick = (e) => {
    setClickCount(prev => prev + 1);
    setLastClickPosition({ x: e.clientX, y: e.clientY });
    
    const buttonName = e.target.textContent || 'Unknown Button';
    setButtonHistory(prev => [buttonName, ...prev.slice(0, 4)]);
    
    addEventHistory('onClick', `Button "${buttonName}" clicked`, 'button');
  };

  const handleDivClick = (e) => {
    addEventHistory('onClick', `Div clicked at (${e.clientX}, ${e.clientY})`, 'div');
  };

  const handleImageClick = () => {
    addEventHistory('onClick', 'Profile image clicked', 'img');
  };

  const handlePreventDefaultClick = (e) => {
    e.preventDefault();
    addEventHistory('onClick', 'Default prevented (link click)', 'a');
  };

  const handleStopPropagationClick = (e) => {
    e.stopPropagation();
    addEventHistory('onClick', 'Propagation stopped', 'button (child)');
  };

  // ===== FORM EVENT HANDLERS =====
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    addEventHistory('onChange', `Field "${name}" changed to: "${value}"`, `input[name="${name}"]`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.email.includes('@')) errors.email = 'Valid email is required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addEventHistory('onSubmit', 'Form submission failed - validation errors', 'form');
    } else {
      setFormSubmitted(true);
      setFormErrors({});
      addEventHistory('onSubmit', 'Form submitted successfully!', 'form');
      
      // In real app, you would send data to server here
      console.log('Form data:', formData);
    }
  };

  const handleFormReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      newsletter: false,
      comments: ''
    });
    setFormSubmitted(false);
    setFormErrors({});
    addEventHistory('onReset', 'Form reset to initial values', 'form');
  };

  const handleTextareaChange = (e) => {
    setFormData(prev => ({
      ...prev,
      comments: e.target.value
    }));
    addEventHistory('onChange', `Comments updated (${e.target.value.length} chars)`, 'textarea');
  };

  // ===== MOUSE EVENT HANDLERS =====
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setMouseEvents(prev => ['Mouse entered', ...prev.slice(0, 4)]);
    addEventHistory('onMouseEnter', 'Mouse entered element', 'hover-div');
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMouseEvents(prev => ['Mouse left', ...prev.slice(0, 4)]);
    addEventHistory('onMouseLeave', 'Mouse left element', 'hover-div');
  };

  const handleMouseDown = (e) => {
    setMouseEvents(prev => [`Mouse down (button: ${e.button})`, ...prev.slice(0, 4)]);
    addEventHistory('onMouseDown', `Mouse button ${e.button} pressed`, 'interactive-div');
  };

  const handleMouseUp = (e) => {
    setMouseEvents(prev => [`Mouse up (button: ${e.button})`, ...prev.slice(0, 4)]);
    addEventHistory('onMouseUp', `Mouse button ${e.button} released`, 'interactive-div');
  };

  const handleDoubleClick = () => {
    setMouseEvents(prev => ['Double click!', ...prev.slice(0, 4)]);
    addEventHistory('onDoubleClick', 'Double click detected', 'interactive-div');
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMouseEvents(prev => ['Context menu prevented', ...prev.slice(0, 4)]);
    addEventHistory('onContextMenu', 'Context menu prevented (right-click)', 'interactive-div');
  };

  // ===== KEYBOARD EVENT HANDLERS =====
  const handleKeyDown = (e) => {
    setKeyPressed(e.key);
    setKeyHistory(prev => [e.key, ...prev.slice(0, 9)]);
    addEventHistory('onKeyDown', `Key down: "${e.key}" (code: ${e.code})`, 'input');
  };

  const handleKeyUp = (e) => {
    addEventHistory('onKeyUp', `Key up: "${e.key}"`, 'input');
  };

  const handleKeyPress = (e) => {
    addEventHistory('onKeyPress', `Key press: "${e.key}"`, 'input');
  };

  const handleInputChangeKeyboard = (e) => {
    setInputValue(e.target.value);
  };

  const handleSpecialKey = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      addEventHistory('onKeyDown', 'Ctrl+S pressed (save prevented)', 'document');
    }
    if (e.key === 'Escape') {
      addEventHistory('onKeyDown', 'Escape key pressed', 'document');
    }
  };

  // Add global keyboard listener
  useState(() => {
    const handleGlobalKeyDown = (e) => handleSpecialKey(e);
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  });

  // ===== FOCUS/BLUR EVENT HANDLERS =====
  const handleFocus = (fieldName) => {
    addEventHistory('onFocus', `Field "${fieldName}" focused`, `input[name="${fieldName}"]`);
  };

  const handleBlur = (fieldName) => {
    addEventHistory('onBlur', `Field "${fieldName}" blurred`, `input[name="${fieldName}"]`);
  };

  // ===== SCROLL EVENT HANDLER =====
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    addEventHistory('onScroll', `Scrolled to position: ${scrollTop}px`, 'scroll-div');
  };

  // ===== RESET FUNCTIONS =====
  const resetAll = () => {
    setClickCount(0);
    setLastClickPosition({ x: 0, y: 0 });
    setButtonHistory([]);
    setFormData({
      username: '',
      email: '',
      password: '',
      newsletter: false,
      comments: ''
    });
    setFormSubmitted(false);
    setFormErrors({});
    setMousePosition({ x: 0, y: 0 });
    setIsHovering(false);
    setMouseEvents([]);
    setKeyPressed('');
    setKeyHistory([]);
    setInputValue('');
    setEventHistory([]);
    addEventHistory('System', 'All events reset', 'app');
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
        
        @keyframes pulseEvent {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
            border-color: rgba(59, 130, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
            border-color: rgba(59, 130, 246, 0.7);
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
          Event Handling in React Components
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Learn how to handle user interactions with React's synthetic event system
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
            React Synthetic Events
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">What are Synthetic Events?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                React uses a <strong>synthetic event system</strong> that wraps native browser events. 
                This provides consistent behavior across all browsers and includes performance optimizations 
                like event pooling. Synthetic events have the same interface as native events.
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Event Naming</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    camelCase: <code>onClick</code>, <code>onChange</code>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Pass function reference
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Not string like HTML
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Common Events</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <code>onClick</code> - Mouse clicks
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <code>onChange</code> - Input changes
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <code>onSubmit</code> - Form submission
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <code>onKeyDown</code> - Keyboard press
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Event Object</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <code>e.target</code> - Event source
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <code>e.preventDefault()</code>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <code>e.stopPropagation()</code>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Browser-specific properties
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">⚠️ Important Difference</h3>
              <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                {`// HTML (WRONG in React)\n<button onclick="handleClick()">Click</button>\n\n`}
                {`// React (CORRECT)\n<button onClick={handleClick}>Click</button>`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                In React, event handlers are passed as function references, not strings
              </p>
            </div>
          </div>
        </div>

        {/* Click Events Demo */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🖱️</span>
            Click Events (onClick)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Interactive Demo</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{clickCount}</div>
                    <div className="text-sm text-gray-500">Total Clicks</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={handleButtonClick}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium
                               transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Click Me!
                    </button>
                    
                    <button
                      onClick={handleButtonClick}
                      className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                               transition-all duration-300 hover:scale-[1.02]"
                    >
                      Me Too!
                    </button>
                  </div>
                  
                  <button
                    onClick={handleButtonClick}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Big Click Button
                  </button>
                </div>
                
                <div 
                  onClick={handleDivClick}
                  className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
                           rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700
                           cursor-pointer hover:border-blue-400 dark:hover:border-blue-600
                           transition-all duration-300 text-center"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <div className="font-medium">Click this div area</div>
                  <div className="text-sm text-gray-500 mt-1">(Even non-button elements can have click events)</div>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Event Methods Demo</h4>
                  
                  <div className="space-y-3">
                    <a 
                      href="#"
                      onClick={handlePreventDefaultClick}
                      className="block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 
                               dark:hover:bg-blue-900/50 transition-colors text-blue-700 dark:text-blue-300"
                    >
                      Link with preventDefault() - won't navigate
                    </a>
                    
                    <div 
                      onClick={() => addEventHistory('onClick', 'Parent div clicked', 'div (parent)')}
                      className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="font-medium mb-2">Parent Div (click propagates)</div>
                      <button
                        onClick={handleStopPropagationClick}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Child Button (stops propagation)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Click Information</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Last Click Details</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                      <div className="text-xs text-gray-500">X Position</div>
                      <div className="font-mono">{lastClickPosition.x}px</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                      <div className="text-xs text-gray-500">Y Position</div>
                      <div className="font-mono">{lastClickPosition.y}px</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Click Position Visualization</div>
                    <div className="relative h-32 bg-gray-100 dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-700">
                      {lastClickPosition.x > 0 && lastClickPosition.y > 0 && (
                        <div 
                          className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                          style={{ left: `${Math.min(lastClickPosition.x, 300)}px`, top: `${Math.min(lastClickPosition.y, 120)}px` }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Recent Button Clicks</h4>
                  
                  <div className="space-y-2">
                    {buttonHistory.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">No button clicks yet</div>
                    ) : (
                      buttonHistory.map((button, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded"
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span>{button}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {index === 0 ? 'Just now' : `${index + 1} clicks ago`}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Event Handler Code</div>
                  <div className="font-mono text-xs text-green-300">
                    {`const handleButtonClick = (event) => {\n`}
                    {`  // Access event properties\n`}
                    {`  console.log('Clicked at:', event.clientX, event.clientY);\n`}
                    {`  console.log('Target:', event.target);\n`}
                    {`  \n`}
                    {`  // Update state\n`}
                    {`  setClickCount(prev => prev + 1);\n`}
                    {`  \n`}
                    {`  // Control event behavior\n`}
                    {`  // event.preventDefault();  // Prevent default action\n`}
                    {`  // event.stopPropagation(); // Stop bubbling\n`}
                    {`};`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Events Demo */}
        <div 
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 dark:border-green-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📝</span>
            Form Events (onChange, onSubmit, onReset)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Registration Form</h3>
              
              <form 
                onSubmit={handleFormSubmit}
                onReset={handleFormReset}
                className="space-y-6"
              >
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  {formSubmitted ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🎉</div>
                      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                        Form Submitted Successfully!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Thank you for registering, {formData.username}!
                      </p>
                      <button
                        type="button"
                        onClick={handleFormReset}
                        className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        Submit Another
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Username *
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('username')}
                            onBlur={() => handleBlur('username')}
                            className={clsx(
                              "w-full p-3 border rounded-lg transition-all duration-300",
                              formErrors.username
                                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            )}
                            placeholder="Enter your username"
                          />
                          {formErrors.username && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.username}</div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            className={clsx(
                              "w-full p-3 border rounded-lg transition-all duration-300",
                              formErrors.email
                                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            )}
                            placeholder="Enter your email"
                          />
                          {formErrors.email && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password *
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                            className={clsx(
                              "w-full p-3 border rounded-lg transition-all duration-300",
                              formErrors.password
                                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            )}
                            placeholder="Enter your password"
                          />
                          {formErrors.password && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.password}</div>
                          )}
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300">
                            Subscribe to newsletter
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Comments
                          </label>
                          <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleTextareaChange}
                            onFocus={() => handleFocus('comments')}
                            onBlur={() => handleBlur('comments')}
                            rows="3"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                                     bg-white dark:bg-gray-800 resize-none transition-all duration-300"
                            placeholder="Any additional comments..."
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {formData.comments.length}/500 characters
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                          type="submit"
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                                   transition-all duration-300 hover:scale-[1.02]"
                        >
                          Submit Form
                        </button>
                        
                        <button
                          type="reset"
                          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium
                                   transition-all duration-300 hover:scale-[1.02]"
                        >
                          Reset
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Form Data & Events</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Current Form Data</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Username:</span>
                      <span className="font-medium">{formData.username || 'Not set'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="font-medium">{formData.email || 'Not set'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Password:</span>
                      <span className="font-medium">{'•'.repeat(formData.password.length)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Newsletter:</span>
                      <span className={`font-medium ${formData.newsletter ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formData.newsletter ? 'Subscribed ✓' : 'Not subscribed ✗'}
                      </span>
                    </div>
                    
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1">Comments:</div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded text-sm">
                        {formData.comments || 'No comments yet'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Form Event Methods</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">preventDefault()</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Prevents the default form submission (page reload). Always use in React forms.
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Form Validation</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Validate in submit handler, update errors state, display to user.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">onChange Handler Code</div>
                  <div className="font-mono text-xs text-green-300">
                    {`const handleInputChange = (event) => {\n`}
                    {`  const { name, value, type, checked } = event.target;\n`}
                    {`  \n`}
                    {`  setFormData(prev => ({\n`}
                    {`    ...prev,\n`}
                    {`    [name]: type === 'checkbox' ? checked : value\n`}
                    {`  }));\n`}
                    {`};`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mouse Events Demo */}
        <div 
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🐭</span>
            Mouse Events (onMouseEnter, onMouseLeave, etc.)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Mouse Interaction Area</h3>
              
              <div className="space-y-6">
                <div 
                  onMouseMove={handleMouseMove}
                  className="p-8 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-700
                           text-center relative overflow-hidden"
                >
                  <div className="text-3xl mb-4">🖱️</div>
                  <div className="font-medium mb-2">Move Mouse Here</div>
                  <div className="text-sm text-gray-500">
                    Track mouse position in this area
                  </div>
                  
                  {/* Mouse position indicator */}
                  <div 
                    className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${Math.min(mousePosition.x - 32, 300)}px`, 
                      top: `${Math.min(mousePosition.y - 32, 200)}px` 
                    }}
                  />
                </div>
                
                <div 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={clsx(
                    "p-8 rounded-xl border-2 transition-all duration-300 text-center cursor-pointer",
                    isHovering
                      ? "bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  )}
                >
                  <div className="text-3xl mb-4">{isHovering ? "🎯" : "📦"}</div>
                  <div className="font-medium mb-2">
                    {isHovering ? "Mouse is OVER!" : "Hover Over Me"}
                  </div>
                  <div className="text-sm text-gray-500">
                    onMouseEnter / onMouseLeave events
                  </div>
                </div>
                
                <div 
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onDoubleClick={handleDoubleClick}
                  onContextMenu={handleContextMenu}
                  className="p-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 
                           rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700
                           text-center cursor-pointer transition-all duration-300
                           hover:border-solid hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <div className="text-3xl mb-4">🎮</div>
                  <div className="font-medium mb-2">Interactive Zone</div>
                  <div className="text-sm text-gray-500 mb-4">
                    Try: Click, Double-click, Right-click
                  </div>
                  <div className="text-xs text-gray-500">
                    (Right-click shows context menu - prevented in demo)
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Mouse Event Information</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Mouse Position</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                      <div className="text-xs text-gray-500">X Coordinate</div>
                      <div className="font-mono text-lg">{mousePosition.x}px</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                      <div className="text-xs text-gray-500">Y Coordinate</div>
                      <div className="font-mono text-lg">{mousePosition.y}px</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Relative to viewport. Updates on mouse move.
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Recent Mouse Events</h4>
                  
                  <div className="space-y-2">
                    {mouseEvents.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">No mouse events yet</div>
                    ) : (
                      mouseEvents.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded"
                        >
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-2 h-2 rounded-full mr-3",
                              event.includes('entered') ? "bg-green-500" :
                              event.includes('left') ? "bg-red-500" :
                              event.includes('down') ? "bg-blue-500" :
                              event.includes('up') ? "bg-purple-500" :
                              event.includes('Double') ? "bg-yellow-500" :
                              "bg-gray-500"
                            )}></div>
                            <span>{event}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {index === 0 ? 'Just now' : `${index} events ago`}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Mouse Event Handlers</div>
                  <div className="font-mono text-xs text-green-300">
                    {`// Multiple mouse events on one element\n`}
                    {`<div\n`}
                    {`  onMouseEnter={handleMouseEnter}\n`}
                    {`  onMouseLeave={handleMouseLeave}\n`}
                    {`  onMouseDown={handleMouseDown}\n`}
                    {`  onMouseUp={handleMouseUp}\n`}
                    {`  onDoubleClick={handleDoubleClick}\n`}
                    {`  onContextMenu={handleContextMenu}\n`}
                    {`>\n`}
                    {`  Interactive content\n`}
                    {`</div>`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Events Demo */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⌨️</span>
            Keyboard Events (onKeyDown, onKeyUp, onKeyPress)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Keyboard Input Area</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Type Here</h4>
                  
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChangeKeyboard}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onKeyPress={handleKeyPress}
                    onFocus={() => addEventHistory('onFocus', 'Keyboard input focused', 'input')}
                    onBlur={() => addEventHistory('onBlur', 'Keyboard input blurred', 'input')}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Start typing to see keyboard events..."
                  />
                  
                  <div className="mt-4 text-sm text-gray-500">
                    Try: Regular keys, Enter, Escape, Arrow keys, etc.
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Global Keyboard Events</h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <div className="font-medium mb-1">Try These Global Shortcuts:</div>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">S</kbd> - Save prevented</li>
                        <li>• <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Escape</kbd> - Escape key press</li>
                      </ul>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Global events are attached to window/document, not specific elements.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Keyboard Information</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Last Key Pressed</h4>
                  
                  <div className="text-center p-8">
                    <div className={clsx(
                      "text-5xl font-bold mb-4 transition-all duration-300",
                      keyPressed ? "text-green-600 dark:text-green-400" : "text-gray-300 dark:text-gray-600"
                    )}>
                      {keyPressed || "?"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {keyPressed ? `Key: "${keyPressed}"` : 'Press any key'}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Recent Key History</h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {keyHistory.length === 0 ? (
                      <div className="text-center w-full py-4 text-gray-500">No keys pressed yet</div>
                    ) : (
                      keyHistory.map((key, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "px-3 py-2 rounded-lg border transition-all duration-300",
                            index === 0
                              ? "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700"
                              : "bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700"
                          )}
                        >
                          <div className="font-mono text-center">{key}</div>
                          <div className="text-xs text-gray-500 text-center mt-1">
                            {index === 0 ? 'latest' : `-${index}`}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Keyboard Event Differences</div>
                  <div className="font-mono text-xs text-green-300">
                    {`onKeyDown - Fires when key is pressed down\n`}
                    {`onKeyUp   - Fires when key is released\n`}
                    {`onKeyPress - Fires for character keys (deprecated)\n`}
                    {`\n`}
                    {`// Check for special keys\n`}
                    {`if (event.key === 'Enter') {\n`}
                    {`  // Handle enter key\n`}
                    {`}\n`}
                    {`if (event.ctrlKey && event.key === 's') {\n`}
                    {`  event.preventDefault(); // Prevent save dialog\n`}
                    {`}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event History */}
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
              Event History
            </h2>
            <button
              onClick={() => setEventHistory([])}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                       text-gray-800 dark:text-white rounded-lg transition-all duration-300"
            >
              Clear History
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto p-2">
            {eventHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-4">📝</div>
                <p>Interact with the demos to see event history</p>
                <p className="text-sm mt-2">All events will be logged here</p>
              </div>
            ) : (
              eventHistory.map(entry => (
                <div
                  key={entry.id}
                  className={clsx(
                    "history-entry p-4 rounded-lg border transition-all duration-300",
                    entry.eventType === 'onClick' && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                    entry.eventType === 'onChange' && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                    entry.eventType === 'onSubmit' && "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                    entry.eventType === 'onReset' && "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700",
                    entry.eventType === 'onMouseEnter' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                    entry.eventType === 'onMouseLeave' && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                    entry.eventType === 'onMouseDown' && "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                    entry.eventType === 'onMouseUp' && "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
                    entry.eventType === 'onDoubleClick' && "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
                    entry.eventType === 'onContextMenu' && "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                    entry.eventType === 'onKeyDown' && "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800",
                    entry.eventType === 'onKeyUp' && "bg-lime-50 dark:bg-lime-900/20 border-lime-200 dark:border-lime-800",
                    entry.eventType === 'onKeyPress' && "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
                    entry.eventType === 'onFocus' && "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
                    entry.eventType === 'onBlur' && "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800",
                    entry.eventType === 'onScroll' && "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
                    entry.eventType === 'System' && "bg-gray-200 dark:bg-gray-900 border-gray-400 dark:border-gray-700"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{entry.eventType}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{entry.details}</div>
                      <div className="text-xs text-gray-500 mt-2">Element: {entry.element}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</div>
                      <span className={clsx(
                        "text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block",
                        entry.eventType === 'onClick' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                        entry.eventType === 'onChange' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                        entry.eventType === 'onSubmit' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                        entry.eventType === 'onReset' && "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300",
                        entry.eventType === 'onMouseEnter' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                        entry.eventType === 'onMouseLeave' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                        entry.eventType === 'onMouseDown' && "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
                        entry.eventType === 'onMouseUp' && "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
                        entry.eventType === 'onDoubleClick' && "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
                        entry.eventType === 'onContextMenu' && "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
                        entry.eventType === 'onKeyDown' && "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
                        entry.eventType === 'onKeyUp' && "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
                        entry.eventType === 'onKeyPress' && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
                        entry.eventType === 'onFocus' && "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
                        entry.eventType === 'onBlur' && "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
                        entry.eventType === 'onScroll' && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
                        entry.eventType === 'System' && "bg-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-300"
                      )}>
                        {entry.eventType}
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
            Best Practices & Common Patterns
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Event Handler Naming</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <code>handleClick</code> for click events
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <code>handleChange</code> for input changes
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <code>handleSubmit</code> for form submission
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Descriptive names based on action
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Common Pitfalls</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Calling function instead of passing reference
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Forgetting <code>preventDefault()</code> in forms
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Not cleaning up global event listeners
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Mutating event objects
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Performance Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Debounce frequent events (scroll, resize)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Use event delegation for many elements
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Clean up listeners in useEffect
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Avoid inline arrow functions in render
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Event Handling Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using camelCase event names (onClick, not onclick)
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Passing function reference, not calling it
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using preventDefault() for form submissions
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Accessing event properties (e.target.value)
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using descriptive handler names
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Cleaning up global event listeners
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]
                     motion-safe:animate-[pulseEvent_3s_ease-in-out_infinite]"
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
                  <strong>Think of event handling as a conversation:</strong> When Swadeep from Barrackpore 
                  raises his hand in class, the teacher responds. Events are the user "raising their hand" 
                  and event handlers are your application's response.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Always preventDefault in forms:</strong> This is React 101
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Use event delegation:</strong> Attach one listener to parent instead of many to children
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Learn event properties:</strong> e.target, e.currentTarget, e.clientX, etc.
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Practice patterns:</strong> Form handling, button clicks, keyboard shortcuts
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "When Tuhina from Shyamnagar submits her assignment online, the form doesn't refresh the page. 
                  That's preventDefault() in action. Understanding events is understanding how users interact 
                  with your application."
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
                What's the difference between <code>e.target</code> and <code>e.currentTarget</code>? 
                When would you use each?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Click the "Child Button (stops propagation)" and watch the event history. 
                What happens to the parent div's click event? Why?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try implementing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Create a custom hook that tracks mouse position globally. 
                Remember to add and remove the event listener properly.
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
            Reset All Events & Data
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Next: Learn about Handling onClick, onChange, and onSubmit Events in Detail
        </p>
      </div>
    </div>
  );
};

export default Topic14;