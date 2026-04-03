import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files for examples
import linkedListExample from "./topic5_files/linked_list_double_pointer.c?raw";
import arrayOfStringsExample from "./topic5_files/array_of_strings.c?raw";
import dynamic2DArrayExample from "./topic5_files/dynamic_2d_array.c?raw";

const Topic5 = () => {
  // Inline keyframes for animations (respects reduced motion)
  const keyframes = `
    @keyframes fadeSlideUp {
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
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp, .animate-subtlePulse {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  // Q&A data
  const faqs = [
    {
      q: "Why use a double pointer when inserting at the head of a linked list?",
      a: "A double pointer allows the function to modify the original head pointer (address of the first node). If we used a single pointer, changes to the head inside the function would not reflect in the caller.",
    },
    {
      q: "What is an array of pointers? Give a real-world example.",
      a: "An array where each element is a pointer. Example: `char *names[5]` stores 5 string pointers. Used for command-line arguments (`argv`), string arrays, or function dispatch tables.",
    },
    {
      q: "How do you dynamically allocate a 2D array using double pointers?",
      a: "First allocate an array of row pointers (`int **arr = malloc(rows * sizeof(int*))`), then allocate each row with `malloc(cols * sizeof(int))`. This creates a jagged array where rows can have different lengths.",
    },
    {
      q: "What is a linked structure? How does double pointer help?",
      a: "A structure that contains pointers to other structures (e.g., linked list, tree). Double pointers are used to modify the root pointer inside functions without returning the new address.",
    },
    {
      q: "Can you traverse an array of strings using double pointers?",
      a: "Yes. `char **strArray` can be treated as a pointer to the first string. You can iterate using `while (*strArray) { printf('%s\\n', *strArray); strArray++; }` if the array is NULL-terminated.",
    },
    {
      q: "What is the difference between pointer to array and array of pointers?",
      a: "Pointer to array: `int (*ptr)[5]` – ptr points to an array of 5 ints. Array of pointers: `int *arr[5]` – arr holds 5 pointers to int.",
    },
    {
      q: "How does a double pointer help in building a hash table?",
      a: "Hash tables often use an array of linked list heads. Double pointers allow dynamic resizing and rehashing by modifying the array of heads.",
    },
    {
      q: "What is a common mistake when freeing a 2D array allocated with double pointers?",
      a: "Forgetting to free each row before freeing the array of pointers, causing memory leaks. The correct order: loop to free rows, then free the main pointer.",
    },
    {
      q: "In a binary tree, why would you use a double pointer for insertion?",
      a: "To modify the root pointer when the tree is empty, or to change a child pointer when inserting a new node. It simplifies code by avoiding return values.",
    },
    {
      q: "How do you pass an array of strings to a function and modify it?",
      a: "Pass as `char ***ptr` if you need to reallocate the array. For example, `void addString(char ***arr, int *size, const char *newStr)`.",
    },
    {
      q: "What is the advantage of using double pointers for dynamic 2D arrays over 1D flattening?",
      a: "Double pointers allow row-wise access and each row can have a different length (jagged arrays). Also easier to swap rows by swapping pointers.",
    },
    {
      q: "Can a double pointer be used to implement a sparse matrix?",
      a: "Yes. Use an array of pointers to linked lists (each list stores column index and value). The double pointer manages the array of heads.",
    },
    {
      q: "How do you sort an array of strings using `qsort` with double pointers?",
      a: "Pass the array of pointers and a comparator that dereferences twice: `*(const char **)a` to get the string pointer, then `strcmp`.",
    },
    {
      q: "What is a 'jagged array' and how is it created with double pointers?",
      a: "A 2D array where each row has a different number of columns. Created by allocating row pointers, then each row with its own size.",
    },
    {
      q: "Why is `int **` not the same as `int[][]`?",
      a: "`int[][]` is a contiguous 2D array in memory; `int **` is an array of pointers to separate rows. They are not interchangeable.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Header Section */}
        <div
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]"
          style={{ animationFillMode: "both" }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Topic 5: Real-world Use Cases of Double Pointers
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Double pointers are not just academic—they power essential data structures and patterns in systems programming. 
            This topic explores how linked structures (lists, trees), arrays of strings, and dynamic 2D arrays leverage double pointers 
            to achieve flexibility and efficiency.
          </p>
        </div>

        {/* Conceptual Explanation */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">Why Double Pointers Matter in Real Code</h2>
          <p className="leading-relaxed">
            In professional C programming, double pointers solve three fundamental problems:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Modifying pointers inside functions</strong> – Without double pointers, a function cannot change the caller's pointer (e.g., updating the head of a linked list).</li>
            <li><strong>Creating dynamic arrays of pointers</strong> – An array of strings (<code>char *argv[]</code>) or an array of function pointers is essentially a double pointer.</li>
            <li><strong>Building heterogeneous/jagged data structures</strong> – Each row of a 2D array can have a different size, and double pointers make this natural.</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="italic">💡 <strong>Think about:</strong> How would you write a function that adds a node to the beginning of a linked list without using double pointers? You'd have to return the new head, which is error-prone and less intuitive.</p>
          </div>
        </section>

        {/* Example 1: Linked List Insertion (Double Pointer) */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Use Case 1: Linked Structures (Linked List)</h2>
          <p>
            In a singly linked list, inserting at the head requires updating the head pointer. Passing a double pointer 
            (<code>Node **head</code>) allows the function to modify the original head variable.
          </p>
          <EditableCCodeBlock
            title="Example: Insert at head using double pointer"
            initialCode={linkedListExample}
          />
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
            <p><strong>Observation:</strong> The <code>insertHead</code> function receives <code>Node **head</code>. Inside, <code>*head = newNode</code> directly updates the caller's pointer.</p>
          </div>
        </section>

        {/* Example 2: Array of Strings (argv style) */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Use Case 2: Array of Pointers (Strings)</h2>
          <p>
            Command-line arguments (<code>char *argv[]</code>) are an array of pointers to strings. A double pointer 
            (<code>char **argv</code>) gives you the ability to iterate, sort, or modify the array dynamically.
          </p>
          <EditableCCodeBlock
            title="Example: Sorting an array of strings"
            initialCode={arrayOfStringsExample}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This example shows how double pointers enable generic string handling, a cornerstone of many CLI tools.
          </p>
        </section>

        {/* Example 3: Dynamic 2D Array (Jagged Matrix) */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">Use Case 3: Dynamic 2D Arrays (Jagged Arrays)</h2>
          <p>
            A 2D array where each row can have a different length (e.g., storing words of varying lengths). Double pointers 
            (<code>int **matrix</code>) allow row-wise allocation and easy swapping of rows.
          </p>
          <EditableCCodeBlock
            title="Example: Creating a jagged 2D array"
            initialCode={dynamic2DArrayExample}
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p><strong>⚠️ Common Pitfall:</strong> Forgetting to free each row before freeing the array of pointers leads to memory leaks. Always free in reverse order of allocation.</p>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Use double pointers to "return" multiple pointers:</strong> Instead of returning a pointer, modify one via double pointer and return a status code.</li>
            <li><strong>Prefer <code>typedef</code> for readability:</strong> <code>typedef struct Node *NodePtr;</code> then <code>NodePtr *head</code> makes double pointer intent clearer.</li>
            <li><strong>In function declarations, write <code>int **arr</code> but think "pointer to pointer to int".</strong> This mental model helps when debugging.</li>
            <li><strong>For 2D arrays, consider flat 1D array + index arithmetic if performance matters.</strong> Double pointer 2D arrays have extra indirection and may be slower due to cache misses.</li>
            <li><strong>Always check allocation success:</strong> <code>if (!*ptr) { /* handle error */ }</code> after allocating via double pointer.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">✅ Best Practices with Double Pointers</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Initialize double pointers to NULL:</strong> <code>Node **head = NULL;</code> before passing to functions.</li>
            <li><strong>Use consistent naming:</strong> <code>ppHead</code> (pointer-to-pointer head) or <code>headPtr</code> makes code self-documenting.</li>
            <li><strong>Validate before dereferencing:</strong> Always check that the double pointer itself is not NULL, then check <code>*ptr</code> if needed.</li>
            <li><strong>Prefer returning allocated memory via return value when possible</strong> – double pointers are most useful when you need to modify existing pointer.</li>
            <li><strong>Document ownership:</strong> Comment whether the caller or callee is responsible for freeing memory allocated via double pointer.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Forgetting to dereference:</strong> Using <code>head</code> instead of <code>*head</code> inside a function that receives <code>Node **head</code> modifies the local copy, not the original pointer.</li>
            <li><strong>Memory leak when reallocating:</strong> Assigning <code>*ptr = newPtr</code> without freeing old <code>*ptr</code> loses the original memory.</li>
            <li><strong>Assuming <code>int **</code> and <code>int[][]</code> are same:</strong> They have different memory layouts and are not interchangeable in function calls.</li>
            <li><strong>Double free:</strong> Freeing rows then the main pointer is correct, but freeing the main pointer first makes row pointers inaccessible.</li>
            <li><strong>Off-by-one errors in 2D array indexing:</strong> Remember that <code>arr[i][j]</code> with double pointers involves two dereferences; a mistake in allocation leads to segmentation fault.</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                <p className="font-semibold text-blue-600 dark:text-blue-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div
          className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]"
          style={{ animationFillMode: "both" }}
        >
          <Teacher
            note="Double pointers can be intimidating, but remember: they are just pointers to pointers. When you see `**` in a function parameter, ask: 'Does this function need to modify the original pointer?' If yes, that's the perfect use. Practice with linked list insertion and dynamic 2D arrays—these two examples cover 90% of real-world double pointer usage. For Barrackpore CNAT students: visualize `head` as the address of the first node, and `*head` as the node itself. Changing `*head` inside a function changes the caller's head."
          />
        </div>

        {/* Mini Checklist */}
        <div
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]"
          style={{ animationFillMode: "both" }}
        >
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – What You Should Remember</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Double pointer = pointer to pointer = can modify original pointer</li>
            <li>✅ Used for: linked list head modification, array of strings, dynamic 2D arrays</li>
            <li>✅ Allocation: allocate row pointers first, then each row</li>
            <li>✅ Deallocation: free each row, then free row pointers</li>
            <li>✅ <code>char **argv</code> is the classic example</li>
            <li>✅ Always check for NULL after allocation via double pointer</li>
            <li>✅ Do not confuse <code>int **</code> with 2D static arrays</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic5;