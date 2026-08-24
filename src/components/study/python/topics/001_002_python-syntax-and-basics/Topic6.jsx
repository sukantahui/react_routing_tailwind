import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic6() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Core Data Types in Python — int, float, str, bool
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Python has four essential built-in data types used in the foundation of every program:
        <code>int</code>, <code>float</code>, <code>str</code>, and <code>bool</code>.  
        These types are dynamically assigned, meaning Python automatically decides the type 
        based on the value.
      </p>


      {/* ===============================================================
          1 — INTEGER (int)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">1. int (Integer)</h2>

        <p className="text-slate-300 text-sm">
          Used for whole numbers — no decimals allowed.  
          Python can store very large integers without overflow.
        </p>

        <EditablePythonCodeBlock
          initialCode={`a = 10
b = -50
c = 9876543210123456789  # Python can store huge numbers

print(type(a))
print(a, b, c)`}
        />

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>No fixed size (unlike C, Java).</li>
          <li>Automatically grows in memory as needed.</li>
        </ul>
      </section>


      {/* ===============================================================
          2 — FLOAT (Decimal Numbers)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">2. float (Decimal Numbers)</h2>

        <p className="text-slate-300 text-sm">
          Represents decimal or fractional numbers.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = 3.14
y = -9.999
z = 2.0  # Yes, this is a float

print(x, y, z)
print(type(z))`}
        />

        <p className="text-slate-400 text-xs">
          Floats are stored in 64-bit IEEE format (same as C’s <code>double</code>).
        </p>
      </section>


      {/* ===============================================================
          3 — STRING (str)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">3. str (String)</h2>

        <p className="text-slate-300 text-sm">
          Strings are sequences of characters enclosed in quotes.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = "Ritaja"
city = 'Kolkata'
msg = """This is a
multi-line string."""

print(name)
print(city)
print(msg)`}
        />

        <p className="text-slate-300 text-sm">
          Strings are:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>Immutable (cannot be changed after creation)</li>
          <li>Indexed and sliceable</li>
        </ul>
      </section>


      {/* ===============================================================
          4 — BOOLEAN (bool)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">4. bool (True / False)</h2>

        <p className="text-slate-300 text-sm">
          Boolean type stores logical values <code>True</code> and <code>False</code>.
          Internally, they behave like integers 1 and 0.
        </p>

        <EditablePythonCodeBlock
          initialCode={`is_active = True
is_admin = False

print(is_active, is_admin)
print(True + True)   # 1 + 1
print(False * 10)    # 0 * 10`}
        />
      </section>


      {/* ===============================================================
          5 — TYPE CHECKING WITH type()
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          5. Checking the Type with type()
        </h2>

        <EditablePythonCodeBlock
          initialCode={`print(type(100))        # int
print(type(3.14))       # float
print(type("Hello"))    # str
print(type(True))       # bool`}
        />
      </section>


      {/* ===============================================================
          6 — COMMON MISTAKES BEGINNERS MAKE
      =============================================================== */}
      <section className="space-y-4 bg-slate-900/50 border border-slate-700 p-5 rounded-xl">
        <h2 className="text-xl font-semibold text-sky-300">Common Mistakes</h2>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2">
          <li><code>"10"</code> (string) is **not** the same as <code>10</code> (integer).</li>
          <li>You cannot add strings + numbers directly without conversion.</li>
          <li>Floating numbers may introduce rounding errors like <code>0.1 + 0.2 ≠ 0.3</code>.</li>
          <li>Booleans behave like numbers (True=1, False=0).</li>
        </ul>
      </section>


      {/* ===============================================================
          TEACHER'S TIPS
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>

        <ul className="list-disc ml-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>Explain dynamic typing: Python assigns type based on value, not declaration.</li>
          <li>Make students practice <code>type()</code> to build clarity.</li>
          <li>Show real-world uses: marks (int), percentage (float), yes/no (bool), names (str).</li>
          <li>Highlight immutability of strings early—it helps avoid confusion later.</li>
        </ul>
      </section>

    </div>
  );
}
