import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-10">

      <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
        Real-World Conditional Scenarios in Python
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Conditional logic powers real applications like login systems, ATM
        withdrawals, grading, traffic control, and more. Let's explore some
        realistic scenarios using <code>if</code>, <code>elif</code>,
        <code>else</code>, and logical operators.
      </p>

      {/* LOGIN SYSTEM */}
      <h2 className="text-xl font-semibold text-sky-300">1. Login System with Password + OTP</h2>

      <EditablePythonCodeBlock
        initialCode={`username = "admin"
password = "1234"
otp = "9999"

u = "admin"
p = "1234"
o = "9999"

if u == username:
    if p == password:
        if o == otp:
            print("Login Successful!")
        else:
            print("Incorrect OTP")
    else:
        print("Incorrect Password")
else:
    print("User not found")`}
      />

      {/* GRADING SYSTEM */}
      <h2 className="text-xl font-semibold text-sky-300">2. Grading System</h2>

      <EditablePythonCodeBlock
        initialCode={`marks = 85

if marks >= 90:
    print("Grade A")
elif marks >= 80:
    print("Grade B")
elif marks >= 70:
    print("Grade C")
else:
    print("Grade D")`}
      />

      {/* ATM WITHDRAWAL */}
      <h2 className="text-xl font-semibold text-sky-300">3. ATM Withdrawal System</h2>

      <EditablePythonCodeBlock
        initialCode={`card_inserted = True
pin_correct = True
balance = 2500
amount = 2000

if card_inserted:
    if pin_correct:
        if amount <= balance:
            print("Withdraw Successful")
        else:
            print("Insufficient Balance")
    else:
        print("Wrong PIN")
else:
    print("Insert Card")`}
      />

      {/* TRAFFIC SIGNAL */}
      <h2 className="text-xl font-semibold text-sky-300">4. Traffic Light System</h2>

      <EditablePythonCodeBlock
        initialCode={`signal = "yellow"

if signal == "red":
    print("STOP")
elif signal == "yellow":
    print("READY")
elif signal == "green":
    print("GO")
else:
    print("Invalid Signal")`}
      />

      {/* DISCOUNT SYSTEM */}
      <h2 className="text-xl font-semibold text-sky-300">5. Shopping Discount System</h2>

      <EditablePythonCodeBlock
        initialCode={`amount = 1200
member = True

if amount > 1000:
    if member:
        print("20% Discount")
    else:
        print("10% Discount")
else:
    print("No Discount")`}
      />

      {/* Teacher Tips */}
      <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-emerald-300">Teacher's Tips</h3>
        <ul className="text-slate-300 text-sm mt-2">
          <li>✔ Start with real-life situations → convert to conditions.</li>
          <li>✔ Use flowcharts for designing complex logic.</li>
          <li>✔ Simplify using logical operators where possible.</li>
        </ul>
      </section>

      {/* Points */}
      <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-yellow-300">Points to Remember</h3>
        <ul className="text-slate-300 text-sm mt-2">
          <li>• Real-world logic often needs multiple layers of decisions.</li>
          <li>• Combine <code>and</code>, <code>or</code>, <code>not</code> to reduce nesting.</li>
          <li>• Use <code>elif</code> for multiple choices.</li>
          <li>• Always test edge cases (wrong PIN, low balance, etc.).</li>
        </ul>
      </section>

    </div>
  );
}

