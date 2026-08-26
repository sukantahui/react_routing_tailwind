import React from 'react';
import clsx from 'clsx';
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 dark:from-gray-900 dark:to-amber-950/20 text-gray-800 dark:text-gray-200 transition-colors duration-500">
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
          
          @keyframes problemPulse {
            0%, 100% {
              box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.1);
            }
            50% {
              box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3);
            }
          }
          
          @keyframes solutionGlow {
            0%, 100% {
              box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.1);
            }
            50% {
              box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.3);
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          @keyframes typeFlow {
            0% {
              stroke-dashoffset: 100;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>

      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-800 dark:via-orange-800 dark:to-red-800 text-white pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
            <div className="inline-flex items-center px-4 py-2 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Java Generics Series • Topic 2
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Why Java Needed Generics
            </h1>
            
            <p className="text-xl text-amber-100 dark:text-amber-200 max-w-3xl leading-relaxed">
              Understanding the real problems that made generics essential - 
              Type safety crises and the evolution of Java collections
            </p>
          </div>
          
          {/* Animated SVG Timeline */}
          <div className="mt-10 motion-safe:animate-[fadeSlideUp_1s_ease-out_0.3s_both]">
            <div className="max-w-4xl mx-auto">
              <svg 
                viewBox="0 0 800 220" 
                className="w-full h-auto"
                aria-label="Evolution timeline showing Java's need for generics"
              >
                {/* Timeline Base */}
                <line 
                  x1="50" y1="120" x2="750" y2="120" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeDasharray="5,5"
                  className="text-white/40"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="2s" 
                    fill="freeze"
                  />
                </line>
                
                {/* Problem Era (JDK 1.0 - 1.4) */}
                <g className="group cursor-pointer hover:animate-[shake_0.5s_ease-in-out]">
                  <circle 
                    cx="150" cy="120" 
                    r="25" 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="3"
                    className="group-hover:stroke-4 transition-all duration-300"
                  >
                    <animate 
                      attributeName="r" 
                      values="25;30;25" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text 
                    x="150" y="120" 
                    textAnchor="middle" 
                    fill="white" 
                    fontSize="14" 
                    fontWeight="bold"
                  >
                    JDK 1.0-1.4
                  </text>
                  <text 
                    x="150" y="170" 
                    textAnchor="middle" 
                    fill="#FCA5A5" 
                    fontSize="12"
                  >
                    Collections = Object[]
                  </text>
                  
                  {/* Problem indicators */}
                  <g>
                    <path 
                      d="M130,80 L150,60 L170,80" 
                      fill="#EF4444" 
                      opacity="0.8"
                    />
                    <text x="150" y="50" textAnchor="middle" fill="white" fontSize="10">
                      Type Unsafe
                    </text>
                  </g>
                </g>
                
                {/* Transition Arrow */}
                <path 
                  d="M200,120 L250,120" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                >
                  <animate 
                    attributeName="stroke-dasharray" 
                    values="0,100;50,50;0,100" 
                    dur="3s" 
                    repeatCount="indefinite"
                  />
                </path>
                
                {/* Crisis Point */}
                <g className="group cursor-pointer">
                  <circle 
                    cx="350" cy="120" 
                    r="30" 
                    fill="#DC2626"
                    className="group-hover:fill-red-500 transition-all duration-300"
                  >
                    <animate 
                      attributeName="fill-opacity" 
                      values="0.7;1;0.7" 
                      dur="1.5s" 
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text 
                    x="350" y="120" 
                    textAnchor="middle" 
                    fill="white" 
                    fontSize="16" 
                    fontWeight="bold"
                  >
                    !
                  </text>
                  <text 
                    x="350" y="170" 
                    textAnchor="middle" 
                    fill="#FCA5A5" 
                    fontSize="12"
                  >
                    ClassCastException
                  </text>
                  
                  {/* Explosion effect */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <line x1="350" y1="90" x2="350" y2="60" stroke="#EF4444" strokeWidth="2" />
                    <line x1="320" y1="120" x2="290" y2="120" stroke="#EF4444" strokeWidth="2" />
                    <line x1="380" y1="120" x2="410" y2="120" stroke="#EF4444" strokeWidth="2" />
                    <line x1="335" y1="105" x2="310" y2="85" stroke="#EF4444" strokeWidth="2" />
                    <line x1="365" y1="105" x2="390" y2="85" stroke="#EF4444" strokeWidth="2" />
                  </g>
                </g>
                
                {/* Solution Arrow */}
                <path 
                  d="M400,120 L450,120" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  markerEnd="url(#greenArrow)"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="1s" 
                    repeatCount="indefinite"
                  />
                </path>
                
                {/* Generics Era (JDK 5+) */}
                <g className="group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <circle 
                    cx="550" cy="120" 
                    r="25" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="3"
                    className="group-hover:stroke-4"
                  />
                  <text 
                    x="550" y="120" 
                    textAnchor="middle" 
                    fill="white" 
                    fontSize="14" 
                    fontWeight="bold"
                  >
                    JDK 5+
                  </text>
                  <text 
                    x="550" y="170" 
                    textAnchor="middle" 
                    fill="#A7F3D0" 
                    fontSize="12"
                  >
                    Collections&lt;T&gt;
                  </text>
                  
                  {/* Type safety flow */}
                  <g className="motion-safe:animate-[typeFlow_2s_ease-in-out_infinite]">
                    <path 
                      d="M520,80 Q550,60 580,80" 
                      fill="none" 
                      stroke="#10B981" 
                      strokeWidth="2"
                      strokeDasharray="10,5"
                    />
                    <circle cx="520" cy="80" r="5" fill="#10B981" />
                    <circle cx="580" cy="80" r="5" fill="#10B981" />
                  </g>
                </g>
                
                {/* Future Arrow */}
                <path 
                  d="M600,120 L650,120" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                
                {/* Modern Java */}
                <g className="opacity-50 group hover:opacity-100 transition-opacity duration-300">
                  <rect 
                    x="700" y="95" 
                    width="50" height="50" 
                    rx="10" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="group-hover:stroke-amber-400"
                  />
                  <text 
                    x="725" y="120" 
                    textAnchor="middle" 
                    fill="currentColor" 
                    fontSize="10"
                    className="group-hover:fill-amber-300"
                  >
                    Modern
                  </text>
                  <text 
                    x="725" y="135" 
                    textAnchor="middle" 
                    fill="currentColor" 
                    fontSize="10"
                    className="group-hover:fill-amber-300"
                  >
                    Java
                  </text>
                </g>
                
                <defs>
                  <marker 
                    id="arrow" 
                    markerWidth="10" 
                    markerHeight="7" 
                    refX="9" 
                    refY="3.5" 
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                  </marker>
                  <marker 
                    id="greenArrow" 
                    markerWidth="10" 
                    markerHeight="7" 
                    refX="9" 
                    refY="3.5" 
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Historical Context */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.5s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-300">⏳</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">The Pre-Generics Era (JDK 1.0 - 1.4)</h2>
            </div>
            
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Before JDK 5 (released in 2004), Java collections could only work with <code>Object</code> references. 
                  This meant <strong>everything was stored as Object</strong> and needed explicit casting when retrieved. 
                  This approach had fundamental flaws that affected real-world applications.
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 pl-6 py-4 my-6 rounded-r-lg">
                  <p className="text-amber-800 dark:text-amber-200 italic">
                    <strong>Real Analogy:</strong> Imagine a library in Barrackpore where all books (Novels, Science, Cookbooks) 
                    are stored in unlabeled boxes. Every time Swadeep needs a book, he must open each box, check the content, 
                    and hope it's the right type. This is exactly how Java collections worked before generics!
                  </p>
                </div>
                
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">The Core Problem Architecture</h3>
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">1. Everything is Object</h4>
                    <ul className="space-y-2 text-red-800 dark:text-red-200 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>Collections stored <code>Object</code> references</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>No type information preserved</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>String, Integer, Customer - all treated equally</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-3">2. Manual Casting Required</h4>
                    <ul className="space-y-2 text-orange-800 dark:text-orange-200 text-sm">
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Every retrieval needed explicit cast</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Code cluttered with <code>(String)</code>, <code>(Integer)</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>Easy to cast to wrong type</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-rose-50 to-fuchsia-50 dark:from-rose-900/20 dark:to-fuchsia-900/20 p-6 rounded-xl border border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-300">
                    <h4 className="text-xl font-bold text-rose-700 dark:text-rose-300 mb-3">3. Runtime Explosions</h4>
                    <ul className="space-y-2 text-rose-800 dark:text-rose-200 text-sm">
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span><code>ClassCastException</code> at runtime</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span>No compile-time protection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-rose-500 mr-2">•</span>
                        <span>Production crashes common</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Crisis: ClassCastException */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.7s_both] mb-16">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-red-300 dark:border-red-800 motion-safe:animate-[problemPulse_2s_ease-in-out_infinite]">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 dark:text-red-300">💥</span>
              </span>
              The ClassCastException Crisis
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <p className="text-lg mb-4">
                  <strong>Scenario:</strong> Tuhina is building a student management system for Naihati College. 
                  She needs to store student data, but without generics, here's what happens:
                </p>
                
                <JavaCodeBlock
                  code={`import java.util.ArrayList;
import java.util.List;

public class StudentManagerPreGenerics {
    
    public static void main(String[] args) {
        // Create a list for student names
        List studentNames = new ArrayList();
        
        // Adding student names (Strings)
        studentNames.add("Swadeep");
        studentNames.add("Tuhina");
        studentNames.add("Abhronila");
        studentNames.add("Debangshu");
        
        // ERROR PRONE: Developer accidentally adds an Integer
        // This compiles without error!
        studentNames.add(123); // Integer instead of String
        
        // Later in the code, when processing...
        for (int i = 0; i < studentNames.size(); i++) {
            try {
                // This cast will fail for the Integer at runtime
                String name = (String) studentNames.get(i);
                System.out.println("Processing: " + name.toUpperCase());
            } catch (ClassCastException e) {
                // CRASH at runtime!
                System.err.println("ERROR: Expected String but found: " + 
                                  studentNames.get(i).getClass().getName());
                System.err.println("System crashes at 2 AM in production!");
            }
        }
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
                
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/40 rounded-lg border border-red-300 dark:border-red-700">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    <strong className="text-red-800 dark:text-red-300">Runtime Output:</strong>
                  </div>
                  <pre className="text-red-800 dark:text-red-300 text-sm">
{`Processing: SWADEEP
Processing: TUHINA
Processing: ABHRONILA
Processing: DEBANGSHU
ERROR: Expected String but found: java.lang.Integer
System crashes at 2 AM in production!`}
                  </pre>
                </div>
              </div>
              
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-red-700 dark:text-red-300 mb-3">Why This Was a MAJOR Problem</h4>
                  <ul className="space-y-2 text-red-800 dark:text-red-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>Compiles successfully - gives false confidence</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>Fails at runtime - worst possible time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>Difficult to debug - stack trace shows error, not cause</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>Production outages common</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
                  <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-3">Real-World Impact</h4>
                  <ul className="space-y-2 text-amber-800 dark:text-amber-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>Banks: Wrong transaction types causing calculation errors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>E-commerce: Product prices stored as Strings causing billing failures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>Hospital systems: Patient age stored as String causing treatment errors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Type Casting Overhead */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.9s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">The Casting Overhead Problem</h3>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <h4 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-4">Code Clutter Before Generics</h4>
                
                <JavaCodeBlock
                  code={`// WITHOUT GENERICS - Enterprise application example
public class InventorySystem {
    
    // Method to process items - works with ANY type (dangerous!)
    public void processItems(List items) {
        // Manual type checking and casting EVERYWHERE
        for (Object item : items) {
            if (item instanceof String) {
                String productName = (String) item;
                // Process product...
                System.out.println("Product: " + productName.toUpperCase());
            } else if (item instanceof Integer) {
                Integer quantity = (Integer) item;
                // Process quantity...
                System.out.println("Quantity: " + (quantity * 2));
            } else if (item instanceof Double) {
                Double price = (Double) item;
                // Process price...
                System.out.println("Price with tax: " + (price * 1.18));
            } else {
                // Handle unexpected types
                throw new ClassCastException("Unexpected type: " + item.getClass());
            }
        }
    }
    
    // Another example: Student record processing
    public void processStudentRecords(List records) {
        // EVERY retrieval needs explicit casting
        String name = (String) records.get(0);
        Integer age = (Integer) records.get(1);
        Double grade = (Double) records.get(2);
        
        // What if indices are wrong? Runtime exception!
        // What if types are wrong? Runtime exception!
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
                
                <div className="mt-4 p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <h5 className="font-bold text-orange-800 dark:text-orange-300 mb-2">Problems with this approach:</h5>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-red-600">❌ Boilerplate:</span>
                      <p>Excessive instanceof checks and casts</p>
                    </div>
                    <div>
                      <span className="font-semibold text-red-600">❌ Error-prone:</span>
                      <p>Easy to forget a cast or check</p>
                    </div>
                    <div>
                      <span className="font-semibold text-red-600">❌ Unreadable:</span>
                      <p>Business logic hidden in type checks</p>
                    </div>
                    <div>
                      <span className="font-semibold text-red-600">❌ Inefficient:</span>
                      <p>Runtime type checking overhead</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-1 gap-8">
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="text-xl font-bold text-red-700 dark:text-red-300 mb-4">Developer Pain Points</h4>
                  <div className="space-y-3">
                    {[
                      "Had to remember what type was stored where",
                      "No IDE support for type checking",
                      "Refactoring was dangerous",
                      "Team communication gaps caused type mismatches",
                      "Testing couldn't catch all type issues",
                      "Documentation had to explicitly state types"
                    ].map((pain, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-red-600 dark:text-red-300 text-sm">!</span>
                        </div>
                        <span className="text-red-800 dark:text-red-300">{pain}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Business Impact</h4>
                  <div className="space-y-3">
                    {[
                      "Frequent production outages",
                      "High maintenance costs",
                      "Long debugging cycles",
                      "Customer data corruption risks",
                      "Compliance violations (wrong data types)",
                      "Loss of customer trust"
                    ].map((impact, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-300 text-sm">$</span>
                        </div>
                        <span className="text-blue-800 dark:text-blue-300">{impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Generics Solution */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.1s_both] mb-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-green-300 dark:border-green-800 motion-safe:animate-[solutionGlow_3s_ease-in-out_infinite]">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">How Generics Solved These Problems</h3>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">Same Problem, Generics Solution</h4>
                
                <JavaCodeBlock
                  code={`// WITH GENERICS - Type safety guaranteed
import java.util.ArrayList;
import java.util.List;

public class StudentManagerWithGenerics {
    
    public static void main(String[] args) {
        // Type-safe list - compiler enforces String only
        List<String> studentNames = new ArrayList<>();
        
        // Adding student names
        studentNames.add("Swadeep");
        studentNames.add("Tuhina");
        studentNames.add("Abhronila");
        studentNames.add("Debangshu");
        
        // COMPILE-TIME ERROR if wrong type is added
        // studentNames.add(123); // ERROR: incompatible types
        
        // Clean processing - no casting needed
        for (String name : studentNames) {
            System.out.println("Processing: " + name.toUpperCase());
        }
        
        // Example with custom types
        List<Student> ichapurStudents = new ArrayList<>();
        ichapurStudents.add(new Student("Raj", 22));
        ichapurStudents.add(new Student("Mita", 21));
        
        // Type-safe operations
        for (Student student : ichapurStudents) {
            System.out.println(student.getName() + " - " + student.getAge());
        }
    }
    
    static class Student {
        private String name;
        private int age;
        
        public Student(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        public String getName() { return name; }
        public int getAge() { return age; }
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-100 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-700">
                  <h5 className="font-bold text-green-800 dark:text-green-300 mb-3">Key Improvements</h5>
                  <div className="space-y-3">
                    {[
                      {
                        feature: "Compile-Time Type Checking",
                        benefit: "Catches errors during development, not in production"
                      },
                      {
                        feature: "Eliminated Casting",
                        benefit: "Cleaner, more readable code"
                      },
                      {
                        feature: "Self-Documenting Code",
                        benefit: "List<String> clearly shows expected type"
                      },
                      {
                        feature: "IDE Support",
                        benefit: "Autocomplete, refactoring, and error highlighting"
                      },
                      {
                        feature: "Reusable Code",
                        benefit: "Single implementation works for multiple types"
                      },
                      {
                        feature: "Performance",
                        benefit: "No runtime type checking overhead"
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="font-semibold text-green-700 dark:text-green-400">
                          ✓ {item.feature}
                        </div>
                        <div className="text-sm text-green-800/70 dark:text-green-300/70">
                          {item.benefit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <h5 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3">Before → After Comparison</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/30 rounded">
                      <span className="text-red-700 dark:text-red-300">Before: Object[] items</span>
                      <span className="text-red-500">→</span>
                      <span className="text-green-700 dark:text-green-300">{`After: List<T>`}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/30 rounded">
                      <span className="text-red-700 dark:text-red-300">Before: (String) items.get(i)</span>
                      <span className="text-red-500">→</span>
                      <span className="text-green-700 dark:text-green-300">After: items.get(i)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/30 rounded">
                      <span className="text-red-700 dark:text-red-300">Before: Runtime ClassCastException</span>
                      <span className="text-red-500">→</span>
                      <span className="text-green-700 dark:text-green-300">After: Compile-time error</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Migration Example */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.3s_both] mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 dark:text-purple-300">🏢</span>
              </span>
              Enterprise Migration Story: Barrackpore University
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-300">👨‍💻</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Project: Student Information System</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Legacy system built in 2000, migrated in 2005</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">Before Migration</div>
                    <ul className="text-xs text-red-800 dark:text-red-400 space-y-1">
                      <li>3-4 production crashes monthly</li>
                      <li>Avg. 8 hours debugging per crash</li>
                      <li>Student data corruption incidents</li>
                      <li>Manual type validation in UI layer</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-1">Migration Process</div>
                    <ul className="text-xs text-yellow-800 dark:text-yellow-400 space-y-1">
                      <li>6 months migration to JDK 5</li>
                      <li>Gradual generics introduction</li>
                      <li>Team training on type safety</li>
                      <li>IDE-assisted refactoring</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">After Migration</div>
                    <ul className="text-xs text-green-800 dark:text-green-400 space-y-1">
                      <li>Zero ClassCastException crashes</li>
                      <li>40% reduction in bug reports</li>
                      <li>Code 30% more maintainable</li>
                      <li>New developer onboarding easier</li>
                    </ul>
                  </div>
                </div>
                
                <JavaCodeBlock
                  code={`// LEGACY CODE (pre-generics)
public class LegacyStudentSystem {
    private Vector allStudents; // Raw type - stores Objects
    
    public void addStudent(Object student) {
        allStudents.add(student);
    }
    
    public void processRecords() {
        for (int i = 0; i < allStudents.size(); i++) {
            // Danger: Need to remember what type is stored
            Student s = (Student) allStudents.get(i); // Runtime risk!
            System.out.println(s.getName());
        }
    }
}

// MIGRATED CODE (with generics)
public class ModernStudentSystem {
    private Vector<Student> allStudents; // Type-safe
    
    public void addStudent(Student student) {
        allStudents.add(student);
    }
    
    public void processRecords() {
        for (Student s : allStudents) { // No casting needed
            System.out.println(s.getName());
        }
    }
    
    // Additional benefit: Generic methods
    public <T> List<T> filterStudents(List<T> students, Filter<T> filter) {
        List<T> result = new ArrayList<>();
        for (T student : students) {
            if (filter.accept(student)) {
                result.add(student);
            }
        }
        return result;
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.5s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <span className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 dark:text-yellow-300">❓</span>
              </span>
              Common Misconceptions About the Need for Generics
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  myth: "Generics are just syntactic sugar",
                  truth: "No! They provide real compile-time type safety that prevents runtime crashes",
                  example: "Without generics: Runtime ClassCastException → With generics: Compile-time error"
                },
                {
                  myth: "We can just use careful programming instead",
                  truth: "Human error is inevitable. Generics automate type safety",
                  example: "Even experienced developers like Abhronila make type mistakes under pressure"
                },
                {
                  myth: "Type casting isn't that bad",
                  truth: "Each cast is a potential runtime failure point",
                  example: "In a 10,000 line system, hundreds of casts = hundreds of failure points"
                },
                {
                  myth: "Generics are only for collections",
                  truth: "They're for ANY code that needs type safety and reusability",
                  example: "Custom algorithms, data structures, utility classes all benefit"
                },
                {
                  myth: "Object-oriented programming solves type safety",
                  truth: "OOP alone doesn't prevent wrong type assignments to collections",
                  example: "ArrayList still needed casting before generics"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-red-600 dark:text-red-300">✗</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-red-700 dark:text-red-300 mb-1">{item.myth}</h4>
                      <div className="flex items-center my-2">
                        <div className="h-px bg-gray-300 dark:bg-gray-700 flex-grow"></div>
                        <div className="mx-2 text-gray-500">→</div>
                        <div className="h-px bg-gray-300 dark:bg-gray-700 flex-grow"></div>
                      </div>
                      <div className="flex items-start mt-2">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-green-600 dark:text-green-300">✓</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-700 dark:text-green-300 mb-1">The Truth</h4>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">{item.truth}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">{item.example}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Historical Insight:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I've seen the transition from pre-generics Java to modern Java. In 2002, I worked on a banking system 
                  in Kolkata where we had <strong>weekly production crashes</strong> due to ClassCastException. 
                  When JDK 5 arrived in 2004 with generics, it wasn't just a feature - it was a <strong>revolution</strong>.
                </p>
                
                <div className="grid md:grid-cols-1 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Critical Understanding</h5>
                    <p className="text-sm">
                      Generics move type checking from <strong>runtime</strong> to <strong>compile-time</strong>. 
                      This is the single most important concept. Debugging a compile-time error takes minutes; 
                      debugging a runtime ClassCastException in production takes hours.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h5 className="font-bold text-red-700 dark:text-red-300 mb-2">⚠️ Warning for Beginners</h5>
                    <p className="text-sm">
                      Don't think "I'll just use Object and cast". That's exactly how systems fail. 
                      Every time Debangshu from Shyamnagar ignores generics, he's creating a future bug. 
                      <strong> Type safety is non-negotiable in professional code.</strong>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-amber-700 dark:text-amber-400 mt-4">
                <div>
                  <span className="font-semibold">Real Experience:</span> Managed 50+ enterprise Java migrations
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
                  <strong>Observation Challenge:</strong> Look at legacy code from Ichapur Municipal's old system. 
                  How many explicit casts can you find? Each one represents a <strong>potential runtime failure</strong>.
                </p>
                
                <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300 mb-2">
                    <strong>Hint:</strong> Try to rewrite a small legacy method using generics. Count how many:
                  </p>
                  <ul className="list-disc pl-5 text-blue-700 dark:text-blue-400 text-sm">
                    <li>instanceof checks you eliminate</li>
                    <li>explicit casts you remove</li>
                    <li>potential ClassCastException points you fix</li>
                  </ul>
                </div>
                
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h5 className="font-bold text-purple-700 dark:text-purple-300 mb-2">🧪 Experiment</h5>
                  <p className="text-sm text-purple-800 dark:text-purple-400">
                    Create two versions of a Student Grade Calculator: one with raw types and casting, 
                    one with generics. Intentionally introduce a type error in both. 
                    Notice when the error is caught (compile-time vs runtime).
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">🔍 Debugging Mindset</h5>
                  <p className="text-sm">
                    When you see "unchecked" warnings in legacy code, treat them as bugs. 
                    Each warning represents a potential production crash waiting to happen.
                  </p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                  <h5 className="font-bold text-teal-700 dark:text-teal-300 mb-2">📈 Business Impact</h5>
                  <p className="text-sm">
                    Calculate: If a ClassCastException causes 4 hours of downtime, 
                    and you have 10 such bugs, that's 40 hours of lost productivity. 
                    Generics prevent this cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_2.1s_both]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Key Takeaways: Why Generics Were Needed</h3>
            
            <div className="grid gap-4">
              {[
                "ClassCastException was the #1 runtime error in Java applications pre-JDK5",
                "Every explicit cast was a potential runtime failure point",
                "Code was cluttered with instanceof checks and type casting",
                "No compile-time type safety for collections",
                "Refactoring was dangerous and error-prone",
                "IDE couldn't provide proper type checking assistance",
                "Team collaboration suffered due to unclear type expectations",
                "Production outages were common and expensive to fix",
                "Generics moved type checking from runtime to compile-time",
                "Eliminated entire categories of bugs at their source"
              ].map((item, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "flex items-center p-4 rounded-lg border transition-all duration-300",
                    index < 5 
                      ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 hover:border-red-400"
                      : "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 hover:border-green-400"
                  )}
                >
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0",
                    index < 5 
                      ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                      : "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                  )}>
                    {index < 5 ? "!" : "✓"}
                  </div>
                  <span className={clsx(
                    index < 5 
                      ? "text-red-800 dark:text-red-300"
                      : "text-green-800 dark:text-green-300"
                  )}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Next Topic Preview</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Next, we'll dive into <strong>"Problems Without Generics (Type Casting and ClassCastException)"</strong> - 
                    a detailed look at specific failure patterns and their real-world consequences.
                  </p>
                </div>
                <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-lg font-semibold">
                  Topic 2/24
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-2">© 2024 Java Generics Masterclass • Understanding the Evolution</p>
        <p className="text-sm">Historical examples from: Barrackpore, Shyamnagar, Ichapur, Naihati education systems</p>
      </footer>
    </div>
  );
};

export default Topic1;