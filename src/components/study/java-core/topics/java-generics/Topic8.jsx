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

  // Simple syntax highlighting
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
      
      // Highlight generics and bounds
      highlighted = highlighted.replace(/&lt;[^&]+&gt;/g, (match) => {
        return match.replace(/(extends|super)/g, '<span class="text-blue-400 font-bold">$1</span>');
      });
      
      // Highlight class names
      highlighted = highlighted.replace(/\b(Number|Comparable|Runnable|Thread)\b/g, '<span class="text-cyan-400">$&</span>');
      
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

const Topic8 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [activeBoundType, setActiveBoundType] = useState("upper");
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

  // Code examples
  const boundedClassExample = `// Upper Bounded Type Parameter
public class NumberContainer<T extends Number> {
    private T number;
    
    public NumberContainer(T number) {
        this.number = number;
    }
    
    // Can safely call Number methods
    public double getDoubleValue() {
        return number.doubleValue();
    }
    
    public int getIntValue() {
        return number.intValue();
    }
}

// Usage in Shyamnagar Student Marks System
public class Main {
    public static void main(String[] args) {
        // ✅ Allowed - Integer extends Number
        NumberContainer<Integer> intBox = new NumberContainer<>(95);
        System.out.println("Marks: " + intBox.getDoubleValue());
        
        // ✅ Allowed - Double extends Number
        NumberContainer<Double> doubleBox = new NumberContainer<>(92.5);
        System.out.println("Percentage: " + doubleBox.getDoubleValue());
        
        // ❌ Compilation Error - String does NOT extend Number
        // NumberContainer<String> stringBox = new NumberContainer<>("Tuhina");
    }
}`;

  const multipleBoundsExample = `// Multiple Bounds with Interfaces
public class ComparableContainer<T extends Number & Comparable<T>> {
    private T value1;
    private T value2;
    
    public ComparableContainer(T value1, T value2) {
        this.value1 = value1;
        this.value2 = value2;
    }
    
    // Can use both Number and Comparable methods
    public T getMax() {
        return value1.compareTo(value2) >= 0 ? value1 : value2;
    }
    
    public double getSum() {
        return value1.doubleValue() + value2.doubleValue();
    }
}

// Real-world: Barrackpore Student Comparison System
public class StudentMarks {
    public static void main(String[] args) {
        // ✅ Allowed - Integer extends Number AND implements Comparable
        ComparableContainer<Integer> marks1 = new ComparableContainer<>(88, 95);
        System.out.println("Higher marks: " + marks1.getMax());
        
        // ✅ Allowed - Double extends Number AND implements Comparable
        ComparableContainer<Double> marks2 = new ComparableContainer<>(92.5, 89.0);
        System.out.println("Total marks: " + marks2.getSum());
        
        // Real scenario - Finding topper between Swadeep and Abhronila
        ComparableContainer<Double> swadeep = new ComparableContainer<>(92.5, 88.0);
        ComparableContainer<Double> abhronila = new ComparableContainer<>(95.0, 92.0);
        
        System.out.println("Swadeep's best: " + swadeep.getMax());
        System.out.println("Abhronila's total: " + abhronila.getSum());
    }
}`;

  const interfaceBoundExample = `// Interface as Bound
public class PrintableContainer<T extends Printable> {
    private T item;
    
    public PrintableContainer(T item) {
        this.item = item;
    }
    
    public void printDetails() {
        item.print();  // Can safely call print() method
    }
}

// Interface definition
interface Printable {
    void print();
}

// Concrete implementations
class Student implements Printable {
    private String name;
    private int marks;
    
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    
    @Override
    public void print() {
        System.out.println("Student: " + name + ", Marks: " + marks);
    }
}

class Book implements Printable {
    private String title;
    private String author;
    
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
    
    @Override
    public void print() {
        System.out.println("Book: " + title + " by " + author);
    }
}

// Usage in Naihati College Library
public class LibrarySystem {
    public static void main(String[] args) {
        PrintableContainer<Student> studentRecord = 
            new PrintableContainer<>(new Student("Debangshu", 91));
        studentRecord.printDetails();
        
        PrintableContainer<Book> bookRecord = 
            new PrintableContainer<>(new Book("Java Generics", "S. Hui"));
        bookRecord.printDetails();
    }
}`;

  const boundedMethodsExample = `// Bounded Type Parameters in Generic Methods
public class StatisticsCalculator {
    
    // Method with upper bound
    public static <T extends Number> double calculateAverage(T[] numbers) {
        double sum = 0.0;
        for (T num : numbers) {
            sum += num.doubleValue();  // Safe because T extends Number
        }
        return sum / numbers.length;
    }
    
    // Method with multiple bounds
    public static <T extends Comparable<T> & Number> T findMax(T[] array) {
        if (array == null || array.length == 0) return null;
        
        T max = array[0];
        for (T item : array) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }
    
    // Real-world: Ichapur School Marks Analysis
    public static void main(String[] args) {
        // Student marks analysis
        Integer[] marks = {88, 92, 85, 95, 90};
        Double[] percentages = {92.5, 88.0, 95.5, 91.0, 89.5};
        
        System.out.println("Average marks: " + calculateAverage(marks));
        System.out.println("Highest percentage: " + findMax(percentages));
        
        // Can also use with custom Number types
        Long[] attendance = {95L, 88L, 92L, 90L, 87L};
        System.out.println("Max attendance: " + findMax(attendance));
        
        // ❌ Won't compile - String doesn't extend Number
        // String[] names = {"Swadeep", "Tuhina"};
        // calculateAverage(names);  // Compilation Error
    }
}`;

  const commonMistakesCode = `// ❌ COMMON MISTAKES - Bounded Type Parameters

// Mistake 1: Wrong bound syntax
public class WrongSyntax1<T implements Comparable<T>> {  // ❌ WRONG
    // Should use 'extends' for interfaces too
}

// ✅ CORRECT
public class CorrectSyntax1<T extends Comparable<T>> {  // ✅ CORRECT
    // This is the right way
}

// Mistake 2: Using class after interface in multiple bounds
public class WrongSyntax2<T extends Runnable & String> {  // ❌ WRONG
    // Class must come first, then interfaces
}

// ✅ CORRECT
public class CorrectSyntax2<T extends String & Runnable> {  // ✅ CORRECT (if String was not final)
    // Actually, String is final, so this wouldn't work anyway
}

// Mistake 3: Real example - trying to use bounds with primitive types
public class Mistake3 {
    public static <T extends Number> void process(T num) {
        // Code here
    }
    
    public static void main(String[] args) {
        process(10);     // ❌ Wrong - primitive int
        process(new Integer(10));  // ✅ Correct - wrapper class
    }
}

// Mistake 4: Overly restrictive bounds
public class Library<T extends Book & Printable & Comparable<T> & Cloneable> {
    // ❌ Too many bounds - makes class hard to use
    // Very few types will satisfy all these constraints
}

// ✅ Better approach
public class Library<T extends Book & Printable> {
    // Reasonable constraints that many classes can satisfy
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
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes highlightGlow {
            0%, 100% { box-shadow: 0 0 0px 0px rgba(59, 130, 246, 0); }
            50% { box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.3); }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out forwards;
          }
          
          .hover-lift:hover {
            transform: translateY(-4px);
          }
          
          .highlight-glow {
            animation: highlightGlow 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        {/* HEADER */}
        <header className="mb-12" ref={(el) => setRef("header", el)}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center ${!isReducedMotion ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Bounded Type Parameters in Java Generics
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Restricting type parameters with bounds for type safety and method access
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              Type Safety
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              Upper Bounds
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
              Method Access
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm">
              Real Examples
            </span>
          </div>
        </header>

        {/* INTRODUCTION */}
        <section
          ref={(el) => setRef("intro", el)}
          className={clsx(
            "mb-12 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl",
            (isVisible.intro || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            What are Bounded Type Parameters?
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bounded type parameters <strong className="text-green-600 dark:text-green-400">restrict</strong> the types that can be used as type arguments in a generic class or method. They use the <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono">extends</code> keyword to specify that a type parameter must be a subtype of some boundary class or interface.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border-l-4 border-green-500">
              <p className="italic text-gray-600 dark:text-gray-300">
                <strong>Real-world analogy:</strong> Think of bounded type parameters like age restrictions in Barrackpore's public library - 
                you can only borrow certain books (use certain methods) if you're above a certain age (meet the type bound). 
                The <code>extends</code> keyword acts as the librarian checking your ID.
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In Java, when you declare <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono">&lt;T extends Number&gt;</code>, 
              you're telling the compiler: "T can be any type, but it must be a subclass of Number." This allows you to safely call 
              Number methods like <code>doubleValue()</code> or <code>intValue()</code> on instances of T.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Why Use Bounds?</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Access specific methods safely</li>
                  <li>• Enforce type constraints at compile time</li>
                  <li>• Prevent invalid type arguments</li>
                  <li>• Enable polymorphic behavior</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Key Benefits</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Compile-time type checking</li>
                  <li>• Eliminates casting</li>
                  <li>• Improves code readability</li>
                  <li>• Enables method calls on generic types</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Common Use Cases</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Number operations (math utilities)</li>
                  <li>• Comparable types (sorting)</li>
                  <li>• Collection restrictions</li>
                  <li>• Framework constraints</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TYPES OF BOUNDS - Interactive Visualization */}
        <section 
          ref={(el) => setRef("bounds", el)}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            Types of Bounds
          </h2>

          {/* Interactive Tabs */}
          <div className="mb-8">
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {["upper", "multiple", "interface"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveBoundType(type)}
                  className={clsx(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                    activeBoundType === type
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {type === "upper" && "Upper Bounds (T extends Class)"}
                  {type === "multiple" && "Multiple Bounds"}
                  {type === "interface" && "Interface Bounds"}
                </button>
              ))}
            </div>

            {/* Content for each bound type */}
            <div className={clsx(
              "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border transition-all duration-500",
              activeBoundType === "upper" && "border-green-200 dark:border-green-800",
              activeBoundType === "multiple" && "border-blue-200 dark:border-blue-800",
              activeBoundType === "interface" && "border-purple-200 dark:border-purple-800"
            )}>
              {activeBoundType === "upper" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Upper Bounds</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Specifies that T must be a <strong>subtype</strong> of a given class or interface. 
                    This is the most common type of bound.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <code className="text-green-600 dark:text-green-300 font-mono">
                      public class Container&lt;T extends Number&gt; {"{"} ... {"}"}
                    </code>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Accepts: Integer, Double, Float, Long, etc.<br/>
                      Rejects: String, Boolean, Object (unless they extend Number)
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Example:</strong> In Shyamnagar's student database, we want a marks container 
                    that only accepts numeric types to calculate averages.
                  </div>
                </div>
              )}

              {activeBoundType === "multiple" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Multiple Bounds</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Specifies that T must satisfy <strong>multiple</strong> constraints. 
                    Class must come first, then interfaces.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <code className="text-blue-600 dark:text-blue-300 font-mono">
                      public class Container&lt;T extends Number & Comparable&lt;T&gt;&gt; {"{"} ... {"}"}
                    </code>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Accepts types that: extend Number AND implement Comparable<br/>
                      Example: Integer, Double (both extend Number and implement Comparable)
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Example:</strong> In Naihati College, we need student records that can be 
                    both stored as numbers and compared for ranking.
                  </div>
                </div>
              )}

              {activeBoundType === "interface" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">Interface Bounds</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Specifies that T must <strong>implement</strong> a given interface. 
                    Uses <code>extends</code> keyword even for interfaces.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <code className="text-purple-600 dark:text-purple-300 font-mono">
                      public class Container&lt;T extends Comparable&lt;T&gt;&gt; {"{"} ... {"}"}
                    </code>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Accepts: Integer, String, Date (all implement Comparable)<br/>
                      Rejects: types that don't implement Comparable
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Example:</strong> In Barrackpore's library system, we want items 
                    that can be compared for sorting (books by title, students by name).
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visual Hierarchy Diagram */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">Type Hierarchy with Bounds</h3>
            
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-auto"
              onMouseEnter={() => setActiveCard("hierarchy")}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Base Class */}
              <rect 
                x="350" y="50" 
                width="200" height="80" 
                rx="10" 
                fill="#DBEAFE" 
                stroke="#3B82F6" 
                strokeWidth="3"
                className="dark:fill-blue-900 transition-all duration-500"
              />
              <text 
                x="450" y="95" 
                textAnchor="middle" 
                fill="#1E40AF" 
                fontSize="20" 
                fontWeight="bold"
                className="dark:fill-blue-200"
              >
                Number
              </text>
              
              {/* Upper Bound Arrow */}
              <g>
                <line x1="450" y1="130" x2="450" y2="180" stroke="#3B82F6" strokeWidth="2">
                  {!isReducedMotion && <animate attributeName="stroke-dashoffset" from="50" to="0" dur="2s" repeatCount="indefinite" />}
                </line>
                <polygon points="450,180 445,170 455,170" fill="#3B82F6" />
              </g>
              
              {/* Bound Label */}
              <rect 
                x="320" y="185" 
                width="260" height="50" 
                rx="8" 
                fill="#FEF3C7" 
                stroke="#F59E0B" 
                strokeWidth="2"
                className="dark:fill-yellow-900"
              >
                {!isReducedMotion && <animate attributeName="opacity" values="1;0.9;1" dur="3s" repeatCount="indefinite" />}
              </rect>
              <text 
                x="450" y="218" 
                textAnchor="middle" 
                fill="#92400E" 
                fontSize="18" 
                fontWeight="bold"
                className="dark:fill-yellow-200"
              >
                &lt;T extends Number&gt;
              </text>
              
              {/* Arrow to Subclasses */}
              <g>
                <line x1="450" y1="235" x2="450" y2="280" stroke="#3B82F6" strokeWidth="2">
                  {!isReducedMotion && <animate attributeName="stroke-dashoffset" from="45" to="0" dur="1.5s" repeatCount="indefinite" />}
                </line>
                <polygon points="450,280 445,270 455,270" fill="#3B82F6" />
              </g>
              
              {/* Allowed Subclasses */}
              <g>
                {[
                  { x: 150, y: 320, text: "Integer", color: "#10B981" },
                  { x: 350, y: 320, text: "Double", color: "#6366F1" },
                  { x: 550, y: 320, text: "Float", color: "#EC4899" },
                  { x: 750, y: 320, text: "Long", color: "#F59E0B" },
                ].map((type, i) => (
                  <g key={type.text}>
                    <rect 
                      x={type.x - 50} y={type.y - 30} 
                      width="100" height="60" 
                      rx="10" 
                      fill={type.color + "30"} 
                      stroke={type.color} 
                      strokeWidth="2"
                      className="transition-all duration-300 hover:stroke-width-3"
                    >
                      {!isReducedMotion && <animate attributeName="y" values={`${type.y - 30};${type.y - 35};${type.y - 30}`} dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />}
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
                    {/* Check mark */}
                    <circle cx={type.x - 30} cy={type.y - 10} r="8" fill="#10B981">
                      {!isReducedMotion && <animate attributeName="r" values="8;10;8" dur="1.5s" repeatCount="indefinite" />}
                    </circle>
                    <text x={type.x - 30} y={type.y - 7} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✓</text>
                  </g>
                ))}
              </g>
              
              {/* Rejected Types */}
              <g>
                {[
                  { x: 150, y: 420, text: "String", color: "#DC2626" },
                  { x: 350, y: 420, text: "Boolean", color: "#DC2626" },
                  { x: 550, y: 420, text: "Object", color: "#DC2626" },
                ].map((type, i) => (
                  <g key={type.text}>
                    <rect 
                      x={type.x - 50} y={type.y - 30} 
                      width="100" height="60" 
                      rx="10" 
                      fill="#FEE2E2" 
                      stroke="#DC2626" 
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="dark:fill-red-900/30"
                    >
                      {!isReducedMotion && <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />}
                    </rect>
                    <text 
                      x={type.x} y={type.y + 5} 
                      textAnchor="middle" 
                      fill="#DC2626" 
                      fontSize="18" 
                      fontWeight="bold"
                      className="dark:fill-red-300"
                    >
                      {type.text}
                    </text>
                    {/* X mark */}
                    <circle cx={type.x - 30} cy={type.y - 10} r="8" fill="#DC2626">
                      {!isReducedMotion && <animate attributeName="r" values="8;9;8" dur="1.5s" repeatCount="indefinite" />}
                    </circle>
                    <text x={type.x - 30} y={type.y - 7} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✗</text>
                  </g>
                ))}
              </g>
              
              {/* Labels */}
              <text x="450" y="40" textAnchor="middle" fill="#6B7280" fontSize="16" fontWeight="bold" className="dark:fill-gray-400">
                Bound Definition
              </text>
              <text x="450" y="305" textAnchor="middle" fill="#6B7280" fontSize="16" fontWeight="bold" className="dark:fill-gray-400">
                Allowed Types
              </text>
              <text x="450" y="405" textAnchor="middle" fill="#6B7280" fontSize="16" fontWeight="bold" className="dark:fill-gray-400">
                Rejected Types
              </text>
            </svg>
            
            <p className="mt-6 text-center text-gray-600 dark:text-gray-300 italic">
              Just like a librarian in Ichapur only allows certain age groups for different book sections, 
              bounded type parameters restrict which types can be used, ensuring type safety at compile time.
            </p>
          </div>
        </section>

        {/* CODE EXAMPLES */}
        <section 
          ref={(el) => setRef("examples", el)}
          className={clsx(
            "mb-12 space-y-8",
            (isVisible.examples || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <div>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">Practical Code Examples</h2>
            
            <div className="space-y-8">
              {/* Example 1: Upper Bounded Class */}
              <div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Upper Bounded Class Example
                </h3>
                <JavaCodeBlock 
                  code={boundedClassExample}
                  title="NumberContainer.java"
                  highlightLines={[2, 4, 11, 12, 17, 20, 26]}
                />
              </div>

              {/* Example 2: Multiple Bounds */}
              <div>
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Multiple Bounds Example
                </h3>
                <JavaCodeBlock 
                  code={multipleBoundsExample}
                  title="ComparableContainer.java"
                  highlightLines={[2, 3, 4, 11, 12, 20, 21, 28, 29]}
                />
              </div>

              {/* Example 3: Interface Bound */}
              <div>
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Interface Bound Example
                </h3>
                <JavaCodeBlock 
                  code={interfaceBoundExample}
                  title="PrintableContainer.java"
                  highlightLines={[2, 4, 8, 13, 18, 19, 31, 32, 37, 38]}
                />
              </div>

              {/* Example 4: Bounded Methods */}
              <div>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Bounded Type Methods
                </h3>
                <JavaCodeBlock 
                  code={boundedMethodsExample}
                  title="StatisticsCalculator.java"
                  highlightLines={[4, 5, 11, 12, 13, 22, 23, 29, 30]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* COMMON MISTAKES & PITFALLS */}
        <section 
          ref={(el) => setRef("mistakes", el)}
          className={clsx(
            "mb-12",
            (isVisible.mistakes || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Common Mistakes & Pitfalls
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 dark:text-red-300 font-bold">1</span>
                </div>
                <h3 className="font-bold text-lg text-red-700 dark:text-red-300">Using "implements" instead of "extends"</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                For interfaces, you still use the <code>extends</code> keyword, not <code>implements</code>.
              </p>
              <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded-lg">
                ❌ &lt;T implements Comparable&gt;<br/>
                ✅ &lt;T extends Comparable&gt;
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 dark:text-yellow-300 font-bold">2</span>
                </div>
                <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300">Wrong order in multiple bounds</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Class must come first, then interfaces. You can have only one class bound.
              </p>
              <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded-lg">
                ❌ &lt;T extends Runnable & String&gt;<br/>
                ✅ &lt;T extends String & Runnable&gt;
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 dark:text-orange-300 font-bold">3</span>
                </div>
                <h3 className="font-bold text-lg text-orange-700 dark:text-orange-300">Using primitive types with bounds</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Bounds only work with reference types. Use wrapper classes instead of primitives.
              </p>
              <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded-lg">
                ❌ process(10)  // primitive int<br/>
                ✅ process(new Integer(10))  // wrapper
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 dark:text-pink-300 font-bold">4</span>
                </div>
                <h3 className="font-bold text-lg text-pink-700 dark:text-pink-300">Overly restrictive bounds</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Too many bounds make the class unusable. Keep bounds minimal and meaningful.
              </p>
              <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded-lg">
                ❌ &lt;T extends A & B & C & D&gt;<br/>
                ✅ &lt;T extends A & B&gt;  // Keep it simple
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">Complete Mistake Example</h3>
            <JavaCodeBlock 
              code={commonMistakesCode}
              title="CommonMistakes.java"
              highlightLines={[3, 8, 13, 19, 25, 27, 30, 35]}
            />
          </div>
        </section>

        {/* BEST PRACTICES & PROFESSIONAL TIPS */}
        <section 
          ref={(el) => setRef("practices", el)}
          className={clsx(
            "mb-12",
            (isVisible.practices || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">Best Practices & Professional Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Do This
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Use bounds when you need to call specific methods</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Start with the least restrictive bound needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Use wildcards for maximum flexibility in APIs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Document why bounds are needed in complex cases</span>
                </li>
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
                  <span className="text-gray-700 dark:text-gray-300">Adding bounds "just in case" - be intentional</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Using final classes as bounds (they have no subclasses)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Creating overly complex inheritance chains</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Forgetting about autoboxing with primitive wrappers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Tips */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Professional Tips from Industry
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">Performance Tip</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use bounded type parameters instead of casting. The compiler can optimize bounded types better than runtime casts.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2">API Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  When designing libraries, prefer wildcards over bounded parameters for method parameters to increase flexibility.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Debugging</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  If you get "incompatible types" errors, check your bounds. They might be too restrictive or in wrong order.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Testing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Always test with boundary cases: types that just meet the bound and types that should fail compilation.
                </p>
              </div>
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
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">💭 Critical Thinking Zone</h2>
          
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                "Why does Java use 'extends' for both classes and interfaces in bounds, instead of 'implements' for interfaces?"
              </p>
              <div className="pl-4 border-l-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: Think about type theory, PECS (Producer Extends Consumer Super), and consistency in the type system.
                </p>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                "Design a generic class for Barrackpore College's student ranking system. What bounds would you use and why?"
              </p>
              <div className="pl-4 border-l-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: Consider <code>Comparable</code> for ranking, <code>Number</code> for marks, and maybe custom interfaces.
                </p>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                "What happens if you try to use a bounded type parameter with a wildcard? Try: <code>List&lt;? extends Number&gt;</code>"
              </p>
              <div className="pl-4 border-l-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: Wildcards provide flexibility but have restrictions on what you can add to the collection.
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
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">📋 Quick Reference Checklist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Use extends for both classes and interfaces",
              "Class first, then interfaces in multiple bounds",
              "Only one class allowed in bounds",
              "Use wildcards for method parameters when possible",
              "Bounds enable method calls on generic types",
              "Compile-time type safety with bounds",
              "Avoid overly restrictive bounds",
              "Use wrapper classes, not primitives",
              "Document bounds purpose in complex code",
              "Test with boundary cases",
              "Consider performance implications",
              "Follow PECS principle in collections"
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-green-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300"
              >
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TEACHER'S NOTE */}
        <section 
          ref={(el) => setRef("teacher", el)}
          className={clsx(
            "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800 hover:shadow-2xl transition-all duration-500",
            (isVisible.teacher || isReducedMotion) && "animate-fade-in-up hover-lift"
          )}
          style={{ animationDelay: "0.9s" }}
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
                  <strong>Remember:</strong> Bounded type parameters are like setting rules for a game. In my 27 years teaching at Naihati College, 
                  I've seen students struggle when they add too many rules (bounds) or the wrong rules. Start simple: only add bounds when you 
                  absolutely need to call specific methods on the generic type.
                </p>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Pro Tip for Students:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    When teaching at Shyamnagar College, I use this analogy: "Bounds are like ID checks at Barrackpore's library - 
                    they ensure only qualified types (students with library cards) can access certain methods (borrow certain books). 
                    Don't make the ID check too strict, or no one will get in!"
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

export default Topic8;