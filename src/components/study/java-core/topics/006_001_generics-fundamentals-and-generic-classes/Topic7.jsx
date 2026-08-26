import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// Enhanced JavaCodeBlock component
const JavaCodeBlock = ({
  code = "",
  highlightLines = [],
  title = "Java Code (BlueJ)"
}) => {
  const [lines, setLines] = useState([]);
  const [copied, setCopied] = useState(false);
  const [showWatermark, setShowWatermark] = useState(false);
  const blockRef = useRef(null);

  // Simple syntax highlighting without Prism
  useEffect(() => {
    const highlightKeywords = (text) => {
      const keywords = [
        'public', 'private', 'protected', 'class', 'interface', 'extends',
        'implements', 'static', 'final', 'void', 'return', 'new', 'import',
        'package', 'this', 'super', 'if', 'else', 'for', 'while', 'do',
        'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally',
        'throw', 'throws', 'instanceof', 'synchronized', 'volatile', 'transient',
        'native', 'strictfp', 'enum', 'assert', 'boolean', 'byte', 'char',
        'short', 'int', 'long', 'float', 'double', 'null', 'true', 'false'
      ];
      
      let highlighted = text;
      
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlighted = highlighted.replace(regex, `<span class="text-purple-400 font-semibold">${keyword}</span>`);
      });
      
      // Highlight strings
      highlighted = highlighted.replace(/"[^"]*"/g, '<span class="text-green-400">$&</span>');
      
      // Highlight comments
      highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>');
      highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500 italic">$&</span>');
      
      // Highlight numbers
      highlighted = highlighted.replace(/\b\d+\b/g, '<span class="text-yellow-400">$&</span>');
      
      // Highlight generics
      highlighted = highlighted.replace(/&lt;[^&]+&gt;/g, '<span class="text-blue-400">$&</span>');
      
      return highlighted;
    };

    const highlighted = highlightKeywords(code.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    setLines(highlighted.split("\n"));
  }, [code]);

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function saveAsImage() {
    setShowWatermark(true);
    
    // Simulate image save process
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Simple representation of code as image
    const lines = code.split('\n');
    const lineHeight = 24;
    const padding = 40;
    const width = 800;
    const height = padding * 2 + lines.length * lineHeight + 100;
    
    canvas.width = width;
    canvas.height = height;
    
    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    
    // Header
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, 50);
    
    // Title
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`☕ ${title}`, 20, 30);
    
    // Code
    ctx.font = '14px monospace';
    ctx.fillStyle = '#e2e8f0';
    
    lines.forEach((line, i) => {
      ctx.fillText(line, padding, padding + 70 + i * lineHeight);
    });
    
    // Footer
    ctx.fillStyle = '#475569';
    ctx.font = '12px sans-serif';
    ctx.fillText('Generated from Coder & AccoTax - Barrackpore', 20, height - 20);
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'java-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    setTimeout(() => setShowWatermark(false), 2000);
  }

  return (
    <div
      ref={blockRef}
      className="my-6 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-sky-500/20 shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] transition-all duration-500"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 text-sm font-semibold text-slate-300 tracking-wide">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors duration-300" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors duration-300" />
            <span className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors duration-300" />
          </div>
          <span className="ml-3 text-sky-400 font-mono">☕ {title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-slate-800 to-slate-700 hover:from-sky-600 hover:to-blue-600 transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Code
              </>
            )}
          </button>

          <button
            onClick={saveAsImage}
            className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 transition-all duration-300 active:scale-95 flex items-center gap-2"
            disabled={showWatermark}
          >
            {showWatermark ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Save JPG
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex text-sm leading-7 font-mono overflow-auto max-h-[500px]">
        {/* Line Numbers */}
        <div className="px-4 py-5 text-right select-none text-slate-600 border-r border-slate-800 bg-slate-950/80 sticky left-0">
          {lines.map((_, i) => (
            <div key={i} className="pr-2">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 px-4 py-5 overflow-auto">
          <pre className="whitespace-pre">
            <code>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={clsx(
                    "pl-3 transition-colors duration-200 hover:bg-slate-800/50 rounded",
                    highlightLines.includes(i + 1) && 
                    "bg-yellow-400/10 border-l-2 border-yellow-400 pl-3 hover:bg-yellow-400/20"
                  )}
                  dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                />
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Watermark Animation */}
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold">Generating Image with QR Code...</p>
            <p className="text-slate-400 text-sm mt-2">Download will start automatically</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Topic7 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    // Observe all sections
    Object.keys(sectionRefs.current).forEach((key) => {
      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]);
      }
    });

    return () => {
      mediaQuery.removeEventListener("change", handler);
      observer.disconnect();
    };
  }, []);

  const setRef = (id, element) => {
    sectionRefs.current[id] = element;
  };

  const typeParams = [
    {
      letter: "T",
      title: "Type",
      example: "Box<T>, List<T>",
      color: "blue",
      description: "Most commonly used for general types",
      useCase: "When creating generic classes or methods"
    },
    {
      letter: "E",
      title: "Element",
      example: "List<E>, Set<E>",
      color: "green",
      description: "Used for elements in collections",
      useCase: "Collection interfaces and implementations"
    },
    {
      letter: "K",
      title: "Key",
      example: "Map<K, V>",
      color: "yellow",
      description: "Represents keys in key-value pairs",
      useCase: "Map interfaces and implementations"
    },
    {
      letter: "V",
      title: "Value",
      example: "Map<K, V>",
      color: "purple",
      description: "Represents values in key-value pairs",
      useCase: "Map interfaces and implementations"
    },
    {
      letter: "N",
      title: "Number",
      example: "Calculator<N>",
      color: "red",
      description: "Used for numeric types",
      useCase: "Mathematical operations, bounded types"
    },
    {
      letter: "R",
      title: "Result/Return",
      example: "Function<T, R>",
      color: "indigo",
      description: "Represents return type",
      useCase: "Functional interfaces, methods with returns"
    }
  ];

  const commonMistakes = [
    {
      title: "Using Non-Standard Names",
      description: "Using A, B, X instead of T, E, K, V breaks conventions",
      example: "❌ Container<Item>  ✅ Container<T>",
      impact: "Reduces code readability and maintainability"
    },
    {
      title: "Mixing Conventions",
      description: "Using T for Map keys instead of K",
      example: "❌ Map<T, V>  ✅ Map<K, V>",
      impact: "Confuses other developers reading your code"
    },
    {
      title: "Overly Descriptive Names",
      description: "Using long names defeats the purpose of conventions",
      example: "❌ Container<ElementType>  ✅ Container<E>",
      impact: "Makes generic declarations verbose"
    },
    {
      title: "Ignoring Context",
      description: "Not using appropriate parameter for the context",
      example: "❌ List<K> for student list  ✅ List<E> or List<T>",
      impact: "Loss of semantic meaning"
    }
  ];

  const bestPractices = [
    "Always use single uppercase letters",
    "Follow Java Collections Framework conventions",
    "Be consistent throughout your codebase",
    "Use T for general types, E for collections",
    "Use K, V together for key-value pairs",
    "Document any deviation from conventions"
  ];

  // Code examples for the JavaCodeBlock
  const genericClassCode = `// Student record using multiple type parameters
public class StudentRecord<K, V, T> {
    private K rollNumber;      // K for Key
    private V studentName;     // V for Value
    private T marks;           // T for Type (could be Double, Integer)
    
    public StudentRecord(K roll, V name, T marks) {
        this.rollNumber = roll;
        this.studentName = name;
        this.marks = marks;
    }
    
    public K getRollNumber() { return rollNumber; }
    public V getStudentName() { return studentName; }
    public T getMarks() { return marks; }
}

// Usage in Shyamnagar College System
public class Main {
    public static void main(String[] args) {
        StudentRecord<Integer, String, Double> tuhina = 
            new StudentRecord<>(101, "Tuhina", 92.5);
        StudentRecord<String, String, Integer> abhronila = 
            new StudentRecord<>("CS101", "Abhronila", 95);
            
        System.out.println("Tuhina's marks: " + tuhina.getMarks());
        System.out.println("Abhronila's roll: " + abhronila.getRollNumber());
    }
}`;

  const collectionCode = `import java.util.*;

public class ClassroomManager {
    // Using standard conventions consistently
    private List<String> studentNames = new ArrayList<>();     // E = String
    private Map<Integer, Double> studentMarks = new HashMap<>(); // K=Integer, V=Double
    private Set<String> uniqueSubjects = new HashSet<>();      // E = String
    
    // Generic method with T parameter
    public <T> void printAll(List<T> items) {
        for (T item : items) {
            System.out.println(item);
        }
    }
    
    // Generic method with multiple parameters
    public <K, V> void updateRecord(Map<K, V> records, K key, V value) {
        records.put(key, value);
    }
    
    public static void main(String[] args) {
        ClassroomManager manager = new ClassroomManager();
        
        // Adding student data
        manager.studentNames.add("Debangshu");
        manager.studentNames.add("Swadeep");
        manager.studentMarks.put(101, 88.5);
        manager.studentMarks.put(102, 92.0);
        manager.uniqueSubjects.add("Java");
        manager.uniqueSubjects.add("Data Structures");
        
        // Using generic methods
        manager.printAll(manager.studentNames);
        manager.updateRecord(manager.studentMarks, 103, 95.5);
    }
}`;

  const genericMethodsCode = `// Generic methods with different type parameters
public class GenericExamples {
    
    // Method with T parameter
    public <T> void display(T element) {
        System.out.println("Element: " + element);
        System.out.println("Type: " + element.getClass().getName());
    }
    
    // Method with E parameter (for collections)
    public <E> void addToCollection(List<E> collection, E element) {
        collection.add(element);
        System.out.println("Added " + element + " to collection");
    }
    
    // Method with K and V parameters (for maps)
    public <K, V> void addToMap(Map<K, V> map, K key, V value) {
        map.put(key, value);
        System.out.println("Added key-value pair: " + key + "=" + value);
    }
    
    // Method with N parameter (for numbers)
    public <N extends Number> double calculateAverage(List<N> numbers) {
        double sum = 0.0;
        for (N num : numbers) {
            sum += num.doubleValue();
        }
        return sum / numbers.size();
    }
    
    // Method with R return type
    public <T, R> R processItem(T item, Function<T, R> processor) {
        return processor.apply(item);
    }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes subtlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.9; }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .animate-subtle-pulse {
            animation: subtlePulse 3s ease-in-out infinite;
          }
          
          .hover-lift:hover {
            transform: translateY(-4px);
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        {/* HEADER */}
        <header className="mb-12" ref={(el) => setRef("header", el)}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center ${!isReducedMotion ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Type Parameters in Java Generics
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Master the naming conventions and best practices for generic type parameters
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              Convention
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              Best Practices
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
              Real Examples
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm">
              Professional Tips
            </span>
          </div>
        </header>

        {/* INTRO - Enhanced */}
        <section
          ref={(el) => setRef("intro", el)}
          className={clsx(
            "mb-12 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl",
            (isVisible.intro || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            What are Type Parameters?
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Type parameters are <strong className="text-blue-600 dark:text-blue-400">placeholders</strong> for actual types that you specify when using generic classes, interfaces, or methods. They are defined within angle brackets <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono">&lt;&gt;</code> and follow specific naming conventions that make code more readable and maintainable.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="italic text-gray-600 dark:text-gray-300">
                <strong>Real-world analogy:</strong> Think of type parameters like labeled shelves in Barrackpore's library - 
                the label (T, E, K) tells librarians (Java compiler) exactly where to find and organize books (data types).
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Just like Swadeep uses different colored markers for different subjects (blue for Math, red for Physics), 
              type parameters help Java understand what kind of data it's working with at <strong>compile time</strong>, preventing type mismatches.
            </p>
          </div>
        </section>

        {/* NAMING CONVENTIONS - Enhanced with hover effects */}
        <section 
          ref={(el) => setRef("naming", el)}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            Standard Naming Conventions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {typeParams.map((param, index) => (
              <div
                key={param.letter}
                ref={(el) => setRef(`card-${index}`, el)}
                className={clsx(
                  "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border transition-all duration-500 hover-lift cursor-pointer",
                  param.color === 'blue' && 'border-blue-200 dark:border-blue-800 hover:border-blue-300',
                  param.color === 'green' && 'border-green-200 dark:border-green-800 hover:border-green-300',
                  param.color === 'yellow' && 'border-yellow-200 dark:border-yellow-800 hover:border-yellow-300',
                  param.color === 'purple' && 'border-purple-200 dark:border-purple-800 hover:border-purple-300',
                  param.color === 'red' && 'border-red-200 dark:border-red-800 hover:border-red-300',
                  param.color === 'indigo' && 'border-indigo-200 dark:border-indigo-800 hover:border-indigo-300',
                  (isVisible[`card-${index}`] || isReducedMotion) && "animate-fade-in-up"
                )}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                onMouseEnter={() => setActiveCard(param.letter)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0
                    ${param.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' : ''}
                    ${param.color === 'green' ? 'bg-green-100 dark:bg-green-900' : ''}
                    ${param.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' : ''}
                    ${param.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : ''}
                    ${param.color === 'red' ? 'bg-red-100 dark:bg-red-900' : ''}
                    ${param.color === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900' : ''}
                    ${activeCard === param.letter ? 'scale-110' : ''}
                    transition-transform duration-300`}
                  >
                    <span className={`text-3xl font-bold
                      ${param.color === 'blue' ? 'text-blue-600 dark:text-blue-300' : ''}
                      ${param.color === 'green' ? 'text-green-600 dark:text-green-300' : ''}
                      ${param.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-300' : ''}
                      ${param.color === 'purple' ? 'text-purple-600 dark:text-purple-300' : ''}
                      ${param.color === 'red' ? 'text-red-600 dark:text-red-300' : ''}
                      ${param.color === 'indigo' ? 'text-indigo-600 dark:text-indigo-300' : ''}`}>
                      {param.letter}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-gray-200">{param.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{param.description}</p>
                    <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block">
                      {param.example}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                      <strong>Use:</strong> {param.useCase}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CODE EXAMPLES WITH ENHANCED JavaCodeBlock */}
        <section 
          ref={(el) => setRef("examples", el)}
          className={clsx(
            "mb-12 space-y-8",
            (isVisible.examples || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">Practical Code Examples</h2>
            
            <div className="space-y-8">
              {/* Example 1 */}
              <div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom Generic Class with Multiple Parameters
                </h3>
                <JavaCodeBlock 
                  code={genericClassCode}
                  title="StudentRecord.java"
                  highlightLines={[1, 2, 3, 4, 7, 13, 14, 15]}
                />
              </div>

              {/* Example 2 */}
              <div>
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Collection Framework Examples
                </h3>
                <JavaCodeBlock 
                  code={collectionCode}
                  title="ClassroomManager.java"
                  highlightLines={[5, 6, 7, 11, 16, 20, 21]}
                />
              </div>

              {/* Example 3 */}
              <div>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Generic Methods with Different Type Parameters
                </h3>
                <JavaCodeBlock 
                  code={genericMethodsCode}
                  title="GenericExamples.java"
                  highlightLines={[4, 9, 14, 19, 25]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL REPRESENTATION */}
        <section 
          ref={(el) => setRef("visual", el)}
          className={clsx(
            "mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg",
            (isVisible.visual || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            How Type Parameters Work
          </h2>
          
          <div className="relative">
            <svg 
              viewBox="0 0 800 300" 
              className="w-full h-auto"
              onMouseEnter={() => setActiveCard("visual")}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Generic Class Definition */}
              <rect 
                x="50" y="50" 
                width="300" height="100" 
                rx="15" 
                fill="white" 
                stroke="#3B82F6" 
                strokeWidth="2" 
                className="dark:fill-gray-800 transition-all duration-500"
              />
              <text 
                x="200" y="90" 
                textAnchor="middle" 
                className="text-lg font-bold dark:fill-gray-200" 
                fill="#1F2937" 
                fontSize="20" 
                fontWeight="bold"

              >
                Generic Class Definition
              </text>
              <text 
                x="200" y="125" 
                textAnchor="middle" 
                fill="#4B5563" 
                fontSize="18"
                className="dark:fill-gray-300"
              >
                public class Container&lt;T&gt;
              </text>
              
              {/* Arrow with animation */}
              <g>
                <line x1="370" y1="100" x2="430" y2="100" stroke="#3B82F6" strokeWidth="3" strokeDasharray="8,8">
                  {!isReducedMotion && <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2s" repeatCount="indefinite" />}
                </line>
                <polygon points="430,100 440,95 440,105" fill="#3B82F6" />
              </g>
              
              {/* Type Substitution */}
              <rect 
                x="450" y="50" 
                width="300" height="100" 
                rx="15" 
                fill="#FEF3C7" 
                stroke="#F59E0B" 
                strokeWidth="2"
                className="dark:fill-yellow-900 transition-all duration-500"
              >
                {!isReducedMotion && <animate attributeName="opacity" values="1;0.9;1" dur="3s" repeatCount="indefinite" />}
              </rect>
              <text 
                x="600" y="90" 
                textAnchor="middle" 
                fill="#92400E" 
                fontSize="20" 
                fontWeight="bold"
                className="dark:fill-yellow-200"
              >
                Type Substitution
              </text>
              <text 
                x="600" y="125" 
                textAnchor="middle" 
                fill="#92400E" 
                fontSize="18"
                className="dark:fill-yellow-300"
              >
                Container&lt;String&gt; container = new Container&lt;&gt;();
              </text>
              
              {/* Type Parameter Flow */}
              <circle 
                cx="200" cy="220" 
                r="70" 
                fill="#DBEAFE" 
                stroke="#3B82F6" 
                strokeWidth="3"
                className="dark:fill-blue-900"
              >
                {!isReducedMotion && <animate attributeName="r" values="70;75;70" dur="4s" repeatCount="indefinite" />}
              </circle>
              <text 
                x="200" y="220" 
                textAnchor="middle" 
                fill="#1E40AF" 
                fontSize="20" 
                fontWeight="bold"
                className="dark:fill-blue-200"
              >
                T (Type Parameter)
              </text>
              
              {/* Arrow to concrete types */}
              <g>
                <line x1="200" y1="290" x2="200" y2="330" stroke="#3B82F6" strokeWidth="2">
                  {!isReducedMotion && <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1.5s" repeatCount="indefinite" />}
                </line>
                <polygon points="200,330 195,320 205,320" fill="#3B82F6" />
              </g>
              
              {/* Concrete Types */}
              {[
                { x: 150, y: 380, text: "String", color: "#10B981" },
                { x: 350, y: 380, text: "Integer", color: "#6366F1" },
                { x: 550, y: 380, text: "Student", color: "#EC4899" },
              ].map((type, i) => (
                <g key={type.text}>
                  <rect 
                    x={type.x - 60} y={type.y - 30} 
                    width="120" height="60" 
                    rx="10" 
                    fill={type.color + "20"} 
                    stroke={type.color} 
                    strokeWidth="2"
                    className="transition-all duration-300 hover:stroke-width-3"
                  >
                    {!isReducedMotion && <animate attributeName="y" values={`${type.y - 30};${type.y - 35};${type.y - 30}`} dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />}
                  </rect>
                  <text 
                    x={type.x} y={type.y + 5} 
                    textAnchor="middle" 
                    fill={type.color} 
                    fontSize="18" 
                    fontWeight="bold"
                    className="dark:fill-gray-200"
                  >
                    {type.text}
                  </text>
                </g>
              ))}
              
              {/* Labels */}
              <text x="200" y="40" textAnchor="middle" fill="#6B7280" fontSize="16" fontWeight="bold" className="dark:fill-gray-400">
                Compile Time
              </text>
              <text x="600" y="40" textAnchor="middle" fill="#6B7280" fontSize="16" fontWeight="bold" className="dark:fill-gray-400">
                Runtime
              </text>
            </svg>
          </div>
          
          <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-300 italic">
              Think of type parameters like labeled boxes in Ichapur's post office: 
              The label (T) tells postal workers what kind of items (String, Integer) should go inside. 
              During compilation, Java replaces T with actual types for type safety.
            </p>
          </div>
        </section>

        {/* COMMON MISTAKES & PITFALLS */}
        <section 
          ref={(el) => setRef("mistakes", el)}
          className={clsx(
            "mb-12",
            (isVisible.mistakes || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Common Mistakes & Pitfalls
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {commonMistakes.map((mistake, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-300 font-bold">!</span>
                  </div>
                  <h3 className="font-bold text-lg text-red-700 dark:text-red-300">{mistake.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{mistake.description}</p>
                <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mb-3">
                  {mistake.example}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>Impact:</strong> {mistake.impact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section 
          ref={(el) => setRef("practices", el)}
          className={clsx(
            "mb-12",
            (isVisible.practices || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Do This
              </h3>
              <ul className="space-y-3">
                {bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Avoid This
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Using lowercase letters (t, e, k, v)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Mixing conventions in same project</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Creating overly complex generic hierarchies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Ignoring IDE warnings about raw types</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* HINT SECTION */}
        <section 
          ref={(el) => setRef("hint", el)}
          className={clsx(
            "mb-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800",
            (isVisible.hint || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">💭 Critical Thinking Zone</h2>
          
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                "Why do you think Java uses single uppercase letters (T, E, K, V) instead of descriptive names for type parameters?"
              </p>
              <div className="pl-4 border-l-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: Consider compilation speed, type erasure, and the trade-off between brevity and clarity.
                </p>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                "Observe the Map interface method signatures. What makes <code>put(K key, V value)</code> more readable than <code>put(T key, T value)</code>?"
              </p>
              <div className="pl-4 border-l-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: Semantic meaning and self-documenting code.
                </p>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                "Try creating a generic class for Naihati College's library system. Which type parameters would you use for Book, Shelf, and LibraryCard?"
              </p>
              <div className="pl-4 border-l-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: Consider <code>Library&lt;T&gt;</code>, <code>Shelf&lt;E&gt;</code>, <code>Card&lt;K, V&gt;</code> based on context.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK CHECKLIST */}
        <section 
          ref={(el) => setRef("checklist", el)}
          className={clsx(
            "mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700",
            (isVisible.checklist || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.9s" }}
        >
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">📋 Quick Reference Checklist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Use T for general types",
              "Use E for collection elements",
              "Use K, V for key-value pairs",
              "Use N for numeric types",
              "Use R for return types",
              "Always uppercase single letters",
              "Follow Java Collections conventions",
              "Be consistent in your codebase",
              "Avoid non-standard names",
              "Document deviations clearly",
              "Respect established conventions",
              "Test generic code thoroughly"
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-blue-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              >
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TEACHER'S NOTE - Enhanced */}
        <section 
          ref={(el) => setRef("teacher", el)}
          className={clsx(
            "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800 hover:shadow-2xl transition-all duration-500",
            (isVisible.teacher || isReducedMotion) && "animate-fade-in-up hover-lift"
          )}
          style={{ animationDelay: "1s" }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-bold">SH</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-center">
                  <p className="font-bold text-amber-800 dark:text-amber-300">Sukanta Hui</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">27 Years Experience</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300">Teacher's Note</h3>
                <div className="px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-bold rounded-full">
                  Professional Insight
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Remember:</strong> Type parameter conventions are the unwritten rules of professional Java development. 
                  In my 27 years of teaching at colleges across Barrackpore and Shyamnagar, I've seen that students who master these conventions 
                  write code that's immediately understandable to any Java developer worldwide.
                </p>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Pro Tip for Students:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    When teaching at Naihati College, I use this simple rule: 
                    "If you're storing elements in a list, use <code>E</code>. If you're mapping keys to values, use <code>K, V</code>. 
                    For everything else, start with <code>T</code>." This mental model helps avoid confusion and makes your code self-documenting.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:sukantahui@codernaccotax.co.in" className="px-4 py-2 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors duration-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email: sukantahui@codernaccotax.co.in
                  </a>
                  <div className="px-4 py-2 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Mobile: 7003756860
                  </div>
                  <div className="px-4 py-2 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-lg">
                    Skills: Java, RDBMS, Web Development
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic7;