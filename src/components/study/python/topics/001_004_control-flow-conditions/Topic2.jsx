import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-8">

      <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
        Multiple Conditions in Python — Using AND, OR, NOT
      </h1>

      <p className="text-slate-300 text-sm md:text-base leading-relaxed">
        Python allows combining multiple conditions using logical operators.
        These operators help create more powerful and flexible decision-making
        structures without needing deep nesting.
      </p>

      {/* AND operator */}
      <h2 className="text-xl font-semibold text-sky-300">1. Using <code>and</code></h2>
      <p className="text-slate-300 text-sm">
        <code>and</code> requires **all conditions to be True**.
      </p>

      <EditablePythonCodeBlock
        initialCode={`age = 20
has_id = True

if age >= 18 and has_id:
    print("Entry Allowed")
else:
    print("Entry Denied")`}
      />

      {/* OR operator */}
      <h2 className="text-xl font-semibold text-sky-300">2. Using <code>or</code></h2>
      <p className="text-slate-300 text-sm">
        <code>or</code> requires **at least one condition to be True**.
      </p>

      <EditablePythonCodeBlock
        initialCode={`is_staff = False
is_admin = True

if is_staff or is_admin:
    print("Access Granted")
else:
    print("Access Denied")`}
      />

      {/* NOT operator */}
      <h2 className="text-xl font-semibold text-sky-300">3. Using <code>not</code></h2>
      <p className="text-slate-300 text-sm">
        <code>not</code> reverses a condition.
      </p>

      <EditablePythonCodeBlock
        initialCode={`logged_in = False

if not logged_in:
    print("Please log in first")`}
      />

      {/* Combined Logic */}
      <h2 className="text-xl font-semibold text-sky-300">4. Combining All Logical Operators</h2>

      <EditablePythonCodeBlock
        initialCode={`age = 25
has_id = True
is_drunk = False

if age >= 18 and has_id and not is_drunk:
    print("You may enter")
else:
    print("You cannot enter")`}
      />

      {/* Practical Example */}
      <h2 className="text-xl font-semibold text-sky-300">5. Real Example — Scholarship Eligibility</h2>

      <EditablePythonCodeBlock
        initialCode={`marks = 92
family_income = 140000
sports_quota = True

if marks >= 90 and (family_income < 150000 or sports_quota):
    print("Eligible for Scholarship")
else:
    print("Not Eligible")`}
      />

      {/* Tips */}
      <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-emerald-300">Teacher's Tips</h3>
        <ul className="text-slate-300 text-sm mt-2">
          <li>✔ Use logical operators to reduce nested conditions.</li>
          <li>✔ Group conditions using parentheses for clarity.</li>
          <li>✔ Avoid very long combined conditions; break into variables.</li>
        </ul>
      </section>

      {/* Points */}
      <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-yellow-300">Points to Remember</h3>
        <ul className="text-slate-300 text-sm mt-2">
          <li>• <code>and</code> → all conditions must be True.</li>
          <li>• <code>or</code> → at least one condition must be True.</li>
          <li>• <code>not</code> → reverses a condition.</li>
          <li>• Make logic readable using parentheses.</li>
        </ul>
      </section>
    </div>
  );
}
