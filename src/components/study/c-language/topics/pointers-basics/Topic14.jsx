import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import passingArray from "./topic14_files/passing_array.c?raw";
import passingPointer from "./topic14_files/passing_pointer.c?raw";

const Topic14 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Passing Arrays and Pointers to Functions
        </h1>
        <p className="text-lg leading-relaxed">
          In C, arrays and pointers are closely linked. When you pass an array to a function, it <strong>decays</strong> to a pointer to its first element. This means the function receives a pointer, not a copy of the entire array. Understanding this allows you to write functions that operate on arrays efficiently and flexibly.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📤 Passing an Array</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`void printArray(int arr[], int size) {
    for(int i = 0; i < size; i++)
        printf("%d ", arr[i]);
}

int main() {
    int nums[] = {1,2,3};
    printArray(nums, 3);
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The parameter <code>int arr[]</code> is actually a pointer (<code>int *arr</code>). You must pass the size separately because the pointer carries no length information.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔗 Passing a Pointer</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`void modifyArray(int *ptr, int size) {
    for(int i = 0; i < size; i++)
        ptr[i] *= 2;
}

int main() {
    int nums[] = {1,2,3};
    modifyArray(nums, 3);   // nums decays to pointer
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Using pointer notation makes the decay explicit. Both forms are equivalent – choose based on clarity.
          </p>
        </div>
      </div>

      {/* SVG: Array Decay in Function Call */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Array Decay When Passing to Function</h3>
        <div className="flex justify-center">
          <svg width="500" height="160" viewBox="0 0 500 160" className="max-w-full h-auto">
            <rect x="30" y="30" width="320" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
            {[0,1,2,3,4].map(i => (
              <rect key={i} x={30 + i*64} y="30" width="64" height="50" fill="none" stroke="gray" strokeWidth="1" />
            ))}
            <text x={62 + 0*64} y="65" textAnchor="middle" fontSize="10">arr[0]</text>
            <text x={62 + 1*64} y="65" textAnchor="middle" fontSize="10">arr[1]</text>
            <text x={62 + 2*64} y="65" textAnchor="middle" fontSize="10">arr[2]</text>
            <text x={62 + 3*64} y="65" textAnchor="middle" fontSize="10">arr[3]</text>
            <text x={62 + 4*64} y="65" textAnchor="middle" fontSize="10">arr[4]</text>
            <path d="M190 100 L190 130" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
            <text x="200" y="115" fill="#10B981" fontSize="12">decays to pointer</text>
            <rect x="150" y="135" width="100" height="25" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="200" y="152" textAnchor="middle" fill="#10B981" fontSize="11">&amp;arr[0]</text>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          The array name becomes a pointer to its first element when passed to a function.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Why the Size Must Be Passed Separately</h3>
          <p className="leading-relaxed">
            Because the array decays to a pointer, the function loses information about the array's size. The pointer only knows the address of the first element, not how many elements exist.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void process(int arr[]) {
    // sizeof(arr) is sizeof(int*) (8 bytes), not array size!
    int size = sizeof(arr) / sizeof(arr[0]); // WRONG
}

int main() {
    int nums[10];
    printf("%zu\\n", sizeof(nums));   // 40
    process(nums);
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Always pass the size explicitly, or use a sentinel value (like NULL for strings).
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔁 Modifying Arrays Inside Functions</h3>
          <p className="leading-relaxed">
            Since the function receives a pointer to the original array, modifications affect the caller's array. This is how functions like <code>qsort</code> work.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void doubleElements(int *arr, int size) {
    for(int i = 0; i < size; i++)
        arr[i] *= 2;   // modifies original
}

int main() {
    int data[] = {1,2,3};
    doubleElements(data, 3);
    // data is now {2,4,6}
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Debolina</strong> used this pattern to implement a function that scales all grades by a factor.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Passing Arrays to Functions</h3>
        <EditableCCodeBlock
          title="Example 1: Passing an Array (Decay)"
          initialCode={passingArray}
        />
        <EditableCCodeBlock
          title="Example 2: Passing a Pointer to Array"
          initialCode={passingPointer}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Using <code>sizeof</code> on array parameter:</strong> Returns pointer size, not array size.</li>
          <li><strong>Forgetting to pass the size:</strong> The function has no way to know how many elements to process.</li>
          <li><strong>Assuming the array is passed by value:</strong> It's actually a pointer – modifications affect the original.</li>
          <li><strong>Confusing array of pointers with pointer to array:</strong> <code>int *arr[]</code> vs <code>int (*arr)[]</code> are different.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always pass the array size as a separate parameter, ideally of type <code>size_t</code>.</li>
          <li>Use <code>const</code> for read‑only array parameters: <code>void print(const int arr[], size_t n);</code></li>
          <li>Document that the function may modify the array if it's not <code>const</code>.</li>
          <li>For multidimensional arrays, pass all dimensions except the first (which decays) explicitly.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that arrays decay to pointers when passed to functions.</li>
            <li>✅ Know why you must pass the size separately.</li>
            <li>✅ Can write functions that both read and modify arrays.</li>
            <li>✅ Recognize that <code>int arr[]</code> in a parameter list is a pointer.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What does <code>sizeof(arr)</code> inside a function give you? Compare with <code>sizeof</code> in main.</li>
            <li>Observe carefully: If you modify <code>arr[i]</code> inside the function, does the caller see the change? Why?</li>
            <li>Try passing a pointer to a local array to a function, then modify it. Does it work?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>static</code> in function parameters (C99):</strong> <code>void f(int arr[static 10])</code> indicates at least 10 elements.</li>
          <li><strong>For 2D arrays, pass as <code>int (*arr)[cols]</code> or <code>int arr[][cols]</code></strong> – the second dimension must be known.</li>
          <li><strong>Consider using <code>size_t</code> for array indices and sizes</strong> – it's unsigned and matches <code>sizeof</code>.</li>
          <li><strong>When you need to modify the pointer itself (e.g., reallocation), pass a double pointer (<code>int **</code>).</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In Barrackpore CNAT, we emphasize that passing an array is really passing a pointer. I tell students: 'The array name is just a ticket to the first element.' This is why you must pass the size separately – the ticket doesn't tell you how many seats there are. Practice by writing functions that sum, sort, or search arrays. And remember: modifying the array inside a function changes the original – that's often what you want, but be careful!"
        } />
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic14;