import React from 'react';
import clsx from 'clsx';
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

const Topic6 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50 dark:from-gray-900 dark:to-rose-950/20 text-gray-800 dark:text-gray-200 transition-colors duration-500">
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
          
          @keyframes constructorBuild {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes typeInstantiation {
            0% {
              stroke-dashoffset: 100;
              opacity: 0.3;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
          
          @keyframes objectCreationFlow {
            0% {
              transform: translateX(-20px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes factoryPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.2);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.4);
            }
          }
        `}
      </style>

      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 dark:from-rose-800 dark:via-pink-800 dark:to-red-800 text-white pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
            <div className="inline-flex items-center px-4 py-2 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse"></span>
              Java Generics Series • Topic 7
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Generic Constructors
            </h1>
            
            <p className="text-xl text-rose-100 dark:text-rose-200 max-w-3xl leading-relaxed">
              Building Type-Safe Objects - Constructors with their own Type Parameters
            </p>
          </div>
          
          {/* Animated Constructor Visualization */}
          <div className="mt-10 motion-safe:animate-[fadeSlideUp_1s_ease-out_0.3s_both]">
            <div className="max-w-5xl mx-auto">
              <svg 
                viewBox="0 0 900 240" 
                className="w-full h-auto"
                aria-label="Visualization of generic constructor concept and object creation"
              >
                {/* Constructor Definition */}
                <g>
                  {/* Class Definition */}
                  <g className="group cursor-pointer">
                    <rect 
                      x="50" y="50" 
                      width="200" height="80" 
                      rx="10" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      className="text-pink-400 group-hover:stroke-4 transition-all duration-300"
                    >
                      <animate 
                        attributeName="stroke-dasharray" 
                        values="5,5;20,5;5,5" 
                        dur="3s" 
                        repeatCount="indefinite"
                      />
                    </rect>
                    
                    <text x="150" y="75" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold">
                      Class Definition
                    </text>
                    <text x="150" y="95" textAnchor="middle" fill="#F9A8D4" fontSize="12" fontFamily="monospace">
                      class Container&lt;T&gt;
                    </text>
                  </g>
                  
                  {/* Constructor Arrow */}
                  <path 
                    d="M270,90 L320,90" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    markerEnd="url(#constrArrow)"
                  >
                    <animate 
                      attributeName="stroke-dasharray" 
                      values="0,100;50,50;0,100" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </path>
                  
                  {/* Generic Constructor */}
                  <g className="motion-safe:animate-[typeInstantiation_2s_ease-in-out_infinite]">
                    <rect 
                      x="340" y="30" 
                      width="220" height="120" 
                      rx="10" 
                      fill="#EC4899" 
                      className="hover:fill-pink-400 transition-colors duration-300"
                    />
                    <text x="450" y="60" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Generic Constructor
                    </text>
                    
                    {/* Constructor signature */}
                    <rect x="360" y="75" width="180" height="60" rx="5" fill="#DB2777" />
                    <text x="450" y="100" textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace">
                      &lt;U&gt; Container(U item)
                    </text>
                    <text x="450" y="115" textAnchor="middle" fill="#FBCFE8" fontSize="10">
                      Type parameter U ≠ class parameter T
                    </text>
                  </g>
                  
                  {/* New Expression */}
                  <g className="group cursor-pointer">
                    <rect 
                      x="590" y="50" 
                      width="160" height="80" 
                      rx="10" 
                      fill="#EF4444" 
                      className="group-hover:fill-red-400 transition-colors duration-300"
                    />
                    <text x="670" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Object Creation
                    </text>
                    <rect x="610" y="85" width="120" height="30" rx="5" fill="#DC2626" />
                    <text x="670" y="105" textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace">
                      new Container&lt;&gt;(value)
                    </text>
                  </g>
                  
                  {/* Arrow to instance */}
                  <path d="M760,90 L810,90" fill="none" stroke="#10B981" strokeWidth="2" markerEnd="url(#instanceArrow)" />
                  
                  {/* Created Instance */}
                  <g className="motion-safe:animate-[constructorBuild_1s_ease-out_0.5s_both]">
                    <rect 
                      x="830" y="30" 
                      width="120" height="120" 
                      rx="10" 
                      fill="#10B981" 
                      className="hover:fill-emerald-400 transition-colors duration-300"
                    />
                    <text x="890" y="60" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Instance
                    </text>
                    <rect x="850" y="75" width="80" height="40" rx="5" fill="#059669" />
                    <text x="890" y="95" textAnchor="middle" fill="white" fontSize="12">
                      Container&lt;String&gt;
                    </text>
                    <rect x="850" y="120" width="80" height="20" rx="3" fill="#047857" />
                    <text x="890" y="135" textAnchor="middle" fill="#A7F3D0" fontSize="8">
                      Type-safe!
                    </text>
                  </g>
                </g>
                
                {/* Type Flow Visualization */}
                <g className="motion-safe:animate-[objectCreationFlow_3s_ease-in-out_infinite]">
                  {/* Input type */}
                  <g>
                    <circle cx="450" cy="180" r="15" fill="#3B82F6" />
                    <text x="450" y="180" textAnchor="middle" fill="white" fontSize="10">String</text>
                    <text x="450" y="200" textAnchor="middle" fill="#93C5FD" fontSize="8">Input Type</text>
                  </g>
                  
                  {/* Constructor processing */}
                  <path d="M470,180 L520,180" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
                  <rect x="530" y="165" width="80" height="30" rx="5" fill="#8B5CF6" />
                  <text x="570" y="185" textAnchor="middle" fill="white" fontSize="10">Constructor</text>
                  
                  {/* Type inference */}
                  <path d="M615,180 L665,180" fill="none" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="2s" repeatCount="indefinite" />
                  </path>
                  <text x="640" y="175" textAnchor="middle" fill="#F59E0B" fontSize="8">Type Inference</text>
                  
                  {/* Class type parameter */}
                  <rect x="675" y="165" width="60" height="30" rx="5" fill="#EC4899" />
                  <text x="705" y="185" textAnchor="middle" fill="white" fontSize="10">T = String</text>
                  
                  {/* Result */}
                  <path d="M740,180 L790,180" fill="none" stroke="#10B981" strokeWidth="2" />
                  <rect x="800" y="165" width="70" height="30" rx="5" fill="#10B981" />
                  <text x="835" y="185" textAnchor="middle" fill="white" fontSize="10">Container&lt;String&gt;</text>
                </g>
                
                <defs>
                  <marker id="constrArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                  </marker>
                  <marker id="instanceArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction to Generic Constructors */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.5s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-rose-600 dark:text-rose-300">🔨</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">What Are Generic Constructors?</h2>
            </div>
            
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  <strong>Generic constructors</strong> are constructors that declare their own type parameters, 
                  independent of the class's type parameters. They allow creating instances with different 
                  type arguments than those specified at the class level, providing additional flexibility 
                  during object construction.
                </p>
                
                <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 pl-6 py-4 my-6 rounded-r-lg">
                  <p className="text-rose-800 dark:text-rose-200 italic">
                    <strong>Analogy:</strong> Think of a Barrackpore furniture factory (generic class) that 
                    normally makes chairs (type T). A generic constructor is like a special assembly line 
                    that can also make tables (type U) when needed. Same factory, different products!
                  </p>
                </div>
                
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">The Core Concept</h3>
                
                <div className="grid md:grid-cols-1 gap-8 my-8">
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-rose-700 dark:text-rose-300 mb-3">Key Characteristics</h4>
                    
                    <ul className="space-y-3 text-rose-800 dark:text-rose-300">
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span>Can be declared in both generic and non-generic classes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span>Type parameters declared before constructor name</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span>Independent of class type parameters</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span>Useful for factory methods and flexible initialization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span>Type inference works with <code>new</code> expressions</span>
                      </li>
                    </ul>
                    
                    <div className="mt-4 p-4 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                      <p className="text-rose-800 dark:text-rose-300 text-sm">
                        <strong>Syntax:</strong> <code>&lt;T&gt; ClassName(T parameter)</code>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">Basic Example</h4>
                    
                    <JavaCodeBlock
                      code={`// Generic constructor in a non-generic class
public class Container {
    private Object value;
    
    // Generic constructor - declares its own type parameter
    // <T> is NOT related to class type parameters (class has none)
    public <T> Container(T value) {
        this.value = value;
    }
    
    // Regular method using the stored value
    public Object getValue() {
        return value;
    }
}

// Usage with type inference
public class Main {
    public static void main(String[] args) {
        // Type inferred from argument - String
        Container stringContainer = new Container("Hello from Barrackpore");
        
        // Type inferred from argument - Integer
        Container intContainer = new Container(42);
        
        // Type inferred - Student object
        Container studentContainer = new Container(new Student("Swadeep", 22));
        
        // Explicit type specification (rarely needed)
        Container explicit = new <String>Container("Explicit type");
        
        // What type is stored? Need to cast when retrieving!
        // This shows limitation - better with generic class
    }
}

// Generic constructor in generic class
public class Box<T> {
    private T value;
    
    // Regular constructor using class type parameter
    public Box(T value) {
        this.value = value;
    }
    
    // Generic constructor with different type parameter
    // <U> is different from class <T>
    public <U> Box(U otherValue, Class<T> targetType) {
        // Convert U to T (requires conversion logic)
        this.value = convert(otherValue, targetType);
    }
    
    private T convert(U value, Class<T> type) {
        // Conversion logic here
        return type.cast(value);
    }
}`}
                      language="java"
                      showLineNumbers={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Syntax and Declaration */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.7s_both] mb-16">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-pink-300 dark:border-pink-800">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-pink-600 dark:text-pink-300">📝</span>
              </span>
              Syntax & Declaration Patterns
            </h3>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <div className="grid md:grid-cols-1 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Declaration Syntax</h4>
                    
                    <div className="space-y-6">
                      {[
                        {
                          pattern: "Basic Generic Constructor",
                          syntax: "public <T> ClassName(T param)",
                          desc: "Single type parameter constructor",
                          example: "public <T> Box(T item)"
                        },
                        {
                          pattern: "Multiple Type Parameters",
                          syntax: "public <K, V> Pair(K key, V value)",
                          desc: "Constructor with multiple type params",
                          example: "public <K, V> Entry(K k, V v)"
                        },
                        {
                          pattern: "Bounded Type Parameter",
                          syntax: "public <T extends Number> Calculator(T num)",
                          desc: "Constructor with type bounds",
                          example: "public <T extends Comparable> Container(T item)"
                        },
                        {
                          pattern: "In Generic Class",
                          syntax: "class C<T> { public <U> C(U param) }",
                          desc: "Different type params from class",
                          example: "class Box<T> { public <U> Box(U item) }"
                        },
                        {
                          pattern: "Static Factory Constructor",
                          syntax: "public static <T> T create(Class<T> type)",
                          desc: "Static method acting as constructor",
                          example: "public static <T> Container<T> of(T value)"
                        }
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-lg border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-bold text-pink-700 dark:text-pink-300">{item.pattern}</div>
                              <code className="text-sm bg-pink-200 dark:bg-pink-800 px-2 py-1 rounded mt-1">
                                {item.syntax}
                              </code>
                            </div>
                            <div className="text-xs text-pink-600 dark:text-pink-400 bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded">
                              {item.example}
                            </div>
                          </div>
                          <p className="text-sm text-pink-800 dark:text-pink-400">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Complete Examples</h4>
                    
                    <JavaCodeBlock
                      code={`// Example 1: Generic constructor in non-generic class
public class FlexibleContainer {
    private Object content;
    
    // Generic constructor allows any type
    public <T> FlexibleContainer(T content) {
        this.content = content;
    }
    
    // Get with casting - type safety lost!
    @SuppressWarnings("unchecked")
    public <T> T getContent(Class<T> type) {
        return type.cast(content);
    }
}

// Example 2: Multiple constructors with different type parameters
public class MultiConstructorBox {
    private Object value;
    
    // Regular constructor
    public MultiConstructorBox(Object value) {
        this.value = value;
    }
    
    // Generic constructor
    public <T> MultiConstructorBox(T value) {
        this.value = value;
    }
    
    // Generic constructor with bounds
    public <T extends Number> MultiConstructorBox(T number) {
        this.value = number.doubleValue();
    }
}

// Example 3: Generic class with generic constructor
public class GenericBox<T> {
    private T value;
    
    // Regular constructor using class T
    public GenericBox(T value) {
        this.value = value;
    }
    
    // Generic constructor with different type U
    // Can initialize with different type, then convert
    public <U> GenericBox(U otherValue, Function<U, T> converter) {
        this.value = converter.apply(otherValue);
    }
    
    // Another generic constructor example
    public <U extends T> GenericBox(U value) {
        this.value = value;  // U must be subclass of T
    }
}

// Example 4: Static factory method (alternative to constructor)
public class ContainerFactory {
    // Static generic method acting as constructor
    public static <T> Container<T> createContainer(T value) {
        return new Container<>(value);
    }
    
    // With bounded type parameter
    public static <T extends Comparable<T>> SortedContainer<T> 
        createSortedContainer(T value) {
        return new SortedContainer<>(value);
    }
}`}
                      language="java"
                      showLineNumbers={true}
                    />
                  </div>
                </div>
              </div>
              
              {/* Type Parameter Scope */}
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-300 dark:border-blue-800">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Scope & Visibility Rules</h4>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Constructor Scope</div>
                    <p className="text-sm text-blue-800/70 dark:text-blue-400/70">
                      Type parameters visible only within constructor
                    </p>
                    <code className="text-xs mt-2 block">public &lt;T&gt; Class(T param)</code>
                  </div>
                  
                  <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">Different from Class</div>
                    <p className="text-sm text-purple-800/70 dark:text-purple-400/70">
                      Constructor T ≠ Class T when both exist
                    </p>
                    <code className="text-xs mt-2 block">
                        {`class C&lt;T&gt; { &lt;U&gt; C(U u) }`}
                    </code>
                  </div>
                  
                  <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Cannot Be Static</div>
                    <p className="text-sm text-green-800/70 dark:text-green-400/70">
                      Constructors are never static by definition
                    </p>
                    <code className="text-xs mt-2 block">// No static constructors!</code>
                  </div>
                </div>
                
                <div className="mt-6">
                  <JavaCodeBlock
                    code={`// Scope demonstration with confusing naming
public class ScopeExample<T> {  // Class-level T
    private T classValue;
    
    // Constructor-level T hides class-level T
    // This is CONFUSING - avoid same names!
    public <T> ScopeExample(T constructorValue) {
        // constructorValue is constructor-level T
        // this.classValue is class-level T
        // They can be DIFFERENT types!
        this.classValue = null;  // Can't assign constructorValue!
    }
    
    // Better: Use different names
    public <U> ScopeExample(U constructorValue, Class<T> targetType) {
        // U is constructor type parameter
        // T is class type parameter
        // Need to convert U to T
        this.classValue = convert(constructorValue, targetType);
    }
    
    // Another example: constructor using class T
    public ScopeExample(T classValue) {
        // This uses class T, not constructor T
        this.classValue = classValue;
    }
    
    private T convert(U value, Class<T> type) {
        // Conversion logic
        return type.cast(value);
    }
}

// Usage showing the confusion
public class Main {
    public static void main(String[] args) {
        // Class T is String
        ScopeExample<String> example1 = 
            new ScopeExample<>("Class type");
        
        // Constructor T is Integer, class T is String
        ScopeExample<String> example2 = 
            new <Integer>ScopeExample<String>(42, String.class);
        
        // VERY confusing: same name, different meanings!
    }
}`}
                    language="java"
                    showLineNumbers={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Use Cases */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.9s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 dark:text-orange-300">🏭</span>
              </span>
              Practical Use Cases & Real-World Examples
            </h3>
            
            <div className="space-y-8">
              {/* Example 1: Flexible Factory Pattern */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 p-6 rounded-xl border border-orange-300 dark:border-orange-800 motion-safe:animate-[factoryPulse_3s_ease-in-out_infinite]">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-orange-600 dark:text-orange-300">🏗️</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">1. Flexible Factory Pattern</h4>
                    <p className="text-orange-600 dark:text-orange-400">Barrackpore University Object Factory</p>
                  </div>
                </div>
                
                <JavaCodeBlock
                  code={`// Generic constructor for flexible object creation
// Used in university system for creating different entity types

public class EntityFactory {
    
    // Generic constructor allowing creation with any initial data
    public <T> EntityContainer<T> createContainer(T initialData) {
        return new EntityContainer<>(initialData);
    }
    
    // Generic constructor with validation
    public <T> ValidatedContainer<T> createValidatedContainer(
            T data, Validator<T> validator) {
        if (!validator.isValid(data)) {
            throw new IllegalArgumentException("Invalid data");
        }
        return new ValidatedContainer<>(data);
    }
    
    // Generic constructor with conversion
    public <S, T> ConvertedContainer<T> createConvertedContainer(
            S sourceData, Function<S, T> converter) {
        T convertedData = converter.apply(sourceData);
        return new ConvertedContainer<>(convertedData);
    }
}

// Supporting classes
public class EntityContainer<T> {
    private final T data;
    
    // Generic constructor
    public <U> EntityContainer(U initialData) {
        // In real scenario, might convert U to T
        this.data = (T) initialData;  // Requires careful design
    }
}

public class ValidatedContainer<T> {
    private final T data;
    
    public ValidatedContainer(T data) {
        this.data = data;
    }
}

public class ConvertedContainer<T> {
    private final T data;
    
    public ConvertedContainer(T data) {
        this.data = data;
    }
}

// Usage in university system
public class UniversitySystem {
    public void setupSystem() {
        EntityFactory factory = new EntityFactory();
        
        // Create student container
        Student student = new Student("Swadeep", "CS");
        EntityContainer<Student> studentContainer = 
            factory.createContainer(student);
        
        // Create course container with validation
        Course course = new Course("Java 101", 4);
        Validator<Course> courseValidator = c -> c.getCredits() > 0;
        ValidatedContainer<Course> courseContainer = 
            factory.createValidatedContainer(course, courseValidator);
        
        // Create grade container with conversion
        Integer rawGrade = 85;
        ConvertedContainer<String> gradeContainer = 
            factory.createConvertedContainer(
                rawGrade, 
                grade -> grade >= 90 ? "A" : "B"
            );
        
        // Generic constructor allows type-safe creation
        // without knowing exact types in advance
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
              </div>
              
              {/* Example 2: Builder Pattern with Generic Constructors */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-xl border border-emerald-300 dark:border-emerald-800">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-emerald-600 dark:text-emerald-300">🔧</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">2. Builder Pattern with Generic Constructors</h4>
                    <p className="text-emerald-600 dark:text-emerald-400">Ichapur Hospital Patient Record System</p>
                  </div>
                </div>
                
                <JavaCodeBlock
                  code={`// Generic constructor in builder pattern
// Allows building different types of medical records

public class MedicalRecordBuilder {
    
    // Generic constructor for creating typed builders
    public <T extends MedicalRecord> TypedBuilder<T> forType(Class<T> recordType) {
        return new TypedBuilder<>(recordType);
    }
    
    // Static generic factory method (alternative to constructor)
    public static <T extends MedicalRecord> TypedBuilder<T> createBuilder(
            Class<T> recordType) {
        return new TypedBuilder<>(recordType);
    }
}

// Typed builder with generic constructor
public class TypedBuilder<T extends MedicalRecord> {
    private final Class<T> recordType;
    private Map<String, Object> data = new HashMap<>();
    
    // Generic constructor
    public <U> TypedBuilder(Class<T> recordType) {
        this.recordType = recordType;
    }
    
    // Method with generic parameter
    public <V> TypedBuilder<T> withData(String key, V value) {
        data.put(key, value);
        return this;
    }
    
    // Build method using reflection
    public T build() {
        try {
            T record = recordType.newInstance();
            // Apply data to record using reflection
            applyData(record, data);
            return record;
        } catch (Exception e) {
            throw new RuntimeException("Failed to build record", e);
        }
    }
    
    private void applyData(T record, Map<String, Object> data) {
        // Reflection-based data application
        // Implementation omitted for brevity
    }
}

// Record types
public abstract class MedicalRecord {
    protected String patientId;
    protected LocalDate date;
    // Common medical record fields
}

public class LabReport extends MedicalRecord {
    private String testName;
    private Double result;
    private String unit;
    // Lab-specific fields
}

public class Prescription extends MedicalRecord {
    private String medication;
    private String dosage;
    private String frequency;
    // Prescription-specific fields
}

// Usage in hospital system
public class HospitalSystem {
    public void createMedicalRecords() {
        MedicalRecordBuilder builder = new MedicalRecordBuilder();
        
        // Create lab report using generic constructor
        LabReport labReport = builder.forType(LabReport.class)
            .withData("testName", "Blood Glucose")
            .withData("result", 95.0)
            .withData("unit", "mg/dL")
            .withData("patientId", "P12345")
            .build();
        
        // Create prescription using static factory
        Prescription prescription = MedicalRecordBuilder
            .createBuilder(Prescription.class)
            .withData("medication", "Amoxicillin")
            .withData("dosage", "500mg")
            .withData("frequency", "Every 8 hours")
            .withData("patientId", "P12345")
            .build();
        
        // Type safety: Can't mix types
        // LabReport wrong = builder.forType(Prescription.class)... // Compile error
        
        // Generic constructors enable type-safe builder creation
        // without knowing exact type at compile time
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
              </div>
            </div>
            
            {/* Common Patterns */}
            <div className="mt-8 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-300 dark:border-violet-800">
              <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Common Generic Constructor Patterns</h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    pattern: "Flexible Initialization",
                    desc: "Constructor accepts different types, converts internally",
                    example: "public <U> Container(U data, Converter<U,T> conv)"
                  },
                  {
                    pattern: "Factory Method",
                    desc: "Static methods acting as typed constructors",
                    example: "public static <T> Box<T> of(T value)"
                  },
                  {
                    pattern: "Builder Starter",
                    desc: "Generic constructor starts builder chain",
                    example: "public <T> Builder<T> forType(Class<T> type)"
                  },
                  {
                    pattern: "Conversion Constructor",
                    desc: "Constructs from different type with conversion",
                    example: "public <U> Target(U source, Function<U,Target> fn)"
                  },
                  {
                    pattern: "Validation Constructor",
                    desc: "Constructor with type-safe validation",
                    example: "public <T> Validated(T data, Validator<T> validator)"
                  },
                  {
                    pattern: "Adapter Pattern",
                    desc: "Adapts different types to common interface",
                    example: "public <U> Adapter(U adaptee, Adapter<U,T> adapter)"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-300"
                  >
                    <div className="font-bold text-violet-700 dark:text-violet-300 mb-2">
                      {item.pattern}
                    </div>
                    <p className="text-sm text-violet-800/70 dark:text-violet-400/70 mb-2">
                      {item.desc}
                    </p>
                    <code className="text-xs bg-violet-100 dark:bg-violet-900/50 px-2 py-1 rounded block">
                      {item.example}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Type Inference with New Expressions */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.1s_both] mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-blue-300 dark:border-blue-800">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Type Inference with <code>new</code> Expressions</h3>
            
            <div className="grid lg:grid-cols-1 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">How Type Inference Works</h4>
                
                <JavaCodeBlock
                  code={`// Type inference with generic constructors
public class InferenceExample {
    
    // Generic constructor
    public <T> InferenceExample(T value) {
        System.out.println("Created with: " + value.getClass());
    }
    
    // Multiple type parameters
    public <K, V> InferenceExample(K key, V value) {
        System.out.println("Key: " + key + ", Value: " + value);
    }
    
    // Bounded type parameter
    public <T extends Number> InferenceExample(T number) {
        System.out.println("Number: " + number.doubleValue());
    }
}

// Usage showing type inference
public class Main {
    public static void main(String[] args) {
        // Inference from argument type
        InferenceExample ex1 = new InferenceExample("Hello");
        // T inferred as String
        
        InferenceExample ex2 = new InferenceExample(42);
        // T inferred as Integer
        
        // Multiple parameters - both inferred
        InferenceExample ex3 = new InferenceExample("Name", 25);
        // K inferred as String, V as Integer
        
        // Bounded type inference
        InferenceExample ex4 = new InferenceExample(3.14);
        // T inferred as Double (extends Number)
        
        // InferenceExample ex5 = new InferenceExample("Not a number");
        // ERROR: String does not extend Number
        
        // Explicit type arguments (rarely needed)
        InferenceExample ex6 = new <String>InferenceExample("Explicit");
        
        // Diamond operator with generic constructors
        Box<String> box1 = new Box<>("Content");
        // Diamond operator infers Box<String>
        
        // Without diamond operator (redundant)
        Box<String> box2 = new Box<String>("Content");
        
        // Complex inference scenario
        List<String> names = Arrays.asList("A", "B");
        Container<List<String>> container = new Container<>(names);
        // Nested generic type inference
    }
}

// Generic class example
public class Box<T> {
    private T content;
    
    public Box(T content) {
        this.content = content;
    }
}

public class Container<T> {
    private T item;
    
    public Container(T item) {
        this.item = item;
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-700">
                  <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Inference Rules for Constructors</h5>
                  
                  <div className="space-y-4">
                    {[
                      {
                        rule: "Argument Type Inference",
                        desc: "Types inferred from constructor arguments",
                        example: "new Box(\"text\") → Box<String>"
                      },
                      {
                        rule: "Assignment Context",
                        desc: "Variable type provides inference hints",
                        example: "Box<String> box = new Box<>(...) → Box<String>"
                      },
                      {
                        rule: "Diamond Operator <>",
                        desc: "Infers type from context, avoids redundancy",
                        example: "new Box<>() instead of new Box<String>()"
                      },
                      {
                        rule: "Chained Constructor Calls",
                        desc: "Inference flows through constructor chain",
                        example: "new Container(new Box<>(\"text\"))"
                      },
                      {
                        rule: "Explicit Type Arguments",
                        desc: "Override inference when needed",
                        example: "new <String>Box(\"text\")"
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="font-semibold text-blue-700 dark:text-blue-400">
                          {item.rule}
                        </div>
                        <div className="text-sm text-blue-800/70 dark:text-blue-400/70 mt-1">
                          {item.desc}
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                          Example: <code>{item.example}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-red-100 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-700">
                  <h5 className="font-bold text-red-800 dark:text-red-300 mb-3">Common Inference Problems</h5>
                  
                  <div className="space-y-3">
                    {[
                      "Ambiguous null: new Box(null) - which type?",
                      "Raw types break inference: new Box() instead of new Box<>()",
                      "Nested generics can confuse inference",
                      "Chained method calls may lose type information",
                      "Varargs with generics can cause warnings"
                    ].map((problem, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-5 h-5 bg-red-200 dark:bg-red-800 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-red-600 dark:text-red-300 text-xs">!</span>
                        </div>
                        <span className="text-red-800 dark:text-red-300 text-sm">{problem}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-100 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-700">
                  <h5 className="font-bold text-green-800 dark:text-green-300 mb-3">Best Practices</h5>
                  
                  <div className="space-y-3">
                    {[
                      "Always use diamond operator <> with new",
                      "Avoid raw types in new expressions",
                      "Use explicit types only when inference fails",
                      "Test constructor inference with different argument types",
                      "Consider static factory methods for complex construction"
                    ].map((practice, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-5 h-5 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-green-600 dark:text-green-300 text-xs">✓</span>
                        </div>
                        <span className="text-green-800 dark:text-green-300 text-sm">{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations and Considerations */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.3s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 dark:text-yellow-300">⚠️</span>
              </span>
              Limitations & Important Considerations
            </h3>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 p-6 rounded-xl border border-yellow-300 dark:border-yellow-800">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Key Limitations of Generic Constructors</h4>
                
                <div className="grid md:grid-cols-1 gap-8">
                  <div>
                    <h5 className="font-bold text-yellow-700 dark:text-yellow-300 mb-3">Design Limitations</h5>
                    
                    <div className="space-y-4">
                      {[
                        {
                          limitation: "Type Erasure in Fields",
                          impact: "Constructor type params can't be stored in fields",
                          solution: "Convert to class type params or use Object"
                        },
                        {
                          limitation: "No Static Constructors",
                          impact: "Can't have static generic constructors",
                          solution: "Use static factory methods instead"
                        },
                        {
                          limitation: "Confusing Type Shadows",
                          impact: "Constructor T can shadow class T",
                          solution: "Use different type parameter names"
                        },
                        {
                          limitation: "Limited Usefulness",
                          impact: "Often better to use generic classes",
                          solution: "Evaluate if generic class is better fit"
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                          <div className="font-semibold text-yellow-800 dark:text-yellow-300">{item.limitation}</div>
                          <div className="text-sm text-yellow-800/70 dark:text-yellow-400/70 mt-1">
                            <strong>Impact:</strong> {item.impact}
                          </div>
                          <div className="text-sm text-green-700 dark:text-green-400 mt-1">
                            <strong>Solution:</strong> {item.solution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-yellow-700 dark:text-yellow-300 mb-3">Practical Considerations</h5>
                    
                    <JavaCodeBlock
                      code={`// Common pitfalls with generic constructors

// 1. Type erasure prevents storing constructor type
public class ProblematicContainer<T> {
    private T value;  // Class T
    
    // Constructor U cannot be stored directly
    public <U> ProblematicContainer(U initialValue) {
        // this.value = initialValue; // ERROR: U cannot be converted to T
        
        // Workaround: unsafe cast
        this.value = (T) initialValue;  // Unsafe!
    }
}

// 2. Better approach: Convert or use different design
public class BetterContainer<T> {
    private T value;
    
    // Constructor with conversion
    public <U> BetterContainer(U initialValue, Function<U, T> converter) {
        this.value = converter.apply(initialValue);  // Type-safe
    }
    
    // Alternative: Use class T in constructor
    public BetterContainer(T value) {
        this.value = value;  // Simple and type-safe
    }
}

// 3. When to use generic constructors vs generic classes
public class DecisionExample {
    // Use generic constructor when:
    // - Need flexibility during construction only
    // - Conversion from different type needed
    // - Temporary type variance during initialization
    
    // Use generic class when:
    // - Type consistency needed throughout object lifetime
    // - Multiple methods use the same type parameter
    // - Type needs to be part of object's identity
}

// 4. Static factory alternative
public class ContainerFactory {
    // Often better than generic constructor
    public static <T> Container<T> create(T value) {
        return new Container<>(value);
    }
    
    public static <U, T> Container<T> createFrom(
            U source, Function<U, T> converter) {
        return new Container<>(converter.apply(source));
    }
}`}
                      language="java"
                      showLineNumbers={true}
                    />
                  </div>
                </div>
              </div>
              
              {/* When to Use Generic Constructors */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-300 dark:border-green-800">
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">When to Use Generic Constructors</h4>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h5 className="font-bold text-green-700 dark:text-green-300 mb-3">✅ Good Use Cases</h5>
                    
                    <div className="space-y-3">
                      {[
                        "Factory methods that create typed instances",
                        "Adaptors converting between types",
                        "Builders with flexible type parameters",
                        "Wrapper classes with type conversion",
                        "Initialization with validation/conversion",
                        "When type variance is needed only during construction"
                      ].map((useCase, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-6 h-6 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-green-600 dark:text-green-300">✓</span>
                          </div>
                          <span className="text-green-800 dark:text-green-300">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-red-700 dark:text-red-300 mb-3">❌ Poor Use Cases</h5>
                    
                    <div className="space-y-3">
                      {[
                        "When type consistency is needed after construction",
                        "When constructor T shadows class T confusingly",
                        "When static factory methods would be clearer",
                        "When type erasure causes unsafe casts",
                        "When simple generic class would suffice",
                        "When beginners might misunderstand the design"
                      ].map((badCase, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-6 h-6 bg-red-200 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-red-600 dark:text-red-300">✗</span>
                          </div>
                          <span className="text-red-800 dark:text-red-300">{badCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <h6 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Decision Flow</h6>
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    Ask: "Does the object need to remember the constructor's type parameter after construction?" 
                    If yes, use generic class. If no, generic constructor might be appropriate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.5s_both] mb-16">
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
                <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">The Constructor's Dilemma:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When I first encountered generic constructors in 2005 while working on the Shyamnagar Hospital system, 
                  I was excited but soon realized their limitations. Generic constructors are like 
                  <strong> "one-night stands" for types</strong> - they provide flexibility during creation but 
                  don't commit to remembering the type afterward.
                </p>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                    <h5 className="font-bold text-rose-700 dark:text-rose-300 mb-2">💡 Classroom Story</h5>
                    <p className="text-sm">
                      Tuhina from Naihati College once created a <code>DataParser&lt;U&gt;</code> constructor 
                      that could parse any type, but then couldn't store the parsed data type. 
                      She learned: <strong>construction-time flexibility ≠ runtime type safety</strong>.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300 mb-2">🎯 Professional Advice</h5>
                    <p className="text-sm">
                      In 95% of cases, you want a generic class, not a generic constructor. 
                      Generic constructors are for the remaining 5% where you need construction-time 
                      type variance. When in doubt, use static factory methods - they're clearer.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <h5 className="font-bold text-green-700 dark:text-green-300 mb-2">🏆 Real-World Example</h5>
                  <p className="text-sm text-green-800 dark:text-green-400">
                    At Ichapur Bank, we used generic constructors in the <code>TransactionBuilder</code> 
                    to accept different input types (String, JSON, XML) and convert them to internal 
                    <code> Transaction</code> objects. The constructor's type parameter was <code>&lt;U&gt;</code>, 
                    but the class stored <code>Transaction</code> - perfect use case!
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-amber-700 dark:text-amber-400 mt-4">
                <div>
                  <span className="font-semibold">Experience:</span> Used generic constructors in 3 major enterprise systems
                </div>
                <div className="text-xs">
                  Contact: sukantahui@codernaccotax.co.in • 7003756860
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.7s_both] mb-16">
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
                  <strong>Design Challenge:</strong> Swadeep is building a data import system for Barrackpore University. 
                  He needs to create <code>StudentRecord</code> objects from:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <div className="font-bold text-purple-700 dark:text-purple-300">CSV Strings</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">"John,22,CS" → StudentRecord</div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="font-bold text-green-700 dark:text-green-300">JSON Objects</div>
                    <div className="text-sm text-green-600 dark:text-green-400">{`{"name":"John","age":22}`} → StudentRecord</div>
                  </div>
                  <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <div className="font-bold text-amber-700 dark:text-amber-300">Database Rows</div>
                    <div className="text-sm text-amber-600 dark:text-amber-400">ResultSet → StudentRecord</div>
                  </div>
                </div>
                
                <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300 mb-2">
                    <strong>Question:</strong> Should he use a generic constructor, generic class, or static factory method?
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    <strong>Design Exercise:</strong> Create a <code>StudentRecordImporter</code> class with 
                    three different construction approaches. Which is cleanest? Which provides best type safety?
                  </p>
                </div>
                
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h5 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">🧪 Type Inference Test</h5>
                  <p className="text-sm text-emerald-800 dark:text-emerald-400">
                    Create a class with both a generic constructor and a generic class parameter. 
                    Try creating instances with and without explicit type arguments. 
                    Notice when the compiler gets confused by type shadowing.
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-1 gap-4 mt-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">🔍 Code Review Practice</h5>
                  <p className="text-sm">
                    Find a class with a generic constructor in an open-source project. 
                    Analyze: Does it store the constructor's type parameter? 
                    If not, could it be replaced with a non-generic constructor?
                  </p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                  <h5 className="font-bold text-teal-700 dark:text-teal-300 mb-2">📈 Refactoring Exercise</h5>
                  <p className="text-sm">
                    Take a class with Object parameters and casting in constructor. 
                    Refactor it to use a generic constructor. Then refactor it to a generic class. 
                    Compare the three designs for clarity and type safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.9s_both]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Generic Constructors: Key Takeaways</h3>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 text-rose-600 dark:text-rose-400">What You've Learned</h4>
                {[
                  "Generic constructors declare type parameters before constructor name",
                  "Constructor type parameters are independent of class type parameters",
                  "Can be used in both generic and non-generic classes",
                  "Type inference works with new expressions and diamond operator",
                  "Constructor type parameters have constructor-level scope only",
                  "Useful for flexible initialization and factory patterns",
                  "Cannot store constructor type parameters in fields (type erasure)",
                  "Often better to use static factory methods for clarity"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start mb-3 p-3 bg-rose-50 dark:bg-rose-900/10 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-rose-600 dark:text-rose-300">{index + 1}</span>
                    </div>
                    <span className="text-rose-800 dark:text-rose-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Best Practices</h4>
                {[
                  "Use different type parameter names from class parameters",
                  "Prefer static factory methods over generic constructors",
                  "Use generic constructors only for construction-time flexibility",
                  "Always use diamond operator <> with new expressions",
                  "Document when constructor type differs from class type",
                  "Consider if a generic class would be better suited",
                  "Test type inference with various argument types",
                  "Avoid unsafe casts from constructor type to class type",
                  "Use @SuppressWarningsunchecked judiciously",
                  "Consider builder pattern for complex construction"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start mb-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300">✓</span>
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
                    Next, we'll explore <strong>"Type Parameters (T, E, K, V, N)"</strong> - 
                    understanding naming conventions and choosing appropriate type parameter names.
                  </p>
                </div>
                <div className="px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 rounded-lg font-semibold">
                  Topic 7/24
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-2">© 2024 Java Generics Masterclass • Flexible Object Construction with Generic Constructors</p>
        <p className="text-sm">Examples from: Barrackpore University, Naihati College, Shyamnagar Hospital, Ichapur Bank</p>
      </footer>
    </div>
  );
};

export default Topic6;