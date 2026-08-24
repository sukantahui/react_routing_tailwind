import React, { Component } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Dice6,
  Sigma,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic1 extends Component {
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
            Topic 2 – Built-in Modules: math & random
          </h1>
          <p className="mt-3">
            The <b>math</b> and <b>random</b> modules are the backbone of
            calculations, simulations, quizzes, gaming logic and automation.
          </p>
        </section>

        {/* ================= MATH MODULE ================= */}
        <section className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-sky-500 flex gap-2 items-center">
            <Sigma size={20}/> math Module – Functions & Examples
          </h2>

          <table className="mt-4 w-full text-sm border">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="p-2 border">Function</th>
                <th className="p-2 border">Return</th>
                <th className="p-2 border">Purpose</th>
                <th className="p-2 border">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border">math.sqrt(x)</td><td className="p-2 border">float</td><td className="p-2 border">Square root</td><td className="p-2 border">math.sqrt(49) → 7.0</td></tr>
              <tr><td className="p-2 border">math.pow(x,y)</td><td className="p-2 border">float</td><td className="p-2 border">Power</td><td className="p-2 border">math.pow(2,3) → 8.0</td></tr>
              <tr><td className="p-2 border">math.floor(x)</td><td className="p-2 border">int</td><td className="p-2 border">Round down</td><td className="p-2 border">math.floor(3.8) → 3</td></tr>
              <tr><td className="p-2 border">math.ceil(x)</td><td className="p-2 border">int</td><td className="p-2 border">Round up</td><td className="p-2 border">math.ceil(3.2) → 4</td></tr>
              <tr><td className="p-2 border">math.factorial(n)</td><td className="p-2 border">int</td><td className="p-2 border">Factorial</td><td className="p-2 border">math.factorial(5) → 120</td></tr>
              <tr><td className="p-2 border">math.gcd(a,b)</td><td className="p-2 border">int</td><td className="p-2 border">Greatest common divisor</td><td className="p-2 border">math.gcd(20,8) → 4</td></tr>
              <tr><td className="p-2 border">math.sin(x)</td><td className="p-2 border">float</td><td className="p-2 border">Sine (radians)</td><td className="p-2 border">math.sin(math.pi/2)</td></tr>
              <tr><td className="p-2 border">math.log(x)</td><td className="p-2 border">float</td><td className="p-2 border">Natural log</td><td className="p-2 border">math.log(10)</td></tr>
            </tbody>
          </table>
        </section>

        {/* ================= RANDOM MODULE ================= */}
        <section className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-indigo-500 flex gap-2 items-center">
            <Dice6 size={20}/> random Module – Functions & Examples
          </h2>

          <table className="mt-4 w-full text-sm border">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="p-2 border">Function</th>
                <th className="p-2 border">Return</th>
                <th className="p-2 border">Purpose</th>
                <th className="p-2 border">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border">random.randint(a,b)</td><td className="p-2 border">int</td><td className="p-2 border">Random integer</td><td className="p-2 border">random.randint(1,6)</td></tr>
              <tr><td className="p-2 border">random.random()</td><td className="p-2 border">float</td><td className="p-2 border">0–1 float</td><td className="p-2 border">random.random()</td></tr>
              <tr><td className="p-2 border">random.choice(seq)</td><td className="p-2 border">element</td><td className="p-2 border">Pick one item</td><td className="p-2 border">random.choice([1,2,3])</td></tr>
              <tr><td className="p-2 border">random.shuffle(list)</td><td className="p-2 border">None</td><td className="p-2 border">Shuffle list</td><td className="p-2 border">random.shuffle(data)</td></tr>
              <tr><td className="p-2 border">random.sample(seq,n)</td><td className="p-2 border">list</td><td className="p-2 border">Pick n unique</td><td className="p-2 border">random.sample(range(1,10),3)</td></tr>
              <tr><td className="p-2 border">random.seed(x)</td><td className="p-2 border">None</td><td className="p-2 border">Fix output</td><td className="p-2 border">random.seed(10)</td></tr>
            </tbody>
          </table>
        </section>

        {/* COMMON PITFALLS */}
        <section className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-rose-500 flex gap-2 items-center">
            <AlertTriangle size={20}/> Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Using sin(90) instead of radians</li>
            <li>Expecting random.shuffle() to return a list</li>
            <li>Forgetting to import math or random</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-emerald-500 flex gap-2 items-center">
            <CheckCircle size={20}/> Best Practices
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use math.radians() before sin/cos</li>
            <li>Seed random when debugging</li>
            <li>Use descriptive variable names</li>
          </ul>
        </section>

        {/* HINT */}
        <section className="p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-yellow-600 flex gap-2 items-center">
            <HelpCircle size={20}/> Hint
          </h2>
          <p>Try calling random.seed(5) before randint and observe the output.</p>
        </section>

        {/* TEACHER NOTE */}
        <section className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold flex gap-2 items-center">
            <Lightbulb size={20}/> Teacher’s Note
          </h2>
          <p className="mt-2">
            Mastering math and random modules allows students to build real
            calculators, games and simulation engines with confidence.
          </p>
        </section>
      </div>
    );
  }
}
