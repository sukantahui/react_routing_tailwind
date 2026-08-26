import React, { useState } from 'react';
import clsx from 'clsx';

const Topic23 = () => {
  // User state
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    role: 'student', // student, teacher, admin
    subscription: 'free', // free, pro, enterprise
    notifications: 3,
    darkMode: true
  });

  // UI state
  const [activeExample, setActiveExample] = useState('if');
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Examples
  const examples = [
    { id: 'if', label: 'if Statement', icon: '🤔', color: 'blue' },
    { id: 'ternary', label: 'Ternary Operator', icon: '❓', color: 'green' },
    { id: 'logical', label: 'Logical &&', icon: '🔗', color: 'purple' },
    { id: 'switch', label: 'Switch Case', icon: '🔀', color: 'yellow' },
    { id: 'complex', label: 'Complex Conditions', icon: '🧩', color: 'cyan' },
    { id: 'patterns', label: 'Patterns', icon: '📐', color: 'pink' }
  ];

  // Mock data for examples
  const students = [
    { id: 1, name: 'Swadeep Das', grade: 'A', city: 'Barrackpore', active: true },
    { id: 2, name: 'Tuhina Roy', grade: 'B+', city: 'Shyamnagar', active: true },
    { id: 3, name: 'Abhronila Sen', grade: 'A+', city: 'Ichapur', active: false },
    { id: 4, name: 'Debangshu Dey', grade: 'B', city: 'Naihati', active: true }
  ];

  // Color mapping for dynamic classes
  const colorMap = {
    blue: { border: 'border-blue-500', bg: 'bg-blue-900/10', text: 'text-blue-300' },
    green: { border: 'border-green-500', bg: 'bg-green-900/10', text: 'text-green-300' },
    purple: { border: 'border-purple-500', bg: 'bg-purple-900/10', text: 'text-purple-300' },
    yellow: { border: 'border-yellow-500', bg: 'bg-yellow-900/10', text: 'text-yellow-300' },
    cyan: { border: 'border-cyan-500', bg: 'bg-cyan-900/10', text: 'text-cyan-300' },
    pink: { border: 'border-pink-500', bg: 'bg-pink-900/10', text: 'text-pink-300' }
  };

  // Simulate login/logout
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        ...user,
        isLoggedIn: true,
        name: 'Swadeep Das',
        role: 'student',
        subscription: 'pro',
        notifications: 3
      });
      setLoading(false);
      setError('');
    }, 1000);
  };

  const handleLogout = () => {
    setUser({
      ...user,
      isLoggedIn: false,
      name: '',
      role: 'student',
      subscription: 'free',
      notifications: 0
    });
  };

  const handleRoleChange = (role) => {
    setUser({
      ...user,
      role
    });
  };

  const handleSubscriptionChange = (subscription) => {
    setUser({
      ...user,
      subscription
    });
  };

  const toggleDarkMode = () => {
    setUser({
      ...user,
      darkMode: !user.darkMode
    });
  };

  const clearNotifications = () => {
    setUser({
      ...user,
      notifications: 0
    });
  };

  // Get active example color
  const getActiveColor = () => {
    const example = examples.find(ex => ex.id === activeExample);
    return example?.color || 'blue';
  };

  // Get active color classes
  const getActiveColorClasses = () => {
    const color = getActiveColor();
    return colorMap[color] || colorMap.blue;
  };

  // Render content based on active example
  const renderExample = () => {
    switch (activeExample) {
      case 'if':
        return renderIfExample();
      case 'ternary':
        return renderTernaryExample();
      case 'logical':
        return renderLogicalExample();
      case 'switch':
        return renderSwitchExample();
      case 'complex':
        return renderComplexExample();
      case 'patterns':
        return renderPatternsExample();
      default:
        return renderIfExample();
    }
  };

  // Example 1: if Statement
  const renderIfExample = () => {
    let greeting = '';
    if (user.isLoggedIn) {
      greeting = `Welcome back, ${user.name}!`;
    } else {
      greeting = 'Please log in to continue';
    }

    let userStatus = '';
    if (user.role === 'admin') {
      userStatus = 'Administrator';
    } else if (user.role === 'teacher') {
      userStatus = 'Instructor';
    } else {
      userStatus = 'Student';
    }

    return (
      <div className="space-y-6">
        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-blue-400 mb-4">if Statement Examples</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Simple if-else</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <p className="text-lg text-center">{greeting}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Using if-else to set variable before rendering
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">if-else if-else Chain</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center gap-3">
                  <div className={clsx(
                    "w-3 h-3 rounded-full",
                    user.role === 'admin' ? "bg-red-500" :
                    user.role === 'teacher' ? "bg-yellow-500" : "bg-green-500"
                  )} />
                  <p className="text-lg">Role: {userStatus}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Multiple conditions with else-if chain
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Nested if Statements</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                {(() => {
                  if (user.isLoggedIn) {
                    if (user.subscription === 'enterprise') {
                      return (
                        <div className="text-center">
                          <p className="text-xl text-purple-400">🌟 Enterprise Member</p>
                          <p className="text-sm text-gray-400">Full access to all features</p>
                        </div>
                      );
                    } else if (user.subscription === 'pro') {
                      return (
                        <div className="text-center">
                          <p className="text-xl text-green-400">⭐ Pro Member</p>
                          <p className="text-sm text-gray-400">Access to premium features</p>
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-center">
                          <p className="text-xl text-gray-400">Free Member</p>
                          <p className="text-sm text-gray-400">Basic features only</p>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className="text-center text-gray-500">
                        Please log in to see subscription status
                      </div>
                    );
                  }
                })()}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Nested if statements for complex logic
              </p>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
            <h4 className="font-bold text-blue-300 mb-3">Code Example</h4>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Simple if-else
let greeting = '';
if (user.isLoggedIn) {
  greeting = \`Welcome back, \${user.name}!\`;
} else {
  greeting = 'Please log in to continue';
}

// if-else if-else chain
let userStatus = '';
if (user.role === 'admin') {
  userStatus = 'Administrator';
} else if (user.role === 'teacher') {
  userStatus = 'Instructor';
} else {
  userStatus = 'Student';
}

// In JSX
return (
  <div>
    <p>{greeting}</p>
    <p>Role: {userStatus}</p>
  </div>
);`}
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Example 2: Ternary Operator
  const renderTernaryExample = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-green-400 mb-4">Ternary Operator Examples</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Basic Ternary (Inline)</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center gap-3">
                  <div className={clsx(
                    "w-4 h-4 rounded-full",
                    user.isLoggedIn ? "bg-green-500" : "bg-red-500"
                  )} />
                  <p className="text-lg">
                    Status: {user.isLoggedIn ? 'Logged In' : 'Logged Out'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Simple true/false condition in JSX
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Nested Ternary</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="text-center">
                  <p className="text-xl">
                    {user.subscription === 'enterprise' ? '🏢 Enterprise' :
                     user.subscription === 'pro' ? '⭐ Pro' :
                     user.subscription === 'free' ? '🆓 Free' : 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {user.subscription === 'enterprise' ? 'Unlimited access' :
                     user.subscription === 'pro' ? 'Premium features' :
                     user.subscription === 'free' ? 'Basic features' : ''}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Multiple conditions with nested ternary (use with caution)
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Ternary with JSX Blocks</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                {user.isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Notifications:</span>
                      <span className="text-yellow-400 font-bold">{user.notifications}</span>
                    </div>
                    {user.notifications > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="w-full py-1 bg-yellow-900/30 text-yellow-300 rounded hover:bg-yellow-800/50 text-sm"
                      >
                        Clear Notifications
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    No notifications - please log in
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Using ternary to render different JSX blocks
              </p>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
            <h4 className="font-bold text-green-300 mb-3">Code Example</h4>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Basic ternary
<p>Status: {user.isLoggedIn ? 'Logged In' : 'Logged Out'}</p>

// Nested ternary (use sparingly)
<p>
  {user.subscription === 'enterprise' ? '🏢 Enterprise' :
   user.subscription === 'pro' ? '⭐ Pro' :
   user.subscription === 'free' ? '🆓 Free' : 'Unknown'}
</p>

// Ternary with JSX blocks
{user.isLoggedIn ? (
  <div>
    <p>Welcome {user.name}!</p>
    <button>Logout</button>
  </div>
) : (
  <div>
    <p>Please log in</p>
    <button>Login</button>
  </div>
)}

// Ternary for styling
<div className={user.isLoggedIn ? 'bg-green-100' : 'bg-red-100'}>
  Status Indicator
</div>`}
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Example 3: Logical && Operator
  const renderLogicalExample = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-purple-400 mb-4">Logical && Operator Examples</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Simple && (Conditional Rendering)</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-3">
                  {user.isLoggedIn && (
                    <div className="p-2 bg-green-900/20 rounded border border-green-800/30">
                      <p className="text-green-400">✓ You are logged in as {user.name}</p>
                    </div>
                  )}
                  
                  {user.notifications > 0 && (
                    <div className="p-2 bg-yellow-900/20 rounded border border-yellow-800/30">
                      <p className="text-yellow-400">
                        🔔 You have {user.notifications} unread notification{user.notifications !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                  
                  {user.role === 'admin' && (
                    <div className="p-2 bg-red-900/20 rounded border border-red-800/30">
                      <p className="text-red-400">⚡ Admin privileges enabled</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Using && to conditionally render elements
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">&& with Complex Conditions</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-3">
                  {user.isLoggedIn && user.role === 'teacher' && (
                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                      <h5 className="font-bold text-blue-300 mb-1">Teacher Dashboard</h5>
                      <p className="text-sm text-gray-400">Manage your students and courses</p>
                    </div>
                  )}
                  
                  {user.isLoggedIn && user.subscription === 'pro' && user.notifications > 0 && (
                    <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                      <h5 className="font-bold text-purple-300 mb-1">Pro Notifications</h5>
                      <p className="text-sm text-gray-400">Special alerts for pro members</p>
                    </div>
                  )}
                  
                  {!user.isLoggedIn && (
                    <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                      <p className="text-gray-400 text-center">Please log in to see features</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Multiple conditions combined with &&
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">&& for Loading States</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-3">
                  {loading && (
                    <div className="flex items-center justify-center gap-2 p-4">
                      <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="text-blue-400">Loading user data...</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="p-3 bg-red-900/20 rounded border border-red-800/30">
                      <p className="text-red-400">Error: {error}</p>
                    </div>
                  )}
                  
                  {!loading && !error && user.isLoggedIn && (
                    <div className="p-3 bg-green-900/20 rounded border border-green-800/30">
                      <p className="text-green-400">✓ Data loaded successfully</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Handling loading and error states
              </p>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
            <h4 className="font-bold text-purple-300 mb-3">Code Example</h4>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Simple conditional rendering
{user.isLoggedIn && <p>Welcome back!</p>}

// Multiple conditions
{user.isLoggedIn && user.role === 'admin' && (
  <button>Admin Panel</button>
)}

// Loading state
{loading && (
  <div className="spinner">
    Loading...
  </div>
)}

// Error state
{error && (
  <div className="error">
    {error}
  </div>
)}

// Combined states
{!loading && !error && data.length > 0 && (
  <ul>
    {data.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)}

// Empty state
{!loading && !error && data.length === 0 && (
  <p>No data found</p>
)}`}
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Example 4: Switch Case
  const renderSwitchExample = () => {
    const getRoleDescription = (role) => {
      switch (role) {
        case 'admin':
          return { color: 'red', icon: '⚡', desc: 'Full system access' };
        case 'teacher':
          return { color: 'yellow', icon: '👨‍🏫', desc: 'Can create and grade courses' };
        case 'student':
          return { color: 'green', icon: '🎓', desc: 'Can enroll in courses' };
        default:
          return { color: 'gray', icon: '❓', desc: 'Unknown role' };
      }
    };

    const getSubscriptionBenefits = (subscription) => {
      switch (subscription) {
        case 'enterprise':
          return [
            'Unlimited courses',
            'Priority support',
            'Custom training',
            'Analytics dashboard'
          ];
        case 'pro':
          return [
            'Up to 10 courses',
            'Email support',
            'Project templates',
            'Community access'
          ];
        case 'free':
          return [
            '3 free courses',
            'Basic support',
            'Sample projects'
          ];
        default:
          return ['No benefits'];
      }
    };

    const roleInfo = getRoleDescription(user.role);
    const benefits = getSubscriptionBenefits(user.subscription);

    return (
      <div className="space-y-6">
        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Switch Case Examples</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Switch for User Roles</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className={clsx(
                  "p-4 rounded-lg border-2 text-center",
                  roleInfo.color === 'red' && "border-red-500 bg-red-900/20",
                  roleInfo.color === 'yellow' && "border-yellow-500 bg-yellow-900/20",
                  roleInfo.color === 'green' && "border-green-500 bg-green-900/20",
                  roleInfo.color === 'gray' && "border-gray-500 bg-gray-900/20"
                )}>
                  <div className="text-3xl mb-2">{roleInfo.icon}</div>
                  <p className="text-xl font-bold capitalize">{user.role}</p>
                  <p className="text-sm text-gray-400 mt-1">{roleInfo.desc}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Using switch to return different values based on role
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Switch for Subscription Plans</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-3">
                  <div className={clsx(
                    "p-3 rounded-lg border",
                    user.subscription === 'enterprise' && "border-purple-500 bg-purple-900/20",
                    user.subscription === 'pro' && "border-green-500 bg-green-900/20",
                    user.subscription === 'free' && "border-gray-500 bg-gray-900/20"
                  )}>
                    <h5 className="font-bold text-lg capitalize">{user.subscription} Plan</h5>
                    <ul className="mt-2 space-y-1">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Switch returning arrays for different subscription levels
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Switch in Render Function</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                {(() => {
                  switch (user.role) {
                    case 'admin':
                      return (
                        <div className="p-3 bg-red-900/20 rounded-lg">
                          <h5 className="font-bold text-red-300">Admin Controls</h5>
                          <div className="grid grid-cols-1 gap-2 mt-2">
                            <button className="p-2 bg-red-900/30 text-red-300 rounded text-sm">Manage Users</button>
                            <button className="p-2 bg-red-900/30 text-red-300 rounded text-sm">System Settings</button>
                            <button className="p-2 bg-red-900/30 text-red-300 rounded text-sm">View Reports</button>
                            <button className="p-2 bg-red-900/30 text-red-300 rounded text-sm">Backup Data</button>
                          </div>
                        </div>
                      );
                    case 'teacher':
                      return (
                        <div className="p-3 bg-yellow-900/20 rounded-lg">
                          <h5 className="font-bold text-yellow-300">Teacher Tools</h5>
                          <div className="grid grid-cols-1 gap-2 mt-2">
                            <button className="p-2 bg-yellow-900/30 text-yellow-300 rounded text-sm">Create Course</button>
                            <button className="p-2 bg-yellow-900/30 text-yellow-300 rounded text-sm">Grade Assignments</button>
                            <button className="p-2 bg-yellow-900/30 text-yellow-300 rounded text-sm">Student Roster</button>
                            <button className="p-2 bg-yellow-900/30 text-yellow-300 rounded text-sm">Schedule Class</button>
                          </div>
                        </div>
                      );
                    case 'student':
                      return (
                        <div className="p-3 bg-green-900/20 rounded-lg">
                          <h5 className="font-bold text-green-300">Student Dashboard</h5>
                          <div className="grid grid-cols-1 gap-2 mt-2">
                            <button className="p-2 bg-green-900/30 text-green-300 rounded text-sm">My Courses</button>
                            <button className="p-2 bg-green-900/30 text-green-300 rounded text-sm">Assignments</button>
                            <button className="p-2 bg-green-900/30 text-green-300 rounded text-sm">Grades</button>
                            <button className="p-2 bg-green-900/30 text-green-300 rounded text-sm">Resources</button>
                          </div>
                        </div>
                      );
                    default:
                      return (
                        <div className="p-3 bg-gray-800/30 rounded-lg">
                          <p className="text-gray-400 text-center">Select a role to see controls</p>
                        </div>
                      );
                  }
                })()}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Using switch inside Immediately Invoked Function Expression (IIFE)
              </p>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
            <h4 className="font-bold text-yellow-300 mb-3">Code Example</h4>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Switch in helper function
const getRoleDescription = (role) => {
  switch (role) {
    case 'admin':
      return { color: 'red', icon: '⚡', desc: 'Full access' };
    case 'teacher':
      return { color: 'yellow', icon: '👨‍🏫', desc: 'Can create courses' };
    case 'student':
      return { color: 'green', icon: '🎓', desc: 'Can enroll' };
    default:
      return { color: 'gray', icon: '❓', desc: 'Unknown' };
  }
};

// Using in component
const roleInfo = getRoleDescription(user.role);
return (
  <div className={\`border-\${roleInfo.color}-500\`}>
    <span>{roleInfo.icon}</span>
    <p>{roleInfo.desc}</p>
  </div>
);

// Switch in render with IIFE
{(() => {
  switch (user.role) {
    case 'admin':
      return <AdminPanel />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <GuestView />;
  }
})()}

// Switch returning arrays
const getFeatures = (plan) => {
  switch (plan) {
    case 'premium':
      return ['Feature 1', 'Feature 2', 'Feature 3'];
    case 'basic':
      return ['Feature 1', 'Feature 2'];
    default:
      return ['Feature 1'];
  }
};`}
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Example 5: Complex Conditions
  const renderComplexExample = () => {
    const isEligibleForDiscount = user.isLoggedIn && 
      (user.role === 'teacher' || user.subscription === 'pro') &&
      user.notifications < 5;

    const canAccessFeature = (feature) => {
      switch (feature) {
        case 'advanced-analytics':
          return user.isLoggedIn && user.role === 'admin';
        case 'course-creation':
          return user.isLoggedIn && (user.role === 'teacher' || user.role === 'admin');
        case 'premium-content':
          return user.isLoggedIn && (user.subscription === 'pro' || user.subscription === 'enterprise');
        case 'community-forum':
          return user.isLoggedIn;
        default:
          return false;
      }
    };

    const getAccessRequirements = (feature) => {
      switch (feature) {
        case 'advanced-analytics':
          return 'Requires admin role';
        case 'course-creation':
          return 'Requires teacher or admin role';
        case 'premium-content':
          return 'Requires pro or enterprise subscription';
        case 'community-forum':
          return 'Requires login';
        default:
          return 'Unknown requirements';
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Complex Conditions Examples</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Complex Boolean Logic</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-4">
                  <div className={clsx(
                    "p-3 rounded-lg border",
                    isEligibleForDiscount 
                      ? "border-green-500 bg-green-900/20" 
                      : "border-gray-700 bg-gray-800/30"
                  )}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">Special Discount</p>
                        <p className="text-sm text-gray-400">
                          Available for active teachers and pro members
                        </p>
                      </div>
                      <div className={clsx(
                        "px-3 py-1 rounded-full text-sm",
                        isEligibleForDiscount
                          ? "bg-green-900/30 text-green-400"
                          : "bg-gray-800 text-gray-500"
                      )}>
                        {isEligibleForDiscount ? 'Eligible ✅' : 'Not Eligible ❌'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Conditions for discount:</p>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li className={clsx(user.isLoggedIn ? "text-green-400" : "text-red-400")}>
                        {user.isLoggedIn ? '✓' : '✗'} User is logged in
                      </li>
                      <li className={clsx((user.role === 'teacher' || user.subscription === 'pro') ? "text-green-400" : "text-red-400")}>
                        {(user.role === 'teacher' || user.subscription === 'pro') ? '✓' : '✗'} Teacher or Pro member
                      </li>
                      <li className={clsx(user.notifications < 5 ? "text-green-400" : "text-red-400")}>
                        {user.notifications < 5 ? '✓' : '✗'} Less than 5 notifications
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Combining multiple conditions with AND (&&) and OR (||)
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Feature Access Matrix</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-3">
                  {[
                    { id: 'advanced-analytics', name: 'Advanced Analytics', icon: '📊' },
                    { id: 'course-creation', name: 'Course Creation', icon: '📝' },
                    { id: 'premium-content', name: 'Premium Content', icon: '⭐' },
                    { id: 'community-forum', name: 'Community Forum', icon: '💬' }
                  ].map(feature => {
                    const hasAccess = canAccessFeature(feature.id);
                    return (
                      <div key={feature.id} className={clsx(
                        "p-3 rounded-lg border flex items-center justify-between",
                        hasAccess
                          ? "border-green-500 bg-green-900/20"
                          : "border-gray-700 bg-gray-800/30"
                      )}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{feature.icon}</span>
                          <div>
                            <p className="font-medium">{feature.name}</p>
                            <p className="text-sm text-gray-400">
                              {!hasAccess && getAccessRequirements(feature.id)}
                            </p>
                          </div>
                        </div>
                        <div className={clsx(
                          "px-3 py-1 rounded text-sm",
                          hasAccess
                            ? "bg-green-900/30 text-green-400"
                            : "bg-gray-800 text-gray-500"
                        )}>
                          {hasAccess ? 'Access Granted' : 'Access Denied'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Dynamic access control based on multiple user properties
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Conditional Styling</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {students.map(student => (
                      <div
                        key={student.id}
                        className={clsx(
                          "p-3 rounded-lg border-2 transition-all",
                          student.grade === 'A+' && "border-cyan-500 bg-cyan-900/20",
                          student.grade === 'A' && "border-blue-500 bg-blue-900/20",
                          student.grade === 'B+' && "border-green-500 bg-green-900/20",
                          student.grade === 'B' && "border-yellow-500 bg-yellow-900/20",
                          !student.active && "opacity-50 border-gray-600"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold">{student.name}</p>
                            <p className="text-sm text-gray-400">{student.city}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={clsx(
                              "text-lg font-bold",
                              student.grade === 'A+' && "text-cyan-400",
                              student.grade === 'A' && "text-blue-400",
                              student.grade === 'B+' && "text-green-400",
                              student.grade === 'B' && "text-yellow-400"
                            )}>
                              {student.grade}
                            </span>
                            <span className={clsx(
                              "text-xs",
                              student.active ? "text-green-400" : "text-red-400"
                            )}>
                              {student.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-1">
                          {student.grade.startsWith('A') && (
                            <span className="px-2 py-1 bg-cyan-900/30 text-cyan-300 rounded text-xs">
                              Top Performer
                            </span>
                          )}
                          {!student.active && (
                            <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                              Inactive
                            </span>
                          )}
                          {student.city === 'Barrackpore' && student.active && (
                            <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">
                              Local
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Dynamic styling based on multiple conditions (grade, activity status, location)
              </p>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
            <h4 className="font-bold text-cyan-300 mb-3">Code Example</h4>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Complex boolean logic
const isEligibleForDiscount = user.isLoggedIn && 
  (user.role === 'teacher' || user.subscription === 'pro') &&
  user.notifications < 5;

// Conditional access function
const canAccessFeature = (feature) => {
  switch (feature) {
    case 'advanced-analytics':
      return user.isLoggedIn && user.role === 'admin';
    case 'course-creation':
      return user.isLoggedIn && (user.role === 'teacher' || user.role === 'admin');
    case 'premium-content':
      return user.isLoggedIn && (user.subscription === 'pro' || user.subscription === 'enterprise');
    case 'community-forum':
      return user.isLoggedIn;
    default:
      return false;
  }
};

// Complex conditional styling
<div className={clsx(
  "p-3 rounded-lg border-2",
  student.grade === 'A+' && "border-cyan-500 bg-cyan-900/20",
  student.grade === 'A' && "border-blue-500 bg-blue-900/20",
  !student.active && "opacity-50 border-gray-600"
)}>
  {/* content */}
</div>

// Multiple conditional badges
<div className="flex gap-1">
  {student.grade.startsWith('A') && (
    <span className="top-performer-badge">Top Performer</span>
  )}
  {!student.active && (
    <span className="inactive-badge">Inactive</span>
  )}
</div>`}
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Example 6: Patterns
  const renderPatternsExample = () => {
    // Pattern 1: Early return
    const renderUserProfile = () => {
      if (!user.isLoggedIn) {
        return (
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-center">Please log in to view profile</p>
          </div>
        );
      }

      return (
        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center">
              <span className="text-xl">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h4 className="font-bold">{user.name}</h4>
              <p className="text-sm text-gray-400">Role: {user.role}</p>
            </div>
          </div>
        </div>
      );
    };

    // Pattern 2: Render function
    const renderSubscriptionBadge = () => {
      const config = {
        free: { color: 'gray', icon: '🆓', label: 'Free' },
        pro: { color: 'green', icon: '⭐', label: 'Pro' },
        enterprise: { color: 'purple', icon: '🏢', label: 'Enterprise' }
      };

      const { color, icon, label } = config[user.subscription] || config.free;

      // Use clsx for conditional classes
      const badgeClasses = clsx(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full",
        color === 'gray' && "bg-gray-900/30 text-gray-300",
        color === 'green' && "bg-green-900/30 text-green-300",
        color === 'purple' && "bg-purple-900/30 text-purple-300"
      );

      return (
        <div className={badgeClasses}>
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      );
    };

    // Pattern 3: Conditional components
    const AdminControls = () => user.role === 'admin' ? (
      <div className="p-3 bg-red-900/20 rounded-lg">
        <p className="text-red-300 font-bold">Admin Panel</p>
        <button className="mt-2 px-3 py-1 bg-red-800/30 text-red-300 rounded text-sm">
          Manage System
        </button>
      </div>
    ) : null;

    const TeacherTools = () => user.role === 'teacher' ? (
      <div className="p-3 bg-yellow-900/20 rounded-lg">
        <p className="text-yellow-300 font-bold">Teacher Tools</p>
        <button className="mt-2 px-3 py-1 bg-yellow-800/30 text-yellow-300 rounded text-sm">
          Create Assignment
        </button>
      </div>
    ) : null;

    const StudentFeatures = () => user.role === 'student' ? (
      <div className="p-3 bg-green-900/20 rounded-lg">
        <p className="text-green-300 font-bold">Student Features</p>
        <button className="mt-2 px-3 py-1 bg-green-800/30 text-green-300 rounded text-sm">
          View Courses
        </button>
      </div>
    ) : null;

    return (
      <div className="space-y-6">
        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-pink-400 mb-4">Conditional Rendering Patterns</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Pattern 1: Early Return</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                {renderUserProfile()}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Return early for invalid states or guard clauses
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Pattern 2: Configuration Objects</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    {renderSubscriptionBadge()}
                    <p className="text-lg">Subscription Plan</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {Object.entries({
                      free: { color: 'gray', icon: '🆓', label: 'Free' },
                      pro: { color: 'green', icon: '⭐', label: 'Pro' },
                      enterprise: { color: 'purple', icon: '🏢', label: 'Enterprise' }
                    }).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => handleSubscriptionChange(key)}
                        className={clsx(
                          "p-3 rounded-lg border transition-all",
                          user.subscription === key 
                            ? clsx(
                                config.color === 'gray' && "border-gray-500 bg-gray-900/20",
                                config.color === 'green' && "border-green-500 bg-green-900/20",
                                config.color === 'purple' && "border-purple-500 bg-purple-900/20"
                              )
                            : "border-gray-700 hover:border-gray-600"
                        )}
                      >
                        <div className="text-2xl mb-1">{config.icon}</div>
                        <p className="text-sm">{config.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Using configuration objects to avoid complex conditionals
              </p>
            </div>

            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="font-bold text-gray-300 mb-2">Pattern 3: Conditional Components</h4>
              <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <AdminControls />
                    <TeacherTools />
                    <StudentFeatures />
                  </div>
                  {!user.isLoggedIn && (
                    <div className="p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-gray-400 text-center">
                        Log in to see role-specific features
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Creating small, focused conditional components
              </p>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
            <h4 className="font-bold text-pink-300 mb-3">Code Example</h4>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Pattern 1: Early Return
const renderUserProfile = () => {
  if (!user.isLoggedIn) {
    return <p>Please log in</p>;
  }
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

// Pattern 2: Configuration Objects
const buttonConfigs = {
  primary: { className: 'bg-blue-500', text: 'Primary' },
  secondary: { className: 'bg-gray-500', text: 'Secondary' },
  danger: { className: 'bg-red-500', text: 'Danger' }
};

const Button = ({ type = 'primary' }) => {
  const config = buttonConfigs[type];
  return (
    <button className={\`px-4 py-2 text-white \${config.className}\`}>
      {config.text}
    </button>
  );
};

// Pattern 3: Conditional Components
const AdminPanel = () => {
  if (user.role !== 'admin') return null;
  return <div>Admin content</div>;
};

const UserDashboard = () => {
  return (
    <div>
      <AdminPanel />
      <UserProfile />
    </div>
  );
};

// Pattern 4: Render Props
const ConditionalRender = ({ condition, children }) => {
  return condition ? children : null;
};

// Usage:
<ConditionalRender condition={user.isLoggedIn}>
  <UserMenu />
</ConditionalRender>`}
            </pre>
          </div>
        )}
      </div>
    );
  };

  const activeColorClasses = getActiveColorClasses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Conditional Rendering in React
            </h1>
            <p className="text-gray-400 mt-2">
              Master different techniques for conditional rendering in React components
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCode(!showCode)}
              className={clsx(
                "px-4 py-2 rounded-lg border transition-colors",
                showCode
                  ? "bg-blue-900/30 border-blue-500 text-blue-300"
                  : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600"
              )}
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600"
            >
              {user.darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-900/40 rounded-xl border border-gray-700 p-4 sticky top-6">
              <div className="mb-6">
                <div className="p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={clsx(
                        "w-2 h-2 rounded-full",
                        user.isLoggedIn ? "bg-green-500" : "bg-red-500"
                      )} />
                      <span className="text-sm">
                        {user.isLoggedIn ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {user.darkMode ? 'Dark' : 'Light'} Mode
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {user.isLoggedIn ? (
                      <div className="space-y-2">
                        <p className="font-bold text-center">{user.name}</p>
                        <div className="flex justify-center gap-2">
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">
                            {user.role}
                          </span>
                          <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">
                            {user.subscription}
                          </span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full py-2 bg-red-900/30 text-red-300 rounded-lg hover:bg-red-800/50 border border-red-800/30"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleLogin}
                        disabled={loading}
                        className={clsx(
                          "w-full py-3 rounded-lg border transition-colors",
                          loading
                            ? "bg-gray-800 border-gray-700 text-gray-400"
                            : "bg-green-900/30 border-green-800/30 text-green-300 hover:bg-green-800/50"
                        )}
                      >
                        {loading ? 'Logging in...' : 'Login to Demo'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-300 mb-2">Change Role</h3>
                <div className="grid grid-cols-1 gap-2">
                  {['student', 'teacher', 'admin'].map(role => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={clsx(
                        "py-2 rounded-lg border text-sm capitalize transition-colors",
                        user.role === role
                          ? "bg-blue-900/30 border-blue-500 text-blue-300"
                          : "bg-gray-800/30 border-gray-700 text-gray-300 hover:border-gray-600"
                      )}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-300 mb-2">Examples</h3>
                <div className="space-y-1">
                  {examples.map(example => {
                    const color = colorMap[example.color];
                    return (
                      <button
                        key={example.id}
                        onClick={() => setActiveExample(example.id)}
                        className={clsx(
                          "w-full flex items-center gap-3 p-3 rounded-lg border transition-colors",
                          activeExample === example.id
                            ? clsx(
                                color.border,
                                color.bg.replace('/10', '/30'),
                                color.text
                              )
                            : "bg-gray-800/30 border-gray-700 text-gray-300 hover:border-gray-600"
                        )}
                      >
                        <span className="text-lg">{example.icon}</span>
                        <span>{example.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                <h3 className="font-bold text-gray-300 mb-2">Current Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Notifications:</span>
                    <span className={clsx(
                      "font-bold",
                      user.notifications > 0 ? "text-yellow-400" : "text-gray-400"
                    )}>
                      {user.notifications}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subscription:</span>
                    <span className="capitalize">{user.subscription}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dark Mode:</span>
                    <span>{user.darkMode ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className={clsx(
              "mb-6 p-5 rounded-xl border",
              activeColorClasses.border,
              activeColorClasses.bg
            )}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {examples.find(ex => ex.id === activeExample)?.icon}
                    </span>
                    <h2 className="text-2xl font-bold">
                      {examples.find(ex => ex.id === activeExample)?.label}
                    </h2>
                  </div>
                  <p className="text-gray-400">
                    {activeExample === 'if' && 'Using if statements and if-else chains'}
                    {activeExample === 'ternary' && 'Inline conditional rendering with ternary operator'}
                    {activeExample === 'logical' && 'Conditional rendering with logical && operator'}
                    {activeExample === 'switch' && 'Multiple conditions with switch statements'}
                    {activeExample === 'complex' && 'Complex conditions and dynamic styling'}
                    {activeExample === 'patterns' && 'Best practices and patterns'}
                  </p>
                </div>
                <div className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-bold",
                  activeColorClasses.bg.replace('/10', '/30'),
                  activeColorClasses.text
                )}>
                  {activeExample === 'if' && 'Basic'}
                  {activeExample === 'ternary' && 'Intermediate'}
                  {activeExample === 'logical' && 'Intermediate'}
                  {activeExample === 'switch' && 'Advanced'}
                  {activeExample === 'complex' && 'Expert'}
                  {activeExample === 'patterns' && 'Patterns'}
                </div>
              </div>
            </div>

            {renderExample()}

            <div className="mt-8 p-5 bg-gray-900/40 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-gray-300 mb-3">Best Practices</h3>
              <div className="grid md:grid-cols-1 gap-4">
                <div className="p-3 bg-gray-800/40 rounded-lg">
                  <h4 className="font-bold text-green-400 mb-1">Do's</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>✓ Use early returns for guard clauses</li>
                    <li>✓ Keep conditions simple and readable</li>
                    <li>✓ Extract complex logic into helper functions</li>
                    <li>✓ Use configuration objects for multiple conditions</li>
                    <li>✓ Consider using enums for finite states</li>
                  </ul>
                </div>
                <div className="p-3 bg-gray-800/40 rounded-lg">
                  <h4 className="font-bold text-red-400 mb-1">Don'ts</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>✗ Avoid deeply nested ternary operators</li>
                    <li>✗ Don't put complex logic in JSX</li>
                    <li>✗ Avoid using && with 0 or falsy values</li>
                    <li>✗ Don't duplicate condition logic</li>
                    <li>✗ Avoid large switch statements in render</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                This interactive demo covers all major conditional rendering patterns in React.
                Experiment with different user states to see how each technique works!
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span>Created with ❤️ for React developers</span>
                <span>•</span>
                <span>Students: {students.map(s => s.name).join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic23;