import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
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
          <strong>C programming</strong> is a powerful, general-purpose programming language
          developed by <strong>Dennis Ritchie</strong> at Bell Labs in the early 1970s.
          It is known as the “<strong>mother of all modern languages</strong>” because many
          popular languages—like C++, Java, Python, JavaScript, Go, and Rust—are either
          written in C or heavily inspired by it.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          C is widely used in <strong>system programming</strong>, <strong>embedded systems</strong>,
          <strong> operating systems</strong>, <strong>compiler development</strong>, and
          performance-critical applications. It gives programmers low-level memory access,
          full control over hardware, and extremely high execution speed.
        </p>

        <hr className="border-slate-700" />

        {/* Why C is Important */}
        <h3 className="text-lg text-slate-200 font-semibold">Why C Is Important</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>C is the <strong>foundation</strong> of modern programming.</li>
          <li>Programs written in C are <strong>extremely fast</strong>.</li>
          <li>C provides <strong>direct memory and hardware access</strong>.</li>
          <li>Linux, Windows, macOS, databases, and Git are written in C.</li>
          <li>Used heavily in <strong>microcontrollers</strong>, <strong>IoT</strong>,
              <strong> robotics</strong>, and <strong>automotive</strong> systems.</li>
        </ul>

        <p className="text-slate-300 text-sm leading-relaxed">
          Learning C helps you understand how computers work internally—memory, CPU,
          instructions, compilation, and architecture. This makes you stronger in every
          other programming language.
        </p>

        <hr className="border-slate-700" />

        {/* First C Program */}
        <h3 className="text-lg text-slate-200 font-semibold">Your First C Program</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          A simple C program prints text on the screen using <code>printf()</code>.
          Every C program must have a <code>main()</code> function.
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

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    printf("Welcome to C Programming!\\n");
    return 0;
}`}
        />

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><code>#include &lt;stdio.h&gt;</code> — gives access to input/output functions.</li>
          <li><code>main()</code> — the starting point of every C program.</li>
          <li><code>return 0;</code> — tells the OS that the program ended successfully.</li>
        </ul>

        <hr className="border-slate-700" />

        {/* Key Features */}
        <h3 className="text-lg text-slate-200 font-semibold">Key Features of C</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><strong>Fast & Efficient:</strong> Ideal for OS, drivers, and high-performance tools.</li>
          <li><strong>Portable:</strong> Works across platforms with minimal changes.</li>
          <li><strong>Low-level Access:</strong> Direct control using pointers.</li>
          <li><strong>Structured Language:</strong> Encourages clean, organized code.</li>
          <li><strong>Extensible:</strong> You can create your own reusable libraries.</li>
        </ul>

        <hr className="border-slate-700" />

        {/* Second Code Example */}
        <h3 className="text-lg text-slate-200 font-semibold">Another Simple Example</h3>

        <EditableCCodeBlock
          language="c"
          initialCode={`#include <stdio.h>

int main() {
    int age = 25;
    printf("My age is: %d", age);
    return 0;
}`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          This program introduces variables and formatted output using placeholders.
        </p>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm leading-relaxed">
          C powers compilers, embedded devices, operating systems, scientific tools,
          and high-performance applications. Mastering C builds a deep understanding of
          memory, logic, and computer architecture—making you a stronger programmer
          in every modern language.
        </p>
      </div>
    );
  }
}
