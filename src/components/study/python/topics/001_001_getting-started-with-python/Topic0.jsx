import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import { ArrowUpRight } from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          What is Python and Where It Is Used?
        </h2>

        {/* Introduction */}
        <p className="text-slate-300 text-sm leading-relaxed">
          Python is a powerful, high-level, general-purpose programming language 
          known for its simplicity and readability. Created by Guido van Rossum 
          in 1991, Python has become one of the most popular languages in the world.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          It is widely used in <strong>web development</strong>, <strong>data science</strong>, 
          <strong>machine learning</strong>, <strong>automation</strong>, 
          <strong>cybersecurity</strong>, <strong>IoT</strong>, 
          <strong>software development</strong>, and much more.  
          The main reason for Python’s popularity is its beginner-friendly 
          syntax and massive ecosystem of libraries.
        </p>

        <hr className="border-slate-700" />

        {/* Why Python? */}
        <h3 className="text-lg text-slate-200 font-semibold">Why Python Is So Popular</h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>Easy to read and write</li>
          <li>Huge number of ready-made libraries</li>
          <li>Can be used for small scripts to large applications</li>
          <li>Massive community and career opportunities</li>
          <li>Cross-platform and highly flexible</li>
        </ul>

        <hr className="border-slate-700" />

        {/* First Python Program */}
        <h3 className="text-lg text-slate-200 font-semibold">Your First Python Program</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python programs are saved with <code>.py</code> extension and run using Python 
          interpreter. Below is the classic first program.
        </p>

        <a
          href="/python-play"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 flex items-center gap-2 font-semibold hover:text-sky-300 transition"
        >
          Try your code in Playground
          <ArrowUpRight size={18} />
        </a>

        <EditablePythonCodeBlock

          language="python"
          initialCode={`print("Welcome to Python Programming!")`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          The <code>print()</code> function outputs text to the screen. This makes it 
          useful for learning, debugging, and displaying results.
        </p>

        <hr className="border-slate-700" />

        {/* Where Python Is Used */}
        <h3 className="text-lg text-slate-200 font-semibold">Where Is Python Used?</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python is used in almost every modern technology field:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>Web Development (Django, Flask)</li>
          <li>Data Science (NumPy, Pandas, Matplotlib)</li>
          <li>Machine Learning & AI (TensorFlow, Scikit-learn)</li>
          <li>Automation & Scripting</li>
          <li>Cybersecurity & Ethical Hacking</li>
          <li>Game Development</li>
          <li>Desktop Applications</li>
          <li>IoT & Robotics</li>
        </ul>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm">
          Python is simple yet extremely powerful, making it an ideal language 
          for both beginners and professionals. Understanding what Python is and 
          where it is used sets the foundation for learning deeper concepts in 
          this course.
        </p>
      </div>
    );
  }
}
