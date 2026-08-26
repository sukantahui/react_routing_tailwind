import React from 'react';
import clsx from 'clsx';
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

const Topic5 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 dark:from-gray-900 dark:to-violet-950/20 text-gray-800 dark:text-gray-200 transition-colors duration-500">
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
          
          @keyframes methodFlow {
            0% {
              stroke-dashoffset: 100;
              opacity: 0.5;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
          
          @keyframes typeParameterPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
            }
            50% {
              transform: scale(1.1);
              box-shadow: 0 0 0 5px rgba(139, 92, 246, 0);
            }
          }
          
          @keyframes inferenceGlow {
            0%, 100% {
              filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.3));
            }
            50% {
              filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.6));
            }
          }
          
          @keyframes utilitySpin {
            0% {
              transform: rotate(0deg) scale(1);
            }
            100% {
              transform: rotate(360deg) scale(1);
            }
          }
        `}
            </style>

            {/* Header Section */}
            <header className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-800 dark:via-purple-800 dark:to-fuchsia-800 text-white pt-12 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
                        <div className="inline-flex items-center px-4 py-2 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                            Java Generics Series • Topic 6
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Generic Methods
                        </h1>

                        <p className="text-xl text-violet-100 dark:text-violet-200 max-w-3xl leading-relaxed">
                            Methods with their own Type Parameters - Flexible, reusable operations independent of class types
                        </p>
                    </div>

                    {/* Animated Generic Method Visualization */}
                    <div className="mt-10 motion-safe:animate-[fadeSlideUp_1s_ease-out_0.3s_both]">
                        <div className="max-w-5xl mx-auto">
                            <svg
                                viewBox="0 0 900 240"
                                className="w-full h-auto"
                                aria-label="Visualization of generic method concept and type inference"
                            >
                                {/* Method Signature Flow */}
                                <g>
                                    {/* Method Start */}
                                    <rect
                                        x="50" y="50"
                                        width="120" height="60"
                                        rx="8"
                                        fill="#8B5CF6"
                                        className="hover:fill-violet-400 transition-colors duration-300"
                                    />
                                    <text x="110" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                        Method
                                    </text>
                                    <text x="110" y="90" textAnchor="middle" fill="#DDD6FE" fontSize="10">
                                        Declaration
                                    </text>

                                    {/* Type Parameter */}
                                    <g className="motion-safe:animate-[typeParameterPulse_2s_ease-in-out_infinite]">
                                        <rect
                                            x="190" y="50"
                                            width="80" height="60"
                                            rx="8"
                                            fill="#7C3AED"
                                        />
                                        <text x="230" y="75" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                                            &lt;T&gt;
                                        </text>
                                        <text x="230" y="90" textAnchor="middle" fill="#C4B5FD" fontSize="8">
                                            Type Param
                                        </text>
                                    </g>

                                    {/* Return Type */}
                                    <rect
                                        x="290" y="50"
                                        width="100" height="60"
                                        rx="8"
                                        fill="#10B981"
                                        className="hover:fill-emerald-400 transition-colors duration-300"
                                    />
                                    <text x="340" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                        T
                                    </text>
                                    <text x="340" y="90" textAnchor="middle" fill="#A7F3D0" fontSize="10">
                                        Return Type
                                    </text>

                                    {/* Method Name */}
                                    <rect
                                        x="410" y="50"
                                        width="120" height="60"
                                        rx="8"
                                        fill="#3B82F6"
                                        className="hover:fill-blue-400 transition-colors duration-300"
                                    />
                                    <text x="470" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                        utility
                                    </text>
                                    <text x="470" y="90" textAnchor="middle" fill="#BFDBFE" fontSize="10">
                                        Method Name
                                    </text>

                                    {/* Parameters */}
                                    <rect
                                        x="550" y="50"
                                        width="150" height="60"
                                        rx="8"
                                        fill="#F59E0B"
                                        className="hover:fill-amber-400 transition-colors duration-300"
                                    />
                                    <text x="625" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                        (T param)
                                    </text>
                                    <text x="625" y="90" textAnchor="middle" fill="#FDE68A" fontSize="10">
                                        Parameters
                                    </text>

                                    {/* Method Body */}
                                    <rect
                                        x="720" y="50"
                                        width="130" height="60"
                                        rx="8"
                                        fill="#EF4444"
                                        className="hover:fill-red-400 transition-colors duration-300"
                                    />
                                    <text x="785" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                        {` { ... } `}
                                    </text>
                                    <text x="785" y="90" textAnchor="middle" fill="#FCA5A5" fontSize="10">
                                        Implementation
                                    </text>
                                </g>

                                {/* Flow Arrows */}
                                <g className="motion-safe:animate-[methodFlow_3s_ease-in-out_infinite]">
                                    <path d="M170,80 L190,80" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow1)" />
                                    <path d="M270,80 L290,80" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow1)" />
                                    <path d="M390,80 L410,80" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow1)" />
                                    <path d="M530,80 L550,80" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow1)" />
                                    <path d="M700,80 L720,80" fill="none" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow1)" />
                                </g>

                                {/* Complete Signature */}
                                <text x="450" y="135" textAnchor="middle" fill="white" fontSize="16" fontFamily="monospace">
                                    &lt;T&gt; T utility(T param)
                                </text>

                                {/* Type Inference Flow */}
                                <g>
                                    {/* Input */}
                                    <g className="hover:scale-110 transition-transform duration-300">
                                        <rect x="100" y="160" width="80" height="40" rx="5" fill="#3B82F6" />
                                        <text x="140" y="185" textAnchor="middle" fill="white" fontSize="12">"Hello"</text>
                                        <text x="140" y="200" textAnchor="middle" fill="#BFDBFE" fontSize="8">String</text>
                                    </g>

                                    {/* Inference Arrow */}
                                    <g className="motion-safe:animate-[inferenceGlow_2s_ease-in-out_infinite]">
                                        <path d="M190,180 L240,180" fill="none" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrow)" />
                                        <text x="215" y="175" textAnchor="middle" fill="#10B981" fontSize="10">Inference</text>
                                    </g>

                                    {/* Method Call */}
                                    <rect x="260" y="160" width="180" height="40" rx="5" fill="#8B5CF6" />
                                    <text x="350" y="185" textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace">
                                        utility("Hello")
                                    </text>

                                    {/* Output */}
                                    <g className="hover:scale-110 transition-transform duration-300">
                                        <rect x="460" y="160" width="80" height="40" rx="5" fill="#3B82F6" />
                                        <text x="500" y="185" textAnchor="middle" fill="white" fontSize="12">"Hello"</text>
                                        <text x="500" y="200" textAnchor="middle" fill="#BFDBFE" fontSize="8">String</text>
                                    </g>

                                    {/* Another Example */}
                                    <g className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                                        <rect x="100" y="210" width="80" height="40" rx="5" fill="#EF4444" />
                                        <text x="140" y="235" textAnchor="middle" fill="white" fontSize="12">42</text>
                                        <text x="140" y="250" textAnchor="middle" fill="#FCA5A5" fontSize="8">Integer</text>

                                        <path d="M190,230 L240,230" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="5,5" />

                                        <rect x="260" y="210" width="180" height="40" rx="5" fill="#8B5CF6" />
                                        <text x="350" y="235" textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace">
                                            utility(42)
                                        </text>

                                        <rect x="460" y="210" width="80" height="40" rx="5" fill="#EF4444" />
                                        <text x="500" y="235" textAnchor="middle" fill="white" fontSize="12">42</text>
                                        <text x="500" y="250" textAnchor="middle" fill="#FCA5A5" fontSize="8">Integer</text>
                                    </g>
                                </g>

                                {/* Utility Icon */}
                                <g className="motion-safe:animate-[utilitySpin_4s_linear_infinite] opacity-50">
                                    <circle cx="750" cy="180" r="30" fill="none" stroke="white" strokeWidth="2" />
                                    <path d="M740,165 L760,165 L760,185 L740,185 Z" fill="white" />
                                    <path d="M735,195 L765,195" stroke="white" strokeWidth="3" />
                                    <circle cx="750" cy="180" r="5" fill="#8B5CF6" />
                                </g>

                                <defs>
                                    <marker id="arrow1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6" />
                                    </marker>
                                    <marker id="greenArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Introduction to Generic Methods */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.5s_both] mb-16">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-xl flex items-center justify-center mr-4">
                                <span className="text-2xl font-bold text-violet-600 dark:text-violet-300">⚙️</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">What Are Generic Methods?</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed">
                                    <strong>Generic methods</strong> are methods that introduce their own type parameters.
                                    They can be declared in generic classes, non-generic classes, or even in interfaces.
                                    Unlike generic classes where type parameters are specified at class level,
                                    generic methods allow type parameters at the method level.
                                </p>

                                <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 pl-6 py-4 my-6 rounded-r-lg">
                                    <p className="text-violet-800 dark:text-violet-200 italic">
                                        <strong>Analogy:</strong> Imagine a Swiss Army knife (non-generic class) with different tools.
                                        Each tool (generic method) can work with different materials: scissors cut paper (String),
                                        screwdriver turns screws (Integer), knife slices fruits (Student).
                                        The knife itself doesn't change, but each tool adapts to its task!
                                    </p>
                                </div>

                                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">The Core Concept</h3>

                                <div className="grid md:grid-cols-2 gap-8 my-8">
                                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-300">
                                        <h4 className="text-xl font-bold text-violet-700 dark:text-violet-300 mb-3">Key Characteristics</h4>

                                        <ul className="space-y-3 text-violet-800 dark:text-violet-300">
                                            <li className="flex items-start">
                                                <span className="text-violet-500 mr-2">•</span>
                                                <span>Have their own type parameters (declared before return type)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-violet-500 mr-2">•</span>
                                                <span>Can be static or non-static</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-violet-500 mr-2">•</span>
                                                <span>Type inference often eliminates explicit type arguments</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-violet-500 mr-2">•</span>
                                                <span>Can be used in both generic and non-generic classes</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-violet-500 mr-2">•</span>
                                                <span>Provide type-safe operations without class-level generics</span>
                                            </li>
                                        </ul>

                                        <div className="mt-4 p-4 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                                            <p className="text-violet-800 dark:text-violet-300 text-sm">
                                                <strong>Syntax:</strong> <code>&lt;T&gt; returnType methodName(T parameter)</code>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300">
                                        <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">Basic Example</h4>

                                        <JavaCodeBlock
                                            code={`// Simple generic method in a non-generic class
public class UtilityClass {
    
    // Generic method declaration
    // <T> declares the type parameter
    // T is the return type
    // T item is the parameter
    public static <T> T identity(T item) {
        return item; // Returns the same type as input
    }
    
    // Generic method with multiple parameters
    public static <T> boolean areEqual(T first, T second) {
        if (first == null) {
            return second == null;
        }
        return first.equals(second);
    }
    
    // Generic method returning different type
    public static <T, R> R transform(T item, Function<T, R> transformer) {
        return transformer.apply(item);
    }
}

// Usage with type inference
public class Main {
    public static void main(String[] args) {
        // Type inferred from argument - String
        String result1 = UtilityClass.identity("Hello Barrackpore");
        
        // Type inferred from argument - Integer
        Integer result2 = UtilityClass.identity(42);
        
        // Type inferred - Boolean
        boolean equal = UtilityClass.areEqual("Swadeep", "Tuhina");
        
        // Explicit type specification (rarely needed)
        String explicit = UtilityClass.<String>identity("Explicit");
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

                {/* Syntax and Structure */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.7s_both] mb-16">
                    <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/10 dark:to-fuchsia-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-purple-300 dark:border-purple-800">
                        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
                            <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-purple-600 dark:text-purple-300">📖</span>
                            </span>
                            Syntax Deep Dive: Anatomy of Generic Methods
                        </h3>

                        <div className="space-y-8">
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Method Declaration Breakdown</h4>

                                        <div className="space-y-6">
                                            {[
                                                {
                                                    part: "Type Parameter Declaration",
                                                    syntax: "<T>",
                                                    position: "Before return type",
                                                    purpose: "Declares type parameter(s) for the method"
                                                },
                                                {
                                                    part: "Return Type",
                                                    syntax: "T",
                                                    position: "After type parameters",
                                                    purpose: "Can use declared type parameters"
                                                },
                                                {
                                                    part: "Method Name",
                                                    syntax: "methodName",
                                                    position: "After return type",
                                                    purpose: "Regular method naming rules apply"
                                                },
                                                {
                                                    part: "Parameters",
                                                    syntax: "(T param)",
                                                    position: "After method name",
                                                    purpose: "Can use declared type parameters"
                                                },
                                                {
                                                    part: "Type Bounds",
                                                    syntax: "<T extends Comparable<T>>",
                                                    position: "In type parameter declaration",
                                                    purpose: "Restricts allowed types"
                                                }
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-900/30 dark:to-fuchsia-900/30 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-bold text-purple-700 dark:text-purple-300">{item.part}</div>
                                                            <code className="text-sm bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded mt-1">
                                                                {item.syntax}
                                                            </code>
                                                        </div>
                                                        <div className="text-xs text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded">
                                                            {item.position}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-purple-800 dark:text-purple-400">{item.purpose}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Complete Examples</h4>

                                        <JavaCodeBlock
                                            code={`// Example 1: Single type parameter
public <T> void processItem(T item) {
    System.out.println("Processing: " + item.toString());
}

// Example 2: Multiple type parameters
public <K, V> Map<K, V> createMap(K key, V value) {
    Map<K, V> map = new HashMap<>();
    map.put(key, value);
    return map;
}

// Example 3: Bounded type parameter
public <T extends Number> double square(T number) {
    return number.doubleValue() * number.doubleValue();
}

// Example 4: Generic method in generic class
public class Container<T> {
    private T value;
    
    // Class-level T is different from method-level U
    public <U> Container<U> transform(Function<T, U> function) {
        U newValue = function.apply(value);
        return new Container<>(newValue);
    }
}

// Example 5: Static generic method
public static <T> List<T> createList(T... items) {
    List<T> list = new ArrayList<>();
    for (T item : items) {
        list.add(item);
    }
    return list;
}

// Example 6: Returning wildcard types (advanced)
public static <T> List<? extends T> filterList(
    List<T> list, Predicate<T> predicate) {
    return list.stream()
               .filter(predicate)
               .collect(Collectors.toList());
}`}
                                            language="java"
                                            showLineNumbers={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Type Parameter Scope */}
                            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-300 dark:border-blue-800">
                                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Type Parameter Scope & Visibility</h4>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Method Scope</div>
                                        <p className="text-sm text-blue-800/70 dark:text-blue-400/70">
                                            Type parameters are visible only within the method
                                        </p>
                                        <code className="text-xs mt-2 block">public &lt;T&gt; void method()</code>
                                    </div>

                                    <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">Different from Class</div>
                                        <p className="text-sm text-purple-800/70 dark:text-purple-400/70">
                                            Method type parameters hide class type parameters
                                        </p>
                                        <code className="text-xs mt-2 block">
                                            class C&lt;T&gt; &#123; &lt;U&gt; void m() &#125;
                                        </code>
                                    </div>

                                    <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Static Methods</div>
                                        <p className="text-sm text-green-800/70 dark:text-green-400/70">
                                            Cannot use class type parameters, must declare their own
                                        </p>
                                        <code className="text-xs mt-2 block">static &lt;T&gt; void method()</code>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <JavaCodeBlock
                                        code={`// Scope demonstration
public class ScopeExample<T> {  // Class-level T
    private T classValue;
    
    // Method-level T hides class-level T
    // This is confusing - avoid same names!
    public <T> void confusingMethod(T methodValue) {
        // methodValue is method-level T
        // this.classValue is class-level T
        // They can be DIFFERENT types!
    }
    
    // Better: Use different names
    public <U> void clearMethod(U methodValue) {
        // U is method type parameter
        // T is class type parameter
        // No confusion!
    }
    
    // Static method: MUST declare its own type parameters
    public static <V> V staticMethod(V value) {
        return value;
        // Cannot use class T here!
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

                {/* Type Inference in Generic Methods */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.9s_both] mb-16">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
                            <span className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-green-600 dark:text-green-300">🔮</span>
                            </span>
                            Type Inference: The Compiler's Magic
                        </h3>

                        <div className="space-y-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-800">
                                    <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">How Type Inference Works</h4>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <h5 className="font-bold text-green-800 dark:text-green-300 mb-2">The Inference Process</h5>
                                            <ol className="text-sm text-green-800 dark:text-green-400 space-y-2 list-decimal pl-5">
                                                <li>Compiler examines method arguments</li>
                                                <li>Infers the most specific type that works</li>
                                                <li>Validates type constraints</li>
                                                <li>Substitutes inferred type in method body</li>
                                                <li>Checks return type compatibility</li>
                                            </ol>
                                        </div>

                                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <h5 className="font-bold text-green-800 dark:text-green-300 mb-2">Inference Rules</h5>
                                            <ul className="text-sm text-green-800 dark:text-green-400 space-y-2">
                                                <li>• Types inferred from method arguments</li>
                                                <li>• Return type can help inference</li>
                                                <li>• Context (assignment) provides hints</li>
                                                <li>• Most specific common type chosen</li>
                                                <li>• Explicit type arguments override inference</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                                        <h5 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">💡 Pro Tip</h5>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-400">
                                            Let the compiler infer types whenever possible.
                                            Explicit type arguments (<code>ClassName.&lt;String&gt;method()</code>)
                                            are rarely needed and make code harder to read.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Inference Examples</h4>

                                    <JavaCodeBlock
                                        code={`// Naihati College Utility Class
public class InferenceExamples {
    
    // Simple generic method
    public static <T> T getFirst(List<T> list) {
        return list.isEmpty() ? null : list.get(0);
    }
    
    // Multiple type parameters
    public static <K, V> V getValue(Map<K, V> map, K key) {
        return map.get(key);
    }
    
    // Bounded type inference
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }
    
    // Usage examples showing inference
    public static void main(String[] args) {
        // Example 1: List inference
        List<String> names = Arrays.asList("Swadeep", "Tuhina");
        String first = getFirst(names); // T inferred as String
        
        // Example 2: Map inference
        Map<Integer, String> studentMap = new HashMap<>();
        studentMap.put(101, "Abhronila");
        String student = getValue(studentMap, 101); // K=Integer, V=String
        
        // Example 3: Comparable inference
        Integer larger = max(10, 20);        // T inferred as Integer
        String longer = max("A", "B");        // T inferred as String
        
        // Example 4: Chain inference
        List<Integer> numbers = getFirst(
            Arrays.asList(
                Arrays.asList(1, 2),
                Arrays.asList(3, 4)
            )
        ); // T inferred as List<Integer>
        
        // Example 5: Explicit type (rarely needed)
        String explicit = InferenceExamples.<String>getFirst(names);
    }
    
    // Complex inference scenario
    public static <T> List<T> mergeLists(List<T> list1, List<T> list2) {
        List<T> merged = new ArrayList<>(list1);
        merged.addAll(list2);
        return merged;
    }
    
    // What happens here?
    List<String> strings = Arrays.asList("A", "B");
    List<Integer> numbers = Arrays.asList(1, 2);
    // List<Object> merged = mergeLists(strings, numbers); // ERROR!
    // Inference fails - no common type between String and Integer
}`}
                                        language="java"
                                        showLineNumbers={true}
                                    />
                                </div>
                            </div>

                            {/* Inference Failure Cases */}
                            <div className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20 p-6 rounded-xl border border-red-300 dark:border-red-800">
                                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">When Inference Fails</h4>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-bold text-red-700 dark:text-red-300 mb-3">Common Inference Problems</h5>

                                        <div className="space-y-4">
                                            {[
                                                {
                                                    problem: "Ambiguous Types",
                                                    example: "utility(null)",
                                                    solution: "Add explicit type: utility.<String>method(null)"
                                                },
                                                {
                                                    problem: "No Common Type",
                                                    example: "merge(List<String>, List<Integer>)",
                                                    solution: "Use wildcards or change design"
                                                },
                                                {
                                                    problem: "Chained Methods",
                                                    example: "transform(filter(list))",
                                                    solution: "Break into separate statements"
                                                },
                                                {
                                                    problem: "Varargs Confusion",
                                                    example: "Arrays.asList(1, 2.0)",
                                                    solution: "Use explicit type or separate arrays"
                                                }
                                            ].map((item, idx) => (
                                                <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                                                    <div className="font-semibold text-red-800 dark:text-red-300">{item.problem}</div>
                                                    <code className="text-xs bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded block mt-1 mb-1">
                                                        {item.example}
                                                    </code>
                                                    <div className="text-sm text-green-700 dark:text-green-400">
                                                        <strong>Fix:</strong> {item.solution}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-bold text-red-700 dark:text-red-300 mb-3">Debugging Inference Issues</h5>

                                        <JavaCodeBlock
                                            code={`// Common inference debugging scenarios
public class InferenceDebugging {
    
    // Problem: Ambiguous null
    public static <T> void process(T item) {
        System.out.println(item);
    }
    
    // Usage causing problems:
    public static void problematicCalls() {
        // Which T? Compiler can't decide!
        // process(null); // ERROR: reference to process is ambiguous
        
        // Solution 1: Explicit type
        InferenceDebugging.<String>process(null);
        
        // Solution 2: Cast null
        process((String) null);
        
        // Solution 3: Pass to variable first
        String text = null;
        process(text);
    }
    
    // Problem: Chained generic methods
    public static <T> List<T> filter(List<T> list) {
        return list;
    }
    
    public static <T> List<T> transform(List<T> list) {
        return list;
    }
    
    public static void chainedProblem() {
        List<String> names = Arrays.asList("A", "B");
        
        // Sometimes fails:
        // List<String> result = transform(filter(names));
        
        // Better: Step by step
        List<String> filtered = filter(names);
        List<String> transformed = transform(filtered);
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

                {/* Practical Generic Method Examples */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.1s_both] mb-16">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-amber-300 dark:border-amber-800">
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Practical Generic Method Examples</h3>

                        <div className="space-y-8">
                            {/* Example 1: Collection Utilities */}
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-blue-600 dark:text-blue-300">📚</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">1. Collection Utility Methods</h4>
                                        <p className="text-blue-600 dark:text-blue-400">Barrackpore University Library System</p>
                                    </div>
                                </div>

                                <JavaCodeBlock
                                    code={`// Generic utility methods for collections
public class CollectionUtils {
    
    // Find maximum element in collection
    public static <T extends Comparable<T>> T findMax(Collection<T> collection) {
        if (collection.isEmpty()) {
            throw new IllegalArgumentException("Collection is empty");
        }
        
        T max = null;
        for (T item : collection) {
            if (max == null || item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }
    
    // Convert collection to array (type-safe)
    public static <T> T[] toArray(Collection<T> collection, Class<T> type) {
        @SuppressWarnings("unchecked")
        T[] array = (T[]) Array.newInstance(type, collection.size());
        return collection.toArray(array);
    }
    
    // Merge multiple collections
    @SafeVarargs
    public static <T> List<T> mergeCollections(Collection<T>... collections) {
        List<T> merged = new ArrayList<>();
        for (Collection<T> collection : collections) {
            merged.addAll(collection);
        }
        return merged;
    }
    
    // Filter collection based on predicate
    public static <T> List<T> filter(Collection<T> collection, Predicate<T> predicate) {
        List<T> filtered = new ArrayList<>();
        for (T item : collection) {
            if (predicate.test(item)) {
                filtered.add(item);
            }
        }
        return filtered;
    }
    
    // Transform collection elements
    public static <T, R> List<R> transform(
        Collection<T> collection, 
        Function<T, R> transformer) {
        List<R> transformed = new ArrayList<>();
        for (T item : collection) {
            transformed.add(transformer.apply(item));
        }
        return transformed;
    }
    
    // Usage in Shyamnagar College system
    public class StudentSystem {
        public void processGrades() {
            List<Integer> grades = Arrays.asList(85, 92, 78, 95, 88);
            
            // Type inference: T is Integer
            Integer highestGrade = CollectionUtils.findMax(grades);
            
            // Filter students with grade > 90
            List<Integer> excellentGrades = CollectionUtils.filter(
                grades, grade -> grade > 90);
            
            // Transform grades to letter grades
            List<String> letterGrades = CollectionUtils.transform(
                grades, grade -> {
                    if (grade >= 90) return "A";
                    if (grade >= 80) return "B";
                    return "C";
                });
        }
    }
}`}
                                    language="java"
                                    showLineNumbers={true}
                                />
                            </div>

                            {/* Example 2: Data Validation */}
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-green-600 dark:text-green-300">✅</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">2. Generic Validation Framework</h4>
                                        <p className="text-green-600 dark:text-green-400">Ichapur Hospital Patient System</p>
                                    </div>
                                </div>

                                <JavaCodeBlock
                                    code={`// Generic validation methods
public class ValidationUtils {
    
    // Validate not null
    public static <T> T requireNonNull(T obj, String message) {
        if (obj == null) {
            throw new IllegalArgumentException(message);
        }
        return obj;
    }
    
    // Validate with custom predicate
    public static <T> T validate(T obj, Predicate<T> validator, String message) {
        if (!validator.test(obj)) {
            throw new IllegalArgumentException(message);
        }
        return obj;
    }
    
    // Validate collection elements
    public static <T> Collection<T> validateAll(
        Collection<T> collection, 
        Predicate<T> validator,
        String message) {
        for (T item : collection) {
            if (!validator.test(item)) {
                throw new IllegalArgumentException(message + ": " + item);
            }
        }
        return collection;
    }
    
    // Chain validations
    public static <T> T chainValidate(T obj, Validation<T>... validations) {
        for (Validation<T> validation : validations) {
            validation.validate(obj);
        }
        return obj;
    }
    
    // Generic validation interface
    public interface Validation<T> {
        void validate(T obj) throws IllegalArgumentException;
    }
    
    // Usage in hospital system
    public class PatientSystem {
        public void admitPatient(Patient patient) {
            // Validate patient using generic methods
            ValidationUtils.requireNonNull(patient, "Patient cannot be null");
            
            ValidationUtils.validate(patient, 
                p -> p.getAge() >= 0 && p.getAge() <= 150,
                "Invalid age");
                
            ValidationUtils.validate(patient,
                p -> p.getName() != null && !p.getName().trim().isEmpty(),
                "Patient name required");
            
            // Validate medications list
            List<Medication> medications = patient.getMedications();
            ValidationUtils.validateAll(medications,
                med -> med.getDosage() > 0,
                "Invalid medication dosage");
        }
        
        // Generic validation method in service class
        public <T> void validateEntity(T entity, Validator<T> validator) {
            validator.validate(entity);
        }
    }
    
    // Generic validator interface
    public interface Validator<T> {
        boolean isValid(T entity);
        String getErrorMessage();
    }
}`}
                                    language="java"
                                    showLineNumbers={true}
                                />
                            </div>
                        </div>

                        {/* Real-World Patterns */}
                        <div className="mt-8 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-300 dark:border-purple-800">
                            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Common Generic Method Patterns</h4>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        pattern: "Factory Methods",
                                        example: "createInstance(Class<T> type)",
                                        useCase: "Object creation with type safety"
                                    },
                                    {
                                        pattern: "Mapper/Transformer",
                                        example: "map(List<S>, Function<S, T>)",
                                        useCase: "Data transformation between types"
                                    },
                                    {
                                        pattern: "Comparator",
                                        example: "compare(T a, T b, Comparator<T>)",
                                        useCase: "Generic comparison operations"
                                    },
                                    {
                                        pattern: "Predicate Filter",
                                        example: "filter(Collection<T>, Predicate<T>)",
                                        useCase: "Type-safe filtering"
                                    },
                                    {
                                        pattern: "Converter",
                                        example: "convert(T source, Class<R> targetType)",
                                        useCase: "Type conversion utilities"
                                    },
                                    {
                                        pattern: "Cache Getter",
                                        example: "getCached(String key, Class<T> type)",
                                        useCase: "Type-safe cache retrieval"
                                    }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300"
                                    >
                                        <div className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                                            {item.pattern}
                                        </div>
                                        <code className="text-xs bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded block mb-2">
                                            {item.example}
                                        </code>
                                        <div className="text-sm text-purple-800/70 dark:text-purple-400/70">
                                            {item.useCase}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generic Methods vs Generic Classes */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.3s_both] mb-16">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
                            <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-blue-600 dark:text-blue-300">⚖️</span>
                            </span>
                            Generic Methods vs Generic Classes: When to Use What?
                        </h3>

                        <div className="space-y-8">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                                            <th className="p-4 text-left border-b border-blue-200 dark:border-blue-800">Aspect</th>
                                            <th className="p-4 text-left border-b border-blue-200 dark:border-blue-800 text-purple-600 dark:text-purple-400">Generic Methods</th>
                                            <th className="p-4 text-left border-b border-blue-200 dark:border-blue-800 text-green-600 dark:text-green-400">Generic Classes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            {
                                                aspect: "Scope",
                                                method: "Method-level only",
                                                class: "Class-level (affects all methods)",
                                                methodBadge: "Local",
                                                classBadge: "Global"
                                            },
                                            {
                                                aspect: "Best For",
                                                method: "Utility operations, algorithms",
                                                class: "Data containers, data structures",
                                                methodBadge: "Operations",
                                                classBadge: "Containers"
                                            },
                                            {
                                                aspect: "Type Parameters",
                                                method: "Declared per method",
                                                class: "Declared once for class",
                                                methodBadge: "Flexible",
                                                classBadge: "Consistent"
                                            },
                                            {
                                                aspect: "Static Methods",
                                                method: "Can have own type params",
                                                class: "Cannot use class type params",
                                                methodBadge: "Yes",
                                                classBadge: "No"
                                            },
                                            {
                                                aspect: "When to Use",
                                                method: "When operation is type-agnostic",
                                                class: "When entire class works with type T",
                                                methodBadge: "Single operation",
                                                classBadge: "Whole class"
                                            },
                                            {
                                                aspect: "Example",
                                                method: "Collections.sort(), Arrays.asList()",
                                                class: "ArrayList<T>, HashMap<K,V>",
                                                methodBadge: "Utilities",
                                                classBadge: "Collections"
                                            },
                                            {
                                                aspect: "Complexity",
                                                method: "Simpler, focused",
                                                class: "More complex, comprehensive",
                                                methodBadge: "Simple",
                                                classBadge: "Complex"
                                            }
                                        ].map((row, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300"
                                            >
                                                <td className="p-4 font-semibold text-gray-800 dark:text-white">
                                                    {row.aspect}
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-purple-800 dark:text-purple-300">{row.method}</div>
                                                    <div className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded inline-block mt-1">
                                                        {row.methodBadge}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-green-800 dark:text-green-300">{row.class}</div>
                                                    <div className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded inline-block mt-1">
                                                        {row.classBadge}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                                    <h4 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">When to Use Generic Methods</h4>

                                    <div className="space-y-4">
                                        <JavaCodeBlock
                                            code={`// GOOD USE CASES for Generic Methods

// 1. Utility classes (static methods)
public class MathUtils {
    public static <T extends Number> double average(Collection<T> numbers) {
        // Generic method in non-generic class
    }
}

// 2. Algorithms that work on multiple types
public class SearchUtils {
    public static <T> int binarySearch(List<T> list, T key, Comparator<T> comp) {
        // Generic search algorithm
    }
}

// 3. Factory methods
public class ObjectFactory {
    public static <T> T createInstance(Class<T> type) {
        // Creates instance of any type
    }
}

// 4. Type conversion utilities
public class Converter {
    public static <T, R> R convert(T source, Function<T, R> converter) {
        return converter.apply(source);
    }
}`}
                                            language="java"
                                            showLineNumbers={true}
                                        />

                                        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                            <p className="text-purple-800 dark:text-purple-300 text-sm">
                                                <strong>Rule of thumb:</strong> Use generic methods when you have operations that
                                                should work with multiple types but don't need to store type-specific state.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-800">
                                    <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">When to Use Generic Classes</h4>

                                    <div className="space-y-4">
                                        <JavaCodeBlock
                                            code={`// GOOD USE CASES for Generic Classes

// 1. Data containers
public class Container<T> {
    private T value;
    // All methods work with T
}

// 2. Data structures
public class BinaryTree<T extends Comparable<T>> {
    private Node<T> root;
    // Entire tree works with type T
}

// 3. Repository/DAO patterns
public interface Repository<T, ID> {
    T findById(ID id);
    List<T> findAll();
    T save(T entity);
}

// 4. Builder patterns
public class QueryBuilder<T> {
    private Class<T> entityType;
    private List<Predicate<T>> predicates;
    // Builds queries for type T
}

// 5. Wrapper/Decorator patterns
public class LoggingWrapper<T> {
    private T wrapped;
    // Wraps any type with logging
}`}
                                            language="java"
                                            showLineNumbers={true}
                                        />

                                        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                            <p className="text-green-800 dark:text-green-300 text-sm">
                                                <strong>Rule of thumb:</strong> Use generic classes when the entire class
                                                needs to work consistently with one or more type parameters.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Mistakes & Best Practices */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.5s_both] mb-16">
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-red-300 dark:border-red-800">
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Common Mistakes & Best Practices</h3>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-inner">
                                    <h4 className="text-xl font-bold text-red-700 dark:text-red-300 mb-4">Common Mistakes with Generic Methods</h4>

                                    <div className="space-y-4">
                                        {[
                                            {
                                                mistake: "Using class type parameter in static method",
                                                wrong: "class C<T> { static void m(T t) }",
                                                right: "class C<T> { static <U> void m(U u) }"
                                            },
                                            {
                                                mistake: "Unnecessary type parameters",
                                                wrong: "<T> void print(String s)",
                                                right: "void print(String s)"
                                            },
                                            {
                                                mistake: "Confusing method and class type parameters",
                                                wrong: "class C<T> { <T> void m(T t) }",
                                                right: "class C<T> { <U> void m(U u) }"
                                            },
                                            {
                                                mistake: "Ignoring @SuppressWarnings",
                                                wrong: "T[] array = new T[10];",
                                                right: "@SuppressWarnings(\"unchecked\") T[] array = (T[]) new Object[10];"
                                            },
                                            {
                                                mistake: "Overusing explicit type arguments",
                                                wrong: "Util.<String>process(\"text\");",
                                                right: "Util.process(\"text\");"
                                            }
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                                                <div className="font-bold text-red-800 dark:text-red-300 mb-1">{item.mistake}</div>
                                                <div className="flex items-start text-sm mb-2">
                                                    <span className="text-red-600 dark:text-red-400 mr-2">✗</span>
                                                    <code className="flex-1 bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded">{item.wrong}</code>
                                                </div>
                                                <div className="flex items-start text-sm">
                                                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                                                    <code className="flex-1 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">{item.right}</code>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                                    <h4 className="text-lg font-bold text-amber-700 dark:text-amber-300 mb-3">Performance Considerations</h4>

                                    <div className="space-y-3">
                                        {[
                                            "Generic methods have zero runtime overhead",
                                            "Type erasure happens at compile time",
                                            "No performance difference between generic and non-generic methods",
                                            "Avoid creating arrays of generic types in performance-critical code",
                                            "Use primitive specializations for performance-critical numeric operations"
                                        ].map((tip, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <div className="w-5 h-5 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                                    <span className="text-amber-600 dark:text-amber-300 text-xs">⚡</span>
                                                </div>
                                                <span className="text-amber-800 dark:text-amber-300 text-sm">{tip}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
                                    <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">Best Practices</h4>

                                    <div className="space-y-4">
                                        {[
                                            "Use descriptive type parameter names in complex methods",
                                            "Document type parameter constraints in javadoc",
                                            "Prefer type inference over explicit type arguments",
                                            "Use @SafeVarargs for varargs generic methods",
                                            "Consider bounded wildcards for maximum flexibility",
                                            "Test generic methods with different type arguments",
                                            "Keep generic methods focused on single responsibility",
                                            "Use utility classes for related generic methods"
                                        ].map((practice, idx) => (
                                            <div key={idx} className="flex items-start p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                    <span className="text-green-600 dark:text-green-300">✓</span>
                                                </div>
                                                <span className="text-green-800 dark:text-green-300">{practice}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-inner">
                                    <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Professional Example: Generic Builder</h4>

                                    <JavaCodeBlock
                                        code={`// Professional-grade generic builder pattern
public class GenericBuilder<T> {
    private final Supplier<T> constructor;
    private final List<Consumer<T>> modifiers = new ArrayList<>();
    
    private GenericBuilder(Supplier<T> constructor) {
        this.constructor = constructor;
    }
    
    public static <T> GenericBuilder<T> of(Supplier<T> constructor) {
        return new GenericBuilder<>(constructor);
    }
    
    public <U> GenericBuilder<T> with(BiConsumer<T, U> consumer, U value) {
        Consumer<T> modifier = instance -> consumer.accept(instance, value);
        modifiers.add(modifier);
        return this;
    }
    
    public T build() {
        T instance = constructor.get();
        modifiers.forEach(modifier -> modifier.accept(instance));
        modifiers.clear();
        return instance;
    }
}

// Usage in Naihati College system
public class StudentBuilderExample {
    public Student createStudent() {
        return GenericBuilder.of(Student::new)
            .with(Student::setName, "Swadeep")
            .with(Student::setAge, 22)
            .with(Student::setCourse, "Computer Science")
            .build();
    }
    
    public Course createCourse() {
        return GenericBuilder.of(Course::new)
            .with(Course::setCode, "CS101")
            .with(Course::setTitle, "Java Programming")
            .with(Course::setCredits, 4)
            .build();
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

                {/* Teacher's Note Section */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.7s_both] mb-16">
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
                                <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">The Art of Generic Methods:</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    When I was training developers at Barrackpore Tech Park in 2010, we had a rule:
                                    "If you write the same logic three times for different types, it needs a generic method."
                                    Generic methods are about <strong>eliminating duplication while maintaining type safety</strong>.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <h5 className="font-bold text-purple-700 dark:text-purple-300 mb-2">💡 Classroom Story</h5>
                                        <p className="text-sm">
                                            Tuhina from Naihati College had three validation methods:
                                            <code> validateString()</code>, <code>validateInteger()</code>, <code>validateStudent()</code>.
                                            After learning generic methods, she created one <code>validate()</code> method.
                                            Her code reduced from 150 lines to 30, with better type safety!
                                        </p>
                                    </div>

                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <h5 className="font-bold text-blue-700 dark:text-blue-300 mb-2">🎯 Debugging Tip</h5>
                                        <p className="text-sm">
                                            When generic method inference fails, don't immediately add explicit type arguments.
                                            First, check if your method design is correct. Often, inference fails because the
                                            method is trying to do too much or has conflicting type constraints.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                                    <h5 className="font-bold text-green-700 dark:text-green-300 mb-2">🏆 Expert Insight</h5>
                                    <p className="text-sm text-green-800 dark:text-green-400">
                                        The best generic methods are the ones you don't notice. They work so seamlessly with type inference
                                        that developers use them without thinking about generics. That's the goal: type safety that feels natural.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-amber-700 dark:text-amber-400 mt-4">
                                <div>
                                    <span className="font-semibold">Real Project:</span> Implemented 50+ generic methods for Ichapur Hospital's validation system
                                </div>
                                <div className="text-xs">
                                    Contact: sukantahui@codernaccotax.co.in • 7003756860
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hint Section */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.9s_both] mb-16">
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
                                    <strong>Design Challenge:</strong> Swadeep is building a grading system for Barrackpore University.
                                    He needs methods that can:
                                </p>

                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <div className="font-bold text-purple-700 dark:text-purple-300">Calculate Average</div>
                                        <div className="text-sm text-purple-600 dark:text-purple-400">Works with Integer, Double, BigDecimal</div>
                                    </div>
                                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <div className="font-bold text-green-700 dark:text-green-300">Find Top Student</div>
                                        <div className="text-sm text-green-600 dark:text-green-400">Works with any Comparable type</div>
                                    </div>
                                    <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                        <div className="font-bold text-amber-700 dark:text-amber-300">Convert Grades</div>
                                        <div className="text-sm text-amber-600 dark:text-amber-400">Integer → String, Double → Letter</div>
                                    </div>
                                </div>

                                <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-lg">
                                    <p className="text-blue-800 dark:text-blue-300 mb-2">
                                        <strong>Question:</strong> Should these be generic methods? If so, what would their signatures be?
                                    </p>
                                    <p className="text-sm text-blue-700 dark:text-blue-400">
                                        <strong>Try designing:</strong> Write the method signatures for all three operations.
                                        Consider bounded type parameters for the average calculation and Comparable constraint.
                                    </p>
                                </div>

                                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                    <h5 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">🧪 Type Inference Exercise</h5>
                                    <p className="text-sm text-emerald-800 dark:text-emerald-400">
                                        Create a generic method that takes two parameters of the same type and returns a List of that type.
                                        Call it with: (1, 2), ("A", "B"), (student1, student2).
                                        Watch how type inference works differently for each call.
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                                    <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">🔍 Code Review Practice</h5>
                                    <p className="text-sm">
                                        Review a codebase for duplicate logic. Each time you find similar methods for different types,
                                        ask: "Could this be a generic method?" Count how many lines of code you could eliminate.
                                    </p>
                                </div>

                                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                                    <h5 className="font-bold text-teal-700 dark:text-teal-300 mb-2">📈 Performance Test</h5>
                                    <p className="text-sm">
                                        Create a generic method and its non-generic equivalent. Use JMH to benchmark them.
                                        You'll find they have identical performance - proving generic methods have zero runtime overhead.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mini Checklist */}
                <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_2.1s_both]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Generic Methods: Key Takeaways</h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xl font-bold mb-4 text-violet-600 dark:text-violet-400">What You've Learned</h4>
                                {[
                                    "Generic methods declare type parameters before return type",
                                    "Type inference eliminates need for explicit type arguments",
                                    "Can be static or non-static, in generic or non-generic classes",
                                    "Method type parameters have method-level scope",
                                    "Provide type-safe operations without class-level generics",
                                    "Common patterns: utilities, algorithms, factories, converters",
                                    "Use @SafeVarargs for varargs generic methods",
                                    "Performance identical to non-generic methods (type erasure)"
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start mb-3 p-3 bg-violet-50 dark:bg-violet-900/10 rounded-lg"
                                    >
                                        <div className="w-6 h-6 bg-violet-100 dark:bg-violet-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                            <span className="text-violet-600 dark:text-violet-300">{index + 1}</span>
                                        </div>
                                        <span className="text-violet-800 dark:text-violet-300">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h4 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">When to Use Generic Methods</h4>
                                {[
                                    "When you have duplicate logic for different types",
                                    "For utility/helper methods in non-generic classes",
                                    "When operation doesn't need to store type-specific state",
                                    "For algorithms that work with multiple data types",
                                    "When you need type-safe operations without generic classes",
                                    "For factory methods that create different types",
                                    "When you want compile-time type checking for operations",
                                    "For data transformation/conversion utilities"
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
                                        Next, we'll explore <strong>"Generic Constructors (Overview)"</strong> -
                                        how constructors can also have type parameters and the special considerations they require.
                                    </p>
                                </div>
                                <div className="px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 rounded-lg font-semibold">
                                    Topic 6/24
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-16 py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
                <p className="mb-2">© 2024 Java Generics Masterclass • Type-Safe Operations with Generic Methods</p>
                <p className="text-sm">Examples from: Barrackpore University, Naihati College, Shyamnagar Library, Ichapur Hospital</p>
            </footer>
        </div>
    );
};

export default Topic5;