import React from "react";
import Whiteboard from "../../../../../common/Whiteboard";
import onesCompImg from "./pictures/image.png";
export default function Topic6() {
  return (
    <div className="space-y-10">

      {/* ===================== INTRO ===================== */}
      <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
        <h1 className="text-3xl font-bold text-sky-300">
          Topic 6 – 1’s Complement Representation
        </h1>

        <p>
          In <span className="text-emerald-300 font-semibold">1’s Complement representation</span>,
          positive numbers are written in their normal binary form.
          Negative numbers are obtained by
          <span className="text-yellow-300 font-semibold"> inverting every bit</span>
          of the corresponding positive number.
        </p>
      </section>

      {/* ===================== RULE ===================== */}
      <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">Rule for Forming 1’s Complement</h2>

        <ul className="list-disc list-inside space-y-2">
          <li>Write the binary form of the positive number.</li>
          <li>Change all 0s to 1s and all 1s to 0s.</li>
          <li>The result gives the negative number in 1’s Complement form.</li>
        </ul>
      </section>

      {/* ===================== EXAMPLES ===================== */}
      <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">Examples (4-bit)</h2>

        <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
{`
+5 = 0101
-5 = 1010  (1’s complement of 0101)

+3 = 0011
-3 = 1100  (1’s complement of 0011)
`}
        </pre>
      </section>

      {/* ===================== TABLE ===================== */}
      <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">Signed Decimal to 1’s Complement</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center border border-slate-700">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-2 border border-slate-700">Signed Decimal</th>
                <th className="p-2 border border-slate-700">1’s Complement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">+0</td>
                <td className="p-2 border border-slate-700 font-mono">0000</td>
              </tr>
              <tr className="bg-slate-800">
                <td className="p-2 border border-slate-700">-0</td>
                <td className="p-2 border border-slate-700 font-mono">1111</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">+5</td>
                <td className="p-2 border border-slate-700 font-mono">0101</td>
              </tr>
              <tr className="bg-slate-800">
                <td className="p-2 border border-slate-700">-5</td>
                <td className="p-2 border border-slate-700 font-mono">1010</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-5">

  <h2 className="text-2xl font-bold text-sky-300">
    Uses of 1’s Complement Binary Numbers
  </h2>

  <p>
    1’s Complement binary numbers are widely used in
    <span className="text-emerald-300 font-semibold"> signed binary number representation</span>
    and in performing arithmetic operations such as
    <span className="text-yellow-300 font-semibold"> addition and subtraction</span>.
  </p>

  {/* ===================== SIGNED REPRESENTATION ===================== */}
  <div className="bg-slate-800 p-4 rounded-xl space-y-3">
    <h3 className="text-lg font-semibold text-emerald-300">
      1’s Complement in Signed Binary Number Representation
    </h3>

    <p>
      In this system:
    </p>

    <ul className="list-disc list-inside space-y-1">
      <li>Positive numbers are written directly in binary form.</li>
      <li>Negative numbers are represented by taking the <span className="text-yellow-300 font-semibold">1’s complement</span> of the corresponding positive number.</li>
      <li>The <span className="text-red-300 font-semibold">MSB is always 1</span> for negative numbers.</li>
    </ul>
  </div>

  {/* ===================== EXAMPLE ===================== */}
  <div className="bg-slate-800 p-4 rounded-xl">
    <h3 className="text-lg font-semibold text-emerald-300 mb-2">
      Example (Using 5-bit Register)
    </h3>

    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
{`
Step (i)   +5 = 0 0101

Step (ii)  Take 1’s complement of 0 0101

           -5 = 1 1010
`}
    </pre>

    <p className="mt-2">
      Since the <span className="text-red-300 font-semibold">MSB is 1</span>,
      the number is identified as negative.
    </p>
  </div>

  {/* ===================== RANGE ===================== */}
  <div className="bg-slate-800 p-4 rounded-xl space-y-2">
    <h3 className="text-lg font-semibold text-emerald-300">
      Range of Numbers
    </h3>

    <p>
      For a <span className="text-sky-300 font-semibold">k-bit register</span>:
    </p>

    <ul className="list-disc list-inside">
      <li>
        Largest positive number =
        <span className="font-mono text-sky-300"> 2^(k-1) − 1</span>
      </li>
      <li>
        Smallest negative number =
        <span className="font-mono text-sky-300"> −(2^(k-1) − 1)</span>
      </li>
    </ul>
  </div>

  <div className="flex justify-center">
  <img
    src={onesCompImg}
    alt="1's Complement Representation Example"
    className="max-w-xl w-full rounded-xl shadow-lg border border-slate-700"
  />
</div>

  {/* ===================== DRAWBACK ===================== */}
  <div className="bg-red-900/30 p-4 rounded-xl border border-red-700">
    <h3 className="text-lg font-semibold text-red-400 mb-2">
      Drawback
    </h3>
    <p>
      Zero has <span className="text-red-300 font-semibold">two representations</span>:
    </p>
    <p className="mt-1 font-mono text-sky-300">
      +0 = 0 0000 &nbsp;&nbsp;&nbsp; and &nbsp;&nbsp;&nbsp; -0 = 1 1111
    </p>
  </div>

  {/* ===================== NEXT ===================== */}
  <div className="bg-slate-800 p-4 rounded-xl">
    <p className="text-yellow-300 font-semibold">
      Next we will study arithmetic operations — Addition and Subtraction using
      1’s Complement binary numbers.
    </p>
  </div>

</section>

<section>
    <Whiteboard/>
</section>

<section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-6">

  <h2 className="text-2xl font-bold text-sky-300">
    Arithmetic Operations: Subtractions and Additions in 1’s Complement Binary Numbers
  </h2>

  <p>
    Lets see arithmetic operations: Subtractions and Additions in 1’s complement binary numbers.
  </p>

  {/* ================= SUBTRACTION ================= */}
  <div className="bg-slate-800 p-5 rounded-xl space-y-4">
    <h3 className="text-xl font-semibold text-emerald-300">
      Subtractions by 1’s Complement
    </h3>

    <p>
      The algorithm to subtract two binary number using 1’s complement is explained as following below:
    </p>

    <ul className="list-disc list-inside space-y-1">
      <li>Take 1’s complement of the subtrahend</li>
      <li>Add with minuend</li>
      <li>If the result of above addition has carry bit 1, then add it to the least significant bit (LSB) of given result</li>
      <li>If there is no carry bit 1, then take 1’s complement of the result which will be negative</li>
    </ul>

    <p>
      Note that subtrahend is number that to be subtracted from the another number, i.e., minuend.
    </p>

    <div className="bg-slate-900 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-sky-300">
        Example (Case-1: When Carry bit 1): Evaluate 10101 - 00101
      </h4>

      <pre className="font-mono text-sky-300 text-sm leading-6 mt-2">
{`
According to above algorithm, take 1’s complement of subtrahend 00101, which will be 11010,
then add both of these.

10101 + 11010 = 1 01111

Since, there is carry bit 1, so add this to the LSB of given result,
i.e., 01111 + 1 = 10000 which is the answer.
`}
      </pre>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-sky-300">
        Example (Case-2: When no Carry bit): Evaluate 11110 with 1110
      </h4>

      <pre className="font-mono text-sky-300 text-sm leading-6 mt-2">
{`
According to above algorithm, take 1’s complement of subtrahend 11110, which will be 00011.
Then add both of these,

11001 + 00011 = 11100

Since there is no carry bit 1, so take 1’s complement of above result,
which will be 00011, and this is negative number, i.e., 00011, which is the answer.
`}
      </pre>
    </div>

    <p>
      Similarly, you can subtract two mixed (with fractional part) binary numbers.
      Note that you always add Carry bit the the least significant bit (LSB) of the result,
      whenever you get carry bit 1. LSB of fractional binary number is last (rightmost) bit
      of mixed or fractional binary numbers.
    </p>
  </div>

  {/* ================= ADDITION ================= */}
  <div className="bg-slate-800 p-5 rounded-xl space-y-4">
    <h3 className="text-xl font-semibold text-emerald-300">
      Additions by 1’s Complement
    </h3>

    <p>
      There are difference scenario for addition of two binary numbers using 1’s complement.
      These are explained as following below.
    </p>

    <div className="bg-slate-900 p-4 rounded-xl">
      <h4 className="text-sky-300 font-semibold">
        Case-1: Addition of positive and negative number when positive number has greater magnitude
      </h4>

      <pre className="font-mono text-sky-300 text-sm leading-6 mt-2">
{`
When positive number has greater magnitude, then take simply 1’s complement of negative number
and the end-around carry of the sum is added to the least significant bit (LSB).

Example: Add 1110 and -1101.

Take 1’s complement of 1101, which will be 0010.
1110 + 0010 = 1 0000
Then add this carry bit to the LSB,
0000 + 1 = 0001 which is the answer.
`}
      </pre>
    </div>

    <p>
      Note that if the register size is big then fill the same value of MSB
      to preserve sign magnitude for inputs and output.
    </p>

    <div className="bg-slate-900 p-4 rounded-xl">
      <h4 className="text-sky-300 font-semibold">
        Case-2: Addition of positive and negative number when negative number has greater magnitude
      </h4>

      <pre className="font-mono text-sky-300 text-sm leading-6 mt-2">
{`
Example: Add 1010 and -1100 in five-bit registers.

These numbers become 01010 and -01100.
Take 1’s complement of 01100 = 10011
01010 + 10011 = 11101

Since there is no end-around carry bit,
take 1’s complement of 11101 = 00010,
so result is -00010.
`}
      </pre>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl">
      <h4 className="text-sky-300 font-semibold">
        Case-3: Addition of two negative numbers
      </h4>

      <pre className="font-mono text-sky-300 text-sm leading-6 mt-2">
{`
Example: Add -1010 and -0101 in five-bit registers.

These become -01010 and -00101.

Add complements:
10101 + 11010 = 1 01111

End-around carry:
01111 + 1 = 10000

Take 1’s complement of 10000 = 01111
So result is -01111.
`}
      </pre>
    </div>

    <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-700">
      <p className="text-yellow-300 font-semibold">
        End-around-carry-bit addition occurs only in 1’s complement arithmetic operations
        but not in 2’s complement arithmetic operations.
      </p>
    </div>
  </div>

</section>




      {/* ===================== NOTE ===================== */}
      <section className="bg-yellow-900/30 p-6 rounded-2xl border border-yellow-700">
        <h2 className="text-xl font-bold text-yellow-300 mb-2">Important Note</h2>
        <p className="text-yellow-200">
          In 1’s Complement system, zero has two representations:
          <span className="font-mono text-sky-300"> 0000 </span> and
          <span className="font-mono text-sky-300"> 1111</span>.
          Hence, ambiguity of zero still exists.
        </p>
      </section>


    </div>
  );
}
