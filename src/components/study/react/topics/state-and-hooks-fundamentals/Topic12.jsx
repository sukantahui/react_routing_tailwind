import { useState } from 'react';
import clsx from 'clsx';

const Topic12 = () => {
  // Example 1: Basic student object
  const [student, setStudent] = useState({
    name: 'Swadeep',
    age: 20,
    location: 'Barrackpore',
    grades: {
      math: 88,
      science: 92,
      english: 85
    },
    active: true
  });

  // Example 2: Form with multiple fields
  const [formData, setFormData] = useState({
    firstName: 'Tuhina',
    lastName: 'Roy',
    email: 'tuhina@example.com',
    phone: '9876543210',
    address: {
      street: '123 Main St',
      city: 'Shyamnagar',
      zipCode: '700135'
    },
    preferences: {
      newsletter: true,
      notifications: false,
      theme: 'light'
    }
  });

  // Example 3: Nested shopping cart
  const [shoppingCart, setShoppingCart] = useState({
    id: 'CART001',
    customer: 'Abhronila Das',
    items: [
      { id: 1, name: 'React Book', price: 29.99, quantity: 2 },
      { id: 2, name: 'JavaScript Guide', price: 19.99, quantity: 1 }
    ],
    discount: 0.1, // 10%
    taxRate: 0.08, // 8%
    get subtotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    get total() {
      const discountAmount = this.subtotal * this.discount;
      const taxedAmount = (this.subtotal - discountAmount) * this.taxRate;
      return this.subtotal - discountAmount + taxedAmount;
    }
  });

  // Example 4: Configuration object
  const [config, setConfig] = useState({
    theme: 'dark',
    language: 'en',
    fontSize: 16,
    autoSave: true,
    editor: {
      lineNumbers: true,
      wordWrap: false,
      tabSize: 2
    },
    notifications: {
      email: true,
      push: false,
      sound: true
    }
  });

  // History of updates
  const [updateHistory, setUpdateHistory] = useState([]);

  const addHistoryEntry = (description, oldValue, newValue, type = 'info') => {
    setUpdateHistory(prev => [
      {
        id: Date.now(),
        description,
        oldValue: JSON.stringify(oldValue),
        newValue: JSON.stringify(newValue),
        type,
        timestamp: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 9) // Keep last 10 entries
    ]);
  };

  // ===== DEMONSTRATION 1: Basic Object Updates =====
  const updateStudentName = () => {
    const oldName = student.name;
    setStudent(prev => ({
      ...prev,
      name: prev.name === 'Swadeep' ? 'Swadeep Roy' : 'Swadeep'
    }));
    addHistoryEntry(
      'Updated student name',
      { name: oldName },
      { name: student.name === 'Swadeep' ? 'Swadeep Roy' : 'Swadeep' },
      'basic'
    );
  };

  const updateStudentAge = () => {
    const oldAge = student.age;
    setStudent(prev => ({
      ...prev,
      age: prev.age + 1
    }));
    addHistoryEntry(
      'Incremented student age',
      { age: oldAge },
      { age: oldAge + 1 },
      'basic'
    );
  };

  const toggleStudentActive = () => {
    const oldStatus = student.active;
    setStudent(prev => ({
      ...prev,
      active: !prev.active
    }));
    addHistoryEntry(
      'Toggled student active status',
      { active: oldStatus },
      { active: !oldStatus },
      'toggle'
    );
  };

  // ===== DEMONSTRATION 2: Nested Object Updates =====
  const updateMathGrade = () => {
    const oldGrade = student.grades.math;
    setStudent(prev => ({
      ...prev,
      grades: {
        ...prev.grades,
        math: prev.grades.math + 5
      }
    }));
    addHistoryEntry(
      'Updated math grade',
      { 'grades.math': oldGrade },
      { 'grades.math': oldGrade + 5 },
      'nested'
    );
  };

  const updateAllGrades = () => {
    const oldGrades = { ...student.grades };
    setStudent(prev => ({
      ...prev,
      grades: {
        math: prev.grades.math + 2,
        science: prev.grades.science + 3,
        english: prev.grades.english + 1
      }
    }));
    addHistoryEntry(
      'Updated all grades',
      oldGrades,
      {
        math: oldGrades.math + 2,
        science: oldGrades.science + 3,
        english: oldGrades.english + 1
      },
      'nested'
    );
  };

  // ===== DEMONSTRATION 3: Form Field Updates =====
  const updateFormField = (field, value) => {
    const oldValue = formData[field];
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    addHistoryEntry(
      `Updated form field: ${field}`,
      { [field]: oldValue },
      { [field]: value },
      'form'
    );
  };

  const updateNestedFormField = (parent, field, value) => {
    const oldValue = formData[parent][field];
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    addHistoryEntry(
      `Updated nested field: ${parent}.${field}`,
      { [field]: oldValue },
      { [field]: value },
      'nested-form'
    );
  };

  // ===== DEMONSTRATION 4: Shopping Cart Updates =====
  const updateCartItemQuantity = (itemId, change) => {
    setShoppingCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    }));
    addHistoryEntry(
      `Updated item ${itemId} quantity by ${change}`,
      { itemId, change },
      { itemId, change },
      'cart'
    );
  };

  const addCartItem = () => {
    const newId = shoppingCart.items.length + 1;
    const newItem = {
      id: newId,
      name: `New Item ${newId}`,
      price: 9.99,
      quantity: 1
    };
    
    setShoppingCart(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
    addHistoryEntry(
      `Added new item to cart`,
      { items: shoppingCart.items },
      { items: [...shoppingCart.items, newItem] },
      'cart'
    );
  };

  const updateDiscount = () => {
    const oldDiscount = shoppingCart.discount;
    const newDiscount = oldDiscount === 0.1 ? 0.15 : 0.1;
    
    setShoppingCart(prev => ({
      ...prev,
      discount: newDiscount
    }));
    addHistoryEntry(
      'Updated cart discount',
      { discount: oldDiscount },
      { discount: newDiscount },
      'cart'
    );
  };

  // ===== DEMONSTRATION 5: Configuration Updates =====
  const toggleTheme = () => {
    const oldTheme = config.theme;
    const newTheme = oldTheme === 'dark' ? 'light' : 'dark';
    
    setConfig(prev => ({
      ...prev,
      theme: newTheme
    }));
    addHistoryEntry(
      'Toggled theme',
      { theme: oldTheme },
      { theme: newTheme },
      'config'
    );
  };

  const updateFontSize = (change) => {
    const oldSize = config.fontSize;
    const newSize = Math.max(12, Math.min(24, oldSize + change));
    
    setConfig(prev => ({
      ...prev,
      fontSize: newSize
    }));
    addHistoryEntry(
      `Changed font size by ${change}`,
      { fontSize: oldSize },
      { fontSize: newSize },
      'config'
    );
  };

  const toggleEditorSetting = (setting) => {
    const oldValue = config.editor[setting];
    
    setConfig(prev => ({
      ...prev,
      editor: {
        ...prev.editor,
        [setting]: !oldValue
      }
    }));
    addHistoryEntry(
      `Toggled editor.${setting}`,
      { [setting]: oldValue },
      { [setting]: !oldValue },
      'nested-config'
    );
  };

  // ===== DEMONSTRATION 6: Common Mistakes =====
  const demonstrateWrongUpdate = () => {
    addHistoryEntry('Attempting WRONG update (direct mutation)', {}, {}, 'error');
    
    try {
      // WRONG: Direct mutation
      student.age = 25;
      addHistoryEntry('Direct mutation: student.age = 25', { age: 20 }, { age: 25 }, 'error');
    } catch (e) {
      addHistoryEntry(`Error: ${e.message}`, {}, {}, 'error');
    }
  };

  const demonstrateWrongNestedUpdate = () => {
    addHistoryEntry('Attempting WRONG nested update', {}, {}, 'error');
    
    try {
      // WRONG: Shallow copy only
      setStudent({
        ...student,
        grades: { math: 95 } // Loses science and english!
      });
      addHistoryEntry('Shallow copy loses nested data', student.grades, { math: 95 }, 'error');
    } catch (e) {
      addHistoryEntry(`Error: ${e.message}`, {}, {}, 'error');
    }
  };

  // ===== DEMONSTRATION 7: Complex Update (Multiple Nested Levels) =====
  const complexUpdate = () => {
    const oldStudent = { ...student };
    
    setStudent(prev => ({
      ...prev,
      age: prev.age + 1,
      location: prev.location === 'Barrackpore' ? 'Kolkata' : 'Barrackpore',
      grades: {
        ...prev.grades,
        math: prev.grades.math + 3,
        science: prev.grades.science + 2
      },
      enrolled: prev.enrolled || new Date().toISOString().split('T')[0]
    }));
    
    addHistoryEntry(
      'Complex multi-level update',
      oldStudent,
      {
        ...oldStudent,
        age: oldStudent.age + 1,
        location: oldStudent.location === 'Barrackpore' ? 'Kolkata' : 'Barrackpore',
        grades: {
          ...oldStudent.grades,
          math: oldStudent.grades.math + 3,
          science: oldStudent.grades.science + 2
        },
        enrolled: oldStudent.enrolled || new Date().toISOString().split('T')[0]
      },
      'complex'
    );
  };

  // ===== DEMONSTRATION 8: Reset Operations =====
  const resetStudent = () => {
    const oldStudent = { ...student };
    setStudent({
      name: 'Swadeep',
      age: 20,
      location: 'Barrackpore',
      grades: {
        math: 88,
        science: 92,
        english: 85
      },
      active: true
    });
    addHistoryEntry('Reset student to initial values', oldStudent, student, 'reset');
  };

  const resetAll = () => {
    setUpdateHistory([]);
    resetStudent();
    setFormData({
      firstName: 'Tuhina',
      lastName: 'Roy',
      email: 'tuhina@example.com',
      phone: '9876543210',
      address: {
        street: '123 Main St',
        city: 'Shyamnagar',
        zipCode: '700135'
      },
      preferences: {
        newsletter: true,
        notifications: false,
        theme: 'light'
      }
    });
    setShoppingCart({
      id: 'CART001',
      customer: 'Abhronila Das',
      items: [
        { id: 1, name: 'React Book', price: 29.99, quantity: 2 },
        { id: 2, name: 'JavaScript Guide', price: 19.99, quantity: 1 }
      ],
      discount: 0.1,
      taxRate: 0.08,
      get subtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      get total() {
        const discountAmount = this.subtotal * this.discount;
        const taxedAmount = (this.subtotal - discountAmount) * this.taxRate;
        return this.subtotal - discountAmount + taxedAmount;
      }
    });
    setConfig({
      theme: 'dark',
      language: 'en',
      fontSize: 16,
      autoSave: true,
      editor: {
        lineNumbers: true,
        wordWrap: false,
        tabSize: 2
      },
      notifications: {
        email: true,
        push: false,
        sound: true
      }
    });
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
        
        @keyframes pulseSpread {
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
          Updating Object State Using Spread Operator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Master the art of immutably updating nested objects in React state
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
            The Spread Operator Pattern
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">What is the Spread Operator?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The spread operator (<code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">...</code>) 
                creates a shallow copy of an object or array. When updating state in React, we use it to create 
                new objects while preserving unchanged properties.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Basic Pattern</h3>
                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                  {`// Update single property\nsetState(prev => ({\n`}
                  {`  ...prev,           // Copy all properties\n`}
                  {`  name: 'New Name'   // Override one property\n`}
                  {`}));`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Copy existing properties, then override what changes
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Nested Pattern</h3>
                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                  {`// Update nested property\nsetState(prev => ({\n`}
                  {`  ...prev,\n`}
                  {`  address: {\n`}
                  {`    ...prev.address,  // Copy nested object\n`}
                  {`    city: 'New City'  // Update nested property\n`}
                  {`  }\n`}
                  {`}));`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Spread at each level to preserve other nested properties
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Golden Rule</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Never mutate state directly.</strong> Always create new objects using spread operator 
                at each level of nesting that needs updating.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Guide */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]
                     motion-safe:animate-[pulseSpread_3s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🔍</span>
            Spread Operator Visual Guide
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-bold text-gray-800 dark:text-white">Shallow Copy</h3>
              </div>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`const original = { a: 1, b: 2 };\nconst copy = { ...original };\n// copy = { a: 1, b: 2 }`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Creates new object with same top-level properties
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-bold text-gray-800 dark:text-white">Update Property</h3>
              </div>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`const updated = {\n  ...original,\n  b: 3  // Override b\n};\n// updated = { a: 1, b: 3 }`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Copy all, then override specific properties
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">🧩</div>
                <h3 className="font-bold text-gray-800 dark:text-white">Nested Update</h3>
              </div>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`const obj = { a: 1, nested: { b: 2 } };\nconst updated = {\n  ...obj,\n  nested: {\n    ...obj.nested,\n    b: 3\n  }\n};`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Spread at each level to preserve other properties
              </p>
            </div>
          </div>
        </div>

        {/* Student Object Demo */}
        <div 
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 dark:border-green-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">👨‍🎓</span>
            Example 1: Student Object
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Student Data</h3>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-bold text-gray-800 dark:text-white">{student.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Age:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{student.age}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{student.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`font-bold ${student.active ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {student.active ? 'Active ✓' : 'Inactive ✗'}
                    </span>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-2">Grades:</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                        <div className="text-xs text-gray-500">Math</div>
                        <div className="text-xl font-bold">{student.grades.math}</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded">
                        <div className="text-xs text-gray-500">Science</div>
                        <div className="text-xl font-bold">{student.grades.science}</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded">
                        <div className="text-xs text-gray-500">English</div>
                        <div className="text-xl font-bold">{student.grades.english}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Update Operations</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={updateStudentName}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Update Name
                  </button>
                  
                  <button
                    onClick={updateStudentAge}
                    className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Increment Age
                  </button>
                </div>
                
                <button
                  onClick={toggleStudentActive}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Toggle Active Status
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={updateMathGrade}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Update Math Grade
                  </button>
                  
                  <button
                    onClick={updateAllGrades}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Update All Grades
                  </button>
                </div>
                
                <button
                  onClick={complexUpdate}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 
                           hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Complex Multi-level Update
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Code Examples</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Basic Update:</div>
                    <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                      {`setStudent(prev => ({\n  ...prev,\n  age: prev.age + 1\n}));`}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Nested Update:</div>
                    <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                      {`setStudent(prev => ({\n  ...prev,\n  grades: {\n    ...prev.grades,\n    math: prev.grades.math + 5\n  }\n}));`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Data Demo */}
        <div 
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📝</span>
            Example 2: Form Data Object
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Form Data</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormField('firstName', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormField('lastName', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormField('email', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => updateNestedFormField('address', 'city', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => updateNestedFormField('address', 'zipCode', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Preferences:</div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferences.newsletter}
                        onChange={(e) => updateNestedFormField('preferences', 'newsletter', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Newsletter</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications}
                        onChange={(e) => updateNestedFormField('preferences', 'notifications', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Form Data Structure</h3>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Current formData object:</div>
                <pre className="text-xs text-green-300 overflow-auto max-h-64">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Nested Update Pattern</h4>
                <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                  {`// Update nested address field\nsetFormData(prev => ({\n`}
                  {`  ...prev,\n`}
                  {`  address: {\n`}
                  {`    ...prev.address,      // Copy existing address\n`}
                  {`    city: 'New City'      // Update only city\n`}
                  {`  }\n`}
                  {`}));`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  This preserves street and zipCode while updating city
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Cart Demo */}
        <div 
          className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100 dark:border-orange-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🛒</span>
            Example 3: Shopping Cart Object
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Cart Details</h3>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Customer:</div>
                  <div className="font-bold text-lg">{shoppingCart.customer}</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Items:</div>
                  {shoppingCart.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price} × {item.quantity}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/30 
                                   text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 
                                   dark:hover:bg-red-900/50 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/30 
                                   text-green-600 dark:text-green-300 rounded-full hover:bg-green-200 
                                   dark:hover:bg-green-900/50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold">${shoppingCart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount ({shoppingCart.discount * 100}%):</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      -${(shoppingCart.subtotal * shoppingCart.discount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({shoppingCart.taxRate * 100}%):</span>
                    <span className="font-bold">${((shoppingCart.subtotal - (shoppingCart.subtotal * shoppingCart.discount)) * shoppingCart.taxRate).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total:</span>
                    <span className="text-blue-600 dark:text-blue-400">${shoppingCart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Cart Operations</h3>
              
              <div className="space-y-4">
                <button
                  onClick={addCartItem}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Add New Item to Cart
                </button>
                
                <button
                  onClick={updateDiscount}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  {shoppingCart.discount === 0.1 ? 'Increase Discount to 15%' : 'Decrease Discount to 10%'}
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Array in Object Update</h4>
                <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                  {`// Update item in array\nsetShoppingCart(prev => ({\n`}
                  {`  ...prev,\n`}
                  {`  items: prev.items.map(item =>\n`}
                  {`    item.id === itemId\n`}
                  {`      ? { ...item, quantity: item.quantity + change }\n`}
                  {`      : item\n`}
                  {`  )\n`}
                  {`}));`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Map over array, update matching item, keep others unchanged
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div 
          className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-red-100 dark:border-red-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⚠️</span>
            Common Mistakes & Anti-Patterns
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Direct Mutation</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`// WRONG: Direct mutation\nstudent.age = 25;\n// React won't detect change!`}
                </div>
                <button
                  onClick={demonstrateWrongUpdate}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Try Wrong Update
                </button>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Partial Nested Copy</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`// WRONG: Loses nested data\nsetStudent({\n`}
                  {`  ...student,\n`}
                  {`  grades: { math: 95 }  // Loses science, english!\n`}
                  {`});`}
                </div>
                <button
                  onClick={demonstrateWrongNestedUpdate}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Try Wrong Nested Update
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Performance Considerations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Deeply nested objects with many spreads can impact performance:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Spread creates new objects at each level</li>
                  <li>• For very deep nesting, consider libraries like Immer</li>
                  <li>• Normalize data when possible</li>
                  <li>• Use selective updates (don't spread unnecessarily)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Alternative: Immer</h3>
                <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                  {`import { produce } from 'immer';\n\n`}
                  {`setStudent(produce(draft => {\n`}
                  {`  draft.age = 25;\n`}
                  {`  draft.grades.math = 95;\n`}
                  {`}));`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Immer allows mutable-style updates that are actually immutable
                </p>
              </div>
            </div>
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
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Spread at Each Level</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Always spread nested objects
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">2.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use Functional Updates</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                For sequential or async updates
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">3.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Keep Objects Flat</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Normalize deeply nested data
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">4.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use Immer for Complex</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                For very deep nesting
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Spread Operator Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using spread operator (<code>...</code>) to create new objects
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Spreading at each level of nesting that needs updating
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Never mutating state directly
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using functional updates when appropriate
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Considering Immer for complex nested updates
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Testing updates with nested objects
              </li>
            </ul>
          </div>
        </div>

        {/* Update History */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.8s both' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                             rounded-lg p-2 mr-3 text-xl">📋</span>
              Update History
            </h2>
            <button
              onClick={() => setUpdateHistory([])}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                       text-gray-800 dark:text-white rounded-lg transition-all duration-300"
            >
              Clear History
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto p-2">
            {updateHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-4">📝</div>
                <p>Perform updates to see the spread operator in action</p>
                <p className="text-sm mt-2">Each update shows before/after state</p>
              </div>
            ) : (
              updateHistory.map(entry => (
                <div
                  key={entry.id}
                  className={clsx(
                    "history-entry p-4 rounded-lg border transition-all duration-300",
                    entry.type === 'basic' && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                    entry.type === 'nested' && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                    entry.type === 'form' && "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                    entry.type === 'nested-form' && "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                    entry.type === 'cart' && "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                    entry.type === 'config' && "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
                    entry.type === 'nested-config' && "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
                    entry.type === 'toggle' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                    entry.type === 'complex' && "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-purple-800",
                    entry.type === 'reset' && "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700",
                    entry.type === 'error' && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{entry.description}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-gray-500">Before:</div>
                            <div className="font-mono text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded truncate">
                              {entry.oldValue}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">After:</div>
                            <div className="font-mono text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded truncate">
                              {entry.newValue}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</div>
                      <span className={clsx(
                        "text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block",
                        entry.type === 'basic' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                        entry.type === 'nested' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                        entry.type === 'form' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                        entry.type === 'nested-form' && "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
                        entry.type === 'cart' && "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
                        entry.type === 'config' && "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
                        entry.type === 'nested-config' && "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
                        entry.type === 'toggle' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                        entry.type === 'complex' && "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-purple-300",
                        entry.type === 'reset' && "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300",
                        entry.type === 'error' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      )}>
                        {entry.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.9s_both]
                     motion-safe:animate-[pulseSpread_3s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.9s both' }}
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
                  <strong>Think of the spread operator as making photocopies:</strong> When Swadeep from Barrackpore 
                  needs to update his student record, he doesn't scribble on the original. He makes a photocopy, 
                  writes the updates on the copy, and submits that. The spread operator works the same way.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Spread deeply:</strong> Remember to spread at each nested level
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Use ESLint:</strong> Enable rules that catch direct mutations
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Consider Immer:</strong> For very complex objects, Immer can simplify your code
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Practice patterns:</strong> The spread pattern becomes intuitive with practice
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "When Tuhina from Shyamnagar updates a student's grades, she doesn't throw away the entire 
                  report card. She updates only the changed grades while keeping the rest. The spread operator 
                  ensures your state updates are precise and efficient."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_1s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 1s both' }}
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
                Why is it important to spread at each level of nesting? What happens if you forget to 
                spread a nested object?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Try the "Wrong Nested Update" button. What data is lost? How does this demonstrate the 
                importance of proper spreading?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try implementing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Create a user profile object with 3 levels of nesting. Write update functions that 
                modify properties at each level using the spread operator pattern.
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
          Next: Learn about Updating Array State Using map, filter, and concat
        </p>
      </div>
    </div>
  );
};

export default Topic12;