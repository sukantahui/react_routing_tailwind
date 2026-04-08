import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import basicJumpTable from "./topic11_files/basic_jump_table.c?raw";
import calculatorArray from "./topic11_files/calculator_array.c?raw";
import commandDispatcher from "./topic11_files/command_dispatcher.c?raw";

const Topic11 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp { animation: none !important; opacity: 1 !important; transform: none !important; }
    }
  `;

  const faqs = [
    { q: "What is an array of function pointers?", a: "An array where each element is a function pointer. It allows you to select and call a function by index, creating a jump table." },
    { q: "How do you declare an array of function pointers?", a: "`returnType (*arrayName[size])(paramTypes);` Example: `int (*ops[4])(int, int) = {add, sub, mul, div};`" },
    { q: "Why use an array of function pointers instead of a switch statement?", a: "It's often faster (O(1) dispatch), more extensible (add new functions by appending to array), and centralizes the dispatch logic." },
    { q: "How do you call a function from an array of function pointers?", a: "`result = array[index](args);` The index determines which function is called." },
    { q: "What is a jump table?", a: "Another name for an array of function pointers. Used in state machines, command processors, and virtual tables." },
    { q: "Can you have arrays of function pointers with different signatures?", a: "No, all function pointers in an array must have the same signature. Use a union or `void*` with casting if you need heterogeneous types." },
    { q: "How do you initialize an array of function pointers?", a: "At declaration: `int (*ops[])(int, int) = {add, sub, mul};` Or later with assignments." },
    { q: "What is a common use case in embedded systems?", a: "Interrupt vector tables – an array of function pointers that the CPU calls when an interrupt occurs." },
    { q: "How do you add a new function to a jump table dynamically?", a: "If the array is not const, you can assign a new function pointer to an element: `ops[3] = newFunction;`" },
    { q: "What is the advantage over function pointers in a struct?", a: "Arrays allow indexing by integer, which is great for command IDs or state numbers. Structs are better for named fields." },
    { q: "Can you have a 2D array of function pointers?", a: "Yes: `void (*dispatch[STATES][EVENTS])(void);` Useful for state machines with events." },
    { q: "How do you iterate over an array of function pointers?", a: "Using a for loop, calling each function: `for (int i=0; i<size; i++) if (array[i]) array[i]();`" },
    { q: "What is a dispatch table in a protocol parser?", a: "An array mapping command bytes to handler functions. The parser reads a byte and calls `handlers[byte](data)`." },
    { q: "How do you handle invalid indices in a jump table?", a: "Check index bounds before calling, or provide a default handler at index 0 or a sentinel." },
    { q: "Can you use an array of function pointers to implement a simple virtual machine?", a: "Yes. Each opcode is an index into an array of instruction handler functions." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Topic 11: Array of Function Pointers (Menu-Driven Programs)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            An array of function pointers – also called a jump table or dispatch table – is a powerful technique for 
            implementing menus, command interpreters, state machines, and virtual machines. This topic shows how to 
            build extensible, efficient dispatch systems.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-3">Why Use an Array of Function Pointers?</h2>
          <p>
            A switch statement with many cases can become long and repetitive. An array of function pointers centralizes the 
            mapping between an index (choice, command, state) and the function to execute. Benefits include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Speed</strong> – Direct indexing instead of branch prediction.</li>
            <li><strong>Extensibility</strong> – Add new items by appending to the array, no switch modification.</li>
            <li><strong>Data-driven design</strong> – Store the array in a configuration, even load it dynamically.</li>
            <li><strong>Code clarity</strong> – Separate the dispatch mechanism from the actions.</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p>💡 <strong>Think about:</strong> A text-based adventure game with commands: "go north", "take item", "inventory". Instead of a huge switch, you can map each command string to an index in a function pointer array.</p>
          </div>
        </section>

        {/* Example 1: Basic jump table (replacing switch) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Example 1: Basic Jump Table (Replacing Switch)</h2>
          <p>Simple menu system using an array of function pointers instead of a long switch statement.</p>
          <EditableCCodeBlock title="Menu with jump table" initialCode={basicJumpTable} />
        </section>

        {/* Example 2: Calculator with operation array */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Example 2: Calculator Using Array of Function Pointers</h2>
          <p>Classic example – map operation codes (+, -, *, /) to functions, allowing easy extension.</p>
          <EditableCCodeBlock title="Array-based calculator" initialCode={calculatorArray} />
        </section>

        {/* Example 3: Command dispatcher (text-based) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">Example 3: Command Dispatcher for Text Commands</h2>
          <p>Real-world CLI tool: map command strings (like "help", "quit") to functions using a parallel array or struct array.</p>
          <EditableCCodeBlock title="Command dispatcher with lookup" initialCode={commandDispatcher} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Combine with an array of strings for self-documenting menus</strong> – parallel arrays: one for names, one for functions.</li>
            <li><strong>Use a sentinel (NULL function or empty name)</strong> to mark the end of the array for iteration.</li>
            <li><strong>For large dispatch tables, generate the array with macros</strong> – reduces repetition and errors.</li>
            <li><strong>In embedded systems, store the function pointer array in ROM (const) to save RAM.</strong></li>
            <li><strong>Use function pointer arrays for state machines</strong> – each state is an index; the array holds state handler functions.</li>
            <li><strong>Validate index bounds before calling</strong> – out-of-range indices are a security risk.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Function Pointer Arrays</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Use typedef for the function pointer type</strong> – e.g., `typedef void (*MenuFunc)(void);`</li>
            <li><strong>Always initialize all array elements</strong> – set unused slots to NULL to avoid accidental calls.</li>
            <li><strong>Provide a default/error handler</strong> for invalid indices.</li>
            <li><strong>Document the expected index range</strong> or provide a `size` variable.</li>
            <li><strong>If the array can be modified at runtime, protect with mutex in multithreaded code.</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Out-of-bounds index</strong> – leads to calling random memory or crashing.</li>
            <li><strong>Forgetting to NULL-terminate or track size</strong> – iteration may go beyond valid entries.</li>
            <li><strong>Mixing function signatures in the same array</strong> – all must match exactly.</li>
            <li><strong>Assuming the array is automatically populated</strong> – you must explicitly assign each element.</li>
            <li><strong>Using a function pointer array for small, fixed sets may be overkill</strong> – switch can be clearer.</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-yellow-600 dark:text-yellow-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="Array of function pointers is one of my favorite topics at Barrackpore CNAT. Students see the light when they realize a switch with 20 cases becomes a 3-line array lookup. I demonstrate with a calculator – adding a new operation (like modulus) is just appending to the array and menu. No switch modification. In the real world, this pattern appears in everything from CLI tools (like Git's subcommands) to CPU emulators (opcode dispatch). Remember: with power comes responsibility – always bounds-check your index!" />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Array of Function Pointers</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Declaration: `returnType (*array[size])(params);`</li>
            <li>✅ Initialize with function names: {`{func1, func2, NULL}`}.</li>
            <li>✅ Call: `array[index](args);`</li>
            <li>✅ Always check index bounds before calling.</li>
            <li>✅ Use typedef for clarity: `typedef void (*Cmd)(void);`</li>
            <li>✅ Common uses: menu systems, command dispatchers, state machines, opcode handlers.</li>
            <li>✅ Provides O(1) dispatch, extensibility, and data-driven design.</li>
            <li>✅ Avoid mixing signatures – all functions must match the typedef.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic11;