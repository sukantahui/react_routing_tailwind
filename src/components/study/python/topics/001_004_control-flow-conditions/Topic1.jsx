import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-8">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
        Nested Conditions in Python — Multi-Level Decision Making
      </h1>

      <p className="text-slate-300 text-sm md:text-base leading-relaxed">
        Nested conditions allow you to place one <code>if</code> statement inside
        another. They help model real-life situations where a decision depends on
        multiple layers of checks. For example: verifying age, then checking ID,
        then checking membership.
      </p>

      {/* BASIC NESTED IF */}
      <h2 className="text-xl font-semibold text-sky-300">1. What is a Nested Condition?</h2>
      <p className="text-slate-300 text-sm md:text-base">
        A nested condition is simply an <code>if</code> inside another <code>if</code>.
        Python executes inner blocks only if the outer conditions are satisfied.
      </p>

      <EditablePythonCodeBlock
        initialCode={`age = 22
has_id = True

if age >= 18:
    print("Age OK: Adult")
    if has_id:
        print("ID Verified")
        print("Entry Allowed")
    else:
        print("ID Missing -> Entry Denied")
else:
    print("Underage -> Entry Denied")`}
      />

      <p className="text-slate-400 text-sm">
        Here, ID verification happens only when the age check passes.
      </p>

      {/* FLOWCHART */}
      <h3 className="text-lg font-semibold text-purple-300">Flow Diagram</h3>
      <pre className="bg-slate-800 p-4 rounded-xl text-slate-300 text-sm overflow-auto">
{`              (Check Age ≥ 18?)
                     │
            ┌────────┴────────┐
            │                 │
          Yes                No
            │                 │
     (Check ID present?)   Deny Entry
            │
     ┌──────┴──────┐
     │             │
   Yes            No
     │             │
Allow Entry   Ask for ID`}
      </pre>

      {/* MULTILEVEL NESTING */}
      <h2 className="text-xl font-semibold text-sky-300">2. Multi-Level Nesting</h2>
      <p className="text-slate-300 text-sm md:text-base">
        You can nest conditions as deep as needed (but avoid unnecessary depth).
      </p>

      <EditablePythonCodeBlock
        initialCode={`age = 25
has_id = True
is_member = True

if age >= 18:
    if has_id:
        if is_member:
            print("Welcome, Premium Member!")
        else:
            print("Welcome, Guest User!")
    else:
        print("Please show your ID.")
else:
    print("You must be 18+ to enter.")`}
      />

      <p className="text-slate-400 text-sm">
        Notice how each inner decision depends on the outer decisions.
      </p>

      {/* PRACTICAL APPLICATION 1 */}
      <h2 className="text-xl font-semibold text-sky-300">3. Real-World Example – ATM Withdrawal</h2>
      <p className="text-slate-300 text-sm">
        Conditions:  
        ✔ Card inserted → ✔ PIN correct → ✔ Sufficient balance → Withdraw cash  
      </p>

      <EditablePythonCodeBlock
        initialCode={`card_inserted = True
pin_correct = True
balance = 3000
amount = 1500

if card_inserted:
    if pin_correct:
        if amount <= balance:
            print("Withdraw Successful")
        else:
            print("Insufficient Balance")
    else:
        print("Incorrect PIN")
else:
    print("Insert your card")`}
      />

      {/* PRACTICAL APPLICATION 2 */}
      <h2 className="text-xl font-semibold text-sky-300">4. Real-World Example – Shopping Discount System</h2>
      <EditablePythonCodeBlock
        initialCode={`is_member = True
purchase_amount = 1200

if purchase_amount > 1000:
    if is_member:
        print("20% discount applied!")
    else:
        print("10% discount applied!")
else:
    print("No discount available")`}
      />

      {/* PRACTICAL APPLICATION 3 */}
      <h2 className="text-xl font-semibold text-sky-300">
        5. Login Validation with Nested Conditions
      </h2>

      <EditablePythonCodeBlock
        initialCode={`username = "admin"
password = "1234"
otp = "9999"

if username == "admin":
    if password == "1234":
        if otp == "9999":
            print("Login Successful!")
        else:
            print("Incorrect OTP")
    else:
        print("Invalid Password")
else:
    print("Invalid Username")`}
      />

      {/* PRO TIP */}
      <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-emerald-300">Teacher's Tips</h3>
        <ul className="text-slate-300 text-sm mt-2 space-y-1">
          <li>✔ Avoid too many nested levels; they make code harder to read.</li>
          <li>✔ Use logical operators (<code>and</code>, <code>or</code>) to reduce nesting.</li>
          <li>✔ Indentation must be perfect — a single space error will break the code.</li>
        </ul>
      </section>

      {/* POINTS */}

      <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-yellow-300">Points to Remember</h3>
        <ul className="text-slate-300 text-sm mt-2 space-y-1">
          <li>• Nest conditions when decisions depend on previous outcomes.</li>
          <li>• Excessive nesting is a sign that logical operators may help.</li>
          <li>• Execution enters inner blocks only when outer conditions are True.</li>
          <li>• Use indentation consistently (4 spaces recommended).</li>
        </ul>
      </section>
    </div>
  );
}
