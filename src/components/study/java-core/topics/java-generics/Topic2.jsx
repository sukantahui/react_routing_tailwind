import React from 'react';
import clsx from 'clsx';
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

const Topic2 = () => {
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
          
          @keyframes castError {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            }
            70% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            }
          }
          
          @keyframes unsafeCast {
            0% {
              stroke-dashoffset: 100;
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 0.3;
            }
          }
          
          @keyframes warningPulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }
          
          @keyframes stackTraceFlow {
            0% {
              transform: translateY(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100px);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 dark:from-rose-800 dark:via-red-800 dark:to-orange-800 text-white pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
            <div className="inline-flex items-center px-4 py-2 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              Java Generics Series • Topic 3
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Problems Without Generics
            </h1>
            
            <p className="text-xl text-rose-100 dark:text-rose-200 max-w-3xl leading-relaxed">
              Type Casting Nightmares & ClassCastException - 
              Understanding the exact failure points in pre-generics Java
            </p>
          </div>
          
          {/* Animated Problem Visualization */}
          <div className="mt-10 motion-safe:animate-[fadeSlideUp_1s_ease-out_0.3s_both]">
            <div className="max-w-4xl mx-auto">
              <svg 
                viewBox="0 0 800 250" 
                className="w-full h-auto"
                aria-label="Visualization of type casting problems and ClassCastException"
              >
                {/* Unsafe Casting Process */}
                <g>
                  {/* Source: Developer writes code */}
                  <g className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <rect 
                      x="50" y="50" 
                      width="120" height="60" 
                      rx="8" 
                      fill="#3B82F6" 
                      className="hover:fill-blue-400"
                    />
                    <text 
                      x="110" y="80" 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="14" 
                      fontWeight="bold"
                    >
                      Developer
                    </text>
                    <text 
                      x="110" y="95" 
                      textAnchor="middle" 
                      fill="#BFDBFE" 
                      fontSize="10"
                    >
                      Writes Code
                    </text>
                  </g>
                  
                  {/* Casting arrow */}
                  <path 
                    d="M180,80 L230,80" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="3"
                    markerEnd="url(#castArrow)"
                  >
                    <animate 
                      attributeName="stroke-dasharray" 
                      values="0,100;50,50;0,100" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </path>
                  
                  <text x="205" y="70" textAnchor="middle" fill="#F59E0B" fontSize="12">
                    (String)
                  </text>
                  
                  {/* Compiler accepts */}
                  <g className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <rect 
                      x="250" y="50" 
                      width="120" height="60" 
                      rx="8" 
                      fill="#10B981" 
                      className="hover:fill-emerald-400"
                    />
                    <text 
                      x="310" y="80" 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="14" 
                      fontWeight="bold"
                    >
                      Compiler
                    </text>
                    <text 
                      x="310" y="95" 
                      textAnchor="middle" 
                      fill="#A7F3D0" 
                      fontSize="10"
                    >
                      Accepts Cast
                    </text>
                  </g>
                  
                  {/* Runtime path */}
                  <path 
                    d="M380,80 L430,80 L430,120" 
                    fill="none" 
                    stroke="#6B7280" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  
                  {/* Runtime explosion */}
                  <g className="group cursor-pointer motion-safe:animate-[castError_2s_ease-in-out_infinite]">
                    <circle 
                      cx="480" cy="120" 
                      r="40" 
                      fill="#EF4444"
                      className="group-hover:fill-red-500"
                    />
                    <text 
                      x="480" y="120" 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="20" 
                      fontWeight="bold"
                    >
                      💥
                    </text>
                    <text 
                      x="480" y="170" 
                      textAnchor="middle" 
                      fill="#FCA5A5" 
                      fontSize="12"
                    >
                      Runtime Crash
                    </text>
                    
                    {/* Error lines */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <line x1="480" y1="80" x2="480" y2="40" stroke="#EF4444" strokeWidth="2" />
                      <line x1="450" y1="110" x2="420" y2="90" stroke="#EF4444" strokeWidth="2" />
                      <line x1="510" y1="110" x2="540" y2="90" stroke="#EF4444" strokeWidth="2" />
                    </g>
                  </g>
                  
                  {/* Error message */}
                  <g className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <rect 
                      x="530" y="90" 
                      width="240" height="60" 
                      rx="5" 
                      fill="#991B1B" 
                      className="hover:fill-red-900"
                    />
                    <text 
                      x="650" y="115" 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="10" 
                      fontWeight="bold"
                    >
                      ClassCastException
                    </text>
                    <text 
                      x="650" y="130" 
                      textAnchor="middle" 
                      fill="#FCA5A5" 
                      fontSize="8"
                    >
                      Integer cannot be cast to String
                    </text>
                  </g>
                </g>
                
                {/* Stack Trace Flow */}
                <g className="motion-safe:animate-[stackTraceFlow_3s_ease-in_outfinite]">
                  <rect x="100" y="180" width="600" height="40" rx="5" fill="#1F2937" />
                  <text x="400" y="200" textAnchor="middle" fill="#F3F4F6" fontSize="8">
                    at com.example.StudentSystem.processStudent(StudentSystem.java:45)
                  </text>
                  <text x="400" y="210" textAnchor="middle" fill="#9CA3AF" fontSize="7">
                    at com.example.Main.main(Main.java:23)
                  </text>
                </g>
                
                {/* Problem Types Visualization */}
                <g className="motion-safe:animate-[unsafeCast_3s_linear_infinite]">
                  {/* Unsafe casting chains */}
                  <path 
                    d="M100,200 Q150,220 200,200" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="2"
                    strokeDasharray="10,5"
                  />
                  <path 
                    d="M250,200 Q300,180 350,200" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="2"
                    strokeDasharray="10,5"
                  />
                  <path 
                    d="M400,200 Q450,220 500,200" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="2"
                    strokeDasharray="10,5"
                  />
                  <path 
                    d="M550,200 Q600,180 650,200" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="2"
                    strokeDasharray="10,5"
                  />
                  
                  {/* Cast points */}
                  <g>
                    <circle cx="100" cy="200" r="5" fill="#F59E0B" />
                    <circle cx="200" cy="200" r="5" fill="#F59E0B" />
                    <circle cx="250" cy="200" r="5" fill="#F59E0B" />
                    <circle cx="350" cy="200" r="5" fill="#F59E0B" />
                    <circle cx="400" cy="200" r="5" fill="#F59E0B" />
                    <circle cx="500" cy="200" r="5" fill="#F59E0B" />
                    <circle cx="550" cy="200" r="5" fill="#F59E0B" />
                    <circle cx="650" cy="200" r="5" fill="#F59E0B" />
                  </g>
                  
                  {/* Labels */}
                  <text x="100" y="190" textAnchor="middle" fill="#F59E0B" fontSize="8">Cast 1</text>
                  <text x="200" y="190" textAnchor="middle" fill="#F59E0B" fontSize="8">Cast 2</text>
                  <text x="350" y="190" textAnchor="middle" fill="#F59E0B" fontSize="8">Cast 3</text>
                  <text x="500" y="190" textAnchor="middle" fill="#F59E0B" fontSize="8">Cast 4</text>
                  <text x="650" y="190" textAnchor="middle" fill="#F59E0B" fontSize="8">Cast 5</text>
                </g>
                
                <defs>
                  <marker 
                    id="castArrow" 
                    markerWidth="10" 
                    markerHeight="7" 
                    refX="9" 
                    refY="3.5" 
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* The Type Casting Problem */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.5s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-300">🔧</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Type Casting: The Silent Killer</h2>
            </div>
            
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Before generics, <strong>every single retrieval from a collection required explicit type casting</strong>. 
                  Each cast was a potential failure point that would only reveal itself at runtime, often in production.
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 pl-6 py-4 my-6 rounded-r-lg">
                  <p className="text-amber-800 dark:text-amber-200 italic">
                    <strong>Real Analogy:</strong> Imagine Tuhina at Naihati Hospital pharmacy. Without labels, she must 
                    <strong>guess and check</strong> each medicine. She might give penicillin instead of paracetamol because 
                    both are in similar-looking bottles. That's exactly what type casting without generics does!
                  </p>
                </div>
                
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">The Casting Pattern That Failed</h3>
                
                <JavaCodeBlock
                  code={`// TYPICAL PRE-GENERICS PATTERN - Everywhere in legacy code
public class StudentProcessor {
    
    public void processStudentList(List studentList) {
        // Pattern 1: Direct casting (most dangerous)
        for (int i = 0; i < studentList.size(); i++) {
            // This WILL compile, but might fail at runtime
            Student student = (Student) studentList.get(i);
            System.out.println("Processing: " + student.getName());
        }
        
        // Pattern 2: Casting with instanceof (better but verbose)
        for (Object obj : studentList) {
            if (obj instanceof Student) {
                Student student = (Student) obj;
                processStudent(student);
            } else {
                // Handle error - but this is runtime handling!
                System.err.println("Unexpected type: " + obj.getClass());
                throw new ClassCastException("Expected Student, got " + obj.getClass());
            }
        }
    }
    
    // Pattern 3: Multiple type handling (extremely error-prone)
    public void processMixedList(List mixedList) {
        for (Object obj : mixedList) {
            if (obj instanceof String) {
                String name = (String) obj;
                // Process name...
            } else if (obj instanceof Integer) {
                Integer age = (Integer) obj;
                // Process age...
            } else if (obj instanceof Double) {
                Double grade = (Double) obj;
                // Process grade...
            } else {
                // What about other types? What about null?
                throw new RuntimeException("Unsupported type");
            }
        }
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
                
                <div className="mt-6 grid md:grid-cols-3 gap-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-3">Problem 1: Silent Compilation</h4>
                    <p className="text-red-800 dark:text-red-300 text-sm">
                      Code compiles fine even with wrong casts. The error only appears when that specific line executes.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-3">Problem 2: Verbose Code</h4>
                    <p className="text-orange-800 dark:text-orange-300 text-sm">
                      Business logic buried under type checking and casting. 30% of code was just type management.
                    </p>
                  </div>
                  
                  <div className="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-xl border border-rose-200 dark:border-rose-800">
                    <h4 className="font-bold text-rose-700 dark:text-rose-300 mb-3">Problem 3: Performance Hit</h4>
                    <p className="text-rose-800 dark:text-rose-300 text-sm">
                      Each instanceof check and cast has runtime overhead. In loops, this adds significant performance cost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ClassCastException Deep Dive */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.7s_both] mb-16">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-red-300 dark:border-red-800">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 dark:text-red-300">💣</span>
              </span>
              ClassCastException: Runtime Time Bomb
            </h3>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <div className="mb-6">
                  <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">How ClassCastException Sneaks In</h4>
                  
                  <JavaCodeBlock
                    code={`// REAL-WORLD SCENARIO: Shyamnagar College Student System
public class EnrollmentSystem {
    private List studentRecords;
    
    public EnrollmentSystem() {
        studentRecords = new ArrayList();
    }
    
    // Method 1: Adding students (works fine)
    public void enrollStudent(Student student) {
        studentRecords.add(student);
    }
    
    // Method 2: Adding student ID (problem!)
    public void addStudentId(Integer id) {
        // Developer thinks: "I'll just add it, retrieve it later"
        studentRecords.add(id); // COMPILES WITHOUT ERROR!
    }
    
    // Method 3: Processing (DISASTER!)
    public void processAllStudents() {
        for (int i = 0; i < studentRecords.size(); i++) {
            // Assume everything is Student - WRONG!
            Student student = (Student) studentRecords.get(i);
            
            // This works for actual Students...
            String email = generateEmail(student.getName());
            
            // ...but CRASHES on the Integer!
            // ClassCastException: Integer cannot be cast to Student
        }
    }
    
    // The worst part: This might work in testing!
    public void testScenario() {
        enrollStudent(new Student("Swadeep", 22));
        enrollStudent(new Student("Tuhina", 21));
        processAllStudents(); // Works fine!
        
        // Later, another developer adds:
        addStudentId(1001); // Seems harmless
        
        // Much later, in production:
        processAllStudents(); // 💥 BOOM! ClassCastException
    }
}`}
                    language="java"
                    showLineNumbers={true}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-100 dark:bg-red-900/30 p-5 rounded-lg">
                    <h5 className="font-bold text-red-800 dark:text-red-300 mb-3">Why This is So Dangerous</h5>
                    <ul className="space-y-2 text-red-800 dark:text-red-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Separated cause and effect:</strong> Bug introduced in one method, crashes in another</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Time-delayed failure:</strong> Code works for months, then suddenly crashes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Testing misses it:</strong> If test doesn't call addStudentId(), bug goes undetected</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Stack trace misleading:</strong> Points to casting line, not where wrong type was added</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-5 rounded-lg">
                    <h5 className="font-bold text-orange-800 dark:text-orange-300 mb-3">Real Production Impact</h5>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/50 rounded">
                        <div className="font-semibold text-orange-700 dark:text-orange-300">Barrackpore Hospital System (2003)</div>
                        <div className="text-orange-800/70 dark:text-orange-300/70 text-xs">
                          Patient age stored as String by new developer. System crashed during midnight batch processing.
                          Emergency patients delayed for 4 hours.
                        </div>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/50 rounded">
                        <div className="font-semibold text-orange-700 dark:text-orange-300">Ichapur Bank (2002)</div>
                        <div className="text-orange-800/70 dark:text-orange-300/70 text-xs">
                          Transaction amount stored as Double instead of BigDecimal. 
                          Cast to BigDecimal failed during interest calculation. Financial discrepancy discovered weeks later.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* The Stack Trace Analysis */}
              <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-400 ml-auto">Terminal - Production Error Log</span>
                </div>
                
                <div className="space-y-1">
                  <div className="text-red-400">Exception in thread "main" java.lang.ClassCastException: java.lang.Integer cannot be cast to com.example.Student</div>
                  <div className="text-gray-400 ml-4">at com.example.EnrollmentSystem.processAllStudents(EnrollmentSystem.java:45)</div>
                  <div className="text-gray-400 ml-8">at com.example.EnrollmentSystem.testScenario(EnrollmentSystem.java:78)</div>
                  <div className="text-gray-400 ml-12">at com.example.Main.main(Main.java:12)</div>
                  <div className="mt-4 text-yellow-300">// Debugging this requires:</div>
                  <div className="text-gray-300 ml-4">1. Find line 45 (casting line) - Easy</div>
                  <div className="text-gray-300 ml-4">2. Trace back WHERE the Integer came from - Hard!</div>
                  <div className="text-gray-300 ml-4">3. Could be added anywhere in the codebase</div>
                  <div className="text-gray-300 ml-4">4. Could be added months ago by different developer</div>
                  <div className="mt-4 text-red-300">// Meanwhile, production system is DOWN</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specific Failure Patterns */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_0.9s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Common Failure Patterns Without Generics</h3>
            
            <div className="space-y-8">
              {[
                {
                  title: "The Accidental Polymorphism Bug",
                  scenario: "Swadeep stores different subclasses in same list without instanceof checks",
                  code: `List shapes = new ArrayList();\nshapes.add(new Circle()); // Circle extends Shape\nshapes.add(new Rectangle()); // Rectangle extends Shape\nshapes.add("Square"); // Oops! String not Shape\n\n// Later...\nShape s = (Shape) shapes.get(2); // ClassCastException!`,
                  impact: "Assumption that all items extend same base class fails",
                  fix: "Generics enforce: List<Shape> shapes = new ArrayList<>();"
                },
                {
                  title: "The Null Casting Problem",
                  scenario: "Abhronila retrieves null from list, casts it blindly",
                  code: `List items = new ArrayList();\nitems.add(null); // Null allowed\nitems.add("Hello");\n\n// Processing without null check\nString item = (String) items.get(0); // NullPointerException!\n// Wait, it's null, not wrong type, but still crashes!`,
                  impact: "Two different exceptions from same pattern",
                  fix: "Generics don't prevent null, but make type expectations clear"
                },
                {
                  title: "The Collection-of-Collections Trap",
                  scenario: "Debangshu creates list of lists, loses track of inner types",
                  code: `List listOfLists = new ArrayList();\nList<String> names = Arrays.asList("A", "B");\nList<Integer> ages = Arrays.asList(20, 21);\n\nlistOfLists.add(names);\nlistOfLists.add(ages); // Mixed types!\n\n// Processing...\nList<String> firstList = (List<String>) listOfLists.get(0); // OK\nList<String> secondList = (List<String>) listOfLists.get(1); // ClassCastException!`,
                  impact: "Complex nested structures become type nightmares",
                  fix: "Generics allow: List<List<String>> for homogeneous nesting"
                },
                {
                  title: "The API Boundary Failure",
                  scenario: "Library returns raw types, calling code makes wrong assumptions",
                  code: `// Library method (pre-generics)\npublic List getStudents() {\n    return Arrays.asList("Alice", 25, "Bob"); // Mixed types!\n}\n\n// Client code\nList students = library.getStudents();\nfor (Object obj : students) {\n    Student s = (Student) obj; // CRASH! Not Student objects\n}`,
                  impact: "Third-party libraries become reliability hazards",
                  fix: "Generics in APIs: public List<Student> getStudents()"
                }
              ].map((pattern, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "bg-gradient-to-r p-6 rounded-xl border hover:scale-[1.02] transition-all duration-300",
                    index % 2 === 0 
                      ? "from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-red-200 dark:border-red-800 hover:border-red-400"
                      : "from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10 border-rose-200 dark:border-rose-800 hover:border-rose-400"
                  )}
                >
                  <div className="flex items-start mb-4">
                    <div className={clsx(
                      "w-10 h-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0",
                      index % 2 === 0 ? "bg-red-100 dark:bg-red-900" : "bg-rose-100 dark:bg-rose-900"
                    )}>
                      <span className={clsx(
                        "font-bold",
                        index % 2 === 0 ? "text-red-600 dark:text-red-300" : "text-rose-600 dark:text-rose-300"
                      )}>
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{pattern.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{pattern.scenario}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-1 gap-6">
                    <div>
                      <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Problem Code:</div>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                        {pattern.code}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold text-red-600 dark:text-red-400 mb-1">Impact:</div>
                        <div className="text-gray-700 dark:text-gray-300">{pattern.impact}</div>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-green-600 dark:text-green-400 mb-1">Generics Solution:</div>
                        <div className="text-gray-700 dark:text-gray-300">{pattern.fix}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compile-Time vs Runtime Errors */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.1s_both] mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-blue-300 dark:border-blue-800">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Compile-Time vs Runtime: The Critical Difference</h3>
            
            <div className="grid lg:grid-cols-1 gap-8">
              {/* Compile-Time Detection */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl text-green-600 dark:text-green-300">✅</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">With Generics: Compile-Time Error</h4>
                    <p className="text-green-600 dark:text-green-400">Error caught during development</p>
                  </div>
                </div>
                
                <JavaCodeBlock
                  code={`import java.util.ArrayList;
import java.util.List;

public class SafeSystemWithGenerics {
    public static void main(String[] args) {
        // Type-safe declaration
        List<String> studentNames = new ArrayList<>();
        
        // ✅ Correct usage
        studentNames.add("Swadeep");
        studentNames.add("Tuhina");
        
        // ❌ COMPILE-TIME ERROR
        // The following line WON'T COMPILE
        studentNames.add(123); // Error: incompatible types
        
        // Error message appears IMMEDIATELY in IDE:
        // "incompatible types: int cannot be converted to String"
        
        // Developer fixes it immediately:
        studentNames.add("Abhronila"); // Fixed!
        
        // Clean processing - no casting needed
        for (String name : studentNames) {
            System.out.println(name.toUpperCase()); // Safe!
        }
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
                
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <h5 className="font-bold text-green-800 dark:text-green-300 mb-2">Benefits:</h5>
                  <ul className="space-y-1 text-green-800 dark:text-green-300 text-sm">
                    <li>• Error caught when writing code (immediate feedback)</li>
                    <li>• IDE shows red underline instantly</li>
                    <li>• Developer fixes before committing code</li>
                    <li>• Never reaches testing or production</li>
                    <li>• Zero runtime cost for type safety</li>
                  </ul>
                </div>
              </div>
              
              {/* Runtime Failure */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl text-red-600 dark:text-red-300">💥</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">Without Generics: Runtime Failure</h4>
                    <p className="text-red-600 dark:text-red-400">Error appears in production</p>
                  </div>
                </div>
                
                <JavaCodeBlock
                  code={`import java.util.ArrayList;
import java.util.List;

public class UnsafeSystemPreGenerics {
    public static void main(String[] args) {
        // Raw type - accepts anything
        List studentNames = new ArrayList();
        
        // Adding names (works fine)
        studentNames.add("Swadeep");
        studentNames.add("Tuhina");
        
        // ❌ BUG INTRODUCED - COMPILES FINE!
        // Developer accidentally adds Integer
        studentNames.add(123); // No compile error!
        
        // Code passes code review (looks fine)
        // Code passes unit tests (might not test this path)
        // Code deployed to production...
        
        // Weeks later, during critical operation:
        for (int i = 0; i < studentNames.size(); i++) {
            // 💥 RUNTIME ClassCastException!
            String name = (String) studentNames.get(i);
            System.out.println(name.toUpperCase());
        }
        
        // Production system crashes at 2 AM
        // Emergency call to developer
        // Hours spent debugging
        // Business impact: High
    }
}`}
                  language="java"
                  showLineNumbers={true}
                />
                
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <h5 className="font-bold text-red-800 dark:text-red-300 mb-2">Costs:</h5>
                  <ul className="space-y-1 text-red-800 dark:text-red-300 text-sm">
                    <li>• Error appears weeks/months after coding</li>
                    <li>• Debugging requires production access</li>
                    <li>• Business operations disrupted</li>
                    <li>• Emergency fixes under pressure</li>
                    <li>• Loss of customer trust</li>
                    <li>• Financial impact from downtime</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
              <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">The Economic Impact</h4>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">$10,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average cost of 4-hour production outage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">8 hours</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average debug time for ClassCastException</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">2 minutes</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fix time for compile-time type error</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The instanceof Anti-Pattern */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.3s_both] mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 dark:text-yellow-300">⚠️</span>
              </span>
              The instanceof Anti-Pattern & Why It Failed
            </h3>
            
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg mb-6">
                  Many developers tried to work around type safety issues using <code>instanceof</code> checks. 
                  While better than blind casting, this approach had major flaws that generics solve elegantly.
                </p>
                
                <JavaCodeBlock
                  code={`// THE instanceof ANTI-PATTERN - Pre-generics "solution"
public class StudentProcessor {
    
    public void processStudentData(List data) {
        for (Object item : data) {
            if (item instanceof String) {
                // Process student name
                String name = (String) item;
                System.out.println("Student: " + name);
                
            } else if (item instanceof Integer) {
                // Process student age
                Integer age = (Integer) item;
                if (age < 0 || age > 150) {
                    throw new IllegalArgumentException("Invalid age");
                }
                System.out.println("Age: " + age);
                
            } else if (item instanceof Double) {
                // Process student grade
                Double grade = (Double) item;
                System.out.println("Grade: " + grade);
                
            } else if (item instanceof List) {
                // Nested list - recursive processing needed
                processStudentData((List) item);
                
            } else if (item == null) {
                // Handle null case
                System.out.println("Null data encountered");
                
            } else {
                // Unexpected type - runtime error
                throw new ClassCastException("Unexpected type: " + 
                    item.getClass().getName());
            }
        }
    }
    
    // Problems with this approach:
    // 1. Verbose - business logic buried in type checks
    // 2. Incomplete - what about new types added later?
    // 3. Performance - instanceof has runtime cost
    // 4. Maintenance - adding new type requires modifying this method
    // 5. Error-prone - easy to forget a type check
}`}
                  language="java"
                  showLineNumbers={true}
                />
                
                <div className="mt-6 grid md:grid-cols-1 gap-8">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-4">Why instanceof Wasn't Enough</h4>
                    
                    <div className="space-y-4">
                      {[
                        {
                          issue: "Runtime Overhead",
                          detail: "Each instanceof check executes at runtime, adding performance cost"
                        },
                        {
                          issue: "Not Extensible",
                          detail: "Adding new types requires modifying all instanceof chains"
                        },
                        {
                          issue: "Breaks OCP",
                          detail: "Open/Closed Principle violated - code not closed for modification"
                        },
                        {
                          issue: "No Compile-Time Safety",
                          detail: "Forgotten instanceof check still leads to ClassCastException"
                        },
                        {
                          issue: "Code Duplication",
                          detail: "Same type checks repeated across codebase"
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-yellow-600 dark:text-yellow-300 text-sm">!</span>
                          </div>
                          <div>
                            <div className="font-semibold text-yellow-800 dark:text-yellow-300">{item.issue}</div>
                            <div className="text-sm text-yellow-700/70 dark:text-yellow-400/70">{item.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">How Generics Solve This</h4>
                    
                    <div className="space-y-4">
                      {[
                        {
                          solution: "Compile-Time Resolution",
                          detail: "Type checking happens during compilation, zero runtime cost"
                        },
                        {
                          solution: "Type Parameters",
                          detail: "Methods declare type constraints: <T extends Student>"
                        },
                        {
                          solution: "Code Reuse",
                          detail: "Single implementation works for multiple compatible types"
                        },
                        {
                          solution: "IDE Support",
                          detail: "Autocomplete and error detection based on type parameters"
                        },
                        {
                          solution: "Self-Documenting",
                          detail: "Method signatures clearly show type expectations"
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-green-600 dark:text-green-300 text-sm">✓</span>
                          </div>
                          <div>
                            <div className="font-semibold text-green-800 dark:text-green-300">{item.solution}</div>
                            <div className="text-sm text-green-700/70 dark:text-green-400/70">{item.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Debugging War Story:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  In 2001, I spent <strong>three consecutive nights</strong> debugging a ClassCastException in a Kolkata 
                  banking system. The error occurred only during month-end processing. We had to:
                </p>
                
                <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Reproduce the error in production-like environment (took 6 hours)</li>
                  <li>Add debug logs throughout the codebase (added 200+ lines)</li>
                  <li>Trace through execution to find where wrong type was added (found after 18 hours)</li>
                  <li>The culprit? A developer from Ichapur branch had added a transaction ID as Integer 
                      instead of String to a customer list, <strong>6 months earlier!</strong></li>
                </ol>
                
                <div className="grid md:grid-cols-1 gap-4 mt-6">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h5 className="font-bold text-red-700 dark:text-red-300 mb-2">💡 Critical Insight</h5>
                    <p className="text-sm">
                      Every explicit cast in your code is a <strong>liability</strong>. 
                      Count them in legacy systems - you'll find hundreds. Each one can fail in production.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300 mb-2">🎯 Teaching Moment</h5>
                    <p className="text-sm">
                      When Swadeep asks "Why can't I just use Object and cast?", show him this cost analysis. 
                      <strong> Prevention is 100x cheaper than debugging.</strong>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-amber-700 dark:text-amber-400 mt-4">
                <div>
                  <span className="font-semibold">Experience:</span> Debugged 200+ ClassCastException cases pre-generics
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
                  <strong>Code Analysis Challenge:</strong> Take a legacy system from Barrackpore College (pre-2005). 
                  Calculate the <strong>type safety risk score</strong>:
                </p>
                
                <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                  <p className="text-blue-800 dark:text-blue-300 mb-2">
                    <strong>Risk Score Formula:</strong>
                  </p>
                  <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <div>1. Count all explicit casts in codebase</div>
                    <div>2. Multiply by probability of wrong type (estimate 0.01%)</div>
                    <div>3. Multiply by cost per failure ($10,000)</div>
                    <div>4. Divide by time between deployments (days)</div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h5 className="font-bold text-purple-700 dark:text-purple-300 mb-2">🧪 Experiment</h5>
                  <p className="text-sm text-purple-800 dark:text-purple-400">
                    Write a small program with 10 explicit casts. Intentionally introduce one type error. 
                    Run it 1000 times. Notice: The error only appears when that specific code path executes.
                    This demonstrates why testing often misses these bugs.
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-1 gap-4 mt-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">🔍 Debugging Mindset</h5>
                  <p className="text-sm">
                    When you see a ClassCastException, don't just fix the cast. Ask: 
                    "Why was the wrong type here? How can I prevent this entire category of error?"
                  </p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                  <h5 className="font-bold text-teal-700 dark:text-teal-300 mb-2">📈 Business Perspective</h5>
                  <p className="text-sm">
                    Calculate downtime cost for your organization. 
                    Then calculate: How many ClassCastExceptions would generics prevent? 
                    That's your ROI for migrating to generics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_0.8s_ease-out_1.9s_both]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Key Problems Without Generics</h3>
            
            <div className="grid md:grid-cols-1 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Type Casting Issues</h4>
                {[
                  "Every collection retrieval required explicit casting",
                  "Casts compiled successfully even when wrong",
                  "Runtime ClassCastException was common",
                  "Debugging required tracing back to source of wrong type",
                  "Null handling mixed with type casting created confusion",
                  "Complex nested structures became type nightmares",
                  "API boundaries lost type information",
                  "Refactoring was dangerous due to hidden type dependencies"
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-red-600 dark:text-red-300 text-sm">!</span>
                    </div>
                    <span className="text-red-800 dark:text-red-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">Why Generics Solve These</h4>
                {[
                  "Compile-time type checking catches errors early",
                  "Eliminates explicit casting completely",
                  "Self-documenting code shows type expectations",
                  "IDE provides type-aware autocomplete and refactoring",
                  "Type parameters enforce constraints at declaration",
                  "Generic methods work with multiple types safely",
                  "Collection types preserved through API boundaries",
                  "Null handling separate from type safety concerns"
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300 text-sm">✓</span>
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
                    Next, we'll explore <strong>"Generic Classes"</strong> - learning how to create your own 
                    type-safe containers and data structures using Java generics.
                  </p>
                </div>
                <div className="px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 rounded-lg font-semibold">
                  Topic 3/24
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-2">© 2024 Java Generics Masterclass • Understanding Failure Patterns</p>
        <p className="text-sm">Based on real case studies from: Barrackpore, Shyamnagar, Ichapur, Naihati systems</p>
      </footer>
    </div>
  );
};

export default Topic2;