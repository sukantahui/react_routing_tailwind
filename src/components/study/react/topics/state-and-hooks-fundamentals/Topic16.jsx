import React, { useState } from 'react';
import clsx from 'clsx';

const Topic16 = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState({
    Swadeep: false,
    Tuhina: false,
    Abhronila: false,
    Debangshu: false,
    Rajat: false
  });
  const [messages, setMessages] = useState([]);
  const [filterType, setFilterType] = useState('all');

  // Sample student data
  const students = [
    { id: 1, name: 'Swadeep', city: 'Barrackpore', grade: 'A' },
    { id: 2, name: 'Tuhina', city: 'Shyamnagar', grade: 'B' },
    { id: 3, name: 'Abhronila', city: 'Ichapur', grade: 'A+' },
    { id: 4, name: 'Debangshu', city: 'Naihati', grade: 'B+' },
    { id: 5, name: 'Rajat', city: 'Barrackpore', grade: 'A' }
  ];

  // Event handler with argument passed
  const handleStudentClick = (studentName) => {
    setSelectedStudent(studentName);
    addMessage(`${studentName} was clicked`);
  };

  // Event handler with multiple arguments
  const handleMarkAttendance = (studentName, isPresent) => {
    setAttendance(prev => ({
      ...prev,
      [studentName]: isPresent
    }));
    addMessage(`${studentName} marked as ${isPresent ? 'Present' : 'Absent'}`);
  };

  // Event handler with object argument
  const handleSendMessage = (student) => {
    addMessage(`Message sent to ${student.name} from ${student.city}`);
  };

  // Event handler with event object plus custom arguments
  const handleGradeUpdate = (event, studentId, newGrade) => {
    event.stopPropagation(); // Prevent event bubbling
    addMessage(`Student ID ${studentId} grade updated to ${newGrade}`);
  };

  // Helper function to add messages
  const addMessage = (text) => {
    setMessages(prev => [
      { id: Date.now(), text, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4) // Keep only last 5 messages
    ]);
  };

  // Filter messages based on type
  const filteredMessages = messages.filter(msg => {
    if (filterType === 'all') return true;
    if (filterType === 'click') return msg.text.includes('clicked');
    if (filterType === 'attendance') return msg.text.includes('marked');
    if (filterType === 'message') return msg.text.includes('Message sent');
    if (filterType === 'grade') return msg.text.includes('grade updated');
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6 transition-colors duration-300">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="animate-[slideUp_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
            Topic 16: Passing Arguments to Event Handlers
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Learn how to pass custom data to event handlers in React components
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Concept Explanation Card */}
        <section className="animate-[slideUp_1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/10">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Understanding Argument Passing in Event Handlers
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                In React, event handlers often need access to specific data related to the event. 
                Unlike regular JavaScript where you can directly pass arguments to functions, 
                React event handlers receive the <span className="text-cyan-400 font-semibold">event object</span> automatically.
              </p>
              
              <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h3 className="font-bold text-lg text-cyan-300 mb-2">Core Concept</h3>
                <p>
                  When you need to pass additional data (like an ID, name, or custom object) to an event handler, 
                  you must wrap the handler call in an <span className="text-yellow-400 font-mono">inline arrow function</span> 
                  or use <span className="text-yellow-400 font-mono">bind</span> method.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Method 1: Arrow Function */}
                <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-green-400 font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-400">Arrow Function Method</h3>
                  </div>
                  <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
{`<button onClick={() => 
  handleClick(item.id)}
>
  Select Item
</button>`}
                  </pre>
                  <p className="mt-3 text-gray-400 text-sm">
                    Creates a new function each render. Use for simple cases.
                  </p>
                </div>

                {/* Method 2: Bind Method */}
                <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-blue-400 font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-400">Bind Method</h3>
                  </div>
                  <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
{`<button onClick={
  handleClick.bind(null, item.id)}
>
  Select Item
</button>`}
                  </pre>
                  <p className="mt-3 text-gray-400 text-sm">
                    Creates function once. Better for performance-critical cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="animate-[slideUp_1.2s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Interactive Demo: Student Management System
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Student List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-300 mb-4">Student List (Click to Select)</h3>
                <div className="space-y-3">
                  {students.map((student, index) => (
                    <div 
                      key={student.id}
                      className={clsx(
                        "p-4 rounded-xl border transition-all duration-300 cursor-pointer group",
                        selectedStudent === student.name 
                          ? "border-cyan-500 bg-cyan-900/20" 
                          : "border-gray-700 hover:border-gray-500 hover:bg-gray-800/30"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => handleStudentClick(student.name)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-cyan-300 transition-colors">
                            {student.name}
                          </h4>
                          <p className="text-gray-400 text-sm">{student.city} • Grade: {student.grade}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleGradeUpdate(e, student.id, 'A+')}
                            className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg hover:bg-green-800/50 transition-colors text-sm border border-green-800/50"
                          >
                            A+
                          </button>
                          <button
                            onClick={(e) => handleSendMessage(student)}
                            className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-800/50 transition-colors text-sm border border-blue-800/50"
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Management */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Attendance Management</h3>
                  <div className="space-y-3">
                    {Object.entries(attendance).map(([name, isPresent], index) => (
                      <div 
                        key={name}
                        className="flex items-center justify-between p-3 bg-gray-900/40 rounded-lg border border-gray-800 hover:bg-gray-800/60 transition-all duration-300"
                        style={{ animationDelay: `${index * 100 + 500}ms` }}
                      >
                        <span className="font-medium">{name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleMarkAttendance(name, true)}
                            className={clsx(
                              "px-4 py-1 rounded-lg transition-colors border",
                              isPresent 
                                ? "bg-green-900/50 text-green-300 border-green-700" 
                                : "bg-gray-800 text-gray-400 hover:bg-green-900/30 hover:text-green-300 border-gray-700"
                            )}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(name, false)}
                            className={clsx(
                              "px-4 py-1 rounded-lg transition-colors border",
                              !isPresent 
                                ? "bg-red-900/50 text-red-300 border-red-700" 
                                : "bg-gray-800 text-gray-400 hover:bg-red-900/30 hover:text-red-300 border-gray-700"
                            )}
                          >
                            Absent
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Student Display */}
                {selectedStudent && (
                  <div className="p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-700/30 animate-[slideUp_0.5s_ease-out]">
                    <h4 className="font-bold text-lg text-cyan-300 mb-2">Currently Selected:</h4>
                    <p className="text-gray-300">
                      You selected <span className="font-bold text-cyan-400">{selectedStudent}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Event Log Section */}
        <section className="animate-[slideUp_1.4s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/30 transition-all duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-300 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Event Log (Real-time Activity Feed)
              </h2>
              
              <div className="flex gap-2 flex-wrap">
                {['all', 'click', 'attendance', 'message', 'grade'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={clsx(
                      "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                      filterType === type
                        ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700"
                        : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                    )}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/60 rounded-xl p-4 max-h-80 overflow-y-auto">
              {filteredMessages.length > 0 ? (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className="p-3 bg-gray-800/40 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-gray-300">{msg.text}</p>
                          {msg.text.includes('grade updated') && (
                            <div className="mt-2 inline-block px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded border border-purple-800/50">
                              Event + Custom Data
                            </div>
                          )}
                          {msg.text.includes('marked') && (
                            <div className="mt-2 inline-block px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded border border-green-800/50">
                              Two Arguments
                            </div>
                          )}
                          {msg.text.includes('Message sent') && (
                            <div className="mt-2 inline-block px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded border border-blue-800/50">
                              Object Argument
                            </div>
                          )}
                        </div>
                        <span className="text-gray-500 text-sm ml-4">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  <p>No events yet. Interact with the demo above!</p>
                </div>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Each log entry shows how arguments were passed to the event handler
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="animate-[slideUp_1.6s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Code Examples & Patterns
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Common Patterns */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-300">Common Patterns</h3>
                
                <div className="space-y-4">
                  <div className="group bg-gray-900/40 p-4 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                    <h4 className="font-bold text-blue-400 mb-2">Single Argument</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-sm overflow-x-auto">
{`// Parent component
<StudentCard 
  onClick={() => selectStudent(id)}
/>

// Handler receives just the ID
const selectStudent = (studentId) => {
  console.log(studentId);
};`}
                    </pre>
                  </div>

                  <div className="group bg-gray-900/40 p-4 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
                    <h4 className="font-bold text-purple-400 mb-2">Event + Custom Data</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-sm overflow-x-auto">
{`// Need both event and custom data
<button onClick={(e) => 
  handleClick(e, userData)}
>
  Submit
</button>

const handleClick = (event, data) => {
  event.preventDefault();
  console.log(data);
};`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Professional Tips */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-300">Professional Tips</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-400 mb-1">Performance Consideration</h4>
                        <p className="text-gray-300 text-sm">
                          Arrow functions create new functions on each render. For lists with many items, 
                          consider using <code className="text-cyan-400">useCallback</code> or the bind method.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-400 mb-1">Clean Code Practice</h4>
                        <p className="text-gray-300 text-sm">
                          Keep inline arrow functions simple. If logic gets complex, extract it to a 
                          separate function that returns the handler.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="animate-[slideUp_1.8s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-red-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Common Pitfalls & Solutions
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Common Mistakes */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-300">Common Mistakes</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-red-400">Incorrect: Calling Immediately</h4>
                    </div>
                    <pre className="bg-gray-950 p-3 rounded-lg text-sm overflow-x-auto">
{`// ❌ WRONG - Calls immediately!
<button onClick={handleClick(userId)}>
  Click me
</button>`}
                    </pre>
                    <p className="mt-2 text-gray-300 text-sm">
                      The function gets called during render, not on click!
                    </p>
                  </div>

                  <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-red-400">Missing Event Parameter</h4>
                    </div>
                    <pre className="bg-gray-950 p-3 rounded-lg text-sm overflow-x-auto">
{`// ❌ WRONG - No way to access event
<button onClick={() => handleClick(data)}>
  Click me
</button>

// Handler wants event but can't get it
const handleClick = (event) => {
  event.preventDefault(); // ❌ event is undefined!
};`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Correct Solutions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-300">Correct Solutions</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-green-400">Correct: Arrow Function</h4>
                    </div>
                    <pre className="bg-gray-950 p-3 rounded-lg text-sm overflow-x-auto">
{`// ✅ CORRECT - Creates function on click
<button onClick={() => handleClick(userId)}>
  Click me
</button>

// Or pass event if needed
<button onClick={(e) => handleClick(e, userId)}>
  Click me
</button>`}
                    </pre>
                  </div>

                  <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-green-400">Bind Method Alternative</h4>
                    </div>
                    <pre className="bg-gray-950 p-3 rounded-lg text-sm overflow-x-auto">
{`// ✅ CORRECT - Better for performance
<button onClick={handleClick.bind(null, userId)}>
  Click me
</button>

// Handler can accept both
const handleClick = (userId, event) => {
  // userId is first, event is second
};`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_2s_ease-out]">
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-700/50 hover:border-cyan-500/70 transition-all duration-500 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-300">Teacher's Note</h3>
                    <p className="text-cyan-400/80">Sukanta Hui • 27 years experience</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Email: sukantahui@codernaccotax.co.in</p>
                    <p>Mobile: 7003756860</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="bg-cyan-900/20 p-4 rounded-xl border border-cyan-800/30">
                    <h4 className="font-bold text-cyan-300 mb-2">Classroom Analogy</h4>
                    <p>
                      Think of event handlers like classroom attendance. When I call "Swadeep, present?" 
                      I'm passing the argument "Swadeep" to the attendance function. The function needs to 
                      know <span className="text-yellow-300">which student</span> I'm referring to.
                    </p>
                    <p className="mt-2">
                      Similarly, in React, when Tuhina clicks her "Submit" button, we need to pass 
                      <span className="text-yellow-300"> her specific data</span> to the handler, not just know that "someone clicked."
                    </p>
                  </div>

                  <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/30">
                    <h4 className="font-bold text-blue-300 mb-2">Professional Insight</h4>
                    <p>
                      In my experience, beginners often struggle with the <span className="text-yellow-300">timing of function calls</span>. 
                      Remember: <code className="text-cyan-400">handleClick(data)</code> calls immediately, while 
                      <code className="text-cyan-400">() => handleClick(data)</code> creates a function that calls later.
                    </p>
                    <p className="mt-2">
                      When working with lists in Barrackpure school's student management system, we use the 
                      bind method for better performance with hundreds of students.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-green-400 mb-2">Remember This</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Arrow functions wrap your call</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Pass event as first arg if needed</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Use bind for performance in lists</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-yellow-400 mb-2">Debugging Tip</h4>
                      <p className="text-sm">
                        If your handler receives <code className="text-red-400">undefined</code>, check:
                      </p>
                      <ol className="text-sm space-y-1 mt-2 ml-4 list-decimal">
                        <li>Are you calling instead of passing? (No parentheses)</li>
                        <li>Is the argument in correct order?</li>
                        <li>Does parent component pass the data correctly?</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[slideUp_2.2s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Understand the difference between passing a function and calling it",
                "Know when to use arrow functions vs bind method",
                "Remember to pass the event object if needed for preventDefault()",
                "Practice with different argument types (strings, numbers, objects)",
                "Test edge cases (undefined arguments, null values)",
                "Consider performance implications for large lists",
                "Use proper TypeScript/prop-types for argument validation",
                "Keep inline functions simple; extract complex logic",
                "Document what arguments your handlers expect"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-900/40 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-500/30 transition-colors">
                    <span className="text-purple-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-purple-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-700/30">
              <h4 className="font-bold text-pink-300 mb-2">Hint Section</h4>
              <p className="text-gray-300">
                <span className="text-yellow-300">Think about:</span> What happens if Debangshu and Abhronila both click their 
                buttons at the same time? How does React ensure each click handler receives the correct 
                student's data? Observe the event log carefully when multiple students interact.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Animation keyframes in style tag */}
      <style jsx>{`
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

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideUp_0\\.8s_ease-out\\],
          .animate-\\[slideUp_1s_ease-out\\],
          .animate-\\[slideUp_1\\.2s_ease-out\\],
          .animate-\\[slideUp_1\\.4s_ease-out\\],
          .animate-\\[slideUp_1\\.6s_ease-out\\],
          .animate-\\[slideUp_1\\.8s_ease-out\\],
          .animate-\\[slideUp_2s_ease-out\\],
          .animate-\\[slideUp_2\\.2s_ease-out\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic16;