import React from 'react';
import clsx from 'clsx';
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950/20 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      {/* Inline styles for keyframes - scoped to this component */}
      <style>
        {`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes codeFlow {
            0% {
              transform: translateX(-10px);
              opacity: 0.8;
            }
            50% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(-10px);
              opacity: 0.8;
            }
          }
          
          @keyframes syntaxHighlight {
            0%, 100% {
              background-color: rgba(99, 102, 241, 0.1);
            }
            50% {
              background-color: rgba(99, 102, 241, 0.3);
            }
          }
          
          @keyframes compileCheck {
            0% {
              transform: scale(0.9);
              opacity: 0;
            }
            70% {
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes errorPulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            }
          }
        `}
      </style>

      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 dark:from-indigo-800 dark:via-blue-800 dark:to-violet-800 text-white pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
            <div className="inline-flex items-center px-4 py-2 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Java Generics Series • Topic 5
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Defining & Using Generic Classes
            </h1>
            
            <p className="text-xl text-indigo-100 dark:text-indigo-200 max-w-3xl leading-relaxed">
              From Theory to Practice - Step-by-step creation and usage of type-safe containers
            </p>
          </div>
          
          {/* Animated Development Flow */}
          <div className="mt-10 motion-safe:animate-[fadeSlideUp_1s_ease-out_0.3s_both]">
            <div className="max-w-5xl mx-auto">
              <svg 
                viewBox="0 0 900 220" 
                className="w-full h-auto"
                aria-label="Development flow from generic class definition to usage"
              >
                {/* Development Flow */}
                <g>
                  {/* Step 1: Define Generic Class */}
                  <g className="group cursor-pointer motion-safe:animate-[codeFlow_3s_ease-in-out_infinite]">
                    <rect 
                      x="50" y="30" 
                      width="180" height="80" 
                      rx="10" 
                      fill="#4F46E5" 
                      className="group-hover:fill-indigo-400 transition-colors duration-300"
                    />
                    <text x="140" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Step 1: Define
                    </text>
                    <rect x="70" y="65" width="120" height="30" rx="5" fill="#3730A3" />
                    <text x="130" y="85" textAnchor="middle" fill="#A5B4FC" fontSize="12" fontFamily="monospace">
                      class Box&lt;T&gt;
                    </text>
                  </g>
                  
                  {/* Arrow 1 */}
                  <path d="M240,70 L290,70" fill="none" stroke="white" strokeWidth="2" markerEnd="url(#arrow)">
                    <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="2s" repeatCount="indefinite" />
                  </path>
                  
                  {/* Step 2: Add Fields & Methods */}
                  <g className="group cursor-pointer" style={{animationDelay: '0.3s'}}>
                    <rect 
                      x="310" y="30" 
                      width="180" height="80" 
                      rx="10" 
                      fill="#7C3AED" 
                      className="group-hover:fill-violet-400 transition-colors duration-300"
                    />
                    <text x="400" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Step 2: Implement
                    </text>
                    <rect x="330" y="65" width="140" height="30" rx="5" fill="#5B21B6" />
                    <text x="400" y="85" textAnchor="middle" fill="#DDD6FE" fontSize="10" fontFamily="monospace">
                      private T item;
                    </text>
                  </g>
                  
                  {/* Arrow 2 */}
                  <path d="M500,70 L550,70" fill="none" stroke="white" strokeWidth="2" markerEnd="url(#arrow)">
                    <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </path>
                  
                  {/* Step 3: Compile */}
                  <g className="group cursor-pointer motion-safe:animate-[compileCheck_2s_ease-in-out_infinite]">
                    <rect 
                      x="570" y="30" 
                      width="120" height="80" 
                      rx="10" 
                      fill="#10B981" 
                      className="group-hover:fill-emerald-400 transition-colors duration-300"
                    />
                    <text x="630" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Step 3: Compile
                    </text>
                    <circle cx="630" cy="80" r="20" fill="#059669" />
                    <text x="630" y="85" textAnchor="middle" fill="white" fontSize="20">✓</text>
                  </g>
                  
                  {/* Arrow 3 */}
                  <path d="M700,70 L750,70" fill="none" stroke="white" strokeWidth="2" markerEnd="url(#arrow)">
                    <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="2s" repeatCount="indefinite" begin="1s" />
                  </path>
                  
                  {/* Step 4: Use */}
                  <g className="group cursor-pointer">
                    <rect 
                      x="770" y="30" 
                      width="120" height="80" 
                      rx="10" 
                      fill="#F59E0B" 
                      className="group-hover:fill-amber-400 transition-colors duration-300"
                    />
                    <text x="830" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Step 4: Use
                    </text>
                    <rect x="785" y="65" width="90" height="30" rx="5" fill="#D97706" />
                    <text x="830" y="85" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">
                      Box&lt;String&gt;
                    </text>
                  </g>
                </g>
                
                {/* Type Safety Flow */}
                <g>
                  {/* Type safety indicator */}
                  <g className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <path d="M100,140 L800,140" stroke="#10B981" strokeWidth="3" strokeDasharray="5,5" />
                    
                    {/* Safety checkpoints */}
                    {[100, 250, 400, 550, 700, 850].map((x, i) => (
                      <g key={i}>
                        <circle cx={x} cy="140" r="8" fill="#10B981" />
                        <text x={x} y="130" textAnchor="middle" fill="#10B981" fontSize="8">
                          Check {i + 1}
                        </text>
                      </g>
                    ))}
                  </g>
                  
                  {/* Compile-time errors */}
                  <g className="motion-safe:animate-[errorPulse_2s_ease-in-out_infinite]" style={{animationDelay: '1.5s'}}>
                    <rect x="350" y="170" width="200" height="30" rx="5" fill="#EF4444" />
                    <text x="450" y="190" textAnchor="middle" fill="white" fontSize="10">
                      Compile-time Type Error
                    </text>
                    <line x1="450" y1="170" x2="450" y2="140" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
                  </g>
                </g>
                
                {/* Bottom examples */}
                <g className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  {/* String example */}
                  <rect x="100" y="180" width="80" height="30" rx="5" fill="#3B82F6" />
                  <text x="140" y="200" textAnchor="middle" fill="white" fontSize="10">String</text>
                  
                  {/* Integer example */}
                  <rect x="250" y="180" width="80" height="30" rx="5" fill="#EF4444" />
                  <text x="290" y="200" textAnchor="middle" fill="white" fontSize="10">Integer</text>
                  
                  {/* Double example */}
                  <rect x="400" y="180" width="80" height="30" rx="5" fill="#8B5CF6" />
                  <text x="440" y="200" textAnchor="middle" fill="white" fontSize="10">Double</text>
                  
                  {/* Student example */}
                  <rect x="550" y="180" width="80" height="30" rx="5" fill="#10B981" />
                  <text x="590" y="200" textAnchor="middle" fill="white" fontSize="10">Student</text>
                  
                  {/* List example */}
                  <rect x="700" y="180" width="80" height="30" rx="5" fill="#F59E0B" />
                  <text x="740" y="200" textAnchor="middle" fill="white" fontSize="10">List&lt;T&gt;</text>
                </g>
                
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Step 1: Defining Generic Classes */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.5s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">📝</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Step 1: Defining Generic Classes</h2>
            </div>
            
            <div className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Defining a generic class involves specifying <strong>type parameters</strong> in angle brackets 
                  after the class name. These parameters act as placeholders that get replaced with actual types 
                  when the class is instantiated.
                </p>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 pl-6 py-4 my-6 rounded-r-lg">
                  <p className="text-indigo-800 dark:text-indigo-200 italic">
                    <strong>Think Like a Developer:</strong> When Abhronila from Shyamnagar defines 
                    <code> class Container&lt;ITEM_TYPE&gt;</code>, she's saying: "This container can hold 
                    <strong> any single type</strong> of item. You tell me what type when you create it, 
                    and I'll ensure it only holds that type."
                  </p>
                </div>
                
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">Basic Definition Syntax</h3>
                
                <div className="grid md:grid-cols-1 gap-8 my-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">Simple Generic Class</h4>
                    
                    <JavaCodeBlock
                      code={`// Basic generic class with one type parameter
public class Box<T> {
    // Field using type parameter
    private T content;
    
    // Constructor using type parameter
    public Box(T content) {
        this.content = content;
    }
    
    // Getter returns type T
    public T getContent() {
        return content;
    }
    
    // Setter accepts type T
    public void setContent(T content) {
        this.content = content;
    }
    
    // Method using type parameter
    public boolean isEmpty() {
        return content == null;
    }
    
    // Static method (note: cannot use T here!)
    public static <U> Box<U> createEmpty() {
        return new Box<>(null);
    }
}`}
                      language="java"
                      showLineNumbers={true}
                    />
                    
                    <div className="mt-4 p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <p className="text-indigo-800 dark:text-indigo-300 text-sm">
                        <strong>Key Points:</strong> 
                        Type parameter <code>T</code> can be used in fields, constructors, 
                        method parameters, and return types.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-3">Multiple Type Parameters</h4>
                    
                    <JavaCodeBlock
                      code={`// Generic class with multiple type parameters
public class KeyValuePair<KEY_TYPE, VALUE_TYPE> {
    // Fields using different type parameters
    private KEY_TYPE key;
    private VALUE_TYPE value;
    
    // Constructor with multiple type parameters
    public KeyValuePair(KEY_TYPE key, VALUE_TYPE value) {
        this.key = key;
        this.value = value;
    }
    
    // Getters with specific return types
    public KEY_TYPE getKey() {
        return key;
    }
    
    public VALUE_TYPE getValue() {
        return value;
    }
    
    // Setters enforcing type safety
    public void setKey(KEY_TYPE key) {
        this.key = key;
    }
    
    public void setValue(VALUE_TYPE value) {
        this.value = value;
    }
    
    // Method using both types
    public String describe() {
        return "Key: " + key + ", Value: " + value;
    }
    
    // Swap key and value (returns new pair)
    public KeyValuePair<VALUE_TYPE, KEY_TYPE> swap() {
        return new KeyValuePair<>(value, key);
    }
}`}
                      language="java"
                      showLineNumbers={true}
                    />
                    
                    <div className="mt-4 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <p className="text-purple-800 dark:text-purple-300 text-sm">
                        <strong>Note:</strong> Multiple type parameters allow creating 
                        complex data structures like pairs, tuples, or maps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Common Definition Patterns */}
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-300 dark:border-blue-800">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Common Generic Class Patterns</h4>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Container/Wrapper",
                      desc: "Holds single item of any type",
                      example: "Box<T>, Container<T>, Wrapper<T>",
                      useCase: "Data encapsulation"
                    },
                    {
                      name: "Pair/Tuple",
                      desc: "Holds two related items of possibly different types",
                      example: "Pair<K,V>, Tuple2<T,U>",
                      useCase: "Key-value storage"
                    },
                    {
                      name: "Node/Link",
                      desc: "Linked data structure nodes",
                      example: "Node<T>, LinkedListNode<T>",
                      useCase: "Data structures"
                    },
                    {
                      name: "Result/Response",
                      desc: "Wraps result with status/metadata",
                      example: "Result<T>, ApiResponse<T>",
                      useCase: "API responses"
                    },
                    {
                      name: "Factory/Builder",
                      desc: "Creates instances of type T",
                      example: "Factory<T>, Builder<T>",
                      useCase: "Object creation"
                    },
                    {
                      name: "Repository/DAO",
                      desc: "Data access for type T",
                      example: "Repository<T>, Dao<T>",
                      useCase: "Database access"
                    }
                  ].map((pattern, index) => (
                    <div 
                      key={index}
                      className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300"
                    >
                      <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">{pattern.name}</div>
                      <p className="text-sm text-blue-800/70 dark:text-blue-400/70 mb-2">{pattern.desc}</p>
                      <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded block mb-2">{pattern.example}</code>
                      <div className="text-xs text-blue-600 dark:text-blue-500">{pattern.useCase}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Implementation Details */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.7s_both] mb-16">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-emerald-300 dark:border-emerald-800">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-emerald-600 dark:text-emerald-300">⚙️</span>
              </span>
              Step 2: Implementation Details & Internal Mechanics
            </h3>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <div className="grid lg:grid-cols-1 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Field & Constructor Implementation</h4>
                    
                    <JavaCodeBlock
                      code={`// Complete Generic Stack Implementation
// Used in Barrackpore University's algorithm course
public class GenericStack<T> {
    // Generic array - note the workaround
    private T[] elements;
    private int top;
    private final int capacity;
    
    // Constructor with generic array creation
    @SuppressWarnings("unchecked")
    public GenericStack(int capacity) {
        this.capacity = capacity;
        // Cannot do: new T[capacity]
        // Workaround: Create Object array and cast
        this.elements = (T[]) new Object[capacity];
        this.top = -1;
    }
    
    // Type-safe push operation
    public void push(T item) {
        if (isFull()) {
            throw new IllegalStateException("Stack is full");
        }
        elements[++top] = item; // Type safety maintained
    }
    
    // Type-safe pop operation
    public T pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        T item = elements[top];
        elements[top--] = null; // Avoid memory leak
        return item; // Returns type T - no casting!
    }
    
    // Type-safe peek
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return elements[top];
    }
    
    public boolean isEmpty() {
        return top == -1;
    }
    
    public boolean isFull() {
        return top == capacity - 1;
    }
    
    public int size() {
        return top + 1;
    }
    
    // Generic method inside generic class
    public <U> GenericStack<U> transform(Function<T, U> transformer) {
        GenericStack<U> result = new GenericStack<>(this.capacity);
        for (int i = 0; i <= top; i++) {
            result.push(transformer.apply(elements[i]));
        }
        return result;
    }
}`}
                      language="java"
                      showLineNumbers={true}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-emerald-100 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-700">
                      <h5 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3">Implementation Challenges & Solutions</h5>
                      
                      <div className="space-y-4">
                        {[
                          {
                            challenge: "Generic Array Creation",
                            solution: "Create Object[] and cast: (T[]) new Object[size]",
                            warning: "@SuppressWarnings(\"unchecked\") needed"
                          },
                          {
                            challenge: "Static Fields",
                            solution: "Cannot use T in static context - use separate generic method",
                            warning: "static T field; // Compile error"
                          },
                          {
                            challenge: "Instanceof with Generics",
                            solution: "Use raw types: obj instanceof GenericStack",
                            warning: "obj instanceof GenericStack<String> // Error"
                          },
                          {
                            challenge: "Primitive Types",
                            solution: "Use wrapper classes: Integer, Double, etc.",
                            warning: "GenericStack<int> // Error, use GenericStack<Integer>"
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                              {item.challenge}
                            </div>
                            <div className="text-sm text-emerald-800/70 dark:text-emerald-400/70 mt-1">
                              <strong>Solution:</strong> {item.solution}
                            </div>
                            <div className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                              {item.warning}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-700">
                      <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Memory & Performance Considerations</h5>
                      
                      <div className="space-y-3">
                        {[
                          "Type erasure: Generic info removed at runtime",
                          "No runtime overhead for type safety",
                          "Cast operations eliminated at compile time",
                          "Array creation workaround has minimal overhead",
                          "Collections preferred over arrays for complex types"
                        ].map((point, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-5 h-5 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                              <span className="text-blue-600 dark:text-blue-300 text-xs">⚡</span>
                            </div>
                            <span className="text-blue-800 dark:text-blue-300 text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Type Erasure Example */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-300 dark:border-amber-800">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Understanding Type Erasure</h4>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <div className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Source Code (Compile Time)</div>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg font-mono text-sm">
                      <div className="text-amber-800 dark:text-amber-300">// Generic class definition</div>
                      <div className="text-amber-800 dark:text-amber-300">public class Container&lt;T&gt; {'{'}</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-4">private T item;</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-4">public T getItem() {'{'}</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-8">return item;</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-4">{'}'}</div>
                      <div className="text-amber-800 dark:text-amber-300">{'}'}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-amber-700 dark:text-amber-300 mb-2">After Type Erasure (Runtime)</div>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg font-mono text-sm">
                      <div className="text-amber-800 dark:text-amber-300">// Type T replaced with Object</div>
                      <div className="text-amber-800 dark:text-amber-300">public class Container {'{'}</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-4">private Object item;</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-4">public Object getItem() {'{'}</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-8">return item;</div>
                      <div className="text-amber-800 dark:text-amber-300 ml-4">{'}'}</div>
                      <div className="text-amber-800 dark:text-amber-300">{'}'}</div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-amber-800 dark:text-amber-400 mt-4">
                  <strong>Key Insight:</strong> Type erasure happens at compile time. The compiler inserts 
                  necessary casts in client code, so runtime still maintains type safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Compilation & Type Checking */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.9s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 dark:text-green-300">🔍</span>
              </span>
              Step 3: Compilation Process & Type Checking
            </h3>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-xl border border-green-300 dark:border-green-800">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">How the Compiler Checks Generic Classes</h4>
                
                <div className="grid md:grid-cols-1 gap-8">
                  <div>
                    <div className="mb-6">
                      <h5 className="font-bold text-green-700 dark:text-green-300 mb-2">Compile-Time Type Checking</h5>
                      
                      <JavaCodeBlock
                        code={`// Compiler analyzes generic usage
public class CompilationExample {
    public static void main(String[] args) {
        // Create specific instances
        Box<String> stringBox = new Box<>("Hello");
        Box<Integer> integerBox = new Box<>(42);
        
        // ✅ VALID: Type matches
        String text = stringBox.getContent();
        Integer number = integerBox.getContent();
        
        // ❌ COMPILE-TIME ERRORS:
        // 1. Wrong type assignment
        // Integer wrong1 = stringBox.getContent(); 
        // Error: String cannot be converted to Integer
        
        // 2. Wrong type passed to method
        // stringBox.setContent(123);
        // Error: int cannot be converted to String
        
        // 3. Raw type warning
        Box rawBox = new Box("Raw"); // Warning: raw type
        // Object obj = rawBox.getContent(); // OK but unsafe
        
        // 4. Type inference with diamond operator
        Box<String> inferredBox = new Box<>();
        // Compiler infers Box<String> from variable type
    }
}`}
                        language="java"
                        showLineNumbers={true}
                      />
                    </div>
                    
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <h6 className="font-bold text-green-800 dark:text-green-300 mb-2">Compiler's Job:</h6>
                      <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                        <li>• Verify type arguments match type parameters</li>
                        <li>• Insert necessary casts (invisible to developer)</li>
                        <li>• Check generic method invocations</li>
                        <li>• Ensure type consistency throughout usage</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <h5 className="font-bold text-red-700 dark:text-red-300 mb-2">Error Messages & How to Fix Them</h5>
                      
                      <div className="space-y-4">
                        {[
                          {
                            error: "incompatible types",
                            cause: "Assigning wrong type to generic variable",
                            fix: "Check type arguments match",
                            example: "Box<String> box = new Box<Integer>();"
                          },
                          {
                            error: "unchecked conversion",
                            cause: "Using raw types without warnings",
                            fix: "Specify type arguments",
                            example: "Box box = new Box(); → Box<String> box = new Box<>();"
                          },
                          {
                            error: "type parameter cannot be instantiated",
                            cause: "Trying to create instance of type parameter",
                            fix: "Use reflection or factory pattern",
                            example: "new T(); // Error"
                          },
                          {
                            error: "generic array creation",
                            cause: "Creating array of generic type",
                            fix: "Use collection or Object[] with cast",
                            example: "T[] array = new T[10]; // Error"
                          }
                        ].map((err, idx) => (
                          <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="font-bold text-red-700 dark:text-red-300">{err.error}</div>
                            <div className="text-sm text-red-800/70 dark:text-red-400/70 mt-1">
                              <strong>Cause:</strong> {err.cause}
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-400 mt-1">
                              <strong>Fix:</strong> {err.fix}
                            </div>
                            <code className="text-xs bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded block mt-2">{err.example}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* IDE Support */}
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-300 dark:border-blue-800">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">IDE Support for Generic Classes</h4>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">✨</div>
                    <div className="font-bold text-blue-700 dark:text-blue-300">Type Inference</div>
                    <div className="text-sm text-blue-800/70 dark:text-blue-400/70 mt-2">
                      IDE suggests type arguments based on context
                    </div>
                  </div>
                  
                  <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">🔧</div>
                    <div className="font-bold text-blue-700 dark:text-blue-300">Quick Fixes</div>
                    <div className="text-sm text-blue-800/70 dark:text-blue-400/70 mt-2">
                      Automatic fixes for generic-related errors
                    </div>
                  </div>
                  
                  <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">📖</div>
                    <div className="font-bold text-blue-700 dark:text-blue-300">Documentation</div>
                    <div className="text-sm text-blue-800/70 dark:text-blue-400/70 mt-2">
                      Shows type parameters in tooltips
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-400">IDE - IntelliJ/Eclipse</span>
                  </div>
                  <div className="space-y-1">
                    <div><span className="text-green-400">Box&lt;String&gt;</span> box = <span className="text-yellow-300">new Box&lt;&gt;</span>("Hello");</div>
                    <div className="text-gray-500">// ^ IDE infers Box&lt;String&gt; from "Hello"</div>
                    <div className="mt-2"><span className="text-blue-300">box.setContent</span>(<span className="text-red-400">123</span>);</div>
                    <div className="text-red-400">// ^ IDE shows red underline: "setContent(java.lang.String)"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Using Generic Classes */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.1s_both] mb-16">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-orange-300 dark:border-orange-800">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Step 4: Using Generic Classes in Practice</h3>
            
            <div className="grid lg:grid-cols-1 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Basic Usage Patterns</h4>
                
                <JavaCodeBlock
                  code={`// Practical Usage Examples from Naihati College
public class GenericClassUsage {
    
    public static void main(String[] args) {
        // 1. Simple Box usage
        Box<String> messageBox = new Box<>("Welcome to Barrackpore");
        String message = messageBox.getContent(); // Type: String
        messageBox.setContent("Updated message");
        
        // 2. Stack usage (from earlier example)
        GenericStack<Integer> numberStack = new GenericStack<>(10);
        numberStack.push(10);
        numberStack.push(20);
        numberStack.push(30);
        
        int topNumber = numberStack.peek(); // Type: Integer
        int popped = numberStack.pop();     // Type: Integer
        
        // 3. Pair usage with different types
        Pair<String, Integer> studentGrade = 
            new Pair<>("Swadeep", 85);
        String studentName = studentGrade.getFirst();
        int grade = studentGrade.getValue();
        
        // 4. Complex: Stack of Pairs
        GenericStack<Pair<String, Double>> gradeStack = 
            new GenericStack<>(50);
        gradeStack.push(new Pair<>("Math", 92.5));
        gradeStack.push(new Pair<>("Science", 88.0));
        
        // 5. Type inference with methods
        Box<String> inferredBox = createBox("Inferred type");
        
        // 6. Wildcard usage (advanced - next topic)
        List<Box<String>> stringBoxes = new ArrayList<>();
        processBoxes(stringBoxes);
    }
    
    // Generic method creating Box instances
    public static <T> Box<T> createBox(T content) {
        return new Box<>(content);
    }
    
    // Method using wildcards
    public static void processBoxes(List<? extends Box<?>> boxes) {
        // Process any Box of any type
    }
    
    // Real-world scenario: Student Record System
    public static class StudentRecordSystem {
        private Map<Integer, Box<Student>> studentRecords;
        
        public void addStudentRecord(int id, Student student) {
            Box<Student> record = new Box<>(student);
            studentRecords.put(id, record);
        }
        
        public Student getStudent(int id) {
            Box<Student> record = studentRecords.get(id);
            return record != null ? record.getContent() : null;
        }
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
                  <h5 className="font-bold text-orange-800 dark:text-orange-300 mb-4">Real-World Application: School System</h5>
                  
                  <div className="space-y-4">
                    {[
                      {
                        component: "GradeBook<T>",
                        purpose: "Store grades of any type (Double, String, Enum)",
                        example: "GradeBook<Double> mathGrades"
                      },
                      {
                        component: "AttendanceRecord<D, S>",
                        purpose: "Map dates to student attendance",
                        example: "AttendanceRecord<LocalDate, Boolean>"
                      },
                      {
                        component: "ResourcePool<R>",
                        purpose: "Manage reusable resources",
                        example: "ResourcePool<DatabaseConnection>"
                      },
                      {
                        component: "Validator<T>",
                        purpose: "Validate objects of type T",
                        example: "Validator<Student> studentValidator"
                      },
                      {
                        component: "Transformer<I, O>",
                        purpose: "Convert between types",
                        example: "Transformer<String, Integer> parser"
                      }
                    ].map((app, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300"
                      >
                        <div className="font-bold text-orange-700 dark:text-orange-300 mb-1">
                          {app.component}
                        </div>
                        <div className="text-sm text-orange-800/70 dark:text-orange-400/70 mb-2">
                          {app.purpose}
                        </div>
                        <code className="text-xs bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">
                          {app.example}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-rose-200 dark:border-rose-700">
                  <h5 className="font-bold text-rose-800 dark:text-rose-300 mb-4">Common Usage Mistakes & Fixes</h5>
                  
                  <div className="space-y-3">
                    {[
                      "Mistake: Using raw types instead of specifying type arguments",
                      "Fix: Always use Box<String> instead of Box",
                      "Mistake: Forgetting diamond operator <>",
                      "Fix: Use new Box<>() not new Box<String>()",
                      "Mistake: Trying to create generic array",
                      "Fix: Use ArrayList<Box<String>> instead of Box<String>[]",
                      "Mistake: Using instanceof with parameterized type",
                      "Fix: Use raw type: obj instanceof Box",
                      "Mistake: Ignoring compiler warnings",
                      "Fix: Address all unchecked warnings"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className={clsx(
                          "w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                          idx % 2 === 0 ? "bg-rose-100 dark:bg-rose-800" : "bg-green-100 dark:bg-green-800"
                        )}>
                          <span className={clsx(
                            idx % 2 === 0 ? "text-rose-600 dark:text-rose-300" : "text-green-600 dark:text-green-300",
                            "text-sm"
                          )}>
                            {idx % 2 === 0 ? "✗" : "✓"}
                          </span>
                        </div>
                        <span className={clsx(
                          idx % 2 === 0 ? "text-rose-800 dark:text-rose-300" : "text-green-800 dark:text-green-300",
                          "text-sm"
                        )}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Usage Patterns */}
            <div className="mt-8 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-300 dark:border-violet-800">
              <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Advanced Usage Patterns</h4>
              
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <JavaCodeBlock
                    code={`// 1. Nested Generics
List<Box<String>> listOfBoxes = new ArrayList<>();
listOfBoxes.add(new Box<>("Item 1"));
listOfBoxes.add(new Box<>("Item 2"));

// Type-safe processing
for (Box<String> box : listOfBoxes) {
    String content = box.getContent(); // Type: String
}

// 2. Generic Class as Type Parameter
Map<String, Box<Integer>> studentScores = new HashMap<>();
studentScores.put("Swadeep", new Box<>(85));
studentScores.put("Tuhina", new Box<>(92));

// 3. Method Chaining with Generics
ApiResponse<List<Student>> response = studentService
    .getAllStudents()
    .filter(Student::isActive)
    .transformToList();

// 4. Factory Pattern with Generics
StudentFactory<Undergraduate> undergradFactory = 
    new StudentFactory<>(Undergraduate.class);
Undergraduate student = undergradFactory.create("Abhronila");

// 5. Builder Pattern with Generics
QueryBuilder<Student> builder = new QueryBuilder<Student>()
    .where("age", ">", 18)
    .orderBy("name")
    .limit(100);
List<Student> students = builder.execute();`}
                    language="java"
                    showLineNumbers={true}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <h6 className="font-bold text-violet-700 dark:text-violet-300 mb-2">Design Patterns with Generics</h6>
                    <ul className="text-sm text-violet-800 dark:text-violet-400 space-y-2">
                      <li>• <strong>Factory Pattern:</strong> <code>Factory&lt;T&gt;</code> creates instances of T</li>
                      <li>• <strong>Builder Pattern:</strong> <code>Builder&lt;T&gt;</code> constructs complex T objects</li>
                      <li>• <strong>Repository Pattern:</strong> <code>Repository&lt;T&gt;</code> handles persistence of T</li>
                      <li>• <strong>Strategy Pattern:</strong> <code>Strategy&lt;T&gt;</code> implements algorithms for T</li>
                      <li>• <strong>Observer Pattern:</strong> <code>Observer&lt;T&gt;</code> observes events of type T</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <h6 className="font-bold text-violet-700 dark:text-violet-300 mb-2">Performance Benefits</h6>
                    <div className="text-sm text-violet-800 dark:text-violet-400 space-y-1">
                      <div>• Eliminates runtime type checking</div>
                      <div>• Reduces explicit casting overhead</div>
                      <div>• Enables better JIT optimization</div>
                      <div>• Reduces memory footprint for type information</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.3s_both] mb-16">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border-2 border-amber-300 dark:border-amber-700 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Teacher's Note</h3>
                <p className="text-amber-700 dark:text-amber-300">Sukanta Hui • 27 Years Experience</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/70 dark:bg-gray-900/70 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">The Development Workflow Mindset:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When I train developers at Barrackpore Tech Park, I emphasize this workflow: 
                  <strong> Define → Implement → Compile → Use</strong>. Each step has specific goals:
                </p>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h5 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Define Phase (Planning)</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                      <li>• Ask: "What types will this work with?"</li>
                      <li>• Choose meaningful type parameter names</li>
                      <li>• Consider future extensibility</li>
                      <li>• Example: Debangshu needs <code>GradeContainer&lt;GRADE_TYPE&gt;</code></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-green-600 dark:text-green-400 mb-2">Compile Phase (Verification)</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                      <li>• Treat warnings as errors</li>
                      <li>• Verify type consistency</li>
                      <li>• Test with different type arguments</li>
                      <li>• Example: Does <code>GradeContainer&lt;String&gt;</code> work with "A+"?</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">💡 Classroom Exercise</h5>
                  <p className="text-sm text-indigo-800 dark:text-indigo-400">
                    Take Swadeep's student management system. Identify 3 container classes that should be generic. 
                    For each, write the class definition, implement it, compile it, and write usage examples. 
                    Notice how many type safety issues the compiler catches!
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-amber-700 dark:text-amber-400 mt-4">
                <div>
                  <span className="font-semibold">Real Project:</span> Led generic class migration for Ichapur Hospital (2006)
                </div>
                <div className="text-xs">
                  Contact: sukantahui@codernaccotax.co.in • 7003756860
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.5s_both] mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 dark:text-blue-300">💭</span>
              </span>
              Think About This...
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white/70 dark:bg-gray-900/70 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-lg mb-4">
                  <strong>Development Challenge:</strong> Tuhina is building a library system for Naihati College. 
                  She needs containers for:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <div className="font-bold text-purple-700 dark:text-purple-300">Books</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">String titles, ISBN, Author</div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="font-bold text-green-700 dark:text-green-300">Members</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Student/Faculty objects</div>
                  </div>
                  <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <div className="font-bold text-amber-700 dark:text-amber-300">Transactions</div>
                    <div className="text-sm text-amber-600 dark:text-amber-400">Book + Member + Date</div>
                  </div>
                </div>
                
                <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300 mb-2">
                    <strong>Question:</strong> Should she create separate container classes or generic ones? 
                    Design a generic <code>LibraryContainer&lt;ITEM_TYPE&gt;</code> that can handle all three.
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    <strong>Consider:</strong> What methods would work for all types? 
                    What type-specific methods would need to be in subclasses or use different approaches?
                  </p>
                </div>
                
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h5 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">🧪 Compilation Test</h5>
                  <p className="text-sm text-emerald-800 dark:text-emerald-400">
                    Write your generic class. Then try to use it incorrectly: 
                    <code> LibraryContainer&lt;String&gt; container = new LibraryContainer&lt;Integer&gt;();</code>
                    Watch the compiler catch the error. This is type safety in action!
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-1 gap-4 mt-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">🔍 Code Review Exercise</h5>
                  <p className="text-sm">
                    Review a colleague's non-generic container class. Identify all explicit casts. 
                    Each cast represents a potential runtime error. Propose a generic version.
                  </p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                  <h5 className="font-bold text-teal-700 dark:text-teal-300 mb-2">📈 Refactoring Practice</h5>
                  <p className="text-sm">
                    Take an existing class that uses Object and casting. Refactor it to be generic. 
                    Count how many compiler warnings disappear. Each warning eliminated improves reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.7s_both]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Defining & Using Generic Classes: Checklist</h3>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Definition Phase</h4>
                {[
                  "Choose appropriate type parameter names (T, E, K, V, etc.)",
                  "Specify type parameters in class declaration: class Name<T>",
                  "Use type parameters in fields, constructors, and methods",
                  "Consider multiple type parameters for complex structures",
                  "Handle generic array creation properly",
                  "Add necessary @SuppressWarnings annotations",
                  "Consider bounded type parameters if needed",
                  "Make class immutable when possible"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start mb-3 p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-indigo-600 dark:text-indigo-300">{index + 1}</span>
                    </div>
                    <span className="text-indigo-800 dark:text-indigo-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Usage Phase</h4>
                {[
                  "Always specify type arguments when instantiating",
                  "Use diamond operator <> for type inference",
                  "Avoid raw types in new code",
                  "Let IDE infer types when possible",
                  "Test with different type arguments",
                  "Handle compiler warnings immediately",
                  "Use nested generics carefully",
                  "Consider performance implications of complex generic structures",
                  "Document type parameter constraints",
                  "Use generic classes in collections and APIs"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start mb-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300">{index + 1}</span>
                    </div>
                    <span className="text-green-800 dark:text-green-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Next Topic Preview</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Next, we'll explore <strong>"Generic Methods"</strong> - 
                    methods that can operate on different types independently of their class's type parameters.
                  </p>
                </div>
                <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg font-semibold">
                  Topic 5/24
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-2">© 2024 Java Generics Masterclass • Practical Implementation Guide</p>
        <p className="text-sm">Development workflows from: Barrackpore Tech Park, Naihati College, Shyamnagar Library Systems</p>
      </footer>
    </div>
  );
};

export default Topic4;