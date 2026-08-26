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
      
      // Highlight wildcards and generics
      highlighted = highlighted.replace(/\?/g, '<span class="text-blue-400 font-bold">?</span>');
      highlighted = highlighted.replace(/(extends|super)/g, '<span class="text-pink-500 font-bold">$1</span>');
      highlighted = highlighted.replace(/&lt;[^&]+&gt;/g, '<span class="text-cyan-400">$&</span>');
      
      // Highlight collection classes
      highlighted = highlighted.replace(/\b(List|ArrayList|Collection|Set|Map)\b/g, '<span class="text-emerald-400">$&</span>');
      
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

const Topic10 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [activeConcept, setActiveConcept] = useState("what");
  const [activeExample, setActiveExample] = useState("basic");
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

  // Code examples
  const basicWildcardExample = `// Upper Bounded Wildcard Example
import java.util.*;

public class StudentMarksProcessor {
    
    // Method with upper bounded wildcard
    // Can accept List of any type that extends Number
    public static double calculateAverage(List<? extends Number> numbers) {
        if (numbers == null || numbers.isEmpty()) {
            return 0.0;
        }
        
        double sum = 0.0;
        for (Number num : numbers) {
            sum += num.doubleValue();  // Safe because all are Numbers
        }
        return sum / numbers.size();
    }
    
    // Another example: Process different numeric lists
    public static void printNumberDetails(List<? extends Number> numbers) {
        System.out.println("Processing " + numbers.size() + " numbers:");
        for (Number num : numbers) {
            System.out.println("  Value: " + num + ", Type: " + num.getClass().getSimpleName());
        }
    }
}

// Usage in Barrackpore College System
public class CollegeApplication {
    public static void main(String[] args) {
        // ✅ Allowed: List<Integer> - Integer extends Number
        List<Integer> studentMarks = Arrays.asList(88, 92, 85, 95, 90);
        double avgMarks = StudentMarksProcessor.calculateAverage(studentMarks);
        System.out.println("Average marks: " + avgMarks);
        
        // ✅ Allowed: List<Double> - Double extends Number
        List<Double> percentages = Arrays.asList(92.5, 88.0, 95.5, 91.0, 89.5);
        double avgPercentage = StudentMarksProcessor.calculateAverage(percentages);
        System.out.println("Average percentage: " + avgPercentage);
        
        // ✅ Allowed: List<Float> - Float extends Number
        List<Float> floatValues = Arrays.asList(1.5f, 2.3f, 3.7f);
        StudentMarksProcessor.printNumberDetails(floatValues);
        
        // ✅ Allowed: List<Long> - Long extends Number
        List<Long> attendance = Arrays.asList(95L, 88L, 92L, 90L, 87L);
        double avgAttendance = StudentMarksProcessor.calculateAverage(attendance);
        System.out.println("Average attendance: " + avgAttendance);
        
        // Real scenario: Processing marks from different branches
        System.out.println("\\nProcessing marks from Shyamnagar College:");
        List<Integer> shyamnagarMarks = Arrays.asList(85, 92, 78, 95, 88);
        StudentMarksProcessor.printNumberDetails(shyamnagarMarks);
        
        System.out.println("\\nProcessing marks from Naihati College:");
        List<Double> naihatiPercentages = Arrays.asList(94.5, 87.0, 91.5, 96.0, 89.5);
        StudentMarksProcessor.printNumberDetails(naihatiPercentages);
        
        // ❌ NOT Allowed: List<String> - String doesn't extend Number
        // List<String> names = Arrays.asList("Swadeep", "Tuhina", "Abhronila");
        // StudentMarksProcessor.calculateAverage(names); // Compilation error
    }
}`;

  const classHierarchyExample = `// Upper Bounded Wildcards with Class Hierarchy
import java.util.*;

// Class hierarchy for Barrackpore College
class CollegePerson {
    protected String name;
    
    public CollegePerson(String name) {
        this.name = name;
    }
    
    public String getName() { return name; }
    
    public void introduce() {
        System.out.println("I am " + name);
    }
}

class Student extends CollegePerson {
    private int rollNumber;
    
    public Student(String name, int roll) {
        super(name);
        this.rollNumber = roll;
    }
    
    public int getRollNumber() { return rollNumber; }
    
    @Override
    public void introduce() {
        System.out.println("Student: " + name + " (Roll: " + rollNumber + ")");
    }
}

class Teacher extends CollegePerson {
    private String subject;
    
    public Teacher(String name, String subject) {
        super(name);
        this.subject = subject;
    }
    
    public String getSubject() { return subject; }
    
    @Override
    public void introduce() {
        System.out.println("Teacher: " + name + " (Subject: " + subject + ")");
    }
}

class Staff extends CollegePerson {
    private String department;
    
    public Staff(String name, String department) {
        super(name);
        this.department = department;
    }
    
    public String getDepartment() { return department; }
    
    @Override
    public void introduce() {
        System.out.println("Staff: " + name + " (Dept: " + department + ")");
    }
}

// Processor using upper bounded wildcards
public class CollegeProcessor {
    
    // Can process any list of CollegePerson or its subclasses
    public static void introduceAll(List<? extends CollegePerson> people) {
        System.out.println("\\nIntroducing College Members:");
        for (CollegePerson person : people) {
            person.introduce();
        }
    }
    
    // Can extract names from any CollegePerson list
    public static List<String> getAllNames(List<? extends CollegePerson> people) {
        List<String> names = new ArrayList<>();
        for (CollegePerson person : people) {
            names.add(person.getName());
        }
        return names;
    }
    
    // Count specific type using instanceof
    public static int countStudents(List<? extends CollegePerson> people) {
        int count = 0;
        for (CollegePerson person : people) {
            if (person instanceof Student) {
                count++;
            }
        }
        return count;
    }
}

// Usage
public class CollegeManagement {
    public static void main(String[] args) {
        // Create lists of different types
        List<Student> students = Arrays.asList(
            new Student("Debangshu", 101),
            new Student("Tuhina", 102),
            new Student("Swadeep", 103)
        );
        
        List<Teacher> teachers = Arrays.asList(
            new Teacher("Sukanta Hui", "Java Programming"),
            new Teacher("Ananya Das", "Data Structures")
        );
        
        List<Staff> staffMembers = Arrays.asList(
            new Staff("Rajesh Kumar", "Administration"),
            new Staff("Priya Sharma", "Library")
        );
        
        List<CollegePerson> allPeople = new ArrayList<>();
        allPeople.addAll(students);
        allPeople.addAll(teachers);
        allPeople.addAll(staffMembers);
        
        // ✅ Allowed: Process students (Student extends CollegePerson)
        CollegeProcessor.introduceAll(students);
        System.out.println("Student names: " + CollegeProcessor.getAllNames(students));
        
        // ✅ Allowed: Process teachers (Teacher extends CollegePerson)
        CollegeProcessor.introduceAll(teachers);
        System.out.println("Teacher names: " + CollegeProcessor.getAllNames(teachers));
        
        // ✅ Allowed: Process staff (Staff extends CollegePerson)
        CollegeProcessor.introduceAll(staffMembers);
        
        // ✅ Allowed: Process mixed list (CollegePerson itself)
        CollegeProcessor.introduceAll(allPeople);
        System.out.println("Total students: " + CollegeProcessor.countStudents(allPeople));
        
        // Real scenario: Ichapur College branch
        List<Student> ichapurStudents = Arrays.asList(
            new Student("Abhronila", 201),
            new Student("Rohit", 202),
            new Student("Sneha", 203)
        );
        
        System.out.println("\\nIchapur College Students:");
        CollegeProcessor.introduceAll(ichapurStudents);
        
        // ❌ NOT Allowed: Adding to upper bounded collection
        // List<? extends CollegePerson> peopleList = new ArrayList<Student>();
        // peopleList.add(new Student("New", 999)); // Compilation error - can't add
        
        // ✅ Allowed: Reading from upper bounded collection
        List<? extends CollegePerson> readOnlyList = students;
        CollegePerson first = readOnlyList.get(0); // Can read
        System.out.println("First person: " + first.getName());
    }
}`;

  const genericClassWildcardExample = `// Upper Bounded Wildcards in Generic Classes
import java.util.*;

// Generic container that can hold any type extending Number
class NumberContainer<T extends Number> {
    private List<T> numbers;
    
    public NumberContainer() {
        numbers = new ArrayList<>();
    }
    
    public void add(T number) {
        numbers.add(number);
    }
    
    public T get(int index) {
        return numbers.get(index);
    }
    
    public int size() {
        return numbers.size();
    }
    
    // Method using upper bounded wildcard parameter
    public void addAllFrom(NumberContainer<? extends T> other) {
        for (int i = 0; i < other.size(); i++) {
            this.add(other.get(i)); // Safe: ? extends T means it's a subtype of T
        }
    }
    
    // Method returning upper bounded wildcard
    public List<? extends Number> getAllAsNumbers() {
        return new ArrayList<>(numbers);
    }
    
    public double calculateSum() {
        double sum = 0.0;
        for (T num : numbers) {
            sum += num.doubleValue();
        }
        return sum;
    }
}

// Processor class with wildcard methods
public class NumberProcessor {
    
    // Static method with upper bounded wildcard
    public static double processContainer(NumberContainer<? extends Number> container) {
        System.out.println("Processing container with " + container.size() + " numbers");
        return container.calculateSum();
    }
    
    // Compare two containers of possibly different but related types
    public static boolean compareContainers(
            NumberContainer<? extends Number> container1,
            NumberContainer<? extends Number> container2) {
        
        return container1.calculateSum() == container2.calculateSum();
    }
    
    // Merge multiple containers
    public static NumberContainer<Number> mergeContainers(
            NumberContainer<? extends Number>... containers) {
        
        NumberContainer<Number> result = new NumberContainer<>();
        for (NumberContainer<? extends Number> container : containers) {
            for (int i = 0; i < container.size(); i++) {
                result.add(container.get(i));
            }
        }
        return result;
    }
}

// Usage in Shyamnagar College Marks System
public class MarksContainerSystem {
    public static void main(String[] args) {
        // Create containers for different numeric types
        NumberContainer<Integer> integerContainer = new NumberContainer<>();
        integerContainer.add(88);
        integerContainer.add(92);
        integerContainer.add(85);
        
        NumberContainer<Double> doubleContainer = new NumberContainer<>();
        doubleContainer.add(92.5);
        doubleContainer.add(88.0);
        doubleContainer.add(95.5);
        
        NumberContainer<Float> floatContainer = new NumberContainer<>();
        floatContainer.add(1.5f);
        floatContainer.add(2.3f);
        floatContainer.add(3.7f);
        
        // Process each container using wildcard method
        System.out.println("Integer container sum: " + 
            NumberProcessor.processContainer(integerContainer));
        
        System.out.println("Double container sum: " + 
            NumberProcessor.processContainer(doubleContainer));
        
        System.out.println("Float container sum: " + 
            NumberProcessor.processContainer(floatContainer));
        
        // Compare containers
        boolean sameSum = NumberProcessor.compareContainers(integerContainer, doubleContainer);
        System.out.println("Do containers have same sum? " + sameSum);
        
        // Merge containers
        NumberContainer<Number> merged = NumberProcessor.mergeContainers(
            integerContainer, doubleContainer, floatContainer);
        
        System.out.println("\\nMerged container (" + merged.size() + " items):");
        System.out.println("Total sum: " + merged.calculateSum());
        
        // Real scenario: Student marks from different semesters
        NumberContainer<Integer> semester1 = new NumberContainer<>();
        semester1.add(85);
        semester1.add(92);
        semester1.add(78);
        
        NumberContainer<Integer> semester2 = new NumberContainer<>();
        semester2.add(88);
        semester2.add(95);
        semester2.add(91);
        
        // Transfer marks from semester1 to a combined container
        NumberContainer<Integer> combined = new NumberContainer<>();
        combined.addAllFrom(semester1);
        combined.addAllFrom(semester2);
        
        System.out.println("\\nCombined marks container:");
        System.out.println("Total marks: " + combined.calculateSum());
        System.out.println("Average: " + (combined.calculateSum() / combined.size()));
        
        // Using wildcard return type
        List<? extends Number> numbers = combined.getAllAsNumbers();
        System.out.println("\\nAll marks as Numbers:");
        for (Number num : numbers) {
            System.out.println("Mark: " + num);
        }
        
        // ❌ NOT Allowed: Adding incompatible types
        // NumberContainer<? extends Number> wildcardContainer = integerContainer;
        // wildcardContainer.add(100); // Compilation error - can't add
        
        // ✅ Allowed: Reading from wildcard container
        NumberContainer<? extends Number> readContainer = integerContainer;
        Number firstNumber = readContainer.get(0); // Can read
        System.out.println("\\nFirst number from read container: " + firstNumber);
    }
}`;

  const commonMistakesExample = `// ❌ COMMON MISTAKES with Upper Bounded Wildcards

import java.util.*;

public class WildcardMistakes {
    
    // MISTAKE 1: Trying to add to upper bounded collection
    public static void mistake1() {
        List<? extends Number> numbers = new ArrayList<Integer>();
        
        // ❌ WRONG - Can't add to upper bounded wildcard collection
        // numbers.add(10);                    // Compilation error
        // numbers.add(new Integer(20));       // Compilation error
        // numbers.add(new Double(3.14));      // Compilation error
        
        // ✅ CORRECT - Can only read from upper bounded collections
        List<Integer> intList = new ArrayList<>();
        intList.add(10);
        intList.add(20);
        
        List<? extends Number> readableNumbers = intList;
        Number first = readableNumbers.get(0);  // ✅ Can read
        System.out.println("First number: " + first);
    }
    
    // MISTAKE 2: Confusing extends with super
    public static void mistake2() {
        List<Integer> integers = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);
        
        // ✅ CORRECT: Upper bounded for reading
        printNumbers(integers);   // Works: Integer extends Number
        printNumbers(doubles);    // Works: Double extends Number
        
        // ❌ WRONG: Trying to use upper bounded where lower bounded is needed
        // addNumber(integers, 10);  // Would need List<? super Integer>
        
        // Understanding the difference:
        // List<? extends Number> - Producer (get values)
        // List<? super Integer>   - Consumer (add values)
    }
    
    // MISTAKE 3: Overusing wildcards
    public static void mistake3() {
        // ❌ Overly complex - hard to read and maintain
        Map<? extends Comparable<?>, ? extends List<? extends Number>> complexMap;
        
        // ✅ Better - use meaningful type parameters
        Map<String, List<Integer>> simpleMap = new HashMap<>();
        simpleMap.put("marks", Arrays.asList(85, 92, 88));
        
        // Or if you need flexibility, use bounded type parameters
        class FlexibleContainer<K extends Comparable<K>, V extends Number> {
            private Map<K, List<V>> data = new HashMap<>();
            
            public void add(K key, V value) {
                data.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
            }
            
            public List<V> get(K key) {
                return data.get(key);
            }
        }
    }
    
    // MISTAKE 4: Forgetting type safety
    public static void mistake4() {
        // ❌ This compiles but is unsafe
        List rawList = new ArrayList();
        rawList.add("String");
        rawList.add(10);
        
        // ❌ This bypasses generic safety
        List<? extends Number> numbers = rawList; // Unchecked warning
        
        // ✅ Always use generics properly
        List<Integer> safeList = new ArrayList<>();
        safeList.add(10);
        // safeList.add("String"); // Compilation error - type safe!
        
        List<? extends Number> safeNumbers = safeList; // No warnings
    }
    
    // MISTAKE 5: Misunderstanding PECS (Producer Extends, Consumer Super)
    public static void mistake5() {
        // Producer example - use extends
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);
        
        double intSum = sumOfList(ints);     // Producer: provides Numbers
        double doubleSum = sumOfList(doubles); // Producer: provides Numbers
        
        // Consumer example - would use super (not shown here)
        // List<? super Integer> consumerList = new ArrayList<Number>();
        // consumerList.add(10); // Can add Integers
        
        System.out.println("Integer sum: " + intSum);
        System.out.println("Double sum: " + doubleSum);
    }
    
    // Helper methods
    public static void printNumbers(List<? extends Number> numbers) {
        for (Number n : numbers) {
            System.out.println(n);
        }
    }
    
    public static double sumOfList(List<? extends Number> numbers) {
        double sum = 0.0;
        for (Number n : numbers) {
            sum += n.doubleValue();
        }
        return sum;
    }
    
    // Real debugging example from Barrackpore College project
    public static void realWorldMistake() {
        // Student marks processing system
        class MarksProcessor {
            // ❌ Common beginner mistake
            public void processMarksWrong(List<? extends Number> marks) {
                // Can't add to marks - compilation error
                // marks.add(95);
                // marks.add(88.5);
                
                // Can only read
                for (Number mark : marks) {
                    System.out.println("Mark: " + mark);
                }
            }
            
            // ✅ Correct approach for processing
            public double calculateAverage(List<? extends Number> marks) {
                if (marks == null || marks.isEmpty()) return 0.0;
                
                double sum = 0.0;
                for (Number mark : marks) {
                    sum += mark.doubleValue();
                }
                return sum / marks.size();
            }
            
            // ✅ Alternative: Use type parameter for adding
            public <T extends Number> void addAndProcess(List<T> marks, T newMark) {
                marks.add(newMark);  // Can add because we know exact type
                System.out.println("Added mark: " + newMark);
                System.out.println("New average: " + calculateAverage(marks));
            }
        }
        
        // Usage
        MarksProcessor processor = new MarksProcessor();
        List<Integer> studentMarks = new ArrayList<>(Arrays.asList(85, 92, 88));
        
        System.out.println("Initial average: " + 
            processor.calculateAverage(studentMarks));
        
        processor.addAndProcess(studentMarks, 95);
        
        // Show final marks
        System.out.println("\\nFinal marks: " + studentMarks);
    }
    
    public static void main(String[] args) {
        System.out.println("=== Common Mistakes Demo ===");
        mistake1();
        mistake5();
        realWorldMistake();
    }
}`;

  const advancedWildcardExample = `// Advanced Upper Bounded Wildcard Patterns
import java.util.*;

public class AdvancedWildcardPatterns {
    
    // PATTERN 1: Nested wildcards
    public static double processNestedLists(List<List<? extends Number>> nestedLists) {
        double total = 0.0;
        int count = 0;
        
        for (List<? extends Number> innerList : nestedLists) {
            for (Number num : innerList) {
                total += num.doubleValue();
                count++;
            }
        }
        
        return count > 0 ? total / count : 0.0;
    }
    
    // PATTERN 2: Wildcards with bounded type parameters
    public static <T extends Number> List<T> filterAboveThreshold(
            List<T> numbers, T threshold) {
        
        List<T> result = new ArrayList<>();
        for (T num : numbers) {
            if (num.doubleValue() > threshold.doubleValue()) {
                result.add(num);
            }
        }
        return result;
    }
    
    // PATTERN 3: Wildcards in return types (covariant returns)
    public static List<? extends Number> getNumbers(String type) {
        switch (type.toLowerCase()) {
            case "integer":
                return Arrays.asList(1, 2, 3, 4, 5);
            case "double":
                return Arrays.asList(1.5, 2.5, 3.5);
            case "float":
                return Arrays.asList(1.1f, 2.2f, 3.3f);
            default:
                return Collections.emptyList();
        }
    }
    
    // PATTERN 4: Wildcards with streams and optionals
    public static OptionalDouble findMax(List<? extends Number> numbers) {
        return numbers.stream()
                .mapToDouble(Number::doubleValue)
                .max();
    }
    
    // PATTERN 5: Wildcards with varargs
    @SafeVarargs
    public static double weightedAverage(List<? extends Number>... lists) {
        if (lists == null || lists.length == 0) return 0.0;
        
        double weightedSum = 0.0;
        double totalWeight = 0.0;
        
        for (int i = 0; i < lists.length; i++) {
            List<? extends Number> list = lists[i];
            double weight = i + 1; // Weight based on position
            
            for (Number num : list) {
                weightedSum += num.doubleValue() * weight;
                totalWeight += weight;
            }
        }
        
        return totalWeight > 0 ? weightedSum / totalWeight : 0.0;
    }
    
    // PATTERN 6: Factory pattern with wildcards
    interface NumberFactory<T extends Number> {
        T create();
    }
    
    public static <T extends Number> List<T> createNumberList(
            NumberFactory<T> factory, int count) {
        
        List<T> result = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            result.add(factory.create());
        }
        return result;
    }
    
    // Real-world: Barrackpore College Advanced Marks System
    static class CollegeMarksSystem {
        
        // Calculate overall GPA considering different credit weights
        public static double calculateWeightedGPA(
                Map<String, List<? extends Number>> subjectMarks) {
            
            Map<String, Integer> credits = Map.of(
                "Java", 4,
                "DSA", 3,
                "DBMS", 3,
                "OS", 3
            );
            
            double totalWeightedScore = 0.0;
            int totalCredits = 0;
            
            for (Map.Entry<String, List<? extends Number>> entry : subjectMarks.entrySet()) {
                String subject = entry.getKey();
                List<? extends Number> marks = entry.getValue();
                
                int credit = credits.getOrDefault(subject, 3);
                double subjectAverage = calculateAverage(marks);
                
                totalWeightedScore += subjectAverage * credit;
                totalCredits += credit;
            }
            
            return totalCredits > 0 ? totalWeightedScore / totalCredits : 0.0;
        }
        
        // Process student performance across multiple semesters
        public static Map<String, Double> analyzePerformance(
                Map<Integer, Map<String, List<? extends Number>>> semesterData) {
            
            Map<String, Double> performance = new HashMap<>();
            
            for (Map.Entry<Integer, Map<String, List<? extends Number>>> semester : 
                    semesterData.entrySet()) {
                
                int semesterNum = semester.getKey();
                Map<String, List<? extends Number>> subjects = semester.getValue();
                
                for (Map.Entry<String, List<? extends Number>> subject : 
                        subjects.entrySet()) {
                    
                    String subjectName = subject.getKey();
                    List<? extends Number> marks = subject.getValue();
                    
                    double average = calculateAverage(marks);
                    String key = "Sem" + semesterNum + "_" + subjectName;
                    performance.put(key, average);
                }
            }
            
            return performance;
        }
        
        private static double calculateAverage(List<? extends Number> numbers) {
            if (numbers == null || numbers.isEmpty()) return 0.0;
            
            double sum = 0.0;
            for (Number num : numbers) {
                sum += num.doubleValue();
            }
            return sum / numbers.size();
        }
    }
    
    // Usage examples
    public static void main(String[] args) {
        System.out.println("=== Advanced Wildcard Patterns ===");
        
        // Pattern 1: Nested lists
        List<List<Integer>> nestedMarks = Arrays.asList(
            Arrays.asList(85, 92, 88),  // Student 1 marks
            Arrays.asList(78, 85, 92),  // Student 2 marks
            Arrays.asList(91, 89, 94)   // Student 3 marks
        );
        
        double classAverage = processNestedLists(nestedMarks);
        System.out.println("Class average: " + classAverage);
        
        // Pattern 2: Filtering with threshold
        List<Integer> marks = Arrays.asList(85, 92, 78, 95, 88);
        List<Integer> above90 = filterAboveThreshold(marks, 90);
        System.out.println("Marks above 90: " + above90);
        
        // Pattern 3: Covariant returns
        List<? extends Number> integers = getNumbers("integer");
        List<? extends Number> doubles = getNumbers("double");
        
        System.out.println("Integers: " + integers);
        System.out.println("Doubles: " + doubles);
        
        // Pattern 4: Using streams
        OptionalDouble maxMark = findMax(marks);
        maxMark.ifPresent(max -> System.out.println("Maximum mark: " + max));
        
        // Pattern 5: Weighted average
        List<Integer> test1 = Arrays.asList(85, 92, 88);
        List<Double> test2 = Arrays.asList(92.5, 88.0, 95.5);
        List<Float> test3 = Arrays.asList(94.0f, 89.5f, 96.0f);
        
        double weightedAvg = weightedAverage(test1, test2, test3);
        System.out.println("Weighted average: " + weightedAvg);
        
        // Pattern 6: Factory pattern
        NumberFactory<Integer> integerFactory = () -> (int)(Math.random() * 100);
        List<Integer> randomMarks = createNumberList(integerFactory, 5);
        System.out.println("Random marks: " + randomMarks);
        
        // Real-world college example
        Map<String, List<? extends Number>> semester1Marks = Map.of(
            "Java", Arrays.asList(85, 92, 88),
            "DSA", Arrays.asList(78, 85, 92),
            "DBMS", Arrays.asList(91, 89, 94)
        );
        
        double gpa = CollegeMarksSystem.calculateWeightedGPA(semester1Marks);
        System.out.println("\\nStudent GPA: " + gpa);
        
        // Multi-semester analysis
        Map<Integer, Map<String, List<? extends Number>>> allSemesters = Map.of(
            1, semester1Marks,
            2, Map.of(
                "Java", Arrays.asList(88, 95, 91),
                "DSA", Arrays.asList(85, 92, 89),
                "OS", Arrays.asList(90, 87, 93)
            )
        );
        
        Map<String, Double> performance = 
            CollegeMarksSystem.analyzePerformance(allSemesters);
        System.out.println("\\nPerformance analysis:");
        performance.forEach((key, value) -> 
            System.out.println(key + ": " + value));
    }
}`;

  const wildcardComparison = [
    {
      type: "Upper Bounded Wildcard",
      syntax: "<? extends T>",
      allows: "Reading elements as T",
      disallows: "Adding elements (except null)",
      useCase: "Producer collections, read-only operations",
      example: "List<? extends Number> numbers"
    },
    {
      type: "Lower Bounded Wildcard",
      syntax: "<? super T>",
      allows: "Adding elements of type T",
      disallows: "Reading as specific type (only as Object)",
      useCase: "Consumer collections, write operations",
      example: "List<? super Integer> numbers"
    },
    {
      type: "Unbounded Wildcard",
      syntax: "<?>",
      allows: "Reading as Object",
      disallows: "Adding any element (except null)",
      useCase: "When you don't care about type",
      example: "List<?> objects"
    },
    {
      type: "Exact Type",
      syntax: "<T>",
      allows: "Both reading and adding as T",
      disallows: "Other types",
      useCase: "When you need full type control",
      example: "List<Integer> numbers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
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
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes wildcardPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          @keyframes arrowFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.6s ease-out forwards;
          }
          
          .hover-lift:hover {
            transform: translateY(-4px);
          }
          
          .wildcard-pulse {
            animation: wildcardPulse 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        {/* HEADER */}
        <header className="mb-12" ref={(el) => setRef("header", el)}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center ${!isReducedMotion ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Upper Bounded Wildcards (? extends)
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Mastering read-only generic collections with type safety and flexibility
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm">
              Read-Only
            </span>
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm">
              Type Safety
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              Flexibility
            </span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm">
              PECS Principle
            </span>
          </div>
        </header>

        {/* CONCEPT EXPLORER */}
        <section 
          ref={(el) => setRef("concept", el)}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {["what", "why", "how", "rules"].map((concept) => (
              <button
                key={concept}
                onClick={() => setActiveConcept(concept)}
                className={clsx(
                  "px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                  activeConcept === concept
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {concept === "what" && "What are They?"}
                {concept === "why" && "Why Use Them?"}
                {concept === "how" && "How They Work"}
                {concept === "rules" && "Rules & Limitations"}
              </button>
            ))}
          </div>

          {/* Concept Content */}
          <div className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border transition-all duration-500",
            activeConcept === "what" && "border-emerald-200 dark:border-emerald-800",
            activeConcept === "why" && "border-teal-200 dark:border-teal-800",
            activeConcept === "how" && "border-blue-200 dark:border-blue-800",
            activeConcept === "rules" && "border-amber-200 dark:border-amber-800"
          )}>
            {activeConcept === "what" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  What are Upper Bounded Wildcards?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Upper bounded wildcards (<code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono">? extends Type</code>) 
                  allow you to write methods that can accept collections of a specific type <strong>or any of its subtypes</strong>.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg">
                  <p className="italic text-gray-600 dark:text-gray-300">
                    <strong>Analogy:</strong> Think of Barrackpore College's library - 
                    <code>List&lt;? extends Book&gt;</code> means "any list containing Books or any type of Book (Textbook, Novel, ReferenceBook)". 
                    You can read any book from this collection, but you can't add new books because you don't know the exact type.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">Key Characteristic</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Read-Only:</strong> You can read elements as the upper bound type, but cannot add elements (except null).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                    <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-2">Syntax</h4>
                    <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded-lg">
                      <span className="text-blue-400">List&lt;? extends </span>
                      <span className="text-emerald-400">Number</span>
                      <span className="text-blue-400">&gt;</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeConcept === "why" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  Why Use Upper Bounded Wildcards?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 dark:text-teal-300 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-teal-700 dark:text-teal-300">Maximum Flexibility</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Accept collections of any subtype, making your methods more reusable.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-700 dark:text-blue-300">Type Safety</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Compile-time checking ensures you only work with compatible types.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 dark:text-indigo-300 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-700 dark:text-indigo-300">PECS Principle</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Follows "Producer Extends" principle for read-only collections.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-300 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-700 dark:text-purple-300">API Design</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Creates more flexible and user-friendly APIs for library/framework design.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeConcept === "how" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  How Upper Bounded Wildcards Work
                </h3>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg">
                  <div className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
                    <span className="text-purple-400">public static double </span>
                    <span className="text-emerald-400">calculateAverage</span>
                    <span className="text-gray-300">(</span>
                    <span className="text-blue-400">List&lt;? extends </span>
                    <span className="text-emerald-400">Number</span>
                    <span className="text-blue-400">&gt; </span>
                    <span className="text-gray-300">numbers) {`{`}</span><br/>
                    <span className="text-gray-500 ml-4">// Can read as Number</span><br/>
                    <span className="text-gray-500 ml-4">// Cannot add to numbers</span><br/>
                    <span className="text-gray-300">{`}`}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">✅ Can Do</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Read elements as Number</li>
                        <li>• Call Number methods on elements</li>
                        <li>• Iterate through collection</li>
                        <li>• Check size, emptiness</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Cannot Do</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Add Integer to List&lt;? extends Number&gt;</li>
                        <li>• Add Double to List&lt;? extends Number&gt;</li>
                        <li>• Know exact type at runtime</li>
                        <li>• Cast to specific subtype list</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                  <strong>Real Example:</strong> In Shyamnagar College's marks processing system, 
                  <code>calculateAverage</code> can work with List&lt;Integer&gt;, List&lt;Double&gt;, 
                  or List&lt;Float&gt; - all are subtypes of Number.
                </div>
              </div>
            )}

            {activeConcept === "rules" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  Rules & Limitations
                </h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-l-4 border-amber-500">
                    <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">Rule 1: Read-Only Nature</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Upper bounded collections are effectively read-only. You can only add <code>null</code>.
                    </p>
                    <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mt-2">
                      <span className="text-red-400">// ❌ Compilation Error</span><br/>
                      <span className="text-gray-300">List&lt;? extends Number&gt; nums = new ArrayList&lt;Integer&gt;();</span><br/>
                      <span className="text-gray-300">nums.add(</span><span className="text-green-400">10</span><span className="text-gray-300">);</span><br/>
                      <span className="text-gray-300">nums.add(</span><span className="text-green-400">3.14</span><span className="text-gray-300">);</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Rule 2: Type Erasure</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      At runtime, the wildcard information is erased. The JVM only sees it as a raw List.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      This is why you can't perform instanceof checks or casts based on the wildcard type.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Rule 3: PECS Principle</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Producer Extends, Consumer Super</strong> - Use <code>? extends</code> when you only need to read from a collection (it produces values).
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Example: A method that calculates sum of numbers should use <code>List&lt;? extends Number&gt;</code>.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* VISUAL DIAGRAM */}
        <section 
          ref={(el) => setRef("diagram", el)}
          className={clsx(
            "mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg",
            (isVisible.diagram || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
            Upper Bounded Wildcard Flow
          </h2>
          
          <div className="relative">
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-auto"
            >
              {/* Method Definition */}
              <rect 
                x="50" y="50" 
                width="300" height="100" 
                rx="15" 
                fill="#D1FAE5" 
                stroke="#10B981" 
                strokeWidth="3"
                className="dark:fill-emerald-900"
              >
                {!isReducedMotion && <animate attributeName="opacity" values="1;0.95;1" dur="3s" repeatCount="indefinite" />}
              </rect>
              <text 
                x="200" y="85" 
                textAnchor="middle" 
                fill="#065F46" 
                fontSize="18" 
                fontWeight="bold"
                className="dark:fill-emerald-200"
              >
                Method Signature
              </text>
              <text 
                x="200" y="115" 
                textAnchor="middle" 
                fill="#047857" 
                fontSize="16"
                className="dark:fill-emerald-300"
              >
                process(List&lt;? extends Number&gt;)
              </text>
              
              {/* Wildcard Symbol */}
              <circle cx="200" cy="160" r="25" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="3">
                {!isReducedMotion && <animate attributeName="r" values="25;28;25" dur="2s" repeatCount="indefinite" />}
              </circle>
              <text 
                x="200" y="165" 
                textAnchor="middle" 
                fill="white" 
                fontSize="20" 
                fontWeight="bold"
                className="wildcard-pulse"
              >
                ?
              </text>
              
              {/* Arrow to Bound */}
              <g>
                <line x1="200" y1="185" x2="200" y2="220" stroke="#8B5CF6" strokeWidth="2">
                  {!isReducedMotion && <animate attributeName="stroke-dashoffset" from="35" to="0" dur="1.5s" repeatCount="indefinite" />}
                </line>
                <polygon points="200,220 195,210 205,210" fill="#8B5CF6" />
              </g>
              
              {/* Bound Type */}
              <rect 
                x="150" y="220" 
                width="100" height="50" 
                rx="10" 
                fill="#DBEAFE" 
                stroke="#3B82F6" 
                strokeWidth="3"
                className="dark:fill-blue-900"
              >
                {!isReducedMotion && <animate attributeName="y" values="220;215;220" dur="2s" repeatCount="indefinite" />}
              </rect>
              <text 
                x="200" y="250" 
                textAnchor="middle" 
                fill="#1E40AF" 
                fontSize="18" 
                fontWeight="bold"
                className="dark:fill-blue-200"
              >
                Number
              </text>
              
              {/* Arrow to Acceptable Types */}
              <g>
                <line x1="200" y1="270" x2="200" y2="300" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5">
                  {!isReducedMotion && <animate attributeName="stroke-dashoffset" from="30" to="0" dur="2s" repeatCount="indefinite" begin="0.5s" />}
                </line>
                <polygon points="200,300 195,290 205,290" fill="#10B981" />
              </g>
              
              {/* Acceptable Types */}
              <g>
                {[
                  { x: 100, y: 330, text: "Integer", color: "#10B981" },
                  { x: 200, y: 330, text: "Double", color: "#3B82F6" },
                  { x: 300, y: 330, text: "Float", color: "#8B5CF6" },
                ].map((type, i) => (
                  <g key={type.text}>
                    <rect 
                      x={type.x - 50} y={type.y - 25} 
                      width="100" height="50" 
                      rx="10" 
                      fill={type.color + "30"} 
                      stroke={type.color} 
                      strokeWidth="2"
                      className="transition-all duration-300"
                    >
                      {!isReducedMotion && <animate attributeName="y" values={`${type.y - 25};${type.y - 30};${type.y - 25}`} dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />}
                    </rect>
                    <text 
                      x={type.x} y={type.y + 5} 
                      textAnchor="middle" 
                      fill={type.color} 
                      fontSize="16" 
                      fontWeight="bold"
                      className="dark:fill-gray-200"
                    >
                      {type.text}
                    </text>
                    {/* Arrow from type to bound */}
                    <line x1={type.x} y1={type.y - 25} x2={type.x} y2={305} stroke={type.color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5">
                      {!isReducedMotion && <animate attributeName="stroke-dashoffset" from="25" to="0" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.5}s`} />}
                    </line>
                  </g>
                ))}
              </g>
              
              {/* Method Call Examples */}
              <rect 
                x="450" y="50" 
                width="300" height="180" 
                rx="15" 
                fill="#FEF3C7" 
                stroke="#F59E0B" 
                strokeWidth="3"
                className="dark:fill-yellow-900"
              />
              <text 
                x="600" y="85" 
                textAnchor="middle" 
                fill="#92400E" 
                fontSize="18" 
                fontWeight="bold"
                className="dark:fill-yellow-200"
              >
                Valid Method Calls
              </text>
              
              <g>
                <text x="480" y="125" fill="#065F46" fontSize="14" className="dark:fill-gray-300">
                  <tspan x="480" dy="0">✅ process(new ArrayList&lt;Integer&gt;());</tspan>
                  <tspan x="480" dy="25">✅ process(new ArrayList&lt;Double&gt;());</tspan>
                  <tspan x="480" dy="25">✅ process(new ArrayList&lt;Float&gt;());</tspan>
                  <tspan x="480" dy="25">✅ process(new ArrayList&lt;Number&gt;());</tspan>
                </text>
                
                <text x="480" y="225" fill="#DC2626" fontSize="14" className="dark:fill-gray-300">
                  <tspan x="480" dy="0">❌ process(new ArrayList&lt;String&gt;());</tspan>
                  <tspan x="480" dy="25">❌ process(new ArrayList&lt;Object&gt;());</tspan>
                </text>
              </g>
              
              {/* Labels */}
              <text x="200" y="40" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold" className="dark:fill-gray-400">
                Upper Bound Definition
              </text>
              <text x="200" y="320" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold" className="dark:fill-gray-400">
                Acceptable Types
              </text>
              <text x="600" y="40" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold" className="dark:fill-gray-400">
                Usage Examples
              </text>
            </svg>
          </div>
          
          <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <p className="text-center text-gray-600 dark:text-gray-300 italic">
              Just like Naihati College's admission office can accept applications from any student 
              (CurrentStudent, ProspectiveStudent, TransferStudent) as long as they're Students, 
              upper bounded wildcards accept any type as long as it extends the bound.
            </p>
          </div>
        </section>

        {/* CODE EXAMPLES */}
        <section 
          ref={(el) => setRef("examples", el)}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">Code Examples</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["basic", "hierarchy", "generic", "mistakes", "advanced"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveExample(type)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm",
                  activeExample === type
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {type === "basic" && "Basic Example"}
                {type === "hierarchy" && "Class Hierarchy"}
                {type === "generic" && "Generic Classes"}
                {type === "mistakes" && "Common Mistakes"}
                {type === "advanced" && "Advanced Patterns"}
              </button>
            ))}
          </div>

          <div className={clsx(
            "transition-all duration-500",
            (isVisible.examples || isReducedMotion) && "animate-fade-in-up"
          )}>
            {activeExample === "basic" && (
              <JavaCodeBlock 
                code={basicWildcardExample}
                title="StudentMarksProcessor.java"
                highlightLines={[7, 8, 9, 17, 18, 27, 28, 37, 38]}
              />
            )}

            {activeExample === "hierarchy" && (
              <JavaCodeBlock 
                code={classHierarchyExample}
                title="CollegeProcessor.java"
                highlightLines={[48, 49, 56, 57, 64, 65, 78, 79, 86, 87]}
              />
            )}

            {activeExample === "generic" && (
              <JavaCodeBlock 
                code={genericClassWildcardExample}
                title="NumberContainer.java"
                highlightLines={[15, 16, 23, 24, 31, 32, 39, 40, 47, 48]}
              />
            )}

            {activeExample === "mistakes" && (
              <JavaCodeBlock 
                code={commonMistakesExample}
                title="WildcardMistakes.java"
                highlightLines={[9, 10, 25, 26, 41, 42, 57, 58, 73, 74]}
              />
            )}

            {activeExample === "advanced" && (
              <JavaCodeBlock 
                code={advancedWildcardExample}
                title="AdvancedWildcardPatterns.java"
                highlightLines={[7, 8, 17, 18, 27, 28, 37, 38, 47, 48]}
              />
            )}
          </div>
        </section>

        {/* WILDCARD COMPARISON */}
        <section 
          ref={(el) => setRef("comparison", el)}
          className={clsx(
            "mb-12",
            (isVisible.comparison || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">Wildcard Type Comparison</h2>
          
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <th className="p-4 text-left font-bold">Wildcard Type</th>
                  <th className="p-4 text-left font-bold">Syntax</th>
                  <th className="p-4 text-left font-bold">Allows</th>
                  <th className="p-4 text-left font-bold">Disallows</th>
                  <th className="p-4 text-left font-bold">Use Case</th>
                  <th className="p-4 text-left font-bold">Example</th>
                </tr>
              </thead>
              <tbody>
                {wildcardComparison.map((item, index) => (
                  <tr 
                    key={index}
                    className={clsx(
                      "border-b border-gray-200 dark:border-gray-700 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200",
                      index % 2 === 0 ? "bg-white/30 dark:bg-gray-800/30" : "bg-transparent",
                      item.type === "Upper Bounded Wildcard" && "bg-emerald-50/50 dark:bg-emerald-900/20"
                    )}
                  >
                    <td className="p-4 font-bold">
                      <span className={clsx(
                        "px-3 py-1 rounded-full text-xs",
                        item.type === "Upper Bounded Wildcard" && "bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200",
                        item.type === "Lower Bounded Wildcard" && "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200",
                        item.type === "Unbounded Wildcard" && "bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200",
                        item.type === "Exact Type" && "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      )}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono">{item.syntax}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.allows.split(", ").map((allow, i) => (
                          <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                            {allow}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.disallows.split(", ").map((disallow, i) => (
                          <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded">
                            {disallow}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{item.useCase}</td>
                    <td className="p-4 font-mono text-xs">{item.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">PECS Principle Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Producer Extends</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use <code>? extends T</code> when a parameter produces values of type T 
                  (you read from it). Example: calculating sum of numbers.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Consumer Super</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use <code>? super T</code> when a parameter consumes values of type T 
                  (you write to it). Example: adding elements to a collection.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
              Remember: "PECS" helps you choose the right wildcard. If you only need to read, use extends. 
              If you only need to write, use super.
            </p>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section 
          ref={(el) => setRef("practices", el)}
          className={clsx(
            "mb-12",
            (isVisible.practices || isReducedMotion) && "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">Best Practices & Professional Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Do This
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Use upper bounded wildcards for read-only method parameters</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Follow PECS principle for collection parameters</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Document wildcard usage in complex APIs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Use type parameters when you need both read and write</span>
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
                  <span className="text-gray-700 dark:text-gray-300">Trying to add elements to upper bounded collections</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Using wildcards where exact types would work better</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Overusing nested wildcards (hard to read)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Forgetting about type erasure implications</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Tips */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Professional Tips from Industry
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">API Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use upper bounded wildcards in public API methods to increase flexibility for users.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Performance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Wildcards have zero runtime overhead - they're compile-time only constructs.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Testing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Always test with different subtype collections to ensure your methods work correctly.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Debugging</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  If you get "cannot add" errors, check if you're using extends where you should use super.
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
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">📋 Quick Reference Checklist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Use ? extends for read-only parameters",
              "Remember: Producer Extends, Consumer Super",
              "Cannot add to ? extends collections (except null)",
              "Can read elements as the upper bound type",
              "Works with any subtype of the bound",
              "Great for utility methods (sum, average, max)",
              "Use type parameters when you need both read/write",
              "Wildcards are compile-time only",
              "Follow PECS principle for collection parameters",
              "Document wildcard usage in complex code",
              "Test with different subtype collections",
              "Consider API flexibility when designing methods"
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-emerald-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300"
              >
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
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
          style={{ animationDelay: "0.7s" }}
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
                  <strong>Remember:</strong> Upper bounded wildcards are like Shyamnagar College's library reading room - 
                  you can read any book (Integer, Double, Float) as long as it's a Book (Number), but you can't add your own books 
                  because the librarian doesn't know where they should go. In my 27 years teaching at Barrackpore, 
                  I've seen students struggle most with the read-only nature. Remember: if you need to both read AND write, 
                  use a type parameter instead of a wildcard.
                </p>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Pro Tip for Naihati College Students:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    When designing methods, ask: "Will this method only read from the collection?" 
                    If yes, use <code>? extends</code>. If you also need to write, either use a type parameter 
                    or reconsider your design. This simple question will save you hours of debugging 
                    "cannot add" compilation errors!
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

export default Topic10;