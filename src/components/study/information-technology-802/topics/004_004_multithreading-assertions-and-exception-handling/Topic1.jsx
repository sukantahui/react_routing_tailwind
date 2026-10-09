import React, { useState } from 'react';
import { 
  GitBranch, Code, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Layers, Zap, Copy, Check, Shield
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const ThreadCreationComparison = () => {
  const [activeTab, setActiveTab] = useState('runnable'); // 'thread' | 'runnable'

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <GitBranch className="w-3.5 h-3.5" /> Implementation Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Extending Thread Class vs Implementing Runnable Interface
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('thread')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'thread'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            1. Extending Thread
          </button>
          <button
            onClick={() => setActiveTab('runnable')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'runnable'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            2. Implementing Runnable (Recommended)
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Java Source Code</span>
            <span className="font-mono text-emerald-400">
              {activeTab === 'thread' ? 'extends Thread' : 'implements Runnable'}
            </span>
          </div>

          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
            {activeTab === 'thread' ? (
`// Approach 1: Extending java.lang.Thread class
class NumberPrinter extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Thread Count: " + i);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        NumberPrinter t1 = new NumberPrinter();
        t1.start(); // Directly calls start() on subclass instance
    }
}`
            ) : (
`// Approach 2: Implementing java.lang.Runnable interface (Best Practice)
class MessagePrinter implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Runnable Task: " + i);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MessagePrinter task = new MessagePrinter();
        Thread t1 = new Thread(task); // Pass target task into Thread object
        t1.start(); // Spawns new thread
    }
}`
            )}
          </pre>
        </div>

        {/* Evaluation & Insights */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {activeTab === 'thread' ? 'Extending Thread Characteristics' : 'Implementing Runnable Advantages'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeTab === 'thread' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Direct and quick syntax for simple single-purpose background workers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Inheritance Limitation:</strong> Your class cannot extend any other superclass because Java does not allow multiple class inheritance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Tightly couples thread management code with actual business logic.</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Free to Extend Superclasses:</strong> Your class can extend classes like <code className="text-sky-300">Applet</code>, <code className="text-sky-300">JFrame</code>, or custom base classes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Clean Separation of Concerns:</strong> Task logic is decoupled from thread creation/execution mechanics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>Seamlessly compatible with Java Thread Pools and Executor frameworks.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="text-amber-400 font-bold block mb-1">Board Exam Tip:</span>
            {activeTab === 'thread' 
              ? 'To start: create instance -> call t.start()' 
              : 'To start: create Runnable -> pass to new Thread(runnable) -> call t.start()'}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Two Ways of Creating Threads in Java: Extending Thread Class vs Implementing Runnable Interface
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Master the two distinct mechanisms for thread creation in Java, contrast their architectural trade-offs, and learn why implementing the Runnable interface is standard industry practice.
          </p>
        </div>

        {/* Interactive Comparison Visualizer */}
        <ThreadCreationComparison />

        {/* Detailed Comparison Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            Direct Comparison Matrix for CBSE Board Examination
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-800">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 border border-slate-800">Criteria</th>
                  <th className="p-3 border border-slate-800 text-amber-400">1. Extending Thread Class</th>
                  <th className="p-3 border border-slate-800 text-emerald-400">2. Implementing Runnable Interface</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold border border-slate-800">Core Keyword</td>
                  <td className="p-3 border border-slate-800 font-mono text-amber-300">class MyTask extends Thread</td>
                  <td className="p-3 border border-slate-800 font-mono text-emerald-300">class MyTask implements Runnable</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-slate-800">Multiple Inheritance</td>
                  <td className="p-3 border border-slate-800 text-rose-400 font-semibold">Not allowed (Locks out other superclasses)</td>
                  <td className="p-3 border border-slate-800 text-emerald-400 font-semibold">Allowed (Can extend another superclass)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-slate-800">Instantiation Syntax</td>
                  <td className="p-3 border border-slate-800 font-mono">MyTask t = new MyTask(); t.start();</td>
                  <td className="p-3 border border-slate-800 font-mono">Thread t = new Thread(new MyTask()); t.start();</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-slate-800">Required Method</td>
                  <td className="p-3 border border-slate-800 font-mono">public void run()</td>
                  <td className="p-3 border border-slate-800 font-mono">public void run()</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="A classic CBSE board question asks: 'Why is implementing Runnable preferred over extending Thread?' The definitive answer is: Java does not allow multiple inheritance of classes. If you extend Thread, your class is locked and cannot extend any other parent class. With Runnable, you can extend any parent class while still executing as a thread!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Two Ways of Thread Creation"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic1;
