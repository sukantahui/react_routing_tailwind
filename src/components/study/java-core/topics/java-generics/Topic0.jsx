import React from 'react';
import clsx from 'clsx';
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-950 text-gray-800 dark:text-gray-200 transition-colors duration-500">
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
          
          @keyframes subtleGlow {
            0%, 100% {
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            50% {
              box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes typeSafetyFlow {
            0% {
              stroke-dashoffset: 100;
              opacity: 0.3;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 text-white pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
            <div className="inline-block px-4 py-2 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              Java Generics Series • Topic 1
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Introduction to Generics in Java
            </h1>
            
            <p className="text-xl text-blue-100 dark:text-blue-200 max-w-3xl leading-relaxed">
              Type safety, code reusability, and eliminating ClassCastException - 
              The pillars of robust Java programming
            </p>
          </div>
          
          {/* Animated SVG Concept Illustration */}
          <div className="mt-10 motion-safe:animate-[fadeSlideUp_1s_ease-out_0.3s_both]">
            <div className="max-w-2xl mx-auto">
              <svg 
                viewBox="0 0 800 200" 
                className="w-full h-auto"
                aria-label="Visual representation of generics concept"
              >
                {/* Generic Container Concept */}
                <rect 
                  x="50" y="50" 
                  width="200" height="100" 
                  rx="10" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-white/40"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="1.5s" 
                    begin="0.5s"
                    fill="freeze"
                  />
                </rect>
                
                {/* Type Safety Flow */}
                <path 
                  d="M250,100 L350,100 L350,80" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  className="text-green-400"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="1s" 
                    begin="1s"
                    fill="freeze"
                  />
                </path>
                
                <circle 
                  cx="250" cy="100" 
                  r="8" 
                  fill="#4ADE80" 
                  className="hover:animate-[float_1s_ease-in-out_infinite] transition-all duration-300 hover:r-10 cursor-pointer"
                >
                  <title>Input Type</title>
                  <animate 
                    attributeName="fill-opacity" 
                    values="0.3;1;0.3" 
                    dur="2s" 
                    repeatCount="indefinite"
                  />
                </circle>
                
                <circle 
                  cx="350" cy="80" 
                  r="8" 
                  fill="#F59E0B" 
                  className="hover:animate-[float_1s_ease-in-out_infinite] transition-all duration-300 hover:r-10 cursor-pointer"
                >
                  <title>Output Type</title>
                  <animate 
                    attributeName="fill-opacity" 
                    values="0.3;1;0.3" 
                    dur="2s" 
                    repeatCount="indefinite" 
                    begin="0.5s"
                  />
                </circle>
                
                {/* Generic Box */}
                <rect 
                  x="400" y="40" 
                  width="350" height="120" 
                  rx="15" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  className="text-white group hover:stroke-4 transition-all duration-300"
                >
                  <animate 
                    attributeName="stroke-dasharray" 
                    values="0,800;400,400;0,800" 
                    dur="3s" 
                    repeatCount="indefinite"
                  />
                </rect>
                
                <text 
                  x="575" y="85" 
                  textAnchor="middle" 
                  className="text-2xl font-bold fill-current"
                  fontSize="20"
                >
                  &lt;T&gt;
                </text>
                <text 
                  x="575" y="115" 
                  textAnchor="middle" 
                  className="fill-current text-blue-200"
                  fontSize="16"
                >
                  Type Parameter
                </text>
                
                {/* Arrows showing flexibility */}
                <g className="motion-safe:animate-[typeSafetyFlow_2s_ease-in-out_infinite]">
                  <path 
                    d="M500,160 Q525,140 550,160" 
                    fill="none" 
                    stroke="#60A5FA" 
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <path 
                    d="M575,160 Q600,140 625,160" 
                    fill="none" 
                    stroke="#60A5FA" 
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <path 
                    d="M650,160 Q675,140 700,160" 
                    fill="none" 
                    stroke="#60A5FA" 
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
                
                {/* Type examples */}
                <g className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <rect x="480" y="165" width="40" height="30" rx="5" fill="#3B82F6" className="hover:fill-blue-400" />
                  <text x="500" y="185" textAnchor="middle" fill="white" fontSize="12">String</text>
                </g>
                
                <g className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <rect x="555" y="165" width="40" height="30" rx="5" fill="#10B981" className="hover:fill-emerald-400" />
                  <text x="575" y="185" textAnchor="middle" fill="white" fontSize="12">Integer</text>
                </g>
                
                <g className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <rect x="630" y="165" width="40" height="30" rx="5" fill="#8B5CF6" className="hover:fill-violet-400" />
                  <text x="650" y="185" textAnchor="middle" fill="white" fontSize="12">Double</text>
                </g>
                
                <defs>
                  <marker 
                    id="arrowhead" 
                    markerWidth="10" 
                    markerHeight="7" 
                    refX="9" 
                    refY="3.5" 
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Conceptual Explanation */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.5s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">📚</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">What are Generics?</h2>
            </div>
            
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  <strong>Generics</strong> are a powerful feature in Java that allow you to write code that can work with different data types while maintaining <strong>type safety</strong> at compile time. Think of them as <strong>parameterized types</strong> - you can create classes, interfaces, and methods that operate on types specified as parameters.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 pl-6 py-4 my-6 rounded-r-lg">
                  <p className="text-blue-800 dark:text-blue-200 italic">
                    <strong>Analogy:</strong> Imagine a container at Barrackpore Railway Station that can store any item. Without labels, you might accidentally mix food with chemicals! Generics are like putting clear labels: "Container&lt;Food&gt;" or "Container&lt;Chemicals&gt;", preventing dangerous mix-ups.
                  </p>
                </div>
                
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">The Core Concept</h3>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">Without Generics</h4>
                    <ul className="space-y-2 text-green-800 dark:text-green-200">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>Type casting required</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>Runtime ClassCastException</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>No compile-time type checking</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">With Generics</h4>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Stronger type checking at compile time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Elimination of explicit type casting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Code reusability with type safety</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.7s_both] mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800 dark:to-slate-900 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-300 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 dark:text-orange-300">🌍</span>
              </span>
              Real-World Scenario
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <p className="text-lg mb-4">
                  <strong>Scenario:</strong> Tuhina is building a student database system for Naihati High School. She needs containers for:
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="font-bold text-purple-700 dark:text-purple-300">Student Names</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">String type</div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">Student Ages</div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400">Integer type</div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="font-bold text-amber-700 dark:text-amber-300">Student Grades</div>
                    <div className="text-sm text-amber-600 dark:text-amber-400">Double type</div>
                  </div>
                </div>
                
                <p className="mb-4">
                  Without generics, she would need separate container classes for each type. With generics, she can create one flexible container that works for all!
                </p>
              </div>
              
              <JavaCodeBlock
                code={`// BEFORE GENERICS - Problematic approach
class StudentNameList {
    private Object[] names;
    
    public void add(Object name) {
        // Need to cast every time we retrieve
    }
}

class StudentAgeList {
    private Object[] ages;
    // Same pattern repeated...
}

// AFTER GENERICS - Elegant solution
class StudentContainer<T> {
    private T[] items;
    
    public void add(T item) {
        // Type safe - no casting needed
    }
    
    public T get(int index) {
        // Returns the correct type automatically
        return items[index];
    }
}

// Usage
StudentContainer<String> nameList = new StudentContainer<>();
StudentContainer<Integer> ageList = new StudentContainer<>();
StudentContainer<Double> gradeList = new StudentContainer<>();`}
                language="java"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Why Generics? Detailed Explanation */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.9s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Why Generics Were Introduced?</h3>
            
            <div className="space-y-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 hover:border-red-400 dark:hover:border-red-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
                  <span className="mr-2">⚠️</span> The ClassCastException Problem
                </h4>
                
                <JavaCodeBlock
                  code={`import java.util.ArrayList;
import java.util.List;

public class WithoutGenericsExample {
    public static void main(String[] args) {
        // Create a list that can hold ANY object
        List list = new ArrayList();
        
        // Adding different types - compiler doesn't complain
        list.add("Swadeep");
        list.add(25);  // Integer, not String!
        list.add("Debangshu");
        
        // Problem occurs at RUNTIME when retrieving
        for (int i = 0; i < list.size(); i++) {
            String student = (String) list.get(i); // ClassCastException at index 1!
            System.out.println(student.toUpperCase());
        }
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
                
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/40 rounded-lg">
                  <p className="text-red-800 dark:text-red-300">
                    <strong>Output:</strong> <code>Exception in thread "main" java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String</code>
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
                  <span className="mr-2">✅</span> Generics Solution
                </h4>
                
                <JavaCodeBlock
                  code={`import java.util.ArrayList;
import java.util.List;

public class WithGenericsExample {
    public static void main(String[] args) {
        // Create a type-safe list
        List<String> studentNames = new ArrayList<>();
        
        // Now compiler ensures only Strings are added
        studentNames.add("Swadeep");
        studentNames.add("Tuhina");
        studentNames.add("Abhronila");
        studentNames.add("Debangshu");
        
        // studentNames.add(25); // COMPILE-TIME ERROR! Can't add Integer
        
        // No casting needed - type is guaranteed
        for (String name : studentNames) {
            System.out.println(name.toUpperCase()); // Safe!
        }
        
        // Also works with custom types
        List<Student> studentsFromBarrackpore = new ArrayList<>();
        studentsFromBarrackpore.add(new Student("Raj", 22));
        // studentsFromBarrackpore.add("String error"); // Compile-time error
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.1s_both] mb-16">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Key Benefits of Generics</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔒",
                  title: "Type Safety",
                  desc: "Catches invalid types at compile time, preventing ClassCastException at runtime",
                  color: "blue"
                },
                {
                  icon: "♻️",
                  title: "Code Reusability",
                  desc: "Write once, use with multiple types - no need for duplicate code",
                  color: "green"
                },
                {
                  icon: "🧹",
                  title: "Cleaner Code",
                  desc: "Eliminates explicit casting, making code more readable and maintainable",
                  color: "purple"
                },
                {
                  icon: "⚡",
                  title: "Better Performance",
                  desc: "Reduces runtime checks and casting overhead",
                  color: "orange"
                },
                {
                  icon: "📖",
                  title: "Self-Documenting",
                  desc: "Code clearly shows what types are expected and returned",
                  color: "pink"
                },
                {
                  icon: "🔧",
                  title: "IDE Support",
                  desc: "Better autocomplete, refactoring, and error detection",
                  color: "teal"
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "bg-white dark:bg-gray-800 p-6 rounded-xl border hover:scale-105 transition-all duration-300 cursor-pointer",
                    `border-${benefit.color}-200 dark:border-${benefit.color}-800`,
                    `hover:border-${benefit.color}-400 dark:hover:border-${benefit.color}-600`
                  )}
                  style={{ animationDelay: `${1.3 + index * 0.1}s` }}
                >
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{benefit.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.5s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <span className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 dark:text-yellow-300">⚠️</span>
              </span>
              Common Pitfalls for Beginners
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Using Raw Types",
                  desc: "Forgetting to specify type parameters leads to compiler warnings and loses type safety",
                  example: "List list = new ArrayList(); // Should be List<String>",
                  fix: "Always specify type parameters: List<String> list = new ArrayList<>();"
                },
                {
                  title: "Type Erasure Confusion",
                  desc: "Generics information is removed at runtime (type erasure), so you can't use instanceof with generic types",
                  example: "if (list instanceof List<String>) // Compile error!",
                  fix: "Use raw type for runtime checks: if (list instanceof List)"
                },
                {
                  title: "Incompatible Type Arguments",
                  desc: "Trying to assign generic types with incompatible type arguments",
                  example: "List<Number> numbers = new ArrayList<Integer>(); // Error!",
                  fix: "Use wildcards: List<? extends Number> numbers = new ArrayList<Integer>();"
                },
                {
                  title: "Creating Generic Arrays",
                  desc: "Direct creation of generic arrays is not allowed in Java",
                  example: "T[] array = new T[10]; // Compile error!",
                  fix: "Use collections or create Object[] and cast: (T[]) new Object[10];"
                }
              ].map((pitfall, index) => (
                <div 
                  key={index}
                  className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-lg p-5 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all duration-300"
                >
                  <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">{pitfall.title}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{pitfall.desc}</p>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="font-semibold text-red-600 dark:text-red-400 mr-2">Wrong:</span>
                      <code className="text-sm bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">{pitfall.example}</code>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-green-600 dark:text-green-400 mr-2">Correct:</span>
                      <code className="text-sm bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">{pitfall.fix}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.7s_both] mb-16">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-emerald-200 dark:border-emerald-800">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Best Practices</h3>
            
            <div className="grid gap-6">
              {[
                {
                  practice: "Use Descriptive Type Parameter Names",
                  details: "Use single uppercase letters (T, E, K, V, N) or descriptive names in angle brackets",
                  code: "class Container<ITEM_TYPE> { } // or class Box<T> { }"
                },
                {
                  practice: "Always Use Diamond Operator <>",
                  details: "Let the compiler infer type arguments from the context",
                  code: "List<String> names = new ArrayList<>(); // Not new ArrayList<String>();"
                },
                {
                  practice: "Avoid Raw Types in New Code",
                  details: "Raw types exist only for backward compatibility",
                  code: "// Always specify type parameters\nMap<String, Integer> map = new HashMap<>();"
                },
                {
                  practice: "Use Bounded Type Parameters When Needed",
                  details: "Restrict types that can be used as type arguments",
                  code: "class Calculator<T extends Number> { }\n// Only Number subclasses allowed"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-emerald-600 dark:text-emerald-300">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">{item.practice}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{item.details}</p>
                      <code className="text-sm bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 rounded block font-mono">
                        {item.code}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.9s_both] mb-16">
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
                <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Key Insight for Beginners:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Think of generics as <strong>templates</strong> or <strong>blueprints</strong>. When Swadeep from Shyamnagar creates a "Box&lt;T&gt;", 
                  he's not creating a specific box yet. He's creating a blueprint that says: 
                  "When someone uses this, they'll tell me what type T should be, and I'll make a type-safe box for that specific type."
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Pro Tip</h5>
                    <p className="text-sm">
                      Always write generic code even when you think you only need one type today. 
                      Tomorrow, when Abhronila needs the same logic for a different type, your code will be ready!
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-bold text-green-700 dark:text-green-300 mb-2">🎯 Remember</h5>
                    <p className="text-sm">
                      Generics provide <strong>compile-time</strong> type safety. The type information is erased at runtime 
                      (called type erasure), but the compiler has already done all the checking.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-amber-700 dark:text-amber-400 mt-4">
                <div>
                  <span className="font-semibold">Contact:</span> sukantahui@codernaccotax.co.in • 7003756860
                </div>
                <div className="text-xs">
                  Expert in: Programming Language, RDBMS, Operating System, Web Development
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_2.1s_both] mb-16">
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
                  <strong>Observation Challenge:</strong> Look at the code examples where Debangshu uses generics. 
                  What happens if he tries to add an <code>Integer</code> to a <code>List&lt;String&gt;</code>?
                </p>
                
                <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300 mb-2">
                    <strong>Hint:</strong> The error appears at compile time, not runtime. Try to spot the exact moment 
                    when your IDE (Eclipse/IntelliJ) shows the red underline.
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    <strong>Try changing this:</strong> Create a generic method that works for both 
                    <code> String</code> and <code>Integer</code>. What type parameter would you use?
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">🔍 Debugging Mindset</h5>
                  <p className="text-sm">
                    When you see "unchecked cast" warning, don't ignore it! It means you're losing type safety. 
                    Investigate and fix it properly.
                  </p>
                </div>
                
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800">
                  <h5 className="font-bold text-violet-700 dark:text-violet-300 mb-2">🧪 Experiment</h5>
                  <p className="text-sm">
                    Try creating a generic class <code>Pair&lt;T, U&gt;</code> that can hold two different types. 
                    What real-world scenario from Ichapur could this represent?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_2.3s_both]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">What You Should Remember</h3>
            
            <div className="grid gap-4">
              {[
                "Generics provide type safety at compile time, preventing ClassCastException",
                "Use angle brackets <> to specify type parameters",
                "Common type parameter names: T (Type), E (Element), K (Key), V (Value)",
                "Generics eliminate the need for explicit type casting",
                "Type information is erased at runtime (type erasure)",
                "Always use the diamond operator <> for type inference",
                "Avoid raw types in new code",
                "Generics make code more reusable and maintainable"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-green-600 dark:text-green-300">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Next Topic Preview</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    In the next lesson, we'll explore <strong>"Need for Generics in Java"</strong> - understanding 
                    the real problems that generics solve in enterprise applications.
                  </p>
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-semibold">
                  Topic 1/24
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-2">© 2024 Java Generics Masterclass • Built with Tailwind CSS & React 19</p>
        <p className="text-sm">All examples use student names from: Barrackpore, Shyamnagar, Ichapur, Naihati</p>
      </footer>
    </div>
  );
};

export default Topic0;