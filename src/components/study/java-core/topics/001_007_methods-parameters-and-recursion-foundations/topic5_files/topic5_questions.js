/**
 * Module 001_007: Topic 5: Pass-by-Value in Java: why Java is strictly Pass-by-Value for both primitives and object references
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Is Java Pass-by-Value or Pass-by-Reference?",
    shortAnswer: "Java is STRICTLY 100% PASS-BY-VALUE for EVERYTHING (both primitive types and object reference types) with zero exceptions.",
    explanation: "Fundamental Java Language Specification invariant (JLS §4.3, §8.4.1).",
    hint: "Java is strictly 100% Pass-by-Value.",
    level: "basic",
    codeExample: "// Java copies the bits: primitive value bits or reference address bits"
  },
  {
    question: "What exact 'value' is passed when you pass a primitive variable (`int`, `double`) to a method?",
    shortAnswer: "The actual binary value (bit pattern) stored in the caller's stack slot is copied into the method parameter's stack slot.",
    explanation: "Primitive pass-by-value mechanics.",
    hint: "The raw binary value is copied directly on the stack.",
    level: "basic",
    codeExample: "void m(int x) { x = 20; } int a = 10; m(a); // 'a' remains 10"
  },
  {
    question: "What exact 'value' is passed when you pass an Object reference (`StudentRecord`, `String`, array) to a method?",
    shortAnswer: "The memory address pointer (reference value) pointing to the object on the Heap is copied by value into the method parameter's stack slot.",
    explanation: "Reference pass-by-value mechanics.",
    hint: "The reference memory address is copied by value.",
    level: "basic",
    codeExample: "void m(Student s) { ... } // 's' receives a copy of the heap reference address"
  },
  {
    question: "Why does modifying an object's field inside a method (`s.setBalance(...)`) alter the object seen by the caller?",
    shortAnswer: "Because both the caller's reference variable and the method's parameter variable hold copies of the SAME memory address pointing to the exact same shared object instance on the Heap.",
    explanation: "Shared heap object mutation.",
    hint: "Both references point to the same object on the Heap.",
    level: "basic",
    codeExample: "student.setFeeBalance(1000.0); // Mutates shared Heap object"
  },
  {
    question: "Why does reassigning a parameter variable (`s = new Student(...)`) NOT alter the caller's reference variable?",
    shortAnswer: "Because reassigning `s` overwrites only the local stack frame pointer slot; the caller's stack pointer remains pointing to the original Heap object.",
    explanation: "Parameter reassignment isolation.",
    hint: "Overwrites only the local stack slot; caller's reference is unchanged.",
    level: "intermediate",
    codeExample: "void swap(Student s) { s = new Student(); } // Caller unaffected"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened to `originalFee` after `attemptPrimitiveModification(originalFee)` executed?",
    shortAnswer: "`originalFee` remained exactly ₹12,000.00 because modifying the primitive parameter altered only the temporary local stack frame slot in Indian Rupees (₹).",
    explanation: "Primitive pass-by-value demonstration.",
    hint: "Remained 100% unchanged at ₹12,000.",
    level: "basic",
    codeExample: "double originalFee = 12000.0; attemptPrimitiveModification(originalFee); // Still 12000.0"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happened to Tuhina's record after `attemptReferenceReassignment(tuhina)`?",
    shortAnswer: "Tuhina's record remained intact with balance ₹15,000.00 because reassigning the parameter to a new `StudentRecord` did NOT alter the caller's variable in Indian Rupees (₹).",
    explanation: "Reference reassignment proof.",
    hint: "Caller reference remained unchanged at ₹15,000.",
    level: "basic",
    codeExample: "attemptReferenceReassignment(tuhina); // tuhina remains unchanged!"
  },
  {
    question: "Can a classic `swap(int a, int b)` method swap two primitive variables in Java?",
    shortAnswer: "NO! Because primitives are passed by value, swapping `a` and `b` inside the method swaps only the local stack variables; the caller's variables remain unchanged.",
    explanation: "Famous Java interview question on primitive swapping.",
    hint: "No, primitive variables cannot be swapped via method parameters in Java.",
    level: "basic",
    codeExample: "void swap(int a, int b) { int t = a; a = b; b = t; } // DOES NOT SWAP CALLER'S VARS!"
  },
  {
    question: "How can you swap two values between caller variables in Java?",
    shortAnswer: "By wrapping the values inside an array (`int[] arr`), custom mutable wrapper object, or returning a tuple/Record.",
    explanation: "Workaround for swapping in Java.",
    hint: "Use an array (swap(arr, 0, 1)) or mutable wrapper object.",
    level: "intermediate",
    codeExample: "void swap(int[] arr, int i, int j) { int t = arr[i]; arr[i] = arr[j]; arr[j] = t; }"
  },
  {
    question: "Can a classic `swap(Student s1, Student s2)` method swap the caller's object references in Java?",
    shortAnswer: "NO! Reassigning the formal parameter references `s1` and `s2` modifies only the local stack slots; the caller's reference variables remain pointing to their original objects.",
    explanation: "Famous Java interview question on object swapping.",
    hint: "No, object references cannot be swapped via method parameters in Java.",
    level: "intermediate",
    codeExample: "void swap(Student s1, Student s2) { Student t = s1; s1 = s2; s2 = t; } // FAILS!"
  },
  {
    question: "What does C++ have that Java deliberately does NOT have regarding parameters?",
    shortAnswer: "C++ supports true Pass-by-Reference via reference types (e.g. `void swap(int &a, int &b)`) and pointer manipulation (`int *p`); Java has no reference parameter syntax (`&`).",
    explanation: "Comparative language design difference.",
    hint: "C++ has reference parameters (&) and raw pointers; Java has only pass-by-value.",
    level: "intermediate",
    codeExample: "// C++: void swap(int& a, int& b) | Java: strictly pass-by-value only"
  },
  {
    question: "Why do some developers mistakenly believe Java is 'Pass-by-Reference for Objects'?",
    shortAnswer: "Because mutating object fields through a passed reference modifies the shared heap object, creating the illusion of pass-by-reference to those unfamiliar with stack/heap pointer mechanics.",
    explanation: "Common cognitive misconception explanation.",
    hint: "Confusion arises because mutating object fields alters the shared heap object.",
    level: "intermediate",
    codeExample: "// 'Pass-by-value of reference pointers' is often confused with 'pass-by-reference'"
  },
  {
    question: "What is the technical term used in computer science literature for Java's object parameter passing?",
    shortAnswer: "**Call-by-Sharing** or **Pass-by-Value of Object Handles/References**.",
    explanation: "Computer science terminology for reference passing.",
    hint: "Call-by-sharing or pass-by-value of references.",
    level: "advanced",
    codeExample: "// Academic term: Call-by-sharing (CLU, Python, Java, JavaScript)"
  },
  {
    question: "What happens if a method modifies an element of a passed array (`arr[0] = 99`)?",
    shortAnswer: "The caller's array is modified because arrays are Heap objects and the parameter holds a copy of the array's heap address.",
    explanation: "Array element mutation in methods.",
    hint: "Caller's array is modified because array elements reside on the shared Heap.",
    level: "basic",
    codeExample: "void fillFirst(int[] a) { a[0] = 99; } // Modifies caller's array!"
  },
  {
    question: "What happens if a method reassigns a passed array parameter (`arr = new int[10]`)?",
    shortAnswer: "The caller's array remains completely unchanged; the parameter variable now points to a new array on the Heap, while the caller still references the old array.",
    explanation: "Array parameter reassignment.",
    hint: "Caller's array is unchanged; only the local parameter pointer was reassigned.",
    level: "basic",
    codeExample: "void reassign(int[] a) { a = new int[100]; } // Caller unaffected"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee system, how was Swadeep's fee balance successfully reduced by ₹3,000?",
    shortAnswer: "By calling `student.setFeeBalance(student.getFeeBalance() - discount)` which mutated the field on the shared `StudentRecord` object on the Heap in Indian Rupees (₹).",
    explanation: "Heap object mutation demonstration.",
    hint: "Mutated the shared object state on the Heap via setter method.",
    level: "basic",
    codeExample: "modifyObjectInternalState(swadeep, 3000.0); // ₹18,000 → ₹15,000"
  },
  {
    question: "What happens if you pass a `String` object to a method and append text to it (`str = str + \" extra\"`)?",
    shortAnswer: "Because `String` is immutable, string concatenation creates a brand-new `String` object on the Heap and reassigns the local parameter; the caller's original `String` remains completely unchanged.",
    explanation: "String immutability and pass-by-value.",
    hint: "Caller's string is unchanged because String is immutable.",
    level: "intermediate",
    codeExample: "void append(String s) { s += \" extra\"; } // Caller unaffected"
  },
  {
    question: "How can a method modify a string and reflect changes on the caller?",
    shortAnswer: "By passing a mutable `StringBuilder` or `StringBuffer` object, or by returning the new `String` from the method.",
    explanation: "Mutable string buffer passing.",
    hint: "Use StringBuilder or return the modified String.",
    level: "basic",
    codeExample: "void append(StringBuilder sb) { sb.append(\" extra\"); } // Mutates buffer!"
  },
  {
    question: "What happens when an auto-boxed wrapper object (`Integer`, `Double`) is modified in a method (`val++`)?",
    shortAnswer: "Wrapper objects are immutable; `val++` unboxes the value, increments it, boxes it into a new wrapper object, and reassigns the local parameter; the caller's variable remains unchanged!",
    explanation: "Wrapper class immutability trap.",
    hint: "Wrappers are immutable; caller's variable is unaffected.",
    level: "intermediate",
    codeExample: "void inc(Integer x) { x++; } // Caller's Integer remains unchanged"
  },
  {
    question: "Does the JVM copy the entire object state or just the reference address when passing an object?",
    shortAnswer: "ONLY the reference address (4 or 8 bytes depending on Compressed OOPs); the actual object payload on the Heap is never copied during a method call.",
    explanation: "Zero object copying overhead in parameter passing.",
    hint: "Only copies the 4/8 byte address pointer; never copies the whole object.",
    level: "intermediate",
    codeExample: "// Passing a 1GB object copies only an 8-byte pointer, running in O(1) time"
  },
  {
    question: "What is 'Defensive Copying' and why is it used to protect against pass-by-value reference mutation?",
    shortAnswer: "Cloning or copying mutable objects before passing or returning them so that external methods cannot mutate the internal private state of an object.",
    explanation: "Effective Java Item 50: Make defensive copies when needed.",
    hint: "Copying mutable objects to prevent external callers from mutating private state.",
    level: "advanced",
    codeExample: "public Date getDate() { return new Date(date.getTime()); }"
  },
  {
    question: "What is the memory size of a reference parameter on a 64-bit JVM with Compressed OOPs enabled?",
    shortAnswer: "32 bits (4 bytes) with Compressed OOPs (standard for heaps < 32GB); 64 bits (8 bytes) without.",
    explanation: "JVM Compressed OOPs architecture.",
    hint: "4 bytes with Compressed OOPs; 8 bytes without.",
    level: "advanced",
    codeExample: "// Compressed OOPs encodes 32-bit pointers up to 32GB Heap"
  },
  {
    question: "Can a `final` reference parameter prevent modifying the referenced object's internal fields?",
    shortAnswer: "NO! `final Student s` prevents only the reference variable `s` from being reassigned to another object; it does NOT make the object immutable (`s.setBalance(...)` is still permitted!).",
    explanation: "Final reference vs immutable object distinction.",
    hint: "No, 'final' prevents reference reassignment but allows internal field mutation.",
    level: "intermediate",
    codeExample: "final Student s; s.setFee(0); // LEGAL! s = new Student(); // ILLEGAL!"
  },
  {
    question: "What is the result of passing `null` to an Object reference parameter?",
    shortAnswer: "The parameter stack slot receives the `null` pointer literal (0x0); calling any instance methods on it throws `NullPointerException`.",
    explanation: "Null argument passing semantics.",
    hint: "Parameter receives null; dereferencing it throws NullPointerException.",
    level: "basic",
    codeExample: "void m(Student s) { s.getName(); } m(null); // THROWS NullPointerException"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why did `attemptPrimitiveModification(double fee)` have zero effect on `originalFee`?",
    shortAnswer: "Because `fee` was an independent 64-bit double copy in the method's stack frame; adding ₹5,000 modified only that temporary slot in Indian Rupees (₹).",
    explanation: "Primitive stack frame isolation.",
    hint: "Modified only the temporary local stack slot.",
    level: "basic",
    codeExample: "fee = fee + 5000.0; // Local stack slot only"
  },
  {
    question: "What is the time complexity of passing an argument in Java?",
    shortAnswer: "$O(1)$ constant time for both primitives and object references because only a fixed 4 or 8 bytes of stack memory is copied.",
    explanation: "Constant time argument passing guarantee.",
    hint: "O(1) constant time.",
    level: "basic",
    codeExample: "// Passing any argument takes O(1) time"
  },
  {
    question: "Can a method return a newly created object to the caller without it being garbage collected?",
    shortAnswer: "YES! Returning the reference pointer copies its memory address back to the caller's stack slot, keeping the heap object referenced and preventing GC.",
    explanation: "Object reference return lifecycle.",
    hint: "Yes, returning the reference keeps the heap object reachable.",
    level: "basic",
    codeExample: "Student create() { return new Student(); } // Remains in Heap"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 5 for Java developers?",
    shortAnswer: "Java is strictly 100% Pass-by-Value; primitives pass copies of raw values, and objects pass copies of reference addresses. Mutating an object alters shared heap state, but reassigning a parameter variable has zero effect on the caller.",
    explanation: "Mastery of Java pass-by-value memory mechanics.",
    hint: "Java is 100% pass-by-value: copies values for primitives and address pointers for objects.",
    level: "basic",
    codeExample: "// Summary: Java is ALWAYS Pass-by-Value (values for primitives, pointers for objects)"
  },
  {
    question: "What is the next topic (Topic 6) in Module 001_007?",
    shortAnswer: "Demonstrating parameter re-assignment vs mutating object internal state.",
    explanation: "Topic 6 provides deep architectural case studies on pointer reassignment vs in-place mutation.",
    hint: "Demonstrating parameter re-assignment vs mutating object internal state.",
    level: "basic",
    codeExample: "// Topic 6: Parameter Re-assignment vs Object Internal State Mutation"
  },
  {
    question: "Does Java 21 Project Valhalla value objects (primitive classes) change pass-by-value semantics?",
    shortAnswer: "NO! Valhalla Value Objects are passed by value with flat memory layout, continuing Java's strict 100% pass-by-value architecture with enhanced CPU cache performance.",
    explanation: "Future Java evolution consistency.",
    hint: "No, Valhalla reinforces pass-by-value with flat object layout.",
    level: "advanced",
    codeExample: "// Valhalla value objects remain strictly pass-by-value"
  }
];

export default questions;
