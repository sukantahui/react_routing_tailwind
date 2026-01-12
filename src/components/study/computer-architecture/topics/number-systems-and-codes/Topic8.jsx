import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic8 extends Component {
  render() {
    return (
      <div className="space-y-10">

        {/* ===================== INTRO ===================== */}
        <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-4">
          <h1 className="text-3xl font-bold text-sky-300">
            Topic 8 – Range of Numbers in n-bit Signed Systems
          </h1>

          <p>
            In computer systems, integers are stored using a fixed number of bits.
            The total number of values that can be represented by an
            <span className="text-emerald-300 font-semibold"> n-bit system</span>
            is <span className="text-yellow-300 font-semibold">2ⁿ</span>.
          </p>

          <p>
            When signed numbers are stored, the available range depends on
            the method used to represent negative numbers.
          </p>
        </section>

        {/* ===================== SIGNED MAGNITUDE ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-2xl font-bold text-emerald-300">
            1️⃣ Signed–Magnitude System
          </h2>

          <ul className="list-disc list-inside">
            <li>
              Positive range:
              <span className="font-mono text-sky-300"> 0 to (2^(n−1) − 1)</span>
            </li>
            <li>
              Negative range:
              <span className="font-mono text-sky-300"> −(2^(n−1) − 1) to 0</span>
            </li>
          </ul>

          <p className="text-yellow-300">
            Two representations of zero exist: +0 and −0.
          </p>
        </section>

        {/* ===================== 1's COMPLEMENT ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-2xl font-bold text-emerald-300">
            2️⃣ 1’s Complement System
          </h2>

          <ul className="list-disc list-inside">
            <li>
              Positive range:
              <span className="font-mono text-sky-300"> 0 to (2^(n−1) − 1)</span>
            </li>
            <li>
              Negative range:
              <span className="font-mono text-sky-300"> −(2^(n−1) − 1) to 0</span>
            </li>
          </ul>

          <p className="text-yellow-300">
            Here also, two representations of zero exist.
          </p>
        </section>

        {/* ===================== 2's COMPLEMENT ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-2xl font-bold text-emerald-300">
            3️⃣ 2’s Complement System
          </h2>

          <ul className="list-disc list-inside">
            <li>
              Positive range:
              <span className="font-mono text-sky-300"> 0 to (2^(n−1) − 1)</span>
            </li>
            <li>
              Negative range:
              <span className="font-mono text-sky-300"> −2^(n−1) to −1</span>
            </li>
          </ul>

          <p className="text-emerald-300 font-semibold">
            Only one representation of zero exists in this system.
          </p>
        </section>

        {/* ===================== EXAMPLE ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-3">
          <h2 className="text-2xl font-bold text-emerald-300">
            Example: 8-bit System
          </h2>

          <ul className="list-disc list-inside">
            <li>
              Signed–Magnitude & 1’s Complement:
              <span className="font-mono text-sky-300"> −127 to +127</span>
            </li>
            <li>
              2’s Complement:
              <span className="font-mono text-sky-300"> −128 to +127</span>
            </li>
          </ul>
        </section>

        {/* ===================== PRACTICE WHITEBOARD ===================== */}
        <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-2xl font-bold text-sky-300">
            Practice Area – Calculate Ranges Yourself
          </h2>

          <p>
            Try calculating the ranges for 4-bit, 6-bit and 16-bit signed numbers
            using different representation systems.
          </p>

          <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
            <Whiteboard />
          </div>
        </section>

      </div>
    );
  }
}
