import React, { Component } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Layers
} from "lucide-react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic2 extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 120);
  }

  render() {
    return (
      <div className="space-y-12 leading-relaxed text-slate-700 dark:text-slate-200">
        <style>{animationStyles}</style>

        {/* TITLE */}
        <section className={`p-6 rounded-2xl bg-white dark:bg-slate-900 shadow hover:shadow-xl transition-all duration-300 ${
          this.state.visible && "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
        }`}>
          <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-300">
            Topic 3 – Creating User-Defined Modules in Python
          </h1>
          <p className="mt-2">
            A user-defined module is a normal Python file that stores reusable
            functions or variables so that many programs can use the same logic.
          </p>
        </section>

        {/* STEP 1 */}
        <section className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-sky-500 flex gap-2 items-center">
            <BookOpen size={20}/> Step 1 – Create a Module File
          </h2>

          <EditablePythonCodeBlock
            title="mymath.py"
            code={`def square(n):
    return n * n

def cube(n):
    return n * n * n`}
          />
        </section>

        {/* STEP 2 */}
        <section className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-indigo-500 flex gap-2 items-center">
            <Layers size={20}/> Step 2 – Import the Module
          </h2>

          <EditablePythonCodeBlock
            title="main.py"
            code={`import mymath

print(mymath.square(5))
print(mymath.cube(3))`}
          />
        </section>

        {/* STEP 3 */}
        <section className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-emerald-500">
            Step 3 – Import Only Required Functions
          </h2>

          <EditablePythonCodeBlock
            title="Selective Import"
            code={`from mymath import square

print(square(7))`}
          />
        </section>

        {/* COMMON PITFALLS */}
        <section className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-rose-500 flex gap-2 items-center">
            <AlertTriangle size={20}/> Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Wrong file name or folder location</li>
            <li>Using capital letters in module names</li>
            <li>Circular imports between files</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className="p-6 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-emerald-600 flex gap-2 items-center">
            <CheckCircle size={20}/> Best Practices
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Keep module names lowercase</li>
            <li>One module for one responsibility</li>
            <li>Document functions clearly</li>
          </ul>
        </section>

        {/* HINT */}
        <section className="p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-yellow-600 flex gap-2 items-center">
            <HelpCircle size={20}/> Hint
          </h2>
          <p>Try renaming your module file and observe the import error.</p>
        </section>

        {/* TEACHER NOTE */}
        <section className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold flex gap-2 items-center">
            <Lightbulb size={20}/> Teacher’s Note
          </h2>
          <p className="mt-2">
            Creating your own modules is the foundation of writing scalable
            Python applications. Encourage students to break large programs into
            meaningful files.
          </p>
        </section>
      </div>
    );
  }
}
