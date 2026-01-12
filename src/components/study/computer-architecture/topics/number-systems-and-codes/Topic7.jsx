import React from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default function Topic7() {
    return (
        <div className="space-y-10">

            {/* ===================== INTRO ===================== */}
            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                <h1 className="text-3xl font-bold text-sky-300">
                    Topic 7 – 2’s Complement Representation
                </h1>

                <p>
                    In <span className="text-emerald-300 font-semibold">2’s Complement representation</span>,
                    negative numbers are represented by taking the 1’s complement of the number
                    and then adding <span className="text-yellow-300 font-semibold">1</span> to the result.
                    This is the most widely used method for representing signed binary numbers in computers.
                </p>
            </section>

            {/* ===================== RULE ===================== */}
            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                <h2 className="text-2xl font-bold text-sky-300">Rule for Forming 2’s Complement</h2>

                <ul className="list-disc list-inside space-y-2">
                    <li>Write the binary form of the positive number.</li>
                    <li>Find the 1’s complement of the number.</li>
                    <li>Add <span className="text-yellow-300 font-semibold">1</span> to obtain the 2’s complement.</li>
                </ul>
            </section>

            {/* ===================== EXAMPLES ===================== */}
            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                <h2 className="text-2xl font-bold text-sky-300">Examples (4-bit)</h2>

                <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                    {`
+5 = 0101
1’s complement of 0101 = 1010
Add 1 → 1011
So, -5 = 1011

+3 = 0011
1’s complement = 1100
Add 1 → 1101
So, -3 = 1101
`}
                </pre>
            </section>

            {/* ===================== RANGE ===================== */}
            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                <h2 className="text-2xl font-bold text-sky-300">Range of Numbers</h2>

                <p>
                    For a <span className="text-sky-300 font-semibold">k-bit register</span>:
                </p>

                <ul className="list-disc list-inside space-y-1">
                    <li>Largest positive number = <span className="font-mono text-sky-300">2^(k-1) − 1</span></li>
                    <li>Smallest negative number = <span className="font-mono text-sky-300">−2^(k-1)</span></li>
                </ul>
            </section>

            {/* ===================== ADDITION ===================== */}
            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                <h2 className="text-2xl font-bold text-sky-300">Addition using 2’s Complement</h2>

                <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                    {`
Example: Add +5 and -3

+5 = 0101
-3 = 1101

0101
+1101
------
10010  → Ignore extra carry
0010 = +2 (Answer)
`}
                </pre>
            </section>

            {/* ===================== SUBTRACTION ===================== */}
            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                <h2 className="text-2xl font-bold text-sky-300">Subtraction using 2’s Complement</h2>

                <p>
                    To subtract a number, add the 2’s complement of the subtrahend with the minuend.
                </p>

                <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                    {`
Example: 6 - 4

+6 = 0110
+4 = 0100 → 2’s complement = 1100

0110
+1100
------
10010 → Ignore carry
0010 = 2 (Answer)
`}
                </pre>
            </section>

            {/* ===================== ADVANTAGES ===================== */}
            <section className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-700">
                <h2 className="text-xl font-bold text-emerald-300 mb-2">Advantages of 2’s Complement</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Only one representation of zero.</li>
                    <li>Arithmetic operations are simple and fast.</li>
                    <li>No end-around carry is required.</li>
                </ul>
            </section>

            {/* ===================== PRACTICE WHITEBOARD ===================== */}
            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-4">
                <h2 className="text-2xl font-bold text-sky-300">
                    Practice Area – Try 2’s Complement Yourself
                </h2>
                <p>
                    Write any number and convert it into its
                    <span className="text-emerald-300 font-semibold"> 2’s Complement</span>.
                </p>
                <div className="border border-slate-700 rounded-xl overflow-hidden h-[450px] bg-slate-800">
                    <Whiteboard />
                </div>
            </section>

            <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-10">

                <h2 className="text-3xl font-bold text-sky-300">
                    Three Ways to Represent Signed Integers
                </h2>

                <p>
                    There are three different ways to represent signed integer (article).
                    a: Signed bit, b: 1’s Complement, and c: 2’s Complement.
                    Let’s try to understand how these methods have derived and why 2’s complement is preferred over others.
                </p>

                <p>
                    As we know that data are stored in bits. How can we store signed integer in the memory?
                    To solve this problem, first we will develop a naïve solution and then will iterate it till we have the best solution for our problem.
                </p>

                {/* ================= a) SIGNED BIT ================= */}
                <h3 className="text-2xl font-semibold text-emerald-300">a) Signed Bit</h3>

                <p>
                    When trying to store a signed integer, it seems obvious to reserve the left most bit for sign and use remaining bits to actually store the values.
                    For example: in 4-bit system, first bit from left will be reserved for sign (0 represent positive whereas 1 represent negative) and other 3 bits will be used to store the values.
                    Similarly in 8-bit system, first bit from left will be used for sign and remaining 7 will be used for values.
                </p>

                <table className="w-full border border-slate-700 text-center text-sm font-mono">
                    <thead className="bg-slate-800 text-sky-300">
                        <tr><th>Binary</th><th>Decimal</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>0000</td><td>+0</td></tr>
                        <tr><td>0001</td><td>+1</td></tr>
                        <tr><td>0010</td><td>+2</td></tr>
                        <tr><td>0011</td><td>+3</td></tr>
                        <tr><td>0100</td><td>+4</td></tr>
                        <tr><td>0101</td><td>+5</td></tr>
                        <tr><td>0110</td><td>+6</td></tr>
                        <tr><td>0111</td><td>+7</td></tr>
                        <tr className="bg-red-900/30"><td>1000</td><td>-0</td></tr>
                        <tr><td>1001</td><td>-1</td></tr>
                        <tr><td>1010</td><td>-2</td></tr>
                        <tr><td>1011</td><td>-3</td></tr>
                        <tr><td>1100</td><td>-4</td></tr>
                        <tr><td>1101</td><td>-5</td></tr>
                        <tr><td>1110</td><td>-6</td></tr>
                        <tr><td>1111</td><td>-7</td></tr>
                    </tbody>
                </table>

                <p>
                    By using this approach, we are successfully able to represent signed integer.
                    But when we analysis it more closely, we could observe following drawbacks:
                </p>

                <ul className="list-decimal list-inside space-y-2">
                    <li>
                        Two representations of zero: In 4-bit system we get both +0 and -0.
                    </li>
                    <li>
                        Signed extension doesn’t work for negative numbers.
                    </li>
                    <li>
                        Binary addition doesn’t work because sign bit is not part of actual number.
                    </li>
                </ul>

                {/* ================= b) 1's COMPLEMENT ================= */}
                <h3 className="text-2xl font-semibold text-emerald-300">b) 1’s Complement</h3>

                <p>
                    Negative numbers are represented by inverting every bit of corresponding positive number.
                </p>

                <p>
                    Two representations of zero still exist. Signed extension works perfectly for negative numbers and binary addition works with modified rule of end-around carry.
                </p>

                {/* ================= c) 2's COMPLEMENT ================= */}
                <h3 className="text-2xl font-semibold text-emerald-300">c) 2’s Complement</h3>

                <p>
                    Negative numbers are represented by inverting every bit of corresponding positive number then adding 1 bit to it.
                </p>

                <ul className="list-decimal list-inside space-y-2">
                    <li>Only one representation of zero.</li>
                    <li>Signed extension works perfectly.</li>
                    <li>Binary addition works naturally.</li>
                    <li>First bit acts as sign bit.</li>
                    <li>Overflow can be detected if carry into sign bit ≠ carry out of sign bit.</li>
                </ul>

                <div className="bg-slate-800 p-4 rounded-xl">
                    <p className="text-sky-300 font-semibold">Explore more:</p>
                    <a
                        href="https://docs.google.com/document/d/1FPLcUZAp8LJLEPZ3CCHK7ZJsI0wSTsbcl3sxFl4WzJo/edit?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                    >
                        Get your Document
                    </a>
                </div>

            </section>

            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-5">

                <h2 className="text-2xl font-bold text-sky-300">
                    Representing Negative Numbers using 2’s Complement (Step-by-Step)
                </h2>

                <p>
                    In <span className="text-emerald-300 font-semibold">2’s Complement method</span>,
                    a negative number is obtained by taking the
                    <span className="text-yellow-300 font-semibold"> 1’s complement</span>
                    of the positive number and then adding
                    <span className="text-yellow-300 font-semibold"> 1</span>.
                </p>

                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                    <h3 className="text-lg font-semibold text-emerald-300">
                        Example: Represent −5 using 4-bit 2’s Complement
                    </h3>

                    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                        {`
Step 1: Write +5 in binary
        +5 = 0101

Step 2: Find 1’s complement of 0101
        0101 → 1010

Step 3: Add 1 to get 2’s complement
        1010
      +    1
      --------
        1011

So, -5 = 1011 (in 4-bit 2’s complement)
`}
                    </pre>

                    <p>
                        The most significant bit (MSB) is
                        <span className="text-red-300 font-semibold"> 1</span>,
                        which indicates that the number is negative.
                    </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                    <h3 className="text-lg font-semibold text-emerald-300">
                        Another Example: Represent −3 using 4-bit 2’s Complement
                    </h3>

                    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                        {`
Step 1: +3 = 0011

Step 2: 1’s complement of 0011 = 1100

Step 3: Add 1
        1100
      +    1
      --------
        1101

So, -3 = 1101 (in 4-bit 2’s complement)
`}
                    </pre>
                </div>

            </section>


            <section className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl space-y-5">

                <h2 className="text-2xl font-bold text-sky-300">
                    2’s Complement Representation – 8 Bit Example
                </h2>

                <p>
                    Let us now represent a negative number using
                    <span className="text-emerald-300 font-semibold"> 8-bit 2’s Complement</span>.
                </p>

                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                    <h3 className="text-lg font-semibold text-emerald-300">
                        Example: Represent −25 using 8-bit 2’s Complement
                    </h3>

                    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm font-mono leading-6">
                        {`
                            Step 1: Write +25 in binary (8-bit)
                                    +25 = 00011001

                            Step 2: Find 1’s complement
                                    00011001 → 11100110

                            Step 3: Add 1
                                    11100110
                                +        1
                                ----------
                                    11100111

                            So, -25 = 11100111 (in 8-bit 2’s Complement)
                            `}
                    </pre>

                    <p>
                        The MSB is
                        <span className="text-red-300 font-semibold"> 1</span>,
                        hence the number is identified as negative.
                    </p>
                </div>

            </section>

            <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-10">

                <h2 className="text-3xl font-bold text-sky-300">
                    Why Inversion and Adding One Works in 2’s Complement
                </h2>

                <p>
                    Invert and add one. Invert and add one. It works, and you may want to know why.
                    This section is for those who are curious about why this strange technique actually makes mathematical sense.
                </p>

                <div className="bg-slate-800 p-5 rounded-xl space-y-4">
                    <h3 className="text-xl font-semibold text-emerald-300">Borrowing and Subtraction</h3>

                    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
                        {`
  93702
- 58358
-------

Borrowing process:

     1
  93702
- 58358
-------
      4

    11
  93702
- 58358
-------
     44

    11
  93702
- 58358
-------
    344

  1 11
  93702
- 58358
-------
   5344

  1 11
  93702
- 58358
-------
  35344
`}
                    </pre>

                    <p>
                        So, 93702 − 58358 = 35344.
                    </p>
                </div>

                <div className="bg-slate-800 p-5 rounded-xl space-y-4">
                    <h3 className="text-xl font-semibold text-emerald-300">
                        Borrowing and its Relevance to the Negative of a Number
                    </h3>

                    <p>
                        To find the negative of a number, we subtract it from zero.
                        Let us see the silly way a computer does 0 − 3:
                    </p>

                    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
                        {`
000000
-    3
------

    1
000000
-    3
------
     7

   11
000000
-    3
------
    97

  111
000000
-    3
------
   997

 1111
000000
-    3
------
  9997
`}
                    </pre>

                    <p>
                        We get 9997… which is exactly what borrowing forces when subtracting from zero.
                    </p>
                </div>

                <div className="bg-slate-800 p-5 rounded-xl space-y-4">
                    <h3 className="text-xl font-semibold text-emerald-300">
                        The Same in Binary (8-bit Example)
                    </h3>

                    <p>
                        Now subtract 75 (01001011) from zero in 8-bit binary.
                    </p>

                    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
                        {`
  00000000
- 01001011
----------
  10110101
`}
                    </pre>

                    <p>
                        If we subtract from 100000000 instead of zero, we still get the same 8-bit result.
                    </p>

                    <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 font-mono text-sm leading-6">
                        {`
 100000000
-01001011
----------
 010110101   → discard extra bit → 10110101
`}
                    </pre>
                </div>

                <div className="bg-emerald-900/30 p-5 rounded-xl border border-emerald-700 space-y-2">
                    <h3 className="text-xl font-semibold text-emerald-300">
                        Final Insight
                    </h3>

                    <p>
                        Subtracting a number from all 1’s flips every bit (this is 1’s complement),
                        and adding the final borrow is equivalent to adding 1.
                    </p>

                    <p className="font-semibold text-yellow-300">
                        So taking the negative of a number in a computer is the same as:
                    </p>

                    <p className="font-mono text-sky-300">
                        Invert all bits → Add 1
                    </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                    <p className="text-sky-300 font-semibold">💡 Teacher’s Tips</p>
                    <ul className="list-disc list-inside text-slate-300">
                        <li>2’s complement is not a trick – it is subtraction from 2ⁿ.</li>
                        <li>That extra “+1” is the borrowed carry returning to LSB.</li>
                        <li>This is why hardware prefers 2’s complement — no special subtraction circuit needed.</li>
                    </ul>
                </div>

            </section>





        </div>
    );
}
