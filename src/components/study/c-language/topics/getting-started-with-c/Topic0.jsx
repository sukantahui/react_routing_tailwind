import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import { ArrowUpRight } from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          What is C Programming and Why It Is Important?
        </h2>

        {/* Introduction */}
        <p className="text-slate-300 text-sm leading-relaxed">
          **C programming** is a powerful, general-purpose programming language
          developed by **Dennis Ritchie** at Bell Labs in the early 1970s.
          It is known as the “**mother of all modern languages**” because many
          popular languages — including C++, Java, Python, JavaScript, Go,
          and Rust — are either written in C or heavily influenced by it.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          C is widely used in **system programming**, **embedded systems**, 
          **operating systems**, **compiler development**, and performance-critical 
          applications. It gives programmers low-level memory access,
          full control over hardware, and extremely high execution speed.
        </p>

        <hr className="border-slate-700" />

        {/* Why C is Important */}
        <h3 className="text-lg text-slate-200 font-semibold">Why C Is Important</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          C remains one of the most important programming languages for several key reasons:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>It is the **foundation** of modern programming languages.</li>
          <li>C programs run **extremely fast**, making them ideal for system-level use.</li>
          <li>C gives direct access to **memory**, **pointers**, and **hardware**.</li>
          <li>Operating systems like **Windows**, **Linux**, **macOS**, and tools like **Git** are written in C.</li>
          <li>It is widely used in **microcontrollers**, **IoT**, **automotive systems**, and robotics.</li>
        </ul>

        <p className="text-slate-300 text-sm leading-relaxed">
          Learning C improves your understanding of how computers actually work—memory,
          compilation, CPU operations, and low-level architecture.
          This makes you a more powerful and confident programmer in any language.
        </p>

        <hr className="border-slate-700" />

        {/* First C Program */}
        <h3 className="text-lg text-slate-200 font-semibold">Your First C Program</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          A simple C program prints text on the screen using the{" "}
          <code>printf()</code> function. Every C program starts with a{" "}
          <code>main()</code> function.
        </p>

        {/* Playground Link */}
        <a
          href="/play"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 flex items-center gap-2 font-semibold hover:text-sky-300 transition"
        >
          Try your code in Playground
          <ArrowUpRight size={18} />
        </a>

        <EditableCodeBlock
          language="c"
          initialCode={
            `#include <stdio.h>

int main() {
    printf("Welcome to C Programming!\\n");
    return 0;
}`
          }
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          This program demonstrates the basic structure of a C program:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><code>#include &lt;stdio.h&gt;</code> → imports input/output functions like <code>printf()</code></li>
          <li><code>main()</code> → starting point of every C program</li>
          <li><code>return 0;</code> → tells OS that program ended successfully</li>
        </ul>

        <hr className="border-slate-700" />

        {/* Features of C */}
        <h3 className="text-lg text-slate-200 font-semibold">Key Features of C</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><strong>Fast & Efficient:</strong> Used for performance-critical systems.</li>
          <li><strong>Portable:</strong> Write once, run anywhere with minor changes.</li>
          <li><strong>Low-level Access:</strong> Work directly with memory using pointers.</li>
          <li><strong>Structured Language:</strong> Helps in writing clean, modular programs.</li>
          <li><strong>Extensible:</strong> You can build your own libraries & functions easily.</li>
        </ul>

        <hr className="border-slate-700" />

        {/* Small Example */}
        <h3 className="text-lg text-slate-200 font-semibold">Another Example</h3>

        <EditableCodeBlock
          language="c"
          initialCode={
            `#include <stdio.h>

int main() {
    int age = 25;
    printf("My age is: %d", age);
    return 0;
}`
          }
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          This example shows how C handles variables, integers, and output formatting.
        </p>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm leading-relaxed">
          C is the language that powers operating systems, hardware devices,
          compilers, scientific applications, and high-performance tools.
          Understanding C gives you strong control over memory, logic,
          and the deeper workings of the computer.
          It is one of the best first languages for building a strong programming foundation.
        </p>
      </div>
    );
  }
}
