import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-sky-300">
        Using IDLE, VS Code, and PyCharm
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Python can be written and executed using different tools called IDEs (Integrated
        Development Environments). Each tool has different features suited for beginners,
        students, and professional developers.
      </p>

      {/* IDLE Section */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">1. IDLE (Bundled with Python)</h3>
        <p className="text-slate-300 text-sm">
          IDLE comes automatically with Python installation. It is lightweight and easy
          for beginners. You can write, run, and test small Python programs.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# Running a program in IDLE
print("Welcome to IDLE!")`}
        />
      </section>

      {/* VS Code Section */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">2. Visual Studio Code</h3>
        <p className="text-slate-300 text-sm">
          VS Code is a powerful editor supporting extensions, debugging tools, IntelliSense,
          Git integration, themes, and terminal support — widely used by professional developers.
        </p>

        <p className="text-slate-400 text-sm">
          Install the official “Python Extension” by Microsoft for best experience.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# Python code in VS Code terminal
print("Hello from VS Code!")`}
        />
      </section>

      {/* PyCharm Section */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">3. PyCharm</h3>
        <p className="text-slate-300 text-sm">
          PyCharm is a professional-grade IDE by JetBrains. It includes advanced debugging,
          code suggestions, refactoring tools, project navigation, and powerful automation.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# PyCharm example
name = "Python Developer"
print("Welcome,", name)`}
        />
      </section>

      {/* Teacher Tips */}
      <section className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>
        <ul className="list-disc text-slate-300 text-sm ml-6 mt-2 space-y-1">
          <li>IDLE is best for beginners and school-level learning.</li>
          <li>VS Code is ideal for long-term learning and real projects.</li>
          <li>PyCharm is the strongest choice for professional developers.</li>
          <li>Try all 3 tools to see which one feels most comfortable.</li>
        </ul>
      </section>

    </div>
  );
}
